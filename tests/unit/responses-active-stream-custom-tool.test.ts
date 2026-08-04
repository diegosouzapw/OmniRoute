import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { FORMATS } from "../../open-sse/translator/formats.ts";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-responses-stream-"));
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

test("active Responses stream restores declared custom tool metadata", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode(
          `data: ${JSON.stringify({
            id: "chatcmpl_custom",
            object: "chat.completion.chunk",
            choices: [
              {
                index: 0,
                delta: {
                  tool_calls: [
                    {
                      index: 0,
                      id: "call_exec",
                      function: { name: "exec", arguments: '{"input":"text(\\"pong\\")"}' },
                    },
                  ],
                },
                finish_reason: "tool_calls",
              },
            ],
          })}\n\n`
        )
      );
      controller.close();
    },
  });
  const transform = createSSETransformStreamWithLogger(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "opencode-go",
    null,
    null,
    "kimi-k3",
    null,
    { messages: [{ role: "user", content: "run it" }] },
    null,
    null,
    null,
    false,
    false,
    new Set(["exec"])
  );

  const text = await new Response(source.pipeThrough(transform)).text();

  assert.match(text, /"type":"custom_tool_call"/);
  assert.match(text, /"input":"text\(\\"pong\\"\)"/);
  assert.doesNotMatch(text, /"type":"function_call"/);
});
