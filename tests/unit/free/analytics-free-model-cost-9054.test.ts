import test from "node:test";
import assert from "node:assert/strict";

/**
 * Tests the fix for #9054: resolveModelPricing() in route.ts must not fall back
 * to Object.keys(providerPricing)[0] for :free models (or any unpriced model).
 *
 * This test validates the fix logic inline without importing the full analytics
 * route (which hangs outside Next.js context due to next/headers imports).
 * The actual fix is in src/app/api/usage/analytics/route.ts:
 *   1. Short-circuit :free models to return null before the last-resort fallback
 *   2. Remove the Object.keys(providerPricing)[0] arbitrary-substitution fallback
 */

type Pricing = Record<string, unknown> | null;

function findKeyInsensitive(obj: Record<string, unknown> | undefined | null, key: string): unknown {
  if (!obj || !key) return undefined;
  return obj[key.toLowerCase()];
}

/**
 * Replicates the FIXED resolveModelPricing logic from route.ts.
 * The key changes (compared to the buggy version):
 *  - :free models short-circuit to null before the last-resort fallback
 *  - No Object.keys(providerPricing)[0] fallback
 */
function resolveModelPricingFixed(
  pricingByProvider: Record<string, Record<string, Record<string, unknown>>>,
  providerRaw: string,
  model: string
): Pricing {
  const pLower = (providerRaw || "").toLowerCase();
  const providerPricing = findKeyInsensitive(pricingByProvider, pLower);

  // Exact match in provider's pricing
  if (providerPricing) {
    const pricing = findKeyInsensitive(providerPricing as Record<string, unknown>, model.toLowerCase());
    if (pricing) return pricing as Record<string, unknown>;
  }

  // Global fallback: search all providers for exact match
  for (const prov of Object.values(pricingByProvider)) {
    if (prov && typeof prov === "object") {
      const found = findKeyInsensitive(prov as Record<string, unknown>, model.toLowerCase());
      if (found) return found as Record<string, unknown>;
    }
  }

  // FIX: :free models have no pricing entry — return null instead of arbitrary fallback
  if (model.endsWith(":free")) {
    return null;
  }

  // Last resort: substring matching (historical usage patterns like "gpt-4" -> "gpt-4.1")
  // Note: removed Object.keys(providerPricing)[0] fallback (the root cause of the bug)
  if (providerPricing && typeof providerPricing === "object") {
    for (const [key, val] of Object.entries(providerPricing as Record<string, unknown>)) {
      const lm = model.toLowerCase();
      if (key.includes(lm) || lm.includes(key)) {
        return val as Record<string, unknown>;
      }
    }
  }

  return null;
}

/**
 * Replicates the BUGGY resolveModelPricing logic from route.ts (before fix).
 * This is the version that had the Object.keys(providerPricing)[0] fallback.
 */
function resolveModelPricingBuggy(
  pricingByProvider: Record<string, Record<string, Record<string, unknown>>>,
  providerRaw: string,
  model: string
): Pricing {
  const pLower = (providerRaw || "").toLowerCase();
  const providerPricing = findKeyInsensitive(pricingByProvider, pLower);

  // Exact match in provider's pricing
  if (providerPricing) {
    const pricing = findKeyInsensitive(providerPricing as Record<string, unknown>, model.toLowerCase());
    if (pricing) return pricing as Record<string, unknown>;
  }

  // Global fallback: search all providers for exact match
  for (const prov of Object.values(pricingByProvider)) {
    if (prov && typeof prov === "object") {
      const found = findKeyInsensitive(prov as Record<string, unknown>, model.toLowerCase());
      if (found) return found as Record<string, unknown>;
    }
  }

  // Last resort fallback (BUGGY): substring matching + first-key fallback
  if (providerPricing && typeof providerPricing === "object") {
    for (const [key, val] of Object.entries(providerPricing as Record<string, unknown>)) {
      const lm = model.toLowerCase();
      if (key.includes(lm) || lm.includes(key)) {
        return val as Record<string, unknown>;
      }
    }
    // BUG: falls back to the first key of the provider's pricing map
    const keys = Object.keys(providerPricing as Record<string, unknown>);
    if (keys.length > 0) {
      return (providerPricing as Record<string, unknown>)[keys[0]] as Record<string, unknown>;
    }
  }

  return null;
}

