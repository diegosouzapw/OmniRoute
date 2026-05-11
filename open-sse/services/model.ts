import { PROVIDER_ID_TO_ALIAS, PROVIDER_MODELS } from "../config/providerModels.ts";
import { ANTIGRAVITY_MODEL_ALIASES } from "../config/antigravityModelAliases.ts";
import { resolveWildcardAlias } from "./wildcardRouter.ts";

type ProviderModelAliasMap = Record<string, Record<string, string>>;
type ModelAliasValue = string | { provider?: string; model?: string };
type ModelAliasMap = Record<string, ModelAliasValue>;
type ParsedModel = {
  provider: string | null;
  model: string | null;
  isAlias: boolean;
  providerAlias: string | null;
  extendedContext: boolean;
};
type ResolvedModelTarget = {
  provider?: string | null;
  model: string | null;
};

// Derive alias→provider mapping from the single source of truth (PROVIDER_ID_TO_ALIAS)
// This prevents the two maps from drifting out of sync
const ALIAS_TO_PROVIDER_ID: Record<string, string> = {};
for (const [id, alias] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
  if (ALIAS_TO_PROVIDER_ID[alias]) {
    console.log(
      `[MODEL] Warning: alias "${alias}" maps to both "${ALIAS_TO_PROVIDER_ID[alias]}" and "${id}". Using "${id}".`
    );
  }
  ALIAS_TO_PROVIDER_ID[alias] = id;
}

// Provider-scoped legacy model aliases. Used to normalize provider/model inputs
// and keep backward compatibility when upstream IDs change.
const PROVIDER_MODEL_ALIASES: ProviderModelAliasMap = {
  github: {
    "claude-4.5-opus": "claude-opus-4-5-20251101",
    "claude-opus-4.5": "claude-opus-4-5-20251101",
    "gemini-3-pro": "gemini-3.1-pro-preview",
    "gemini-3-pro-preview": "gemini-3.1-pro-preview",
    "gemini-3-flash": "gemini-3-flash-preview",
    "raptor-mini": "oswe-vscode-prime",
  },
  gemini: {
    "gemini-3.1-pro": "gemini-3.1-pro-preview",
    "gemini-3-1-pro": "gemini-3.1-pro-preview",
  },
  "gemini-cli": {
    "gemini-3.1-pro": "gemini-3.1-pro-preview",
    "gemini-3-1-pro": "gemini-3.1-pro-preview",
  },
  nvidia: {
    "gpt-oss-120b": "openai/gpt-oss-120b",
    "nvidia/gpt-oss-120b": "openai/gpt-oss-120b",
    "gpt-oss-20b": "openai/gpt-oss-20b",
    "nvidia/gpt-oss-20b": "openai/gpt-oss-20b",
  },
  antigravity: { ...ANTIGRAVITY_MODEL_ALIASES },
  kiro: {
    "claude-opus-4-7": "claude-opus-4.7",
    "claude-opus-4-6": "claude-opus-4.6",
    "claude-sonnet-4-6": "claude-sonnet-4.6",
    "claude-sonnet-4-5": "claude-sonnet-4.5",
    "claude-haiku-4-5": "claude-haiku-4.5",
  },
};

const CROSS_PROXY_MODEL_ALIASES: Record<string, string> = {
  "gpt-oss:120b": "gpt-oss-120b",
  "deepseek-v3.2-chat": "deepseek-v3.2",
  "deepseek-v3-2": "deepseek-v3.2",
  "qwen3-coder:480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  "claude-opus-4.5": "claude-opus-4-5-20251101",
  "anthropic/claude-opus-4.5": "claude-opus-4-5-20251101",
};

const CROSS_PROXY_MODEL_ALIASES_LOWER = Object.fromEntries(
  Object.entries(CROSS_PROXY_MODEL_ALIASES).map(([alias, canonical]) => [
    alias.toLowerCase(),
    canonical,
  ])
);

