-- TV6 — Typed memory decay: track access frequency so decay can grant access-based immunity.
--
-- `access_count` increments each time a memory is injected into a prompt; `last_accessed_at`
-- records the most recent injection (and re-bases the decay clock so recently-used memories
-- survive). Both default to a never-accessed baseline, so every pre-existing row behaves as
-- freshly-created: its decay clock falls back to `created_at` and its access count starts at 0.
-- These columns only feed the OPT-IN, default-off decay sweep (`MEMORY_TYPED_DECAY_ENABLED`);
-- with the sweep disabled they are pure, harmless telemetry.
ALTER TABLE memories ADD COLUMN access_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE memories ADD COLUMN last_accessed_at TEXT;
