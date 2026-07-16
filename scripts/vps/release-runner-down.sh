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

# 0) Always-on mode. When the repo var VPS_ALWAYS_ON=true, the VM 113 is a DEDICATED,
# 24/7 CI host (32c/24GB, exclusive to this project) — the day-to-day quality.yml PRs
# (PR→release/**) route to it too, not just release CI. In that mode the release MUST NOT
# tear the VM down or flip USE_VPS_RUNNER off, or every subsequent PR would fall back to
# ubuntu-latest until the next release. Teardown/flag-off is the LEGACY on-demand-per-release
# model only. (Set/unset with: gh variable set VPS_ALWAYS_ON --body true|false.)
if [ "$(gh variable get VPS_ALWAYS_ON --repo "$REPO" 2>/dev/null)" = "true" ]; then
  echo "[release-runner] VPS_ALWAYS_ON=true — dedicated 24/7 host; leaving VM $VM_ID up and USE_VPS_RUNNER=true."
  exit 0
fi

# 1) Volta o CI para ubuntu-latest ANTES de derrubar a VM (evita jobs presos).
echo "[release-runner] USE_VPS_RUNNER=false (CI volta ao GitHub-hosted)."
gh variable set USE_VPS_RUNNER --repo "$REPO" --body "false" >/dev/null 2>&1 || true

# 2) Shutdown graceful da VM (libera os 32 cores / 24GB de volta ao host).
echo "[release-runner] desligando VM $VM_ID (graceful)..."
$SSH "root@$PVE_HOST" "qm shutdown $VM_ID --timeout 120" 2>/dev/null \
  || $SSH "root@$PVE_HOST" "qm stop $VM_ID" 2>/dev/null \
  || echo "[release-runner] ⚠️  não consegui desligar a VM $VM_ID — verifique manualmente."
echo "[release-runner] pronto."
