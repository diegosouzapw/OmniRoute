// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-translation-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");
const { invalidateCacheControlSettingsCache } =
  await import("../../src/lib/cacheControlSettings.ts");
const { clearCache, getCachedResponse, generateSignature } =
  await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const {
  buildAccountSemaphoreKey,
  getStats: getAccountSemaphoreStats,
  resetAll: resetAccountSemaphores,
} = await import("../../open-sse/services/accountSemaphore.ts");
const { clearModelLock, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const {
  getBackgroundDegradationConfig,
  setBackgroundDegradationConfig,
  resetStats: resetBackgroundStats,
} = await import("../../open-sse/services/backgroundTaskDetector.ts");
const { getCallLogs, getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
const {
  handleChatCore,
  shouldUseNativeCodexPassthrough,
  isTokenExpiringSoon,
  clearUpstreamProxyConfigCache,
} = await import("../../open-sse/handlers/chatCore.ts");
const { resetPayloadRulesConfigForTests, setPayloadRulesConfig } =
  await import("../../open-sse/services/payloadRules.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { register, getRequestTranslator } = await import("../../open-sse/translator/registry.ts");

const originalFetch = globalThis.fetch;
const originalResponsesToOpenAI = getRequestTranslator(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI);
const originalSetTimeout = globalThis.setTimeout;
const originalBackgroundConfig = getBackgroundDegradationConfig();
const originalCallLogPipelineCaptureStreamChunks =
  process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function restorePipelineCaptureEnv() {
  if (originalCallLogPipelineCaptureStreamChunks === undefined) {
    delete process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS;
  } else {
    process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS =
      originalCallLogPipelineCaptureStreamChunks;
  }
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildOpenAIResponse(stream, text = "ok") {
  if (stream) {
    return new Response(
      `data: ${JSON.stringify({
        id: "chatcmpl-stream",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: { role: "assistant", content: text } }],
      })}\n\ndata: [DONE]\n\n`,
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      id: "chatcmpl-json",
      object: "chat.completion",
      model: "gpt-4o-mini",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: text },
          finish_reason: "stop",
        },
      ],
      usage: {
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

function buildClaudeResponse(stream, text = "ok") {
  if (stream) {
    return new Response(
      [
        "event: message_start",
        `data: ${JSON.stringify({
          type: "message_start",
          message: {
            id: "msg_stream",
            type: "message",
            role: "assistant",
            model: "claude-sonnet-4-6",
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

  return new Response(
    JSON.stringify({
      id: "msg_json",
      type: "message",
      role: "assistant",
      model: "claude-sonnet-4-6",
      content: [{ type: "text", text }],
      stop_reason: "end_turn",
      usage: {
        input_tokens: 12,
        output_tokens: 3,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildResponsesResponse(text = "ok") {
  return new Response(
    JSON.stringify({
      id: "resp_123",
      object: "response",
      status: "completed",
      model: "gpt-5.1-codex",
      output: [
        {
          id: "msg_123",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: {
        input_tokens: 4,
        output_tokens: 2,
        total_tokens: 6,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function capabilityEntry(limitContext) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
  };
}

function hasCacheControl(value) {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) {
    return value.some((item) => hasCacheControl(item));
  }
  if (Object.hasOwn(value, "cache_control")) return true;
  return Object.values(value).some((item) => hasCacheControl(item));
}

function collectTextBlocks(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.flatMap((message) =>
    Array.isArray(message.content) ? message.content.filter((block) => block?.type === "text") : []
  );
}

async function resetStorage() {
  clearUpstreamProxyConfigCache();
  resetPayloadRulesConfigForTests();
  register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, originalResponsesToOpenAI, null);
  invalidateCacheControlSettingsCache();
  clearCache();
  clearIdempotency();
  clearInflight();
  clearModelsDevCapabilities();
  setBackgroundDegradationConfig(originalBackgroundConfig);
  resetBackgroundStats();
  globalThis.setTimeout = originalSetTimeout;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
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

async function waitForAsyncSideEffects() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setTimeout(resolve, 10));
}

async function getLatestCallLog() {
  const rows = await getCallLogs({ limit: 5 });
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return getCallLogById(rows[0].id);
}

async function invokeChatCore({
  body,
  provider = "openai",
  model = "gpt-4o-mini",
  endpoint = "/v1/chat/completions",
  accept = "application/json",
  userAgent = "unit-test",
  credentials,
  apiKeyInfo = null,
  responseFormat = "openai",
  responseFactory,
  isCombo = false,
  comboStrategy = null,
  requestHeaders = {},
  connectionId = null,
  onCredentialsRefreshed = null,
  onRequestSuccess = null,
}: any = {}) {
  const calls: any[] = [];

  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(captured);

    if (responseFactory) {
      return responseFactory(captured, calls);
    }

    const upstreamStream = String(headers.Accept || headers.accept || "")
      .toLowerCase()
      .includes("text/event-stream");
    if (responseFormat === "claude") return buildClaudeResponse(upstreamStream);
    if (responseFormat === "openai-responses") return buildResponsesResponse();
    return buildOpenAIResponse(upstreamStream);
  };

  try {
    const requestBody = structuredClone(body);
    const result = await handleChatCore({
      body: requestBody,
      modelInfo: { provider, model, extendedContext: false },
      credentials: credentials || {
        apiKey: "sk-test",
        providerSpecificData: {},
      },
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept, ...requestHeaders }),
      },
      connectionId,
      apiKeyInfo,
      userAgent,
      isCombo,
      comboStrategy,
      onCredentialsRefreshed,
      onRequestSuccess,
    } as any);
    await waitForAsyncSideEffects();

    return { result, calls, call: calls.at(-1) };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  restorePipelineCaptureEnv();
  resetAccountSemaphores();
  await waitForAsyncSideEffects();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  restorePipelineCaptureEnv();
  resetAccountSemaphores();
  await waitForAsyncSideEffects();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chatCore can disable pipeline stream chunk capture through environment", async () => {
  process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS = "false";
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });

  const { result } = await invokeChatCore({
    accept: "text/event-stream",
    body: {
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: "stream without chunk logging" }],
    },
  });

  assert.equal(result.success, true);
  await result.response.text();
  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected call log detail to be persisted");
  assert.ok(detail.pipelinePayloads, "expected pipeline payloads when capture is enabled");
  assert.equal((detail.pipelinePayloads as any).streamChunks, undefined);
});

test("chatCore keeps Responses-native Codex payloads in native passthrough mode", async () => {
  const { call, result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.1-codex",
    endpoint: "/v1/responses",
    credentials: { accessToken: "codex-token", providerSpecificData: {} },
    body: {
      model: "gpt-5.1-codex",
      input: "ship it",
      instructions: "custom system prompt",
      store: true,
      metadata: { source: "codex-client" },
      stream: false,
    },
    responseFormat: "openai-responses",
  });

  assert.equal(result.success, true);
  assert.match(call.url, /\/responses$/);
  assert.equal(call.body.input, "ship it");
  assert.equal(call.body.instructions, "custom system prompt");
  assert.equal(call.body.store, false);
  assert.deepEqual(call.body.metadata, { source: "codex-client" });
  assert.equal("messages" in call.body, false);
});

test("chatCore honors providerSpecificData.apiType for legacy openai-compatible providers", async () => {
  const { call, result } = await invokeChatCore({
    provider: "openai-compatible-sp-openai",
    model: "gpt-5.4",
    endpoint: "/v1/chat/completions",
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        apiType: "responses",
        baseUrl: "https://proxy.example.com/v1",
        prefix: "sp-openai",
      },
    },
    body: {
      model: "gpt-5.4",
      stream: false,
      messages: [{ role: "user", content: "Reply with OK only." }],
      max_tokens: 64,
    },
    responseFormat: "openai-responses",
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.match(call.url, /\/responses$/);
  assert.ok(call.body.input);
  assert.equal("messages" in call.body, false);
  assert.equal(payload.choices[0].message.content, "ok");
});

test("chatCore helper exports detect responses passthrough paths and token expiry windows", () => {
  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/responses///",
    }),
    true
  );
  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/chat/completions",
    }),
    false
  );
  assert.equal(
    isTokenExpiringSoon(new Date(Date.now() + 60_000).toISOString(), 5 * 60 * 1000),
    true
  );
  assert.equal(
    isTokenExpiringSoon(new Date(Date.now() + 10 * 60 * 1000).toISOString(), 5 * 60 * 1000),
    false
  );
  assert.equal(isTokenExpiringSoon(null), false);
});

test("chatCore applies payload rules after translating Responses input into Chat payloads", async () => {
  setPayloadRulesConfig({
    default: [
      {
        models: [{ name: "gpt-*", protocol: "openai" }],
        params: {
          "messages.0.metadata.routeTag": "feature-110",
        },
      },
    ],
    override: [
      {
        models: [{ name: "gpt-*", protocol: "openai" }],
        params: {
          temperature: 0.25,
        },
      },
    ],
    filter: [],
    defaultRaw: [],
  });

  const { call, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "hello" }],
        },
      ],
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal(call.body.temperature, 0.25);
  assert.equal(call.body.messages[0].metadata.routeTag, "feature-110");
  assert.equal(call.body.messages[0].role, "user");
});

test("chatCore builds Claude Code-compatible upstream requests for CC providers", async () => {
  const { call, result } = await invokeChatCore({
    provider: "anthropic-compatible-cc-test",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/chat/completions",
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1/messages?beta=true",
        chatPath: "/v1/messages?beta=true",
      },
    },
    body: {
      model: "claude-sonnet-4-6",
      stream: false,
      messages: [{ role: "user", content: "Ping" }],
    },
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.equal(call.headers.Accept ?? call.headers.accept, "application/json");
  assert.equal(call.body.stream, true);
  assert.equal(call.body.context_management, undefined);
  assert.equal(call.body.system.length, 1);
  assert.match(call.body.system[0].text, /Claude Agent SDK/);
  assert.equal(typeof call.body.metadata.user_id, "string");
  assert.equal(call.body.messages[0].role, "user");
  assert.equal(call.body.messages[0].content[0].text, "Ping");
});

test("chatCore preserves cache_control automatically for Claude Code single-model requests", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "auto" });
  invalidateCacheControlSettingsCache();

  const claudeBody = {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
      },
      {
        role: "assistant",
        content: [{ type: "text", text: "a1", cache_control: { type: "ephemeral", ttl: "10m" } }],
      },
      { role: "user", content: [{ type: "text", text: "u2" }] },
    ],
    tools: [
      {
        name: "lookup_weather",
        description: "Fetch weather",
        input_schema: { type: "object" },
        cache_control: { type: "ephemeral", ttl: "30m" },
      },
    ],
  };

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: claudeBody,
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "claude",
  });

  assert.equal(hasCacheControl(call.body), true);
  assert.deepEqual(call.body.system[0].cache_control, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(call.body.messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(call.body.tools[0].cache_control, { type: "ephemeral", ttl: "30m" });
});

test("chatCore auto cache policy becomes false for nondeterministic combos", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "auto" });
  invalidateCacheControlSettingsCache();

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [{ role: "user", content: [{ type: "text", text: "u1" }] }],
    },
    userAgent: "Claude-Code/1.0.0",
    isCombo: true,
    comboStrategy: "latency-optimized",
    responseFormat: "claude",
  });

  assert.equal(
    call.body.system.some(
      (block: { type?: string; text?: string }) => block?.type === "text" && block.text === "system"
    ),
    true
  );
  // Cache markers are kept natively due to the latest Claude strict proxy passthrough implementation
  assert.equal(
    call.body.system.some((block) => !!block.cache_control),
    true
  );
});

test("chatCore always-preserve mode keeps cache_control even without Claude Code user-agent", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "always" });
  invalidateCacheControlSettingsCache();

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [{ role: "user", content: [{ type: "text", text: "u1" }] }],
    },
    responseFormat: "claude",
  });

  assert.equal(hasCacheControl(call.body), true);
  assert.deepEqual(call.body.system[0].cache_control, { type: "ephemeral", ttl: "5m" });
});

test("chatCore disables raw Claude passthrough when cache preservation is off and normalizes through OpenAI", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "never" });
  invalidateCacheControlSettingsCache();

  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
        },
      ],
    },
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "claude",
  });

  assert.equal(
    call.body.system.some(
      (block: { type?: string; text?: string }) => block?.type === "text" && block.text === "system"
    ),
    true
  );
  // Cache preservation is on for native Claude, so cache markers are intact
  assert.deepEqual(call.body.messages[0].content[0].cache_control, { type: "ephemeral" });
  // Tools disable flag is applied
  assert.equal("_disableToolPrefix" in call.body, false);
});

test("chatCore default translation converts Claude requests to OpenAI and strips cache markers for non-Claude providers", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/messages",
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "u1", cache_control: { type: "ephemeral" } }],
        },
      ],
    },
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "openai",
  });

  assert.equal(call.body.model, "gpt-4o-mini");
  assert.equal(Array.isArray(call.body.messages), true);
  assert.equal(call.body.messages[0].role, "system");
  assert.equal(JSON.stringify(call.body).includes("cache_control"), false);
});

test("chatCore sets Claude tool prefix disabling, strips empty Anthropic text blocks, and cleans helper flags", async () => {
  const { call } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/chat/completions",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "ignored-client-model",
      _toolNameMap: new Map([["proxy_Bash", "Bash"]]),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "" },
            { type: "text", text: "hello" },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "Bash",
            description: "Execute bash",
            parameters: { type: "object" },
          },
        },
      ],
    },
    responseFormat: "claude",
  });

  assert.equal(call.body.model, "claude-sonnet-4-6");
  assert.equal(call.body.tools[0].name, "Bash");
  assert.equal(call.body.tools[0].name.startsWith("proxy_"), false);
  assert.equal(call.body._toolNameMap, undefined);
  assert.equal(call.body._disableToolPrefix, undefined);
  assert.deepEqual(
    collectTextBlocks(call.body.messages).map((block) => block.text),
    ["hello"]
  );
});

test("chatCore restores prefixed Claude passthrough tool names in upstream responses", async () => {
  const { result } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      messages: [{ role: "user", content: [{ type: "text", text: "run bash" }] }],
      tools: [
        {
          name: "Bash",
          description: "Execute bash",
          input_schema: { type: "object" },
        },
      ],
    },
    responseFormat: "claude",
    responseFactory() {
      return new Response(
        JSON.stringify({
          id: "msg_tool_use",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-6",
          content: [
            {
              type: "tool_use",
              id: "toolu_1",
              name: "proxy_Bash",
              input: { command: "ls" },
            },
          ],
          stop_reason: "tool_use",
          usage: {
            input_tokens: 4,
            output_tokens: 2,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(payload.content[0].name, "Bash");
});

test("chatCore strips unsupported reasoning params and caps provider token fields", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "o3",
    endpoint: "/v1/chat/completions",
    body: {
      model: "o3",
      messages: [{ role: "user", content: "hello" }],
      temperature: 0.7,
      presence_penalty: 1,
      max_tokens: 99999,
      max_completion_tokens: 77777,
    },
    responseFormat: "openai",
  });

  assert.equal(call.body.temperature, undefined);
  assert.equal(call.body.presence_penalty, undefined);
  assert.equal(call.body.max_tokens, 16384);
  assert.equal(call.body.max_completion_tokens, 16384);
});

test("chatCore preserves reasoning_effort for assistant-prefill OpenAI-compatible requests", async () => {
  const { call, result } = await invokeChatCore({
    provider: "openai-compatible-aio",
    model: "glm-5.1",
    endpoint: "/v1/chat/completions",
    body: {
      model: "aio/glm-5.1",
      messages: [
        { role: "user", content: "draft the answer" },
        { role: "assistant", content: "<thinking>" },
      ],
      reasoning_effort: "xhigh",
      stream: true,
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal(call.body.model, "glm-5.1");
  assert.equal(call.body.reasoning_effort, "xhigh");
});

test("chatCore logs chat completions endpoint as OpenAI protocol", async () => {
  const { call, result } = await invokeChatCore({
    provider: "openrouter",
    model: "deepseek/deepseek-v4-pro",
    endpoint: "/v1/chat/completions",
    body: {
      model: "openrouter/deepseek/deepseek-v4-pro",
      messages: [{ role: "user", content: "Human: Hi" }],
      temperature: 1,
      max_tokens: 64000,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 0.9,
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal(call.body.model, "deepseek/deepseek-v4-pro");

  const logEntry = await waitFor(getLatestCallLog);
  assert.ok(logEntry, "expected call log to be persisted");
  assert.equal(logEntry.path, "/v1/chat/completions");
  assert.equal(logEntry.sourceFormat, FORMATS.OPENAI);
});

test("chatCore surfaces translation errors with explicit status codes", async () => {
  register(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    () => {
      const error = new Error("responses translator rejected the payload");
      error.statusCode = 409;
      throw error;
    },
    null
  );

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 409);
  assert.equal(result.error, "responses translator rejected the payload");
});

test("chatCore surfaces typed translation errors with the declared error type", async () => {
  register(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    () => {
      const error = new Error("typed translator failure");
      error.statusCode = 422;
      error.errorType = "unsupported_feature";
      throw error;
    },
    null
  );

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 422);

  const payload = (await result.response.json()) as any;
  assert.equal(payload.error.type, "unsupported_feature");
  assert.equal(payload.error.code, "unsupported_feature");
});

test("chatCore returns 500 when translation throws a generic error", async () => {
  register(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    () => {
      throw new Error("unexpected translator crash");
    },
    null
  );

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: "hello",
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 500);
  assert.equal(result.error, "unexpected translator crash");
});

test("chatCore refreshes GitHub credentials after 401 and retries with the refreshed Copilot token", async () => {
  let refreshedCredentials = null;
  const { calls, result } = await invokeChatCore({
    provider: "github",
    model: "gpt-4o-mini",
    credentials: {
      accessToken: "gh-access-token",
      refreshToken: "gh-refresh-token",
      providerSpecificData: {},
    },
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "retry after auth refresh" }],
    },
    onCredentialsRefreshed(updated) {
      refreshedCredentials = updated;
    },
    responseFactory(captured, seenCalls) {
      if (captured.url.startsWith("https://api.github.com/copilot_internal/v2/token")) {
        return new Response(
          JSON.stringify({
            token: "copilot-refreshed-token",
            expires_at: Math.floor(Date.now() / 1000) + 3600,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const providerCalls = seenCalls.filter((entry) =>
        entry.url.startsWith("https://api.githubcopilot.com/")
      );
      if (providerCalls.length === 1) {
        return new Response(
          JSON.stringify({
            error: { message: "token expired" },
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return buildOpenAIResponse(false, "retry succeeded after refresh");
    },
  });

  const payload = (await result.response.json()) as any;
  const providerCalls = calls.filter((entry) =>
    entry.url.startsWith("https://api.githubcopilot.com/")
  );

  assert.equal(result.success, true);
  assert.equal(providerCalls.length, 2);
  assert.equal(
    providerCalls[1].headers.authorization ?? providerCalls[1].headers.Authorization,
    "Bearer copilot-refreshed-token"
  );
  assert.equal(refreshedCredentials?.providerSpecificData?.copilotToken, "copilot-refreshed-token");
  assert.equal(payload.choices[0].message.content, "retry succeeded after refresh");
});

test("chatCore uses the native executor when no upstream proxy mode is enabled", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
  });

  assert.match(call.url, /^https:\/\/api\.openai\.com\/v1\/chat\/completions$/);
});

test("chatCore routes providers through CLIProxyAPI in passthrough mode", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "qoder",
    mode: "cliproxyapi",
    enabled: true,
  });

  const { call } = await invokeChatCore({
    provider: "qoder",
    model: "qoder-rome-30ba3b",
    credentials: { apiKey: "qoder-token", providerSpecificData: {} },
    body: {
      model: "qoder-rome-30ba3b",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
  });

  assert.match(call.url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
  assert.equal(call.headers.Authorization ?? call.headers.authorization, "Bearer qoder-token");
});

test("chatCore fallback proxy mode retries through CLIProxyAPI after retryable native failures", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "github",
    mode: "fallback",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("github");

  const { calls, result } = await invokeChatCore({
    provider: "github",
    model: "gpt-4o",
    credentials: {
      accessToken: "gh-token",
      providerSpecificData: {
        copilotToken: "mock-token",
        copilotTokenExpiresAt: Date.now() + 3600000,
      },
    },
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
    responseFactory(captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(JSON.stringify({ error: { message: "native failed" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      assert.match(captured.url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
      return buildOpenAIResponse(false, "retried");
    },
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /^https:\/\/api\.githubcopilot\.com\/chat\/completions$/);
  assert.match(calls[1].url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
});

test("chatCore fallback proxy mode surfaces CLIProxyAPI errors after a retryable native status", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "github",
    mode: "fallback",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("github");

  const { calls, result } = await invokeChatCore({
    provider: "github",
    model: "gpt-4o",
    credentials: {
      accessToken: "gh-token",
      providerSpecificData: {
        copilotToken: "mock-token",
        copilotTokenExpiresAt: Date.now() + 3600000,
      },
    },
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
    responseFactory(captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(JSON.stringify({ error: { message: "native failed" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      assert.match(captured.url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
      throw new Error("cliproxy retry failed");
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(result.error, "[502]: cliproxy retry failed");
});

test("chatCore fallback proxy mode surfaces CLIProxyAPI errors after native executor throws", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "github",
    mode: "fallback",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("github");

  const { calls, result } = await invokeChatCore({
    provider: "github",
    model: "gpt-4o",
    credentials: {
      accessToken: "gh-token",
      providerSpecificData: {
        copilotToken: "mock-token",
        copilotTokenExpiresAt: Date.now() + 3600000,
      },
    },
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hello" }],
    },
    responseFormat: "openai",
    responseFactory(captured, seenCalls) {
      if (seenCalls.length === 1) {
        throw new Error("native transport exploded");
      }
      assert.match(captured.url, /^http:\/\/127\.0\.0\.1:8317\/v1\/chat\/completions$/);
      throw new Error("cliproxy transport exploded");
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(result.error, "[502]: cliproxy transport exploded");
});

test("chatCore serves a cached idempotent response without hitting the provider twice", async () => {
  const sharedHeaders = { "idempotency-key": "unit-idempotent-key" };

  const first = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    requestHeaders: sharedHeaders,
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "repeat this safely" }],
    },
    responseFormat: "openai",
  });

  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    requestHeaders: sharedHeaders,
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "repeat this safely" }],
    },
    responseFormat: "openai",
  });

  assert.equal(first.calls.length, 1);
  assert.equal(second.calls.length, 0);
  assert.equal(second.result.success, true);
  assert.equal(second.result.response.headers.get("X-OmniRoute-Idempotent"), "true");

  const payload = (await second.result.response.json()) as any;
  assert.equal(payload.choices[0].message.content, "ok");
});

test("chatCore returns a semantic cache HIT for repeated deterministic requests", async () => {
  let upstreamHits = 0;
  const sharedBody = {
    model: "gpt-4o-mini",
    stream: false,
    temperature: 0,
    messages: [{ role: "user", content: "cache this exact answer" }],
  };

  const first = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(false, "cached-once");
    },
  });

  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(false, "should-not-run");
    },
  });

  assert.equal(first.calls.length, 1);
  assert.equal(first.result.response.headers.get("X-OmniRoute-Cache"), "MISS");
  assert.equal(second.calls.length, 0);
  assert.equal(second.result.response.headers.get("X-OmniRoute-Cache"), "HIT");
  assert.equal(upstreamHits, 1);

  const payload = (await second.result.response.json()) as any;
  assert.equal(payload.choices[0].message.content, "cached-once");

  await waitForAsyncSideEffects();
  const semanticLog = await waitFor(async () => {
    const rows = await getCallLogs({ limit: 10 });
    const hit = rows.find((row) => row.cacheSource === "semantic");
    if (!hit) return null;
    return await getCallLogById(hit.id);
  });
  assert.ok(semanticLog, "expected semantic cache HIT to be persisted in call logs");
  assert.equal(semanticLog.cacheSource, "semantic");
  assert.equal(semanticLog.path, "/v1/chat/completions");
  assert.equal(semanticLog.status, 200);
});

test("chatCore skips semantic cache when disabled in settings", async () => {
  await settingsDb.updateSettings({ semanticCacheEnabled: false });

  let upstreamHits = 0;
  const sharedBody = {
    model: "gpt-4o-mini",
    stream: false,
    temperature: 0,
    messages: [{ role: "user", content: "do not reuse this response locally" }],
  };

  const first = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(false, `fresh-${upstreamHits}`);
    },
  });

  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(false, `fresh-${upstreamHits}`);
    },
  });

  assert.equal(first.calls.length, 1);
  assert.equal(second.calls.length, 1);
  assert.equal(upstreamHits, 2);
  assert.equal(first.result.response.headers.get("X-OmniRoute-Cache"), "MISS");
  assert.equal(second.result.response.headers.get("X-OmniRoute-Cache"), "MISS");

  const payload = (await second.result.response.json()) as any;
  assert.equal(payload.choices[0].message.content, "fresh-2");
});

test("chatCore attaches OmniRoute response metadata headers to non-stream responses", async () => {
  const { result } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    body: {
      model: "claude-sonnet-4-6",
      stream: false,
      messages: [{ role: "user", content: "header metadata" }],
    },
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("X-OmniRoute-Provider"), "cc");
  assert.equal(result.response.headers.get("X-OmniRoute-Model"), "claude-sonnet-4-6");
  assert.equal(result.response.headers.get("X-OmniRoute-Cache-Hit"), "false");
  assert.equal(result.response.headers.get("X-OmniRoute-Tokens-In"), "12");
  assert.equal(result.response.headers.get("X-OmniRoute-Tokens-Out"), "3");
  assert.ok(Number(result.response.headers.get("X-OmniRoute-Latency-Ms")) >= 0);
  assert.match(String(result.response.headers.get("X-OmniRoute-Response-Cost")), /^\d+\.\d{10}$/);
});

test("chatCore normalizes tool finish reasons and estimates usage when upstream omits it", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "call the tool" }],
    },
    responseFormat: "openai",
    responseFactory() {
      return new Response(
        JSON.stringify({
          id: "chatcmpl_tool_no_usage",
          object: "chat.completion",
          model: "gpt-4o-mini",
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: "",
                tool_calls: [
                  {
                    id: "call_1",
                    type: "function",
                    function: {
                      name: "lookup_weather",
                      arguments: '{"city":"Sao Paulo"}',
                    },
                  },
                ],
              },
              finish_reason: "stop",
            },
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(payload.choices[0].finish_reason, "tool_calls");
  assert.ok(payload.usage.total_tokens > 0);
  assert.ok(payload.usage.prompt_tokens > 0);
});

test("chatCore bypasses Claude CLI warmup probes before touching the provider", async () => {
  const { calls, result } = await invokeChatCore({
    model: "gpt-5",
    userAgent: "claude-cli/2.1.89",
    body: {
      model: "gpt-5",
      stream: false,
      messages: [{ role: "user", content: [{ type: "text", text: "Warmup" }] }],
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(calls.length, 0);
  assert.match(payload.choices[0].message.content, /CLI Command Execution/);
});

test("chatCore redirects background utility tasks to a cheaper mapped model", async () => {
  setBackgroundDegradationConfig({
    enabled: true,
    degradationMap: {
      ...originalBackgroundConfig.degradationMap,
      "gpt-5": "gpt-5-mini",
    },
    detectionPatterns: ["generate a title"],
  });

  const { call, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-5",
    body: {
      model: "gpt-5",
      max_tokens: 16,
      messages: [
        { role: "system", content: "Generate a title for the conversation." },
        { role: "user", content: "Discuss release notes" },
      ],
    },
  });

  assert.equal(result.success, true);
  assert.equal(call.body.model, "gpt-5-mini");
});

test("chatCore retries Qwen quota 429 responses before succeeding", async () => {
  const originalSetTimeout = globalThis.setTimeout;
  try {
    (globalThis as any).setTimeout = (callback: any, ms: any, ...args: any[]) => {
      // Only make Qwen retry delays (≤5s) synchronous; let longer timeouts (e.g. body read) use real setTimeout
      if (typeof ms === "number" && ms > 5000) {
        return originalSetTimeout(callback, ms, ...args);
      }
      callback(...args);
      return 0 as any;
    };

    const { calls, result } = await invokeChatCore({
      provider: "qwen",
      model: "qwen3-coder",
      body: {
        model: "qwen3-coder",
        stream: false,
        messages: [{ role: "user", content: "retry the quota hit" }],
      },
      responseFactory(_captured, seenCalls) {
        if (seenCalls.length === 1) {
          return new Response(
            JSON.stringify({ error: { message: "You exceeded your current quota for Qwen." } }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        return buildOpenAIResponse(false, "qwen recovered");
      },
    });

    const payload = (await result.response.json()) as any;
    assert.equal(result.success, true);
    assert.equal(calls.length, 2);
    assert.equal(payload.choices[0].message.content, "qwen recovered");
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("chatCore injects fallback user for Qwen OAuth requests without user", async () => {
  const { call, result } = await invokeChatCore({
    provider: "qwen",
    model: "qwen3-coder",
    credentials: {
      accessToken: "qwen-oauth-token",
      providerSpecificData: { resourceUrl: "portal.qwen.ai" },
    },
    body: {
      model: "qwen3-coder",
      stream: false,
      messages: [{ role: "user", content: "check qwen user fallback" }],
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal(call.body.user, "omniroute-qwen-oauth");
});

test("chatCore keeps explicit user for Qwen OAuth requests", async () => {
  const { call, result } = await invokeChatCore({
    provider: "qwen",
    model: "qwen3-coder",
    credentials: {
      accessToken: "qwen-oauth-token",
      providerSpecificData: { resourceUrl: "portal.qwen.ai" },
    },
    body: {
      model: "qwen3-coder",
      stream: false,
      user: "explicit-user",
      messages: [{ role: "user", content: "keep my user" }],
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal(call.body.user, "explicit-user");
});

test("chatCore does not inject fallback user for Qwen API key requests", async () => {
  const { call, result } = await invokeChatCore({
    provider: "qwen",
    model: "qwen3-coder",
    credentials: {
      apiKey: "qwen-api-key",
      providerSpecificData: { resourceUrl: "dashscope.aliyuncs.com/compatible-mode/v1" },
    },
    body: {
      model: "qwen3-coder",
      stream: false,
      messages: [{ role: "user", content: "api key mode should stay untouched" }],
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal("user" in call.body, false);
});

test("chatCore preserves Codex dual-window scope cooldowns on 429 responses", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex@example.com",
    accessToken: "codex-token",
    isActive: true,
    providerSpecificData: {},
  });

  const resetAt5h = new Date(Date.now() + 60_000).toISOString();
  const resetAt7d = new Date(Date.now() + 3_600_000).toISOString();
  const { result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.1-codex",
    endpoint: "/v1/responses",
    connectionId: connection.id,
    credentials: {
      accessToken: "codex-token",
      providerSpecificData: {},
    },
    body: {
      model: "gpt-5.1-codex",
      input: "persist quota",
      stream: false,
    },
    responseFactory() {
      return new Response(JSON.stringify({ error: { message: "Codex quota exceeded" } }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "x-codex-5h-usage": "95",
          "x-codex-5h-limit": "100",
          "x-codex-5h-reset-at": resetAt5h,
          "x-codex-7d-usage": "100",
          "x-codex-7d-limit": "1000",
          "x-codex-7d-reset-at": resetAt7d,
        },
      });
    },
  });

  const updated = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal((updated as any).providerSpecificData.codexQuotaState.limit5h, 100);
  assert.equal((updated as any).providerSpecificData.codexQuotaState.scope, "codex");
  assert.equal(
    typeof (updated as any).providerSpecificData.codexScopeRateLimitedUntil.codex,
    "string"
  );
  assert.equal((updated as any).providerSpecificData.codexExhaustedWindow, "5h");
});

test("chatCore 429 lets account fallback apply the configured resilience cooldown", async () => {
  await settingsDb.updateSettings({
    resilienceSettings: {
      connectionCooldown: {
        apikey: {
          baseCooldownMs: 1000,
          useUpstreamRetryHints: false,
          maxBackoffSteps: 3,
        },
      },
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "resilience-429",
    apiKey: "sk-resilience-429",
    isActive: true,
    providerSpecificData: {},
  });

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId: connection.id,
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "rate limit me" }],
    },
    responseFactory() {
      return new Response(JSON.stringify({ error: { message: "too many requests" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  const afterCore = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal((afterCore as any).rateLimitedUntil, undefined);

  const fallback = await auth.markAccountUnavailable(
    (connection as any).id,
    result.status,
    result.error,
    "openai",
    "gpt-4o-mini"
  );
  const afterFallback = await providersDb.getProviderConnectionById((connection as any).id);
  const cooldownRemaining =
    new Date((afterFallback as any).rateLimitedUntil).getTime() - Date.now();

  assert.equal(fallback.shouldFallback, true);
  assert.equal(fallback.cooldownMs, 1000);
  assert.equal((afterFallback as any).testStatus, "unavailable");
  assert.ok(cooldownRemaining > 0 && cooldownRemaining <= 2_000);
});

test("chatCore falls back to the next family model when the requested model is unavailable", async () => {
  const { calls, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-5.1",
    body: {
      model: "gpt-5.1",
      stream: false,
      messages: [{ role: "user", content: "fallback on model unavailable" }],
    },
    responseFactory(_captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(JSON.stringify({ error: { message: "model not found" } }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return buildOpenAIResponse(false, "family fallback ok");
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.model, "gpt-5.1-mini");
  assert.equal(payload.choices[0].message.content, "family fallback ok");
});

test("chatCore falls back to a larger-context sibling when the request overflows context", async () => {
  saveModelsDevCapabilities({
    unknown: {
      "gpt-5": capabilityEntry(128_000),
      "gpt-5-mini": capabilityEntry(64_000),
      "gpt-4o": capabilityEntry(256_000),
    },
  });

  const { calls, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-5",
    body: {
      model: "gpt-5",
      stream: false,
      messages: [{ role: "user", content: "recover from context overflow" }],
    },
    responseFactory(_captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(JSON.stringify({ error: { message: "maximum context exceeded" } }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      return buildOpenAIResponse(false, "larger context fallback");
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.model, "gpt-4o");
  assert.equal(payload.choices[0].message.content, "larger context fallback");
});

test("chatCore parses upstream SSE payloads for non-streaming requests", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "parse sse" }],
    },
    responseFactory() {
      return buildOpenAIResponse(true, "sse json");
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(payload.choices[0].message.content, "sse json");
});

test("chatCore rejects malformed non-streaming SSE payloads", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "bad sse" }],
    },
    responseFactory() {
      return new Response("data: not-json\n\ndata: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(result.error, /Invalid SSE response/);
});

test("chatCore rejects malformed non-streaming JSON payloads", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "return valid json" }],
    },
    responseFactory() {
      return new Response("{oops", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(result.error, "Invalid JSON response from provider");
});

test("chatCore falls back after an empty-content success response", async () => {
  const { calls, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-5.1",
    body: {
      model: "gpt-5.1",
      stream: false,
      messages: [{ role: "user", content: "recover from empty content" }],
    },
    responseFactory(_captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(
          JSON.stringify({
            id: "chatcmpl-empty",
            object: "chat.completion",
            model: "gpt-5.1",
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: "" },
                finish_reason: "stop",
              },
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      return buildOpenAIResponse(false, "empty-content fallback ok");
    },
  });

  const payload = (await result.response.json()) as any;
  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.model, "gpt-5.1-mini");
  assert.equal(payload.choices[0].message.content, "empty-content fallback ok");
});

test("chatCore returns a gateway error when the empty-content fallback responds with invalid JSON", async () => {
  const { result, calls } = await invokeChatCore({
    provider: "openai",
    model: "gpt-5.1",
    body: {
      model: "gpt-5.1",
      stream: false,
      messages: [{ role: "user", content: "recover from empty content" }],
    },
    responseFactory(_captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(
          JSON.stringify({
            id: "chatcmpl-empty",
            object: "chat.completion",
            model: "gpt-5.1",
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: "" },
                finish_reason: "stop",
              },
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response("{invalid-json", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(result.error, "Provider returned empty content");
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.model, "gpt-5.1-mini");
});

test("chatCore records Claude prompt cache and cache usage metadata in call logs", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "always" });
  invalidateCacheControlSettingsCache();

  const { result } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    requestHeaders: { "anthropic-beta": "prompt-caching-2024-07-31" },
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "claude",
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "system", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "question", cache_control: { type: "ephemeral" } }],
        },
        {
          role: "assistant",
          content: [
            { type: "text", text: "answer", cache_control: { type: "ephemeral", ttl: "10m" } },
          ],
        },
      ],
      tools: [
        {
          name: "lookup_weather",
          description: "Fetch weather",
          input_schema: { type: "object" },
          cache_control: { type: "ephemeral", ttl: "30m" },
        },
      ],
    },
    responseFactory() {
      return new Response(
        JSON.stringify({
          id: "msg_json",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-6",
          content: [{ type: "text", text: "cached answer" }],
          stop_reason: "end_turn",
          usage: {
            input_tokens: 12,
            output_tokens: 3,
            cache_read_input_tokens: 4,
            cache_creation_input_tokens: 2,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
  });

  const detail = await waitFor(() => getLatestCallLog());

  assert.equal(result.success, true);
  assert.ok(detail);
  assert.equal(detail.requestBody._omniroute.claudePromptCache.applied, true);
  assert.equal(detail.requestBody._omniroute.claudePromptCache.totalBreakpoints, 4);
  assert.equal(detail.responseBody._omniroute.claudePromptCache.applied, true);
  assert.equal(detail.responseBody._omniroute.claudePromptCache.totalBreakpoints, 4);
  assert.equal(typeof detail.responseBody._omniroute.claudePromptCache.anthropicBeta, "string");
  assert.match(detail.responseBody._omniroute.claudePromptCache.anthropicBeta, /prompt-caching/i);
  assert.deepEqual(detail.responseBody._omniroute.claudePromptCacheUsage, {
    cacheReadTokens: 4,
    cacheCreationTokens: 2,
  });
});

test("chatCore serves emergency fallback responses for budget errors on non-streaming requests", async () => {
  const { calls, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      max_tokens: 9000,
      messages: [{ role: "user", content: "keep the request alive after budget exhaustion" }],
    },
    responseFactory(_captured, seenCalls) {
      if (seenCalls.length === 1) {
        return new Response(
          JSON.stringify({
            error: { message: "insufficient funds on this account" },
          }),
          {
            status: 402,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return buildOpenAIResponse(false, "served by emergency fallback");
    },
  });

  const payload = (await result.response.json()) as any;

  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].body.model, "openai/gpt-oss-120b");
  assert.equal(calls[1].body.max_tokens, 4096);
  assert.equal(payload.choices[0].message.content, "served by emergency fallback");
});

test("chatCore injects progress events into streaming responses when requested", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    requestHeaders: { "x-omniroute-progress": "true" },
    body: {
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: "stream with progress" }],
    },
    responseFactory() {
      return buildOpenAIResponse(true, "streamed");
    },
  });

  const streamText = await result.response.text();
  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("X-OmniRoute-Progress"), "enabled");
  assert.match(streamText, /event: progress/);
});

test("chatCore emits final SSE metadata comments before [DONE] on streaming responses", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: {
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: "stream metadata" }],
    },
    responseFactory() {
      return buildOpenAIResponse(true, "streamed");
    },
  });

  const streamText = await result.response.text();

  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("X-OmniRoute-Provider"), "openai");
  assert.equal(result.response.headers.get("X-OmniRoute-Model"), "gpt-4o-mini");
  assert.match(streamText, /: x-omniroute-response-cost=\d+\.\d{10}/);
  assert.match(streamText, /: x-omniroute-tokens-in=\d+/);
  assert.match(streamText, /: x-omniroute-tokens-out=\d+/);
  assert.ok(
    streamText.indexOf(": x-omniroute-response-cost=") < streamText.indexOf("data: [DONE]")
  );
});

test("chatCore maps upstream aborts to request-aborted errors", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "abort me" }],
    },
    responseFactory() {
      const error = new Error("request aborted by client");
      error.name = "AbortError";
      throw error;
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 499);
  assert.equal(result.error, "Request aborted");
});

test("chatCore returns streaming responses without waiting for upstream completion", async () => {
  const encoder = new TextEncoder();
  let closeUpstream: (() => void) | null = null;

  const invocation = invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: {
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: "do not buffer streaming" }],
    },
    responseFactory() {
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  id: "chatcmpl-stream",
                  object: "chat.completion.chunk",
                  choices: [
                    {
                      index: 0,
                      delta: { role: "assistant", content: "streamed-without-buffering" },
                    },
                  ],
                })}\n\n`
              )
            );
            closeUpstream = () => {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
            };
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        }
      );
    },
  });

  const raceResult = await Promise.race([
    invocation.then(() => "returned"),
    new Promise((resolve) => setTimeout(() => resolve("blocked"), 1000)),
  ]);

  if (raceResult !== "returned") {
    closeUpstream?.();
  }
  const { result } = await invocation;

  assert.equal(raceResult, "returned");
  closeUpstream?.();

  const streamText = await result.response.text();
  assert.equal(result.success, true);
  assert.match(streamText, /streamed-without-buffering/);
});

