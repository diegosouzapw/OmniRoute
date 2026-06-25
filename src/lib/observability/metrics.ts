/**
 * Prometheus metrics registry (PR-003).
 *
 * Implements the RED method (Rate, Errors, Duration) + a curated set of
 * domain-specific counters that map directly to the operator dashboards in
 * `dashboards/omniroute-overview.json`.
 *
 * No npm dependency — we implement the Prometheus text-exposition format
 * directly. Output is line-oriented and matches `prom-client`'s grammar so
 * the upstream Grafana dashboards work unchanged.
 *
 * Cardinality is a real footgun. Every helper that accepts a label enforces
 * an explicit allow-list (see {@link LABEL_ALLOWLIST}). A metric label not in
 * the allow-list is rejected at runtime, with a console warning, so a typo
 * doesn't silently explode the time-series count.
 *
 * @see https://prometheus.io/docs/instrumenting/exposition_formats/
 */

import type { AttributeValue } from "./spanTypes";

// ───────────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────────

/** Prometheus metric types — only what we actually emit. */
export type MetricKind = "counter" | "gauge" | "histogram";

/** A single label key/value pair. Values are coerced to strings for OTLP/Prom. */
export interface MetricLabel {
  name: string;
  value: string;
}

/** Internal representation of one metric family. */
interface MetricFamily {
  name: string;
  help: string;
  kind: MetricKind;
  /** Names of allowed label keys (order matters for stable exposition). */
  labelNames: readonly string[];
  /**
   * For counter/gauge: keyed by serialized label set.
   * For histogram: keyed by serialized label set; value holds bucket counts.
   */
  values: Map<string, MetricSeries>;
}

/** One series within a metric family (one label-set combination). */
interface MetricSeries {
  /** Counter / Gauge value. */
  value?: number;
  /** Histogram bucket counts keyed by upper bound (string, like "0.005"). */
  buckets?: Map<string, number>;
  /** Total observation count for histograms. */
  count?: number;
  /** Sum of all observations for histograms. */
  sum?: number;
  /** Optional label set actually observed (for debugging). */
  labels?: Record<string, string>;
}

// ───────────────────────────────────────────────────────────────────────────
// Label allow-list
// ───────────────────────────────────────────────────────────────────────────

/**
 * Allowed label keys, grouped by metric family. Any label not declared here
 * is rejected at registration time. This caps cardinality at the design
 * surface — operators cannot accidentally blow up the time-series count by
 * passing random model names.
 */
const LABEL_ALLOWLIST = {
  omniroute_http_requests_total: ["route", "method", "status"],
  omniroute_http_request_duration_seconds: ["route", "method"],
  omniroute_provider_upstream_attempts_total: ["provider", "model", "outcome"],
  omniroute_provider_upstream_duration_seconds: ["provider", "model", "outcome"],
  omniroute_provider_tokens_total: ["provider", "model", "direction"],
  omniroute_cache_hits_total: ["layer"],
  omniroute_cache_misses_total: ["layer"],
  omniroute_quota_remaining: ["provider", "model"],
  omniroute_quota_limit: ["provider", "model"],
} as const;

type AllowedLabel<F extends keyof typeof LABEL_ALLOWLIST> =
  (typeof LABEL_ALLOWLIST)[F][number];

// ───────────────────────────────────────────────────────────────────────────
// Default histogram buckets (seconds)
// ───────────────────────────────────────────────────────────────────────────

const HTTP_DURATION_BUCKETS = [
  0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10,
] as const;

const UPSTREAM_DURATION_BUCKETS = [
  0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30, 60, 120,
] as const;

// ───────────────────────────────────────────────────────────────────────────
// Registry
// ───────────────────────────────────────────────────────────────────────────

const families = new Map<string, MetricFamily>();

