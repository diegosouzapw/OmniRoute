/**
 * proxyFallback.ts — Smart Proxy Fallback for Provider Validation
 *
 * When a direct fetch to a provider fails and no explicit proxy was configured,
 * this module automatically gathers proxy candidates from all available sources,
 * tests them in parallel against the provider URL, and returns the first working one.
 * Results are cached per target URL to avoid repeated probing without letting
 * a failed path poison a different endpoint on the same API host.
 */

import { fetch as undiciFetch } from "undici";
import { createProxyDispatcher, normalizeProxyUrl } from "./proxyDispatcher.ts";
import { resolveProxyForScopeFromRegistry, listProxies, listOneproxyProxies } from "@/lib/localDb";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CacheEntry {
  proxyUrl: string;
  expiresAt: number;
}

interface ProxyShape {
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

const PROXY_FALLBACK_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type ProxyFallbackTestHooks = {
  getProxyCandidates?: (targetUrl?: string) => Promise<string[]>;
  testSingleProxy?: (
    proxyUrl: string,
    targetUrl: string,
    timeoutMs?: number
  ) => Promise<{ ok: boolean; latencyMs: number | null }>;
};

let proxyFallbackTestHooks: ProxyFallbackTestHooks | null = null;

/**
 * Clear the in-memory proxy fallback cache.
 * Useful for testing or admin operations.
 */
export function clearProxyFallbackCache(): void {
  PROXY_FALLBACK_CACHE.clear();
}

export function __setProxyFallbackTestHooks(hooks: ProxyFallbackTestHooks | null): void {
  proxyFallbackTestHooks = hooks;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a full proxy URL string from a proxy record's fields.
 */
function proxyRecordToUrl(proxy: ProxyShape): string {
  const auth =
    proxy.username
      ? `${encodeURIComponent(proxy.username)}:${encodeURIComponent(proxy.password || "")}@`
      : "";
  return `${proxy.type}://${auth}${proxy.host}:${proxy.port}`;
}

function cacheKeyForTarget(targetHostname: string, targetUrl: string): string {
  try {
    const url = new URL(targetUrl);
    const normalizedPath = `${url.pathname || "/"}${url.search}`;
    return `${url.protocol}//${url.host}${normalizedPath}`;
  } catch {
    return targetHostname.toLowerCase();
  }
}

/**
 * Resolve the environment proxy URL (HTTP_PROXY / HTTPS_PROXY / ALL_PROXY)
 * for the given target URL. Returns null if no env proxy is configured or
 * the target matches NO_PROXY.
 */
function resolveEnvProxyUrl(targetUrl: string): string | null {
  // Honour NO_PROXY
  const noProxy = process.env.NO_PROXY || process.env.no_proxy;
  if (noProxy) {
    let hostname: string | undefined;
    try {
      hostname = new URL(targetUrl).hostname.toLowerCase();
    } catch {
      return null;
    }
    const patterns = noProxy
      .split(",")
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean);
    const match = patterns.some((pattern) => {
      if (pattern === "*") return true;
      if (pattern.includes("*")) {
        const re = new RegExp(
          "^" +
            pattern
              .split("*")
              .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .join(".*") +
            "$"
        );
        return re.test(hostname!);
      }
      return hostname === pattern || hostname!.endsWith(`.${pattern}`);
    });
    if (match) return null;
  }

  let protocol: string;
  try {
    protocol = new URL(targetUrl).protocol;
  } catch {
    return null;
  }

  const proxyUrl =
    protocol === "https:"
      ? process.env.HTTPS_PROXY ||
        process.env.https_proxy ||
        process.env.ALL_PROXY ||
        process.env.all_proxy
      : process.env.HTTP_PROXY ||
        process.env.http_proxy ||
        process.env.ALL_PROXY ||
        process.env.all_proxy;

  if (!proxyUrl) return null;
  try {
    return normalizeProxyUrl(proxyUrl, "environment proxy");
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Candidate collection
// ---------------------------------------------------------------------------

/**
 * Collect all available proxy candidates from every source:
 * 1. Global proxy from registry
 * 2. All user-configured proxies from the proxy registry
 * 3. Top 5 1proxy marketplace proxies
 * 4. Environment proxy (HTTP_PROXY / HTTPS_PROXY / ALL_PROXY)
 *
 * @param targetUrl Optional. When provided, the env proxy is resolved for this URL.
 * @returns Deduplicated array of normalized proxy URLs.
 */
export async function getProxyCandidates(targetUrl?: string): Promise<string[]> {
  const candidates = new Set<string>();

  // 1. Global proxy from registry
  try {
    const globalProxy = await resolveProxyForScopeFromRegistry("global");
    if (globalProxy?.proxy) {
      candidates.add(proxyRecordToUrl(globalProxy.proxy as ProxyShape));
    }
  } catch {
    // Table may not exist yet
  }

  // 2. All user-configured proxies (include secrets for auth)
  try {
    const { items: allProxies } = await listProxies({ includeSecrets: true });
    for (const p of allProxies) {
      if (p.host && p.port) {
        candidates.add(proxyRecordToUrl(p as unknown as ProxyShape));
      }
    }
  } catch {
    // Table may not exist yet
  }

  // 3. Top 5 1proxy marketplace proxies
  try {
    const oneproxyProxies = await listOneproxyProxies({ limit: 5 });
    for (const p of oneproxyProxies) {
      if (p.host && p.port) {
        candidates.add(proxyRecordToUrl(p as unknown as ProxyShape));
      }
    }
  } catch {
    // Table may not exist yet
  }

  // 4. Environment proxy (needs targetUrl to determine protocol)
  if (targetUrl) {
    try {
      const envProxy = resolveEnvProxyUrl(targetUrl);
      if (envProxy) candidates.add(envProxy);
    } catch {
      // Ignore env proxy errors
    }
  }

  return Array.from(candidates);
}

// ---------------------------------------------------------------------------
// Proxy testing
// ---------------------------------------------------------------------------

/**
 * Test a single proxy against a target URL.
 * Makes a lightweight HEAD request through the proxy with a short timeout.
 *
 * @param proxyUrl  The proxy URL (e.g. "http://1.2.3.4:8080")
 * @param targetUrl The provider URL to test reachability to
 * @param timeoutMs Timeout in milliseconds (default 3000)
 * @returns Object with success status and latency in ms
 */
export async function testSingleProxy(
  proxyUrl: string,
  targetUrl: string,
  timeoutMs = 3000
): Promise<{ ok: boolean; latencyMs: number | null }> {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const dispatcher = createProxyDispatcher(proxyUrl);
    await undiciFetch(targetUrl, {
      method: "HEAD",
      signal: controller.signal,
      dispatcher,
      headers: {
        "User-Agent": "OmniRoute/1.0",
      },
    });

    clearTimeout(timeout);
    const latencyMs = Date.now() - start;

    // Any response (including 4xx) means the proxy can reach the target
    return { ok: true, latencyMs };
  } catch {
    return { ok: false, latencyMs: null };
  }
}

/**
 * Bulk test multiple proxies against a target URL.
 * Does NOT cache results (for manual API use).
 *
 * @param targetUrl The provider URL to test reachability to
 * @param proxyUrls Array of proxy URLs to test
 * @returns Array of results, one per proxy
 */
export async function testProxiesAgainstTarget(
  targetUrl: string,
  proxyUrls: string[]
): Promise<Array<{ proxyUrl: string; ok: boolean; latencyMs: number | null }>> {
  if (proxyUrls.length === 0) return [];

  const results = await Promise.allSettled(
    proxyUrls.map(async (proxyUrl) => {
      const result = await testSingleProxy(proxyUrl, targetUrl);
      return { proxyUrl, ...result };
    })
  );

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { proxyUrl: "unknown", ok: false, latencyMs: null }
  );
}

// ---------------------------------------------------------------------------
// Find working proxy (with caching)
// ---------------------------------------------------------------------------

/**
 * Find a working proxy for the given target hostname and URL.
 *
 * Collects all proxy candidates, tests them in parallel against the provider
 * URL, and returns the first one that responds. Results are cached per target
 * URL for 5 minutes to avoid repeated probing while keeping different
 * endpoints on a shared host independent.
 *
 * @param targetHostname The provider hostname (used as cache key)
 * @param targetUrl      The full provider URL to test against
 * @returns A working proxy URL, or null if none found
 */
export async function findWorkingProxy(
  targetHostname: string,
  targetUrl: string
): Promise<string | null> {
  if (!targetHostname) return null;
  const cacheKey = cacheKeyForTarget(targetHostname, targetUrl);

  // Check cache first
  const cached = PROXY_FALLBACK_CACHE.get(cacheKey);
  if (cached) {
    if (cached.expiresAt > Date.now()) {
      // Cached hit — return the proxy (or null if previously all failed)
      return cached.proxyUrl || null;
    }
    // Expired entry — remove it and re-probe
    PROXY_FALLBACK_CACHE.delete(cacheKey);
  }

  // Collect candidates
  const candidates = await (proxyFallbackTestHooks?.getProxyCandidates ?? getProxyCandidates)(
    targetUrl
  );
  if (candidates.length === 0) {
    return null;
  }

  // Test all in parallel, return first that works
  const results = await Promise.allSettled(
    candidates.map(async (proxyUrl) => {
      const { ok } = await (proxyFallbackTestHooks?.testSingleProxy ?? testSingleProxy)(
        proxyUrl,
        targetUrl
      );
      return { proxyUrl, ok };
    })
  );

  const working = results.find(
    (r) => r.status === "fulfilled" && r.value.ok
  );

  if (working && working.status === "fulfilled") {
    const proxyUrl = working.value.proxyUrl;
    // Cache the working proxy
    PROXY_FALLBACK_CACHE.set(cacheKey, {
      proxyUrl,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });
    return proxyUrl;
  }

  // All failed — cache the negative result to avoid re-probing too often
  PROXY_FALLBACK_CACHE.set(cacheKey, {
    proxyUrl: "",
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return null;
}

// ---------------------------------------------------------------------------
// Auto-selection fallback (used by resolveProxyForConnection as step 11)
// ---------------------------------------------------------------------------

/**
 * Try to auto-select a working proxy as a last-resort fallback when no
 * explicit proxy was configured. This wraps getProxyCandidates() and
 * findWorkingProxy() into a single call that returns a result compatible
 * with resolveProxyForConnection()'s return type.
 *
 * @param _connectionId  Optional connection ID (reserved for future use).
 * @returns A proxy resolution result with level "autoSelect", or null.
 */
export async function selectWorkingProxyFallback(
  _connectionId?: string
): Promise<{
  proxy: { type: string; host: string; port: number; username: string; password: string } | null;
  level: string;
  levelId: string | null;
  source: string;
} | null> {
  // #3332: auto-selection is opt-in. Without this gate, any single proxy in the
  // registry silently becomes a global fallback for ALL connections (ignoring
  // assignments / per-connection proxy_enabled). Default OFF — only run when the
  // operator explicitly enables PROXY_AUTO_SELECT_ENABLED.
  if (!isFeatureFlagEnabled("PROXY_AUTO_SELECT_ENABLED")) return null;

  const candidates = await getProxyCandidates();
  if (candidates.length === 0) return null;

  // Use a well-known AI API endpoint as the test target. If a proxy can
  // reach this, it is likely suitable for routing AI traffic.
  const targetUrl = "https://api.openai.com/v1/models";
  const targetHostname = "api.openai.com";

  const workingUrl = await findWorkingProxy(targetHostname, targetUrl);
  if (!workingUrl) return null;

  try {
    const url = new URL(workingUrl);
    return {
      proxy: {
        type: url.protocol.replace(":", "") || "http",
        host: url.hostname,
        port: parseInt(url.port, 10) || (url.protocol === "https:" ? 443 : 80),
        username: url.username ? decodeURIComponent(url.username) : "",
        password: url.password ? decodeURIComponent(url.password) : "",
      },
      level: "autoSelect",
      levelId: null,
      source: "automatic",
    };
  } catch {
    return null;
  }
}
