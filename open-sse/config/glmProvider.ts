import { ANTHROPIC_VERSION_HEADER } from "./anthropicHeaders.ts";

type JsonRecord = Record<string, unknown>;

export type GlmApiRegion = "international" | "china";
export type GlmTransport = "openai" | "anthropic";

export const GLM_DEFAULT_BASE_URLS = Object.freeze({
  international: "https://api.z.ai/api/coding/paas/v4/chat/completions",
  china: "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions",
});

export const GLM_ANTHROPIC_DEFAULT_BASE_URLS = Object.freeze({
  international: "https://api.z.ai/api/anthropic/v1/messages",
  china: "https://open.bigmodel.cn/api/anthropic/v1/messages",
});

export const GLM_SHARED_MODELS = Object.freeze([
  {
    id: "glm-5.1",
    name: "GLM 5.1",
    contextLength: 204800,
    maxOutputTokens: 131072,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-5",
    name: "GLM 5",
    contextLength: 200000,
    maxOutputTokens: 131072,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-5-turbo",
    name: "GLM 5 Turbo",
    contextLength: 200000,
    maxOutputTokens: 131072,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-4.7-flash",
    name: "GLM 4.7 Flash",
    contextLength: 200000,
    maxOutputTokens: 131072,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-4.7",
    name: "GLM 4.7",
    contextLength: 200000,
    maxOutputTokens: 131072,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-4.6v",
    name: "GLM 4.6V (Vision)",
    contextLength: 128000,
    maxOutputTokens: 32768,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "glm-4.6",
    name: "GLM 4.6",
    contextLength: 200000,
    maxOutputTokens: 32768,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-4.5v",
    name: "GLM 4.5V (Vision)",
    contextLength: 16000,
    maxOutputTokens: 32768,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "glm-4.5",
    name: "GLM 4.5",
    contextLength: 128000,
    maxOutputTokens: 32768,
    toolCalling: true,
    supportsReasoning: true,
  },
  {
    id: "glm-4.5-air",
    name: "GLM 4.5 Air",
    contextLength: 128000,
    maxOutputTokens: 32768,
    toolCalling: true,
    supportsReasoning: true,
  },
]);

export const GLM_MODELS_URLS = Object.freeze({
  international: "https://api.z.ai/api/coding/paas/v4/models",
  china: "https://open.bigmodel.cn/api/coding/paas/v4/models",
});

export const GLM_QUOTA_URLS = Object.freeze({
  international: "https://api.z.ai/api/monitor/usage/quota/limit",
  china: "https://open.bigmodel.cn/api/monitor/usage/quota/limit",
});

export const GLMT_TIMEOUT_MS = 900_000;

export const GLM_TIMEOUT_MS = 900_000;

export const GLM_REQUEST_DEFAULTS = Object.freeze({
  maxTokens: 16_384,
});

export const GLMT_REQUEST_DEFAULTS = Object.freeze({
  maxTokens: 65_536,
  temperature: 0.2,
  thinkingBudgetTokens: 24_576,
  thinkingType: "adaptive" as const,
});

