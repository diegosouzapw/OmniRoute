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

export function openRouterCapabilityEntry(
  model: {
    id?: string;
    context_length?: number;
    top_provider?: { max_completion_tokens?: number };
  },
  inputModalities: string[],
  outputModalities: string[],
  capabilities: Record<string, boolean>
) {
  if (inputModalities.length === 0 && outputModalities.length === 0) return null;
  return {
    tool_call: capabilities.tool_calling === true,
    reasoning: capabilities.reasoning === true,
    attachment: null,
    structured_output: capabilities.structured_output === true,
    temperature: null,
    modalities_input: JSON.stringify(inputModalities),
    modalities_output: JSON.stringify(outputModalities),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context:
      typeof model.context_length === "number" &&
      Number.isFinite(model.context_length) &&
      model.context_length > 0
        ? model.context_length
        : null,
    limit_input: null,
    limit_output:
      typeof model.top_provider?.max_completion_tokens === "number" &&
      Number.isFinite(model.top_provider.max_completion_tokens) &&
      model.top_provider.max_completion_tokens > 0
        ? model.top_provider.max_completion_tokens
        : null,
    interleaved_field: null,
  };
}
