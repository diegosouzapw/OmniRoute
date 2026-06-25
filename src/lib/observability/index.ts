/**
 * src/lib/observability/index.ts
 *
 * Barrel module — the single import surface for the observability stack.
 * Consumers should:
 *
 *     import {
 *       initTelemetry,
 *       shutdownTelemetry,
 *       withSpan,
 *       recordProviderAttempt,
 *       metricsRegistry,
 *       setProcessMetrics,
 *     } from "@/lib/observability";
 *
 * No internal module of this stack should be imported directly from
 * outside `src/lib/observability/**` — that keeps the public surface
 * auditable. Test files are an explicit exception (they're allowed to
 * import internals for white-box coverage).
 */

export {
  // Lifecycle
  initTelemetry,
  shutdownTelemetry,
  isTelemetryEnabled,
  getTracer,
  drainSpans,
  _resetTelemetryForTests,
  // Active span
  startSpan,
  endSpan,
  withSpan,
  withSpanSync,
  currentTraceId,
  currentSpanId,
  currentSpanContext,
  recordException,
  addSpanEvent,
  setSpanAttribute,
  setSpanStatus,
  injectTraceParent,
  _currentSpanStack,
  // Status helpers
  SPAN_STATUS_OK,
  SPAN_STATUS_ERROR,
  SPAN_STATUS_UNSET,
} from "./otel";

export {
  randomHexId,
  formatTraceParent,
  parseTraceParent,
  isValidSpanContext,
} from "./spanTypes";
export type { Span, SpanContext, SpanEvent, SpanKind, SpanStatus, SpanStatusCode, SpanLink, SpanAttributes } from "./spanTypes";

export {
  getResource,
  resetResourceCache,
  mergeResources,
  resourceFromAttributes,
  resourceToOtlp,
  resourceToPromLabels,
} from "./resource";
export type { Resource } from "./resource";

export {
  createCounter,
  createGauge,
  createHistogram,
  createSummary,
  metricsRegistry,
  httpMetricsMiddleware,
  recordProviderAttempt,
  recordProviderDuration,
  recordCacheHit,
  recordCacheMiss,
  recordQuotaRemaining,
  recordQuotaLimit,
  setProcessMetrics,
  getDroppedTotals,
} from "./metrics";
export type {
  Counter,
  Gauge,
  Histogram,
  Summary,
  LabelValues,
  MetricHandle,
  CreateCounterOptions,
  CreateGaugeOptions,
  CreateHistogramOptions,
  CreateSummaryOptions,
} from "./metrics";

export {
  OtlpHttpExporter,
  exporterSink,
} from "./otlpExporter";
export type { OtlpExporterOptions } from "./otlpExporter";

export {
  createLogger,
  logger,
  setLogLevel,
  getLogLevel,
  setLogFormat,
  getLogFormat,
  isLogLevelEnabled,
  _resetLoggerForTests,
} from "./logger";
export type { LogLevel, LogRecord, LogFields, Logger } from "./logger";

export {
  instrumentFetch,
  instrumentDb,
  instrumentCache,
  instrumentProvider,
  classifyError,
  passiveSpan,
} from "./auto";
export type {
  InstrumentedFetchOptions,
  InstrumentedDbOptions,
  InstrumentedCacheOptions,
  InstrumentedProviderOptions,
  InstrumentedProviderResult,
} from "./auto";

export {
  propagateTraceParent,
  withProxySpan,
  isProxySpanResult,
  currentProxySpanResult,
  PROXY_TRACE_HEADER,
} from "./proxySpan";
export type { ProxySpanResult } from "./proxySpan";