
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
  extractCookieValue,
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

import { addModelsSuffix, validationRead, resolveChatUrl, validationWrite, toValidationErrorResult, applyCustomUserAgent, normalizeBaseUrl, buildBearerHeaders, normalizeAnthropicBaseUrl, normalizeClaudeCodeCompatibleBaseUrl } from "./utils.ts";



export async function validateOpenAILikeProvider({
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



export async function validateAnthropicLikeProvider({
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



export async function validateGeminiLikeProvider({
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



export async function validateOpenAICompatibleProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateAnthropicCompatibleProvider({
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

