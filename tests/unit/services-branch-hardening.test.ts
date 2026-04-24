import test from "node:test";
import assert from "node:assert/strict";

const signatureStore = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");
const modelCapabilities = await import("../../open-sse/services/modelCapabilities.ts");
const comboAgentMiddleware = await import("../../open-sse/services/comboAgentMiddleware.ts");
const rateLimitSemaphore = await import("../../open-sse/services/rateLimitSemaphore.ts");
const comboMetrics = await import("../../open-sse/services/comboMetrics.ts");
const modelService = await import("../../open-sse/services/model.ts");
const errorClassifier = await import("../../open-sse/services/errorClassifier.ts");
const providerModels = await import("../../open-sse/config/providerModels.ts");

const originalDateNow = Date.now;
const originalConsoleWarn = console.warn;
const originalSyntheticAlias = providerModels.PROVIDER_ID_TO_ALIAS.synthetic;
const originalSyntheticModels = providerModels.PROVIDER_MODELS.synthetic;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.afterEach(() => {
  Date.now = originalDateNow;
  console.warn = originalConsoleWarn;
  if (originalSyntheticAlias === undefined) {
    delete providerModels.PROVIDER_ID_TO_ALIAS.synthetic;
  } else {
    providerModels.PROVIDER_ID_TO_ALIAS.synthetic = originalSyntheticAlias;
  }
  if (originalSyntheticModels === undefined) {
    delete providerModels.PROVIDER_MODELS.synthetic;
  } else {
    providerModels.PROVIDER_MODELS.synthetic = originalSyntheticModels;
  }
  rateLimitSemaphore.resetAll();
  comboMetrics.resetAllComboMetrics();
});

test("gemini thought signature store handles invalid input, TTL expiry and max-size pruning", () => {
  signatureStore.storeGeminiThoughtSignature("", "sig");
  signatureStore.storeGeminiThoughtSignature("call-empty", "");
  assert.equal(signatureStore.getGeminiThoughtSignature(""), null);
  assert.equal(signatureStore.getGeminiThoughtSignature("call-empty"), null);

  let now = 1_000;
  Date.now = () => now;

  signatureStore.storeGeminiThoughtSignature("call-live", "sig-live");
  assert.equal(signatureStore.getGeminiThoughtSignature("call-live"), "sig-live");

  now += 60 * 60 * 1000 + 1;
  assert.equal(signatureStore.getGeminiThoughtSignature("call-live"), null);

  now = 10_000;
  for (let index = 0; index < 1002; index++) {
    signatureStore.storeGeminiThoughtSignature(`call-${index}`, `sig-${index}`);
    now += 1;
  }

  assert.equal(signatureStore.getGeminiThoughtSignature("call-0"), null);
  assert.equal(signatureStore.getGeminiThoughtSignature("call-1001"), "sig-1001");
});

test("model capability helpers cover denylist, empty input and default-safe paths", () => {
  providerModels.PROVIDER_ID_TO_ALIAS.synthetic = "synthetic";
  providerModels.PROVIDER_MODELS.synthetic = [
    { id: "tool-safe", toolCalling: true, supportsReasoning: true },
    { id: "tool-blocked", toolCalling: false, supportsReasoning: false },
    { id: "tool-unknown" },
  ];

  assert.equal(modelCapabilities.supportsToolCalling("synthetic/tool-safe"), true);
  assert.equal(modelCapabilities.supportsToolCalling("synthetic/tool-blocked"), false);
  assert.equal(modelCapabilities.supportsReasoning("synthetic/tool-safe"), true);
  assert.equal(modelCapabilities.supportsReasoning("synthetic/tool-blocked"), false);
  assert.equal(modelCapabilities.supportsToolCalling("synthetic/tool-unknown"), true);
  assert.equal(modelCapabilities.supportsReasoning("synthetic/tool-unknown"), true);
  assert.equal(modelCapabilities.supportsToolCalling("missing-provider/tool"), true);
  assert.equal(modelCapabilities.supportsReasoning("missing-provider/tool"), true);

  assert.equal(modelCapabilities.supportsToolCalling(""), false);
  assert.equal(modelCapabilities.supportsToolCalling("openai/gpt-oss-120b"), true);
  assert.equal(modelCapabilities.supportsToolCalling("deepseek-reasoner"), true);
  assert.equal(
    modelCapabilities.supportsToolCalling("openai/nonexistent-default-safe-model"),
    true
  );

  assert.equal(modelCapabilities.supportsReasoning(""), true);
  assert.equal(modelCapabilities.supportsReasoning("antigravity/claude-sonnet-4-6"), false);
  assert.equal(modelCapabilities.supportsReasoning("antigravity/claude-sonnet-4"), false);
  assert.equal(modelCapabilities.supportsReasoning("openai/nonexistent-default-safe-model"), true);
});

