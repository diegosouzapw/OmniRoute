#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# spawn-from-plan.sh — give your spawn_plan bodies (native Bot Mode only).
#
# Consumes the spawn_plan from OmniRoute POST /v1/router/execution and:
#   1. CREATES  one Hermes profile per body
#              (hermes profile create <name> --description "…" [--clone-from])
#   2. DISPATCHES missions in wave order
#              (hermes -p <bot> chat --in ~ -c "Bot Chat" -Q -q "…")
#   3. REPORTS  the outcome back to OmniRoute (POST /v1/router/outcomes)
#
# Default is DRY-RUN: it prints every command. Pass --apply to execute.
# The plan is ADVISORY (OmniRoute never spawns; --apply is your decision).
#
# Usage:
#   spawn-from-plan.sh plan.json [--apply]
#   spawn-from-plan.sh plan.json --report [VAR=value …]
#       report vars: OMNIROUTE_URL OMNIROUTE_KEY sources_found sources_verified
#                    quality_score latency_ms success model tools
#
# Requires: hermes (Desktop ≥ v0.20.3, Bot Mode on), jq, curl (for --report)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

PLAN_FILE="${1:?usage: spawn-from-plan.sh plan.json [--apply | --report VAR=value …]}"
MODE="${2:-}"
[ $# -gt 0 ] && shift
[ $# -gt 0 ] && shift

command -v jq >/dev/null 2>&1 || { echo "jq required"; exit 1; }
command -v hermes >/dev/null 2>&1 || { echo "hermes CLI required (Desktop ≥ v0.20.3)"; exit 1; }
[ -f "$PLAN_FILE" ] || { echo "plan file not found: $PLAN_FILE"; exit 1; }

# --report extra args are VAR=value pairs
for kv in "$@"; do
  case "$kv" in
    *=*) k="${kv%%=*}"; v="${kv#*=}"; printf -v "$k" '%s' "$v" ;;
  esac
done

APPLY=0
case "$MODE" in
  --apply) APPLY=1 ;;
  *) : ;; # dry-run (default) and --report
esac

run() { # echo always; execute only with --apply
  if [ "$APPLY" -eq 1 ]; then "$@"; else echo "    $*"; fi
}

WORKFLOW=$(jq -r '.evidence.workflow // "mission"' "$PLAN_FILE")
BODIES=$(jq -r '.bodies | length' "$PLAN_FILE")
COORD_MODE=$(jq -r '.coordination.mode // "inbox_handoffs"' "$PLAN_FILE")

echo "── spawn plan: ${WORKFLOW} — ${BODIES} bodies, coordination: ${COORD_MODE}"

# ── 1. CREATE — one profile per body ────────────────────────────────────────
echo "── 1/3 create bodies (hermes profile create)"
i=0
while [ "$i" -lt "$BODIES" ]; do
  NAME=$(jq -r ".bodies[$i].name" "$PLAN_FILE")
  DESC=$(jq -r ".bodies[$i].description" "$PLAN_FILE")
  CLONE=$(jq -r ".bodies[$i].clone_from // empty" "$PLAN_FILE")
  MODEL=$(jq -r ".bodies[$i].model // \"(inherit launch profile)\"" "$PLAN_FILE")
  ROLE=$(jq -r ".bodies[$i].role" "$PLAN_FILE")

  if hermes profile list 2>/dev/null | grep -qw "$NAME"; then
    echo "  • $NAME already exists — reusing (its memory persists)"
  else
    CLONE_ARGS=""
    [ -n "$CLONE" ] && CLONE_ARGS="--clone-from $CLONE"
    echo "  • $NAME ($ROLE, brain: $MODEL)"
    # shellcheck disable=SC2086
    run hermes profile create "$NAME" --description "$DESC" --no-skills $CLONE_ARGS
  fi
  # The brain (model pin) rides the clone template; otherwise pin once via
  # Desktop (New Agent → Advanced → Model & provider pin) or in-session:
  #   hermes -p "$NAME" chat  →  /model $MODEL --global
  if [ "$MODEL" != "(inherit launch profile)" ]; then
    echo "      pin: $MODEL  (clone template | Desktop Advanced pin | /model $MODEL --global)"
  fi
  i=$((i + 1))
