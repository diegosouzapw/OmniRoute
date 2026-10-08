-- 186_conversation_turn_nodes_last_seen_index.sql
-- conversation_turn_nodes retention cleanup (cleanup.ts::cleanupConversationTurnNodes,
-- #13973) deletes rows WHERE last_seen_at < cutoff. Migration 156 indexed
-- conversation_id/parent_id/content_hash but never last_seen_at, so every
-- periodic retention pass was a full table scan on top of the batch delete's
-- own cost. Purely additive — only speeds up the existing DELETE, no schema
-- or behavior change for callers.

CREATE INDEX IF NOT EXISTS idx_turn_nodes_last_seen
  ON conversation_turn_nodes(last_seen_at);
