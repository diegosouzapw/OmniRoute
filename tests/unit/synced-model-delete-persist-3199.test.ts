/**
 * #3199 follow-up to #3204 — a deleted synced (fetched) model must STAY deleted
 * across an auto-fetch re-import.
 *
 * #3204 added `removeSyncedAvailableModel`, but the DELETE route did not mark the
 * model hidden and `replaceSyncedAvailableModelsForConnection` did not skip hidden
 * ids — so the next `/models` sync re-imported the model and it reappeared. This
 * test guards that a hidden id is filtered out on re-import.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";

import {
  replaceSyncedAvailableModelsForConnection,
  getSyncedAvailableModels,
  mergeModelCompatOverride,
} from "../../src/lib/localDb.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

before(() => {
  resetDbInstance();
});

after(() => {
  resetDbInstance();
});

test("a hidden (deleted) synced model is not re-added on re-import", async () => {
  const provider = "llama-cpp";
  const connectionId = "conn-3199";

  // Initial sync brings in two models.
  await replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: "model-keep", name: "Keep" },
    { id: "model-del", name: "Delete me" },
  ]);
  let synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(synced.includes("model-del"), "both models present after first sync");

  // Operator deletes model-del → the route marks it hidden (#3199).
  mergeModelCompatOverride(provider, "model-del", { isHidden: true });

  // Auto-fetch re-imports the SAME upstream list (still advertising model-del).
  await replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: "model-keep", name: "Keep" },
    { id: "model-del", name: "Delete me" },
  ]);

  synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(synced.includes("model-keep"), "non-deleted model stays");
  assert.ok(
    !synced.includes("model-del"),
    "deleted (hidden) model must NOT be re-added by the re-import"
  );
});
