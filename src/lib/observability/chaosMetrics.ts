/**
 * Chaos-specific Prometheus metrics for PR-013.
 *
 * Three metric families are exposed:
 *
 *   omniroute_chaos_injection_total{scenario}
 *     counter — incremented every time a chaos injector fires.
 *
 *   omniroute_chaos_recovery_duration_seconds{scenario}
 *     histogram — observed wall-clock between fault injection and full
 *     recovery. Bins are tuned for the recovery SLAs in
 *     docs/sre/03-chaos-engineering.md (sub-second up to 60s).
 *
 *   omniroute_chaos_data_loss_total{scenario}
 *     counter — number of records (rows, combo entries, tokens, ...)
 *     that were lost because of a chaos-induced failure. A healthy
 *     suite should always read 0 here; nonzero values page the on-call
 *     SRE via the same alerting rules used for the regular
 *     `*_data_loss_total` metrics.
 *
 * The module is intentionally dependency-free so it can be imported by
 * the chaos test harness, by the production runtime (for instrumentation
 * hooks), and by the sidecar metrics exporter without dragging in the
 * full prom-client stack at module-load time.
 *
 * Thread-safety / concurrency: Node.js runs JavaScript on a single
 * thread, but `await` boundaries are concurrent. Every public method is
 * synchronous w.r.t. its own bookkeeping (no awaits inside) so the
 * counters stay consistent.
 *
 * @module observability/chaosMetrics
 */

import { performance } from "node:perf_hooks";

// ─── Public label shape ───────────────────────────────────────────────────

/** Label set shared by all chaos metrics. `scenario` is the scenario id,
 *  e.g. "provider-timeout", "bifrost-network-partition". */
export interface ChaosLabels {
  scenario: string;
}

/** Allow call sites to add extra labels (kept narrow so the metric
 *  cardinality stays bounded). */
export type ChaosLabelsInput = ChaosLabels & Record<string, string | number | boolean>;

// ─── Histogram configuration ──────────────────────────────────────────────

/** Recovery-duration histogram bucket boundaries, in seconds.
 *  The buckets are tuned for the documented SLAs:
 *    • network-partition recovery: ≤ 30s
 *    • provider-timeout recovery:   ≤  5s
 *    • sqlite-wal recovery:         ≤  2s
 *    • combo-dag validation:        ≤  1s
 *    • memory-pressure health:      ≤  0.2s
 *    • clock-skew validation:       ≤  1s
 *  Choosing generous upper buckets (10s, 30s, 60s) means SRE can read
 *  the histogram long after an incident and still see the tail. */
export const RECOVERY_BUCKETS_SECONDS: readonly number[] = Object.freeze([
  0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 30, 60,
]);

/** Total number of buckets, derived. Exposed so the formatter can size
 *  its allocations without re-counting on every scrape. */
export const RECOVERY_BUCKET_COUNT: number = RECOVERY_BUCKETS_SECONDS.length;

// ─── Internal cell shape ──────────────────────────────────────────────────

/** Per-scenario accumulator for the three metrics. A scenario that has
 *  never been touched does not appear in the registry output, so we
 *  keep the bookkeeping entirely in `cells`. */
interface ChaosCell {
  scenario: string;
  injectionTotal: number;
  dataLossTotal: number;
  /** Cumulative observed recovery durations (used for `sum`). */
  recoverySumSeconds: number;
  /** Per-bucket cumulative counts. `recoveryBuckets[i]` is the count of
   *  observations whose value was ≤ `RECOVERY_BUCKETS_SECONDS[i]`. */
  recoveryBuckets: number[];
  /** Total number of observations, used for `_count`. */
  recoveryCount: number;
  /** Last injection timestamp (ms since epoch). Useful for the
   *  per-cell `last_injected_at_ms` gauge we surface in `snapshot()`. */
  lastInjectedAtMs: number;
  /** Last recovery timestamp (ms since epoch). 0 means "never recovered". */
  lastRecoveredAtMs: number;
}

