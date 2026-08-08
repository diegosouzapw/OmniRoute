#!/bin/bash
# check-proxies.sh — Проверка здоровья всех прокси
# Запуск: bash scripts/check-proxies.sh

echo "🐍 SerpentOS Proxy Health Check"
echo "==========================================="

# TokenSaver :4000
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/health 2>/dev/null || echo "000")
if [ "$status" = "200" ]; then
  echo "  [1] TokenSaver  :4000   ✅ UP"
else
  echo "  [1] TokenSaver  :4000   ❌ DOWN — restart: python3 ~/token-saver/tokensaver.py --server &"
fi

# OmniRoute :20128
OMNI_KEY=$(doppler secrets get OMNIROUTE_API_KEY --plain --project serpent --config prd 2>/dev/null || echo "")
OMNI_URL=${OMNIROUTE_URL:-http://localhost:20128}
status=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $OMNI_KEY" \
  "$OMNI_URL/v1/models" 2>/dev/null || echo "000")
if [ "$status" = "200" ]; then
  echo "  [2] OmniRoute   :20128  ✅ UP ($OMNI_URL)"
else
  echo "  [2] OmniRoute   :20128  ❌ DOWN — restart: ./scripts/serpent-router.sh omni"
fi

# Antigravity :8045
ANTI_KEY=$(doppler secrets get ANTIGRAVITY_API_KEY --plain --project serpent --config prd 2>/dev/null || echo "")
status=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $ANTI_KEY" \
  "http://127.0.0.1:8045/v1/models" 2>/dev/null || echo "000")
if [ "$status" = "200" ]; then
  echo "  [3] Antigravity :8045   ✅ UP (Claude OAuth)"
elif [ -z "$ANTI_KEY" ]; then
  echo "  [3] Antigravity :8045   ⚠️  NO KEY — add ANTIGRAVITY_API_KEY to Doppler"
else
  echo "  [3] Antigravity :8045   ❌ DOWN — open Antigravity IDE → Start Proxy"
fi

# DashScope / Qwen
DASHSCOPE_KEY=$(doppler secrets get DASHSCOPE_API_KEY --plain --project serpent --config prd 2>/dev/null || echo "")
if [ -n "$DASHSCOPE_KEY" ]; then
  status=$(curl -s -o /dev/null -w "%{http_code}" \
    "https://dashscope.aliyuncs.com/compatible-mode/v1/models" \
    -H "Authorization: Bearer $DASHSCOPE_KEY" 2>/dev/null || echo "000")
  if [ "$status" = "200" ]; then
    echo "  [4] DashScope/Qwen      ✅ UP (Wan2.1 + Qwen3)"
  else
    echo "  [4] DashScope/Qwen      ❌ DOWN (status: $status)"
  fi
else
  echo "  [4] DashScope/Qwen      ⚠️  NO KEY — add DASHSCOPE_API_KEY to Doppler"
fi

# ChromaDB :8001
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/api/v1 2>/dev/null || echo "000")
if [ "$status" = "200" ]; then
  echo "  [5] ChromaDB    :8001   ✅ UP"
else
  echo "  [5] ChromaDB    :8001   ❌ DOWN — docker compose -f docker-compose.chroma.yml up -d"
fi

# Ollama
status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:11434 2>/dev/null || echo "000")
if [[ "$status" =~ ^(200|404)$ ]]; then
  echo "  [6] Ollama      :11434  ✅ UP"
else
  echo "  [6] Ollama      :11434  ❌ DOWN — ollama serve &"
fi

# Hermes bot (check PID)
if [ -f .state/pids.env ]; then
  source .state/pids.env
  if kill -0 "$HERMES_PID" 2>/dev/null; then
    echo "  [7] Hermes bot  PID=$HERMES_PID ✅ UP"
  else
    echo "  [7] Hermes bot  ❌ DOWN — doppler run --project serpent --config dev -- python bot.py &"
  fi
else
  echo "  [7] Hermes bot  ⚠️  PID неизвестен (bash scripts/serpent-full-start.sh)"
fi

echo "==========================================="
echo "  Быстрая диагностика: ./scripts/serpent-router.sh status"
echo "  Полный старт: bash scripts/serpent-full-start.sh"
