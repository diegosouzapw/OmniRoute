/**
 * Shared resolution of the reachability-probe parameters (#8411).
 *
 * The scheduler sweep and the bulk "Test All" endpoint each carried their own copy of the
 * probe target and batch size. Both now resolve through here, so an operator tunes one
 * surface instead of two that can silently drift apart.
 *
 * The resolvers are pure and take the environment as a parameter, so tests never have to
 * mutate `process.env`.
 */

import { sleep } from "@omniroute/open-sse/utils/sleep";

export const DEFAULT_PROBE_TARGET = "https://httpbin.org/ip";
export const DEFAULT_PROBE_CONCURRENCY = 10;
export const DEFAULT_PROBE_STAGGER_MS = 100;

/**
 * Upper bounds. Making the batch size configurable without a ceiling would let a single
 * env var recreate the very probe storm this module exists to damp.
 */
export const MAX_PROBE_CONCURRENCY = 50;
export const MAX_PROBE_STAGGER_MS = 5000;

type ProbeEnv = Record<string, string | undefined>;

function resolveBoundedInt(raw: string | undefined, fallback: number, min: number, max: number) {
  const parsed = parseInt(raw ?? "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

/**
 * Deliberately keeps the historical `||` semantics: a target that is empty falls back to the
 * default, but one made only of whitespace is passed through untouched. Trimming it here would
 * silently change how an existing deployment behaves.
 */
export function resolveProbeTarget(env: ProbeEnv = process.env): string {
  return env.PROXY_HEALTH_TEST_URL || DEFAULT_PROBE_TARGET;
}

/** Floored at 1: a zero batch size would make the `i += concurrency` loop never advance. */
export function resolveProbeConcurrency(env: ProbeEnv = process.env): number {
  return resolveBoundedInt(
    env.PROXY_HEALTH_TEST_CONCURRENCY,
    DEFAULT_PROBE_CONCURRENCY,
    1,
    MAX_PROBE_CONCURRENCY
  );
}

export function resolveProbeStaggerMs(env: ProbeEnv = process.env): number {
  return resolveBoundedInt(
    env.PROXY_HEALTH_TEST_STAGGER_MS,
    DEFAULT_PROBE_STAGGER_MS,
    0,
    MAX_PROBE_STAGGER_MS
  );
}

/**
 * Delay before the Nth probe of a batch starts.
 *
 * A batch fires `Promise.allSettled(batch.map(...))`, so without this every probe leaves at the
 * same tick and a shared egress IP hits the target with `concurrency` simultaneous requests.
 * Spacing the departures is what removes that spike; the delay is a plain multiple of the index
 * rather than a random jitter so a sweep stays reproducible and exactly testable.
 *
 * The first probe of a batch always returns 0 — no batch is ever slowed down at its head.
 */
export function staggerDelayMs(indexInBatch: number, stepMs: number): number {
  if (indexInBatch <= 0 || stepMs <= 0) return 0;
  return indexInBatch * stepMs;
}

/**
 * Hold a probe back until its slot in the batch. Call this from the batch `map`, before the
 * probe itself: both call sites arm their timeout inside their own test function, so waiting
 * out here is what keeps every probe's timeout budget whole.
 */
export async function waitForProbeSlot(indexInBatch: number, stepMs: number): Promise<void> {
  const delay = staggerDelayMs(indexInBatch, stepMs);
  if (delay > 0) await sleep(delay);
}
