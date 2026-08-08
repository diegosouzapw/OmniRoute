---
name: google-agents-cli-observability
description: >
  This skill should be used when the user wants to "set up tracing",
  "monitor my ADK agent", "configure logging", "add observability",
  "debug production traffic", or needs guidance on monitoring deployed
  ADK (Agent Development Kit) agents.
  Covers Cloud Trace, prompt-response logging, BigQuery Agent Analytics,
  third-party integrations (AgentOps, Phoenix, MLflow, etc.), and troubleshooting.
  Part of the Google ADK (Agent Development Kit) skills suite.
  Do NOT use for deployment setup (use google-agents-cli-deploy) or
  API code patterns (use google-agents-cli-adk-code).
metadata:
  author: Google
  license: Apache-2.0
  version: 0.6.0
  requires:
    bins:
      - agents-cli
    install: "uv tool install google-agents-cli"
---

# ADK Observability Guide

> **Cloud Trace** works out of the box — no infrastructure needed. **Prompt-response logging** and **BigQuery Agent Analytics** require Terraform-provisioned infrastructure (service account, GCS bucket, BigQuery dataset). Run `agents-cli infra single-project --project PROJECT_ID` to provision these resources. See `references/cloud-trace-and-logging.md` for details, env vars, and verification commands. If your project isn't scaffolded yet, see `/google-agents-cli-scaffold` first.

### Order of operations for `agent_runtime` deployments

For `deployment_target = agent_runtime`, run `agents-cli infra single-project` **before** the first `agents-cli deploy`. The Terraform module owns the entire Reasoning Engine resource (display_name, service account, deployment spec, env vars), so applying it after a SDK-based deploy creates a state mismatch — Terraform has no record of the SDK-deployed instance and cannot layer env vars onto it without taking ownership of the whole resource.

If you have already run `agents-cli deploy`, you have two options:

1. **Switch to Terraform-managed.** Delete the SDK-deployed Reasoning Engine, then run `agents-cli infra single-project` followed by `agents-cli deploy`. Sessions and any in-flight state on the previous instance are lost.
2. **Keep the SDK-deployed instance.** Skip `infra single-project` and set the observability env vars on the running instance directly via the `vertexai` client `update` API. You will also need to grant the instance's service account the IAM permissions required to emit telemetry — writing to the logs GCS bucket, BigQuery dataset access, log writer, etc. See `deployment/terraform/single-project/iam.tf` and `telemetry.tf` in your scaffolded project for the full set of bindings the Terraform module would otherwise provision. Terraform-managed env vars are not available in this mode.

### Reference Files

| File | Contents |
|------|----------|
| `references/cloud-trace-and-logging.md` | Scaffolded project details — Terraform-provisioned resources, environment variables, verification commands, enabling/disabling locally |
| `references/bigquery-agent-analytics.md` | BQ Agent Analytics plugin — enabling, key features, GCS offloading, tool provenance |

---

## Observability Tiers

Choose the right level of observability based on your needs:

| Tier | What It Does | Scope | Default State | Best For |
|------|-------------|-------|---------------|----------|
| **Cloud Trace** | Distributed tracing — execution flow, latency, errors via OpenTelemetry spans | All templates, all environments | Always enabled | Debugging latency, understanding agent execution flow |
| **Prompt-Response Logging** | GenAI interactions exported to GCS, BigQuery, and Cloud Logging | ADK agents only | Disabled locally, enabled when deployed | Auditing LLM interactions, compliance |
| **BigQuery Agent Analytics** | Structured agent events (LLM calls, tool use, outcomes) to BigQuery | ADK agents with plugin enabled | Opt-in (`--bq-analytics` at scaffold time) | Conversational analytics, custom dashboards, LLM-as-judge evals |
| **Third-Party Integrations** | External observability platforms (AgentOps, Phoenix, MLflow, etc.) | Any ADK agent | Opt-in, per-provider setup | Team collaboration, specialized visualization, prompt management |

**Ask the user** which tier(s) they need — they can be combined. Cloud Trace is always on; the others are additive.

---

## Cloud Trace

ADK uses OpenTelemetry to emit distributed traces. Every agent invocation produces spans that track the full execution flow.

### Span Hierarchy

```
invocation
  └── agent_run (one per agent in the chain)
        ├── call_llm (model request/response)
        └── execute_tool (tool execution)
```

### Setup by Deployment Type

| Deployment | Setup |
|-----------|-------|
| **Agent Runtime** | Automatic — traces are exported to Cloud Trace by default |
| **Cloud Run (scaffolded)** | Automatic — `setup_telemetry()` configures Cloud Trace/Logging exporters |
| **GKE (scaffolded)** | Automatic — `setup_telemetry()` configures Cloud Trace/Logging exporters |
| **Cloud Run / GKE (manual)** | Configure OpenTelemetry exporter in your app |
| **Local dev** | Works with `agents-cli playground`; traces visible in Cloud Console |

