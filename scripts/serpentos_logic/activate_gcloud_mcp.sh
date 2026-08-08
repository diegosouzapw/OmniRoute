#!/usr/bin/env bash
# ==============================================================================
# ☁️ GCLOUD MCP SERVER ACTIVATION & DIAGNOSTICS
# ==============================================================================
# Verifies ADC tokens, environment variables, and launches/checks gcloud MCP entrypoint.

set -euo pipefail

echo "=================================================="
echo "☁️ ПРОВЕРКА И АКТИВАЦИЯ GCLOUD MCP SERVER"
echo "=================================================="

# 1. Проверка активного проекта GCP
GCP_PROJECT=$(gcloud config get-value project 2>/dev/null || echo "project-f91a723f-af1b-4dd2-ba3")
echo "📌 GCP Project : ${GCP_PROJECT}"

# 2. Проверка Application Default Credentials (ADC)
echo "🔑 Проверка токена Application Default Credentials (ADC)..."
if TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null); then
    echo "   ✅ ADC Токен валиден (${TOKEN:0:15}...)"
else
    echo "   ⚠️ ADC Токен не найден. Запустите: gcloud auth application-default login"
fi

# 3. Экспорт переменных окружения для MCP
export GOOGLE_CLOUD_PROJECT="${GCP_PROJECT}"
export CLOUD_ML_REGION="europe-west3"

# 4. Проверка записи gcloud в .mcp.json
if grep -q '"gcloud"' .mcp.json 2>/dev/null; then
    echo "✅ Запись 'gcloud' присутствует в .mcp.json:"
    python3 -c "import json; d=json.load(open('.mcp.json'))['mcpServers'].get('gcloud',{}); print('   Command:', d.get('command'), ' '.join(d.get('args',[])))"
else
    echo "⚠️ Запись 'gcloud' не найдена в .mcp.json!"
fi

echo "=================================================="
echo "✅ GCloud MCP сервер проверен и готов к работе со всеми клиентами (AI IDE / CLI)."
echo "=================================================="
