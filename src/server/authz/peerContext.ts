import { timingSafeEqual } from "node:crypto";

import { getLegacyCliTokenSync, getMachineTokenSync } from "../../lib/machineToken";
import type { PolicyContext } from "./context";
import { CLI_TOKEN_HEADER, PEER_IP_HEADER, VIA_PROXY_HEADER } from "./headers";
import { resolveStampedPeer, resolveStampedViaProxy } from "./peerStamp";
import { isLoopbackHost, isPrivateLanHost } from "./routeGuard";

/**
 * Peer-locality + local-CLI-token helpers shared by the route policies.
 *
 * Extracted from `policies/management.ts` because the PUBLIC policy
 * needs the very same CLI-token verdict: `runAuthzPipeline` strips
 * CLI_TOKEN_HEADER from the forwarded headers for EVERY route class, so a route
 * handler can only learn that a local CLI authenticated from the subject stamp
 * the policy produced. Without this, a PUBLIC-classified route that still calls
 * `requireManagementAuth()` (e.g. GET /api/monitoring/health) can never see the
 * local CLI as a management principal.
 */

export function requestPeerAddress(ctx: PolicyContext): string | null {
  // The Next proxy runtime exposes no socket/.ip, so the only trustworthy
  // locality signal is the token-stamped PEER_IP_HEADER our custom server writes
  // from the real TCP peer (scripts/dev/peer-stamp.mjs). We NEVER read the Host
  // header here — it is client-controlled and spoofable. Absent/forged stamp →
  // null → isLoopbackRequest/isPrivateLanRequest return false → fail closed.
  const stamped = resolveStampedPeer(
    ctx.request.headers?.get?.(PEER_IP_HEADER) ?? null,
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
  if (stamped) return stamped;
  // Non-proxy callers (tests / direct Node) may carry a real socket peer.
  return ctx.request.ip ?? ctx.request.socket?.remoteAddress ?? null;
}

/**
 * True when the inbound TCP request carried forwarding headers
 * (`x-forwarded-for` / `x-real-ip`), as stamped by the custom Node server. When
 * set, the socket peer is the reverse-proxy hop, not the end-user — so a
 * loopback / private-LAN socket must NOT be trusted as local (Hard Rules #15 +
 * #17, port of decolua/9router da667836). Token-validated; an attacker who
 * knows the header name but not the per-process token cannot influence it.
 */
export function isViaProxyRequest(ctx: PolicyContext): boolean {
  return resolveStampedViaProxy(
    ctx.request.headers?.get?.(VIA_PROXY_HEADER) ?? null,
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
}

export function isLoopbackRequest(ctx: PolicyContext): boolean {
  if (isViaProxyRequest(ctx)) return false;
  const peerAddress = requestPeerAddress(ctx);
  return peerAddress ? isLoopbackHost(peerAddress) : false;
}

// Owner-authorized (2026-05-30): allow LOCAL_ONLY *paths* from a trusted private
// LAN, based on the real socket peer IP (not spoofable). Does NOT relax the
// CLI-token gate, which stays strictly loopback. Also falls back to "not LAN"
// when a reverse-proxy hop is detected (the apparent LAN IP would be the proxy,
// not the end-user — see isViaProxyRequest above).
export function isPrivateLanRequest(ctx: PolicyContext): boolean {
  if (isViaProxyRequest(ctx)) return false;
  const peerAddress = requestPeerAddress(ctx);
  return peerAddress ? isPrivateLanHost(peerAddress) : false;
}

/** Strictly-loopback machine-token check (constant-time). */
export function hasValidLoopbackCliToken(ctx: PolicyContext): boolean {
  if (process.env.OMNIROUTE_DISABLE_CLI_TOKEN === "true") return false;
  if (!isLoopbackRequest(ctx)) return false;
  const headers = ctx.request.headers;
  const provided = headers.get(CLI_TOKEN_HEADER);
  if (!provided) return false;
  const expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()].filter(Boolean);
  return expectedTokens.some((expected) => {
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  });
}

/** The subject a validated local CLI request is stamped with. */
export const LOCAL_CLI_SUBJECT = Object.freeze({
  kind: "management_key" as const,
  id: "cli",
  label: "local-cli-token",
});
