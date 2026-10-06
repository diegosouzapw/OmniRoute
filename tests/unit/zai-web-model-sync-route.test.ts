import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zai-model-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-zai-model-sync-${Date.now()}`;
}

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const originalFetch = globalThis.fetch;

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  globalThis.fetch = originalFetch;
  modelSyncRoute.__resetLoopbackReadinessForTests();
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("curated zai-web sync removes stale imported models without touching manual models", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "zai-web",
    authType: "apikey",
    name: "Z.ai Web",
    apiKey: "current-local-storage-token",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("zai-web", connection.id, [
    { id: "glm-4.6v", name: "GLM-4.6V", source: "imported" },
    { id: "deep-research", name: "Z1-Rumination", source: "imported" },
  ]);
  await modelsDb.addCustomModel("zai-web", "glm-4-air-250414", "GLM-4-32B", "imported");
  await modelsDb.addCustomModel("zai-web", "manual-keep", "Manual Keep", "manual");

  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    throw new Error("curated provider sync must not fetch a remote model catalog");
  }) as typeof globalThis.fetch;

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as {
    source: string;
    skipped: string;
    cleanup: {
      removedSyncedLists: number;
      removedImportedModels: number;
    };
  };
  const syncedModels = await modelsDb.getSyncedAvailableModels("zai-web");
  const customModels = (await modelsDb.getCustomModels("zai-web")) as Array<{
    id: string;
    source: string;
  }>;

  assert.equal(response.status, 200);
  assert.equal(body.source, "curated");
  assert.equal(body.skipped, "curated-models-only");
  assert.deepEqual(body.cleanup, {
    removedSyncedLists: 1,
    removedImportedModels: 1,
  });
  assert.deepEqual(syncedModels, []);
  assert.deepEqual(
    customModels.map((model) => ({ id: model.id, source: model.source })),
    [{ id: "manual-keep", source: "manual" }]
  );
  assert.equal(fetchCalls, 0);
});
