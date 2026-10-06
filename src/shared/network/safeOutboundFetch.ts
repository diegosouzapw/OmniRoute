import { isIP } from "node:net";
import {
  runWithProxyContext,
  getOriginalFetch,
  resolveProxyForRequest,
} from "@omniroute/open-sse/utils/proxyFetch.ts";
import { FetchTimeoutError, fetchWithTimeout } from "@/shared/utils/fetchTimeout";
import {
  bareHostname,
  createPinnedFetch,
  resolveHostnameAddresses,
  type DnsLookup,
  type DnsLookupResult,
} from "@/shared/network/dnsPinnedFetch";
import {
  OutboundUrlGuardError,
  type OutboundUrlGuardMode,
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
  parseOutboundUrl,
} from "@/shared/network/outboundUrlGuard";

const DEFAULT_IDEMPOTENT_METHODS = ["GET", "HEAD", "OPTIONS", "PUT", "DELETE"];

// Some upstream providers (Cerebras, Cloudflare AI, Groq observed in practice) routinely take
// close to 5s to answer a lightweight /models probe, which is indistinguishable from a real
// outage under the previous fixed 5000ms budget — the connection flaps between "active" and
// "error" in the dashboard/topology view purely from being near the edge of the timeout, not
// from any real failure. Configurable via env so it can be tuned per-deployment without a code
// change; default raised from 5000ms to 8000ms to give slow-but-healthy providers headroom.
function resolveProbeTimeoutMs(): number {
  const parsed = parseInt(process.env.OMNIROUTE_PROVIDER_PROBE_TIMEOUT_MS || "", 10);
  return Number.isFinite(parsed) && parsed >= 1000 ? parsed : 8000;
}
const PROVIDER_PROBE_TIMEOUT_MS = resolveProbeTimeoutMs();

export type SafeOutboundFetchGuard = OutboundUrlGuardMode;
export type SafeOutboundFetchErrorCode =
  "INVALID_URL" | "URL_GUARD_BLOCKED" | "TIMEOUT" | "REDIRECT_BLOCKED" | "NETWORK_ERROR";

export interface SafeOutboundFetchRetryOptions {
  attempts?: number;
  backoffMs?: number | number[];
  methods?: string[];
  statusCodes?: number[];
}

export interface SafeOutboundFetchOptions extends RequestInit {
  timeoutMs?: number;
  allowRedirect?: boolean;
  retry?: SafeOutboundFetchRetryOptions | false;
  guard?: SafeOutboundFetchGuard;
  proxyConfig?: unknown;
  /** Bypass the global proxy/TLS patched fetch and use the native Node.js
   *  fetch directly. Use when a provider endpoint has compatibility issues
   *  with the undici dispatcher layer. */
  bypassProxyPatch?: boolean;
  /** With `guard: "public-only"`, connect to the address that was checked instead of resolving the
   *  name again. Skipped when the request goes through a proxy or follows redirects. */
  pinDns?: boolean;
  /** Resolver used by the `public-only` host check; tests inject a fake one. */
  dnsLookup?: DnsLookup;
}

type SafeOutboundFetchPresetMap = {
  validationRead: SafeOutboundFetchOptions;
  validationWrite: SafeOutboundFetchOptions;
  modelsProbe: SafeOutboundFetchOptions;
  modelsDiscovery: SafeOutboundFetchOptions;
  modelsPagination: SafeOutboundFetchOptions;
};

export const SAFE_OUTBOUND_FETCH_PRESETS: SafeOutboundFetchPresetMap = {
  validationRead: {
    timeoutMs: PROVIDER_PROBE_TIMEOUT_MS,
    allowRedirect: false,
    retry: {
      attempts: 2,
      backoffMs: [150],
      methods: ["GET", "HEAD"],
    },
  },
  validationWrite: {
    timeoutMs: 15000,
    allowRedirect: false,
    retry: false,
  },
  modelsProbe: {
    timeoutMs: PROVIDER_PROBE_TIMEOUT_MS,
    allowRedirect: false,
    retry: {
      attempts: 2,
      backoffMs: [150],
      methods: ["GET", "HEAD"],
    },
  },
  modelsDiscovery: {
    timeoutMs: 10000,
    allowRedirect: false,
    retry: {
      attempts: 2,
      backoffMs: [200],
      methods: ["GET", "HEAD"],
    },
  },
  modelsPagination: {
    timeoutMs: 15000,
    allowRedirect: false,
    retry: {
      attempts: 2,
      backoffMs: [250],
      methods: ["GET", "HEAD"],
    },
  },
};

