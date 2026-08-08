#!/bin/bash
# deploy-openclaw-cloudbuild.sh — Deploy OpenClaw using Cloud Build (no local Docker needed)
set -e

echo "🚀 Deploying OpenClaw to Cloud Run via Cloud Build..."

PROJECT_ID="project-f91a723f-af1b-4dd2-ba3"
REGION="europe-west3"
SERVICE_NAME="openclaw"

# Build and push using Cloud Build from repo root (needs workspace packages)
echo "🔨 Building with Cloud Build..."
gcloud builds submit . \
  --config packages/openclaw/cloudbuild.yaml \
  --project ${PROJECT_ID}

# Deploy to Cloud Run with ONLY non-secret env vars
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --project ${PROJECT_ID} \
  --allow-unauthenticated \
  --max-instances 3 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --concurrency 80 \
  --set-env-vars "NODE_ENV=production" \
  --set-env-vars "CHROMA_HOST=34.44.215.238" \
  --set-env-vars "CHROMA_PORT=8000" \
  --set-env-vars "CHROMA_COLLECTION=serpent_memories" \
  --set-env-vars "ALLOYDB_HOST=34.44.215.238" \
  --set-env-vars "ALLOYDB_PORT=5432" \
  --set-env-vars "ALLOYDB_DATABASE=agent_memory" \
  --set-env-vars "ALLOYDB_USER=openclaw" \
  --set-env-vars "ALLOYDB_TABLE=memories" \
  --set-env-vars "OPENCLAW_AGENT_ID=openclaw-cloud-run"

echo "✅ OpenClaw deployed!"
WEBHOOK_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --project ${PROJECT_ID} --format 'value(status.url)')
echo "🌐 URL: ${WEBHOOK_URL}"

echo ""
echo "⚠️  NEXT STEP: Attach secrets manually via gcloud console or:"
echo "   gcloud run services update ${SERVICE_NAME} \\"
echo "     --region ${REGION} --project ${PROJECT_ID} \\"
echo "     --update-secrets OPENCLAW_TELEGRAM_TOKEN=openclaw-telegram-token:latest"
