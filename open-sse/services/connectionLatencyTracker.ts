/**
 * Per-connection rolling latency tracker (opt-in p2c latency signal).
 *
 * Every dispatched upstream attempt reports its time-to-first-byte (the time until the
 * upstream response headers resolved) and whether it succeeded. The tracker keeps a short,
 * time-bounded window per connection and per connection+model, in memory only, so p2c
 * account selection can prefer the connection that is currently faster.
 *
 * The signal is read only when `resilienceSettings.p2cLatency.weight > 0` (default 0), so
 * account selection is unchanged until an operator opts in. Failing accounts are still
 * handled by the connection cooldown, model lockout and provider breaker layers; this
 * module adds no circuit of its own.
 *
 * Fail-open: nothing here throws into the request path. Recording is O(window), never
 * touches the DB and is never awaited.
 */

/** Outcomes kept per key. */
export const LATENCY_WINDOW_SIZE = 20;
/** Samples older than this are ignored, so routing follows current conditions. */
export const LATENCY_SAMPLE_TTL_MS = 15 * 60 * 1000;
/** Below this many samples a connection is unproven and takes no latency penalty. */
export const LATENCY_MIN_SAMPLES = 3;
/** Keys retained before the least recently written ones are evicted. */
export const LATENCY_MAX_KEYS = 500;

const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";
const MODEL_KEY_SEPARATOR = "::";

interface LatencySample {
  ok: boolean;
  ttfbMs: number;
  at: number;
}

export interface ConnectionLatencyStats {
  samples: number;
  successes: number;
  errorRate: number;
  avgTtfbMs: number;
  p95TtfbMs: number;
  /** True when the stats come from the model-scoped window. */
  scoped: boolean;
}

type LatencyStore = Map<string, LatencySample[]>;

// globalThis survives Next.js dev module reloads, so every importer shares one store.
const STORE_KEY = "__omnirouteConnectionLatencyStore";
const globalScope = globalThis as typeof globalThis & { [STORE_KEY]?: LatencyStore };

function getStore(): LatencyStore {
  if (!globalScope[STORE_KEY]) globalScope[STORE_KEY] = new Map();
  return globalScope[STORE_KEY];
}

function buildKey(connectionId: string, model: string | null): string {
  return model ? `${connectionId}${MODEL_KEY_SEPARATOR}${model}` : connectionId;
}

/** Drop samples outside the TTL. Samples are appended in time order, so trim the head. */
function pruneExpired(samples: LatencySample[], now: number): LatencySample[] {
  const cutoff = now - LATENCY_SAMPLE_TTL_MS;
  let firstValid = 0;
  while (firstValid < samples.length && samples[firstValid].at < cutoff) firstValid++;
  if (firstValid > 0) samples.splice(0, firstValid);
  return samples;
}

/**
 * Record one completed upstream attempt for a connection. Writes the connection-level
 * window and, when a model is given, the connection+model window.
 */
export function recordConnectionOutcome(
  connectionId: string | null | undefined,
  model: string | null | undefined,
  ttfbMs: number,
  ok: boolean
): void {
  try {
    if (!connectionId || connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID) return;
    const store = getStore();
    const now = Date.now();
    const sample: LatencySample = {
      ok: ok === true,
      ttfbMs: Number.isFinite(ttfbMs) && ttfbMs >= 0 ? ttfbMs : 0,
      at: now,
    };
    const keys = model
      ? [buildKey(connectionId, null), buildKey(connectionId, model)]
      : [connectionId];
    for (const key of keys) {
      const samples = pruneExpired(store.get(key) ?? [], now);
      samples.push(sample);
      if (samples.length > LATENCY_WINDOW_SIZE) {
        samples.splice(0, samples.length - LATENCY_WINDOW_SIZE);
      }
      // Re-insert so Map iteration order tracks the least recently written key.
      store.delete(key);
      store.set(key, samples);
    }
    while (store.size > LATENCY_MAX_KEYS) {
      const oldest = store.keys().next().value;
      if (oldest === undefined) break;
      store.delete(oldest);
    }
  } catch {
    // Latency telemetry is best-effort; it must never break the request path.
  }
}

function summarize(samples: LatencySample[] | undefined, scoped: boolean): ConnectionLatencyStats {
  const live = samples ? pruneExpired(samples, Date.now()) : [];
  // Latency is measured on successful calls only: a fast 401 is not a fast account.
  const okLatencies = live.filter((s) => s.ok).map((s) => s.ttfbMs);
  const successes = okLatencies.length;
  const sorted = [...okLatencies].sort((a, b) => a - b);
  const p95Index = Math.min(sorted.length - 1, Math.floor(0.95 * sorted.length));
  return {
    samples: live.length,
    successes,
    errorRate: live.length > 0 ? (live.length - successes) / live.length : 0,
    avgTtfbMs:
      successes > 0 ? Math.round(okLatencies.reduce((sum, ms) => sum + ms, 0) / successes) : 0,
    p95TtfbMs: sorted.length > 0 ? Math.round(sorted[p95Index]) : 0,
    scoped,
  };
}

/**
 * Rolling stats for a connection. Prefers the model-scoped window once it has
 * LATENCY_MIN_SAMPLES samples, otherwise falls back to the connection-level window.
 */
export function getConnectionLatencyStats(
  connectionId: string,
  model: string | null = null
): ConnectionLatencyStats {
  const store = getStore();
  if (model) {
    const scoped = summarize(store.get(buildKey(connectionId, model)), true);
    if (scoped.samples >= LATENCY_MIN_SAMPLES) return scoped;
  }
  return summarize(store.get(buildKey(connectionId, null)), false);
}

/**
 * Latency penalties for a p2c pair, in score points (lower is better), bounded by `weight`.
 *
 * Latency is normalized as a ratio to the faster candidate of the pair, not min-max: a
 * min-max scale would score a 110ms account as maximally slow next to a 100ms one and let
 * trivial gaps outweigh real failures. An account twice as slow takes the full latency
 * share. The rolling error rate is the other half, so a fast account that fails often does
 * not win on speed alone. Returns [0, 0] when the weight is 0 or either candidate has
 * fewer than LATENCY_MIN_SAMPLES samples, so new accounts are not penalized.
 */
export function getP2CLatencyPenalties(
  aConnectionId: string,
  bConnectionId: string,
  model: string | null,
  weight: number
): [number, number] {
  try {
    if (!(weight > 0)) return [0, 0];
    const a = getConnectionLatencyStats(aConnectionId, model);
    const b = getConnectionLatencyStats(bConnectionId, model);
    if (a.samples < LATENCY_MIN_SAMPLES || b.samples < LATENCY_MIN_SAMPLES) return [0, 0];
    const positive = [a.avgTtfbMs, b.avgTtfbMs].filter((ms) => ms > 0);
    const fastest = positive.length > 0 ? Math.min(...positive) : 0;
    const penalty = (stats: ConnectionLatencyStats) => {
      const ratio = fastest > 0 && stats.avgTtfbMs > fastest ? stats.avgTtfbMs / fastest : 1;
      return (weight * (Math.min(1, ratio - 1) + stats.errorRate)) / 2;
    };
    return [penalty(a), penalty(b)];
  } catch {
    return [0, 0];
  }
}

/** Clear every window (tests and operator resets). */
export function resetConnectionLatencyTracker(): void {
  getStore().clear();
}
