import { PROVIDER_ID_TO_ALIAS, PROVIDER_MODELS } from "../config/providerModels.ts";
import { parseModel } from "./model.ts";

// Conservative denylist fallback used when registry metadata is absent.
// Keep small and explicit to avoid false negatives.
const TOOL_CALLING_UNSUPPORTED_PATTERNS = ["gpt-oss-120b", "deepseek-reasoner"];

function getRegistryToolCallingFlag(providerIdOrAlias: string, modelId: string): boolean | null {
  const providerAlias = PROVIDER_ID_TO_ALIAS[providerIdOrAlias] || providerIdOrAlias;
  const models = PROVIDER_MODELS[providerAlias];
  if (!Array.isArray(models)) return null;
  const found = models.find((m) => m?.id === modelId);
  if (!found) return null;
  return typeof found.toolCalling === "boolean" ? found.toolCalling : null;
}

/**
 * Returns whether a model should be considered safe for structured function/tool calling.
 *
 * Decision order:
 * 1) Provider registry metadata (toolCalling flag) when available.
 * 2) Conservative denylist fallback for known problematic model families.
 * 3) Default true.
 */
export function supportsToolCalling(modelStr: string): boolean {
  const parsed = parseModel(modelStr);
  const provider = parsed.provider || parsed.providerAlias || "";
  const model = parsed.model || modelStr;

  if (provider) {
    const fromRegistry = getRegistryToolCallingFlag(provider, model);
    if (fromRegistry !== null) return fromRegistry;
  }

  const normalized = String(modelStr || "").toLowerCase();
  if (!normalized) return false;

  const blocked = TOOL_CALLING_UNSUPPORTED_PATTERNS.some((pattern) => {
    if (normalized === pattern) return true;
    if (normalized.endsWith(`/${pattern}`)) return true;
    return normalized.includes(pattern);
  });

  return !blocked;
}

// Models that do NOT support reasoning/thinking parameters.
// AG (Antigravity) claude-sonnet-4-6 routes through a Google internal API
// that returns 400 if thinking params are included.
const REASONING_UNSUPPORTED_PATTERNS = [
  "antigravity/claude-sonnet-4-6",
  "antigravity/claude-sonnet-4-5",
  "antigravity/claude-sonnet-4",
];

function getRegistryReasoningFlag(providerIdOrAlias: string, modelId: string): boolean | null {
  const providerAlias = PROVIDER_ID_TO_ALIAS[providerIdOrAlias] || providerIdOrAlias;
  const models = PROVIDER_MODELS[providerAlias];
  if (!Array.isArray(models)) return null;
  const found = models.find((m) => m?.id === modelId);
  if (!found) return null;
  return typeof found.supportsReasoning === "boolean" ? found.supportsReasoning : null;
}

/**
 * Returns whether a model supports reasoning/thinking parameters.
 *
 * Decision order:
 * 1) Provider registry metadata (supportsReasoning flag) when available.
 * 2) Explicit denylist for known unsupported models (e.g. AG Claude Sonnet).
 * 3) Default true (pass through — safe, provider will ignore if unsupported).
 */
export function supportsReasoning(modelStr: string): boolean {
  const parsed = parseModel(modelStr);
  const provider = parsed.provider || parsed.providerAlias || "";
  const model = parsed.model || modelStr;

  if (provider) {
    const fromRegistry = getRegistryReasoningFlag(provider, model);
    if (fromRegistry !== null) return fromRegistry;
  }

  const normalized = String(modelStr || "").toLowerCase();
  if (!normalized) return true;

  const blocked = REASONING_UNSUPPORTED_PATTERNS.some((pattern) =>
    normalized === pattern ||
    normalized.endsWith(`/${pattern}`) ||
    normalized.includes(pattern)
  );

  return !blocked;
}
