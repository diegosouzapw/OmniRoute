CREATE TABLE IF NOT EXISTS inspector_sessions (
  id TEXT PRIMARY KEY,
  name TEXT,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  request_count INTEGER NOT NULL DEFAULT 0,
  profile TEXT CHECK (profile IN ('llm','custom','all'))
);

CREATE TABLE IF NOT EXISTS inspector_session_requests (
  session_id TEXT NOT NULL REFERENCES inspector_sessions(id) ON DELETE CASCADE,
  seq INTEGER NOT NULL,
  payload TEXT NOT NULL,
  PRIMARY KEY (session_id, seq)
);

CREATE INDEX IF NOT EXISTS idx_inspector_session_requests_sid
  ON inspector_session_requests(session_id);
