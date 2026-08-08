#!/bin/bash
set -euo pipefail

LOG="/tmp/serpent-health-check.log"
exec 1> >(tee -a "$LOG")
exec 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting health-check.sh"

# Test Chroma :8001 endpoint (timeout: 5s) — graceful degradation
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Checking Chroma at localhost:8001 (optional)..."
if timeout 5 curl -sf http://localhost:8001/api/v1/collections > /dev/null 2>&1; then
  echo "✅ Chroma :8001 is healthy"
else
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 124 ]; then
    echo "⚠️ Chroma health check timed out (>5s), continuing without vector DB" >&2
  else
    echo "⚠️ Chroma :8001 is not responding (exit $EXIT_CODE), continuing without vector DB" >&2
  fi
  # Non-fatal: Obsidian consolidation works independently
fi

# Test Obsidian vault accessibility
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Checking Obsidian vault at /Users/work/Obsidian-Library..."
if [ -d /Users/work/Obsidian-Library ]; then
  echo "✅ Obsidian vault is accessible"
else
  echo "❌ Obsidian vault not found at /Users/work/Obsidian-Library" >&2
  exit 1
fi

# Test Doppler var availability
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Checking Doppler environment variables..."
if doppler run --project serpent --config dev -- bash -c 'echo $OBSIDIAN_VAULT_PATH' > /dev/null 2>&1; then
  VAULT_PATH=$(doppler run --project serpent --config dev -- bash -c 'echo $OBSIDIAN_VAULT_PATH')
  echo "✅ Doppler is accessible (OBSIDIAN_VAULT_PATH=$VAULT_PATH)"
else
  echo "❌ Doppler is not accessible" >&2
  exit 1
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ All health checks passed"
exit 0
