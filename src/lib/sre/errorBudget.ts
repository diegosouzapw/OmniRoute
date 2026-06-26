/**
 * src/lib/sre/errorBudget.ts
 *
 * ErrorBudget — the per-SLO budget tracker for PR-012.
 *
 * This module is the **request-count** flavour of error-budget tracking
 * (as opposed to the time-series SLI flavour in `src/lib/observability/budget.ts`
 * which is a separate subsystem focused on persisted snapshots). The two are
 * complementary: `observability/budget` is what the OTEL/alert pipeline
 * writes; `sre/errorBudget` is what the public `/api/v1/slo` endpoints and
 * dashboards read.
 *
 * Model
 * -----
 *   error_budget = (1 - slo_target) × window
 *
 * Concretely, for a 99.9% SLO over a 30-day window with N requests:
 *   allowed_errors = N × (1 - 0.999)             # 0.1% of requests
 *   remaining      = allowed_errors - error_count
 *   burn_rate      = error_count / allowed_errors  # 1.0 = on budget
 *   exhausted      = error_count >= allowed_errors
 *
 * Sliding-window burn-rate
 * ------------------------
 * The Google SRE Workbook recommends a **multi-window** burn-rate check
 * to suppress false positives from transient spikes:
 *
 *   - 1h fast burn  (page when burn rate > 14.4×)  →  2% of budget in 1h
 *   - 6h slow burn  (ticket when burn rate > 6×)   →  5% of budget in 6h
 *   - 1h warn       (log when burn rate > 1×)      →  any over-budget burn
 *
 * Each "window" is computed from the supplied `slidingSamples` (a list of
 * `{start_ms, end_ms, request_count, error_count}` segments). The window
 * is the trailing `lookbackHours` ending at the supplied `now` clock.
 *
 * This module is pure and side-effect-free (no DB, no OTEL). The
 * Prometheus-facing helper lives in `src/lib/observability/budgetMetrics.ts`;
 * the SLO catalog lives in `src/lib/sre/sloDefinitions.ts`; the public
 * API lives in `src/app/api/v1/slo/`.
 *
 * Default-off
 * -----------
 * The module itself is always available, but the public API routes
 * (`/api/v1/slo/*`) short-circuit when `SLO_TRACKER_ENABLED !== "true"`.
 * That gate lives in the route handlers, NOT here — `errorBudget.ts` is
 * pure math.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/errorBudget.test.ts
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Allowed sliding-window sizes, in hours. 1h + 6h match the Google SRE
 *  Workbook multi-window burn-rate recommendation; 24h is the natural daily
 *  aggregation; 7d and 30d mirror the rolling SLO windows. */
export type SlidingWindow = "1h" | "6h" | "24h" | "7d" | "30d";

/** Hours for each window. Kept in one place so the math stays consistent. */
const WINDOW_HOURS: Record<SlidingWindow, number> = {
  "1h": 1,
  "6h": 6,
  "24h": 24,
  "7d": 24 * 7,
  "30d": 24 * 30,
};

/** Convert a `SlidingWindow` to milliseconds. */
export function windowMs(window: SlidingWindow): number {
  return WINDOW_HOURS[window] * 60 * 60 * 1000;
}

/** Minimum definition required to compute a budget. The catalog in
 *  `sloDefinitions.ts` extends this with display metadata. */
export interface SloMinimum {
  /** Stable unique identifier (e.g. "SLO-001"). */
  readonly slo_id: string;
  /** Human-readable objective label. */
  readonly objective: string;
  /** Target SLI value in `(0, 1]`. e.g. 0.999 for "three nines". */
  readonly target: number;
  /** Compliance window. The SLO is measured over this rolling duration. */
  readonly window: SlidingWindow;
}

/** One segment of a sliding-window sample stream. The caller partitions
 *  total traffic into non-overlapping segments (typically 1-minute buckets)
 *  and supplies them in chronological order. */
export interface SlidingSegment {
  /** Epoch ms when this segment started. */
  readonly start_ms: number;
  /** Epoch ms when this segment ended (= start_ms + segment length). */
  readonly end_ms: number;
  /** Number of requests in this segment. */
  readonly request_count: number;
  /** Number of error responses in this segment. */
  readonly error_count: number;
}

/** Constructor inputs for `ErrorBudget`. The request-count flavour
 *  intentionally keeps "what to count" simple — callers wire up
 *  filtering/scoping before calling. */
