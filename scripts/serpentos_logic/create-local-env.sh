#!/bin/bash
# create-local-env.sh — Create local .env.local (never uploaded to cloud or git)
# All secrets stay local on your machine only
set -e

echo "🔐 Creating local .env.local (stays on your machine only)..."

# Ensure .env.local exists and is gitignored
if ! grep -q "\.env\.local" .gitignore 2>/dev/null; then
    echo ".env.local" >> .gitignore
    echo "✅ Added .env.local to .gitignore"
fi

# Create .env.local with user-provided values
cat > .env.local << 'ENVFILE'
# OpenClaw — Local Environment (DO NOT COMMIT)
# This file is gitignored and stays on your machine only

# === TELEGRAM (paste NEW token after @BotFather /revoke + /token) ===
OPENCLAW_TELEGRAM_TOKEN=YOUR_NEW_TOKEN_HERE
TELEGRAM_CHAT_ID=YOUR_CHAT_ID

# === MEMORY: ChromaDB (shared with ZeroClaw) ===
CHROMA_HOST=34.44.215.238
CHROMA_PORT=8000
CHROMA_COLLECTION=serpent_memories
CHROMA_STATUS=healthy

# === MEMORY: AlloyDB AI (OpenClaw primary) ===
ALLOYDB_HOST=34.44.215.238
ALLOYDB_PORT=5432
ALLOYDB_DATABASE=agent_memory
ALLOYDB_USER=openclaw
ALLOYDB_PASSWORD=openclaw_dev
ALLOYDB_TABLE=memories

# === AI: Gemini ===
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# === OPTIONAL: GitHub (for NOTES.md fallback) ===
GITHUB_TOKEN=YOUR_GITHUB_TOKEN

# === Agent ID ===
OPENCLAW_AGENT_ID=openclaw-local
ENVFILE

echo "✅ Created .env.local"
echo ""
echo "⚠️  IMPORTANT: Replace YOUR_CHAT_ID and YOUR_GEMINI_API_KEY with real values"
echo "🤖 Bot: https://t.me/serpentai_bot"
echo ""
echo "To run locally:"
echo "  cd packages/openclaw && pnpm install && pnpm dev"
echo ""

# Verify gitignore
if grep -q "\.env\.local" .gitignore; then
    echo "🔒 .env.local is gitignored — safe from accidental commits"
else
    echo "⚠️  WARNING: .env.local is NOT in .gitignore! Adding now..."
    echo ".env.local" >> .gitignore
fi
