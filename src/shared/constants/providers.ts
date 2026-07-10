// Re-export service kinds from leaf module (avoids circular dep with providerSchema)
export type { ServiceKind } from "./serviceKinds";
export { SERVICE_KIND_VALUES } from "./serviceKinds";

export type RiskNoticeVariant = "oauth" | "webCookie" | "deprecated" | "embedded-service";

export interface ProviderRiskNoticeFields {
  subscriptionRisk?: boolean;
  riskNoticeVariant?: RiskNoticeVariant;
  isEmbeddedService?: boolean;
}

import { NOAUTH_PROVIDERS } from "./providers/noauth";
import { OAUTH_PROVIDERS } from "./providers/oauth";
import { WEB_COOKIE_PROVIDERS, resolveWebProviderHost } from "./providers/web-cookie";
export { resolveWebProviderHost };
export type { WebProviderHostLink } from "./providers/web-cookie";
import { APIKEY_PROVIDERS } from "./providers/apikey";
import { LOCAL_PROVIDERS } from "./providers/local";
import { SEARCH_PROVIDERS } from "./providers/search";
import { AUDIO_ONLY_PROVIDERS } from "./providers/audio";
import { UPSTREAM_PROXY_PROVIDERS } from "./providers/upstream-proxy";
import { CLOUD_AGENT_PROVIDERS } from "./providers/cloud-agent";
import { SYSTEM_PROVIDERS } from "./providers/system";

export const FREE_PROVIDERS = {};

// No-auth Providers

export const FREE_APIKEY_PROVIDER_IDS = new Set([
  "qoder",
  "mimocode",
  "opencode",
  // codebuddy-cn is OAuth-primary but the Tencent gateway also accepts a direct
  // API key (Authorization: Bearer). Admit it through the same managed-provider
  // gate so POST /api/providers accepts the dual-auth shape.
  "codebuddy-cn",
  // auggie is a fully local, credential-less CLI passthrough (auth handled by
  // `auggie login` outside OmniRoute). Admitted here purely so POST /api/providers
  // accepts an optional connection row for display/priority/testStatus tracking —
  // no apiKey is ever required or sent upstream.
  "auggie",
]);

export function supportsApiKeyOnFreeProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && FREE_APIKEY_PROVIDER_IDS.has(providerId);
}

// Web / Cookie Providers

// API Key Providers

// Sub-categories within APIKEY_PROVIDERS (used by dashboard and catalog views).
export const IMAGE_ONLY_PROVIDER_IDS = new Set([
  "nanobanana",
  "fal-ai",
  "stability-ai",
  "black-forest-labs",
  "recraft",
  "topaz",
]);

export const AGGREGATOR_PROVIDER_IDS = new Set([
  "openrouter",
  "synthetic",
  "kilo-gateway",
  "aimlapi",
  "novita",
  "piapi",
  "getgoapi",
  "laozhang",
  "vercel-ai-gateway",
  "agentrouter",
  "thebai",
  "fenayai",
  "empower",
  "poe",
  "chutes",
  "hackclub",
]);

export const ENTERPRISE_CLOUD_PROVIDER_IDS = new Set([
  "azure-openai",
  "azure-ai",
  "bedrock",
  "watsonx",
  "oci",
  "sap",
  "vertex",
  "vertex-partner",
  "databricks",
  "datarobot",
  "clarifai",
  "snowflake",
  "heroku",
  "modal",
]);

export const VIDEO_PROVIDER_IDS = new Set([
  "runwayml",
  "veoaifree-web",
  "pollinations",
  "minimax",
  "together",
  "replicate",
  "haiper",
  "leonardo",
]);

// IDE Providers: editors with built-in AI subscription (separate section in UI).
// These providers live in OAUTH_PROVIDERS but render under "IDE Providers"
// instead of "OAuth Providers" to avoid visual duplication.
export const IDE_PROVIDER_IDS = new Set(["cursor", "zed", "trae"]);

export const EMBEDDING_RERANK_PROVIDER_IDS = new Set(["voyage-ai", "jina-ai"]);

// Local / Self-Hosted Providers

// Search Providers

// Audio Only Providers

export const OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";
export const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";
export const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";

export function isOpenAICompatibleProvider(providerId: unknown): providerId is string {
  return typeof providerId === "string" && providerId.startsWith(OPENAI_COMPATIBLE_PREFIX);
}

export function isAnthropicCompatibleProvider(providerId: unknown): providerId is string {
  return typeof providerId === "string" && providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX);
}

export function isClaudeCodeCompatibleProvider(providerId: unknown): providerId is string {
  return typeof providerId === "string" && providerId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
}

export function isLocalProvider(providerId: unknown): boolean {
  return (
    typeof providerId === "string" &&
    Object.prototype.hasOwnProperty.call(LOCAL_PROVIDERS, providerId)
  );
}

export const SELF_HOSTED_CHAT_PROVIDER_IDS = new Set([
  "ollama-local",
  "lm-studio",
  "vllm",
  "lemonade",
  "llamafile",
  "llama-cpp",
  "triton",
  "docker-model-runner",
  "xinference",
  "oobabooga",
]);

