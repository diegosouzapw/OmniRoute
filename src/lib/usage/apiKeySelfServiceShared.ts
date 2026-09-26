/**
 * Small value helpers shared by the GET /v1/me/status builder
 * (apiKeySelfService.ts) and its sibling modules (limits, account quotas).
 * Pure: no DB or network access.
 */

export type JsonRecord = Record<string, unknown>;
export type DateLike = number | string | Date | null | undefined;

export function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export { toNumber } from "@/shared/utils/numeric";

export function roundNumber(value: number, precision = 6): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(precision));
}

export function dateMsOrNull(value: DateLike): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (value instanceof Date) {
    const parsed = value.getTime();
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

export function isoOrNull(value: DateLike): string | null {
  const timestamp = dateMsOrNull(value);
  return timestamp === null ? null : new Date(timestamp).toISOString();
}
