/**
 * Live wiring for STRICT_ZERO_COST's quota-based branch.
 *
 * Reuses the existing `getUsageForProvider()` (`open-sse/services/usage.ts`)
 * instead of building a second quota system — this module only adds a short
 * TTL cache in front of it (so a Telegram-scale request rate never triggers a
 * live billing-API call per candidate per request) and an invalidation hook
 * for the resilience layer to call the moment a 402/403/quota-exhausted
 * response is observed (`accountFallback.ts`).
 *
 * The cache is intentionally synchronous to read: `resolveFreeAccessState()`
 * never awaits. A cache miss returns `undefined` (→ UNKNOWN → excluded,
 * fail-closed) and kicks off a background refresh for the *next* read —
 * nothing here can make `strictZeroCostFilter.ts`'s pool build block on a
 * network call.
 */
import {
  getUsageForProvider,
  USAGE_FETCHER_PROVIDERS,
  type UsageFetcherProvider,
} from "./../usage.ts";
import { getCachedProviderConnections } from "@/lib/db/readCache";
import { providerHasFreeModels } from "@/shared/utils/freeModels";
import { defaultLogger as log } from "@omniroute/open-sse/utils/logger";
import type { FreeAccessState } from "./strictZeroCostFilter";
import { isStateStaleForReset } from "./subscriptionLadder";

const USAGE_FETCHER_PROVIDER_SET = new Set<string>(USAGE_FETCHER_PROVIDERS);

/** Default cache TTL, reused verbatim from the already-shipped
 * `settings.autoRefreshProviderQuotaInterval` (180s default,
 * `src/lib/db/settings.ts`) instead of inventing a new number. */
const FALLBACK_TTL_MS = 180_000;

/** Cold-cache thundering-herd guard: after a process restart every candidate
 * in a pool build is a simultaneous cache miss, which without a cap would
 * fire one `getUsageForProvider()` call per distinct (provider, connection)
 * pair in the same tick. Capping concurrent background refreshes spreads
 * that burst out — a skipped refresh here just means this candidate stays
 * UNKNOWN (excluded, fail-closed) until a later pool build tries again, never
 * a correctness issue. */
const MAX_CONCURRENT_REFRESHES = 4;

/** Entries older than this are pruned outright even if nothing ever triggers
 * a fresh refresh for that exact key again (e.g. the connection was deleted
 * and no candidate references it anymore, so a normal stale-triggered
 * refresh — which self-heals inside one TTL window — never fires). A sweep,
 * not a timer: piggybacks on `resolveFreeAccessState` calls so this module
 * never owns its own background interval. */
const HARD_EVICTION_AGE_MS = FALLBACK_TTL_MS * 20; // 1 hour at the default TTL
const SWEEP_EVERY_N_CALLS = 200;

interface CacheEntry {
  state: FreeAccessState;
  fetchedAtMs: number;
}

// Keyed by `${provider}::${connectionId}` — module-level, process-lifetime
// cache. Cleared per-entry by `invalidateFreeAccessState`, on a failed
// refresh, or by the periodic sweep below; never wholesale.
const cache = new Map<string, CacheEntry>();
const inFlight = new Set<string>();
let resolveCallCount = 0;

function cacheKey(provider: string, connectionId: string): string {
  return `${provider}::${connectionId}`;
}

// `getSettings()` is async (DB-backed); reading it synchronously here isn't
// possible without changing `resolveFreeAccessState`'s synchronous contract.
// Using the fallback unconditionally is equivalent in practice: it's the same
// number as `settings.autoRefreshProviderQuotaInterval`'s own default
// (`src/lib/db/settings.ts`), and `strictZeroCostFilter.ts`'s own
// `maxStateAgeMs` (passed the real, live setting from `virtualFactory.ts`)
// is the check that actually gates staleness for the STRICT_ZERO_COST
// decision — this cache TTL only bounds how long a background refresh is
// skipped, a looser, non-safety-critical concern.
function ttlMs(): number {
  return FALLBACK_TTL_MS;
}

/** Opportunistic sweep of very stale entries, run every N calls instead of on
 * a timer. Cheap (a single Map iteration) and only ever removes entries no
 * live candidate can plausibly still be waiting on. */
function sweepIfDue(): void {
  resolveCallCount += 1;
  if (resolveCallCount % SWEEP_EVERY_N_CALLS !== 0) return;
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (now - entry.fetchedAtMs > HARD_EVICTION_AGE_MS) cache.delete(key);
  }
}

/**
 * Best-effort, provider-agnostic extraction of "how much free allowance is
 * left" from whatever shape `getUsageForProvider()` returns for this
 * provider today. Adapters were written for a human-readable quota display,
 * not for this filter, so their payloads are heterogeneous; this function
 * recognizes the two shapes already used by other read paths in this
 * codebase (`quotas.*.remainingPercentage` / `.total`+`.remaining`, mirroring
 * `quota_omniroute.py`'s own parsing) and returns `null` — never a guess —
 * for anything else. `null` is treated as "not proven safe" by the filter.
 */
