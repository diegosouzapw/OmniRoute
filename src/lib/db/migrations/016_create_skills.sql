-- 015_create_skills.sql
-- Skills table for tool/function capability injection.
-- Stores skill definitions with schemas and execution tracking.

CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  description TEXT,
  schema TEXT NOT NULL,
  handler TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS skill_executions (
  id TEXT PRIMARY KEY,
  skill_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  session_id TEXT,
  input TEXT NOT NULL,
  output TEXT,
  status TEXT NOT NULL CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout')),
  error_message TEXT,
  duration_ms INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_skills_api_key ON skills(api_key_id);
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);
CREATE INDEX IF NOT EXISTS idx_skill_executions_skill ON skill_executions(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_executions_api_key ON skill_executions(api_key_id);
CREATE INDEX IF NOT EXISTS idx_skill_executions_status ON skill_executions(status);
CREATE INDEX IF NOT EXISTS idx_skill_executions_created ON skill_executions(created_at);