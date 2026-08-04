import { verifyAccessToken } from "@/lib/db/accessTokens";
import { scopeSatisfies, type AccessScope } from "@/lib/accessTokens/scopes";
import { inferRequiredScope } from "@/server/authz/accessScopes";

/**
 * Shared evaluation of a scoped CLI access token (`oma_...`) for remote mode.
 *
 * Used by BOTH the central authz pipeline (`managementPolicy` — the authoritative
 * gate wired through `src/proxy.ts`) and the route-level `requireManagementAuth`
 * (defense-in-depth + lets `/api/cli/whoami` learn its own scope). Keeping the
 * logic here means the two gates can never drift.
 *
 * Returns a neutral verdict the caller maps to its own response shape
 * (`allow()/reject()` in the policy, `null`/Response in requireManagementAuth).
 */

/** Prefix that distinguishes a CLI access token from an inference API key. */
export const ACCESS_TOKEN_PREFIX = "oma_";

export type AccessTokenVerdict =
  | { kind: "absent" } // no oma_ bearer present → caller continues other auth paths
  | { kind: "error" } // auth backend (DB) threw → 503, not an auth failure
  | { kind: "invalid" } // oma_ present but unknown/expired/revoked → 401
  | { kind: "insufficient"; have: AccessScope; need: AccessScope } // valid but scope too low → 403
  | { kind: "ok"; scope: AccessScope; id: string; name: string }; // authorized → allow

/** Read a Bearer token from the Authorization header (header-only; never URL). */
export function extractBearer(request: Request): string | null {
  const header = request.headers.get("authorization") || "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match ? match[1].trim() : null;
}

function safePathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return "/";
  }
}

/**
 * Evaluate the request's access-token credential and required scope.
 * Pure w.r.t. the request (only side effect is `verifyAccessToken` stamping
 * `last_used_at`). Never throws — DB failures surface as `{ kind: "error" }`.
 */
export function evaluateAccessTokenAuth(request: Request): AccessTokenVerdict {
  const bearer = extractBearer(request);
  if (!bearer || !bearer.startsWith(ACCESS_TOKEN_PREFIX)) {
    return { kind: "absent" };
  }

  let verified: ReturnType<typeof verifyAccessToken>;
  try {
    verified = verifyAccessToken(bearer);
  } catch {
    return { kind: "error" };
  }
  if (!verified) return { kind: "invalid" };

  const need = inferRequiredScope(request.method, safePathname(request.url));
  if (!scopeSatisfies(verified.scope, need)) {
    return { kind: "insufficient", have: verified.scope, need };
  }

  return { kind: "ok", scope: verified.scope, id: verified.id, name: verified.name };
}