function extractRemainingAllowance(usage: unknown, opts?: { isFreeTier?: boolean }): number | null {
  if (!usage || typeof usage !== "object") return null;
  const quotas = (usage as Record<string, unknown>).quotas;
  if (!quotas || typeof quotas !== "object") return null;

  let worstPercent: number | null = null;
  let sawUnlimited = false;
  for (const raw of Object.values(quotas as Record<string, unknown>)) {
    if (!raw || typeof raw !== "object") continue;
    const q = raw as Record<string, unknown>;
    if (q.unlimited === true) {
      sawUnlimited = true;
      continue;
    }
    let pct: number | null =
      typeof q.remainingPercentage === "number" ? q.remainingPercentage : null;
    if (
      pct === null &&
      typeof q.total === "number" &&
      typeof q.remaining === "number" &&
      q.total > 0
    ) {
      pct = (100 * q.remaining) / q.total;
    }
    if (pct === null) continue;
    worstPercent = worstPercent === null ? pct : Math.min(worstPercent, pct);
  }
  if (worstPercent === null && sawUnlimited && opts?.isFreeTier === true) return 100;
  return worstPercent; // percentage points; the filter's threshold is compared against this unit
}

async function refresh(provider: string, connectionId: string): Promise<void> {
  const key = cacheKey(provider, connectionId);
  if (inFlight.has(key)) return;
  if (inFlight.size >= MAX_CONCURRENT_REFRESHES) return; // thundering-herd guard — see const doc above
  inFlight.add(key);
  try {
    const connections = await getCachedProviderConnections();
    const connection = connections.find(
      (c): c is Record<string, unknown> =>
        !!c &&
        typeof c === "object" &&
        (c as Record<string, unknown>).id === connectionId &&
        (c as Record<string, unknown>).provider === provider
    );
    if (!connection) {
      cache.delete(key);
      return;
    }
    const usage = await getUsageForProvider(
      connection as unknown as Parameters<typeof getUsageForProvider>[0],
      { forceRefresh: false }
    );
    const remaining = extractRemainingAllowance(usage, {
      isFreeTier: providerHasFreeModels(provider),
    });
    const state: FreeAccessState = {
      status: remaining === null ? "UNKNOWN" : remaining > 0 ? "SAFE" : "EXHAUSTED",
      remainingFreeAllowance: remaining,
      resetAt:
        usage &&
        typeof usage === "object" &&
        typeof (usage as Record<string, unknown>).resetAt === "string"
          ? ((usage as Record<string, unknown>).resetAt as string)
          : null,
      checkedAt: new Date().toISOString(),
    };
    cache.set(key, { state, fetchedAtMs: Date.now() });
  } catch (err) {
    // A failed lookup must never leave a stale SAFE entry behind — drop it so
    // the next read is a clean cache miss (UNKNOWN), not a lucky reuse.
    cache.delete(key);
    log.warn("AUTO", "STRICT_ZERO_COST: usage refresh failed, treating as UNKNOWN", {
      provider,
      err: err instanceof Error ? err.message : String(err),
    });
  } finally {
    inFlight.delete(key);
  }
}

/**
 * Synchronous read for `strictZeroCostFilter.ts`. Returns `undefined` when
 * there's no usage adapter for this provider at all (a permanent UNKNOWN, no
 * point ever refreshing), or on a cold/stale cache — in both cases a
 * background refresh is kicked off (fire-and-forget, subject to the
 * concurrency cap above) so a *later* read can benefit, but this call itself
 * never blocks or throws.
 */
export function resolveFreeAccessState(
  provider: string,
  connectionId: string | undefined
): FreeAccessState | undefined {
  sweepIfDue();
  if (!USAGE_FETCHER_PROVIDER_SET.has(provider as UsageFetcherProvider)) return undefined;
  if (!connectionId) return undefined;

  const key = cacheKey(provider, connectionId);
  const entry = cache.get(key);
  // Subscription-first routing (decision 3): an entry whose own `resetAt` has
  // already passed describes a quota window that no longer exists, so it is
  // stale REGARDLESS of its age. Without this, a plan that refilled at
  // midnight keeps reading EXHAUSTED until the TTL happens to lapse, and
  // routing stays on paid rungs for no reason. See `subscriptionLadder.ts`.
  const resetElapsed = entry !== undefined && isStateStaleForReset(entry.state);
  const fresh = entry && !resetElapsed && Date.now() - entry.fetchedAtMs <= ttlMs();
  if (!fresh) {
    void refresh(provider, connectionId);
  }
  return fresh ? entry.state : undefined;
}

/** Called by `accountFallback.ts` the moment a 402/403/quota-exhausted
 * response is classified for a connection — drops the cached entry
 * immediately instead of waiting out the TTL, so the very next candidate-pool
 * build reads a clean cache miss (UNKNOWN) rather than a stale SAFE. */
export function invalidateFreeAccessState(provider: string, connectionId: string): void {
  cache.delete(cacheKey(provider, connectionId));
}

export const __testing = { cache, extractRemainingAllowance, sweepIfDue };
