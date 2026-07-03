import {
  PROVIDER_ID_TO_ALIAS,
  PROVIDER_MODELS,
} from "@omniroute/open-sse/config/providerModels.ts";
import { parseModel, resolveCanonicalProviderModel } from "@omniroute/open-sse/services/model.ts";
import { MODEL_SPECS, getModelSpec, type ModelSpec } from "@/shared/constants/modelSpecs";
import { getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelContextOverride } from "@/lib/db/modelContextOverrides";
import { isVisionModelId } from "@/shared/constants/visionModels";

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
  maxOutputTokens: number | null;
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

function getStaticSpecCanonicalModelId(modelId: string | null, rawModel: string | null) {
  const candidates = [modelId, rawModel].filter(
    (candidate): candidate is string => typeof candidate === "string" && candidate.length > 0
  );
  for (const candidate of candidates) {
    const lower = candidate.toLowerCase();
    for (const [canonical, spec] of Object.entries(MODEL_SPECS)) {
      if (canonical === "__default__") continue;
      if (canonical.toLowerCase() === lower) return canonical;
      if (spec.aliases?.some((alias) => alias.toLowerCase() === lower)) return canonical;
    }
  }
  return null;
}

/**
 * Strip a trailing `-latest` alias suffix from a model id (#4073). Returns the
 * short id (`pixtral-12b-latest` → `pixtral-12b`) or `null` when there is no
 * `-latest` suffix to drop. Used only as a last-resort synced-lookup fallback.
 */
function stripLatestAlias(modelId: string | null): string | null {
  if (!modelId) return null;
  const stripped = modelId.replace(/-latest$/i, "");
  return stripped && stripped !== modelId ? stripped : null;
}

function getSyncedCapabilityForResolved(
  provider: string | null,
  model: string | null,
  rawModel: string | null
): SyncedCapabilities {
  if (!provider || !model) return null;

  const direct = getSyncedCapability(provider, model);
  if (direct) return direct;

  if (rawModel && rawModel !== model) {
    const raw = getSyncedCapability(provider, rawModel);
    if (raw) return raw;
  }

  const canonical = getStaticSpecCanonicalModelId(model, rawModel);
  if (canonical && canonical !== model) {
    const byCanonical = getSyncedCapability(provider, canonical);
    if (byCanonical) return byCanonical;
  }

  // #4073: models.dev catalogs some `-latest` aliases under their short id
  // (e.g. Mistral `pixtral-12b-latest` is stored as `pixtral-12b`). When every
  // exact lookup above misses, retry once with a trailing `-latest` stripped so
  // the synced metadata (`attachment` / image modalities) still wins over the
  // last-resort #4071 model-id heuristic. Only fires as a fallback, so models
  // whose `-latest` id IS stored verbatim (e.g. `pixtral-large-latest`) keep
  // resolving directly above.
  for (const candidate of [model, rawModel]) {
    const base = stripLatestAlias(candidate);
    if (base && base !== model && base !== rawModel) {
      const byAlias = getSyncedCapability(provider, base);
      if (byAlias) return byAlias;
    }
  }

  return null;
}

/**
 * Last-resort vision fallback in resolveVisionCapability when there is no
 * synced/registry/spec capability data (e.g. Mistral Pixtral, which ships no
 * models.dev `attachment` flag and no registry `supportsVision`). Delegates to
 * the single shared source (`@/shared/constants/visionModels`, #4072) so routing,
 * the `/v1/models` listing and lite compression can never disagree on whether a
 * model is vision-capable. The list is intentionally conservative — a false
 * positive would let an image request route to a text-only model.
 */
export function modelIdLikelyVision(modelId: string | null | undefined): boolean {
  return isVisionModelId(modelId);
}

/**
 * Models that upstream catalogs (notably models.dev) mislabel as vision-capable but
 * are TEXT-ONLY per the vendor's own docs. Listed here so a wrong synced
 * `attachment:true` cannot route an image request to a blind model (the #4071 failure
 * mode). Keep this list tiny and doc-backed.
 *
 * Xiaomi MiMo: only `mimo-v2.5` and `mimo-v2-omni` accept images; the `*-pro` chat
 * models are text-only (mimo.mi.com .../image-understanding; hermes-agent#18884).
 * Anchored to the full id (`$`) and tolerant of a `provider/` prefix so `mimo-v2.5-pro`
 * never matches the multimodal `mimo-v2.5`, and `mimo-v2-pro` never matches `mimo-v2-omni`.
 */
