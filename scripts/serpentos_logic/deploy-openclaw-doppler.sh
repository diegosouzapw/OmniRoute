#!/bin/bash
# deploy-openclaw-doppler.sh — Deploy OpenClaw using Doppler (local secrets, no cloud upload)
set -e

echo "🚀 Deploying OpenClaw via Doppler..."

PROJECT_ID="ectic-web"
REGION="europe-west3"
SERVICE_NAME="openclaw"
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest"

# Build
echo "🔨 Building Docker image..."
docker build -t ${IMAGE} -f packages/openclaw/Dockerfile packages/openclaw/

# Push
echo "📤 Pushing to GCR..."
docker push ${IMAGE}

# Deploy with Doppler-injected secrets (no --set-secrets, no gcloud secrets manager)
echo "☁️ Deploying to Cloud Run with Doppler..."
doppler run -- gcloud run deploy ${SERVICE_NAME} \
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
echo "🌐 URL: $(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --project ${PROJECT_ID} --format 'value(status.url)')"

# Update Telegram webhook
echo "🔗 Updating Telegram webhook..."
WEBHOOK_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --project ${PROJECT_ID} --format 'value(status.url)')
DOPPLER_TOKEN=$(doppler secrets get OPENCLAW_TELEGRAM_TOKEN --plain)
curl -s "https://api.telegram.org/bot${DOPPLER_TOKEN}/setWebhook?url=${WEBHOOK_URL}/webhook" | jq .

echo "🎉 Done!"
