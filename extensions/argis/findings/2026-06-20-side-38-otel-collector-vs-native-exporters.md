# SOTA — OpenTelemetry Collector vs Native Exporters (side-38)

**Date:** 2026-06-20 11:21 UTC
**Task ID:** side-38
**Agent:** v11-batch-C
**Verdict:** **Adopt the Collector** — for the Phenotype fleet the Collector is the right choice from day one; native exporters (direct OTLP to a vendor) are a footgun the moment we have ≥3 services or want sampling/tail-based routing.

## What each is (2026-06)
- **OTel Collector** (`otelcol`) — the vendor-neutral pipeline binary. Receivers (otlp, jaeger, zipkin, prometheus) → processors (batch, tail_sampling, attributes, filter, routing) → exporters (otlp, prometheus, logging, file, debug). Runs as a sidecar/daemonset/agent. GA since OTel 1.0 (2022); current line is OTel Collector v0.108+ (2026-06).
- **Native exporters** — every OTel SDK ships with direct exporters to vendors (Datadog, Honeycomb, Tempo, Jaeger, GCP, AWS X-Ray, etc.). You configure the SDK with the vendor endpoint + auth and skip the Collector entirely.

Both are "supported" — the OTel spec explicitly allows direct export. The Collector is not required. But it gives you one place to do sampling, retries, attribute PII stripping, fan-out to multiple backends, and protocol translation.

## Fleet relevance (2026-06-20)
- `pheno-otel` — Rust SDK substrate (ADR-037). Currently defaults to OTLP/gRPC to a sidecar collector.
- `pheno-tracing` — `tracing`-bridge substrate (ADR-012, ADR-036B). Wires `tracing-opentelemetry` to the same OTLP pipe.
- `phenotype-otel` (note: distinct from `pheno-otel`) — the TS SDK; same posture.
- Production services: `phenotype-gateway`, `phenotype-registry`, `phenoMCP`, `phenoObservability`, `phenoEvents` — five OTLP-producing services today.

Five producers → one collector → one backend is the canonical topology. Skipping the collector means every service has to know the backend endpoint, retry policy, sampling config, and PII-strip rules — duplicated five times.

## When to adopt the Collector (vs native exporters)
- **Adopt the Collector now** if: ≥2 services emit telemetry, OR you want sampling, OR you want to fan out to >1 backend, OR PII stripping is a concern. We hit all four today.
- **Skip the Collector (use native exporters)** if: a single-service deployment, single backend, no sampling, no PII concerns. This is the legitimate "Hello World" path but doesn't fit any prod service in the fleet.
- **Compromise: Gateway pattern** — one Collector as a gateway, exporters push to it. Same operational shape as a sidecar-per-host, fewer processes.

## Concrete recommendations
1. **`pheno-otel` default**: OTLP/gRPC to `http://localhost:4317` (a Collector sidecar in dev, a Collector deployment in prod). The Collector config (`otelcol.yaml`) lives in `phenotype-ops/agent-devops-setups/otel-collector/` per ADR-023 federated-service rules.
2. **Processors**: `batch` (10s window, 8192 batch size), `memory_limiter` (hard cap 512 MB), `tail_sampling` (per-service policies once we have >3 services), `attributes/redaction` for `*.password`, `*.token`, `http.request.header.authorization`.
3. **Exporters**: primary `otlp` to our chosen backend; secondary `file` for dev-mode ring-buffer replay; `debug` only at `--log-level=debug`.
4. **Sampling default**: head-based parent-based ratio = 1.0 in dev, 0.1 in prod. Move to tail-based once error-budget SLOs are defined.
5. **Auth**: mTLS between service-sidecars and the Collector (ADR-046 federation mTLS scope applies); bearer-token auth to the backend.
6. **Health/Readiness**: Collector exposes `:13133` health and `:8888` Prometheus self-metrics — already wired in the deployment.

## Recommendation
Adopt. The cost of running the Collector is one extra container per host or one Deployment per cluster; the cost of *not* running it is duplicated config drift across 5+ services the moment we want to change a sampling rule or rotate a backend credential. The Collector is a fleet-level invariant.

**Refs:** ADR-012 (pheno-tracing canonical), ADR-036B (pheno-tracing substrate re-affirmed), ADR-037 (pheno-mcp-router substrate — by extension, same posture), ADR-046 (federation mTLS), OTel Collector v0.108 docs (2026-06), `phenotype-ops/agent-devops-setups/otel-collector/` config.