import { isIP, isIPv4, isIPv6 } from "node:net";
import { randomUUID } from "node:crypto";

/**
 * Trusted peer-IP stamping for the custom Node HTTP servers.
 *
 * The Next.js middleware runtime (proxy.ts → runAuthzPipeline) exposes NO socket
 * or peer IP — only request headers, ALL of which are client-controlled. The
 * LOCAL_ONLY route guard (spawn-capable routes) must decide locality from the
 * real TCP peer, never from the spoofable Host header.
 *
 * Our custom servers DO have the real `req.socket.remoteAddress`. They stamp it
 * into PEER_IP_HEADER as `<token>|<ip>`, where <token> is a per-process secret
 * (OMNIROUTE_PEER_STAMP_TOKEN). Any client-supplied value of PEER_IP_HEADER is
 * deleted first, so a remote caller cannot pre-populate it. The middleware
 * (src/server/authz/policies/management.ts → resolveStampedPeer) trusts the IP
 * ONLY when the token matches this process's secret; otherwise it fails closed.
 *
 * Keep PEER_IP_HEADER in sync with PEER_IP_HEADER in
 * src/server/authz/headers.ts (the TS side cannot import this .mjs).
 */
export const PEER_IP_HEADER = "x-omniroute-peer-ip";

/**
 * Companion header to PEER_IP_HEADER: `<token>|1` when the inbound TCP request
 * came from a peer that may be a reverse proxy (this host, a private-network
 * address, a Cloudflare edge or an address named in OMNIROUTE_TRUSTED_PROXIES)
 * and carried a forwarding header (see `hasProxyHopHeader`), or arrived
 * from a Cloudflare edge IP with `cf-connecting-ip`; `<token>|0` otherwise.
 * Required so the middleware can tell that a loopback socket is the
 * reverse-proxy hop (nginx / Caddy / Cloudflare Tunnel) and NOT trust it as
 * local — without this, a leaked JWT over a public tunnel would reach the
 * LOCAL_ONLY routes that spawn child processes (Hard Rules #15 + #17; port of
 * upstream decolua/9router commit da667836). A peer on any other address can
 * write forwarding headers itself, so from it they do not set the marker.
 *
 * Keep VIA_PROXY_HEADER in sync with VIA_PROXY_HEADER in
 * src/server/authz/headers.ts (the TS side cannot import this .mjs).
 */
export const VIA_PROXY_HEADER = "x-omniroute-via-proxy";

/**
 * The address the IP allow/deny list should judge, as `<token>|<ip>`: the TCP
 * peer itself, or, when the peer is a proxy that may be trusted, the client it
 * reports (see resolveClientIp). Derived here, where the socket is known, so the
 * middleware never has to choose between forwarding headers a client can write.
 *
 * Keep CLIENT_IP_HEADER in sync with CLIENT_IP_HEADER in
 * src/server/authz/headers.ts (the TS side cannot import this .mjs).
 */
export const CLIENT_IP_HEADER = "x-omniroute-client-ip";

/**
 * Cloudflare IPv4 ranges used to authenticate the `cf-connecting-ip` header.
 *
 * `cf-connecting-ip` is Cloudflare-specific: a direct client can trivially forge
 * it, but only traffic actually routed through Cloudflare originates from one of
 * these IP addresses. We therefore trust `cf-connecting-ip` as a proxy marker
 * ONLY when `req.socket.remoteAddress` falls inside these ranges.
 *
 * Source: https://api.cloudflare.com/client/v4/ips
 * Snapshot date: 2026-08-25
 * Refresh: re-query the URL above periodically (quarterly is a safe default,
 * or whenever Cloudflare announces edge-range changes) and replace the arrays.
 *
 * This list is intentionally embedded as a static constant. peer-stamp.mjs is
 * packaged into the standalone server artifact and MUST NOT depend on runtime
 * file/network access to load the ranges.
 */
const CLOUDFLARE_IPV4_CIDRS = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22",
];

/**
 * Cloudflare IPv6 ranges (same semantics as CLOUDFLARE_IPV4_CIDRS).
 *
 * Source: https://api.cloudflare.com/client/v4/ips
 * Snapshot date: 2026-08-25
 * Refresh: re-query the URL above periodically (quarterly is a safe default,
 * or whenever Cloudflare announces edge-range changes) and replace the arrays.
 */
const CLOUDFLARE_IPV6_CIDRS = [
  "2400:cb00::/32",
  "2606:4700::/32",
  "2803:f800::/32",
  "2405:b500::/32",
  "2405:8100::/32",
  "2a06:98c0::/29",
  "2c0f:f248::/32",
];

