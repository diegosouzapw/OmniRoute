#!/usr/bin/env bash
# runner-janitor — self-hosted runner box hygiene for the .113 pool.
#
# Runs from cron every 30 min (see docs/ops/RUNNER_BOX.md). It ACTS on what it
# can prove is safe and ALERTS on what needs an operator decision. Reads of
# "is this in use?" and the removal happen in the same command, never in two
# passes: a check-then-delete with a gap is how a live Build job lost its _work
# on 2026-08-27.
#
# Measured box (2026-08-28): 31 GB RAM, 32 cores, 15 GB swap, /tmp = 12 GB
# tmpfs (RAM!), 188 GB disk. A single `next-build` peaks at ~14 GB, so two
# concurrent heavy builds saturate the box and three take it down (06:42Z that
# day: load 56, two jobs lost). The v3.8.50 postmortem (Parte III) has the numbers.
#
# What it does, in order:
#   1) sweep stale artefacts our tooling leaves behind — tmpfs bases after 3 h
#      (they hold RAM), disk _work/_temp bases after 24 h; only names we create,
#      only when no process has them open
#   2) kill zombie builds: a `next-build` older than ZOMBIE_BUILD_MAX_MIN has no
#      job attached (a real Build step measures ~26 min). On 2026-08-27 one ran
#      70 minutes after GitHub had already declared its job lost, eating 3.6 GB
#      and a full core set. KillMode=mixed on the units covers systemctl
#      stop/restart; this covers the lost-connection path.
#   3) prune 48 h-old checkouts under _work of runners whose unit is INACTIVE
#      (stopped runners cannot be mid-job; active ones are never touched)
#   4) alert: root disk >= DISK_ALERT_PCT, memory PSI full/avg60 >= threshold,
#      Runner.Listener count above the ceiling (with a per-project breakdown —
#      the box also hosts OmniHeuris and OmniMind runners)
#
# Usage: runner-janitor.sh [--dry-run] [--help]
# Exit codes: 0 healthy · 1 attention needed (printed to stdout for the log).
set -euo pipefail

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    -h|--help)
      sed -n '2,32p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "unknown argument: $arg" >&2; exit 2 ;;
  esac
done

MAX_ACTIVE_RUNNERS="${MAX_ACTIVE_RUNNERS:-8}"
DISK_ALERT_PCT="${DISK_ALERT_PCT:-85}"
TMPFS_MAX_AGE_HOURS="${TMPFS_MAX_AGE_HOURS:-3}"
WORK_TEMP_MAX_AGE_HOURS="${WORK_TEMP_MAX_AGE_HOURS:-24}"
WORK_CHECKOUT_MAX_AGE_HOURS="${WORK_CHECKOUT_MAX_AGE_HOURS:-48}"
ZOMBIE_BUILD_MAX_MIN="${ZOMBIE_BUILD_MAX_MIN:-75}"
ZOMBIE_BUILD_COMM="${ZOMBIE_BUILD_COMM:-next-build}"
PSI_FULL_AVG60_ALERT="${PSI_FULL_AVG60_ALERT:-10}"
# Overridable so the unit test can point everything at a fixture tree.
JANITOR_TMP_BASES="${JANITOR_TMP_BASES-/tmp}"
JANITOR_WORK_TEMP_BASES="${JANITOR_WORK_TEMP_BASES-/opt/actions-runner*/_work/_temp /home/*/actions-runner*/_work/_temp}"
JANITOR_RUNNER_DIRS="${JANITOR_RUNNER_DIRS-/opt/actions-runner*}"
JANITOR_PSI_FILE="${JANITOR_PSI_FILE:-/proc/pressure/memory}"
JANITOR_DF_PATH="${JANITOR_DF_PATH:-/}"

STATUS=0
say() { echo "[janitor] $*"; }

