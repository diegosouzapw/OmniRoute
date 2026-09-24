/**
 * Pure, network-free decision for the proxy health scheduler (#6246).
 *
 * Separated from the sweep so the status/removal policy can be unit-tested
 * exhaustively without any I/O. The sweep classifies each probe into a
 * {@link ProxyProbeOutcome} and applies the returned {@link ProxyHealthDecision}.
 *
 * Policy (agreed for #6246, extended for the auto-disable mode below):
 *   A — downgrade only after `removeAfter` CONSECUTIVE conclusive failures.
 *   B — an `inconclusive` probe (our own timeout/abort, or the probe TARGET
 *       erroring) never penalizes: it neither counts nor changes status.
 *   C — by DEFAULT (both auto-remove and auto-disable off) the health check
 *       NEVER mutates a proxy's status. It only counts failures for logging.
 *       A proxy's status is only touched once the operator opts in via
 *       PROXY_AUTO_REMOVE=true or PROXY_AUTO_DISABLE=true. This mirrors how
 *       accounts are only auto-disabled when the operator allows it — the
 *       operator owns their (often paid) proxies.
 *   D — PROXY_AUTO_DISABLE=true is the non-destructive sibling of
 *       PROXY_AUTO_REMOVE: at the same consecutive-failure threshold it writes
 *       `status: "dead"` instead of deleting the row. `"dead"` is already one
 *       of the statuses PROXY_ALIVE_PREDICATE excludes (src/lib/db/proxies/guards.ts),
 *       so a disabled proxy drops out of pool/rotation resolution immediately
 *       with no other code changes. Because the sweep keeps probing every
 *       registered proxy regardless of status, a "dead" proxy that starts
 *       answering again is picked back up by the same `outcome === "ok"`
 *       branch that already re-activates proxies for auto-remove — recovery
 *       is free once autoDisable participates in `managesStatus` below. If
 *       both flags are set, auto-remove (destructive) wins: a proxy that is
 *       about to be deleted has no use for a soft-disable in between.
 *   E — a `blocked` probe (the TARGET refused this egress IP: 401/403/429) is
 *       neutral like `inconclusive` by default (#10654). The proxy relayed
 *       correctly, so it is not failing; but it is not serving that destination
 *       either, which `ok` hid. Kept out of the failure count on purpose: one
 *       target refusing an IP does not make the proxy dead, and the operator
 *       owns the removal policy.
 *       Opt-in (`blockedResetsStreak`, the PROXY_HEALTH_BLOCKED_RESETS_STREAK
 *       feature flag): a refusal additionally RESETS the consecutive-failure
 *       streak, since the proxy demonstrably relayed. It still never counts,
 *       never sets a status and never removes. This covers 401/403/429 only: a
 *       relayed 5xx stays `inconclusive` (policy B) and keeps the streak.
 */

export type ProxyProbeOutcome = "ok" | "fail" | "hang" | "inconclusive" | "blocked";

/**
 * Sidecar cause for a refused relay. Carried ALONGSIDE the verdict, never
 * inside it: `decideProxyHealthAction` never branches on a cause, so a cause
 * can neither write a status nor filter traffic. The only proven 403 is one
 * the caller proves via `signals.geoProven`; the sweep never proves (HEAD
 * probe, no body), so sweep 403s always land on `unproven`.
 */
export type ProbeCause = "unclassified" | "target_refused" | "unproven";

export interface RefusalCauseSignals {
  /** The caller proved a geographic motive for this 403. Defaults to false. */
  geoProven?: boolean;
}

/**
 * PURE: classify the cause of a refused relay. 451 is a proven refusal by
 * status alone; 403 needs an explicit proof; 401/429 claim no cause.
 */
export function classifyRefusalCause(status: number, signals: RefusalCauseSignals = {}): ProbeCause {
  if (status === 451) return "target_refused";
  if (status === 403) return signals.geoProven === true ? "target_refused" : "unproven";
  return "unclassified";
}

export interface ProbeErrorSignals {
  /** Our own deadline fired (controller aborted). */
  aborted: boolean;
  /** The proxy host resolved (a hang implies we got past DNS). */
  resolved: boolean;
  /** A TLS handshake completed. */
  tlsNegotiated: boolean;
}

/**
 * PURE: distinguish a stalled handshake from a frank failure. A hang means we
 * reached the host but the handshake never completed before our own deadline;
 * anything aborted without those conditions keeps today's `inconclusive`.
 */
export function classifyProbeError(signals: ProbeErrorSignals): "hang" | "fail" | "inconclusive" {
  if (signals.aborted) {
    return signals.resolved && !signals.tlsNegotiated ? "hang" : "inconclusive";
  }
  return "fail";
}

