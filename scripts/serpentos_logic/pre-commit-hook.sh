#!/usr/bin/env bash
# pre-commit: duplicate prompt & script detector for SerpentOS
# Install: cp scripts/pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

set -uo pipefail

echo "🐍 [pre-commit] Checking for duplicates..."

# --- 1. Exact duplicate scripts (by content hash) ---
STAGED_PY=$(git diff --cached --name-only --diff-filter=A | grep '\.py$' || true)
if [ -n "$STAGED_PY" ]; then
  while IFS= read -r file; do
    [ -z "$file" ] && continue
    NEW_HASH=$(git show ":$file" | md5sum | cut -d' ' -f1)
    # Compare against all existing tracked .py files
    while IFS= read -r existing; do
      [ -z "$existing" ] && continue
      [ "$existing" = "$file" ] && continue
      OLD_HASH=$(git show "HEAD:$existing" 2>/dev/null | md5sum | cut -d' ' -f1 || true)
      if [ "$NEW_HASH" = "$OLD_HASH" ]; then
        echo "❌ DUPLICATE DETECTED: $file is identical to $existing"
        echo "   Remove one or differentiate before committing."
        exit 1
      fi
    done < <(git ls-files '*.py')
  done <<< "$STAGED_PY"
fi

# --- 2. Near-duplicate script names (fuzzy) ---
STAGED_ALL=$(git diff --cached --name-only --diff-filter=A | grep '^scripts/' || true)
if [ -n "$STAGED_ALL" ]; then
  while IFS= read -r new_file; do
    [ -z "$new_file" ] && continue
    NEW_BASE=$(basename "$new_file" | sed 's/\.[^.]*$//' | tr '_-' ' ')
    while IFS= read -r existing; do
      [ -z "$existing" ] && continue
      [ "$existing" = "$new_file" ] && continue
      OLD_BASE=$(basename "$existing" | sed 's/\.[^.]*$//' | tr '_-' ' ')
      # Simple word-overlap check
      OVERLAP=$(comm -12 \
        <(echo "$NEW_BASE" | tr ' ' '\n' | sort) \
        <(echo "$OLD_BASE" | tr ' ' '\n' | sort) | wc -w)
      TOTAL=$(echo "$NEW_BASE" | tr ' ' '\n' | wc -w)
      [ "$TOTAL" -eq 0 ] && continue
      RATIO=$(( OVERLAP * 100 / TOTAL ))
      if [ "$RATIO" -ge 80 ]; then
        echo "⚠️  SIMILAR NAME: $new_file ≈ $existing (${RATIO}% word overlap)"
        echo "   Rename or confirm this is intentional: git commit --no-verify"
      fi
    done < <(git ls-files 'scripts/')
  done <<< "$STAGED_ALL"
fi

# --- 3. System instruction version bump check ---
STAGED_SYS=$(git diff --cached --name-only | grep '^system/' || true)
if [ -n "$STAGED_SYS" ]; then
  if ! git diff --cached --name-only | grep -q '^system/VERSION'; then
    echo "❌ You changed system/ files but didn't update system/VERSION"
    echo "   Run: echo '1.x.y' > system/VERSION && git add system/VERSION"
    exit 1
  fi
fi

echo "✅ [pre-commit] No critical duplicates found."
exit 0
