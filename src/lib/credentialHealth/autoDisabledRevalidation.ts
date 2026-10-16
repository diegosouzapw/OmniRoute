/**
 * Periodic retest of connections the gateway switched off by itself (#16190).
 *
 * Several automated paths write `isActive:false` (the OAuth refresh retry budget,
 * the permanent-ban auto-disable, the stream expiry handler, ...), and the
 * credential-health sweep only loads active connections, so such a connection
 * stayed out of rotation forever even after its credential recovered.
 *
 * Each sweep calls runAutoDisabledRevalidation(), which retests a few of them
 * with the regular connection test. A passing test switches the connection back
 * on (testSingleConnection already does that for a valid result); an
 * unverifiable (skipped) test does not.
 *
 * Only rows carrying AUTO_DISABLED_AT_KEY are eligible. Never retested:
 *   - operator-disabled connections (operatorDisabledAt, #14941);
 *   - inactive rows with no marker at all: they may predate the operator marker,
 *     so they cannot be told apart from an operator choice;
 *   - connections that were never activated (no automatic switch-off happened);
 *   - terminal or blocklisted states (banned, deactivated, invalid_grant, ...)
 *     or an OAuth refresh circuit still open, with the same rule the
 *     pinned-connection probe uses (isRecoverableInactiveConnection);
 *   - a connection whose last error was recorded only as a ban (lastErrorType
 *     forbidden, testStatus not banned), as a defensive check: the permanent-ban
 *     auto-disable records the 401/403 deactivation responses it fires on as
 *     account_deactivated, which the blocklist above already refuses;
 *   - a cooldown still in force (rateLimitedUntil in the future), whatever the
 *     testStatus;
 *   - search providers, whose "validation" is a billed query (#9970),
 *     connections opted out with healthCheckInterval <= 0, and connections that
 *     are neither apikey nor oauth (bulk-imported web sessions, Codex
 *     access-token imports), the sweep's own scope (#9180).
 *
 * Rate limits: a connection is retested at most once per
 * AUTO_DISABLED_REVALIDATION_INTERVAL_MS, counted from the latest of its
 * automatic switch-off, its last test and its last retest attempt, and at most
 * MAX_REVALIDATIONS_PER_SWEEP connections are retested per sweep, oldest first.
 * The attempt log lives in memory, so after a restart an unverifiable
 * connection is tried once more on the first sweep (an unsupported validation
 * makes no upstream call). OMNIROUTE_DISABLE_AUTO_DISABLED_REVALIDATION turns
 * the pass off.
 */

import { AUTO_DISABLED_AT_KEY, isAutoDisabled } from "@/lib/providers/operatorDisable";
import { SEARCH_VALIDATOR_CONFIGS } from "@/lib/providers/validation/searchProviders";
import { isInRefreshBackoff } from "@/lib/tokenRefreshCircuit";
import { isRecoverableInactiveConnection } from "@/sse/services/explicitInactiveProbe";

export const AUTO_DISABLED_REVALIDATION_INTERVAL_MS = 6 * 60 * 60 * 1000;
export const MAX_REVALIDATIONS_PER_SWEEP = 5;
const MAX_TRACKED_ATTEMPTS = 4096;
const LOG_PREFIX = "[CredentialHealth]";
const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);
const BAN_ERROR_TYPE = "forbidden";

export interface RevalidationCandidate {
  id: string;
  provider?: string | null;
  authType?: string | null;
  isActive?: boolean;
  testStatus?: string | null;
  lastErrorType?: string | null;
  rateLimitedUntil?: string | null;
  lastTested?: string | null;
  healthCheckInterval?: number | null;
  providerSpecificData?: unknown;
}

export interface AutoDisabledRevalidationResult {
  scanned: number;
  tested: number;
  /** Connections switched back on in this pass. */
  reactivated: RevalidationCandidate[];
}

type ConnectionTestOutcome = { valid?: boolean; skipped?: boolean };

// Last retest attempt per connection. A skipped test writes no lastTested, so
// without this an unverifiable connection would be retried on every sweep.
const lastAttemptAtMs = new Map<string, number>();

function noteAttempt(connectionId: string, nowMs: number): void {
  lastAttemptAtMs.delete(connectionId);
  lastAttemptAtMs.set(connectionId, nowMs);
  if (lastAttemptAtMs.size > MAX_TRACKED_ATTEMPTS) {
    const oldest = lastAttemptAtMs.keys().next().value;
    if (oldest !== undefined) lastAttemptAtMs.delete(oldest);
  }
}

function instantMs(value: unknown): number {
  const ms = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isFinite(ms) ? ms : 0;
}

function lastTouchMs(connection: RevalidationCandidate): number {
  const psd = (connection.providerSpecificData ?? {}) as Record<string, unknown>;
  return Math.max(
    instantMs(psd[AUTO_DISABLED_AT_KEY]),
    instantMs(connection.lastTested),
    lastAttemptAtMs.get(connection.id) ?? 0
  );
}

export function isAutoDisabledRevalidationDisabled(): boolean {
  const value = process.env.OMNIROUTE_DISABLE_AUTO_DISABLED_REVALIDATION;
  return !!value && TRUE_ENV_VALUES.has(value.trim().toLowerCase());
}

/** A gateway-disabled API key or OAuth connection whose health check is not turned off. */
function isRetestableConnection(
  connection: RevalidationCandidate | null | undefined
): connection is RevalidationCandidate {
  if (!connection || typeof connection.id !== "string" || connection.id.length === 0) return false;
  if (!isAutoDisabled(connection)) return false;
  if (connection.authType !== "apikey" && connection.authType !== "oauth") return false;
  if (String(connection.provider ?? "") in SEARCH_VALIDATOR_CONFIGS) return false;
  return !(
    typeof connection.healthCheckInterval === "number" && connection.healthCheckInterval <= 0
  );
}

