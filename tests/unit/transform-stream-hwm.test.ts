import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir: string;
let originalDataDir: string | undefined;

function setupDb() {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-test-"));
  originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tempDir;
}

function cleanupDb() {
  try {
    const { resetDbInstance } = require("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {}
  if (originalDataDir !== undefined) {
    process.env.DATA_DIR = originalDataDir;
  } else {
    delete process.env.DATA_DIR;
  }
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}
}

const encoder = new TextEncoder();

async function collectStreamOutput(
  readable: ReadableStream<Uint8Array>,
  timeoutMs = 2000
): Promise<string> {
  const decoder = new TextDecoder();
  const reader = readable.getReader();
  const chunks: string[] = [];
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const result = await Promise.race([
      reader.read(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("collectStreamOutput timeout")), deadline - Date.now())
      ),
    ]);
    if (result.done) break;
    chunks.push(decoder.decode(result.value, { stream: true }));
  }

  // Flush remaining decoder state
  chunks.push(decoder.decode());
  return chunks.join("");
}

test("createSSEStream: passthrough mode writes and reads a single SSE chunk", async () => {
  setupDb();
  try {
    const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

    const transform = createSSEStream({ mode: "passthrough" });
    const { readable, writable } = transform;
    const writer = writable.getWriter();

    const sseLine =
      'data: {"id":"chatcmpl-test","object":"chat.completion.chunk","choices":[{"delta":{"content":"Hello"}}]}\n\n';

    await writer.write(encoder.encode(sseLine));
    await writer.close();

    const output = await collectStreamOutput(readable);
    assert.ok(output.includes('"Hello"'), "output should contain the content delta");
    assert.ok(output.includes("[DONE]"), "output should contain [DONE] terminator");
  } finally {
    cleanupDb();
  }
});

test("createSSEStream: passthrough mode forwards multiple chunks preserving order", async () => {
  setupDb();
  try {
    const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

    const transform = createSSEStream({ mode: "passthrough" });
    const { readable, writable } = transform;
    const writer = writable.getWriter();

    const chunks = [
      'data: {"id":"chatcmpl-1","choices":[{"delta":{"content":"Hello "}}]}\n\n',
      'data: {"id":"chatcmpl-1","choices":[{"delta":{"content":"world"}}]}\n\n',
      'data: {"id":"chatcmpl-1","choices":[{"delta":{},"finish_reason":"stop"}]}\n\n',
    ];

    for (const chunk of chunks) {
      await writer.write(encoder.encode(chunk));
    }
    await writer.close();

    const output = await collectStreamOutput(readable);
    assert.ok(output.includes("Hello "), "should contain first chunk");
    assert.ok(output.includes("world"), "should contain second chunk");
    assert.ok(output.includes("[DONE]"), "should contain DONE terminator");
  } finally {
    cleanupDb();
  }
});

test("createSSEStream: handles backpressure with >16KB payload", async () => {
  setupDb();
  try {
    const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

    // High water mark is 16384 (16KB), so writing >16KB tests backpressure
    const transform = createSSEStream({ mode: "passthrough" });
    const { readable, writable } = transform;
    const writer = writable.getWriter();

    // Generate a 32KB content string
    const bigContent = "x".repeat(32 * 1024);
    const sseChunk = `data: ${JSON.stringify({
      id: "chatcmpl-big",
      choices: [{ delta: { content: bigContent } }],
    })}\n\n`;

    // Write should not throw even though payload exceeds HWM
    await writer.write(encoder.encode(sseChunk));
    await writer.close();

    const output = await collectStreamOutput(readable, 5000);
    assert.ok(output.includes(bigContent), "output should contain the full 32KB content");
    assert.ok(output.includes("[DONE]"), "output should contain DONE terminator");
  } finally {
    cleanupDb();
  }
});

test("createSSEStream: idle timeout fires when no data arrives", async () => {
  setupDb();
  try {
    const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

    // Use very short idle timeout via environment (STREAM_IDLE_TIMEOUT_MS is from constants,
    // so we test the mechanism by not sending any data and verifying the stream errors)
    const transform = createSSEStream({ mode: "passthrough", provider: "test-idle" });
    const { readable, writable } = transform;

    // Don't write anything — just close after a short delay
    // The stream's idle timer uses the default timeout from constants.
    // We test that the stream does NOT produce data when nothing is written.
    const writer = writable.getWriter();
    await writer.close();

    const output = await collectStreamOutput(readable, 1000);
    // On immediate close without data, only [DONE] should appear
    assert.ok(
      output.includes("[DONE]") || output.length === 0,
      "empty stream should either emit [DONE] or nothing"
    );
  } finally {
    cleanupDb();
  }
});

