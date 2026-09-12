/**
 * Post-cleanup VACUUM gate.
 *
 * VACUUM rewrites the entire database file: on a ~3GB DB that is a 3GB WAL plus a
 * full page-cache/I/O burst on the host. The cleanup scheduler used to run it after
 * every non-empty cleanup — including startup cleanups that freed ~100 rows — which
 * is pure churn. The gate skips VACUUM unless the cleanup freed enough rows to
 * justify a full rewrite (OMNIROUTE_VACUUM_MIN_DELETED_ROWS, default 1000).
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getVacuumMinDeletedRows,
  shouldVacuumAfterCleanup,
  vacuumAfterCleanup,
} from "../../src/lib/db/cleanup.ts";

describe("shouldVacuumAfterCleanup", () => {
  it("skips VACUUM when nothing was deleted", () => {
    assert.equal(shouldVacuumAfterCleanup(0, 1000), false);
  });

  it("skips VACUUM for cleanups below the threshold", () => {
    assert.equal(shouldVacuumAfterCleanup(1, 1000), false);
    assert.equal(shouldVacuumAfterCleanup(999, 1000), false);
  });

  it("runs VACUUM at and above the threshold", () => {
    assert.equal(shouldVacuumAfterCleanup(1000, 1000), true);
    assert.equal(shouldVacuumAfterCleanup(5000, 1000), true);
  });

  it("treats a 0 threshold as always-vacuum", () => {
    const saved = process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS;
    process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS = "0";
    try {
      assert.equal(getVacuumMinDeletedRows(), 0);
      assert.equal(shouldVacuumAfterCleanup(1, 0), true);
    } finally {
      if (saved === undefined) delete process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS;
      else process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS = saved;
    }
  });

  it("defaults to 1000 rows and honors the env override", () => {
    const saved = process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS;
    try {
      delete process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS;
      assert.equal(getVacuumMinDeletedRows(), 1000);
      process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS = "50";
      assert.equal(getVacuumMinDeletedRows(), 50);
      assert.equal(shouldVacuumAfterCleanup(60), true);
      process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS = "not-a-number";
      assert.equal(getVacuumMinDeletedRows(), 1000);
    } finally {
      if (saved === undefined) delete process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS;
      else process.env.OMNIROUTE_VACUUM_MIN_DELETED_ROWS = saved;
    }
  });
});

describe("vacuumAfterCleanup", () => {
  it("does not exec VACUUM below the threshold but says why", async () => {
    const execed: string[] = [];
    const logs: string[] = [];
    const ran = await vacuumAfterCleanup(
      125,
      (sql) => execed.push(sql),
      (m) => logs.push(m)
    );
    assert.equal(ran, false);
    assert.deepEqual(execed, []);
    assert.ok(logs.some((line) => line.includes("skipping VACUUM")));
  });

  it("execs VACUUM once when enough rows were freed", async () => {
    const execed: string[] = [];
    const ran = await vacuumAfterCleanup(
      1000,
      (sql) => execed.push(sql),
      () => {},
      () => {}
    );
    assert.equal(ran, true);
    assert.deepEqual(execed, ["VACUUM"]);
  });

  it("swallows VACUUM failures into an error log like the old inline path", async () => {
    const errLogs: string[] = [];
    const ran = await vacuumAfterCleanup(
      5000,
      () => {
        throw new Error("disk full");
      },
      () => {},
      (m) => errLogs.push(m)
    );
    assert.equal(ran, false);
    assert.ok(errLogs.some((line) => line.includes("VACUUM after cleanup failed")));
  });
});
