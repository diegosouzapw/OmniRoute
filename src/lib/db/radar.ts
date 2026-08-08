/**
 * radar.ts — Radar client local DB module
 *
 * Provides local cache + settings storage for the OmniRoute Radar client.
 * Nothing here talks to the network (that's the sync layer).
 *
 * Tables (migration 136):
 *   - radar_feed_cache: single-row signed feed cache
 *   - radar_settings:   opt-in + encrypted supporter key
 *
 * Tables (migration 142):
 *   - radar_referrals_cache: single-row signed referrals feed cache
 *     (`GET /v1/referrals/latest` — a separate, always-current artifact from
 *     the catalog feed, see `src/lib/radar/referralsSync.ts`).
 *
 * The supporter key is encrypted at rest with AES-256-GCM using the same
 * `encrypt()`/`decrypt()` helpers from `./encryption.ts` that protect
 * provider connection credentials.
 */

import { getDbInstance } from "./core";
import { encrypt, decrypt } from "./encryption";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RadarCache {
  version: string;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt: string;
}

export interface RadarSettings {
  optIn: boolean;
  supporterKey: string | null;
  updatedAt: string;
}

export interface RadarReferralsCache {
  generatedAt: string;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt: string;
}

// ---------------------------------------------------------------------------
// radar_feed_cache
// ---------------------------------------------------------------------------

/**
 * Read the cached Radar feed. Returns null when no feed has been cached yet.
 */
export function getRadarCache(): RadarCache | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT version, tier, payload, signature, fetched_at AS fetchedAt " +
        "FROM radar_feed_cache WHERE id = 1"
    )
    .get() as RadarCache | undefined;

  return row ?? null;
}

/**
 * Upsert the Radar feed cache (single row).  Replaces any existing entry.
 * If `fetchedAt` is omitted, the current ISO timestamp is used.
 */
export function setRadarCache(entry: {
  version: string;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt?: string;
}): void {
  const db = getDbInstance();
  const fetchedAt = entry.fetchedAt ?? new Date().toISOString();

  db.prepare(
    `INSERT INTO radar_feed_cache (id, version, tier, payload, signature, fetched_at)
     VALUES (1, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       version    = excluded.version,
       tier       = excluded.tier,
       payload    = excluded.payload,
       signature  = excluded.signature,
       fetched_at = excluded.fetched_at`
  ).run(entry.version, entry.tier, entry.payload, entry.signature, fetchedAt);
}

// ---------------------------------------------------------------------------
// radar_settings
// ---------------------------------------------------------------------------

/**
 * Read the Radar settings. The supporter key is decrypted on read.
 * The settings row is seeded by migration 134, so this always returns a row.
 */
export function getRadarSettings(): RadarSettings {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT opt_in, supporter_key_encrypted, updated_at FROM radar_settings WHERE id = 1")
    .get() as { opt_in: number; supporter_key_encrypted: string | null; updated_at: string };

  return {
    optIn: row.opt_in === 1,
    supporterKey: decrypt(row.supporter_key_encrypted) ?? null,
    updatedAt: row.updated_at,
  };
}

/**
 * Set the Radar opt-in state.
 */
export function setRadarOptIn(optIn: boolean): void {
  const db = getDbInstance();
  db.prepare("UPDATE radar_settings SET opt_in = ?, updated_at = datetime('now') WHERE id = 1").run(
    optIn ? 1 : 0
  );
}

/**
 * Set (or clear) the Radar supporter key.  The key is encrypted at rest
 * using the same AES-256-GCM mechanism as provider credentials.
 * Pass `null` to clear.
 */
export function setRadarKey(key: string | null): void {
  const db = getDbInstance();
  const encrypted = key !== null ? encrypt(key) : null;
  const updateKey = db.prepare(
    "UPDATE radar_settings SET supporter_key_encrypted = ?, updated_at = datetime('now') WHERE id = 1"
  );
  const clearCatalogCache = db.prepare("DELETE FROM radar_feed_cache WHERE id = 1");
  const clearReferralsCache = db.prepare("DELETE FROM radar_referrals_cache WHERE id = 1");

  db.transaction(() => {
    updateKey.run(encrypted);
    // Both signed feeds are entitlement-sensitive. Clearing their cached
    // variants forces the next sync/read to resolve the new key server-side
    // instead of serving data fetched under the previous entitlement.
    clearCatalogCache.run();
    clearReferralsCache.run();
  })();
}

// ---------------------------------------------------------------------------
// radar_referrals_cache
// ---------------------------------------------------------------------------

/**
 * Read the cached Radar referrals feed (`GET /v1/referrals/latest`).
 * Returns null when no referrals feed has been cached yet — separate from,
 * and never falling back to, the catalog's `radar_feed_cache`.
 */
export function getRadarReferralsCache(): RadarReferralsCache | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT generated_at AS generatedAt, tier, payload, signature, fetched_at AS fetchedAt " +
        "FROM radar_referrals_cache WHERE id = 1"
    )
    .get() as RadarReferralsCache | undefined;

  return row ?? null;
}

/**
 * Upsert the Radar referrals feed cache (single row). Replaces any existing
 * entry. If `fetchedAt` is omitted, the current ISO timestamp is used.
 */
export function setRadarReferralsCache(entry: {
  generatedAt: string;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt?: string;
}): void {
  const db = getDbInstance();
  const fetchedAt = entry.fetchedAt ?? new Date().toISOString();

  db.prepare(
    `INSERT INTO radar_referrals_cache (id, generated_at, tier, payload, signature, fetched_at)
     VALUES (1, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       generated_at = excluded.generated_at,
       tier         = excluded.tier,
       payload      = excluded.payload,
       signature    = excluded.signature,
       fetched_at   = excluded.fetched_at`
  ).run(entry.generatedAt, entry.tier, entry.payload, entry.signature, fetchedAt);
}
