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
 *
 * Referrals (`GET /v1/referrals/latest`) piggyback on the SAME hourly tick,
 * but on their own much shorter staleness window (`REFERRALS_STALE_MS`, 1h —
 * see `referralsSync.ts`) so they stay close to real-time instead of
 * inheriting the catalog's daily cadence. This is independent of, and never
 * gates on, the catalog's own due-ness — the two feeds sync on separate
 * schedules within the same tick. It is deliberately NOT reflected in
 * `RadarTickResult` (best-effort, fire-and-await side effect only) so the
 * existing catalog-sync result shape/assertions stay unchanged.
 */

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  getRadarCache,
  getRadarIntelCache,
  getRadarOffersCache,
  getRadarSettings,
  getRadarReferralsCache,
} from "@/lib/db/radar";
import { shouldSyncRadarIntel, syncRadarIntel, type IntelSyncStatus } from "./intelSync";
import { syncRadarOffers, type OffersSyncStatus } from "./offersSync";
import { nextSyncTime, syncRadar, type SyncStatus } from "./sync";
import {
  syncRadarReferrals,
  shouldSyncReferralsOnRead,
  type ReferralsSyncStatus,
} from "./referralsSync";

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
  /** Referrals cache reader — separate from `getCache` (the catalog cache). */
  getReferralsCache?: () => { fetchedAt: string } | null;
  /** Referrals sync — separate from `sync` (the catalog sync). */
  syncReferrals?: () => Promise<ReferralsSyncStatus>;
  getOffersCache?: () => { fetchedAt: string } | null;
  syncOffers?: () => Promise<OffersSyncStatus>;
  getIntelCache?: () => { fetchedAt: string } | null;
  syncIntel?: () => Promise<IntelSyncStatus>;
  now?: () => number;
  setIntervalFn?: typeof setInterval;
  clearIntervalFn?: typeof clearInterval;
}

let timer: ReturnType<typeof setInterval> | null = null;

/**
 * Best-effort referrals sync, gated on its own (shorter) staleness window.
 * Never throws — `syncRadarReferrals()` already never throws by contract,
 * this is defense in depth so a scheduler tick can never fail because of
 * the referrals side-sync.
 */
async function maybeSyncReferrals(deps: RadarSchedulerDeps, nowMs: number): Promise<void> {
  try {
    const referralsCache = (deps.getReferralsCache ?? getRadarReferralsCache)();
    if (!shouldSyncReferralsOnRead(referralsCache?.fetchedAt ?? null, nowMs)) return;
    await (deps.syncReferrals ?? syncRadarReferrals)();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[RADAR_SYNC] Referrals side-sync failed (non-fatal):", msg);
  }
}

async function maybeSyncSupporterFeeds(deps: RadarSchedulerDeps, nowMs: number): Promise<void> {
  try {
    const offersCache = (deps.getOffersCache ?? getRadarOffersCache)();
    if (nowMs >= nextSyncTime(offersCache?.fetchedAt ?? null).getTime()) {
      await (deps.syncOffers ?? syncRadarOffers)();
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[RADAR_SYNC] Offers side-sync failed (non-fatal):", msg);
  }

  try {
    const intelCache = (deps.getIntelCache ?? getRadarIntelCache)();
    if (shouldSyncRadarIntel(intelCache?.fetchedAt ?? null, nowMs)) {
      await (deps.syncIntel ?? syncRadarIntel)();
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[RADAR_SYNC] Intel side-sync failed (non-fatal):", msg);
  }
}

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

  const nowMs = (deps.now ?? Date.now)();

  // Referrals sync on their own staleness window — independent of the
  // catalog's due-ness below, same tick.
  await maybeSyncReferrals(deps, nowMs);
  await maybeSyncSupporterFeeds(deps, nowMs);

  const cache = (deps.getCache ?? getRadarCache)();
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