export function isSelfHostedChatProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && SELF_HOSTED_CHAT_PROVIDER_IDS.has(providerId);
}

export function providerAllowsOptionalApiKey(providerId: unknown): boolean {
  return (
    // ponytail: any noAuth provider auto-qualifies — no per-provider maintenance
    (typeof providerId === "string" && providerId in NOAUTH_PROVIDERS) ||
    providerId === "searxng-search" ||
    providerId === "pollinations" ||
    providerId === "copilot-web" ||
    providerId === "hackclub" ||
    providerId === "huggingchat" ||
    providerId === "gitlawb" ||
    providerId === "gitlawb-gmi" ||
    isLocalProvider(providerId) ||
    isSelfHostedChatProvider(providerId) ||
    isOpenAICompatibleProvider(providerId) ||
    isAnthropicCompatibleProvider(providerId)
  );
}

/**
 * Providers explicitly excluded from bulk API key add — auth is heterogeneous,
 * OAuth-based, multi-field, or requires manual setup per connection.
 */
const BULK_API_KEY_EXCLUDED = new Set([
  "vertex",
  "vertex-partner",
  "ollama-local",
  "grok-web",
  "perplexity-web",
  "blackbox-web",
  "muse-spark-web",
  "deepseek-web",
  "inner-ai",
  "qoder",
  "google-pse-search",
  "command-code",
  "azure",
]);

export function supportsBulkApiKey(providerId: unknown): boolean {
  if (typeof providerId !== "string" || !providerId) return false;
  if (BULK_API_KEY_EXCLUDED.has(providerId)) return false;
  if (isLocalProvider(providerId)) return false;
  if (isSelfHostedChatProvider(providerId)) return false;
  if (isClaudeCodeCompatibleProvider(providerId)) return false;
  return true;
}

// ── System Providers (virtual, not user-connectable) ──────────────────────────

const _PROVIDER_SECTIONS = [
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
] as const;

let _aiProviders: Record<string, any> | null = null;

function getOrCreateAiProviders(): Record<string, any> {
  if (!_aiProviders) {
    _aiProviders = {};
    for (const section of _PROVIDER_SECTIONS) {
      Object.assign(_aiProviders, section);
    }
  }
  return _aiProviders;
}

let _ALIAS_TO_ID: Record<string, string> | null = null;

function getOrCreateAliasToId(): Record<string, string> {
  if (!_ALIAS_TO_ID) {
    _ALIAS_TO_ID = {};
    for (const section of _PROVIDER_SECTIONS) {
      for (const p of Object.values(section)) {
        if ((p as any).alias) _ALIAS_TO_ID[(p as any).alias] = (p as any).id;
      }
    }
  }
  return _ALIAS_TO_ID;
}

let _ID_TO_ALIAS: Record<string, string> | null = null;

function getOrCreateIdToAlias(): Record<string, string> {
  if (!_ID_TO_ALIAS) {
    _ID_TO_ALIAS = {};
    for (const section of _PROVIDER_SECTIONS) {
      for (const p of Object.values(section)) {
        _ID_TO_ALIAS[(p as any).id] = (p as any).alias || (p as any).id;
      }
    }
  }
  return _ID_TO_ALIAS;
}

export function getProviderById(id: string) {
  return (
    (NOAUTH_PROVIDERS as Record<string, any>)[id] ??
    (OAUTH_PROVIDERS as Record<string, any>)[id] ??
    (APIKEY_PROVIDERS as Record<string, any>)[id] ??
    (WEB_COOKIE_PROVIDERS as Record<string, any>)[id] ??
    (LOCAL_PROVIDERS as Record<string, any>)[id] ??
    (SEARCH_PROVIDERS as Record<string, any>)[id] ??
    (AUDIO_ONLY_PROVIDERS as Record<string, any>)[id] ??
    (UPSTREAM_PROXY_PROVIDERS as Record<string, any>)[id] ??
    (CLOUD_AGENT_PROVIDERS as Record<string, any>)[id] ??
    (SYSTEM_PROVIDERS as Record<string, any>)[id] ??
    undefined
  );
}

export const AI_PROVIDERS = new Proxy({} as Record<string, any>, {
  get(_, key) {
    if (key === "then") return undefined;
    return typeof key === "string" ? getOrCreateAiProviders()[key] : undefined;
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateAiProviders());
  },
  has(_, key) {
    return key in getOrCreateAiProviders();
  },
  getOwnPropertyDescriptor(_, key) {
    const obj = getOrCreateAiProviders();
    if (typeof key === "string" && key in obj) {
      return { configurable: true, enumerable: true, value: obj[key] };
    }
    return undefined;
  },
});

