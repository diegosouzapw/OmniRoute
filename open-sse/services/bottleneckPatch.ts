/**
 * Monkey-patch for Bottleneck v2.19.5 doExpire bug.
 *
 * Bug (Job.js:162):
 *   `this._states.jobStatus(this.options.id === "RUNNING")`
 *   compares job ID to "RUNNING" (always false) instead of checking status.
 *   Should be: `this._states.jobStatus(this.options.id) === "RUNNING"`
 *
 * Impact: when a job's execution time exceeds `expiration`, doExpire fires but
 * fails to advance the job from RUNNING to EXECUTING. The _assertStatus throws
 * in a setTimeout (uncaught), and the job is permanently stuck in RUNNING state.
 * Bottleneck's internal _running counter never decrements -> capacity leak.
 *
 * This patch intercepts Bottleneck's _run method to fix job.doExpire before
 * the expiration timeout fires.
 */

import Bottleneck from "bottleneck";

/** Bottleneck Job instance (internal, not exported). */
interface BottleneckJob {
  options: { id?: string; expiration?: number };
  doExpire: (clearGlobalState: () => void, run: () => void, free: () => void) => void;
  _states: { jobStatus: (id: string) => string | null; next: (id: string) => void };
}

let patched = false;

export function applyBottleneckDoExpirePatch(): void {
  if (patched) return;
  patched = true;

  const proto = Bottleneck.prototype as Record<string, unknown>;
  const originalRun = proto._run as
    ((index: string, job: BottleneckJob, wait: number) => unknown) | undefined;
  if (typeof originalRun !== "function") {
    console.warn("[bottleneck-patch] _run not found on prototype, patch skipped");
    return;
  }

  proto._run = function patchedRun(this: unknown, index: string, job: BottleneckJob, wait: number) {
    // Patch job.doExpire BEFORE calling originalRun.
    // originalRun passes job.doExpire to setTimeout by reference -- once captured,
    // reassigning the property later has no effect on the queued timer callback.
    //
    // Guard: _run is called twice for jobs with wait > 0 (first with the delay,
    // then with wait=0 when the timer fires). Without the flag, fixedDoExpire
    // would wrap itself recursively on the second call.
    if (typeof job?.doExpire === "function" && !(job as Record<string, unknown>)._doExpirePatched) {
      (job as Record<string, unknown>)._doExpirePatched = true;
      const originalDoExpire = job.doExpire.bind(job);
      // Bottleneck registers the job in _states under options.id (Job.js
      // states.start(this.options.id)); a bare `job.id` does not exist and
      // reading it makes the RUNNING check below always miss. options.id is
      // stable on the job and is the key the state machine uses.
      const jobId = job.options.id;

      job.doExpire = function fixedDoExpire(
        clearGlobalState: () => void,
        run: () => void,
        free: () => void
      ) {
        // Fix: check job status, not compare ID to string "RUNNING"
        const states = job._states;
        const currentStatus = states?.jobStatus?.(jobId);
        if (currentStatus === "RUNNING") {
          states?.next?.(jobId);
          console.warn(
            `[bottleneck-patch] doExpire bug triggered: job ${jobId} stuck in RUNNING, ` +
              `advanced to EXECUTING before expiry. This is the Bottleneck v2.19.5 capacity leak.`
          );
        }
        return originalDoExpire(clearGlobalState, run, free);
      };
    }

    // Now call original _run which captures the (now-patched) job.doExpire.
    return originalRun.call(this, index, job, wait);
  };

  console.log("[bottleneck-patch] Applied doExpire fix for Bottleneck v2.19.5");
}
