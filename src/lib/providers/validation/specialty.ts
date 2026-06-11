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

import { validationWrite, applyCustomUserAgent, toValidationErrorResult, normalizeBaseUrl, addModelsSuffix, validationRead, buildClarifaiHeaders, resolveChatUrl, buildBearerHeaders, normalizeGigachatChatUrl, buildRekaHeaders, buildKeyHeaders, buildTokenHeaders } from "./utils.ts";



export async function validateDirectChatProvider({
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



export async function validateClarifaiProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateEmbeddingApiProvider({
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



export async function validateRerankApiProvider({ apiKey, providerSpecificData = {}, url, modelId }: any) {
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



// ── Specialty providers (non-standard APIs) ──

export async function validateDeepgramProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateAssemblyAIProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateElevenLabsProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateInworldProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateKieProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateBailianCodingPlanProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateGigachatProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateRekaProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateMaritalkProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateNlpCloudProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateRunwayProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validateNousResearchProvider({ apiKey, providerSpecificData = {} }: any) {
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



export async function validatePoeProvider({ apiKey, providerSpecificData = {} }: any) {
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

