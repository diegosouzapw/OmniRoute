// @ts-nocheck
import "./setupPolyfill.ts";
import { AsyncLocalStorage } from "node:async_hooks";
import {
  normalizeProxyUrl,
  proxyConfigToUrl,
  proxyUrlForLogs,
  isRelayType,
} from "./proxyDispatcher.ts";
import { isProxyReachable } from "@/lib/proxyHealth";
import { isDirectBypassHost } from "./proxyDirectBypass.ts";
import { isControlPlaneProxyDirectFallbackEnabled } from "@/shared/utils/featureFlags";
import { withUpstreamStatusCapture } from "./upstreamStatusCapture.ts";
import { getAppliedProxyContext } from "./appliedProxyContext.ts";
import {
  dispatchProxyFetch,
  DIRECT_PROXY_CONTEXT,
  type ProxyFetchDeps,
} from "./proxyFetchTransport.ts";
import {
  activeTlsClient,
  isTlsFingerprintEnabled,
  RELAY_POOL_AGENT_OPTIONS,
  type FetchWithDispatcher,
  type FetchWithDispatcherOptions,
} from "./proxyFetchTransportSupport.ts";
import { tlsFingerprintProviderAllowed } from "./tlsFingerprintExclusions.ts";
export {
  runWithAppliedProxyCapture,
  currentAppliedProxySink,
  noteRotationAccount,
  noteAddedWait,
  readAddedWait,
} from "./appliedProxyContext.ts";
export type { AppliedProxySink, AddedWaitCause } from "./appliedProxyContext.ts";
export { setTlsClientForTest, describeFetchCause } from "./proxyFetchTransportSupport.ts";
export type { ProxyFetchDeps } from "./proxyFetchTransport.ts";

type TlsFingerprintStore = { used: boolean; provider?: string | null; sessionScope?: string };
type PatchState = {
  originalFetch: typeof globalThis.fetch;
  proxyContext: AsyncLocalStorage<unknown>;
  tlsFingerprintContext?: AsyncLocalStorage<TlsFingerprintStore>;
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
      tlsFingerprintContext: new AsyncLocalStorage(),
      isPatched: false,
    };
  }
  return scopedGlobal[PATCH_STATE_KEY];
}

const patchState = getPatchState();
patchState.tlsFingerprintContext ??= new AsyncLocalStorage<TlsFingerprintStore>();
const originalFetch = patchState.originalFetch;
const originalFetchWithDispatcher = originalFetch as FetchWithDispatcher;
const proxyContext = patchState.proxyContext;
const tlsFingerprintContext = patchState.tlsFingerprintContext;

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

    // Support wildcard matching (e.g. 192.168.* or *.local).
    // Uses a linear glob scan instead of dynamic RegExp to avoid ReDoS.
    if (patternHost.includes("*")) {
      const parts = patternHost.split("*");
      let pos = 0;
      let ok = hostname.startsWith(parts[0]);
      if (ok) {
        pos = parts[0].length;
        for (let i = 1; i < parts.length && ok; i++) {
          const seg = parts[i];
          if (i === parts.length - 1) {
            ok = seg === "" || (hostname.endsWith(seg) && hostname.length - seg.length >= pos);
          } else {
            const idx = seg ? hostname.indexOf(seg, pos) : pos;
            if (idx === -1) {
              ok = false;
            } else {
              pos = idx + seg.length;
            }
          }
        }
      }
      if (ok) return true;
    }

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

export function resolveProxyForRequest(targetUrl) {
  let target;
  try {
    target = new URL(targetUrl);
  } catch {
    target = null;
  }

  // Always bypass proxy for local/LAN addresses and operator-listed provider-node hosts
  if (target && isDirectBypassHost(target.hostname)) {
    return { source: "direct", proxyUrl: null };
  }

  const contextProxy = proxyContext.getStore();
  if (contextProxy === DIRECT_PROXY_CONTEXT) {
    return { source: "direct", proxyUrl: null };
  }
  if (contextProxy) {
    // #9551: NO_PROXY must bypass context-proxy too
    if (target && noProxyMatch(targetUrl)) {
      return { source: "direct", proxyUrl: null };
    }
    return { source: "context", proxyUrl: proxyConfigToUrl(contextProxy) };
  }

  const envProxyUrl = resolveEnvProxyUrl(targetUrl);
  if (envProxyUrl) {
    return { source: "env", proxyUrl: envProxyUrl };
  }

  return { source: "direct", proxyUrl: null };
}

