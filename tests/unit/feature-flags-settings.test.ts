import { describe, it, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Set DATA_DIR to temp dir before any imports that touch DB
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-flags-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");

const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");
const {
  getFeatureFlagOverrides,
  getFeatureFlagOverride,
  setFeatureFlagOverride,
  removeFeatureFlagOverride,
  clearAllFeatureFlagOverrides,
} = await import("../../src/lib/db/featureFlags.ts");
const {
  resolveFeatureFlag,
  isFeatureFlagEnabled,
  resolveAllFeatureFlags,
  isRequireApiKeyEnabled,
  isCcCompatibleProviderEnabled,
  isModelCatalogNamesEnabled,
  isArenaEloSyncEnabled,
  isControlPlaneProxyDirectFallbackEnabled,
} = await import("../../src/shared/utils/featureFlags.ts");

// ──────────────────────────────────────────────────────
// Test group 1 — Flag definitions registry
// ──────────────────────────────────────────────────────
describe("featureFlagDefinitions", () => {
  it("has exactly 34 flag definitions", () => {
    assert.strictEqual(FEATURE_FLAG_DEFINITIONS.length, 34);
  });

  it("has unique keys for all flags", () => {
    const keys = FEATURE_FLAG_DEFINITIONS.map((d) => d.key);
    assert.strictEqual(new Set(keys).size, 34);
  });

  it("has valid categories for all flags", () => {
    const valid = new Set(["security", "network", "policies", "runtime", "cli", "health"]);
    for (const d of FEATURE_FLAG_DEFINITIONS) {
      assert.ok(valid.has(d.category), `Invalid category "${d.category}" for ${d.key}`);
    }
  });

  it("has valid types (boolean or enum) for all flags", () => {
    for (const d of FEATURE_FLAG_DEFINITIONS) {
      assert.ok(d.type === "boolean" || d.type === "enum", `Invalid type for ${d.key}`);
    }
  });

  it("has enumValues for all enum-type flags", () => {
    const enumFlags = FEATURE_FLAG_DEFINITIONS.filter((d) => d.type === "enum");
    assert.ok(enumFlags.length > 0, "Should have at least one enum flag");
    for (const d of enumFlags) {
      assert.ok(
        Array.isArray(d.enumValues) && d.enumValues.length > 0,
        `Missing enumValues for ${d.key}`
      );
    }
  });

  it("does not have enumValues for boolean-type flags", () => {
    const boolFlags = FEATURE_FLAG_DEFINITIONS.filter((d) => d.type === "boolean");
    for (const d of boolFlags) {
      assert.ok(
        !d.enumValues || d.enumValues.length === 0,
        `Boolean flag ${d.key} should not have enumValues`
      );
    }
  });

  it("has warningLevel only with valid values when present", () => {
    const valid = new Set(["info", "caution", "danger"]);
    for (const d of FEATURE_FLAG_DEFINITIONS) {
      if (d.warningLevel !== undefined) {
        assert.ok(
          valid.has(d.warningLevel),
          `Invalid warningLevel "${d.warningLevel}" for ${d.key}`
        );
      }
    }
  });

  it("defines model catalog names as a runtime boolean flag enabled by default", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "MODEL_CATALOG_INCLUDE_NAMES");
    assert.ok(def, "MODEL_CATALOG_INCLUDE_NAMES should exist");
    assert.strictEqual(def.category, "runtime");
    assert.strictEqual(def.type, "boolean");
    assert.strictEqual(def.defaultValue, "true");
    assert.strictEqual(def.requiresRestart, false);
  });

  it("defines Arena ELO sync as a runtime boolean flag enabled by default", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "ARENA_ELO_SYNC_ENABLED");
    assert.ok(def, "ARENA_ELO_SYNC_ENABLED should exist");
    assert.strictEqual(def.category, "runtime");
    assert.strictEqual(def.type, "boolean");
    assert.strictEqual(def.defaultValue, "true");
    assert.strictEqual(def.requiresRestart, false);
  });

  it("defines emergency fallback as a runtime boolean flag enabled by default", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "OMNIROUTE_EMERGENCY_FALLBACK");
    assert.ok(def, "OMNIROUTE_EMERGENCY_FALLBACK should exist");
    assert.strictEqual(def.category, "runtime");
    assert.strictEqual(def.type, "boolean");
    assert.strictEqual(def.defaultValue, "true");
    assert.strictEqual(def.requiresRestart, false);
  });

  it("defines control-plane proxy direct fallback as a network boolean flag disabled by default", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find(
      (d) => d.key === "OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK"
    );
    assert.ok(def, "OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK should exist");
    assert.strictEqual(def.category, "network");
    assert.strictEqual(def.type, "boolean");
    assert.strictEqual(def.defaultValue, "false");
    assert.strictEqual(def.requiresRestart, false);
    assert.strictEqual(def.warningLevel, "danger");
  });
});