// Reverse index: modelId -> providerIds that expose this model
const MODEL_TO_PROVIDERS = new Map<string, string[]>();
for (const [aliasOrId, models] of Object.entries(PROVIDER_MODELS)) {
  const providerId = ALIAS_TO_PROVIDER_ID[aliasOrId] || aliasOrId;
  for (const modelEntry of models || []) {
    const modelId = modelEntry?.id;
    if (!modelId) continue;
    const providers = MODEL_TO_PROVIDERS.get(modelId) || [];
    if (!providers.includes(providerId)) {
      providers.push(providerId);
      MODEL_TO_PROVIDERS.set(modelId, providers);
    }
  }
}
const KNOWN_MODEL_IDS = new Set(MODEL_TO_PROVIDERS.keys());
const CODEX_PREFERRED_UNPREFIXED_MODELS = new Set(["gpt-5.5"]);
const CODEX_PREFERRED_UNPREFIXED_MODEL_ALIASES = new Map([["gpt-5.5", "gpt-5.5-medium"]]);
export const CODEX_NATIVE_UNPREFIXED_MODELS = new Set(["codex-auto-review"]);

interface ProviderConnectionLike {
  provider?: unknown;
  isActive?: unknown;
  is_active?: unknown;
}

/**
 * Resolve provider alias to provider ID
 */
export function resolveProviderAlias(aliasOrId: string | null | undefined): string | null {
  if (typeof aliasOrId !== "string") return null;
  return ALIAS_TO_PROVIDER_ID[aliasOrId] || aliasOrId;
}

function isCrossProxyModelCompatEnabled() {
  const raw = process.env.MODEL_ALIAS_COMPAT_ENABLED;
  return raw !== "false" && raw !== "0";
}

export function normalizeCrossProxyModelId(modelId: unknown): {
  modelId: string | null;
  applied: boolean;
  original: string | null;
} {
  if (!modelId || typeof modelId !== "string" || !isCrossProxyModelCompatEnabled()) {
    return {
      modelId: typeof modelId === "string" ? modelId : null,
      applied: false,
      original: null,
    };
  }

  const normalized =
    CROSS_PROXY_MODEL_ALIASES[modelId] || CROSS_PROXY_MODEL_ALIASES_LOWER[modelId.toLowerCase()];

  if (!normalized || normalized === modelId) {
    return { modelId, applied: false, original: null };
  }

  console.debug(`[MODEL] Cross-proxy alias applied: "${modelId}" → "${normalized}"`);
  return { modelId: normalized, applied: true, original: modelId };
}

/**
 * Resolve provider-specific legacy model alias to canonical model ID.
 */
function resolveProviderModelAlias(
  providerOrAlias: string | null | undefined,
  modelId: string | null | undefined
) {
  if (!modelId || typeof modelId !== "string") return modelId;
  const providerId = resolveProviderAlias(providerOrAlias);
  if (typeof providerId !== "string") return modelId;
  const aliases = PROVIDER_MODEL_ALIASES[providerId];
  return aliases?.[modelId] || modelId;
}

function hasKnownProviderModel(providerOrAlias: string | null | undefined, modelId: string | null) {
  if (!providerOrAlias || !modelId) return false;

  const providerId = resolveProviderAlias(providerOrAlias);
  if (typeof providerId !== "string") return false;
  const providerAlias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  const models = PROVIDER_MODELS[providerAlias] || PROVIDER_MODELS[providerId] || [];

  if (models.some((entry) => entry?.id === modelId)) return true;

  const canonicalModel = resolveProviderModelAlias(providerId, modelId);
  return canonicalModel !== modelId && models.some((entry) => entry?.id === canonicalModel);
}

function hasCodexPreferredUnprefixedModel(modelId: string) {
  const canonicalModel = CODEX_PREFERRED_UNPREFIXED_MODEL_ALIASES.get(modelId);
  if (!canonicalModel) return false;

  const providerAlias = PROVIDER_ID_TO_ALIAS.codex || "codex";
  const models = PROVIDER_MODELS[providerAlias] || PROVIDER_MODELS.codex || [];
  return models.some((entry) => entry?.id === canonicalModel);
}

