#!/usr/bin/env python3
"""Validate Radar files and build the knowledge graph."""
from __future__ import annotations

import json
import os
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RADAR = ROOT / "radar"
RELEASE_SCHEMA = json.loads((RADAR / "schema" / "release.schema.json").read_text())
EVIDENCE_SCHEMA = json.loads((RADAR / "schema" / "evidence.schema.json").read_text())
GRAPH_SCHEMA = json.loads((RADAR / "schema" / "graph.schema.json").read_text())

# Uscite riservate agli abbonati: stanno FUORI dal repo pubblico (GitHub Pages serve tutto main).
# Se RADAR_PRIVATE_DIR punta a una cartella con releases/*/release.json, build.py le valida e
# scrive il grafo completo lì dentro; nel repo finiscono solo uscite con "public": true.
PRIVATE_DIR = Path(os.environ["RADAR_PRIVATE_DIR"]).resolve() if os.environ.get("RADAR_PRIVATE_DIR") else None


def repo_release_files() -> list[Path]:
    return sorted((RADAR / "releases").glob("*/release.json"))


def private_release_files() -> list[Path]:
    if PRIVATE_DIR is None:
        return []
    return sorted((PRIVATE_DIR / "releases").glob("*/release.json"))


def _rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


class ValidationError(Exception):
    pass


def _type_ok(value, expected):
    return {
        "object": isinstance(value, dict),
        "array": isinstance(value, list),
        "string": isinstance(value, str),
        "boolean": isinstance(value, bool),
        "number": isinstance(value, (int, float)) and not isinstance(value, bool),
        "integer": isinstance(value, int) and not isinstance(value, bool),
    }.get(expected, False)


def validate(instance, schema, path="$"):
    errors = []
    expected = schema.get("type")
    if expected and not _type_ok(instance, expected):
        return [f"{path}: expected {expected}"]

    for key in schema.get("required", []):
        if not isinstance(instance, dict) or key not in instance:
            errors.append(f"{path}: missing {key}")

    if schema.get("type") == "object" and isinstance(instance, dict):
        props = schema.get("properties", {})
        if schema.get("additionalProperties") is False:
            extra = set(instance) - set(props)
            if extra:
                errors.append(f"{path}: unexpected fields {sorted(extra)}")
        for key, child in instance.items():
            if key in props:
                errors.extend(validate(child, props[key], f"{path}.{key}"))

    if schema.get("type") == "array" and isinstance(instance, list):
        if "minItems" in schema and len(instance) < schema["minItems"]:
            errors.append(f"{path}: expected at least {schema['minItems']} items")
        item_schema = schema.get("items")
        if item_schema:
            for i, item in enumerate(instance):
                errors.extend(validate(item, item_schema, f"{path}[{i}]"))

    if schema.get("type") == "string" and isinstance(instance, str):
        if "minLength" in schema and len(instance) < schema["minLength"]:
            errors.append(f"{path}: string too short")
        if "pattern" in schema and not re.fullmatch(schema["pattern"], instance):
            errors.append(f"{path}: {instance!r} does not match {schema['pattern']}")
        if "enum" in schema and instance not in schema["enum"]:
            errors.append(f"{path}: {instance!r} not in {schema['enum']}")

    if "anyOf" in schema:
        if not any(not validate(instance, option, path) for option in schema["anyOf"]):
            errors.append(f"{path}: does not satisfy anyOf")

    return errors


def load_json(path: Path):
    return json.loads(path.read_text())


def check_release(path: Path):
    data = load_json(path)
    errors = validate(data, RELEASE_SCHEMA, _rel(path))
    ids = [p.get("id") for p in data.get("picks", []) if isinstance(p, dict)]
    if len(ids) != len(set(ids)):
        errors.append(f"{path.name}: duplicate pick ids")
    return data, errors


def check_evidence(path: Path, known_ids: set[str] | None):
    data = load_json(path)
    errors = validate(data, EVIDENCE_SCHEMA, _rel(path))
    player_id = data.get("player_id")
    if known_ids is not None and player_id and player_id not in known_ids:
        errors.append(f"{path.name}: player_id {player_id} is not a known pick")
    return data, errors


