export interface CostMeter {
  add(usd: number): void;
  /** True if adding `usd` would cross the cap (caller stops BEFORE the call that exceeds). */
  wouldExceed(usd: number): boolean;
  readonly spent: number;
  readonly exceeded: boolean;
}

/**
 * Pure cost accumulator driving the per-run cost cap (D1 §6: cap reached => stop,
 * report partial, never silent truncation). `cap <= 0` (or NaN) means unbounded.
 */
export function createCostMeter(cap: number): CostMeter {
  const bounded = typeof cap === "number" && cap > 0;
  let spent = 0;
  return {
    add(usd: number) {
      spent += Number.isFinite(usd) && usd > 0 ? usd : 0;
    },
    wouldExceed(usd: number) {
      if (!bounded) return false;
      return spent + (Number.isFinite(usd) && usd > 0 ? usd : 0) > cap;
    },
    get spent() {
      return spent;
    },
    get exceeded() {
      return bounded && spent > cap;
    },
  };
}
