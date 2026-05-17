// @ts-nocheck
import { AsyncLocalStorage } from "node:async_hooks";
import { fetch as undiciFetch } from "undici";
import {
  createProxyDispatcher,
  getDefaultDispatcher,
  normalizeProxyUrl,
  proxyConfigToUrl,
  proxyUrlForLogs,
} from "./proxyDispatcher.ts";
import tlsClient from "./tlsClient.ts";
import { isProxyReachable } from "@/lib/proxyHealth";

function isTlsFingerprintEnabled() {
  return process.env.ENABLE_TLS_FINGERPRINT === "true";
}

/** Per-request tracking of whether TLS fingerprint was used */
type TlsFingerprintStore = { used: boolean };
const tlsFingerprintContext = new AsyncLocalStorage<TlsFingerprintStore>();

type FetchWithDispatcherOptions = RequestInit & { dispatcher?: unknown };
type FetchWithDispatcher = (
  input: RequestInfo | URL,
  init?: FetchWithDispatcherOptions
) => Promise<Response>;

/** Injectable dependencies for testability (Approach B DI). */
export type ProxyFetchDeps = {
  undiciFetch?: FetchWithDispatcher;
  nativeFetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

type PatchState = {
  originalFetch: typeof globalThis.fetch;
  proxyContext: AsyncLocalStorage<unknown>;
  isPatched: boolean;
};

const isCloud = typeof caches !== "undefined" && typeof caches === "object";
const PATCH_STATE_KEY = Symbol.for("omniroute.proxyFetch.state");

function getPatchState(): PatchState {
  const scopedGlobal = globalThis as typeof globalThis & {
    [PATCH_STATE_KEY]?: PatchState;
  };

  if (!scopedGlobal[PATCH_STATE_KEY]) {
    scopedGlobal[PATCH_STATE_KEY] = {
      originalFetch: globalThis.fetch,
      proxyContext: new AsyncLocalStorage(),
      isPatched: false,
    };
  }
  return scopedGlobal[PATCH_STATE_KEY];
}

const patchState = getPatchState();
const originalFetch = patchState.originalFetch;
const originalFetchWithDispatcher = originalFetch as FetchWithDispatcher;
const proxyContext = patchState.proxyContext;

function noProxyMatch(targetUrl) {
  const noProxy = process.env.NO_PROXY || process.env.no_proxy;
  if (!noProxy) return false;

  let target;
  try {
    target = new URL(targetUrl);
  } catch {
    return false;
  }

  const hostname = target.hostname.toLowerCase();
  const port = target.port || (target.protocol === "https:" ? "443" : "80");
  const patterns = noProxy
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);

  return patterns.some((pattern) => {
    if (pattern === "*") return true;

    const [patternHost, patternPort] = pattern.split(":");
    if (patternPort && patternPort !== port) return false;

    if (!patternHost) return false;

    // Support wildcard matching (e.g. 192.168.* or *.local)
    if (patternHost.includes("*")) {
      const regexStr =
        "^" +
        patternHost
          .split("*")
          .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          .join(".*") +
        "$";
      if (new RegExp(regexStr).test(hostname)) return true;
    }

    if (patternHost.startsWith(".")) {
      return hostname.endsWith(patternHost) || hostname === patternHost.slice(1);
    }
    return hostname === patternHost || hostname.endsWith(`.${patternHost}`);
  });
}

function isLocalAddress(hostname: string): boolean {
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return true;
  if (hostname.startsWith("192.168.")) return true;
  if (hostname.startsWith("10.")) return true;
  if (hostname.match(/^172\.(1[6-9]|2\d|3[0-1])\./)) return true;
  if (hostname.endsWith(".local") || hostname.endsWith(".lan")) return true;
  return false;
}

function resolveEnvProxyUrl(targetUrl) {
  if (noProxyMatch(targetUrl)) return null;

  let protocol;
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
  return normalizeProxyUrl(proxyUrl, "environment proxy");
}

