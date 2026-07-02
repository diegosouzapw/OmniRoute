import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeUpstreamHeadersMap } from "../../src/lib/db/models.ts";
import { isForbiddenCustomHeaderName } from "../../src/shared/constants/upstreamHeaders.ts";

test("sanitizeUpstreamHeadersMap: drops hop-by-hop / Host names", () => {
  const out = sanitizeUpstreamHeadersMap({
    Host: "evil",
    Connection: "close",
    "Content-Length": "999",
    "X-Custom": "ok",
  });
  assert.deepEqual(out, { "X-Custom": "ok" });
});

test("sanitizeUpstreamHeadersMap: drops values with CR/LF", () => {
  const out = sanitizeUpstreamHeadersMap({
    Good: "a",
    Bad: "x\ny",
    Bad2: "x\ry",
  });
  assert.deepEqual(out, { Good: "a" });
});

test("sanitizeUpstreamHeadersMap: caps count at 16", () => {
  const raw = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`H${i}`, String(i)]));
  const out = sanitizeUpstreamHeadersMap(raw);
  assert.strictEqual(Object.keys(out).length, 16);
});

test("isForbiddenCustomHeaderName: blocks cookie (session hijack via operator-set custom headers)", () => {
  assert.strictEqual(isForbiddenCustomHeaderName("cookie"), true);
  assert.strictEqual(isForbiddenCustomHeaderName("Cookie"), true);
  assert.strictEqual(isForbiddenCustomHeaderName("  COOKIE  "), true);
});

test("isForbiddenCustomHeaderName: still blocks the pre-existing auth header names", () => {
  for (const name of ["authorization", "x-api-key", "x-goog-api-key", "api-key"]) {
    assert.strictEqual(isForbiddenCustomHeaderName(name), true, `should block ${name}`);
  }
});

test("isForbiddenCustomHeaderName: allows a legitimate custom header name", () => {
  assert.strictEqual(isForbiddenCustomHeaderName("X-Request-ID"), false);
});
