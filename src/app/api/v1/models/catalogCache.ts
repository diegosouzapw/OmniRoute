/**
 * Response cache for `GET /v1/models`, extracted from catalog.ts.
 *
 * #6408 — concurrent catalog requests used to serialize (~1.2 s each × N). The
 * builder walks 8 registries and hits SQLite for connections, combos, custom
 * models and aliases; under Next.js's single-threaded App Router request
 * handling, N concurrent calls execute back-to-back and the Nth completes at
 * N × single-request latency. So identical concurrent requests are coalesced
 * onto one in-flight promise and the serialized body is memoized for a short
 * window.
 *
 * Auth rejection is NOT handled here and must stay in the caller: it depends on
 * live per-request state (dashboard cookie, API key) and must never be cached.
 */
import { getModelCatalogCacheVersion } from "@/lib/db/readCache";
import { extractApiKey } from "@/sse/services/auth";

import { isCodexModelCatalogClient } from "./catalogRequest";

export type CachedCatalog = {
  body: string;
  headers: Record<string, string>;
  status: number;
  expiresAt: number;
};

/** Payload shape returned by the builder the caller injects. */
export type CatalogPayload = {
  body: string;
  headers: Record<string, string>;
  status: number;
  cacheTTL: number;
};

/**
 * A client with a short discovery timeout (Claude Code allows 3 s) must never
 * wait on a full rebuild. Once a successful 200 is cached, expiry / DB
 * invalidation still serves that snapshot immediately while a single-flight
 * background refresh repopulates it (#8697).
 *
 * Production default is unbounded so TTL / invalidation only control refresh
 * cadence — never whether the client blocks on a cold rebuild. Non-200 entries
 * are never served as stale.
 *
 * Under node:test / vitest the live bound defaults to `0` so suites that toggle
 * settings between cases (hidePaidModels, prefix mode, provider blocks, …) do
 * not freeze on the first `/v1/models` snapshot. Tests that assert SWR itself
 * opt back into the unbounded window via
 * `__setCatalogStaleWhileRevalidateMsForTest`.
 *
 * `CATALOG_STALE_WHILE_REVALIDATE_MS` stays the documented production bound;
 * prefer `getCatalogStaleWhileRevalidateMs()` for the live value.
 */
export const CATALOG_STALE_WHILE_REVALIDATE_MS = Number.POSITIVE_INFINITY;

function resolveDefaultCatalogStaleWhileRevalidateMs(): number {
  const raw = process.env.OMNIROUTE_CATALOG_SWR_MS;
  if (raw !== undefined && raw !== "") {
    if (raw === "Infinity" || raw === "+Infinity") return Number.POSITIVE_INFINITY;
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }
  // node:test sets NODE_TEST_CONTEXT (e.g. "child-v8"); vitest sets VITEST.
  if (process.env.NODE_TEST_CONTEXT || process.env.VITEST || process.env.NODE_ENV === "test") {
    return 0;
  }
  return Number.POSITIVE_INFINITY;
}

let catalogStaleWhileRevalidateMs = resolveDefaultCatalogStaleWhileRevalidateMs();

/** Live SWR bound (Infinity in production; 0 under test runners unless overridden). */
export function getCatalogStaleWhileRevalidateMs(): number {
  return catalogStaleWhileRevalidateMs;
}

/**
 * Fallback memoization window; overridden by `settings.cache.modelCatalogCacheTtlMs`.
 *
 * Post-write freshness (#8697): `invalidateDbCache()` bumps
 * `modelCatalogCacheVersion` and `dropCatalogCacheIfStateChanged()` marks
 * successful entries expired so stale-while-revalidate can return the last
 * snapshot immediately and kick a background rebuild. What this TTL governs is
 * the "nothing was written" case, where replaying a body built seconds ago is
 * precisely the point of the cache.
 *
 * It was 1500 ms, which was shorter than a single build: measured 2026-07-28 on the
 * production VPS, the builder takes ~49 s for a 1.3 MB / 2645-model catalog. Any two
 * requests more than 1.5 s apart therefore both missed the fresh window, and the second
 * fell into stale-while-revalidate — which rebuilds via `setTimeout(…, 0)` and, because
 * the builder is overwhelmingly synchronous under the single-threaded App Router, pins
 * the event loop so even the "served immediately" stale body only reaches the client
 * once the rebuild finishes. Net effect: ~50 s on essentially every call.
 *
 * Held at 60 s to match the ceiling the settings schema already allows for the override
 * (`settingsSchemas.ts`, `.max(60000)`), so the default can never exceed what an
 * operator is permitted to configure.
 */
export const CATALOG_CACHE_TTL_MS_DEFAULT = 60_000;

const catalogCache = new Map<string, CachedCatalog>();
const catalogInFlight = new Map<string, Promise<CachedCatalog>>();

let _catalogBuilderRuns = 0;