// ─── Module-private registry ──────────────────────────────────────────────

/** Stable insertion order so the scrape output is deterministic, which
 *  makes golden tests in tests/chaos a whole lot easier to write. */
const cellsByScenario = new Map<string, ChaosCell>();

/** Per-call wall-clock helper used by `startRecoveryTimer()`. */
function nowSeconds(): number {
  return performance.now() / 1000;
}

function getOrCreateCell(scenario: string): ChaosCell {
  const existing = cellsByScenario.get(scenario);
  if (existing) return existing;
  const created: ChaosCell = {
    scenario,
    injectionTotal: 0,
    dataLossTotal: 0,
    recoverySumSeconds: 0,
    recoveryBuckets: new Array<number>(RECOVERY_BUCKET_COUNT).fill(0),
    recoveryCount: 0,
    lastInjectedAtMs: 0,
    lastRecoveredAtMs: 0,
  };
  cellsByScenario.set(scenario, created);
  return created;
}

// ─── Counter API ──────────────────────────────────────────────────────────

/**
 * Increment the `omniroute_chaos_injection_total` counter for a scenario.
 * Idempotent label normalization: extra whitespace is trimmed.
 */
export function recordChaosInjection(labels: ChaosLabelsInput): void {
  const scenario = normalizeScenario(labels.scenario);
  const cell = getOrCreateCell(scenario);
  cell.injectionTotal += 1;
  cell.lastInjectedAtMs = Date.now();
}

/** `recordChaosInjection` for the common single-label case. */
export function recordChaosInjectionByName(scenario: string, n = 1): void {
  const name = normalizeScenario(scenario);
  const cell = getOrCreateCell(name);
  cell.injectionTotal += n;
  cell.lastInjectedAtMs = Date.now();
}

/**
 * Increment the data-loss counter. By design this is rare — any nonzero
 * value should page on-call. Callers should pass a structured `detail`
 * so SREs can quickly understand what was lost without re-running the
 * suite.
 */
export function recordChaosDataLoss(labels: ChaosLabelsInput, lost: number, detail?: string): void {
  if (!Number.isFinite(lost) || lost < 0) {
    throw new TypeError(`recordChaosDataLoss: lost must be a non-negative finite number, got ${lost}`);
  }
  const cell = getOrCreateCell(normalizeScenario(labels.scenario));
  cell.dataLossTotal += Math.floor(lost);
  // We also log to stderr so a CI run can grep `data-loss=` and fail.
  if (lost > 0 && process.env.CHAOS_TESTS_VERBOSE === "1") {
    process.stderr.write(`[chaos] data-loss scenario=${cell.scenario} lost=${lost} detail=${detail ?? "<none>"}\n`);
  }
}

// ─── Histogram API ────────────────────────────────────────────────────────

/**
 * Record a single recovery observation in seconds. The caller passes the
 * wall-clock elapsed between fault injection and the moment the SUT was
 * observably healthy again (e.g. health check returned 200, breaker
 * closed, replication caught up).
 *
 * Returns the bucket index that the observation landed in, mainly for
 * test assertions in the chaos harness.
 */
export function observeRecoveryDuration(labels: ChaosLabelsInput, durationSeconds: number): number {
  if (!Number.isFinite(durationSeconds) || durationSeconds < 0) {
    throw new TypeError(`observeRecoveryDuration: durationSeconds must be a non-negative finite number, got ${durationSeconds}`);
  }
  const cell = getOrCreateCell(normalizeScenario(labels.scenario));
  cell.recoverySumSeconds += durationSeconds;
  cell.recoveryCount += 1;
  cell.lastRecoveredAtMs = Date.now();

  // Bucket placement: first bucket whose boundary >= value. We use a
  // linear scan because RECOVERY_BUCKET_COUNT is small (~10). If the
  // value exceeds the largest boundary, the observation still bumps
  // `_count` and `_sum` but falls into the implicit +Inf bucket.
  let bucket = RECOVERY_BUCKET_COUNT; // +Inf
  for (let i = 0; i < RECOVERY_BUCKET_COUNT; i++) {
    if (durationSeconds <= (RECOVERY_BUCKETS_SECONDS[i] as number)) {
      bucket = i;
      break;
    }
  }
  if (bucket < RECOVERY_BUCKET_COUNT) {
    cell.recoveryBuckets[bucket] = (cell.recoveryBuckets[bucket] ?? 0) + 1;
  }
  return bucket;
}

