/**
 * otel.ts — Tracer + global context.
 *
 * Implements a lightweight OpenTelemetry-compatible tracer that:
 *  - Generates W3C trace/span IDs
 *  - Tracks an "active context" for the current async scope (via
 *    AsyncLocalStorage) so that nested startChildSpan() picks up the right parent
 *  - Supports sampling decisions (always-on by default; toggle via env)
 *  - Forwards ended spans to the configured exporters (see `initTelemetry`)
 *
 * This module is default-OFF — nothing is initialized until `initTelemetry()`
 * is called. Before init, calls to `startSpan()` return a no-op span that
 * records attributes in memory but does not export. This keeps test runs and
 * one-off scripts free from exporter side effects.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { randomBytes } from "node:crypto";

import type {
  Resource,
  Span,
  SpanAttributes,
  SpanContext,
  SpanEvent,
  SpanExporter,
  SpanStatusCode,
  Tracer,
} from "./spanTypes";
import { TRACE_FLAG_SAMPLED } from "./spanTypes";
import { createDefaultResource, type Resource as ResourceT } from "./resource";

// ─── ID generation ─────────────────────────────────────────────────────────────

const HEX = "0123456789abcdef";
const ID_CHARS = new Uint8Array(16);

/** Generate a 16-byte hex trace id (W3C). */
export function generateTraceId(): string {
  const bytes = randomBytes(16);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += HEX[(bytes[i] >>> 4) & 0x0f];
    out += HEX[bytes[i] & 0x0f];
  }
  return out;
}

/** Generate an 8-byte hex span id (W3C). */
export function generateSpanId(): string {
  const bytes = randomBytes(8);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += HEX[(bytes[i] >>> 4) & 0x0f];
    out += HEX[bytes[i] & 0x0f];
  }
  return out;
}

// ─── Span implementation ───────────────────────────────────────────────────────

interface SpanRecord {
  name: string;
  context: SpanContext;
  startedAtMs: number;
  endedAtMs: number | null;
  attributes: SpanAttributes;
  events: SpanEvent[];
  status: SpanStatusCode;
  errorMessage?: string;
  ended: boolean;
}

function makeSpan(name: string, context: SpanContext, parentAttributes?: SpanAttributes): Span {
  const record: SpanRecord = {
    name,
    context,
    startedAtMs: Date.now(),
    endedAtMs: null,
    attributes: parentAttributes ? { ...parentAttributes } : {},
    events: [],
    status: "UNSET",
    ended: false,
  };

  return {
    context,
    name,
    startedAtMs: record.startedAtMs,

    setAttribute(key: string, value) {
      if (record.ended) return;
      record.attributes[key] = value as SpanAttributes[string];
    },

    setAttributes(attributes) {
      if (record.ended) return;
      for (const [key, value] of Object.entries(attributes)) {
        record.attributes[key] = value as SpanAttributes[string];
      }
    },

    addEvent(name, attributes) {
      if (record.ended) return;
      record.events.push({
        name,
        timestampMs: Date.now(),
        attributes: attributes ? { ...attributes } : undefined,
      });
    },

    end(endMs) {
      if (record.ended) return;
      record.ended = true;
      record.endedAtMs = typeof endMs === "number" ? endMs : Date.now();
      // Notify the active tracer — exporters run after the call stack unwinds.
      notifySpanEnd(record);
    },

    setStatus(status, errorMessage) {
      if (record.ended) return;
      record.status = status;
      if (status === "ERROR" && errorMessage) record.errorMessage = errorMessage;
    },

    updateName(newName) {
      if (record.ended) return;
      if (typeof newName === "string" && newName.length > 0) record.name = newName;
    },

    getAttributes() {
      return { ...record.attributes };
    },

    getDurationMs() {
      if (record.endedAtMs === null) return 0;
      return record.endedAtMs - record.startedAtMs;
    },

    isEnded() {
      return record.ended;
    },

    getEvents() {
      return record.events.slice();
    },

    getStatus() {
      return record.status === "ERROR"
        ? { status: record.status, errorMessage: record.errorMessage }
        : { status: record.status };
    },
  };
}

