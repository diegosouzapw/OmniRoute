#!/usr/bin/env bash
# scripts/log-to-bq.sh
# Writes agent telemetry event to BigQuery dataset serpentos_telemetry.agent_events

set -e

PROJECT_ID="${GCP_PROJECT:-project-f91a723f-af1b-4dd2-ba3}"
DATASET_ID="serpentos_telemetry"
TABLE_ID="agent_events"

AGENT_ID="${1:-unknown_agent}"
MODEL="${2:-unknown_model}"
LATENCY_MS="${3:-0}"
COST_TOKENS="${4:-0}"
TASK="${5:-general_task}"
STATUS="${6:-SUCCESS}"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

JSON_ROW="{\"agent_id\":\"$AGENT_ID\",\"model\":\"$MODEL\",\"latency_ms\":$LATENCY_MS,\"cost_tokens\":$COST_TOKENS,\"task\":\"$TASK\",\"status\":\"$STATUS\",\"timestamp\":\"$TIMESTAMP\"}"

echo "$JSON_ROW" > /tmp/bq_event_$$.json

# Ensure table exists (auto-create schema if needed)
bq mk --project_id="$PROJECT_ID" --table \
  "$PROJECT_ID:$DATASET_ID.$TABLE_ID" \
  agent_id:STRING,model:STRING,latency_ms:INTEGER,cost_tokens:INTEGER,task:STRING,status:STRING,timestamp:TIMESTAMP 2>/dev/null || true

# Load row via batch load (100% free tier compatible)
bq load --project_id="$PROJECT_ID" --source_format=NEWLINE_DELIMITED_JSON \
  "$PROJECT_ID:$DATASET_ID.$TABLE_ID" \
  /tmp/bq_event_$$.json \
  agent_id:STRING,model:STRING,latency_ms:INTEGER,cost_tokens:INTEGER,task:STRING,status:STRING,timestamp:TIMESTAMP 2>/dev/null || echo "⚠️ Telemetry log skipped (offline or unauthenticated)"
rm -f /tmp/bq_event_$$.json
exit 0
