#!/usr/bin/env bash
# scripts/build-bifrost.sh
#
# Builds the vendored Bifrost (Tier-1 router) Go binary and installs it
# to dist/bifrost/bifrost so the OmniRoute TypeScript executor can spawn
# it as a sidecar process.
#
# Idempotent: re-running with the same source is a no-op.
# Override the source commit via BIFROST_REF env var.
#
# Pinned Go version: see vendor/bifrost/core/go.mod (`go 1.26.2`).
#
# Usage:
#   ./scripts/build-bifrost.sh              # default: vendor/bifrost @ HEAD
#   BIFROST_REF=main ./scripts/build-bifrost.sh
#   BIFROST_REF=v1.2.3 ./scripts/build-bifrost.sh
#   BIFROST_REF=clean ./scripts/build-bifrost.sh  # remove build artifacts only
#
# Exit codes:
#   0 = success
#   1 = missing go
#   2 = vendor source not found (run: git submodule update --init vendor/bifrost
#       or: tar -xzf ... to populate vendor/bifrost/)
#   3 = build failed
#   4 = install failed

set -euo pipefail

# --- paths ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
VENDOR_DIR="$ROOT_DIR/vendor/bifrost"
CORE_DIR="$VENDOR_DIR/core"
DIST_DIR="$ROOT_DIR/dist/bifrost"
BIN_NAME="bifrost"

# --- helpers ---
log() { printf '\033[1;34m[bifrost-build]\033[0m %s\n' "$*" >&2; }
err() { printf '\033[1;31m[bifrost-build]\033[0m %s\n' "$*" >&2; }

# --- clean-only mode ---
if [ "${BIFROST_REF:-}" = "clean" ]; then
  log "Removing build artifacts"
  rm -rf "$DIST_DIR" 2>/dev/null || true
  rm -f "$CORE_DIR/$BIN_NAME" 2>/dev/null || true
  rm -f "$CORE_DIR/$BIN_NAME.exe" 2>/dev/null || true
  log "Clean complete"
  exit 0
fi

# --- preflight: Go toolchain ---
if ! command -v go >/dev/null 2>&1; then
  err "go not found in PATH. Install Go 1.26.2+ and retry."
  err "macOS:  brew install go@1.26.2 && brew link go@1.26.2"
  err "linux:  see https://go.dev/dl/  (or use the version pinned in core/go.mod)"
  exit 1
fi
GO_VERSION="$(go version 2>&1 | awk '{print $3}')"
log "go: $GO_VERSION"

# --- preflight: vendored source ---
if [ ! -d "$VENDOR_DIR" ]; then
  err "vendor/bifrost/ does not exist."
  err "This repo vendors Bifrost as a committed tree at vendor/bifrost/."
  err "If you cloned a fresh copy and the directory is empty, run:"
  err "    git checkout HEAD -- vendor/bifrost/"
  err "Or re-clone the repo without --depth=1."
  exit 2
fi
if [ ! -d "$CORE_DIR" ]; then
  err "$CORE_DIR not found. Source tree is incomplete."
  exit 2
fi
if [ ! -f "$CORE_DIR/go.mod" ]; then
  err "$CORE_DIR/go.mod missing. Source tree is incomplete."
  exit 2
fi
# --- preflight: confirm this is the right vendored copy ---
if ! head -1 "$VENDOR_DIR/LICENSE" 2>/dev/null | grep -qi "MIT License"; then
  err "vendor/bifrost/LICENSE is not MIT. Refusing to build."
  err "See vendor/bifrost/VENDOR.md for license provenance."
  exit 2
fi
log "vendor/bifrost: $(du -sh "$VENDOR_DIR" 2>/dev/null | awk '{print $1}')"
log "core/go.mod: $(head -1 "$CORE_DIR/go.mod" 2>/dev/null)"

# --- optional: switch ref ---
if [ -n "${BIFROST_REF:-}" ] && [ "$BIFROST_REF" != "main" ]; then
  log "BIFROST_REF=$BIFROST_REF (overriding HEAD of vendor/bifrost)"
  log "Note: vendor/bifrost/ is a committed tree, not a live git repo."
  log "To use a different ref, manually replace vendor/bifrost/ with that ref's"
  log "tree before re-running this script."
fi

# --- build ---
log "Building $BIN_NAME (this may take 60-180s on first run; go module download)"
mkdir -p "$DIST_DIR"
BUILD_START=$(date +%s)
if ! (cd "$CORE_DIR" && go build -o "$DIST_DIR/$BIN_NAME" ./); then
  err "go build failed"
  err "Common causes:"
  err "  - Go version < 1.26.2 (see core/go.mod). Run: go version"
  err "  - Network issues during module download. Retry with: go env -w GOPROXY=https://proxy.golang.org,direct"
  err "  - Missing system deps. Linux: apt install build-essential"
  exit 3
fi
BUILD_END=$(date +%s)
log "Build complete in $((BUILD_END - BUILD_START))s"

# --- install (also keep a copy in core/ for `make run` workflow) ---
cp "$DIST_DIR/$BIN_NAME" "$CORE_DIR/$BIN_NAME" 2>/dev/null || true

# --- postflight: verify ---
if [ ! -x "$DIST_DIR/$BIN_NAME" ]; then
  err "binary not executable at $DIST_DIR/$BIN_NAME"
  exit 4
fi
BIN_SIZE=$(du -h "$DIST_DIR/$BIN_NAME" 2>/dev/null | awk '{print $1}')
log "Installed: $DIST_DIR/$BIN_NAME ($BIN_SIZE)"

# --- version check (best-effort; bifrost may not support --version) ---
if "$DIST_DIR/$BIN_NAME" --version >/dev/null 2>&1; then
  VERSION_OUT="$("$DIST_DIR/$BIN_NAME" --version 2>&1 | head -1)"
  log "Version: $VERSION_OUT"
else
  log "Binary does not support --version (this is normal for bifrost)"
fi

log "Done. Set BIFROST_ENABLED=true in OmniRoute to use this binary."
log "See docs/frameworks/BIFROST-BACKEND.md for activation steps."
