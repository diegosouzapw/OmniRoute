---
name: gcp-zero-idle
description: Deploy and operate zero-idle serverless agent services on GCP Cloud Run and BigQuery Free Tier.
---

# GCP Zero-Idle Serverless & BigQuery Free Tier Patterns

Use this skill when deploying Agentic OS runtimes or designing GCP infrastructure under strict budget / free-tier constraints.

## 1. Cloud Run Zero-Idle Runtime
Always configure Cloud Run agent services with zero minimum instances:
```bash
gcloud run deploy serpent-agent-runtime \
  --image gcr.io/project-f91a723f-af1b-4dd2-ba3/serpent-runtime:latest \
  --region europe-west3 \
  --min-instances 0 \
  --max-instances 3 \
  --concurrency 10 \
  --cpu 1 \
  --memory 1Gi \
  --allow-unauthenticated
```
- Ensures **$0 cost** during idle periods.
- Concurrency 10 allows multiple agent loops on a single container instance.

## 2. BigQuery Free Tier Batch Logging Pattern
GCP Free Tier prohibits streaming API inserts (`bq insert`). To log structured telemetry at **$0 cost** within the 10GB/month free storage quota:
1. Format row as Newline-Delimited JSON (`NEWLINE_DELIMITED_JSON`).
2. Load via batch command (`bq load`):
```bash
bq load --project_id="$GCP_PROJECT" --source_format=NEWLINE_DELIMITED_JSON \
  "$GCP_PROJECT:serpentos_telemetry.agent_events" \
  /tmp/event.json \
  agent_id:STRING,model:STRING,latency_ms:INTEGER,cost_tokens:INTEGER,task:STRING,status:STRING,timestamp:TIMESTAMP
```

## 3. Model Routing & Token Saver Fallback
Route requests through local TokenSaver (`localhost:4000`) adhering to 9-Tier Free-First Fallback:
1. Gemini 2.0 Flash Lite / 2.5 Flash (Free quota)
2. Groq Llama 3.1 70B (Free API)
3. NVIDIA NIM (`nim.llama-3.1-70b-instruct`)
4. Alibaba Qwen (`qwen-max`, `qwen2.5-coder-32b`)