def collect_pick_ids():
    ids = set()
    for release_file in repo_release_files() + private_release_files():
        data = load_json(release_file)
        for pick in data.get("picks", []):
            if isinstance(pick, dict) and "id" in pick:
                ids.add(pick["id"])
    return ids


def slug(value: str) -> str:
    """Stable key from a name, same folding idea as ABoringBot identity.norm."""
    folded = unicodedata.normalize("NFKD", value or "").encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", folded.lower()).strip("-")


def player_id(name: str) -> str:
    return f"player:{slug(name)}"


def club_id(name: str) -> str:
    return f"club:{slug(name)}"


def build_graph(releases: list[dict], evidence: list[dict] | None = None, public_only: bool = False) -> dict:
    """One growing graph: each release adds nodes and edges, it does not start over."""
    nodes: dict[str, dict] = {}
    edges: list[dict] = []
    evidence = evidence or []

    def add_node(nid: str, typ: str, label: str, **props):
        if nid not in nodes:
            nodes[nid] = {"id": nid, "type": typ, "label": label, **props}
        return nid

    def add_edge(source: str, target: str, typ: str, **props):
        edges.append({"source": source, "target": target, "type": typ, **props})

    for rel in releases:
        if public_only and not rel.get("public"):
            continue
        rid = f"release:{rel['id']}"
        add_node(
            rid,
            "release",
            rel.get("title") or rel["id"],
            release_id=rel["id"],
            written=rel.get("written"),
            season=rel.get("season"),
            public=bool(rel.get("public")),
            caveats=rel.get("caveats") or [],
            note=rel.get("note"),
        )
        mid = f"method:{rel['method_version']}"
        add_node(mid, "method", f"Metodo {rel['method_version']}", version=rel["method_version"])
        add_edge(rid, mid, "uses_method")

        competition = rel.get("scope", {}).get("competition") or ""
        group = rel.get("scope", {}).get("group") or ""
        cid = f"competition:{slug(competition)}"
        gid = f"group:{slug(competition)}:{slug(group)}"
        add_node(cid, "competition", competition)
        add_node(gid, "group", f"Girone {group}", group=group)
        add_edge(rid, cid, "in_competition")
        add_edge(rid, gid, "in_group")
        add_edge(gid, cid, "part_of")

        for chk in rel.get("checks") or []:
            kid = f"check:{rel['id']}:{chk['date']}"
            add_node(kid, "check", chk["date"], date=chk["date"], approx=bool(chk.get("approx")))
            add_edge(rid, kid, "has_check")

        for pick in rel.get("picks") or []:
            pkid = f"pick:{pick['id']}"
            person = player_id(pick["name"])
            club = club_id(pick["club"])
            extras = {
                k: pick[k]
                for k in ("why", "role", "age_label", "score", "facts", "confidence", "caveat")
                if k in pick
            }
            add_node(
                pkid,
                "pick",
                pick["id"],
                pick_id=pick["id"],
                chosen=bool(pick.get("chosen")),
                in_pool_csv=pick.get("in_pool_csv"),
                **extras,
            )
            add_node(
                person,
                "player",
                pick["name"],
                name=pick["name"],
                identity="provisional-name",
                **extras,
            )
            add_node(club, "club", pick["club"], name=pick["club"])
            add_edge(pkid, person, "identifies")
            add_edge(pkid, rid, "chosen_in")
            add_edge(person, club, "plays_for", release=rel["id"])
            add_edge(person, rid, "selected_in", pick_id=pick["id"])

    known_picks = {n["pick_id"] for n in nodes.values() if n["type"] == "pick"}
    for ev in evidence:
        pick = ev.get("player_id")
        if pick not in known_picks:
            continue
        ev_key = ev.get("id") or f"{pick}-{ev.get('type')}-{ev.get('date')}"
        eid = f"evidence:{slug(str(ev_key))}"
        add_node(
            eid,
            "evidence",
            ev.get("note") or ev.get("type") or "prova",
            evidence_type=ev.get("type"),
            date=ev.get("date"),
            partner=ev.get("partner"),
            url=ev.get("url"),
            path=ev.get("path"),
            start=ev.get("start"),
            end=ev.get("end"),
            note=ev.get("note"),
            pick_id=pick,
        )
        add_edge(f"pick:{pick}", eid, "has_evidence")
        for edge in list(edges):
            if edge["type"] == "identifies" and edge["source"] == f"pick:{pick}":
                add_edge(edge["target"], eid, "has_evidence")
                break

    graph = {
        "generated": date.today().isoformat(),
        "nodes": list(nodes.values()),
        "edges": edges,
    }
    return graph


