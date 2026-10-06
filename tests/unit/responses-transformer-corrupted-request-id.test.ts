// Regression guard for #10223: DeepSeek's SSE encoder bug leaks response-ID
// fragments into `request_id`, producing suspiciously long (200+ char) values.
// The transformer never reads `request_id` for its own output, but it must
// strip a corrupted one (logging that it did) and must NOT touch a normal,
// well-behaved provider's request_id.
import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } = await import(
  "../../open-sse/transformer/responsesTransformer.ts"
);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function runTransformStream(chunks, logger = null) {
  const stream = createResponsesApiTransformStream(logger, 3000, {});
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();

  const output = [];
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      output.push(decoder.decode(value));
    }
  })();

  for (const chunk of chunks) {
    await writer.write(encoder.encode(chunk));
  }
  await writer.close();
  await readerTask;

  return output.join("");
}

function makeMockLogger() {
  const inputs = [];
  return {
    inputs,
    logInput: (event) => inputs.push(event),
    logOutput: () => {},
    flush: () => {},
  };
}

test("BUG #10223: a corrupted (>=200 char) request_id is stripped and logged", async () => {
  const corruptedId = "r".repeat(250);
  const logger = makeMockLogger();

  await runTransformStream(
    [
      `data: {"id":"chatcmpl_1","request_id":"${corruptedId}","choices":[{"index":0,"delta":{"content":"Hi"}}]}\n\n`,
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
    ],
    logger
  );

  const stripLog = logger.inputs.find(
    (entry) => typeof entry === "string" && entry.includes("stripped corrupted request_id")
  );
  assert.ok(stripLog, "logger.logInput should be called noting the corrupted request_id was stripped");
  assert.match(stripLog, /\(250 chars\)/);
});

test("a normal (<200 char) request_id is left untouched — no strip logged", async () => {
  const logger = makeMockLogger();

  await runTransformStream(
    [
      'data: {"id":"chatcmpl_1","request_id":"req_normal_12345","choices":[{"index":0,"delta":{"content":"Hi"}}]}\n\n',
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
    ],
    logger
  );

  const stripLog = logger.inputs.find(
    (entry) => typeof entry === "string" && entry.includes("stripped corrupted request_id")
  );
  assert.equal(stripLog, undefined, "a normal-length request_id must never be stripped");
});
