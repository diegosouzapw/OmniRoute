#!/usr/bin/env bash
# TokenSaver bootstrap — запуск прокси :4000, health-check, установка launchd guard.
# Идемпотентен: повторный запуск ничего не ломает.
# Usage: bash scripts/context-optimizer/tokensaver-bootstrap.sh

set -uo pipefail

REPO="/Users/work/serpentos"
TS_HOME="$HOME/token-saver"
TS_STATE="$HOME/.tokensaver"
PLIST_SRC="$REPO/scripts/context-optimizer/com.serpent.tokensaver-guard.plist"
PLIST_DST="$HOME/Library/LaunchAgents/com.serpent.tokensaver-guard.plist"

ok()   { printf '\033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '\033[33m!\033[0m %s\n' "$1"; }
die()  { printf '\033[31m✗\033[0m %s\n' "$1"; exit 1; }

# --- 1. Предусловия -----------------------------------------------------------

[ -f "$TS_HOME/tokensaver.py" ] || die "нет $TS_HOME/tokensaver.py — сначала: git clone https://github.com/huivrotiki/token-saver $TS_HOME"
mkdir -p "$TS_STATE"

if [ ! -f "$TS_STATE/.env" ]; then
  warn "нет $TS_STATE/.env — прокси поднимется, но облачный fallback будет недоступен"
else
  chmod 600 "$TS_STATE/.env"
  ok ".env на месте, права 600"
fi

# --- 2. Конфликт порта 4000 ---------------------------------------------------

PORT_PID="$(lsof -ti :4000 2>/dev/null | head -1 || true)"
if [ -n "$PORT_PID" ]; then
  PORT_CMD="$(ps -p "$PORT_PID" -o command= 2>/dev/null || echo '?')"
  case "$PORT_CMD" in
    *tokensaver.py*) ok "порт 4000 уже занят TokenSaver (pid $PORT_PID)" ;;
    *) die "порт 4000 занят чужим процессом (pid $PORT_PID): $PORT_CMD — освободи его или смени порт этому сервису" ;;
  esac
fi

# --- 3. Запуск ----------------------------------------------------------------

health() { curl -s -m 5 http://localhost:4000/health 2>/dev/null || true; }

if ! health | grep -q '"status":"ok"'; then
  warn "прокси не отвечает, запускаю"
  nohup /usr/bin/python3 "$TS_HOME/tokensaver.py" --server >> "$TS_STATE/tokensaver.log" 2>&1 &
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    sleep 1
    health | grep -q '"status":"ok"' && break
  done
fi

H="$(health)"
if printf '%s' "$H" | grep -q '"status":"ok"'; then
  ok "прокси :4000 жив — $H"
else
  die "прокси не поднялся, смотри $TS_STATE/tokensaver.log (tail -50)"
fi

# --- 4. launchd guard ---------------------------------------------------------

[ -f "$PLIST_SRC" ] || die "нет $PLIST_SRC"
mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_SRC" "$PLIST_DST"
plutil -lint "$PLIST_DST" >/dev/null || die "битый plist"

launchctl unload "$PLIST_DST" 2>/dev/null || true
if launchctl load "$PLIST_DST" 2>/dev/null; then
  ok "guard загружен в launchd (health-check каждые 10 мин)"
else
  warn "launchctl load не отработал — проверь вручную: launchctl list | grep tokensaver"
fi

# --- 5. Итог ------------------------------------------------------------------

echo
echo "Проверки:"
echo "  curl -s localhost:4000/health | python3 -m json.tool"
echo "  curl -s localhost:4000/stats  | python3 -m json.tool"
echo "  launchctl list | grep tokensaver"
echo "  tail -20 $TS_STATE/guard.log"
echo
echo "Подключение сессии:  export ANTHROPIC_BASE_URL=http://localhost:4000"
