import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression coverage for search providers leaking their static-import
// `searchTypes` (web/news/x) into the OpenAI-compatible /v1/models catalog.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-provider-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "search-provider-catalog-test-" + Date.now();
}

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getAllActiveSyncedModels } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { getSearchProvider } = await import("../../open-sse/config/searchRegistry.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

const SEARCH_PROVIDER = "brave-search";

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedSearchProviderCatalog() {
  const connection = await providersDb.createProviderConnection({
    provider: SEARCH_PROVIDER,
    authType: "apikey",
    name: "Brave Search Test",
    apiKey: "brave-search-test-key",
  });
  assert.ok(connection?.id, "expected a seeded search provider connection");

  await modelsDb.replaceSyncedAvailableModelsForConnection(SEARCH_PROVIDER, connection.id, [
    { id: "web", name: "Web Search", source: "imported", supportedEndpoints: ["chat"] },
    { id: "news", name: "News Search", source: "imported", supportedEndpoints: ["chat"] },
  ]);
  await modelsDb.addCustomModel(
    SEARCH_PROVIDER,
    "web",
    "Web Search",
    "imported",
    "chat-completions",
    ["chat"]
  );

  return connection.id;
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("search provider synced searchTypes are excluded from getAllActiveSyncedModels", async () => {
  await seedSearchProviderCatalog();

  const activeSyncedModels = await getAllActiveSyncedModels();

  assert.equal(
    activeSyncedModels[SEARCH_PROVIDER],
    undefined,
    "search provider searchTypes must not enter the live /v1/models source"
  );
});

test("sync-models skips search providers and cleans previously imported search types", async () => {
  const connectionId = await seedSearchProviderCatalog();

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connectionId } }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    provider: string;
    source: string;
    skipped: string;
    syncedModels: number;
    availableModelsCount: number;
    cleanup: { removedSyncedLists: number; removedImportedModels: number };
  };

  assert.equal(body.provider, SEARCH_PROVIDER);
  assert.equal(body.source, "search");
  assert.equal(body.skipped, "search-provider");
  assert.equal(body.syncedModels, 0);
  assert.equal(body.availableModelsCount, 0);
  assert.equal(body.cleanup.removedSyncedLists, 1);
  assert.equal(body.cleanup.removedImportedModels, 1);

  assert.deepEqual(await modelsDb.getSyncedAvailableModels(SEARCH_PROVIDER), []);
  assert.deepEqual(await modelsDb.getCustomModels(SEARCH_PROVIDER), []);
});

test("exact search-id detection does not classify the perplexity chat provider as search", () => {
  assert.equal(getSearchProvider("perplexity"), null);
  assert.equal(getSearchProvider(SEARCH_PROVIDER)?.id, SEARCH_PROVIDER);
});
