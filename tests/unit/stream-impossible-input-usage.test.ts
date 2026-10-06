import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-sanity-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { sanitizeProviderUsageForRequest } = await import("../../open-sse/utils/usageTracking.ts");
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

function parseSsePayloads(text: string): Array<Record<string, unknown>> {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line.slice(6).trim() !== "[DONE]")
    .map((line) => JSON.parse(line.slice(6)));
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("native Claude passthrough repairs impossible AgentRouter cache usage before forwarding", async () => {
  const body = {
    model: "claude-opus-4-8",
    system: "You are a coding assistant.",
    messages: [{ role: "user", content: "hey" }],
    tools: Array.from({ length: 25 }, (_, index) => ({
      name: `tool_${index}`,
      description: "A small test tool",
      input_schema: {
        type: "object",
        properties: { value: { type: "string" } },
      },
    })),
  };
  let onCompletePayload = null;

  const text = await readTransformed(
    [
      `event: message_start\ndata: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_agentrouter",
          type: "message",
          role: "assistant",
          model: "claude-opus-4-8",
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: {
            input_tokens: 2,
            cache_creation_input_tokens: 8186,
            cache_read_input_tokens: 328221,
            output_tokens: 0,
          },
        },
      })}\n\n`,
      `event: content_block_start\ndata: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      })}\n\n`,
      `event: content_block_delta\ndata: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "Hey!" },
      })}\n\n`,
      `event: content_block_stop\ndata: ${JSON.stringify({
        type: "content_block_stop",
        index: 0,
      })}\n\n`,
      `event: message_delta\ndata: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "end_turn", stop_sequence: null },
        usage: { output_tokens: 44 },
      })}\n\n`,
      `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
    ],
    {
      mode: "passthrough",
      provider: "agentrouter",
      model: "claude-opus-4-8",
      body,
      clientResponseFormat: FORMATS.CLAUDE,
      onComplete: (payload) => {
        onCompletePayload = payload;
      },
    }
  );

  const payloads = parseSsePayloads(text);
  const start = payloads.find((payload) => payload.type === "message_start") as {
    message: { usage: Record<string, number> };
  };
  assert.ok(start, "message_start must still be forwarded");

  const usage = start.message.usage;
  const clientVisibleInput =
    (usage.input_tokens || 0) +
    (usage.cache_creation_input_tokens || 0) +
    (usage.cache_read_input_tokens || 0);
  const requestBytes = Buffer.byteLength(JSON.stringify(body), "utf8");
  assert.ok(
    clientVisibleInput <= requestBytes * 2 + 8192,
    `client-visible input usage must be plausible for ${requestBytes} request bytes, got ${clientVisibleInput}`
  );
  assert.equal(usage.cache_creation_input_tokens || 0, 0);
  assert.equal(usage.cache_read_input_tokens || 0, 0);

  assert.ok(onCompletePayload, "stream completion callback must run");
  const completedUsage = (onCompletePayload as { usage: Record<string, number> }).usage;
  assert.ok(
    completedUsage.prompt_tokens <= requestBytes * 2 + 8192,
    "internal usage/logging must use the repaired count too"
  );
  assert.equal(completedUsage.completion_tokens, 44);
});

test("valid Claude cache usage remains untouched", () => {
  const body = {
    messages: [{ role: "user", content: "x".repeat(20_000) }],
  };
  const usage = {
    input_tokens: 20,
    cache_creation_input_tokens: 500,
    cache_read_input_tokens: 3000,
    output_tokens: 12,
  };

  const sanitized = sanitizeProviderUsageForRequest(usage, body, FORMATS.CLAUDE);
  assert.equal(sanitized, usage, "plausible provider usage should retain object identity");
  assert.deepEqual(sanitized, usage);
});

test("impossible input usage is repaired for OpenAI, Responses, and Gemini shapes", () => {
  const body = { messages: [{ role: "user", content: "hello" }] };

  const openai = sanitizeProviderUsageForRequest(
    {
      prompt_tokens: 300_000,
      completion_tokens: 7,
      total_tokens: 300_007,
      prompt_tokens_details: { cached_tokens: 299_000 },
    },
    body,
    FORMATS.OPENAI
  );
  assert.ok(openai.prompt_tokens < 300_000);
  assert.equal(openai.prompt_tokens_details.cached_tokens, 0);
  assert.equal(openai.total_tokens, openai.prompt_tokens + 7);

  const responses = sanitizeProviderUsageForRequest(
    {
      input_tokens: 300_000,
      output_tokens: 8,
      total_tokens: 300_008,
      input_tokens_details: { cached_tokens: 299_000 },
    },
    body,
    FORMATS.OPENAI_RESPONSES
  );
  assert.ok(responses.input_tokens < 300_000);
  assert.equal(responses.input_tokens_details.cached_tokens, 0);
  assert.equal(responses.total_tokens, responses.input_tokens + 8);

  const gemini = sanitizeProviderUsageForRequest(
    {
      promptTokenCount: 300_000,
      candidatesTokenCount: 9,
      thoughtsTokenCount: 3,
      cachedContentTokenCount: 299_000,
      totalTokenCount: 300_012,
    },
    body,
    FORMATS.GEMINI
  );
  assert.ok(gemini.promptTokenCount < 300_000);
  assert.equal(gemini.cachedContentTokenCount, 0);
  assert.equal(gemini.totalTokenCount, gemini.promptTokenCount + 12);
});

test("server-side context and remote file references bypass the body-byte guard", () => {
  const statefulBody = {
    previous_response_id: "resp_previous",
    input: "continue",
  };
  const statefulUsage = { input_tokens: 300_000, output_tokens: 3 };
  assert.equal(
    sanitizeProviderUsageForRequest(statefulUsage, statefulBody, FORMATS.OPENAI_RESPONSES),
    statefulUsage
  );

  const remoteFileBody = {
    messages: [
      {
        role: "user",
        content: [{ type: "input_file", file_id: "file_large_document" }],
      },
    ],
  };
  const remoteFileUsage = { prompt_tokens: 300_000, completion_tokens: 3 };
  assert.equal(
    sanitizeProviderUsageForRequest(remoteFileUsage, remoteFileBody, FORMATS.OPENAI),
    remoteFileUsage
  );
});

test("final usage frame without a trailing newline is still sanitized", async () => {
  const body = { messages: [{ role: "user", content: "hello" }] };
  const text = await readTransformed(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_tail",
        object: "chat.completion.chunk",
        choices: [],
        usage: {
          prompt_tokens: 300_000,
          completion_tokens: 4,
          total_tokens: 300_004,
          prompt_tokens_details: { cached_tokens: 299_000 },
        },
      })}`,
    ],
    {
      mode: "passthrough",
      provider: "generic-openai-compatible",
      model: "test-model",
      body,
      clientResponseFormat: FORMATS.OPENAI,
    }
  );

  const payloads = parseSsePayloads(text);
  const usagePayloads = payloads.filter((payload) => payload.usage);
  assert.equal(usagePayloads.length, 1, "usage must not be duplicated during tail flush");
  const providerPayload = payloads.find((payload) => payload.id === "chatcmpl_tail");
  assert.ok(providerPayload, "the provider's final usage frame must be forwarded");
  assert.equal(usagePayloads[0], providerPayload);
  const usage = providerPayload.usage as Record<string, unknown>;
  assert.ok((usage.prompt_tokens as number) < 300_000);
  assert.equal((usage.prompt_tokens_details as Record<string, unknown>).cached_tokens, 0);
  assert.equal(
    usage.total_tokens,
    (usage.prompt_tokens as number) + (usage.completion_tokens as number)
  );
});
