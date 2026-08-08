#!/usr/bin/env bash
# ==============================================================================
# 🚀 GEMINI ENTERPRISE AGENT PLATFORM (formerly Vertex AI) SETUP & CONFIGURATION
# ==============================================================================
# Configures GCP Project, Region, ADC Auth, and required Agent Platform APIs.

set -euo pipefail

PROJECT_ID="project-f91a723f-af1b-4dd2-ba3"
REGION="europe-west3"

echo "=================================================="
echo "🌐 Настройка Gemini Enterprise Agent Platform (Vertex AI)"
echo "=================================================="
echo "📌 Проект GCP : ${PROJECT_ID}"
echo "📌 Регион     : ${REGION}"
echo "--------------------------------------------------"

echo "1️⃣ Установка активного проекта в gcloud config..."
gcloud config set project "${PROJECT_ID}" --quiet || true
gcloud config set ai/region "${REGION}" --quiet || true

echo "2️⃣ Экспорт переменных окружения Agent Platform (ADK & SDK)..."
export GOOGLE_CLOUD_PROJECT="${PROJECT_ID}"
export GOOGLE_CLOUD_LOCATION="${REGION}"
export CLOUD_ML_REGION="${REGION}"
export ANTHROPIC_VERTEX_PROJECT_ID="${PROJECT_ID}"
export VERTEXAI_PROJECT="${PROJECT_ID}"
export VERTEXAI_LOCATION="${REGION}"

echo "3️⃣ Проверка доступности ключевых API Agent Platform..."
for API in aiplatform.googleapis.com cloudaicompanion.googleapis.com storage.googleapis.com; do
    echo "   -> Проверка/Включение API: ${API}..."
    gcloud services enable "${API}" --project="${PROJECT_ID}" --quiet 2>/dev/null || echo "      (Инфо: требуется биллинг/права для авто-включения ${API})"
done

echo "=================================================="
echo "✅ Настройка Gemini Enterprise Agent Platform завершена!"
echo "   Проверить статус подключения: python3 scripts/agent_platform_client.py"
echo "=================================================="