// ─── Timer convenience helper ─────────────────────────────────────────────

/**
 * Start a recovery timer. Returns a `finish()` closure that records the
 * elapsed seconds since construction. Designed to be used like:
 *
 *   const done = startRecoveryTimer({ scenario: "provider-timeout" });
 *   await runRecoveryAssertion();
 *   done();   // observes the elapsed duration into the histogram
 *
 * If you want to attach a label set (e.g. severity), pass it explicitly.
 */
export interface RecoveryTimer {
  /** Observed seconds since the timer was created. */
  elapsed(): number;
  /** Record the observation and return the bucket index. */
  finish(extra?: Partial<ChaosLabelsInput>): number;
}

export function startRecoveryTimer(labels: ChaosLabelsInput): RecoveryTimer {
  const t0 = nowSeconds();
  const baseLabels: ChaosLabels = { scenario: normalizeScenario(labels.scenario) };
  return {
    elapsed(): number {
      return nowSeconds() - t0;
    },
    finish(extra?: Partial<ChaosLabelsInput>): number {
      const merged: ChaosLabelsInput = { ...baseLabels, ...(extra ?? {}) };
      return observeRecoveryDuration(merged, nowSeconds() - t0);
    },
  };
}

// ─── Snapshot ─────────────────────────────────────────────────────────────

/** Plain-data view of the registry, returned by `snapshot()`. */
export interface ChaosCellSnapshot {
  scenario: string;
  injectionTotal: number;
  dataLossTotal: number;
  recoveryCount: number;
  recoverySumSeconds: number;
  recoveryBuckets: number[];
  lastInjectedAtMs: number;
  lastRecoveredAtMs: number;
}

/** Whole-registry snapshot. Returned by `snapshot()` and also serialised
 *  into the JUnit XML by tests/chaos/runner.mjs. */
export interface ChaosSnapshot {
  /** Total number of distinct scenarios seen since process start. */
  scenarioCount: number;
  /** Sum of every scenario's `dataLossTotal`. Should be 0 in CI. */
  totalDataLoss: number;
  /** Sum of every scenario's `injectionTotal`. */
  totalInjections: number;
  /** Sum of every scenario's `recoveryCount`. */
  totalRecoveryObservations: number;
  cells: ChaosCellSnapshot[];
}

/**
 * Take a deterministic snapshot of the registry. Used by the test
 * harness to assert on metric values, and by the JUnit emitter to roll
 * recovery observations into the test report.
 */
export function snapshot(): ChaosSnapshot {
  const cells: ChaosCellSnapshot[] = [];
  let totalDataLoss = 0;
  let totalInjections = 0;
  let totalRecoveryObservations = 0;

  // Iterate in insertion order so the snapshot is stable.
  for (const cell of cellsByScenario.values()) {
    cells.push({
      scenario: cell.scenario,
      injectionTotal: cell.injectionTotal,
      dataLossTotal: cell.dataLossTotal,
      recoveryCount: cell.recoveryCount,
      recoverySumSeconds: cell.recoverySumSeconds,
      recoveryBuckets: cell.recoveryBuckets.slice(),
      lastInjectedAtMs: cell.lastInjectedAtMs,
      lastRecoveredAtMs: cell.lastRecoveredAtMs,
    });
    totalDataLoss += cell.dataLossTotal;
    totalInjections += cell.injectionTotal;
    totalRecoveryObservations += cell.recoveryCount;
  }

  return {
    scenarioCount: cells.length,
    totalDataLoss,
    totalInjections,
    totalRecoveryObservations,
    cells,
  };
}

