-- Migration 062: Add combo_strategy column to usage_history
-- Tracks the routing strategy (priority, weighted, cost-optimized, etc.) for usage analytics.
ALTER TABLE usage_history ADD COLUMN combo_strategy TEXT DEFAULT 'direct';
CREATE INDEX IF NOT EXISTS idx_uh_combo_strategy ON usage_history(combo_strategy);