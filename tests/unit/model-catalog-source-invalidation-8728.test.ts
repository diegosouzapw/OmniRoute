import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-sources-8728-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const aliases = await import("../../src/lib/db/models/aliases.ts");
const compat = await import("../../src/lib/db/models/compat.ts");
const ccAliases = await import("../../src/lib/db/ccDiscoveryAliases.ts");
const featureFlags = await import("../../src/lib/db/featureFlags.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const openRouterCatalog = await import("../../src/lib/catalog/openrouterCatalog.ts");

function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function catalogVersion() {
  return readCache.getModelCatalogCacheVersion();
}

const REAL_FETCH = globalThis.fetch;

function installMockOpenRouterFetch(payload: { data: Array<Record<string, unknown>> }): void {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
}

function installFailingOpenRouterFetch(): void {
  globalThis.fetch = (async () => {
    throw new Error("simulated openrouter failure");
  }) as typeof fetch;
}

function restoreRealFetch(): void {
  globalThis.fetch = REAL_FETCH;
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  restoreRealFetch();
});

test("custom-model source writes invalidate model-catalog cache version; no-op writes do not", async () => {
  let version = catalogVersion();

  await models.addCustomModel("openai", "manual-one");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  const duplicate = await models.addCustomModel("openai", "manual-one");
  assert.equal(duplicate.id, "manual-one");
  assert.equal(catalogVersion(), version);

  await models.replaceCustomModels("openai", [
    { id: "manual-one", source: "manual", apiFormat: "chat-completions" },
    { id: "imported-one", source: "auto-sync", apiFormat: "chat-completions" },
  ]);
  version = version + 1;
  assert.equal(catalogVersion(), version);

  const removedIds = await models.deleteImportedCustomModels("openai");
  assert.deepEqual(removedIds, ["imported-one"]);
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  const removedExisting = await models.removeCustomModel("openai", "manual-one");
  assert.equal(removedExisting, true);
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  const removedMissing = await models.removeCustomModel("openai", "missing");
  assert.equal(removedMissing, false);
  assert.equal(catalogVersion(), version);

  const updatedMissing = await models.updateCustomModel("openai", "missing", {
    modelName: "Missing",
  });
  assert.equal(updatedMissing, null);
  assert.equal(catalogVersion(), version);

  const noImported = await models.deleteImportedCustomModels("openai");
  assert.deepEqual(noImported, []);
  assert.equal(catalogVersion(), version);

  await models.addCustomModel("openai", "manual-two", "manual two");
  version = catalogVersion();
  const updateResult = await models.updateCustomModel("openai", "manual-two", {
    modelName: "Manual Two",
  });
  assert.notEqual(updateResult, null);
  assert.equal(catalogVersion(), version + 1);

  const noTarget = await models.updateCustomModel("openai", "missing", { modelName: "Missing" });
  assert.equal(noTarget, null);
  assert.equal(catalogVersion(), version + 1);
});

test("model alias and compat writes invalidate model-catalog cache version", async () => {
  let version = catalogVersion();

  await aliases.setModelAlias("alias-alpha", "openai/manual-one");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  await aliases.deleteModelAlias("alias-alpha");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  compat.writeCompatList("openai", [
    {
      id: "manual-two",
      normalizeToolCallId: true,
    },
  ]);
  assert.equal(catalogVersion(), version + 1);
});

test("Claude Code discovery alias setters invalidate on both write and inherit/delete", () => {
  let version = catalogVersion();

  ccAliases.setCcAliasProviderSetting("openai", "on");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  ccAliases.setCcAliasProviderSetting("openai", null);
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  ccAliases.setCcAliasModelSetting("openai", "gpt-4", "on");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  ccAliases.setCcAliasModelSetting("openai", "gpt-4", null);
  assert.equal(catalogVersion(), version + 1);
});

test("feature flag writes invalidate catalog version only for catalog-relevant overrides", async () => {
  const unrelatedBefore = catalogVersion();
  featureFlags.setFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED", "true");
  assert.equal(catalogVersion(), unrelatedBefore);

  let version = catalogVersion();
  featureFlags.setFeatureFlagOverride("MODEL_CATALOG_INCLUDE_NAMES", "false");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  featureFlags.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "alias");
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  featureFlags.setFeatureFlagOverride("EXPOSE_CC_DISCOVERY_ALIASES", "true");
  assert.equal(catalogVersion(), version + 1);

  const relevantKeyBeforeRemove = catalogVersion();
  featureFlags.removeFeatureFlagOverride("MODEL_CATALOG_INCLUDE_NAMES");
  assert.equal(catalogVersion(), relevantKeyBeforeRemove + 1);

  featureFlags.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  const irrelevantClearVersion = catalogVersion();
  featureFlags.setFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED", "true");
  featureFlags.clearAllFeatureFlagOverrides();
  assert.equal(catalogVersion(), irrelevantClearVersion + 1);

  const clearNoRelevantBefore = catalogVersion();
  featureFlags.clearAllFeatureFlagOverrides();
  assert.equal(catalogVersion(), clearNoRelevantBefore);
});

test("refreshOpenRouterCatalog invalidates only on success", async () => {
  installMockOpenRouterFetch({ data: [{ id: "openrouter/fake", source: "test" }] });
  try {
    const beforeGet = catalogVersion();
    await openRouterCatalog.getOpenRouterCatalog();
    assert.equal(
      catalogVersion(),
      beforeGet,
      "ordinary get should not invalidate the model-catalog cache"
    );

    const beforeRefreshSuccess = catalogVersion();
    const success = await openRouterCatalog.refreshOpenRouterCatalog();
    assert.equal(success.ok, true);
    assert.equal(catalogVersion(), beforeRefreshSuccess + 1);

    installFailingOpenRouterFetch();
    const beforeRefreshFailure = catalogVersion();
    const failed = await openRouterCatalog.refreshOpenRouterCatalog();
    assert.equal(failed.ok, false);
    assert.equal(catalogVersion(), beforeRefreshFailure, "failed refresh should not invalidate");
  } finally {
    restoreRealFetch();
  }
});