/** True while the last error, a rate limit or a refresh backoff still rules out a retest. */
function isRetestHeldBack(connection: RevalidationCandidate, nowMs: number): boolean {
  // Named fields, not a spread: the row may be a lazy view that decrypts its
  // credentials on enumeration.
  const recoverable = isRecoverableInactiveConnection(
    {
      isActive: false,
      testStatus: connection.testStatus,
      lastErrorType: connection.lastErrorType,
      rateLimitedUntil: connection.rateLimitedUntil,
    },
    nowMs
  );
  if (!recoverable) return true;
  const lastErrorType = String(connection.lastErrorType ?? "")
    .trim()
    .toLowerCase();
  if (lastErrorType === BAN_ERROR_TYPE) return true;
  if (instantMs(connection.rateLimitedUntil) > nowMs) return true;
  return isInRefreshBackoff(connection, nowMs);
}

/** True when the connection is a gateway-disabled one whose retest is due. */
export function isAutoDisabledRevalidationDue(
  connection: RevalidationCandidate | null | undefined,
  nowMs: number
): boolean {
  if (!isRetestableConnection(connection)) return false;
  if (isRetestHeldBack(connection, nowMs)) return false;
  return nowMs - lastTouchMs(connection) >= AUTO_DISABLED_REVALIDATION_INTERVAL_MS;
}

/** Due gateway-disabled connections, oldest first, capped per sweep. Pure apart from the attempt log. */
export function selectAutoDisabledRevalidations<T extends RevalidationCandidate>(
  connections: readonly T[] | null | undefined,
  nowMs: number,
  limit: number = MAX_REVALIDATIONS_PER_SWEEP
): T[] {
  if (!Array.isArray(connections)) return [];
  return connections
    .filter((connection) => isAutoDisabledRevalidationDue(connection, nowMs))
    .sort((a, b) => lastTouchMs(a) - lastTouchMs(b))
    .slice(0, Math.max(0, limit));
}

/**
 * Retest the due gateway-disabled connections once. Never throws: a failure to
 * load or to test one connection is logged and the sweep goes on.
 */
export async function runAutoDisabledRevalidation(
  deps: {
    nowMs?: number;
    /** The sweep's global cadence; 0 means the operator turned the sweep off. */
    sweepIntervalMs?: number;
    loadInactiveConnections?: () => Promise<RevalidationCandidate[]>;
    testConnection?: (connectionId: string) => Promise<ConnectionTestOutcome>;
    isActiveNow?: (connectionId: string) => Promise<boolean>;
    logger?: { info?: (msg: string) => void; warn?: (msg: string) => void };
  } = {}
): Promise<AutoDisabledRevalidationResult> {
  const result: AutoDisabledRevalidationResult = { scanned: 0, tested: 0, reactivated: [] };
  if (isAutoDisabledRevalidationDisabled()) return result;
  if (deps.sweepIntervalMs !== undefined && !(deps.sweepIntervalMs > 0)) return result;

  const nowMs = deps.nowMs ?? Date.now();
  const logger = deps.logger ?? {
    info: (msg: string) => console.log(msg),
    warn: (msg: string) => console.warn(msg),
  };

  let connections: RevalidationCandidate[];
  try {
    const load =
      deps.loadInactiveConnections ??
      (async () => {
        const { getProviderConnections } = await import("@/lib/db/providers");
        const rows = await getProviderConnections({ isActive: false });
        return (Array.isArray(rows) ? rows : []) as unknown as RevalidationCandidate[];
      });
    connections = await load();
  } catch (err) {
    logger.warn?.(
      `${LOG_PREFIX} failed to load inactive connections for revalidation: ${err instanceof Error ? err.message : String(err)}`
    );
    return result;
  }

  result.scanned = connections.length;
  const due = selectAutoDisabledRevalidations(connections, nowMs);
  if (due.length === 0) return result;

  const test =
    deps.testConnection ??
    (async (connectionId: string) => {
      const { testSingleConnection } = await import("@/app/api/providers/[id]/test/route");
      return testSingleConnection(connectionId, undefined, { activateUnverified: false });
    });
  const isActiveNow =
    deps.isActiveNow ??
    (async (connectionId: string) => {
      const { getProviderConnectionById } = await import("@/lib/db/providers");
      const row = (await getProviderConnectionById(connectionId)) as { isActive?: unknown } | null;
      return row?.isActive === true;
    });

  logger.info?.(
    `${LOG_PREFIX} Retesting ${due.length} connection(s) the gateway switched off by itself`
  );

  await Promise.allSettled(
    due.map(async (connection) => {
      const label = `${connection.provider ?? "unknown"}/${connection.id}`;
      noteAttempt(connection.id, nowMs);
      try {
        const outcome = await test(connection.id);
        result.tested += 1;
        if (await isActiveNow(connection.id)) {
          result.reactivated.push(connection);
          logger.info?.(`${LOG_PREFIX} ♻️ ${label} retest passed; switched back on`);
          return;
        }
        const verdict = outcome?.skipped ? "unverifiable" : outcome?.valid ? "passed" : "failed";
        logger.info?.(
          `${LOG_PREFIX} ${label} retest ${verdict}; stays off, next retest in ${AUTO_DISABLED_REVALIDATION_INTERVAL_MS / 3_600_000}h`
        );
      } catch (err) {
        logger.warn?.(
          `${LOG_PREFIX} ${label} retest error (non-fatal): ${err instanceof Error ? err.message : String(err)}`
        );
      }
    })
  );

  return result;
}
