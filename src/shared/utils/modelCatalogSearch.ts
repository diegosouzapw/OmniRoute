export type ModelCatalogSource = "system" | "custom" | "api-sync" | "fallback" | "alias";

type ModelCatalogTarget = {
  modelId?: string | null;
  modelName?: string | null;
  alias?: string | null;
  source?: string | null;
};

function normalizeText(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function normalizeModelCatalogSource(source?: string | null): ModelCatalogSource {
  const normalized = normalizeText(source);

  if (
    normalized === "api-sync" ||
    normalized === "synced" ||
    normalized === "auto-sync" ||
    normalized === "imported"
  ) {
    return "api-sync";
  }
  if (normalized === "fallback") return "fallback";
  if (normalized === "alias") return "alias";
  if (normalized === "custom" || normalized === "manual") {
    return "custom";
  }

  return "system";
}

export function getModelCatalogSourceLabel(source?: string | null): string {
  switch (normalizeModelCatalogSource(source)) {
    case "api-sync":
      return "Synced";
    case "custom":
      return "Custom";
    case "fallback":
      return "Fallback";
    case "alias":
      return "Alias";
    case "system":
    default:
      return "Built-in";
  }
}

function getModelCatalogSourceSearchText(source?: string | null): string {
  switch (normalizeModelCatalogSource(source)) {
    case "api-sync":
      return "synced api imported discovered";
    case "custom":
      return "custom manual imported";
    case "fallback":
      return "fallback compatible";
    case "alias":
      return "alias shortcut";
    case "system":
    default:
      return "built-in builtin official catalog";
  }
}

export function matchesModelCatalogQuery(query: string, target: ModelCatalogTarget): boolean {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;

  const haystacks = [
    normalizeText(target.modelId),
    normalizeText(target.modelName),
    normalizeText(target.alias),
    getModelCatalogSourceSearchText(target.source),
  ].filter(Boolean);

  return haystacks.some((value) => value.includes(normalizedQuery));
}
