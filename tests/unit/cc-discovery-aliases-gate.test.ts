import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Set DATA_DIR to a temp dir before any imports that touch the DB.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-cc-alias-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");
const {
  resolveCcAliasEnabled,
  getCcAliasProviderSetting,
  setCcAliasProviderSetting,
  getCcAliasModelSetting,
  setCcAliasModelSetting,
  getCcAliasSettingsBulk,
  isCcAliasGlobalEnabled,
  getCcAliasGlobalState,
} = await import("../../src/lib/db/ccDiscoveryAliases.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(tmpDir, { recursive: true });
}

// ──────────────────────────────────────────────────────
// Group 1 — flag definition registry
// ──────────────────────────────────────────────────────
describe("EXPOSE_CC_DISCOVERY_ALIASES flag definition", () => {
  it("is registered as a runtime boolean flag, default off", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "EXPOSE_CC_DISCOVERY_ALIASES");
    assert.ok(def, "EXPOSE_CC_DISCOVERY_ALIASES should exist");
    assert.strictEqual(def.category, "runtime");
    assert.strictEqual(def.type, "boolean");
    assert.strictEqual(def.defaultValue, "false");
    assert.strictEqual(def.requiresRestart, false);
    assert.strictEqual(def.descriptionI18nKey, "featureFlagExposeCcDiscoveryAliasesDescription");
  });
});

// ──────────────────────────────────────────────────────
// Group 2 — resolveCcAliasEnabled precedence (pure function)
// ──────────────────────────────────────────────────────
describe("resolveCcAliasEnabled precedence", () => {
  it("model 'on' wins over provider 'off' and global false", () => {
    assert.strictEqual(
      resolveCcAliasEnabled({ model: "on", provider: "off", global: false }),
      true
    );
  });

  it("model 'off' wins over provider 'on' and global true", () => {
    assert.strictEqual(
      resolveCcAliasEnabled({ model: "off", provider: "on", global: true }),
      false
    );
  });

  it("model null + provider 'on' -> true", () => {
    assert.strictEqual(resolveCcAliasEnabled({ model: null, provider: "on", global: false }), true);
  });

  it("model null + provider 'off' -> false even if global true", () => {
    assert.strictEqual(
      resolveCcAliasEnabled({ model: null, provider: "off", global: true }),
      false
    );
  });

  it("everything null/undefined + global true -> true", () => {
    assert.strictEqual(resolveCcAliasEnabled({ global: true }), true);
  });

  it("everything null/undefined + global false -> false", () => {
    assert.strictEqual(resolveCcAliasEnabled({ global: false }), false);
  });

  it("explicit nulls + global true -> true", () => {
    assert.strictEqual(resolveCcAliasEnabled({ model: null, provider: null, global: true }), true);
  });
});

