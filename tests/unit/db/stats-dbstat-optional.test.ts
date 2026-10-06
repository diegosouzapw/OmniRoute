/**
 * getDatabaseStats() must survive a SQLite build without the `dbstat` virtual
 * table.
 *
 * `dbstat` is compile-time optional (ENABLE_DBSTAT_VTAB) and is absent from
 * sql.js/WASM builds. Before the fix, the unguarded per-table `SELECT SUM(pgsize)
 * FROM dbstat` threw, which propagated out of getDatabaseStats() and made
 * GET/PATCH /api/settings/database return HTTP 500 — the whole database settings
 * page became unusable on those runtimes.
 */

import assert from "node:assert/strict";
import { test } from "node:test";

import { getDatabaseStats } from "@/lib/db/stats";
import type { PreparedStatement, SqliteAdapter } from "@/lib/db/adapters/types";

type FakeOptions = {
  /** Error message thrown by any statement touching `dbstat`. */
  dbstatError?: string;
  /** Tables reported by sqlite_master. */
  tables?: string[];
  /** Make the dbstat probe succeed but fail for this specific table. */
  failOnlyOn?: string;
  /** Return `{ size: null }` from dbstat, as SUM() does over an empty table. */
  nullSize?: boolean;
};

/**
 * Minimal in-memory SqliteAdapter double. Only the surface getDatabaseStats()
 * actually touches is implemented; everything else throws so an accidental new
 * dependency shows up loudly instead of silently passing.
 */
function createFakeDb({
  dbstatError,
  tables = ["alpha", "beta"],
  failOnlyOn,
  nullSize,
}: FakeOptions = {}): SqliteAdapter {
  const prepare = (sql: string): PreparedStatement => {
    const touchesDbstat = /\bdbstat\b/i.test(sql);

    return {
      run() {
        throw new Error(`unexpected run(): ${sql}`);
      },
      get(...params: unknown[]) {
        if (touchesDbstat) {
          const probing = params[0] === "sqlite_master";
          // `failOnlyOn` models a driver that answers the probe but fails later.
          if (failOnlyOn) {
            if (params[0] === failOnlyOn) throw new Error(dbstatError ?? "no such table: dbstat");
          } else if (dbstatError) {
            throw new Error(dbstatError);
          }
          if (probing) return { size: 0 };
          return { size: nullSize ? null : 4096 };
        }
        if (/COUNT\(\*\)/i.test(sql)) return { count: 7 };
        throw new Error(`unexpected get(): ${sql}`);
      },
      all() {
        if (/type='table'/i.test(sql)) return tables.map((name) => ({ name }));
        if (/type='index'/i.test(sql)) {
          return tables.length ? [{ name: "idx_alpha", tableName: "alpha" }] : [];
        }
        throw new Error(`unexpected all(): ${sql}`);
      },
    };
  };

  return {
    driver: "sql.js",
    open: true,
    name: ":memory:",
    prepare,
    exec() {},
    pragma(pragmaStr: string) {
      if (pragmaStr === "page_size") return 4096;
      if (pragmaStr === "page_count") return 100;
      if (pragmaStr === "cache_size") return -65536;
      throw new Error(`unexpected pragma: ${pragmaStr}`);
    },
    transaction<T>(fn: (...args: unknown[]) => T) {
      return fn;
    },
    immediate(fn: () => void) {
      fn();
    },
    async backup() {},
    checkpoint() {},
    close() {},
    raw: null,
  } satisfies SqliteAdapter;
}

test("getDatabaseStats reports per-table sizes when dbstat is available", () => {
  const stats = getDatabaseStats(createFakeDb());

  assert.equal(stats.totalSize, 4096 * 100);
  assert.deepEqual(
    stats.tables.map((t) => [t.name, t.rowCount, t.size]),
    [
      ["alpha", 7, 4096],
      ["beta", 7, 4096],
    ]
  );
});

test("getDatabaseStats degrades to size 0 when dbstat module is missing", () => {
  const stats = getDatabaseStats(createFakeDb({ dbstatError: "no such module: dbstat" }));

  // The call must succeed; only per-table byte sizes are lost.
  assert.deepEqual(
    stats.tables.map((t) => [t.name, t.rowCount, t.size]),
    [
      ["alpha", 7, 0],
      ["beta", 7, 0],
    ]
  );
  // Database-level numbers come from pragmas and stay accurate.
  assert.equal(stats.totalSize, 4096 * 100);
  assert.equal(stats.pageCount, 100);
  assert.equal(stats.cacheSize, -65536);
  assert.equal(stats.indexes.length, 1);
});

test("getDatabaseStats degrades when the driver reports dbstat as a missing table", () => {
  // SQLite builds lacking ENABLE_DBSTAT_VTAB commonly report this variant.
  const stats = getDatabaseStats(createFakeDb({ dbstatError: "no such table: dbstat" }));

  assert.deepEqual(
    stats.tables.map((t) => t.size),
    [0, 0]
  );
});

test("getDatabaseStats degrades when the driver prefixes its error class", () => {
  // Real drivers stringify as "SqliteError: ..." / "RuntimeError: ...", so the
  // guard must not be anchored to the start of the message.
  for (const message of [
    "SqliteError: no such table: dbstat",
    "RuntimeError: no such module: dbstat",
  ]) {
    const stats = getDatabaseStats(createFakeDb({ dbstatError: message }));
    assert.deepEqual(
      stats.tables.map((t) => t.size),
      [0, 0],
      `expected degradation for ${message}`
    );
  }
});

test("getDatabaseStats handles a database with no user tables", () => {
  // The shape a fresh install hits before any migration has run.
  const stats = getDatabaseStats(createFakeDb({ tables: [] }));

  assert.deepEqual(stats.tables, []);
  assert.deepEqual(stats.indexes, []);
  assert.equal(stats.totalSize, 4096 * 100);
});

test("getDatabaseStats maps a NULL dbstat sum to 0", () => {
  // SUM(pgsize) returns NULL when a table occupies no pages.
  const stats = getDatabaseStats(createFakeDb({ nullSize: true }));

  assert.deepEqual(
    stats.tables.map((t) => t.size),
    [0, 0]
  );
});

test("getDatabaseStats propagates a dbstat failure that appears after the probe", () => {
  // Documents current behaviour: the probe establishes availability once, so a
  // later per-table failure is treated as a genuine fault rather than a missing
  // module. Anything else would mask real I/O errors mid-iteration.
  assert.throws(
    () => getDatabaseStats(createFakeDb({ failOnlyOn: "beta" })),
    /no such table: dbstat/
  );
});

test("getDatabaseStats still propagates unrelated dbstat failures", () => {
  // A genuine fault (disk I/O, corruption) must not be silently swallowed.
  assert.throws(
    () => getDatabaseStats(createFakeDb({ dbstatError: "database disk image is malformed" })),
    /database disk image is malformed/
  );
});