/** Generate (once) and return the per-process stamp token, persisting it in env
 *  so the middleware running in the same process reads the identical value. */
export function ensurePeerStampToken() {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN ||= randomUUID();
  return process.env.OMNIROUTE_PEER_STAMP_TOKEN;
}

/** Convert an IPv4 address string to an unsigned 32-bit integer. */
function ipv4ToInt(ip) {
  const parts = ip.split(".");
  return (
    ((parseInt(parts[0], 10) << 24) |
      (parseInt(parts[1], 10) << 16) |
      (parseInt(parts[2], 10) << 8) |
      parseInt(parts[3], 10)) >>>
    0
  );
}

/** Check whether `ip` belongs to the given IPv4 CIDR. */
export function matchesIPv4Cidr(ip, cidr) {
  const [range, bits] = cidr.split("/");
  const maskBits = parseInt(bits, 10);
  if (maskBits === 0) return true;
  const ipInt = ipv4ToInt(ip);
  const rangeInt = ipv4ToInt(range);
  return ipInt >>> (32 - maskBits) === rangeInt >>> (32 - maskBits);
}

/** Convert an IPv6 address string to a 128-bit BigInt. */
function ipv6ToBigInt(ip) {
  // Expand the compressed form into 8 groups of 16-bit hex.
  let expanded = ip;
  if (expanded.includes("::")) {
    const [left, right] = expanded.split("::");
    const leftGroups = left ? left.split(":") : [];
    const rightGroups = right ? right.split(":") : [];
    const missing = 8 - leftGroups.length - rightGroups.length;
    const fill = Array.from({ length: missing }, () => "0");
    expanded = [...leftGroups, ...fill, ...rightGroups].join(":");
  }
  const groups = expanded.split(":");
  let result = 0n;
  for (const group of groups) {
    result = (result << 16n) | BigInt(parseInt(group || "0", 16));
  }
  return result;
}

/** Check whether `ip` belongs to the given IPv6 CIDR. */
export function matchesIPv6Cidr(ip, cidr) {
  const [range, bits] = cidr.split("/");
  const maskBits = parseInt(bits, 10);
  if (maskBits === 0) return true;
  const ipInt = ipv6ToBigInt(ip);
  const rangeInt = ipv6ToBigInt(range);
  const mask = -1n << (128n - BigInt(maskBits));
  return (ipInt & mask) === (rangeInt & mask);
}

/**
 * Return true when `ip` is a Cloudflare edge address. IPv4-mapped IPv6 addresses
 * (`::ffff:x.x.x.x`) are normalized to dotted-decimal before checking.
 */
export function isCloudflareIP(ip) {
  if (!ip) return false;
  let normalized = ip.replace(/^::ffff:/i, "");
  if (normalized === ip) {
    // Full-form IPv4-mapped addresses (0:0:0:0:0:ffff:a.b.c.d) also need to be
    // normalized to dotted-decimal before the CIDR check.
    const fullFormMatch = /^(?:0+:){5}ffff:([0-9.]+)$/i.exec(ip);
    if (fullFormMatch) normalized = fullFormMatch[1];
  }
  if (isIPv4(normalized)) {
    return CLOUDFLARE_IPV4_CIDRS.some((cidr) => matchesIPv4Cidr(normalized, cidr));
  }
  if (isIPv6(normalized)) {
    return CLOUDFLARE_IPV6_CIDRS.some((cidr) => matchesIPv6Cidr(normalized, cidr));
  }
  return false;
}

/**
 * True when the request carries a header that a reverse proxy or tunnel adds when it relays a
 * request: any `x-forwarded-*`, `x-real-ip`, `forwarded` or `via`. A proxy on the same host connects
 * from loopback, so these headers are the only thing that tells the callers behind it apart from a
 * local operator. Callers can send them too; that is harmless because the marker only ever
 * downgrades a loopback or private-network peer to "remote".
 *
 * Keep in step with `hasProxyHopHeader` in src/server/authz/proxyHeaders.ts (a test compares them).
 */
export function hasProxyHopHeader(headers) {
  for (const [rawName, value] of Object.entries(headers || {})) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue;
    const name = rawName.toLowerCase();
    if (
      name.startsWith("x-forwarded-") ||
      name === "x-real-ip" ||
      name === "forwarded" ||
      name === "via"
    ) {
      return true;
    }
  }
  return false;
}

