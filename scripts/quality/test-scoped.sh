#!/usr/bin/env bash
# test-scoped — run only unit tests impacted by your changes.
#
# Usage:
#   npm run test:scoped              # tests for changes vs HEAD~1 (working tree if no commit)
#   npm run test:scoped:staged       # tests for staged changes only
#   npm run test:scoped:full         # rebuild the import-graph impact map first, then select
#
# This is the local DX companion to the CI TIA gate (#8084 D1). It uses the SAME
# selector as CI (scripts/quality/select-impacted-tests.mjs) against the import-graph
# impact map (config/quality/test-impact-map.json, gitignored):
# - Changed test files → run those directly
# - Changed source files → run every unit test whose import graph reaches them
# - Hub files (tsconfig, package.json, …) or unmapped sources → full suite (fail-safe)
#
# The map is a snapshot of the import graph: rebuild it (`--full`) after adding tests,
# moving files, or pulling a big base update — a stale map falls back to __RUN_ALL__
# for unknown sources, never to a silent skip.
#
# Loader parity with `npm run test:unit` / CI (#6787): tests/unit/dashboard/** runs
# under `--import tsx` (CJS transform — required for ESM-only deep imports such as
# @lobehub/icons/es/*), tests/unit/serial/** at --test-concurrency=1, everything else
# under `--import tsx/esm`. A single tsx/esm invocation false-reds every dashboard
# test the map selects ("Unexpected token 'export'").

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
MAP_FILE="$REPO_ROOT/config/quality/test-impact-map.json"

STAGED=false
FULL=false
for arg in "$@"; do
  case "$arg" in
    --staged) STAGED=true ;;
    --full) FULL=true ;;
    -h|--help) sed -n '2,25p' "${BASH_SOURCE[0]}"; exit 0 ;;
    *) echo "[test:scoped] unknown argument: $arg (use --staged, --full)"; exit 2 ;;
  esac
done

# ── 1. Determine changed files ───────────────────────────────────────────────
if [ "$STAGED" = true ]; then
  CHANGED=$(git -C "$REPO_ROOT" diff --name-only --diff-filter=ACMR --cached)
else
  CHANGED=$(git -C "$REPO_ROOT" diff --name-only --diff-filter=ACMR HEAD~1...HEAD 2>/dev/null || \
            git -C "$REPO_ROOT" diff --name-only --diff-filter=ACMR)
fi

if [ -z "$CHANGED" ]; then
  echo "[test:scoped] No changed files — nothing to test."
  exit 0
fi

# ── 2. Impact map (build on --full or when missing) ──────────────────────────
if [ "$FULL" = true ] || [ ! -f "$MAP_FILE" ]; then
  echo "[test:scoped] Building the import-graph impact map (config/quality/test-impact-map.json)…"
  (cd "$REPO_ROOT" && node scripts/quality/build-test-impact-map.mjs)
fi

# ── 3. Select impacted tests (same selector as the CI TIA gate) ──────────────
SEL=$(printf '%s\n' "$CHANGED" | node "$REPO_ROOT/scripts/quality/select-impacted-tests.mjs" --stdin)

if echo "$SEL" | grep -q "__RUN_ALL__"; then
  echo "[test:scoped] Hub file or unmapped source changed — run the full suite: npm run test:unit"
  echo "[test:scoped] (if you just added a source file, rebuild the map: npm run test:scoped:full)"
  exit 1
fi

mapfile -t RUN_TESTS < <(printf '%s\n' "$SEL" | grep -v '^$' | sort -u)

if [ ${#RUN_TESTS[@]} -eq 0 ]; then
  echo "[test:scoped] No impacted unit tests — the change does not reach any node:test file."
  exit 0
fi

echo "[test:scoped] Running ${#RUN_TESTS[@]} impacted test(s)..."

# ── 4. Split by loader (mirror package.json test:unit / quality.yml TIA step) ──
DASH=(); SERIAL=(); REST=()
for f in "${RUN_TESTS[@]}"; do
  case "$f" in
    tests/unit/dashboard/*) DASH+=("$f") ;;
    tests/unit/serial/*) SERIAL+=("$f") ;;
    *) REST+=("$f") ;;
  esac
done

cd "$REPO_ROOT"
NODE_COMMON=(--max-old-space-size=8192 --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit)
export DISABLE_SQLITE_AUTO_BACKUP=true
RC=0
if [ ${#REST[@]} -gt 0 ]; then
  node --import tsx/esm "${NODE_COMMON[@]}" --test-concurrency=4 "${REST[@]}" || RC=$?
fi
if [ ${#DASH[@]} -gt 0 ]; then
  node --import tsx "${NODE_COMMON[@]}" --test-concurrency=4 "${DASH[@]}" || RC=$?
fi
if [ ${#SERIAL[@]} -gt 0 ]; then
  node --import tsx/esm "${NODE_COMMON[@]}" --test-concurrency=1 "${SERIAL[@]}" || RC=$?
fi
exit $RC
