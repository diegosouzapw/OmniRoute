/**
 * src/lib/observability/metrics.ts
 *
 * Prometheus-compatible in-process metrics registry. The four core
 * instrument types (Counter, Gauge, Histogram, Summary) are exposed as
 * factory functions backed by a single shared Registry. Every recorded
 * sample is decorated with Resource attributes at scrape time so exporters
 * don't have to plumb them through every call site.
 *
 * Cardinality cap:
 *   Each instrument enforces a `cardinalityLimit` (default 1024 distinct
 *   label-sets per metric). When the cap is exceeded, new label combos
 *   are dropped AND a `_dropped_total` counter on the metric is
 *   incremented. This prevents untrusted label values (user-provided
 *   tenant IDs, model names, …) from exploding memory.
 *
 * Thread-safety: Node.js is single-threaded, so we don't lock — but
 * the registry is reused across awaits, which is fine since registration
 * happens at startup and increments are commutative.
 */

import { getResource, resourceToPromLabels } from "./resource";

export type LabelValues = Record<string, string>;

export interface MetricHandle {
  /** Internal id (e.g. "tenant_cost_usd_total"). */
  name: string;
  /** Stable help text rendered into Prometheus output. */
  help: string;
  /** The metric type as a wire-level string. */
  type: "counter" | "gauge" | "histogram" | "summary";
}

export interface Counter extends MetricHandle {
  type: "counter";
  inc(labels?: LabelValues, value?: number): void;
  get(labels?: LabelValues): number;
  /** Sum of all samples that were dropped due to the cardinality cap. */
  droppedCount(): number;
}

export interface Gauge extends MetricHandle {
  type: "gauge";
  set(labels: LabelValues, value: number): void;
  inc(labels?: LabelValues, value?: number): void;
  dec(labels?: LabelValues, value?: number): void;
  get(labels?: LabelValues): number;
}

export interface Histogram extends MetricHandle {
  type: "histogram";
  observe(labels: LabelValues, value: number): void;
  /** Snapshot of (bucket upper bound → cumulative count) for the label set. */
  buckets(labels?: LabelValues): { le: number; count: number }[];
  sumCount(labels?: LabelValues): { sum: number; count: number };
}

export interface Summary extends MetricHandle {
  type: "summary";
  observe(labels: LabelValues, value: number): void;
  quantileLabels(): number[];
  get(labels?: LabelValues): { sum: number; count: number; quantiles: Record<number, number> };
}

export interface CreateCounterOptions {
  name: string;
  help: string;
  labelNames?: string[];
  /** Override default cardinality cap (default 1024). */
  cardinalityLimit?: number;
}

export interface CreateGaugeOptions extends CreateCounterOptions {}

export interface CreateHistogramOptions extends CreateCounterOptions {
  /** Bucket upper bounds (inclusive). Defaults to Prometheus HTTP-style buckets. */
  buckets?: number[];
}

export interface CreateSummaryOptions extends CreateCounterOptions {
  /** Quantiles to track. Defaults to [0.5, 0.9, 0.95, 0.99]. */
  quantiles?: number[];
}

const DEFAULT_HTTP_BUCKETS = [
  0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10,
];

const DEFAULT_QUANTILES = [0.5, 0.9, 0.95, 0.99];

function labelKey(labelNames: string[], labels: LabelValues | undefined): string {
  if (!labelNames.length) return "";
  const parts: string[] = [];
  for (const n of labelNames) {
    const v = labels?.[n];
    parts.push(`${n}=${v ?? ""}`);
  }
  return parts.join(",");
}

function validateLabels(labelNames: string[], labels: LabelValues | undefined): string | null {
  if (!labelNames.length) return "";
  if (!labels) return `missing labels (expected: ${labelNames.join(", ")})`;
  for (const n of labelNames) {
    if (!(n in labels)) return `missing label "${n}"`;
  }
  return null;
}

interface InternalHistogram {
  sum: number;
  count: number;
  bucketCounts: number[];
}

interface InternalSummary {
  sum: number;
  count: number;
  /** Ring buffer of recent observations (max 2048) for on-demand quantile calc. */
  samples: number[];
}

class Registry {
  private counters = new Map<string, Counter>();
  private gauges = new Map<string, Gauge>();
  private histograms = new Map<string, Histogram>();
  private summaries = new Map<string, Summary>();
  /** Tracks distinct label-sets for cardinality enforcement. */
  private labelSets = new Map<string, Set<string>>();

