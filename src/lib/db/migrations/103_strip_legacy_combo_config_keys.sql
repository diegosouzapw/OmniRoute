-- 103_strip_legacy_combo_config_keys.sql
-- One-shot sweep over `combos.data` to remove v3.8.31-era config keys that were
-- subsequently dropped from comboRuntimeConfigSchema. Without this sweep, a
-- combo created on ≤ v3.8.31 still carries the legacy keys in its persisted
-- JSON; on the next edit+save the modal spreads the existing config back into
-- the PUT body, and comboRuntimeConfigSchema.strict() rejects the unknown
-- keys with a 400. See diegosouzapw/OmniRoute#4382.
--
-- Belt-and-suspenders:
--   - src/shared/validation/schemas/combo.ts now uses .passthrough() so the
--     server accepts unknown legacy keys during the upgrade window
--   - src/app/api/combos/[id]/route.ts strips the same keys before persistence
--     so new writes are clean
--   - src/app/(dashboard)/dashboard/combos/page.tsx strips them client-side
--
-- This migration handles pre-existing rows. It is idempotent: running it again
-- on a clean DB no-ops because json_remove on a missing path is a no-op, and
-- the WHERE clause skips rows that don't carry any of the legacy keys.

-- Strip the 12 known removed keys from any persisted combo config.
UPDATE combos
SET data = json_remove(
  data,
  '$.config.queueDepth',
  '$.config.fallbackDelayMs',
  '$.config.handoffProviders',
  '$.config.maxComboDepth',
  '$.config.manifestRouting',
  '$.config.complexityAwareRouting',
  '$.config.pipeline_enabled',
  '$.config.pipelineConcurrency',
  '$.config.shadowRouting',
  '$.config.evalRouting',
  '$.config.resetAwareEnabled',
  '$.config.resetAwareWindow'
)
WHERE EXISTS (
  SELECT 1
  FROM json_each(data, '$.config') AS cfg
  WHERE cfg.key IN (
    'queueDepth',
    'fallbackDelayMs',
    'handoffProviders',
    'maxComboDepth',
    'manifestRouting',
    'complexityAwareRouting',
    'pipeline_enabled',
    'pipelineConcurrency',
    'shadowRouting',
    'evalRouting',
    'resetAwareEnabled',
    'resetAwareWindow'
  )
);