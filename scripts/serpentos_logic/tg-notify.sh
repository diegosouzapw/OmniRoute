#!/usr/bin/env bash
# [MANAGED BY: architect-agent]
# Universal Telegram notifier for SerpentOS / Agent OS
# Usage: ./scripts/tg-notify.sh "<message>" ["<level: info|success|warn|error>"]

set -uo pipefail

MSG="${1:-}"
LEVEL="${2:-info}"

if [ -z "$MSG" ]; then
  echo "Usage: $0 \"<message>\" [info|success|warn|error]" >&2
  exit 1
fi

ICON="ℹ️"
case "$LEVEL" in
  success|ok|pass) ICON="✅" ;;
  warn|warning)    ICON="⚠️" ;;
  error|fail)      ICON="❌" ;;
  robot|agent|bot) ICON="🤖" ;;
  loop|ralph)      ICON="🌀" ;;
esac

TOK="${TELEGRAM_BOT_TOKEN:-$(doppler secrets get TELEGRAM_BOT_TOKEN --project serpent --config dev --plain 2>/dev/null || doppler secrets get TELEGRAM_BOT_TOKEN --project serpent --config dev_personal --plain 2>/dev/null || echo '')}"
CHAT="${TELEGRAM_CHAT_ID:-$(doppler secrets get TELEGRAM_CHAT_ID --project serpent --config dev --plain 2>/dev/null || doppler secrets get TELEGRAM_CHAT_ID --project serpent --config dev_personal --plain 2>/dev/null || echo '')}"

if [ -z "$TOK" ] || [ -z "$CHAT" ]; then
  echo "[tg-notify] Token or Chat ID not found in environment or Doppler. Skipping notification." >&2
  exit 0
fi

curl -s --max-time 10 -X POST "https://api.telegram.org/bot$TOK/sendMessage" \
  -d "chat_id=$CHAT" \
  -d "text=$ICON [Agent OS] $MSG" \
  -d "parse_mode=Markdown" > /dev/null 2>&1 || true

echo "[tg-notify] Sent: $ICON $MSG"
