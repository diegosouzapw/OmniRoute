/**
 * Pure, dependency-free guard for the *source* of a proxy subscription.
 *
 * The subscription URL is fetched server-side (see `subscriptionService
 * .fetchSubscriptionContent`). Without a guard, an operator — or a compromised
 * subscription link — could point OmniRoute at cloud metadata (SSRF). Only
 * http/https to non-metadata hosts are allowed.
 *
 * Local-first (#10158): OmniRoute already lets an operator route ALL traffic
 * through a loopback core (`coreEndpoint.ts` allows `127.0.0.1`/`::1`/
 * `localhost`), so a subscription fetch target on loopback/private ranges is
 * ALLOWED by default (`allowLocal: true`, matching the local-first default of
 * `areLocalProviderUrlsAllowed()` in `src/shared/network/outboundUrlGuardPolicy
 * .ts`) — mirroring that policy's "block-metadata" mode. Cloud-metadata /
 * link-local (`169.254.0.0/16`, incl. `169.254.169.254` IMDS) and the
 * unspecified address (`0.0.0.0/8`) are blocked UNCONDITIONALLY regardless of
 * `allowLocal`, since they have no legitimate subscription-source use case.
 * Callers that want the old strict (public-only) behavior pass
 * `{ allowLocal: false }`.
 *
 * Hostname resolution is re-checked at fetch time (also using the IP-range
 * helpers here) so a hostname that resolves to an internal address is still
 * refused. Splitting the logic into pure functions keeps it unit-testable
 * without DNS / the full stack. No `@/`-aliased or DB-backed imports here —
 * the `allowLocal` policy decision is made by the caller (subscriptionService,
 * which is already DB-backed) and passed in as a plain boolean.
 *
 * IPv6 hardening (#10416): IPv4-mapped IPv6 literals (`::ffff:a.b.c.d`) are
 * unwrapped and re-checked against the IPv4 ranges, so a mapped IMDS/
 * loopback/private address can't bypass the guard. Link-local detection
 * covers the FULL `fe80::/10` range (`fe80::`-`febf:ffff:…`), not just
 * strings literally prefixed with `fe80`.
 */

/** Only these URL schemes may be used to *fetch* a subscription. */
export const ALLOWED_FETCH_SCHEMES = new Set<string>(["http:", "https:"]);

// Blocked UNCONDITIONALLY, regardless of `allowLocal` — the classic SSRF→cloud
// credential pivot; never a legitimate subscription source.
const ALWAYS_BLOCKED_IPV4: ReadonlyArray<readonly [number, number]> = [
  [0x00000000, 0xff000000], // 0.0.0.0/8      unspecified
  [0xa9fe0000, 0xffff0000], // 169.254.0.0/16 link-local (incl. cloud metadata IMDS)
];

// Blocked only when `allowLocal` is false (strict/public-only mode).
const LOCAL_ONLY_BLOCKED_IPV4: ReadonlyArray<readonly [number, number]> = [
  [0x7f000000, 0xff000000], // 127.0.0.0/8    loopback
  [0x0a000000, 0xff000000], // 10.0.0.0/8     private
  [0xac100000, 0xfff00000], // 172.16.0.0/12  private
  [0xc0a80000, 0xffff0000], // 192.168.0.0/16 private
];

export interface FetchGuardOptions {
  /**
   * When true (default), loopback/private hosts are allowed as fetch targets
   * ("local-first" — matches `areLocalProviderUrlsAllowed()`'s default). Cloud
   * metadata / link-local is blocked unconditionally either way. Pass `false`
   * to restore the strict public-only behavior.
   */
  allowLocal?: boolean;
}

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

export function isIpv4Blocked(ip: string, opts: FetchGuardOptions = {}): boolean {
  const allowLocal = opts.allowLocal ?? true;
  const n = ipv4ToLong(ip);
  if (n === null) return false;
  // `&` yields a signed 32-bit int; coerce both sides to unsigned before
  // comparing so masked results with the high bit set aren't negative.
  const ranges = allowLocal ? ALWAYS_BLOCKED_IPV4 : [...ALWAYS_BLOCKED_IPV4, ...LOCAL_ONLY_BLOCKED_IPV4];
  return ranges.some(([base, mask]) => ((n & mask) >>> 0) === (base >>> 0));
}

// IPv4-mapped IPv6, dotted-quad tail: "::ffff:a.b.c.d" or its fully-expanded
// "0:0:0:0:0:ffff:a.b.c.d" form. This is how the literal is typically
// *written* (e.g. by a caller invoking `isIpv6Blocked` directly).
const IPV4_MAPPED_DOTTED_RE =
  /^(?:::ffff:|0:0:0:0:0:ffff:)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i;

