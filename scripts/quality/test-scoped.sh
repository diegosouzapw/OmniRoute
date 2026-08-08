#!/usr/bin/env bash
# test-scoped — run only unit tests impacted by your changes.
#
# Usage:
#   npm run test:scoped              # tests for changes vs HEAD~1
#   npm run test:scoped -- --staged  # tests for staged changes only
#
# This is the local DX companion to the CI TIA gate (#8084 D1). The CI version
# builds a full import-graph impact map; for local dev we use a fast heuristic:
# - Changed test files → run those directly
# - Changed source files → run tests that share the file's directory/name prefix
# - Hub files (tsconfig, package.json, etc.) → suggest full suite
#
# For the full TIA (import-graph based), use: npm run test:scoped:full
# (requires a pre-built impact map via: node scripts/quality/build-test-impact-map.mjs)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# ── 1. Determine changed files ───────────────────────────────────────────────
if [[ "${1:-}" == "--staged" ]]; then
  CHANGED=$(git -C "$REPO_ROOT" diff --name-only --diff-filter=ACMR --cached)
else
  CHANGED=$(git -C "$REPO_ROOT" diff --name-only --diff-filter=ACMR HEAD~1...HEAD 2>/dev/null || \
            git -C "$REPO_ROOT" diff --name-only --diff-filter=ACMR)
fi

if [ -z "$CHANGED" ]; then
  echo "[test:scoped] No changed files — nothing to test."
  exit 0
fi

# ── 2. Classify changes ──────────────────────────────────────────────────────
HUB_RE="(setupPolyfill|tsconfig|package\\.json|package-lock\\.json|\\.env|vitest\\.config|stryker\\.conf)"
TEST_FILES=()
SRC_FILES=()
HIT_HUB=false

while IFS= read -r f; do
  [ -z "$f" ] && continue
  if echo "$f" | grep -qE "$HUB_RE"; then
    HIT_HUB=true
  elif echo "$f" | grep -qE '^tests/unit/.*\.test\.(ts|mjs)$'; then
    TEST_FILES+=("$f")
  elif echo "$f" | grep -qE '^(src|open-sse)/'; then
    SRC_FILES+=("$f")
  fi
done <<< "$CHANGED"

# ── 3. Hub file changed → full suite ─────────────────────────────────────────
if [ "$HIT_HUB" = true ]; then
  echo "[test:scoped] Hub file changed — run full suite: npm run test:unit"
  exit 1
fi

# ── 4. Collect tests to run ──────────────────────────────────────────────────
RUN_TESTS=()

# Direct test file changes always run
for tf in "${TEST_FILES[@]}"; do
  RUN_TESTS+=("$tf")
done

# For source files, try the impact map first; fall back to heuristic
MAP_FILE="$REPO_ROOT/config/quality/test-impact-map.json"
if [ ${#SRC_FILES[@]} -gt 0 ] && [ -f "$MAP_FILE" ]; then
  # Use the TIA selection with the impact map
  SEL=$(printf '%s\n' "${SRC_FILES[@]}" | node "$REPO_ROOT/scripts/quality/select-impacted-tests.mjs" 2>/dev/null || echo "__RUN_ALL__")
  if echo "$SEL" | grep -q "__RUN_ALL__"; then
    echo "[test:scoped] Unmapped source change — run full suite: npm run test:unit"
    exit 1
  fi
  while IFS= read -r t; do
    [ -n "$t" ] && RUN_TESTS+=("$t")
  done <<< "$SEL"
elif [ ${#SRC_FILES[@]} -gt 0 ]; then
  # No impact map — heuristic: suggest building it
  echo "[test:scoped] No impact map found. Build it with: node scripts/quality/build-test-impact-map.mjs"
  echo "[test:scoped] Or run the full suite: npm run test:unit"
  echo ""
  echo "[test:scoped] Changed source files:"
  printf '  %s\n' "${SRC_FILES[@]}"
  if [ ${#TEST_FILES[@]} -gt 0 ]; then
    echo "[test:scoped] Running changed test files only..."
  else
    exit 1
  fi
fi

# Deduplicate
IFS=$'\n' SORTED=($(printf '%s\n' "${RUN_TESTS[@]}" | sort -u)); unset IFS

if [ ${#SORTED[@]} -eq 0 ]; then
  echo "[test:scoped] No impacted tests — source changes don't map to any unit test."
  exit 0
fi

echo "[test:scoped] Running ${#SORTED[@]} impacted test(s)..."

# ── 5. Run selected tests ────────────────────────────────────────────────────
cd "$REPO_ROOT"
exec cross-env \
  DISABLE_SQLITE_AUTO_BACKUP=true \
  node --max-old-space-size=8192 \
  --import tsx/esm \
  --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts \
  --test --test-force-exit --test-concurrency=4 \
  "${SORTED[@]}"
