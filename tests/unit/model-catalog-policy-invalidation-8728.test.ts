import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-policy-8728-"),
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "model-catalog-policy-invalidation-8728";

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const apiKeyGroups = await import("../../src/lib/db/apiKeyGroups.ts");
const models = await import("../../src/lib/db/models.ts");
const quotaPools = await import("../../src/lib/db/quotaPools.ts");
const quotaGroups = await import("../../src/lib/db/quotaGroups.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function catalogVersion() {
  return readCache.getModelCatalogCacheVersion();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("updateApiKeyPermissions increments only on catalog-affecting fields", async () => {
  const created = await apiKeys.createApiKey("Cache Policy Key", "machine-cpi-1");
  let version = catalogVersion();

  assert.equal(await apiKeys.updateApiKeyPermissions(created.id, { isActive: false }), true);
  assert.equal(catalogVersion(), version, "isActive does not invalidate model-catalog cache");

  assert.equal(await apiKeys.updateApiKeyPermissions(created.id, {}), false);
  assert.equal(catalogVersion(), version, "no-op update does not invalidate model-catalog cache");

  await apiKeys.updateApiKeyPermissions(created.id, { allowedModels: ["openai/*"] });
  assert.equal(catalogVersion(), ++version);

  await apiKeys.updateApiKeyPermissions(created.id, { blockedModels: ["openai/sandbox/*"] });
  assert.equal(catalogVersion(), ++version);

  await apiKeys.updateApiKeyPermissions(created.id, { allowedQuotas: ["q-1", "q-2"] });
  assert.equal(catalogVersion(), ++version);

  await apiKeys.updateApiKeyPermissions(created.id, { disableNonPublicModels: true });
  assert.equal(catalogVersion(), ++version);
});

test("isModelAllowedForKey cache recomputes when group permissions change", async () => {
  const key = await apiKeys.createApiKey("Group Visibility Key", "machine-cpi-2");
  const modelId = "openai/gpt-4o-mini";
  await apiKeys.updateApiKeyPermissions(key.id, { allowedModels: ["openai/*"] });

  assert.equal(await apiKeys.isModelAllowedForKey(key.key, modelId), true);

  const group = apiKeyGroups.createKeyGroup("Model deny", "denies openai");
  apiKeyGroups.addGroupPermission(group.id, "openai/*", "deny");
  assert.equal(apiKeyGroups.addKeyToGroup(key.id, group.id), true);

  assert.equal(await apiKeys.isModelAllowedForKey(key.key, modelId), false);
  assert.ok(catalogVersion() > 0, "group visibility change increments model catalog generation");
});

test("isModelAllowedForKey cache recomputes after custom model visibility changes", async () => {
  const key = await apiKeys.createApiKey("Custom Visibility Key", "machine-cpi-3");
  await apiKeys.updateApiKeyPermissions(key.id, {
    allowedModels: ["openai/*"],
    disableNonPublicModels: true,
  });

  const modelId = "openai/catalog-cache-repro";
  await models.addCustomModel(
    "openai",
    "catalog-cache-repro",
    "Catalog cache repro",
    "manual",
    "chat-completions",
    ["chat"],
  );

  assert.equal(await apiKeys.isModelAllowedForKey(key.key, modelId), true);

  models.setModelIsHidden("openai", "catalog-cache-repro", true);
  assert.equal(await apiKeys.isModelAllowedForKey(key.key, modelId), false);
});

test("API-key group membership only invalidates model catalog on real membership mutations", async () => {
  const key = await apiKeys.createApiKey("Group Membership Key", "machine-cpi-5");
  const group = apiKeyGroups.createKeyGroup("Model deny", "denies openai");
  let version = catalogVersion();

  assert.equal(apiKeyGroups.addKeyToGroup(key.id, group.id), true);
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  assert.equal(apiKeyGroups.addKeyToGroup(key.id, group.id), true);
  assert.equal(catalogVersion(), version);

  assert.equal(apiKeyGroups.removeKeyFromGroup(key.id, group.id), true);
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  assert.equal(apiKeyGroups.removeKeyFromGroup(key.id, group.id), false);
  assert.equal(catalogVersion(), version);
});

test("quota pools and quota-group renames signal model-catalog invalidation as expected", async () => {
  let version = catalogVersion();
  const pool = quotaPools.createPool({
    connectionId: "conn-quota",
    name: "Quota Pool",
    groupId: "group-demo",
  });
  assert.equal(catalogVersion(), version + 1);

  const group = quotaGroups.createGroup("Quota Group");
  assert.equal(catalogVersion(), version + 1, "creating quota groups does not invalidate catalog");

  version = catalogVersion();
  const renamed = quotaGroups.renameGroup(group.id, "Renamed Quota Group");
  assert.equal(renamed, true);
  assert.equal(catalogVersion(), version + 1, "quota-group rename invalidates catalog");

  version = catalogVersion();
  assert.notEqual(quotaPools.updatePool(pool.id, { name: "Quota Pool Updated" }), null);
  assert.equal(catalogVersion(), version + 1);

  version = catalogVersion();
  assert.equal(quotaPools.deletePool(pool.id), true);
  assert.equal(catalogVersion(), version + 1);
});

test("deletePool clears primed key metadata after allowed_quotas rewrite", async () => {
  const pool = quotaPools.createPool({ connectionId: "conn-meta", name: "Meta Pool" });
  const key = await apiKeys.createApiKey("Pool Metadata Key", "machine-cpi-4");

  await apiKeys.updateApiKeyPermissions(key.id, { allowedQuotas: [pool.id] });
  const before = await apiKeys.getApiKeyMetadata(key.key);
  assert.deepEqual(before?.allowedQuotas, [pool.id]);

  assert.equal(quotaPools.deletePool(pool.id), true);

  const after = await apiKeys.getApiKeyMetadata(key.key);
  assert.deepEqual(after?.allowedQuotas, [], "allowed_quotas cache must reflect direct rewrite");
});
