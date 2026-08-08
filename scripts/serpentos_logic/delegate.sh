#!/bin/bash
# SerpentOS unified delegation dispatcher.
# Usage: delegate.sh <target> "<task>"
#   target: opencode | openclaw | zeroclaw | auto
# Sends a task to a FREE/cloud/local executor so Opus (subscription) is freed up.
set -uo pipefail
TARGET="${1:-auto}"; TASK="${2:-}"
[ -z "$TASK" ] && { echo "usage: delegate.sh <opencode|openclaw|zeroclaw|auto> \"<task>\""; exit 1; }

OPENCLAW_URL="https://openclaw-160140204348.europe-west3.run.app"
SECRET=$(doppler secrets get ZEROCLAW_SECRET --project serpent --config dev_personal --plain 2>/dev/null || echo "")
LOG=/tmp/serpent-delegate.log
ts() { date '+%F %T'; }

dispatch_opencode() {
  echo "[$(ts)] → opencode (free): $TASK" >> "$LOG"
  doppler run --project serpent --config dev_personal -- \
    opencode run "$TASK" --dir /Users/work/serpentos -m opencode-zen/qwen3.6-plus-free 2>>"$LOG"
}
dispatch_openclaw() {
  echo "[$(ts)] → OpenClaw (cloud): $TASK" >> "$LOG"
  curl -s --max-time 30 -X POST "$OPENCLAW_URL/task" \
    -H "Content-Type: application/json" -H "x-zeroclaw-secret: $SECRET" \
    -d "$(python3 -c "import json,sys;print(json.dumps({'text':sys.argv[1],'source':'opus-handoff'}))" "$TASK")" \
    >> "$LOG" 2>&1 && echo "dispatched to OpenClaw"
}
dispatch_zeroclaw() {
  echo "[$(ts)] → Zero Claw (local): $TASK" >> "$LOG"
  TOK=$(doppler secrets get TELEGRAM_BOT_TOKEN --project serpent --config dev_personal --plain 2>/dev/null)
  CHAT=$(doppler secrets get TELEGRAM_CHAT_ID --project serpent --config dev_personal --plain 2>/dev/null)
  curl -s "https://api.telegram.org/bot$TOK/sendMessage" \
    -d "chat_id=$CHAT" -d "text=/goose $TASK" >> "$LOG" 2>&1 && echo "dispatched to Zero Claw"
}

case "$TARGET" in
  opencode) dispatch_opencode;;
  openclaw) dispatch_openclaw;;
  zeroclaw) dispatch_zeroclaw;;
  auto)     # prefer free local opencode; fall back to cloud OpenClaw
            dispatch_opencode || dispatch_openclaw;;
  *) echo "unknown target: $TARGET"; exit 1;;
esac
