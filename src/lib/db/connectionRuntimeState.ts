import { getDbInstance } from "./core";

export interface ConnectionRuntimeState {
  connectionId: string;
  refreshCircuitStreak: number;
  refreshCircuitUntil: string | null;
  refreshLastFailAt: string | null;
  warmupCircuitStreak: number;
  warmupCircuitUntil: string | null;
  warmupLastFailAt: string | null;
  lastWarmupAt: string | null;
  lastWarmupResult: string | null;
  warmupTokensUsed: number;
  updatedAt: string;
}

function mapRow(row: any): ConnectionRuntimeState {
  return {
    connectionId: row.connection_id,
    refreshCircuitStreak: row.refresh_circuit_streak ?? 0,
    refreshCircuitUntil: row.refresh_circuit_until,
    refreshLastFailAt: row.refresh_last_fail_at,
    warmupCircuitStreak: row.warmup_circuit_streak ?? 0,
    warmupCircuitUntil: row.warmup_circuit_until,
    warmupLastFailAt: row.warmup_last_fail_at,
    lastWarmupAt: row.last_warmup_at,
    lastWarmupResult: row.last_warmup_result,
    warmupTokensUsed: row.warmup_tokens_used ?? 0,
    updatedAt: row.updated_at,
  };
}

export function getConnectionRuntimeState(connectionId: string): ConnectionRuntimeState | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT * FROM connection_runtime_state WHERE connection_id = ?")
    .get(connectionId);
  return row ? mapRow(row) : null;
}

export async function upsertWarmupState(
  connectionId: string,
  state: { lastWarmupAt: string; lastResult: string; tokensUsed: number }
): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO connection_runtime_state (connection_id, last_warmup_at, last_warmup_result, warmup_tokens_used, updated_at)
     VALUES (?, ?, ?, ?, datetime('now'))
     ON CONFLICT(connection_id) DO UPDATE SET
       last_warmup_at = excluded.last_warmup_at,
       last_warmup_result = excluded.last_warmup_result,
       warmup_tokens_used = excluded.warmup_tokens_used,
       updated_at = datetime('now')`
  ).run(connectionId, state.lastWarmupAt, state.lastResult, state.tokensUsed);
}

export async function upsertWarmupCircuit(
  connectionId: string,
  circuit: { streak: number; until: string; lastFailAt: string }
): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO connection_runtime_state (connection_id, warmup_circuit_streak, warmup_circuit_until, warmup_last_fail_at, updated_at)
     VALUES (?, ?, ?, ?, datetime('now'))
     ON CONFLICT(connection_id) DO UPDATE SET
       warmup_circuit_streak = excluded.warmup_circuit_streak,
       warmup_circuit_until = excluded.warmup_circuit_until,
       warmup_last_fail_at = excluded.warmup_last_fail_at,
       updated_at = datetime('now')`
  ).run(connectionId, circuit.streak, circuit.until, circuit.lastFailAt);
}

export async function clearWarmupCircuit(connectionId: string): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    `UPDATE connection_runtime_state
     SET warmup_circuit_streak = 0, warmup_circuit_until = NULL, warmup_last_fail_at = NULL, updated_at = datetime('now')
     WHERE connection_id = ?`
  ).run(connectionId);
}

export async function markForbidden(connectionId: string, at: string): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO connection_runtime_state (connection_id, last_warmup_result, last_warmup_at, updated_at)
     VALUES (?, 'forbidden', ?, datetime('now'))
     ON CONFLICT(connection_id) DO UPDATE SET
       last_warmup_result = 'forbidden',
       last_warmup_at = excluded.last_warmup_at,
       updated_at = datetime('now')`
  ).run(connectionId, at);
}
