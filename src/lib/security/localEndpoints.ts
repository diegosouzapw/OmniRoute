/**
 * Guard for /api/local/* routes.
 *
 * These endpoints shell out to the user's local Podman/Docker to manage local
 * infrastructure (Redis, Postgres, MinIO, etc.) on behalf of the GUI. They MUST
 * only respond to requests originating from the same host as the dev server.
 *
 * ⚠️ Trust boundary — READ THIS: the AUTHORITATIVE gate for `/api/local/*` is the
 * management policy, NOT this function. `/api/local/` is registered in
 * `LOCAL_ONLY_API_PREFIXES` (src/server/authz/routeGuard.ts) and enforced by
 * `managementPolicy` (src/server/authz/policies/management.ts) using the real
 * SOCKET PEER IP (`requestPeerAddress`), unconditionally, in the proxy pipeline
 * BEFORE any auth check and before this handler runs. A leaked JWT over a tunnel
 * cannot reach the spawn. It is also listed in `SPAWN_CAPABLE_PREFIXES` so a
 * manage-scope bypass can never whitelist it.
 *
 * This function is a SECONDARY, best-effort, defense-in-depth check layered behind
 * that gate. In the Next.js runtime it is currently INERT for real requests:
 * `globalThis.__omniRequestHeaders` is not populated per-request, so the loopback/
 * bearer branches below never run and the function falls through to its env-gated
 * default. Do NOT rely on it as the trust boundary — keep `/api/local/*` classified
 * in `routeGuard.ts` (that is what actually closes the hole). The header-driven
 * branches remain for the desktop/embedded path that does inject the header.
 *
 * Rules (apply only when `__omniRequestHeaders` is wired by the caller):
 *   1. Allow requests whose `host` header matches the dev server's bind host
 *      (localhost / 127.0.0.1 / ::1) AND whose `x-forwarded-for` is absent
 *      or set to a loopback address. This blocks proxied requests from the
 *      public internet when the dev server is bound to localhost.
 *   2. In production (`NODE_ENV=production`), reject unconditionally unless
 *      OMNIROUTE_LOCAL_ENDPOINTS_ENABLED=1 is set. The flag is opt-in so
 *      accidental dev deployments do not expose the API.
 *   3. Trust-list the OmniRoute desktop app via a shared bearer token
 *      (OMNIROUTE_LOCAL_ENDPOINTS_TOKEN). The desktop app injects the header
 *      and the server verifies it.
 *
 * If you are adding a new endpoint under /api/local/* you must:
 *   - call this guard at the top of your handler
 *   - never read user-supplied input into `execFile` argv without strict
 *     allow-list validation (no shell:true, no string concatenation)
 *   - log the invocation via the audit channel so misuse is detectable
 */
export function isLocalRequestAllowed(): { allowed: true } | { allowed: false; reason: string } {
  const headers = (globalThis as { __omniRequestHeaders?: Headers }).__omniRequestHeaders;
  if (headers) {
    // 1. Bearer token path (desktop app trust)
    const expected = process.env.OMNIROUTE_LOCAL_ENDPOINTS_TOKEN;
    if (expected) {
      const supplied = headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
      if (supplied && constantTimeEqual(supplied, expected)) {
        return { allowed: true };
      }
    }
    // 2. Same-origin loopback path (browser dev tools)
    const host = headers.get("host") ?? "";
    const fwd = headers.get("x-forwarded-for") ?? "";
    // Accept the bracketed IPv6 host form browsers send in the Host header
    // (`[::1]:20128`) alongside bare `::1`, `localhost`, and `127.0.0.1`.
    const isLoopbackHost = /^(localhost|127\.0\.0\.1|::1|\[::1\])(:\d+)?$/.test(host);
    const isLoopbackFwd = fwd === "" || /^127\.|^::1$|^localhost$/.test(fwd.split(",")[0]?.trim() ?? "");
    if (isLoopbackHost && isLoopbackFwd) {
      return { allowed: true };
    }
    return { allowed: false, reason: "non-local origin" };
  }

  // Production opt-in
  if (process.env.NODE_ENV === "production" && process.env.OMNIROUTE_LOCAL_ENDPOINTS_ENABLED !== "1") {
    return { allowed: false, reason: "disabled in production" };
  }

  return { allowed: true };
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}