import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-llamacpp-delete-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("removeSyncedAvailableModel deletes a single model from syncedAvailableModels", async () => {
  const db = core.getDbInstance();

  // Seed two connections with models
  await modelsDb.replaceSyncedAvailableModelsForConnection("llama-cpp", "conn-a", [
    { id: "model-a", name: "Model A" },
    { id: "model-b", name: "Model B" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("llama-cpp", "conn-b", [
    { id: "model-b", name: "Model B" },
    { id: "model-c", name: "Model C" },
  ]);

  // Remove model-b from all connections
  const removed = await modelsDb.removeSyncedAvailableModel("llama-cpp", "model-b");
  assert.equal(removed, true, "should report removal");

  // Verify model-b is gone
  const remaining = await modelsDb.getSyncedAvailableModels("llama-cpp");
  const ids = remaining.map((m) => m.id);
  assert.deepEqual(ids.sort(), ["model-a", "model-c"]);

  // Verify conn-a still has model-a
  const rowA = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get("llama-cpp:conn-a");
  const modelsA = JSON.parse(rowA.value);
  assert.equal(modelsA.length, 1);
  assert.equal(modelsA[0].id, "model-a");

  // Verify conn-b still has model-c
  const rowB = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get("llama-cpp:conn-b");
  const modelsB = JSON.parse(rowB.value);
  assert.equal(modelsB.length, 1);
  assert.equal(modelsB[0].id, "model-c");
});

test("removeSyncedAvailableModel deletes the key when a connection becomes empty", async () => {
  const db = core.getDbInstance();

  await modelsDb.replaceSyncedAvailableModelsForConnection("llama-cpp", "conn-x", [
    { id: "only-model", name: "Only Model" },
  ]);

  const removed = await modelsDb.removeSyncedAvailableModel("llama-cpp", "only-model");
  assert.equal(removed, true);

  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get("llama-cpp:conn-x");
  assert.equal(row, undefined, "key should be deleted when empty");
});

test("removeSyncedAvailableModel returns false when model does not exist", async () => {
  const db = core.getDbInstance();

  await modelsDb.replaceSyncedAvailableModelsForConnection("llama-cpp", "conn-y", [
    { id: "model-1", name: "Model 1" },
  ]);

  const removed = await modelsDb.removeSyncedAvailableModel("llama-cpp", "nonexistent");
  assert.equal(removed, false);

  const remaining = await modelsDb.getSyncedAvailableModels("llama-cpp");
  assert.equal(remaining.length, 1);
  assert.equal(remaining[0].id, "model-1");
});

test("removeSyncedAvailableModel skips malformed syncedAvailableModels rows", async () => {
  const db = core.getDbInstance();

  await modelsDb.replaceSyncedAvailableModelsForConnection("llama-cpp", "conn-ok", [
    { id: "model-ok", name: "Model OK" },
    { id: "model-delete", name: "Model Delete" },
  ]);
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "syncedAvailableModels",
    "llama-cpp:broken",
    "{not valid json"
  );

  const removed = await modelsDb.removeSyncedAvailableModel("llama-cpp", "model-delete");
  assert.equal(removed, true);

  const valid = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get("llama-cpp:conn-ok");
  const validModels = JSON.parse(valid.value);
  assert.deepEqual(
    validModels.map((m) => m.id),
    ["model-ok"]
  );

  const malformed = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get("llama-cpp:broken");
  assert.equal(malformed.value, "{not valid json");
});
