import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-context-relay-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const handoffDb = await import("../../src/lib/db/contextHandoffs.ts");
const { registerCodexConnection } = await import("../../open-sse/services/codexQuotaFetcher.ts");
const { clearSessions, touchSession } = await import("../../open-sse/services/sessionManager.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../src/shared/utils/shuffleDeck.ts");

const originalFetch = globalThis.fetch;

function createLog() {
  const entries = [];
  return {
    info: (tag, msg) => entries.push({ level: "info", tag, msg }),
    warn: (tag, msg) => entries.push({ level: "warn", tag, msg }),
    error: (tag, msg) => entries.push({ level: "error", tag, msg }),
    entries,
  };
}

function okResponse(body = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
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

function buildQuotaResponse(usedPercent, resetAfterSeconds = 3600) {
  return new Response(
    JSON.stringify({
      rate_limit: {
        primary_window: {
          used_percent: usedPercent,
          reset_after_seconds: resetAfterSeconds,
        },
        secondary_window: {
          used_percent: 0,
          reset_after_seconds: 86400,
        },
      },
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitFor(fn, timeoutMs = 1500) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const value = await fn();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  clearSessions();
  await new Promise((resolve) => setTimeout(resolve, 50));
});

test.after(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
  globalThis.fetch = originalFetch;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("handleComboChat context-relay routes to the first available model", async () => {
  const calls = [];

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Hello" }],
    },
    combo: {
      name: "relay-first",
      strategy: "context-relay",
      models: ["openai/gpt-4o-mini", "claude/sonnet"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
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

test("handleComboChat context-relay skips unavailable models and falls through to the next one", async () => {
  const calls = [];

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Fallback" }],
    },
    combo: {
      name: "relay-skip-unavailable",
      strategy: "context-relay",
      models: ["codex/gpt-5.4", "openai/gpt-4o-mini"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async (modelStr) => modelStr !== "codex/gpt-5.4",
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: {
      sessionId: "sess-skip",
      config: { handoffProviders: ["codex"] },
    },
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
});

test("handleComboChat context-relay treats provider circuit breaker responses as ordinary target failures", async () => {
  const combo = {
    name: "relay-breaker",
    strategy: "context-relay",
    models: ["codex/gpt-5.4", "openai/gpt-4o-mini"],
    config: { maxRetries: 0 },
  };
  const calls = [];

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Breaker" }],
    },
    combo,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === "codex/gpt-5.4") {
        return providerBreakerOpenResponse();
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["codex/gpt-5.4", "openai/gpt-4o-mini"]);
});

test("handleComboChat context-relay persists a handoff when codex quota reaches the warning threshold", async () => {
  const sessionId = "sess-generate";
  const connectionId = "conn-generate";
  touchSession(sessionId, connectionId);
  registerCodexConnection(connectionId, {
    accessToken: "token-generate",
    workspaceId: "ws-generate",
  });

  let usageCalls = 0;
  let summaryCalls = 0;

  globalThis.fetch = async (url) => {
    if (String(url).includes("/backend-api/wham/usage")) {
      usageCalls += 1;
      return buildQuotaResponse(87);
    }
    throw new Error(`Unexpected fetch: ${String(url)}`);
  };

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Keep context alive" }],
    },
    combo: {
      name: "relay-generate",
      strategy: "context-relay",
      models: ["codex/gpt-5.4"],
      config: { maxRetries: 0, handoffThreshold: 0.85, handoffProviders: ["codex"] },
    },
    handleSingleModel: async (body) => {
      if (body._omnirouteInternalRequest === "context-handoff") {
        summaryCalls += 1;
        return okResponse({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: "Generated from combo-level test",
                  keyDecisions: ["generate at 85%"],
                  taskProgress: "ready",
                  activeEntities: ["combo.ts"],
                }),
              },
            },
          ],
        });
      }

      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: {
      sessionId,
      config: {
        handoffThreshold: 0.85,
        handoffProviders: ["codex"],
      },
    },
  });

  const saved = await waitFor(() => handoffDb.getHandoff(sessionId, "relay-generate"));

  assert.equal(result.ok, true);
  assert.equal(usageCalls, 1);
  assert.equal(summaryCalls, 1);
  assert.ok(saved);
  assert.equal(saved.summary, "Generated from combo-level test");
  assert.equal(saved.fromAccount, connectionId);
});