test("combo agent middleware covers system override, tool filtering, tag stripping and pin propagation", () => {
  const originalTools = [
    { type: "function", function: { name: "keep_me" } },
    { name: "drop_me" },
    { type: "function", function: { name: "keep_tool" } },
  ];
  const body = {
    model: "combo/default",
    messages: [
      { role: "system", content: "old system" },
      { role: "user", content: "hello" },
      { role: "assistant", content: "cached\n<omniModel>anthropic/claude-sonnet-4-6</omniModel>" },
    ],
    tools: originalTools,
  };

  const filtered = comboAgentMiddleware.applyToolFilter(originalTools, "^keep");
  assert.deepEqual(filtered, [
    { type: "function", function: { name: "keep_me" } },
    { type: "function", function: { name: "keep_tool" } },
  ]);
  assert.equal(comboAgentMiddleware.applyToolFilter(undefined, "^keep"), undefined);
  assert.equal(comboAgentMiddleware.applyToolFilter(originalTools, null), originalTools);

  const warnMessages = [];
  console.warn = (message) => warnMessages.push(String(message));
  assert.equal(comboAgentMiddleware.applyToolFilter(originalTools, "["), originalTools);
  assert.equal(warnMessages.length, 1);

  const stripped = comboAgentMiddleware.stripModelTags(body.messages);
  assert.deepEqual(stripped, [
    { role: "system", content: "old system" },
    { role: "user", content: "hello" },
    { role: "assistant", content: "cached" },
  ]);

  const overridden = comboAgentMiddleware.applySystemMessageOverride(body.messages, "new system");
  assert.deepEqual(overridden[0], { role: "system", content: "new system" });
  assert.equal(overridden.filter((message) => message.role === "system").length, 1);

  const result = comboAgentMiddleware.applyComboAgentMiddleware(
    body,
    {
      context_cache_protection: true,
      system_message: "combo system",
      tool_filter_regex: "^keep",
    },
    "openai/gpt-4o"
  );

  assert.equal(result.pinnedModel, "anthropic/claude-sonnet-4-6");
  assert.equal(result.body.model, "anthropic/claude-sonnet-4-6");
  assert.deepEqual(result.body.messages, [
    { role: "system", content: "combo system" },
    { role: "user", content: "hello" },
    { role: "assistant", content: "cached" },
  ]);
  assert.deepEqual(result.body.tools, filtered);

  const passthrough = comboAgentMiddleware.applyComboAgentMiddleware(body, null, "openai/gpt-4o");
  assert.equal(passthrough.pinnedModel, null);
  assert.equal(passthrough.body, body);
});

test("rate limit semaphore covers immediate acquire, timeout, cooldown drain and reset", async () => {
  const release = await rateLimitSemaphore.acquire("model-a", { maxConcurrency: 1 });
  assert.deepEqual(rateLimitSemaphore.getStats()["model-a"], {
    running: 1,
    queued: 0,
    max: 1,
    rateLimitedUntil: null,
  });

  release();
  release();
  assert.equal(rateLimitSemaphore.getStats()["model-a"].running, 0);

  const heldRelease = await rateLimitSemaphore.acquire("model-b", { maxConcurrency: 1 });
  const timeoutPromise = rateLimitSemaphore.acquire("model-b", {
    maxConcurrency: 1,
    timeoutMs: 15,
  });
  await assert.rejects(timeoutPromise, (error) => (error as any).code === "SEMAPHORE_TIMEOUT");
  heldRelease();

  const firstRelease = await rateLimitSemaphore.acquire("model-c", { maxConcurrency: 1 });
  const secondPromise = rateLimitSemaphore.acquire("model-c", {
    maxConcurrency: 1,
    timeoutMs: 500,
  });
  rateLimitSemaphore.markRateLimited("model-c", 20);
  firstRelease();
  await wait(10);
  assert.equal(rateLimitSemaphore.getStats()["model-c"].queued, 1);
  const secondRelease = await secondPromise;
  secondRelease();
  assert.equal(rateLimitSemaphore.getStats()["model-c"].queued, 0);

  const blockingRelease = await rateLimitSemaphore.acquire("model-d", { maxConcurrency: 1 });
  const queuedPromise = rateLimitSemaphore.acquire("model-d", {
    maxConcurrency: 1,
    timeoutMs: 500,
  });
  rateLimitSemaphore.resetAll();
  await assert.rejects(queuedPromise, /Semaphore reset/);
  blockingRelease();
});

