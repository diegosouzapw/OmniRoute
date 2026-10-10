import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15619-"));
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.after(() => {
  core.resetDbInstance();
});

const enc = new TextEncoder();
async function run(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream({
    start(c) {
      for (const ch of chunks) c.enqueue(enc.encode(ch));
      c.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options as never))).text();
}

// #15619: finish frame carries usage with cached_tokens=0, then a trailing
// usage-only summary (choices: []) carries the real cached_tokens=15616.
test("#15619 passthrough keeps the real trailing usage-only summary (cache reads)", async () => {
  type Usage = {
    prompt_tokens_details?: { cached_tokens?: number };
    cache_read_input_tokens?: number;
    cached_tokens?: number;
  };
  let done: { usage?: Usage } | null = null;
  const base = { id: "c1", object: "chat.completion.chunk", created: 1, model: "step-5-preview" };
  const text = await run(
    [
      `data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta: { role: "assistant", content: "Hi" } }] })}\n\n`,
      `data: ${JSON.stringify({
        ...base,
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: {
          prompt_tokens: 16063,
          completion_tokens: 180,
          prompt_tokens_details: { cached_tokens: 0 },
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        ...base,
        choices: [],
        usage: { prompt_tokens: 16063, prompt_tokens_details: { cached_tokens: 15616 } },
      })}\n\n`,
      "data: [DONE]\n\n",
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai-compatible",
      model: "step-5-preview",
      body: {
        messages: [{ role: "user", content: "word ".repeat(16000) }],
        stream_options: { include_usage: true },
      },
      onComplete(p: unknown) {
        done = p;
      },
    }
  );
  // client sees the real cached value in the final usage
  assert.match(text, /"cached_tokens":15616/);
  // accounting sees it too
  const u = done?.usage;
  const cached =
    u?.prompt_tokens_details?.cached_tokens ?? u?.cache_read_input_tokens ?? u?.cached_tokens;
  assert.equal(cached, 15616, `accounting usage: ${JSON.stringify(u)}`);
});
