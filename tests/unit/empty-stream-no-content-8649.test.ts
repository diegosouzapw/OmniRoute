/**
 * #8649 — a stream that terminates correctly but carries no content must not
 * close silently.
 *
 * The non-streaming path already refuses this: `isEmptyContentResponse` rewrites
 * a 200-with-no-content into a 502 "Provider returned empty content", which the
 * combo layer then treats as a model-level transient and fails over (#5085).
 *
 * The streaming path has no equivalent. Two guards exist and neither applies:
 *
 *   - `ensureStreamReadiness` is a LIVENESS probe. Its own failure message is
 *     "Stream ended before producing a non-ping SSE event" — any structured
 *     non-ping frame satisfies it, including a bare `delta:{"role":"assistant"}`.
 *   - `createDisconnectAwareStream`'s #7699 branch fires on a MISSING terminal
 *     marker and is scoped to the Claude client format, because for other
 *     formats a marker-less close is not necessarily a drop.
 *
 * The reported stream trips neither: it is OpenAI-format, it terminates with
 * `finish_reason: "stop"` and `[DONE]`, and it contains nothing. The client
 * (issue #8649: an `auto/*` combo landing on an uncredentialed backend) sees a
 * clean empty assistant turn and retries to its cap with no error to stop on.
 *
 * "Terminated normally but emitted zero content" is unambiguous in every format,
 * unlike the marker case — so this guard is deliberately format-agnostic. The
 * legitimate-empty terminal states are carved out to match the non-streaming
 * predicate's `LEGIT_EMPTY_OPENAI_FINISH` / `LEGIT_EMPTY_CLAUDE_STOP`.
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

/** Run `frames` through the disconnect-aware wrapper and return what the client sees. */
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

test("#8649 an OpenAI stream that finishes with stop but no content surfaces an error", async () => {
  const text = await runClientStream(
    [chunk('{"role":"assistant"}', "null"), chunk("{}", '"stop"'), DONE],
    null
  );

  assert.match(
    text,
    /"finish_reason":\s*"error"/,
    "a completed-but-contentless stream must surface an error, not a clean empty turn"
  );
  assert.match(text, /empty|no content/i);
});

test("#8649 a stream that carries content is passed through untouched", async () => {
  const text = await runClientStream(
    [
      chunk('{"role":"assistant"}', "null"),
      chunk('{"content":"hello"}', "null"),
      chunk("{}", '"stop"'),
      DONE,
    ],
    null
  );

  assert.match(text, /"content":"hello"/);
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/, "a healthy stream must not be rewritten");
});

test("#8649 a tool-call-only stream is a legitimate completion, not an empty one", async () => {
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
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/, "a tool-call turn must not be flagged");
});

test("#8649 finish_reason length with no content is a legitimate truncation, not an error", async () => {
  // Mirrors LEGIT_EMPTY_OPENAI_FINISH in errorClassifier.ts — a response
  // truncated at the token limit is a valid terminal state even with no text.
  const text = await runClientStream(
    [chunk('{"role":"assistant"}', "null"), chunk("{}", '"length"'), DONE],
    null
  );

  assert.doesNotMatch(
    text,
    /"finish_reason":\s*"error"/,
    "a token-limit truncation must not be rewritten as an error"
  );
});

test("#8649 finish_reason content_filter with no content is a legitimate terminal state", async () => {
  const text = await runClientStream(
    [chunk('{"role":"assistant"}', "null"), chunk("{}", '"content_filter"'), DONE],
    null
  );

  assert.doesNotMatch(text, /"finish_reason":\s*"error"/, "a filtered turn must not be rewritten");
});

test("#8649 a reasoning-only stream counts as content (#2520)", async () => {
  const text = await runClientStream(
    [chunk('{"reasoning_content":"thinking out loud"}', "null"), chunk("{}", '"stop"'), DONE],
    null
  );

  assert.doesNotMatch(
    text,
    /"finish_reason":\s*"error"/,
    "reasoning-only output is real model output, not an empty turn"
  );
});

test("#8649 a non-SSE body is never judged empty — it has no frames to judge", async () => {
  // Not every body reaching this wrapper is event-stream; a plain completion is
  // forwarded through the same path. It has no `data:` frames, so "no content
  // seen" says nothing about it and the guard must stay out of the way.
  const text = await runClientStream(["plain forwarded bytes, no completion marker"], null);

  assert.equal(text, "plain forwarded bytes, no completion marker");
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
  assert.doesNotMatch(text, /event: error/);
});

test("#8649 the Claude-format contentless stream is caught too", async () => {
  const frames = [
    'event: message_start\ndata: {"type":"message_start","message":{"id":"m","content":[]}}\n\n',
    'event: message_stop\ndata: {"type":"message_stop"}\n\n',
  ];
  const text = await runClientStream(frames, FORMATS.CLAUDE);

  assert.match(text, /event: error\r?\n/, "a contentless Claude stream must surface an error");
});