export function resolveProxyForRequest(targetUrl) {
  let target;
  try {
    target = new URL(targetUrl);
  } catch {
    target = null;
  }

  // Always bypass proxy for local/LAN addresses
  if (target && isLocalAddress(target.hostname.toLowerCase())) {
    return { source: "direct", proxyUrl: null };
  }

  const contextProxy = proxyContext.getStore();
  if (contextProxy) {
    return { source: "context", proxyUrl: proxyConfigToUrl(contextProxy) };
  }

  const envProxyUrl = resolveEnvProxyUrl(targetUrl);
  if (envProxyUrl) {
    return { source: "env", proxyUrl: envProxyUrl };
  }

  return { source: "direct", proxyUrl: null };
}

function getTargetUrl(input) {
  if (typeof input === "string") return input;
  if (input && typeof input.url === "string") return input.url;
  return String(input);
}

export async function runWithProxyContext(proxyConfig, fn) {
  if (typeof fn !== "function") {
    throw new TypeError("runWithProxyContext requires a callback function");
  }

  // Inherit existing context if no specific proxyConfig is provided
  const currentContext = proxyContext.getStore();
  const effectiveProxyConfig = proxyConfig || currentContext || null;

  const resolvedProxyUrl = effectiveProxyConfig ? proxyConfigToUrl(effectiveProxyConfig) : null;

  // T14: Proxy Fast-Fail
  // Perform a short TCP reachability check before issuing upstream requests.
  if (resolvedProxyUrl) {
    const reachable = await isProxyReachable(resolvedProxyUrl);
    if (!reachable) {
      const proxyLabel = proxyUrlForLogs(resolvedProxyUrl);
      const err = new Error(`[Proxy Fast-Fail] Proxy unreachable: ${proxyLabel}`) as Error & {
        code?: string;
        statusCode?: number;
      };
      err.code = "PROXY_UNREACHABLE";
      err.statusCode = 503;
      throw err;
    }
  }

  return proxyContext.run(effectiveProxyConfig, async () => {
    if (resolvedProxyUrl && effectiveProxyConfig !== currentContext) {
      console.log(
        `[ProxyFetch] Applied request proxy context: ${proxyUrlForLogs(resolvedProxyUrl)}`
      );
    }
    return fn();
  });
}