/** Statuses that mean the TARGET refused this egress IP rather than served it. */
const TARGET_BLOCK_STATUSES: ReadonlySet<number> = new Set([401, 403, 429]);

/**
 * PURE: classify a probe response status into a {@link ProxyProbeOutcome}.
 *
 * `ok` requires the target to have actually served the request. A 401/403/429
 * means the proxy relayed but the destination refused the egress IP — the case
 * a generic "status < 500" test reported as a healthy proxy.
 */
export function classifyProbeStatus(status: number): ProxyProbeOutcome {
  if (TARGET_BLOCK_STATUSES.has(status)) return "blocked";
  // A 5xx means the proxy DID relay — the target is at fault, not the proxy.
  return status < 500 ? "ok" : "inconclusive";
}

export interface ProxyHealthDecisionInput {
  /** Classified result of the reachability probe for this proxy. */
  outcome: ProxyProbeOutcome;
  /** Consecutive failure count recorded BEFORE this probe. */
  priorFailures: number;
  /** PROXY_AUTO_REMOVE === "true" — operator opted into delete-on-death. */
  autoRemove: boolean;
  /**
   * PROXY_AUTO_DISABLE === "true" — operator opted into soft-disable-on-death
   * (status "dead", never deleted). Optional/defaults to `false` so existing
   * callers that predate this flag keep their exact prior behavior.
   */
  autoDisable?: boolean;
  /** Consecutive conclusive failures required before a downgrade/removal. */
  removeAfter: number;
  /**
   * PROXY_HEALTH_BLOCKED_RESETS_STREAK — operator opted into letting a `blocked`
   * probe reset the streak (policy E). Optional/defaults to `false`: `blocked`
   * stays neutral, exactly as before.
   */
  blockedResetsStreak?: boolean;
}

export interface ProxyHealthDecision {
  /** New consecutive-failure count to persist for this proxy. */
  failures: number;
  /** Whether to drop this proxy from the consecutive-failure map. */
  clearFailures: boolean;
  /** Status to write, or `null` to leave the operator-controlled status untouched. */
  setStatus: "active" | "inactive" | "dead" | null;
  /** Whether to auto-remove the proxy (only ever true when autoRemove is on). */
  remove: boolean;
}

export function decideProxyHealthAction(input: ProxyHealthDecisionInput): ProxyHealthDecision {
  const {
    outcome,
    priorFailures,
    autoRemove,
    autoDisable = false,
    removeAfter,
    blockedResetsStreak = false,
  } = input;
  const threshold = Number.isFinite(removeAfter) && removeAfter > 0 ? removeAfter : 3;
  // Either opt-in flag hands status control from the operator to the sweep.
  const managesStatus = autoRemove || autoDisable;

  // B/E: inconclusive and (by default) blocked probes are neutral — no count, no status.
  if (outcome === "inconclusive" || (outcome === "blocked" && !blockedResetsStreak)) {
    return { failures: priorFailures, clearFailures: false, setStatus: null, remove: false };
  }

  // E (opt-in): a refused relay still proves the proxy relayed, so the streak resets.
  // Status and removal stay untouched: forgetting failures is not declaring the proxy
  // healthy, and one target refusing an IP never removes or disables a proxy.
  if (outcome === "blocked") {
    return { failures: 0, clearFailures: true, setStatus: null, remove: false };
  }

  // Success: reset the streak. Only (re)assert "active" when the operator has
  // opted into status management; otherwise never touch the user's status (C).
  if (outcome === "ok") {
    return {
      failures: 0,
      clearFailures: true,
      setStatus: managesStatus ? "active" : null,
      remove: false,
    };
  }

  // Conclusive failure. `hang` (a stalled handshake) falls through with `fail`:
  // same count, same policy C (no status write by default). The verdicts stay
  // distinct upstream so the sweep can observe hangs separately.
  const failures = priorFailures + 1;

  // C: default mode only counts/logs — never downgrades.
  if (!managesStatus) {
    return { failures, clearFailures: false, setStatus: null, remove: false };
  }

  // A/D: act only once the consecutive threshold is reached. Auto-remove
  // (destructive) takes precedence over auto-disable when both are enabled.
  if (failures >= threshold) {
    if (autoRemove) {
      return { failures, clearFailures: false, setStatus: "inactive", remove: true };
    }
    return { failures, clearFailures: false, setStatus: "dead", remove: false };
  }

  return { failures, clearFailures: false, setStatus: null, remove: false };
}
