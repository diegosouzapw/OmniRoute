-- 169_model_capabilities.sql
--
-- Promote `model_capabilities` from a lazily-created runtime table to a real migration.
--
-- WHY: the table was only ever created by `ensureCapabilitiesTable()` in
-- src/lib/modelsDevSync.ts, on demand, the first time a models.dev capability sync ran.
-- Whether a database has it therefore depends on TIMING, not on the schema version — so a
-- clean install and an upgraded install diverge for no structural reason. The v3.8.50
-- publish run hit exactly that: `check:install-upgrade` reported `model_capabilities` as a
-- table "present only after upgrade", because the older database had already run a sync
-- and the freshly-installed one had not.
--
-- Creating it here makes both install paths converge deterministically.
-- `ensureCapabilitiesTable()` stays in place as an idempotent safety net (it is a
-- CREATE TABLE IF NOT EXISTS and now always a no-op); tests/unit/db-install-upgrade-schema-parity.test.ts
-- pins the two definitions against drift.
--
-- IF NOT EXISTS is required, not decorative: every database that ever ran a models.dev
-- sync already has this table, and this migration must be a no-op there.

CREATE TABLE IF NOT EXISTS model_capabilities (
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  tool_call BOOLEAN,
  reasoning BOOLEAN,
  attachment BOOLEAN,
  structured_output BOOLEAN,
  temperature BOOLEAN,
  modalities_input TEXT,
  modalities_output TEXT,
  knowledge_cutoff TEXT,
  release_date TEXT,
  last_updated TEXT,
  status TEXT,
  family TEXT,
  open_weights BOOLEAN,
  limit_context INTEGER,
  limit_input INTEGER,
  limit_output INTEGER,
  interleaved_field TEXT,
  last_synced TEXT,
  PRIMARY KEY (provider, model_id)
);