function ensureFamily(name: keyof typeof LABEL_ALLOWLIST, help: string, kind: MetricKind, buckets?: readonly number[]): MetricFamily {
  let family = families.get(name);
  if (family) {
    if (family.kind !== kind) {
      throw new Error(`metric family ${name} already registered as ${family.kind}, requested ${kind}`);
    }
    return family;
  }
  family = {
    name,
    help,
    kind,
    labelNames: LABEL_ALLOWLIST[name] ?? [],
    values: new Map(),
  };
  if (kind === "histogram") {
    family.values.set("", makeHistogramSeries(buckets ?? HTTP_DURATION_BUCKETS));
  }
  families.set(name, family);
  return family;
}

function makeHistogramSeries(buckets: readonly number[]): MetricSeries {
  const map = new Map<string, number>();
  for (const b of buckets) map.set(b.toString(), 0);
  return { buckets: map, count: 0, sum: 0, labels: {} };
}

function labelKey(labels: Record<string, string | number | boolean>): string {
  const keys = Object.keys(labels).sort();
  if (keys.length === 0) return "";
  return keys.map((k) => `${k}=${String(labels[k])}`).join(",");
}

/** Reject any label not in the allow-list. Returns the coerced string set. */
function validateLabels<F extends keyof typeof LABEL_ALLOWLIST>(
  familyName: F,
  raw: Record<string, string | number | boolean | undefined>
): Record<string, string> {
  const allowed = LABEL_ALLOWLIST[familyName] as readonly string[];
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v === undefined || v === null) continue;
    if (!allowed.includes(k)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[metrics] rejected unknown label '${k}' for metric '${familyName}'. ` +
          `Allowed labels: ${allowed.join(", ")}`
      );
      continue;
    }
    out[k] = String(v);
  }
  return out;
}

// ───────────────────────────────────────────────────────────────────────────
// Public API
// ───────────────────────────────────────────────────────────────────────────

/** Expose the registry for the `/metrics` handler. */
export const metricsRegistry = {
  /** Render all families in Prometheus text-exposition format. */
  render(): string {
    const lines: string[] = [];
    for (const family of families.values()) {
      lines.push(`# HELP ${family.name} ${family.help}`);
      lines.push(`# TYPE ${family.name} ${family.kind}`);
      const labelNames = family.labelNames;
      for (const series of family.values.values()) {
        const labelStr = renderLabels(labelNames, series.labels ?? {});
        if (family.kind === "histogram") {
          for (const [upper, count] of series.buckets!.entries()) {
            const bucketLabels = { ...(series.labels ?? {}), le: upper };
            lines.push(`${family.name}_bucket${formatLabels([...labelNames, "le"], bucketLabels)} ${count}`);
          }
          // +Inf bucket — count == total observations.
          const infLabels = { ...(series.labels ?? {}), le: "+Inf" };
          lines.push(`${family.name}_bucket${formatLabels([...labelNames, "le"], infLabels)} ${series.count ?? 0}`);
          lines.push(`${family.name}_count${labelStr} ${series.count ?? 0}`);
          lines.push(`${family.name}_sum${labelStr} ${series.sum ?? 0}`);
        } else {
          lines.push(`${family.name}${labelStr} ${series.value ?? 0}`);
        }
      }
    }
    return `${lines.join("\n")}\n`;
  },
  /** Wipe every series. Test-only escape hatch. */
  reset(): void {
    for (const f of families.values()) f.values.clear();
    families.clear();
  },
};

