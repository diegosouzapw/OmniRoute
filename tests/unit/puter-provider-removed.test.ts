import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-puter-removed-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.data.ts");
const { hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const core = await import("../../src/lib/db/core.ts");

// Regression guard: the Puter provider (id `puter`, alias `pu`,
// https://puter.com) was removed at the request of Puter's owner
// (Nariman Jelveh). It must stay out of every provider catalog, the
// executor map, and the free model catalog, and migration 152 must clean
// up any locally stored Puter configuration.

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("puter provider is removed from the chat registry (id and alias)", () => {
  assert.equal(REGISTRY["puter"], undefined);
  assert.equal(REGISTRY["pu"], undefined);
});

test("puter provider is removed from the API-key provider presets", () => {
  assert.equal((APIKEY_PROVIDERS as Record<string, unknown>)["puter"], undefined);
});

test("puter has no entries in the free model catalog", () => {
  const offenders = FREE_MODEL_BUDGETS.filter((b) => b.provider === "puter");
  assert.deepEqual(offenders, []);
});

test("puter executor is removed from the executor map (id and alias)", () => {
  assert.equal(hasSpecializedExecutor("puter"), false);
  assert.equal(hasSpecializedExecutor("pu"), false);
});

test("migration 152 deletes stored puter configuration and is idempotent", () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = 152")
    .get() as { version: number } | undefined;
  assert.ok(applied, "migration 152 must be recorded as applied");

  // Simulate a pre-removal install that still has Puter configuration, then
  // re-apply the migration SQL and assert every row is cleaned up.
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))"
  ).run("puter-conn-test", "puter", "apikey", "puter-main");
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('customModels', 'puter', '[]')"
  ).run();

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/152_remove_puter_provider.sql"),
    "utf8"
  );
  db.exec(sql);
  db.exec(sql); // idempotent — a second run must not throw

  const conn = db.prepare("SELECT id FROM provider_connections WHERE provider = 'puter'").get();
  assert.equal(conn, undefined, "puter provider_connections rows must be deleted");

  const custom = db
    .prepare("SELECT key FROM key_value WHERE namespace = 'customModels' AND key = 'puter'")
    .get();
  assert.equal(custom, undefined, "puter custom models must be deleted");
});
