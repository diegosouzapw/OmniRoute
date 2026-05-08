/**
 * Database performance optimization settings stored in SQLite key-value pairs.
 * User-configurable aggregation, retention, and optimization settings.
 */

export interface DatabaseSettings {
  /** 1. Location (read-only display) */
  location: {
    databasePath: string;
    dataDir: string;
    walSizeBytes: number;
    schemaVersion: number;
  };

  /** 2. Logs (what gets captured) */
  logs: {
    detailedLogsEnabled: boolean;
    callLogPipelineEnabled: boolean;
    maxDetailSizeKb: number;
    ringBufferSize: number;
  };

  /** 3. Backup (backup/restore/import/export) */
  backup: {
    autoBackupEnabled: boolean;
    autoBackupFrequency: "never" | "daily" | "weekly" | "monthly";
    keepLastNBackups: number;
  };

  /** 4. Cache (moved from CacheSettingsTab) */
  cache: {
    semanticCacheEnabled: boolean;
    semanticCacheMaxSize: number;
    semanticCacheTTL: number;
    promptCacheEnabled: boolean;
    promptCacheStrategy: "auto" | "system-only" | "manual";
    alwaysPreserveClientCache: "auto" | "always" | "never";
  };

  /** 5. Retention (per-table cleanup policies) */
  retention: {
    quotaSnapshots: number;
    compressionAnalytics: number;
    mcpAudit: number;
    a2aEvents: number;
    callLogs: number;
    usageHistory: number;
    memoryEntries: number;
    autoCleanupEnabled: boolean;
  };

  /** 6. Compression (aggregation) */
  aggregation: {
    enabled: boolean;
    rawDataRetentionDays: number;
    granularity: "hourly" | "daily" | "weekly";
  };

  /** 7. Optimization (auto_vacuum, VACUUM, page/cache) */
  optimization: {
    autoVacuumMode: "NONE" | "FULL" | "INCREMENTAL";
    scheduledVacuum: "never" | "daily" | "weekly" | "monthly";
    vacuumHour: number;
    pageSize: number;
    cacheSize: number;
    optimizeOnStartup: boolean;
  };

  /** Read-only stats */
  stats: {
    databaseSizeBytes: number;
    pageCount: number;
    freelistCount: number;
    lastVacuumAt: string | null;
    lastOptimizationAt: string | null;
    integrityCheck: "ok" | "error" | null;
  };
}

/** Default database settings */
export const DEFAULT_DATABASE_SETTINGS: Omit<DatabaseSettings, "location" | "stats"> = {
  logs: {
    detailedLogsEnabled: false,
    callLogPipelineEnabled: false,
    maxDetailSizeKb: 10,
    ringBufferSize: 500,
  },
  backup: {
    autoBackupEnabled: false,
    autoBackupFrequency: "never",
    keepLastNBackups: 5,
  },
  cache: {
    semanticCacheEnabled: true,
    semanticCacheMaxSize: 100,
    semanticCacheTTL: 1800000,
    promptCacheEnabled: true,
    promptCacheStrategy: "auto",
    alwaysPreserveClientCache: "auto",
  },
  retention: {
    quotaSnapshots: 7,
    compressionAnalytics: 30,
    mcpAudit: 30,
    a2aEvents: 30,
    callLogs: 30,
    usageHistory: 30,
    memoryEntries: 30,
    autoCleanupEnabled: true,
  },
  aggregation: {
    enabled: true,
    rawDataRetentionDays: 30,
    granularity: "daily",
  },
  optimization: {
    autoVacuumMode: "FULL",
    scheduledVacuum: "weekly",
    vacuumHour: 2,
    pageSize: 4096,
    cacheSize: -2000,
    optimizeOnStartup: true,
  },
};
