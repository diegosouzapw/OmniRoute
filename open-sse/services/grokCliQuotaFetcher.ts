/**
 * grokCliQuotaFetcher.ts — Grok Build (`grok-cli`) Live Quota Fetcher (#6844)
 *
 * Replaces the static 864 req/day plan (`src/lib/quota/planRegistry.ts:87-98`)
 * with a live read of xAI's shared weekly credit pool. xAI's Build billing is a
 * single percent-based pool shared across Chat/Imagine/Voice/Build/API, so the
 * local request/token counter cannot see it — this fetcher polls the same
 * unauthenticated-cookie-free gRPC-web endpoint documented by steipete/CodexBar
 * (`docs/grok.md`):
 *
 *   POST https://grok.com/grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig
 *     Authorization: Bearer {accessToken}   (the same bearer token grok-cli.ts
 *                                            already sends for chat requests)
 *   -> gRPC-web framed or raw protobuf body, decoded by grokCliQuotaFrame.ts
 *
 * Scope for this PR is the primary source only (see the #6844 implementation
 * plan's Non-Goals): no ACP `x.ai/billing` secondary path, no proactive
 * `refreshCredentials()` call before polling — a 401 just fails open (returns
 * `null`), matching the fail-open convention every sibling fetcher uses
 * (`antigravityCredits.ts`: unknown/failed fetch never disables the
 * connection).
 *
 * `grok.com` is not behind the same Cloudflare-guarded path `grok-cli.ts`'s
 * IPv4-forced native-https helper exists for — confirmed via a live `fetch()`
 * smoke test against the real endpoint (2026-07-20: HTTP 200,
 * `content-type: application/grpc-web+proto`, no challenge page), not merely
 * assumed. This fetcher therefore uses the global `fetch()` like the other
 * quota fetchers (`v0QuotaFetcher.ts`, `agentrouterQuotaFetcher.ts`) rather
 * than `resolveGrokRequestDispatch()`.
 *
 * Cache: in-memory TTL (60s), same pattern as sibling fetchers.
 *
 * Registration: call registerGrokCliQuotaFetcher() once at server startup.
 */

import { registerQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";
import { decodeGrokCreditsFrame } from "./grokCliQuotaFrame.ts";

const GROK_CLI_CONFIG = {
  baseUrl: "https://grok.com",
  billingPath: "/grok_api_v2.GrokBuildBilling/GetGrokCreditsConfig",
};

/**
 * Empty gRPC-web request frame: 1-byte compression flag (0x00, uncompressed)
 * + 4-byte big-endian length (0, no message body) — `GetGrokCreditsConfig`
 * takes no arguments, but gRPC-web still requires a request frame. Without
 * one the upstream responds `grpc-status: 13 "Missing request message."`
 * with a 0-byte body (confirmed live against grok.com on 2026-07-20).
 */
const GRPC_WEB_EMPTY_REQUEST_FRAME = Buffer.from([0, 0, 0, 0, 0]);

const CACHE_TTL_MS = 60_000; // 60 seconds

export interface GrokCliQuota extends QuotaInfo {
  limitReached: boolean;
}

interface CacheEntry {
  quota: GrokCliQuota;
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

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/**
 * Read the connection's bearer token. Per the #6844 plan this is
 * `connection.credentials.accessToken` — the same field grok-cli.ts:271-272
 * already reads to send `Authorization: Bearer …` for chat requests — NOT a
 * `providerSpecificData` field.
 */
function extractAccessToken(connection?: Record<string, unknown>): string | null {
  const credentials = toRecord(connection?.credentials);
  return typeof credentials.accessToken === "string" && credentials.accessToken.trim().length > 0
    ? credentials.accessToken
    : null;
}

/**
 * `percentUsed` here is the decoder's 0-100 scale (see
 * grokCliQuotaFrame.ts::decodeGrokCreditsFrame). `QuotaInfo.percentUsed`
 * (the field returned to the rest of the quota pipeline) is a 0-1 FRACTION —
 * `quotaPreflight.ts::remainingPercentFrom` computes `(1 - percentUsed) * 100`,
 * so this function rescales back down before returning.
 */
function buildQuota(percentUsed: number, resetAt: string | null): GrokCliQuota {
  const clampedPercent = Math.min(100, Math.max(0, percentUsed));
  const fraction = clampedPercent / 100;
  return {
    used: Math.round(clampedPercent),
    total: 100,
    percentUsed: fraction,
    resetAt,
    limitReached: clampedPercent >= 100,
  };
}

/**
 * Fetch current quota for a grok-cli connection.
 *
 * @param connectionId - Connection ID from the DB (used to key the cache)
 * @param connection - Optional connection object with `credentials.accessToken`
 * @returns GrokCliQuota or null if fetch/parse fails / no credentials (fail-open)
 */
export async function fetchGrokCliQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  const accessToken = extractAccessToken(connection);
  if (!accessToken) {
    return null;
  }

  const url = `${GROK_CLI_CONFIG.baseUrl}${GROK_CLI_CONFIG.billingPath}`;

  try {
    await throttleQuotaFetch();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/grpc-web+proto",
        "X-Grpc-Web": "1",
      },
      body: GRPC_WEB_EMPTY_REQUEST_FRAME,
      signal: AbortSignal.timeout(8_000),
    });

    if (response.status === 401 || response.status === 403) {
      // Fail-open: no proactive refreshCredentials() in this PR (see Non-Goals).
      quotaCache.delete(connectionId);
      return null;
    }
    if (!response.ok) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const decoded = decodeGrokCreditsFrame(Buffer.from(arrayBuffer));
    if (!decoded) return null;

    const quota = buildQuota(decoded.percentUsed, decoded.resetAt);
    quotaCache.set(connectionId, { quota, fetchedAt: Date.now() });
    return quota;
  } catch {
    return null;
  }
}

/**
 * Force-invalidate the cache for a connection.
 */
export function invalidateGrokCliQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

/**
 * Register the grok-cli quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts, via quotaTrackersBatch.ts).
 */
export function registerGrokCliQuotaFetcher(): void {
  registerQuotaFetcher("grok-cli", fetchGrokCliQuota);
  registerMonitorFetcher("grok-cli", fetchGrokCliQuota);
}
