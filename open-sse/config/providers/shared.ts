/**
 * Provider Registry — Single source of truth for all provider configuration.
 *
 * Adding a new provider? Just add an entry here. Everything else
 * (PROVIDERS, PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS, executor lookup)
 * is auto-generated from this registry.
 */

import { ANTIGRAVITY_BASE_URLS } from "../antigravityUpstream.ts";
import { ANTIGRAVITY_PUBLIC_MODELS } from "../antigravityModelAliases.ts";
import { AGY_PUBLIC_MODELS } from "../agyModels.ts";
import {
  ANTHROPIC_BETA_API_KEY,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
  ANTHROPIC_VERSION_HEADER,
  CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
  CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
  CLAUDE_CLI_USER_AGENT,
} from "../anthropicHeaders.ts";
import { getCodexDefaultHeaders } from "../codexClient.ts";
import {
  GLM_REQUEST_DEFAULTS,
  GLMT_REQUEST_DEFAULTS,
  GLM_TIMEOUT_MS,
  GLMT_TIMEOUT_MS,
  GLM_SHARED_MODELS,
} from "../glmProvider.ts";
import { MARITALK_DEFAULT_BASE_URL } from "../maritalk.ts";
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
} from "../providerHeaderProfiles.ts";
import type { ProviderRequestDefaults } from "../../services/providerRequestDefaults.ts";
import { resolvePublicCred } from "../../utils/publicCreds.ts";
import { buildGitLabOAuthEndpoints, GITLAB_DUO_DEFAULT_BASE_URL } from "@/lib/oauth/gitlab";

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
  /**
   * Interleaved-reasoning signal, mirroring models.dev's `interleaved_field`.
   * Set to "reasoning_content" for models whose upstream runs DeepSeek thinking
   * mode (e.g. OpenCode `big-pickle`) so follow-up/tool-use turns replay
   * reasoning_content instead of failing with a DeepSeek 400 (#2900).
   */
  interleavedField?: string;
}

// Reasoning models reject temperature, top_p, penalties, logprobs, n.
// Frozen to prevent accidental mutation (shared across all model entries).
export const REASONING_UNSUPPORTED: readonly string[] = Object.freeze([
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
  /** Prefix to prepend to model IDs before upstream API calls (e.g. "accounts/fireworks/models/") */
  modelIdPrefix?: string;
  /**
   * Additional already-qualified model ID prefixes that must NOT receive `modelIdPrefix`
   * (e.g. Fireworks router IDs "accounts/fireworks/routers/"). Prevents double-prefixing
   * fully-qualified IDs that legitimately differ from `modelIdPrefix`. See issue #3133.
   */
  acceptedModelIdPrefixes?: string[];
  chatPath?: string;
  clientVersion?: string;
  timeoutMs?: number;
  passthroughModels?: boolean;
  /** Default context window for all models in this provider (can be overridden per-model) */
  defaultContextLength?: number;
  /** Optional session pool config for rate limit management */
  poolConfig?: Record<string, unknown>;
}

export interface LegacyProvider {
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

// Kimi K2.7 Code (released 2026-06-12): coding-focused successor to K2.6 — 1T
// MoE, 256K context, thinking-only (preserve_thinking forced) with a fixed
// sampling regime (temperature=1.0 / top_p=0.95). Two ids: `kimi-k2.7-code` and
// the high-speed variant `kimi-k2.7-code-highspeed`. `temperature`/`top_p` are
// stripped on every path: the OpenAI endpoint (api.moonshot.ai) treats them as
// non-modifiable, and the coding/Anthropic endpoint (api.kimi.com/coding) — the
// path validated live on the test VPS — tolerates them but fixes them anyway, so
// dropping them keeps the fixed regime and avoids an OpenAI-endpoint 400.
export const KIMI_K27_MODELS: RegistryModel[] = [
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code",
    contextLength: 262144,
    maxOutputTokens: 262144,
    supportsVision: true,
    supportsReasoning: true,
    unsupportedParams: ["temperature", "top_p"],
  },
  {
    id: "kimi-k2.7-code-highspeed",
    name: "Kimi K2.7 Code (High Speed)",
    contextLength: 262144,
    maxOutputTokens: 262144,
    supportsVision: true,
    supportsReasoning: true,
    unsupportedParams: ["temperature", "top_p"],
  },
];

export const KIMI_CODING_SHARED = {
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
    {
      id: "kimi-k2.6",
      name: "Kimi K2.6",
      contextLength: 262144,
      maxOutputTokens: 262144,
      supportsVision: true,
    },
    {
      id: "kimi-k2.6-thinking",
      name: "Kimi K2.6 Thinking",
      contextLength: 262144,
      maxOutputTokens: 262144,
    },
    ...KIMI_K27_MODELS,
    {
      id: "moonshotai/kimi-k2.7-code",
      name: "Kimi K2.7 Code",
      contextLength: 262144,
      maxOutputTokens: 262144,
    },
  ] as RegistryModel[],
} as const;

