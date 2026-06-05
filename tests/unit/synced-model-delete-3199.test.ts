// Regression guard for #3199 — a user could not delete an individual model from a
// llama-cpp (local/catalog) provider. Fetched models are stored as synced
// (authoritative, #3148) and there was no per-model synced delete, so deleting a
// model either failed or re-appeared on the next auto-fetch.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-synced-delete-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const discovery = await import("../../src/lib/providerModels/modelDiscovery.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const PROVIDER = "llamacpp";
const CONN = "conn-1";

test("removeSyncedAvailableModel removes a single model from the synced list", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONN, [
    { id: "model-a", name: "Model A" },
    { id: "model-b", name: "Model B" },
    { id: "model-c", name: "Model C" },
  ]);

  const removed = await modelsDb.removeSyncedAvailableModel(PROVIDER, "model-b");
  assert.equal(removed, true);

  const ids = (await modelsDb.getSyncedAvailableModels(PROVIDER)).map((m) => m.id).sort();
  assert.deepEqual(ids, ["model-a", "model-c"]);
});

test("removeSyncedAvailableModel returns false for a missing model id", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONN, [
    { id: "model-a", name: "Model A" },
  ]);
  const removed = await modelsDb.removeSyncedAvailableModel(PROVIDER, "does-not-exist");
  assert.equal(removed, false);
});

test("deleted synced model stays deleted across a re-fetch (hidden marker)", async () => {
  // Seed via the same discovery path the provider /models route uses.
  await discovery.persistDiscoveredModels(PROVIDER, CONN, [
    { id: "model-a", name: "Model A" },
    { id: "model-b", name: "Model B" },
  ]);

  // Delete model-b and mark it hidden (the persistent "deleted" marker).
  await modelsDb.removeSyncedAvailableModel(PROVIDER, "model-b");
  modelsDb.mergeModelCompatOverride(PROVIDER, "model-b", { isHidden: true });

  assert.equal(modelsDb.getModelIsHidden(PROVIDER, "model-b"), true);

  // Auto-fetch fires again and the upstream still advertises model-b.
  await discovery.persistDiscoveredModels(PROVIDER, CONN, [
    { id: "model-a", name: "Model A" },
    { id: "model-b", name: "Model B" },
  ]);

  // model-b must NOT come back: the merge/sync path skips hidden ids.
  const ids = (await modelsDb.getSyncedAvailableModels(PROVIDER)).map((m) => m.id).sort();
  assert.deepEqual(ids, ["model-a"]);
});

test("removeSyncedAvailableModel scoped to a single connection only", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, "conn-1", [
    { id: "model-a", name: "Model A" },
    { id: "shared", name: "Shared" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, "conn-2", [
    { id: "shared", name: "Shared" },
  ]);

  const removed = await modelsDb.removeSyncedAvailableModel(PROVIDER, "shared", "conn-1");
  assert.equal(removed, true);

  // conn-2 still has it, so the union still contains "shared".
  const ids = (await modelsDb.getSyncedAvailableModels(PROVIDER)).map((m) => m.id).sort();
  assert.deepEqual(ids, ["model-a", "shared"]);

  // conn-1 no longer has it.
  const conn1Ids = (await modelsDb.getSyncedAvailableModelsForConnection(PROVIDER, "conn-1"))
    .map((m) => m.id)
    .sort();
  assert.deepEqual(conn1Ids, ["model-a"]);
});
