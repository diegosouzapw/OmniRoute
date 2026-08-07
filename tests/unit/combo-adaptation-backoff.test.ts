/**
 * tests/unit/combo-adaptation-backoff.test.ts
 *
 * Persisted per-model adaptation state for Auto-Combo:
 *   - exponential backoff cooldown ladder (3→5m, 6→15m, 9→60m)
 *   - success resets consecutive failures + clears cooldown
 *   - per-model (not per-provider) keying via (combo_id, model_str)
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-adaptation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { recordComboAdaptationOutcome, getComboAdaptationState, cooldownDurationMsFor } =
  await import("../../src/lib/db/comboAdaptation.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

test("cooldown ladder: 3→5m, 6→15m, 9→60m, saturating", () => {
  assert.equal(cooldownDurationMsFor(0), 0);
  assert.equal(cooldownDurationMsFor(1), 0);
  assert.equal(cooldownDurationMsFor(2), 0);
  assert.equal(cooldownDurationMsFor(3), 5 * 60 * 1000);
  assert.equal(cooldownDurationMsFor(4), 5 * 60 * 1000);
  assert.equal(cooldownDurationMsFor(6), 15 * 60 * 1000);
  assert.equal(cooldownDurationMsFor(8), 15 * 60 * 1000);
  assert.equal(cooldownDurationMsFor(9), 60 * 60 * 1000);
  assert.equal(cooldownDurationMsFor(20), 60 * 60 * 1000);
});

test("three consecutive failures set a 5-minute cooldown", () => {
  for (let i = 0; i < 3; i++) {
    recordComboAdaptationOutcome("combo-a", "ollama-local/qwen", {
      success: false,
      latencyMs: 30000,
    });
  }
  const state = getComboAdaptationState("combo-a", "ollama-local/qwen");
  assert.ok(state, "state row exists");
  assert.equal(state.consecutiveFailures, 3);
  assert.equal(state.failures, 3);
  assert.equal(state.requestCount, 3);
  assert.ok(state.cooldownUntil, "cooldown set after 3 consecutive failures");
  const msRemaining = Date.parse(state.cooldownUntil!) - Date.now();
  assert.ok(msRemaining > 0 && msRemaining <= 5 * 60 * 1000, `cooldown ~5m (got ${msRemaining}ms)`);
});

test("six consecutive failures escalate to 15 minutes", () => {
  recordComboAdaptationOutcome("combo-b", "ollama-local/gemma", { success: false, latencyMs: 1 });
  recordComboAdaptationOutcome("combo-b", "ollama-local/gemma", { success: false, latencyMs: 1 });
  recordComboAdaptationOutcome("combo-b", "ollama-local/gemma", { success: false, latencyMs: 1 });
  recordComboAdaptationOutcome("combo-b", "ollama-local/gemma", { success: false, latencyMs: 1 });
  recordComboAdaptationOutcome("combo-b", "ollama-local/gemma", { success: false, latencyMs: 1 });
  recordComboAdaptationOutcome("combo-b", "ollama-local/gemma", { success: false, latencyMs: 1 });
  const state = getComboAdaptationState("combo-b", "ollama-local/gemma");
  const msRemaining = Date.parse(state!.cooldownUntil!) - Date.now();
  assert.ok(
    msRemaining > 0 && msRemaining <= 15 * 60 * 1000,
    `escalated to ~15m (got ${msRemaining}ms)`
  );
});

test("a success resets consecutive failures and clears the cooldown", () => {
  recordComboAdaptationOutcome("combo-c", "ollama-local/mistral", {
    success: false,
    latencyMs: 30000,
  });
  recordComboAdaptationOutcome("combo-c", "ollama-local/mistral", {
    success: false,
    latencyMs: 30000,
  });
  recordComboAdaptationOutcome("combo-c", "ollama-local/mistral", {
    success: false,
    latencyMs: 30000,
  });
  assert.ok(getComboAdaptationState("combo-c", "ollama-local/mistral")?.cooldownUntil);

  recordComboAdaptationOutcome("combo-c", "ollama-local/mistral", {
    success: true,
    latencyMs: 4000,
  });
  const state = getComboAdaptationState("combo-c", "ollama-local/mistral");
  assert.equal(state?.consecutiveFailures, 0, "success resets consecutive counter");
  assert.equal(state?.cooldownUntil, null, "success clears cooldown");
  assert.equal(state?.successCount, 1);
  assert.ok(state?.lastSuccess, "lastSuccess stamped");
});

test("state is keyed per model string, not per provider", () => {
  recordComboAdaptationOutcome("combo-d", "ollama-local/qwen", {
    success: false,
    latencyMs: 1,
  });
  const qwen = getComboAdaptationState("combo-d", "ollama-local/qwen");
  const other = getComboAdaptationState("combo-d", "ollama-local/gemma");
  assert.equal(qwen?.consecutiveFailures, 1);
  assert.equal(other, null, "different model gets its own row");
});

test("learned_score moves toward 1 on success and toward 0 on failure", () => {
  recordComboAdaptationOutcome("combo-e", "ollama-local/deepseek", {
    success: true,
    latencyMs: 1000,
  });
  const afterSuccess = getComboAdaptationState("combo-e", "ollama-local/deepseek");
  assert.ok(afterSuccess!.learnedScore > 0.5, "success raises learned score");

  for (let i = 0; i < 5; i++) {
    recordComboAdaptationOutcome("combo-e", "ollama-local/deepseek", {
      success: false,
      latencyMs: 30000,
    });
  }
  const afterFailures = getComboAdaptationState("combo-e", "ollama-local/deepseek");
  assert.ok(afterFailures!.learnedScore < 0.5, "failures drag learned score down");
});
