#!/usr/bin/env bash
# setup-autonomous-routines.sh — Automated Cron & Launchd Routine Setup for Serpent OS
# Configures crontab with:
#   1. Every 15 min: Jarvis Autonomous Heartbeat & Watchdog (jarvis-heartbeat.sh)
#   2. Every 30 min: Memory Continuity Loop (serpent-continuity.sh)
#   3. Daily at 04:00 AM: Memory Consolidation (consolidate-memory.sh)
#
# Usage:
#   bash scripts/setup-autonomous-routines.sh [--uninstall]

set -euo pipefail

WORK_DIR="/Users/work/serpentos"
LOG_FILE="/tmp/serpent-routines-setup.log"
UNINSTALL=0

if [[ "${1:-}" == "--uninstall" ]]; then
  UNINSTALL=1
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Configuring Autonomous Routines for Serpent OS..." | tee -a "$LOG_FILE"

# Backup existing crontab (ignoring error if empty)
crontab -l > /tmp/crontab.bak 2>/dev/null || true

# Filter out old serpent entries to avoid duplicates
grep -v "$WORK_DIR/scripts/" /tmp/crontab.bak > /tmp/crontab.clean || true

if [[ $UNINSTALL -eq 1 ]]; then
  crontab /tmp/crontab.clean
  echo "✅ Uninstalled all Serpent OS autonomous cron routines."
  exit 0
fi

# Append fresh schedules
cat <<EOF >> /tmp/crontab.clean
# Serpent OS Autonomous Ecosystem Routines
*/15 * * * * bash $WORK_DIR/scripts/jarvis-heartbeat.sh >> /tmp/serpent-heartbeat.log 2>&1 # Jarvis Watchdog & Auto-Resume
*/30 * * * * bash $WORK_DIR/scripts/serpent-continuity.sh >> /tmp/serpent-continuity.log 2>&1 # Memory Continuity Loop
0 4 * * * bash $WORK_DIR/scripts/consolidate-memory.sh >> /tmp/serpent-memory.log 2>&1 # Daily Memory Sync & Backup
EOF

crontab /tmp/crontab.clean
rm -f /tmp/crontab.bak /tmp/crontab.clean

echo "✅ Autonomous Routines successfully installed into crontab!"
echo "--------------------------------------------------"
echo "📅 Active Crontab Entries:"
crontab -l | grep "$WORK_DIR"
echo "--------------------------------------------------"
echo "🎉 Ecosystem automation is live and running autonomously."
