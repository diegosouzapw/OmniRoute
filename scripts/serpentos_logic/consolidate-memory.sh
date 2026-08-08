#!/bin/bash
set -euo pipefail

LOG="/tmp/serpent-consolidate-memory.log"
exec 1> >(tee -a "$LOG")
exec 2>&1

SESSION_FILE="/Users/work/serpentos/packages/ceo-agent/SESSION.json"
LOCK_DIR="/tmp/.serpent-session-lock"
OBSIDIAN_VAULT="/Users/work/Obsidian-Library/01-Memory/Agent-Memories"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting consolidate-memory.sh"

# Verify SESSION.json exists
if [ ! -f "$SESSION_FILE" ]; then
  echo "❌ SESSION.json not found at $SESSION_FILE" >&2
  exit 1
fi

# Acquire lock for SESSION.json read using atomic mkdir (macOS compatible)
LOCK_ACQUIRED=0
for ((i=0; i<10; i++)); do
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    LOCK_ACQUIRED=1
    break
  fi
  sleep 0.5
done

if [ $LOCK_ACQUIRED -eq 0 ]; then
  echo "❌ Failed to acquire lock on SESSION.json" >&2
  exit 1
fi

# Ensure lock is released on exit
trap "rm -rf '$LOCK_DIR'" EXIT

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Acquired lock on SESSION.json"

# Get total history count
HISTORY_COUNT=$(jq '.history | length' "$SESSION_FILE" 2>/dev/null || echo 0)
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Processing $HISTORY_COUNT total history entries"

PROCESSED=0
WRITTEN=0

# Process last 50 entries only (more efficient than full history)
if [ "$HISTORY_COUNT" -gt 0 ]; then
  START_INDEX=$((HISTORY_COUNT > 50 ? HISTORY_COUNT - 50 : 0))

  # Extract last 50 entries as compact JSON lines
  while IFS= read -r entry; do
    ACTION=$(echo "$entry" | jq -r '.action // ""')
    TIMESTAMP=$(echo "$entry" | jq -r '.timestamp // ""')

    if [ -z "$ACTION" ] || [ -z "$TIMESTAMP" ]; then
      continue
    fi

    # Compute SHA256 hash of action|timestamp
    ACTION_TIMESTAMP_HASH=$(echo -n "${ACTION}|${TIMESTAMP}" | shasum -a 256 | cut -d' ' -f1)

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Processing: $ACTION (hash: ${ACTION_TIMESTAMP_HASH:0:16}...)"

    # Write to Obsidian vault (primary storage for Phase 6)
    AGENT_DIR="$OBSIDIAN_VAULT/ceo-agent"
    mkdir -p "$AGENT_DIR"
    DATE=$(echo "$TIMESTAMP" | cut -d'T' -f1)
    OBSIDIAN_FILE="$AGENT_DIR/$DATE.md"

    # Check if this hash already exists in the file (idempotency)
    if grep -q "$ACTION_TIMESTAMP_HASH" "$OBSIDIAN_FILE" 2>/dev/null; then
      echo "  ⏭️ Skipped (already in Obsidian)"
    else
      {
        echo ""
        echo "### $(date '+%Y-%m-%d %H:%M:%S')"
        echo "- **Action:** $ACTION"
        echo "- **Hash:** $ACTION_TIMESTAMP_HASH"
        echo "- **Timestamp:** $TIMESTAMP"
        echo ""
      } >> "$OBSIDIAN_FILE" 2>/dev/null || {
        echo "  ⚠️ Obsidian write failed" >&2
      }

      echo "  ✅ Written to Obsidian"
      ((WRITTEN++))
    fi

    ((PROCESSED++))
  done < <(jq -c ".history[$START_INDEX:] | .[] | {action: .action, timestamp: .timestamp}" "$SESSION_FILE" 2>/dev/null)
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Summary: Processed=$PROCESSED, Written=$WRITTEN"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ consolidate-memory.sh completed"

exit 0
