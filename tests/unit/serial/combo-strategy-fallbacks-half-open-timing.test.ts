/**
 * tests/unit/serial/combo-strategy-fallbacks-half-open-timing.test.ts
 *
 * Extracted from tests/unit/combo-strategy-fallbacks.test.ts (#6803).
 *
 * This scenario races a real 80ms setTimeout against a 40ms circuit-breaker
 * resetTimeout before asserting breaker.getStatus().state === 'HALF_OPEN'.
 * Under a starved event loop (CI-runner CPU contention from concurrent
 * sibling shard jobs) this timing margin can be missed even though the
 * lazy-recovery contract (OPEN → HALF_OPEN once the reset timeout elapses) is
 * implemented correctly.
 *
 * Running this in tests/unit/serial/ (--test-concurrency=1, see package.json's
 * test:unit:serial) removes the intra-suite parallelism that was the dominant
 * source of contention, matching the repo's established remedy pattern for
 * this class of test.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-fallbacks-half-open-"));
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
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error: unknown) {
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
  // Widened from the original 40ms/80ms margin (#6803): under contended
  // CI-runner load even --test-concurrency=1 doesn't guarantee the "while
  // OPEN" dispatch completes before a 40ms window elapses. A larger absolute
  // margin (same ~2x wait:resetTimeout ratio) tolerates real scheduling
  // jitter while still proving the lazy-recovery contract.
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

  // After the reset timeout the breaker reads HALF_OPEN — the combo must probe
  // the provider again instead of excluding it forever (lazy recovery contract).
  await new Promise((resolve) => setTimeout(resolve, 600));
  assert.equal(breaker.getStatus().state, "HALF_OPEN");

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
