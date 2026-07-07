// Short-TTL request-coalescing cache for the unified model catalog (QA P1).
//
// Fixes the concurrency stampede the QA report measured: 12 concurrent identical
// `GET /v1/models` each rebuilt the full catalog (heavy DB/registry joins), so
// latency stair-stepped 363ms → 4668ms. With this wrapper, concurrent identical
// requests share ONE in-flight build, and the result is reused for a short TTL.
//
// Correctness — the response BODY varies by auth mode, prefix mode, and per-API-key
// model visibility, so EVERY axis that changes the body is folded into the cache
// key (the API key is hashed, never stored raw). 401/500 responses are never
// cached. The two cheap version signals (model-catalog + combos) invalidate the
// key immediately on change; the short TTL bounds staleness for the remaining
// DB-backed inputs (settings / connections / hidden models) without needing new
// invalidation counters wired through every write path.
import { getCombosCacheVersion } from "@/lib/db/readCache";
import { getModelCatalogVersion } from "@/lib/modelMetadataRegistry";
import { isModelCatalogNamesEnabled, getModelsCatalogPrefixMode } from "@/shared/utils/featureFlags";
import { extractApiKey } from "@/sse/services/auth";
import { isCodexModelCatalogClient } from "./catalogRequest";
import { createHash } from "node:crypto";

const CATALOG_CACHE_TTL_MS = 2_000; // within the QA-suggested 1500–3000ms window

type Snapshot = { status: number; bodyText: string; headers: [string, string][] };
type Entry = { expiresAt: number; snapshot: Snapshot };

const cache = new Map<string, Entry>();
const inflight = new Map<string, Promise<Snapshot>>();

/**
 * Compose the cache key from every request-derived axis that changes the body.
 * MUST include the api-key identity — per-key visibility filtering means a shared
 * cache without it would leak key A's permitted-model list to key B.
 */
function buildCatalogCacheKey(request: Request): string {
  const qp = new URL(request.url).searchParams.get("prefix");
  const prefix =
    qp === "alias" || qp === "canonical" || qp === "dual" ? qp : getModelsCatalogPrefixMode();
  const apiKey = extractApiKey(request);
  const keyHash = apiKey ? createHash("sha256").update(apiKey).digest("hex").slice(0, 16) : "anon";
  return [
    "v1",
    `prefix=${prefix}`,
    `names=${isModelCatalogNamesEnabled() ? 1 : 0}`,
    `codex=${isCodexModelCatalogClient(request) ? 1 : 0}`,
    `key=${keyHash}`,
    `cat=${getModelCatalogVersion()}`,
    `combo=${getCombosCacheVersion()}`,
  ].join("|");
}

function snapshotToResponse(s: Snapshot): Response {
  // Fresh Response from the stored body text + headers — safe to mutate by callers.
  return new Response(s.bodyText, { status: s.status, headers: new Headers(s.headers) });
}

/**
 * Run `build()` behind a short-TTL coalescing cache. Returns a FRESH Response
 * (never the cached snapshot object) plus the cache status + build duration so
 * the caller can emit diagnostic headers.
 */
export async function getCoalescedCatalog(
  request: Request,
  build: () => Promise<Response>
): Promise<{ response: Response; cacheStatus: "HIT" | "MISS"; buildMs: number }> {
  const key = buildCatalogCacheKey(request);

  const fresh = cache.get(key);
  if (fresh && Date.now() <= fresh.expiresAt) {
    return { response: snapshotToResponse(fresh.snapshot), cacheStatus: "HIT", buildMs: 0 };
  }

  const existing = inflight.get(key);
  if (existing) {
    // Coalesce: a build for this exact key is already running — share its result.
    const snapshot = await existing;
    return { response: snapshotToResponse(snapshot), cacheStatus: "HIT", buildMs: 0 };
  }

  const started = Date.now();
  const promise = (async (): Promise<Snapshot> => {
    const resp = await build();
    const bodyText = await resp.text();
    return { status: resp.status, bodyText, headers: [...resp.headers.entries()] };
  })();
  inflight.set(key, promise);

  try {
    const snapshot = await promise;
    // Only cache a full successful catalog so an auth/error transient can't be pinned.
    if (snapshot.status === 200) {
      cache.set(key, { expiresAt: Date.now() + CATALOG_CACHE_TTL_MS, snapshot });
    }
    return {
      response: snapshotToResponse(snapshot),
      cacheStatus: "MISS",
      buildMs: Date.now() - started,
    };
  } finally {
    inflight.delete(key);
  }
}