// ──────────────────────────────────────────────────────
// Test group 2 — DB module
// ──────────────────────────────────────────────────────
describe("featureFlags DB module", () => {
  function resetDb() {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  beforeEach(() => {
    resetDb();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("getFeatureFlagOverrides returns empty object when no overrides", () => {
    const overrides = getFeatureFlagOverrides();
    assert.deepStrictEqual(overrides, {});
  });

  it("setFeatureFlagOverride stores value in key_value table", () => {
    setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    const overrides = getFeatureFlagOverrides();
    assert.strictEqual(overrides["REQUIRE_API_KEY"], "true");
  });

  it("getFeatureFlagOverride returns the stored value", () => {
    setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    assert.strictEqual(getFeatureFlagOverride("REQUIRE_API_KEY"), "true");
  });

  it("getFeatureFlagOverride returns undefined for unset flag", () => {
    assert.strictEqual(getFeatureFlagOverride("REQUIRE_API_KEY"), undefined);
  });

  it("removeFeatureFlagOverride deletes the override", () => {
    setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    removeFeatureFlagOverride("REQUIRE_API_KEY");
    assert.strictEqual(getFeatureFlagOverride("REQUIRE_API_KEY"), undefined);
  });

  it("clearAllFeatureFlagOverrides removes all overrides", () => {
    setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    setFeatureFlagOverride("INPUT_SANITIZER_ENABLED", "true");
    clearAllFeatureFlagOverrides();
    assert.deepStrictEqual(getFeatureFlagOverrides(), {});
  });

  it("setFeatureFlagOverride overwrites existing value", () => {
    setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    setFeatureFlagOverride("REQUIRE_API_KEY", "false");
    assert.strictEqual(getFeatureFlagOverride("REQUIRE_API_KEY"), "false");
  });
});

// ──────────────────────────────────────────────────────
// Test group 3 — Resolver
// ──────────────────────────────────────────────────────
describe("resolveFeatureFlag", () => {
  function resetDb() {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  beforeEach(() => {
    resetDb();
    delete process.env["REQUIRE_API_KEY"];
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true });
    delete process.env["REQUIRE_API_KEY"];
  });

  it("returns DB override when set", () => {
    setFeatureFlagOverride("REQUIRE_API_KEY", "true");
    assert.strictEqual(resolveFeatureFlag("REQUIRE_API_KEY"), "true");
  });

  it("falls back to ENV when no DB override", () => {
    process.env["REQUIRE_API_KEY"] = "true";
    assert.strictEqual(resolveFeatureFlag("REQUIRE_API_KEY"), "true");
    delete process.env["REQUIRE_API_KEY"];
  });

  it("falls back to default when neither DB nor ENV", () => {
    assert.strictEqual(resolveFeatureFlag("REQUIRE_API_KEY"), "false");
  });

  it("DB takes priority over ENV", () => {
    process.env["REQUIRE_API_KEY"] = "env-value";
    setFeatureFlagOverride("REQUIRE_API_KEY", "db-value");
    assert.strictEqual(resolveFeatureFlag("REQUIRE_API_KEY"), "db-value");
    delete process.env["REQUIRE_API_KEY"];
  });

  describe("isFeatureFlagEnabled", () => {
    it("returns true for 'true'", () => {
      setFeatureFlagOverride("REQUIRE_API_KEY", "true");
      assert.ok(isFeatureFlagEnabled("REQUIRE_API_KEY"));
    });

    it("returns true for '1'", () => {
      setFeatureFlagOverride("SKILLS_SANDBOX_NETWORK_ENABLED", "1");
      assert.ok(isFeatureFlagEnabled("SKILLS_SANDBOX_NETWORK_ENABLED"));
    });

    it("returns true for 'yes'", () => {
      setFeatureFlagOverride("REQUIRE_API_KEY", "yes");
      assert.ok(isFeatureFlagEnabled("REQUIRE_API_KEY"));
    });

    it("returns false for 'false'", () => {
      assert.ok(!isFeatureFlagEnabled("REQUIRE_API_KEY"));
    });

    it("returns false for '0'", () => {
      setFeatureFlagOverride("REQUIRE_API_KEY", "0");
      assert.ok(!isFeatureFlagEnabled("REQUIRE_API_KEY"));
    });

    it("returns false for empty string via ENV (falls to default)", () => {
      process.env["REQUIRE_API_KEY"] = "";
      assert.ok(!isFeatureFlagEnabled("REQUIRE_API_KEY"));
      delete process.env["REQUIRE_API_KEY"];
    });
  });

  describe("resolveAllFeatureFlags", () => {
    it("returns all 34 flags", () => {
      const all = resolveAllFeatureFlags();
      assert.strictEqual(all.length, 34);
    });

    it("marks DB-overridden flags with source 'db'", () => {
      setFeatureFlagOverride("REQUIRE_API_KEY", "true");
      const all = resolveAllFeatureFlags();
      const flag = all.find((f) => f.key === "REQUIRE_API_KEY");
      assert.strictEqual(flag?.source, "db");
    });

    it("marks ENV-set flags with source 'env'", () => {
      process.env["REQUIRE_API_KEY"] = "true";
      const all = resolveAllFeatureFlags();
      const flag = all.find((f) => f.key === "REQUIRE_API_KEY");
      assert.strictEqual(flag?.source, "env");
      delete process.env["REQUIRE_API_KEY"];
    });

    it("marks default flags with source 'default'", () => {
      const all = resolveAllFeatureFlags();
      const flag = all.find((f) => f.key === "REQUIRE_API_KEY");
      assert.strictEqual(flag?.source, "default");
    });
  });

  describe("backward compatibility", () => {
    it("isRequireApiKeyEnabled uses the resolved REQUIRE_API_KEY flag", () => {
      setFeatureFlagOverride("REQUIRE_API_KEY", "true");
      assert.strictEqual(isRequireApiKeyEnabled(), true);
    });

    it("isRequireApiKeyEnabled fails closed when the flag store cannot be read", () => {
      const originalError = console.error;
      console.error = () => {};
      try {
        core.resetDbInstance();
        fs.rmSync(tmpDir, { recursive: true, force: true });
        fs.mkdirSync(tmpDir, { recursive: true });
        const blockerPath = path.join(tmpDir, "storage.sqlite");
        fs.mkdirSync(blockerPath, { recursive: true });
        assert.strictEqual(isRequireApiKeyEnabled(), true);
      } finally {
        console.error = originalError;
        core.resetDbInstance();
        fs.rmSync(tmpDir, { recursive: true, force: true });
        fs.mkdirSync(tmpDir, { recursive: true });
      }
    });

    it("isCcCompatibleProviderEnabled still works", () => {
      const result = isCcCompatibleProviderEnabled();
      assert.strictEqual(typeof result, "boolean");
    });

    it("isModelCatalogNamesEnabled defaults on and follows overrides", () => {
      assert.strictEqual(isModelCatalogNamesEnabled(), true);
      try {
        setFeatureFlagOverride("MODEL_CATALOG_INCLUDE_NAMES", "false");
        assert.strictEqual(isModelCatalogNamesEnabled(), false);
      } finally {
        removeFeatureFlagOverride("MODEL_CATALOG_INCLUDE_NAMES");
      }
    });

    it("isArenaEloSyncEnabled defaults on and follows DB overrides", () => {
      assert.strictEqual(isArenaEloSyncEnabled(), true);
      try {
        setFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED", "false");
        assert.strictEqual(isArenaEloSyncEnabled(), false);
      } finally {
        removeFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED");
      }
    });

    it("isControlPlaneProxyDirectFallbackEnabled defaults off and follows DB overrides", () => {
      assert.strictEqual(isControlPlaneProxyDirectFallbackEnabled(), false);
      try {
        setFeatureFlagOverride("OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK", "true");
        assert.strictEqual(isControlPlaneProxyDirectFallbackEnabled(), true);
      } finally {
        removeFeatureFlagOverride("OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK");
      }
    });
  });
});

// ──────────────────────────────────────────────────────
// Test group 4 — Schema / validation logic (pure)
// ──────────────────────────────────────────────────────
describe("featureFlagUpdateSchema validation", () => {
  it("rejects unknown flag keys", () => {
    const knownKeys = new Set(FEATURE_FLAG_DEFINITIONS.map((d) => d.key));
    assert.ok(!knownKeys.has("UNKNOWN_FLAG_XYZ"), "UNKNOWN_FLAG_XYZ should not be a known key");
  });

  it("validates that INJECTION_GUARD_MODE has known enum values", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "INJECTION_GUARD_MODE");
    assert.ok(def, "INJECTION_GUARD_MODE should exist");
    assert.deepStrictEqual(def.enumValues, ["off", "warn", "block", "redact"]);
  });

  it("validates that TOOL_POLICY_MODE has known enum values", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "TOOL_POLICY_MODE");
    assert.ok(def, "TOOL_POLICY_MODE should exist");
    assert.deepStrictEqual(def.enumValues, ["disabled", "warn", "block"]);
  });

  it("setFeatureFlagOverride throws for unknown keys", () => {
    assert.throws(
      () => setFeatureFlagOverride("UNKNOWN_FLAG_XYZ", "true"),
      /Unknown feature flag key/
    );
  });

  it("setFeatureFlagOverride throws for invalid enum value", () => {
    assert.throws(
      () => setFeatureFlagOverride("INJECTION_GUARD_MODE", "invalid_mode"),
      /Invalid value/
    );
  });
});
