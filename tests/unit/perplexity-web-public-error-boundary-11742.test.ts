/**
 * #11742 — Perplexity Web public error boundary.
 *
 * The non-streaming upstream-error path returns the provider's own wording and error
 * code to the client. Both must cross the canonical boundary first: the message
 * through `sanitizeErrorMessage` (Hard Rule #12) and the code through the bounded
 * public-identifier vocabulary (`projectPublicErrorIdentifier`).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { PerplexityWebExecutor, toPublicPerplexityErrorCode } =
  await import("../../open-sse/executors/perplexity-web.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/perplexityTlsClient.ts");

__setTlsFetchOverrideForTesting(async (url, opts) => {
  const res = await (globalThis.fetch as typeof fetch)(url, opts);
  return {
    status: res.status,
    headers: res.headers,
    text: res.status === 200 ? null : await res.text(),
    body: res.status === 200 ? res.body : null,
  };
});

function mockPplxEvents(events: unknown[]): () => void {
  const original = globalThis.fetch;
  const encoder = new TextEncoder();
  const body =
    events.map((evt) => `event: message\r\ndata: ${JSON.stringify(evt)}\r\n\r\n`).join("") +
    "event: end_of_stream\r\n\r\n";
  globalThis.fetch = (async () =>
    new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(body));
          controller.close();
        },
      }),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    )) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

test("non-streaming upstream errors sanitize the message and bound the code", async () => {
  const restore = mockPplxEvents([
    {
      error_code: "RATE_LIMIT",
      error_message:
        "quota exhausted; access token: pplx-secret-value while reading " +
        "/srv/private/pplx/request.ts:42:7\n    at send (/srv/private/pplx/request.ts:42:7)",
    },
  ]);
  try {
    const result = await new PerplexityWebExecutor().execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    } as never);

    assert.equal(result.response.status, 429, "quota wording maps to 429");
    const text = await result.response.text();
    const json = JSON.parse(text) as { error: { code: string; type: string } };

    assert.equal(json.error.code, "quota_exhausted");
    assert.equal(json.error.type, "quota_exhausted");
    assert.doesNotMatch(text, /pplx-secret-value/);
    assert.doesNotMatch(text, /\/srv\/private/);
    assert.doesNotMatch(text, /\bat send\b/);
  } finally {
    restore();
  }
});

test("an untrusted upstream error code falls back to PPLX_ERROR", () => {
  assert.equal(toPublicPerplexityErrorCode("Bearer sk-live-secret", false), "PPLX_ERROR");
  assert.equal(toPublicPerplexityErrorCode("x".repeat(65), false), "PPLX_ERROR");
  assert.equal(toPublicPerplexityErrorCode({ toString: () => "boom" }, false), "PPLX_ERROR");
  assert.equal(toPublicPerplexityErrorCode("RATE_LIMIT", true), "quota_exhausted");
  assert.equal(toPublicPerplexityErrorCode("rate_limited", false), "rate_limited");
});
