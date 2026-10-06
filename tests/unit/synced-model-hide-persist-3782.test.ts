/**
 * #3782 — "Auto Sync Enabling all Models".
 *
 * The eye toggle persists isHidden independently of synced discovery data.
 * Re-sync therefore keeps a hidden model in the synced list without making it
 * visible again, while genuinely new models default to visible.
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
} = await import("@/lib/db/models");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

before(() => {
  resetDbInstance();
});

after(() => {
  // Release the SQLite handle so the Node test runner can exit, then remove the
  // throwaway DATA_DIR (CLAUDE.md "Database Handles in Tests").
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
