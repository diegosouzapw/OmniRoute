/**
 * src/lib/observability/auto.ts
 *
 * Drop-in instrumentations for the four hot I/O surfaces in OmniRoute:
 *   - fetch         (provider calls, outbound HTTP)
 *   - DB            (sqlite via better-sqlite3 wrapper)
 *   - cache         (semantic + prompt caches)
 *   - provider      (high-level provider dispatch)
 *
 * Each helper is a small wrapper that records a span + the relevant
 * metrics. Callers opt in by importing the helper and using it instead of
 * the raw primitive — no monkey-patching of globals, no surprises.
 *
 * We deliberately avoid wrapping globalThis.fetch directly: the import
 * surface is the contract, and explicit wrapping is auditable.
 */

import { withSpan, recordException, startSpan } from "./otel";
import type { Span } from "./otel";
import { recordProviderAttempt } from "./metrics";
import type { Counter, Histogram } from "./metrics";

/* ------------------------------------------------------------------ *
 *  fetch instrumentation                                              *
 * ------------------------------------------------------------------ */

export interface InstrumentedFetchOptions {
  /** Span name prefix (default "http.client"). */
  spanName?: string;
  /** Force span attributes like provider/model after the fact. */
  extraAttributes?: Record<string, string | number | boolean>;
  /** Hook fired when the fetch resolves. */
  onSuccess?: (response: Response, durationSeconds: number) => void;
  /** Hook fired when the fetch throws. */
  onError?: (error: unknown, durationSeconds: number) => void;
}

/**
 * Wrapper around `fetch` that emits a span and a duration histogram sample.
 * Does NOT instrument redirect bodies; the caller is expected to consume
 * the returned Response as usual.
 *
 * @param url target URL (string or Request)
 * @param init standard fetch init
 * @param opts extra instrumentation options
 */
export async function instrumentFetch(
  url: string | Request,
  init: RequestInit = {},
  opts: InstrumentedFetchOptions = {},
  durationHistogram?: Histogram
): Promise<Response> {
  const startTime = Date.now();
  const target = typeof url === "string" ? url : url.url;
  const method = init.method ?? (typeof url === "object" ? url.method : "GET") ?? "GET";
  return withSpan(
    opts.spanName ?? "http.client",
    async (span) => {
      span.attributes["http.method"] = method;
      span.attributes["http.url"] = target;
      if (opts.extraAttributes) {
        for (const [k, v] of Object.entries(opts.extraAttributes)) {
          span.attributes[k] = v;
        }
      }
      try {
        const response = await fetch(url, init);
        span.attributes["http.status_code"] = response.status;
        const dur = (Date.now() - startTime) / 1000;
        durationHistogram?.observe({ url: target, method, status: String(response.status) }, dur);
        opts.onSuccess?.(response, dur);
        return response;
      } catch (error) {
        recordException(error);
        const dur = (Date.now() - startTime) / 1000;
        durationHistogram?.observe({ url: target, method, status: "error" }, dur);
        opts.onError?.(error, dur);
        throw error;
      }
    }
  );
}

/* ------------------------------------------------------------------ *
 *  DB instrumentation                                                  *
 * ------------------------------------------------------------------ */

export interface InstrumentedDbOptions {
  /** Span name (default "db.query"). */
  spanName?: string;
  /** Database / connection name (e.g. "usage", "providers"). */
  dbSystem?: string;
  /** Statement kind: "select" | "insert" | "update" | "delete" | "exec". */
  dbOperation?: string;
  /** The SQL — included as a low-cardinality attribute when set. */
  dbStatement?: string;
}

/**
 * Wrap a database call. The wrapper records a span; if a histogram is
 * passed it observes the duration. Errors are re-thrown.
 */
export async function instrumentDb<T>(
  fn: () => Promise<T>,
  opts: InstrumentedDbOptions = {},
  durationHistogram?: Histogram
): Promise<T> {
  const start = Date.now();
  return withSpan(opts.spanName ?? "db.query", async (span) => {
    if (opts.dbSystem) span.attributes["db.system"] = opts.dbSystem;
    if (opts.dbOperation) span.attributes["db.operation"] = opts.dbOperation;
    if (opts.dbStatement) span.attributes["db.statement"] = opts.dbStatement;
    try {
      const result = await fn();
      const dur = (Date.now() - start) / 1000;
      durationHistogram?.observe(
        { system: opts.dbSystem ?? "unknown", operation: opts.dbOperation ?? "unknown" },
        dur
      );
      return result;
    } catch (error) {
      recordException(error);
      throw error;
    }
  });
}

