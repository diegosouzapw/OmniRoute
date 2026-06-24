/**
 * usage/scalars.ts — pure scalar + string coercion helpers for usage fetchers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the zero-dependency
 * primitives that the per-provider usage fetchers lean on to coerce raw upstream JSON
 * (numbers, percentages, snake/camel field lookups, display labels). Pure — no network,
 * no DB, no module state — so they live as a neutral leaf that usage.ts (and future
 * per-provider fetcher leaves) import without a cycle. Behavior-preserving move.
 */

type JsonRecord = Record<string, unknown>;

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function toPercentage(value: unknown): number {
  return Math.max(0, Math.min(100, toNumber(value, 0)));
}

export function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function getFieldValue(source: unknown, snakeKey: string, camelKey: string): unknown {
  const obj = toRecord(source);
  return obj[snakeKey] ?? obj[camelKey] ?? null;
}

export function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function toDisplayLabel(value: string): string {
  return value
    .replace(/^copilot[_\s-]*/i, "")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => {
      if (/^pro\+$/i.test(part)) return "Pro+";
      if (/^[a-z]{2,}$/.test(part))
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      return part;
    })
    .join(" ")
    .trim();
}

export function pickFirstNonEmptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}
