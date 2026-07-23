import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isLocalProvider,
  isOpenAICompatibleProvider,
  isSelfHostedChatProvider,
  providerAllowsOptionalApiKey,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers";
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { resolveNvidiaValidationModel } from "@/lib/providers/nvidiaValidationModel";
import { MODAL_DEFAULT_VALIDATION_MODEL_ID } from "@/shared/constants/modal";
import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";
import { validateImageProviderApiKey } from "@/lib/providers/imageValidation";
import { KiroService } from "@/lib/oauth/services/kiro";
import { usesCcWireImage } from "@omniroute/open-sse/services/ccWireImageBuiltins.ts";
import {
  isAlibabaRegionalProvider,
  resolveAlibabaProviderBaseUrl,
} from "@/shared/constants/alibabaProviderRegions";
import { buildProviderHeaders, buildProviderUrl } from "@omniroute/open-sse/services/provider.ts";

import {
  OPENAI_LIKE_FORMATS,
  GEMINI_LIKE_FORMATS,
  normalizeBaseUrl,
  addModelsSuffix,
  resolveBaseUrl,
} from "./validation/urlHelpers";
import { STANDARD_USER_AGENT, directHttpsRequest, buildBearerHeaders } from "./validation/headers";
import {
  validationRead,
  validationWrite,
  toValidationErrorResult,
  toWebCookieValidationErrorResult,
  WEB_COOKIE_PROVIDERS_WITHOUT_MODELS_API,
} from "./validation/transport";
import {
  validateDeepSeekWebProvider,
  validateQwenWebProvider,
  validateGrokWebProvider,
  validateChatGptWebProvider,
  validatePerplexityWebProvider,
  validateBlackboxWebProvider,
  validateKimiWebProvider,
} from "./validation/webProvidersA";
import {
  validateMuseSparkWebProvider,
  validateAdaptaWebProvider,
  validateClaudeWebProvider,
  validateGeminiWebProvider,
  validateCopilotM365WebProvider,
  validateCopilotWebProvider,
  validateT3WebProvider,
  validateJulesProvider,
  validateDevinCloudAgentProvider,
  validateInnerAiProvider,
  validateNotionWebProvider,
} from "./validation/webProvidersB";
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
import {
  validateDeepgramProvider,
  validateAssemblyAIProvider,
  validateRevAiProvider,
  validateElevenLabsProvider,
  validateInworldProvider,
  validateKieProvider,
  validateAwsPollyProvider,
  validateBailianCodingPlanProvider,
  validateQwenCloudTokenPlanProvider,
  validateRekaProvider,
  validateMaritalkProvider,
  validateNlpCloudProvider,
  validateRunwayProvider,
  validateNousResearchProvider,
  validatePoeProvider,
} from "./validation/audioMiscProviders";
import { validateSearchProvider, SEARCH_VALIDATOR_CONFIGS } from "./validation/searchProviders";
import {
  validateClarifaiProvider,
  validateEmbeddingApiProvider,
  validateRerankApiProvider,
} from "./validation/embeddingProviders";
import {
  validateBedrockProvider,
  validateOpenAILikeProvider,
  validateCommandCodeProvider,
  validateGeminiLikeProvider,
  validateHuggingFaceProvider,
  validateOpenAICompatibleProvider,
} from "./validation/openaiFormat";
import {
  validateAnthropicLikeProvider,
  validateAnthropicCompatibleProvider,
  validateClaudeCodeCompatibleProvider,
} from "./validation/anthropicFormat";
// validateCommandCodeProvider + validateClaudeCodeCompatibleProvider have external importers
// (provider-nodes/validate route + tests) — re-export to preserve the historical public surface.
export { validateCommandCodeProvider, validateClaudeCodeCompatibleProvider };

// isRetryableProxyTarget + isSecurityBlockError now live in ./validation/transport. Re-export them
// here to preserve the historical public surface (tests + route handlers import them via this module).
export { isRetryableProxyTarget, isSecurityBlockError } from "./validation/transport";

