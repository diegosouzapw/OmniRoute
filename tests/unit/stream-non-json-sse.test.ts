/**
 * TDD test for fix(sse): guard non-JSON SSE lines and duplicate [DONE]
 *
 * Reproduces two bugs from upstream 9router PR #2046:
 *   1. Non-JSON data lines (e.g. plain-text rate-limit messages) passed
 *      through raw to the client instead of being silently dropped.
 *   2. Duplicate `data: [DONE]` events emitted when the stream has two
 *      emission sites and the guard variable is not shared between them.
 *
 * The test drives createSSEStream in passthrough mode (sourceFormat =
 * targetFormat = "openai"), feeds it a mix of valid JSON chunks + a
 * non-JSON line + a duplicate upstream [DONE], and checks the output.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-nonjson-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

const textEncoder = new TextEncoder();

async function readTransformed(chunks: string[], options: object): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(textEncoder.encode(chunk));
      }
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

const PASSTHROUGH_OPTIONS = {
  mode: "passthrough",
  sourceFormat: "openai",
  targetFormat: "openai",
};

const validChunk1 = JSON.stringify({
  id: "chatcmpl-nonjson-1",
  object: "chat.completion.chunk",
  created: 1,
  model: "gpt-4o",
  choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
});

const validChunk2 = JSON.stringify({
  id: "chatcmpl-nonjson-2",
  object: "chat.completion.chunk",
  created: 1,
  model: "gpt-4o",
  choices: [{ index: 0, delta: { content: " world" }, finish_reason: "stop" }],
});

test("non-JSON data line (plain-text rate-limit message) is NOT forwarded to client", async () => {
  const output = await readTransformed(
    [
      `data: ${validChunk1}\n\n`,
      // Non-JSON line that should be silently dropped
      "data: Rate limit exceeded\n\n",
      `data: ${validChunk2}\n\n`,
      "data: [DONE]\n\n",
    ],
    PASSTHROUGH_OPTIONS
  );

  // The non-JSON line must NOT appear verbatim in the output
  assert.ok(
    !output.includes("data: Rate limit exceeded"),
    `Non-JSON line was forwarded to client.\nOutput: ${output}`
  );

  // Both valid JSON chunks must appear
  assert.ok(
    output.includes("chatcmpl-nonjson-1"),
    `First valid chunk missing.\nOutput: ${output}`
  );
  assert.ok(
    output.includes("chatcmpl-nonjson-2"),
    `Second valid chunk missing.\nOutput: ${output}`
  );
});

test("exactly one [DONE] emitted even when upstream sends a duplicate", async () => {
  const output = await readTransformed(
    [
      `data: ${validChunk1}\n\n`,
      "data: [DONE]\n\n",
      // Second upstream [DONE] — should be suppressed
      "data: [DONE]\n\n",
    ],
    PASSTHROUGH_OPTIONS
  );

  const doneCount = (output.match(/data: \[DONE\]/g) ?? []).length;
  assert.equal(
    doneCount,
    1,
    `Expected exactly 1 [DONE] in output, got ${doneCount}.\nOutput: ${output}`
  );
});

test("valid JSON chunks pass through correctly in passthrough mode", async () => {
  const output = await readTransformed(
    [
      `data: ${validChunk1}\n\n`,
      `data: ${validChunk2}\n\n`,
      "data: [DONE]\n\n",
    ],
    PASSTHROUGH_OPTIONS
  );

  assert.ok(output.includes("chatcmpl-nonjson-1"), `Chunk 1 missing.\nOutput: ${output}`);
  assert.ok(output.includes("chatcmpl-nonjson-2"), `Chunk 2 missing.\nOutput: ${output}`);
  assert.ok(output.includes("data: [DONE]"), `[DONE] missing.\nOutput: ${output}`);
});
