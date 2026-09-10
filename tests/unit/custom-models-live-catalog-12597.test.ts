import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #12597: picker-added customModels must enter the dispatch-time live catalog.
// GET /api/providers/{id}/models already merges customModels; getActiveSyncedCatalog
// and getActiveProvidersWithSyncedModel did not, so combo + bare inference 400'd.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12597-custom-live-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "custom-live-12597-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel, replaceSyncedAvailableModelsForConnection, getActiveProvidersWithSyncedModel } =
  await import("../../src/lib/db/models.ts");
const {
  getActiveSyncedCatalog,
  catalogContainsModel,
  reconcileProvidersWithActiveSyncedCatalog,
} = await import("../../src/lib/db/models/activeSyncedCatalog.ts");

const PROVIDER = "github";
const CONNECTION_ID = "github-live-catalog-12597";
const SYNCED_MODEL = "gpt-4.1";
const PICKER_MODEL = "nvidia/deepseek-ai/deepseek-r1";

async function seedActiveSyncedCatalog(modelIds: string[] = [SYNCED_MODEL]) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
       (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, 1, now, now);
  await replaceSyncedAvailableModelsForConnection(
    PROVIDER,
    CONNECTION_ID,
    modelIds.map((id) => ({ id, name: id, source: "imported" as const }))
  );
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await seedActiveSyncedCatalog();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12597 picker-only model is in the authoritative live catalog", async () => {
  await addCustomModel(PROVIDER, PICKER_MODEL, "DeepSeek R1 via picker");

  const catalog = await getActiveSyncedCatalog(PROVIDER);
  assert.equal(catalog.authoritative, true);
  assert.ok(
    catalog.models.some((model) => model.id === PICKER_MODEL),
    "picker-added customModels must union into getActiveSyncedCatalog"
  );
  assert.ok(
    catalog.models.some((model) => model.id === SYNCED_MODEL),
    "synced rows must still be present"
  );
  assert.equal(catalogContainsModel(catalog, PICKER_MODEL), true);
});

test("#12597 reconcile must not exclude a provider for a picker-only model", async () => {
  await addCustomModel(PROVIDER, PICKER_MODEL, "DeepSeek R1 via picker");

  const { providers, excludedProviders } = await reconcileProvidersWithActiveSyncedCatalog(
    [PROVIDER],
    PICKER_MODEL
  );
  assert.deepEqual(providers, [PROVIDER]);
  assert.deepEqual(excludedProviders, []);
});

test("#12597 getActiveProvidersWithSyncedModel finds a picker-only model", async () => {
  await addCustomModel(PROVIDER, PICKER_MODEL, "DeepSeek R1 via picker");

  const providers = await getActiveProvidersWithSyncedModel(PICKER_MODEL);
  assert.ok(
    providers.includes(PROVIDER),
    "bare inference must see picker-added customModels, not only syncedAvailableModels"
  );
});

test("#12597 same-id custom overlay does not drop the synced row", async () => {
  await addCustomModel(PROVIDER, SYNCED_MODEL, "Operator name for gpt-4.1");

  const catalog = await getActiveSyncedCatalog(PROVIDER);
  const matches = catalog.models.filter((model) => model.id === SYNCED_MODEL);
  assert.equal(matches.length, 1);
  assert.equal(matches[0]?.name, "Operator name for gpt-4.1");
});

test("#12597 sparse custom overlay does not wipe synced capability fields", async () => {
  const db = core.getDbInstance();
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION_ID, [
    {
      id: SYNCED_MODEL,
      name: SYNCED_MODEL,
      source: "imported",
      supportsThinking: true,
      inputTokenLimit: 128000,
      supportedThinkingEfforts: ["low", "high"],
    },
  ]);
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run(PROVIDER, JSON.stringify([{ id: SYNCED_MODEL, name: "Operator name" }]));

  const catalog = await getActiveSyncedCatalog(PROVIDER);
  const match = catalog.models.find((model) => model.id === SYNCED_MODEL);
  assert.equal(match?.name, "Operator name");
  assert.equal(match?.supportsThinking, true);
  assert.equal(match?.inputTokenLimit, 128000);
  assert.deepEqual(match?.supportedThinkingEfforts, ["low", "high"]);
});

test("#12597 without a custom row the picker id is still absent (lock the old contract)", async () => {
  const catalog = await getActiveSyncedCatalog(PROVIDER);
  assert.equal(catalogContainsModel(catalog, PICKER_MODEL), false);
  const { excludedProviders } = await reconcileProvidersWithActiveSyncedCatalog(
    [PROVIDER],
    PICKER_MODEL
  );
  assert.deepEqual(excludedProviders, [PROVIDER]);
  assert.deepEqual(await getActiveProvidersWithSyncedModel(PICKER_MODEL), []);
});
