#!/usr/bin/env python3
"""
OmniRoute evaluation runner.

Usage:
    python3 tests/eval/runner.py --server http://localhost:8080 --corpus tests/eval/corpus

Tests each corpus scenario against the running server and reports pass/fail.
"""
import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

PASS = "\u2705 PASS"
FAIL = "\u274c FAIL"
SKIP = "\u23ed\ufe0f  SKIP"


def check_server(server_url: str) -> bool:
    """Check if the server is running."""
    try:
        req = urllib.request.Request(f"{server_url}/health", method="GET")
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception:
        return False


def deep_get(data: dict, dotted_key: str):
    """Get a nested value using dot notation, e.g., 'error.type'."""
    parts = dotted_key.split(".")
    current = data
    for part in parts:
        if isinstance(current, dict):
            current = current.get(part)
        else:
            return None
    return current


def matches(expected_val, actual_val) -> bool:
    """Compare expected vs actual with type coercion for booleans."""
    if expected_val is None and actual_val is None:
        return True
    if isinstance(expected_val, bool):
        return bool(actual_val) == expected_val
    if isinstance(expected_val, str) and isinstance(actual_val, str):
        return expected_val == actual_val
    if isinstance(expected_val, (int, float)) and isinstance(actual_val, (int, float)):
        return expected_val == actual_val
    # dict comparison (partial match)
    if isinstance(expected_val, dict) and isinstance(actual_val, dict):
        return all(actual_val.get(k) == v for k, v in expected_val.items())
    return expected_val == actual_val


def run_scenario(scenario: dict, server_url: str) -> tuple[str, str, str]:
    """
    Run a single eval scenario against the server.
    Returns (status, category, detail).
    """
    scenario_id = scenario.get("id", "unknown")
    name = scenario.get("name", scenario_id)
    category = scenario.get("category", "general")
    input_data = scenario.get("input", {})
    expected = scenario.get("expected", {})

    path = input_data.get("path", "/api/v1/chat/completions")
    method = input_data.get("method", "POST")
    headers = input_data.get("headers", {})
    headers.setdefault("Content-Type", "application/json")

    url = f"{server_url}{path}"

    body_fields = {k: v for k, v in input_data.items() if k not in ("path", "method", "headers")}
    body = json.dumps(body_fields).encode("utf-8") if method == "POST" else None

    try:
        req = urllib.request.Request(url, data=body, headers=headers, method=method)
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.status
            content_type = resp.headers.get("Content-Type", "")
            resp_body = resp.read().decode("utf-8")
            try:
                data = json.loads(resp_body)
            except json.JSONDecodeError:
                data = {"raw": resp_body}

            # Check expected content_type
            expected_ct = expected.get("content_type")
            if expected_ct and expected_ct not in content_type:
                return FAIL, category, f"{scenario_id}: Expected Content-Type '{expected_ct}', got '{content_type}'"

    except urllib.error.HTTPError as e:
        status = e.code
        content_type = e.headers.get("Content-Type", "")
        try:
            data = json.loads(e.read().decode("utf-8"))
        except Exception:
            data = {"error": str(e)}

    except Exception as e:
        return FAIL, category, f"{scenario_id}: Request failed: {e}"

    # Validate expected status (only compare if expected is an int)
    expected_status = expected.get("status")
    if isinstance(expected_status, int) and status != expected_status:
        return FAIL, category, f"{scenario_id}: Expected status {expected_status}, got {status}"

    # Validate expected response headers (for non-JSON responses)
    expected_headers = expected.get("headers")
    if expected_headers:
        for hdr_key, hdr_val in expected_headers.items():
            actual_hdr = resp.headers.get(hdr_key) if 'resp' in dir() else None
            if actual_hdr != hdr_val:
                return FAIL, category, f"{scenario_id}: Expected header '{hdr_key}'='{hdr_val}', got '{actual_hdr}'"

    # Validate expected response fields (support dot-notation for nested)
    for key, expected_val in expected.items():
        if key in ("status", "content_type", "headers"):
            continue  # Already checked above

        actual_val = deep_get(data, key)
        if not matches(expected_val, actual_val):
            return FAIL, category, f"{scenario_id}: Expected {key}={expected_val}, got {actual_val}"

    return PASS, category, f"{scenario_id}: {name}"


def load_corpus(corpus_dir: str) -> list[dict]:
    """Load all JSON scenario files from the corpus directory."""
    scenarios = []
    corpus_path = Path(corpus_dir)
    for f in sorted(corpus_path.glob("*.json")):
        with open(f) as fh:
            content = json.load(fh)
            traces = content.get("traces", content.get("scenarios", [content]))
            if isinstance(traces, dict):
                traces = [traces]
            scenarios.extend(traces)
    return scenarios


def main():
    parser = argparse.ArgumentParser(description="OmniRoute Eval Runner")
    parser.add_argument("--server", default="http://localhost:8080", help="Server URL")
    parser.add_argument("--corpus", default="tests/eval/corpus", help="Corpus directory")
    parser.add_argument("-v", "--verbose", action="store_true", help="Verbose output")
    args = parser.parse_args()

    server_url = args.server.rstrip("/")

    print(f"OmniRoute Eval Runner")
    print(f"Server: {server_url}")
    print(f"Corpus: {args.corpus}")
    print()

    if not check_server(server_url):
        print(f"{FAIL} Server at {server_url} is not responding")
        print("Start the server: npm run dev")
        sys.exit(1)
    print(f"{PASS} Server is running")
    print()

    scenarios = load_corpus(args.corpus)
    total = len(scenarios)
    passed = 0
    failed = 0
    skipped = 0
    results_by_category: dict[str, dict] = {}

    print(f"Running {total} scenario(s)...\n")

    for scenario in scenarios:
        status, category, detail = run_scenario(scenario, server_url)
        if status == PASS:
            passed += 1
            print(f"  {PASS} {detail}")
        elif status == FAIL:
            failed += 1
            print(f"  {FAIL} {detail}")
        else:
            skipped += 1
            print(f"  {SKIP} {detail}")

        if category not in results_by_category:
            results_by_category[category] = {"pass": 0, "fail": 0, "total": 0}
        results_by_category[category]["total"] += 1
        if status == PASS:
            results_by_category[category]["pass"] += 1
        else:
            results_by_category[category]["fail"] += 1

    print(f"\nResults: {passed}/{total} passed, {failed} failed, {skipped} skipped\n")

    # Category breakdown
    if results_by_category:
        print("By category:")
        for cat, r in sorted(results_by_category.items()):
            pct = int(r["pass"] / r["total"] * 100) if r["total"] else 0
            bar = "\u2588" * (pct // 10) + "\u2591" * ((100 - pct) // 10)
            print(f"  {cat:12s} [{bar}] {r['pass']}/{r['total']}")

    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
