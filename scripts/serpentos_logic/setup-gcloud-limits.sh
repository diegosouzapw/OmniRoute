#!/usr/bin/env bash
# [MANAGED BY: architect-agent]
# setup-gcloud-limits.sh — Setup budget alerts and secure Cloud Run defaults

set -euo pipefail

PROJECT_ID="project-f91a723f-af1b-4dd2-ba3"
echo "🔐 Setting up Google Cloud Security & Limits for $PROJECT_ID..."

# Check if project is set
gcloud config set project "$PROJECT_ID"

echo "Checking Cloud Run default configurations..."
# The main security limit is ensuring no Cloud Run service scales infinitely.
# We will list all services and ensure they have a max-instances limit.
SERVICES=$(gcloud run services list --region europe-west1 --format="value(SERVICE)")
if [ -z "$SERVICES" ]; then
    echo "No Cloud Run services found in europe-west1 yet."
else
    for SERVICE in $SERVICES; do
        echo "Updating $SERVICE to max-instances=10 to prevent abuse..."
        gcloud run services update "$SERVICE" --region europe-west1 --max-instances 10 --quiet
    done
fi

echo "✅ GCP Security Baseline Applied."
echo "⚠️ For Billing Budgets, GCP requires a Billing Account Admin role."
echo "Please go to https://console.cloud.google.com/billing and set a €10/day budget alert manually if not already done."
