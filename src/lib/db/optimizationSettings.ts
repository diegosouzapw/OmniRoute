import { DEFAULT_DATABASE_SETTINGS, type DatabaseSettings } from "@/types/databaseSettings";

import type { SqliteAdapter } from "./adapters/types";

type SqliteDatabase = SqliteAdapter;
type DatabaseOptimizationSettings = DatabaseSettings["optimization"];
type AutoVacuumMode = DatabaseOptimizationSettings["autoVacuumMode"];

const AUTO_VACUUM_MODE_TO_PRAGMA: Record<AutoVacuumMode, number> = {
  NONE: 0,
  FULL: 1,
  INCREMENTAL: 2,
};

const PRAGMA_TO_AUTO_VACUUM_MODE: Record<number, AutoVacuumMode> = {
  0: "NONE",
  1: "FULL",
  2: "INCREMENTAL",
};

function parseKeyValueJson(raw: string | null | undefined): unknown {
  if (raw === null || raw === undefined) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeAutoVacuumMode(value: unknown, fallback: AutoVacuumMode): AutoVacuumMode {
  return typeof value === "string" && value in AUTO_VACUUM_MODE_TO_PRAGMA
    ? (value as AutoVacuumMode)
    : fallback;
}

function normalizePageSizeBytes(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  const pageSize = Math.floor(numeric);
  if (pageSize < 512 || pageSize > 65536 || pageSize % 512 !== 0) return fallback;
  return pageSize;
}

function normalizeVacuumHour(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(23, Math.max(0, Math.floor(numeric)));
}

function normalizeStoredCacheSizeKb(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  const cacheSizeKb = Math.floor(numeric);
  if (cacheSizeKb < 1 || cacheSizeKb > 1000000) return fallback;
  return cacheSizeKb;
}

function requireCacheSizeKb(value: number): number {
  if (!Number.isInteger(value) || value < 1 || value > 1000000) {
    throw new Error("cache_size must be a positive KiB value between 1 and 1000000");
  }
  return value;
}

function mergeOptimizationSettings(
  target: DatabaseOptimizationSettings,
  value: unknown
): DatabaseOptimizationSettings {
  if (!isRecord(value)) return target;
  return {
    ...target,
    autoVacuumMode: normalizeAutoVacuumMode(value.autoVacuumMode, target.autoVacuumMode),
    scheduledVacuum:
      typeof value.scheduledVacuum === "string" &&
      ["never", "daily", "weekly", "monthly"].includes(value.scheduledVacuum)
        ? (value.scheduledVacuum as DatabaseOptimizationSettings["scheduledVacuum"])
        : target.scheduledVacuum,
    vacuumHour: normalizeVacuumHour(value.vacuumHour, target.vacuumHour),
    pageSize: normalizePageSizeBytes(value.pageSize, target.pageSize),
    cacheSize: normalizeStoredCacheSizeKb(value.cacheSize, target.cacheSize),
    optimizeOnStartup:
      typeof value.optimizeOnStartup === "boolean"
        ? value.optimizeOnStartup
        : target.optimizeOnStartup,
  };
}

function readDatabaseOptimizationSettings(db: SqliteDatabase): DatabaseOptimizationSettings {
  let settings: DatabaseOptimizationSettings = { ...DEFAULT_DATABASE_SETTINGS.optimization };

  try {
    const rows = db
      .prepare("SELECT namespace, key, value FROM key_value WHERE namespace IN (?, ?)")
      .all("settings", "databaseSettings") as Array<{
      namespace: string;
      key: string;
      value: string | null;
    }>;
    const byNamespace: Record<string, Record<string, unknown>> = {
      settings: {},
      databaseSettings: {},
    };
    for (const row of rows) {
      byNamespace[row.namespace] ??= {};
      byNamespace[row.namespace][row.key] = parseKeyValueJson(row.value);
    }

    const mainSettings = byNamespace.settings ?? {};
    const databaseSettingsValue = mainSettings.databaseSettings;
    if (isRecord(databaseSettingsValue)) {
      settings = mergeOptimizationSettings(settings, databaseSettingsValue.optimization);
    }
    settings = mergeOptimizationSettings(settings, mainSettings.optimization);

    const databaseSettings = byNamespace.databaseSettings ?? {};
    const optimizeOnStartup =
      databaseSettings["optimization.optimizeOnStartup"] ?? databaseSettings.optimizeOnStartup;
    settings = mergeOptimizationSettings(settings, databaseSettings.optimization);
    settings = {
      ...settings,
      autoVacuumMode: normalizeAutoVacuumMode(
        databaseSettings["optimization.autoVacuumMode"] ?? databaseSettings.autoVacuumMode,
        settings.autoVacuumMode
      ),
      pageSize: normalizePageSizeBytes(
        databaseSettings["optimization.pageSize"] ?? databaseSettings.pageSize,
        settings.pageSize
      ),
      cacheSize: normalizeStoredCacheSizeKb(
        databaseSettings["optimization.cacheSize"] ?? databaseSettings.cacheSize,
        settings.cacheSize
      ),
      optimizeOnStartup:
        typeof optimizeOnStartup === "boolean" ? optimizeOnStartup : settings.optimizeOnStartup,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[DB] Failed to read database optimization settings; using defaults: ${message}`);
  }

  return settings;
}

export function setCacheSizeForDb(db: SqliteDatabase, cacheSizeKb: number): void {
  const normalizedCacheSizeKb = requireCacheSizeKb(cacheSizeKb);
  const currentCacheSize = db.pragma("cache_size", { simple: true }) as number;
  const targetCacheSize = -normalizedCacheSizeKb;

  if (currentCacheSize === targetCacheSize) {
    console.log(`[DB] cache_size already set to ${normalizedCacheSizeKb}KB`);
    return;
  }

  console.log(
    `[DB] Changing cache_size from ${Math.abs(currentCacheSize)}KB to ${normalizedCacheSizeKb}KB`
  );
  db.pragma(`cache_size = ${targetCacheSize}`);

  const newCacheSize = db.pragma("cache_size", { simple: true }) as number;
  if (newCacheSize !== targetCacheSize) {
    throw new Error(
      `cache_size change did not take effect (expected ${targetCacheSize}, got ${newCacheSize})`
    );
  }
  console.log(`[DB] cache_size changed to ${Math.abs(newCacheSize)}KB`);
}

function applyPersistentOptimizationPragmas(
  db: SqliteDatabase,
  settings: DatabaseOptimizationSettings
): void {
  const targetAutoVacuum = AUTO_VACUUM_MODE_TO_PRAGMA[settings.autoVacuumMode];
  const targetPageSize = normalizePageSizeBytes(
    settings.pageSize,
    DEFAULT_DATABASE_SETTINGS.optimization.pageSize
  );
  const currentAutoVacuum = db.pragma("auto_vacuum", { simple: true }) as number;
  const currentPageSize = db.pragma("page_size", { simple: true }) as number;

  if (currentAutoVacuum === targetAutoVacuum && currentPageSize === targetPageSize) return;

  const originalJournalMode = String(
    db.pragma("journal_mode", { simple: true }) ?? ""
  ).toUpperCase();
  const shouldRestoreWal = originalJournalMode === "WAL";

  console.log(
    `[DB] Applying persistent optimization settings ` +
      `(auto_vacuum ${currentAutoVacuum}->${targetAutoVacuum}, ` +
      `page_size ${currentPageSize}->${targetPageSize})`
  );

  try {
    if (shouldRestoreWal) db.pragma("journal_mode = DELETE");
    db.pragma(`auto_vacuum = ${targetAutoVacuum}`);
    db.pragma(`page_size = ${targetPageSize}`);
    db.exec("VACUUM");
  } finally {
    if (shouldRestoreWal) {
      try {
        db.pragma("journal_mode = WAL");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[DB] Failed to restore WAL mode after optimization settings: ${message}`);
      }
    }
  }

  const newAutoVacuum = db.pragma("auto_vacuum", { simple: true }) as number;
  const newPageSize = db.pragma("page_size", { simple: true }) as number;
  if (newAutoVacuum !== targetAutoVacuum || newPageSize !== targetPageSize) {
    throw new Error(
      `database optimization settings did not take effect ` +
        `(auto_vacuum expected ${targetAutoVacuum}, got ${newAutoVacuum}; ` +
        `page_size expected ${targetPageSize}, got ${newPageSize})`
    );
  }
}

