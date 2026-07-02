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
import type {
  ProviderModelCapabilities,
  ProviderModelCompatConfig,
} from "@/shared/types/modelConfig";

// ── Types ─────────────────────────────────────────────────────────────────

export interface RegistryModel {
  id: string;
  name: string;
  capabilities?: ProviderModelCapabilities;
  compat?: ProviderModelCompatConfig;
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
  /**
   * When true, the provider rejects non-streaming requests (HTTP 400).
   * resolveStreamFlag will keep streaming even when the client requests JSON;
   * OmniRoute accumulates the stream and converts it to a JSON body for the client. (#2081)
   */
  forceStream?: boolean;
  /**
   * Literal API key sent as the bearer token when the request has no real
   * credential (synthetic noauth fallback). Lets a primarily-authenticated
   * provider expose its free tier anonymously: e.g. Kilo's gateway accepts
   * `Authorization: Bearer anonymous` for its free models (#4019). Only the
   * DefaultExecutor honors it, and only when no effectiveKey/accessToken exists,
   * so the authenticated path is never affected.
   */
  anonymousApiKey?: string;
}

/**
 * Build a standard OpenAI-compatible provider registry entry.
 * Eliminates the 4-field boilerplate (format, executor, authType, authHeader)
 * repeated across 40+ provider files.
 */
export function buildOpenAiCompatibleRegistryEntry(
  overrides: Pick<RegistryEntry, "id"> &
    Partial<Omit<RegistryEntry, "id" | "format" | "executor" | "authType" | "authHeader">>
): RegistryEntry {
  return {
    format: "openai",
    executor: "default",
    authType: "apikey",
    authHeader: "bearer",
    ...overrides,
  } as RegistryEntry;
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

export {
  KIMI_K27_MODELS,
  KIMI_CODING_SHARED,
  buildModels,
  ALIBABA_DASHSCOPE_MODELS,
  GPT_5_5_CONTEXT_LENGTH,
  GPT_5_5_CODEX_CAPABILITIES,
  GPT_5_4_CODEX_CAPABILITIES,
  CHAT_OPENAI_COMPAT_MODELS,
} from "./sharedModels.ts";

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
