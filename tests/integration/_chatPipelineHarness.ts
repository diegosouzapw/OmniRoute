import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export async function createChatPipelineHarness(prefix) {
  const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `omniroute-${prefix}-`));
  process.env.DATA_DIR = testDataDir;
  process.env.REQUIRE_API_KEY = "false";
  // Disable dashboard auth so direct route handler calls don't get 401
  // (CI sets JWT_SECRET + INITIAL_PASSWORD, causing isAuthRequired() → true)
  process.env.DASHBOARD_PASSWORD = "";
  process.env.INITIAL_PASSWORD = "";
  delete process.env.JWT_SECRET;
  // FASE-01: API_KEY_SECRET is required for CRC operations (no hardcoded fallback)
  if (!process.env.API_KEY_SECRET) {
    process.env.API_KEY_SECRET = "test-harness-secret-" + Date.now();
  }

  const core = await import("../../src/lib/db/core.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");
  const combosDb = await import("../../src/lib/db/combos.ts");
  const settingsDb = await import("../../src/lib/db/settings.ts");
  const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
  const modelComboMappingsDb = await import("../../src/lib/db/modelComboMappings.ts");
  const readCacheDb = await import("../../src/lib/db/readCache.ts");
  const memoryStore = await import("../../src/lib/memory/store.ts");
  const memoryToolsModule = await import("../../open-sse/mcp-server/tools/memoryTools.ts");
  const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
  const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
  const { skillExecutor } = await import("../../src/lib/skills/executor.ts");
  const builtinsModule = await import("../../src/lib/skills/builtins.ts");
  const sandboxModule = await import("../../src/lib/skills/sandbox.ts");
  const skillsRouteModule = await import("../../src/app/api/skills/route.ts");
  const skillByIdRouteModule = await import("../../src/app/api/skills/[id]/route.ts");
  const idempotencyLayerModule = await import("../../src/lib/idempotencyLayer.ts");
  const semanticCacheModule = await import("../../src/lib/semanticCache.ts");
  const { handleChat } = await import("../../src/sse/handlers/chat.ts");
  const { initTranslators } = await import("../../open-sse/translator/index.ts");
  const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
  const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
  const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

  const originalFetch = globalThis.fetch;
  const originalRetryDelayMs = BaseExecutor.RETRY_CONFIG.delayMs;

  function clearSkillState() {
    skillRegistry.registeredSkills?.clear?.();
    skillRegistry.versionCache?.clear?.();
    skillExecutor.handlers?.clear?.();
  }

  function toPlainHeaders(headers) {
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
  } = {}) {
    const requestHeaders = {
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

  async function waitFor(fn, timeoutMs = 1500) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
      const result = await fn();
      if (result) return result;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    return null;
  }

  async function resetStorage() {
    globalThis.fetch = originalFetch;
    clearInflight();
    idempotencyLayerModule.clearIdempotency();
    semanticCacheModule.clearCache();
    resetAllCircuitBreakers();
    apiKeysDb.resetApiKeyState();
    readCacheDb.invalidateDbCache();
    invalidateMemorySettingsCache();
    clearSkillState();
    await new Promise((resolve) => setTimeout(resolve, 20));
    core.resetDbInstance();
    fs.rmSync(testDataDir, { recursive: true, force: true });
    fs.mkdirSync(testDataDir, { recursive: true });
    initTranslators();
  }

  async function cleanup() {
    BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
    globalThis.fetch = originalFetch;
    clearInflight();
    idempotencyLayerModule.clearIdempotency();
    semanticCacheModule.clearCache();
    clearSkillState();
    resetAllCircuitBreakers();
    core.resetDbInstance();
    fs.rmSync(testDataDir, { recursive: true, force: true });
  }

  async function seedConnection(provider, overrides = {}) {
    return providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: overrides.name || `${provider}-primary`,
      apiKey: overrides.apiKey || `sk-${provider}-${crypto.randomUUID().slice(0, 8)}`,
      isActive: overrides.isActive ?? true,
      testStatus: overrides.testStatus || "active",
      priority: overrides.priority,
      rateLimitedUntil: overrides.rateLimitedUntil,
      providerSpecificData: overrides.providerSpecificData || {},
    });
  }

  async function seedApiKey({
    name = `${prefix}-key`,
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

  initTranslators();

  return {
    TEST_DATA_DIR: testDataDir,
    BaseExecutor,
    apiKeysDb,
    buildClaudeResponse,
    buildGeminiResponse,
    buildOpenAIResponse,
    buildOpenAIToolCallResponse,
    buildRequest,
    builtinsModule,
    cleanup,
    combosDb,
    core,
    handleChat,
    memoryStore,
    memoryTools: memoryToolsModule.memoryTools,
    modelComboMappingsDb,
    originalRetryDelayMs,
    resetStorage,
    sandboxModule,
    idempotencyLayerModule,
    semanticCacheModule,
    seedApiKey,
    seedConnection,
    settingsDb,
    skillByIdRouteModule,
    skillExecutor,
    skillRegistry,
    skillsRouteModule,
    toPlainHeaders,
    waitFor,
  };
}
