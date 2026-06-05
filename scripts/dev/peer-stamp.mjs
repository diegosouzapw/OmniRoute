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

/** Generate (once) and return the per-process stamp token, persisting it in env
 *  so the middleware running in the same process reads the identical value. */
export function ensurePeerStampToken() {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN ||= randomUUID();
  return process.env.OMNIROUTE_PEER_STAMP_TOKEN;
}

/** Strip any client-supplied PEER_IP_HEADER and stamp the real TCP peer IP,
 *  token-prefixed. Never throws — a stamping failure must not block a request
 *  (it degrades to "locality unknown" → fail closed in the middleware). */
export function stampPeerIp(req) {
  try {
    if (!req || !req.headers) return;
    // Node lowercases incoming header names; delete kills any client value.
    delete req.headers[PEER_IP_HEADER];
    const ip = req.socket && req.socket.remoteAddress;
    if (ip) {
      req.headers[PEER_IP_HEADER] = `${ensurePeerStampToken()}|${ip}`;
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
