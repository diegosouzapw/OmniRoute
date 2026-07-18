/**
 * openrouterFreeWindow.ts — OpenRouter `:free`-variant local window tracker (#6842)
 *
 * OpenRouter's official monitoring API (`/api/v1/key`, `/api/v1/credits`) reports
 * USD spend, never request counts — so the `:free`-model per-account request
 * windows (docs/reference/FREE_TIERS.md) cannot be read from those endpoints.
 * This module tracks them locally instead:
 *
 *   - A UTC-day counter: 50 requests/day at $0 all-time purchased, 1000/day
 *     once $10+ has been purchased (operator-overridable via setPurchasedTier).
 *   - A 20 RPM rolling window (true rolling — timestamps pruned to the last 60s,
 *     not a fixed-bucket reset).
 *
 * Bucketed by ACCOUNT, not by connection/key — multiple OmniRoute connections
 * that share one upstream OpenRouter account must share one window. OmniRoute's
 * `provider_connections` are per-key, so callers resolve an account bucket key
 * via `resolveAccountKey()`: an explicit `providerSpecificData.openrouterAccountKey`
 * groups keys under one account; otherwise each connection gets its own bucket
 * (safe default — never worse than no tracking).
 *
 * State is in-memory only (module-level Map, not persisted). This is a
 * deliberate MVP scope: local counting is inherently best-effort (drifts on
 * process restart or multi-instance deployments sharing one OpenRouter
 * account) and is corrected from upstream `X-RateLimit-*` response headers on
 * every 429, which is authoritative. See the plan's "Risks" section — SQLite
 * persistence is a possible follow-up, not required for correctness here.
 */

const RPM_WINDOW_MS = 60_000;
const RPM_LIMIT = 20;
const DAILY_LIMIT_BASE = 50;
const DAILY_LIMIT_PURCHASED = 1000;

interface AccountWindowState {
  dayKey: string;
  dayCount: number;
  purchasedAtLeast10: boolean;
  requestTimestamps: number[];
  serverDailyLimit: number | null;
  serverDailyRemaining: number | null;
  serverResetAtMs: number | null;
}

export interface FreeWindowStatus {
  dailyLimit: number;
  dailyUsed: number;
  dailyRemaining: number;
  dailyResetAt: string;
  rpmLimit: number;
  rpmUsed: number;
  rpmRemaining: number;
}

const accountWindows = new Map<string, AccountWindowState>();

function utcDayKey(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

function nextUtcMidnightIso(now: number): string {
  const date = new Date(now);
  const next = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
    0,
    0,
    0,
    0
  );
  return new Date(next).toISOString();
}

/**
 * Whether a model id is an OpenRouter `:free`-variant (e.g.
 * `x-ai/grok-4-fast:free`). Shared by the dispatch-time record/correct hooks
 * (`open-sse/executors/base.ts`) and the quota-preflight enforcement hook
 * (`open-sse/services/openrouterQuotaFetcher.ts`) so both sides agree on the
 * same definition of "free variant."
 */
export function isFreeVariantModel(model: string | null | undefined): boolean {
  return typeof model === "string" && model.endsWith(":free");
}

/**
 * Resolve the shared account bucket key for a connection. Operators group
 * multiple keys under one OpenRouter account via `providerSpecificData.
 * openrouterAccountKey`; without it, each connection is its own bucket.
 */
export function resolveAccountKey(
  connectionId: string,
  connection?: Record<string, unknown> | null
): string {
  const psd = connection?.providerSpecificData as Record<string, unknown> | undefined;
  const explicit = typeof psd?.openrouterAccountKey === "string" ? psd.openrouterAccountKey : "";
  return explicit.trim().length > 0 ? `acct:${explicit.trim()}` : `conn:${connectionId}`;
}

function getOrInitState(accountKey: string, now: number): AccountWindowState {
  const dayKey = utcDayKey(now);
  const existing = accountWindows.get(accountKey);
  if (existing && existing.dayKey === dayKey) return existing;

  const fresh: AccountWindowState = {
    dayKey,
    dayCount: 0,
    purchasedAtLeast10: existing?.purchasedAtLeast10 ?? false,
    requestTimestamps: [],
    serverDailyLimit: null,
    serverDailyRemaining: null,
    serverResetAtMs: null,
  };
  accountWindows.set(accountKey, fresh);
  return fresh;
}

function pruneRpmWindow(state: AccountWindowState, now: number): void {
  const cutoff = now - RPM_WINDOW_MS;
  state.requestTimestamps = state.requestTimestamps.filter((ts) => ts > cutoff);
}

