import {
  getMaxEffortSupport,
  getProviderModels,
  getXHighEffortSupport,
} from "@omniroute/open-sse/config/providerModels.ts";
import { parseModel, resolveCanonicalProviderModel } from "@omniroute/open-sse/services/model.ts";
import { MODEL_SPECS, getModelSpec, type ModelSpec } from "@/shared/constants/modelSpecs";
import { getProviderModelConfigSnapshot } from "@/lib/localDb";
import { getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelContextOverride } from "@/lib/db/modelContextOverrides";
import {
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { isVisionModelId } from "@/shared/constants/visionModels";
import type { ProviderModelCapabilities } from "@/shared/types/modelConfig";
import {
  getClaudeCodeCompatibleRoutedModelId,
  isClaudeCodeCompatibleProvider,
  resolveClaudeCodeCompatibleCatalogModel,
} from "@/lib/modelCapabilities/ccCompatible";

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
type ModelConfigSnapshot = ReturnType<typeof getProviderModelConfigSnapshot>;
type RegistryModel = { capabilities?: ProviderModelCapabilities } & Record<string, unknown>;

const CAPABILITY_DELETED = Symbol("capability-deleted");

export interface ResolvedModelCapabilities {
  provider: string | null;
  model: string | null;
  rawModel: string | null;
  toolCalling: boolean;
  reasoning: boolean;
  supportsThinking: boolean | null;
  supportsTools: boolean | null;
  supportsVision: boolean | null;
  supportsXHighEffort: boolean | null;
  supportsMaxEffort: boolean | null;
  supportsMaxTokens: boolean;
  attachment: boolean | null;
  structuredOutput: boolean | null;
  temperature: boolean | null;
  contextWindow: number | null;
  contextWindowExplicitlyUnset: boolean;
  maxInputTokens: number | null;
  maxOutputTokens: number | null;
  maxOutputTokensExplicitlyUnset: boolean;
  defaultThinkingBudget: number;
  defaultThinkingBudgetExplicitlyUnset: boolean;
  thinkingBudgetCap: number | null;
  thinkingBudgetCapExplicitlyUnset: boolean;
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

function getRegistryModel(
  providerIdOrAlias: string | null,
  modelId: string | null
): RegistryModel | null {
  if (!providerIdOrAlias || !modelId) return null;
  const models = getProviderModels(providerIdOrAlias);
  if (!Array.isArray(models)) return null;
  const direct = models.find((model) => model?.id === modelId) as RegistryModel | undefined;
  if (direct) return direct;
  const routedModel = getClaudeCodeCompatibleRoutedModelId(providerIdOrAlias, modelId);
  if (routedModel) {
    return (models.find((model) => model?.id === routedModel) as RegistryModel | undefined) || null;
  }
  return null;
}

function resolveCapabilityInput(input: CapabilityInput) {
  if (typeof input === "string") {
    const parsed = parseModel(input);
    const rawModel = toNonEmptyString(parsed.model);
    if (parsed.provider) {
      const canonical = resolveCanonicalProviderModel(parsed.provider, rawModel);
      const routed = resolveClaudeCodeCompatibleCatalogModel(
        canonical.provider,
        toNonEmptyString(canonical.model)
      );
      return {
        provider: routed.provider,
        model: routed.model,
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
    const routed = resolveClaudeCodeCompatibleCatalogModel(
      canonical.provider,
      toNonEmptyString(canonical.model)
    );
    return {
      provider: routed.provider,
      model: routed.model,
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

function heuristicMaxTokens(provider: string | null, modelStr: string): boolean {
  if (provider && provider !== "openai") return true;
  const normalized = String(modelStr || "").toLowerCase();
  if (!normalized) return true;
  const blocked = MAX_TOKENS_UNSUPPORTED_PATTERNS.some(
    (pattern) =>
      normalized === pattern || normalized.endsWith(`/${pattern}`) || normalized.includes(pattern)
  );
  return !blocked;
}

function allowsStaticModelSpecFallback(provider: string | null): boolean {
  if (!provider) return true;
  if (isClaudeCodeCompatibleProvider(provider)) return true;
  return !isOpenAICompatibleProvider(provider) && !isAnthropicCompatibleProvider(provider);
}

function getStaticSpec(
  provider: string | null,
  modelId: string | null,
  rawModel: string | null
): ModelSpec | undefined {
  if (!allowsStaticModelSpecFallback(provider)) return undefined;
  const candidates = [
    modelId,
    getClaudeCodeCompatibleRoutedModelId(provider, modelId),
    rawModel,
    getClaudeCodeCompatibleRoutedModelId(provider, rawModel),
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const byCanonical = getModelSpec(candidate);
    if (byCanonical) return byCanonical;
  }
  return undefined;
}

function getStaticSpecCanonicalModelId(
  provider: string | null,
  modelId: string | null,
  rawModel: string | null
) {
  if (!allowsStaticModelSpecFallback(provider)) return null;
  const candidates = [
    modelId,
    getClaudeCodeCompatibleRoutedModelId(provider, modelId),
    rawModel,
    getClaudeCodeCompatibleRoutedModelId(provider, rawModel),
  ].filter(
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

// Last-resort synced lookup fallback for models.dev `*-latest` aliases (#4073).
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

  const canonical = getStaticSpecCanonicalModelId(provider, model, rawModel);
  if (canonical && canonical !== model) {
    const byCanonical = getSyncedCapability(provider, canonical);
    if (byCanonical) return byCanonical;
  }

  // Retry short ids once so synced metadata beats the model-id heuristic (#4073).
  for (const candidate of [model, rawModel]) {
    const base = stripLatestAlias(candidate);
    if (base && base !== model && base !== rawModel) {
      const byAlias = getSyncedCapability(provider, base);
      if (byAlias) return byAlias;
    }
  }

  return null;
}

// Conservative last-resort vision fallback shared by routing, catalog, and compression.
export function modelIdLikelyVision(modelId: string | null | undefined): boolean {
  return isVisionModelId(modelId);
}

// Tiny doc-backed deny-list for upstream catalogs that overstate image support (#4071).
const KNOWN_TEXT_ONLY_DESPITE_SYNC: readonly RegExp[] = [
  /(?:^|\/)mimo-v2\.5-pro$/i,
  /(?:^|\/)mimo-v2-pro$/i,
];

function isKnownTextOnlyDespiteSync(modelId: string | null | undefined): boolean {
  if (!modelId) return false;
  const id = String(modelId);
  return KNOWN_TEXT_ONLY_DESPITE_SYNC.some((pattern) => pattern.test(id));
}

function resolveSyncedVisionCapability(
  synced: SyncedCapabilities,
  allModalities: string[]
): boolean | undefined {
  if (typeof synced?.attachment === "boolean") return synced.attachment;
  if (allModalities.some((entry) => entry.includes("image"))) return true;
  if (allModalities.length > 0) return false;
  return undefined;
}

function resolveVisionCapability(
  spec: ModelSpec | undefined,
  registryModel: RegistryModel | null,
  synced: SyncedCapabilities,
  snapshot: ModelConfigSnapshot | null,
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

  const overrideVision = readBooleanCapabilityOverride(snapshot, ["supportsVision"]);
  if (overrideVision !== undefined) return overrideVision;

  const snapshotVision = readSnapshotCapability(snapshot, ["supportsVision"]);
  if (snapshot?.source === "custom" && typeof snapshotVision === "boolean") return snapshotVision;

  const syncedVision = resolveSyncedVisionCapability(synced, allModalities);
  if (syncedVision !== undefined) return syncedVision;

  if (typeof snapshotVision === "boolean") return snapshotVision;

  const registryVision = registryBoolean(registryModel, "supportsVision");
  if (registryVision !== null) return registryVision;
  if (typeof spec?.supportsVision === "boolean") return spec.supportsVision;

  return null;
}

function registryBoolean(
  registryModel: RegistryModel | null,
  key: keyof ProviderModelCapabilities
): boolean | null {
  const nestedValue = registryModel?.capabilities?.[key];
  if (typeof nestedValue === "boolean") return nestedValue;
  const topLevelValue = registryModel?.[key];
  if (typeof topLevelValue === "boolean") return topLevelValue;
  if (key === "supportsTools") {
    const toolCalling = registryModel?.toolCalling;
    if (typeof toolCalling === "boolean") return toolCalling;
  }
  if (key === "supportsReasoning") {
    const supportsThinking = registryModel?.supportsThinking;
    if (typeof supportsThinking === "boolean") return supportsThinking;
    const reasoning = registryModel?.reasoning;
    if (typeof reasoning === "boolean") return reasoning;
  }
  return null;
}

function registryNumber(
  registryModel: RegistryModel | null,
  key: keyof ProviderModelCapabilities
): number | null {
  const nestedValue = registryModel?.capabilities?.[key];
  if (typeof nestedValue === "number") return nestedValue;
  const topLevelValue = registryModel?.[key];
  if (typeof topLevelValue === "number") return topLevelValue;
  return null;
}

function registryString(
  registryModel: RegistryModel | null,
  key: keyof ProviderModelCapabilities
): string | null {
  const nestedValue = registryModel?.capabilities?.[key];
  if (typeof nestedValue === "string") return nestedValue;
  return null;
}

function getModelConfigSnapshotSafe(
  provider: string | null,
  model: string | null
): ModelConfigSnapshot | null {
  if (!provider || !model) return null;
  try {
    return getProviderModelConfigSnapshot(provider, model);
  } catch {
    return null;
  }
}

function readCapabilityOverride(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[]
): unknown | typeof CAPABILITY_DELETED {
  const overrides = snapshot?.capabilityOverrides;
  if (!overrides || typeof overrides !== "object") return undefined;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(overrides, key)) continue;
    const value = (overrides as Record<string, unknown>)[key];
    return value === null ? CAPABILITY_DELETED : value;
  }
  return undefined;
}

function readSnapshotCapability(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[]
): unknown {
  const capabilities = snapshot?.capabilities;
  if (!capabilities || typeof capabilities !== "object") return undefined;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(capabilities, key)) continue;
    return (capabilities as Record<string, unknown>)[key];
  }
  return undefined;
}

function readBooleanCapabilityOverride(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[]
): boolean | null | undefined {
  const value = readCapabilityOverride(snapshot, keys);
  if (value === CAPABILITY_DELETED) return null;
  return typeof value === "boolean" ? value : undefined;
}

function readNumberCapabilityOverride(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[],
  options?: { allowZero?: boolean }
): number | null | undefined {
  const value = readCapabilityOverride(snapshot, keys);
  if (value === CAPABILITY_DELETED) return null;
  return typeof value === "number" &&
    Number.isFinite(value) &&
    (value > 0 || (options?.allowZero === true && value === 0))
    ? value
    : undefined;
}

function readSnapshotBoolean(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[]
): boolean | undefined {
  const value = readSnapshotCapability(snapshot, keys);
  return typeof value === "boolean" ? value : undefined;
}

function readSnapshotNumber(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[],
  options?: { allowZero?: boolean }
): number | undefined {
  const value = readSnapshotCapability(snapshot, keys);
  return typeof value === "number" &&
    Number.isFinite(value) &&
    (value > 0 || (options?.allowZero === true && value === 0))
    ? value
    : undefined;
}

function resolveSupportsTools(
  spec: ModelSpec | undefined,
  registryModel: RegistryModel | null,
  synced: SyncedCapabilities,
  snapshot: ModelConfigSnapshot | null
): boolean | null {
  const override = readBooleanCapabilityOverride(snapshot, ["supportsTools", "toolCalling"]);
  if (override !== undefined) return override;
  const snapshotTools = readSnapshotBoolean(snapshot, ["supportsTools"]);
  if (snapshot?.source === "custom" && snapshotTools !== undefined) return snapshotTools;
  return (
    synced?.tool_call ??
    snapshotTools ??
    registryBoolean(registryModel, "supportsTools") ??
    spec?.supportsTools ??
    null
  );
}

function resolveSupportsThinking(
  spec: ModelSpec | undefined,
  registryModel: RegistryModel | null,
  synced: SyncedCapabilities,
  snapshot: ModelConfigSnapshot | null,
  lookupKey: string
): boolean | null {
  const override = readBooleanCapabilityOverride(snapshot, [
    "supportsReasoning",
    "supportsThinking",
  ]);
  if (override !== undefined) return override;
  const snapshotThinking = readSnapshotBoolean(snapshot, ["supportsReasoning", "supportsThinking"]);
  if (snapshot?.source === "custom" && snapshotThinking !== undefined) return snapshotThinking;
  const explicit =
    synced?.reasoning ??
    snapshotThinking ??
    registryBoolean(registryModel, "supportsReasoning") ??
    spec?.supportsThinking;
  if (explicit !== undefined) return explicit;
  return null;
}

function resolveContextWindow(
  spec: ModelSpec | undefined,
  registryModel: RegistryModel | null,
  synced: SyncedCapabilities,
  snapshot: ModelConfigSnapshot | null
): number | null {
  const override = readNumberCapabilityOverride(snapshot, [
    "contextWindow",
    "contextLength",
    "maxInputTokens",
    "inputTokenLimit",
  ]);
  if (override !== undefined) return override;
  const snapshotContext = readSnapshotNumber(snapshot, ["contextWindow", "maxInputTokens"]);
  if (snapshot?.source === "custom" && snapshotContext !== undefined) return snapshotContext;
  return (
    synced?.limit_context ??
    snapshotContext ??
    registryNumber(registryModel, "contextWindow") ??
    registryNumber(registryModel, "maxInputTokens") ??
    spec?.contextWindow ??
    null
  );
}

function resolveSupportsXHighEffort(
  provider: string | null,
  model: string | null,
  snapshot: ModelConfigSnapshot | null
): boolean | null {
  const override = readBooleanCapabilityOverride(snapshot, ["supportsXHighEffort"]);
  if (override !== undefined) return override;
  const snapshotValue = readSnapshotBoolean(snapshot, ["supportsXHighEffort"]);
  if (snapshotValue !== undefined) return snapshotValue;
  if (snapshot?.source === "custom" && isOpenAICompatibleProvider(provider)) return null;
  if (!provider || !model) return null;
  return getXHighEffortSupport(provider, model) ?? null;
}

function resolveSupportsMaxEffort(
  provider: string | null,
  model: string | null,
  snapshot: ModelConfigSnapshot | null
): boolean | null {
  const override = readBooleanCapabilityOverride(snapshot, ["supportsMaxEffort"]);
  if (override !== undefined) return override;
  const snapshotValue = readSnapshotBoolean(snapshot, ["supportsMaxEffort"]);
  if (snapshotValue !== undefined) return snapshotValue;
  if (snapshot?.source === "custom" && isOpenAICompatibleProvider(provider)) return null;
  if (!provider || !model) return null;
  return getMaxEffortSupport(provider, model) ?? null;
}

function resolvePositiveNumberCapability(
  snapshot: ModelConfigSnapshot | null,
  keys: readonly string[],
  fallback: () => number | null,
  options?: { allowZero?: boolean }
): number | null {
  const override = readNumberCapabilityOverride(snapshot, keys, options);
  if (override !== undefined) return override;
  const snapshotValue = readSnapshotNumber(snapshot, keys, options);
  if (snapshotValue !== undefined) return snapshotValue;
  return fallback();
}

export function getResolvedModelCapabilities(input: CapabilityInput): ResolvedModelCapabilities {
  const resolved = resolveCapabilityInput(input);
  const spec = getStaticSpec(resolved.provider, resolved.model, resolved.rawModel);
  const registryModel = getRegistryModel(resolved.provider, resolved.model);
  const snapshot = getModelConfigSnapshotSafe(resolved.provider, resolved.model);
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
  const supportsTools = resolveSupportsTools(spec, registryModel, synced, snapshot);
  const supportsThinking = resolveSupportsThinking(
    spec,
    registryModel,
    synced,
    snapshot,
    lookupKey
  );
  const contextWindow = resolveContextWindow(spec, registryModel, synced, snapshot);
  const contextOverride = readNumberCapabilityOverride(snapshot, [
    "contextWindow",
    "contextLength",
    "maxInputTokens",
    "inputTokenLimit",
  ]);
  const contextMasked = contextOverride === null;
  const supportsXHighEffort = resolveSupportsXHighEffort(
    resolved.provider,
    resolved.model,
    snapshot
  );
  const supportsMaxEffort = resolveSupportsMaxEffort(resolved.provider, resolved.model, snapshot);
  const maxOutputTokens = resolvePositiveNumberCapability(
    snapshot,
    ["maxOutputTokens", "outputTokenLimit"],
    () =>
      synced?.limit_output ??
      registryNumber(registryModel, "maxOutputTokens") ??
      spec?.maxOutputTokens ??
      null
  );
  const maxOutputTokensOverride = readNumberCapabilityOverride(snapshot, [
    "maxOutputTokens",
    "outputTokenLimit",
  ]);
  const maxOutputTokensMasked = maxOutputTokensOverride === null;
  const defaultThinkingBudgetOverride = readNumberCapabilityOverride(snapshot, [
    "defaultThinkingBudget",
  ]);
  const defaultThinkingBudgetMasked = defaultThinkingBudgetOverride === null;
  const thinkingBudgetCapOverride = readNumberCapabilityOverride(snapshot, [
    "thinkingBudgetCap",
    "maxThinkingBudget",
  ]);
  const thinkingBudgetCapMasked = thinkingBudgetCapOverride === null;

  return {
    provider: resolved.provider,
    model: resolved.model,
    rawModel: resolved.rawModel,
    toolCalling: Boolean(lookupKey) && supportsTools !== false,
    reasoning: supportsThinking !== false,
    supportsThinking,
    supportsTools,
    supportsVision: resolveVisionCapability(
      spec,
      registryModel,
      synced,
      snapshot,
      modalitiesInput,
      modalitiesOutput,
      lookupKey
    ),
    supportsXHighEffort,
    supportsMaxEffort,
    supportsMaxTokens: heuristicMaxTokens(resolved.provider, lookupKey),
    attachment: synced?.attachment ?? null,
    structuredOutput: synced?.structured_output ?? null,
    temperature: synced?.temperature ?? null,
    contextWindow,
    contextWindowExplicitlyUnset: contextMasked,
    maxInputTokens: contextMasked ? null : (synced?.limit_input ?? contextWindow),
    maxOutputTokens,
    maxOutputTokensExplicitlyUnset: maxOutputTokensMasked,
    defaultThinkingBudget:
      resolvePositiveNumberCapability(
        snapshot,
        ["defaultThinkingBudget"],
        () =>
          registryModel?.capabilities?.defaultThinkingBudget ?? spec?.defaultThinkingBudget ?? null,
        { allowZero: true }
      ) ?? 0,
    defaultThinkingBudgetExplicitlyUnset: defaultThinkingBudgetMasked,
    thinkingBudgetCap: resolvePositiveNumberCapability(
      snapshot,
      ["thinkingBudgetCap"],
      () => registryModel?.capabilities?.thinkingBudgetCap ?? spec?.thinkingBudgetCap ?? null,
      { allowZero: true }
    ),
    thinkingBudgetCapExplicitlyUnset: thinkingBudgetCapMasked,
    thinkingOverhead: resolvePositiveNumberCapability(
      snapshot,
      ["thinkingOverhead"],
      () => registryModel?.capabilities?.thinkingOverhead ?? spec?.thinkingOverhead ?? null
    ),
    adaptiveMaxTokens: resolvePositiveNumberCapability(
      snapshot,
      ["adaptiveMaxTokens"],
      () => registryModel?.capabilities?.adaptiveMaxTokens ?? spec?.adaptiveMaxTokens ?? null
    ),
    family: synced?.family ?? null,
    status: synced?.status ?? null,
    openWeights: synced?.open_weights ?? null,
    knowledgeCutoff: synced?.knowledge_cutoff ?? null,
    releaseDate: synced?.release_date ?? null,
    lastUpdated: synced?.last_updated ?? null,
    modalitiesInput,
    modalitiesOutput,
    interleavedField:
      synced?.interleaved_field ?? registryString(registryModel, "interleavedField"),
  };
}

export function supportsToolCalling(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return false;
  return getResolvedModelCapabilities(input).supportsTools !== false;
}

export function supportsReasoning(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return true;
  return getResolvedModelCapabilities(input).supportsThinking !== false;
}

export function supportsMaxTokens(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return true;
  return getResolvedModelCapabilities(input).supportsMaxTokens;
}

export function supportsXHighEffort(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return true;
  return getResolvedModelCapabilities(input).supportsXHighEffort !== false;
}

export function supportsMaxEffort(input: CapabilityInput): boolean {
  if (typeof input === "string" && !String(input || "").trim()) return true;
  return getResolvedModelCapabilities(input).supportsMaxEffort !== false;
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

export function isDefaultThinkingBudgetExplicitlyUnset(input: CapabilityInput): boolean {
  return getResolvedModelCapabilities(input).defaultThinkingBudgetExplicitlyUnset;
}

export function isThinkingBudgetCapExplicitlyUnset(input: CapabilityInput): boolean {
  return getResolvedModelCapabilities(input).thinkingBudgetCapExplicitlyUnset;
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

export function isModelContextLimitExplicitlyUnset(
  providerOrInput: CapabilityInput,
  modelId?: string
): boolean {
  const resolved =
    typeof providerOrInput === "string" && modelId !== undefined
      ? getResolvedModelCapabilities({ provider: providerOrInput, model: modelId })
      : getResolvedModelCapabilities(providerOrInput);
  return resolved.contextWindowExplicitlyUnset;
}

export function isModelMaxOutputTokensExplicitlyUnset(
  providerOrInput: CapabilityInput,
  modelId?: string
): boolean {
  const resolved =
    typeof providerOrInput === "string" && modelId !== undefined
      ? getResolvedModelCapabilities({ provider: providerOrInput, model: modelId })
      : getResolvedModelCapabilities(providerOrInput);
  return resolved.maxOutputTokensExplicitlyUnset;
}
