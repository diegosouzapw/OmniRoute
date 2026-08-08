/**
 * Per-attempt proxy binding for web search provider calls.
 *
 * Extracted from ../search.ts (tryProvider) to keep the provider-dispatch
 * chokepoint under the frozen file-size cap. Resolves the proxy for a given
 * connection/apiKey/provider triple, wraps a fetch in that proxy context,
 * and emits a sanitized proxy event for observability (never includes
 * query, API key, or proxy credentials).
 */

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";

/** Resolved proxy binding for a single provider attempt. */
export interface ResolvedSearchProxy {
  proxy: unknown;
  proxyLevel: string;
}

/**
 * Resolve the proxy for the selected connection. Uses the existing
 * resolveProxyForConnection(connectionId, apiKeyId, providerId) precedence
 * chain so per-key, account, provider, combo, and global proxy rules apply
 * consistently with other data-plane routes.
 *
 * Never throws — proxy resolution failure must not block the search.
 */
export async function resolveSearchProxy(
  connectionId: string | undefined,
  apiKeyId: string | undefined,
  providerId: string
): Promise<ResolvedSearchProxy> {
  if (!connectionId) {
    return { proxy: null, proxyLevel: "direct" };
  }
  try {
    const { resolveProxyForConnection } = await import("@/lib/db/settings");
    const proxyInfo = await resolveProxyForConnection(connectionId, apiKeyId, providerId);
    return { proxy: proxyInfo.proxy, proxyLevel: proxyInfo.level || "direct" };
  } catch {
    return { proxy: null, proxyLevel: "direct" };
  }
}

/**
 * Run a fetch, routed through the resolved proxy context when one is set.
 * Wraps the patched globalThis.fetch so the upstream call egresses via the
 * configured proxy instead of directly.
 */
export async function fetchWithSearchProxy(
  proxy: unknown,
  doFetch: () => Promise<Response>
): Promise<Response> {
  if (!proxy) return doFetch();
  const { runWithProxyContext } = await import("../../utils/proxyFetch.ts");
  return runWithProxyContext(proxy, doFetch);
}

/**
 * Emit a sanitized proxy event for a search provider attempt.
 * Never includes query, API key, proxy username, or proxy password.
 */
export async function emitSearchProxyEvent(
  provider: string,
  connectionId: string | undefined,
  proxy: unknown,
  proxyLevel: string,
  targetUrl: string,
  startTime: number,
  status: string
): Promise<void> {
  try {
    const { logProxyEvent } = await import("@/lib/proxyLogger");
    let targetOrigin = "";
    let targetPath = "";
    try {
      const u = new URL(targetUrl);
      targetOrigin = u.origin;
      targetPath = u.pathname;
    } catch {
      targetOrigin = targetUrl.slice(0, 80);
    }
    const proxyRecord =
      proxy && typeof proxy === "object" ? (proxy as Record<string, unknown>) : null;
    const proxyInfo = proxyRecord
      ? {
          type: String(proxyRecord.type || "http"),
          host: String(proxyRecord.host || ""),
          port: Number(proxyRecord.port || 0),
        }
      : null;
    logProxyEvent({
      status,
      proxy: proxyInfo,
      level: proxyLevel,
      levelId: connectionId || null,
      provider: provider || null,
      targetUrl: `${targetOrigin}${targetPath}`,
      latencyMs: Date.now() - startTime,
      connectionId: connectionId || null,
      account: connectionId ? connectionId.slice(0, 8) : null,
    });
  } catch {
    // Non-critical — proxy logging must not block search response
  }
}

/** Loose result shape mirroring SearchHandlerResult in ../search.ts. */
export interface ProviderFetchResult {
  success: boolean;
  status?: number;
  error?: string;
  data?: {
    provider: string;
    query: string;
    results: SearchResult[];
    answer: null;
    usage: { queries_used: number; search_cost_usd: number };
    metrics: { response_time_ms: number; upstream_latency_ms: number; total_results_available: number | null };
    errors: [];
  };
}

