import { getDbInstance } from "./core";

export interface SessionAccountAffinity {
  sessionKey: string;
  provider: string;
  connectionId: string;
  createdAt: number;
  lastSeenAt: number;
}

interface SessionAccountAffinityRow {
  session_key: string;
  provider: string;
  connection_id: string;
  created_at: number;
  last_seen_at: number;
}

const DEFAULT_TTL_MS = 30 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

let cleanupTimer: NodeJS.Timeout | null = null;

function rowToAffinity(row: SessionAccountAffinityRow): SessionAccountAffinity {
  return {
    sessionKey: row.session_key,
    provider: row.provider,
    connectionId: row.connection_id,
    createdAt: row.created_at,
    lastSeenAt: row.last_seen_at,
  };
}

export function getSessionAccountAffinity(
  sessionKey: string,
  provider: string
): SessionAccountAffinity | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT session_key, provider, connection_id, created_at, last_seen_at
       FROM session_account_affinity
       WHERE session_key = ? AND provider = ?`
    )
    .get(sessionKey, provider) as SessionAccountAffinityRow | undefined;
  return row ? rowToAffinity(row) : null;
}

export function upsertSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  connectionId: string,
  now: number = Date.now()
): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO session_account_affinity
       (session_key, provider, connection_id, created_at, last_seen_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(session_key, provider) DO UPDATE SET
       connection_id = excluded.connection_id,
       last_seen_at = excluded.last_seen_at`
  ).run(sessionKey, provider, connectionId, now, now);
}

export function touchSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  now: number = Date.now()
): void {
  const db = getDbInstance();
  db.prepare(
    `UPDATE session_account_affinity
     SET last_seen_at = ?
     WHERE session_key = ? AND provider = ?`
  ).run(now, sessionKey, provider);
}

export function deleteSessionAccountAffinity(sessionKey: string, provider: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM session_account_affinity WHERE session_key = ? AND provider = ?").run(
    sessionKey,
    provider
  );
}

export function cleanupStaleSessionAccountAffinities(
  ttlMs: number = DEFAULT_TTL_MS,
  now: number = Date.now()
): number {
  const db = getDbInstance();
  const cutoff = now - ttlMs;
  const result = db
    .prepare("DELETE FROM session_account_affinity WHERE last_seen_at < ?")
    .run(cutoff);
  return Number(result.changes || 0);
}

export function startSessionAccountAffinityCleanup(): void {
  if (cleanupTimer) return;

  try {
    cleanupStaleSessionAccountAffinities();
  } catch (error) {
    console.warn("[SESSION_AFFINITY] Startup cleanup failed:", error);
  }

  cleanupTimer = setInterval(() => {
    try {
      cleanupStaleSessionAccountAffinities();
    } catch (error) {
      console.warn("[SESSION_AFFINITY] Periodic cleanup failed:", error);
    }
  }, CLEANUP_INTERVAL_MS);
  cleanupTimer.unref?.();
}

export function stopSessionAccountAffinityCleanupForTests(): void {
  if (!cleanupTimer) return;
  clearInterval(cleanupTimer);
  cleanupTimer = null;
}
