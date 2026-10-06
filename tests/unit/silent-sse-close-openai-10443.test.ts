/**
 * Regression test for #10443 — silent SSE truncation on OpenAI chat completions.
 *
 * The reporter's symptom: HTTP 200, a few content chunks forwarded, then the
 * upstream (antigravity/Gemini) drops the stream without a terminal marker —
 * no finish_reason chunk, no `data: [DONE]`. OmniRoute used to close the stream
 * silently, so OpenAI-compatible clients (Hermes) see a truncated stream with
 * no finish_reason at all.
 *
 * #7699 fixed this shape for Claude-format clients only; the resolver
 * deliberately returned null for every other format because "many formats have
 * no [DONE] equivalent". That reasoning does not hold for OpenAI chat
 * completions: a healthy OpenAI stream ALWAYS carries either a finish_reason
 * chunk (translator/upstream) or `data: [DONE]`. So a close that forwarded
 * content but no terminal marker is a failure there too, and must surface a
 * synthetic error chunk instead of a silent close.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function createNoopAbortWritableStream(): { getWriter: () => { abort: () => Promise<void> } } {
  return { getWriter: () => ({ abort: () => Promise.resolve() }) };
}

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

/**
 * Wire a synthetic upstream byte stream (already in client format) through
 * createDisconnectAwareStream with the given clientResponseFormat and return
 * everything the client would receive.
 */
async function runClientStream(
  upstreamChunks: string[],
  clientResponseFormat: string | null
): Promise<string> {
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      for (const chunk of upstreamChunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
  const transformedBody = upstream.pipeThrough(transform);

  const sc = createStreamController({
    provider: "antigravity",
    model: "gemini-3.6-flash-medium",
    clientResponseFormat,
  });

  const wrapped = createDisconnectAwareStream(
    { readable: transformedBody, writable: createNoopAbortWritableStream() },
    sc
  );

  return drainStream(wrapped);
}

test("#10443 OpenAI format: content then bare close emits synthetic error, not a silent truncation", async () => {
  const text = await runClientStream(
    ['data: {"choices":[{"index":0,"delta":{"content":"partial"},"finish_reason":null}]}\n\n'],
    FORMATS.OPENAI
  );

  // The forwarded content survives...
  assert.match(text, /partial/);
  // ...and the close must be flagged, OpenAI style: error chunk + [DONE].
  assert.match(text, /"finish_reason":\s*"error"/);
  assert.match(text, /data: \[DONE\]/);
  assert.match(text, /Upstream stream ended without a terminal marker/);
});

test("#10443 OpenAI format: finish_reason chunk counts as terminal, no synthetic error", async () => {
  // Upstream that legitimately closes WITHOUT `data: [DONE]` but WITH a
  // finish_reason chunk (some OpenAI-compatible providers do exactly this).
  const text = await runClientStream(
    [
      'data: {"choices":[{"index":0,"delta":{"content":"partial"},"finish_reason":null}]}\n\n',
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
    ],
    FORMATS.OPENAI
  );

  assert.match(text, /partial/);
  assert.doesNotMatch(text, /Upstream stream ended without a terminal marker/);
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
});

test("#10443 OpenAI format: data: [DONE] close is unchanged, no synthetic error", async () => {
  const text = await runClientStream(
    [
      'data: {"choices":[{"index":0,"delta":{"content":"partial"},"finish_reason":null}]}\n\n',
      "data: [DONE]\n\n",
    ],
    FORMATS.OPENAI
  );

  assert.match(text, /partial/);
  assert.doesNotMatch(text, /Upstream stream ended without a terminal marker/);
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
});

test("#10443 OpenAI format: content-free close keeps the #8649 empty-content verdict", async () => {
  // An SSE frame with no content forwarded: the #8649 empty-content rule must
  // keep its verdict (the no-marker rule only applies when content was forwarded).
  const text = await runClientStream(
    ['data: {"choices":[{"index":0,"delta":{},"finish_reason":null}]}\n\n'],
    FORMATS.OPENAI
  );

  assert.match(text, /Provider returned empty content/);
  assert.doesNotMatch(text, /Upstream stream ended without a terminal marker/);
});

test("#10443 OpenAI format: literal finish_reason text inside model content does not count as a terminal marker", async () => {
  // The model itself outputs a JSON snippet containing `"finish_reason": "stop"`.
  // JSON.stringify escapes the inner quotes, so the raw SSE bytes carry
  // `\"finish_reason\": \"stop\"` inside delta.content — the terminal-marker
  // regex requires an unescaped field and must NOT match it. If it did, the
  // clientTerminalSeen flag would trip early and a real mid-stream drop after
  // such content would be misread as a clean completion.
  const text = await runClientStream(
    [
      'data: {"choices":[{"index":0,"delta":{"content":"a stream ends with \\"finish_reason\\": \\"stop\\""},"finish_reason":null}]}\n\n',
    ],
    FORMATS.OPENAI
  );

  // No real terminal marker was forwarded, so the close is still flagged.
  assert.match(text, /Upstream stream ended without a terminal marker/);
  assert.match(text, /"finish_reason":\s*"error"/);
});
