#!/bin/bash
# agy-autoswitch.sh — Запуск AGY агента с автоматическим переключением аккаунтов
# Использует GEMINI_API_KEYS (2 ключа) для двойной квоты: 3000 RPD бесплатно
#
# Использование:
#   ./scripts/agy-autoswitch.sh "Research task"
#   ./scripts/agy-autoswitch.sh --autoresearch --iterations 5
#   ./scripts/agy-autoswitch.sh --test-providers
#   ./scripts/agy-autoswitch.sh --loop ralph
#
# Cascade Fallback:
#   1. AGY Account 1 (Gemini 2.5 Flash) — 1500 RPD free
#   2. AGY Account 2 (Gemini 2.0 Flash) — +1500 RPD free (multi-account rotation)
#   3. NVIDIA NIM (Nemotron-51B, Llama 3.3-70B) — 40 RPM sandbox
#   4. GitHub Models (Llama 3.3-70B, GPT-4o) — 150 RPD free
#   5. Cloudflare Workers AI (Llama 3.3-70B fp8) — 10k neurons/day
#   6. Groq LPU (Llama 4 Scout, Llama 3.3-70B) — up to 14400 RPD
#   7. Ollama Local (qwen2.5-coder) — zero cost, offline

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
AGY_AGENT="$REPO_DIR/packages/jarvis/agy-agent/agent.py"

# Load Doppler secrets and run via pinned uv environment
if command -v uv &>/dev/null; then
  exec doppler run --project serpent --config prd -- uv run --no-project --with "google-antigravity==0.1.5" python3 "$AGY_AGENT" "$@"
else
  exec doppler run --project serpent --config prd -- python3 "$AGY_AGENT" "$@"
fi
