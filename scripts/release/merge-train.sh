#!/usr/bin/env bash
# scripts/release/merge-train.sh — batch-validate N queued PRs as ONE merged result.
#
# Why: in a merge-storm, waiting for each PR's CI after each sibling merge costs
# O(N²) CI runs. The train merges every queued PR into a throwaway worktree cut from
# the release tip, runs the full fast-gates parity suite ONCE on the final result, and
# prints the evidence block that authorizes `gh pr merge --squash --admin` for each
# train member (merge-gates.md §7 — owner-approved policy extension of §4, 2026-07-09).
#
# Designed for the 32-core runner box (192.168.0.113) or any checkout with
# node_modules. It only READS from origin — it never pushes, never merges PRs, never
# touches other worktrees, and never uses `git stash` (Hard Rule #22a).
#
# Usage:
#   scripts/release/merge-train.sh [--plan] <base-branch> <PR#> [<PR#>...]
#     --plan   print the planned steps and exit 0 (no worktree, no network) — used by
#              the unit test and for a quick sanity read.
#
# Exit codes: 0 = suite green (evidence printed); 1 = usage error; 2 = suite red;
#             PRs whose merge conflicts are EJECTED (reported, train continues).
set -euo pipefail

PLAN=0
if [ "${1:-}" = "--plan" ]; then
  PLAN=1
  shift
fi

if [ $# -lt 2 ]; then
  echo "usage: $0 [--plan] <base-branch> <PR#> [<PR#>...]" >&2
  exit 1
fi

BASE="$1"
shift
PRS=("$@")
for N in "${PRS[@]}"; do
  case "$N" in
    ''|*[!0-9]*) echo "error: PR number '$N' is not numeric" >&2; exit 1 ;;
  esac
done

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
SUITE=(
  "npm run typecheck:core"
  "node scripts/check/check-file-size.mjs"
  "node scripts/check/check-complexity.mjs"
  "node scripts/check/check-cognitive-complexity.mjs"
  "node scripts/check/check-changelog-integrity.mjs"
  "TEST_SHARD=1/2 npm run test:unit:ci:shard"
  "TEST_SHARD=2/2 npm run test:unit:ci:shard"
  "npm run test:vitest"
)

if [ "$PLAN" = "1" ]; then
  echo "[merge-train] PLAN — base=origin/${BASE} prs=${PRS[*]}"
  echo "[merge-train] 1. worktree add .claude/worktrees/merge-train-<ts> --detach origin/${BASE}"
  for N in "${PRS[@]}"; do
    echo "[merge-train] 2. fetch origin pull/${N}/head && merge (conflict → EJECT #${N}, continue)"
  done
  i=3
  for c in "${SUITE[@]}"; do
    echo "[merge-train] ${i}. ${c}"
    i=$((i + 1))
  done
  echo "[merge-train] ${i}. green → print --admin evidence per PR; red → exit 2 (bisect + eject)"
  echo "[merge-train] ${i}. teardown: git worktree remove --force (trap EXIT)"
  exit 0
fi

if [ -z "$ROOT" ]; then
  echo "error: not inside a git checkout" >&2
  exit 1
fi

TS="$(date +%Y%m%d-%H%M%S)"
WT="$ROOT/.claude/worktrees/merge-train-$TS"
LOG="$WT-suite.log"

cleanup() {
  git -C "$ROOT" worktree remove --force "$WT" 2>/dev/null || true
}
trap cleanup EXIT

echo "[merge-train] fetching origin/${BASE}…"
git -C "$ROOT" fetch origin "$BASE" --quiet
git -C "$ROOT" worktree add --detach "$WT" "origin/$BASE" --quiet
# reuse the main checkout's node_modules (same convention as dev worktrees)
[ -e "$WT/node_modules" ] || ln -s "$ROOT/node_modules" "$WT/node_modules"

EJECTED=()
BOARDED=()
for N in "${PRS[@]}"; do
  echo "[merge-train] boarding #${N}…"
  if ! git -C "$WT" fetch origin "pull/${N}/head" --quiet; then
    echo "[merge-train] ✗ #${N} EJECTED — could not fetch pull/${N}/head"
    EJECTED+=("$N")
    continue
  fi
  if git -C "$WT" merge FETCH_HEAD --no-edit --quiet >/dev/null 2>&1; then
    BOARDED+=("$N")
  else
    git -C "$WT" merge --abort 2>/dev/null || true
    echo "[merge-train] ✗ #${N} EJECTED — merge conflict vs the train (route it through the normal §5 path)"
    EJECTED+=("$N")
  fi
done

if [ ${#BOARDED[@]} -eq 0 ]; then
  echo "[merge-train] no PR boarded — nothing to validate." >&2
  exit 1
fi

TIP="$(git -C "$WT" rev-parse HEAD)"
EJ_MSG=""
[ ${#EJECTED[@]} -gt 0 ] && EJ_MSG=" — ejected: ${EJECTED[*]}"
echo "[merge-train] train tip ${TIP} — boarded: ${BOARDED[*]}${EJ_MSG}"
echo "[merge-train] running parity suite (log: ${LOG})…"

for c in "${SUITE[@]}"; do
  echo "[merge-train] ▶ ${c}"
  if ! (cd "$WT" && eval "$c") >>"$LOG" 2>&1; then
    echo "[merge-train] ✗ SUITE RED at: ${c}" >&2
    echo "[merge-train] tail of ${LOG}:" >&2
    tail -30 "$LOG" >&2
    echo "[merge-train] bisect: re-run the failing gate on intermediate train commits, eject the offender, re-run." >&2
    exit 2
  fi
done

echo "[merge-train] ✅ SUITE GREEN on ${TIP}"
echo "[merge-train] evidence line for each PR (paste before gh pr merge --squash --admin):"
for N in "${BOARDED[@]}"; do
  echo "  #${N}: Validated in local merge-train ${LOG} on $(hostname) @ ${TIP} (suite green)"
done
[ ${#EJECTED[@]} -gt 0 ] && echo "[merge-train] ejected (need the normal path): ${EJECTED[*]}"
exit 0
