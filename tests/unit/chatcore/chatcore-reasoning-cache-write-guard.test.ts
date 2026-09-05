// Integration guard for the reasoning-cache write gate.
// The predicate is tested in isolation in chatCore-reasoning-cache-guard.test.ts; this
// file proves handleChatCore's ACTUAL call sites are wired to it, for both the
// non-streaming and streaming response paths, via the cache's own observable side
// effect (no spying on cacheReasoningFromAssistantMessage — same convention as
// tests/unit/chatcore-sanitization.test.ts and
// tests/unit/combo-context-overflow-compression-probe.test.ts: mock fetch, call the
// real handleChatCore, assert real behavior).
//
// Deepseek is also a replay provider (proven by the predicate test), but its wire
// format is openai-responses — a plain openai chat.completion mock would hit
// MALFORMED-200 and never reach the cache write. xiaomi-mimo serves the same
// predicate (REASONING_REPLAY_PROVIDERS member) while staying on the openai wire
// format, so both the non-streaming JSON mock and the streaming chat.completion.chunk
// SSE mock exercise the passthrough path with minimal translation noise.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-chatcore-reasoning-cache-write-guard-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../../open-sse/handlers/chatCore.ts");
const { lookupReasoning, clearReasoningCacheAll } =
  await import("../../../open-sse/services/reasoningCache.ts");
const core = await import("../../../src/lib/db/core.ts");

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function nonStreamingUpstreamResponse(toolCallId: string, model: string) {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-reasoning-cache-guard",
      object: "chat.completion",
      model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: null,
            reasoning_content: "because the guard test says so",
            tool_calls: [
              { id: toolCallId, type: "function", function: { name: "noop", arguments: "{}" } },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function streamingUpstreamResponse(toolCallId: string) {
  const firstChunk = {
    id: "chatcmpl-reasoning-cache-stream-guard",
    object: "chat.completion.chunk",
    model: "probe",
    choices: [
      {
        index: 0,
        delta: {
          role: "assistant",
          reasoning_content: "because the guard test says so",
          tool_calls: [
            {
              index: 0,
              id: toolCallId,
              type: "function",
              function: { name: "noop", arguments: "{}" },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };
  const secondChunk = {
    id: "chatcmpl-reasoning-cache-stream-guard",
    object: "chat.completion.chunk",
    model: "probe",
    choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
  };
  const sseBody =
    `data: ${JSON.stringify(firstChunk)}\n\n` +
    `data: ${JSON.stringify(secondChunk)}\n\n` +
    "data: [DONE]\n\n";
  return new Response(sseBody, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

async function invokeChatCoreNonStreaming(provider: string, model: string, toolCallId: string) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => nonStreamingUpstreamResponse(toolCallId, model);
  try {
    const body = { model, messages: [{ role: "user", content: "call the tool" }], stream: false };
    await handleChatCore({
      body,
      modelInfo: { provider, model, extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body,
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
    } as never);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function invokeChatCoreStreaming(provider: string, model: string, toolCallId: string) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => streamingUpstreamResponse(toolCallId);
  try {
    const body = { model, messages: [{ role: "user", content: "call the tool" }], stream: true };
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model, extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body,
        headers: new Headers({ accept: "text/event-stream" }),
      },
      userAgent: "unit-test",
    } as never);
    // Drain the streaming response to trigger onStreamComplete (the cache write callback fires on flush/close)
    if (result.success && result.response?.body) {
      const reader = result.response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) text += decoder.decode(value as Uint8Array, { stream: true });
      }
      await new Promise((resolve) => setImmediate(resolve));
      void text;
    } else if (result.success) {
      try {
        await result.response.text();
        await new Promise((resolve) => setImmediate(resolve));
      } catch {}
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    clearReasoningCacheAll();
  } catch {}
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("non-streaming: a replay provider (xiaomi-mimo) populates the reasoning cache", async () => {
  const id = "tc-reasoning-cache-nonstream-mimo";
  assert.equal(lookupReasoning(id), null);
  await invokeChatCoreNonStreaming("xiaomi-mimo", "mimo-v1", id);
  assert.equal(lookupReasoning(id), "because the guard test says so");
});

test("non-streaming: a non-replay provider (openai) does NOT populate the reasoning cache", async () => {
  const id = "tc-reasoning-cache-nonstream-openai";
  assert.equal(lookupReasoning(id), null);
  await invokeChatCoreNonStreaming("openai", "gpt-5.1", id);
  assert.equal(lookupReasoning(id), null);
});

test("streaming: a replay provider (xiaomi-mimo) populates the reasoning cache", async () => {
  const id = "tc-reasoning-cache-stream-mimo";
  assert.equal(lookupReasoning(id), null);
  await invokeChatCoreStreaming("xiaomi-mimo", "mimo-v1", id);
  assert.equal(lookupReasoning(id), "because the guard test says so");
});

test("streaming: a non-replay provider (openai) does NOT populate the reasoning cache", async () => {
  const id = "tc-reasoning-cache-stream-openai";
  assert.equal(lookupReasoning(id), null);
  await invokeChatCoreStreaming("openai", "gpt-5.1", id);
  assert.equal(lookupReasoning(id), null);
});
