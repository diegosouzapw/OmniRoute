-- 155_agentic_conversations.sql
-- Stable multi-turn conversation tracking for /v1/chat/completions and
-- /v1/responses. Clients resend the full growing message/input history on
-- every turn; this table lets us detect "request N's history is request
-- N-1's history plus new turns" so one conversation id can be assigned
-- across many separate HTTP requests, without depending on any
-- client-supplied header (see open-sse/services/conversationTracker.ts).

CREATE TABLE IF NOT EXISTS agentic_conversations (
  id TEXT PRIMARY KEY,               -- 'conv_' + uuid, or the raw client
                                      -- X-Omniroute-Session-Id value when supplied
  api_key_id TEXT,
  fingerprint_hash TEXT NOT NULL,     -- fast candidate lookup
  last_message_count INTEGER NOT NULL,
  last_messages_hash TEXT NOT NULL,   -- bounded hash, for prefix verification
  turn_count INTEGER NOT NULL DEFAULT 1,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_agentic_conversations_fingerprint
  ON agentic_conversations(fingerprint_hash);
CREATE INDEX IF NOT EXISTS idx_agentic_conversations_api_key
  ON agentic_conversations(api_key_id);
CREATE INDEX IF NOT EXISTS idx_agentic_conversations_last_seen
  ON agentic_conversations(last_seen_at);
