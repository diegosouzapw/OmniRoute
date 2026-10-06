/**
 * Model deletion is physical, while persistent exclusion uses isHidden.
 *
 * A custom and synced row can share one id. Deleting that id prefers the custom
 * row and leaves its synced sibling intact. Deleting a synced-only row removes
 * the current discovery result, but a later upstream sync may restore it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Hermetic DB: this test writes into the customModels and
// syncedAvailableModels namespaces.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-delete-sibling-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// The DELETE route is auth-gated; with no INITIAL_PASSWORD and no stored
// credential, `isAuthenticated` resolves true for local management calls.
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

const PROVIDER = "deepseek";
const CONNECTION = "conn-delete-sibling";
const FLASH = "deepseek-v4-flash";
const PRO = "deepseek-v4-pro";

test.after(() => {
  // Release the SQLite handle so the Node test runner can exit, then remove the
  // throwaway DATA_DIR (CLAUDE.md "Database Handles in Tests").
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Invoke the real DELETE handler so the test tracks production behavior. */
async function deleteProviderModel(provider: string, modelId: string) {
  const url =
    `http://localhost/api/provider-models` +
    `?provider=${encodeURIComponent(provider)}&model=${encodeURIComponent(modelId)}`;
  const response = await providerModelsRoute.DELETE(new Request(url, { method: "DELETE" }));
  assert.equal(response.status, 200, "DELETE /api/provider-models should succeed");
  return response.json();
}

test("A: deleting a custom model leaves a same-id synced sibling re-importable", async () => {
  core.resetDbInstance();

  // Provider sync brings both models in; operator eye-hides one.
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: FLASH, name: FLASH },
    { id: PRO, name: PRO },
  ]);
  modelsDb.mergeModelCompatOverride(PROVIDER, FLASH, { isHidden: true });

  // Step 2 — operator manually adds a custom model with the SAME id.
  await modelsDb.addCustomModel(PROVIDER, FLASH, FLASH);

  // Step 3 — operator deletes the custom model they just created.
  await deleteProviderModel(PROVIDER, FLASH);

  // The synced sibling remains present; deleting the custom definition does not
  // reinterpret the operation as a synced-model deletion.
  assert.ok(
    (await modelsDb.getSyncedAvailableModels(PROVIDER)).some(
      (model: { id: string }) => model.id === FLASH
    )
  );

  // The decisive assertion: a later re-sync must bring the model back.
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: FLASH, name: FLASH },
    { id: PRO, name: PRO },
  ]);
  const ids = (await modelsDb.getSyncedAvailableModels(PROVIDER)).map((m: { id: string }) => m.id);
  assert.ok(
    ids.includes(FLASH),
    `re-import must restore the synced model; got [${ids.join(", ")}]`
  );
});

test("B: deleting a synced-only model is temporary and re-sync restores it", async () => {
  core.resetDbInstance();

  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: PRO, name: PRO },
  ]);

  const result = await deleteProviderModel(PROVIDER, PRO);
  assert.equal(result.removed, true);
  assert.ok(
    !(await modelsDb.getSyncedAvailableModels(PROVIDER)).some(
      (model: { id: string }) => model.id === PRO
    )
  );

  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: PRO, name: PRO },
  ]);
  assert.ok(
    (await modelsDb.getSyncedAvailableModels(PROVIDER)).some(
      (model: { id: string }) => model.id === PRO
    ),
    "upstream re-sync restores a physically deleted synced model"
  );
});
