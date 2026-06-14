import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  initTierConfigTable,
  saveTierConfig,
  loadTierConfigFromDb,
  loadTierConfig,
} from "../../src/lib/db/tierConfig.ts";
import { DEFAULT_TIER_CONFIG } from "../../open-sse/services/tierConfig.ts";

describe("tierConfig DB module", () => {
  beforeEach(() => {
    initTierConfigTable();
  });

  it("loadTierConfigFromDb returns null when no config saved", () => {
    const result = loadTierConfigFromDb();
    assert.equal(result, null, "should return null when no config exists");
  });

  it("saveTierConfig persists and loadTierConfigFromDb retrieves", () => {
    const config = { ...DEFAULT_TIER_CONFIG };
    saveTierConfig(config);
    const loaded = loadTierConfigFromDb();
    assert.ok(loaded, "should return saved config");
    assert.ok(loaded!.freeProviders, "should have freeProviders");
  });

  it("loadTierConfig returns DEFAULT_TIER_CONFIG when no DB entry", () => {
    // loadTierConfig falls back to DEFAULT_TIER_CONFIG
    const result = loadTierConfig();
    assert.ok(result, "should return a config");
    assert.equal(typeof result.freeProviders, "object", "freeProviders should be an object");
  });

  it("saveTierConfig overwrites previous config", () => {
    const config1 = { ...DEFAULT_TIER_CONFIG };
    saveTierConfig(config1);
    const config2 = { ...DEFAULT_TIER_CONFIG };
    saveTierConfig(config2);
    const loaded = loadTierConfigFromDb();
    assert.ok(loaded, "should return config after overwrite");
  });

  it("loadTierConfigFromDb handles corrupted JSON gracefully", async () => {
    // Directly insert corrupted data
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();
    db.prepare(
      "INSERT OR REPLACE INTO tier_config (key, value, updated_at) VALUES ('tier_config', ?, datetime('now'))"
    ).run("not-valid-json{{{");
    const result = loadTierConfigFromDb();
    assert.equal(result, null, "should return null for corrupted JSON");
  });
});
