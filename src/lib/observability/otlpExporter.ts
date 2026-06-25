/**
 * otlpExporter.ts — HTTP/JSON OTLP exporter for spans + metrics.
 *
 * Posts ended telemetry to an OTLP/HTTP-compatible collector. Implements the
 * `SpanExporter` and `MetricExporter` interfaces from `spanTypes.ts`.
 *
 * Properties:
 *  - Batches spans/metrics into one request per flush
 *  - Retries on transient errors with capped backoff
 *  - Falls back silently (logs once) when the collector is unreachable
 *  - Default-off: nothing fires until an instance is constructed and added
 *    via initTelemetry({ exporters: [...] }) — the construction itself does
 *    no network I/O.
 *
 * OTLP/HTTP JSON encoding (subset):
 *  POST <endpoint>/v1/traces  { "resourceSpans": [...] }
 *  POST <endpoint>/v1/metrics { "resourceMetrics": [...] }
 *  POST <endpoint>/v1/logs    { "resourceLogs": [...] }
 */

import type {
  MetricExporter,
  MetricPoint,
  Resource,
  Span,
  SpanExporter,
} from "./spanTypes";

/** Knobs controlling transport + retry. */
export interface OtlpExporterOptions {
  endpoint: string;
  headers?: Record<string, string>;
  timeoutMs?: number;
  maxRetries?: number;
  /** Override the global fetch (test seams). */
  fetchImpl?: typeof fetch;
}

/** Default request timeout — kept short to avoid stalling the tracer queue. */
const DEFAULT_TIMEOUT_MS = 5_000;

/** Cap retries so a flapping collector can't pin the queue forever. */
const DEFAULT_MAX_RETRIES = 2;

/** Exponential backoff base, in milliseconds. */
const BACKOFF_BASE_MS = 200;

/** Build the full URL for a signal (e.g. /v1/traces) from a base endpoint. */
function buildUrl(endpoint: string, signal: "traces" | "metrics" | "logs"): string {
  const trimmed = endpoint.replace(/\/+$/, "");
  // If the caller already includes the signal path, do not double-append.
  if (/(v1\/(traces|metrics|logs))$/.test(trimmed)) return trimmed;
  return `${trimmed}/v1/${signal}`;
}

/** Sleep for `ms` milliseconds — used for retry backoff. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Encode a single span into the OTLP/JSON shape (subset of fields). */
function encodeSpan(span: Span): Record<string, unknown> {
  const status = span.getStatus();
  const events = span.getEvents().map((event) => ({
    timeUnixNano: String(event.timestampMs * 1_000_000),
    name: event.name,
    attributes: encodeAttributes(event.attributes ?? {}),
  }));

  return {
    traceId: span.context.traceId,
    spanId: span.context.spanId,
    parentSpanId: span.context.parentSpanId ?? undefined,
    name: span.name,
    kind: 1, // INTERNAL — single-value kind covers our proxy usage
    startTimeUnixNano: String(span.startedAtMs * 1_000_000),
    endTimeUnixNano: String((span.startedAtMs + (span.getDurationMs() || 0)) * 1_000_000),
    attributes: encodeAttributes(span.getAttributes()),
    events,
    status: {
      code: status.status === "OK" ? 1 : status.status === "ERROR" ? 2 : 0,
      message: status.errorMessage ?? "",
    },
  };
}

function encodeAttributes(
  attributes: Record<string, unknown>
): Array<{ key: string; value: { stringValue?: string; intValue?: string; doubleValue?: number; boolValue?: boolean } }> {
  const out: Array<{
    key: string;
    value: { stringValue?: string; intValue?: string; doubleValue?: number; boolValue?: boolean };
  }> = [];
  for (const [key, raw] of Object.entries(attributes)) {
    if (raw === undefined || raw === null) continue;
    if (typeof raw === "string") {
      out.push({ key, value: { stringValue: raw } });
    } else if (typeof raw === "number") {
      if (Number.isInteger(raw)) out.push({ key, value: { intValue: String(raw) } });
      else out.push({ key, value: { doubleValue: raw } });
    } else if (typeof raw === "boolean") {
      out.push({ key, value: { boolValue: raw } });
    } else if (Array.isArray(raw)) {
      // Coerce array members to strings — OTLP allows only primitive element types.
      out.push({ key, value: { stringValue: raw.map((v) => String(v)).join(",") } });
    } else {
      out.push({ key, value: { stringValue: JSON.stringify(raw) } });
    }
  }
  return out;
}

/**
 * SpanExporter that posts to an OTLP/HTTP collector.
 *
 * Construction does NOT start any network activity. The first call to
 * `exportSpan` triggers a request (batched per `flush()` invocation).
 */
export class OtlpHttpSpanExporter implements SpanExporter {
  readonly name = "otlp-http-span";
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly fetchImpl: typeof fetch;
  private buffer: Span[] = [];

