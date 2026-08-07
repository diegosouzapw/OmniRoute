/**
 * scheduler.ts — daily background sync for the Radar feed (spec: "GET 1×/dia,
 * só quando opt-in").
 *
 * Inertia contract: a flag-off boot NEVER creates a timer. The scheduler only
 * starts from (a) `initRadarSyncScheduler()` at boot when the flag AND the
 * user opt-in are already on, or (b) the settings route right after the user
 * opts in. If the flag is later turned off, the next tick stops the timer —
 * returning the process to the zero-timer state.
 *
 * The tick itself is cheap (one flag lookup + one DB row) and only performs a
 * network sync when the cache is older than the daily window computed by
 * `nextSyncTime()`. `syncRadar()` re-checks flag/opt-in internally, so a
 * mid-flight settings change degrades to a no-op instead of an errant fetch.
 */

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { getRadarCache, getRadarSettings } from "@/lib/db/radar";
import { nextSyncTime, syncRadar, type SyncStatus } from "./sync";

/** How often the scheduler re-evaluates staleness (NOT the sync cadence). */
export const RADAR_SCHEDULER_TICK_MS = 60 * 60 * 1000; // hourly

export type RadarTickResult =
  | { action: "stopped"; reason: "flag_off" }
  | { action: "skipped"; reason: "opt_out" | "not_due" }
  | { action: "synced"; result: SyncStatus };

export interface RadarSchedulerDeps {
  getFlag?: (key: string) => boolean;
  getSettings?: () => { optIn: boolean };
  getCache?: () => { fetchedAt: string } | null;
  sync?: () => Promise<SyncStatus>;
  now?: () => number;
  setIntervalFn?: typeof setInterval;
  clearIntervalFn?: typeof clearInterval;
}

let timer: ReturnType<typeof setInterval> | null = null;

/**
 * One scheduler evaluation. Exported for tests and for the immediate
 * post-start tick.
 */
export async function radarSchedulerTick(deps: RadarSchedulerDeps = {}): Promise<RadarTickResult> {
  const getFlag = deps.getFlag ?? isFeatureFlagEnabled;
  if (!getFlag("RADAR_ENABLED")) {
    stopRadarSyncScheduler(deps);
    return { action: "stopped", reason: "flag_off" };
  }

  const settings = (deps.getSettings ?? getRadarSettings)();
  if (!settings.optIn) return { action: "skipped", reason: "opt_out" };

  const cache = (deps.getCache ?? getRadarCache)();
  const nowMs = (deps.now ?? Date.now)();
  if (nowMs < nextSyncTime(cache?.fetchedAt ?? null).getTime()) {
    return { action: "skipped", reason: "not_due" };
  }

  const result = await (deps.sync ?? syncRadar)();
  return { action: "synced", result };
}

/**
 * Start the hourly staleness timer (idempotent). Fires one immediate,
 * non-blocking tick so a due sync happens right away instead of waiting a
 * full tick interval. Returns whether a new timer was created.
 */
export function ensureRadarSyncScheduler(deps: RadarSchedulerDeps = {}): boolean {
  if (timer) return false;

  const tick = () => {
    radarSchedulerTick(deps).catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[RADAR_SYNC] Scheduled sync tick failed (non-fatal):", msg);
    });
  };

  timer = (deps.setIntervalFn ?? setInterval)(tick, RADAR_SCHEDULER_TICK_MS);
  // Never keep the process alive just for this timer.
  if (timer && typeof timer === "object" && "unref" in timer) {
    (timer as { unref?: () => void }).unref?.();
  }
  tick();
  return true;
}

/** Stop the timer (used by the flag-off self-heal and by tests). */
export function stopRadarSyncScheduler(deps: RadarSchedulerDeps = {}): void {
  if (timer) {
    (deps.clearIntervalFn ?? clearInterval)(timer);
    timer = null;
  }
}

/**
 * Boot-time init: only arms the scheduler when the flag AND the opt-in are
 * already on (a flag-off install stays byte-identical — no timer, no DB
 * polling loop). Never throws.
 */
export function initRadarSyncScheduler(deps: RadarSchedulerDeps = {}): boolean {
  try {
    const getFlag = deps.getFlag ?? isFeatureFlagEnabled;
    if (!getFlag("RADAR_ENABLED")) return false;
    const settings = (deps.getSettings ?? getRadarSettings)();
    if (!settings.optIn) return false;
    return ensureRadarSyncScheduler(deps);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[RADAR_SYNC] Scheduler init failed (non-fatal):", msg);
    return false;
  }
}
