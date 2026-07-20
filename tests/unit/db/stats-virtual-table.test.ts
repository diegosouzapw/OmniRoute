import assert from "node:assert/strict";
import test from "node:test";

import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { getDatabaseStats } from "../../../src/lib/db/stats.ts";

function createAdapter(
  virtualTableError = "no such module: vec0",
  regularRow: { count: number } | undefined = { count: 3 },
  returnUndefinedRegularRow = false
): SqliteAdapter {
  return {
    driver: "better-sqlite3",
    open: true,
    name: ":memory:",
    raw: {},
    pragma(name: string) {
      return name === "page_size" ? 4096 : name === "page_count" ? 2 : -2000;
    },
    prepare(sql: string) {
      if (sql.includes("FROM sqlite_master WHERE type='table'")) {
        return { all: () => [{ name: "regular" }, { name: "vec_memories" }] } as never;
      }
      if (sql.includes('COUNT(*) as count FROM "regular"')) {
        return { get: () => (returnUndefinedRegularRow ? undefined : regularRow) } as never;
      }
      if (sql.includes('COUNT(*) as count FROM "vec_memories"')) {
        throw new Error(virtualTableError);
      }
      if (sql.includes("FROM dbstat")) {
        return { get: () => ({ size: 1024 }) } as never;
      }
      if (sql.includes("FROM sqlite_master WHERE type='index'")) {
        return { all: () => [] } as never;
      }
      throw new Error(`Unexpected SQL: ${sql}`);
    },
    exec() {},
    transaction: (fn) => fn,
    immediate(fn) {
      fn();
    },
    async backup() {},
    checkpoint() {},
    close() {},
  };
}

test("database stats tolerate virtual tables whose module is unavailable", () => {
  const stats = getDatabaseStats(createAdapter());

  assert.deepEqual(stats.tables, [
    { name: "regular", rowCount: 3, size: 1024 },
    { name: "vec_memories", rowCount: 0, size: 1024 },
  ]);
});

test("database stats do not mask unrelated table errors", () => {
  assert.throws(() => getDatabaseStats(createAdapter("database disk image is malformed")), {
    message: "database disk image is malformed",
  });
});

test("database stats tolerate an undefined COUNT result", () => {
  const stats = getDatabaseStats(createAdapter("no such module: vec0", { count: 3 }, true));

  assert.equal(stats.tables[0]?.rowCount, 0);
});
