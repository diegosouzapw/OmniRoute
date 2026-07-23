/**
 * Free-Proxy Auto-Sync Scheduler (#7079)
 *
 * Periodically re-runs the free-proxy provider `sync()` calls (iplocate,
 * proxifly, oneproxy, webshare) that otherwise only run via a manual
 * `POST /api/settings/free-proxies/sync`. Free-proxy lists rotate hourly, so a
 * manually-seeded pool goes stale fast without this.
 *
 * Combines two scheduler idioms already used elsewhere in this codebase:
 *   - `proxyHealth/scheduler.ts`: `globalThis`-guarded interval,
 *     `isBuildProcess()` / `isBackgroundServicesDisabled()` guards.
 *   - `providerLimitsSyncScheduler.ts`: `isRunning` reentrancy guard,
 *     elapsed-since-last-run initial delay, `.unref()`'d timers.
 *
 * Config via environment (opt-in, off by default — parallels Hard Rule #20's
 * default-off posture for another data-mutating background feature):
 *   FREE_PROXY_AUTO_SYNC_ENABLED       — set "true" to enable (default: off)
 *   FREE_PROXY_AUTO_SYNC_INTERVAL_MS   — sync interval in ms (default: 1_800_000
 *                                        = 30min; floor-clamped to 300_000 =
 *                                        5min — outbound courtesy to free-proxy
 *                                        sources without their own TTL guard)
 */

import { getEnabledProviders } from "@/lib/freeProxyProviders";
import { getFreeProxyStats } from "@/lib/localDb";
import { runFreeProxySyncCycle, type FreeProxySyncCycleResult } from "./syncCycle";

const STARTUP_DELAY_MS = 5_000;
const DEFAULT_INTERVAL_MS = 1_800_000;
const MIN_INTERVAL_MS = 300_000;
const LOG_PREFIX = "[FreeProxyAutoSync]";

declare global {
  var __freeProxyAutoSyncInterval: ReturnType<typeof setInterval> | undefined;
  var __freeProxyAutoSyncStartupTimer: ReturnType<typeof setTimeout> | undefined;
}

let isRunning = false;

type SyncCycleRunner = () => Promise<FreeProxySyncCycleResult>;
let _syncCycleRunner: SyncCycleRunner = () => runFreeProxySyncCycle();

/** Test-only seam: override the cycle body so tests never hit real providers. */
export function _setSyncCycleRunnerForTests(runner: SyncCycleRunner | null): void {
  _syncCycleRunner = runner ?? (() => runFreeProxySyncCycle());
}

export function isFreeProxyAutoSyncEnabled(): boolean {
  return process.env.FREE_PROXY_AUTO_SYNC_ENABLED === "true";
}

export function getFreeProxyAutoSyncIntervalMs(): number {
  const raw = parseInt(process.env.FREE_PROXY_AUTO_SYNC_INTERVAL_MS ?? "", 10);
  const candidate = Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_INTERVAL_MS;
  return Math.max(candidate, MIN_INTERVAL_MS);
}

function isBuildProcess(): boolean {
  return typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build";
}

function isBackgroundServicesDisabled(): boolean {
  const raw = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  if (!raw) return false;
  return ["1", "true", "yes", "on"].includes(raw.trim().toLowerCase());
}

async function runCycle(): Promise<void> {
  if (isRunning) {
    console.log(`${LOG_PREFIX} Skipping cycle — previous run still in progress`);
    return;
  }

  isRunning = true;
  const start = Date.now();
  try {
    const { results, lastSyncAt } = await _syncCycleRunner();
    console.log(
      `${LOG_PREFIX} Cycle complete in ${Date.now() - start}ms ` +
        `(lastSyncAt=${lastSyncAt}, sources=${Object.keys(results).length})`
    );
  } catch (error) {
    console.error(`${LOG_PREFIX} Cycle error:`, error);
  } finally {
    isRunning = false;
  }
}

function scheduleInterval(intervalMs: number): void {
  globalThis.__freeProxyAutoSyncInterval = setInterval(() => {
    void runCycle();
  }, intervalMs);
  globalThis.__freeProxyAutoSyncInterval.unref?.();
}

async function computeInitialDelayMs(intervalMs: number): Promise<number> {
  const { lastSyncAt } = await getFreeProxyStats();
  if (!lastSyncAt) return STARTUP_DELAY_MS;

  const lastRunMs = Date.parse(lastSyncAt);
  if (!Number.isFinite(lastRunMs)) return STARTUP_DELAY_MS;

  const elapsedMs = Date.now() - lastRunMs;
  if (elapsedMs >= intervalMs) return STARTUP_DELAY_MS;
  return Math.max(intervalMs - elapsedMs, STARTUP_DELAY_MS);
}

/** Guarded entrypoint — auto-called at module bottom, matching `proxyHealth/scheduler.ts`. */
export function initFreeProxyAutoSync(): void {
  if (!isFreeProxyAutoSyncEnabled() || isBuildProcess() || isBackgroundServicesDisabled()) return;
  if (globalThis.__freeProxyAutoSyncInterval || globalThis.__freeProxyAutoSyncStartupTimer) return;

  if (getEnabledProviders().length === 0) {
    console.log(`${LOG_PREFIX} No enabled providers — skipping scheduling`);
    return;
  }

  const intervalMs = getFreeProxyAutoSyncIntervalMs();
  console.log(`${LOG_PREFIX} Starting scheduler (interval: ${intervalMs}ms)`);

  void (async () => {
    const initialDelayMs = await computeInitialDelayMs(intervalMs);
    globalThis.__freeProxyAutoSyncStartupTimer = setTimeout(() => {
      globalThis.__freeProxyAutoSyncStartupTimer = undefined;
      void runCycle();
      scheduleInterval(intervalMs);
    }, initialDelayMs);
    globalThis.__freeProxyAutoSyncStartupTimer.unref?.();
  })();
}

/** Test/shutdown seam — clears both the startup timer and the recurring interval. */
export function stopFreeProxyAutoSync(): void {
  if (globalThis.__freeProxyAutoSyncInterval) {
    clearInterval(globalThis.__freeProxyAutoSyncInterval);
    globalThis.__freeProxyAutoSyncInterval = undefined;
  }
  if (globalThis.__freeProxyAutoSyncStartupTimer) {
    clearTimeout(globalThis.__freeProxyAutoSyncStartupTimer);
    globalThis.__freeProxyAutoSyncStartupTimer = undefined;
  }
}

/** Test seam — runs one cycle immediately, still honoring the reentrancy guard. */
export async function forceFreeProxySyncCycle(): Promise<void> {
  await runCycle();
}

// Auto-initialize on first import
initFreeProxyAutoSync();
