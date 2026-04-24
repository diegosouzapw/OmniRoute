/**
 * Provider Registry — Single source of truth for all provider configuration.
 *
 * Adding a new provider? Just add an entry here. Everything else
 * (PROVIDERS, PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS, executor lookup)
 * is auto-generated from this registry.
 */

import { platform, arch } from "os";
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
  GLMT_REQUEST_DEFAULTS,
  GLMT_TIMEOUT_MS,
  GLM_SHARED_HEADERS,
  GLM_SHARED_MODELS,
} from "./glmProvider.ts";
import { DATAROBOT_DEFAULT_BASE_URL } from "./datarobot.ts";
import { AZURE_AI_DEFAULT_BASE_URL } from "./azureAi.ts";
import { BEDROCK_DEFAULT_BASE_URL } from "./bedrock.ts";
import { WATSONX_DEFAULT_BASE_URL } from "./watsonx.ts";
import { OCI_DEFAULT_BASE_URL } from "./oci.ts";
import { SAP_DEFAULT_BASE_URL } from "./sap.ts";
import { PETALS_DEFAULT_BASE_URL } from "./petals.ts";
import {
  CURSOR_REGISTRY_VERSION,
  getAntigravityProviderHeaders,
  getCursorRegistryHeaders,
  getGitHubCopilotChatHeaders,
  getKiroServiceHeaders,
  getQoderDefaultHeaders,
  getQwenOauthHeaders,
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
  targetFormat?: string;
  unsupportedParams?: readonly string[];
  /** Content types to remove before translation/upstream dispatch. */
  strip?: readonly string[];
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
  headers: {
    "anthropic-version": ANTHROPIC_VERSION_HEADER,
    "anthropic-beta": ANTHROPIC_BETA_API_KEY,
  },
  models: [
    { id: "kimi-k2.5", name: "Kimi K2.5" },
    { id: "kimi-k2.5-thinking", name: "Kimi K2.5 Thinking" },
    { id: "kimi-latest", name: "Kimi Latest" },
  ] as RegistryModel[],
} as const;

const GITLAB_DUO_BASE_URL =
  process.env.GITLAB_DUO_BASE_URL || process.env.GITLAB_BASE_URL || "https://gitlab.com";

const buildModels = (ids: readonly string[]): RegistryModel[] =>
  ids.map((id) => ({ id, name: id }));