type SafeOutboundFetchErrorInit = {
  code: SafeOutboundFetchErrorCode;
  url: string;
  method: string;
  attempts: number;
  isRetryable: boolean;
  timeoutMs?: number;
  status?: number;
  location?: string | null;
  cause?: unknown;
};

export class SafeOutboundFetchError extends Error {
  code: SafeOutboundFetchErrorCode;
  url: string;
  method: string;
  attempts: number;
  isRetryable: boolean;
  timeoutMs?: number;
  status?: number;
  location?: string | null;

  constructor(message: string, init: SafeOutboundFetchErrorInit) {
    super(message);
    this.name = "SafeOutboundFetchError";
    this.code = init.code;
    this.url = init.url;
    this.method = init.method;
    this.attempts = init.attempts;
    this.isRetryable = init.isRetryable;
    this.timeoutMs = init.timeoutMs;
    this.status = init.status;
    this.location = init.location ?? null;
    if (init.cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = init.cause;
    }
  }
}

function normalizeMethod(method?: string) {
  return (method || "GET").toUpperCase();
}

function normalizeUrl(input: string | URL) {
  try {
    return parseOutboundUrl(input);
  } catch (error) {
    if (error instanceof OutboundUrlGuardError) {
      throw new SafeOutboundFetchError(error.message, {
        code: error.code === "OUTBOUND_URL_INVALID" ? "INVALID_URL" : "URL_GUARD_BLOCKED",
        url: error.url,
        method: "GET",
        attempts: 1,
        isRetryable: false,
        cause: error,
      });
    }
    throw new SafeOutboundFetchError(`Invalid outbound URL: ${String(input)}`, {
      code: "INVALID_URL",
      url: String(input),
      method: "GET",
      attempts: 1,
      isRetryable: false,
      cause: error,
    });
  }
}

function applyUrlGuard(targetUrl: URL, guard: SafeOutboundFetchGuard, method: string) {
  if (guard === "none") return;

  try {
    // "public-only" rejects every private host; "block-metadata" (#5066) allows private/LAN
    // hosts but still rejects cloud-metadata / link-local endpoints.
    if (guard === "block-metadata") {
      parseAndValidateNonMetadataUrl(targetUrl);
    } else {
      parseAndValidatePublicUrl(targetUrl);
    }
  } catch (error) {
    if (error instanceof OutboundUrlGuardError) {
      throw new SafeOutboundFetchError(error.message, {
        code: error.code === "OUTBOUND_URL_INVALID" ? "INVALID_URL" : "URL_GUARD_BLOCKED",
        url: error.url,
        method,
        attempts: 1,
        isRetryable: false,
        cause: error,
      });
    }
    throw error;
  }
}

type PinnedFetchFactory = (address: string, family: number) => typeof fetch;
let pinnedFetchTestOverride: PinnedFetchFactory | undefined;

/**
 * Test-only: replace the pinned connection used by `pinDns` (same escape hatch as
 * `setPinnedFetchTestOverride` in remoteImageFetch.ts, #13883), for callers such as the built-in
 * HTTP skill that have no `fetchImpl` seam of their own. Production code never calls it.
 */
export function setSafeOutboundPinnedFetchTestOverride(factory: PinnedFetchFactory | undefined) {
  pinnedFetchTestOverride = factory;
}

/** Upper bound for the `public-only` host lookup; the request's own timeout applies when shorter. */
const PUBLIC_HOST_LOOKUP_TIMEOUT_MS = 5000;

/** Run a lookup that gives up after `timeoutMs` or when `signal` aborts, whichever comes first. */
function lookupWithDeadline(
  host: string,
  lookup: DnsLookup | undefined,
  timeoutMs: number,
  signal: AbortSignal | null | undefined
): Promise<DnsLookupResult[]> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (run: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
      run();
    };
    const onAbort = () => finish(() => reject(new Error(`Lookup of "${host}" was aborted`)));
    const timer = setTimeout(
      () => finish(() => reject(new Error(`Lookup of "${host}" timed out`))),
      timeoutMs
    );
    timer.unref?.();
    if (signal?.aborted) return onAbort();
    signal?.addEventListener("abort", onAbort, { once: true });
    resolveHostnameAddresses(host, lookup).then(
      (addresses) => finish(() => resolve(addresses)),
      (error) => finish(() => reject(error))
    );
  });
}

