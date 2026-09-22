#!/usr/bin/env bash
# OmniRoute — translate the `__MISSING__:<en>` markers a branch adds, every locale in parallel.
#
# Why this exists: on 2026-09-16 eight feature PRs added 61 keys to `src/i18n/messages/en.json`
# and stamped `__MISSING__:<en>` into all 65 locales instead of translating. The new-key gate
# (`scripts/i18n/check-new-key-coverage.mjs`) now rejects markers, so a branch that adds keys
# has to translate them before its PR opens — and translating 65 locales one after the other
# is what makes people skip it. This runner does it in parallel and is safe to detach.
#
# What it does: N workers pop locale codes from a queue (`flock`-serialized) and each runs
#   node scripts/i18n/sync-ui-keys.mjs --catalog=<c> --locale=<code> --translate-markers --batch-size=40
# with up to 3 attempts per locale. A locale is DONE only when the run exits 0 AND its catalog
# carries no `__MISSING__` marker any more. Everything is written under `_artifacts/i18n-new-keys/`
# (gitignored, disposable):
#   <code>.log     the sync-ui-keys output of the last attempt
#   <code>.exit    0 on success, else the last exit code (1 when markers survived a rc=0 run)
#   batch.log      one line per attempt + START/END markers
#   batch.status   running | done | failed
#   batch.rc       the script's final exit code (written last — poll this file)
#   batch.pid      PID of this script (kill by PID, never `pkill -f`)
#
# Usage:
#   bash scripts/i18n/translate-new-keys.sh [--catalog=ui|cli] [--workers=N] [--locales=<csv>]
#   npm run i18n:translate-new-keys -- --locales=pt-BR,es
#   # detached (the session keeps working; poll _artifacts/i18n-new-keys/batch.rc):
#   mkdir -p _artifacts/i18n-new-keys
#   nohup setsid bash scripts/i18n/translate-new-keys.sh > _artifacts/i18n-new-keys/runner.out 2>&1 &
#
#   --catalog=ui|cli   ui = src/i18n/messages (default); cli = bin/cli/locales
#   --workers=N        parallel locales (default 5)
#   --locales=<csv>    subset of locale codes (default: every <code>.json in the catalog but en)
#
# Backend: the translation env block must be present — in the shell or in the repo `.env`
# (the script reads only the OMNIROUTE_TRANSLATION_* lines of `.env`; already-set variables
# win). Without it the script refuses to start and names the variables. It never leaves
# markers silently: the exit code is non-zero while any selected locale still carries one.
#
# Exit codes: 0 all selected locales translated · 1 some locale still has markers / failed ·
#             2 usage or environment error (nothing ran).
set -u

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROOT=$(cd "$SCRIPT_DIR/../.." && pwd)
ART="$ROOT/_artifacts/i18n-new-keys"

CATALOG=ui
WORKERS=5
LOCALES=""
RETRY_SLEEP=${OMNIROUTE_TRANSLATION_RETRY_SLEEP:-30}

usage() {
  sed -n '2,40p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
}

for arg in "$@"; do
  case "$arg" in
    --catalog=*) CATALOG="${arg#--catalog=}" ;;
    --workers=*) WORKERS="${arg#--workers=}" ;;
    --locales=*) LOCALES="${arg#--locales=}" ;;
    --locale=*) LOCALES="${arg#--locale=}" ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "[i18n-new-keys] unknown argument: $arg" >&2
      usage >&2
      exit 2
      ;;
  esac
done

case "$CATALOG" in
  ui) DIR="$ROOT/src/i18n/messages" ;;
  cli) DIR="$ROOT/bin/cli/locales" ;;
  *)
    echo "[i18n-new-keys] --catalog must be ui or cli (got: $CATALOG)" >&2
    exit 2
    ;;
esac

case "$WORKERS" in
  '' | *[!0-9]* | 0)
    echo "[i18n-new-keys] --workers must be a positive integer (got: $WORKERS)" >&2
    exit 2
    ;;
esac

