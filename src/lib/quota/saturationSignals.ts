/**
 * saturationSignals.ts — Read the current global saturation signal (0..1)
 * for a provider/connection/dimension combination.
 *
 * Strategy (per provider):
 *   codex            → codexQuotaFetcher (dual 5h + weekly window)
 *   bailian          → bailianQuotaFetcher (triple 5h + weekly + monthly window)
 *   anthropic/claude → REAL plan-window utilization from GET /api/oauth/usage
 *                      (the same path usage.ts already uses): window "5h" →
 *                      five_hour.utilization, "weekly" → seven_day.utilization.
 *                      Falls back to the per-minute REQUEST rate-limit headers
 *                      (anthropic-ratelimit-requests-*) only when no OAuth plan
 *                      window is available (e.g. API-key Claude connections).
 *   default          → getUsageForProvider (open-sse/services/usage.ts)
 *
 * Cache: in-memory Map, TTL = 30 seconds. The 30s TTL is what keeps the
 * NON-OFFICIAL, rate-limited oauth/usage endpoint from being polled per
 * request (it returns 429 under load) — never call it on the hot path without
 * this cache. usage.ts adds its own 429 cooldown on top.
 * Fail-open: on any error, return 0 (generous mode) and log pino.warn.
 * Hard Rule #12: no stack traces propagated to return values.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import { createLogger } from "@/shared/utils/logger";
import type { QuotaUnit, QuotaWindow } from "./dimensions";

const log = createLogger("quota:saturation");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CacheEntry {
  value: number; // 0..1
  ts: number; // epoch ms
}

interface DimensionSpec {
  unit: QuotaUnit;
  window: QuotaWindow;
}

// ---------------------------------------------------------------------------
// In-memory cache (Map<cacheKey, CacheEntry>)
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 30_000; // 30 seconds

const _cache = new Map<string, CacheEntry>();

// ---------------------------------------------------------------------------
// Rate-limit header cache (populated by response handlers)
// ---------------------------------------------------------------------------

interface RateLimitHeaderEntry {
  limit: number;
  remaining: number;
  ts: number;
}

const _rateLimitHeaders = new Map<string, RateLimitHeaderEntry>();
const RL_HEADER_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Store rate-limit headers from an upstream response for saturation signal use.
 * Called by the response handler after a successful request.
 */
export function storeRateLimitHeaders(
  connectionId: string,
  provider: string,
  headers: Record<string, string>
): void {
  // Anthropic: anthropic-ratelimit-requests-limit / anthropic-ratelimit-requests-remaining
  const limitStr =
    headers["anthropic-ratelimit-requests-limit"] ??
    headers["x-ratelimit-limit-requests"] ??
    headers["x-ratelimit-limit"];
  const remainingStr =
    headers["anthropic-ratelimit-requests-remaining"] ??
    headers["x-ratelimit-remaining-requests"] ??
    headers["x-ratelimit-remaining"];

  if (limitStr && remainingStr) {
    const limit = Number(limitStr);
    const remaining = Number(remainingStr);
    if (Number.isFinite(limit) && limit > 0 && Number.isFinite(remaining)) {
      _rateLimitHeaders.set(`${provider}:${connectionId}`, {
        limit,
        remaining,
        ts: Date.now(),
      });
    }
  }
}

function cacheKey(connectionId: string, provider: string, dim: DimensionSpec): string {
  return `${provider}:${connectionId}:${dim.unit}:${dim.window}`;
}

// Exported for test reset
export function _clearSaturationCache(): void {
  _cache.clear();
}

// ---------------------------------------------------------------------------
// Provider-specific extractors
// ---------------------------------------------------------------------------

/**
 * Map QuotaWindow to the Codex window keys returned by the fetcher.
 */
function codexWindowKey(window: QuotaWindow): string {
  switch (window) {
    case "5h":
      return "session"; // CODEX_WINDOW_SESSION
    case "weekly":
      return "weekly"; // CODEX_WINDOW_WEEKLY
    default:
      return "session";
  }
}

