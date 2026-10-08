/**
 * Mistral reasoning models (e.g. `labs-leanstral-1-5`) stream
 * `choices[].delta.content` as typed part arrays instead of a string:
 *
 *   {"delta": {"content": [{"type": "thinking", "thinking": [{"type": "text", "text": "The"}]}]}}
 *
 * The Responses translator forwarded that array verbatim as
 * `response.output_text.delta.delta`, which strict Responses clients reject
 * ("Responses stream delivered malformed response.output_text.delta delta"),
 * and Chat-Completions passthrough clients received a non-string `content`.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mistral-thinking-array-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { normalizeArrayContentDelta } = await import("../../open-sse/utils/arrayContentDelta.ts");

const textEncoder = new TextEncoder();

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

function chunk(delta: Record<string, unknown>, finishReason: string | null = null) {
  return `data: ${JSON.stringify({
    id: "cmpl_mistral",
    object: "chat.completion.chunk",
    created: 1,
    model: "labs-leanstral-1-5",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

const thinking = (text: string) => ({
  content: [{ type: "thinking", thinking: [{ type: "text", text }] }],
});

// Shape captured from api.mistral.ai on 2026-10-07.
const MISTRAL_STREAM = [
  chunk({ role: "assistant", content: "" }),
  chunk(thinking("The user")),
  chunk(thinking(" wants a greeting.")),
  chunk({ content: [{ type: "text", text: "Hi " }] }),
  chunk({ content: "there!" }),
  chunk({}, "stop"),
  "data: [DONE]\n\n",
];

async function run(options: object): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const c of MISTRAL_STREAM) controller.enqueue(textEncoder.encode(c));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options))).text();
}

function dataEvents(text: string): Array<Record<string, unknown>> {
  return text
    .split("\n")
    .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
    .map((l) => JSON.parse(l.slice(6)));
}

test("Responses clients get string output_text deltas and reasoning from Mistral thinking arrays", async () => {
  const events = dataEvents(
    await run({
      mode: "translate",
      targetFormat: FORMATS.OPENAI,
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      provider: "mistral",
      model: "labs-leanstral-1-5",
      body: { input: "hello" },
    })
  );

  const textDeltas = events.filter((e) => e.type === "response.output_text.delta");
  assert.ok(textDeltas.length > 0, "expected output_text deltas");
  for (const e of textDeltas) assert.equal(typeof e.delta, "string", JSON.stringify(e));
  assert.equal(textDeltas.map((e) => e.delta).join(""), "Hi there!");

  const reasoning = events
    .filter((e) => e.type === "response.reasoning_summary_text.delta")
    .map((e) => e.delta)
    .join("");
  assert.equal(reasoning, "The user wants a greeting.");
});

test("Chat-Completions passthrough clients get string content and reasoning_content", async () => {
  const events = dataEvents(
    await run({
      mode: "passthrough",
      provider: "mistral",
      model: "labs-leanstral-1-5",
      clientResponseFormat: FORMATS.OPENAI,
      body: { messages: [{ role: "user", content: "hello" }] },
    })
  );

  const deltas = events.flatMap((e) =>
    ((e.choices as Array<{ delta?: Record<string, unknown> }>) ?? []).map((c) => c.delta ?? {})
  );
  for (const d of deltas) {
    if ("content" in d) assert.equal(typeof d.content, "string", JSON.stringify(d));
  }
  assert.equal(deltas.map((d) => d.content ?? "").join(""), "Hi there!");
  assert.equal(deltas.map((d) => d.reasoning_content ?? "").join(""), "The user wants a greeting.");
});

test("normalizeArrayContentDelta leaves string content alone and splits mixed arrays", () => {
  const plain = { content: "hello" };
  assert.equal(normalizeArrayContentDelta(plain), false);
  assert.deepEqual(plain, { content: "hello" });

  const mixed: Record<string, unknown> = {
    reasoning_content: "a",
    content: [
      { type: "thinking", thinking: "b" },
      { type: "text", text: "c" },
      { type: "thinking", thinking: [{ type: "text", text: "d" }] },
      { type: "image_url", image_url: { url: "x" } },
    ],
  };
  assert.equal(normalizeArrayContentDelta(mixed), true);
  assert.deepEqual(mixed, { reasoning_content: "abd", content: "c" });

  const thinkingOnly: Record<string, unknown> = thinking("e");
  normalizeArrayContentDelta(thinkingOnly);
  assert.deepEqual(thinkingOnly, { reasoning_content: "e" });
});