async function patchedFetch(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions = {},
  deps: ProxyFetchDeps = {}
) {
  if (options?.dispatcher) {
    // When a dispatcher is present, we MUST use the undici library fetch
    // to ensure version compatibility. Node 22 built-in fetch (undici v6)
    // is incompatible with undici v8 dispatchers (missing onRequestStart, etc.)
    const _undiciDispatcher =
      deps.undiciFetch ?? (undiciFetch as unknown as (...args: unknown[]) => Promise<Response>);
    return _undiciDispatcher(input, options);
  }

  const targetUrl = getTargetUrl(input);
  let resolved;
  try {
    resolved = resolveProxyForRequest(targetUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[ProxyFetch] Proxy configuration error: ${message}`);
    throw error;
  }
  const { source, proxyUrl } = resolved;

  if (!proxyUrl) {
    // TLS fingerprint spoofing for direct connections (no proxy configured)
    if (isTlsFingerprintEnabled() && tlsClient.available) {
      try {
        const store = tlsFingerprintContext.getStore();
        if (store) store.used = true;
        return await tlsClient.fetch(targetUrl, {
          ...options,
          headers: options.headers,
          signal: options.signal ?? undefined,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(
          `[ProxyFetch] TLS fingerprint failed, falling back to native fetch: ${message}`
        );
        const store = tlsFingerprintContext.getStore();
        if (store) store.used = false;
      }
    }
    // Direct connection (no proxy) — use undici with custom dispatcher for timeout control.
    // Falls back to original native fetch if dispatcher initialization fails (#1054).
    // Retries once on transient dispatcher errors before falling back (fix: proxyfetch-undici-retry).
    //
    // ReadableStream/Blob body guard: if the body is non-replayable, skip the retry because
    // the first attempt drains the stream; a second attempt would silently send an empty body.
    // ReadableStream check: cast through unknown to avoid explicit-any budget (T11).
    const _bodyUnknown = options.body as unknown;
    const bodyIsStream =
      _bodyUnknown !== null &&
      _bodyUnknown !== undefined &&
      typeof _bodyUnknown === "object" &&
      (typeof (_bodyUnknown as Record<string, unknown>).getReader === "function" || // ReadableStream
        typeof (_bodyUnknown as Record<string, unknown>).stream === "function"); // Blob
    const maxAttempts = bodyIsStream ? 1 : 2;
    const _undiciDirect =
      deps.undiciFetch ?? (undiciFetch as unknown as (...args: unknown[]) => Promise<Response>);
    const _nativeFallback =
      (deps.nativeFetch as FetchWithDispatcher | undefined) ?? originalFetchWithDispatcher;
    let lastDispatcherError: unknown = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await _undiciDirect(input, {
          ...options,
          dispatcher: getDefaultDispatcher(),
        });
      } catch (dispatcherError) {
        const msg =
          dispatcherError instanceof Error ? dispatcherError.message : String(dispatcherError);
        // CAUTION: Do NOT fallback to native fetch if the error is a version mismatch (invalid onRequestStart)
        // because the native fetch will definitely fail with the undici v8 dispatcher.
        if (msg.includes("onRequestStart")) {
          console.error(
            `[ProxyFetch] Fatal version mismatch: Dispatcher (v8) vs Fetch (v6/native). Hardware upgrade or SOCKS5 config isolation required. Error: ${msg}`
          );
          throw dispatcherError;
        }
        // Only retry/fallback for connection/dispatcher errors, not HTTP errors.
        // Prefer the .code property when available (more stable across undici
        // versions than message-string matching); fall back to substring match
        // for errors that lack a structured code.
        const errCode = (dispatcherError as { code?: string })?.code;
        if (
          msg.includes("fetch failed") ||
          errCode === "ECONNREFUSED" ||
          msg.includes("ECONNREFUSED") ||
          (errCode !== undefined && errCode.startsWith("UND_ERR")) ||
          msg.includes("UND_ERR")
        ) {
          if (attempt === 0 && maxAttempts > 1) {
            // First failure — retry once with a short jittered delay before giving up.
            lastDispatcherError = dispatcherError;
            await new Promise((r) => setTimeout(r, 25 + Math.random() * 50));
            continue;
          }
          // All attempts exhausted — fall back to native fetch.
          // Preserve original phrase intact for monitoring: "Undici dispatcher failed, falling back to native fetch"
          console.warn(
            `[ProxyFetch] Undici dispatcher failed, falling back to native fetch (after retry): ${msg}`
          );
          return _nativeFallback(input, options);
        }
        throw dispatcherError;
      }
    }
    // Should not be reached, but satisfy TypeScript control-flow.
    throw lastDispatcherError;
  }

  try {
    const dispatcher = createProxyDispatcher(proxyUrl);
    const _undiciProxy =
      deps.undiciFetch ?? (undiciFetch as unknown as (...args: unknown[]) => Promise<Response>);
    return await _undiciProxy(input, {
      ...options,
      dispatcher,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[ProxyFetch] Proxy request failed (${source}, fail-closed): ${message}`);
    throw error;
  }
}

/**
 * Named export for proxyFetch — identical to the patched globalThis.fetch but
 * accepts an optional ProxyFetchDeps for unit test dependency injection.
 * Production code should use globalThis.fetch (or the default export) instead.
 */
export async function proxyFetch(
  input: RequestInfo | URL,
  options: RequestInit = {},
  deps: ProxyFetchDeps = {}
): Promise<Response> {
  return patchedFetch(input, options as FetchWithDispatcherOptions, deps);
}

if (!isCloud && !patchState.isPatched) {
  globalThis.fetch = patchedFetch;
  patchState.isPatched = true;
}

/**
 * Run a function with TLS fingerprint tracking context.
 * After fn completes, returns { result, tlsFingerprintUsed }.
 */
export async function runWithTlsTracking(fn) {
  const store = { used: false };
  const result = await tlsFingerprintContext.run(store, fn);
  return { result, tlsFingerprintUsed: store.used };
}

/** Check if TLS fingerprint is enabled and available */
export function isTlsFingerprintActive() {
  return isTlsFingerprintEnabled() && tlsClient.available;
}

export default isCloud ? originalFetch : patchedFetch;
