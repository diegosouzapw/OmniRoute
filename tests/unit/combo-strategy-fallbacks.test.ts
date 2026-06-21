import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Fallback coverage for the strategies that previously only had happy-path tests
// (fill-first, p2c, random, cost-optimized, strict-random), plus circuit-breaker
// HALF_OPEN recovery in the combo loop and strategy-name normalization.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-fallbacks-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat, preScreenTargets } = await import("../../open-sse/services/combo.ts");
const { weightedStickyTargets } = await import("../../open-sse/services/combo/rrState.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../open-sse/services/sessionManager.ts");

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
  if (lastError) throw lastError;
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  weightedStickyTargets.clear();
  await cleanupTestDataDir();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.resetAllPricing();
  settingsDb.clearAllLKGP();
});

test.after(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  weightedStickyTargets.clear();
  settingsDb.clearAllLKGP();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  await cleanupTestDataDir();
});

test("fill-first falls back to the second target when the first fails", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "fill-first-fallback",
      strategy: "fill-first",
      models: ["openai/gpt-4o-mini", "claude/sonnet"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "openai/gpt-4o-mini") return errorResponse(503);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini", "claude/sonnet"]);
});

test("p2c falls back to the remaining target when the selected one fails", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "p2c-fallback",
      strategy: "p2c",
      models: ["openai/gpt-4o-mini", "claude/sonnet"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      // Whichever target p2c selects first fails; the other one serves.
      if (calls.length === 1) return errorResponse(500);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls.length, 2, "both targets should be attempted");
  assert.notEqual(calls[0], calls[1], "fallback must go to the other target");
});

test("p2c works with a single-target pool", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "p2c-single",
      strategy: "p2c",
      models: ["openai/gpt-4o-mini"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
});

test("random strategy falls through the shuffle order until the healthy target serves", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "random-fallback",
      strategy: "random",
      models: ["openai/gpt-4o-mini", "claude/sonnet", "gemini/gemini-2.5-flash"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      // Only one target is healthy — wherever the shuffle puts it, the combo
      // must keep falling through until it is reached.
      if (modelStr === "gemini/gemini-2.5-flash") return okResponse();
      return errorResponse(500);
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls[calls.length - 1], "gemini/gemini-2.5-flash");
  assert.ok(calls.length >= 1 && calls.length <= 3);
});

test("cost-optimized falls back to the next-cheapest target when the cheapest fails", async () => {
  // Cross-provider on purpose: a 5xx on a target without a pinned connectionId
  // conservatively marks the whole provider for the rest of the request
  // (#1731v2), so a same-provider second target would be skipped, not retried.
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-nano": { input: 0.1, output: 0.2 },
    },
    claude: {
      sonnet: { input: 5, output: 10 },
    },
  });

  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "cost-fallback",
      strategy: "cost-optimized",
      models: ["claude/sonnet", "openai/gpt-4o-nano"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      if (modelStr === "openai/gpt-4o-nano") return errorResponse(500);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(
    calls,
    ["openai/gpt-4o-nano", "claude/sonnet"],
    "cheapest first, then next-cheapest on failure"
  );
});

test("cost-optimized preserves the original order on price ties", async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2 },
      "gpt-4o": { input: 1, output: 2 },
    },
  });

  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "cost-tie",
      strategy: "cost-optimized",
      models: ["openai/gpt-4o", "openai/gpt-4o-mini"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o"], "tie keeps the configured order (stable sort)");
});

test("strict-random falls back to the remaining target when the deck pick fails", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "strict-random-fallback",
      strategy: "strict-random",
      models: ["openai/gpt-4o-mini", "claude/sonnet"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      if (calls.length === 1) return errorResponse(500);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.equal(calls.length, 2);
  assert.notEqual(calls[0], calls[1]);
});

test("round-robin uses existing stickyRoundRobinLimit for combo target batching", async () => {
  const calls: string[] = [];
  const combo = {
    name: "rr-sticky-combo-batches",
    strategy: "round-robin",
    models: ["openai/a", "claude/b", "gemini/c"],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
  };

  for (let i = 0; i < 10; i += 1) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: any, modelStr: string) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: { stickyRoundRobinLimit: 3 },
      allCombos: null,
    });
    assert.equal(result.ok, true);
  }

  assert.deepEqual(calls, [
    "openai/a",
    "openai/a",
    "openai/a",
    "claude/b",
    "claude/b",
    "claude/b",
    "gemini/c",
    "gemini/c",
    "gemini/c",
    "openai/a",
  ]);
});

