#!/usr/bin/env bash
# jarvis-heartbeat.sh — Master Watchdog, Auto-Resume, Auto-Fix & Routine Engine
# Intended to be run via cron every 15 minutes or triggered manually.

set -euo pipefail

WORK_DIR="/Users/work/serpentos"
LOG_FILE="/tmp/serpent-heartbeat.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [Jarvis Heartbeat] $*" | tee -a "$LOG_FILE"
}

log "💓 Starting Jarvis Autonomous Heartbeat..."

# 1. Subbot Health Check & Stall Recovery
log "Step 1: Checking subbots and infrastructure health..."
if ! bash "$WORK_DIR/scripts/subbot-manager.sh" autocorrect; then
  log "⚠️ Subbot recovery actions took place."
else
  log "✅ All subbots healthy."
fi

# 2. Auto-Resume Limbo Check
log "Step 2: Checking for abandoned Limbo tasks (Auto-Resume)..."
if [[ -f "$WORK_DIR/SESSION-LIMBO.md" ]]; then
  LIMBO_TASK=$(grep -m 1 -i "LIMBO:" "$WORK_DIR/SESSION-LIMBO.md" | cut -d':' -f2- | xargs || true)
  if [[ -n "$LIMBO_TASK" ]]; then
    # Check if any opencode worker or jarvis task process is currently active (excluding daemon itself)
    if ! pgrep -f "opencode run|jarvis run" >/dev/null; then
      log "🔄 Abandoned limbo task found without active workers: '$LIMBO_TASK'. Triggering Auto-Resume via OpenCode..."
      doppler run --project serpent --config dev -- opencode run "AUTO-RESUME LIMBO TASK: $LIMBO_TASK. Complete implementation and remove SESSION-LIMBO.md when done." -m opencode-zen/qwen3.6-plus-free >> "$LOG_FILE" 2>&1 &
      log "✅ Auto-resume dispatched (PID: $!)."
    else
      log "⏳ Limbo task '$LIMBO_TASK' is currently being processed by active worker."
    fi
  else
    log "✅ No active LIMBO marker in SESSION-LIMBO.md."
  fi
else
  log "✅ SESSION-LIMBO.md file not found. No pending Limbo tasks."
fi

# 3. Auto-Fix Check (broken builds / dirty tree linter recovery)
log "Step 3: Checking build/linter integrity (Auto-Fix)..."
if [[ -f "$WORK_DIR/.state/autofix-needed.flag" ]]; then
  log "🛠️ Autofix flag detected! Launching Jarvis Autofix routine..."
  rm -f "$WORK_DIR/.state/autofix-needed.flag"
  cd "$WORK_DIR" && npx tsx packages/jarvis/cli/src/index.ts autofix "Fix recent build or lint errors" >> "$LOG_FILE" 2>&1 &
  log "✅ Autofix dispatched in background."
else
  log "✅ No autofix required."
fi

# 4. Scheduled Maintenance Routines (Daily memory sync at ~04:00 AM)
HOUR=$(date '+%H')
MIN=$(date '+%M')
if [[ "$HOUR" == "04" && "$MIN" -le "15" ]]; then
  log "⏰ 04:00 AM Routine Triggered: Memory Consolidation & Backups..."
  if [[ -f "$WORK_DIR/scripts/consolidate-memory.sh" ]]; then
    bash "$WORK_DIR/scripts/consolidate-memory.sh" >> /tmp/serpent-memory.log 2>&1 || true
  fi
  if [[ -f "$WORK_DIR/scripts/backup.sh" ]]; then
    bash "$WORK_DIR/scripts/backup.sh" >> /tmp/serpent-backup.log 2>&1 || true
  fi
  log "✅ Daily maintenance complete."
fi

log "💓 Jarvis Heartbeat cycle completed successfully."
echo "--------------------------------------------------" >> "$LOG_FILE"