/** Record one HTTP request (counter + duration histogram). */
export function httpMetricsMiddleware(opts: {
  route: string;
  method: string;
  status: number;
  durationSeconds: number;
}): void {
  const counterFamily = ensureFamily(
    "omniroute_http_requests_total",
    "Total HTTP requests handled by OmniRoute.",
    "counter"
  );
  const histogramFamily = ensureFamily(
    "omniroute_http_request_duration_seconds",
    "HTTP request duration in seconds (RED method Duration).",
    "histogram",
    HTTP_DURATION_BUCKETS
  );

  const counterLabels = validateLabels("omniroute_http_requests_total", {
    route: opts.route,
    method: opts.method,
    status: opts.status,
  });
  const key = labelKey(counterLabels);
  let series = counterFamily.values.get(key);
  if (!series) {
    series = { value: 0, labels: counterLabels };
    counterFamily.values.set(key, series);
  }
  series.value = (series.value ?? 0) + 1;

  const histLabels = validateLabels("omniroute_http_request_duration_seconds", {
    route: opts.route,
    method: opts.method,
  });
  const hkey = labelKey(histLabels);
  let hseries = histogramFamily.values.get(hkey);
  if (!hseries) {
    hseries = makeHistogramSeries(HTTP_DURATION_BUCKETS);
    hseries.labels = histLabels;
    histogramFamily.values.set(hkey, hseries);
  }
  for (const bucket of HTTP_DURATION_BUCKETS) {
    if (opts.durationSeconds <= bucket) {
      hseries.buckets!.set(bucket.toString(), (hseries.buckets!.get(bucket.toString()) ?? 0) + 1);
    }
  }
  hseries.count = (hseries.count ?? 0) + 1;
  hseries.sum = (hseries.sum ?? 0) + opts.durationSeconds;
}

/** Record one upstream provider attempt (counter + duration histogram). */
export function recordProviderAttempt(opts: {
  provider: string;
  model: string;
  outcome: "success" | "error" | "timeout" | "cancelled";
  durationSeconds: number;
}): void {
  const counterFamily = ensureFamily(
    "omniroute_provider_upstream_attempts_total",
    "Total upstream provider attempts by outcome.",
    "counter"
  );
  const histogramFamily = ensureFamily(
    "omniroute_provider_upstream_duration_seconds",
    "Upstream provider call duration in seconds.",
    "histogram",
    UPSTREAM_DURATION_BUCKETS
  );

  const counterLabels = validateLabels("omniroute_provider_upstream_attempts_total", {
    provider: opts.provider,
    model: opts.model,
    outcome: opts.outcome,
  });
  const key = labelKey(counterLabels);
  let series = counterFamily.values.get(key);
  if (!series) {
    series = { value: 0, labels: counterLabels };
    counterFamily.values.set(key, series);
  }
  series.value = (series.value ?? 0) + 1;

  const histLabels = validateLabels("omniroute_provider_upstream_duration_seconds", {
    provider: opts.provider,
    model: opts.model,
    outcome: opts.outcome,
  });
  const hkey = labelKey(histLabels);
  let hseries = histogramFamily.values.get(hkey);
  if (!hseries) {
    hseries = makeHistogramSeries(UPSTREAM_DURATION_BUCKETS);
    hseries.labels = histLabels;
    histogramFamily.values.set(hkey, hseries);
  }
  for (const bucket of UPSTREAM_DURATION_BUCKETS) {
    if (opts.durationSeconds <= bucket) {
      hseries.buckets!.set(bucket.toString(), (hseries.buckets!.get(bucket.toString()) ?? 0) + 1);
    }
  }
  hseries.count = (hseries.count ?? 0) + 1;
  hseries.sum = (hseries.sum ?? 0) + opts.durationSeconds;
}

/** Convenience wrapper for code that wants to split the two operations. */
export function recordProviderDuration(opts: {
  provider: string;
  model: string;
  outcome: "success" | "error" | "timeout" | "cancelled";
  durationSeconds: number;
}): void {
  recordProviderAttempt(opts);
}

/** Record remaining quota for a provider/model pair (gauge). */
export function recordQuotaRemaining(provider: string, model: string, remaining: number): void {
  const family = ensureFamily(
    "omniroute_quota_remaining",
    "Quota remaining for a provider/model pair (gauge).",
    "gauge"
  );
  const labels = validateLabels("omniroute_quota_remaining", { provider, model });
  const key = labelKey(labels);
  let series = family.values.get(key);
  if (!series) {
    series = { value: remaining, labels };
    family.values.set(key, series);
  } else {
    series.value = remaining;
  }
}