test("handleComboChat context-relay respects handoffProviders and skips generation when codex is disabled", async () => {
  const sessionId = "sess-disabled-provider";
  const connectionId = "conn-disabled-provider";
  touchSession(sessionId, connectionId);
  registerCodexConnection(connectionId, {
    accessToken: "token-disabled-provider",
    workspaceId: "ws-disabled-provider",
  });

  let usageCalls = 0;
  let summaryCalls = 0;

  globalThis.fetch = async (url) => {
    if (String(url).includes("/backend-api/wham/usage")) {
      usageCalls += 1;
      return buildQuotaResponse(90);
    }
    throw new Error(`Unexpected fetch: ${String(url)}`);
  };

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Do not generate" }],
    },
    combo: {
      name: "relay-disabled-provider",
      strategy: "context-relay",
      models: ["codex/gpt-5.4"],
      config: { maxRetries: 0, handoffProviders: ["openai"] },
    },
    handleSingleModel: async (body) => {
      if (body._omnirouteInternalRequest === "context-handoff") {
        summaryCalls += 1;
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: {
      sessionId,
      config: {
        handoffProviders: ["openai"],
      },
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.equal(result.ok, true);
  assert.equal(usageCalls, 0);
  assert.equal(summaryCalls, 0);
  assert.equal(handoffDb.getHandoff(sessionId, "relay-disabled-provider"), null);
});

test("handleComboChat context-relay treats explicit empty handoffProviders as disabled", async () => {
  const sessionId = "sess-empty-providers";
  const connectionId = "conn-empty-providers";
  touchSession(sessionId, connectionId);
  registerCodexConnection(connectionId, {
    accessToken: "token-empty-providers",
    workspaceId: "ws-empty-providers",
  });

  let usageCalls = 0;

  globalThis.fetch = async (url) => {
    if (String(url).includes("/backend-api/wham/usage")) {
      usageCalls += 1;
      return buildQuotaResponse(91);
    }
    throw new Error(`Unexpected fetch: ${String(url)}`);
  };

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Disabled by empty list" }],
    },
    combo: {
      name: "relay-empty-providers",
      strategy: "context-relay",
      models: ["codex/gpt-5.4"],
      config: { maxRetries: 0, handoffProviders: [] },
    },
    handleSingleModel: async () => okResponse(),
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: {
      sessionId,
      config: {
        handoffProviders: [],
      },
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.equal(result.ok, true);
  assert.equal(usageCalls, 0);
  assert.equal(handoffDb.getHandoff(sessionId, "relay-empty-providers"), null);
});

test("getLastSessionModel uses latest id as deterministic tie-breaker", async () => {
  const sessionId = "sess-model-history-tie";
  const comboName = "relay-model-history-tie";

  handoffDb.recordSessionModelUsage(sessionId, comboName, "openai/old", "openai");
  handoffDb.recordSessionModelUsage(sessionId, comboName, "anthropic/new", "anthropic");

  core
    .getDbInstance()
    .prepare(
      `UPDATE session_model_history
       SET used_at = ?
       WHERE session_id = ? AND combo_name = ?`
    )
    .run("2026-05-26 12:00:00", sessionId, comboName);

  assert.equal(handoffDb.getLastSessionModel(sessionId, comboName), "anthropic/new");
});

test("handleComboChat universal handoff does not accumulate injected handoffs across fallback targets", async () => {
  const sessionId = "sess-universal-no-mutate";
  const comboName = "universal-no-mutate";

  handoffDb.recordSessionModelUsage(sessionId, comboName, "openai/previous", "openai");
  handoffDb.upsertHandoff({
    sessionId,
    comboName,
    fromAccount: "universal:openai/previous",
    summary: "Previous model summary",
    keyDecisions: ["keep context"],
    taskProgress: "fallback pending",
    activeEntities: ["combo.ts"],
    messageCount: 1,
    model: "openai/previous",
    lastModel: "openai/previous",
    warningThresholdPct: 0,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
  });

  const calls = [];

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Continue" }],
    },
    combo: {
      name: comboName,
      strategy: "priority",
      models: ["openai/failed", "anthropic/fallback"],
      config: { maxRetries: 0 },
      universalHandoff: { enabled: true },
    },
    handleSingleModel: async (body, modelStr) => {
      calls.push({ modelStr, body });
      if (modelStr === "openai/failed") {
        return new Response(JSON.stringify({ error: { message: "fail" } }), {
          status: 503,
          headers: { "content-type": "application/json" },
        });
      }
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: { sessionId },
  });

  assert.equal(result.ok, true);

  const fallbackBody = calls.find((call) => call.modelStr === "anthropic/fallback")?.body;
  const handoffMessages = (fallbackBody.messages || []).filter(
    (message) =>
      typeof message?.content === "string" && message.content.includes("<context_handoff>")
  );

  assert.equal(handoffMessages.length, 1);
  assert.match(handoffMessages[0].content, /openai\/previous/);
  assert.match(handoffMessages[0].content, /anthropic\/fallback/);
  assert.doesNotMatch(handoffMessages[0].content, /openai\/failed/);
});

