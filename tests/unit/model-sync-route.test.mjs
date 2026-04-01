import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("model sync route skips success log when fetched models do not change stored models", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "custom-model-1",
      name: "Custom Model 1",
      source: "auto-sync",
    },
  ]);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), `http://localhost/api/providers/${connection.id}/models`);
    return Response.json({
      models: [{ id: "custom-model-1", name: "Custom Model 1" }],
    });
  };

  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.logged, false);
    assert.deepEqual(body.modelChanges, { added: 0, removed: 0, updated: 0, total: 0 });

    const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });
    assert.equal(logs.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("model sync route stores the real provider while keeping the account label", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), `http://localhost/api/providers/${connection.id}/models`);
    return Response.json({
      models: [{ id: "custom-model-2", name: "Custom Model 2" }],
    });
  };

  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.logged, true);
    assert.deepEqual(body.modelChanges, { added: 1, removed: 0, updated: 0, total: 1 });
    assert.equal(body.provider, "openrouter");

    const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });
    assert.equal(logs.length, 1);
    assert.equal(logs[0].provider, "openrouter");
    assert.equal(logs[0].account, "MAIN");
    assert.equal(logs[0].model, "model-sync");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
