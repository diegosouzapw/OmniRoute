/**
 * db/caseMapping.ts — pure snake_case ↔ camelCase column mapping.
 *
 * Extracted from db/core.ts (god-file decomposition): the column-name conversion
 * helpers that translate raw SQLite rows (snake_case columns, 0/1 booleans, `_json`
 * TEXT columns) into the camelCase shapes the domain modules consume. Pure — no DB
 * handle, no module state — so they live as a co-located leaf that every db/ module
 * (and core.ts itself) imports. core.ts re-exports all five so existing call sites that
 * pull these helpers off the core module keep working unchanged.
 */

type JsonRecord = Record<string, unknown>;

const BOOLEAN_CAMEL_COLUMNS = new Set([
  "isActive",
  "rateLimitProtection",
  "proxyEnabled",
  "perKeyProxyEnabled",
  "quotaVisible",
]);

export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

export function objToSnake(obj: unknown): unknown {
  if (!obj || typeof obj !== "object") return obj;
  const result: JsonRecord = {};
  for (const [k, v] of Object.entries(obj as JsonRecord)) {
    result[toSnakeCase(k)] = v;
  }
  return result;
}

export function rowToCamel(row: unknown): JsonRecord | null {
  if (!row) return null;
  const result: JsonRecord = {};
  for (const [k, v] of Object.entries(row as JsonRecord)) {
    const camelKey = toCamelCase(k);
    if (BOOLEAN_CAMEL_COLUMNS.has(camelKey)) {
      result[camelKey] = v === 1 || v === true;
    } else if (camelKey === "providerSpecificData" && typeof v === "string") {
      try {
        result[camelKey] = JSON.parse(v);
      } catch {
        result[camelKey] = v;
      }
    } else if (camelKey.endsWith("Json")) {
      // Convention: any column with a `_json` suffix is JSON-encoded TEXT.
      // Surface the parsed object under the friendlier name (key minus the
      // "Json" suffix) — e.g. quotaWindowThresholdsJson → quotaWindowThresholds.
      // A NULL/absent column normalizes to `baseKey: null` (not the suffixed
      // key) so read and write paths expose a consistent shape.
      const baseKey = camelKey.slice(0, -"Json".length);
      if (typeof v === "string") {
        try {
          result[baseKey] = JSON.parse(v);
        } catch {
          result[baseKey] = null;
        }
      } else {
        result[baseKey] = v == null ? null : v;
      }
    } else {
      result[camelKey] = v;
    }
  }
  return result;
}

export function cleanNulls(obj: unknown): JsonRecord {
  const result: JsonRecord = {};
  for (const [k, v] of Object.entries((obj as JsonRecord) || {})) {
    if (v !== null && v !== undefined) {
      result[k] = v;
    }
  }
  return result;
}
