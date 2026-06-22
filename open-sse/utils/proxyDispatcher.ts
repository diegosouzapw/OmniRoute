import "./setupPolyfill.ts";
import { Agent, ProxyAgent, type Dispatcher } from "undici";
import { socksDispatcher } from "fetch-socks";
import { getUpstreamTimeoutConfig } from "@/shared/utils/runtimeTimeouts";
import { stripIpv6Brackets, detectIpLiteralFamily, parseProxyFamily } from "./proxyFamily.ts";
import { createSocksDispatcherWithFamily } from "./socksConnectorWithFamily.ts";

const DISPATCHER_CACHE_KEY = Symbol.for("omniroute.proxyDispatcher.cache");
const DEFAULT_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.default");
const RETRY_DISPATCHER_KEY = Symbol.for("omniroute.proxyDispatcher.retry");
const SUPPORTED_PROTOCOLS = new Set(["http:", "https:", "socks5:"]);
// Edge-relay proxy types. These do NOT go through an HTTP/SOCKS dispatcher —
// the caller wraps the upstream URL with buildRelayHeaders() and fetches the
// relay endpoint directly. Keep this set as the single source of truth so
// every dispatch decision stays in sync when a new relay backend lands.
export const RELAY_TYPES: ReadonlySet<string> = new Set(["vercel", "deno", "cloudflare"]);

export function isRelayType(type: string | undefined | null): boolean {
  return typeof type === "string" && RELAY_TYPES.has(type);
}
const DEFAULT_PROXY_DISPATCHER_CONNECTIONS = 32;
const MAX_PROXY_DISPATCHER_CONNECTIONS = 256;

type DispatcherCache = Map<string, Dispatcher>;
type GlobalWithDispatcherCache = typeof globalThis & {
  [DISPATCHER_CACHE_KEY]?: DispatcherCache;
  [DEFAULT_DISPATCHER_KEY]?: Dispatcher;
  [RETRY_DISPATCHER_KEY]?: Dispatcher;
};
type SocksDispatcherOptions = {
  type: number;
  host: string;
  port: number;
  userId?: string;
  password?: string;
};
type ProxyConfigObject = {
  type?: string;
  host?: string;
  port?: string | number | null;
  username?: string;
  password?: string;
  family?: string;
};

/**
 * Direct upstream fan-out dispatcher.
 *
 * A single Undici Agent configured with `connections > 1` should be enough in
 * theory, but real Codex `/backend-api/codex/responses` streams on Node 24 have
 * still been observed queuing every subsequent same-origin request until the
 * previous stream emits trailers. Using several one-connection Agents gives
 * each long SSE stream an independent pool/client and prevents one stream from
 * monopolizing the effective queue while keeping pipelining disabled.
 */
class RoundRobinDispatcher {
  private readonly dispatchers: Dispatcher[];
  private nextIndex = 0;

  constructor(dispatchers: Dispatcher[]) {
    this.dispatchers = dispatchers;
  }

  dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandler): boolean {
    const dispatcher = this.dispatchers[this.nextIndex % this.dispatchers.length];
    this.nextIndex = (this.nextIndex + 1) % this.dispatchers.length;
    return dispatcher.dispatch(options, handler);
  }

  close(callback?: () => void): Promise<void> | void {
    const done = Promise.all(this.dispatchers.map((dispatcher) => dispatcher.close())).then(
      () => undefined
    );
    if (callback) {
      done.then(callback);
      return;
    }
    return done;
  }

  destroy(
    errorOrCallback?: Error | null | (() => void),
    callback?: () => void
  ): Promise<void> | void {
    const callbackFn = typeof errorOrCallback === "function" ? errorOrCallback : callback;
    const error = typeof errorOrCallback === "function" ? null : (errorOrCallback ?? null);
    const done = Promise.all(this.dispatchers.map((dispatcher) => dispatcher.destroy(error))).then(
      () => undefined
    );
    if (callbackFn) {
      done.then(callbackFn);
      return;
    }
    return done;
  }
}

function getDispatcherCache(): DispatcherCache {
  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  if (!globalWithCache[DISPATCHER_CACHE_KEY]) {
    globalWithCache[DISPATCHER_CACHE_KEY] = new Map();
  }
  return globalWithCache[DISPATCHER_CACHE_KEY];
}

/**
 * Clear all cached proxy dispatchers.
 * Call this when proxy configuration changes to avoid stale connections.
 */
