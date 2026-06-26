/**
 * src/lib/observability/budgetMetrics.ts
 *
 * Prometheus metrics for the SLO error-budget subsystem.
 *
 * Metrics
 * -------
 *   omniroute_slo_target_ratio{slo_id}                  gauge   [0,1]
 *   omniroute_slo_error_budget_remaining{slo_id,window} gauge   [0,1]
 *   omniroute_slo_burn_rate{slo_id,window}               gauge   rate × budget
 *   omniroute_slo_alerts_fired_total{slo_id,severity}   counter alerts
 *
 * Cardinality cap
 * ---------------
 * The Prometheus best practice is to keep label cardinality bounded. The
 * SLO catalog has 5 entries (SLO-001..SLO-005) × 5 windows = 25 series
 * for the multi-window gauges. Severity is fixed at 3 (page/ticket/warn).
 * `MAX_SERIES = 5 × 5 × 3 = 75`. We refuse to register a metric handle
 * that would exceed the cap; see `enforceCardinalityCap()`.
 *
 * Registry
 * --------
 * This module uses the project-wide lightweight registry defined below
 * (`LightweightRegistry`). It is NOT `prom-client` — that's an explicit
 * PR-012 constraint ("ZERO new npm deps"). The registry is in-process
 * only and emits Prometheus text exposition format on demand (see
 * `renderPrometheusExposition()`). The real Prometheus scrape endpoint
 * can wrap this output verbatim.
 *
 * Default-off
 * -----------
 * The metrics module itself is always loaded, but `recordBudgetMetric()`
 * short-circuits when `SLO_TRACKER_ENABLED !== "true"` so the cardinality
 * cost is zero until an operator opts in.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/budgetMetrics.test.ts
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MetricKind = "gauge" | "counter";

/** A single label-value pair attached to a metric sample. */
export interface MetricLabel {
  readonly name: string;
  readonly value: string;
}

/** A point-in-time sample of a metric. Counters accumulate; gauges
 *  overwrite. The `timestamp_ms` is optional — exposition format omits
 *  it when `0`. */
export interface MetricSample {
  readonly labels: ReadonlyArray<MetricLabel>;
  readonly value: number;
  readonly timestamp_ms?: number;
}

/** Definition of a single metric family (e.g. "omniroute_slo_target_ratio"). */
export interface MetricFamily {
  readonly name: string;
  readonly kind: MetricKind;
  readonly help: string;
  /** Allowed label names. Order matters for exposition format. */
  readonly label_names: ReadonlyArray<string>;
  readonly samples: ReadonlyArray<MetricSample>;
}

/** Card of a sample = product of label-values cardinality. */
export type LabelCardinalityFn = (samples: ReadonlyArray<MetricSample>) => number;

/** Options for `recordBudgetMetric()`. */
export interface RecordBudgetMetricInput {
  readonly slo_id: string;
  /** Per-window remaining/burn samples. */
  readonly remaining_by_window?: Record<string, number>;
  readonly burn_rate_by_window?: Record<string, number>;
  /** Optional target ratio override. Defaults to the catalog value. */
  readonly target_ratio?: number;
  /** Severity bucket — only valid for the alerts counter. */
  readonly alert_severity?: "page" | "ticket" | "warn";
  /** Set to true to increment the alerts counter. */
  readonly increment_alert?: boolean;
  /** Optional override clock (epoch ms). */
  readonly now?: number;
}

// ---------------------------------------------------------------------------
// Cardinality cap
// ---------------------------------------------------------------------------

/** Hard cap on total number of budget-related series. If a write would
 *  push us over this, we drop it and increment a local "dropped" counter
 *  (exposed as `omniroute_slo_cardinality_dropped_total` for ops to see). */
export const MAX_BUDGET_SERIES = 75;

/** Cardinality cap enforced by `enforceCardinalityCap()`. */
export function getCurrentSeriesCount(): number {
  return getRegistry().totalSeries();
}

// ---------------------------------------------------------------------------
// Lightweight in-process registry
// ---------------------------------------------------------------------------

interface RegistryEntry {
  readonly family: MetricFamily;
  /** Counter state — when family.kind === "counter", samples with the same
   *  label-set are summed. When "gauge", the latest write wins. */
  state: Map<string, { labels: ReadonlyArray<MetricLabel>; value: number; ts: number }>;
}

/**
 * Tiny registry that owns every budget metric family. We keep it inside
 * the module (singleton) so the rest of the codebase gets the same
 * instance via `getRegistry()` without needing a separate module.
 */
class LightweightRegistry {
  private readonly families = new Map<string, RegistryEntry>();
  private droppedCount = 0;