// ─── Tracer implementation ─────────────────────────────────────────────────────

interface TracerState {
  initialized: boolean;
  resource: ResourceT;
  exporters: SpanExporter[];
  samplingRate: number;
  maxQueueSize: number;
  queue: SpanRecord[];
  flushing: boolean;
  flushTimer: NodeJS.Timeout | null;
}

const tracerState: TracerState = {
  initialized: false,
  resource: createDefaultResource(),
  exporters: [],
  samplingRate: 1,
  maxQueueSize: 4096,
  queue: [],
  flushing: false,
  flushTimer: null,
};

const asyncStorage = new AsyncLocalStorage<{ span: Span }>();

/**
 * Initialize the global tracer. Safe to call multiple times — additional
 * invocations are ignored unless `force` is true. Returns true when state was
 * (re)initialized.
 */
export function initTelemetry(options: {
  resource?: ResourceT;
  exporters?: SpanExporter[];
  samplingRate?: number;
  maxQueueSize?: number;
  force?: boolean;
} = {}): boolean {
  if (tracerState.initialized && !options.force) return false;

  tracerState.initialized = true;
  tracerState.resource = options.resource ?? createDefaultResource();
  tracerState.exporters = options.exporters ?? [];
  tracerState.samplingRate = clampSamplingRate(options.samplingRate);
  tracerState.maxQueueSize = Math.max(16, options.maxQueueSize ?? 4096);
  tracerState.queue = [];
  tracerState.flushing = false;
  if (tracerState.flushTimer) {
    clearInterval(tracerState.flushTimer);
    tracerState.flushTimer = null;
  }
  return true;
}

/** Test/teardown helper — clears tracer state without exporting. */
export function shutdownTelemetry(): void {
  tracerState.initialized = false;
  tracerState.exporters = [];
  tracerState.queue = [];
  if (tracerState.flushTimer) {
    clearInterval(tracerState.flushTimer);
    tracerState.flushTimer = null;
  }
}

function clampSamplingRate(rate: number | undefined): number {
  if (typeof rate !== "number" || !Number.isFinite(rate)) return 1;
  if (rate < 0) return 0;
  if (rate > 1) return 1;
  return rate;
}

function shouldSample(): boolean {
  const rate = tracerState.samplingRate;
  if (rate >= 1) return true;
  if (rate <= 0) return false;
  return Math.random() < rate;
}

function notifySpanEnd(record: SpanRecord): void {
  if (!tracerState.initialized) return;
  if (tracerState.queue.length >= tracerState.maxQueueSize) {
    // Drop oldest non-error spans first; preserve error spans for diagnostics.
    let dropped = 0;
    for (let i = 0; i < tracerState.queue.length && tracerState.queue.length >= tracerState.maxQueueSize; i++) {
      const item = tracerState.queue[i];
      if (item && item.status !== "ERROR") {
        tracerState.queue.splice(i, 1);
        i -= 1;
        dropped += 1;
      }
    }
    if (tracerState.queue.length >= tracerState.maxQueueSize) {
      // Still over capacity (all errors) — drop oldest.
      tracerState.queue.shift();
    }
  }
  tracerState.queue.push(record);
}

/** Drain the queue and forward to every configured exporter. */
export async function flushSpans(): Promise<void> {
  if (!tracerState.initialized) return;
  if (tracerState.flushing) return;
  if (tracerState.queue.length === 0) return;
  tracerState.flushing = true;
  const drained = tracerState.queue.splice(0, tracerState.queue.length);
  try {
    await Promise.all(
      tracerState.exporters.map(async (exp) => {
        for (const record of drained) {
          try {
            await exp.exportSpan(toSpanLike(record), tracerState.resource);
          } catch {
            // Swallow exporter errors — telemetry must never crash the host.
          }
        }
      })
    );
  } finally {
    tracerState.flushing = false;
  }
}

/** Wrap a record into the public Span interface for exporters. */
function toSpanLike(record: SpanRecord): Span {
  return makeSpan(record.name, record.context, record.attributes);
}