// ─── Reset (test-only) ────────────────────────────────────────────────────

/**
 * Wipe the registry. Tests call this in their `beforeEach` so each
 * scenario starts from a clean slate. Production code should never
 * call this — the metrics are deliberately process-lifetime.
 */
export function __resetChaosMetricsForTests(): void {
  cellsByScenario.clear();
}

// ─── Prometheus text exposition ───────────────────────────────────────────

/**
 * Render the registry as Prometheus text-exposition format. Suitable
 * for serving from a `/metrics` endpoint or for piping into a JUnit
 * report. The output is stable — same registry state always produces
 * the same string — which is a property tests can lean on.
 *
 * The output follows the spec at:
 *   https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format
 */
export function renderPrometheusText(): string {
  const lines: string[] = [];

  // HELP / TYPE per metric family.
  lines.push("# HELP omniroute_chaos_injection_total Number of chaos fault injections performed, per scenario.");
  lines.push("# TYPE omniroute_chaos_injection_total counter");
  lines.push("# HELP omniroute_chaos_recovery_duration_seconds Wall-clock seconds between fault injection and SUT recovery, per scenario.");
  lines.push("# TYPE omniroute_chaos_recovery_duration_seconds histogram");
  lines.push("# HELP omniroute_chaos_data_loss_total Number of records lost because of a chaos-induced failure, per scenario.");
  lines.push("# TYPE omniroute_chaos_data_loss_total counter");

  for (const cell of cellsByScenario.values()) {
    const scenarioLabel = escapeLabelValue(cell.scenario);

    // counter: injection
    lines.push(`omniroute_chaos_injection_total{scenario="${scenarioLabel}"} ${cell.injectionTotal}`);

    // counter: data loss
    lines.push(`omniroute_chaos_data_loss_total{scenario="${scenarioLabel}"} ${cell.dataLossTotal}`);

    // histogram: each bucket line plus _sum and _count
    let cumulative = 0;
    for (let i = 0; i < RECOVERY_BUCKET_COUNT; i++) {
      cumulative += cell.recoveryBuckets[i] ?? 0;
      const le = (RECOVERY_BUCKETS_SECONDS[i] as number).toString();
      lines.push(`omniroute_chaos_recovery_duration_seconds_bucket{scenario="${scenarioLabel}",le="${le}"} ${cumulative}`);
    }
    lines.push(`omniroute_chaos_recovery_duration_seconds_bucket{scenario="${scenarioLabel}",le="+Inf"} ${cell.recoveryCount}`);
    lines.push(`omniroute_chaos_recovery_duration_seconds_sum{scenario="${scenarioLabel}"} ${cell.recoverySumSeconds.toFixed(6)}`);
    lines.push(`omniroute_chaos_recovery_duration_seconds_count{scenario="${scenarioLabel}"} ${cell.recoveryCount}`);
  }

  // Trailing newline so the response body is well-formed.
  return lines.join("\n") + "\n";
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Normalize the scenario label: trim whitespace, collapse interior
 *  whitespace runs to single dashes, force-lower-case. This prevents
 *  accidental cardinality blow-ups from `"provider-timeout"` vs
 *  `" provider_timeout "`. */
function normalizeScenario(input: string): string {
  if (typeof input !== "string") {
    throw new TypeError(`chaosMetrics: scenario label must be a string, got ${typeof input}`);
  }
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length === 0) {
    throw new RangeError("chaosMetrics: scenario label must be non-empty");
  }
  return trimmed.replace(/[\s_]+/g, "-").replace(/[^a-z0-9._-]/g, "");
}

/** Escape a value for inclusion inside a Prometheus label. Mirrors the
 *  standard rules: backslash, double-quote, and newline all need to be
 *  escaped. We keep this defensive even though we already normalize
 *  the input, because callers might pass values through `extra`. */
function escapeLabelValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/"/g, '\\"');
}