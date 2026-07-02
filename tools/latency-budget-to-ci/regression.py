#!/usr/bin/env python3
"""L17 latency regression checker.

Compares current endpoint p99 (from trace) against baseline budget.
Fails if any endpoint regresses > threshold_pct above its budget threshold.

Usage:
    python3 tools/latency-budget-to-ci/regression.py \
        --baseline-budget budgets/rest-endpoints.yaml \
        --current-trace trace.json \
        --threshold-pct 10
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None


def load_budget(path: Path) -> dict:
    if yaml is None:
        import re
        text = path.read_text()
        spans = []
        for block in re.split(r'\n\s*- name:', text):
            if not block.strip():
                continue
            entry = {"name": ""}
            for kw in ("name", "threshold_ms", "hard_cap_ms"):
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


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--baseline-budget", required=True, type=Path)
    ap.add_argument("--current-trace", required=True, type=Path)
    ap.add_argument("--threshold-pct", type=float, default=10.0)
    args = ap.parse_args()

    budget = load_budget(args.baseline_budget)
    with open(args.current_trace) as f:
        trace = json.load(f)

    # Build baseline map
    baseline_map: dict[str, float] = {}
    for entry in budget.get("spans", []):
        baseline_map[entry["name"]] = entry.get("threshold_ms", 0)

    # Build current dur map from trace
    current_map: dict[str, float] = {}
    for span in trace.get("spans", []):
        current_map[span["name"]] = span.get("duration_ms", 0.0)

    failures = 0
    total = 0
    for name, baseline_threshold in sorted(baseline_map.items()):
        current_dur = current_map.get(name)
        if current_dur is None:
            print(f"SKIP {name}: no current trace entry")
            continue
        total += 1
        if baseline_threshold > 0:
            regression_pct = ((current_dur - baseline_threshold) / baseline_threshold) * 100.0
            if regression_pct > args.threshold_pct:
                print(
                    f"FAIL {name}: {current_dur:.1f}ms vs baseline {baseline_threshold}ms "
                    f"(regressed {regression_pct:+.1f}% > {args.threshold_pct}%)"
                )
                failures += 1
            else:
                print(
                    f"PASS {name}: {current_dur:.1f}ms vs baseline {baseline_threshold}ms "
                    f"({regression_pct:+.1f}%)"
                )

    print(f"\n--- Latency Regression Summary ---")
    print(f"  Endpoints compared: {total}")
    print(f"  Regressions (> {args.threshold_pct}%): {failures}")
    if failures > 0:
        print(f"FAILURE: {failures} endpoint(s) exceeded regression threshold")
        return 1
    print("PASS: All endpoints within regression threshold")
    return 0


if __name__ == "__main__":
    sys.exit(main())
