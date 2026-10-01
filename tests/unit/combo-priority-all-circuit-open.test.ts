/**
 * A priority combo whose every target sits behind an OPEN circuit breaker used to
 * answer the generic `ALL_TARGETS_SKIPPED` 503: no provider in the message, no
 * Retry-After, and a recovery hint telling the operator to check quota and top up
 * the account. The breaker is a local resilience timer, not an upstream quota
 * signal, so the response now names it: `all_targets_cooling_down`, each target as
 * `provider/model: circuit_open (Ns)`, Retry-After from the earliest probe, and the
 * `wait` recovery action. A pool with any target NOT behind an open breaker keeps
 * the generic response.
 *
 * Harness mirrors tests/unit/combo-weighted-all-targets-cooling-down.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-priority-circuit-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { recordModelLockoutFailure, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

// Longer than the combo cooldown-wait ceiling, so the loop answers instead of
// sleeping until the breaker half-opens.
const RESET_TIMEOUT_MS = 600_000;

const log = { info() {}, warn() {}, error() {}, debug() {} };

async function openBreaker(provider: string) {
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: 1,
    resetTimeout: RESET_TIMEOUT_MS,
  });
  await breaker
    .execute(async () => {
      throw new Error("simulated failure");
    })
    .catch(() => {});
  assert.equal(breaker.getStatus().state, "OPEN");
}

async function run(calls: string[]) {
  return handleComboChat({
    body: {},
    combo: {
      name: "priority-circuit",
      strategy: "priority",
      models: ["openai/a", "claude/b"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
      calls.push(modelStr);
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
  });
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
});

test.after(() => {
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("every breaker OPEN → 503 names the breaker, the providers and the next probe", async () => {
  await openBreaker("openai");
  await openBreaker("claude");
  const calls: string[] = [];

  const res = await run(calls);
  assert.equal(res.status, 503);
  assert.deepEqual(calls, [], "no upstream call is made while every breaker is open");

  const retryAfter = Number(res.headers.get("Retry-After"));
  assert.ok(
    retryAfter > 0 && retryAfter <= RESET_TIMEOUT_MS / 1000,
    `Retry-After follows the earliest probe, got ${res.headers.get("Retry-After")}`
  );
  assert.equal(res.headers.get("x-omniroute-combo-terminal-reason"), "all_targets_cooling_down");
  assert.equal(res.headers.get("x-omniroute-recovery-action"), "wait");

  const body = (await res.json()) as {
    error: { code?: string; message: string };
    diagnostics: { excluded: Array<{ provider: string; model?: string; reason: string }> };
  };
  assert.equal(body.error.code, "all_targets_cooling_down");
  assert.match(body.error.message, /openai\/a: circuit_open \(\d+s\)/);
  assert.match(body.error.message, /claude\/b: circuit_open \(\d+s\)/);
  assert.doesNotMatch(body.error.message, /quota/i);
  assert.deepEqual(
    body.diagnostics.excluded.map((e) => `${e.provider}/${e.model}:${e.reason}`).sort(),
    ["claude/b:circuit_open", "openai/a:circuit_open"]
  );
});

test("a pool not entirely behind open breakers keeps the generic ALL_TARGETS_SKIPPED", async () => {
  await openBreaker("openai");
  recordModelLockoutFailure("claude", "", "b", "unknown", 502, RESET_TIMEOUT_MS, null, {
    maxCooldownMs: RESET_TIMEOUT_MS,
  });
  const calls: string[] = [];

  const res = await run(calls);
  assert.equal(res.status, 503);
  assert.deepEqual(calls, []);
  const body = (await res.json()) as { error: { code?: string } };
  assert.equal(body.error.code, "ALL_TARGETS_SKIPPED");
});
