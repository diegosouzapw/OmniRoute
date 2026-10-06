/**
 * Optional OpenTelemetry / GenAI observability sink.
 *
 * A `RoutingEventSink` that forwards routing events to an OTLP/HTTP collector as
 * GenAI semantic-convention spans (semconvgenai: `gen_ai.provider.name`,
 * `gen_ai.request.model`, `gen_ai.operation.name`, `gen_ai.usage.input_tokens`,
 * `gen_ai.usage.output_tokens`, etc.).
 *
 * Deliberately lightweight:
 *  - No `@opentelemetry/*` SDK dependency. Uses the collector's OTLP/HTTP JSON
 *    (traces) endpoint via global `fetch`, which is already available and async.
 *  - `record()` only enqueues into a bounded buffer (O(1), never I/O). A single
 *    background flush timer drains the buffer asynchronously. Under overload the
 *    oldest events are dropped (never backpressure the data plane).
 *  - Disabled unless `OMNIROUTE_OTEL_ENDPOINT` (or `OTEL_EXPORTER_OTLP_ENDPOINT`)
 *    is set — normal lightweight deployments run with zero OTel code executing.
 *  - No secrets/prompts are ever serialized; only RoutingEvent metadata.
 */

export interface OtlpHttpsExporterConfig {
  /** Collector base URL, e.g. https://collector:4318 — spans go to /v1/traces. */
  endpoint: string;
  /** Export batch size / flush interval. */
  maxBatchSize?: number;
  flushIntervalMs?: number;
  serviceName?: string;
}

/** Resolve whether OTLP export is configured. */
export function isRoutingOtelEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const endpoint = (env.OMNIROUTE_OTEL_ENDPOINT ?? env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "").trim();
  return endpoint.length > 0;
}

interface OtelSpan {
  traceId: string;
  spanId: string;
  name: string;
  kind: number;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: Array<{
    key: string;
    value: { stringValue?: string; intValue?: string; doubleValue?: number };
  }>;
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function randomId(bytes: number): string {
  const arr = new Uint8Array(bytes);
  // Use crypto.getRandomValues when available (Node ≥ 19 global), else Math.random.
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < bytes; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return toHex(arr);
}

export class OtlpHttpsEventSink {
  readonly name = "otel";
  private readonly endpoint: string;
  private readonly maxBatchSize: number;
  private readonly serviceName: string;
  private buffer: RoutingEventLike[] = [];
  private dropped = 0;
  private consecutiveFailures = 0;
  private flushedBatches = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private flushing = false;

  constructor(private readonly config: OtlpHttpsExporterConfig) {
    this.endpoint = config.endpoint.replace(/\/+$/, "") + "/v1/traces";
    this.maxBatchSize = config.maxBatchSize ?? 64;
    this.serviceName = config.serviceName ?? "omniroute";
    this.start();
  }

  /** O(1) enqueue; drops oldest when the buffer is full. Never performs I/O. */
  record(event: RoutingEventLike): void {
    if (this.buffer.length >= this.maxBatchSize * 4) {
      this.buffer.shift();
      this.dropped += 1;
    }
    this.buffer.push(event);
  }

  getStats(): {
    buffered: number;
    dropped: number;
    consecutiveFailures: number;
    flushedBatches: number;
  } {
    return {
      buffered: this.buffer.length,
      dropped: this.dropped,
      consecutiveFailures: this.consecutiveFailures,
      flushedBatches: this.flushedBatches,
    };
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    void this.flush();
  }

  private start(): void {
    const intervalMs = this.config.flushIntervalMs ?? 10_000;
    this.timer = setInterval(() => void this.flush(), intervalMs);
    // Do not keep the process alive just for telemetry.
    this.timer.unref?.();
  }

  private async flush(): Promise<void> {
    if (this.flushing) return;
    if (this.buffer.length === 0) return;
    this.flushing = true;
    const batch = this.buffer.splice(0, this.maxBatchSize);
    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildOtlpTracesPayload(batch, this.serviceName)),
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) throw new Error(`OTLP collector returned ${res.status}`);
      this.consecutiveFailures = 0;
      this.flushedBatches += 1;
    } catch {
      // Telemetry delivery is best-effort. Re-buffer for a retry, but stop after
      // MAX_CONSECUTIVE_FAILURES so a permanently-unavailable collector cannot
      // grow the buffer without bound. The dropped counter reflects the loss.
      this.consecutiveFailures += 1;
      if (this.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        this.dropped += batch.length;
      } else {
        this.buffer.unshift(...batch);
      }
    } finally {
      this.flushing = false;
    }
  }
}

/** Drop a batch (and count it) after this many consecutive collector failures. */
const MAX_CONSECUTIVE_FAILURES = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RoutingEventLike = any;

/**
 * Build an OTLP/HTTP traces JSON payload with one span per routing event,
 * mapped to GenAI semantic conventions.
 */
export function buildOtlpTracesPayload(events: RoutingEventLike[], serviceName: string): unknown {
  const resourceSpans = [
    {
      resource: {
        attributes: [
          { key: "service.name", value: { stringValue: serviceName } },
          { key: "telemetry.sdk.name", value: { stringValue: "omniroute-routing" } },
        ],
      },
      scopeSpans: [
        {
          scope: { name: "omniroute.routing" },
          spans: events.map(toSpan),
        },
      ],
    },
  ];
  return { resourceSpans };
}

function attr(
  key: string,
  value: string | number
): { key: string; value: { stringValue?: string; intValue?: string; doubleValue?: number } } {
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { key, value: { intValue: String(value) } }
      : { key, value: { doubleValue: value } };
  }
  return { key, value: { stringValue: String(value) } };
}

function toSpan(event: RoutingEventLike): OtelSpan {
  const traceId = randomId(16);
  const spanId = randomId(8);
  const startNs = BigInt(event.ts) * 1_000_000n;
  const endNs = startNs + BigInt(Math.max(0, event.latencyMs || 0)) * 1_000_000n;
  const attributes = [
    attr("gen_ai.provider.name", event.provider),
    attr("gen_ai.request.model", event.model),
    attr("gen_ai.operation.name", "chat"),
    attr("gen_ai.system", event.strategy || "direct"),
    attr("gen_ai.usage.input_tokens", event.inputTokens ?? 0),
    attr("gen_ai.usage.output_tokens", event.outputTokens ?? 0),
    attr("gen_ai.completion.finish_reason", event.finishReason ?? "unknown"),
    attr("gen_ai.request.temperature", 0),
    attr("omniroute.routing.outcome", event.outcome),
    attr("omniroute.routing.status", event.status ?? 0),
    attr("omniroute.routing.ttft_ms", event.ttftMs ?? -1),
    attr("omniroute.routing.itl_ms", event.itlMs ?? -1),
    attr("omniroute.routing.retries", event.retries ?? 0),
    attr("omniroute.routing.fallback_used", event.fallbackUsed ? 1 : 0),
    attr("gen_ai.client.token.usage.input_tokens", event.inputTokens ?? 0),
    attr("gen_ai.client.token.usage.output_tokens", event.outputTokens ?? 0),
  ];
  if (event.connectionId) attributes.push(attr("omniroute.connection_id", event.connectionId));

  return {
    traceId,
    spanId,
    name: `chat ${event.provider}/${event.model}`,
    kind: 3, // CLIENT
    startTimeUnixNano: startNs.toString(),
    endTimeUnixNano: endNs.toString(),
    attributes,
  };
}
