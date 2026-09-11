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
import type { SqliteAdapter } from "./adapters/types";
import { DEFAULT_DATABASE_SETTINGS } from "@/types/databaseSettings";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";
import {
  LEGACY_VERSION_SLOT_MIGRATIONS,
  OPTIONAL_FTS5_MIGRATION_VERSIONS,
  RENAMED_MIGRATION_COMPATIBILITY,
  SUPERSEDED_DUPLICATE_MIGRATIONS,
} from "./migrationRunner/constants";
import { getExtraMigrationFiles } from "./migrationRunner/extraDirs";
import { migrationConsole as console } from "./migrationRunner/logger";
import {
  createPreMigrationBackup,
  hashFileSync,
  type PreMigrationBackupReceipt,
} from "./migrationRunner/preMigrationBackup";
import {
  detectNameMismatches,
  getPlausiblePendingCount,
  hasColumn,
  hasLedgerRepairCandidates,
  hasPhysicalTable,
  hasTable,
  inferPhysicalSchemaBaseline,
  reconcileRenumberedMigrations,
  rehomeLegacyVersionSlotMigrations,
} from "./migrationRunner/schemaState";

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

  const checkLocations = (basePath: string) => {
    const locations = [
      path.join(basePath, "migrations"),
      path.join(basePath, "src", "lib", "db", "migrations"),
      path.join(basePath, "app", "src", "lib", "db", "migrations"),
    ];
    for (const loc of locations) {
      if (fs.existsSync(loc)) return loc;
    }
    return null;
  };

  try {
    let currentDir = path.dirname(fileURLToPath(import.meta.url));
    while (currentDir !== path.dirname(currentDir)) {
      const found = checkLocations(currentDir);
      if (found) return found;
      currentDir = path.dirname(currentDir);
    }
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
      let currentDir = path.dirname(path.resolve(rawPath));
      while (currentDir !== path.dirname(currentDir)) {
        const found = checkLocations(currentDir);
        if (found) return found;
        currentDir = path.dirname(currentDir);
      }
    } catch {
      // Fall through to process.cwd fallback
    }
  }

  // Last resort: use process.cwd to find migrations relative to the app root
  const fromCwd = checkLocations(process.cwd());
  if (fromCwd) return fromCwd;

  throw new Error(
    "[Migration] Could not resolve migrations directory. Set OMNIROUTE_MIGRATIONS_DIR."
  );
}

const MIGRATIONS_DIR = resolveMigrationsDir();

/**
 * Default maximum number of migrations allowed to run in a single startup on an
 * existing database. If more migrations are pending than this threshold,
 * it likely means the migration tracking table was accidentally wiped,
 * and running all migrations from scratch could cause data loss.
 *
 * Set the threshold to 0 (via `OMNIROUTE_MAX_PENDING_MIGRATIONS`) to disable
 * this safety check.
 */
const DEFAULT_MAX_PENDING_MIGRATIONS_ON_EXISTING_DB = 50;

/**
 * Resolve the mass-migration safety threshold, allowing an operator to override
 * the default via the `OMNIROUTE_MAX_PENDING_MIGRATIONS` env var (#3416). This
 * is read at CALL TIME inside runMigrations() so a backup restore can raise the
 * limit (or `0` to disable the check) without a code change. Mirrors the
 * `OMNIROUTE_MIGRATIONS_DIR` convention used in resolveMigrationsDir(). Falls
 * back to the default on missing or invalid (non-numeric / negative) input.
 */
function resolveMaxPendingMigrations(): number {
  const raw = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
  if (typeof raw === "string" && raw.trim().length > 0) {
    const parsed = Number.parseInt(raw.trim(), 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return DEFAULT_MAX_PENDING_MIGRATIONS_ON_EXISTING_DB;
}

/**
 * Raised by the mass-migration safety check when far more migrations are pending
 * than the resolved threshold — a strong signal the migration tracking table was
 * wiped (e.g. a restored backup). Given its own type so callers/loggers can
 * recognize the memoized cascade and keep repeated logs concise (#6260).
 */
export class MigrationSafetyAbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MigrationSafetyAbortError";
  }
}

/**
 * Memoized mass-migration abort (#6260). After a backup restore wipes the
 * migration tracking table, EVERY downstream `ensureDbInitialized()` re-opens
 * the DB and re-calls `runMigrations()`, which used to recompute the abort and
 * re-`console.error` the full banner 11+ times. Caching the thrown instance
 * (keyed by the exact message it would compute) lets repeated calls in the same
 * process throw the SAME instance and log a single concise line instead.
 */
let memoizedSafetyAbort: MigrationSafetyAbortError | null = null;

const fts5SupportCache = new WeakMap<SqliteAdapter, boolean>();

/**
 * Ensure the schema_migrations tracking table exists.
 */
function ensureMigrationsTable(db: SqliteAdapter): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

