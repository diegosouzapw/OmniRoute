#!/bin/bash
# agy-omniroute.sh — запуск Antigravity CLI через TokenSaver→OmniRoute
# Стек: AGY → TokenSaver(:4000) → OmniRoute(:20128) → 11 провайдеров
# Обновлено: 2026-08-06

# ── 1. Убеждаемся что TokenSaver запущен ────────────────────────────────────
TS_HEALTH=$(curl -s --max-time 2 http://localhost:4000/health 2>/dev/null)
if echo "$TS_HEALTH" | grep -q '"status":"ok"'; then
  echo "✅ TokenSaver :4000 running (cache=$(echo "$TS_HEALTH" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('cache_entries',0))" 2>/dev/null) entries)"
else
  echo "⚡ Starting TokenSaver..."
  TOKENSAVER_CLOUD_ONLY=1 python3 ~/token-saver/tokensaver.py --server \
    > ~/.tokensaver/tokensaver.log 2>&1 &
  sleep 4
fi

# ── 2. OmniRoute :20128 health ───────────────────────────────────────────────
OMNI_MODELS=$(curl -s --max-time 3 http://localhost:20128/v1/models 2>/dev/null \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d.get('data',[])))" 2>/dev/null)
echo "✅ OmniRoute :20128 — ${OMNI_MODELS:-0} models"

# ── 3. Env для AGY: TokenSaver как OpenAI-compatible proxy ───────────────────
# AGY subagents/tools → TokenSaver → OmniRoute → провайдеры
export OPENAI_BASE_URL="http://localhost:4000/v1"
export OPENAI_API_KEY="local-agy"

# Для Claude Code subagents
export ANTHROPIC_BASE_URL="http://localhost:4000"

# OmniRoute прямо (для Gemini-native AGY core)
export OMNIROUTE_BASE_URL="http://localhost:20128/v1"

# Agent ID для трекинга в TokenSaver
export TOKENSAVER_AGENT_ID="agy-main"
export X_CLAUDE_CODE_AGENT_ID="agy-main"

# Настройки для Hermes Agent (с предыдущих запросов)
export HERMES_PROVIDER="custom"
export HERMES_API_BASE="http://localhost:4000/v1"
export HERMES_DEFAULT_MODEL="coding"

echo "🔀 Routing: AGY → TokenSaver(:4000) → OmniRoute(:20128)"
echo "   OPENAI_BASE_URL=$OPENAI_BASE_URL"
echo "   ANTHROPIC_BASE_URL=$ANTHROPIC_BASE_URL"
echo "   TokenSaver Models: google-ai-pro, gemini-3.5-flash, gemini-3.6-flash"
echo ""

exec /Users/work/.local/bin/agy "$@"