/**
 * Validates web-cookie providers by performing a ping request to check if the session is still valid.
 * Returns SESSION_EXPIRED error code if the upstream returns 401/403.
 */
export async function validateWebCookieProvider({
  provider,
  apiKey,
  providerSpecificData: _providerSpecificData = {},
}: {
  provider: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}) {
  try {
    const entry = getRegistryEntry(provider);
    const cookieProvider = WEB_COOKIE_PROVIDERS[provider as keyof typeof WEB_COOKIE_PROVIDERS];
    if (!entry && !cookieProvider) {
      return { valid: false, error: "Provider not found in registry", unsupported: true };
    }

    // For web-cookie providers, apiKey contains the cookie string
    const cookie = (apiKey || "").trim();
    if (!cookie) {
      return { valid: false, error: "Cookie required for web-cookie provider", unsupported: false };
    }

    if (!entry) {
      // Providers listed in WEB_COOKIE_PROVIDERS without a providerRegistry entry (e.g.
      // gemini-business, poe-web, venice-web, v0-vercel-web) only expose a
      // marketing website URL, not a real API host. Probing `${website}/models`
      // does not reliably signal session validity for these —
      // live verification showed most return redirects or SPA 200s regardless of
      // cookie validity, which would silently report an expired/garbage cookie as
      // "OK" (worse than an honest "not supported"). Until each of these providers
      // has a verified, side-effect-free auth probe against its real API host, report
      // unsupported instead of a false positive.
      return {
        valid: false,
        error: "Provider validation not supported",
        unsupported: true,
      };
    }

    // Attempt a minimal request to check if the session is valid
    // Use /models endpoint or a minimal completion request depending on the provider
    const baseUrl = normalizeBaseUrl(entry.baseUrl || "");

    // Defense-in-depth: only an http(s) baseUrl without a query string is safe to
    // probe by blindly appending `/models`. A ws(s):// baseUrl (e.g. copilot-web) is
    // already rejected by the outbound URL guard downstream, but reject it explicitly
    // here for the honest "unsupported" result instead of a confusing security-block
    // message — this also covers a future http(s) baseUrl carrying a query string,
    // which the guard does not currently block (#7857 acceptance criteria).
    if (!/^https?:\/\//i.test(baseUrl) || baseUrl.includes("?")) {
      return {
        valid: false,
        error: "Provider validation not supported",
        unsupported: true,
      };
    }

    const testUrl = `${baseUrl}/models`;

    const res = await validationRead(
      testUrl,
      {
        method: "GET",
        headers: {
          "User-Agent": STANDARD_USER_AGENT,
          Cookie: cookie,
        },
      },
      isLocalProvider(provider)
    );

    if (res.status === 401 || res.status === 403) {
      return {
        valid: false,
        error: "SESSION_EXPIRED",
        errorCode: "AUTH_007",
        unsupported: false,
      };
    }

    // #7857: for providers whose baseUrl is a conversation/completion endpoint rather
    // than a real API root, the /models path never existed upstream — a redirect,
    // login-HTML 200, 404, 405, or 429 from it is not a meaningful auth signal and is
    // indistinguishable from a genuinely valid session. Report the same honest
    // "unsupported" result the !entry branch above already gives its no-registry
    // siblings, instead of a false `valid: true`.
    if (WEB_COOKIE_PROVIDERS_WITHOUT_MODELS_API.has(provider)) {
      return {
        valid: false,
        error: "Provider validation not supported",
        unsupported: true,
      };
    }

    // Any other response (200, 404, 405, 429, ...) means the cookie was accepted —
    // a 401/403 from the /models probe is the only definitive "session expired" signal
    // for web-cookie auth, so a non-auth status is treated as a valid session.
    return { valid: true, error: null, unsupported: false };
  } catch (error: unknown) {
    return toWebCookieValidationErrorResult(provider, error);
  }
}

