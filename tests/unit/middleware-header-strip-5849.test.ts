import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildStreamingResponseHeaders,
  isNextMiddlewareControlHeader,
  MAX_FORWARDED_UPSTREAM_RESPONSE_HEADER_BYTES,
  stripNextMiddlewareControlHeaders,
} from "@omniroute/open-sse/handlers/chatCore/responseHeaders.ts";

// Regression guard for issue #5849:
// Providers hosted behind a Next.js middleware (e.g. synthetic.new) leak Next's
// internal `x-middleware-*` control headers on a successful 200 response.
// Forwarding `x-middleware-rewrite` verbatim from an App Router route handler
// makes Next 16 throw `NextResponse.rewrite() was used in a app route handler`
// and return 500. Both proxy paths (streaming + JSON) must strip the family.

const MIDDLEWARE_HEADERS: [string, string][] = [
  ["x-middleware-rewrite", "/internal/rewrite"],
  ["x-middleware-next", "1"],
  ["x-middleware-override-headers", "x-foo"],
  ["x-middleware-set-cookie", "a=b"],
  ["x-middleware-request-foo", "bar"],
];

function getHeaderValue(headers: Record<string, string>, name: string): string | undefined {
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase());
  return entry?.[1];
}

test("isNextMiddlewareControlHeader matches the whole x-middleware-* family (case-insensitive)", () => {
  for (const [name] of MIDDLEWARE_HEADERS) {
    assert.equal(isNextMiddlewareControlHeader(name), true, name);
    assert.equal(isNextMiddlewareControlHeader(name.toUpperCase()), true, name);
  }
  assert.equal(isNextMiddlewareControlHeader("x-request-id"), false);
  assert.equal(isNextMiddlewareControlHeader("content-type"), false);
});

test("streaming path: buildStreamingResponseHeaders strips x-middleware-* and preserves normal headers", () => {
  const upstream = new Headers();
  for (const [k, v] of MIDDLEWARE_HEADERS) upstream.append(k, v);
  upstream.append("x-request-id", "req-123");

  const out = buildStreamingResponseHeaders(upstream, {});

  const lowerKeys = Object.keys(out).map((k) => k.toLowerCase());
  for (const [name] of MIDDLEWARE_HEADERS) {
    assert.ok(
      !lowerKeys.includes(name.toLowerCase()),
      `expected ${name} to be stripped, got: ${lowerKeys.join(", ")}`
    );
  }
  // Normal upstream header preserved.
  const requestIdKey = Object.keys(out).find((k) => k.toLowerCase() === "x-request-id");
  assert.ok(requestIdKey, "x-request-id must be preserved");
  assert.equal(out[requestIdKey as string], "req-123");
});
test("streaming path strips oversized and credential-bearing upstream response headers", () => {
  const upstream = new Headers({
    "x-request-id": "req-oversized-guard",
    "x-upstream-diagnostic": "x".repeat(MAX_FORWARDED_UPSTREAM_RESPONSE_HEADER_BYTES),
    "set-cookie": "session=upstream-secret; HttpOnly",
  });

  const warnings: unknown[][] = [];
  const out = buildStreamingResponseHeaders(
    upstream,
    {},
    {
      warn: (...args: unknown[]) => warnings.push(args),
    }
  );
  const lowerKeys = Object.keys(out).map((key) => key.toLowerCase());
  assert.ok(lowerKeys.includes("x-request-id"));
  assert.ok(!lowerKeys.includes("x-upstream-diagnostic"));
  assert.ok(!lowerKeys.includes("set-cookie"));
  assert.equal(warnings.length, 1);
  assert.ok(!JSON.stringify(warnings).includes("session=upstream-secret"));
});

test("streaming path bounds the aggregate size of many small upstream response headers", () => {
  const upstream = new Headers({ "x-request-id": "req-many-small-headers" });
  for (let index = 0; index < 40; index += 1) {
    upstream.set(`x-upstream-diagnostic-${index.toString().padStart(2, "0")}`, "x".repeat(32));
  }

  const out = buildStreamingResponseHeaders(upstream, {}, null);
  const upstreamEntries = Object.entries(out).filter(
    ([name]) =>
      name.toLowerCase().startsWith("x-upstream-") || name.toLowerCase() === "x-request-id"
  );
  const forwardedBytes = upstreamEntries.reduce(
    (total, [name, value]) => total + Buffer.byteLength(`${name}: ${value}\r\n`),
    0
  );

  assert.ok(forwardedBytes <= MAX_FORWARDED_UPSTREAM_RESPONSE_HEADER_BYTES);
  assert.ok(upstreamEntries.length < 41, "at least one small header must be dropped");
  assert.equal(getHeaderValue(out, "x-request-id"), "req-many-small-headers");
});

test("streaming path prioritizes request and rate-limit headers over diagnostics", () => {
  const upstream = new Headers();
  for (let index = 0; index < 20; index += 1) {
    upstream.set(`a-diagnostic-${index.toString().padStart(2, "0")}`, "x".repeat(48));
  }
  upstream.set("retry-after", "30");
  upstream.set("x-ratelimit-remaining-requests", "12");
  upstream.set("x-request-id", "req-priority");

  const out = buildStreamingResponseHeaders(upstream, {}, null);

  assert.equal(getHeaderValue(out, "x-request-id"), "req-priority");
  assert.equal(getHeaderValue(out, "retry-after"), "30");
  assert.equal(getHeaderValue(out, "x-ratelimit-remaining-requests"), "12");
});

test("streaming path strips hop-by-hop and spoofed OmniRoute headers", () => {
  const upstream = new Headers({
    connection: "keep-alive, x-remove-me",
    "keep-alive": "timeout=5",
    "proxy-authenticate": "Basic realm=upstream",
    "x-remove-me": "connection-scoped",
    "x-omniroute-provider": "spoofed-provider",
    "x-request-id": "req-safe",
  });

  const out = buildStreamingResponseHeaders(upstream, {}, null);

  assert.equal(getHeaderValue(out, "x-request-id"), "req-safe");
  assert.ok(!Object.keys(out).some((name) => name.toLowerCase() === "keep-alive"));
  assert.ok(!Object.keys(out).some((name) => name.toLowerCase() === "proxy-authenticate"));
  assert.ok(!Object.keys(out).some((name) => name.toLowerCase() === "x-remove-me"));
  assert.ok(!Object.values(out).includes("spoofed-provider"));
});

test("non-streaming JSON path: stripNextMiddlewareControlHeaders removes the family, keeps the rest", () => {
  const headers = new Headers();
  for (const [k, v] of MIDDLEWARE_HEADERS) headers.append(k, v);
  headers.append("x-request-id", "req-456");
  headers.append("content-type", "application/json");

  stripNextMiddlewareControlHeaders(headers);

  for (const [name] of MIDDLEWARE_HEADERS) {
    assert.equal(headers.get(name), null, `${name} must be stripped`);
  }
  assert.equal(headers.get("x-request-id"), "req-456");
  assert.equal(headers.get("content-type"), "application/json");
});
