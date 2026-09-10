// Re-export service kinds from leaf module (avoids circular dep with providerSchema)
export type { ServiceKind } from "./serviceKinds";
export type RiskNoticeVariant = "oauth" | "webCookie" | "deprecated" | "embedded-service";

import { NOAUTH_PROVIDERS } from "./providers/noauth";
export { supportsNoAuthProviderProxy } from "./providers/noauth";
import { OAUTH_PROVIDERS } from "./providers/oauth";
import { WEB_COOKIE_PROVIDERS, resolveWebProviderHost } from "./providers/web-cookie";
export { resolveWebProviderHost };
import { APIKEY_PROVIDERS } from "./providers/apikey";
import { LOCAL_PROVIDERS } from "./providers/local";
import { SEARCH_PROVIDERS } from "./providers/search";
import { AUDIO_ONLY_PROVIDERS } from "./providers/audio";
import { UPSTREAM_PROXY_PROVIDERS } from "./providers/upstream-proxy";
import { CLOUD_AGENT_PROVIDERS } from "./providers/cloud-agent";
import { SYSTEM_PROVIDERS } from "./providers/system";
import { validateProviders } from "../validation/providerSchema";

export const FREE_PROVIDERS = {};

// No-auth Providers

export const FREE_APIKEY_PROVIDER_IDS = new Set([
  "qoder",
  "opencode",
  "dahl",
  // auggie is a fully local, credential-less CLI passthrough (auth handled by
  // `auggie login` outside OmniRoute). Admitted here purely so POST /api/providers
  // accepts an optional connection row for display/priority/testStatus tracking —
  // no apiKey is ever required or sent upstream.
  "auggie",
  // zcode is a local app-server backend; auth stays in the ZCode profile.
  "zcode",
  // AI Horde works anonymously (`0000000000`) and also accepts a free registered
  // key for higher queue priority. The no-auth page still enables the provider;
  // this flag admits an optional apikey connection so that stored key is used.
  "aihorde",
]);

export function supportsApiKeyOnFreeProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && FREE_APIKEY_PROVIDER_IDS.has(providerId);
}

// Providers presented as one dashboard card with OAuth as the primary action
// and a direct API-key alternative. Keep these out of FREE_APIKEY_PROVIDER_IDS.
const DUAL_AUTH_PROVIDER_IDS = new Set(["clinepass", "codebuddy-cn", "xai"]);

export function supportsDualAuthProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && DUAL_AUTH_PROVIDER_IDS.has(providerId);
}

/**
 * Backend provider IDs that are managed from one dashboard provider family.
 *
 * Family members intentionally remain distinct in the registry and database:
 * the xAI OAuth ID has different token-refresh and quota semantics from the
 * API-key ID. Consumers that need to list or test every connection for a
 * family should use getProviderConnectionFamilyIds() rather than duplicating
 * this compatibility map.
 */
export const PROVIDER_CONNECTION_FAMILY_ALIASES: Readonly<Record<string, readonly string[]>> = {
  alibaba: ["alibaba-cn"],
  "kimi-coding": ["kimi-coding-apikey"],
  xai: ["xai-oauth", "xao"],
  // magnific is the canonical (post-rebrand) slug; freepik stays a legacy
  // alias so old URLs and pre-migration connection rows keep working.
  magnific: ["freepik"],
  freepik: ["magnific"],
};

export function getProviderConnectionFamilyIds(providerId: unknown): readonly string[] {
  if (typeof providerId !== "string" || providerId.length === 0) return [];
  return [providerId, ...(PROVIDER_CONNECTION_FAMILY_ALIASES[providerId] || [])];
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
  "segmind",
  "magnific",
  "deepai",
]);

