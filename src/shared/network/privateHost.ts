// Host classification shared by the outbound URL guard and the provider registry.
//
// #11122: `open-sse/config/providerRegistry.ts` needs `isPrivateHost`, and that module is
// reachable from `ProviderDetailPageClient.tsx`. `outboundUrlGuard.ts` reached for `node:net`'s
// `isIP`, so importing it from the registry broke the browser bundle with
// `Could not resolve "node:net"` (caught by tests/unit/media-page-client-browser-bundle.test.ts,
// which has been red on the release branch since #11122 merged).
// The classification therefore lives here, on a pure-JS `ipVersion`, with NO platform imports.
//
// Two constraints this module MUST keep — both enforced by tests:
//   1. No `node:*` import: it is bundled for the browser.
//   2. No `@/`-aliased import: `./outboundUrlGuard.ts` re-exports from here and is loaded by the
//      packaged CLI (`omniroute setup-opencode`), where no tsconfig resolves the alias (#7682).

// Vendored from Node's own `lib/internal/net.js` so `ipVersion` stays verdict-for-verdict
// identical to `isIP` — a NARROWER match would silently reclassify a private address as public
// and open the very egress the guard exists to close. `tests/unit/private-host-ip-parity-11122`
// asserts that parity against `node:net` directly.
const V4_SEG = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)";
const V4_STR = `(?:${V4_SEG}\\.){3}${V4_SEG}`;
const V6_SEG = "(?:[0-9a-fA-F]{1,4})";

const IPV4_RE = new RegExp(`^${V4_STR}$`);

const IPV6_RE = new RegExp(
  "^(?:" +
    `(?:${V6_SEG}:){7}(?:${V6_SEG}|:)|` +
    `(?:${V6_SEG}:){6}(?:${V4_STR}|:${V6_SEG}|:)|` +
    `(?:${V6_SEG}:){5}(?::${V4_STR}|(?::${V6_SEG}){1,2}|:)|` +
    `(?:${V6_SEG}:){4}(?:(?::${V6_SEG}){0,1}:${V4_STR}|(?::${V6_SEG}){1,3}|:)|` +
    `(?:${V6_SEG}:){3}(?:(?::${V6_SEG}){0,2}:${V4_STR}|(?::${V6_SEG}){1,4}|:)|` +
    `(?:${V6_SEG}:){2}(?:(?::${V6_SEG}){0,3}:${V4_STR}|(?::${V6_SEG}){1,5}|:)|` +
    `(?:${V6_SEG}:){1}(?:(?::${V6_SEG}){0,4}:${V4_STR}|(?::${V6_SEG}){1,6}|:)|` +
    `(?::(?:(?::${V6_SEG}){0,5}:${V4_STR}|(?::${V6_SEG}){1,7}|:))` +
    ")(?:%[0-9a-zA-Z-.:]{1,64})?$"
);

// Longest legal literal is 45 chars (`ffff:…:255.255.255.255`) plus a `%zone`. Every quantifier
// above is bounded, and this guard keeps the alternation from ever seeing a long hostile string
// (AGENTS.md → "Regex Security (ReDoS)").
const MAX_IP_LITERAL_LENGTH = 110;

/** Pure-JS `node:net#isIP`: 4, 6, or 0 when the string is not an IP literal. */
export function ipVersion(host: string): 0 | 4 | 6 {
  if (!host || host.length > MAX_IP_LITERAL_LENGTH) return 0;
  if (IPV4_RE.test(host)) return 4;
  return IPV6_RE.test(host) ? 6 : 0;
}

export function normalizeHost(hostname: string) {
  const normalized = hostname.trim().toLowerCase();
  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    return normalized.slice(1, -1);
  }
  // `localhost.` and `metadata.google.internal.` name the same hosts as the bare spellings.
  return normalized.endsWith(".") ? normalized.slice(0, -1) : normalized;
}

/** The eight 16-bit groups of an IPv6 literal, or null when `host` is not one. */
function ipv6Hextets(host: string): number[] | null {
  if (ipVersion(host) !== 6) return null;
  let text = host.split("%")[0];
  const lastColon = text.lastIndexOf(":");
  const tail = text.slice(lastColon + 1);
  if (tail.includes(".")) {
    const [a, b, c, d] = tail.split(".").map((part) => parseInt(part, 10));
    text = `${text.slice(0, lastColon + 1)}${((a << 8) | b).toString(16)}:${((c << 8) | d).toString(16)}`;
  }
  const halves = text.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const rest = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - rest.length;
  if (halves.length === 1 ? missing !== 0 : missing < 0) return null;
  const groups = [...head, ...Array<string>(halves.length === 2 ? missing : 0).fill("0"), ...rest];
  const hextets = groups.map((group) => parseInt(group, 16));
  return hextets.length === 8 && hextets.every((value) => value >= 0 && value <= 0xffff)
    ? hextets
    : null;
}

