/**
 * #9694 — echo-IP target selection for proxy egress probes.
 *
 * #1255 moved every probe from `api.ipify.org` to `api64.ipify.org` so proxies
 * with IPv6 egress could be tested. `api64` is IPv6-first, so it broke the case
 * the other way: an IPv4-only SOCKS5/SSH tunnel has no route to it and the probe
 * hangs until the caller's deadline, reporting a healthy proxy as dead.
 *
 * Neither single target works for both, so the probe tries them in order and
 * splits the caller's existing budget between the attempts. `api64` stays first,
 * so a proxy with working IPv6 answers on the first attempt and keeps the exact
 * behaviour #1255 introduced — including which of its addresses is reported,
 * which matters because the egress IP is an identity used to detect accounts
 * sharing an address. Only a proxy that cannot reach `api64` at all pays for the
 * second attempt, and the total stays bounded by the budget the caller already
 * enforced.
 *
 * Dependency-free leaf so the ordering and budget arithmetic are unit-testable
 * without opening a socket.
 */

/** IPv6-first echo target (#1255). Answers over IPv4 too when IPv6 is unavailable to the resolver. */
export const EGRESS_ECHO_URL_DUAL = "https://api64.ipify.org?format=json";

/** IPv4-only echo target — reachable from a proxy with no IPv6 route. */
export const EGRESS_ECHO_URL_V4 = "https://api4.ipify.org?format=json";

/** Operators can pin a single target (including a self-hosted echo) per deployment. */
export const EGRESS_ECHO_URL_ENV = "OMNIROUTE_PROXY_ECHO_URL";

/** Minimum a single attempt may be given, so a small caller budget is not split into uselessly short tries. */
export const MIN_ECHO_ATTEMPT_MS = 2000;

/**
 * Ordered echo targets. An override pins exactly one target — an operator who
 * names a target means it, and silently trying ipify anyway would defeat the
 * point of pointing the probe at a self-hosted echo.
 */
export function resolveEgressEchoUrls(
  env: Record<string, string | undefined> = process.env
): string[] {
  const override = env[EGRESS_ECHO_URL_ENV];
  if (typeof override === "string" && override.trim().length > 0) return [override.trim()];
  return [EGRESS_ECHO_URL_DUAL, EGRESS_ECHO_URL_V4];
}

/**
 * Per-attempt budget. The attempts must fit inside the budget the caller already
 * enforces, so the deadline the operator sees does not move. A budget too small
 * to split fairly is spent entirely on the first target rather than on two
 * attempts that are each too short to succeed.
 */
export function splitEchoAttemptBudget(totalMs: number, attempts: number): number[] {
  if (!Number.isFinite(totalMs) || totalMs <= 0 || attempts <= 0) return [];
  if (attempts === 1) return [totalMs];
  const even = Math.floor(totalMs / attempts);
  if (even < MIN_ECHO_ATTEMPT_MS) return [totalMs];
  return Array.from({ length: attempts }, () => even);
}

export interface EchoAttemptOutcome<T> {
  result: T;
  url: string;
}

/**
 * Try each echo target in order until one resolves. Rethrows the LAST error when
 * every target fails, so the caller's error message still describes a real
 * network failure rather than a bookkeeping one.
 */
export async function probeEchoTargets<T>(
  run: (url: string, timeoutMs: number) => Promise<T>,
  totalMs: number,
  env?: Record<string, string | undefined>
): Promise<EchoAttemptOutcome<T>> {
  const urls = resolveEgressEchoUrls(env);
  const budgets = splitEchoAttemptBudget(totalMs, urls.length);
  const attempts = budgets.length;
  let lastError: unknown = new Error("no echo target attempted");

  for (let i = 0; i < attempts; i++) {
    const url = urls[i];
    try {
      return { result: await run(url, budgets[i]), url };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
