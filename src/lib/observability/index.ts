/**
 * OmniRoute observability barrel.
 *
 * The modules here implement a small, dependency-free subset of the
 * OpenTelemetry surface that we actually consume today:
 *
 *  - {@link initTelemetry}       — bootstrap from env (PR-001)
 *  - {@link getTracer}           — named-tracer factory (PR-001)
 *  - {@link startSpan}           — active-span helper for hot paths (PR-001)
 *  - {@link withSpan}            — async-context helper (PR-002)
 *  - {@link recordException}     — error attribute helper (PR-002)
 *  - {@link metricsRegistry}     — Prometheus registry (PR-003)
 *  - {@link httpMetricsMiddleware} — RED metrics (PR-003)
 *  - {@link log}                 — Pino-compatible structured logger (PR-004)
 *  - {@link setLogContext}       — per-tenant/per-request log scope (PR-004)
 *  - {@link serviceResource}     — resource attributes (PR-005)
 *
 * Every export is feature-gated by `OTEL_SDK_DISABLED` / `OMNIROUTE_METRICS_ENABLED`
 * / `OMNIROUTE_LOG_FORMAT` env vars. The default behaviour is a no-op so the
 * Electron-PWA bundle pays nothing.
 *
 * @see docs/observability/01-quickstart.md
 * @see plans/2026-06-23-omniroute-100-pr-roadmap.md (PR-001..PR-005)
 */

export {
  initTelemetry,
  shutdownTelemetry,
  isTelemetryEnabled,
  getTracer,
  startSpan,
  withSpan,
  recordException,
  currentTraceId,
  currentSpanId,
} from "./otel";

export type {
  Span,
  SpanContext,
  SpanKind,
  SpanStatus,
  SpanAttributeValue,
  Tracer,
  AttributeValue,
} from "./spanTypes";

export {
  metricsRegistry,
  httpMetricsMiddleware,
  recordProviderAttempt,
  recordProviderDuration,
  recordQuotaRemaining,
  recordCacheHit,
  recordCacheMiss,
  setProcessMetrics,
} from "./metrics";

export {
  log,
  setLogContext,
  getLogContext,
  clearLogContext,
  withLogContext,
} from "./logger";

export { serviceResource, detectEnvironment, parseResourceAttributes } from "./resource";

export { OTLP_HTTP_TRACE_PATH, OTLP_GRPC_TRACE_PATH, buildOtlpHttpExporter, type OtlpExporterConfig } from "./otlpExporter";
