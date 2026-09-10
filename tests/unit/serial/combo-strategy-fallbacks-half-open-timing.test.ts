/**
 * tests/unit/serial/combo-strategy-fallbacks-half-open-timing.test.ts
 *
 * Extracted from tests/unit/combo-strategy-fallbacks.test.ts (#6803).
 *
 * This scenario advances a Date-only fake clock past the circuit-breaker
 * resetTimeout before asserting breaker.getStatus().state === 'HALF_OPEN'.
 * The lazy-recovery contract is clock-based, so a fake Date keeps this test
 * deterministic without spending real time or depending on event-loop load.
 *
 * It retains its existing serial collector placement; this change only removes
 * the wall-clock dependency from the recovery assertion.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-combo-fallbacks-half-open-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const { resetAllComboMetrics } = await import("../../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../../open-sse/services/rateLimitSemaphore.ts");
const { _resetAllDecks } = await import("../../../src/shared/utils/shuffleDeck.ts");
const { clearSessions } = await import("../../../open-sse/services/sessionManager.ts");

type LogEntry = { level: string; tag: unknown; msg: unknown };

function createLog() {
  const entries: LogEntry[] = [];
  return {
    info: (tag: unknown, msg: unknown) => entries.push({ level: "info", tag, msg }),
    warn: (tag: unknown, msg: unknown) => entries.push({ level: "warn", tag, msg }),
    error: (tag: unknown, msg: unknown) => entries.push({ level: "error", tag, msg }),
    debug: (tag: unknown, msg: unknown) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

function okResponse(body: unknown = { choices: [{ message: { content: "ok" } }] }) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      return;
    } catch (error: unknown) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

async function withFakeDate<T>(fn: () => Promise<T>): Promise<T> {
  mock.timers.enable({ apis: ["Date"], now: Date.now() });
  try {
    return await fn();
  } finally {
    mock.timers.reset();
  }
}

test.beforeEach(async () => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  _resetAllDecks();
  clearSessions();
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
  settingsDb.clearAllLKGP();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  await cleanupTestDataDir();
});

test("combo skips a provider while its breaker is OPEN and attempts it again after the reset timeout (HALF_OPEN)", async () => {
  await withFakeDate(async () => {
    const breaker = getCircuitBreaker("openai", { failureThreshold: 1, resetTimeout: 300 });
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
      handleSingleModel: async (_body: unknown, modelStr: string) => {
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

    // The breaker uses >= for expiry: one millisecond before the boundary it
    // remains OPEN, then the exact reset timeout permits HALF_OPEN recovery.
    mock.timers.tick(299);
    assert.equal(breaker.getStatus().state, "OPEN");
    mock.timers.tick(1);
    assert.equal(breaker.getStatus().state, "HALF_OPEN");

    // After the reset timeout the breaker reads HALF_OPEN — the combo must probe
    // the provider again instead of excluding it forever (lazy recovery contract).
    const callsAfterExpiry: string[] = [];
    const probed = await handleComboChat({
      body: {},
      combo: comboDef,
      handleSingleModel: async (_body: unknown, modelStr: string) => {
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
});
