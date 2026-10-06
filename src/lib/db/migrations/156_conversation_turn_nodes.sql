-- 156_conversation_turn_nodes.sql
-- Per-turn hash-chain IDENTITY nodes backing a conversation's linear
-- transcript (open-sse/services/conversationTracker.ts). Each row is one
-- distinct turn instance, chained to its predecessor the same way a git
-- commit graph chains commits: id = sha256(parentId ?? conversationId, role,
-- sha256(text)). A request whose turns all match existing nodes just
-- extends the chain; a request whose Nth turn differs from what's on file
-- (a real-world OpenClaw pattern: cache-aware context injection edits/
-- duplicates a turn mid-history to keep provider-side prompt caches warm)
-- becomes its OWN independent conversation instead (2026-08-06 — every
-- OmniRoute conversation is a single straight line, it never forks; see
-- resolveConversationId's doc comment). See agentic_conversations (155) for
-- the conversation-root record; its last_message_count/last_messages_hash
-- columns are superseded by this table and no longer written to.
--
-- content_hash (sha256 of just this turn's own role+text, independent of
-- parent) lets resolveConversationId reconnect from ANY existing node, not
-- only the chain's start: real OpenClaw traffic drops/summarizes the
-- EARLIEST turns as a session grows (a sliding context window), so the turn
-- at index 0 of a new request is often not the chain's first turn at all —
-- a start-only walk would find zero match and mint a spurious new
-- conversation despite a real, unbroken tail overlap.
--
-- Deliberately identity-only, no display content: the dashboard transcript
-- view resolves each node's actual text/tool-call shape on demand from the
-- call-log pipeline artifact `last_correlation_id` points at (see
-- open-sse/services/conversationTurnContent.ts), reusing the same full,
-- untruncated request/response payloads call_logs already persists behind
-- call_log_pipeline_enabled instead of storing a second, truncated copy of
-- conversation content here.

CREATE TABLE IF NOT EXISTS conversation_turn_nodes (
  id TEXT PRIMARY KEY,               -- chain hash, see above
  conversation_id TEXT NOT NULL,     -- agentic_conversations.id (this chain's conversation)
  parent_id TEXT,                    -- NULL for the first turn of the chain
  role TEXT NOT NULL,
  content_hash TEXT NOT NULL DEFAULT '', -- sha256(role+text) — reconnect-anchor lookup AND
                                      -- the key the tree API resolves display content by
  last_correlation_id TEXT,          -- call_logs.correlation_id of the request that
                                      -- (re)touched this node — resolveConversationId
                                      -- runs before the call_logs row's own id exists,
                                      -- but correlation_id (109_call_logs_correlation_id)
                                      -- is already generated earlier in the same request
                                      -- and is available synchronously; the tree API route
                                      -- joins through it to the call_logs artifact holding
                                      -- this node's actual display content
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_turn_nodes_conversation
  ON conversation_turn_nodes(conversation_id);
CREATE INDEX IF NOT EXISTS idx_turn_nodes_parent
  ON conversation_turn_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_turn_nodes_content_hash
  ON conversation_turn_nodes(conversation_id, content_hash);
