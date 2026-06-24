import { randomUUID } from "node:crypto";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
  joinBaseUrlAndPath,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isLocalProvider,
  isOpenAICompatibleProvider,
  isSelfHostedChatProvider,
  providerAllowsOptionalApiKey,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { resolveNvidiaValidationModel } from "@/lib/providers/nvidiaValidationModel";
import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";
import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
  isBedrockNativeAuthError,
} from "@omniroute/open-sse/services/bedrock.ts";
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

import {
  OPENAI_LIKE_FORMATS,
  GEMINI_LIKE_FORMATS,
  normalizeBaseUrl,
  normalizeAnthropicBaseUrl,
  normalizeClaudeCodeCompatibleBaseUrl,
  addModelsSuffix,
  resolveBaseUrl,
  resolveChatUrl,
} from "./validation/urlHelpers";
import {
  STANDARD_USER_AGENT,
  applyCustomUserAgent,
  withCustomUserAgent,
  directHttpsRequest,
  buildBearerHeaders,
  buildRekaHeaders,
  buildClarifaiHeaders,
  buildKeyHeaders,
  buildTokenHeaders,
} from "./validation/headers";
import {
  validationRead,
  validationWrite,
  toValidationErrorResult,
} from "./validation/transport";
import {
  validateDeepSeekWebProvider,
  validateQwenWebProvider,
  validateGrokWebProvider,
  validateChatGptWebProvider,
  validatePerplexityWebProvider,
  validateBlackboxWebProvider,
} from "./validation/webProvidersA";
import {
  validateMuseSparkWebProvider,
  validateAdaptaWebProvider,
  validateClaudeWebProvider,
  validateGeminiWebProvider,
  validateCopilotWebProvider,
  validateT3WebProvider,
  validateJulesProvider,
  validateInnerAiProvider,
} from "./validation/webProvidersB";
import { validateDirectChatProvider } from "./validation/directChatProbe";
import {
  validateHerokuProvider,
  validateDatabricksProvider,
  validateDataRobotProvider,
  validateSnowflakeProvider,
  validateGigachatProvider,
  validateAzureOpenAIProvider,
  validateAzureAiProvider,
  validateWatsonxProvider,
  validateOciProvider,
  validateSapProvider,
} from "./validation/cloudProviders";

// isRetryableProxyTarget + isSecurityBlockError now live in ./validation/transport. Re-export them
// here to preserve the historical public surface (tests + route handlers import them via this module).
export { isRetryableProxyTarget, isSecurityBlockError } from "./validation/transport";

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
      : "Hermes-4-70B";

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

    // #3881: any other non-auth 4xx (e.g. 400 model-not-found, 404, 422) means the
    // credentials were accepted — only the probe model/request shape was rejected.
    // Treat as valid (mirrors the longcat/nvidia validators) so a model rename upstream
    // can't make a working key read as "invalid".
    if (response.status >= 400 && response.status < 500) {
      return {
        valid: true,
        error: null,
        method: "nous_chat_completions",
        warning: `Credentials valid (probe returned ${response.status})`,
      };
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

  // Step 1: Best-effort GET /models probe. /models is NOT part of the Anthropic API spec
  // and many compatible proxies either 404, 401, or 403 on /models even with a valid key —
  // so a 401/403 here must NOT mark the credentials invalid. Only a 2xx is a positive
  // signal that the proxy DOES implement /models AND the key was accepted; everything else
  // (including auth-shaped statuses) falls through to the authoritative POST /v1/messages
  // probe below. Ported from decolua/9router 584cf66a.
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
  } catch {
    // /models fetch failed — fall through to messages test
  }

  // Step 2: Authoritative probe — POST /v1/messages with max_tokens=1.
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
  // ── Web-fetch providers (#4401) ──
  // firecrawl / jina-reader were added as webFetch-kind providers in #2645 with their
  // own executors but no validator, so the dashboard "Validate" step returned
  // "Provider validation not supported" and accounts could not be added through the UI.
  // Probe each provider's real fetch endpoint with the same Bearer auth the executor
  // uses; validateSearchProvider maps 200/<500 → valid, 401/403 → invalid key,
  // >=500 → failure (a credit-exhausted / rate-limited key still validates).
  firecrawl: (apiKey) => ({
    url: "https://api.firecrawl.dev/v1/scrape",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ url: "https://example.com", formats: ["markdown"] }),
    },
  }),
  "jina-reader": (apiKey) => ({
    url: "https://r.jina.ai/https://example.com",
    init: {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    },
  }),
};

