/**
 * db/providers/columns.ts — Pure column-normalizer helpers for provider_connections rows.
 * No DB access; no imports — JSON/Object/builtins only.
 */

export type JsonRecord = Record<string, unknown>;

export function withNullableMaxConcurrent(
  record: JsonRecord,
  source: JsonRecord | null | undefined
): JsonRecord {
  if (!source || !Object.hasOwn(source, "maxConcurrent")) {
    return record;
  }

  const sourceMaxConcurrent = source.maxConcurrent;
  const normalizedMaxConcurrent =
    typeof sourceMaxConcurrent === "number" || sourceMaxConcurrent === null
      ? sourceMaxConcurrent
      : record.maxConcurrent;

  return {
    ...record,
    maxConcurrent: normalizedMaxConcurrent,
  };
}

// Always surface `quotaWindowThresholds` (possibly null) on the returned
// object — `cleanNulls` strips null values, but the UI needs to see null so
// it can distinguish "no overrides on this connection" from "field was
// never read." Mirrors `withNullableMaxConcurrent`'s contract so create and
// update return the same shape regardless of whether the source had the key
// stripped or carried forward.
export function withNullableQuotaWindowThresholds(
  record: JsonRecord,
  source: JsonRecord | null | undefined
): JsonRecord {
  return {
    ...record,
    quotaWindowThresholds: (source?.quotaWindowThresholds ?? null) as Record<string, number> | null,
  };
}

// Always surface `rateLimitOverrides` (possibly null) — matches the pattern
// used by withNullableMaxConcurrent and withNullableQuotaWindowThresholds.
export function withNullableRateLimitOverrides(
  record: JsonRecord,
  source: JsonRecord | null | undefined
): JsonRecord {
  return {
    ...record,
    rateLimitOverrides: (source?.rateLimitOverrides ?? null) as ConnectionRateLimitOverrides | null,
  };
}

export function normalizeBooleanColumn(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "1" || normalized === "true") return true;
    if (normalized === "0" || normalized === "false") return false;
  }
  return fallback;
}

// Per-model upstream concurrency ceilings, keyed by the exact model string
// passed to the executor after routing resolution (normally the bare
// upstream model id, e.g. "glm-5"). Values are positive-integer
// concurrent-request ceilings. Optional; absent means no model-specific gate.
export type ModelConcurrencyMap = Record<string, number>;

// Bounds for `modelConcurrency` entries. Keys are bounded so a malicious
// payload can't bloat the DB row with megabyte-long model ids; caps are
// positive integers with the same ceiling as the scalar `maxConcurrent`
// override (10_000).
export const MODEL_CONCURRENCY_MAX_KEY_LENGTH = 128;
export const MODEL_CONCURRENCY_MAX_CAP = 10_000;

// Per-connection rate limit overrides shape. Scalar fields keep their legacy
// semantics; `modelConcurrency` adds opt-in per-model concurrency ceilings
// that compose with (not replace) the connection-wide `maxConcurrent` cap.
export interface ConnectionRateLimitOverrides {
  rpm?: number;
  rpd?: number;
  tpm?: number;
  tpd?: number;
  minTime?: number;
  maxConcurrent?: number;
  maxWaitMs?: number;
  executionMaxWaitMs?: number;
  modelConcurrency?: ModelConcurrencyMap;
}

// Result of sanitizing a per-connection overrides/threshold map. `sanitized`
// is the cleaned value (or null when it collapses to nothing); `rejected`
// lists every key that was refused so callers can fail loudly
// instead of silently dropping the operator's input.
export type SanitizeResult = {
  sanitized: Record<string, number> | null;
  rejected: string[];
};

// Sanitizer result for `rateLimitOverrides`, whose nested `modelConcurrency`
// map means the cleaned value is not a flat `Record<string, number>`.
export type SanitizeOverridesResult = {
  sanitized: ConnectionRateLimitOverrides | null;
  rejected: string[];
};

