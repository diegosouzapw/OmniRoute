/**
 * #3782 — "Auto Sync Enabling all Models".
 *
 * The user hides models with the EYE/visibility toggle (writes `isHidden:true`
 * via `mergeModelCompatOverride`) to keep only their combo's models. Before this
 * fix, `replaceSyncedAvailableModelsForConnection` dropped EVERY hidden id on a
 * re-sync (it could not tell an eye-hidden model from a DELETED one), so the
 * model fell out of the synced store and then churned back through the managed
 * alias path — the reported "all models turn back on".
 *
 * The fix separates the two signals:
 *   - DELETE (trash) marks `isDeleted:true` (+ keeps `isHidden:true` for back-compat).
 *   - The EYE toggle sets only `isHidden:true`.
 *   - The sync filter drops a model only when it is DELETED, so eye-hidden models
 *     stay listed-but-hidden across re-syncs.
 *
 * This test guards that an eye-hidden model survives re-import (Test A), that a
 * genuinely-new model defaults to visible (Test B), and that the DELETE path
 * still drops on re-import (Test C — mirrors the #3199 delete flow).
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Hermetic DB: this test writes overrides into the `modelCompatOverrides`
// key_value namespace. Without an isolated DATA_DIR it would leak that state
// into the shared dev/CI database and never clean it up, so the SECOND run
// would see stale overrides and the first-sync precondition would fail. Point
// DATA_DIR at a throwaway dir before any import that opens the SQLite handle.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-synced-hide-"));
process.env.DATA_DIR = tmpDir;

const {
  replaceSyncedAvailableModelsForConnection,
  getSyncedAvailableModels,
  mergeModelCompatOverride,
  getModelIsHidden,
} = await import("../../src/lib/localDb.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

before(() => {
  resetDbInstance();
});

after(() => {
  // Release the SQLite handle so the Node test runner can exit, then remove the
  // throwaway DATA_DIR (CLAUDE.md "Database Handles in Tests").
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const PROVIDER = "llama-cpp";
const CONNECTION = "conn-3782";

test("A: an EYE-hidden synced model is preserved (listed-but-hidden) across re-import", async () => {
  // Initial sync brings in three models, all visible.
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: "A", name: "Alpha" },
    { id: "B", name: "Bravo" },
    { id: "C", name: "Charlie" },
  ]);
  let synced = (await getSyncedAvailableModels(PROVIDER)).map((m) => m.id);
  assert.deepEqual(synced.sort(), ["A", "B", "C"], "all three present after first sync");
  assert.equal(getModelIsHidden(PROVIDER, "B"), false, "B is visible before eye-hide");

  // Operator hides B with the EYE toggle (visibility only, NOT a delete).
  mergeModelCompatOverride(PROVIDER, "B", { isHidden: true });
  assert.equal(getModelIsHidden(PROVIDER, "B"), true, "B is eye-hidden");

  // Auto-fetch re-imports the SAME upstream list (still advertising B).
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: "A", name: "Alpha" },
    { id: "B", name: "Bravo" },
    { id: "C", name: "Charlie" },
  ]);

  synced = (await getSyncedAvailableModels(PROVIDER)).map((m) => m.id);
  assert.ok(synced.includes("B"), "#3782: eye-hidden B STAYS in the synced list after re-sync");
  assert.equal(
    getModelIsHidden(PROVIDER, "B"),
    true,
    "#3782: eye-hidden B is NOT re-enabled (stays hidden) after re-sync"
  );
  assert.equal(getModelIsHidden(PROVIDER, "A"), false, "A stays visible");
  assert.equal(getModelIsHidden(PROVIDER, "C"), false, "C stays visible");
  assert.ok(synced.includes("A") && synced.includes("C"), "A and C still present");
});

test("B: a genuinely-new model on re-sync defaults to VISIBLE", async () => {
  // Continue from Test A state (B eye-hidden); add a new model D.
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: "A", name: "Alpha" },
    { id: "B", name: "Bravo" },
    { id: "C", name: "Charlie" },
    { id: "D", name: "Delta" },
  ]);

  const synced = (await getSyncedAvailableModels(PROVIDER)).map((m) => m.id);
  assert.ok(synced.includes("D"), "new model D is imported");
  assert.equal(getModelIsHidden(PROVIDER, "D"), false, "new model D defaults to visible");
  // Eye-hidden B is still preserved + hidden.
  assert.ok(synced.includes("B"), "eye-hidden B still present");
  assert.equal(getModelIsHidden(PROVIDER, "B"), true, "eye-hidden B still hidden");
});

test("C: a DELETED synced model still stays out on re-import (delete signal)", async () => {
  const provider = "llama-cpp-del";
  const connection = "conn-3782-del";

  await replaceSyncedAvailableModelsForConnection(provider, connection, [
    { id: "keep", name: "Keep" },
    { id: "del", name: "Delete me" },
  ]);
  let synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(synced.includes("del"), "both present after first sync");

  // Operator DELETES (trash) `del` → the route marks it deleted. Mirror the real
  // DELETE route: it sets BOTH the distinct delete marker and (back-compat) hidden.
  mergeModelCompatOverride(provider, "del", { isDeleted: true, isHidden: true });

  // Auto-fetch re-imports the SAME upstream list (still advertising `del`).
  await replaceSyncedAvailableModelsForConnection(provider, connection, [
    { id: "keep", name: "Keep" },
    { id: "del", name: "Delete me" },
  ]);

  synced = (await getSyncedAvailableModels(provider)).map((m) => m.id);
  assert.ok(synced.includes("keep"), "non-deleted model stays");
  assert.ok(!synced.includes("del"), "DELETED model must NOT be re-added by the re-import");
});
