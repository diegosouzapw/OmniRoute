/**
 * Cached + circuit-breaker-gated retrieve for OmniContext (fail-open friendly).
 */
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import { retrieveForProject, type RetrieveParams, type RetrieveResult } from "./retrieve";
import { retrieveHybrid } from "./hybridRetrieve";
import {
  computeRetrieveCacheKey,
  getOrCoalesceRetrieve,
  peekCacheEntry,
  OMNICONTEXT_RETRIEVE_CACHE_TTL_MS,
} from "./cache";
import { recordRetrieve } from "./metrics";
import { getOmniContextSettings } from "./settings";

export const OMNICONTEXT_RETRIEVE_BREAKER_NAME = "omnicontext-retrieve";

export function getOmniContextRetrieveBreaker() {
  return getCircuitBreaker(OMNICONTEXT_RETRIEVE_BREAKER_NAME, {
    failureThreshold: 5,
    resetTimeout: 30_000,
    halfOpenRequests: 1,
  });
}

export interface CachedRetrieveResult {
  result: RetrieveResult | null;
  cached: boolean;
  skippedReason?: "circuit_open" | "breaker_error";
  latencyMs: number;
}

async function doRetrieve(params: RetrieveParams): Promise<RetrieveResult> {
  const settings = await getOmniContextSettings().catch(() => null);
  if (settings?.backend === "remote" && settings.remoteBaseUrl) {
    const { remoteRetrieve } = await import("./remoteClient");
    const remote = await remoteRetrieve(
      {
        baseUrl: settings.remoteBaseUrl,
        apiKey: settings.remoteApiKey || undefined,
        timeoutMs: settings.remoteTimeoutMs,
      },
      {
        projectId: params.projectId,
        query: params.query || "",
        limit: params.limit,
      }
    );
    return {
      stablePrefix: remote.stablePrefix
        ? ({
            id: remote.stablePrefix.id,
            title: remote.stablePrefix.title,
            body: remote.stablePrefix.body,
            type: "stable_prefix",
            trustTier: "stable",
            status: "active",
            projectId: params.projectId,
          } as RetrieveResult["stablePrefix"])
        : null,
      dynamic: remote.artifacts.map((a) => ({
        artifact: {
          id: a.id,
          title: a.title,
          body: a.body,
          type: a.type,
          trustTier: "member",
          status: "active",
          projectId: params.projectId,
        } as RetrieveResult["dynamic"][number]["artifact"],
        rank: a.rank ?? 0.5,
      })),
      activeHandoff: null,
    };
  }
  if (settings?.hybridRetrieve) return retrieveHybrid(params);
  return retrieveForProject(params);
}

/**
 * Retrieve with TTL cache + circuit breaker.
 * Warm cache is served even when the breaker is open (fail-open).
 */
export async function retrieveForProjectCached(
  params: RetrieveParams,
  options: { ttlMs?: number; hybrid?: boolean } = {}
): Promise<CachedRetrieveResult> {
  const started = Date.now();
  const ttlMs = options.ttlMs ?? OMNICONTEXT_RETRIEVE_CACHE_TTL_MS;
  const key = computeRetrieveCacheKey({
    ...params,
    query: `${params.query || ""}|h=${options.hybrid === undefined ? "auto" : options.hybrid ? 1 : 0}`,
  });
  const breaker = getOmniContextRetrieveBreaker();

  if (!breaker.canExecute()) {
    const peeked = peekCacheEntry<RetrieveResult>(key);
    const latencyMs = Date.now() - started;
    if (peeked) {
      recordRetrieve({ latencyMs, cached: true });
      return { result: peeked, cached: true, latencyMs };
    }
    recordRetrieve({ latencyMs, cached: false });
    return { result: null, cached: false, skippedReason: "circuit_open", latencyMs };
  }

  try {
    const { data, cached } = await getOrCoalesceRetrieve(key, ttlMs, async () => {
      return breaker.execute(async () => {
        if (options.hybrid === true) return retrieveHybrid(params);
        if (options.hybrid === false) return retrieveForProject(params);
        return doRetrieve(params);
      });
    });
    const latencyMs = Date.now() - started;
    recordRetrieve({ latencyMs, cached });
    return { result: data, cached, latencyMs };
  } catch {
    const latencyMs = Date.now() - started;
    recordRetrieve({ latencyMs, cached: false });
    return { result: null, cached: false, skippedReason: "breaker_error", latencyMs };
  }
}
