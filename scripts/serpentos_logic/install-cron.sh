#!/bin/bash
# Install cron job for serpent-continuity.sh (Phase 6 Task 7)
# Usage: bash install-cron.sh [--interval MINUTES] [--uninstall]
set -euo pipefail

INTERVAL=${1:-30}
UNINSTALL=0
SCRIPTS_DIR="/Users/work/serpentos/scripts"
CRON_JOB_DESCRIPTION="Serpent AI Memory Continuity Loop"
CONTINUITY_SCRIPT="$SCRIPTS_DIR/serpent-continuity.sh"
LOG="/tmp/install-cron.log"

exec 1> >(tee -a "$LOG")
exec 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting install-cron.sh"

# Parse arguments
if [ "${1:-}" = "--uninstall" ]; then
  UNINSTALL=1
fi
if [ "${2:-}" = "--uninstall" ]; then
  UNINSTALL=1
fi

# Validate continuity script exists
if [ ! -f "$CONTINUITY_SCRIPT" ]; then
  echo "❌ Error: $CONTINUITY_SCRIPT not found" >&2
  exit 1
fi

# Ensure script is executable
chmod +x "$CONTINUITY_SCRIPT"

if [ $UNINSTALL -eq 1 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Removing cron job for serpent-continuity..."
  CRON_PATTERN="$CONTINUITY_SCRIPT"
  # Use grep to find and remove the matching cron job
  if crontab -l 2>/dev/null | grep -q "$CONTINUITY_SCRIPT"; then
    (crontab -l 2>/dev/null | grep -v "$CONTINUITY_SCRIPT" | crontab -) || {
      echo "⚠️ Could not update crontab (may require manual removal)" >&2
    }
    echo "✅ Cron job removed"
  else
    echo "⚠️ Cron job not found in crontab (may already be removed)"
  fi
  exit 0
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Installing cron job with ${INTERVAL}-minute interval"

# Convert minutes to cron format (every N minutes)
if [ $INTERVAL -eq 1 ]; then
  CRON_SCHEDULE="* * * * *"  # Every minute
elif [ $INTERVAL -le 59 ]; then
  # For minutes <= 59, use simple */N syntax
  CRON_SCHEDULE="*/$INTERVAL * * * *"
elif [ $INTERVAL -eq 60 ]; then
  CRON_SCHEDULE="0 * * * *"  # Every hour
elif [ $INTERVAL -eq 120 ]; then
  CRON_SCHEDULE="0 */2 * * *"  # Every 2 hours
elif [ $INTERVAL -eq 480 ]; then
  CRON_SCHEDULE="0 */8 * * *"  # Every 8 hours
else
  # For other intervals, use the generic */N format and warn
  CRON_SCHEDULE="*/$INTERVAL * * * *"
  echo "⚠️ Note: Cron may not support intervals > 59 minutes exactly. Using */$INTERVAL format."
fi

# Create cron entry
CRON_ENTRY="$CRON_SCHEDULE bash $CONTINUITY_SCRIPT >> /tmp/serpent-cron.log 2>&1 # $CRON_JOB_DESCRIPTION"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cron schedule: $CRON_SCHEDULE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cron entry: $CRON_ENTRY"

# Check if job already exists
if crontab -l 2>/dev/null | grep -q "$CONTINUITY_SCRIPT"; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cron job already exists, removing old entry..."
  TEMP_CRON=$(mktemp)
  crontab -l 2>/dev/null | grep -v "$CONTINUITY_SCRIPT" > "$TEMP_CRON"
  crontab "$TEMP_CRON"
  rm -f "$TEMP_CRON"
fi

# Install new cron job
TEMP_CRON=$(mktemp)
{
  crontab -l 2>/dev/null || true
  echo ""
  echo "$CRON_ENTRY"
} > "$TEMP_CRON"

if crontab "$TEMP_CRON"; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Cron job installed successfully"
  echo ""
  echo "Installed cron job:"
  echo "  Schedule: $CRON_SCHEDULE (every $INTERVAL minutes)"
  echo "  Script: $CONTINUITY_SCRIPT"
  echo "  Log: /tmp/serpent-cron.log"
  echo ""
  echo "Verify installation:"
  echo "  crontab -l | grep serpent-continuity"
  rm -f "$TEMP_CRON"
  exit 0
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ Failed to install cron job" >&2
  rm -f "$TEMP_CRON"
  exit 1
fi
