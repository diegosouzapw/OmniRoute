import { ProxyAgent } from "undici";
import { socksDispatcher } from "fetch-socks";

const DISPATCHER_CACHE_KEY = Symbol.for("omniroute.proxyDispatcher.cache");
const SUPPORTED_PROTOCOLS = new Set(["http:", "https:", "socks5:"]);

function getDispatcherCache(): Map<string, any> {
  if (!globalThis[DISPATCHER_CACHE_KEY]) {
    globalThis[DISPATCHER_CACHE_KEY] = new Map();
  }
  return globalThis[DISPATCHER_CACHE_KEY];
}

/**
 * Clear all cached proxy dispatchers.
 * Call this when proxy configuration changes to avoid stale connections.
 */
export function clearDispatcherCache() {
  const cache = getDispatcherCache();
  cache.clear();
}

/**
 * Extract the port from a proxy URL string before URL parsing.
 * `new URL("http://host:80")` strips port 80 since it's the HTTP default,
 * but proxy servers commonly listen on port 80/443, so we need to preserve it.
 */
function extractExplicitPort(urlStr) {
  try {
    // Match port in the host portion: "scheme://[user:pass@]host:PORT[/...]"
    const match = urlStr.match(/:\/\/(?:[^@]*@)?[^:/\s]+:(\d+)/);
    if (match) {
      const port = Number(match[1]);
      if (Number.isInteger(port) && port >= 1 && port <= 65535) return String(port);
    }
  } catch {}
  return null;
}

function defaultPortForProtocol(protocol) {
  if (protocol === "https:" || protocol === "wss:") return "443";
  if (protocol === "socks5:") return "1080";
  return "8080";
}

function normalizePort(port, protocol) {
  if (!port) return defaultPortForProtocol(protocol);
  const parsed = Number(port);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error("[ProxyDispatcher] Invalid proxy port");
  }
  return String(parsed);
}

/**
 * Build a proxy URL string manually from parsed URL components.
 * We cannot use URL.toString() because the URL serializer silently strips
 * default ports (80 for http, 443 for https). Proxy servers commonly
 * listen on these ports, so we must always include the port explicitly.
 */
function buildProxyUrlString(parsed, port) {
  const auth =
    parsed.username
      ? `${parsed.username}${parsed.password ? `:${parsed.password}` : ""}@`
      : "";
  return `${parsed.protocol}//${auth}${parsed.hostname}:${port}`;
}

export function isSocks5ProxyEnabled() {
  return process.env.ENABLE_SOCKS5_PROXY === "true";
}

export function proxyUrlForLogs(proxyUrl) {
  const explicitPort = extractExplicitPort(proxyUrl);
  const parsed = new URL(proxyUrl);
  const port = explicitPort || parsed.port || defaultPortForProtocol(parsed.protocol);
  return `${parsed.protocol}//${parsed.hostname}:${port}`;
}

export function normalizeProxyUrl(
  proxyUrl,
  source = "proxy",
  { allowSocks5 = isSocks5ProxyEnabled() } = {}
) {
  // Extract the explicit port from the raw URL string BEFORE parsing,
  // because `new URL()` silently strips default ports (80 for http,
  // 443 for https), which are valid and common for proxy servers.
  const explicitPort = extractExplicitPort(proxyUrl);

  let parsed;
  try {
    parsed = new URL(proxyUrl);
  } catch {
    throw new Error(`[ProxyDispatcher] Invalid ${source} URL`);
  }

  if (!SUPPORTED_PROTOCOLS.has(parsed.protocol)) {
    throw new Error(
      `[ProxyDispatcher] Unsupported ${source} protocol: ${parsed.protocol.replace(":", "")}`
    );
  }
  if (parsed.protocol === "socks5:" && !allowSocks5) {
    throw new Error(
      "[ProxyDispatcher] SOCKS5 proxy is disabled (set ENABLE_SOCKS5_PROXY=true to enable)"
    );
  }
  if (!parsed.hostname) {
    throw new Error(`[ProxyDispatcher] Invalid ${source} host`);
  }

  // Use the explicit port from the raw string if present, otherwise apply default.
  const port = explicitPort || normalizePort(parsed.port, parsed.protocol);

  // Build the URL string manually instead of using parsed.toString(),
  // which would strip default ports (80/443) and break the proxy connection.
  return buildProxyUrlString(parsed, port);
}

export function proxyConfigToUrl(proxyConfig, { allowSocks5 = isSocks5ProxyEnabled() } = {}) {
  if (!proxyConfig) return null;

  if (typeof proxyConfig === "string") {
    return normalizeProxyUrl(proxyConfig, "context proxy", { allowSocks5 });
  }

  if (typeof proxyConfig !== "object" || Array.isArray(proxyConfig)) {
    throw new Error("[ProxyDispatcher] Invalid context proxy config");
  }

  const type = String(proxyConfig.type || "http").toLowerCase();
  const protocol = `${type}:`;

  if (!SUPPORTED_PROTOCOLS.has(protocol)) {
    throw new Error(`[ProxyDispatcher] Unsupported context proxy protocol: ${type}`);
  }
  if (protocol === "socks5:" && !allowSocks5) {
    throw new Error(
      "[ProxyDispatcher] SOCKS5 proxy is disabled (set ENABLE_SOCKS5_PROXY=true to enable)"
    );
  }
  if (!proxyConfig.host) {
    throw new Error("[ProxyDispatcher] Context proxy host is required");
  }

  const port = normalizePort(proxyConfig.port, protocol);

  // Build the URL string manually to preserve the port through normalization.
  const auth = proxyConfig.username
    ? `${encodeURIComponent(proxyConfig.username)}:${proxyConfig.password ? encodeURIComponent(proxyConfig.password) : ""}@`
    : "";

  const proxyUrlStr = `${type}://${auth}${proxyConfig.host}:${port}`;

  return normalizeProxyUrl(proxyUrlStr, "context proxy", { allowSocks5 });
}

export function createProxyDispatcher(proxyUrl) {
  const normalizedUrl = normalizeProxyUrl(proxyUrl, "proxy dispatcher");
  const dispatcherCache = getDispatcherCache();

  let dispatcher = dispatcherCache.get(normalizedUrl);
  if (dispatcher) return dispatcher;

  const parsed = new URL(normalizedUrl);
  const explicitPort = extractExplicitPort(normalizedUrl);
  const port = explicitPort || normalizePort(parsed.port, parsed.protocol);

  if (parsed.protocol === "socks5:") {
    const socksOptions: Record<string, any> = {
      type: 5,
      host: parsed.hostname,
      port: Number(port),
    };
    if (parsed.username) socksOptions.userId = decodeURIComponent(parsed.username);
    if (parsed.password) socksOptions.password = decodeURIComponent(parsed.password);
    dispatcher = socksDispatcher(socksOptions as any);
  } else {
    dispatcher = new ProxyAgent(normalizedUrl);
  }

  dispatcherCache.set(normalizedUrl, dispatcher);
  return dispatcher;
}