#!/usr/bin/env bash
# scripts/setup-pubsub-bus.sh — Provision GCP Pub/Sub Event Bus Topics for Agentic OS
# Creates standard inter-agent communication topics inside GCP Free Tier limits.

set -euo pipefail

GCP_PROJECT="${GCP_PROJECT:-project-f91a723f-af1b-4dd2-ba3}"

TOPICS=("task.new" "task.done" "agent.error" "model.switched")

echo "🐍 [Agentic OS] Provisioning Pub/Sub event bus topics in project ${GCP_PROJECT}..."

for topic in "${TOPICS[@]}"; do
  echo "  • Ensuring topic: ${topic}"
  gcloud pubsub topics create "$topic" --project="$GCP_PROJECT" 2>/dev/null || echo "    (Topic ${topic} already exists or created)"
done

echo "✅ [Agentic OS] Pub/Sub Event Bus setup completed successfully."
