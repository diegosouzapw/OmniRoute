/**
 * Passive verdict from production traffic.
 *
 * Reads health from real request history instead of probing what production
 * already exercises: a proxy that just failed a real request is skipped in
 * seconds (not at the next 10-minute sweep), a proxy serving traffic steadily
 * is not re-probed to relearn the last log line.
 *
 * Pure aggregation over already-read rows (no SQL here — the sweep reads via
 * the existing `proxyLogs.ts` readers and this module only folds rows into a
 * verdict). Never mutates a status, never removes: the sweep only uses the
 * verdict to skip or keep a probe.
 */

export type PassiveVerdict = "degraded" | "healthy" | "unknown";

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

export interface PassiveVerdictInput {
  /** Rows already read from `proxy_logs` for one proxy endpoint (windowed by the caller). */
  rows: PassiveLogRow[];
  /**
   * Consecutive attributed failures required before degrading. Mirrors the
   * sweep's `removeAfter` semantics (consecutive, not a rate).
   */
  degradeAfter?: number;
}

function resolveThreshold(raw: number | undefined): number {
  return Number.isFinite(raw) && (raw as number) > 0 ? Math.floor(raw as number) : 3;
}

/**
 * PURE: fold windowed rows into one verdict. `abandoned` sends are excluded
 * (an abandoned send proves nothing about the proxy); a row with NULL
 * `upstream_status` and no attributed error is `unknown`, never `degraded`.
 * Consecutive attributed failures degrade (same semantics as the sweep's
 * `removeAfter`); a success resets the streak. Newest row decides ties:
 * callers pass rows most-recent-first (the existing readers order by
 * timestamp DESC).
 */
export function decidePassiveVerdict(input: PassiveVerdictInput): PassiveVerdict {
  const threshold = resolveThreshold(input.degradeAfter);
  let failures = 0;
  let successes = 0;
  for (const row of input.rows) {
    if (row.attempt_issue === "abandoned") continue;
    if (isProxyAttributedFailure(row)) {
      failures++;
      successes = 0;
      if (failures >= threshold) return "degraded";
      continue;
    }
    if (row.status === "success") {
      successes++;
      failures = 0;
    }
  }
  if (failures > 0) return "unknown";
  return successes > 0 ? "healthy" : "unknown";
}

/** Cache key: one proxy endpoint (healthy skips additionally gate on the providers seen). */
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

/** Short-lived aggregate cache TTL, in ms. Always shorter than the window. */
export function resolvePassiveCacheTtlMs(env: PassiveEnv = process.env): number {
  const windowMs = resolvePassiveWindowMs(env);
  const ttl = resolveBoundedMs(env.PROXY_PASSIVE_CACHE_TTL_MS, 60_000, 10_000, windowMs);
  return Math.min(ttl, windowMs);
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

/** Bounded aggregate cache: one slot per proxy endpoint, oldest evicted first. */
export const MAX_PASSIVE_VERDICT_ENTRIES = 500;

const passiveVerdictCache = new Map<
  string,
  { verdict: PassiveVerdict; providers: string[]; at: number }
>();

/**
 * Cached verdict for one endpoint key, with the providers observed when it
 * was computed (a healthy skip needs exactly one). Stale entries (older
 * than the TTL) are treated as absent so the sweep re-aggregates once per
 * TTL.
 */
export function getCachedPassiveVerdict(
  key: string,
  ttlMs: number,
  now: number = Date.now()
): { verdict: PassiveVerdict; providers: string[] } | null {
  const entry = passiveVerdictCache.get(key);
  if (!entry) return null;
  if (now - entry.at >= ttlMs) {
    passiveVerdictCache.delete(key);
    return null;
  }
  return { verdict: entry.verdict, providers: entry.providers };
}

/** Test seam: store one cached verdict. Evicts the oldest entry past the bound. */
export function setCachedPassiveVerdict(
  key: string,
  verdict: PassiveVerdict,
  providers: string[] = [],
  now: number = Date.now()
): void {
  if (!passiveVerdictCache.has(key)) {
    while (passiveVerdictCache.size >= MAX_PASSIVE_VERDICT_ENTRIES) {
      const oldest = passiveVerdictCache.keys().next();
      if (oldest.done) break;
      passiveVerdictCache.delete(oldest.value);
    }
  }
  passiveVerdictCache.set(key, { verdict, providers, at: now });
}

/** Test-only: clear the aggregate cache. */
export function __resetPassiveVerdictCacheForTesting(): void {
  passiveVerdictCache.clear();
}
