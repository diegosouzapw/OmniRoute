import test from "node:test";
import assert from "node:assert/strict";

import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

const EXPECTED_GEMINI_3_7_PROMO_PRICING = {
  input: 0.75,
  output: 3.75,
  cached: 0.075,
  reasoning: 3.75,
  cache_creation: 0.75,
};

const ACTIVE_FLASH_IDS = [
  "gemini-3.8-flash-low",
  "gemini-3.8-flash-medium",
  "gemini-3.8-flash-high",
] as const;

const RETIRED_ANTIGRAVITY_FLASH_IDS = [
  "gemini-3.6-flash-low",
  "gemini-3.6-flash-medium",
  "gemini-3.6-flash-high",
  "gemini-3.5-flash-extra-low",
  "gemini-3.5-flash-low",
  "gemini-3.5-flash-medium",
  "gemini-3.5-flash-high",
  "gemini-3-flash-agent",
] as const;

test("Antigravity provider namespaces price every live Gemini 3.8 Flash tier", () => {
  const pricing = getDefaultPricing() as Record<string, Record<string, unknown>>;

  for (const provider of ["ag", "antigravity", "agy"] as const) {
    for (const modelId of ACTIVE_FLASH_IDS) {
      assert.deepEqual(pricing[provider][modelId], EXPECTED_GEMINI_3_7_PROMO_PRICING);
    }
  }
});

test("Antigravity pricing excludes retired Flash ids without affecting other providers", () => {
  const pricing = getDefaultPricing() as Record<string, Record<string, unknown>>;

  for (const provider of ["ag", "antigravity", "agy"] as const) {
    for (const modelId of RETIRED_ANTIGRAVITY_FLASH_IDS) {
      assert.equal(pricing[provider][modelId], undefined, `${provider}/${modelId}`);
    }
  }

  assert.ok(
    pricing.orcarouter["google/gemini-3.6-flash"],
    "OrcaRouter must retain the Gemini 3.6 model it still serves"
  );
});
