import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-xp-audit-cleanup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const databaseSettingsRoute = await import("../../src/app/api/settings/database/route.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");

type CountRow = {
  count: number;
};

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeJsonRequest(method: string, body?: unknown): Request {
  return new Request("http://localhost/api/settings/database", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function insertXpAuditLogRow(createdAt: string) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO xp_audit_log (api_key_id, action, xp_earned, metadata, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run("test-api-key", "test-action", 10, null, createdAt);
}

function countXpAuditLogRows(): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT COUNT(*) AS count FROM xp_audit_log").get() as CountRow;
  return row.count;
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("cleanupXpAuditLog deletes rows older than the retention window and keeps recent rows", async () => {
  const oldCreatedAt = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString();
  const recentCreatedAt = new Date().toISOString();

  insertXpAuditLogRow(oldCreatedAt);
  insertXpAuditLogRow(recentCreatedAt);

  const result = await cleanup.cleanupXpAuditLog();

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, 1);
  assert.equal(countXpAuditLogRows(), 1);
});

test("runAutoCleanup includes an xpAuditLog result with numeric deleted/errors fields", async () => {
  const oldCreatedAt = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString();
  insertXpAuditLogRow(oldCreatedAt);

  const result = await cleanup.runAutoCleanup();

  assert.ok(result.results.xpAuditLog);
  assert.equal(typeof result.results.xpAuditLog.deleted, "number");
  assert.equal(typeof result.results.xpAuditLog.errors, "number");
  assert.equal(result.results.xpAuditLog.deleted, 1);
  assert.equal(countXpAuditLogRows(), 0);
});

test("cleanupXpAuditLog honors a configurable retention.xpAuditLog value", async () => {
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
  insertXpAuditLogRow(tenDaysAgo);

  const current = databaseSettings.getUserDatabaseSettings();
  databaseSettings.updateDatabaseSettings({
    retention: { ...current.retention, xpAuditLog: 15 },
  });

  let result = await cleanup.cleanupXpAuditLog();
  assert.equal(result.deleted, 0);
  assert.equal(countXpAuditLogRows(), 1);

  databaseSettings.updateDatabaseSettings({
    retention: { ...databaseSettings.getUserDatabaseSettings().retention, xpAuditLog: 5 },
  });

  result = await cleanup.cleanupXpAuditLog();
  assert.equal(result.deleted, 1);
  assert.equal(countXpAuditLogRows(), 0);
});

test("PATCH /api/settings/database round-trips retention.xpAuditLog without stripping it", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, xpAuditLog: 45 },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.retention.xpAuditLog, 45);

  const getResponse = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
  const getBody = await getResponse.json();

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.retention.xpAuditLog, 45);
});
