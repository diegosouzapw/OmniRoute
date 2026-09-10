CREATE TABLE IF NOT EXISTS verification_chain (
  task_id TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  agent_id TEXT NOT NULL,
  tier TEXT CHECK(tier IN ('council','executive','supervisor','pirate','operator')),
  verdict TEXT CHECK(verdict IN ('COMPLETE','APPROVE','REJECT','ABSTAIN','PENDING','VETO','APPROVE_OPERATOR')),
  rationale TEXT,
  confidence REAL CHECK(confidence BETWEEN 0 AND 1),
  prev_hash TEXT,
  this_hash TEXT NOT NULL,
  timestamp TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (task_id, sequence)) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_task ON verification_chain(task_id);
CREATE INDEX IF NOT EXISTS idx_agent ON verification_chain(agent_id);
CREATE INDEX IF NOT EXISTS idx_verdict ON verification_chain(verdict);

CREATE TABLE IF NOT EXISTS pending_canon (
  task_id TEXT PRIMARY KEY,
  promoted_at TEXT DEFAULT (datetime('now')),
  auto_approve_at TEXT,
  vetoed BOOLEAN DEFAULT 0,
  approved BOOLEAN DEFAULT 0,
  deliverable_summary TEXT,
  verification_chain_hash TEXT) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_auto_approve ON pending_canon(auto_approve_at) WHERE vetoed = 0 AND approved = 0;

CREATE TABLE IF NOT EXISTS canon_deliverables (
  task_id TEXT PRIMARY KEY,
  promoted_at TEXT DEFAULT (datetime('now')),
  deliverable_summary TEXT,
  verification_chain_hash TEXT,
  approved_by TEXT,
  approved_at TEXT DEFAULT (datetime('now'))) WITHOUT ROWID;
