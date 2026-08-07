/**
 * Durable second tier for the CCR block store (#9061).
 *
 * The CCR engine's in-process `Map` stays the hot cache; this module is what makes its
 * promise survive an eviction, a TTL sweep, a restart, or a retrieve that lands on
 * another instance. Every function here is best-effort: the caller treats a throw as
 * "not durable this time", never as a request failure.
 */
import { getDbInstance } from "./core";

export interface CcrBlockRow {
  principalId: string;
  hash: string;
  content: string;
  bytes: number;
  chars: number;
  lines: number;
  contentType: string;
  source: string;
  createdAt: number;
  lastAccessedAt: number;
  expiresAt: number;
}

interface CcrBlockDbRow {
  content: string;
  bytes: number;
  chars: number;
  lines: number;
  content_type: string;
  source: string;
  created_at: number;
  last_accessed_at: number;
  expires_at: number;
}

/**
 * Writes older than this are not worth a prune scan on every call.
 * ponytail: counter-based throttle, swap for a scheduled sweep if the table ever grows
 * fast enough that 200 writes of drift matters.
 */
const PRUNE_EVERY_N_WRITES = 200;
let writesSincePrune = 0;

export function persistCcrBlock(row: CcrBlockRow): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT OR REPLACE INTO ccr_blocks (
       principal_id, hash, content, bytes, chars, lines,
       content_type, source, created_at, last_accessed_at, expires_at
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    row.principalId,
    row.hash,
    row.content,
    row.bytes,
    row.chars,
    row.lines,
    row.contentType,
    row.source,
    row.createdAt,
    row.lastAccessedAt,
    row.expiresAt
  );

  if (++writesSincePrune >= PRUNE_EVERY_N_WRITES) {
    writesSincePrune = 0;
    pruneExpiredCcrBlocks(Date.now());
  }
}

/** Returns the block only while it is unexpired; an expired row is deleted and read as a miss. */
export function loadCcrBlock(principalId: string, hash: string, now: number): CcrBlockRow | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT content, bytes, chars, lines, content_type, source,
              created_at, last_accessed_at, expires_at
         FROM ccr_blocks WHERE principal_id = ? AND hash = ?`
    )
    .get(principalId, hash) as CcrBlockDbRow | undefined;

  if (!row) return null;
  if (row.expires_at <= now) {
    deleteCcrBlockRow(principalId, hash);
    return null;
  }

  return {
    principalId,
    hash,
    content: row.content,
    bytes: row.bytes,
    chars: row.chars,
    lines: row.lines,
    contentType: row.content_type,
    source: row.source,
    createdAt: row.created_at,
    lastAccessedAt: row.last_accessed_at,
    expiresAt: row.expires_at,
  };
}

export function touchCcrBlock(principalId: string, hash: string, lastAccessedAt: number): void {
  getDbInstance()
    .prepare(`UPDATE ccr_blocks SET last_accessed_at = ? WHERE principal_id = ? AND hash = ?`)
    .run(lastAccessedAt, principalId, hash);
}

export function deleteCcrBlockRow(principalId: string, hash: string): void {
  getDbInstance()
    .prepare(`DELETE FROM ccr_blocks WHERE principal_id = ? AND hash = ?`)
    .run(principalId, hash);
}

/**
 * Drops every durable block. Mirrors the engine's `resetCcrStore()` so that "reset" keeps
 * meaning reset once the store has a second tier.
 */
export function deleteAllCcrBlocks(): void {
  getDbInstance().prepare(`DELETE FROM ccr_blocks`).run();
}

/** Drops every block whose TTL has passed. Returns how many rows went. */
export function pruneExpiredCcrBlocks(now: number): number {
  const result = getDbInstance().prepare(`DELETE FROM ccr_blocks WHERE expires_at <= ?`).run(now);
  return result.changes ?? 0;
}

export function countCcrBlocks(principalId?: string): number {
  const db = getDbInstance();
  const row = (
    principalId === undefined
      ? db.prepare(`SELECT COUNT(*) AS n FROM ccr_blocks`).get()
      : db.prepare(`SELECT COUNT(*) AS n FROM ccr_blocks WHERE principal_id = ?`).get(principalId)
  ) as { n: number } | undefined;
  return row?.n ?? 0;
}

/** Test seam: the write throttle is module state and has to be resettable between tests. */
export function resetCcrBlockPruneCounter(): void {
  writesSincePrune = 0;
}
