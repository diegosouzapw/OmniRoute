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
 * Tables (migration 153):
 *   - radar_local_model_state: operator-owned display/enabled overrides and
 *     deletion tombstones, keyed by provider + model ID.
 *
 * Tables (migration 144):
 *   - radar_offers_cache: single-row signed live offers feed cache.
 *
 * Tables (migration 145):
 *   - radar_intel_cache: single-row signed live Intel feed cache plus a
 *     one-way supporter identity used for local recognition.
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
  /** Date the feed's data was built, from the feed itself. Null when unknown. */
  generatedAt: string | null;
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

export interface RadarOffersCache {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  fetchedAt: string;
}

export interface RadarIntelCache {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  supporterIdentity: string;
  fetchedAt: string;
}

export interface RadarLocalModelState {
  provider: string;
  modelId: string;
  displayName: string | null;
  enabled: boolean | null;
  tombstoned: boolean;
  updatedAt: string;
}

export interface RadarLocalModelOverridePatch {
  displayName?: string | null;
  enabled?: boolean | null;
}

export interface RadarLocalMergeState {
  localOverrides: Map<string, { displayName?: string; enabled?: boolean }>;
  tombstones: Set<string>;
}

interface RadarLocalModelStateRow {
  provider: string;
  model_id: string;
  display_name: string | null;
  enabled: number | null;
  tombstoned: number;
  updated_at: string;
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
      "SELECT version, generated_at AS generatedAt, tier, payload, signature, " +
        "fetched_at AS fetchedAt FROM radar_feed_cache WHERE id = 1"
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
  generatedAt?: string | null;
  tier: string;
  payload: string;
  signature: string;
  fetchedAt?: string;
}): void {
  const db = getDbInstance();
  const fetchedAt = entry.fetchedAt ?? new Date().toISOString();

  db.prepare(
    `INSERT INTO radar_feed_cache (id, version, generated_at, tier, payload, signature, fetched_at)
     VALUES (1, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       version      = excluded.version,
       generated_at = excluded.generated_at,
       tier         = excluded.tier,
       payload      = excluded.payload,
       signature    = excluded.signature,
       fetched_at   = excluded.fetched_at`
  ).run(
    entry.version,
    entry.generatedAt ?? null,
    entry.tier,
    entry.payload,
    entry.signature,
    fetchedAt
  );
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
  const clearOffersCache = db.prepare("DELETE FROM radar_offers_cache WHERE id = 1");
  const clearIntelCache = db.prepare("DELETE FROM radar_intel_cache WHERE id = 1");

  db.transaction(() => {
    updateKey.run(encrypted);
    // All signed feeds are entitlement-sensitive. Clearing their cached
    // variants forces the next sync/read to resolve the new key server-side
    // instead of serving data fetched under the previous entitlement.
    clearCatalogCache.run();
    clearReferralsCache.run();
    clearOffersCache.run();
    clearIntelCache.run();
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

// ---------------------------------------------------------------------------
// radar_offers_cache
// ---------------------------------------------------------------------------

export function getRadarOffersCache(): RadarOffersCache | null {
  const row = getDbInstance()
    .prepare(
      "SELECT version, tier, payload, signature, fetched_at AS fetchedAt " +
        "FROM radar_offers_cache WHERE id = 1"
    )
    .get() as RadarOffersCache | undefined;

  return row ?? null;
}

export function setRadarOffersCache(entry: {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  fetchedAt?: string;
}): void {
  const fetchedAt = entry.fetchedAt ?? new Date().toISOString();
  getDbInstance()
    .prepare(
      `INSERT INTO radar_offers_cache (id, version, tier, payload, signature, fetched_at)
       VALUES (1, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         version = excluded.version,
         tier = excluded.tier,
         payload = excluded.payload,
         signature = excluded.signature,
         fetched_at = excluded.fetched_at`
    )
    .run(entry.version, entry.tier, entry.payload, entry.signature, fetchedAt);
}

// ---------------------------------------------------------------------------
// radar_intel_cache
// ---------------------------------------------------------------------------

export function getRadarIntelCache(): RadarIntelCache | null {
  const row = getDbInstance()
    .prepare(
      "SELECT version, tier, payload, signature, supporter_identity AS supporterIdentity, " +
        "fetched_at AS fetchedAt FROM radar_intel_cache WHERE id = 1"
    )
    .get() as RadarIntelCache | undefined;
  return row ?? null;
}

export function setRadarIntelCache(entry: {
  version: string;
  tier: "live";
  payload: string;
  signature: string;
  supporterIdentity: string;
  fetchedAt?: string;
}): void {
  const fetchedAt = entry.fetchedAt ?? new Date().toISOString();
  getDbInstance()
    .prepare(
      `INSERT INTO radar_intel_cache
         (id, version, tier, payload, signature, supporter_identity, fetched_at)
       VALUES (1, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         version = excluded.version,
         tier = excluded.tier,
         payload = excluded.payload,
         signature = excluded.signature,
         supporter_identity = excluded.supporter_identity,
         fetched_at = excluded.fetched_at`
    )
    .run(
      entry.version,
      entry.tier,
      entry.payload,
      entry.signature,
      entry.supporterIdentity,
      fetchedAt
    );
}

// ---------------------------------------------------------------------------
// radar_local_model_state
// ---------------------------------------------------------------------------

const RADAR_PROVIDER_PATTERN = /^[a-z0-9][a-z0-9._-]{0,99}$/i;
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/;

function normalizeRadarIdentity(
  provider: unknown,
  modelId: unknown
): { provider: string; modelId: string } | null {
  const normalizedProvider = typeof provider === "string" ? provider.trim() : "";
  const normalizedModelId = typeof modelId === "string" ? modelId.trim() : "";
  if (!RADAR_PROVIDER_PATTERN.test(normalizedProvider)) return null;
  if (
    normalizedModelId.length < 1 ||
    normalizedModelId.length > 200 ||
    CONTROL_CHARACTER_PATTERN.test(normalizedModelId)
  ) {
    return null;
  }
  return { provider: normalizedProvider, modelId: normalizedModelId };
}

function normalizeDisplayName(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  if (
    normalized.length < 1 ||
    normalized.length > 160 ||
    CONTROL_CHARACTER_PATTERN.test(normalized)
  ) {
    return undefined;
  }
  return normalized;
}

function rowToRadarLocalModelState(row: RadarLocalModelStateRow): RadarLocalModelState {
  return {
    provider: row.provider,
    modelId: row.model_id,
    displayName: row.display_name,
    enabled: row.enabled === null ? null : row.enabled === 1,
    tombstoned: row.tombstoned === 1,
    updatedAt: row.updated_at,
  };
}

function readRadarLocalModelStateRow(
  provider: string,
  modelId: string
): RadarLocalModelStateRow | null {
  return (
    (getDbInstance()
      .prepare(
        `SELECT provider, model_id, display_name, enabled, tombstoned, updated_at
         FROM radar_local_model_state WHERE provider = ? AND model_id = ?`
      )
      .get(provider, modelId) as RadarLocalModelStateRow | undefined) ?? null
  );
}

function persistRadarLocalModelState(input: {
  provider: string;
  modelId: string;
  displayName: string | null;
  enabled: boolean | null;
  tombstoned: boolean;
}): void {
  const db = getDbInstance();
  if (input.displayName === null && input.enabled === null && !input.tombstoned) {
    db.prepare("DELETE FROM radar_local_model_state WHERE provider = ? AND model_id = ?").run(
      input.provider,
      input.modelId
    );
    return;
  }

  db.prepare(
    `INSERT INTO radar_local_model_state
       (provider, model_id, display_name, enabled, tombstoned, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(provider, model_id) DO UPDATE SET
       display_name = excluded.display_name,
       enabled = excluded.enabled,
       tombstoned = excluded.tombstoned,
       updated_at = excluded.updated_at`
  ).run(
    input.provider,
    input.modelId,
    input.displayName,
    input.enabled === null ? null : input.enabled ? 1 : 0,
    input.tombstoned ? 1 : 0
  );
}

/** List every persisted override/tombstone for UI editing and restore controls. */
export function listRadarLocalModelState(): RadarLocalModelState[] {
  const rows = getDbInstance()
    .prepare(
      `SELECT provider, model_id, display_name, enabled, tombstoned, updated_at
       FROM radar_local_model_state ORDER BY provider, model_id`
    )
    .all() as RadarLocalModelStateRow[];
  return rows.map(rowToRadarLocalModelState);
}

/**
 * Merge a validated partial override into the existing row. `null` clears a
 * field; `undefined` preserves it. Tombstone state is never changed here.
 */
export function setRadarLocalModelOverride(
  provider: unknown,
  modelId: unknown,
  patch: RadarLocalModelOverridePatch
): boolean {
  const identity = normalizeRadarIdentity(provider, modelId);
  if (!identity || !patch || typeof patch !== "object") return false;
  const keys = Object.keys(patch);
  if (
    keys.length === 0 ||
    keys.some((key) => key !== "displayName" && key !== "enabled") ||
    (Object.hasOwn(patch, "enabled") &&
      patch.enabled !== null &&
      typeof patch.enabled !== "boolean")
  ) {
    return false;
  }

  const normalizedDisplayName = normalizeDisplayName(patch.displayName);
  if (Object.hasOwn(patch, "displayName") && normalizedDisplayName === undefined) return false;

  const db = getDbInstance();
  db.transaction(() => {
    const current = readRadarLocalModelStateRow(identity.provider, identity.modelId);
    persistRadarLocalModelState({
      ...identity,
      displayName: Object.hasOwn(patch, "displayName")
        ? (normalizedDisplayName ?? null)
        : (current?.display_name ?? null),
      enabled: Object.hasOwn(patch, "enabled")
        ? (patch.enabled ?? null)
        : current?.enabled === null || current?.enabled === undefined
          ? null
          : current.enabled === 1,
      tombstoned: current?.tombstoned === 1,
    });
  })();
  return true;
}

/** Clear both editable fields while preserving an independent tombstone. */
export function clearRadarLocalModelOverride(provider: unknown, modelId: unknown): boolean {
  const identity = normalizeRadarIdentity(provider, modelId);
  if (!identity) return false;

  const db = getDbInstance();
  db.transaction(() => {
    const current = readRadarLocalModelStateRow(identity.provider, identity.modelId);
    persistRadarLocalModelState({
      ...identity,
      displayName: null,
      enabled: null,
      tombstoned: current?.tombstoned === 1,
    });
  })();
  return true;
}

/** Hide or restore one model without modifying its editable local fields. */
export function setRadarModelTombstone(
  provider: unknown,
  modelId: unknown,
  tombstoned: boolean
): boolean {
  const identity = normalizeRadarIdentity(provider, modelId);
  if (!identity || typeof tombstoned !== "boolean") return false;

  const db = getDbInstance();
  db.transaction(() => {
    const current = readRadarLocalModelStateRow(identity.provider, identity.modelId);
    persistRadarLocalModelState({
      ...identity,
      displayName: current?.display_name ?? null,
      enabled:
        current?.enabled === null || current?.enabled === undefined ? null : current.enabled === 1,
      tombstoned,
    });
  })();
  return true;
}

/** Convert persisted rows into the exact read-time merge structures. */
export function getRadarLocalMergeState(): RadarLocalMergeState {
  const localOverrides = new Map<string, { displayName?: string; enabled?: boolean }>();
  const tombstones = new Set<string>();

  for (const state of listRadarLocalModelState()) {
    const key = `${state.provider}:${state.modelId}`;
    const override: { displayName?: string; enabled?: boolean } = {};
    if (state.displayName !== null) override.displayName = state.displayName;
    if (state.enabled !== null) override.enabled = state.enabled;
    if (Object.keys(override).length > 0) localOverrides.set(key, override);
    if (state.tombstoned) tombstones.add(key);
  }

  return { localOverrides, tombstones };
}
