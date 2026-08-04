import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #5217 — `trimCallLogsToMaxRows()` deleted up to batchSize=5000 ids in a single
 * `DELETE … IN (?, ?, …)` via `deleteCallLogRowsByIds`. SQLite caps a statement at
 * ~999 bound parameters by default, so any trim that needed to delete >999 rows
 * threw "too many SQL variables", aborting the trim and blocking the Request-log
 * table from being persisted/pruned. The delete must chunk the ids so a large
 * trim succeeds instead of throwing.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-trim-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

function insertCallLog(id: string, timestamp: string) {
  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, provider, detail_state
    )
    VALUES (@id, @timestamp, 'POST', '/v1/chat/completions', 200, 'openai/gpt-4.1', 'openai', 'none')
  `
  ).run({ id, timestamp });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("trimCallLogsToMaxRows deletes >999 rows in one pass without 'too many SQL variables'", () => {
  const db = core.getDbInstance();
  const total = 1500;
  const base = Date.parse("2026-01-01T00:00:00.000Z");
  const insertMany = db.transaction(() => {
    for (let i = 0; i < total; i++) {
      insertCallLog(`trim-${String(i).padStart(5, "0")}`, new Date(base + i * 1000).toISOString());
    }
  });
  insertMany();

  assert.equal(
    (db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as { cnt: number }).cnt,
    total
  );

  // Trim to 10 rows → 1490 ids must be deleted in a single trim batch (batchSize=5000),
  // which without chunking would exceed SQLite's ~999 bound-parameter limit and throw.
  let result: { deletedRows: number; deletedArtifacts: number } | undefined;
  assert.doesNotThrow(() => {
    result = callLogs.trimCallLogsToMaxRows(10);
  });

  assert.equal(result!.deletedRows, total - 10, "all overflow rows must be deleted (chunked)");
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as { cnt: number }).cnt,
    10,
    "exactly maxRows rows must remain"
  );
});

test("deleteCallLogsBefore deletes a batch larger than SQLite's variable limit without throwing", () => {
  const db = core.getDbInstance();
  // Exceed SQLITE_MAX_VARIABLE_NUMBER (999 on many builds, 32766 on newer ones).
  // deleteCallLogsBefore passes EVERY matching id to one DELETE … IN (...) — the
  // un-chunked version threw "too many SQL variables"; chunking must avoid it on
  // any build. 35k > the 32766 cap, so this reproduces even on modern SQLite.
  const total = 35000;
  const base = Date.parse("2026-01-01T00:00:00.000Z");
  const insertMany = db.transaction(() => {
    for (let i = 0; i < total; i++) {
      insertCallLog(`old-${String(i).padStart(5, "0")}`, new Date(base + i * 1000).toISOString());
    }
  });
  insertMany();

  let result: { deletedRows: number } | undefined;
  assert.doesNotThrow(() => {
    result = callLogs.deleteCallLogsBefore("2030-01-01T00:00:00.000Z");
  });

  assert.equal(result!.deletedRows, total, "every row before the cutoff must be deleted");
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as { cnt: number }).cnt,
    0
  );
});