export const GLM_COUNT_TOKENS_TIMEOUT_MS = 3_000;
export const GLM_CLAUDE_CODE_USER_AGENT = "claude-cli/2.1.137 (external, sdk-cli)";
export const GLM_ANTHROPIC_BETA = [
  "claude-code-20250219",
  "interleaved-thinking-2025-05-14",
  "context-management-2025-06-27",
  "prompt-caching-scope-2026-01-05",
  "advisor-tool-2026-03-01",
  "effort-2025-11-24",
].join(",");

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function splitUrlQueryAndHash(url: string): { base: string; suffix: string } {
  const match = url.match(/^([^?#]*)(.*)$/);
  return { base: match?.[1] ?? url, suffix: match?.[2] ?? "" };
}

export function getGlmApiRegion(providerSpecificData: unknown): GlmApiRegion {
  const data = asRecord(providerSpecificData);
  return data.apiRegion === "china" ? "china" : "international";
}

export function buildGlmModelsUrl(
  providerSpecificData: unknown,
  transport: GlmTransport = "openai",
  fallbackBaseUrl?: string | null
): string {
  const data = asRecord(providerSpecificData);
  const customModelsUrl = asString(data.modelsUrl);
  if (customModelsUrl) return customModelsUrl;

  if (transport === "anthropic") {
    return joinGlmBaseAndPath(
      getGlmAnthropicBaseUrl(providerSpecificData, fallbackBaseUrl),
      "/v1/models"
    );
  }

  const configuredBaseUrl = asString(data.baseUrl);
  if (configuredBaseUrl) {
    if (isAnthropicGlmBaseUrl(configuredBaseUrl)) {
      return GLM_MODELS_URLS[getGlmApiRegion(providerSpecificData)];
    }
    return joinGlmBaseAndPath(configuredBaseUrl, "/models");
  }
  return GLM_MODELS_URLS[getGlmApiRegion(providerSpecificData)];
}

export function getGlmQuotaUrl(providerSpecificData: unknown): string {
  return GLM_QUOTA_URLS[getGlmApiRegion(providerSpecificData)];
}

function stripKnownGlmEndpointSuffix(baseUrl: string): { base: string; suffix: string } {
  const parts = splitUrlQueryAndHash(baseUrl);
  const base = parts.base
    .replace(/\/+$/g, "")
    .replace(/\/(?:v\d+\/)?messages\/count_tokens$/i, "")
    .replace(/\/(?:v\d+\/)?messages$/i, "")
    .replace(/\/chat\/completions$/i, "")
    .replace(/\/models$/i, "");
  return { base, suffix: parts.suffix };
}

function joinGlmBaseAndPath(baseUrl: string, path: string): string {
  const { base, suffix } = stripKnownGlmEndpointSuffix(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const versionMatch = base.match(/\/v\d+$/i);
  if (
    versionMatch &&
    normalizedPath.toLowerCase().startsWith(`${versionMatch[0].toLowerCase()}/`)
  ) {
    return `${base}${normalizedPath.slice(versionMatch[0].length)}${suffix}`;
  }
  return `${base}${normalizedPath}${suffix}`;
}

function stripQueryAndTrailingSlash(baseUrl: string): string {
  return splitUrlQueryAndHash(baseUrl).base.replace(/\/+$/g, "");
}

function addBetaQuery(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set("beta", "true");
  return parsed.toString();
}

export function isAnthropicGlmBaseUrl(baseUrl: string): boolean {
  return /\/api\/anthropic(?:\/|$)/i.test(stripQueryAndTrailingSlash(baseUrl));
}

export function isCodingGlmBaseUrl(baseUrl: string): boolean {
  return /\/api\/coding\/paas\/v\d+(?:\/|$)/i.test(stripQueryAndTrailingSlash(baseUrl));
}

export function getGlmBaseUrl(
  providerSpecificData: unknown,
  fallbackBaseUrl?: string | null
): string {
  const data = asRecord(providerSpecificData);
  const configuredBaseUrl = asString(data.baseUrl);
  if (configuredBaseUrl) return configuredBaseUrl;
  const regionalBaseUrl =
    typeof fallbackBaseUrl === "string" &&
    fallbackBaseUrl.trim() &&
    isCodingGlmBaseUrl(fallbackBaseUrl)
      ? fallbackBaseUrl.trim()
      : GLM_DEFAULT_BASE_URLS[getGlmApiRegion(providerSpecificData)];
  if (regionalBaseUrl) return regionalBaseUrl;
  return typeof fallbackBaseUrl === "string" && fallbackBaseUrl.trim()
    ? fallbackBaseUrl.trim()
    : GLM_DEFAULT_BASE_URLS.international;
}

export function getGlmAnthropicBaseUrl(
  providerSpecificData: unknown,
  fallbackBaseUrl?: string | null
): string {
  const data = asRecord(providerSpecificData);
  const anthropicBaseUrl = asString(data.anthropicBaseUrl);
  if (anthropicBaseUrl) return anthropicBaseUrl;

  const configuredBaseUrl = asString(data.baseUrl);
  if (configuredBaseUrl) {
    if (isCodingGlmBaseUrl(configuredBaseUrl)) {
      return GLM_ANTHROPIC_DEFAULT_BASE_URLS[getGlmApiRegion(providerSpecificData)];
    }
    return configuredBaseUrl;
  }
  if (
    typeof fallbackBaseUrl === "string" &&
    fallbackBaseUrl.trim() &&
    isCodingGlmBaseUrl(fallbackBaseUrl)
  ) {
    return GLM_ANTHROPIC_DEFAULT_BASE_URLS[
      fallbackBaseUrl.includes("open.bigmodel.cn") ? "china" : getGlmApiRegion(providerSpecificData)
    ];
  }
  if (
    typeof fallbackBaseUrl === "string" &&
    fallbackBaseUrl.trim() &&
    !isCodingGlmBaseUrl(fallbackBaseUrl)
  ) {
    return fallbackBaseUrl.trim();
  }
  return GLM_ANTHROPIC_DEFAULT_BASE_URLS[getGlmApiRegion(providerSpecificData)];
}

export function getGlmPrimaryTransport(
  providerSpecificData: unknown,
  fallbackBaseUrl?: string | null
): GlmTransport {
  const data = asRecord(providerSpecificData);
  const configuredTransport = asString(data.primaryTransport);
  if (configuredTransport === "anthropic") return "anthropic";
  if (configuredTransport === "openai") return "openai";
  return isAnthropicGlmBaseUrl(getGlmBaseUrl(providerSpecificData, fallbackBaseUrl))
    ? "anthropic"
    : "openai";
}

export function getGlmTransport(providerSpecificData: unknown, fallbackBaseUrl?: string | null) {
  return getGlmPrimaryTransport(providerSpecificData, fallbackBaseUrl);
}

export function buildGlmChatUrl(
  providerSpecificData: unknown,
  transport: GlmTransport = "openai",
  fallbackBaseUrl?: string | null
): string {
  if (transport === "anthropic") {
    return buildGlmAnthropicMessagesUrl(providerSpecificData, fallbackBaseUrl);
  }
  return buildGlmOpenAIChatUrl(providerSpecificData, fallbackBaseUrl);
}

export function buildGlmOpenAIChatUrl(
  providerSpecificData: unknown,
  fallbackBaseUrl?: string | null
): string {
  const configuredBaseUrl = getGlmBaseUrl(providerSpecificData, fallbackBaseUrl);
  const baseUrl = isAnthropicGlmBaseUrl(configuredBaseUrl)
    ? GLM_DEFAULT_BASE_URLS[getGlmApiRegion(providerSpecificData)]
    : configuredBaseUrl;
  return joinGlmBaseAndPath(baseUrl, "/chat/completions");
}

export function buildGlmAnthropicMessagesUrl(
  providerSpecificData: unknown,
  fallbackBaseUrl?: string | null
): string {
  return addBetaQuery(
    joinGlmBaseAndPath(
      getGlmAnthropicBaseUrl(providerSpecificData, fallbackBaseUrl),
      "/v1/messages"
    )
  );
}

export function buildGlmCountTokensUrl(
  providerSpecificData: unknown,
  fallbackBaseUrl?: string | null
): string {
  return addBetaQuery(
    joinGlmBaseAndPath(
      getGlmAnthropicBaseUrl(providerSpecificData, fallbackBaseUrl),
      "/v1/messages/count_tokens"
    )
  );
}

export function buildGlmCodingHeaders(apiKey: string, stream = true): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

export function buildGlmBaseHeaders(apiKey: string, stream = true): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
    "x-api-key": apiKey,
    "anthropic-version": ANTHROPIC_VERSION_HEADER,
    "anthropic-beta": GLM_ANTHROPIC_BETA,
    "anthropic-dangerous-direct-browser-access": "true",
    "User-Agent": GLM_CLAUDE_CODE_USER_AGENT,
    "X-Stainless-Lang": "js",
    "X-Stainless-Runtime": "node",
    "X-Stainless-Retry-Count": "0",
    "accept-language": "*",
    "accept-encoding": "gzip, deflate, br, zstd",
    connection: "keep-alive",
  };
}
