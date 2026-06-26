/**
 * Pure headroom ranking for combo / pool connection selection.
 *
 * Technique borrowed from the `dario` project: when choosing among the
 * connections of a pool/combo, prefer the one with the MOST free capacity
 * (highest headroom) instead of reactively filling one connection until it
 * 429s. This spreads load across accounts proactively.
 *
 *   headroom = 1 − max(util_5h, util_7d)
 *
 * where util_5h / util_7d are the 0..1 saturation signals from
 * `src/lib/quota/saturationSignals.ts::getSaturation` for the 5h plan window
 * and the weekly (7-day) plan window respectively. The binding (worst)
 * dimension drives the score, so a connection that is fine on 5h but nearly
 * exhausted on the weekly window is correctly deprioritized.
 *
 * This module is a PURE leaf: saturation is INJECTED by the caller (a Map),
 * never fetched here — no DB, no network — so the ranking is fully
 * deterministic and unit-testable. The stateful/async orderer that gathers the
 * saturation signals lives in ./quotaStrategies.ts and feeds these helpers.
 *
 * Fail-open: any missing / non-finite utilization is treated as 0 (full
 * headroom), so an unknown saturation signal never penalizes a connection —
 * matching getSaturation's own fail-open contract.
 *
 * No barrel import — pure leaf (consistent with the other combo/* helpers).
 *
 * Part of: Group B — Quota Sharing Engine (headroom-aware connection selection).
 */

/**
 * The two plan-window utilization signals (0..1) for one connection.
 * Either may be absent / non-finite; both are clamped + defaulted to 0.
 */
export interface HeadroomSaturation {
  /** 5h plan-window utilization (0..1). */
  util5h?: number;
  /** weekly (7-day) plan-window utilization (0..1). */
  util7d?: number;
}

/** Clamp an arbitrary number into [0,1]; non-finite → 0 (generous default). */
function clampUtil(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * headroom = 1 − max(util_5h, util_7d), clamped to [0,1].
 * Higher = more free capacity. Pure.
 */
export function computeHeadroom(sat: HeadroomSaturation | undefined): number {
  const u5 = clampUtil(sat?.util5h);
  const u7 = clampUtil(sat?.util7d);
  return 1 - Math.max(u5, u7);
}

/**
 * Order `candidates` by descending headroom (most free capacity first).
 *
 * @param candidates  the connections / targets to rank (NOT mutated).
 * @param satByKey    saturation signal per candidate, keyed by `keyOf`.
 *                    A missing entry → full headroom (fail-open, ranks first).
 * @param keyOf       extracts the stable string key used to look up `satByKey`.
 * @returns a NEW array; ties preserve the original input order (stable sort).
 */
export function rankByHeadroom<T>(
  candidates: T[],
  satByKey: Map<string, HeadroomSaturation>,
  keyOf: (candidate: T) => string
): T[] {
  if (candidates.length <= 1) return candidates;

  // Decorate with original index so equal-headroom candidates keep input order
  // (Array.prototype.sort is not guaranteed stable across all engines for the
  // comparator we need; the explicit index tie-break makes it deterministic).
  const decorated = candidates.map((candidate, index) => ({
    candidate,
    index,
    headroom: computeHeadroom(satByKey.get(keyOf(candidate))),
  }));

  decorated.sort((a, b) => {
    if (b.headroom !== a.headroom) return b.headroom - a.headroom;
    return a.index - b.index;
  });

  return decorated.map((entry) => entry.candidate);
}
