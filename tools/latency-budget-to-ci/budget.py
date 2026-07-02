#!/usr/bin/env python3
"""L17 latency-budget-to-CI gate for REST endpoints.

Pillar L17: latency-budget-to-CI.
Reads a YAML budget file and a JSON trace and fails CI if any endpoint
exceeds its hard cap or (optionally) its soft budget.

Usage:
    python3 tools/latency-budget-to-ci/budget.py --budget budgets/rest-endpoints.yaml --trace trace.json
    python3 tools/latency-budget-to-ci/budget.py --budget budgets/rest-endpoints.yaml --trace trace.json --fail-on-warn
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None  # fallback handled below


def load_budget(path: Path) -> dict:
    if yaml is None:
        # Fallback: parse YAML manually for CI environments without PyYAML
        import re
        text = path.read_text()
        spans = []
        for block in re.split(r'\n\s*- name:', text):
            if not block.strip():
                continue
            entry = {"name": ""}
            for kw in ("name", "method", "threshold_ms", "hard_cap_ms"):
                m = re.search(rf'{kw}:\s*"([^"]*)"', block) or re.search(rf'{kw}:\s*(\S+)', block)
                if m:
                    val = m.group(1)
                    if kw in ("threshold_ms", "hard_cap_ms"):
                        entry[kw] = int(val)
                    else:
                        entry[kw] = val.strip('"')
            if entry["name"]:
                spans.append(entry)
        return {"version": 1, "spans": spans}
    with open(path) as f:
        return yaml.safe_load(f)


def load_trace(path: Path) -> dict:
    with open(path) as f:
        return json.load(f)


def check_threshold(span_name: str, duration_ms: float, threshold_ms: float, hard_cap_ms: float | None) -> tuple[str, float]:
    """Returns (verdict, ratio). Verdict: 'pass', 'warn', or 'fail'."""
    ratio = duration_ms / threshold_ms if threshold_ms > 0 else 1.0
    if hard_cap_ms is not None and duration_ms > hard_cap_ms:
        return ("fail", ratio)
    if duration_ms > threshold_ms:
        return ("warn", ratio)
    return ("pass", ratio)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--budget", required=True, type=Path)
    ap.add_argument("--trace", required=True, type=Path)
    ap.add_argument("--fail-on-warn", action="store_true")
    args = ap.parse_args()

    budget = load_budget(args.budget)
    trace = load_trace(args.trace)

    # Build threshold map
    threshold_map: dict[str, dict] = {}
    for entry in budget.get("spans", []):
        threshold_map[entry["name"]] = {
            "threshold_ms": entry.get("threshold_ms", 0),
            "hard_cap_ms": entry.get("hard_cap_ms"),
            "method": entry.get("method", ""),
        }

    failures = 0
    warnings = 0
    results: list[dict] = []

    for span in trace.get("spans", []):
        name = span.get("name", "")
        dur = span.get("duration_ms", 0.0)
        entry = threshold_map.get(name)
        if entry is None:
            continue

        verdict, ratio = check_threshold(name, dur, entry["threshold_ms"], entry["hard_cap_ms"])

        if verdict == "fail":
            print(f"FAIL {name}: {dur:.1f}ms > hard cap {entry['hard_cap_ms']}ms (x{ratio:.1f})")
            failures += 1
        elif verdict == "warn":
            print(f"WARN {name}: {dur:.1f}ms > budget {entry['threshold_ms']}ms (x{ratio:.1f})")
            warnings += 1
        else:
            print(f"PASS {name}: {dur:.1f}ms ≤ {entry['threshold_ms']}ms")

        results.append({"name": name, "duration_ms": dur, "verdict": verdict, "ratio": ratio})

    # Summary
    total = len(results)
    print(f"\n--- Latency Budget Summary ---")
    print(f"  Total endpoints checked: {total}")
    print(f"  Passed: {total - failures - warnings}")
    print(f"  Warnings: {warnings}")
    print(f"  Failures: {failures}")

    if failures > 0:
        print(f"FAILURE: {failures} endpoint(s) exceeded hard cap")
    if warnings > 0:
        print(f"WARNING: {warnings} endpoint(s) exceeded soft budget")
    if args.fail_on_warn and warnings > 0:
        return 1
    return 1 if failures > 0 else 0


if __name__ == "__main__":
    sys.exit(main())
