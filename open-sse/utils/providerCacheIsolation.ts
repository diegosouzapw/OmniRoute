/**
 * Provider-cache isolation helpers.
 *
 * OmniRoute's semantic response cache is already namespaced by the downstream
 * API-key id. Provider-side prompt/response caches are different: shared
 * upstream credentials can make their cache namespace wider than one
 * downstream key. Strict keys therefore strip every known prompt-cache hint
 * immediately before the executor serializes the upstream request.
 */

const PROVIDER_CACHE_FIELDS = new Set([
  "cache_control",
  "prompt_cache_key",
  "promptCacheKey",
  "prompt_cache_retention",
  "promptCacheRetention",
]);

function stripValue(value: unknown, seen: WeakSet<object>): unknown {
  if (!value || typeof value !== "object") return value;
  if (seen.has(value)) return value;
  seen.add(value);

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      value[index] = stripValue(value[index], seen);
    }
    return value;
  }

  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (PROVIDER_CACHE_FIELDS.has(key)) {
      delete record[key];
      continue;
    }
    record[key] = stripValue(record[key], seen);
  }
  return record;
}

/**
 * Remove provider-side cache controls from an already request-local payload.
 *
 * Mutating the request-local object is intentional: this runs on the final
 * executor payload and avoids a second full deep clone for large contexts.
 */
export function stripProviderCacheControls<T>(payload: T): T {
  return stripValue(payload, new WeakSet()) as T;
}
