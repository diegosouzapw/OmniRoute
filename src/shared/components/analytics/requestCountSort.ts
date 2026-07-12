/**
 * requestCountSort — pure sort helper for #4009's request-count-by-provider-date table.
 * Split out of RequestCountByProviderDateTable to keep that container under the
 * max-lines-per-function complexity gate.
 */

import type { ProviderDailyUsageRow, RequestCountSortField } from "./RequestCountTable";

export function sortProviderDailyUsageRows(
  rows: ProviderDailyUsageRow[],
  sortBy: RequestCountSortField,
  sortOrder: "asc" | "desc"
): ProviderDailyUsageRow[] {
  const arr = [...rows];
  arr.sort((a, b) => {
    const va = a[sortBy];
    const vb = b[sortBy];
    if (typeof va === "string" && typeof vb === "string") {
      return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return sortOrder === "asc" ? Number(va) - Number(vb) : Number(vb) - Number(va);
  });
  return arr;
}
