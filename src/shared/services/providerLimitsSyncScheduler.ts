import {
  getLastProviderLimitsAutoSyncTime,
  getProviderLimitsSyncIntervalMinutes,
  getProviderLimitsSyncIntervalMs,
  syncAllProviderLimits,
} from "@/lib/usage/providerLimits";

const STARTUP_DELAY_MS = 5_000;

let schedulerTimer: NodeJS.Timeout | null = null;
let startupTimer: NodeJS.Timeout | null = null;
let isRunning = false;

async function runProviderLimitsSyncCycle(): Promise<void> {
  if (isRunning) {
    console.log("[ProviderLimitsSync] Skipping cycle — previous run still in progress");
    return;
  }

  isRunning = true;
  const start = Date.now();

  try {
    const result = await syncAllProviderLimits({ source: "scheduled" });
    console.log(
      `[ProviderLimitsSync] Cycle complete: ${result.succeeded}/${result.total} synced in ${Date.now() - start}ms`
    );
  } catch (error) {
    console.warn("[ProviderLimitsSync] Cycle failed:", (error as Error).message);
  } finally {
    isRunning = false;
  }
}

export function startProviderLimitsSyncScheduler(): void {
  if (schedulerTimer || startupTimer) {
    console.log("[ProviderLimitsSync] Scheduler already running — skipping start");
    return;
  }

  const intervalMs = getProviderLimitsSyncIntervalMs();
  const intervalMinutes = getProviderLimitsSyncIntervalMinutes();

  console.log(`[ProviderLimitsSync] Scheduler started — interval: ${intervalMinutes}m`);

  void (async () => {
    let initialDelayMs = STARTUP_DELAY_MS;
    const lastAutoSyncAt = await getLastProviderLimitsAutoSyncTime();

    if (lastAutoSyncAt) {
      const lastRunMs = Date.parse(lastAutoSyncAt);
      if (Number.isFinite(lastRunMs)) {
        const elapsedMs = Date.now() - lastRunMs;
        if (elapsedMs < intervalMs) {
          initialDelayMs = Math.max(intervalMs - elapsedMs, STARTUP_DELAY_MS);
        }
      }
    }

    startupTimer = setTimeout(() => {
      startupTimer = null;
      void runProviderLimitsSyncCycle();

      schedulerTimer = setInterval(() => {
        void runProviderLimitsSyncCycle();
      }, intervalMs);
      schedulerTimer.unref?.();
    }, initialDelayMs);

    startupTimer.unref?.();
  })();
}

export function stopProviderLimitsSyncScheduler(): void {
  if (startupTimer) {
    clearTimeout(startupTimer);
    startupTimer = null;
  }

  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
    console.log("[ProviderLimitsSync] Scheduler stopped");
  }
}
