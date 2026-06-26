#!/usr/bin/env bash
# bin/cold-start-bench.sh — measure OmniRoute cold-start against the budgets in
# docs/PERF_BUDGETS.md §5 (container start → HTTP listening ≤ 800 ms; first warm
# TTFB ≤ 200 ms). Boots the server on a throwaway port, times until
# /api/health/ping answers 200, measures a warm request, and reports PASS/FAIL.
set -euo pipefail
SCRIPT_NAME="cold-start-bench"
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ops-common.sh"

usage() {
  cat <<'EOF'
Usage: bin/cold-start-bench.sh [--port <n>] [--start-cmd "<cmd>"] [--url <base>]
                               [--listen-budget-ms <n>] [--ttfb-budget-ms <n>] [-h|--help]

Boots OmniRoute, times cold-start to the first /api/health/ping 200, measures
warm TTFB, and compares against the PERF_BUDGETS.md §5 budgets
(listen ≤ 800 ms, TTFB ≤ 200 ms). Exits non-zero if a budget is exceeded.

--url benches an already-running server instead of booting one (skips the boot
timing; only TTFB is measured).
EOF
}

PORT="${PORT:-21987}"
START_CMD=""
BASE_URL=""
LISTEN_BUDGET_MS=800
TTFB_BUDGET_MS=200

while [ $# -gt 0 ]; do
  case "$1" in
    --port) PORT="${2:?--port needs a value}"; shift 2 ;;
    --start-cmd) START_CMD="${2:?--start-cmd needs a value}"; shift 2 ;;
    --url) BASE_URL="${2:?--url needs a value}"; shift 2 ;;
    --listen-budget-ms) LISTEN_BUDGET_MS="${2:?}"; shift 2 ;;
    --ttfb-budget-ms) TTFB_BUDGET_MS="${2:?}"; shift 2 ;;
    -h | --help) usage; exit 0 ;;
    *) ops_die "unknown argument: $1 (see --help)" ;;
  esac
done

ops_require_cmd curl

now_ms() { date +%s%3N; } # ms since epoch (GNU date / Linux)
ping_ok() { curl -fsS -o /dev/null --max-time 2 "$1/api/health/ping" 2>/dev/null; }

SERVER_PID=""
cleanup() { [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT

if [ -n "$BASE_URL" ]; then
  ops_log "benching already-running server at $BASE_URL (boot timing skipped)"
  listen_ms=""
else
  BASE_URL="http://127.0.0.1:$PORT"
  [ -n "$START_CMD" ] || START_CMD="npm start -- --port $PORT"
  ops_log "booting: $START_CMD"
  start_ms="$(now_ms)"
  # shellcheck disable=SC2086
  PORT="$PORT" $START_CMD >/tmp/omniroute-coldstart.log 2>&1 &
  SERVER_PID="$!"
  deadline=$(($(now_ms) + 30000))
  until ping_ok "$BASE_URL"; do
    kill -0 "$SERVER_PID" 2>/dev/null || ops_die "server process exited during boot (see /tmp/omniroute-coldstart.log)"
    [ "$(now_ms)" -gt "$deadline" ] && ops_die "server did not answer /api/health/ping within 30s"
    sleep 0.05
  done
  listen_ms=$(($(now_ms) - start_ms))
fi

ping_ok "$BASE_URL" || ops_die "server at $BASE_URL is not answering /api/health/ping"
ttfb_ms="$(curl -fsS -o /dev/null -w '%{time_starttransfer}' "$BASE_URL/api/health/ping" | awk '{printf "%d", $1 * 1000}')"

fail=0
if [ -n "$listen_ms" ]; then
  echo "cold-start (start → listening): ${listen_ms} ms (budget ${LISTEN_BUDGET_MS} ms)"
  [ "$listen_ms" -le "$LISTEN_BUDGET_MS" ] || { echo "FAIL: listen budget exceeded"; fail=1; }
fi
echo "warm TTFB:                      ${ttfb_ms} ms (budget ${TTFB_BUDGET_MS} ms)"
[ "$ttfb_ms" -le "$TTFB_BUDGET_MS" ] || { echo "FAIL: TTFB budget exceeded"; fail=1; }
[ "$fail" -eq 0 ] && echo "PASS: within cold-start budgets"
exit "$fail"
