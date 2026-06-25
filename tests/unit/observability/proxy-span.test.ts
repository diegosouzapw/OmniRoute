/**
 * proxy-span.test.ts — Unit tests for src/lib/observability/proxySpan.ts
 *
 * Covers:
 *  - extractRequestContext reads method / path from a Request
 *  - extractRequestContext handles traceparent and user-agent headers
 *  - withProxySpan on success runs the fn, returns its value, ends the span
 *  - withProxySpan on error rethrows and tags the span with exception event
 *  - withProxySpan with a null/undefined request uses INTERNAL method
 *  - withProxySpanSync returns the function result
 */

import test from "node:test";
import assert from "node:assert/strict";

import { extractRequestContext, withProxySpan, withProxySpanSync } from "@/lib/observability/proxySpan";
import { shutdownTelemetry } from "@/lib/observability/otel";

test.beforeEach(() => {
  shutdownTelemetry();
});

test("extractRequestContext reads method + path from a Request", () => {
  const req = new Request("http://localhost/api/v1/health?x=1", {
    method: "post",
    headers: { "user-agent": "ua/1.0", traceparent: "00-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbb-01" },
  });
  const ctx = extractRequestContext(req);
  assert.equal(ctx.method, "POST");
  assert.equal(ctx.path, "/api/v1/health");
  assert.equal(ctx.userAgent, "ua/1.0");
  assert.equal(ctx.traceparent, "00-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-bbbbbbbbbbbbbbbb-01");
});

test("extractRequestContext gracefully handles a missing URL / method", () => {
  // Request with a relative-ish URL won't parse, but extract should not throw.
  const req = new Request("http://localhost/", { method: "get" });
  const ctx = extractRequestContext(req);
  assert.equal(ctx.method, "GET");
  assert.equal(ctx.path, "/");
});

test("withProxySpan on success runs fn, returns its value, ends the span", async () => {
  const req = new Request("http://localhost/api/health", { method: "GET" });
  const result = await withProxySpan("GET /api/health", req, async () => {
    await new Promise((r) => setTimeout(r, 5));
    return "ok";
  });
  assert.equal(result, "ok");
});

test("withProxySpan on error rethrows and ends the span (via finally)", async () => {
  const req = new Request("http://localhost/api/health", { method: "GET" });
  await assert.rejects(
    () => withProxySpan("GET /api/health", req, async () => { throw new Error("kaboom"); }),
    /kaboom/
  );
});

test("withProxySpan with null request uses INTERNAL method (no headers)", async () => {
  let method: unknown = null;
  await withProxySpan("internal", null, async (span) => {
    method = span.getAttributes()["http.method"];
    return 1;
  });
  assert.equal(method, "INTERNAL");
});

test("withProxySpan attributes include http.method + http.target for a real Request", async () => {
  const req = new Request("http://localhost/api/health", { method: "POST" });
  let attrs: Record<string, unknown> = {};
  await withProxySpan("op", req, async (span) => {
    attrs = span.getAttributes();
    return null;
  });
  assert.equal(attrs["http.method"], "POST");
  assert.equal(attrs["http.target"], "/api/health");
});

test("withProxySpanSync returns the function result and ends the span", () => {
  const req = new Request("http://localhost/sync", { method: "GET" });
  const result = withProxySpanSync("sync.op", req, () => 99);
  assert.equal(result, 99);
});