/**
 * spanTypes.ts — Public type definitions for the in-house observability stack.
 *
 * Mirrors the surface of the OpenTelemetry SDK Span/SpanContext/Tracer interfaces
 * but uses an internal, dependency-free model so we do not pull in @opentelemetry/*
 * packages. Consumers (route handlers, proxy, instrumentation) import these types
 * only — runtime behavior is in {otel, spanTypes, resource, metrics, logger}.
 *
 * The model is intentionally narrow:
 *  - one active span per call site (no parent/child graph beyond `parentSpanId`)
 *  - attributes are a flat string-keyed map (typed scalars + arrays)
 *  - status maps to OpenTelemetry status { UNSET, OK, ERROR }
 *  - span events are append-only string-keyed logs with attributes
 *
 * Default-off: nothing in this module starts a tracer; that happens in `otel.ts`
 * only after `initTelemetry()` is called by the consumer.
 */

/** W3C trace-flag bits (subset we actually use). */
export const TRACE_FLAG_SAMPLED = 0x01;

/** OpenTelemetry-compatible status codes. */
export type SpanStatusCode = "UNSET" | "OK" | "ERROR";

/**
 * Attributes attached to a span (or span event). Values are restricted to the
 * OTEL attribute value types: string, number, boolean, or array of those.
 */
export type AttributeValue = string | number | boolean | null | undefined;
export type SpanAttributes = Record<string, AttributeValue | readonly AttributeValue[]>;

/** Span event recorded via `span.addEvent(name, attributes)`. */
export interface SpanEvent {
  readonly name: string;
  readonly timestampMs: number;
  readonly attributes?: SpanAttributes;
}

/**
 * The context that travels with a request across the proxy — corresponds to the
 * OpenTelemetry SpanContext (traceId, spanId, flags, parentSpanId, traceState).
 * `parentSpanId` is `null` for root spans.
 */
export interface SpanContext {
  readonly traceId: string;
  readonly spanId: string;
  readonly flags: number;
  readonly parentSpanId: string | null;
  readonly traceState?: string;
}

/** A live span handle returned by `startSpan`. */
export interface Span {
  readonly context: SpanContext;
  readonly name: string;
  readonly startedAtMs: number;
  /** Record a scalar/array attribute on the span. */
  setAttribute(key: string, value: AttributeValue | readonly AttributeValue[]): void;
  /** Merge a bag of attributes. */
  setAttributes(attributes: SpanAttributes): void;
  /** Add a timestamped event. */
  addEvent(name: string, attributes?: SpanAttributes): void;
  /** Mark the span as ended; subsequent attribute writes are silently dropped. */
  end(endMs?: number): void;
  /** Set the final status. `errorMessage` is required when status === "ERROR". */
  setStatus(status: SpanStatusCode, errorMessage?: string): void;
  /** Update the span name (renames for downstream exporters). */
  updateName(name: string): void;
  /** Read the merged attributes (snapshot — safe to mutate). */
  getAttributes(): SpanAttributes;
  /** Total duration once ended, in milliseconds (0 while still open). */
  getDurationMs(): number;
  /** Whether the span has been ended. */
  isEnded(): boolean;
  /** Read the recorded events. */
  getEvents(): readonly SpanEvent[];
  /** Read the final status + error message. */
  getStatus(): { status: SpanStatusCode; errorMessage?: string };
}

/** A tracer produces spans. Most callers use the global tracer from `otel.ts`. */
export interface Tracer {
  /** Start a new root span (no parent). */
  startSpan(name: string, attributes?: SpanAttributes): Span;
  /**
   * Start a child span with an explicit parent context. If `parent` is omitted,
   * the active context (set via `withSpan`) is used.
   */
  startChildSpan(name: string, attributes?: SpanAttributes, parent?: SpanContext): Span;
}

/** SpanKind mirrors OTEL — kept narrow for proxy/route usage. */
export type SpanKind = "INTERNAL" | "SERVER" | "CLIENT" | "PRODUCER" | "CONSUMER";

/** SpanExporter receives ended spans — used by OTLP/HTTP exporter (otlpExporter). */
export interface SpanExporter {
  readonly name: string;
  /** Export an ended span. Returns true on success, false on transient failure. */
  exportSpan(span: Span, resource: Resource): Promise<boolean> | boolean;
  /** Force flush any buffered spans. */
  flush(): Promise<void>;
  /** Release resources. */
  shutdown(): Promise<void>;
}

/** Resource describes the entity producing telemetry (service.name, version, …). */
export interface Resource {
  readonly attributes: Readonly<Record<string, AttributeValue>>;
  merge(extra: Resource): Resource;
  /** Convenience: get a string attribute with a fallback default. */
  getString(key: string, fallback?: string): string;
}

/** A point-in-time measurement (the body of a metric). */
export interface MetricPoint {
  readonly name: string;
  readonly value: number;
  readonly attributes: SpanAttributes;
  readonly timestampMs: number;
}

/** Metric exporters receive recorded points. */
export interface MetricExporter {
  readonly name: string;
  exportPoint(point: MetricPoint): Promise<void> | void;
  flush(): Promise<void>;
  shutdown(): Promise<void>;
}

/** A counter / histogram / gauge abstraction. */
export interface Counter {
  inc(by?: number, attributes?: SpanAttributes): void;
}
export interface Histogram {
  record(value: number, attributes?: SpanAttributes): void;
}
export interface Gauge {
  set(value: number, attributes?: SpanAttributes): void;
}

/** Structured log record produced by the logger. */
export interface LogRecord {
  readonly timestampMs: number;
  readonly level: LogLevel;
  readonly message: string;
  readonly context?: SpanContext;
  readonly attributes?: SpanAttributes;
  readonly error?: { name: string; message: string; stack?: string };
}

/** Pino-compatible log levels. */
export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

/** Bridge type used by `proxySpan` to enter/exit a span scope. */
export interface SpanScope {
  readonly span: Span;
  readonly context: SpanContext;
  dispose(): void;
}