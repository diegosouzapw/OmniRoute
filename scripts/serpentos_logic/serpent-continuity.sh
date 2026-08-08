#!/bin/bash
set -euo pipefail

LOG="/tmp/serpent-continuity.log"
exec 1> >(tee -a "$LOG")
exec 2>&1

SCRIPTS_DIR="/Users/work/serpentos/scripts"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting serpent-continuity.sh"

# Health check with 60s timeout
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Running health-check.sh (timeout: 60s)..."
if ! timeout 60 bash "$SCRIPTS_DIR/health-check.sh"; then
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 124 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ Health check timed out (>60s), aborting" >&2
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ Health check failed (exit $EXIT_CODE), aborting" >&2
  fi
  exit 1
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Health check passed"

# Consolidate memory with 120s timeout
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Running consolidate-memory.sh (timeout: 120s)..."
if ! timeout 120 bash "$SCRIPTS_DIR/consolidate-memory.sh"; then
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 124 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ consolidate-memory timed out (>120s), continuing (non-fatal)" >&2
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ consolidate-memory failed (exit $EXIT_CODE), continuing (non-fatal)" >&2
  fi
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ consolidate-memory.sh completed"
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ serpent-continuity.sh completed successfully"
exit 0
