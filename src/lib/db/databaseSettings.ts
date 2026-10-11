import fs from "node:fs";

import { DEFAULT_DATABASE_SETTINGS, type DatabaseSettings } from "@/types/databaseSettings";

import { backupDbFile, setDbBackupMaxFiles } from "./backup";
import { DATA_DIR, SQLITE_FILE, applyDatabaseOptimizationSettings, getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";
import { registerDbStateResetter } from "./stateReset";
import {
  CACHE_SECRET_MASK,
  decryptCacheSecrets,
  encryptCacheValue,
  isCacheSecret,
  assertCacheCredentialEndpoint,
  encryptLegacyCacheSecretCopies,
} from "./cacheSecrets";
import { getDatabaseStats } from "./stats";
import { getState as getVacuumSchedulerState, refreshVacuumScheduler } from "./vacuumScheduler";

const DATABASE_SETTINGS_NAMESPACE = "databaseSettings";

export type UserDatabaseSettings = Omit<DatabaseSettings, "location" | "stats">;
type DatabaseSettingsSection = keyof UserDatabaseSettings;

const DATABASE_SETTINGS_SECTIONS = Object.keys(
  DEFAULT_DATABASE_SETTINGS
) as DatabaseSettingsSection[];

const LEGACY_FLAT_KEYS: {
  [TSection in DatabaseSettingsSection]: Partial<
    Record<keyof UserDatabaseSettings[TSection] & string, string[]>
  >;
} = {
  logs: {
    detailedLogsEnabled: ["detailedLogsEnabled"],
    callLogPipelineEnabled: ["callLogPipelineEnabled"],
    maxDetailSizeKb: ["maxDetailSizeKb"],
    ringBufferSize: ["ringBufferSize"],
  },
  backup: {
    autoBackupEnabled: ["autoBackupEnabled"],
    autoBackupFrequency: ["autoBackupFrequency"],
    keepLastNBackups: ["keepLastNBackups"],
  },
  cache: {
    semanticCacheEnabled: ["semanticCacheEnabled"],
    semanticCacheMaxSize: ["semanticCacheMaxSize"],
    semanticCacheTTL: ["semanticCacheTTL"],
    semanticCacheVectorEnabled: ["semanticCacheVectorEnabled"],
    semanticCacheBackend: ["semanticCacheBackend"],
    semanticCacheThreshold: ["semanticCacheThreshold"],
    semanticCacheEmbeddingProvider: ["semanticCacheEmbeddingProvider"],
    semanticCacheEmbeddingModel: ["semanticCacheEmbeddingModel"],
    semanticCacheEmbeddingDimension: ["semanticCacheEmbeddingDimension"],
    semanticCacheEmbeddingBaseUrl: ["semanticCacheEmbeddingBaseUrl"],
    semanticCacheEmbeddingApiKey: ["semanticCacheEmbeddingApiKey"],
    semanticCacheRedisUrl: ["semanticCacheRedisUrl"],
    semanticCacheRedisPrefix: ["semanticCacheRedisPrefix"],
    semanticCacheRequireZeroTemp: ["semanticCacheRequireZeroTemp"],
    promptCacheEnabled: ["promptCacheEnabled"],
    promptCacheStrategy: ["promptCacheStrategy"],
    alwaysPreserveClientCache: ["alwaysPreserveClientCache"],
    modelCatalogCacheTtlMs: ["modelCatalogCacheTtlMs"],
  },
  retention: {
    quotaSnapshots: ["quotaSnapshots"],
    compressionAnalytics: ["compressionAnalytics"],
    mcpAudit: ["mcpAudit"],
    configAudit: ["configAudit"],
    a2aEvents: ["a2aEvents"],
    callLogs: ["callLogs"],
    conversationTurnNodes: ["conversationTurnNodes"],
    usageHistory: ["usageHistory"],
    memoryEntries: ["memoryEntries"],
    domainCostHistory: ["domainCostHistory"],
    compressionCacheStats: ["compressionCacheStats"],
    xpAuditLog: ["xpAuditLog"],
    compressionRunTelemetry: ["compressionRunTelemetry"],
    autoCleanupEnabled: ["autoCleanupEnabled"],
  },
  aggregation: {
    enabled: ["aggregationEnabled", "enabled"],
    rawDataRetentionDays: ["rawDataRetentionDays"],
    granularity: ["granularity"],
  },
  optimization: {
    autoVacuumMode: ["autoVacuumMode"],
    scheduledVacuum: ["scheduledVacuum"],
    vacuumHour: ["vacuumHour"],
    pageSize: ["pageSize"],
    cacheSize: ["cacheSize"],
    optimizeOnStartup: ["optimizeOnStartup"],
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function cloneDefaultSettings(): UserDatabaseSettings {
  return structuredClone(DEFAULT_DATABASE_SETTINGS) as UserDatabaseSettings;
}

function parseStoredValue(rawValue: unknown): unknown {
  if (typeof rawValue !== "string") return rawValue;

  try {
    return JSON.parse(rawValue);
  } catch {
    return rawValue;
  }
}

function toBooleanSetting(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return !Number.isNaN(value) && value !== 0;
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return null;
}

function normalizeOptimizationSettings(settings: UserDatabaseSettings) {
  const fallback = DEFAULT_DATABASE_SETTINGS.optimization.cacheSize;
  const numericCacheSize = Number(settings.optimization.cacheSize);
  settings.optimization.cacheSize =
    Number.isFinite(numericCacheSize) && numericCacheSize > 0
      ? Math.min(1000000, Math.floor(numericCacheSize))
      : fallback;
}

function readNamespace(namespace: string): Record<string, unknown> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(namespace) as Array<{ key: string; value: string }>;

  const values: Record<string, unknown> = {};
  for (const row of rows) {
    values[row.key] = parseStoredValue(row.value);
  }
  return values;
}

function mergeSectionObject(
  target: UserDatabaseSettings,
  section: DatabaseSettingsSection,
  value: unknown
) {
  if (!isRecord(value)) return;

  const sectionTarget = target[section] as Record<string, unknown>;
  const defaultSection = DEFAULT_DATABASE_SETTINGS[section] as Record<string, unknown>;

  for (const key of Object.keys(defaultSection)) {
    if (value[key] !== undefined) {
      sectionTarget[key] = value[key];
    }
  }
}

function mergeTopLevelSections(target: UserDatabaseSettings, values: Record<string, unknown>) {
  for (const section of DATABASE_SETTINGS_SECTIONS) {
    mergeSectionObject(target, section, values[section]);
  }
}

function mergeRuntimeLogSettings(target: UserDatabaseSettings, values: Record<string, unknown>) {
  const pipelineEnabled = toBooleanSetting(values.call_log_pipeline_enabled);
  if (pipelineEnabled !== null) {
    target.logs.callLogPipelineEnabled = pipelineEnabled;
  }

  const legacyDetailedEnabled = toBooleanSetting(values.detailed_logs_enabled);
  if (legacyDetailedEnabled !== null) {
    target.logs.detailedLogsEnabled = legacyDetailedEnabled;
  }
}

function mergeDatabaseSettingsNamespace(
  target: UserDatabaseSettings,
  values: Record<string, unknown>
) {
  for (const section of DATABASE_SETTINGS_SECTIONS) {
    const defaultSection = DEFAULT_DATABASE_SETTINGS[section] as Record<string, unknown>;
    const sectionTarget = target[section] as Record<string, unknown>;
    const flatAliases = LEGACY_FLAT_KEYS[section] as Partial<Record<string, string[]>>;

    for (const key of Object.keys(defaultSection)) {
      for (const alias of flatAliases[key] ?? []) {
        if (values[alias] !== undefined) {
          sectionTarget[key] = values[alias];
        }
      }

      const nestedKey = `${section}.${key}`;
      if (values[nestedKey] !== undefined) {
        sectionTarget[key] = values[nestedKey];
      }
    }
  }
}

function getWalSizeBytes(): number {
  if (!SQLITE_FILE) return 0;

  try {
    const walPath = `${SQLITE_FILE}-wal`;
    return fs.existsSync(walPath) ? fs.statSync(walPath).size : 0;
  } catch {
    return 0;
  }
}

function getSchemaVersion(): number {
  const db = getDbInstance();

  try {
    const row = db
      .prepare("SELECT MAX(CAST(version AS INTEGER)) AS version FROM _omniroute_migrations")
      .get() as { version: number | null } | undefined;
    return row?.version ?? 0;
  } catch {
    return 0;
  }
}

function getFreelistCount(): number {
  try {
    return getDbInstance().pragma("freelist_count", { simple: true }) as number;
  } catch {
    return 0;
  }
}

function getIntegrityCheck(): "ok" | "error" | null {
  try {
    const result = getDbInstance().pragma("quick_check", { simple: true }) as string;
    return result === "ok" ? "ok" : "error";
  } catch {
    return null;
  }
}

function toPersistedRetentionDays(value: unknown): number | null {
  if (typeof value !== "number") return null;
  return Number.isInteger(value) && value > 0 ? value : null;
}

type PersistedRetentionRow = { namespace: string; key: string; value: string | null };

function parseRetentionRowValue(row: PersistedRetentionRow): unknown | null {
  if (row.value === null || row.value === undefined) return null;
  try {
    return JSON.parse(row.value);
  } catch {
    return null;
  }
}

function readNestedSettingsRetention(parsed: unknown): number | null {
  if (!isRecord(parsed)) return null;
  const retention = parsed.retention;
  if (!isRecord(retention)) return null;
  return toPersistedRetentionDays(retention.callLogs);
}

function updatePersistedRetention(
  found: { nested: number | null; settings: number | null; flat: number | null },
  row: PersistedRetentionRow,
  parsed: unknown
): void {
  if (row.namespace === "databaseSettings" && row.key === "retention.callLogs") {
    const days = toPersistedRetentionDays(parsed);
    if (days !== null) found.nested = days;
  } else if (row.namespace === "databaseSettings" && row.key === "callLogs") {
    const days = toPersistedRetentionDays(parsed);
    if (days !== null) found.flat = days;
  } else if (row.namespace === "settings" && row.key === "databaseSettings") {
    const days = readNestedSettingsRetention(parsed);
    if (days !== null) found.settings = days;
  }
}

function collectPersistedRetention(rows: PersistedRetentionRow[]): {
  nested: number | null;
  settings: number | null;
  flat: number | null;
} {
  const found = {
    nested: null as number | null,
    settings: null as number | null,
    flat: null as number | null,
  };

  for (const row of rows) {
    const parsed = parseRetentionRowValue(row);
    if (parsed === null) continue;
    updatePersistedRetention(found, row, parsed);
  }

  return found;
}
/**
 * Reads the dashboard-persisted request log retention without applying defaults.
 *
 * Unlike getUserDatabaseSettings() (which always merges DEFAULT_DATABASE_SETTINGS),
 * this returns null when the operator never saved a value, so the rotation's
 * fallback stays the explicit variable or 7 days (#4363 precedence, dashboard
 * level restricted to persisted keys). Migration 046 seeds the legacy flat
 * `callLogs` key (90) on fresh installs, so the flat form only counts when it
 * differs from that seed — same guard as backupRetention (#13308).
 *
 * The rotation reads this on every pass, so the value is cached in memory for a
 * short window: a dashboard edit takes effect within the TTL, while repeated
 * passes cost at most one settings read per window instead of one per call.
 * Writes through updateDatabaseSettings() and any DB reset clear the entry, so
 * the cache holds a single entry and cannot grow.
 */
const PERSISTED_CALL_LOG_RETENTION_TTL_MS = 60_000;

type PersistedCallLogRetentionCache =
  { expiresAt: number; hasValue: false } | { expiresAt: number; hasValue: true; value: number };

let persistedCallLogRetentionCache: PersistedCallLogRetentionCache | null = null;

function getCachedPersistedCallLogRetentionDays(): number | null | undefined {
  const cached = persistedCallLogRetentionCache;
  if (!cached) return undefined;
  if (Date.now() > cached.expiresAt) {
    persistedCallLogRetentionCache = null;
    return undefined;
  }
  return cached.hasValue ? cached.value : null;
}

function setCachedPersistedCallLogRetentionDays(value: number | null): void {
  persistedCallLogRetentionCache =
    value === null
      ? { expiresAt: Date.now() + PERSISTED_CALL_LOG_RETENTION_TTL_MS, hasValue: false }
      : { expiresAt: Date.now() + PERSISTED_CALL_LOG_RETENTION_TTL_MS, hasValue: true, value };
}

function clearPersistedCallLogRetentionCache(): void {
  persistedCallLogRetentionCache = null;
}

registerDbStateResetter(clearPersistedCallLogRetentionCache);

export function getPersistedCallLogRetentionDays(): number | null {
  const cached = getCachedPersistedCallLogRetentionDays();
  if (cached !== undefined) return cached;

  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT namespace, key, value FROM key_value WHERE (namespace = 'databaseSettings' AND key IN ('retention.callLogs', 'callLogs')) OR (namespace = 'settings' AND key = 'databaseSettings')"
    )
    .all() as PersistedRetentionRow[];

  const found = collectPersistedRetention(rows);
  let resolved: number | null = null;
  if (found.nested !== null) resolved = found.nested;
  else if (found.settings !== null) resolved = found.settings;
  else if (found.flat !== null && found.flat !== 90) resolved = found.flat;
  setCachedPersistedCallLogRetentionDays(resolved);
  return resolved;
}

export function getUserDatabaseSettings(): UserDatabaseSettings {
  const settings = cloneDefaultSettings();
  const mainSettings = readNamespace("settings");
  const databaseSettingsValue = mainSettings[DATABASE_SETTINGS_NAMESPACE];

  if (isRecord(databaseSettingsValue)) {
    mergeTopLevelSections(settings, databaseSettingsValue);
  }

  mergeTopLevelSections(settings, mainSettings);
  mergeDatabaseSettingsNamespace(settings, readNamespace(DATABASE_SETTINGS_NAMESPACE));
  mergeRuntimeLogSettings(settings, mainSettings);
  normalizeOptimizationSettings(settings);
  decryptCacheSecrets(settings.cache as unknown as Record<string, unknown>);

  return settings;
}

export function getDatabaseSettings(): DatabaseSettings {
  const dbStats = getDatabaseStats();
  const vacuumState = getVacuumSchedulerState();

  return {
    ...getUserDatabaseSettings(),
    location: {
      databasePath: SQLITE_FILE ?? ":memory:",
      dataDir: DATA_DIR,
      walSizeBytes: getWalSizeBytes(),
      schemaVersion: getSchemaVersion(),
    },
    stats: {
      databaseSizeBytes: dbStats.totalSize,
      pageCount: dbStats.pageCount,
      freelistCount: getFreelistCount(),
      lastVacuumAt:
        vacuumState.lastRunAt !== null ? new Date(vacuumState.lastRunAt).toISOString() : null,
      lastOptimizationAt: null,
      integrityCheck: getIntegrityCheck(),
      autoVacuumDrift: vacuumState.autoVacuumDrift,
      lastReclaimedPages: vacuumState.lastReclaimedPages,
    },
  };
}

export function updateDatabaseSettings(
  updates: Partial<UserDatabaseSettings>
): UserDatabaseSettings {
  const nextSettings = getUserDatabaseSettings();
  assertCacheCredentialEndpoint(nextSettings.cache, updates.cache);
  const optimizationUpdated = updates.optimization !== undefined;

  for (const section of DATABASE_SETTINGS_SECTIONS) {
    if (updates[section] !== undefined) {
      const sectionUpdate = { ...updates[section] };
      if (section === "cache") {
        for (const key of Object.keys(sectionUpdate)) {
          if (isCacheSecret(key) && sectionUpdate[key] === CACHE_SECRET_MASK)
            delete sectionUpdate[key];
        }
      }
      mergeSectionObject(nextSettings, section, sectionUpdate);
    }
  }
  normalizeOptimizationSettings(nextSettings);

  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  const settingsInsert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
  );

  const requestedLogs = updates.logs as Partial<UserDatabaseSettings["logs"]> | undefined;
  const pipelineEnabled = requestedLogs?.callLogPipelineEnabled;
  const detailedEnabled = requestedLogs?.detailedLogsEnabled;

  const requestedBackup = updates.backup as Partial<UserDatabaseSettings["backup"]> | undefined;
  if (requestedBackup?.keepLastNBackups !== undefined) {
    setDbBackupMaxFiles(nextSettings.backup.keepLastNBackups);
  }

  const tx = db.transaction(() => {
    for (const section of DATABASE_SETTINGS_SECTIONS) {
      const sectionValues = nextSettings[section] as Record<string, unknown>;

      for (const [key, value] of Object.entries(sectionValues)) {
        const stored = section === "cache" ? encryptCacheValue(key, value) : value;
        insert.run(
          DATABASE_SETTINGS_NAMESPACE,
          `${section}.${key}`,
          JSON.stringify(stored ?? null)
        );
      }
    }

    if (pipelineEnabled !== undefined) {
      settingsInsert.run("call_log_pipeline_enabled", JSON.stringify(Boolean(pipelineEnabled)));
    }
    encryptLegacyCacheSecretCopies(db);
  });
  tx();

  backupDbFile("pre-write");
  clearPersistedCallLogRetentionCache();
  invalidateDbCache("settings");
  if (optimizationUpdated) {
    applyDatabaseOptimizationSettings(nextSettings.optimization);
    refreshVacuumScheduler();
  }

  return nextSettings;
}
