// tests/unit/tier-pricing-cache.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyTier, classifyTierAsync, clearTierCache } from "../../open-sse/services/tierResolver.ts";
import { updatePricing, resetPricing, resetAllPricing } from "../../src/lib/db/settings/pricing.ts";

test.beforeEach(() => clearTierCache());

test("async tier reflects a DB price write without restart", async () => {
  try {
    await updatePricing({ "testprov": { "testmodel-cache-1": { input: 0, output: 0 } } });
    const a = await classifyTierAsync("testprov", "testmodel-cache-1");
    assert.equal(a.tier, "free");
  } finally {
    await resetPricing("testprov", "testmodel-cache-1");
  }
});

test("resetAllPricing (full wipe, no read-cache bust) also falls back cleanly", async () => {
  try {
    await updatePricing({ "testprov": { "testmodel-cache-2": { input: 0, output: 0 } } });
    assert.equal((await classifyTierAsync("testprov", "testmodel-cache-2")).tier, "free");
    await resetAllPricing();
    const back = await classifyTierAsync("testprov", "testmodel-cache-2");
    assert.equal(back.tier, classifyTier("testprov", "testmodel-cache-2").tier);
  } finally {
    await resetPricing("testprov");
  }
});

test("async tier falls back to sync when DB is down", async () => {
  const a = await classifyTierAsync("openai", "gpt-4o");
  assert.deepEqual(a, classifyTier("openai", "gpt-4o"));
});

test("sync tier keeps serving the table while DB changes", async () => {
  // Fictitious model on a real provider: never pollutes shared state if cleanup fails.
  const before = classifyTier("openai", "gpt-9-never-existed");
  try {
    await updatePricing({ "openai": { "gpt-9-never-existed": { input: 0, output: 0 } } });
    const during = classifyTier("openai", "gpt-9-never-existed");
    assert.equal(during.tier, before.tier); // sync path untouched by DB
  } finally {
    await resetPricing("openai", "gpt-9-never-existed");
  }
});
