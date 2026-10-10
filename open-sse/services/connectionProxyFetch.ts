/**
 * connectionProxyFetch.ts — run quota fetcher requests through the proxy
 * assigned to the connection.
 *
 * Quota fetchers call provider consoles directly with the global fetch. On an
 * installation behind a proxy, that reads the quota of the wrong egress
 * address and exposes the origin. This helper resolves the proxy bound to the
 * connection and runs the fetch inside that proxy context, so the reading
 * uses the assigned egress path. Without an assigned proxy the fetch runs
 * unchanged. A proxy or resolution failure returns null so the reading is
 * reported, never retried outside the proxy.
 */

// NOTE: proxyFetch and error are imported lazily inside the functions below
// (not statically at the top level) so that bundling this module (e.g. the
// MCP server bundle) does not initialize the proxy transport at load time.

type ProxyValue = unknown;

export interface ProxyResolver {
  resolveProxyForConnection: (connectionId: string) => Promise<{ proxy?: ProxyValue } | null>;
}

interface ConnectionProxyFetchDeps {
  resolveProxyForConnection?: ProxyResolver["resolveProxyForConnection"];
  fetchFn?: typeof globalThis.fetch;
}

async function defaultResolveProxyForConnection(
  connectionId: string
): Promise<{ proxy?: ProxyValue } | null> {
  const override = connectionProxyTestOverride.resolveProxyForConnection;
  if (override) return override(connectionId);
  const { resolveProxyForConnection } = await import("@/lib/db/settings");
  return resolveProxyForConnection(connectionId);
}

/**
 * Test-only override for the connection proxy resolution (avoids seeding the
 * database in unit tests). Production code never sets it.
 */
export const connectionProxyTestOverride: {
  resolveProxyForConnection:
    ((connectionId: string) => Promise<{ proxy?: ProxyValue } | null>) | null;
} = { resolveProxyForConnection: null };

/**
 * Resolve the proxy assigned to a quota connection. Null means no proxy is
 * assigned and the fetch runs unchanged.
 */
export async function resolveConnectionProxy(
  connectionId: string,
  deps: ConnectionProxyFetchDeps = {}
): Promise<ProxyValue | null> {
  const resolve = deps.resolveProxyForConnection ?? defaultResolveProxyForConnection;
  const resolved = await resolve(connectionId);
  return resolved?.proxy ?? null;
}

/**
 * Fetch a quota URL through the connection proxy context. Returns the
 * response, or null when no proxy is assigned, when the connection has no
 * identifier to resolve a proxy for, and when the proxied fetch fails — the
 * caller reports the missing reading instead of refetching outside the proxy.
 */
export async function fetchWithConnectionProxy(
  connectionId: string,
  url: string,
  init?: RequestInit,
  deps: ConnectionProxyFetchDeps = {}
): Promise<Response | null> {
  const fetchFn = deps.fetchFn ?? globalThis.fetch;
  const { runWithProxyContext } = await import("../utils/proxyFetch.ts");
  const { sanitizeErrorMessage } = await import("../utils/error.ts");
  // Importing the proxy transport replaces globalThis.fetch with its own
  // interceptor as a side effect. When the caller provided the fetch (a test
  // mock, or any fetch installed before this call), put it back so the next
  // request of the same quota reading keeps using it instead of the
  // interceptor. In production the global fetch is already the interceptor
  // (installed once at startup), so this is a no-op there.
  if (deps.fetchFn === undefined && globalThis.fetch !== fetchFn) {
    globalThis.fetch = fetchFn;
  }
  if (!connectionId) {
    console.warn(
      "[ConnectionProxyFetch] Missing connection identifier: reporting an unknown reading instead of fetching outside a proxy."
    );
    return null;
  }
  let proxy: ProxyValue | null;
  try {
    proxy = await resolveConnectionProxy(connectionId, deps);
  } catch (error) {
    console.warn(
      `[ConnectionProxyFetch] Proxy resolution failed for ${connectionId}: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`
    );
    return null;
  }
  const task = () => fetchFn(url, init);
  if (!proxy) return task();
  try {
    return await runWithProxyContext(proxy, task);
  } catch (error) {
    console.warn(
      `[ConnectionProxyFetch] Proxied quota fetch failed for ${connectionId}: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`
    );
    return null;
  }
}
