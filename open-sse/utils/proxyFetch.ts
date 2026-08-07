// @ts-nocheck
import "./setupPolyfill.ts";
import { AsyncLocalStorage } from "node:async_hooks";
import { fetch as undiciFetch, Agent } from "undici";
import {
  buildVercelRelayHeaders,
  createProxyDispatcher,
  getDefaultDispatcher,
  getProxyRetryDispatcher,
  getRetryDispatcher,
  isRelayType,
  normalizeProxyUrl,
  proxyConfigToUrl,
  proxyUrlForLogs,
} from "./proxyDispatcher.ts";
import tlsClient from "./tlsClient.ts";
import { isProxyReachable } from "@/lib/proxyHealth";
import {
  isControlPlaneProxyDirectFallbackEnabled,
  isFeatureFlagEnabled,
} from "@/shared/utils/featureFlags";

// #9100: relay egress (Vercel / Deno / Cloudflare edge functions) used to go
// through bare `originalFetch` — NO connection pooling, NO timeout, NO retry.
// Every relay request opened a fresh TCP+TLS handshake and a throttled edge
// relay serialized concurrent requests behind ~30s stalls. This module-level
// singleton Agent gives the relay path the same pooling the HTTP-proxy path
// gets from createProxyDispatcher: reused TCP connections per relay host.
//
// `connections: 4` removes head-of-line blocking on h1-only relays: undici never
// pipelines POST (SSE is POST), so a single socket would serialize every
// concurrent stream; 4 sockets give 4 parallel streams. h2 relays are
// unaffected — streams multiplex over one socket, so the pool stays at a single
// connection while streams drain. `allowH2: true` keeps that h2 fast path for
// Vercel / Deno / Cloudflare.
const RELAY_POOL_AGENT_OPTIONS = {
  keepAliveTimeout: 30_000,
  keepAliveMaxTimeout: 60_000,
  pipelining: 4,
  connections: 4,
  allowH2: true,
} as const;
const RELAY_POOL_AGENT = new Agent(RELAY_POOL_AGENT_OPTIONS);

// Retry path for a relay that just failed with a transient socket error: a
// FRESH socket (keep-alive disabled) so a stale pooled connection is recovered
// instead of re-hitting the dead one (mirrors the proxy/direct retry paths).
const RELAY_RETRY_AGENT = new Agent({
  keepAliveTimeout: 1,
  keepAliveMaxTimeout: 1,
  pipelining: 0,
  connections: 1,
  allowH2: true,
});

// A hung relay must fail BEFORE the client/agent timeout (typically 30s) so the
// caller sees a relay-specific failure instead of a generic upstream timeout.
// Overridable via OMNIROUTE_RELAY_FETCH_TIMEOUT_MS (capped at 29s so the
// relay-specific timeout always fires first).
function readRelayFetchTimeoutMs(): number {
  const raw = process.env.OMNIROUTE_RELAY_FETCH_TIMEOUT_MS;
  if (raw == null || raw.trim() === "") return 25_000;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) {
    console.warn(
      `[ProxyFetch] Invalid OMNIROUTE_RELAY_FETCH_TIMEOUT_MS="${raw}". Using default 25000.`
    );
    return 25_000;
  }
  return Math.min(Math.floor(parsed), 29_000);
}
const RELAY_FETCH_TIMEOUT_MS = readRelayFetchTimeoutMs();

// Shared retry backoff for the direct / relay / proxy retry-once paths.
// Overridable via OMNIROUTE_RETRY_BACKOFF_MS (0 = retry immediately).
const RETRY_BACKOFF_MS = Math.max(Number(process.env.OMNIROUTE_RETRY_BACKOFF_MS) || 10, 0);

function isTlsFingerprintEnabled() {
  return process.env.ENABLE_TLS_FINGERPRINT === "true";
}

// #8376: transport-level connect-failure codes that mean "the configured upstream
// proxy (or the target itself, for direct egress) is unreachable" — as opposed to an
// ordinary upstream HTTP error. Read `.code` first (stable across undici/node
// versions); native fetch wraps the real socket error in `.cause`, so fall back to
// `.cause.code` when the top-level error is a bare "fetch failed" TypeError.
const PROXY_UNREACHABLE_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "ENETUNREACH",
  "EHOSTUNREACH",
  "EPIPE",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_SOCKET",
]);

function isProxyUnreachableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const code = (err as { code?: unknown }).code;
  if (typeof code === "string" && PROXY_UNREACHABLE_ERROR_CODES.has(code)) return true;
  const cause = (err as { cause?: unknown }).cause;
  const causeCode =
    cause && typeof cause === "object" ? (cause as { code?: unknown }).code : undefined;
  if (typeof causeCode === "string" && PROXY_UNREACHABLE_ERROR_CODES.has(causeCode)) return true;
  const msg = (err as Error).message;
  return typeof msg === "string" && PROXY_UNREACHABLE_ERROR_CODES.has(msg);
}
/**
 * #8376: tag a connect-failure error with a stable `.code`/`.errorCode` BEFORE it is
 * rethrown, so chatCore's catch block (and, through the response body, the combo
 * provider-breaker predicate) can classify it as "proxy unreachable" instead of
 * falling through to a generic 502 that never trips the whole-provider breaker on a
 * homogeneous same-provider combo pool. No-op when the error isn't connect-shaped.
 */
function tagProxyUnreachable<T>(err: T): T {
  if (isProxyUnreachableError(err)) {
    const e = err as Error & { code?: string; errorCode?: string };
    e.code = "PROXY_UNREACHABLE";
    e.errorCode = "proxy_unreachable";
  }
  return err;
}

/** Per-request tracking of whether TLS fingerprint was used */
type TlsFingerprintStore = { used: boolean };
const tlsFingerprintContext = new AsyncLocalStorage<TlsFingerprintStore>();

/**
 * #5217 (Gap-secondary): a mutable sink that records the proxy actually applied
 * by `runWithProxyContext` for the in-flight request. Executors that pin their
 * own per-account proxy *internally* (e.g. OpencodeExecutor wraps its dispatch
 * in `runWithProxyContext(account.proxy, …)`) never propagate that choice back
 * to the caller's `proxyInfo`, so the post-execution `[ProxyEgress]` line logged
 * `proxy=direct` even though `[ProxyFetch] Applied request proxy context: …`
 * fired. Wrapping the execution in `runWithAppliedProxyCapture(sink, fn)` lets
 * the egress logger read the innermost applied proxy (the last writer wins, which
 * is the executor's per-account proxy).
 */
export type AppliedProxySink = { proxy: unknown };
const appliedProxyContext = new AsyncLocalStorage<AppliedProxySink>();

/**
 * Run `fn` with an applied-proxy capture sink in context. Any
 * `runWithProxyContext` call inside `fn` that ends up applying a proxy records
 * that proxy config into `sink.proxy` (innermost wins). The sink is a plain
 * mutable object the caller retains, so it can read `sink.proxy` after `fn`
 * resolves. Pure plumbing — no behavioral change to the request itself.
 */
export function runWithAppliedProxyCapture<T>(sink: AppliedProxySink, fn: () => T): T {
  return appliedProxyContext.run(sink, fn);
}

type FetchWithDispatcherOptions = RequestInit & { dispatcher?: unknown };
type FetchWithDispatcher = (
  input: RequestInfo | URL,
  init?: FetchWithDispatcherOptions
) => Promise<Response>;

/**
 * Flatten a fetch error's `cause` chain (and any Happy-Eyeballs `AggregateError`
 * sub-errors) into a single diagnostic line: code/syscall/errno/address:port + a
 * truncated message. undici/native both reject with a bare `TypeError: fetch failed`
 * whose real reason hides in `.cause`; surfacing it is what makes dispatcher-failure
 * bursts (#4252) diagnosable. Never includes a stack trace (Rule #12). Pure + testable.
 */