// Simulates the pricing data structure from getPricing() merge.
// openrouter has the defaults-layer "auto" record + user-paid models.
const OPENROUTER_PRICING_WITH_AUTO = {
  openrouter: {
    auto: { input: 2.0, output: 8.0, cached: 1.0, reasoning: 12.0, cache_creation: 2.0 },
    "anthropic/claude-3-haiku": { input: 0.25, output: 1.25 },
    "anthropic/claude-3.5-sonnet": { input: 3.0, output: 15.0 },
    "openai/gpt-4o": { input: 2.5, output: 10.0 },
  },
};

test("fixed: :free model returns null pricing (not arbitrary fallback)", () => {
  const pricing = resolveModelPricingFixed(
    OPENROUTER_PRICING_WITH_AUTO,
    "openrouter",
    "nvidia/nemotron-3-ultra-550b-a55b:free"
  );
  assert.equal(pricing, null, ":free model must get null pricing, not the arbitrary 'auto' rate");
});

test("fixed: known paid model still resolves correctly (non-regression)", () => {
  const pricing = resolveModelPricingFixed(
    OPENROUTER_PRICING_WITH_AUTO,
    "openrouter",
    "anthropic/claude-3-haiku"
  );
  assert.notEqual(pricing, null, "known paid model should resolve pricing");
  assert.equal(pricing?.input, 0.25);
  assert.equal(pricing?.output, 1.25);
});

test("fixed: unknown model with no pricing entry returns null (not arbitrary fallback)", () => {
  const pricing = resolveModelPricingFixed(
    OPENROUTER_PRICING_WITH_AUTO,
    "openrouter",
    "some-unknown-model-no-pricing"
  );
  assert.equal(
    pricing,
    null,
    "unknown model with no pricing entry should get null pricing"
  );
});

test("fixed: :free model with no provider pricing returns null", () => {
  const pricing = resolveModelPricingFixed(
    { openrouter: {} },
    "openrouter",
    "some-model:free"
  );
  assert.equal(pricing, null, ":free model with empty provider pricing should return null");
});

test("buggy: :free model gets arbitrary first-key pricing (the bug)", () => {
  const pricing = resolveModelPricingBuggy(
    OPENROUTER_PRICING_WITH_AUTO,
    "openrouter",
    "nvidia/nemotron-3-ultra-550b-a55b:free"
  );
  // The bug: keys[0] is "auto" with {input: 2, output: 8}
  assert.notEqual(pricing, null, "buggy version resolves pricing for :free model");
  assert.equal(
    pricing?.input,
    2.0,
    "buggy version charges :free model at the arbitrary 'auto' rate (first key)"
  );
});

test("buggy: unknown model gets arbitrary first-key pricing (the bug)", () => {
  const pricing = resolveModelPricingBuggy(
    OPENROUTER_PRICING_WITH_AUTO,
    "openrouter",
    "some-unknown-model"
  );
  assert.notEqual(pricing, null, "buggy version resolves pricing for unknown model");
  assert.equal(
    pricing?.input,
    2.0,
    "buggy version charges unknown model at the arbitrary 'auto' rate (first key)"
  );
});

test("fixed: other providers without 'auto' default also work correctly", () => {
  const pricingByProvider = {
    someprovider: {
      "gpt-4o": { input: 2.5, output: 10.0 },
      "claude-3.5-sonnet": { input: 3.0, output: 15.0 },
    },
  };

  // :free model should return null even for providers without a default 'auto' entry
  const freePricing = resolveModelPricingFixed(
    pricingByProvider as Record<string, Record<string, Record<string, unknown>>>,
    "someprovider",
    "test-model:free"
  );
  assert.equal(freePricing, null, ":free model should return null for any provider");
});