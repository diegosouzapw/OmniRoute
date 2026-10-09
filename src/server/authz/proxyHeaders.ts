/**
 * Headers a reverse proxy or tunnel adds when it relays a request. A request that carries any of
 * them did not come from a local operator: a same-host proxy connects from loopback, so these
 * headers are the only thing that tells the callers behind it apart from the host itself.
 *
 * Callers can also send these headers themselves. That is safe here because the verdict only ever
 * goes one way: their presence downgrades a loopback or private-network peer to "remote", it never
 * grants anything.
 *
 * Pure and dependency-free so the WebSocket sidecar can use it without the auth graph. Keep it in
 * step with `hasProxyHopHeader` in scripts/dev/peer-stamp.mjs (a test compares them).
 */
export function hasProxyHopHeader(headers: Record<string, string | string[] | undefined>): boolean {
  for (const [rawName, value] of Object.entries(headers)) {
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
