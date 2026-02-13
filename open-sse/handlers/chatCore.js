import { detectFormat, getTargetFormat } from "../services/provider.js";
import { translateRequest, needsTranslation } from "../translator/index.js";
import { FORMATS } from "../translator/formats.js";
import {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
  COLORS,
} from "../utils/stream.js";
import { createStreamController, pipeWithDisconnect } from "../utils/streamHandler.js";
import { addBufferToUsage, filterUsageForFormat, estimateUsage } from "../utils/usageTracking.js";
import { refreshWithRetry } from "../services/tokenRefresh.js";
import { createRequestLogger } from "../utils/requestLogger.js";
import { getModelTargetFormat, PROVIDER_ID_TO_ALIAS } from "../config/providerModels.js";
import { createErrorResult, parseUpstreamError, formatProviderError } from "../utils/error.js";
import { HTTP_STATUS } from "../config/constants.js";
import { handleBypassRequest } from "../utils/bypassHandler.js";
import {
  saveRequestUsage,
  trackPendingRequest,
  appendRequestLog,
  saveCallLog,
} from "@/lib/usageDb.js";
import { getExecutor } from "../executors/index.js";
import { translateNonStreamingResponse } from "./responseTranslator.js";
import { extractUsageFromResponse } from "./usageExtractor.js";
import { parseSSEToOpenAIResponse, parseSSEToResponsesOutput } from "./sseParser.js";
import {
  withRateLimit,
  updateFromHeaders,
  initializeRateLimits,
} from "../services/rateLimitManager.js";

/**
 * Core chat handler - shared between SSE and Worker
 * Returns { success, response, status, error } for caller to handle fallback
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.modelInfo - { provider, model }
 * @param {object} options.credentials - Provider credentials
 * @param {object} options.log - Logger instance (optional)
 * @param {function} options.onCredentialsRefreshed - Callback when credentials are refreshed
 * @param {function} options.onRequestSuccess - Callback when request succeeds (to clear error status)
 * @param {function} options.onDisconnect - Callback when client disconnects
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {object} options.apiKeyInfo - API key metadata for usage attribution
 */
