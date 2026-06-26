/**
 * Service kind — declarative tag for what a provider can do beyond basic LLM chat.
 * Affects UI filtering and playground routing; does not influence request routing.
 */
export type ServiceKind =
  | "llm"
  | "embedding"
  | "image"
  | "imageToText"
  | "tts"
  | "stt"
  | "webSearch"
  | "webFetch"
  | "video"
  | "music";

export type RiskNoticeVariant = "oauth" | "webCookie" | "deprecated" | "embedded-service";

export interface ProviderRiskNoticeFields {
  subscriptionRisk?: boolean;
  riskNoticeVariant?: RiskNoticeVariant;
  isEmbeddedService?: boolean;
}

import { NOAUTH_PROVIDERS } from "./providers/noauth";
import { OAUTH_PROVIDERS } from "./providers/oauth";
import { WEB_COOKIE_PROVIDERS } from "./providers/web-cookie";
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
]);

export function supportsApiKeyOnFreeProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && FREE_APIKEY_PROVIDER_IDS.has(providerId);
}

// OAuth Providers
export const OAUTH_PROVIDERS = {
  qoder: {
    id: "qoder",
    alias: "if",
    name: "Qoder AI",
    icon: "water_drop",
    color: "#6366F1",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    hasFree: true,
  },
  qwen: {
    id: "qwen",
    alias: "qw",
    name: "Qwen Code",
    icon: "psychology",
    color: "#10B981",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    deprecated: true,
    deprecationReason:
      "Qwen OAuth free tier was discontinued on 2026-04-15. Use 'bailian-coding-plan', 'alibaba', 'alibaba-cn', or 'openrouter' provider with API key instead.",
  },
  "gemini-cli": {
    id: "gemini-cli",
    alias: "gemini-cli",
    name: "Gemini CLI",
    icon: "terminal",
    color: "#4285F4",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    hasFree: true,
    authHint:
      "Uses Gemini CLI OAuth / Cloud Code credentials. Pro models require an eligible Google account or paid plan.",
  },
  agy: {
    id: "agy",
    alias: "agy",
    name: "Antigravity CLI",
    icon: "terminal",
    color: "#F59E0B",
    textIcon: "AGY",
    website: "https://antigravity.google",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    hasFree: true,
    authHint:
      "Import your Antigravity CLI (`agy`) login (paste/upload its token file), auto-detect a local CLI login, or sign in with Google. Shares the Antigravity backend (incl. Claude models).",
  },
  kiro: {
    id: "kiro",
    alias: "kr",
    name: "Kiro AI",
    icon: "psychology_alt",
    color: "#FF6B35",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    hasFree: true,
    freeNote:
      "Free tier: 50 credits/month (~25K–100K tokens). ⚠️ Kiro ToS prohibits third-party proxy/harness use.",
  },
  "amazon-q": {
    id: "amazon-q",
    alias: "aq",
    name: "Amazon Q",
    icon: "cloud",
    color: "#FF9900",
    textIcon: "AQ",
    website: "https://aws.amazon.com/q/developer/",
    hasFree: true,
    authHint:
      "Uses the same AWS Builder ID or imported refresh-token flow as Kiro, but keeps Amazon Q connections separate.",
  },
  claude: {
    id: "claude",
    alias: "cc",
    name: "Claude Code",
    icon: "smart_toy",
    color: "#D97757",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  antigravity: {
    id: "antigravity",
    alias: undefined,
    name: "Antigravity",
    icon: "rocket_launch",
    color: "#F59E0B",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  codex: {
    id: "codex",
    alias: "cx",
    name: "OpenAI Codex",
    icon: "code",
    color: "#3B82F6",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  github: { id: "github", alias: "gh", name: "GitHub Copilot", icon: "code", color: "#333333" },
  "gitlab-duo": {
    id: "gitlab-duo",
    alias: "gitlab-duo",
    name: "GitLab Duo",
    icon: "hub",
    color: "#FC6D26",
    textIcon: "GL",
    website: "https://docs.gitlab.com/user/duo_agent_platform/code_suggestions/",
    authHint:
      "OAuth application with ai_features + read_user scopes. Configure GITLAB_DUO_OAUTH_CLIENT_ID and optionally GITLAB_DUO_OAUTH_CLIENT_SECRET on this OmniRoute instance.",
  },
  cursor: {
    id: "cursor",
    alias: "cu",
    name: "Cursor IDE",
    icon: "edit_note",
    color: "#00D4AA",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  zed: {
    id: "zed",
    alias: "zd",
    name: "Zed IDE",
    icon: "code",
    color: "#084CCF",
    textIcon: "ZD",
    website: "https://zed.dev",
    authHint:
      "Zed stores LLM provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) in the OS keychain. Use the Import button below to discover and import them automatically.",
  },
  trae: {
    id: "trae",
    alias: "tr",
    name: "Trae",
    icon: "edit_square",
    color: "#FF7849",
    textIcon: "TR",
    website: "https://trae.ai",
    authHint:
      "Trae is an AI-native IDE by ByteDance (SOLO remote agent). Authorize via trae.ai in the popup, or sign in at solo.trae.ai and paste the Cloud-IDE-JWT (sent as 'Authorization: Cloud-IDE-JWT <token>', ~14-day lifetime) as the access token; web_id/biz_user_id/user_unique_id/scope/tenant/region propagate via providerSpecificData. No headless refresh for pasted tokens — re-paste on expiry.",
  },
  "kimi-coding": {
    id: "kimi-coding",
    alias: "kmc",
    name: "Kimi Coding",
    icon: "psychology",
    color: "#1E40AF",
    textIcon: "KC",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  kilocode: {
    id: "kilocode",
    alias: "kc",
    name: "Kilo Code",
    icon: "code",
    color: "#FF6B35",
    textIcon: "KC",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  cline: {
    id: "cline",
    alias: "cl",
    name: "Cline",
    icon: "smart_toy",
    color: "#5B9BD5",
    textIcon: "CL",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  windsurf: {
    id: "windsurf",
    alias: "ws",
    name: "Windsurf (Devin CLI)",
    icon: "air",
    color: "#00C5A0",
    textIcon: "WS",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    authHint:
      'In the Windsurf / VS Code IDE, open the command palette and run `Windsurf: Provide Auth Token` (or click the Jupyter "Get Windsurf Authentication Token" button), then copy the shown token and paste it here. Note: opening windsurf.com/show-auth-token directly only renders a "Redirecting" page — the IDE must initiate the flow (it adds a `?state=...` param) for the token to appear.',
    website: "https://windsurf.com",
  },
  "devin-cli": {
    id: "devin-cli",
    alias: "dv",
    name: "Devin CLI (Official)",
    icon: "terminal",
    color: "#6366F1",
    textIcon: "DV",
    authHint:
      "Requires the Devin CLI binary. Run `devin auth login` to authenticate, or provide your WINDSURF_API_KEY. Install: https://cli.devin.ai",
    website: "https://cli.devin.ai",
  },
  "grok-cli": {
    id: "grok-cli",
    alias: "gc",
    name: "Grok Build",
    icon: "smart_toy",
    color: "#1DA1F2",
    textIcon: "GB",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    authHint: "OAuth authentication via auth.x.ai for Grok Build access.",
  },
};


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
  "glhf",
  "cablyai",
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
  "cloudflare-ai",
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
  "gemini-cli",
  "kiro",
  "amazon-q",
  "github",
  "codex",
  "claude",
  "cursor",
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
