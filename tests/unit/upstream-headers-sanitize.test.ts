import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeUpstreamHeadersMap } from "../../src/lib/db/models.ts";

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