const dottedQuad = (high: number, low: number) =>
  `${high >> 8}.${high & 0xff}.${low >> 8}.${low & 0xff}`;

/** The IPv4 address the groups carry, for the IPv6 forms that embed one; see embeddedIpv4Host. */
function embeddedIpv4FromHextets(hextets: number[], mappedOnly: boolean): string | null {
  const leadingZeros = (count: number) => hextets.slice(0, count).every((value) => value === 0);
  if (leadingZeros(5) && hextets[5] === 0xffff) return dottedQuad(hextets[6], hextets[7]);
  if (mappedOnly) return null;
  if (leadingZeros(6) && !(hextets[6] === 0 && hextets[7] <= 1)) {
    return dottedQuad(hextets[6], hextets[7]);
  }
  if (hextets[0] === 0x64 && hextets[1] === 0xff9b && hextets.slice(2, 6).every((v) => v === 0)) {
    return dottedQuad(hextets[6], hextets[7]);
  }
  if (hextets[0] === 0x2002) return dottedQuad(hextets[1], hextets[2]);
  return null;
}

/**
 * The IPv4 address an IPv6 literal carries and routes to, for the forms that embed one:
 * IPv4-mapped (::ffff:a.b.c.d), IPv4-compatible (::a.b.c.d), NAT64 (64:ff9b::/96) and 6to4
 * (2002::/16). Null for any other address. With `mappedOnly`, only the IPv4-mapped form counts,
 * in whatever spelling it is written.
 */
export function embeddedIpv4Host(hostname: string, mappedOnly = false): string | null {
  const hextets = ipv6Hextets(normalizeHost(hostname));
  return hextets ? embeddedIpv4FromHextets(hextets, mappedOnly) : null;
}

/** True when both hosts are IPv6 literals for the same address, however they are written. */
export function isSameIpv6Address(a: string, b: string): boolean {
  const first = ipv6Hextets(normalizeHost(a));
  const second = ipv6Hextets(normalizeHost(b));
  return !!first && !!second && first.every((value, index) => value === second[index]);
}

export function isPrivateHost(hostname: string) {
  const normalized = normalizeHost(hostname);
  if (!normalized) return true;

  if (
    normalized === "localhost" ||
    normalized === "0.0.0.0" ||
    // `::` is the IPv6 twin of `0.0.0.0`: connecting to it reaches a service bound
    // to the IPv6 loopback, so it has to be refused alongside its IPv4 spelling.
    normalized === "::" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".local") ||
    // `.internal` is reserved for private use (ICANN-style) and is the
    // hostname suffix used by GCP/Azure metadata probes
    // (e.g. `metadata.google.internal`).
    normalized.endsWith(".internal") ||
    normalized.startsWith("::ffff:")
  ) {
    return true;
  }

  if (ipVersion(normalized) === 4) {
    const octets = normalized.split(".").map((segment) => parseInt(segment, 10));
    const [a, b, c, d] = octets;

    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    // 192.0.0.0/24 (IETF protocol assignments), 224.0.0.0/4 multicast, and the Azure host
    // fabric address.
    if (a === 192 && b === 0 && c === 0) return true;
    if (a >= 224 && a <= 239) return true;
    if (a === 168 && b === 63 && c === 129 && d === 16) return true;
    return false;
  }

  const hextets = ipv6Hextets(normalized);
  if (hextets) {
    const embedded = embeddedIpv4FromHextets(hextets, false);
    if (embedded !== null && isPrivateHost(embedded)) return true;
    const [first] = hextets;
    return (
      (hextets.slice(0, 7).every((value) => value === 0) && hextets[7] <= 1) ||
      (first & 0xfe00) === 0xfc00 || // fc00::/7 unique local
      (first & 0xffc0) === 0xfe80 || // fe80::/10 link local
      (first & 0xffc0) === 0xfec0 || // fec0::/10 site local
      first >> 8 === 0xff // ff00::/8 multicast
    );
  }

  return false;
}