// Same ranges as PRIVATE_LAN_PATTERNS in src/server/authz/routeGuard.ts
// (tests/unit/authz/peer-stamp.test.ts checks they agree).
const PRIVATE_LAN_PATTERNS = [
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  /^100\.(6[4-9]|[78]\d|9\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3}$/,
  /^192\.168\.\d{1,3}\.\d{1,3}$/,
  /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/,
  /^f[cd][0-9a-f]{2}:/i,
  /^fe80:/i,
];

/**
 * A plain IP address from a header value, or null. Accepts the forms proxies write:
 * `::ffff:a.b.c.d`, `a.b.c.d:port` and `[v6]:port`.
 */
function normalizeIp(value) {
  if (typeof value !== "string") return null;
  let candidate = value.trim().replace(/^::ffff:/i, "");
  if (isIP(candidate)) return candidate;
  const bracketed = /^\[([^\]]+)\](?::\d+)?$/.exec(candidate);
  if (bracketed) candidate = bracketed[1].replace(/^::ffff:/i, "");
  else {
    const withPort = /^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/.exec(candidate);
    if (withPort) candidate = withPort[1];
  }
  return isIP(candidate) ? candidate : null;
}

let configuredProxiesSource;
let configuredProxies = [];

/** Addresses and CIDR ranges the operator names in OMNIROUTE_TRUSTED_PROXIES. */
function getConfiguredProxies() {
  const source = process.env.OMNIROUTE_TRUSTED_PROXIES || "";
  if (source === configuredProxiesSource) return configuredProxies;
  configuredProxiesSource = source;
  configuredProxies = [];
  for (const part of source.split(",")) {
    const [address, bits] = part.trim().split("/");
    const ip = normalizeIp(address);
    if (!ip) continue;
    const max = isIPv4(ip) ? 32 : 128;
    const prefix = bits === undefined ? max : Number(bits);
    if (!Number.isInteger(prefix) || prefix < 0 || prefix > max) continue;
    configuredProxies.push({ ip, cidr: `${ip}/${prefix}` });
  }
  return configuredProxies;
}

function isConfiguredProxy(ip) {
  return getConfiguredProxies().some((entry) =>
    isIPv4(ip) && isIPv4(entry.ip)
      ? matchesIPv4Cidr(ip, entry.cidr)
      : isIPv6(ip) && isIPv6(entry.ip) && matchesIPv6Cidr(ip, entry.cidr)
  );
}

/**
 * True when a forwarding header from this TCP peer may be believed: the peer is this host, a
 * private-network proxy, a Cloudflare edge, or an address the operator lists in
 * OMNIROUTE_TRUSTED_PROXIES (a proxy on any other public address has to be named there). A
 * client on any other address can write those headers itself, so they say nothing about who
 * it is.
 */
export function isTrustedProxyPeer(ip) {
  const normalized = normalizeIp(ip);
  if (!normalized) return false;
  if (normalized === "::1" || normalized.startsWith("127.")) return true;
  if (PRIVATE_LAN_PATTERNS.some((re) => re.test(normalized))) return true;
  return isCloudflareIP(normalized) || isConfiguredProxy(normalized);
}

/**
 * The client address to judge for a request from `peerIp`. A peer that is not a trusted proxy
 * is judged as itself. Behind a trusted proxy the client is what that proxy reported, read the
 * way a proxy chain is built: a Cloudflare edge's `cf-connecting-ip`, else the right-most
 * `x-forwarded-for` entry that is not itself a trusted proxy (the left-most entries are
 * whatever the client sent), else `x-real-ip`. When nothing usable was reported the peer is
 * judged.
 */
export function resolveClientIp(headers, peerIp) {
  const peer = normalizeIp(peerIp);
  if (!peer) return null;
  if (!isTrustedProxyPeer(peer)) return peer;

  if (isCloudflareIP(peer)) {
    const edgeClient = normalizeIp(String(headers["cf-connecting-ip"] || "").split(",")[0]);
    if (edgeClient) return edgeClient;
  }

  const chain = String(headers["x-forwarded-for"] || "").split(",");
  let innermostProxy = null;
  for (let index = chain.length - 1; index >= 0; index -= 1) {
    const hop = normalizeIp(chain[index]);
    if (!hop) break;
    if (!isTrustedProxyPeer(hop)) return hop;
    innermostProxy = hop;
  }
  if (innermostProxy) return innermostProxy;

  return normalizeIp(String(headers["x-real-ip"] || "").split(",")[0]) || peer;
}

/** Strip any client-supplied PEER_IP_HEADER, VIA_PROXY_HEADER and CLIENT_IP_HEADER and stamp
 *  the real TCP peer IP, a token-protected via-proxy marker and the client address to judge.
 *  Never throws — a stamping failure must not block a request (it degrades to "locality
 *  unknown" → fail closed in the middleware). */
