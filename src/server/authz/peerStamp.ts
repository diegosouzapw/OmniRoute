import { timingSafeEqual } from "node:crypto";
import { classifyHostLocality } from "./routeGuard";

/**
 * Resolve the real peer IP from the trusted `<token>|<ip>` stamp that the custom
 * Node server writes into PEER_IP_HEADER (see scripts/dev/peer-stamp.mjs). Returns
 * the IP ONLY when the token constant-time-matches this process's stamp token;
 * any other value (no stamp, wrong/forged token, missing separator, empty IP)
 * returns null.
 *
 * Pure + dependency-free so the auth boundary is directly unit-testable.
 *
 * SECURITY: this is the ONLY trustworthy locality signal in the Next middleware
 * runtime (which has no socket). Never derive locality from the Host header — it
 * is fully client-controlled, so `Host: 127.0.0.1` from a remote attacker would
 * otherwise bypass the LOCAL_ONLY gate guarding spawn-capable routes.
 */
export function resolveStampedPeer(
  headerValue: string | null,
  token: string | undefined
): string | null {
  if (!headerValue || !token) return null;
  const sep = headerValue.indexOf("|");
  if (sep <= 0) return null;
  const provided = headerValue.slice(0, sep);
  const ip = headerValue.slice(sep + 1);
  if (!ip) return null;
  if (provided.length !== token.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(provided), Buffer.from(token))) return null;
  } catch {
    return null;
  }
  return ip;
}

/**
 * Resolve the trusted "request arrived via a reverse proxy" marker stamped by
 * the custom Node server (`scripts/dev/peer-stamp.mjs::stampPeerIp`). The stamp
 * is `<token>|1` when forwarding headers (`x-forwarded-for` / `x-real-ip`) were
 * present on the inbound TCP request, and `<token>|0` otherwise.
 *
 * Returns true ONLY when the token constant-time-matches this process's stamp
 * token AND the payload is exactly "1". Any other value — no stamp, forged
 * token, "0", junk — returns false (the safe default: assume no proxy hop).
 *
 * SECURITY: paired with `resolveStampedPeer()` to close the upstream
 * decolua/9router da667836 vulnerability — when OmniRoute itself runs behind
 * an external reverse proxy (nginx / Caddy / Cloudflare Tunnel),
 * `req.socket.remoteAddress` is the proxy hop (usually 127.0.0.1), not the
 * end-user. Without this signal, `classifyHostLocality()` would return
 * "loopback" for every remote caller arriving via the proxy, granting access
 * to the LOCAL_ONLY tier that gates spawn-capable routes (Hard Rules #15 +
 * #17). Consume via `classifyStampedPeerLocality()` below.
 */
export function resolveStampedViaProxy(
  headerValue: string | null,
  token: string | undefined
): boolean {
  if (!headerValue || !token) return false;
  const sep = headerValue.indexOf("|");
  if (sep <= 0) return false;
  const provided = headerValue.slice(0, sep);
  const payload = headerValue.slice(sep + 1);
  if (provided.length !== token.length) return false;
  try {
    if (!timingSafeEqual(Buffer.from(provided), Buffer.from(token))) return false;
  } catch {
    return false;
  }
  return payload === "1";
}

/**
 * The trusted locality verdict consumed by the LOCAL_ONLY route guard. Wraps
 * `resolveStampedPeer()` + `resolveStampedViaProxy()` + `classifyHostLocality()`
 * so the pipeline has a single boundary helper:
 *
 *   1. Resolve the real peer IP from PEER_IP_HEADER (or fail closed → remote).
 *   2. If the via-proxy marker is present, the loopback / private-LAN socket
 *      is the proxy hop, not the end-user — downgrade to "remote".
 *      (Public-IP sockets are already remote, so the marker is a no-op there.)
 *   3. Otherwise classify the raw IP normally (loopback / lan / remote).
 *
 * Pure; both header values are token-validated, so an attacker who knows the
 * header names but not the per-process token cannot influence the verdict in
 * any direction.
 */
export function classifyStampedPeerLocality(
  peerHeader: string | null,
  viaProxyHeader: string | null,
  token: string | undefined
): "loopback" | "lan" | "remote" {
  const ip = resolveStampedPeer(peerHeader, token);
  const viaProxy = resolveStampedViaProxy(viaProxyHeader, token);
  const locality = classifyHostLocality(ip);
  if (viaProxy && locality !== "remote") return "remote";
  return locality;
}
