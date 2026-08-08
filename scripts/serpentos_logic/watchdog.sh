#!/bin/bash
# SerpentOS Watchdog — keeps core services alive. Cron: */5 * * * *
# Restarts TokenSaver proxy (:4000) and Zero Claw Telegram bot if down.
# Idempotent, free (no LLM calls), logs to /tmp/serpent-watchdog.log.
set -uo pipefail
LOG=/tmp/serpent-watchdog.log
ts() { date '+%Y-%m-%d %H:%M:%S'; }

# 1) TokenSaver proxy :4000
if ! curl -s --max-time 4 http://localhost:4000/health >/dev/null 2>&1; then
  echo "[$(ts)] proxy :4000 DOWN → restart" >> "$LOG"
  pkill -f "tokensaver.py --server" 2>/dev/null
  sleep 1
  nohup python3 "$HOME/token-saver/tokensaver.py" --server >"$HOME/.tokensaver/tokensaver.log" 2>&1 &
fi

# 2) Zero Claw Telegram bot (port 7821 WS)
if ! lsof -ti:7821 >/dev/null 2>&1; then
  echo "[$(ts)] zeroclaw bot DOWN → restart" >> "$LOG"
  BOT_DIR="/Users/work/serpentos/packages/zeroclaw-agent"
  if [ -d "$BOT_DIR" ] && [ -x "$BOT_DIR/node_modules/.bin/tsx" ]; then
    TOK=$(doppler secrets get TELEGRAM_BOT_TOKEN --project serpent --config dev_personal --plain 2>/dev/null)
    CHAT=$(doppler secrets get TELEGRAM_CHAT_ID --project serpent --config dev_personal --plain 2>/dev/null)
    CHROMA_VM=$(bash /Users/work/serpentos/scripts/resolve-chroma-ip.sh --print 2>/dev/null || echo "34.44.215.238")
    if curl -s --max-time 3 "http://${CHROMA_VM}:8000/api/v1/heartbeat" >/dev/null 2>&1; then
      CHROMA_TARGET="${CHROMA_VM}"
    elif curl -s --max-time 3 "http://localhost:8001/api/v1/heartbeat" >/dev/null 2>&1; then
      CHROMA_TARGET="localhost"
    else
      CHROMA_TARGET="${CHROMA_VM}"
    fi
    ( cd "$BOT_DIR" && ZEROCLAW_TELEGRAM_TOKEN="$TOK" TELEGRAM_CHAT_ID="$CHAT" CHROMA_HOST="$CHROMA_TARGET" \
      nohup ./node_modules/.bin/tsx index.ts >/tmp/zeroclaw.log 2>&1 & )
  fi
fi

# 3) ChromaDB reachability (memory backend) — dynamic check with local fallback
CHROMA_VM=$(bash /Users/work/serpentos/scripts/resolve-chroma-ip.sh --print 2>/dev/null || echo "34.44.215.238")
if ! curl -s --max-time 5 "http://${CHROMA_VM}:8000/api/v1/heartbeat" >/dev/null 2>&1 && \
   ! curl -s --max-time 3 "http://localhost:8001/api/v1/heartbeat" >/dev/null 2>&1; then
  echo "[$(ts)] ChromaDB (${CHROMA_VM}:8000 and localhost:8001) unreachable" >> "$LOG"
fi

exit 0
