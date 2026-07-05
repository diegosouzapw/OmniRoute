#!/usr/bin/env bash
# ============================================================================
# OmniRoute (D: drive) — Start Script
# ============================================================================
# Launches the OmniRoute dev server isolated from the C: drive npm global
# installation. Uses PORT=30129, data dir under D:\New folder\OmniRoute\data\
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -W 2>/dev/null || pwd)"
cd "$SCRIPT_DIR"

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   OmniRoute (D: drive) — isolated instance           ║"
echo "║   Port: 30129  (C: drive uses 30128)                 ║"
echo "║   Data: $SCRIPT_DIR/data                             ║"
echo "╚═══════════════════════════════════════════════════════╝"

# Load .env, then override PORT explicitly
export PORT=30129

# Ensure data dir exists
mkdir -p "$SCRIPT_DIR/data"

# Ensure node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --ignore-scripts
fi

# Check if C drive OmniRoute is on the same port (non-blocking)
curl -s --max-time 2 http://127.0.0.1:30128/api/health > /dev/null 2>&1 && echo "ℹ️  C: drive OmniRoute detected on port 30128 (running independently)" || true

echo ""
echo "🚀 Starting OmniRoute dev server..."
echo "   Dashboard: http://localhost:30129"
echo "   API:       http://localhost:30129/api"
echo "   Stop:      Ctrl+C"
echo ""

exec npx next dev -p 30129 "$@"