function resolveInferredProviderModel(provider: string, modelId: string) {
  const codexPreferredModel = CODEX_PREFERRED_UNPREFIXED_MODEL_ALIASES.get(modelId);
  if (provider === "codex" && codexPreferredModel) {
    return codexPreferredModel;
  }
  return resolveProviderModelAlias(provider, modelId);
}

function getInferredProvidersForModel(modelId: string) {
  const providers = [...(MODEL_TO_PROVIDERS.get(modelId) || [])];

  if (
    CODEX_PREFERRED_UNPREFIXED_MODELS.has(modelId) &&
    hasCodexPreferredUnprefixedModel(modelId) &&
    !providers.includes("codex")
  ) {
    providers.push("codex");
  }

  return providers;
}

function isProviderConnectionActive(connection: ProviderConnectionLike) {
  if (connection.isActive !== undefined) {
    return connection.isActive !== false && connection.isActive !== 0;
  }
  if (connection.is_active !== undefined) {
    return connection.is_active !== false && connection.is_active !== 0;
  }
  return false;
}

function getProviderIdFromConnection(connection: unknown) {
  if (!connection || typeof connection !== "object") return null;
  const record = connection as ProviderConnectionLike;
  if (typeof record.provider !== "string" || !record.provider) return null;
  if (!isProviderConnectionActive(record)) return null;
  return resolveProviderAlias(record.provider);
}

async function getActiveProviderSet() {
  try {
    const { getProviderConnections } = await import("@/lib/localDb");
    const conns = (await getProviderConnections()) as unknown[];
    const providers = conns
      .map(getProviderIdFromConnection)
      .filter((provider): provider is string => Boolean(provider));
    return new Set(providers);
  } catch {
    return null;
  }
}

function shouldTreatAsExactModelId(modelStr: string | null) {
  if (!modelStr || typeof modelStr !== "string" || !modelStr.includes("/")) return false;
  if (!KNOWN_MODEL_IDS.has(modelStr)) return false;

  const firstSlash = modelStr.indexOf("/");
  const providerOrAlias = modelStr.slice(0, firstSlash).trim();
  const providerScopedModel = modelStr.slice(firstSlash + 1).trim();
  return !hasKnownProviderModel(providerOrAlias, providerScopedModel);
}

/**
 * Resolve a provider/model pair into canonical provider ID + provider-scoped model ID.
 * Keeps provider-specific legacy aliases out of downstream capability and budget lookups.
 */
export function resolveCanonicalProviderModel(
  providerOrAlias: string | null | undefined,
  modelId: string | null | undefined
) {
  if (!modelId || typeof modelId !== "string") {
    return {
      provider: resolveProviderAlias(providerOrAlias),
      model: modelId || null,
    };
  }

  const provider = resolveProviderAlias(providerOrAlias);
  return {
    provider,
    model: resolveProviderModelAlias(provider, modelId),
  };
}

/**
 * Parse model string: "alias/model" or "provider/model" or just alias
 * Supports [1m] suffix for extended 1M context window (e.g. "claude-sonnet-4-6[1m]")
 */
export function parseModel(modelStr: string | null | undefined): ParsedModel {
  if (!modelStr) {
    return {
      provider: null,
      model: null,
      isAlias: false,
      providerAlias: null,
      extendedContext: false,
    };
  }

  // Sanitize: reject strings with path traversal or control characters
  if (/\.\.[\/\\]/.test(modelStr) || /[\x00-\x1f]/.test(modelStr)) {
    console.log(`[MODEL] Warning: rejected malformed model string: "${modelStr.substring(0, 50)}"`);
    return {
      provider: null,
      model: null,
      isAlias: false,
      providerAlias: null,
      extendedContext: false,
    };
  }

  // Extract [1m] suffix before parsing provider/model
  let extendedContext = false;
  let cleanStr = modelStr;
  if (cleanStr.endsWith("[1m]")) {
    extendedContext = true;
    cleanStr = cleanStr.slice(0, -4);
  }
  cleanStr = cleanStr.trim();

  // Normalize known cross-proxy provider/model dialects before deciding whether
  // the slash belongs to a provider prefix or to the model ID itself.
  if (cleanStr.includes("/")) {
    cleanStr = normalizeCrossProxyModelId(cleanStr).modelId || cleanStr;
  }

  if (shouldTreatAsExactModelId(cleanStr)) {
    console.debug(`[MODEL] Treating "${cleanStr}" as an exact model id`);
    return { provider: null, model: cleanStr, isAlias: true, providerAlias: null, extendedContext };
  }

  // Check if standard format: provider/model or alias/model
  if (cleanStr.includes("/")) {
    const firstSlash = cleanStr.indexOf("/");
    const providerOrAlias = cleanStr.slice(0, firstSlash).trim();
    const model = cleanStr.slice(firstSlash + 1).trim();
    const provider = resolveProviderAlias(providerOrAlias);
    return { provider, model, isAlias: false, providerAlias: providerOrAlias, extendedContext };
  }

  // Alias format (model alias, not provider alias)
  return { provider: null, model: cleanStr, isAlias: true, providerAlias: null, extendedContext };
}