View traces: **Cloud Console → Trace → Trace explorer**

For detailed setup instructions (Agent Runtime CLI/SDK, Cloud Run, custom deployments), fetch `https://adk.dev/integrations/cloud-trace/index.md`.

---

## Prompt-Response Logging

Captures GenAI interactions (model name, tokens, timing) and exports to GCS (JSONL) and BigQuery (via direct log sinks and external tables). Privacy-preserving by default — only metadata is logged unless explicitly configured otherwise.

Key env var: `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` — OTel GenAI semantic-conventions standard (modes: `span_only`, `event_only`, `span_and_event`, `no_content`). The scaffolded `setup_telemetry()` collapses every non-`false` value to `NO_CONTENT` (metadata-only); `false` disables capture. Logging is disabled locally unless `LOGS_BUCKET_NAME` is set.

For scaffolded project details (Terraform resources, env vars, privacy modes, enabling/disabling, verification commands), see `references/cloud-trace-and-logging.md`.

For ADK logging docs (log levels, configuration, debugging), fetch `https://adk.dev/observability/logging/index.md`.

---

## BigQuery Agent Analytics Plugin

Optional plugin that logs structured agent events to BigQuery. Enable with `--bq-analytics` at scaffold time. See `references/bigquery-agent-analytics.md` for details.

---

## Third-Party Integrations

ADK supports several third-party observability platforms. Each uses OpenTelemetry or custom instrumentation to capture agent behavior.

| Platform | Key Differentiator | Setup Complexity | Self-Hosted Option |
|----------|-------------------|-----------------|-------------------|
| **AgentOps** | Session replays, 2-line setup, replaces native telemetry | Minimal | No (SaaS) |
| **Arize AX** | Commercial platform, production monitoring, evaluation dashboards | Low | No (SaaS) |
| **Phoenix** | Open-source, custom evaluators, experiment testing | Low | Yes |
| **MLflow** | OTel traces to MLflow Tracking Server, span tree visualization | Medium (needs SQL backend) | Yes |
| **Monocle** | 1-call setup, VS Code Gantt chart visualizer | Minimal | Yes (local files) |
| **Weave** | W&B platform, team collaboration, timeline views | Low | No (SaaS) |
| **Freeplay** | Prompt management + evals + observability in one platform | Low | No (SaaS) |

**Ask the user** which platform they prefer — present the trade-offs and let them choose. For setup details, fetch the relevant ADK docs page from the Deep Dive table below.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No traces in Cloud Trace | Verify `setup_telemetry()` runs at startup and the service account has the `cloudtrace.agent` role |
| Prompt-response data not appearing | Check `LOGS_BUCKET_NAME` is set; verify SA has `storage.objectCreator` on the bucket; check app logs for telemetry setup warnings |
| Privacy mode misconfigured | Check `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` value — use `NO_CONTENT` for metadata-only, `false` to disable |
| BigQuery Analytics not logging | Verify plugin is configured in `app/agent.py`; check `BQ_ANALYTICS_DATASET_ID` env var is set |
| Third-party integration not capturing spans | Check provider-specific env vars (API keys, endpoints); some providers (AgentOps) replace native telemetry |
| Traces missing tool spans | Tool execution spans appear under `execute_tool` — check trace explorer filters |
| High telemetry costs | Switch to `NO_CONTENT` mode; reduce BigQuery retention; disable unused tiers |

---

## Deep Dive: ADK Docs (WebFetch URLs)

For detailed documentation beyond what this skill covers, fetch these pages:

| Topic | URL |
|-------|-----|
| Observability overview | `https://adk.dev/observability/index.md` |
| Agent activity logging | `https://adk.dev/observability/logging/index.md` |
| Cloud Trace integration | `https://adk.dev/integrations/cloud-trace/index.md` |
| BigQuery Agent Analytics | `https://adk.dev/integrations/bigquery-agent-analytics/index.md` |
| AgentOps | `https://adk.dev/integrations/agentops/index.md` |
| Arize AX | `https://adk.dev/integrations/arize-ax/index.md` |
| Phoenix (Arize) | `https://adk.dev/integrations/phoenix/index.md` |
| MLflow tracing | `https://adk.dev/integrations/mlflow-tracing/index.md` |
| Monocle | `https://adk.dev/integrations/monocle/index.md` |
| W&B Weave | `https://adk.dev/integrations/weave/index.md` |
| Freeplay | `https://adk.dev/integrations/freeplay/index.md` |

---

## Related Skills

- `/google-agents-cli-deploy` — Deployment targets, CI/CD pipelines, and production workflows
- `/google-agents-cli-workflow` — Development workflow, coding guidelines, and operational rules
- `/google-agents-cli-adk-code` — ADK Python API quick reference for writing agent code