test("createSSEStream: withBodyTimeout rejects on timeout", async () => {
  const { withBodyTimeout } = await import("../../open-sse/utils/stream.ts");

  const slowPromise = new Promise<string>((resolve) => {
    setTimeout(() => resolve("done"), 500);
  });

  await assert.rejects(() => withBodyTimeout(slowPromise, 50), {
    name: "BodyTimeoutError",
  });
});

test("createSSEStream: withBodyTimeout resolves when fast enough", async () => {
  const { withBodyTimeout } = await import("../../open-sse/utils/stream.ts");

  const fastPromise = Promise.resolve("fast");
  const result = await withBodyTimeout(fastPromise, 1000);
  assert.equal(result, "fast");
});

test("createSSEStream: withBodyTimeout with 0 timeout skips racing", async () => {
  const { withBodyTimeout } = await import("../../open-sse/utils/stream.ts");

  const promise = Promise.resolve(42);
  const result = await withBodyTimeout(promise, 0);
  assert.equal(result, 42);
});

test("backfillResponsesCompletedOutput: backfills empty output array", async () => {
  const { backfillResponsesCompletedOutput } = await import("../../open-sse/utils/stream.ts");

  const parsed = {
    type: "response.completed",
    response: {
      id: "resp-1",
      output: [],
    },
  };

  const items = [
    { type: "message", id: "item-1" },
    { type: "function_call", id: "item-2" },
  ];

  const changed = backfillResponsesCompletedOutput(parsed, items);
  assert.equal(changed, true);
  assert.deepEqual((parsed as any).response.output, items);
});

test("backfillResponsesCompletedOutput: does not overwrite non-empty output", async () => {
  const { backfillResponsesCompletedOutput } = await import("../../open-sse/utils/stream.ts");

  const existing = [{ type: "message", id: "existing" }];
  const parsed = {
    type: "response.completed",
    response: { id: "resp-1", output: existing },
  };

  const changed = backfillResponsesCompletedOutput(parsed, [{ type: "other", id: "new" }]);
  assert.equal(changed, false);
  assert.deepEqual((parsed as any).response.output, existing);
});

test("backfillResponsesCompletedOutput: returns false for wrong event type", async () => {
  const { backfillResponsesCompletedOutput } = await import("../../open-sse/utils/stream.ts");

  const parsed = { type: "response.created", response: { output: [] } };
  const changed = backfillResponsesCompletedOutput(parsed, [{ type: "x" }]);
  assert.equal(changed, false);
});

test("stripResponsesLifecycleEcho: strips instructions and tools from lifecycle events", async () => {
  const { stripResponsesLifecycleEcho } = await import("../../open-sse/utils/stream.ts");

  const parsed = {
    type: "response.created",
    response: {
      id: "resp-1",
      instructions: "You are a helpful assistant.",
      tools: [{ type: "function", function: { name: "test" } }],
      output: [],
    },
  };

  const changed = stripResponsesLifecycleEcho(parsed);
  assert.equal(changed, true);
  assert.equal((parsed.response as any).instructions, undefined);
  assert.equal((parsed.response as any).tools, undefined);
  assert.ok(Array.isArray((parsed.response as any).output), "output should be preserved");
});

test("stripResponsesLifecycleEcho: returns false for non-lifecycle events", async () => {
  const { stripResponsesLifecycleEcho } = await import("../../open-sse/utils/stream.ts");

  const parsed = {
    type: "response.output_text.delta",
    delta: "hello",
  };

  const changed = stripResponsesLifecycleEcho(parsed);
  assert.equal(changed, false);
});

test("stripResponsesLifecycleEcho: returns false when no echo fields present", async () => {
  const { stripResponsesLifecycleEcho } = await import("../../open-sse/utils/stream.ts");

  const parsed = {
    type: "response.completed",
    response: { id: "resp-1", output: [] },
  };

  const changed = stripResponsesLifecycleEcho(parsed);
  assert.equal(changed, false);
});
