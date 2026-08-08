# BigQuery Agent Analytics Plugin

> **Opt-in.** Enable with `--bq-analytics` at scaffold time, or add manually to `app/agent.py`.

An optional plugin that logs structured agent events directly to BigQuery via the Storage Write API. Enables:

- **Conversational analytics** — session flows, user interaction patterns
- **LLM-as-judge evals** — structured data for evaluation pipelines
- **Custom dashboards** — Looker Studio integration
- **Tool provenance tracking** — LOCAL, MCP, SUB_AGENT, A2A, TRANSFER_AGENT

## Enabling

| Method               | How                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **At scaffold time** | `agents-cli scaffold create <project-name> --bq-analytics`                                                                 |
| **Post-scaffold**    | Add the plugin manually to `app/agent.py` (see [ADK docs](https://adk.dev/integrations/bigquery-agent-analytics/index.md)) |

Infrastructure (BigQuery dataset, GCS offloading) is provisioned automatically by Terraform when enabled at scaffold time.

## Key Features

- Auto-schema upgrade (new fields added without migration)
- GCS offloading for multimodal content (images, audio)
- Distributed tracing via OpenTelemetry span context
- SQL-queryable event log for all agent interactions

For full schema, SQL query examples, and Looker Studio setup, fetch `https://adk.dev/integrations/bigquery-agent-analytics/index.md`.
