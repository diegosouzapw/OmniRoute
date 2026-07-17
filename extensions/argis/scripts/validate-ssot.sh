#!/usr/bin/env bash
# scripts/validate-ssot.sh — L65 SSOT auto-check
# Verifies the SSOT.md is canonical, complete, and all cross-references resolve.
# Used as a pre-commit + CI gate.

set -euo pipefail

# Find repo root (look for SSOT.md or .git)
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

SSOT="SSOT.md"
EXIT=0
ERRORS=()
WARNINGS=()

# Check 1: SSOT.md exists
if [ ! -f "$SSOT" ]; then
    ERRORS+=("FATAL: $SSOT missing — every fleet repo must have a SSOT.md (L65)")
    printf 'SSOT-AUTO-CHECK: %s\n' "${ERRORS[@]}"
    exit 2
fi

# Check 2: Required sections
REQUIRED_SECTIONS=(
    "Scope"
    "Precedence order"
    "Updating this file"
)

for section in "${REQUIRED_SECTIONS[@]}"; do
    if ! grep -qE "^## .*${section}" "$SSOT"; then
        ERRORS+=("MISSING SECTION: ## $section in $SSOT")
    fi
done

# Check 3: Scope table has at least 3 rows
SCOPE_ROWS=$(awk '/^## Scope/,/^## [^S]/' "$SSOT" | grep -cE "^\| .*\|" || true)
if [ "$SCOPE_ROWS" -lt 3 ]; then
    ERRORS+=("Scope table has $SCOPE_ROWS rows; need at least 3")
fi

# Check 4: Every row in Scope table cites a real path
while IFS= read -r row; do
    # Extract first column (domain) and second column (path)
    domain=$(echo "$row" | awk -F'|' '{print $2}' | xargs)
    source=$(echo "$row" | awk -F'|' '{print $3}' | xargs)
    # Skip header/separator rows
    [ -z "$domain" ] || [ "$domain" = "---" ] || [ "$source" = "---" ] && continue
    # Local path check (strip prefix like `KooshaPari/repo` or `org/repo`)
    local_path=$(echo "$source" | sed -E 's|^[A-Za-z0-9_-]+/[A-Za-z0-9_.-]+||;s|^/||')
    # If source is a local path, verify it exists
    if [[ "$local_path" == /* ]] || [[ "$local_path" =~ \.md$ ]] || [[ "$local_path" =~ ^docs/ ]] || [[ "$local_path" =~ ^pheno- ]] || [[ "$local_path" =~ ^phenotype- ]]; then
        if [ ! -e "$REPO_ROOT/$local_path" ] && [ ! -d "$REPO_ROOT/$local_path" ]; then
            ERRORS+=("BROKEN REFERENCE: '$domain' -> '$source' (resolved to '$local_path', not found in repo)")
        fi
    fi
done < <(awk '/^## Scope/,/^## [^S]/' "$SSOT" | grep -E "^\| .*\|.*\|" || true)

# Check 5: AGENTS.md references SSOT.md (or this section)
if [ -f "AGENTS.md" ]; then
    if ! grep -qE "SSOT\.md|Single Source of Truth" "AGENTS.md"; then
        WARNINGS+=("AGENTS.md does not reference SSOT.md; consider adding a 'Single source of truth' section")
    fi
fi

# Check 6: Nested repos' AGENTS.md files also reference SSOT (if present)
NESTED_AGENTS=$(find . -maxdepth 3 -name "AGENTS.md" -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null | head -30 || true)
if [ -n "$NESTED_AGENTS" ]; then
    missing_refs=()
    for ag in $NESTED_AGENTS; do
        if ! grep -qE "SSOT|Single Source of Truth" "$ag"; then
            missing_refs+=("$ag")
        fi
    done
    if [ ${#missing_refs[@]} -gt 0 ]; then
        WARNINGS+=("${#missing_refs[@]} nested AGENTS.md files do not reference SSOT: ${missing_refs[*]:0:3}...")
    fi
fi

# Report
echo "═══════════════════════════════════════════════════════"
echo "  SSOT Auto-Check (L65)"
echo "═══════════════════════════════════════════════════════"
echo "  File: $SSOT ($(wc -l < "$SSOT" | xargs) lines)"
echo "  Scope rows: $SCOPE_ROWS"
echo "  Errors: ${#ERRORS[@]}"
echo "  Warnings: ${#WARNINGS[@]}"
echo ""

if [ ${#ERRORS[@]} -gt 0 ]; then
    echo "✗ ERRORS:"
    for e in "${ERRORS[@]}"; do
        echo "  - $e"
    done
    EXIT=1
fi

if [ ${#WARNINGS[@]} -gt 0 ]; then
    echo "⚠ WARNINGS:"
    for w in "${WARNINGS[@]}"; do
        echo "  - $w"
    done
fi

if [ $EXIT -eq 0 ]; then
    echo "✓ SSOT auto-check passed (L65)"
fi

exit $EXIT