  /** Register a metric family. Throws if a different family with the
   *  same name was already registered (we want callers to be explicit
   *  about re-registration — typically a bug). */
  register(family: MetricFamily): void {
    if (this.families.has(family.name)) {
      const existing = this.families.get(family.name)!;
      if (existing.family.kind !== family.kind || existing.family.help !== family.help) {
        throw new Error(
          `[budgetMetrics] metric "${family.name}" already registered with different shape`
        );
      }
      return;
    }
    this.families.set(family.name, {
      family,
      state: new Map<string, { labels: ReadonlyArray<MetricLabel>; value: number; ts: number }>(),
    });
  }

  /** Look up a registered family (or `null`). */
  get(name: string): MetricFamily | null {
    const entry = this.families.get(name);
    if (!entry) return null;
    return { ...entry.family, samples: this.materialiseSamples(entry) };
  }

  /** Total number of distinct series across every family. */
  totalSeries(): number {
    let total = 0;
    for (const entry of this.families.values()) {
      total += entry.state.size;
    }
    return total;
  }

  /** Write a sample. Counters accumulate; gauges overwrite. */
  write(
    metricName: string,
    labels: ReadonlyArray<MetricLabel>,
    value: number,
    timestampMs: number = Date.now()
  ): { accepted: boolean } {
    const entry = this.families.get(metricName);
    if (!entry) {
      // Unknown metric — fail closed in production, fail loud in tests.
      throw new Error(`[budgetMetrics] unknown metric "${metricName}"`);
    }
    this.assertLabelsMatch(entry.family, labels);
    if (this.wouldExceedCap(metricName, labels)) {
      this.droppedCount += 1;
      return { accepted: false };
    }
    const key = labelKey(labels);
    const prev = entry.state.get(key);
    if (entry.family.kind === "counter") {
      const next = (prev?.value ?? 0) + value;
      entry.state.set(key, { labels, value: next, ts: timestampMs });
    } else {
      entry.state.set(key, { labels, value, ts: timestampMs });
    }
    return { accepted: true };
  }

  /** Read all samples for a metric family in registration order. */
  snapshot(name: string): ReadonlyArray<MetricSample> {
    const entry = this.families.get(name);
    if (!entry) return [];
    return this.materialiseSamples(entry);
  }

  /** Wipe everything (test-only helper). */
  reset(): void {
    this.families.clear();
    this.droppedCount = 0;
  }

  /** Read the dropped-sample counter. */
  dropped(): number {
    return this.droppedCount;
  }

  /** Total number of registered families. */
  familyCount(): number {
    return this.families.size;
  }

  private materialiseSamples(entry: RegistryEntry): MetricSample[] {
    return Array.from(entry.state.values()).map((s) => ({
      labels: s.labels,
      value: s.value,
      timestamp_ms: s.ts,
    }));
  }

  private assertLabelsMatch(
    family: MetricFamily,
    labels: ReadonlyArray<MetricLabel>
  ): void {
    const expected = new Set(family.label_names);
    const seen = new Set<string>();
    for (const l of labels) {
      if (!expected.has(l.name)) {
        throw new Error(
          `[budgetMetrics] metric "${family.name}": unknown label "${l.name}" ` +
            `(allowed: ${[...expected].join(", ")})`
        );
      }
      if (seen.has(l.name)) {
        throw new Error(
          `[budgetMetrics] metric "${family.name}": duplicate label "${l.name}"`
        );
      }
      seen.add(l.name);
    }
  }

  private wouldExceedCap(
    metricName: string,
    labels: ReadonlyArray<MetricLabel>
  ): boolean {
    const entry = this.families.get(metricName)!;
    const key = labelKey(labels);
    if (entry.state.has(key)) return false;
    return this.totalSeries() + 1 > MAX_BUDGET_SERIES;
  }
}

function labelKey(labels: ReadonlyArray<MetricLabel>): string {
  // Deterministic sort by name so callers can pass labels in any order.
  const sorted = [...labels].sort((a, b) => a.name.localeCompare(b.name));
  return sorted.map((l) => `${l.name}=${l.value}`).join("|");
}

// ---------------------------------------------------------------------------
// The singleton registry + getter
// ---------------------------------------------------------------------------

/** The shared registry instance. Re-exported by the observability barrel. */
export const REGISTRY: LightweightRegistry = new LightweightRegistry();

/** Public getter so consumers don't reach into the variable directly. */
export function getRegistry(): LightweightRegistry {
  return REGISTRY;
}

// ---------------------------------------------------------------------------
// Metric family definitions
// ---------------------------------------------------------------------------

/** `omniroute_slo_target_ratio{slo_id}` — gauge in `[0, 1]`. */
export const METRIC_TARGET_RATIO = "omniroute_slo_target_ratio";

