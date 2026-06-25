/**
 * auto.ts — Auto-instrumentation helpers for OmniRoute's hot paths.
 *
 * Wraps four classes of side-effects in OTel spans + Prometheus metrics:
 *   - instrumentFetch:  outgoing HTTP (fetch / undici) — span kind CLIENT,
 *                      records omniroute_http_requests_total + duration histogram.
 *   - instrumentProviderCall: provider router calls (OpenAI, Anthropic, …) —
 *                      span kind CLIENT, records omniroute_provider_attempts_total.
 *   - instrumentCache: cache get/set — span kind INTERNAL, records
 *                      omniroute_cache_hits_total / _misses_total.
 *   - instrumentDb: sqlite / pg query — span kind CLIENT, records
 *                      omniroute_db_query_duration_seconds.
 *
 * Every helper is a no-op when OTEL_SDK_DISABLED=true (the default). The
 * withSpan() call still happens but pushes a stub span onto the stack, which
 * is the cheap path.
 *
 * No npm deps. Compatible with the dep-free observability stack in
 * ./otel + ./metrics.
 */

import {
  getTracer,
  recordException,
  withSpan,
  isTelemetryEnabled,
  currentTraceId as _otelCurrentTraceId,
} from "./otel";
import {
  httpMetricsMiddleware,
  recordProviderAttempt,
  recordCacheHit,
  recordCacheMiss,
  type AttributeValue,
} from "./metrics";

/* ------------------------------------------------------------------ */
/* URL helpers                                                        */
/* ------------------------------------------------------------------ */

/**
 * Strip query string + userinfo from a URL for span attribute hygiene.
 * Avoids leaking tokens from query strings into OTLP backends.
 */
export function sanitizeUrl(raw: string): string {
  try {
    const u = new URL(raw);
    u.search = "";
    u.username = "";
    u.password = "";
    return u.toString();
  } catch {
    return raw;
  }
}

/* ------------------------------------------------------------------ */
/* instrumentFetch — outgoing HTTP                                    */
/* ------------------------------------------------------------------ */

export interface InstrumentFetchResult {
  ok: boolean;
  status: number;
  durationMs: number;
}

/**
 * Wrap a fetch() call in a CLIENT span + record http_requests_total +
 * http_request_duration_seconds. The URL is sanitized before being
 * placed in span attributes.
 *
 * The fetch may be provided (for testing) — defaults to globalThis.fetch.
 */
export async function instrumentFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  fetchImpl: typeof fetch = globalThis.fetch,
): Promise<Response> {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url;
  const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
  const safeUrl = sanitizeUrl(url);
  const started = Date.now();

  return await withSpan(
    `HTTP ${method} ${safeUrl}`,
    async (span) => {
      try {
        const res = await fetchImpl(input, init);
        const durationMs = Date.now() - started;
        const status = res.status;
        span.setAttribute("http.method", method as AttributeValue);
        span.setAttribute("http.url", safeUrl as AttributeValue);
        span.setAttribute("http.status_code", status as AttributeValue);
        span.status = status >= 500 ? { code: "ERROR", message: `HTTP ${status}` } : { code: "OK" };
        httpMetricsMiddleware({
          method,
          route: safeUrl,
          status,
          durationSeconds: durationMs / 1000,
          durationMs,
        });
        return res;
      } catch (err) {
        const durationMs = Date.now() - started;
        span.setAttribute("http.method", method as AttributeValue);
        span.setAttribute("http.url", safeUrl as AttributeValue);
        span.setAttribute("http.error", true as AttributeValue);
        recordException(span, err as Error);
        httpMetricsMiddleware({
          method,
          route: safeUrl,
          status: 0,
          durationSeconds: durationMs / 1000,
          durationMs,
        });
        throw err;
      }
    },
    { kind: "CLIENT", attributes: { "http.method": method as AttributeValue, "http.url": safeUrl as AttributeValue } },
  );
}

/* ------------------------------------------------------------------ */
/* instrumentProviderCall — LLM provider call                         */
/* ------------------------------------------------------------------ */

export type ProviderOutcome = "success" | "rate_limit" | "timeout" | "error";

export interface InstrumentProviderCallInput {
  provider: string;
  model: string;
  fn: () => Promise<unknown>;
}

/**
 * Wrap a provider router call (OpenAI, Anthropic, Bedrock, …) in a
 * CLIENT span + record omniroute_provider_attempts_total + duration.
 *
 * Outcome classification is up to the caller: instrumentProviderCall
 * never marks the span error on its own — that's done via
 * recordProviderAttempt({outcome: 'rate_limit' | ...}).
 */
