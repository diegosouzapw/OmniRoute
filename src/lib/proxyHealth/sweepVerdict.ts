import type { ProbeCause, ProxyProbeOutcome } from "./decision.ts";
import { classifyRefusalCause } from "./decision.ts";

/**
 * Last sweep verdict per proxy (in-process, volatile).
 *
 * Written ONLY by the periodic sweep in `scheduler.ts`; read by the health
 * routes. Lost on restart — the UI shows "since startup" when no entry exists.
 * The cause is a sidecar subordinate to the verdict: `decideProxyHealthAction`
 * never branches on it. A 451 reaches the UI as `ok`/`unclassified` by
 * construction (`classifyProbeStatus` maps status < 500 to `ok`, and the sweep
 * only classifies a cause for `blocked`), so `target_refused` stays out of
 * contract here and `decision.ts` is untouched.
 */
export interface SweepVerdict {
  verdict: ProxyProbeOutcome;
  cause: ProbeCause;
  /** Target HTTP status when it answered; null on connection-level errors. */
  status: number | null;
  /** ms epoch of the sweep observation; relative age is computed at read time. */
  at: number;
}

declare global {
  var __proxyHealthSweepVerdicts: Map<string, SweepVerdict> | undefined;
}

function getVerdictMap(): Map<string, SweepVerdict> {
  if (!globalThis.__proxyHealthSweepVerdicts) {
    globalThis.__proxyHealthSweepVerdicts = new Map();
  }
  return globalThis.__proxyHealthSweepVerdicts;
}

const MAX_VERDICTS = 5000;

/**
 * PURE: build the display verdict for one sweep probe. The cause gate lives
 * here (testable) instead of inline in `sweep()`: only a `blocked` probe with
 * an observed status classifies a cause; everything else is `unclassified`.
 */
export function toSweepVerdict(
  outcome: ProxyProbeOutcome,
  status: number | null,
  at: number
): SweepVerdict {
  return {
    verdict: outcome,
    cause: outcome === "blocked" && status != null ? classifyRefusalCause(status) : "unclassified",
    status,
    at,
  };
}

export function recordSweepVerdict(id: string, verdict: SweepVerdict): void {
  if (!id) return;
  const verdicts = getVerdictMap();
  if (verdicts.size >= MAX_VERDICTS && !verdicts.has(id)) {
    const oldest = verdicts.keys().next();
    if (!oldest.done) verdicts.delete(oldest.value);
  }
  verdicts.delete(id);
  verdicts.set(id, verdict);
}

export function getSweepVerdict(id: string): SweepVerdict | undefined {
  return getVerdictMap().get(id);
}

export function getSweepVerdicts(ids: string[]): Record<string, SweepVerdict> {
  const verdicts = getVerdictMap();
  return Object.fromEntries(
    ids.flatMap((id) => {
      const verdict = verdicts.get(id);
      return verdict ? [[id, verdict]] : [];
    })
  );
}

export function deleteSweepVerdict(id: string): void {
  getVerdictMap().delete(id);
}

/** Tests only: isolate suites sharing the process memory. */
export function clearSweepVerdicts(): void {
  getVerdictMap().clear();
}
