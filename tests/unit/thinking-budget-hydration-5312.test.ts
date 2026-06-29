/**
 * TDD regression for #5312 (FIX A / RC-A): the dashboard Thinking-Budget setting
 * is dropped on restart because nothing reads `settings.thinkingBudget` back at
 * boot — `_config` resets to DEFAULT (passthrough) on every process start.
 *
 * Fix: `hydrateThinkingBudgetConfig(settings)` (open-sse/services/thinkingBudget.ts),
 * called once during server bootstrap (src/server-init.ts), restores the persisted
 * mode. This test seeds the setting through the real settings DB round-trip, runs
 * the hydrator, and asserts the in-memory config reflects the operator's choice.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-5312a-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const {
  hydrateThinkingBudgetConfig,
  getThinkingBudgetConfig,
  setThinkingBudgetConfig,
  DEFAULT_THINKING_CONFIG,
} = await import("../../open-sse/services/thinkingBudget.ts");

test.afterEach(() => {
  // Reset the module-global config so tests do not leak state into each other.
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5312 RC-A: persisted thinkingBudget mode is restored at boot", async () => {
  // Simulate the operator saving mode=auto via the dashboard PUT handler.
  await updateSettings({ thinkingBudget: { mode: "auto" } });

  // Simulate a fresh boot: config is at its DEFAULT until the hydrator runs.
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  assert.equal(getThinkingBudgetConfig().mode, "passthrough", "pre-hydration baseline");

  const settings = await getSettings();
  const applied = hydrateThinkingBudgetConfig(settings);

  assert.equal(applied, true, "hydrator must report it applied a config");
  assert.equal(getThinkingBudgetConfig().mode, "auto", "operator mode must survive restart");
});

test("#5312 RC-A: custom budget fields are restored verbatim", async () => {
  await updateSettings({
    thinkingBudget: { mode: "custom", customBudget: 4096, effortLevel: "low" },
  });
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);

  const settings = await getSettings();
  assert.equal(hydrateThinkingBudgetConfig(settings), true);

  const cfg = getThinkingBudgetConfig();
  assert.equal(cfg.mode, "custom");
  assert.equal(cfg.customBudget, 4096);
  assert.equal(cfg.effortLevel, "low");
});

test("#5312 RC-A: no behavior change when the setting is unset", async () => {
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  const applied = hydrateThinkingBudgetConfig({});
  assert.equal(applied, false, "hydrator must be a no-op when thinkingBudget is absent");
  assert.equal(getThinkingBudgetConfig().mode, "passthrough");
});
