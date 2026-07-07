#!/usr/bin/env bash
# Phase 3 cutover runbook script for argismonitor (was OmniRoute v4).
# Usage:
#   ./scripts/cutover.sh 1     # 1% rollout
#   ./scripts/cutover.sh 10    # 10% rollout
#   ./scripts/cutover.sh 50    # 50% rollout
#   ./scripts/cutover.sh 100   # full cutover
#   ./scripts/cutover.sh 0     # rollback to Next.js for everyone
#   ./scripts/cutover.sh health   # check SLOs without changing rollout
#
# Reads:
#   BFF_URL      - argismonitor BFF URL (default http://localhost:4322)
#   NEXTJS_URL   - Next.js upstream URL (default http://localhost:20128)
#   STAGE        - 'staging' or 'prod' (affects confirmation prompt)
#
# Writes:
#   Nothing directly; just performs health checks and prints recommended
#   environment variable changes to apply to the production runtime.

set -euo pipefail

BFF_URL=${BFF_URL:-http://localhost:4322}
NEXTJS_URL=${NEXTJS_URL:-http://localhost:20128}
STAGE=${STAGE:-staging}

log() { printf "\033[1;36m[cutover]\033[0m %s\n" "$*"; }
err() { printf "\033[1;31m[cutover ERROR]\033[0m %s\n" "$*" >&2; }
ok()  { printf "\033[1;32m[cutover OK]\033[0m %s\n" "$*"; }

bff_health() {
  curl -fsS --max-time 5 "$BFF_URL/healthz" || { err "BFF health failed"; return 1; }
}
bff_per_route(path) {
  curl -fsS --max-time 5 "$BFF_URL/api/v1$path" -H "Cookie: web_stack=svelte" -o /dev/null -w "%{http_code}\n" || true
}
nextjs_health() {
  curl -fsS --max-time 5 "$NEXTJS_URL/healthz" || { err "Next.js health failed"; return 1; }
}

slo_check() {
  log "Running SLO checks..."
  local s50 s95 s99 rps err_rate
  s50=$(curl -fsS "$BFF_URL/api/dashboard/observability/overview" | jq -r .p50 2>/dev/null || echo "?")
  s95=$(curl -fsS "$BFF_URL/api/dashboard/observability/overview" | jq -r .p95 2>/dev/null || echo "?")
  s99=$(curl -fsS "$BFF_URL/api/dashboard/observability/overview" | jq -r .p99 2>/dev/null || echo "?")
  rps=$(curl -fsS "$BFF_URL/api/dashboard/observability/overview" | jq -r .rps 2>/dev/null || echo "?")
  err_rate=$(curl -fsS "$BFF_URL/api/dashboard/observability/overview" | jq -r .errorRate 2>/dev/null || echo "?")
  log "p50=${s50}ms p95=${s95}ms p99=${s99}ms rps=${rps} errorRate=${err_rate}"
  if [[ "$s95" != "?" && "$s95" -gt 500 ]]; then err "p95 > 500ms"; return 1; fi
  if [[ "$err_rate" != "?" ]]; then
    local pct
    pct=$(echo "$err_rate * 100" | bc -l 2>/dev/null || echo "?")
    if [[ "$pct" != "?" && "${pct%.*}" -gt 5 ]]; then err "error rate > 5%"; return 1; fi
  fi
  ok "SLOs nominal"
}

case "${1:-help}" in
  health)
    log "BFF healthz:"; bff_health || exit 1
    log "Next.js healthz:"; nextjs_health || exit 1
    log "BFF per-route (svelte cookie):"
    for r in /chat/completions /dashboard/health /dashboard/performance; do
      printf "  %-30s -> " "$r"
      bff_per_route "$r"
    done
    slo_check
    ;;

  0)
    log "ROLLBACK to 0% (all users back on Next.js)"
    [[ "$STAGE" == "prod" ]] && { err "prod rollback - confirm by passing STAGE=prod"; exit 1; }
    log "Set on the prod runtime:"
    echo "  OMNI_WEB_STACK_ROLLOUT=0"
    ok "Rollback plan printed. Apply via your env config / k8s manifest / etc."
    ;;

  1|10|50|100)
    PCT="$1"
    log "Cutover to $PCT% Svelte stack (Stage: $STAGE)"
    [[ "$PCT" == "100" && "$STAGE" == "staging" ]] && { err "Refuse to flip prod to 100% from staging - set STAGE=prod"; exit 1; }
    log "Pre-flight health:"
    bff_health || { err "BFF not healthy - abort"; exit 1; }
    nextjs_health || { err "Next.js not healthy - abort"; exit 1; }
    log "SLOs:"
    slo_check
    log "Set on the prod runtime (rollout $PCT%):"
    echo "  OMNI_WEB_STACK=svelte"
    echo "  OMNI_WEB_STACK_ROLLOUT=$PCT"
    echo "  NEXTJS_UPSTREAM=$NEXTJS_URL"
    echo "  OMNIROUTE_BFF_SOCKET=/var/run/omniroute/bff.sock   (if using kbridge)"
    log "Watch dashboard for 15m:"
    echo "  - 4xx/5xx error rate should stay < 0.5%"
    echo "  - p95 latency should stay < 500ms"
    echo "  - rollback if either crosses:  OMNI_WEB_STACK_ROLLOUT=0"
    ok "Cutover plan printed. Apply via your env config."
    ;;

  *)
    cat <<USAGE
argismonitor cutover runbook

USAGE:
  ./scripts/cutover.sh <rollout_pct|0|health>
    rollout_pct : 1, 10, 50, or 100 (incremental rollout)
    0           : rollback to 100% Next.js
    health      : SLO + per-route health check (no rollout change)

ENV:
  BFF_URL     argismonitor BFF URL (default http://localhost:4322)
  NEXTJS_URL  Next.js upstream (default http://localhost:20128)
  STAGE       'staging' or 'prod' (default staging)
USAGE
    ;;
esac
