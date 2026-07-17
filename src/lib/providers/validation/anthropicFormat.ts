// Anthropic/Claude-format provider key validators (anthropic-like, claude-oauth-inline, anthropic-compatible, claude-code-compatible).
// Extracted from validation.ts (god-file decomposition) — top-level functions; behavior is
// byte-identical to the original inline defs.
import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
  joinBaseUrlAndPath,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";
import {
  addModelsSuffix,
  normalizeAnthropicBaseUrl,
  normalizeClaudeCodeCompatibleBaseUrl,
} from "./urlHelpers";
import { applyCustomUserAgent } from "./headers";
import { toValidationErrorResult, validationRead, validationWrite } from "./transport";

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
        : addModelsSuffix(baseUrl);

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

export async function validateClaudeOAuthInline({
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
