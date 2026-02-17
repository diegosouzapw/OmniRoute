import { PROVIDER_ID_TO_ALIAS, PROVIDER_MODELS } from "../config/providerModels.ts";

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
    "gemini-3-pro": "gemini-3-pro-preview",
    "gemini-3-flash": "gemini-3-flash-preview",
    "raptor-mini": "oswe-vscode-prime",
  },
  antigravity: {
    "gemini-3-flash": "gemini-3-flash-preview",
  },
};

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

/**
 * Resolve provider alias to provider ID
 */
export function resolveProviderAlias(aliasOrId) {
  return ALIAS_TO_PROVIDER_ID[aliasOrId] || aliasOrId;
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

/**
 * Parse model string: "alias/model" or "provider/model" or just alias
 */
export function parseModel(modelStr) {
  if (!modelStr) {
    return { provider: null, model: null, isAlias: false, providerAlias: null };
  }

  // Sanitize: reject strings with path traversal or control characters
  if (/\.\.[\/\\]/.test(modelStr) || /[\x00-\x1f]/.test(modelStr)) {
    console.log(`[MODEL] Warning: rejected malformed model string: "${modelStr.substring(0, 50)}"`);
    return { provider: null, model: null, isAlias: false, providerAlias: null };
  }

  // Check if standard format: provider/model or alias/model
  if (modelStr.includes("/")) {
    const firstSlash = modelStr.indexOf("/");
    const providerOrAlias = modelStr.slice(0, firstSlash);
    const model = modelStr.slice(firstSlash + 1);
    const provider = resolveProviderAlias(providerOrAlias);
    return { provider, model, isAlias: false, providerAlias: providerOrAlias };
  }

  // Alias format (model alias, not provider alias)
  return { provider: null, model: modelStr, isAlias: true, providerAlias: null };
}

/**
 * Resolve model alias from aliases object
 * Format: { "alias": "provider/model" }
 */
export function resolveModelAliasFromMap(alias, aliases) {
  if (!aliases) return null;

  // Check if alias exists
  const resolved = aliases[alias];
  if (!resolved) return null;

  // Resolved value is "provider/model" format
  if (typeof resolved === "string" && resolved.includes("/")) {
    const firstSlash = resolved.indexOf("/");
    const providerOrAlias = resolved.slice(0, firstSlash);
    return {
      provider: resolveProviderAlias(providerOrAlias),
      model: resolved.slice(firstSlash + 1),
    };
  }

  // Or object { provider, model }
  if (typeof resolved === "object" && resolved.provider && resolved.model) {
    return {
      provider: resolveProviderAlias(resolved.provider),
      model: resolved.model,
    };
  }

  return null;
}

/**
 * Get full model info (parse or resolve)
 * @param {string} modelStr - Model string
 * @param {object|function} aliasesOrGetter - Aliases object or async function to get aliases
 */
export async function getModelInfoCore(modelStr, aliasesOrGetter) {
  const parsed = parseModel(modelStr);

  if (!parsed.isAlias) {
    const canonicalModel = resolveProviderModelAlias(parsed.provider, parsed.model);
    return {
      provider: parsed.provider,
      model: canonicalModel,
    };
  }

  // Get aliases (from object or function)
  const aliases = typeof aliasesOrGetter === "function" ? await aliasesOrGetter() : aliasesOrGetter;

  // Resolve alias
  const resolved = resolveModelAliasFromMap(parsed.model, aliases);
  if (resolved) {
    const canonicalModel = resolveProviderModelAlias(resolved.provider, resolved.model);
    return {
      provider: resolved.provider,
      model: canonicalModel,
    };
  }

  const modelId = parsed.model;
  const providers = MODEL_TO_PROVIDERS.get(modelId) || [];

  // Preserve historical behavior: OpenAI stays default when model exists there
  if (providers.includes("openai")) {
    return {
      provider: "openai",
      model: modelId,
    };
  }

  const nonOpenAIProviders = providers.filter((p) => p !== "openai");
  if (nonOpenAIProviders.length === 1) {
    const provider = nonOpenAIProviders[0];
    const canonicalModel = resolveProviderModelAlias(provider, modelId);
    return { provider, model: canonicalModel };
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

  // Fallback: treat as openai model
  return {
    provider: "openai",
    model: modelId,
  };
}
