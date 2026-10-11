/**
 * Typed provider availability (OmniRoute deep review, 2026-09-29, Section 2).
 *
 * A pure CLASSIFIER that maps a provider connection's stored fields to an explicit,
 * discriminated availability state. It never mutates and never clears a terminal
 * state: an old or unverifiable terminal state resolves to `STALE_TERMINAL`
 * (re-verify with real provider evidence), never silently to `AVAILABLE`. This lets
 * the dashboard and API say exactly what is true — "credential exists, quota
 * exhausted, last confirmed at X, recheckable at Y" — instead of collapsing every
 * unavailable case into "No active credentials".
 *
 * Terminal statuses mirror the routing layer's own set (`credits_exhausted`,
 * `banned`, `expired`; see `src/sse/services/auth.ts::isTerminalConnectionStatus`
 * and `src/lib/quota/connectionRecovery.ts::TERMINAL_CONNECTION_STATUSES`).
 */

/** Stored test statuses that mean "do not auto-recover on a timer". */
const TERMINAL_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/** Terminal states confirmed longer ago than this are reported `STALE_TERMINAL`. */
const DEFAULT_STALENESS_MS = 24 * 60 * 60 * 1000;

export type ProviderAvailability =
  | { state: "AVAILABLE" }
  | { state: "NO_CREDENTIAL" }
  | { state: "AUTH_EXPIRED"; action: "REAUTHENTICATE" }
  | { state: "QUOTA_EXHAUSTED"; nextEligibleRecheckAt?: string }
  | { state: "DISABLED" }
  | { state: "STALE_TERMINAL"; previousState: string }
  | { state: "UNHEALTHY"; retryable: boolean };

export interface ProviderConnectionAvailabilityInput {
  /** Whether a credential/connection record exists at all. Defaults to `true`. */
  hasCredential?: boolean;
  /** Whether the operator has the connection enabled. */
  isActive?: boolean;
  /** Stored test status, e.g. "active", "expired", "credits_exhausted", "banned". */
  testStatus?: string | null;
  /** Classified type of the last failure, if any (e.g. "server_error"). */
  lastErrorType?: string | null;
  /** When the connection becomes eligible again (ISO-8601 or epoch-ms text). */
  rateLimitedUntil?: string | null;
  /** When the current state was last confirmed by real evidence (ISO-8601 or epoch-ms text). */
  lastErrorAt?: string | null;
  /** Override the staleness window for terminal states. Defaults to 24h. */
  stalenessThresholdMs?: number;
}

function normalize(value: string | null | undefined): string {
  return (value || "").trim().toLowerCase();
}

/** Parse an ISO-8601 string or an epoch-ms numeric string to epoch ms, else null. */
function toEpochMs(value: string | null | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  const asNumber = Number(trimmed);
  if (Number.isFinite(asNumber) && String(asNumber) === trimmed) return asNumber;
  const parsed = Date.parse(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolveProviderAvailability(
  input: ProviderConnectionAvailabilityInput,
  now: number = Date.now()
): ProviderAvailability {
  const hasCredential = input.hasCredential ?? true;
  if (!hasCredential) return { state: "NO_CREDENTIAL" };
  if (input.isActive === false) return { state: "DISABLED" };

  const status = normalize(input.testStatus);
  const thresholdMs = input.stalenessThresholdMs ?? DEFAULT_STALENESS_MS;

  if (TERMINAL_STATUSES.has(status)) {
    // A terminal state is only trusted as current when it was confirmed recently.
    // An old or unverifiable terminal is STALE_TERMINAL — re-verify with provider
    // evidence. It is NEVER silently cleared to AVAILABLE here just because time passed.
    const confirmedAt = toEpochMs(input.lastErrorAt);
    const isFresh = confirmedAt !== null && now - confirmedAt <= thresholdMs;
    if (!isFresh) return { state: "STALE_TERMINAL", previousState: status };

    if (status === "expired") return { state: "AUTH_EXPIRED", action: "REAUTHENTICATE" };
    if (status === "credits_exhausted") {
      const recheck = toEpochMs(input.rateLimitedUntil);
      return recheck !== null
        ? { state: "QUOTA_EXHAUSTED", nextEligibleRecheckAt: new Date(recheck).toISOString() }
        : { state: "QUOTA_EXHAUSTED" };
    }
    // "banned": operator/provider disabled it; unavailable and not self-recovering.
    return { state: "DISABLED" };
  }

  // Non-terminal: a future cooldown or a recorded error is a retryable unhealthy state.
  const cooldownUntil = toEpochMs(input.rateLimitedUntil);
  const coolingDown = cooldownUntil !== null && cooldownUntil > now;
  if (coolingDown || normalize(input.lastErrorType)) {
    return { state: "UNHEALTHY", retryable: true };
  }

  return { state: "AVAILABLE" };
}

/**
 * Human-readable one-line label for a `ProviderAvailability`, for the dashboard.
 * Total over the union (the compiler enforces exhaustiveness), so a new state can
 * never silently fall through to a blank badge.
 */
export function describeProviderAvailability(a: ProviderAvailability): string {
  switch (a.state) {
    case "AVAILABLE":
      return "Available";
    case "NO_CREDENTIAL":
      return "No credential";
    case "AUTH_EXPIRED":
      return "Reauthentication required";
    case "QUOTA_EXHAUSTED":
      return a.nextEligibleRecheckAt
        ? `Quota exhausted · rechecks ${a.nextEligibleRecheckAt}`
        : "Quota exhausted";
    case "DISABLED":
      return "Disabled";
    case "STALE_TERMINAL":
      return `Stale lock (was ${a.previousState}) — re-verify`;
    case "UNHEALTHY":
      return a.retryable ? "Unhealthy (retryable)" : "Unhealthy";
  }
}
