/**
 * tests/unit/combo-max-global-attempts-config.test.ts
 *
 * Issue #11134: the shared per-request combo attempt budget was the hardcoded
 * `MAX_GLOBAL_ATTEMPTS = 30` in comboPredicates.ts, with no env/config override
 * (confirmed by the repo owner on the issue). Operators running large combos
 * (or wanting to fail fast on a dead pool) could neither raise nor lower it.
 *
 * This mirrors the established `clampComboDepth` pattern exactly: an operator
 * knob (`config.maxGlobalAttempts`) that can raise the default (30) or lower it,
 * but never above `MAX_GLOBAL_ATTEMPTS_HARD_CAP` — an unbounded attempt budget
 * is the same runaway-request DoS risk that motivated MAX_COMBO_DEPTH_HARD_CAP.
 */
import test from "node:test";
import assert from "node:assert/strict";

test("clampGlobalAttempts — clamps to [1, hard cap]; invalid → default 30", async () => {
  const { clampGlobalAttempts, MAX_GLOBAL_ATTEMPTS, MAX_GLOBAL_ATTEMPTS_HARD_CAP } =
    await import("../../open-sse/services/combo.ts");
  assert.equal(MAX_GLOBAL_ATTEMPTS, 30, "default budget unchanged");
  assert.equal(MAX_GLOBAL_ATTEMPTS_HARD_CAP, 200, "absolute safety ceiling");

  // Honors a LOWER configured budget (fail fast on a dead pool — the #11134 symptom).
  assert.equal(clampGlobalAttempts(1), 1);
  assert.equal(clampGlobalAttempts(5), 5);
  // Honors a HIGHER configured budget (large combos legitimately need more).
  assert.equal(clampGlobalAttempts(120), 120);
  // …but never past the hard cap.
  assert.equal(clampGlobalAttempts(10_000), 200, "hard cap at 200");
  // Invalid values fall back to the default, never disabling the budget.
  assert.equal(clampGlobalAttempts(0), 30, "0 invalid → default 30");
  assert.equal(clampGlobalAttempts(-4), 30, "negative → default 30");
  assert.equal(clampGlobalAttempts(undefined), 30, "undefined → default 30");
  assert.equal(clampGlobalAttempts("abc"), 30, "non-numeric → default 30");
  assert.equal(clampGlobalAttempts(Number.NaN), 30, "NaN → default 30");
  assert.equal(clampGlobalAttempts(Infinity), 30, "Infinity → default 30 (never unbounded)");
  assert.equal(clampGlobalAttempts(4.9), 4, "floors to 4");
});

test("DEFAULT_COMBO_CONFIG — exposes maxGlobalAttempts so the cascade can override it", async () => {
  const { getDefaultComboConfig, resolveComboConfig } =
    await import("../../open-sse/services/comboConfig.ts");
  assert.equal(getDefaultComboConfig().maxGlobalAttempts, 30, "default present in config surface");

  // Per-combo config wins over the global default (standard cascade).
  const resolved = resolveComboConfig({ config: { maxGlobalAttempts: 7 } }, {});
  assert.equal(resolved.maxGlobalAttempts, 7);

  // settings.comboDefaults layer also applies.
  const fromGlobal = resolveComboConfig({}, { comboDefaults: { maxGlobalAttempts: 50 } });
  assert.equal(fromGlobal.maxGlobalAttempts, 50);
});

test("dispatchPrelude — configured budget reaches nesting.attemptBudget.limit", async () => {
  const { buildDefaultNesting } = await import("../../open-sse/services/combo/dispatchPrelude.ts");
  // buildDefaultNesting only reads maxComboDepth/maxGlobalAttempts off config;
  // the full resolved-config type is irrelevant to this assertion.
  const build = (cfg: Record<string, unknown>) =>
    (
      buildDefaultNesting as (
        n: null,
        name: string,
        c: unknown
      ) => { attemptBudget: { limit: number } }
    )(null, "c", cfg);

  // Unset → historical default of 30.
  assert.equal(build({}).attemptBudget.limit, 30);
  // Configured lower → honored (fail fast).
  assert.equal(build({ maxGlobalAttempts: 6 }).attemptBudget.limit, 6);
  // Configured higher → honored.
  assert.equal(build({ maxGlobalAttempts: 90 }).attemptBudget.limit, 90);
  // Absurd → hard-capped, never unbounded.
  assert.equal(build({ maxGlobalAttempts: 1e9 }).attemptBudget.limit, 200);
});

test("combo schema — accepts maxGlobalAttempts within the hard cap, rejects beyond", async () => {
  const { comboRuntimeConfigSchema: schema } =
    await import("../../src/shared/validation/schemas/combo.ts");
  assert.equal(schema.parse({ maxGlobalAttempts: 45 }).maxGlobalAttempts, 45);
  assert.equal(schema.safeParse({ maxGlobalAttempts: 201 }).success, false, "beyond hard cap");
  assert.equal(schema.safeParse({ maxGlobalAttempts: 0 }).success, false, "0 rejected");
});
