/**
 * Adaptive keepalive threshold tuning from Jev first-byte predictions.
 *
 * `resolveKeepaliveThreshold(model)` is the static delay after which
 * `withEarlyStreamKeepalive` stops waiting on the handler and commits to a 200
 * `text/event-stream` response; the FIRST byte of that stream is the client's
 * time-to-first-byte. Jev's routing decision predicts, for each request class
 * (model + tool presence), whether the first output token needs long internal
 * reasoning. Callers record those predictions per tuning key here, and the
 * streaming routes feed the same key through `applyJevKeepaliveTuning` on top
 * of the static value.
 *
 * Lowering the threshold is safe because it only moves the commit-to-keepalive
 * (and therefore the first byte) earlier: it never delays the handler, and for
 * callers whose watchdog is tighter than the threshold it is the difference
 * between a served response and a silent client abort. The one tier this must
 * not touch is the SLOW tier (> 2000 ms, browser-session / anonymous fallback
 * providers): those callers already expect a multi-second first byte, so early
 * SSE framing is the worse trade (see keepaliveThreshold.ts) — tuning bails out
 * above 2000 ms.
 *
 * Inert by default: with the keepalive Jev lane off, no recorded samples,
 * fewer than 3 samples, or a long-first-byte rate below 50%, the static
 * threshold is returned unchanged.
 */

import { isJevFeatureEnabled } from "../services/jev/index.ts";

/** Bounded store: one entry per model/tool-shape request class. */
const MAX_TUNING_KEYS = 128;
const MIN_SAMPLES = 3;
const LONG_FIRST_BYTE_RATE = 0.5;
/** The SLOW tier starts above this; tuning never applies to it. */
const SLOW_TIER_MIN_MS = 2_000;
const TUNED_CEILING_MS = 750;
const TUNED_FLOOR_MS = 500;

interface FirstByteSamples {
  samples: number;
  longSamples: number;
}

/** Insertion order doubles as LRU order: re-recording moves a key to the back. */
const samplesByKey = new Map<string, FirstByteSamples>();

export interface KeepaliveTuningKeyInput {
  model: string | null | undefined;
  hasTools: boolean;
}

/** Stable, cheap key: model identity plus tool presence (null/undefined share one bucket). */
export function buildKeepaliveTuningKey(input: KeepaliveTuningKeyInput): string {
  const model = input.model ? input.model : "-";
  return `m=${model}|t=${input.hasTools ? 1 : 0}`;
}

/**
 * Record one Jev first-byte prediction for a request class. `longFirstByte` is
 * Jev's call that this class will think for a long time before its first token.
 */
export function recordJevFirstBytePrediction(key: string, longFirstByte: boolean): void {
  if (!key) return;
  const existing = samplesByKey.get(key);
  if (existing) samplesByKey.delete(key);
  else if (samplesByKey.size >= MAX_TUNING_KEYS) {
    const oldest = samplesByKey.keys().next().value;
    if (oldest !== undefined) samplesByKey.delete(oldest);
  }
  samplesByKey.set(key, {
    samples: (existing?.samples ?? 0) + 1,
    longSamples: (existing?.longSamples ?? 0) + (longFirstByte ? 1 : 0),
  });
}

/**
 * Tune the static threshold for one request class. Fail-open: unless the class
 * has enough samples, is usually slow to first byte, and sits below the SLOW
 * tier, the static threshold is returned unchanged.
 */
export function applyJevKeepaliveTuning(staticThresholdMs: number, key: string | null): number {
  if (!isJevFeatureEnabled("keepalive")) return staticThresholdMs;
  if (!key) return staticThresholdMs;
  const entry = samplesByKey.get(key);
  if (!entry || entry.samples < MIN_SAMPLES) return staticThresholdMs;
  if (entry.longSamples / entry.samples < LONG_FIRST_BYTE_RATE) return staticThresholdMs;
  if (staticThresholdMs > SLOW_TIER_MIN_MS) return staticThresholdMs;
  return Math.max(TUNED_FLOOR_MS, Math.min(staticThresholdMs, TUNED_CEILING_MS));
}

export function __resetKeepaliveJevTuningForTests(): void {
  samplesByKey.clear();
}
