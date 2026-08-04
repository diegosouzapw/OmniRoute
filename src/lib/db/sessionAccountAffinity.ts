import { createHash } from "crypto";

import { getDbInstance } from "./core";

type SessionAccountAffinityRecord = {
  connectionId: string;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
};

const NAMESPACE = "session_account_affinity";
const CLEANUP_INTERVAL_MS = 5 * 60_000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function normalizePositiveTtl(ttlMs: number | null | undefined): number {
  return Number.isFinite(ttlMs) && Number(ttlMs) > 0 ? Number(ttlMs) : 0;
}

function affinityKey(sessionKey: string, provider: string): string {
  const hash = createHash("sha256").update(`${provider}:${sessionKey}`).digest("hex");
  return `${provider}:${hash}`;
}

function isoFromMs(ms: number): string {
  return new Date(ms).toISOString();
}

function parseRecord(value: unknown): SessionAccountAffinityRecord | null {
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value) as Partial<SessionAccountAffinityRecord>;
    if (typeof parsed.connectionId !== "string" || parsed.connectionId.trim().length === 0) {
      return null;
    }
    if (typeof parsed.expiresAt !== "string" || Number.isNaN(Date.parse(parsed.expiresAt))) {
      return null;
    }
    return {
      connectionId: parsed.connectionId,
      createdAt:
        typeof parsed.createdAt === "string" && !Number.isNaN(Date.parse(parsed.createdAt))
          ? parsed.createdAt
          : parsed.expiresAt,
      lastUsedAt:
        typeof parsed.lastUsedAt === "string" && !Number.isNaN(Date.parse(parsed.lastUsedAt))
          ? parsed.lastUsedAt
          : parsed.expiresAt,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

function deleteAffinityKey(key: string): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(NAMESPACE, key);
}

export function getSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  ttlMs = 0,
  now: number = Date.now()
): SessionAccountAffinityRecord | null {
  if (!sessionKey || !provider || normalizePositiveTtl(ttlMs) <= 0) return null;

  const key = affinityKey(sessionKey, provider);
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value?: unknown } | undefined;
  const record = parseRecord(row?.value);
  if (!record) return null;

  if (Date.parse(record.expiresAt) <= now) {
    deleteAffinityKey(key);
    return null;
  }

  return record;
}

export function upsertSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  connectionId: string,
  now: number = Date.now(),
  ttlMs = 0
): void {
  const normalizedTtlMs = normalizePositiveTtl(ttlMs);
  if (!sessionKey || !provider || !connectionId || normalizedTtlMs <= 0) return;

  const key = affinityKey(sessionKey, provider);
  const existing = getSessionAccountAffinity(sessionKey, provider, normalizedTtlMs, now);
  const timestamp = isoFromMs(now);
  const record: SessionAccountAffinityRecord = {
    connectionId,
    createdAt: existing?.createdAt ?? timestamp,
    lastUsedAt: timestamp,
    expiresAt: isoFromMs(now + normalizedTtlMs),
  };

  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NAMESPACE, key, JSON.stringify(record));
}

export function touchSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  now: number = Date.now(),
  ttlMs = 0
): void {
  const normalizedTtlMs = normalizePositiveTtl(ttlMs);
  if (normalizedTtlMs <= 0) return;

  const existing = getSessionAccountAffinity(sessionKey, provider, normalizedTtlMs, now);
  if (!existing) return;

  upsertSessionAccountAffinity(sessionKey, provider, existing.connectionId, now, normalizedTtlMs);
}

export function deleteSessionAccountAffinity(sessionKey: string, provider: string): void {
  if (!sessionKey || !provider) return;
  deleteAffinityKey(affinityKey(sessionKey, provider));
}

/**
 * #6219 — Evict a session's pin ONLY when it currently points at `connectionId`.
 *
 * Used by the account-failover paths in chat.ts: when the pinned connection is
 * marked unavailable/exhausted, the sticky pin must be dropped so the next
 * request fails over to another account instead of re-pinning the dead one
 * (previously the session stayed pinned until process restart).
 *
 * Unlike `getSessionAccountAffinity`, this reads the stored record INDEPENDENT
 * of the TTL gate — a 2-arg `getSessionAccountAffinity(key, provider)` read
 * (ttl defaulting to 0) always returns null, which silently defeated the
 * connection-match guard on the earlier failover branches. The connection-match
 * guard is preserved here so a pin pointing at a different (still-healthy)
 * connection is never nuked. Returns true when a pin was evicted.
 */
export function evictSessionAccountAffinityForConnection(
  sessionKey: string,
  provider: string,
  connectionId: string
): boolean {
  if (!sessionKey || !provider || !connectionId) return false;

  const key = affinityKey(sessionKey, provider);
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value?: unknown } | undefined;
  const record = parseRecord(row?.value);
  if (!record || record.connectionId !== connectionId) return false;

  deleteAffinityKey(key);
  return true;
}

export function cleanupStaleSessionAccountAffinities(
  _ttlMs: number = 30 * 60 * 1000,
  now: number = Date.now()
): number {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key?: unknown; value?: unknown }>;
  let deleted = 0;

  const tx = db.transaction(() => {
    for (const row of rows) {
      if (typeof row.key !== "string") continue;
      const record = parseRecord(row.value);
      if (!record || Date.parse(record.expiresAt) <= now) {
        db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, row.key);
        deleted++;
      }
    }
  });

  tx();
  return deleted;
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
  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) cleanupTimer.unref?.();
}

export function stopSessionAccountAffinityCleanupForTests(): void {
  if (!cleanupTimer) return;
  clearInterval(cleanupTimer);
  cleanupTimer = null;
}