async function fetchCodexSaturation(
  connectionId: string,
  dim: DimensionSpec
): Promise<number> {
  // Dynamic import — codexQuotaFetcher lives in open-sse workspace
  const mod = await import("@omniroute/open-sse/services/codexQuotaFetcher");
  const quota = await mod.fetchCodexQuota(connectionId);
  if (!quota) return 0;

  const winKey = codexWindowKey(dim.window);
  const windows = quota.windows as Record<string, { percentUsed: number } | undefined>;
  const win = windows[winKey];
  if (win && typeof win.percentUsed === "number") {
    return Math.min(1, Math.max(0, win.percentUsed));
  }
  // fallback to overall percentUsed
  return Math.min(1, Math.max(0, quota.percentUsed ?? 0));
}

async function fetchBailianSaturation(
  connectionId: string,
  dim: DimensionSpec
): Promise<number> {
  const mod = await import("@omniroute/open-sse/services/bailianQuotaFetcher");
  const quota = await mod.fetchBailianQuota(connectionId);
  if (!quota) return 0;

  const q = quota as unknown as Record<string, unknown>;
  let pct = 0;
  switch (dim.window) {
    case "5h":
      pct = (q.window5h as Record<string, unknown>)?.percentUsed as number ?? 0;
      break;
    case "weekly":
      pct = (q.windowWeekly as Record<string, unknown>)?.percentUsed as number ?? 0;
      break;
    case "monthly":
      pct = (q.windowMonthly as Record<string, unknown>)?.percentUsed as number ?? 0;
      break;
    default:
      pct = (q.percentUsed as number) ?? 0;
  }
  return Math.min(1, Math.max(0, pct));
}

/**
 * Per-minute REQUEST rate-limit headers fallback. Used only when the OAuth
 * plan-window utilization is unavailable (e.g. API-key Claude connections that
 * have no /api/oauth/usage data). This signal reflects TPM/RPM bursts, NOT the
 * 5h/weekly plan window, so it is a weak last resort.
 */
function anthropicHeaderSaturation(connectionId: string): number {
  const entry = _rateLimitHeaders.get(`anthropic:${connectionId}`);
  if (!entry || Date.now() - entry.ts > RL_HEADER_TTL_MS) return 0;

  const used = entry.limit - entry.remaining;
  return Math.min(1, Math.max(0, used / entry.limit));
}

/**
 * Injectable seam (DB lookup + usage fetch) so the oauth/usage plan-window path
 * is unit-testable without touching the DB or the network. Defaults are wired
 * lazily to the real implementations inside fetchAnthropicSaturation.
 */
interface AnthropicSaturationDeps {
  /** Resolve a connection (with decrypted accessToken/authType) by id. */
  loadConnection: (connectionId: string) => Promise<Record<string, unknown> | null>;
  /** Fetch usage for the connection (delegates to getUsageForProvider). */
  fetchUsage: (conn: Record<string, unknown>) => Promise<unknown>;
}

let _anthropicDepsOverride: AnthropicSaturationDeps | null = null;

/** Test-only: inject ({loadConnection, fetchUsage}); pass null to restore. */
export function __setAnthropicSaturationDepsForTests(
  deps: AnthropicSaturationDeps | null
): void {
  _anthropicDepsOverride = deps;
}

async function defaultAnthropicDeps(): Promise<AnthropicSaturationDeps> {
  const [providersMod, usageMod] = await Promise.all([
    import("@/lib/db/providers"),
    import("@omniroute/open-sse/services/usage"),
  ]);
  return {
    loadConnection: (connectionId) =>
      providersMod.getProviderConnectionById(connectionId) as Promise<Record<
        string,
        unknown
      > | null>,
    fetchUsage: (conn) =>
      usageMod.getUsageForProvider(conn as Parameters<typeof usageMod.getUsageForProvider>[0]),
  };
}

/**
 * Map a QuotaWindow to the Claude usage quota key produced by getClaudeUsage
 * (usage.ts). "session (5h)" carries five_hour.utilization and "weekly (7d)"
 * carries seven_day.utilization.
 */
function claudeUsageKeyForWindow(window: QuotaWindow): string | null {
  switch (window) {
    case "5h":
      return "session (5h)";
    case "weekly":
    case "monthly":
      // Anthropic exposes a 7-day plan window, not a monthly one — treat the
      // longer requested window as the weekly plan saturation.
      return "weekly (7d)";
    default:
      return null;
  }
}

