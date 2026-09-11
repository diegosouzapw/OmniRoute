// The auto-cleanup scheduler used to run a full `VACUUM` after ANY deletion
// (`totalDeleted > 0`), no matter how small. `db.exec("VACUUM")` is synchronous
// and blocks the entire process -- on a multi-GB database that freezes all HTTP
// traffic for 15-20 minutes. Observed live: a routine cleanup that freed 2-6
// rows re-triggered a full VACUUM on every restart, because the new terminal-
// batch cleanup (see db-terminal-batch-and-file-cleanup.test.ts) almost always
// finds a handful of newly-aged-out batches.
//
// Row count was never the right signal anyway: a few oversized
// batch_item_checkpoints rows can free far more space than thousands of tiny
// audit-log rows. This pins vacuumIfWorthwhile()'s real gate instead: SQLite's
// own free-page count (PRAGMA freelist_count), not "were any rows deleted".

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vacuum-threshold-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");

function withEnv<T>(key: string, value: string | undefined, fn: () => T): T {
  const prev = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
  try {
    return fn();
  } finally {
    if (prev === undefined) delete process.env[key];
    else process.env[key] = prev;
  }
}

test("getVacuumMinReclaimableBytes: defaults to 100 MB", () => {
  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", undefined, () => {
    assert.equal(cleanup.getVacuumMinReclaimableBytes(), 100 * 1024 * 1024);
  });
});

test("getVacuumMinReclaimableBytes: honors the env override, including 0 (always vacuum)", () => {
  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", "5", () => {
    assert.equal(cleanup.getVacuumMinReclaimableBytes(), 5 * 1024 * 1024);
  });
  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", "0", () => {
    assert.equal(cleanup.getVacuumMinReclaimableBytes(), 0);
  });
});

test("getVacuumMinReclaimableBytes: rejects garbage and falls back to the default", () => {
  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", "not-a-number", () => {
    assert.equal(cleanup.getVacuumMinReclaimableBytes(), 100 * 1024 * 1024);
  });
  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", "-1", () => {
    assert.equal(cleanup.getVacuumMinReclaimableBytes(), 100 * 1024 * 1024);
  });
});

test("vacuumIfWorthwhile: skips VACUUM when reclaimable space is under the threshold", () => {
  const db = core.getDbInstance();
  db.exec("CREATE TABLE IF NOT EXISTS vacuum_threshold_probe (id INTEGER PRIMARY KEY, v TEXT)");
  // A handful of tiny rows leaves negligible freelist space after deletion --
  // nowhere near the (very high, deliberately unreachable in this test) threshold.
  db.exec("INSERT INTO vacuum_threshold_probe (v) VALUES ('a'), ('b'), ('c')");
  db.exec("DELETE FROM vacuum_threshold_probe");

  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", "999999", () => {
    // Must not throw, and specifically must not attempt to run VACUUM at all --
    // proven by the fact that a VACUUM would otherwise reset freelist_count.
    const before = cleanup.getReclaimableBytes(db);
    cleanup.vacuumIfWorthwhile(db, "[test]");
    const after = cleanup.getReclaimableBytes(db);
    assert.equal(after, before, "skipping VACUUM must leave the freelist untouched");
  });
});

test("vacuumIfWorthwhile: runs VACUUM once reclaimable space clears the threshold", () => {
  const db = core.getDbInstance();
  db.exec("CREATE TABLE IF NOT EXISTS vacuum_threshold_probe2 (id INTEGER PRIMARY KEY, v TEXT)");
  const insert = db.prepare("INSERT INTO vacuum_threshold_probe2 (v) VALUES (?)");
  const big = "x".repeat(4096);
  for (let i = 0; i < 200; i++) insert.run(big);
  db.exec("DELETE FROM vacuum_threshold_probe2");

  const reclaimableBeforeVacuum = cleanup.getReclaimableBytes(db);
  assert.ok(reclaimableBeforeVacuum > 0, "sanity: the delete above must have freed some pages");

  withEnv("OMNIROUTE_VACUUM_MIN_RECLAIMABLE_MB", "0", () => {
    cleanup.vacuumIfWorthwhile(db, "[test]");
  });

  // A successful VACUUM rebuilds the file with no free pages left over.
  assert.equal(cleanup.getReclaimableBytes(db), 0, "VACUUM must have actually run");
});
