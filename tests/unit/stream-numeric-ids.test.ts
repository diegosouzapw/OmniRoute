import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-numeric-ids-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

async function readTransformed(chunks, options) {
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

test("createSSEStream passthrough coerces numeric tool_call id to string", async () => {
  let onCompletePayload = null;
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_num",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_num",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: 12345,
                  type: "function",
                  function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
                },
              ],
            },
          },
        ],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_num",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { messages: [{ role: "user", content: "hello" }] },
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"));
  let sawStreamedToolCall = false;
  for (const line of lines) {
    const payload = JSON.parse(line.slice(6));
    const tc = payload?.choices?.[0]?.delta?.tool_calls?.[0];
    if (tc?.id) {
      assert.equal(typeof tc.id, "string", "tool_call.id should be a string");
      assert.equal(tc.id, "12345");
      sawStreamedToolCall = true;
    }
  }
  assert.equal(sawStreamedToolCall, true, "expected streamed tool_call.id to be present");

  const finalId = onCompletePayload?.responseBody?.choices?.[0]?.message?.tool_calls?.[0]?.id;
  assert.equal(typeof finalId, "string", "tool_call.id in final message should be a string");
  assert.equal(finalId, "12345");
});
