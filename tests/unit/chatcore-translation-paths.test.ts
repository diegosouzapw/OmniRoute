// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-translation-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;
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
const { getPendingRequests, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const {
  buildAccountSemaphoreKey,
  getStats: getAccountSemaphoreStats,
  resetAll: resetAccountSemaphores,
} = await import("../../open-sse/services/accountSemaphore.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { clearModelLock, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
// Dynamic import is required after TEST_DATA_DIR is initialized above.
const { clearReasoningCacheAll } = await import("../../open-sse/services/reasoningCache.ts");
const {
  getBackgroundDegradationConfig,
  setBackgroundDegradationConfig,
  resetStats: resetBackgroundStats,
} = await import("../../open-sse/services/backgroundTaskDetector.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const {
  handleChatCore,
  shouldUseNativeCodexPassthrough,
  isClaudeCodeSemanticPassthroughRequest,
  isTokenExpiringSoon,
  clearUpstreamProxyConfigCache,
  buildStreamingResponseHeaders,
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

function buildDeepSeekResponsesToolResponse({
  stream,
  callId,
  reasoning,
}: {
  stream: boolean;
  callId: string;
  reasoning: string;
}) {
  const reasoningItem = {
    id: "rs_deepseek_tool",
    type: "reasoning",
    status: "completed",
    summary: [],
    content: [{ type: "reasoning_text", text: reasoning }],
  };
  const functionCall = {
    id: "fc_deepseek_tool",
    type: "function_call",
    status: "completed",
    call_id: callId,
    name: "inspect",
    arguments: "{}",
  };
  const response = {
    id: "resp_deepseek_tool",
    object: "response",
    status: "completed",
    model: "deepseek-v4-flash",
    output: [reasoningItem, functionCall],
    usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
  };

  if (!stream) {
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const events = [
    {
      type: "response.created",
      response: { id: response.id, model: response.model, status: "in_progress" },
    },
    { type: "response.output_item.done", output_index: 0, item: reasoningItem },
    { type: "response.output_item.done", output_index: 1, item: functionCall },
    { type: "response.completed", response },
  ];
  return new Response(
    `${events.map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}`).join("\n\n")}\n\ndata: [DONE]\n\n`,
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
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
  clearReasoningCacheAll();
  setBackgroundDegradationConfig(originalBackgroundConfig);
  resetBackgroundStats();
  globalThis.setTimeout = originalSetTimeout;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// 30s ceiling: c8 instrumentation plus --test-concurrency=8 can stall CI workers
// well past the upstream timeout budget. Green runs return as soon as the condition
// holds, so the ceiling only bounds the failure case.
async function waitFor(fn, timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await fn();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function flushAsyncSideEffects() {
  // setImmediate rounds drain the event loop more reliably than setTimeout under CI load.
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

async function getLatestCallLog() {
  await waitForCallLogSaves(5000);
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
  sessionAffinityKey = null,
  reasoningTransportFallback = "drop",
  managedLease = null,
  cachedSettings = null,
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
      sessionAffinityKey,
      isCombo,
      comboStrategy,
      reasoningTransportFallback,
      managedLease,
      cachedSettings,
      onCredentialsRefreshed,
      onRequestSuccess,
    } as any);
    await flushAsyncSideEffects();

    return { result, calls, call: calls.at(-1) };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  restorePipelineCaptureEnv();
  clearPendingRequests();
  resetAccountSemaphores();
  await flushAsyncSideEffects();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  restorePipelineCaptureEnv();
  clearPendingRequests();
  resetAccountSemaphores();
  await flushAsyncSideEffects();
  await resetStorage();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
test("chatCore times out upstream execution before provider response headers", async () => {
  // This test asserts pendingDetail.providerRequest — only attached when the
  // call-log pipeline capture is enabled. Declare the dependency explicitly
  // (fresh-DB default leaves it off → the waitFor below would never resolve;
  // failed deterministically on CI and on an isolated run, incl. at v3.8.18).
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  const executor = await getExecutor("openai");
  const originalGetTimeoutMs = executor.getTimeoutMs?.bind(executor);
  executor.getTimeoutMs = () => 200;

  const connectionId = "upstream-start-timeout";
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "never returns" }],
  };
  const fetchSignals: AbortSignal[] = [];
  const upstreamBodies: any[] = [];
  globalThis.fetch = async (_url, init = {}) => {
    if (init.signal instanceof AbortSignal) fetchSignals.push(init.signal);
    if (init.body) upstreamBodies.push(JSON.parse(String(init.body)));
    return new Promise(() => {});
  };

  try {
    const invocation = handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: {
        apiKey: "sk-test",
        providerSpecificData: {},
      },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId,
      userAgent: "unit-test",
    } as any);

    const pendingDetail = (await waitFor(() =>
      // details[connectionId] is Record<modelKey, PendingRequestDetail[]> —
      // the original predicate tested each ARRAY's .providerRequest (always
      // undefined), so the waitFor could never resolve. Flatten to the details.
      Object.values(getPendingRequests().details[connectionId] || {})
        .flat()
        .find((detail: any) => detail?.providerRequest?.model === "gpt-4o-mini")
    )) as any;
    assert.equal(pendingDetail?.providerRequest?.model, "gpt-4o-mini");
    assert.deepEqual(pendingDetail?.providerRequest?.messages, body.messages);
    const result = await invocation;
    await flushAsyncSideEffects();

    assert.equal(upstreamBodies[0]?.model, "gpt-4o-mini");
    assert.deepEqual(upstreamBodies[0]?.messages, body.messages);
    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.equal(fetchSignals[0]?.aborted, true);
    assert.equal(getPendingRequests().details[connectionId], undefined);
  } finally {
    if (originalGetTimeoutMs) executor.getTimeoutMs = originalGetTimeoutMs;
    globalThis.fetch = originalFetch;
  }
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
  await flushAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected call log detail to be persisted");
  assert.ok(detail.pipelinePayloads, "expected pipeline payloads when capture is enabled");
  assert.equal((detail.pipelinePayloads as any).streamChunks, undefined);
});
test("chatCore keeps Responses-native Codex payloads in native passthrough mode", async () => {
  const { call, result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.6-sol",
    endpoint: "/v1/responses",
    credentials: { accessToken: "codex-token", providerSpecificData: {} },
    body: {
      model: "gpt-5.6-sol",
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
  assert.deepEqual(call.body.input, [
    { type: "message", role: "user", content: [{ type: "input_text", text: "ship it" }] },
  ]);
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
test("chatCore translates a streaming Responses upstream for a Chat client", async () => {
  const { call, result } = await invokeChatCore({
    provider: "openai-compatible-sp-openai",
    model: "gpt-5.4",
    endpoint: "/v1/chat/completions",
    accept: "text/event-stream",
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
      stream: true,
      messages: [{ role: "user", content: "Reply with OK only." }],
    },
    responseFactory: () =>
      new Response(
        [
          'data: {"type":"response.output_text.delta","delta":"ok"}',
          "",
          'data: {"type":"response.completed","response":{"id":"resp_stream","status":"completed","output":[],"usage":{"input_tokens":1,"output_tokens":1,"total_tokens":2}}}',
          "",
        ].join("\n"),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      ),
  });

  assert.equal(result.success, true);
  assert.match(call.url, /\/responses$/);
  const streamed = await result.response.text();
  assert.match(streamed, /"content":"ok"/);
  assert.match(streamed, /data: \[DONE\]/);
});
test("chatCore drops opaque reasoning for plaintext Responses targets by default (#10959)", async () => {
  const reasoningItems = [
    { id: "rs_valid", type: "reasoning", encrypted_content: "encrypted-blob" },
    { type: "reasoning", encrypted_content: "" },
    { type: "reasoning", summary: [{ text: "not self-contained" }] },
    { type: "item_reference", id: "rs_reference" },
    { id: "fc_call", type: "function_call", call_id: "call_1", name: "search", arguments: "{}" },
  ];

  const dropped = await invokeChatCore({
    provider: "openai-compatible-sp-openai",
    model: "gpt-5.4",
    endpoint: "/v1/responses",
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        apiType: "responses",
        baseUrl: "https://proxy.example.com/v1",
        prefix: "sp-openai",
      },
    },
    body: { model: "gpt-5.4", stream: false, input: reasoningItems },
    responseFormat: "openai-responses",
  });

  assert.equal(dropped.result.success, true);
  assert.equal(dropped.calls.length, 1);
  assert.deepEqual(
    dropped.call.body.input.filter((item) => item.type === "reasoning"),
    [{ type: "reasoning", summary: [{ text: "not self-contained" }] }]
  );

  const enabled = await invokeChatCore({
    provider: "openai-compatible-sp-openai",
    model: "gpt-5.4",
    endpoint: "/v1/responses",
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        apiType: "responses",
        baseUrl: "https://proxy.example.com/v1",
        prefix: "sp-openai",
        preserveEncryptedReasoning: true,
      },
    },
    body: { model: "gpt-5.4", stream: false, input: reasoningItems },
    responseFormat: "openai-responses",
  });

  assert.equal(enabled.result.success, true);
  const input = enabled.call.body.input as Array<Record<string, unknown>>;
  assert.deepEqual(
    input.filter((item) => item.type === "reasoning"),
    [
      { id: "rs_valid", type: "reasoning", encrypted_content: "encrypted-blob", summary: [] }, // summary defaulted by #11110
      { type: "reasoning", summary: [{ text: "not self-contained" }] },
    ]
  );
  assert.equal(
    input.some((item) => item.type === "item_reference"),
    false
  );
  assert.equal(input.find((item) => item.type === "function_call")?.id, undefined);
});

test("chatCore drops incompatible Chat reasoning before stream mode diverges (#10959)", async () => {
  for (const stream of [false, true]) {
    const dropped = await invokeChatCore({
      provider: "openai-compatible-sp-openai",
      model: "gpt-5.4",
      endpoint: "/v1/chat/completions",
      credentials: {
        apiKey: "sk-test",
        providerSpecificData: {
          apiType: "openai",
          baseUrl: "https://proxy.example.com/v1",
          prefix: "sp-openai",
        },
      },
      body: {
        model: "gpt-5.4",
        stream,
        messages: [
          {
            role: "assistant",
            content: null,
            reasoning_details: [{ type: "reasoning.encrypted", data: "provider-state" }],
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "search", arguments: "{}" },
              },
            ],
          },
          { role: "tool", tool_call_id: "call_1", content: "result" },
        ],
      },
    });

    assert.equal(dropped.result.success, true, `stream=${stream}`);
    assert.equal(dropped.calls.length, 1, `stream=${stream}`);
    assert.equal(dropped.call.body.messages[0].reasoning_details, undefined, `stream=${stream}`);
  }
});

test("chatCore preserves Combo skip behavior for incompatible reasoning", async () => {
  const skipped = await invokeChatCore({
    provider: "openai-compatible-sp-openai",
    model: "gpt-5.4",
    endpoint: "/v1/responses",
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
      input: [
        { id: "rs_valid", type: "reasoning", encrypted_content: "encrypted-blob" },
        { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
      ],
    },
    responseFormat: "openai-responses",
    isCombo: true,
    reasoningTransportFallback: "skip",
  });

  assert.equal(skipped.result.success, false);
  assert.equal(skipped.result.status, 400);
  assert.equal(skipped.calls.length, 0);
});

test("chatCore carries Chat reasoning_content into official DeepSeek Responses input", async () => {
  const { call, result } = await invokeChatCore({
    provider: "deepseek",
    model: "deepseek-v4-pro",
    endpoint: "/v1/chat/completions",
    body: {
      model: "deepseek-v4-pro",
      stream: false,
      messages: [
        {
          role: "assistant",
          content: null,
          reasoning_content: "Inspect before calling the tool",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "search", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "found" },
      ],
    },
    responseFormat: "openai-responses",
  });

  assert.equal(result.success, true);
  assert.match(call.url, /\/responses$/);
  assert.deepEqual(call.body.input.slice(0, 3), [
    {
      type: "reasoning",
      summary: [], // defaulted on freshly-built reasoning items (#11129)
      content: [{ type: "reasoning_text", text: "Inspect before calling the tool" }],
    },
    {
      type: "function_call",
      call_id: "call_1",
      name: "search",
      arguments: "{}",
      status: "completed",
    },
    { type: "function_call_output", call_id: "call_1", output: "found", status: "completed" },
  ]);
});

test("chatCore replays nonstream DeepSeek Responses reasoning across a Chat tool turn", async () => {
  const callId = "call_deepseek_nonstream_replay";
  const reasoning = "Authentic nonstream DeepSeek reasoning";
  const apiKeyInfo = { id: "deepseek-nonstream-chat-key" };
  const first = await invokeChatCore({
    provider: "deepseek",
    model: "deepseek-v4-flash",
    endpoint: "/v1/chat/completions",
    body: {
      model: "deepseek-v4-flash",
      stream: false,
      reasoning_effort: "high",
      messages: [{ role: "user", content: "Inspect the repository" }],
      tools: [
        {
          type: "function",
          function: { name: "inspect", description: "Inspect", parameters: { type: "object" } },
        },
      ],
    },
    apiKeyInfo,
    responseFactory: () => buildDeepSeekResponsesToolResponse({ stream: false, callId, reasoning }),
  });

  assert.equal(first.result.success, true);
  const firstPayload = (await first.result.response.json()) as {
    choices: Array<{ message: Record<string, unknown> & { reasoning_content?: string } }>;
  };
  assert.equal(firstPayload.choices[0].message.reasoning_content, reasoning);
  const assistant = structuredClone(firstPayload.choices[0].message);
  delete assistant.reasoning_content;

  const second = await invokeChatCore({
    provider: "deepseek",
    model: "deepseek-v4-flash",
    endpoint: "/v1/chat/completions",
    body: {
      model: "deepseek-v4-flash",
      stream: false,
      reasoning_effort: "high",
      messages: [
        { role: "user", content: "Inspect the repository" },
        assistant,
        { role: "tool", tool_call_id: callId, content: "inspection complete" },
      ],
    },
    apiKeyInfo,
    responseFactory: () => buildResponsesResponse("done"),
  });

  assert.equal(second.result.success, true);
  assert.deepEqual(
    second.call.body.input.find((item) => item.type === "reasoning"),
    { type: "reasoning", content: [{ type: "reasoning_text", text: reasoning }], summary: [] } // summary defaulted by #11129
  );
});

test("chatCore replays streamed DeepSeek Responses reasoning across a Chat tool turn", async () => {
  const callId = "call_deepseek_stream_replay";
  const reasoning = "Authentic streamed DeepSeek reasoning";
  const apiKeyInfo = { id: "deepseek-stream-chat-key" };
  const first = await invokeChatCore({
    provider: "deepseek",
    model: "deepseek-v4-flash",
    endpoint: "/v1/chat/completions",
    body: {
      model: "deepseek-v4-flash",
      stream: true,
      reasoning_effort: "high",
      messages: [{ role: "user", content: "Inspect the repository" }],
      tools: [
        {
          type: "function",
          function: { name: "inspect", description: "Inspect", parameters: { type: "object" } },
        },
      ],
    },
    apiKeyInfo,
    responseFactory: () => buildDeepSeekResponsesToolResponse({ stream: true, callId, reasoning }),
  });

  assert.equal(first.result.success, true);
  const streamed = await first.result.response.text();
  assert.match(streamed, new RegExp(reasoning));
  await flushAsyncSideEffects();

  const second = await invokeChatCore({
    provider: "deepseek",
    model: "deepseek-v4-flash",
    endpoint: "/v1/chat/completions",
    body: {
      model: "deepseek-v4-flash",
      stream: false,
      reasoning_effort: "high",
      messages: [
        { role: "user", content: "Inspect the repository" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: callId,
              type: "function",
              function: { name: "inspect", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: callId, content: "inspection complete" },
      ],
    },
    apiKeyInfo,
    responseFactory: () => buildResponsesResponse("done"),
  });

  assert.equal(second.result.success, true);
  assert.deepEqual(
    second.call.body.input.find((item) => item.type === "reasoning"),
    { type: "reasoning", content: [{ type: "reasoning_text", text: reasoning }], summary: [] } // summary defaulted by #11129
  );
});

test("chatCore replays no-tool reasoning across public Responses turns", async () => {
  // Direct DeepSeek now speaks Responses upstream. Keep this regression on a
  // Chat-compatible DeepSeek host so it continues to exercise the Responses-to-Chat replay path.
  saveModelsDevCapabilities({
    siliconflow: {
      "deepseek-v4-pro": {
        ...capabilityEntry(128_000),
        reasoning: true,
        interleaved_field: null,
      },
    },
  });
  const sessionAffinityKey = "header:reasoning-replay-session";
  const apiKeyInfo = { id: "reasoning-replay-key" };
  const responseFactory = () =>
    new Response(
      JSON.stringify({
        id: "chatcmpl-reasoning",
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: "Hello! How can I help?",
              reasoning_content: "Authentic upstream reasoning",
            },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  const first = await invokeChatCore({
    provider: "siliconflow",
    model: "deepseek-v4-pro",
    endpoint: "/v1/responses",
    body: {
      model: "deepseek-v4-pro",
      stream: false,
      reasoning: { effort: "high" },
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    },
    apiKeyInfo,
    sessionAffinityKey,
    responseFactory,
  });
  assert.equal(first.result.success, true);

  const second = await invokeChatCore({
    provider: "siliconflow",
    model: "deepseek-v4-pro",
    endpoint: "/v1/responses",
    body: {
      model: "deepseek-v4-pro",
      stream: false,
      reasoning: { effort: "high" },
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "Hello! How can I help?" }],
        },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "tell me more" }],
        },
      ],
    },
    apiKeyInfo,
    sessionAffinityKey,
    responseFactory,
  });

  assert.equal(second.result.success, true);
  assert.equal(second.call.body.messages[1].reasoning_content, "Authentic upstream reasoning");
});
test("chatCore captures streaming no-tool reasoning for Responses replay", async () => {
  saveModelsDevCapabilities({
    siliconflow: {
      "deepseek-v4-pro": {
        ...capabilityEntry(128_000),
        reasoning: true,
        interleaved_field: null,
      },
    },
  });
  const sessionAffinityKey = "header:streaming-reasoning-replay-session";
  const apiKeyInfo = { id: "streaming-reasoning-replay-key" };
  const streamResponseFactory = () =>
    new Response(
      [
        `data: ${JSON.stringify({
          id: "chatcmpl-stream-reasoning",
          object: "chat.completion.chunk",
          choices: [
            {
              index: 0,
              delta: {
                role: "assistant",
                reasoning_content: "Authentic streaming reasoning",
              },
            },
          ],
        })}`,
        `data: ${JSON.stringify({
          id: "chatcmpl-stream-reasoning",
          object: "chat.completion.chunk",
          choices: [{ index: 0, delta: { content: "Streamed answer" } }],
        })}`,
        `data: ${JSON.stringify({
          id: "chatcmpl-stream-reasoning",
          object: "chat.completion.chunk",
          choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        })}`,
        "data: [DONE]",
        "",
      ].join("\n\n"),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );

  const first = await invokeChatCore({
    provider: "siliconflow",
    model: "deepseek-v4-pro",
    endpoint: "/v1/responses",
    body: {
      model: "deepseek-v4-pro",
      stream: true,
      reasoning: { effort: "high" },
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    },
    apiKeyInfo,
    sessionAffinityKey,
    responseFactory: streamResponseFactory,
  });
  assert.equal(first.result.success, true);
  await first.result.response.text();
  await flushAsyncSideEffects();

  const second = await invokeChatCore({
    provider: "siliconflow",
    model: "deepseek-v4-pro",
    endpoint: "/v1/responses",
    body: {
      model: "deepseek-v4-pro",
      stream: false,
      reasoning: { effort: "high" },
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "Streamed answer" }],
        },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "tell me more" }],
        },
      ],
    },
    apiKeyInfo,
    sessionAffinityKey,
    responseFactory: () => buildOpenAIResponse(false),
  });

  assert.equal(second.result.success, true);
  assert.equal(second.call.body.messages[1].reasoning_content, "Authentic streaming reasoning");
});
test("chatCore automatically preserves provider-generated opaque reasoning for Codex", async () => {
  const { call, result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.6-sol",
    endpoint: "/v1/responses",
    credentials: {
      accessToken: "codex-token",
      providerSpecificData: {},
    },
    body: {
      model: "gpt-5.6-sol",
      stream: false,
      input: [
        { id: "rs_valid", type: "reasoning", encrypted_content: "encrypted-blob" },
        { type: "reasoning", encrypted_content: "" },
        { type: "item_reference", id: "rs_reference" },
        { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
      ],
    },
    responseFormat: "openai-responses",
  });

  assert.equal(result.success, true);
  assert.deepEqual(
    call.body.input.filter((item) => item.type === "reasoning"),
    [{ id: "rs_valid", type: "reasoning", encrypted_content: "encrypted-blob", summary: [] }] // summary defaulted by #11110
  );
  assert.equal(
    call.body.input.some((item) => item.type === "item_reference"),
    false
  );
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
test("chatCore helper detects Claude Code semantic passthrough only for direct Claude-Code routes", () => {
  assert.equal(
    isClaudeCodeSemanticPassthroughRequest({
      provider: "claude",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.CLAUDE,
      userAgent: "claude-cli/2.1.137",
    }),
    true
  );
  assert.equal(
    isClaudeCodeSemanticPassthroughRequest({
      provider: "anthropic-compatible-cc-test",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.CLAUDE,
      headers: new Headers({ "x-app": "cli" }),
      userAgent: "unit-test",
    }),
    true
  );
  assert.equal(
    isClaudeCodeSemanticPassthroughRequest({
      provider: "anthropic-compatible-test",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.CLAUDE,
      userAgent: "claude-cli/2.1.137",
    }),
    false
  );
  assert.equal(
    isClaudeCodeSemanticPassthroughRequest({
      provider: "claude",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.CLAUDE,
      userAgent: "generic-client",
    }),
    false
  );
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
  assert.equal(call.body.context_management.edits[0].type, "clear_thinking_20251015");
  assert.equal(
    call.body.system.some((block: { text?: string }) => /Claude Agent SDK/.test(block.text || "")),
    true
  );
  assert.equal(typeof call.body.metadata.user_id, "string");
  assert.equal(call.body.messages[0].role, "user");
  assert.equal(call.body.messages[0].content[0].text, "Ping");
});

// Fix #2468: normalizeClaudeUpstreamMessages() now runs on the pure Claude passthrough
// path too. It extracts role:"system" messages into the top-level system parameter,
// strips empty text blocks, converts inline document blocks (no url/data) to text, and
// drops unknown block types (e.g. future_block). tool_result blocks are preserved via
// preserveToolResultBlocks:true.
test("chatCore normalizes native Claude Code messages for native Claude OAuth passthrough", async () => {
  const clientMessages = [
    {
      role: "system",
      content: [{ type: "text", text: "system-message-that-should-stay-in-messages" }],
    },
    {
      role: "user",
      content: [
        { type: "text", text: "" },
        { type: "text", text: "Run pwd", cache_control: { type: "ephemeral" } },
        { type: "document", name: "README.md", content: "Do not flatten me" },
        { type: "future_block", payload: { keep: true } },
      ],
    },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_pwd", name: "Bash", input: { command: "pwd" } }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_pwd", content: "ok" }],
    },
  ];

  const { call, result } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "omniroute/alias-that-should-resolve",
      max_tokens: 64,
      system: [{ type: "text", text: "top-level-system" }],
      messages: clientMessages,
      tools: [{ name: "Bash", input_schema: { type: "object", properties: {} } }],
    },
    userAgent: "claude-cli/2.1.137",
    requestHeaders: { "x-app": "cli", "x-claude-code-session-id": "session-123" },
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.equal(call.body.model, "claude-sonnet-4-6");

  // After normalization: role:"system" msg extracted → top-level system (3 msgs remain, not 4)
  assert.equal(call.body.messages.length, 3);

  // system-role block appended to top-level system array
  assert.equal(
    call.body.system.some(
      (block: { text?: string }) => block.text === "system-message-that-should-stay-in-messages"
    ),
    true
  );

  // user msg[0] (was clientMessages[1]): empty text, document and future_block are preserved
  // since it is a semantic passthrough request
  assert.equal(call.body.messages[0].content.length, 4);
  assert.equal(call.body.messages[0].content[0].type, "text");
  assert.equal(call.body.messages[0].content[0].text, "");
  assert.equal(call.body.messages[0].content[1].text, "Run pwd");
  assert.equal(call.body.messages[0].content[2].type, "document");
  assert.equal(call.body.messages[0].content[3].type, "future_block");

  // assistant msg[1] (was clientMessages[2]): tool_use unchanged
  assert.equal(call.body.messages[1].content[0].type, "tool_use");

  // user msg[2] (was clientMessages[3]): tool_result preserved (preserveToolResultBlocks:true)
  assert.equal(call.body.messages[2].content[0].type, "tool_result");
});
test("chatCore preserves Opus 5 mid-conversation system cache breakpoints", async () => {
  await settingsDb.updateSettings({ alwaysPreserveClientCache: "auto" });
  invalidateCacheControlSettingsCache();

  const { call, result } = await invokeChatCore({
    provider: "claude",
    model: "claude-opus-5",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-opus-5",
      max_tokens: 64,
      system: [
        {
          type: "text",
          text: "stable system prompt",
          cache_control: { type: "ephemeral", ttl: "5m" },
        },
      ],
      messages: [
        { role: "user", content: [{ type: "text", text: "first turn" }] },
        { role: "assistant", content: [{ type: "text", text: "first response" }] },
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "compact continuation",
              cache_control: { type: "ephemeral" },
            },
          ],
        },
        { role: "user", content: [{ type: "text", text: "latest turn" }] },
      ],
      tools: [{ name: "Bash", input_schema: { type: "object", properties: {} } }],
    },
    userAgent: "Claude-Code/2.1.220",
    requestHeaders: { "x-app": "cli", "x-claude-code-session-id": "session-123" },
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.deepEqual(
    call.body.messages.map((message: { role: string }) => message.role),
    ["user", "assistant", "system", "user"]
  );
  assert.deepEqual(call.body.messages[2].content[0].cache_control, {
    type: "ephemeral",
    ttl: "5m",
  });
  assert.equal(
    call.body.system.some((block: { text?: string }) => block.text === "compact continuation"),
    false
  );
  assert.deepEqual(call.body.messages[3].content[0].cache_control, {
    type: "ephemeral",
    ttl: "5m",
  });
});
test("chatCore keeps Claude normalization for non-Claude-Code Claude passthrough", async () => {
  const { call, result } = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      messages: [
        { role: "system", content: "system role should move" },
        {
          role: "user",
          content: [
            { type: "text", text: "" },
            { type: "text", text: "hello" },
            { type: "document", name: "README.md", content: "Read me" },
            { type: "future_block", payload: { drop: true } },
          ],
        },
      ],
    },
    userAgent: "generic-client/1.0",
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.equal(
    call.body.messages.some((message) => message.role === "system"),
    false
  );
  assert.equal(call.body.system.at(-1).text, "system role should move");
  assert.deepEqual(call.body.messages[0].content, [
    { type: "text", text: "hello" },
    { type: "text", text: "[README.md]\nRead me" },
  ]);
});

// Fix #2468: normalizeClaudeUpstreamMessages() runs on the CC-compatible bridge path too
// (preserveClaudeMessages=true). Same normalization: system-role → top-level system,
// empty text stripped, document→text, future_block dropped, tool_result preserved.
test("chatCore normalizes native Claude Code messages before CC-compatible relay transforms", async () => {
  const clientMessages = [
    {
      role: "system",
      content: [{ type: "text", text: "system-message-remains-in-source-history" }],
    },
    {
      role: "user",
      content: [
        { type: "text", text: "" },
        { type: "text", text: "Inspect project", cache_control: { type: "ephemeral" } },
        { type: "document", name: "design.md", content: "Keep as document block" },
        { type: "future_block", payload: { keep: true } },
      ],
    },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_read", name: "Read", input: { file_path: "a.ts" } }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_read", content: "file contents" }],
    },
  ];

  const { call, result } = await invokeChatCore({
    provider: "anthropic-compatible-cc-test",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1/messages?beta=true",
        chatPath: "/v1/messages?beta=true",
      },
    },
    body: {
      model: "claude-sonnet-4-6",
      max_tokens: 64,
      system: [{ type: "text", text: "top-level-system" }],
      messages: clientMessages,
      tools: [{ name: "Read", input_schema: { type: "object", properties: {} } }],
    },
    userAgent: "Claude-Code/2.1.137",
    requestHeaders: { "x-app": "cli", "x-claude-code-session-id": "cc-session-123" },
    responseFormat: "claude",
  });

  assert.equal(result.success, true);
  assert.match(call.url, /\/v1\/messages\?beta=true$/);
  assert.equal(call.body.stream, true);

  // After normalization: role:"system" msg extracted → top-level system (3 msgs remain, not 4)
  assert.equal(call.body.messages.length, 3);

  // CC bridge prepends its dynamic billing/fingerprint blocks; the SDK identity and
  // extracted system block must both remain present regardless of their exact position.
  assert.equal(
    call.body.system.some(
      (block: { text?: string }) =>
        block.text === "You are a Claude agent, built on Anthropic's Claude Agent SDK."
    ),
    true
  );
  assert.equal(
    call.body.system.some(
      (block: { text?: string }) => block.text === "system-message-remains-in-source-history"
    ),
    true
  );

  // user msg[0] (was clientMessages[1]): empty text, document and future_block are preserved
  // since it is a semantic passthrough request
  assert.equal(call.body.messages[0].content.length, 4);
  assert.equal(call.body.messages[0].content[0].type, "text");
  assert.equal(call.body.messages[0].content[0].text, "");
  assert.equal(call.body.messages[0].content[1].text, "Inspect project");
  assert.equal(call.body.messages[0].content[2].type, "document");
  assert.equal(call.body.messages[0].content[3].type, "future_block");

  // assistant msg[1] (was clientMessages[2]): tool_use unchanged
  assert.equal(call.body.messages[1].content[0].type, "tool_use");

  // user msg[2] (was clientMessages[3]): tool_result preserved (preserveToolResultBlocks:true)
  assert.equal(call.body.messages[2].content[0].type, "tool_result");
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
  // system[0] and system[1] are now the billing line and sentinel injected by base.ts for Claude Code
  assert.deepEqual(call.body.system[2].cache_control, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(call.body.messages[0].content[0].cache_control, {
    type: "ephemeral",
    ttl: "5m",
  });
  // base.ts executor explicitly strips cache_control from tools for Claude Code clients
  assert.equal(call.body.tools[0].cache_control, undefined);
});
test("chatCore advances a message cache breakpoint for native Claude Code requests", async () => {
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
      system: [
        {
          type: "text",
          text: "stable system prompt",
          cache_control: { type: "ephemeral", ttl: "5m" },
        },
        {
          type: "text",
          text: "stable project instructions",
          cache_control: { type: "ephemeral", ttl: "5m" },
        },
      ],
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "first turn",
              cache_control: { type: "ephemeral" },
            },
          ],
        },
        { role: "assistant", content: [{ type: "text", text: "first response" }] },
        { role: "user", content: [{ type: "text", text: "latest turn" }] },
      ],
      tools: [
        {
          name: "lookup_weather",
          description: "Fetch weather",
          input_schema: { type: "object" },
          cache_control: { type: "ephemeral", ttl: "5m" },
        },
      ],
    },
    userAgent: "Claude-Code/1.0.0",
    responseFormat: "claude",
  });

  assert.deepEqual(call.body.messages[2].content[0].cache_control, {
    type: "ephemeral",
    ttl: "5m",
  });
  assert.equal(call.body.tools[0].cache_control, undefined);
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
  // Cache preservation is on for native Claude, so cache markers are intact. This PR:
  // an omitted TTL now defaults to "5m" once a "5m" boundary breakpoint (the system
  // block above) has already appeared, instead of always defaulting to "1h".
  assert.deepEqual(call.body.messages[0].content[0].cache_control, {
    type: "ephemeral",
    ttl: "5m",
  });
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
  assert.equal(call.body.max_tokens, undefined);
  assert.equal(call.body.max_completion_tokens, 16384);
});
test("chatCore downgrades unsupported xhigh effort for assistant-prefill OpenAI-compatible requests", async () => {
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
  // GLM 5.1+ natively uses `max` as the top tier (#11875); xhigh maps to max.
  assert.equal(call.body.reasoning_effort, "max");
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
      const error = new Error(
        "translator rejected access_token=translation-secret at /srv/private/translator.ts\n" +
          "    at translate (/srv/private/translator.ts:41:8)"
      );
      error.statusCode = 422;
      error.errorType = "unsupported_feature access_token=type-secret /srv/private/type.ts";
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
  const payload = (await result.response.json()) as {
    error: { message: string; type: string; code: string };
  };
  assert.equal(payload.error.type, "invalid_request_error");
  assert.equal(payload.error.code, "");
  assert.match(payload.error.message, /translator rejected/);
  assert.doesNotMatch(
    JSON.stringify({ payload, internalError: result.error }),
    /translation-secret|type-secret|srv\/private|translator\.ts|type\.ts|\bat translate\b/i
  );
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

  await flushAsyncSideEffects();
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
test("chatCore does not expose provider request credentials in non-stream response headers", async () => {
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "hide provider credentials" }],
    },
    responseFormat: "openai",
  });

  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("authorization"), null);
  assert.equal(result.response.headers.get("x-api-key"), null);
  assert.equal(result.response.headers.get("Content-Type"), "application/json");
  assert.equal(result.response.headers.get("X-OmniRoute-Cache"), "MISS");
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
      "gpt-5": "gpt-4o-mini",
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
  assert.equal(call.body.model, "gpt-4o-mini");
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
    model: "gpt-5.6-sol",
    endpoint: "/v1/responses",
    connectionId: connection.id,
    credentials: {
      accessToken: "codex-token",
      providerSpecificData: {},
    },
    body: {
      model: "gpt-5.6-sol",
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
test("chatCore does not substitute an OpenAI model after model-unavailable", async () => {
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
      return buildOpenAIResponse(false, "unexpected fallback");
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 404);
  assert.equal(calls.length, 1);
});
test("chatCore does not substitute an OpenAI model after context overflow", async () => {
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
      return buildOpenAIResponse(false, "unexpected fallback");
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 1);
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
test("chatCore does not substitute an OpenAI model after empty content", async () => {
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
      return buildOpenAIResponse(false, "unexpected fallback");
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(calls.length, 1);
});
test("chatCore returns a gateway error without probing another OpenAI model", async () => {
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
  assert.equal(calls.length, 1);
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
  // Breakpoints: system[2] (1), message content (1), assistant response (1). Tools cache_control is stripped by base.ts.
  assert.equal(detail.requestBody._omniroute.claudePromptCache.totalBreakpoints, 3);
  assert.equal(detail.responseBody._omniroute.claudePromptCache.applied, true);
  assert.equal(detail.responseBody._omniroute.claudePromptCache.totalBreakpoints, 3);
  assert.equal(typeof detail.responseBody._omniroute.claudePromptCache.anthropicBeta, "string");
  assert.match(detail.responseBody._omniroute.claudePromptCache.anthropicBeta, /prompt-caching/i);
  assert.deepEqual(detail.responseBody._omniroute.claudePromptCacheUsage, {
    cacheReadTokens: 4,
    cacheCreationTokens: 2,
  });
});
test("chatCore propagates budget errors without an executor-level emergency hop", async () => {
  // The emergency budget fallback is orchestrated by the routing layer
  // (src/sse/handlers/chat.ts), which resolves credentials FOR the emergency
  // provider through account selection. The old executor-level hop here re-sent
  // the FAILING provider's credentials to the emergency provider's endpoint
  // (cross-provider credential leak) — the engine must now surface the budget
  // error as-is, with no extra upstream call.
  const { calls, result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      max_tokens: 9000,
      messages: [{ role: "user", content: "keep the request alive after budget exhaustion" }],
    },
    responseFactory() {
      return new Response(
        JSON.stringify({
          error: { message: "insufficient funds on this account" },
        }),
        {
          status: 402,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 402);
  assert.equal(calls.length, 1, "no executor-level emergency hop may fire");
  const body = (await result.response.json()) as any;
  assert.match(String(body?.error?.message ?? ""), /insufficient funds/);
  assert.ok(
    !calls.some((c: any) => String(c.body?.model ?? "").includes("gpt-oss-120b")),
    "emergency fallback model must not be called at executor level"
  );
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
test("chatCore keeps the SSE stream comment-free by default and still ends with [DONE]", async () => {
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
  // The per-request metadata reaches the client through these headers regardless
  // of the comment setting — that is what makes the trailer optional.
  assert.equal(result.response.headers.get("X-OmniRoute-Provider"), "openai");
  assert.equal(result.response.headers.get("X-OmniRoute-Model"), "gpt-4o-mini");

  // #10524 flipped OMNIROUTE_SSE_COMMENTS to off-by-default: strict SSE clients
  // JSON.parse every line and crash on `: x-omniroute-*` comments. This test used
  // to assert the opposite and went red on the release branch when that default
  // landed. The opt-in half — trailer present, after the finish chunk and before
  // [DONE] — is owned by sse-comments-optout-9305.test.ts, which drives the env
  // var through all three states; enabling it here instead leaks process.env into
  // the sibling call-log tests in this file.
  assert.doesNotMatch(streamText, /: x-omniroute-/);
  assert.match(streamText, /data: \[DONE\]/);
});
test("buildStreamingResponseHeaders drops upstream compression and framing headers", () => {
  const headers = new Headers(
    buildStreamingResponseHeaders(
      new Headers({
        "Content-Type": "text/event-stream",
        "Content-Encoding": "gzip",
        "Content-Length": "999",
        "Transfer-Encoding": "chunked",
        "X-Upstream-Trace": "trace-1",
      }),
      {
        provider: "openai",
        model: "gpt-4o-mini",
        cacheHit: false,
        latencyMs: 0,
        usage: null,
        costUsd: 0,
      }
    )
  );

  assert.equal(headers.get("Content-Type"), "text/event-stream");
  assert.equal(headers.get("Content-Encoding"), null);
  assert.equal(headers.get("Content-Length"), null);
  assert.equal(headers.get("Transfer-Encoding"), null);
  assert.equal(headers.get("X-Upstream-Trace"), "trace-1");
  assert.equal(headers.get("X-OmniRoute-Cache"), "MISS");
});
test("chatCore strips upstream compression and length headers from streaming responses", async () => {
  const upstreamPayload = `data: ${JSON.stringify({
    id: "chatcmpl-stream-headers",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { role: "assistant", content: "streamed" } }],
  })}\n\ndata: [DONE]\n\n`;
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    accept: "text/event-stream",
    body: {
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: "stream header sanitization" }],
    },
    responseFactory() {
      return new Response(upstreamPayload, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Content-Length": String(Buffer.byteLength(upstreamPayload)),
          "X-Upstream-Trace": "trace-1",
        },
      });
    },
  });

  assert.equal(result.success, true);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
  assert.equal(result.response.headers.get("Content-Length"), null);
  assert.equal(result.response.headers.get("X-Upstream-Trace"), "trace-1");
  assert.equal(result.response.headers.get("X-OmniRoute-Cache"), "MISS");
  await result.response.text();
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
test("chatCore maps raw string abort reasons to 499, not 502 (#7907)", async () => {
  // abort(reason) rejects the upstream fetch with the raw reason — often a
  // bare string with no `name`/`status`. It must map to 499 like a named
  // AbortError, not fall through to the 502 provider-failure default.
  const { result } = await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "abort me with a string reason" }],
    },
    responseFactory() {
      throw "request_signal_aborted";
    },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 499);
  assert.equal(result.error, "Request aborted");
});

// Live incident territory (dashboard log id 1784504040241-6f8b9a): the client had
// ALREADY disconnected before this synthetic error body was ever computed — nothing
// was actually delivered to it. Persisting that body as `clientResponse` (the
// dashboard's "what the client received" field) is misleading, since it implies a
// response was sent when the client never got one. `error` above already records
// the failure reason; `clientResponse`/`responseBody` should stay empty for an abort.
test("chatCore does not log a synthetic clientResponse body for a client abort", async () => {
  // clientResponse only ever lands in the persisted pipeline payloads when detailed
  // call-log capture is on (attemptLogging.ts's detailedLoggingEnabled gate) — this is
  // exactly the setting a real "detailed logging" connection/request has enabled, which
  // is why the live incident's artifact JSON had a full pipeline (including the
  // misleading clientResponse) to begin with.
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });

  await invokeChatCore({
    provider: "openai",
    model: "gpt-4o-mini",
    body: {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: "abort me, no fake clientResponse" }],
    },
    responseFactory() {
      const error = new Error("request aborted by client");
      error.name = "AbortError";
      throw error;
    },
  });

  const detail = await waitFor(() => getLatestCallLog());
  assert.ok(detail);
  assert.equal(detail.status, 499);
  assert.match(String(detail.error ?? ""), /Request aborted/);
  assert.ok(detail.pipelinePayloads, "expected pipeline payloads when capture is enabled");
  assert.equal(
    (detail.pipelinePayloads as Record<string, unknown>).clientResponse,
    undefined,
    "an aborted request never delivered anything to the client — clientResponse must stay unset"
  );
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
    // 10s ceiling: a non-buffering streaming impl resolves the invocation as soon
    // as the Response is returned (upstream still open), but on a starved CI event
    // loop that legitimate early return can exceed a 1s wall-clock budget (flake
    // repro: 5/8 runs returned at 1.3–2.2s under CPU contention → false "blocked").
    // The ceiling only bounds the buffered-failure case: a buffering impl never
    // resolves until closeUpstream() fires below, so it still trips "blocked".
    new Promise((resolve) => setTimeout(() => resolve("blocked"), 10000)),
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

  await flushAsyncSideEffects();

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
  await flushAsyncSideEffects();

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

  // #2952 — a streaming client receives the cache HIT as an SSE stream (not a
  // raw JSON body), so content + reasoning_content arrive in the streaming shape.
  assert.equal(
    second.result.response.headers.get("Content-Type"),
    "text/event-stream",
    "streaming cache HIT should be served as SSE"
  );
  const sse = await second.result.response.text();
  assert.match(sse, /^data:/m, "cache HIT should be SSE-framed");
  assert.match(sse, /streamed-once/, "SSE cache HIT should carry the cached content");
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
  await flushAsyncSideEffects();

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
  await flushAsyncSideEffects();

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
test("chatCore returns cache HIT as SSE when the client requests streaming", async () => {
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
  // #2952 — even though the cache was populated by a non-streaming request, a
  // later streaming request gets the cached completion SSE-wrapped, so streaming
  // clients keep their streaming shape (and reasoning_content) on cache hits.
  assert.equal(
    second.result.response.headers.get("Content-Type"),
    "text/event-stream",
    "streaming cache HIT should be served as SSE"
  );
  const sse = await second.result.response.text();
  assert.match(sse, /^data:/m, "cache HIT should be SSE-framed");
  assert.match(sse, /cached-json/, "SSE cache HIT should carry the cached content");
});
