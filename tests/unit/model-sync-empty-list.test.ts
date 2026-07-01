import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-empty-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "test-model-sync-empty-secret-" + Date.now();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const originalFetch = globalThis.fetch;

type SyncModelsBody = {
  syncedModels?: number;
};

async function resetStorage() {
  globalThis.fetch = originalFetch;
  modelSyncRoute.__resetLoopbackReadinessForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("model sync route preserves synced models when upstream returns an empty list", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter Import Empty",
    apiKey: "test-key",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", connection.id, [
    { id: "stale-model", name: "Stale Model", source: "imported" },
  ]);

  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) return new Response(null, { status: 404 });
    return Response.json({ models: [] });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models?mode=import`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as SyncModelsBody;

  assert.equal(response.status, 200);
  assert.equal(body.syncedModels, 1);
  assert.deepEqual(
    await modelsDb.getSyncedAvailableModelsForConnection("openrouter", connection.id),
    [{ id: "stale-model", name: "Stale Model", source: "imported" }]
  );
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openrouter"), [
    { id: "stale-model", name: "Stale Model", source: "imported" },
  ]);
});
