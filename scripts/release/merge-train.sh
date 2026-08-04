#!/usr/bin/env bash
# scripts/release/merge-train.sh — batch-validate N queued PRs as ONE merged result.
#
# Why: in a merge-storm, waiting for each PR's CI after each sibling merge costs
# O(N²) CI runs. The train merges every queued PR into a throwaway worktree cut from
# the release tip, runs the fast-gates parity suite ONCE on the final result, and
# prints the evidence block that authorizes `gh pr merge --squash --admin` for each
# train member (merge-gates.md §7 — owner-approved policy extension of §4, 2026-07-09).
#
# Designed for the 32-core runner box (192.168.0.113) or any checkout with
# node_modules. It only READS from origin — it never pushes, never merges PRs, never
# touches other worktrees, and never uses `git stash` (Hard Rule #22a).
#
# Usage:
#   scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
#     --plan   print the planned steps and exit 0 (no worktree, no network) — used by
#              the unit test and for a quick sanity read.
#     --fast   fast parity mode (owner-approved 2026-07-18): full static gates + the
#              node:test files CHANGED by the boarded PRs + vitest, instead of the
#              full unit suite. For intra-day mega-train drains. The FULL suite must
#              still run at least once per day on the accumulated tip (one train
#              without --fast, or `npm run test:unit` on the tip) — fast evidence
#              lines say so explicitly.
#
# Speed note (2026-07-18): full mode runs `npm run test:unit` (box-tuned,
# --test-concurrency=20). The previous two SEQUENTIAL `test:unit:ci:shard` runs
# (--test-concurrency=4 each, sized for 4-core GH runners) drove the dominant phase
# at ~25% of a 16-core devbox (~2.5h suite → ~30-40min).
#
# Exit codes: 0 = suite green (evidence printed); 1 = usage error; 2 = suite red;
#             PRs whose merge conflicts are EJECTED (reported, train continues).
set -euo pipefail

PLAN=0
FAST=0
while [ $# -gt 0 ]; do
  case "$1" in
    --plan) PLAN=1; shift ;;
    --fast) FAST=1; shift ;;
    --*) echo "error: unknown flag '$1'" >&2; exit 1 ;;
    *) break ;;
  esac
done

if [ $# -lt 2 ]; then
  echo "usage: $0 [--plan] [--fast] <base-branch> <PR#> [<PR#>...]" >&2
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
STATIC_GATES=(
  "npm run typecheck:core"
  "node scripts/check/check-file-size.mjs"
  "node scripts/check/check-complexity.mjs"
  "node scripts/check/check-cognitive-complexity.mjs"
  "node scripts/check/check-changelog-integrity.mjs"
)
# Full mode: the box-speed runner (same coverage as the two CI shards combined —
# main + dashboard + serial groups — at local concurrency instead of runner-sized).
UNIT_FULL="npm run test:unit"
VITEST="npm run test:vitest"

if [ "$PLAN" = "1" ]; then
  MODE="full"
  [ "$FAST" = "1" ] && MODE="fast"
  echo "[merge-train] PLAN (${MODE}) — base=origin/${BASE} prs=${PRS[*]}"
  echo "[merge-train] 1. worktree add .claude/worktrees/merge-train-<ts> --detach origin/${BASE}"
  for N in "${PRS[@]}"; do
    echo "[merge-train] 2. fetch origin pull/${N}/head && merge (conflict → EJECT #${N}, continue)"
  done
  i=3
  for c in "${STATIC_GATES[@]}"; do
    echo "[merge-train] ${i}. ${c}"
    i=$((i + 1))
  done
  if [ "$FAST" = "1" ]; then
    echo "[merge-train] ${i}. (fast) run node:test files changed by the boarded PRs (main/dashboard/serial buckets)"
  else
    echo "[merge-train] ${i}. ${UNIT_FULL}"
  fi
  i=$((i + 1))
  echo "[merge-train] ${i}. ${VITEST}"
  i=$((i + 1))
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

run_gate() {
  local c="$1"
  echo "[merge-train] ▶ $(date +%H:%M:%S) ${c}"
  if ! (cd "$WT" && eval "$c") >>"$LOG" 2>&1; then
    echo "[merge-train] ✗ SUITE RED at: ${c}" >&2
    echo "[merge-train] tail of ${LOG}:" >&2
    tail -30 "$LOG" >&2
    echo "[merge-train] bisect: re-run the failing gate on intermediate train commits, eject the offender, re-run." >&2
    exit 2
  fi
}

for c in "${STATIC_GATES[@]}"; do
  run_gate "$c"
done

if [ "$FAST" = "1" ]; then
  # node:test files changed by the boarded PRs (tests/unit/**/*.test.{ts,mjs};
  # tests/unit/ui/*.test.tsx belongs to the vitest-ui runner, not node:test).
  mapfile -t CHANGED < <(git -C "$WT" diff --name-only "origin/${BASE}" HEAD -- 'tests/unit' \
    | grep -E '\.test\.(ts|mjs)$' || true)
  # Subdirs test:unit actually runs (package.json allowlist) — anything else under
  # tests/unit/<sub>/ belongs to another runner (e.g. autoCombo -> vitest).
  UNIT_SUBDIRS=",api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,ui,usage,"
  MAIN=()
  DASH=()
  SERIAL=()
  for f in "${CHANGED[@]}"; do
    [ -f "$WT/$f" ] || continue # deleted by a boarded PR
    case "$f" in
      tests/unit/dashboard/*) DASH+=("$f") ;;
      tests/unit/serial/*) SERIAL+=("$f") ;;
      *.test.mjs) MAIN+=("$f") ;; # tests/unit/**/*.test.mjs runs from any subdir
      tests/unit/*/*)
        sub="${f#tests/unit/}"; sub="${sub%%/*}"
        case "$UNIT_SUBDIRS" in
          *",${sub},"*) MAIN+=("$f") ;;
          *) echo "[merge-train] (fast) skip ${f} — subdir '${sub}' not in test:unit (other runner)" ;;
        esac ;;
      *) MAIN+=("$f") ;;
    esac
  done
  # Mirror package.json's three test:unit groups exactly (loader + concurrency).
  if [ ${#MAIN[@]} -gt 0 ]; then
    run_gate "DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=8192 --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=20 ${MAIN[*]}"
  fi
  if [ ${#DASH[@]} -gt 0 ]; then
    run_gate "DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=8192 --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=20 ${DASH[*]}"
  fi
  if [ ${#SERIAL[@]} -gt 0 ]; then
    run_gate "DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=8192 --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=1 ${SERIAL[*]}"
  fi
  if [ ${#MAIN[@]} -eq 0 ] && [ ${#DASH[@]} -eq 0 ] && [ ${#SERIAL[@]} -eq 0 ]; then
    echo "[merge-train] (fast) no changed node:test files under tests/unit — static gates + vitest only"
  fi
else
  run_gate "$UNIT_FULL"
fi

run_gate "$VITEST"

MODE_NOTE="suite green"
[ "$FAST" = "1" ] && MODE_NOTE="FAST gates green: static + changed tests + vitest — daily full-suite run still required"
echo "[merge-train] ✅ SUITE GREEN on ${TIP}"
echo "[merge-train] evidence line for each PR (paste before gh pr merge --squash --admin):"
for N in "${BOARDED[@]}"; do
  echo "  #${N}: Validated in local merge-train ${LOG} on $(hostname) @ ${TIP} (${MODE_NOTE})"
done
[ ${#EJECTED[@]} -gt 0 ] && echo "[merge-train] ejected (need the normal path): ${EJECTED[*]}"
exit 0
