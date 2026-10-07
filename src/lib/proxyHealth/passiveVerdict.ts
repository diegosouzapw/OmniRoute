/**
 * Passive verdict from production traffic.
 *
 * Reads health from real request history instead of probing what production
 * already exercises: an endpoint with a recent attributed proxy failure keeps
 * its live probe (only the probe can confirm it), while an endpoint whose
 * window shows at least one success and no attributed failure is already
 * proven and skips the redundant probe.
 *
 * Pure aggregation over already-read rows (no SQL here — the sweep reads via
 * the existing `proxyLogs.ts` readers and this module only folds rows into a
 * boolean). Never mutates a status, never removes: the sweep only uses the
 * fold to skip or keep a probe (plus a single-provider guard decided in the
 * scheduler).
 */

/** Minimal row shape consumed from `proxy_logs` readers. */
export interface PassiveLogRow {
  proxy_host?: string | null;
  proxy_port?: number | null;
  provider?: string | null;
  status?: string | null;
  error?: string | null;
  upstream_status?: number | null;
  attempt_issue?: string | null;
  timestamp?: string | null;
}

export interface AttributedFailureSignals {
  error?: string | null;
  upstream_status?: number | null;
  status?: string | null;
}

// Connection-level failures that prove the proxy is at fault: the request
// never reached a provider (DNS never resolved, connection refused, or the
// socket died on the proxy leg). Only bounded syscall codes blame the proxy,
// matched at word granularity so provider text never matches. Matched against
// the `error` column of `proxy_logs`.
const ATTRIBUTED_ERROR_PATTERNS =
  /\b(?:ENOTFOUND|EAI_AGAIN|ECONNREFUSED|EHOSTUNREACH|ENETUNREACH|ENOTCONN|EHOSTDOWN|ENETDOWN|ERR_SOCKET_CLOSED|ERR_SOCKET_TIMEOUT)\b|socket hang up/i;

// Explicitly neutral (never attributed — each pinned by a test): mid-flight
// drops (ECONNRESET, EPIPE, ETIMEDOUT, ECONNABORTED, ERR_NETWORK, bare
// ERR_SOCKET), bare provider-side wording (TLS, DNS, handshake, fetch
// failed), and coded upstream TLS faults (CERT_*, ERR_TLS_*, TLSV1_ALERT_*).
// The matcher above fires only on bounded proxy codes, so anything listed
// here falls through to `false` — except a message that ALSO carries a
// bounded proxy code (`fetch failed: connect ECONNREFUSED ...`), where the
// code decides and the row degrades.

// Relayed provider refusals (the TARGET refused this egress IP) prove the
// proxy relayed fine — neutral, exactly like the sweep's `blocked` outcome.
const TARGET_REFUSAL_STATUSES: ReadonlySet<number> = new Set([401, 403, 429]);

/**
 * PURE: does this logged row prove the PROXY failed (not the provider, not
 * the network)? Bounded syscall codes / stalled proxy-leg handshake → true
 * (degrade). Mid-flight drops, bare provider-side tokens, coded upstream TLS
 * faults, relayed 5xx, target refusals → false (neutral).
 * A row with `upstream_status` NULL carries no proof either way → false.
 */
export function isProxyAttributedFailure(signals: AttributedFailureSignals): boolean {
  const { error = null, upstream_status = null, status = null } = signals;
  // A provider answer (any upstream status) means the proxy relayed: a 5xx
  // blames the provider, a 401/403/429 refusal blames the target — never the
  // proxy. Only the absence of an upstream answer can implicate the proxy.
  if (typeof upstream_status === "number") return false;
  if (status === "blocked" || (typeof status === "string" && status.startsWith("refused"))) {
    return false;
  }
  // Relayed target refusals (401/403/429 carried on the row) prove the proxy
  // relayed — neutral, like the sweep's `blocked` outcome.
  if (typeof status === "string" && TARGET_REFUSAL_STATUSES.has(Number(status))) {
    return false;
  }
  if (typeof error !== "string" || error.length === 0) return false;
  // A bounded proxy code anywhere in the message decides, even behind a
  // generic prefix (`fetch failed: connect ECONNREFUSED ...` still degrades).
  // Bare provider-side tokens (TLS/DNS/handshake/fetch wording, coded
  // upstream TLS faults) match nothing here and stay neutral below.
  return ATTRIBUTED_ERROR_PATTERNS.test(error);
}

/**
 * PURE: fold windowed rows into a skip proof. `abandoned` sends are excluded
 * (an abandoned send proves nothing about the proxy). True only when the
 * window holds at least one `success` and no attributed proxy failure —
 * order-independent, so the callers' most-recent-first ordering has no
 * effect. A row with NULL `upstream_status` and no attributed error is
 * simply not a success and carries no veto either.
 */
export function hasProvenSuccessWithoutAttributedFailure(rows: PassiveLogRow[]): boolean {
  let hasSuccess = false;
  for (const row of rows) {
    if (row.attempt_issue === "abandoned") continue;
    if (isProxyAttributedFailure(row)) return false;
    if (row.status === "success") hasSuccess = true;
  }
  return hasSuccess;
}

/** Cache key: one proxy endpoint (skips additionally gate on the providers seen). */
export function passiveVerdictKey(host: string, port: number): string {
  return `${host}:${port}`;
}

type PassiveEnv = Record<string, string | undefined>;

function resolveBoundedMs(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  const parsed = parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

/**
 * Sliding window for passive rows, in ms. Shorter than the 10-minute sweep
 * interval so a recent failure dominates instead of being diluted.
 */
export function resolvePassiveWindowMs(env: PassiveEnv = process.env): number {
  return resolveBoundedMs(env.PROXY_PASSIVE_WINDOW_MS, 5 * 60 * 1000, 60_000, 10 * 60_000 - 1);
}

/**
 * Opt-in gate for the passive sweep skip. Off by default: with the flag
 * unset the sweep probes every proxy exactly as before (no passive skip).
 * Local env read (same convention as the recovery pass gate) so no registry
 * file is touched.
 */
export function isPassiveSweepSkipEnabled(env: PassiveEnv = process.env): boolean {
  return env.PROXY_HEALTH_PASSIVE_SKIP === "true";
}
