import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateCost,
  calculateCostDetailed,
  normalizeModelName,
} from "../../src/lib/usage/costCalculator.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

const BILLABLE_TOKENS = { input: 1_000_000, output: 1_000_000 };
const PROVIDERS_WITH_UNPRICED_AUTO_MODEL = ["cursor", "factory", "trae", "dify", "llm-kiwi"];

test('normalizeModelName is a no-op for a bare alias like "auto"', () => {
  assert.equal(normalizeModelName("auto"), "auto");
});

test('no pricing source carries an entry for the literal "auto" model id, for providers whose registry offers it as a real model', () => {
  const pricing = getDefaultPricing() as Record<string, Record<string, unknown>>;
  for (const provider of PROVIDERS_WITH_UNPRICED_AUTO_MODEL) {
    const providerPricing = pricing[provider];
    assert.ok(!providerPricing || !providerPricing["auto"], `expected no DEFAULT_PRICING entry for ${provider}/auto`);
  }
});

test('calculateCost() still returns $0 for a real, billable completion routed through the unpriced "auto" alias (unchanged legacy contract)', async () => {
  const cost = await calculateCost("cursor", "auto", BILLABLE_TOKENS);
  assert.equal(cost, 0, "calculateCost's numeric contract is unchanged — $0 for unpriced usage");
});

test('#12341 fix: calculateCostDetailed() flags the "auto" alias as unpriced instead of a bare, indistinguishable $0', async () => {
  for (const provider of PROVIDERS_WITH_UNPRICED_AUTO_MODEL) {
    const result = await calculateCostDetailed(provider, "auto", BILLABLE_TOKENS);
    assert.equal(result.costUsd, 0, `expected $0 for ${provider}/auto`);
    assert.equal(result.priced, false, `expected ${provider}/auto to be reported as unpriced`);
  }
});

test("control: calculateCostDetailed() DOES price a normal, non-alias model correctly and reports it as priced", async () => {
  const result = await calculateCostDetailed("openai", "gpt-4o", BILLABLE_TOKENS);
  assert.ok(result.costUsd > 0, `expected a known model to price above $0, got ${result.costUsd}`);
  assert.equal(result.priced, true);
});
