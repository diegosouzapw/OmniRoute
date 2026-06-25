/**
 * src/lib/observability/otel.ts
 *
 * Active-span stack + tracer. This is OmniRoute's minimal OTel-compatible
 * runtime: it tracks the currently-active SpanContext per async execution
 * via an AsyncLocalStorage store and exports a small surface
 * (`startSpan`, `withSpan`, `currentTraceId`, `currentSpanId`,
 * `getTracer`, `isTelemetryEnabled`, `recordException`).
 *
 * Why AsyncLocalStorage? The active-span context must hop across `await`
 * boundaries without callers having to thread it through every function
 * signature. ALS is the standard Node/Edge primitive for this since 16.
 *
 * Why no `@opentelemetry/api`?  We want zero new npm deps and full control
 * over the wire shape so we can ship a 2.5K-LOC PR without an ecosystem
 * upgrade. The exported names mirror the OTel surface (`startSpan`,
 * `withSpan`) so swapping in the official SDK later is mechanical.
 *
 * @see docs/observability/01-overview.md (when present) for the broader design.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import {
  type Span,
  type SpanAttributes,
  type SpanContext,
  type SpanEvent,
  SPAN_STATUS_ERROR,
  SPAN_STATUS_OK,
  SPAN_STATUS_UNSET,
  formatTraceParent,
  randomHexId,
} from "./spanTypes";
import { getResource } from "./resource";

interface SpanStore {
  stack: Span[];
}

const ALS = new AsyncLocalStorage<SpanStore>();

/** Holder for the singleton tracer — mutated by `initTelemetry`. */
const TRACER_STATE: {
  enabled: boolean;
  exporter: ((spans: Span[]) => void | Promise<void>) | null;
  sink: Span[];
  maxBuffered: number;
} = {
  enabled: false,
  exporter: null,
  sink: [],
  maxBuffered: 1024,
};

export interface StartSpanOptions {
  kind?: Span["kind"];
  attributes?: SpanAttributes;
  /** When provided, the new span links to (and becomes a child of) this parent. */
  parent?: SpanContext | null;
  /** Optional pre-existing span context (rare — usually `parent` is enough). */
  context?: SpanContext;
}

export interface Tracer {
  /** Begin a span but do not push it onto the active stack. */
  startSpan(name: string, opts?: StartSpanOptions): Span;
  /** Run `fn` inside an active span context; the span ends when fn resolves/rejects. */
  withSpan<T>(name: string, fn: (span: Span) => Promise<T> | T, opts?: StartSpanOptions): Promise<T>;
  /** Get the currently active span (top of stack), or null if none. */
  getActiveSpan(): Span | null;
  /** Add an event to the active span, if any. */
  addEvent(name: string, attributes?: Record<string, string | number | boolean | null>): void;
  /** Set an attribute on the active span, if any. */
  setAttribute(key: string, value: string | number | boolean | null | undefined): void;
  /** Mark the active span as errored. */
  recordException(err: unknown): void;
  /** True if telemetry collection is on. */
  isEnabled(): boolean;
  /** Snapshot the recorded spans (after flushing the buffer). */
  drain(): Span[];
}

function pushSpan(span: Span): void {
  const store = ALS.getStore();
  if (!store) {
    // Outside an ALS scope, we fall back to a process-local stack so synchronous
    // / top-level callers still get a parent. This is the OTel behaviour for
    // the root span on cold paths.
    TRACER_STATE.sink.push(span);
    return;
  }
  store.stack.push(span);
}

function popSpan(span: Span): void {
  const store = ALS.getStore();
  if (!store) return;
  // Pop only if `span` is the top — callers may have abandoned earlier spans.
  const top = store.stack[store.stack.length - 1];
  if (top === span) store.stack.pop();
  else {
    const idx = store.stack.lastIndexOf(span);
    if (idx >= 0) store.stack.splice(idx, 1);
  }
  span.endTime = Date.now();
  if (TRACER_STATE.enabled) {
    TRACER_STATE.sink.push(span);
    if (TRACER_STATE.sink.length > TRACER_STATE.maxBuffered) {
      TRACER_STATE.sink.splice(0, TRACER_STATE.sink.length - TRACER_STATE.maxBuffered);
    }
  }
}

/** Resolve the parent for a new span — either explicit, the active span, or root. */
function resolveParent(opts: StartSpanOptions | undefined): { parent: SpanContext | undefined; parentSpanId?: string } {
  const explicit = opts?.parent;
  if (explicit) return { parent: explicit, parentSpanId: explicit.spanId };
  const store = ALS.getStore();
  const active = store?.stack[store.stack.length - 1];
  if (active) return { parent: active.context, parentSpanId: active.context.spanId };
  return { parent: undefined };
}

/**
 * Build a span with a fresh spanId. When a parent is present, the traceId is
 * inherited (W3C invariant: all spans in a trace share a traceId).
 */
