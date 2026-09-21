import assert from "node:assert/strict";
import test from "node:test";

import {
  computeFreeModelTotals,
  FREE_MODEL_BUDGETS,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";

/**
 * `eligibilityGate` changes COUNTING only: a gated row leaves the steady
 * headline (and the pool count) and lands in `gatedRecurringTokens`,
 * pool-deduped exactly like the headline. The regime stays what it is.
 */
const base = { creditTokens: 0, tos: "caution" as const };
const entries: Array<FreeModelBudget & { enabled?: boolean }> = [
  {
    provider: "a",
    modelId: "a1",
    displayName: "A1",
    monthlyTokens: 100,
    freeType: "recurring-daily",
    poolKey: "a-pool",
    ...base,
  },
  {
    provider: "a",
    modelId: "a2",
    displayName: "A2",
    monthlyTokens: 100,
    freeType: "recurring-daily",
    poolKey: "a-pool",
    ...base,
  },
  {
    provider: "g",
    modelId: "g1",
    displayName: "G1",
    monthlyTokens: 60,
    freeType: "recurring-daily",
    poolKey: "g-pool",
    eligibilityGate: "regional-identity",
    ...base,
  },
  {
    provider: "g",
    modelId: "g2",
    displayName: "G2",
    monthlyTokens: 60,
    freeType: "recurring-daily",
    poolKey: "g-pool",
    eligibilityGate: "regional-identity",
    ...base,
  },
  {
    provider: "h",
    modelId: "h1",
    displayName: "H1",
    monthlyTokens: 7,
    freeType: "recurring-monthly",
    poolKey: null,
    eligibilityGate: "regional-identity",
    ...base,
  },
  {
    provider: "u",
    modelId: "u1",
    displayName: "U1",
    monthlyTokens: 0,
    freeType: "recurring-uncapped",
    poolKey: "u-pool",
    eligibilityGate: "regional-identity",
    ...base,
  },
];

test("gated entries leave the steady headline and the pool count", () => {
  const t = computeFreeModelTotals({ entries });
  assert.equal(t.steadyRecurringTokens, 100);
  assert.equal(t.poolCount, 1);
  assert.equal(t.firstMonthRealisticTokens, 100);
});

test("gated entries are summed apart, pool-deduped, with their providers listed", () => {
  const t = computeFreeModelTotals({ entries });
  assert.equal(t.gatedRecurringTokens, 67); // g-pool once (60) + h1 (7); the uncapped u1 adds 0
  assert.deepEqual(t.gatedProviders, ["g", "h"]);
});

test("a disabled gated entry contributes nothing", () => {
  const t = computeFreeModelTotals({
    entries: entries.map((e) => (e.provider === "h" ? { ...e, enabled: false } : e)),
  });
  assert.equal(t.gatedRecurringTokens, 60);
  assert.deepEqual(t.gatedProviders, ["g"]);
});

test("excludeTosAvoid applies to gated entries too", () => {
  const t = computeFreeModelTotals({
    excludeTosAvoid: true,
    entries: entries.map((e) => (e.provider === "g" ? { ...e, tos: "avoid" as const } : e)),
  });
  assert.equal(t.gatedRecurringTokens, 7);
  assert.deepEqual(t.gatedProviders, ["h"]);
});

test("a gated signup credit never enters the first-month figure", () => {
  const baseline = computeFreeModelTotals({ entries });
  const withGatedCredit = computeFreeModelTotals({
    entries: [
      ...entries,
      {
        provider: "c",
        modelId: "c1",
        displayName: "C1",
        monthlyTokens: 0,
        freeType: "one-time-initial",
        poolKey: null,
        creditTokens: 1000,
        tos: "caution",
        eligibilityGate: "regional-identity",
      },
    ],
  });
  assert.equal(
    withGatedCredit.firstMonthRealisticTokens,
    baseline.firstMonthRealisticTokens,
    "a gated one-time credit must not inflate the first-month headline"
  );
  assert.equal(
    withGatedCredit.steadyWithRecurringCreditsTokens,
    baseline.steadyWithRecurringCreditsTokens
  );
});

test("a gated uncapped provider is not advertised as permanently free", () => {
  const t = computeFreeModelTotals({ entries });
  // `u` is the gated recurring-uncapped row in the fixture above.
  assert.ok(!t.uncappedProviders.includes("u"), "gated rows must stay out of uncappedProviders");
  assert.deepEqual(t.uncappedProviders, []);
});

test("the shipped catalog exposes the two new fields", () => {
  const t = computeFreeModelTotals();
  assert.equal(typeof t.gatedRecurringTokens, "number");
  assert.ok(Array.isArray(t.gatedProviders));
});

/**
 * Invariant: the gated bucket only ever accounts for STEADY tokens. A gated row
 * carrying credits would silently drop them from every figure (credits are filtered
 * out of the credit sums, and `gatedRecurringTokens` only sums `monthlyTokens`), so
 * such a row must not exist in the shipped catalog without the totals growing a
 * matching gated-credit figure first.
 */
test("shipped gated rows carry no credit tokens", () => {
  for (const m of FREE_MODEL_BUDGETS) {
    if (!m.eligibilityGate) continue;
    assert.equal(
      m.creditTokens,
      0,
      `${m.provider}/${m.modelId} is eligibility-gated but declares creditTokens=${m.creditTokens}`
    );
  }
});