export const buildModels = (ids: readonly string[]): RegistryModel[] =>
  ids.map((id) => ({ id, name: id }));

export const ALIBABA_DASHSCOPE_MODELS: RegistryModel[] = [
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
];

export const GPT_5_5_CONTEXT_LENGTH = 1050000;
export const GPT_5_5_CODEX_CAPABILITIES = {
  targetFormat: "openai-responses",
  toolCalling: true,
  supportsReasoning: true,
  supportsVision: true,
  supportsXHighEffort: true,
  contextLength: GPT_5_5_CONTEXT_LENGTH,
} as const;

export const GPT_5_4_CODEX_CAPABILITIES = {
  targetFormat: "openai-responses",
  toolCalling: true,
  supportsReasoning: true,
  supportsVision: true,
  supportsXHighEffort: true,
  contextLength: 200000,
  maxOutputTokens: 128000,
} as const;

export const CHAT_OPENAI_COMPAT_MODELS: Record<string, RegistryModel[]> = {
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
  moonshot: [...buildModels(["kimi-k2.6", "kimi-k2.5"]), ...KIMI_K27_MODELS],
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
  gitlawb: [
    { id: "mimo-v2.5-pro", name: "MiMo-V2.5-Pro", contextLength: 1048576, maxOutputTokens: 131072 },
    { id: "mimo-v2.5", name: "MiMo-V2.5", contextLength: 1048576, maxOutputTokens: 131072 },
    { id: "mimo-v2-pro", name: "MiMo-V2-Pro", contextLength: 262144, maxOutputTokens: 131072 },
    { id: "mimo-v2-omni", name: "MiMo-V2-Omni", contextLength: 262144, maxOutputTokens: 131072 },
    { id: "mimo-v2-flash", name: "MiMo-V2-Flash", contextLength: 262144, maxOutputTokens: 65536 },
  ],
  "gitlawb-gmi": [
    {
      id: "XiaomiMiMo/MiMo-V2.5-Pro",
      name: "MiMo-V2.5-Pro (GMI)",
      contextLength: 1050000,
      maxOutputTokens: 131072,
    },
    {
      id: "XiaomiMiMo/MiMo-V2.5",
      name: "MiMo-V2.5 (GMI)",
      contextLength: 1050000,
      maxOutputTokens: 131072,
    },
    { id: "openai/gpt-5.5", name: "GPT-5.5", contextLength: 1050000, maxOutputTokens: 131072 },
    {
      id: "openai/gpt-5.4-pro",
      name: "GPT-5.4 Pro",
      contextLength: 409600,
      maxOutputTokens: 131072,
    },
    { id: "openai/gpt-5.4", name: "GPT-5.4", contextLength: 409600, maxOutputTokens: 131072 },
    {
      id: "openai/gpt-5.4-mini",
      name: "GPT-5.4 Mini",
      contextLength: 409600,
      maxOutputTokens: 131072,
    },
    {
      id: "openai/gpt-5.4-nano",
      name: "GPT-5.4 Nano",
      contextLength: 409600,
      maxOutputTokens: 131072,
    },
    {
      id: "openai/gpt-5.3-codex",
      name: "GPT-5.3 Codex",
      contextLength: 409600,
      maxOutputTokens: 131072,
    },
    {
      id: "openai/gpt-5.2-codex",
      name: "GPT-5.2 Codex",
      contextLength: 409600,
      maxOutputTokens: 131072,
    },
    { id: "openai/gpt-5.2", name: "GPT-5.2", contextLength: 409600, maxOutputTokens: 131072 },
    { id: "openai/gpt-5.1", name: "GPT-5.1", contextLength: 409600, maxOutputTokens: 131072 },
    { id: "openai/gpt-5", name: "GPT-5", contextLength: 409600, maxOutputTokens: 131072 },
    { id: "openai/gpt-4o", name: "GPT-4o", contextLength: 131072, maxOutputTokens: 16384 },
    {
      id: "openai/gpt-4o-mini",
      name: "GPT-4o Mini",
      contextLength: 131072,
      maxOutputTokens: 16384,
    },
    {
      id: "anthropic/claude-opus-4.7",
      name: "Claude Opus 4.7",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-opus-4.6",
      name: "Claude Opus 4.6",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-opus-4.5",
      name: "Claude Opus 4.5",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-opus-4.1",
      name: "Claude Opus 4.1",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-sonnet-4",
      name: "Claude Sonnet 4",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "anthropic/claude-haiku-4.5",
      name: "Claude Haiku 4.5",
      contextLength: 409600,
      maxOutputTokens: 131072,
      targetFormat: "claude",
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Pro",
      name: "DeepSeek V4 Pro",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Flash",
      name: "DeepSeek V4 Flash",
      contextLength: 1048575,
      maxOutputTokens: 131072,
      supportsReasoning: true,
    },
    {
      id: "deepseek-ai/DeepSeek-R1-0528",
      name: "DeepSeek R1",
      contextLength: 163840,
      maxOutputTokens: 131072,
      supportsReasoning: true,
    },
    {
      id: "deepseek-ai/DeepSeek-V3.2",
      name: "DeepSeek V3.2",
      contextLength: 163840,
      maxOutputTokens: 131072,
    },
    {
      id: "google/gemini-3.1-pro-preview",
      name: "Gemini 3.1 Pro",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "google/gemini-3.1-flash-lite-preview",
      name: "Gemini 3.1 Flash Lite",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    {
      id: "google/gemini-3-flash-preview",
      name: "Gemini 3 Flash",
      contextLength: 1048576,
      maxOutputTokens: 131072,
    },
    { id: "zai-org/GLM-5.1-FP8", name: "GLM-5.1", contextLength: 202752, maxOutputTokens: 131072 },
    { id: "zai-org/GLM-5-FP8", name: "GLM-5", contextLength: 202752, maxOutputTokens: 131072 },
    {
      id: "moonshotai/Kimi-K2.6",
      name: "Kimi K2.6",
      contextLength: 65536,
      maxOutputTokens: 131072,
    },
    {
      id: "moonshotai/Kimi-K2.5",
      name: "Kimi K2.5",
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
    {
      id: "MiniMaxAI/MiniMax-M2.7",
      name: "MiniMax M2.7",
      contextLength: 196608,
      maxOutputTokens: 131072,
    },
    {
      id: "MiniMaxAI/MiniMax-M2.5",
      name: "MiniMax M2.5",
      contextLength: 196608,
      maxOutputTokens: 131072,
    },
    {
      id: "Qwen/Qwen3.6-Max-Preview",
      name: "Qwen3.6 Max",
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
    {
      id: "Qwen/Qwen3.6-Plus",
      name: "Qwen3.6 Plus",
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
    {
      id: "Qwen/Qwen3.5-397B-A17B",
      name: "Qwen3.5 397B",
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
    {
      id: "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8",
      name: "Qwen3 Coder 480B",
      contextLength: 262128,
      maxOutputTokens: 131072,
    },
    {
      id: "nvidia/NVIDIA-Nemotron-3-Nano-Omni",
      name: "Nemotron 3 Nano",
      contextLength: 262144,
      maxOutputTokens: 131072,
    },
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
  // Restored after the registry modularization (#3993) dropped the mimocode key
  // referenced by the mimocode provider plugin. Source of truth: pre-#3993
  // providerRegistry.ts (commit 1ed01dd90^).
  mimocode: [
    { id: "mimo-auto", name: "MiMo Auto", contextLength: 1000000, maxOutputTokens: 128000 },
  ],
};

export function mapStainlessOs() {
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

export function mapStainlessArch() {
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

export {
  ANTIGRAVITY_BASE_URLS,
  ANTIGRAVITY_PUBLIC_MODELS,
  AGY_PUBLIC_MODELS,
  ANTHROPIC_BETA_API_KEY,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
  ANTHROPIC_VERSION_HEADER,
  CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
  CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
  CLAUDE_CLI_USER_AGENT,
  getCodexDefaultHeaders,
  GLM_REQUEST_DEFAULTS,
  GLMT_REQUEST_DEFAULTS,
  GLM_TIMEOUT_MS,
  GLMT_TIMEOUT_MS,
  GLM_SHARED_MODELS,
  MARITALK_DEFAULT_BASE_URL,
  CURSOR_REGISTRY_VERSION,
  getAntigravityProviderHeaders,
  getCursorRegistryHeaders,
  getGitHubCopilotChatHeaders,
  getKiroServiceHeaders,
  getQoderDefaultHeaders,
  getQwenOauthHeaders,
  getRuntimePlatform,
  getRuntimeArch,
  resolvePublicCred,
  buildGitLabOAuthEndpoints,
  GITLAB_DUO_DEFAULT_BASE_URL,
};

export function getClaudeCliHeaders(): Record<string, string> {
  return {
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
  };
}

export function getAnthropicCompatHeaders(): Record<string, string> {
  return {
    "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
  };
}

export function buildAntigravityUrl(base: string, model: string, stream: boolean): string {
  const path = stream ? "/v1internal:streamGenerateContent?alt=sse" : "/v1internal:generateContent";
  return `${base}${path}`;
}
