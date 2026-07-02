-- 013_unified_log_artifacts.sql
-- Switch request logging to unified single-file artifacts and prefixed settings.

INSERT OR REPLACE INTO key_value (namespace, key, value)
VALUES (
  'settings',
  'call_log_pipeline_enabled',
  COALESCE(
    (SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'detailed_logs_enabled'),
    'false'
  )
);

DELETE FROM key_value
WHERE namespace = 'settings' AND key IN ('detailed_logs_enabled', 'maxCallLogs', 'MAX_CALL_LOGS');