export function clearDispatcherCache() {
  const cache = getDispatcherCache();
  cache.clear();

  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  delete globalWithCache[DEFAULT_DISPATCHER_KEY];
  delete globalWithCache[RETRY_DISPATCHER_KEY];
}

function getDispatcherOptions() {
  const timeouts = getUpstreamTimeoutConfig(process.env, (message) => {
    console.warn(`[ProxyDispatcher] ${message}`);
  });

  return {
    headersTimeout: timeouts.fetchHeadersTimeoutMs,
    bodyTimeout: timeouts.fetchBodyTimeoutMs,
    connectTimeout: timeouts.fetchConnectTimeoutMs,
    keepAliveTimeout: timeouts.fetchKeepAliveTimeoutMs,
    // Without this, an upstream Keep-Alive: timeout=N header clamps
    // keepAliveTimeout UP to undici's default keepAliveMaxTimeout (600 s),
    // completely overriding the configured 1 s and restoring zombie-socket risk.
    keepAliveMaxTimeout: timeouts.fetchKeepAliveTimeoutMs,
  };
}

export function getProxyDispatcherConnectionLimit(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = env.OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS;
  if (raw == null || raw.trim() === "") return DEFAULT_PROXY_DISPATCHER_CONNECTIONS;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) {
    console.warn(
      `[ProxyDispatcher] Invalid OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS="${raw}". Using default ${DEFAULT_PROXY_DISPATCHER_CONNECTIONS}.`
    );
    return DEFAULT_PROXY_DISPATCHER_CONNECTIONS;
  }

  return Math.min(Math.floor(parsed), MAX_PROXY_DISPATCHER_CONNECTIONS);
}

function getProxyDispatcherOptions(env: Record<string, string | undefined> = process.env) {
  const options = getDispatcherOptions();
  // Disable keep-alive and pipelining for proxy connections.
  // Cheap proxy servers aggressively drop idle sockets without sending TCP RST,
  // causing "socket hang up" or "Client network socket disconnected" errors
  // on subsequent requests that try to reuse the pooled connection.
  //
  // Keep multiple connections available anyway: with pipelining disabled, long
  // SSE streams such as Codex /v1/responses otherwise bottleneck through the
  // cached proxy dispatcher under concurrency (#4163).
  return {
    ...options,
    connections: getProxyDispatcherConnectionLimit(env),
    keepAliveTimeout: 1,
    keepAliveMaxTimeout: 1,
    pipelining: 0,
  };
}

export function getDefaultDispatcherConnectionLimit(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = env.OMNIROUTE_DIRECT_DISPATCHER_CONNECTIONS;
  if (raw == null || raw.trim() === "") return DEFAULT_PROXY_DISPATCHER_CONNECTIONS;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) {
    console.warn(
      `[ProxyDispatcher] Invalid OMNIROUTE_DIRECT_DISPATCHER_CONNECTIONS="${raw}". Using default ${DEFAULT_PROXY_DISPATCHER_CONNECTIONS}.`
    );
    return DEFAULT_PROXY_DISPATCHER_CONNECTIONS;
  }

  return Math.min(Math.floor(parsed), MAX_PROXY_DISPATCHER_CONNECTIONS);
}

function getDefaultDispatcherOptions(env: Record<string, string | undefined> = process.env) {
  const options = getDispatcherOptions();
  // #4580 — On the direct egress path, undici's default pipelining (1) let a long
  // SSE stream monopolize the single pooled socket per origin. Keep the public
  // connection-limit option here, but getDefaultDispatcher() fans it out across
  // independent one-connection Agents; in production traces, one multi-connection
  // Agent could still queue same-origin Codex streams behind prior trailers.
  return {
    ...options,
    connections: getDefaultDispatcherConnectionLimit(env),
    pipelining: 0,
  };
}

function createRoundRobinDirectDispatcher(connectionLimit: number): Dispatcher {
  const baseOptions = getDispatcherOptions();
  const perAgentOptions = {
    ...baseOptions,
    connections: 1,
    pipelining: 0,
  };
  const dispatchers = Array.from({ length: connectionLimit }, () => new Agent(perAgentOptions));
  return new RoundRobinDispatcher(dispatchers) as unknown as Dispatcher;
}

export function getDefaultDispatcher(): Dispatcher {
  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  if (!globalWithCache[DEFAULT_DISPATCHER_KEY]) {
    globalWithCache[DEFAULT_DISPATCHER_KEY] = createRoundRobinDirectDispatcher(
      getDefaultDispatcherConnectionLimit()
    );
  }
  return globalWithCache[DEFAULT_DISPATCHER_KEY];
}

