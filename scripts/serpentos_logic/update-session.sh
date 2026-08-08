#!/bin/bash
# Usage: update-session.sh "action_description" "metrics_json"
set -euo pipefail

ACTION="${1:?Missing action description}"
METRICS="${2:-{}}"
SESSION_FILE="/Users/work/serpentos/packages/ceo-agent/SESSION.json"
LOCK_DIR="/tmp/.serpent-session-lock"

if [ ! -f "$SESSION_FILE" ]; then
  echo "❌ SESSION.json not found at $SESSION_FILE" >&2
  exit 1
fi

# Acquire lock for SESSION.json write (macOS compatible, atomic mkdir)
LOCK_ACQUIRED=0
for ((i=0; i<10; i++)); do
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    LOCK_ACQUIRED=1
    break
  fi
  sleep 0.5
done

if [ $LOCK_ACQUIRED -eq 0 ]; then
  echo "❌ Could not acquire lock on SESSION.json" >&2
  exit 1
fi

# Ensure lock is released on exit
trap "rm -rf '$LOCK_DIR'" EXIT

# Generate timestamp in ISO 8601 format
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Compute action+timestamp hash for dedup
ACTION_TIMESTAMP_HASH=$(echo -n "${ACTION}|${TIMESTAMP}" | shasum -a 256 | cut -d' ' -f1)

# Check if last entry matches (idempotency check)
LAST_HASH=$(jq -r '.history[-1].action_timestamp_hash // ""' "$SESSION_FILE" 2>/dev/null || echo "")
if [ "$LAST_HASH" = "$ACTION_TIMESTAMP_HASH" ]; then
  echo "⚠️ Duplicate update (same action+timestamp), skipping"
  exit 0
fi

# Use jq to append to history (atomic: tmpfile + mv)
TMPFILE="${SESSION_FILE}.tmp.$$"

# Validate METRICS is valid JSON, default to empty object if not
if ! echo "$METRICS" | jq . >/dev/null 2>&1; then
  METRICS='{}'
fi

if jq \
  --arg action "$ACTION" \
  --arg timestamp "$TIMESTAMP" \
  --argjson metrics "$METRICS" \
  --arg hash "$ACTION_TIMESTAMP_HASH" \
  '.history += [{"action": $action, "timestamp": $timestamp, "metrics": $metrics, "action_timestamp_hash": $hash}]' \
  "$SESSION_FILE" > "$TMPFILE"; then
  if mv "$TMPFILE" "$SESSION_FILE"; then
    echo "✅ Updated SESSION.json with action: $ACTION"
    exit 0
  else
    rm -f "$TMPFILE"
    echo "❌ Failed to move temporary file to SESSION.json" >&2
    exit 1
  fi
else
  rm -f "$TMPFILE"
  echo "❌ Failed to update SESSION.json (jq error)" >&2
  exit 1
fi