test("handleComboChat universal handoff detects model switch before recording current model", async () => {
  const sessionId = "sess-universal-switch";
  const comboName = "universal-switch";

  handoffDb.recordSessionModelUsage(sessionId, comboName, "openai/previous", "openai");
  core
    .getDbInstance()
    .prepare(
      `UPDATE session_model_history
       SET used_at = ?
       WHERE session_id = ? AND combo_name = ?`
    )
    .run("2000-01-01 00:00:00", sessionId, comboName);

  let summaryCalls = 0;

  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "Continue on a new model" }],
    },
    combo: {
      name: comboName,
      strategy: "priority",
      models: ["anthropic/current"],
      config: { maxRetries: 0 },
      universalHandoff: { enabled: true },
    },
    handleSingleModel: async (body) => {
      if (body._omnirouteInternalRequest === "universal-handoff") {
        summaryCalls += 1;
        return okResponse({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: "Generated universal handoff",
                  keyDecisions: ["read previous before recording current"],
                  taskProgress: "switch detected",
                  activeEntities: ["open-sse/services/combo.ts"],
                }),
              },
            },
          ],
        });
      }

      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: { sessionId },
  });

  const saved = await waitFor(() => handoffDb.getHandoff(sessionId, comboName));

  assert.equal(result.ok, true);
  assert.equal(summaryCalls, 1);
  assert.ok(saved);
  assert.equal(saved.lastModel, "openai/previous");
});

// ── Rule #18 gate — PR #3399: server-side context cache pinning ─────────────
// Proves that when context_cache_protection=true and session_model_history has
// a prior model, handleComboChat overrides body.model with the pinned model
// (no client-side <omniModel> tag injection required).