test("chatCore releases account semaphore slots when upstream execution throws", async () => {
  const connectionId = "sem-exception";
  const semaphoreKey = buildAccountSemaphoreKey({
    provider: "openai",
    accountKey: connectionId,
  });

  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId,
    credentials: {
      apiKey: "sk-test",
      maxConcurrent: 1,
      providerSpecificData: {},
    },
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "executor throws" }],
    },
    responseFactory() {
      throw new Error("simulated upstream network failure");
    },
  });

  await waitForAsyncSideEffects();

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(getAccountSemaphoreStats()[semaphoreKey], undefined);
});

test("chatCore locks per-model quota failures without dropping quota helper references", async () => {
  const model = "gemini-1.5-pro";
  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "gemini-quota-lock",
    apiKey: "gemini-key",
    isActive: true,
    providerSpecificData: {},
  });

  try {
    const { result } = await invokeChatCore({
      provider: "gemini",
      model,
      connectionId: connection.id,
      credentials: {
        apiKey: "gemini-key",
        providerSpecificData: {},
      },
      body: {
        model,
        stream: false,
        messages: [{ role: "user", content: "quota lock" }],
      },
      responseFactory() {
        return new Response(
          JSON.stringify({ error: { message: "insufficient_quota: quota exhausted" } }),
          {
            status: 402,
            headers: { "Content-Type": "application/json" },
          }
        );
      },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 402);
    assert.equal(isModelLocked("gemini", connection.id, model), true);
  } finally {
    clearModelLock("gemini", connection.id, model);
  }
});

