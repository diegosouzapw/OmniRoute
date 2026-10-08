import type { CatalogTestResult } from "./catalogTestStorage";
import { getComboTestKey } from "./catalogTestStorage";

export interface ComboCatalogStep {
  model: string;
  kind?: "combo-ref";
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

function toModelStep(step: Record<string, unknown>, model: string): ComboCatalogStep {
  return {
    model,
    provider: typeof step.provider === "string" ? step.provider : undefined,
    connectionId: typeof step.connectionId === "string" ? step.connectionId : undefined,
    weight: typeof step.weight === "number" ? step.weight : undefined,
    label: typeof step.label === "string" ? step.label : undefined,
  };
}

/** One combo member from the API payload, or null when the entry is not a known step shape. */
function toComboStep(m: unknown): ComboCatalogStep | null {
  if (typeof m === "string") return { model: m };
  if (!isRecord(m)) return null;
  // A nested combo step (`comboRefStepInputSchema`) counts as one member; the table
  // renders its translated "Combo → name" label from `kind`.
  if (m.kind === "combo-ref" && typeof m.comboName === "string") {
    return {
      model: m.comboName,
      kind: "combo-ref",
      ...(typeof m.label === "string" ? { label: m.label } : {}),
    };
  }
  if (
    m.kind === "provider-wildcard" &&
    typeof m.providerId === "string" &&
    typeof m.modelPattern === "string"
  ) {
    return { model: `${m.providerId}/${m.modelPattern}` };
  }
  if (typeof m.model === "string") {
    return toModelStep(m, m.model);
  }
  return null;
}

function flattenComboSteps(rawModels: unknown): ComboCatalogStep[] {
  const modelsList: ComboCatalogStep[] = [];
  if (!Array.isArray(rawModels)) return modelsList;
  for (const m of rawModels) {
    const step = toComboStep(m);
    if (step) modelsList.push(step);
  }
  return modelsList;
}

function comboDisplayName(item: Record<string, unknown>, name: string): string {
  return typeof item.displayName === "string" && item.displayName.trim().length > 0
    ? item.displayName
    : name;
}

function comboStatus(item: Record<string, unknown>): "active" | "paused" {
  const isInactive = item.isActive === false || item.enabled === false || item.status === "paused";
  return isInactive ? "paused" : "active";
}

function comboContextLength(item: Record<string, unknown>): number | undefined {
  if (typeof item.context_length === "number") return item.context_length;
  if (typeof item.computed_context_length === "number") return item.computed_context_length;
  return undefined;
}

/** One table row from the API payload, or null when the entry has no usable name. */
function toComboRow(item: unknown): ComboCatalogRow | null {
  if (!isRecord(item)) return null;

  const id = typeof item.id === "string" ? item.id : String(item.name || "");
  const name = typeof item.name === "string" ? item.name : "";
  if (!name) return null;

  const modelsList = flattenComboSteps(item.models);
  return {
    id,
    name,
    displayName: comboDisplayName(item, name),
    strategy: typeof item.strategy === "string" ? item.strategy : "priority",
    description: typeof item.description === "string" ? item.description : undefined,
    models: modelsList,
    memberCount: modelsList.length,
    status: comboStatus(item),
    contextLength: comboContextLength(item),
  };
}

export function flattenCombos(rawCombos: unknown): ComboCatalogRow[] {
  if (!Array.isArray(rawCombos)) return [];

  const rows: ComboCatalogRow[] = [];
  for (const item of rawCombos) {
    const row = toComboRow(item);
    if (row) rows.push(row);
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

function isSetNumber(value: number | undefined): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

function matchesMemberBounds(combo: ComboCatalogRow, filters: ComboCatalogFilters): boolean {
  if (isSetNumber(filters.minMembers) && combo.memberCount < filters.minMembers) {
    return false;
  }
  if (isSetNumber(filters.maxMembers) && combo.memberCount > filters.maxMembers) {
    return false;
  }
  return true;
}

function matchesComboTestResult(
  combo: ComboCatalogRow,
  testResult: string,
  testResults: Record<string, CatalogTestResult>
): boolean {
  if (testResult === "all") return true;
  const test = testResults[getComboTestKey(combo.name)];
  const resultStatus = test ? test.status : "untested";
  return resultStatus === testResult;
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

    if (!matchesMemberBounds(combo, filters)) {
      return false;
    }

    if (!matchesComboTestResult(combo, filters.testResult, testResults)) {
      return false;
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
