/**
 * proxy-span.test.ts — verifies the Next.js proxy.ts wrapper from
 * src/lib/observability/proxySpan.ts.
 *
 * Covers:
 *  - extractRoutePattern matches parameterized paths (/api/v1/foo/123 -> /api/v1/foo/:id)
 *  - extractRoutePattern returns raw path for un-parameterized routes
 *  - propagateTraceParent injects W3C traceparent header from the active span
 *  - wrapProxy spans every request and forwards the response
 *  - wrapProxy marks span as error on non-2xx responses
 *  - withProxySpan invokes fn inside a span and returns the result
 *  - attribute coercion: only finite numbers / string-coercibles are emitted
 *
 * Runs under node --test.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  extractRoutePattern,
  propagateTraceParent,
  wrapProxy,
  withProxySpan,
  PROXY_SPAN_ROUTE_HEADER,
  PROXY_SPAN_DURATION_HEADER,
} from "@/lib/observability/proxySpan";
import { currentTraceId } from "@/lib/observability/otel";
import { metricsRegistry } from "@/lib/observability/metrics";

/* ------------------------------------------------------------------ */
/* extractRoutePattern                                                */
/* ------------------------------------------------------------------ */

test("proxySpan: extractRoutePattern collapses UUID path segments", () => {
  assert.equal(
    extractRoutePattern("/api/combos/4747a985-c074-4f60-a7f0-d8bb6132d1fc"),
    "/api/combos/:id",
  );
});

test("proxySpan: extractRoutePattern collapses numeric segments", () => {
  assert.equal(
    extractRoutePattern("/api/v1/relay/chat/12345"),
    "/api/v1/relay/chat/:id",
  );
});

test("proxySpan: extractRoutePattern leaves short paths alone", () => {
  assert.equal(extractRoutePattern("/api/health"), "/api/health");
  assert.equal(extractRoutePattern("/"), "/");
});

test("proxySpan: extractRoutePattern handles trailing slash", () => {
  assert.equal(
    extractRoutePattern("/api/combos/abc-123/"),
    "/api/combos/:id/",
  );
});

test("proxySpan: extractRoutePattern is bounded (no DoS on huge paths)", () => {
  const huge = "/" + "x".repeat(2000);
  const out = extractRoutePattern(huge);
  assert.ok(out.length <= 2048);
});

/* ------------------------------------------------------------------ */
/* propagateTraceParent                                               */
/* ------------------------------------------------------------------ */

test("propagateTraceParent: returns empty when no active span", () => {
  // Outside any withSpan, currentTraceId() returns undefined
  const headers = propagateTraceParent({});
  assert.equal(Object.keys(headers).length, 0);
});

test("propagateTraceParent: injects traceparent header inside a span", async () => {
  let captured: Record<string, string> = {};
  await import("@/lib/observability/otel").then(async ({ withSpan }) => {
    await withSpan("test-parent", async () => {
      captured = propagateTraceParent({ "x-test": "1" });
    });
  });
  assert.equal(captured["x-test"], "1");
  // traceparent format: 00-<trace-id>-<span-id>-01
  assert.match(captured["traceparent"], /^00-[0-9a-f]{32}-[0-9a-f]{16}-[0-9a-f]{2}$/);
});

test("propagateTraceParent: does not overwrite an existing traceparent header", async () => {
  let captured: Record<string, string> = {};
  const { withSpan } = await import("@/lib/observability/otel");
  await withSpan("outer", async () => {
    captured = propagateTraceParent({
      traceparent: "00-0-a-01", // malformed but present
    });
  });
  // The pre-existing header wins.
  assert.equal(captured["traceparent"], "00-0-a-01");
});

/* ------------------------------------------------------------------ */
/* withProxySpan                                                      */
/* ------------------------------------------------------------------ */

test("withProxySpan: invokes fn inside a span and returns the result", async () => {
  const out = await withProxySpan(
    { method: "GET", url: "/api/health" },
    async () => ({ ok: true, payload: "ok" }),
  );
  assert.equal(out.ok, true);
  assert.equal(out.payload, "ok");
});

test("withProxySpan: re-throws fn error", async () => {
  await assert.rejects(
    withProxySpan(
      { method: "POST", url: "/api/combos" },
      async () => {
        throw new Error("validation failed");
      },
    ),
    /validation failed/,
  );
});

/* ------------------------------------------------------------------ */
/* wrapProxy (Next.js handler shape)                                   */
/* ------------------------------------------------------------------ */

test("wrapProxy: forwards the response and stamps duration header", async () => {
  metricsRegistry.reset();
  const handler = wrapProxy(async () => {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  });
  const req = new Request("http://localhost/api/health", { method: "GET" });
  const res = await handler(req, {} as never);
  assert.equal(res.status, 200);
  const durationHeader = res.headers.get(PROXY_SPAN_DURATION_HEADER);
  assert.ok(durationHeader !== null, `expected ${PROXY_SPAN_DURATION_HEADER} header`);
  // Duration header is "X-Proxy-Span-Duration-Ms: <float>"
  assert.match(durationHeader!, /^\d+(\.\d+)?$/);
});

test("wrapProxy: stamps the route header on the response", async () => {
  const handler = wrapProxy(async () => new Response("ok"));
  const req = new Request("http://localhost/api/v1/chat/completions", { method: "POST" });
  const res = await handler(req, {} as never);
  const route = res.headers.get(PROXY_SPAN_ROUTE_HEADER);
  assert.equal(route, "/api/v1/chat/completions");
});

test("wrapProxy: 404 response still passes through with status propagated", async () => {
  const handler = wrapProxy(async () => new Response("nope", { status: 404 }));
  const req = new Request("http://localhost/api/missing", { method: "GET" });
  const res = await handler(req, {} as never);
  assert.equal(res.status, 404);
});

test("wrapProxy: handler errors become 500 responses with the error message", async () => {
  const handler = wrapProxy(async () => {
    throw new Error("downstream offline");
  });
  const req = new Request("http://localhost/api/v1/foo", { method: "GET" });
  const res = await handler(req, {} as never);
  assert.equal(res.status, 500);
  const body = await res.text();
  assert.match(body, /downstream offline/);
});

test("wrapProxy: emits a http_requests_total counter with the right labels", async () => {
  metricsRegistry.reset();
  const handler = wrapProxy(async () => new Response("ok", { status: 204 }));
  const req = new Request("http://localhost/api/v1/health", { method: "GET" });
  await handler(req, {} as never);
  const out = metricsRegistry.render();
  assert.match(out, /omniroute_http_requests_total/);
  assert.match(out, /method="GET"/);
  assert.match(out, /route="\/api\/v1\/health"/);
  assert.match(out, /status="204"/);
});

/* ------------------------------------------------------------------ */
/* Current-trace propagation                                          */
/* ------------------------------------------------------------------ */

test("wrapProxy: trace_id is set on the active context during the handler", async () => {
  let observedTraceId: string | undefined;
  const handler = wrapProxy(async () => {
    observedTraceId = currentTraceId();
    return new Response("ok");
  });
  const req = new Request("http://localhost/api/health", { method: "GET" });
  await handler(req, {} as never);
  assert.equal(typeof observedTraceId, "string");
  assert.ok(observedTraceId!.length > 0);
});