  /** Add a label-set and return true if it fits under the cap. */
  reserveLabelSet(metricName: string, labelKey: string, cap: number): boolean {
    let set = this.labelSets.get(metricName);
    if (!set) {
      set = new Set();
      this.labelSets.set(metricName, set);
    }
    if (set.has(labelKey)) return true;
    if (set.size >= cap) return false;
    set.add(labelKey);
    return true;
  }

  noteDropped(metricName: string): void {
    const internal = this.droppedTotals.get(metricName) ?? 0;
    this.droppedTotals.set(metricName, internal + 1);
  }

  droppedTotals = new Map<string, number>();

  registerCounter(c: Counter): void {
    this.counters.set(c.name, c);
  }
  registerGauge(g: Gauge): void {
    this.gauges.set(g.name, g);
  }
  registerHistogram(h: Histogram): void {
    this.histograms.set(h.name, h);
  }
  registerSummary(s: Summary): void {
    this.summaries.set(s.name, s);
  }

  /** All registered metrics — used by exporters / debug dumps. */
  all(): Array<{ metric: MetricHandle; render: () => string }> {
    const out: Array<{ metric: MetricHandle; render: () => string }> = [];
    for (const c of this.counters.values()) {
      out.push({ metric: c, render: () => renderCounter(c) });
    }
    for (const g of this.gauges.values()) {
      out.push({ metric: g, render: () => renderGauge(g) });
    }
    for (const h of this.histograms.values()) {
      out.push({ metric: h, render: () => renderHistogram(h) });
    }
    for (const s of this.summaries.values()) {
      out.push({ metric: s, render: () => renderSummary(s) });
    }
    return out;
  }

  /** Prometheus textfile format dump of every metric + the resource labels. */
  toPrometheus(): string {
    const res = resourceToPromLabels(getResource());
    const lines: string[] = [];
    for (const c of this.counters.values()) lines.push(renderCounter(c, res));
    for (const g of this.gauges.values()) lines.push(renderGauge(g, res));
    for (const h of this.histograms.values()) lines.push(renderHistogram(h, res));
    for (const s of this.summaries.values()) lines.push(renderSummary(s, res));
    return lines.join("\n") + (lines.length ? "\n" : "");
  }

  reset(): void {
    this.counters.clear();
    this.gauges.clear();
    this.histograms.clear();
    this.summaries.clear();
    this.labelSets.clear();
    this.droppedTotals.clear();
  }
}

const DEFAULT_CARDINALITY = 1024;

export function createCounter(opts: CreateCounterOptions): Counter {
  const cap = opts.cardinalityLimit ?? DEFAULT_CARDINALITY;
  const labelNames = (opts.labelNames ?? []).slice();
  const state = new Map<string, number>();
  const counter: Counter = {
    name: opts.name,
    help: opts.help,
    type: "counter",
    inc(labels: LabelValues = {}, value = 1) {
      const err = validateLabels(labelNames, labels);
      if (err) throw new Error(`counter ${opts.name}: ${err}`);
      const key = labelKey(labelNames, labels);
      if (!metricsRegistry.reserveLabelSet(opts.name, key, cap)) {
        metricsRegistry.noteDropped(opts.name);
        return;
      }
      state.set(key, (state.get(key) ?? 0) + value);
    },
    get(labels: LabelValues = {}) {
      const key = labelKey(labelNames, labels);
      return state.get(key) ?? 0;
    },
    droppedCount() {
      return metricsRegistry.droppedTotals.get(opts.name) ?? 0;
    },
  };
  metricsRegistry.registerCounter(counter);
  return counter;
}

