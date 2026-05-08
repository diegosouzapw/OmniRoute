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
const combosDb = await import("../../src/lib/db/combos.ts");
const compressionDb = await import("../../src/lib/db/compression.ts");
const compressionCombosDb = await import("../../src/lib/db/compressionCombos.ts");
const compressionAnalyticsDb = await import("../../src/lib/db/compressionAnalytics.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { estimateTokens, getTokenLimit } = await import("../../open-sse/services/contextManager.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
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

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
  });

  // Create multiple messages with history that can be compressed
  // Use the same pattern as test 3 which successfully tests compression
  const body = {
    model,
    stream: false,
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
  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });
  const connectionId = connection.id;

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
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
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

test("chatCore integration: disabled prompt compression leaves combo override requests unchanged", async () => {
  const provider = "openai";
  const model = "gpt-4";
  const originalContextLength = process.env.CONTEXT_LENGTH_OPENAI;
  process.env.CONTEXT_LENGTH_OPENAI = "8192";

  await compressionDb.updateCompressionSettings({
    enabled: false,
    defaultMode: "off",
    autoTriggerTokens: 1,
    comboOverrides: { "disabled-compression-combo": "lite" },
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  await combosDb.createCombo({
    name: "disabled-compression-combo",
    strategy: "priority",
    models: [
      {
        kind: "model",
        model: `${provider}/${model}`,
        connectionId: connection.id,
      },
    ],
    config: {
      compressionMode: "lite",
    },
  });

  const body = {
    model: "combo/disabled-compression-combo",
    stream: false,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: `${"Keep   spacing.\n\n\n".repeat(2000)}First long turn.` },
      { role: "assistant", content: "Response 1" },
      { role: "user", content: `${"Keep   spacing.\n\n\n".repeat(2000)}Second long turn.` },
      { role: "assistant", content: "Response 2" },
      { role: "user", content: `${"Keep   spacing.\n\n\n".repeat(2000)}Final question.` },
    ],
  };
  const contextLimit = getTokenLimit(provider, model);
  const proactiveThreshold = Math.floor(contextLimit * 0.7);
  assert.ok(
    estimateTokens(JSON.stringify(body.messages)) > proactiveThreshold,
    "Test body should exceed proactive compression threshold"
  );

  let capturedBody: { messages?: Array<{ role?: string; content?: string }> } | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string) as typeof capturedBody;
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
      connectionId: connection.id,
      isCombo: true,
      comboName: "disabled-compression-combo",
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should have been called");
    assert.deepEqual(capturedBody.messages, body.messages);

    const summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    assert.equal(summary.totalRequests, 0, "Disabled compression should not record analytics");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalContextLength === undefined) {
      delete process.env.CONTEXT_LENGTH_OPENAI;
    } else {
      process.env.CONTEXT_LENGTH_OPENAI = originalContextLength;
    }
  }
});

test("chatCore integration: compressContext NOT called when context is below 85% threshold", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
  });
  const contextLimit = getTokenLimit(provider, model);
  const threshold = Math.floor(contextLimit * 0.85);

  const smallMessage = "Hello, how are you?";
  const body = {
    model,
    stream: false,
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
  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });
  const connectionId = connection.id;

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
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
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

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
  });

  const body = {
    model,
    stream: false,
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
  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });
  const connectionId = connection.id;

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
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
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
    stream: false,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Run the tool" },
      { role: "assistant", content: "Running tool", tool_calls: [{ id: "t1", type: "function" }] },
      { role: "tool", content: longToolOutput, tool_call_id: "t1" },
      { role: "user", content: "What's the result?" },
    ],
  };

  // Create provider connection
  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });
  const connectionId = connection.id;

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
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
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

