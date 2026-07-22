import { generateModels, generateAliasMap, type RegistryModel } from "./providerRegistry.ts";

// Lazy PROVIDER_MODELS: deferred until first property access to speed up startup.
// The Proxy defers `generateModels()` from module-evaluation time to the first read.
let _models: Record<string, RegistryModel[]> | null = null;
function initModels(): Record<string, RegistryModel[]> {
  if (!_models) _models = generateModels();
  return _models;
}

export const PROVIDER_MODELS: Record<string, RegistryModel[]> = new Proxy(
  {} as Record<string, RegistryModel[]>,
  {
    get(_, prop) {
      if (typeof prop === 'symbol') return undefined;
      return Reflect.get(initModels(), prop, _models);
    },
    has(_, prop) {
      if (typeof prop === 'symbol') return false;
      return Reflect.has(initModels(), prop);
    },
    ownKeys() {
      return Reflect.ownKeys(initModels());
    },
    getOwnPropertyDescriptor(_, prop) {
      if (typeof prop === 'symbol') return undefined;
      return Object.getOwnPropertyDescriptor(initModels(), prop);
    },
    set(_, prop, value) {
      if (typeof prop === 'symbol') return false;
      (initModels() as Record<string, RegistryModel[]>)[prop] = value;
      return true;
    },
    deleteProperty(_, prop) {
      if (typeof prop === 'symbol') return false;
      return Reflect.deleteProperty(initModels(), prop);
    },
  }
);
export const PROVIDER_ID_TO_ALIAS: Record<string, string> = new Proxy(
  {} as Record<string, string>,
  {
    get(_, prop) {
      if (typeof prop === 'symbol') return undefined;
      return Reflect.get(initAliases(), prop, _aliases);
    },
    has(_, prop) {
      if (typeof prop === 'symbol') return false;
      return Reflect.has(initAliases(), prop);
    },
    ownKeys() {
      return Reflect.ownKeys(initAliases());
    },
    getOwnPropertyDescriptor(_, prop) {
      if (typeof prop === 'symbol') return undefined;
      return Object.getOwnPropertyDescriptor(initAliases(), prop);
    },
    set(_, prop, value) {
      if (typeof prop === 'symbol') return false;
      (initAliases() as Record<string, string>)[prop] = value;
      return true;
    },
    deleteProperty(_, prop) {
      if (typeof prop === 'symbol') return false;
      return Reflect.deleteProperty(initAliases(), prop);
    },
  }
);

let _aliases: Record<string, string> | null = null;
function initAliases(): Record<string, string> {
  if (!_aliases) _aliases = generateAliasMap();
  return _aliases;
}

// Helper functions
export function getProviderModels(aliasOrId: string): RegistryModel[] {
  // Accept either the public alias (the /v1/models prefix, e.g. "gh") or the raw
  // provider id (e.g. "github") and resolve id→alias before reading the namespace
  // map — so callers don't need to know which form they hold. We resolve here rather
  // than mirroring raw-id keys into PROVIDER_MODELS, whose keys ARE the public
  // prefixes (a raw id like "opencode" would collide with the opencode-zen route —
  // see #2798/#3870).
  const alias = PROVIDER_ID_TO_ALIAS[aliasOrId] || aliasOrId;
  return PROVIDER_MODELS[alias] || PROVIDER_MODELS[aliasOrId] || [];
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
  const found = models?.find((m) => m.id === modelId);
  if (found?.targetFormat) return found.targetFormat;
  // #5842: OpenAI "*-pro" reasoning models (o1-pro, gpt-5.x-pro) are only served by
  // the native /v1/responses endpoint — /v1/chat/completions 404s ("only supported
  // in v1/responses"). Curated catalog entries are tagged explicitly; this heuristic
  // covers dynamically-synced ids that post-date the catalog (same spirit as the gh
  // executor's /codex/i routing, 9router#102). Scoped to the openai alias so other
  // providers shipping *-pro ids keep their own endpoint semantics.
  if (aliasOrId === "openai" && /-pro$/i.test(modelId)) return "openai-responses";
  return null;
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

/**
 * Model-level upstream header-response timeout override, when the registry
 * entry for `modelId` sets one (#6354). Returns `undefined` when the model
 * isn't found or has no override, so callers can fall through to the
 * provider-level/global defaults unchanged.
 */
export function getModelTimeoutMs(aliasOrId: string, modelId: string): number | undefined {
  // Callers (e.g. chatCore's timeout resolution) pass the raw provider id
  // ("codex"), not the public alias ("cx") that PROVIDER_MODELS is keyed by
  // — resolve id→alias the same way getProviderModels()/getModelsByProviderId()
  // do, so the override actually resolves (#6354).
  const alias = PROVIDER_ID_TO_ALIAS[aliasOrId] || aliasOrId;
  return getProviderModel(alias, modelId)?.timeoutMs;
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

function getDatedClaudeAliasDate(candidate: string, modelId: string): number | null {
  if (!modelId.startsWith(`${candidate}-`)) return null;
  const suffix = modelId.slice(candidate.length + 1);
  if (!/^\d{8}$/.test(suffix)) return null;
  return Number(suffix);
}

function findCanonicalClaudeEffortModel(modelId: string): RegistryModel | undefined {
  const id = splitClaudeEffortSuffix(modelId).baseModel.toLowerCase();
  const claudeMatch = id.match(CLAUDE_MODEL_PATTERN);
  if (!claudeMatch) return undefined;

  const claudeOffset = claudeMatch[0]?.indexOf("claude") ?? 0;
  const claudeStart = (claudeMatch.index ?? 0) + Math.max(claudeOffset, 0);
  const claudeScopedId = id.slice(claudeStart).replace(/\.(?=\d)/g, "-");
  const candidates = [claudeScopedId];
  if (claudeScopedId.endsWith("-thinking")) {
    candidates.push(claudeScopedId.slice(0, -"-thinking".length));
  }

  const claudeModels = getModelsByProviderId("claude");
  for (const candidate of candidates) {
    const exact = claudeModels.find((entry) => entry.id.toLowerCase() === candidate);
    if (exact) return exact;

    if (!/-\d+-\d+$/.test(candidate)) continue;
    const datedAliases = claudeModels
      .map((entry) => ({
        entry,
        date: getDatedClaudeAliasDate(candidate, entry.id.toLowerCase()),
      }))
      .filter(
        (item): item is { entry: RegistryModel; date: number } =>
          item.date !== null && item.entry.supportsXHighEffort !== undefined
      )
      .sort((a, b) => b.date - a.date || a.entry.id.localeCompare(b.entry.id));
    if (datedAliases[0]) return datedAliases[0].entry;
  }

  return undefined;
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
  const model = providerModels?.find((entry) => entry.id === modelId);
  if (model?.supportsXHighEffort !== undefined) {
    return model.supportsXHighEffort !== false;
  }

  const canonicalClaudeModel = findCanonicalClaudeEffortModel(modelId);
  if (canonicalClaudeModel?.supportsXHighEffort !== undefined) {
    return canonicalClaudeModel.supportsXHighEffort !== false;
  }

  // Keep explicit false entries as the unsupported-model list. Unlisted models
  // and models without an explicit flag pass through unchanged. Unknown
  // providers follow the same rule except for canonical Claude aliases above.
  return true;
}

/** @deprecated Use supportsXHighEffort(); max normalization now follows the same opt-out policy. */
export function supportsXHighEffortForMaxNormalization(
  aliasOrId: string,
  modelId: string
): boolean {
  return supportsXHighEffort(aliasOrId, modelId);
}
