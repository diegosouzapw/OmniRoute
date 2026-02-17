/**
 * Request Telemetry — FASE-09 E2E Hardening (T-45)
 *
 * Measures 7 phases of a request lifecycle and stores timings
 * for percentile calculations and monitoring.
 *
 * Phases: parse → validate → policy → resolve → connect → stream → finalize
 *
 * @module shared/utils/requestTelemetry
 */

interface PhaseTiming {
  phase: string;
  startMs: number;
  endMs: number;
  durationMs: number;
  [key: string]: unknown;
}

const PHASES = ["parse", "validate", "policy", "resolve", "connect", "stream", "finalize"] as const;

interface TelemetrySummary {
  requestId: string;
  totalMs: number;
  phases: PhaseTiming[];
  recordedAt?: number;
}

export class RequestTelemetry {
  requestId: string;
  startTime: number;
  phases: PhaseTiming[];
  private _currentPhase: string | null;
  private _phaseStart: number | null;

  constructor(requestId: string) {
    this.requestId = requestId;
    this.startTime = Date.now();
    this.phases = [];
    this._currentPhase = null;
    this._phaseStart = null;
  }

  /**
   * Begin a phase measurement.
   * @param {string} phase
   */
  startPhase(phase) {
    if (this._currentPhase) {
      this.endPhase();
    }
    this._currentPhase = phase;
    this._phaseStart = Date.now();
  }

  /**
   * End the current phase measurement.
   * @param {Object} [metadata] - Additional metadata
   */
  endPhase(metadata = {}) {
    if (!this._currentPhase) return;

    const now = Date.now();
    this.phases.push({
      phase: this._currentPhase,
      startMs: this._phaseStart - this.startTime,
      endMs: now - this.startTime,
      durationMs: now - this._phaseStart,
      ...metadata,
    });

    this._currentPhase = null;
    this._phaseStart = null;
  }

  /**
   * Convenience: measure an async function as a phase.
   * @template T
   * @param {string} phase
   * @param {() => Promise<T>} fn
   * @returns {Promise<T>}
   */
  async measure(phase, fn) {
    this.startPhase(phase);
    try {
      const result = await fn();
      this.endPhase();
      return result;
    } catch (error) {
      this.endPhase({ error: error.message });
      throw error;
    }
  }

  /**
   * Get the full telemetry summary.
   * @returns {{ requestId: string, totalMs: number, phases: PhaseTiming[] }}
   */
  getSummary() {
    // Auto-end any open phase
    if (this._currentPhase) {
      this.endPhase();
    }

    return {
      requestId: this.requestId,
      totalMs: Date.now() - this.startTime,
      phases: [...this.phases],
    };
  }
}

// ─── Telemetry Aggregator ────────────────────────

const MAX_HISTORY = 1000;
/** @type {Array<{ requestId: string, totalMs: number, phases: PhaseTiming[] }>} */
const history = [];

/**
 * Record a completed request's telemetry.
 * @param {RequestTelemetry} telemetry
 */
export function recordTelemetry(telemetry) {
  const summary = telemetry.getSummary();
  summary.recordedAt = Date.now();
  history.push(summary);
  while (history.length > MAX_HISTORY) {
    history.shift();
  }
}

/**
 * Calculate percentile from sorted array.
 * @param {number[]} sorted
 * @param {number} p - Percentile (0-100)
 * @returns {number}
 */
function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

/**
 * Get aggregated telemetry summary for monitoring.
 * @param {number} [windowMs=300000] - Time window (default 5 min)
 * @returns {{ count: number, p50: number, p95: number, p99: number, phaseBreakdown: Object }}
 */
export function getTelemetrySummary(windowMs = 300000) {
  const cutoff = Date.now() - windowMs;
  const recent = history.filter((h) => {
    return (h.recordedAt || 0) >= cutoff;
  });

  if (recent.length === 0) {
    return { count: 0, p50: 0, p95: 0, p99: 0, phaseBreakdown: {} };
  }

  const totals = recent.map((h) => h.totalMs).sort((a, b) => a - b);

  // Phase breakdown
  const phaseBreakdown = {};
  for (const phase of PHASES) {
    const durations = recent
      .flatMap((h) => h.phases.filter((p) => p.phase === phase).map((p) => p.durationMs))
      .sort((a, b) => a - b);

    if (durations.length > 0) {
      phaseBreakdown[phase] = {
        count: durations.length,
        p50: percentile(durations, 50),
        p95: percentile(durations, 95),
        avg: Math.round(durations.reduce((a, b) => a + b, 0) / durations.length),
      };
    }
  }

  return {
    count: recent.length,
    p50: percentile(totals, 50),
    p95: percentile(totals, 95),
    p99: percentile(totals, 99),
    phaseBreakdown,
  };
}

export { PHASES };