/**
 * Extract the plan utilization (0..1) for the requested window from a
 * getClaudeUsage() result, or null when the OAuth plan window is unavailable
 * (e.g. legacy/admin API-key shape with no per-window quotas).
 */
function planUtilizationFromUsage(usage: unknown, window: QuotaWindow): number | null {
  if (!usage || typeof usage !== "object") return null;
  const quotas = (usage as Record<string, unknown>).quotas;
  if (!quotas || typeof quotas !== "object" || Array.isArray(quotas)) return null;

  const key = claudeUsageKeyForWindow(window);
  if (!key) return null;
  const entry = (quotas as Record<string, unknown>)[key];
  if (!entry || typeof entry !== "object") return null;

  // getClaudeUsage stores `used` = utilization (% used, 0..100).
  const used = (entry as Record<string, unknown>).used;
  if (typeof used !== "number" || !Number.isFinite(used)) return null;
  return Math.min(1, Math.max(0, used / 100));
}

async function fetchAnthropicSaturation(
  connectionId: string,
  dim: DimensionSpec
): Promise<number> {
  // Try the REAL plan-window utilization first (5h / weekly), via the same
  // /api/oauth/usage path usage.ts already uses. This is the signal fairShare
  // actually needs for Claude Pro/Max — the per-minute request headers do not
  // reflect the plan window. Any failure here falls back to the header path,
  // and ultimately fails open (0).
  try {
    const deps = _anthropicDepsOverride ?? (await defaultAnthropicDeps());
    const conn = await deps.loadConnection(connectionId);
    // Only OAuth connections have plan-window usage; API-key Claude does not.
    const hasOauthToken =
      !!conn &&
      typeof conn.accessToken === "string" &&
      conn.accessToken.length > 0 &&
      (conn.authType === undefined || conn.authType === "oauth");
    if (hasOauthToken) {
      const usage = await deps.fetchUsage(conn as Record<string, unknown>);
      const util = planUtilizationFromUsage(usage, dim.window);
      if (util !== null) return util;
    }
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, connectionId },
      "anthropic oauth/usage saturation failed — falling back to rate-limit headers"
    );
  }

  // Fallback: per-minute REQUEST rate-limit headers (weak, TPM/RPM only).
  return anthropicHeaderSaturation(connectionId);
}

async function fetchGenericSaturation(
  connectionId: string,
  provider: string
): Promise<number> {
  try {
    const mod = await import("@omniroute/open-sse/services/usage");
    const conn = { id: connectionId, provider } as Parameters<typeof mod.getUsageForProvider>[0];
    const result = await mod.getUsageForProvider(conn);
    if (!result || typeof result !== "object") return 0;
    const obj = result as Record<string, unknown>;
    const pct =
      typeof obj.percentUsed === "number"
        ? obj.percentUsed
        : typeof obj.used_percent === "number"
          ? obj.used_percent
          : 0;
    return Math.min(1, Math.max(0, pct));
  } catch {
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Return the current global saturation signal (0..1) for a connection+dim.
 *
 * A value of 0 means "no saturation detected" (generous/borrowing mode allowed).
 * A value >= saturationThreshold triggers strict mode in fairShare.ts.
 *
 * Always fail-open: returns 0 on any error.
 */
export async function getSaturation(
  connectionId: string,
  provider: string,
  dim: DimensionSpec
): Promise<number> {
  const key = cacheKey(connectionId, provider, dim);
  const cached = _cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.value;
  }

  let value = 0;
  try {
    switch (provider) {
      case "codex":
        value = await fetchCodexSaturation(connectionId, dim);
        break;
      case "bailian":
        value = await fetchBailianSaturation(connectionId, dim);
        break;
      case "anthropic":
      case "claude":
        value = await fetchAnthropicSaturation(connectionId, dim);
        break;
      default:
        value = await fetchGenericSaturation(connectionId, provider);
        break;
    }
  } catch (err) {
    log.warn({ err: (err as Error)?.message, connectionId, provider }, "saturation fetch failed — failing open with 0");
    value = 0;
  }

  _cache.set(key, { value, ts: Date.now() });
  return value;
}
