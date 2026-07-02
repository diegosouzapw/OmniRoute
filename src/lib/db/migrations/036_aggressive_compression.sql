-- 036: Aggressive compression config
-- Aggressive config is stored as a kv key in key_value(namespace='compression', key='aggressive')
-- No schema change needed; this migration registers the version in _omniroute_migrations
SELECT 1;
