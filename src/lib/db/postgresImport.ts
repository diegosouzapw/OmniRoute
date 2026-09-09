import fs from "node:fs";
import type { SqliteAdapter } from "./adapters/types";
import { tryOpenSync } from "./adapters/driverFactory";
import { ROWID_COLUMN } from "./adapters/postgres/sqlTranslator";

export interface ImportTableReport {
  table: string;
  sourceRows: number;
  importedRows: number;
  targetRows: number;
  skippedColumns: string[];
}

export interface ImportReport {
  sqliteFile: string;
  tables: ImportTableReport[];
  skippedTables: string[];
  durationMs: number;
}

export interface ImportOptions {
  batchSize?: number;
  dryRun?: boolean;
  log?: (message: string) => void;
}

const IMPORT_MARKER_KEY = "postgres_import_completed_at";
const SKIPPED_TABLES = new Set([
  "_omniroute_migrations",
  "sqlite_sequence",
  "sqlite_stat1",
  "sqlite_stat4",
]);
const SKIPPED_PREFIXES = ["memory_fts", "vec_memories", "sqlite_"];

function quote(identifier: string): string {
  return `"${identifier.replace(/"/g, '""')}"`;
}

function listSourceTables(source: SqliteAdapter): string[] {
  const rows = source
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
    .all() as Array<{ name: string }>;
  return rows
    .map((row) => row.name)
    .filter(
      (name) =>
        !SKIPPED_TABLES.has(name) && !SKIPPED_PREFIXES.some((prefix) => name.startsWith(prefix))
    );
}

interface ColumnInfo {
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
}

function listColumnInfo(db: SqliteAdapter, table: string): ColumnInfo[] {
  return db.prepare(`PRAGMA table_info(${quote(table)})`).all() as ColumnInfo[];
}

function listColumns(db: SqliteAdapter, table: string): string[] {
  return listColumnInfo(db, table).map((row) => row.name);
}

function addMissingColumns(
  target: SqliteAdapter,
  table: string,
  sourceColumns: ColumnInfo[],
  targetColumns: string[],
  targetHasRows: boolean,
  log: (message: string) => void
): string[] {
  const present = new Set(targetColumns.map((c) => c.toLowerCase()));
  const added: string[] = [];
  for (const column of sourceColumns) {
    if (present.has(column.name.toLowerCase()) || column.name.toLowerCase() === ROWID_COLUMN)
      continue;
    const type = column.type && column.type.trim() ? column.type.trim() : "TEXT";
    const parts = [`ALTER TABLE ${quote(table)} ADD COLUMN ${quote(column.name)} ${type}`];
    if (column.dflt_value !== null && column.dflt_value !== undefined)
      parts.push(`DEFAULT ${column.dflt_value}`);
    if (column.notnull && !targetHasRows && column.dflt_value !== null) parts.push("NOT NULL");
    try {
      target.exec(parts.join(" "));
      added.push(column.name);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log(
        `[DB] import: could not add ${table}.${column.name} on PostgreSQL (${message}); its values are skipped`
      );
    }
  }
  return added;
}

