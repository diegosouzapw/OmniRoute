/**
 * Pure, dependency-free validation of a subscription's local proxy-core
 * endpoint.
 *
 * Extracted from `subscriptionService.isLocalCoreEndpointAllowed` so the
 * security gate is unit-testable without the full DB / Next.js stack.
 */

export const ALLOWED_LOCAL_CORE_HOSTS = new Set<string>(["127.0.0.1", "::1", "localhost"]);

/** Only these URL schemes denote a usable local proxy-core endpoint. */
export const ALLOWED_CORE_SCHEMES = new Set<string>(["http:", "https:", "socks5:"]);

/**
 * Whether `endpoint` is an acceptable local proxy-core address.
 *
 * Only loopback hosts over a proxy scheme (http/https/socks5) are permitted.
 * A subscription's `localCoreEndpoint` becomes the single SOCKS5/HTTP address
 * OmniRoute routes SS/VMess/Trojan/VLESS/etc. traffic through, so it must
 * never point at a remote host — and a non-proxy scheme (file:/ftp:/…) is
 * meaningless and rejected.
 */
export function isLocalCoreEndpointAllowed(endpoint: string | null): boolean {
  if (!endpoint) return false;
  try {
    const u = new URL(endpoint);
    const host = u.hostname.toLowerCase();
    if (!ALLOWED_LOCAL_CORE_HOSTS.has(host)) return false;
    if (!ALLOWED_CORE_SCHEMES.has(u.protocol)) return false;
    return true;
  } catch {
    return false;
  }
}
