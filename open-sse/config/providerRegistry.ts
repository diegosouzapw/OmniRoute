/**
 * Provider Registry — Single source of truth for all provider configuration.
 * Modularized into `open-sse/config/providers/`
 */

export * from "./providers/shared.ts";
export { REGISTRY } from "./providers/index.ts";
import { REGISTRY } from "./providers/index.ts";
import {
  RegistryModel,
  REASONING_UNSUPPORTED,
  RegistryOAuth,
  RegistryEntry,
  LegacyProvider,
  KIMI_CODING_SHARED,
  buildModels,
  ALIBABA_DASHSCOPE_MODELS,
  GPT_5_5_CONTEXT_LENGTH,
  GPT_5_5_CODEX_CAPABILITIES,
  GPT_5_4_CODEX_CAPABILITIES,
  CHAT_OPENAI_COMPAT_MODELS,
  mapStainlessOs,
  mapStainlessArch,
} from "./providers/shared.ts";

// ── Generator Functions ───────────────────────────────────────────────────

/** Generate legacy PROVIDERS object shape for constants.js backward compatibility */
export function generateLegacyProviders(): Record<string, LegacyProvider> {
  const providers: Record<string, LegacyProvider> = {};
  for (const [id, entry] of Object.entries(REGISTRY)) {
    const p: LegacyProvider = { format: entry.format };

    // URL(s)
    if (entry.baseUrls) {
      p.baseUrls = entry.baseUrls;
    } else if (entry.baseUrl) {
      p.baseUrl = entry.baseUrl;
    }
    if (entry.responsesBaseUrl) {
      p.responsesBaseUrl = entry.responsesBaseUrl;
    }
    if (entry.requestDefaults) {
      p.requestDefaults = entry.requestDefaults;
    }
    if (typeof entry.timeoutMs === "number") {
      p.timeoutMs = entry.timeoutMs;
    }

    // Headers
    const mergedHeaders = {
      ...(entry.headers || {}),
      ...(entry.extraHeaders || {}),
    };
    if (Object.keys(mergedHeaders).length > 0) {
      p.headers = mergedHeaders;
    }

    // OAuth
    if (entry.oauth) {
      if (entry.oauth.clientIdEnv) {
        p.clientId = process.env[entry.oauth.clientIdEnv] || entry.oauth.clientIdDefault;
      }
      if (entry.oauth.clientSecretEnv) {
        p.clientSecret =
          process.env[entry.oauth.clientSecretEnv] || entry.oauth.clientSecretDefault;
      }
      if (entry.oauth.tokenUrl) p.tokenUrl = entry.oauth.tokenUrl;
      if (entry.oauth.refreshUrl) p.refreshUrl = entry.oauth.refreshUrl;
      if (entry.oauth.authUrl) p.authUrl = entry.oauth.authUrl;
    }

    // Cursor-specific
    if (entry.chatPath) p.chatPath = entry.chatPath;
    if (entry.clientVersion) p.clientVersion = entry.clientVersion;

    providers[id] = p;
  }
  return providers;
}

/** Generate PROVIDER_MODELS map (alias → model list) */
export function generateModels(): Record<string, RegistryModel[]> {
  const models: Record<string, RegistryModel[]> = {};
  for (const entry of Object.values(REGISTRY)) {
    if (entry.models && entry.models.length > 0) {
      const key = entry.alias || entry.id;
      // If alias already exists, don't overwrite (first wins)
      if (!models[key]) {
        models[key] = entry.models;
      }
    }
  }
  return models;
}

/** Generate PROVIDER_ID_TO_ALIAS map */
export function generateAliasMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const entry of Object.values(REGISTRY)) {
    map[entry.id] = entry.alias || entry.id;
  }
  return map;
}

// ── Local Provider Detection ──────────────────────────────────────────────

// Evaluated once at module load time — process restart required for env var changes.
const LOCAL_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  ...(typeof process !== "undefined" && process.env.LOCAL_HOSTNAMES
    ? process.env.LOCAL_HOSTNAMES.split(",")
        .map((h) => h.trim())
        .filter(Boolean)
    : []),
]);

/**
 * Detect if a base URL points to a local inference backend.
 * Used for shorter 404 cooldowns (model-only, not connection) and health check targets.
 *
 * Operators can extend via LOCAL_HOSTNAMES env var (comma-separated) for Docker
 * hostnames (e.g., LOCAL_HOSTNAMES=omlx,mlx-audio).
 */
export function isLocalProvider(baseUrl?: string | null): boolean {
  if (!baseUrl) return false;
  try {
    const url = new URL(baseUrl);
    const hostname = url.hostname;
    // Strictly matching 172.16.0.0/12 (Docker/local) and explicitly blocking ::1 per SSRF hardening
    return (
      LOCAL_HOSTNAMES.has(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)
    );
  } catch {
    return false;
  }
}

