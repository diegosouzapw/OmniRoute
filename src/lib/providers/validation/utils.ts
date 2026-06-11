
import { selectProxyForValidation } from "@omniroute/open-sse/services/proxyAutoSelector.ts";

import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
  joinBaseUrlAndPath,
  stripClaudeCodeCompatibleEndpointSuffix,
  stripAnthropicMessagesSuffix,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";

import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isLocalProvider,
  isOpenAICompatibleProvider,
  isSelfHostedChatProvider,
  providerAllowsOptionalApiKey,
} from "@/shared/constants/providers";

import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";

import { getProviderOutboundGuard, isPrivateHost } from "@/shared/network/outboundUrlGuard";




export const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);


export const GEMINI_LIKE_FORMATS = new Set(["gemini", "gemini-cli"]);



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



function getCustomUserAgent(providerSpecificData: any = {}) {
  if (typeof providerSpecificData?.customUserAgent !== "string") return null;
  const customUserAgent = providerSpecificData.customUserAgent.trim();
  return customUserAgent || null;
}



export function applyCustomUserAgent(headers: Record<string, string>, providerSpecificData: any = {}) {
  const customUserAgent = getCustomUserAgent(providerSpecificData);
  if (!customUserAgent) return headers;
  headers["User-Agent"] = customUserAgent;
  if ("user-agent" in headers) {
    headers["user-agent"] = customUserAgent;
  }
  return headers;
}



export function withCustomUserAgent(init: RequestInit, providerSpecificData: any = {}) {
  return {
    ...init,
    headers: applyCustomUserAgent(
      { ...((init.headers as Record<string, string> | undefined) || {}) },
      providerSpecificData
    ),
  };
}



/**
 * Direct HTTPS request utility that bypasses the global patched fetch.
 * Used for provider validation where the patched fetch has compatibility issues.
 * Uses safeOutboundFetch with bypassProxyPatch to use native Node.js fetch directly.
 */
export function directHttpsRequest(
  url: string,
  options: { method?: string; headers?: Record<string, string>; body?: string },
  timeoutMs: number
): Promise<{ status: number; ok: boolean; text: () => Promise<string> }> {
  return safeOutboundFetch(url, {
    method: options.method || "GET",
    headers: (options.headers || {}) as Record<string, string>,
    body: options.body,
    timeoutMs,
    bypassProxyPatch: true,
    allowRedirect: true,
    guard: "none",
    retry: false,
  }).then(async (response) => ({
    status: response.status,
    ok: response.ok,
    text: async () => await response.text(),
  }));
}



export function buildBearerHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return applyCustomUserAgent(headers, providerSpecificData);
}



export function buildRekaHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
    headers["X-Api-Key"] = apiKey;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}



export function buildClarifaiHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Key ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}



export function buildKeyHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Key ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}



export function buildTokenHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Token ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}



/**
 * Wrapped fetch call that auto-retries with a proxy when the direct connection
 * fails.  This happens transparently so individual validators don't need to
 * think about proxy fallback.
 */
async function fetchWithProxyFallback(
  url: string,
  init: RequestInit,
  presets: typeof SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
  isLocal: boolean
): Promise<Response> {
  try {
    return await safeOutboundFetch(url, {
      ...presets,
      guard: isLocal ? "none" : getProviderOutboundGuard(),
      ...init,
    });
  } catch (err: unknown) {
    // Only attempt proxy fallback for retryable errors (network / timeout)
    // and only when the target is not a local / LAN address.
    const fetchErr = err as SafeOutboundFetchError;
    const isNetworkIssue = fetchErr?.code === "NETWORK_ERROR" || fetchErr?.code === "TIMEOUT";
    const isRetryable = fetchErr?.isRetryable !== false;
    const isValidTarget = !isLocal && isRetryableProxyTarget(url);

    if (isLocal || !isNetworkIssue || !isRetryable) throw err;
    if (!isValidTarget) throw err;

    const proxyUrl = await selectProxyForValidation(url);
    if (!proxyUrl) throw err;

    return safeOutboundFetch(url, {
      ...presets,
      guard: isLocal ? "none" : getProviderOutboundGuard(),
      ...init,
      proxyConfig: proxyUrl,
    });
  }
}



export function isRetryableProxyTarget(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    // Never proxy-fallback to a private/link-local/metadata host. Delegates to
    // the canonical SSRF guard (covers 169.254, 0.0.0.0, 172.16/12, CGNAT,
    // IPv6 fc/fd/fe80, .internal — gaps the previous inline check missed).
    return !isPrivateHost(hostname);
  } catch {
    return false;
  }
}



export async function validationRead(url: string, init: RequestInit, isLocal: boolean = false) {
  return fetchWithProxyFallback(url, init, SAFE_OUTBOUND_FETCH_PRESETS.validationRead, isLocal);
}



export async function validationWrite(url: string, init: RequestInit, isLocal: boolean = false) {
  return fetchWithProxyFallback(url, init, SAFE_OUTBOUND_FETCH_PRESETS.validationWrite, isLocal);
}



export function toValidationErrorResult(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "Validation failed");
  const statusCode = getSafeOutboundFetchErrorStatus(error);

  return {
    valid: false,
    error: message || "Validation failed",
    unsupported: false as const,
    ...(statusCode ? { statusCode } : {}),
    ...(error instanceof SafeOutboundFetchError && error.code === "TIMEOUT"
      ? { timeout: true }
      : {}),
    ...(statusCode === 503 ? { securityBlocked: true } : {}),
  };
}