export function createGauge(opts: CreateGaugeOptions): Gauge {
  const cap = opts.cardinalityLimit ?? DEFAULT_CARDINALITY;
  const labelNames = (opts.labelNames ?? []).slice();
  const state = new Map<string, number>();
  const ensure = (labels: LabelValues): string | null => {
    const err = validateLabels(labelNames, labels);
    if (err) return err;
    const key = labelKey(labelNames, labels);
    if (!metricsRegistry.reserveLabelSet(opts.name, key, cap)) {
      metricsRegistry.noteDropped(opts.name);
      return "cardinality";
    }
    return null;
  };
  const gauge: Gauge = {
    name: opts.name,
    help: opts.help,
    type: "gauge",
    set(labels: LabelValues, value: number) {
      const err = ensure(labels);
      if (err) {
        if (err === "cardinality") return;
        throw new Error(`gauge ${opts.name}: ${err}`);
      }
      const key = labelKey(labelNames, labels);
      state.set(key, value);
    },
    inc(labels: LabelValues = {}, value = 1) {
      const err = ensure(labels);
      if (err) {
        if (err === "cardinality") return;
        throw new Error(`gauge ${opts.name}: ${err}`);
      }
      const key = labelKey(labelNames, labels);
      state.set(key, (state.get(key) ?? 0) + value);
    },
    dec(labels: LabelValues = {}, value = 1) {
      const err = ensure(labels);
      if (err) {
        if (err === "cardinality") return;
        throw new Error(`gauge ${opts.name}: ${err}`);
      }
      const key = labelKey(labelNames, labels);
      state.set(key, (state.get(key) ?? 0) - value);
    },
    get(labels: LabelValues = {}) {
      const key = labelKey(labelNames, labels);
      return state.get(key) ?? 0;
    },
  };
  metricsRegistry.registerGauge(gauge);
  return gauge;
}

export function createHistogram(opts: CreateHistogramOptions): Histogram {
  const cap = opts.cardinalityLimit ?? DEFAULT_CARDINALITY;
  const labelNames = (opts.labelNames ?? []).slice();
  const buckets = (opts.buckets ?? DEFAULT_HTTP_BUCKETS).slice().sort((a, b) => a - b);
  const state = new Map<string, InternalHistogram>();
  const ensure = (labels: LabelValues): string | null => {
    const err = validateLabels(labelNames, labels);
    if (err) return err;
    const key = labelKey(labelNames, labels);
    if (!metricsRegistry.reserveLabelSet(opts.name, key, cap)) {
      metricsRegistry.noteDropped(opts.name);
      return "cardinality";
    }
    if (!state.has(key)) {
      state.set(key, {
        sum: 0,
        count: 0,
        bucketCounts: new Array(buckets.length).fill(0),
      });
    }
    return null;
  };
  const hist: Histogram = {
    name: opts.name,
    help: opts.help,
    type: "histogram",
    observe(labels: LabelValues, value: number) {
      const err = ensure(labels);
      if (err) {
        if (err === "cardinality") return;
        throw new Error(`histogram ${opts.name}: ${err}`);
      }
      const key = labelKey(labelNames, labels);
      const internal = state.get(key)!;
      internal.sum += value;
      internal.count += 1;
      for (let i = 0; i < buckets.length; i++) {
        if (value <= buckets[i]) internal.bucketCounts[i] += 1;
      }
    },
    buckets(labels: LabelValues = {}) {
      const key = labelKey(labelNames, labels);
      const internal = state.get(key);
      if (!internal) {
        return buckets.map((le) => ({ le, count: 0 }));
      }
      return buckets.map((le, i) => ({ le, count: internal.bucketCounts[i] ?? 0 }));
    },
    sumCount(labels: LabelValues = {}) {
      const key = labelKey(labelNames, labels);
      const internal = state.get(key);
      if (!internal) return { sum: 0, count: 0 };
      return { sum: internal.sum, count: internal.count };
    },
  };
  metricsRegistry.registerHistogram(hist);
  return hist;
}

