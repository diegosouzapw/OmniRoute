/**
 * Published OpenCode endpoint, discovered at runtime instead of pinned at build time.
 *
 * The OpenCode client reads `https://models.opencode.ai/api.json` and sends its requests to
 * the `api` field published there for its provider. When the publisher moves that endpoint,
 * a pinned base URL keeps hitting the old one and every request is refused. This module
 * follows the same catalog, so OmniRoute moves with the client. The value rarely changes:
 * it is re-read every six hours, and right away when a request is refused
 * (`requestPublishedEndpointRefresh`), which is how a move shows up first.
 *
 * Resolution order for `opencode` / `opencode-zen` (the executor applies the connection's
 * own base URL first, through `resolveBaseUrl`):
 *   fresh catalog value → last value persisted on disk → registry `baseUrl`.
 * `opencode-go` is left on its registry URL: its published endpoint was never measured.
 *
 * Same shape as `opencodeCliVersion.ts`: the sync getter never networks, a stale or cold
 * cache starts one coalesced background refresh, and nothing ever throws. The last good
 * value is persisted under `DATA_DIR/cache` (as `cursorAgentCliVersion.ts` does) so a
 * restart while the catalog is unreachable keeps the moved endpoint.
 *
 * The same catalog read carries each model's surface (`provider.npm`); that map lives in
 * `opencodePublishedCatalog.ts`, which `open-sse/config/providerModels.ts` reads without
 * pulling this module's `node:` imports into the client bundle.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import {
  clearPublishedCatalogNpm,
  readPublishedNpmByModel,
  replacePublishedCatalogNpm,
  setPublishedCatalogRefreshTrigger,
} from "./opencodePublishedCatalog.ts";

const CATALOG_URL = "https://models.opencode.ai/api.json";
const CATALOG_KEY = "opencode";
const PUBLISHED_HOST = "opencode.ai";
const CACHE_FILE = "opencode-published-endpoint.json";
const FETCH_TIMEOUT_MS = 5_000;
/** Floor between two forced re-reads, so a run of refusals costs one catalog read. */
const FORCED_REFRESH_FLOOR_MS = 30_000;

/** Same rhythm as `opencodeCliVersion.ts`; a refusal re-reads sooner. */
const OPENCODE_PUBLISHED_ENDPOINT_TTL_MS = 6 * 60 * 60 * 1000;

/** Providers whose base URL follows the published endpoint. `opencode-go` is excluded. */
const FOLLOWING_PROVIDERS = new Set(["opencode", "oc", "opencode-zen"]);

/** Marker the OpenCode client itself sends as its bearer when it has no key. */
const DEFAULT_ANONYMOUS_TOKEN = "public";

type PublishedEndpointSource = "catalog" | "persisted";

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;
type CachedEndpoint = { url: string; fetchedAt: number; source: PublishedEndpointSource };

let cached: CachedEndpoint | null = null;
let diskLoaded = false;
let inFlight: Promise<string | undefined> | null = null;
/** Start of the last catalog read, success or not: a down catalog is not re-read per request. */
let lastAttemptAt = 0;
let testFetch: FetchLike | null = null;
let testCacheDir: string | null = null;

/**
 * Accept only `https://opencode.ai/...` with no credentials and no explicit port. A
 * catalog that published anything else (another host, plain http) would otherwise point
 * the stored key at it — the value is ignored and the previous one stays in place.
 */
function isAcceptedPublishedEndpoint(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch {
    return false;
  }
  return (
    parsed.protocol === "https:" &&
    parsed.hostname === PUBLISHED_HOST &&
    parsed.port === "" &&
    parsed.username === "" &&
    parsed.password === ""
  );
}