export interface ErrorBudgetInputs {
  /** The SLO this budget tracks. */
  readonly slo: SloMinimum;
  /** Window length in days (overrides `slo.window` when provided). */
  readonly windowDays?: number;
  /** Total requests in the window. */
  readonly totalRequests: number;
  /** Total errors in the window. */
  readonly errorCount: number;
  /** Optional sliding-window samples for multi-window burn-rate computation.
   *  Required for `evaluateBurnAlerts()`; not needed for the static fields. */
  readonly slidingSamples?: ReadonlyArray<SlidingSegment>;
  /** Reference clock for windowing the samples (epoch ms). Defaults to
   *  `Date.now()`. Tests inject a deterministic clock. */
  readonly now?: () => number;
}

/** The structured result `ErrorBudget()` returns. */
export interface ErrorBudgetResult {
  /** The SLO id this budget is for (echoes `inputs.slo.slo_id`). */
  readonly slo_id: string;
  /** Window length in days. */
  readonly window_days: number;
  /** Window length in milliseconds. */
  readonly window_ms: number;
  /** Target SLI value. */
  readonly target: number;
  /** Total requests counted (echoes `inputs.totalRequests`). */
  readonly total_requests: number;
  /** Total errors counted (echoes `inputs.errorCount`). */
  readonly error_count: number;
  /** Allowed errors over the window given the target. */
  readonly allowed_errors: number;
  /** `allowed_errors - error_count`, clamped to `[0, allowed_errors]`. */
  readonly remaining: number;
  /** Fraction of the budget remaining, in `[0, 1]`. */
  readonly remaining_ratio: number;
  /** Observed burn rate relative to budget: `error_count / allowed_errors`.
   *  `1.0` = on budget, `2.0` = burning twice as fast as allowed. */
  readonly burn_rate: number;
  /** True iff `error_count >= allowed_errors`. */
  readonly exhausted: boolean;
  /** Wall-clock minutes until the budget would be fully consumed at the
   *  current burn rate. `Infinity` when the burn rate is zero. `null`
   *  when already exhausted. */
  readonly time_to_exhaustion_minutes: number | null;
  /** Per-window burn rates over the supplied `slidingSamples`. Empty
   *  object if no samples were provided. */
  readonly burn_rates_by_window: Record<SlidingWindow, number>;
  /** Effective timestamp (epoch ms) used for window calculations. */
  readonly evaluated_at: number;
}

/** Severity of a burn-rate alert (Google SRE Workbook convention). */
export type BurnAlertSeverity = "page" | "ticket" | "warn";

/** A single triggered burn-rate alert. */
export interface BurnRateAlertResult {
  readonly slo_id: string;
  readonly window: SlidingWindow;
  readonly severity: BurnAlertSeverity;
  readonly burn_rate: number;
  readonly threshold: number;
  readonly message: string;
  readonly evaluated_at: number;
}

/** Configuration for the multi-window burn-rate thresholds. Defaults match
 *  the Google SRE Workbook: 2% of budget in 1h (page), 5% in 6h (ticket),
 *  any over-budget burn in 1h (warn). */
export interface BurnAlertThresholds {
  /** 1h burn-rate multiple that pages (default 14.4×, i.e. 2% of budget). */
  readonly page_1h_burn: number;
  /** 6h burn-rate multiple that opens a ticket (default 6×, i.e. 5%). */
  readonly ticket_6h_burn: number;
  /** 1h burn-rate multiple that warns in logs (default 1×, i.e. on-budget). */
  readonly warn_1h_burn: number;
}

/** The default threshold table — exported for the operator guide and
 *  admin UIs. Do not mutate. */
export const DEFAULT_BURN_THRESHOLDS: BurnAlertThresholds = Object.freeze({
  page_1h_burn: 14.4,
  ticket_6h_burn: 6,
  warn_1h_burn: 1,
});

// ---------------------------------------------------------------------------
// The calculator
// ---------------------------------------------------------------------------

/**
 * Build an `ErrorBudgetResult` from a request-count snapshot. Pure function
 * — no I/O, no DB, no global state. The returned object is `readonly` so
 * it can be safely cached or serialised.
 *
 * @example
 *   const result = ErrorBudget({
 *     slo: { slo_id: "SLO-001", objective: "API availability",
 *            target: 0.999, window: "30d" },
 *     windowDays: 30,
 *     totalRequests: 1_000_000,
 *     errorCount: 500,
 *     slidingSamples: [...],
 *   });
 *   if (result.exhausted) page(result);
 */