/** Record a quota limit (gauge; set once per minute by the quota refresh). */
export function recordQuotaLimit(provider: string, model: string, limit: number): void {
  const family = ensureFamily(
    "omniroute_quota_limit",
    "Quota limit for a provider/model pair (gauge).",
    "gauge"
  );
  const labels = validateLabels("omniroute_quota_limit", { provider, model });
  const key = labelKey(labels);
  let series = family.values.get(key);
  if (!series) {
    series = { value: limit, labels };
    family.values.set(key, series);
  } else {
    series.value = limit;
  }
}

/** Record a cache hit (counter). */
export function recordCacheHit(layer: "memory" | "disk" | "prompt" | "provider"): void {
  const family = ensureFamily("omniroute_cache_hits_total", "Cache hits by layer.", "counter");
  const labels = validateLabels("omniroute_cache_hits_total", { layer });
  const key = labelKey(labels);
  let series = family.values.get(key);
  if (!series) {
    series = { value: 0, labels };
    family.values.set(key, series);
  }
  series.value = (series.value ?? 0) + 1;
}

/** Record a cache miss (counter). */
export function recordCacheMiss(layer: "memory" | "disk" | "prompt" | "provider"): void {
  const family = ensureFamily("omniroute_cache_misses_total", "Cache misses by layer.", "counter");
  const labels = validateLabels("omniroute_cache_misses_total", { layer });
  const key = labelKey(labels);
  let series = family.values.get(key);
  if (!series) {
    series = { value: 0, labels };
    family.values.set(key, series);
  }
  series.value = (series.value ?? 0) + 1;
}

/** Update process metrics (heap, rss, event-loop lag). Called every 15s. */
export function setProcessMetrics(): void {
  const mem = process.memoryUsage();
  // We don't register new families — these are derived. Instead we re-use
  // the standard gauge pattern.
  setGauge("omniroute_process_heap_bytes", "V8 heap used (bytes).", mem.heapUsed);
  setGauge("omniroute_process_resident_bytes", "Resident set size (bytes).", mem.rss);
  const lag = measureEventLoopLagMs();
  setGauge("omniroute_event_loop_lag_seconds", "Event loop lag in seconds (rolling average).", lag / 1000);
}

function setGauge(name: string, help: string, value: number): void {
  // We rely on the registry to track the family; this helper is for
  // process-level gauges that have no labels. Use a private synthetic family.
  const fullName = name as keyof typeof LABEL_ALLOWLIST & string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (LABEL_ALLOWLIST as any)[fullName] = [];
  const family = ensureFamily(fullName, help, "gauge");
  // No-label series — empty string key.
  let series = family.values.get("");
  if (!series) {
    series = { value, labels: {} };
    family.values.set("", series);
  } else {
    series.value = value;
  }
}

function measureEventLoopLagMs(): number {
  // Coarse but free: schedule an immediate and time how long it takes to
  // fire. Averaged across the last 5 samples.
  if (!lagSamples.length) {
    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      setImmediate(() => lagSamples.push(Date.now() - start));
    }
    return 0;
  }
  return lagSamples.reduce((a, b) => a + b, 0) / lagSamples.length;
}

const lagSamples: number[] = [];

// ───────────────────────────────────────────────────────────────────────────
// Output formatting
// ───────────────────────────────────────────────────────────────────────────

function renderLabels(labelNames: readonly string[], labels: Record<string, string>): string {
  if (labelNames.length === 0) return "";
  const pairs = labelNames
    .filter((n) => n in labels)
    .map((n) => `${n}="${escapeLabel(labels[n])}"`)
    .join(",");
  return pairs ? `{${pairs}}` : "";
}

function formatLabels(
  labelNames: readonly string[],
  labels: Record<string, string>
): string {
  const pairs = labelNames.map((n) => `${n}="${escapeLabel(labels[n] ?? "")}"`).join(",");
  return pairs ? `{${pairs}}` : "";
}

function escapeLabel(s: string): string {
  // Per the Prometheus text format spec: escape backslash, double-quote, and
  // newline.
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

// ───────────────────────────────────────────────────────────────────────────
// Re-export for AttributeValue (used by other observability modules)
// ───────────────────────────────────────────────────────────────────────────
export type { AttributeValue };