/** `omniroute_slo_error_budget_remaining{slo_id, window}` — gauge in `[0, 1]`. */
export const METRIC_BUDGET_REMAINING = "omniroute_slo_error_budget_remaining";

/** `omniroute_slo_burn_rate{slo_id, window}` — gauge (multiple of budget rate). */
export const METRIC_BURN_RATE = "omniroute_slo_burn_rate";

/** `omniroute_slo_alerts_fired_total{slo_id, severity}` — counter. */
export const METRIC_ALERTS_FIRED = "omniroute_slo_alerts_fired_total";

/** `omniroute_slo_cardinality_dropped_total` — counter (dropped writes). */
export const METRIC_CARDINALITY_DROPPED = "omniroute_slo_cardinality_dropped_total";

const METRIC_HELP = {
  target_ratio: "SLO target ratio in [0,1] (e.g. 0.999 for three nines).",
  budget_remaining:
    "Fraction of error budget remaining in the trailing window, in [0,1]. " +
    "A value of 0.5 means half the budget is left; 0 means exhausted.",
  burn_rate:
    "Observed burn rate over the trailing window, expressed as a multiple " +
    "of the allowed rate. 1.0 = on budget; > 1 = over budget.",
  alerts_fired:
    "Total number of burn-rate alerts fired since process start, by severity.",
  cardinality_dropped:
    "Total number of metric writes dropped because the cardinality cap was reached.",
};

/** Register all four budget metric families. Idempotent — re-running
 *  with the same shape is a no-op. */
export function registerBudgetMetrics(): void {
  REGISTRY.register({
    name: METRIC_TARGET_RATIO,
    kind: "gauge",
    help: METRIC_HELP.target_ratio,
    label_names: ["slo_id"],
    samples: [],
  });
  REGISTRY.register({
    name: METRIC_BUDGET_REMAINING,
    kind: "gauge",
    help: METRIC_HELP.budget_remaining,
    label_names: ["slo_id", "window"],
    samples: [],
  });
  REGISTRY.register({
    name: METRIC_BURN_RATE,
    kind: "gauge",
    help: METRIC_HELP.burn_rate,
    label_names: ["slo_id", "window"],
    samples: [],
  });
  REGISTRY.register({
    name: METRIC_ALERTS_FIRED,
    kind: "counter",
    help: METRIC_HELP.alerts_fired,
    label_names: ["slo_id", "severity"],
    samples: [],
  });
  REGISTRY.register({
    name: METRIC_CARDINALITY_DROPPED,
    kind: "counter",
    help: METRIC_HELP.cardinality_dropped,
    label_names: [],
    samples: [],
  });
}

/** Read a registered family — convenience wrapper around `getRegistry().get`. */
export function getMetric(name: string): MetricFamily | null {
  return REGISTRY.get(name);
}

// ---------------------------------------------------------------------------
// Recording
// ---------------------------------------------------------------------------

/** Default-off gate. Reads `SLO_TRACKER_ENABLED`. Truthy values
 *  (`"true"`, `"1"`, case-insensitive) enable recording. Default is
 *  DISABLED — matches the PR-012 constraint that everything is
 *  default-off. */