test("context_cache_protection: pins body.model to last session model when history exists", async () => {
  const sessionId = "sess-cache-pin-active";
  const comboName = "cache-pin-combo";

  // Pre-record a prior model usage for this session/combo
  handoffDb.recordSessionModelUsage(
    sessionId,
    comboName,
    "anthropic/claude-3-5-sonnet",
    "anthropic"
  );

  // Ensure anthropic provider has an active connection so the pin isn't
  // dropped by isPinnedModelDurablyUnhealthy (no connections = durably down).
  const db = core.getDbInstance();
  db.prepare(
    `INSERT OR IGNORE INTO provider_connections (id, provider, auth_type, name, is_active, test_status, created_at, updated_at)
     VALUES ('test-anthropic-conn', 'anthropic', 'api_key', 'test-anthropic', 1, 'active', datetime('now'), datetime('now'))`
  ).run();

  const capturedModels: string[] = [];

  const result = await handleComboChat({
    body: {
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: "Continue the task" }],
    },
    combo: {
      name: comboName,
      strategy: "priority",
      models: ["openai/gpt-4o", "anthropic/claude-3-5-sonnet"],
      config: { maxRetries: 0 },
      context_cache_protection: true,
    },
    handleSingleModel: async (body, modelStr) => {
      capturedModels.push(modelStr);
      capturedModels.push(body?.model as string);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: { sessionId },
  });

  assert.equal(result.ok, true);
  // The first model tried must be the pinned one, not the combo's first model
  assert.equal(capturedModels[0], "anthropic/claude-3-5-sonnet", "modelStr must be pinned model");
  // body.model must also reflect the pinned model
  assert.equal(capturedModels[1], "anthropic/claude-3-5-sonnet", "body.model must be pinned model");
});

test("context_cache_protection: does NOT pin when no session history exists (first request)", async () => {
  const sessionId = "sess-cache-pin-first";
  const comboName = "cache-pin-first-combo";
  // No prior recordSessionModelUsage call — fresh session

  const capturedModels: string[] = [];

  const result = await handleComboChat({
    body: {
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: "First message" }],
    },
    combo: {
      name: comboName,
      strategy: "priority",
      models: ["openai/gpt-4o"],
      config: { maxRetries: 0 },
      context_cache_protection: true,
    },
    handleSingleModel: async (body, modelStr) => {
      capturedModels.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: null,
    relayOptions: { sessionId },
  });

  assert.equal(result.ok, true);
  // No pinning on first request — should use the combo's first model
  assert.equal(
    capturedModels[0],
    "openai/gpt-4o",
    "first request must use combo model (no pinning)"
  );
});

// ── clearSessionModelHistoryForCombo ────────────────────────────────────────
// Proves that clearing pins for a combo name removes stale session history,
// so that after a combo edit the next request does NOT use the old pinned model.

test("clearSessionModelHistoryForCombo removes all pins for a combo", async () => {
  const comboName = "test-clear-pins";

  // Seed history for two different sessions on the same combo
  handoffDb.recordSessionModelUsage("sess-A", comboName, "openai/gpt-4o", "openai");
  handoffDb.recordSessionModelUsage(
    "sess-B",
    comboName,
    "anthropic/claude-3-5-sonnet",
    "anthropic"
  );

  // Sanity: pins exist
  assert.equal(handoffDb.getLastSessionModel("sess-A", comboName), "openai/gpt-4o");
  assert.equal(handoffDb.getLastSessionModel("sess-B", comboName), "anthropic/claude-3-5-sonnet");

  // Clear pins for this combo
  const cleared = handoffDb.clearSessionModelHistoryForCombo(comboName);
  assert.ok(cleared >= 2, `should have cleared at least 2 entries, got ${cleared}`);

  // Pins are gone
  assert.equal(handoffDb.getLastSessionModel("sess-A", comboName), null);
  assert.equal(handoffDb.getLastSessionModel("sess-B", comboName), null);
});

test("clearSessionModelHistoryForCombo does not affect other combos", async () => {
  const comboA = "combo-keep";
  const comboB = "combo-clear";

  handoffDb.recordSessionModelUsage("sess-1", comboA, "openai/gpt-4o", "openai");
  handoffDb.recordSessionModelUsage("sess-1", comboB, "anthropic/claude-3-5-sonnet", "anthropic");

  // Clear only comboB
  handoffDb.clearSessionModelHistoryForCombo(comboB);

  // comboA is untouched
  assert.equal(handoffDb.getLastSessionModel("sess-1", comboA), "openai/gpt-4o");
  // comboB is cleared
  assert.equal(handoffDb.getLastSessionModel("sess-1", comboB), null);
});
