/**
 * db/memoryVec.ts — CRUD for memory vector metadata and reindex state.
 *
 * Plan 21 — Memory Engine Redesign.
 * Raw SQL is allowed here (Hard Rule #5 — src/lib/db/ domain module).
 *
 * This module manages:
 *   - `memory_vec_meta`: singleton row tracking the active embedding dim/signature/reset
 *   - `memories.needs_reindex`: flag for lazy backfill of missing/stale vectors
 */

import { getDbInstance } from "./core";

// ──────────────── Types ────────────────

export interface MemoryVecMeta {
  activeDim: number | null;
  embeddingSignature: string | null;
  lastResetAt: string | null;
  vecLoaded: boolean;
}

// ──────────────── memory_vec_meta ────────────────

/**
 * Get the singleton memory_vec_meta row.
 * Returns defaults if the row is absent (e.g. migration not yet applied on
 * an in-memory test DB that ran without the migration file).
 */
export function getMemoryVecMeta(): MemoryVecMeta {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT active_dim, embedding_signature, last_reset_at, vec_loaded FROM memory_vec_meta WHERE id = 1"
    )
    .get() as
    | {
        active_dim: number | null;
        embedding_signature: string | null;
        last_reset_at: string | null;
        vec_loaded: number;
      }
    | undefined;

  if (!row) {
    return {
      activeDim: null,
      embeddingSignature: null,
      lastResetAt: null,
      vecLoaded: false,
    };
  }

  return {
    activeDim: row.active_dim,
    embeddingSignature: row.embedding_signature,
    lastResetAt: row.last_reset_at,
    vecLoaded: row.vec_loaded === 1,
  };
}

/**
 * Update one or more fields in the singleton memory_vec_meta row.
 * Uses INSERT OR REPLACE to handle the case where the row is missing
 * (e.g. called before or during migration on a test DB).
 */
export function setMemoryVecMeta(meta: Partial<MemoryVecMeta>): void {
  const db = getDbInstance();

  // Read current values first so we can merge (partial update pattern).
  const current = getMemoryVecMeta();

  const activeDim = "activeDim" in meta ? meta.activeDim ?? null : current.activeDim;
  const embeddingSignature =
    "embeddingSignature" in meta
      ? meta.embeddingSignature ?? null
      : current.embeddingSignature;
  const lastResetAt =
    "lastResetAt" in meta ? meta.lastResetAt ?? null : current.lastResetAt;
  const vecLoaded =
    "vecLoaded" in meta ? (meta.vecLoaded ? 1 : 0) : current.vecLoaded ? 1 : 0;

  db.prepare(
    `INSERT OR REPLACE INTO memory_vec_meta
       (id, active_dim, embedding_signature, last_reset_at, vec_loaded)
     VALUES (1, ?, ?, ?, ?)`
  ).run(activeDim, embeddingSignature, lastResetAt, vecLoaded);
}

// ──────────────── memories.needs_reindex ────────────────

/**
 * Mark a single memory as needing reindex (or clear the flag).
 */
export function markMemoryNeedsReindex(id: string, needs: boolean): void {
  const db = getDbInstance();
  db.prepare("UPDATE memories SET needs_reindex = ? WHERE id = ?").run(needs ? 1 : 0, id);
}

/**
 * Mark ALL memories as needing reindex.
 * Returns the number of rows affected.
 */
export function markAllMemoriesNeedReindex(): number {
  const db = getDbInstance();
  const result = db.prepare("UPDATE memories SET needs_reindex = 1").run();
  return result.changes;
}

/**
 * Get a batch of memories that need reindex, ordered by creation date ascending.
 * Returns id, content, and key for each memory so the vector can be regenerated.
 */
export function getMemoryReindexQueue(
  limit: number
): Array<{ id: string; content: string; key: string }> {
  const db = getDbInstance();
  return db
    .prepare(
      `SELECT id, content, COALESCE(key, '') AS key
       FROM memories
       WHERE needs_reindex = 1
       ORDER BY created_at ASC
       LIMIT ?`
    )
    .all(limit) as Array<{ id: string; content: string; key: string }>;
}

/**
 * Count how many memories currently have needs_reindex = 1.
 */
export function countMemoryReindexPending(): number {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) AS cnt FROM memories WHERE needs_reindex = 1")
    .get() as { cnt: number };
  return row.cnt;
}