function buildCatalogCacheKey(request: Request): string {
  const url = new URL(request.url);
  const prefix = url.searchParams.get("prefix") || "";
  const apiKey = extractApiKey(request) || "";
  const isCodex = isCodexModelCatalogClient(request) ? "1" : "0";
  const configuredOnly = url.searchParams.get("configuredOnly") === "true" ? "1" : "0";
  return `${prefix}|${isCodex}|${apiKey}|${configuredOnly}`;
}

// Tracks the model-catalog cache version (src/lib/db/readCache.ts) as of the last
// cache access. invalidateDbCache() bumps that version on every settings/connections/
// combos/pricing write. #8697: do NOT clear the map — mark successful entries
// expired so stale-while-revalidate can return the last snapshot immediately and
// kick a single-flight background rebuild against the new state. Clearing forced
// every distinct API key back through a synchronous ~15s cold build.
let lastSeenCatalogCacheVersion = getModelCatalogCacheVersion();
function dropCatalogCacheIfStateChanged(): void {
  const currentVersion = getModelCatalogCacheVersion();
  if (currentVersion === lastSeenCatalogCacheVersion) return;
  lastSeenCatalogCacheVersion = currentVersion;
  const expiredAt = Date.now() - 1;
  for (const [key, entry] of catalogCache.entries()) {
    if (entry.status === 200) {
      catalogCache.set(key, { ...entry, expiresAt: expiredAt });
    } else {
      catalogCache.delete(key);
    }
  }
  // Deliberately NOT clearing catalogInFlight: an in-flight build already reads live
  // DB/settings state as of when it started, so letting it finish and populate the
  // (now-current) cache entry is correct — clearing it would just force a redundant
  // second builder run for requests that arrive mid-flight.
}

// Header sources mix Title-Case keys (diagnostic/cors headers built by app code) with
// lower-case ones (payload headers captured via the Fetch `Headers` iterator). A plain
// object spread keeps both casings as distinct keys, and the `Response` constructor
// then *appends* rather than overwrites them, producing comma-joined duplicates (e.g.
// request-id echoing "foo, foo"). Merge through a real `Headers` so `.set()` overwrites
// case-insensitively. Earlier sources are the base; the caller passes diagnostics last
// so per-request fields reflect the current request, not whichever one filled the cache.
export function mergeCatalogHeaders(
  ...sources: Array<Record<string, string> | undefined>
): Headers {
  const merged = new Headers();
  for (const source of sources) {
    if (!source) continue;
    for (const [key, value] of Object.entries(source)) {
      merged.set(key, value);
    }
  }
  return merged;
}

function storePayload(cacheKey: string, payload: CatalogPayload): CachedCatalog {
  const entry: CachedCatalog = {
    body: payload.body,
    headers: payload.headers,
    status: payload.status,
    expiresAt: Date.now() + payload.cacheTTL,
  };
  catalogCache.set(cacheKey, entry);
  return entry;
}

/**
 * Kick off a background rebuild so an expired-but-stale-eligible entry can be
 * refreshed without the current request waiting on it. Reuses catalogInFlight —
 * no second coalescing mechanism — so a concurrent cold/stale request for the
 * same key joins this refresh instead of starting another.
 *
 * The builder runs one macrotask later so the stale response that triggered this
 * call is handed back before the builder's synchronous prologue runs; the whole
 * point of this path is that the caller does not pay for the rebuild.
 *
 * The tracked promise **rejects** on failure. catalogInFlight is shared with the
 * cold path: a caller whose entry aged past the stale window skips the stale
 * branch and awaits whatever promise it finds here, and resolving with the stale
 * entry would hand it a body it was no longer entitled to while disguising a
 * build failure as a 200. The rejection is pre-handled so this path can never
 * raise an unhandledRejection; a failed refresh simply never overwrites the entry.
 */
function scheduleBackgroundRefresh(
  cacheKey: string,
  request: Request,
  buildPayload: (request: Request) => Promise<CatalogPayload>
): void {
  if (catalogInFlight.has(cacheKey)) return; // a refresh for this key is already running

  const refreshPromise: Promise<CachedCatalog> = new Promise((resolve, reject) => {
    setTimeout(() => {
      runBuilder(buildPayload, request)
        .then((payload) => resolve(storePayload(cacheKey, payload)))
        .catch((err) => {
          console.error(
            `[catalog] Background stale-while-revalidate refresh failed for key "${cacheKey}":`,
            err
          );
          reject(err);
        });
    }, 0);
  });

  // Nobody on the stale path awaits this, so pre-handle the rejection; a cold-path
  // caller that joins it via catalogInFlight attaches its own handler and still
  // observes the failure.
  refreshPromise.catch(() => {});

  catalogInFlight.set(cacheKey, refreshPromise);
  refreshPromise
    .catch(() => {})
    .finally(() => {
      if (catalogInFlight.get(cacheKey) === refreshPromise) catalogInFlight.delete(cacheKey);
    });
}

function runBuilder(
  buildPayload: (request: Request) => Promise<CatalogPayload>,
  request: Request
): Promise<CatalogPayload> {
  _catalogBuilderRuns++;
  return buildPayload(request);
}

