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
import { createHmac } from "node:crypto";

import { after } from "next/server";

import { getModelCatalogCacheVersion } from "@/lib/db/readCache";
import { extractApiKey } from "@/sse/services/auth";

import { isCodexModelCatalogClient } from "./catalogRequest";

/** Fingerprint an API key for the catalog memo Map. Never store the raw secret. */
export function fingerprintCatalogAuthKey(apiKey: string): string {
  if (!apiKey) return "";
  // Memo-map cache key fingerprint, not a password/credential hash — keyed with a fixed
  // context label so it reads as a domain-separated digest rather than a bare password hash.
  return createHmac("sha256", "omniroute-catalog-cache-fingerprint-v1")
    .update(apiKey)
    .digest("hex")
    .slice(0, 16);
}

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
 * wait on a full rebuild. Once a cached 200 expires it is still served
 * immediately for up to this long while a background refresh repopulates it.
 * Bounded so a refresh that keeps failing cannot pin an old catalog forever —
 * past this window callers fall back to waiting, same as a cold cache.
 */
export const CATALOG_STALE_WHILE_REVALIDATE_MS = 30_000;

/**
 * Schedules the stale-while-revalidate rebuild. Injected so the App Router route can
 * hand over Next's `after()` and a test can hand over a deterministic hook.
 *
 * The task returns a promise, so a scheduler that awaits it (as `after()` does) keeps
 * the runtime alive until the rebuild finishes.
 */
export type BackgroundRefreshScheduler = (task: () => Promise<unknown>) => void;

/**
 * Default scheduler: Next's `after()`, which runs the task once the response has been
 * flushed to the client.
 *
 * That flush guarantee is the whole point of #8728. The builder is overwhelmingly
 * synchronous under the single-threaded App Router, so a rebuild that starts before the
 * flush pins the event loop and the "served immediately" stale body only reaches the
 * client once the rebuild has finished — the stale path stops being cheap, which is what
 * it exists for. `setTimeout(…, 0)` defers by a macrotask but does not wait for the
 * flush, so it never delivered that guarantee.
 *
 * `after()` throws outside a Next request scope — the CLI/Electron server, unit tests —
 * so fall back to the macrotask there. Those callers have no response being flushed, so
 * the deferral is all they ever needed.
 */
export function defaultBackgroundRefreshScheduler(task: () => Promise<unknown>): void {
  try {
    after(task);
  } catch {
    setTimeout(() => {
      void task();
    }, 0);
  }
}

/**
 * Per-call knobs for `resolveCachedCatalogResponse`. The first two are cache-key
 * dimensions; the last two are injection points with production defaults.
 */
export type CatalogCacheOptions = {
  hideAutoCombos?: boolean;
  hideNoThinkVariants?: boolean;
  /**
   * Overrides `CATALOG_STALE_WHILE_REVALIDATE_MS` for this call only.
   *
   * Deliberately NOT the module-level policy accessor #9199 removed: there is no
   * setter, no module state, and no production caller passes it, so the bound stays
   * fixed at 30 s for every real request and a failing refresh still cannot pin an old
   * catalog forever. It exists so a test can hold an entry in the stale branch while it
   * measures when the rebuild starts, instead of racing the real window.
   */
  getStaleWhileRevalidateMs?: () => number;
  /** Overrides `defaultBackgroundRefreshScheduler` for this call. */
  scheduleBackgroundRefresh?: BackgroundRefreshScheduler;
};

/**
 * Fallback memoization window; overridden by `settings.cache.modelCatalogCacheTtlMs`.
 *
 * This does NOT govern post-write freshness — `invalidateDbCache()` bumps
 * `modelCatalogCacheVersion` on every settings/connections/combos/pricing write and
 * `dropCatalogCacheIfStateChanged()` drops the whole cache the moment it moves, so a
 * write is reflected on the very next read regardless of this value. What it governs is
 * the "nothing was written" case, where replaying a body built seconds ago is precisely
 * the point of the cache.
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

/** Cold-path wait bound for a coalesced catalog rebuild (#12627). Override with CATALOG_BUILD_TIMEOUT_MS. */
export const CATALOG_BUILD_TIMEOUT_MS_DEFAULT = 8_000;

function catalogBuildTimeoutMs(): number {
  const raw = process.env.CATALOG_BUILD_TIMEOUT_MS;
  if (!raw) return CATALOG_BUILD_TIMEOUT_MS_DEFAULT;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : CATALOG_BUILD_TIMEOUT_MS_DEFAULT;
}

const catalogLastGood = new Map<string, CachedCatalog>();

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(label)), ms);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

const catalogCache = new Map<string, CachedCatalog>();

/**
 * An in-flight build is bound to the catalog-state generation it started from
 * (`getModelCatalogCacheVersion()` at launch). After a write invalidates the
 * catalog, the generation moves on: a stale in-flight build must neither be
 * joined by new requests nor repopulate the now-current cache when it finishes.
 * It still resolves to its own original caller (that request legitimately waits
 * on it), just without being persisted.
 */
