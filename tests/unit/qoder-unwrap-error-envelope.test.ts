import test from "node:test";
import assert from "node:assert/strict";

import { QoderExecutor, __test__ } from "../../open-sse/executors/qoder.ts";

const { unwrapQoderEnvelope } = __test__;

function sseResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/event-stream" },
  });
}

test("unwrapQoderEnvelope: surfaces an embedded non-200 statusCodeValue as a real HTTP error", async () => {
  // Qoder wraps an upstream 429 inside a 200 SSE envelope. Before the fix this
  // passed straight through as a 200, so combo/account fallback never fired.
  const wrapped = sseResponse(
    'data: {"statusCodeValue":429,"body":"rate limit exceeded"}\n\ndata: [DONE]\n\n'
  );

  const result = await unwrapQoderEnvelope(wrapped);

  assert.equal(result.status, 429, "embedded 429 must become a real HTTP 429");
  const payload = (await result.json()) as any;
  assert.match(payload.error.message, /qoder error 429/);
  assert.match(payload.error.message, /rate limit exceeded/);
});

test("unwrapQoderEnvelope: maps a sub-400 embedded status to 502", async () => {
  const wrapped = sseResponse('data: {"statusCodeValue":302,"body":"redirect"}\n\n');

  const result = await unwrapQoderEnvelope(wrapped);

  assert.equal(result.status, 502);
});

test("unwrapQoderEnvelope: classifies embedded 401 as an authentication_error", async () => {
  const wrapped = sseResponse('data: {"statusCodeValue":401,"body":"invalid token"}\n\n');

  const result = await unwrapQoderEnvelope(wrapped);

  assert.equal(result.status, 401);
  const payload = (await result.json()) as any;
  assert.equal(payload.error.type, "authentication_error");
});

test("unwrapQoderEnvelope: passes a successful stream through with the first chunk intact", async () => {
  const wrapped = sseResponse(
    'data: {"choices":[{"delta":{"content":"O"}}]}\n\ndata: {"choices":[{"delta":{"content":"K"}}]}\n\ndata: [DONE]\n\n'
  );

  const result = await unwrapQoderEnvelope(wrapped);

  assert.equal(result.status, 200);
  const body = await result.text();
  // The first chunk must not be swallowed by the peek.
  assert.match(body, /"content":"O"/);
  assert.match(body, /"content":"K"/);
  assert.match(body, /\[DONE\]/);
});

test("unwrapQoderEnvelope: an empty stream becomes a 502 error", async () => {
  const result = await unwrapQoderEnvelope(sseResponse(""));
  assert.equal(result.status, 502);
});

test("unwrapQoderEnvelope: a non-ok response is returned unchanged", async () => {
  const errResp = sseResponse("nope", 500);
  const result = await unwrapQoderEnvelope(errResp);
  assert.equal(result, errResp);
});

test("QoderExecutor: stream call surfaces an embedded error envelope as a real HTTP status", async () => {
  const executor = new QoderExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    sseResponse('data: {"statusCodeValue":429,"body":"quota exceeded"}\n\ndata: [DONE]\n\n');

  try {
    const { response } = await executor.execute({
      model: "qoder-rome-30ba3b",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "pat_test" },
    });

    // Before the port this was a 200 — fallback could never trigger.
    assert.equal(response.status, 429);
    const payload = (await response.json()) as any;
    assert.match(payload.error.message, /qoder error 429/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
