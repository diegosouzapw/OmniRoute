#!/usr/bin/env bash
# install.sh — Install ArgisMonitor (formerly omniroute) on POSIX systems
#
# Usage:
#   curl -fsSL https://argismonitor.phenotype.space/install.sh | bash
#
#   # Pin a specific version:
#   curl -fsSL https://argismonitor.phenotype.space/install.sh | bash -s -- 1.2.3
#
#   # Local install (no download): run from repo root
#   ./install.sh --local
#
# Installs the ArgisMonitor CLI globally via npm. Node 20+ is required.

set -euo pipefail

VERSION="${1:-}"
LOCAL=0
SKIP_OMNIROUTE=0
SKIP_UPDATE_CHECK=0

for arg in "$@"; do
    case "$arg" in
        --local)             LOCAL=1 ;;
        --skip-omniroute)    SKIP_OMNIROUTE=1 ;;
        --skip-update-check) SKIP_UPDATE_CHECK=1 ;;
        --help|-h)
            sed -n '2,12p' "$0"
            exit 0
            ;;
        -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
        *)  VERSION="$arg" ;;
    esac
done

# 1) Sanity checks
if ! command -v node >/dev/null 2>&1; then
    echo -e "  ✖ \033[31mNode.js not found\033[0m — install Node 20+ first: https://nodejs.org/"
    exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
    echo -e "  ✖ \033[31mnpm not found\033[0m — install Node 20+ (includes npm)."
    exit 1
fi
NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo -e "  ✓ node $NODE_VERSION, npm $NPM_VERSION"

# 2) Install
if [ "$LOCAL" = "1" ]; then
    if [ ! -f package.json ]; then
        echo -e "  ✖ \033[31mLocal install requires running from the repo root\033[0m"
        exit 1
    fi
    echo -e "  → \033[36mLinking local package globally...\033[0m"
    npm link
else
    PKG="argismonitor${VERSION:+@$VERSION}"
    echo -e "  → \033[36mInstalling $PKG globally...\033[0m"
    npm install -g "$PKG" --no-audit --no-fund
fi

# 3) Optional: legacy `omniroute` alias
#    ArgisMonitor's npm package already includes bin/omniroute.mjs as a shim,
#    so `npm install -g argismonitor` registers both. The block below is for
#    users with an older `omniroute` install they want to keep working.
if [ "$SKIP_OMNIROUTE" = "0" ]; then
    if command -v argismonitor >/dev/null 2>&1 && ! command -v omniroute >/dev/null 2>&1; then
        ARGIS_BIN="$(command -v argismonitor || true)"
        if [ -n "$ARGIS_BIN" ]; then
            OMNI_BIN="$(dirname "$ARGIS_BIN")/omniroute"
            cp "$ARGIS_BIN" "$OMNI_BIN" 2>/dev/null || true
            chmod +x "$OMNI_BIN" 2>/dev/null || true
            echo -e "  ✓ \033[32mCreated $OMNI_BIN (compat alias)\033[0m"
        fi
    else
        echo -e "  ✓ \033[32momniroute alias already present\033[0m"
    fi
fi

# 4) Verify
VER_OUTPUT="$(argismonitor --version 2>&1 | head -n 1 || true)"
echo -e "  ✓ \033[32margismonitor reports: $VER_OUTPUT\033[0m"

# 5) Update check
if [ "$SKIP_UPDATE_CHECK" = "0" ] && [ "$LOCAL" = "0" ]; then
    LATEST="$(npm view argismonitor version 2>/dev/null || true)"
    if [ -n "$LATEST" ] && [ "$LATEST" != "$VERSION" ]; then
        echo -e "  ℹ \033[35mlatest npm version: $LATEST (you have $VER_OUTPUT)\033[0m"
    fi
fi

echo ""
echo -e "  🎉 \033[32mArgisMonitor installed.\033[0m"
echo -e "     Try:  argismonitor --help"
echo -e "     Docs: https://argismonitor.phenotype.space"
echo -e "     Old:  omniroute --help   \033[90m(deprecated)\033[0m"