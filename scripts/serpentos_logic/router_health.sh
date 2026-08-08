#!/usr/bin/env bash
# SerpentOS Health Check — router, memory, GSD
set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ok()  { echo -e "${GREEN}✅ $1${NC}"; }
fail(){ echo -e "${RED}❌ $1${NC}"; }
warn(){ echo -e "${YELLOW}⚠️  $1${NC}"; }

echo ""
echo "🔍 SerpentOS Health Check"
echo "──────────────────────────────"

# OmniRoute
if curl -sf http://localhost:3000/health > /dev/null 2>&1; then
  ok "OmniRoute      ONLINE  (port 3000)"
else
  fail "OmniRoute      OFFLINE (port 3000)"
fi

# Ollama
if curl -sf http://localhost:11434/api/tags > /dev/null 2>&1; then
  ok "Ollama         ONLINE  (port 11434)"
else
  warn "Ollama         OFFLINE (port 11434) — local fallback unavailable"
fi

# ChromaDB (memory VM — skip if CHROMA_URL not set)
CHROMA_URL="${CHROMA_URL:-}"
if [ -n "$CHROMA_URL" ]; then
  if curl -sf "${CHROMA_URL}/api/v1/heartbeat" > /dev/null 2>&1; then
    ok "ChromaDB       ONLINE  ($CHROMA_URL)"
  else
    fail "ChromaDB       OFFLINE ($CHROMA_URL)"
  fi
else
  warn "ChromaDB       SKIPPED (CHROMA_URL not set)"
fi

# GSD Pro
if command -v gsd > /dev/null 2>&1; then
  ok "GSD Pro        INSTALLED"
else
  warn "GSD Pro        NOT FOUND"
fi

# Git status
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
STATUS=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
if [ "$STATUS" = "0" ]; then
  ok "Git            CLEAN  (branch: $BRANCH)"
else
  warn "Git            DIRTY  ($STATUS uncommitted files, branch: $BRANCH)"
fi

echo "──────────────────────────────"
echo ""