# ----- translation backend env: shell first, then the OMNIROUTE_TRANSLATION_* lines of .env
load_translation_env() {
  local env_file="$ROOT/.env" line key value
  [ -f "$env_file" ] || return 0
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line#"${line%%[![:space:]]*}"}" # ltrim
    line="${line#export }"
    case "$line" in
      OMNIROUTE_TRANSLATION_*=*) ;;
      *) continue ;;
    esac
    key="${line%%=*}"
    value="${line#*=}"
    value="${value%"${value##*[![:space:]]}"}" # rtrim
    case "$value" in
      \"*\") value="${value#\"}" value="${value%\"}" ;;
      \'*\') value="${value#\'}" value="${value%\'}" ;;
    esac
    if [ -z "${!key:-}" ]; then
      export "$key=$value"
    fi
  done <"$env_file"
}
load_translation_env

REQUIRED_VARS="OMNIROUTE_TRANSLATION_API_URL OMNIROUTE_TRANSLATION_API_KEY OMNIROUTE_TRANSLATION_MODEL"
OPTIONAL_VARS="OMNIROUTE_TRANSLATION_CONCURRENCY OMNIROUTE_TRANSLATION_TIMEOUT_MS"
missing=""
for v in $REQUIRED_VARS; do
  [ -n "${!v:-}" ] || missing="$missing $v"
done
if [ -n "$missing" ]; then
  {
    echo "[i18n-new-keys] REFUSING TO START — translation backend not configured."
    echo "  Missing (required):$missing"
    echo "  The full block (put it in $ROOT/.env or export it in the shell):"
    for v in $REQUIRED_VARS $OPTIONAL_VARS; do
      if [ -n "${!v:-}" ]; then echo "    $v  (set)"; else echo "    $v  (MISSING)"; fi
    done
    echo "  Nothing was translated; the __MISSING__ markers are still in place and the"
    echo "  new-key gate (npm run i18n:check-new-keys) will reject them."
  } >&2
  exit 2
fi

# ----- locale selection: on-disk catalogs minus en, or the explicit --locales subset
selected=()
if [ -n "$LOCALES" ]; then
  IFS=',' read -r -a requested <<<"$LOCALES"
  for code in "${requested[@]}"; do
    code="${code//[[:space:]]/}"
    [ -n "$code" ] || continue
    if [ "$code" = "en" ]; then
      echo "[i18n-new-keys] en is the source catalog, skipping it" >&2
      continue
    fi
    if [ ! -f "$DIR/$code.json" ]; then
      echo "[i18n-new-keys] unknown locale: $code ($DIR/$code.json does not exist)" >&2
      exit 2
    fi
    selected+=("$code")
  done
else
  for f in "$DIR"/*.json; do
    code=$(basename "$f" .json)
    [ "$code" = "en" ] && continue
    selected+=("$code")
  done
fi
if [ "${#selected[@]}" -eq 0 ]; then
  echo "[i18n-new-keys] no locale selected" >&2
  exit 2
fi

# ----- artifacts (fresh per run for the selected locales)
mkdir -p "$ART"
QUEUE="$ART/queue.txt"
LOCK="$ART/queue.lock"
: >"$QUEUE"
for code in "${selected[@]}"; do
  echo "$code" >>"$QUEUE"
  rm -f "$ART/$code.exit"
done
rm -f "$ART/batch.rc"
echo running >"$ART/batch.status"
echo $$ >"$ART/batch.pid"

log() { echo "$*" >>"$ART/batch.log"; }

count_markers() {
  # grep -c prints 0 and exits 1 when nothing matches — the count is what we want.
  grep -c "__MISSING__" "$DIR/$1.json" 2>/dev/null || true
}

next_locale() {
  # pop the first line of the queue atomically
  (
    flock 9
    local l
    l=$(head -n 1 "$QUEUE")
    [ -n "$l" ] && sed -i '1d' "$QUEUE"
    echo "$l"
  ) 9>"$LOCK"
}

worker() {
  local id=$1 code rc left t0 wall attempt
  while :; do
    code=$(next_locale)
    [ -z "$code" ] && break
    for attempt in 1 2 3; do
      log "[$code] w$id attempt $attempt start $(date -Is)"
      t0=$(date +%s)
      (
        cd "$ROOT" && node scripts/i18n/sync-ui-keys.mjs --catalog="$CATALOG" --locale="$code" \
          --translate-markers --batch-size=40
      ) >"$ART/$code.log" 2>&1
      rc=$?
      wall=$(($(date +%s) - t0))
      left=$(count_markers "$code")
      log "[$code] w$id attempt $attempt exit=$rc wall=${wall}s markers_left=$left $(date -Is)"
      if [ "$rc" -eq 0 ] && [ "$left" -eq 0 ]; then
        echo 0 >"$ART/$code.exit"
        log "[$code] DONE"
        break
      fi
      if [ "$attempt" -eq 3 ]; then
        [ "$rc" -eq 0 ] && rc=1
        echo "$rc" >"$ART/$code.exit"
        log "[$code] FAILED exit=$rc markers_left=$left"
      else
        sleep "$RETRY_SLEEP"
      fi
    done
  done
}

echo "[i18n-new-keys] catalog=$CATALOG locales=${#selected[@]} workers=$WORKERS artifacts=$ART"
log "BATCH START catalog=$CATALOG workers=$WORKERS locales=${selected[*]} $(date -Is)"
pids=()
for i in $(seq 1 "$WORKERS"); do
  worker "$i" &
  pids+=("$!")
done
wait "${pids[@]}"

# ----- verdict: every selected locale must have exit 0 AND zero markers on disk
failed=""
for code in "${selected[@]}"; do
  ex=$(cat "$ART/$code.exit" 2>/dev/null || echo missing)
  left=$(count_markers "$code")
  if [ "$ex" != "0" ] || [ "$left" -ne 0 ]; then
    failed="$failed $code(exit=$ex,markers=$left)"
  fi
done

if [ -n "$failed" ]; then
  log "BATCH END failed:$failed $(date -Is)"
  echo failed >"$ART/batch.status"
  echo 1 >"$ART/batch.rc"
  echo "[i18n-new-keys] FAILED — markers still present or run failed for:$failed" >&2
  echo "  logs: $ART/<code>.log — re-run with --locales=<csv> for just those." >&2
  exit 1
fi

log "BATCH END ok $(date -Is)"
echo done >"$ART/batch.status"
echo 0 >"$ART/batch.rc"
echo "[i18n-new-keys] DONE — ${#selected[@]} locale(s) translated, no __MISSING__ marker left."
echo "  Now: npm run i18n:check-keys && npm run i18n:check-ratio && npm run i18n:check-new-keys"
exit 0
