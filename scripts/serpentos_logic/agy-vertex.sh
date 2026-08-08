#!/bin/bash
# agy-vertex.sh — запуск Antigravity CLI с Vertex AI (ADC)
# GCP project: project-f91a723f-af1b-4dd2-ba3, region: europe-west3

export GOOGLE_CLOUD_PROJECT="project-f91a723f-af1b-4dd2-ba3"
export GOOGLE_CLOUD_LOCATION="europe-west3"
export GOOGLE_CLOUD_REGION="europe-west3"
export CLOUD_ML_REGION="europe-west3"

# Убедимся что ADC настроен
if ! gcloud auth application-default print-access-token &>/dev/null; then
  echo "⚠️  ADC не настроен. Запускаю авторизацию..."
  gcloud auth application-default login
fi

echo "✅ Vertex AI | project: $GOOGLE_CLOUD_PROJECT | region: $GOOGLE_CLOUD_LOCATION"
exec /Users/work/.local/bin/agy "$@"