/** Minimal logger shape used by the search handlers (pino-compatible). */
export interface SearchLog {
  info: (tag: string, message: string) => void;
  error: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
}

export interface ExecuteProviderFetchParams {
  config: SearchProviderConfig;
  url: string;
  init: RequestInit;
  controller: AbortController;
  timer: ReturnType<typeof setTimeout>;
  query: string;
  searchType: string;
  maxResults: number;
  startTime: number;
  connectionId?: string;
  proxy: unknown;
  proxyLevel: string;
  log?: SearchLog;
  normalize: (
    providerId: string,
    data: unknown,
    query: string,
    searchType: string
  ) => { results: SearchResult[]; totalResults: number | null };
}

/**
 * Perform the upstream search HTTP call (through the resolved proxy, if any),
 * then handle the success/error/exception branches: call-log persistence,
 * sanitized proxy-event emission, and SearchHandlerResult construction.
 * This is the single chokepoint tryProvider() delegates to after building
 * the request and resolving the proxy — keeps search.ts to wiring only.
 */
export async function executeProviderFetch(p: ExecuteProviderFetchParams): Promise<ProviderFetchResult> {
  const { config, url, init, controller, timer, query, searchType, maxResults, startTime } = p;
  const { connectionId, proxy, proxyLevel, log, normalize } = p;
  const emitEvent = (status: string) =>
    emitSearchProxyEvent(config.id, connectionId, proxy, proxyLevel, url, startTime, status);
  const logCall = (fields: Record<string, unknown>) =>
    saveCallLog({
      method: config.method,
      path: "/v1/search",
      model: config.id,
      provider: config.id,
      connectionId: connectionId || null,
      requestType: "search",
      requestBody: { query: query.slice(0, 200), search_type: searchType, max_results: maxResults },
      ...fields,
    }).catch(() => {
      /* non-critical — logging must not block search response */
    });

  try {
    const response = await fetchWithSearchProxy(proxy, () =>
      fetch(url, { ...init, signal: controller.signal })
    );
    clearTimeout(timer);

    if (!response.ok) {
      const errorText = await response.text();
      if (log) {
        log.error("SEARCH", `${config.id} error ${response.status}: ${errorText.slice(0, 200)}`);
      }
      logCall({ status: response.status, duration: Date.now() - startTime, error: errorText.slice(0, 500) });
      await emitEvent("error");
      return {
        success: false,
        status: response.status,
        error: `Search provider ${config.id} returned ${response.status}`,
      };
    }

    const data = await response.json();
    const normalized = normalize(config.id, data, query, searchType);
    const results = normalized.results.slice(0, maxResults);
    const duration = Date.now() - startTime;

    logCall({
      status: 200,
      duration,
      tokens: { prompt_tokens: 0, completion_tokens: 0 },
      responseBody: { results_count: results.length, cached: false },
    });
    await emitEvent("success");

    return {
      success: true,
      data: {
        provider: config.id,
        query,
        results,
        answer: null,
        usage: { queries_used: 1, search_cost_usd: config.costPerQuery },
        metrics: {
          response_time_ms: duration,
          upstream_latency_ms: duration,
          total_results_available: normalized.totalResults,
        },
        errors: [],
      },
    };
  } catch (err: unknown) {
    clearTimeout(timer);
    const error = err instanceof Error ? err : new Error(String(err));
    const isTimeout = error.name === "AbortError";
    if (log) {
      log.error("SEARCH", `${config.id} ${isTimeout ? "timeout" : "fetch error"}: ${error.message}`);
    }
    logCall({ status: isTimeout ? 504 : 502, duration: Date.now() - startTime, error: error.message });
    await emitEvent(isTimeout ? "timeout" : "error");
    return {
      success: false,
      status: isTimeout ? 504 : 502,
      error: `Search provider ${isTimeout ? "timeout" : "error"}: ${sanitizeErrorMessage(error.message)}`,
    };
  }
}