export function describeFetchCause(err: unknown): string {
  const parts: string[] = [];
  const seen = new Set<unknown>();
  let cur: unknown = err;
  for (let depth = 0; cur && depth < 5 && !seen.has(cur); depth++) {
    seen.add(cur);
    const e = cur as Record<string, unknown>;
    const seg = [
      typeof e.name === "string" && e.name !== "Error" ? e.name : null,
      typeof e.message === "string" ? e.message.slice(0, 160) : null,
      e.code != null ? `code=${String(e.code)}` : null,
      e.syscall != null ? `syscall=${String(e.syscall)}` : null,
      e.errno != null ? `errno=${String(e.errno)}` : null,
      e.address != null
        ? `address=${String(e.address)}${e.port != null ? `:${String(e.port)}` : ""}`
        : null,
    ]
      .filter(Boolean)
      .join(" ");
    if (seg) parts.push(seg);
    if (Array.isArray(e.errors)) {
      for (const sub of (e.errors as unknown[]).slice(0, 4)) {
        const s = (sub ?? {}) as Record<string, unknown>;
        const subSeg = [
          s.code != null ? `code=${String(s.code)}` : null,
          s.syscall != null ? `syscall=${String(s.syscall)}` : null,
          s.address != null
            ? `address=${String(s.address)}${s.port != null ? `:${String(s.port)}` : ""}`
            : null,
        ]
          .filter(Boolean)
          .join(" ");
        if (subSeg) parts.push(`↳ ${subSeg}`);
        else if (typeof s.message === "string") parts.push(`↳ ${s.message.slice(0, 80)}`);
      }
    }
    cur = e.cause;
  }
  return parts.join(" | ") || String(err);
}

function isStreamLikeBody(body: unknown): boolean {
  return (
    body !== null &&
    body !== undefined &&
    typeof body === "object" &&
    (typeof (body as Record<string, unknown>).getReader === "function" ||
      typeof (body as Record<string, unknown>).stream === "function")
  );
}

function requestHasNonReplayableBody(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions
): boolean {
  if (isStreamLikeBody(options.body as unknown)) return true;
  if (typeof Request !== "undefined" && input instanceof Request) {
    if (input.bodyUsed) return true;
    if (input.body !== null) return true;
  }
  return false;
}

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

function isLocalAddress(hostname: string): boolean {
  const host = hostname
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/^::ffff:/i, "");
  if (host === "localhost" || host === "0.0.0.0" || host === "127.0.0.1" || host === "::1") {
    return true;
  }
  if (host.endsWith(".local") || host.endsWith(".lan") || host.endsWith(".internal")) return true;
  // RFC1918 + loopback + link-local (169.254, incl. cloud metadata 169.254.169.254)
  // + CGNAT (100.64/10). 127/8 covers all loopback, not just 127.0.0.1.
  if (host.startsWith("192.168.")) return true;
  if (host.startsWith("10.")) return true;
  if (host.startsWith("127.")) return true;
  if (host.startsWith("169.254.")) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return true;
  if (/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(host)) return true;
  // IPv6 ULA (fc00::/7 → fc/fd prefix) and link-local (fe80::/10)
  if (/^f[cd][0-9a-f]*:/i.test(host) || host.startsWith("fe80:")) return true;
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

/**
 * A caller-initiated abort/timeout is not a proxy transport failure — it must
 * not be misreported as one. Prefer `signal.aborted` because
 * `AbortController.abort(reason)` may surface a custom Error rather than a
 * standard AbortError/TimeoutError name.
 * Ported from decolua/9router#2589 (`isCallerAbort`).
 */
function isCallerAbort(error: unknown, signal: AbortSignal | null | undefined): boolean {
  if (signal?.aborted === true) return true;
  const name = (error as { name?: unknown } | null)?.name;
  return name === "AbortError" || name === "TimeoutError";
}

function getTargetUrl(input) {
  if (typeof input === "string") return input;
  if (input && typeof input.url === "string") return input.url;
  return String(input);
}

