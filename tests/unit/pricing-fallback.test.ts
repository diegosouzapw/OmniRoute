// tests/unit/pricing-fallback.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { getModelPricing, KNOWN_MODEL_PRICING } from "../../open-sse/services/providerCostData.ts";

// `ai21/jamba-large-1.7` is a documented free model (FREE_MODEL_BUDGETS,
// one-time-initial) that is NOT in the table (grep jamba -> 0 hit).
// `openai/gpt-4o` is paid. Fixtures are verbatim catalog ids — never a suffixed
// invention (Set.has is exact: a mutilated id is no longer in the catalog).
test("off-table free model is free, never premium-priced", () => {
  const p = getModelPricing("ai21", "jamba-large-1.7");
  assert.equal(p.isFree, true);
  assert.equal(p.inputCostPer1M, 0);
  assert.equal(p.outputCostPer1M, 0);
  assert.equal(p.isEstimated, false);
});

test("prefixed model id still resolves through the catalog", () => {
  const p = getModelPricing("ai21", "ai21/jamba-large-1.7");
  assert.equal(p.isFree, true);
});

test("off-table paid model keeps the conservative fallback", () => {
  const p = getModelPricing("openai", "gpt-9-never-existed");
  assert.equal(p.isFree, false);
  assert.equal(p.inputCostPer1M, 5.0);
  assert.equal(p.outputCostPer1M, 15.0);
  assert.equal(p.isEstimated, true);
});

test("empty model id falls back to the estimated guess without throwing", () => {
  const p = getModelPricing("openai", "");
  assert.equal(p.inputCostPer1M, 5.0);
  assert.equal(p.isEstimated, true);
});

test("table hits are untouched", () => {
  assert.equal(Object.keys(KNOWN_MODEL_PRICING).length, 24);
  assert.deepEqual(getModelPricing("openai", "gpt-4o"), {
    ...KNOWN_MODEL_PRICING["gpt-4o"],
    isEstimated: false,
  });
  assert.deepEqual(getModelPricing("longcat", "LongCat-2.0"), {
    ...KNOWN_MODEL_PRICING["longcat-2.0"],
    isEstimated: false,
  });
  // Spread preserves the quota field and never mutates the shared table.
  assert.equal(getModelPricing("longcat", "LongCat-2.0").freeQuotaLimit, 10000000);
  assert.equal("isEstimated" in KNOWN_MODEL_PRICING["gpt-4o"], false);
});
