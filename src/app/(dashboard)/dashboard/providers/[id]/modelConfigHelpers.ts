import {
  getMaxEffortSupport,
  getProviderModels,
  getXHighEffortSupport,
} from "@omniroute/open-sse/config/providerModels.ts";
import {
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { getModelSpec, type ModelSpec } from "@/shared/constants/modelSpecs";
import type { ProviderModelCapabilities } from "@/shared/types/modelConfig";
import type { CompatModelRow } from "./providerPageHelpers";

// #2905 — per-model targetFormat badge label mapping.
const TARGET_FORMAT_BADGE_I18N_KEYS: Record<string, string> = {
  openai: "compatProtocolOpenAI",
  "openai-responses": "compatProtocolOpenAIResponses",
  claude: "compatProtocolClaude",
  gemini: "targetFormatGemini",
  antigravity: "targetFormatAntigravity",
};

export function targetFormatBadgeI18nKey(value: string): string | null {
  return TARGET_FORMAT_BADGE_I18N_KEYS[value] ?? null;
}

export function modelCapabilitiesFromRow(
  row: CompatModelRow | null | undefined
): ProviderModelCapabilities {
  if (!row) return {};
  const nestedCapabilities =
    row.capabilities && typeof row.capabilities === "object" ? row.capabilities : {};
  const capabilityOverrides =
    row.capabilityOverrides && typeof row.capabilityOverrides === "object"
      ? row.capabilityOverrides
      : {};
  const normalizedOverrides = normalizeCapabilityOverrides(
    capabilityOverrides as Record<string, unknown>
  );
  const merged = {
    ...nestedCapabilities,
    ...normalizedOverrides,
  } as ProviderModelCapabilities & Record<string, unknown>;
  if (
    !Object.prototype.hasOwnProperty.call(merged, "supportsReasoning") &&
    Object.prototype.hasOwnProperty.call(merged, "supportsThinking")
  ) {
    merged.supportsReasoning = merged.supportsThinking;
  }
  delete merged.supportsThinking;
  return merged;
}

function normalizeCapabilityOverrides(overrides: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  const assign = (key: string, value: unknown) => {
    if (typeof value === "boolean" || typeof value === "number" || value === null) {
      normalized[key] = value;
    }
  };
  for (const [key, value] of Object.entries(overrides)) {
    switch (key) {
      case "toolCalling":
        assign("supportsTools", value);
        break;
      case "supportsThinking":
        assign("supportsReasoning", value);
        break;
      case "contextLength":
        assign("contextWindow", value);
        break;
      case "inputTokenLimit":
        assign("contextWindow", value);
        assign("maxInputTokens", value);
        break;
      case "outputTokenLimit":
        assign("maxOutputTokens", value);
        break;
      default:
        assign(key, value);
        break;
    }
  }
  return normalized;
}

export function shouldUseRowModelConfig(row: CompatModelRow | null | undefined): boolean {
  if (!row) return false;
  if (Object.keys(modelConfigComparable(row.baseline)).length > 0) return true;
  const source = typeof row.source === "string" ? row.source.toLowerCase() : "";
  return source === "custom" || source === "manual";
}

export function effectiveModelCapabilitiesFromRows(
  providerId: string,
  modelId: string,
  row: CompatModelRow | null | undefined,
  override: CompatModelRow | null | undefined
): ProviderModelCapabilities {
  const source = typeof row?.source === "string" ? row.source.toLowerCase() : "";
  return applyResolvedModelCapabilities(
    providerId,
    modelId,
    modelCapabilitiesFromRow(mergeModelConfigRow(row, override)),
    shouldPreserveUnknownEffortCapabilities(providerId, source)
  );
}

const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";
const CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER = "cc-compatible";

function shouldPreserveUnknownEffortCapabilities(providerId: string, source: string): boolean {
  if (source !== "custom" && source !== "manual") return false;
  if (
    providerId === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER ||
    providerId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX)
  ) {
    return false;
  }
  return isOpenAICompatibleProvider(providerId);
}

function normalizeCapabilityLookup(providerId: string, modelId: string) {
  if (!modelId.includes("/")) {
    return { providerId, modelId };
  }

  const [routePrefix, ...rest] = modelId.split("/");
  const routedModelId = rest.join("/");
  if (!routePrefix || !routedModelId) {
    return { providerId, modelId };
  }

  if (providerId === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER) {
    return {
      providerId: `${CLAUDE_CODE_COMPATIBLE_PREFIX}${routePrefix}`,
      modelId: routedModelId,
    };
  }

  if (
    providerId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX) &&
    providerId.slice(CLAUDE_CODE_COMPATIBLE_PREFIX.length) === routePrefix
  ) {
    return { providerId, modelId: routedModelId };
  }

  return { providerId, modelId };
}

function hasKnownRegistryModel(providerId: string, modelId: string): boolean {
  return getProviderModels(providerId).some((model) => model.id === modelId);
}

