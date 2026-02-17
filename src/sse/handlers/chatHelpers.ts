/**
 * Chat Handler Helpers — FASE-09 (T-28)
 *
 * Extracted from handleSingleModelChat to keep the main handler
 * under 80 lines. These helpers encapsulate:
 *
 *   resolveModelOrError — Model lookup + error response generation
 *   logProxyAndTranslation — Side-effect logging (proxy + translation events)
 *   buildChatCoreParams — Assembles the parameter object for handleChatCore
 *
 * @module sse/handlers/chatHelpers
 */

import { getModelInfo } from "../services/model";
import { detectFormat, getTargetFormat } from "@omniroute/open-sse/services/provider.js";
import {
  getModelTargetFormat,
  PROVIDER_ID_TO_ALIAS,
} from "@omniroute/open-sse/config/providerModels.js";
import { logProxyEvent } from "../../lib/proxyLogger";
import { logTranslationEvent } from "../../lib/translatorEvents";
import { updateProviderCredentials } from "../services/auth";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Resolve a model string to provider/model or return an error response.
 *
 * @param {string} modelStr - Raw model string from request
 * @param {Function} log - Logger instance
 * @param {Function} errorResponse - Error response factory
 * @returns {Promise<{ error?: Response, provider: string, model: string, sourceFormat: string, targetFormat: string }>}
 */
export async function resolveModelOrError(modelStr, body, log, errorResponse) {
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
      return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, message) };
    }

    log.warn("CHAT", "Invalid model format", { model: modelStr });
    return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid model format") };
  }

  const { provider, model } = modelInfo;
  const sourceFormat = detectFormat(body);
  const providerAlias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const targetFormat = getModelTargetFormat(providerAlias, model) || getTargetFormat(provider);

  // Log routing
  if (modelStr !== `${provider}/${model}`) {
    log.info("ROUTING", `${modelStr} → ${provider}/${model}`);
  } else {
    log.info("ROUTING", `Provider: ${provider}, Model: ${model}`);
  }

  return { provider, model, sourceFormat, targetFormat };
}

/**
 * Log proxy and translation events (fire-and-forget, never throws).
 *
 * @param {Object} params
 */
export function logProxyAndTranslation({
  result,
  proxyInfo,
  proxyLatency,
  provider,
  model,
  sourceFormat,
  targetFormat,
  credentials,
  comboName,
  clientRawRequest,
}) {
  // Proxy event
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
  } catch {
    // Never let logging break the request pipeline
  }

  // Translation event
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
}

/**
 * Build the params object for handleChatCore.
 *
 * @param {Object} params
 * @returns {Object} handleChatCore params
 */
export function buildChatCoreParams({
  body,
  provider,
  model,
  credentials,
  log,
  clientRawRequest,
  apiKeyInfo,
  userAgent,
  comboName,
}) {
  return {
    body: { ...body, model: `${provider}/${model}` },
    modelInfo: { provider, model },
    credentials,
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
      const { clearAccountError } = await import("../services/auth");
      await clearAccountError(credentials.connectionId, credentials);
    },
  };
}
