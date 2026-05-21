import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-model-import-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const localDb = await import("../../src/lib/localDb.ts");
const { importManagedModels } = await import("../../src/lib/providerModels/managedModelImport.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("sync mode builds aliases from provider-level synced available models", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-b",
    mode: "sync",
    fetchedModels: [{ id: "shared/model-b", name: "Model B" }],
  });

  const aliases = await localDb.getModelAliases();

  assert.equal(aliases["model-a"], "openrouter/shared/model-a");
  assert.equal(aliases["model-b"], "openrouter/shared/model-b");
});

test("merge mode builds aliases from discovered models without pruning missing provider aliases", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);
  await localDb.setModelAlias("existing", "openrouter/shared/existing");

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-b",
    mode: "merge",
    fetchedModels: [{ id: "shared/model-b", name: "Model B" }],
  });

  const aliases = await localDb.getModelAliases();

  assert.equal(aliases.existing, "openrouter/shared/existing");
  assert.equal(aliases["model-a"], undefined);
  assert.equal(aliases["model-b"], "openrouter/shared/model-b");
});

test("provider-level synced model deletion removes only that provider", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-b", [
    { id: "shared/model-b", name: "Model B", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-a", [
    { id: "shared/model-c", name: "Model C", source: "imported" },
  ]);

  const removed = await modelsDb.deleteSyncedAvailableModelsForProvider("openrouter");

  assert.equal(removed, 2);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openrouter"), []);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openai"), [
    { id: "shared/model-c", name: "Model C", source: "imported" },
  ]);
});
