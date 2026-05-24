-- Migration 063: Add last_model column to context_handoffs
-- Tracks which model generated the handoff summary for debugging transparency.

ALTER TABLE context_handoffs ADD COLUMN last_model TEXT;

CREATE INDEX IF NOT EXISTS idx_context_handoffs_last_model
ON context_handoffs(session_id, combo_name, last_model);
