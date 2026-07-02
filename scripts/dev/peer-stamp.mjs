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
 * carried forwarding headers (`x-forwarded-for` / `x-real-ip`), `<token>|0`
 * otherwise. Required so the middleware can tell that a loopback socket is the
 * reverse-proxy hop (nginx / Caddy / Cloudflare Tunnel) and NOT trust it as
 * local — without this, a leaked JWT over a public tunnel would reach the
 * LOCAL_ONLY routes that spawn child processes (Hard Rules #15 + #17;
 * port of upstream decolua/9router commit da667836).
 *
 * Keep VIA_PROXY_HEADER in sync with VIA_PROXY_HEADER in
 * src/server/authz/headers.ts (the TS side cannot import this .mjs).
 */
export const VIA_PROXY_HEADER = "x-omniroute-via-proxy";

/** Generate (once) and return the per-process stamp token, persisting it in env
 *  so the middleware running in the same process reads the identical value. */
export function ensurePeerStampToken() {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN ||= randomUUID();
  return process.env.OMNIROUTE_PEER_STAMP_TOKEN;
}

/** Strip any client-supplied PEER_IP_HEADER + VIA_PROXY_HEADER and stamp the
 *  real TCP peer IP plus a token-protected via-proxy marker. Never throws — a
 *  stamping failure must not block a request (it degrades to "locality
 *  unknown" → fail closed in the middleware). */
export function stampPeerIp(req) {
  try {
    if (!req || !req.headers) return;
    // Node lowercases incoming header names; delete kills any client value.
    delete req.headers[PEER_IP_HEADER];
    delete req.headers[VIA_PROXY_HEADER];
    const ip = req.socket && req.socket.remoteAddress;
    if (ip) {
      const token = ensurePeerStampToken();
      req.headers[PEER_IP_HEADER] = `${token}|${ip}`;
      // Forwarding headers present = request arrived via a reverse proxy; the
      // loopback socket is the proxy hop, not the end-user, so it must not be
      // trusted as local. Token-prefix the marker so a remote caller cannot
      // forge it (or its absence) on a non-proxied request.
      const viaProxy = !!(req.headers["x-forwarded-for"] || req.headers["x-real-ip"]);
      req.headers[VIA_PROXY_HEADER] = `${token}|${viaProxy ? "1" : "0"}`;
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
