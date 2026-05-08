import {
  PROVIDER_ID_TO_ALIAS,
  PROVIDER_MODELS,
} from "@omniroute/open-sse/config/providerModels.ts";
import { parseModel, resolveCanonicalProviderModel } from "@omniroute/open-sse/services/model.ts";
import { MODEL_SPECS, getModelSpec, type ModelSpec } from "@/shared/constants/modelSpecs";
import { getSyncedCapability } from "@/lib/modelsDevSync";

const TOOL_CALLING_UNSUPPORTED_PATTERNS: string[] = [];
const REASONING_UNSUPPORTED_PATTERNS = [
  "antigravity/claude-sonnet-4-6",
  "antigravity/claude-sonnet-4-5",
  "antigravity/claude-sonnet-4",
  // Non-Claude antigravity models don't support thinking params (#1361)
  "antigravity/gemini-",
  "antigravity/gpt-oss-",
  "antigravity/gemini-3",
  "antigravity/tab_",
];

const MAX_TOKENS_UNSUPPORTED_PATTERNS = [
  "o1-preview",
  "o1-mini",
  "o1",
  "o3-mini",
  "o3",
  "gpt-5.4",
  "gpt-5.5",
];

type CapabilityInput =
  | string
  | {
      provider?: string | null;
      model?: string | null;
    };

type SyncedCapabilities = ReturnType<typeof getSyncedCapability>;

export interface ResolvedModelCapabilities {
  provider: string | null;
  model: string | null;
  rawModel: string | null;
  toolCalling: boolean;
  reasoning: boolean;
  supportsThinking: boolean | null;
  supportsTools: boolean | null;
  supportsVision: boolean | null;
  supportsMaxTokens: boolean;
  attachment: boolean | null;
  structuredOutput: boolean | null;
  temperature: boolean | null;
  contextWindow: number | null;
  maxInputTokens: number | null;
  maxOutputTokens: number;
  defaultThinkingBudget: number;
  thinkingBudgetCap: number | null;
  thinkingOverhead: number | null;
  adaptiveMaxTokens: number | null;
  family: string | null;
  status: string | null;
  openWeights: boolean | null;
  knowledgeCutoff: string | null;
  releaseDate: string | null;
  lastUpdated: string | null;
  modalitiesInput: string[];
  modalitiesOutput: string[];
  interleavedField: string | null;
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function parseModalities(value: string | null | undefined): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
      : [];
  } catch {
    return [];
  }
}

function getRegistryModel(providerIdOrAlias: string | null, modelId: string | null) {
  if (!providerIdOrAlias || !modelId) return null;
  const providerAlias = PROVIDER_ID_TO_ALIAS[providerIdOrAlias] || providerIdOrAlias;
  const models = PROVIDER_MODELS[providerAlias];
  if (!Array.isArray(models)) return null;
  return models.find((model) => model?.id === modelId) || null;
}

function resolveCapabilityInput(input: CapabilityInput) {
  if (typeof input === "string") {
    const parsed = parseModel(input);
    const rawModel = toNonEmptyString(parsed.model);
    if (parsed.provider) {
      const canonical = resolveCanonicalProviderModel(parsed.provider, rawModel);
      return {
        provider: canonical.provider,
        model: toNonEmptyString(canonical.model),
        rawModel,
        lookupKey: input,
      };
    }

    return {
      provider: null,
      model: rawModel,
      rawModel,
      lookupKey: input,
    };
  }

  const rawProvider = toNonEmptyString(input.provider);
  const rawModel = toNonEmptyString(input.model);
  if (rawProvider) {
    const canonical = resolveCanonicalProviderModel(rawProvider, rawModel);
    return {
      provider: canonical.provider,
      model: toNonEmptyString(canonical.model),
      rawModel,
      lookupKey: rawModel ? `${canonical.provider}/${rawModel}` : canonical.provider,
    };
  }

  return {
    provider: null,
    model: rawModel,
    rawModel,
    lookupKey: rawModel || "",
  };
}

function heuristicToolCalling(modelStr: string): boolean {
  const normalized = String(modelStr || "").toLowerCase();
  if (!normalized) return false;
  const blocked = TOOL_CALLING_UNSUPPORTED_PATTERNS.some((pattern) => {
    if (normalized === pattern) return true;
    if (normalized.endsWith(`/${pattern}`)) return true;
    return normalized.includes(pattern);
  });
  return !blocked;
}

function heuristicReasoning(modelStr: string): boolean {
  const normalized = String(modelStr || "").toLowerCase();
  if (!normalized) return true;
  const blocked = REASONING_UNSUPPORTED_PATTERNS.some(
    (pattern) =>
      normalized === pattern || normalized.endsWith(`/${pattern}`) || normalized.includes(pattern)
  );
  return !blocked;
}

function heuristicMaxTokens(modelStr: string): boolean {
  const normalized = String(modelStr || "").toLowerCase();
  if (!normalized) return true;
  const blocked = MAX_TOKENS_UNSUPPORTED_PATTERNS.some(
    (pattern) =>
      normalized === pattern || normalized.endsWith(`/${pattern}`) || normalized.includes(pattern)
  );
  return !blocked;
}

