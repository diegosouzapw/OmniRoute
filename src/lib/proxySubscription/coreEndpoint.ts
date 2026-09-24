/**
 * Pure, dependency-free validation of a subscription's local proxy-core
 * endpoints (one per line).
 *
 * Extracted from `subscriptionService.isLocalCoreEndpointAllowed` so the
 * security gate is unit-testable without the full DB / Next.js stack.
 */

import { redactSubscriptionUrl } from "./url";

export const ALLOWED_LOCAL_CORE_HOSTS = new Set<string>(["127.0.0.1", "::1", "localhost"]);

/** Only these URL schemes denote a usable local proxy-core endpoint. */
export const ALLOWED_CORE_SCHEMES = new Set<string>(["http:", "https:", "socks5:"]);

/**
 * Split a `localCoreEndpoint` field into one entry per line.
 *
 * Newline is the only separator (a comma is legitimate inside userinfo and
 * must survive). Each line is trimmed, blank lines are dropped, order is
 * preserved. Never throws.
 */
export function parseLocalCoreEndpoints(field: string | null): string[] {
  if (!field) return [];
  return field
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Redact a raw core entry for the subscription `detail` string.
 *
 * `redactSubscriptionUrl` returns non-parseable input unchanged, which could
 * leak `user:pass` into the stored error column — so strip the userinfo part
 * as a fallback. Only an `@` inside the authority section (before the first
 * `/`, `?` or `#` after the scheme) counts: a `@` later in the path is kept
 * verbatim for diagnostics. Never throws.
 */
export function redactCoreEntryForDetail(entry: string): string {
  try {
    const redacted = redactSubscriptionUrl(entry);
    if (redacted !== entry) return redacted;
    const schemeEnd = entry.indexOf("://");
    const prefix = schemeEnd >= 0 ? entry.slice(0, schemeEnd + 3) : "";
    const rest = schemeEnd >= 0 ? entry.slice(schemeEnd + 3) : entry;
    const delim = rest.search(/[\/?#]/);
    const authority = delim >= 0 ? rest.slice(0, delim) : rest;
    const at = authority.lastIndexOf("@");
    if (at >= 0) return prefix + rest.slice(at + 1);
    return entry;
  } catch {
    return entry;
  }
}

/**
 * Whether `endpoint` is an acceptable local proxy-core address.
 *
 * Only loopback hosts over a proxy scheme (http/https/socks5) are permitted.
 * A subscription's `localCoreEndpoint` lists the SOCKS5/HTTP addresses
 * OmniRoute routes SS/VMess/Trojan/VLESS/etc. traffic through, so each entry
 * must never point at a remote host — and a non-proxy scheme (file:/ftp:/…) is
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