/** Get the current tracer (always non-null; safe to call pre-init). */
export function getTracer(): Tracer {
  return {
    startSpan(name, attributes) {
      if (!shouldSample()) {
        // Sampled out: return a no-op span that still produces a valid context.
        const context: SpanContext = {
          traceId: generateTraceId(),
          spanId: generateSpanId(),
          flags: 0,
          parentSpanId: null,
        };
        return makeSpan(name, context, attributes);
      }
      const context: SpanContext = {
        traceId: generateTraceId(),
        spanId: generateSpanId(),
        flags: TRACE_FLAG_SAMPLED,
        parentSpanId: null,
      };
      return makeSpan(name, context, attributes);
    },

    startChildSpan(name, attributes, parent) {
      let parentCtx = parent;
      if (!parentCtx) {
        const active = asyncStorage.getStore();
        if (active) parentCtx = active.span.context;
      }
      if (!shouldSample()) {
        const context: SpanContext = {
          traceId: parentCtx?.traceId ?? generateTraceId(),
          spanId: generateSpanId(),
          flags: 0,
          parentSpanId: parentCtx?.spanId ?? null,
        };
        return makeSpan(name, context, attributes);
      }
      const context: SpanContext = {
        traceId: parentCtx?.traceId ?? generateTraceId(),
        spanId: generateSpanId(),
        flags: TRACE_FLAG_SAMPLED,
        parentSpanId: parentCtx?.spanId ?? null,
      };
      return makeSpan(name, context, attributes);
    },
  };
}

/**
 * Run `fn` with `span` set as the active span in the current async scope.
 * Returns the function's return value. Used by `proxySpan.ts` so that child
 * spans pick the right parent without manual threading.
 */
export function withSpan<T>(span: Span, fn: () => T): T {
  return asyncStorage.run({ span }, fn);
}

/** Read the currently active span (if any). */
export function getActiveSpan(): Span | undefined {
  return asyncStorage.getStore()?.span;
}

/** Convert a Span back to its public SpanContext (for header propagation). */
export function spanContext(span: Span): SpanContext {
  return span.context;
}

/** Build a SpanContext from a W3C traceparent string. */
export function contextFromTraceparent(
  traceparent: string | null | undefined
): SpanContext | null {
  if (typeof traceparent !== "string") return null;
  // Format: 00-<traceId 32hex>-<spanId 16hex>-<flags 2hex>
  const parts = traceparent.split("-");
  if (parts.length !== 4) return null;
  const [, traceId, spanId, flagsRaw] = parts;
  if (!traceId || !spanId || !flagsRaw) return null;
  if (traceId.length !== 32 || !/^[0-9a-f]+$/i.test(traceId)) return null;
  if (spanId.length !== 16 || !/^[0-9a-f]+$/i.test(spanId)) return null;
  const flags = Number.parseInt(flagsRaw, 16);
  if (!Number.isFinite(flags)) return null;
  return {
    traceId: traceId.toLowerCase(),
    spanId: spanId.toLowerCase(),
    flags,
    parentSpanId: null,
  };
}

/** Format a SpanContext as a W3C traceparent string (00-<traceId>-<spanId>-<flags>). */
export function traceparentFromContext(context: SpanContext): string {
  const flags = (context.flags & 0xff).toString(16).padStart(2, "0");
  return `00-${context.traceId}-${context.spanId}-${flags}`;
}

/** True when the tracer has been initialized via initTelemetry(). */
export function isTelemetryInitialized(): boolean {
  return tracerState.initialized;
}

/** Read-only view of the current resource. */
export function getResource(): ResourceT {
  return tracerState.resource;
}

/** Test-only helper: replace the resource without re-running initTelemetry. */
export function _setResourceForTesting(resource: ResourceT): void {
  tracerState.resource = resource;
}

/** Test-only helper: read queue depth for assertions. */
export function _queueDepthForTesting(): number {
  return tracerState.queue.length;
}

/** Test-only helper: register a span exporter without re-running init. */
export function _addExporterForTesting(exporter: SpanExporter): void {
  tracerState.exporters.push(exporter);
}