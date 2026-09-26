import type { CatalogTestResult } from "./catalogTestStorage";
import { getComboTestKey } from "./catalogTestStorage";

export interface ComboCatalogStep {
  model: string;
  provider?: string;
  connectionId?: string;
  weight?: number;
  label?: string;
}

export interface ComboCatalogRow {
  id: string;
  name: string;
  displayName: string;
  strategy: string;
  description?: string;
  models: ComboCatalogStep[];
  memberCount: number;
  status: "active" | "paused";
  contextLength?: number;
}

export interface ComboCatalogFilters {
  query: string;
  strategy: string;
  status: string;
  minMembers?: number;
  maxMembers?: number;
  testResult: string;
}

export type ComboSortField = "name" | "strategy" | "memberCount" | "status";
export type ComboSortDirection = "asc" | "desc";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function flattenCombos(rawCombos: unknown): ComboCatalogRow[] {
  if (!Array.isArray(rawCombos)) return [];

  const rows: ComboCatalogRow[] = [];
  for (const item of rawCombos) {
    if (!isRecord(item)) continue;

    const id = typeof item.id === "string" ? item.id : String(item.name || "");
    const name = typeof item.name === "string" ? item.name : "";
    if (!name) continue;

    const displayName =
      typeof item.displayName === "string" && item.displayName.trim().length > 0
        ? item.displayName
        : name;

    const strategy = typeof item.strategy === "string" ? item.strategy : "priority";
    const description = typeof item.description === "string" ? item.description : undefined;

    const modelsList: ComboCatalogStep[] = [];
    if (Array.isArray(item.models)) {
      for (const m of item.models) {
        if (typeof m === "string") {
          modelsList.push({ model: m });
        } else if (isRecord(m) && typeof m.model === "string") {
          modelsList.push({
            model: m.model,
            provider: typeof m.provider === "string" ? m.provider : undefined,
            connectionId: typeof m.connectionId === "string" ? m.connectionId : undefined,
            weight: typeof m.weight === "number" ? m.weight : undefined,
            label: typeof m.label === "string" ? m.label : undefined,
          });
        }
      }
    }

    const isInactive =
      item.isActive === false || item.enabled === false || item.status === "paused";
    const status: "active" | "paused" = isInactive ? "paused" : "active";

    const contextLength =
      typeof item.context_length === "number"
        ? item.context_length
        : typeof item.computed_context_length === "number"
          ? item.computed_context_length
          : undefined;

    rows.push({
      id,
      name,
      displayName,
      strategy,
      description,
      models: modelsList,
      memberCount: modelsList.length,
      status,
      contextLength,
    });
  }

  return rows;
}

function searchableComboText(combo: ComboCatalogRow): string {
  const parts = [
    combo.name,
    combo.displayName,
    combo.strategy,
    combo.description ?? "",
    ...combo.models.flatMap((m) => [m.model, m.provider ?? "", m.label ?? ""]),
  ];
  return parts.filter(Boolean).join(" ").toLocaleLowerCase();
}

export function filterCatalogCombos(
  combos: ComboCatalogRow[],
  filters: ComboCatalogFilters,
  testResults: Record<string, CatalogTestResult> = {}
): ComboCatalogRow[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return combos.filter((combo) => {
    if (filters.strategy !== "all" && combo.strategy !== filters.strategy) {
      return false;
    }

    if (filters.status !== "all" && combo.status !== filters.status) {
      return false;
    }

    if (
      typeof filters.minMembers === "number" &&
      !Number.isNaN(filters.minMembers) &&
      combo.memberCount < filters.minMembers
    ) {
      return false;
    }

    if (
      typeof filters.maxMembers === "number" &&
      !Number.isNaN(filters.maxMembers) &&
      combo.memberCount > filters.maxMembers
    ) {
      return false;
    }

    if (filters.testResult !== "all") {
      const testKey = getComboTestKey(combo.name);
      const test = testResults[testKey];
      const resultStatus = test ? test.status : "untested";
      if (resultStatus !== filters.testResult) {
        return false;
      }
    }

    if (query !== "" && !searchableComboText(combo).includes(query)) {
      return false;
    }

    return true;
  });
}

function compareText(left: string, right: string): number {
  const normalizedLeft = left.toLocaleLowerCase();
  const normalizedRight = right.toLocaleLowerCase();
  return normalizedLeft < normalizedRight ? -1 : normalizedLeft > normalizedRight ? 1 : 0;
}

export function sortCatalogCombos(
  combos: ComboCatalogRow[],
  field: ComboSortField,
  direction: ComboSortDirection
): ComboCatalogRow[] {
  const multiplier = direction === "asc" ? 1 : -1;
  return [...combos].sort((left, right) => {
    if (field === "memberCount") {
      const diff = left.memberCount - right.memberCount;
      if (diff !== 0) return diff * multiplier;
    } else {
      const leftVal = String(left[field] ?? "");
      const rightVal = String(right[field] ?? "");
      const comp = compareText(leftVal, rightVal);
      if (comp !== 0) return comp * multiplier;
    }
    return compareText(left.name, right.name);
  });
}

export function getComboCatalogPage<T>(
  rows: T[],
  requestedPage: number,
  requestedPageSize: number
): { rows: T[]; page: number; pageCount: number } {
  const pageSize =
    Number.isFinite(requestedPageSize) && requestedPageSize > 0 ? requestedPageSize : 50;
  const pageCount = Math.ceil(rows.length / pageSize);
  if (pageCount === 0) return { rows: [], page: 0, pageCount: 0 };

  const safePage = Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 0;
  const page = Math.min(Math.max(0, safePage), pageCount - 1);
  return {
    rows: rows.slice(page * pageSize, (page + 1) * pageSize),
    page,
    pageCount,
  };
}
