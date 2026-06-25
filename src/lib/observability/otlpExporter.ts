/**
 * OTLP/HTTP exporter for trace spans.
 *
 * Implements the OTLP/HTTP JSON encoding per the OTel protocol spec.
 * Specifically, sends `ExportTraceServiceRequest` to
 * `${endpoint}/v1/traces` (or `${endpoint}` if it already ends with `/v1/traces`).
 *
 * We intentionally do NOT implement OTLP/gRPC in PR-001 — that would require
 * the `@grpc/grpc-js` dep (PR-002 candidate, not PR-001).
 *
 * @see https://opentelemetry.io/docs/specs/otlp/#otlphttp-default-port-4318
 * @see https://opentelemetry.io/docs/specs/otel/protocol/exporter/
 */

import type { AttributeValue, Span } from "./spanTypes";

/** Configuration for {@link buildOtlpHttpExporter}. */
export interface OtlpExporterConfig {
  /** Base URL of the OTLP/HTTP collector. Example: `http://localhost:4318`. */
  endpoint: string;
  /** Extra HTTP headers (e.g. auth tokens). Applied to every request. */
  headers?: Record<string, string>;
  /** Per-request timeout. Default 10 000 ms. */
  timeoutMs?: number;
  /** Override the path appended to `endpoint`. Default `${endpoint}/v1/traces`. */
  path?: string;
}

/** OTLP/HTTP trace path constant, exported for tests + cross-PR reuse. */
export const OTLP_HTTP_TRACE_PATH = "/v1/traces";

/** OTLP/gRPC trace path constant — kept here so future PRs have a single import. */
export const OTLP_GRPC_TRACE_PATH = "/opentelemetry.proto.collector.trace.v1.TraceService/Export";

/** Exporter shape returned by {@link buildOtlpHttpExporter}. */
export interface OtlpExporter {
  /** Send a batch of finished spans to the collector. */
  export(spans: Span[]): Promise<void>;
  /** Flush any pending HTTP body. Currently a no-op (we send per batch). */
  shutdown(): Promise<void>;
}

/** Build an OTLP/HTTP exporter that POSTs JSON to the collector. */
export function buildOtlpHttpExporter(cfg: OtlpExporterConfig): OtlpExporter {
  const endpoint = cfg.endpoint.replace(/\/+$/, "");
  const path = cfg.path ?? OTLP_HTTP_TRACE_PATH;
  const url = endpoint + path;
  const headers: Record<string, string> = {
    "content-type": "application/json",
    ...(cfg.headers ?? {}),
  };
  const timeoutMs = cfg.timeoutMs ?? 10_000;

  return {
    async export(spans: Span[]): Promise<void> {
      if (spans.length === 0) return;
      const body = serializeSpansAsOtlpJson(spans);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers,
          body,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(
            `OTLP/HTTP export failed: ${res.status} ${res.statusText} ` +
              `(batch=${spans.length}, endpoint=${endpoint})`
          );
        }
      } finally {
        clearTimeout(timer);
      }
    },
    async shutdown(): Promise<void> {
      // No persistent state; nothing to flush. Future batching may add
      // a queued-bodies drain here.
    },
  };
}

/** Serialize a batch of spans into the OTLP JSON wire format. */
export function serializeSpansAsOtlpJson(spans: Span[]): string {
  // Group spans by resource. OTLP requires all spans in a ResourceSpans to
  // share the same Resource. Different runtimes / services land in separate
  // buckets.
  const buckets = new Map<string, { resource: Record<string, AttributeValue>; spans: Span[] }>();
  for (const span of spans) {
    const key = JSON.stringify(span.resource ?? {});
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { resource: span.resource ?? {}, spans: [] };
      buckets.set(key, bucket);
    }
    bucket.spans.push(span);
  }

  const resourceSpans = Array.from(buckets.values()).map((bucket) => ({
    resource: {
      attributes: kvListFromObject(bucket.resource),
    },
    scopeSpans: [
      {
        scope: {
          name: "omniroute-otel",
          version: "1.0.0",
        },
        spans: bucket.spans.map(serializeSpan),
      },
    ],
  }));

  return JSON.stringify({ resourceSpans });
}

/** Serialize one span into OTLP JSON. */
function serializeSpan(span: Span) {
  const out: Record<string, unknown> = {
    traceId: span.traceId,
    spanId: span.spanId,
    name: span.name,
    kind: spanKindToOtlp(span.kind),
    startTimeUnixNano: span.startTimeUnixNano.toString(),
    endTimeUnixNano: span.endTimeUnixNano.toString(),
    attributes: kvListFromObject(span.attributes),
    status: statusToOtlp(span.status),
  };
  if (span.parentSpanId) {
    out.parentSpanId = span.parentSpanId;
  }
  if (span.events && span.events.length > 0) {
    out.events = span.events.map((ev) => ({
      timeUnixNano: ev.timeUnixNano.toString(),
      name: ev.name,
      attributes: ev.attributes ? kvListFromObject(ev.attributes) : [],
    }));
  }
  return out;
}

/** Convert internal SpanKind enum → OTLP integer (matching the protobuf). */
function spanKindToOtlp(kind: Span["kind"]): number {
  switch (kind) {
    case "INTERNAL":
      return 1;
    case "SERVER":
      return 2;
    case "CLIENT":
      return 3;
    case "PRODUCER":
      return 4;
    default:
      return 0;
  }
}

/** Convert internal SpanStatus → OTLP JSON. */
function statusToOtlp(status: Span["status"]): { code: number; message?: string } {
  if (status.code === "OK") return { code: 2 };
  if (status.code === "ERROR") return { code: 1, message: status.message };
  return { code: 0 };
}

/** Convert a flat Record<string, AttributeValue> into OTLP `KeyValue[]`. */
function kvListFromObject(obj: Record<string, AttributeValue>): Array<{ key: string; value: unknown }> {
  const out: Array<{ key: string; value: unknown }> = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    out.push({ key: k, value: anyValue(v) });
  }
  return out;
}

/** Wrap an AttributeValue in the OTLP `AnyValue` envelope. */
function anyValue(v: AttributeValue): unknown {
  if (v === null || v === undefined) return {};
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "number") {
    if (Number.isInteger(v)) return { intValue: v.toString() };
    return { doubleValue: v };
  }
  if (typeof v === "boolean") return { boolValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(anyValue) } };
  if (typeof v === "object") {
    return {
      kvlistValue: {
        values: Object.entries(v as Record<string, AttributeValue>).map(([k, vv]) => ({
          key: k,
          value: anyValue(vv),
        })),
      },
    };
  }
  return { stringValue: String(v) };
}