# "Is anything using this?" — ONE snapshot of every open path on the box
# (lsof -Fn), then a prefix match per candidate. `lsof +D <dir>` walks the whole
# tree instead and took minutes on a 5 GB leftover — unusable from cron. An
# absent lsof means "cannot prove idle": the sweep keeps the path and says so.
LSOF_BIN="${JANITOR_LSOF:-lsof}"
have_busy_tools() { command -v "$LSOF_BIN" >/dev/null 2>&1; }
SNAP=""
cleanup() { [ -n "$SNAP" ] && rm -f -- "$SNAP"; }
trap cleanup EXIT
# One lsof for the whole run (~13 s / 83k lines on the box), kept ONLY for the
# bases we sweep — 460 candidates grepping a re-printed 83k-line string was the
# slow part, not lsof itself.
snapshot_open_paths() {
  have_busy_tools || return 0
  SNAP=$(mktemp) || return 0
  local prefixes="" b
  for b in $JANITOR_TMP_BASES $JANITOR_WORK_TEMP_BASES; do [ -d "$b" ] && prefixes="$prefixes"$'\n'"$b/"; done
  # -F n: one "n<path>" line per open file; -w: no warnings
  "$LSOF_BIN" -w -Fn 2>/dev/null | sed -n 's/^n//p' | grep -F -f <(printf '%s' "$prefixes" | sed '/^$/d') > "$SNAP" 2>/dev/null || true
}
is_busy() {
  local p="$1"
  [ -n "$SNAP" ] && [ -s "$SNAP" ] || return 1
  # exact path, or anything beneath it when it is a directory
  grep -qxF -- "$p" "$SNAP" && return 0
  [ -d "$p" ] && grep -qF -- "$p/" "$SNAP"
}

# sweep <base> <max-age-minutes>: only names our tooling creates, never through
# a symlinked base, never across a filesystem, and remove+check in one step.
sweep() {
  local base="$1" max_min="$2" p
  [ -d "$base" ] || return 0
  [ -L "$base" ] && { say "skip symlinked base: $base"; return 0; }
  while IFS= read -r -d '' p; do
    if ! have_busy_tools; then say "cannot prove idle (lsof missing — apt install lsof), kept: $p"; STATUS=1; continue; fi
    if is_busy "$p"; then say "busy, kept: $p"; continue; fi
    if [ "$DRY_RUN" -eq 1 ]; then say "would remove ($(( max_min / 60 ))h+): $p"; else rm -rf -- "$p" && say "removed ($(( max_min / 60 ))h+): $p"; fi
  done < <(find -P "$base" -xdev -mindepth 1 -maxdepth 1 \
      \( -name 'runner-*' -o -name 'omniroute-*' -o -name 'next-build*' -o -name 'e2e-build.tar.gz' \) \
      ! -type l -mmin "+$max_min" -print0 2>/dev/null || true)
}

say "$(date -u +%FT%TZ) start${DRY_RUN:+ (dry-run=$DRY_RUN)} busy-tools=$(have_busy_tools && echo ok || echo MISSING)"

# 1) stale artefacts — tmpfs is RAM, so it gets the short fuse
snapshot_open_paths
for base in $JANITOR_TMP_BASES; do sweep "$base" $(( TMPFS_MAX_AGE_HOURS * 60 )); done
for base in $JANITOR_WORK_TEMP_BASES; do sweep "$base" $(( WORK_TEMP_MAX_AGE_HOURS * 60 )); done
say "stale temp sweep done"

# 2) zombie builds
ZOMBIES=0
while read -r pid etimes comm; do
  [ -n "${pid:-}" ] || continue
  if [ "$etimes" -gt $(( ZOMBIE_BUILD_MAX_MIN * 60 )) ]; then
    say "⚠ zombie build pid=$pid comm=$comm age=$(( etimes / 60 ))min > ${ZOMBIE_BUILD_MAX_MIN}min — no job runs this long"
    if [ "$DRY_RUN" -eq 1 ]; then say "[dry-run] would: kill -TERM $pid (then -KILL)"; else
      kill -TERM "$pid" 2>/dev/null || true; sleep 10
      kill -0 "$pid" 2>/dev/null && { kill -KILL "$pid" 2>/dev/null || true; say "  needed SIGKILL"; }
    fi
    ZOMBIES=$(( ZOMBIES + 1 )); STATUS=1
  fi
