import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-zero-prompt-"));
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

test("createSSEStream passthrough estimates input tokens when upstream reports prompt_tokens=0 (Ollama Cloud pattern)", async () => {
  let onCompletePayload = null;
  const body = { messages: [{ role: "user", content: "Write a 500-line research report" }] };
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_ollama",
        object: "chat.completion.chunk",
        created: 1,
        model: "minimax-m3",
        system_fingerprint: "fp_ollama",
        choices: [{ index: 0, delta: { content: "Here" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_ollama",
        object: "chat.completion.chunk",
        created: 1,
        model: "minimax-m3",
        system_fingerprint: "fp_ollama",
        choices: [{ index: 0, delta: { content: " is" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_ollama",
        object: "chat.completion.chunk",
        created: 1,
        model: "minimax-m3",
        system_fingerprint: "fp_ollama",
        choices: [{ index: 0, delta: { content: " the" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_ollama",
        object: "chat.completion.chunk",
        created: 1,
        model: "minimax-m3",
        system_fingerprint: "fp_ollama",
        choices: [{ index: 0, delta: { content: " response" } }],
      })}\n\n`,
      // Ollama Cloud returns usage with prompt_tokens: 0 — it doesn't count input tokens
      `data: ${JSON.stringify({
        id: "chatcmpl_ollama",
        object: "chat.completion.chunk",
        created: 1,
        model: "minimax-m3",
        system_fingerprint: "fp_ollama",
        choices: [],
        usage: { prompt_tokens: 0, completion_tokens: 10, total_tokens: 0 },
      })}\n\n`,
      `data: [DONE]\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "ollamacloud",
      model: "minimax-m3",
      body,
      onComplete(payload) {
        onCompletePayload = payload;
      },
    }
  );

  // The fix should estimate input tokens from the request body instead of showing 0
  assert.equal(
    onCompletePayload.responseBody.usage.completion_tokens,
    10,
    "completion tokens should be unchanged"
  );
  assert.ok(
    onCompletePayload.responseBody.usage.prompt_tokens > 0,
    `prompt_tokens should be estimated (> 0), got ${onCompletePayload.responseBody.usage.prompt_tokens}`
  );
  assert.equal(
    onCompletePayload.responseBody.usage.total_tokens,
    onCompletePayload.responseBody.usage.prompt_tokens + 10,
    "total_tokens should equal prompt_tokens + completion_tokens"
  );
});

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    for (const entry of fs.readdirSync(TEST_DATA_DIR)) {
      fs.rmSync(path.join(TEST_DATA_DIR, entry), { recursive: true, force: true });
    }
  }
});
