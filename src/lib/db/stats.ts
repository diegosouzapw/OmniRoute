/**
 * Database Statistics Module
 *
 * Provides functions to retrieve database statistics including size, table counts, and performance metrics.
 */

import type Database from "better-sqlite3";
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

export function getDatabaseStats(): DatabaseStats {
  const db = getDbInstance();

  const pageSize = db.pragma("page_size", { simple: true }) as number;
  const pageCount = db.pragma("page_count", { simple: true }) as number;
  const cacheSize = db.pragma("cache_size", { simple: true }) as number;
  const totalSize = pageSize * pageCount;

  const tables = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
    )
    .all() as Array<{ name: string }>;

  const tableStats = tables.map((table) => {
    const rowCount = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get() as {
      count: number;
    };

    const tableSize = db
      .prepare(`SELECT SUM(pgsize) as size FROM dbstat WHERE name = ?`)
      .get(table.name) as { size: number | null };

    return {
      name: table.name,
      rowCount: rowCount.count,
      size: tableSize?.size || 0,
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