function isOptionalFts5Migration(migration: { version: string; name: string }): boolean {
  return OPTIONAL_FTS5_MIGRATION_VERSIONS.has(migration.version);
}

export function supportsFts5(db: SqliteAdapter): boolean {
  const cached = fts5SupportCache.get(db);
  if (cached !== undefined) {
    return cached;
  }

  try {
    const probeTable = `__omniroute_fts5_probe_${crypto.randomUUID().replace(/-/g, "_")}`;
    db.transaction(() => {
      db.exec(`CREATE VIRTUAL TABLE "${probeTable}" USING fts5(content);`);
      db.exec(`DROP TABLE "${probeTable}";`);
    })();
    fts5SupportCache.set(db, true);
    return true;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    if (/no such module:\s*fts5/i.test(message)) {
      fts5SupportCache.set(db, false);
      return false;
    }
    throw error;
  }
}

function isDeferredUnsupportedMigration(
  db: SqliteAdapter,
  migration: { version: string; name: string }
): boolean {
  return isOptionalFts5Migration(migration) && !supportsFts5(db);
}

/**
 * Get all migration files sorted by version number.
 */
function getMigrationFiles(): Array<{ version: string; name: string; path: string }> {
  // The extra directories are an independent set: a missing core directory must not
  // make them vanish silently.
  if (!fs.existsSync(MIGRATIONS_DIR)) return getExtraMigrationFiles();

  const files = fs
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

  // Detect version collisions early: two files sharing the same numeric prefix
  // would otherwise be silently skipped by the runner (only the first applied
  // would record version=NNN in _omniroute_migrations; the rest would never run).
  // SUPERSEDED_DUPLICATE_MIGRATIONS lists legitimate "renamed" pairs and is OK.
  const byVersion = new Map<string, string[]>();
  for (const f of files) {
    if (!byVersion.has(f.version)) byVersion.set(f.version, []);
    byVersion.get(f.version)!.push(f.name);
  }
  const realCollisions: Array<{ version: string; names: string[] }> = [];
  for (const [version, names] of byVersion.entries()) {
    if (names.length <= 1) continue;
    const liveNames = names.filter(
      (name) =>
        !SUPERSEDED_DUPLICATE_MIGRATIONS.some((sup) => sup.version === version && sup.name === name)
    );
    if (liveNames.length > 1) {
      realCollisions.push({ version, names: liveNames });
    }
  }
  if (realCollisions.length > 0) {
    const summary = realCollisions
      .map((c) => `version=${c.version} → [${c.names.join(", ")}]`)
      .join("; ");
    throw new Error(
      `Migration version collision detected: ${summary}. ` +
        `Each migration file must have a unique numeric prefix. Rename one of the ` +
        `colliding files (and add a retroactive guard in isSchemaAlreadyApplied for ` +
        `DBs that already applied the old number). See _tasks/features-v3.8.4/9route/POST-MERGE-AUDIT.md.`
    );
  }

  // Extra directories registered via OMNIROUTE_EXTRA_MIGRATIONS_DIRS, appended
  // AFTER the numeric set so a distribution's own schema always lands on top of
  // the upstream one. Their versions are namespaced (`ee-134`), so they cannot
  // collide with a numeric slot, and every downstream consumer here — the applied
  // set, the gap reconciliation, the name-mismatch check — keys on the version
  // string and needs no further change. Empty and filesystem-free when unset.
  return [...files, ...getExtraMigrationFiles()];
}

function filterSupersededDuplicateMigrations(
  files: Array<{ version: string; name: string; path: string }>
): Array<{ version: string; name: string; path: string }> {
  return files.filter((file) => {
    const superseded = SUPERSEDED_DUPLICATE_MIGRATIONS.find(
      (migration) => migration.version === file.version && migration.name === file.name
    );
    if (!superseded) {
      return true;
    }

    const hasReplacement = files.some(
      (candidate) =>
        candidate.version === superseded.supersededByVersion &&
        candidate.name === superseded.supersededByName
    );
    if (!hasReplacement) {
      return true;
    }

    console.warn(
      `[Migration] Ignoring superseded duplicate migration ${file.version}_${file.name}; ` +
        `${superseded.supersededByVersion}_${superseded.supersededByName} is the canonical slot.`
    );
    return false;
  });
}

/**
 * Get list of already-applied migration versions.
 */
function getAppliedVersions(db: SqliteAdapter): Set<string> {
  const rows = db.prepare("SELECT version FROM _omniroute_migrations").all() as Array<{
    version: string;
  }>;
  return new Set(rows.map((r) => r.version));
}

/**
 * Get applied migration records (version + name) for mismatch detection.
 */
function getAppliedRecords(db: SqliteAdapter): Array<{ version: string; name: string }> {
  return db
    .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version")
    .all() as Array<{
    version: string;
    name: string;
  }>;
}

