#!/usr/bin/env bash
# scripts/deploy-agent-runtime.sh — Deploy Zero-Idle Agent Runtime to Cloud Run
# Strictly adheres to GCP Free/Zero-Idle Architecture: europe-west3, --min-instances=0

set -euo pipefail

GCP_PROJECT="${GCP_PROJECT:-project-f91a723f-af1b-4dd2-ba3}"
REGION="europe-west3"
SERVICE_NAME="serpent-agent-runtime"

echo "🐍 [Agentic OS] Deploying ${SERVICE_NAME} to Cloud Run (${REGION}, min-instances=0)..."

gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --project="$GCP_PROJECT" \
  --region="$REGION" \
  --min-instances=0 \
  --max-instances=3 \
  --memory=1Gi \
  --cpu=1 \
  --concurrency=10 \
  --timeout=300 \
  --set-env-vars="SERPENT_ENV=production,GCP_PROJECT_ID=${GCP_PROJECT}" \
  --allow-unauthenticated

echo "✅ [Agentic OS] Successfully deployed ${SERVICE_NAME} with Zero-Idle cost configuration."
