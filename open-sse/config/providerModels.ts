import { generateModels, generateAliasMap, type RegistryModel } from "./providerRegistry.ts";

// Provider models - Generated from providerRegistry.js (single source of truth)
export const PROVIDER_MODELS = generateModels();

// Provider ID to alias mapping - Generated from providerRegistry.js
export const PROVIDER_ID_TO_ALIAS = generateAliasMap();

const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";
const CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER = "cc-compatible";

function resolveProviderModelNamespace(aliasOrId: string): string {
  if (aliasOrId === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER) return "cc";
  if (aliasOrId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX)) return "cc";
  const alias = PROVIDER_ID_TO_ALIAS[aliasOrId] || aliasOrId;
  if (alias === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER) return "cc";
  return alias.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX) ? "cc" : alias;
}

// Helper functions
export function getProviderModels(aliasOrId: string): RegistryModel[] {
  // Accept either the public alias (the /v1/models prefix, e.g. "gh") or the raw
  // provider id (e.g. "github") and resolve id→alias before reading the namespace
  // map — so callers don't need to know which form they hold. We resolve here rather
  // than mirroring raw-id keys into PROVIDER_MODELS, whose keys ARE the public
  // prefixes (a raw id like "opencode" would collide with the opencode-zen route —
  // see #2798/#3870).
  const namespace = resolveProviderModelNamespace(aliasOrId);
  return PROVIDER_MODELS[namespace] || PROVIDER_MODELS[aliasOrId] || [];
}

export function getDefaultModel(aliasOrId: string): string | null {
  const models = getProviderModels(aliasOrId);
  return models?.[0]?.id || null;
}

export function getProviderModel(aliasOrId: string, modelId: string): RegistryModel | undefined {
  const models = getProviderModels(aliasOrId);
  if (!models) return undefined;
  return models.find((model) => model.id === modelId);
}

function modelSupportsXHighEffort(model: RegistryModel | undefined): boolean | undefined {
  const configured = model?.capabilities?.supportsXHighEffort;
  return typeof configured === "boolean" ? configured : undefined;
}

function modelSupportsMaxEffort(model: RegistryModel | undefined): boolean | undefined {
  const configured = model?.capabilities?.supportsMaxEffort;
  return typeof configured === "boolean" ? configured : undefined;
}

export function isValidModel(
  aliasOrId: string,
  modelId: string,
  passthroughProviders = new Set<string>()
): boolean {
  if (passthroughProviders.has(aliasOrId)) return true;
  const models = getProviderModels(aliasOrId);
  if (!models) return false;
  return models.some((m) => m.id === modelId);
}

export function findModelName(aliasOrId: string, modelId: string): string {
  const models = getProviderModels(aliasOrId);
  if (!models) return modelId;
  const found = models.find((m) => m.id === modelId);
  return found?.name || modelId;
}

export function getModelTargetFormat(aliasOrId: string, modelId: string): string | null {
  const models = getProviderModels(aliasOrId);
  const found = models.find((m) => m.id === modelId);
  const targetFormat = found?.compat?.targetFormat;
  if (typeof targetFormat === "string" && targetFormat.length > 0) return targetFormat;
  // #5842: OpenAI "*-pro" reasoning models (o1-pro, gpt-5.x-pro) are only served by
  // the native /v1/responses endpoint — /v1/chat/completions 404s ("only supported
  // in v1/responses"). Curated catalog entries are tagged explicitly; this heuristic
  // covers dynamically-synced ids that post-date the catalog (same spirit as the gh
  // executor's /codex/i routing, 9router#102). Scoped to the openai alias so other
  // providers shipping *-pro ids keep their own endpoint semantics.
  const namespace = resolveProviderModelNamespace(aliasOrId);
  if (namespace === "openai" && /-pro$/i.test(modelId)) return "openai-responses";
  return null;
}

export function getModelStripTypes(aliasOrId: string, modelId: string): string[] {
  const models = getProviderModels(aliasOrId);
  if (!models) return [];
  const found = models.find((m) => m.id === modelId);
  const strip = found?.compat?.strip;
  return Array.isArray(strip) ? [...strip] : [];
}

export function getModelsByProviderId(providerId: string): RegistryModel[] {
  return getProviderModels(providerId);
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
  const resolvedId =
    aliasOrId === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER ||
    aliasOrId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX)
      ? "cc"
      : aliasOrId;
  const alias = resolveProviderModelNamespace(resolvedId);
  const models = getProviderModels(resolvedId);
  return { alias, models: models.length > 0 ? models : null };
}

function isClaudeCodeCompatibleLookup(aliasOrId: string, alias: string): boolean {
  return (
    alias === "cc" ||
    aliasOrId === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER ||
    aliasOrId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX)
  );
}

function addModelLookupCandidate(candidates: Set<string>, value: string): void {
  if (!value) return;
  candidates.add(value);
  const effortBase = splitClaudeEffortSuffix(value).baseModel;
  candidates.add(effortBase);
  if (effortBase.endsWith("-thinking")) {
    candidates.add(effortBase.slice(0, -"-thinking".length));
  }
  candidates.add(effortBase.replace(/\.(?=\d)/g, "-"));
}

function getConfiguredProviderModel(aliasOrId: string, modelId: string): RegistryModel | undefined {
  const { alias, models } = resolveProviderModelList(aliasOrId);
  if (!models) return undefined;
  const candidates = new Set<string>();
  addModelLookupCandidate(candidates, modelId);
  if (isClaudeCodeCompatibleLookup(aliasOrId, alias) && modelId.includes("/")) {
    addModelLookupCandidate(candidates, modelId.split("/").slice(1).join("/"));
  }
  return models.find((entry) => candidates.has(entry.id));
}

export function getXHighEffortSupport(aliasOrId: string, modelId: string): boolean | undefined {
  const model = getConfiguredProviderModel(aliasOrId, modelId);
  const configured = modelSupportsXHighEffort(model);
  return configured;
}

export function supportsXHighEffort(aliasOrId: string, modelId: string): boolean {
  // Keep explicit false entries as the unsupported-model list. Unlisted models
  // and models without an explicit flag pass through unchanged.
  return getXHighEffortSupport(aliasOrId, modelId) !== false;
}

export function getMaxEffortSupport(aliasOrId: string, modelId: string): boolean | undefined {
  return modelSupportsMaxEffort(getConfiguredProviderModel(aliasOrId, modelId));
}
