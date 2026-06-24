// OpenAI/Gemini-format + Bedrock provider key validators (bedrock, openai-like, command-code, gemini-like, openai-compatible).
// Extracted from validation.ts (god-file decomposition) — top-level functions; behavior is
// byte-identical to the original inline defs.
import { randomUUID } from "node:crypto";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
  isBedrockNativeAuthError,
} from "@omniroute/open-sse/services/bedrock.ts";
import {
  addModelsSuffix,
  normalizeBaseUrl,
  resolveChatUrl,
} from "./urlHelpers";
import {
  applyCustomUserAgent,
  buildBearerHeaders,
} from "./headers";
import {
  toValidationErrorResult,
  validationRead,
  validationWrite,
} from "./transport";
import { validateDirectChatProvider } from "./directChatProbe";

export async function validateBedrockProvider({ apiKey, providerSpecificData = {} }: any) {
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

// ── Specialty providers (non-standard APIs) ──


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

