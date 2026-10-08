/**
 * #14393: Logfare's live catalog exposes its upstream model literally as
 * "logfare/auto" (an id that already carries a provider-shaped prefix). When a
 * client addresses it the natural way — "logfare/auto" — parseModel() splits on
 * the first "/" into provider "logfare" + model "auto", and the synced-catalog
 * lookup then searches for a model whose id is the bare "auto", which does not
 * exist (the real synced row's id is "logfare/auto"). The model is wrongly
 * rejected as unavailable. Only the doubled "logfare/logfare/auto" (which
 * splits into provider "logfare" + model "logfare/auto") reaches the real id.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-logfare-14393-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "logfare-14393-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const PROVIDER = "logfare";
const CONNECTION_ID = "logfare-14393-test-connection";
// The exact shape logfare's live catalog returns (per issue #14393 comment):
// { "id": "logfare/auto", "aliases": ["logfare/random", "auto"], ... }
const UPSTREAM_MODEL_ID = "logfare/auto";

async function seedSyncedCatalog(): Promise<void> {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, now, now);

  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION_ID, [
    { id: UPSTREAM_MODEL_ID, name: "Logfare Auto", source: "imported" },
  ]);
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await seedSyncedCatalog();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14393: doubled prefix reaches the real upstream id (sanity — this already works)", async () => {
  const resolved = await getModelInfo(`${PROVIDER}/${UPSTREAM_MODEL_ID}`); // "logfare/logfare/auto"

  assert.equal(resolved.provider, PROVIDER);
  assert.equal(resolved.model, UPSTREAM_MODEL_ID);
  assert.equal(resolved.errorType, undefined);
});

test("#14393: BUG — the natural single-prefixed id 'logfare/auto' is wrongly rejected", async () => {
  const resolved = await getModelInfo(UPSTREAM_MODEL_ID); // "logfare/auto"

  // This is the defect: the synced catalog DOES hold a model whose id is
  // exactly "logfare/auto" (seeded above), so this request should resolve to
  // provider "logfare" + model "logfare/auto" (or otherwise succeed), NOT be
  // rejected as "not available in the active live catalog".
  assert.equal(
    resolved.provider,
    PROVIDER,
    `expected provider-prefixed synced model id to resolve; got errorMessage=${resolved.errorMessage}`
  );
  assert.equal(resolved.errorType, undefined, `expected no error, got ${resolved.errorMessage}`);
});
