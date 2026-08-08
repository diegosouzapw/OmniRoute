# BOOTSTRAP — SerpentOS Full Stack

> Обязательно выполнять перед любой сессией. Читать после AGENTS.md.

## СТАРТОВАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ (bash)

```bash
# ── ШАГ 0: hcom handoff check
hcom list && hcom r <session_id> 2>/dev/null || echo "Нет зависших handoff"

# ── ШАГ 1: TokenSaver proxy
ts-health || python3 ~/token-saver/tokensaver.py --server &
export ANTHROPIC_BASE_URL=http://localhost:4000

# ── ШАГ 2: OmniRoute
export OPENAI_BASE_URL=http://localhost:20128/v1
export OPENAI_API_KEY=${OMNIROUTE_API_KEY}

# ── ШАГ 3: Antigravity proxy
export ANTIGRAVITY_BASE_URL=http://127.0.0.1:8045/v1

# ── ШАГ 4: Doppler env
eval "$(doppler secrets download --no-file --format env --project serpent --config prd)"

# ── ШАГ 5: Chroma memory sync
bash scripts/chroma-sync.sh 2>/dev/null || echo "[Chroma] fallback → Obsidian"

# ── ШАГ 6: Gemini context cache
pnpm ts-node packages/shared/src/gemini-cache-manager.ts 2>/dev/null &

# ── ШАГ 7: OS-NOTES статус
tail -30 OS-NOTES.md

# ── ШАГ 8: Ollama (фоновые модели)
ollama serve &>/dev/null &
ollama pull qwen2.5:7b &>/dev/null &
ollama pull llama3.2:3b &>/dev/null &

# ── ШАГ 9: Hermes bot
doppler run --project serpent --config dev -- python bot.py &
echo "✅ Hermes запущен"

# ── ШАГ 10: Claude Code Desktop listener
bash skills/hermes-claude-bridge/claude_hcom_listener.sh &
echo "✅ Claude hcom listener запущен"
```

## Проверка здоровья

```bash
./scripts/serpent-router.sh status
curl -s http://localhost:4000/health  && echo " :4000 OK"
curl -s http://localhost:20128/health && echo " :20128 OK"
curl -s http://127.0.0.1:8045/health && echo " :8045 OK"
```

## Фаллбеки (priority order)

```
1. TokenSaver :4000       → restart: python3 ~/token-saver/tokensaver.py --server &
2. OmniRoute :20128       → restart: ./scripts/serpent-router.sh omni
3. Antigravity :8045      → restart: antigravity-manager start
4. Chroma :8001           → restart: docker compose -f docker-compose.chroma.yml up -d
5. Claude quota исчерпана  → switch: rovo / Gemini CLI / Ollama
6. Kling credits исчерпаны → /rotate в Telegram
7. Flow cookie истёк      → Goose browser → flow.google.com → обновить FLOW_GOOGLE_COOKIES
```

## SYSTEM BOOTSTRAP STATUS (шаблон)

```
⚡ SYSTEM BOOTSTRAP STATUS
==================================================
🌍 Environment
  Project: serpentos | Region: europe-west3
🧠 Memory
  ChromaDB :8001 | Obsidian | Memory MCP | Gemini Cache
🛠️ Tools
  TokenSaver :4000 | OmniRoute :20128 | Antigravity :8045
  Hermes (polling) | Claude hcom listener
🎬 VideoGen
  Kling (rotation) | Flow/Veo3 | Wan2.1 DashScope
💰 Token Economy
  NIM(free) → Gemini Flash → Gemini Pro | Kimi/Qwen free | Ollama local
⚠️ Blockers
  [список или None]
📋 Next
  [текущая задача]
==================================================
```
