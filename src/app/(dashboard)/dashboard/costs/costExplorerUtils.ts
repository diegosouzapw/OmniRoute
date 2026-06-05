export type CostExplorerGroupBy = "provider" | "model" | "apiKey" | "account" | "serviceTier";
export type CostExplorerSortKey =
  | "name"
  | "cost"
  | "requests"
  | "totalTokens"
  | "sharePct"
  | "avgCostPerRequest";
export type CostExplorerSortDirection = "asc" | "desc";

export interface CostExplorerUsageSummary {
  totalCost: number;
  totalRequests: number;
}

export interface CostExplorerBreakdownRow {
  provider?: string;
  model?: string;
  rawModel?: string;
  apiKey?: string;
  apiKeyId?: string | null;
  apiKeyName?: string;
  account?: string;
  serviceTier?: string;
  label?: string;
  requests: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens: number;
  cost: number;
  savings?: number;
  usageSavingsTokens?: number;
}

export interface CostExplorerAnalyticsPayload {
  summary: CostExplorerUsageSummary;
  byProvider?: CostExplorerBreakdownRow[];
  byModel?: CostExplorerBreakdownRow[];
  byApiKey?: CostExplorerBreakdownRow[];
  byAccount?: CostExplorerBreakdownRow[];
  byServiceTier?: CostExplorerBreakdownRow[];
}

export interface CostExplorerRow {
  id: string;
  name: string;
  detail: string;
  groupBy: CostExplorerGroupBy;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  avgCostPerRequest: number;
  sharePct: number;
}

const GROUP_LABEL_FIELDS: Record<CostExplorerGroupBy, Array<keyof CostExplorerBreakdownRow>> = {
  provider: ["provider"],
  model: ["model", "rawModel"],
  apiKey: ["apiKeyName", "apiKey", "apiKeyId"],
  account: ["account"],
  serviceTier: ["label", "serviceTier"],
};

function toFiniteNumber(value: unknown): number {
  const numericValue = Number(value || 0);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getRowLabel(row: CostExplorerBreakdownRow, groupBy: CostExplorerGroupBy): string {
  for (const field of GROUP_LABEL_FIELDS[groupBy]) {
    const value = row[field];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "Unknown";
}

function getRowDetail(row: CostExplorerBreakdownRow, groupBy: CostExplorerGroupBy): string {
  if (groupBy === "model") return row.provider || row.rawModel || "";
  if (groupBy === "apiKey") return row.apiKeyId || row.apiKey || "";
  if (groupBy === "provider") return row.model || "";
  if (groupBy === "serviceTier") return row.serviceTier || "";
  return "";
}

function getGroupRows(
  analytics: CostExplorerAnalyticsPayload,
  groupBy: CostExplorerGroupBy
): CostExplorerBreakdownRow[] {
  switch (groupBy) {
    case "provider":
      return analytics.byProvider || [];
    case "model":
      return analytics.byModel || [];
    case "apiKey":
      return analytics.byApiKey || [];
    case "account":
      return analytics.byAccount || [];
    case "serviceTier":
      return analytics.byServiceTier || [];
    default:
      return [];
  }
}

function getSortValue(row: CostExplorerRow, sortKey: CostExplorerSortKey): string | number {
  return sortKey === "name" ? row.name.toLowerCase() : row[sortKey];
}

export function buildCostExplorerRows({
  analytics,
  groupBy,
  searchQuery = "",
  sortKey = "cost",
  sortDirection = "desc",
}: {
  analytics: CostExplorerAnalyticsPayload | null | undefined;
  groupBy: CostExplorerGroupBy;
  searchQuery?: string;
  sortKey?: CostExplorerSortKey;
  sortDirection?: CostExplorerSortDirection;
}): CostExplorerRow[] {
  if (!analytics) return [];

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const sourceRows = getGroupRows(analytics, groupBy);
  const totalCost = toFiniteNumber(analytics.summary?.totalCost);
  const totalRequests = toFiniteNumber(analytics.summary?.totalRequests);

  return sourceRows
    .map((row, index) => {
      const name = getRowLabel(row, groupBy);
      const detail = getRowDetail(row, groupBy);
      const requests = toFiniteNumber(row.requests);
      const cost = toFiniteNumber(row.cost);
      const totalTokens = toFiniteNumber(row.totalTokens);
      const useCostForShare = totalCost > 0;
      const shareBase = useCostForShare ? totalCost : totalRequests;
      const shareValue = useCostForShare ? cost : requests;

      return {
        id: `${groupBy}:${name}:${detail}:${index}`,
        name,
        detail,
        groupBy,
        requests,
        promptTokens: toFiniteNumber(row.promptTokens),
        completionTokens: toFiniteNumber(row.completionTokens),
        totalTokens,
        cost,
        avgCostPerRequest: requests > 0 ? cost / requests : 0,
        sharePct: shareBase > 0 ? (shareValue / shareBase) * 100 : 0,
      };
    })
    .filter((row) => {
      if (!normalizedSearch) return true;
      return `${row.name} ${row.detail}`.toLowerCase().includes(normalizedSearch);
    })
    .sort((left, right) => {
      const leftValue = getSortValue(left, sortKey);
      const rightValue = getSortValue(right, sortKey);
      let result = 0;

      if (typeof leftValue === "string" || typeof rightValue === "string") {
        result = String(leftValue).localeCompare(String(rightValue));
      } else {
        result = leftValue - rightValue;
      }

      if (result === 0) result = left.name.localeCompare(right.name);
      return sortDirection === "asc" ? result : -result;
    });
}
