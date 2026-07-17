#!/usr/bin/env bash
# forge-runner-scripts installer
#   Copies scripts to ~/bin/ + commands to ~/.forge/commands/
#   Idempotent. Re-run is safe; overwrites targets.
#
# Usage:
#   ./install.sh                # copy everything to defaults
#   ./install.sh --dry-run      # show what would be copied
#   PREFIX=$HOME ./install.sh   # override install root (default $HOME)

set -euo pipefail

PREFIX="${PREFIX:-$HOME}"
DRY_RUN=0
if [ "${1:-}" = "--dry-run" ]; then DRY_RUN=1; fi

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
BIN_DIR="$PREFIX/bin"
COMMANDS_DIR="$PREFIX/.forge/commands"

say() { printf '[install] %s\n' "$*"; }

if [ "$DRY_RUN" -eq 1 ]; then
  say "DRY RUN — no changes will be made"
  say "  would create: $BIN_DIR"
  say "  would create: $COMMANDS_DIR"
  say "  would copy: bin/* -> $BIN_DIR/forge-*"
  say "  would copy: commands/* -> $COMMANDS_DIR/"
  exit 0
fi

mkdir -p "$BIN_DIR" "$COMMANDS_DIR"

# Copy scripts to ~/bin/ with forge- prefix
say "installing scripts to $BIN_DIR/"
for src in "$REPO_ROOT"/bin/autoqueue/*.sh "$REPO_ROOT"/bin/subagents-orchestration/*.sh; do
  [ -f "$src" ] || continue
  base="$(basename "$src")"
  dest="$BIN_DIR/forge-$base"
  cp -f "$src" "$dest"
  chmod +x "$dest"
  say "  ✓ $dest"
done

# Copy .py files too (dag_orchestrator.py -> forge-dag_orchestrator.py)
for src in "$REPO_ROOT"/bin/subagents-orchestration/*.py; do
  [ -f "$src" ] || continue
  base="$(basename "$src")"
  dest="$BIN_DIR/forge-$base"
  cp -f "$src" "$dest"
  chmod +x "$dest"
  say "  ✓ $dest"
done

# Copy cheatsheet reference docs
if [ -d "$REPO_ROOT/commands" ]; then
  say "installing commands to $COMMANDS_DIR/"
  for src in "$REPO_ROOT"/commands/*; do
    [ -f "$src" ] || continue
    base="$(basename "$src")"
    dest="$COMMANDS_DIR/$base"
    cp -f "$src" "$dest"
    say "  ✓ $dest"
  done
fi

say "done. Run 'forge-<script>' from anywhere, or 'cat ~/.forge/commands/<name>.md' for refs."
