#!/usr/bin/env bash
# runner-janitor — self-hosted runner box hygiene (WS3.3, v3.8.49 quality plan).
#
# The .113 runner box has recurring failure modes that until now were manual
# discipline: orphaned tmpfs/work dirs filling the disk, and >4 concurrent
# runners OOM-killing jobs (16 GB box; incidents on the v3.8.47 release day).
# Install via cron on the box (see docs/ops/RUNNER_BOX.md):
#   */30 * * * *  /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
#
# Exit codes: 0 healthy · 1 attention needed (printed to stdout for the log).
set -euo pipefail

MAX_ACTIVE_RUNNERS="${MAX_ACTIVE_RUNNERS:-4}"
DISK_ALERT_PCT="${DISK_ALERT_PCT:-85}"
WORK_DIR_MAX_AGE_HOURS="${WORK_DIR_MAX_AGE_HOURS:-24}"
STATUS=0

echo "[janitor] $(date -u +%FT%TZ) start"

# 1) Sweep stale runner temp/work leftovers (>24h — no legitimate job runs that long).
# Hardened for a root cron on world-writable paths: never follow a symlinked base
# (a compromised runner could plant one), -P + -xdev so the sweep cannot traverse
# out of the filesystem, and patterns narrowed to names OUR tooling creates
# (no generic tmp* — unrelated system temp files are out of scope).
for base in /tmp /home/*/actions-runner*/_work/_temp; do
  [ -d "$base" ] || continue
  [ -L "$base" ] && { echo "[janitor] skip symlinked base: $base"; continue; }
  find -P "$base" -xdev -maxdepth 1 \( -name 'runner-*' -o -name 'omniroute-*' \) \
    ! -type l -mmin +$((WORK_DIR_MAX_AGE_HOURS * 60)) -exec rm -rf {} + 2>/dev/null || true
done
echo "[janitor] stale temp sweep done"

# 2) Disk pressure — alert loudly before SQLITE_FULL kills jobs mid-run.
USAGE=$(df --output=pcent / | tail -1 | tr -dc '0-9')
if [ "$USAGE" -ge "$DISK_ALERT_PCT" ]; then
  echo "[janitor] ⚠ ROOT DISK ${USAGE}% >= ${DISK_ALERT_PCT}% — clean before the next heavy run"
  STATUS=1
else
  echo "[janitor] disk ${USAGE}% OK"
fi

# 3) Concurrency ceiling — 8-wide OOMed the 16 GB box twice on release day;
#    4 is the proven ceiling. This CODIFIES the rule that was manual discipline.
ACTIVE=$(pgrep -fc "Runner.Listener" || true)
if [ "${ACTIVE:-0}" -gt "$MAX_ACTIVE_RUNNERS" ]; then
  echo "[janitor] ⚠ ${ACTIVE} Runner.Listener processes > ceiling ${MAX_ACTIVE_RUNNERS} — stop the extra runners (systemctl stop actions.runner.<name>)"
  STATUS=1
else
  echo "[janitor] runners active: ${ACTIVE:-0}/${MAX_ACTIVE_RUNNERS} OK"
fi

echo "[janitor] done status=$STATUS"
exit "$STATUS"