export function ErrorBudget(inputs: ErrorBudgetInputs): ErrorBudgetResult {
  validateInputs(inputs);

  const windowDays = inputs.windowDays ?? defaultWindowDays(inputs.slo.window);
  const windowMsValue = windowDays * 24 * 60 * 60 * 1000;
  const allowedErrors = round6(inputs.totalRequests * (1 - inputs.slo.target));
  const remaining = Math.max(0, allowedErrors - inputs.errorCount);
  const remainingRatio = allowedErrors > 0 ? clamp01(remaining / allowedErrors) : 1;
  const burnRate = allowedErrors > 0 ? round6(inputs.errorCount / allowedErrors) : 0;
  const exhausted = inputs.errorCount >= allowedErrors;
  const now = (inputs.now ?? DateNow)();

  const timeToExhaustionMinutes = computeTimeToExhaustionMinutes({
    allowedErrors,
    errorCount: inputs.errorCount,
    burnRate,
    windowMsValue,
    now,
  });

  const burnRatesByWindow = computeAllWindowBurnRates({
    slidingSamples: inputs.slidingSamples,
    target: inputs.slo.target,
    now,
  });

  return {
    slo_id: inputs.slo.slo_id,
    window_days: windowDays,
    window_ms: windowMsValue,
    target: inputs.slo.target,
    total_requests: inputs.totalRequests,
    error_count: inputs.errorCount,
    allowed_errors: allowedErrors,
    remaining,
    remaining_ratio: remainingRatio,
    burn_rate: burnRate,
    exhausted,
    time_to_exhaustion_minutes: timeToExhaustionMinutes,
    burn_rates_by_window: burnRatesByWindow,
    evaluated_at: now,
  };
}

// ---------------------------------------------------------------------------
// Multi-window burn-rate alerts
// ---------------------------------------------------------------------------

/**
 * Evaluate the multi-window burn-rate alerts for a budget. Returns an
 * array of triggered alerts (zero or more). Empty array = no alerts
 * fired. Pure function — callers wrap it in a gate for default-off
 * behaviour.
 *
 * The default thresholds (`DEFAULT_BURN_THRESHOLDS`) match the Google
 * SRE Workbook:
 *
 *   - page    when 1h burn_rate > 14.4×   (2% of budget in 1h)
 *   - ticket  when 6h burn_rate >  6×     (5% of budget in 6h)
 *   - warn    when 1h burn_rate >  1×     (any over-budget burn)
 *
 * The "page" and "ticket" alerts are independent — a real outage can
 * fire BOTH (the 1h page is the urgent signal, the 6h ticket is for
 * follow-up investigation). The "warn" alert fires whenever burn
 * exceeds 1× in the trailing 1h; it's a low-noise signal that the
 * SLO is being violated but not yet at paging severity.
 */
export function evaluateBurnAlerts(
  result: ErrorBudgetResult,
  thresholds: BurnAlertThresholds = DEFAULT_BURN_THRESHOLDS
): ReadonlyArray<BurnRateAlertResult> {
  const alerts: BurnRateAlertResult[] = [];
  const burn1h = result.burn_rates_by_window["1h"];
  const burn6h = result.burn_rates_by_window["6h"];

  if (Number.isFinite(burn1h) && burn1h > thresholds.page_1h_burn) {
    alerts.push({
      slo_id: result.slo_id,
      window: "1h",
      severity: "page",
      burn_rate: burn1h,
      threshold: thresholds.page_1h_burn,
      message: pageMessage(result.slo_id, "1h", burn1h, thresholds.page_1h_burn),
      evaluated_at: result.evaluated_at,
    });
  }

  if (Number.isFinite(burn6h) && burn6h > thresholds.ticket_6h_burn) {
    alerts.push({
      slo_id: result.slo_id,
      window: "6h",
      severity: "ticket",
      burn_rate: burn6h,
      threshold: thresholds.ticket_6h_burn,
      message: ticketMessage(result.slo_id, "6h", burn6h, thresholds.ticket_6h_burn),
      evaluated_at: result.evaluated_at,
    });
  }

  // The "warn" signal only fires if a 1h window is computable AND we're
  // already burning faster than the SLO allows. It is intentionally a
  // subset of the page/ticket logic so it doesn't double-fire.
  if (
    Number.isFinite(burn1h) &&
    burn1h > thresholds.warn_1h_burn &&
    burn1h <= thresholds.page_1h_burn
  ) {
    alerts.push({
      slo_id: result.slo_id,
      window: "1h",
      severity: "warn",
      burn_rate: burn1h,
      threshold: thresholds.warn_1h_burn,
      message: warnMessage(result.slo_id, "1h", burn1h, thresholds.warn_1h_burn),
      evaluated_at: result.evaluated_at,
    });
  }

  return alerts;
}

