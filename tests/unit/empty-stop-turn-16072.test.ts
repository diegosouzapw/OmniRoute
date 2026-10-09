/**
 * #16072 — a valid empty assistant turn is an answer, not a provider failure.
 *
 * When the model's correct answer is "no reply needed", upstreams end the turn
 * normally with `finish_reason: "stop"` (OpenAI) or `stop_reason: "end_turn"`
 * (Claude) and no content. The #8649 empty-content guard saw the normal
 * terminal but did not recognise it: `LEGIT_EMPTY_TERMINAL_REASONS` lists only
 * length/tool_calls/content_filter/max_tokens/tool_use, so the stream was
 * rewritten into "Provider returned empty content", the combo failed over and
 * retried to its cap, and the client got 502 — the reporter measured 22
 * upstream attempts / ~5.18M input tokens for one 235K-token turn.
 *
 * Fix (mirrors the philosophy upstream already accepted in #15505 and
 * #14160): a terminal frame the CLIENT actually received that declares a
 * normal stop is the upstream's own verdict — pass the empty turn through.
 * Streams that never delivered a terminal (a drop or an empty shell) keep
 * the #8649 verdict.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function noopAbortWritable(): { getWriter: () => { abort: () => Promise<void> } } {
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

async function runClientStream(frames: string[], format: string | null): Promise<string> {
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
  const sc = createStreamController({
    provider: "test",
    model: "test-model",
    clientResponseFormat: format,
  });
  return drainStream(
    createDisconnectAwareStream(
      { readable: upstream.pipeThrough(transform), writable: noopAbortWritable() },
      sc
    )
  );
}

const chunk = (delta: string, finish: string) =>
  `data: {"id":"chatcmpl-x","object":"chat.completion.chunk","model":"m","choices":[{"index":0,"delta":${delta},"finish_reason":${finish}}]}\n\n`;
const DONE = "data: [DONE]\n\n";

test("#16072 an OpenAI empty turn ending with finish_reason stop passes through", async () => {
  const text = await runClientStream(
    [chunk('{"role":"assistant"}', "null"), chunk("{}", '"stop"'), DONE],
    null
  );

  assert.doesNotMatch(
    text,
    /"finish_reason":\s*"error"/,
    "a normal empty stop must not be rewritten into an error"
  );
  assert.match(text, /"finish_reason":\s*"stop"/, "the client keeps the upstream terminal");
});

test("#16072 a Claude empty turn ending with end_turn passes through", async () => {
  const text = await runClientStream(
    [
      'event: message_start\ndata: {"type":"message_start","message":{"role":"assistant"}}\n\n',
      'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}\n\n',
      'event: message_stop\ndata: {"type":"message_stop"}\n\n',
    ],
    FORMATS.CLAUDE
  );

  assert.doesNotMatch(text, /empty content/i, "a clean empty end_turn is a valid answer");
});

test("#16072 a Claude empty turn ending with stop_sequence passes through", async () => {
  const text = await runClientStream(
    [
      'event: message_start\ndata: {"type":"message_start","message":{"role":"assistant"}}\n\n',
      'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"stop_sequence"}}\n\n',
      'event: message_stop\ndata: {"type":"message_stop"}\n\n',
    ],
    FORMATS.CLAUDE
  );

  assert.doesNotMatch(text, /empty content/i);
});

test("#16072 a stream dropped without any terminal keeps the empty-content verdict", async () => {
  // No terminal chunk: the upstream dropped mid-stream (or an empty shell
  // closed early). #8649 must keep catching this shape.
  const text = await runClientStream([chunk('{"role":"assistant"}', "null")], null);

  assert.match(
    text,
    /"finish_reason":\s*"error"/,
    "a drop without a terminal marker is still surfaced, not passed through"
  );
  assert.match(text, /empty|no content/i);
});

test("#16072 reasoning-only turns ending in stop still pass through", async () => {
  const text = await runClientStream(
    [
      chunk('{"role":"assistant","reasoning_content":"thinking out loud"}', "null"),
      chunk("{}", '"stop"'),
      DONE,
    ],
    null
  );

  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
});

test("#16072 a tool-call terminal remains a legitimate completion (regression)", async () => {
  const toolDelta =
    '{"tool_calls":[{"index":0,"id":"c1","function":{"name":"f","arguments":"{}"}}]}';
  const text = await runClientStream(
    [
      chunk('{"role":"assistant"}', "null"),
      chunk(toolDelta, "null"),
      chunk("{}", '"tool_calls"'),
      DONE,
    ],
    null
  );

  assert.match(text, /tool_calls/);
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
});
