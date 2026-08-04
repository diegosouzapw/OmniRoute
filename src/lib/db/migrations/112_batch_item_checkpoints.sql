-- 110_batch_item_checkpoints.sql
-- Durable per-item checkpoints for OpenAI-compatible batch processing.

CREATE TABLE IF NOT EXISTS batch_item_checkpoints (
  batch_id TEXT NOT NULL,
  line_number INTEGER NOT NULL,
  custom_id TEXT,
  status TEXT NOT NULL CHECK(status IN ('pending', 'processing', 'completed', 'errored')),
  result_json TEXT,
  error_json TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (batch_id, line_number),
  FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_batch_item_checkpoints_batch_status
  ON batch_item_checkpoints(batch_id, status);
