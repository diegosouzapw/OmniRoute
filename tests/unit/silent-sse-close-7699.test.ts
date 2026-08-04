/**
 * Regression test for #7699 — silent SSE close on mid-stream upstream failure (/v1/messages).
 *
 * When the upstream SSE stream fails mid-flight (after bytes have been forwarded
 * to the client) and the upstream drops without emitting a terminal marker,
 * OmniRoute used to silently close the connection with no terminal `event: error`
 * or `message_stop` for Anthropic-format clients. Claude Code and the Anthropic SDK
 * then report "Connection closed mid-response. The response above may be incomplete."
 *
 * Two code paths must emit a synthetic terminal frame:
 *   1. `buildStreamErrorChunks` for the Claude format must follow `event: error`
 *      with `event: message_stop` (the Anthropic stream terminator).
 *   2. `createDisconnectAwareStream`'s `if (done)` branch must emit a synthetic
 *      error + terminal frame when upstream ends without a client-visible
 *      terminal marker (silent mid-stream drop).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildStreamErrorChunks, createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function decodeChunks(chunks: Uint8Array[]): string {
  return new TextDecoder().decode(
    (chunks as Uint8Array[]).reduce((acc, c) => {
      const merged = new Uint8Array(acc.length + c.length);
      merged.set(acc, 0);
      merged.set(c, acc.length);
      return merged;
    }, new Uint8Array(0))
  );
}

test("#7699 buildStreamErrorChunks (Claude) emits event:error AND event:message_stop", () => {
  const chunks = buildStreamErrorChunks(
    "Upstream stream error",
    502,
    FORMATS.CLAUDE
  ) as Uint8Array[];
  const text = decodeChunks(chunks);

  // Must include an error event...
  assert.match(text, /event: error\r?\n/);
  assert.match(text, /"type":\s*"error"/);
  assert.match(text, /"message":\s*"Upstream stream error"/);

  // ...AND a message_stop terminator so Anthropic SDK / Claude Code
  // don't see a silent mid-response close (#7699).
  assert.match(text, /event: message_stop\r?\n/);
  assert.match(text, /"type":\s*"message_stop"/);
});

test("#7699 buildStreamErrorChunks (Claude) emits error before message_stop", () => {
  const chunks = buildStreamErrorChunks("rate limited", 429, FORMATS.CLAUDE) as Uint8Array[];
  const text = decodeChunks(chunks);

  const errorIdx = text.indexOf("event: error");
  const stopIdx = text.indexOf("event: message_stop");
  assert.notEqual(errorIdx, -1, "expected event: error in output");
  assert.notEqual(stopIdx, -1, "expected event: message_stop in output");
  assert.ok(errorIdx < stopIdx, "event: error must precede event: message_stop");
});

test("#7699 buildStreamErrorChunks (OpenAI) still emits [DONE] terminator (unchanged)", () => {
  const chunks = buildStreamErrorChunks("Upstream stream error", 502, null) as Uint8Array[];
  const text = decodeChunks(chunks);

  // OpenAI format: finish_reason error + [DONE]
  assert.match(text, /"finish_reason":\s*"error"/);
  assert.match(text, /data: \[DONE\]/);
  // Must NOT include Claude-only markers
  assert.doesNotMatch(text, /message_stop/);
});

test("#7699 buildStreamErrorChunks (Responses) emits response.failed (unchanged)", () => {
  const chunks = buildStreamErrorChunks(
    "Upstream stream error",
    502,
    FORMATS.OPENAI_RESPONSES
  ) as Uint8Array[];
  const text = decodeChunks(chunks);

  assert.match(text, /event: response\.failed\r?\n/);
  // Must NOT include Claude-only markers
  assert.doesNotMatch(text, /message_stop/);
});

/**
 * Helper: build a minimal TransformStream that forwards bytes unchanged
 * so createDisconnectAwareStream can wrap it. We then feed it a synthetic
 * upstream that ends (`done`) without ever emitting a terminal SSE marker.
 */
function buildPassthroughTransform(): TransformStream<Uint8Array, Uint8Array> {
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
}

/**
 * Collect all bytes from a ReadableStream into a string.
 */
async function drainStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const parts: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
  }
  return new TextDecoder().decode(
    parts.reduce((acc, c) => {
      const merged = new Uint8Array(acc.length + c.length);
      merged.set(acc, 0);
      merged.set(c, acc.length);
      return merged;
    }, new Uint8Array(0))
  );
}

test("#7699 createDisconnectAwareStream emits synthetic error when upstream ends without terminal marker (Claude)", async () => {
  // Upstream sends some partial content then ends (done=true) without
  // ever emitting message_stop — reproduces the silent mid-stream close.
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode(
          'data: {"type":"content_block_delta","delta":{"text":"partial"}}\n\n'
        )
      );
      controller.close();
    },
  });

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });

  // Pipe the upstream through the transform; the result is a ReadableStream.
  const transformedBody = upstream.pipeThrough(transform);

  const sc = createStreamController({
    provider: "test",
    model: "test-model",
    clientResponseFormat: FORMATS.CLAUDE,
  });

  // createDisconnectAwareStream expects { readable, writable } — mirrors
  // the shape produced by pipeWithDisconnect.
  const wrapped = createDisconnectAwareStream(
    { readable: transformedBody, writable: createNoopAbortWritableStream() },
    sc
  );

  const text = await drainStream(wrapped);

  // Must contain the partial content that was forwarded...
  assert.match(text, /content_block_delta/);
  // ...AND the synthetic terminal frames (error + message_stop) — NOT a silent close.
  assert.match(text, /event: error\r?\n/);
  assert.match(text, /event: message_stop\r?\n/);
  assert.match(text, /Upstream stream ended without a terminal marker/);
});

// Minimal noop writable for the test wiring (mirrors createNoopAbortWritable).
function createNoopAbortWritableStream(): { getWriter: () => { abort: () => Promise<void> } } {
  return { getWriter: () => ({ abort: () => Promise.resolve() }) };
}
