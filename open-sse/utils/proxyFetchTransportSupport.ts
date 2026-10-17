import { Agent } from "undici";
import tlsClient, { type TlsFetchOptions } from "./tlsClient.ts";
import { isUpstreamHttp2Enabled } from "./proxyDispatcher.ts";
export type FetchWithDispatcherOptions = RequestInit & { dispatcher?: unknown };
export type FetchWithDispatcher = (
  input: RequestInfo | URL,
  init?: FetchWithDispatcherOptions
) => Promise<Response>;
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
// connection while streams drain. HTTP/2 stays enabled by default for
// Vercel / Deno / Cloudflare; operators can opt out when needed.
export const RELAY_POOL_AGENT_OPTIONS = {
  keepAliveTimeout: 30_000,
  keepAliveMaxTimeout: 60_000,
  pipelining: 4,
  connections: 4,
  allowH2: isUpstreamHttp2Enabled(),
} as const;
export const RELAY_POOL_AGENT = new Agent(RELAY_POOL_AGENT_OPTIONS);

// Retry path for a relay that just failed with a transient socket error: a
// FRESH socket (keep-alive disabled) so a stale pooled connection is recovered
// instead of re-hitting the dead one (mirrors the proxy/direct retry paths).
export const RELAY_RETRY_AGENT = new Agent({
  keepAliveTimeout: 1,
  keepAliveMaxTimeout: 1,
  pipelining: 0,
  connections: 1,
  allowH2: isUpstreamHttp2Enabled(),
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
export const RELAY_FETCH_TIMEOUT_MS = readRelayFetchTimeoutMs();

// Shared retry backoff for the direct / relay / proxy retry-once paths.
// Overridable via OMNIROUTE_RETRY_BACKOFF_MS (0 = retry immediately).
export const RETRY_BACKOFF_MS = Math.max(Number(process.env.OMNIROUTE_RETRY_BACKOFF_MS) || 10, 0);

export function isTlsFingerprintEnabled() {
  return process.env.ENABLE_TLS_FINGERPRINT === "true";
}

/**
 * Per-provider TLS impersonation profile. Most providers use the default
 * Chrome/macOS wreq profile; providers that must match a specific browser
 * fingerprint (e.g. MaxAI expects a Windows Firefox-150 client) override it here.
 * Returns undefined to keep the tlsClient default (chrome_124 / macos).
 */
const TLS_PROVIDER_PROFILE: Record<string, { browser: string; os: string }> = {
  maxai: { browser: "firefox_150", os: "windows" },
};

type TlsProfileResult = { browserProfile?: string; os?: string };
export function tlsProfileForProvider(provider: string | null | undefined): TlsProfileResult {
  if (!provider) return {};
  const p = TLS_PROVIDER_PROFILE[provider.trim().toLowerCase()];
  return p ? { browserProfile: p.browser, os: p.os } : {};
}

type TlsClientLike = {
  available: boolean;
  fetch: (url: string, options?: TlsFetchOptions) => Promise<Response>;
};
export let activeTlsClient: TlsClientLike = tlsClient;

/** Test seam for exercising wreq selection without replacing the module loader. */
export function setTlsClientForTest(client: TlsClientLike | null): void {
  activeTlsClient = client ?? tlsClient;
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

export function isProxyUnreachableError(err: unknown): boolean {
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
export function tagProxyUnreachable<T>(err: T): T {
  if (isProxyUnreachableError(err)) {
    const e = err as Error & { code?: string; errorCode?: string };
    e.code = "PROXY_UNREACHABLE";
    e.errorCode = "proxy_unreachable";
  }
  return err;
}

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
    const seg = causeSegment(e);
    if (seg) parts.push(seg);
    parts.push(...aggregateSegments(e.errors));
    cur = e.cause;
  }
  return parts.join(" | ") || String(err);
}

function causeAddress(e: Record<string, unknown>): string | null {
  if (e.address == null) return null;
  return `address=${String(e.address)}${e.port != null ? `:${String(e.port)}` : ""}`;
}

function causeSegment(e: Record<string, unknown>): string {
  return [
    typeof e.name === "string" && e.name !== "Error" ? e.name : null,
    typeof e.message === "string" ? e.message.slice(0, 160) : null,
    e.code != null ? `code=${String(e.code)}` : null,
    e.syscall != null ? `syscall=${String(e.syscall)}` : null,
    e.errno != null ? `errno=${String(e.errno)}` : null,
    causeAddress(e),
  ]
    .filter(Boolean)
    .join(" ");
}

function aggregateSegments(errors: unknown): string[] {
  if (!Array.isArray(errors)) return [];
  const parts: string[] = [];
  for (const sub of errors.slice(0, 4)) {
    const e = (sub ?? {}) as Record<string, unknown>;
    const segment = [
      e.code != null ? `code=${String(e.code)}` : null,
      e.syscall != null ? `syscall=${String(e.syscall)}` : null,
      causeAddress(e),
    ]
      .filter(Boolean)
      .join(" ");
    if (segment) parts.push(`↳ ${segment}`);
    else if (typeof e.message === "string") parts.push(`↳ ${e.message.slice(0, 80)}`);
  }
  return parts;
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

export function requestHasNonReplayableBody(
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

const TLS_ALLOWED_OPTION_KEYS: Record<string, true> = {
  body: true,
  headers: true,
  method: true,
  redirect: true,
  signal: true,
  // Next.js cache/revalidation metadata. It is not forwarded to wreq.
  next: true,
};

function isWreqBodySupported(body: unknown): boolean {
  if (body == null || typeof body === "string") return true;
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return true;
  if (body instanceof URLSearchParams) return true;
  if (typeof Blob !== "undefined" && body instanceof Blob) return true;
  if (typeof FormData !== "undefined" && body instanceof FormData) return true;
  return false;
}

export function isTlsRequestEligible(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions
): boolean {
  if (typeof Request !== "undefined" && input instanceof Request) return false;
  if (!isWreqBodySupported(options.body)) return false;
  return Object.keys(options).every((key) => TLS_ALLOWED_OPTION_KEYS[key] === true);
}

export function isAmbiguousFailureReplaySafe(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions
): boolean {
  const method = (
    options.method ??
    (typeof Request !== "undefined" && input instanceof Request ? input.method : "GET")
  ).toUpperCase();
  return (
    (method === "GET" || method === "HEAD" || method === "OPTIONS") &&
    !requestHasNonReplayableBody(input, options)
  );
}

export function getEffectiveSignal(
  input: RequestInfo | URL,
  options: FetchWithDispatcherOptions
): AbortSignal | null | undefined {
  return (
    options.signal ??
    (typeof Request !== "undefined" && input instanceof Request ? input.signal : undefined)
  );
}

export function isWreqProxySupported(proxyUrl: string): boolean {
  try {
    const parsed = new URL(proxyUrl);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.searchParams.get("family") === null
    );
  } catch {
    return false;
  }
}
