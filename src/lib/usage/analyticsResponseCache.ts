/**
 * Short-lived response cache for GET /api/usage/analytics.
 *
 * Building the analytics payload aggregates every usage_history row in the
 * requested range in JavaScript. better-sqlite3 and that aggregation are both
 * synchronous, so on a busy instance (a few hundred thousand rows) one request
 * holds the event loop for several seconds and every other request — including
 * /v1 proxy traffic — waits behind it. The dashboard asks for the same payload
 * on every visit to API Manager, Costs, Budget and Analytics.
 *
 * Only responses that were slow to build are kept, so small instances (and the
 * route tests) always see fresh data. Concurrent identical requests share one
 * computation.
 *
 * Tuning:
 *   OMNIROUTE_ANALYTICS_CACHE_TTL_MS          (default 60000; 0 disables)
 *   OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS  (default 1000)
 */

type CachedBody = {
  status: number;
  contentType: string;
  body: string;
};

type Entry = CachedBody & { expiresAt: number };

const DEFAULT_TTL_MS = 60_000;
const DEFAULT_MIN_COMPUTE_MS = 1_000;
const MAX_ENTRIES = 32;

const entries = new Map<string, Entry>();
const inFlight = new Map<string, Promise<CachedBody>>();

function readNonNegativeInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function getAnalyticsCacheTtlMs(): number {
  return readNonNegativeInt(process.env.OMNIROUTE_ANALYTICS_CACHE_TTL_MS, DEFAULT_TTL_MS);
}

export function getAnalyticsCacheMinComputeMs(): number {
  return readNonNegativeInt(
    process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS,
    DEFAULT_MIN_COMPUTE_MS
  );
}

function toResponse(cached: CachedBody, cacheState: "hit" | "miss"): Response {
  return new Response(cached.body, {
    status: cached.status,
    headers: {
      "content-type": cached.contentType,
      "cache-control": "private, no-store",
      "x-analytics-cache": cacheState,
    },
  });
}

/**
 * Serve `compute()` through the cache, keyed by `key` (the request's query
 * string). Callers must authenticate before calling this.
 */
export async function serveAnalyticsCached(
  key: string,
  compute: () => Promise<Response>
): Promise<Response> {
  const ttlMs = getAnalyticsCacheTtlMs();
  if (ttlMs <= 0) return compute();

  const now = Date.now();
  const hit = entries.get(key);
  if (hit && hit.expiresAt > now) return toResponse(hit, "hit");
  if (hit) entries.delete(key);

  let pending = inFlight.get(key);
  if (!pending) {
    const computation = (async () => {
      // Yield first so `computation` is registered before compute() can settle.
      await null;
      try {
        const startedAt = performance.now();
        const response = await compute();
        const result: CachedBody = {
          status: response.status,
          contentType: response.headers.get("content-type") || "application/json",
          body: await response.text(),
        };
        const computeMs = performance.now() - startedAt;
        if (result.status === 200 && computeMs >= getAnalyticsCacheMinComputeMs()) {
          if (entries.size >= MAX_ENTRIES) {
            const oldest = entries.keys().next().value;
            if (oldest !== undefined) entries.delete(oldest);
          }
          entries.set(key, { ...result, expiresAt: Date.now() + ttlMs });
        }
        return result;
      } finally {
        if (inFlight.get(key) === computation) inFlight.delete(key);
      }
    })();
    pending = computation;
    inFlight.set(key, computation);
  }

  return toResponse(await pending, "miss");
}

export function clearAnalyticsResponseCache(): void {
  entries.clear();
  inFlight.clear();
}