function createMissingTable(
  source: SqliteAdapter,
  target: SqliteAdapter,
  table: string,
  log: (message: string) => void
): string[] {
  const row = source
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(table) as { sql?: string } | undefined;
  if (!row?.sql) return [];
  const ddl = row.sql.replace(
    /^\s*CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?/i,
    "CREATE TABLE IF NOT EXISTS "
  );
  try {
    target.exec(ddl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(`[DB] import: could not create ${table} on PostgreSQL (${message}); its rows are skipped`);
    return [];
  }
  const columns = listColumns(target, table);
  if (columns.length) log(`[DB] import: created ${table} on PostgreSQL from the SQLite schema`);
  return columns;
}

function countRows(db: SqliteAdapter, table: string): number {
  const row = db.prepare(`SELECT COUNT(*) AS c FROM ${quote(table)}`).get() as
    { c: number } | undefined;
  return Number(row?.c ?? 0);
}

function isWithoutRowid(source: SqliteAdapter, table: string): boolean {
  try {
    source.prepare(`SELECT rowid FROM ${quote(table)} LIMIT 1`).get();
    return false;
  } catch {
    return true;
  }
}

function readBatch(
  source: SqliteAdapter,
  table: string,
  columns: string[],
  offset: number,
  limit: number,
  useRowid: boolean
): Array<Record<string, unknown>> {
  const columnList = columns.map(quote).join(", ");
  const order = useRowid ? "ORDER BY rowid" : "";
  return source
    .prepare(`SELECT ${columnList} FROM ${quote(table)} ${order} LIMIT ? OFFSET ?`)
    .all(limit, offset) as Array<Record<string, unknown>>;
}

function insertBatch(
  target: SqliteAdapter,
  table: string,
  columns: string[],
  rows: Array<Record<string, unknown>>
): number {
  if (rows.length === 0) return 0;
  const columnList = columns.map(quote).join(", ");
  const rowPlaceholders = `(${columns.map(() => "?").join(", ")})`;
  const values = rows.map(() => rowPlaceholders).join(", ");
  const params: unknown[] = [];
  for (const row of rows) for (const column of columns) params.push(row[column] ?? null);
  return target
    .prepare(`INSERT OR IGNORE INTO ${quote(table)} (${columnList}) VALUES ${values}`)
    .run(...params).changes;
}

function resetIdentitySequences(target: SqliteAdapter, table: string, columns: string[]): void {
  const info = target.prepare(`PRAGMA table_info(${quote(table)})`).all() as Array<{
    name: string;
    pk: number;
    type: string;
  }>;
  const pk = info.filter((column) => column.pk > 0);
  if (pk.length !== 1 || pk[0].type !== "INTEGER" || !columns.includes(pk[0].name)) return;
  target
    .prepare(
      `SELECT setval(pg_get_serial_sequence(?, ?), COALESCE((SELECT MAX(${quote(pk[0].name)}) FROM ${quote(table)}), 0) + 1, false)`
    )
    .run(table, pk[0].name);
}

function chunkSize(columnCount: number, requested: number): number {
  const maxRowsByParams = Math.floor(60000 / Math.max(columnCount, 1));
  return Math.max(1, Math.min(requested, maxRowsByParams));
}

export function importSqliteIntoPostgres(
  target: SqliteAdapter,
  sqliteFile: string,
  options: ImportOptions = {}
): ImportReport {
  const log = options.log ?? ((message: string) => console.log(message));
  const started = Date.now();
  if (target.driver !== "postgres")
    throw new Error("[DB] importSqliteIntoPostgres requires a PostgreSQL target adapter");
  if (!fs.existsSync(sqliteFile)) throw new Error(`[DB] SQLite source not found: ${sqliteFile}`);
  const source = tryOpenSync(sqliteFile, { readonly: true, fileMustExist: true });
  if (!source)
    throw new Error("[DB] No synchronous SQLite driver is available to read the source database");
  const report: ImportReport = { sqliteFile, tables: [], skippedTables: [], durationMs: 0 };
  try {
    for (const table of listSourceTables(source)) {
      let targetColumns = listColumns(target, table);
      if (targetColumns.length === 0 && !options.dryRun) {
        targetColumns = createMissingTable(source, target, table, log);
      }
      if (targetColumns.length === 0) {
        report.skippedTables.push(table);
        log(`[DB] import: skipping ${table} (no such table on PostgreSQL)`);
        continue;
      }
      const sourceInfo = listColumnInfo(source, table);
      const sourceColumns = sourceInfo.map((column) => column.name);
      if (!options.dryRun) {
        const targetHasRows = countRows(target, table) > 0;
        const added = addMissingColumns(
          target,
          table,
          sourceInfo,
          targetColumns,
          targetHasRows,
          log
        );
        if (added.length) {
          targetColumns.push(...added);
          log(`[DB] import: added ${table} columns missing on PostgreSQL: ${added.join(", ")}`);
        }
      }
      const targetSet = new Set(targetColumns.map((c) => c.toLowerCase()));
      const columns = sourceColumns.filter(
        (c) => targetSet.has(c.toLowerCase()) && c.toLowerCase() !== ROWID_COLUMN
      );
      const skippedColumns = sourceColumns.filter((c) => !targetSet.has(c.toLowerCase()));
      const sourceRows = countRows(source, table);
      const entry: ImportTableReport = {
        table,
        sourceRows,
        importedRows: 0,
        targetRows: 0,
        skippedColumns,
      };
      if (columns.length === 0) {
        report.skippedTables.push(table);
        log(`[DB] import: skipping ${table} (no shared columns)`);
        continue;
      }
      if (!options.dryRun && sourceRows > 0) {
        const useRowid = !isWithoutRowid(source, table);
        const size = chunkSize(columns.length, options.batchSize ?? 500);
        target.transaction(() => {
          for (let offset = 0; offset < sourceRows; offset += size) {
            const rows = readBatch(source, table, columns, offset, size, useRowid);
            if (rows.length === 0) break;
            entry.importedRows += insertBatch(target, table, columns, rows);
          }
          resetIdentitySequences(target, table, columns);
        })();
      }
      entry.targetRows = options.dryRun ? 0 : countRows(target, table);
      report.tables.push(entry);
      log(
        `[DB] import: ${table} source=${sourceRows} imported=${entry.importedRows} target=${entry.targetRows}${
          skippedColumns.length ? ` skipped_columns=${skippedColumns.join(",")}` : ""
        }`
      );
    }
    if (!options.dryRun) {
      target
        .prepare("INSERT OR REPLACE INTO db_meta (key, value) VALUES (?, ?)")
        .run(
          IMPORT_MARKER_KEY,
          JSON.stringify({ at: new Date().toISOString(), sqliteFile, tables: report.tables.length })
        );
    }
  } finally {
    try {
      source.close();
    } catch {}
  }
  report.durationMs = Date.now() - started;
  return report;
}

export function hasCompletedSqliteImport(target: SqliteAdapter): boolean {
  const row = target.prepare("SELECT value FROM db_meta WHERE key = ?").get(IMPORT_MARKER_KEY) as
    { value?: string } | undefined;
  return Boolean(row?.value);
}

function targetLooksEmpty(target: SqliteAdapter): boolean {
  const tables = ["provider_connections", "api_keys", "combos"];
  return tables.every((table) => {
    try {
      return countRows(target, table) === 0;
    } catch {
      return true;
    }
  });
}

export function importSqliteIntoPostgresOnSetup(
  target: SqliteAdapter,
  sqliteFile: string
): ImportReport | null {
  if (!fs.existsSync(sqliteFile)) {
    console.log(
      `[DB] import: OMNIROUTE_DATABASE_IMPORT_SQLITE is set but ${sqliteFile} does not exist; nothing to import`
    );
    return null;
  }
  if (hasCompletedSqliteImport(target)) {
    console.log(
      "[DB] import: SQLite data was already imported into this PostgreSQL database; skipping"
    );
    return null;
  }
  if (!targetLooksEmpty(target)) {
    console.warn(
      "[DB] import: PostgreSQL already holds provider connections, API keys or combos; refusing the automatic SQLite import. Run scripts/ops/migrate-sqlite-to-postgres.mjs explicitly if you want to merge."
    );
    return null;
  }
  console.log(`[DB] import: copying ${sqliteFile} into PostgreSQL (one-time setup import)`);
  const report = importSqliteIntoPostgres(target, sqliteFile);
  const totalRows = report.tables.reduce((sum, table) => sum + table.importedRows, 0);
  console.log(
    `[DB] import: done, ${totalRows} rows across ${report.tables.length} tables in ${report.durationMs}ms`
  );
  return report;
}
