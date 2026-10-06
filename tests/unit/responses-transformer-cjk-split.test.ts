import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #10223 — DeepSeek /v1/responses corrupted SSE deltas.
//
// ROOT CAUSE (open-sse/transformer/responsesTransformer.ts:580): the transform()
// handler created a brand-new `new TextDecoder()` on every chunk and decoded it
// WITHOUT `{ stream: true }`. A stream:false decoder has no cross-call state, so
// whenever a multi-byte UTF-8 character (CJK: 3 bytes, emoji: 4) is split across
// two TCP chunks — the normal case in Chinese streaming text (the reporter's
// scenario), the trailing partial bytes are replaced with U+FFFD and the deltas
// accumulate garbage.
//
// This test feeds a CJK text split at a byte boundary INSIDE a multi-byte
// character and asserts a round-trip against the source text — NOT the
// `join(deltas) === done` invariant, which cannot catch this bug because done is
// rebuilt from the same corrupted buffer as the deltas.

const { createResponsesApiTransformStream } = await import(
  "../../open-sse/transformer/responsesTransformer.ts"
);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function concatBytes(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function parseSseOutput(output) {
  return output
    .trim()
    .split("\n\n")
    .map((entry) => {
      const lines = entry.split("\n");
      const eventLine = lines.find((line) => line.startsWith("event: "));
      const dataLine = lines.find((line) => line.startsWith("data: "));
      return {
        event: eventLine ? eventLine.slice("event: ".length) : null,
        data: dataLine ? dataLine.slice("data: ".length) : null,
      };
    })
    .filter((e) => e.event !== null || e.data !== null);
}

async function runRawBytes(byteChunks, options = {}) {
  const stream = createResponsesApiTransformStream(null, 3000, options);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();

  const raw = [];
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) raw.push(value);
    }
  })();

  for (const chunk of byteChunks) {
    await writer.write(chunk);
  }
  await writer.close();
  await readerTask;

  return decoder.decode(concatBytes(raw));
}

test("responses transform preserves multi-byte UTF-8 text split across byte chunks (#10223)", async () => {
  const source = "REASONIX_中文测试_DEEPSEEK_OK";

  const frame = (data) =>
    encoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  const deltaChunk = frame({
    choices: [{ index: 0, delta: { content: source } }],
  });
  const finishChunk = frame({
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  });
  const full = concatBytes([deltaChunk, finishChunk]);

  // Split mid-byte inside the first 3-byte CJK character "中".
  const contentPrefix = encoder.encode(
    'data: {"choices":[{"index":0,"delta":{"content":"'
  ).length;
  const boundary = contentPrefix + encoder.encode("REASONIX_").length + 1;
  const chunkA = full.slice(0, boundary);
  const chunkB = full.slice(boundary);

  const output = await runRawBytes([chunkA, chunkB]);

  const events = parseSseOutput(output);
  const deltas = events
    .filter((e) => e.event === "response.output_text.delta")
    .map((e) => JSON.parse(e.data).delta);

  const doneEvent = events.find((e) => e.event === "response.output_text.done");
  const doneText = JSON.parse(doneEvent.data).text;

  // Round-trip against the SOURCE text — the invariant the old test missed.
  assert.equal(deltas.join(""), source, "joined deltas should round-trip to the source text");
  assert.equal(doneText, source, "done snapshot should round-trip to the source text");
});