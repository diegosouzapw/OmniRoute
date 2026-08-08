#!/bin/bash
# serpent-full-start.sh
# Полный старт всей оркестрации SerpentOS
# Запуск: bash scripts/serpent-full-start.sh

set -e
cd "$(dirname "$0")/.."

echo "🐍 SerpentOS Full Stack Start"
echo "==========================================="

# ── 1. TokenSaver
echo "[1/8] TokenSaver :4000..."
ts-health 2>/dev/null || python3 ~/token-saver/tokensaver.py --server &
export ANTHROPIC_BASE_URL=http://localhost:4000
sleep 1

# ── 2. OmniRoute env
echo "[2/8] OmniRoute :20128..."
export OPENAI_BASE_URL=http://localhost:20128/v1
export OPENAI_API_KEY=${OMNIROUTE_API_KEY}

# ── 3. Doppler secrets
echo "[3/8] Doppler secrets..."
if command -v doppler &>/dev/null; then
  eval "$(doppler secrets download --no-file --format env --project serpent --config prd 2>/dev/null)" \
    && echo "  ✅ Doppler OK" \
    || echo "  ⚠️  Doppler недоступен — используем .env"
else
  echo "  ⚠️  doppler не установлен"
fi

# ── 4. ChromaDB
echo "[4/8] ChromaDB..."
if command -v docker &>/dev/null; then
  docker compose -f docker-compose.chroma.yml up -d 2>/dev/null \
    && echo "  ✅ Chroma запущена" \
    || echo "  ⚠️  Chroma недоступна — fallback Obsidian"
fi

# ── 5. Gemini cache (фоном)
echo "[5/8] Gemini context cache..."
pnpm ts-node packages/shared/src/gemini-cache-manager.ts &>/dev/null & true

# ── 6. Ollama local models (фоном)
echo "[6/8] Ollama local models..."
if command -v ollama &>/dev/null; then
  ollama serve &>/dev/null &
  sleep 2
  ollama pull qwen2.5:7b &>/dev/null &
  ollama pull llama3.2:3b &>/dev/null &
  echo "  ✅ Ollama: qwen2.5:7b + llama3.2:3b (фоном)"
else
  echo "  ⚠️  Ollama не установлен"
fi

# ── 7. Claude Code hcom listener
echo "[7/8] Claude Code Desktop hcom listener..."
bash skills/hermes-claude-bridge/claude_hcom_listener.sh &
CLAUDE_PID=$!
echo "  ✅ Claude listener PID=$CLAUDE_PID"

# ── 8. Hermes Telegram bot
echo "[8/8] Hermes Telegram bot..."
if command -v doppler &>/dev/null; then
  doppler run --project serpent --config dev -- python bot.py &
else
  python bot.py &
fi
HERMES_PID=$!
echo "  ✅ Hermes PID=$HERMES_PID"

# ── PID файл
mkdir -p .state
cat > .state/pids.env <<EOF
HERMES_PID=$HERMES_PID
CLAUDE_PID=$CLAUDE_PID
EOF

# ── Итог
sleep 2
echo ""
echo "==========================================="
echo "⚡ SERPENT OS — ALL SYSTEMS GO"
echo "==========================================="
echo "  TokenSaver    :4000   ✔"
echo "  OmniRoute     :20128  ✔"
echo "  Antigravity   :8045   (проверь вручную)"
echo "  ChromaDB      :8001   (проверь docker)"
echo "  Ollama        local   ✔ (фоном)"
echo "  Claude hcom   PID=$CLAUDE_PID"
echo "  Hermes bot    PID=$HERMES_PID"
echo ""
echo "  📱 Telegram команды:"
echo "     /generate SCENE_05   → Kling + Flow + Wan2.1"
echo "     /claude \"write SCENE_06\"  → Claude Code Desktop"
echo "     /status              → статус провайдеров"
echo "     /rotate              → сброс Kling credits"
echo "     /ralph SCENE_06      → Ralph Loop"
echo "==========================================="