/**
 * Operator override: declare whether $10+ has been purchased all-time on this
 * account, unlocking the 1000/day tier instead of the 50/day default.
 */
export function setPurchasedTier(accountKey: string, purchasedAtLeast10: boolean): void {
  const state = getOrInitState(accountKey, Date.now());
  state.purchasedAtLeast10 = purchasedAtLeast10;
}

/**
 * Record a `:free`-variant request attempt against the account bucket.
 * Failed attempts count toward the daily cap too (per OpenRouter's own
 * accounting — a rejected request still consumed a request slot).
 */
export function recordFreeWindowAttempt(accountKey: string, now: number = Date.now()): void {
  const state = getOrInitState(accountKey, now);
  pruneRpmWindow(state, now);
  state.dayCount += 1;
  state.requestTimestamps.push(now);
}

function getHeader(headers: Headers | Record<string, string>, name: string): string | null {
  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name);
  }
  const record = headers as Record<string, string>;
  return record[name] ?? record[name.toLowerCase()] ?? null;
}

function parseResetMsFromHeader(reset: string | null): number | null {
  if (reset === null) return null;
  const resetNum = Number(reset);
  if (!Number.isFinite(resetNum)) return null;
  return resetNum > 10_000_000_000 ? resetNum : resetNum * 1000;
}

function parseRetryAfterMs(retryAfter: string | null, now: number): number | null {
  if (retryAfter === null) return null;
  const seconds = Number(retryAfter);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  return now + seconds * 1000;
}

function resolveResetMs(
  reset: string | null,
  retryAfter: string | null,
  now: number
): number | null {
  const headerResetMs = parseResetMsFromHeader(reset);
  const retryAfterMs = parseRetryAfterMs(retryAfter, now);
  if (retryAfterMs === null) return headerResetMs;
  return headerResetMs === null ? retryAfterMs : Math.max(headerResetMs, retryAfterMs);
}

/**
 * Correct local counters from OpenRouter's authoritative rate-limit headers,
 * present on 429 responses per OpenRouter's docs. `Retry-After` (seconds)
 * is folded into the reset timestamp when present and later than the
 * `X-RateLimit-Reset` value.
 */
export function correctFromRateLimitHeaders(
  accountKey: string,
  headers: Headers | Record<string, string>,
  now: number = Date.now()
): void {
  const state = getOrInitState(accountKey, now);
  const limit = getHeader(headers, "x-ratelimit-limit");
  const remaining = getHeader(headers, "x-ratelimit-remaining");

  if (limit !== null && Number.isFinite(Number(limit))) {
    state.serverDailyLimit = Number(limit);
  }
  if (remaining !== null && Number.isFinite(Number(remaining))) {
    state.serverDailyRemaining = Number(remaining);
  }

  const resetMs = resolveResetMs(
    getHeader(headers, "x-ratelimit-reset"),
    getHeader(headers, "retry-after"),
    now
  );
  if (resetMs !== null) {
    state.serverResetAtMs = resetMs;
  }
}

function resolveDailyLimit(state: AccountWindowState): number {
  if (state.serverDailyLimit !== null) return state.serverDailyLimit;
  return state.purchasedAtLeast10 ? DAILY_LIMIT_PURCHASED : DAILY_LIMIT_BASE;
}

function resolveDailyUsed(state: AccountWindowState, dailyLimit: number): number {
  if (state.serverDailyRemaining !== null) {
    return Math.max(0, dailyLimit - state.serverDailyRemaining);
  }
  return state.dayCount;
}

/**
 * Current window status for the account bucket: daily count vs limit
 * (50-or-1000, server-corrected when available) and the 20 RPM rolling
 * window, plus reset timestamps for the dashboard countdown.
 */
export function getFreeWindowStatus(
  accountKey: string,
  now: number = Date.now()
): FreeWindowStatus {
  const state = getOrInitState(accountKey, now);
  pruneRpmWindow(state, now);

  const dailyLimit = resolveDailyLimit(state);
  const dailyUsed = resolveDailyUsed(state, dailyLimit);
  const dailyResetAt =
    state.serverResetAtMs !== null
      ? new Date(state.serverResetAtMs).toISOString()
      : nextUtcMidnightIso(now);

  const rpmUsed = state.requestTimestamps.length;

  return {
    dailyLimit,
    dailyUsed,
    dailyRemaining: Math.max(0, dailyLimit - dailyUsed),
    dailyResetAt,
    rpmLimit: RPM_LIMIT,
    rpmUsed,
    rpmRemaining: Math.max(0, RPM_LIMIT - rpmUsed),
  };
}

/** Test/ops helper — clears all in-memory account window state. */
export function clearFreeWindowState(): void {
  accountWindows.clear();
}
