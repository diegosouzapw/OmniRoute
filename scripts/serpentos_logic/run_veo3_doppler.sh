#!/usr/bin/env bash
# ==============================================================================
# Doppler-Driven Veo 3 Quality Generation Wrapper
# Project: serpent | Config: prd
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔐 [Doppler] Launching Veo 3 Quality Generation under 'serpent/prd'..."
exec doppler run --project serpent --config prd -- python3 "$REPO_ROOT/scripts/run_veo3_doppler.py" "$@"