const KNOWN_TEXT_ONLY_DESPITE_SYNC: readonly RegExp[] = [
  /(?:^|\/)mimo-v2\.5-pro$/i,
  /(?:^|\/)mimo-v2-pro$/i,
];

function isKnownTextOnlyDespiteSync(modelId: string | null | undefined): boolean {
  if (!modelId) return false;
  const id = String(modelId);
  return KNOWN_TEXT_ONLY_DESPITE_SYNC.some((pattern) => pattern.test(id));
}

function resolveVisionCapability(
  spec: ModelSpec | undefined,
  registryModel: { supportsVision?: boolean } | null,
  synced: SyncedCapabilities,
  modalitiesInput: string[],
  modalitiesOutput: string[],
  modelId?: string
): boolean | null {
  const allModalities = [...modalitiesInput, ...modalitiesOutput].map((entry) =>
    String(entry).toLowerCase()
  );

  // Hard override FIRST: a wrong synced `attachment:true` (or image modality) must not
  // win for models the vendor documents as text-only. Beats every branch below so an
  // image request can never be routed to a blind model (#4071).
  if (isKnownTextOnlyDespiteSync(modelId)) return false;

  if (typeof synced?.attachment === "boolean") {
    return synced.attachment;
  }

  if (allModalities.some((entry) => entry.includes("image"))) {
    return true;
  }

  if (allModalities.length > 0) {
    return false;
  }

  if (typeof registryModel?.supportsVision === "boolean") return registryModel.supportsVision;
  if (typeof spec?.supportsVision === "boolean") return spec.supportsVision;

  // Last resort: no capability data at all. Positively confirm known multimodal
  // families by model id so image requests can be routed to them; everything
  // else stays `null` (unknown).
  if (modelIdLikelyVision(modelId)) return true;

  return null;
}

export function getResolvedModelCapabilities(input: CapabilityInput): ResolvedModelCapabilities {
  const resolved = resolveCapabilityInput(input);
  const spec = getStaticSpec(resolved.model, resolved.rawModel);
  const registryModel = getRegistryModel(resolved.provider, resolved.model);
  const synced = getSyncedCapabilityForResolved(
    resolved.provider,
    resolved.model,
    resolved.rawModel
  );

  const modalitiesInput = parseModalities(synced?.modalities_input);
  const modalitiesOutput = parseModalities(synced?.modalities_output);
  const lookupKey =
    toNonEmptyString(
      resolved.provider && resolved.model
        ? `${resolved.provider}/${resolved.model}`
        : resolved.model || resolved.rawModel || resolved.lookupKey
    ) || "";
  const reasoningDenied = !heuristicReasoning(lookupKey);

  const supportsTools =
    synced?.tool_call ??
    (typeof registryModel?.toolCalling === "boolean" ? registryModel.toolCalling : null) ??
    (typeof spec?.supportsTools === "boolean" ? spec.supportsTools : null);

  const supportsThinking = reasoningDenied
    ? false
    : (synced?.reasoning ??
      (typeof registryModel?.supportsReasoning === "boolean"
        ? registryModel.supportsReasoning
        : null) ??
      (typeof spec?.supportsThinking === "boolean" ? spec.supportsThinking : null));

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
      modalitiesOutput,
      lookupKey
    ),
    supportsMaxTokens: heuristicMaxTokens(lookupKey),
    attachment: synced?.attachment ?? null,
    structuredOutput: synced?.structured_output ?? null,
    temperature: synced?.temperature ?? null,
    contextWindow,
    maxInputTokens: synced?.limit_input ?? contextWindow,
    maxOutputTokens:
      synced?.limit_output ??
      (typeof registryModel?.maxOutputTokens === "number" ? registryModel.maxOutputTokens : null) ??
      spec?.maxOutputTokens ??
      null,
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
    interleavedField:
      synced?.interleaved_field ??
      (typeof registryModel?.interleavedField === "string" ? registryModel.interleavedField : null),
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

export function capMaxOutputTokens(input: CapabilityInput, requested?: number): number | null {
  const cap = getResolvedModelCapabilities(input).maxOutputTokens;
  const hasRequested = typeof requested === "number" && Number.isFinite(requested);
  if (cap === null) return hasRequested ? requested : null;
  return hasRequested ? Math.min(requested, cap) : cap;
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
  // Feature 5004: a persisted override (operator-set or auto-discovered) wins over the
  // static catalog / models.dev sync. `getResolvedModelCapabilities` stays override-free
  // so the reconciler can compare the catalog value against provider-declared windows.
  const override = getModelContextOverride(resolved.provider, resolved.model);
  return override ?? resolved.contextWindow;
}