/** Convenience: pick the highest-severity alert (or `null` if empty). */
export function highestSeverity(
  alerts: ReadonlyArray<BurnRateAlertResult>
): BurnAlertSeverity | null {
  if (alerts.length === 0) return null;
  const order: Record<BurnAlertSeverity, number> = { warn: 0, ticket: 1, page: 2 };
  let best: BurnAlertSeverity = "warn";
  for (const a of alerts) {
    if (order[a.severity] > order[best]) best = a.severity;
  }
  return best;
}

// ---------------------------------------------------------------------------
// Sliding-window math
// ---------------------------------------------------------------------------

interface ComputeWindowArgs {
  readonly slidingSamples: ReadonlyArray<SlidingSegment> | undefined;
  readonly target: number;
  readonly now: number;
}

/** Compute burn rates for ALL sliding-window sizes. Returns a record
 *  keyed by `SlidingWindow`. Empty (zeroed) record if no samples. */
function computeAllWindowBurnRates(
  args: ComputeWindowArgs
): Record<SlidingWindow, number> {
  if (!args.slidingSamples || args.slidingSamples.length === 0) {
    return zeroedBurnRates();
  }
  const out: Record<SlidingWindow, number> = zeroedBurnRates();
  const windows: SlidingWindow[] = ["1h", "6h", "24h", "7d", "30d"];
  for (const w of windows) {
    out[w] = burnRateForWindow(args.slidingSamples, args.target, args.now, w);
  }
  return out;
}

/** Compute the burn rate over a single sliding window. Burn rate is the
 *  ratio of the window's observed error ratio to the SLO's allowed error
 *  ratio. A value of 1.0 means we're burning exactly at the allowed rate;
 *  2.0 means we'll exhaust the window's budget in half the time. */
function burnRateForWindow(
  samples: ReadonlyArray<SlidingSegment>,
  target: number,
  now: number,
  window: SlidingWindow
): number {
  const windowMsValue = windowMs(window);
  const windowStartMs = now - windowMsValue;
  const allowedErrorRatio = 1 - target;
  if (allowedErrorRatio <= 0) return 0;

  let totalRequests = 0;
  let totalErrors = 0;
  for (const seg of samples) {
    if (seg.end_ms <= windowStartMs) continue;
    if (seg.start_ms >= now) continue;
    // We clip segments that straddle the window boundary. This is the
    // standard sliding-window approach (linear interpolation is overkill
    // for minute-resolution buckets).
    const overlapStart = Math.max(seg.start_ms, windowStartMs);
    const overlapEnd = Math.min(seg.end_ms, now);
    if (overlapEnd <= overlapStart) continue;
    const overlapFraction = (overlapEnd - overlapStart) / Math.max(1, seg.end_ms - seg.start_ms);
    totalRequests += seg.request_count * overlapFraction;
    totalErrors += seg.error_count * overlapFraction;
  }
  if (totalRequests <= 0) return 0;
  return round6((totalErrors / totalRequests) / allowedErrorRatio);
}

// ---------------------------------------------------------------------------
// Time-to-exhaustion
// ---------------------------------------------------------------------------

interface TimeToExhaustionArgs {
  readonly allowedErrors: number;
  readonly errorCount: number;
  readonly burnRate: number;
  readonly windowMsValue: number;
  readonly now: number;
}

/**
 * Estimate minutes until the budget is exhausted at the current burn rate.
 *
 *   time = remaining_budget / current_burn_per_minute
 *
 * Returns:
 *   - `null`           when already exhausted
 *   - `Infinity`       when burn rate is zero (will never exhaust)
 *   - finite number    otherwise, in MINUTES, rounded down to whole minutes
 *
 * If no samples were provided the burn rate is the static "lifetime" burn,
 * which we treat as the burn-per-window — dividing by window length gives
 * burn-per-minute.
 */
