import { randomUUID } from "node:crypto";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
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
import {
  buildGrokCookieHeader,
  buildQwenCookieHeader,
  extractCookieValue,
  extractQwenToken,
  normalizeSessionCookieHeader,
} from "@/lib/providers/webCookieAuth";
import { buildJulesApiUrl } from "@/lib/cloudAgent/julesApi.ts";
import { resolveNvidiaValidationModel } from "@/lib/providers/nvidiaValidationModel";
import { getGigachatAccessToken } from "@omniroute/open-sse/services/gigachatAuth.ts";
import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";
import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiChatUrl,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";
import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
  isBedrockNativeAuthError,
} from "@omniroute/open-sse/services/bedrock.ts";
import {
  DATAROBOT_DEFAULT_BASE_URL,
  buildDataRobotCatalogUrl,
  buildDataRobotChatUrl,
  isDataRobotDeploymentUrl,
} from "@omniroute/open-sse/config/datarobot.ts";
import {
  OCI_DEFAULT_BASE_URL,
  buildOciChatUrl,
  buildOciModelsUrl,
} from "@omniroute/open-sse/config/oci.ts";
import {
  SAP_DEFAULT_BASE_URL,
  buildSapChatUrl,
  buildSapModelsUrl,
  getSapResourceGroup,
  isSapDeploymentUrl,
} from "@omniroute/open-sse/config/sap.ts";
import {
  WATSONX_DEFAULT_BASE_URL,
  buildWatsonxChatUrl,
  buildWatsonxModelsUrl,
} from "@omniroute/open-sse/config/watsonx.ts";
import {
  buildRunwayApiUrl,
  buildRunwayHeaders,
  normalizeRunwayBaseUrl,
} from "@omniroute/open-sse/config/runway.ts";
import {
  buildMaritalkChatUrl,
  buildMaritalkModelsUrl,
} from "@omniroute/open-sse/config/maritalk.ts";
import { signAwsRequest } from "@omniroute/open-sse/utils/awsSigV4.ts";
import { validateImageProviderApiKey } from "@/lib/providers/imageValidation";

const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);
const GEMINI_LIKE_FORMATS = new Set(["gemini", "gemini-cli"]);

function normalizeBaseUrl(baseUrl: string) {
  // Guard against a non-string baseUrl reaching .trim() / .replace() — see #2463
  // where NVIDIA NIM validation surfaced as `e.startsWith is not a function`
  // after the bundler renamed `baseUrl` to `e`. Any malformed providerSpecificData
  // (e.g. saved as object from a UI bug) would otherwise crash mid-validation.
  const value = typeof baseUrl === "string" ? baseUrl : "";
  return value.trim().replace(/\/$/, "");
}

function normalizeAzureOpenAIBaseUrl(baseUrl: string) {
  return normalizeBaseUrl(baseUrl)
    .replace(/\/openai$/i, "")
    .replace(/\/openai\/deployments\/[^/]+\/chat\/completions.*$/i, "");
}

function normalizeAnthropicBaseUrl(baseUrl: string) {
  return stripAnthropicMessagesSuffix(baseUrl || "");
}

function normalizeClaudeCodeCompatibleBaseUrl(baseUrl: string) {
  return stripClaudeCodeCompatibleEndpointSuffix(baseUrl || "");
}

function addModelsSuffix(baseUrl: string) {
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

function resolveBaseUrl(entry: any, providerSpecificData: any = {}) {
  if (providerSpecificData?.baseUrl) return normalizeBaseUrl(providerSpecificData.baseUrl);
  if (entry?.baseUrl) return normalizeBaseUrl(entry.baseUrl);
  return "";
}

function resolveChatUrl(provider: string, baseUrl: string, providerSpecificData: any = {}) {
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

function normalizeHerokuChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  return normalized.endsWith("/v1/chat/completions")
    ? normalized
    : `${normalized}/v1/chat/completions`;
}

function normalizeDatabricksChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  return normalized.endsWith("/chat/completions") ? normalized : `${normalized}/chat/completions`;
}

function normalizeSnowflakeChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl)
    .replace(/\/cortex\/inference:complete$/, "")
    .replace(/\/api\/v2$/, "");
  if (!normalized) return "";
  return `${normalized}/api/v2/cortex/inference:complete`;
}

function normalizeGigachatChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\/chat\/completions$/, "");
  if (!normalized) return "";
  return `${normalized}/chat/completions`;
}

function getCustomUserAgent(providerSpecificData: any = {}) {
  if (typeof providerSpecificData?.customUserAgent !== "string") return null;
  const customUserAgent = providerSpecificData.customUserAgent.trim();
  return customUserAgent || null;
}

function applyCustomUserAgent(headers: Record<string, string>, providerSpecificData: any = {}) {
  const customUserAgent = getCustomUserAgent(providerSpecificData);
  if (!customUserAgent) return headers;
  headers["User-Agent"] = customUserAgent;
  if ("user-agent" in headers) {
    headers["user-agent"] = customUserAgent;
  }
  return headers;
}

