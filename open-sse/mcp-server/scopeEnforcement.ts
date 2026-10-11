import { MCP_TOOL_MAP } from "./schemas/tools.ts";
import { hasManageScope } from "../../src/shared/constants/managementScopes.ts";

type AuthInfoLike = {
  clientId?: string;
  scopes?: string[];
};

export type McpToolExtraLike = {
  authInfo?: AuthInfoLike;
  sessionId?: string;
  _meta?: unknown;
};

export type ScopeSource = "authInfo" | "meta" | "env" | "none";

export interface CallerScopeContext {
  callerId: string;
  scopes: string[];
  source: ScopeSource;
}

export interface ScopeCheckResult {
  allowed: boolean;
  required: string[];
  provided: string[];
  missing: string[];
  reason?: string;
}

function normalizeScopeList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const normalized = raw
    .filter((value) => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
  return Array.from(new Set(normalized));
}

function extractMetaScopeList(meta: unknown): string[] {
  if (!meta || typeof meta !== "object") return [];
  const metaRecord = meta as Record<string, unknown>;

  const direct = normalizeScopeList(metaRecord.scopes);
  if (direct.length > 0) return direct;

  const auth = metaRecord.auth;
  if (auth && typeof auth === "object") {
    const authScopes = normalizeScopeList((auth as Record<string, unknown>).scopes);
    if (authScopes.length > 0) return authScopes;
  }

  const omni = metaRecord.omniroute;
  if (omni && typeof omni === "object") {
    const omniScopes = normalizeScopeList((omni as Record<string, unknown>).scopes);
    if (omniScopes.length > 0) return omniScopes;
  }

  return [];
}

function scopeMatches(grantedScope: string, requiredScope: string): boolean {
  if (grantedScope === "*" || grantedScope === requiredScope) {
    return true;
  }
  if (grantedScope.endsWith("*")) {
    const prefix = grantedScope.slice(0, -1);
    return requiredScope.startsWith(prefix);
  }
  return false;
}

export function resolveCallerScopeContext(
  extra: McpToolExtraLike | undefined,
  fallbackScopes: readonly string[] = []
): CallerScopeContext {
  const callerId =
    (typeof extra?.authInfo?.clientId === "string" && extra.authInfo.clientId.trim()) ||
    (typeof extra?.sessionId === "string" && extra.sessionId.trim()) ||
    "anonymous";

  const authScopes = normalizeScopeList(extra?.authInfo?.scopes);
  if (authScopes.length > 0) {
    return { callerId, scopes: authScopes, source: "authInfo" };
  }

  const metaScopes = extractMetaScopeList(extra?._meta);
  if (metaScopes.length > 0) {
    return { callerId, scopes: metaScopes, source: "meta" };
  }

  const fallback = normalizeScopeList(fallbackScopes);
  if (fallback.length > 0) {
    return { callerId, scopes: fallback, source: "env" };
  }

  return { callerId, scopes: [], source: "none" };
}

/**
 * OMNIROUTE_MCP_ENFORCE_SCOPES is opt-in (default off) to keep the documented local/stdio
 * single-operator flow friction-free. That default must never extend to a caller resolved from a
 * real per-key HTTP `Authorization` header (`source === "authInfo"` — populated HTTP/SSE-only)
 * unless that key already holds full `manage`/`admin` scope. Otherwise an API key granted ONLY the
 * narrow `mcp:connect` bypass scope (authorized for nothing but the /api/mcp/ LOCAL_ONLY
 * carve-out) could invoke every MCP tool once an operator enables remote MCP access, because
 * `evaluateToolScopes()` short-circuits to `allowed: true` while enforcement is off.
 */
export function shouldForceScopeEnforcement(context: CallerScopeContext): boolean {
  return context.source === "authInfo" && !hasManageScope(context.scopes);
}

export function evaluateToolScopes(
  toolName: string,
  callerScopes: readonly string[],
  enforceScopes: boolean,
  inlineScopes?: readonly string[]
): ScopeCheckResult {
  const provided = normalizeScopeList(callerScopes);

  if (!enforceScopes) {
    return { allowed: true, required: [], provided, missing: [] };
  }

  const toolScopes = inlineScopes ?? MCP_TOOL_MAP[toolName]?.scopes;
  const required = Array.isArray(toolScopes) ? Array.from(toolScopes) : [];

  if (required.length === 0) {
    return {
      allowed: false,
      required: [],
      provided,
      missing: [],
      reason: "tool_definition_missing",
    };
  }

  const missing = required.filter(
    (requiredScope) => !provided.some((grantedScope) => scopeMatches(grantedScope, requiredScope))
  );

  return {
    allowed: missing.length === 0,
    required,
    provided,
    missing,
    reason: missing.length > 0 ? "missing_scopes" : undefined,
  };
}

/**
 * The client-facing text for a scope denial.
 *
 * S-04 (#15159): this deliberately carries only what the caller can act on — the
 * tool name and the missing scopes. It must NOT include `Caller=`/`source=`: the
 * caller id is caller-influenced (`resolveCallerScopeContext` derives it from
 * `extra.authInfo.clientId`, a caller-supplied string, then `extra.sessionId`, then
 * "anonymous"), so interpolating it reflected arbitrary caller text back on a
 * pre-auth error surface and echoed it into logs. The identity is still recorded in
 * the `_scopeCheck` audit payload in `withScopeEnforcement`, which is where an
 * operator needs it.
 *
 * Extracted here rather than inlined in server.ts so the composition is directly
 * testable instead of being asserted through a copy of the literal.
 */
export function buildScopeDenialMessage(toolName: string, missing: readonly string[]): string {
  const missingScopes = missing.length > 0 ? missing.join(", ") : "unavailable";
  return `Insufficient MCP scopes for ${toolName}. Missing: ${missingScopes}.`;
}
