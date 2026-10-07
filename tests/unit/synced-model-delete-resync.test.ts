/**
 * A synced model delete removes the current discovery row only. If the upstream
 * provider advertises that model again, the next sync restores it. Persistent
 * exclusion is represented by isHidden, not a separate deletion tombstone.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Hermetic DB: this test mutates the syncedAvailableModels key_value namespace.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-synced-del-"));
process.env.DATA_DIR = tmpDir;

const { replaceSyncedAvailableModelsForConnection, getSyncedAvailableModels } =
  await import("@/lib/db/models");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

before(() => {
  resetDbInstance();
});

after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a deleted synced model is restored when upstream advertises it again", async () => {
  const provider = "llama-cpp";
  const connectionId = "conn-3199";

  // Initial sync brings in two models.
  await replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: "model-keep", name: "Keep" },
    { id: "model-del", name: "Delete me" },
  ]);
  let synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(synced.includes("model-del"), "both models present after first sync");

  const { removeSyncedAvailableModel } = await import("@/lib/db/models");
  assert.equal(await removeSyncedAvailableModel(provider, "model-del"), true);
  synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(!synced.includes("model-del"), "delete removes the current synced row");

  // Auto-fetch re-imports the SAME upstream list (still advertising model-del).
  await replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: "model-keep", name: "Keep" },
    { id: "model-del", name: "Delete me" },
  ]);

  synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(synced.includes("model-keep"), "unrelated model stays");
  assert.ok(synced.includes("model-del"), "upstream re-sync restores the deleted model");
});
