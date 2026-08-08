#!/usr/bin/env bash
# Update VM IP for serpent-memory after restart
# Usage: bash scripts/update_memory_vm_ip.sh
set -euo pipefail

VMNAME="serpent-memory"
ZONE="us-central1-a"
SERVICE="openclaw"
REGION="europe-west3"

echo "🔍 Fetching new IP for VM: $VMNAME..."
NEW_IP=$(gcloud compute instances describe "$VMNAME" \
  --zone="$ZONE" \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

if [ -z "$NEW_IP" ]; then
  echo "❌ Could not retrieve VM IP. Is the VM running?"
  exit 1
fi

echo "✅ New IP: $NEW_IP"
echo "🔄 Updating Cloud Run service '$SERVICE' in region '$REGION'..."

gcloud run services update "$SERVICE" \
  --region="$REGION" \
  --update-env-vars="CHROMA_HOST=${NEW_IP},ALLOYDB_HOST=${NEW_IP}"

echo "✅ Done. CHROMA_HOST and ALLOYDB_HOST updated to $NEW_IP"
echo "💡 If using Doppler, also update CHROMA_URL: doppler secrets set CHROMA_URL=http://${NEW_IP}:8000"
