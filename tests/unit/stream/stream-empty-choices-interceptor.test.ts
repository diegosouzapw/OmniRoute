import test from "node:test";
import assert from "node:assert/strict";

const { createSSETransformStreamWithLogger } = await import(
  "../../../open-sse/utils/stream.ts"
);
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

async function drainTransform(
  transformStream: TransformStream<Uint8Array, Uint8Array>,
  frames: string[]
): Promise<{ output: string; errored: boolean }> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });

  const reader = upstream.pipeThrough(transformStream).getReader();
  const parts: string[] = [];
  let errored = false;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) parts.push(decoder.decode(value));
    }
  } catch {
    errored = true;
  }
  return { output: parts.join(""), errored };
}

function geminiContentChunk(text: string): string {
  return `data: ${JSON.stringify({
    candidates: [{ content: { parts: [{ text }] } }],
  })}\n\n`;
}

function geminiFinishChunk(): string {
  return `data: ${JSON.stringify({ candidates: [{ finishReason: "STOP" }] })}\n\n`;
}

function emptyChoicesChunk(id = "1"): string {
  return `data: ${JSON.stringify({
    id: `chatcmpl-${id}`,
    object: "chat.completion.chunk",
    model: "gemini-test",
    choices: [],
  })}\n\n`;
}

test("#9268 an all-empty-choices stream is rejected as a retryable error", async () => {
  const transform = createSSETransformStreamWithLogger(
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    "gemini-test",
    null,
    null,
    "gemini-model",
    "conn-1",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null,
    null
  );

  const { output, errored } = await drainTransform(transform, [
    emptyChoicesChunk("1"),
    emptyChoicesChunk("2"),
  ]);

  // The translate-mode flush now errors the stream when no valuable chunk was
  // forwarded, so the client must NOT see a clean empty 200 with just [DONE].
  assert.ok(
    errored || !output.includes("[DONE]"),
    "an all-empty stream must not complete cleanly with a [DONE] terminator"
  );
});

test("#9268 a stream with real content passes through unchanged", async () => {
  const transform = createSSETransformStreamWithLogger(
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    "gemini-test",
    null,
    null,
    "gemini-model",
    "conn-2",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null,
    null
  );

  const { output, errored } = await drainTransform(transform, [
    geminiContentChunk("hello"),
    geminiFinishChunk(),
  ]);

  assert.ok(output.includes("hello"), "content must be forwarded");
  assert.equal(errored, false, "a healthy stream must not error");
});

test("#9268 empty choices after real content still passes through (mid-stream usage-only)", async () => {
  const transform = createSSETransformStreamWithLogger(
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    "gemini-test",
    null,
    null,
    "gemini-model",
    "conn-3",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null,
    null
  );

  const { output, errored } = await drainTransform(transform, [
    geminiContentChunk("real output"),
    emptyChoicesChunk("1"),
    geminiFinishChunk(),
  ]);

  assert.ok(output.includes("real output"), "content must be forwarded");
  assert.equal(errored, false, "a stream with content then empty usage chunk must not error");
});
