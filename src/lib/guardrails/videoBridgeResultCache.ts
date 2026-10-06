import type { VideoBridgeRuntimeSettings } from "@/shared/constants/modalityBridgeDefaults";

import {
  BridgeCache,
  type BridgeCacheEntry,
  type BridgeCacheStore,
} from "./modalityBridge/bridgeCache";
import type { GuardrailContext } from "./base";

/** Aggregate in-memory budget for complete Video Bridge results. */
export const VIDEO_RESULT_CACHE_MAX_BYTES = 16 * 1024 * 1024;

let sharedResultCache: { cache: BridgeCache; maxEntries: number; ttlMs: number } | null = null;

/**
 * Resolve the process-wide complete-result cache for Video Bridge settings.
 *
 * @param settings - Runtime TTL and entry-count bounds.
 * @returns A cache isolated from the frame/caption bridge cache.
 */
export function getSharedVideoResultCacheFor(
  settings: Pick<VideoBridgeRuntimeSettings, "cacheTtlMinutes" | "cacheMaxEntries">
): BridgeCache {
  const ttlMs = settings.cacheTtlMinutes * 60_000;
  if (
    !sharedResultCache ||
    sharedResultCache.ttlMs !== ttlMs ||
    sharedResultCache.maxEntries !== settings.cacheMaxEntries
  ) {
    sharedResultCache = {
      cache: new BridgeCache({
        maxBytes: VIDEO_RESULT_CACHE_MAX_BYTES,
        maxEntries: settings.cacheMaxEntries,
        ttlMs,
      }),
      maxEntries: settings.cacheMaxEntries,
      ttlMs,
    };
  }
  return sharedResultCache.cache;
}

interface VideoFlight {
  controller: AbortController;
  promise: Promise<unknown>;
  settled: boolean;
  waiters: number;
}

const videoDownloadFlights = new Map<string, VideoFlight>();
const videoResultFlights = new Map<string, VideoFlight>();

/**
 * Build the canonical abort error used by Video Bridge waiters.
 *
 * @returns A sanitized abort error safe to propagate through the guardrail.
 */
export function videoBridgeAbortError(): Error {
  return new Error("Video Bridge processing was aborted");
}

function waitForVideoFlight<T>(flight: VideoFlight, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(videoBridgeAbortError());
  return new Promise<T>((resolve, reject) => {
    let completed = false;
    const finish = (callback: () => void): void => {
      if (completed) return;
      completed = true;
      signal.removeEventListener("abort", onAbort);
      callback();
    };
    const onAbort = (): void => finish(() => reject(videoBridgeAbortError()));
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
    (flight.promise as Promise<T>).then(
      (value) => finish(() => resolve(value)),
      (error: unknown) => finish(() => reject(error))
    );
  });
}

async function runVideoSingleflight<T>(
  flights: Map<string, VideoFlight>,
  key: string,
  signal: AbortSignal,
  operation: (signal: AbortSignal) => Promise<T>
): Promise<{ coalesced: boolean; value: T }> {
  let flight = flights.get(key);
  const coalesced = Boolean(flight);
  if (!flight) {
    const controller = new AbortController();
    flight = {
      controller,
      promise: Promise.resolve().then(() => operation(controller.signal)),
      settled: false,
      waiters: 0,
    };
    const createdFlight = flight;
    flights.set(key, createdFlight);
    createdFlight.promise.then(
      () => {
        createdFlight.settled = true;
        if (flights.get(key) === createdFlight) flights.delete(key);
      },
      () => {
        createdFlight.settled = true;
        if (flights.get(key) === createdFlight) flights.delete(key);
      }
    );
  }
  flight.waiters += 1;
  try {
    return { coalesced, value: await waitForVideoFlight<T>(flight, signal) };
  } finally {
    flight.waiters = Math.max(0, flight.waiters - 1);
    if (flight.waiters === 0 && !flight.settled) {
      flight.controller.abort();
      if (flights.get(key) === flight) flights.delete(key);
    }
  }
}

/**
 * Coalesce only concurrent protected downloads and release the Buffer after the flight settles.
 *
 * @param key - Hashed remote-part and request-isolation identity.
 * @param signal - Abort signal for this waiter only.
 * @param operation - Protected downloader invoked once with a shared producer signal.
 * @returns The downloaded value shared by active waiters; it is never retained after settlement.
 * @throws When this waiter aborts or the shared producer rejects.
 */
export async function runVideoDownloadSingleflight<T>(
  key: string,
  signal: AbortSignal,
  operation: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  return (await runVideoSingleflight(videoDownloadFlights, key, signal, operation)).value;
}

/**
 * Coalesce identical complete-result work while preserving each waiter's abort signal.
 *
 * @param key - Complete-result cache key.
 * @param signal - Abort signal for this waiter only.
 * @param operation - Producer invoked once with a shared signal.
 * @returns The produced value and whether this waiter joined existing work.
 * @throws When this waiter aborts or the shared producer rejects.
 */
export async function runVideoResultSingleflight<T>(
  key: string,
  signal: AbortSignal,
  operation: (signal: AbortSignal) => Promise<T>
): Promise<{ coalesced: boolean; value: T }> {
  return runVideoSingleflight(videoResultFlights, key, signal, operation);
}

type ResultCacheOperation = "delete" | "read" | "write";

function logCacheFailure(
  log: GuardrailContext["log"],
  operation: ResultCacheOperation,
  error: unknown
): void {
  const message = `Video result cache ${operation} failed open`;
  const meta = { errorType: error instanceof Error ? error.name : typeof error };
  if (log?.debug) {
    log.debug("VIDEO_BRIDGE_CACHE", message, meta);
  } else {
    console.debug(`[VIDEO_BRIDGE_CACHE] ${message}`, meta);
  }
}

/**
 * Read a complete-result cache entry without allowing cache failure to break video processing.
 *
 * @param cache - Cache implementation, including caller-supplied adapters.
 * @param key - Complete-result key.
 * @param log - Optional request logger for fail-open diagnostics.
 * @returns The entry, or `undefined` for misses and cache failures.
 */
export function safeGetCacheEntry(
  cache: BridgeCacheStore,
  key: string,
  log?: GuardrailContext["log"]
): BridgeCacheEntry | undefined {
  try {
    return cache.getEntry(key);
  } catch (error) {
    logCacheFailure(log, "read", error);
    return undefined;
  }
}

/**
 * Delete an invalid complete-result entry without breaking video processing.
 *
 * @param cache - Cache implementation, including caller-supplied adapters.
 * @param key - Complete-result key.
 * @param log - Optional request logger for fail-open diagnostics.
 */
export function safeDeleteCacheEntry(
  cache: BridgeCacheStore,
  key: string,
  log?: GuardrailContext["log"]
): void {
  try {
    cache.delete(key);
  } catch (error) {
    logCacheFailure(log, "delete", error);
  }
}

/**
 * Store a computed complete result without allowing cache failure to discard valid output.
 *
 * @param cache - Cache implementation, including caller-supplied adapters.
 * @param key - Complete-result key.
 * @param entry - Valid computed description and metadata.
 * @param log - Optional request logger for fail-open diagnostics.
 */
export function safeSetCacheEntry(
  cache: BridgeCacheStore,
  key: string,
  entry: BridgeCacheEntry,
  log?: GuardrailContext["log"]
): void {
  try {
    cache.setEntry(key, entry);
  } catch (error) {
    logCacheFailure(log, "write", error);
  }
}
