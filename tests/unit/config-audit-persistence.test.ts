import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-config-audit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const audit = await import("../../src/domain/configAudit.ts");

type CountRow = { c: number };

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function countRows(): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT COUNT(*) AS c FROM config_audit_log").get() as CountRow;
  return row.c;
}

function insertOldRow(id: string, daysAgo: number) {
  const db = core.getDbInstance();
  const old = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(
    `INSERT INTO config_audit_log
       (id, timestamp, action, target, target_id, target_name, before_json, after_json, diff_json, source, note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    old,
    "update",
    "provider",
    "p1",
    "P1",
    null,
    null,
    JSON.stringify({ added: [], removed: [], changed: [], isEmpty: true }),
    "api",
    null
  );
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("recordChange persists to SQLite, not memory", () => {
  const db = core.getDbInstance();
  const tableRow = db
    .prepare(
      "SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name='config_audit_log'"
    )
    .get() as CountRow;
  assert.equal(tableRow.c, 1);

  const e = audit.recordChange(
    "update",
    "provider",
    "p1",
    "My Provider",
    { a: 1 },
    { a: 2 },
    "api",
    null
  );
  assert.equal(countRows(), 1);

  const { entries, total } = audit.getAuditLog({ target: "provider" });
  assert.equal(total, 1);
  assert.equal(entries[0].id, e.id);
  assert.deepEqual(entries[0].diff.changed, [{ key: "a", from: 1, to: 2 }]);
});

test("pagination + filters read from SQLite", () => {
  audit.recordChange("create", "combo", "c1", "C1", null, { models: ["m1"] }, "dashboard");
  audit.recordChange(
    "update",
    "combo",
    "c1",
    "C1",
    { models: ["m1"] },
    { models: ["m1", "m2"] },
    "api"
  );

  const { entries, total } = audit.getAuditLog({ target: "combo", limit: 1, offset: 0 });
  assert.equal(total, 2);
  assert.equal(entries.length, 1);
});

test("getRollbackState returns the before snapshot", () => {
  const e = audit.recordChange("update", "policy", "pol1", "Pol", { x: 1 }, { x: 2 }, "api");
  assert.deepEqual(audit.getRollbackState(e.id), { x: 1 });
});

test("computeDiff stays pure", () => {
  const d = audit.computeDiff({ a: 1 }, { a: 2, b: 3 });
  assert.deepEqual(d.added, ["b"]);
  assert.deepEqual(d.changed, [{ key: "a", from: 1, to: 2 }]);
});

test("resetAuditLog clears persisted rows", () => {
  audit.recordChange("update", "provider", "p1", "P1", { a: 1 }, { a: 2 }, "api");
  assert.equal(countRows(), 1);
  audit.resetAuditLog();
  assert.equal(countRows(), 0);
});

test("cleanupConfigAudit prunes rows beyond retentionDays", async () => {
  insertOldRow("audit-old", 40);
  const r = await cleanup.cleanupConfigAudit(30);
  assert.equal(r.deleted, 1);
  assert.equal(countRows(), 0);
});

test("cleanupConfigAudit keeps recent rows within retention", async () => {
  insertOldRow("audit-recent", 5);
  const r = await cleanup.cleanupConfigAudit(30);
  assert.equal(r.deleted, 0);
  assert.equal(countRows(), 1);
});

test("runAutoCleanup includes a configAudit result", async () => {
  insertOldRow("audit-old-2", 40);
  const result = await cleanup.runAutoCleanup();
  assert.ok(result.results.configAudit);
  assert.equal(typeof result.results.configAudit.deleted, "number");
  assert.equal(typeof result.results.configAudit.errors, "number");
  assert.equal(result.results.configAudit.deleted, 1);
  assert.equal(countRows(), 0);
});