test("combo metrics cover empty reads, intent tracking, per-model stats and resets", () => {
  assert.equal(comboMetrics.getComboMetrics("missing"), null);

  comboMetrics.recordComboIntent("idle", "chat");
  const idleMetrics = comboMetrics.getComboMetrics("idle");
  assert.equal(idleMetrics.avgLatencyMs, 0);
  assert.equal(idleMetrics.successRate, 0);
  assert.equal(idleMetrics.fallbackRate, 0);
  assert.deepEqual(idleMetrics.intentCounts, { chat: 1 });

  comboMetrics.recordComboIntent("writer", "");
  comboMetrics.recordComboIntent("writer", "chat");
  comboMetrics.recordComboRequest("writer", "openai/gpt-4o", {
    success: true,
    latencyMs: 120,
    fallbackCount: 1,
    strategy: "priority",
    target: {
      executionKey: "writer>step-openai-a",
      stepId: "step-openai-a",
      provider: "openai",
      connectionId: "conn-openai-a",
      label: "Primary OpenAI",
    },
  });
  comboMetrics.recordComboRequest("writer", "openai/gpt-4o", {
    success: false,
    latencyMs: 80,
    fallbackCount: 0,
    strategy: "least-used",
    target: {
      executionKey: "writer>step-openai-a",
      stepId: "step-openai-a",
      provider: "openai",
      connectionId: "conn-openai-a",
      label: "Primary OpenAI",
    },
  });
  comboMetrics.recordComboRequest("writer", null, {
    success: true,
    latencyMs: 50,
    fallbackCount: 0,
    strategy: "least-used",
  });

  const writer = comboMetrics.getComboMetrics("writer");
  assert.equal(writer.strategy, "least-used");
  assert.equal(writer.totalRequests, 3);
  assert.equal(writer.totalSuccesses, 2);
  assert.equal(writer.totalFailures, 1);
  assert.equal(writer.totalFallbacks, 1);
  assert.equal(writer.avgLatencyMs, 83);
  assert.equal(writer.successRate, 67);
  assert.equal(writer.fallbackRate, 33);
  assert.deepEqual(writer.intentCounts, { unknown: 1, chat: 1 });
  assert.equal(writer.byModel["openai/gpt-4o"].requests, 2);
  assert.equal(writer.byModel["openai/gpt-4o"].successRate, 50);
  assert.equal(writer.byModel["openai/gpt-4o"].avgLatencyMs, 100);
  assert.equal(writer.byTarget["writer>step-openai-a"].requests, 2);
  assert.equal(writer.byTarget["writer>step-openai-a"].successRate, 50);
  assert.equal(writer.byTarget["writer>step-openai-a"].connectionId, "conn-openai-a");
  assert.equal(writer.byTarget["writer>step-openai-a"].label, "Primary OpenAI");

  const allMetrics = comboMetrics.getAllComboMetrics();
  assert.equal(Object.keys(allMetrics).length, 2);
  assert.ok(allMetrics.idle);
  assert.ok(allMetrics.writer);

  comboMetrics.resetComboMetrics("writer");
  assert.equal(comboMetrics.getComboMetrics("writer"), null);

  comboMetrics.recordComboRequest("reader", "anthropic/claude-sonnet-4-6", {
    success: true,
    latencyMs: 30,
  });
  comboMetrics.resetAllComboMetrics();
  assert.deepEqual(comboMetrics.getAllComboMetrics(), {});
});

