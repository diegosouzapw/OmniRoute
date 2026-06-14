#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLUGIN_SRC="$(dirname "$SCRIPT_DIR")/obsidian-plugin"
DESKTOP_VAULT="${1:-$HOME/Documents/Vault/Omniroute-Test}"
MOBILE_VAULT="${2:-$HOME/Documents/Vault/Test}"

echo "Building plugin..."
cd "$PLUGIN_SRC"
npm run build 2>&1 | tail -3

echo "Installing to desktop vault: $DESKTOP_VAULT"
mkdir -p "$DESKTOP_VAULT/.obsidian/plugins/omniroute-sync"
cp "$PLUGIN_SRC/dist/main.js" "$DESKTOP_VAULT/.obsidian/plugins/omniroute-sync/"
cp "$PLUGIN_SRC/manifest.json" "$DESKTOP_VAULT/.obsidian/plugins/omniroute-sync/"
cp "$PLUGIN_SRC/styles.css" "$DESKTOP_VAULT/.obsidian/plugins/omniroute-sync/"
echo "  ✓ Desktop plugin installed"

if [ -d "$MOBILE_VAULT" ]; then
  echo "Installing to mobile vault: $MOBILE_VAULT"
  mkdir -p "$MOBILE_VAULT/.obsidian/plugins/omniroute-sync"
  cp "$PLUGIN_SRC/dist/main.js" "$MOBILE_VAULT/.obsidian/plugins/omniroute-sync/"
  cp "$PLUGIN_SRC/manifest.json" "$MOBILE_VAULT/.obsidian/plugins/omniroute-sync/"
  cp "$PLUGIN_SRC/styles.css" "$MOBILE_VAULT/.obsidian/plugins/omniroute-sync/"
  echo "  ✓ Mobile plugin installed"
fi

echo "Done! Restart Obsidian on both devices to load the plugin."
