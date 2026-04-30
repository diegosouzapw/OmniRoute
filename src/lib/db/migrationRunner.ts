/**
 * Migration Runner — Versioned SQL Migrations for SQLite
 *
 * Reads numbered `.sql` files from the migrations directory and applies
 * them sequentially, tracking applied versions in a `schema_migrations` table.
 *
 * Naming convention: `NNN_description.sql` (e.g., `001_initial_schema.sql`)
 *
 * All migrations run within a single transaction — all-or-nothing per file.
 *
 * Safety features:
 * - Pre-migration backup before applying any pending migrations
 * - Mass-migration detection (abort if too many pending on existing DB)
 * - Migration name mismatch warning (detects renumbering issues)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type Database from "better-sqlite3";

/**
 * Resolve the migrations directory path safely across platforms.
 * On Windows with global npm installs, `import.meta.url` may not be a valid
 * `file://` URL, causing `fileURLToPath` to throw `ERR_INVALID_FILE_URL_PATH`.
 */
function resolveMigrationsDir(): string {
  const configuredDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
  if (typeof configuredDir === "string" && configuredDir.trim().length > 0) {
    return path.resolve(configuredDir);
  }

  try {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), "migrations");
  } catch {
    // Fall through to more defensive URL parsing below.
  }

  // Fix #1704: On Windows with global npm installs, import.meta.url may contain
  // CI build-time paths (e.g., /home/runner/work/...) that are not valid file://
  // URLs on Windows. Extract the path portion directly and normalize it.
  const metaUrl = import.meta.url;
  if (typeof metaUrl === "string" && metaUrl.startsWith("file://")) {
    try {
      // Strip the file:// prefix and decode, then normalize for the platform
      const rawPath = decodeURIComponent(
        metaUrl.replace(/^file:\/\/\//, "/").replace(/^file:\/\//, "")
      );
      return path.join(path.dirname(path.resolve(rawPath)), "migrations");
    } catch {
      // Fall through to process.cwd fallback
    }
  }

  // Last resort: use process.cwd to find migrations relative to the app root
  const cwdFallback = path.join(process.cwd(), "src", "lib", "db", "migrations");
  if (fs.existsSync(cwdFallback)) {
    return cwdFallback;
  }
  const appFallback = path.join(process.cwd(), "app", "src", "lib", "db", "migrations");
  if (fs.existsSync(appFallback)) {
    return appFallback;
  }

  throw new Error(
    "[Migration] Could not resolve migrations directory. Set OMNIROUTE_MIGRATIONS_DIR."
  );
}

const MIGRATIONS_DIR = resolveMigrationsDir();

/**
 * Maximum number of migrations allowed to run in a single startup on an
 * existing database. If more migrations are pending than this threshold,
 * it likely means the migration tracking table was accidentally wiped,
 * and running all migrations from scratch could cause data loss.
 *
 * Set to 0 to disable this safety check.
 */
const MAX_PENDING_MIGRATIONS_ON_EXISTING_DB = 50;

const RENAMED_MIGRATION_COMPATIBILITY = [
  {
    fromVersion: "022",
    fromName: "call_logs_summary_storage",
    toVersion: "025",
    toName: "call_logs_summary_storage",
  },
  {
    fromVersion: "028",
    fromName: "provider_connection_max_concurrent",
    toVersion: "029",
    toName: "provider_connection_max_concurrent",
  },
  {
    fromVersion: "032",
    fromName: "create_reasoning_cache",
    toVersion: "033",
    toName: "create_reasoning_cache",
  },
] as const;

const LEGACY_VERSION_SLOT_MIGRATIONS = [
  { version: "028", name: "evals_tables" },
  { version: "029", name: "webhooks_templates" },
  { version: "030", name: "mcp_scopes_api_keys" },
  { version: "031", name: "api_keys_expires" },
  { version: "032", name: "detailed_logs_warnings" },
  { version: "033", name: "provider_connections_block_extra_usage" },
] as const;

