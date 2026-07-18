#!/usr/bin/env bash
# publish-ffi-packages.sh — Build all 5 platform-specific @omniroute/ffi-*
# packages and publish them in order to the npm registry.
#
# Usage:
#   bash scripts/publish-ffi-packages.sh              # build + publish all
#   bash scripts/publish-ffi-packages.sh --dry-run    # dry-run mode
#   bash scripts/publish-ffi-packages.sh --skip-build # publish existing artifacts
#
# Requires: bash, jq (for version extraction), npm, the @omniroute org scope
# on the target registry.

set -euo pipefail

DRY_RUN=0
SKIP_BUILD=0
for arg in "$@"; do
  case "$arg" in
    --dry-run)    DRY_RUN=1 ;;
    --skip-build) SKIP_BUILD=1 ;;
    *)            echo "Unknown arg: $arg" >&2; exit 1 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_DIR="$ROOT/scripts"

if [ "$SKIP_BUILD" -eq 0 ]; then
  bash "$SCRIPT_DIR/build-cross-ffi.sh"
fi

PUBLISH_ARGS=()
if [ "$DRY_RUN" -eq 1 ]; then PUBLISH_ARGS=(--dry-run); fi

declare -a PKG_ORDER=(
  "omniroute-ffi-linux-x64-gnu"
  "omniroute-ffi-linux-arm64-gnu"
  "omniroute-ffi-darwin-arm64"
  "omniroute-ffi-darwin-x64"
  "omniroute-ffi-win32-x64"
)

for pkg in "${PKG_ORDER[@]}"; do
  pkg_dir="$ROOT/packages/$pkg"
  if [ ! -d "$pkg_dir" ]; then
    echo "WARN: $pkg_dir missing — skipping"
    continue
  fi
  echo "==> Publishing $pkg"
  (cd "$pkg_dir" && npm publish "${PUBLISH_ARGS[@]}")
done

echo "Done publishing FFI packages."