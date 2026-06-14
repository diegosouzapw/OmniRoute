import { generateModels, generateAliasMap, type RegistryModel } from "./providerRegistry.ts";

// Provider models - Generated from providerRegistry.js (single source of truth)
export const PROVIDER_MODELS = generateModels();

// Provider ID to alias mapping - Generated from providerRegistry.js
export const PROVIDER_ID_TO_ALIAS = generateAliasMap();

// Helper functions
export function getProviderModels(aliasOrId: string): RegistryModel[] {
  return PROVIDER_MODELS[aliasOrId] || [];
}

export function getDefaultModel(aliasOrId: string): string | null {
  const models = PROVIDER_MODELS[aliasOrId];
  return models?.[0]?.id || null;
}

export function getProviderModel(aliasOrId: string, modelId: string): RegistryModel | undefined {
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return undefined;
  return models.find((model) => model.id === modelId);
}

export function isValidModel(
  aliasOrId: string,
  modelId: string,
  passthroughProviders = new Set<string>()
): boolean {
  if (passthroughProviders.has(aliasOrId)) return true;
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return false;
  return models.some((m) => m.id === modelId);
}

export function findModelName(aliasOrId: string, modelId: string): string {
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return modelId;
  const found = models.find((m) => m.id === modelId);
  return found?.name || modelId;
}

export function getModelTargetFormat(aliasOrId: string, modelId: string): string | null {
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return null;
  const found = models.find((m) => m.id === modelId);
  return found?.targetFormat || null;
}

export function getModelStripTypes(aliasOrId: string, modelId: string): string[] {
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return [];
  const found = models.find((m) => m.id === modelId);
  return Array.isArray(found?.strip) ? [...found.strip] : [];
}

export function getModelsByProviderId(providerId: string): RegistryModel[] {
  const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  return PROVIDER_MODELS[alias] || [];
}

const CLAUDE_MODEL_PATTERN = /(?:^|[\/._-])claude(?:[._-]|$)/;
const CLAUDE_MAX_EFFORT_UNSUPPORTED_FAMILY_PATTERNS = [/(?:^|[\/._-])haiku(?:[._-]|$)/] as const;
const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";

export function supportsClaudeMaxEffort(modelId: string | null | undefined): boolean {
  if (typeof modelId !== "string" || modelId.length === 0) return false;
  const normalized = modelId.toLowerCase();
  const claudeMatch = normalized.match(CLAUDE_MODEL_PATTERN);
  if (!claudeMatch) return false;
  const claudeScopedId = normalized.slice(claudeMatch.index ?? 0);
  return !CLAUDE_MAX_EFFORT_UNSUPPORTED_FAMILY_PATTERNS.some((pattern) =>
    pattern.test(claudeScopedId)
  );
}

// Reasoning-effort suffixes the Claude/Claude-Code model picker appends to a base
// model id (an "Effort" slider: Low/Medium/High/Extra-High/Max). Longest/most
// specific token first so the `-${level}` match below picks "xhigh" before "high".
export const CLAUDE_EFFORT_SUFFIXES = ["xhigh", "max", "high", "medium", "low"] as const;
export type ClaudeEffortSuffix = (typeof CLAUDE_EFFORT_SUFFIXES)[number];

/**
 * Split a trailing reasoning-effort suffix off a Claude model id, e.g.
 * "claude-opus-4-8-high" -> { baseModel: "claude-opus-4-8", effort: "high" }.
 *
 * VS Code (and other clients) advertise claude-...-{low,medium,high,xhigh,max} via
 * the model catalog; Anthropic has no such model id, so the suffixed string must be
 * stripped before it is sent upstream (otherwise the relay returns HTTP 404) and
 * surfaced as reasoning_effort so the translator / Claude-Code bridge convert it into
 * Claude thinking/effort config. Mirrors codex's splitCodexReasoningSuffix but also
 * covers "max" (codex's EFFORT_ORDER intentionally omits it). The `-${level}` anchor
 * keeps "xhigh" from colliding with "high".
 */
export function splitClaudeEffortSuffix(model: unknown): {
  baseModel: string;
  effort: ClaudeEffortSuffix | null;
} {
  const id = typeof model === "string" ? model : "";
  const lower = id.toLowerCase();
  for (const level of CLAUDE_EFFORT_SUFFIXES) {
    if (lower.endsWith(`-${level}`)) {
      return { baseModel: id.slice(0, -(level.length + 1)), effort: level };
    }
  }
  return { baseModel: id, effort: null };
}

function resolveProviderModelList(aliasOrId: string): {
  alias: string;
  models: RegistryModel[] | null;
} {
  const resolvedId = aliasOrId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX) ? "claude" : aliasOrId;
  const alias = PROVIDER_ID_TO_ALIAS[resolvedId] || resolvedId;
  const models = PROVIDER_MODELS[alias] || PROVIDER_MODELS[resolvedId] || null;
  return { alias, models };
}

export function supportsXHighEffort(aliasOrId: string, modelId: string): boolean {
  const { models: providerModels } = resolveProviderModelList(aliasOrId);
  // Unknown provider (not in registry) — pass through unchanged.
  if (!providerModels) return true;
  const model = providerModels.find((entry) => entry.id === modelId);

  // Keep explicit false entries as the unsupported-model list. Unlisted models
  // and models without an explicit flag pass through unchanged.
  return model?.supportsXHighEffort !== false;
}

export function supportsXHighEffortForMaxNormalization(
  aliasOrId: string,
  modelId: string
): boolean {
  const { alias, models: providerModels } = resolveProviderModelList(aliasOrId);
  if (!providerModels) return true;
  const model = providerModels.find((entry) => entry.id === modelId);

  if (alias === "cc") {
    return model?.supportsXHighEffort !== false;
  }
  return model?.supportsXHighEffort === true;
}