done < <(ps -eo pid=,etimes=,comm= 2>/dev/null | awk -v c="$ZOMBIE_BUILD_COMM" '$3 ~ ("^" c) {print $1, $2, $3}' || true)
say "zombie builds: $ZOMBIES"

# 3) old checkouts of STOPPED runners
for d in $JANITOR_RUNNER_DIRS; do
  [ -d "$d" ] && [ -f "$d/.runner" ] || continue
  agent=$(grep -o '"agentName": *"[^"]*"' "$d/.runner" 2>/dev/null | sed 's/.*"\([^"]*\)"$/\1/')
  [ -n "$agent" ] || continue
  unit=$(systemctl list-units --plain --no-legend "actions.runner.*.${agent}.service" 2>/dev/null | awk 'NR==1{print $1}')
  [ -n "$unit" ] || continue
  if systemctl is-active --quiet "$unit"; then continue; fi
  while IFS= read -r -d '' co; do
    if [ "$DRY_RUN" -eq 1 ]; then say "would prune checkout of stopped runner $agent: $co"; else rm -rf -- "$co" && say "pruned checkout of stopped runner $agent: $co"; fi
  done < <(find -P "$d/_work" -xdev -mindepth 2 -maxdepth 2 -type d -mmin "+$(( WORK_CHECKOUT_MAX_AGE_HOURS * 60 ))" -print0 2>/dev/null || true)
done

# 4a) disk
USAGE=$(df --output=pcent "$JANITOR_DF_PATH" 2>/dev/null | tail -1 | tr -dc '0-9')
if [ "${USAGE:-0}" -ge "$DISK_ALERT_PCT" ]; then
  say "⚠ ROOT DISK ${USAGE}% >= ${DISK_ALERT_PCT}% — clean before the next heavy run"; STATUS=1
else
  say "disk ${USAGE:-?}% OK"
fi

# 4b) memory pressure (PSI) — the box swapped its way through the v3.8.50 publish
if [ -r "$JANITOR_PSI_FILE" ]; then
  FULL60=$(awk '/^full/ {for(i=1;i<=NF;i++) if ($i ~ /^avg60=/) {sub("avg60=","",$i); print $i}}' "$JANITOR_PSI_FILE" 2>/dev/null || echo "")
  if [ -n "$FULL60" ] && awk -v v="$FULL60" -v t="$PSI_FULL_AVG60_ALERT" 'BEGIN{exit !(v+0 >= t+0)}'; then
    say "⚠ MEMORY PRESSURE psi full/avg60=${FULL60}% >= ${PSI_FULL_AVG60_ALERT}% — too many heavy jobs at once"; STATUS=1
  else
    say "memory psi full/avg60=${FULL60:-n/a}% OK"
  fi
fi

# 4c) concurrency ceiling — alert with a breakdown; the fix is fewer/labelled
#     runners (an operator decision), not killing listeners from cron.
ACTIVE=$(pgrep -fc "Runner.Listener" || true)
OMNI=$(pgrep -fc "actions-runner-omniroute[^ ]*/bin[^ ]*/Runner.Listener" || true)
if [ "${ACTIVE:-0}" -gt "$MAX_ACTIVE_RUNNERS" ]; then
  say "⚠ ${ACTIVE} Runner.Listener processes (omniroute=${OMNI:-0}, other=$(( ${ACTIVE:-0} - ${OMNI:-0} ))) > ceiling ${MAX_ACTIVE_RUNNERS} — stop idle extras: systemctl stop <unit> only when it has no Runner.Worker child"
  STATUS=1
else
  say "runners active: ${ACTIVE:-0}/${MAX_ACTIVE_RUNNERS} (omniroute=${OMNI:-0}) OK"
fi

say "done status=$STATUS"
exit "$STATUS"
