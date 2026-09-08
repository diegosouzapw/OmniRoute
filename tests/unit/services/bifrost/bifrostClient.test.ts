import { test } from "node:test";
import assert from "node:assert/strict";
import { dispatchToBifrost } from "../../../../src/shared/services/bifrost/bifrostClient.ts";

const ORIGINAL_FETCH = globalThis.fetch;

test("bifrostClient: dispatchToBifrost sends unary request and parses response", async () => {
  let capturedHeaders: Headers | null = null;
  let capturedBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (_input, init) => {
    capturedHeaders = new Headers(init?.headers);
    capturedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response(JSON.stringify({ id: "chatcmpl-123", choices: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", {
    method: "POST",
    headers: { "x-request-id": "req-xyz", authorization: "Bearer client-token" },
  });

  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", messages: [{ role: "user", content: "hello" }] },
    config: {
      baseUrl: "http://127.0.0.1:8080",
      apiKey: "bifrost-secret",
      timeoutMs: 5000,
      streamingEnabled: true,
      enabled: true,
    },
  });

  assert.equal(result.statusCode, 200);
  assert.equal(result.timedOut, false);
  assert.equal(result.response.headers.get("X-Routed-By"), "bifrost");
  assert.equal(capturedHeaders?.get("Authorization"), "Bearer bifrost-secret");
  assert.equal(capturedHeaders?.get("x-request-id"), "req-xyz");
  assert.equal(capturedBody?.model, "gpt-4");

  globalThis.fetch = ORIGINAL_FETCH;
});

test("bifrostClient: dispatchToBifrost handles streaming response and finalizer", async () => {
  let recordedStatus: string | null = null;
  let recordedCode: number | null = null;

  globalThis.fetch = async () => {
    return new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n'));
          controller.close();
        },
      }),
      {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      }
    );
  };

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", {
    method: "POST",
  });

  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", stream: true, messages: [] },
    config: {
      baseUrl: "http://127.0.0.1:8080",
      timeoutMs: 5000,
      streamingEnabled: true,
      enabled: true,
    },
    onUsageRecorded: (status, statusCode) => {
      recordedStatus = status;
      recordedCode = statusCode;
    },
  });

  assert.equal(result.statusCode, 200);
  assert.equal(result.response.headers.get("X-Routed-By"), "bifrost");

  const streamText = await result.response.text();
  assert.match(streamText, /Hi/);
  assert.equal(recordedStatus, "success");
  assert.equal(recordedCode, 200);

  globalThis.fetch = ORIGINAL_FETCH;
});