function computeTimeToExhaustionMinutes(args: TimeToExhaustionArgs): number | null {
  const { allowedErrors, errorCount, burnRate, windowMsValue } = args;
  if (errorCount >= allowedErrors) return null;
  if (burnRate <= 0) return Infinity;
  const remaining = allowedErrors - errorCount;
  const windowMinutes = windowMsValue / 60_000;
  const burnPerMinute = burnRate * (allowedErrors / windowMinutes);
  if (burnPerMinute <= 0) return Infinity;
  return Math.floor(remaining / burnPerMinute);
}

// ---------------------------------------------------------------------------
// Validation + helpers
// ---------------------------------------------------------------------------

function validateInputs(inputs: ErrorBudgetInputs): void {
  if (!inputs || typeof inputs !== "object") {
    throw new Error("[errorBudget] inputs is required");
  }
  if (!inputs.slo || typeof inputs.slo !== "object") {
    throw new Error("[errorBudget] inputs.slo is required");
  }
  if (typeof inputs.slo.slo_id !== "string" || inputs.slo.slo_id.length === 0) {
    throw new Error("[errorBudget] slo.slo_id is required");
  }
  if (
    typeof inputs.slo.target !== "number" ||
    !Number.isFinite(inputs.slo.target) ||
    inputs.slo.target <= 0 ||
    inputs.slo.target > 1
  ) {
    throw new Error(
      `[errorBudget] slo.target must be a finite number in (0, 1] for ${inputs.slo.slo_id}`
    );
  }
  if (
    typeof inputs.totalRequests !== "number" ||
    !Number.isFinite(inputs.totalRequests) ||
    inputs.totalRequests < 0
  ) {
    throw new Error(`[errorBudget] totalRequests must be a finite non-negative number`);
  }
  if (
    typeof inputs.errorCount !== "number" ||
    !Number.isFinite(inputs.errorCount) ||
    inputs.errorCount < 0
  ) {
    throw new Error(`[errorBudget] errorCount must be a finite non-negative number`);
  }
  if (inputs.errorCount > inputs.totalRequests) {
    throw new Error(
      `[errorBudget] errorCount (${inputs.errorCount}) cannot exceed totalRequests (${inputs.totalRequests})`
    );
  }
  if (inputs.windowDays !== undefined) {
    if (
      typeof inputs.windowDays !== "number" ||
      !Number.isFinite(inputs.windowDays) ||
      inputs.windowDays <= 0
    ) {
      throw new Error("[errorBudget] windowDays must be a finite positive number");
    }
  }
}

/** Map a `SlidingWindow` to its day count. */
function defaultWindowDays(window: SlidingWindow): number {
  return WINDOW_HOURS[window] / 24;
}

function zeroedBurnRates(): Record<SlidingWindow, number> {
  return { "1h": 0, "6h": 0, "24h": 0, "7d": 0, "30d": 0 };
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/**
 * Round to 6 decimal places. Removes IEEE-754 noise so JSON consumers
 * (and tests) get exactly the expected value rather than 0.9999999991
 * when the underlying math yields 1.0 in real arithmetic.
 *
 * Precision rationale: SLO math never needs more than 6 significant
 * digits — a 0.000001 burn-rate difference is 0.0001% error, far below
 * the noise floor of any real telemetry.
 */
function round6(value: number): number {
  if (!Number.isFinite(value)) return value;
  return Math.round(value * 1_000_000) / 1_000_000;
}

function DateNow(): number {
  return Date.now();
}

function pageMessage(
  sloId: string,
  window: SlidingWindow,
  burnRate: number,
  threshold: number
): string {
  return (
    `SLO ${sloId}: fast-burn PAGE — ${window} burn rate is ` +
    `${burnRate.toFixed(2)}× (threshold ${threshold.toFixed(2)}×). ` +
    `Expect to exhaust the 28d error budget within ~${Math.round(24 / burnRate)}h at this rate.`
  );
}

function ticketMessage(
  sloId: string,
  window: SlidingWindow,
  burnRate: number,
  threshold: number
): string {
  return (
    `SLO ${sloId}: slow-burn TICKET — ${window} burn rate is ` +
    `${burnRate.toFixed(2)}× (threshold ${threshold.toFixed(2)}×). ` +
    `Open a ticket to investigate before the budget is exhausted.`
  );
}

function warnMessage(
  sloId: string,
  window: SlidingWindow,
  burnRate: number,
  threshold: number
): string {
  return (
    `SLO ${sloId}: over-budget WARN — ${window} burn rate is ` +
    `${burnRate.toFixed(2)}× (threshold ${threshold.toFixed(2)}×). ` +
    `SLI is below target but not yet at paging severity.`
  );
}