export async function runWithProxyContext(
  proxyConfig,
  fn,
  opts?: { directFallbackOnUnreachable?: boolean }
) {
  if (typeof fn !== "function") {
    throw new TypeError("runWithProxyContext requires a callback function");
  }

  // Inherit existing context if no specific proxyConfig is provided
  const currentContext = proxyContext.getStore();
  const effectiveProxyConfig = proxyConfig || currentContext || null;

  const resolvedProxyUrl = effectiveProxyConfig ? proxyConfigToUrl(effectiveProxyConfig) : null;

  // The caller must opt in, and the runtime feature flag must also be enabled.
  // This fallback changes egress IP, so upgrades must not silently turn it on.
  const directFallbackOnUnreachable =
    opts?.directFallbackOnUnreachable === true && isControlPlaneProxyDirectFallbackEnabled();
  // Run fn with the proxy context cleared so the request egresses directly.
  const runDirect = () => proxyContext.run(null, fn);

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
    } else {
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

  return proxyContext.run(effectiveProxyConfig, async () => {
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
      const sink = appliedProxyContext.getStore();
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
    // Non-replayable body guard: if the body is stream-like (ReadableStream/Blob)
    // or the input is a Request that carries a body, the first dispatcher attempt
    // owns that body. Retrying or falling back to native fetch would replay a
    // consumed/locked body and can mask the original transport error with
    // "Response body object should not be disturbed or locked".
    const hasNonReplayableBody = requestHasNonReplayableBody(input, options);
    const maxAttempts = hasNonReplayableBody ? 1 : 2;
    const _undiciDirect =
      deps.undiciFetch ?? (undiciFetch as unknown as (...args: unknown[]) => Promise<Response>);
    const _nativeFallback =
      (deps.nativeFetch as FetchWithDispatcher | undefined) ?? originalFetchWithDispatcher;
    let lastDispatcherError: unknown = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await _undiciDirect(input, {
          ...options,
          // #4252: first attempt uses the pooled keep-alive dispatcher; a retry
          // (after a transient socket error) uses the no-keep-alive dispatcher so
          // it opens a FRESH socket instead of grabbing another stale pooled one
          // — the burst pattern was the retry re-hitting a dead pooled socket and
          // then falling through to native fetch (which also pools) → 502.
          dispatcher: attempt === 0 ? getDefaultDispatcher() : getRetryDispatcher(),
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
        tagProxyUnreachable(dispatcherError);
        const errCode = (dispatcherError as { code?: unknown })?.code;
        if (
          msg.includes("fetch failed") ||
          errCode === "ECONNREFUSED" ||
          msg.includes("ECONNREFUSED") ||
          (typeof errCode === "string" && errCode.startsWith("UND_ERR")) ||
          msg.includes("UND_ERR")
        ) {
          if (attempt === 0 && maxAttempts > 1) {
            // First failure — retry once after a short backoff before giving up.
            // Delay is OMNIROUTE_RETRY_BACKOFF_MS (default 10ms): a fixed backoff
            // beats random jitter here because the retry opens a fresh socket, so
            // jitter was pure added latency with no herd benefit.
            lastDispatcherError = dispatcherError;
            await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS));
            continue;
          }
          if (hasNonReplayableBody) {
            const detail = `dispatcher=[${describeFetchCause(dispatcherError)}] native=[skipped: non-replayable request body]`;
            console.warn(
              `[ProxyFetch] skipping native fetch fallback for non-replayable body: ${detail}`
            );
            if (dispatcherError instanceof Error) {
              (dispatcherError as Error & { proxyFetchDetail?: string }).proxyFetchDetail = detail;
            }
            throw tagProxyUnreachable(dispatcherError);
          }

          // All attempts exhausted — try proxy fallback before native fetch
          if (source === "direct" && isFeatureFlagEnabled("PROXY_AUTO_SELECT_ENABLED")) {
            let targetHostname = "";
            try {
              targetHostname = new URL(targetUrl).hostname;
            } catch {
              // ignore
            }
            if (targetHostname) {
              const { findWorkingProxy } = await import("./proxyFallback.ts");
              const fallbackProxyUrl = await findWorkingProxy(targetHostname, targetUrl);
              if (fallbackProxyUrl) {
                try {
                  const dispatcher = createProxyDispatcher(fallbackProxyUrl);
                  return await _undiciDirect(input, { ...options, dispatcher });
                } catch {
                  // Proxy also failed — fall through to native fetch
                }
              }
            }
          }
          // Preserve original phrase intact for monitoring: "Undici dispatcher failed, falling back to native fetch"
          // #4252: append the flattened err.cause (code/syscall/errno/address) — the bare
          // "fetch failed" message hides what actually broke, making bursts undiagnosable.
          console.warn(
            `[ProxyFetch] Undici dispatcher failed, falling back to native fetch (after retry): ${describeFetchCause(dispatcherError)}`
          );
          try {
            return await _nativeFallback(input, options);
          } catch (nativeError) {
            // #4252: both the undici dispatcher AND native fetch failed. Surface BOTH
            // causes (server log) and tag the propagated error so the combo executor sees
            // a diagnosable failure IMMEDIATELY instead of a bare "fetch failed" — the
            // latter left jobs sitting until the 30s semaphore queue timeout, which then
            // tripped the circuit breaker.
            const detail = `dispatcher=[${describeFetchCause(dispatcherError)}] native=[${describeFetchCause(nativeError)}]`;
            console.warn(`[ProxyFetch] native fetch fallback ALSO failed: ${detail}`);
            if (nativeError instanceof Error) {
              (nativeError as Error & { proxyFetchDetail?: string }).proxyFetchDetail = detail;
            }
            tagProxyUnreachable(nativeError);
            throw nativeError;
          }
        }
        tagProxyUnreachable(dispatcherError);
        throw dispatcherError;
      }
    }
    // Should not be reached, but satisfy TypeScript control-flow.
    throw lastDispatcherError;
  }

  // Edge relay (vercel / deno): instead of routing through an HTTP proxy
  // dispatcher, we send x-relay-* headers to the edge function which forwards
  // the request upstream. Both backends share the same envelope shape.
  const contextProxy = proxyContext.getStore();
  if (
    contextProxy &&
    typeof contextProxy === "object" &&
    isRelayType((contextProxy as { type?: string }).type)
  ) {
    const vc = contextProxy as { type?: string; host?: string; relayAuth?: string };
    if (!vc.relayAuth) {
      // Generic message without internal labels — this throw can bubble up to
      // catch blocks that put error.message in response bodies (combo per-model
      // timeout, executor catch-all). Don't leak "[ProxyFetch]" diagnostics.
      const label = vc.type === "vercel" ? "Vercel relay" : `${vc.type || "Edge"} relay`;
      throw new Error(`${label} configuration error: missing relayAuth`);
    }
    const targetUrl = getTargetUrl(input);
    const relayHeaders = buildVercelRelayHeaders(targetUrl, vc.relayAuth);
    const mergedHeaders = new Headers(options?.headers);
    for (const [k, v] of Object.entries(relayHeaders)) mergedHeaders.set(k, v);
    // Pass host through proxyUrlForLogs so the same redaction policy applies
    // to relay routing logs (the rest of this module already follows that rule).
    const hostForLogs = proxyUrlForLogs(vc.host ? `https://${vc.host}` : "");
    if (process.env.OMNIROUTE_PROXY_FETCH_DEBUG === "true") {
      console.debug(`[ProxyFetch] Routing via ${vc.type || "edge"} relay: ${hostForLogs}`);
    }

    // #9100/#9158: pooled, timed, retried relay egress. Bare `originalFetch` had
    // no pooling — a throttled relay serialized concurrent requests behind ~30s
    // stalls. Route through the module-level RELAY_POOL_AGENT (FOUR reused TCP
    // connections per relay host, pipelining 4 — a single connection let one
    // long SSE stream monopolize the pool, HOL-blocking every other request),
    // cap EACH attempt at RELAY_FETCH_TIMEOUT_MS (default 25s, before the typical
    // 30s client/agent timeout), and retry ONCE on transport failure through a
    // FRESH no-keep-alive RELAY_RETRY_AGENT. An internal per-attempt timeout is
    // NOT retried — it fails fast as RELAY_TIMEOUT (504). Do NOT fall back to
    // native fetch for the relay path: it has no pooling and would churn
    // connections again.
    const _undiciRelay =
      deps.undiciFetch ?? (undiciFetch as unknown as (...args: unknown[]) => Promise<Response>);
    const hasNonReplayableRelayBody = requestHasNonReplayableBody(input, options);
    const maxRelayAttempts = hasNonReplayableRelayBody ? 1 : 2;
    const relayUrl = `https://${vc.host}`;
    let lastRelayError: unknown = null;
    for (let attempt = 0; attempt < maxRelayAttempts; attempt++) {
      // A fresh timeout signal per attempt: RELAY_FETCH_TIMEOUT_MS is per-try,
      // so a hung relay that survives the first attempt still gets a full
      // window on retry. Manual AbortController instead of
      // AbortSignal.any([...]) so the relay branch stays free of the literal
      // word `any` (T11 any-budget checker).
      const relayController = new AbortController();
      const relayTimer = setTimeout(() => relayController.abort(), RELAY_FETCH_TIMEOUT_MS);
      const onCallerAbort = () => relayController.abort();
      options.signal?.addEventListener("abort", onCallerAbort, { once: true });
      try {
        return await _undiciRelay(relayUrl, {
          ...options,
          headers: mergedHeaders,
          duplex: "half",
          dispatcher: attempt === 0 ? RELAY_POOL_AGENT : RELAY_RETRY_AGENT,
          signal: relayController.signal,
        });
      } catch (relayError) {
        // #9158: classify an internal per-attempt timeout FIRST — a relay that
        // hangs past RELAY_FETCH_TIMEOUT_MS must fail fast as RELAY_TIMEOUT (504)
        // and NOT be retried, instead of surviving into the caller's ~30s stall.
        // The manual relayController fires only on this branch's own timer, so
        // `relayController.signal.aborted` alone cannot be a caller abort; when
        // BOTH fire, the caller abort wins (guarded by the check below).
        const isRelayTimeout = relayController.signal.aborted && options?.signal?.aborted !== true;
        if (isRelayTimeout) {
          const timeoutErr = new Error(
            `[ProxyFetch] Relay timed out after ${RELAY_FETCH_TIMEOUT_MS}ms (${proxyUrlForLogs(relayUrl)})`
          ) as Error & { code?: string; errorCode?: string; statusCode?: number };
          timeoutErr.code = "RELAY_TIMEOUT";
          timeoutErr.errorCode = "relay_timeout";
          timeoutErr.statusCode = 504;
          throw timeoutErr;
        }
        if (isCallerAbort(relayError, options?.signal)) throw relayError;
        const msg = relayError instanceof Error ? relayError.message : String(relayError);
        const errCode = (relayError as { code?: unknown })?.code;
        const isTransportFailure =
          msg.includes("fetch failed") ||
          errCode === "ECONNREFUSED" ||
          msg.includes("ECONNREFUSED") ||
          (typeof errCode === "string" && errCode.startsWith("UND_ERR")) ||
          msg.includes("UND_ERR");
        if (attempt === 0 && maxRelayAttempts > 1 && isTransportFailure) {
          lastRelayError = relayError;
          // #9158: fixed OMNIROUTE_RETRY_BACKOFF_MS backoff — the retry uses a
          // FRESH no-keep-alive RELAY_RETRY_AGENT (connections: 1, keepAliveTimeout:
          // 1ms) instead of reusing the pooled agent, so a stale pooled socket
          // that the relay half-closed is guaranteed a clean TCP handshake.
          // Jitter is unnecessary: there is no herd on a per-host singleton.
          await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS));
          continue;
        }
        throw relayError;
      } finally {
        clearTimeout(relayTimer);
        options.signal?.removeEventListener("abort", onCallerAbort);
      }
    }
    throw lastRelayError;
  }

  // #9100: proxy path — attempt 0 uses the pooled keep-alive dispatcher
  // (pipelining 4, ONE reused TCP connection per proxy host). A transient
  // socket error on a stale pooled socket is retried ONCE on a fresh
  // no-keep-alive dispatcher (mirrors the direct-path #4252 pattern) instead
  // of killing all idle sockets after 1ms or surfacing a bare 502.
  const _undiciProxy =
    deps.undiciFetch ?? (undiciFetch as unknown as (...args: unknown[]) => Promise<Response>);
  const hasNonReplayableProxyBody = requestHasNonReplayableBody(input, options);
  const maxProxyAttempts = hasNonReplayableProxyBody ? 1 : 2;
  let lastProxyError: unknown = null;
  for (let attempt = 0; attempt < maxProxyAttempts; attempt++) {
    try {
      return await _undiciProxy(input, {
        ...options,
        dispatcher:
          attempt === 0 ? createProxyDispatcher(proxyUrl) : getProxyRetryDispatcher(proxyUrl),
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      const errCode = (error as { code?: unknown })?.code;
      const isTransportFailure =
        msg.includes("fetch failed") ||
        errCode === "ECONNREFUSED" ||
        msg.includes("ECONNREFUSED") ||
        (typeof errCode === "string" && errCode.startsWith("UND_ERR")) ||
        msg.includes("UND_ERR");
      if (attempt === 0 && maxProxyAttempts > 1 && isTransportFailure) {
        lastProxyError = error;
        // #9158: fixed OMNIROUTE_RETRY_BACKOFF_MS backoff — the retry uses a
        // fresh no-keep-alive dispatcher (getProxyRetryDispatcher), so the old
        // random jitter was pure latency on every recovered request with no
        // herd risk (per-host pool).
        await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS));
        continue;
      }
      // A caller abort/timeout must propagate unchanged and without a noisy
      // "Proxy request failed" log — it's not a proxy transport failure.
      if (!isCallerAbort(error, options?.signal)) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[ProxyFetch] Proxy request failed (${source}, fail-closed): ${message}`);
      }
      throw error;
    }
  }
  throw lastProxyError;
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