export type AiProviderId =
  | keyof typeof NOAUTH_PROVIDERS
  | keyof typeof OAUTH_PROVIDERS
  | keyof typeof APIKEY_PROVIDERS
  | keyof typeof WEB_COOKIE_PROVIDERS
  | keyof typeof LOCAL_PROVIDERS
  | keyof typeof SEARCH_PROVIDERS
  | keyof typeof AUDIO_ONLY_PROVIDERS
  | keyof typeof UPSTREAM_PROXY_PROVIDERS
  | keyof typeof CLOUD_AGENT_PROVIDERS
  | keyof typeof SYSTEM_PROVIDERS;

export type AiProviderDefinition =
  | (typeof NOAUTH_PROVIDERS)[keyof typeof NOAUTH_PROVIDERS]
  | (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS]
  | (typeof APIKEY_PROVIDERS)[keyof typeof APIKEY_PROVIDERS]
  | (typeof WEB_COOKIE_PROVIDERS)[keyof typeof WEB_COOKIE_PROVIDERS]
  | (typeof LOCAL_PROVIDERS)[keyof typeof LOCAL_PROVIDERS]
  | (typeof SEARCH_PROVIDERS)[keyof typeof SEARCH_PROVIDERS]
  | (typeof AUDIO_ONLY_PROVIDERS)[keyof typeof AUDIO_ONLY_PROVIDERS]
  | (typeof UPSTREAM_PROXY_PROVIDERS)[keyof typeof UPSTREAM_PROXY_PROVIDERS]
  | (typeof CLOUD_AGENT_PROVIDERS)[keyof typeof CLOUD_AGENT_PROVIDERS]
  | (typeof SYSTEM_PROVIDERS)[keyof typeof SYSTEM_PROVIDERS];

// Auth methods
export const AUTH_METHODS = {
  oauth: { id: "oauth", name: "OAuth", icon: "lock" },
  apikey: { id: "apikey", name: "API Key", icon: "key" },
};

export function getProviderByAlias(alias: string): AiProviderDefinition | null {
  for (const section of _PROVIDER_SECTIONS) {
    for (const provider of Object.values(section)) {
      if (provider.alias === alias || provider.id === alias) {
        return provider as AiProviderDefinition;
      }
    }
  }
  return null;
}

// Helper: Get provider ID from alias
export function resolveProviderId(aliasOrId: string): string {
  const provider = getProviderByAlias(aliasOrId);
  return provider?.id || aliasOrId;
}

export function getProviderAlias(providerId: string): string {
  const provider = getProviderById(providerId);
  return provider?.alias || providerId;
}

export const ALIAS_TO_ID = new Proxy({} as Record<string, string>, {
  get(_, key) {
    return typeof key === "string" ? getOrCreateAliasToId()[key] : undefined;
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateAliasToId());
  },
  has(_, key) {
    return key in getOrCreateAliasToId();
  },
  getOwnPropertyDescriptor(_, key) {
    const obj = getOrCreateAliasToId();
    if (typeof key === "string" && key in obj) {
      return { configurable: true, enumerable: true, value: obj[key] };
    }
    return undefined;
  },
});

export const ID_TO_ALIAS = new Proxy({} as Record<string, string>, {
  get(_, key) {
    return typeof key === "string" ? getOrCreateIdToAlias()[key] : undefined;
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateIdToAlias());
  },
  has(_, key) {
    return key in getOrCreateIdToAlias();
  },
  getOwnPropertyDescriptor(_, key) {
    const obj = getOrCreateIdToAlias();
    if (typeof key === "string" && key in obj) {
      return { configurable: true, enumerable: true, value: obj[key] };
    }
    return undefined;
  },
});

// Providers that support usage/quota API
export const USAGE_SUPPORTED_PROVIDERS = [
  "antigravity",
  "agy",
  "kiro",
  "amazon-q",
  "github",
  "codex",
  "claude",
  "cursor",
  "qoder",
  "kimi-coding",
  "kimi-coding-apikey",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "ollama-cloud",
  "minimax",
  "minimax-cn",
  "crof",
  "nanogpt",
  "deepseek",
  "xiaomi-mimo",
  "vertex",
  "vertex-partner",
  "codebuddy-cn",
];

// ── Zod validation at module load (Phase 7.2) ──

// Re-export the extracted data catalogs so external importers of providers.ts are unchanged.
export {
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  APIKEY_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
};

import { validateProviders } from "../validation/providerSchema";

validateProviders(NOAUTH_PROVIDERS, "NOAUTH_PROVIDERS");
validateProviders(OAUTH_PROVIDERS, "OAUTH_PROVIDERS");
validateProviders(APIKEY_PROVIDERS, "APIKEY_PROVIDERS");
validateProviders(WEB_COOKIE_PROVIDERS, "WEB_COOKIE_PROVIDERS");
validateProviders(LOCAL_PROVIDERS, "LOCAL_PROVIDERS");
validateProviders(SEARCH_PROVIDERS, "SEARCH_PROVIDERS");
validateProviders(AUDIO_ONLY_PROVIDERS, "AUDIO_ONLY_PROVIDERS");
validateProviders(UPSTREAM_PROXY_PROVIDERS, "UPSTREAM_PROXY_PROVIDERS");
validateProviders(CLOUD_AGENT_PROVIDERS, "CLOUD_AGENT_PROVIDERS");
