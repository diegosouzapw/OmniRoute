import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-siliconflow-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { buildModelSyncInternalHeaders } =
  await import("../../src/shared/services/modelSyncScheduler.ts");

const originalFetch = globalThis.fetch;

type JsonBody = Record<string, unknown>;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedSiliconFlowConnection() {
  return providersDb.createProviderConnection({
    provider: "siliconflow",
    authType: "apikey",
    name: `siliconflow-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sf-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "https://api.siliconflow.cn/v1" },
  });
}

async function callSyncRoute(connectionId: string) {
  return syncModelsRoute.POST(
    new Request(`http://127.0.0.1/api/providers/${connectionId}/sync-models`, {
      method: "POST",
      headers: buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("sync-models rejects local catalog fallback and preserves existing SiliconFlow models", async () => {
  const connection = await seedSiliconFlowConnection();
  await modelsDb.replaceSyncedAvailableModelsForConnection("siliconflow", connection.id, [
    { id: "remote-existing", name: "Remote Existing" },
  ]);

  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) {
      return new Response("", { status: 404 });
    }

    return Response.json({
      provider: "siliconflow",
      connectionId: connection.id,
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
      models: [{ id: "deepseek-ai/DeepSeek-V3", name: "DeepSeek V3" }],
    });
  };

  const response = await callSyncRoute(connection.id);
  const body = (await response.json()) as JsonBody;

  assert.equal(response.status, 502);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.error, "API unavailable — using local catalog");

  const syncedModels = await modelsDb.getSyncedAvailableModelsForConnection(
    "siliconflow",
    connection.id
  );
  assert.deepEqual(
    syncedModels.map((model) => ({ id: model.id, name: model.name })),
    [{ id: "remote-existing", name: "Remote Existing" }]
  );
});

test("sync-models persists SiliconFlow models from API discovery", async () => {
  const connection = await seedSiliconFlowConnection();

  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) {
      return new Response("", { status: 404 });
    }

    return Response.json({
      provider: "siliconflow",
      connectionId: connection.id,
      source: "api",
      models: [
        { id: "remote-a", name: "Remote A" },
        { id: "remote-b", name: "Remote B" },
      ],
    });
  };

  const response = await callSyncRoute(connection.id);
  const body = (await response.json()) as JsonBody;

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.syncedModels, 2);

  const syncedModels = await modelsDb.getSyncedAvailableModelsForConnection(
    "siliconflow",
    connection.id
  );
  assert.deepEqual(
    syncedModels.map((model) => ({ id: model.id, name: model.name })),
    [
      { id: "remote-a", name: "Remote A" },
      { id: "remote-b", name: "Remote B" },
    ]
  );
});