export const AGGREGATOR_PROVIDER_IDS = new Set([
  "openrouter",
  "synthetic",
  "kilo-gateway",
  "aimlapi",
  "novita",
  "opper",
  "piapi",
  "getgoapi",
  "laozhang",
  "vercel-ai-gateway",
  "unorouter",
  "agentrouter",
  "thebai",
  "fenayai",
  "empower",
  "poe",
  "chutes",
  "freetheai",
  "g4f-groq",
  "g4f-gemini",
  "g4f-pollinations",
  "g4f-ollama",
  "g4f-nvidia",
  "naga-ac",
  "chatanywhere",
  "zylo-api",
  "fastrouter",
  "anyapi",
  "electronhub",
  "llmgateway",
  "llm-kiwi",
  "literouter",
  "mnn-ai",
  "meganova-ai",
  "mixlayer",
  "speka",
  "tokenreply",
  "yolo-auto",
  "dxnt",
  "cloudcode-one",
  "ofoxai",
  "zerolimitai",
  "helyxai",
  "auriko",
  "poixe-ai",
  "naga-ai",
  "chat-oripe",
  "freeinference",
  "free-ai",
  "void-ai",
  "helixmind",
  "tabitoken",
  "logfare",
  "seekai",
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
  "agnes",
  "runwayml",
  "veoaifree-web",
  "pollinations",
  "minimax",
  "together",
  "replicate",
  "haiper",
  "leonardo",
  "segmind",
  "novita",
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
  "mlx-gemma",
  "mlx-qwen",
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

// Providers with heterogeneous/no-key auth that don't fit the NOAUTH_PROVIDERS
// registry (e.g. free-tier gateways where a key is accepted but not required).
// Kept as a Set (not an || chain) to keep providerAllowsOptionalApiKey's
// cyclomatic complexity flat as this list grows — see g4f.space (#6650).
const EXPLICIT_OPTIONAL_APIKEY_PROVIDER_IDS = new Set([
  "searxng-search",
  "firecrawl",
  "copilot-web",
  "g4f-groq",
  "g4f-gemini",
  "g4f-pollinations",
  "g4f-ollama",
  "g4f-nvidia",
  "huggingchat",
  "gitlawb",
  "gitlawb-gmi",
  "naga-ac",
  // UC (uncensored.com) persona: un-metered subscription chat with NO API key —
  // auth is a durable Clerk credential stored in providerSpecificData, from which
  // the executor mints a short-lived session token per connect.
  "uc",
]);

export function providerAllowsOptionalApiKey(providerId: unknown): boolean {
  return (
    // ponytail: any noAuth provider auto-qualifies — no per-provider maintenance
    (typeof providerId === "string" && providerId in NOAUTH_PROVIDERS) ||
    (typeof providerId === "string" && EXPLICIT_OPTIONAL_APIKEY_PROVIDER_IDS.has(providerId)) ||
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
  "mlx-gemma",
  "mlx-qwen",
  "ollama-local",
  "grok-web",
  "perplexity-web",
  "blackbox-web",
  "muse-spark-web",
  "deepseek-web",
  "chatgpt-web",
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

let _validated = false;

function ensureProvidersValidated() {
  if (_validated) return;
  validateProviders(NOAUTH_PROVIDERS, "NOAUTH_PROVIDERS");
  validateProviders(OAUTH_PROVIDERS, "OAUTH_PROVIDERS");
  validateProviders(APIKEY_PROVIDERS, "APIKEY_PROVIDERS");
  validateProviders(WEB_COOKIE_PROVIDERS, "WEB_COOKIE_PROVIDERS");
  validateProviders(LOCAL_PROVIDERS, "LOCAL_PROVIDERS");
  validateProviders(SEARCH_PROVIDERS, "SEARCH_PROVIDERS");
  validateProviders(AUDIO_ONLY_PROVIDERS, "AUDIO_ONLY_PROVIDERS");
  validateProviders(UPSTREAM_PROXY_PROVIDERS, "UPSTREAM_PROXY_PROVIDERS");
  validateProviders(CLOUD_AGENT_PROVIDERS, "CLOUD_AGENT_PROVIDERS");
  _validated = true;
}

let _aiProviders: Record<string, any> | null = null;

function getOrCreateAiProviders(): Record<string, any> {
  if (!_aiProviders) {
    ensureProvidersValidated();
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

export { USAGE_SUPPORTED_PROVIDERS } from "@omniroute/open-sse/services/usage/supportedProviders.ts";

// ── Zod validation, lazily on first AI_PROVIDERS access (perf: skips the walk
// for processes that never touch AI_PROVIDERS, e.g. short-lived CLI commands) ──

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