function normalize(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/** The catalog's `api` field for this provider, or `undefined` when absent or refused. */
function readPublishedEndpoint(catalog: unknown, providerId = CATALOG_KEY) {
  if (!catalog || typeof catalog !== "object") return undefined;
  const entries = catalog as Record<string, { api?: unknown } | undefined>;
  for (const key of [providerId, CATALOG_KEY]) {
    const api = entries[key]?.api;
    if (isAcceptedPublishedEndpoint(api)) return normalize(api);
  }
  return undefined;
}

function resolveCacheDir(): string {
  if (testCacheDir) return testCacheDir;
  const dataDir = process.env.DATA_DIR?.trim();
  return dataDir ? join(dataDir, "cache") : join(homedir(), ".omniroute", "cache");
}

function loadPersisted(): void {
  if (diskLoaded) return;
  diskLoaded = true;
  // Under a test runner only an injected directory is read, as only an injected fetch is used.
  if (!testCacheDir && underTestRunner()) return;
  try {
    const raw = JSON.parse(readFileSync(join(resolveCacheDir(), CACHE_FILE), "utf8"));
    if (!cached && isAcceptedPublishedEndpoint(raw?.url)) {
      // A persisted value is a fallback, never fresh: the first read refreshes it.
      cached = {
        url: normalize(raw.url),
        fetchedAt: 0,
        source: "persisted",
      };
      clearPublishedCatalogNpm();
    }
  } catch {
    // No file yet (first start) or unreadable: the registry URL stays the fallback.
  }
}

function persist(url: string, fetchedAt: number): void {
  try {
    const dir = resolveCacheDir();
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, CACHE_FILE), JSON.stringify({ url, fetchedAt }, null, 2));
  } catch {
    // Best-effort: the in-memory value still serves this process.
  }
}

function isFresh(entry: CachedEndpoint | null): boolean {
  return (
    entry?.source === "catalog" && Date.now() - entry.fetchedAt < OPENCODE_PUBLISHED_ENDPOINT_TTL_MS
  );
}

/**
 * Test runners stub `globalThis.fetch` and count dispatches; a background catalog read
 * would be counted as one. Under a runner only an injected fetch is ever used.
 */
function underTestRunner(): boolean {
  return (
    Boolean(process.env.NODE_TEST_CONTEXT || process.env.VITEST) || process.env.NODE_ENV === "test"
  );
}

function backgroundRefreshAllowed(): boolean {
  return Boolean(testFetch) || !underTestRunner();
}

/**
 * Re-read the catalog (coalesced: concurrent callers share one fetch; never rejects).
 * A fresh value is returned as-is unless `force` is set. Failure keeps what was there.
 */
