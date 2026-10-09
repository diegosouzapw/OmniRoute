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
  return consumeEventLoopPeakMs(histogram);
}

/** Peak since the previous sample; a long uptime must not dilute a recent stall. */
export function consumeEventLoopPeakMs(
  sample: Pick<ReturnType<typeof monitorEventLoopDelay>, "max" | "reset">
): number {
  const peakMs = sample.max / 1e6;
  sample.reset();
  return Number.isFinite(peakMs) && peakMs > 0 ? peakMs : 0;
}

export function observeHealthzEventLoopLag(
  log: (msg: string) => void = console.warn,
  lagMs = getEventLoopLagMs()
): boolean {
  if (!shouldWarnHealthzLag(lagMs)) return false;
  log(`[HEALTHZ] ${formatHealthzLagWarning(lagMs)}`);
  return true;
}