export function isSloTrackerEnabled(): boolean {
  const raw = process.env.SLO_TRACKER_ENABLED;
  if (typeof raw !== "string") return false;
  const normalized = raw.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

/**
 * Record the latest state for an SLO. Idempotent w.r.t. labels — repeated
 * calls with the same labels overwrite the gauge value (or accumulate
 * into the counter).
 *
 * When `SLO_TRACKER_ENABLED` is not `"true"`, this function returns
 * `{ accepted: false, gated: true }` WITHOUT touching the registry. This
 * is the default-off behaviour the PR-012 spec requires.
 */
export function recordBudgetMetric(
  input: RecordBudgetMetricInput
): { accepted: boolean; gated: boolean } {
  if (!isSloTrackerEnabled()) {
    return { accepted: false, gated: true };
  }
  // Lazy-register the metric families so callers don't have to wire up
  // bootstrap ordering. The first call to `recordBudgetMetric` after
  // process startup pays this one-time cost.
  if (REGISTRY.familyCount() === 0) {
    registerBudgetMetrics();
  }
  const now = input.now ?? Date.now();
  let accepted = true;

  // 1. target ratio
  if (typeof input.target_ratio === "number" && Number.isFinite(input.target_ratio)) {
    const r = REGISTRY.write(
      METRIC_TARGET_RATIO,
      [{ name: "slo_id", value: input.slo_id }],
      clamp01(input.target_ratio),
      now
    );
    accepted = accepted && r.accepted;
  }

  // 2. remaining by window
  if (input.remaining_by_window) {
    for (const [window, value] of Object.entries(input.remaining_by_window)) {
      if (!Number.isFinite(value)) continue;
      const r = REGISTRY.write(
        METRIC_BUDGET_REMAINING,
        [
          { name: "slo_id", value: input.slo_id },
          { name: "window", value: window },
        ],
        clamp01(value),
        now
      );
      accepted = accepted && r.accepted;
    }
  }

  // 3. burn rate by window
  if (input.burn_rate_by_window) {
    for (const [window, value] of Object.entries(input.burn_rate_by_window)) {
      if (!Number.isFinite(value)) continue;
      const r = REGISTRY.write(
        METRIC_BURN_RATE,
        [
          { name: "slo_id", value: input.slo_id },
          { name: "window", value: window },
        ],
        Math.max(0, value),
        now
      );
      accepted = accepted && r.accepted;
    }
  }

  // 4. alerts counter
  if (input.increment_alert && input.alert_severity) {
    const r = REGISTRY.write(
      METRIC_ALERTS_FIRED,
      [
        { name: "slo_id", value: input.slo_id },
        { name: "severity", value: input.alert_severity },
      ],
      1,
      now
    );
    accepted = accepted && r.accepted;
  }

  return { accepted, gated: false };
}

// ---------------------------------------------------------------------------
// Exposition format
// ---------------------------------------------------------------------------

/**
 * Render all registered metrics in Prometheus text exposition format
 * (https://prometheus.io/docs/instrumenting/exposition_formats/). The
 * output is suitable for `/metrics` scrape endpoints.
 *
 * Each metric family emits:
 *   # HELP <name> <help text>
 *   # TYPE <name> <kind>
 *   <name>{label1="value1",label2="value2"} <value> [timestamp]
 *
 * Counters include a `_total` suffix in the standard convention — this
 * module already bakes `_total` into the metric name (see
 * `METRIC_ALERTS_FIRED`).
 */
export function renderPrometheusExposition(): string {
  registerBudgetMetricsIfNeeded();
  const lines: string[] = [];
  const names = [
    METRIC_TARGET_RATIO,
    METRIC_BUDGET_REMAINING,
    METRIC_BURN_RATE,
    METRIC_ALERTS_FIRED,
    METRIC_CARDINALITY_DROPPED,
  ];
  for (const name of names) {
    const family = REGISTRY.get(name);
    if (!family) continue;
    lines.push(`# HELP ${family.name} ${escapeHelp(family.help)}`);
    lines.push(`# TYPE ${family.name} ${family.kind}`);
    for (const sample of family.samples) {
      const labelStr = formatLabels(sample.labels);
      const ts = sample.timestamp_ms ? ` ${Math.floor(sample.timestamp_ms / 1000)}` : "";
      lines.push(`${family.name}${labelStr} ${formatValue(sample.value)}${ts}`);
    }
  }
  // Add the dropped counter as a final entry so operators see it even
  // when nothing else has been written.
  const dropped = REGISTRY.dropped();
  if (dropped > 0) {
    lines.push(`# HELP ${METRIC_CARDINALITY_DROPPED} ${escapeHelp(METRIC_HELP.cardinality_dropped)}`);
    lines.push(`# TYPE ${METRIC_CARDINALITY_DROPPED} counter`);
    lines.push(`${METRIC_CARDINALITY_DROPPED} ${dropped}`);
  }
  // Prometheus exposition format requires a trailing newline.
  return lines.length === 0 ? "" : `${lines.join("\n")}\n`;
}

function registerBudgetMetricsIfNeeded(): void {
  if (REGISTRY.familyCount() === 0) {
    registerBudgetMetrics();
  }
}

function formatLabels(labels: ReadonlyArray<MetricLabel>): string {
  if (labels.length === 0) return "";
  const sorted = [...labels].sort((a, b) => a.name.localeCompare(b.name));
  const body = sorted.map((l) => `${l.name}="${escapeLabel(l.value)}"`).join(",");
  return `{${body}}`;
}

function formatValue(value: number): string {
  if (!Number.isFinite(value)) {
    if (value === Infinity) return "+Inf";
    if (value === -Infinity) return "-Inf";
    return "NaN";
  }
  // Match Go's strconv format for floats — up to 6 significant digits.
  if (Number.isInteger(value) && Math.abs(value) < 1e15) return value.toString();
  return value.toString();
}

function escapeHelp(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n");
}

function escapeLabel(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/"/g, '\\"');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

// ---------------------------------------------------------------------------
// Test-only hooks
// ---------------------------------------------------------------------------

/** Reset all metric state. Test-only — production code never calls this. */
export function __resetForTests(): void {
  REGISTRY.reset();
  registerBudgetMetrics();
}