function withCustomUserAgent(init: RequestInit, providerSpecificData: any = {}) {
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
function directHttpsRequest(
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

function buildBearerHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return applyCustomUserAgent(headers, providerSpecificData);
}

function buildRekaHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
    headers["X-Api-Key"] = apiKey;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

function buildClarifaiHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Key ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

function buildKeyHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Key ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

function buildTokenHeaders(apiKey: string, providerSpecificData: any = {}) {
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

async function validationRead(url: string, init: RequestInit, isLocal: boolean = false) {
  return fetchWithProxyFallback(url, init, SAFE_OUTBOUND_FETCH_PRESETS.validationRead, isLocal);
}

async function validationWrite(url: string, init: RequestInit, isLocal: boolean = false) {
  return fetchWithProxyFallback(url, init, SAFE_OUTBOUND_FETCH_PRESETS.validationWrite, isLocal);
}

// A validation failure should only be flagged `securityBlocked` (which the route
// surfaces as a `provider.validation.ssrf_blocked` audit event + a security warning in
// the UI) when it is a GENUINE SSRF/guard block — not for every outbound-guard 503.
// A blocked redirect (REDIRECT_BLOCKED) to a PUBLIC host is benign: the redirect was
// never followed, so no SSRF occurred. Web-cookie providers like qwen-web answer their
// probe with a 307 to a public host, which used to be mislabeled as an SSRF block
// (#3288 / #3758). Only treat a blocked redirect as a security event when its target is
// a private/internal host.
export function isSecurityBlockError(error: unknown): boolean {
  if (!(error instanceof SafeOutboundFetchError)) return false;
  if (error.code === "URL_GUARD_BLOCKED" || error.code === "INVALID_URL") return true;
  if (error.code === "REDIRECT_BLOCKED") {
    if (!error.location) return false;
    try {
      return isPrivateHost(new URL(error.location, error.url).hostname);
    } catch {
      return false;
    }
  }
  return false;
}

function toValidationErrorResult(error: unknown) {
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
    ...(isSecurityBlockError(error) ? { securityBlocked: true } : {}),
  };
}

async function validateBedrockProvider({ apiKey, providerSpecificData = {} }: any) {
  if (!apiKey) {
    return { valid: false, error: "Provider and API key required" };
  }

  try {
    const discovery = await discoverBedrockNativeModels({
      apiKey,
      providerSpecificData,
      fetcher: (url, init) => validationRead(url, init),
    });
    return {
      valid: true,
      error: null,
      method: "bedrock_native_models",
      warning: discovery.warnings[0] || null,
    };
  } catch (error: any) {
    if (isBedrockNativeAuthError(error)) {
      return { valid: false, error: "Invalid API key" };
    }
    if (isBedrockNativeApiError(error)) {
      if (error.status === 429) {
        return {
          valid: true,
          error: null,
          warning: "Bedrock accepted the key but model discovery is rate limited",
          method: "bedrock_native_models",
        };
      }
      if (typeof error.status === "number" && error.status >= 500) {
        return { valid: false, error: `Provider unavailable (${error.status})` };
      }
      if (typeof error.status === "number") {
        return { valid: false, error: `Bedrock validation failed: ${error.status}` };
      }
    }
    return toValidationErrorResult(error);
  }
}

async function validateOpenAILikeProvider({
  provider = "openai",
  apiKey,
  baseUrl,
  headers = {},
  modelId = "gpt-3.5-turbo",
  providerSpecificData,
  modelsUrl = "",
  isLocal = false,
}: any) {
  try {
    // Guard against a non-string modelsUrl reaching .trim()/.startsWith() — a malformed
    // providerSpecificData / registry value would otherwise throw a TypeError mid-validation
    // ("trim is not a function" / "startsWith is not a function"). See #2463 class.
    const customModelsUrl = (typeof modelsUrl === "string" ? modelsUrl.trim() : "") || "";
    const endpointUrl = customModelsUrl
      ? customModelsUrl.startsWith("http")
        ? customModelsUrl
        : `${baseUrl.replace(/\/+$/, "")}/${customModelsUrl.replace(/^\/+/, "")}`
      : // addModelsSuffix strips a trailing /chat/completions before appending /models,
        // so an OpenAI-style baseUrl validates against /v1/models, not /v1/chat/completions/models.
        addModelsSuffix(baseUrl);

    const requestUrl =
      typeof providerSpecificData?.modelsUrl === "string" &&
      providerSpecificData.modelsUrl.trim() !== ""
        ? providerSpecificData.modelsUrl.trim()
        : endpointUrl;

    const response = await validationRead(
      requestUrl,
      {
        headers: {
          ...headers,
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
      },
      isLocal
    );

    if (response.ok) {
      return { valid: true, error: null };
    }

    if (response.status === 401) {
      return { valid: false, error: "Invalid API key" };
    }

    // #2929: A 403 on the models endpoint is not always a bad key. Some providers
    // (e.g. Fireworks Fire Pass `fpk_*` keys) return "...not authorized for this
    // route." on /models while still serving chat. Fall through to the chat probe
    // for such route-restriction 403s instead of declaring the key invalid.
    if (response.status === 403) {
      const forbiddenBody = await response.text().catch(() => "");
      if (!/not authorized for this route/i.test(forbiddenBody)) {
        return { valid: false, error: "Invalid API key" };
      }
    }

    const chatUrl = resolveChatUrl(provider, baseUrl, providerSpecificData);
    if (!chatUrl) {
      return { valid: false, error: `Validation failed: ${response.status}` };
    }

    const testModelId = (providerSpecificData as any)?.validationModelId || modelId;

    const testBody = {
      model: testModelId,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    };

    const chatRes = await validationWrite(
      chatUrl,
      {
        method: "POST",
        headers: {
          ...headers,
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify(testBody),
      },
      isLocal
    );

    if (chatRes.ok) {
      return { valid: true, error: null };
    }

    if (chatRes.status === 401 || chatRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (chatRes.status === 404 || chatRes.status === 405) {
      return { valid: false, error: "Provider validation endpoint not supported" };
    }

    if (chatRes.status >= 500) {
      return { valid: false, error: `Provider unavailable (${chatRes.status})` };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateDirectChatProvider({
  url,
  headers,
  body,
  providerSpecificData = {},
  isLocal = false,
}: any) {
  try {
    const response = await validationWrite(
      url,
      {
        method: "POST",
        headers: applyCustomUserAgent(headers, providerSpecificData),
        body: JSON.stringify(body),
      },
      isLocal
    );

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateCommandCodeProvider({ apiKey, providerSpecificData = {} }: any) {
  const entry = getRegistryEntry("command-code");
  const baseUrl = normalizeBaseUrl(entry?.baseUrl || "https://api.commandcode.ai");
  const chatPath = entry?.chatPath || "/alpha/generate";
  const url = `${baseUrl}${chatPath.startsWith("/") ? chatPath : `/${chatPath}`}`;
  const validationModelId =
    providerSpecificData?.validationModelId ||
    entry?.models?.find((model) => model.id === "deepseek/deepseek-v4-flash")?.id ||
    "deepseek/deepseek-v4-flash";
  const { COMMAND_CODE_VERSION } = await import("@omniroute/open-sse/executors/commandCode.ts");

  return validateDirectChatProvider({
    url,
    providerSpecificData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "x-command-code-version": COMMAND_CODE_VERSION,
      "x-cli-environment": "external",
      "x-project-slug": "pi-cc",
      "x-taste-learning": "false",
      "x-co-flag": "false",
      "x-session-id": randomUUID(),
    },
    body: {
      config: {
        workingDir: "/workspace",
        date: new Date().toISOString().slice(0, 10),
        environment: "external",
        structure: [],
        isGitRepo: false,
        currentBranch: "",
        mainBranch: "",
        gitStatus: "",
        recentCommits: [],
      },
      memory: "",
      taste: "",
      skills: "",
      permissionMode: "standard",
      params: {
        model: validationModelId,
        messages: [{ role: "user", content: "test" }],
        tools: [],
        system: "",
        max_tokens: 1,
        stream: true,
      },
    },
  });
}

async function validateClarifaiProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) || "https://api.clarifai.com/v2/ext/openai/v1";
  const modelsUrl = addModelsSuffix(baseUrl);

  try {
    const modelsRes = await validationRead(modelsUrl, {
      method: "GET",
      headers: buildClarifaiHeaders(apiKey, providerSpecificData),
    });

    if (modelsRes.ok) {
      return { valid: true, error: null, method: "clarifai_models" };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    const chatUrl = resolveChatUrl("clarifai", baseUrl, providerSpecificData);
    const chatRes = await validationWrite(chatUrl, {
      method: "POST",
      headers: buildClarifaiHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model:
          providerSpecificData?.validationModelId || "openai/chat-completion/models/gpt-oss-120b",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (chatRes.ok || chatRes.status === 400 || chatRes.status === 422 || chatRes.status === 429) {
      return { valid: true, error: null, method: "clarifai_chat_probe" };
    }

    if (chatRes.status === 401 || chatRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (chatRes.status === 404 || chatRes.status === 405) {
      return { valid: false, error: "Provider validation endpoint not supported" };
    }

    if (chatRes.status >= 500) {
      return { valid: false, error: `Provider unavailable (${chatRes.status})` };
    }

    return { valid: true, error: null, method: "clarifai_chat_probe" };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateEmbeddingApiProvider({
  apiKey,
  providerSpecificData = {},
  url,
  modelId,
}: any) {
  if (!url) {
    return { valid: false, error: "Missing embedding endpoint" };
  }

  try {
    const response = await validationWrite(url, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: providerSpecificData?.validationModelId || modelId,
        input: ["test"],
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateRerankApiProvider({ apiKey, providerSpecificData = {}, url, modelId }: any) {
  if (!url) {
    return { valid: false, error: "Missing rerank endpoint" };
  }

  try {
    const response = await validationWrite(url, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: providerSpecificData?.validationModelId || modelId,
        query: "test",
        documents: ["test"],
        top_n: 1,
        return_documents: false,
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateAnthropicLikeProvider({
  apiKey,
  baseUrl,
  modelId = "claude-3-5-sonnet-20240620",
  headers = {},
  providerSpecificData = {},
  isLocal = false,
}: any) {
  try {
    if (!baseUrl) {
      return { valid: false, error: "Missing base URL" };
    }

    if (typeof apiKey === "string" && apiKey.startsWith("sk-ant-oat")) {
      return validateClaudeOAuthInline({ apiKey, modelId, providerSpecificData });
    }

    const probeUrl =
      typeof providerSpecificData?.modelsUrl === "string" &&
      providerSpecificData.modelsUrl.trim() !== ""
        ? providerSpecificData.modelsUrl.trim()
        : `${baseUrl}/models`;

    // Best-effort /models probe. It must not fail validation: canonical Claude
    // base URLs can already include a path/query (…/messages?beta=true).
    try {
      await validationRead(
        probeUrl,
        {
          headers: {
            "anthropic-version": "2023-06-01",
            ...headers,
          },
        },
        isLocal
      );
    } catch {
      // ignore probe failures
    }

    const requestUrl =
      typeof providerSpecificData?.modelsUrl === "string" &&
      providerSpecificData.modelsUrl.trim() !== ""
        ? providerSpecificData.modelsUrl.trim()
        : "";

    if (requestUrl) {
      const response = await validationRead(
        requestUrl,
        {
          headers: {
            "anthropic-version": "2023-06-01",
            ...headers,
          },
        },
        isLocal
      );

      if (response.status === 401 || response.status === 403) {
        return { valid: false, error: "Invalid API key" };
      }
    }

    const requestHeaders = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        ...headers,
      },
      providerSpecificData
    );

    if (!requestHeaders["x-api-key"] && !requestHeaders["X-API-Key"]) {
      requestHeaders["x-api-key"] = apiKey;
    }

    if (!requestHeaders["anthropic-version"] && !requestHeaders["Anthropic-Version"]) {
      requestHeaders["anthropic-version"] = "2023-06-01";
    }

    const testModelId =
      providerSpecificData?.validationModelId || modelId || "claude-3-5-sonnet-20241022";

    const chatResponse = await validationWrite(
      baseUrl,
      {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          model: testModelId,
          max_tokens: 1,
          messages: [{ role: "user", content: "test" }],
        }),
      },
      isLocal
    );

    if (chatResponse.status === 401 || chatResponse.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateClaudeOAuthInline({
  apiKey,
  modelId,
  providerSpecificData = {},
}: {
  apiKey: string;
  modelId: string | null | undefined;
  providerSpecificData?: Record<string, unknown>;
}) {
  const testModelId =
    providerSpecificData?.validationModelId || modelId || "claude-haiku-4-5-20251001";

  try {
    const { getExecutor } = await import("@omniroute/open-sse/executors/index.ts");
    const { response } = await getExecutor("claude").execute({
      model: testModelId,
      body: {
        model: testModelId,
        max_tokens: 1,
        messages: [{ role: "user", content: "test" }],
      },
      stream: false,
      credentials: { accessToken: apiKey, providerSpecificData },
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid OAuth token" };
    }
    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateGeminiLikeProvider({
  apiKey,
  baseUrl,
  providerSpecificData = {},
  authType = "query",
  isLocal = false,
}: any) {
  try {
    if (!baseUrl) {
      return { valid: false, error: "Missing base URL" };
    }

    const normalizedAuthType = String(authType || "query").toLowerCase();
    // Strip a trailing /models before appending — the default Gemini registry baseUrl is
    // `.../v1beta/models` (for the chat urlBuilder), so naively appending /models produced
    // `.../v1beta/models/models` → upstream 404 on connection validation (#2545).
    const baseForModels = String(baseUrl)
      .replace(/\/models\/?$/, "")
      .replace(/\/$/, "");
    const requestUrl =
      typeof providerSpecificData?.modelsUrl === "string" &&
      providerSpecificData.modelsUrl.trim() !== ""
        ? providerSpecificData.modelsUrl.trim()
        : `${baseForModels}/models`;

    // Use the correct auth header based on provider config:
    // - gemini / gemini-cli (API key): x-goog-api-key
    // - gemini-cli (OAuth): Bearer token
    const headers: Record<string, string> = {};
    let urlWithKey = requestUrl;

    if (typeof apiKey === "string" && apiKey.startsWith("ya29.")) {
      // A Google OAuth access token (ya29.*) must use Bearer auth even when the
      // connection is configured as an API-key provider — gemini-cli OAuth stores the
      // access token in the apiKey field. Checked first so authType "apikey"/"header"
      // doesn't shadow it with x-goog-api-key.
      headers["Authorization"] = `Bearer ${apiKey}`;
    } else if (normalizedAuthType === "header" || normalizedAuthType === "apikey") {
      headers["x-goog-api-key"] = apiKey;
    } else if (normalizedAuthType === "oauth" || normalizedAuthType === "bearer") {
      headers["Authorization"] = `Bearer ${apiKey}`;
    } else if (normalizedAuthType === "query") {
      urlWithKey = `${requestUrl}?key=${encodeURIComponent(apiKey)}`;
    }

    applyCustomUserAgent(headers, providerSpecificData);

    const response = await validationRead(
      urlWithKey,
      {
        headers,
      },
      isLocal
    );

    if (response.ok) {
      return { valid: true, error: null };
    }

    if (response.status === 429) {
      return { valid: true, error: null };
    }

    if (response.status === 400 || response.status === 401 || response.status === 403) {
      const isAuthError = (body: any) => {
        const message = (body?.error?.message || "").toLowerCase();
        const reason = body?.error?.details?.[0]?.reason || "";
        const status = body?.error?.status || "";
        const authPatterns = [
          "api key not valid",
          "api key expired",
          "api key invalid",
          "API_KEY_INVALID",
          "API_KEY_EXPIRED",
          "PERMISSION_DENIED",
          "UNAUTHENTICATED",
        ];
        return authPatterns.some(
          (p) => message.includes(p.toLowerCase()) || reason === p || status === p
        );
      };

      try {
        const body = await response.json();
        if (isAuthError(body)) {
          return { valid: false, error: "Invalid API key" };
        }
        if (response.status === 401 || response.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
      } catch {
        if (response.status === 401 || response.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        return { valid: false, error: "Invalid API key" };
      }
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── Specialty providers (non-standard APIs) ──

async function validateDeepgramProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const response = await validationRead("https://api.deepgram.com/v1/auth/token", {
      method: "GET",
      headers: applyCustomUserAgent({ Authorization: `Token ${apiKey}` }, providerSpecificData),
    });
    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateAssemblyAIProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const response = await validationRead("https://api.assemblyai.com/v2/transcript?limit=1", {
      method: "GET",
      headers: applyCustomUserAgent(
        {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
        providerSpecificData
      ),
    });
    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateElevenLabsProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // Lightweight auth check endpoint
    const response = await validationRead("https://api.elevenlabs.io/v1/voices", {
      method: "GET",
      headers: applyCustomUserAgent(
        {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        providerSpecificData
      ),
    });

    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateInworldProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // Inworld TTS lacks a simple key-introspection endpoint.
    // Send a minimal synth request and treat non-auth 4xx as auth-pass.
    const response = await validationWrite("https://api.inworld.ai/tts/v1/voice", {
      method: "POST",
      headers: applyCustomUserAgent(
        {
          Authorization: `Basic ${apiKey}`,
          "Content-Type": "application/json",
        },
        providerSpecificData
      ),
      body: JSON.stringify({
        text: "test",
        modelId: "inworld-tts-1.5-mini",
        audioConfig: { audioEncoding: "MP3" },
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    // Any other response indicates auth is accepted (payload/model may still be wrong)
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateKieProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // Use credit check endpoint as requested by user based on Kie.ai docs.
    const response = await validationRead("https://api.kie.ai/api/v1/chat/credit", {
      method: "GET",
      headers: applyCustomUserAgent(
        {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        providerSpecificData
      ),
    });

    if (response.ok) {
      return { valid: true, error: null };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid Kie.ai API key" };
    }

    // Fallback: if credits endpoint is 404/not supported, try minimal chat probe.
    const chatRes = await validationWrite("https://api.kie.ai/api/v1/chat/completions", {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: providerSpecificData.validationModelId || "gpt-4o-mini",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (
      chatRes.ok ||
      (chatRes.status >= 400 &&
        chatRes.status < 500 &&
        chatRes.status !== 401 &&
        chatRes.status !== 403)
    ) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Validation failed: ${chatRes.status}` };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}

function getAwsProviderString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getAwsPollyRegion(providerSpecificData: any = {}) {
  return (
    getAwsProviderString(providerSpecificData.region) ||
    getAwsProviderString(providerSpecificData.awsRegion) ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    "us-east-1"
  );
}

function getAwsPollyBaseUrl(providerSpecificData: any = {}, region: string) {
  return (
    getAwsProviderString(providerSpecificData.baseUrl) || `https://polly.${region}.amazonaws.com`
  ).replace(/\/+$/, "");
}

async function validateAwsPollyProvider({ apiKey, providerSpecificData = {} }: any) {
  const accessKeyId =
    getAwsProviderString(providerSpecificData.accessKeyId) ||
    getAwsProviderString(providerSpecificData.awsAccessKeyId);
  const secretAccessKey = getAwsProviderString(apiKey);

  if (!accessKeyId) {
    return { valid: false, error: "Missing AWS accessKeyId" };
  }
  if (!secretAccessKey) {
    return { valid: false, error: "Missing AWS Secret Access Key" };
  }

  const region = getAwsPollyRegion(providerSpecificData);
  const baseUrl = getAwsPollyBaseUrl(providerSpecificData, region).replace(/\/v1\/voices$/i, "");
  const url = `${baseUrl}/v1/voices?Engine=standard`;

  try {
    const signedHeaders = signAwsRequest({
      method: "GET",
      url,
      region,
      service: "polly",
      credentials: {
        accessKeyId,
        secretAccessKey,
        sessionToken:
          getAwsProviderString(providerSpecificData.sessionToken) ||
          getAwsProviderString(providerSpecificData.awsSessionToken),
      },
    });

    const response = await validationRead(url, {
      method: "GET",
      headers: applyCustomUserAgent(signedHeaders, providerSpecificData),
    });

    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateBailianCodingPlanProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const rawBaseUrl =
      normalizeBaseUrl(providerSpecificData.baseUrl) ||
      "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1";
    const baseUrl = rawBaseUrl.endsWith("/messages")
      ? rawBaseUrl.slice(0, -"/messages".length)
      : rawBaseUrl;
    // bailian-coding-plan uses DashScope Anthropic-compatible messages endpoint
    // It does NOT expose /v1/models — use messages probe directly
    const messagesUrl = `${baseUrl}/messages`;

    const response = await validationWrite(messagesUrl, {
      method: "POST",
      headers: applyCustomUserAgent(
        {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        providerSpecificData
      ),
      body: JSON.stringify({
        model: "qwen3-coder-plus",
        max_tokens: 1,
        messages: [{ role: "user", content: "test" }],
      }),
    });

    // 401/403 => invalid key
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    // Non-auth 4xx (e.g., 400 bad request) means auth passed but request was malformed
    if (response.status >= 400 && response.status < 500) {
      return { valid: true, error: null };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateHerokuProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  return validateDirectChatProvider({
    url: normalizeHerokuChatUrl(baseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || "claude-4-sonnet",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

async function validateDatabricksProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  return validateDirectChatProvider({
    url: normalizeDatabricksChatUrl(baseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || "databricks-meta-llama-3-3-70b-instruct",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

async function validateDataRobotProvider({ apiKey, providerSpecificData = {} }: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) || DATAROBOT_DEFAULT_BASE_URL;

  if (isDataRobotDeploymentUrl(configuredBaseUrl)) {
    return validateDirectChatProvider({
      url: buildDataRobotChatUrl(configuredBaseUrl),
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: {
        model: providerSpecificData.validationModelId || "datarobot-deployed-llm",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      },
      providerSpecificData,
    });
  }

  const catalogUrl = buildDataRobotCatalogUrl(configuredBaseUrl);
  if (!catalogUrl) {
    return { valid: false, error: "Invalid DataRobot base URL" };
  }

  try {
    const response = await validationRead(catalogUrl, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    if (response.ok) {
      return { valid: true, error: null, method: "gateway_catalog" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "gateway_catalog",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (response.status >= 400 && response.status < 500) {
      return { valid: true, error: null, method: "gateway_catalog" };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateSnowflakeProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const usesProgrammaticAccessToken = typeof apiKey === "string" && apiKey.startsWith("pat/");
  return validateDirectChatProvider({
    url: normalizeSnowflakeChatUrl(baseUrl),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usesProgrammaticAccessToken ? apiKey.slice(4) : apiKey}`,
      "X-Snowflake-Authorization-Token-Type": usesProgrammaticAccessToken
        ? "PROGRAMMATIC_ACCESS_TOKEN"
        : "KEYPAIR_JWT",
    },
    body: {
      model: providerSpecificData.validationModelId || "llama3.3-70b",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

async function validateGigachatProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) || "https://gigachat.devices.sberbank.ru/api/v1";

  let token;
  try {
    token = await getGigachatAccessToken({ credentials: apiKey });
  } catch (error: any) {
    if (String(error?.message || "").match(/\b(401|403)\b/)) {
      return { valid: false, error: "Invalid API key" };
    }
    return toValidationErrorResult(error);
  }

  return validateDirectChatProvider({
    url: normalizeGigachatChatUrl(baseUrl),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
      Accept: "application/json",
    },
    body: {
      model: providerSpecificData.validationModelId || "GigaChat-2-Pro",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

async function validateAzureOpenAIProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!rawBaseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const baseUrl = normalizeAzureOpenAIBaseUrl(rawBaseUrl);
  const apiVersion =
    typeof providerSpecificData.validationApiVersion === "string" &&
    providerSpecificData.validationApiVersion.trim()
      ? providerSpecificData.validationApiVersion.trim()
      : "2024-12-01-preview";
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    providerSpecificData
  );
  const encodedVersion = encodeURIComponent(apiVersion);

  for (const probeUrl of [
    `${baseUrl}/openai/deployments?api-version=${encodedVersion}`,
    `${baseUrl}/openai/models?api-version=${encodedVersion}`,
  ]) {
    try {
      const response = await validationRead(probeUrl, { method: "GET", headers });
      if (response.ok) {
        return { valid: true, error: null, method: "azure_probe" };
      }
      if (response.status === 401 || response.status === 403) {
        return { valid: false, error: "Invalid API key" };
      }
      if (response.status === 400 || response.status === 404 || response.status === 405) {
        continue;
      }
      if (response.status === 429) {
        return {
          valid: true,
          error: null,
          method: "azure_probe",
          warning: "Rate limited, but credentials are valid",
        };
      }
      if (response.status >= 500) {
        return { valid: false, error: `Provider unavailable (${response.status})` };
      }
    } catch (error) {
      return toValidationErrorResult(error);
    }
  }

  const deploymentId =
    typeof providerSpecificData.validationModelId === "string"
      ? providerSpecificData.validationModelId.trim()
      : "";

  if (!deploymentId) {
    return {
      valid: true,
      error: null,
      warning:
        "Azure key accepted, but no deployment name was provided for a chat probe. Set Model ID to validate a specific deployment.",
    };
  }

  const chatUrl = `${baseUrl}/openai/deployments/${encodeURIComponent(deploymentId)}/chat/completions?api-version=${encodedVersion}`;
  const response = await validationWrite(chatUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: deploymentId,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    }),
  });

  if (
    response.ok ||
    response.status === 400 ||
    response.status === 422 ||
    response.status === 429
  ) {
    return { valid: true, error: null, method: "chat_probe" };
  }
  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }
  if (response.status === 404) {
    return {
      valid: true,
      error: null,
      method: "chat_probe",
      warning: "Azure credentials are valid, but the requested deployment was not found.",
    };
  }
  if (response.status >= 500) {
    return { valid: false, error: `Provider unavailable (${response.status})` };
  }
  return { valid: false, error: `Validation failed: ${response.status}` };
}

async function validateAzureAiProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || AZURE_AI_DEFAULT_BASE_URL;
  const modelsUrl = buildAzureAiModelsUrl(rawBaseUrl);
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(modelsUrl, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "azure_ai_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "azure_ai_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to chat probe when /models is unavailable.
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string"
      ? providerSpecificData.validationModelId.trim()
      : "";

  if (!validationModelId) {
    return {
      valid: false,
      error: "Endpoint /models unavailable. Provide a Model ID to validate via /chat/completions.",
    };
  }

  const chatUrl = buildAzureAiChatUrl(
    rawBaseUrl,
    providerSpecificData.apiType === "responses" ? "responses" : "chat"
  );
  const chatBody =
    providerSpecificData.apiType === "responses"
      ? {
          model: validationModelId,
          input: "test",
          max_output_tokens: 1,
        }
      : {
          model: validationModelId,
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        };

  try {
    const response = await validationWrite(chatUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(chatBody),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null, method: "azure_ai_chat_probe" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Azure AI Foundry" };
}

async function validateWatsonxProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || WATSONX_DEFAULT_BASE_URL;
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(buildWatsonxModelsUrl(rawBaseUrl), {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "watsonx_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "watsonx_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to chat probe when /models is unavailable.
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "ibm/granite-3-3-8b-instruct";

  try {
    const response = await validationWrite(buildWatsonxChatUrl(rawBaseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: validationModelId,
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: "watsonx_chat_probe",
        ...(response.status === 404
          ? { warning: "watsonx credentials are valid, but the requested model is not enabled." }
          : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing watsonx.ai" };
}

async function validateOciProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || OCI_DEFAULT_BASE_URL;
  const projectId =
    typeof providerSpecificData.projectId === "string" && providerSpecificData.projectId.trim()
      ? providerSpecificData.projectId.trim()
      : typeof providerSpecificData.project === "string" && providerSpecificData.project.trim()
        ? providerSpecificData.project.trim()
        : "";
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(projectId ? { "OpenAI-Project": projectId } : {}),
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(buildOciModelsUrl(rawBaseUrl), {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "oci_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "oci_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to chat/responses probe when /models is unavailable.
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "openai.gpt-oss-20b";
  const apiType = providerSpecificData.apiType === "responses" ? "responses" : "chat";
  const body =
    apiType === "responses"
      ? {
          model: validationModelId,
          input: "test",
          max_output_tokens: 1,
        }
      : {
          model: validationModelId,
          messages: [{ role: "user", content: "test" }],
          max_tokens: 1,
        };

  try {
    const response = await validationWrite(buildOciChatUrl(rawBaseUrl, apiType), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: apiType === "responses" ? "oci_responses_probe" : "oci_chat_probe",
        ...(response.status === 404
          ? { warning: "OCI credentials are valid, but the requested model was not found." }
          : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing OCI Generative AI" };
}

async function validateSapProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || SAP_DEFAULT_BASE_URL;
  const resourceGroup = getSapResourceGroup(providerSpecificData);
  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "AI-Resource-Group": resourceGroup,
    },
    providerSpecificData
  );

  try {
    const response = await validationRead(buildSapModelsUrl(rawBaseUrl), {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "sap_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "sap_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to deployment probe when the discovery API is unavailable.
  }

  const canProbeChat =
    isSapDeploymentUrl(rawBaseUrl) || /\/chat\/completions$/i.test(normalizeBaseUrl(rawBaseUrl));
  if (!canProbeChat) {
    return {
      valid: false,
      error:
        "SAP validation needs either a reachable AI_API_URL or a deployment URL in providerSpecificData.baseUrl",
    };
  }

  const validationModelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "gpt-4o";

  try {
    const response = await validationWrite(buildSapChatUrl(rawBaseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: validationModelId,
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: "sap_chat_probe",
        ...(response.status === 404
          ? { warning: "SAP credentials are valid, but the deployment URL or model was not found." }
          : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing SAP Generative AI Hub" };
}

async function validateRekaProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || "https://api.reka.ai/v1";
  const headers = buildRekaHeaders(apiKey, providerSpecificData);

  try {
    const response = await validationRead(`${baseUrl}/models`, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      return { valid: true, error: null, method: "reka_models" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "reka_models",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // Fall through to the chat probe when /models is unavailable.
  }

  try {
    const response = await validationWrite(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: providerSpecificData.validationModelId || "reka-flash-3",
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null, method: "reka_chat_probe" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Reka" };
}

async function validateMaritalkProvider({ apiKey, providerSpecificData = {} }: any) {
  const entry = getRegistryEntry("maritalk");
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl || entry?.baseUrl);
  const headers = buildKeyHeaders(apiKey, providerSpecificData);

  try {
    const modelsRes = await validationRead(buildMaritalkModelsUrl(baseUrl), {
      method: "GET",
      headers,
    });

    if (modelsRes.ok) {
      return { valid: true, error: null, method: "maritalk_models" };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (modelsRes.status === 429) {
      return {
        valid: true,
        error: null,
        method: "maritalk_models",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (modelsRes.status >= 500) {
      return { valid: false, error: `Provider unavailable (${modelsRes.status})` };
    }
  } catch {
    // Fall through to the chat probe when /models cannot be reached.
  }

  const modelId =
    typeof providerSpecificData?.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : entry?.models?.[0]?.id || "sabia-4";

  return validateDirectChatProvider({
    url: buildMaritalkChatUrl(baseUrl),
    headers,
    body: {
      model: modelId,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}

async function validateNlpCloudProvider({ apiKey, providerSpecificData = {} }: any) {
  const rawBaseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || "https://api.nlpcloud.io/v1";
  const baseUrl = rawBaseUrl.endsWith("/gpu") ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, "")}/gpu`;
  const modelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "chatdolphin";
  const headers = buildTokenHeaders(apiKey, providerSpecificData);

  try {
    const response = await validationWrite(`${baseUrl}/${modelId}/chatbot`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        input: "test",
        context: "You are a concise assistant.",
        history: [],
      }),
    });

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return {
        valid: true,
        error: null,
        method: "nlpcloud_chatbot",
        ...(response.status === 429 ? { warning: "Rate limited, but credentials are valid" } : {}),
      };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing NLP Cloud" };
}

async function validateRunwayProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeRunwayBaseUrl(providerSpecificData.baseUrl);

  try {
    const response = await validationRead(buildRunwayApiUrl("/organization", baseUrl), {
      method: "GET",
      headers: buildRunwayHeaders(apiKey),
    });

    if (response.ok) {
      return { valid: true, error: null, method: "runway_organization" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "runway_organization",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Runway" };
}

async function validateNousResearchProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) || "https://inference-api.nousresearch.com/v1";
  const chatUrl = `${baseUrl}/chat/completions`;
  const modelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : "nousresearch/hermes-4-70b";

  try {
    const response = await validationWrite(chatUrl, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (response.ok) {
      return { valid: true, error: null, method: "nous_chat_completions" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "nous_chat_completions",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (response.status === 402) {
      return { valid: false, error: "Payment required or API key missing" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Nous Research" };
}

async function validatePoeProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || "https://api.poe.com/v1";
  const balanceUrl = new URL("/usage/current_balance", baseUrl).toString();

  try {
    const response = await validationRead(balanceUrl, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    if (response.ok) {
      return { valid: true, error: null, method: "poe_current_balance" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "poe_current_balance",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Poe" };
}

async function validateOpenAICompatibleProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for OpenAI compatible provider" };
  }

  const validationModelId =
    typeof providerSpecificData?.validationModelId === "string"
      ? providerSpecificData.validationModelId.trim()
      : "";

  // Step 1: Try GET /models
  let modelsReachable = false;
  try {
    const modelsRes = await validationRead(`${baseUrl}/models`, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    modelsReachable = true;

    if (modelsRes.ok) {
      return { valid: true, error: null, method: "models_endpoint" };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    // Endpoint responded and auth seems valid, but quota is exhausted/rate-limited.
    if (modelsRes.status === 429) {
      return {
        valid: true,
        error: null,
        method: "models_endpoint",
        warning: "Rate limited, but credentials are valid",
      };
    }
  } catch {
    // /models fetch failed (network error, etc.) — fall through to chat test
  }

  // T25: if /models cannot be used and no custom model was provided, return a
  // clear actionable message instead of a generic connection error.
  if (!validationModelId) {
    return {
      valid: false,
      error: "Endpoint /models unavailable. Provide a Model ID to validate via /chat/completions.",
    };
  }

  // Step 2: Fallback — try a minimal chat completion request
  // Many providers don't expose /models but accept chat completions fine
  const apiType = providerSpecificData.apiType || "chat";
  const chatSuffix = apiType === "responses" ? "/responses" : "/chat/completions";
  const chatUrl = `${baseUrl}${chatSuffix}`;
  const testModelId = validationModelId;

  try {
    const chatRes = await validationWrite(chatUrl, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: testModelId,
        messages: [{ role: "user", content: "test" }],
        max_tokens: 1,
      }),
    });

    if (chatRes.ok) {
      return { valid: true, error: null, method: "chat_completions" };
    }

    if (chatRes.status === 401 || chatRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (chatRes.status === 429) {
      return {
        valid: true,
        error: null,
        method: "chat_completions",
        warning: "Rate limited, but credentials are valid",
      };
    }

    // If /models was reachable but returned non-auth error, and chat succeeds
    // auth-wise, this still confirms credentials are valid.
    if (chatRes.status === 400) {
      return {
        valid: true,
        error: null,
        method: "inference_available",
        warning: "Model ID may be invalid, but credentials are valid",
      };
    }

    // 4xx other than auth (e.g. 400 bad model, 422) usually means auth passed
    if (chatRes.status >= 400 && chatRes.status < 500) {
      return {
        valid: true,
        error: null,
        method: "inference_available",
      };
    }

    if (chatRes.status >= 500) {
      return { valid: false, error: `Provider unavailable (${chatRes.status})` };
    }
  } catch {
    // Chat test also failed — fall through to simple connectivity check
  }

  // Step 3: Final fallback — simple connectivity check
  // For local providers (Ollama, LM Studio, etc.) that may not respond to
  // standard OpenAI endpoints but are still reachable
  if (!modelsReachable) {
    return { valid: false, error: "Connection failed while testing /chat/completions" };
  }

  try {
    const pingRes = await validationRead(baseUrl, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });

    // If the server responds at all (even with an error page), it's reachable
    if (pingRes.status < 500) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Provider unavailable (${pingRes.status})` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateAnthropicCompatibleProvider({
  apiKey,
  providerSpecificData = {},
  isLocal = false,
}: any) {
  let baseUrl = normalizeAnthropicBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for Anthropic compatible provider" };
  }

  const headers = applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      Authorization: `Bearer ${apiKey}`,
    },
    providerSpecificData
  );

  // Step 1: Try GET /models
  try {
    const modelsRes = await validationRead(
      joinBaseUrlAndPath(baseUrl, providerSpecificData?.modelsPath || "/models"),
      {
        method: "GET",
        headers,
      },
      isLocal
    );

    if (modelsRes.ok) {
      return { valid: true, error: null };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
  } catch {
    // /models fetch failed — fall through to messages test
  }

  // Step 2: Fallback — try a minimal messages request
  const testModelId = providerSpecificData?.validationModelId || "claude-3-5-sonnet-20241022";
  try {
    const messagesRes = await validationWrite(
      joinBaseUrlAndPath(baseUrl, providerSpecificData?.chatPath || "/messages"),
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: testModelId,
          max_tokens: 1,
          messages: [{ role: "user", content: "test" }],
        }),
      },
      isLocal
    );

    if (messagesRes.status === 401 || messagesRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    // Any other response (200, 400, 422, etc.) means auth passed
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateClaudeCodeCompatibleProvider({
  apiKey,
  providerSpecificData = {},
}: any) {
  const baseUrl = normalizeClaudeCodeCompatibleBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for CC Compatible provider" };
  }

  const modelsPath = providerSpecificData?.modelsPath || CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH;
  const chatPath = providerSpecificData?.chatPath || CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH;
  const defaultHeaders = applyCustomUserAgent(
    buildClaudeCodeCompatibleHeaders(apiKey, false),
    providerSpecificData
  );

  try {
    const modelsRes = await validationRead(joinClaudeCodeCompatibleUrl(baseUrl, modelsPath), {
      method: "GET",
      headers: defaultHeaders,
    });

    if (modelsRes.ok) {
      return { valid: true, error: null, method: "models_endpoint" };
    }

    if (modelsRes.status === 401 || modelsRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
  } catch {
    // Fall through to bridge request validation.
  }

  const payload = buildClaudeCodeCompatibleValidationPayload(
    providerSpecificData?.validationModelId || "claude-sonnet-4-6"
  );
  const sessionId = JSON.parse(payload.metadata.user_id as string).session_id;

  try {
    const messagesRes = await validationWrite(joinClaudeCodeCompatibleUrl(baseUrl, chatPath), {
      method: "POST",
      headers: applyCustomUserAgent(
        buildClaudeCodeCompatibleHeaders(apiKey, true, sessionId),
        providerSpecificData
      ),
      body: JSON.stringify(payload),
    });

    if (messagesRes.status === 401 || messagesRes.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (messagesRes.status === 429) {
      return {
        valid: true,
        error: null,
        method: "cc_bridge_request",
        warning: "Rate limited, but credentials are valid",
      };
    }

    if (messagesRes.status >= 400 && messagesRes.status < 500) {
      return {
        valid: true,
        error: null,
        method: "cc_bridge_request",
        warning: "Bridge request reached upstream, but the model or payload was rejected",
      };
    }

    return {
      valid: messagesRes.ok,
      error: messagesRes.ok ? null : `Validation failed: ${messagesRes.status}`,
      method: "cc_bridge_request",
    };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── Search provider validators (factored) ──

async function validateGenericProvider(
  baseUrl: string,
  apiKey: string,
  providerSpecificData: any = {},
  provider: string,
  isLocal: boolean = false
) {
  const config = SEARCH_VALIDATOR_CONFIGS[provider];
  if (!config) {
    return { valid: false, error: "Validator not found", unsupported: true };
  }
  const { url, init } = config(apiKey, providerSpecificData);
  return validateSearchProvider(url, init, providerSpecificData, isLocal);
}

async function validateSearchProvider(
  url: string,
  init: RequestInit,
  providerSpecificData: any = {},
  isLocal: boolean = false
): Promise<{ valid: boolean; error: string | null; unsupported: false }> {
  try {
    const response = await safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.validationWrite,
      guard: isLocal ? "none" : getProviderOutboundGuard(),
      ...withCustomUserAgent(init, providerSpecificData),
    });
    if (response.ok) return { valid: true, error: null, unsupported: false };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key", unsupported: false };
    }
    // For provider setup we only need to confirm authentication passed.
    // Search providers may return non-auth statuses for exhausted credits,
    // rate limiting, or request-shape quirks while still accepting the key.
    if (response.status < 500) {
      return { valid: true, error: null, unsupported: false };
    }
    return { valid: false, error: `Validation failed: ${response.status}`, unsupported: false };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

const SEARCH_VALIDATOR_CONFIGS: Record<
  string,
  (apiKey: string, providerSpecificData?: any) => { url: string; init: RequestInit }
> = {
  "serper-search": (apiKey) => ({
    url: "https://google.serper.dev/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify({ q: "test", num: 1 }),
    },
  }),
  "brave-search": (apiKey) => ({
    url: "https://api.search.brave.com/res/v1/web/search?q=test&count=1",
    init: {
      method: "GET",
      headers: { Accept: "application/json", "X-Subscription-Token": apiKey },
    },
  }),
  "perplexity-search": (apiKey) => ({
    url: "https://api.perplexity.ai/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: "test", max_results: 1 }),
    },
  }),
  "exa-search": (apiKey) => ({
    url: "https://api.exa.ai/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ query: "test", numResults: 1 }),
    },
  }),
  "tavily-search": (apiKey) => ({
    url: "https://api.tavily.com/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: "test", max_results: 1 }),
    },
  }),
  "google-pse-search": (apiKey, providerSpecificData = {}) => {
    const cx = providerSpecificData?.cx;
    if (!cx || typeof cx !== "string") {
      throw new Error("Programmable Search Engine ID (cx) is required");
    }
    return {
      url: `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(apiKey)}&cx=${encodeURIComponent(
        cx
      )}&q=test&num=1`,
      init: {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    };
  },
  "linkup-search": (apiKey) => ({
    url: "https://api.linkup.so/v1/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        q: "test",
        depth: "standard",
        outputType: "searchResults",
        maxResults: 1,
      }),
    },
  }),
  "searchapi-search": (apiKey) => ({
    url: `https://www.searchapi.io/api/v1/search?engine=google&q=test&api_key=${encodeURIComponent(
      apiKey
    )}`,
    init: {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  }),
  "youcom-search": (apiKey) => ({
    url: "https://ydc-index.io/v1/search?query=test&count=1",
    init: {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": apiKey },
    },
  }),
  "searxng-search": (apiKey, providerSpecificData = {}) => {
    const baseUrl =
      typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
        ? providerSpecificData.baseUrl.trim().replace(/\/+$/, "")
        : "http://localhost:8888/search";
    const searchUrl = baseUrl.endsWith("/search") ? baseUrl : `${baseUrl}/search`;
    const headers: Record<string, string> = { Accept: "application/json" };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }
    return {
      url: `${searchUrl}?q=test&format=json`,
      init: {
        method: "GET",
        headers,
      },
    };
  },
  "ollama-search": (apiKey) => ({
    url: "https://ollama.com/api/web_search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: "test", max_results: 1 }),
    },
  }),
  "zai-search": (apiKey, providerSpecificData = {}) => {
    const baseUrl =
      typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
        ? providerSpecificData.baseUrl.trim().replace(/\/+$/, "")
        : "https://api.z.ai/api/mcp/web_search_prime/mcp";
    return {
      url: baseUrl,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tools/call",
          params: { name: "web_search_prime", arguments: { search_query: "test" } },
          id: 1,
        }),
      },
    };
  },
};

// See open-sse/executors/muse-spark-web.ts for the rationale: Meta migrated
// from the "Abra" mutation (doc_id 078dfdff…, type RewriteOptionsInput now
// missing from schema) to the "Ecto" subscription. POST graphql still
// streams the response; only the persisted-query identifier and operation
// shape changed.
const META_AI_SEND_MESSAGE_DOC_ID = "29ae946c82d1f301196c6ca2226400b5";
const META_AI_FRIENDLY_NAME = "useEctoSendMessageSubscription";
const META_AI_REQUEST_ANALYTICS_TAGS = "graphservice";
const META_AI_ASBD_ID = "129477";
const META_AI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";
const META_AI_BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encodeMetaAiBase62(value: bigint, padLength: number): string {
  let remaining = value;
  let encoded = "";

  while (remaining > 0n) {
    encoded = META_AI_BASE62_ALPHABET[Number(remaining % 62n)] + encoded;
    remaining /= 62n;
  }

  return encoded.padStart(padLength, "0");
}

function decodeMetaAiBase62(value: string): bigint {
  let decoded = 0n;
  for (const char of value) {
    const index = META_AI_BASE62_ALPHABET.indexOf(char);
    if (index < 0) {
      throw new Error(`Invalid Meta AI base62 character: ${char}`);
    }
    decoded = decoded * 62n + BigInt(index);
  }
  return decoded;
}

function randomMetaAiBigInt(byteLength: number): bigint {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) | BigInt(byte);
  }
  return result;
}

function generateMetaAiConversationId(): string {
  const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
  const random = randomMetaAiBigInt(8) & ((1n << 64n) - 1n);
  return `c.${encodeMetaAiBase62((timestamp << 64n) | random, 19)}`;
}

function generateMetaAiEventId(conversationId: string): string | null {
  if (!conversationId.startsWith("c.")) {
    return null;
  }

  try {
    const packedConversation = decodeMetaAiBase62(conversationId.slice(2));
    const conversationRandom = packedConversation & ((1n << 64n) - 1n);
    const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
    const eventRandom = randomMetaAiBigInt(4) & ((1n << 32n) - 1n);
    return `e.${encodeMetaAiBase62((timestamp << (64n + 32n)) | (conversationRandom << 32n) | eventRandom, 25)}`;
  } catch {
    return null;
  }
}

function generateMetaAiNumericMessageId(): string {
  return (
    BigInt(Date.now()) * 1000n +
    BigInt(Math.floor(Math.random() * 1000)) +
    (randomMetaAiBigInt(2) & 0xfffn)
  ).toString();
}

function buildMetaAiValidationBody() {
  const conversationId = generateMetaAiConversationId();
  return {
    doc_id: META_AI_SEND_MESSAGE_DOC_ID,
    variables: {
      assistantMessageId: crypto.randomUUID(),
      attachments: null,
      clientLatitude: null,
      clientLongitude: null,
      clientTimezone:
        typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      clippyIp: null,
      content: "test",
      conversationId,
      conversationStarterId: null,
      currentBranchPath: "0",
      developerOverridesForMessage: null,
      devicePixelRatio: 1,
      entryPoint: "KADABRA__CHAT__UNIFIED_INPUT_BAR",
      imagineOperationRequest: null,
      isNewConversation: true,
      mentions: null,
      mode: "mode_fast",
      promptEditType: null,
      promptSessionId: crypto.randomUUID(),
      promptType: null,
      qplJoinId: null,
      requestedToolCall: null,
      // See muse-spark-web executor: RewriteOptionsInput was removed from
      // Meta's schema; sending `rewriteOptions` (even null) breaks the
      // persisted-query validation. Omit the field.
      turnId: crypto.randomUUID(),
      userAgent: META_AI_USER_AGENT,
      userEventId: generateMetaAiEventId(conversationId),
      userLocale: "en_US",
      userMessageId: crypto.randomUUID(),
      userUniqueMessageId: generateMetaAiNumericMessageId(),
    },
  };
}

async function validateDeepSeekWebProvider({ apiKey }: any) {
  if (!apiKey) {
    return {
      valid: false,
      error:
        "Missing userToken — paste the value from DevTools → Application → Local Storage → chat.deepseek.com → userToken",
    };
  }
  let token = apiKey;
  try {
    const parsed = JSON.parse(token);
    if (typeof parsed?.value === "string") token = parsed.value;
  } catch {
    // not JSON, use as-is
  }

  try {
    const resp = await fetch("https://chat.deepseek.com/api/v0/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        Origin: "https://chat.deepseek.com",
        Referer: "https://chat.deepseek.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "X-App-Version": "20241129.1",
        "X-Client-Platform": "web",
      },
    });
    if (resp.status === 401 || resp.status === 403) {
      return {
        valid: false,
        error: "userToken is invalid or expired — get a fresh one from localStorage",
      };
    }
    if (!resp.ok) {
      return { valid: false, error: `DeepSeek returned HTTP ${resp.status}` };
    }
    const json = await resp.json();
    const bizData = json?.data?.biz_data || json?.biz_data;
    if (!bizData?.token) {
      return {
        valid: false,
        error: `DeepSeek did not return an access token: ${json?.msg || "unknown error"}`,
      };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// qwen-web has no `modelsUrl` in its registry entry, so the generic OpenAI-compatible
// validator derived a probe URL of `https://chat.qwen.ai/api/v2/models` (via
// addModelsSuffix) — a non-existent path that answers with a 307 redirect, which the
// outbound guard blocked and the route then mislabeled as an SSRF block (#3288/#3758).
// This specialty validator probes the real session-validity endpoint instead
// (`GET /api/v2/user`, the same one Chat2API uses), mirroring the executor's anti-bot
// headers + cookie-jar replay. It uses plain fetch (like the other web-cookie
// validators) so it never hits the addModelsSuffix/redirect path.
async function validateQwenWebProvider({ apiKey }: any) {
  const rawCred = String(apiKey ?? "").trim();
  if (!rawCred) {
    return {
      valid: false,
      error:
        "Missing Qwen session — paste the full chat.qwen.ai Cookie header (must include token, cna and ssxmod_itna)",
    };
  }

  const token = extractQwenToken(rawCred);
  const cookieHeader = buildQwenCookieHeader(rawCred);
  if (!token && !cookieHeader) {
    return {
      valid: false,
      error: "Could not find a Qwen token/cookie in the pasted value",
    };
  }

  try {
    const headers: Record<string, string> = {
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Origin: "https://chat.qwen.ai",
      Referer: "https://chat.qwen.ai/",
      source: "web",
      "bx-v": "2.5.36",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (cookieHeader) headers["Cookie"] = cookieHeader;

    const resp = await fetch("https://chat.qwen.ai/api/v2/user", { headers });
    const contentType = resp.headers.get("content-type") || "";

    if (resp.status === 401 || resp.status === 403) {
      return {
        valid: false,
        error:
          "Qwen session is invalid or expired — re-login at https://chat.qwen.ai and paste a fresh full Cookie header",
      };
    }
    // Alibaba's WAF / retired-v1 gateway answers with an HTML challenge page (or 504)
    // instead of JSON. A bearer token alone is no longer enough for the v2 endpoint.
    if (contentType.includes("text/html") || resp.status === 504) {
      return {
        valid: false,
        error:
          "Qwen blocked the request with its anti-bot WAF. Re-login at https://chat.qwen.ai and paste a fresh full Cookie header (must include cna, ssxmod_itna and token) — a bearer token alone is not accepted.",
      };
    }
    if (!resp.ok) {
      return { valid: false, error: `Qwen returned HTTP ${resp.status}` };
    }
    return { valid: true, error: null };
  } catch (error) {
    return toValidationErrorResult(error);
  }
}

/**
 * Heuristic for a Grok 403 that is an anti-bot / IP-reputation block rather than
 * a genuine upstream API error (issue #3474).
 *
 * Returns true when the body reads like an anti-bot rejection — Grok's literal
 * "Request rejected by anti-bot rules." text, or a bare/non-structured forbidden
 * body that carries no parseable upstream `error.message`. Returns false for a
 * structured upstream API error (e.g. `{"error":{"message":"Model is not found"}}`),
 * which must keep surfacing its body to the user/maintainer.
 *
 * Callers should run `isCloudflareChallenge()` first; this covers the non-HTML
 * anti-bot cases that Cloudflare-challenge detection does not.
 */
function isGrokAntiBotBlock(body: string | null | undefined): boolean {
  const text = (body || "").trim();
  if (!text) return true; // empty 403 body — pre-auth block, treat as anti-bot
  if (/anti-bot|forbidden|access denied|blocked|rate.?limit/i.test(text)) return true;
  // A structured upstream API error has a parseable JSON `error.message`; if one
  // is present this is a real upstream error, not an anti-bot block.
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed?.error?.message === "string") return false;
  } catch {
    // Non-JSON 403 body with no recognizable structure → treat as anti-bot block.
    return true;
  }
  return false;
}

async function validateGrokWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const token = extractCookieValue(apiKey, "sso");
    if (!token) {
      return {
        valid: false,
        error: "Missing sso cookie — paste the value (or the full grok.com cookie line)",
      };
    }

    // Use the TLS-impersonating client — Cloudflare on grok.com pins
    // cf_clearance to JA3/JA4 + HTTP/2 SETTINGS, so plain Node fetch always
    // gets "Request rejected by anti-bot rules." regardless of cookies (#3180).
    const { tlsFetchGrok, TlsClientUnavailableError, isCloudflareChallenge } =
      await import("@omniroute/open-sse/services/grokTlsClient.ts");

    // Generate the same Cloudflare-bypass headers the GrokWebExecutor uses.
    const randomHex = (n: number) => {
      const a = new Uint8Array(n);
      crypto.getRandomValues(a);
      return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
    };
    const statsigMsg = `e:TypeError: Cannot read properties of null (reading 'children')`;
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    let response;
    try {
      response = await tlsFetchGrok("https://grok.com/rest/app-chat/conversations/new", {
        method: "POST",
        headers: applyCustomUserAgent(
          {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            Baggage:
              "sentry-environment=production,sentry-release=d6add6fb0460641fd482d767a335ef72b9b6abb8,sentry-public_key=b311e0f2690c81f25e2c4cf6d4f7ce1c",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Cookie: buildGrokCookieHeader(apiKey),
            Origin: "https://grok.com",
            Pragma: "no-cache",
            Referer: "https://grok.com/",
            "Sec-Ch-Ua": '"Google Chrome";v="147", "Chromium";v="147", "Not(A:Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"macOS"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
            "x-statsig-id": btoa(statsigMsg),
            "x-xai-request-id": crypto.randomUUID(),
            traceparent: `00-${traceId}-${spanId}-00`,
          },
          providerSpecificData
        ),
        body: JSON.stringify({
          temporary: true,
          modeId: "fast",
          message: "test",
          fileAttachments: [],
          imageAttachments: [],
          disableSearch: true,
          enableImageGeneration: false,
          returnImageBytes: false,
          returnRawGrokInXaiRequest: false,
          enableImageStreaming: false,
          imageGenerationCount: 0,
          forceConcise: true,
          toolOverrides: {},
          enableSideBySide: false,
          sendFinalMetadata: false,
          isReasoning: false,
          disableTextFollowUps: true,
          disableMemory: true,
          forceSideBySide: false,
          isAsyncChat: false,
          disableSelfHarmShortCircuit: false,
        }),
        timeoutMs: 15_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `TLS impersonation client unavailable: ${err.message}`,
        };
      }
      throw err;
    }

    let errorDetail = "";
    try {
      errorDetail = (response.text || "").slice(0, 240);
    } catch {}

    // Detect Cloudflare challenge pages even with a 200 status from tls-client-node
    if (isCloudflareChallenge(errorDetail)) {
      return {
        valid: false,
        error: "Grok validation blocked by Cloudflare anti-bot. Try a residential IP or proxy.",
      };
    }

    if (response.status >= 200 && response.status < 300) {
      return { valid: true, error: null };
    }

    if (response.status === 401) {
      return {
        valid: false,
        error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
      };
    }

    if (response.status === 403) {
      // Grok uses 403 for auth failures, entitlement issues, geo blocks,
      // anti-bot/IP-reputation rejections, and resource errors. Classify before
      // messaging — a misleading "invalid cookie" verdict on an IP-reputation
      // block (issue #3474) sends users chasing a cookie that is actually fine.
      //
      // 1. Auth-shaped → the cookie/session is the problem; re-paste it.
      if (/invalid-credentials|unauthenticated|unauthorized/i.test(errorDetail)) {
        return {
          valid: false,
          error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
        };
      }
      // 2. Anti-bot / Cloudflare / IP-reputation block → the cookie is likely
      //    fine; the request was rejected before auth was even evaluated. This is
      //    not code-fixable: the datacenter/VPS IP is flagged. A Cloudflare
      //    challenge body, Grok's "anti-bot rules" rejection, or a bare/non-JSON
      //    forbidden body (no structured upstream `error.message`) all map here.
      if (isCloudflareChallenge(errorDetail) || isGrokAntiBotBlock(errorDetail)) {
        return {
          valid: false,
          error:
            "Grok returned 403 (anti-bot/Cloudflare block). Your sso cookie is likely fine — " +
            "this is an IP-reputation block on the request, not an auth failure. Retry from a " +
            "residential IP or configure a proxy for grok-web.",
        };
      }
      // 3. Structured upstream error (e.g. probe model renamed) → surface the body
      //    so the user/maintainer sees the real cause instead of a wrong verdict.
      return {
        valid: false,
        error: `Grok rejected validation (403)${errorDetail ? `: ${errorDetail.slice(0, 160)}` : ""}`,
      };
    }

    if (response.status === 429) {
      return { valid: false, error: "Grok rate limited during validation (429)" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Grok unavailable (${response.status})` };
    }

    return {
      valid: false,
      error: `Grok validation failed (${response.status})${errorDetail ? `: ${errorDetail}` : ""}`,
    };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateChatGptWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // Accept bare value, unchunked cookie, chunked (.0/.1) cookies, or full
    // "Cookie: ..." DevTools line. Pass through verbatim once recognised.
    let cookieHeader = String(apiKey || "").trim();
    if (/^cookie\s*:\s*/i.test(cookieHeader)) {
      cookieHeader = cookieHeader.replace(/^cookie\s*:\s*/i, "");
    }
    if (!/__Secure-next-auth\.session-token(?:\.\d+)?\s*=/.test(cookieHeader)) {
      cookieHeader = `__Secure-next-auth.session-token=${cookieHeader}`;
    }

    // Use the TLS-impersonating client — Cloudflare on chatgpt.com pins
    // cf_clearance to JA3/JA4 + HTTP/2 SETTINGS, so plain Node fetch always
    // gets cf-mitigated: challenge regardless of cookies.
    const { tlsFetchChatGpt, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/chatgptTlsClient.ts");

    let response;
    try {
      response = await tlsFetchChatGpt("https://chatgpt.com/api/auth/session", {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Cookie: cookieHeader,
            Origin: "https://chatgpt.com",
            Pragma: "no-cache",
            Referer: "https://chatgpt.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0",
          },
          providerSpecificData
        ),
        timeoutMs: 30_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} (chatgpt-web requires this — without it, Cloudflare blocks every request)`,
        };
      }
      throw err;
    }

    const contentType = response.headers.get("content-type") || "";
    const cfRay = response.headers.get("cf-ray");
    const cfMitigated = response.headers.get("cf-mitigated");

    if (response.status === 401 || response.status === 403) {
      const bodyText = response.text || "";
      if (cfMitigated || /just a moment|cloudflare|cf-chl|attention required/i.test(bodyText)) {
        return {
          valid: false,
          error:
            "Cloudflare blocked the validator — open chatgpt.com in your browser, then copy the FULL Cookie line from DevTools (Network → request → Cookie) including cf_clearance, __cf_bm, _cfuvid, and the session-token chunks.",
        };
      }
      return {
        valid: false,
        error:
          "Invalid ChatGPT session cookie — re-paste __Secure-next-auth.session-token from chatgpt.com DevTools → Cookies",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `ChatGPT unavailable (${response.status})` };
    }

    if (response.status >= 400) {
      return { valid: false, error: `Validation failed: ${response.status}` };
    }

    if (!contentType.includes("json")) {
      return {
        valid: false,
        error: `ChatGPT returned non-JSON (${contentType || "no content-type"}${cfRay ? `, cf-ray=${cfRay}` : ""}) — paste the FULL Cookie line including cf_clearance, __cf_bm, _cfuvid alongside the session-token chunks.`,
      };
    }

    let data: any = {};
    try {
      data = JSON.parse(response.text || "{}");
    } catch {
      return {
        valid: false,
        error:
          "ChatGPT session response was not JSON — paste the FULL Cookie line including cf_clearance and __cf_bm.",
      };
    }
    if (!data?.accessToken) {
      return {
        valid: false,
        error: "ChatGPT session expired — log into chatgpt.com and copy a fresh cookie",
      };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validatePerplexityWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    let sessionToken = apiKey;
    let bearerToken: string | null = null;

    if (sessionToken.startsWith("__Secure-next-auth.session-token=")) {
      sessionToken = sessionToken.slice("__Secure-next-auth.session-token=".length);
    } else if (/^bearer\s+/i.test(sessionToken)) {
      bearerToken = sessionToken.replace(/^bearer\s+/i, "").trim();
      sessionToken = "";
    }

    const timezone =
      typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
    const headers = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        Origin: "https://www.perplexity.ai",
        Referer: "https://www.perplexity.ai/",
        // Firefox 148 — must match the firefox_148 TLS profile of perplexityTlsClient (issue #2459).
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0",
        "X-App-ApiClient": "default",
        "X-App-ApiVersion": "client-1.11.0",
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : sessionToken
            ? { Cookie: `__Secure-next-auth.session-token=${sessionToken}` }
            : {}),
      },
      providerSpecificData
    );

    // Perplexity is behind Cloudflare Enterprise which pins JA3/JA4 to a real
    // browser handshake — plain fetch is challenged with a 403 page from
    // VPS/datacenter IPs even with a valid cookie. Use the Firefox-fingerprinted
    // TLS client so the validator's verdict reflects the cookie, not the IP (issue #2459).
    const { tlsFetchPerplexity, isCloudflareChallenge, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/perplexityTlsClient.ts");

    let response: { status: number; text: string | null };
    try {
      response = await tlsFetchPerplexity("https://www.perplexity.ai/rest/sse/perplexity_ask", {
        method: "POST",
        headers,
        body: JSON.stringify({
          query_str: "test",
          params: {
            query_str: "test",
            search_focus: "internet",
            mode: "concise",
            model_preference: "default",
            sources: ["web"],
            attachments: [],
            frontend_uuid: crypto.randomUUID(),
            frontend_context_uuid: crypto.randomUUID(),
            version: "client-1.11.0",
            language: "en-US",
            timezone,
            search_recency_filter: null,
            is_incognito: true,
            use_schematized_api: true,
            last_backend_uuid: null,
          },
        }),
        timeoutMs: 30_000,
      });
    } catch (err) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} perplexity-web requires it — without it Cloudflare blocks every request.`,
        };
      }
      throw err;
    }

    if (response.status === 401 || response.status === 403) {
      if (isCloudflareChallenge(response.text)) {
        return {
          valid: false,
          error:
            "Cloudflare is blocking connections from this server's IP (TLS fingerprint rejected). " +
            "The session cookie may still be valid — install tls-client-node's native binary or route " +
            "perplexity-web through a residential proxy.",
        };
      }
      return {
        valid: false,
        error:
          "Invalid Perplexity session cookie — re-paste __Secure-next-auth.session-token from perplexity.ai",
      };
    }

    if (response.status === 200 || (response.status >= 400 && response.status < 500)) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Perplexity unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateBlackboxWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "next-auth.session-token");
    const sessionHeaders = applyCustomUserAgent(
      {
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/147.0.0.0",
      },
      providerSpecificData
    );

    const sessionResponse = await validationRead("https://app.blackbox.ai/api/auth/session", {
      method: "GET",
      headers: sessionHeaders,
    });

    const sessionText = await sessionResponse.text();
    const sessionPayload = sessionText ? JSON.parse(sessionText) : null;
    const userEmail = sessionPayload?.user?.email;

    if (!sessionResponse.ok || !userEmail) {
      return {
        valid: false,
        error:
          "Invalid Blackbox session cookie — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    const subscriptionHeaders = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/147.0.0.0",
      },
      providerSpecificData
    );

    const subscriptionResponse = await validationWrite(
      "https://app.blackbox.ai/api/check-subscription",
      {
        method: "POST",
        headers: subscriptionHeaders,
        body: JSON.stringify({ email: userEmail }),
      }
    );

    const subscriptionText = await subscriptionResponse.text();
    const subscriptionPayload = subscriptionText ? JSON.parse(subscriptionText) : null;
    const explicitActive =
      subscriptionPayload?.hasActiveSubscription === true ||
      subscriptionPayload?.isTrialSubscription === true ||
      subscriptionPayload?.status === "PREMIUM";
    const explicitInactive =
      subscriptionPayload?.hasActiveSubscription === false ||
      subscriptionPayload?.status === "FREE";
    const requiresAuthentication =
      subscriptionPayload?.requiresAuthentication === true ||
      /login is required/i.test(subscriptionText || "");

    if (subscriptionResponse.status === 401 || subscriptionResponse.status === 403) {
      return {
        valid: false,
        error:
          "Invalid Blackbox session cookie — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    if (requiresAuthentication) {
      return {
        valid: false,
        error:
          "Blackbox session expired — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    if (subscriptionResponse.ok && explicitActive) {
      return { valid: true, error: null };
    }

    if (
      (subscriptionResponse.ok && explicitInactive) ||
      subscriptionPayload?.previouslySubscribed
    ) {
      return {
        valid: false,
        error:
          "Blackbox account authenticated, but no active paid subscription was detected for premium web models.",
      };
    }

    if (subscriptionResponse.ok) {
      return { valid: true, error: null };
    }

    if (subscriptionResponse.status >= 500) {
      return { valid: false, error: `Blackbox unavailable (${subscriptionResponse.status})` };
    }

    return { valid: false, error: `Validation failed: ${subscriptionResponse.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateMuseSparkWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "ecto_1_sess");
    const response = await validationWrite("https://www.meta.ai/api/graphql", {
      method: "POST",
      headers: applyCustomUserAgent(
        {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie: cookieHeader,
          Origin: "https://www.meta.ai",
          Referer: "https://www.meta.ai/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": META_AI_USER_AGENT,
          "X-ASBD-ID": META_AI_ASBD_ID,
          "X-FB-Friendly-Name": META_AI_FRIENDLY_NAME,
          "X-FB-Request-Analytics-Tags": META_AI_REQUEST_ANALYTICS_TAGS,
        },
        providerSpecificData
      ),
      body: JSON.stringify(buildMetaAiValidationBody()),
    });

    const responseText = await response.text();
    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid Meta AI session cookie — re-paste abra_sess from meta.ai",
      };
    }

    if (/authentication required to send messages|login is required|sign in/i.test(responseText)) {
      return {
        valid: false,
        error: "Invalid Meta AI session cookie — re-paste abra_sess from meta.ai",
      };
    }

    if (
      response.status === 429 ||
      /limit exceeded|rate limit|too many requests/i.test(responseText)
    ) {
      return { valid: true, error: null };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Meta AI unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateAdaptaWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = typeof apiKey === "string" ? apiKey.trim() : "";
    if (!raw)
      return { valid: false, error: "Paste your __client cookie from .clerk.agent.adapta.one" };
    const eqIdx = raw.indexOf("=");
    const clientJwt = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;

    const response = await validationRead("https://clerk.agent.adapta.one/v1/client", {
      headers: applyCustomUserAgent(
        {
          Cookie: `__client=${clientJwt}`,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Origin: "https://agent.adapta.one",
        },
        providerSpecificData
      ),
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid or expired __client cookie — re-paste from .clerk.agent.adapta.one",
      };
    }

    if (!response.ok) {
      return { valid: false, error: `Adapta Clerk returned HTTP ${response.status}` };
    }

    const body = await response.json().catch(() => null);
    const sessions: Array<{ id: string; status: string }> = body?.response?.sessions ?? [];
    const hasActive = sessions.some((s) => s.status === "active");
    if (!hasActive) {
      return {
        valid: false,
        error: "No active Adapta session — your __client cookie may be expired",
      };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

async function validateClaudeWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(String(apiKey || ""), "sessionKey");
    if (!cookieHeader) {
      return { valid: false, error: "Paste your sessionKey cookie from claude.ai" };
    }

    const { tlsFetchClaude, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/claudeTlsClient.ts");

    let response: { status: number; text: string | null };
    try {
      response = await tlsFetchClaude("https://claude.ai/api/organizations", {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Cookie: cookieHeader,
            Origin: "https://claude.ai",
            Pragma: "no-cache",
            Referer: "https://claude.ai/new",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "anthropic-client-platform": "web_claude_ai",
          },
          providerSpecificData
        ),
        timeoutMs: 30_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} (claude-web requires this — without it, Cloudflare blocks every request)`,
        };
      }
      throw err;
    }

    if (response.status === 200) {
      return { valid: true, error: null };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired session cookie — re-paste sessionKey from claude.ai DevTools → Cookies",
      };
    }

    if (response.status === 429) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Claude.ai unavailable (${response.status})` };
    }

    return { valid: false, error: `Claude.ai validation failed (${response.status})` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── Gemini Web cookie validator ──
async function validateGeminiWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return { valid: false, error: "Paste your __Secure-1PSID cookie from gemini.google.com" };
    }

    // Accept full cookie blob or bare value
    let cookieHeader = raw;
    if (!raw.includes("=")) {
      cookieHeader = `__Secure-1PSID=${raw}`;
    }

    const response = await validationRead("https://gemini.google.com/app", {
      headers: applyCustomUserAgent(
        {
          Accept: "text/html,application/xhtml+xml",
          Cookie: cookieHeader,
          Origin: "https://gemini.google.com",
          Referer: "https://gemini.google.com/",
        },
        providerSpecificData
      ),
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired __Secure-1PSID cookie — re-paste from gemini.google.com DevTools → Cookies",
      };
    }

    // 200/302 = valid, anything < 500 that isn't auth failure is acceptable
    if (response.status < 500) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Gemini validation failed (${response.status})` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── Copilot Web token validator ──
async function validateCopilotWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return {
        valid: false,
        error: "Paste your access_token from copilot.microsoft.com DevTools → Cookies",
      };
    }

    // Extract token — may be bare JWT, cookie string with access_token=, or Bearer prefix
    const { extractAccessToken } = await import("@omniroute/open-sse/executors/copilot-web.ts");
    const token = extractAccessToken(raw);
    if (!token) {
      return { valid: false, error: "Could not extract access_token from input" };
    }

    // Probe Copilot's conversation API to verify token
    const response = await validationWrite(
      "https://copilot.microsoft.com/c/api/conversations?language=en",
      {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            Origin: "https://copilot.microsoft.com",
            Referer: "https://copilot.microsoft.com/",
          },
          providerSpecificData
        ),
      }
    );

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired access_token — re-paste from copilot.microsoft.com DevTools → Cookies",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Copilot unavailable (${response.status})` };
    }

    // 200, 400, 404 etc. all indicate the token was accepted
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── t3.chat Web cookie validator ──
async function validateT3WebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return {
        valid: false,
        error: "Paste your Cookie header and convex-session-id from t3.chat",
      };
    }

    // The cookie field may contain "cookies=<Cookie header>\nconvexSessionId=<id>"
    // or just the Cookie header value. Try to parse.
    let cookieHeader = raw;
    let convexSessionId = "";

    if (raw.includes("convexSessionId") || raw.includes("convex-session-id")) {
      // Structured format: "cookies=...; convexSessionId=..."
      const parts = raw.split(/[,;\n]/).map((s: string) => s.trim());
      const cookieParts: string[] = [];
      for (const part of parts) {
        if (part.startsWith("convexSessionId=") || part.startsWith("convex-session-id=")) {
          convexSessionId = part.split("=").slice(1).join("=");
        } else if (part.startsWith("cookies=")) {
          cookieParts.push(part.slice("cookies=".length));
        } else if (part.includes("=")) {
          cookieParts.push(part);
        }
      }
      if (cookieParts.length) cookieHeader = cookieParts.join("; ");
    }

    // Build final cookie with convex-session-id if found
    const finalCookie = convexSessionId
      ? `${cookieHeader}; convex-session-id=${convexSessionId}`
      : cookieHeader;

    const response = await validationRead("https://t3.chat", {
      headers: applyCustomUserAgent(
        {
          Accept: "text/html",
          Cookie: finalCookie,
        },
        providerSpecificData
      ),
    });

    // t3.chat returns 200/302/404 for valid sessions, 5xx for down
    if (response.status >= 500) {
      return { valid: false, error: `t3.chat unavailable (${response.status})` };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

/** Jules API — GET /v1alpha/sources with X-Goog-Api-Key (see developers.google.com/jules/api). */
async function validateJulesProvider({ apiKey }: { apiKey: string }) {
  try {
    const response = await validationWrite(buildJulesApiUrl("/sources"), {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
      },
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    const errorText = await response.text().catch(() => "");
    return {
      valid: false,
      error: errorText.trim() || `Jules API returned ${response.status}`,
    };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}

async function validateInnerAiProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = typeof apiKey === "string" ? apiKey.trim() : "";
    if (!raw) {
      return {
        valid: false,
        error: "Paste your token cookie and email — format: eyJ... user@example.com",
      };
    }

    // Parse token and optional email (format: "TOKEN EMAIL")
    const eqIdx = raw.indexOf("=");
    const stripped = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;
    const lastSpace = stripped.lastIndexOf(" ");
    let token = stripped;
    let credEmail = "";
    if (lastSpace > 0) {
      const possibleEmail = stripped.slice(lastSpace + 1).trim();
      if (possibleEmail.includes("@")) {
        token = stripped.slice(0, lastSpace).trim();
        credEmail = possibleEmail;
      }
    }

    if (!credEmail) {
      return {
        valid: false,
        error:
          "Email is required — paste token followed by a space and your email: eyJ... user@example.com",
      };
    }

    // Validate JWT structure (3 parts separated by dots)
    const parts = token.split(".");
    if (parts.length < 3) {
      return {
        valid: false,
        error:
          "Invalid token format — paste only the token cookie value from .innerai.com (starts with eyJ…)",
      };
    }

    // Decode payload and check expiry
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    let payload: Record<string, unknown> = {};
    try {
      payload = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    } catch {
      return { valid: false, error: "Could not parse Inner.ai token — re-paste from DevTools" };
    }

    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      return {
        valid: false,
        error:
          "Inner.ai token has expired — re-login at app.innerai.com and re-paste the token cookie",
      };
    }

    // Verify the token carries at least one known Inner.ai identity field
    const hasIdentity =
      payload.device_id ??
      payload.deviceId ??
      payload["device-id"] ??
      payload.did ??
      payload.user_id ??
      payload.userId ??
      payload.sub;
    if (!hasIdentity) {
      return {
        valid: false,
        error:
          "Token does not look like an Inner.ai session token — re-paste from DevTools → Cookies → .innerai.com",
      };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateProviderApiKey({ provider, apiKey, providerSpecificData = {} }: any) {
  const requiresApiKey = !providerAllowsOptionalApiKey(provider);
  const isLocal = isLocalProvider(provider);

  if (!provider || (requiresApiKey && !apiKey)) {
    return { valid: false, error: "Provider and API key required", unsupported: false };
  }

  if (isOpenAICompatibleProvider(provider)) {
    try {
      return await validateOpenAICompatibleProvider({ apiKey, providerSpecificData });
    } catch (error: any) {
      return toValidationErrorResult(error);
    }
  }

  if (isAnthropicCompatibleProvider(provider)) {
    try {
      if (isClaudeCodeCompatibleProvider(provider)) {
        return await validateClaudeCodeCompatibleProvider({ apiKey, providerSpecificData });
      }
      return await validateAnthropicCompatibleProvider({
        apiKey,
        providerSpecificData,
        isLocal,
      });
    } catch (error: any) {
      return toValidationErrorResult(error);
    }
  }

  /**
   * Build Opengateway-style validators (xiaomi-mimo compatible).
   * These providers share a POST /chat/completions auth check pattern and differ
   * only in default baseUrl and test model name.
   */
  function buildOpengatewayValidator(defaultBaseUrl: string, model: string) {
    return async ({ apiKey, providerSpecificData }: any) => {
      try {
        const baseUrl = normalizeBaseUrl(providerSpecificData?.baseUrl || defaultBaseUrl);
        const chatUrl = `${baseUrl.replace(/\/chat\/completions$/, "")}/chat/completions`;
        const res = await validationWrite(
          chatUrl,
          {
            method: "POST",
            headers: buildBearerHeaders(apiKey, providerSpecificData),
            body: JSON.stringify({
              model,
              messages: [{ role: "user", content: "test" }],
              max_tokens: 1,
            }),
          },
          isLocal
        );
        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        // Any non-auth response (200, 400, 422, 429) means auth passed
        return { valid: true, error: null };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    };
  }

  // Same as buildOpengatewayValidator but returns an object spreadable into SPECIALTY_VALIDATORS.
  // isLocal is captured via closure from the outer function scope.
  function buildGitlawbValidators(
    configs: [string, string, string][]
  ): Record<string, ReturnType<typeof buildOpengatewayValidator>> {
    return Object.fromEntries(
      configs.map(([id, baseUrl, model]) => [id, buildOpengatewayValidator(baseUrl, model)])
    );
  }

  // ── Specialty provider validation ──
  const SPECIALTY_VALIDATORS = {
    jules: validateJulesProvider,
    qoder: async ({ apiKey, providerSpecificData }: any) => {
      // Bifurcate validation: PAT tokens use Cosy auth against api1.qoder.sh;
      // regular API keys validate against dashscope (OpenAI-compatible endpoint).
      const key = (apiKey || "").trim();
      if (key.startsWith("pt-")) {
        return validateQoderCliPat({ apiKey: key, providerSpecificData });
      }
      // Non-PAT token → validate against dashscope (Alibaba Cloud).
      // The executor routes these tokens to dashscope.aliyuncs.com, so the
      // validation must test against dashscope, NOT the Cosy PAT endpoint.
      try {
        const dashscopeUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/models";
        const res = await validationRead(
          dashscopeUrl,
          {
            headers: {
              Authorization: `Bearer ${key}`,
            },
          },
          false
        );
        if (res.ok) return { valid: true, error: null };
        if (res.status === 401 || res.status === 403) {
          return {
            valid: false,
            error:
              "Invalid Qoder API key. Make sure you're using a valid API key from Qoder / Alibaba Cloud Dashscope.",
          };
        }
        // 4xx/5xx other than auth — treat as valid bypass to prevent false
        // negatives from transient dashscope issues (consistent with PAT path).
        return { valid: true, error: null };
      } catch (err: unknown) {
        return toValidationErrorResult(err);
      }
    },
    "command-code": validateCommandCodeProvider,
    deepgram: validateDeepgramProvider,
    assemblyai: validateAssemblyAIProvider,
    "fal-ai": ({ apiKey, providerSpecificData }: any) =>
      validateImageProviderApiKey({ provider: "fal-ai", apiKey, providerSpecificData }),
    "stability-ai": ({ apiKey, providerSpecificData }: any) =>
      validateImageProviderApiKey({ provider: "stability-ai", apiKey, providerSpecificData }),
    "black-forest-labs": ({ apiKey, providerSpecificData }: any) =>
      validateImageProviderApiKey({ provider: "black-forest-labs", apiKey, providerSpecificData }),
    recraft: ({ apiKey, providerSpecificData }: any) =>
      validateImageProviderApiKey({ provider: "recraft", apiKey, providerSpecificData }),
    topaz: ({ apiKey, providerSpecificData }: any) =>
      validateImageProviderApiKey({ provider: "topaz", apiKey, providerSpecificData }),
    elevenlabs: validateElevenLabsProvider,
    inworld: validateInworldProvider,
    kie: validateKieProvider,
    "aws-polly": validateAwsPollyProvider,
    "bailian-coding-plan": validateBailianCodingPlanProvider,
    heroku: validateHerokuProvider,
    databricks: validateDatabricksProvider,
    datarobot: validateDataRobotProvider,
    watsonx: validateWatsonxProvider,
    oci: validateOciProvider,
    sap: validateSapProvider,
    bedrock: validateBedrockProvider,
    modal: ({ apiKey, providerSpecificData }: any) =>
      validateOpenAILikeProvider({
        provider: "modal",
        apiKey,
        providerSpecificData,
        baseUrl: normalizeBaseUrl(providerSpecificData?.baseUrl || ""),
        modelId: "Qwen/Qwen3-4B-Thinking-2507-FP8",
        isLocal,
      }),
    "nous-research": validateNousResearchProvider,
    poe: validatePoeProvider,
    clarifai: validateClarifaiProvider,
    reka: validateRekaProvider,
    maritalk: validateMaritalkProvider,
    nlpcloud: validateNlpCloudProvider,
    runwayml: validateRunwayProvider,
    snowflake: validateSnowflakeProvider,
    gigachat: validateGigachatProvider,
    "deepseek-web": validateDeepSeekWebProvider,
    "grok-web": validateGrokWebProvider,
    "qwen-web": validateQwenWebProvider,
    "chatgpt-web": validateChatGptWebProvider,
    "perplexity-web": validatePerplexityWebProvider,
    "blackbox-web": validateBlackboxWebProvider,
    "muse-spark-web": validateMuseSparkWebProvider,
    "inner-ai": validateInnerAiProvider,
    "adapta-web": validateAdaptaWebProvider,
    "claude-web": validateClaudeWebProvider,
    "gemini-web": validateGeminiWebProvider,
    "copilot-web": validateCopilotWebProvider,
    "t3-web": validateT3WebProvider,
    "azure-openai": validateAzureOpenAIProvider,
    "azure-ai": validateAzureAiProvider,
    "voyage-ai": ({ apiKey, providerSpecificData }: any) => {
      const embeddingProvider = getEmbeddingProvider("voyage-ai");
      return validateEmbeddingApiProvider({
        apiKey,
        providerSpecificData,
        url: embeddingProvider?.baseUrl,
        modelId: embeddingProvider?.models?.[0]?.id || "voyage-4-lite",
      });
    },
    "jina-ai": ({ apiKey, providerSpecificData }: any) => {
      const rerankProvider = getRerankProvider("jina-ai");
      return validateRerankApiProvider({
        apiKey,
        providerSpecificData,
        url: rerankProvider?.baseUrl,
        modelId: rerankProvider?.models?.[0]?.id || "jina-reranker-v3",
      });
    },
    gitlab: async ({ apiKey, providerSpecificData }: any) => {
      try {
        const configuredBaseUrl =
          typeof providerSpecificData?.baseUrl === "string"
            ? providerSpecificData.baseUrl.trim()
            : "";
        const root = (configuredBaseUrl || "https://gitlab.com").replace(/\/$/, "");
        const res = await validationWrite(
          `${root}/api/v4/code_suggestions/direct_access`,
          {
            method: "POST",
            headers: buildBearerHeaders(apiKey, providerSpecificData),
            body: "{}",
          },
          isLocal
        );
        if (res.status === 401) {
          return { valid: false, error: "Invalid API key" };
        }
        return { valid: true, error: null };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    vertex: async ({ apiKey }: any) => {
      try {
        const { parseSAFromApiKey, getAccessToken, isExpressApiKey } =
          await import("@omniroute/open-sse/executors/vertex.ts");
        // Express-mode API keys are opaque strings sent directly as the ?key= query param — there is
        // no JWT to mint, so accept any non-empty Express key (the live chat/media call validates it).
        if (isExpressApiKey(apiKey)) {
          return { valid: true, error: null };
        }
        const sa = parseSAFromApiKey(apiKey);
        // Validates credentials by successfully successfully exchanging them for a JWT from Google Identity
        await getAccessToken(sa);
        return { valid: true, error: null };
      } catch (error: any) {
        return { valid: false, error: "Invalid Service Account JSON: " + error.message };
      }
    },
    "vertex-partner": async ({ apiKey }: any) => {
      try {
        const { parseSAFromApiKey, getAccessToken, isExpressApiKey } =
          await import("@omniroute/open-sse/executors/vertex.ts");
        if (isExpressApiKey(apiKey)) {
          return { valid: true, error: null };
        }
        const sa = parseSAFromApiKey(apiKey);
        await getAccessToken(sa);
        return { valid: true, error: null };
      } catch (error: any) {
        return { valid: false, error: "Invalid Service Account JSON: " + error.message };
      }
    },
    // LongCat AI — does not expose /v1/models; validate via chat completions directly (#592)
    longcat: async ({ apiKey, providerSpecificData }: any) => {
      try {
        const res = await validationWrite(
          "https://api.longcat.chat/openai/v1/chat/completions",
          {
            method: "POST",
            headers: buildBearerHeaders(apiKey, providerSpecificData),
            body: JSON.stringify({
              model: "longcat",
              messages: [{ role: "user", content: "test" }],
              max_tokens: 1,
            }),
          },
          isLocal
        );
        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        // Any non-auth response (200, 400, 422) means auth passed
        return { valid: true, error: null };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    // NVIDIA NIM (#2463) — bypass the /models probe in favor of a direct
    // chat/completions probe. NVIDIA NIM's /models endpoint returns model
    // catalogs that vary by region and key-tier, and some keys 404 on it,
    // which the generic flow misreads. The chat probe is also a stronger
    // sanity check for streaming/key correctness.
    nvidia: async ({ apiKey, providerSpecificData }: any) => {
      try {
        const baseUrlRaw =
          providerSpecificData?.baseUrl || "https://integrate.api.nvidia.com/v1/chat/completions";
        const normalized = normalizeBaseUrl(baseUrlRaw);
        const chatBase = normalized.replace(/\/models$/, "");
        const chatUrl = normalized.endsWith("/chat/completions")
          ? normalized
          : `${chatBase}/chat/completions`;
        // #3116: probe a universally-available model rather than models[0]
        // (z-ai/glm-5.1), which requires the "Public API Endpoints" account permission
        // and can hang/be DEGRADED — making a *valid* key fail with "Upstream Error".
        const modelId = resolveNvidiaValidationModel(providerSpecificData);
        // #3226: use raw https (bypass the proxy/TLS-patched fetch) — the undici
        // dispatcher stalls against NVIDIA's endpoint, causing a 504 timeout.
        const res = await directHttpsRequest(
          chatUrl,
          {
            method: "POST",
            headers: buildBearerHeaders(apiKey, providerSpecificData),
            body: JSON.stringify({
              model: modelId,
              messages: [{ role: "user", content: "test" }],
              max_tokens: 1,
            }),
          },
          20000
        );
        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        // Any non-auth response (200, 400, 422, 429) means auth passed
        return { valid: true, error: null };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    // Xiaomi MiMo — Token Plan keys (tp-*) only work on regional endpoints
    // (e.g. token-plan-sgp, token-plan-ams), not api.xiaomimimo.com.
    // /v1/models works but validate via chat/completions for stronger auth check.
    "xiaomi-mimo": async ({ apiKey, providerSpecificData }: any) => {
      try {
        const baseUrl = normalizeBaseUrl(
          providerSpecificData?.baseUrl || "https://api.xiaomimimo.com/v1"
        );
        const chatUrl = `${baseUrl.replace(/\/chat\/completions$/, "")}/chat/completions`;
        const res = await validationWrite(
          chatUrl,
          {
            method: "POST",
            headers: buildBearerHeaders(apiKey, providerSpecificData),
            body: JSON.stringify({
              model: "mimo-v2.5-pro",
              messages: [{ role: "user", content: "test" }],
              max_tokens: 1,
            }),
          },
          isLocal
        );
        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        // Any non-auth response (200, 400, 422, 429) means auth passed
        return { valid: true, error: null };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    // Gitlawb Opengateway — Xiaomi MiMo compatible, same /models endpoint limitation.
    // Bypass /models probe in favor of chat/completions, matching xiaomi-mimo's pattern.
    // Uses a factory to share validation logic across Opengateway provider variants.
    ...buildGitlawbValidators([
      ["gitlawb", "https://opengateway.gitlawb.com/v1/xiaomi-mimo", "mimo-v2.5-pro"],
      ["gitlawb-gmi", "https://opengateway.gitlawb.com/v1/gmi-cloud", "XiaomiMiMo/MiMo-V2.5-Pro"],
    ]),
    // Search providers — use factored validator
    ...Object.fromEntries(
      Object.entries(SEARCH_VALIDATOR_CONFIGS).map(([id, configFn]) => [
        id,
        ({ apiKey, providerSpecificData }: any) => {
          const { url, init } = configFn(apiKey, providerSpecificData);
          return validateSearchProvider(url, init, providerSpecificData, isLocal);
        },
      ])
    ),
  };

  if (SPECIALTY_VALIDATORS[provider]) {
    try {
      return await SPECIALTY_VALIDATORS[provider]({ apiKey, providerSpecificData });
    } catch (error: any) {
      return toValidationErrorResult(error);
    }
  }

  const entry = getRegistryEntry(provider);
  if (!entry) {
    if (isSelfHostedChatProvider(provider)) {
      return await validateOpenAILikeProvider({
        provider,
        apiKey,
        baseUrl: resolveBaseUrl(null, providerSpecificData),
        providerSpecificData,
        modelId: "local-model",
        modelsUrl: addModelsSuffix(providerSpecificData?.baseUrl || ""),
        isLocal,
      });
    }
    return { valid: false, error: "Provider validation not supported", unsupported: true };
  }

  const modelId = entry.models?.[0]?.id || null;
  // (#532) Use testKeyBaseUrl if defined — some providers validate keys on a different endpoint
  // than where requests are sent (e.g. opencode-go validates on zen/v1, not zen/go/v1)
  const validationEntry = entry.testKeyBaseUrl
    ? { ...entry, baseUrl: entry.testKeyBaseUrl }
    : entry;
  const baseUrl = resolveBaseUrl(validationEntry, providerSpecificData);

  try {
    if (OPENAI_LIKE_FORMATS.has(entry.format)) {
      return await validateOpenAILikeProvider({
        apiKey,
        baseUrl,
        headers: entry.headers || {},
        providerSpecificData,
        modelId,
        modelsUrl: entry.modelsUrl,
        isLocal,
      });
    }

    if (entry.format === "claude") {
      const requestBaseUrl = `${baseUrl}${entry.urlSuffix || ""}`;
      const requestHeaders = {
        ...(entry.headers || {}),
      };

      if ((entry.authHeader || "").toLowerCase() === "x-api-key") {
        requestHeaders["x-api-key"] = apiKey;
      } else {
        requestHeaders["Authorization"] = `Bearer ${apiKey}`;
      }

      return await validateAnthropicLikeProvider({
        apiKey,
        baseUrl: requestBaseUrl,
        modelId,
        headers: requestHeaders,
        providerSpecificData,
        isLocal,
      });
    }

    if (GEMINI_LIKE_FORMATS.has(entry.format)) {
      return await validateGeminiLikeProvider({
        apiKey,
        baseUrl,
        providerSpecificData,
        authType: entry.authType,
        isLocal,
      });
    }

    if (entry.format === "antigravity") {
      const expiresAt =
        providerSpecificData?.tokenExpiresAt ||
        providerSpecificData?.expiresAt ||
        providerSpecificData?.expiry_date ||
        providerSpecificData?.expiryDate;
      const expiryMs =
        typeof expiresAt === "number"
          ? expiresAt
          : typeof expiresAt === "string" && expiresAt.trim()
            ? Date.parse(expiresAt)
            : Number.NaN;

      if (Number.isFinite(expiryMs) && expiryMs > 0 && expiryMs < Date.now()) {
        return {
          valid: false,
          error: "Antigravity OAuth token has expired. Re-import or refresh the CLI login.",
          unsupported: false,
        };
      }

      return { valid: true, error: null, unsupported: false };
    }

    return { valid: false, error: "Provider validation not supported", unsupported: true };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
