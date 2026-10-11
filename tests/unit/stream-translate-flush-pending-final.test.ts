// Pending translate flush: a final upstream event without a closing blank
// line stays in the line normalizer and never reaches the translate flush.
// Each held line runs through the same per-line pipeline as the transform.
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

function translateOptions() {
  return {
    mode: "translate" as const,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI,
    provider: "testprov",
    model: "m",
    body: {
      model: "m",
      messages: [{ role: "user", content: "hello world, please answer at length" }],
    },
  };
}

async function runTranslate(upstreamLines: string[]): Promise<string> {
  const stream = createSSEStream(translateOptions());
  const writer = stream.writable.getWriter();
  const reading = readStream(stream);
  for (const line of upstreamLines) {
    await writer.write(enc.encode(line));
  }
  await writer.close();
  return reading;
}

async function runPassthrough(upstreamLines: string[]): Promise<string> {
  const stream = createSSEStream({
    mode: "passthrough" as const,
    body: {
      model: "m",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
      stream_options: { include_usage: true },
    },
    sourceFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI,
    provider: "test",
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

function usageChunks(text: string): Record<string, unknown>[] {
  return parseDataPayloads(text).filter(
    (p) => p && typeof p === "object" && (p as Record<string, unknown>).usage != null
  ) as Record<string, unknown>[];
}

const completedUsage = {
  type: "response.completed",
  response: { usage: { input_tokens: 1000, output_tokens: 50, total_tokens: 1050 } },
};

test("final usage event without a closing blank line still reaches the client", async () => {
  const text = await runTranslate([
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello there" })}\n\n`,
    `data: ${JSON.stringify(completedUsage)}\n`,
  ]);

  const withUsage = usageChunks(text);
  assert.equal(
    withUsage.length,
    1,
    `reported usage must reach the client exactly once, got ${withUsage.length} — flux tail: ${text.slice(-800)}`
  );
  const forwarded = withUsage[0].usage as Record<string, unknown>;
  const prompt = forwarded.prompt_tokens ?? forwarded.input_tokens;
  const completion = forwarded.completion_tokens ?? forwarded.output_tokens;
  assert.equal(prompt, 1000);
  assert.equal(completion, 50);
  assert.equal(forwarded.estimated, undefined);
});

test("same stream with a closing blank line is unchanged", async () => {
  const text = await runTranslate([
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello there" })}\n\n`,
    `data: ${JSON.stringify(completedUsage)}\n\n`,
    "data: [DONE]\n\n",
  ]);

  const withUsage = usageChunks(text);
  assert.equal(
    withUsage.length,
    1,
    `usage must reach the client exactly once, got ${withUsage.length} — flux tail: ${text.slice(-800)}`
  );
  const forwarded = withUsage[0].usage as Record<string, unknown>;
  assert.equal(forwarded.prompt_tokens ?? forwarded.input_tokens, 1000);
  assert.equal(forwarded.estimated, undefined);
});

test("trailing partial line without a newline keeps its buffered handling", async () => {
  const text = await runTranslate([
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello there" })}\n\n`,
    `data: ${JSON.stringify(completedUsage)}`,
  ]);

  const withUsage = usageChunks(text);
  assert.equal(
    withUsage.length,
    1,
    `buffered usage must reach the client exactly once, got ${withUsage.length} — flux tail: ${text.slice(-800)}`
  );
  const forwarded = withUsage[0].usage as Record<string, unknown>;
  assert.equal(forwarded.prompt_tokens ?? forwarded.input_tokens, 1000);
});

test("silent upstream still reports estimated usage", async () => {
  const text = await runTranslate([
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello there, this is a streamed answer." })}\n\n`,
    "data: [DONE]\n\n",
  ]);

  assert.ok(text.includes("data: [DONE]"), `stream must still terminate, got: ${text.slice(-300)}`);
  const withUsage = usageChunks(text);
  assert.equal(withUsage.length, 1, `expected one usage chunk, got ${withUsage.length}`);
  const usage = withUsage[0].usage as Record<string, unknown>;
  assert.ok(
    typeof usage.prompt_tokens === "number" && usage.prompt_tokens > 0,
    `estimated usage must carry input tokens: ${JSON.stringify(usage)}`
  );
});

test("passthrough stream keeps its own trailing handling", async () => {
  const text = await runPassthrough([
    `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", choices: [{ index: 0, delta: { content: "hello world" }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}\n`,
  ]);

  assert.ok(
    text.includes("hello world"),
    `passthrough payload must forward, got: ${text.slice(0, 600)}`
  );
});
