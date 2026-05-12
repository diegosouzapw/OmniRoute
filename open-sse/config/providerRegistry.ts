/**
 * Provider Registry — Single source of truth for all provider configuration.
 *
 * Adding a new provider? Just add an entry here. Everything else
 * (PROVIDERS, PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS, executor lookup)
 * is auto-generated from this registry.
 */

import { ANTIGRAVITY_BASE_URLS } from "./antigravityUpstream.ts";
import { ANTIGRAVITY_PUBLIC_MODELS } from "./antigravityModelAliases.ts";
import {
  ANTHROPIC_BETA_API_KEY,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
  ANTHROPIC_VERSION_HEADER,
  CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
  CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
  CLAUDE_CLI_USER_AGENT,
} from "./anthropicHeaders.ts";
import { getCodexDefaultHeaders } from "./codexClient.ts";
import {
  GLM_REQUEST_DEFAULTS,
  GLMT_REQUEST_DEFAULTS,
  GLM_TIMEOUT_MS,
  GLMT_TIMEOUT_MS,
  GLM_SHARED_MODELS,
} from "./glmProvider.ts";
import { MARITALK_DEFAULT_BASE_URL } from "./maritalk.ts";
import {
  CURSOR_REGISTRY_VERSION,
  getAntigravityProviderHeaders,
  getCursorRegistryHeaders,
  getGitHubCopilotChatHeaders,
  getKiroServiceHeaders,
  getQoderDefaultHeaders,
  getQwenOauthHeaders,
  getRuntimePlatform,
  getRuntimeArch,
} from "./providerHeaderProfiles.ts";
import type { ProviderRequestDefaults } from "../services/providerRequestDefaults.ts";

// ── Types ─────────────────────────────────────────────────────────────────

export interface RegistryModel {
  id: string;
  name: string;
  toolCalling?: boolean;
  supportsReasoning?: boolean;
  supportsVision?: boolean;
  supportsXHighEffort?: boolean;
  maxOutputTokens?: number;
  targetFormat?: string;
  strip?: readonly string[];
  unsupportedParams?: readonly string[];
  /** Maximum context window in tokens */
  contextLength?: number;
}

// Reasoning models reject temperature, top_p, penalties, logprobs, n.
// Frozen to prevent accidental mutation (shared across all model entries).
const REASONING_UNSUPPORTED: readonly string[] = Object.freeze([
  "temperature",
  "top_p",
  "frequency_penalty",
  "presence_penalty",
  "logprobs",
  "top_logprobs",
  "n",
]);

export interface RegistryOAuth {
  clientIdEnv?: string;
  clientIdDefault?: string;
  clientSecretEnv?: string;
  clientSecretDefault?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  authUrl?: string;
  initiateUrl?: string;
  pollUrlBase?: string;
}

export interface RegistryEntry {
  id: string;
  alias?: string;
  format: string;
  executor: string;
  baseUrl?: string;
  baseUrls?: string[];
  /** Override base URL used only for API key validation (e.g., opencode-go validates on zen/v1) */
  testKeyBaseUrl?: string;
  responsesBaseUrl?: string;
  urlSuffix?: string;
  urlBuilder?: (base: string, model: string, stream: boolean) => string;
  authType: string;
  authHeader: string;
  authPrefix?: string;
  headers?: Record<string, string>;
  extraHeaders?: Record<string, string>;
  requestDefaults?: ProviderRequestDefaults;
  oauth?: RegistryOAuth;
  models: RegistryModel[];
  modelsUrl?: string;
  chatPath?: string;
  clientVersion?: string;
  timeoutMs?: number;
  passthroughModels?: boolean;
  /** Default context window for all models in this provider (can be overridden per-model) */
  defaultContextLength?: number;
}

interface LegacyProvider {
  format: string;
  baseUrl?: string;
  baseUrls?: string[];
  responsesBaseUrl?: string;
  headers?: Record<string, string>;
  requestDefaults?: ProviderRequestDefaults;
  clientId?: string;
  clientSecret?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  authUrl?: string;
  chatPath?: string;
  clientVersion?: string;
  timeoutMs?: number;
}

const KIMI_CODING_SHARED = {
  format: "claude",
  executor: "default",
  baseUrl: "https://api.kimi.com/coding/v1/messages",
  authHeader: "x-api-key",
  // Kimi K2.6 native context per Moonshot platform docs and cross-provider
  // catalog (openrouter, moonshot, ali, deepinfra, etc. all advertise 262144).
  // Without this, contextManager.ts:getTokenLimit falls back to
  // DEFAULT_LIMITS.default = 128000 because the Kimi Code OAuth product is
  // not synced via models.dev. The under-reported value cascades into
  // /v1/models advertised context_length=128000 and downstream client
  // assumptions about prompt budget (e.g. Capy computing
  // prompt_cap = context_length - request.max_tokens).
  defaultContextLength: 262144,
  headers: {
    "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
  },
  models: [
    { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 262144, maxOutputTokens: 262144 },
    {
      id: "kimi-k2.6-thinking",
      name: "Kimi K2.6 Thinking",
      contextLength: 262144,
      maxOutputTokens: 262144,
    },
  ] as RegistryModel[],
} as const;

const buildModels = (ids: readonly string[]): RegistryModel[] =>
  ids.map((id) => ({ id, name: id }));

const GPT_5_5_CONTEXT_LENGTH = 1050000;
const GPT_5_5_CODEX_CAPABILITIES = {
  targetFormat: "openai-responses",
  toolCalling: true,
  supportsReasoning: true,
  supportsVision: true,
  supportsXHighEffort: true,
  contextLength: GPT_5_5_CONTEXT_LENGTH,
} as const;

const CHAT_OPENAI_COMPAT_MODELS: Record<string, RegistryModel[]> = {
  deepinfra: buildModels([
    "anthropic/claude-4-opus",
    "anthropic/claude-4-sonnet",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "google/gemma-4-31B-it",
    "google/gemma-4-26B-A4B-it",
    "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B",
    "nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning",
    "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
    "meta-llama/Llama-4-Scout-17B-16E-Instruct",
    "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    "NousResearch/Hermes-3-Llama-3.1-405B",
    "deepseek-ai/DeepSeek-V4-Pro",
    "deepseek-ai/DeepSeek-V4-Flash",
    "zai-org/GLM-5.1",
    "moonshotai/Kimi-K2.6",
    "MiniMaxAI/MiniMax-M2.5",
    "Qwen/Qwen3.6-35B-A3B",
    "Qwen/Qwen3.5-397B-A17B",
    "Qwen/Qwen3.5-122B-A10B",
    "XiaomiMiMo/MiMo-V2.5-Pro",
    "XiaomiMiMo/MiMo-V2.5",
  ]),
  "vercel-ai-gateway": buildModels([
    "openai/gpt-4.1",
    "anthropic/claude-4-sonnet",
    "google/gemini-2.5-pro",
    "moonshotai/kimi-k2",
    "vercel/v0-1.5-md",
  ]),
  "lambda-ai": buildModels([
    "deepseek-r1-671b",
    "llama3.3-70b-instruct-fp8",
    "qwen25-coder-32b-instruct",
  ]),
  sambanova: buildModels([
    "MiniMax-M2.7",
    "DeepSeek-V3.2",
    "Llama-4-Maverick-17B-128E-Instruct",
    "Meta-Llama-3.3-70B-Instruct",
    "gpt-oss-120b",
  ]),
  nscale: buildModels([
    "moonshotai/Kimi-K2.5",
    "Qwen/Qwen3-235B-A22B-Instruct-2507",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "meta-llama/Llama-4-Scout-17B-16E-Instruct",
    "meta-llama/Llama-3.3-70B-Instruct",
  ]),
  ovhcloud: buildModels([
    "Meta-Llama-3_3-70B-Instruct",
    "Qwen2.5-Coder-32B-Instruct",
    "Mistral-Small-3.2-24B-Instruct-2506",
  ]),
  baseten: buildModels([
    "moonshotai/Kimi-K2.6",
    "deepseek-ai/DeepSeek-V4-Pro",
    "zai-org/GLM-5",
    "MiniMaxAI/MiniMax-M2.5",
    "nvidia/Nemotron-120B-A12B",
    "openai/gpt-oss-120b",
  ]),
  publicai: buildModels([
    "swiss-ai/apertus-70b-instruct",
    "aisingapore/Qwen-SEA-LION-v4-32B-IT",
    "allenai/Olmo-3-32B-Think",
  ]),
  moonshot: buildModels(["kimi-k2.6", "kimi-k2.5"]),
  "meta-llama": buildModels([
    "Llama-4-Maverick-17B-128E-Instruct-FP8",
    "Llama-4-Scout-17B-16E-Instruct-FP8",
    "Llama-3.3-70B-Instruct",
  ]),
  "v0-vercel": buildModels(["v0-1.0-md", "v0-1.5-lg", "v0-1.5-md"]),
  morph: buildModels(["morph-v3-large", "morph-v3-fast"]),
  "featherless-ai": buildModels(["featherless-ai/Qwerky-72B", "featherless-ai/Qwerky-QwQ-32B"]),
  friendliai: buildModels(["meta-llama-3.1-70b-instruct", "meta-llama-3.1-8b-instruct"]),
  llamagate: buildModels(["qwen2.5-coder-7b", "deepseek-coder-6.7b", "qwen3-vl-8b"]),
  heroku: buildModels([
    "claude-opus-4-7",
    "claude-4-6-sonnet",
    "claude-4-5-haiku",
    "glm-4-7",
    "kimi-k2-5",
    "minimax-m2-1",
    "deepseek-v3-2",
    "qwen3-coder-480b",
    "qwen3-235b",
    "gpt-oss-120b",
    "nova-pro",
    "nova-2-lite",
  ]),
  galadriel: buildModels(["galadriel-latest"]),
  databricks: buildModels([
    "databricks-gpt-5",
    "databricks-meta-llama-3-3-70b-instruct",
    "databricks-claude-sonnet-4",
    "databricks-gemini-2-5-pro",
  ]),
  snowflake: buildModels(["llama3.1-70b", "llama3.3-70b", "deepseek-r1", "claude-3-5-sonnet"]),
  wandb: buildModels([
    "openai/gpt-oss-120b",
    "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    "deepseek-ai/DeepSeek-V3.1",
  ]),
  volcengine: buildModels([
    "deepseek-v3-2-251201",
    "doubao-seed-2-0-code-preview-260215",
    "kimi-k2-thinking-251104",
    "glm-4-7-251222",
  ]),
  ai21: buildModels(["jamba-large-1.7", "jamba-mini-2"]),
  gigachat: buildModels(["GigaChat-2-Max", "GigaChat-2-Pro", "GigaChat-2-Lite"]),
  venice: buildModels(["venice-latest"]),
  codestral: buildModels(["codestral-2405", "codestral-latest"]),
  upstage: buildModels(["solar-pro3", "solar-mini"]),
  maritalk: buildModels(["sabia-4", "sabia-3.1", "sabiazinho-4", "sabiazinho-3"]),
  "xiaomi-mimo": [
    { id: "mimo-v2.5-pro", name: "MiMo-V2.5-Pro", contextLength: 1048576, maxOutputTokens: 131072 },
    { id: "mimo-v2.5", name: "MiMo-V2.5", contextLength: 1048576, maxOutputTokens: 131072 },
    { id: "mimo-v2-omni", name: "MiMo-V2-Omni", contextLength: 262144, maxOutputTokens: 131072 },
    { id: "mimo-v2-flash", name: "MiMo-V2-Flash", contextLength: 262144, maxOutputTokens: 65536 },
  ],
  "inference-net": buildModels([
    "meta-llama/Llama-3.3-70B-Instruct",
    "deepseek-ai/DeepSeek-R1",
    "Qwen/Qwen2.5-72B-Instruct",
  ]),
  nanogpt: buildModels(["chatgpt-4o-latest", "claude-3.5-sonnet", "gpt-4o-mini"]),
  predibase: buildModels(["llama-3.3-70b"]),
  bytez: buildModels([
    "meta-llama/Llama-3.3-70B-Instruct",
    "mistralai/Mistral-7B-Instruct-v0.3",
    "Qwen/Qwen2.5-72B-Instruct",
  ]),
};

function mapStainlessOs() {
  switch (getRuntimePlatform()) {
    case "darwin":
      return "MacOS";
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return `Other::${getRuntimePlatform()}`;
  }
}

function mapStainlessArch() {
  switch (getRuntimeArch()) {
    case "x64":
      return "x64";
    case "arm64":
      return "arm64";
    case "ia32":
      return "x86";
    default:
      return `other::${getRuntimeArch()}`;
  }
}

