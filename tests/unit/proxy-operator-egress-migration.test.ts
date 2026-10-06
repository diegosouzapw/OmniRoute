import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Operator-provided dated egress observations live in their own table so a push can never
// touch the proxy log. These tests pin the migration: the table, its PK, and its index
// exist after applying the file, and re-running the file is a no-op.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-operator-egress-mig-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

const MIGRATION_FILE = "199_proxy_operator_egress.sql";
const MIGRATION_DIR = path.join(process.cwd(), "src", "lib", "db", "migrations");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the migration file exists and is safe to re-run", async () => {
  resetStorage();
  const file = path.join(MIGRATION_DIR, MIGRATION_FILE);
  assert.ok(fs.existsSync(file), `missing ${MIGRATION_FILE}`);
  const sql = fs.readFileSync(file, "utf8");
  assert.match(sql, /CREATE TABLE IF NOT EXISTS proxy_operator_egress/);
  assert.match(sql, /PRIMARY KEY\s*\(\s*host\s*,\s*port\s*,\s*address\s*\)/);
  assert.match(sql, /CREATE INDEX IF NOT EXISTS idx_poe_member/);

  // Fresh DB: the table is created on init (core runs migrations), so it must exist.
  const db = core.getDbInstance();
  const table = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'proxy_operator_egress'"
    )
    .get() as { name?: string } | undefined;
  assert.equal(table?.name, "proxy_operator_egress");
  const index = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_poe_member'")
    .get() as { name?: string } | undefined;
  assert.equal(index?.name, "idx_poe_member");

  // Re-run is a no-op: applying the migration SQL again must not throw.
  db.exec(sql);
  db.prepare(
    "INSERT INTO proxy_operator_egress (host, port, address, observed_at) VALUES (?, ?, ?, ?)"
  ).run("203.0.113.1", 8080, "198.51.100.1", new Date().toISOString());
  db.exec(sql);
  const count = db.prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress").get() as {
    n: number;
  };
  assert.equal(count.n, 1);
});