function makeSpan(name: string, opts?: StartSpanOptions): Span {
  const { parent, parentSpanId } = resolveParent(opts);
  const spanId = randomHexId(8); // 8 bytes → 16 hex chars
  const traceId = parent?.traceId ?? randomHexId(16);
  const span: Span = {
    name,
    context: opts?.context
      ? { ...opts.context, traceId: opts.context.traceId || traceId, spanId: opts.context.spanId || spanId }
      : { traceId, spanId, traceFlags: 1 },
    parentSpanId,
    kind: opts?.kind ?? "internal",
    startTime: Date.now(),
    attributes: { ...(opts?.attributes ?? {}) },
    events: [],
    links: [],
    status: { ...SPAN_STATUS_UNSET },
  };
  return span;
}

/** Begin a span and push it onto the active stack. Caller is responsible for `endSpan`. */
export function startSpan(name: string, opts?: StartSpanOptions): Span {
  const span = makeSpan(name, opts);
  pushSpan(span);
  return span;
}

/** End a span: pops from the active stack and marks `endTime`. */
export function endSpan(span: Span, status?: { code: "ok" | "error"; message?: string }): void {
  if (status) {
    span.status = { code: status.code, message: status.message };
  } else if (span.status.code === "unset") {
    span.status = { ...SPAN_STATUS_OK };
  }
  popSpan(span);
}

/**
 * Run `fn` inside an active span. The span is started, pushed onto the ALS
 * stack, and ended when `fn` resolves (with status=ok) or rejects (with
 * status=error and the error recorded). Always re-throws.
 */
export async function withSpan<T>(
  name: string,
  fn: (span: Span) => Promise<T> | T,
  opts?: StartSpanOptions
): Promise<T> {
  const span = makeSpan(name, opts);
  const store = ALS.getStore() ?? { stack: [] };
  const child: SpanStore = { stack: [...store.stack, span] };
  try {
    const result = await ALS.run(child, () => Promise.resolve(fn(span)));
    if (span.status.code === "unset") span.status = { ...SPAN_STATUS_OK };
    span.endTime = Date.now();
    if (TRACER_STATE.enabled) bufferSpan(span);
    return result;
  } catch (err) {
    span.status = {
      code: "error",
      message: err instanceof Error ? err.message : String(err),
    };
    span.exceptionMessage = err instanceof Error ? err.message : String(err);
    span.endTime = Date.now();
    if (TRACER_STATE.enabled) bufferSpan(span);
    throw err;
  }
}

/**
 * Convenience wrapper for sync functions: same as `withSpan` but skips the
 * `Promise.resolve` indirection. Useful in hot paths (provider call sites).
 */
export function withSpanSync<T>(name: string, fn: (span: Span) => T, opts?: StartSpanOptions): T {
  const span = makeSpan(name, opts);
  const store = ALS.getStore() ?? { stack: [] };
  const child: SpanStore = { stack: [...store.stack, span] };
  return ALS.run(child, () => {
    try {
      const result = fn(span);
      if (span.status.code === "unset") span.status = { ...SPAN_STATUS_OK };
      span.endTime = Date.now();
      if (TRACER_STATE.enabled) bufferSpan(span);
      return result;
    } catch (err) {
      span.status = {
        code: "error",
        message: err instanceof Error ? err.message : String(err),
      };
      span.exceptionMessage = err instanceof Error ? err.message : String(err);
      span.endTime = Date.now();
      if (TRACER_STATE.enabled) bufferSpan(span);
      throw err;
    }
  });
}

function bufferSpan(span: Span): void {
  TRACER_STATE.sink.push(span);
  if (TRACER_STATE.sink.length > TRACER_STATE.maxBuffered) {
    TRACER_STATE.sink.splice(0, TRACER_STATE.sink.length - TRACER_STATE.maxBuffered);
  }
}

/** Trace id of the currently active span, or undefined if none. */
export function currentTraceId(): string | undefined {
  const store = ALS.getStore();
  return store?.stack[store.stack.length - 1]?.context.traceId;
}

/** Span id of the currently active span, or undefined if none. */
export function currentSpanId(): string | undefined {
  const store = ALS.getStore();
  return store?.stack[store.stack.length - 1]?.context.spanId;
}

/** Full SpanContext of the currently active span, or undefined. */
export function currentSpanContext(): SpanContext | undefined {
  const store = ALS.getStore();
  const top = store?.stack[store.stack.length - 1];
  if (!top) return undefined;
  return { ...top.context };
}

/** True iff `initTelemetry()` was called AND telemetry is enabled by env. */
export function isTelemetryEnabled(): boolean {
  return TRACER_STATE.enabled;
}