/**
 * Resolve model alias from aliases object
 * Format: { "alias": "provider/model" }
 */
export function resolveModelAliasFromMap(alias: string | null, aliases: ModelAliasMap | null) {
  const resolved = resolveModelAliasTarget(alias, aliases);
  if (!resolved?.provider) return null;
  return {
    provider: resolved.provider,
    model: resolved.model,
  };
}

function resolveModelAliasTarget(
  alias: string | null,
  aliases: ModelAliasMap | null
): ResolvedModelTarget | null {
  if (!alias || !aliases) return null;

  const resolved = aliases[alias];
  if (!resolved) return null;

  if (typeof resolved === "string") {
    return parseAliasTarget(resolved);
  }

  if (
    resolved &&
    typeof resolved === "object" &&
    typeof resolved.provider === "string" &&
    typeof resolved.model === "string"
  ) {
    const normalizedPair = normalizeCrossProxyModelId(
      `${resolved.provider}/${resolved.model}`
    ).modelId;
    if (normalizedPair && normalizedPair !== `${resolved.provider}/${resolved.model}`) {
      return parseAliasTarget(normalizedPair);
    }

    return {
      provider: resolveProviderAlias(resolved.provider),
      model: normalizeCrossProxyModelId(resolved.model).modelId || resolved.model,
    };
  }

  return null;
}

function parseAliasTarget(target: string): ResolvedModelTarget | null {
  const normalizedTarget = normalizeCrossProxyModelId(target).modelId;
  if (!normalizedTarget || typeof normalizedTarget !== "string") return null;

  if (normalizedTarget.includes("/")) {
    if (shouldTreatAsExactModelId(normalizedTarget)) {
      return { model: normalizedTarget };
    }

    const firstSlash = normalizedTarget.indexOf("/");
    return {
      provider: resolveProviderAlias(normalizedTarget.slice(0, firstSlash)),
      model: normalizedTarget.slice(firstSlash + 1),
    };
  }

  return { model: normalizedTarget };
}