test("per-combo stickyRoundRobinLimit overrides the global setting", async () => {
  const calls: string[] = [];
  const combo = {
    name: "rr-per-combo-sticky-override",
    strategy: "round-robin",
    models: ["openai/a", "claude/b", "gemini/c"],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, stickyRoundRobinLimit: 2 },
  };
  for (let i = 0; i < 4; i += 1) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: any, m: string) => {
        calls.push(m);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: { stickyRoundRobinLimit: 3 },
      allCombos: null,
    });
    assert.equal(result.ok, true);
  }
  assert.deepEqual(calls, ["openai/a", "openai/a", "claude/b", "claude/b"]);
});

test("round-robin sticky batching fallback success becomes sticky target", async () => {
  const calls: string[] = [];
  const combo = {
    name: "rr-sticky-fallback-success",
    strategy: "round-robin",
    models: ["openai/a", "claude/b", "gemini/c"],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
  };

  for (let i = 0; i < 4; i += 1) {
    const result = await handleComboChat({
      body: {},
      combo,
      handleSingleModel: async (_body: any, modelStr: string) => {
        calls.push(modelStr);
        if (modelStr === "openai/a") return errorResponse(503, "a is down");
        return okResponse();
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: { stickyRoundRobinLimit: 2 },
      allCombos: null,
    });
    assert.equal(result.ok, true);
  }

  assert.deepEqual(calls, ["openai/a", "claude/b", "claude/b", "gemini/c", "gemini/c"]);
});

test("weighted sticky limit batches successful weighted selections", async () => {
  const calls: string[] = [];
  const originalRandom = Math.random;
  const draws = [0.1, 0.9];
  Math.random = () => draws.shift() ?? 0.9;
  try {
    const combo = {
      name: "weighted-sticky-batches",
      strategy: "weighted",
      models: [
        { model: "openai/a", weight: 50 },
        { model: "claude/b", weight: 50 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, stickyWeightedLimit: 2 },
    };
    for (let i = 0; i < 4; i += 1) {
      const result = await handleComboChat({
        body: {},
        combo,
        handleSingleModel: async (_body: any, modelStr: string) => {
          calls.push(modelStr);
          return okResponse();
        },
        isModelAvailable: async () => true,
        log: createLog(),
        settings: null,
        allCombos: null,
      });
      assert.equal(result.ok, true);
    }
  } finally {
    Math.random = originalRandom;
  }
  assert.deepEqual(calls, ["openai/a", "openai/a", "claude/b", "claude/b"]);
});

test("weighted sticky limit clears unavailable sticky steps before sampling", async () => {
  const calls: string[] = [];
  const step0Key = "weighted-sticky-clears-model-1-openai-a";
  const step1Key = "weighted-sticky-clears-model-2-claude-b";
  weightedStickyTargets.set("weighted-sticky-clears", { executionKey: step0Key, successCount: 1 });
  const combo = {
    name: "weighted-sticky-clears",
    strategy: "weighted",
    models: [
      { model: "openai/a", weight: 50 },
      { model: "claude/b", weight: 50 },
    ],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, stickyWeightedLimit: 10 },
  };
  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async (modelStr: string) => modelStr !== "openai/a",
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["claude/b"]);
  assert.equal(weightedStickyTargets.get("weighted-sticky-clears")?.executionKey, step1Key);
});

test("weighted sticky limit follows fallback success", async () => {
  const calls: string[] = [];
  const originalRandom = Math.random;
  Math.random = () => 0.1;
  try {
    const combo = {
      name: "weighted-sticky-fallback-success",
      strategy: "weighted",
      models: [
        { model: "openai/a", weight: 50 },
        { model: "claude/b", weight: 50 },
      ],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, stickyWeightedLimit: 2 },
    };
    for (let i = 0; i < 3; i += 1) {
      const result = await handleComboChat({
        body: {},
        combo,
        handleSingleModel: async (_body: any, modelStr: string) => {
          calls.push(modelStr);
          return modelStr === "openai/a" ? errorResponse(503, "a is down") : okResponse();
        },
        isModelAvailable: async () => true,
        log: createLog(),
        settings: null,
        allCombos: null,
      });
      assert.equal(result.ok, true);
    }
  } finally {
    Math.random = originalRandom;
  }
  assert.deepEqual(calls, ["openai/a", "claude/b", "claude/b", "openai/a", "claude/b"]);
});

