import { timingSafeEqual } from "node:crypto";

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
