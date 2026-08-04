/**
 * Pure sort helper for the Usage → Model Breakdown table (#8769).
 * Kept out of charts.tsx so the frozen god-file does not grow and so
 * sort behavior is unit-testable without mounting React.
 */

export type ModelBreakdownSortField =
  | "model"
  | "requests"
  | "promptTokens"
  | "completionTokens"
  | "totalTokens"
  | "cost";

export type ModelBreakdownSortOrder = "asc" | "desc";

export interface ModelBreakdownRow {
  model?: string | null;
  requests?: number | null;
  promptTokens?: number | null;
  completionTokens?: number | null;
  totalTokens?: number | null;
  cost?: number | null;
  pct?: number | string | null;
  [key: string]: unknown;
}

const STRING_FIELDS = new Set<ModelBreakdownSortField>(["model"]);

export function sortModelBreakdownRows(
  rows: readonly ModelBreakdownRow[] | null | undefined,
  sortBy: ModelBreakdownSortField,
  sortOrder: ModelBreakdownSortOrder
): ModelBreakdownRow[] {
  const arr = [...(rows || [])];
  arr.sort((a, b) => {
    const rawA = a[sortBy];
    const rawB = b[sortBy];

    if (STRING_FIELDS.has(sortBy) || typeof rawA === "string" || typeof rawB === "string") {
      const sa = String(rawA ?? "");
      const sb = String(rawB ?? "");
      const cmp = sa.localeCompare(sb, undefined, { sensitivity: "base", numeric: true });
      return sortOrder === "asc" ? cmp : -cmp;
    }

    const va = Number(rawA ?? 0);
    const vb = Number(rawB ?? 0);
    const safeA = Number.isFinite(va) ? va : 0;
    const safeB = Number.isFinite(vb) ? vb : 0;
    return sortOrder === "asc" ? safeA - safeB : safeB - safeA;
  });
  return arr;
}

export function nextModelBreakdownSort(
  currentBy: ModelBreakdownSortField,
  currentOrder: ModelBreakdownSortOrder,
  field: ModelBreakdownSortField
): { sortBy: ModelBreakdownSortField; sortOrder: ModelBreakdownSortOrder } {
  if (currentBy === field) {
    return { sortBy: field, sortOrder: currentOrder === "asc" ? "desc" : "asc" };
  }
  return { sortBy: field, sortOrder: "desc" };
}

/** Attach share % from summary totals when the API omitted `pct` (#8769 display). */
export function withModelBreakdownShare(
  rows: readonly ModelBreakdownRow[] | null | undefined,
  totalTokens: number | null | undefined
): ModelBreakdownRow[] {
  const total = Number(totalTokens ?? 0);
  return (rows || []).map((row) => {
    if (row.pct !== undefined && row.pct !== null && row.pct !== "") return { ...row };
    const tokens = Number(row.totalTokens ?? 0);
    const pct = total > 0 ? ((tokens / total) * 100).toFixed(1) : "0";
    return { ...row, pct };
  });
}
