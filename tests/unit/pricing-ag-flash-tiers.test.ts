import test from "node:test";
import assert from "node:assert/strict";

import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

// Antigravity exposes Gemini 3.5 Flash via three public client IDs in
// ANTIGRAVITY_PUBLIC_MODELS (`open-sse/config/antigravityModelAliases.ts`):
//   - gemini-3-flash-agent   → "Gemini 3.5 Flash (High)"   — upstream High tier
//   - gemini-3.5-flash-low   → "Gemini 3.5 Flash (Medium)" — upstream Medium tier
//   - gemini-pro-agent       → "Gemini 3.1 Pro (High)"     — upstream Pro High alias
// All three were missing pricing rows in `ag` (DEFAULT_PRICING.ag), so
// getPricingForModel("ag", id) returned null and downstream cost / quota
// calculations silently fell back to $0. The same pricing schedule used for
// the legacy `gemini-3-flash` and `gemini-3.1-pro-high` rows applies (same
// per-MTok rates as the upstream quota tier they map to).

test("ag/gemini-3-flash-agent matches the Gemini 3.5 Flash (High) tier", () => {
  const p = getDefaultPricing().ag["gemini-3-flash-agent"];
  assert.equal(p.input, 0.5);
  assert.equal(p.output, 3.0);
  assert.equal(p.cached, 0.03);
  assert.equal(p.reasoning, 4.5);
  assert.equal(p.cache_creation, 0.5);
});

test("ag/gemini-3.5-flash-low matches the Gemini 3.5 Flash (Medium) tier", () => {
  const p = getDefaultPricing().ag["gemini-3.5-flash-low"];
  assert.equal(p.input, 0.5);
  assert.equal(p.output, 3.0);
  assert.equal(p.cached, 0.03);
  assert.equal(p.reasoning, 4.5);
  assert.equal(p.cache_creation, 0.5);
});

test("ag/gemini-pro-agent matches the Gemini 3.1 Pro (High) tier", () => {
  const p = getDefaultPricing().ag["gemini-pro-agent"];
  assert.equal(p.input, 4.0);
  assert.equal(p.output, 18.0);
  assert.equal(p.cached, 0.5);
  assert.equal(p.reasoning, 27.0);
  assert.equal(p.cache_creation, 4.0);
});