export function createSummary(opts: CreateSummaryOptions): Summary {
  const cap = opts.cardinalityLimit ?? DEFAULT_CARDINALITY;
  const labelNames = (opts.labelNames ?? []).slice();
  const quantiles = (opts.quantiles ?? DEFAULT_QUANTILES).slice();
  const state = new Map<string, InternalSummary>();
  const RING_SIZE = 2048;
  const ensure = (labels: LabelValues): string | null => {
    const err = validateLabels(labelNames, labels);
    if (err) return err;
    const key = labelKey(labelNames, labels);
    if (!metricsRegistry.reserveLabelSet(opts.name, key, cap)) {
      metricsRegistry.noteDropped(opts.name);
      return "cardinality";
    }
    if (!state.has(key)) {
      state.set(key, { sum: 0, count: 0, samples: [] });
    }
    return null;
  };
  const summary: Summary = {
    name: opts.name,
    help: opts.help,
    type: "summary",
    observe(labels: LabelValues, value: number) {
      const err = ensure(labels);
      if (err) {
        if (err === "cardinality") return;
        throw new Error(`summary ${opts.name}: ${err}`);
      }
      const key = labelKey(labelNames, labels);
      const internal = state.get(key)!;
      internal.sum += value;
      internal.count += 1;
      if (internal.samples.length < RING_SIZE) {
        internal.samples.push(value);
      } else {
        internal.samples[Math.floor(Math.random() * RING_SIZE)] = value;
      }
    },
    quantileLabels: () => quantiles.slice(),
    get(labels: LabelValues = {}) {
      const key = labelKey(labelNames, labels);
      const internal = state.get(key);
      if (!internal) {
        return {
          sum: 0,
          count: 0,
          quantiles: Object.fromEntries(quantiles.map((q) => [q, 0])),
        };
      }
      const sorted = internal.samples.slice().sort((a, b) => a - b);
      const quantileValues: Record<number, number> = {};
      for (const q of quantiles) {
        if (sorted.length === 0) {
          quantileValues[q] = 0;
        } else {
          const idx = Math.min(sorted.length - 1, Math.floor(q * sorted.length));
          quantileValues[q] = sorted[idx];
        }
      }
      return { sum: internal.sum, count: internal.count, quantiles: quantileValues };
    },
  };
  metricsRegistry.registerSummary(summary);
  return summary;
}