// ── Registry ──────────────────────────────────────────────────────────────

export const REGISTRY: Record<string, RegistryEntry> = {
  // ─── OAuth Providers ───────────────────────────────────────────────────
  kie: {
    id: "kie",
    alias: "kie",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.kie.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 128000,
    models: [
      { id: "claude-opus-4-7", name: "Claude 4.7 Opus" },
      { id: "claude-sonnet-4-6", name: "Claude 4.6 Sonnet" },
      { id: "claude-haiku-4-5", name: "Claude 4.5 Haiku" },
      { id: "gpt-5-5", name: "GPT 5.5" },
      { id: "gpt-5-4", name: "GPT 5.4" },
      { id: "gpt-5-2", name: "GPT 5.2" },
      { id: "gemini-3-1-pro", name: "Gemini 3.1 Pro" },
      { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-3-flash", name: "Gemini 3 Flash" },
    ],
  },
  claude: {
    id: "claude",
    alias: "cc",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.anthropic.com/v1/messages",
    urlSuffix: "?beta=true",
    authType: "oauth",
    authHeader: "x-api-key",
    defaultContextLength: 200000,
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
      "Anthropic-Beta": ANTHROPIC_BETA_CLAUDE_OAUTH,
      "Anthropic-Dangerous-Direct-Browser-Access": "true",
      "User-Agent": CLAUDE_CLI_USER_AGENT,
      "X-App": "cli",
      "X-Stainless-Helper-Method": "stream",
      "X-Stainless-Retry-Count": "0",
      "X-Stainless-Runtime-Version": CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
      "X-Stainless-Package-Version": CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
      "X-Stainless-Runtime": "node",
      "X-Stainless-Lang": "js",
      "X-Stainless-Arch": mapStainlessArch(),
      "X-Stainless-Os": mapStainlessOs(),
      "X-Stainless-Timeout": "600",
    },
    oauth: {
      clientIdEnv: "CLAUDE_OAUTH_CLIENT_ID",
      clientIdDefault: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
      tokenUrl: "https://console.anthropic.com/v1/oauth/token",
    },
    models: [
      {
        id: "claude-opus-4-7",
        name: "Claude Opus 4.7",
        supportsXHighEffort: true,
        contextLength: 1000000,
        maxOutputTokens: 128000,
      },
      {
        id: "claude-opus-4-6",
        name: "Claude Opus 4.6",
        supportsXHighEffort: false,
        contextLength: 1000000,
        maxOutputTokens: 128000,
      },
      {
        id: "claude-opus-4-5-20251101",
        name: "Claude Opus 4.5",
        supportsXHighEffort: false,
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-sonnet-4-6",
        name: "Claude 4.6 Sonnet",
        supportsXHighEffort: false,
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-sonnet-4-5-20250929",
        name: "Claude 4.5 Sonnet",
        supportsXHighEffort: false,
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-haiku-4-5-20251001",
        name: "Claude 4.5 Haiku",
        supportsXHighEffort: false,
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
    ],
  },

  gemini: {
    id: "gemini",
    alias: "gemini",
    format: "gemini",
    executor: "default",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
    urlBuilder: (base, model, stream) => {
      const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
      return `${base}/${model}:${action}`;
    },
    authType: "apikey",
    authHeader: "x-goog-api-key",
    defaultContextLength: 1048576,
    oauth: {
      clientIdEnv: "GEMINI_OAUTH_CLIENT_ID",
      clientIdDefault: "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
      clientSecretEnv: "GEMINI_OAUTH_CLIENT_SECRET",
      clientSecretDefault: "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",
    },
    models: [],
    // Models are populated from Google's API via sync-models (per API key).
    // No hardcoded fallback — show nothing until a key is added.
  },

  "gemini-cli": {
    id: "gemini-cli",
    alias: "gemini-cli",
    format: "gemini-cli",
    executor: "gemini-cli",
    baseUrl: "https://cloudcode-pa.googleapis.com/v1internal",
    urlBuilder: (base, model, stream) => {
      const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
      return `${base}:${action}`;
    },
    authType: "oauth",
    authHeader: "bearer",
    defaultContextLength: 1048576,
    oauth: {
      clientIdEnv: "GEMINI_CLI_OAUTH_CLIENT_ID",
      clientIdDefault: "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
      clientSecretEnv: "GEMINI_CLI_OAUTH_CLIENT_SECRET",
      clientSecretDefault: "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",
    },
    models: [
      { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
      { id: "gemini-3.1-pro-preview-customtools", name: "Gemini 3.1 Pro Preview Custom Tools" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
      { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite" },
    ],
  },

  codex: {
    id: "codex",
    alias: "cx",
    format: "openai-responses",
    executor: "codex",
    baseUrl: "https://chatgpt.com/backend-api/codex/responses",
    authType: "oauth",
    authHeader: "bearer",
    defaultContextLength: 400000,
    headers: getCodexDefaultHeaders(),
    oauth: {
      clientIdEnv: "CODEX_OAUTH_CLIENT_ID",
      clientIdDefault: "app_EMoamEEZ73f0CkXaXp7hrann",
      clientSecretEnv: "CODEX_OAUTH_CLIENT_SECRET",
      clientSecretDefault: "",
      tokenUrl: "https://auth.openai.com/oauth/token",
    },
    models: [
      // gpt-5.5 codex OAuth backend caps context at 400K (not the public-API
      // 1.05M). Public refs : openai/codex#19208, #19319, #19464 ;
      // opencode#24171. max_output_tokens is stripped server-side
      // (litellm#21193, codex#4138) so 128K is informational only.
      {
        id: "gpt-5.5",
        name: "GPT 5.5",
        ...GPT_5_5_CODEX_CAPABILITIES,
        contextLength: 400000,
        maxOutputTokens: 128000,
      },
      {
        id: "gpt-5.5-xhigh",
        name: "GPT 5.5 (xHigh)",
        ...GPT_5_5_CODEX_CAPABILITIES,
        contextLength: 400000,
        maxOutputTokens: 128000,
      },
      {
        id: "gpt-5.5-high",
        name: "GPT 5.5 (High)",
        ...GPT_5_5_CODEX_CAPABILITIES,
        contextLength: 400000,
        maxOutputTokens: 128000,
      },
      {
        id: "gpt-5.5-medium",
        name: "GPT 5.5 (Medium)",
        ...GPT_5_5_CODEX_CAPABILITIES,
        contextLength: 400000,
        maxOutputTokens: 128000,
      },
      {
        id: "gpt-5.5-low",
        name: "GPT 5.5 (Low)",
        ...GPT_5_5_CODEX_CAPABILITIES,
        contextLength: 400000,
        maxOutputTokens: 128000,
      },
      { id: "gpt-5.4", name: "GPT 5.4", targetFormat: "openai-responses" },
      { id: "gpt-5.4-mini", name: "GPT 5.4 Mini", targetFormat: "openai-responses" },
      { id: "gpt-5.3-codex-spark", name: "GPT 5.3 Codex Spark" },
      { id: "gpt-5.3-codex", name: "GPT 5.3 Codex" },
      { id: "gpt-5.2", name: "GPT 5.2" },
    ],
  },

  qwen: {
    id: "qwen",
    alias: "qw",
    format: "openai",
    executor: "default",
    baseUrl: "https://chat.qwen.ai/api/v1/services/aigc/text-generation/generation",
    authType: "oauth",
    authHeader: "bearer",
    headers: getQwenOauthHeaders(),
    oauth: {
      clientIdEnv: "QWEN_OAUTH_CLIENT_ID",
      clientIdDefault: "f0304373b74a44d2b584a3fb70ca9e56",
      tokenUrl: "https://chat.qwen.ai/api/v1/oauth2/token",
      authUrl: "https://chat.qwen.ai/api/v1/oauth2/device/code",
    },
    models: [
      { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
      { id: "qwen3-coder-flash", name: "Qwen3 Coder Flash" },
      { id: "vision-model", name: "Qwen3 Vision Model" },
      { id: "coder-model", name: "Qwen3.6 (Coder Model)" },
    ],
  },

  qoder: {
    id: "qoder",
    alias: "if",
    format: "openai",
    executor: "qoder",
    baseUrl: "https://api.qoder.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    headers: getQoderDefaultHeaders(),
    oauth: {
      clientIdEnv: "QODER_OAUTH_CLIENT_ID",
      clientSecretEnv: "QODER_OAUTH_CLIENT_SECRET",
      tokenUrl: process.env.QODER_OAUTH_TOKEN_URL || "",
      authUrl: process.env.QODER_OAUTH_AUTHORIZE_URL || "",
    },
    models: [
      { id: "qoder-rome-30ba3b", name: "Qoder ROME" },
      { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
      { id: "qwen3-max", name: "Qwen3 Max" },
      { id: "qwen3-vl-plus", name: "Qwen3 Vision Plus" },
      { id: "kimi-k2-0905", name: "Kimi K2 0905" },
      { id: "qwen3-max-preview", name: "Qwen3 Max Preview" },
      { id: "kimi-k2", name: "Kimi K2" },
      { id: "deepseek-v3.2", name: "DeepSeek-V3.2-Exp" },
      { id: "deepseek-r1", name: "DeepSeek R1" },
      { id: "deepseek-v3", name: "DeepSeek V3" },
      { id: "qwen3-32b", name: "Qwen3 32B" },
      { id: "qwen3-235b-a22b-thinking-2507", name: "Qwen3 235B A22B Thinking 2507" },
      { id: "qwen3-235b-a22b-instruct", name: "Qwen3 235B A22B Instruct" },
      { id: "qwen3-235b", name: "Qwen3 235B" },
    ],
  },

  antigravity: {
    id: "antigravity",
    alias: undefined,
    format: "antigravity",
    executor: "antigravity",
    baseUrls: [...ANTIGRAVITY_BASE_URLS],
    urlBuilder: (base, model, stream) => {
      const path = stream
        ? "/v1internal:streamGenerateContent?alt=sse"
        : "/v1internal:generateContent";
      return `${base}${path}`;
    },
    authType: "oauth",
    authHeader: "bearer",
    headers: getAntigravityProviderHeaders(),
    oauth: {
      clientIdEnv: "ANTIGRAVITY_OAUTH_CLIENT_ID",
      clientIdDefault: "1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com",
      clientSecretEnv: "ANTIGRAVITY_OAUTH_CLIENT_SECRET",
      clientSecretDefault: "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",
    },
    models: [...ANTIGRAVITY_PUBLIC_MODELS],
    passthroughModels: true,
  },

  github: {
    id: "github",
    alias: "gh",
    format: "openai",
    executor: "github",
    baseUrl: "https://api.githubcopilot.com/chat/completions",
    responsesBaseUrl: "https://api.githubcopilot.com/responses",
    authType: "oauth",
    authHeader: "bearer",
    defaultContextLength: 128000,
    headers: getGitHubCopilotChatHeaders(),
    models: [
      { id: "gpt-5-mini", name: "GPT-5 Mini", targetFormat: "openai-responses" },
      { id: "gpt-5.3-codex", name: "GPT-5.3 Codex", targetFormat: "openai-responses" },
      { id: "gpt-5.4-mini", name: "GPT-5.4 Mini", targetFormat: "openai-responses" },
      { id: "gpt-5.4", name: "GPT-5.4", targetFormat: "openai-responses" },
      { id: "gpt-5.5", name: "GPT-5.5", ...GPT_5_5_CODEX_CAPABILITIES },
      {
        id: "claude-haiku-4.5",
        name: "Claude Haiku 4.5",
        targetFormat: "openai-responses",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-sonnet-4.5",
        name: "Claude Sonnet 4.5",
        targetFormat: "openai-responses",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-sonnet-4.6",
        name: "Claude Sonnet 4.6",
        targetFormat: "openai-responses",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-opus-4-5-20251101",
        name: "Claude Opus 4.5 (Full ID)",
        targetFormat: "openai-responses",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-opus-4.6",
        name: "Claude Opus 4.6",
        targetFormat: "openai-responses",
        contextLength: 1000000,
        maxOutputTokens: 128000,
      },
      {
        id: "claude-opus-4.7",
        name: "Claude Opus 4.7",
        targetFormat: "openai-responses",
        contextLength: 1000000,
        maxOutputTokens: 128000,
      },
      { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro", targetFormat: "openai-responses" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash", targetFormat: "openai-responses" },
      { id: "oswe-vscode-prime", name: "Raptor Mini", targetFormat: "openai-responses" },
      //{ id: "?", name: "Goldeneye" },
    ],
  },

  kiro: {
    id: "kiro",
    alias: "kr",
    format: "kiro",
    executor: "kiro",
    baseUrl: "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse",
    authType: "oauth",
    authHeader: "bearer",
    defaultContextLength: 200000,
    headers: getKiroServiceHeaders(),
    oauth: {
      tokenUrl: "https://prod.us-east-1.auth.desktop.kiro.dev/refreshToken",
      authUrl: "https://prod.us-east-1.auth.desktop.kiro.dev",
    },
    models: [
      { id: "auto-kiro", name: "Auto (Kiro picks best model)" },
      {
        id: "claude-opus-4.7",
        name: "Claude Opus 4.7",
        contextLength: 1000000,
        maxOutputTokens: 128000,
      },
      {
        id: "claude-opus-4.6",
        name: "Claude Opus 4.6",
        contextLength: 1000000,
        maxOutputTokens: 128000,
      },
      {
        id: "claude-sonnet-4.6",
        name: "Claude Sonnet 4.6",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      // models for kiro free tier
      {
        id: "claude-sonnet-4.5",
        name: "Claude Sonnet 4.5",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      {
        id: "claude-haiku-4.5",
        name: "Claude Haiku 4.5",
        contextLength: 200000,
        maxOutputTokens: 64000,
      },
      { id: "deepseek-3.2", name: "DeepSeek V3.2" },
      { id: "minimax-m2.5", name: "MiniMax M2.5" },
      { id: "minimax-m2.1", name: "MiniMax M2.1" },
      { id: "glm-5", name: "GLM-5" },
      { id: "qwen3-coder-next", name: "Qwen3 Coder Next" },
    ],
  },

  cursor: {
    id: "cursor",
    alias: "cu",
    format: "cursor",
    executor: "cursor",
    baseUrl: "https://api2.cursor.sh",
    chatPath: "/aiserver.v1.ChatService/StreamUnifiedChatWithTools",
    authType: "oauth",
    authHeader: "bearer",
    defaultContextLength: 200000,
    headers: getCursorRegistryHeaders(),
    clientVersion: CURSOR_REGISTRY_VERSION,
    models: [
      { id: "auto", name: "Auto (Server Picks)" },
      { id: "composer-2-fast", name: "Composer 2 Fast" },
      { id: "composer-2", name: "Composer 2" },
      //
      { id: "gpt-5.5-none", name: "GPT 5.5 None" },
      { id: "gpt-5.5-none-fast", name: "GPT 5.5 None Fast" },
      { id: "gpt-5.5-low", name: "GPT 5.5 Low" },
      { id: "gpt-5.5-low-fast", name: "GPT 5.5 Low Fast" },
      { id: "gpt-5.5-medium", name: "GPT 5.5 Medium" },
      { id: "gpt-5.5-medium-fast", name: "GPT 5.5 Medium Fast" },
      { id: "gpt-5.5-high", name: "GPT 5.5 High" },
      { id: "gpt-5.5-high-fast", name: "GPT 5.5 High Fast" },
      { id: "gpt-5.5-extra-high", name: "GPT 5.5 Extra High" },
      { id: "gpt-5.5-extra-high-fast", name: "GPT 5.5 Extra High Fast" },
      //
      { id: "gpt-5.4-low", name: "GPT 5.4 Low" },
      { id: "gpt-5.4-low-fast", name: "GPT 5.4 Low Fast" },
      { id: "gpt-5.4-medium", name: "GPT 5.4 Medium" },
      { id: "gpt-5.4-medium-fast", name: "GPT 5.4 Medium Fast" },
      { id: "gpt-5.4-high", name: "GPT 5.4 High" },
      { id: "gpt-5.4-high-fast", name: "GPT 5.4 High Fast" },
      { id: "gpt-5.4-xhigh", name: "GPT 5.4 XHigh" },
      { id: "gpt-5.4-xhigh-fast", name: "GPT 5.4 XHigh Fast" },
      //
      { id: "gpt-5.4-mini-none", name: "GPT 5.4 Mini None" },
      { id: "gpt-5.4-mini-low", name: "GPT 5.4 Mini Low" },
      { id: "gpt-5.4-mini-medium", name: "GPT 5.4 Mini Medium" },
      { id: "gpt-5.4-mini-high", name: "GPT 5.4 Mini High" },
      { id: "gpt-5.4-mini-xhigh", name: "GPT 5.4 Mini XHigh" },
      //
      { id: "gpt-5.4-nano-none", name: "GPT 5.4 Nano None" },
      { id: "gpt-5.4-nano-low", name: "GPT 5.4 Nano Low" },
      { id: "gpt-5.4-nano-medium", name: "GPT 5.4 Nano Medium" },
      { id: "gpt-5.4-nano-high", name: "GPT 5.4 Nano High" },
      { id: "gpt-5.4-nano-xhigh", name: "GPT 5.4 Nano XHigh" },
      //
      { id: "gpt-5.3-codex-spark-preview-low", name: "GPT 5.3 Codex Spark Preview Low" },
      { id: "gpt-5.3-codex-spark-preview", name: "GPT 5.3 Codex Spark Preview" },
      { id: "gpt-5.3-codex-spark-preview-high", name: "GPT 5.3 Codex Spark Preview High" },
      { id: "gpt-5.3-codex-spark-preview-xhigh", name: "GPT 5.3 Codex Spark Preview XHigh" },
      //
      { id: "gpt-5.3-codex-low", name: "GPT 5.3 Codex Low" },
      { id: "gpt-5.3-codex-low-fast", name: "GPT 5.3 Codex Low Fast" },
      { id: "gpt-5.3-codex", name: "GPT 5.3 Codex" },
      { id: "gpt-5.3-codex-fast", name: "GPT 5.3 Codex Fast" },
      { id: "gpt-5.3-codex-high", name: "GPT 5.3 Codex High" },
      { id: "gpt-5.3-codex-high-fast", name: "GPT 5.3 Codex High Fast" },
      { id: "gpt-5.3-codex-xhigh", name: "GPT 5.3 Codex XHigh" },
      { id: "gpt-5.3-codex-xhigh-fast", name: "GPT 5.3 Codex XHigh Fast" },
      //
      { id: "gpt-5.2-low", name: "GPT 5.2 Low" },
      { id: "gpt-5.2-low-fast", name: "GPT 5.2 Low Fast" },
      { id: "gpt-5.2", name: "GPT 5.2" },
      { id: "gpt-5.2-fast", name: "GPT 5.2 Fast" },
      { id: "gpt-5.2-high", name: "GPT 5.2 High" },
      { id: "gpt-5.2-high-fast", name: "GPT 5.2 High Fast" },
      { id: "gpt-5.2-xhigh", name: "GPT 5.2 XHigh" },
      { id: "gpt-5.2-xhigh-fast", name: "GPT 5.2 XHigh Fast" },
      //
      { id: "claude-opus-4-7-low", name: "Claude Opus 4.7 Low" },
      { id: "claude-opus-4-7-medium", name: "Claude Opus 4.7 Medium" },
      { id: "claude-opus-4-7-high", name: "Claude Opus 4.7 High" },
      { id: "claude-opus-4-7-xhigh", name: "Claude Opus 4.7 XHigh" },
      { id: "claude-opus-4-7-max", name: "Claude Opus 4.7 Max" },

      { id: "claude-opus-4-7-thinking-low", name: "Claude Opus 4.7 Thinking Low" },
      { id: "claude-opus-4-7-thinking-medium", name: "Claude Opus 4.7 Thinking Medium" },
      { id: "claude-opus-4-7-thinking-high", name: "Claude Opus 4.7 Thinking High" },
      { id: "claude-opus-4-7-thinking-xhigh", name: "Claude Opus 4.7 Thinking XHigh" },
      { id: "claude-opus-4-7-thinking-max", name: "Claude Opus 4.7 Thinking Max" },
      //
      { id: "claude-4.6-opus-high", name: "Claude 4.6 Opus High" },
      { id: "claude-4.6-opus-high-thinking", name: "Claude 4.6 Opus High Thinking" },
      { id: "claude-4.6-opus-high-thinking-fast", name: "Claude 4.6 Opus High Thinking Fast" },
      { id: "claude-4.6-opus-max", name: "Claude 4.6 Opus Max" },
      { id: "claude-4.6-opus-max-thinking", name: "Claude 4.6 Opus Max Thinking" },
      { id: "claude-4.6-opus-max-thinking-fast", name: "Claude 4.6 Opus Max Thinking Fast" },
      //
      { id: "claude-4.6-sonnet-medium", name: "Claude 4.6 Sonnet Medium" },
      { id: "claude-4.6-sonnet-medium-thinking", name: "Claude 4.6 Sonnet Medium Thinking" },
      //
      { id: "claude-4.5-sonnet", name: "Claude 4.5 Sonnet" },
      { id: "claude-4.5-sonnet-thinking", name: "Claude 4.5 Sonnet Thinking" },
      //
      { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
      //
      { id: "gemini-3-flash", name: "Gemini 3 Flash" },
      //
      { id: "grok-4.3", name: "Grok 4.3" },
      //
      { id: "kimi-k2.5", name: "Kimi K2.5" },
    ],
  },

  // ─── API Key Providers ─────────────────────────────────────────────────
  openai: {
    id: "openai",
    alias: "openai",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.openai.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 128000,
    models: [
      { id: "gpt-5.5", name: "GPT-5.5" },
      { id: "gpt-5.4", name: "GPT-5.4" },
      { id: "gpt-5.4-mini", name: "GPT-5.4 Mini" },
      { id: "gpt-5.4-nano", name: "GPT-5.4 Nano" },
      { id: "gpt-4.1", name: "GPT-4.1" },
      { id: "gpt-4o", name: "GPT-4o", contextLength: 128000 },
      { id: "gpt-4o-2024-11-20", name: "GPT-4o (Nov 2024)", contextLength: 128000 },
      { id: "o3", name: "O3", unsupportedParams: REASONING_UNSUPPORTED },
    ],
  },

  anthropic: {
    id: "anthropic",
    alias: "anthropic",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.anthropic.com/v1/messages",
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "x-api-key",
    defaultContextLength: 200000,
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
      "Anthropic-Beta": ANTHROPIC_BETA_API_KEY,
    },
    models: [
      { id: "claude-opus-4.7", name: "Claude Opus 4.7" },
      { id: "claude-opus-4.6", name: "Claude Opus 4.6" },
      { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.6" },
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5" },
    ],
  },

  "opencode-go": {
    id: "opencode-go",
    alias: "opencode-go",
    format: "openai",
    executor: "opencode",
    baseUrl: "https://opencode.ai/zen/go/v1",
    // (#532) Key validation must hit the main zen endpoint (same key works for both tiers)
    testKeyBaseUrl: "https://opencode.ai/zen/v1",
    authType: "apikey",
    authHeader: "Authorization",
    authPrefix: "Bearer",
    defaultContextLength: 200000,
    models: [
      { id: "glm-5.1", name: "GLM-5.1" },
      { id: "glm-5", name: "GLM-5" },
      { id: "kimi-k2.6", name: "Kimi K2.6" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
      { id: "mimo-v2.5-pro", name: "MiMo-V2.5-Pro" },
      { id: "mimo-v2.5", name: "MiMo-V2.5" },
      { id: "minimax-m2.7", name: "MiniMax M2.7", targetFormat: "claude" },
      { id: "minimax-m2.5", name: "MiniMax M2.5", targetFormat: "claude" },
      { id: "qwen3.6-plus", name: "Qwen3.6 Plus" },
      { id: "qwen3.5-plus", name: "Qwen3.5 Plus" },
      { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
      { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
    ],
  },

  "opencode-zen": {
    id: "opencode-zen",
    alias: "opencode-zen",
    format: "openai",
    executor: "opencode",
    baseUrl: "https://opencode.ai/zen/v1",
    modelsUrl: "https://opencode.ai/zen/v1/models",
    authType: "apikey",
    authHeader: "Authorization",
    authPrefix: "Bearer",
    defaultContextLength: 200000,
    models: [
      { id: "big-pickle", name: "Big Pickle" },
      { id: "gpt-5-nano", name: "GPT 5 Nano", contextLength: 400000 },
      { id: "minimax-m2.5-free", name: "MiniMax M2.5 Free", contextLength: 204800 },
      { id: "ling-2.6-1t-free", name: "Ling 2.6 Free", contextLength: 262000 },
      {
        id: "trinity-large-preview-free",
        name: "Trinity Large Preview Free",
        contextLength: 131000,
      },
      { id: "nemotron-3-super-free", name: "Nemotron 3 Super Free", contextLength: 1000000 },
    ],
  },

  agentrouter: {
    id: "agentrouter",
    alias: "agentrouter",
    format: "claude",
    executor: "default",
    baseUrl: "https://agentrouter.org/v1/messages",
    authType: "apikey",
    authHeader: "x-api-key",
    defaultContextLength: 128000,
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
      "Anthropic-Beta": ANTHROPIC_BETA_CLAUDE_OAUTH,
      "Anthropic-Dangerous-Direct-Browser-Access": "true",
      "User-Agent": CLAUDE_CLI_USER_AGENT,
      "X-App": "cli",
      "X-Stainless-Helper-Method": "stream",
      "X-Stainless-Retry-Count": "0",
      "X-Stainless-Runtime-Version": CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
      "X-Stainless-Package-Version": CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
      "X-Stainless-Runtime": "node",
      "X-Stainless-Lang": "js",
      "X-Stainless-Arch": mapStainlessArch(),
      "X-Stainless-Os": mapStainlessOs(),
      "X-Stainless-Timeout": "600",
    },
    models: [
      { id: "claude-opus-4-6", name: "Claude 4.6 Opus" },
      { id: "claude-haiku-4-5-20251001", name: "Claude 4.5 Haiku" },
      { id: "glm-5.1", name: "GLM 5.1" },
      { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
    ],
    passthroughModels: true,
  },

  openrouter: {
    id: "openrouter",
    alias: "openrouter",
    format: "openai",
    executor: "default",
    baseUrl: "https://openrouter.ai/api/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 128000,
    headers: {
      "HTTP-Referer": "https://endpoint-proxy.local",
      "X-Title": "Endpoint Proxy",
    },
    models: [{ id: "auto", name: "Auto (Best Available)" }],
  },

  qianfan: {
    id: "qianfan",
    alias: "qianfan",
    format: "openai",
    executor: "default",
    baseUrl: "https://qianfan.baidubce.com/v2/chat/completions",
    modelsUrl: "https://qianfan.baidubce.com/v2/models",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 128000,
    models: [
      { id: "ernie-5.1", name: "ERNIE 5.1" },
      { id: "ernie-5.0-thinking-latest", name: "ERNIE 5.0 Thinking Latest" },
      { id: "ernie-x1.1", name: "ERNIE X1.1", contextLength: 64000 },
    ],
  },

  glm: {
    id: "glm",
    alias: "glm",
    format: "openai",
    executor: "glm",
    baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
    defaultContextLength: 200000,
    authType: "apikey",
    authHeader: "bearer",
    requestDefaults: GLM_REQUEST_DEFAULTS,
    timeoutMs: GLM_TIMEOUT_MS,
    models: [...GLM_SHARED_MODELS],
  },

  "glm-cn": {
    id: "glm-cn",
    alias: "glmcn",
    format: "openai",
    executor: "glm",
    baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 200000,
    requestDefaults: GLM_REQUEST_DEFAULTS,
    timeoutMs: GLM_TIMEOUT_MS,
    models: [...GLM_SHARED_MODELS],
    passthroughModels: true,
  },

  glmt: {
    id: "glmt",
    alias: "glmt",
    format: "openai",
    executor: "glm",
    baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
    defaultContextLength: 200000,
    authType: "apikey",
    authHeader: "bearer",
    requestDefaults: GLMT_REQUEST_DEFAULTS,
    timeoutMs: GLMT_TIMEOUT_MS,
    models: [...GLM_SHARED_MODELS],
  },

  "bailian-coding-plan": {
    id: "bailian-coding-plan",
    alias: "bcp",
    format: "claude",
    executor: "default",
    baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
    chatPath: "/messages",
    authType: "apikey",
    authHeader: "x-api-key",
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
    },
    models: [
      { id: "qwen3.6-plus", name: "Qwen3.6 Plus(vision)" },
      { id: "qwen3.5-plus", name: "Qwen3.5 Plus(vision)" },
      { id: "qwen3-max-2026-01-23", name: "Qwen3 Max" },
      { id: "kimi-k2.5", name: "Kimi K2.5(vision)" },
      { id: "glm-5", name: "GLM 5" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
    ],
  },

  zai: {
    id: "zai",
    alias: "zai",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "x-api-key",
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
    },
    models: [
      { id: "glm-5.1", name: "GLM 5.1" },
      { id: "glm-5", name: "GLM 5" },
      { id: "glm-5-turbo", name: "GLM 5 Turbo" },
    ],
  },

  kimi: {
    id: "kimi",
    alias: "kimi",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.moonshot.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "kimi-k2.6", name: "Kimi K2.6" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
    ],
  },

  "kimi-coding": {
    id: "kimi-coding",
    alias: "kmc",
    ...KIMI_CODING_SHARED,
    urlSuffix: "?beta=true",
    authType: "oauth",
    oauth: {
      clientIdEnv: "KIMI_CODING_OAUTH_CLIENT_ID",
      clientIdDefault: "17e5f671-d194-4dfb-9706-5516cb48c098",
      tokenUrl: "https://auth.kimi.com/api/oauth/token",
      refreshUrl: "https://auth.kimi.com/api/oauth/token",
      authUrl: "https://auth.kimi.com/api/oauth/device_authorization",
    },
  },

  "kimi-coding-apikey": {
    id: "kimi-coding-apikey",
    alias: "kmca",
    ...KIMI_CODING_SHARED,
    authType: "apikey",
  },

  kilocode: {
    id: "kilocode",
    alias: "kc",
    format: "openrouter",
    executor: "openrouter",
    baseUrl: "https://api.kilo.ai/api/openrouter/chat/completions",
    modelsUrl: "https://api.kilo.ai/api/openrouter/models",
    authType: "oauth",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    oauth: {
      initiateUrl: "https://api.kilo.ai/api/device-auth/codes",
      pollUrlBase: "https://api.kilo.ai/api/device-auth/codes",
    },
    models: [
      { id: "openrouter/free", name: "Free Models Router" },
      { id: "qwen/qwen3.6-plus", name: "Qwen3.6 Plus" },
      { id: "qwen/qwen3.5-397b-a17b", name: "Qwen3.5 397B A17B" },
      { id: "openai/gpt-5.5", name: "GPT-5.5" },
      { id: "openai/gpt-5.4-mini", name: "GPT-5.4 Mini" },
      { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7" },
      { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "anthropic/claude-haiku-4.5", name: "Claude Haiku 4.5" },
      { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
      { id: "google/gemini-3-flash-preview", name: "Gemini 3 Flash" },
      { id: "google/gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite" },
      { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
      { id: "deepseek/deepseek-v4-flash", name: "DeepSeek V4 Flash" },
      { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6" },
    ],
    passthroughModels: true,
  },

  cline: {
    id: "cline",
    alias: "cl",
    format: "openai",
    executor: "openai",
    baseUrl: "https://api.cline.bot/api/v1/chat/completions",
    authType: "oauth",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    oauth: {
      tokenUrl: "https://api.cline.bot/api/v1/auth/token",
      refreshUrl: "https://api.cline.bot/api/v1/auth/refresh",
      authUrl: "https://api.cline.bot/api/v1/auth/authorize",
    },
    extraHeaders: {
      "HTTP-Referer": "https://cline.bot",
      "X-Title": "Cline",
    },
    models: [
      { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6 (Free)" },
      { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7" },
      { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
      { id: "google/gemini-3-flash-preview", name: "Gemini 3 Flash" },
      { id: "openai/gpt-5.5", name: "GPT-5.5" },
      { id: "deepseek/deepseek-v4-flash", name: "DeepSeek V4 Flash" },
      { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    ],
    passthroughModels: true,
  },

  windsurf: {
    id: "windsurf",
    alias: "ws",
    format: "windsurf",
    executor: "windsurf",
    // gRPC-web endpoint — handled entirely inside WindsurfExecutor.
    // Model IDs are the canonical Windsurf catalog names (with dots), auto-synced
    // from the Windsurf cloud via GetCascadeModelConfigs. Source: guanxiaol/WindsurfPoolAPI.
    baseUrl: "https://server.self-serve.windsurf.com",
    authType: "oauth",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    defaultContextLength: 200000,
    // Model IDs verified against model_configs_v2.bin from Devin CLI binary (2026.5.x).
    // dot-notation = OmniRoute ID; executor MODEL_ALIAS_MAP maps it to Windsurf modelUid.
    models: [
      // ── Cognition / SWE ──────────────────────────────────────────────────
      { id: "swe-1.6-fast", name: "SWE-1.6 Fast" },
      { id: "swe-1.6", name: "SWE-1.6" },
      { id: "swe-1.5-fast", name: "SWE-1.5 Fast" },
      { id: "swe-1.5", name: "SWE-1.5" },
      { id: "swe-check", name: "SWE Check" },
      // ── Claude Opus 4.7 — effort-tiered ─────────────────────────────────
      { id: "claude-opus-4.7-max", name: "Claude Opus 4.7 Max", contextLength: 200000 },
      { id: "claude-opus-4.7-xhigh", name: "Claude Opus 4.7 XHigh", contextLength: 200000 },
      { id: "claude-opus-4.7-high", name: "Claude Opus 4.7 High", contextLength: 200000 },
      { id: "claude-opus-4.7-medium", name: "Claude Opus 4.7 Medium", contextLength: 200000 },
      { id: "claude-opus-4.7-low", name: "Claude Opus 4.7 Low", contextLength: 200000 },
      { id: "claude-opus-4.7-review", name: "Claude Opus 4.7 Review", contextLength: 200000 },
      // ── Claude Sonnet/Opus 4.6 ──────────────────────────────────────────
      {
        id: "claude-sonnet-4.6-thinking-1m",
        name: "Claude Sonnet 4.6 Thinking 1M",
        contextLength: 1000000,
      },
      { id: "claude-sonnet-4.6-1m", name: "Claude Sonnet 4.6 1M", contextLength: 1000000 },
      {
        id: "claude-sonnet-4.6-thinking",
        name: "Claude Sonnet 4.6 Thinking",
        contextLength: 200000,
      },
      { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 200000 },
      { id: "claude-opus-4.6-thinking", name: "Claude Opus 4.6 Thinking", contextLength: 200000 },
      { id: "claude-opus-4.6", name: "Claude Opus 4.6", contextLength: 200000 },
      // ── Claude 4.5 ──────────────────────────────────────────────────────
      { id: "claude-opus-4.5-thinking", name: "Claude Opus 4.5 Thinking", contextLength: 200000 },
      { id: "claude-opus-4.5", name: "Claude Opus 4.5", contextLength: 200000 },
      {
        id: "claude-sonnet-4.5-thinking",
        name: "Claude Sonnet 4.5 Thinking",
        contextLength: 200000,
      },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", contextLength: 200000 },
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", contextLength: 200000 },
      // ── Claude 4.1 / 4 ──────────────────────────────────────────────────
      { id: "claude-4.1-opus-thinking", name: "Claude 4.1 Opus Thinking", contextLength: 200000 },
      { id: "claude-4.1-opus", name: "Claude 4.1 Opus", contextLength: 200000 },
      { id: "claude-4-opus-thinking", name: "Claude 4 Opus Thinking", contextLength: 200000 },
      { id: "claude-4-opus", name: "Claude 4 Opus", contextLength: 200000 },
      { id: "claude-4-sonnet-thinking", name: "Claude 4 Sonnet Thinking", contextLength: 200000 },
      { id: "claude-4-sonnet", name: "Claude 4 Sonnet", contextLength: 200000 },
      // ── Claude 3.x ──────────────────────────────────────────────────────
      {
        id: "claude-3.7-sonnet-thinking",
        name: "Claude 3.7 Sonnet Thinking",
        contextLength: 200000,
      },
      { id: "claude-3.7-sonnet", name: "Claude 3.7 Sonnet", contextLength: 200000 },
      { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", contextLength: 200000 },
      // ── GPT-5.5 — effort-tiered (+ fast/priority variants) ──────────────
      { id: "gpt-5.5-xhigh-fast", name: "GPT-5.5 XHigh Fast", contextLength: 200000 },
      { id: "gpt-5.5-xhigh", name: "GPT-5.5 XHigh", contextLength: 200000 },
      { id: "gpt-5.5-high-fast", name: "GPT-5.5 High Fast", contextLength: 200000 },
      { id: "gpt-5.5-high", name: "GPT-5.5 High", contextLength: 200000 },
      { id: "gpt-5.5-medium-fast", name: "GPT-5.5 Medium Fast", contextLength: 200000 },
      { id: "gpt-5.5-medium", name: "GPT-5.5 Medium", contextLength: 200000 },
      { id: "gpt-5.5-low-fast", name: "GPT-5.5 Low Fast", contextLength: 200000 },
      { id: "gpt-5.5-low", name: "GPT-5.5 Low", contextLength: 200000 },
      { id: "gpt-5.5-none-fast", name: "GPT-5.5 None Fast", contextLength: 200000 },
      { id: "gpt-5.5-none", name: "GPT-5.5 None", contextLength: 200000 },
      { id: "gpt-5.5-review", name: "GPT-5.5 Review", contextLength: 200000 },
      // ── GPT-5.4 — effort-tiered (+ mini + fast variants) ────────────────
      { id: "gpt-5.4-xhigh-fast", name: "GPT-5.4 XHigh Fast", contextLength: 200000 },
      { id: "gpt-5.4-xhigh", name: "GPT-5.4 XHigh", contextLength: 200000 },
      { id: "gpt-5.4-high-fast", name: "GPT-5.4 High Fast", contextLength: 200000 },
      { id: "gpt-5.4-high", name: "GPT-5.4 High", contextLength: 200000 },
      { id: "gpt-5.4-medium-fast", name: "GPT-5.4 Medium Fast", contextLength: 200000 },
      { id: "gpt-5.4-medium", name: "GPT-5.4 Medium", contextLength: 200000 },
      { id: "gpt-5.4-low-fast", name: "GPT-5.4 Low Fast", contextLength: 200000 },
      { id: "gpt-5.4-low", name: "GPT-5.4 Low", contextLength: 200000 },
      { id: "gpt-5.4-none-fast", name: "GPT-5.4 None Fast", contextLength: 200000 },
      { id: "gpt-5.4-none", name: "GPT-5.4 None", contextLength: 200000 },
      { id: "gpt-5.4-mini-xhigh", name: "GPT-5.4 Mini XHigh", contextLength: 128000 },
      { id: "gpt-5.4-mini-high", name: "GPT-5.4 Mini High", contextLength: 128000 },
      { id: "gpt-5.4-mini-medium", name: "GPT-5.4 Mini Medium", contextLength: 128000 },
      { id: "gpt-5.4-mini-low", name: "GPT-5.4 Mini Low", contextLength: 128000 },
      // ── GPT-5.3 Codex — effort-tiered (+ fast variants) ─────────────────
      { id: "gpt-5.3-codex-xhigh-fast", name: "GPT-5.3 Codex XHigh Fast", contextLength: 200000 },
      { id: "gpt-5.3-codex-xhigh", name: "GPT-5.3 Codex XHigh", contextLength: 200000 },
      { id: "gpt-5.3-codex-high-fast", name: "GPT-5.3 Codex High Fast", contextLength: 200000 },
      { id: "gpt-5.3-codex-high", name: "GPT-5.3 Codex High", contextLength: 200000 },
      { id: "gpt-5.3-codex-medium-fast", name: "GPT-5.3 Codex Medium Fast", contextLength: 200000 },
      { id: "gpt-5.3-codex-medium", name: "GPT-5.3 Codex Medium", contextLength: 200000 },
      { id: "gpt-5.3-codex-low-fast", name: "GPT-5.3 Codex Low Fast", contextLength: 200000 },
      { id: "gpt-5.3-codex-low", name: "GPT-5.3 Codex Low", contextLength: 200000 },
      // ── GPT-5.2 ─────────────────────────────────────────────────────────
      { id: "gpt-5.2-xhigh", name: "GPT-5.2 XHigh", contextLength: 200000 },
      { id: "gpt-5.2-high", name: "GPT-5.2 High", contextLength: 200000 },
      { id: "gpt-5.2-medium", name: "GPT-5.2 Medium", contextLength: 200000 },
      { id: "gpt-5.2-low", name: "GPT-5.2 Low", contextLength: 200000 },
      { id: "gpt-5.2-none", name: "GPT-5.2 None", contextLength: 200000 },
      // ── GPT-5 ────────────────────────────────────────────────────────────
      { id: "gpt-5-codex", name: "GPT-5 Codex", contextLength: 200000 },
      { id: "gpt-5", name: "GPT-5", contextLength: 200000 },
      // ── GPT-4.1 / 4o ────────────────────────────────────────────────────
      { id: "gpt-4.1", name: "GPT-4.1", contextLength: 200000 },
      { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", contextLength: 128000 },
      { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", contextLength: 32000 },
      { id: "gpt-4o", name: "GPT-4o", contextLength: 128000 },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", contextLength: 128000 },
      // ── Gemini ───────────────────────────────────────────────────────────
      { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro High", contextLength: 1000000 },
      { id: "gemini-3.1-pro-low", name: "Gemini 3.1 Pro Low", contextLength: 1000000 },
      { id: "gemini-3.0-pro", name: "Gemini 3.0 Pro", contextLength: 1000000 },
      { id: "gemini-3.0-flash-high", name: "Gemini 3.0 Flash High", contextLength: 1000000 },
      { id: "gemini-3.0-flash-medium", name: "Gemini 3.0 Flash Medium", contextLength: 1000000 },
      { id: "gemini-3.0-flash-low", name: "Gemini 3.0 Flash Low", contextLength: 1000000 },
      { id: "gemini-3.0-flash-minimal", name: "Gemini 3.0 Flash Minimal", contextLength: 1000000 },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", contextLength: 1000000 },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", contextLength: 1000000 },
      // ── Others ───────────────────────────────────────────────────────────
      { id: "deepseek-v4", name: "DeepSeek V4", contextLength: 64000 },
      { id: "deepseek-r1", name: "DeepSeek R1", contextLength: 64000 },
      { id: "deepseek-v3-2", name: "DeepSeek V3-2", contextLength: 64000 },
      { id: "deepseek-v3", name: "DeepSeek V3", contextLength: 64000 },
      { id: "grok-3-mini-thinking", name: "Grok 3 Mini Thinking", contextLength: 131000 },
      { id: "grok-3-mini", name: "Grok 3 Mini", contextLength: 131000 },
      { id: "grok-3", name: "Grok 3", contextLength: 131000 },
      { id: "grok-code-fast-1", name: "Grok Code Fast 1", contextLength: 131000 },
      { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 131000 },
      { id: "kimi-k2.5", name: "Kimi K2.5", contextLength: 131000 },
      { id: "kimi-k2", name: "Kimi K2", contextLength: 131000 },
      { id: "glm-5.1", name: "GLM-5.1", contextLength: 128000 },
      { id: "glm-5", name: "GLM-5", contextLength: 128000 },
      { id: "glm-4.7", name: "GLM-4.7", contextLength: 128000 },
    ],
  },

  // ── Devin CLI (Official — ACP JSON-RPC over stdio) ──────────────────────────
  // Uses the official `devin` binary via `devin acp --agent-type summarizer`.
  // Requires devin CLI installed (https://cli.devin.ai) and authenticated
  // via `devin auth login` or WINDSURF_API_KEY env var.
  // Model IDs are passed directly to the ACP session/new `model` param.
  "devin-cli": {
    id: "devin-cli",
    alias: "dv",
    format: "openai",
    executor: "devin-cli",
    baseUrl: "devin://acp/stdio",
    authType: "oauth",
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    defaultContextLength: 200000,
    models: [
      // Cognition / SWE — default model family recommended for coding tasks
      { id: "swe-1.6-fast", name: "SWE-1.6 Fast" },
      { id: "swe-1.6", name: "SWE-1.6" },
      { id: "swe-1.5-fast", name: "SWE-1.5 Fast" },
      { id: "swe-1.5", name: "SWE-1.5" },
      { id: "swe-check", name: "SWE Check" },
      // Claude Opus 4.7
      { id: "claude-opus-4.7-max", name: "Claude Opus 4.7 Max", contextLength: 200000 },
      { id: "claude-opus-4.7-high", name: "Claude Opus 4.7 High", contextLength: 200000 },
      { id: "claude-opus-4.7-medium", name: "Claude Opus 4.7 Medium", contextLength: 200000 },
      { id: "claude-opus-4.7-low", name: "Claude Opus 4.7 Low", contextLength: 200000 },
      // Claude Sonnet/Opus 4.6
      {
        id: "claude-sonnet-4.6-thinking-1m",
        name: "Claude Sonnet 4.6 Thinking 1M",
        contextLength: 1000000,
      },
      {
        id: "claude-sonnet-4.6-thinking",
        name: "Claude Sonnet 4.6 Thinking",
        contextLength: 200000,
      },
      { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 200000 },
      { id: "claude-opus-4.6-thinking", name: "Claude Opus 4.6 Thinking", contextLength: 200000 },
      { id: "claude-opus-4.6", name: "Claude Opus 4.6", contextLength: 200000 },
      // Claude 4.5
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", contextLength: 200000 },
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", contextLength: 200000 },
      // GPT-5.5
      { id: "gpt-5.5-xhigh", name: "GPT-5.5 XHigh", contextLength: 200000 },
      { id: "gpt-5.5-high", name: "GPT-5.5 High", contextLength: 200000 },
      { id: "gpt-5.5-medium", name: "GPT-5.5 Medium", contextLength: 200000 },
      { id: "gpt-5.5-low", name: "GPT-5.5 Low", contextLength: 200000 },
      // GPT-5.4
      { id: "gpt-5.4-high", name: "GPT-5.4 High", contextLength: 200000 },
      { id: "gpt-5.4-medium", name: "GPT-5.4 Medium", contextLength: 200000 },
      { id: "gpt-5.4-low", name: "GPT-5.4 Low", contextLength: 200000 },
      // GPT-5.3 Codex
      { id: "gpt-5.3-codex-high", name: "GPT-5.3 Codex High", contextLength: 200000 },
      { id: "gpt-5.3-codex-medium", name: "GPT-5.3 Codex Medium", contextLength: 200000 },
      { id: "gpt-5.3-codex-low", name: "GPT-5.3 Codex Low", contextLength: 200000 },
      // GPT-5.2
      { id: "gpt-5.2-high", name: "GPT-5.2 High", contextLength: 200000 },
      { id: "gpt-5.2-medium", name: "GPT-5.2 Medium", contextLength: 200000 },
      { id: "gpt-5.2-low", name: "GPT-5.2 Low", contextLength: 200000 },
      // Gemini
      { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro High", contextLength: 1000000 },
      { id: "gemini-3.0-pro", name: "Gemini 3.0 Pro", contextLength: 1000000 },
      { id: "gemini-3.0-flash-high", name: "Gemini 3.0 Flash High", contextLength: 1000000 },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", contextLength: 1000000 },
      // Others
      { id: "deepseek-v4", name: "DeepSeek V4", contextLength: 64000 },
      { id: "kimi-k2.6", name: "Kimi K2.6", contextLength: 131000 },
      { id: "glm-5.1", name: "GLM-5.1", contextLength: 128000 },
    ],
  },

  minimax: {
    id: "minimax",
    alias: "minimax",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.minimax.io/anthropic/v1/messages",
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "bearer",
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
    },
    models: [
      // T12/T28: MiniMax default upgraded from M2.5 to M2.7
      { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
      { id: "MiniMax-M2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
      { id: "MiniMax-M2.5-highspeed", name: "MiniMax M2.5 Highspeed" },
    ],
  },

  "minimax-cn": {
    id: "minimax-cn",
    alias: "minimax-cn", // unique alias (was colliding with minimax)
    format: "claude",
    executor: "default",
    baseUrl: "https://api.minimaxi.com/anthropic/v1/messages",
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "bearer",
    headers: {
      "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
    },
    models: [
      // Keep parity with minimax to ensure model discovery works for minimax-cn connections.
      { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
      { id: "MiniMax-M2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
      { id: "MiniMax-M2.5-highspeed", name: "MiniMax M2.5 Highspeed" },
    ],
  },

  crof: {
    id: "crof",
    alias: "crof",
    format: "openai",
    executor: "default",
    baseUrl: "https://crof.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    // Seed list — runtime /v1/models discovery keeps this fresh.
    // Source: GET https://crof.ai/v1/models (2026-04-25).
    models: [
      { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
      { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
      { id: "kimi-k2.6", name: "Kimi K2.6" },
      { id: "kimi-k2.6-precision", name: "Kimi K2.6 (Precision)" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
      { id: "kimi-k2.5-lightning", name: "Kimi K2.5 (Lightning)" },
      { id: "glm-5.1", name: "GLM 5.1" },
      { id: "glm-5.1-precision", name: "GLM 5.1 (Precision)" },
      { id: "glm-5", name: "GLM 5" },
      { id: "glm-4.7", name: "GLM 4.7" },
      { id: "glm-4.7-flash", name: "GLM 4.7 Flash" },
      { id: "gemma-4-31b-it", name: "Gemma 4 31B" },
      { id: "minimax-m2.5", name: "MiniMax M2.5" },
      { id: "qwen3.6-27b", name: "Qwen3.6 27B" },
      { id: "qwen3.5-397b-a17b", name: "Qwen3.5 397B A17B" },
      { id: "qwen3.5-9b", name: "Qwen3.5 9B" },
      { id: "qwen3.5-9b-chat", name: "Qwen3.5 9B (Chat)" },
    ],
  },

  alicode: {
    id: "alicode",
    alias: "alicode",
    format: "openai",
    executor: "default",
    baseUrl: "https://coding.dashscope.aliyuncs.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "qwen3.5-plus", name: "Qwen3.5 Plus" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
      { id: "glm-5", name: "GLM 5" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
      { id: "qwen3-max-2026-01-23", name: "Qwen3 Max" },
      { id: "qwen3-coder-next", name: "Qwen3 Coder Next" },
      { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
      { id: "glm-4.7", name: "GLM 4.7" },
    ],
  },

  "alicode-intl": {
    id: "alicode-intl",
    alias: "alicode-intl",
    format: "openai",
    executor: "default",
    baseUrl: "https://coding-intl.dashscope.aliyuncs.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "qwen3.5-plus", name: "Qwen3.5 Plus" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
      { id: "glm-5", name: "GLM 5" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
      { id: "qwen3-max-2026-01-23", name: "Qwen3 Max" },
      { id: "qwen3-coder-next", name: "Qwen3 Coder Next" },
      { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
      { id: "glm-4.7", name: "GLM 4.7" },
    ],
  },

  deepseek: {
    id: "deepseek",
    alias: "ds",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.deepseek.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
      { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    ],
  },

  groq: {
    id: "groq",
    alias: "groq",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B" },
      { id: "meta-llama/llama-4-maverick-17b-128e-instruct", name: "Llama 4 Maverick" },
      { id: "qwen/qwen3-32b", name: "Qwen3 32B" },
      { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B" },
    ],
  },

  blackbox: {
    id: "blackbox",
    alias: "bb",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.blackbox.ai/v1/chat/completions",
    modelsUrl: "https://api.blackbox.ai/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "claude-sonnet-4", name: "Claude Sonnet 4" },
      { id: "deepseek-v3", name: "DeepSeek V3" },
      { id: "blackboxai", name: "Blackbox AI" },
      { id: "blackboxai-pro", name: "Blackbox AI Pro" },
    ],
  },
  bazaarlink: {
    id: "bazaarlink",
    alias: "bzl",
    format: "openai",
    executor: "default",
    baseUrl: "https://bazaarlink.ai/api/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "auto:free", name: "Auto Free (Zero Cost)" },
      { id: "openai/gpt-4o", name: "GPT-4o" },
      { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4" },
      { id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash" },
      { id: "deepseek/deepseek-chat", name: "DeepSeek Chat" },
      { id: "meta/llama-3.1-70b", name: "Llama 3.1 70B" },
      { id: "qwen/qwen-2.5-72b", name: "Qwen 2.5 72B" },
    ],
  },
  completions: {
    id: "completions",
    alias: "cpl",
    format: "openai",
    executor: "default",
    baseUrl: "https://completions.me/api/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "claude-opus-4.6", name: "Claude Opus 4.6" },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5" },
      { id: "gpt-5.2", name: "GPT-5.2" },
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    ],
  },
  enally: {
    id: "enally",
    alias: "enly",
    format: "openai",
    executor: "default",
    baseUrl: "https://ai.enally.in",
    authType: "apikey",
    authHeader: "X-API-Key",
    models: [
      { id: "default", name: "Default Model" },
      { id: "chat", name: "Chat Model" },
      { id: "reasoning", name: "Reasoning Model" },
      { id: "multimodal", name: "Multimodal Model" },
    ],
  },
  freetheai: {
    id: "freetheai",
    alias: "fta",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.freetheai.xyz/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "free-fast", name: "Free Fast (Low Latency)" },
      { id: "free-smart", name: "Free Smart (Reasoning)" },
      { id: "free", name: "Free (Max Uptime)" },
    ],
  },
  xai: {
    id: "xai",
    alias: "xai",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.x.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "grok-4.3", name: "Grok 4.3" },
      { id: "grok-4.20-multi-agent-0309", name: "Grok 4.20 Multi Agent" },
      { id: "grok-4.20-0309-reasoning", name: "Grok 4.20 Reasoning" },
      { id: "grok-4.20-0309-non-reasoning", name: "Grok 4.20" },
    ],
  },

  "chatgpt-web": {
    id: "chatgpt-web",
    alias: "cgpt-web",
    format: "openai",
    executor: "chatgpt-web",
    baseUrl: "https://chatgpt.com/backend-api/conversation",
    authType: "apikey",
    authHeader: "cookie",
    models: [
      { id: "gpt-5.5-pro", name: "GPT-5.5 Pro" }, //pro tier only
      { id: "gpt-5.5-thinking", name: "GPT-5.5 Thinking" }, //plus, pro tier
      { id: "gpt-5.5", name: "GPT-5.5 Instant" }, //free, plus, pro tier
      { id: "gpt-5.4-pro", name: "GPT-5.4 Pro" }, //pro tier only
      { id: "gpt-5.4-thinking", name: "GPT-5.4 Thinking" }, //plus, pro tier
      { id: "gpt-5.4-thinking-mini", name: "GPT-5.4 Thinking Mini" }, //free-login only
      { id: "gpt-5.3", name: "GPT-5.3 Instant" }, //free, free-login, plus, pro tier
      { id: "gpt-5.3-mini", name: "GPT-5.3 Mini" }, //limit fallback
      { id: "gpt-5.2-pro", name: "GPT-5.2 Pro" }, //pro tier only
      { id: "gpt-5.2-thinking", name: "GPT-5.2 Thinking" }, //plus ~ tier
      { id: "gpt-5.2-instant", name: "GPT-5.2 Instant" }, //plus ~ tier
      { id: "o3", name: "o3" }, //plus ~ tier
      { id: "gpt-4-5", name: "GPT-4.5" }, //pro tier only
    ],
  },

  "grok-web": {
    id: "grok-web",
    alias: "gw",
    format: "openai",
    executor: "grok-web",
    baseUrl: "https://grok.com/rest/app-chat/conversations/new",
    authType: "apikey",
    authHeader: "cookie",
    passthroughModels: true,
    models: [
      { id: "fast", name: "Grok 4.20", toolCalling: true },
      { id: "expert", name: "Grok 4.20 Thinking", toolCalling: true },
      { id: "heavy", name: "Grok 4.20 Multi Agent", toolCalling: true },
      { id: "grok-420-computer-use-sa", name: "Grok 4.3 (Beta)", toolCalling: true },
    ],
  },

  mistral: {
    id: "mistral",
    alias: "mistral",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.mistral.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "mistral-large-latest", name: "Mistral Large 3" },
      { id: "mistral-medium-3-5", name: "Mistral Medium 3.5" },
      { id: "mistral-small-latest", name: "Mistral Small 4" },
      { id: "devstral-latest", name: "Devstral 2" },
      { id: "codestral-latest", name: "Codestral" },
    ],
  },

  perplexity: {
    id: "perplexity",
    alias: "pplx",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.perplexity.ai/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "sonar-deep-research", name: "Sonar Deep Research" },
      { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro" },
      { id: "sonar-pro", name: "Sonar Pro" },
      { id: "sonar", name: "Sonar" },
    ],
  },

  "perplexity-web": {
    id: "perplexity-web",
    alias: "pplx-web",
    format: "openai",
    executor: "perplexity-web",
    baseUrl: "https://www.perplexity.ai/rest/sse/perplexity_ask",
    authType: "apikey",
    authHeader: "cookie",
    models: [
      { id: "pplx-auto", name: "Perplexity Auto (Free)" },
      { id: "pplx-sonar", name: "Perplexity Sonar" },
      { id: "pplx-gpt", name: "GPT-5.5 (via Perplexity)" },
      { id: "pplx-gemini", name: "Gemini 3.1 Pro (via Perplexity)" },
      { id: "pplx-sonnet", name: "Claude Sonnet 4.6 (via Perplexity)" },
      { id: "pplx-opus", name: "Claude Opus 4.7 (via Perplexity)" },
      { id: "pplx-kimi", name: "Kimi K2.6 (via Perplexity)" },
      { id: "pplx-nemotron", name: "Nemotron 3 Super (via Perplexity)" },
    ],
  },

  "muse-spark-web": {
    id: "muse-spark-web",
    alias: "ms-web",
    format: "openai",
    executor: "muse-spark-web",
    baseUrl: "https://www.meta.ai/api/graphql",
    authType: "apikey",
    authHeader: "cookie",
    models: [
      { id: "muse-spark", name: "Muse Spark" },
      {
        id: "muse-spark-thinking",
        name: "Muse Spark Thinking",
        supportsReasoning: true,
      },
      {
        id: "muse-spark-contemplating",
        name: "Muse Spark Contemplating",
        supportsReasoning: true,
      },
    ],
  },

  together: {
    id: "together",
    alias: "together",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.together.xyz/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free", name: "Llama 3.3 70B Turbo (🆓 Free)" },
      { id: "meta-llama/Llama-Vision-Free", name: "Llama Vision (🆓 Free)" },
      {
        id: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free",
        name: "DeepSeek R1 Distill 70B (🆓 Free)",
      },
      { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo", name: "Llama 3.3 70B Turbo" },
      { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1" },
      { id: "Qwen/Qwen3-235B-A22B", name: "Qwen3 235B" },
      { id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", name: "Llama 4 Maverick" },
    ],
  },

  fireworks: {
    id: "fireworks",
    alias: "fireworks",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.fireworks.ai/inference/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "accounts/fireworks/models/kimi-k2p6", name: "Kimi K2.6" },
      { id: "accounts/fireworks/models/minimax-m2p7", name: "MiniMax M2.7" },
      { id: "accounts/fireworks/models/qwen3p6-plus", name: "Qwen3.6 Plus" },
      { id: "accounts/fireworks/models/glm-5p1", name: "GLM 5.1" },
      { id: "accounts/fireworks/models/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    ],
  },

  cerebras: {
    id: "cerebras",
    alias: "cerebras",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.cerebras.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "zai-glm-4.7", name: "GLM 4.7" },
      { id: "gpt-oss-120b", name: "GPT OSS 120B" },
    ],
  },

  "ollama-cloud": {
    id: "ollama-cloud",
    alias: "ollamacloud",
    format: "openai",
    executor: "default",
    baseUrl: "https://ollama.com/v1/chat/completions",
    modelsUrl: "https://ollama.com/api/tags",
    authType: "apikey",
    authHeader: "bearer",
    // Note: rate limits vary by plan (free = "Light usage", Pro = more, Max = 5x Pro).
    // Users can generate API keys at https://ollama.com/settings/api-keys
    models: [
      { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
      { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
      { id: "kimi-k2.6", name: "Kimi K2.6" },
      { id: "glm-5.1", name: "GLM 5.1" },
      { id: "minimax-m2.7", name: "MiniMax M2.7" },
      { id: "gemma4:31b", name: "Gemma 4 31B" },
      { id: "nemotron-3-super", name: "NVIDIA Nemotron 3 Super" },
      { id: "qwen3.5:397b", name: "Qwen 3.5 397B" },
    ],
    passthroughModels: true,
  },

  cohere: {
    id: "cohere",
    alias: "cohere",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.cohere.com/v2/chat",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "command-a-reasoning-08-2025", name: "Command A Reasoning (Aug 2025)" },
      { id: "command-a-vision-07-2025", name: "Command A Vision (Jul 2025)" },
      { id: "command-a-03-2025", name: "Command A (Mar 2025)" },
      { id: "command-r-08-2024", name: "Command R (Aug 2024)" },
    ],
  },

  nvidia: {
    id: "nvidia",
    alias: "nvidia",
    format: "openai",
    executor: "default",
    baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "z-ai/glm-5.1", name: "GLM 5.1" },
      { id: "minimaxai/minimax-m2.7", name: "MiniMax M2.7" },
      { id: "google/gemma-4-31b-it", name: "Gemma 4 31B" },
      { id: "mistralai/mistral-small-4-119b-2603", name: "Mistral Small 4 2603" },
      { id: "mistralai/mistral-large-3-675b-instruct-2512", name: "Mistral Large 3 675B" },
      { id: "mistralai/devstral-2-123b-instruct-2512", name: "Devstral 2 123B" },
      { id: "qwen/qwen3.5-397b-a17b", name: "Qwen3.5-397B-A17B" },
      { id: "qwen/qwen3.5-122b-a10b", name: "Qwen3.5-122B-A10B" },
      { id: "stepfun-ai/step-3.5-flash", name: "Step 3.5 Flash" },
      { id: "deepseek-ai/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B", toolCalling: false },
      { id: "openai/gpt-oss-20b", name: "GPT OSS 20B", toolCalling: false },
      { id: "nvidia/nemotron-3-super-120b-a12b", name: "Nemotron 3 Super 120B A12B" },
    ],
  },

  nebius: {
    id: "nebius",
    alias: "nebius",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.tokenfactory.nebius.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "meta-llama/Llama-3.3-70B-Instruct", name: "Llama 3.3 70B Instruct" }],
  },

  siliconflow: {
    id: "siliconflow",
    alias: "siliconflow",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.siliconflow.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "deepseek-ai/DeepSeek-V3.2", name: "DeepSeek V3.2" },
      { id: "deepseek-ai/DeepSeek-V3.1", name: "DeepSeek V3.1" },
      { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1" },
      { id: "Qwen/Qwen3-235B-A22B-Instruct-2507", name: "Qwen3 235B" },
      { id: "Qwen/Qwen3-Coder-480B-A35B-Instruct", name: "Qwen3 Coder 480B" },
      { id: "Qwen/Qwen3-32B", name: "Qwen3 32B" },
      { id: "moonshotai/Kimi-K2.5", name: "Kimi K2.5" },
      { id: "zai-org/GLM-4.7", name: "GLM 4.7" },
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B" },
      { id: "baidu/ERNIE-4.5-300B-A47B", name: "ERNIE 4.5 300B" },
    ],
  },

  hyperbolic: {
    id: "hyperbolic",
    alias: "hyp",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.hyperbolic.xyz/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "Qwen/QwQ-32B", name: "QwQ 32B" },
      { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1" },
      { id: "deepseek-ai/DeepSeek-V3", name: "DeepSeek V3" },
      { id: "meta-llama/Llama-3.3-70B-Instruct", name: "Llama 3.3 70B" },
      { id: "meta-llama/Llama-3.2-3B-Instruct", name: "Llama 3.2 3B" },
      { id: "Qwen/Qwen2.5-72B-Instruct", name: "Qwen 2.5 72B" },
      { id: "Qwen/Qwen2.5-Coder-32B-Instruct", name: "Qwen 2.5 Coder 32B" },
      { id: "NousResearch/Hermes-3-Llama-3.1-70B", name: "Hermes 3 70B" },
    ],
  },

  huggingface: {
    id: "huggingface",
    alias: "hf",
    format: "openai",
    executor: "default",
    // HuggingFace Inference API — OpenAI-compatible endpoint
    // Users must set their provider-specific baseUrl (model endpoint) in providerSpecificData.baseUrl
    // or use a fixed model like: https://router.huggingface.co/ngc/nvidia/llama-3_1-nemotron-51b-instruct
    baseUrl:
      "https://router.huggingface.co/hf-inference/models/meta-llama/Meta-Llama-3.1-70B-Instruct/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "meta-llama/Meta-Llama-3.1-70B-Instruct", name: "Llama 3.1 70B Instruct" },
      { id: "meta-llama/Meta-Llama-3.1-8B-Instruct", name: "Llama 3.1 8B Instruct" },
      { id: "Qwen/Qwen2.5-72B-Instruct", name: "Qwen 2.5 72B" },
      { id: "mistralai/Mistral-7B-Instruct-v0.3", name: "Mistral 7B v0.3" },
      { id: "microsoft/Phi-3.5-mini-instruct", name: "Phi-3.5 Mini" },
    ],
  },

  synthetic: {
    id: "synthetic",
    alias: "synthetic",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.synthetic.new/openai/v1/chat/completions",
    modelsUrl: "https://api.synthetic.new/openai/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "hf:nvidia/Kimi-K2.5-NVFP4", name: "Kimi K2.5 (NVFP4)" },
      { id: "hf:MiniMaxAI/MiniMax-M2.5", name: "MiniMax M2.5" },
      { id: "hf:zai-org/GLM-4.7-Flash", name: "GLM 4.7 Flash" },
      { id: "hf:zai-org/GLM-4.7", name: "GLM 4.7" },
      { id: "hf:moonshotai/Kimi-K2.5", name: "Kimi K2.5" },
      { id: "hf:deepseek-ai/DeepSeek-V3.2", name: "DeepSeek V3.2" },
    ],
    passthroughModels: true,
  },

  "kilo-gateway": {
    id: "kilo-gateway",
    alias: "kg",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.kilo.ai/api/gateway/chat/completions",
    modelsUrl: "https://api.kilo.ai/api/gateway/models",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "kilo-auto/frontier", name: "Kilo Auto Frontier" },
      { id: "kilo-auto/balanced", name: "Kilo Auto Balanced" },
      { id: "kilo-auto/free", name: "Kilo Auto Free" },
      { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "Nemotron 3 Super 120B (Free)" },
      { id: "minimax/minimax-m2.5:free", name: "MiniMax M2.5 (Free)" },
      { id: "arcee-ai/trinity-large-preview:free", name: "Trinity Large Preview (Free)" },
    ],
    passthroughModels: true,
  },

  vertex: {
    id: "vertex",
    alias: "vertex",
    // Vertex AI uses Google's generateContent format (same as Gemini)
    format: "gemini",
    executor: "vertex",
    // URL uses {project_id} and {region} from providerSpecificData — handled by custom executor or fallback
    // Default to us-central1 / generic endpoint; users configure project via providerSpecificData
    baseUrl: "https://us-central1-aiplatform.googleapis.com/v1/projects",
    urlBuilder: (base, model, stream) => {
      // Full URL: {base}/{project}/locations/{region}/publishers/google/models/{model}:{action}
      // For a generic fallback, we build a Gemini-compatible URL
      // The actual project/region are configured via providerSpecificData in the DB connection
      const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
      return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${action}`;
    },
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview (Vertex)" },
      { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite (Vertex)" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview (Vertex)" },
      { id: "gemma-4-31b-it", name: "Gemma 4 31B (Vertex)" },
      { id: "DeepSeek-V4-Flash", name: "DeepSeek V4 Flash (Vertex Partner)" },
      { id: "DeepSeek-V4-Pro", name: "DeepSeek V4 Pro (Vertex Partner)" },
      { id: "Qwen3.6-35B-A3B", name: "Qwen3.6 35B A3B (Vertex Partner)" },
      { id: "GLM-5.1-FP8", name: "GLM-5.1 (Vertex Partner)" },
      { id: "claude-opus-4-7", name: "Claude Opus 4.7 (Vertex)" },
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Vertex)" },
    ],
  },

  alibaba: {
    id: "alibaba",
    alias: "ali",
    format: "openai",
    executor: "default",
    // DashScope international OpenAI-compatible endpoint.
    // China users should set providerSpecificData.baseUrl to:
    //   https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
    baseUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
    modelsUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "qwen-max", name: "Qwen Max" },
      { id: "qwen-max-2025-01-25", name: "Qwen Max (2025-01-25)" },
      { id: "qwen-plus", name: "Qwen Plus" },
      { id: "qwen-plus-2025-07-14", name: "Qwen Plus (2025-07-14)" },
      { id: "qwen-turbo", name: "Qwen Turbo" },
      { id: "qwen-turbo-2025-11-01", name: "Qwen Turbo (2025-11-01)" },
      { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
      { id: "qwen3-coder-flash", name: "Qwen3 Coder Flash" },
      { id: "qwq-plus", name: "QwQ Plus (Reasoning)" },
      { id: "qwq-32b", name: "QwQ 32B" },
      { id: "qwen3-32b", name: "Qwen3 32B" },
      { id: "qwen3-235b-a22b", name: "Qwen3 235B A22B" },
    ],
    passthroughModels: true,
  },

  // ── New Free Providers (2026) ─────────────────────────────────────────────

  longcat: {
    id: "longcat",
    alias: "lc",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.longcat.chat/openai/v1/chat/completions",
    authType: "apikey",
    authHeader: "Authorization",
    authPrefix: "Bearer",
    // Free tier: 50M tokens/day (Flash-Lite) + 500K/day (Chat/Thinking) — 100% free while public beta
    models: [
      { id: "LongCat-Flash-Lite", name: "LongCat Flash-Lite (50M tok/day 🆓)" },
      { id: "LongCat-Flash-Chat", name: "LongCat Flash-Chat (500K tok/day 🆓)" },
      { id: "LongCat-Flash-Thinking", name: "LongCat Flash-Thinking (500K tok/day 🆓)" },
      { id: "LongCat-Flash-Omni-2603", name: "LongCat Flash-Omni-2603 (500K tok/day 🆓)" },
      //{ id: "LongCat-2.0-Preview", name: "LongCat 2.0 Preview (10M tok/day 🆓)" },
    ],
  },

  pollinations: {
    id: "pollinations",
    alias: "pol",
    format: "openai",
    executor: "pollinations",
    // Primary endpoint is text.pollinations.ai. gen.pollinations.ai is the current
    // OpenAI-compatible fallback used when the primary edge is rate-limited or unavailable.
    baseUrl: "https://text.pollinations.ai/openai/chat/completions",
    baseUrls: [
      "https://text.pollinations.ai/openai/chat/completions",
      "https://gen.pollinations.ai/v1/chat/completions",
    ],
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "openai", name: "OpenAI (Pollinations)" },
      { id: "openai-fast", name: "OpenAI Fast (Pollinations)" },
      { id: "openai-large", name: "OpenAI Large (Pollinations)" },
      { id: "qwen-coder", name: "Qwen Coder (Pollinations)" },
      { id: "mistral", name: "Mistral (Pollinations)" },
      { id: "gemini", name: "Gemini (Pollinations)" },
      { id: "gemini-flash-lite-3.1", name: "Gemini Flash Lite 3.1 (Pollinations)" },
      { id: "gemini-fast", name: "Gemini Fast (Pollinations)" },
      { id: "deepseek", name: "DeepSeek (Pollinations)" },
      { id: "grok", name: "Grok (Pollinations)" },
      { id: "grok-large", name: "Grok Large (Pollinations)" },
      { id: "gemini-search", name: "Gemini Search (Pollinations)" },
      { id: "midijourney", name: "Midijourney (Pollinations)" },
      { id: "midijourney-large", name: "Midijourney Large (Pollinations)" },
      { id: "claude-fast", name: "Claude Fast (Pollinations)" },
      { id: "claude", name: "Claude (Pollinations)" },
      { id: "claude-large", name: "Claude Large (Pollinations)" },
      { id: "perplexity-fast", name: "Perplexity Fast (Pollinations)" },
      { id: "perplexity-reasoning", name: "Perplexity Reasoning (Pollinations)" },
      { id: "kimi", name: "Kimi (Pollinations)" },
      { id: "gemini-large", name: "Gemini Large (Pollinations)" },
      { id: "nova-fast", name: "Nova Fast (Pollinations)" },
      { id: "nova", name: "Nova (Pollinations)" },
      { id: "glm", name: "GLM (Pollinations)" },
      { id: "minimax", name: "MiniMax (Pollinations)" },
      { id: "mistral-large", name: "Mistral Large (Pollinations)" },
      { id: "polly", name: "Polly (Pollinations)" },
      { id: "qwen-coder-large", name: "Qwen Coder Large (Pollinations)" },
      { id: "qwen-large", name: "Qwen Large (Pollinations)" },
      { id: "qwen-vision", name: "Qwen Vision (Pollinations)" },
      { id: "qwen-safety", name: "Qwen Safety (Pollinations)" },
    ],
  },

  puter: {
    id: "puter",
    alias: "pu",
    format: "openai",
    executor: "puter",
    // OpenAI-compatible gateway with 500+ models (GPT, Claude, Gemini, Grok, DeepSeek, Qwen…)
    // Auth: Bearer <puter_auth_token> from puter.com/dashboard → Copy Auth Token
    // Model IDs use provider/model-name format for non-OpenAI models.
    // Only chat completions (incl. streaming) are available via REST.
    // Image gen, TTS, STT, video are puter.js SDK-only (browser).
    baseUrl: "https://api.puter.com/puterai/openai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      // OpenAI — use bare IDs
      { id: "gpt-5.5", name: "GPT-5.5 (Puter)" },
      { id: "gpt-5.4", name: "GPT-5.4 (Puter)" },
      { id: "gpt-5.4-mini", name: "GPT-5.4 Mini (Puter)" },
      { id: "gpt-5.4-nano", name: "GPT-5.4 Nano (Puter)" },
      { id: "gpt-4o", name: "GPT-4o (Puter)" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini (🆓 Puter)" },
      { id: "o3", name: "OpenAI o3 (Puter)" },
      // Anthropic Claude — use bare IDs (confirmed working)
      { id: "claude-haiku-4-5", name: "Claude Haiku 4.5 (Puter)" },
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Puter)" },
      { id: "claude-opus-4-7", name: "Claude Opus 4.7 (Puter)" },
      // Google Gemini — use google/ prefix (confirmed working)
      { id: "google/gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite (Puter)" },
      { id: "google/gemini-3-flash", name: "Gemini 3 Flash (Puter)" },
      { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro (Puter)" },
      // DeepSeek — use deepseek/ prefix (confirmed working)
      { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro (Puter)" },
      { id: "deepseek/deepseek-v4-flash", name: "DeepSeek V4 Flash (Puter)" },
      // xAI Grok — use x-ai/ prefix
      { id: "x-ai/grok-4.3", name: "Grok 4.3 (Puter)" },
      { id: "x-ai/grok-4.20", name: "Grok 4.20 (Puter)" },
      // Meta Llama — bare IDs (confirmed ✅)
      { id: "llama-4-scout", name: "Llama 4 Scout (Puter)" },
      { id: "llama-4-maverick", name: "Llama 4 Maverick (Puter)" },
      { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70B (Puter)" },
      // Mistral — bare IDs (confirmed ✅)
      { id: "mistral-small-2603", name: "Mistral Small 4 (Puter)" },
      { id: "mistral-medium-3-5", name: "Mistral Medium 3.5 (Puter)" },
      { id: "mistral-large-2512", name: "Mistral Large (Puter)" },
      { id: "devstral-2512", name: "Devstral 2 (Puter)" },
      { id: "codestral-2508", name: "Codestral (Puter)" },
      { id: "mistral-nemo", name: "Mistral Nemo (Puter)" },
      // Qwen — use qwen/ prefix (confirmed ✅)
      { id: "qwen/qwen3.6-plus", name: "Qwen 3.6 Plus (Puter)" },
      { id: "qwen/qwen3.5-397b-a17b", name: "Qwen 3.5 397B (Puter)" },
      // Perplexity Sonar via OpenRouter aliases exposed by Puter
      { id: "perplexity/sonar-deep-research", name: "Perplexity Sonar Deep Research (Puter)" },
      { id: "perplexity/sonar-pro-search", name: "Perplexity Sonar Pro Search (Puter)" },
      { id: "perplexity/sonar-pro", name: "Perplexity Sonar Pro (Puter)" },
      { id: "perplexity/sonar-reasoning-pro", name: "Perplexity Sonar Reasoning Pro (Puter)" },
      { id: "perplexity/sonar", name: "Perplexity Sonar (Puter)" },
    ],
    passthroughModels: true, // 500+ models available — users can type arbitrary Puter model IDs
  },

  "cloudflare-ai": {
    id: "cloudflare-ai",
    alias: "cf",
    format: "openai",
    executor: "cloudflare-ai",
    // URL is dynamic: uses accountId from credentials. The executor builds it.
    baseUrl: "https://api.cloudflare.com/client/v4/accounts",
    authType: "apikey",
    authHeader: "bearer",
    // 10K Neurons/day free: ~150 LLM responses or 500s Whisper audio — global edge
    models: [
      { id: "@cf/meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B (🆓 ~150 resp/day)" },
      { id: "@cf/meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B (🆓)" },
      { id: "@cf/google/gemma-3-12b-it", name: "Gemma 3 12B (🆓)" },
      { id: "@cf/mistral/mistral-7b-instruct-v0.2-lora", name: "Mistral 7B (🆓)" },
      { id: "@cf/qwen/qwen2.5-coder-15b-instruct", name: "Qwen 2.5 Coder 15B (🆓)" },
      { id: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", name: "DeepSeek R1 Distill 32B (🆓)" },
    ],
  },

  scaleway: {
    id: "scaleway",
    alias: "scw",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.scaleway.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    // 1M tokens free for new accounts — EU/GDPR (Paris), no credit card needed under limit
    models: [
      { id: "qwen3-235b-a22b-instruct-2507", name: "Qwen3 235B A22B (1M free tok 🆓)" },
      { id: "llama-3.1-70b-instruct", name: "Llama 3.1 70B (🆓 EU)" },
      { id: "llama-3.1-8b-instruct", name: "Llama 3.1 8B (🆓 EU)" },
      { id: "mistral-small-3.2-24b-instruct-2506", name: "Mistral Small 3.2 (🆓 EU)" },
      { id: "deepseek-v3-0324", name: "DeepSeek V3 (🆓 EU)" },
      { id: "gpt-oss-120b", name: "GPT-OSS 120B (🆓 EU)" },
    ],
  },

  uncloseai: {
    id: "uncloseai",
    alias: "unc",
    format: "openai",
    executor: "default",
    baseUrl: "https://hermes.ai.unturf.com/v1/chat/completions",
    authType: "optional",
    authHeader: "bearer",
    models: [
      {
        id: "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic",
        name: "Hermes 3 Llama 3.1 8B (🆓 Free)",
      },
      { id: "qwen3.6:27b", name: "Qwen3 Coder 27B (🆓 Free)" },
      { id: "gemma4:31b", name: "Gemma 4 31B (🆓 Free)" },
    ],
  },

  deepinfra: {
    id: "deepinfra",
    alias: "deepinfra",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.deepinfra.com/v1/openai/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.deepinfra,
  },

  "vercel-ai-gateway": {
    id: "vercel-ai-gateway",
    alias: "vag",
    format: "openai",
    executor: "default",
    baseUrl: "https://ai-gateway.vercel.sh/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["vercel-ai-gateway"],
  },

  "lambda-ai": {
    id: "lambda-ai",
    alias: "lambda",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.lambda.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["lambda-ai"],
  },

  sambanova: {
    id: "sambanova",
    alias: "samba",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.sambanova.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.sambanova,
  },

  nscale: {
    id: "nscale",
    alias: "nscale",
    format: "openai",
    executor: "default",
    baseUrl: "https://inference.api.nscale.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.nscale,
  },

  ovhcloud: {
    id: "ovhcloud",
    alias: "ovh",
    format: "openai",
    executor: "default",
    baseUrl: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.ovhcloud,
  },

  baseten: {
    id: "baseten",
    alias: "baseten",
    format: "openai",
    executor: "default",
    baseUrl: "https://inference.baseten.co/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.baseten,
  },

  publicai: {
    id: "publicai",
    alias: "publicai",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.publicai.co/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.publicai,
  },

  moonshot: {
    id: "moonshot",
    alias: "moonshot",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.moonshot.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.moonshot,
  },

  "meta-llama": {
    id: "meta-llama",
    alias: "meta",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.llama.com/compat/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["meta-llama"],
  },

  "v0-vercel": {
    id: "v0-vercel",
    alias: "v0",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.v0.dev/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["v0-vercel"],
  },

  morph: {
    id: "morph",
    alias: "morph",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.morphllm.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.morph,
  },

  "featherless-ai": {
    id: "featherless-ai",
    alias: "featherless",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.featherless.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["featherless-ai"],
  },

  friendliai: {
    id: "friendliai",
    alias: "friendli",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.friendli.ai/dedicated/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.friendliai,
  },

  llamagate: {
    id: "llamagate",
    alias: "llamagate",
    format: "openai",
    executor: "default",
    baseUrl: "https://llamagate.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.llamagate,
  },

  heroku: {
    id: "heroku",
    alias: "heroku",
    format: "openai",
    executor: "default",
    baseUrl: "https://us.inference.heroku.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.heroku,
  },

  galadriel: {
    id: "galadriel",
    alias: "galadriel",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.galadriel.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.galadriel,
  },

  databricks: {
    id: "databricks",
    alias: "databricks",
    format: "openai",
    executor: "default",
    baseUrl: "https://adb-0000000000000000.0.azuredatabricks.net/serving-endpoints",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.databricks,
  },

  snowflake: {
    id: "snowflake",
    alias: "snowflake",
    format: "openai",
    executor: "default",
    baseUrl: "https://example-account.snowflakecomputing.com/api/v2",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.snowflake,
  },

  wandb: {
    id: "wandb",
    alias: "wandb",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.inference.wandb.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.wandb,
  },

  volcengine: {
    id: "volcengine",
    alias: "volcengine",
    format: "openai",
    executor: "default",
    baseUrl: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.volcengine,
  },

  ai21: {
    id: "ai21",
    alias: "ai21",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.ai21.com/studio/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.ai21,
  },

  gigachat: {
    id: "gigachat",
    alias: "gigachat",
    format: "openai",
    executor: "default",
    baseUrl: "https://gigachat.devices.sberbank.ru/api/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.gigachat,
  },

  venice: {
    id: "venice",
    alias: "venice",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.venice.ai/api/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.venice,
  },

  codestral: {
    id: "codestral",
    alias: "codestral",
    format: "openai",
    executor: "default",
    baseUrl: "https://codestral.mistral.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.codestral,
  },

  upstage: {
    id: "upstage",
    alias: "upstage",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.upstage.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.upstage,
  },

  maritalk: {
    id: "maritalk",
    alias: "maritalk",
    format: "openai",
    executor: "default",
    baseUrl: MARITALK_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "key",
    models: CHAT_OPENAI_COMPAT_MODELS.maritalk,
  },

  "xiaomi-mimo": {
    id: "xiaomi-mimo",
    alias: "mimo",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.xiaomimimo.com/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["xiaomi-mimo"],
  },

  "inference-net": {
    id: "inference-net",
    alias: "inet",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.inference.net/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["inference-net"],
  },

  nanogpt: {
    id: "nanogpt",
    alias: "nanogpt",
    format: "openai",
    executor: "default",
    baseUrl: "https://nano-gpt.com/api/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.nanogpt,
  },

  predibase: {
    id: "predibase",
    alias: "predibase",
    format: "openai",
    executor: "default",
    baseUrl: "https://serving.app.predibase.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.predibase,
  },

  bytez: {
    id: "bytez",
    alias: "bytez",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.bytez.com/models/v2",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.bytez,
  },

  aimlapi: {
    id: "aimlapi",
    alias: "aiml",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.aimlapi.com/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    // $0.025/day free credits — 200+ models via single aggregator endpoint
    models: [
      { id: "gpt-4o", name: "GPT-4o (via AI/ML API)" },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet (via AI/ML API)" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro (via AI/ML API)" },
      { id: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", name: "Llama 3.1 70B (via AI/ML API)" },
      { id: "deepseek-chat", name: "DeepSeek Chat (via AI/ML API)" },
      { id: "mistral-large-latest", name: "Mistral Large (via AI/ML API)" },
    ],
    passthroughModels: true,
  },
  // Free tier: 50 RPM, 500,000 TPM
  "nous-research": {
    id: "nous-research",
    alias: "nous",
    format: "openai",
    executor: "default",
    baseUrl: "https://inference-api.nousresearch.com/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "Hermes-4-405B", name: "Hermes 4 7B (Nous Research)" },
      { id: "Hermes-4-70B", name: "Hermes 4 70B (Nous Research)" },
    ],
  },

  reka: {
    id: "reka",
    alias: "reka",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.reka.ai/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "reka-flash-3", name: "Reka Flash 3" },
      { id: "reka-edge-2603", name: "Reka Edge 2603" },
    ],
  },
};

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
const _passthroughProviderIds: Set<string> | null = (() => {
  try {
    const ids = new Set<string>();
    for (const entry of Object.values(REGISTRY)) {
      if (entry.passthroughModels) ids.add(entry.id);
    }
    return ids;
  } catch {
    return null;
  }
})();

export function getPassthroughProviders(): Set<string> {
  return _passthroughProviderIds ?? new Set<string>();
}

// ── Registry Lookup Helpers ───────────────────────────────────────────────

const _byAlias = new Map<string, RegistryEntry>();
for (const entry of Object.values(REGISTRY)) {
  if (entry.alias && entry.alias !== entry.id) {
    _byAlias.set(entry.alias, entry);
  }
}

/** Get registry entry by provider ID or alias */
export function getRegistryEntry(provider: string): RegistryEntry | null {
  return REGISTRY[provider] || _byAlias.get(provider) || null;
}

/** Get all registered provider IDs */
export function getRegisteredProviders(): string[] {
  return Object.keys(REGISTRY);
}

// Precomputed map: modelId → unsupportedParams (O(1) lookup instead of O(N×M) scan).
// Built once at module load from all registry entries.
const _unsupportedParamsMap = new Map<string, readonly string[]>();
for (const entry of Object.values(REGISTRY)) {
  for (const model of entry.models) {
    if (model.unsupportedParams && !_unsupportedParamsMap.has(model.id)) {
      _unsupportedParamsMap.set(model.id, model.unsupportedParams);
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
  // 1. Check current provider's registry (exact match)
  const entry = getRegistryEntry(provider);
  const modelEntry = entry?.models.find((m) => m.id === modelId);
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
