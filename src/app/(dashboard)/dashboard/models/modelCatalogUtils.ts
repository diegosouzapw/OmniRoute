export interface CatalogModel {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  custom?: boolean;
  free?: boolean;
  capabilities?: Record<string, unknown>;
  context_length?: number;
  max_output_tokens?: number;
  input_modalities?: string[];
  output_modalities?: string[];
  supported_endpoints?: string[];
}

export interface CatalogModelRow extends CatalogModel {
  providerId: string;
  provider: string;
}

export type CatalogSortField = "provider" | "id" | "type" | "context_length" | "max_output_tokens";
export type CatalogSortDirection = "asc" | "desc";

export interface CatalogFilters {
  query: string;
  providerId: string;
  type: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Convert the provider-grouped API payload into stable rows for the dashboard table. */
export function flattenCatalog(catalog: unknown): CatalogModelRow[] {
  if (!isRecord(catalog)) return [];

  const rows: CatalogModelRow[] = [];
  for (const [providerId, rawBucket] of Object.entries(catalog)) {
    if (!isRecord(rawBucket) || !Array.isArray(rawBucket.models)) continue;
    const provider = typeof rawBucket.provider === "string" ? rawBucket.provider : providerId;

    for (const rawModel of rawBucket.models) {
      if (!isRecord(rawModel) || typeof rawModel.id !== "string") continue;
      const id = rawModel.id;
      rows.push({
        providerId,
        provider,
        id,
        name: typeof rawModel.name === "string" ? rawModel.name : id,
        type: typeof rawModel.type === "string" ? rawModel.type : "unknown",
        ...(typeof rawModel.subtype === "string" ? { subtype: rawModel.subtype } : {}),
        ...(rawModel.custom === true ? { custom: true } : {}),
        ...(rawModel.free === true ? { free: true } : {}),
        ...(isRecord(rawModel.capabilities) ? { capabilities: rawModel.capabilities } : {}),
        ...(typeof rawModel.context_length === "number"
          ? { context_length: rawModel.context_length }
          : {}),
        ...(typeof rawModel.max_output_tokens === "number"
          ? { max_output_tokens: rawModel.max_output_tokens }
          : {}),
        ...(Array.isArray(rawModel.input_modalities)
          ? { input_modalities: rawModel.input_modalities.filter(isString) }
          : {}),
        ...(Array.isArray(rawModel.output_modalities)
          ? { output_modalities: rawModel.output_modalities.filter(isString) }
          : {}),
        ...(Array.isArray(rawModel.supported_endpoints)
          ? { supported_endpoints: rawModel.supported_endpoints.filter(isString) }
          : {}),
      });
    }
  }

  return rows;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function searchableText(model: CatalogModelRow): string {
  return [
    model.provider,
    model.providerId,
    model.id,
    model.name,
    model.type,
    model.subtype,
    ...Object.entries(model.capabilities ?? {}).flatMap(([key, value]) => [
      key,
      ...(Array.isArray(value) ? value.filter(isString) : []),
    ]),
    ...(model.input_modalities ?? []),
    ...(model.output_modalities ?? []),
    ...(model.supported_endpoints ?? []),
  ]
    .filter(isString)
    .join(" ")
    .toLocaleLowerCase();
}

export function filterCatalogModels(
  models: CatalogModelRow[],
  filters: CatalogFilters
): CatalogModelRow[] {
  const query = filters.query.trim().toLocaleLowerCase();
  return models.filter((model) => {
    if (filters.providerId !== "all" && model.providerId !== filters.providerId) return false;
    if (filters.type !== "all" && model.type !== filters.type) return false;
    return query === "" || searchableText(model).includes(query);
  });
}

function compareText(left: string, right: string): number {
  const normalizedLeft = left.toLocaleLowerCase();
  const normalizedRight = right.toLocaleLowerCase();
  return normalizedLeft < normalizedRight ? -1 : normalizedLeft > normalizedRight ? 1 : 0;
}

export function sortCatalogModels(
  models: CatalogModelRow[],
  field: CatalogSortField,
  direction: CatalogSortDirection
): CatalogModelRow[] {
  const multiplier = direction === "asc" ? 1 : -1;
  return [...models].sort((left, right) => {
    const leftValue = left[field];
    const rightValue = right[field];

    if (typeof leftValue === "number" || typeof rightValue === "number") {
      // Keep unknown values last regardless of direction; absence is not zero.
      if (typeof leftValue !== "number") return 1;
      if (typeof rightValue !== "number") return -1;
      if (leftValue !== rightValue) return (leftValue - rightValue) * multiplier;
    } else {
      const comparison = compareText(String(leftValue ?? ""), String(rightValue ?? ""));
      if (comparison !== 0) return comparison * multiplier;
    }

    return compareText(left.providerId, right.providerId) || compareText(left.id, right.id);
  });
}

export function getCatalogPage<T>(
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
