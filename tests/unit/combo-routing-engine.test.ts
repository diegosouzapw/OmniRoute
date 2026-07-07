import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-routing-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  getComboFromData,
  getComboModelsFromData,
  validateComboDAG,
  resolveNestedComboModels,
  handleComboChat,
} = await import("../../open-sse/services/combo.ts");
const { resolveReasoningBufferedMaxTokens } =
  await import("../../open-sse/services/reasoningTokenBuffer.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");
const { registerStrategy } = await import("../../open-sse/services/autoCombo/routerStrategy.ts");
const { touchSession, clearSessions } = await import("../../open-sse/services/sessionManager.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const evalsDb = await import("../../src/lib/db/evals.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { getComboMetrics, recordComboRequest, resetAllComboMetrics } =
  await import("../../open-sse/services/comboMetrics.ts");
const { resetEvalRoutingCache } = await import("../../open-sse/services/evalRouting.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { acquire: acquireSemaphore, resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { _setSecureRandomFloatSource } = await import("../../src/shared/utils/secureRandom.ts");

function createLog() {
  const entries: any[] = [];
  return {
    info: (tag: any, msg: any) => entries.push({ level: "info", tag, msg }),
    warn: (tag: any, msg: any) => entries.push({ level: "warn", tag, msg }),
    error: (tag: any, msg: any) => entries.push({ level: "error", tag, msg }),
    debug: (tag: any, msg: any) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function okResponse(body: any = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function errorResponse(status: number, message: string = `Error ${status}`) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function waitForBackgroundWork() {
  return new Promise((resolve) => setTimeout(resolve, 25));
}

function providerBreakerOpenResponse() {
  return new Response(
    JSON.stringify({
      error: {
        message: "Provider circuit breaker is open",
        code: "provider_circuit_open",
      },
    }),
    {
      status: 503,
      headers: {
        "content-type": "application/json",
        "x-omniroute-provider-breaker": "open",
      },
    }
  );
}

function streamResponse(chunks: any[]) {
  return new Response(chunks.join(""), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
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
    ...overrides,
  };
}

function getComboTargetExecutionKey(comboName: string, index: number, stepInput: any) {
  const step = normalizeComboStep(stepInput, { comboName, index });
  if (!step) throw new Error(`Failed to normalize combo step for ${comboName}#${index}`);
  return `combo:${comboName}:${step.id}`;
}

async function cleanupTestDataDir() {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error: any) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

async function resetStorage() {
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.resetAllPricing();
  settingsDb.clearAllLKGP();
  clearModelsDevCapabilities();
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetEvalRoutingCache();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  await resetStorage();
});

test.after(async () => {
  resetAllComboMetrics();
  resetEvalRoutingCache();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearModelsDevCapabilities();
  settingsDb.clearAllLKGP();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  await cleanupTestDataDir();
});

test("getComboFromData and getComboModelsFromData resolve combos from array and object containers", () => {
  const combos = [
    { name: "alpha", models: ["openai/gpt-4o-mini", { model: "claude/sonnet", weight: 2 }] },
  ];

  const fromArray = getComboFromData("alpha", combos);
  const fromObject = getComboFromData("alpha", { combos });
  const models = getComboModelsFromData("alpha", { combos });

  assert.equal(fromArray.name, "alpha");
  assert.equal(fromObject.name, "alpha");
  assert.deepEqual(models, ["openai/gpt-4o-mini", "claude/sonnet"]);
});

test("validateComboDAG rejects circular references and resolveNestedComboModels expands nested combos", () => {
  const combos = [
    { name: "root", models: ["child-a", "openai/gpt-4o-mini"] },
    { name: "child-a", models: ["child-b", "claude/sonnet"] },
    { name: "child-b", models: ["groq/llama-3.3-70b"] },
  ];

  validateComboDAG("root", combos);
  assert.deepEqual(resolveNestedComboModels(combos[0], combos), [
    "groq/llama-3.3-70b",
    "claude/sonnet",
    "openai/gpt-4o-mini",
  ]);

  assert.throws(
    () =>
      validateComboDAG("loop-a", [
        { name: "loop-a", models: ["loop-b"] },
        { name: "loop-b", models: ["loop-a"] },
      ]),
    /Circular combo reference detected/
  );
});

test("resolveNestedComboModels expands explicit combo-ref steps", () => {
  const combos = [
    {
      name: "root",
      models: [
        { id: "root-ref-child", kind: "combo-ref", comboName: "child", weight: 0 },
        { id: "root-model", kind: "model", providerId: "openai", model: "openai/gpt-4o-mini" },
      ],
    },
    {
      name: "child",
      models: [
        { id: "child-model", kind: "model", providerId: "anthropic", model: "claude/sonnet" },
      ],
    },
  ];

  validateComboDAG("root", combos);
  assert.deepEqual(resolveNestedComboModels(combos[0], combos), [
    "claude/sonnet",
    "openai/gpt-4o-mini",
  ]);
});

test("validateComboDAG enforces maximum nesting depth", () => {
  const combos = [
    { name: "c1", models: ["c2"] },
    { name: "c2", models: ["c3"] },
    { name: "c3", models: ["c4"] },
    { name: "c4", models: ["c5"] },
    { name: "c5", models: ["openai/gpt-4o-mini"] },
  ];

  assert.throws(() => validateComboDAG("c1", combos), /Max combo nesting depth/);
});

test("handleComboChat priority strategy defaults to first model and records success metrics", async () => {
  const calls: any[] = [];
  const combo = {
    name: "priority-default",
    models: ["openai/gpt-4o-mini", "claude/sonnet"],
  };

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  const metrics = getComboMetrics("priority-default");
  const firstStep = normalizeComboStep(combo.models[0], {
    comboName: combo.name,
    index: 0,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
  assert.equal(metrics.totalRequests, 1);
  assert.equal(metrics.totalSuccesses, 1);
  assert.equal(metrics.byModel["openai/gpt-4o-mini"].requests, 1);
  assert.equal(metrics.byTarget[firstStep.id].requests, 1);
  assert.equal(metrics.byTarget[firstStep.id].model, "openai/gpt-4o-mini");
  assert.equal(metrics.strategy, "priority");
});

test("handleComboChat runs shadow targets without changing the primary response or metrics", async () => {
  const calls: any[] = [];
  const shadowRequests: any[] = [];
  const combo = {
    name: "shadow-routing-priority",
    models: ["openai/gpt-4o-mini"],
    config: {
      shadowRouting: {
        enabled: true,
        targets: [
          {
            kind: "model",
            id: "shadow-anthropic",
            providerId: "anthropic",
            model: "anthropic/claude-3-haiku",
            label: "Dark launch target",
          },
        ],
        sampleRate: 1,
        maxTargets: 1,
      },
    },
  };

  const result = await handleComboChat({
    body: { stream: true },
    combo,
    handleSingleModel: async (body: any, modelStr: any, target?: any) => {
      calls.push({
        modelStr,
        trafficType: target?.trafficType ?? "production",
        stream: body.stream,
      });
      if (target?.trafficType === "shadow") {
        shadowRequests.push({
          executionKey: target.executionKey,
          hasBodyMarker: body._omnirouteShadowRouting === true,
        });
      }
      if (target?.trafficType === "shadow") return errorResponse(503, "shadow failed");
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  await waitForBackgroundWork();

  const metrics = getComboMetrics("shadow-routing-priority");

  assert.equal(result.ok, true);
  calls.sort((a, b) => a.trafficType.localeCompare(b.trafficType));
  assert.deepEqual(calls, [
    { modelStr: "openai/gpt-4o-mini", trafficType: "production", stream: true },
    { modelStr: "anthropic/claude-3-haiku", trafficType: "shadow", stream: false },
  ]);
  assert.deepEqual(shadowRequests, [
    { executionKey: "shadow>shadow-anthropic", hasBodyMarker: false },
  ]);
  assert.equal(metrics.totalRequests, 1);
  assert.equal(metrics.totalSuccesses, 1);
  assert.equal(metrics.byModel["openai/gpt-4o-mini"].requests, 1);
  assert.equal(metrics.byModel["anthropic/claude-3-haiku"], undefined);
  assert.equal(metrics.shadow.totalRequests, 1);
  assert.equal(metrics.shadow.totalFailures, 1);
  assert.equal(metrics.shadow.byModel["anthropic/claude-3-haiku"].requests, 1);
});

test("handleComboChat isolates nested shadow request bodies", async () => {
  type MutableChatBody = { messages: Array<{ role: string; content: string }>; stream: boolean };

  const shadowMessages: string[] = [];
  const body = { messages: [{ role: "user", content: "original" }], stream: true };
  const combo = {
    name: "shadow-routing-isolation",
    models: ["openai/gpt-4o-mini"],
    config: {
      shadowRouting: {
        enabled: true,
        targets: ["anthropic/claude-3-haiku"],
        sampleRate: 1,
      },
    },
  };

  const result = await handleComboChat({
    body,
    combo,
    handleSingleModel: async (
      requestBody: MutableChatBody,
      _modelStr: unknown,
      target?: unknown
    ) => {
      const trafficType =
        target && typeof target === "object" && "trafficType" in target
          ? (target as { trafficType?: unknown }).trafficType
          : null;
      if (trafficType === "shadow") {
        shadowMessages.push(requestBody.messages[0].content);
        return okResponse();
      }
      requestBody.messages[0].content = "mutated by production";
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  await waitForBackgroundWork();

  assert.equal(result.ok, true);
  assert.deepEqual(shadowMessages, ["original"]);
});

test("handleComboChat honors shadow sampleRate zero", async () => {
  const calls: any[] = [];
  const combo = {
    name: "shadow-routing-sampled-out",
    models: ["openai/gpt-4o-mini"],
    config: {
      shadowRouting: {
        enabled: true,
        targets: ["anthropic/claude-3-haiku"],
        sampleRate: 0,
      },
    },
  };

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body: any, modelStr: any, target?: any) => {
      calls.push({ modelStr, trafficType: target?.trafficType ?? "production" });
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  await waitForBackgroundWork();

  const metrics = getComboMetrics("shadow-routing-sampled-out");

  assert.equal(result.ok, true);
  assert.deepEqual(calls, [{ modelStr: "openai/gpt-4o-mini", trafficType: "production" }]);
  assert.equal(metrics.totalRequests, 1);
  assert.equal(metrics.shadow.totalRequests, 0);
});

test("handleComboChat priority strategy honors composite tier order before fallback", async () => {
  const calls: any[] = [];
  const combo = {
    name: "priority-composite-tiers",
    strategy: "priority",
    models: [
      {
        kind: "model",
        id: "step-primary",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
      },
      {
        kind: "model",
        id: "step-backup",
        providerId: "anthropic",
        model: "claude/sonnet",
      },
      {
        kind: "model",
        id: "step-last",
        providerId: "google",
        model: "gemini/gemini-2.5-flash",
      },
    ],
    config: {
      maxRetries: 0,
      compositeTiers: {
        defaultTier: "backup",
        tiers: {
          backup: {
            stepId: "step-backup",
            fallbackTier: "primary",
          },
          primary: {
            stepId: "step-primary",
          },
        },
      },
    },
  };

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "claude/sonnet") {
        return errorResponse(503, "backup failed");
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["claude/sonnet", "openai/gpt-4o-mini"]);
});

test("handleComboChat weighted strategy selects by weight and falls back in descending weight order", async () => {
  const calls: any[] = [];

  _setSecureRandomFloatSource(() => 0.95);

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "weighted-selection",
        strategy: "weighted",
        models: [
          { model: "openai/gpt-4o-mini", weight: 1 },
          { model: "claude/sonnet", weight: 9 },
        ],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        if (modelStr === "claude/sonnet") return errorResponse(500, "temporary");
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["claude/sonnet", "openai/gpt-4o-mini"]);
  } finally {
    _setSecureRandomFloatSource(null);
  }
});

test("handleComboChat weighted strategy falls back to uniform random when all weights are zero", async () => {
  const calls: any[] = [];
  _setSecureRandomFloatSource(() => 0.75);

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "weighted-zero-fallback",
        strategy: "weighted",
        models: [
          { model: "model-a", weight: 0 },
          { model: "model-b", weight: 0 },
        ],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["model-b"]);
  } finally {
    _setSecureRandomFloatSource(null);
  }
});

test("handleComboChat random strategy uses shuffled model order", async () => {
  const calls: any[] = [];
  const sequence = [0.99, 0.0];
  let idx = 0;
  _setSecureRandomFloatSource(() => sequence[idx++] ?? 0);

  try {
    await handleComboChat({
      body: {},
      combo: {
        name: "random-order",
        strategy: "random",
        models: ["model-a", "model-b", "model-c"],
      },
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(calls.length, 1);
    assert.notEqual(calls[0], "model-a");
  } finally {
    _setSecureRandomFloatSource(null);
  }
});

test("handleComboChat fill-first explicitly preserves priority order", async () => {
  const calls: any[] = [];

  await handleComboChat({
    body: {},
    combo: {
      name: "fill-first-order",
      strategy: "fill-first",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.deepEqual(calls, ["model-a"]);
});

test("handleComboChat p2c selects the better of two random choices by metrics", async () => {
  const calls: any[] = [];
  const sequence = [0.0, 0.0];
  let idx = 0;

  recordComboRequest("p2c-combo", "model-a", {
    success: true,
    latencyMs: 2000,
    strategy: "p2c",
  });
  recordComboRequest("p2c-combo", "model-b", {
    success: true,
    latencyMs: 20,
    strategy: "p2c",
  });
  _setSecureRandomFloatSource(() => sequence[idx++] ?? 0);

  try {
    await handleComboChat({
      body: {},
      combo: {
        name: "p2c-combo",
        strategy: "p2c",
        models: ["model-a", "model-b", "model-c"],
      },
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.deepEqual(calls, ["model-b"]);
  } finally {
    _setSecureRandomFloatSource(null);
  }
});

test("handleComboChat least-used strategy prefers the model with fewer recorded requests", async () => {
  recordComboRequest("least-used-combo", "model-a", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });
  recordComboRequest("least-used-combo", "model-a", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });
  recordComboRequest("least-used-combo", "model-b", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });

  const calls: any[] = [];

  await handleComboChat({
    body: {},
    combo: {
      name: "least-used-combo",
      strategy: "least-used",
      models: ["model-a", "model-b", "model-c"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(calls[0], "model-c");
});

test("handleComboChat skips unavailable models and falls through to the next active target", async () => {
  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "availability-skip",
      strategy: "priority",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async (modelStr) => modelStr !== "model-a",
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-b"]);
});

test("handleComboChat falls through empty successful responses and records failure metrics before succeeding", async () => {
  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "quality-fallback",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return okResponse({ choices: [{ message: { content: "" } }] });
      }
      return okResponse({ choices: [{ message: { content: "fallback ok" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const metrics = getComboMetrics("quality-fallback");

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b"]);
  assert.equal(metrics.totalRequests, 2);
  assert.equal(metrics.totalFailures, 1);
  assert.equal(metrics.totalSuccesses, 1);
  assert.equal(metrics.byModel["model-a"].lastStatus, "error");
  assert.equal(metrics.byModel["model-b"].lastStatus, "ok");
});

test("handleComboChat records per-target metrics separately when the same model repeats with different accounts", async () => {
  const calls: any[] = [];
  const combo = {
    name: "per-target-repeat",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "conn-openai-a",
        label: "Account A",
      },
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "conn-openai-b",
        label: "Account B",
      },
    ],
    config: { maxRetries: 0 },
  };

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body: any, modelStr: any, target: any) => {
      calls.push(`${modelStr}:${target?.connectionId || "none"}`);
      if (target?.connectionId === "conn-openai-a") {
        return errorResponse(503, "account-a down");
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const firstStep = normalizeComboStep(combo.models[0], {
    comboName: combo.name,
    index: 0,
  });
  const secondStep = normalizeComboStep(combo.models[1], {
    comboName: combo.name,
    index: 1,
  });
  const metrics = getComboMetrics(combo.name);

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini:conn-openai-a", "openai/gpt-4o-mini:conn-openai-b"]);
  assert.equal(metrics.byModel["openai/gpt-4o-mini"].requests, 2);
  assert.equal(metrics.byTarget[firstStep.id].failures, 1);
  assert.equal(metrics.byTarget[firstStep.id].connectionId, "conn-openai-a");
  assert.equal(metrics.byTarget[secondStep.id].successes, 1);
  assert.equal(metrics.byTarget[secondStep.id].connectionId, "conn-openai-b");
});

test("handleComboChat preserves the first failure status but surfaces the last error message", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "all-fail",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      return errorResponse(modelStr === "model-a" ? 500 : 429, `fail:${modelStr}`);
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 500);
  assert.equal(payload.error.message, "fail:model-b");
});

test("handleComboChat round-robin rotates sequentially across requests", async () => {
  const calls: any[] = [];
  const combo = {
    name: "rr-sequence",
    strategy: "round-robin",
    models: ["model-a", "model-b"],
    config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
  };

  for (let i = 0; i < 3; i++) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(result.ok, true);
  }

  assert.deepEqual(calls, ["model-a", "model-b", "model-a"]);
});

test("handleComboChat round-robin starts from composite tier default ordering", async () => {
  const calls: any[] = [];
  const combo = {
    name: "rr-composite-order",
    strategy: "round-robin",
    models: [
      {
        kind: "model",
        id: "step-primary",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
      },
      {
        kind: "model",
        id: "step-backup",
        providerId: "anthropic",
        model: "claude/sonnet",
      },
    ],
    config: {
      maxRetries: 0,
      concurrencyPerModel: 1,
      queueTimeoutMs: 1000,
      compositeTiers: {
        defaultTier: "backup",
        tiers: {
          backup: {
            stepId: "step-backup",
            fallbackTier: "primary",
          },
          primary: {
            stepId: "step-primary",
          },
        },
      },
    },
  };

  for (let i = 0; i < 2; i++) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(result.ok, true);
  }

  assert.deepEqual(calls, ["claude/sonnet", "openai/gpt-4o-mini"]);
});

test("combo helpers short-circuit safely for missing combos, cycles, and excessive depth", () => {
  assert.equal(getComboFromData("missing", null), null);
  assert.equal(getComboModelsFromData("missing", { combos: [] }), null);

  assert.doesNotThrow(() =>
    validateComboDAG("ghost", {
      combos: [{ name: "alpha", models: ["openai/gpt-4o-mini"] }],
    })
  );
  assert.doesNotThrow(() => validateComboDAG("empty", [{ name: "empty" }]));

  assert.deepEqual(
    resolveNestedComboModels(
      { name: "loop", models: ["model-a", "model-b"] },
      [],
      new Set(["loop"])
    ),
    []
  );

  assert.deepEqual(
    resolveNestedComboModels(
      { name: "deep", models: ["model-a", { model: "model-b", weight: 2 }] },
      [],
      new Set(),
      99
    ),
    ["model-a", "model-b"]
  );
});

test("handleComboChat accepts binary and Responses-style 200 bodies but falls through malformed success payloads", async () => {
  const binaryResult = await handleComboChat({
    body: {},
    combo: {
      name: "quality-binary",
      strategy: "priority",
      models: ["model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      new Response("binary-payload", {
        status: 200,
        headers: { "content-type": "application/octet-stream" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(binaryResult.ok, true);
  assert.equal(await binaryResult.text(), "binary-payload");

  const responsesResult = await handleComboChat({
    body: {},
    combo: {
      name: "quality-responses",
      strategy: "priority",
      models: ["model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      okResponse({
        output: [{ type: "output_text", text: "done" }],
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(responsesResult.ok, true);

  const calls: any[] = [];
  const malformedResult = await handleComboChat({
    body: {},
    combo: {
      name: "quality-malformed",
      strategy: "priority",
      models: ["model-a", "model-b", "model-c"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response("", {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      if (modelStr === "model-b") {
        return okResponse({ choices: [{}] });
      }
      return okResponse({ choices: [{ message: { content: "recovered" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(malformedResult.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b", "model-c"]);
});

test("handleComboChat accepts text-mode SSE payloads as valid non-streaming passthrough responses", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "quality-sse-data",
      strategy: "priority",
      models: ["model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      new Response('data: {"choices":[{"delta":{"content":"hello"}}]}\n\n', {
        status: 200,
        headers: { "content-type": "text/plain" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.match(await result.text(), /^data:/);
});

test("handleComboChat falls through invalid JSON and embedded 200 error bodies before succeeding", async () => {
  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "quality-invalid-json-and-error",
      strategy: "priority",
      models: ["model-a", "model-b", "model-c"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response("{bad-json", {
          status: 200,
          headers: { "content-type": "text/plain" },
        });
      }
      if (modelStr === "model-b") {
        return new Response(JSON.stringify({ error: { message: "embedded upstream failure" } }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse({ choices: [{ delta: { content: "recovered" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b", "model-c"]);
});

test("handleComboChat returns the earliest retry-after when all priority targets are rate-limited", async () => {
  const soon = new Date(Date.now() + 1_000).toISOString();
  const later = new Date(Date.now() + 5_000).toISOString();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-retry-after",
      strategy: "priority",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) =>
      new Response(
        JSON.stringify({
          error: { message: `limited:${modelStr}` },
          retryAfter: modelStr === "model-a" ? later : soon,
        }),
        {
          status: 429,
          headers: { "content-type": "application/json" },
        }
      ),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: { maxRetries: 0, retryDelayMs: 1 },
    },
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 429);
  assert.match(payload.error.message, /limited:model-b/);
  assert.ok(Number(result.headers.get("Retry-After")) >= 1);
});

test("handleComboChat returns 404 model_not_found when a combo has no executable targets", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "empty-priority",
      strategy: "priority",
      models: [],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run for empty combos");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 404);
  assert.equal(payload.error.code, "model_not_found");
  assert.match(payload.error.message, /Combo has no executable targets/);
});

test("handleComboChat round-robin returns 404 when no models are configured", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-empty",
      strategy: "round-robin",
      models: [],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run for empty round-robin combos");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 404);
  assert.equal(payload.error.code, "model_not_found");
  assert.match(payload.error.message, /Round-robin combo has no executable targets/);
});

test("handleComboChat round-robin falls through semaphore timeouts and malformed success payloads", async () => {
  const release = await acquireSemaphore(
    getComboTargetExecutionKey("rr-timeout-fallback", 0, "model-a"),
    {
      maxConcurrency: 1,
      timeoutMs: 100,
    }
  );
  const calls: any[] = [];

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "rr-timeout-fallback",
        strategy: "round-robin",
        models: ["model-a", "model-b", "model-c"],
      },
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        if (modelStr === "model-b") {
          return okResponse({ choices: [{}] });
        }
        return okResponse({ choices: [{ message: { content: "rr ok" } }] });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: {
        comboDefaults: {
          concurrencyPerModel: 1,
          queueTimeoutMs: 5,
          maxRetries: 0,
          retryDelayMs: 1,
        },
      },
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["model-b", "model-c"]);
  } finally {
    release();
  }
});

test("handleComboChat round-robin surfaces retry-after metadata after exhausting all models", async () => {
  const sooner = new Date(Date.now() + 1_500).toISOString();
  const later = new Date(Date.now() + 7_000).toISOString();

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-retry-after",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) =>
      new Response(
        JSON.stringify({
          error: { message: `rr-limited:${modelStr}` },
          retryAfter: modelStr === "model-a" ? later : sooner,
        }),
        {
          status: 429,
          headers: { "content-type": "application/json" },
        }
      ),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 429);
  assert.match(payload.error.message, /rr-limited:model-b/);
  assert.ok(Number(result.headers.get("Retry-After")) >= 1);
});

test("handleComboChat falls through generic 400s when a later priority target succeeds", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "priority-generic-400-recover",
      strategy: "priority",
      models: ["provider-a/model-a", "provider-b/model-b"],
      config: { maxRetries: 0, retryDelayMs: 1 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "provider-a/model-a") {
        return new Response(JSON.stringify({ error: { message: "Instructions are required" } }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse({ choices: [{ message: { content: "recovered" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.status, 200);
  assert.equal(payload.choices[0].message.content, "recovered");
  assert.deepEqual(calls, ["provider-a/model-a", "provider-b/model-b"]);
});

test("handleComboChat preserves fallback request bodies when zero-latency optimizations are disabled", async () => {
  const longToolOutput = "x".repeat(2500);
  let fallbackBody: any = null;

  const result = await handleComboChat({
    body: {
      messages: [
        { role: "user", content: "please inspect this output" },
        { role: "tool", content: longToolOutput },
      ],
    },
    combo: {
      name: "zero-latency-disabled-preserves-body",
      strategy: "priority",
      models: ["provider-a/model-a", "provider-b/model-b"],
      config: {
        maxRetries: 0,
        retryDelayMs: 1,
        fallbackCompressionMode: "lite",
        fallbackCompressionThreshold: 1,
      },
    },
    handleSingleModel: async (requestBody: any, modelStr: any) => {
      if (modelStr === "provider-a/model-a") {
        return errorResponse(500, "first target failed");
      }
      fallbackBody = requestBody;
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.equal(fallbackBody.messages[1].content, longToolOutput);
});

test("handleComboChat applies fallback compression only after explicit zero-latency opt-in", async () => {
  const longToolOutput = "x".repeat(2500);
  let fallbackBody: any = null;

  const result = await handleComboChat({
    body: {
      messages: [
        { role: "user", content: "please inspect this output" },
        { role: "tool", content: longToolOutput },
      ],
    },
    combo: {
      name: "zero-latency-enabled-compresses-fallback",
      strategy: "priority",
      models: ["provider-a/model-a", "provider-b/model-b"],
      config: {
        maxRetries: 0,
        retryDelayMs: 1,
        zeroLatencyOptimizationsEnabled: true,
        fallbackCompressionMode: "lite",
        fallbackCompressionThreshold: 1,
      },
    },
    handleSingleModel: async (requestBody: any, modelStr: any) => {
      if (modelStr === "provider-a/model-a") {
        return errorResponse(500, "first target failed");
      }
      fallbackBody = requestBody;
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  const fallbackToolContent = fallbackBody.messages[1].content;
  assert.equal(typeof fallbackToolContent, "string");
  assert.ok(fallbackToolContent.length < longToolOutput.length);
  assert.match(fallbackToolContent, /truncated/i);
});

test("handleComboChat suppresses hedging unless zero-latency optimizations are enabled", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "hedging-disabled-with-subfeature-set",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: {
        maxRetries: 0,
        retryDelayMs: 1,
        hedging: true,
        hedgeDelayMs: 1,
      },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      await new Promise((resolve) => setTimeout(resolve, 20));
      return okResponse({ choices: [{ message: { content: modelStr } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 200);
  assert.equal(payload.choices[0].message.content, "model-a");
  assert.deepEqual(calls, ["model-a"]);
});

test("handleComboChat starts hedged fallback only after explicit zero-latency opt-in", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "hedging-enabled-with-zero-latency",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: {
        maxRetries: 0,
        retryDelayMs: 1,
        zeroLatencyOptimizationsEnabled: true,
        hedging: true,
        hedgeDelayMs: 1,
      },
    },
    handleSingleModel: async (_body: any, modelStr: any, target: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, 100);
          target?.modelAbortSignal?.addEventListener(
            "abort",
            () => {
              clearTimeout(timer);
              resolve(undefined);
            },
            { once: true }
          );
        });
        return okResponse({ choices: [{ message: { content: "slow" } }] });
      }
      return okResponse({ choices: [{ message: { content: "fast" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;

  assert.equal(result.status, 200);
  assert.equal(payload.choices[0].message.content, "fast");
  assert.deepEqual(calls, ["model-a", "model-b"]);
});

test("handleComboChat round-robin falls through generic 400s when a later model succeeds", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-generic-400-recover",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response(JSON.stringify({ error: { message: "generic bad request" } }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.deepEqual(calls, ["model-a", "model-b"]);
});

test("handleComboChat round-robin falls through 400s and returns the final error payload when no target recovers", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-provider-scoped-400-fallback",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response(
          JSON.stringify({ error: { message: "unsupported message role for this provider" } }),
          {
            status: 400,
            headers: { "content-type": "application/json" },
          }
        );
      }
      return errorResponse(500, "rr-final-fail");
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.status, 400);
  assert.equal(payload.error.message, "rr-final-fail");
  assert.deepEqual(calls, ["model-a", "model-b"]);
});

test("handleComboChat strict-random uses the shared deck without repeating within a cycle", async () => {
  const calls: any[] = [];
  const combo = {
    name: "strict-random-deck",
    strategy: "strict-random",
    models: ["model-a", "model-b", "model-c"],
  };

  for (let i = 0; i < 3; i++) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: null,
    });

    assert.equal(result.ok, true);
  }

  assert.equal(new Set(calls).size, 3);
});

test("handleComboChat cost-optimized orders models by the cheapest configured input price", async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 5, output: 10 },
      "gpt-4o": { input: 1, output: 2 },
      "gpt-4o-nano": { input: 0.1, output: 0.2 },
    },
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "cost-optimized-combo",
      strategy: "cost-optimized",
      models: ["openai/gpt-4o-mini", "openai/gpt-4o", "openai/gpt-4o-nano"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "openai/gpt-4o-nano");
});

test("handleComboChat weighted strategy resolves nested combos before falling back to the next weighted target", async () => {
  const calls: any[] = [];
  _setSecureRandomFloatSource(() => 0.01);

  try {
    const result = await handleComboChat({
      body: {},
      combo: {
        name: "weighted-nested-selection",
        strategy: "weighted",
        models: [
          { model: "nested-priority", weight: 9 },
          { model: "model-c", weight: 1 },
        ],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body: any, modelStr: any) => {
        calls.push(modelStr);
        if (modelStr === "model-a") return errorResponse(500, "nested-first-fail");
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      relayOptions: null as any,
      allCombos: [
        {
          name: "weighted-nested-selection",
          models: [
            { model: "nested-priority", weight: 9 },
            { model: "model-c", weight: 1 },
          ],
        },
        { name: "nested-priority", models: ["model-a", "model-b"] },
      ],
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["model-a", "model-b"]);
  } finally {
    _setSecureRandomFloatSource(null);
  }
});

test("handleComboChat context-optimized orders models by the largest synced context window", async () => {
  saveModelsDevCapabilities({
    openai: {
      "gpt-4o-mini": capabilityEntry(128000),
      "gpt-4o": capabilityEntry(64000),
      "gpt-4o-max": capabilityEntry(256000),
    },
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "context-optimized-combo",
      strategy: "context-optimized",
      models: ["openai/gpt-4o-mini", "openai/gpt-4o", "openai/gpt-4o-max"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "openai/gpt-4o-max");
});

test("handleComboChat context-optimized preserves order when all context limits are unknown", async () => {
  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "context-optimized-unknown",
      strategy: "context-optimized",
      models: ["unknown/model-a", "unknown/model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["unknown/model-a"]);
});

test("handleComboChat skips fallback targets with too small context windows", async () => {
  saveModelsDevCapabilities({
    openai: {
      "tiny-context": capabilityEntry(32),
      "large-context": capabilityEntry(4096),
    },
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "x".repeat(800) }],
    },
    combo: {
      name: "context-aware-fallback-context",
      strategy: "priority",
      models: ["openai/tiny-context", "openai/large-context"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/large-context"]);
});

test("handleComboChat skips tool, vision, and structured-output incompatible fallbacks", async () => {
  saveModelsDevCapabilities({
    openai: {
      "no-tools": capabilityEntry(128000, {
        tool_call: false,
        attachment: true,
        structured_output: true,
        modalities_input: JSON.stringify(["text", "image"]),
      }),
      "no-vision": capabilityEntry(128000, {
        tool_call: true,
        attachment: false,
        structured_output: true,
        modalities_input: JSON.stringify(["text"]),
      }),
      "no-json": capabilityEntry(128000, {
        tool_call: true,
        attachment: true,
        structured_output: false,
        modalities_input: JSON.stringify(["text", "image"]),
      }),
      compatible: capabilityEntry(128000, {
        tool_call: true,
        attachment: true,
        structured_output: true,
        modalities_input: JSON.stringify(["text", "image"]),
      }),
    },
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image and return JSON." },
            { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
          ],
        },
      ],
      tools: [{ type: "function", function: { name: "save", parameters: {} } }],
      response_format: { type: "json_schema", json_schema: { name: "result", schema: {} } },
    },
    combo: {
      name: "context-aware-fallback-capabilities",
      strategy: "priority",
      models: ["openai/no-tools", "openai/no-vision", "openai/no-json", "openai/compatible"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/compatible"]);
});

test("handleComboChat preserves strategy order when context-aware filtering rejects all targets", async () => {
  saveModelsDevCapabilities({
    openai: {
      "no-tools-a": capabilityEntry(128000, { tool_call: false }),
      "no-tools-b": capabilityEntry(128000, { tool_call: false }),
    },
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Use a tool." }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    combo: {
      name: "context-aware-fallback-full-filter",
      strategy: "priority",
      models: ["openai/no-tools-a", "openai/no-tools-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/no-tools-a"]);
});

test("handleComboChat eval-driven routing prioritizes higher scoring evaluated targets", async () => {
  evalsDb.saveEvalRun({
    suiteId: "routing-quality",
    suiteName: "Routing Quality",
    target: { type: "model", id: "openai/eval-low", label: "Model: openai/eval-low" },
    summary: { total: 10, passed: 4, failed: 6, passRate: 40 },
    avgLatencyMs: 100,
    results: [],
    createdAt: new Date().toISOString(),
  });
  evalsDb.saveEvalRun({
    suiteId: "routing-quality",
    suiteName: "Routing Quality",
    target: { type: "model", id: "openai/eval-high", label: "Model: openai/eval-high" },
    summary: { total: 10, passed: 9, failed: 1, passRate: 90 },
    avgLatencyMs: 120,
    results: [],
    createdAt: new Date().toISOString(),
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "eval-driven-priority",
      strategy: "priority",
      models: ["openai/eval-low", "openai/eval-high"],
      config: {
        evalRouting: {
          enabled: true,
          suiteIds: ["routing-quality"],
          qualityWeight: 1,
          latencyWeight: 0,
        },
      },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/eval-high"]);
});

test("handleComboChat eval-driven routing ignores stale and undersized eval runs", async () => {
  evalsDb.saveEvalRun({
    suiteId: "routing-quality",
    suiteName: "Routing Quality",
    target: { type: "model", id: "openai/stale-good", label: "Model: openai/stale-good" },
    summary: { total: 10, passed: 10, failed: 0, passRate: 100 },
    avgLatencyMs: 50,
    results: [],
    createdAt: "2020-01-01T00:00:00.000Z",
  });
  evalsDb.saveEvalRun({
    suiteId: "routing-quality",
    suiteName: "Routing Quality",
    target: { type: "model", id: "openai/small-good", label: "Model: openai/small-good" },
    summary: { total: 1, passed: 1, failed: 0, passRate: 100 },
    avgLatencyMs: 50,
    results: [],
    createdAt: new Date().toISOString(),
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "eval-driven-ignored-runs",
      strategy: "priority",
      models: ["openai/stale-good", "openai/small-good", "openai/no-evals"],
      config: {
        evalRouting: {
          enabled: true,
          suiteIds: ["routing-quality"],
          maxAgeHours: 24,
          minCases: 5,
          qualityWeight: 1,
          latencyWeight: 0,
        },
      },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/stale-good"]);
});

test("handleComboChat eval-driven routing can match bare model eval target ids", async () => {
  evalsDb.saveEvalRun({
    suiteId: "routing-quality",
    suiteName: "Routing Quality",
    target: { type: "model", id: "bare-high", label: "Model: bare-high" },
    summary: { total: 8, passed: 8, failed: 0, passRate: 100 },
    avgLatencyMs: 200,
    results: [],
    createdAt: new Date().toISOString(),
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "eval-driven-bare-model-id",
      strategy: "priority",
      models: ["openai/bare-low", "openai/bare-high"],
      config: {
        evalRouting: {
          enabled: true,
          suiteIds: ["routing-quality"],
          qualityWeight: 1,
          latencyWeight: 0,
        },
      },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/bare-high"]);
});

test("handleComboChat normalizes legacy strategy names at runtime", async () => {
  const usageCalls: any[] = [];
  recordComboRequest("legacy-usage-combo", "model-a", {
    success: true,
    latencyMs: 100,
    strategy: "least-used",
  });

  await handleComboChat({
    body: {},
    combo: {
      name: "legacy-usage-combo",
      strategy: "usage",
      models: ["model-a", "model-b"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      usageCalls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.deepEqual(usageCalls, ["model-b"]);
});

test("handleComboChat returns a 503 when every model is unavailable before execution", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "inactive-accounts",
      strategy: "priority",
      models: ["openai/model-a", "openai/model-b"],
    },
    handleSingleModel: async () => {
      throw new Error("handleSingleModel should not run when all models are inactive");
    },
    isModelAvailable: async () => false,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.status, 503);
  assert.equal(payload.error.code, "ALL_ACCOUNTS_INACTIVE");
});

test("handleComboChat treats provider circuit breaker responses as ordinary target failures", async () => {
  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "provider-breaker-open",
      strategy: "priority",
      models: ["openai/model-a", "openai/model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "openai/model-a") {
        return providerBreakerOpenResponse();
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/model-a", "openai/model-b"]);
});

test("handleComboChat auto strategy honors LKGP after filtering to tool-capable models", async () => {
  await settingsDb.setLKGP("auto-lkgp", "auto-lkgp", "claude");

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Write code using a tool" }],
      tools: [{ type: "function", function: { name: "lookup_weather" } }],
    },
    combo: {
      id: "auto-lkgp",
      name: "auto-lkgp",
      strategy: "auto",
      models: ["openai/gpt-oss-120b", "openai/gpt-4o-mini", "claude/claude-sonnet-4-6"],
      autoConfig: { routerStrategy: "lkgp" },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "claude/claude-sonnet-4-6");
});

test("handleComboChat auto strategy preserves selected same-provider connection identity", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI A",
    apiKey: "sk-auto-conn-a",
    defaultModel: "gpt-4o-mini",
  });
  const connB = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI B",
    apiKey: "sk-auto-conn-b",
    defaultModel: "gpt-4o-mini",
  });
  touchSession("sticky-auto-session", connB.id);

  const calls: Array<{ modelStr: string; connectionId: string | null | undefined }> = [];
  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "Continue the existing conversation" }] },
    combo: {
      id: "auto-same-provider-connection",
      name: "auto-same-provider-connection",
      strategy: "auto",
      models: [
        {
          kind: "model",
          providerId: "openai",
          model: "openai/gpt-4o-mini",
          connectionId: connA.id,
          label: "OpenAI A",
        },
        {
          kind: "model",
          providerId: "openai",
          model: "openai/gpt-4o-mini",
          connectionId: connB.id,
          label: "OpenAI B",
        },
      ],
      autoConfig: {
        candidatePool: ["openai"],
        explorationRate: 0,
        weights: {
          quota: 0,
          health: 0,
          costInv: 0,
          latencyInv: 0,
          taskFit: 0,
          stability: 0,
          tierPriority: 0,
          tierAffinity: 0,
          specificityMatch: 0,
          contextAffinity: 1,
          resetWindowAffinity: 0,
          connectionDensity: 0,
        },
      },
    },
    handleSingleModel: async (_body: any, modelStr: any, target: any) => {
      calls.push({ modelStr, connectionId: target?.connectionId });
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: { sessionId: "sticky-auto-session" } as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls.length, 1, "successful auto dispatch should call exactly one selected target");
  assert.deepEqual(calls, [
    {
      modelStr: "openai/gpt-4o-mini",
      connectionId: connB.id,
    },
  ]);
});

test("handleComboChat standalone lkgp strategy prioritizes the last known good provider", async () => {
  await settingsDb.setLKGP("standalone-lkgp", "standalone-lkgp", "anthropic");

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      id: "standalone-lkgp",
      name: "standalone-lkgp",
      strategy: "lkgp",
      models: ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "anthropic/claude-sonnet-4-6");
});

test("handleComboChat standalone lkgp strategy falls back to original order when no state exists", async () => {
  const calls: any[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      id: "standalone-lkgp-no-state",
      name: "standalone-lkgp-no-state",
      strategy: "lkgp",
      models: ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"],
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "openai/gpt-4o-mini");
});

test("handleComboChat standalone lkgp strategy updates LKGP after a successful call", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      id: "standalone-lkgp-save",
      name: "standalone-lkgp-save",
      strategy: "lkgp",
      models: ["openai/gpt-4o-mini"],
    },
    handleSingleModel: async () => okResponse(),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  // Give the async fire-and-forget LKGP update a chance to execute
  let persistedProvider: any = null;
  for (let i = 0; i < 20; i++) {
    persistedProvider = await settingsDb.getLKGP("standalone-lkgp-save", "standalone-lkgp-save");
    if (persistedProvider?.provider === "openai") {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  assert.equal(result.ok, true);
  // getLKGP now returns LKGPRecord | null — source: src/lib/db/settings.ts getLKGP()
  assert.equal(persistedProvider?.provider, "openai");
});

test("handleComboChat auto strategy falls back to the full pool when tool filtering empties candidates", async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-oss-120b": { input: 5, output: 10 },
    },
    deepseek: {
      reasoner: { input: 0.1, output: 0.2 },
    },
  });

  const calls: any[] = [];
  const result = await handleComboChat({
    body: {
      input: [{ role: "user", text: "Summarize this request" }],
      tools: [{ type: "function", function: { name: "unsupported_tool" } }],
    },
    combo: {
      name: "auto-cost-fallback",
      strategy: "auto",
      models: ["openai/gpt-oss-120b", "deepseek/reasoner"],
      autoConfig: { routerStrategy: "cost" },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      intentSimpleMaxWords: 5,
      intentExtraSimpleKeywords: "summarize, brief",
    },
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "deepseek/reasoner");
});

test("handleComboChat auto strategy falls back to rules when a custom router strategy throws", async () => {
  registerStrategy("throwing-test", {
    name: "throwing-test",
    description: "test strategy that always throws",
    select() {
      throw new Error("synthetic router failure");
    },
  });

  const log = createLog();
  const calls: any[] = [];
  const result = await handleComboChat({
    body: { prompt: "Hello there" },
    combo: {
      name: "auto-throwing-strategy",
      strategy: "auto",
      models: ["openai/gpt-4o-mini"],
      autoConfig: { routerStrategy: "throwing-test" },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
  assert.ok(
    log.entries.some(
      (entry) => entry.level === "warn" && /falling back to rules/i.test(String(entry.msg))
    )
  );
});

test("handleComboChat auto strategy reads strategyName from combo.config.auto and can prefer latency", async () => {
  const calls: any[] = [];
  const result = await handleComboChat({
    body: { prompt: "Just answer briefly" },
    combo: {
      name: "auto-latency-strategy-name",
      strategy: "auto",
      models: ["openai/gpt-4o-mini", "gemini/gemini-2.5-flash"],
      config: {
        auto: {
          strategyName: "latency",
        },
      },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "gemini/gemini-2.5-flash");
});

test("handleComboChat auto strategy can route by SLA targets", async () => {
  const calls: any[] = [];
  const log = createLog();
  const result = await handleComboChat({
    body: { prompt: "Keep this response fast and reliable" },
    combo: {
      name: "auto-sla-aware",
      strategy: "auto",
      models: ["openai/gpt-4o-mini", "gemini/gemini-2.5-flash", "claude/claude-sonnet-4-6"],
      autoConfig: {
        routerStrategy: "sla-aware",
        slaTargetP95Ms: 1500,
        slaMaxErrorRate: 0.05,
      },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[0], "gemini/gemini-2.5-flash");
  assert.ok(
    log.entries.some(
      (entry) => entry.level === "info" && /strategy=sla-aware/i.test(String(entry.msg))
    )
  );
});

test("handleComboChat context cache protection pins the model and tags tool-call responses", async () => {
  // PR #3399: <omniModel> tag extraction replaced by server-side session pinning.
  // combo uses priority order; the tag in the input message is stripped but no
  // longer drives routing. No <omniModel> tag is injected in responses.
  const calls: any[] = [];
  const result = await handleComboChat({
    body: {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "assistant",
          content: "cached\n<omniModel>claude/claude-sonnet-4-6</omniModel>",
        },
      ],
    },
    combo: {
      name: "context-cache-pinned",
      strategy: "priority",
      models: ["openai/gpt-4o-mini", "claude/claude-sonnet-4-6"],
      context_cache_protection: true,
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      return okResponse({
        choices: [
          {
            message: {
              role: "assistant",
              tool_calls: [
                {
                  id: "call_1",
                  type: "function",
                  function: { name: "lookup_weather", arguments: "{}" },
                },
              ],
            },
          },
        ],
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.ok, true);
  // Server-side pinning: routes via priority order, not the <omniModel> tag.
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
  // No <omniModel> tag injected into response content (replaced by session store).
  assert.ok(!payload.choices[0].message.content);
});

test("handleComboChat context cache protection does not inject omniModel tag in streamed output", async () => {
  // PR #3399: <omniModel> tag injection in stream output removed (server-side session pinning).
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "stream it" }] },
    combo: {
      name: "context-cache-stream",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      context_cache_protection: true,
    },
    handleSingleModel: async () =>
      streamResponse([
        'data: {"choices":[{"index":0,"delta":{"content":"hello world"},"finish_reason":null}]}\n\n',
        'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
        "data: [DONE]\n\n",
      ]),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const text = await result.text();
  assert.equal(result.ok, true);
  assert.match(text, /hello world/);
  assert.doesNotMatch(text, /<omniModel>/);
});

test("handleComboChat context cache protection does not inject tag for tool-call-only streams", async () => {
  // PR #3399: <omniModel> tag injection removed; tool-call streams pass through unmodified.
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "tool only" }] },
    combo: {
      name: "context-cache-tool-stream",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      context_cache_protection: true,
    },
    handleSingleModel: async () =>
      streamResponse([
        'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_1","type":"function","function":{"name":"lookup","arguments":"{}"}}]},"finish_reason":null}]}\n\n',
        'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n',
        "data: [DONE]\n\n",
      ]),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const text = await result.text();
  assert.equal(result.ok, true);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.doesNotMatch(text, /<omniModel>/);
});

test("handleComboChat context cache protection flushes cleanly when a stream ends without content", async () => {
  // PR #3399: no <omniModel> tag injected; empty stream passes through [DONE] unchanged.
  const result = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "empty stream" }] },
    combo: {
      name: "context-cache-empty-stream",
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
      context_cache_protection: true,
    },
    handleSingleModel: async () => streamResponse(["data: [DONE]\n\n"]),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const text = await result.text();
  assert.equal(result.ok, true);
  assert.match(text, /data: \[DONE\]/);
  assert.doesNotMatch(text, /<omniModel>/);
});

test("handleComboChat round-robin resolves nested combos and returns inactive when every target is skipped", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-nested-inactive",
      strategy: "round-robin",
      models: ["nested-combo"],
    },
    handleSingleModel: async () => {
      throw new Error("round-robin should not execute when all nested targets are inactive");
    },
    isModelAvailable: async () => false,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: [
      { name: "rr-nested-inactive", models: ["nested-combo"] },
      { name: "nested-combo", models: ["openai/model-a"] },
    ],
  });

  const payload = (await result.json()) as any;
  assert.equal(result.status, 503);
  assert.equal(payload.error.code, "ALL_ACCOUNTS_INACTIVE");
});

test("handleComboChat round-robin treats provider circuit breaker responses as ordinary target failures", async () => {
  const calls = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-provider-breaker-open",
      strategy: "round-robin",
      models: ["openai/model-a", "openai/model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "openai/model-a") {
        return providerBreakerOpenResponse();
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/model-a", "openai/model-b"]);
});

test("handleComboChat round-robin retries a transient failure on the same model before succeeding", async () => {
  const calls: any[] = [];
  let attempts = 0;

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-same-model-retry",
      strategy: "round-robin",
      models: ["model-a"],
      config: { maxRetries: 1, retryDelayMs: 1, concurrencyPerModel: 1, queueTimeoutMs: 5 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      attempts += 1;
      if (attempts === 1) return errorResponse(503, "try again");
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-a"]);
});

test("handleComboChat round-robin recovers from 400s when a later model succeeds", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-provider-400-recover",
      strategy: "round-robin",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0, retryDelayMs: 1, concurrencyPerModel: 1, queueTimeoutMs: 5 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-a") {
        return new Response(
          JSON.stringify({ error: { message: "unsupported message role for this provider" } }),
          {
            status: 400,
            headers: { "content-type": "application/json" },
          }
        );
      }
      return okResponse({ choices: [{ message: { content: "recovered" } }] });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b"]);
});

test("handleComboChat single-target quality failure returns explicit quality error instead of ALL_ACCOUNTS_INACTIVE", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "single-target-quality-failure",
      strategy: "priority",
      models: ["openai/model-a"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () =>
      new Response('{"choices":[{"message":{"content":"unterminated"}}', {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.status, 502);
  assert.match(payload.error.message, /quality validation/i);
  assert.notEqual(payload.error.code, "ALL_ACCOUNTS_INACTIVE");
});

test("handleComboChat round-robin single-target quality failure returns explicit quality error instead of ALL_ACCOUNTS_INACTIVE", async () => {
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-single-target-quality-failure",
      strategy: "round-robin",
      models: ["openai/model-a"],
      config: { maxRetries: 0, retryDelayMs: 1, concurrencyPerModel: 1, queueTimeoutMs: 5 },
    },
    handleSingleModel: async () =>
      new Response('{"choices":[{"message":{"content":"unterminated"}}', {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.status, 502);
  assert.match(payload.error.message, /quality validation/i);
  assert.notEqual(payload.error.code, "ALL_ACCOUNTS_INACTIVE");
});

test("handleComboChat falls back to next model when first model returns all-accounts-rate-limited 503", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "all-accounts-rate-limited-fallback",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "model-b") {
        return okResponse({ choices: [{ message: { content: "ok" } }] });
      }
      // Simulate handleNoCredentials returning a 503 with "unavailable" message
      // This is the signal emitted when getProviderCredentialsWithQuotaPreflight exhausts all accounts
      return new Response(
        JSON.stringify({ error: { message: `[provider/model] Service temporarily unavailable` } }),
        {
          status: 503,
          headers: { "content-type": "application/json" },
        }
      );
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  // First model returns 503 with "unavailable" → combo should try model-b next
  // If the fix is not applied, combo would abort here and return 503 immediately
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["model-a", "model-b"]);
  assert.equal(payload.choices[0].message.content, "ok");
});

test("handleComboChat round-robin falls back when all-accounts-rate-limited 503 is returned", async () => {
  const calls: any[] = [];

  // Use distinct provider prefixes so #1731 exhaustedProviders does not block model-b
  // (getTargetProvider("openai/model-a") → "openai"; getTargetProvider("anthropic/model-b") → "anthropic")
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "rr-all-accounts-rate-limited",
      strategy: "round-robin",
      models: ["openai/model-a", "anthropic/model-b"],
      config: { maxRetries: 0, retryDelayMs: 1, concurrencyPerModel: 1, queueTimeoutMs: 5 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      if (modelStr === "anthropic/model-b") {
        return okResponse({ choices: [{ message: { content: "ok" } }] });
      }
      // Simulate all accounts rate-limited — handleNoCredentials signal
      return new Response(
        JSON.stringify({ error: { message: `[provider/model] Service temporarily unavailable` } }),
        {
          status: 503,
          headers: { "content-type": "application/json" },
        }
      );
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/model-a", "anthropic/model-b"]);
  assert.equal(payload.choices[0].message.content, "ok");
});

test("handleComboChat aborts combo when 503 response does NOT contain the unavailable signal", async () => {
  const calls: any[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "503-no-signal-abort",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: any) => {
      calls.push(modelStr);
      // A generic 503 that is NOT an all-accounts-rate-limited signal
      // (missing "unavailable" in message or wrong content-type)
      return new Response(JSON.stringify({ error: { message: "Server error" } }), {
        status: 503,
        headers: { "content-type": "text/html" },
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null as any,
    allCombos: null,
  });

  const payload = (await result.json()) as any;
  // Without the fix, combo would abort (still 503). With the fix, it's still 503 because
  // the signal check filters out non-JSON or non-"unavailable" responses.
  assert.equal(result.status, 503);
  // Model-a was tried, it failed with 503, so it fell back to model-b, which also returned 503.
  assert.deepEqual(calls, ["model-a", "model-b"]);
  assert.ok(
    payload.error?.message?.includes("Server error") ||
      payload.error?.message?.includes("unavailable") ||
      result.status === 503
  );
});

test("#3587 reasoning model gets max_tokens buffer applied", async () => {
  saveModelsDevCapabilities({
    openai: {
      "gpt-4o-reasoning": capabilityEntry(12000, { reasoning: true, limit_output: 12000 }),
    },
  });

  const bodies: Array<Record<string, unknown>> = [];
  const result = await handleComboChat({
    body: { max_tokens: 4096 },
    combo: {
      name: "reasoning-buffer",
      models: ["openai/gpt-4o-reasoning"],
    },
    handleSingleModel: async (body: Record<string, unknown>) => {
      bodies.push(body);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(bodies.length, 1, "should have called handleSingleModel once");
  // 4096 * 1.5 = 6144; max(4096+1000, 6144) = 6144
  assert.equal(bodies[0].max_tokens, 6144, "max_tokens should be buffered for reasoning model");
});

test("#3587 reasoning buffer preserves max_tokens when the full buffer exceeds model cap", async () => {
  saveModelsDevCapabilities({
    openai: {
      "gemini-high-cap": capabilityEntry(65536, { reasoning: true, limit_output: 65536 }),
    },
  });

  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/gemini-high-cap", 64000),
    64000,
    "near-cap requests should not be inflated beyond the model's accepted range"
  );
  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/gemini-high-cap", "4096"),
    6144,
    "numeric string max_tokens should be normalized before applying a safe buffer"
  );
  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/gemini-high-cap", "not-a-number"),
    null,
    "non-numeric string max_tokens should not be changed"
  );
  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/gemini-high-cap", 70000),
    65536,
    "already over-cap max_tokens should be clamped to a known explicit cap"
  );

  const bodies: Array<Record<string, unknown>> = [];
  const result = await handleComboChat({
    body: { max_tokens: 64000 },
    combo: {
      name: "reasoning-buffer-near-cap",
      models: ["openai/gemini-high-cap"],
    },
    handleSingleModel: async (body: Record<string, unknown>) => {
      bodies.push(body);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(bodies.length, 1, "should have called handleSingleModel once");
  assert.equal(bodies[0].max_tokens, 64000, "max_tokens should remain within the cap");
});

test("#3587 reasoning buffer is disabled without explicit model capability data", async () => {
  assert.equal(
    resolveReasoningBufferedMaxTokens("missing-provider/unknown-reasoning-model", 100),
    null,
    "unknown models must not receive heuristic token inflation"
  );

  saveModelsDevCapabilities({
    openai: {
      "capless-reasoning": capabilityEntry(8192, {
        reasoning: true,
        limit_output: null,
      }),
      "default-cap-reasoning": capabilityEntry(8192, {
        reasoning: true,
        limit_output: 8192,
      }),
    },
  });

  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/capless-reasoning", 100),
    null,
    "reasoning metadata without an explicit output cap is not safe enough to inflate"
  );
  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/default-cap-reasoning", 300),
    1300,
    "explicit default-sized caps are treated as real capability data"
  );
});

test("#3588 reasoning token buffer feature flag preserves client max_tokens", async () => {
  saveModelsDevCapabilities({
    openai: {
      "flagged-reasoning": capabilityEntry(12000, { reasoning: true, limit_output: 12000 }),
    },
  });

  assert.equal(
    resolveReasoningBufferedMaxTokens("openai/flagged-reasoning", 4096, { enabled: false }),
    null,
    "disabled feature flag should skip reasoning token inflation"
  );

  const bodies: Array<Record<string, unknown>> = [];
  const result = await handleComboChat({
    body: { max_tokens: 4096 },
    combo: {
      name: "reasoning-buffer-disabled",
      models: ["openai/flagged-reasoning"],
    },
    handleSingleModel: async (body: Record<string, unknown>) => {
      bodies.push(body);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        reasoningTokenBufferEnabled: false,
      },
    },
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(bodies.length, 1, "should have called handleSingleModel once");
  assert.equal(bodies[0].max_tokens, 4096, "feature flag should preserve client max_tokens");
});

test("#3587 non-reasoning model does not get max_tokens buffer", async () => {
  saveModelsDevCapabilities({
    openai: {
      "gpt-4o-plain": capabilityEntry(4096, { reasoning: false }),
    },
  });

  const bodies: Array<Record<string, unknown>> = [];
  const result = await handleComboChat({
    body: { max_tokens: 4096 },
    combo: {
      name: "no-reasoning-buffer",
      models: ["openai/gpt-4o-plain"],
    },
    handleSingleModel: async (body: Record<string, unknown>) => {
      bodies.push(body);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(bodies.length, 1, "should have called handleSingleModel once");
  // Non-reasoning model: max_tokens should NOT be buffered
  assert.equal(
    bodies[0].max_tokens,
    4096,
    "max_tokens should remain unchanged for non-reasoning model"
  );
});

test("#3587 round-robin buffer does NOT compound across reasoning models", async () => {
  // Two reasoning models in a round-robin combo. The first fails (400) so the
  // loop falls through to the second. The buffer must be computed from the
  // ORIGINAL max_tokens for each attempt — never from an already-buffered value —
  // so both attempts see 6144 (4096 * 1.5), not [6144, 9216, ...]. Regression for
  // the shared-`body` mutation that compounded the buffer on every RR iteration.
  saveModelsDevCapabilities({
    openai: {
      "rr-reasoning-a": capabilityEntry(12000, { reasoning: true, limit_output: 12000 }),
      "rr-reasoning-b": capabilityEntry(12000, { reasoning: true, limit_output: 12000 }),
    },
  });

  const seen: Array<{ model: string; maxTokens: unknown }> = [];
  const result = await handleComboChat({
    body: { max_tokens: 4096 },
    combo: {
      name: "rr-reasoning-no-compound",
      strategy: "round-robin",
      models: ["openai/rr-reasoning-a", "openai/rr-reasoning-b"],
    },
    handleSingleModel: async (body: Record<string, unknown>, modelStr: string) => {
      seen.push({ model: modelStr, maxTokens: body.max_tokens });
      if (modelStr === "openai/rr-reasoning-a") {
        return new Response(JSON.stringify({ error: { message: "transient" } }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.equal(seen.length, 2, "both reasoning models should have been attempted");
  // Each attempt buffers from the original 4096 → 6144. No compounding.
  assert.equal(seen[0].maxTokens, 6144, "first reasoning model buffered from original");
  assert.equal(
    seen[1].maxTokens,
    6144,
    "second reasoning model must ALSO buffer from original 4096, not 6144"
  );
});

test("#3588 round-robin honors disabled reasoning token buffer feature flag", async () => {
  saveModelsDevCapabilities({
    openai: {
      "rr-flagged-a": capabilityEntry(12000, { reasoning: true, limit_output: 12000 }),
      "rr-flagged-b": capabilityEntry(12000, { reasoning: true, limit_output: 12000 }),
    },
  });

  const seen: Array<{ model: string; maxTokens: unknown }> = [];
  const result = await handleComboChat({
    body: { max_tokens: 4096 },
    combo: {
      name: "rr-reasoning-buffer-disabled",
      strategy: "round-robin",
      models: ["openai/rr-flagged-a", "openai/rr-flagged-b"],
    },
    handleSingleModel: async (body: Record<string, unknown>, modelStr: string) => {
      seen.push({ model: modelStr, maxTokens: body.max_tokens });
      if (modelStr === "openai/rr-flagged-a") {
        return new Response(JSON.stringify({ error: { message: "transient" } }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
        reasoningTokenBufferEnabled: false,
      },
    },
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.equal(seen.length, 2, "both reasoning models should have been attempted");
  assert.equal(seen[0].maxTokens, 4096, "first model should preserve client max_tokens");
  assert.equal(seen[1].maxTokens, 4096, "second model should preserve client max_tokens");
});

test("#3587 round-robin keeps near-cap reasoning max_tokens unchanged", async () => {
  saveModelsDevCapabilities({
    openai: {
      "rr-near-cap-a": capabilityEntry(65536, { reasoning: true, limit_output: 65536 }),
      "rr-near-cap-b": capabilityEntry(65536, { reasoning: true, limit_output: 65536 }),
    },
  });

  const seen: Array<{ model: string; maxTokens: unknown }> = [];
  const result = await handleComboChat({
    body: { max_tokens: 64000 },
    combo: {
      name: "rr-reasoning-near-cap",
      strategy: "round-robin",
      models: ["openai/rr-near-cap-a", "openai/rr-near-cap-b"],
    },
    handleSingleModel: async (body: Record<string, unknown>, modelStr: string) => {
      seen.push({ model: modelStr, maxTokens: body.max_tokens });
      if (modelStr === "openai/rr-near-cap-a") {
        return new Response(JSON.stringify({ error: { message: "transient" } }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: {
      comboDefaults: {
        concurrencyPerModel: 1,
        queueTimeoutMs: 5,
        maxRetries: 0,
        retryDelayMs: 1,
      },
    },
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 200);
  assert.equal(seen.length, 2, "both reasoning models should have been attempted");
  assert.equal(seen[0].maxTokens, 64000, "first reasoning model should keep max_tokens");
  assert.equal(seen[1].maxTokens, 64000, "second reasoning model should keep max_tokens");
});
