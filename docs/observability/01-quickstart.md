# OmniRoute Observability — Quickstart

This document describes the operator-facing observability stack that ships
with OmniRoute v3.8.34. Three subsystems:

1. **OpenTelemetry traces** (`src/lib/observability/otel.ts`) — OTLP/HTTP
   exporter, per-request span emission, idempotent bootstrap.
2. **Prometheus `/metrics`** (`src/lib/observability/metrics.ts`) —
   RED-method HTTP counter/histogram, provider-attempt counters, quota
   gauges, cache hit/miss counters. Cardinality-capped label allow-list.
3. **Structured logger** (`src/lib/observability/logger.ts`) — pino-style
   NDJSON with `AsyncLocalStorage` request-scoped context, trace/span
   correlation, optional pretty format for dev.

All three are **off by default** (zero-dep, zero-cost). Operators opt in
via env vars (see below) — when disabled, every function returns a
no-op stub in O(1) with no allocations on the hot path.

## OpenTelemetry

| Variable | Default | Purpose |
|----------|---------|---------|
| `OTEL_SDK_DISABLED` | `false` | Set to `1` / `true` / `yes` / `on` to force-disable. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | _unset_ | Collector URL, e.g. `http://otel-collector:4318`. |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | _unset_ | Override traces-only endpoint. |
| `OTEL_EXPORTER_OTLP_HEADERS` | _unset_ | Comma-separated `k=v,k=v` headers (auth tokens). |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `http/json` | We implement HTTP/JSON; `grpc` falls back with a warning. |
| `OTEL_TRACES_SAMPLER_ARG` | `1` | Sample ratio `[0,1]`. |
| `OTEL_BSP_MAX_QUEUE_SIZE` | `2048` | Spans buffered between flushes. |
| `OTEL_BSP_SCHEDULE_DELAY` | `5000` | Flush interval (ms). |
| `OTEL_SERVICE_NAME` / `OMNIROUTE_SERVICE_NAME` | `omniroute` | `service.name` resource attribute. |
| `OTEL_RESOURCE_ATTRIBUTES` | _unset_ | Comma-separated `k=v,k=v` extras (e.g. `deployment.region=us-east-1`). |
| `DEPLOYMENT_ENVIRONMENT` | auto-detect | `deployment.environment` resource attribute. |

Bootstrap once at startup (already wired in `src/instrumentation-node.ts`):

```ts
import { initTelemetry, shutdownTelemetry } from "@/lib/observability";
await initTelemetry();

process.on("SIGTERM", () => {
  void shutdownTelemetry().finally(() => process.exit(0));
});
```

Spans:

```ts
import { getTracer } from "@/lib/observability";

const tracer = getTracer("my-component");
await tracer.withSpan("upstream.call", async (span) => {
  span.setAttribute("provider", "openai");
  span.setAttribute("model", "gpt-4o");
  // throws? → status=ERROR + exception event auto-recorded
});
```

## Prometheus /metrics

Endpoint: `GET /api/system/metrics` (added in PR-001).

| Metric | Type | Labels |
|--------|------|--------|
| `omniroute_http_requests_total` | counter | `route`, `method`, `status` |
| `omniroute_http_request_duration_seconds` | histogram | `route`, `method`, `status` |
| `omniroute_provider_upstream_attempts_total` | counter | `provider`, `model`, `outcome` |
| `omniroute_provider_upstream_duration_seconds` | histogram | `provider`, `model`, `outcome` |
| `omniroute_quota_remaining` | gauge | `provider`, `model` |
| `omniroute_quota_limit` | gauge | `provider`, `model` |
| `omniroute_cache_hits_total` | counter | `layer` |
| `omniroute_cache_misses_total` | counter | `layer` |

Cardinality cap: each family has a fixed label allow-list
(`src/lib/observability/metrics.ts :: LABEL_ALLOWLIST`). Unrecognised
labels are dropped at write time with a `console.warn` so operators see
the mismatch.

## Structured logger

| Variable | Default | Purpose |
|----------|---------|---------|
| `OMNIROUTE_LOG_LEVEL` | `info` | `trace` / `debug` / `info` / `warn` / `error` / `fatal`. |
| `OMNIROUTE_LOG_FORMAT` | `json` | `json` (NDJSON) or `pretty` (human-readable). |

Usage:

```ts
import { log, withLogContext } from "@/lib/observability/logger";

withLogContext({ tenantId: "t-1", requestId: req.id }, () => {
  log.info("combo_created", { comboId, tierCount });
  log.error("upstream_failed", err, { provider, model });
});
```

When an OTel span is active in the current async scope, every log
record automatically carries `traceId` and `spanId`. Logs at `warn` /
`error` / `fatal` go to **stderr**; everything else to **stdout** (so
container log shippers can split severity streams).