async function resolveModelByProviderInference(modelId: string, extendedContext: boolean) {
  const providers = getInferredProvidersForModel(modelId);

  const nonOpenAIProviders = providers.filter((p) => p !== "openai");

  if (CODEX_NATIVE_UNPREFIXED_MODELS.has(modelId)) {
    return {
      provider: "codex",
      model: modelId,
      extendedContext,
    };
  }

  const activeProviders = await getActiveProviderSet();

  if (
    activeProviders?.has("codex") &&
    !activeProviders.has("openai") &&
    providers.includes("codex") &&
    CODEX_PREFERRED_UNPREFIXED_MODELS.has(modelId)
  ) {
    return {
      provider: "codex",
      model: resolveInferredProviderModel("codex", modelId),
      extendedContext,
    };
  }

  // Preserve historical behavior: OpenAI stays default when model exists there
  if (providers.includes("openai")) {
    return {
      provider: "openai",
      model: modelId,
      extendedContext,
    };
  }

  const candidatesToUse = nonOpenAIProviders;

  if (candidatesToUse.length === 1) {
    const provider = candidatesToUse[0];
    const canonicalModel = resolveInferredProviderModel(provider, modelId);
    return { provider, model: canonicalModel, extendedContext };
  }

  if (candidatesToUse.length > 1) {
    const aliasesForHint = candidatesToUse.map((p) => PROVIDER_ID_TO_ALIAS[p] || p);
    const hints = aliasesForHint.slice(0, 2).map((alias) => `${alias}/${modelId}`);
    const message = `Ambiguous model '${modelId}'. Use provider/model prefix (ex: ${hints.join(" or ")}).`;
    console.warn(`[MODEL] ${message} Candidates: ${aliasesForHint.join(", ")}`);
    return {
      provider: null,
      model: modelId,
      errorType: "ambiguous_model",
      errorMessage: message,
      candidateProviders: candidatesToUse,
      candidateAliases: aliasesForHint,
    };
  }

  // Fallback: infer provider from known model name prefixes before defaulting to openai
  // FIX #73: Models like claude-haiku-4-5-20251001 sent without provider prefix
  // would incorrectly route to OpenAI. Use heuristic prefix detection first.
  if (/^claude-/i.test(modelId)) {
    // Claude models → Anthropic provider (canonical source for Claude models)
    return { provider: "anthropic", model: modelId, extendedContext };
  }
  if (/^gemini-/i.test(modelId) || /^gemma-/i.test(modelId)) {
    // Gemini/Gemma models → Gemini provider
    return { provider: "gemini", model: modelId, extendedContext };
  }

  // Last resort: treat as openai model
  return {
    provider: "openai",
    model: modelId,
    extendedContext,
  };
}

/**
 * Get full model info (parse or resolve)
 * @param {string} modelStr - Model string
 * @param {object|function} aliasesOrGetter - Aliases object or async function to get aliases
 */
export async function getModelInfoCore(
  modelStr: string,
  aliasesOrGetter: ModelAliasMap | (() => Promise<ModelAliasMap>) | null
) {
  const parsed = parseModel(modelStr);
  const { extendedContext } = parsed;

  if (!parsed.isAlias) {
    const normalizedModel = normalizeCrossProxyModelId(parsed.model).modelId;
    const canonicalModel = resolveProviderModelAlias(parsed.provider, normalizedModel);
    return {
      provider: parsed.provider,
      model: canonicalModel,
      extendedContext,
    };
  }

  // Get aliases (from object or function)
  const aliases = typeof aliasesOrGetter === "function" ? await aliasesOrGetter() : aliasesOrGetter;

  // Resolve exact alias
  const resolved = resolveModelAliasTarget(parsed.model, aliases);
  if (resolved?.provider) {
    const canonicalModel = resolveProviderModelAlias(resolved.provider, resolved.model);
    return {
      provider: resolved.provider,
      model: canonicalModel,
      extendedContext,
    };
  }
  if (resolved?.model) {
    return await resolveModelByProviderInference(resolved.model, extendedContext);
  }

  // T13: Try wildcard alias (glob patterns like "claude-sonnet-*" → "anthropic/claude-sonnet-4-...")
  if (aliases && typeof aliases === "object") {
    const aliasEntries = Object.entries(aliases).map(([pattern, target]) => ({
      pattern,
      target: typeof target === "string" ? target : "",
    }));
    const wildcardMatch = parsed.model ? resolveWildcardAlias(parsed.model, aliasEntries) : null;
    if (wildcardMatch) {
      const target = wildcardMatch.target as string;
      if (target.includes("/")) {
        const firstSlash = target.indexOf("/");
        const providerOrAlias = target.slice(0, firstSlash);
        const targetModel = target.slice(firstSlash + 1);
        const provider = resolveProviderAlias(providerOrAlias);
        const canonicalModel = resolveProviderModelAlias(provider, targetModel);
        return {
          provider,
          model: canonicalModel,
          extendedContext,
          wildcardPattern: wildcardMatch.pattern,
        };
      }
    }
  }

  const normalizedModelId = normalizeCrossProxyModelId(parsed.model).modelId;
  if (!normalizedModelId) {
    return { provider: null, model: null, extendedContext };
  }
  return await resolveModelByProviderInference(normalizedModelId, extendedContext);
}
