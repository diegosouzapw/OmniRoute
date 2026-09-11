import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-chatgpt-web-cleanroom-restore-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 171 restores chatgpt-web writes while cgpt-web remains fail-closed", () => {
  const db = core.getDbInstance();
  const applied = db
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = 171")
    .get() as { version: string; name: string } | undefined;
  assert.deepEqual(applied, { version: "171", name: "restore_chatgpt_web_cleanroom" });

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
      "VALUES (?, ?, 'apikey', ?, 1, 'active', datetime('now'), datetime('now'))"
  ).run("cleanroom-chatgpt-web", "chatgpt-web", "Clean-room ChatGPT Web");
  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
      "VALUES (?, ?, 'apikey', ?, 1, 'active', datetime('now'), datetime('now'))"
  ).run("legacy-cgpt-web", "cgpt-web", "Legacy cgpt-web");

  const readState = (id: string) =>
    db
      .prepare(
        "SELECT is_active, test_status, error_code, last_error_source " +
          "FROM provider_connections WHERE id = ?"
      )
      .get(id) as {
      is_active: number;
      test_status: string;
      error_code: string | null;
      last_error_source: string | null;
    };

  assert.deepEqual(readState("cleanroom-chatgpt-web"), {
    is_active: 1,
    test_status: "active",
    error_code: null,
    last_error_source: null,
  });
  assert.deepEqual(readState("legacy-cgpt-web"), {
    is_active: 0,
    test_status: "unavailable",
    error_code: "PROVIDER_REMOVED",
    last_error_source: "migration:retire-chatgpt-web",
  });
});