// Sanitize the per-connection rate limit overrides map: keep only known
// fields with valid non-negative integer values, plus the optional nested
// `modelConcurrency` map (validated by `sanitizeModelConcurrency`). Called
// once at each write-path boundary. Unknown keys and invalid values go into
// `rejected` rather than being dropped in silence.
export function sanitizeRateLimitOverrides(value: unknown): SanitizeOverridesResult {
  if (value === null || value === undefined) return { sanitized: null, rejected: [] };
  if (typeof value !== "object" || Array.isArray(value)) return { sanitized: null, rejected: [] };
  const allowedKeys = new Set([
    "rpm",
    "rpd",
    "tpm",
    "tpd",
    "minTime",
    "maxConcurrent",
    "maxWaitMs",
    "executionMaxWaitMs",
  ]);
  const rejected: string[] = [];
  const map: ConnectionRateLimitOverrides = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (key === "modelConcurrency") {
      const nested = sanitizeModelConcurrency(v);
      rejected.push(...nested.rejected);
      if (nested.sanitized) map.modelConcurrency = nested.sanitized;
      continue;
    }
    if (!allowedKeys.has(key)) {
      rejected.push(key);
      continue;
    }
    if (typeof v === "number" && Number.isInteger(v) && v >= 0) {
      (map as Record<string, number>)[key] = v;
    } else {
      rejected.push(key);
    }
  }
  return { sanitized: Object.keys(map).length === 0 ? null : map, rejected };
}

// Strict sanitizer for the nested `modelConcurrency` map: exact-match model
// keys (1..MODEL_CONCURRENCY_MAX_KEY_LENGTH chars) mapping to positive
// integer caps (1..MODEL_CONCURRENCY_MAX_CAP). `null`/undefined/empty maps
// normalize away to null (absent); malformed keys/values are reported as
// `modelConcurrency.<key>` (or bare `modelConcurrency` for a non-object) so
// the write path fails loudly instead of silently dropping operator intent.
export function sanitizeModelConcurrency(value: unknown): {
  sanitized: ModelConcurrencyMap | null;
  rejected: string[];
} {
  if (value === null || value === undefined) return { sanitized: null, rejected: [] };
  if (typeof value !== "object" || Array.isArray(value)) {
    return { sanitized: null, rejected: ["modelConcurrency"] };
  }
  const rejected: string[] = [];
  const map: ModelConcurrencyMap = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (
      key.length === 0 ||
      key.length > MODEL_CONCURRENCY_MAX_KEY_LENGTH ||
      typeof v !== "number" ||
      !Number.isInteger(v) ||
      v < 1 ||
      v > MODEL_CONCURRENCY_MAX_CAP
    ) {
      rejected.push(`modelConcurrency.${key}`);
      continue;
    }
    map[key] = v;
  }
  return { sanitized: Object.keys(map).length === 0 ? null : map, rejected };
}

// Fail-open runtime normalizer for the `modelConcurrency` map carried on
// credentials. Anything malformed or missing resolves to null ("no model
// cap") so a corrupt map never rejects an otherwise valid connection —
// strict rejection lives in `sanitizeModelConcurrency` at the write path.
export function normalizeModelConcurrencyMap(value: unknown): ModelConcurrencyMap | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const map: ModelConcurrencyMap = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (key.length === 0 || key.length > MODEL_CONCURRENCY_MAX_KEY_LENGTH) continue;
    const cap = typeof v === "number" && Number.isFinite(v) ? Math.trunc(v) : NaN;
    if (!Number.isInteger(cap) || cap < 1) continue;
    map[key] = Math.min(cap, MODEL_CONCURRENCY_MAX_CAP);
  }
  return Object.keys(map).length === 0 ? null : map;
}

// Serialize an already-sanitized map for SQLite TEXT storage.
export function serializeJsonField(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "object" || Array.isArray(value)) return null;
  return JSON.stringify(value);
}

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

// Sanitize the per-window threshold map: keep only 0-100 integer values with
// keys no longer than 64 chars. Called once at each write-path boundary
// (createProviderConnection + updateProviderConnection) so both the in-memory
// return and the persisted row share the same shape. Serialization below
// trusts this output. Invalid keys/values go into `rejected` rather than being
// dropped in silence.
export function sanitizeQuotaWindowThresholds(value: unknown): SanitizeResult {
  if (value === null || value === undefined) return { sanitized: null, rejected: [] };
  if (typeof value !== "object" || Array.isArray(value)) return { sanitized: null, rejected: [] };
  const rejected: string[] = [];
  const map: Record<string, number> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (key.length > 64) {
      rejected.push(key);
      continue;
    }
    if (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 100) {
      map[key] = v;
    } else {
      rejected.push(key);
    }
  }
  return { sanitized: Object.keys(map).length === 0 ? null : map, rejected };
}

export function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function toNumberOrZero(value: unknown): number {
  return typeof value === "number" ? value : 0;
}