/**
 * `public-only` judges the URL's host name, and a name can point at a private address. Resolve it
 * and refuse it when any answer is private, so an attacker-owned name that resolves to loopback,
 * the LAN or a metadata address does not get past a check that only reads the spelling.
 *
 * The lookup is bounded (the request timeout, at most PUBLIC_HOST_LOOKUP_TIMEOUT_MS) and follows
 * the caller's abort signal, so it never holds a request longer than the request itself would
 * run. When it fails or times out:
 * - with `failClosed` (the connection was going to be pinned to the checked address) the request
 *   is refused, because letting it through unpinned would connect to whatever a second lookup
 *   returns — the very answer the check exists to judge;
 * - otherwise the request goes ahead and fails (or not) the way it would have without the check.
 */
async function resolvePublicHost(
  targetUrl: URL,
  method: string,
  options: {
    lookup?: DnsLookup;
    timeoutMs?: number;
    signal?: AbortSignal | null;
    failClosed: boolean;
  }
): Promise<DnsLookupResult[] | null> {
  const host = bareHostname(targetUrl.hostname);
  if (!host || isIP(host)) return null;

  const deadline =
    typeof options.timeoutMs === "number" && options.timeoutMs > 0
      ? Math.min(options.timeoutMs, PUBLIC_HOST_LOOKUP_TIMEOUT_MS)
      : PUBLIC_HOST_LOOKUP_TIMEOUT_MS;

  let addresses: DnsLookupResult[];
  try {
    addresses = await lookupWithDeadline(host, options.lookup, deadline, options.signal);
  } catch (error) {
    if (!options.failClosed) return null;
    throw new SafeOutboundFetchError(`Host "${host}" could not be resolved to check it`, {
      code: "NETWORK_ERROR",
      url: targetUrl.toString(),
      method,
      attempts: 1,
      isRetryable: false,
      cause: error,
    });
  }

  for (const { address } of addresses) {
    try {
      parseAndValidatePublicUrl(
        `${targetUrl.protocol}//${address.includes(":") ? `[${address}]` : address}/`
      );
    } catch (error) {
      if (error instanceof OutboundUrlGuardError) {
        throw new SafeOutboundFetchError(`Host "${host}" resolves to a private or local address`, {
          code: "URL_GUARD_BLOCKED",
          url: targetUrl.toString(),
          method,
          attempts: 1,
          isRetryable: false,
          cause: error,
        });
      }
      throw error;
    }
  }
  return addresses;
}

function getRetryConfig(retry: SafeOutboundFetchRetryOptions | false | undefined, method: string) {
  if (retry === false) {
    return {
      attempts: 1,
      shouldRetryMethod: false,
      statusCodes: new Set<number>(),
      backoffMs: [] as number[],
    };
  }

  const methods = new Set(
    (retry?.methods || DEFAULT_IDEMPOTENT_METHODS).map((value) => value.toUpperCase())
  );
  const attempts = Math.max(1, retry?.attempts || 1);
  const backoffMs = Array.isArray(retry?.backoffMs)
    ? retry?.backoffMs
    : typeof retry?.backoffMs === "number"
      ? [retry.backoffMs]
      : [];
  const statusCodes = new Set(retry?.statusCodes || []);

  return {
    attempts,
    shouldRetryMethod: methods.has(method),
    statusCodes,
    backoffMs,
  };
}

function getBackoffDelay(backoffMs: number[], attemptNumber: number) {
  if (backoffMs.length === 0) return 0;
  return backoffMs[Math.min(attemptNumber - 1, backoffMs.length - 1)] || 0;
}

