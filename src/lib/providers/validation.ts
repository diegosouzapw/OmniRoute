import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
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
  isSelfHostedChatProvider,
} from "@/shared/constants/providers";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { getGigachatAccessToken } from "@omniroute/open-sse/services/gigachatAuth.ts";
import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";
import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiChatUrl,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";
import {
  BEDROCK_DEFAULT_BASE_URL,
  buildBedrockModelsUrl,
  getBedrockValidationModelId,
  normalizeBedrockBaseUrl,
} from "@omniroute/open-sse/config/bedrock.ts";
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
import { PETALS_DEFAULT_MODEL, normalizePetalsBaseUrl } from "@omniroute/open-sse/config/petals.ts";
import { signAwsRequest } from "@omniroute/open-sse/utils/awsSigV4.ts";

const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);
const GEMINI_LIKE_FORMATS = new Set(["gemini", "gemini-cli"]);

function normalizeBaseUrl(baseUrl: string) {
  return (baseUrl || "").trim().replace(/\/$/, "");
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

function buildTokenHeaders(apiKey: string, providerSpecificData: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Token ${apiKey}`;
  }

  return applyCustomUserAgent(headers, providerSpecificData);
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
        model: providerSpecificData.validationModelId || "reka-flash",
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

async function validatePetalsProvider({ apiKey, providerSpecificData = {} }: any) {
  const url = normalizePetalsBaseUrl(providerSpecificData.baseUrl);
  const modelId =
    typeof providerSpecificData.validationModelId === "string" &&
    providerSpecificData.validationModelId.trim()
      ? providerSpecificData.validationModelId.trim()
      : PETALS_DEFAULT_MODEL;
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const body = new URLSearchParams({
    model: modelId,
    inputs: "test",
    max_new_tokens: "1",
  });

  try {
    const response = await validationWrite(url, {
      method: "POST",
      headers,
      body: body.toString(),
    });

    if (response.ok) {
      const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
      if (payload.ok === false) {
        return {
          valid: false,
          error: "Petals API rejected validation request",
        };
      }
      return { valid: true, error: null, method: "petals_generate" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        method: "petals_generate",
        warning: "Rate limited, but endpoint is reachable",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }
  } catch (error: any) {
    return toValidationErrorResult(error);
  }

  return { valid: false, error: "Connection failed while testing Petals" };
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
  "searxng-search": (_apiKey, providerSpecificData = {}) => {
    const baseUrl =
      typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
        ? providerSpecificData.baseUrl.trim().replace(/\/+$/, "")
        : "http://localhost:8888/search";
    const searchUrl = baseUrl.endsWith("/search") ? baseUrl : `${baseUrl}/search`;
    return {
      url: `${searchUrl}?q=test&format=json`,
      init: {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    };
  },
};

const META_AI_SEND_MESSAGE_DOC_ID = "078dfdff6fb0d420d8011b49073e6886";
const META_AI_FRIENDLY_NAME = "useAbraSendMessageMutation";
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
      rewriteOptions: null,
      turnId: crypto.randomUUID(),
      userAgent: META_AI_USER_AGENT,
      userEventId: generateMetaAiEventId(conversationId),
      userLocale: "en_US",
      userMessageId: crypto.randomUUID(),
      userUniqueMessageId: generateMetaAiNumericMessageId(),
    },
  };
}

async function validateGrokWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    let token = apiKey;
    if (token.startsWith("sso=")) token = token.slice(4);

    // Generate the same Cloudflare-bypass headers the GrokWebExecutor uses.
    const randomHex = (n: number) => {
      const a = new Uint8Array(n);
      crypto.getRandomValues(a);
      return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
    };
    const statsigMsg = `e:TypeError: Cannot read properties of null (reading 'children')`;
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    const response = await validationWrite("https://grok.com/rest/app-chat/conversations/new", {
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
          Cookie: `sso=${token}`,
          Origin: "https://grok.com",
          Pragma: "no-cache",
          Referer: "https://grok.com/",
          "Sec-Ch-Ua": '"Google Chrome";v="136", "Chromium";v="136", "Not(A:Brand";v="24"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"macOS"',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
          "x-statsig-id": btoa(statsigMsg),
          "x-xai-request-id": crypto.randomUUID(),
          traceparent: `00-${traceId}-${spanId}-00`,
        },
        providerSpecificData
      ),
      body: JSON.stringify({
        temporary: true,
        modelName: "grok-4-1-thinking-1129",
        modelMode: "MODEL_MODE_FAST",
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
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
      };
    }

    // 200 or non-auth 4xx (e.g. 400, 429) means the cookie is accepted
    if (response.ok || (response.status >= 400 && response.status < 500)) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Grok unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
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
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
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

    const response = await validationWrite("https://www.perplexity.ai/rest/sse/perplexity_ask", {
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
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid Perplexity session cookie — re-paste __Secure-next-auth.session-token from perplexity.ai",
      };
    }

    if (response.ok || (response.status >= 400 && response.status < 500)) {
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
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "__Secure-authjs.session-token");
    const sessionHeaders = applyCustomUserAgent(
      {
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
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
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
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
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "abra_sess");
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

export async function validateProviderApiKey({ provider, apiKey, providerSpecificData = {} }: any) {
  const requiresApiKey =
    provider !== "searxng-search" && provider !== "petals" && !isSelfHostedChatProvider(provider);
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
    "aws-polly": validateAwsPollyProvider,
    "bailian-coding-plan": validateBailianCodingPlanProvider,
    heroku: validateHerokuProvider,
    databricks: validateDatabricksProvider,
    datarobot: validateDataRobotProvider,
    watsonx: validateWatsonxProvider,
    oci: validateOciProvider,
    sap: validateSapProvider,
    bedrock: ({ apiKey, providerSpecificData }: any) => {
      const baseUrl = normalizeBedrockBaseUrl(
        providerSpecificData?.baseUrl || BEDROCK_DEFAULT_BASE_URL
      );
      return validateOpenAILikeProvider({
        provider: "bedrock",
        apiKey,
        providerSpecificData,
        baseUrl,
        modelId: getBedrockValidationModelId(baseUrl),
        modelsUrl: buildBedrockModelsUrl(baseUrl),
      });
    },
    modal: ({ apiKey, providerSpecificData }: any) =>
      validateOpenAILikeProvider({
        provider: "modal",
        apiKey,
        providerSpecificData,
        baseUrl: normalizeBaseUrl(providerSpecificData?.baseUrl || ""),
        modelId: "Qwen/Qwen3-4B-Thinking-2507-FP8",
      }),
    "nous-research": validateNousResearchProvider,
    petals: validatePetalsProvider,
    poe: validatePoeProvider,
    clarifai: validateClarifaiProvider,
    reka: validateRekaProvider,
    nlpcloud: validateNlpCloudProvider,
    runwayml: validateRunwayProvider,
    snowflake: validateSnowflakeProvider,
    gigachat: validateGigachatProvider,
    "grok-web": validateGrokWebProvider,
    "perplexity-web": validatePerplexityWebProvider,
    "blackbox-web": validateBlackboxWebProvider,
    "muse-spark-web": validateMuseSparkWebProvider,
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
        const res = await validationWrite(`${root}/api/v4/code_suggestions/direct_access`, {
          method: "POST",
          headers: buildBearerHeaders(apiKey, providerSpecificData),
          body: "{}",
        });
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
    "vertex-partner": async ({ apiKey }: any) => {
      try {
        const { parseSAFromApiKey, getAccessToken } =
          await import("@omniroute/open-sse/executors/vertex.ts");
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
          const { url, init } = configFn(apiKey, providerSpecificData);
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