export function applyDatabaseOptimizationSettingsForDb(
  db: SqliteDatabase,
  settings: DatabaseOptimizationSettings,
  options: { applyPersistent: boolean }
): void {
  if (options.applyPersistent) applyPersistentOptimizationPragmas(db, settings);
  setCacheSizeForDb(
    db,
    normalizeStoredCacheSizeKb(settings.cacheSize, DEFAULT_DATABASE_SETTINGS.optimization.cacheSize)
  );
}

export function applyStoredDatabaseOptimizationSettings(db: SqliteDatabase): void {
  const settings = readDatabaseOptimizationSettings(db);
  // Startup can happen concurrently in test workers and clustered hosts. Only
  // restore connection-local settings here; page_size/auto_vacuum require VACUUM
  // and are applied synchronously when the Storage settings are saved.
  applyDatabaseOptimizationSettingsForDb(db, settings, {
    applyPersistent: false,
  });
}

export function setAutoVacuumForDb(db: SqliteDatabase, mode: AutoVacuumMode): void {
  const currentMode = db.pragma("auto_vacuum", { simple: true }) as number;
  const targetMode = AUTO_VACUUM_MODE_TO_PRAGMA[mode];

  if (currentMode === targetMode) {
    console.log(`[DB] auto_vacuum already set to ${mode}`);
    return;
  }

  applyPersistentOptimizationPragmas(db, {
    ...DEFAULT_DATABASE_SETTINGS.optimization,
    autoVacuumMode: mode,
    pageSize: db.pragma("page_size", { simple: true }) as number,
  });
}

export function getAutoVacuumModeForDb(db: SqliteDatabase): AutoVacuumMode {
  const mode = db.pragma("auto_vacuum", { simple: true }) as number;
  return PRAGMA_TO_AUTO_VACUUM_MODE[mode] || "NONE";
}

export function setPageSizeForDb(db: SqliteDatabase, pageSize: number): void {
  const currentPageSize = db.pragma("page_size", { simple: true }) as number;
  const targetPageSize = normalizePageSizeBytes(
    pageSize,
    DEFAULT_DATABASE_SETTINGS.optimization.pageSize
  );

  if (currentPageSize === targetPageSize) {
    console.log(`[DB] page_size already set to ${targetPageSize}`);
    return;
  }

  applyPersistentOptimizationPragmas(db, {
    ...DEFAULT_DATABASE_SETTINGS.optimization,
    autoVacuumMode: getAutoVacuumModeForDb(db),
    pageSize: targetPageSize,
  });
}
