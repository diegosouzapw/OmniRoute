/**
 * Pure, dependency-free guard for the *source* of a proxy subscription.
 *
 * The subscription URL is fetched server-side (see `subscriptionService
 * .fetchSubscriptionContent`). Without a guard, an operator — or a compromised
 * subscription link — could point OmniRoute at internal services or cloud
 * metadata (SSRF). Only http/https to non-internal hosts are allowed:
 * loopback / private / link-local (incl. 169.254.0.0/16 cloud metadata) /
 * unspecified addresses are blocked.
 *
 * Hostname resolution is re-checked at fetch time (also using the IP-range
 * helpers here) so a hostname that resolves to an internal address is still
 * refused. Splitting the logic into pure functions keeps it unit-testable
 * without DNS / the full stack.
 */

/** Only these URL schemes may be used to *fetch* a subscription. */
export const ALLOWED_FETCH_SCHEMES = new Set<string>(["http:", "https:"]);

// Blocked IPv4 ranges (base, mask) as 32-bit ints.
const BLOCKED_IPV4: ReadonlyArray<readonly [number, number]> = [
  [0x00000000, 0xff000000], // 0.0.0.0/8      unspecified
  [0x7f000000, 0xff000000], // 127.0.0.0/8    loopback
  [0x0a000000, 0xff000000], // 10.0.0.0/8     private
  [0xac100000, 0xfff00000], // 172.16.0.0/12  private
  [0xc0a80000, 0xffff0000], // 192.168.0.0/16 private
  [0xa9fe0000, 0xffff0000], // 169.254.0.0/16 link-local (cloud metadata)
];

const IPV4_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

export function isIpv4Literal(host: string): boolean {
  return IPV4_RE.test(host);
}

/** Parse an IPv4 literal to an unsigned 32-bit int, or null if invalid. */
export function ipv4ToLong(host: string): number | null {
  const m = IPV4_RE.exec(host);
  if (!m) return null;
  const parts = m.slice(1).map(Number);
  if (parts.some((p) => p > 255 || Number.isNaN(p))) return null;
  // Weighted sum by powers of 256 — no bitwise ops, so octets >= 128 can't
  // overflow into negative numbers the way `<< 24` would under 32-bit signed.
  return (parts[0] * 16777216 + parts[1] * 65536 + parts[2] * 256 + parts[3]) >>> 0;
}

export function isIpv4Blocked(ip: string): boolean {
  const n = ipv4ToLong(ip);
  if (n === null) return false;
  // `&` yields a signed 32-bit int; coerce both sides to unsigned before
  // comparing so masked results with the high bit set aren't negative.
  return BLOCKED_IPV4.some(([base, mask]) => ((n & mask) >>> 0) === (base >>> 0));
}

/** Blocked IPv6 addresses: loopback, unspecified, link-local, ULA. */
export function isIpv6Blocked(ip: string): boolean {
  const h = ip.toLowerCase();
  if (h === "::1") return true; // loopback
  if (h === "::") return true; // unspecified
  if (h.startsWith("fe80")) return true; // link-local
  if (h.startsWith("fc") || h.startsWith("fd")) return true; // unique local
  return false;
}

/** Whether `host` is an IP literal (v4 or v6). Hostnames return false. */
export function isIpLiteral(host: string): boolean {
  if (isIpv4Literal(host)) return true;
  // IPv6 literals contain ":" and consist only of hex digits + ":".
  return host.includes(":") && /^([0-9a-fA-F:]+)$/.test(host);
}

/**
 * True if ANY resolved address is in a blocked (internal) range. Used after
 * DNS resolution: a hostname may resolve to MULTIPLE records (e.g. both a
 * public and a private IP). Checking only the first record would let an
 * attacker reach an internal service via a hostname that also has a public
 * record — so we refuse if any resolved address is internal. `family` follows
 * the `dns` module convention (4 = IPv4, 6 = IPv6; missing ⇒ treat as v4).
 */
export function isAnyResolvedAddressBlocked(
  addrs: ReadonlyArray<{ address: string; family?: number }>
): boolean {
  return addrs.some(({ address, family }) => {
    const fam = family === 6 ? 6 : 4;
    return fam === 6 ? isIpv6Blocked(address) : isIpv4Blocked(address);
  });
}

/**
 * Structural check (no DNS). True only if the scheme is allowed AND, when the
 * host is an IP literal, it is not in a blocked range. Hostnames pass the
 * structural check — they are resolved and re-checked at fetch time.
 */
export function isSubscriptionFetchUrlAllowed(url: string): boolean {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  if (!ALLOWED_FETCH_SCHEMES.has(u.protocol)) return false;
  // Strip enclosing brackets from an IPv6 literal host ("[::1]" → "::1").
  const rawHost = u.hostname.toLowerCase();
  const host = rawHost.startsWith("[") && rawHost.endsWith("]") ? rawHost.slice(1, -1) : rawHost;
  if (host === "") return false;
  if (isIpLiteral(host)) {
    if (isIpv4Literal(host)) return !isIpv4Blocked(host);
    return !isIpv6Blocked(host);
  }
  return true; // hostname: resolved + checked at fetch time
}
