#!/usr/bin/env bash
# scripts/run-video-job-spot.sh — Launch Veo 3 / Video Rendering on Cloud Run Jobs (Spot compute)
# Saves up to 70% cost by running heavy batch jobs on spot/batch instances instead of always-on services.

set -euo pipefail

GCP_PROJECT="${GCP_PROJECT:-project-f91a723f-af1b-4dd2-ba3}"
REGION="europe-west3"
JOB_NAME="veo-video-worker"

echo "🎬 [Agentic OS] Ensuring Cloud Run Job '${JOB_NAME}' exists in project ${GCP_PROJECT} (${REGION})..."

# Create or update Cloud Run Job
gcloud run jobs create "$JOB_NAME" \
  --source . \
  --project="$GCP_PROJECT" \
  --region="$REGION" \
  --tasks=1 \
  --max-retries=1 \
  --memory=2Gi \
  --cpu=1 \
  --task-timeout=600s \
  --set-env-vars="SERPENT_ENV=production,GCP_PROJECT_ID=${GCP_PROJECT}" 2>/dev/null || echo "    (Job ${JOB_NAME} already created or updated)"

echo "🚀 [Agentic OS] Executing batch Cloud Run Job '${JOB_NAME}'..."
gcloud run jobs execute "$JOB_NAME" \
  --project="$GCP_PROJECT" \
  --region="$REGION" \
  --async

echo "✅ [Agentic OS] Job '${JOB_NAME}' dispatched asynchronously."