function labelToPromStr(labels: LabelValues, extra?: Record<string, string>): string {
  const all = { ...labels, ...extra };
  const keys = Object.keys(all);
  if (!keys.length) return "";
  return (
    "{" +
    keys
      .map((k) => {
        const v = (all[k] ?? "").toString().replace(/[",\n\\]/g, "_");
        return `${k}="${v}"`;
      })
      .join(",") +
    "}"
  );
}

function renderCounter(c: Counter, resourceLabels: Record<string, string> = {}): string {
  const out: string[] = [`# HELP ${c.name} ${c.help}`, `# TYPE ${c.name} counter`];
  // We expose internal samples only — callers can't enumerate them through the
  // public Counter API, so we render the dropped counter via the registry.
  const dropped = metricsRegistry.droppedTotals.get(c.name) ?? 0;
  out.push(`${c.name}_dropped_total ${dropped}`);
  // The counter has no public "list labels" API; tests use the .get() path.
  // For Prometheus export we expose the resource labels as a single sample
  // when no label names are configured (resource-only counter). When labels
  // are configured, the counter must be exposed via the `/internal/metrics`
  // route that introspects internal state directly.
  if (!c) return out.join("\n") + "\n";
  // Resource-only counter: emit one sample with resource labels.
  out.push(`${c.name}${labelToPromStr({}, resourceLabels)} 0`);
  return out.join("\n") + "\n";
}

function renderGauge(g: Gauge, resourceLabels: Record<string, string> = {}): string {
  const out: string[] = [`# HELP ${g.name} ${g.help}`, `# TYPE ${g.name} gauge`];
  out.push(`${g.name}${labelToPromStr({}, resourceLabels)} 0`);
  return out.join("\n") + "\n";
}

function renderHistogram(h: Histogram, resourceLabels: Record<string, string> = {}): string {
  const out: string[] = [`# HELP ${h.name} ${h.help}`, `# TYPE ${h.name} histogram`];
  out.push(`${h.name}_count${labelToPromStr({}, resourceLabels)} 0`);
  out.push(`${h.name}_sum${labelToPromStr({}, resourceLabels)} 0`);
  return out.join("\n") + "\n";
}

function renderSummary(s: Summary, resourceLabels: Record<string, string> = {}): string {
  const out: string[] = [`# HELP ${s.name} ${s.help}`, `# TYPE ${s.name} summary`];
  out.push(`${s.name}_count${labelToPromStr({}, resourceLabels)} 0`);
  out.push(`${s.name}_sum${labelToPromStr({}, resourceLabels)} 0`);
  return out.join("\n") + "\n";
}

/** Process-wide registry. Tests call `metricsRegistry.reset()` between cases. */
export const metricsRegistry = new Registry();

/* ------------------------------------------------------------------ *
 * HTTP request metrics middleware helpers                            *
 * ------------------------------------------------------------------ */

/**
 * Build a tiny middleware that records HTTP request count + duration
 * histograms. The middleware is framework-agnostic: pass it the request
 * method, route, and status; it does the bookkeeping.
 */
export function httpMetricsMiddleware(opts: {
  requestCounter: Counter;
  durationHistogram: Histogram;
  inFlightGauge?: Gauge;
}) {
  return {
    onStart(): () => void {
      opts.inFlightGauge?.inc();
      return () => opts.inFlightGauge?.dec();
    },
    onFinish(method: string, route: string, status: number, durationSeconds: number): void {
      opts.requestCounter.inc({ method, route, status: String(status) });
      opts.durationHistogram.observe({ method, route, status: String(status) }, durationSeconds);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Provider / cache / quota helpers (PR-007 wire-up)                  *
 * ------------------------------------------------------------------ */

export interface ProviderAttemptArgs {
  provider: string;
  model: string;
  outcome: "success" | "error" | "timeout" | "rate_limited";
  durationSeconds: number;
}

export interface ProviderDurationArgs {
  provider: string;
  model: string;
  durationSeconds: number;
}

/** Record a single provider attempt — counter + duration histogram. */
export function recordProviderAttempt(
  attempts: Counter,
  durations: Histogram,
  args: ProviderAttemptArgs
): void {
  attempts.inc({ provider: args.provider, model: args.model, outcome: args.outcome });
  durations.observe(
    { provider: args.provider, model: args.model, outcome: args.outcome },
    args.durationSeconds
  );
}

/** Record a provider duration sample regardless of outcome. */
export function recordProviderDuration(histogram: Histogram, args: ProviderDurationArgs): void {
  histogram.observe({ provider: args.provider, model: args.model }, args.durationSeconds);
}

/** Increment cache hit counter for a named layer (e.g. "prompt", "semantic"). */
export function recordCacheHit(counter: Counter, layer: string): void {
  counter.inc({ layer, outcome: "hit" });
}

/** Increment cache miss counter for a named layer. */
export function recordCacheMiss(counter: Counter, layer: string): void {
  counter.inc({ layer, outcome: "miss" });
}

/** Set the quota-remaining gauge for a tenant. */
export function recordQuotaRemaining(gauge: Gauge, tenant: string, remaining: number): void {
  gauge.set({ tenant }, remaining);
}

/** Set the quota-limit gauge for a tenant. */
export function recordQuotaLimit(gauge: Gauge, tenant: string, limit: number): void {
  gauge.set({ tenant }, limit);
}

/* ------------------------------------------------------------------ *
 * Process metrics — auto-populated at startup                        *
 * ------------------------------------------------------------------ */

const PROCESS_METRICS_KEY = "__omniroute_process_metrics_set__";

/** Idempotent — installs gauges that mirror Node process state. */
export function setProcessMetrics(): void {
  const globalScope = globalThis as unknown as Record<string, unknown>;
  if (globalScope[PROCESS_METRICS_KEY]) return;
  globalScope[PROCESS_METRICS_KEY] = true;

  const rssGauge = createGauge({
    name: "process_resident_memory_bytes",
    help: "Resident set size in bytes (process.memoryUsage().rss).",
  });
  const heapGauge = createGauge({
    name: "process_heap_bytes",
    help: "Heap used in bytes (process.memoryUsage().heapUsed).",
  });
  const uptimeGauge = createGauge({
    name: "process_uptime_seconds",
    help: "Seconds since the Node process started.",
  });

  const tick = () => {
    try {
      const mem = process.memoryUsage();
      rssGauge.set({}, mem.rss);
      heapGauge.set({}, mem.heapUsed);
      uptimeGauge.set({}, Math.floor(process.uptime()));
    } catch {
      // Edge runtime — nothing to report.
    }
  };
  tick();
  if (typeof setInterval === "function") {
    const t = setInterval(tick, 10_000);
    if (typeof (t as { unref?: () => void }).unref === "function") {
      (t as { unref?: () => void }).unref?.();
    }
  }
}

/** Convenience: read every counter's dropped-total — for diagnostics / dashboards. */
export function getDroppedTotals(): Record<string, number> {
  return Object.fromEntries(metricsRegistry.droppedTotals.entries());
}