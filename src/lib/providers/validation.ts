import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
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
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { getGigachatAccessToken } from "@omniroute/open-sse/services/gigachatAuth.ts";
import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";

const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);
const GEMINI_LIKE_FORMATS = new Set(["gemini", "gemini-cli"]);

function normalizeBaseUrl(baseUrl: string) {
  return (baseUrl || "").trim().replace(/\/$/, "");
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

function buildBearerHeaders(apiKey: string, providerSpecificData: any = {}) {
  return applyCustomUserAgent(
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    providerSpecificData
  );
}

async function validationRead(url: string, init: RequestInit) {
  return safeOutboundFetch(url, {
    ...SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
    guard: getProviderOutboundGuard(),
    ...init,
  });
}

async function validationWrite(url: string, init: RequestInit) {
  return safeOutboundFetch(url, {
    ...SAFE_OUTBOUND_FETCH_PRESETS.validationWrite,
    guard: getProviderOutboundGuard(),
    ...init,
  });
}

function toValidationErrorResult(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "Validation failed");
  const statusCode = getSafeOutboundFetchErrorStatus(error);

  return {
    valid: false,
    error: message || "Validation failed",
    unsupported: false,
    ...(statusCode ? { statusCode } : {}),
    ...(error instanceof SafeOutboundFetchError && error.code === "TIMEOUT"
      ? { timeout: true }
      : {}),
    ...(statusCode === 400 ? { securityBlocked: true } : {}),
  };
}

async function validateOpenAILikeProvider({
  provider,
  apiKey,
  baseUrl,
  providerSpecificData = {},
  modelId = "gpt-4o-mini",
  modelsUrl: customModelsUrl,
}) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const modelsUrl = customModelsUrl || addModelsSuffix(baseUrl);
  if (!modelsUrl) {
    return { valid: false, error: "Invalid models endpoint" };
  }

  const modelsRes = await validationRead(modelsUrl, {
    method: "GET",
    headers: buildBearerHeaders(apiKey, providerSpecificData),
  });

  if (modelsRes.ok) {
    return { valid: true, error: null };
  }

  if (modelsRes.status === 401 || modelsRes.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  const chatUrl = resolveChatUrl(provider, baseUrl, providerSpecificData);
  if (!chatUrl) {
    return { valid: false, error: `Validation failed: ${modelsRes.status}` };
  }

  const testModelId = (providerSpecificData as any)?.validationModelId || modelId;

  const testBody = {
    model: testModelId,
    messages: [{ role: "user", content: "test" }],
    max_tokens: 1,
  };

  const chatRes = await validationWrite(chatUrl, {
    method: "POST",
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: JSON.stringify(testBody),
  });

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

  // 4xx other than auth (e.g., invalid model/body) usually means auth passed.
  return { valid: true, error: null };
}

async function validateDirectChatProvider({ url, headers, body, providerSpecificData = {} }: any) {
  try {
    const response = await validationWrite(url, {
      method: "POST",
      headers: applyCustomUserAgent(headers, providerSpecificData),
      body: JSON.stringify(body),
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
  modelId,
  headers = {},
  providerSpecificData = {},
}: any) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
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

  const response = await validationWrite(baseUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      model: testModelId,
      max_tokens: 1,
      messages: [{ role: "user", content: "test" }],
    }),
  });

  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  return { valid: true, error: null };
}

async function validateGeminiLikeProvider({
  apiKey,
  baseUrl,
  authType,
  providerSpecificData = {},
}: any) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  // Use the correct auth header based on provider config:
  // - gemini (API key): x-goog-api-key
  // - gemini-cli (OAuth): Bearer token
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authType === "oauth") {
    headers["Authorization"] = `Bearer ${apiKey}`;
  } else {
    headers["x-goog-api-key"] = apiKey;
  }
  applyCustomUserAgent(headers, providerSpecificData);

  const response = await validationRead(baseUrl, { method: "GET", headers });

  if (response.ok) {
    return { valid: true, error: null };
  }

  // 429 = rate limited, but auth is valid
  if (response.status === 429) {
    return { valid: true, error: null };
  }

  // Google returns 400 (not 401/403) for invalid API keys on the models endpoint.
  // Parse the response body to detect auth failures.
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
      // 401/403 are always auth failures even without matching patterns
      if (response.status === 401 || response.status === 403) {
        return { valid: false, error: "Invalid API key" };
      }
    } catch {
      // Unparseable body — 401/403 are always auth failures
      if (response.status === 401 || response.status === 403) {
        return { valid: false, error: "Invalid API key" };
      }
      // 400 without parseable body — likely auth issue for Gemini
      return { valid: false, error: "Invalid API key" };
    }
  }

  return { valid: false, error: `Validation failed: ${response.status}` };
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

