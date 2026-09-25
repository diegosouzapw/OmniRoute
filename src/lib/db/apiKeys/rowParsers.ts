/**
 * db/apiKeys/rowParsers.ts — pure column parsers for persisted api_keys rows.
 *
 * Extracted verbatim from db/apiKeys.ts (god-file decomposition): the family of
 * functions that coerce raw SQLite column values (JSON strings, 0/1 flags, nullable
 * timestamps) into the typed shapes the host hydrates rows with. Pure — no DB handle,
 * no caches, no side effects — so they live as a co-located leaf. Behavior-preserving
 * move; apiKeys.ts imports them back for getApiKeys/getApiKeyById/getApiKeyMetadata.
 */

import type { AccessSchedule, RateLimitRule } from "./types";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
export { parseModelAccessMode } from "./modelAccessMode";
export type { ModelAccessMode } from "./modelAccessMode";

/**
 * Helper function to safely parse allowed_models JSON
 */
export function parseAllowedModels(value: unknown): string[] {
  // Was a third copy of parseStringList's body, and drifted from it at #14500.
  return parseStringList(value);
}

export function parseAllowedCombos(value: unknown): string[] {
  // Migration 149 may already be recorded before an older writer creates a key.
  // Preserve those legacy NULL rows as allow-all while keeping explicit [] deny-all.
  if (value === null || value === undefined) return [ALL_COMBOS_ACCESS_RULE];
  return parseStringList(value);
}

export function parseNoLog(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function parseAutoResolve(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function parseDisableNonPublicModels(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function parseAllowUsageCommand(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function parseChaosModeEnabled(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function parseIsActive(value: unknown): boolean {
  // DEFAULT 1 — active unless explicitly set to 0
  if (value === 0 || value === "0" || value === false) return false;
  return true;
}

export function parseCompressionEnabled(value: unknown): boolean {
  // DEFAULT 1 — preserve compression for legacy rows unless explicitly disabled.
  if (value === 0 || value === "0" || value === false) return false;
  return true;
}

export function parseAllowAutoCombos(value: unknown): boolean {
  // DEFAULT 1 — a key predating this column keeps its auto/* access.
  if (value === 0 || value === "0" || value === false) return false;
  return true;
}

export type CatalogScope = "all" | "combos" | "models";

export function parseCatalogScope(value: unknown): CatalogScope {
  // DEFAULT 'all' — a key predating this column advertises everything, as before.
  // An unrecognised value must widen to 'all' rather than silently hide rows.
  return value === "combos" || value === "models" ? value : "all";
}

export function parseAccessSchedule(value: unknown): AccessSchedule | null {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const obj = parsed as Record<string, unknown>;
    if (
      typeof obj["enabled"] !== "boolean" ||
      typeof obj["from"] !== "string" ||
      typeof obj["until"] !== "string" ||
      !Array.isArray(obj["days"]) ||
      typeof obj["tz"] !== "string"
    ) {
      return null;
    }
    const days = (obj["days"] as unknown[]).filter(
      (d): d is number => typeof d === "number" && Number.isInteger(d) && d >= 0 && d <= 6
    );
    return {
      enabled: obj["enabled"],
      from: obj["from"],
      until: obj["until"],
      days,
      tz: obj["tz"],
    };
  } catch {
    return null;
  }
}

export function parseRateLimits(value: unknown): RateLimitRule[] | null {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (rule: RateLimitRule) =>
        typeof rule === "object" &&
        rule !== null &&
        typeof rule.limit === "number" &&
        typeof rule.window === "number"
    ) as RateLimitRule[];
  } catch {
    return null;
  }
}

/**
 * Helper function to safely parse allowed_connections JSON
 */
export function parseAllowedConnections(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }
  if (!value || typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

/**
 * Helper function to safely parse allowed_quotas JSON
 */
export function parseAllowedQuotas(value: unknown): string[] {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

export function parseStringList(value: unknown): string[] {
  // #14500: a driver that decodes the column for us, or a writer that stored a real
  // array, hands us an Array rather than JSON text. Checked before the string guard
  // below, which would otherwise return [] and drop the key's whole allow-list before
  // policy evaluation — the request then fails as if nothing were permitted.
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }
  if (!value || typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

export function parseNullableTimestamp(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function parseIsBanned(value: unknown): boolean {
  return value === 1 || value === "1" || value === true;
}

export function parseStreamDefaultMode(value: unknown): "legacy" | "json" {
  return value === "json" ? "json" : "legacy";
}

export function parseCacheDefaultMode(value: unknown): "legacy" | "bypass" {
  return value === "bypass" ? "bypass" : "legacy";
}
