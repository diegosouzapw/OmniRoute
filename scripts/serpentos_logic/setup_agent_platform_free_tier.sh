#!/usr/bin/env bash
# ==============================================================================
# 🚀 GEMINI ENTERPRISE AGENT PLATFORM - ZERO-BILLING FREE TIER CONFIGURATION
# ==============================================================================
# Bypasses closed GCP Billing Accounts by configuring Direct Google AI Studio Free Tier API mode.

set -euo pipefail

echo "=================================================="
echo "🆓 Настройка Agent Platform в режиме Free Tier (Без биллинга GCP)"
echo "=================================================="

# Канонический Free Tier ключ из AGENTS.md / Doppler
CANONICAL_FREE_KEY="AIzaSyBL6hl0I-7UEV_q3rvGbw-fARhCSPiZ63w"

if [[ -z "${GEMINI_API_KEY:-}" ]]; then
    export GEMINI_API_KEY="${CANONICAL_FREE_KEY}"
fi

echo "✅ Free Tier API Key активирован (...${GEMINI_API_KEY: -4})."
echo "=================================================="
echo "⚡ Режим Direct Free Tier активирован!"
echo "   Агенты, скрипты и SDK используют бесплатный квотный доступ без проверки закрытых биллинг-аккаунтов GCP."
echo "=================================================="