def load_releases_and_evidence():
    releases = []
    for path in sorted((RADAR / "releases").glob("*/release.json")):
        releases.append(load_json(path))
    evidence = []
    for path in sorted(p for p in (RADAR / "evidence").glob("*.json")):
        evidence.append(load_json(path))
    return releases, evidence


def write_graph_files(graph: dict, public_graph: dict) -> None:
    out_dir = RADAR / "graph"
    out_dir.mkdir(exist_ok=True)
    (out_dir / "graph.json").write_text(json.dumps(graph, ensure_ascii=False, indent=2) + "\n")
    (out_dir / "graph.public.json").write_text(json.dumps(public_graph, ensure_ascii=False, indent=2) + "\n")


def inject_mock(public_graph: dict) -> None:
    template = RADAR / "did" / "index.template.html"
    target = RADAR / "did" / "index.html"
    if not template.exists():
        return
    payload = json.dumps(public_graph, ensure_ascii=False).replace("<", "\\u003c")
    html = template.read_text()
    html = html.replace("<!--GRAPH_JSON-->", payload)
    target.write_text(html)


def main() -> int:
    errors = []
    release_files = repo_release_files()
    if not release_files:
        errors.append("no release.json files found")
    releases = []
    for path in release_files:
        data, errs = check_release(path)
        if not data.get("public"):
            errs.append(
                f"{_rel(path)}: uscita non pubblica dentro il repo pubblico. "
                "Spostala in $RADAR_PRIVATE_DIR/releases/ (vedi radar/HARNESS.md)."
            )
        errors.extend(errs)
        releases.append(data)
        print(f"OK release {data.get('id')} ({len(data.get('picks', []))} picks)" if not errs else f"FAIL {path}")

    private_releases = []
    for path in private_release_files():
        data, errs = check_release(path)
        errors.extend(errs)
        private_releases.append(data)
        print(f"OK private release {data.get('id')} ({len(data.get('picks', []))} picks)" if not errs else f"FAIL {path}")

    known_ids = collect_pick_ids()
    evidence_files = sorted(p for p in (RADAR / "evidence").glob("*.json"))
    evidence = []
    for path in evidence_files:
        data, errs = check_evidence(path, known_ids)
        errors.extend(errs)
        evidence.append(data)
        print(f"{'OK' if not errs else 'FAIL'} evidence {path.name}")

    if not errors:
        # Nel repo: solo le uscite del repo (tutte pubbliche). Il grafo completo resta privato.
        graph = build_graph(releases, evidence, public_only=False)
        public_graph = build_graph(releases, evidence, public_only=True)
        graph_errors = validate(graph, GRAPH_SCHEMA, "graph.json")
        graph_errors += validate(public_graph, GRAPH_SCHEMA, "graph.public.json")
        full_graph = None
        if private_releases:
            full_graph = build_graph(releases + private_releases, evidence, public_only=False)
            graph_errors += validate(full_graph, GRAPH_SCHEMA, "graph.full.json (privato)")
        if graph_errors:
            errors.extend(graph_errors)
        else:
            write_graph_files(graph, public_graph)
            inject_mock(public_graph)
            print(
                f"OK graph ({len(graph['nodes'])} nodes, {len(graph['edges'])} edges; "
                f"public {len(public_graph['nodes'])} nodes)"
            )
            if full_graph is not None:
                out = PRIVATE_DIR / "graph"
                out.mkdir(exist_ok=True)
                (out / "graph.full.json").write_text(json.dumps(full_graph, ensure_ascii=False, indent=2) + "\n")
                print(f"OK private graph ({len(full_graph['nodes'])} nodes) -> {out / 'graph.full.json'}")

    if errors:
        print("Validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1
    print(f"Validated {len(release_files)} release(s), {len(private_releases)} private release(s), {len(evidence_files)} evidence file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
