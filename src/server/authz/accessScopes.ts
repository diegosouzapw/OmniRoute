import { type AccessScope } from "@/lib/accessTokens/scopes";

/**
 * Required-scope inference for remote CLI access tokens.
 *
 * Policy (owner-confirmed 2026-06-19): infer from HTTP method —
 *   - GET/HEAD/OPTIONS → read
 *   - POST/PUT/PATCH/DELETE → write
 * with two admin overrides:
 *   - ADMIN_SCOPE_PREFIXES: admin for ANY method (inherently sensitive surfaces).
 *   - ADMIN_MUTATION_PREFIXES: admin only when mutating; GET/HEAD stay read so a
 *     `read` token can still inspect status under these prefixes.
 *
 * This covers every existing management route with zero per-route edits. A NEW
 * mutating route nasce exigindo `write` por padrão (não `admin`) — quando uma
 * rota nova for sensível, adicione seu prefixo a uma das listas abaixo.
 *
 * Note: this only governs the access-token credential path. Dashboard JWT, the
 * loopback CLI machine-id token, and manage-scope API keys remain full-access.
 * Loopback-only routes that spawn processes are blocked before auth regardless.
 */

/** Sensitive management surfaces — require `admin` for ALL methods. */
export const ADMIN_SCOPE_PREFIXES: readonly string[] = [
  "/api/cli/tokens", // access-token management (create/list/revoke)
  "/api/oauth", // OAuth authorization flows
  "/api/auth", // login / logout / session
  "/api/policy", // policy engine
  "/api/services", // embedded-service lifecycle (also loopback-blocked)
  "/api/mcp", // MCP process surface (also loopback-blocked)
];

/** Require `admin` only for mutating methods; GET/HEAD under these stay `read`. */
export const ADMIN_MUTATION_PREFIXES: readonly string[] = [
  "/api/providers", // POST add provider / rotate key = admin; GET status = read
  "/api/cli-tools/apply", // writes config onto the host filesystem
];

const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function matchesPrefix(path: string, prefixes: readonly string[]): boolean {
  // Exact match or a true path-segment boundary (`pre/...`). A bare
  // `startsWith(pre)` would over-match lookalikes (e.g. "/api/auth" vs
  // "/api/authz-inventory"), so it is intentionally NOT used.
  return prefixes.some((pre) => path === pre || path.startsWith(pre + "/"));
}

/**
 * Determine the minimum access-token scope required to call `method path`.
 * Pure + deterministic — safe to unit test exhaustively.
 */
export function inferRequiredScope(method: string, path: string): AccessScope {
  const m = (method || "GET").toUpperCase();
  const p = path || "/";

  if (matchesPrefix(p, ADMIN_SCOPE_PREFIXES)) return "admin";

  const isMutation = !READ_METHODS.has(m);
  if (isMutation && matchesPrefix(p, ADMIN_MUTATION_PREFIXES)) return "admin";

  return isMutation ? "write" : "read";
}
