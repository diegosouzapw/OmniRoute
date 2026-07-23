/**
 * Proxy health-check status-write policy (#6246).
 *
 * The manual "Test All" reachability probe (`/api/settings/proxies/auto-test`)
 * used to flip a proxy's `status` to `inactive` on a single failed probe. Because
 * the egress selector excludes `inactive` proxies (PROXY_ALIVE_PREDICATE), a flaky
 * external probe (an unreachable httpbin.org, a proxy that blocks HEAD, or a slow
 * paid proxy) silently disabled every proxy that failed — "Test All" is a test,
 * not test-and-set.
 *
 * Policy: automated reachability probes are **read-only by default** — they never
 * write a proxy's status. Only the operator sets a proxy active/inactive (same
 * contract as provider accounts, which are auto-disabled only when the operator
 * opts in). Set `PROXY_HEALTH_AUTO_DEACTIVATE=true` to restore the legacy
 * test-and-set behavior (probe result writes `active`/`inactive`).
 */

/**
 * Resolve the status an automated health probe should WRITE for a proxy, or
 * `null` to leave the status untouched (the default). Pure + unit-testable.
 *
 * @param alive whether the reachability probe succeeded
 * @param env   environment source (defaults to process.env)
 */
export function resolveHealthCheckStatusWrite(
  alive: boolean,
  env: { PROXY_HEALTH_AUTO_DEACTIVATE?: string } = process.env
): "active" | "inactive" | null {
  if ((env.PROXY_HEALTH_AUTO_DEACTIVATE ?? "").trim().toLowerCase() !== "true") {
    // Default: never let an automated probe change a proxy's status.
    return null;
  }
  return alive ? "active" : "inactive";
}

/** True when automated probes are allowed to write proxy status (opt-in). */
export function isProxyHealthAutoDeactivateEnabled(
  env: { PROXY_HEALTH_AUTO_DEACTIVATE?: string } = process.env
): boolean {
  return (env.PROXY_HEALTH_AUTO_DEACTIVATE ?? "").trim().toLowerCase() === "true";
}