  constructor(options: OtlpExporterOptions) {
    this.endpoint = options.endpoint;
    this.headers = options.headers ?? {};
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
  }

  exportSpan(span: Span): boolean {
    if (span.isEnded()) {
      this.buffer.push(span);
      return true;
    }
    return false;
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;
    const drained = this.buffer;
    this.buffer = [];
    const url = buildUrl(this.endpoint, "traces");
    const body = JSON.stringify({
      resourceSpans: [
        {
          resource: { attributes: [] }, // filled by the tracer wrapper
          scopeSpans: [
            {
              scope: { name: "omniroute.observability", version: "0.0.0" },
              spans: drained.map(encodeSpan),
            },
          ],
        },
      ],
    });
    await this.postWithRetry(url, body);
  }

  async shutdown(): Promise<void> {
    await this.flush();
  }

  /** Internal helper — shared retry/backoff for trace/metric/log posts. */
  private async postWithRetry(url: string, body: string): Promise<void> {
    let attempt = 0;
    let lastErr: unknown = null;
    while (attempt <= this.maxRetries) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeoutMs);
        const res = await this.fetchImpl(url, {
          method: "POST",
          headers: { "content-type": "application/json", ...this.headers },
          body,
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (res.ok) return;
        if (res.status >= 500 || res.status === 429) {
          lastErr = new Error(`otlp http ${res.status}`);
        } else {
          // Non-retryable client error — drop batch and move on.
          return;
        }
      } catch (err) {
        lastErr = err;
      }
      attempt += 1;
      if (attempt > this.maxRetries) break;
      await delay(BACKOFF_BASE_MS * 2 ** (attempt - 1));
    }
    // Final failure: log once. We deliberately do NOT throw — telemetry is
    // best-effort, and a failing exporter must never propagate to callers.
    if (lastErr !== null) {
      const message = lastErr instanceof Error ? lastErr.message : String(lastErr);
      // Use warn level so it surfaces in logs without paging on-call.
      try {
        // eslint-disable-next-line no-console
        console.warn(`[otlp] exporter failed for ${url}: ${message}`);
      } catch {
        // ignore (some hosts strip console.warn)
      }
    }
  }
}

/**
 * MetricExporter that posts to an OTLP/HTTP collector.
 *
 * Counter/Histogram/Gauge types (see `metrics.ts`) translate their points to
 * OTLP numberDataPoint records. The exporter buffers and flushes similarly to
 * the span exporter.
 */
export class OtlpHttpMetricExporter implements MetricExporter {
  readonly name = "otlp-http-metric";
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly fetchImpl: typeof fetch;
  private buffer: MetricPoint[] = [];

  constructor(options: OtlpExporterOptions) {
    this.endpoint = options.endpoint;
    this.headers = options.headers ?? {};
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
  }

  exportPoint(point: MetricPoint): void {
    this.buffer.push(point);
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;
    const drained = this.buffer;
    this.buffer = [];
    const url = buildUrl(this.endpoint, "metrics");
    const body = JSON.stringify({
      resourceMetrics: [
        {
          resource: { attributes: [] },
          scopeMetrics: [
            {
              scope: { name: "omniroute.observability", version: "0.0.0" },
              metrics: drained.map((p) => ({
                name: p.name,
                sum: {
                  dataPoints: [
                    {
                      timeUnixNano: String(p.timestampMs * 1_000_000),
                      asDouble: p.value,
                      attributes: encodeAttributes(p.attributes ?? {}),
                    },
                  ],
                  aggregationTemporality: 1,
                  isMonotonic: true,
                },
              })),
            },
          ],
        },
      ],
    });
    await this.postWithRetry(url, body);
  }

  async shutdown(): Promise<void> {
    await this.flush();
  }

  private async postWithRetry(url: string, body: string): Promise<void> {
    let attempt = 0;
    let lastErr: unknown = null;
    while (attempt <= this.maxRetries) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeoutMs);
        const res = await this.fetchImpl(url, {
          method: "POST",
          headers: { "content-type": "application/json", ...this.headers },
          body,
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (res.ok) return;
        if (res.status >= 500 || res.status === 429) {
          lastErr = new Error(`otlp http ${res.status}`);
        } else {
          return;
        }
      } catch (err) {
        lastErr = err;
      }
      attempt += 1;
      if (attempt > this.maxRetries) break;
      await delay(BACKOFF_BASE_MS * 2 ** (attempt - 1));
    }
    if (lastErr !== null) {
      const message = lastErr instanceof Error ? lastErr.message : String(lastErr);
      try {
        // eslint-disable-next-line no-console
        console.warn(`[otlp] metric exporter failed for ${url}: ${message}`);
      } catch {
        // ignore
      }
    }
  }
}

/**
 * Test seam: encode a span using the internal helper so tests can assert on
 * the OTLP/JSON shape without spinning up an exporter.
 */
export function _encodeSpanForTesting(span: Span): Record<string, unknown> {
  return encodeSpan(span);
}