/* ------------------------------------------------------------------ *
 *  Cache instrumentation                                              *
 * ------------------------------------------------------------------ */

export interface InstrumentedCacheOptions {
  /** Layer name (e.g. "prompt", "semantic"). */
  layer: string;
  /** Operation: "get" | "set" | "delete". */
  op: "get" | "set" | "delete";
  /** Cache key — high-cardinality, so it's only set on the span, not metrics. */
  key?: string;
}

/**
 * Record a cache span + the hit/miss counter sample (if the caller passes
 * a counter). The wrapper does NOT consult the cache — the caller already
 * knows whether it was a hit or miss.
 */
export async function instrumentCache<T>(
  outcome: "hit" | "miss",
  fn: () => Promise<T>,
  opts: InstrumentedCacheOptions,
  hitMissCounter?: Counter,
  durationHistogram?: Histogram
): Promise<T> {
  const start = Date.now();
  return withSpan("cache." + opts.op, async (span) => {
    span.attributes["cache.layer"] = opts.layer;
    span.attributes["cache.op"] = opts.op;
    span.attributes["cache.outcome"] = outcome;
    if (opts.key) span.attributes["cache.key"] = opts.key;
    try {
      const result = await fn();
      hitMissCounter?.inc({ layer: opts.layer, op: opts.op, outcome });
      const dur = (Date.now() - start) / 1000;
      durationHistogram?.observe({ layer: opts.layer, op: opts.op, outcome }, dur);
      return result;
    } catch (error) {
      recordException(error);
      throw error;
    }
  });
}

/* ------------------------------------------------------------------ *
 *  Provider instrumentation                                           *
 * ------------------------------------------------------------------ */

export interface InstrumentedProviderOptions {
  provider: string;
  model: string;
  /** What is the high-level operation? Defaults to "chat". */
  operation?: string;
}

export interface InstrumentedProviderResult<T> {
  value: T;
  durationSeconds: number;
}

/**
 * Wrap a provider call. Records a span + the provider attempts counter +
 * the provider duration histogram. Returns the value (re-throws errors).
 */
export async function instrumentProvider<T>(
  fn: () => Promise<T>,
  opts: InstrumentedProviderOptions,
  counters: { attempts: Counter; durations: Histogram }
): Promise<T> {
  const start = Date.now();
  return withSpan("provider." + (opts.operation ?? "chat"), async (span) => {
    span.attributes["provider.name"] = opts.provider;
    span.attributes["provider.model"] = opts.model;
    try {
      const result = await fn();
      const dur = (Date.now() - start) / 1000;
      recordProviderAttempt(counters.attempts, counters.durations, {
        provider: opts.provider,
        model: opts.model,
        outcome: "success",
        durationSeconds: dur,
      });
      return result;
    } catch (error) {
      const dur = (Date.now() - start) / 1000;
      const outcome: "error" | "timeout" | "rate_limited" = classifyError(error);
      recordProviderAttempt(counters.attempts, counters.durations, {
        provider: opts.provider,
        model: opts.model,
        outcome,
        durationSeconds: dur,
      });
      recordException(error);
      throw error;
    }
  });
}

/** Heuristic mapping from thrown errors to provider outcome labels. */
export function classifyError(error: unknown): "error" | "timeout" | "rate_limited" {
  if (!error) return "error";
  const msg = (error instanceof Error ? error.message : String(error)).toLowerCase();
  if (msg.includes("timeout") || msg.includes("aborted")) return "timeout";
  if (msg.includes("rate limit") || msg.includes("429")) return "rate_limited";
  return "error";
}

/** No-op span helper — useful when a caller wants a span attached to a region of code
 * but cannot use `withSpan` (e.g. synchronous callbacks). */
export function passiveSpan(name: string, attributes: Record<string, string | number | boolean> = {}): Span {
  // The span isn't pushed onto the ALS stack — it's just a handle for callers to
  // attach events / set status / record exceptions before discarding.
  return startSpan(name, { attributes, kind: "internal" });
}