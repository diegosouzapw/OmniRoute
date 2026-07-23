import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard for #7494 — getDbInstance()'s probe-then-reopen pattern
// (src/lib/db/core.ts) closes a throwaway "probe" connection and then opens
// a "real" one right after via openSqliteDatabase(). That pattern is safe
// for per-open-handle drivers (better-sqlite3, node:sqlite) but NOT for
// sql.js: openSqliteDatabase()'s sql.js fallback (getSqlJsAdapter()) always
// returns the SAME module-global cached singleton for a given filePath, so
// closing "the probe" closes the ONLY connection that file will ever get —
// every subsequent query (including the "real" connection) throws sql.js's
// raw "Database closed" string, matching the reported crash-loop verbatim.

test(
  "raw sql.js singleton mechanism: closing the adapter returned by " +
    "getSqlJsAdapter() poisons every later query against the SAME singleton " +
    "(documents WHY the probe/close pattern is unsafe for sql.js — #7494)",
  async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7494-mech-"));
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    try {
      const { preInitSqlJs, getSqlJsAdapter } = await import(
        "../../src/lib/db/adapters/driverFactory"
      );

      const boot = await preInitSqlJs(sqliteFile);
      boot.exec("CREATE TABLE t (id INTEGER)");
      boot.exec("INSERT INTO t (id) VALUES (1)");

      const probe = getSqlJsAdapter(sqliteFile);
      probe!
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'"
        )
        .get();
      probe!.close();

      // Same module-global singleton — a raw .close() poisons it for good.
      const real = getSqlJsAdapter(sqliteFile);
      assert.throws(
        () => real!.pragma("journal_mode = WAL"),
        /Database closed/,
        "sanity: confirms the underlying sql.js singleton mechanism this bug exploits"
      );
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  }
);

test(
  "closeProbeIfSafe() (src/lib/db/core.ts) must NOT close a sql.js-backed " +
    "adapter — it is the module-global singleton getDbInstance()'s probe/reopen " +
    "pattern relies on staying alive across the probe step (#7494)",
  async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7494-guard-"));
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    try {
      const { preInitSqlJs, getSqlJsAdapter } = await import(
        "../../src/lib/db/adapters/driverFactory"
      );
      const { closeProbeIfSafe } = await import("../../src/lib/db/core");

      const boot = await preInitSqlJs(sqliteFile);
      boot.exec("CREATE TABLE t (id INTEGER)");
      boot.exec("INSERT INTO t (id) VALUES (1)");

      // Simulate getDbInstance()'s probe step: inspect schema, then "close" via
      // the guarded helper instead of a raw .close() call.
      const probe = getSqlJsAdapter(sqliteFile);
      probe!
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'"
        )
        .get();
      closeProbeIfSafe(probe);

      assert.equal(probe!.open, true, "closeProbeIfSafe() must not close a sql.js adapter");

      // Simulate the 'real' connection getDbInstance() opens right after — the
      // SAME singleton — and must still be fully usable.
      const real = getSqlJsAdapter(sqliteFile);
      assert.doesNotThrow(
        () => real!.pragma("journal_mode = WAL"),
        "getSqlJsAdapter() must not hand back a closed/dead adapter after " +
          "closeProbeIfSafe() (#7494)"
      );

      // Drain the sql.js adapter's debounced persist timer (SAVE_DEBOUNCE_MS)
      // before removing the temp dir, so it doesn't fire against an
      // already-deleted path in the background.
      await new Promise((resolve) => setTimeout(resolve, 200));
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  }
);

test(
  "closeProbeIfSafe() still closes per-handle drivers (better-sqlite3) — the " +
    "guard is sql.js-specific, not a blanket no-op",
  async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7494-real-"));
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    try {
      const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory");
      const { closeProbeIfSafe } = await import("../../src/lib/db/core");

      const probe = tryOpenSync(sqliteFile);
      assert.ok(probe, "sanity: better-sqlite3/node:sqlite must be available in this test env");
      assert.equal(probe!.driver === "sql.js", false);

      closeProbeIfSafe(probe);

      assert.equal(probe!.open, false, "closeProbeIfSafe() must still close non-sql.js adapters");
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  }
);