export async function runWithProxyContext(
  proxyConfig,
  fn,
  opts?: { directFallbackOnUnreachable?: boolean }
) {
  if (typeof fn !== "function") {
    throw new TypeError("runWithProxyContext requires a callback function");
  }

  // Inherit existing context if no specific proxyConfig is provided. A direct
  // sentinel must remain direct without being mistaken for a proxy config.
  const currentContext = proxyContext.getStore();
  const inheritsDirect = currentContext === DIRECT_PROXY_CONTEXT && !proxyConfig;
  const effectiveProxyConfig = proxyConfig || (inheritsDirect ? null : currentContext) || null;
  const contextValue = inheritsDirect ? DIRECT_PROXY_CONTEXT : effectiveProxyConfig;

  const resolvedProxyUrl = effectiveProxyConfig ? proxyConfigToUrl(effectiveProxyConfig) : null;

  // The caller must opt in, and the runtime feature flag must also be enabled.
  // This fallback changes egress IP, so upgrades must not silently turn it on.
  const directFallbackOnUnreachable =
    opts?.directFallbackOnUnreachable === true && isControlPlaneProxyDirectFallbackEnabled();
  // Keep an explicit direct sentinel so resolveProxyForRequest cannot re-read
  // HTTPS_PROXY/HTTP_PROXY after the control-plane route decision.
  const runDirect = () => proxyContext.run(DIRECT_PROXY_CONTEXT, fn);

  // T14: Proxy Fast-Fail (non-blocking, #9100)
  // Perform a short TCP reachability check BEFORE issuing upstream requests.
  // Skip for edge-relay types (vercel / deno): proxyConfigToUrl returns
  // "https://<host>" which is the relay endpoint itself, not an HTTP proxy —
  // the actual routing is handled via x-relay-* headers below.
  //
  // Previously the probe was AWAITED before dispatch: every 30s healthy-TTL
  // window, the first request paid a full TCP+DNS round trip, and under
  // concurrent failures a throttled proxy turned that into queueing. Now the
  // probe fires WITHOUT awaiting and the request dispatches optimistically;
  // only if the probe resolves UNREACHABLE while the request is still in flight
  // do we fail fast with PROXY_UNREACHABLE (503).
  const isVercelRelay = isRelayType((effectiveProxyConfig as { type?: string })?.type);
  let unreachableProbe: Promise<boolean> | null = null;
  // Nested same-context call (the active proxyContext already IS this config):
  // skip the reachability probe and family pre-check — the outer scope already
  // ran them for this exact proxy, so re-probing only adds latency per layer.
  if (resolvedProxyUrl && !isVercelRelay && effectiveProxyConfig !== currentContext) {
    if (directFallbackOnUnreachable) {
      // Opt-in control-plane direct-fallback path: keep the BLOCKING probe —
      // this path must decide direct-vs-proxy BEFORE dispatch, so the probe
      // result is load-bearing here. Unchanged behavior.
      const reachable = await isProxyReachable(resolvedProxyUrl);
      if (!reachable) {
        const proxyLabel = proxyUrlForLogs(resolvedProxyUrl);
        console.warn(
          `[ProxyFetch] Proxy unreachable (${proxyLabel}); using a direct connection for this request.`
        );
        return runDirect();
      }
    } else if (new URL(resolvedProxyUrl).protocol !== "socks5:") {
      // Fire the probe WITHOUT awaiting; dispatch optimistically below.
      unreachableProbe = isProxyReachable(resolvedProxyUrl);
    }
  }

  // Fail-closed family check: when the proxy URL carries a ?family=ipv6|ipv4 marker
  // (set for HOSTNAME proxies by proxyConfigToUrl), verify the hostname actually has a
  // record in that family before egressing. Refuse early rather than silently fall back
  // to the other family. No-op for IP literals (their family is intrinsic).
  // Nested same-context call: skip the family pre-check too — the outer scope
  // already verified this exact proxy (mirrors the probe gate above).
  if (resolvedProxyUrl && !isVercelRelay && effectiveProxyConfig !== currentContext) {
    try {
      const u = new URL(resolvedProxyUrl);
      const fam = u.searchParams.get("family");
      if (fam === "ipv6" || fam === "ipv4") {
        const { assertHostnameSupportsFamily } = await import("./proxyFamilyResolve.ts");
        await assertHostnameSupportsFamily(u.hostname, fam === "ipv6" ? 6 : 4);
      }
    } catch (familyErr) {
      if (directFallbackOnUnreachable) {
        console.warn(
          `[ProxyFetch] Proxy family pre-check failed (${proxyUrlForLogs(resolvedProxyUrl)}); using a direct connection for this request.`
        );
        return runDirect();
      }
      const e = familyErr as Error & { code?: string; statusCode?: number };
      e.code = e.code || "PROXY_FAMILY_UNAVAILABLE";
      e.statusCode = e.statusCode || 503;
      throw e;
    }
  }

  return proxyContext.run(contextValue, async () => {
    if (resolvedProxyUrl && effectiveProxyConfig !== currentContext) {
      // #9158: this fires on EVERY proxied request (innermost context wins).
      // Gate it behind the same env flag as the relay routing log so request
      // traffic doesn't spam stdout at production log levels.
      if (process.env.OMNIROUTE_PROXY_FETCH_DEBUG === "true") {
        console.log(
          `[ProxyFetch] Applied request proxy context: ${proxyUrlForLogs(resolvedProxyUrl)}`
        );
      }
    }
    // #5217: record the proxy actually applied so a post-execution egress logger
    // reflects the real egress (executors that pin a per-account proxy internally
    // otherwise leave proxyInfo reading "direct"). Innermost runWithProxyContext
    // wins, which is exactly the per-account proxy the executor selected.
    if (effectiveProxyConfig) {
      const sink = getAppliedProxyContext().getStore();
      if (sink) sink.proxy = effectiveProxyConfig;
    }

    const requestPromise = Promise.resolve().then(() => fn());
    if (!unreachableProbe) return requestPromise;

    // #9100: non-blocking fast-fail — race the background probe against the
    // request. Only if the probe resolves UNREACHABLE while the request is
    // still in flight do we abort it with PROXY_UNREACHABLE (503). If the
    // request already settled (or the probe found the proxy reachable), the
    // request wins and the stale probe result is ignored — the first dispatch
    // is NEVER gated on the probe.
    const winner = await Promise.race([
      unreachableProbe.then((reachable) => ({ kind: "probe" as const, reachable })),
      requestPromise.then((value) => ({ kind: "request" as const, value })),
    ]);

    if (winner.kind === "probe" && !winner.reachable) {
      // Proxy is dead and the request is still in flight → fail fast with the
      // standard PROXY_UNREACHABLE error (503). The in-flight request's own
      // result is discarded (its executor-level signal will still fire); the
      // caller observes this fast failure instead of the ~30s timeout stall.
      requestPromise.catch(() => {});
      const proxyLabel = proxyUrlForLogs(resolvedProxyUrl);
      const err = new Error(`[Proxy Fast-Fail] Proxy unreachable: ${proxyLabel}`) as Error & {
        code?: string;
        errorCode?: string;
        statusCode?: number;
      };
      err.code = "PROXY_UNREACHABLE";
      err.errorCode = "proxy_unreachable";
      err.statusCode = 503;
      throw err;
    }

    if (winner.kind === "probe") {
      // Probe said reachable but the request is still pending — keep waiting.
      return await requestPromise;
    }
    return winner.value;
  });
}

