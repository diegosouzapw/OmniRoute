/**
 * index.ts — Barrel for the observability stack.
 *
 * Re-exports every public symbol from the other modules so callers can write:
 *
 *     import {
 *       initTelemetry,
 *       getTracer,
 *       withSpan,
 *       initObservabilityAuto,
 *       withProxySpan,
 *     } from "@/lib/observability";
 *
 * instead of reaching into 7+ files. Everything is default-OFF until the
 * consumer opts in via `initObservabilityAuto()` (or sets
 * OTEL_EXPORTER_OTLP_ENDPOINT).
 */

// Core types
export type {
  AttributeValue,
  Counter,
  Gauge,
  Histogram,
  LogLevel,
  LogRecord,
  MetricExporter,
  MetricPoint,
  Resource,
  Span,
  SpanAttributes,
  SpanContext,
  SpanEvent,
  SpanExporter,
  SpanScope,
  SpanStatusCode,
  Tracer,
} from "./spanTypes";
export { TRACE_FLAG_SAMPLED } from "./spanTypes";

// Resource
export { createDefaultResource, serializeResource } from "./resource";

// Tracer + global context
export {
  contextFromTraceparent,
  flushSpans,
  generateSpanId,
  generateTraceId,
  getActiveSpan,
  getResource,
  getTracer,
  initTelemetry,
  isTelemetryInitialized,
  shutdownTelemetry,
  spanContext,
  traceparentFromContext,
  withSpan,
  // Test seams (use only from tests; do not call from production code)
  _addExporterForTesting,
  _queueDepthForTesting,
  _setResourceForTesting,
} from "./otel";

// OTLP/HTTP exporter
export {
  OtlpHttpMetricExporter,
  OtlpHttpSpanExporter,
  type OtlpExporterOptions,
  _encodeSpanForTesting,
} from "./otlpExporter";

// Metrics
export {
  flushMetrics,
  getOrCreateCounter,
  getOrCreateGauge,
  getOrCreateHistogram,
  initMetrics,
  shutdownMetrics,
  _pendingCountForTesting,
  _registeredInstrumentsForTesting,
  _setExportersForTesting,
} from "./metrics";

// Logger
export {
  createLogger,
  logRecordWithContext,
  type Logger,
  type LoggerOptions,
  _pinoForTesting,
} from "./logger";

// Auto-init / lifecycle
export {
  flushObservability,
  getRequestCounter,
  getRequestLatencyHistogram,
  initObservabilityAuto,
  isObservabilityEnabled,
  setProcessMetrics,
  shutdownObservabilityAuto,
  traceAsync,
  type AutoInitOptions,
  _isProcessMetricsStartedForTesting,
} from "./auto";

// Proxy glue
export {
  extractRequestContext,
  withProxySpan,
  withProxySpanSync,
  type ProxyRequestContext,
} from "./proxySpan";

// PR-009: Health-check primitives (runHealthCheck, aggregateChecks,
// BUILTIN_CHECKS) and the structured response types. Route handlers import
// from this barrel so they don't reach into the implementation files.
export {
  runHealthCheck,
  aggregateChecks,
  BUILTIN_CHECKS,
  BUILTIN_CHECK_ORDER,
  DEFAULT_CHECK_TIMEOUT_MS,
  DEFAULT_MIN_FREE_BYTES,
  MEMORY_WARN_RATIO,
  MEMORY_FAIL_RATIO,
  EVENT_LOOP_LAG_WARN_MS,
  EVENT_LOOP_LAG_FAIL_MS,
} from "./healthChecks";
export type { HealthCheckResult, HealthCheckStatus, HealthResponse } from "./healthTypes";