test("model helpers cover malformed input, alias maps, wildcard aliases, ambiguity and provider inference", async () => {
  assert.equal(modelService.resolveProviderAlias("gh"), "github");
  assert.equal(modelService.resolveProviderAlias("openai"), "openai");

  assert.deepEqual(modelService.parseModel("../escape"), {
    provider: null,
    model: null,
    isAlias: false,
    providerAlias: null,
    extendedContext: false,
  });
  assert.deepEqual(modelService.parseModel("bad\u0000model"), {
    provider: null,
    model: null,
    isAlias: false,
    providerAlias: null,
    extendedContext: false,
  });

  assert.deepEqual(
    modelService.resolveModelAliasFromMap("alias-a", {
      "alias-a": "gh/gemini-3-pro",
    }),
    {
      provider: "github",
      model: "gemini-3-pro",
    }
  );
  assert.deepEqual(
    modelService.resolveModelAliasFromMap("alias-b", {
      "alias-b": { provider: "cx", model: "gpt-5.2-codex" },
    }),
    {
      provider: "codex",
      model: "gpt-5.2-codex",
    }
  );
  assert.equal(modelService.resolveModelAliasFromMap("missing", { other: "x/y" }), null);
  assert.equal(modelService.resolveModelAliasFromMap("broken", { broken: "no-slash" }), null);

  const exactAlias = await modelService.getModelInfoCore("alias-exact[1m]", async () => ({
    "alias-exact": "gh/gemini-3-pro",
  }));
  assert.deepEqual(exactAlias, {
    provider: "github",
    model: "gemini-3.1-pro-preview",
    extendedContext: true,
  });

  const wildcardAlias = await modelService.getModelInfoCore("claude-sonnet-special", {
    "claude-sonnet-*": "anthropic/claude-sonnet-4-5-20250929",
  });
  assert.equal(wildcardAlias.provider, "anthropic");
  assert.equal(wildcardAlias.model, "claude-sonnet-4-5-20250929");
  assert.equal(wildcardAlias.wildcardPattern, "claude-sonnet-*");

  const ambiguous = await modelService.getModelInfoCore("gpt-5.2-codex", {});
  assert.equal(ambiguous.provider, null);
  assert.equal(ambiguous.errorType, "ambiguous_model");
  assert.ok(ambiguous.errorMessage.includes("provider/model"));
  assert.ok(Array.isArray(ambiguous.candidateProviders));
  assert.ok(ambiguous.candidateProviders.length >= 2);

  assert.deepEqual(await modelService.getModelInfoCore("claude-unknown", {}), {
    provider: "anthropic",
    model: "claude-unknown",
    extendedContext: false,
  });
  assert.deepEqual(await modelService.getModelInfoCore("gemini-custom", {}), {
    provider: "gemini",
    model: "gemini-custom",
    extendedContext: false,
  });
  assert.deepEqual(await modelService.getModelInfoCore("made-up-model", {}), {
    provider: "openai",
    model: "made-up-model",
    extendedContext: false,
  });
});

test("error classifier covers empty-content helpers, context overflow and remaining error classes", () => {
  assert.equal(errorClassifier.isEmptyContentResponse(null), false);
  assert.equal(errorClassifier.isEmptyContentResponse({ choices: [] }), true);
  assert.equal(
    errorClassifier.isEmptyContentResponse({
      choices: [{ message: { content: "", tool_calls: [{ id: "call_1" }] } }],
    }),
    false
  );
  assert.equal(errorClassifier.isEmptyContentResponse({ content: [] }), true);
  assert.equal(errorClassifier.isEmptyContentResponse({ text: "   " }), true);
  assert.equal(errorClassifier.isEmptyContentResponse({ content: null }), true);
  assert.equal(errorClassifier.isEmptyContentResponse({ content: "hello" }), false);

  assert.equal(errorClassifier.isContextOverflow("request exceeds context window"), true);
  assert.equal(errorClassifier.isContextOverflow("plain auth error"), false);

  assert.equal(
    errorClassifier.classifyProviderError(
      429,
      JSON.stringify({ error: { message: "insufficient_quota: exceeded your current quota" } })
    ),
    errorClassifier.PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
  assert.equal(
    errorClassifier.classifyProviderError(
      401,
      JSON.stringify({ error: { message: "invalid authentication credentials" } })
    ),
    errorClassifier.PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN
  );
  assert.equal(
    errorClassifier.classifyProviderError(
      403,
      JSON.stringify({ error: { message: "account_deactivated due to billing issue" } })
    ),
    errorClassifier.PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
  );
  assert.equal(
    errorClassifier.classifyProviderError(500, { error: { message: "upstream exploded" } }),
    errorClassifier.PROVIDER_ERROR_TYPES.SERVER_ERROR
  );
  assert.equal(
    errorClassifier.classifyProviderError(400, { error: { message: "input exceeds context" } }),
    errorClassifier.PROVIDER_ERROR_TYPES.CONTEXT_OVERFLOW
  );

  const circular = {};
  circular.self = circular;
  assert.equal(errorClassifier.classifyProviderError(418, circular), null);
});