// See open-sse/executors/muse-spark-web.ts for the rationale: Meta migrated
// from the "Abra" mutation (doc_id 078dfdff…, type RewriteOptionsInput now
// missing from schema) to the "Ecto" subscription. POST graphql still
// streams the response; only the persisted-query identifier and operation
// shape changed.
/**
 * Validates web-cookie providers by performing a ping request to check if the session is still valid.
 * Returns SESSION_EXPIRED error code if the upstream returns 401/403.
 */
export async function validateWebCookieProvider({
  provider,
  apiKey,
  providerSpecificData = {},
}: any) {
  try {
    const entry = getRegistryEntry(provider);
    if (!entry) {
      return { valid: false, error: "Provider not found in registry", unsupported: true };
    }

    // For web-cookie providers, apiKey contains the cookie string
    const cookie = (apiKey || "").trim();
    if (!cookie) {
      return { valid: false, error: "Cookie required for web-cookie provider", unsupported: false };
    }

    // Attempt a minimal request to check if the session is valid
    // Use /models endpoint or a minimal completion request depending on the provider
    const baseUrl = entry.baseUrl || "";
    const testUrl = `${baseUrl}/models`;

    const res = await directHttpsRequest(
      testUrl,
      {
        method: "GET",
        headers: {
          "User-Agent": STANDARD_USER_AGENT,
        },
      },
      10_000
    );

    if (res.status === 401 || res.status === 403) {
      return {
        valid: false,
        error: "SESSION_EXPIRED",
        errorCode: "AUTH_007",
        unsupported: false,
      };
    }

    // Any other response (200, 404, 405, 429, ...) means the cookie was accepted —
    // a 401/403 from the /models probe is the only definitive "session expired" signal
    // for web-cookie auth, so a non-auth status is treated as a valid session.
    return { valid: true, error: null, unsupported: false };
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
    // Z.AI (glm) — bypass the proxy/TLS-patched fetch for the same reason as nvidia
    // above (#3905): the undici dispatcher stalls against api.z.ai after the provider
    // returns 502 "job timed out" responses, because z.ai silently drops idle
    // keep-alive sockets without sending TCP RST. Using directHttpsRequest (native
    // Node.js HTTPS, no undici pool) avoids the zombie-socket hang on validation.
    // Z.AI uses the Anthropic wire format with x-api-key auth, not Bearer.
    zai: async ({ apiKey, providerSpecificData }: any) => {
      try {
        // providerSpecificData.baseUrl allows test overrides to point at a local
        // HTTP server; production always uses the fixed api.z.ai endpoint.
        const messagesUrl = providerSpecificData?.baseUrl
          ? `${normalizeBaseUrl(providerSpecificData.baseUrl).split("?")[0]}?beta=true`
          : "https://api.z.ai/api/anthropic/v1/messages?beta=true";
        const res = await directHttpsRequest(
          messagesUrl,
          {
            method: "POST",
            headers: {
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              model: "glm-5.1",
              messages: [{ role: "user", content: "test" }],
              max_tokens: 1,
            }),
          },
          20000
        );
        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }
        if (res.status === 404 || res.status === 405) {
          return { valid: false, error: "Provider validation endpoint not supported" };
        }
        if (res.status >= 500 && res.status !== 502) {
          return { valid: false, error: `Provider unavailable (${res.status})` };
        }
        // Any non-auth response (200, 400, 422, 429, 502) means auth passed;
        // 502 "job timed out" is z.ai's own server-side queue limit, not an auth error.
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

  // Web-cookie providers WITHOUT a dedicated specialty validator above fall back to the generic
  // session-ping check (AUTH_007 SESSION_EXPIRED on 401/403). Providers that DO have a rich
  // per-provider validator (grok-web, chatgpt-web, claude-web, …) are handled by
  // SPECIALTY_VALIDATORS first and must not be shadowed by this generic probe (issue: the
  // #4023 dispatch was placed too early and intercepted every web-cookie provider).
  if (WEB_COOKIE_PROVIDERS[provider]) {
    try {
      return await validateWebCookieProvider({ provider, apiKey, providerSpecificData });
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
