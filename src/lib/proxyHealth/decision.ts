/**
 * Pure, network-free decision for the proxy health scheduler (#6246).
 *
 * Separated from the sweep so the status/removal policy can be unit-tested
 * exhaustively without any I/O. The sweep classifies each probe into a tri-state
 * {@link ProxyProbeOutcome} and applies the returned {@link ProxyHealthDecision}.
 *
 * Policy (agreed for #6246):
 *   A — downgrade only after `removeAfter` CONSECUTIVE conclusive failures.
 *   B — an `inconclusive` probe (our own timeout/abort, or the probe TARGET
 *       erroring) never penalizes: it neither counts nor changes status.
 *   C — by DEFAULT (auto-remove off) the health check NEVER mutates a proxy's
 *       status. It only counts failures for logging. A proxy is downgraded to
 *       `inactive` (and removed) only when the operator opts in via
 *       PROXY_AUTO_REMOVE=true. This mirrors how accounts are only auto-disabled
 *       when the operator allows it — the operator owns their (often paid) proxies.
 */

export type ProxyProbeOutcome = "ok" | "fail" | "inconclusive";

export interface ProxyHealthDecisionInput {
  /** Tri-state result of the reachability probe for this proxy. */
  outcome: ProxyProbeOutcome;
  /** Consecutive failure count recorded BEFORE this probe. */
  priorFailures: number;
  /** PROXY_AUTO_REMOVE === "true" — operator opted into status management. */
  autoRemove: boolean;
  /** Consecutive conclusive failures required before a downgrade/removal. */
  removeAfter: number;
}

export interface ProxyHealthDecision {
  /** New consecutive-failure count to persist for this proxy. */
  failures: number;
  /** Whether to drop this proxy from the consecutive-failure map. */
  clearFailures: boolean;
  /** Status to write, or `null` to leave the operator-controlled status untouched. */
  setStatus: "active" | "inactive" | null;
  /** Whether to auto-remove the proxy (only ever true when autoRemove is on). */
  remove: boolean;
}

export function decideProxyHealthAction(input: ProxyHealthDecisionInput): ProxyHealthDecision {
  const { outcome, priorFailures, autoRemove, removeAfter } = input;
  const threshold = Number.isFinite(removeAfter) && removeAfter > 0 ? removeAfter : 3;

  // B: inconclusive probes are neutral — do not touch count or status.
  if (outcome === "inconclusive") {
    return { failures: priorFailures, clearFailures: false, setStatus: null, remove: false };
  }

  // Success: reset the streak. Only (re)assert "active" when the operator has
  // opted into status management; otherwise never touch the user's status (C).
  if (outcome === "ok") {
    return {
      failures: 0,
      clearFailures: true,
      setStatus: autoRemove ? "active" : null,
      remove: false,
    };
  }

  // Conclusive failure.
  const failures = priorFailures + 1;

  // C: default mode only counts/logs — never downgrades.
  if (!autoRemove) {
    return { failures, clearFailures: false, setStatus: null, remove: false };
  }

  // A: downgrade + remove only once the consecutive threshold is reached.
  if (failures >= threshold) {
    return { failures, clearFailures: false, setStatus: "inactive", remove: true };
  }

  return { failures, clearFailures: false, setStatus: null, remove: false };
}
