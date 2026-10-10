import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #15622: `sensenova/<id>` is frozen as an exact model id when ANOTHER provider (xkiro)
// catalogs that verbatim id, and the static sensenova registry lacks the bare id. The
// operator's customModels / synced entries for the named provider were never consulted,
// so the request was misrouted to xkiro (no credentials).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15622-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "sensenova-15622-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { addCustomModel } = await import("../../src/lib/db/models.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");

const PREFIXED = "sensenova/sensenova-6.8-flash-lite";
const BARE = "sensenova-6.8-flash-lite";

function seedConnection(provider: string, id: string, active = 1) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
         (id, provider, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(id, provider, active, now, now);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#15622 sensenova/<customModel> routes to sensenova when the provider is active and has the id", async () => {
  seedConnection("sensenova", "sensenova-conn-15622");
  await addCustomModel("sensenova", BARE, "SenseNova 6.8 Flash Lite");

  const info = await getModelInfoCore(PREFIXED, null);
  assert.equal(info.provider, "sensenova");
  assert.equal(info.model, BARE);
});

test("#15622 inactive sensenova connection keeps the exact-id behaviour", async () => {
  seedConnection("sensenova", "sensenova-conn-15622", 0);
  await addCustomModel("sensenova", BARE, "SenseNova 6.8 Flash Lite");

  const info = await getModelInfoCore(PREFIXED, null);
  assert.notEqual(info.provider, "sensenova");
});

test("#15622 prefix whose provider has no such model anywhere stays an exact id", async () => {
  seedConnection("sensenova", "sensenova-conn-15622");

  const info = await getModelInfoCore(PREFIXED, null);
  assert.notEqual(info.provider, "sensenova");
});