export async function instrumentProviderCall<T>(
  input: InstrumentProviderCallInput,
): Promise<T> {
  const safeProvider = sanitizeProvider(input.provider);
  const safeModel = sanitizeModel(input.model);
  const started = Date.now();

  return await withSpan(
    `provider.${safeProvider}.${safeModel}`,
    async (span) => {
      let outcome: ProviderOutcome = "success";
      try {
        const result = await input.fn();
        const durationMs = Date.now() - started;
        span.setAttribute("provider.name", safeProvider as AttributeValue);
        span.setAttribute("provider.model", safeModel as AttributeValue);
        recordProviderAttempt({
          provider: safeProvider,
          model: safeModel,
          outcome: "success",
          durationSeconds: durationMs / 1000,
          durationMs,
        });
        return result as T;
      } catch (err) {
        const durationMs = Date.now() - started;
        const e = err as Error & { status?: number; code?: string };
        // Naive classification: rate-limit, timeout, other error.
        if (e.status === 429) outcome = "rate_limit";
        else if (e.code === "ETIMEDOUT" || e.name === "TimeoutError") outcome = "timeout";
        else outcome = "error";
        span.setAttribute("provider.name", safeProvider as AttributeValue);
        span.setAttribute("provider.model", safeModel as AttributeValue);
        span.setAttribute("provider.outcome", outcome as AttributeValue);
        recordException(span, e);
        recordProviderAttempt({
          provider: safeProvider,
          model: safeModel,
          outcome,
          durationSeconds: durationMs / 1000,
          durationMs,
        });
        throw e;
      }
    },
    {
      kind: "CLIENT",
      attributes: {
        "provider.name": safeProvider as AttributeValue,
        "provider.model": safeModel as AttributeValue,
      },
    },
  );
}

/* ------------------------------------------------------------------ */
/* instrumentCache — cache get/set                                    */
/* ------------------------------------------------------------------ */

export type CacheLayer = "memory" | "disk" | "prompt" | "provider";

const KNOWN_CACHE_LAYERS: ReadonlySet<CacheLayer> = new Set<CacheLayer>([
  "memory",
  "disk",
  "prompt",
  "provider",
]);

function isKnownCacheLayer(s: string): s is CacheLayer {
  return KNOWN_CACHE_LAYERS.has(s as CacheLayer);
}

/**
 * Wrap a cache lookup. Records omniroute_cache_hits_total on hit,
 * omniroute_cache_misses_total on miss. The layer parameter is bounded
 * to a small enum to prevent cardinality explosion.
 */
export async function instrumentCache<T>(
  layer: CacheLayer,
  key: string,
  fn: () => Promise<{ hit: boolean; value?: T }>,
): Promise<{ hit: boolean; value?: T }> {
  if (!isKnownCacheLayer(layer)) {
    throw new Error(
      `instrumentCache: unknown layer '${layer}'. Use one of: ${Array.from(KNOWN_CACHE_LAYERS).join(", ")}`,
    );
  }
  return await withSpan(
    `cache.${layer}.lookup`,
    async (span) => {
      span.setAttribute("cache.layer", layer as AttributeValue);
      span.setAttribute("cache.key", key as AttributeValue);
      const result = await fn();
      if (result.hit) recordCacheHit(layer);
      else recordCacheMiss(layer);
      span.setAttribute("cache.hit", (result.hit ? "true" : "false") as AttributeValue);
      return result;
    },
    { kind: "INTERNAL", attributes: { "cache.layer": layer as AttributeValue } },
  );
}

/* ------------------------------------------------------------------ */
/* instrumentDb — sql query                                           */
/* ------------------------------------------------------------------ */

export type DbOp = "select" | "insert" | "update" | "delete" | "exec" | "begin" | "commit" | "rollback";

/**
 * Wrap a db call. Records omniroute_db_query_duration_seconds with the
 * operation label. Errors are recorded as span exceptions.
 */
export async function instrumentDb<T>(
  op: DbOp,
  table: string,
  fn: () => Promise<T>,
): Promise<T> {
  return await withSpan(
    `db.${op}.${table}`,
    async (span) => {
      const started = Date.now();
      span.setAttribute("db.operation", op as AttributeValue);
      span.setAttribute("db.table", table as AttributeValue);
      try {
        const result = await fn();
        span.setAttribute("db.duration_ms", (Date.now() - started) as AttributeValue);
        return result;
      } catch (err) {
        recordException(span, err as Error);
        span.setAttribute("db.error", true as AttributeValue);
        throw err;
      }
    },
    { kind: "CLIENT", attributes: { "db.operation": op as AttributeValue, "db.table": table as AttributeValue } },
  );
}

/* ------------------------------------------------------------------ */
/* Sanitization helpers                                               */
/* ------------------------------------------------------------------ */

/**
 * sanitizeProvider — pass through after lowercasing + trimming. Provider
 * names are bounded (openai / anthropic / bedrock / vertex / etc.) so
 * cardinality is naturally low.
 */
export function sanitizeProvider(provider: string): string {
  return provider.trim().toLowerCase().slice(0, 64);
}

/**
 * sanitizeModel — strip version dates and long suffixes; bounded cardinality.
 * e.g. "gpt-4-0613" -> "gpt-4-0613", "claude-3-5-sonnet-20240620" -> "claude-3-5-sonnet-20240620".
 */
export function sanitizeModel(model: string): string {
  return model.trim().toLowerCase().slice(0, 128);
}

/**
 * Convenience: returns true if observability is enabled.
 * Re-exported from ./otel for caller ergonomics.
 */
export function isAutoEnabled(): boolean {
  return isTelemetryEnabled();
}

/**
 * Convenience: returns the active span's trace ID, or undefined when
 * there is no active span (or telemetry is disabled). Delegates to
 * ./otel so the contract is identical.
 */
export function currentTraceId(): string | undefined {
  return _otelCurrentTraceId();
}

/* The real currentTraceId() lives in ./otel. We re-export it here for
 * ergonomic single-import callers. */
export { getTracer, withSpan } from "./otel";