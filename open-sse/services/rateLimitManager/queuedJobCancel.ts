/**
 * rateLimitManager/queuedJobCancel — remove an abandoned job from a Bottleneck queue.
 *
 * Bottleneck v2.19.5 has no public API to cancel a job that is still QUEUED.
 * When a caller gives up on the queue (queue-wait budget or abort), its job
 * stays in the limiter and is dispatched later: it registers against the
 * limiter first, taking a reservoir token and advancing the `minTime` slot,
 * and only then does the wrapped function reject. With a finite reservoir
 * (an `rpm` override) every abandoned job burns one token of the next refresh
 * window, so live requests queue behind dead ones, time out, and add more dead
 * jobs: the queue never recovers while traffic continues.
 *
 * This helper reaches Bottleneck's internals the same way `bottleneckPatch.ts`
 * does, and is defensive: if any internal is missing it returns `false` and
 * the caller keeps the previous behavior (the abandoned job rejects on
 * dispatch). The removal runs inside `_submitLock` and then `_registerLock`,
 * the two locks Bottleneck already uses to serialize enqueueing and draining,
 * so it can never race `_drainOne` (which reads the queue head, awaits
 * registration, then shifts that head).
 *
 * @module services/rateLimitManager/queuedJobCancel
 */

import type Bottleneck from "bottleneck";

interface DLListNode {
  value: BottleneckJob;
  prev: DLListNode | null;
  next: DLListNode | null;
}

interface DLList {
  _first: DLListNode | null;
  _last: DLListNode | null;
  length: number;
  decr?: () => void;
}

interface BottleneckJob {
  options?: { id?: string };
  doDrop?: (options?: { message?: string }) => boolean;
}

interface SyncLock {
  schedule: <T>(task: () => T | Promise<T>) => Promise<T>;
}

interface BottleneckInternals {
  _submitLock?: SyncLock;
  _registerLock?: SyncLock;
  _queues?: { _lists?: DLList[] };
}

export const ABANDONED_JOB_DROP_MESSAGE = "rate-limit-queued-job-abandoned";

function findQueuedNode(
  internals: BottleneckInternals,
  jobId: string
): { list: DLList; node: DLListNode } | null {
  const lists = internals._queues?._lists;
  if (!Array.isArray(lists)) return null;
  for (const list of lists) {
    let node = list?._first ?? null;
    while (node) {
      if (node.value?.options?.id === jobId) return { list, node };
      node = node.next;
    }
  }
  return null;
}

function unlink(list: DLList, node: DLListNode): void {
  if (node.prev) node.prev.next = node.next;
  else list._first = node.next;
  if (node.next) node.next.prev = node.prev;
  else list._last = node.prev;
  list.length--;
  // Keeps Bottleneck's aggregate queue length (and its "zero" event) in sync.
  if (typeof list.decr === "function") list.decr();
}

/**
 * Remove `jobId` from `limiter`'s queue if, and only if, it is still QUEUED.
 * Resolves `true` when the job was removed (its promise rejects with
 * `ABANDONED_JOB_DROP_MESSAGE`), `false` when it already left the queue or the
 * Bottleneck internals are not the expected shape.
 */
export function cancelQueuedJob(limiter: Bottleneck, jobId: string): Promise<boolean> {
  const internals = limiter as unknown as BottleneckInternals;
  const submitLock = internals._submitLock;
  const registerLock = internals._registerLock;
  if (typeof submitLock?.schedule !== "function" || typeof registerLock?.schedule !== "function") {
    return Promise.resolve(false);
  }
  // _submitLock first: a job still RECEIVED is pushed onto the queue inside
  // _submitLock, so waiting for it guarantees the push has happened. The
  // registration lock is then taken without holding _submitLock.
  return submitLock
    .schedule(() => undefined)
    .then(() =>
      registerLock.schedule(() => {
        if (limiter.jobStatus(jobId) !== "QUEUED") return false;
        const found = findQueuedNode(internals, jobId);
        // Never unlink a job that could not then be settled: it would vanish.
        if (!found || typeof found.node.value.doDrop !== "function") return false;
        unlink(found.list, found.node);
        return found.node.value.doDrop({ message: ABANDONED_JOB_DROP_MESSAGE }) === true;
      })
    )
    .catch(() => false);
}

let scheduledJobSeq = 0;

/**
 * Schedule options carrying a unique job id, plus `abandon()` that removes
 * that job from `limiter`'s queue while it is still QUEUED. A caller that gives
 * up (queue-wait budget or abort) calls `abandon()` so its dead job never
 * spends a reservoir token or `minTime` slot later. `track` registers the async
 * removal with the manager's in-flight operation tracker.
 */
export function createCancellableJob(
  limiter: Bottleneck,
  expirationMs: number | undefined,
  track: (promise: Promise<boolean>) => unknown
): { scheduleOpts: Bottleneck.JobOptions; abandon: () => void } {
  const id = `rl-${++scheduledJobSeq}`;
  return {
    scheduleOpts: expirationMs && expirationMs > 0 ? { id, expiration: expirationMs } : { id },
    abandon: () => {
      track(cancelQueuedJob(limiter, id));
    },
  };
}