// ── Streaming semantic cache tests ──────────────────────────────────────────

test("chatCore caches streaming response and serves cache HIT on repeat", async () => {
  let upstreamHits = 0;
  const sharedBody = {
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0,
    messages: [{ role: "user", content: "stream-cache-test" }],
  };

  const first = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(true, "streamed-once");
    },
  });

  assert.equal(first.result.success, true);
  // Consume the stream to trigger onStreamComplete and cache write
  await first.result.response.text();
  await waitForAsyncSideEffects();

  // Second request with same body should get cache HIT (JSON, not SSE)
  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(true, "should-not-stream");
    },
  });

  assert.equal(upstreamHits, 1, "upstream should be called only once");
  assert.equal(second.calls.length, 0, "second request should not reach upstream");
  assert.equal(second.result.response.headers.get("X-OmniRoute-Cache"), "HIT");

  const payload = (await second.result.response.json()) as any;
  assert.ok(payload.choices, "cached response should have choices");
  assert.equal(payload.choices[0].message.content, "streamed-once");
});

test("chatCore does not cache streaming response when temperature > 0", async () => {
  let upstreamHits = 0;
  const sharedBody = {
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.7,
    messages: [{ role: "user", content: "non-deterministic-stream" }],
  };

  const first = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(true, `hot-${upstreamHits}`);
    },
  });

  await first.result.response.text();
  await waitForAsyncSideEffects();

  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(true, `hot-${upstreamHits}`);
    },
  });

  await second.result.response.text();
  assert.equal(upstreamHits, 2, "both requests should hit upstream");
  assert.equal(second.calls.length, 1, "second request should reach upstream");
});

