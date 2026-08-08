#!/usr/bin/env bash
# OmniRoute restore — подставить БД с рабочими провайдерами и поднять сервис без API-ключа.
# Бэкап активной БД уже сделан: ~/.omniroute/storage.sqlite.bak-20260727
# Usage: bash scripts/context-optimizer/omniroute-restore.sh

set -uo pipefail

SRC="/Users/work/serpentos/packages/omniroute/storage.sqlite"
DST="$HOME/.omniroute/storage.sqlite"
APP="/Users/work/OmniRoute"
LOG="$HOME/.tokensaver/omniroute.log"

ok()   { printf '\033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '\033[33m!\033[0m %s\n' "$1"; }
die()  { printf '\033[31m✗\033[0m %s\n' "$1"; exit 1; }

[ -f "$SRC" ] || die "нет исходной БД: $SRC"
[ -d "$APP" ] || die "нет $APP"

# --- 1. Свежий бэкап (поверх старого не пишем) --------------------------------

if [ -f "$DST" ]; then
  B="$DST.bak-$(date +%Y%m%d-%H%M%S)"
  cp "$DST" "$B" && ok "бэкап активной БД: $B"
fi

# --- 2. Остановить, если что-то слушает 20128 ---------------------------------

if lsof -ti :20128 -sTCP:LISTEN >/dev/null 2>&1; then
  pkill -f 'omniroute' 2>/dev/null || true
  sleep 3
  ok "старый инстанс остановлен"
fi

# --- 3. Подставить БД ---------------------------------------------------------

cp "$SRC" "$DST" || die "не удалось скопировать БД"
N=$(sqlite3 "$DST" "select count(*) from provider_connections;" 2>/dev/null || echo '?')
ok "БД подставлена, провайдеров: $N"

# --- 4. Старт без требования API-ключа ----------------------------------------

mkdir -p "$(dirname "$LOG")"
cd "$APP" || die "cd $APP"
REQUIRE_API_KEY=false nohup omniroute >> "$LOG" 2>&1 &
warn "жду старта (до 40с)"

for _ in $(seq 1 20); do
  sleep 2
  code=$(curl -s -o /dev/null -w '%{http_code}' -m 5 http://localhost:20128/v1/models 2>/dev/null || echo 000)
  [ "$code" = "200" ] && break
done
[ "${code:-000}" = "200" ] || die "не поднялся, смотри $LOG (tail -40)"
ok "сервис на :20128 отвечает"

# --- 5. Живая проверка провайдера ---------------------------------------------

echo
echo "Проверка /v1/messages (то, на чём говорит Claude Code):"
for m in cc/claude-sonnet-5 nvidia/meta/llama-3.1-8b-instruct groq/llama-3.3-70b-versatile; do
  r=$(curl -s -m 60 http://localhost:20128/v1/messages \
        -H "Content-Type: application/json" -H "anthropic-version: 2023-06-01" \
        -d "{\"model\":\"$m\",\"max_tokens\":12,\"messages\":[{\"role\":\"user\",\"content\":\"say pong\"}]}")
  printf '  %-38s ' "$m"
  printf '%s' "$r" | python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    print('ERR:', d['error'].get('message','')[:70]) if 'error' in d \
        else print('OK ->', str(d.get('content',[{}])[0].get('text',''))[:40].replace(chr(10),' '))
except Exception:
    print('bad response')
"
done

echo
echo "Если хоть одна строка OK — скажи агенту, он переключит Claude Code на :20128."
echo "Откат БД:  cp ~/.omniroute/storage.sqlite.bak-* ~/.omniroute/storage.sqlite"
