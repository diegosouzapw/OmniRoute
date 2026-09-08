// checkpointDb() used to call `wal_checkpoint(mode)` and unconditionally return true,
// ignoring the {busy, log, checkpointed} row the pragma always returns. On a server
// that is rarely fully idle, wal_checkpoint(TRUNCATE) regularly comes back busy=1 --
// it got SOME lock to copy frames back into the main file, but not the exclusive one
// TRUNCATE needs to shrink the file -- yet callers logged "completed" every time
// anyway. Observed live: an 11.7 GB WAL file, nearly as large as the 11 GB main
// database it shadows, with the periodic scheduler's own logs claiming success the
// entire time.
//
// checkpointDb() itself isn't gated by isAutomatedTestProcess() (only the scheduler
// wrapper around it is -- see db-wal-truncate-scheduler.test.ts, which pins that
// wiring via source inspection since the scheduler can't run in this harness). This
// exercises the real function against a real WAL-mode SQLite file and a genuinely
// busy second connection, the same way SQLite itself reports busy=1 in production.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wal-checkpoint-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

function makeWalDb(): { file: string; db: InstanceType<typeof Database> } {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wal-checkpoint-db-"));
  const file = path.join(dir, "test.sqlite");
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  // better-sqlite3 defaults busy_timeout to 5000ms, which would make the busy-path
  // assertions below block for 5s each retrying a lock they're deliberately testing
  // will not become available -- 0 makes SQLITE_BUSY come back immediately.
  db.pragma("busy_timeout = 0");
  db.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, v TEXT)");
  db.exec("INSERT INTO t (v) VALUES ('hello')");
  return { file, db };
}

test("checkpointDb reports failure (not success) when TRUNCATE cannot get the lock it needs", () => {
  const { file, db } = makeWalDb();

  // A second connection with an open read transaction reproduces the real
  // "server never fully idle" condition that let this bug hide in production --
  // reads happen continuously, so TRUNCATE's exclusivity requirement is rarely met.
  const reader = new Database(file);
  reader.exec("BEGIN");
  reader.prepare("SELECT * FROM t").get();

  assert.equal(
    core.checkpointDb(db, "TRUNCATE"),
    false,
    "must report failure while a concurrent reader holds the file open"
  );
  assert.notEqual(
    fs.statSync(`${file}-wal`).size,
    0,
    "the WAL file must NOT have been truncated while busy"
  );

  reader.exec("COMMIT");
  reader.close();
  db.close();
});

test("checkpointDb reports success once TRUNCATE actually gets exclusivity", () => {
  const { file, db } = makeWalDb();

  const reader = new Database(file);
  reader.exec("BEGIN");
  reader.prepare("SELECT * FROM t").get();
  assert.equal(core.checkpointDb(db, "TRUNCATE"), false);

  // Committing (even without closing the connection) releases the lock TRUNCATE needs.
  reader.exec("COMMIT");

  assert.equal(
    core.checkpointDb(db, "TRUNCATE"),
    true,
    "must report success once no connection holds a blocking lock"
  );
  assert.equal(fs.statSync(`${file}-wal`).size, 0, "the WAL file must be truncated to zero");

  reader.close();
  db.close();
});
