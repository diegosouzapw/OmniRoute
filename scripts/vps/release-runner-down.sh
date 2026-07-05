#!/usr/bin/env bash
# Desliga a VM self-hosted (VPS 113) ao fim do release e volta o CI para o GitHub-hosted.
# Idempotente: seguro chamar mesmo que a VM já esteja desligada.
#
# Uso:  scripts/vps/release-runner-down.sh
set -uo pipefail

PVE_HOST="${PVE_HOST:-192.168.0.100}"
VM_ID="${VM_ID:-113}"
REPO="${REPO:-diegosouzapw/OmniRoute}"
SSH="ssh -o BatchMode=yes -o ConnectTimeout=8"

# 1) Volta o CI para ubuntu-latest ANTES de derrubar a VM (evita jobs presos).
echo "[release-runner] USE_VPS_RUNNER=false (CI volta ao GitHub-hosted)."
gh variable set USE_VPS_RUNNER --repo "$REPO" --body "false" >/dev/null 2>&1 || true

# 2) Shutdown graceful da VM (libera os 32 cores / 24GB de volta ao host).
echo "[release-runner] desligando VM $VM_ID (graceful)..."
$SSH "root@$PVE_HOST" "qm shutdown $VM_ID --timeout 120" 2>/dev/null \
  || $SSH "root@$PVE_HOST" "qm stop $VM_ID" 2>/dev/null \
  || echo "[release-runner] ⚠️  não consegui desligar a VM $VM_ID — verifique manualmente."
echo "[release-runner] pronto."