const CHAT_OPENAI_COMPAT_MODELS: Record<string, RegistryModel[]> = {
  deepinfra: buildModels([
    "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    "deepseek-ai/DeepSeek-R1",
    "meta-llama/Llama-3.3-70B-Instruct",
    "anthropic/claude-4-sonnet",
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
    "DeepSeek-V3.1",
    "Llama-4-Maverick-17B-128E-Instruct",
    "Qwen3-32B",
    "gpt-oss-120b",
  ]),
  nscale: buildModels([
    "Qwen/QwQ-32B",
    "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    "meta-llama/Llama-3.3-70B-Instruct",
  ]),
  ovhcloud: buildModels([
    "Meta-Llama-3_3-70B-Instruct",
    "Qwen2.5-Coder-32B-Instruct",
    "Mistral-Small-3.2-24B-Instruct-2506",
  ]),
  baseten: buildModels(["moonshotai/Kimi-K2.5", "zai-org/GLM-5", "deepseek-ai/DeepSeek-V3.1"]),
  publicai: buildModels([
    "swiss-ai/apertus-70b-instruct",
    "aisingapore/Qwen-SEA-LION-v4-32B-IT",
    "allenai/Olmo-3-32B-Think",
  ]),
  glhf: buildModels([
    "hf:meta-llama/Llama-3.3-70B-Instruct",
    "hf:Qwen/Qwen2.5-72B-Instruct",
    "hf:deepseek-ai/DeepSeek-V3",
  ]),
  cablyai: buildModels(["gpt-4o", "gpt-4o-mini", "deepseek-chat"]),
  thebai: buildModels(["gpt-4o", "claude-3.5-sonnet", "llama-3.3-70b"]),
  fenayai: buildModels(["gpt-4o", "claude-3.5-sonnet", "deepseek-chat"]),
  empower: buildModels([
    "empower-functions",
    "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "meta-llama/Meta-Llama-3-8B-Instruct",
    "meta-llama/Meta-Llama-3-70B-Instruct",
  ]),
  "nous-research": [
    { id: "nousresearch/hermes-4-70b", name: "Nous: Hermes 4 70B", contextLength: 131072 },
    { id: "nousresearch/hermes-4-405b", name: "Nous: Hermes 4 405B", contextLength: 131072 },
    {
      id: "nousresearch/hermes-3-llama-3.1-70b",
      name: "Nous: Hermes 3 70B Instruct",
      contextLength: 131072,
    },
    {
      id: "nousresearch/hermes-3-llama-3.1-405b",
      name: "Nous: Hermes 3 405B Instruct",
      contextLength: 131072,
    },
    {
      id: "nousresearch/hermes-2-pro-llama-3-8b",
      name: "NousResearch: Hermes 2 Pro - Llama-3 8B",
      contextLength: 8192,
    },
  ],
  petals: [{ id: "stabilityai/StableBeluga2", name: "Stable Beluga 2 (70B)", contextLength: 8192 }],
  poe: buildModels(["Claude-Sonnet-4.5", "GPT-5-Pro", "GPT-5-Codex", "Gemini-2.5-Pro"]),
  gitlab: [{ id: "gitlab-duo-code-suggestions", name: "GitLab Duo Code Suggestions" }],
  "gitlab-duo": [{ id: "gitlab-duo-code-suggestions", name: "GitLab Duo Code Suggestions" }],
  chutes: buildModels([
    "Qwen/Qwen3-32B-TEE",
    "deepseek-ai/DeepSeek-V3.2-TEE",
    "openai/gpt-oss-120b-TEE",
    "moonshotai/Kimi-K2.6-TEE",
  ]),
  moonshot: buildModels(["kimi-k2.5", "kimi-latest", "moonshot-v1-auto"]),
  "meta-llama": buildModels([
    "Llama-3.3-70B-Instruct",
    "Llama-4-Maverick-17B-128E-Instruct-FP8",
    "Llama-4-Scout-17B-16E-Instruct-FP8",
  ]),
  "v0-vercel": buildModels(["v0-1.0-md", "v0-1.5-lg", "v0-1.5-md"]),
  morph: buildModels(["morph-v3-fast", "morph-v3-large"]),
  "featherless-ai": buildModels(["featherless-ai/Qwerky-72B", "featherless-ai/Qwerky-QwQ-32B"]),
  friendliai: buildModels(["meta-llama-3.1-70b-instruct", "meta-llama-3.1-8b-instruct"]),
  llamagate: buildModels(["qwen2.5-coder-7b", "deepseek-coder-6.7b", "qwen3-vl-8b"]),
  heroku: buildModels(["claude-3-5-sonnet-latest", "claude-4-sonnet"]),
  galadriel: buildModels(["galadriel-latest"]),
  databricks: buildModels([
    "databricks-gpt-5",
    "databricks-meta-llama-3-3-70b-instruct",
    "databricks-claude-sonnet-4",
    "databricks-gemini-2-5-pro",
  ]),
  datarobot: [
    { id: "azure/gpt-5-mini-2025-08-07", name: "Azure GPT-5 Mini" },
    { id: "azure/gpt-4o-mini", name: "Azure GPT-4o Mini" },
  ],
  clarifai: [
    { id: "openai/chat-completion/models/gpt-oss-120b", name: "GPT-OSS 120B" },
    { id: "openai/chat-completion/models/gpt-4o", name: "GPT-4o" },
    { id: "openai/chat-completion/models/o4-mini", name: "o4-mini" },
    { id: "anthropic/completion/models/claude-sonnet-4", name: "Claude Sonnet 4" },
    {
      id: "deepseek-ai/deepseek-chat/models/DeepSeek-R1-0528-Qwen3-8B",
      name: "DeepSeek R1 Qwen3 8B",
    },
    { id: "gcp/generate/models/gemini-2_5-flash", name: "Gemini 2.5 Flash" },
  ],
  watsonx: buildModels([
    "ibm/granite-3-3-8b-instruct",
    "meta-llama/llama-3-3-70b-instruct",
    "openai/gpt-4o",
  ]),
  oci: buildModels([
    "openai.gpt-oss-20b",
    "openai.gpt-oss-120b",
    "google.gemini-2.5-pro",
    "xai.grok-4",
  ]),
  sap: buildModels(["gpt-4o", "gpt-5-mini", "mistralai--mistral-medium-instruct"]),
  modal: buildModels([
    "Qwen/Qwen3-4B-Thinking-2507-FP8",
    "google/gemma-4-26B-A4B-it",
    "gpt-oss-20B",
  ]),
  reka: buildModels(["reka-core", "reka-flash", "reka-edge-2603"]),
  nlpcloud: buildModels([
    "gpt-oss-120b",
    "llama-3-1-405b",
    "finetuned-llama-3-70b",
    "chatdolphin",
    "dolphin-yi-34b",
    "dolphin-mixtral-8x7b",
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
  ai21: buildModels(["jamba-large-1.7", "jamba-mini-1.7", "jamba-1.5-large"]),
  gigachat: buildModels(["GigaChat-2-Max", "GigaChat-2-Pro", "GigaChat-2-Lite"]),
  venice: buildModels(["venice-latest"]),
  codestral: buildModels(["codestral-2405", "codestral-latest"]),
  upstage: buildModels(["solar-pro", "solar-mini", "solar-docvision", "solar-embedding-1-large"]),
  maritalk: buildModels(["sabia-3", "sabia-3-small"]),
  "xiaomi-mimo": buildModels(["mimo-v2-pro", "mimo-v2-omni", "mimo-v2-tts"]),
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
  switch (platform()) {
    case "darwin":
      return "MacOS";
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return `Other::${platform()}`;
  }
}

function mapStainlessArch() {
  switch (arch()) {
    case "x64":
      return "x64";
    case "arm64":
      return "arm64";
    case "ia32":
      return "x86";
    default:
      return `other::${arch()}`;
  }
}

// ── Registry ──────────────────────────────────────────────────────────────

export const REGISTRY: Record<string, RegistryEntry> = {
  // ─── OAuth Providers ───────────────────────────────────────────────────
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
      "anthropic-version": ANTHROPIC_VERSION_HEADER,
      "anthropic-beta": ANTHROPIC_BETA_CLAUDE_OAUTH,
      "anthropic-dangerous-direct-browser-access": "true",
      "User-Agent": CLAUDE_CLI_USER_AGENT,
      "x-app": "cli",
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
      { id: "claude-opus-4-7", name: "Claude Opus 4.7", supportsXHighEffort: true },
      { id: "claude-opus-4-6", name: "Claude Opus 4.6", supportsXHighEffort: false },
      { id: "claude-sonnet-4-6", name: "Claude 4.6 Sonnet", supportsXHighEffort: false },
      { id: "claude-opus-4-5-20251101", name: "Claude 4.5 Opus", supportsXHighEffort: false },
      {
        id: "claude-sonnet-4-5-20250929",
        name: "Claude 4.5 Sonnet",
        supportsXHighEffort: false,
      },
      {
        id: "claude-haiku-4-5-20251001",
        name: "Claude 4.5 Haiku",
        supportsXHighEffort: false,
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
      { id: "gemini-3-pro-preview", name: "Gemini 3 Pro Preview" },
      { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
      { id: "gemini-3.1-pro-preview-customtools", name: "Gemini 3.1 Pro Preview Custom Tools" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
      { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite Preview" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
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
      { id: "codex-auto-review", name: "Codex Auto Review" },
      { id: "gpt-5.4", name: "GPT 5.4", targetFormat: "openai-responses" },
      { id: "gpt-5.4-mini", name: "GPT 5.4 Mini", targetFormat: "openai-responses" },
      { id: "gpt-5.3-codex", name: "GPT 5.3 Codex" },
      { id: "gpt-5.3-codex-xhigh", name: "GPT 5.3 Codex (xHigh)" },
      { id: "gpt-5.3-codex-high", name: "GPT 5.3 Codex (High)" },
      { id: "gpt-5.3-codex-low", name: "GPT 5.3 Codex (Low)" },
      { id: "gpt-5.3-codex-none", name: "GPT 5.3 Codex (None)" },
      { id: "gpt-5.1-codex-mini", name: "GPT 5.1 Codex Mini" },
      { id: "gpt-5.1-codex-mini-high", name: "GPT 5.1 Codex Mini (High)" },
      { id: "gpt-5.2-codex", name: "GPT 5.2 Codex" },
      { id: "gpt-5.2", name: "GPT 5.2" },
      { id: "gpt-5.1-codex-max", name: "GPT 5.1 Codex Max" },
      { id: "gpt-5.1-codex", name: "GPT 5.1 Codex" },
      { id: "gpt-5.1", name: "GPT 5.1" },
      { id: "gpt-5-codex", name: "GPT 5 Codex" },
      { id: "gpt-5-codex-mini", name: "GPT 5 Codex Mini" },
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
      { id: "coder-model", name: "Qwen3.5 (Coder Model)" },
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
      { id: "gpt-4.1", name: "GPT-4.1" },
      { id: "gpt-5-mini", name: "GPT-5 Mini" },
      { id: "gpt-5.2", name: "GPT-5.2" },
      { id: "gpt-5.2-codex", name: "GPT-5.2 Codex", targetFormat: "openai-responses" },
      { id: "gpt-5.3-codex", name: "GPT-5.3 Codex", targetFormat: "openai-responses" },
      { id: "gpt-5.4", name: "GPT-5.4" },
      { id: "gpt-5.4-mini", name: "GPT-5.4 Mini" },
      { id: "gpt-5.4-nano", name: "GPT-5.4 Nano" },
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5" },
      { id: "claude-opus-4.5", name: "Claude Opus 4.5" },
      { id: "claude-opus-4.6", name: "Claude Opus 4.6" },
      { id: "claude-opus-4.7", name: "Claude Opus 4.7" },
      { id: "claude-sonnet-4", name: "Claude Sonnet 4" },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5" },
      { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "grok-code-fast-1", name: "Grok Code Fast 1" },
      { id: "oswe-vscode-prime", name: "Raptor Mini" },
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
      { id: "auto", name: "Auto" },
      { id: "claude-opus-4.7", name: "Claude Opus 4.7", contextLength: 1000000 },
      { id: "claude-opus-4.6", name: "Claude Opus 4.6", contextLength: 1000000 },
      { id: "claude-opus-4.5", name: "Claude Opus 4.5", contextLength: 200000 },
      { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", contextLength: 1000000 },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", contextLength: 200000 },
      { id: "claude-sonnet-4", name: "Claude Sonnet 4.0", contextLength: 200000 },
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", contextLength: 200000 },
      { id: "minimax-m2.5", name: "MiniMax M2.5", contextLength: 200000 },
      { id: "glm-5", name: "GLM-5", contextLength: 200000 },
      { id: "deepseek-3.2", name: "DeepSeek 3.2", contextLength: 128000 },
      { id: "minimax-m2.1", name: "MiniMax M2.1", contextLength: 200000 },
      { id: "qwen3-coder-next", name: "Qwen3 Coder Next", contextLength: 256000 },
    ],
  },

  "amazon-q": {
    id: "amazon-q",
    alias: "aq",
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
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5" },
      { id: "claude-sonnet-4", name: "Claude Sonnet 4" },
      { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet" },
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
      { id: "default", name: "Auto (Server Picks)" },
      { id: "claude-4.6-opus-high-thinking", name: "Claude 4.6 Opus High Thinking" },
      { id: "claude-4.6-opus-high", name: "Claude 4.6 Opus High" },
      { id: "claude-4.6-sonnet-high-thinking", name: "Claude 4.6 Sonnet High Thinking" },
      { id: "claude-4.6-sonnet-high", name: "Claude 4.6 Sonnet High" },
      { id: "claude-4.6-haiku", name: "Claude 4.6 Haiku" },
      { id: "claude-4.6-opus", name: "Claude 4.6 Opus" },
      { id: "claude-4.5-opus-high-thinking", name: "Claude 4.5 Opus High Thinking" },
      { id: "claude-4.5-opus-high", name: "Claude 4.5 Opus High" },
      { id: "claude-4.5-sonnet-thinking", name: "Claude 4.5 Sonnet Thinking" },
      { id: "claude-4.5-sonnet", name: "Claude 4.5 Sonnet" },
      { id: "claude-4.5-haiku", name: "Claude 4.5 Haiku" },
      { id: "claude-4.5-opus", name: "Claude 4.5 Opus" },
      { id: "gpt-5.2-codex", name: "GPT 5.2 Codex" },
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
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "o1", name: "O1", unsupportedParams: REASONING_UNSUPPORTED },
      { id: "o1-mini", name: "O1 Mini", unsupportedParams: REASONING_UNSUPPORTED },
      { id: "o1-pro", name: "O1 Pro", unsupportedParams: REASONING_UNSUPPORTED },
      { id: "o3", name: "O3", unsupportedParams: REASONING_UNSUPPORTED },
      { id: "o3-mini", name: "O3 Mini", unsupportedParams: REASONING_UNSUPPORTED },
    ],
  },

  "azure-openai": {
    id: "azure-openai",
    alias: "azure",
    format: "openai",
    executor: "azure-openai",
    baseUrl: "https://example-resource.openai.azure.com",
    authType: "apikey",
    authHeader: "api-key",
    defaultContextLength: 128000,
    models: [],
    passthroughModels: true,
  },

  "azure-ai": {
    id: "azure-ai",
    alias: "azure-ai",
    format: "openai",
    executor: "default",
    baseUrl: AZURE_AI_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "api-key",
    models: [
      { id: "claude-opus-4-6", name: "Claude Opus 4.6" },
      { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
      { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
      { id: "grok-4", name: "Grok 4" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
    ],
    passthroughModels: true,
  },

  bedrock: {
    id: "bedrock",
    alias: "bedrock",
    format: "openai",
    executor: "default",
    baseUrl: BEDROCK_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "bearer",
    models: buildModels([
      "openai.gpt-oss-20b",
      "openai.gpt-oss-120b",
      "openai.gpt-oss-safeguard-20b",
      "openai.gpt-oss-safeguard-120b",
      "mistral.mistral-large-3-675b-instruct",
    ]),
    passthroughModels: true,
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
      "anthropic-version": ANTHROPIC_VERSION_HEADER,
      "anthropic-beta": ANTHROPIC_BETA_API_KEY,
    },
    models: [
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5" },
      { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4" },
      { id: "claude-sonnet-4-6-20251031", name: "Claude Sonnet 4.6 (Dated)" },
      { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "claude-opus-4-20250514", name: "Claude Opus 4" },
      { id: "claude-opus-4-6-20251031", name: "Claude Opus 4.6 (Dated)" },
      { id: "claude-opus-4.6", name: "Claude Opus 4.6" },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
    ],
  },

  "opencode-go": {
    id: "opencode-go",
    alias: "opencode-go",
    format: "openai",
    executor: "opencode",
    baseUrl: "https://opencode.ai/zen/go/v1",
    modelsUrl: "https://opencode.ai/zen/go/v1/models",
    // (#532) Key validation must hit the main zen endpoint (same key works for both tiers)
    testKeyBaseUrl: "https://opencode.ai/zen/v1",
    authType: "apikey",
    authHeader: "Authorization",
    authPrefix: "Bearer",
    defaultContextLength: 200000,
    models: [
      { id: "glm-5.1", name: "GLM-5.1", contextLength: 204800 },
      { id: "glm-5", name: "GLM-5" },
      { id: "kimi-k2.6", name: "Kimi K2.6" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
      { id: "mimo-v2-pro", name: "MiMo V2 Pro" },
      { id: "mimo-v2-omni", name: "MiMo V2 Omni" },
      { id: "qwen3.6-plus", name: "Qwen 3.6 Plus" },
      { id: "qwen3.5-plus", name: "Qwen 3.5 Plus" },
      { id: "minimax-m2.7", name: "MiniMax M2.7", targetFormat: "claude" },
      { id: "minimax-m2.5", name: "MiniMax M2.5", targetFormat: "claude" },
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
      { id: "minimax-m2.5-free", name: "MiniMax M2.5 Free", contextLength: 204800 },
      { id: "big-pickle", name: "Big Pickle", contextLength: 200000 },
      { id: "gpt-5-nano", name: "GPT 5 Nano", contextLength: 400000 },
      { id: "mimo-v2-omni-free", name: "MiMo V2 Omni Free", contextLength: 262144 },
      { id: "mimo-v2-pro-free", name: "MiMo V2 Pro Free", contextLength: 1048576 },
      { id: "nemotron-3-super-free", name: "Nemotron 3 Super Free", contextLength: 1000000 },
      { id: "qwen3.6-plus-free", name: "Qwen 3.6 Plus Free", contextLength: 1048576 },
    ],
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

  glm: {
    id: "glm",
    alias: "glm",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
    defaultContextLength: 200000,
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "x-api-key",
    headers: GLM_SHARED_HEADERS,
    models: [...GLM_SHARED_MODELS],
  },

  glmt: {
    id: "glmt",
    alias: "glmt",
    format: "claude",
    executor: "default",
    baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
    defaultContextLength: 200000,
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "x-api-key",
    headers: GLM_SHARED_HEADERS,
    requestDefaults: GLMT_REQUEST_DEFAULTS,
    timeoutMs: GLMT_TIMEOUT_MS,
    models: [...GLM_SHARED_MODELS],
  },

  "glm-cn": {
    id: "glm-cn",
    alias: "glmcn",
    format: "openai",
    executor: "default",
    baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions",
    modelsUrl: "https://open.bigmodel.cn/api/coding/paas/v4/models",
    authType: "apikey",
    authHeader: "bearer",
    defaultContextLength: 200000,
    models: [
      { id: "glm-5.1", name: "GLM 5.1" },
      { id: "glm-5", name: "GLM 5" },
      { id: "glm-4.7", name: "GLM 4.7" },
      { id: "glm-4.6", name: "GLM 4.6" },
      { id: "glm-4.5-air", name: "GLM 4.5 Air" },
    ],
  },

  "bailian-coding-plan": {
    id: "bailian-coding-plan",
    alias: "bcp",
    format: "claude",
    executor: "default",
    baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages",
    chatPath: "/messages",
    urlSuffix: "?beta=true",
    authType: "apikey",
    authHeader: "x-api-key",
    headers: {
      "anthropic-version": ANTHROPIC_VERSION_HEADER,
      "anthropic-beta": ANTHROPIC_BETA_API_KEY,
    },
    models: [
      { id: "qwen3.5-plus", name: "Qwen3.5 Plus" },
      { id: "qwen3-max-2026-01-23", name: "Qwen3 Max (2026-01-23)" },
      { id: "qwen3-coder-next", name: "Qwen3 Coder Next", strip: ["image", "audio"] },
      { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
      { id: "glm-5", name: "GLM 5" },
      { id: "glm-4.7", name: "GLM 4.7" },
      { id: "kimi-k2.5", name: "Kimi K2.5" },
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
      "anthropic-version": ANTHROPIC_VERSION_HEADER,
      "anthropic-beta": ANTHROPIC_BETA_API_KEY,
    },
    models: [
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
      { id: "kimi-k2.5", name: "Kimi K2.5" },
      { id: "kimi-k2.5-thinking", name: "Kimi K2.5 Thinking" },
      { id: "kimi-latest", name: "Kimi Latest" },
      { id: "kimi-for-coding", name: "Kimi For Coding" },
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
      { id: "qwen/qwen3-vl-235b-a22b-thinking", name: "Qwen3 VL 235B A22B Thinking" },
      { id: "qwen/qwen3-235b-a22b-thinking-2507", name: "Qwen3 235B A22B Thinking 2507" },
      { id: "qwen/qwen3-vl-30b-a3b-thinking", name: "Qwen3 VL 30B A3B Thinking" },
      { id: "stepfun/step-3.5-flash:free", name: "StepFun Step 3.5 Flash" },
      { id: "arcee-ai/trinity-large-preview:free", name: "Arcee AI Trinity Large Preview" },
      { id: "openai/gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "openai/gpt-4.1-nano", name: "GPT-4.1 Nano" },
      { id: "openai/gpt-5-nano", name: "GPT-5 Nano" },
      { id: "openai/gpt-5-mini", name: "GPT-5 Mini" },
      { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku" },
      { id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash" },
      { id: "google/gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
      { id: "deepseek/deepseek-chat-v3.1", name: "DeepSeek V3.1" },
      { id: "deepseek/deepseek-v3.2", name: "DeepSeek V3.2" },
      { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B" },
      { id: "meta-llama/llama-4-scout", name: "Llama 4 Scout" },
      { id: "meta-llama/llama-4-maverick", name: "Llama 4 Maverick" },
      { id: "qwen/qwen3-8b", name: "Qwen3 8B" },
      { id: "qwen/qwen3-32b", name: "Qwen3 32B" },
      { id: "qwen/qwen3-coder", name: "Qwen3 Coder 480B" },
      { id: "qwen/qwq-32b", name: "QwQ 32B" },
      { id: "mistralai/mistral-small-24b-instruct-2501", name: "Mistral Small 3" },
      { id: "mistralai/mistral-7b-instruct", name: "Mistral 7B" },
      { id: "x-ai/grok-code-fast-1", name: "Grok Code Fast 1" },
      { id: "moonshotai/kimi-k2.5", name: "Kimi K2.5" },
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
      { id: "anthropic/claude-sonnet-4-20250514", name: "Claude Sonnet 4" },
      { id: "anthropic/claude-opus-4-20250514", name: "Claude Opus 4" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash" },
      { id: "openai/gpt-4.1", name: "GPT-4.1" },
      { id: "openai/o3", name: "o3" },
      { id: "deepseek/deepseek-chat", name: "DeepSeek Chat" },
    ],
    passthroughModels: true,
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
      "anthropic-version": ANTHROPIC_VERSION_HEADER,
      "anthropic-beta": ANTHROPIC_BETA_API_KEY,
    },
    models: [
      // T12/T28: MiniMax default upgraded from M2.5 to M2.7
      { id: "minimax-m2.7", name: "MiniMax M2.7" },
      { id: "MiniMax-M2.7", name: "MiniMax M2.7 (Legacy Alias)" },
      { id: "minimax-m2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
      { id: "minimax-m2.5", name: "MiniMax M2.5" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5 (Legacy Alias)" },
      { id: "MiniMax-M2.1", name: "MiniMax M2.1" },
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
      "anthropic-version": ANTHROPIC_VERSION_HEADER,
      "anthropic-beta": ANTHROPIC_BETA_API_KEY,
    },
    models: [
      // Keep parity with minimax to ensure model discovery works for minimax-cn connections.
      { id: "minimax-m2.7", name: "MiniMax M2.7" },
      { id: "MiniMax-M2.7", name: "MiniMax M2.7 (Legacy Alias)" },
      { id: "minimax-m2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
      { id: "minimax-m2.5", name: "MiniMax M2.5" },
      { id: "MiniMax-M2.5", name: "MiniMax M2.5 (Legacy Alias)" },
      { id: "MiniMax-M2.1", name: "MiniMax M2.1" },
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
      { id: "deepseek-chat", name: "DeepSeek V3.2 Chat", strip: ["image", "audio"] },
      { id: "deepseek-reasoner", name: "DeepSeek V3.2 Reasoner", strip: ["image", "audio"] },
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

  "blackbox-web": {
    id: "blackbox-web",
    alias: "bb-web",
    format: "openai",
    executor: "blackbox-web",
    baseUrl: "https://app.blackbox.ai/api/chat",
    authType: "apikey",
    authHeader: "cookie",
    models: [
      { id: "minimax/minimax-m2.7", name: "MiniMax M2.7" },
      { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7" },
      { id: "anthropic/claude-opus-4.6", name: "Claude Opus 4.6" },
      { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
      { id: "openai/gpt-5.4", name: "GPT-5.4" },
      { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6" },
      { id: "z-ai/glm-5", name: "GLM-5" },
      { id: "x-ai/grok-4.1-fast", name: "Grok 4.1 Fast" },
      { id: "blackbox/encrypted", name: "Blackbox Encrypted" },
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
    defaultContextLength: 262000,
    models: [
      { id: "muse-spark", name: "Muse Spark", contextLength: 262000 },
      {
        id: "muse-spark-thinking",
        name: "Muse Spark Thinking",
        supportsReasoning: true,
        contextLength: 262000,
      },
      {
        id: "muse-spark-contemplating",
        name: "Muse Spark Contemplating",
        supportsReasoning: true,
        contextLength: 262000,
      },
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
      { id: "grok-4-fast-non-reasoning", name: "Grok 4 Fast" },
      { id: "grok-4-fast-reasoning", name: "Grok 4 Fast Reasoning" },
      { id: "grok-4-1-fast-non-reasoning", name: "Grok 4.1 Fast" },
      { id: "grok-4-1-fast-reasoning", name: "Grok 4.1 Fast Reasoning" },
      { id: "grok-4-0709", name: "Grok 4 (0709)" },
      { id: "grok-4", name: "Grok 4" },
      { id: "grok-3", name: "Grok 3" },
      { id: "grok-3-mini", name: "Grok 3 Mini" },
    ],
  },

  "grok-web": {
    id: "grok-web",
    alias: "grok-web",
    format: "openai",
    executor: "grok-web",
    baseUrl: "https://grok.com/rest/app-chat/conversations/new",
    authType: "apikey",
    authHeader: "cookie",
    models: [
      { id: "grok-3", name: "Grok 3" },
      { id: "grok-3-mini", name: "Grok 3 Mini (Thinking)" },
      { id: "grok-3-thinking", name: "Grok 3 Thinking" },
      { id: "grok-4", name: "Grok 4" },
      { id: "grok-4-mini", name: "Grok 4 Mini (Thinking)" },
      { id: "grok-4-thinking", name: "Grok 4 Thinking" },
      { id: "grok-4-heavy", name: "Grok 4 Heavy (SuperGrok)" },
      { id: "grok-4.1-mini", name: "Grok 4.1 Mini (Thinking)" },
      { id: "grok-4.1-fast", name: "Grok 4.1 Fast" },
      { id: "grok-4.1-expert", name: "Grok 4.1 Expert" },
      { id: "grok-4.1-thinking", name: "Grok 4.1 Thinking" },
      { id: "grok-4.2", name: "Grok 4.2 (4.20 Beta)" },
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
      { id: "codestral-latest", name: "Codestral" },
      { id: "mistral-medium-latest", name: "Mistral Medium 3" },
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
      { id: "pplx-gpt", name: "GPT-5.4 (via Perplexity)" },
      { id: "pplx-gemini", name: "Gemini 3.1 Pro (via Perplexity)" },
      { id: "pplx-sonnet", name: "Claude Sonnet 4.6 (via Perplexity)" },
      { id: "pplx-opus", name: "Claude Opus 4.6 (via Perplexity)" },
      { id: "pplx-nemotron", name: "Nemotron 3 Super (via Perplexity)" },
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
      { id: "accounts/fireworks/models/deepseek-v3p1", name: "DeepSeek V3.1" },
      { id: "accounts/fireworks/models/llama-v3p3-70b-instruct", name: "Llama 3.3 70B" },
      { id: "accounts/fireworks/models/qwen3-235b-a22b", name: "Qwen3 235B" },
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
      { id: "gpt-oss-120b", name: "GPT OSS 120B" },
      { id: "zai-glm-4.7", name: "ZAI GLM 4.7" },
      { id: "llama-3.3-70b", name: "Llama 3.3 70B" },
      { id: "llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout" },
      { id: "qwen-3-235b-a22b-instruct-2507", name: "Qwen3 235B A22B" },
      { id: "qwen-3-32b", name: "Qwen3 32B" },
    ],
  },
  "lm-studio": {
    id: "lm-studio",
    alias: "lmstudio",
    format: "openai",
    executor: "default",
    baseUrl: "http://localhost:1234/v1",
    authType: "apikey", // Some setups may use proxy with api key
    authHeader: "bearer",
    models: [], // Usually dynamic based on local models downloaded
    passthroughModels: true,
  },
  vllm: {
    id: "vllm",
    alias: "vllm",
    format: "openai",
    executor: "default",
    baseUrl: "http://localhost:8000/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [],
    passthroughModels: true,
  },
  llamafile: {
    id: "llamafile",
    alias: "llamafile",
    format: "openai",
    executor: "default",
    baseUrl: "http://127.0.0.1:8080/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [],
    passthroughModels: true,
  },
  triton: {
    id: "triton",
    alias: "triton",
    format: "openai",
    executor: "default",
    baseUrl: "http://localhost:8000/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [],
    passthroughModels: true,
  },
  "docker-model-runner": {
    id: "docker-model-runner",
    alias: "dmr",
    format: "openai",
    executor: "default",
    baseUrl: "http://localhost:12434/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [],
    passthroughModels: true,
  },
  xinference: {
    id: "xinference",
    alias: "xinference",
    format: "openai",
    executor: "default",
    baseUrl: "http://localhost:9997/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [],
    passthroughModels: true,
  },
  oobabooga: {
    id: "oobabooga",
    alias: "ooba",
    format: "openai",
    executor: "default",
    baseUrl: "http://localhost:5000/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [],
    passthroughModels: true,
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
      { id: "gemma3:27b", name: "Gemma 3 27B" },
      { id: "llama3.3:70b", name: "Llama 3.3 70B" },
      { id: "qwen3:72b", name: "Qwen3 72B" },
      { id: "devstral:24b", name: "Devstral 24B" },
      { id: "deepseek-r2:671b", name: "DeepSeek R2 671B" },
      { id: "phi4:14b", name: "Phi 4 14B" },
      { id: "mistral-small3.2:24b", name: "Mistral Small 3.2 24B" },
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
      { id: "command-r-plus-08-2024", name: "Command R+ (Aug 2024)" },
      { id: "command-r-08-2024", name: "Command R (Aug 2024)" },
      { id: "command-a-03-2025", name: "Command A (Mar 2025)" },
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
      { id: "gpt-oss-120b", name: "GPT OSS 120B" },
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B (OpenAI Prefix)" },
      { id: "openai/gpt-oss-20b", name: "GPT OSS 20B" },
      { id: "meta/llama-3.3-70b-instruct", name: "Llama 3.3 70B" },
      { id: "nvidia/llama-3.3-70b-instruct", name: "Llama 3.3 70B (NVIDIA Prefix)" },
      { id: "meta/llama-4-maverick-17b-128e-instruct", name: "Llama 4 Maverick" },
      { id: "nvidia/llama-3.1-nemotron-ultra-253b-v1", name: "Llama 3.1 Nemotron Ultra 253B" },
      { id: "nvidia/nemotron-3-super-120b-a12b", name: "Nemotron 3 Super 120B A12B" },
      { id: "nvidia/llama-3.3-nemotron-super-49b-v1.5", name: "Llama 3.3 Nemotron Super 49B" },
      { id: "moonshotai/kimi-k2.5", name: "Kimi K2.5" },
      { id: "z-ai/glm4.7", name: "GLM 4.7" },
      { id: "deepseek-ai/deepseek-v3.2", name: "DeepSeek V3.2" },
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1" },
      {
        id: "mistralai/mistral-large-3-675b-instruct-2512",
        name: "Mistral Large 3 675B",
      },
      { id: "qwen/qwen3-coder-480b-a35b-instruct", name: "Qwen3 Coder 480B" },
      { id: "mistralai/devstral-2-123b-instruct-2512", name: "Devstral 2 123B" },
      { id: "nvidia/llama-3.1-70b-instruct", name: "Llama 3.1 70B" },
      { id: "nvidia/llama-3.1-405b-instruct", name: "Llama 3.1 405B" },
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
      {
        id: "deepseek-ai/DeepSeek-V3.2",
        name: "DeepSeek V3.2",
        strip: ["image", "audio"],
      },
      {
        id: "deepseek-ai/DeepSeek-V3.1",
        name: "DeepSeek V3.1",
        strip: ["image", "audio"],
      },
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
      { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite Preview (Vertex)" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview (Vertex)" },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (Vertex)" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Vertex)" },
      { id: "gemini-2.0-flash-thinking-exp", name: "Gemini 2.0 Flash Thinking Exp (Vertex)" },
      { id: "gemma-2-27b-it", name: "Gemma 2 27B (Vertex)" },
      { id: "deepseek-v3.2", name: "DeepSeek V3.2 (Vertex Partner)" },
      { id: "qwen3-next-80b", name: "Qwen3 Next 80B (Vertex Partner)" },
      { id: "glm-5", name: "GLM-5 (Vertex Partner)" },
      { id: "claude-opus-4-5@20251101", name: "Claude Opus 4.5 (Vertex)" },
      { id: "claude-sonnet-4-5@20251101", name: "Claude Sonnet 4.5 (Vertex)" },
    ],
  },

  "vertex-partner": {
    id: "vertex-partner",
    alias: "vp",
    format: "gemini",
    executor: "vertex",
    baseUrl: "https://us-central1-aiplatform.googleapis.com/v1/projects",
    authType: "apikey",
    authHeader: "bearer",
    models: [
      { id: "deepseek-v3.2", name: "DeepSeek V3.2 (Vertex Partner)" },
      { id: "qwen3-next-80b", name: "Qwen3 Next 80B (Vertex Partner)" },
      { id: "glm-5", name: "GLM-5 (Vertex Partner)" },
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

  modelscope: {
    id: "modelscope",
    alias: "ms",
    format: "openai",
    executor: "default",
    baseUrl: "https://api-inference.modelscope.cn/v1/chat/completions",
    authType: "apikey",
    authHeader: "bearer",
    // ModelScope uses per-model quotas. Setting passthroughModels: true ensures 429/404
    // only locks the specific model, not the entire connection. This allows fallback
    // to other models on the same API key.
    passthroughModels: true,
    models: [
      { id: "moonshotai/Kimi-K2.5", name: "Kimi K2.5" },
      { id: "ZhipuAI/GLM-5", name: "GLM-5" },
      { id: "stepfun-ai/Step-3.5-Flash", name: "Step-3.5-Flash" },
    ],
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
      { id: "LongCat-Flash-Thinking-2601", name: "LongCat Flash-Thinking-2601 (🆓)" },
      { id: "LongCat-Flash-Omni-2603", name: "LongCat Flash-Omni-2603 (🆓)" },
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
      { id: "gpt-4o-mini", name: "GPT-4o Mini (🆓 Puter)" },
      { id: "gpt-4o", name: "GPT-4o (Puter)" },
      { id: "gpt-4.1", name: "GPT-4.1 (Puter)" },
      { id: "gpt-4.1-mini", name: "GPT-4.1 Mini (Puter)" },
      { id: "gpt-5-nano", name: "GPT-5 Nano (Puter)" },
      { id: "gpt-5-mini", name: "GPT-5 Mini (Puter)" },
      { id: "gpt-5", name: "GPT-5 (Puter)" },
      { id: "o3-mini", name: "OpenAI o3-mini (Puter)" },
      { id: "o3", name: "OpenAI o3 (Puter)" },
      { id: "o4-mini", name: "OpenAI o4-mini (Puter)" },
      // Anthropic Claude — use bare IDs (confirmed working)
      { id: "claude-haiku-4-5", name: "Claude Haiku 4.5 (Puter)" },
      { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5 (Puter)" },
      { id: "claude-opus-4-5", name: "Claude Opus 4.5 (Puter)" },
      { id: "claude-sonnet-4", name: "Claude Sonnet 4 (Puter)" },
      { id: "claude-opus-4", name: "Claude Opus 4 (Puter)" },
      // Google Gemini — use google/ prefix (confirmed working)
      { id: "google/gemini-2.0-flash", name: "Gemini 2.0 Flash (Puter)" },
      { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash (Puter)" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro (Puter)" },
      { id: "google/gemini-3-flash", name: "Gemini 3 Flash (Puter)" },
      { id: "google/gemini-3-pro", name: "Gemini 3 Pro (Puter)" },
      // DeepSeek — use deepseek/ prefix (confirmed working)
      { id: "deepseek/deepseek-chat", name: "DeepSeek Chat (Puter)" },
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1 (Puter)" },
      { id: "deepseek/deepseek-v3.2", name: "DeepSeek V3.2 (Puter)" },
      // xAI Grok — use x-ai/ prefix
      { id: "x-ai/grok-3", name: "Grok 3 (Puter)" },
      { id: "x-ai/grok-3-mini", name: "Grok 3 Mini (Puter)" },
      { id: "x-ai/grok-4", name: "Grok 4 (Puter)" },
      { id: "x-ai/grok-4-fast", name: "Grok 4 Fast (Puter)" },
      // Meta Llama — bare IDs (confirmed ✅)
      { id: "llama-4-scout", name: "Llama 4 Scout (Puter)" },
      { id: "llama-4-maverick", name: "Llama 4 Maverick (Puter)" },
      { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70B (Puter)" },
      // Mistral — bare IDs (confirmed ✅)
      { id: "mistral-small-latest", name: "Mistral Small (Puter)" },
      { id: "mistral-medium-latest", name: "Mistral Medium (Puter)" },
      { id: "open-mistral-nemo", name: "Mistral Nemo (Puter)" },
      // Qwen — use qwen/ prefix (confirmed ✅)
      { id: "qwen/qwen3-235b-a22b", name: "Qwen3 235B (Puter)" },
      { id: "qwen/qwen3-32b", name: "Qwen3 32B (Puter)" },
      { id: "qwen/qwen3-coder", name: "Qwen3 Coder 480B (Puter)" },
      // Perplexity Sonar via OpenRouter aliases exposed by Puter
      { id: "perplexity/sonar", name: "Perplexity Sonar (Puter)" },
      { id: "perplexity/sonar-pro", name: "Perplexity Sonar Pro (Puter)" },
      { id: "perplexity/sonar-pro-search", name: "Perplexity Sonar Pro Search (Puter)" },
      { id: "perplexity/sonar-reasoning-pro", name: "Perplexity Sonar Reasoning Pro (Puter)" },
      { id: "perplexity/sonar-deep-research", name: "Perplexity Sonar Deep Research (Puter)" },
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

  glhf: {
    id: "glhf",
    alias: "glhf",
    format: "openai",
    executor: "default",
    baseUrl: "https://glhf.chat/api/openai/v1/chat/completions",
    modelsUrl: "https://glhf.chat/api/openai/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.glhf,
    passthroughModels: true,
  },

  cablyai: {
    id: "cablyai",
    alias: "cablyai",
    format: "openai",
    executor: "default",
    baseUrl: "https://cablyai.com/v1/chat/completions",
    modelsUrl: "https://cablyai.com/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.cablyai,
    passthroughModels: true,
  },

  thebai: {
    id: "thebai",
    alias: "thebai",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.theb.ai/v1/chat/completions",
    modelsUrl: "https://api.theb.ai/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.thebai,
    passthroughModels: true,
  },

  fenayai: {
    id: "fenayai",
    alias: "fenayai",
    format: "openai",
    executor: "default",
    baseUrl: "https://fenayai.com/v1/chat/completions",
    modelsUrl: "https://fenayai.com/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.fenayai,
    passthroughModels: true,
  },

  empower: {
    id: "empower",
    alias: "empower",
    format: "openai",
    executor: "default",
    baseUrl: "https://app.empower.dev/api/v1",
    modelsUrl: "https://app.empower.dev/api/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.empower,
    passthroughModels: true,
  },

  "nous-research": {
    id: "nous-research",
    alias: "nous",
    format: "openai",
    executor: "default",
    baseUrl: "https://inference-api.nousresearch.com/v1",
    modelsUrl: "https://inference-api.nousresearch.com/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS["nous-research"],
    passthroughModels: true,
  },

  petals: {
    id: "petals",
    alias: "petals",
    format: "openai",
    executor: "petals",
    baseUrl: PETALS_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.petals,
  },

  poe: {
    id: "poe",
    alias: "poe",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.poe.com/v1",
    modelsUrl: "https://api.poe.com/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.poe,
    passthroughModels: true,
  },

  gitlab: {
    id: "gitlab",
    alias: "gitlab",
    format: "openai",
    executor: "gitlab",
    baseUrl: "https://gitlab.com/api/v4/code_suggestions/completions",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.gitlab,
  },

  "gitlab-duo": {
    id: "gitlab-duo",
    alias: "gitlab-duo",
    format: "openai",
    executor: "gitlab-duo",
    baseUrl: `${GITLAB_DUO_BASE_URL.replace(/\/$/, "")}/api/v4/code_suggestions/completions`,
    authType: "oauth",
    authHeader: "bearer",
    oauth: {
      clientIdEnv: "GITLAB_DUO_OAUTH_CLIENT_ID",
      clientIdDefault: process.env.GITLAB_OAUTH_CLIENT_ID || "",
      clientSecretEnv: "GITLAB_DUO_OAUTH_CLIENT_SECRET",
      clientSecretDefault: process.env.GITLAB_OAUTH_CLIENT_SECRET || "",
      tokenUrl: `${GITLAB_DUO_BASE_URL.replace(/\/$/, "")}/oauth/token`,
      refreshUrl: `${GITLAB_DUO_BASE_URL.replace(/\/$/, "")}/oauth/token`,
      authUrl: `${GITLAB_DUO_BASE_URL.replace(/\/$/, "")}/oauth/authorize`,
    },
    models: CHAT_OPENAI_COMPAT_MODELS["gitlab-duo"],
  },

  chutes: {
    id: "chutes",
    alias: "chutes",
    format: "openai",
    executor: "default",
    baseUrl: "https://llm.chutes.ai/v1/chat/completions",
    modelsUrl: "https://llm.chutes.ai/v1/models",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.chutes,
    passthroughModels: true,
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

  datarobot: {
    id: "datarobot",
    alias: "datarobot",
    format: "openai",
    executor: "default",
    baseUrl: DATAROBOT_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.datarobot,
    passthroughModels: true,
  },

  clarifai: {
    id: "clarifai",
    alias: "clarifai",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.clarifai.com/v2/ext/openai/v1/chat/completions",
    modelsUrl: "https://api.clarifai.com/v2/ext/openai/v1/models",
    authType: "apikey",
    authHeader: "Authorization",
    authPrefix: "Key ",
    models: CHAT_OPENAI_COMPAT_MODELS.clarifai,
    passthroughModels: true,
  },

  watsonx: {
    id: "watsonx",
    alias: "watsonx",
    format: "openai",
    executor: "default",
    baseUrl: WATSONX_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.watsonx,
    passthroughModels: true,
  },

  oci: {
    id: "oci",
    alias: "oci",
    format: "openai",
    executor: "default",
    baseUrl: OCI_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.oci,
    passthroughModels: true,
  },

  sap: {
    id: "sap",
    alias: "sap",
    format: "openai",
    executor: "default",
    baseUrl: SAP_DEFAULT_BASE_URL,
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.sap,
    passthroughModels: true,
  },

  modal: {
    id: "modal",
    alias: "modal",
    format: "openai",
    executor: "default",
    baseUrl: "https://example-user--example-app.modal.run/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.modal,
    passthroughModels: true,
  },

  reka: {
    id: "reka",
    alias: "reka",
    format: "openai",
    executor: "default",
    baseUrl: "https://api.reka.ai/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: CHAT_OPENAI_COMPAT_MODELS.reka,
    passthroughModels: true,
  },

  nlpcloud: {
    id: "nlpcloud",
    alias: "nlpc",
    format: "openai",
    executor: "nlpcloud",
    baseUrl: "https://api.nlpcloud.io/v1/gpu",
    authType: "apikey",
    authHeader: "token",
    models: CHAT_OPENAI_COMPAT_MODELS.nlpcloud,
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
    baseUrl: "https://chat.maritaca.ai/api/chat/inference",
    authType: "apikey",
    authHeader: "bearer",
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

  // 3. Handle prefixed model IDs (e.g., "openai/o3" → "o3", "moonshotai/Kimi-K2.5" → "moonshotai/Kimi-K2.5")
  // ModelScope models have slash in ID, check both full ID and bare ID
  if (modelId.includes("/")) {
    // First check full model ID with provider prefix (e.g., "moonshotai/Kimi-K2.5")
    const cachedWithPrefix = _unsupportedParamsMap.get(modelId);
    if (cachedWithPrefix) return cachedWithPrefix;

    // Fall back to bare ID (e.g., "Kimi-K2.5")
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
 * @deprecated This function will be removed in v4.0, please use REGISTRY.claude?.models directly
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
