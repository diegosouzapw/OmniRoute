// Codex sometimes answers HTTP 200 with a perfectly normal Responses SSE stream
// whose ONLY output is the text "Our servers are currently overloaded. Please try
// again later." delivered as `response.output_text.delta`. Because the first
// non-empty text delta counts as peek progress, the stream used to be handed to the
// client as a valid answer — no retry, no account fallback. The peek must hold the
// stream while the output is still a prefix of that exact message and classify a
// stream whose whole output IS the message as a transient failure (→ 503).
import test from "node:test";
import assert from "node:assert/strict";

import {
  CodexExecutor,
  __setCodexWebSocketTransportForTesting,
  peekCodexSseTransientError,
} from "../../open-sse/executors/codex.ts";

const OVERLOAD_MESSAGE = "Our servers are currently overloaded. Please try again later.";
const READ_TIMEOUT_MS = 50;

test.afterEach(() => {
  __setCodexWebSocketTransportForTesting(undefined);
});

function sseStreamFromChunks(
  chunks: string[],
  { keepOpen = false }: { keepOpen?: boolean } = {}
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) {
        // keepOpen simulates an upstream socket that stays open after the last
        // frame: the pull never resolves, so a read only ends by timing out.
        if (keepOpen) return new Promise<void>(() => {});
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[i]));
      i++;
    },
  });
}

function sseResponse(chunks: string[], opts?: { keepOpen?: boolean }): Response {
  return new Response(sseStreamFromChunks(chunks, opts), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function sseFrame(payload: Record<string, unknown>): string {
  return `event: ${String(payload.type)}\ndata: ${JSON.stringify(payload)}\n\n`;
}

function textDelta(delta: string): string {
  return sseFrame({ type: "response.output_text.delta", delta });
}

async function readAll(body: ReadableStream<Uint8Array> | null): Promise<string> {
  assert.ok(body, "expected a replacement body for a pass-through stream");
  return new Response(body).text();
}

test("peek classifies the overload message split across SSE chunks as codex_overloaded_output", async () => {
  const response = sseResponse([
    "event: response.output_text.delta\n",
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Our servers are currently " })}\n\n`,
    textDelta("overloaded. Please try again later."),
  ]);

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, "codex_overloaded_output");
  assert.equal(peek.message, OVERLOAD_MESSAGE);
  assert.equal(peek.replacementBody, null);
});

test("peek classifies created + overload delta + completed lifecycle as codex_overloaded_output", async () => {
  const response = sseResponse([
    sseFrame({ type: "response.created", response: { id: "resp_1", status: "in_progress" } }),
    textDelta(OVERLOAD_MESSAGE),
    sseFrame({ type: "response.output_text.done", text: OVERLOAD_MESSAGE }),
    sseFrame({ type: "response.completed", response: { id: "resp_1", status: "completed" } }),
  ]);

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, "codex_overloaded_output");
  assert.equal(peek.message, OVERLOAD_MESSAGE);
});

test("peek classifies the overload once response.completed arrives even if the socket stays open", async () => {
  const response = sseResponse(
    [
      textDelta(OVERLOAD_MESSAGE),
      sseFrame({ type: "response.completed", response: { id: "resp_1", status: "completed" } }),
    ],
    { keepOpen: true }
  );

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, "codex_overloaded_output");
  assert.notEqual(peek.timedOut, true);
});

test("peek matches the overload message case-insensitively and ignoring surrounding whitespace", async () => {
  const response = sseResponse([
    textDelta("  our servers are currently OVERLOADED. please try again later.\n"),
  ]);

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, "codex_overloaded_output");
  assert.equal(peek.message, OVERLOAD_MESSAGE);
});

test("peek does not classify similar legitimate output and keeps the body byte-identical", async () => {
  const text = textDelta("Our servers are currently processing your request.");
  const response = sseResponse([text]);

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, null);
  assert.equal(await readAll(peek.replacementBody), text);
});

test("peek does not classify an answer that quotes the overload message and continues", async () => {
  const chunks = [
    textDelta(OVERLOAD_MESSAGE),
    textDelta(" This upstream message means the request should be retried."),
  ];
  const response = sseResponse(chunks);

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, null);
  assert.equal(await readAll(peek.replacementBody), chunks.join(""));
});

test("peek still hands a function-call delta stream off immediately (no extra buffering)", async () => {
  const first = sseFrame({
    type: "response.function_call_arguments.delta",
    item_id: "fc_1",
    delta: '{"city":',
  });
  // The second frame would only be peeked if the function-call delta failed to
  // count as progress; keepOpen turns that regression into a timeout.
  const response = sseResponse([first], { keepOpen: true });

  const peek = await peekCodexSseTransientError(response, READ_TIMEOUT_MS);

  assert.equal(peek.matched, null);
  assert.notEqual(peek.timedOut, true);
  assert.ok(peek.replacementBody, "expected the stream to be passed through");
});

test("CodexExecutor.execute converts the fake-200 overload output stream into a 503", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    sseResponse([
      sseFrame({ type: "response.created", response: { id: "resp_1", status: "in_progress" } }),
      textDelta(OVERLOAD_MESSAGE),
      sseFrame({ type: "response.completed", response: { id: "resp_1", status: "completed" } }),
    ]);

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.equal(result.response.status, 503);
    const body = await result.response.json();
    assert.match(body.error.message, /currently overloaded/i);
    // Hard Rule #12: never leak raw stack/paths in the sanitized error body.
    assert.equal(body.error.message.includes("at /"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
