-- 135_migrate_model_capability_max_token.sql
-- `max_token` historically meant the maximum output token count. Promote legacy
-- rows to the explicit `max_output_tokens` key without replacing an operator's
-- existing modern value, then remove the retired key.

INSERT INTO model_capability_overrides (
  provider,
  model_id,
  override_key,
  override_value,
  refreshed_at
)
SELECT
  provider,
  model_id,
  'max_output_tokens',
  override_value,
  refreshed_at
FROM model_capability_overrides
WHERE override_key = 'max_token'
ON CONFLICT (provider, model_id, override_key) DO NOTHING;

DELETE FROM model_capability_overrides
WHERE override_key = 'max_token';
