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
    rateLimitOverrides: (source?.rateLimitOverrides ?? null) as Record<string, number> | null,
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

// Sanitize the per-connection rate limit overrides map: keep only known
// fields with valid numeric values. Called once at each write-path boundary.
export function sanitizeRateLimitOverrides(value: unknown): Record<string, number> | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "object" || Array.isArray(value)) return null;
  const allowedKeys = new Set(["rpm", "tpm", "tpd", "minTime", "maxConcurrent"]);
  const map: Record<string, number> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (!allowedKeys.has(key)) continue;
    if (typeof v === "number" && Number.isInteger(v) && v >= 0) {
      map[key] = v;
    }
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

// Sanitize the per-window threshold map: keep only 0-100 integer values.
// Called once at each write-path boundary (createProviderConnection +
// updateProviderConnection) so both the in-memory return and the persisted
// row share the same shape. Serialization below trusts this output.
export function sanitizeQuotaWindowThresholds(value: unknown): Record<string, number> | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "object" || Array.isArray(value)) return null;
  const map: Record<string, number> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 100) {
      map[key] = v;
    }
  }
  return Object.keys(map).length === 0 ? null : map;
}

export function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function toNumberOrZero(value: unknown): number {
  return typeof value === "number" ? value : 0;
}