// ──────────────────────────────────────────────────────
// Group 3 — storage round-trip
// ──────────────────────────────────────────────────────
describe("ccDiscoveryAliases storage", () => {
  beforeEach(() => {
    resetDb();
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("getCcAliasProviderSetting returns null when unset", () => {
    assert.strictEqual(getCcAliasProviderSetting("openai"), null);
  });

  it("setCcAliasProviderSetting('on') round-trips", () => {
    setCcAliasProviderSetting("openai", "on");
    assert.strictEqual(getCcAliasProviderSetting("openai"), "on");
  });

  it("setCcAliasProviderSetting('off') round-trips", () => {
    setCcAliasProviderSetting("openai", "off");
    assert.strictEqual(getCcAliasProviderSetting("openai"), "off");
  });

  it("setCcAliasProviderSetting(null) removes the key (back to inherit)", () => {
    setCcAliasProviderSetting("openai", "on");
    setCcAliasProviderSetting("openai", null);
    assert.strictEqual(getCcAliasProviderSetting("openai"), null);
  });

  it("getCcAliasModelSetting returns null when unset", () => {
    assert.strictEqual(getCcAliasModelSetting("openai", "gpt-5"), null);
  });

  it("setCcAliasModelSetting round-trips independently per model", () => {
    setCcAliasModelSetting("openai", "gpt-5", "on");
    assert.strictEqual(getCcAliasModelSetting("openai", "gpt-5"), "on");
    assert.strictEqual(getCcAliasModelSetting("openai", "gpt-5-mini"), null);
  });

  it("setCcAliasModelSetting(null) removes the key", () => {
    setCcAliasModelSetting("openai", "gpt-5", "off");
    setCcAliasModelSetting("openai", "gpt-5", null);
    assert.strictEqual(getCcAliasModelSetting("openai", "gpt-5"), null);
  });

  it("provider and model settings do not collide across provider ids", () => {
    setCcAliasProviderSetting("openai", "on");
    setCcAliasProviderSetting("anthropic", "off");
    assert.strictEqual(getCcAliasProviderSetting("openai"), "on");
    assert.strictEqual(getCcAliasProviderSetting("anthropic"), "off");
  });

  it("getCcAliasSettingsBulk returns both maps in one call", () => {
    setCcAliasProviderSetting("openai", "on");
    setCcAliasProviderSetting("anthropic", "off");
    setCcAliasModelSetting("openai", "gpt-5", "off");

    const { providers, models } = getCcAliasSettingsBulk();
    assert.strictEqual(providers.get("openai"), "on");
    assert.strictEqual(providers.get("anthropic"), "off");
    assert.strictEqual(models.get("openai/gpt-5"), "off");
    assert.strictEqual(models.has("openai/gpt-5-mini"), false);
  });

  it("getCcAliasSettingsBulk returns empty maps when nothing set", () => {
    const { providers, models } = getCcAliasSettingsBulk();
    assert.strictEqual(providers.size, 0);
    assert.strictEqual(models.size, 0);
  });
});

// ──────────────────────────────────────────────────────
// Group 4 — global state resolver (env vs DB vs default)
// ──────────────────────────────────────────────────────
describe("global CC alias state (env / DB / default)", () => {
  beforeEach(() => {
    resetDb();
    delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
  });

  after(() => {
    core.resetDbInstance();
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
  });

  it("defaults to disabled with source 'default'", () => {
    assert.strictEqual(isCcAliasGlobalEnabled(), false);
    assert.deepStrictEqual(getCcAliasGlobalState(), { enabled: false, source: "default" });
  });

  it("DB override enables it with source 'db'", async () => {
    const { setFeatureFlagOverride } = await import("../../src/lib/db/featureFlags.ts");
    setFeatureFlagOverride("EXPOSE_CC_DISCOVERY_ALIASES", "true");
    assert.strictEqual(isCcAliasGlobalEnabled(), true);
    assert.deepStrictEqual(getCcAliasGlobalState(), { enabled: true, source: "db" });
  });

  it("env=1 forces global on with source 'env', winning over a DB 'false' override", async () => {
    const { setFeatureFlagOverride } = await import("../../src/lib/db/featureFlags.ts");
    setFeatureFlagOverride("EXPOSE_CC_DISCOVERY_ALIASES", "false");
    process.env.EXPOSE_CC_DISCOVERY_ALIASES = "1";
    assert.strictEqual(isCcAliasGlobalEnabled(), true);
    assert.deepStrictEqual(getCcAliasGlobalState(), { enabled: true, source: "env" });
  });

  it("env='true' also forces global on", () => {
    process.env.EXPOSE_CC_DISCOVERY_ALIASES = "true";
    assert.strictEqual(isCcAliasGlobalEnabled(), true);
    assert.strictEqual(getCcAliasGlobalState().source, "env");
  });

  it("env='0' does not force on — falls through to DB/default", () => {
    process.env.EXPOSE_CC_DISCOVERY_ALIASES = "0";
    assert.strictEqual(isCcAliasGlobalEnabled(), false);
    assert.strictEqual(getCcAliasGlobalState().source, "default");
  });
});
