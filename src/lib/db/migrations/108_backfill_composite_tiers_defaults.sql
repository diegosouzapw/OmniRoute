-- 108_backfill_composite_tiers_defaults.sql
-- Backward-compat backfill for legacy stored compositeTiers configs.
--
-- The release after v3.8.32 added per-composite-tier `strategy` and `cost`
-- sub-fields to the schema (see src/shared/validation/schemas/combo.ts).
-- Pre-3.8.32 stored configs only carry `defaultTier` and `tiers`. Without
-- this backfill, a stored combo edited+resaved on the new code 400s on
-- PUT /api/combos/{id} because the schema is now stricter about the new
-- fields. Mirrors the migration 103 pattern for the v3.8.31 → v3.8.33
-- key-cleanup sweep (see #4774, #4382).
--
-- Belt-and-suspenders:
--   - src/shared/validation/schemas/combo.ts: compositeTiersSchema now uses
--     .passthrough() + .transform() to auto-promote the new fields at
--     parse time, so the API path accepts the legacy configs at runtime.
--   - src/lib/db/migrations/108_backfill_composite_tiers_defaults.sql
--     (this file) handles pre-existing rows at the DB level, so subsequent
--     reads produce a clean, fully-formed compositeTiers object.
--
-- Defaults match the transform in compositeTiersSchema (single source of
-- truth: if either changes, both must change to keep the DB and the API
-- path in agreement):
--   - strategy   → "priority"
--   - cost.floor → 0
--   - cost.ceiling → 1000000
--
-- Idempotent: each step uses json_type() guards so re-running on a clean
-- DB is a no-op. No UPDATE fires when the target field is already set.

-- Step 1: backfill the top-level `strategy` field on any stored
-- compositeTiers object that lacks it. (Pre-3.8.32 stored configs.)
UPDATE combos
SET data = json_set(data, '$.config.compositeTiers.strategy', 'priority')
WHERE json_type(data, '$.config.compositeTiers') = 'object'
  AND json_type(data, '$.config.compositeTiers.strategy') IS NULL;

-- Step 2: backfill the top-level `cost` object on any stored
-- compositeTiers that lacks it. (Pre-3.8.32 stored configs.)
UPDATE combos
SET data = json_set(
  data,
  '$.config.compositeTiers.cost',
  json_object('floor', 0, 'ceiling', 1000000)
)
WHERE json_type(data, '$.config.compositeTiers') = 'object'
  AND json_type(data, '$.config.compositeTiers.cost') IS NULL;

-- Step 3: backfill `cost.floor` on any stored `cost` object that has
-- `ceiling` set but not `floor`. (Edge case: hand-edited configs, partial
-- migrations, etc.)
UPDATE combos
SET data = json_set(data, '$.config.compositeTiers.cost.floor', 0)
WHERE json_type(data, '$.config.compositeTiers.cost') = 'object'
  AND json_type(data, '$.config.compositeTiers.cost.floor') IS NULL;

-- Step 4: backfill `cost.ceiling` on any stored `cost` object that has
-- `floor` set but not `ceiling`. (Edge case: hand-edited configs, partial
-- migrations, etc.)
UPDATE combos
SET data = json_set(data, '$.config.compositeTiers.cost.ceiling', 1000000)
WHERE json_type(data, '$.config.compositeTiers.cost') = 'object'
  AND json_type(data, '$.config.compositeTiers.cost.ceiling') IS NULL;