// #5422: Bytez key validation cannot use a chat probe. A Bytez account only serves models
// that have been added to its catalog, so even Bytez's own documented model ids return 404
// ("Model does not exist or has yet to be added to the Bytez catalog") for a fresh/free key —
// the generic OpenAI-like chat probe misreads that 404 as "endpoint not supported". Validate
// against the model-independent, auth-only tasks endpoint instead (verified live):
//   GET …/models/v2/list/tasks → 200 (valid key) | 401 { error: "Unauthorized" } (invalid).
// The pure status→result mapping is factored out so it is unit-testable without network.
export function bytezValidationResultFromStatus(status: number): {
  valid: boolean;
  error: string | null;
} {
  if (status === 200) {
    return { valid: true, error: null };
  }
  if (status === 401 || status === 403) {
    return { valid: false, error: "Invalid API key" };
  }
  return { valid: false, error: `Validation failed: ${status}` };
}

export async function validateBytezProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const res = await validationRead("https://api.bytez.com/models/v2/list/tasks", {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });
    return bytezValidationResultFromStatus(res.status);
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}

async function validateKiroApiKeyRuntimeProbe({
  apiKey,
  region,
  profileArn,
}: {
  apiKey: string;
  region: string;
  profileArn?: string | null;
}) {
  const endpoint =
    region === "us-east-1"
      ? "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse"
      : `https://q.${region}.amazonaws.com/generateAssistantResponse`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const body = {
      ...(profileArn ? { profileArn } : {}),
      conversationState: {
        chatTriggerType: "MANUAL",
        conversationId: crypto.randomUUID(),
        currentMessage: {
          userInputMessage: {
            content: "ping",
            modelId: "auto",
            origin: "AI_EDITOR",
          },
        },
        history: [],
      },
      inferenceConfig: {
        maxTokens: 1,
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        tokentype: "API_KEY",
        "Content-Type": "application/x-amz-json-1.0",
        "X-Amz-Target": "AmazonCodeWhispererStreamingService.GenerateAssistantResponse",
        Accept: "application/vnd.amazon.eventstream",
        "Amz-Sdk-Request": "attempt=1; max=3",
        "Amz-Sdk-Invocation-Id": crypto.randomUUID(),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    await res.body?.cancel().catch(() => undefined);

    if (res.ok) {
      return { valid: true, error: null, method: "kiro_generate_assistant_response" };
    }
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid Kiro API key or AWS region" };
    }
    if (res.status === 400 || res.status === 422 || res.status === 429) {
      return { valid: true, error: null, method: `kiro_generate_assistant_response_${res.status}` };
    }
    return { valid: false, error: `Kiro validation failed: ${res.status}` };
  } finally {
    clearTimeout(timeout);
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
    "v0-vercel": async ({ apiKey, providerSpecificData }: any) => {
      try {
        const configuredBaseUrl =
          typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
            ? providerSpecificData.baseUrl.trim()
            : "https://api.v0.dev";

        const root = normalizeBaseUrl(configuredBaseUrl)
          .replace(/\/v1\/chat\/completions$/, "")
          .replace(/\/v1$/, "");

        const res = await validationRead(
          `${root}/v1/chats?limit=1`,
          {
            method: "GET",
            headers: buildBearerHeaders(apiKey, providerSpecificData),
          },
          isLocal
        );

        if (res.ok) {
          return { valid: true, error: null, method: "v0_platform_chats_list" };
        }

        if (res.status === 401 || res.status === 403) {
          return { valid: false, error: "Invalid API key" };
        }

        return { valid: false, error: `v0 validation failed: ${res.status}` };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    jules: validateJulesProvider,
    // "devin" is the Cognition cloud-agent provider (distinct from the "devin-cli"
    // LLM/ACP provider, which is already registered in providerRegistry). Wired here
    // for parity with the "jules" cloud-agent entry above — see #6142.
    devin: validateDevinCloudAgentProvider,
    // auggie is a fully local, credential-less CLI passthrough — there is no API
    // key to check upstream. The only meaningful validation is confirming the
    // `auggie` binary is installed and runnable on this machine.
    auggie: async () => {
      const { checkAuggieCliVersion } = await import("@omniroute/open-sse/executors/auggie.ts");
      const result = await checkAuggieCliVersion();
      if (!result.ok) {
        return {
          valid: false,
          error: result.error || "Auggie CLI not found. Install it and run `auggie login`.",
          unsupported: false,
        };
      }
      return { valid: true, error: null, unsupported: false, method: result.version };
    },
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
    kiro: async ({ apiKey, providerSpecificData }: any) => {
      try {
        const region = providerSpecificData?.region || "us-east-1";
        const credential = await new KiroService().validateApiKey(apiKey, region);
        if (!credential.profileArn) {
          return await validateKiroApiKeyRuntimeProbe({
            apiKey: credential.accessToken,
            region: credential.region,
            profileArn: providerSpecificData?.profileArn,
          });
        }
        return {
          valid: true,
          error: null,
          method: "kiro_list_available_profiles",
        };
      } catch (error: any) {
        return toValidationErrorResult(error);
      }
    },
    "command-code": validateCommandCodeProvider,
    huggingface: validateHuggingFaceProvider,
    // #5422: auth-only probe — Bytez 404s on every chat model until the account adds it to
    // its catalog, so the generic chat probe can't validate a fresh key.
    bytez: validateBytezProvider,
    deepgram: validateDeepgramProvider,
    assemblyai: validateAssemblyAIProvider,
    "rev-ai": validateRevAiProvider,
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
    "qwen-cloud-token-plan": validateQwenCloudTokenPlanProvider,
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
        modelId: MODAL_DEFAULT_VALIDATION_MODEL_ID,
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
    "kimi-web": validateKimiWebProvider,
    "chatgpt-web": validateChatGptWebProvider,
    "perplexity-web": validatePerplexityWebProvider,
    "blackbox-web": validateBlackboxWebProvider,
    "muse-spark-web": validateMuseSparkWebProvider,
    "inner-ai": validateInnerAiProvider,
    "adapta-web": validateAdaptaWebProvider,
    "claude-web": validateClaudeWebProvider,
    "gemini-web": validateGeminiWebProvider,
    "notion-web": validateNotionWebProvider,
    "copilot-m365-web": validateCopilotM365WebProvider,
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
              model: "LongCat-2.0",
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
  const usesAlibabaRegionalEndpoint = isAlibabaRegionalProvider(provider);
  const baseUrl = usesAlibabaRegionalEndpoint
    ? resolveAlibabaProviderBaseUrl(provider, providerSpecificData, validationEntry.baseUrl)
    : resolveBaseUrl(validationEntry, providerSpecificData);

  try {
    if (OPENAI_LIKE_FORMATS.has(entry.format)) {
      return await validateOpenAILikeProvider({
        apiKey,
        baseUrl,
        headers: entry.headers || {},
        providerSpecificData,
        modelId,
        modelsUrl: usesAlibabaRegionalEndpoint ? "" : entry.testKeyModelsUrl || entry.modelsUrl,
        isLocal,
      });
    }

    if (entry.format === "claude") {
      // Built-in CC-wire-image providers (e.g. agentrouter, #6056/#6255) gate
      // their WAF on the dynamic Claude-Code fingerprint (User-Agent,
      // `?beta=true` chat path, anthropic-beta/x-app/X-Stainless-* headers).
      // The real chat-request path already routes through
      // buildProviderUrl/buildProviderHeaders for this; the validation probe
      // must use the SAME wire image or a genuinely valid key gets 403'd as
      // "unauthorized client detected" (#6377).
      if (usesCcWireImage(provider)) {
        const requestBaseUrl = buildProviderUrl(provider, modelId, true, { baseUrl });
        const requestHeaders = buildProviderHeaders(provider, { apiKey }, true);

        return await validateAnthropicLikeProvider({
          apiKey,
          baseUrl: requestBaseUrl,
          modelId,
          headers: requestHeaders,
          providerSpecificData,
          isLocal,
        });
      }

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