/**
 * Dispatcher for RETRYING a direct request that just failed with a transient
 * socket error (UND_ERR_SOCKET / "other side closed" / ECONNRESET).
 *
 * The default direct dispatcher pools keep-alive sockets for up to
 * `fetchKeepAliveTimeoutMs` (4 s). Edges such as nvidia / opencode-zen silently
 * close idle keep-alive sockets within that window, so the next request that
 * reuses the pooled socket fails — and these failures arrive in bursts (#4252).
 * Retrying on the SAME pooled dispatcher can grab ANOTHER stale socket, so the
 * retry uses this no-keep-alive / no-pipelining dispatcher (mirroring the proxy
 * dispatcher mitigation) to force a fresh socket. Healthy keep-alive reuse on
 * the first attempt is preserved — only the retry pays the fresh-socket cost.
 */
export function getRetryDispatcher(): Dispatcher {
  const globalWithCache = globalThis as GlobalWithDispatcherCache;
  if (!globalWithCache[RETRY_DISPATCHER_KEY]) {
    globalWithCache[RETRY_DISPATCHER_KEY] = new Agent({
      ...getDispatcherOptions(),
      keepAliveTimeout: 1,
      keepAliveMaxTimeout: 1,
      pipelining: 0,
    });
  }
  return globalWithCache[RETRY_DISPATCHER_KEY];
}

/**
 * Extract the port from a proxy URL string before URL parsing.
 * `new URL("http://host:80")` strips port 80 since it's the HTTP default,
 * but proxy servers commonly listen on port 80/443, so we need to preserve it.
 */
function extractExplicitPort(urlStr: string): string | null {
  try {
    const idx = urlStr.indexOf("://");
    if (idx === -1) return null;
    const authorityStart = idx + 3;
    const authorityEnd = urlStr.indexOf("/", authorityStart);
    const authority =
      authorityEnd === -1
        ? urlStr.slice(authorityStart)
        : urlStr.slice(authorityStart, authorityEnd);
    const lastColon = authority.lastIndexOf(":");
    const atSign = authority.lastIndexOf("@");
    if (lastColon !== -1 && lastColon > atSign) {
      const portStr = authority.slice(lastColon + 1);
      if (/^\d+$/.test(portStr)) {
        const port = Number(portStr);
        if (Number.isInteger(port) && port >= 1 && port <= 65535) return String(port);
      }
    }
  } catch {}
  return null;
}

function defaultPortForProtocol(protocol: string): string {
  if (protocol === "https:" || protocol === "wss:") return "443";
  if (protocol === "socks5:") return "1080";
  return "8080";
}

