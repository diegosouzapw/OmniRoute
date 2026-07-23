// Sub-bug #3 of upstream decolua/9router#2452 (@ryanngit): Codex sometimes answers
// with HTTP 200 and a text/event-stream body whose payload carries a transient
// "model at capacity" / overloaded error mid-stream. Left unhandled, the 200
// status makes this look like a successful response — no retry, no circuit
// breaker, no combo/account fallback engages, so the client either hangs or gets
// a truncated stream while a healthy account sits idle. This must be detected and
// converted into a real error Response (503) so accountFallback.ts / combo
// routing rotates to another account.
import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor, __setCodexWebSocketTransportForTesting } from "../../open-sse/executors/codex.ts";

test.afterEach(() => {
  __setCodexWebSocketTransportForTesting(undefined);
});

function sseStreamFromChunks(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[i]));
      i++;
    },
  });
}

test("CodexExecutor.execute converts a 200-OK SSE stream carrying a model-at-capacity error into a 503 Response", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      sseStreamFromChunks([
        'event: error\ndata: {"error":{"message":"Selected model is at capacity. Please try a different model."}}\n\n',
      ]),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.notEqual(result.response.status, 200);
    assert.equal(result.response.status, 503);
    const body = await result.response.json();
    assert.match(body.error.message, /at capacity/i);
    // Hard Rule #12: never leak raw stack/paths in the sanitized error body.
    assert.equal(body.error.message.includes("at /"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor.execute converts server_is_overloaded / service_unavailable_error SSE payloads into a 503 Response", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      sseStreamFromChunks([
        'event: error\ndata: {"error":{"type":"server_is_overloaded","message":"The server is overloaded. Please retry later."}}\n\n',
      ]),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.equal(result.response.status, 503);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor.execute reassembles a normal 200-OK SSE stream byte-intact after peeking for transient errors", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;

  const normalSse =
    'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"Hello"}\n\n' +
    'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';

  globalThis.fetch = async () =>
    new Response(sseStreamFromChunks([normalSse]), {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.equal(result.response.status, 200);
    const text = await result.response.text();
    assert.equal(text, normalSse);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor.execute reassembles a normal SSE stream split across multiple network chunks", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;

  const chunks = [
    'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"Hel',
    'lo"}\n\n',
    'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n',
  ];
  const expected = chunks.join("");

  globalThis.fetch = async () =>
    new Response(sseStreamFromChunks(chunks), {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.equal(result.response.status, 200);
    const text = await result.response.text();
    assert.equal(text, expected);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
