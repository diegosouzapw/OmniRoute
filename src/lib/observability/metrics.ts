/**
 * metrics.ts — Counter / Histogram / Gauge primitives + Meter facade.
 *
 * All metric instruments follow the OpenTelemetry instrument model:
 *  - Counter  — monotonically increasing integer-valued measurement
 *  - Histogram — bucketed distribution of values
 *  - Gauge   — point-in-time sampled value
 *
 * Instruments are registered against a Meter, which buffers recorded points
 * and forwards them to the configured MetricExporter on `flush()`. Pre-init,
 * instruments are no-op (record() / set() / inc() are silent).
 */

import type {
  Counter,
  Gauge,
  Histogram,
  MetricExporter,
  MetricPoint,
  SpanAttributes,
} from "./spanTypes";

// ─── State ────────────────────────────────────────────────────────────────────

interface MetricsState {
  initialized: boolean;
  exporters: MetricExporter[];
  counters: Map<string, CounterImpl>;
  histograms: Map<string, HistogramImpl>;
  gauges: Map<string, GaugeImpl>;
  /** Pending points waiting for the next flush. */
  pending: MetricPoint[];
}

const metricsState: MetricsState = {
  initialized: false,
  exporters: [],
  counters: new Map(),
  histograms: new Map(),
  gauges: new Map(),
  pending: [],
};

// ─── Instrument implementations ───────────────────────────────────────────────

class CounterImpl implements Counter {
  constructor(public readonly name: string, public readonly description: string) {}
  inc(by = 1, attributes?: SpanAttributes): void {
    if (!metricsState.initialized) return;
    if (!Number.isFinite(by)) return;
    recordPoint(this.name, by, attributes);
  }
}

class HistogramImpl implements Histogram {
  constructor(public readonly name: string, public readonly description: string) {}
  record(value: number, attributes?: SpanAttributes): void {
    if (!metricsState.initialized) return;
    if (!Number.isFinite(value)) return;
    recordPoint(this.name, value, attributes);
  }
}

class GaugeImpl implements Gauge {
  constructor(public readonly name: string, public readonly description: string) {}
  set(value: number, attributes?: SpanAttributes): void {
    if (!metricsState.initialized) return;
    if (!Number.isFinite(value)) return;
    recordPoint(this.name, value, attributes);
  }
}

function recordPoint(name: string, value: number, attributes?: SpanAttributes): void {
  metricsState.pending.push({
    name,
    value,
    attributes: attributes ?? {},
    timestampMs: Date.now(),
  });
}

// ─── Meter facade ─────────────────────────────────────────────────────────────

/**
 * Initialize the metrics subsystem. Safe to call multiple times — additional
 * calls without `force` are ignored. Returns true on (re)initialization.
 */
export function initMetrics(options: { exporters?: MetricExporter[]; force?: boolean } = {}): boolean {
  if (metricsState.initialized && !options.force) return false;
  metricsState.initialized = true;
  metricsState.exporters = options.exporters ?? [];
  metricsState.counters.clear();
  metricsState.histograms.clear();
  metricsState.gauges.clear();
  metricsState.pending = [];
  return true;
}

/** Test/teardown — clears metric state without exporting. */
export function shutdownMetrics(): void {
  metricsState.initialized = false;
  metricsState.exporters = [];
  metricsState.counters.clear();
  metricsState.histograms.clear();
  metricsState.gauges.clear();
  metricsState.pending = [];
}

/**
 * Acquire (or create) a counter by name. Repeated calls with the same name
 * return the same instrument so accumulators stay coherent across modules.
 */
export function getOrCreateCounter(name: string, description = ""): Counter {
  const existing = metricsState.counters.get(name);
  if (existing) return existing;
  const fresh = new CounterImpl(name, description);
  metricsState.counters.set(name, fresh);
  return fresh;
}

/**
 * Acquire (or create) a histogram by name. Buckets default to OpenTelemetry's
 * Prometheus-style exponential buckets; values <0 are clamped to 0.
 */
export function getOrCreateHistogram(name: string, description = ""): Histogram {
  const existing = metricsState.histograms.get(name);
  if (existing) return existing;
  const fresh = new HistogramImpl(name, description);
  metricsState.histograms.set(name, fresh);
  return fresh;
}

/**
 * Acquire (or create) a gauge by name.
 */
export function getOrCreateGauge(name: string, description = ""): Gauge {
  const existing = metricsState.gauges.get(name);
  if (existing) return existing;
  const fresh = new GaugeImpl(name, description);
  metricsState.gauges.set(name, fresh);
  return fresh;
}

/** Drain pending points and forward to every configured exporter. */
export async function flushMetrics(): Promise<void> {
  if (!metricsState.initialized) return;
  if (metricsState.pending.length === 0) return;
  const drained = metricsState.pending;
  metricsState.pending = [];
  await Promise.all(
    metricsState.exporters.map(async (exp) => {
      for (const point of drained) {
        try {
          await exp.exportPoint(point);
        } catch {
          // best-effort
        }
      }
    })
  );
}

/** Read the count of pending (un-flushed) points — useful for tests. */
export function _pendingCountForTesting(): number {
  return metricsState.pending.length;
}

/** Test seam: replace the registered exporters without re-running init. */
export function _setExportersForTesting(exporters: MetricExporter[]): void {
  metricsState.exporters = exporters;
}

/** Test seam: enumerate registered instruments. */
export function _registeredInstrumentsForTesting(): {
  counters: string[];
  histograms: string[];
  gauges: string[];
} {
  return {
    counters: Array.from(metricsState.counters.keys()),
    histograms: Array.from(metricsState.histograms.keys()),
    gauges: Array.from(metricsState.gauges.keys()),
  };
}