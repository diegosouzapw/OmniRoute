import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-inject-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

async function readTransformed(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(textEncoder.encode(chunk));
      }
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options as never))).text();
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

// Regression guard for #3502 / #3388: PR #3422 ("allow OpenAI usage-only empty
// choices chunks") re-introduced the assistant-content injection
// "[OmniRoute] Upstream returned an empty response. Please retry." for empty
// `choices: []` chunks that carry NO valid usage. That injected text is fed back
// by clients (Goose/opencode) as a turn, producing the retry loop #3400 fixed.
// An empty-no-usage chunk must be DROPPED, never injected as content.
test("empty choices WITHOUT usage are dropped, not injected as retry text (#3502)", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_x",
        object: "chat.completion.chunk",
        created: 1,
        model: "mimo-v2.5-free",
        choices: [],
      })}\n\n`,
      `data: [DONE]\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "opencode-zen",
      model: "mimo-v2.5-free",
      body: { messages: [{ role: "user", content: "hi" }] },
    }
  );

  assert.doesNotMatch(text, /Upstream returned an empty response/);
  assert.doesNotMatch(text, /Please retry/);
});

// #3422 behavior that MUST be preserved: a standards-compliant
// `stream_options.include_usage` final chunk has `choices: []` WITH usage and
// must be forwarded (not dropped, not turned into an error).
test("empty choices WITH valid usage are forwarded (preserve #3422)", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_y",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "hello" } }],
      })}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_y",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [],
        usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
      })}\n\n`,
      `data: [DONE]\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gpt-4.1-mini",
      body: { messages: [{ role: "user", content: "hi" }] },
    }
  );

  assert.doesNotMatch(text, /Upstream returned an empty response/);
  assert.match(text, /"total_tokens":8/);
});
