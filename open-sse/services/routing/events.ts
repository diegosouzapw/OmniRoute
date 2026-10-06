/**
 * Routing Events — first-class representation of routing outcomes.
 *
 * Every request that reaches a provider emits one `RoutingEvent` describing what
 * happened: which provider/model was used, under which strategy, with what
 * latency/tokens/cost, and whether the outcome was a success, an error, a
 * malformed response, a timeout, a rate-limit, or a blocked request.
 *
 * This is the "feedback foundation": the event is cheap to produce (no I/O in
 * the emitting call) and is fanned out synchronously to registered sinks, each
 * of which must be O(1)-ish and must never perform synchronous I/O. Sinks can
 * then do whatever they need asynchronously — buffer to an OTLP exporter,
 * update in-memory quality statistics, keep a bounded ring buffer for
 * explainability, etc.
 *
 * DESIGN NOTE (adapted from the Future-AGI-inspired mission, kept deliberately
 * lean): the original proposal was a Rust `RoutingEvent` struct + a
 * `RoutingEventSink` trait. This module is the TypeScript equivalent, sized to
 * the existing codebase: we already persist rich per-request detail in
 * `call_logs` (async) and keep per-combo counters in `comboMetrics.ts`. This
 * module adds the *typed, structured, sink-based* outcome channel those systems
 * lacked, without duplicating either of them.
 *
 * SAFETY CONTRACT: an event carries ONLY routing metadata — provider, model,
 * strategy, timing, token/cost numbers, an allowlisted outcome, finish reason,
 * HTTP status, connection id. Never prompts, request/response bodies, headers,
 * credentials, or account ids.
 */

/**
 * Allowlisted routing outcomes. Keeping this an enum-like union prevents freeform
 * strings from leaking into telemetry/quality logic and keeps sinks exhaustive.
 */
export const ROUTING_OUTCOMES = [
  "success",
  "error",
  "malformed",
  "timeout",
  "rate_limited",
  "stream_interrupted",
  "guardrail_blocked",
  "cancelled",
] as const;

export type RoutingOutcome = (typeof ROUTING_OUTCOMES)[number];

export interface RoutingEvent {
  /** Correlation/request id — never a prompt or body. */
  requestId: string;
  provider: string;
  model: string;
  /** Combo strategy (e.g. "auto") or "direct" when not routed through a combo. */
  strategy: string;
  latencyMs: number;
  /**
   * Time-to-first-forwarded-SSE-chunk in ms (NOT token-level TTFT), or null
   * for non-streaming requests / when nothing was forwarded.
   */
  ttftMs: number | null;
  /**
   * Mean inter-chunk gap in ms — a chunk-latency proxy for inter-token latency,
   * only meaningful for streaming requests. Null otherwise.
   */
  itlMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome;
  /** Upstream HTTP status; null when the request never reached a provider. */
  status: number | null;
  /** finish_reason from the provider response (stop / length / tool_calls / ...). */
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}

/** A sink consumes routing events. Implementations must never do sync I/O. */
export interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void;
}

const sinks = new Set<RoutingEventSink>();

/**
 * Register a sink. Returns an unsubscribe function. Registering the same sink
 * instance twice is a no-op (Set semantics).
 */
export function registerRoutingEventSink(sink: RoutingEventSink): () => void {
  sinks.add(sink);
  return () => {
    sinks.delete(sink);
  };
}

/** Test/ops hook: list currently registered sink names. */
export function listRoutingEventSinks(): string[] {
  return Array.from(sinks, (s) => s.name);
}

/** Test/ops hook: remove every registered sink. */
export function clearRoutingEventSinks(): void {
  sinks.clear();
}

/**
 * Emit a routing event to every registered sink. Synchronous and allocation-
 * friendly so callers can invoke it at the end of the request hot path without
 * measurable impact; each sink's `record()` must be cheap (enqueue/buffer only).
 * A throwing sink is isolated so one misbehaving sink cannot break the router.
 */
export function dispatchRoutingEvent(event: RoutingEvent): void {
  for (const sink of sinks) {
    try {
      sink.record(event);
    } catch {
      // Sinks are observability/best-effort — never let one break the data plane.
    }
  }
}

/**
 * Bounded in-memory ring-buffer sink. Holds the most recent N events for
 * explainability/debugging (see GET /api/v1/explain/routing). Insert is O(1);
 * no TTL sweep needed because the buffer is size-bounded by construction.
 */
export class MemoryRoutingEventStore implements RoutingEventSink {
  readonly name = "memory";
  private buffer: RoutingEvent[] = [];
  private cursor = 0;

  constructor(private readonly capacity = 500) {}

  record(event: RoutingEvent): void {
    if (this.buffer.length < this.capacity) {
      this.buffer.push(event);
    } else {
      this.buffer[this.cursor] = event;
    }
    this.cursor = (this.cursor + 1) % this.capacity;
  }

  /** Most recent events, newest first, up to `limit`. */
  recent(limit = 50): RoutingEvent[] {
    if (this.buffer.length < this.capacity) {
      return this.buffer.slice(-limit).reverse();
    }
    // Ring is full — walk backwards from the cursor.
    const out: RoutingEvent[] = [];
    for (let i = 0; i < Math.min(limit, this.buffer.length); i++) {
      const idx = (this.cursor - 1 - i + this.buffer.length) % this.buffer.length;
      out.push(this.buffer[idx]);
    }
    return out;
  }

  clear(): void {
    this.buffer = [];
    this.cursor = 0;
  }

  get size(): number {
    return this.buffer.length;
  }
}

/** Create a well-formed event with defaults for unset observability fields. */
export function createRoutingEvent(input: {
  requestId: string;
  provider: string;
  model: string;
  strategy?: string | null;
  latencyMs: number;
  ttftMs?: number | null;
  itlMs?: number | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
  cost?: number | null;
  retries?: number;
  fallbackUsed?: boolean;
  outcome: RoutingOutcome;
  status?: number | null;
  finishReason?: string | null;
  connectionId?: string | null;
  ts?: number;
}): RoutingEvent {
  return {
    requestId: input.requestId,
    provider: input.provider || "unknown",
    model: input.model || "unknown",
    strategy: input.strategy ?? "direct",
    latencyMs: Math.max(0, input.latencyMs || 0),
    ttftMs: input.ttftMs ?? null,
    itlMs: input.itlMs ?? null,
    inputTokens: input.inputTokens ?? null,
    outputTokens: input.outputTokens ?? null,
    cost: input.cost ?? null,
    retries: input.retries ?? 0,
    fallbackUsed: input.fallbackUsed ?? false,
    outcome: input.outcome,
    status: input.status ?? null,
    finishReason: input.finishReason ?? null,
    connectionId: input.connectionId ?? null,
    ts: input.ts ?? Date.now(),
  };
}

/**
 * Classify an upstream HTTP status into a RoutingOutcome. Status 200/201 → success;
 * 429 → rate_limited; 408/504 → timeout; 4xx/5xx → error; anything else → error.
 */
export function outcomeFromStatus(status: number | null | undefined): RoutingOutcome {
  if (status == null) return "error";
  if (status === 200 || status === 201) return "success";
  if (status === 429) return "rate_limited";
  if (status === 408 || status === 504) return "timeout";
  return "error";
}
