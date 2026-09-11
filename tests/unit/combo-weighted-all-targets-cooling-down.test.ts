/**
 * Weighted combos filter targets before dispatch (model lockout, circuit breaker,
 * provider cooldown, availability probe). When that leaves nothing, the response
 * used to be the host's 404 `no_executable_targets` — "switch combo / reconnect
 * providers" — for a pool that is configured, connected and merely cooling down;
 * Claude Code renders a 404 as "this model may not exist". A pool emptied by
 * resilience timers now answers 503 + Retry-After with every excluded target in
 * the diagnostics. A pool with nothing to run keeps its 404.
 *
 * Harness mirrors tests/unit/combo-strategy-fallbacks.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-weighted-cooling-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { weightedStickyTargets } = await import("../../open-sse/services/combo/rrState.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { recordModelLockoutFailure, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

type LogEntry = { level: string; tag: unknown; msg: unknown };
function createLog() {
  const entries: LogEntry[] = [];
  const push = (level: string) => (tag: unknown, msg: unknown) => {
    entries.push({ level, tag, msg });
  };
  return {
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
    debug: push("debug"),
    entries,
  };
}

function okResponse() {
  return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const COMBO = {
  name: "weighted-cooling",
  strategy: "weighted",
  models: [
    { model: "openai/a", weight: 50 },
    { model: "claude/b", weight: 50 },
  ],
  config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
};

function lockModel(provider: string, model: string, cooldownMs: number) {
  recordModelLockoutFailure(provider, "", model, "unknown", 502, cooldownMs, null, {
    maxCooldownMs: cooldownMs,
  });
}

async function openBreaker(provider: string) {
  const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 30_000 });
  await breaker
    .execute(async () => {
      throw new Error("simulated failure");
    })
    .catch(() => {});
  assert.equal(breaker.getStatus().state, "OPEN");
}

async function run(opts: {
  isModelAvailable?: (modelStr: string) => Promise<boolean> | boolean;
  settings?: Record<string, unknown> | null;
  log?: ReturnType<typeof createLog>;
  calls?: string[];
}) {
  return handleComboChat({
    body: {},
    combo: COMBO,
    handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
      opts.calls?.push(modelStr);
      return okResponse();
    },
    isModelAvailable: opts.isModelAvailable ?? (async () => true),
    log: opts.log ?? createLog(),
    settings: opts.settings ?? null,
    allCombos: null,
  });
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  weightedStickyTargets.clear();
});

test.after(() => {
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("every target model-locked → 503 + Retry-After with the excluded targets, nothing dispatched", async () => {
  lockModel("openai", "a", 60_000);
  lockModel("claude", "b", 120_000);
  const calls: string[] = [];
  const log = createLog();

  const res = await run({ calls, log });
  assert.equal(res.status, 503);
  assert.deepEqual(calls, [], "no upstream call is made for a cooling pool");

  const retryAfter = Number(res.headers.get("Retry-After"));
  assert.ok(
    retryAfter >= 1 && retryAfter <= 60,
    `Retry-After follows the earliest lapse, got ${retryAfter}`
  );
  assert.equal(res.headers.get("x-omniroute-combo-terminal-reason"), "all_targets_cooling_down");
  assert.equal(res.headers.get("x-omniroute-recovery-action"), "wait");
  assert.equal(res.headers.get("x-omniroute-retry-after-seconds"), String(retryAfter));

  const body = (await res.json()) as {
    error: { code?: string; message: string };
    diagnostics: {
      poolSize: number;
      attempted: number;
      excluded: Array<{ provider: string; model?: string; reason: string }>;
      terminalReason: string;
    };
    recovery_hint: { action: string; retry_after_seconds?: number };
  };
  assert.equal(body.error.code, "all_targets_cooling_down");
  assert.match(body.error.message, /cooling down/);
  assert.equal(body.diagnostics.terminalReason, "all_targets_cooling_down");
  assert.equal(body.diagnostics.poolSize, 2);
  assert.equal(body.diagnostics.attempted, 0);
  assert.deepEqual(
    body.diagnostics.excluded.map((e) => `${e.provider}/${e.model}:${e.reason}`).sort(),
    ["claude/b:model_lockout", "openai/a:model_lockout"]
  );
  assert.equal(body.recovery_hint.action, "wait");
  assert.equal(body.recovery_hint.retry_after_seconds, retryAfter);

  const warned = log.entries.find(
    (e) => e.level === "warn" && String(e.msg).includes("every target excluded before dispatch")
  );
  assert.ok(warned, "the silent drop is now logged with the reasons");
  assert.match(String(warned?.msg), /openai\/a: model_lockout \(\d+s\)/);
});

test("lockout + open circuit breaker are both reported as cooling down", async () => {
  lockModel("openai", "a", 60_000);
  await openBreaker("claude");
  const res = await run({});
  assert.equal(res.status, 503);
  const body = (await res.json()) as {
    diagnostics: { excluded: Array<{ provider: string; reason: string }> };
  };
  assert.deepEqual(body.diagnostics.excluded.map((e) => `${e.provider}:${e.reason}`).sort(), [
    "claude:circuit_open",
    "openai:model_lockout",
  ]);
});

test("one target cooling down, the other healthy → dispatches to the healthy one", async () => {
  lockModel("openai", "a", 60_000);
  const calls: string[] = [];
  const res = await run({ calls });
  assert.equal(res.status, 200);
  assert.deepEqual(calls, ["claude/b"]);
});

test("pool emptied only by the availability probe keeps the 404 (nothing is cooling down)", async () => {
  const calls: string[] = [];
  const res = await run({ calls, isModelAvailable: async () => false });
  assert.equal(res.status, 404, "no resilience timer involved — the pool has nothing to run");
  assert.deepEqual(calls, []);
  const body = (await res.json()) as { diagnostics?: { terminalReason?: string } };
  assert.equal(body.diagnostics?.terminalReason, "no_executable_targets");
});

test("a cooling target plus an unavailable one is still 503 — the unavailable one is listed too", async () => {
  lockModel("openai", "a", 60_000);
  const res = await run({ isModelAvailable: async (modelStr) => modelStr !== "claude/b" });
  assert.equal(res.status, 503);
  const body = (await res.json()) as {
    diagnostics: { excluded: Array<{ provider: string; reason: string }> };
  };
  assert.deepEqual(body.diagnostics.excluded.map((e) => `${e.provider}:${e.reason}`).sort(), [
    "claude:unavailable",
    "openai:model_lockout",
  ]);
});
