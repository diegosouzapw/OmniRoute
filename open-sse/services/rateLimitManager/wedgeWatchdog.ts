import Bottleneck from "bottleneck";

export const WATCHDOG_INTERVAL_MS = 30_000;

const INACTIVE_LIMITER_MS = 10 * 60 * 1000;
const IDLE_CAPACITY_WEDGE_GRACE_MS = 10_000;

interface IdleCapacitySnapshot {
  lastProgress: number;
  reservoir: number | null;
}

interface LimiterWedgeWatchdogDependencies {
  limiters: Map<string, Bottleneck>;
  limiterLastUsed: Map<string, number>;
  limiterEffectiveSettings: WeakMap<Bottleneck, Bottleneck.ConstructorOptions>;
  preservedReplacementSettings: Map<string, Bottleneck.ConstructorOptions>;
  trackBackground: (promise: Promise<unknown>) => void;
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}

/**
 * Detects a Bottleneck queue that has remained idle despite immediately usable
 * capacity. State is keyed by limiter identity so late events from an evicted
 * instance cannot mutate the replacement's progress record.
 */
export class LimiterWedgeWatchdog {
  private queueProgressAt = new WeakMap<Bottleneck, number>();
  private evictions = new WeakMap<Bottleneck, Promise<boolean>>();
  private currentRun: Promise<void> | null = null;

  constructor(private readonly dependencies: LimiterWedgeWatchdogDependencies) {}

  noteQueued(key: string, limiter: Bottleneck): void {
    if (this.dependencies.limiters.get(key) !== limiter) return;
    if (!this.queueProgressAt.has(limiter)) this.queueProgressAt.set(limiter, Date.now());
  }

  noteProgress(key: string, limiter: Bottleneck): void {
    if (this.dependencies.limiters.get(key) !== limiter) return;
    if (limiter.counts().QUEUED > 0) {
      this.queueProgressAt.set(limiter, Date.now());
    } else {
      this.queueProgressAt.delete(limiter);
    }
  }

  forget(limiter: Bottleneck): void {
    this.queueProgressAt.delete(limiter);
  }

  getEviction(limiter: Bottleneck): Promise<boolean> | undefined {
    return this.evictions.get(limiter);
  }

  run(now = Date.now()): Promise<void> {
    if (this.currentRun) return this.currentRun;
    const run = this.tick(now);
    this.currentRun = run;
    void run.then(
      () => {
        if (this.currentRun === run) this.currentRun = null;
      },
      () => {
        if (this.currentRun === run) this.currentRun = null;
      }
    );
    return run;
  }

  reset(): void {
    this.queueProgressAt = new WeakMap();
    this.evictions = new WeakMap();
    this.currentRun = null;
  }

  private async tick(now: number): Promise<void> {
    const { limiters, limiterLastUsed, log, trackBackground, warn } = this.dependencies;

    for (const [key, limiter] of Array.from(limiters)) {
      const lastUsed = limiterLastUsed.get(key) ?? 0;
      if (now - lastUsed <= INACTIVE_LIMITER_MS) continue;

      const counts = limiter.counts();
      if (counts.QUEUED > 0 || counts.RUNNING > 0 || counts.EXECUTING > 0) continue;

      limiters.delete(key);
      this.queueProgressAt.delete(limiter);
      limiterLastUsed.delete(key);
      log(
        `[RATE-LIMIT] Evicting idle limiter: ${key} ` +
          `(inactive for ${Math.round((now - lastUsed) / 1000)}s)`
      );
      trackBackground(limiter.disconnect());
    }

    for (const [key, limiter] of Array.from(limiters)) {
      const snapshot = await this.getStableIdleCapacity(key, limiter, now);
      if (!snapshot) continue;

      const counts = limiter.counts();
      const cleanup = this.evict(key, limiter, snapshot);
      if (!cleanup) continue;

      warn(
        `[RATE-LIMIT] WEDGED: ${key} queued=${counts.QUEUED} running=0 executing=0 ` +
          `stalled=${now - snapshot.lastProgress}ms with idle capacity — force-resetting`
      );
      await cleanup;
    }
  }

  private async getStableIdleCapacity(
    key: string,
    limiter: Bottleneck,
    now: number
  ): Promise<IdleCapacitySnapshot | null> {
    const before = limiter.counts();
    if (before.QUEUED === 0) {
      this.queueProgressAt.delete(limiter);
      return null;
    }
    if (before.RUNNING > 0 || before.EXECUTING > 0) return null;

    const lastProgress = this.queueProgressAt.get(limiter);
    if (lastProgress === undefined) {
      this.queueProgressAt.set(limiter, now);
      return null;
    }
    if (now - lastProgress < IDLE_CAPACITY_WEDGE_GRACE_MS) return null;

    let canRunNow: boolean;
    let reservoir: number | null;
    try {
      // Every job this manager submits has Bottleneck's default weight of 1.
      // check(1) is an eligibility query for exactly that shape, not a generic
      // query about an arbitrary weighted queue head.
      canRunNow = await limiter.check(1);
      if (!canRunNow) return null;
      reservoir = await limiter.currentReservoir();
    } catch {
      return null;
    }
    if (this.dependencies.limiters.get(key) !== limiter) return null;

    const after = limiter.counts();
    if (
      after.QUEUED === 0 ||
      after.RUNNING > 0 ||
      after.EXECUTING > 0 ||
      this.queueProgressAt.get(limiter) !== lastProgress
    ) {
      return null;
    }
    return { lastProgress, reservoir };
  }

  private evict(
    key: string,
    limiter: Bottleneck,
    snapshot: IdleCapacitySnapshot
  ): Promise<boolean> | null {
    const { limiterEffectiveSettings, limiterLastUsed, limiters, preservedReplacementSettings } =
      this.dependencies;
    if (limiters.get(key) !== limiter) return null;

    const counts = limiter.counts();
    if (
      counts.QUEUED === 0 ||
      counts.RUNNING > 0 ||
      counts.EXECUTING > 0 ||
      this.queueProgressAt.get(limiter) !== snapshot.lastProgress
    ) {
      return null;
    }

    const effectiveSettings = limiterEffectiveSettings.get(limiter) ?? {};
    preservedReplacementSettings.set(key, {
      ...effectiveSettings,
      id: key,
      // Carry consumed capacity forward. Restarting the refresh interval from
      // replacement creation is conservative and cannot grant an early burst.
      reservoir: snapshot.reservoir,
    });
    limiters.delete(key);
    this.queueProgressAt.delete(limiter);
    limiterLastUsed.delete(key);

    // Register this Promise before stop() runs. Every dropped caller awaits the
    // same cleanup and is surfaced exactly once; none is replayed automatically.
    const stopped = Promise.resolve().then(() =>
      limiter.stop({
        dropWaitingJobs: true,
        dropErrorMessage: "rate-limit-watchdog-wedge-reset",
      })
    );
    const cleanup = stopped
      .then(
        () => limiter.disconnect(),
        async (stopError: unknown) => {
          await limiter.disconnect();
          throw stopError;
        }
      )
      .then(() => true);
    this.evictions.set(limiter, cleanup);
    return cleanup;
  }
}