/** Run a request with an explicit direct-egress sentinel, bypassing proxy env/context lookup. */
export function runWithDirectFetchContext<T>(fn: () => T): T {
  return proxyContext.run(DIRECT_PROXY_CONTEXT, fn);
}

/**
 * True when the caller already runs inside an explicit proxy context — i.e. an
 * outer runWithProxyContext(proxyConfig, ...) pinned a proxy for this async
 * scope. False for an empty store and for the direct sentinel.
 */
export function hasAmbientProxyContext(): boolean {
  const store = proxyContext.getStore();
  return Boolean(store) && store !== DIRECT_PROXY_CONTEXT;
}
export const isDirectFetchContext = () => proxyContext.getStore() === DIRECT_PROXY_CONTEXT;

/**
 * Like {@link runWithProxyContext}, but if the assigned proxy is unreachable or fails
 * its pre-checks the request can degrade to a DIRECT connection instead of throwing.
 *
 * For control-plane flows — OAuth code/token exchange, connection tests, token refresh —
 * where a dead pinned proxy must not block reaching the upstream (it otherwise surfaces
 * as a generic "Internal server error"). Data-plane chat keeps strict pinning via
 * runWithProxyContext so per-account egress-IP isolation is preserved.
 *
 * This remains disabled unless OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK is enabled
 * from Feature Flags or the environment.
 */
