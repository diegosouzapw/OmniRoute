import { PROVIDER_ID_TO_ALIAS, PROVIDER_MODELS } from "../config/providerModels.ts";
import { ANTIGRAVITY_MODEL_ALIASES } from "../config/antigravityModelAliases.ts";
import { resolveWildcardAlias } from "./wildcardRouter.ts";

// Derive alias→provider mapping from the single source of truth (PROVIDER_ID_TO_ALIAS)
// This prevents the two maps from drifting out of sync
const ALIAS_TO_PROVIDER_ID = {};
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
const PROVIDER_MODEL_ALIASES = {
  github: {
    "claude-4.5-opus": "claude-opus-4-5-20251101",
    "claude-opus-4.5": "claude-opus-4-5-20251101",
    "gemini-3-pro": "gemini-3.1-pro-preview",
    "gemini-3-pro-preview": "gemini-3.1-pro-preview",
    "gemini-3-flash": "gemini-3-flash-preview",
    "raptor-mini": "oswe-vscode-prime",
  },
  gemini: {
    "gemini-3.1-pro-preview": "gemini-3.1-pro",
    "gemini-3-1-pro": "gemini-3.1-pro",
  },
  "gemini-cli": {
    "gemini-3.1-pro-preview": "gemini-3.1-pro",
    "gemini-3-1-pro": "gemini-3.1-pro",
  },
  nvidia: {
    "gpt-oss-120b": "openai/gpt-oss-120b",
    "nvidia/gpt-oss-120b": "openai/gpt-oss-120b",
    "gpt-oss-20b": "openai/gpt-oss-20b",
    "nvidia/gpt-oss-20b": "openai/gpt-oss-20b",
  },
  antigravity: ANTIGRAVITY_MODEL_ALIASES,
};

const CROSS_PROXY_MODEL_ALIASES = {
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
const MODEL_TO_PROVIDERS = new Map();
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
const CODEX_PREFERRED_UNPREFIXED_MODELS = new Set(["codex-auto-review", "gpt-5.5"]);

/**
 * Resolve provider alias to provider ID
 */
export function resolveProviderAlias(aliasOrId) {
  return ALIAS_TO_PROVIDER_ID[aliasOrId] || aliasOrId;
}

function isCrossProxyModelCompatEnabled() {
  const raw = process.env.MODEL_ALIAS_COMPAT_ENABLED;
  return raw !== "false" && raw !== "0";
}

export function normalizeCrossProxyModelId(modelId) {
  if (!modelId || typeof modelId !== "string" || !isCrossProxyModelCompatEnabled()) {
    return { modelId, applied: false, original: null };
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
function resolveProviderModelAlias(providerOrAlias, modelId) {
  if (!modelId || typeof modelId !== "string") return modelId;
  const providerId = resolveProviderAlias(providerOrAlias);
  const aliases = PROVIDER_MODEL_ALIASES[providerId];
  return aliases?.[modelId] || modelId;
}

function hasKnownProviderModel(providerOrAlias, modelId) {
  if (!providerOrAlias || !modelId) return false;

  const providerId = resolveProviderAlias(providerOrAlias);
  const providerAlias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  const models = PROVIDER_MODELS[providerAlias] || PROVIDER_MODELS[providerId] || [];

  if (models.some((entry) => entry?.id === modelId)) return true;

  const canonicalModel = resolveProviderModelAlias(providerId, modelId);
  return canonicalModel !== modelId && models.some((entry) => entry?.id === canonicalModel);
}

function shouldTreatAsExactModelId(modelStr) {
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
export function resolveCanonicalProviderModel(providerOrAlias, modelId) {
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
export function parseModel(modelStr) {
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
    cleanStr = normalizeCrossProxyModelId(cleanStr).modelId;
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
export function resolveModelAliasFromMap(alias, aliases) {
  const resolved = resolveModelAliasTarget(alias, aliases);
  if (!resolved?.provider) return null;
  return {
    provider: resolved.provider,
    model: resolved.model,
  };
}

function resolveModelAliasTarget(alias, aliases) {
  if (!aliases) return null;

  const resolved = aliases[alias];
  if (!resolved) return null;

  if (typeof resolved === "string") {
    return parseAliasTarget(resolved);
  }

  if (typeof resolved === "object" && resolved.provider && resolved.model) {
    const normalizedPair = normalizeCrossProxyModelId(
      `${resolved.provider}/${resolved.model}`
    ).modelId;
    if (normalizedPair !== `${resolved.provider}/${resolved.model}`) {
      return parseAliasTarget(normalizedPair);
    }

    return {
      provider: resolveProviderAlias(resolved.provider),
      model: normalizeCrossProxyModelId(resolved.model).modelId,
    };
  }

  return null;
}

function parseAliasTarget(target) {
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

function resolveModelByProviderInference(modelId, extendedContext) {
  const providers = MODEL_TO_PROVIDERS.get(modelId) || [];

  const nonOpenAIProviders = providers.filter((p) => p !== "openai");

  if (providers.includes("codex") && CODEX_PREFERRED_UNPREFIXED_MODELS.has(modelId)) {
    return {
      provider: "codex",
      model: modelId,
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

  if (nonOpenAIProviders.length === 1) {
    const provider = nonOpenAIProviders[0];
    const canonicalModel = resolveProviderModelAlias(provider, modelId);
    return { provider, model: canonicalModel, extendedContext };
  }

  if (nonOpenAIProviders.length > 1) {
    const aliasesForHint = nonOpenAIProviders.map((p) => PROVIDER_ID_TO_ALIAS[p] || p);
    const hints = aliasesForHint.slice(0, 2).map((alias) => `${alias}/${modelId}`);
    const message = `Ambiguous model '${modelId}'. Use provider/model prefix (ex: ${hints.join(" or ")}).`;
    console.warn(`[MODEL] ${message} Candidates: ${aliasesForHint.join(", ")}`);
    return {
      provider: null,
      model: modelId,
      errorType: "ambiguous_model",
      errorMessage: message,
      candidateProviders: nonOpenAIProviders,
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
export async function getModelInfoCore(modelStr, aliasesOrGetter) {
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
    return resolveModelByProviderInference(resolved.model, extendedContext);
  }

  // T13: Try wildcard alias (glob patterns like "claude-sonnet-*" → "anthropic/claude-sonnet-4-...")
  if (aliases && typeof aliases === "object") {
    const aliasEntries = Object.entries(aliases).map(([pattern, target]) => ({ pattern, target }));
    const wildcardMatch = resolveWildcardAlias(parsed.model, aliasEntries);
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
  return resolveModelByProviderInference(normalizedModelId, extendedContext);
}
