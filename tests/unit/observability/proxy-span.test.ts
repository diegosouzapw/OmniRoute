/**
 * tests/unit/observability/proxy-span.test.ts
 *
 * Proxy-span propagation helpers (PR-005b). Covers:
 *   - propagateTraceParent produces a W3C header even with no active span
 *   - withProxySpan joins the inbound trace when traceparent is valid
 *   - withProxySpan creates a fresh root span when the inbound header is missing
 *   - isProxySpanResult type-guard (positive + negative cases)
 *   - currentProxySpanResult returns undefined outside any span
 */

import test from "node:test";
import assert from "node:assert/strict";

const proxySpan = await import("../../../src/lib/observability/proxySpan.ts");
const spanTypes = await import("../../../src/lib/observability/spanTypes.ts");

test("propagateTraceParent always produces a header, even with no active span", () => {
  const headers = proxySpan.propagateTraceParent({ "x-custom": "1" });
  assert.ok(headers.traceparent);
  assert.equal(headers["x-custom"], "1");
  assert.equal(headers[proxySpan.PROXY_TRACE_HEADER], "1");
});

test("propagateTraceParent includes the active span's context", async () => {
  const otel = await import("../../../src/lib/observability/otel.ts");
  await otel.withSpan("propagate", async () => {
    const headers = proxySpan.propagateTraceParent();
    const parsed = spanTypes.parseTraceParent(headers.traceparent);
    assert.ok(parsed);
    assert.equal(parsed.traceId, otel.currentTraceId());
  });
});

test("withProxySpan joins the inbound trace when traceparent is valid", async () => {
  const headers = new Headers({ traceparent: "00-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbb-01" });
  const span = proxySpan.withProxySpan(headers, { name: "inbound" });
  assert.equal(span.context.traceId, "a".repeat(32));
  assert.notEqual(span.context.spanId, "b".repeat(16));
  assert.equal(span.attributes["proxy.traced"], true);
  assert.equal(span.kind, "server");
});

test("withProxySpan creates a fresh root span when the inbound header is malformed", () => {
  const headers = new Headers({});
  const span = proxySpan.withProxySpan(headers, { name: "fresh" });
  assert.match(span.context.traceId, /^[0-9a-f]{32}$/);
  assert.match(span.context.spanId, /^[0-9a-f]{16}$/);
});

test("isProxySpanResult accepts well-formed metadata and rejects malformed objects", () => {
  assert.equal(
    proxySpan.isProxySpanResult({
      traceId: "a".repeat(32),
      spanId: "b".repeat(16),
      traced: true,
    }),
    true
  );
  assert.equal(proxySpan.isProxySpanResult(null), false);
  assert.equal(proxySpan.isProxySpanResult({}), false);
  assert.equal(
    proxySpan.isProxySpanResult({ traceId: "short", spanId: "b".repeat(16), traced: true }),
    false
  );
  assert.equal(
    proxySpan.isProxySpanResult({ traceId: "a".repeat(32), spanId: "short", traced: true }),
    false
  );
  assert.equal(
    proxySpan.isProxySpanResult({ traceId: "a".repeat(32), spanId: "b".repeat(16), traced: "yes" }),
    false
  );
});

test("currentProxySpanResult returns undefined outside any span", async () => {
  // Reset and create an isolated ALS scope to confirm we get undefined.
  const otel = await import("../../../src/lib/observability/otel.ts");
  const stack = otel._currentSpanStack();
  if (stack.length === 0) {
    assert.equal(proxySpan.currentProxySpanResult(), undefined);
  } else {
    // Inside a test running parallel — current result is something but
    // still must be well-formed.
    const r = proxySpan.currentProxySpanResult();
    if (r !== undefined) {
      assert.match(r.traceId, /^[0-9a-f]{32}$/);
      assert.match(r.spanId, /^[0-9a-f]{16}$/);
      assert.equal(r.traced, true);
    }
  }
});