export async function runWithProxyContextOrDirect(proxyConfig, fn) {
  return runWithProxyContext(proxyConfig, fn, { directFallbackOnUnreachable: true });
}

function patchedFetchUnrecorded(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions = {},
  deps: ProxyFetchDeps = {}
) {
  return dispatchProxyFetch(input, options, deps, {
    originalFetch,
    originalFetchWithDispatcher,
    proxyContext,
    tlsFingerprintContext,
    resolveProxyForRequest,
  });
}

const getAppliedProxySink = () => getAppliedProxyContext().getStore();
const patchedFetch = withUpstreamStatusCapture(patchedFetchUnrecorded, getAppliedProxySink);

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

export type TlsTrackingIdentity = {
  provider?: string | null;
  sessionScope?: string;
};

/**
 * Run a function with account-scoped TLS fingerprint tracking.
 * Both historical forms remain valid: runWithTlsTracking(fn) and
 * runWithTlsTracking(provider, fn).
 */
export async function runWithTlsTracking<T>(
  fn: () => T
): Promise<{ result: Awaited<T>; tlsFingerprintUsed: boolean }>;
export async function runWithTlsTracking<T>(
  provider: string | null | undefined,
  fn: () => T
): Promise<{ result: Awaited<T>; tlsFingerprintUsed: boolean }>;
export async function runWithTlsTracking<T>(
  identity: TlsTrackingIdentity,
  fn: () => T
): Promise<{ result: Awaited<T>; tlsFingerprintUsed: boolean }>;
export async function runWithTlsTracking<T>(
  providerOrIdentityOrFn: string | null | undefined | TlsTrackingIdentity | (() => T),
  maybeFn?: () => T
): Promise<{ result: Awaited<T>; tlsFingerprintUsed: boolean }> {
  const legacyFn = typeof providerOrIdentityOrFn === "function" ? providerOrIdentityOrFn : maybeFn;
  if (typeof legacyFn !== "function") {
    throw new TypeError("runWithTlsTracking requires a callback function");
  }
  const identity: TlsTrackingIdentity =
    providerOrIdentityOrFn &&
    typeof providerOrIdentityOrFn === "object" &&
    typeof providerOrIdentityOrFn !== "function"
      ? providerOrIdentityOrFn
      : {
          provider: typeof providerOrIdentityOrFn === "string" ? providerOrIdentityOrFn : undefined,
        };
  const store: TlsFingerprintStore = {
    used: false,
    provider: identity.provider,
    sessionScope: identity.sessionScope,
  };
  const result = await tlsFingerprintContext.run(store, legacyFn);
  return { result, tlsFingerprintUsed: store.used };
}

/** Check whether TLS fingerprint transport is enabled for this route identity. */
export function isTlsFingerprintActive(provider?: string | null, proxied = false): boolean {
  return (
    isTlsFingerprintEnabled() &&
    activeTlsClient.available &&
    tlsFingerprintProviderAllowed(provider, proxied)
  );
}

/**
 * Get the original unpatched global fetch function (Node.js native fetch
 * before the proxy/TLS fingerprint patch was applied).
 * Use this to bypass the patched fetch for specific requests when the
 * proxy dispatcher has compatibility issues with a particular endpoint.
 */
export function getOriginalFetch(): typeof globalThis.fetch {
  return originalFetch;
}

/** Test-only: exposes the relay Agent options for config assertions (#9100). */
export function __getRelayPoolAgentOptionsForTest() {
  return RELAY_POOL_AGENT_OPTIONS;
}

export default isCloud ? originalFetch : patchedFetch;