async function validateNanoBananaProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // NanoBanana doesn't expose a lightweight validation endpoint,
    // so we send a minimal generate request that will succeed or fail on auth.
    const response = await validationWrite(
      "https://api.nanobananaapi.ai/api/v1/nanobanana/generate",
      {
        method: "POST",
        headers: applyCustomUserAgent(
          {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          providerSpecificData
        ),
        body: JSON.stringify({
          prompt: "test",
          model: "nanobanana-flash",
        }),
      }
    );
    // Auth errors → 401/403; anything else (even 400 bad request) means auth passed
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: true, error: null };
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

async function validateSnowflakeProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const usesProgrammaticAccessToken = apiKey.startsWith("pat/");
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

async function validateAnthropicCompatibleProvider({ apiKey, providerSpecificData = {} }: any) {
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
      }
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
      }
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
  const sessionId = JSON.parse(payload.metadata.user_id).session_id;

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

async function validateSearchProvider(
  url: string,
  init: RequestInit,
  providerSpecificData: any = {}
): Promise<{ valid: boolean; error: string | null; unsupported: false }> {
  try {
    const response = await safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.validationWrite,
      guard: getProviderOutboundGuard(),
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
  (apiKey: string) => { url: string; init: RequestInit }
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
};

export async function validateProviderApiKey({ provider, apiKey, providerSpecificData = {} }: any) {
  if (!provider || !apiKey) {
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
      return await validateAnthropicCompatibleProvider({ apiKey, providerSpecificData });
    } catch (error: any) {
      return toValidationErrorResult(error);
    }
  }

  // ── Specialty provider validation ──
  const SPECIALTY_VALIDATORS = {
    qoder: ({ apiKey, providerSpecificData }: any) =>
      validateQoderCliPat({ apiKey, providerSpecificData }),
    deepgram: validateDeepgramProvider,
    assemblyai: validateAssemblyAIProvider,
    nanobanana: validateNanoBananaProvider,
    elevenlabs: validateElevenLabsProvider,
    inworld: validateInworldProvider,
    "bailian-coding-plan": validateBailianCodingPlanProvider,
    heroku: validateHerokuProvider,
    databricks: validateDatabricksProvider,
    snowflake: validateSnowflakeProvider,
    gigachat: validateGigachatProvider,
    vertex: async ({ apiKey }: any) => {
      try {
        const { parseSAFromApiKey, getAccessToken } =
          await import("@omniroute/open-sse/executors/vertex.ts");
        const sa = parseSAFromApiKey(apiKey);
        // Validates credentials by successfully exchanging them for a JWT from Google Identity
        await getAccessToken(sa);
        return { valid: true, error: null };
      } catch (error: any) {
        return { valid: false, error: "Invalid Service Account JSON: " + error.message };
      }
    },
    // LongCat AI — does not expose /v1/models; validate via chat completions directly (#592)
    longcat: async ({ apiKey, providerSpecificData }: any) => {
      try {
        const res = await validationWrite("https://api.longcat.chat/openai/v1/chat/completions", {
          method: "POST",
          headers: buildBearerHeaders(apiKey, providerSpecificData),
          body: JSON.stringify({
            model: "longcat",
            messages: [{ role: "user", content: "test" }],
            max_tokens: 1,
          }),
        });
        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        // Any non-auth response (200, 400, 422) means auth passed
        return { valid: true, error: null };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    // Search providers — use factored validator
    ...Object.fromEntries(
      Object.entries(SEARCH_VALIDATOR_CONFIGS).map(([id, configFn]) => [
        id,
        ({ apiKey, providerSpecificData }: any) => {
          const { url, init } = configFn(apiKey);
          return validateSearchProvider(url, init, providerSpecificData);
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
        provider,
        apiKey,
        baseUrl,
        providerSpecificData,
        modelId,
        modelsUrl: entry.modelsUrl,
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
      });
    }

    if (GEMINI_LIKE_FORMATS.has(entry.format)) {
      return await validateGeminiLikeProvider({
        apiKey,
        baseUrl,
        providerSpecificData,
        authType: entry.authType,
      });
    }

    return { valid: false, error: "Provider validation not supported", unsupported: true };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
