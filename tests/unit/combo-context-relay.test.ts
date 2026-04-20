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

test("handleComboChat context-relay skips targets that report an open provider circuit breaker", async () => {
  const combo = {
    name: "relay-breaker",
    strategy: "context-relay",
    models: ["codex/gpt-5.4", "openai/gpt-4o-mini"],
    config: { maxRetries: 0 },
  };
  const log = createLog();
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
    log,
    settings: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["codex/gpt-5.4", "openai/gpt-4o-mini"]);
  assert.ok(
    log.entries.some((entry) => String(entry.msg).includes("provider circuit breaker OPEN"))
  );
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
