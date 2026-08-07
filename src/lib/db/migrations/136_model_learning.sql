-- PR1 adaptive learning: long-term per-model per-task-type learning table.
-- Where combo_adaptation_state is operational (short-term cooldown/warm per
-- combo), model_learning aggregates quality signals per (model_str, task_type)
-- and is the source flushed into model_intelligence as source='adaptive_learning'.
-- confidence is a forward-looking gate (sample_count_to_confidence mapping:
-- 20→0.5, 50→0.8, 100→1.0) that resolution does NOT consult yet — field only.
CREATE TABLE IF NOT EXISTS model_learning (
    model_str TEXT NOT NULL,
    task_type TEXT NOT NULL DEFAULT 'default',
    learned_score REAL NOT NULL DEFAULT 0.5,
    sample_count INTEGER NOT NULL DEFAULT 0,
    success_count INTEGER NOT NULL DEFAULT 0,
    quality_failures INTEGER NOT NULL DEFAULT 0,
    empty_responses INTEGER NOT NULL DEFAULT 0,
    tool_calls INTEGER NOT NULL DEFAULT 0,
    tool_call_successes INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    first_pass_successes INTEGER NOT NULL DEFAULT 0,
    first_pass_total INTEGER NOT NULL DEFAULT 0,
    confidence REAL NOT NULL DEFAULT 0,
    last_updated TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (model_str, task_type)
);
CREATE INDEX IF NOT EXISTS idx_model_learning_updated ON model_learning(last_updated);
