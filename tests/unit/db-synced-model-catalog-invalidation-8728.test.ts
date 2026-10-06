import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-model-cache-8728-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function catalogVersion() {
  return readCache.getModelCatalogCacheVersion();
}

function totalChanges() {
  return Number(
    (
      core.getDbInstance().prepare("SELECT total_changes() AS count").get() as {
        count: number;
      }
    ).count
  );
}

function seedSynced(providerId: string, connectionId: string, value: unknown) {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)")
    .run(`${providerId}:${connectionId}`, JSON.stringify(value));
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("replace invalidates only for canonical persisted changes", async () => {
  const initialVersion = catalogVersion();

  await models.replaceSyncedAvailableModelsForConnection("openai", "a", [
    {
      id: "gpt-b",
      name: " GPT B ",
      source: "ignored",
      supportedEndpoints: ["responses", "chat", "chat"],
    },
    { id: "gpt-a", name: "GPT A" },
  ]);
  assert.equal(catalogVersion(), initialVersion + 1);

  const beforeIdenticalChanges = totalChanges();
  const beforeIdenticalVersion = catalogVersion();
  await models.replaceSyncedAvailableModelsForConnection("openai", "a", [
    {
      id: "gpt-b",
      name: "GPT B",
      source: "imported",
      supportedEndpoints: ["chat", "responses"],
    },
    { id: "gpt-a", name: "GPT A", source: "imported" },
  ]);
  assert.equal(totalChanges(), beforeIdenticalChanges, "canonical equality must skip the DB write");
  assert.equal(catalogVersion(), beforeIdenticalVersion, "canonical equality must not invalidate");

  await models.replaceSyncedAvailableModelsForConnection("openai", "a", [
    { id: "gpt-a", name: "GPT A" },
    { id: "gpt-b", name: "GPT B", supportedEndpoints: ["chat", "responses"] },
  ]);
  assert.equal(catalogVersion(), beforeIdenticalVersion + 1, "ordering changes are persisted");

  await models.replaceSyncedAvailableModelsForConnection("openai", "a", [
    { id: "gpt-a", name: "GPT A renamed" },
    { id: "gpt-b", name: "GPT B", supportedEndpoints: ["chat", "responses"] },
  ]);
  assert.equal(catalogVersion(), beforeIdenticalVersion + 2, "content changes are persisted");
});

test("replace handles empty and normalized models without phantom writes", async () => {
  const startVersion = catalogVersion();
  const startChanges = totalChanges();

  await models.replaceSyncedAvailableModelsForConnection("openai", "absent", []);
  assert.equal(totalChanges(), startChanges, "absent-to-empty replacement must be a no-op");
  assert.equal(catalogVersion(), startVersion);

  await models.replaceSyncedAvailableModelsForConnection("openai", "absent", [
    { id: "restored", name: "Restored" },
  ]);
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("openai", "absent")).map(
      (model) => model.id
    ),
    ["restored"]
  );

  seedSynced("openai", "present", [{ id: "existing", name: "Existing" }]);
  const beforeDeleteVersion = catalogVersion();
  await models.replaceSyncedAvailableModelsForConnection("openai", "present", []);
  assert.equal(catalogVersion(), beforeDeleteVersion + 1, "present-to-empty must invalidate");
  assert.deepEqual(await models.getSyncedAvailableModelsForConnection("openai", "present"), []);
});

test("remove and connection/provider deletes invalidate only when rows actually change", async () => {
  let version = catalogVersion();
  assert.equal(await models.removeSyncedAvailableModel("openai", "missing"), false);
  assert.equal(catalogVersion(), version);

  seedSynced("openai", "a", [
    { id: "gpt-a", name: "GPT A" },
    { id: "gpt-b", name: "GPT B" },
  ]);
  assert.equal(await models.removeSyncedAvailableModel("openai", "gpt-a"), true);
  assert.equal(catalogVersion(), ++version);
  assert.equal(await models.removeSyncedAvailableModel("openai", "gpt-a"), false);
  assert.equal(catalogVersion(), version);

  await models.deleteSyncedAvailableModelsForConnection("openai", "missing");
  assert.equal(catalogVersion(), version);
  await models.deleteSyncedAvailableModelsForConnection("openai", "a");
  assert.equal(catalogVersion(), ++version);

  assert.equal(await models.deleteSyncedAvailableModelsForProvider("openai"), 0);
  assert.equal(catalogVersion(), version);
  seedSynced("openai", "b", [{ id: "gpt-b", name: "GPT B" }]);
  seedSynced("openai", "c", [{ id: "gpt-c", name: "GPT C" }]);
  assert.equal(await models.deleteSyncedAvailableModelsForProvider("openai"), 2);
  assert.equal(catalogVersion(), ++version);
});

test("prune uses affected rows and the delegated provider delete invalidates exactly once", async () => {
  seedSynced("openai", "keep", [{ id: "gpt-a", name: "GPT A" }]);
  seedSynced("openai", "stale", [{ id: "gpt-b", name: "GPT B" }]);
  let version = catalogVersion();

  assert.equal(
    await models.pruneStaleSyncedAvailableModelsForProvider("openai", ["keep", "stale"]),
    0
  );
  assert.equal(catalogVersion(), version);

  assert.equal(await models.pruneStaleSyncedAvailableModelsForProvider("openai", ["keep"]), 1);
  assert.equal(catalogVersion(), ++version);

  assert.equal(await models.pruneStaleSyncedAvailableModelsForProvider("openai", []), 1);
  assert.equal(catalogVersion(), ++version, "delegated provider delete must invalidate once");

  assert.equal(await models.pruneStaleSyncedAvailableModelsForProvider("openai", []), 0);
  assert.equal(catalogVersion(), version);
});
