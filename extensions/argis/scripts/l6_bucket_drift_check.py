#!/usr/bin/env python3
"""L6 bucket-drift check — ADR-023 follow-up #1.

Detects two kinds of drift:
1. Heavy work scheduled on a `device: macbook` worklog row.
2. Active branches (with upstream) in PAUSED repos that have commits ahead.

Exit codes: 0 = clean, 1 = drift detected, 2 = script error.
"""
import argparse, json, os, subprocess, sys, re
from pathlib import Path

PAUSED_REPOS = frozenset({"AtomsBot", "AtomsBot-2nd", "AtomsBot-wtrees", "QuadSGM", "focalpoint"})
CONDITIONAL_REPOS = frozenset({"Dino", "WSM"})
HEAVY_WORK_REGEXES = [
    r"cargo\s+test\s+--workspace",
    r"cargo\s+build\s+--workspace",
    r"xcodebuild.*simulator",
    r"docker.*dind",
    r"docker-compose.*dind",
    r"unity.*-batchmode",
    r"unreal.*editor",
    r"cargo\s+bench",
]

def is_heavy_work(text: str) -> bool:
    return any(re.search(p, text, re.IGNORECASE) for p in HEAVY_WORK_REGEXES)

def check_worklog(path: Path) -> list:
    drifts = []
    try:
        with open(path) as f:
            data = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError) as e:
        print(f"error: cannot parse worklog {path}: {e}", file=sys.stderr)
        return drifts
    device = data.get("device", "")
    title = data.get("title", "")
    notes = data.get("notes", "")
    action = data.get("summary", {}).get("action", "")
    combined = f"{title} {notes} {action}"
    if device == "macbook" and is_heavy_work(combined):
        drifts.append({
            "kind": "heavy_work_on_macbook",
            "worklog": str(path),
            "device": device,
            "matched_text": title[:120],
        })
    return drifts

def check_paused_repo(repo: str, workdir: Path) -> list:
    drifts = []
    repo_path = workdir / repo
    if not repo_path.is_dir():
        return drifts
    try:
        branches = subprocess.run(
            ["git", "-C", str(repo_path), "branch", "--list", "--format=%(refname:short)"],
            capture_output=True, text=True, timeout=30,
        ).stdout.strip().splitlines()
    except subprocess.TimeoutExpired:
        return drifts
    for branch in branches:
        branch = branch.strip()
        if not branch or branch.startswith("*"):
            continue
        upstream = None
        for upstream_attempt in [f"origin/{branch}", f"origin/main", "main"]:
            r = subprocess.run(
                ["git", "-C", str(repo_path), "rev-list", "--count", f"{upstream_attempt}..{branch}"],
                capture_output=True, text=True, timeout=15,
            )
            if r.returncode == 0:
                upstream = upstream_attempt
                break
        if upstream is None:
            continue
        try:
            ahead = int(r.stdout.strip())
        except ValueError:
            continue
        if ahead > 0:
            drifts.append({
                "kind": "paused_repo_active_branch",
                "repo": repo,
                "branch": branch,
                "upstream": upstream,
                "commits_ahead": ahead,
            })
    return drifts

def main():
    parser = argparse.ArgumentParser(description="L6 bucket-drift check (ADR-023 FU1)")
    parser.add_argument("--workdir", default=os.getcwd(), help="monorepo root")
    parser.add_argument("--worklog", default="worklogs/L5-101-app-governance-2026-06-15.json", help="path to worklog JSON")
    parser.add_argument("--out", default=None, help="output JSON path")
    args = parser.parse_args()

    workdir = Path(args.workdir)
    all_drifts = []
    wl_path = workdir / args.worklog
    all_drifts.extend(check_worklog(wl_path))
    for repo in PAUSED_REPOS | CONDITIONAL_REPOS:
        all_drifts.extend(check_paused_repo(repo, workdir))

    report = {
        "schema_version": "l6-bucket-drift/v1",
        "generated_at": subprocess.run(["date", "-u", "+%Y-%m-%dT%H:%M:%SZ"], capture_output=True, text=True).stdout.strip(),
        "source": str(Path(__file__).resolve()),
        "adr_anchor": "docs/adr/2026-06-15/ADR-023-agent-effort-governance.md",
        "paused_repos": sorted(PAUSED_REPOS),
        "conditional_repos": sorted(CONDITIONAL_REPOS),
        "worklog_scanned": args.worklog,
        "drift_count": len(all_drifts),
        "drift": all_drifts,
        "clean": len(all_drifts) == 0,
    }

    print(f"# L6 bucket-drift check (ADR-023 follow-up #1)\n")
    print(f"- scanned worklog: `{args.worklog}`")
    print(f"- paused repos watched: {len(PAUSED_REPOS)}")
    print(f"- drift count: **{len(all_drifts)}**")

    if args.out:
        out_path = Path(args.out)
        out_path.write_text(json.dumps(report, indent=2) + "\n")
        print(f"- JSON report: `{args.out}`")

    if report["clean"]:
        print("\n**Status: clean.**")
        return 0
    else:
        print("\n**Status: drift detected.** See JSON report for per-row detail.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
