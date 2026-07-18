/**
 * openrouterQuotaFetcher.ts — OpenRouter Key/Credits Quota Fetcher (#6842)
 *
 * Implements QuotaFetcher for the OpenRouter provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * OpenRouter exposes two official, documented monitoring endpoints
 * (https://openrouter.ai/docs/api/reference/limits):
 *
 *   GET https://openrouter.ai/api/v1/key
 *     -> { data: { limit, limit_remaining, limit_reset, usage, usage_daily,
 *                  usage_weekly, usage_monthly, is_free_tier, byok_usage,
 *                  include_byok_in_limit } }
 *     `limit`/`limit_remaining` are per-key USD credit caps — null means
 *     unlimited/never set. `limit_reset` is null when the cap never resets.
 *
 *   GET https://openrouter.ai/api/v1/credits
 *     -> { data: { total_credits, total_usage } }
 *     Account-level totals; upstream caches this endpoint for ~60s already.
 *
 * We fetch both (credits is a cheap second call, same auth) and merge into one
 * QuotaInfo. Graceful "unknown" on any fetch failure — quota tracking must
 * never block routing (mirrors deepseekQuotaFetcher.ts / bailianQuotaFetcher.ts).
 *
 * Cache: in-memory TTL (45s, inside the 30-60s window OpenRouter's own docs
 * recommend) keyed by connectionId, so combo preflight/monitor polling doesn't
 * hammer the upstream on every request.
 *
 * Registration: call registerOpenrouterQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import {
  getFreeWindowStatus,
  isFreeVariantModel,
  resolveAccountKey,
  type FreeWindowStatus,
} from "./openrouterFreeWindow.ts";

const OPENROUTER_CONFIG = {
  baseUrl: "https://openrouter.ai/api/v1",
  keyPath: "/key",
  creditsPath: "/credits",
};

// Cache TTL — inside OpenRouter's documented 30-60s window.
const CACHE_TTL_MS = 45_000;

export interface OpenrouterQuota extends QuotaInfo {
  limit: number | null;
  limitRemaining: number | null;
  isFreeTier: boolean;
  usage: number;
  usageDaily: number;
  usageWeekly: number;
  usageMonthly: number;
  byokUsage: number | null;
  includeByokInLimit: boolean;
  totalCredits: number | null;
  totalUsage: number | null;
  creditBalance: number | null;
}

interface CacheEntry {
  quota: OpenrouterQuota;
  fetchedAt: number;
}

const quotaCache = new Map<string, CacheEntry>();

const _cacheCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of quotaCache) {
    if (now - entry.fetchedAt > CACHE_TTL_MS * 5) {
      quotaCache.delete(key);
    }
  }
}, 5 * 60_000);

if (typeof _cacheCleanup === "object" && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toNullableNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toFiniteNumber(value: unknown, fallback = 0): number {
  const n = toNullableNumber(value);
  return n === null ? fallback : n;
}

function toIsoOrNull(value: unknown): string | null {
  const n = toNullableNumber(value);
  if (n === null) return null;
  const date = new Date(n < 1e12 ? n * 1000 : n);
  if (Number.isNaN(date.getTime()) || date.getTime() <= 0) return null;
  return date.toISOString();
}

// ─── Response Parsers ────────────────────────────────────────────────────────

interface OpenrouterKeyFields {
  limit: number | null;
  limitRemaining: number | null;
  limitReset: string | null;
  isFreeTier: boolean;
  usage: number;
  usageDaily: number;
  usageWeekly: number;
  usageMonthly: number;
  byokUsage: number | null;
  includeByokInLimit: boolean;
}

/**
 * Parse the `GET /api/v1/key` response body. Returns null when the payload
 * doesn't carry a recognizable `data` object (e.g. an unexpected shape).
 */
export function parseOpenrouterKeyResponse(data: unknown): OpenrouterKeyFields | null {
  const outer = toRecord(data);
  const inner = "data" in outer ? toRecord(outer.data) : outer;
  if (Object.keys(inner).length === 0) return null;

  return {
    limit: toNullableNumber(inner.limit),
    limitRemaining: toNullableNumber(inner.limit_remaining),
    limitReset: toIsoOrNull(inner.limit_reset),
    isFreeTier: inner.is_free_tier === true,
    usage: toFiniteNumber(inner.usage, 0),
    usageDaily: toFiniteNumber(inner.usage_daily, 0),
    usageWeekly: toFiniteNumber(inner.usage_weekly, 0),
    usageMonthly: toFiniteNumber(inner.usage_monthly, 0),
    byokUsage: toNullableNumber(inner.byok_usage),
    includeByokInLimit: inner.include_byok_in_limit === true,
  };
}

interface OpenrouterCreditsFields {
  totalCredits: number | null;
  totalUsage: number | null;
}

/**
 * Parse the `GET /api/v1/credits` response body. Returns nulls (not a full
 * null-object) when the payload is missing — credits is a best-effort
 * secondary signal, the key endpoint alone is enough to build a quota.
 */
export function parseOpenrouterCreditsResponse(data: unknown): OpenrouterCreditsFields {
  const outer = toRecord(data);
  const inner = "data" in outer ? toRecord(outer.data) : outer;
  return {
    totalCredits: toNullableNumber(inner.total_credits),
    totalUsage: toNullableNumber(inner.total_usage),
  };
}

