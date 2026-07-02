// URL/format normalizers for provider key validation. Pure string helpers extracted from
// validation.ts (god-file decomposition): no I/O, no side effects — they only shape base URLs
// and chat endpoints per provider format. Behavior is byte-identical to the original inline defs.
import {
  stripAnthropicMessagesSuffix,
  stripClaudeCodeCompatibleEndpointSuffix,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";
import { isOpenAICompatibleProvider } from "@/shared/constants/providers";

export const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);
export const GEMINI_LIKE_FORMATS = new Set(["gemini"]);

export function normalizeBaseUrl(baseUrl: string) {
  // Guard against a non-string baseUrl reaching .trim() / .replace() — see #2463
  // where NVIDIA NIM validation surfaced as `e.startsWith is not a function`
  // after the bundler renamed `baseUrl` to `e`. Any malformed providerSpecificData
  // (e.g. saved as object from a UI bug) would otherwise crash mid-validation.
  const value = typeof baseUrl === "string" ? baseUrl : "";
  return value.trim().replace(/\/$/, "");
}

export function normalizeAzureOpenAIBaseUrl(baseUrl: string) {
  return normalizeBaseUrl(baseUrl)
    .replace(/\/openai$/i, "")
    .replace(/\/openai\/deployments\/[^/]+\/chat\/completions.*$/i, "");
}

export function normalizeAnthropicBaseUrl(baseUrl: string) {
  return stripAnthropicMessagesSuffix(baseUrl || "");
}

export function normalizeClaudeCodeCompatibleBaseUrl(baseUrl: string) {
  return stripClaudeCodeCompatibleEndpointSuffix(baseUrl || "");
}

export function addModelsSuffix(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  const suffixes = ["/chat/completions", "/responses", "/chat", "/messages"];
  if (normalized.endsWith("/models")) {
    return normalized;
  }
  for (const suffix of suffixes) {
    if (normalized.endsWith(suffix)) {
      return `${normalized.slice(0, -suffix.length)}/models`;
    }
  }

  return `${normalized}/models`;
}

export function resolveBaseUrl(entry: any, providerSpecificData: any = {}) {
  if (providerSpecificData?.baseUrl) return normalizeBaseUrl(providerSpecificData.baseUrl);
  if (entry?.baseUrl) return normalizeBaseUrl(entry.baseUrl);
  return "";
}

export function resolveChatUrl(provider: string, baseUrl: string, providerSpecificData: any = {}) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  if (isOpenAICompatibleProvider(provider)) {
    if (providerSpecificData?.chatPath) {
      return `${normalized}${providerSpecificData.chatPath}`;
    }
    if (providerSpecificData?.apiType === "responses") {
      return `${normalized}/responses`;
    }
    return `${normalized}/chat/completions`;
  }

  if (
    normalized.endsWith("/chat/completions") ||
    normalized.endsWith("/responses") ||
    normalized.endsWith("/chat")
  ) {
    return normalized;
  }

  if (normalized.endsWith("/v1")) {
    return `${normalized}/chat/completions`;
  }

  return normalized;
}

export function normalizeHerokuChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  return normalized.endsWith("/v1/chat/completions")
    ? normalized
    : `${normalized}/v1/chat/completions`;
}

export function normalizeDatabricksChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  return normalized.endsWith("/chat/completions") ? normalized : `${normalized}/chat/completions`;
}

export function normalizeSnowflakeChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl)
    .replace(/\/cortex\/inference:complete$/, "")
    .replace(/\/api\/v2$/, "");
  if (!normalized) return "";
  return `${normalized}/api/v2/cortex/inference:complete`;
}

export function normalizeGigachatChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\/chat\/completions$/, "");
  if (!normalized) return "";
  return `${normalized}/chat/completions`;
}
