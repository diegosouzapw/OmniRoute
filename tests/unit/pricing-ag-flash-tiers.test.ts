import test from "node:test";
import assert from "node:assert/strict";

import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

// Antigravity exposes Gemini 3.5 Flash via three public client IDs in
// ANTIGRAVITY_PUBLIC_MODELS (`open-sse/config/antigravityModelAliases.ts`):
//   - gemini-3.5-flash-extra-low → "Gemini 3.5 Flash (Low)" — upstream Low tier
//   - gemini-3-flash-agent   → "Gemini 3.5 Flash (High)"   — upstream High tier
//   - gemini-3.5-flash-low   → "Gemini 3.5 Flash (Medium)" — upstream Medium tier
//   - gemini-pro-agent       → "Gemini 3.1 Pro (High)"     — upstream Pro High alias
// All three were missing pricing rows in `ag` (DEFAULT_PRICING.ag), so
// getPricingForModel("ag", id) returned null and downstream cost / quota
// calculations silently fell back to $0. Each row matches its upstream quota tier.

for (const [modelId, tier] of [
  ["gemini-3.5-flash-extra-low", "Low"],
  ["gemini-3.5-flash-low", "Medium"],
  ["gemini-3-flash-agent", "High"],
] as const) {
  test(`ag/${modelId} matches the Gemini 3.5 Flash (${tier}) tier`, () => {
    const p = getDefaultPricing().ag[modelId];
    assert.ok(p);
    assert.equal(p.input, 0.5);
    assert.equal(p.output, 3.0);
    assert.equal(p.cached, 0.03);
    assert.equal(p.reasoning, 4.5);
    assert.equal(p.cache_creation, 0.5);
  });
}

test("ag/gemini-pro-agent matches the Gemini 3.1 Pro (High) tier", () => {
  const p = getDefaultPricing().ag["gemini-pro-agent"];
  assert.equal(p.input, 4.0);
  assert.equal(p.output, 18.0);
  assert.equal(p.cached, 0.5);
  assert.equal(p.reasoning, 27.0);
  assert.equal(p.cache_creation, 4.0);
});