test("chatCore integration: combo requests run proactive compression before Kiro translation", async () => {
  const provider = "kiro";
  const model = "claude-sonnet-4.5";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });
  const connectionId = connection.id;

  await combosDb.createCombo({
    name: "test-kiro-compression-combo",
    strategy: "priority",
    models: [
      {
        kind: "model",
        model: `${provider}/${model}`,
        connectionId,
      },
    ],
  });

  const body = {
    model: "combo/test-kiro-compression-combo",
    stream: false,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Ack 1" },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Ack 2" },
      { role: "user", content: "x".repeat(50000) },
      { role: "assistant", content: "Ack 3" },
      { role: "user", content: "Please summarize everything." },
    ],
  };

  let capturedTranslatedBody: Record<string, unknown> | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedTranslatedBody = JSON.parse(init.body as string) as Record<string, unknown>;
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
        usage: { prompt_tokens: 11, completion_tokens: 5, total_tokens: 16 },
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
      isCombo: true,
      comboName: "test-kiro-compression-combo",
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
    });

    // Kiro response translation in this integration harness may fail depending on upstream
    // payload shape, but the regression target is request-side behavior before translation.
    assert.ok(result, "Handler should return a result object");
    assert.ok(capturedTranslatedBody, "Translated body should be sent upstream");

    // Ensure request was translated to Kiro shape (messages are not sent directly upstream).
    const conversationState = capturedTranslatedBody?.conversationState as
      | Record<string, unknown>
      | undefined;
    assert.ok(conversationState, "Kiro translated request should include conversationState");

    const history = Array.isArray(conversationState?.history)
      ? (conversationState.history as unknown[])
      : [];
    assert.ok(
      history.length < body.messages.length - 1,
      "History should be reduced by proactive compression before translation"
    );

    const currentMessage = conversationState?.currentMessage as Record<string, unknown> | undefined;
    const userInputMessage = currentMessage?.userInputMessage as
      | Record<string, unknown>
      | undefined;
    const currentContent =
      typeof userInputMessage?.content === "string" ? userInputMessage.content : "";
    assert.match(currentContent, /Please summarize everything\./);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: assigned compression combo applies language packs and output mode", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
    cavemanOutputMode: {
      enabled: false,
      intensity: "full",
      autoClarity: true,
    },
    languageConfig: {
      enabled: false,
      defaultLanguage: "en",
      autoDetect: true,
      enabledPacks: ["en"],
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  const routingCombo = await combosDb.createCombo({
    name: "assigned-compression-combo",
    strategy: "priority",
    models: [
      {
        kind: "model",
        model: `${provider}/${model}`,
        connectionId: connection.id,
      },
    ],
  });

  const compressionCombo = compressionCombosDb.createCompressionCombo({
    name: "Assigned PT Output Mode",
    pipeline: [{ engine: "caveman", intensity: "lite" }],
    languagePacks: ["pt-BR"],
    outputMode: true,
    outputModeIntensity: "lite",
  });
  assert.equal(
    compressionCombosDb.assignRoutingCombo(compressionCombo.id, routingCombo.id as string),
    true
  );

  let capturedBody: any = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
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
      body: {
        model: "combo/assigned-compression-combo",
        stream: false,
        messages: [{ role: "user", content: "Resuma esta implementacao." }],
      },
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId: connection.id,
      isCombo: true,
      comboName: "assigned-compression-combo",
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should receive the request body");
    const firstMessage = capturedBody.messages?.[0];
    assert.equal(firstMessage?.role, "system");
    assert.match(firstMessage?.content ?? "", /OmniRoute Caveman Output Mode/);
    assert.match(firstMessage?.content ?? "", /Responda conciso/);

    for (
      let attempt = 0;
      attempt < 100 && compressionAnalyticsDb.getCompressionAnalyticsSummary().totalRequests === 0;
      attempt += 1
    ) {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: default stacked compression combo applies for unassigned stacked requests", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "stacked",
    autoTriggerTokens: 0,
    cavemanOutputMode: {
      enabled: false,
      intensity: "full",
      autoClarity: true,
    },
    languageConfig: {
      enabled: false,
      defaultLanguage: "en",
      autoDetect: true,
      enabledPacks: ["en"],
    },
  });

  const compressionCombo = compressionCombosDb.createCompressionCombo({
    name: "Default PT Output Mode",
    pipeline: [
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "lite" },
    ],
    languagePacks: ["pt-BR"],
    outputMode: true,
    outputModeIntensity: "lite",
    isDefault: true,
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  let capturedBody: { messages?: Array<{ role?: string; content?: string }> } | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string) as typeof capturedBody;
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
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
      body: {
        model,
        stream: false,
        messages: [{ role: "user", content: "Resuma esta implementacao." }],
      },
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId: connection.id,
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should receive the request body");
    const firstMessage = capturedBody.messages?.[0];
    assert.equal(firstMessage?.role, "system");
    assert.match(firstMessage?.content ?? "", /OmniRoute Caveman Output Mode/);
    assert.match(firstMessage?.content ?? "", /Responda conciso/);

    let summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    for (
      let attempt = 0;
      attempt < 100 && !summary.byCompressionCombo[compressionCombo.id];
      attempt += 1
    ) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    }

    assert.equal(summary.byCompressionCombo[compressionCombo.id].count, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: seeded default combo runs RTK before Caveman", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "stacked",
    autoTriggerTokens: 0,
    cavemanOutputMode: {
      enabled: false,
      intensity: "full",
      autoClarity: true,
    },
    languageConfig: {
      enabled: false,
      defaultLanguage: "en",
      autoDetect: true,
      enabledPacks: ["en"],
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  let capturedBody: { messages?: Array<{ role?: string; content?: string }> } | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string) as typeof capturedBody;
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
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
      body: {
        model,
        stream: false,
        messages: [
          {
            role: "tool",
            content: Array.from({ length: 8 }, () => "same noisy line").join("\n"),
          },
        ],
      },
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId: connection.id,
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
    });

    assert.ok(result.success, "Request should succeed");
    assert.ok(capturedBody, "Fetch should receive the request body");
    const toolContent = capturedBody.messages?.[0]?.content ?? "";
    assert.match(toolContent, /rtk:dropped 7 repeated lines/);

    let summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    for (
      let attempt = 0;
      attempt < 100 &&
      (summary.byCompressionCombo["default-caveman"]?.count !== 1 ||
        summary.realUsage.requestsWithReceipts === 0);
      attempt += 1
    ) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    }

    assert.equal(summary.totalRequests, 1);
    assert.equal(summary.byCompressionCombo["default-caveman"].count, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: modular compression records analytics row best-effort", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "lite",
    autoTriggerTokens: 0,
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  const body = {
    model,
    stream: false,
    messages: [
      {
        role: "user",
        content: `Please help with this request.   ${"Keep spacing.   ".repeat(400)}\n\n\n\nFinal line.`,
      },
    ],
  };

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId: connection.id,
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
    });

    assert.ok(result.success, "Request should succeed");

    let summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    for (
      let attempt = 0;
      attempt < 100 &&
      (summary.totalRequests === 0 || summary.realUsage.requestsWithReceipts === 0);
      attempt += 1
    ) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    }

    assert.equal(summary.totalRequests, 1);
    assert.ok(summary.totalTokensSaved > 0, "Analytics should record token savings");
    assert.equal(summary.byMode.lite.count, 1);
    assert.equal(summary.byProvider.openai.count, 1);
    assert.equal(summary.realUsage.requestsWithReceipts, 1);
    assert.equal(summary.realUsage.totalTokens, 15);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("chatCore integration: caveman output mode records analytics and receipts without prompt compression", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: false,
    defaultMode: "off",
    autoTriggerTokens: 0,
    cavemanOutputMode: {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  let capturedBody: any = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
        usage: { prompt_tokens: 20, completion_tokens: 4, total_tokens: 24 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const result = await handleChatCore({
      body: {
        model,
        stream: false,
        messages: [{ role: "user", content: "Summarize this implementation." }],
      },
      modelInfo: { provider, model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      connectionId: connection.id,
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
    });

    assert.ok(result.success, "Request should succeed");
    assert.match(capturedBody.messages[0].content, /Caveman Output Mode/);

    let summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    for (
      let attempt = 0;
      attempt < 100 &&
      (summary.totalRequests === 0 || summary.realUsage.requestsWithReceipts === 0);
      attempt += 1
    ) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      summary = compressionAnalyticsDb.getCompressionAnalyticsSummary();
    }

    assert.equal(summary.byMode["output-caveman"].count, 1);
    assert.equal(summary.realUsage.requestsWithReceipts, 1);
    assert.equal(summary.realUsage.totalTokens, 24);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
