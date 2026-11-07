#!/usr/bin/env python3
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "radar"))
import build  # noqa: E402

RELEASE = ROOT / "radar" / "releases" / "2026-10-girone-d" / "release.json"
VALID_EVIDENCE = ROOT / "tests" / "fixtures" / "evidence_valid.json"
INVALID_EVIDENCE = ROOT / "tests" / "fixtures" / "evidence_invalid.json"


class RadarTests(unittest.TestCase):
    def test_october_release_validates(self):
        data, errors = build.check_release(RELEASE)
        self.assertEqual(errors, [])
        self.assertEqual(data["id"], "2026-10-girone-d")
        ids = [p["id"] for p in data["picks"]]
        self.assertEqual(ids, [f"E01-{i:03d}" for i in range(1, 11)])
        self.assertTrue(all(p["chosen"] for p in data["picks"]))

    def test_valid_evidence_passes(self):
        known = {p["id"] for p in json.loads(RELEASE.read_text())["picks"]}
        _, errors = build.check_evidence(VALID_EVIDENCE, known)
        self.assertEqual(errors, [])

    def test_invalid_evidence_fails(self):
        known = {p["id"] for p in json.loads(RELEASE.read_text())["picks"]}
        _, errors = build.check_evidence(INVALID_EVIDENCE, known)
        self.assertTrue(errors)

    def test_october_graph(self):
        data = json.loads(RELEASE.read_text())
        graph = build.build_graph([data], [], public_only=True)
        types = {}
        for node in graph["nodes"]:
            types.setdefault(node["type"], []).append(node)
        self.assertEqual(len(types["player"]), 10)
        self.assertEqual(len(types["pick"]), 10)
        self.assertEqual(len(types["club"]), 8)
        self.assertEqual(len(types["release"]), 1)
        self.assertEqual(len(types["check"]), 3)
        ids = {n["id"] for n in types["player"]}
        self.assertIn("player:emanuele-occhipinti", ids)
        self.assertIn("club:arconatese", {n["id"] for n in types["club"]})
        # two Arconatese picks share one club node
        club_edges = [e for e in graph["edges"] if e["type"] == "plays_for" and e["target"] == "club:arconatese"]
        self.assertEqual(len(club_edges), 2)

    def test_same_player_reappears_as_one_node(self):
        first = json.loads(RELEASE.read_text())
        second = {
            "id": "2026-11-girone-d",
            "title": "Uscita 02",
            "written": "2026-11-13",
            "season": "2026/27",
            "scope": {"competition": "Serie D", "group": "D"},
            "method_version": "v1",
            "public": False,
            "picks": [
                {"id": "E02-001", "name": "Emanuele Occhipinti", "club": "Oltrepò", "chosen": True}
            ],
        }
        graph = build.build_graph([first, second], [])
        players = [n for n in graph["nodes"] if n["type"] == "player" and n["name"] == "Emanuele Occhipinti"]
        self.assertEqual(len(players), 1)
        public = build.build_graph([first, second], [], public_only=True)
        self.assertFalse(any(n.get("release_id") == "2026-11-girone-d" for n in public["nodes"]))


if __name__ == "__main__":
    unittest.main()
