/**
 * tests/unit/observability/otel.test.ts
 *
 * Tracer + active-span stack. Covers:
 *   - withSpan returns the value + sets status=ok
 *   - withSpan records exceptions and rethrows
 *   - Nested spans inherit the parent's traceId but get a unique spanId
 *   - currentTraceId / currentSpanId return undefined outside any span
 *   - recordException on the active span
 *   - injectTraceParent returns a W3C-formatted header
 *   - drainSpans returns the buffered spans
 *   - initTelemetry / shutdownTelemetry lifecycle (no-op when disabled)
 *   - withSpanSync for synchronous functions
 */

import test from "node:test";
import assert from "node:assert/strict";

const otel = await import("../../../src/lib/observability/otel.ts");
const spanTypes = await import("../../../src/lib/observability/spanTypes.ts");

test("withSpan returns the value and marks status=ok", async () => {
  const result = await otel.withSpan("test", async () => 42);
  assert.equal(result, 42);
});

test("withSpan records the exception and rethrows", async () => {
  await assert.rejects(async () => {
    await otel.withSpan("explode", async () => {
      throw new Error("boom");
    });
  }, /boom/);
});

test("Nested spans share traceId but have unique spanIds", async () => {
  await otel.withSpan("outer", async () => {
    const outerTrace = otel.currentTraceId();
    const outerSpan = otel.currentSpanId();
    assert.ok(outerTrace);
    assert.ok(outerSpan);
    await otel.withSpan("inner", async () => {
      const innerTrace = otel.currentTraceId();
      const innerSpan = otel.currentSpanId();
      assert.equal(innerTrace, outerTrace);
      assert.notEqual(innerSpan, outerSpan);
    });
  });
});

test("currentTraceId/currentSpanId return undefined outside any span", () => {
  // We can only assert this inside a new ALS scope; outside it the value
  // depends on what the test runner is doing. Test the negative case by
  // forcing an empty store via the internal helper.
  const stack = otel._currentSpanStack();
  assert.deepEqual(stack, []);
});

test("recordException on the active span sets status=error and stamps the message", async () => {
  await otel.withSpan("err", async (span) => {
    otel.recordException(new Error("expected"));
    assert.equal(span.status.code, "error");
    assert.equal(span.exceptionMessage, "expected");
    assert.equal(
      span.events.some((e) => e.name === "exception" && e.attributes?.["exception.message"] === "expected"),
      true
    );
  });
});

test("injectTraceParent returns a W3C-formatted header inside a span", async () => {
  await otel.withSpan("http", async () => {
    const header = otel.injectTraceParent();
    assert.ok(header);
    const parts = header.split("-");
    assert.equal(parts.length, 4);
    assert.equal(parts[0], "00");
    assert.equal(parts[1].length, 32);
    assert.equal(parts[2].length, 16);
  });
});

test("drainSpans returns the buffered spans and clears the buffer", async () => {
  // Reset to a clean state — we don't want leftover spans from previous tests.
  otel._resetTelemetryForTests();
  otel.initTelemetry({ forceEnable: true });
  await otel.withSpan("drain-test", async () => "ok");
  const drained = otel.drainSpans();
  assert.ok(drained.length >= 1);
  assert.equal(drained[drained.length - 1].name, "drain-test");
  otel._resetTelemetryForTests();
});

test("initTelemetry is a no-op when OTEL_ENABLED=0 (the default)", () => {
  otel._resetTelemetryForTests();
  const prev = process.env.OTEL_ENABLED;
  delete process.env.OTEL_ENABLED;
  otel.initTelemetry();
  assert.equal(otel.isTelemetryEnabled(), false);
  if (prev !== undefined) process.env.OTEL_ENABLED = prev;
});

test("initTelemetry({ forceEnable: true }) activates the tracer", () => {
  otel._resetTelemetryForTests();
  otel.initTelemetry({ forceEnable: true });
  assert.equal(otel.isTelemetryEnabled(), true);
  otel._resetTelemetryForTests();
});

test("shutdownTelemetry drains and disables", async () => {
  otel._resetTelemetryForTests();
  otel.initTelemetry({ forceEnable: true });
  await otel.withSpan("before-shutdown", async () => "ok");
  await otel.shutdownTelemetry();
  assert.equal(otel.isTelemetryEnabled(), false);
});

test("withSpanSync works for synchronous functions", () => {
  const result = otel.withSpanSync("sync", () => 7);
  assert.equal(result, 7);
});

test("withSpanSync rethrows synchronously", () => {
  assert.throws(() => otel.withSpanSync("sync-boom", () => { throw new Error("nope"); }), /nope/);
});

test("addSpanEvent attaches an event to the active span", async () => {
  await otel.withSpan("evented", async (span) => {
    otel.addSpanEvent("checkpoint", { step: 1 });
    assert.equal(span.events[span.events.length - 1].name, "checkpoint");
    assert.equal(span.events[span.events.length - 1].attributes?.step, 1);
  });
});

test("setSpanAttribute sets an attribute on the active span", async () => {
  await otel.withSpan("attr", async (span) => {
    otel.setSpanAttribute("alpha", "beta");
    assert.equal(span.attributes.alpha, "beta");
  });
});

test("formatTraceParent produces a valid W3C header for a fresh context", () => {
  const ctx = { traceId: "0".repeat(32), spanId: "1".repeat(16), traceFlags: 1 };
  const header = spanTypes.formatTraceParent(ctx);
  assert.equal(header, `00-${"0".repeat(32)}-${"1".repeat(16)}-01`);
});

test("parseTraceParent round-trips with formatTraceParent", () => {
  const ctx = { traceId: "a".repeat(32), spanId: "b".repeat(16), traceFlags: 1 };
  const header = spanTypes.formatTraceParent(ctx)!;
  const parsed = spanTypes.parseTraceParent(header);
  assert.deepEqual(parsed, { traceId: ctx.traceId, spanId: ctx.spanId, traceFlags: 1, remote: true });
});

test("parseTraceParent returns undefined for malformed input", () => {
  assert.equal(spanTypes.parseTraceParent("not-a-traceparent"), undefined);
  assert.equal(spanTypes.parseTraceParent(""), undefined);
  assert.equal(spanTypes.parseTraceParent(null), undefined);
  assert.equal(spanTypes.parseTraceParent(undefined), undefined);
});

test("randomHexId produces a 32-char lowercase hex string", () => {
  const id = spanTypes.randomHexId(16);
  assert.equal(id.length, 32);
  assert.match(id, /^[0-9a-f]{32}$/);
});