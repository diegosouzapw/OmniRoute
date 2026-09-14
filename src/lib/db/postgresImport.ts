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

type Logger = (message: string) => void;

interface ImportContext {
  source: SqliteAdapter;
  target: SqliteAdapter;
  dryRun: boolean;
  batchSize: number;
  log: Logger;
}

const IMPORT_MARKER_KEY = "postgres_import_completed_at";
const DEFAULT_BATCH_SIZE = 500;
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

function listForeignKeyPairs(target: SqliteAdapter): Array<{ child: string; parent: string }> {
  return target
    .prepare(
      `SELECT tc.table_name AS child, ccu.table_name AS parent
       FROM information_schema.table_constraints tc
       JOIN information_schema.constraint_column_usage ccu
         ON ccu.constraint_name = tc.constraint_name
        AND ccu.constraint_schema = tc.constraint_schema
       WHERE tc.constraint_type = 'FOREIGN KEY'
         AND tc.table_schema = current_schema()`
    )
    .all() as Array<{ child: string; parent: string }>;
}

function orderTablesByForeignKeys(target: SqliteAdapter, tables: string[]): string[] {
  const wanted = new Map(tables.map((name) => [name.toLowerCase(), name]));
  const parentsOf = new Map<string, Set<string>>();
  for (const { child, parent } of listForeignKeyPairs(target)) {
    const childKey = child.toLowerCase();
    const parentKey = parent.toLowerCase();
    if (childKey === parentKey || !wanted.has(childKey) || !wanted.has(parentKey)) continue;
    const set = parentsOf.get(childKey) ?? new Set<string>();
    set.add(parentKey);
    parentsOf.set(childKey, set);
  }
  const ordered: string[] = [];
  const placed = new Set<string>();
  let remaining = Array.from(wanted.keys());
  while (remaining.length) {
    const ready = remaining.filter((key) =>
      Array.from(parentsOf.get(key) ?? []).every((parent) => placed.has(parent))
    );
    const batch = ready.length ? ready : [remaining[0]];
    for (const key of batch) {
      ordered.push(wanted.get(key) as string);
      placed.add(key);
    }
    remaining = remaining.filter((key) => !placed.has(key));
  }
  return ordered;
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

function buildAddColumnStatement(
  table: string,
  column: ColumnInfo,
  targetHasRows: boolean
): string {
  const type = column.type && column.type.trim() ? column.type.trim() : "TEXT";
  const parts = [`ALTER TABLE ${quote(table)} ADD COLUMN ${quote(column.name)} ${type}`];
  if (column.dflt_value !== null && column.dflt_value !== undefined)
    parts.push(`DEFAULT ${column.dflt_value}`);
  if (column.notnull && !targetHasRows && column.dflt_value !== null) parts.push("NOT NULL");
  return parts.join(" ");
}

function tryAddColumn(
  target: SqliteAdapter,
  table: string,
  column: ColumnInfo,
  targetHasRows: boolean,
  log: Logger
): boolean {
  try {
    target.exec(buildAddColumnStatement(table, column, targetHasRows));
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(
      `[DB] import: could not add ${table}.${column.name} on PostgreSQL (${message}); its values are skipped`
    );
    return false;
  }
}

function addMissingColumns(
  target: SqliteAdapter,
  table: string,
  sourceColumns: ColumnInfo[],
  targetColumns: string[],
  targetHasRows: boolean,
  log: Logger
): string[] {
  const present = new Set(targetColumns.map((c) => c.toLowerCase()));
  return sourceColumns
    .filter(
      (column) =>
        !present.has(column.name.toLowerCase()) && column.name.toLowerCase() !== ROWID_COLUMN
    )
    .filter((column) => tryAddColumn(target, table, column, targetHasRows, log))
    .map((column) => column.name);
}

function createMissingTable(
  source: SqliteAdapter,
  target: SqliteAdapter,
  table: string,
  log: Logger
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

function openSource(target: SqliteAdapter, sqliteFile: string): SqliteAdapter {
  if (target.driver !== "postgres")
    throw new Error("[DB] importSqliteIntoPostgres requires a PostgreSQL target adapter");
  if (!fs.existsSync(sqliteFile)) throw new Error(`[DB] SQLite source not found: ${sqliteFile}`);
  const source = tryOpenSync(sqliteFile, { readonly: true, fileMustExist: true });
  if (!source)
    throw new Error("[DB] No synchronous SQLite driver is available to read the source database");
  return source;
}

function resolveTargetColumns(ctx: ImportContext, table: string): string[] {
  const columns = listColumns(ctx.target, table);
  if (columns.length || ctx.dryRun) return columns;
  return createMissingTable(ctx.source, ctx.target, table, ctx.log);
}

function ensureSourceColumnsOnTarget(
  ctx: ImportContext,
  table: string,
  sourceInfo: ColumnInfo[],
  targetColumns: string[]
): void {
  if (ctx.dryRun) return;
  const targetHasRows = countRows(ctx.target, table) > 0;
  const added = addMissingColumns(
    ctx.target,
    table,
    sourceInfo,
    targetColumns,
    targetHasRows,
    ctx.log
  );
  if (added.length === 0) return;
  targetColumns.push(...added);
  ctx.log(`[DB] import: added ${table} columns missing on PostgreSQL: ${added.join(", ")}`);
}

function splitSharedColumns(
  sourceColumns: string[],
  targetColumns: string[]
): { columns: string[]; skippedColumns: string[] } {
  const targetSet = new Set(targetColumns.map((c) => c.toLowerCase()));
  return {
    columns: sourceColumns.filter(
      (c) => targetSet.has(c.toLowerCase()) && c.toLowerCase() !== ROWID_COLUMN
    ),
    skippedColumns: sourceColumns.filter((c) => !targetSet.has(c.toLowerCase())),
  };
}

function copyTableRows(
  ctx: ImportContext,
  table: string,
  columns: string[],
  sourceRows: number
): number {
  const useRowid = !isWithoutRowid(ctx.source, table);
  const size = chunkSize(columns.length, ctx.batchSize);
  let importedRows = 0;
  ctx.target.transaction(() => {
    for (let offset = 0; offset < sourceRows; offset += size) {
      const rows = readBatch(ctx.source, table, columns, offset, size, useRowid);
      if (rows.length === 0) break;
      importedRows += insertBatch(ctx.target, table, columns, rows);
    }
    resetIdentitySequences(ctx.target, table, columns);
  })();
  return importedRows;
}

function logTableResult(log: Logger, entry: ImportTableReport): void {
  const skipped = entry.skippedColumns.length
    ? ` skipped_columns=${entry.skippedColumns.join(",")}`
    : "";
  log(
    `[DB] import: ${entry.table} source=${entry.sourceRows} imported=${entry.importedRows} target=${entry.targetRows}${skipped}`
  );
}

function skipTable(ctx: ImportContext, report: ImportReport, table: string, reason: string): void {
  report.skippedTables.push(table);
  ctx.log(`[DB] import: skipping ${table} (${reason})`);
}

function importTable(ctx: ImportContext, report: ImportReport, table: string): void {
  const targetColumns = resolveTargetColumns(ctx, table);
  if (targetColumns.length === 0) {
    skipTable(ctx, report, table, "no such table on PostgreSQL");
    return;
  }
  const sourceInfo = listColumnInfo(ctx.source, table);
  ensureSourceColumnsOnTarget(ctx, table, sourceInfo, targetColumns);
  const { columns, skippedColumns } = splitSharedColumns(
    sourceInfo.map((column) => column.name),
    targetColumns
  );
  if (columns.length === 0) {
    skipTable(ctx, report, table, "no shared columns");
    return;
  }
  const sourceRows = countRows(ctx.source, table);
  const shouldCopy = !ctx.dryRun && sourceRows > 0;
  const entry: ImportTableReport = {
    table,
    sourceRows,
    importedRows: shouldCopy ? copyTableRows(ctx, table, columns, sourceRows) : 0,
    targetRows: ctx.dryRun ? 0 : countRows(ctx.target, table),
    skippedColumns,
  };
  report.tables.push(entry);
  logTableResult(ctx.log, entry);
}

function writeImportMarker(target: SqliteAdapter, sqliteFile: string, tableCount: number): void {
  target
    .prepare("INSERT OR REPLACE INTO db_meta (key, value) VALUES (?, ?)")
    .run(
      IMPORT_MARKER_KEY,
      JSON.stringify({ at: new Date().toISOString(), sqliteFile, tables: tableCount })
    );
}

export function importSqliteIntoPostgres(
  target: SqliteAdapter,
  sqliteFile: string,
  options: ImportOptions = {}
): ImportReport {
  const started = Date.now();
  const source = openSource(target, sqliteFile);
  const ctx: ImportContext = {
    source,
    target,
    dryRun: Boolean(options.dryRun),
    batchSize: options.batchSize ?? DEFAULT_BATCH_SIZE,
    log: options.log ?? ((message: string) => console.log(message)),
  };
  const report: ImportReport = { sqliteFile, tables: [], skippedTables: [], durationMs: 0 };
  try {
    for (const table of orderTablesByForeignKeys(target, listSourceTables(source))) {
      importTable(ctx, report, table);
    }
    if (!ctx.dryRun) writeImportMarker(target, sqliteFile, report.tables.length);
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
