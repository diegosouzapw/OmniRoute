// Outbound fetch wrappers for provider validation: proxy-fallback, SSRF-aware proxy targeting, and
// error→result mapping. Extracted from validation.ts (god-file decomposition). Behavior is
// byte-identical to the original inline defs.
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard, isPrivateHost } from "@/shared/network/outboundUrlGuard";
import { selectProxyForValidation } from "@omniroute/open-sse/services/proxyAutoSelector.ts";

/**
 * Wrapped fetch call that auto-retries with a proxy when the direct connection
 * fails.  This happens transparently so individual validators don't need to
 * think about proxy fallback.
 */
export async function fetchWithProxyFallback(
  url: string,
  init: RequestInit,
  presets: typeof SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
  isLocal: boolean
): Promise<Response> {
  try {
    return await safeOutboundFetch(url, {
      ...presets,
      guard: isLocal ? "none" : getProviderOutboundGuard(),
      ...init,
    });
  } catch (err: unknown) {
    // Only attempt proxy fallback for retryable errors (network / timeout)
    // and only when the target is not a local / LAN address.
    const fetchErr = err as SafeOutboundFetchError;
    const isNetworkIssue = fetchErr?.code === "NETWORK_ERROR" || fetchErr?.code === "TIMEOUT";
    const isRetryable = fetchErr?.isRetryable !== false;
    const isValidTarget = !isLocal && isRetryableProxyTarget(url);

    if (isLocal || !isNetworkIssue || !isRetryable) throw err;
    if (!isValidTarget) throw err;

    const proxyUrl = await selectProxyForValidation(url);
    if (!proxyUrl) throw err;

    return safeOutboundFetch(url, {
      ...presets,
      guard: isLocal ? "none" : getProviderOutboundGuard(),
      ...init,
      proxyConfig: proxyUrl,
    });
  }
}

export function isRetryableProxyTarget(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    // Never proxy-fallback to a private/link-local/metadata host. Delegates to
    // the canonical SSRF guard (covers 169.254, 0.0.0.0, 172.16/12, CGNAT,
    // IPv6 fc/fd/fe80, .internal — gaps the previous inline check missed).
    return !isPrivateHost(hostname);
  } catch {
    return false;
  }
}

export async function validationRead(url: string, init: RequestInit, isLocal: boolean = false) {
  return fetchWithProxyFallback(url, init, SAFE_OUTBOUND_FETCH_PRESETS.validationRead, isLocal);
}

export async function validationWrite(url: string, init: RequestInit, isLocal: boolean = false) {
  return fetchWithProxyFallback(url, init, SAFE_OUTBOUND_FETCH_PRESETS.validationWrite, isLocal);
}

// A validation failure should only be flagged `securityBlocked` (which the route
// surfaces as a `provider.validation.ssrf_blocked` audit event + a security warning in
// the UI) when it is a GENUINE SSRF/guard block — not for every outbound-guard 503.
// A blocked redirect (REDIRECT_BLOCKED) to a PUBLIC host is benign: the redirect was
// never followed, so no SSRF occurred. Web-cookie providers like qwen-web answer their
// probe with a 307 to a public host, which used to be mislabeled as an SSRF block
// (#3288 / #3758). Only treat a blocked redirect as a security event when its target is
// a private/internal host.
export function isSecurityBlockError(error: unknown): boolean {
  if (!(error instanceof SafeOutboundFetchError)) return false;
  if (error.code === "URL_GUARD_BLOCKED" || error.code === "INVALID_URL") return true;
  if (error.code === "REDIRECT_BLOCKED") {
    if (!error.location) return false;
    try {
      return isPrivateHost(new URL(error.location, error.url).hostname);
    } catch {
      return false;
    }
  }
  return false;
}

export function toValidationErrorResult(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "Validation failed");
  const statusCode = getSafeOutboundFetchErrorStatus(error);

  return {
    valid: false,
    error: message || "Validation failed",
    unsupported: false as const,
    ...(statusCode ? { statusCode } : {}),
    ...(error instanceof SafeOutboundFetchError && error.code === "TIMEOUT"
      ? { timeout: true }
      : {}),
    ...(isSecurityBlockError(error) ? { securityBlocked: true } : {}),
  };
}
