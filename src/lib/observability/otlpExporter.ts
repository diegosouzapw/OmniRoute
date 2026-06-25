/**
 * src/lib/observability/otlpExporter.ts
 *
 * Minimal OTLP/HTTP JSON exporter. We don't depend on the official
 * @opentelemetry/exporter-trace-otlp-http package because:
 *  1. It's a heavy dep (pulls in @opentelemetry/core + protobuf runtime);
 *  2. Our Span shape is deliberately simpler than the upstream SDK's,
 *     so the wire payload we emit is shorter and easier to validate.
 *
 * Wire format reference:
 *   https://opentelemetry.io/docs/specs/otlp/#json-protobuf-encoding
 *
 * Endpoints follow the OTel env convention:
 *   - OTEL_EXPORTER_OTLP_ENDPOINT                (default http://localhost:4318)
 *   - OTEL_EXPORTER_OTLP_TRACES_ENDPOINT         (overrides trace path; default <endpoint>/v1/traces)
 *
 * The exporter is BATCHED: callers push spans, then call `flush()` (or the
 * auto-flush timer fires). Each batch is one HTTP POST.
 */

import { getResource } from "./resource";
import type { Span } from "./spanTypes";

export interface OtlpExporterOptions {
  /** Full URL for the traces endpoint (overrides env-derived). */
  endpoint?: string;
  /** Headers to attach to every request (e.g. auth tokens). */
  headers?: Record<string, string>;
  /** Max spans per batch (default 256). */
  batchSize?: number;
  /** Auto-flush interval in ms (default 5000). 0 disables. */
  flushIntervalMs?: number;
  /** Override fetch for tests. */
  fetchImpl?: typeof fetch;
}

interface ResourceJson {
  attributes: Array<{ key: string; value: { stringValue: string } }>;
}

interface SpanJson {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  kind: number;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: Array<{ key: string; value: ValueJson }>;
  events: Array<{ timeUnixNano: string; name: string; attributes: Array<{ key: string; value: ValueJson }> }>;
  status: { code: number; message?: string };
}

type ValueJson =
  | { stringValue: string }
  | { intValue: string }
  | { doubleValue: number }
  | { boolValue: boolean };

const OTLP_KIND: Record<Span["kind"], number> = {
  internal: 1,
  server: 2,
  client: 3,
  producer: 4,
  consumer: 5,
};

const OTLP_STATUS: Record<"unset" | "ok" | "error", number> = {
  unset: 0,
  ok: 1,
  error: 2,
};

function attrValue(v: unknown): ValueJson | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "number") {
    if (Number.isInteger(v)) return { intValue: String(v) };
    return { doubleValue: v };
  }
  if (typeof v === "boolean") return { boolValue: v };
  return { stringValue: String(v) };
}

function spanToJson(s: Span): SpanJson {
  const startNs = BigInt(s.startTime) * 1_000_000n;
  const endNs = BigInt(s.endTime ?? Date.now()) * 1_000_000n;
  const attributes: Array<{ key: string; value: ValueJson }> = [];
  for (const [k, v] of Object.entries(s.attributes)) {
    const av = attrValue(v);
    if (av) attributes.push({ key: k, value: av });
  }
  const events = s.events.map((e) => {
    const evAttrs: Array<{ key: string; value: ValueJson }> = [];
    if (e.attributes) {
      for (const [k, v] of Object.entries(e.attributes)) {
        const av = attrValue(v);
        if (av) evAttrs.push({ key: k, value: av });
      }
    }
    return {
      timeUnixNano: String(BigInt(e.time) * 1_000_000n),
      name: e.name,
      attributes: evAttrs,
    };
  });
  return {
    traceId: s.context.traceId,
    spanId: s.context.spanId,
    parentSpanId: s.parentSpanId,
    name: s.name,
    kind: OTLP_KIND[s.kind],
    startTimeUnixNano: String(startNs),
    endTimeUnixNano: String(endNs),
    attributes,
    events,
    status: { code: OTLP_STATUS[s.status.code], message: s.status.message },
  };
}

function resourceToJson(): ResourceJson {
  const r = getResource();
  return {
    attributes: Object.entries(r.attributes).map(([key, value]) => ({
      key,
      value: { stringValue: value },
    })),
  };
}

export class OtlpHttpExporter {
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;
  private readonly batchSize: number;
  private readonly fetchImpl: typeof fetch;
  private buffer: Span[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(opts: OtlpExporterOptions = {}) {
    const base =
      opts.endpoint ??
      process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ??
      `${(process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318").replace(/\/$/, "")}/v1/traces`;
    this.endpoint = base;
    this.headers = opts.headers ?? parseOtlpHeaders();
    this.batchSize = opts.batchSize ?? 256;
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch.bind(globalThis);
    const interval = opts.flushIntervalMs ?? 5000;
    if (interval > 0 && typeof setInterval === "function") {
      this.timer = setInterval(() => {
        void this.flush().catch(() => {
          /* swallow — exporter errors must not crash the host process */
        });
      }, interval);
      // Don't keep the process alive solely for telemetry flushing.
      if (typeof (this.timer as { unref?: () => void }).unref === "function") {
        (this.timer as { unref?: () => void }).unref?.();
      }
    }
  }

  /** Append spans to the buffer; auto-flushes when batchSize is reached. */
  push(spans: Span[]): void {
    if (!spans.length) return;
    for (const s of spans) this.buffer.push(s);
    if (this.buffer.length >= this.batchSize) {
      void this.flush().catch(() => undefined);
    }
  }

  /** Drain the buffer and POST one batch. Errors are swallowed. */
  async flush(): Promise<void> {
    if (!this.buffer.length) return;
    const batch = this.buffer.splice(0, this.buffer.length);
    const body = {
      resourceSpans: [
        {
          resource: resourceToJson(),
          scopeSpans: [
            {
              scope: { name: "omniroute-observability", version: "1.0.0" },
              spans: batch.map(spanToJson),
            },
          ],
        },
      ],
    };
    try {
      await this.fetchImpl(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...this.headers },
        body: JSON.stringify(body),
      });
    } catch {
      // Drop the batch on transport failure — best-effort delivery only.
    }
  }

  /** Stop the auto-flush timer and drain. */
  async shutdown(): Promise<void> {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    await this.flush();
  }

  /** Endpoint this exporter is writing to (for diagnostics). */
  getEndpoint(): string {
    return this.endpoint;
  }
}

function parseOtlpHeaders(): Record<string, string> {
  const raw = process.env.OTEL_EXPORTER_OTLP_HEADERS;
  if (!raw) return {};
  const out: Record<string, string> = {};
  for (const pair of raw.split(",")) {
    const eq = pair.indexOf("=");
    if (eq <= 0) continue;
    out[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
  }
  return out;
}

/** Build a sink function that pushes into the given exporter — useful for otel.ts wiring. */
export function exporterSink(exporter: OtlpHttpExporter): (spans: Span[]) => void | Promise<void> {
  return (spans) => exporter.push(spans);
}