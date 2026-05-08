-- 046_database_settings.sql
-- Insert default database settings into key_value table (namespace='databaseSettings')
-- Uses INSERT OR IGNORE so existing user settings are never overwritten by migration replay.

-- Logs settings
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'detailedLogsEnabled', 'true');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'callLogPipelineEnabled', 'true');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'maxDetailSizeKb', '500');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'ringBufferSize', '1000');

-- Backup settings
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'autoBackupEnabled', 'false');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'autoBackupFrequency', '"never"');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'keepLastNBackups', '3');

-- Cache settings
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'semanticCacheEnabled', 'true');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'semanticCacheMaxSize', '100');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'semanticCacheTTL', '1800000');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'promptCacheEnabled', 'true');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'promptCacheStrategy', '"auto"');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'alwaysPreserveClientCache', '"auto"');

-- Retention settings
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'quotaSnapshots', '90');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'compressionAnalytics', '30');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'mcpAudit', '30');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'a2aEvents', '30');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'callLogs', '90');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'usageHistory', '365');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'memoryEntries', '180');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'autoCleanupEnabled', 'true');

-- Aggregation settings
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'aggregationEnabled', 'false');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'rawDataRetentionDays', '7');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'granularity', '"daily"');

-- Optimization settings
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'autoVacuumMode', '"INCREMENTAL"');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'scheduledVacuum', '"weekly"');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'pageSize', '4096');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'cacheSize', '10000');
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'mmapSize', '268435456');
