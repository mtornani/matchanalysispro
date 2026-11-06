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


if __name__ == "__main__":
    unittest.main()