/** Set of provider IDs with passthroughModels enabled — 404s are model-specific, not account-level. */
let _passthroughProviderIds: Set<string> | null = null;
function ensurePassthroughProviderIds(): Set<string> {
  if (_passthroughProviderIds) return _passthroughProviderIds;
  try {
    const ids = new Set<string>();
    for (const entry of Object.values(REGISTRY)) {
      if (entry.passthroughModels) ids.add(entry.id);
    }
    _passthroughProviderIds = ids;
  } catch {
    _passthroughProviderIds = new Set<string>();
  }
  return _passthroughProviderIds;
}
export function getPassthroughProviders(): Set<string> {
  return ensurePassthroughProviderIds();
}

// ── Registry Lookup Helpers ───────────────────────────────────────────────

const _byAlias = new Map<string, RegistryEntry>();
let _byAliasPopulated = false;
function ensureByAliasPopulated(): void {
  if (_byAliasPopulated) return;
  _byAliasPopulated = true;
  for (const entry of Object.values(REGISTRY)) {
    if (entry.alias && entry.alias !== entry.id) {
      _byAlias.set(entry.alias, entry);
    }
  }
}
/** Get registry entry by provider ID or alias */
export function getRegistryEntry(provider: string): RegistryEntry | null {
  ensureByAliasPopulated();
  return REGISTRY[provider] || _byAlias.get(provider) || null;
}

/** Get all registered provider IDs */
export function getRegisteredProviders(): string[] {
  return Object.keys(REGISTRY);
}

// Precomputed map: modelId → unsupportedParams (O(1) lookup instead of O(N×M) scan).
// Built once at module load from all registry entries.
const _unsupportedParamsMap = new Map<string, readonly string[]>();
let _unsupportedParamsPopulated = false;
function ensureUnsupportedParamsPopulated(): void {
  if (_unsupportedParamsPopulated) return;
  _unsupportedParamsPopulated = true;
  for (const entry of Object.values(REGISTRY)) {
    // Some entries (e.g. the `mimocode` proxy) legitimately have no model catalogue.
    for (const model of entry.models ?? []) {
      if (model.unsupportedParams && !_unsupportedParamsMap.has(model.id)) {
        _unsupportedParamsMap.set(model.id, model.unsupportedParams);
      }
    }
  }
}

/**
 * Get unsupported parameters for a specific model.
 * Uses O(1) precomputed lookup. Also handles prefixed model IDs
 * (e.g., "openai/o3" → strips prefix and looks up "o3").
 * Returns empty array if no restrictions are defined.
 */
export function getUnsupportedParams(provider: string, modelId: string): readonly string[] {
  ensureUnsupportedParamsPopulated();
  // 1. Check current provider's registry (exact match)
  const entry = getRegistryEntry(provider);
  const modelEntry = entry?.models?.find((m) => m.id === modelId);
  if (modelEntry?.unsupportedParams) return modelEntry.unsupportedParams;

  // 2. O(1) lookup in precomputed map (handles cross-provider routing)
  const cached = _unsupportedParamsMap.get(modelId);
  if (cached) return cached;

  // 3. Handle prefixed model IDs (e.g., "openai/o3" → "o3")
  if (modelId.includes("/")) {
    const bareId = modelId.split("/").pop() || "";
    const bare = _unsupportedParamsMap.get(bareId);
    if (bare) return bare;
  }

  return [];
}

/**
 * Get provider category: "oauth" or "apikey"
 * Used by the resilience layer to apply different cooldown/backoff profiles.
 * @param {string} provider - Provider ID or alias
 * @returns {"oauth"|"apikey"}
 */
export function getProviderCategory(provider: string): "oauth" | "apikey" {
  const entry = getRegistryEntry(provider);
  if (!entry) return "apikey"; // Safe default for unknown providers
  return entry.authType === "apikey" ? "apikey" : "oauth";
}

/**
 * Derive the latest opus/sonnet/haiku model IDs from the `claude` registry entry.
 * Picks the first model whose ID matches each family pattern — registry order
 * determines precedence, so newer models should be listed first.
 */
export function getClaudeCodeDefaultModels(): {
  opus: string;
  sonnet: string;
  haiku: string;
} {
  const models = REGISTRY.claude?.models ?? [];
  const find = (pattern: RegExp) => models.find((m) => pattern.test(m.id))?.id ?? "";
  return {
    opus: find(/opus/i),
    sonnet: find(/sonnet/i),
    haiku: find(/haiku/i),
  };
}
