// PR #7045 (@oyi77, performance.mark/measure SSE instrumentation) regression coverage +
// fix for a review-flagged leak: the "omni-request-body-size" mark is created on every
// createSSEStream() call with a fixed name and, before this fix, was never cleared —
// each call added another entry to Node's global performance timeline, unbounded over a
// long-running server's lifetime. It must now be observable (via PerformanceObserver,
// which still fires synchronously) yet cleared from the buffer immediately after.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-stream-body-size-mark-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

async function drainSSEStream(options) {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(
        textEncoder.encode(
          `data: ${JSON.stringify({
            id: "chatcmpl_bodysize",
            object: "chat.completion.chunk",
            created: 1,
            model: "gpt-4.1-mini",
            choices: [{ index: 0, delta: { role: "assistant", content: "hi" } }],
          })}\n\n`
        )
      );
      controller.enqueue(
        textEncoder.encode(
          `data: ${JSON.stringify({
            id: "chatcmpl_bodysize",
            object: "chat.completion.chunk",
            created: 1,
            model: "gpt-4.1-mini",
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          })}\n\n`
        )
      );
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options))).text();
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("createSSEStream emits a request-body-size mark with the JSON byte length as detail", async (t) => {
  const observedMarks = [];
  const originalMark = performance.mark.bind(performance);
  t.mock.method(performance, "mark", (name, options) => {
    if (name === "omni-request-body-size") observedMarks.push(options?.detail);
    return originalMark(name, options);
  });

  const body = { messages: [{ role: "user", content: "hello world" }] };
  const expectedBytes = Buffer.byteLength(JSON.stringify(body), "utf8");

  await drainSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "gpt-4.1-mini",
    body,
  });

  assert.equal(observedMarks.length, 1, "mark() should have been called exactly once");
  assert.equal(observedMarks[0], expectedBytes, "mark detail should be the JSON byte length");
});

test("createSSEStream clears the request-body-size mark immediately (no unbounded growth)", async () => {
  performance.clearMarks("omni-request-body-size");

  const body = { messages: [{ role: "user", content: "hello" }] };
  for (let i = 0; i < 5; i++) {
    await drainSSEStream({
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body,
    });
  }

  assert.equal(
    performance.getEntriesByName("omni-request-body-size").length,
    0,
    "the mark must not accumulate across repeated calls"
  );
});

test("createSSEStream skips the mark when body is absent (bodySize stays 0)", async () => {
  performance.clearMarks("omni-request-body-size");

  await drainSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "gpt-4.1-mini",
  });

  assert.equal(
    performance.getEntriesByName("omni-request-body-size").length,
    0,
    "no mark expected when there is no request body"
  );
});