/**
 * Resolve the cached catalog response for `request`, building it through
 * `buildPayload` when there is nothing fresh to serve.
 *
 * Returns `null` when the caller must build and handle errors itself — i.e. the
 * in-flight build rejected — so the error-response shape stays in the caller.
 */
export async function resolveCachedCatalogResponse(
  request: Request,
  headerSources: { corsHeaders: Record<string, string>; diagnosticHeaders: Record<string, string> },
  buildPayload: (request: Request) => Promise<CatalogPayload>
): Promise<Response> {
  const { corsHeaders, diagnosticHeaders } = headerSources;
  dropCatalogCacheIfStateChanged();

  const cacheKey = buildCatalogCacheKey(request);
  const now = Date.now();
  const cached = catalogCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return new Response(cached.body, {
      status: cached.status,
      headers: mergeCatalogHeaders(corsHeaders, cached.headers, diagnosticHeaders),
    });
  }

  // Stale-while-revalidate (#8697): an expired successful entry is served
  // immediately while the live SWR bound allows it (unbounded in production).
  // Non-200 entries are never replayed as "stale".
  if (
    cached &&
    cached.status === 200 &&
    now - cached.expiresAt <= catalogStaleWhileRevalidateMs
  ) {
    scheduleBackgroundRefresh(cacheKey, request, buildPayload);
    return new Response(cached.body, {
      status: cached.status,
      headers: mergeCatalogHeaders(corsHeaders, cached.headers, diagnosticHeaders),
    });
  }

  let inflight = catalogInFlight.get(cacheKey);
  if (!inflight) {
    inflight = runBuilder(buildPayload, request).then((payload) => storePayload(cacheKey, payload));
    catalogInFlight.set(cacheKey, inflight);
    inflight.finally(() => {
      if (catalogInFlight.get(cacheKey) === inflight) catalogInFlight.delete(cacheKey);
    });
  }

  const payload = await inflight;
  return new Response(payload.body, {
    status: payload.status,
    headers: mergeCatalogHeaders(corsHeaders, payload.headers, diagnosticHeaders),
  });
}

// ── Test hooks ───────────────────────────────────────────────────────────────
// Not part of the public API; do not read from app code.

/** Resets the builder counter and every cached/in-flight entry. */
export function __resetCatalogBuilderRunsForTest(): void {
  _catalogBuilderRuns = 0;
  catalogCache.clear();
  catalogInFlight.clear();
  lastSeenCatalogCacheVersion = getModelCatalogCacheVersion();
  catalogStaleWhileRevalidateMs = resolveDefaultCatalogStaleWhileRevalidateMs();
}

/**
 * Overrides the live SWR bound for suites that assert stale-while-revalidate
 * itself (#8697 / discovery conformance). Call from `beforeEach` after reset;
 * `__resetCatalogBuilderRunsForTest` restores the environment default.
 */
export function __setCatalogStaleWhileRevalidateMsForTest(ms: number): void {
  catalogStaleWhileRevalidateMs = ms;
}

/** Counts full builder executions — proves concurrent requests share one run (#6408). */
export function __getCatalogBuilderRunsForTest(): number {
  return _catalogBuilderRuns;
}

/**
 * Marks every cached entry as expired `msAgo` milliseconds ago instead of sleeping
 * out the real TTL. Under #8697, successful entries remain stale-servable at any
 * age; use `__resetCatalogBuilderRunsForTest()` when a test needs a true cold miss.
 */
export function __expireCatalogCacheForTest(msAgo = 1): void {
  const expiresAt = Date.now() - msAgo;
  for (const [key, entry] of catalogCache.entries()) {
    catalogCache.set(key, { ...entry, expiresAt });
  }
}

/**
 * Seeds the entry a given request would read, for status/staleness combinations the
 * intentionally exception-resistant builder cannot be made to produce (e.g. a cached
 * non-200). Takes the Request so the cache-key format stays private to this module.
 */
export function __setCatalogCacheEntryForTest(request: Request, entry: CachedCatalog): void {
  catalogCache.set(buildCatalogCacheKey(request), entry);
}

/** Awaits any background refresh in flight, instead of guessing at a real-time sleep. */
export async function __flushCatalogBackgroundRefreshForTest(): Promise<void> {
  await Promise.all([...catalogInFlight.values()].map((p) => p.catch(() => {})));
}

/**
 * Injects a synthetic in-flight rejection so the caller's catch branch (sanitized
 * error body) can be exercised deterministically — the builder core try/catches every
 * registry and DB read individually, so it is not a practical error-injection point.
 *
 * Deliberately does not self-clean the way production entries do: this promise is
 * already rejected at creation, so a cleanup callback would delete the map entry
 * within a microtask or two — before the caller's several-await auth check finishes —
 * silently swapping in a fresh cold build instead of the intended failure. The next
 * __resetCatalogBuilderRunsForTest() clears it.
 */
export function __forceCatalogInFlightRejectionForTest(request: Request, error: unknown): void {
  const rejected: Promise<CachedCatalog> = Promise.reject(error);
  rejected.catch(() => {}); // mark as handled — avoids an unhandledRejection warning
  catalogInFlight.set(buildCatalogCacheKey(request), rejected);
}
