import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);
const GEMINI_LIKE_FORMATS = new Set(["gemini", "gemini-cli"]);

function normalizeBaseUrl(baseUrl: string) {
  return (baseUrl || "").trim().replace(/\/$/, "");
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

function buildBearerHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

async function validateOpenAILikeProvider({
  provider,
  apiKey,
  baseUrl,
  providerSpecificData = {},
  modelId = "gpt-4o-mini",
}) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const modelsUrl = addModelsSuffix(baseUrl);
  if (!modelsUrl) {
    return { valid: false, error: "Invalid models endpoint" };
  }

  const modelsRes = await fetch(modelsUrl, {
    method: "GET",
    headers: buildBearerHeaders(apiKey),
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

  const testBody = {
    model: modelId,
    messages: [{ role: "user", content: "test" }],
    max_tokens: 1,
  };

  const chatRes = await fetch(chatUrl, {
    method: "POST",
    headers: buildBearerHeaders(apiKey),
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

async function validateAnthropicLikeProvider({ apiKey, baseUrl, modelId, headers = {} }: any) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (!requestHeaders["x-api-key"] && !requestHeaders["X-API-Key"]) {
    requestHeaders["x-api-key"] = apiKey;
  }

  if (!requestHeaders["anthropic-version"] && !requestHeaders["Anthropic-Version"]) {
    requestHeaders["anthropic-version"] = "2023-06-01";
  }

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      model: modelId || "claude-3-5-sonnet-20241022",
      max_tokens: 1,
      messages: [{ role: "user", content: "test" }],
    }),
  });

  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  return { valid: true, error: null };
}

async function validateGeminiLikeProvider({ apiKey, baseUrl }: any) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const separator = baseUrl.includes("?") ? "&" : "?";
  const response = await fetch(`${baseUrl}${separator}key=${encodeURIComponent(apiKey)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    return { valid: true, error: null };
  }

  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  return { valid: false, error: `Validation failed: ${response.status}` };
}

// ── Specialty providers (non-standard APIs) ──

async function validateDeepgramProvider({ apiKey }: any) {
  try {
    const response = await fetch("https://api.deepgram.com/v1/auth/token", {
      method: "GET",
      headers: { Authorization: `Token ${apiKey}` },
    });
    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return { valid: false, error: error.message || "Validation failed" };
  }
}

async function validateAssemblyAIProvider({ apiKey }: any) {
  try {
    const response = await fetch("https://api.assemblyai.com/v2/transcript?limit=1", {
      method: "GET",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) return { valid: true, error: null };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return { valid: false, error: error.message || "Validation failed" };
  }
}

async function validateNanoBananaProvider({ apiKey }: any) {
  try {
    // NanoBanana doesn't expose a lightweight validation endpoint,
    // so we send a minimal generate request that will succeed or fail on auth.
    const response = await fetch("https://api.nanobananaapi.ai/api/v1/nanobanana/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "test",
        model: "nanobanana-flash",
      }),
    });
    // Auth errors → 401/403; anything else (even 400 bad request) means auth passed
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return { valid: false, error: error.message || "Validation failed" };
  }
}

async function validateOpenAICompatibleProvider({ apiKey, providerSpecificData = {} }: any) {
  const baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for OpenAI compatible provider" };
  }

  const response = await fetch(`${baseUrl}/models`, {
    method: "GET",
    headers: buildBearerHeaders(apiKey),
  });

  if (response.ok) {
    return { valid: true, error: null };
  }

  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  return { valid: false, error: `Validation failed: ${response.status}` };
}

async function validateAnthropicCompatibleProvider({ apiKey, providerSpecificData = {} }: any) {
  let baseUrl = normalizeBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for Anthropic compatible provider" };
  }

  if (baseUrl.endsWith("/messages")) {
    baseUrl = baseUrl.slice(0, -9);
  }

  const response = await fetch(`${baseUrl}/models`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (response.ok) {
    return { valid: true, error: null };
  }

  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key" };
  }

  return { valid: false, error: `Validation failed: ${response.status}` };
}

export async function validateProviderApiKey({ provider, apiKey, providerSpecificData = {} }: any) {
  if (!provider || !apiKey) {
    return { valid: false, error: "Provider and API key required", unsupported: false };
  }

  if (isOpenAICompatibleProvider(provider)) {
    try {
      return await validateOpenAICompatibleProvider({ apiKey, providerSpecificData });
    } catch (error: any) {
      return { valid: false, error: error.message || "Validation failed", unsupported: false };
    }
  }

  if (isAnthropicCompatibleProvider(provider)) {
    try {
      return await validateAnthropicCompatibleProvider({ apiKey, providerSpecificData });
    } catch (error: any) {
      return { valid: false, error: error.message || "Validation failed", unsupported: false };
    }
  }

  // ── Specialty provider validation ──
  const SPECIALTY_VALIDATORS = {
    deepgram: validateDeepgramProvider,
    assemblyai: validateAssemblyAIProvider,
    nanobanana: validateNanoBananaProvider,
  };

  if (SPECIALTY_VALIDATORS[provider]) {
    try {
      return await SPECIALTY_VALIDATORS[provider]({ apiKey, providerSpecificData });
    } catch (error: any) {
      return { valid: false, error: error.message || "Validation failed", unsupported: false };
    }
  }

  const entry = getRegistryEntry(provider);
  if (!entry) {
    return { valid: false, error: "Provider validation not supported", unsupported: true };
  }

  const modelId = entry.models?.[0]?.id || null;
  const baseUrl = resolveBaseUrl(entry, providerSpecificData);

  try {
    if (OPENAI_LIKE_FORMATS.has(entry.format)) {
      return await validateOpenAILikeProvider({
        provider,
        apiKey,
        baseUrl,
        providerSpecificData,
        modelId,
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
      });
    }

    if (GEMINI_LIKE_FORMATS.has(entry.format)) {
      return await validateGeminiLikeProvider({
        apiKey,
        baseUrl,
      });
    }

    return { valid: false, error: "Provider validation not supported", unsupported: true };
  } catch (error: any) {
    return { valid: false, error: error.message || "Validation failed", unsupported: false };
  }
}
