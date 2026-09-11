import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function readFlag(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

const dryRun = args.includes("--dry-run");
const help = args.includes("--help") || args.includes("-h");

if (help) {
  console.log(`Usage: npm run db:migrate-to-postgres -- [--sqlite <storage.sqlite>] [--url <postgres://...>] [--schema <name>] [--dry-run]

Copies every table of a SQLite OmniRoute database into PostgreSQL. The PostgreSQL schema
is created and migrated first (same code path as server startup), then rows are inserted
with INSERT OR IGNORE semantics, so re-running never duplicates rows.

Defaults: --sqlite = <DATA_DIR>/storage.sqlite, --url = OMNIROUTE_DATABASE_URL,
--schema = OMNIROUTE_DATABASE_SCHEMA. Field-level encryption is preserved as-is, so run
with the same STORAGE_ENCRYPTION_KEY / API_KEY_SECRET the source instance used.`);
  process.exit(0);
}

const url = readFlag("--url") ?? process.env.OMNIROUTE_DATABASE_URL;
if (!url) {
  console.error("Missing PostgreSQL URL: pass --url or set OMNIROUTE_DATABASE_URL");
  process.exit(2);
}
process.env.OMNIROUTE_DATABASE_URL = url;
const schema = readFlag("--schema") ?? process.env.OMNIROUTE_DATABASE_SCHEMA;
if (schema) process.env.OMNIROUTE_DATABASE_SCHEMA = schema;
delete process.env.OMNIROUTE_DATABASE_IMPORT_SQLITE;
process.env.DISABLE_SQLITE_AUTO_BACKUP ??= "true";
process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK ??= "1";

const core = await import("../../src/lib/db/core.ts");
const { importSqliteIntoPostgres, hasCompletedSqliteImport } =
  await import("../../src/lib/db/postgresImport.ts");

const sqliteFile = path.resolve(readFlag("--sqlite") ?? path.join(core.DATA_DIR, "storage.sqlite"));
if (!fs.existsSync(sqliteFile)) {
  console.error(`SQLite source not found: ${sqliteFile}`);
  process.exit(2);
}

const target = core.getDbInstance();
if (target.driver !== "postgres") {
  console.error(
    `Expected the PostgreSQL driver but got ${target.driver}; check OMNIROUTE_DATABASE_URL`
  );
  process.exit(2);
}
if (hasCompletedSqliteImport(target)) {
  console.log(
    "Note: this PostgreSQL database already recorded a completed SQLite import; rows that exist are left untouched."
  );
}

const report = importSqliteIntoPostgres(target, sqliteFile, { dryRun });
const rows = report.tables.map((table) => ({
  table: table.table,
  sqlite: table.sourceRows,
  imported: table.importedRows,
  postgres: table.targetRows,
  skipped_columns: table.skippedColumns.join(",") || "",
}));
console.table(rows);
const mismatches = report.tables.filter((table) => !dryRun && table.targetRows < table.sourceRows);
if (report.skippedTables.length) console.log(`Skipped tables: ${report.skippedTables.join(", ")}`);
console.log(
  `${dryRun ? "Dry run" : "Import"} finished in ${report.durationMs}ms for ${sqliteFile}`
);
if (mismatches.length) {
  console.warn(
    `Tables where PostgreSQL holds fewer rows than SQLite: ${mismatches.map((t) => t.table).join(", ")}`
  );
}
core.closeDbInstance();
process.exit(mismatches.length ? 1 : 0);
