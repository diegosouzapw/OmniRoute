/**
 * Regression test for #10017.
 *
 * In "Standard passthrough mode" (source format === client format, no
 * translation needed) OmniRoute buffers upstream SSE control lines
 * (`id:`, `event:`, `retry:`, bare `:` comments) via
 * `createSSEEventPrefixBuffer()` and re-prepends them verbatim onto the next
 * `data:` chunk. For a plain OpenAI Chat-Completions-format client
 * (`clientResponseFormat === FORMATS.OPENAI`), that leaks literal `id: 0`,
 * `event: done`, `: proxy-internal-metadata` lines into the client stream — a
 * protocol OpenAI's own Chat-Completions SSE never uses.
 *
 * The fix is format-scoped:
 *   - `id:` / `retry:` / bare `:` comment lines are never forwarded for ANY
 *     client format (they are not part of Chat-Completions, Responses, or
 *     Claude Messages SSE).
 *   - `event:` framing is preserved ONLY for the protocols that define it
 *     (`FORMATS.OPENAI_RESPONSES` and `FORMATS.CLAUDE`); it is dropped for
 *     plain OpenAI Chat-Completions clients.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-10017-sse-control-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

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
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

/** Returns raw upstream SSE control lines that leaked into the output. */
function leakedUpstreamControlLines(output: string): string[] {
  return output
    .trim()
    .split("\n")
    .filter(
      (l) =>
        /^(?:id:|event:|retry:)/i.test(l) || (l.startsWith(":") && !l.startsWith(": x-omniroute-"))
    );
}

test("#10017: OpenAI Chat-Completions passthrough drops upstream id/event/retry/comment control lines", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_x",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
      })}\n`,
      `id: 0\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_x",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { content: "world" } }],
      })}\n`,
      `id: 1\n\n`,
      `event: done\n`,
      `: proxy-internal-metadata\n\n`,
      `data: [DONE]\n\n`,
    ],
    {
      mode: "passthrough",
      provider: "test-provider",
      model: "gpt-4.1-mini",
      clientResponseFormat: FORMATS.OPENAI,
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  const leaked = leakedUpstreamControlLines(text);
  assert.deepEqual(
    leaked,
    [],
    `expected NO raw upstream SSE control lines forwarded to an OpenAI-format client, got: ${JSON.stringify(leaked)}`
  );
});

test("#10017: OpenAI Chat-Completions passthrough still delivers data chunks and [DONE]", async () => {
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_x",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { role: "assistant", content: "Hello " } }],
      })}\n`,
      `id: 0\n\n`,
      `event: done\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl_x",
        object: "chat.completion.chunk",
        created: 1,
        model: "gpt-4.1-mini",
        choices: [{ index: 0, delta: { content: "world" } }],
      })}\n\n`,
      `data: [DONE]\n\n`,
    ],
    {
      mode: "passthrough",
      provider: "test-provider",
      model: "gpt-4.1-mini",
      clientResponseFormat: FORMATS.OPENAI,
      body: { messages: [{ role: "user", content: "hello" }] },
    }
  );

  assert.ok(text.includes("Hello "), "first data chunk must be forwarded");
  assert.ok(text.includes("world"), "second data chunk must be forwarded");
  assert.ok(text.includes("data: [DONE]"), "[DONE] must be forwarded");
});

test("#10017: OpenAI Responses passthrough KEEPS event framing (regression guard for #6561 contract)", async () => {
  const text = await readTransformed(
    [
      `event: response.created\n`,
      `data: ${JSON.stringify({ type: "response.created", response: { id: "resp_10017", output: [] } })}\n\n`,
      `id: 1\n`,
      `: proxy-internal-metadata\n\n`,
      `event: response.output_text.delta\n`,
      `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "hi" })}\n\n`,
      `event: response.completed\n`,
      `data: ${JSON.stringify({ type: "response.completed", response: { id: "resp_10017", ouput: [] } })}\n\n`,
    ],
    {
      mode: "passthrough",
      provider: "test-provider",
      model: "gpt-4.1-mini",
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
      body: { input: "hello" },
    }
  );

  const lines = text.trim().split("\n");
  assert.ok(lines.includes("event: response.created"), "Responses event framing must be preserved");
  assert.ok(
    lines.includes("event: response.output_text.delta"),
    "Responses output_text.delta event framing must be preserved"
  );
  assert.ok(
    !lines.some(
      (l) => l.startsWith("id:") || (l.startsWith(":") && !l.startsWith(": x-omniroute-"))
    ),
    "Responses passthrough must still strip id:/comment control lines"
  );
});

test("#10017: Claude Messages passthrough KEEPS event framing", async () => {
  const text = await readTransformed(
    [
      `event: message_start\n`,
      `data: ${JSON.stringify({ type: "message_start", message: { id: "msg_10017", type: "message", role: "assistant", content: [], model: "claude-3-5-sonnet" } })}\n\n`,
      `event: content_block_delta\n`,
      `data: ${JSON.stringify({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "hi" } })}\n\n`,
      `event: message_stop\n\n`,
    ],
    {
      mode: "passthrough",
      provider: "anthropic",
      model: "claude-3-5-sonnet-20241022",
      clientResponseFormat: FORMATS.CLAUDE,
      body: { messages: [{ role: "user", content: "hi" }] },
    }
  );

  const lines = text.trim().split("\n");
  assert.ok(lines.includes("event: message_start"), "Claude event framing must be preserved");
  assert.ok(
    lines.includes("event: content_block_delta"),
    "Claude delta event framing must be preserved"
  );
});
