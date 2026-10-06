/**
 * #9717 — timeout policy for the MCP server's internal server→server fetches.
 *
 * `omniRouteFetch` serves two call shapes with very different latency budgets:
 * fast local management reads (health, resilience, combos, quota, usage) and
 * calls that wait on an upstream provider. A single 10s default aborted
 * `omniroute_route_request` while the upstream request was still in flight,
 * even though `omniroute_web_search` / `omniroute_web_fetch` already carried
 * their own explicit 60s signal in the same file for exactly that reason.
 *
 * Kept as a pure, dependency-free module so the policy is unit-testable without
 * starting the MCP server, mirroring how `tools/poolTools.ts` keeps handlers
 * separate from server wiring.
 */

/** Local management reads — a stalled one should fail fast, not hold a tool call open. */
export const MCP_FETCH_TIMEOUT_MS = 10_000;

/**
 * Calls that wait on an upstream provider. 60s is not a new number: it is the
 * value `web_search`/`web_fetch` already used, now shared with model routing
 * instead of each call site picking its own literal.
 */
export const MCP_UPSTREAM_FETCH_TIMEOUT_MS = 60_000;

export const MCP_FETCH_TIMEOUT_ENV = "OMNIROUTE_MCP_FETCH_TIMEOUT_MS";
export const MCP_UPSTREAM_FETCH_TIMEOUT_ENV = "OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS";

export type McpFetchTimeoutKind = "management" | "upstream";

function readPositiveIntEnv(raw: string | undefined): number | null {
  if (typeof raw !== "string" || raw.trim() === "") return null;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

function readMcpTimeoutOverride(
  kind: McpFetchTimeoutKind,
  env: Record<string, string | undefined>
): string | undefined {
  // Direct process.env member access so fabricated-docs / env-doc-sync see
  // the operator knobs. Tests inject a fake env object and keep using the
  // exported constant keys.
  if (env === process.env) {
    return kind === "upstream"
      ? process.env.OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS
      : process.env.OMNIROUTE_MCP_FETCH_TIMEOUT_MS;
  }
  return env[kind === "upstream" ? MCP_UPSTREAM_FETCH_TIMEOUT_ENV : MCP_FETCH_TIMEOUT_ENV];
}

/**
 * Resolve the timeout for one internal fetch class. An unset, malformed or
 * non-positive override falls back to the built-in default rather than
 * disabling the timeout — a bad env value must not turn a bounded wait into an
 * unbounded one.
 */
export function resolveMcpFetchTimeoutMs(
  kind: McpFetchTimeoutKind,
  env: Record<string, string | undefined> = process.env
): number {
  const override = readPositiveIntEnv(readMcpTimeoutOverride(kind, env));
  return override ?? (kind === "upstream" ? MCP_UPSTREAM_FETCH_TIMEOUT_MS : MCP_FETCH_TIMEOUT_MS);
}

/** `AbortSignal` for one internal fetch of the given class. */
export function mcpFetchTimeoutSignal(
  kind: McpFetchTimeoutKind,
  env?: Record<string, string | undefined>
): AbortSignal {
  return AbortSignal.timeout(resolveMcpFetchTimeoutMs(kind, env));
}