test("chatCore skips streaming cache when X-OmniRoute-No-Cache header is set", async () => {
  let upstreamHits = 0;
  const sharedBody = {
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0,
    messages: [{ role: "user", content: "no-cache-stream" }],
  };

  const first = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    requestHeaders: { "x-omniroute-no-cache": "true" },
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(true, "bypass-cache");
    },
  });

  await first.result.response.text();
  await waitForAsyncSideEffects();

  // Verify nothing was cached
  const sig = generateSignature("gpt-4o-mini", sharedBody.messages, 0, 1);
  const cached = getCachedResponse(sig);
  assert.equal(cached, null, "response should not be cached when no-cache header is set");

  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    requestHeaders: { "x-omniroute-no-cache": "true" },
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      upstreamHits += 1;
      return buildOpenAIResponse(true, "bypass-again");
    },
  });

  await second.result.response.text();
  assert.equal(upstreamHits, 2, "both requests should hit upstream with no-cache");
});

test("chatCore returns cache HIT as JSON even when client requests SSE", async () => {
  const sharedBody = {
    model: "gpt-4o-mini",
    stream: false,
    temperature: 0,
    messages: [{ role: "user", content: "json-then-sse-cache" }],
  };

  // First: non-streaming request populates cache
  await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: sharedBody,
    responseFormat: "openai",
    responseFactory() {
      return buildOpenAIResponse(false, "cached-json");
    },
  });

  // Second: streaming request should still get cache HIT as JSON
  const second = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: { ...sharedBody, stream: true },
    responseFormat: "openai",
    responseFactory() {
      return buildOpenAIResponse(true, "should-not-stream");
    },
  });

  assert.equal(second.calls.length, 0, "cached response should prevent upstream call");
  assert.equal(second.result.response.headers.get("X-OmniRoute-Cache"), "HIT");
  assert.equal(
    second.result.response.headers.get("Content-Type"),
    "application/json",
    "cache HIT should return JSON regardless of stream flag"
  );

  const payload = (await second.result.response.json()) as any;
  assert.equal(payload.choices[0].message.content, "cached-json");
});
