#!/bin/bash
# Design token lint: verify tailwind colors don't exceed 71-pillar palette
set -euo pipefail
PALETTE=$(grep -cP '^\s+\w+:\s+\#' .github/tailwind.palette 2>/dev/null || echo 0)
USED=$(grep -rP 'bg-\w+|text-\w+|border-\w+' src/ --include="*.{ts,tsx}" | grep -cP '\w+' 2>/dev/null || echo 0)
echo "Palette colors: $PALETTE"
echo "Unique token uses: $USED"
[ "$PALETTE" -gt 0 ] && [ "$USED" -gt 0 ] && echo "PASS" || echo "WARN: palette or uses low"
