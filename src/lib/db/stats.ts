/**
 * Database Statistics Module
 *
 * Provides functions to retrieve database statistics including size, table counts, and performance metrics.
 */

import type { SqliteAdapter } from "./adapters/types";
import { getDbInstance } from "./core";

export interface DatabaseStats {
  totalSize: number;
  pageSize: number;
  pageCount: number;
  tables: Array<{
    name: string;
    rowCount: number;
    size: number;
  }>;
  indexes: Array<{
    name: string;
    tableName: string;
  }>;
  walSize?: number;
  cacheSize: number;
}

/**
 * `dbstat` is a compile-time-optional SQLite virtual table (ENABLE_DBSTAT_VTAB).
 * Builds without it — sql.js/WASM among them — reject the query with either
 * "no such module: dbstat" or "no such table: dbstat" depending on the build,
 * and drivers prefix their error class onto the message, so match loosely.
 *
 * Per-table byte sizes are a nice-to-have, so probe once and degrade to 0
 * rather than failing the whole stats call — and with it every caller,
 * including the database settings API.
 */
function isDbstatAvailable(db: SqliteAdapter): boolean {
  try {
    db.prepare(`SELECT SUM(pgsize) as size FROM dbstat WHERE name = ?`).get("sqlite_master");
    return true;
  } catch (error) {
    if (error instanceof Error && /no such (module|table): dbstat/i.test(error.message)) {
      return false;
    }
    throw error;
  }
}

export function getDatabaseStats(db: SqliteAdapter = getDbInstance()): DatabaseStats {
  const pageSize = db.pragma("page_size", { simple: true }) as number;
  const pageCount = db.pragma("page_count", { simple: true }) as number;
  const cacheSize = db.pragma("cache_size", { simple: true }) as number;
  const totalSize = pageSize * pageCount;

  const tables = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
    )
    .all() as Array<{ name: string }>;

  const dbstatAvailable = isDbstatAvailable(db);

  const tableStats = tables.map((table) => {
    let rowCount = 0;
    try {
      const quotedName = `"${table.name.replaceAll('"', '""')}"`;
      const row = db.prepare(`SELECT COUNT(*) as count FROM ${quotedName}`).get() as
        | { count: number }
        | undefined;
      rowCount = row?.count ?? 0;
    } catch (error) {
      if (!(error instanceof Error) || !error.message.startsWith("no such module:")) {
        throw error;
      }
      // Optional virtual-table modules may be unavailable on this connection.
    }

    let size = 0;
    if (dbstatAvailable) {
      const tableSize = db
        .prepare(`SELECT SUM(pgsize) as size FROM dbstat WHERE name = ?`)
        .get(table.name) as { size: number | null } | undefined;
      size = tableSize?.size || 0;
    }

    return {
      name: table.name,
      rowCount,
      size,
    };
  });

  const indexes = db
    .prepare(
      `SELECT name, tbl_name as tableName FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%' ORDER BY name`
    )
    .all() as Array<{ name: string; tableName: string }>;

  return {
    totalSize,
    pageSize,
    pageCount,
    tables: tableStats,
    indexes,
    cacheSize,
  };
}
