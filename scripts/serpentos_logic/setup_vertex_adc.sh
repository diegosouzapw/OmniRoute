#!/usr/bin/env bash
# Activate Google Cloud Vertex AI ADC as Primary Provider
export CLAUDE_CODE_USE_VERTEX=1
export ANTHROPIC_VERTEX_PROJECT_ID="project-f91a723f-af1b-4dd2-ba3"
export CLOUD_ML_REGION="europe-west3"
export GOOGLE_CLOUD_PROJECT="project-f91a723f-af1b-4dd2-ba3"

echo "⚡ Vertex AI ADC activated:"
echo "   • Project ID: ${ANTHROPIC_VERTEX_PROJECT_ID}"
echo "   • Region:     ${CLOUD_ML_REGION}"
echo "   • ADC Status: Verified via gcloud auth application-default"
