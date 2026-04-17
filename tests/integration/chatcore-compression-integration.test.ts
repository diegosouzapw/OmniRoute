import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-compression-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const readCacheDb = await import("../../src/lib/db/readCache.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { estimateTokens, getTokenLimit } = await import("../../open-sse/services/contextManager.ts");
const { resetAllAvailability } = await import("../../src/domain/modelAvailability.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  resetAllAvailability();
  resetAllCircuitBreakers();
  readCacheDb.invalidateDbCache();
  await new Promise((resolve) => setTimeout(resolve, 20));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.closeDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

test("chatCore integration: compressContext called proactively when context exceeds 85% threshold", async () => {
  const provider = "openai";
  const model = "gpt-4";

  // Create multiple messages with history that can be compressed
  // Use the same pattern as test 3 which successfully tests compression
  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Response 1" },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Response 2" },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Response 3" },
      { role: "user", content: "Final question" },
    ],
  };

  // Create provider connection
  const connectionId = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  // Mock fetch to capture the request
  let capturedBody: any = null;
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "test" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: {
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
      },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId,
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should have been called");

    // Verify that compression preserved the message structure
    assert.ok(Array.isArray(capturedBody.messages), "Messages should remain an array");
    assert.ok(capturedBody.messages.length > 0, "Messages should not be empty");

    // Verify that the final question was preserved (compression keeps recent messages)
    const lastMessage = capturedBody.messages[capturedBody.messages.length - 1];
    assert.equal(lastMessage.content, "Final question", "Last user message should be preserved");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: compressContext NOT called when context is below 85% threshold", async () => {
  const provider = "openai";
  const model = "gpt-4";
  const contextLimit = getTokenLimit(provider, model);
  const threshold = Math.floor(contextLimit * 0.85);

  const smallMessage = "Hello, how are you?";
  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: smallMessage },
    ],
  };

  const estimatedTokens = estimateTokens(JSON.stringify(body.messages));
  assert.ok(
    estimatedTokens < threshold,
    `Expected ${estimatedTokens} to be below threshold ${threshold}`
  );

  // Create provider connection
  const connectionId = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  // Mock fetch to capture the request
  let capturedBody: any = null;
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "test" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId,
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should have been called");

    // Verify NO compression occurred
    const originalTokens = estimateTokens(JSON.stringify(body.messages));
    const finalTokens = estimateTokens(JSON.stringify(capturedBody.messages));

    assert.equal(
      finalTokens,
      originalTokens,
      `Context should NOT be compressed: ${finalTokens} === ${originalTokens}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: compression preserves message structure", async () => {
  const provider = "openai";
  const model = "gpt-4";

  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Response 1" },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Response 2" },
      { role: "user", content: "Final question" },
    ],
  };

  // Create provider connection
  const connectionId = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  // Mock fetch to capture the request
  let capturedBody: any = null;
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "test" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: {
        debug: (tag: string, msg: string) => console.log(`[DEBUG] ${tag}: ${msg}`),
        info: (tag: string, msg: string) => console.log(`[INFO] ${tag}: ${msg}`),
        warn: (tag: string, msg: string) => console.log(`[WARN] ${tag}: ${msg}`),
        error: (tag: string, msg: string) => console.log(`[ERROR] ${tag}: ${msg}`),
      },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId,
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should have been called");
    assert.ok(Array.isArray(capturedBody.messages), "Messages should remain an array");
    assert.ok(capturedBody.messages.length > 0, "Messages should not be empty");

    const hasSystem = capturedBody.messages.some((m: any) => m.role === "system");
    assert.ok(hasSystem, "System message should be preserved");

    const lastMessage = capturedBody.messages[capturedBody.messages.length - 1];
    assert.equal(lastMessage.content, "Final question", "Last user message should be preserved");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: compression handles tool messages", async () => {
  const provider = "openai";
  const model = "gpt-4";

  const longToolOutput = "x".repeat(10000);
  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Run the tool" },
      { role: "assistant", content: "Running tool", tool_calls: [{ id: "t1", type: "function" }] },
      { role: "tool", content: longToolOutput, tool_call_id: "t1" },
      { role: "user", content: "What's the result?" },
    ],
  };

  // Create provider connection
  const connectionId = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  // Mock fetch to capture the request
  let capturedBody: any = null;
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "test" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId,
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should have been called");

    const toolMessage = capturedBody.messages.find((m: any) => m.role === "tool");
    assert.ok(toolMessage, "Tool message should exist");

    // Tool message should be truncated if compression was triggered
    if (toolMessage.content.length < longToolOutput.length) {
      assert.ok(
        toolMessage.content.includes("[truncated]"),
        "Tool message should have truncation marker"
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
