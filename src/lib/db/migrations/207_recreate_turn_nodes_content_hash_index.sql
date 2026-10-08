-- 207_recreate_turn_nodes_content_hash_index.sql
-- Migration 201 dropped idx_turn_nodes_content_hash because no SQL query read
-- it at the time. #15637 adds one: findAgenticConversationsByContent
-- (src/lib/db/agenticConversations.ts) probes up to 500 conversations of a
-- fingerprint bucket for a few of the request's turn hashes, on the
-- pre-routing path of every tracked request. Without this index each probe
-- falls back to idx_turn_nodes_conversation and filters every node of the
-- conversation row by row (~330-420 ms synchronous for 500 conversations x
-- 800 nodes, vs ~16-20 ms with the index).
-- Trade-off: this brings back the per-insert index write that 201 removed;
-- the read it serves runs on every request, the write only on new turns.
-- idx_turn_nodes_parent stays dropped (still unread).

CREATE INDEX IF NOT EXISTS idx_turn_nodes_content_hash
  ON conversation_turn_nodes(conversation_id, content_hash);
