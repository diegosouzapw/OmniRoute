-- Migration 206: seen_models — persistent "New models" inbox state.
--
-- One row per (provider, model_id) ever observed by a successful model sync.
-- acknowledged_at NULL = the model is still unread in the dashboard inbox.
-- The first sync of a provider seeds its whole listing as already acknowledged,
-- so an existing install (or a freshly connected provider) never floods the inbox;
-- only models that appear in LATER syncs are flagged. Rows are never deleted when a
-- model disappears from a listing, so a model that comes back is not re-flagged.

CREATE TABLE IF NOT EXISTS seen_models (
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  is_free INTEGER NOT NULL DEFAULT 0,
  first_seen_at TEXT NOT NULL,
  acknowledged_at TEXT,
  PRIMARY KEY (provider, model_id)
);

CREATE INDEX IF NOT EXISTS idx_seen_models_acknowledged_at
  ON seen_models(acknowledged_at);