type InFlightBuild = { generation: number; promise: Promise<CachedCatalog> };
const catalogInFlight = new Map<string, InFlightBuild>();

let _catalogBuilderRuns = 0;

function buildCatalogCacheKey(request: Request, catalogSettings?: CatalogCacheOptions): string {
  const url = new URL(request.url);
  const prefix = url.searchParams.get("prefix") || "";
  const apiKey = extractApiKey(request) || "";
  const isCodex = isCodexModelCatalogClient(request) ? "1" : "0";
  const configuredOnly = url.searchParams.get("configuredOnly") === "true" ? "1" : "0";
  const hideAuto = catalogSettings?.hideAutoCombos ? "1" : "0";
  const hideNoThink = catalogSettings?.hideNoThinkVariants ? "1" : "0";
  return `${prefix}|${isCodex}|${fingerprintCatalogAuthKey(apiKey)}|${configuredOnly}|${hideAuto}|${hideNoThink}`;
}

// Tracks the model-catalog cache version (src/lib/db/readCache.ts) as of the last
// cache access. invalidateDbCache() bumps that version on every settings/connections/
// combos/pricing write; when it moves on, every memoized entry here was built from
// state that no longer holds, so drop them all rather than keying by version (which
// would leak one Map entry per version forever instead of ever pruning old ones).
let lastSeenCatalogCacheVersion = getModelCatalogCacheVersion();
function dropCatalogCacheIfStateChanged(): void {
  const currentVersion = getModelCatalogCacheVersion();
  if (currentVersion === lastSeenCatalogCacheVersion) return;
  lastSeenCatalogCacheVersion = currentVersion;
  catalogCache.clear();
  // Deliberately NOT clearing catalogInFlight: an in-flight build bound to the
  // previous generation is left to finish for its original caller, but the
  // generation check in the join path (below) keeps new requests from joining
  // it, and the generation check in storePayload keeps it from repopulating
  // the now-current cache. Clearing it here would just detach the entry while
  // the build still ran — wasted work with no correctness gain.
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

/**
 * Persist a freshly built payload — but only when the build still belongs to the
 * current catalog-state generation. A build that started before a write
 * invalidation (its `buildGeneration` is older than `getModelCatalogCacheVersion()`)
 * returns its entry to its original caller but must NOT repopulate the cache: the
 * payload reflects pre-write state and caching it would serve stale data.
 */
function storePayload(
  cacheKey: string,
  payload: CatalogPayload,
  buildGeneration: number
): CachedCatalog {
  const entry: CachedCatalog = {
    body: payload.body,
    headers: payload.headers,
    status: payload.status,
    expiresAt: Date.now() + payload.cacheTTL,
  };
  if (buildGeneration === getModelCatalogCacheVersion()) {
    catalogCache.set(cacheKey, entry);
  }
  if (entry.status === 200) catalogLastGood.set(cacheKey, entry);
  return entry;
}

/**
 * Kick off a background rebuild so an expired-but-stale-eligible entry can be
 * refreshed without the current request waiting on it. Reuses catalogInFlight —
 * no second coalescing mechanism — so a concurrent cold/stale request for the
 * same key joins this refresh instead of starting another.
 *
 * The builder runs through `schedule` so the stale response that triggered this call
 * is handed back — flushed to the client, under the production scheduler — before the
 * builder's synchronous prologue runs; the whole point of this path is that the caller
 * does not pay for the rebuild.
 *
 * The tracked promise **rejects** on failure. catalogInFlight is shared with the
 * cold path: a caller whose entry aged past the stale window skips the stale
 * branch and awaits whatever promise it finds here, and resolving with the stale
 * entry would hand it a body it was no longer entitled to while disguising a
 * build failure as a 200. The rejection is pre-handled so this path can never
 * raise an unhandledRejection; a failed refresh simply never overwrites the entry.
 */
function startBackgroundRefresh(
  cacheKey: string,
  request: Request,
  buildPayload: (request: Request) => Promise<CatalogPayload>,
  schedule: BackgroundRefreshScheduler
): void {
  if (catalogInFlight.has(cacheKey)) return; // a refresh for this key is already running

  const generation = getModelCatalogCacheVersion();
  const refreshPromise: Promise<CachedCatalog> = new Promise((resolve, reject) => {
    schedule(() =>
      runBuilder(buildPayload, request)
        .then((payload) => {
          resolve(storePayload(cacheKey, payload, generation));
        })
        .catch((err) => {
          console.error(
            `[catalog] Background stale-while-revalidate refresh failed for key "${cacheKey}":`,
            err
          );
          reject(err);
        })
    );
  });
  // Nobody on the stale path awaits this, so pre-handle the rejection; a cold-path
  // caller that joins it via catalogInFlight attaches its own handler and still
  // observes the failure.
  refreshPromise.catch(() => {});

  catalogInFlight.set(cacheKey, { generation, promise: refreshPromise });
  refreshPromise
    .catch(() => {})
    .finally(() => {
      if (catalogInFlight.get(cacheKey)?.promise === refreshPromise)
        catalogInFlight.delete(cacheKey);
    });
}

function runBuilder(
  buildPayload: (request: Request) => Promise<CatalogPayload>,
  request: Request
): Promise<CatalogPayload> {
  _catalogBuilderRuns++;
  return buildPayload(request);
}

async function awaitCatalogInFlight(
  cacheKey: string,
  inflight: InFlightBuild,
  corsHeaders: Record<string, string>,
  diagnosticHeaders: Record<string, string>
): Promise<Response> {
  let payload: CachedCatalog;
  try {
    payload = await withTimeout(inflight.promise, catalogBuildTimeoutMs(), "catalog_build_timeout");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (catalogInFlight.get(cacheKey)?.promise === inflight.promise) {
      catalogInFlight.delete(cacheKey);
    }
    const lastGood = catalogLastGood.get(cacheKey);
    if (msg === "catalog_build_timeout" && lastGood) {
      return new Response(lastGood.body, {
        status: lastGood.status,
        headers: mergeCatalogHeaders(corsHeaders, lastGood.headers, diagnosticHeaders, {
          "x-omniroute-catalog": "last-good",
        }),
      });
    }
    throw err;
  }
  return new Response(payload.body, {
    status: payload.status,
    headers: mergeCatalogHeaders(corsHeaders, payload.headers, diagnosticHeaders),
  });
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
  buildPayload: (request: Request) => Promise<CatalogPayload>,
  catalogSettings?: CatalogCacheOptions
): Promise<Response> {
  const { corsHeaders, diagnosticHeaders } = headerSources;
  dropCatalogCacheIfStateChanged();

  const cacheKey = buildCatalogCacheKey(request, catalogSettings);
  const now = Date.now();
  const cached = catalogCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return new Response(cached.body, {
      status: cached.status,
      headers: mergeCatalogHeaders(corsHeaders, cached.headers, diagnosticHeaders),
    });
  }

  // Stale-while-revalidate: an expired entry is still served immediately as long as
  // (a) it was a successful build — a cached error replayed as "stale" would mask an
  // intermittent failure behind a fake success forever — and (b) it is within the
  // staleness window, so a refresh that keeps failing eventually falls through to the
  // cold-path wait instead of pinning ancient data.
  const staleWindowMs =
    catalogSettings?.getStaleWhileRevalidateMs?.() ?? CATALOG_STALE_WHILE_REVALIDATE_MS;
  if (cached && cached.status === 200 && now - cached.expiresAt <= staleWindowMs) {
    startBackgroundRefresh(
      cacheKey,
      request,
      buildPayload,
      catalogSettings?.scheduleBackgroundRefresh ?? defaultBackgroundRefreshScheduler
    );
    return new Response(cached.body, {
      status: cached.status,
      headers: mergeCatalogHeaders(corsHeaders, cached.headers, diagnosticHeaders),
    });
  }

  const currentGeneration = getModelCatalogCacheVersion();
  let inflight = catalogInFlight.get(cacheKey);
  // Only join an in-flight build from the CURRENT generation. A build bound to an
  // older (pre-write) generation reflects stale state, so a new request starts a
  // fresh build instead of joining it.
  if (!inflight || inflight.generation !== currentGeneration) {
    const generation = currentGeneration;
    const promise = runBuilder(buildPayload, request).then((payload) =>
      storePayload(cacheKey, payload, generation)
    );
    inflight = { generation, promise };
    catalogInFlight.set(cacheKey, inflight);
    promise.finally(() => {
      if (catalogInFlight.get(cacheKey)?.promise === promise) catalogInFlight.delete(cacheKey);
    });
  }

  return awaitCatalogInFlight(cacheKey, inflight, corsHeaders, diagnosticHeaders);
}

// ── Test hooks ───────────────────────────────────────────────────────────────
// Not part of the public API; do not read from app code.

/** Resets the builder counter and every cached/in-flight entry. */
export function __resetCatalogBuilderRunsForTest(): void {
  _catalogBuilderRuns = 0;
  catalogCache.clear();
  catalogInFlight.clear();
  catalogLastGood.clear();
  lastSeenCatalogCacheVersion = getModelCatalogCacheVersion();
}

/** Counts full builder executions — proves concurrent requests share one run (#6408). */
export function __getCatalogBuilderRunsForTest(): number {
  return _catalogBuilderRuns;
}

/**
 * Marks every cached entry as expired `msAgo` milliseconds ago instead of sleeping
 * out the real TTL. Pass more than CATALOG_STALE_WHILE_REVALIDATE_MS to simulate an
 * entry that has aged past the stale-serving window.
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
  await Promise.all([...catalogInFlight.values()].map((entry) => entry.promise.catch(() => {})));
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
  // Bind to the current generation so the cold path still joins it (a stale
  // generation would be skipped as pre-write state and never awaited).
  catalogInFlight.set(buildCatalogCacheKey(request), {
    generation: getModelCatalogCacheVersion(),
    promise: rejected,
  });
}