function getRegistryModel(providerId: string, modelId: string) {
  return getProviderModels(providerId).find((model) => model.id === modelId);
}

function allowsStaticModelSpecFallback(providerId: string): boolean {
  if (
    providerId === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER ||
    providerId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX)
  ) {
    return true;
  }
  return !isOpenAICompatibleProvider(providerId) && !isAnthropicCompatibleProvider(providerId);
}

function assignBooleanCapability(
  target: ProviderModelCapabilities,
  key: keyof ProviderModelCapabilities,
  value: unknown
) {
  if (!Object.prototype.hasOwnProperty.call(target, key) && typeof value === "boolean") {
    target[key] = value;
  }
}

function assignNumberCapability(
  target: ProviderModelCapabilities,
  key: keyof ProviderModelCapabilities,
  value: unknown
) {
  if (!Object.prototype.hasOwnProperty.call(target, key) && typeof value === "number") {
    target[key] = value;
  }
}

function assignBooleanFromRegistryThenFallback(
  target: ProviderModelCapabilities,
  key: keyof ProviderModelCapabilities,
  registryValue: unknown,
  fallbackValue: unknown,
  preserveFallback: boolean
) {
  assignBooleanCapability(target, key, registryValue);
  if (!preserveFallback) assignBooleanCapability(target, key, fallbackValue);
}

function getModelCapabilitySources(providerId: string, modelId: string) {
  const normalized = normalizeCapabilityLookup(providerId, modelId);
  const registryCapabilities = hasKnownRegistryModel(normalized.providerId, normalized.modelId)
    ? getRegistryModel(normalized.providerId, normalized.modelId)?.capabilities
    : undefined;
  const spec = allowsStaticModelSpecFallback(normalized.providerId)
    ? getModelSpec(normalized.modelId)
    : undefined;
  return { normalized, registryCapabilities, spec };
}

function applyBaseResolvedCapabilities(
  target: ProviderModelCapabilities,
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  assignBooleanCapability(
    target,
    "supportsVision",
    registryCapabilities?.supportsVision ?? spec?.supportsVision
  );
  assignBooleanCapability(
    target,
    "supportsTools",
    registryCapabilities?.supportsTools ?? spec?.supportsTools
  );
  assignBooleanCapability(
    target,
    "supportsReasoning",
    registryCapabilities?.supportsReasoning ?? spec?.supportsThinking
  );
}

function resolvedContextWindow(
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  return (
    registryCapabilities?.contextWindow ??
    registryCapabilities?.maxInputTokens ??
    spec?.contextWindow
  );
}

function resolvedMaxInputTokens(
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  return (
    registryCapabilities?.maxInputTokens ??
    registryCapabilities?.contextWindow ??
    spec?.contextWindow
  );
}

function resolvedMaxOutputTokens(
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  return registryCapabilities?.maxOutputTokens ?? spec?.maxOutputTokens;
}

function resolvedDefaultThinkingBudget(
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  return registryCapabilities?.defaultThinkingBudget ?? spec?.defaultThinkingBudget;
}

function resolvedThinkingBudgetCap(
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  return registryCapabilities?.thinkingBudgetCap ?? spec?.thinkingBudgetCap;
}

function applyResolvedNumberCapabilities(
  target: ProviderModelCapabilities,
  registryCapabilities: ProviderModelCapabilities | undefined,
  spec: ModelSpec | undefined
) {
  assignNumberCapability(
    target,
    "contextWindow",
    resolvedContextWindow(registryCapabilities, spec)
  );
  assignNumberCapability(
    target,
    "maxInputTokens",
    resolvedMaxInputTokens(registryCapabilities, spec)
  );
  assignNumberCapability(
    target,
    "maxOutputTokens",
    resolvedMaxOutputTokens(registryCapabilities, spec)
  );
  assignNumberCapability(
    target,
    "defaultThinkingBudget",
    resolvedDefaultThinkingBudget(registryCapabilities, spec)
  );
  assignNumberCapability(
    target,
    "thinkingBudgetCap",
    resolvedThinkingBudgetCap(registryCapabilities, spec)
  );
}

function applyResolvedModelCapabilities(
  providerId: string,
  modelId: string,
  capabilities: ProviderModelCapabilities,
  preserveUnknownEffortCapabilities = false
): ProviderModelCapabilities {
  const out = { ...capabilities };
  const { normalized, registryCapabilities, spec } = getModelCapabilitySources(providerId, modelId);
  applyBaseResolvedCapabilities(out, registryCapabilities, spec);
  assignBooleanFromRegistryThenFallback(
    out,
    "supportsXHighEffort",
    registryCapabilities?.supportsXHighEffort,
    getXHighEffortSupport(normalized.providerId, normalized.modelId),
    preserveUnknownEffortCapabilities
  );
  assignBooleanFromRegistryThenFallback(
    out,
    "supportsMaxEffort",
    registryCapabilities?.supportsMaxEffort,
    getMaxEffortSupport(normalized.providerId, normalized.modelId),
    preserveUnknownEffortCapabilities
  );
  applyResolvedNumberCapabilities(out, registryCapabilities, spec);
  return out;
}

function nonEmptyRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(
    value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0
  );
}

function assignTrimmedString(out: Record<string, unknown>, key: string, value: unknown) {
  if (typeof value === "string" && value.trim()) out[key] = value.trim();
}

function assignUnsupportedParamsComparable(out: Record<string, unknown>, value: unknown) {
  if (Array.isArray(value) && value.length > 0) {
    out.unsupportedParams = value.filter(Boolean);
  }
}

function hasOwnConfigField(
  row: Record<string, unknown>,
  compat: Record<string, unknown>,
  key: string
) {
  return (
    Object.prototype.hasOwnProperty.call(row, key) ||
    Object.prototype.hasOwnProperty.call(compat, key)
  );
}

function assignDeveloperRoleComparable(
  out: Record<string, unknown>,
  row: CompatModelRow,
  compat: Record<string, unknown>
) {
  if (!hasOwnConfigField(row as Record<string, unknown>, compat, "preserveOpenAIDeveloperRole")) {
    return;
  }
  out.preserveOpenAIDeveloperRole =
    row.preserveOpenAIDeveloperRole ?? compat.preserveOpenAIDeveloperRole;
}

function assignRecordComparable(out: Record<string, unknown>, key: string, value: unknown) {
  if (nonEmptyRecord(value)) out[key] = value;
}

function modelConfigComparable(row: CompatModelRow | null | undefined) {
  if (!row) return {};
  const capabilities = modelCapabilitiesFromRow(row);
  const compat = row.compat || {};
  const out: Record<string, unknown> = {};
  if (Object.keys(capabilities).length > 0) out.capabilities = capabilities;
  assignTrimmedString(out, "targetFormat", row.targetFormat ?? compat.targetFormat);
  assignUnsupportedParamsComparable(out, row.unsupportedParams ?? compat.unsupportedParams);
  const normalizeToolCallId = row.normalizeToolCallId ?? compat.normalizeToolCallId;
  if (normalizeToolCallId === true) out.normalizeToolCallId = true;
  assignDeveloperRoleComparable(out, row, compat);
  assignRecordComparable(out, "upstreamHeaders", row.upstreamHeaders ?? compat.upstreamHeaders);
  assignRecordComparable(out, "compatByProtocol", row.compatByProtocol ?? compat.compatByProtocol);
  return out;
}

export function mergeModelConfigRow(
  row: CompatModelRow | null | undefined,
  override: CompatModelRow | null | undefined
): CompatModelRow {
  const base = row ? { ...row } : {};
  const baseCapabilities = modelCapabilitiesFromRow(row);
  const overrideCapabilities = modelCapabilitiesFromRow(override);
  const capabilities = { ...baseCapabilities, ...overrideCapabilities };
  const merged: CompatModelRow = {
    ...base,
    ...(Object.keys(capabilities).length > 0 ? { capabilities } : {}),
  };
  const compat = { ...(base.compat || {}) };
  if (override && Object.prototype.hasOwnProperty.call(override, "targetFormat")) {
    merged.targetFormat = override.targetFormat;
    if (typeof override.targetFormat === "string" && override.targetFormat.trim()) {
      compat.targetFormat = override.targetFormat.trim();
    } else {
      delete compat.targetFormat;
    }
  }
  if (override && Object.prototype.hasOwnProperty.call(override, "unsupportedParams")) {
    merged.unsupportedParams = override.unsupportedParams;
    if (Array.isArray(override.unsupportedParams) && override.unsupportedParams.length > 0) {
      compat.unsupportedParams = override.unsupportedParams;
    } else {
      delete compat.unsupportedParams;
    }
  }
  if (Object.keys(compat).length > 0) merged.compat = compat;
  return merged;
}

export function editableModelConfigRow(
  row: CompatModelRow | null | undefined,
  override: CompatModelRow | null | undefined,
  includeRowConfig: boolean
): CompatModelRow | null | undefined {
  return includeRowConfig ? mergeModelConfigRow(row, override) : override;
}

export function hasModelConfigOverride(
  row: CompatModelRow | null | undefined,
  override: CompatModelRow | null | undefined
): boolean {
  if (Object.keys(modelConfigComparable(override)).length > 0) return true;
  if (!row) return false;
  const current = modelConfigComparable(row);
  const baseline = modelConfigComparable(row.baseline);
  if (Object.keys(baseline).length > 0) {
    return JSON.stringify(current) !== JSON.stringify(baseline);
  }
  const source = typeof row.source === "string" ? row.source.toLowerCase() : "";
  return (
    Object.keys(current).length > 0 &&
    source.length > 0 &&
    source !== "system" &&
    source !== "imported" &&
    source !== "fallback" &&
    source !== "alias"
  );
}
