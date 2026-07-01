/**
 * db/settings/shared.ts — Foundational types and helpers shared across settings leaf modules.
 */

export type JsonRecord = Record<string, unknown>;

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}