export function refreshPublishedEndpoint(options?: {
  force?: boolean;
}): Promise<string | undefined> {
  loadPersisted();
  if (!options?.force && isFresh(cached)) return Promise.resolve(cached?.url);
  if (inFlight) return inFlight;
  lastAttemptAt = Date.now();
  const fetchImpl: FetchLike = testFetch ?? globalThis.fetch;
  const current = (async () => {
    try {
      const response = await fetchImpl(CATALOG_URL, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      const catalog = response.ok ? await response.json() : undefined;
      const url = response.ok ? readPublishedEndpoint(catalog) : undefined;
      const npmByModel = readPublishedNpmByModel(catalog);
      if (url) {
        const fetchedAt = Date.now();
        cached = { url, fetchedAt, source: "catalog" };
        replacePublishedCatalogNpm(npmByModel);
        persist(url, fetchedAt);
      } else if (npmByModel.size > 0) {
        // The catalog answered but moved no endpoint: the surface map is still usable.
        const fetchedAt = cached?.fetchedAt ?? 0;
        cached = {
          url: cached?.url ?? "",
          fetchedAt,
          source: cached?.source ?? "persisted",
        };
        replacePublishedCatalogNpm(npmByModel);
      }
    } catch {
      // Catalog unreachable or not JSON: the persisted or registry value stays in place.
    }
    return cached?.url;
  })();
  inFlight = current;
  void current.finally(() => {
    if (inFlight === current) inFlight = null;
  });
  return current;
}

/** Fire-and-forget forced re-read, e.g. after a refusal. No-op under a test runner. */
export function requestPublishedEndpointRefresh(): void {
  if (!backgroundRefreshAllowed()) return;
  if (Date.now() - lastAttemptAt < FORCED_REFRESH_FLOOR_MS) return;
  void refreshPublishedEndpoint({ force: true });
}

/**
 * Cold start: with no value in memory or on disk, wait for one catalog read (bounded by the
 * fetch timeout) so the first request does not go to the registry URL. Costs nothing once a
 * value exists, and a catalog that stays down is waited for once per refresh floor at most.
 */
export async function ensurePublishedEndpoint(
  providerId: string | null | undefined
): Promise<void> {
  if (!providerId || !FOLLOWING_PROVIDERS.has(providerId) || !backgroundRefreshAllowed()) return;
  loadPersisted();
  if (cached) return;
  // A catalog read is already in flight (started by the sync surface lookup on this
  // same request): join it instead of falling back to the registry URL. Costs no
  // extra fetch; concurrent callers share the one in-flight read.
  if (inFlight) {
    await refreshPublishedEndpoint();
    return;
  }
  if (Date.now() - lastAttemptAt < FORCED_REFRESH_FLOOR_MS) return;
  await refreshPublishedEndpoint();
}

/**
 * Sync hot path: the published endpoint for this provider, or `undefined` to keep the
 * registry URL. Never networks; a stale or missing value starts one background refresh,
 * at most once per TTL even while the catalog stays unreachable.
 */
export function getPublishedEndpoint(providerId: string | null | undefined): string | undefined {
  if (!providerId || !FOLLOWING_PROVIDERS.has(providerId)) return undefined;
  loadPersisted();
  const due = Date.now() - lastAttemptAt >= OPENCODE_PUBLISHED_ENDPOINT_TTL_MS;
  if (!isFresh(cached) && due && backgroundRefreshAllowed()) void refreshPublishedEndpoint();
  return cached?.url;
}

/**
 * Upstream auth headers. A key goes out as `Authorization: Bearer` on every surface but
 * Messages (`claude`), which keeps `x-api-key`. Without a key, the chat and Responses
 * surfaces of `opencode` / `opencode-zen` carry the client's own anonymous marker
 * (`Bearer public`, overridable with OPENCODE_ANONYMOUS_TOKEN).
 */
export function resolveOpencodeAuthHeaders(
  key: string | null | undefined,
  requestFormat: string | null | undefined,
  providerId: string | null | undefined
): Record<string, string> {
  if (key) {
    return requestFormat === "claude" ? { "x-api-key": key } : { Authorization: `Bearer ${key}` };
  }
  if (requestFormat === "claude" || !providerId || !FOLLOWING_PROVIDERS.has(providerId)) return {};
  const token = process.env.OPENCODE_ANONYMOUS_TOKEN?.trim() || DEFAULT_ANONYMOUS_TOKEN;
  return { Authorization: `Bearer ${token}` };
}

/** Test seam: forget every cached, persisted-in-memory and in-flight value. */
export function resetPublishedEndpointCache(): void {
  cached = null;
  diskLoaded = false;
  inFlight = null;
  lastAttemptAt = 0;
  testFetch = null;
  testCacheDir = null;
  clearPublishedCatalogNpm();
}

/**
 * Test seam. `fetchImpl` replaces the network entirely (and enables background refresh
 * under a runner); `cacheDir` moves the persisted file; `url` seeds the memory cache.
 */
export function configurePublishedEndpointForTests(options: {
  url?: string;
  fetchedAt?: number;
  fetchImpl?: FetchLike;
  cacheDir?: string;
}): void {
  if (options.fetchImpl) testFetch = options.fetchImpl;
  if (options.cacheDir) testCacheDir = options.cacheDir;
  if (options.url !== undefined) seedPublishedUrl(options.url, options.fetchedAt);
}

/** Test seam helper: seed the memory cache with an accepted endpoint URL. */
function seedPublishedUrl(url: string, fetchedAt?: number): void {
  if (!isAcceptedPublishedEndpoint(url)) {
    throw new TypeError(`Invalid published endpoint: ${url}`);
  }
  cached = {
    url: normalize(url),
    fetchedAt: fetchedAt ?? Date.now(),
    source: "catalog",
  };
  diskLoaded = true;
}

/**
 * The endpoint module owns the catalog reads; the sync surface lookup in
 * `opencodePublishedCatalog.ts` hands its refresh rhythm back here. Same check that lookup
 * ran while it lived in this module: a stale or cold surface map starts one coalesced
 * background refresh, under the same floor and test-runner guards.
 */
setPublishedCatalogRefreshTrigger(() => {
  loadPersisted();
  const due = Date.now() - lastAttemptAt >= OPENCODE_PUBLISHED_ENDPOINT_TTL_MS;
  if (!isFresh(cached) && due && backgroundRefreshAllowed()) void refreshPublishedEndpoint();
});