const PHYSICAL_SCHEMA_SENTINELS = [
  { version: "028", tableName: "batches", description: "batches table" },
  { version: "024", tableName: "sync_tokens", description: "sync_tokens table" },
  { version: "022", tableName: "memory_fts", description: "memory_fts virtual table" },
  { version: "019", tableName: "context_handoffs", description: "context_handoffs table" },
  { version: "017", tableName: "version_manager", description: "version_manager table" },
  { version: "016", tableName: "skill_executions", description: "skill_executions table" },
  { version: "015", tableName: "memories", description: "memories table" },
  { version: "013", tableName: "quota_snapshots", description: "quota_snapshots table" },
  { version: "011", tableName: "webhooks", description: "webhooks table" },
  { version: "010", tableName: "model_combo_mappings", description: "model_combo_mappings table" },
  { version: "008", tableName: "registered_keys", description: "registered_keys table" },
  { version: "006", tableName: "request_detail_logs", description: "request_detail_logs table" },
  { version: "004", tableName: "proxy_registry", description: "proxy_registry table" },
  { version: "002", tableName: "mcp_tool_audit", description: "mcp_tool_audit table" },
] as const;

const INITIAL_SCHEMA_SENTINELS = ["provider_connections", "combos", "call_logs"] as const;

/**
 * Ensure the schema_migrations tracking table exists.
 */
function ensureMigrationsTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

/**
 * Get all migration files sorted by version number.
 */
function getMigrationFiles(): Array<{ version: string; name: string; path: string }> {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];

  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((filename) => {
      const match = filename.match(/^(\d+)_(.+)\.sql$/);
      if (!match) return null;
      return {
        version: match[1],
        name: match[2],
        path: path.join(MIGRATIONS_DIR, filename),
      };
    })
    .filter(Boolean) as Array<{ version: string; name: string; path: string }>;
}

/**
 * Get list of already-applied migration versions.
 */
function getAppliedVersions(db: Database.Database): Set<string> {
  const rows = db.prepare("SELECT version FROM _omniroute_migrations").all() as Array<{
    version: string;
  }>;
  return new Set(rows.map((r) => r.version));
}

/**
 * Get applied migration records (version + name) for mismatch detection.
 */
function getAppliedRecords(db: Database.Database): Array<{ version: string; name: string }> {
  return db
    .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version")
    .all() as Array<{
    version: string;
    name: string;
  }>;
}

function hasTable(db: Database.Database, tableName: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return Boolean(row?.name);
}

function hasColumn(db: Database.Database, tableName: string, columnName: string): boolean {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name?: string }>;
  return columns.some((column) => column.name === columnName);
}

function ensureColumn(
  db: Database.Database,
  tableName: string,
  columnName: string,
  ddl: string
): void {
  if (!hasColumn(db, tableName, columnName)) {
    db.exec(ddl);
  }
}

function isProviderConnectionMaxConcurrentMigration(migration: {
  version: string;
  name: string;
}): boolean {
  return migration.version === "029";
}

function applyProviderConnectionMaxConcurrentMigration(db: Database.Database): void {
  ensureColumn(
    db,
    "provider_connections",
    "max_concurrent",
    "ALTER TABLE provider_connections ADD COLUMN max_concurrent INTEGER"
  );
  db.exec(
    "CREATE INDEX IF NOT EXISTS idx_pc_max_concurrent ON provider_connections(provider, max_concurrent)"
  );
}

function isApiKeyLifecycleMigration(migration: { version: string; name: string }): boolean {
  return migration.version === "032";
}

