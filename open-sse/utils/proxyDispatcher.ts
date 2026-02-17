import { ProxyAgent } from "undici";
import { socksDispatcher } from "fetch-socks";

const DISPATCHER_CACHE_KEY = Symbol.for("omniroute.proxyDispatcher.cache");
const SUPPORTED_PROTOCOLS = new Set(["http:", "https:", "socks5:"]);

function getDispatcherCache() {
  if (!globalThis[DISPATCHER_CACHE_KEY]) {
    globalThis[DISPATCHER_CACHE_KEY] = new Map();
  }
  return globalThis[DISPATCHER_CACHE_KEY];
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

export function isSocks5ProxyEnabled() {
  return process.env.ENABLE_SOCKS5_PROXY === "true";
}

export function proxyUrlForLogs(proxyUrl) {
  const parsed = new URL(proxyUrl);
  const port = parsed.port || defaultPortForProtocol(parsed.protocol);
  return `${parsed.protocol}//${parsed.hostname}:${port}`;
}

export function normalizeProxyUrl(
  proxyUrl,
  source = "proxy",
  { allowSocks5 = isSocks5ProxyEnabled() } = {}
) {
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

  parsed.port = normalizePort(parsed.port, parsed.protocol);
  return parsed.toString();
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
  const proxyUrl = new URL(`${type}://${proxyConfig.host}:${port}`);

  if (proxyConfig.username) {
    proxyUrl.username = proxyConfig.username;
    proxyUrl.password = proxyConfig.password || "";
  }

  return normalizeProxyUrl(proxyUrl.toString(), "context proxy", { allowSocks5 });
}

export function createProxyDispatcher(proxyUrl) {
  const normalizedUrl = normalizeProxyUrl(proxyUrl, "proxy dispatcher");
  const dispatcherCache = getDispatcherCache();

  let dispatcher = dispatcherCache.get(normalizedUrl);
  if (dispatcher) return dispatcher;

  const parsed = new URL(normalizedUrl);
  if (parsed.protocol === "socks5:") {
    const socksOptions: Record<string, any> = {
      type: 5,
      host: parsed.hostname,
      port: Number(normalizePort(parsed.port, parsed.protocol)),
    };
    if (parsed.username) socksOptions.userId = decodeURIComponent(parsed.username);
    if (parsed.password) socksOptions.password = decodeURIComponent(parsed.password);
    // @ts-ignore - socksOptions conforms to SocksProxies at runtime
    dispatcher = socksDispatcher(socksOptions);
  } else {
    dispatcher = new ProxyAgent(normalizedUrl);
  }

  dispatcherCache.set(normalizedUrl, dispatcher);
  return dispatcher;
}
