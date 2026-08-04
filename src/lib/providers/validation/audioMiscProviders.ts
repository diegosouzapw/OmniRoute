// Audio/speech + miscellaneous API-key provider validators: deepgram, assemblyai, elevenlabs,
// inworld, kie, aws-polly, bailian-coding-plan, reka, maritalk, nlpcloud, runwayml, nous-research,
// poe. Extracted from validation.ts (god-file decomposition) — top-level functions with no
// dispatcher-state captures; behavior is byte-identical to the original inline defs.
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { POE_DEFAULT_BASE_URL } from "@omniroute/open-sse/config/providers/registry/poe/index.ts";
import { normalizeBaseUrl } from "./urlHelpers";
import {
  applyCustomUserAgent,
  buildBearerHeaders,
  buildKeyHeaders,
  buildRekaHeaders,
  buildTokenHeaders,
} from "./headers";
import { toValidationErrorResult, validationRead, validationWrite } from "./transport";
import { validateDirectChatProvider } from "./directChatProbe";
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
import { resolveAlibabaProviderBaseUrl } from "@/shared/constants/alibabaProviderRegions";

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

export async function validateRevAiProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const response = await validationRead("https://api.rev.ai/speechtotext/v1/jobs?limit=1", {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
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

export function getAwsProviderString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function getAwsPollyRegion(providerSpecificData: any = {}) {
  return (
    getAwsProviderString(providerSpecificData.region) ||
    getAwsProviderString(providerSpecificData.awsRegion) ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    "us-east-1"
  );
}

export function getAwsPollyBaseUrl(providerSpecificData: any = {}, region: string) {
  return (
    getAwsProviderString(providerSpecificData.baseUrl) || `https://polly.${region}.amazonaws.com`
  ).replace(/\/+$/, "");
}

export async function validateAwsPollyProvider({ apiKey, providerSpecificData = {} }: any) {
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

export async function validateBailianCodingPlanProvider({
  apiKey,
  providerSpecificData = {},
}: any) {
  try {
    const rawBaseUrl = normalizeBaseUrl(
      resolveAlibabaProviderBaseUrl("bailian-coding-plan", providerSpecificData)
    );
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

export async function validateQwenCloudTokenPlanProvider({
  apiKey,
  providerSpecificData = {},
}: any) {
  try {
    const baseUrl = normalizeBaseUrl(
      resolveAlibabaProviderBaseUrl("qwen-cloud-token-plan", providerSpecificData)
    ).replace(/\/chat\/completions$/i, "");
    const response = await validationWrite(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
      body: JSON.stringify({
        model: providerSpecificData.validationModelId || "qwen3.7-max",
        max_tokens: 1,
        messages: [{ role: "user", content: "test" }],
      }),
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    if (response.status === 429) {
      return {
        valid: true,
        error: null,
        warning: "Provider accepted the key but is rate limited (429)",
      };
    }
    if (response.ok || response.status === 400 || response.status === 422) {
      return { valid: true, error: null };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
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

export async function validatePoeProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl) || POE_DEFAULT_BASE_URL;
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
