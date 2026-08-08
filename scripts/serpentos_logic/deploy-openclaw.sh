#!/bin/bash
# deploy-openclaw.sh — Deploy OpenClaw to GCP Cloud Run (safe: no secrets in env vars)
set -e

echo "🚀 Deploying OpenClaw to Cloud Run..."

# Configuration
PROJECT_ID="project-f91a723f-af1b-4dd2-ba3"
REGION="europe-west3"
SERVICE_NAME="openclaw"
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest"

# Build
echo "🔨 Building Docker image..."
docker build -t ${IMAGE} -f packages/openclaw/Dockerfile packages/openclaw/

# Push
echo "📤 Pushing to GCR..."
docker push ${IMAGE}

# Deploy with ONLY non-secret env vars (no tokens, no passwords)
echo "☁️ Deploying to Cloud Run (safe mode)..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE} \
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
echo "⚠️  NEXT STEPS (required for bot to work):"
echo ""
echo "1. Create Telegram token secret:"
echo "   echo -n '8659612265:AAEMLCwvukXdRQRRTgqlS_AJJ3UFeAf8bIA' | \\"
echo "     gcloud secrets create openclaw-telegram-token --data-file=- --project=${PROJECT_ID}"
echo ""
echo "2. Attach secret to Cloud Run service:"
echo "   gcloud run services update ${SERVICE_NAME} \\"
echo "     --region ${REGION} --project=${PROJECT_ID} \\"
echo "     --update-secrets 'OPENCLAW_TELEGRAM_TOKEN=openclaw-telegram-token:latest'"
echo ""
echo "3. Set Telegram webhook:"
echo "   curl \"https://api.telegram.org/bot8659612265:AAEMLCwvukXdRQRRTgqlS_AJJ3UFeAf8bIA/setWebhook?url=${WEBHOOK_URL}/webhook\""