test("weighted sticky keeps a top-level step if one nested leaf remains available", async () => {
  const calls: string[] = [];
  const step0Key = "weighted-nested-sticky-ref-1-minimax";
  weightedStickyTargets.set("weighted-nested-sticky", { executionKey: step0Key, successCount: 1 });
  const combo = {
    name: "weighted-nested-sticky",
    strategy: "weighted",
    models: [{ kind: "combo-ref", comboName: "minimax", weight: 100 }],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, stickyWeightedLimit: 10 },
  };
  const allCombos = [
    combo,
    { name: "minimax", strategy: "priority", models: ["ollama/m3", "oc/m3"] },
  ];
  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async (modelStr: string) => modelStr !== "ollama/m3",
    log: createLog(),
    settings: null,
    allCombos,
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["oc/m3"]);
  assert.equal(weightedStickyTargets.get("weighted-nested-sticky")?.executionKey, step0Key);
});

test("strict-random survives a stale deck entry after a target is removed", async () => {
  const comboTwoTargets = {
    name: "strict-random-stale",
    strategy: "strict-random",
    models: ["openai/gpt-4o-mini", "claude/sonnet"],
    config: { maxRetries: 0 },
  };

  // First request builds the deck with both targets.
  const first = await handleComboChat({
    body: {},
    combo: comboTwoTargets,
    handleSingleModel: async () => okResponse(),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.equal(first.ok, true);

  // Same combo name, but one target was removed by the operator. The deck may
  // still hold the removed target's key; the combo must degrade gracefully.
  const calls: string[] = [];
  const second = await handleComboChat({
    body: {},
    combo: {
      ...comboTwoTargets,
      models: ["claude/sonnet"],
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(second.ok, true, "stale deck entry must not break routing");
  assert.deepEqual(calls, ["claude/sonnet"]);
});

test("unknown strategy value normalizes to priority order", async () => {
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "typo-strategy",
      strategy: "weigthed", // typo on purpose
      models: ["openai/gpt-4o-mini", "claude/sonnet"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: any, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"], "typo falls back to priority (first model)");
});

test("combo skips a provider while its breaker is OPEN and attempts it again after the reset timeout (HALF_OPEN)", async () => {
  const breaker = getCircuitBreaker("openai", { failureThreshold: 1, resetTimeout: 40 });
  try {
    await breaker.execute(async () => {
      throw new Error("simulated provider failure");
    });
  } catch {
    // expected — trips the breaker OPEN
  }
  assert.equal(breaker.getStatus().state, "OPEN");

  const comboDef = {
    name: "half-open-recovery",
    strategy: "priority",
    models: ["openai/gpt-4o-mini", "claude/sonnet"],
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
  };

  // While OPEN: the openai target must be skipped, claude serves.
  const callsWhileOpen: string[] = [];
  const blocked = await handleComboChat({
    body: {},
    combo: comboDef,
    handleSingleModel: async (_body: any, modelStr: string) => {
      callsWhileOpen.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.equal(blocked.ok, true);
  assert.deepEqual(callsWhileOpen, ["claude/sonnet"], "OPEN breaker target must be skipped");

  // After the reset timeout the breaker reads HALF_OPEN — the combo must probe
  // the provider again instead of excluding it forever (lazy recovery contract).
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(breaker.getStatus().state, "HALF_OPEN");

  const callsAfterExpiry: string[] = [];
  const probed = await handleComboChat({
    body: {},
    combo: comboDef,
    handleSingleModel: async (_body: any, modelStr: string) => {
      callsAfterExpiry.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });
  assert.equal(probed.ok, true);
  assert.deepEqual(
    callsAfterExpiry,
    ["openai/gpt-4o-mini"],
    "HALF_OPEN provider must be probed again"
  );
});

test("preScreenTargets marks an expired-OPEN (HALF_OPEN) target as available", async () => {
  const breaker = getCircuitBreaker("openai", { failureThreshold: 1, resetTimeout: 30 });
  try {
    await breaker.execute(async () => {
      throw new Error("simulated failure");
    });
  } catch {
    // expected
  }
  await new Promise((resolve) => setTimeout(resolve, 60));

  const targets = [
    {
      kind: "model" as const,
      stepId: "step-1",
      executionKey: "openai/gpt-4o",
      modelStr: "openai/gpt-4o",
      provider: "openai",
      providerId: "conn-1",
      connectionId: "conn-1",
      weight: 1,
      label: null,
    },
  ];

  const results = await preScreenTargets(targets as any);
  const openaiResult = results.get("openai/gpt-4o");
  assert.ok(openaiResult, "openai target should have a pre-screen result");
  assert.equal(
    openaiResult.available,
    true,
    "HALF_OPEN (expired OPEN) target must be available for a probe request"
  );
});