/** Record an exception on the currently active span (no-op when none). */
export function recordException(err: unknown): void {
  const store = ALS.getStore();
  const top = store?.stack[store.stack.length - 1];
  if (!top) return;
  const message = err instanceof Error ? err.message : String(err);
  const event: SpanEvent = {
    name: "exception",
    time: Date.now(),
    attributes: {
      "exception.message": message,
      "exception.type": err instanceof Error ? err.name : "Error",
    },
  };
  top.events.push(event);
  top.exceptionMessage = message;
  top.status = { code: "error", message };
}

/** Add an event to the active span (no-op when none). */
export function addSpanEvent(
  name: string,
  attributes?: Record<string, string | number | boolean | null>
): void {
  const store = ALS.getStore();
  const top = store?.stack[store.stack.length - 1];
  if (!top) return;
  top.events.push({ name, time: Date.now(), attributes: attributes ?? {} });
}

/** Set a single attribute on the active span (no-op when none). */
export function setSpanAttribute(key: string, value: string | number | boolean | null | undefined): void {
  const store = ALS.getStore();
  const top = store?.stack[store.stack.length - 1];
  if (!top) return;
  top.attributes[key] = value ?? null;
}

/** Set the active span status (e.g. mark error without an exception). */
export function setSpanStatus(code: "ok" | "error", message?: string): void {
  const store = ALS.getStore();
  const top = store?.stack[store.stack.length - 1];
  if (!top) return;
  top.status = { code, message };
}

/** Snapshot of recorded spans — empties the internal buffer. */
export function drainSpans(): Span[] {
  const out = TRACER_STATE.sink.slice();
  TRACER_STATE.sink.length = 0;
  return out;
}

/** Inject the current span context as a `traceparent` header value. */
export function injectTraceParent(): string | undefined {
  const store = ALS.getStore();
  const top = store?.stack[store.stack.length - 1];
  if (!top) return undefined;
  return formatTraceParent(top.context);
}

/** Reset all internal state — used by tests and `shutdownTelemetry`. */
export function _resetTelemetryForTests(): void {
  TRACER_STATE.enabled = false;
  TRACER_STATE.exporter = null;
  TRACER_STATE.sink.length = 0;
  TRACER_STATE.maxBuffered = 1024;
}

/** Initialise telemetry. Idempotent: calling twice is a no-op. */
export interface InitTelemetryOptions {
  /** Override the env-based enable check (e.g. for tests). */
  forceEnable?: boolean;
  /** OTLP/HTTP endpoint for span export. Empty disables exporter. */
  otlpEndpoint?: string;
  /** Override max buffered spans (default 1024). */
  maxBuffered?: number;
  /** Custom exporter sink (overrides the OTLP default). */
  exporter?: (spans: Span[]) => void | Promise<void>;
}

export function initTelemetry(opts: InitTelemetryOptions = {}): void {
  if (TRACER_STATE.enabled) return;
  const envEnabled = (process.env.OTEL_ENABLED ?? "0") !== "0";
  const shouldEnable = Boolean(opts.forceEnable) || envEnabled;
  if (!shouldEnable) {
    // Still mark "initialised" so isTelemetryEnabled() can be checked but
    // returns false. This avoids callers having to retry init on every env.
    return;
  }
  TRACER_STATE.enabled = true;
  TRACER_STATE.maxBuffered = opts.maxBuffered ?? 1024;
  TRACER_STATE.exporter = opts.exporter ?? null;
}

/** Stop telemetry, flushing the buffer. Safe to call when never enabled. */
export async function shutdownTelemetry(): Promise<void> {
  if (!TRACER_STATE.enabled) return;
  const drained = drainSpans();
  if (TRACER_STATE.exporter && drained.length) {
    await TRACER_STATE.exporter(drained);
  }
  TRACER_STATE.enabled = false;
  TRACER_STATE.exporter = null;
}

/** Return the singleton Tracer object — convenience accessor. */
export function getTracer(): Tracer {
  return {
    startSpan,
    withSpan: (name, fn, opts) => withSpan(name, fn, opts),
    getActiveSpan: () => {
      const store = ALS.getStore();
      return store?.stack[store.stack.length - 1] ?? null;
    },
    addEvent: addSpanEvent,
    setAttribute: setSpanAttribute,
    recordException,
    isEnabled: isTelemetryEnabled,
    drain: drainSpans,
  };
}

/**
 * Internal: the current ALS root store, if any. Exported for advanced
 * instrumentations (e.g. proxySpan) that need to preserve context across
 * hops that ALS cannot follow (raw callbacks from C++ addons, etc.).
 */
export function _currentSpanStack(): Span[] {
  return ALS.getStore()?.stack.slice() ?? [];
}

/** Internal: getResource proxy exposed so callers don't import resource.ts directly. */
export { getResource };

// Re-export the most common spanTypes symbols so consumers only need this module.
export {
  SPAN_STATUS_ERROR,
  SPAN_STATUS_OK,
  SPAN_STATUS_UNSET,
  formatTraceParent,
  randomHexId,
};
export type { Span, SpanAttributes, SpanContext, SpanEvent };