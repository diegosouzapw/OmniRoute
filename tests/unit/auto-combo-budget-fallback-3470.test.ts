import test from "node:test";
import assert from "node:assert/strict";

import {
  BudgetExceededError,
  selectProvider,
} from "../../open-sse/services/autoCombo/engine.ts";
import {
  parseRequestBudgetFallback,
  resolveRequestAutoControls,
} from "../../open-sse/services/autoCombo/requestControls.ts";
import { getSelfHealingManager } from "../../open-sse/services/autoCombo/selfHealing.ts";
import { DEFAULT_WEIGHTS } from "../../open-sse/services/autoCombo/scoring.ts";

// #3470 — Auto-combo transparency + budget controls: `budgetFallback: "strict"`
// must refuse to select (instead of silently overspending) when EVERY candidate
// exceeds the configured `budgetCap`.

const healer = getSelfHealingManager();
const originalRandom = Math.random;

function resetHealer() {
  healer.exclusions.clear();
  healer.incidentMode = false;
}

const baseConfig = {
  id: "auto-main",
  name: "Auto Main Budget Strict",
  type: "auto" as const,
  candidatePool: [],
  weights: DEFAULT_WEIGHTS,
  explorationRate: 0,
};

const overBudgetCandidates = [
  {
    provider: "premium",
    model: "gpt-4o",
    quotaRemaining: 99,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 12000,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0.01,
    accountTier: "ultra",
    quotaResetIntervalSecs: 60,
  },
  {
    provider: "cheap",
    model: "gpt-4o-mini",
    quotaRemaining: 60,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 100,
    p95LatencyMs: 900,
    latencyStdDev: 50,
    errorRate: 0.02,
    accountTier: "free",
    quotaResetIntervalSecs: 86400,
  },
];

test.beforeEach(() => {
  resetHealer();
  Math.random = originalRandom;
});

test.afterEach(() => {
  resetHealer();
  Math.random = originalRandom;
});

test("selectProvider throws BudgetExceededError when budgetFallback='strict' and every candidate exceeds budgetCap", () => {
  assert.throws(
    () =>
      selectProvider(
        { ...baseConfig, budgetCap: 0.001, budgetFallback: "strict" },
        overBudgetCandidates,
        "default"
      ),
    BudgetExceededError
  );
});

test("BudgetExceededError message reports the cap and the cheapest candidate's cost, no stack leak", () => {
  try {
    selectProvider(
      { ...baseConfig, budgetCap: 0.001, budgetFallback: "strict" },
      overBudgetCandidates,
      "default"
    );
    assert.fail("expected selectProvider to throw");
  } catch (err) {
    assert.ok(err instanceof BudgetExceededError);
    assert.match(err.message, /budget cap of \$0\.0010/);
    assert.ok(!err.message.includes("at /"));
  }
});

test("selectProvider still falls back to cheapest when budgetFallback is 'cheapest' (default/legacy)", () => {
  const result = selectProvider(
    { ...baseConfig, budgetCap: 0.001, budgetFallback: "cheapest" },
    overBudgetCandidates,
    "default"
  );
  assert.equal(result.provider, "cheap");
});

test("selectProvider defaults to cheapest fallback when budgetFallback is unset (backward compatible)", () => {
  const result = selectProvider({ ...baseConfig, budgetCap: 0.001 }, overBudgetCandidates, "default");
  assert.equal(result.provider, "cheap");
});

test("selectProvider with strict fallback still picks a within-budget candidate normally", () => {
  const result = selectProvider(
    { ...baseConfig, budgetCap: 1, budgetFallback: "strict" },
    overBudgetCandidates,
    "default"
  );
  assert.equal(result.provider, "cheap");
});

test("parseRequestBudgetFallback: accepts 'strict' and its aliases", () => {
  assert.equal(parseRequestBudgetFallback("strict"), "strict");
  assert.equal(parseRequestBudgetFallback("BLOCK"), "strict");
  assert.equal(parseRequestBudgetFallback(" hard "), "strict");
});

test("parseRequestBudgetFallback: accepts 'cheapest' and its aliases", () => {
  assert.equal(parseRequestBudgetFallback("cheapest"), "cheapest");
  assert.equal(parseRequestBudgetFallback("Cheapest-Viable"), "cheapest");
  assert.equal(parseRequestBudgetFallback("soft"), "cheapest");
});

test("parseRequestBudgetFallback: ignores unknown/empty/non-string values", () => {
  assert.equal(parseRequestBudgetFallback("garbage"), undefined);
  assert.equal(parseRequestBudgetFallback(""), undefined);
  assert.equal(parseRequestBudgetFallback(null), undefined);
  assert.equal(parseRequestBudgetFallback(42), undefined);
});

test("resolveRequestAutoControls: aggregates mode/budget/budgetFallback headers, omitting unset ones", () => {
  const headers = new Headers({
    "x-omniroute-mode": "fast",
    "x-omniroute-budget": "0.05",
    "x-omniroute-budget-fallback": "strict",
  });
  const controls = resolveRequestAutoControls(headers);
  assert.deepEqual(controls, {
    mode: "fast",
    budgetCap: 0.05,
    budgetFallback: "strict",
  });
});

test("resolveRequestAutoControls: returns an empty object when no auto-combo headers are present", () => {
  const controls = resolveRequestAutoControls(new Headers());
  assert.deepEqual(controls, {});
});
