import { describe, it, beforeEach, mock } from "node:test";
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

  it("loadTierConfigFromDb handles corrupted JSON gracefully (#4517)", async () => {
    // Reproduce the bug report: a hand-edited / partially written row contains
    // non-JSON garbage. We expect null + a warning, NOT a thrown error.
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();
    db.prepare(
      "INSERT OR REPLACE INTO tier_config (key, value, updated_at) VALUES ('tier_config', ?, datetime('now'))"
    ).run("not-valid-json{{{");

    // Spy on the logger to confirm we emit a warning that operators can spot.
    const loggerModule = await import("@omniroute/open-sse/utils/logger.ts");
    const warnSpy = mock.method(loggerModule.defaultLogger, "warn", () => {});

    try {
      const result = loadTierConfigFromDb();
      assert.equal(result, null, "should return null for corrupted JSON");
      assert.ok(
        warnSpy.mock.calls.length > 0,
        "should emit at least one warning so operators can spot the corruption"
      );
      // Sanity: loadTierConfig() still returns DEFAULT_TIER_CONFIG.
      const fallback = loadTierConfig();
      assert.deepEqual(fallback.freeProviders, DEFAULT_TIER_CONFIG.freeProviders);
    } finally {
      warnSpy.mock.restore();
    }
  });

  it("loadTierConfigFromDb handles valid JSON that fails Zod (#4517)", async () => {
    // JSON parses fine, but the shape doesn't match the schema (freeThreshold = -1
    // violates the min(0) constraint).
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();
    const badShape = JSON.stringify({
      version: "1.0.0",
      defaults: { freeThreshold: -1, cheapThreshold: 1.0 },
      providerOverrides: [],
      modelOverrides: [],
      freeProviders: [],
    });
    db.prepare(
      "INSERT OR REPLACE INTO tier_config (key, value, updated_at) VALUES ('tier_config', ?, datetime('now'))"
    ).run(badShape);

    const loggerModule = await import("@omniroute/open-sse/utils/logger.ts");
    const warnSpy = mock.method(loggerModule.defaultLogger, "warn", () => {});

    try {
      const result = loadTierConfigFromDb();
      assert.equal(result, null, "should return null for Zod-failing config");
      assert.ok(warnSpy.mock.calls.length > 0, "should log a warning on Zod failure");
    } finally {
      warnSpy.mock.restore();
    }
  });

  it("loadTierConfigFromDb truncates very long corrupted values in the warning preview (#4517)", async () => {
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();
    // 1000 chars of garbage — the warning preview must truncate to avoid log floods.
    const long = "{".repeat(1000);
    db.prepare(
      "INSERT OR REPLACE INTO tier_config (key, value, updated_at) VALUES ('tier_config', ?, datetime('now'))"
    ).run(long);

    const loggerModule = await import("@omniroute/open-sse/utils/logger.ts");
    const warnSpy = mock.method(loggerModule.defaultLogger, "warn", () => {});

    try {
      const result = loadTierConfigFromDb();
      assert.equal(result, null);
      assert.ok(warnSpy.mock.calls.length > 0);
      const payload = warnSpy.mock.calls[0].arguments[0] as Record<string, unknown>;
      const preview = typeof payload.value === "string" ? payload.value : "";
      assert.ok(
        preview.length <= 250,
        `warning preview should be truncated, got length=${preview.length}`
      );
    } finally {
      warnSpy.mock.restore();
    }
  });
});
