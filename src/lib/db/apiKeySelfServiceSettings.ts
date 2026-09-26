/**
 * db/apiKeySelfServiceSettings.ts — Per-API-key self-service settings (migration 194).
 *
 * One optional row per key on `api_key_self_service_settings`:
 *   - shared_quota_providers: JSON array of provider ids whose account quotas the
 *     key holder may see via GET /v1/me/status. NULL = all providers the key
 *     reaches (default, back-compat); [] = none.
 *   - anthropic_ratelimit_headers: "auto" | "forward" | "strip" (default "forward").
 *
 * A missing row (or a missing table on a DB that has not run migration 194 yet)
 * reads as the defaults. The getter is on the chat hot path (the API key policy
 * merges it into apiKeyInfo), so reads go through a small in-memory cache that
 * every write/delete invalidates. A short TTL bounds staleness across processes.
 *
 * @module db/apiKeySelfServiceSettings
 */

import { getDbInstance } from "./core";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const ANTHROPIC_RATE_LIMIT_HEADER_MODES = ["auto", "forward", "strip"] as const;

export type AnthropicRateLimitHeaderMode = (typeof ANTHROPIC_RATE_LIMIT_HEADER_MODES)[number];

export interface ApiKeySelfServiceSettings {
  /** null = all providers the key reaches (default); [] = none. */
  sharedQuotaProviders: string[] | null;
  anthropicRateLimitHeaders: AnthropicRateLimitHeaderMode;
}

export interface ApiKeySelfServiceSettingsUpdate {
  sharedQuotaProviders?: string[] | null;
  anthropicRateLimitHeaders?: AnthropicRateLimitHeaderMode;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABLE = "api_key_self_service_settings";

/** Cache TTL: writes invalidate immediately in-process; the TTL covers other processes. */
const CACHE_TTL_MS = 30_000;
const CACHE_MAX_ENTRIES = 1_000;

const cache = new Map<string, { value: ApiKeySelfServiceSettings; cachedAt: number }>();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function getDefaultApiKeySelfServiceSettings(): ApiKeySelfServiceSettings {
  return { sharedQuotaProviders: null, anthropicRateLimitHeaders: "forward" };
}

function cloneSettings(settings: ApiKeySelfServiceSettings): ApiKeySelfServiceSettings {
  return {
    sharedQuotaProviders:
      settings.sharedQuotaProviders === null ? null : [...settings.sharedQuotaProviders],
    anthropicRateLimitHeaders: settings.anthropicRateLimitHeaders,
  };
}

export function isAnthropicRateLimitHeaderMode(
  value: unknown
): value is AnthropicRateLimitHeaderMode {
  return (
    typeof value === "string" &&
    (ANTHROPIC_RATE_LIMIT_HEADER_MODES as readonly string[]).includes(value)
  );
}

/** Trim, drop empties, dedupe, sort. `null` (all providers) passes through unchanged. */
export function normalizeSharedQuotaProviders(value: unknown): string[] | null {
  if (value === null || value === undefined) return null;
  if (!Array.isArray(value)) return [];
  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim();
    if (trimmed) unique.add(trimmed);
  }
  return [...unique].sort();
}

/**
 * Parse the stored column. NULL = all providers. A corrupt value fails closed to
 * [] (share nothing) rather than widening visibility to every provider.
 */
function parseSharedQuotaProviders(raw: unknown): string[] | null {
  if (raw === null || raw === undefined) return null;
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null) return null;
    return Array.isArray(parsed) ? normalizeSharedQuotaProviders(parsed) : [];
  } catch {
    return [];
  }
}

function rowToSettings(row: unknown): ApiKeySelfServiceSettings {
  const r = asRecord(row);
  return {
    sharedQuotaProviders: parseSharedQuotaProviders(r.shared_quota_providers),
    anthropicRateLimitHeaders: isAnthropicRateLimitHeaderMode(r.anthropic_ratelimit_headers)
      ? r.anthropic_ratelimit_headers
      : "forward",
  };
}

