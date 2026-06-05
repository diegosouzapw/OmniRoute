/**
 * proxyAutoSelector.ts — Validation-layer proxy auto-selection service
 *
 * Wraps the low-level proxy fallback engine for use in the provider validation
 * pipeline. When a direct validation request fails with a connectivity error,
 * this service finds a working proxy and lets the caller retry with it.
 *
 * Proxies are discovered and returned for the current request only — they are
 * NOT persisted to the proxy registry. Short-term caching (5-minute TTL) is
 * handled by the in-memory cache in proxyFallback.ts.
 */

import { findWorkingProxy, clearProxyFallbackCache } from "@omniroute/open-sse/utils/proxyFallback.ts";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Select a working proxy for the given target URL.
 *
 * Extracts the hostname, delegates to the underlying proxy fallback engine
 * (candidate discovery + parallel testing + caching), and returns a working
 * proxy URL or null if none can be found.
 *
 * The discovered proxy is NOT persisted to the registry — it is returned for
 * the current request only. Short-term caching is handled in-memory within
 * proxyFallback.ts (5-minute TTL).
 *
 * @param targetUrl The full URL to find a working proxy for.
 * @returns A working proxy URL, or null if none was found.
 */
export async function selectProxyForValidation(targetUrl: string): Promise<string | null> {
  if (!targetUrl) return null;

  let hostname: string;
  try {
    hostname = new URL(targetUrl).hostname;
    if (!hostname) return null;
  } catch {
    return null;
  }

  return findWorkingProxy(hostname, targetUrl);
}

/**
 * Clear the in-memory proxy fallback cache.
 * Useful after proxy config changes or in tests.
 */
export function clearProxySelectionCache(): void {
  clearProxyFallbackCache();
}
