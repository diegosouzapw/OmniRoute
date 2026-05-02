import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-pipeline-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-chat-pipeline-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const callLogsDb = await import("../../src/lib/usage/callLogs.ts");
const readCacheDb = await import("../../src/lib/db/readCache.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { clearProviderFailure } = await import("../../open-sse/services/accountFallback.ts");
const { setCliCompatProviders } = await import("../../open-sse/config/cliFingerprints.ts");

const originalFetch = globalThis.fetch;
const originalRetryDelayMs = BaseExecutor.RETRY_CONFIG.delayMs;

function toPlainHeaders(headers: Headers | Record<string, unknown> | undefined | null) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildRequest({
  url = "http://localhost/v1/chat/completions",
  body,
  authKey = null,
  headers = {},
}: {
  url?: string;
  body?: unknown;
  authKey?: string | null;
  headers?: Record<string, string>;
} = {}) {
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (authKey) {
    requestHeaders.Authorization = `Bearer ${authKey}`;
  }

  return new Request(url, {
    method: "POST",
    headers: requestHeaders,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function buildOpenAIResponse(text = "ok", model = "gpt-4o-mini", usage = null) {
  return new Response(
    JSON.stringify({
      id: "chatcmpl_json",
      object: "chat.completion",
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: text },
          finish_reason: "stop",
        },
      ],
      usage: usage || {
        prompt_tokens: 4,
        completion_tokens: 2,
        total_tokens: 6,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildOpenAIToolCallResponse({
  model = "gpt-4o-mini",
  toolName = "lookupWeather@1.0.0",
  toolCallId = "call_weather",
  argumentsObject = { location: "Sao Paulo" },
} = {}) {
  return new Response(
    JSON.stringify({
      id: "chatcmpl_tool",
      object: "chat.completion",
      model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "",
            tool_calls: [
              {
                id: toolCallId,
                type: "function",
                function: {
                  name: toolName,
                  arguments: JSON.stringify(argumentsObject),
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: {
        prompt_tokens: 6,
        completion_tokens: 4,
        total_tokens: 10,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildClaudeResponse(text = "ok", model = "claude-3-5-sonnet-20241022") {
  return new Response(
    JSON.stringify({
      id: "msg_json",
      type: "message",
      role: "assistant",
      model,
      content: [{ type: "text", text }],
      stop_reason: "end_turn",
      usage: {
        input_tokens: 10,
        output_tokens: 4,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildClaudeStreamResponse(text = "streamed from claude", model = "claude-sonnet-4-6") {
  return new Response(
    [
      "event: message_start",
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_stream",
          type: "message",
          role: "assistant",
          model,
          usage: { input_tokens: 12, output_tokens: 0 },
        },
      })}`,
      "",
      "event: content_block_start",
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      })}`,
      "",
      "event: content_block_delta",
      `data: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text },
      })}`,
      "",
      "event: message_delta",
      `data: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 3 },
      })}`,
      "",
      "event: message_stop",
      `data: ${JSON.stringify({ type: "message_stop" })}`,
      "",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

function buildGeminiResponse(text = "ok", model = "gemini-2.5-flash") {
  return new Response(
    JSON.stringify({
      responseId: "resp_gemini",
      modelVersion: model,
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [{ text }],
          },
          finishReason: "STOP",
        },
      ],
      usageMetadata: {
        promptTokenCount: 5,
        candidatesTokenCount: 7,
        totalTokenCount: 12,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildOpenAIStreamResponse(text = "streamed from openai") {
  return new Response(
    [
      `data: ${JSON.stringify({
        id: "chatcmpl_stream",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { role: "assistant", content: text } }],
      })}`,
      "",
      "data: [DONE]",
      "",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

function buildOpenAIResponsesSSE({
  text = "responses streamed from codex",
  model = "gpt-5.1-codex",
  usage = null,
} = {}) {
  return new Response(
    [
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_stream",
          object: "response",
          status: "completed",
          model,
          output: [
            {
              id: "msg_stream",
              type: "message",
              role: "assistant",
              content: [{ type: "output_text", text, annotations: [] }],
            },
          ],
          usage: usage || {
            input_tokens: 120,
            output_tokens: 30,
            prompt_tokens_details: {
              cached_tokens: 40,
            },
            cache_creation_input_tokens: 11,
            completion_tokens_details: {
              reasoning_tokens: 13,
            },
          },
        },
      })}`,
      "",
      "data: [DONE]",
      "",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

function buildOpenAIResponsesJson({
  text = "responses compacted from codex",
  model = "gpt-5.5",
  usage = null,
} = {}) {
  return new Response(
    JSON.stringify({
      id: "resp_compact",
      object: "response",
      status: "completed",
      model,
      output: [
        {
          id: "msg_compact",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      output_text: text,
      usage: usage || {
        input_tokens: 90,
        output_tokens: 15,
        total_tokens: 105,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  process.env.REQUIRE_API_KEY = "false";
  clearInflight();
  resetAllCircuitBreakers();
  apiKeysDb.resetApiKeyState();
  readCacheDb.invalidateDbCache();
  invalidateMemorySettingsCache();
  await new Promise((resolve) => setTimeout(resolve, 20));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  initTranslators();
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-primary`,
    email: overrides.email,
    apiKey: overrides.apiKey || `sk-${provider}-${Math.random().toString(16).slice(2, 10)}`,
    accessToken: overrides.accessToken,
    refreshToken: overrides.refreshToken,
    tokenType: overrides.tokenType,
    expiresAt: overrides.expiresAt,
    tokenExpiresAt: overrides.tokenExpiresAt,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    priority: overrides.priority,
    rateLimitedUntil: overrides.rateLimitedUntil,
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

async function seedApiKey({
  name = "chat-pipeline-key",
  noLog = false,
  allowedConnections,
  allowedModels,
} = {}) {
  const key = await apiKeysDb.createApiKey(name, "machine-test");
  const updates = {};
  if (noLog) updates.noLog = true;
  if (allowedConnections) updates.allowedConnections = allowedConnections;
  if (allowedModels) updates.allowedModels = allowedModels;
  if (Object.keys(updates).length > 0) {
    await apiKeysDb.updateApiKeyPermissions(key.id, updates);
  }
  return key;
}

function ensureLegacyMemoryTable() {
  const db = core.getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS memory (
      id TEXT PRIMARY KEY,
      apiKeyId TEXT NOT NULL,
      sessionId TEXT,
      type TEXT NOT NULL,
      key TEXT,
      content TEXT NOT NULL,
      metadata TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      expiresAt TEXT
    )
  `);
}

function insertLegacyMemory(apiKeyId, content) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const hasModernTable = Boolean(
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'memories'").get()
  );

  if (hasModernTable) {
    db.prepare(
      `
        INSERT INTO memories (
          id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      `mem_${Math.random().toString(16).slice(2, 10)}`,
      apiKeyId,
      "",
      "factual",
      "pref",
      content,
      "{}",
      now,
      now,
      null
    );
    return;
  }

  ensureLegacyMemoryTable();
  db.prepare(
    `
      INSERT INTO memory (
        id, apiKeyId, sessionId, type, key, content, metadata, createdAt, updatedAt, expiresAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    `mem_${Math.random().toString(16).slice(2, 10)}`,
    apiKeyId,
    "",
    "factual",
    "pref",
    content,
    "{}",
    now,
    now,
    null
  );
}

async function waitFor(fn, timeoutMs = 1500) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await fn();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function getLatestCallLog() {
  const rows = await callLogsDb.getCallLogs({ limit: 5 });
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return callLogsDb.getCallLogById(rows[0].id);
}

async function getResponsesCallLogs() {
  const rows = await callLogsDb.getCallLogs({ limit: 200 });
  if (!Array.isArray(rows) || rows.length === 0) return [];
  return rows.filter((row) => row.path === "/v1/responses");
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  setCliCompatProviders([]);
  await resetStorage();
});

test.after(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  globalThis.fetch = originalFetch;
  clearInflight();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chat pipeline handles OpenAI passthrough with valid API key auth", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-primary" });
  const apiKey = await seedApiKey();
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("OpenAI passthrough");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Hello OpenAI" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /\/chat\/completions$/);
  assert.equal(fetchCalls[0].headers.Authorization, "Bearer sk-openai-primary");
  assert.equal(fetchCalls[0].body.messages[0].content, "Hello OpenAI");
  assert.equal(json.choices[0].message.content, "OpenAI passthrough");
});

test("chat pipeline persists Codex responses cache and reasoning tokens to call logs", async () => {
  await seedConnection("codex", { apiKey: "sk-codex-primary" });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponsesSSE();
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: {
        model: "codex/gpt-5.1-codex",
        stream: false,
        input: "Persist cache + reasoning usage",
      },
    })
  );

  const json = (await response.json()) as any;
  const callLog = await waitFor(() => getLatestCallLog());

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /\/responses$/);
  assert.equal(fetchCalls[0].headers.Authorization, "Bearer sk-codex-primary");
  assert.equal(json.object, "response");
  assert.equal(json.output[0].type, "message");
  assert.equal(json.output[0].content[0].text, "responses streamed from codex");
  assert.equal(json.output_text, "responses streamed from codex");
  assert.equal(json.usage.input_tokens_details.cached_tokens, 40);
  assert.equal(json.usage.output_tokens_details.reasoning_tokens, 13);

  assert.ok(callLog, "expected a call log row to be created");
  assert.equal(callLog.provider, "codex");
  assert.equal(callLog.path, "/v1/responses");
  assert.equal(callLog.tokens.cacheRead, 40);
  assert.equal(callLog.tokens.cacheWrite, 11);
  assert.equal(callLog.tokens.reasoning, 13);
});

test("chat pipeline applies Codex CLI fingerprint to OAuth responses requests", async () => {
  setCliCompatProviders(["codex"]);
  await seedConnection("codex", {
    apiKey: "unused-for-oauth",
    authType: "oauth",
    accessToken: "codex-oauth-token",
    providerSpecificData: {
      openaiStoreEnabled: false,
      requestDefaults: { reasoningEffort: "high" },
      codexInstallationId: "11111111-1111-4111-a111-111111111111",
    },
  });

  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      bodyString: String(init.body || ""),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponsesSSE({ text: "fingerprint ok" });
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: {
        model: "codex/gpt-5.5-low",
        stream: false,
        conversation_id: "conv_codex_fingerprint",
        input: [
          {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text: "Reply with fingerprint ok" }],
          },
        ],
      },
    })
  );

  await response.json();

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  const call = fetchCalls[0];
  assert.match(call.url, /chatgpt\.com\/backend-api\/codex\/responses$/);
  assert.equal(call.headers.Authorization, "Bearer codex-oauth-token");
  assert.equal(call.headers.Accept, "text/event-stream");
  assert.equal(call.headers.Version, "0.125.0");
  assert.equal(call.headers["Openai-Beta"], "responses=experimental");
  assert.equal(call.headers["X-Codex-Beta-Features"], "responses_websockets");
  assert.equal(call.headers["User-Agent"], "codex-cli/0.125.0 (Windows 10.0.26200; x64)");
  assert.equal(call.headers["x-codex-window-id"], "conv_codex_fingerprint:0");
  assert.ok(call.headers["x-client-request-id"], "expected Codex request id header");
  assert.ok(call.headers["x-codex-turn-metadata"], "expected Codex turn metadata header");

  const headerOrder = Object.keys(call.headers);
  assert.ok(headerOrder.indexOf("Content-Type") < headerOrder.indexOf("Authorization"));
  assert.ok(headerOrder.indexOf("Authorization") < headerOrder.indexOf("Accept"));
  assert.ok(headerOrder.indexOf("Accept") < headerOrder.indexOf("User-Agent"));

  const bodyOrder = Object.keys(JSON.parse(call.bodyString));
  assert.deepEqual(bodyOrder.slice(0, 7), [
    "model",
    "stream",
    "input",
    "instructions",
    "store",
    "reasoning",
    "prompt_cache_key",
  ]);
  assert.equal(call.body.model, "gpt-5.5");
  assert.equal(call.body.store, false);
  assert.equal(call.body.client_metadata["x-codex-installation-id"], "11111111-1111-4111-a111-111111111111");
});

test("chat pipeline treats Codex /responses/compact as non-streaming JSON", async () => {
  await seedConnection("codex", { apiKey: "sk-codex-compact" });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponsesJson();
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses/compact",
      headers: { Accept: "text/event-stream" },
      body: {
        model: "codex/gpt-5.5",
        input: "Compact this session",
      },
    })
  );

  const json = (await response.json()) as { object?: string; output_text?: string };
  const callLog = await waitFor(() => getLatestCallLog());

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /\/responses\/compact$/);
  assert.equal(fetchCalls[0].headers.Accept, "application/json");
  assert.equal(fetchCalls[0].body.stream, undefined);
  assert.equal(fetchCalls[0].body.store, undefined);
  assert.equal(json.object, "response");
  assert.equal(json.output_text, "responses compacted from codex");

  assert.ok(callLog, "expected a compact call log row to be created");
  assert.equal(callLog.provider, "codex");
  assert.equal(callLog.path, "/v1/responses/compact");
  assert.equal(callLog.status, 200);
});

test("chat pipeline serves repeated /v1/responses requests as MISS then HIT and logs cache hits separately", async () => {
  await seedConnection("codex", { apiKey: "sk-codex-cache-seq" });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponsesSSE({
      text: "cached semantic response",
      usage: {
        input_tokens: 21,
        output_tokens: 7,
        prompt_tokens_details: {
          cached_tokens: 5,
        },
        cache_creation_input_tokens: 2,
        completion_tokens_details: {
          reasoning_tokens: 3,
        },
      },
    });
  };

  const uniquePrompt = `semantic-cache-seq-${Math.random().toString(16).slice(2)}`;
  const requestBody = {
    model: "codex/gpt-5.3-codex",
    stream: false,
    temperature: 0,
    input: [{ role: "user", content: [{ type: "input_text", text: uniquePrompt }] }],
  };

  const beforeCount = (await getResponsesCallLogs()).length;

  const firstResponse = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: requestBody,
    })
  );

  const secondResponse = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: requestBody,
    })
  );

  const thirdResponse = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: requestBody,
    })
  );

  await firstResponse.json();
  await secondResponse.json();
  await thirdResponse.json();

  assert.equal(firstResponse.status, 200);
  assert.equal(secondResponse.status, 200);
  assert.equal(thirdResponse.status, 200);

  assert.equal(firstResponse.headers.get("X-OmniRoute-Cache"), "MISS");
  assert.equal(secondResponse.headers.get("X-OmniRoute-Cache"), "HIT");
  assert.equal(thirdResponse.headers.get("X-OmniRoute-Cache"), "HIT");

  assert.equal(fetchCalls.length, 1, "expected upstream to be called only once for MISS");
  assert.match(fetchCalls[0].url, /\/responses$/);

  const callLogs = await waitFor(async () => {
    const rows = await getResponsesCallLogs();
    return rows.length === beforeCount + 3 ? rows : null;
  }, 2000);

  assert.ok(callLogs, "expected /v1/responses call logs to be recorded");
  assert.equal(callLogs.length, beforeCount + 3, "expected MISS plus two HIT call logs");

  const newLogs = callLogs.slice(0, 3);
  assert.equal(newLogs.filter((row) => row.cacheSource === "upstream").length, 1);
  assert.equal(newLogs.filter((row) => row.cacheSource === "semantic").length, 2);

  const callLog = await waitFor(() => getLatestCallLog());
  assert.ok(callLog, "expected a call log row to exist");
  assert.equal(callLog.path, "/v1/responses");
  assert.equal(callLog.status, 200);
});

test("chat pipeline translates OpenAI requests to Claude and returns OpenAI-shaped responses", async () => {
  await seedConnection("claude", { apiKey: "sk-claude-primary" });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildClaudeResponse("Claude translated reply");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "claude/claude-3-5-sonnet-20241022",
        stream: false,
        messages: [{ role: "user", content: "Hello Claude" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /\?beta=true$/);
  assert.equal(fetchCalls[0].headers["x-api-key"], "sk-claude-primary");
  assert.equal(fetchCalls[0].body.messages[0].role, "user");
  assert.equal(fetchCalls[0].body.messages[0].content[0].text, "Hello Claude");
  assert.equal(json.object, "chat.completion");
  assert.equal(json.choices[0].message.content, "Claude translated reply");
});

test("chat pipeline translates OpenAI requests to Gemini and returns OpenAI-shaped responses", async () => {
  await seedConnection("gemini", { apiKey: "sk-gemini-primary" });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildGeminiResponse("Gemini translated reply");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "gemini/gemini-2.5-flash",
        stream: false,
        messages: [{ role: "user", content: "Hello Gemini" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /generateContent$/);
  assert.equal(fetchCalls[0].headers["x-goog-api-key"], "sk-gemini-primary");
  assert.equal(fetchCalls[0].body.contents[0].role, "user");
  assert.equal(fetchCalls[0].body.contents[0].parts[0].text, "Hello Gemini");
  assert.equal(json.object, "chat.completion");
  assert.equal(json.choices[0].message.content, "Gemini translated reply");
});

test("chat pipeline translates Claude-format requests into OpenAI upstream and back to Claude", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-claude-route" });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("OpenAI answered Claude client");
  };

  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/messages",
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        max_tokens: 128,
        system: [{ text: "Be brief" }],
        messages: [{ role: "user", content: [{ type: "text", text: "Hello from Claude client" }] }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.match(fetchCalls[0].url, /\/chat\/completions$/);
  assert.equal(fetchCalls[0].body.messages[0].role, "system");
  assert.equal(fetchCalls[0].body.messages[0].content, "Be brief");
  assert.equal(fetchCalls[0].body.messages[1].content, "Hello from Claude client");
  assert.equal(json.type, "message");
  assert.equal(json.role, "assistant");
  assert.equal(json.content[0].text, "OpenAI answered Claude client");
});

test("chat pipeline converts Claude SSE streams into OpenAI SSE output", async () => {
  await seedConnection("claude", { apiKey: "sk-claude-stream" });

  globalThis.fetch = async () => buildClaudeStreamResponse("Streamed Claude chunk");

  const response = await handleChat(
    buildRequest({
      body: {
        model: "claude/claude-sonnet-4-6",
        stream: true,
        messages: [{ role: "user", content: "Stream this" }],
      },
    })
  );

  const raw = await response.text();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  assert.match(raw, /chat\.completion\.chunk/);
  assert.match(raw, /Streamed Claude chunk/);
  assert.match(raw, /\[DONE\]/);
});

test("chat pipeline rejects invalid API keys and malformed JSON bodies", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-invalid-key-path" });

  const invalidKeyResponse = await handleChat(
    buildRequest({
      authKey: "does-not-exist",
      body: {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: "Hello" }],
      },
    })
  );
  const invalidKeyJson = (await invalidKeyResponse.json()) as any;

  const invalidJsonResponse = await handleChat(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{bad-json",
    })
  );
  const invalidJson = (await invalidJsonResponse.json()) as any;

  assert.equal(invalidKeyResponse.status, 401);
  assert.match(invalidKeyJson.error.message, /Invalid API key|Incorrect API key/i);
  assert.equal(invalidJsonResponse.status, 400);
  assert.match(invalidJson.error.message, /Invalid JSON body/i);
});

test("chat pipeline allows unauthenticated requests through to provider resolution when called directly (authz pipeline enforces REQUIRE_API_KEY at route level)", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Missing auth" }],
      },
    })
  );
  const json = (await response.json()) as any;

  // handleChat does not enforce REQUIRE_API_KEY — that's the authz pipeline's job.
  // Without provider credentials seeded, the request falls through to the "no credentials" path.
  assert.equal(response.status, 400);
  assert.match(json.error.message, /No credentials for provider/i);
});

test("chat pipeline returns 400 when the model field is omitted", async () => {
  const response = await handleChat(
    buildRequest({
      body: {
        stream: false,
        messages: [{ role: "user", content: "No model selected" }],
      },
    })
  );
  const json = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(json.error.message, /Missing model/i);
});

test("chat pipeline treats Accept text/event-stream as streaming mode and returns a session header", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-accept-stream" });

  globalThis.fetch = async () => buildOpenAIStreamResponse("Accept header stream");

  const response = await handleChat(
    buildRequest({
      headers: { Accept: "application/json, text/event-stream" },
      body: {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: "Stream via Accept" }],
      },
    })
  );

  const raw = await response.text();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  assert.ok(response.headers.get("X-OmniRoute-Session-Id"));
  assert.match(raw, /Accept header stream/);
  assert.match(raw, /\[DONE\]/);
});

test("chat pipeline supports local mode without Authorization on explicit combos", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-local-combo" });
  await combosDb.createCombo({
    name: "local-router",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  });
  const fetchCalls = [];

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
    });
    return buildOpenAIResponse("Local combo route");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "local-router",
        stream: false,
        messages: [{ role: "user", content: "No auth header here" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(json.choices[0].message.content, "Local combo route");
});

test("chat pipeline honors noLog by redacting persisted call log payloads", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-no-log" });
  const apiKey = await seedApiKey({ noLog: true });

  globalThis.fetch = async () => buildOpenAIResponse("No-log reply");

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Do not persist payloads" }],
      },
    })
  );

  assert.equal(response.status, 200);

  const callLog = await waitFor(() => getLatestCallLog());
  assert.ok(callLog, "expected a call log row to be created");
  assert.equal(callLog.apiKeyId, apiKey.id);
  assert.equal(callLog.requestBody, null);
  assert.equal(callLog.responseBody, null);
  assert.equal(callLog.artifactRelPath, null);
});

test("chat pipeline returns current no-credentials contract when no provider connection exists", async () => {
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Hello" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 400);
  assert.match(json.error.message, /No credentials for provider: openai/);
});

test("chat pipeline surfaces upstream 500 responses as structured errors", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-500" });

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "provider exploded" } }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Trigger 500" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 500);
  assert.match(json.error.message, /\[500\]: provider exploded/);
});

test("chat pipeline returns 429 with Retry-After when the upstream rate-limits the only account", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-429" });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  let attempts = 0;

  globalThis.fetch = async () => {
    attempts += 1;
    return new Response(
      JSON.stringify({
        error: {
          message: "Rate limit exceeded. Your quota will reset after 30s.",
        },
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Trigger 429" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 429);
  assert.ok(attempts >= 1, "expected at least one upstream attempt");
  assert.ok(Number(response.headers.get("Retry-After")) >= 1);
  assert.match(json.error.message, /\[openai\/gpt-4o-mini\]/);
});

test("chat pipeline keeps provider breaker closed for repeated connection-scoped 429s", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-429-breaker" });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: {
          message: "Rate limit exceeded. Your quota will reset after 30s.",
        },
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );

  for (let i = 0; i < 3; i += 1) {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/gpt-4o-mini",
          stream: false,
          messages: [{ role: "user", content: `Trigger 429 #${i + 1}` }],
        },
      })
    );
    assert.equal(response.status, 429);
  }

  const breaker = getCircuitBreaker("openai");
  const status = breaker.getStatus();

  assert.equal(status.state, "CLOSED");
  assert.equal(status.failureCount, 0);
});

test("chat pipeline maps upstream timeouts to 504 responses", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-timeout" });

  globalThis.fetch = async () => {
    const error = new Error("upstream timed out");
    error.name = "TimeoutError";
    throw error;
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Trigger timeout" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 504);
  assert.match(json.error.message, /\[504\]: upstream timed out/);
});

test("chat pipeline injects memory context before sending the upstream request", async () => {
  // Reset provider failure state to avoid circuit breaker interference
  clearProviderFailure("openai");
  await seedConnection("openai", { apiKey: "sk-openai-memory" });
  const apiKey = await seedApiKey();
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 400,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();
  insertLegacyMemory(apiKey.id, "User prefers concise answers.");

  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("Memory-aware reply");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Summarize my preference" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].body.messages[0].role, "system");
  assert.match(fetchCalls[0].body.messages[0].content, /User prefers concise answers/);
  assert.equal(json.choices[0].message.content, "Memory-aware reply");
});

test("chat pipeline injects skills into tools and intercepts tool calls with skill output", async () => {
  // Reset provider failure state to avoid circuit breaker interference
  clearProviderFailure("openai");
  await seedConnection("openai", { apiKey: "sk-openai-skills" });
  const apiKey = await seedApiKey();
  await settingsDb.updateSettings({ skillsEnabled: true });
  invalidateMemorySettingsCache();

  const handlerName = `weather-handler-${Date.now()}`;
  skillExecutor.registerHandler(handlerName, async (input) => ({
    forecast: `Sunny in ${input.location}`,
  }));

  await skillRegistry.register({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    version: "1.0.0",
    description: "Return a canned forecast",
    schema: {
      input: {
        type: "object",
        properties: {
          location: { type: "string" },
        },
      },
      output: {
        type: "object",
      },
    },
    handler: handlerName,
    enabled: true,
  });

  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIToolCallResponse();
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Check the weather" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.ok(Array.isArray(fetchCalls[0].body.tools));
  assert.equal(fetchCalls[0].body.tools[0].function.name, "lookupWeather@1.0.0");
  assert.equal(json.choices[0].finish_reason, "tool_calls");
  assert.equal(json.tool_results[0].tool_call_id, "call_weather");
  assert.equal(JSON.parse(json.tool_results[0].output).forecast, "Sunny in Sao Paulo");
});

test("chat pipeline falls back to the next account after a provider failure", async () => {
  // Reset provider failure state to avoid circuit breaker interference
  clearProviderFailure("openai");
  await seedConnection("openai", {
    name: "openai-primary",
    apiKey: "sk-openai-primary-fallback",
    priority: 1,
  });
  await seedConnection("openai", {
    name: "openai-secondary",
    apiKey: "sk-openai-secondary-fallback",
    priority: 2,
  });
  const seenAuthHeaders = [];

  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    seenAuthHeaders.push(headers.Authorization);
    if (seenAuthHeaders.length === 1) {
      return new Response(JSON.stringify({ error: { message: "first account failed" } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return buildOpenAIResponse("Second account succeeded");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Use account fallback" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.deepEqual(seenAuthHeaders, [
    "Bearer sk-openai-primary-fallback",
    "Bearer sk-openai-secondary-fallback",
  ]);
  assert.equal(json.choices[0].message.content, "Second account succeeded");
});

test("chat pipeline falls back across combo models when the first provider fails", async () => {
  // Reset provider failure state to avoid circuit breaker interference
  clearProviderFailure("openai");
  clearProviderFailure("claude");
  await seedConnection("openai", { apiKey: "sk-openai-combo-fail" });
  await seedConnection("claude", { apiKey: "sk-claude-combo-fail" });
  await combosDb.createCombo({
    name: "combo-fallback",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });
  const attempts = [];

  globalThis.fetch = async (url, init = {}) => {
    const call = {
      url: String(url),
      headers: toPlainHeaders(init.headers),
    };
    attempts.push(call);
    if (attempts.length === 1) {
      return new Response(JSON.stringify({ error: { message: "openai combo miss" } }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
    return buildClaudeResponse("Claude combo fallback");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "combo-fallback",
        stream: false,
        messages: [{ role: "user", content: "Use combo fallback" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(attempts.length, 2);
  assert.match(attempts[0].url, /\/chat\/completions$/);
  assert.match(attempts[1].url, /\?beta=true$/);
  assert.equal(json.choices[0].message.content, "Claude combo fallback");
});

test("chat pipeline deduplicates concurrent identical non-stream requests", async () => {
  // Reset provider failure state to avoid circuit breaker interference
  clearProviderFailure("openai");
  await seedConnection("openai", { apiKey: "sk-openai-dedup" });
  let fetchCount = 0;

  globalThis.fetch = async () => {
    fetchCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 25));
    return buildOpenAIResponse("Deduplicated response");
  };

  const requestA = buildRequest({
    body: {
      model: "openai/gpt-4o-mini",
      stream: false,
      temperature: 0,
      messages: [{ role: "user", content: "Deduplicate this request" }],
    },
  });
  const requestB = buildRequest({
    body: {
      model: "openai/gpt-4o-mini",
      stream: false,
      temperature: 0,
      messages: [{ role: "user", content: "Deduplicate this request" }],
    },
  });

  const [responseA, responseB] = await Promise.all([handleChat(requestA), handleChat(requestB)]);
  const [jsonA, jsonB] = await Promise.all([responseA.json(), responseB.json()]);

  assert.equal(responseA.status, 200);
  assert.equal(responseB.status, 200);
  assert.equal(fetchCount, 1);
  assert.equal(jsonA.choices[0].message.content, "Deduplicated response");
  assert.equal(jsonB.choices[0].message.content, "Deduplicated response");
});
