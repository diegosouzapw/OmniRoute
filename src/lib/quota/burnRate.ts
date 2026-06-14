/**
 * burnRate.ts — Burn-rate EMA estimator for quota consumption.
 *
 * Computes an exponential moving average (alpha=0.3) over a series of
 * (timestamp, consumed) samples and projects time to exhaustion.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

const EMA_ALPHA = 0.3;

export interface BurnRateSample {
  ts: number; // epoch ms
  consumed: number; // cumulative consumed value at this ts
}

export interface BurnRateResult {
  /** Estimated tokens (or units) consumed per second. */
  tokensPerSecond: number;
  /**
   * Estimated milliseconds until the remaining quota is exhausted.
   * null if rate is 0 or the caller did not provide a remaining value.
   */
  timeToExhaustionMs: number | null;
}

/**
 * Compute burn rate from a single snapshot using the sliding window context.
 *
 * When only one sample is available (the common case for on-demand pool usage
 * queries), we derive the rate from the consumption within the current window:
 *   rate = consumedTotal / elapsedInWindow
 *
 * This assumes consumption is roughly uniform within the window — a reasonable
 * approximation for token/request budgets over hourly/daily/weekly periods.
 *
 * @param consumedTotal  Cumulative consumption in the current sliding window.
 * @param windowMs       The window duration in milliseconds (e.g. 5h = 18_000_000).
 * @param remaining      Optional remaining quota (same unit as consumedTotal).
 */
export function computeBurnRateFromWindow(
  consumedTotal: number,
  windowMs: number,
  remaining?: number
): BurnRateResult {
  if (consumedTotal <= 0 || windowMs <= 0) {
    return { tokensPerSecond: 0, timeToExhaustionMs: null };
  }

  const nowMs = Date.now();
  const currentBucketIndex = Math.floor(nowMs / windowMs);
  const windowStartMs = currentBucketIndex * windowMs;
  const elapsedMs = Math.max(1, nowMs - windowStartMs); // avoid division by zero

  const safeRate = consumedTotal / (elapsedMs / 1000); // per second
  const timeToExhaustionMs =
    safeRate > 0 && remaining !== undefined && remaining >= 0
      ? (remaining / safeRate) * 1000
      : null;

  return { tokensPerSecond: safeRate, timeToExhaustionMs };
}

/**
 * Compute the current burn rate from a series of samples.
 *
 * @param history   Array of { ts, consumed } ordered oldest → newest.
 *                  Needs at least 2 entries; fewer returns zeros.
 * @param remaining Optional remaining quota (same unit as consumed).
 *                  When provided, `timeToExhaustionMs` is calculated.
 */
export function computeBurnRate(
  history: BurnRateSample[],
  remaining?: number
): BurnRateResult {
  if (history.length < 2) {
    return { tokensPerSecond: 0, timeToExhaustionMs: null };
  }

  // Build EMA over consecutive deltas.
  let emaRate = 0;
  let initialized = false;

  for (let i = 1; i < history.length; i++) {
    const deltaConsumed = history[i].consumed - history[i - 1].consumed;
    const deltaTs = history[i].ts - history[i - 1].ts; // ms

    if (deltaTs <= 0) continue; // skip duplicate or out-of-order timestamps

    const instantRate = deltaConsumed / (deltaTs / 1000); // per second

    if (!initialized) {
      emaRate = instantRate;
      initialized = true;
    } else {
      emaRate = EMA_ALPHA * instantRate + (1 - EMA_ALPHA) * emaRate;
    }
  }

  if (!initialized) {
    return { tokensPerSecond: 0, timeToExhaustionMs: null };
  }

  const safeRate = Math.max(0, emaRate);
  const timeToExhaustionMs =
    safeRate > 0 && remaining !== undefined && remaining >= 0
      ? (remaining / safeRate) * 1000
      : null;

  return { tokensPerSecond: safeRate, timeToExhaustionMs };
}
