/**
 * Synced vision verdict memo: on-demand reads must not re-read the whole
 * provider catalog on every resolution.
 *
 * The memo is gated on the shared model-catalog cache version and rebuilt
 * after each catalog write. An injected database bypasses the memo, and a
 * failed bulk read is never stored.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-synced-vision-memo-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const vision = await import("../../src/lib/db/models/syncedAvailableModelVision.ts");

let prepareCalls = 0;
let trackedDb: { prepare: (sql: string) => unknown } | null = null;

function patchPrepare() {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { all: (...args: unknown[]) => unknown[] };
  };
  if (trackedDb === db) return;
  const original = db.prepare.bind(db);
  db.prepare = ((sql: string, ...rest: unknown[]) => {
    if (typeof sql === "string" && sql.includes("syncedAvailableModels")) prepareCalls += 1;
    return (original as (...args: unknown[]) => unknown)(sql, ...rest);
  }) as typeof db.prepare;
  trackedDb = db as unknown as { prepare: (sql: string) => unknown };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trackedDb = null;
  prepareCalls = 0;
  vision.resetSyncedVisionVerdictMemoForTests();
  patchPrepare();
}

function seedSynced(providerId: string, connectionId: string, value: unknown) {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)")
    .run(`${providerId}:${connectionId}`, JSON.stringify(value));
}

function memoEntries(): number {
  return vision.getSyncedVisionVerdictMemoSizeForTests();
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("serves repeated lookups from one read after the first", async () => {
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
    { id: "plain-model", name: "Plain Model" },
  ]);
  prepareCalls = 0;

  const lookups = 5;
  for (let i = 0; i < lookups; i += 1) {
    assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), true);
    assert.equal(vision.getSyncedAvailableModelVision("acme", "plain-model"), null);
  }

  assert.equal(prepareCalls, 1);
  assert.equal(memoEntries(), 1);
  assert.equal(vision.getSyncedAvailableModelVision("", "vision-model"), null);
  assert.equal(vision.getSyncedAvailableModelVision("acme", ""), null);
});

test("refreshes the verdict after every writer path", async () => {
  const read = () => vision.getSyncedAvailableModelVision("acme", "vision-model");

  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(read(), true);

  assert.equal(await models.removeSyncedAvailableModel("acme", "vision-model"), true);
  assert.equal(read(), null);

  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(read(), true);
  await models.deleteSyncedAvailableModelsForConnection("acme", "conn-a");
  assert.equal(read(), null);

  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(read(), true);
  assert.equal(await models.deleteSyncedAvailableModelsForProvider("acme"), 1);
  assert.equal(read(), null);

  await models.replaceSyncedAvailableModelsForConnection("acme", "keep", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  seedSynced("acme", "stale", [{ id: "vision-model", name: "Vision Model" }]);
  assert.equal(await models.pruneStaleSyncedAvailableModelsForProvider("acme", ["keep"]), 1);
  assert.equal(read(), true);
});

test("serves a stale verdict when a write bypasses the shared exit", async () => {
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), true);

  core
    .getDbInstance()
    .prepare("UPDATE key_value SET value = ? WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .run(JSON.stringify([{ id: "vision-model", name: "Vision Model" }]), "acme:conn-a");

  assert.equal(
    vision.getSyncedAvailableModelVision("acme", "vision-model"),
    true,
    "unbumped direct write must keep serving the stored verdict"
  );
});

test("ignores the memo for an injected database", async () => {
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), true);

  prepareCalls = 0;
  const stored = await models.getSyncedAvailableModels("acme");
  prepareCalls = 0;
  const injectedRows = [{ key: "acme:conn-a", value: JSON.stringify(stored) }];
  const injected = {
    prepare: () => ({
      all: () => injectedRows,
      get: () => injectedRows[0],
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
    }),
  };
  assert.equal(
    vision.getSyncedAvailableModelVision("acme", "vision-model", undefined, {
      getDatabase: () => injected,
    }),
    true
  );
  assert.equal(prepareCalls, 0, "injected reads must not touch the singleton counter");
  assert.equal(
    vision.getSyncedAvailableModelVision("acme", "vision-model"),
    true,
    "stored verdict must survive an injected read"
  );
});

test("does not store failed singleton reads", async () => {
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), true);
  vision.resetSyncedVisionVerdictMemoForTests();
  const versionBefore = readCache.getModelCatalogCacheVersion();

  core.getDbInstance().prepare("DROP TABLE key_value").run();
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), null);
  assert.equal(vision.getSyncedVisionVerdictMemoSizeForTests(), 0);
  assert.equal(readCache.getModelCatalogCacheVersion(), versionBefore);

  resetStorage();
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), true);
  assert.equal(vision.getSyncedVisionVerdictMemoSizeForTests(), 1);
});

test("does not store failed injected reads", async () => {
  const versionBefore = readCache.getModelCatalogCacheVersion();
  const failing = {
    prepare: () => ({
      all: () => {
        throw new Error("closed database");
      },
      get: () => {
        throw new Error("closed database");
      },
      run: () => {
        throw new Error("closed database");
      },
    }),
  };
  assert.equal(
    vision.getSyncedAvailableModelVision("acme", "vision-model", undefined, {
      getDatabase: () => failing,
    }),
    null
  );
  assert.equal(readCache.getModelCatalogCacheVersion(), versionBefore);
  assert.equal(memoEntries(), 0);

  seedSynced("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), true);
});

test("bypasses the memo for an empty bulk map and stores the empty map", async () => {
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model", new Map()), null);

  prepareCalls = 0;
  assert.equal(vision.getSyncedAvailableModelVision("acme", "vision-model"), null);
  assert.equal(vision.getSyncedAvailableModelVision("acme", "other-model"), null);
  assert.equal(prepareCalls, 1);
  assert.equal(memoEntries(), 1);
});

test("resolves a wildcard provider id exactly", () => {
  seedSynced("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  seedSynced("acme%", "conn-a", [{ id: "other-model", name: "Other Model", supportsVision: true }]);

  assert.equal(vision.getSyncedAvailableModelVision("acme%", "vision-model"), null);
  assert.equal(vision.getSyncedAvailableModelVision("acme%", "other-model"), true);
});

test("keeps a single stored generation after reads and writes", async () => {
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
  ]);
  for (let i = 0; i < 5; i += 1) {
    vision.getSyncedAvailableModelVision("acme", "vision-model");
  }
  await models.replaceSyncedAvailableModelsForConnection("acme", "conn-a", [
    { id: "vision-model", name: "Vision Model", supportsVision: true },
    { id: "second-vision-model", name: "Second", supportsVision: true },
  ]);
  for (let i = 0; i < 5; i += 1) {
    vision.getSyncedAvailableModelVision("acme", "second-vision-model");
  }
  assert.equal(memoEntries(), 1);
});
