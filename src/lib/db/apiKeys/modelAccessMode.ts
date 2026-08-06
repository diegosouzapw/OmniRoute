export type ModelAccessMode = "all" | "restricted";

function hasLegacyModelRestriction(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  if (trimmed === "" || trimmed === "[]" || trimmed === "null") return false;

  try {
    const parsed: unknown = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed.length > 0 : parsed !== null;
  } catch {
    return true;
  }
}

/** Non-empty legacy allow-lists always remain restrictive, even beside a bad `all` mode. */
export function parseModelAccessMode(value: unknown, rawAllowedModels?: unknown): ModelAccessMode {
  if (hasLegacyModelRestriction(rawAllowedModels)) return "restricted";
  return value === "restricted" ? "restricted" : "all";
}

export function normalizeModelAccessUpdate(
  modelAccessMode: ModelAccessMode | undefined,
  allowedModels: string[] | undefined
): { modelAccessMode?: ModelAccessMode; allowedModels?: string[] } {
  if (modelAccessMode === "all") {
    return { modelAccessMode: "all", allowedModels: [] };
  }
  if (modelAccessMode === "restricted") {
    return {
      modelAccessMode: "restricted",
      ...(allowedModels !== undefined && { allowedModels }),
    };
  }
  if (allowedModels !== undefined) {
    return {
      modelAccessMode: allowedModels.length > 0 ? "restricted" : "all",
      allowedModels,
    };
  }
  return {};
}
