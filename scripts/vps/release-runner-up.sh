#!/usr/bin/env bash
# Liga a VM self-hosted (VPS 113) e aguarda seus runners ficarem online, para a fase
# de release usar runners dedicados (anti-fila). Falha => o caller cai no GitHub-hosted.
#
# Uso:  scripts/vps/release-runner-up.sh [timeout_seg]
# Saída: exit 0 + seta a repo-var USE_VPS_RUNNER=true  quando >=1 runner omni-release online
#        exit 1 + seta USE_VPS_RUNNER=false            em qualquer falha/timeout (fallback)
#
# Pré-requisitos no host que roda o /generate-release:
#   - chave SSH autorizada em root@$PVE_HOST (Proxmox) e root@$VPS_HOST (a VM)
#   - gh autenticado com admin no repo (para ler runners + setar a variable)
set -uo pipefail

PVE_HOST="${PVE_HOST:-192.168.0.100}"   # Proxmox host
VPS_HOST="${VPS_HOST:-192.168.0.113}"   # a VM dos runners
VM_ID="${VM_ID:-113}"
REPO="${REPO:-diegosouzapw/OmniRoute}"
LABEL="${RUNNER_LABEL:-omni-release}"
TIMEOUT="${1:-120}"
SSH="ssh -o BatchMode=yes -o ConnectTimeout=8"

fallback() {
  echo "[release-runner] ⚠️  $1 — usando GitHub-hosted (fallback)."
  gh variable set USE_VPS_RUNNER --repo "$REPO" --body "false" >/dev/null 2>&1 || true
  exit 1
}

echo "[release-runner] ligando VM $VM_ID no Proxmox $PVE_HOST..."
$SSH "root@$PVE_HOST" "qm start $VM_ID" 2>/dev/null || true   # ok se já estiver rodando

echo "[release-runner] aguardando runners '$LABEL' ficarem online (timeout ${TIMEOUT}s)..."
deadline=$(( $(date +%s) + TIMEOUT ))
while [ "$(date +%s)" -lt "$deadline" ]; do
  online=$(gh api "repos/$REPO/actions/runners" \
    --jq "[.runners[] | select(.status==\"online\") | select(.labels[].name==\"$LABEL\")] | length" \
    2>/dev/null || echo 0)
  if [ "${online:-0}" -ge 1 ]; then
    echo "[release-runner] ✅ $online runner(s) '$LABEL' online — usando a VPS."
    gh variable set USE_VPS_RUNNER --repo "$REPO" --body "true" >/dev/null 2>&1 \
      || fallback "não consegui setar USE_VPS_RUNNER"
    exit 0
  fi
  sleep 6
done
fallback "runners não ficaram online a tempo"