function normalizePort(port: string | number | null | undefined, protocol: string): string {
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
function buildProxyUrlString(parsed: URL, port: string): string {
  const auth = parsed.username
    ? `${parsed.username}${parsed.password ? `:${parsed.password}` : ""}@`
    : "";
  return `${parsed.protocol}//${auth}${parsed.hostname}:${port}`;
}

/**
 * SOCKS5 proxy support defaults ON (opt-OUT). A fresh deploy with no env set
 * should honour SOCKS5 proxies out of the box — they were silently rejected
 * before (default OFF), making accounts fall back to the host IP. Only an
 * explicit falsey value (false/0/no/off) disables it.
 */
export function isSocks5ProxyEnabled(): boolean {
  const raw = (process.env.ENABLE_SOCKS5_PROXY ?? "").trim().toLowerCase();
  return !["false", "0", "no", "off"].includes(raw);
}

export function proxyUrlForLogs(proxyUrl: string): string {
  const explicitPort = extractExplicitPort(proxyUrl);
  const parsed = new URL(proxyUrl);
  const port = explicitPort || parsed.port || defaultPortForProtocol(parsed.protocol);
  return `${parsed.protocol}//${parsed.hostname}:${port}`;
}

export function normalizeProxyUrl(
  proxyUrl: string,
  source = "proxy",
  { allowSocks5 = isSocks5ProxyEnabled() } = {}
): string {
  // Strip a trailing synthetic `?family=ipv4|ipv6` marker BEFORE anything else.
  // `extractExplicitPort` slices the authority off the raw string, so a marker
  // turns the port substring into e.g. `80?family=ipv6`, which fails the digit
  // test and silently falls back to the default port (8080 for http) — rewriting
  // an http:80 proxy to :8080. We work on the marker-free string for both port
  // extraction and URL parsing, then re-append the marker exactly once below.
  const familyMatch = proxyUrl.match(/\?family=(ipv4|ipv6)$/);
  const familySuffix = familyMatch ? familyMatch[0] : "";
  const baseUrl = familySuffix ? proxyUrl.slice(0, -familySuffix.length) : proxyUrl;

  // Extract the explicit port from the raw URL string BEFORE parsing,
  // because `new URL()` silently strips default ports (80 for http,
  // 443 for https), which are valid and common for proxy servers.
  const explicitPort = extractExplicitPort(baseUrl);

  let parsed;
  try {
    parsed = new URL(baseUrl);
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
      "[ProxyDispatcher] SOCKS5 proxy is disabled (remove ENABLE_SOCKS5_PROXY=false to enable — it is ON by default)"
    );
  }
  if (!parsed.hostname) {
    throw new Error(`[ProxyDispatcher] Invalid ${source} host`);
  }

  // Use the explicit port from the raw string if present, otherwise apply default.
  const port = explicitPort || normalizePort(parsed.port, parsed.protocol);

  // Build the URL string manually instead of using parsed.toString(),
  // which would strip default ports (80/443) and break the proxy connection.
  // Preserve a synthetic `?family=` directive (the only query param we emit)
  // so the connect-family pin survives normalization and reaches the dispatcher.
  // The directive may arrive either as the stripped trailing marker (familySuffix)
  // or as an inline query on `baseUrl`; resolve both, append the marker once.
  const fam = parseProxyFamily(
    (familyMatch ? familyMatch[1] : parsed.searchParams.get("family")) ?? undefined
  );
  const base = buildProxyUrlString(parsed, port);
  return fam === "auto" ? base : `${base}?family=${fam}`;
}

export function buildVercelRelayHeaders(
  targetUrl: string,
  relayAuth: string
): Record<string, string> {
  const parsed = new URL(targetUrl);
  return {
    "x-relay-target": `${parsed.protocol}//${parsed.host}`,
    "x-relay-path": parsed.pathname + parsed.search,
    "x-relay-auth": relayAuth,
  };
}

// Vercel + Deno Deploy share the same x-relay-{target,path,auth} envelope.
// Use this alias when the call is intentionally backend-agnostic; the named
// vercel-specific export above stays for direct callers that already use it.
export const buildRelayHeaders = buildVercelRelayHeaders;

export function proxyConfigToUrl(
  proxyConfig: unknown,
  { allowSocks5 = isSocks5ProxyEnabled() } = {}
): string | null {
  if (!proxyConfig) return null;

  if (typeof proxyConfig === "string") {
    return normalizeProxyUrl(proxyConfig, "context proxy", { allowSocks5 });
  }

  if (typeof proxyConfig !== "object" || Array.isArray(proxyConfig)) {
    throw new Error("[ProxyDispatcher] Invalid context proxy config");
  }

  const config = proxyConfig as ProxyConfigObject;

  // Partial / empty config object — treat as no proxy instead of crashing
  if (!config.host) return null;
  const type = String(config.type || "http").toLowerCase();

  // Edge-relay entries (vercel / deno / cloudflare) carry the relay URL in
  // `host` — no dispatcher needed; callers should use buildRelayHeaders() and
  // fetch the relay endpoint directly. All relay types share the exact same
  // x-relay-target / x-relay-path / x-relay-auth header spec (only the
  // deployment target differs).
  if (RELAY_TYPES.has(type)) {
    return config.host ? `https://${config.host}` : null;
  }

  const protocol = `${type}:`;

  if (!SUPPORTED_PROTOCOLS.has(protocol)) {
    throw new Error(`[ProxyDispatcher] Unsupported context proxy protocol: ${type}`);
  }
  if (protocol === "socks5:" && !allowSocks5) {
    throw new Error(
      "[ProxyDispatcher] SOCKS5 proxy is disabled (remove ENABLE_SOCKS5_PROXY=false to enable — it is ON by default)"
    );
  }

  const port = normalizePort(config.port, protocol);

  // Build the URL string manually to preserve the port through normalization.
  const auth = config.username
    ? `${encodeURIComponent(config.username)}:${config.password ? encodeURIComponent(config.password) : ""}@`
    : "";

  const proxyUrlStr = `${type}://${auth}${config.host}:${port}`;

  const fam = parseProxyFamily(config.family);
  const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", { allowSocks5 });
  return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
}