function applyApiKeyLifecycleMigration(db: Database.Database): void {
  ensureColumn(db, "api_keys", "revoked_at", "ALTER TABLE api_keys ADD COLUMN revoked_at TEXT");
  ensureColumn(db, "api_keys", "expires_at", "ALTER TABLE api_keys ADD COLUMN expires_at TEXT");
  ensureColumn(db, "api_keys", "last_used_at", "ALTER TABLE api_keys ADD COLUMN last_used_at TEXT");
  ensureColumn(db, "api_keys", "key_prefix", "ALTER TABLE api_keys ADD COLUMN key_prefix TEXT");
  ensureColumn(db, "api_keys", "ip_allowlist", "ALTER TABLE api_keys ADD COLUMN ip_allowlist TEXT");
  ensureColumn(db, "api_keys", "scopes", "ALTER TABLE api_keys ADD COLUMN scopes TEXT");

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_api_keys_revoked_at ON api_keys(revoked_at);
    CREATE INDEX IF NOT EXISTS idx_api_keys_expires_at ON api_keys(expires_at);
  `);
}

function isSearchRequestTypeMigration(migration: { version: string; name: string }): boolean {
  return migration.version === "007";
}

function applySearchRequestTypeMigration(db: Database.Database): void {
  ensureColumn(
    db,
    "call_logs",
    "request_type",
    "ALTER TABLE call_logs ADD COLUMN request_type TEXT DEFAULT NULL"
  );
  db.exec("CREATE INDEX IF NOT EXISTS idx_call_logs_request_type ON call_logs(request_type);");
}

function inferPhysicalSchemaBaseline(db: Database.Database): {
  version: string;
  description: string;
} | null {
  for (const sentinel of PHYSICAL_SCHEMA_SENTINELS) {
    if (hasTable(db, sentinel.tableName)) {
      return {
        version: sentinel.version,
        description: sentinel.description,
      };
    }
  }

  const hasInitialSchema = INITIAL_SCHEMA_SENTINELS.every((tableName) => hasTable(db, tableName));
  if (hasInitialSchema) {
    return {
      version: "001",
      description: "initial schema tables",
    };
  }

  return null;
}

function getPlausiblePendingCount(
  files: Array<{ version: string; name: string; path: string }>,
  baselineVersion: string
): number {
  const baseline = Number.parseInt(baselineVersion, 10);
  return files.filter((file) => Number.parseInt(file.version, 10) > baseline).length;
}

/**
 * Detect migration name mismatches — when a migration version number
 * has been reused/renumbered with a different name. This is a strong signal
 * that the migration tracking is corrupted or migrations were renumbered.
 */
function detectNameMismatches(
  appliedRecords: Array<{ version: string; name: string }>,
  files: Array<{ version: string; name: string; path: string }>
): Array<{ version: string; appliedName: string; diskName: string }> {
  const appliedByName = new Map(appliedRecords.map((r) => [r.version, r.name]));
  const mismatches: Array<{ version: string; appliedName: string; diskName: string }> = [];

  for (const file of files) {
    const appliedName = appliedByName.get(file.version);
    if (appliedName && appliedName !== file.name) {
      mismatches.push({
        version: file.version,
        appliedName,
        diskName: file.name,
      });
    }
  }

  return mismatches;
}

function reconcileRenumberedMigrations(
  db: Database.Database,
  files: Array<{ version: string; name: string; path: string }>
): boolean {
  let repaired = false;

  for (const compatibility of RENAMED_MIGRATION_COMPATIBILITY) {
    const hasTargetFile = files.some(
      (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
    );
    const hasSourceFile = files.some(
      (file) => file.version === compatibility.fromVersion && file.name !== compatibility.fromName
    );

    if (!hasTargetFile || !hasSourceFile) {
      continue;
    }

    const legacyRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(compatibility.fromVersion, compatibility.fromName) as
      | { version: string; name: string }
      | undefined;
    if (!legacyRow) {
      continue;
    }

    const targetRow = db
      .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
      .get(compatibility.toVersion) as { version: string } | undefined;

    const applyRepair = db.transaction(() => {
      if (targetRow) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          compatibility.fromVersion,
          compatibility.fromName
        );
      } else {
        db.prepare(
          "UPDATE _omniroute_migrations SET version = ?, name = ? WHERE version = ? AND name = ?"
        ).run(
          compatibility.toVersion,
          compatibility.toName,
          compatibility.fromVersion,
          compatibility.fromName
        );
      }
    });

    applyRepair();
    repaired = true;
    console.warn(
      `[Migration] Reconciled renamed migration ${compatibility.fromVersion}_${compatibility.fromName} ` +
        `to ${compatibility.toVersion}_${compatibility.toName} to preserve pending migrations.`
    );

    // After the compat rewrite, verify the old version slot is now free.
    // A residual row (from a failed prior run, manual intervention, or edge-case
    // UPDATE conflict) at the old version would shadow a NEW migration file
    // placed at that version number — e.g. 028_create_files_and_batches.sql
    // would be skipped because getAppliedVersions() still sees version "028".
    const residualRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
      .get(compatibility.fromVersion) as { version: string; name: string } | undefined;
    if (residualRow) {
      console.warn(
        `[Migration] ⚠️  Residual row at version ${compatibility.fromVersion} ` +
          `(name: "${residualRow.name}") still present after compat rewrite — ` +
          `removing to unblock new migration at this version slot.`
      );
      db.prepare("DELETE FROM _omniroute_migrations WHERE version = ?").run(
        compatibility.fromVersion
      );
    }
  }

  return repaired;
}

function rehomeLegacyVersionSlotMigrations(
  db: Database.Database,
  files: Array<{ version: string; name: string; path: string }>
): boolean {
  let repaired = false;
  const diskNamesByVersion = new Map(files.map((file) => [file.version, file.name]));

  for (const legacy of LEGACY_VERSION_SLOT_MIGRATIONS) {
    const diskName = diskNamesByVersion.get(legacy.version);
    if (!diskName || diskName === legacy.name) {
      continue;
    }

    const legacyRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(legacy.version, legacy.name) as { version: string; name: string } | undefined;
    if (!legacyRow) {
      continue;
    }

    const legacyVersion = `legacy-${legacy.version}-${legacy.name}`;
    const applyRepair = db.transaction(() => {
      const existingLegacyRow = db
        .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
        .get(legacyVersion) as { version: string } | undefined;

      if (existingLegacyRow) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          legacy.version,
          legacy.name
        );
        return;
      }

      db.prepare("UPDATE _omniroute_migrations SET version = ? WHERE version = ? AND name = ?").run(
        legacyVersion,
        legacy.version,
        legacy.name
      );
    });

    applyRepair();
    repaired = true;
    console.warn(
      `[Migration] Rehomed legacy migration ${legacy.version}_${legacy.name} ` +
        `to ${legacyVersion} so current ${legacy.version}_${diskName} can apply.`
    );
  }

  return repaired;
}

/**
 * Create a pre-migration backup of the SQLite database using VACUUM INTO.
 * Returns the backup path on success, null on failure.
 */
function createPreMigrationBackup(db: Database.Database): string | null {
  try {
    const sqliteFile = db.name;
    if (!sqliteFile || sqliteFile === ":memory:") return null;

    const backupDir = path.join(path.dirname(sqliteFile), "db_backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `db_${timestamp}_pre-migration.sqlite`);
    const escapedBackupPath = backupPath.replace(/'/g, "''");

    db.exec(`VACUUM INTO '${escapedBackupPath}'`);
    console.log(`[Migration] Pre-migration backup created: ${backupPath}`);
    return backupPath;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[Migration] Failed to create pre-migration backup: ${message}`);
    return null;
  }
}

