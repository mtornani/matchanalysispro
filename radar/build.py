#!/usr/bin/env python3
"""Validate Radar release and evidence files against the local JSON schemas."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RADAR = ROOT / "radar"
RELEASE_SCHEMA = json.loads((RADAR / "schema" / "release.schema.json").read_text())
EVIDENCE_SCHEMA = json.loads((RADAR / "schema" / "evidence.schema.json").read_text())


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
    errors = validate(data, RELEASE_SCHEMA, str(path.relative_to(ROOT)))
    ids = [p.get("id") for p in data.get("picks", []) if isinstance(p, dict)]
    if len(ids) != len(set(ids)):
        errors.append(f"{path.name}: duplicate pick ids")
    return data, errors


def check_evidence(path: Path, known_ids: set[str] | None):
    data = load_json(path)
    errors = validate(data, EVIDENCE_SCHEMA, str(path.relative_to(ROOT)))
    player_id = data.get("player_id")
    if known_ids is not None and player_id and player_id not in known_ids:
        errors.append(f"{path.name}: player_id {player_id} is not a known pick")
    return data, errors


def collect_pick_ids():
    ids = set()
    for release_file in sorted((RADAR / "releases").glob("*/release.json")):
        data = load_json(release_file)
        for pick in data.get("picks", []):
            if isinstance(pick, dict) and "id" in pick:
                ids.add(pick["id"])
    return ids


def main() -> int:
    errors = []
    release_files = sorted((RADAR / "releases").glob("*/release.json"))
    if not release_files:
        errors.append("no release.json files found")
    for path in release_files:
        data, errs = check_release(path)
        errors.extend(errs)
        print(f"OK release {data.get('id')} ({len(data.get('picks', []))} picks)" if not errs else f"FAIL {path}")

    known_ids = collect_pick_ids()
    evidence_files = sorted(p for p in (RADAR / "evidence").glob("*.json"))
    for path in evidence_files:
        _, errs = check_evidence(path, known_ids)
        errors.extend(errs)
        print(f"{'OK' if not errs else 'FAIL'} evidence {path.name}")

    if errors:
        print("Validation failed:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1
    print(f"Validated {len(release_files)} release(s), {len(evidence_files)} evidence file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