/**
 * Reopen a narrowly selected migration when the table it creates is physically absent.
 *
 * Historical databases can carry `074_discovery_results` or the rehomed
 * `081_inspector_custom_hosts` in the ledger without the table itself (for example after a
 * version-slot collision or an incomplete manual recovery). Treating either marker as
 * authoritative leaves an incomplete schema. A same-named view does not count as the table;
 * replaying the owning migration fails closed instead of silently advancing.
 *
 * This intentionally detects table absence only. It is not a general schema-healing layer:
 * column/rebuild migrations continue to use targeted idempotency checks elsewhere.
 */
const REQUIRED_PHYSICAL_MIGRATIONS = [
  { version: "074", name: "discovery_results", tableName: "discovery_results" },
  { version: "081", name: "inspector_custom_hosts", tableName: "inspector_custom_hosts" },
] as const;

function validateRequiredPhysicalMigrationProvenance(
  db: SqliteAdapter,
  files: Array<{ version: string; name: string; path: string }>
): void {
  for (const required of REQUIRED_PHYSICAL_MIGRATIONS) {
    if (hasPhysicalTable(db, required.tableName)) continue;

    const migrationExists = files.some(
      (file) => file.version === required.version && file.name === required.name
    );
    if (!migrationExists) continue;

    const occupied = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
      .get(required.version) as { version: string; name: string } | undefined;
    if (!occupied || occupied.name === required.name) continue;

    const knownRenumberedCollision = RENAMED_MIGRATION_COMPATIBILITY.some(
      (compatibility) =>
        compatibility.fromVersion === occupied.version &&
        compatibility.fromName === occupied.name &&
        files.some(
          (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
        ) &&
        files.some(
          (file) =>
            file.version === compatibility.fromVersion && file.name !== compatibility.fromName
        )
    );
    const knownLegacySlotCollision = LEGACY_VERSION_SLOT_MIGRATIONS.some(
      (legacy) =>
        legacy.version === occupied.version &&
        legacy.name === occupied.name &&
        files.some((file) => file.version === legacy.version && file.name !== legacy.name)
    );
    const knownRepairableCollision = knownRenumberedCollision || knownLegacySlotCollision;
    if (knownRepairableCollision) continue;

    throw new Error(
      `[Migration] Required table "${required.tableName}" is missing, but version ` +
        `${required.version} is recorded as unknown migration "${occupied.name}" instead of ` +
        `"${required.name}". Refusing to treat this database as current.`
    );
  }
}

function findAtomicPhysicalReplays(
  db: SqliteAdapter,
  files: Array<{ version: string; name: string; path: string }>
): Set<string> {
  const replayVersions = new Set<string>();

  for (const required of REQUIRED_PHYSICAL_MIGRATIONS) {
    if (hasPhysicalTable(db, required.tableName)) continue;

    const migrationExists = files.some(
      (file) => file.version === required.version && file.name === required.name
    );
    if (!migrationExists) continue;

    const applied = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(required.version, required.name) as { version: string; name: string } | undefined;
    if (!applied) continue;

    replayVersions.add(required.version);
    console.warn(
      `[Migration] Will atomically replay ${required.version}_${required.name}: ledger recorded ` +
        `"${applied.name}" but required table "${required.tableName}" is missing.`
    );
  }

  return replayVersions;
}

function ensureColumn(db: SqliteAdapter, tableName: string, columnName: string, ddl: string): void {
  if (!hasColumn(db, tableName, columnName)) {
    db.exec(ddl);
  }
}

function isSchemaAlreadyApplied(
  db: SqliteAdapter,
  migration: { version: string; name: string }
): boolean {
  switch (migration.version) {
    case "003":
      return hasColumn(db, "provider_nodes", "chat_path");
    case "095":
      return hasColumn(db, "provider_nodes", "custom_headers_json");
    case "005":
      return hasColumn(db, "combos", "system_message");
    case "007":
      return hasColumn(db, "call_logs", "request_type");
    case "009":
      return hasColumn(db, "call_logs", "requested_model");
    case "018":
      return (
        hasColumn(db, "call_logs", "tokens_cache_read") &&
        hasColumn(db, "call_logs", "tokens_cache_creation") &&
        hasColumn(db, "call_logs", "tokens_reasoning")
      );
    case "020":
      return hasColumn(db, "combos", "sort_order");
    case "021":
      return (
        hasColumn(db, "call_logs", "combo_step_id") &&
        hasColumn(db, "call_logs", "combo_execution_key")
      );
    case "023":
      return hasColumn(db, "memories", "memory_id");
    case "025":
      return (
        hasColumn(db, "call_logs", "detail_state") && hasColumn(db, "call_logs", "request_summary")
      );
    case "026":
      return hasColumn(db, "call_logs", "cache_source");
    case "027":
      return hasColumn(db, "skills", "mode");
    case "028":
      return hasTable(db, "batches") && hasTable(db, "files");
    case "029":
      return hasColumn(db, "provider_connections", "max_concurrent");
    case "040":
      return hasColumn(db, "proxy_registry", "source");
    case "041":
      if (migration.name === "session_account_affinity") {
        return hasTable(db, "session_account_affinity");
      }
      return (
        hasColumn(db, "compression_analytics", "actual_prompt_tokens") &&
        hasColumn(db, "compression_analytics", "actual_completion_tokens") &&
        hasColumn(db, "compression_analytics", "actual_total_tokens") &&
        hasColumn(db, "compression_analytics", "receipt_source") &&
        hasColumn(db, "compression_analytics", "validation_fallback") &&
        hasColumn(db, "compression_analytics", "output_mode")
      );
    case "042":
      return (
        hasTable(db, "compression_combos") &&
        hasTable(db, "compression_combo_assignments") &&
        hasColumn(db, "compression_analytics", "compression_combo_id") &&
        hasColumn(db, "compression_analytics", "engine")
      );
    case "045":
      return hasColumn(db, "call_logs", "tokens_compressed");
    case "053":
      return !hasColumn(db, "files", "status");
    case "054":
      return hasColumn(db, "usage_history", "service_tier");
    case "062":
      return hasColumn(db, "usage_history", "combo_strategy");
    case "070":
      // Retroactive guard for webhooks-kind-metadata migration renumbered from 068
      // (collided with 068_free_proxies + 068_services). DBs that already applied
      // 068_webhooks_kind_metadata should not re-run as 070.
      return hasColumn(db, "webhooks", "kind") && hasColumn(db, "webhooks", "metadata_encrypted");
    case "071":
      // Retroactive guard for embedded-services migration renumbered from 068
      // (originally collided with 068_free_proxies and 068_webhooks_kind_metadata).
      // DBs that already applied 068_services should not re-run as 071.
      return (
        hasColumn(db, "version_manager", "logs_buffer_path") &&
        hasColumn(db, "version_manager", "provider_expose") &&
        hasColumn(db, "version_manager", "last_sync_at")
      );
    case "073":
      // Plan 21 D27 fix: guard memory_vec migration. Without this case, an
      // unmarked re-run of 073_memory_vec.sql would have its ALTER TABLE fail
      // mid-file and skip the CREATE INDEX that follows, leaving the index
      // missing on DBs that re-execute the script after a partial first run.
      return hasColumn(db, "memories", "needs_reindex");
    case "085":
      // Retroactive guard for quota_pools migration renumbered from 077 → 085
      // (077 collided with 077_api_key_stream_default_mode). DBs that already
      // applied quota_pools under the old 077 number should not re-run as 085.
      return hasTable(db, "quota_pools") && hasTable(db, "quota_allocations");
    case "088":
      // Quota groups migration (renumbered 087 → 088 on merge into v3.8.8).
      // The table + column are already present when group_id exists on
      // quota_pools (ensures the backfill UPDATE also ran).
      return hasTable(db, "quota_groups") && hasColumn(db, "quota_pools", "group_id");
    case "089":
      // disable_non_public_models column (PR #3017, renumbered 077 → 089 to avoid
      // collision with 077_api_key_stream_default_mode on merge into v3.8.8).
      return hasColumn(db, "api_keys", "disable_non_public_models");
    case "090":
      // plugin_metrics table (PR #2913, renumbered 077 → 090 to avoid
      // collision with 077_api_key_stream_default_mode on merge into v3.8.8).
      return hasTable(db, "plugin_metrics");
    case "091":
      // plugin_analytics table (PR #2913). The PR's stray db/migrations version
      // was dropped on integration; this canonical migration creates the table
      // that recordPluginExecution()/getPluginAnalytics() rely on.
      return hasTable(db, "plugin_analytics");
    case "117":
      // Proxy-pool rotation (#6365): the assignments table was rebuilt to add a
      // `position` column and drop UNIQUE(scope, scope_id). If `position` already
      // exists the rebuild ran — skip re-executing the rename/copy/drop, which
      // would fail on the missing proxy_assignments_pre117 table.
      return hasColumn(db, "proxy_assignments", "position");
    // Retroactive guard for the 135/136 renumber (#8523 landed onto slots already taken
    // by #8908/#9515): a DB that ran these under the old numbers already has the column,
    // and a bare ALTER TABLE ADD COLUMN would throw on the re-run under the new number.
    case "137":
      return hasColumn(db, "version_manager", "auto_restart_adopted");
    case "138":
      return hasColumn(db, "upstream_proxy_config", "fallback_backend");
    case "139":
      // Retroactive guard for the 134 → 139 renumber: ccr_blocks landed on the 134
      // slot already taken by proxy_logs_egress_ip. A DB that already applied
      // ccr_blocks under the old 134 number has the table — skip the re-run.
      return hasTable(db, "ccr_blocks");
    case "140":
      // Retroactive guard for the connection_runtime_state migration renumbered
      // 135 -> 140 (#9449 landed onto the slot already taken by #8908's
      // 135_migrate_model_capability_max_token.sql — the same recurring
      // numbering-race class as the 135/136 -> 137/138 renumber above). A DB
      // that already ran this under the old 135 number has the table, and a
      // bare CREATE TABLE re-run would otherwise just no-op (IF NOT EXISTS)
      // but still burn a version-tracking slot mismatch — guard it the same
      // way as the other renumbers for consistency.
      return hasTable(db, "connection_runtime_state");
    case "143":
      // A cumulative Radar checkout could have occupied version 143 before the
      // canonical API-key cache migration landed. Once that legacy row is
      // reconciled to 153, apply 143 only when its column is genuinely absent.
      return hasColumn(db, "api_keys", "cache_default_mode");
    case "153":
      // Retroactive guard for 143_radar_local_model_state -> 153. A database
      // that already created the table must not execute or track it twice.
      return hasTable(db, "radar_local_model_state");
    case "159":
      // Renumbered from 158 (collided with 158_call_logs_error_type on
      // release/v3.8.50). Idempotent freepik->magnific slug rewrite: skip
      // when provider_connections has no remaining freepik rows (already
      // applied under 158, or a DB that never stored Freepik).
      if (migration.name !== "rename_freepik_to_magnific") return false;
      if (!hasTable(db, "provider_connections")) return false;
      return (
        db.prepare("SELECT 1 FROM provider_connections WHERE provider = 'freepik' LIMIT 1").get() ==
        null
      );
    case "172":
      return (
        hasColumn(db, "provider_nodes", "daily_quota_reset_timezone") &&
        hasColumn(db, "provider_nodes", "daily_quota_reset_hour")
      );
    default:
      return false;
  }
}

function applyApiKeyLifecycleMigration(db: SqliteAdapter): void {
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

function applySearchRequestTypeMigration(db: SqliteAdapter): void {
  ensureColumn(
    db,
    "call_logs",
    "request_type",
    "ALTER TABLE call_logs ADD COLUMN request_type TEXT DEFAULT NULL"
  );
  db.exec("CREATE INDEX IF NOT EXISTS idx_call_logs_request_type ON call_logs(request_type);");
}

function applyCompressionReceiptsMigration(db: SqliteAdapter): void {
  ensureColumn(
    db,
    "compression_analytics",
    "actual_prompt_tokens",
    "ALTER TABLE compression_analytics ADD COLUMN actual_prompt_tokens INTEGER"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "actual_completion_tokens",
    "ALTER TABLE compression_analytics ADD COLUMN actual_completion_tokens INTEGER"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "actual_total_tokens",
    "ALTER TABLE compression_analytics ADD COLUMN actual_total_tokens INTEGER"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "actual_cache_read_tokens",
    "ALTER TABLE compression_analytics ADD COLUMN actual_cache_read_tokens INTEGER"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "actual_cache_write_tokens",
    "ALTER TABLE compression_analytics ADD COLUMN actual_cache_write_tokens INTEGER"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "estimated_usd_saved",
    "ALTER TABLE compression_analytics ADD COLUMN estimated_usd_saved REAL"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "mcp_description_tokens_saved",
    "ALTER TABLE compression_analytics ADD COLUMN mcp_description_tokens_saved INTEGER DEFAULT 0"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "multimodal_skip_count",
    "ALTER TABLE compression_analytics ADD COLUMN multimodal_skip_count INTEGER DEFAULT 0"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "receipt_source",
    "ALTER TABLE compression_analytics ADD COLUMN receipt_source TEXT"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "validation_fallback",
    "ALTER TABLE compression_analytics ADD COLUMN validation_fallback INTEGER DEFAULT 0"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "output_mode",
    "ALTER TABLE compression_analytics ADD COLUMN output_mode TEXT"
  );

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_compression_analytics_request_id
      ON compression_analytics(request_id);
    CREATE INDEX IF NOT EXISTS idx_compression_analytics_receipt_source
      ON compression_analytics(receipt_source);
  `);
}

function applyCompressionCombosMigration(db: SqliteAdapter, migrationPath: string): void {
  const sql = fs.readFileSync(migrationPath, "utf-8");
  db.exec(sql);
  ensureColumn(
    db,
    "compression_analytics",
    "compression_combo_id",
    "ALTER TABLE compression_analytics ADD COLUMN compression_combo_id TEXT"
  );
  ensureColumn(
    db,
    "compression_analytics",
    "engine",
    "ALTER TABLE compression_analytics ADD COLUMN engine TEXT"
  );
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_compression_analytics_combo_engine
      ON compression_analytics(compression_combo_id, engine);
  `);
}

/**
 * Run a callback while holding SQLite's IMMEDIATE writer transaction.
 *
 * Production adapters expose `immediate()` directly. A small number of long-standing
 * migration tests and external callers still pass a raw better-sqlite3 Database, whose
 * transaction wrapper exposes `.immediate()` instead. Supporting both shapes here keeps
 * the safety transaction real: this must never degrade to a plain callback invocation.
 */
function runImmediateTransaction<T>(db: SqliteAdapter, fn: () => T): T {
  const adapterImmediate = (db as Partial<SqliteAdapter>).immediate;
  if (typeof adapterImmediate === "function") {
    let result!: T;
    adapterImmediate.call(db, () => {
      result = fn();
    });
    return result;
  }

  const rawTransaction = db.transaction(fn) as ReturnType<SqliteAdapter["transaction"]> & {
    immediate?: () => T;
  };
  if (typeof rawTransaction.immediate !== "function") {
    throw new Error("[Migration] Database adapter does not support IMMEDIATE transactions.");
  }
  return rawTransaction.immediate();
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
export function runMigrations(
  db: SqliteAdapter,
  options?: { isNewDb?: boolean; databaseExistedBeforeInitialization?: boolean }
): number {
  const isNewDb = options?.isNewDb === true;
  // `isNewDb` also covers a setup-created skeleton so it can bypass the mass-migration
  // false positive. Snapshot eligibility must use the independent physical-file fact:
  // that skeleton can already contain provider credentials and other operator state.
  const databaseExistedBeforeInitialization =
    options?.databaseExistedBeforeInitialization ?? !isNewDb;
  ensureMigrationsTable(db);

  const files = filterSupersededDuplicateMigrations(getMigrationFiles());
  validateRequiredPhysicalMigrationProvenance(db, files);
  let preMigrationBackup: PreMigrationBackupReceipt | null = null;
  let plan!: {
    atomicPhysicalReplays: Set<string>;
    appliedRecords: Array<{ version: string; name: string }>;
    pending: typeof files;
    deferredUnsupported: typeof files;
    highestAppliedBeforeMigrations: number;
  };
  let count = 0;

  const preliminaryApplied = getAppliedVersions(db);
  const preliminaryAtomicReplays = findAtomicPhysicalReplays(db, files);
  const preliminaryPending = files.filter(
    (file) => !preliminaryApplied.has(file.version) || preliminaryAtomicReplays.has(file.version)
  );
  const preliminaryDeferred = preliminaryPending.filter((migration) =>
    isDeferredUnsupportedMigration(db, migration)
  );
  const preliminaryActionable = preliminaryPending.filter(
    (migration) => !preliminaryDeferred.some((deferred) => deferred.version === migration.version)
  );
  const preliminaryHasRepairCandidates = hasLedgerRepairCandidates(db, files);

  // Preserve the historical read-only/no-op path. Merely checking an already-current
  // database must not acquire a writer lock (or fail SQLITE_BUSY because another supported
  // host currently owns one). Safety state is recomputed under IMMEDIATE whenever work exists.
  if (preliminaryActionable.length === 0 && !preliminaryHasRepairCandidates) {
    const numericApplied = Array.from(preliminaryApplied)
      .map((version) => Number.parseInt(version, 10))
      .filter((version) => !Number.isNaN(version));
    plan = {
      atomicPhysicalReplays: preliminaryAtomicReplays,
      appliedRecords: getAppliedRecords(db),
      pending: preliminaryPending,
      deferredUnsupported: preliminaryDeferred,
      highestAppliedBeforeMigrations: numericApplied.length > 0 ? Math.max(...numericApplied) : 0,
    };
  }

  // sql.js export() finalizes its active SAVEPOINT, so exporting from inside
  // `db.immediate()` would make a later safety throw unable to roll repairs back.
  // Its adapter is synchronous and in-memory, so no JavaScript writer can interleave
  // between this preflight/export and the immediately following savepoint.
  if (
    !plan &&
    db.driver === "sql.js" &&
    (preliminaryActionable.length > 0 || preliminaryHasRepairCandidates)
  ) {
    const needsSnapshot =
      (preliminaryActionable.length > 0 || preliminaryHasRepairCandidates) &&
      db.name !== ":memory:" &&
      databaseExistedBeforeInitialization;

    if (needsSnapshot) {
      preMigrationBackup = createPreMigrationBackup(db);
      if (!preMigrationBackup) {
        throw new Error(
          "[Migration] Refusing to migrate an existing database without a durable snapshot. " +
            "The DATA_DIR filesystem must support atomic hard-link publication."
        );
      }
    }
  }

  // Hold SQLite's native writer lock through snapshot selection, compatibility repairs,
  // and the mass-safety decision. Native adapters open a separate read-only connection
  // for VACUUM INTO while competing writers remain blocked. The outer transaction then
  // commits before migrations so the repository's one-transaction-per-file contract stays
  // intact: an earlier successful migration remains committed if a later file fails.
  if (!plan)
    runImmediateTransaction(db, () => {
      const appliedBeforeRepair = getAppliedVersions(db);
      const hadAppliedBeforeRepair = appliedBeforeRepair.size > 0;
      const preliminaryAtomicReplays = findAtomicPhysicalReplays(db, files);
      const preliminaryPending = files.filter(
        (file) =>
          !appliedBeforeRepair.has(file.version) || preliminaryAtomicReplays.has(file.version)
      );
      const preliminaryActionable = preliminaryPending.filter(
        (migration) => !isDeferredUnsupportedMigration(db, migration)
      );
      const mayWriteExistingDatabase =
        preliminaryActionable.length > 0 || hasLedgerRepairCandidates(db, files);
      const needsSnapshot =
        mayWriteExistingDatabase && db.name !== ":memory:" && databaseExistedBeforeInitialization;

      if (needsSnapshot && !preMigrationBackup) {
        if (db.driver === "sql.js") {
          throw new Error(
            "[Migration] sql.js safety state changed after its pre-transaction snapshot preflight; " +
              "refusing to export from inside the rollback savepoint."
          );
        }
        preMigrationBackup = createPreMigrationBackup(db);
        if (!preMigrationBackup) {
          throw new Error(
            "[Migration] Refusing to migrate an existing database without a durable snapshot. " +
              "The DATA_DIR filesystem must support atomic hard-link publication."
          );
        }
      }

      rehomeLegacyVersionSlotMigrations(db, files);
      reconcileRenumberedMigrations(db, files);

      const atomicPhysicalReplays = findAtomicPhysicalReplays(db, files);
      const applied = getAppliedVersions(db);
      const appliedRecords = getAppliedRecords(db);
      const pending = files.filter(
        (file) => !applied.has(file.version) || atomicPhysicalReplays.has(file.version)
      );
      const deferredUnsupported = pending.filter((migration) =>
        isDeferredUnsupportedMigration(db, migration)
      );
      const actionablePending = pending.filter(
        (migration) =>
          !deferredUnsupported.some((deferred) => deferred.version === migration.version)
      );
      const isFreshSeedOnly =
        applied.size === 1 &&
        applied.has("001") &&
        inferPhysicalSchemaBaseline(db) === null &&
        hasTable(db, "provider_connections");
      const requiresDurableBackup =
        actionablePending.length > 0 &&
        db.name !== ":memory:" &&
        databaseExistedBeforeInitialization;

      // Recompute under the same writer transaction as repairs and fail before any
      // ledger mutation can commit if the durable-snapshot requirement is not met.
      if (requiresDurableBackup && !preMigrationBackup) {
        throw new Error(
          "[Migration] Refusing to migrate an existing database without a durable snapshot. " +
            "The DATA_DIR filesystem must support atomic hard-link publication."
        );
      }

      const isTestEnvironment = isAutomatedTestProcess();
      const maxPendingMigrations = resolveMaxPendingMigrations();
      if (
        actionablePending.length > 0 &&
        !isTestEnvironment &&
        !isNewDb &&
        !isFreshSeedOnly &&
        maxPendingMigrations > 0 &&
        (applied.size > 0 || hadAppliedBeforeRepair) &&
        actionablePending.length > maxPendingMigrations
      ) {
        const physicalBaseline = inferPhysicalSchemaBaseline(db);
        const plausiblePendingCount = physicalBaseline
          ? getPlausiblePendingCount(files, physicalBaseline.version)
          : null;

        if (plausiblePendingCount !== null && actionablePending.length <= plausiblePendingCount) {
          console.warn(
            `[Migration] Allowing ${actionablePending.length} pending migrations on an existing database ` +
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
          const bypassHint =
            ` To bypass this check (e.g. after restoring a backup where the migration ` +
            `tracking table was wiped), set OMNIROUTE_MAX_PENDING_MIGRATIONS=0 in your ` +
            `server.env or DATA_DIR/.env and restart.`;
          const msg =
            `[Migration] 🛑 ABORT: Detected ${actionablePending.length} pending migrations on an existing database ` +
            `(threshold is ${maxPendingMigrations}). ` +
            `This usually means the migration tracking table was accidentally wiped. ` +
            `Running all migrations from scratch will cause data loss or schema errors.` +
            schemaHint +
            bypassHint;

          if (memoizedSafetyAbort && memoizedSafetyAbort.message === msg) {
            console.error(
              `[Migration] 🛑 ABORT (repeat — see earlier detail): ` +
                `${actionablePending.length} pending > threshold ${maxPendingMigrations}. ` +
                `Set OMNIROUTE_MAX_PENDING_MIGRATIONS=0 to bypass.`
            );
            throw memoizedSafetyAbort;
          }
          console.error(msg);
          memoizedSafetyAbort = new MigrationSafetyAbortError(msg);
          throw memoizedSafetyAbort;
        }
      }

      if (
        preMigrationBackup &&
        hashFileSync(preMigrationBackup.path) !== preMigrationBackup.sha256
      ) {
        throw new Error(
          "[Migration] Refusing to migrate because the pre-migration snapshot changed before use."
        );
      }

      const numericApplied = Array.from(applied)
        .map((version) => Number.parseInt(version, 10))
        .filter((version) => !Number.isNaN(version));
      const highestAppliedBeforeMigrations =
        numericApplied.length > 0 ? Math.max(...numericApplied) : 0;

      plan = {
        atomicPhysicalReplays,
        appliedRecords,
        pending,
        deferredUnsupported,
        highestAppliedBeforeMigrations,
      };
    });

  const {
    atomicPhysicalReplays,
    appliedRecords,
    pending,
    deferredUnsupported,
    highestAppliedBeforeMigrations,
  } = plan;

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

  for (const migration of pending) {
    if (Number(migration.version) < highestAppliedBeforeMigrations) {
      console.warn(
        `[Migration] 🔄 RECONCILIATION: Found missing intermediate migration ` +
          `${migration.version}_${migration.name} ` +
          `(highest applied is ${highestAppliedBeforeMigrations}). ` +
          `This gap will be back-filled to ensure schema integrity.`
      );
    }
  }

  if (deferredUnsupported.length > 0) {
    const summary = deferredUnsupported
      .map((migration) => `${migration.version}_${migration.name}`)
      .join(", ");
    console.warn(
      `[Migration] Deferring optional FTS5 migrations on driver ${db.driver}: ${summary}. ` +
        `Memory search will fall back until a SQLite driver with FTS5 support is available.`
    );
  }

  if (preMigrationBackup && hashFileSync(preMigrationBackup.path) !== preMigrationBackup.sha256) {
    throw new Error(
      "[Migration] Refusing to migrate because the pre-migration snapshot changed before use."
    );
  }

  for (const migration of pending) {
    if (isDeferredUnsupportedMigration(db, migration)) continue;

    const applyMigration = db.transaction(() => {
      if (atomicPhysicalReplays.has(migration.version)) {
        const removed = db
          .prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?")
          .run(migration.version, migration.name);
        if (removed.changes !== 1) {
          throw new Error(
            `[Migration] Atomic replay lost its expected ledger marker for ` +
              `${migration.version}_${migration.name}.`
          );
        }
      }

      if (isSchemaAlreadyApplied(db, migration)) {
        console.warn(
          `[Migration] Skipped executing ${migration.version}_${migration.name} as schema changes are already present (Idempotency check).`
        );
      } else if (migration.version === "032") {
        applyApiKeyLifecycleMigration(db);
      } else if (migration.version === "041" && migration.name === "compression_receipts") {
        applyCompressionReceiptsMigration(db);
      } else if (migration.version === "042") {
        applyCompressionCombosMigration(db, migration.path);
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
      count += 1;
      console.log(`[Migration] Applied: ${migration.version}_${migration.name}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (
        message.includes("duplicate column name") &&
        !atomicPhysicalReplays.has(migration.version)
      ) {
        const applyMarkerOnly = db.transaction(() => {
          db.prepare(
            "INSERT OR IGNORE INTO _omniroute_migrations (version, name) VALUES (?, ?)"
          ).run(migration.version, migration.name);
        });
        applyMarkerOnly();
        count += 1;
        console.log(
          `[Migration] Applied (column pre-exists): ${migration.version}_${migration.name}`
        );
      } else {
        console.error(`[Migration] FAILED: ${migration.version}_${migration.name} — ${message}`);
        throw err;
      }
    }
  }

  // Retention intentionally does not run inside the migration window. Another process
  // may still be using a different snapshot as its in-flight restore point. Manual and
  // scheduled backup paths continue to enforce the operator's retention policy; retries
  // here are bounded by the deterministic content address instead of destructive pruning.

  if (count > 0) {
    console.log(`[Migration] ${count} migration(s) applied successfully.`);
  }

  // After applying all migrations, insert default settings if we just ran migration 46
  try {
    if (appliedRecords.some((m) => m.name.startsWith("051_"))) {
      insertDefaultDatabaseSettings(db);
    }
  } catch (error) {
    console.error("Error inserting default database settings:", error);
  }

  return count;
}

function insertDefaultDatabaseSettings(db: SqliteAdapter) {
  const tx = db.transaction(() => {
    // Insert all default settings
    for (const [section, values] of Object.entries(DEFAULT_DATABASE_SETTINGS)) {
      for (const [key, value] of Object.entries(values as Record<string, unknown>)) {
        db.prepare("INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
          "databaseSettings",
          `${section}.${key}`,
          JSON.stringify(value)
        );
      }
    }
  });

  // Run in an immediate transaction to avoid nested transactions
  try {
    runImmediateTransaction(db, () => {
      tx();
    });
  } catch (error) {
    console.error("Transaction error inserting default settings:", error);
    throw error;
  }
}

/**
 * Get migration status for diagnostics.
 */
export function getMigrationStatus(db: SqliteAdapter): {
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
