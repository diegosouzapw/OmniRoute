// Repro for GitHub issue #11836: a hand-created custom model alias gets silently
// deleted by syncManagedAvailableModelAliases({ pruneMissing: true }) because
// resolveManagedModelAlias() has no provenance marker distinguishing an
// auto-generated managed alias from a manually created one — once the custom
// alias happens to already point at a model's `<storagePrefix>/<modelId>` full
// value, the next sync "adopts" it as the managed alias for that model, and the
// prune pass deletes it the moment the model transiently drops out of the
// target set (provider rotation, connection swap, sync merge, etc.).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11836-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getModelAliases, setModelAlias } = await import("../../src/lib/db/models.ts");
const { syncManagedAvailableModelAliases } =
  await import("../../src/lib/providerModels/managedAvailableModels.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#11836: a hand-created custom alias survives a sync where its model rotates out of the target set", async () => {
  await setModelAlias("my-custom-alias", "openrouter/vendor/model-a");

  const firstSync = await syncManagedAvailableModelAliases("openrouter", ["vendor/model-a"]);
  const afterFirstSync = await getModelAliases();

  assert.equal(
    afterFirstSync["my-custom-alias"],
    "openrouter/vendor/model-a",
    "custom alias should still be intact right after being adopted"
  );
  assert.deepEqual(firstSync.removedAliases, []);

  const secondSync = await syncManagedAvailableModelAliases("openrouter", []);
  const afterSecondSync = await getModelAliases();

  assert.equal(
    afterSecondSync["my-custom-alias"],
    "openrouter/vendor/model-a",
    "custom alias must NOT be pruned just because it was adopted by a prior sync"
  );
  assert.deepEqual(secondSync.removedAliases, []);
});
