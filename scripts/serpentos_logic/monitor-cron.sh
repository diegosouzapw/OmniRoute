#!/bin/bash
# Monitor serpent-continuity.sh cron job execution and health (Phase 6 Task 7)
# Usage: bash monitor-cron.sh [--tail N] [--recent MINUTES] [--watch INTERVAL_SECONDS]
set -euo pipefail

TAIL_LINES=20
RECENT_MINUTES=60
WATCH_INTERVAL=10
WATCH_MODE=0
CRON_LOG="/tmp/serpent-cron.log"
CONTINUITY_LOG="/tmp/serpent-continuity.log"

# Parse arguments
while [ $# -gt 0 ]; do
  case "$1" in
    --tail)
      TAIL_LINES="${2:-20}"
      shift 2
      ;;
    --recent)
      RECENT_MINUTES="${2:-60}"
      shift 2
      ;;
    --watch)
      WATCH_MODE=1
      WATCH_INTERVAL="${2:-10}"
      shift 2
      ;;
    *)
      echo "Unknown option: $1" >&2
      echo "Usage: bash monitor-cron.sh [--tail N] [--recent MINUTES] [--watch INTERVAL_SECONDS]"
      exit 1
      ;;
  esac
done

show_status() {
  clear
  echo "═════════════════════════════════════════════════════════════════════════"
  echo "Serpent Continuity Cron Monitor"
  echo "═════════════════════════════════════════════════════════════════════════"
  echo ""

  # Check if cron job is installed
  echo "📋 Cron Job Status:"
  if crontab -l 2>/dev/null | grep -q "serpent-continuity"; then
    echo "  ✅ Cron job installed"
    echo ""
    echo "  Installed job:"
    crontab -l 2>/dev/null | grep "serpent-continuity" || echo "    (not found)"
  else
    echo "  ❌ Cron job not installed"
  fi
  echo ""

  # Show recent execution summary
  echo "📊 Recent Executions (last $RECENT_MINUTES minutes):"
  if [ -f "$CRON_LOG" ]; then
    RECENT_COUNT=$(find "$CRON_LOG" -type f -newermt "$RECENT_MINUTES minutes ago" 2>/dev/null | wc -l)
    if [ $RECENT_COUNT -gt 0 ]; then
      echo "  ✅ Cron log exists and is recent"
      EXEC_COUNT=$(grep -c "Starting serpent-continuity" "$CRON_LOG" 2>/dev/null || echo 0)
      echo "  Total executions logged: $EXEC_COUNT"
    else
      echo "  ⚠️ Cron log exists but hasn't been updated in $RECENT_MINUTES minutes"
    fi
  else
    echo "  ⚠️ Cron log not found at $CRON_LOG (first run may not have executed yet)"
  fi
  echo ""

  # Show last N lines of cron log
  echo "📄 Last $TAIL_LINES lines of cron log:"
  echo "  Log file: $CRON_LOG"
  echo ""
  if [ -f "$CRON_LOG" ]; then
    tail -n $TAIL_LINES "$CRON_LOG" | sed 's/^/  /'
  else
    echo "  (log file not yet created)"
  fi
  echo ""

  # Show last consolidation result
  echo "🔄 Last Consolidation Status:"
  if [ -f "$CONTINUITY_LOG" ]; then
    LAST_COMPLETE=$(grep "✅ consolidate-memory.sh completed" "$CONTINUITY_LOG" 2>/dev/null | tail -1 || echo "")
    LAST_TIMEOUT=$(grep "consolidate-memory timed out" "$CONTINUITY_LOG" 2>/dev/null | tail -1 || echo "")
    if [ -n "$LAST_COMPLETE" ]; then
      echo "  ✅ Last consolidation successful"
    elif [ -n "$LAST_TIMEOUT" ]; then
      echo "  ⚠️ Last consolidation timed out (non-fatal)"
    else
      echo "  ℹ️ No consolidation records found yet"
    fi
  fi
  echo ""

  # Show next expected execution
  echo "⏰ Next Expected Execution:"
  if crontab -l 2>/dev/null | grep -q "serpent-continuity"; then
    CRON_SCHEDULE=$(crontab -l 2>/dev/null | grep "serpent-continuity" | awk '{print $1, $2, $3, $4, $5}' | head -1)
    echo "  Schedule: $CRON_SCHEDULE"
    echo ""
    echo "  💡 Tip: Use 'crontab -e' to modify the schedule"
  fi
  echo ""
  echo "═════════════════════════════════════════════════════════════════════════"
  if [ $WATCH_MODE -eq 1 ]; then
    echo "Live monitoring active (updating every ${WATCH_INTERVAL}s, press Ctrl+C to stop)"
  fi
}

if [ $WATCH_MODE -eq 1 ]; then
  # Watch mode: continuously update display
  while true; do
    show_status
    sleep "$WATCH_INTERVAL"
  done
else
  # One-time display
  show_status
fi