done

# ── 2. DISPATCH — missions in wave order ────────────────────────────────────
echo "── 2/3 dispatch missions (Bot Chat handoffs, wave order)"
WAVES=$(jq -r '.waves | length' "$PLAN_FILE")
w=0
while [ "$w" -lt "$WAVES" ]; do
  WAVE_NAME=$(jq -r ".waves[$w].name" "$PLAN_FILE")
  PARALLEL=$(jq -r ".waves[$w].parallel" "$PLAN_FILE")
  if [ "$PARALLEL" = "true" ]; then KIND="parallel"; else KIND="sequential"; fi
  echo "  wave $((w + 1))/${WAVES}: ${WAVE_NAME} (${KIND})"
  j=0
  WAVE_BODIES=$(jq -r ".waves[$w].bodies | length" "$PLAN_FILE")
  while [ "$j" -lt "$WAVE_BODIES" ]; do
    NAME=$(jq -r ".waves[$w].bodies[$j]" "$PLAN_FILE")
    MISSION=$(jq -r ".bodies[] | select(.name == \"$NAME\") | .mission" "$PLAN_FILE")
    echo "    → ${NAME}: ${MISSION:0:100}…"
    run hermes -p "$NAME" chat --in ~ -c "Bot Chat" -Q -q "$MISSION"
    j=$((j + 1))
  done
  w=$((w + 1))
done

if [ "$COORD_MODE" = "group_room" ]; then
  echo "  room: open Desktop → Bots → group these bots → group header →"
  echo "        \"Open chat\" (rooms are native UI: 2-6 bots, ≤3 rounds, ≤10 msgs/turn)"
fi

# ── 3. REPORT — close the loop (B16.1 outcome callback) ─────────────────────
echo "── 3/3 report the outcome"
report_payload() {
  TOOLS_JSON=$(printf '%s' "${tools:-[]}" | jq -c '.' 2>/dev/null || printf '[]')
  jq -n --arg wf "$WORKFLOW" --arg m "${model:-}" --argjson t "$TOOLS_JSON" \
    --argjson sf "${sources_found:-0}" --argjson sv "${sources_verified:-0}" \
    --argjson q "${quality_score:-0}" --argjson l "${latency_ms:-0}" \
    --argjson s "${success:-true}" \
    '{workflow: $wf, model: (if $m == "" then null else $m end), tools: $t,
      sources_found: $sf, sources_verified: $sv, quality_score: $q,
      latency_ms: $l, success: $s}'
}
case "$MODE" in
  --report)
    command -v curl >/dev/null 2>&1 || { echo "curl required for --report"; exit 1; }
    : "${OMNIROUTE_URL:?OMNIROUTE_URL required}"
    : "${OMNIROUTE_KEY:?OMNIROUTE_KEY required}"
    curl -s -X POST "${OMNIROUTE_URL%/}/v1/router/outcomes" \
      -H "Authorization: Bearer ${OMNIROUTE_KEY}" \
      -H 'Content-Type: application/json' \
      -d "$(report_payload)"
    echo
    ;;
  *)
    echo "  when the mission lands, close the loop:"
    echo "  spawn-from-plan.sh ${PLAN_FILE} --report OMNIROUTE_URL=https://… \\"
    echo "      OMNIROUTE_KEY=… sources_found=14 sources_verified=12 quality_score=0.91 \\"
    echo "      latency_ms=38000 success=true model=<body's model> tools='[\"camofox\"]'"
    ;;
esac

echo "── done. The judgment stayed with you (advisory — CORE.md §3.1)."
