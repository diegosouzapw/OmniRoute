/**
 * Integration tests for models.dev sync: live fetch → DB save → retrieve → resolution order.
 *
 * Uses a test DB file in /tmp to avoid touching production data.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { unlinkSync, existsSync } from "node:fs";

// Point DB at a temp file
const TEST_DB = "/tmp/omniroute-test-modelsdev.sqlite";

before(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB);
  process.env.DATA_DIR = "/tmp";
  process.env.DB_FILE = TEST_DB;
});

after(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB);
});

describe("modelsDevSync — integration: live fetch → DB → retrieve", () => {
  it("fetches, saves pricing, and retrieves from DB", async () => {
    const {
      syncModelsDev,
      getModelsDevPricing,
      getSyncedCapabilities,
      clearModelsDevPricing,
      clearModelsDevCapabilities,
    } = await import("../../src/lib/modelsDevSync.ts");

    // 1. Sync from live API
    const result = await syncModelsDev({ dryRun: false, syncCapabilities: true });
    assert.equal(result.success, true, `sync should succeed: ${result.error || ""}`);
    assert.ok(result.modelCount > 0, `should have pricing entries, got ${result.modelCount}`);
    assert.ok(result.providerCount > 0, `should have providers, got ${result.providerCount}`);
    assert.ok(
      result.capabilityCount > 0,
      `should have capabilities, got ${result.capabilityCount}`
    );

    // 2. Retrieve pricing from DB
    const pricing = getModelsDevPricing();
    assert.ok(Object.keys(pricing).length > 0, "should have pricing in DB");

    // 3. Verify specific known models
    assert.ok(pricing.openai, "openai pricing should exist");
    assert.ok(pricing.openai["gpt-4o"], "gpt-4o pricing should exist in openai");
    assert.ok(pricing.openai["gpt-4o"].input > 0, "gpt-4o input price should be > 0");
    assert.ok(pricing.openai["gpt-4o"].output > 0, "gpt-4o output price should be > 0");

    assert.ok(pricing.anthropic, "anthropic pricing should exist");
    const claudeModels = Object.keys(pricing.anthropic).filter((m) => m.includes("claude"));
    assert.ok(claudeModels.length > 0, "should have claude pricing entries");

    assert.ok(pricing.deepseek, "deepseek pricing should exist");
    assert.ok(pricing.if, "if (Qoder) pricing should exist (mapped from deepseek)");

    // 4. Retrieve capabilities from DB
    const caps = getSyncedCapabilities();
    assert.ok(Object.keys(caps).length > 0, "should have capabilities in DB");

    assert.ok(caps.openai, "openai capabilities should exist");
    assert.ok(caps.openai["gpt-4o"], "gpt-4o capabilities should exist");
    assert.equal(caps.openai["gpt-4o"].tool_call, true);
    assert.equal(caps.openai["gpt-4o"].reasoning, false);
    assert.equal(caps.openai["gpt-4o"].attachment, true);

    // 5. Query specific capability
    const specificCaps = getSyncedCapabilities("openai", "gpt-4o");
    assert.ok(specificCaps.openai, "specific query should return openai");
    assert.ok(specificCaps.openai["gpt-4o"], "specific query should return gpt-4o");
    assert.equal(specificCaps.openai["gpt-4o"].limit_context, 128000);

    // 6. Cleanup
    clearModelsDevPricing();
    clearModelsDevCapabilities();

    const afterPricing = getModelsDevPricing();
    assert.equal(Object.keys(afterPricing).length, 0, "pricing should be cleared");

    const afterCaps = getSyncedCapabilities();
    assert.equal(Object.keys(afterCaps).length, 0, "capabilities should be cleared");
  });

  it("dryRun returns data without saving to DB", async () => {
    const { syncModelsDev, getModelsDevPricing, clearModelsDevPricing } =
      await import("../../src/lib/modelsDevSync.ts");

    // Clear any existing data first
    clearModelsDevPricing();

    const result = await syncModelsDev({ dryRun: true, syncCapabilities: false });
    assert.equal(result.success, true);
    assert.ok(result.data, "dryRun should return data");
    assert.ok(result.data.pricing, "dryRun should return pricing data");

    // Verify nothing was saved
    const pricing = getModelsDevPricing();
    assert.equal(Object.keys(pricing).length, 0, "dryRun should not save to DB");
  });

  it("sync without capabilities only saves pricing", async () => {
    const {
      syncModelsDev,
      getModelsDevPricing,
      getSyncedCapabilities,
      clearModelsDevPricing,
      clearModelsDevCapabilities,
    } = await import("../../src/lib/modelsDevSync.ts");

    clearModelsDevPricing();
    clearModelsDevCapabilities();

    const result = await syncModelsDev({ dryRun: false, syncCapabilities: false });
    assert.equal(result.success, true);
    assert.ok(result.modelCount > 0, "should have pricing entries");
    assert.equal(result.capabilityCount, 0, "capabilityCount should be 0 when disabled");

    // Pricing should be saved
    const pricing = getModelsDevPricing();
    assert.ok(Object.keys(pricing).length > 0, "pricing should be saved");

    // Capabilities should NOT be saved
    const caps = getSyncedCapabilities();
    assert.equal(Object.keys(caps).length, 0, "capabilities should not be saved");

    clearModelsDevPricing();
  });
});

describe("modelsDevSync — resolution order: user > models.dev > LiteLLM > default", () => {
  it("returns models.dev pricing when no user override exists", async () => {
    const { syncModelsDev, getModelsDevPricing, clearModelsDevPricing } =
      await import("../../src/lib/modelsDevSync.ts");

    clearModelsDevPricing();
    await syncModelsDev({ dryRun: false, syncCapabilities: false });

    const pricing = getModelsDevPricing();
    assert.ok(pricing.openai, "openai pricing should exist");
    assert.ok(pricing.openai["gpt-4o"], "gpt-4o should have models.dev pricing");

    clearModelsDevPricing();
  });

  it("getPricing() merges all layers correctly", async () => {
    const { getPricing } = await import("../../src/lib/db/settings.ts");
    const { syncModelsDev, clearModelsDevPricing, saveModelsDevPricing } =
      await import("../../src/lib/modelsDevSync.ts");
    const { updatePricing, resetPricing } = await import("../../src/lib/db/settings.ts");

    // Clear all synced data first
    clearModelsDevPricing();

    // Sync models.dev pricing
    await syncModelsDev({ dryRun: false, syncCapabilities: false });

    // Get merged pricing
    const merged = await getPricing();

    // Should have openai pricing (either from models.dev or hardcoded defaults)
    assert.ok(merged.openai || merged.cx, "should have openai/cx pricing in merged result");

    // Add a user override
    await updatePricing({
      openai: {
        "gpt-4o": { input: 999, output: 999 },
      },
    });

    // Verify user override wins
    const mergedWithOverride = await getPricing();
    assert.equal(
      mergedWithOverride.openai?.["gpt-4o"]?.input,
      999,
      "user override should win over models.dev"
    );

    // Reset the override
    await resetPricing("openai", "gpt-4o");
    clearModelsDevPricing();
  });
});
