/**
 * Sequential bounded draining for the explicit memory reindex endpoint.
 * A failed embedding remains pending; zero progress must stop the worker
 * instead of hot-looping on the same failing rows.
 */
export interface ReindexDrainDependencies {
  getPending: () => number;
  runBatch: (size: number) => Promise<{ processed: number; errors: number }>;
}

export interface ReindexDrainResult {
  processed: number;
  errors: number;
  batches: number;
  pending: number;
  reason: "drained" | "no-progress" | "batch-limit";
}

export async function drainPendingReindex(
  deps: ReindexDrainDependencies,
  { batchSize = 100, maxBatches = 1000 }: { batchSize?: number; maxBatches?: number } = {}
): Promise<ReindexDrainResult> {
  if (!Number.isSafeInteger(batchSize) || batchSize < 1) {
    throw new RangeError("batchSize must be a positive integer");
  }
  if (!Number.isSafeInteger(maxBatches) || maxBatches < 1) {
    throw new RangeError("maxBatches must be a positive integer");
  }

  let batches = 0;
  let processed = 0;
  let errors = 0;
  let pending = deps.getPending();

  while (pending > 0 && batches < maxBatches) {
    const outcome = await deps.runBatch(batchSize);
    batches += 1;
    processed += outcome.processed;
    errors += outcome.errors;
    pending = deps.getPending();

    // Failed embeds remain in the queue. Re-reading them forever would spin
    // the background task and saturate a broken embedding provider.
    if (outcome.processed <= 0) {
      return { processed, errors, batches, pending, reason: "no-progress" };
    }
  }

  return {
    processed,
    errors,
    batches,
    pending,
    reason: pending === 0 ? "drained" : "batch-limit",
  };
}

/** One controller per server process keeps repeated POSTs from racing batches. */
export function createReindexDrainController(
  deps: ReindexDrainDependencies & {
    onComplete?: (result: ReindexDrainResult) => void;
    onError?: (error: unknown) => void;
    schedule?: (callback: () => void) => void;
  },
  options?: { batchSize?: number; maxBatches?: number }
) {
  let active: Promise<ReindexDrainResult> | null = null;

  return {
    start(onStart?: () => void): boolean {
      if (active) return false;
      // A forced reindex must mark rows before scheduling any worker, but must
      // never mark them again when another request finds the worker running.
      // This is synchronous: no request can interleave between the guard,
      // mutation and registering the in-flight Promise.
      onStart?.();
      const scheduled = new Promise<void>((resolve, reject) => {
        try {
          (deps.schedule ?? setImmediate)(resolve);
        } catch (error) {
          reject(error);
        }
      });
      const running = scheduled.then(() => drainPendingReindex(deps, options));
      let tracked: Promise<ReindexDrainResult>;
      tracked = running.finally(() => {
        if (active === tracked) active = null;
      });
      active = tracked;
      // Attach a rejection handler even when the HTTP caller never awaits.
      void tracked.then(
        (result) => {
          try {
            deps.onComplete?.(result);
          } catch {
            // Reporting must never crash the worker.
          }
        },
        (error) => {
          try {
            deps.onError?.(error);
          } catch {
            // Reporting must never crash the worker.
          }
        }
      );
      return true;
    },
    isRunning(): boolean {
      return active !== null;
    },
    waitForIdle(): Promise<ReindexDrainResult | null> {
      return active ?? Promise.resolve(null);
    },
  };
}