/**
 * Run all pending migrations in order.
 * Returns the number of migrations applied.
 *
 * Includes safety checks:
 * 1. Detects migration name mismatches (renumbering) and warns
 * 2. Aborts if too many pending migrations on an existing DB (likely wipe)
 * 3. Creates automatic backup before running any migrations
 */
export function runMigrations(db: Database.Database, options?: { isNewDb?: boolean }): number {
  const isNewDb = options?.isNewDb === true;
  ensureMigrationsTable(db);

  const files = getMigrationFiles();
  rehomeLegacyVersionSlotMigrations(db, files);
  reconcileRenumberedMigrations(db, files);
  const applied = getAppliedVersions(db);
  const appliedRecords = getAppliedRecords(db);

  // ── Safety Check 1: Detect migration name mismatches (renumbering) ──
  const mismatches = detectNameMismatches(appliedRecords, files);
  if (mismatches.length > 0) {
    console.error(
      `[Migration] ⚠️  CRITICAL: ${mismatches.length} migration version(s) have been renumbered!`
    );
    for (const m of mismatches) {
      console.error(
        `  Version ${m.version}: applied as "${m.appliedName}" but disk has "${m.diskName}"`
      );
    }
    console.error(
      `[Migration] This indicates migrations were renumbered between releases, ` +
        `which can cause the migration runner to skip or re-run migrations incorrectly.`
    );
    console.error(
      `[Migration] The version-only tracking will skip these (version already applied), ` +
        `but please report this to the OmniRoute maintainers.`
    );
  }

  const pending = files.filter((f) => !applied.has(f.version));
  if (pending.length === 0) {
    return 0; // Nothing to do
  }

  // ── Safety Check 2: Mass-migration detection (abort if existing DB + many migrations) ──
  // Skip in test environments where fresh DBs legitimately have many pending migrations.
  const isTestEnvironment =
    process.env.NODE_ENV === "test" ||
    process.env.VITEST !== undefined ||
    (typeof process.argv !== "undefined" && process.argv.some((arg) => arg.includes("test")));

  if (
    !isTestEnvironment &&
    !isNewDb &&
    process.env.DISABLE_SQLITE_AUTO_BACKUP !== "true" &&
    MAX_PENDING_MIGRATIONS_ON_EXISTING_DB > 0 &&
    applied.size > 0 &&
    pending.length > MAX_PENDING_MIGRATIONS_ON_EXISTING_DB
  ) {
    const physicalBaseline = inferPhysicalSchemaBaseline(db);
    const plausiblePendingCount = physicalBaseline
      ? getPlausiblePendingCount(files, physicalBaseline.version)
      : null;

    if (plausiblePendingCount !== null && pending.length <= plausiblePendingCount) {
      console.warn(
        `[Migration] Allowing ${pending.length} pending migrations on an existing database ` +
          `because the physical schema only proves ${physicalBaseline?.version} ` +
          `(${physicalBaseline?.description}).`
      );
    } else {
      const schemaHint =
        physicalBaseline && plausiblePendingCount !== null
          ? ` Physical schema already shows ${physicalBaseline.version} ` +
            `(${physicalBaseline.description}), so at most ${plausiblePendingCount} pending ` +
            `migration(s) are expected from a legitimate upgrade.`
          : "";
      const msg =
        `[Migration] 🛑 ABORT: Detected ${pending.length} pending migrations on an existing database ` +
        `(threshold is ${MAX_PENDING_MIGRATIONS_ON_EXISTING_DB}). ` +
        `This usually means the migration tracking table was accidentally wiped. ` +
        `Running all migrations from scratch will cause data loss or schema errors.` +
        schemaHint;
      console.error(msg);
      throw new Error(msg);
    }
  }

  // ── Safety Check 3: Pre-migration backup ──
  // Skip backup if it's a completely fresh database (0 applied and all pending)
  // or if running in tests (where AUTO_BACKUP might be disabled)
  if (applied.size > 0 && process.env.DISABLE_SQLITE_AUTO_BACKUP !== "true") {
    createPreMigrationBackup(db);
  }

  let count = 0;

  for (const migration of pending) {
    const applyMigration = db.transaction(() => {
      if (isProviderConnectionMaxConcurrentMigration(migration)) {
        applyProviderConnectionMaxConcurrentMigration(db);
      } else if (isApiKeyLifecycleMigration(migration)) {
        applyApiKeyLifecycleMigration(db);
      } else if (isSearchRequestTypeMigration(migration)) {
        applySearchRequestTypeMigration(db);
      } else {
        const sql = fs.readFileSync(migration.path, "utf-8");
        db.exec(sql);
      }
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        migration.version,
        migration.name
      );
    });

    try {
      applyMigration();
      count++;
      console.log(`[Migration] Applied: ${migration.version}_${migration.name}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[Migration] FAILED: ${migration.version}_${migration.name} — ${message}`);
      throw err; // Re-throw to prevent DB from starting in inconsistent state
    }
  }

  if (count > 0) {
    console.log(`[Migration] ${count} migration(s) applied successfully.`);
  }

  return count;
}

/**
 * Get migration status for diagnostics.
 */
export function getMigrationStatus(db: Database.Database): {
  applied: Array<{ version: string; name: string; applied_at: string }>;
  pending: Array<{ version: string; name: string }>;
} {
  ensureMigrationsTable(db);

  const appliedRows = db
    .prepare("SELECT version, name, applied_at FROM _omniroute_migrations ORDER BY version")
    .all() as Array<{ version: string; name: string; applied_at: string }>;

  const appliedVersions = new Set(appliedRows.map((r) => r.version));
  const allFiles = getMigrationFiles();
  const pending = allFiles.filter((f) => !appliedVersions.has(f.version));

  return { applied: appliedRows, pending };
}
