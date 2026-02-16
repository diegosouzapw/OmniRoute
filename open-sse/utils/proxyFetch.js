import { AsyncLocalStorage } from "node:async_hooks";
import {
  createProxyDispatcher,
  normalizeProxyUrl,
  proxyConfigToUrl,
  proxyUrlForLogs,
} from "./proxyDispatcher.js";
import tlsClient from "./tlsClient.js";

function isTlsFingerprintEnabled() {
  return process.env.ENABLE_TLS_FINGERPRINT === "true";
}

/** Per-request tracking of whether TLS fingerprint was used */
const tlsFingerprintContext = new AsyncLocalStorage();

const isCloud = typeof caches !== "undefined" && typeof caches === "object";
const PATCH_STATE_KEY = Symbol.for("omniroute.proxyFetch.state");

function getPatchState() {
  if (!globalThis[PATCH_STATE_KEY]) {
    globalThis[PATCH_STATE_KEY] = {
      originalFetch: globalThis.fetch,
      proxyContext: new AsyncLocalStorage(),
      isPatched: false,
    };
  }
  return globalThis[PATCH_STATE_KEY];
}

const patchState = getPatchState();
const originalFetch = patchState.originalFetch;
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
    if (patternHost.startsWith(".")) {
      return hostname.endsWith(patternHost) || hostname === patternHost.slice(1);
    }
    return hostname === patternHost || hostname.endsWith(`.${patternHost}`);
  });
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

function resolveProxyForRequest(targetUrl) {
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

  const resolvedProxyUrl = proxyConfig ? proxyConfigToUrl(proxyConfig) : null;

  return proxyContext.run(proxyConfig || null, async () => {
    if (resolvedProxyUrl) {
      console.log(
        `[ProxyFetch] Applied request proxy context: ${proxyUrlForLogs(resolvedProxyUrl)}`
      );
    }
    return fn();
  });
}

async function patchedFetch(input, options = {}) {
  if (options?.dispatcher) {
    return originalFetch(input, options);
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
        return await tlsClient.fetch(targetUrl, options);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(
          `[ProxyFetch] TLS fingerprint failed, falling back to native fetch: ${message}`
        );
        const store = tlsFingerprintContext.getStore();
        if (store) store.used = false;
      }
    }
    return originalFetch(input, options);
  }

  try {
    const dispatcher = createProxyDispatcher(proxyUrl);
    return await originalFetch(input, { ...options, dispatcher });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[ProxyFetch] Proxy request failed (${source}, fail-closed): ${message}`);
    throw error;
  }
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
