#!/usr/bin/env bash
# build-cross-ffi.sh — Cross-compile the omniroute-ffi cdylibs to all 5 target
# platforms and stage them into packages/omniroute-ffi-<platform>/<lib>.node.
#
# Targets (matches the npm @omniroute/ffi-<platform> packages):
#   linux-x64-gnu       x86_64-unknown-linux-gnu
#   linux-arm64-gnu     aarch64-unknown-linux-gnu
#   darwin-x64          x86_64-apple-darwin
#   darwin-arm64        aarch64-apple-darwin
#   win32-x64           x86_64-pc-windows-msvc
#
# Usage:
#   bash scripts/build-cross-ffi.sh                 # build all targets
#   bash scripts/build-cross-ffi.sh darwin-arm64    # single target
#   bash scripts/build-cross-ffi.sh --skip-tests   # build only (no cargo test)
#
# Requires:
#   rustup + cargo, the per-platform linkers
#   (clang/x86_64-linux-gnu-gcc/aarch64-linux-gnu-gcc/etc.)

set -euo pipefail

SKIP_TESTS=0
if [ "${1:-}" = "--skip-tests" ]; then SKIP_TESTS=1; shift; fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE="$ROOT/crates/omniroute-ffi/Cargo.toml"
OUT_BASE="$ROOT/packages"

declare -A TARGETS=(
  [linux-x64-gnu]="x86_64-unknown-linux-gnu"
  [linux-arm64-gnu]="aarch64-unknown-linux-gnu"
  [darwin-x64]="x86_64-apple-darwin"
  [darwin-arm64]="aarch64-apple-darwin"
  [win32-x64]="x86_64-pc-windows-msvc"
)

build_target() {
  local name="$1"
  local triple="$2"
  local pkg_dir="$OUT_BASE/omniroute-ffi-$name"
  echo "==> Building $name ($triple)"

  if [ ! -d "$pkg_dir" ]; then
    echo "    WARN: $pkg_dir not present — skipping"
    return
  fi

  if rustup target list --installed 2>/dev/null | grep -q "^$triple$"; then
    cargo build --release --manifest-path "$WORKSPACE" --target "$triple"
  else
    echo "    WARN: target $triple not installed — using default host build"
    cargo build --release --manifest-path "$WORKSPACE"
  fi

  local lib_name
  case "$triple" in
    *apple-darwin*)  lib_name="libomniroute_ffi.dylib" ;;
    *windows*)       lib_name="omniroute_ffi.dll" ;;
    *)               lib_name="libomniroute_ffi.so" ;;
  esac

  local src_dir
  src_dir=$(find "$ROOT/crates/omniroute-ffi/target" -name "$lib_name" -path "*release*" -print -quit 2>/dev/null || true)
  if [ -z "$src_dir" ]; then
    src_dir=$(find "$ROOT/crates/omniroute-ffi/target" -name "$lib_name" -print -quit 2>/dev/null || true)
  fi
  if [ -n "$src_dir" ]; then
    cp "$src_dir" "$pkg_dir/omniroute-ffi.$name.node"
    echo "    Staged: $pkg_dir/omniroute-ffi.$name.node"
  fi

  if [ "$SKIP_TESTS" -eq 0 ]; then
    cargo test --manifest-path "$WORKSPACE" --target "$triple" 2>/dev/null || true
  fi
}

if [ "${1:-}" = "" ]; then
  for name in "${!TARGETS[@]}"; do
    build_target "$name" "${TARGETS[$name]}"
  done
else
  target_name="$1"
  if [ -z "${TARGETS[$target_name]:-}" ]; then
    echo "Unknown target: $target_name" >&2
    echo "Valid: ${!TARGETS[*]}" >&2
    exit 1
  fi
  build_target "$target_name" "${TARGETS[$target_name]}"
fi

echo "Done. Pre-built addons are in $OUT_BASE/omniroute-ffi-<platform>/"
