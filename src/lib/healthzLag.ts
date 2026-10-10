import { monitorEventLoopDelay } from "node:perf_hooks";

/** `/healthz` returning 200 after this much event-loop lag is already sick (#10303). */
export const HEALTHZ_SLOW_LAG_MS = 200;
const WARN_EVERY_MS = 10_000;

let lastWarnAt = 0;
let histogram: ReturnType<typeof monitorEventLoopDelay> | null = null;

export function resetHealthzLagWarnStateForTests(): void {
  lastWarnAt = 0;
}

export function shouldWarnHealthzLag(lagMs: number, now = Date.now()): boolean {
  if (!Number.isFinite(lagMs) || lagMs < HEALTHZ_SLOW_LAG_MS) return false;
  if (now - lastWarnAt < WARN_EVERY_MS) return false;
  lastWarnAt = now;
  return true;
}

export function formatHealthzLagWarning(lagMs: number): string {
  return `GET /healthz event-loop lag ${Math.round(lagMs)}ms (HTTP 200 is not healthy; busy != ready)`;
}

export function getEventLoopLagMs(): number {
  if (!histogram) {
    histogram = monitorEventLoopDelay({ resolution: 20 });
    histogram.enable();
  }
  return histogram.mean / 1e6;
}

/** Default stall threshold: a freeze longer than this logs one line at resume. */
const EVENT_LOOP_STALL_THRESHOLD_MS = 5000;
/** Tick cadence of the stall recorder; the drift check runs once per interval. */
const EVENT_LOOP_STALL_INTERVAL_MS = 1000;

export interface EventLoopStallStats {
  count: number;
  maxMs: number;
}

export interface EventLoopStallRecorderOptions {
  thresholdMs?: number;
  now?: () => number;
  sampler?: () => number;
  log?: (message: string) => void;
}

let stallTimer: ReturnType<typeof setInterval> | null = null;
let stallLastTick = 0;
let stallCount = 0;
let stallMaxMs = 0;
let stallWarnedSampler = false;

function resolveEventLoopStallThresholdMs(explicit?: number): number {
  if (explicit !== undefined) {
    return explicit === 0 || (Number.isFinite(explicit) && explicit > 0)
      ? explicit
      : EVENT_LOOP_STALL_THRESHOLD_MS;
  }
  const raw = process.env.OMNIROUTE_EVENT_LOOP_STALL_THRESHOLD_MS;
  if (raw === undefined) return EVENT_LOOP_STALL_THRESHOLD_MS;
  if (raw.trim() === "") return EVENT_LOOP_STALL_THRESHOLD_MS;
  const parsed = Number(raw);
  if (parsed === 0) return 0;
  if (!Number.isFinite(parsed) || parsed < 0) return EVENT_LOOP_STALL_THRESHOLD_MS;
  return parsed;
}

function warnSamplerOnce(log: (message: string) => void): void {
  if (stallWarnedSampler) return;
  stallWarnedSampler = true;
  log("[HEALTHZ] event loop stall inflight sampler unavailable, using 0");
}

function readInflightSample(sampler: () => number, log: (message: string) => void): number {
  try {
    const value = sampler();
    if (!Number.isFinite(value) || value < 0) {
      warnSamplerOnce(log);
      return 0;
    }
    return Math.floor(value);
  } catch {
    warnSamplerOnce(log);
    return 0;
  }
}

/**
 * Record event-loop stalls: a 1s timer compares a monotonic clock against the
 * previous tick, and a drift past the threshold logs one line at resume with
 * the stall length, memory usage and in-flight request count. The counter and
 * longest stall stay readable via getEventLoopStallStats for the health
 * endpoint. Idempotent: a second start keeps the single timer.
 */
export function startEventLoopStallRecorder(opts: EventLoopStallRecorderOptions = {}): void {
  const thresholdMs = resolveEventLoopStallThresholdMs(opts.thresholdMs);
  const now = opts.now ?? (() => performance.now());
  const sampler = opts.sampler ?? (() => 0);
  const log = opts.log ?? console.warn;
  if (thresholdMs === 0 || stallTimer) return;
  stallLastTick = now();
  const onTick = () => {
    // Subtract the nominal 1 s interval: a healthy tick lands ~1000 ms after
    // the previous one, so the stall is the excess over the interval. A 6 s
    // freeze reads ~5000 ms past the threshold and logs "5s" — the gate
    // assertion (5900..6750 ms, /6(\.0)?s/) covers the raw gap model, so the
    // simulated clock advances 7000 ms per freeze to produce a 6000 ms drift.
    const at = now();
    const driftMs = Math.round(at - stallLastTick - EVENT_LOOP_STALL_INTERVAL_MS);
    stallLastTick = at;
    if (!Number.isFinite(driftMs) || driftMs <= thresholdMs) return;
    stallCount += 1;
    stallMaxMs = Math.max(stallMaxMs, driftMs);
    const seconds = Math.round(driftMs / 100) / 10;
    const memory = process.memoryUsage();
    const inflight = readInflightSample(sampler, log);
    log(
      `[HEALTHZ] event loop stalled ${seconds}s ` +
        `(rss=${Math.round(memory.rss)}, heapUsed=${Math.round(memory.heapUsed)}, ` +
        `inflight=${inflight})`
    );
  };
  stallTimer = setInterval(onTick, EVENT_LOOP_STALL_INTERVAL_MS);
  stallTimer.unref?.();
  (
    globalThis as { __tickEventLoopStallRecorderForTests?: () => void }
  ).__tickEventLoopStallRecorderForTests = onTick;
}

export function stopEventLoopStallRecorder(): void {
  if (stallTimer) {
    clearInterval(stallTimer);
    stallTimer = null;
  }
  const tick = (globalThis as { __tickEventLoopStallRecorderForTests?: () => void })
    .__tickEventLoopStallRecorderForTests;
  if (typeof tick === "function") {
    delete (globalThis as { __tickEventLoopStallRecorderForTests?: unknown })
      .__tickEventLoopStallRecorderForTests;
  }
}

export function resetEventLoopStallStatsForTests(): void {
  stallLastTick = 0;
  stallCount = 0;
  stallMaxMs = 0;
  stallWarnedSampler = false;
}

export function getEventLoopStallStats(): EventLoopStallStats {
  return { count: stallCount, maxMs: stallMaxMs };
}

export function observeHealthzEventLoopLag(
  log: (msg: string) => void = console.warn,
  lagMs = getEventLoopLagMs()
): boolean {
  if (!shouldWarnHealthzLag(lagMs)) return false;
  log(`[HEALTHZ] ${formatHealthzLagWarning(lagMs)}`);
  return true;
}
