import {
  getProviderCredentials,
  markAccountUnavailable,
  clearAccountError,
  extractApiKey,
  isValidApiKey,
} from "../services/auth.js";
import { getModelInfo, getCombo } from "../services/model.js";
import { parseModel } from "@omniroute/open-sse/services/model.js";
import { detectFormat, getTargetFormat } from "@omniroute/open-sse/services/provider.js";
import { handleChatCore } from "@omniroute/open-sse/handlers/chatCore.js";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.js";
import { handleComboChat } from "@omniroute/open-sse/services/combo.js";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.js";
import {
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.js";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.js";
import * as log from "../utils/logger.js";
import { updateProviderCredentials, checkAndRefreshToken } from "../services/tokenRefresh.js";
import { getSettings, getCombos, getApiKeyMetadata } from "@/lib/localDb.js";
import { resolveProxyForConnection } from "@/lib/localDb.js";
import { logProxyEvent } from "../../lib/proxyLogger.js";
import { logTranslationEvent } from "../../lib/translatorEvents.js";

/**
 * Handle chat completion request
 * Supports: OpenAI, Claude, Gemini, OpenAI Responses API formats
 * Format detection and translation handled by translator
 */
export async function handleChat(request, clientRawRequest = null) {
  let body;
  try {
    body = await request.json();
  } catch {
    log.warn("CHAT", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // Build clientRawRequest for logging (if not provided)
  if (!clientRawRequest) {
    const url = new URL(request.url);
    clientRawRequest = {
      endpoint: url.pathname,
      body,
      headers: Object.fromEntries(request.headers.entries()),
    };
  }

  // Log request endpoint and model
  const url = new URL(request.url);
  const modelStr = body.model;

  // Count messages (support both messages[] and input[] formats)
  const msgCount = body.messages?.length || body.input?.length || 0;
  const toolCount = body.tools?.length || 0;
  const effort = body.reasoning_effort || body.reasoning?.effort || null;
  log.request(
    "POST",
    `${url.pathname} | ${modelStr} | ${msgCount} msgs${toolCount ? ` | ${toolCount} tools` : ""}${effort ? ` | effort=${effort}` : ""}`
  );

  // Log API key (masked)
  const authHeader = request.headers.get("Authorization");
  const apiKey = extractApiKey(request);
  let apiKeyInfo = null;
  if (authHeader && apiKey) {
    const masked = log.maskKey(apiKey);
    log.debug("AUTH", `API Key: ${masked}`);
    try {
      apiKeyInfo = await getApiKeyMetadata(apiKey);
    } catch {
      apiKeyInfo = null;
    }
  } else {
    log.debug("AUTH", "No API key provided (local mode)");
  }

  // Optional strict API key mode for /v1 endpoints.
  // Keep disabled by default to preserve local-mode compatibility.
  if (process.env.REQUIRE_API_KEY === "true") {
    if (!apiKey) {
      log.warn("AUTH", "Missing API key while REQUIRE_API_KEY=true");
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    }
    const valid = await isValidApiKey(apiKey);
    if (!valid) {
      log.warn("AUTH", "Invalid API key while REQUIRE_API_KEY=true");
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  }

  if (!modelStr) {
    log.warn("CHAT", "Missing model");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  // Check if model is a combo (has multiple models with fallback)
  const combo = await getCombo(modelStr);
  if (combo) {
    log.info(
      "CHAT",
      `Combo "${modelStr}" [${combo.strategy || "priority"}] with ${combo.models.length} models`
    );

    // Pre-check function: skip models where all accounts are in cooldown
    const isModelAvailable = async (modelString) => {
      const parsed = parseModel(modelString);
      const provider = parsed.provider;
      if (!provider) return true; // can't determine provider, let it try
      const creds = await getProviderCredentials(provider);
      if (!creds || creds.allRateLimited) return false;
      return true;
    };

    // Fetch settings and all combos for config cascade and nested resolution
    const [settings, allCombos] = await Promise.all([
      getSettings().catch(() => ({})),
      getCombos().catch(() => []),
    ]);

    return handleComboChat({
      body,
      combo,
      handleSingleModel: (b, m) =>
        handleSingleModelChat(b, m, clientRawRequest, request, combo.name, apiKeyInfo),
      isModelAvailable,
      log,
      settings,
      allCombos,
    });
  }

  // Single model request
  return handleSingleModelChat(body, modelStr, clientRawRequest, request, null, apiKeyInfo);
}

/**
 * Handle single model chat request
 */
async function handleSingleModelChat(
  body,
  modelStr,
  clientRawRequest = null,
  request = null,
  comboName = null,
  apiKeyInfo = null
) {
  const modelInfo = await getModelInfo(modelStr);
  if (!modelInfo.provider) {
    if (modelInfo.errorType === "ambiguous_model") {
      const message =
        modelInfo.errorMessage ||
        `Ambiguous model '${modelStr}'. Use provider/model prefix (ex: gh/${modelStr} or cc/${modelStr}).`;
      log.warn("CHAT", message, {
        model: modelStr,
        candidates: modelInfo.candidateAliases || modelInfo.candidateProviders || [],
      });
      return errorResponse(HTTP_STATUS.BAD_REQUEST, message);
    }

    log.warn("CHAT", "Invalid model format", { model: modelStr });
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid model format");
  }

  const { provider, model } = modelInfo;
  const sourceFormat = detectFormat(body);
  const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const targetFormat = getModelTargetFormat(providerAlias, model) || getTargetFormat(provider);

  // Log model routing (alias → actual model)
  if (modelStr !== `${provider}/${model}`) {
    log.info("ROUTING", `${modelStr} → ${provider}/${model}`);
  } else {
    log.info("ROUTING", `Provider: ${provider}, Model: ${model}`);
  }

  // Extract userAgent from request
  const userAgent = request?.headers?.get("user-agent") || "";

  // Try with available accounts (fallback on errors)
  let excludeConnectionId = null;
  let lastError = null;
  let lastStatus = null;

  while (true) {
    const credentials = await getProviderCredentials(provider, excludeConnectionId);

    // All accounts unavailable
    if (!credentials || credentials.allRateLimited) {
      if (credentials?.allRateLimited) {
        const errorMsg = lastError || credentials.lastError || "Unavailable";
        const status =
          lastStatus || Number(credentials.lastErrorCode) || HTTP_STATUS.SERVICE_UNAVAILABLE;
        log.warn("CHAT", `[${provider}/${model}] ${errorMsg} (${credentials.retryAfterHuman})`);
        return unavailableResponse(
          status,
          `[${provider}/${model}] ${errorMsg}`,
          credentials.retryAfter,
          credentials.retryAfterHuman
        );
      }
      if (!excludeConnectionId) {
        log.error("AUTH", `No credentials for provider: ${provider}`);
        return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
      }
      log.warn("CHAT", "No more accounts available", { provider });
      return errorResponse(
        lastStatus || HTTP_STATUS.SERVICE_UNAVAILABLE,
        lastError || "All accounts unavailable"
      );
    }

    // Log account selection
    const accountId = credentials.connectionId.slice(0, 8);
    log.info("AUTH", `Using ${provider} account: ${accountId}...`);

    const refreshedCredentials = await checkAndRefreshToken(provider, credentials);

    // Resolve proxy for this connection
    let proxyInfo = null;
    try {
      proxyInfo = await resolveProxyForConnection(credentials.connectionId);
    } catch (proxyErr) {
      log.debug("PROXY", `Failed to resolve proxy: ${proxyErr.message}`);
    }

    const proxyStartTime = Date.now();

    // Use shared chatCore
    const result = await runWithProxyContext(proxyInfo?.proxy || null, () =>
      handleChatCore({
        body: { ...body, model: `${provider}/${model}` },
        modelInfo: { provider, model },
        credentials: refreshedCredentials,
        log,
        clientRawRequest,
        connectionId: credentials.connectionId,
        apiKeyInfo,
        userAgent,
        comboName,
        onCredentialsRefreshed: async (newCreds) => {
          await updateProviderCredentials(credentials.connectionId, {
            accessToken: newCreds.accessToken,
            refreshToken: newCreds.refreshToken,
            providerSpecificData: newCreds.providerSpecificData,
            testStatus: "active",
          });
        },
        onRequestSuccess: async () => {
          await clearAccountError(credentials.connectionId, credentials);
        },
      })
    );

    const proxyLatency = Date.now() - proxyStartTime;

    // Log proxy event
    try {
      const proxyData = proxyInfo?.proxy || null;
      logProxyEvent({
        status: result.success
          ? "success"
          : result.status === 408 || result.status === 504
            ? "timeout"
            : "error",
        proxy: proxyData,
        level: proxyInfo?.level || "direct",
        levelId: proxyInfo?.levelId || null,
        provider,
        targetUrl: `${provider}/${model}`,
        latencyMs: proxyLatency,
        error: result.success ? null : result.error || null,
        connectionId: credentials.connectionId,
        comboId: comboName || null,
        account: credentials.connectionId?.slice(0, 8) || null,
      });
    } catch (logErr) {
      // Never let logging break the request pipeline
    }

    // Log translation event for Live Monitor
    try {
      logTranslationEvent({
        provider,
        model,
        sourceFormat,
        targetFormat,
        status: result.success ? "success" : "error",
        statusCode: result.success ? 200 : result.status || 500,
        latency: proxyLatency,
        endpoint: clientRawRequest?.endpoint || "/v1/chat/completions",
        connectionId: credentials.connectionId || null,
        comboName: comboName || null,
      });
    } catch {
      // Never let logging break the request pipeline
    }

    if (result.success) return result.response;

    // Mark account unavailable (auto-calculates cooldown with exponential backoff)
    const { shouldFallback } = await markAccountUnavailable(
      credentials.connectionId,
      result.status,
      result.error,
      provider
    );

    if (shouldFallback) {
      log.warn("AUTH", `Account ${accountId}... unavailable (${result.status}), trying fallback`);
      excludeConnectionId = credentials.connectionId;
      lastError = result.error;
      lastStatus = result.status;
      continue;
    }

    return result.response;
  }
}
