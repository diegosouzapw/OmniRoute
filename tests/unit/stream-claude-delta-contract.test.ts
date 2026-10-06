import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-delta-contract-"));
process.env.DATA_DIR = testDataDir;

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("createSSEStream ignores non-string Claude deltas before estimating usage", async () => {
  let onCompletePayload: unknown = null;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      for (const payload of [
        {
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: { malformed: true }, thinking: 7 },
        },
        {
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: "Valid answer" },
        },
        { type: "message_stop" },
      ]) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      }
      controller.close();
    },
  });

  await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        targetFormat: FORMATS.CLAUDE,
        sourceFormat: FORMATS.OPENAI,
        provider: "claude",
        model: "claude-opus-4-6",
        body: { messages: [{ role: "user", content: "hello" }] },
        onComplete(payload) {
          onCompletePayload = payload;
        },
      })
    )
  ).text();

  const completed = onCompletePayload as {
    responseBody: { choices: Array<{ message: { content: string } }> };
    usage: { total_tokens: number };
  };
  assert.equal(completed.responseBody.choices[0].message.content, "Valid answer");
  assert.equal(Number.isFinite(completed.usage.total_tokens), true);
});
