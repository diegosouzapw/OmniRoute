-- Index the 6h retention sweep's filter column (#13973).
-- cleanupConversationTurnNodes() deletes in batches via
-- `WHERE last_seen_at < ?` (see deleteFromTableBeforeInBatches in
-- src/lib/db/cleanup/usagePurge.ts). Without an index the inner SELECT
-- full-scans conversation_turn_nodes on every batch; with it the sweep is a
-- range scan. The table's other indexes (conversation_id, parent_id,
-- conversation_id+content_hash) don't cover this predicate.
CREATE INDEX IF NOT EXISTS idx_turn_nodes_last_seen
  ON conversation_turn_nodes(last_seen_at);