// IPv4-mapped IPv6, hex-group tail: "::ffff:HHHH:HHHH". This is how the
// WHATWG `URL` parser NORMALIZES a dotted-quad mapped literal (e.g.
// `::ffff:169.254.169.254` becomes `::ffff:a9fe:a9fe`), so a URL-derived
// hostname needs this form recognized too or the guard silently sees a
// hostname it never resolves the mapped address for.
const IPV4_MAPPED_HEX_RE = /^(?:::ffff:|0:0:0:0:0:ffff:)([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i;

/** Extracts the mapped IPv4 address from an IPv4-mapped IPv6 literal, or null. */
export function extractIpv4MappedAddress(ip: string): string | null {
  const dotted = IPV4_MAPPED_DOTTED_RE.exec(ip);
  if (dotted) return dotted[1];
  const hex = IPV4_MAPPED_HEX_RE.exec(ip);
  if (!hex) return null;
  const hi = parseInt(hex[1], 16);
  const lo = parseInt(hex[2], 16);
  if (Number.isNaN(hi) || Number.isNaN(lo)) return null;
  return `${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}`;
}

/**
 * True if `ip`'s first 16-bit hex group falls in `fe80`-`febf` — the full
 * `fe80::/10` link-local range (top 10 bits `1111111010`, i.e. the low 6 bits
 * of the first group are free). A `.startsWith("fe80")` check only matches
 * the single `fe80` group and misses the rest of the range (e.g. `fe90::`,
 * `febf:ffff::`); it would also wrongly match hostnames like `fe80abc::`,
 * which this exact-group parse avoids. `fec0::/10` (deprecated site-local)
 * is intentionally excluded — it is outside `fe80::/10`.
 */
function isIpv6LinkLocal(ip: string): boolean {
  if (ip.startsWith("::")) return false; // first group is 0 — never link-local
  const idx = ip.indexOf(":");
  if (idx <= 0 || idx > 4) return false;
  const group = ip.slice(0, idx);
  const n = parseInt(group, 16);
  if (Number.isNaN(n)) return false;
  return n >= 0xfe80 && n <= 0xfebf;
}

/**
 * Blocked IPv6 addresses: unspecified/link-local always; loopback/ULA only
 * when strict. IPv4-mapped literals (`::ffff:a.b.c.d`) are unwrapped and
 * re-checked against the IPv4 rules so a mapped IMDS/loopback/private
 * address can't bypass the guard.
 */
export function isIpv6Blocked(ip: string, opts: FetchGuardOptions = {}): boolean {
  const allowLocal = opts.allowLocal ?? true;
  const h = ip.toLowerCase();
  if (h === "::") return true; // unspecified — always blocked
  const mapped = extractIpv4MappedAddress(h);
  if (mapped !== null) return isIpv4Blocked(mapped, opts);
  if (isIpv6LinkLocal(h)) return true; // fe80::/10 — always blocked
  if (allowLocal) return false;
  if (h === "::1") return true; // loopback
  if (h.startsWith("fc") || h.startsWith("fd")) return true; // unique local
  return false;
}

/** Whether `host` is an IP literal (v4 or v6). Hostnames return false. */
export function isIpLiteral(host: string): boolean {
  if (isIpv4Literal(host)) return true;
  if (!host.includes(":")) return false;
  // Plain IPv6 literal (hex groups + colons)...
  if (/^([0-9a-fA-F:]+)$/.test(host)) return true;
  // ...or an IPv4-mapped IPv6 literal, which ends in a dotted-quad tail
  // (e.g. "::ffff:169.254.169.254") and so isn't pure hex+colons.
  return /^[0-9a-fA-F:]+:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
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
  addrs: ReadonlyArray<{ address: string; family?: number }>,
  opts: FetchGuardOptions = {}
): boolean {
  return addrs.some(({ address, family }) => {
    const fam = family === 6 ? 6 : 4;
    return fam === 6 ? isIpv6Blocked(address, opts) : isIpv4Blocked(address, opts);
  });
}

/**
 * Structural check (no DNS). True only if the scheme is allowed AND, when the
 * host is an IP literal, it is not in a blocked range for the given
 * `allowLocal` mode. Hostnames pass the structural check — they are resolved
 * and re-checked at fetch time.
 */
export function isSubscriptionFetchUrlAllowed(url: string, opts: FetchGuardOptions = {}): boolean {
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
    if (isIpv4Literal(host)) return !isIpv4Blocked(host, opts);
    return !isIpv6Blocked(host, opts);
  }
  return true; // hostname: resolved + checked at fetch time
}
