# Cloud Trace & Prompt-Response Logging (Scaffolded Projects)

> **Assumes `/google-agents-cli-scaffold` scaffolding.** Observability infrastructure is provisioned by Terraform in scaffolded projects.

## Cloud Trace

Always-on distributed tracing: Cloud export is configured by `setup_telemetry()` (Cloud Run/GKE) and by `setup_agent_engine_telemetry()` (Agent Runtime); `get_fast_api_app` is called with `otel_to_cloud=False`. Tracks requests through LLM calls and tool executions with latency analysis and error visibility.

View traces: **Cloud Console → Trace → Trace explorer**

No configuration required. Works in local dev (`agents-cli playground`) and all deployed environments.

## Prompt-Response Logging Infrastructure

All provisioned automatically by `deployment/terraform/single-project/telemetry.tf` (and the `cicd/` variant):

- **Log sinks** — Route GenAI inference logs and feedback logs directly to BigQuery (partitioned tables)
- **BigQuery dataset** — Telemetry dataset with external tables over GCS data and pre-created log export table
- **Pre-created log export table** — `gen_ai_client_inference_operation_details` table with Cloud Logging BQ export schema (labels flattened: dots become underscores)
- **GCS logs bucket** — Stores completions as NDJSON
- **BigQuery connection** — Service account for GCS access from BigQuery
- **Completions view** — Joins BQ log export data with GCS-stored prompt/response data

Check `deployment/terraform/single-project/telemetry.tf` for exact configuration. IAM bindings grant log sink service accounts `roles/bigquery.dataEditor` on the telemetry dataset.

## Environment Variables

Set automatically by Terraform on the deployed service:

| Variable                                             | Purpose                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `LOGS_BUCKET_NAME`                                   | GCS bucket for completions and logs. Required to enable prompt-response logging                      |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` | Controls logging state and content capture                                                           |
| `BQ_ANALYTICS_DATASET_ID`                            | BigQuery dataset for telemetry (only when scaffolded with `--bq-analytics`)                          |
| `BQ_ANALYTICS_CONNECTION_ID`                         | BigQuery connection for GCS access (only when scaffolded with `--bq-analytics`)                      |
| `BQ_ANALYTICS_GCS_BUCKET`                            | GCS bucket for BigQuery Analytics multimodal offloading (only when scaffolded with `--bq-analytics`) |
| `GENAI_TELEMETRY_PATH`                               | Optional: override upload path within bucket (default: `completions`)                                |

## Enabling / Disabling

### Enable Locally

Set these before running `agents-cli playground`:

```bash
export LOGS_BUCKET_NAME="your-bucket-name"
export OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT="NO_CONTENT"
```

### Disable in Deployed Environments

Set `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` in `deployment/terraform/single-project/service.tf` (or the `cicd/` variant) and re-apply Terraform.

## BigQuery Dataset Naming Convention

BigQuery dataset names **cannot contain hyphens**. Terraform automatically converts hyphens to underscores when creating dataset names from your project name:

- Project name `my-agent` → BQ dataset `my_agent_telemetry`

One dataset is created:

- **`{name}_telemetry`** — Contains external tables over GCS completions data (NDJSON), the pre-created log export table (`gen_ai_client_inference_operation_details`), and the `completions_view`

To discover the actual dataset name in your project:

```bash
bq ls --project_id=${PROJECT_ID}
```

## Verifying Telemetry

After deploying, verify prompt-response logging is working:

```bash
PROJECT_ID="your-dev-project-id"
PROJECT_NAME="your-app-name"  # The agents-cli project name (not the GCP project ID)

# Check GCS data
gsutil ls gs://${PROJECT_ID}-${PROJECT_NAME}-logs/completions/

# Check BigQuery log export table (logs arrive via sink, may take a few minutes)
bq query --use_legacy_sql=false \
  "SELECT COUNT(*) FROM \`${PROJECT_ID}.${PROJECT_NAME//-/_}_telemetry.gen_ai_client_inference_operation_details\`"

# Query completions external table
bq query --use_legacy_sql=false \
  "SELECT * FROM \`${PROJECT_ID}.${PROJECT_NAME//-/_}_telemetry.completions\` LIMIT 10"

# Query the completions view (joins log export with GCS data)
bq query --use_legacy_sql=false \
  "SELECT * FROM \`${PROJECT_ID}.${PROJECT_NAME//-/_}_telemetry.completions_view\` LIMIT 10"
```

If data is not appearing: check `LOGS_BUCKET_NAME` is set, verify SA has `storage.objectCreator` on the bucket, check application logs for telemetry setup warnings. Log export to BigQuery may take a few minutes to propagate.
