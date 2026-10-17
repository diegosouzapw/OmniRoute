/** Rolling per-window quota burn estimates, derived from quota telemetry only. */

export type QuotaBurnWindow = {
  remainingPercentage?: number;
  resetAt?: string | null;
  fractionReported?: boolean;
};

export type QuotaBurnObservation = {
  remainingPercentage: number;
  resetAt: string;
  observedAt: number;
};

export type QuotaBurnRate = {
  fractionPerHour: number;
  resetAt: string;
  observedAt: number;
};

export type QuotaBurnMetrics = {
  observations: Record<string, QuotaBurnObservation>;
  rates: Record<string, QuotaBurnRate>;
};

const MIN_SAMPLE_AGE_MS = 60_000;
const MIN_REMAINING_DROP_PERCENT = 0.25;
const MAX_BURN_FRACTION_PER_HOUR = 100;

function parseReset(value: string | null | undefined): number | null {
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function sameReset(a: string | null | undefined, b: string | null | undefined): boolean {
  const aMs = parseReset(a);
  const bMs = parseReset(b);
  return aMs !== null && bMs !== null && Math.abs(aMs - bMs) <= 60_000;
}

/**
 * Update the observed burn rate for each quota window without database reads.
 * A reset change or quota increase starts a new baseline; tiny changes are
 * accumulated until they become measurable instead of being discarded.
 */
export function updateQuotaBurnMetrics(
  previousQuotas: Record<string, QuotaBurnWindow> | null | undefined,
  previousFetchedAt: number | null | undefined,
  previousMetrics: QuotaBurnMetrics | null | undefined,
  currentQuotas: Record<string, QuotaBurnWindow>,
  nowMs: number
): QuotaBurnMetrics {
  const observations: QuotaBurnMetrics["observations"] = {};
  const rates: QuotaBurnMetrics["rates"] = {};

  for (const [key, current] of Object.entries(currentQuotas)) {
    const remaining = current.remainingPercentage;
    const resetAt = current.resetAt;
    if (
      current.fractionReported === false ||
      typeof remaining !== "number" ||
      !Number.isFinite(remaining) ||
      parseReset(resetAt) === null
    ) {
      continue;
    }

    const priorMetric = previousMetrics?.observations[key];
    const previousWindow = previousQuotas?.[key];
    const baseline: QuotaBurnObservation | null = priorMetric
      ? priorMetric
      : previousWindow &&
          previousWindow.fractionReported !== false &&
          typeof previousWindow.remainingPercentage === "number" &&
          previousFetchedAt &&
          sameReset(previousWindow.resetAt, resetAt)
        ? {
            remainingPercentage: previousWindow.remainingPercentage,
            resetAt: resetAt!,
            observedAt: previousFetchedAt,
          }
        : null;

    if (!baseline || !sameReset(baseline.resetAt, resetAt)) {
      observations[key] = { remainingPercentage: remaining, resetAt: resetAt!, observedAt: nowMs };
      continue;
    }

    const priorRate = previousMetrics?.rates[key];
    if (remaining > baseline.remainingPercentage + MIN_REMAINING_DROP_PERCENT) {
      // A same-window quota increase is a correction/refill, not negative burn.
      observations[key] = { remainingPercentage: remaining, resetAt: resetAt!, observedAt: nowMs };
      continue;
    }

    const elapsedMs = nowMs - baseline.observedAt;
    const drop = baseline.remainingPercentage - remaining;
    if (elapsedMs >= MIN_SAMPLE_AGE_MS && drop >= MIN_REMAINING_DROP_PERCENT) {
      const sampleRate = Math.min(MAX_BURN_FRACTION_PER_HOUR, drop / 100 / (elapsedMs / 3_600_000));
      const priorRateMatchesReset = priorRate && sameReset(priorRate.resetAt, resetAt);
      rates[key] = {
        fractionPerHour: priorRateMatchesReset
          ? priorRate.fractionPerHour * 0.5 + sampleRate * 0.5
          : sampleRate,
        resetAt: resetAt!,
        observedAt: nowMs,
      };
      observations[key] = { remainingPercentage: remaining, resetAt: resetAt!, observedAt: nowMs };
      continue;
    }

    observations[key] = baseline;
    if (priorRate && sameReset(priorRate.resetAt, resetAt)) rates[key] = priorRate;
  }

  return { observations, rates };
}

export function filterQuotaBurnMetrics<T extends QuotaBurnMetrics>(
  metrics: T | null | undefined,
  windowNames: readonly string[]
): T | null {
  if (!metrics) return null;
  const allowed = new Set(windowNames.map((name) => name.toLowerCase()));
  const observations = Object.fromEntries(
    Object.entries(metrics.observations).filter(([key]) => allowed.has(key.toLowerCase()))
  );
  const rates = Object.fromEntries(
    Object.entries(metrics.rates).filter(([key]) => allowed.has(key.toLowerCase()))
  );
  return { ...metrics, observations, rates };
}