function sleep(ms: number) {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cancelResponseBody(response: Response) {
  try {
    await response.body?.cancel();
  } catch {
    // Ignore body cancellation errors when preparing a retry.
  }
}

function normalizeFetchFailure(
  error: unknown,
  targetUrl: string,
  method: string,
  attempts: number
): SafeOutboundFetchError {
  if (error instanceof SafeOutboundFetchError) {
    error.attempts = attempts;
    return error;
  }

  if (error instanceof FetchTimeoutError) {
    return new SafeOutboundFetchError(error.message, {
      code: "TIMEOUT",
      url: targetUrl,
      method,
      attempts,
      timeoutMs: error.timeoutMs,
      isRetryable: true,
      cause: error,
    });
  }

  const message = error instanceof Error ? error.message : String(error);
  const code = error && typeof error === "object" ? (error as { code?: string }).code : undefined;

  return new SafeOutboundFetchError(message || `Outbound request failed for ${targetUrl}`, {
    code: "NETWORK_ERROR",
    url: targetUrl,
    method,
    attempts,
    isRetryable: code !== "PROXY_UNREACHABLE",
    cause: error,
  });
}

export async function safeOutboundFetch(url: string | URL, options: SafeOutboundFetchOptions = {}) {
  const targetUrl = normalizeUrl(url);
  const method = normalizeMethod(options.method);
  const {
    timeoutMs,
    allowRedirect = false,
    retry,
    guard = "none",
    proxyConfig,
    bypassProxyPatch = false,
    pinDns = false,
    dnsLookup,
    signal,
    ...fetchOptions
  } = options;

  applyUrlGuard(targetUrl, guard, method);
  // A proxy resolves the name itself and a followed redirect leaves the checked host, so the
  // connection is only pinned to the checked address for a direct request to that one host.
  const pinsConnection =
    guard === "public-only" &&
    pinDns &&
    !allowRedirect &&
    !proxyConfig &&
    resolveProxyForRequest(targetUrl.toString()).source === "direct";
  const checkedAddresses =
    guard === "public-only"
      ? await resolvePublicHost(targetUrl, method, {
          lookup: dnsLookup,
          timeoutMs,
          signal,
          failClosed: pinsConnection,
        })
      : null;

  const retryConfig = getRetryConfig(retry, method);
  const redirect = allowRedirect ? (fetchOptions.redirect ?? "follow") : "manual";
  const pinTo =
    pinsConnection && checkedAddresses?.length
      ? (checkedAddresses.find((entry) => entry.family === 4) ?? checkedAddresses[0])
      : null;

  for (let attempt = 1; attempt <= retryConfig.attempts; attempt++) {
    try {
      const executeFetch = () =>
        fetchWithTimeout(targetUrl.toString(), {
          ...fetchOptions,
          method,
          redirect,
          signal,
          timeoutMs,
          // When bypassing the proxy patch, use the original native fetch directly.
          fetchFn: pinTo
            ? (pinnedFetchTestOverride ?? createPinnedFetch)(pinTo.address, pinTo.family)
            : bypassProxyPatch
              ? getOriginalFetch()
              : undefined,
        });

      const response = bypassProxyPatch
        ? await executeFetch()
        : proxyConfig
          ? await runWithProxyContext(proxyConfig, executeFetch)
          : await executeFetch();

      if (!allowRedirect && response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        await cancelResponseBody(response);
        throw new SafeOutboundFetchError(
          `Redirect blocked for ${method} ${targetUrl.toString()} (${response.status})`,
          {
            code: "REDIRECT_BLOCKED",
            url: targetUrl.toString(),
            method,
            attempts: attempt,
            status: response.status,
            location,
            isRetryable: false,
          }
        );
      }

      if (
        retryConfig.shouldRetryMethod &&
        attempt < retryConfig.attempts &&
        retryConfig.statusCodes.has(response.status)
      ) {
        await cancelResponseBody(response);
        await sleep(getBackoffDelay(retryConfig.backoffMs, attempt));
        continue;
      }

      return response;
    } catch (error) {
      const normalizedError = normalizeFetchFailure(error, targetUrl.toString(), method, attempt);
      const shouldRetry =
        retryConfig.shouldRetryMethod &&
        attempt < retryConfig.attempts &&
        normalizedError.isRetryable;

      if (!shouldRetry) {
        throw normalizedError;
      }

      await sleep(getBackoffDelay(retryConfig.backoffMs, attempt));
    }
  }

  throw new SafeOutboundFetchError(`Outbound request failed for ${targetUrl.toString()}`, {
    code: "NETWORK_ERROR",
    url: targetUrl.toString(),
    method,
    attempts: retryConfig.attempts,
    isRetryable: false,
  });
}

export function getSafeOutboundFetchErrorStatus(error: unknown) {
  if (!(error instanceof SafeOutboundFetchError)) return null;

  if (error.code === "TIMEOUT") return 504;
  if (
    error.code === "INVALID_URL" ||
    error.code === "URL_GUARD_BLOCKED" ||
    error.code === "REDIRECT_BLOCKED"
  ) {
    return 503;
  }

  return null;
}
