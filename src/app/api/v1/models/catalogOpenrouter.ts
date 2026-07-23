// OpenRouter-specific catalog normalization helpers. Extracted verbatim from
// ./catalog.ts as a cohesive leaf — id qualification, modality normalization,
// model-type inference, and the free-model / display-name heuristics that shape
// OpenRouter entries in `getUnifiedModelsResponse`.

export function qualifyOpenRouterModelId(modelId: string): string {
  return modelId.startsWith("openrouter/") ? modelId : `openrouter/${modelId}`;
}

export function normalizeOpenRouterModalities(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
    : [];
}

export function getOpenRouterModelType(inputModalities: string[], outputModalities: string[]) {
  if (outputModalities.includes("image")) return "image";
  if (outputModalities.includes("audio")) return "audio";
  if (outputModalities.includes("video")) return "video";
  if (outputModalities.includes("embedding")) return "embedding";
  return "chat";
}

export function isZeroPrice(value: unknown) {
  if (typeof value === "number") return value === 0;
  if (typeof value !== "string") return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed === 0;
}

export function isOpenRouterFreeModel(model: {
  id?: string;
  pricing?: { prompt?: string; completion?: string };
}) {
  if (typeof model.id === "string" && model.id.endsWith(":free")) return true;
  return isZeroPrice(model.pricing?.prompt) && isZeroPrice(model.pricing?.completion);
}

export function getOpenRouterDisplayName(model: {
  id?: string;
  name?: string;
  pricing?: { prompt?: string; completion?: string };
}) {
  const name = model.name || model.id || "OpenRouter model";
  return isOpenRouterFreeModel(model) && !/\bgr[aá]tis\b/i.test(name) ? `${name} (Grátis)` : name;
}