/** Resolve the concrete connect family for a proxy URL, fail-closed on contradictions. */
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal;
  const want = directive === "ipv6" ? 6 : 4;
  if (literal !== null && literal !== want) {
    throw new Error(
      `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
    );
  }
  return want;
}

/** Test-only accessor for the resolved family. */
export function __resolveDispatcherFamilyForTest(proxyUrl: string): 4 | 6 | null {
  return resolveDispatcherFamily(new URL(proxyUrl));
}

/** Test-only accessor for proxy dispatcher pool options. */
export function __getProxyDispatcherOptionsForTest(
  env: Record<string, string | undefined> = process.env
) {
  return getProxyDispatcherOptions(env);
}

export function __getDefaultDispatcherOptionsForTest(
  env: Record<string, string | undefined> = process.env
) {
  return getDefaultDispatcherOptions(env);
}

export function __createRoundRobinDispatcherForTest(dispatchers: Dispatcher[]): Dispatcher {
  return new RoundRobinDispatcher(dispatchers) as unknown as Dispatcher;
}

export function createProxyDispatcher(proxyUrl: string): Dispatcher {
  const normalizedUrl = normalizeProxyUrl(proxyUrl, "proxy dispatcher");
  const dispatcherCache = getDispatcherCache();
  const proxyDispatcherOptions = getProxyDispatcherOptions();

  let dispatcher = dispatcherCache.get(normalizedUrl);
  if (dispatcher) return dispatcher;

  const parsed = new URL(normalizedUrl);
  const family = resolveDispatcherFamily(parsed);
  parsed.searchParams.delete("family");
  const cleanUri = normalizedUrl.replace(/\?family=(ipv4|ipv6)$/, "");
  const explicitPort = extractExplicitPort(cleanUri);
  const port = explicitPort || normalizePort(parsed.port, parsed.protocol);

  if (parsed.protocol === "socks5:") {
    const socksOptions: SocksDispatcherOptions = {
      type: 5,
      host: stripIpv6Brackets(parsed.hostname),
      port: Number(port),
    };
    if (parsed.username) socksOptions.userId = decodeURIComponent(parsed.username);
    if (parsed.password) socksOptions.password = decodeURIComponent(parsed.password);
    dispatcher =
      family === null
        ? (socksDispatcher(
            socksOptions as Parameters<typeof socksDispatcher>[0],
            proxyDispatcherOptions
          ) as Dispatcher)
        : createSocksDispatcherWithFamily(
            socksOptions as unknown as Parameters<typeof createSocksDispatcherWithFamily>[0],
            family,
            proxyDispatcherOptions
          );
  } else {
    // ProxyAgent omits `connect`; the client->proxy socket is built from `proxyTls`.
    // undici 8.4.1 types `proxyTls?: buildConnector.BuildOptions`, a union whose
    // `TcpNetConnectOpts` member nominally requires `port` — so TS rejects a bare
    // `{ family, autoSelectFamily }` pin. At runtime undici merges these options into
    // net.connect (the uri already carries the host:port), so the partial pin is
    // valid; the cast suppresses the spurious missing-`port` error.
    dispatcher = new ProxyAgent({
      uri: cleanUri,
      ...proxyDispatcherOptions,
      ...(family !== null
        ? { proxyTls: { family, autoSelectFamily: false } as ProxyAgent.Options["proxyTls"] }
        : {}),
    });
  }

  dispatcherCache.set(normalizedUrl, dispatcher);
  return dispatcher;
}

/** Test-only: returns the SOCKS dispatcher options that would be built for a URL. */
export function __getSocksOptionsForTest(proxyUrl: string): SocksDispatcherOptions {
  const normalizedUrl = normalizeProxyUrl(proxyUrl, "proxy dispatcher");
  const parsed = new URL(normalizedUrl);
  parsed.searchParams.delete("family");
  const explicitPort = extractExplicitPort(normalizedUrl);
  const port = explicitPort || normalizePort(parsed.port, parsed.protocol);
  const socksOptions: SocksDispatcherOptions = {
    type: 5,
    host: stripIpv6Brackets(parsed.hostname),
    port: Number(port),
  };
  if (parsed.username) socksOptions.userId = decodeURIComponent(parsed.username);
  if (parsed.password) socksOptions.password = decodeURIComponent(parsed.password);
  return socksOptions;
}