function buildQuotaFromParts(
  key: OpenrouterKeyFields,
  credits: OpenrouterCreditsFields
): OpenrouterQuota {
  const hasCap = key.limit !== null && key.limitRemaining !== null;
  const limitReached = hasCap && (key.limitRemaining as number) <= 0;
  const percentUsed = hasCap && key.limit! > 0 ? 1 - key.limitRemaining! / key.limit! : 0;
  const creditBalance =
    key.limitRemaining !== null
      ? key.limitRemaining
      : credits.totalCredits !== null && credits.totalUsage !== null
        ? credits.totalCredits - credits.totalUsage
        : null;

  return {
    used: percentUsed * 100,
    total: 100,
    percentUsed,
    resetAt: key.limitReset,
    limitReached,
    limit: key.limit,
    limitRemaining: key.limitRemaining,
    isFreeTier: key.isFreeTier,
    usage: key.usage,
    usageDaily: key.usageDaily,
    usageWeekly: key.usageWeekly,
    usageMonthly: key.usageMonthly,
    byokUsage: key.byokUsage,
    includeByokInLimit: key.includeByokInLimit,
    totalCredits: credits.totalCredits,
    totalUsage: credits.totalUsage,
    creditBalance,
  };
}

// ─── Free-Window Preflight (#6842) ───────────────────────────────────────────

/**
 * Build a `limitReached` QuotaInfo from the local `:free`-window daily
 * counter — no upstream I/O, so this is safe to call on every preflight
 * without adding latency or spending a request.
 */
function buildFreeWindowExhaustedQuota(status: FreeWindowStatus): QuotaInfo {
  const percentUsed = status.dailyLimit > 0 ? status.dailyUsed / status.dailyLimit : 1;
  return {
    used: status.dailyUsed,
    total: status.dailyLimit,
    percentUsed: Math.min(1, Math.max(0, percentUsed)),
    resetAt: status.dailyResetAt,
    limitReached: true,
  };
}

/**
 * When the requested model is a `:free` variant and the locally-tracked
 * daily window is already exhausted, short-circuit before any network call:
 * the upstream `/key` + `/credits` fetch below only reports USD spend, never
 * the `:free` request count, so it cannot see this exhaustion on its own —
 * and dispatching the chat request itself would just spend a guaranteed 429.
 */
function checkFreeWindowExhausted(
  connectionId: string,
  connection: Record<string, unknown> | undefined,
  requestedModel: unknown
): QuotaInfo | null {
  if (!isFreeVariantModel(typeof requestedModel === "string" ? requestedModel : null)) {
    return null;
  }
  const accountKey = resolveAccountKey(connectionId, connection);
  const status = getFreeWindowStatus(accountKey);
  return status.dailyRemaining <= 0 ? buildFreeWindowExhaustedQuota(status) : null;
}

// ─── Core Fetcher ────────────────────────────────────────────────────────────

async function fetchJson(
  url: string,
  apiKey: string
): Promise<{ status: number; data: unknown } | null> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { status: response.status, data: null };
    const data = await response.json();
    return { status: response.status, data };
  } catch {
    return null;
  }
}

/**
 * Fetch current quota for an OpenRouter connection.
 * Returns quota info based on the /key + /credits API responses.
 *
 * @param connectionId - Connection ID from the DB (used for cache keying)
 * @param connection - Optional connection object with apiKey
 * @returns OpenrouterQuota or null if fetch fails / no credentials
 */
export async function fetchOpenrouterQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const apiKey =
    typeof connection?.apiKey === "string" && connection.apiKey.trim().length > 0
      ? connection.apiKey
      : null;
  if (!apiKey) return null;

  try {
    await throttleQuotaFetch();

    const keyUrl = `${OPENROUTER_CONFIG.baseUrl}${OPENROUTER_CONFIG.keyPath}`;
    const keyResult = await fetchJson(keyUrl, apiKey);

    // 401/403 on the key endpoint: token invalid — remove from cache, fail open.
    if (!keyResult || keyResult.status === 401 || keyResult.status === 403) {
      quotaCache.delete(connectionId);
      return null;
    }
    if (keyResult.status !== 200) return null;

    const keyFields = parseOpenrouterKeyResponse(keyResult.data);
    if (!keyFields) return null;

    const creditsUrl = `${OPENROUTER_CONFIG.baseUrl}${OPENROUTER_CONFIG.creditsPath}`;
    const creditsResult = await fetchJson(creditsUrl, apiKey);
    const creditsFields =
      creditsResult && creditsResult.status === 200
        ? parseOpenrouterCreditsResponse(creditsResult.data)
        : { totalCredits: null, totalUsage: null };

    const quota = buildQuotaFromParts(keyFields, creditsFields);
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    // Network error, timeout, etc. — fail open (graceful "unknown").
    return null;
  }
}

// ─── Invalidation ────────────────────────────────────────────────────────────

export function invalidateOpenrouterQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * The fetcher actually wired into quotaPreflight.ts / quotaMonitor.ts (#6842
 * follow-up). Kept as a thin wrapper — rather than inlined into
 * fetchOpenrouterQuota() above — so the /key + /credits fetcher itself stays
 * a plain, independently-testable function and the free-window short-circuit
 * doesn't add branching to its already-tight complexity budget.
 */
export async function fetchOpenrouterQuotaWithFreeWindowPreflight(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const freeWindowExhausted = checkFreeWindowExhausted(
    connectionId,
    connection,
    connection?.requestedModel
  );
  return freeWindowExhausted ?? fetchOpenrouterQuota(connectionId, connection);
}

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * Register the OpenRouter quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts or app entry point).
 */
export function registerOpenrouterQuotaFetcher(): void {
  registerQuotaFetcher("openrouter", fetchOpenrouterQuotaWithFreeWindowPreflight);
  registerMonitorFetcher("openrouter", fetchOpenrouterQuotaWithFreeWindowPreflight);
}
