/**
 * tests/unit/combo-warm-switch-cooldown.test.ts
 *
 * #8874: warm-bonus + switch-cost scoring factors and the persisted adaptation
 * cooldown filter for Auto-Combo:
 *   - a warm (already-in-VRAM) Ollama candidate scores ABOVE an identical cold one
 *   - cold candidates are penalized when a warm alternative exists (switch cost)
 *   - without a warm alternative, cold candidates are NOT penalized
 *   - applyAdaptationCooldown drops candidates whose cooldown_until is in the future
 *   - the cooldown filter is a no-op for an empty pool
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warm-switch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { scoreAutoTargets } = await import("../../open-sse/services/combo/autoStrategy.ts");
const { DEFAULT_WEIGHTS } = await import("../../open-sse/services/autoCombo/scoring.ts");
const { applyAdaptationCooldown } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");
const { recordComboAdaptationOutcome } = await import("../../src/lib/db/comboAdaptation.ts");
const { resolveOllamaUnloadStrategy } = await import("../../open-sse/services/combo/autoConfig.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

function candidate(overrides: Record<string, unknown> = {}) {
  return {
    provider: "ollama-local",
    model: "qwen",
    modelStr: "ollama-local/qwen",
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED" as const,
    costPer1MTokens: 0,
    p95LatencyMs: 2000,
    latencyStdDev: 100,
    errorRate: 0.01,
    accountTier: "standard" as const,
    quotaResetIntervalSecs: 86400,
    contextAffinity: 0.5,
    resetWindowAffinity: 0.5,
    quotaCutoffBlocked: false,
    ...overrides,
  };
}

function targetsFor(...modelStrs: string[]) {
  return modelStrs.map((modelStr, i) => ({
    stepId: `s${i}`,
    executionKey: `e${i}`,
    modelStr,
    provider: "ollama-local",
    connectionId: null,
  }));
}

test("warm candidate scores above an identical cold one (warm bonus)", () => {
  const warm = candidate({ model: "qwen", modelStr: "ollama-local/qwen", isWarm: true });
  const cold = candidate({ model: "gemma", modelStr: "ollama-local/gemma" });
  const targets = targetsFor("ollama-local/qwen", "ollama-local/gemma");
  const scored = scoreAutoTargets(targets, [warm, cold], "general", DEFAULT_WEIGHTS);
  const byModel = Object.fromEntries(scored.map((s) => [s.target.modelStr, s.score]));
  assert.ok(
    byModel["ollama-local/qwen"] > byModel["ollama-local/gemma"],
    "warm model should outscore an identical cold one"
  );
});

test("identical models without a warm one score equally (no switch penalty)", () => {
  const a = candidate({ model: "qwen", modelStr: "ollama-local/qwen" });
  const b = candidate({ model: "gemma", modelStr: "ollama-local/gemma" });
  const scored = scoreAutoTargets(
    targetsFor("ollama-local/qwen", "ollama-local/gemma"),
    [a, b],
    "general",
    DEFAULT_WEIGHTS
  );
  const [first, second] = scored;
  assert.ok(
    Math.abs(first.score - second.score) < 1e-9,
    "identical cold candidates should tie (no switch cost applied)"
  );
});

test("resolveOllamaUnloadStrategy defaults to memory-first", () => {
  assert.equal(resolveOllamaUnloadStrategy(null), "memory-first");
  assert.equal(resolveOllamaUnloadStrategy({}), "memory-first");
  assert.equal(resolveOllamaUnloadStrategy({ unloadStrategy: "bogus" }), "memory-first");
  assert.equal(
    resolveOllamaUnloadStrategy({ unloadStrategy: "availability-first" }),
    "availability-first"
  );
});

test("applyAdaptationCooldown removes candidates in a future cooldown", () => {
  recordComboAdaptationOutcome("combo-cool", "ollama-local/qwen", {
    success: false,
    latencyMs: 30000,
  });
  recordComboAdaptationOutcome("combo-cool", "ollama-local/qwen", {
    success: false,
    latencyMs: 30000,
  });
  recordComboAdaptationOutcome("combo-cool", "ollama-local/qwen", {
    success: false,
    latencyMs: 30000,
  });
  const qwen = candidate({ model: "qwen", modelStr: "ollama-local/qwen" });
  const gemma = candidate({ model: "gemma", modelStr: "ollama-local/gemma" });
  const kept = applyAdaptationCooldown([qwen, gemma], "combo-cool");
  const keptStrs = kept.map((c) => c.modelStr);
  assert.ok(!keptStrs.includes("ollama-local/qwen"), "cooldown model excluded from selection");
  assert.ok(keptStrs.includes("ollama-local/gemma"), "healthy model kept");
});

test("applyAdaptationCooldown is a no-op for an empty pool", () => {
  assert.deepEqual(applyAdaptationCooldown([], "combo-none"), []);
});