function isMissingTableError(error: unknown): boolean {
  return (
    error instanceof Error && /no such table/i.test(error.message) && error.message.includes(TABLE)
  );
}

function cacheSet(apiKeyId: string, value: ApiKeySelfServiceSettings): void {
  if (cache.size >= CACHE_MAX_ENTRIES && !cache.has(apiKeyId)) {
    const oldest = cache.keys().next();
    if (!oldest.done) cache.delete(oldest.value);
  }
  cache.set(apiKeyId, { value: cloneSettings(value), cachedAt: Date.now() });
}

function readSettingsRow(apiKeyId: string): ApiKeySelfServiceSettings {
  try {
    const row = getDbInstance()
      .prepare(
        `SELECT shared_quota_providers, anthropic_ratelimit_headers
         FROM ${TABLE} WHERE api_key_id = ?`
      )
      .get(apiKeyId);
    return row ? rowToSettings(row) : getDefaultApiKeySelfServiceSettings();
  } catch (error) {
    if (isMissingTableError(error)) return getDefaultApiKeySelfServiceSettings();
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Settings for a key. Defaults when no row exists or the table is missing.
 * Returns a fresh copy; callers may mutate it freely.
 */
export function getApiKeySelfServiceSettings(apiKeyId: string): ApiKeySelfServiceSettings {
  if (!apiKeyId) return getDefaultApiKeySelfServiceSettings();

  const cached = cache.get(apiKeyId);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cloneSettings(cached.value);
  }

  const settings = readSettingsRow(apiKeyId);
  cacheSet(apiKeyId, settings);
  return cloneSettings(settings);
}

/**
 * Upsert. Omitted fields keep their current value; `sharedQuotaProviders: null`
 * resets to "all providers". Returns the resulting settings.
 */
export function updateApiKeySelfServiceSettings(
  apiKeyId: string,
  update: ApiKeySelfServiceSettingsUpdate
): ApiKeySelfServiceSettings {
  if (!apiKeyId) return getDefaultApiKeySelfServiceSettings();

  cache.delete(apiKeyId);
  const existing = readSettingsRow(apiKeyId);
  const next: ApiKeySelfServiceSettings = {
    sharedQuotaProviders:
      update.sharedQuotaProviders !== undefined
        ? normalizeSharedQuotaProviders(update.sharedQuotaProviders)
        : existing.sharedQuotaProviders,
    anthropicRateLimitHeaders: isAnthropicRateLimitHeaderMode(update.anthropicRateLimitHeaders)
      ? update.anthropicRateLimitHeaders
      : existing.anthropicRateLimitHeaders,
  };

  getDbInstance()
    .prepare(
      `INSERT INTO ${TABLE} (api_key_id, shared_quota_providers, anthropic_ratelimit_headers, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(api_key_id) DO UPDATE SET
         shared_quota_providers = excluded.shared_quota_providers,
         anthropic_ratelimit_headers = excluded.anthropic_ratelimit_headers,
         updated_at = excluded.updated_at`
    )
    .run(
      apiKeyId,
      next.sharedQuotaProviders === null ? null : JSON.stringify(next.sharedQuotaProviders),
      next.anthropicRateLimitHeaders
    );

  cache.delete(apiKeyId);
  return cloneSettings(next);
}

/** Remove a key's settings row (the key reverts to defaults). */
export function deleteApiKeySelfServiceSettings(apiKeyId: string): void {
  if (!apiKeyId) return;
  cache.delete(apiKeyId);
  try {
    getDbInstance().prepare(`DELETE FROM ${TABLE} WHERE api_key_id = ?`).run(apiKeyId);
  } catch (error) {
    if (!isMissingTableError(error)) throw error;
  } finally {
    cache.delete(apiKeyId);
  }
}

/** Drop every cached entry (tests, or after a bulk import / DB swap). */
export function clearApiKeySelfServiceSettingsCache(): void {
  cache.clear();
}
