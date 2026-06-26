/**
 * Small, pure logging / usage-tracking helpers extracted from chatCore.ts.
 *
 * These four functions have in common that they are:
 *   1. Self-contained (no module-level state, no side effects).
 *   2. Generic enough to be useful from sibling modules (telemetryHelpers,
 *      providerRequestLogging, the upcoming imageGen subcommand).
 *   3. Trivial to unit-test in isolation.
 *
 * They were previously defined as inline private helpers inside the
 * 4,944-line `chatCore.ts` monolith.
 */
// ---------------------------------------------------------------------------
// Numeric coercion
// ---------------------------------------------------------------------------

/**
 * Coerces an unknown value into a positive finite number, defaulting to 0.
 *
 * Used to defensively read usage-token counts out of provider payloads
 * that are loosely typed (`Record<string, unknown>`).  Any non-number,
 * non-finite, or non-positive value collapses to 0 -- never throws, never
 * returns NaN, never returns a negative.
 *
 * @param value - Anything (typically pulled from a JSON usage object).
 * @returns The value if it is a positive finite number, otherwise 0.
 *
 * @example
 *   toPositiveNumber(42);     // 42
 *   toPositiveNumber(0);      // 0 (not positive)
 *   toPositiveNumber(-5);     // 0
 *   toPositiveNumber(NaN);    // 0
 *   toPositiveNumber("42");   // 0 (string rejected -- strict type check)
 *   toPositiveNumber(null);   // 0
 *   toPositiveNumber(undefined); // 0
 *   toPositiveNumber(Infinity);  // 0 (not finite)
 */
export function toPositiveNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

// ---------------------------------------------------------------------------
// Cache usage metadata
// ---------------------------------------------------------------------------

export interface CacheUsageLogMeta {
  cacheReadTokens: number;
  cacheCreationTokens: number;
}

/**
 * Extracts provider cache-usage fields from a loosely-typed usage object.
 *
 * Different providers surface cache hits under different keys:
 *   - Anthropic:  `cache_read_input_tokens`, `cache_creation_input_tokens`
 *   - OpenAI:     `prompt_tokens_details.cached_tokens`
 *                 `prompt_tokens_details.cache_creation_tokens`
 *   - Gemini:     `cachedTokens`
 *
 * This helper normalises all of them into a single `{ cacheReadTokens,
 * cacheCreationTokens }` record.  Returns `null` when the usage object
 * contains none of the known cache fields -- callers should treat that as
 * "no cache information available" and skip emitting cache-related log
 * metadata.
 *
 * @param usage - The provider's usage object (or null/undefined).
 * @returns Normalised cache metadata, or null when no cache fields present.
 */
export function buildCacheUsageLogMeta(
  usage: Record<string, unknown> | null | undefined
): CacheUsageLogMeta | null {
  if (!usage || typeof usage !== "object") return null;
  const promptTokenDetails =
    usage.prompt_tokens_details && typeof usage.prompt_tokens_details === "object"
      ? (usage.prompt_tokens_details as Record<string, unknown>)
      : undefined;
  const hasCacheFields =
    "cache_read_input_tokens" in usage ||
    "cached_tokens" in usage ||
    "cache_creation_input_tokens" in usage ||
    (!!promptTokenDetails &&
      ("cached_tokens" in promptTokenDetails || "cache_creation_tokens" in promptTokenDetails));
  const cacheReadTokens = toPositiveNumber(
    usage.cache_read_input_tokens ?? usage.cached_tokens ?? promptTokenDetails?.cached_tokens
  );
  const cacheCreationTokens = toPositiveNumber(
    usage.cache_creation_input_tokens ?? promptTokenDetails?.cache_creation_tokens
  );
  if (!hasCacheFields) return null;
  return {
    cacheReadTokens,
    cacheCreationTokens,
  };
}

// ---------------------------------------------------------------------------
// Log metadata attachment
// ---------------------------------------------------------------------------

/**
 * Merges an `_omniroute` metadata block into a log payload.
 *
 * chatCore attaches an `_omniroute` namespace to usage-log payloads so
 * downstream consumers (the analytics dashboard, the billing pipeline) can
 * read fork-specific signals (cache hit ratios, combo routing decisions,
 * compression savings) without polluting the provider's own schema.
 *
 * Behaviour:
 *   - `null` / `undefined` meta -> payload returned unchanged (empty object).
 *   - meta with only nullish values -> payload returned unchanged (empty object).
 *   - non-object payload (string / number / array) -> wrapped as
 *     `{ _omniroute: meta, _payload: payload }`.
 *   - object payload -> `_omniroute` is merged in, existing keys preserved.
 *
 * @param payload - The log payload to enrich (may be null).
 * @param meta - The metadata block to attach (may be null).
 * @returns The enriched payload (same reference when no meta applied).
 */
export function attachLogMeta(
  payload: Record<string, unknown> | null | undefined,
  meta: Record<string, unknown> | null | undefined
): Record<string, unknown> {
  if (!meta || typeof meta !== "object") return payload ?? {};
  const compactMeta = Object.fromEntries(
    Object.entries(meta).filter(([, value]) => value !== null && value !== undefined)
  );
  if (Object.keys(compactMeta).length === 0) return payload ?? {};
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { _omniroute: compactMeta, _payload: payload ?? null };
  }
  const existing =
    payload._omniroute &&
    typeof payload._omniroute === "object" &&
    !Array.isArray(payload._omniroute)
      ? payload._omniroute
      : {};
  return {
    ...payload,
    _omniroute: {
      ...existing,
      ...compactMeta,
    },
  };
}

// ---------------------------------------------------------------------------
// Executor client headers
// ---------------------------------------------------------------------------

/**
 * Normalises inbound headers into a plain `Record<string, string>` and
 * injects the client user-agent when it is absent.
 *
 * Accepts either a `Headers` instance (Web Fetch API) or a loose object.
 * Non-string values from a loose object are dropped.  The user-agent is
 * set under BOTH `user-agent` and `User-Agent` so downstream executors
 * that key off either casing see it.
 *
 * @param headers - `Headers` instance or a loose object (or null).
 * @param userAgent - Optional user-agent string to inject.
 * @returns The normalised header record, or null when empty.
 */
export function buildExecutorClientHeaders(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null
): Record<string, string> | null {
  const normalized: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      normalized[key] = value;
    });
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === "string") {
        normalized[key] = value;
      }
    }
  }

  const normalizedUserAgent = typeof userAgent === "string" ? userAgent.trim() : "";
  if (normalizedUserAgent && !normalized["user-agent"] && !normalized["User-Agent"]) {
    normalized["user-agent"] = normalizedUserAgent;
    normalized["User-Agent"] = normalizedUserAgent;
  }

  return Object.keys(normalized).length > 0 ? normalized : null;
}
