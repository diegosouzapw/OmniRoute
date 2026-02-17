/**
 * Network Proxy Resolver
 *
 * Resolves the outbound proxy URL for a given provider.
 * Precedence: provider-specific > global > environment variables
 *
 * Usage:
 *   import { resolveProxy } from "open-sse/utils/networkProxy.js";
 *   const proxyUrl = await resolveProxy("openai");
 */

let _cachedConfig = null;
let _cacheExpiry = 0;

/**
 * Get proxy config from localDb (with caching)
 */
async function getConfig() {
  const now = Date.now();
  if (_cachedConfig && now < _cacheExpiry) return _cachedConfig;

  try {
    const { getProxyConfig } = await import("../../src/lib/localDb");
    _cachedConfig = await getProxyConfig();
    _cacheExpiry = now + 30_000; // Cache for 30s
    return _cachedConfig;
  } catch {
    return { global: null, providers: {} };
  }
}

/**
 * Resolve proxy URL for a given provider
 * @param {string} providerId - Provider ID (e.g., "openai", "anthropic")
 * @returns {string|null} Proxy URL or null if no proxy configured
 */
export async function resolveProxy(providerId) {
  const config = await getConfig();

  // 1. Provider-specific proxy
  if (providerId && config.providers?.[providerId]) {
    return config.providers[providerId];
  }

  // 2. Global proxy
  if (config.global) {
    return config.global;
  }

  // 3. Environment variables
  const envProxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY;
  if (envProxy) {
    // Check NO_PROXY
    const noProxy = process.env.NO_PROXY || process.env.no_proxy || "";
    // Simple check: if providerId is in NO_PROXY list, skip
    if (noProxy && providerId) {
      const noProxyList = noProxy.split(",").map((s) => s.trim().toLowerCase());
      if (noProxyList.includes(providerId.toLowerCase())) {
        return null;
      }
    }
    return envProxy;
  }

  return null;
}

/**
 * Invalidate the proxy config cache (call after config changes)
 */
export function invalidateProxyCache() {
  _cachedConfig = null;
  _cacheExpiry = 0;
}
