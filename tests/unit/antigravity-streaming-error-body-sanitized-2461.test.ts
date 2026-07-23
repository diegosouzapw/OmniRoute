import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityIdeVersionCache,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

// Ports decolua/9router#2461: a non-ok (e.g. 403) Antigravity upstream response in the
// STREAMING path was piped straight through to the client via a raw pass-through
// TransformStream, with no `response.ok` check at all — unlike the non-streaming path,
// which already builds a sanitized error via buildAntigravityUpstreamError. When the
// upstream 403 body is gzip-compressed (or otherwise binary/non-UTF8), those raw bytes
// end up surfaced verbatim in the client-visible error message, corrupting it (reporters
// saw literal control-byte garbage after "[ERROR] [403]:").
test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("AntigravityExecutor.execute (stream=true) sanitizes a non-ok upstream body instead of piping raw bytes", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityIdeVersionCache("2026.04.17-test");
  seedAntigravityCliVersionCache("2026.04.17-test");

  // Simulate a gzip-compressed 403 body (magic bytes 0x1f 0x8b), the exact shape
  // reported upstream — reading it as text without decoding produces garbage.
  const binaryBody = new Uint8Array([0x1f, 0x8b, 0x08, 0x00, 0x02, 0xff, 0x52, 0x41, 0x4e]);

  globalThis.fetch = async () =>
    new Response(binaryBody, {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: true,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });

    assert.equal(result.response.status, 403);

    const bodyText = await result.response.text();

    // The raw gzip magic bytes must never reach the client-visible error text.
    assert.ok(
      !bodyText.includes("\x1f\x8b"),
      `expected sanitized error body, got raw bytes leaking through: ${JSON.stringify(bodyText)}`
    );

    // Must be routed through buildErrorBody()/buildAntigravityUpstreamError() — a clean,
    // parseable JSON error shape (hard rule #12), not an arbitrary pass-through stream.
    const parsed = JSON.parse(bodyText) as { error?: { message?: string } };
    assert.ok(parsed.error?.message, "expected a structured error.message");
    assert.match(parsed.error.message, /Antigravity upstream error \(403\)/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
