// In-memory SqliteAdapter for migration fixtures that only need "a SQLite database",
// not a specific driver. Built on the built-in node:sqlite, so these tests run even
// where the better-sqlite3 native addon cannot load (#15107). Tests that exercise
// better-sqlite3 itself should use ./betterSqlite3Availability instead.

import { DatabaseSync } from "node:sqlite";
import { createNodeSqliteAdapterFromDatabase } from "../../../src/lib/db/adapters/nodeSqliteShared.ts";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";

export function openMemorySqliteAdapter(): SqliteAdapter {
  return createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
}
