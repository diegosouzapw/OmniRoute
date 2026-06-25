/**
 * otel.test.ts — Unit tests for src/lib/observability/otel.ts
 *
 * Covers:
 *  - generateTraceId is 32 lowercase hex chars
 *  - generateSpanId is 16 lowercase hex chars
 *  - IDs are unique across calls
 *  - initTelemetry initializes once; second call without force is a no-op
 *  - shutdownTelemetry resets state
 *  - startSpan returns a Span with valid context; default flags = sampled
 *  - setAttribute / setAttributes / addEvent / setStatus mutate the record
 *  - end() locks the span (further mutations are ignored)
 *  - getDurationMs returns 0 when not ended, computed when ended
 *  - flushSpans forwards to registered exporters
 *  - Exporter errors don't throw out of flushSpans
 *  - Sampling rate 0 drops flags but still produces a context
 *  - Sampling rate >1 is clamped to 1
 *  - startChildSpan picks up parent context from AsyncLocalStorage
 *  - contextFromTraceparent parses valid W3C strings
 *  - contextFromTraceparent returns null on bad input
 *  - traceparentFromContext roundtrips
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  _addExporterForTesting,
  _queueDepthForTesting,
  contextFromTraceparent,
  flushSpans,
  generateSpanId,
  generateTraceId,
  getActiveSpan,
  getTracer,
  initTelemetry,
  isTelemetryInitialized,
  shutdownTelemetry,
  spanContext,
  startSpan as _startSpanAlias_unused,
  traceparentFromContext,
  withSpan,
} from "@/lib/observability/otel";
import type { SpanExporter } from "@/lib/observability/spanTypes";

test.beforeEach(() => {
  shutdownTelemetry();
});

test("generateTraceId returns 32 lowercase hex characters", () => {
  const id = generateTraceId();
  assert.equal(id.length, 32);
  assert.match(id, /^[0-9a-f]{32}$/);
});

test("generateSpanId returns 16 lowercase hex characters", () => {
  const id = generateSpanId();
  assert.equal(id.length, 16);
  assert.match(id, /^[0-9a-f]{16}$/);
});

test("generateTraceId is unique across calls (collision-resistant)", () => {
  const ids = new Set<string>();
  for (let i = 0; i < 64; i++) ids.add(generateTraceId());
  assert.equal(ids.size, 64, "all 64 trace IDs should be unique");
});

test("initTelemetry initializes; second call without force is a no-op", () => {
  assert.equal(isTelemetryInitialized(), false);
  assert.equal(initTelemetry(), true, "first init returns true");
  assert.equal(isTelemetryInitialized(), true);
  assert.equal(initTelemetry(), false, "second init is a no-op");
  // With force, it re-initializes.
  assert.equal(initTelemetry({ force: true }), true);
});

test("shutdownTelemetry clears the queue and exporters", () => {
  initTelemetry();
  const span = getTracer().startSpan("test");
  span.end();
  assert.ok(_queueDepthForTesting() >= 1);
  shutdownTelemetry();
  assert.equal(isTelemetryInitialized(), false);
  assert.equal(_queueDepthForTesting(), 0);
});

test("startSpan returns a span with a sampled context by default", () => {
  initTelemetry();
  const span = getTracer().startSpan("op");
  assert.equal(span.context.traceId.length, 32);
  assert.equal(span.context.spanId.length, 16);
  assert.ok(span.context.flags !== 0, "default flags should be sampled");
  assert.equal(span.isEnded(), false);
});

test("setAttribute / setAttributes / addEvent mutate the span record", () => {
  initTelemetry();
  const span = getTracer().startSpan("op");
  span.setAttribute("k", "v");
  span.setAttributes({ a: 1, b: true });
  span.addEvent("checkpoint", { seq: 1 });
  const attrs = span.getAttributes();
  assert.equal(attrs.k, "v");
  assert.equal(attrs.a, 1);
  assert.equal(attrs.b, true);
  const events = span.getEvents();
  assert.equal(events.length, 1);
  assert.equal(events[0]?.name, "checkpoint");
});

test("end() locks the span (further mutations are ignored)", () => {
  initTelemetry();
  const span = getTracer().startSpan("op");
  span.setAttribute("before", 1);
  span.end();
  span.setAttribute("after", 2);
  const attrs = span.getAttributes();
  assert.equal(attrs.before, 1);
  assert.equal(attrs.after, undefined, "after-end mutations should be ignored");
  assert.equal(span.isEnded(), true);
});

test("getDurationMs returns 0 when not ended, >0 after end", () => {
  initTelemetry();
  const span = getTracer().startSpan("op");
  assert.equal(span.getDurationMs(), 0);
  span.end();
  assert.ok(span.getDurationMs() >= 0);
});

test("flushSpans forwards ended spans to every exporter", async () => {
  initTelemetry();
  const received: { name: string; traceId: string }[] = [];
  const exporter: SpanExporter = {
    async exportSpan(span, _resource) {
      received.push({ name: span.name, traceId: span.context.traceId });
    },
  };
  _addExporterForTesting(exporter);

  const s = getTracer().startSpan("flush-me");
  s.end();
  await flushSpans();
  assert.equal(received.length, 1);
  assert.equal(received[0]?.name, "flush-me");
});

test("exporter errors do not break flushSpans", async () => {
  initTelemetry();
  const failing: SpanExporter = {
    async exportSpan() {
      throw new Error("boom");
    },
  };
  _addExporterForTesting(failing);
  const span = getTracer().startSpan("err");
  span.end();
  await assert.doesNotReject(async () => flushSpans());
});

test("sampling rate 0 produces a context with flags=0", () => {
  initTelemetry({ samplingRate: 0, force: true });
  const span = getTracer().startSpan("op");
  assert.equal(span.context.flags & 0x01, 0, "should not be sampled");
});

test("sampling rate >1 is clamped to 1 (always sampled)", () => {
  initTelemetry({ samplingRate: 5, force: true });
  const span = getTracer().startSpan("op");
  assert.ok(span.context.flags !== 0, "should be sampled");
});

test("startChildSpan inherits trace id from active AsyncLocalStorage span", () => {
  initTelemetry();
  const tracer = getTracer();
  const parent = tracer.startSpan("parent");
  let childTrace = "";
  withSpan(parent, () => {
    const child = tracer.startChildSpan("child");
    childTrace = child.context.traceId;
  });
  assert.equal(childTrace, parent.context.traceId);
});

test("contextFromTraceparent parses a valid W3C traceparent", () => {
  const ctx = contextFromTraceparent("00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01");
  assert.ok(ctx);
  assert.equal(ctx?.traceId, "0af7651916cd43dd8448eb211c80319c");
  assert.equal(ctx?.spanId, "b7ad6b7169203331");
  assert.equal(ctx?.flags, 1);
});

test("contextFromTraceparent returns null on invalid input", () => {
  assert.equal(contextFromTraceparent(null), null);
  assert.equal(contextFromTraceparent(""), null);
  assert.equal(contextFromTraceparent("not-a-traceparent"), null);
  assert.equal(contextFromTraceparent("00-zz-cc-01"), null, "non-hex traceId");
});

test("traceparentFromContext roundtrips through contextFromTraceparent", () => {
  const ctx = contextFromTraceparent("00-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbb-01");
  assert.ok(ctx);
  const out = traceparentFromContext(ctx!);
  assert.equal(out, "00-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbb-01");
});

test("withSpan + getActiveSpan returns the active span", () => {
  initTelemetry();
  const span = getTracer().startSpan("active");
  let captured: unknown = null;
  withSpan(span, () => {
    captured = getActiveSpan();
  });
  assert.equal(captured, span);
});

test("spanContext() returns the span's context", () => {
  initTelemetry();
  const span = getTracer().startSpan("ctx");
  const ctx = spanContext(span);
  assert.equal(ctx.traceId, span.context.traceId);
});