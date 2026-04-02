import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinBaseUrlAndPath,
  stripAnthropicMessagesSuffix,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

const OPENAI_LIKE_FORMATS = new Set(["openai", "openai-responses"]);
const GEMINI_LIKE_FORMATS = new Set(["gemini", "gemini-cli"]);

function normalizeBaseUrl(baseUrl: string) {
  return (baseUrl || "").trim().replace(/\/$/, "");
}

function normalizeAnthropicBaseUrl(baseUrl: string) {
  return stripAnthropicMessagesSuffix(baseUrl || "");
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
  modelsUrl: customModelsUrl,
}) {
  if (!baseUrl) {
    return { valid: false, error: "Missing base URL" };
  }

  const modelsUrl = customModelsUrl || addModelsSuffix(baseUrl);
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

  const testModelId = (providerSpecificData as any)?.validationModelId || modelId;

  const testBody = {
    model: testModelId,
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

  const testModelId =
    providerSpecificData?.validationModelId || modelId || "claude-3-5-sonnet-20241022";

  const response = await fetch(baseUrl, {
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

async function validateElevenLabsProvider({ apiKey }: any) {
  try {
    // Lightweight auth check endpoint
    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      method: "GET",
      headers: {
        "xi-api-key": apiKey,
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

async function validateInworldProvider({ apiKey }: any) {
  try {
    // Inworld TTS lacks a simple key-introspection endpoint.
    // Send a minimal synth request and treat non-auth 4xx as auth-pass.
    const response = await fetch("https://api.inworld.ai/tts/v1/voice", {
      method: "POST",
      headers: {
        Authorization: `Basic ${apiKey}`,
        "Content-Type": "application/json",
      },
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
    return { valid: false, error: error.message || "Validation failed" };
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

    const response = await fetch(messagesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
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
    return { valid: false, error: error.message || "Validation failed" };
  }
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
    const modelsRes = await fetch(`${baseUrl}/models`, {
      method: "GET",
      headers: buildBearerHeaders(apiKey),
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
    const chatRes = await fetch(chatUrl, {
      method: "POST",
      headers: buildBearerHeaders(apiKey),
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
    const pingRes = await fetch(baseUrl, {
      method: "GET",
      headers: buildBearerHeaders(apiKey),
      signal: AbortSignal.timeout(5000),
    });

    // If the server responds at all (even with an error page), it's reachable
    if (pingRes.status < 500) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Provider unavailable (${pingRes.status})` };
  } catch (error: any) {
    return { valid: false, error: error.message || "Connection failed" };
  }
}

async function validateAnthropicCompatibleProvider({ apiKey, providerSpecificData = {} }: any) {
  let baseUrl = normalizeAnthropicBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for Anthropic compatible provider" };
  }

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
    Authorization: `Bearer ${apiKey}`,
  };

  // Step 1: Try GET /models
  try {
    const modelsRes = await fetch(
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
    const messagesRes = await fetch(
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
    return { valid: false, error: error.message || "Connection failed" };
  }
}

export async function validateClaudeCodeCompatibleProvider({
  apiKey,
  providerSpecificData = {},
}: any) {
  const baseUrl = normalizeAnthropicBaseUrl(providerSpecificData.baseUrl);
  if (!baseUrl) {
    return { valid: false, error: "No base URL configured for CC Compatible provider" };
  }

  const modelsPath = providerSpecificData?.modelsPath || CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH;
  const chatPath = providerSpecificData?.chatPath || CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH;
  const defaultHeaders = buildClaudeCodeCompatibleHeaders(apiKey, false);

  try {
    const modelsRes = await fetch(joinBaseUrlAndPath(baseUrl, modelsPath), {
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
    const messagesRes = await fetch(joinBaseUrlAndPath(baseUrl, chatPath), {
      method: "POST",
      headers: buildClaudeCodeCompatibleHeaders(apiKey, false, sessionId),
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
    return { valid: false, error: error.message || "Connection failed" };
  }
}

// ── Search provider validators (factored) ──

async function validateSearchProvider(
  url: string,
  init: RequestInit
): Promise<{ valid: boolean; error: string | null; unsupported: false }> {
  try {
    const response = await fetch(url, init);
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
    return { valid: false, error: error.message || "Validation failed", unsupported: false };
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
      return { valid: false, error: error.message || "Validation failed", unsupported: false };
    }
  }

  if (isAnthropicCompatibleProvider(provider)) {
    try {
      if (isClaudeCodeCompatibleProvider(provider)) {
        return await validateClaudeCodeCompatibleProvider({ apiKey, providerSpecificData });
      }
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
    elevenlabs: validateElevenLabsProvider,
    inworld: validateInworldProvider,
    "bailian-coding-plan": validateBailianCodingPlanProvider,
    // LongCat AI — does not expose /v1/models; validate via chat completions directly (#592)
    longcat: async ({ apiKey }: any) => {
      try {
        const res = await fetch("https://api.longcat.chat/openai/v1/chat/completions", {
          method: "POST",
          headers: buildBearerHeaders(apiKey),
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
        return { valid: false, error: error.message || "Connection failed" };
      }
    },
    // Search providers — use factored validator
    ...Object.fromEntries(
      Object.entries(SEARCH_VALIDATOR_CONFIGS).map(([id, configFn]) => [
        id,
        ({ apiKey }: any) => {
          const { url, init } = configFn(apiKey);
          return validateSearchProvider(url, init);
        },
      ])
    ),
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
      });
    }

    return { valid: false, error: "Provider validation not supported", unsupported: true };
  } catch (error: any) {
    return { valid: false, error: error.message || "Validation failed", unsupported: false };
  }
}
