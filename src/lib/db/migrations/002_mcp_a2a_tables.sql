-- 002_mcp_a2a_tables.sql
-- Tables for MCP Server audit, A2A task lifecycle,
-- routing decision tracking, and Auto-Combo adaptation state.

-- ============ MCP Tool Audit ============
-- Tracks every MCP tool invocation for security audit and observability.
CREATE TABLE IF NOT EXISTS mcp_tool_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tool_name TEXT NOT NULL,
    input_hash TEXT,
    output_summary TEXT,
    duration_ms INTEGER,
    api_key_id TEXT,
    success INTEGER DEFAULT 1,
    error_code TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_mta_tool ON mcp_tool_audit(tool_name);
CREATE INDEX IF NOT EXISTS idx_mta_created ON mcp_tool_audit(created_at);
CREATE INDEX IF NOT EXISTS idx_mta_apikey ON mcp_tool_audit(api_key_id);

-- ============ A2A Tasks ============
-- Stores A2A task lifecycle (submitted → working → completed/failed/cancelled).
CREATE TABLE IF NOT EXISTS a2a_tasks (
    id TEXT PRIMARY KEY,
    state TEXT NOT NULL DEFAULT 'submitted',
    skill_id TEXT,
    input_json TEXT,
    output_json TEXT,
    cost_estimated REAL,
    cost_actual REAL,
    routing_explanation TEXT,
    resilience_trace TEXT,
    policy_verdict TEXT,
    api_key_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    completed_at TEXT,
    expires_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_a2a_state ON a2a_tasks(state);
CREATE INDEX IF NOT EXISTS idx_a2a_skill ON a2a_tasks(skill_id);
CREATE INDEX IF NOT EXISTS idx_a2a_created ON a2a_tasks(created_at);

-- ============ A2A Task Events ============
-- Event log for each A2A task (state transitions, errors, fallbacks).
CREATE TABLE IF NOT EXISTS a2a_task_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL REFERENCES a2a_tasks(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    data_json TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_a2ae_task ON a2a_task_events(task_id);
CREATE INDEX IF NOT EXISTS idx_a2ae_type ON a2a_task_events(event_type);

-- ============ Routing Decisions ============
-- Records every routing decision for explainability and learning.
CREATE TABLE IF NOT EXISTS routing_decisions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id TEXT,
    task_type TEXT,
    combo_id TEXT,
    provider_selected TEXT,
    model_selected TEXT,
    score REAL,
    factors_json TEXT,
    fallbacks_triggered INTEGER DEFAULT 0,
    success INTEGER DEFAULT 1,
    latency_ms INTEGER,
    cost REAL,
    source TEXT DEFAULT 'api',
    created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_rd_request ON routing_decisions(request_id);
CREATE INDEX IF NOT EXISTS idx_rd_combo ON routing_decisions(combo_id);
CREATE INDEX IF NOT EXISTS idx_rd_provider ON routing_decisions(provider_selected);
CREATE INDEX IF NOT EXISTS idx_rd_created ON routing_decisions(created_at);

-- ============ Combo Adaptation State ============
-- Persisted learning state for Auto-Combo scoring engine.
CREATE TABLE IF NOT EXISTS combo_adaptation_state (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    combo_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    learned_score REAL DEFAULT 0.5,
    request_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    avg_latency_ms REAL,
    last_failure_at TEXT,
    excluded_until TEXT,
    updated_at TEXT DEFAULT (datetime('now')),
    UNIQUE(combo_id, provider_id)
);
CREATE INDEX IF NOT EXISTS idx_cas_combo ON combo_adaptation_state(combo_id);