export async function handleChatCore({
  body,
  modelInfo,
  credentials,
  log,
  onCredentialsRefreshed,
  onRequestSuccess,
  onDisconnect,
  clientRawRequest,
  connectionId,
  apiKeyInfo = null,
  userAgent,
  comboName,
}) {
  const { provider, model } = modelInfo;
  const startTime = Date.now();

  // Initialize rate limit settings from persisted DB (once, lazy)
  await initializeRateLimits();

  const sourceFormat = detectFormat(body);
  const endpointPath = (clientRawRequest?.endpoint || "").toLowerCase();
  const isResponsesEndpoint = endpointPath.endsWith("/responses");

  // Check for bypass patterns (warmup, skip) - return fake response
  const bypassResponse = handleBypassRequest(body, model, userAgent);
  if (bypassResponse) {
    return bypassResponse;
  }

  // Detect source format and get target format
  // Model-specific targetFormat takes priority over provider default

  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, model);
  const targetFormat = modelTargetFormat || getTargetFormat(provider);

  // Default to streaming unless client explicitly sets stream: false
  const stream = body.stream !== false;

  // Create request logger for this session: sourceFormat_targetFormat_model
  const reqLogger = await createRequestLogger(sourceFormat, targetFormat, model);

  // 0. Log client raw request (before any conversion)
  if (clientRawRequest) {
    reqLogger.logClientRawRequest(
      clientRawRequest.endpoint,
      clientRawRequest.body,
      clientRawRequest.headers
    );
  }

  // 1. Log raw request from client
  reqLogger.logRawRequest(body);

  log?.debug?.("FORMAT", `${sourceFormat} → ${targetFormat} | stream=${stream}`);

  // Translate request (pass reqLogger for intermediate logging)
  let translatedBody = body;
  try {
    translatedBody = translateRequest(
      sourceFormat,
      targetFormat,
      model,
      body,
      stream,
      credentials,
      provider,
      reqLogger
    );
  } catch (error) {
    const parsedStatus = Number(error?.statusCode);
    const statusCode =
      Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
        ? parsedStatus
        : HTTP_STATUS.SERVER_ERROR;
    const message = error?.message || "Invalid request";
    const errorType = typeof error?.errorType === "string" ? error.errorType : null;

    log?.warn?.("TRANSLATE", `Request translation failed: ${message}`);

    if (errorType) {
      return {
        success: false,
        status: statusCode,
        error: message,
        response: new Response(
          JSON.stringify({
            error: {
              message,
              type: errorType,
              code: errorType,
            },
          }),
          {
            status: statusCode,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        ),
      };
    }

    return createErrorResult(statusCode, message);
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const toolNameMap = translatedBody._toolNameMap;
  delete translatedBody._toolNameMap;

  // Update model in body
  translatedBody.model = model;

  // Get executor for this provider
  const executor = getExecutor(provider);

  // Track pending request
  trackPendingRequest(model, provider, connectionId, true);

  // Log start
  appendRequestLog({ model, provider, connectionId, status: "PENDING" }).catch(() => {});

  const msgCount =
    translatedBody.messages?.length ||
    translatedBody.contents?.length ||
    translatedBody.request?.contents?.length ||
    0;
  log?.debug?.("REQUEST", `${provider.toUpperCase()} | ${model} | ${msgCount} msgs`);

  // Create stream controller for disconnect detection
  const streamController = createStreamController({ onDisconnect, log, provider, model });

  // Execute request using executor (handles URL building, headers, fallback, transform)
  let providerResponse;
  let providerUrl;
  let providerHeaders;
  let finalBody;

  try {
    const result = await withRateLimit(provider, connectionId, model, () =>
      executor.execute({
        model,
        body: translatedBody,
        stream,
        credentials,
        signal: streamController.signal,
        log,
      })
    );

    providerResponse = result.response;
    providerUrl = result.url;
    providerHeaders = result.headers;
    finalBody = result.transformedBody;

    // Log target request (final request to provider)
    reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);

    // Update rate limiter from response headers (learn limits dynamically)
    updateFromHeaders(
      provider,
      connectionId,
      providerResponse.headers,
      providerResponse.status,
      model
    );
  } catch (error) {
    trackPendingRequest(model, provider, connectionId, false);
    appendRequestLog({
      model,
      provider,
      connectionId,
      status: `FAILED ${error.name === "AbortError" ? 499 : HTTP_STATUS.BAD_GATEWAY}`,
    }).catch(() => {});
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: error.name === "AbortError" ? 499 : HTTP_STATUS.BAD_GATEWAY,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      requestBody: body,
      error: error.message,
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
    }).catch(() => {});
    if (error.name === "AbortError") {
      streamController.handleError(error);
      return createErrorResult(499, "Request aborted");
    }
    const errMsg = formatProviderError(error, provider, model, HTTP_STATUS.BAD_GATEWAY);
    console.log(`${COLORS.red}[ERROR] ${errMsg}${COLORS.reset}`);
    return createErrorResult(HTTP_STATUS.BAD_GATEWAY, errMsg);
  }

  // Handle 401/403 - try token refresh using executor
  if (
    providerResponse.status === HTTP_STATUS.UNAUTHORIZED ||
    providerResponse.status === HTTP_STATUS.FORBIDDEN
  ) {
    const newCredentials = await refreshWithRetry(
      () => executor.refreshCredentials(credentials, log),
      3,
      log
    );

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider.toUpperCase()} | refreshed`);

      // Update credentials
      Object.assign(credentials, newCredentials);

      // Notify caller about refreshed credentials
      if (onCredentialsRefreshed && newCredentials) {
        await onCredentialsRefreshed(newCredentials);
      }

      // Retry with new credentials
      try {
        const retryResult = await executor.execute({
          model,
          body: translatedBody,
          stream,
          credentials,
          signal: streamController.signal,
          log,
        });

        if (retryResult.response.ok) {
          providerResponse = retryResult.response;
          providerUrl = retryResult.url;
        }
      } catch (retryError) {
        log?.warn?.("TOKEN", `${provider.toUpperCase()} | retry after refresh failed`);
      }
    } else {
      log?.warn?.("TOKEN", `${provider.toUpperCase()} | refresh failed`);
    }
  }

  // Check provider response - return error info for fallback handling
  if (!providerResponse.ok) {
    trackPendingRequest(model, provider, connectionId, false);
    const { statusCode, message, retryAfterMs } = await parseUpstreamError(
      providerResponse,
      provider
    );
    appendRequestLog({ model, provider, connectionId, status: `FAILED ${statusCode}` }).catch(
      () => {}
    );
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: statusCode,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      requestBody: body,
      error: message,
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
    }).catch(() => {});
    const errMsg = formatProviderError(new Error(message), provider, model, statusCode);
    console.log(`${COLORS.red}[ERROR] ${errMsg}${COLORS.reset}`);

    // Log Antigravity retry time if available
    if (retryAfterMs && provider === "antigravity") {
      const retrySeconds = Math.ceil(retryAfterMs / 1000);
      log?.debug?.("RETRY", `Antigravity quota reset in ${retrySeconds}s (${retryAfterMs}ms)`);
    }

    // Log error with full request body for debugging
    reqLogger.logError(new Error(message), finalBody || translatedBody);

    // Update rate limiter from error response headers
    updateFromHeaders(provider, connectionId, providerResponse.headers, statusCode, model);

    return createErrorResult(statusCode, errMsg, retryAfterMs);
  }

  // Non-streaming response
  if (!stream) {
    trackPendingRequest(model, provider, connectionId, false);
    const contentType = (providerResponse.headers.get("content-type") || "").toLowerCase();
    let responseBody;
    const rawBody = await providerResponse.text();
    const looksLikeSSE =
      contentType.includes("text/event-stream") || /(^|\n)\s*(event|data):/m.test(rawBody);

    if (looksLikeSSE) {
      // Upstream returned SSE even though stream=false; convert best-effort to JSON.
      const parsedFromSSE =
        targetFormat === FORMATS.OPENAI_RESPONSES
          ? parseSSEToResponsesOutput(rawBody, model)
          : parseSSEToOpenAIResponse(rawBody, model);

      if (!parsedFromSSE) {
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        return createErrorResult(
          HTTP_STATUS.BAD_GATEWAY,
          "Invalid SSE response for non-streaming request"
        );
      }

      responseBody = parsedFromSSE;
    } else {
      try {
        responseBody = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        return createErrorResult(HTTP_STATUS.BAD_GATEWAY, "Invalid JSON response from provider");
      }
    }

    // Notify success - caller can clear error status if needed
    if (onRequestSuccess) {
      await onRequestSuccess();
    }

    // Log usage for non-streaming responses
    const usage = extractUsageFromResponse(responseBody, provider);
    appendRequestLog({ model, provider, connectionId, tokens: usage, status: "200 OK" }).catch(
      () => {}
    );

    // Save structured call log with full payloads
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: 200,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      tokens: usage,
      requestBody: body,
      responseBody,
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
    }).catch(() => {});
    if (usage && typeof usage === "object") {
      const msg = `[${new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}] 📊 [USAGE] ${provider.toUpperCase()} | in=${usage?.prompt_tokens || 0} | out=${usage?.completion_tokens || 0}${connectionId ? ` | account=${connectionId.slice(0, 8)}...` : ""}`;
      console.log(`${COLORS.green}${msg}${COLORS.reset}`);

      saveRequestUsage({
        provider: provider || "unknown",
        model: model || "unknown",
        tokens: usage,
        timestamp: new Date().toISOString(),
        connectionId: connectionId || undefined,
        apiKeyId: apiKeyInfo?.id || undefined,
        apiKeyName: apiKeyInfo?.name || undefined,
      }).catch((err) => {
        console.error("Failed to save usage stats:", err.message);
      });
    }

    // Translate response to client's expected format (usually OpenAI)
    const translatedResponse = needsTranslation(targetFormat, sourceFormat)
      ? translateNonStreamingResponse(responseBody, targetFormat, sourceFormat)
      : responseBody;

    // Add buffer and filter usage for client (to prevent CLI context errors)
    if (translatedResponse?.usage) {
      const buffered = addBufferToUsage(translatedResponse.usage);
      translatedResponse.usage = filterUsageForFormat(buffered, sourceFormat);
    } else {
      // Fallback: estimate usage when provider didn't return any
      const contentLength = JSON.stringify(
        translatedResponse?.choices?.[0]?.message?.content || ""
      ).length;
      if (contentLength > 0) {
        const estimated = estimateUsage(body, contentLength, sourceFormat);
        translatedResponse.usage = filterUsageForFormat(estimated, sourceFormat);
      }
    }

    return {
      success: true,
      response: new Response(JSON.stringify(translatedResponse), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    };
  }

  // Streaming response

  // Notify success - caller can clear error status if needed
  if (onRequestSuccess) {
    await onRequestSuccess();
  }

  const responseHeaders = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  };

  // Create transform stream with logger for streaming response
  let transformStream;

  // Callback to save call log when stream completes (streaming calls were never logged before!)
  const onStreamComplete = ({ status: streamStatus, usage: streamUsage }) => {
    saveCallLog({
      method: "POST",
      path: clientRawRequest?.endpoint || "/v1/chat/completions",
      status: streamStatus || 200,
      model,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      tokens: streamUsage || {},
      requestBody: body,
      sourceFormat,
      targetFormat,
      comboName,
      apiKeyId: apiKeyInfo?.id || null,
      apiKeyName: apiKeyInfo?.name || null,
    }).catch(() => {});
  };

  // For Codex provider, translate response from openai-responses to openai (Chat Completions) format
  // UNLESS client is Droid CLI which expects openai-responses format back
  const isDroidCLI =
    userAgent?.toLowerCase().includes("droid") || userAgent?.toLowerCase().includes("codex-cli");
  const needsCodexTranslation =
    provider === "codex" &&
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    sourceFormat === FORMATS.OPENAI &&
    !isResponsesEndpoint &&
    !isDroidCLI;

  if (needsCodexTranslation) {
    // Codex returns openai-responses, translate to openai (Chat Completions) that clients expect
    log?.debug?.("STREAM", `Codex translation mode: openai-responses → openai`);
    transformStream = createSSETransformStreamWithLogger(
      "openai-responses",
      "openai",
      provider,
      reqLogger,
      toolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  } else if (needsTranslation(targetFormat, sourceFormat)) {
    // Standard translation for other providers
    log?.debug?.("STREAM", `Translation mode: ${targetFormat} → ${sourceFormat}`);
    transformStream = createSSETransformStreamWithLogger(
      targetFormat,
      sourceFormat,
      provider,
      reqLogger,
      toolNameMap,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  } else {
    log?.debug?.("STREAM", `Standard passthrough mode`);
    transformStream = createPassthroughStreamWithLogger(
      provider,
      reqLogger,
      model,
      connectionId,
      body,
      onStreamComplete,
      apiKeyInfo
    );
  }

  // Pipe response through transform with disconnect detection
  const transformedBody = pipeWithDisconnect(providerResponse, transformStream, streamController);

  return {
    success: true,
    response: new Response(transformedBody, {
      headers: responseHeaders,
    }),
  };
}

/**
 * Check if token is expired or about to expire
 */
export function isTokenExpiringSoon(expiresAt, bufferMs = 5 * 60 * 1000) {
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  return expiresAtMs - Date.now() < bufferMs;
}
