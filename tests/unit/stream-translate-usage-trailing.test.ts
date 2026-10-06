// Translate-mode trailing usage: when a chat client talks to a Responses
// upstream that stays silent on usage, the flush must emit the estimate as a
// canonical trailing usage-only chunk (empty choices) before [DONE] — the only
// token counts an OpenAI-compatible client ever reads.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const enc = new TextEncoder();

async function readStream(stream: TransformStream<Uint8Array, Uint8Array>): Promise<string> {
  const reader = stream.readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function runTranslate(upstreamLines: string[]): Promise<string> {
  const stream = createSSEStream({
    mode: "translate" as const,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI,
    provider: "testprov",
    model: "m",
    body: {
      model: "m",
      messages: [{ role: "user", content: "hello world, please answer at length" }],
    },
  });
  const writer = stream.writable.getWriter();
  const reading = readStream(stream);
  for (const line of upstreamLines) {
    await writer.write(enc.encode(line));
  }
  await writer.close();
  return reading;
}

function parseDataPayloads(text: string): unknown[] {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice("data: ".length))
    .filter((data) => data && data !== "[DONE]")
    .map((data) => JSON.parse(data));
}

test("translate silent upstream emits a canonical usage-only chunk before [DONE]", async () => {
  // Comments stay disabled (default): the assertion reads the real client
  // data flux, never the opt-in SSE metadata comments.
  const text = await runTranslate([
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello there, this is a streamed answer." })}\n\n`,
    "data: [DONE]\n\n",
  ]);

  assert.ok(text.includes("data: [DONE]"), `stream must still terminate, got: ${text.slice(-300)}`);
  const payloads = parseDataPayloads(text);
  const usageChunks = payloads.filter(
    (p) =>
      p &&
      typeof p === "object" &&
      Array.isArray((p as Record<string, unknown>).choices) &&
      (p as Record<string, unknown>).choices.length === 0 &&
      (p as Record<string, unknown>).usage != null
  );
  assert.equal(
    usageChunks.length,
    1,
    `expected exactly one usage-only chunk, got ${usageChunks.length} — flux: ${text.slice(-800)}`
  );
  const usage = (usageChunks[0] as Record<string, unknown>).usage as Record<string, unknown>;
  assert.ok(
    typeof usage.prompt_tokens === "number" && usage.prompt_tokens > 0,
    `estimated usage must carry input tokens: ${JSON.stringify(usage)}`
  );
  assert.ok(
    typeof usage.completion_tokens === "number" && usage.completion_tokens > 0,
    `estimated usage must carry output tokens: ${JSON.stringify(usage)}`
  );
  const doneIdx = text.indexOf("data: [DONE]");
  const usageIdx = text.lastIndexOf('"usage"');
  assert.ok(usageIdx > 0 && usageIdx < doneIdx, "usage-only chunk must precede [DONE]");
});

test("translate real upstream usage is forwarded without a duplicate estimate", async () => {
  const text = await runTranslate([
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello there" })}\n\n`,
    `data: ${JSON.stringify({ type: "response.completed", response: { usage: { input_tokens: 2249, output_tokens: 123, total_tokens: 2372 } } })}\n\n`,
    "data: [DONE]\n\n",
  ]);

  const payloads = parseDataPayloads(text);
  const withUsage = payloads.filter(
    (p) => p && typeof p === "object" && (p as Record<string, unknown>).usage != null
  );
  assert.equal(
    withUsage.length,
    1,
    `real upstream usage must reach the client exactly once, got ${withUsage.length} — usages: ${JSON.stringify(withUsage.map((p) => (p as Record<string, unknown>).usage))}`
  );
  const forwarded = (withUsage[0] as Record<string, unknown>).usage as Record<string, unknown>;
  const prompt = forwarded.prompt_tokens ?? forwarded.input_tokens;
  const completion = forwarded.completion_tokens ?? forwarded.output_tokens;
  assert.equal(prompt, 2249);
  assert.equal(completion, 123);
  assert.equal(forwarded.estimated, undefined);
});

test("passthrough silent upstream still emits its trailing usage-only chunk", async () => {
  const body = {
    model: "m",
    messages: [{ role: "user", content: "hi" }],
    stream: true,
    stream_options: { include_usage: true },
  };
  const stream = createSSEStream({
    mode: "passthrough" as const,
    body,
    sourceFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI,
    provider: "test",
  });
  const writer = stream.writable.getWriter();
  const reading = readStream(stream);
  await writer.write(
    enc.encode(
      `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", choices: [{ index: 0, delta: { content: "hello world" }, finish_reason: null }] })}\n\n`
    )
  );
  await writer.write(
    enc.encode(
      `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}\n\n`
    )
  );
  await writer.write(enc.encode("data: [DONE]\n\n"));
  await writer.close();
  const text = await reading;

  const payloads = parseDataPayloads(text);
  const withUsage = payloads.filter(
    (p) => p && typeof p === "object" && (p as Record<string, unknown>).usage != null
  );
  assert.ok(withUsage.length >= 1, `passthrough must still emit usage, got: ${text.slice(0, 600)}`);
  const last = withUsage[withUsage.length - 1] as Record<string, unknown>;
  assert.equal((last.usage as Record<string, unknown>).estimated, true);
});