function getStaticSpec(modelId: string | null, rawModel: string | null): ModelSpec | undefined {
  if (modelId) {
    const byCanonical = getModelSpec(modelId);
    if (byCanonical) return byCanonical;
  }
  if (rawModel && rawModel !== modelId) {
    return getModelSpec(rawModel);
  }
  return undefined;
}

function resolveVisionCapability(
  spec: ModelSpec | undefined,
  registryModel: { supportsVision?: boolean } | null,
  synced: SyncedCapabilities,
  modalitiesInput: string[],
  modalitiesOutput: string[]
): boolean | null {
  const allModalities = [...modalitiesInput, ...modalitiesOutput].map((entry) =>
    String(entry).toLowerCase()
  );

  if (typeof synced?.attachment === "boolean") {
    return synced.attachment;
  }

  if (allModalities.some((entry) => entry.includes("image"))) {
    return true;
  }

  if (typeof registryModel?.supportsVision === "boolean") return registryModel.supportsVision;
  if (typeof spec?.supportsVision === "boolean") return spec.supportsVision;

  return null;
}

export function getResolvedModelCapabilities(input: CapabilityInput): ResolvedModelCapabilities {
  const resolved = resolveCapabilityInput(input);
  const spec = getStaticSpec(resolved.model, resolved.rawModel);
  const registryModel = getRegistryModel(resolved.provider, resolved.model);
  const synced =
    resolved.provider && resolved.model
      ? getSyncedCapability(resolved.provider, resolved.model)
      : null;

  const modalitiesInput = parseModalities(synced?.modalities_input);
  const modalitiesOutput = parseModalities(synced?.modalities_output);
  const lookupKey =
    toNonEmptyString(
      resolved.provider && resolved.model
        ? `${resolved.provider}/${resolved.model}`
        : resolved.model || resolved.rawModel || resolved.lookupKey
    ) || "";

  const supportsTools =
    synced?.tool_call ??
    (typeof registryModel?.toolCalling === "boolean" ? registryModel.toolCalling : null) ??
    (typeof spec?.supportsTools === "boolean" ? spec.supportsTools : null);

  const supportsThinking =
    synced?.reasoning ??
    (typeof registryModel?.supportsReasoning === "boolean"
      ? registryModel.supportsReasoning
      : null) ??
    (typeof spec?.supportsThinking === "boolean" ? spec.supportsThinking : null);

  const contextWindow =
    synced?.limit_context ??
    (typeof registryModel?.contextLength === "number" ? registryModel.contextLength : null) ??
    spec?.contextWindow ??
    null;

  return {
    provider: resolved.provider,
    model: resolved.model,
    rawModel: resolved.rawModel,
    toolCalling: supportsTools ?? heuristicToolCalling(lookupKey),
    reasoning: supportsThinking ?? heuristicReasoning(lookupKey),
    supportsThinking,
    supportsTools,
    supportsVision: resolveVisionCapability(
      spec,
      registryModel,
      synced,
      modalitiesInput,
      modalitiesOutput
    ),
    supportsMaxTokens: heuristicMaxTokens(lookupKey),
    attachment: synced?.attachment ?? null,
    structuredOutput: synced?.structured_output ?? null,
    temperature: synced?.temperature ?? null,
    contextWindow,
    maxInputTokens: synced?.limit_input ?? contextWindow,
    maxOutputTokens:
      synced?.limit_output ?? spec?.maxOutputTokens ?? MODEL_SPECS.__default__.maxOutputTokens,
    defaultThinkingBudget: spec?.defaultThinkingBudget ?? 0,
    thinkingBudgetCap: spec?.thinkingBudgetCap ?? null,
    thinkingOverhead: spec?.thinkingOverhead ?? null,
    adaptiveMaxTokens: spec?.adaptiveMaxTokens ?? null,
    family: synced?.family ?? null,
    status: synced?.status ?? null,
    openWeights: synced?.open_weights ?? null,
    knowledgeCutoff: synced?.knowledge_cutoff ?? null,
    releaseDate: synced?.release_date ?? null,
    lastUpdated: synced?.last_updated ?? null,
    modalitiesInput,
    modalitiesOutput,
    interleavedField: synced?.interleaved_field ?? null,
  };
}

export function supportsToolCalling(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return false;
  return getResolvedModelCapabilities(input).toolCalling;
}

export function supportsReasoning(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return true;
  return getResolvedModelCapabilities(input).reasoning;
}

export function supportsMaxTokens(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return true;
  return getResolvedModelCapabilities(input).supportsMaxTokens;
}

export function capMaxOutputTokens(input: CapabilityInput, requested?: number): number {
  const cap = getResolvedModelCapabilities(input).maxOutputTokens;
  return requested ? Math.min(requested, cap) : cap;
}

export function getDefaultThinkingBudget(input: CapabilityInput): number {
  return getResolvedModelCapabilities(input).defaultThinkingBudget;
}

export function capThinkingBudget(input: CapabilityInput, budget: number): number {
  const cap = getResolvedModelCapabilities(input).thinkingBudgetCap ?? budget;
  return Math.min(budget, cap);
}

export function getModelContextLimit(
  providerOrInput: CapabilityInput,
  modelId?: string
): number | null {
  const resolved =
    typeof providerOrInput === "string" && modelId !== undefined
      ? getResolvedModelCapabilities({ provider: providerOrInput, model: modelId })
      : getResolvedModelCapabilities(providerOrInput);
  return resolved.contextWindow;
}
