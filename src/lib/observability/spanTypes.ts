/**
 * Span types — minimal subset of OpenTelemetry compatible with OTLP/JSON.
 *
 * We do NOT pull `@opentelemetry/api` because:
 *  1. The 160+ provider executors already pass plain objects around; importing
 *     a full OTel API would require explicit context propagation through every
 *     call site (a multi-PR refactor in its own right — see PR-002).
 *  2. The Edge runtime used by `src/proxy.ts` cannot import
 *     `@opentelemetry/sdk-node`; keeping the type layer dep-free means the
 *     same types compile in both runtimes.
 *  3. The OTLP exporter (PR-001) emits JSON over `fetch` — same wire format as
 *     `@opentelemetry/exporter-trace-otlp-http`, so any downstream collector
 *     (Tempo, Jaeger, Honeycomb, SigNoz) consumes it without changes.
 *
 * Field names follow OTel semantic conventions where applicable.
 *
 * @see https://opentelemetry.io/docs/specs/otel/protocol/exporter/
 */

/** Allowed value types for span attributes. Mirrors OTel's `AttributeValue`. */
export type AttributeValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | AttributeValue[]
  | { [key: string]: AttributeValue };

/** Back-compat alias used by the metrics module. */
export type SpanAttributeValue = AttributeValue;

/** Span kinds per OTel spec. We only emit the four the proxy needs. */
export type SpanKind = "SERVER" | "CLIENT" | "INTERNAL" | "PRODUCER";

/** Span status per OTel spec. */
export type SpanStatus =
  | { code: "UNSET" }
  | { code: "OK" }
  | { code: "ERROR"; message?: string };

/**
 * Trace + span identifiers. We always use 16-byte hex (32 chars) for trace IDs
 * and 8-byte hex (16 chars) for span IDs to match OTLP wire format.
 */
export interface SpanContext {
  traceId: string;
  spanId: string;
  /** W3C `traceparent` flags — `01` = sampled. */
  traceFlags: "00" | "01";
}

/**
 * A single finished span ready for export. The exporter in
 * {@link buildOtlpHttpExporter} converts this into the
 * `ExportTraceServiceRequest` JSON shape.
 */
export interface Span {
  name: string;
  kind: SpanKind;
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  startTimeUnixNano: bigint;
  endTimeUnixNano: bigint;
  attributes: Record<string, AttributeValue>;
  status: SpanStatus;
  /** Optional structured events (log records attached to the span). */
  events?: Array<{
    name: string;
    timeUnixNano: bigint;
    attributes?: Record<string, AttributeValue>;
  }>;
  /** Optional resource the span was emitted from. */
  resource?: Record<string, AttributeValue>;
}

/**
 * Tracer interface — minimal surface area to keep call-sites readable.
 * The full OpenTelemetry Tracer has 20+ methods; we need four.
 */
export interface Tracer {
  /** Start a new root span. Caller is responsible for calling `end()`. */
  startSpan(name: string, opts?: { kind?: SpanKind; attributes?: Record<string, AttributeValue> }): Span;
  /** Wrap an async function in a span; ends on resolve/reject. */
  withSpan<T>(name: string, fn: (span: Span) => Promise<T>, opts?: { kind?: SpanKind; attributes?: Record<string, AttributeValue> }): Promise<T>;
}