export function stampPeerIp(req) {
  try {
    if (!req || !req.headers) return;
    // Node lowercases incoming header names; delete kills any client value.
    delete req.headers[PEER_IP_HEADER];
    delete req.headers[VIA_PROXY_HEADER];
    delete req.headers[CLIENT_IP_HEADER];
    const ip = req.socket && req.socket.remoteAddress;
    if (ip) {
      const token = ensurePeerStampToken();
      req.headers[PEER_IP_HEADER] = `${token}|${ip}`;
      // Forwarding headers present = request arrived via a reverse proxy; the
      // loopback socket is the proxy hop, not the end-user, so it must not be
      // trusted as local. Token-prefix the marker so a remote caller cannot
      // forge it (or its absence) on a non-proxied request.
      //
      // Forwarding headers (see hasProxyHopHeader) only count from a peer that may be a proxy: from
      // any other peer they are just client-supplied text, and must not flip the marker
      // and make the IP filter judge the header instead of the peer.
      //
      // `cf-connecting-ip` is Cloudflare-specific and trivially forged by a
      // direct client. Only treat it as a proxy marker when the TCP peer itself
      // is a Cloudflare edge IP; otherwise a direct forger could flip the
      // via-proxy bit and force the middleware to ignore the real peer IP.
      const hasForwardingHeaders = hasProxyHopHeader(req.headers);
      const viaProxy =
        (hasForwardingHeaders && isTrustedProxyPeer(ip)) ||
        (!!req.headers["cf-connecting-ip"] && isCloudflareIP(ip));
      req.headers[VIA_PROXY_HEADER] = `${token}|${viaProxy ? "1" : "0"}`;
      const clientIp = viaProxy ? resolveClientIp(req.headers, ip) : normalizeIp(ip);
      if (clientIp) req.headers[CLIENT_IP_HEADER] = `${token}|${clientIp}`;
    }
  } catch {
    /* never block a request on peer stamping */
  }
}

/** Wrap a Node request listener so every request is peer-stamped first. */
export function wrapRequestListenerWithPeerStamp(listener) {
  return function peerStampingRequestHandler(req, res) {
    stampPeerIp(req);
    return listener.call(this, req, res);
  };
}

const RELAY_FORWARDING_HEADERS = ["x-forwarded-for", "x-real-ip", "cf-connecting-ip"];

function isPrivateRelayPeer(ip) {
  if (isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }
  return /^(f[cd][0-9a-f]{2}|fe80):/i.test(ip);
}

/**
 * Forwarding headers for a call the server makes to itself on behalf of a client that is
 * connected to one of its WebSocket relays. Those calls leave over loopback, and the app tells a
 * local caller from a remote one, and applies the IP allow/deny list, from the socket peer plus
 * the forwarding headers on the call, so the relay has to report who the client really is:
 *
 *   loopback peer  a local client or a proxy on this host: its own forwarding headers are passed
 *                  on, all of them, since any one of them marks the call as proxied.
 *   trusted proxy  a Cloudflare edge, or a private-network peer when OMNIROUTE_TRUST_PROXY is
 *                  `private` / `lan`: its headers are passed on with its own address appended to
 *                  the X-Forwarded-For chain.
 *   anyone else    what it wrote is dropped and it is reported by the address of its connection.
 *
 * `remoteAddress` is `req.socket.remoteAddress` of the upgrade request. A missing one is
 * reported as "unknown", never as a local client.
 */
export function relayForwardingHeaders(remoteAddress, requestHeaders = {}) {
  const peer = typeof remoteAddress === "string" ? remoteAddress.replace(/^::ffff:/i, "") : "";
  const own = {};
  for (const name of RELAY_FORWARDING_HEADERS) {
    const value = requestHeaders[name];
    if (typeof value === "string" && value.trim()) own[name] = value;
  }
  if (peer === "::1" || peer.startsWith("127.")) return own;

  const trustMode = (process.env.OMNIROUTE_TRUST_PROXY || "").trim().toLowerCase();
  const trustsPrivate = trustMode === "private" || trustMode === "lan";
  if (peer && (isCloudflareIP(peer) || (trustsPrivate && isPrivateRelayPeer(peer)))) {
    const chain = [own["x-forwarded-for"], peer].filter(Boolean).join(", ");
    return { ...own, "x-forwarded-for": chain };
  }
  return { "x-forwarded-for": peer || "unknown" };
}
