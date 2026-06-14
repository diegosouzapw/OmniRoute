import { type CostExplorerGroupBy } from "./costExplorerUtils";

export type CostRange = "7d" | "30d" | "90d" | "all";

const COST_RANGE_VALUES = new Set<CostRange>(["7d", "30d", "90d", "all"]);
const EXPLORER_GROUP_VALUES = new Set<CostExplorerGroupBy>([
  "provider",
  "model",
  "apiKey",
  "account",
  "serviceTier",
]);

/** Hydrate the Cost Explorer date range from an untrusted URL param. Falls back to "30d". */
export function parseCostRange(value: string | null): CostRange {
  return value && COST_RANGE_VALUES.has(value as CostRange) ? (value as CostRange) : "30d";
}

/** Hydrate the Cost Explorer group-by from an untrusted URL param. Falls back to "provider". */
export function parseExplorerGroupBy(value: string | null): CostExplorerGroupBy {
  return value && EXPLORER_GROUP_VALUES.has(value as CostExplorerGroupBy)
    ? (value as CostExplorerGroupBy)
    : "provider";
}

/**
 * Parse a comma-separated `apiKeyIds` URL param into a de-duplicated, trimmed list.
 * Empty/whitespace-only entries are dropped; order of first appearance is preserved.
 */
export function parseApiKeyIds(value: string | null): string[] {
  if (!value) return [];
  const seen = new Set<string>();
  for (const rawId of value.split(",")) {
    const id = rawId.trim();
    if (id) seen.add(id);
  }
  return [...seen];
}
