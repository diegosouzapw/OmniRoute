-- 201_drop_unused_turn_node_indexes.sql
-- conversation_turn_nodes carries two indexes no query reads. Migration 156
-- created idx_turn_nodes_parent(parent_id) and
-- idx_turn_nodes_content_hash(conversation_id, content_hash) for an anchor
-- search that now runs in memory: resolveConversationId bulk-loads the whole
-- chain once per candidate (getConversationTurnIndex,
-- src/lib/db/agenticConversations.ts) into byContentHash/parentsWithChildren
-- maps, and the dashboard tree view resolves display content from the
-- call-log artifact each node points at
-- (open-sse/services/conversationTurnContent.ts) — neither path filters,
-- joins, or sorts on parent_id or content_hash in SQL.
-- Every remaining query on the table filters on conversation_id (reads, page
-- fetch, multi-turn counts, orphan sweep) or last_seen_at (retention sweep,
-- migration 186), so idx_turn_nodes_conversation and idx_turn_nodes_last_seen
-- stay. Note the 156 header still describes content_hash as the reconnect
-- anchor lookup key: that is true in memory now, not in SQL.
-- Dropping just stops the write amplification on the per-request insert path
-- and frees pages for reuse; the file itself only shrinks after VACUUM
-- (deliberately out of scope here).

DROP INDEX IF EXISTS idx_turn_nodes_parent;
DROP INDEX IF EXISTS idx_turn_nodes_content_hash;
