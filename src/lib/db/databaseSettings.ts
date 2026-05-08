import fs from "node:fs";

import { DEFAULT_DATABASE_SETTINGS, type DatabaseSettings } from "@/types/databaseSettings";

import { backupDbFile } from "./backup";
import { DATA_DIR, SQLITE_FILE, getDbInstance } from "./core";
import { invalidateDbCache } from "./readCache";
import { getDatabaseStats } from "./stats";

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
    promptCacheEnabled: ["promptCacheEnabled"],
    promptCacheStrategy: ["promptCacheStrategy"],
    alwaysPreserveClientCache: ["alwaysPreserveClientCache"],
  },
  retention: {
    quotaSnapshots: ["quotaSnapshots"],
    compressionAnalytics: ["compressionAnalytics"],
    mcpAudit: ["mcpAudit"],
    a2aEvents: ["a2aEvents"],
    callLogs: ["callLogs"],
    usageHistory: ["usageHistory"],
    memoryEntries: ["memoryEntries"],
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

function mergeDatabaseSettingsNamespace(
  target: UserDatabaseSettings,
  values: Record<string, unknown>
) {
  for (const section of DATABASE_SETTINGS_SECTIONS) {
    const defaultSection = DEFAULT_DATABASE_SETTINGS[section] as Record<string, unknown>;
    const sectionTarget = target[section] as Record<string, unknown>;
    const flatAliases = LEGACY_FLAT_KEYS[section];

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

export function getUserDatabaseSettings(): UserDatabaseSettings {
  const settings = cloneDefaultSettings();
  const mainSettings = readNamespace("settings");
  const databaseSettingsValue = mainSettings[DATABASE_SETTINGS_NAMESPACE];

  if (isRecord(databaseSettingsValue)) {
    mergeTopLevelSections(settings, databaseSettingsValue);
  }

  mergeTopLevelSections(settings, mainSettings);
  mergeDatabaseSettingsNamespace(settings, readNamespace(DATABASE_SETTINGS_NAMESPACE));

  return settings;
}

export function getDatabaseSettings(): DatabaseSettings {
  const dbStats = getDatabaseStats();

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
      lastVacuumAt: null,
      lastOptimizationAt: null,
      integrityCheck: getIntegrityCheck(),
    },
  };
}

export function updateDatabaseSettings(
  updates: Partial<UserDatabaseSettings>
): UserDatabaseSettings {
  const nextSettings = getUserDatabaseSettings();

  for (const section of DATABASE_SETTINGS_SECTIONS) {
    if (updates[section] !== undefined) {
      mergeSectionObject(nextSettings, section, updates[section]);
    }
  }

  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  const tx = db.transaction(() => {
    for (const section of DATABASE_SETTINGS_SECTIONS) {
      const sectionValues = nextSettings[section] as Record<string, unknown>;

      for (const [key, value] of Object.entries(sectionValues)) {
        insert.run(DATABASE_SETTINGS_NAMESPACE, `${section}.${key}`, JSON.stringify(value));
      }
    }
  });
  tx();

  backupDbFile("pre-write");
  invalidateDbCache("settings");

  return nextSettings;
}
