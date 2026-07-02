import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-config-hot-reload-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_CONFIG_HOT_RELOAD_MS = "100";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { getDbInstance } = core;
const { applyRuntimeSettings, resetRuntimeSettingsStateForTests } =
  await import("../../src/lib/config/runtimeSettings.ts");
const { startRuntimeConfigHotReload, stopRuntimeConfigHotReloadForTests } =
  await import("../../src/lib/config/hotReload.ts");
const { getCliCompatProviders } = await import("../../open-sse/config/cliFingerprints.ts");
const { getCustomAliases, setCustomAliases } =
  await import("../../open-sse/services/modelDeprecation.ts");
const {
  getBackgroundDegradationConfig,
  getDefaultDegradationMap,
  getDefaultDetectionPatterns,
  setBackgroundDegradationConfig,
} = await import("../../open-sse/services/backgroundTaskDetector.ts");
const { clearGeminiThoughtSignatures, getGeminiThoughtSignatureMode } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");
const { getPayloadRulesConfig, resetPayloadRulesConfigForTests } =
  await import("../../open-sse/services/payloadRules.ts");
const { getCacheControlSettings, invalidateCacheControlSettingsCache } =
  await import("../../src/lib/cacheControlSettings.ts");

async function resetStorage() {
  stopRuntimeConfigHotReloadForTests();
  resetRuntimeSettingsStateForTests();
  resetPayloadRulesConfigForTests();
  clearGeminiThoughtSignatures();
  setCustomAliases({});
  setBackgroundDegradationConfig({
    enabled: false,
    degradationMap: getDefaultDegradationMap(),
    detectionPatterns: getDefaultDetectionPatterns(),
  });
  invalidateCacheControlSettingsCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitFor(check: () => Promise<boolean> | boolean, timeoutMs = 3000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await check()) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  assert.fail("Timed out waiting for hot-reload condition");
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
});

test("updateSettings applies runtime settings incrementally without restart", async () => {
  await applyRuntimeSettings(await settingsDb.getSettings(), {
    force: true,
    source: "test:startup",
  });

  await settingsDb.updateSettings({
    cliCompatProviders: ["OpenAI", "claude", "copilot"],
    modelAliases: JSON.stringify({ "team-default": "openai/gpt-4o-mini" }),
    backgroundDegradation: {
      enabled: true,
      degradationMap: { "gpt-4o": "gpt-4o-mini" },
      detectionPatterns: ["summarize this"],
    },
    payloadRules: {
      override: [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: { temperature: 0.1 },
        },
      ],
    },
    alwaysPreserveClientCache: "always",
    antigravitySignatureCacheMode: "bypass",
  });

  assert.deepEqual(getCliCompatProviders().sort(), ["claude", "github"]);
  assert.deepEqual(getCustomAliases(), { "team-default": "openai/gpt-4o-mini" });
  assert.equal(getBackgroundDegradationConfig().enabled, true);
  assert.equal(getBackgroundDegradationConfig().degradationMap["gpt-4o"], "gpt-4o-mini");
  assert.deepEqual(getBackgroundDegradationConfig().detectionPatterns, ["summarize this"]);
  assert.equal((await getPayloadRulesConfig()).override[0].params.temperature, 0.1);
  assert.equal(await getCacheControlSettings(), "always");
  assert.equal(getGeminiThoughtSignatureMode(), "bypass");

  await settingsDb.updateSettings({
    cliCompatProviders: [],
    modelAliases: {},
    backgroundDegradation: null,
    payloadRules: null,
    alwaysPreserveClientCache: "auto",
    antigravitySignatureCacheMode: "enabled",
  });

  assert.deepEqual(getCliCompatProviders(), []);
  assert.deepEqual(getCustomAliases(), {});
  assert.equal(getBackgroundDegradationConfig().enabled, false);
  assert.equal((await getPayloadRulesConfig()).override.length, 0);
  assert.equal(await getCacheControlSettings(), "auto");
  assert.equal(getGeminiThoughtSignatureMode(), "enabled");
});

test("hot-reload watcher picks up external sqlite changes via polling fallback", async () => {
  await applyRuntimeSettings(await settingsDb.getSettings(), {
    force: true,
    source: "test:startup",
  });
  startRuntimeConfigHotReload({ pollIntervalMs: 100 });

  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'cliCompatProviders', ?)"
  ).run(JSON.stringify(["github", "openai"]));
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'antigravitySignatureCacheMode', ?)"
  ).run(JSON.stringify("bypass-strict"));

  await waitFor(
    () =>
      getCliCompatProviders().includes("github") &&
      !getCliCompatProviders().includes("openai") &&
      getGeminiThoughtSignatureMode() === "bypass-strict"
  );
});
