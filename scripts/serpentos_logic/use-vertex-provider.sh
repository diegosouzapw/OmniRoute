#!/usr/bin/env bash
# Source this script to instantly point Antigravity / Claude / OpenCode to Google Cloud Vertex AI
export GOOGLE_CLOUD_PROJECT="project-f91a723f-af1b-4dd2-ba3"
export GCLOUD_PROJECT="project-f91a723f-af1b-4dd2-ba3"
export VERTEX_AI_PROJECT="project-f91a723f-af1b-4dd2-ba3"
export VERTEX_AI_LOCATION="europe-west3"
export CLOUD_ML_REGION="europe-west3"
export CLAUDE_CODE_USE_VERTEX="1"
export ANTHROPIC_VERTEX_PROJECT_ID="project-f91a723f-af1b-4dd2-ba3"
echo "✅ Antigravity environment switched to Google Cloud Vertex AI ($GOOGLE_CLOUD_PROJECT @ $CLOUD_ML_REGION)"
