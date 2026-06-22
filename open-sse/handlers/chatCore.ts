import { injectMemoryAndSkills } from "./chatCore/memorySkillsInjection.ts";
import { resolveChatCoreRequestSetup } from "./chatCore/requestSetup.ts";
import { buildFailureUsageRecord } from "./chatCore/failureUsage.ts";
import { extractSystemRoleMessages } from "./chatCore/claudeSystemRole.ts";
export { extractSystemRoleMessages } from "./chatCore/claudeSystemRole.ts";
import { checkIdempotencyCache } from "./chatCore/idempotency.ts";
import { checkSemanticCache } from "./chatCore/semanticCache.ts";
import { applyClientUsageBuffer } from "./chatCore/clientUsageBuffer.ts";
import { buildPostCallGuardrailContext } from "./chatCore/postCallGuardrailContext.ts";
import { storeSemanticCacheResponse } from "./chatCore/semanticCacheStore.ts";
import { buildNonStreamingResponseHeaders } from "./chatCore/nonStreamingResponseHeaders.ts";
import { maybeConvertJsonBodyToSse } from "./chatCore/jsonBodyToSse.ts";
import { assembleStreamingResponseHeaders } from "./chatCore/streamingResponseHeaders.ts";
import { storeStreamingSemanticCacheResponse } from "./chatCore/streamingSemanticCacheStore.ts";
import { assembleStreamingPipeline } from "./chatCore/streamingPipeline.ts";
import { sanitizeChatRequestBody } from "./chatCore/sanitization.ts";
import {
  getHeaderValueCaseInsensitive,
  isNoMemoryRequested,
  resolveCompressionHeader,
  isStripReasoningRequested,
} from "./chatCore/headers.ts";
import { markCodexScopeRateLimited } from "./chatCore/codexFailover.ts";
import { getCombosCached } from "./chatCore/comboContextCache.ts";
export { clearCombosCache, clearUpstreamProxyConfigCache } from "./chatCore/comboContextCache.ts";
import {
  resolveAccountSemaphoreKey,
  resolveAccountSemaphoreMaxConcurrency,
  buildClaudePromptCacheLogMeta,
} from "./chatCore/executorHelpers.ts";
import {
  shouldUseNativeCodexPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "./chatCore/passthroughHelpers.ts";
import {
  buildStreamingResponseHeaders,
  materializeDeduplicatedExecutionResult,
  stripStaleForwardingHeaders,
} from "./chatCore/responseHeaders.ts";
import {
  forwardDashboardEventToLiveWs,
  maybeSyncClaudeExtraUsageState,
} from "./chatCore/telemetryHelpers.ts";
// Re-export the previously inline-defined helpers so existing importers of these
// symbols from chatCore.ts (tests, sibling modules) keep resolving after the split.
export {
  shouldUseNativeCodexPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
};
import {
  extractMemoryTextFromResponse,
  extractMemoryTextFromRequestBody,
  resolveMemoryOwnerId,
} from "./chatCore/memoryExtraction.ts";
import { CORS_HEADERS } from "../utils/cors.ts";
import { checkHeapPressureGuard } from "../utils/heapPressure.ts";
import { normalizeHeaders } from "../utils/headers.ts";
import { resolveChatCoreRequestFormat } from "./chatCore/requestFormat.ts";
import { resolveChatCoreTargetFormat } from "./chatCore/targetFormat.ts";
import { injectSystemPrompt, injectCustomSystemPrompt } from "../services/systemPrompt.ts";
import { translateRequest, needsTranslation } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import { splitMisplacedToolResults } from "../translator/helpers/claudeHelper.ts";
import {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
  COLORS,
  withBodyTimeout,
} from "../utils/stream.ts";
import { ensureStreamReadiness } from "../utils/streamReadiness.ts";
import { resolveStreamReadinessTimeout } from "../utils/streamReadinessPolicy.ts";
import { createStreamController } from "../utils/streamHandler.ts";
import * as streamFailure from "../utils/streamFailureFinalization.ts";
import { createSseHeartbeatTransform, shapeForClientFormat } from "../utils/sseHeartbeat.ts";
import { addBufferToUsage, filterUsageForFormat, estimateUsage } from "../utils/usageTracking.ts";
import {
  refreshWithRetry,
  isUnrecoverableRefreshError,
  runWithOnPersist,
} from "../services/tokenRefresh.ts";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { createPreparedRequestLogger, runWithCapture } from "../utils/providerRequestLogging.ts";
import { applyResponsesPreviousResponseIdPolicy } from "../utils/responsesStatePolicy.ts";
import { applyClaudeEffortVariant } from "./chatCore/claudeEffortVariant.ts";
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../config/defaultThinkingSignature.ts";
import {
  getStripTypesForProviderModel,
  stripIncompatibleMessageContent,
} from "../services/modelStrip.ts";
import { resolveModelAlias } from "../services/modelDeprecation.ts";
import { normalizeMimoThinking } from "../services/mimoThinking.ts";
import { normalizeClaudeAdaptiveThinking } from "../services/claudeAdaptiveThinking.ts";
import { normalizeClaudeHaikuConstraints } from "../services/claudeHaikuConstraints.ts";
import { echoModelInObject } from "../services/responseModelEcho.ts";
import { stripGpt5SamplingWhenReasoning } from "../services/gpt5SamplingGuard.ts";
import { getUnsupportedParams } from "../config/providerRegistry.ts";
import { supportsMaxTokens } from "@/lib/modelCapabilities.ts";
import { normalizeThinkingForModel } from "@/shared/constants/modelSpecs.ts";
import {
  buildErrorBody,
  createErrorResult,
  parseUpstreamError,
  formatProviderError,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import {
  checkTokenLimits,
  recordTokenUsage,
} from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import {
  COOLDOWN_MS,
  HTTP_STATUS,
  FETCH_BODY_TIMEOUT_MS,
  PROVIDER_MAX_TOKENS,
  STREAM_IDLE_TIMEOUT_MS,
  STREAM_READINESS_TIMEOUT_MS,
  ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
  STREAM_RECOVERY,
} from "../config/constants.ts";
import { createRecoverableStream, makeContinuationBody } from "../services/streamRecovery.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
  isEmptyContentResponse,
} from "../services/errorClassifier.ts";
import { updateProviderConnection, getProviderConnectionById } from "@/lib/db/providers";
import { wasRefreshTokenRotated } from "@omniroute/open-sse/services/refreshSerializer.ts";
import { connectionHasExtraKeys } from "../services/apiKeyRotator.ts";
import { recordKeyHealthStatus as recordKeyHealthStatusFor } from "./chatCore/keyHealth.ts";
import { getSkillsModelIdForFormat } from "./chatCore/skillsFormat.ts";
import { readNonStreamingResponseBody } from "./chatCore/nonStreamingResponseBody.ts";
import {
  isSemaphoreCapacityError,
  createStreamingErrorResult,
  getUpstreamErrorIdentifier,
} from "./chatCore/streamErrorResult.ts";
import { wrapReadableStreamWithFinalize } from "./chatCore/streamFinalize.ts";
import { buildCacheUsageLogMeta } from "./chatCore/cacheUsageMeta.ts";
import { buildExecutorClientHeaders } from "./chatCore/executorClientHeaders.ts";
import { resolveExecutionCredentials as resolveExecutionCredentialsFor } from "./chatCore/executionCredentials.ts";
import { resolveExecutorWithProxy as resolveExecutorWithProxyFor } from "./chatCore/executorProxy.ts";
import type { ClaudeMessage } from "./chatCore/claudeMessageTypes.ts";
import { normalizeClaudeUpstreamMessages as normalizeClaudeUpstreamMessagesFor } from "./chatCore/claudeUpstreamMessages.ts";
import {
  persistAttemptLogs as persistAttemptLogsFor,
  type PersistAttemptLogsArgs,
} from "./chatCore/attemptLogging.ts";
import { stageTrace } from "./chatCore/stageTrace.ts";
import { attachCompressionUsageReceiptAfterAnalytics as attachCompressionUsageReceiptAfterAnalyticsFor } from "./chatCore/compressionUsageReceipt.ts";
import { prepareUpstreamBody } from "./chatCore/upstreamBody.ts";

import {
  getCallLogPipelineCaptureStreamChunks,
  getCallLogPipelineMaxSizeBytes,
} from "@/lib/logEnv";
import { logAuditEvent } from "@/lib/compliance";
import { emit } from "@/lib/events/eventBus";
import { adaptBodyForCompression } from "../services/compression/bodyAdapter.ts";
import { ensureEngineBreakdown } from "../services/compression/engineBreakdown.ts";
import { handleBypassRequest } from "../utils/bypassHandler.ts";
import { saveRequestUsage, trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import { finalizePendingScope, updatePendingScope } from "@/lib/usage/pendingRequestScope";
import { recordCost } from "@/domain/costRules";
import { calculateCost } from "@/lib/usage/costCalculator";
import {
  buildClaudePassthroughToolNameMap,
  restoreClaudePassthroughToolNames,
  mergeResponseToolNameMap,
} from "./chatCore/passthroughToolNames.ts";
import { resolveCompressionSettings } from "./chatCore/compressionSettings.ts";
import {
  isBuiltinStackedPipeline,
  isStackedCompressionCombo,
  type RuntimeCompressionCombo,
} from "./chatCore/compressionComboPredicates.ts";
import { emitOutputStyleTelemetry } from "./chatCore/outputStyleTelemetry.ts";
import { writeCompressionAnalytics } from "./chatCore/compressionAnalyticsWrite.ts";
import { runPluginOnRequestHook } from "./chatCore/pluginOnRequest.ts";
import { recordContextEditingTelemetryHook } from "./chatCore/contextEditingTelemetry.ts";
import { recordCompressionCacheStats } from "./chatCore/compressionCacheStats.ts";
import { writeCavemanOutputAnalytics } from "./chatCore/cavemanOutputAnalytics.ts";
import { scheduleQuotaShareConsumption } from "./chatCore/quotaShareConsumption.ts";
import { emitRequestGamificationEvent } from "./chatCore/gamificationEvent.ts";
import { runPluginOnResponseHook } from "./chatCore/pluginOnResponse.ts";
import { scheduleStreamingQuotaShareConsumption } from "./chatCore/streamingQuotaShare.ts";
import { recordStreamingUsageStats } from "./chatCore/streamingUsageStats.ts";
import { recordStreamingCost } from "./chatCore/streamingCost.ts";
import {
  appendNonStreamingSseTerminalSignal,
  type NonStreamingSseTerminalState,
} from "./chatCore/nonStreamingSse.ts";
import { parseNonStreamingResponseBody } from "./chatCore/nonStreamingResponseParse.ts";
import { recordNonStreamingUsageStats } from "./chatCore/nonStreamingUsageStats.ts";
import {
  createBodyTimeoutError,
  readStreamChunkWithTimeout,
  computeBillableTokens,
  normalizeExecutorResult,
  executeWithUpstreamStartTimeout,
} from "./chatCore/upstreamTimeouts.ts";
import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/localDb";
import { getProviderCredentials, extractSessionAffinityKey } from "@/sse/services/auth";
import { deleteSessionAccountAffinity } from "@/lib/db/sessionAccountAffinity";
import { getCacheControlSettings } from "@/lib/cacheControlSettings";
import { guardrailRegistry } from "@/lib/guardrails";
import { shouldPreserveCacheControl } from "../utils/cacheControlPolicy.ts";
import { getCachedSettings } from "@/lib/db/readCache";
import { applyCodexGlobalFastServiceTier } from "@/lib/providers/codexFastTier";
import { buildUpstreamHeadersForExecute as buildUpstreamHeadersForExecuteFor } from "./chatCore/upstreamExecuteHeaders.ts";
import {
  resolveEffectiveServiceTier as resolveEffectiveServiceTierFor,
  resolveReportedServiceTier as resolveReportedServiceTierFor,
  type EffectiveServiceTier,
} from "./chatCore/serviceTier.ts";
import { cacheReasoningFromAssistantMessage } from "../services/reasoningCache.ts";
import { sanitizeOpenAITool } from "../services/toolSchemaSanitizer.ts";
import {
  setDetectedToolLimit,
  parseToolLimitFromError,
  shouldDetectLimit,
} from "../services/toolLimitDetector.ts";

import { isCompactResponsesEndpoint } from "../executors/codex.ts";
import { buildCodexQuotaPersistence } from "./chatCore/codexQuota.ts";
import { invalidateCodexQuotaCache } from "../services/codexQuotaFetcher.ts";
import { translateNonStreamingResponse } from "./responseTranslator.ts";
import { extractUsageFromResponse } from "./usageExtractor.ts";
import { sanitizeOpenAIResponse, sanitizeResponsesApiResponse } from "./responseSanitizer.ts";
import {
  withRateLimit,
  updateFromHeaders,
  updateFromResponseBody,
  initializeRateLimits,
} from "../services/rateLimitManager.ts";
import {
  acquire as acquireAccountSemaphore,
  markBlocked as markAccountSemaphoreBlocked,
} from "../services/accountSemaphore.ts";
import { lockModel, lockModelIfPerModelQuota } from "../services/accountFallback.ts";
import {
  generateSignature,
  getCachedResponse,
  setCachedResponse,
  isCacheableForRead,
  isCacheableForWrite,
} from "@/lib/semanticCache";
import { saveIdempotency } from "@/lib/idempotencyLayer";
import {
  isModelUnavailableError,
  getNextFamilyFallback,
  isContextOverflowError,
  findLargerContextModel,
  getModelFamily,
} from "../services/modelFamilyFallback.ts";
import { computeRequestHash, deduplicate, shouldDeduplicate } from "../services/requestDedup.ts";
import {
  compressContext,
  estimateTokens,
  getTokenLimit,
  resolveComboContextLimit,
} from "../services/contextManager.ts";
import { resolveBackgroundTaskRedirect } from "./chatCore/backgroundRedirect.ts";
import type { CompressionConfig, CompressionPipelineStep } from "../services/compression/types.ts";
import { prepareWebSearchFallbackBody } from "../services/webSearchFallback.ts";
import {
  resolveExplicitStreamAlias,
  resolveStreamFlag,
  stripMarkdownCodeFence,
} from "../utils/aiSdkCompat.ts";
import { generateRequestId } from "@/shared/utils/requestId";
import { extractFacts } from "@/lib/memory/extraction";
import { handleToolCallExecution } from "@/lib/skills/interception";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import {
  buildClaudeCodeCompatibleRequest,
  isClaudeCodeCompatibleProvider,
  resolveClaudeCodeCompatibleSessionId,
} from "../services/claudeCodeCompatible.ts";
import { setGeminiThoughtSignatureMode } from "../services/geminiThoughtSignatureStore.ts";
import { fetchLiveProviderLimits } from "@/lib/usage/providerLimits";
import { isClaudeExtraUsageBlockEnabled } from "@/lib/providers/claudeExtraUsage";
import {
  classifyModelScope429,
  getModelScopeRetryDelayMs,
  isModelScopeProvider,
} from "../services/modelscopePolicy.ts";
import { incrementRequestCount } from "../services/geminiRateLimitTracker.ts";

// ── Global memory pressure guard ────────────────────────────────────────
// Prevents OOM by rejecting new requests when V8 heap exceeds threshold.
// Self-healing: no counters to leak, no cleanup needed. The threshold
// auto-calibrates to 85% of the actual V8 heap ceiling (see heapPressure.ts) so
// it tracks --max-old-space-size across 1GB/2GB/large VPS instead of a fixed
// 200MB that sat below the app's own ~260MB baseline and rejected every request.

import { isSmallEnoughForSemanticCache } from "../utils/estimateSize.ts";

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
 * @param {string} options.userAgent - Client user agent for caching decisions
 * @param {string} options.comboName - Combo name if this is a combo request
 * @param {string} options.comboStrategy - Combo routing strategy (e.g., 'priority', 'cost-optimized')
 * @param {boolean} options.isCombo - Whether this request is from a combo
 * @param {string} options.connectionId - Connection ID for settings lookup
 */

// extractSystemRoleMessages extracted to chatCore/claudeSystemRole.ts (#3501); re-exported above so
// existing importers (e.g. tests/unit/system-role-extraction.test.ts) keep resolving it from here.

export async function handleChatCore({
  body,
  modelInfo,
  credentials,
  log,
  onCredentialsRefreshed,
  onRequestSuccess,
  onStreamFailure,
  onDisconnect,
  clientRawRequest,
  connectionId,
  apiKeyInfo = null,
  userAgent,
  comboName,
  comboStrategy = null,
  isCombo = false,
  comboStepId = null,
  comboExecutionKey = null,
  cachedSettings = null,
  skipUpstreamRetry = false,
  createPiiTransform = null,
}) {
  let { provider, model, extendedContext } = modelInfo;
  // ── Memory pressure guard ────────────────────────────────────────────
  // Reject early if V8 heap is already near the 256MB limit. Prevents
  // cascading OOM when many large-context requests arrive concurrently.
  try {
    const heapUsedMB = process.memoryUsage().heapUsed / (1024 * 1024);
    const heapGuard = checkHeapPressureGuard(heapUsedMB);
    if (heapGuard) return heapGuard;
  } catch {
    /* memoryUsage() never throws */
  }

  // Per-request model-routing metadata (first extracted slice of the request-setup phase).
  const { apiFormat, customModelTargetFormat, requestedModel } = resolveChatCoreRequestSetup(
    modelInfo,
    body,
    model
  );
  const isModelScope = () => isModelScopeProvider(provider, credentials?.providerSpecificData);
  const startTime = Date.now();
  // Per-request trace id + checkpoint helper. Lets us see exactly which await
  // a hung request was sitting on in `[STAGE_TRACE]` log lines. Uses crypto RNG
  // (not Math.random) purely to satisfy CodeQL js/insecure-randomness — this id
  // is a log-correlation token, not a security secret.
  const traceId = globalThis.crypto.randomUUID().slice(0, 6);

  // Emit request.started event for real-time dashboard
  setImmediate(() => {
    emit("request.started", {
      id: traceId,
      model: model || "unknown",
      provider: provider || "unknown",
      timestamp: startTime,
      comboName: comboName || undefined,
    });
  });
  const traceEnabled = process.env.OMNIROUTE_TRACE === "true" || process.env.DEBUG === "true";
  // Stage trace extracted to chatCore/stageTrace.ts (#3501); bind the per-request inputs once so the
  // call sites stay byte-identical.
  const trace = (label: string, extra?: Record<string, unknown>) =>
    stageTrace(label, extra, { traceEnabled, startTime, traceId, log });
  let tokensCompressed: number | null = null;
  body = injectSystemPrompt(body);
  // ── Per-endpoint custom system prompt (port of upstream #2063) ──
  // Reads from cachedSettings if available (passed in from combo/chat layer)
  // to avoid an extra DB read on the hot path. Falls through to getCachedSettings()
  // only when this function is called outside the normal chat dispatch.
  {
    const _s = cachedSettings ?? (await getCachedSettings());
    if (_s.customSystemPromptEnabled === true && typeof _s.customSystemPrompt === "string" && _s.customSystemPrompt) {
      body = injectCustomSystemPrompt(body as Record<string, unknown>, _s.customSystemPrompt);
      log?.debug?.("CUSTOMSP", "custom system prompt injected");
    }
  }
  // ── Plugin onRequest hook ──
  // Dynamic import cached by Node.js after first call — minimal overhead
  const pluginGate = await runPluginOnRequestHook({
    requestId: traceId,
    body,
    model,
    provider,
    apiKeyInfo,
    log,
  });
  if (pluginGate.blocked) {
    return {
      success: false,
      status: 403,
      error: "Request blocked by plugin",
      response: pluginGate.response,
    };
  }
  if (pluginGate.body) {
    body = pluginGate.body;
  }

  let effectiveServiceTier: EffectiveServiceTier = "standard";
  // Codex service-tier resolvers extracted to chatCore/serviceTier.ts (#3501); bind the per-request
  // provider/credentials once and delegate so the existing call sites stay byte-identical.
  const resolveEffectiveServiceTier = (requestBody?: unknown): EffectiveServiceTier =>
    resolveEffectiveServiceTierFor(provider, credentials?.providerSpecificData, requestBody);
  const resolveReportedServiceTier = (
    payload?: unknown,
    maxDepth = 3
  ): EffectiveServiceTier | null => resolveReportedServiceTierFor(provider, payload, maxDepth);
  // Failure usage record building extracted to chatCore/failureUsage.ts (#3501); the handler keeps
  // the fire-and-forget save + computes latencyMs, so the call sites stay byte-identical.
  const persistFailureUsage = (statusCode: number, errorCode?: string | null) => {
    saveRequestUsage(
      buildFailureUsageRecord({
        provider,
        model,
        connectionId,
        apiKeyInfo,
        effectiveServiceTier,
        isCombo,
        comboStrategy,
        statusCode,
        errorCode,
        latencyMs: Date.now() - startTime,
        endpoint: endpointPath,
      })
    ).catch(() => {});
  };

  // Key-health updater extracted to chatCore/keyHealth.ts (#3501); bind the per-request log once
  // and delegate so the existing call sites stay byte-identical.
  const recordKeyHealthStatus = (
    status: number,
    creds: Record<string, unknown> | null | undefined
  ): void => recordKeyHealthStatusFor(status, creds, log);

  const persistCodexQuotaState = async (headers: Record<string, string> | null, status = 0) => {
    if (provider !== "codex" || !connectionId || !headers) return;

    try {
      const existingProviderData =
        credentials?.providerSpecificData && typeof credentials.providerSpecificData === "object"
          ? (credentials.providerSpecificData as Record<string, unknown>)
          : {};
      // Pure payload build extracted to chatCore/codexQuota.ts (#3501). Returns null when the
      // response carries no quota headers (nothing to persist).
      const built = buildCodexQuotaPersistence({
        headers,
        existingProviderData,
        modelForScope: model || requestedModel || "",
        status,
      });
      if (!built) return;

      if (built.exhaustionLog) {
        log?.debug?.("CODEX", built.exhaustionLog);
      }

      // Invalidate the preflight cache for this connection so the next
      // isModelAvailable check fetches fresh quota data.
      if (status === 429) {
        invalidateCodexQuotaCache(connectionId);
      }

      await updateProviderConnection(connectionId, {
        providerSpecificData: built.nextProviderData,
      });

      credentials.providerSpecificData = built.nextProviderData;
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      log?.debug?.("CODEX", `Failed to persist codex quota state: ${errMessage}`);
    }
  };

  // ── Phase 9.2: Idempotency check ──
  // Resolve the idempotency key once here and reuse it at the Phase 9.2 save site below,
  // rather than re-deriving it. (#3821-review LEDGER-6)
  const { hit: idempotencyHit, idempotencyKey } = await checkIdempotencyCache({
    clientRawRequest,
    provider,
    model,
    effectiveServiceTier,
    startTime,
    log,
  });
  if (idempotencyHit) {
    return idempotencyHit;
  }

  // T07: Inject connectionId into credentials so executors can rotate API keys
  // using providerSpecificData.extraApiKeys (API Key Round-Robin feature)
  if (connectionId && credentials && !credentials.connectionId) {
    credentials.connectionId = connectionId;
  }

  // Endpoint/format resolution extracted to chatCore/requestFormat.ts (#3501); pure derivation
  // from the inbound request, destructured so every downstream use stays byte-identical.
  const {
    endpointPath,
    sourceFormat,
    isResponsesEndpoint,
    nativeCodexPassthrough,
    isDroidCLI,
    copilotCompatibleReasoning,
    clientResponseFormat,
  } = resolveChatCoreRequestFormat({ clientRawRequest, body, provider, userAgent });

  // Check for bypass patterns (warmup, skip) - return fake response
  const bypassResponse = handleBypassRequest(body, model, userAgent);
  if (bypassResponse) {
    return bypassResponse;
  }

  // Detect source format and get target format
  // Model-specific targetFormat takes priority over provider default

  // ── Background Task Redirection (T41) — decision extracted to chatCore/backgroundRedirect.ts (#3501)
  // backgroundReason is the detection signal (threaded into memory/skills injection below); redirect
  // is the actual model downgrade to apply, if any.
  const { backgroundReason, redirect: bgRedirect } = resolveBackgroundTaskRedirect({
    body,
    headers: clientRawRequest?.headers,
    model,
  });
  if (bgRedirect) {
    const originalModel = model;
    log?.info?.(
      "BACKGROUND",
      `Background task redirect (${bgRedirect.reason}): ${originalModel} → ${bgRedirect.degradedModel}`
    );
    model = bgRedirect.degradedModel;
    if (body && typeof body === "object") {
      body.model = model;
    }

    logAuditEvent({
      action: "routing.background_task_redirect",
      actor: apiKeyInfo?.name || "system",
      target: connectionId || provider || "chat",
      details: {
        original_model: originalModel,
        redirected_to: bgRedirect.degradedModel,
        reason: bgRedirect.reason,
      },
    });
  }

  // Apply custom model aliases (Settings → Model Aliases → Pattern→Target) before routing (#315, #472)
  // Custom aliases take priority over built-in and must be resolved here so the
  // downstream getModelTargetFormat() lookup AND the actual provider request use
  // the correct, aliased model ID. Without this, aliases only affect format detection.
  const resolvedModel = resolveModelAlias(model);
  // Use resolvedModel for all downstream operations (routing, provider requests, logging)
  let effectiveModel = resolvedModel === model ? model : resolvedModel;
  if (resolvedModel !== model) {
    log?.info?.("ALIAS", `Model alias applied: ${model} → ${resolvedModel}`);
  }

  // Effort-variant model ids: the Claude / Claude-Code model picker (e.g. VS Code's
  // "Effort" slider) advertises claude-...-{low,medium,high,xhigh,max}. Anthropic has
  // no such model, so the suffixed id 404s upstream. Strip it back to the real base id
  // (forwarded as the upstream model via finalModelToUpstream below) and surface the
  // level as reasoning_effort so the OpenAI→Claude translator / Claude-Code bridge turn
  // it into Claude thinking/effort config. An explicit client-supplied effort always
  // wins; native Claude passthrough is left untouched (it carries its own `thinking`),
  // and non-thinking base models are cleaned up later by normalizeThinkingForModel().
  // Extracted to chatCore/claudeEffortVariant.ts (#3501); mutates body in place and returns the
  // stripped model + an optional log line, keeping behaviour byte-identical.
  {
    const effortVariant = applyClaudeEffortVariant({
      provider,
      effectiveModel,
      body,
      sourceFormat,
    });
    effectiveModel = effortVariant.effectiveModel;
    if (effortVariant.log) {
      log?.info?.("PARAMS", effortVariant.log);
    }
  }

  // Wire target-format resolution extracted to chatCore/targetFormat.ts (#3501); `alias` is reused
  // downstream when stripping the alias/ prefix off the upstream model id.
  const { alias, targetFormat } = resolveChatCoreTargetFormat({
    provider,
    resolvedModel,
    apiFormat,
    customModelTargetFormat,
    providerSpecificData: credentials?.providerSpecificData,
  });

  const initialProviderRequest =
    body && typeof body === "object" && !Array.isArray(body)
      ? {
          ...(body as Record<string, unknown>),
          model:
            typeof (body as Record<string, unknown>).model === "string"
              ? (body as Record<string, unknown>).model
              : effectiveModel,
        }
      : body;

  // Track pending requests before slower optional enrichment (settings, logging,
  // compression) so internal usage/runtime counters stay accurate even when
  // upstream never returns response headers.
  // Use credentials.connectionId as a fallback so that requests without an
  // explicit session-level connectionId still register in the pendingRequests map.
  const pendingConnId = connectionId || credentials?.connectionId || null;
  const pendingRequestId =
    trackPendingRequest(model, provider, pendingConnId, true, {
      clientEndpoint: clientRawRequest?.endpoint || "/v1/chat/completions",
      clientRequest: clientRawRequest?.body ?? body,
      providerRequest: initialProviderRequest,
      stage: "registered",
    }) || generateRequestId();

  // Initialize rate limit settings from persisted DB (once, lazy)
  await initializeRateLimits();

  const { body: bodyWithWebSearchFallback, fallback: webSearchFallbackPlan } =
    prepareWebSearchFallbackBody(body as Record<string, unknown>, {
      provider,
      sourceFormat,
      targetFormat,
      nativeCodexPassthrough,
    });
  if (webSearchFallbackPlan.enabled) {
    body = bodyWithWebSearchFallback as typeof body;
    log?.info?.(
      "TOOLS",
      `Converted ${webSearchFallbackPlan.convertedToolCount} web_search tool(s) to OmniRoute fallback for ${provider}`
    );
  }
  const noLogEnabled = apiKeyInfo?.noLog === true;
  // Consolidate settings reads — fetch once, reuse throughout the request
  const settings = cachedSettings ?? (await getCachedSettings());
  // #1311 (opt-in): echo the client-requested alias/combo name in the response `model`
  // field instead of the upstream model, so strict clients (Claude Desktop) that validate
  // response.model === request.model stop rejecting alias/combo requests with a 401.
  const echoModel =
    settings.echoRequestedModelName === true && typeof requestedModel === "string" && requestedModel
      ? requestedModel
      : null;
  const detailedLoggingEnabled =
    !noLogEnabled &&
    (settings.call_log_pipeline_enabled === true ||
      settings.call_log_pipeline_enabled === "1" ||
      settings.call_log_pipeline_enabled === "true");
  const capturePipelineStreamChunks =
    detailedLoggingEnabled && getCallLogPipelineCaptureStreamChunks();
  const skillRequestId = generateRequestId();
  let compressionAnalyticsWritePromise: Promise<void> | null = null;
  // Compression usage-receipt attachment extracted to chatCore/compressionUsageReceipt.ts (#3501);
  // pass the in-flight analytics write + request id so behaviour stays byte-identical.
  const attachCompressionUsageReceiptAfterAnalytics = (
    usage: Record<string, unknown>,
    source: "provider" | "estimated" | "stream"
  ) =>
    attachCompressionUsageReceiptAfterAnalyticsFor(usage, source, {
      pendingWrite: compressionAnalyticsWritePromise,
      skillRequestId,
    });
  const pipelineSessionId =
    (clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("x-omniroute-session-id")
      : getHeaderValueCaseInsensitive(
          clientRawRequest?.headers ?? null,
          "x-omniroute-session-id"
        )) || skillRequestId;
  // persistAttemptLogs extracted to chatCore/attemptLogging.ts (#3501); bind the per-request context
  // once so the 16 call sites keep passing only the per-attempt args (byte-identical).
  const persistAttemptLogs = (args: PersistAttemptLogsArgs) =>
    persistAttemptLogsFor(args, {
      provider,
      connectionId,
      model,
      skillRequestId,
      detailedLoggingEnabled,
      reqLogger,
      pendingRequestId,
      clientRawRequest,
      requestedModel,
      credentials,
      startTime,
      body,
      sourceFormat,
      targetFormat,
      comboName,
      comboStepId,
      comboExecutionKey,
      tokensCompressed,
      apiKeyInfo,
      noLogEnabled,
    });

  // Primary path: merge client model id + alias target so config on either key applies; resolved
  // id wins on same header name. T5 family fallback uses only (nextModel, resolveModelAlias(next))
  // so A-model headers are not sent to B — see buildUpstreamHeadersForExecute.
  const connectionCustomUserAgent =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    typeof credentials.providerSpecificData.customUserAgent === "string"
      ? credentials.providerSpecificData.customUserAgent.trim()
      : "";

  // Upstream extra-header building extracted to chatCore/upstreamExecuteHeaders.ts (#3501); bind the
  // per-request inputs once and delegate so the existing call sites stay byte-identical.
  const buildUpstreamHeadersForExecute = (modelToCall: string): Record<string, string> =>
    buildUpstreamHeadersForExecuteFor({
      modelToCall,
      effectiveModel,
      provider,
      model,
      resolvedModel,
      sourceFormat,
      connectionCustomUserAgent,
      settings,
    });

  // Default to false unless client explicitly sets stream: true (OpenAI spec compliant)
  const acceptHeader =
    clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("accept") || clientRawRequest.headers.get("Accept")
      : clientRawRequest?.headers?.["accept"] || clientRawRequest?.headers?.["Accept"];
  const streamUserAgent = [
    typeof userAgent === "string" ? userAgent : "",
    getHeaderValueCaseInsensitive(clientRawRequest?.headers ?? null, "user-agent") || "",
  ]
    .filter(Boolean)
    .join(" ");

  const explicitStreamAlias = resolveExplicitStreamAlias(body);

  // Remove non-standard non-stream aliases before provider translation/execution.
  // They are accepted for compatibility at the OmniRoute API boundary only.
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (explicitStreamAlias !== undefined) {
      b.stream = explicitStreamAlias;
    }

    delete b.non_stream;
    delete b.disable_stream;
    delete b.disable_streaming;
    delete b.streaming;
  }

  // Codex /responses/compact is JSON-only: Codex CLI does not send stream=false,
  // so route shape must override the usual Accept/header fallback.
  // sourceFormat="claude" applies the Anthropic Messages spec default (stream=false
  // when body omits stream), preventing STREAM_EARLY_EOF on /v1/messages when
  // clients send Accept: */* without an explicit stream flag.
  const stream =
    nativeCodexPassthrough && isCompactResponsesEndpoint(endpointPath)
      ? false
      : resolveStreamFlag(body?.stream, acceptHeader, sourceFormat, {
          userAgent: streamUserAgent,
          streamDefaultMode: apiKeyInfo?.streamDefaultMode,
        });

  // `settings` is already consolidated once near the top of handleChatCore
  // (the "fetch once, reuse" const). A second `const settings` here was a
  // duplicate same-scope declaration that broke the esbuild/tsx transform
  // ("settings has already been declared") and the production build. Reuse it.
  credentials = applyCodexGlobalFastServiceTier(provider, credentials, settings, {
    model: requestedModel,
    body: body && typeof body === "object" ? (body as Record<string, unknown>) : null,
  });
  effectiveServiceTier = resolveEffectiveServiceTier(body);
  setGeminiThoughtSignatureMode(settings.antigravitySignatureCacheMode);
  const semanticCacheEnabled = settings.semanticCacheEnabled !== false;

  const reqLogger = await createRequestLogger(sourceFormat, targetFormat, model, {
    enabled: detailedLoggingEnabled,
    captureStreamChunks: capturePipelineStreamChunks,
    maxStreamChunkBytes: getCallLogPipelineMaxSizeBytes(),
    requestId: pendingRequestId,
    model,
    provider: provider || undefined,
    connectionId: connectionId || credentials?.connectionId || undefined,
  });
  const pendingScope = { id: pendingRequestId, model, provider, connectionId: pendingConnId };
  const providerRequestCapture = createPreparedRequestLogger(reqLogger, pendingScope);
  // 0. Log client raw request (before format conversion)
  if (clientRawRequest) {
    reqLogger.logClientRawRequest(
      clientRawRequest.endpoint,
      clientRawRequest.body,
      clientRawRequest.headers
    );
  }

  log?.debug?.("FORMAT", `${sourceFormat} → ${targetFormat} | stream=${stream}`);

  // ── Phase 9.1: Semantic cache check (temp=0, any streaming mode) ──
  const cacheHit = await checkSemanticCache({
    semanticCacheEnabled,
    body,
    clientRawRequest,
    model,
    provider,
    stream: !!stream,
    reqLogger,
    effectiveServiceTier,
    connectionId,
    startTime,
    log,
    persistAttemptLogs,
    apiKeyId: apiKeyInfo?.id ?? undefined,
  });
  if (cacheHit) {
    return cacheHit;
  }

  body = sanitizeChatRequestBody(body, sourceFormat, targetFormat);
  // Per-request opt-out: clients that manage their own context send
  // `x-omniroute-no-memory: true` to skip memory+skills injection (a null owner
  // disables both branches in injectMemoryAndSkills). See PRD-2026-06-19-no-memory-header.
  const memoryOwnerId = isNoMemoryRequested(clientRawRequest?.headers ?? null)
    ? null
    : resolveMemoryOwnerId(apiKeyInfo as Record<string, unknown> | null);
  const injectionResult = await injectMemoryAndSkills({
    body,
    memoryOwnerId,
    provider,
    effectiveModel,
    sourceFormat,
    targetFormat,
    backgroundReason,
    log,
  });
  body = injectionResult.body;
  const memorySettings = injectionResult.memorySettings;

  // Translate request (pass reqLogger for intermediate logging)
  // ── Proactive Context Compression (Phase 4) ──
  // Check if context exceeds 70% of limit and compress proactively before sending to provider.
  // This prevents "prompt too long" errors for large-but-not-full contexts.
  const compressionBody = body
    ? adaptBodyForCompression(body as Record<string, unknown>).body
    : null;
  const allMessages = compressionBody?.messages || body?.contents || body?.request?.contents || [];
  let cavemanOutputModeApplied = false;
  let cavemanOutputModeIntensity: string | null = null;
  let preCompressionBody: typeof body | null = null;
  let compressionResponseMeta: string | null = null;
  // Delegated Context Editing (Claude only): captured at the canonical compression
  // settings read below, then threaded to executor.execute() further down. Lives at
  // function scope because the read happens inside the per-message compression block.
  let contextEditingEnabled = false;
  if (body && Array.isArray(allMessages) && allMessages.length > 0) {
    let estimatedTokens = estimateTokens(allMessages);
    const compressionSettingsResult = await resolveCompressionSettings(log);
    const compressionSettings: CompressionConfig | null = compressionSettingsResult.settings;
    const promptCompressionEnabled = compressionSettingsResult.enabled;
    contextEditingEnabled = compressionSettingsResult.contextEditingEnabled;

    // --- Modular Compression Pipeline (Phase 1 Lite + Phase 2 Standard/Caveman + Phase 3 Aggressive) ---
    // Runs BEFORE the existing reactive compressContext() to proactively reduce tokens.
    try {
      const {
        selectCompressionStrategy,
        selectCompressionPlan,
        enginesMapDerivesStackedPipeline,
        activeComboResolves,
        applyCompressionAsync,
        resolveCacheAwareConfig,
        formatCompressionMeta,
        buildNamedComboLookup,
      } = await import("../services/compression/strategySelector.ts");
      const { trackCompressionStats } = await import("../services/compression/stats.ts");
      let config: CompressionConfig = compressionSettings ?? {
        enabled: false,
        defaultMode: "off",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
      };
      if (!promptCompressionEnabled || !compressionSettings) {
        log?.debug?.("COMPRESSION", "Prompt compression disabled or unavailable");
      }
      let compressionComboKey = comboName ?? null;
      let compressionComboApplied = false;
      const applyCompressionComboConfig = (
        compressionCombo: RuntimeCompressionCombo | null,
        routingOverrideIds: string[] = []
      ): boolean => {
        if (!compressionCombo || compressionCombo.pipeline.length === 0) return false;
        const comboLanguagePacks = [
          ...new Set(
            compressionCombo.languagePacks
              .map((pack) => pack.trim())
              .filter((pack) => pack.length > 0)
          ),
        ];
        const comboOutputIntensity = (
          ["lite", "full", "ultra"].includes(compressionCombo.outputModeIntensity)
            ? compressionCombo.outputModeIntensity
            : (config.cavemanOutputMode?.intensity ?? "full")
        ) as "lite" | "full" | "ultra";
        const comboDefaultLanguage =
          comboLanguagePacks.find((pack) => pack === config.languageConfig?.defaultLanguage) ??
          comboLanguagePacks[0] ??
          config.languageConfig?.defaultLanguage ??
          "en";
        const comboOverrides = { ...(config.comboOverrides ?? {}) };
        for (const id of routingOverrideIds) {
          if (id) comboOverrides[id] = "stacked";
        }
        config = {
          ...config,
          compressionComboId: compressionCombo.id,
          stackedPipeline: compressionCombo.pipeline,
          languageConfig: {
            ...(config.languageConfig ?? {
              enabled: false,
              defaultLanguage: "en",
              autoDetect: true,
              enabledPacks: ["en"],
            }),
            enabled: true,
            defaultLanguage: comboDefaultLanguage,
            enabledPacks:
              comboLanguagePacks.length > 0
                ? comboLanguagePacks
                : (config.languageConfig?.enabledPacks ?? ["en"]),
          },
          cavemanOutputMode: {
            ...(config.cavemanOutputMode ?? {
              enabled: false,
              intensity: "full",
              autoClarity: true,
            }),
            enabled: compressionCombo.outputMode,
            intensity: comboOutputIntensity,
          },
          comboOverrides,
        };
        compressionComboApplied = true;
        return true;
      };
      if (isCombo && comboName) {
        try {
          const { getComboByName } = await import("../../src/lib/localDb");
          let comboConfig = await getComboByName(comboName);
          if (!comboConfig && comboName.startsWith("combo/")) {
            comboConfig = await getComboByName(comboName.substring(6));
          }
          const comboRuntimeConfig =
            comboConfig?.config && typeof comboConfig.config === "object"
              ? (comboConfig.config as Record<string, unknown>)
              : {};
          const comboMode =
            typeof comboRuntimeConfig.compressionMode === "string"
              ? comboRuntimeConfig.compressionMode
              : typeof comboConfig?.compressionOverride === "string"
                ? comboConfig.compressionOverride
                : null;
          if (
            comboMode === "off" ||
            comboMode === "lite" ||
            comboMode === "standard" ||
            comboMode === "aggressive" ||
            comboMode === "ultra" ||
            comboMode === "rtk" ||
            comboMode === "stacked"
          ) {
            config = {
              ...config,
              comboOverrides: {
                ...(config.comboOverrides ?? {}),
                ...(comboName ? { [comboName]: comboMode } : {}),
                ...(comboConfig?.id ? { [String(comboConfig.id)]: comboMode } : {}),
              },
            };
            compressionComboKey = comboName;
          }
          const routingComboIds = [
            comboConfig?.id,
            comboName,
            comboName.startsWith("combo/") ? comboName.substring(6) : null,
          ].filter((id): id is string => typeof id === "string" && id.length > 0);
          if (routingComboIds.length > 0) {
            const { getCompressionComboForRoutingCombo } =
              await import("../../src/lib/db/compressionCombos.ts");
            const assignedCompressionCombo =
              routingComboIds
                .map((id) => getCompressionComboForRoutingCombo(id))
                .find((combo) => combo !== null) ?? null;
            if (
              applyCompressionComboConfig(
                assignedCompressionCombo as RuntimeCompressionCombo | null,
                routingComboIds
              )
            ) {
              compressionComboKey = comboName;
            }
          }
        } catch (err) {
          log?.debug?.(
            "COMPRESSION",
            "Combo compression override lookup skipped: " +
              (err instanceof Error ? err.message : String(err))
          );
        }
      }
      let namedCombos: Record<string, CompressionPipelineStep[]> = {};
      try {
        const { listCompressionCombos } = await import("../../src/lib/db/compressionCombos.ts");
        namedCombos = buildNamedComboLookup(listCompressionCombos());
      } catch (err) {
        log?.debug?.(
          "COMPRESSION",
          "Named combos load skipped: " + (err instanceof Error ? err.message : String(err))
        );
      }
      // Phase 3: per-request override. Unknown values fall through in the resolver (never error).
      const compressionHeader = resolveCompressionHeader(clientRawRequest?.headers ?? null);
      if (compressionHeader) {
        log?.debug?.("COMPRESSION", `x-omniroute-compression header: ${compressionHeader}`);
      }
      const modeBeforeOutputTransform = selectCompressionStrategy(
        config,
        compressionComboKey,
        estimatedTokens,
        body as Record<string, unknown>,
        { provider, targetFormat, model: effectiveModel },
        namedCombos,
        compressionHeader
      );
      if (
        modeBeforeOutputTransform === "stacked" &&
        !compressionComboApplied &&
        !config.compressionComboId &&
        isBuiltinStackedPipeline(config.stackedPipeline) &&
        // Don't let the legacy default combo override a panel-configured engines map: when the
        // operator's explicit engines derive their own stacked pipeline, that pipeline (applied
        // below from compressionPlan.stackedPipeline) is authoritative. Legacy/backfilled
        // installs (enginesExplicit false) still fall through to the seeded default combo.
        !enginesMapDerivesStackedPipeline(config) &&
        // Never let the legacy seeded default combo shadow the operator's active profile.
        !activeComboResolves(config, namedCombos)
      ) {
        try {
          const { getDefaultCompressionCombo } =
            await import("../../src/lib/db/compressionCombos.ts");
          const defaultCompressionCombo = getDefaultCompressionCombo();
          if (
            isStackedCompressionCombo(defaultCompressionCombo as RuntimeCompressionCombo | null) &&
            applyCompressionComboConfig(defaultCompressionCombo as RuntimeCompressionCombo | null)
          ) {
            log?.debug?.(
              "COMPRESSION",
              `Default compression combo applied: ${defaultCompressionCombo?.id}`
            );
          }
        } catch (err) {
          log?.debug?.(
            "COMPRESSION",
            "Default compression combo lookup skipped: " +
              (err instanceof Error ? err.message : String(err))
          );
        }
      }
      // Phase 4A: unified output styles (supersedes cavemanOutputMode via the back-compat shim).
      let outputStyleResult:
        | import("../services/compression/outputStyles/apply.ts").OutputStylesResult
        | null = null;
      if (config.enabled) {
        try {
          const { resolveOutputStyleSelection } =
            await import("../services/compression/outputStyles/backCompat.ts");
          const selection = resolveOutputStyleSelection(config);
          if (selection.length > 0) {
            const { applyOutputStyles } =
              await import("../services/compression/outputStyles/apply.ts");
            const outputStyleLanguage =
              config.languageConfig?.enabled === true
                ? config.languageConfig.defaultLanguage
                : "en";
            outputStyleResult = applyOutputStyles(
              body as Parameters<typeof applyOutputStyles>[0],
              selection,
              outputStyleLanguage
            );
            if (outputStyleResult.applied) {
              body = outputStyleResult.body as typeof body;
              cavemanOutputModeApplied = true;
              cavemanOutputModeIntensity =
                outputStyleResult.appliedStyles?.map((s) => `${s.id}:${s.level}`).join(",") ?? null;
              estimatedTokens = estimateTokens(body?.messages ?? body?.input ?? []);
              log?.debug?.("COMPRESSION", "Output styles applied");
            } else if (
              outputStyleResult.skippedReason &&
              outputStyleResult.skippedReason !== "no_styles"
            ) {
              log?.debug?.(
                "COMPRESSION",
                `Output styles skipped: ${outputStyleResult.skippedReason}`
              );
            }
          }
        } catch (err) {
          log?.debug?.(
            "COMPRESSION",
            "Output styles skipped: " + (err instanceof Error ? err.message : String(err))
          );
        }
      }
      const compressionInputBody = body as Record<string, unknown>;
      // Adaptive context-budget (Sub-project C): model context window + request max_tokens drive
      // the budget target. getTokenLimit is already imported; provider/effectiveModel resolved above.
      const adaptiveModelContextLimit =
        provider && effectiveModel ? getTokenLimit(provider, effectiveModel) : null;
      const requestMaxTokens =
        typeof (compressionInputBody as Record<string, unknown>)?.max_tokens === "number"
          ? ((compressionInputBody as Record<string, unknown>).max_tokens as number)
          : null;
      let adaptiveTelemetry:
        | import("../services/compression/adaptiveCompression/types.ts").AdaptiveTelemetry
        | null = null;
      const compressionPlan = selectCompressionPlan(
        config,
        compressionComboKey,
        estimatedTokens,
        compressionInputBody,
        { provider, targetFormat, model: effectiveModel },
        namedCombos,
        compressionHeader,
        {
          modelContextLimit: adaptiveModelContextLimit,
          requestMaxTokens: requestMaxTokens,
          onAdaptive: (t) => {
            adaptiveTelemetry = t;
          },
        }
      );
      const mode = compressionPlan.mode as CompressionConfig["defaultMode"];
      if (adaptiveTelemetry && adaptiveTelemetry.fit === false) {
        log?.warn?.(
          "COMPRESSION",
          `adaptive budget-exceeded: target=${adaptiveTelemetry.target} headroomAfter=${adaptiveTelemetry.headroomAfter} stages=${adaptiveTelemetry.stagesApplied.join(",")} (best-effort plan sent, content preserved)`
        );
      }
      compressionResponseMeta = formatCompressionMeta(compressionPlan);
      // When the per-engine toggle map derives a stacked pipeline (and no named/routing
      // combo already set config.stackedPipeline), feed that derived pipeline through so
      // applyCompressionAsync (which reads config.stackedPipeline for stacked mode) runs the
      // engines the operator actually toggled on instead of the built-in rtk+caveman default.
      if (
        mode === "stacked" &&
        compressionPlan.stackedPipeline.length > 0 &&
        !compressionComboApplied &&
        !config.compressionComboId
      ) {
        config = {
          ...config,
          stackedPipeline: compressionPlan.stackedPipeline as CompressionConfig["stackedPipeline"],
        };
      }
      let compressionAnalyticsRecorded = false;
      if (mode !== "off") {
        // #3890: in a caching context, never compress the system prompt (cacheable prefix)
        // even if the operator disabled preserveSystemPrompt — honors the cache-aware flag
        // that selectCompressionStrategy can only partially apply via the mode string.
        const compressionConfig = resolveCacheAwareConfig(config, compressionInputBody, {
          provider,
          targetFormat,
          model: effectiveModel,
        });
        const result = await applyCompressionAsync(compressionInputBody, mode, {
          model: effectiveModel,
          config: compressionConfig,
          principalId: apiKeyInfo?.id ? String(apiKeyInfo.id) : undefined,
          // F3.3: stream per-engine progress live (best-effort) before compression.completed.
          onEngineStep: (s) => {
            try {
              const stepPayload = {
                requestId: traceId,
                comboId: null,
                mode,
                stepIndex: s.stepIndex,
                totalSteps: s.totalSteps,
                engine: s.engine,
                state: s.state,
                originalTokens: s.originalTokens,
                compressedTokens: s.compressedTokens,
                savingsPercent: s.savingsPercent,
                ...(s.durationMs !== undefined ? { durationMs: s.durationMs } : {}),
                timestamp: Date.now(),
              };
              emit("compression.step", stepPayload);
              void forwardDashboardEventToLiveWs("compression.step", stepPayload);
            } catch (_stepErr) {
              // best-effort live event — never fail the request
            }
          },
        });
        if (result.stats) {
          if (result.compressed) {
            body = result.body as typeof body;
            estimatedTokens = result.stats.compressedTokens;
            tokensCompressed = Math.max(
              0,
              result.stats.originalTokens - result.stats.compressedTokens
            );
          }

          // Fire-and-forget: emit live compression event for dashboard (U5).
          // Guard: only emit when compression actually ran and produced stats.
          if (result.compressed && result.stats) {
            try {
              const compressionCompletedPayload = {
                requestId: traceId,
                comboId: result.stats.compressionComboId ?? null,
                mode,
                originalTokens: result.stats.originalTokens,
                compressedTokens: result.stats.compressedTokens,
                savingsPercent: result.stats.savingsPercent,
                // Single-engine modes leave engineBreakdown empty; synthesize a 1-entry
                // breakdown so the studio shows a real engine node instead of an empty pipeline.
                engineBreakdown: ensureEngineBreakdown(result.stats),
                validationWarnings: result.stats.validationWarnings,
                fallbackApplied: result.stats.fallbackApplied,
                ...(adaptiveTelemetry ? { adaptive: adaptiveTelemetry } : {}),
                timestamp: Date.now(),
              };
              emit("compression.completed", compressionCompletedPayload);
              void forwardDashboardEventToLiveWs(
                "compression.completed",
                compressionCompletedPayload
              );
            } catch (_emitErr) {
              // never propagate into the hot path — but log like the sibling
              // fire-and-forget blocks so a throwing event bus isn't fully silent.
              log?.debug?.(
                "COMPRESSION",
                "compression.completed emit skipped: " +
                  (_emitErr instanceof Error ? _emitErr.message : String(_emitErr))
              );
            }
          }

          if (result.compressed || result.stats.fallbackApplied || cavemanOutputModeApplied) {
            trackCompressionStats(result.stats);
            compressionAnalyticsRecorded = true;
            compressionAnalyticsWritePromise = writeCompressionAnalytics({
              stats: result.stats,
              provider,
              effectiveModel,
              effectiveServiceTier,
              comboName,
              mode,
              compressionComboId: config.compressionComboId,
              skillRequestId,
              cavemanOutputModeApplied,
              cavemanOutputModeIntensity,
              log,
            });
          }

          if (result.compressed) {
            recordCompressionCacheStats({
              compressionInputBody,
              provider,
              targetFormat,
              effectiveModel,
              mode,
              stats: result.stats,
              log,
            });
            log?.info?.(
              "COMPRESSION",
              `Prompt compressed (${mode}): ${result.stats.originalTokens} -> ${result.stats.compressedTokens} tokens (${result.stats.savingsPercent}% saved, techniques: ${result.stats.techniquesUsed.join(",")})`
            );
          }
        }
      }
      if (cavemanOutputModeApplied && !compressionAnalyticsRecorded) {
        compressionAnalyticsWritePromise = writeCavemanOutputAnalytics({
          comboName,
          provider,
          compressionComboId: config.compressionComboId,
          estimatedTokens,
          skillRequestId,
          cavemanOutputModeIntensity,
          log,
        });
      }
      emitOutputStyleTelemetry({
        outputStyleResult,
        skillRequestId,
        traceId,
        effectiveModel,
        provider,
        compressionComboId: config.compressionComboId,
        estimatedTokens,
        log,
      });
    } catch (err) {
      log?.warn?.(
        "COMPRESSION",
        "Compression pipeline error (non-fatal): " +
          (err instanceof Error ? err.message : String(err))
      );
    }
    // --- End Modular Compression Pipeline ---

    if (!promptCompressionEnabled) {
      log?.debug?.(
        "CONTEXT",
        "Skipping proactive context compression: Prompt Compression disabled"
      );
    }
    let contextLimit = getTokenLimit(provider, effectiveModel);

    if (isCombo && comboName) {
      log?.info?.("CONTEXT", `Attempting to resolve combo limits for comboName=${comboName}`);
      try {
        const { getComboByName } = await import("../../src/lib/localDb");
        const { parseModel } = await import("../services/model.ts");
        const { resolveComboTargets } = await import("../services/combo.ts");
        let comboConfig = await getComboByName(comboName);
        if (!comboConfig && comboName.startsWith("combo/")) {
          comboConfig = await getComboByName(comboName.substring(6));
        }
        let comboTargetLimits: number[] = [];
        if (comboConfig) {
          const allCombosData = await getCombosCached();
          const targets = resolveComboTargets(
            comboConfig as unknown as { name: string; models: unknown[] },
            allCombosData as unknown as { name: string; models: unknown[] }[]
          );
          comboTargetLimits = targets.map((t: { modelStr?: string }) => {
            const parsed = parseModel(t.modelStr);
            return getTokenLimit(parsed.provider, parsed.model);
          });
        }
        // chatCore executes per concrete target (handleSingleModel resolves
        // provider/effectiveModel before delegating). Compress against THIS
        // target's window; min(...allTargets) is only a defensive fallback —
        // the old unconditional min compressed a 1M-target request at the
        // smallest sibling's window ("agent keeps forgetting things").
        const resolved = resolveComboContextLimit({
          provider,
          model: effectiveModel,
          comboTargetLimits,
        });
        contextLimit = resolved.limit;
        log?.info?.(
          "CONTEXT",
          `Combo context limit: ${resolved.limit} (source=${resolved.source})`
        );
      } catch (err) {
        log?.warn?.("CONTEXT", "Failed to resolve combo limits for compression: " + err);
      }
    }

    const COMPRESSION_THRESHOLD = 0.7;
    let reservedTokens = 0;
    if (Array.isArray(body.tools)) {
      reservedTokens = estimateTokens(body.tools);
    }
    const threshold = Math.max(
      1,
      Math.floor((Math.max(1, contextLimit) - reservedTokens) * COMPRESSION_THRESHOLD)
    );

    log?.debug?.(
      "CONTEXT",
      `Checking compression: ${estimatedTokens} tokens vs ${threshold} threshold (${contextLimit} limit, ${reservedTokens} reserved)`
    );

    // Capture pre-compression body so translators can access original message
    // content even after compression alters it (e.g. stable Kiro conversationId).
    preCompressionBody = body;

    if (promptCompressionEnabled && estimatedTokens > threshold) {
      log?.info?.(
        "CONTEXT",
        `Proactive compression triggered: ${estimatedTokens} tokens > ${threshold} threshold (${contextLimit} limit)`
      );

      const compressionResult = compressContext(body, {
        provider,
        model: effectiveModel,
        maxTokens: threshold,
        reserveTokens: 0,
      });

      if (compressionResult.compressed) {
        body = compressionResult.body;
        const stats = compressionResult.stats;
        tokensCompressed = Math.max(0, (stats?.original ?? 0) - (stats?.final ?? 0));
        const layersInfo =
          stats && "layers" in stats && Array.isArray(stats.layers)
            ? ` (layers: ${stats.layers.map((l: { name: string }) => l.name).join(", ")})`
            : "";

        log?.info?.(
          "CONTEXT",
          `Context compressed: ${stats.original} → ${stats.final} tokens${layersInfo}`
        );

        logAuditEvent({
          action: "context.proactive_compression",
          actor: apiKeyInfo?.name || "system",
          target: connectionId || provider || "chat",
          details: {
            provider,
            model: effectiveModel,
            original_tokens: stats.original,
            final_tokens: stats.final,
            layers: "layers" in stats ? stats.layers : undefined,
          },
        });
      } else {
        log?.debug?.("CONTEXT", `Compression not applied: context already fits within target`);
      }
    }
  } else {
    log?.debug?.(
      "CONTEXT",
      `Skipping compression check: body=${!!body}, hasMessages=${Array.isArray(allMessages)}`
    );
  }

  let translatedBody = body;
  const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE;
  const isClaudeCodeCompatible = isClaudeCodeCompatibleProvider(provider);
  const isClaudeCodeSemanticPassthrough = isClaudeCodeSemanticPassthroughRequest({
    provider,
    sourceFormat,
    targetFormat,
    headers: clientRawRequest?.headers,
    userAgent,
  });
  const upstreamStream = stream || isClaudeCodeCompatible;
  let ccSessionId: string | null = null;
  const stripTypes = getStripTypesForProviderModel(provider || "", model || "");

  if (Array.isArray(translatedBody?.messages) && stripTypes.length > 0) {
    const stripResult = stripIncompatibleMessageContent(translatedBody.messages, stripTypes);
    if (stripResult.removedParts > 0) {
      translatedBody = {
        ...translatedBody,
        messages: stripResult.messages,
      };
      log?.warn?.(
        "CONTENT",
        `Stripped ${stripResult.removedParts} incompatible content part(s) for ${provider}/${model}`
      );
    }
  }

  // Determine if we should preserve client-side cache_control headers
  // Fetch settings from DB to get user preference
  const cacheControlMode = await getCacheControlSettings().catch(() => "auto" as const);
  const preserveCacheControl = shouldPreserveCacheControl({
    userAgent,
    isCombo,
    comboStrategy,
    targetProvider: provider,
    targetFormat,
    settings: { alwaysPreserveClientCache: cacheControlMode },
  });

  if (preserveCacheControl) {
    log?.debug?.(
      "CACHE",
      `Preserving client cache_control (client=${userAgent?.substring(0, 20)}, combo=${isCombo}, strategy=${comboStrategy}, provider=${provider})`
    );
  }

  // extractSystemMessagesToBody + normalizeClaudeUpstreamMessages extracted to
  // chatCore/claudeUpstreamMessages.ts (#3501); bind `log` once so the call sites stay byte-identical.
  const normalizeClaudeUpstreamMessages = (
    payload: Record<string, unknown>,
    options?: { preserveToolResultBlocks?: boolean }
  ) => normalizeClaudeUpstreamMessagesFor(payload, options, log);

  try {
    if (nativeCodexPassthrough) {
      translatedBody = { ...body, _nativeCodexPassthrough: true };
      log?.debug?.("FORMAT", "native codex passthrough enabled");
    } else if (isClaudeCodeCompatible) {
      let normalizedForCc = { ...body };

      // Claude Code-compatible providers expect Anthropic Messages-shaped payloads,
      // but we extract only role/text/max_tokens/effort from an OpenAI-like view first.
      if (sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough) {
        log?.debug?.("FORMAT", "claude-code semantic passthrough enabled for compatible bridge");
      } else if (sourceFormat !== FORMATS.OPENAI) {
        const normalizeToolCallId = getModelNormalizeToolCallId(
          provider || "",
          model || "",
          sourceFormat
        );
        const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
          provider || "",
          model || "",
          sourceFormat
        );
        normalizedForCc = translateRequest(
          sourceFormat,
          FORMATS.OPENAI,
          model,
          { ...body },
          stream,
          credentials,
          provider,
          reqLogger,
          {
            normalizeToolCallId,
            preserveDeveloperRole,
            preserveCacheControl,
            copilotClient: copilotCompatibleReasoning,
          }
        );
      }

      ccSessionId = resolveClaudeCodeCompatibleSessionId(clientRawRequest?.headers);
      translatedBody = buildClaudeCodeCompatibleRequest({
        sourceBody: body,
        normalizedBody: normalizedForCc,
        claudeBody: sourceFormat === FORMATS.CLAUDE ? body : null,
        model,
        stream: upstreamStream,
        sessionId: ccSessionId,
        cwd: process.cwd(),
        now: new Date(),
        preserveCacheControl,
        preserveClaudeMessages: sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough,
      });
      log?.debug?.("FORMAT", "claude-code-compatible bridge enabled");

      if (isClaudeCodeSemanticPassthrough) {
        // Semantic passthrough: only lift system/developer role messages
        // without converting file/document blocks, tool history, etc.
        extractSystemRoleMessages(translatedBody);
      } else {
        // Non-CC path: full normalization including content type conversion.
        normalizeClaudeUpstreamMessages(translatedBody, { preserveToolResultBlocks: true });
      }
    } else if (isClaudePassthrough) {
      // Pure passthrough: forward the body as-is without OpenAI round-trip.
      // The Claude→OpenAI→Claude double translation was lossy and corrupted
      // payloads at high context (150+ msgs, 100+ tools). Fix: #1359.
      // Claude Code sends well-formed Messages API payloads — trust them
      // regardless of combo strategy or cache_control settings.
      translatedBody = { ...body };
      translatedBody._disableToolPrefix = true;

      // Sanitize historical thinking-block signatures for Anthropic-native Claude OAuth.
      // Only Anthropic's first-party API validates these signatures (token-bound); third-party
      // Claude-shape providers do not. See redactPassthroughThinkingSignatures + issue #2454.
      if (provider === "claude") {
        translatedBody.messages = redactPassthroughThinkingSignatures(
          translatedBody.messages,
          DEFAULT_THINKING_CLAUDE_SIGNATURE
        ) as typeof translatedBody.messages;

        // Anthropic API rejects requests with both temperature and top_p.
        // VS Code Claude extension and similar clients send both; strip top_p.
        if (translatedBody.temperature !== undefined && translatedBody.top_p !== undefined) {
          delete translatedBody.top_p;
        }
      }

      // Fix #2468: always extract role:"system" → top-level system.
      // The semantic passthrough correctly skips the Claude→OpenAI→Claude
      // round-trip, but even pure Claude bodies may carry system content as
      // role:"system" messages rather than the top-level system field, which
      // Anthropic's Messages API now rejects with a 400.
      if (isClaudeCodeSemanticPassthrough) {
        // Only lift system/developer messages — preserves Claude Code's
        // native payload structure (documents, tool chains, thinking, etc.)
        extractSystemRoleMessages(translatedBody);
        if (Array.isArray(translatedBody.messages)) {
          translatedBody.messages = splitMisplacedToolResults(
            translatedBody.messages as ClaudeMessage[]
          ) as typeof translatedBody.messages;
        }
      } else {
        normalizeClaudeUpstreamMessages(translatedBody, { preserveToolResultBlocks: true });
      }

      log?.debug?.("FORMAT", `claude passthrough (preserveCache=${preserveCacheControl})`);

      // Migrate deprecated top-level `output_format` → `output_config.format`.
      // Anthropic returns a 400 on the legacy field; some clients (e.g. ForgeCode)
      // still emit it. Preserves an existing output_config.format if present.
      if (translatedBody.output_format !== undefined) {
        const oc =
          translatedBody.output_config && typeof translatedBody.output_config === "object"
            ? (translatedBody.output_config as Record<string, unknown>)
            : {};
        if (oc.format === undefined) oc.format = translatedBody.output_format;
        translatedBody.output_config = oc;
        delete translatedBody.output_format;
      }

      // Fix #1719: Strip output_config.format for non-Anthropic Claude-compatible providers.
      // Third-party Claude endpoints (MiniMax, DeepSeek via aggregators) reject this field
      // with 400 errors since they don't support Anthropic's structured output / json_schema.
      if (
        provider !== "claude" &&
        translatedBody.output_config &&
        typeof translatedBody.output_config === "object"
      ) {
        const oc = translatedBody.output_config as Record<string, unknown>;
        delete oc.format;
        if (Object.keys(oc).length === 0) {
          delete translatedBody.output_config;
        }
      }
    } else {
      translatedBody = { ...body };

      // Issue #199 + #618: Always disable tool name prefix in Claude passthrough.
      // The proxy_ prefix was designed for OpenAI→Claude translation to avoid
      // conflicts with Claude OAuth tools, but in the passthrough path the tools
      // are already in Claude format. Applying the prefix turns "Bash" into
      // "proxy_Bash", which Claude rejects ("No such tool available: proxy_Bash").
      if (targetFormat === FORMATS.CLAUDE) {
        translatedBody._disableToolPrefix = true;
        normalizeClaudeUpstreamMessages(translatedBody);
      }

      // OpenAI-compatible providers only support function tools.
      // Non-function tool types (computer, mcp, web_search, custom, etc.) are handled:
      //   - tools with a name → converted to function format in-place before translation
      //   - tools without a name AND without .function → dropped (unconvertible)
      // This must happen before translateRequest, which validates and throws on unknown types.
      if (provider?.startsWith("openai-compatible-") && Array.isArray(translatedBody.tools)) {
        const before = (translatedBody.tools as unknown[]).length;
        translatedBody.tools = (translatedBody.tools as Record<string, unknown>[])
          .filter((t) => !t.type || t.type === "function" || !!t.function || !!t.name)
          .map((t) => {
            if (!t.type || t.type === "function" || t.function) return t;
            // Named non-function tool: normalise to function format so the translator
            // does not throw on the unknown type.
            return {
              type: "function",
              function: {
                name: t.name,
                ...(t.description === undefined ? {} : { description: t.description }),
                ...(t.parameters !== undefined || t.input_schema !== undefined
                  ? { parameters: t.parameters ?? t.input_schema ?? {} }
                  : {}),
                ...(t.strict === undefined ? {} : { strict: t.strict }),
              },
            };
          });
        const dropped = before - (translatedBody.tools as unknown[]).length;
        if (dropped > 0) {
          log?.debug?.(
            "TOOLS",
            `Dropped ${dropped} unconvertible tool(s) for openai-compatible provider`
          );
        }
      }

      const normalizeToolCallId = getModelNormalizeToolCallId(
        provider || "",
        model || "",
        sourceFormat
      );
      const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
        provider || "",
        model || "",
        sourceFormat
      );
      translatedBody = translateRequest(
        sourceFormat,
        targetFormat,
        model,
        translatedBody,
        stream,
        credentials,
        provider,
        reqLogger,
        {
          normalizeToolCallId,
          preserveDeveloperRole,
          preserveCacheControl,
          signatureNamespace: connectionId,
          copilotClient: copilotCompatibleReasoning,
          ...(preCompressionBody ? { preCompressionBody } : {}),
        }
      );
    }
  } catch (error) {
    // ── Plugin onError hook ──
    try {
      const { runOnError } = await import("@/lib/plugins/hooks");
      await runOnError(
        { requestId: traceId, body, model, provider, apiKeyInfo, metadata: {} },
        error instanceof Error ? error : new Error(String(error))
      );
    } catch (pluginErr) {
      log?.debug?.(
        "PLUGIN",
        `onError hook error (non-fatal): ${pluginErr instanceof Error ? pluginErr.message : String(pluginErr)}`
      );
    }

    const parsedStatus = Number(error?.statusCode);
    const statusCode =
      Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
        ? parsedStatus
        : HTTP_STATUS.SERVER_ERROR;
    const message = error?.message || "Invalid request";
    const errorType = typeof error?.errorType === "string" ? error.errorType : null;

    log?.warn?.("TRANSLATE", `Request translation failed: ${message}`);

    if (errorType) {
      trackPendingRequest(model, provider, connectionId, false);
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
            },
          }
        ),
      };
    }

    trackPendingRequest(model, provider, connectionId, false);
    return createErrorResult(statusCode, message);
  }

  trace("post_translation");

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  const toolNameMap =
    translatedToolNameMap instanceof Map && translatedToolNameMap.size > 0
      ? translatedToolNameMap
      : nativeClaudeToolNameMap;
  delete translatedBody._toolNameMap;
  delete translatedBody._disableToolPrefix;

  // Update model in body — use resolved alias so the provider gets the correct model ID (#472)
  // Strip provider/alias prefix if it exactly matches the routing prefix so upstream receives the raw model name (#1261)
  let finalModelToUpstream = effectiveModel;
  // Defense-in-depth: only string-strip when effectiveModel is actually a string.
  // The API guards `model` via Zod (z.string()), but internal callers could pass a
  // non-string and a bare `.startsWith` would crash with `startsWith is not a
  // function` (same class as #2359 / #2463). Mirrors 9router's `?.startsWith?.()`.
  if (typeof finalModelToUpstream === "string") {
    if (finalModelToUpstream.startsWith(`${provider}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
    } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
    }
  }
  translatedBody.model = finalModelToUpstream;

  // #3554: a combo/route may substitute the upstream model AFTER the client chose its
  // `thinking` value. Claude Code sends `thinking:{type:"disabled"}` for internal calls,
  // which claude-fable-5 (adaptive-only) rejects with a 400. Drop the now-invalid value
  // when the resolved target model rejects it; models that accept `disabled` are untouched.
  if (typeof finalModelToUpstream === "string") {
    translatedBody = normalizeThinkingForModel(translatedBody, finalModelToUpstream);
    // Claude Opus 4.7+/Fable 5 removed manual extended thinking: `thinking.type:"enabled"`
    // or any `thinking.budget_tokens` is a hard 400. Collapse any manual thinking that
    // reached this point (passthrough legacy shape, reasoning_effort buckets, per-model
    // defaults) to `{type:"adaptive"}` — effort stays on `output_config.effort`. Keyed on
    // the resolved upstream model, so it covers every routing mode. See claudeAdaptiveThinking.ts.
    translatedBody = normalizeClaudeAdaptiveThinking(translatedBody, finalModelToUpstream);
    // Claude Haiku rejects `thinking.type:"adaptive"` and `output_config.effort`
    // (both Sonnet 4.6 / Opus 4.5+ only). Several paths can still emit those
    // shapes on a Haiku target — native passthrough, reasoning_effort buckets,
    // per-model defaults — so collapse them to a Haiku-valid shape here, after
    // model substitution. Mirrors upstream 9router 401d93bd5. See
    // services/claudeHaikuConstraints.ts.
    translatedBody = normalizeClaudeHaikuConstraints(translatedBody, finalModelToUpstream);
  }

  // Xiaomi MiMo controls reasoning ONLY via `thinking:{type:"enabled"|"disabled"}` and
  // rejects unknown/extra params with a strict "400 Param Incorrect". Map OmniRoute's
  // OpenAI reasoning signals onto that native shape: reduce any thinking object to
  // `{type}` and drop `reasoning_effort`/`reasoning`. See services/mimoThinking.ts.
  if (provider === "xiaomi-mimo") {
    translatedBody = normalizeMimoThinking(translatedBody);
  }

  const previousResponseIdPolicy = applyResponsesPreviousResponseIdPolicy(translatedBody, {
    mode: settings.responsesPreviousResponseIdMode,
    sourceFormat,
    targetFormat,
    credentials,
  });
  translatedBody = previousResponseIdPolicy.body as typeof translatedBody;

  // #1789: Prevent output_config.effort from overriding effort encoded in model name (Codex)
  if (provider === "codex" || provider?.startsWith("codex")) {
    const hasEffortSuffix = finalModelToUpstream.match(/-(low|medium|high|xhigh)$/i);
    if (
      hasEffortSuffix &&
      translatedBody.output_config &&
      typeof translatedBody.output_config === "object"
    ) {
      const oc = translatedBody.output_config as Record<string, unknown>;
      if (oc.effort) {
        log?.warn?.(
          "PARAMS",
          `Stripped output_config.effort="${oc.effort}" because model "${finalModelToUpstream}" already encodes effort`
        );
        delete oc.effort;
        if (Object.keys(oc).length === 0) {
          delete translatedBody.output_config;
        }
      }
    }
  }

  // Strip unsupported parameters for reasoning models (o1, o3, etc.)
  const unsupported = getUnsupportedParams(provider, model);
  if (unsupported.length > 0) {
    const stripped: string[] = [];
    for (const param of unsupported) {
      if (Object.hasOwn(translatedBody, param)) {
        stripped.push(param);
        delete translatedBody[param];
      }
    }
    if (stripped.length > 0) {
      log?.warn?.("PARAMS", `Stripped unsupported params for ${model}: ${stripped.join(", ")}`);
    }
  }

  // GPT-5 reasoning models (openai Chat Completions) reject temperature/top_p with a 400
  // whenever a reasoning effort is active, yet accept them under reasoning_effort=none (the
  // GPT-5.1+ default). A static unsupportedParams list can't express that, so strip sampling
  // conditionally here. The codex Responses path is already covered by the executor allowlist.
  translatedBody = stripGpt5SamplingWhenReasoning(
    translatedBody,
    provider,
    finalModelToUpstream,
    log
  );

  // Rename max_tokens to max_completion_tokens if not supported (#1961)
  if (!supportsMaxTokens({ provider, model })) {
    if (translatedBody.max_tokens !== undefined) {
      if (translatedBody.max_completion_tokens === undefined) {
        translatedBody.max_completion_tokens = translatedBody.max_tokens;
      }
      delete translatedBody.max_tokens;
      log?.debug?.("PARAMS", `Renamed max_tokens to max_completion_tokens for ${model}`);
    }
  }

  // OpenAI's `store` parameter is not supported by most compatible providers and breaks them
  if (provider !== "openai" && "store" in translatedBody) {
    delete translatedBody.store;
  }

  // Chat clients may send stream_options.include_usage, but OpenAI Responses
  // upstreams (including Azure AI Foundry /responses) reject stream_options.
  if (targetFormat === FORMATS.OPENAI_RESPONSES && "stream_options" in translatedBody) {
    delete translatedBody.stream_options;
  }

  // Provider-specific max_tokens caps (#711)
  // Some providers reject requests when max_tokens exceeds their API limit.
  // Cap before sending to avoid upstream HTTP 400 errors.
  const providerCap = PROVIDER_MAX_TOKENS[provider];
  if (providerCap) {
    for (const field of ["max_tokens", "max_completion_tokens"] as const) {
      if (typeof translatedBody[field] === "number" && translatedBody[field] > providerCap) {
        log?.debug?.(
          "PARAMS",
          `Capping ${field} from ${translatedBody[field]} to ${providerCap} for ${provider}`
        );
        translatedBody[field] = providerCap;
      }
    }
  }

  // Resolve executor with optional upstream proxy (CLIProxyAPI) routing.
  // mode="native" (default): returns the native executor unchanged.
  // mode="cliproxyapi": returns the CLIProxyAPI executor instead.
  // mode="fallback": returns a wrapper that tries native first, falls back to CLIProxyAPI on 5xx/network errors.

  const resolveExecutorWithProxy = (prov: string) => resolveExecutorWithProxyFor(prov, log);

  // === Quota Share enforcement PRE-hook (B/F7) ===
  // Runs after provider/model/credentials/apiKeyInfo are fully resolved,
  // before dispatcher. Fail-open per B16: errors → allow.
  let quotaSoftDeprioritize = false;
  if (apiKeyInfo?.id && credentials?.connectionId) {
    try {
      const { enforceQuotaShare } = await import("@/lib/quota/enforce");
      const decision = await enforceQuotaShare({
        apiKeyId: apiKeyInfo.id,
        connectionId: credentials.connectionId,
        provider: provider ?? "unknown",
        // Resolved model id (post background-redirect / alias) — the same scope the
        // router/log use. Operators configure per-(key,model) caps against THIS id.
        model: model || undefined,
        estimatedCost: {},
      }).catch((err: unknown) => {
        log?.warn?.(
          "QUOTA_SHARE",
          `enforceQuotaShare failed; fail-open: ${err instanceof Error ? err.message : String(err)}`
        );
        return { kind: "allow" as const };
      });

      if (decision.kind === "block") {
        const { buildErrorBody } = await import("../utils/error.ts");
        log?.warn?.(
          "QUOTA_SHARE",
          `[quotaShare] blocked apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}: ${decision.reason}`
        );
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (decision.retryAfterSeconds) {
          headers["Retry-After"] = String(decision.retryAfterSeconds);
        }
        return new Response(JSON.stringify(buildErrorBody(429, decision.reason)), {
          status: 429,
          headers,
        });
      }

      if (decision.kind === "allow" && decision.deprioritize) {
        quotaSoftDeprioritize = true;
        log?.info?.(
          "QUOTA_SHARE",
          `[quotaShare] soft deprioritize active for apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}`
        );
      }
    } catch (err) {
      // Outer fail-open guard — should not be reached (inner .catch covers it)
      log?.warn?.(
        "QUOTA_SHARE",
        `[quotaShare] enforceQuotaShare unexpected error; fail-open: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  // G2: Propagate soft penalty to the current candidate so combo scoring can deprioritize.
  if (quotaSoftDeprioritize && isCombo && comboStepId) {
    try {
      const { setCandidateQuotaSoftPenalty } = await import("../services/combo");
      setCandidateQuotaSoftPenalty(comboExecutionKey, comboStepId, true);
    } catch (err) {
      log?.warn?.(
        "QUOTA_SHARE",
        `[quotaShare] could not set soft penalty on candidate: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  // === /Quota Share enforcement PRE-hook ===

  // Get executor for this provider (with optional upstream proxy routing)
  const executor = await resolveExecutorWithProxy(provider);
  const getExecutionCredentials = () =>
    resolveExecutionCredentialsFor({
      credentials,
      nativeCodexPassthrough,
      endpointPath,
      targetFormat,
      provider,
      ccSessionId,
    });

  let onPipelineStreamError: streamFailure.PipelineStreamErrorHandler | null = null;

  // Create stream controller for disconnect detection
  const streamController = createStreamController({
    onDisconnect,
    onError: (event) => onPipelineStreamError?.(event),
    provider,
    model,
    connectionId,
    clientResponseFormat,
  });

  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}`, stream };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  const dedupHash = dedupEnabled ? computeRequestHash(dedupRequestBody) : null;

  const executeProviderRequest = async (modelToCall = effectiveModel, allowDedup = false) => {
    const execute = async () => {
      const executionCredentials = getExecutionCredentials();
      // Track execution credentials for key health recording (to capture selectedKeyId)
      let lastExecCreds = executionCredentials;
      const accountSemaphoreMaxConcurrency =
        resolveAccountSemaphoreMaxConcurrency(executionCredentials);
      const accountSemaphoreKey = resolveAccountSemaphoreKey({
        provider,
        model: modelToCall,
        connectionId,
        credentials: executionCredentials,
      });
      // Upstream body preparation extracted to chatCore/upstreamBody.ts (#3501 — first internal
      // sub-slice of executeProviderRequest); produces the body sent upstream (payload rules +
      // tool-limit truncation + qwen oauth user backfill + prompt_cache_key injection).
      let bodyToSend = await prepareUpstreamBody({
        translatedBody,
        modelToCall,
        provider,
        targetFormat,
        credentials,
        log,
      });

      updatePendingScope(pendingScope, {
        providerRequest: bodyToSend,
        stage: "payload_prepared",
      });

      trace("pre_semaphore", {
        semaphoreKey: accountSemaphoreKey,
        max: accountSemaphoreMaxConcurrency,
      });
      if (accountSemaphoreKey && accountSemaphoreMaxConcurrency != null) {
        updatePendingScope(pendingScope, {
          stage: "waiting_account_slot",
        });
      }
      const acquireAccountSemaphoreRelease =
        accountSemaphoreKey && accountSemaphoreMaxConcurrency != null
          ? await acquireAccountSemaphore(accountSemaphoreKey, {
              maxConcurrency: accountSemaphoreMaxConcurrency,
              signal: streamController.signal,
            })
          : () => {};
      trace("post_semaphore");
      updatePendingScope(pendingScope, {
        stage: "waiting_rate_limit",
      });

      try {
        trace("pre_rate_limit");
        const rawResult = await withRateLimit(
          provider,
          connectionId,
          modelToCall,
          async () => {
            trace("inside_rate_limit");
            updatePendingScope(pendingScope, {
              stage: "rate_limit_slot_acquired",
            });
            let attempts = 0;
            const isModelScopeForRequest = isModelScope();
            const maxAttempts = isModelScopeForRequest
              ? 3
              : provider === "qwen"
                ? 3
                : provider === "codex"
                  ? 3
                  : 1;

            // ── Codex 429 account-rotation state ─────────────────────────────────
            // Track excluded connection IDs for codex failover across attempts.
            const codexExcludedIds: string[] = [];
            // Derive session affinity key once for codex failover (used to clear affinity on 429).
            const codexSessionAffinityKey =
              provider === "codex"
                ? (extractSessionAffinityKey(body, clientRawRequest?.headers) ?? null)
                : null;

            while (attempts < maxAttempts) {
              trace("pre_executor", { attempt: attempts });
              updatePendingScope(pendingScope, {
                stage: "sending_to_provider",
              });
              const execCreds = getExecutionCredentials();
              const rawExecutorResult = await executeWithUpstreamStartTimeout({
                executor,
                provider,
                model: modelToCall,
                signal: streamController.signal,
                log,
                execute: (signal) =>
                  runWithCapture(providerRequestCapture, () =>
                    executor.execute({
                      model: modelToCall,
                      body: bodyToSend,
                      stream: upstreamStream,
                      credentials: execCreds,
                      signal,
                      log,
                      extendedContext,
                      upstreamExtraHeaders: buildUpstreamHeadersForExecute(modelToCall),
                      clientHeaders: buildExecutorClientHeaders(
                        clientRawRequest?.headers,
                        userAgent
                      ),
                      onCredentialsRefreshed,
                      skipUpstreamRetry,
                      contextEditing: { enabled: contextEditingEnabled },
                    })
                  ),
              });
              const res = normalizeExecutorResult(rawExecutorResult);
              trace("post_executor", { status: res?.response?.status });

              // Track Gemini RPM + RPD request counts for 429 classification
              if (provider === "gemini") {
                incrementRequestCount(modelToCall);
              }

              updatePendingScope(pendingScope, {
                stage: "provider_response_started",
              });

              if (res.response.status === 401 && execCreds?.connectionId) {
                recordKeyHealthStatus(401, execCreds);
              }

              // Qwen 429 strict quota backoff (wait 1.5s, 3s and retry)
              if (
                provider === "qwen" &&
                res.response.status === 429 &&
                attempts < maxAttempts - 1
              ) {
                const bodyPeek = await res.response
                  .clone()
                  .text()
                  .catch(() => "");
                if (bodyPeek.toLowerCase().includes("exceeded your current quota")) {
                  const delay = 1500 * (attempts + 1);
                  log?.warn?.("QWEN_RETRY", `Quota 429 hit. Retrying in ${delay}ms...`);
                  await new Promise((r) => setTimeout(r, delay));
                  attempts++;
                  continue;
                }
              }

              if (isModelScope() && res.response.status === 429 && attempts < maxAttempts - 1) {
                const bodyPeek = await res.response
                  .clone()
                  .text()
                  .catch(() => "");
                const normalizedHeaders = normalizeHeaders(res.response.headers);
                const decision = classifyModelScope429(bodyPeek, normalizedHeaders);
                if (decision.retryable) {
                  const delay = getModelScopeRetryDelayMs(normalizedHeaders, attempts);
                  log?.warn?.(
                    "MODELSCOPE_RETRY",
                    `429 ${decision.kind}; retrying in ${delay}ms (model remaining: ${decision.snapshot.modelRemaining ?? "unknown"})`
                  );
                  await new Promise((r) => setTimeout(r, delay));
                  attempts++;
                  continue;
                }
              }

              // Codex 429 account-rotation failover (disabled for context-relay so combo.ts can inject handoff)
              if (
                provider === "codex" &&
                comboStrategy !== "context-relay" &&
                res.response.status === 429 &&
                attempts < maxAttempts - 1
              ) {
                const failedConnectionId = credentials?.connectionId || connectionId;
                const normalizedHeaders = normalizeHeaders(res.response.headers);
                const retryAfterHeader = normalizedHeaders["retry-after"] ?? null;
                const retryAfterMs = retryAfterHeader
                  ? Number.parseFloat(retryAfterHeader) * 1000
                  : null;

                log?.warn?.(
                  "CODEX_FAILOVER",
                  `429 on connection ${String(failedConnectionId).slice(0, 8)} (attempt ${attempts + 1}/${maxAttempts}), rotating account`
                );

                // Mark only the current Codex model scope as rate-limited.
                if (failedConnectionId) {
                  await markCodexScopeRateLimited({
                    failedConnectionId: String(failedConnectionId),
                    model: modelToCall || model || requestedModel || null,
                    rateLimitedUntil: new Date(Date.now() + (retryAfterMs || 60_000)).toISOString(),
                    credentials,
                  });
                  if (!codexExcludedIds.includes(String(failedConnectionId))) {
                    codexExcludedIds.push(String(failedConnectionId));
                  }
                }

                // Clear session affinity so next request won't be pinned to the failing account
                if (codexSessionAffinityKey) {
                  try {
                    deleteSessionAccountAffinity(codexSessionAffinityKey, "codex");
                  } catch {
                    // best-effort
                  }
                }

                // Fetch next available codex connection (excluding all previously failed ones)
                const nextCreds = await getProviderCredentials(
                  "codex",
                  null,
                  null,
                  modelToCall || model || requestedModel || null,
                  {
                    excludeConnectionIds: [...codexExcludedIds],
                  }
                ).catch(() => null);

                if (!nextCreds || nextCreds.allRateLimited) {
                  log?.warn?.("CODEX_FAILOVER", "No more codex accounts available — returning 429");
                  return res;
                }

                const newConnectionId = nextCreds.connectionId;
                log?.info?.(
                  "CODEX_FAILOVER",
                  `Rotating codex account: ${String(failedConnectionId).slice(0, 8)} → ${newConnectionId.slice(0, 8)} (attempt ${attempts + 2}/${maxAttempts})`
                );

                logAuditEvent({
                  action: "codex.account_rotation",
                  actor: apiKeyInfo?.name || "system",
                  target: newConnectionId,
                  details: {
                    failed_connection_id: failedConnectionId,
                    new_connection_id: newConnectionId,
                    attempt: attempts + 1,
                    retry_after_ms: retryAfterMs,
                  },
                });

                // Update credentials in-place so getExecutionCredentials() picks up the new account
                Object.assign(credentials, nextCreds);

                attempts++;
                continue;
              }

              // For streaming: release the semaphore when the client drains or cancels the stream.
              if (stream) {
                const originalBody = res.response.body;
                if (!originalBody) {
                  acquireAccountSemaphoreRelease();
                  return res;
                }

                // Opt-in transparent stream recovery (free-claude-code port, default OFF).
                // Only engages for a successful (2xx) stream — an error body must never be
                // held or replayed. Setting is read once here from the cached resolved
                // resilience settings; the default path is byte-for-byte unchanged.
                const okStatus = res.response.status >= 200 && res.response.status < 300;
                let streamRecoveryEnabled = false;
                let continueMidStreamEnabled = false;
                if (okStatus) {
                  try {
                    // Reuse the request-consolidated settings read (see line ~2076) — no
                    // second DB/cache hit. Default OFF when the setting is absent.
                    const sr = resolveResilienceSettings(settings).streamRecovery;
                    streamRecoveryEnabled = sr.enabled;
                    continueMidStreamEnabled = sr.continueMidStream === true;
                  } catch {
                    streamRecoveryEnabled = false;
                    continueMidStreamEnabled = false;
                  }
                }

                let clientBody: ReadableStream<Uint8Array>;
                if (streamRecoveryEnabled) {
                  // Run the SAME upstream (same account/creds) with a given body and return
                  // its 2xx stream, or null. Used both by the early-retry re-open (same body)
                  // and the mid-stream continuation (assistant-prefilled body).
                  const runUpstreamStream = async (
                    body: unknown
                  ): Promise<ReadableStream<Uint8Array> | null> => {
                    try {
                      const retryRaw = await executeWithUpstreamStartTimeout({
                        executor,
                        provider,
                        model: modelToCall,
                        signal: streamController.signal,
                        log,
                        execute: (signal) =>
                          runWithCapture(providerRequestCapture, () =>
                            executor.execute({
                              model: modelToCall,
                              body,
                              stream: upstreamStream,
                              credentials: execCreds,
                              signal,
                              log,
                              extendedContext,
                              upstreamExtraHeaders: buildUpstreamHeadersForExecute(modelToCall),
                              clientHeaders: buildExecutorClientHeaders(
                                clientRawRequest?.headers,
                                userAgent
                              ),
                              onCredentialsRefreshed,
                              skipUpstreamRetry,
                              contextEditing: { enabled: contextEditingEnabled },
                            })
                          ),
                      });
                      const retryRes = normalizeExecutorResult(retryRaw);
                      const retryOk =
                        retryRes.response.status >= 200 && retryRes.response.status < 300;
                      if (retryOk && retryRes.response.body) {
                        return retryRes.response.body as ReadableStream<Uint8Array>;
                      }
                      await retryRes.response.body?.cancel().catch(() => {});
                      return null;
                    } catch {
                      return null;
                    }
                  };

                  // Mid-stream continuation (Fase 4.4): re-request with the partial text as an
                  // assistant prefill. Gated by its own setting and only for OpenAI-compatible
                  // bodies (makeContinuationBody returns null otherwise).
                  const continueStream = continueMidStreamEnabled
                    ? (assistantSoFar: string) => {
                        const continuationBody = makeContinuationBody(
                          bodyToSend as Record<string, unknown>,
                          assistantSoFar
                        );
                        return continuationBody
                          ? runUpstreamStream(continuationBody)
                          : Promise.resolve(null);
                      }
                    : undefined;

                  clientBody = createRecoverableStream(
                    originalBody as ReadableStream<Uint8Array>,
                    () => runUpstreamStream(bodyToSend),
                    {
                      finalize: acquireAccountSemaphoreRelease,
                      onRetry: (attempt, err) =>
                        log?.warn?.(
                          "STREAM_RECOVERY",
                          `transparent early-retry ${attempt}/${STREAM_RECOVERY.EARLY_RETRY_MAX} after ${
                            (err as { name?: string })?.name || "truncation"
                          }`
                        ),
                      continueStream,
                      onContinue: (attempt) =>
                        log?.warn?.(
                          "STREAM_RECOVERY",
                          `mid-stream continuation attempt ${attempt}/${STREAM_RECOVERY.EARLY_RETRY_MAX}`
                        ),
                    }
                  );
                } else {
                  clientBody = wrapReadableStreamWithFinalize(
                    originalBody,
                    acquireAccountSemaphoreRelease
                  );
                }

                return {
                  ...res,
                  _executionCredentials: execCreds,
                  response: new Response(clientBody, {
                    status: res.response.status,
                    statusText: res.response.statusText,
                    headers: res.response.headers,
                  }),
                  headers: res.response.headers,
                };
              }

              return {
                ...res,
                _executionCredentials: execCreds,
              };
            }
          },
          streamController.signal
        );

        if (stream) {
          return rawResult;
        }

        // Non-stream: release semaphore immediately after reading full response body.
        const status = rawResult.response.status;

        // Use execution credentials captured during request processing
        if (
          rawResult._executionCredentials?.connectionId &&
          rawResult._executionCredentials?.apiKey
        ) {
          recordKeyHealthStatus(status, rawResult._executionCredentials);
        }

        const statusText = rawResult.response.statusText;
        const headersObj = normalizeHeaders(rawResult.response.headers);
        const headers = new Headers(headersObj);
        stripStaleForwardingHeaders(headers);
        const contentType = (headers.get("content-type") || "").toLowerCase();
        const payload = await readNonStreamingResponseBody(
          rawResult.response,
          contentType,
          upstreamStream
        );
        acquireAccountSemaphoreRelease();

        return {
          ...rawResult,
          response: new Response(payload, { status, statusText, headers }),
          headers,
          _dedupSnapshot: {
            status,
            statusText,
            headers: (() => {
              const arr: [string, string][] = [];
              headers.forEach((v, k) => arr.push([k, v]));
              return arr;
            })(),
            payload,
          },
        };
      } catch (error) {
        acquireAccountSemaphoreRelease();
        throw error;
      }
    };

    if (allowDedup && dedupEnabled && dedupHash) {
      const dedupResult = await deduplicate(dedupHash, execute);
      if (dedupResult.wasDeduplicated) {
        log?.debug?.("DEDUP", `Joined in-flight request hash=${dedupHash}`);
      }
      return materializeDeduplicatedExecutionResult(dedupResult.result);
    }

    return execute();
  };

  const registeredProviderRequest =
    translatedBody && typeof translatedBody === "object" && !Array.isArray(translatedBody)
      ? {
          ...(translatedBody as Record<string, unknown>),
          model:
            typeof (translatedBody as Record<string, unknown>).model === "string"
              ? (translatedBody as Record<string, unknown>).model
              : effectiveModel,
          ...(!Array.isArray((translatedBody as Record<string, unknown>).messages) &&
          Array.isArray((body as Record<string, unknown>).messages)
            ? { messages: (body as Record<string, unknown>).messages }
            : {}),
        }
      : translatedBody;

  updatePendingScope(pendingScope, {
    providerRequest: registeredProviderRequest,
  });
  // T5: track which models we've tried for intra-family fallback
  const triedModels = new Set<string>([effectiveModel]);
  let currentModel = effectiveModel;

  // Log start
  appendRequestLog({ model, provider, connectionId, status: "PENDING" }).catch(() => {});

  const msgCount =
    translatedBody.messages?.length ||
    translatedBody.contents?.length ||
    translatedBody.request?.contents?.length ||
    (translatedBody.conversationState?.history?.length ?? 0) +
      (translatedBody.conversationState?.currentMessage ? 1 : 0) ||
    0;
  log?.debug?.("REQUEST", `${provider?.toUpperCase()} | ${model} | ${msgCount} msgs`);

  // ── Tier 2: Authoritative per-model/provider token-limit check (provider now resolved) ──
  if (apiKeyInfo?.id) {
    try {
      const tokenBreach = checkTokenLimits(
        apiKeyInfo.id,
        provider || undefined,
        model || undefined
      );
      if (tokenBreach) {
        const scopeLabel =
          tokenBreach.scopeType === "global"
            ? "account"
            : `${tokenBreach.scopeType} "${tokenBreach.scopeValue}"`;
        // FIX 6: clear the pending request marker before the early return so we do
        // not leak a phantom pending request (start was tracked at line ~1847).
        trackPendingRequest(model, provider, connectionId, false);
        // FIX 5: tag this as a per-API-key token-limit breach (errorCode
        // TOKEN_LIMIT_EXCEEDED) so the combo loop can distinguish it from an
        // upstream 429 and NOT cool shared accounts / retry it transiently.
        return createErrorResult(
          HTTP_STATUS.RATE_LIMITED,
          `Token limit exceeded for ${scopeLabel}: ${tokenBreach.tokensUsed}/${tokenBreach.limitValue} tokens used in the current window. Please try again later.`,
          null,
          "TOKEN_LIMIT_EXCEEDED"
        );
      }
    } catch (err) {
      // Fail-open at Tier 2: Tier 1 already enforced the model/global limit pre-dispatch.
      // A transient counter read error here must not break an otherwise-valid request.
      log?.warn?.("TOKEN_LIMIT", "Tier 2 token-limit check failed; allowing request", { err });
    }
  }

  // Execute request using executor (handles URL building, headers, fallback, transform)
  let providerResponse;
  let providerUrl;
  let providerHeaders;
  let finalBody;
  let claudePromptCacheLogMeta = null;

  try {
    const result = await executeProviderRequest(effectiveModel, true);

    providerResponse = result.response;
    providerUrl = result.url;
    providerHeaders = result.headers;
    finalBody = providerRequestCapture.body(result.transformedBody);
    effectiveServiceTier = resolveEffectiveServiceTier(finalBody);
    claudePromptCacheLogMeta = buildClaudePromptCacheLogMeta(
      targetFormat,
      finalBody,
      providerHeaders,
      clientRawRequest?.headers
    );

    // Log target request (final request to provider)
    reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
    updatePendingScope(pendingScope, {
      providerRequest: finalBody,
      providerUrl,
      stage: "provider_response_started",
    });
    // Update rate limiter from response headers (learn limits dynamically)
    updateFromHeaders(
      provider,
      connectionId,
      providerResponse.headers,
      providerResponse.status,
      model
    );

    // Store rate-limit headers for quota saturation signals
    try {
      const { storeRateLimitHeaders } = await import("@/lib/quota/saturationSignals");
      storeRateLimitHeaders(
        connectionId,
        provider,
        providerResponse.headers as Record<string, string>
      );
    } catch {
      // fail-open: saturation signal is best-effort
    }
  } catch (error) {
    trackPendingRequest(model, provider, connectionId, false);
    if (isSemaphoreCapacityError(error)) {
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${error.code}`,
      }).catch(() => {});
      const failureMessage = error.message || "Semaphore timeout";
      persistAttemptLogs({
        status: HTTP_STATUS.RATE_LIMITED,
        error: failureMessage,
        providerRequest: finalBody || translatedBody,
        clientResponse: buildErrorBody(HTTP_STATUS.RATE_LIMITED, failureMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.RATE_LIMITED, error.code);
      const result = stream
        ? createStreamingErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage, error.code)
        : createErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage);
      return {
        ...result,
        errorType: "account_semaphore_capacity",
        errorCode: error.code,
      };
    }
    const failureStatus =
      error.name === "AbortError"
        ? 499
        : error.name === "TimeoutError" || error.name === "BodyTimeoutError"
          ? HTTP_STATUS.GATEWAY_TIMEOUT
          : error.status && typeof error.status === "number"
            ? error.status
            : HTTP_STATUS.BAD_GATEWAY;
    const failureMessage =
      error.name === "AbortError"
        ? "Request aborted"
        : formatProviderError(error, provider, model, failureStatus);
    const upstreamErrorCode = getUpstreamErrorIdentifier(error);
    const upstreamErrorType =
      upstreamErrorCode === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE
        ? "upstream_timeout"
        : failureStatus === 401
          ? "authentication_error"
          : undefined;
    appendRequestLog({
      model,
      provider,
      connectionId,
      status: `FAILED ${failureStatus}`,
    }).catch(() => {});
    persistAttemptLogs({
      status: failureStatus,
      error: failureMessage,
      providerRequest: finalBody || translatedBody,
      clientResponse: buildErrorBody(failureStatus, failureMessage),
      claudeCacheMeta: claudePromptCacheLogMeta,
      cacheSource: "upstream",
    });
    if (error.name === "AbortError") {
      streamController.handleError(error);
      return createErrorResult(499, "Request aborted");
    }
    persistFailureUsage(
      failureStatus,
      upstreamErrorCode || (error instanceof Error && error.name ? error.name : "upstream_error")
    );
    console.log(`${COLORS.red}[ERROR] ${failureMessage}${COLORS.reset}`);
    if (stream && upstreamErrorCode) {
      const result = createStreamingErrorResult(
        failureStatus,
        failureMessage,
        upstreamErrorCode,
        upstreamErrorType
      );
      return {
        ...result,
        errorType: upstreamErrorType,
        errorCode: upstreamErrorCode,
      };
    }
    return createErrorResult(
      failureStatus,
      failureMessage,
      null,
      upstreamErrorCode,
      upstreamErrorType
    );
  }
  // We need to peek at the error text if it's 400 for Qwen
  let upstreamErrorParsed = false;
  let parsedStatusCode = providerResponse.status;
  let parsedMessage = "";
  let parsedRetryAfterMs: number | null = null;
  let upstreamErrorBody: unknown = null;

  if (provider === "qwen" && providerResponse.status === HTTP_STATUS.BAD_REQUEST) {
    const errorDetails = await parseUpstreamError(providerResponse, provider);
    parsedStatusCode = errorDetails.statusCode;
    parsedMessage = errorDetails.message;
    parsedRetryAfterMs = errorDetails.retryAfterMs;
    upstreamErrorBody = errorDetails.responseBody;
    upstreamErrorParsed = true;
  }

  const errorMessageForToolDetection =
    typeof upstreamErrorBody === "string"
      ? upstreamErrorBody
      : JSON.stringify(upstreamErrorBody ?? {});
  if (shouldDetectLimit(errorMessageForToolDetection, parsedStatusCode)) {
    const detectedLimit = parseToolLimitFromError(errorMessageForToolDetection);
    if (detectedLimit) {
      setDetectedToolLimit(provider, detectedLimit);
      log?.info?.("TOOL_LIMIT", `Detected tool limit ${detectedLimit} for ${provider}`);
    }
  }

  const isQwenExpiredError =
    provider === "qwen" &&
    parsedStatusCode === HTTP_STATUS.BAD_REQUEST &&
    parsedMessage?.toLowerCase().includes("session has expired");

  // Track whether stream_options was present and stripped — if so, 401/403 after
  // that may be from the modification rather than a genuine auth failure, so we
  // skip the credential refresh attempt in that case.
  const hadStreamOptions =
    targetFormat === FORMATS.OPENAI_RESPONSES && "stream_options" in translatedBody;
  if (hadStreamOptions) {
    delete translatedBody.stream_options;
  }

  // Handle 401/403 (and Qwen explicit expiration) - try token refresh using executor
  if (
    (providerResponse.status === HTTP_STATUS.UNAUTHORIZED ||
      providerResponse.status === HTTP_STATUS.FORBIDDEN ||
      isQwenExpiredError) &&
    !hadStreamOptions // Skip refresh if failure may be from stream_options removal, not auth
  ) {
    // Fix A: wrap refreshCredentials in runWithOnPersist so the persist callback
    // executes INSIDE the per-connection mutex held by getAccessToken. This makes
    // [network refresh + DB write + outer-state mutation] one atomic step and
    // prevents concurrent requests from reading a stale refreshToken before the
    // DB has been updated (refresh_token_reused on Codex/OpenAI).
    //
    // Not every executor routes refresh through getAccessToken (e.g. github.ts
    // calls refreshCopilotToken directly). When the persistFn doesn't fire from
    // inside getAccessToken, we still need to do the credentials mutation + user
    // callback after refreshCredentials returns. The `persistFnRan` flag tracks
    // which path executed so we don't double-fire (race-prone) or skip (regression).
    // Front 3: remember the refresh_token we are about to present so that, if the
    // refresh fails as unrecoverable, we can tell a genuine death apart from a
    // stale-token reuse that a concurrent/sibling refresh already rotated past.
    const attemptedRefreshToken =
      typeof credentials?.refreshToken === "string" ? credentials.refreshToken : null;
    let persistFnRan = false;
    const persistFn = onCredentialsRefreshed
      ? async (refreshResult: Record<string, unknown>) => {
          persistFnRan = true;
          // Mutate the shared credentials object so subsequent executor calls
          // in this request see the new tokens. Runs INSIDE the mutex.
          Object.assign(credentials, refreshResult);
          await onCredentialsRefreshed(refreshResult);
        }
      : undefined;

    const newCredentials = (await refreshWithRetry(
      () => runWithOnPersist(persistFn, () => executor.refreshCredentials(credentials, log)),
      3,
      log,
      provider // Explicitly pass the provider to avoid universally tripping the "unknown" circuit breaker
    )) as null | {
      accessToken?: string;
      copilotToken?: string;
    };

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider?.toUpperCase()} | refreshed`);

      // Fall back to post-mutex mutation only for executors that don't route
      // through getAccessToken (and therefore never fire onPersist). For
      // executors that DO route through it (Codex, Claude, Gemini, etc.) the
      // mutation already happened atomically inside the mutex.
      if (!persistFnRan) {
        Object.assign(credentials, newCredentials);
        if (onCredentialsRefreshed) {
          await onCredentialsRefreshed(newCredentials);
        }
      }

      // Retry with new credentials — model + extra headers follow translatedBody.model so they
      // stay aligned if this block ever runs after a path that mutates body.model (e.g. fallback).
      try {
        const retryModelId = String(translatedBody.model || effectiveModel);
        const retryResult = await runWithCapture(providerRequestCapture, () =>
          executor.execute({
            model: retryModelId,
            body: translatedBody,
            stream: upstreamStream,
            credentials: getExecutionCredentials(),
            signal: streamController.signal,
            log,
            extendedContext,
            upstreamExtraHeaders: buildUpstreamHeadersForExecute(retryModelId),
            clientHeaders: buildExecutorClientHeaders(clientRawRequest?.headers, userAgent),
            onCredentialsRefreshed,
            skipUpstreamRetry: isCombo,
            contextEditing: { enabled: contextEditingEnabled },
          })
        );

        if (retryResult.response.ok) {
          providerResponse = retryResult.response;
          providerUrl = retryResult.url;
          providerHeaders = new Headers(retryResult.headers || {});
          finalBody = providerRequestCapture.body(retryResult.transformedBody);
          reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
          updatePendingScope(pendingScope, {
            providerRequest: finalBody,
            providerUrl,
            stage: "provider_response_started",
          });
          upstreamErrorParsed = false; // Reset since new response is OK
        } else {
          providerResponse = retryResult.response;
          upstreamErrorParsed = false; // Let it be parsed downstream
        }
      } catch (retryErr) {
        // Refresh succeeded but the retry leg failed (network blip, AbortError,
        // executor throw). Don't swallow — the operator-visible signal "the user
        // saw 401 even though auth was actually fixed" is much more confusing
        // than the original 401 alone. Surface at error level with sanitization.
        log?.error?.(
          "TOKEN",
          `${provider?.toUpperCase()} | retry after refresh failed: ${sanitizeErrorMessage(retryErr)}`
        );
      }
    } else {
      log?.warn?.("TOKEN", `${provider?.toUpperCase()} | refresh failed`);
      if (isUnrecoverableRefreshError(newCredentials) && onCredentialsRefreshed) {
        // Front 3 (reuse-race tolerance): before deactivating, re-read the DB.
        // If a sibling/concurrent refresh already rotated this connection's
        // refresh_token (common for Codex/OpenAI under one shared Auth0 client),
        // the failure we saw was a stale-token reuse — the account is healthy
        // with the newer token, so keep it active instead of killing it.
        let alreadyRotated = false;
        if (typeof connectionId === "string" && connectionId && attemptedRefreshToken) {
          try {
            const latest = await getProviderConnectionById(connectionId);
            if (wasRefreshTokenRotated(attemptedRefreshToken, latest?.refreshToken)) {
              alreadyRotated = true;
              log?.warn?.(
                "TOKEN",
                `${provider.toUpperCase()} | refresh_token already rotated by a concurrent refresh — keeping connection active`
              );
            }
          } catch {
            // DB read failed — fall through to the safe default (deactivate).
          }
        }
        if (!alreadyRotated) {
          await onCredentialsRefreshed({ testStatus: "expired", isActive: false });
        }
      }
    }
  }

  await persistCodexQuotaState(normalizeHeaders(providerResponse.headers), providerResponse.status);

  // Check provider response - return error info for fallback handling
  if (!providerResponse.ok) {
    trackPendingRequest(model, provider, connectionId, false);

    let statusCode = providerResponse.status;
    let message = "";
    let retryAfterMs: number | null = null;
    let upstreamErrorCode: string | undefined;
    let upstreamErrorType: string | undefined;

    if (upstreamErrorParsed) {
      statusCode = parsedStatusCode;
      message = parsedMessage;
      retryAfterMs = parsedRetryAfterMs;
    } else {
      const details = await parseUpstreamError(providerResponse, provider);
      statusCode = details.statusCode;
      message = details.message;
      retryAfterMs = details.retryAfterMs;
      upstreamErrorBody = details.responseBody;
      upstreamErrorCode = details.errorCode as string | undefined;
      upstreamErrorType = details.errorType as string | undefined;
    }

    // T06/T10/T36: classify provider errors and persist terminal account states.
    let errorType = classifyProviderError(statusCode, message, provider);
    if (statusCode === 429 && isModelScope()) {
      const decision = classifyModelScope429(message, normalizeHeaders(providerResponse.headers));
      errorType =
        decision.kind === "quota_exhausted"
          ? PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
          : PROVIDER_ERROR_TYPES.RATE_LIMITED;
      log?.warn?.(
        "MODELSCOPE_429",
        `${decision.kind} (model remaining: ${decision.snapshot.modelRemaining ?? "unknown"}, total remaining: ${decision.snapshot.totalRemaining ?? "unknown"})`
      );
    }
    if (connectionId && errorType) {
      try {
        if (errorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
          await updateProviderConnection(connectionId, {
            isActive: false,
            testStatus: "banned",
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} banned (${statusCode}) — disabling permanently`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
          // Plan A: if connection has extra API keys, don't disable — only the failing key is affected.
          // Single-key connections still get disabled as before.
          if (
            connectionHasExtraKeys(
              connectionId,
              (credentials?.providerSpecificData as Record<string, unknown> | undefined)
                ?.extraApiKeys as string[] | undefined
            )
          ) {
            await updateProviderConnection(connectionId, {
              lastErrorType: errorType,
              lastError: message,
              errorCode: statusCode,
            });
            console.warn(
              `[provider] Node ${connectionId} account deactivated (${statusCode}) — has extra keys, keeping connection active`
            );
          } else {
            await updateProviderConnection(connectionId, {
              isActive: false,
              testStatus: "deactivated",
              lastErrorType: errorType,
              lastError: message,
              errorCode: statusCode,
            });
            console.warn(
              `[provider] Node ${connectionId} account deactivated (${statusCode}) — disabling permanently`
            );
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED) {
          // Providers with per-model quotas — lock the model only, not the connection
          const quotaCooldownMs = retryAfterMs || COOLDOWN_MS.rateLimit;
          const accountSemaphoreKey = resolveAccountSemaphoreKey({
            provider,
            model: currentModel,
            connectionId,
            credentials,
          });
          if (accountSemaphoreKey) {
            markAccountSemaphoreBlocked(accountSemaphoreKey, quotaCooldownMs);
          }
          if (isModelScope() && connectionId) {
            lockModel(provider, connectionId, model, "quota_exhausted", quotaCooldownMs);
            console.warn(
              `[provider] Node ${connectionId} ModelScope model quota exhausted (${statusCode}) for ${model} - ${Math.ceil(quotaCooldownMs / 1000)}s (connection stays active)`
            );
          } else if (
            lockModelIfPerModelQuota(
              provider,
              connectionId,
              model,
              "quota_exhausted",
              quotaCooldownMs
            )
          ) {
            console.warn(
              `[provider] Node ${connectionId} model-only quota exhausted (${statusCode}) for ${model} - ${Math.ceil(quotaCooldownMs / 1000)}s (connection stays active)`
            );
          } else {
            await updateProviderConnection(connectionId, {
              testStatus: "credits_exhausted",
              lastErrorType: errorType,
              lastError: message,
              errorCode: statusCode,
            });
            console.warn(`[provider] Node ${connectionId} exhausted quota (${statusCode})`);
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
          await updateProviderConnection(connectionId, {
            isActive: false,
            testStatus: "expired",
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} account deactivated (${statusCode}) — marked expired`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED) {
          // Normal 401 (token/session auth issue): keep account active for refresh/re-auth.
          await updateProviderConnection(connectionId, {
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
        } else if (errorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN) {
          // OAuth 401 with invalid credentials - token refresh can recover
          await updateProviderConnection(connectionId, {
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} OAuth token invalid (${statusCode}) — token refresh available`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR) {
          // Cloud Code 403 with stale project: not a ban, keep account active.
          await updateProviderConnection(connectionId, {
            lastErrorType: errorType,
            lastError: message,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${connectionId} project routing error (${statusCode}) — not banning`
          );
        }
      } catch {
        // Best-effort state update; request flow should continue with fallback handling.
      }
    }

    appendRequestLog({ model, provider, connectionId, status: `FAILED ${statusCode}` }).catch(
      () => {}
    );

    const errMsg = formatProviderError(new Error(message), provider, model, statusCode);
    console.log(`${COLORS.red}[ERROR] ${errMsg}${COLORS.reset}`);

    // Log Antigravity retry time if available
    if (retryAfterMs && provider === "antigravity") {
      const retrySeconds = Math.ceil(retryAfterMs / 1000);
      log?.debug?.("RETRY", `Antigravity quota reset in ${retrySeconds}s (${retryAfterMs}ms)`);
    }

    // Log error with full request body for debugging
    reqLogger.logError(new Error(message), finalBody || translatedBody);
    reqLogger.logProviderResponse(
      providerResponse.status,
      providerResponse.statusText,
      providerResponse.headers,
      upstreamErrorBody
    );

    // Update rate limiter from error response headers
    updateFromHeaders(provider, connectionId, providerResponse.headers, statusCode, model);
    if (connectionId && upstreamErrorBody !== null && upstreamErrorBody !== undefined) {
      updateFromResponseBody(provider, connectionId, upstreamErrorBody, statusCode, model);
    }

    // ── T5: Intra-family model fallback ──────────────────────────────────────
    // Before returning a model-unavailable error upstream, try sibling models
    // from the same family. This keeps the request alive on the same account
    // instead of failing the entire combo.
    if (isModelUnavailableError(statusCode, message)) {
      const nextModel = getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("MODEL_FALLBACK", `${model} unavailable (${statusCode}) → trying ${nextModel}`);
        // Re-execute with the fallback model
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = providerRequestCapture.body(fallbackResult.transformedBody);
            reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
            updatePendingScope(pendingScope, {
              providerRequest: finalBody,
              providerUrl,
              stage: "provider_response_started",
            });
            // Continue processing with the fallback response — skip error return
            log?.info?.("MODEL_FALLBACK", `Serving ${nextModel} as fallback for ${model}`);
            // Jump to streaming/non-streaming handling below
            // We fall through by NOT returning here
          } else {
            // Fallback also failed — return original error
            persistAttemptLogs({
              status: statusCode,
              error: errMsg,
              providerRequest: finalBody || translatedBody,
              providerResponse: upstreamErrorBody,
              clientResponse: buildErrorBody(statusCode, errMsg),
              cacheSource: "upstream",
            });
            persistFailureUsage(statusCode, "model_unavailable");
            return createErrorResult(
              statusCode,
              errMsg,
              retryAfterMs,
              upstreamErrorCode,
              upstreamErrorType,
              upstreamErrorBody
            );
          }
        } catch {
          persistAttemptLogs({
            status: statusCode,
            error: errMsg,
            providerRequest: finalBody || translatedBody,
            providerResponse: upstreamErrorBody,
            clientResponse: buildErrorBody(statusCode, errMsg),
            cacheSource: "upstream",
          });
          persistFailureUsage(statusCode, "model_unavailable");
          return createErrorResult(
            statusCode,
            errMsg,
            retryAfterMs,
            upstreamErrorCode,
            upstreamErrorType,
            upstreamErrorBody
          );
        }
      } else {
        persistAttemptLogs({
          status: statusCode,
          error: errMsg,
          providerRequest: finalBody || translatedBody,
          providerResponse: upstreamErrorBody,
          clientResponse: buildErrorBody(statusCode, errMsg),
          cacheSource: "upstream",
        });
        persistFailureUsage(statusCode, "model_unavailable");
        return createErrorResult(
          statusCode,
          errMsg,
          retryAfterMs,
          upstreamErrorCode,
          upstreamErrorType,
          upstreamErrorBody
        );
      }
    } else if (isContextOverflowError(statusCode, message)) {
      const familyCandidates = getModelFamily(currentModel).filter(
        (m) => m !== currentModel && !triedModels.has(m)
      );
      const nextModel =
        findLargerContextModel(currentModel, familyCandidates) ??
        getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.("CONTEXT_OVERFLOW_FALLBACK", `${model} context overflow → trying ${nextModel}`);
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            providerResponse = fallbackResult.response;
            providerUrl = fallbackResult.url;
            providerHeaders = fallbackResult.headers;
            finalBody = providerRequestCapture.body(fallbackResult.transformedBody);
            reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
            updatePendingScope(pendingScope, {
              providerRequest: finalBody,
              providerUrl,
              stage: "provider_response_started",
            });
            log?.info?.(
              "CONTEXT_OVERFLOW_FALLBACK",
              `Serving ${nextModel} as fallback for ${model}`
            );
          } else {
            persistAttemptLogs({
              status: statusCode,
              error: errMsg,
              providerRequest: finalBody || translatedBody,
              providerResponse: upstreamErrorBody,
              clientResponse: buildErrorBody(statusCode, errMsg),
              cacheSource: "upstream",
            });
            persistFailureUsage(statusCode, "context_overflow");
            return createErrorResult(
              statusCode,
              errMsg,
              retryAfterMs,
              upstreamErrorCode,
              upstreamErrorType,
              upstreamErrorBody
            );
          }
        } catch {
          persistAttemptLogs({
            status: statusCode,
            error: errMsg,
            providerRequest: finalBody || translatedBody,
            providerResponse: upstreamErrorBody,
            clientResponse: buildErrorBody(statusCode, errMsg),
            cacheSource: "upstream",
          });
          persistFailureUsage(statusCode, "context_overflow");
          return createErrorResult(
            statusCode,
            errMsg,
            retryAfterMs,
            upstreamErrorCode,
            upstreamErrorType,
            upstreamErrorBody
          );
        }
      } else {
        persistAttemptLogs({
          status: statusCode,
          error: errMsg,
          providerRequest: finalBody || translatedBody,
          providerResponse: upstreamErrorBody,
          clientResponse: buildErrorBody(statusCode, errMsg),
          cacheSource: "upstream",
        });
        persistFailureUsage(statusCode, "context_overflow");
        return createErrorResult(
          statusCode,
          errMsg,
          retryAfterMs,
          upstreamErrorCode,
          upstreamErrorType,
          upstreamErrorBody
        );
      }
    } else {
      persistAttemptLogs({
        status: statusCode,
        error: errMsg,
        providerRequest: finalBody || translatedBody,
        providerResponse: upstreamErrorBody,
        clientResponse: buildErrorBody(statusCode, errMsg),
        cacheSource: "upstream",
      });
      persistFailureUsage(statusCode, `upstream_${statusCode}`);

      // Emergency budget fallback is orchestrated exclusively by the routing layer
      // (src/sse/handlers/chat.ts), which resolves credentials FOR the emergency
      // provider through account selection. The executor-level hop that used to
      // live here re-sent the FAILING provider's credentials to the emergency
      // provider's endpoint (e.g. the OpenAI API key to integrate.api.nvidia.com)
      // — a cross-provider credential leak that also never succeeded upstream.
      return createErrorResult(
        statusCode,
        errMsg,
        retryAfterMs,
        upstreamErrorCode,
        upstreamErrorType,
        upstreamErrorBody
      );
    }
    // ── End T5 ───────────────────────────────────────────────────────────────
  }

  // Non-streaming response
  if (!stream) {
    const parsed = await parseNonStreamingResponseBody({
      providerResponse,
      upstreamStream,
      providerHeaders,
      finalBody,
      targetFormat,
      model,
      log,
    });
    const normalizedProviderPayload = parsed.normalizedProviderPayload;
    const looksLikeSSE = parsed.looksLikeSSE;

    if (parsed.kind === "invalid_sse") {
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
      }).catch(() => {});
      const invalidSseMessage = parsed.message;
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_GATEWAY,
        error: invalidSseMessage,
        providerRequest: finalBody || translatedBody,
        providerResponse: normalizedProviderPayload,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_GATEWAY, invalidSseMessage),
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "invalid_sse_payload");
      trackPendingRequest(model, provider, pendingConnId, false);
      return createErrorResult(HTTP_STATUS.BAD_GATEWAY, invalidSseMessage);
    }

    if (parsed.kind === "invalid_json") {
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
      }).catch(() => {});
      const detailedError = parsed.detailedError;
      const invalidJsonMessage = parsed.message;
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_GATEWAY,
        error: detailedError,
        providerRequest: finalBody || translatedBody,
        providerResponse: normalizedProviderPayload,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_GATEWAY, invalidJsonMessage),
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "invalid_json_payload");
      trackPendingRequest(model, provider, connectionId, false);
      return createErrorResult(HTTP_STATUS.BAD_GATEWAY, invalidJsonMessage);
    }

    let responseBody = parsed.responseBody;
    let responsePayloadFormat = parsed.responsePayloadFormat;

    // Check for empty content response (fake success) - trigger fallback
    if (isEmptyContentResponse(responseBody)) {
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
      }).catch(() => {});
      const emptyContentMessage = "Provider returned empty content";
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_GATEWAY,
        error: emptyContentMessage,
        providerRequest: finalBody || translatedBody,
        providerResponse: normalizedProviderPayload,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage),
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "empty_content");

      // Trigger non-recursive fallback for empty content
      const nextModel = getNextFamilyFallback(currentModel, triedModels);
      if (nextModel) {
        triedModels.add(nextModel);
        currentModel = nextModel;
        translatedBody.model = nextModel;
        log?.info?.(
          "EMPTY_CONTENT_FALLBACK",
          `${model} returned empty content → trying ${nextModel}`
        );
        try {
          const fallbackResult = await executeProviderRequest(nextModel, false);
          if (fallbackResult.response.ok) {
            const fallbackRaw = await withBodyTimeout<string>(fallbackResult.response.text());
            try {
              responseBody = fallbackRaw ? JSON.parse(fallbackRaw) : {};
              providerUrl = fallbackResult.url;
              providerHeaders = fallbackResult.headers;
              finalBody = providerRequestCapture.body(fallbackResult.transformedBody);
              reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
              log?.info?.(
                "EMPTY_CONTENT_FALLBACK",
                `Serving ${nextModel} as fallback for ${model}`
              );
              // Fall through — continue processing with the new responseBody
            } catch {
              trackPendingRequest(model, provider, connectionId, false);
              return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
            }
          } else {
            trackPendingRequest(model, provider, connectionId, false);
            return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
          }
        } catch {
          trackPendingRequest(model, provider, connectionId, false);
          return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
        }
      } else {
        trackPendingRequest(model, provider, connectionId, false);
        return createErrorResult(HTTP_STATUS.BAD_GATEWAY, emptyContentMessage);
      }
    }

    const responseToolNameMap = mergeResponseToolNameMap(
      toolNameMap,
      (finalBody as Record<string, unknown> | null | undefined) ?? null
    );

    if (sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE) {
      responseBody = restoreClaudePassthroughToolNames(responseBody, responseToolNameMap);
    }
    reqLogger.logProviderResponse(
      providerResponse.status,
      providerResponse.statusText,
      providerResponse.headers,
      looksLikeSSE
        ? {
            _streamed: true,
            _format: "sse-json",
            summary: responseBody,
          }
        : responseBody
    );
    effectiveServiceTier = resolveReportedServiceTier(responseBody) ?? effectiveServiceTier;

    // Notify success - caller can clear error status if needed
    if (onRequestSuccess) {
      await onRequestSuccess();
    }
    await maybeSyncClaudeExtraUsageState({
      provider,
      connectionId,
      providerSpecificData: credentials?.providerSpecificData,
      log,
    });

    // Log usage for non-streaming responses
    const usage = extractUsageFromResponse(responseBody, provider);
    if (usage && typeof usage === "object") {
      attachCompressionUsageReceiptAfterAnalytics(usage as Record<string, unknown>, "provider");
    }

    // Context Editing telemetry: when the delegated server-side clear actually ran,
    // record the provider's cleared-token receipt under engine "context-editing" so
    // it surfaces in compression analytics. Best-effort, Claude-only, non-streaming.
    recordContextEditingTelemetryHook({
      contextEditingEnabled,
      provider,
      responseBody,
      skillRequestId,
      log,
    });
    appendRequestLog({ model, provider, connectionId, tokens: usage, status: "200 OK" }).catch(
      () => {}
    );

    // Save structured call log with full payloads
    const cacheUsageLogMeta = buildCacheUsageLogMeta(usage);
    recordNonStreamingUsageStats(usage, {
      traceEnabled,
      provider,
      connectionId,
      model,
      startTime,
      apiKeyInfo,
      effectiveServiceTier,
      isCombo,
      comboStrategy,
      endpoint: endpointPath,
    });

    // Translate response to client's expected format (usually OpenAI)
    // Pass toolNameMap so Claude OAuth proxy_ prefix is stripped in tool_use blocks (#605)
    let translatedResponse = needsTranslation(responsePayloadFormat, clientResponseFormat)
      ? translateNonStreamingResponse(
          responseBody,
          responsePayloadFormat,
          clientResponseFormat,
          responseToolNameMap
        )
      : responseBody;
    const memoryExtractionResponse = translatedResponse;

    // T26: Strip markdown code blocks if provider format is Claude
    if (sourceFormat === "claude" && !stream) {
      if (typeof translatedResponse?.choices?.[0]?.message?.content === "string") {
        translatedResponse.choices[0].message.content = stripMarkdownCodeFence(
          translatedResponse.choices[0].message.content
        ) as string;
      }
    }

    // T18: Normalize finish_reason to 'tool_calls' if tool calls are present
    if (translatedResponse?.choices) {
      for (const choice of translatedResponse.choices) {
        if (
          choice.message?.tool_calls &&
          choice.message.tool_calls.length > 0 &&
          choice.finish_reason !== "tool_calls"
        ) {
          choice.finish_reason = "tool_calls";
        }
      }
    }

    // Reasoning Replay Cache (#1628): Capture reasoning_content from non-streaming responses
    // with tool_calls so it can be replayed on subsequent turns (DeepSeek V4, Kimi K2, etc.)
    try {
      const firstChoice = translatedResponse?.choices?.[0];
      const msg = firstChoice?.message;
      cacheReasoningFromAssistantMessage(msg, provider, model, {
        requestId: skillRequestId,
        messageIndex: 0,
      });
    } catch {
      // Cache capture is non-critical — never block the response
    }
    // Sanitize response for OpenAI SDK compatibility
    // Strips non-standard fields (x_groq, usage_breakdown, service_tier, etc.)
    // Extracts <think> and <thinking> tags into reasoning_content
    // Source format determines output shape. If we are outputting OpenAI shape or pseudo-OpenAI shape, sanitize.
    if (clientResponseFormat === FORMATS.OPENAI_RESPONSES) {
      translatedResponse = sanitizeResponsesApiResponse(translatedResponse);
    } else if (clientResponseFormat === FORMATS.OPENAI) {
      // Port of decolua/9router#517: opt-in `x-omniroute-strip-reasoning` header
      // unconditionally drops `reasoning_content` from the final non-streaming
      // JSON for clients (e.g. Firecrawl AI SDK) whose JSON parsers break on
      // that non-standard field. Reasoning replay cache is captured above this
      // sanitize step, so the cache feature is unaffected.
      const stripReasoning = isStripReasoningRequested(clientRawRequest?.headers ?? null);
      translatedResponse = sanitizeOpenAIResponse(translatedResponse, { stripReasoning });
    }

    applyClientUsageBuffer(translatedResponse, body, clientResponseFormat);

    if (memoryOwnerId && memorySettings?.enabled && memorySettings.maxTokens > 0) {
      const requestMemoryText = extractMemoryTextFromRequestBody(body as Record<string, unknown>);
      if (requestMemoryText) {
        extractFacts(requestMemoryText, memoryOwnerId, pipelineSessionId);
      }

      const memoryText = extractMemoryTextFromResponse(memoryExtractionResponse);
      if (memoryText) {
        extractFacts(memoryText, memoryOwnerId, pipelineSessionId);
      }
    }

    const customSkillExecutionEnabled =
      Boolean(memoryOwnerId) && memorySettings?.skillsEnabled === true;
    const builtinToolNames = webSearchFallbackPlan.toolName ? [webSearchFallbackPlan.toolName] : [];
    if (customSkillExecutionEnabled || builtinToolNames.length > 0) {
      const skillSessionId = pipelineSessionId;

      translatedResponse = await handleToolCallExecution(
        translatedResponse,
        getSkillsModelIdForFormat(sourceFormat),
        {
          apiKeyId: memoryOwnerId || "local",
          sessionId: skillSessionId,
          requestId: skillRequestId,
          builtinToolNames,
          customSkillExecutionEnabled,
        }
      );
    }

    const guardrailContext = buildPostCallGuardrailContext({
      apiKeyInfo,
      body,
      clientRawRequest,
      log,
      model,
      provider,
      responsePayloadFormat,
      clientResponseFormat,
    });
    const postCallGuardrails = await guardrailRegistry.runPostCallHooks(
      translatedResponse,
      guardrailContext
    );
    translatedResponse = postCallGuardrails.response;

    const responseUsage =
      (usage && typeof usage === "object" ? usage : null) ||
      (translatedResponse?.usage && typeof translatedResponse.usage === "object"
        ? translatedResponse.usage
        : null);
    const estimatedCost = responseUsage
      ? await calculateCost(provider, model, responseUsage, { serviceTier: effectiveServiceTier })
      : 0;

    if (postCallGuardrails.blocked) {
      const guardrailMessage = postCallGuardrails.message || "Response blocked by guardrail";
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_REQUEST,
        tokens: usage,
        responseBody,
        providerRequest: finalBody || translatedBody,
        providerResponse: looksLikeSSE
          ? {
              _streamed: true,
              _format: "sse-json",
              summary: responseBody,
            }
          : responseBody,
        clientResponse: buildErrorBody(HTTP_STATUS.BAD_REQUEST, guardrailMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        claudeCacheUsageMeta: cacheUsageLogMeta,
        cacheSource: "upstream",
      });
      if (apiKeyInfo?.id && estimatedCost > 0) {
        recordCost(apiKeyInfo.id, estimatedCost);
      }
      log?.warn?.(
        "GUARDRAIL",
        `Response blocked by ${postCallGuardrails.guardrail || "guardrail"}: ${guardrailMessage}`
      );
      finalizePendingScope(pendingScope, {
        providerResponse: responseBody,
        clientResponse: translatedResponse,
      });
      return createErrorResult(HTTP_STATUS.BAD_REQUEST, guardrailMessage);
    }

    // ── Phase 9.1: Cache store (non-streaming, temp=0) ──
    storeSemanticCacheResponse({
      enabled: semanticCacheEnabled,
      body,
      headers: clientRawRequest?.headers,
      translatedResponse,
      model,
      apiKeyId: apiKeyInfo?.id ?? undefined,
      usage,
      log,
    });

    // ── Phase 9.2: Save for idempotency ──
    // Reuse the key resolved by checkIdempotencyCache() above (single derivation per
    // request). (#3821-review LEDGER-6)
    saveIdempotency(idempotencyKey, translatedResponse, 200);
    reqLogger.logConvertedResponse(translatedResponse);
    persistAttemptLogs({
      status: 200,
      tokens: usage,
      responseBody,
      providerRequest: finalBody || translatedBody,
      providerResponse: looksLikeSSE
        ? {
            _streamed: true,
            _format: "sse-json",
            summary: responseBody,
          }
        : responseBody,
      clientResponse: translatedResponse,
      claudeCacheMeta: claudePromptCacheLogMeta,
      claudeCacheUsageMeta: cacheUsageLogMeta,
      cacheSource: "upstream",
    });
    if (apiKeyInfo?.id && estimatedCost > 0) {
      recordCost(apiKeyInfo.id, estimatedCost);
    }

    // === Quota Share POST-hook (B/F7) — fire-and-forget, fail-open ===
    await scheduleQuotaShareConsumption({
      apiKeyId: apiKeyInfo?.id,
      connectionId: credentials?.connectionId,
      provider,
      model,
      usage,
      estimatedCost,
      log,
    });
    // === /Quota Share POST-hook ===

    // ── Gamification event (fire-and-forget) ──
    await emitRequestGamificationEvent({ apiKeyId: apiKeyInfo?.id, model, provider });

    finalizePendingScope(pendingScope, {
      providerResponse: responseBody,
      clientResponse: translatedResponse,
    });
    const responseHeaders = buildNonStreamingResponseHeaders({
      provider,
      model,
      startTime,
      responseUsage,
      estimatedCost,
      requestId: skillRequestId,
      compressionResponseMeta,
    });
    // #1311: echo the requested alias/combo name in the non-streaming response model.
    if (echoModel) echoModelInObject(translatedResponse, echoModel);
    return {
      success: true,
      response: new Response(JSON.stringify(translatedResponse), {
        headers: responseHeaders,
      }),
    };
  }

  // Streaming response
  // #3089 — some "reasoning" openai-compatible upstreams ignore a stream:true
  // request and return a complete application/json chat-completion body instead
  // of an SSE stream. The readiness check below only recognizes SSE `data:`
  // frames, so that body produced a spurious STREAM_EARLY_EOF / HTTP 502 even
  // though it carried valid content/reasoning_content. Detect a JSON (non-SSE)
  // upstream body and synthesize an equivalent OpenAI SSE stream so the
  // streaming pipeline (and the client) get a valid stream.
  providerResponse = await maybeConvertJsonBodyToSse(providerResponse, { log, provider, model });
  const streamReadinessPolicy = resolveStreamReadinessTimeout({
    baseTimeoutMs: STREAM_READINESS_TIMEOUT_MS,
    provider,
    model,
    body: (finalBody || translatedBody) as Record<string, unknown> | null | undefined,
  });
  if (streamReadinessPolicy.timeoutMs !== streamReadinessPolicy.baseTimeoutMs) {
    log?.debug?.(
      "STREAM",
      `adaptive readiness timeout=${streamReadinessPolicy.timeoutMs}ms base=${streamReadinessPolicy.baseTimeoutMs}ms reason=${streamReadinessPolicy.reasons.join(",")}`
    );
  }

  const streamReadiness = await ensureStreamReadiness(providerResponse, {
    timeoutMs: streamReadinessPolicy.timeoutMs,
    provider,
    model,
    log,
  });
  if (streamReadiness.ok === false) {
    const { response: failureResponse, reason } = streamReadiness;
    const failure = {
      status: failureResponse.status,
      message: reason,
      code: streamReadiness.code,
      type: streamReadiness.type,
    };
    trackPendingRequest(model, provider, connectionId, false);
    appendRequestLog({
      model,
      provider,
      connectionId,
      status: `FAILED ${failureResponse.status}`,
    }).catch(() => {});
    persistAttemptLogs({
      status: failureResponse.status,
      error: reason,
      providerRequest: finalBody || translatedBody,
      clientResponse: buildErrorBody(failureResponse.status, reason),
      claudeCacheMeta: claudePromptCacheLogMeta,
      cacheSource: "upstream",
    });
    persistFailureUsage(failureResponse.status, streamReadiness.code);
    // Do NOT call onStreamFailure — a stream stall is an upstream issue,
    // not an account/quota failure. Marking the account unavailable here
    // would lock out legitimate accounts when the upstream hangs.
    return {
      success: false,
      status: failureResponse.status,
      error: reason,
      errorType: streamReadiness.type,
      errorCode: streamReadiness.code,
      response: failureResponse,
    };
  }
  providerResponse = streamReadiness.response;

  // Notify success - caller can clear error status if needed
  if (onRequestSuccess) {
    await onRequestSuccess();
  }

  const responseHeaders = assembleStreamingResponseHeaders({
    providerHeaders: providerResponse.headers,
    provider,
    model,
    pendingRequestId,
    compressionResponseMeta,
  });

  // Create transform stream with logger for streaming response
  let transformStream;
  const responseToolNameMap = mergeResponseToolNameMap(
    toolNameMap,
    (finalBody as Record<string, unknown> | null | undefined) ?? null
  );

  let streamFailureCompletionRecorded = false;

  // Callback to save call log when stream completes (include responseBody when provided by stream)
  const onStreamComplete = ({
    status: streamStatus,
    usage: streamUsage,
    responseBody: streamResponseBody,
    providerPayload,
    clientPayload,
    error: streamError,
    errorCode: streamErrorCode,
    ttft,
  }) => {
    const normalizedStreamStatus = streamStatus || 200;
    if (normalizedStreamStatus !== 200) {
      if (streamFailureCompletionRecorded) return;
      streamFailureCompletionRecorded = true;
    }
    const cacheUsageLogMeta = buildCacheUsageLogMeta(streamUsage);

    if (normalizedStreamStatus === 200) {
      void maybeSyncClaudeExtraUsageState({
        provider,
        connectionId,
        providerSpecificData: credentials?.providerSpecificData,
        log,
      });
    }

    // Reasoning Replay Cache (#1628): Capture reasoning_content from streaming responses
    // with tool_calls so it can be replayed on subsequent turns (DeepSeek V4, Kimi K2, etc.)
    if (normalizedStreamStatus === 200 && streamResponseBody) {
      try {
        const body = streamResponseBody as Record<string, unknown>;
        const choices = body.choices as { message?: Record<string, unknown> }[] | undefined;
        const msg = choices?.[0]?.message;
        cacheReasoningFromAssistantMessage(msg, provider, model, {
          requestId: skillRequestId,
          messageIndex: 0,
        });
      } catch {
        // Cache capture is non-critical — never block the stream
      }
    }
    effectiveServiceTier = resolveReportedServiceTier(streamResponseBody) ?? effectiveServiceTier;

    streamFailure.finalizeStreamRequestLog({
      pendingRequestId,
      model,
      provider,
      connectionId: connectionId || credentials?.connectionId || null,
      providerResponse: providerPayload ?? streamResponseBody ?? undefined,
      clientResponse: clientPayload ?? streamResponseBody ?? undefined,
      status: normalizedStreamStatus,
      error: streamError,
      errorCode: streamErrorCode,
    });

    // Track cache token metrics for streaming responses
    if (streamUsage && typeof streamUsage === "object") {
      attachCompressionUsageReceiptAfterAnalytics(streamUsage as Record<string, unknown>, "stream");
    }
    recordStreamingUsageStats(streamUsage, {
      provider,
      model,
      streamStatus: normalizedStreamStatus,
      startTime,
      ttft,
      streamErrorCode,
      connectionId,
      apiKeyInfo,
      effectiveServiceTier,
      isCombo,
      comboStrategy,
      endpoint: endpointPath,
    });

    persistAttemptLogs({
      status: normalizedStreamStatus,
      error: streamError || undefined,
      tokens: streamUsage || {},
      responseBody: streamResponseBody ?? undefined,
      providerRequest: finalBody || translatedBody,
      providerResponse: providerPayload,
      clientResponse: clientPayload ?? streamResponseBody ?? undefined,
      claudeCacheMeta: claudePromptCacheLogMeta,
      claudeCacheUsageMeta: cacheUsageLogMeta,
      cacheSource: "upstream",
    });

    recordStreamingCost({
      apiKeyId: apiKeyInfo?.id,
      provider,
      model,
      streamUsage,
      serviceTier: effectiveServiceTier,
      calculateCost,
      recordCost,
    });

    // === Quota Share POST-hook streaming (B/F7) — fire-and-forget, fail-open ===
    // Resolve the real per-request cost (calculateCost) so USD-unit pools accrue
    // on streaming traffic too; this previously recorded usd:0 hardcoded, which
    // meant DeepSeek-style `usd/monthly` shared pools never blocked on streams.
    scheduleStreamingQuotaShareConsumption({
      apiKeyId: apiKeyInfo?.id,
      connectionId: credentials?.connectionId,
      provider,
      model,
      streamUsage,
      streamStatus: normalizedStreamStatus,
      serviceTier: effectiveServiceTier,
      calculateCost,
      log,
    });
    // === /Quota Share POST-hook streaming ===

    if (
      memoryOwnerId &&
      memorySettings?.enabled &&
      memorySettings.maxTokens > 0 &&
      streamStatus === 200
    ) {
      const requestMemoryText = extractMemoryTextFromRequestBody(body as Record<string, unknown>);
      if (requestMemoryText) {
        extractFacts(requestMemoryText, memoryOwnerId, pipelineSessionId);
      }

      const streamedMemoryText = extractMemoryTextFromResponse(
        (streamResponseBody ?? null) as Record<string, unknown> | null
      );
      if (streamedMemoryText) {
        extractFacts(streamedMemoryText, memoryOwnerId, pipelineSessionId);
      }
    }

    // Semantic cache: store assembled streaming response for future cache hits
    storeStreamingSemanticCacheResponse({
      enabled: semanticCacheEnabled,
      streamStatus,
      streamResponseBody,
      body,
      headers: clientRawRequest?.headers,
      model,
      apiKeyId: apiKeyInfo?.id ?? undefined,
      streamUsage,
      log,
    });
  };

  const streamFailureFinalizers = streamFailure.createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => streamFailureCompletionRecorded,
    onStreamComplete,
    persistFailureUsage,
    onStreamFailure,
  });
  const handleStreamFailure = streamFailureFinalizers.handleStreamFailure;
  onPipelineStreamError = streamFailureFinalizers.onPipelineStreamError;

  // For providers using Responses API format, translate stream back to openai (Chat Completions) format
  // UNLESS client is Droid CLI which expects openai-responses format back
  const needsResponsesTranslation =
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    clientResponseFormat === FORMATS.OPENAI &&
    !isResponsesEndpoint &&
    !isDroidCLI;
  const streamStateBody = finalBody || body;

  if (needsResponsesTranslation) {
    // Provider returns openai-responses, translate to openai (Chat Completions) that clients expect
    log?.debug?.("STREAM", `Responses translation mode: openai-responses → openai`);
    transformStream = createSSETransformStreamWithLogger(
      "openai-responses",
      "openai",
      provider,
      reqLogger,
      responseToolNameMap,
      model,
      connectionId,
      streamStateBody,
      onStreamComplete,
      apiKeyInfo,
      handleStreamFailure,
      copilotCompatibleReasoning
    );
  } else if (needsTranslation(targetFormat, clientResponseFormat)) {
    // Standard translation for other providers
    log?.debug?.("STREAM", `Translation mode: ${targetFormat} → ${clientResponseFormat}`);
    transformStream = createSSETransformStreamWithLogger(
      targetFormat,
      clientResponseFormat,
      provider,
      reqLogger,
      responseToolNameMap,
      model,
      connectionId,
      streamStateBody,
      onStreamComplete,
      apiKeyInfo,
      handleStreamFailure,
      copilotCompatibleReasoning
    );
  } else {
    log?.debug?.("STREAM", `Standard passthrough mode`);
    transformStream = createPassthroughStreamWithLogger(
      provider,
      reqLogger,
      responseToolNameMap,
      model,
      connectionId,
      streamStateBody,
      onStreamComplete,
      apiKeyInfo,
      handleStreamFailure,
      clientResponseFormat
    );
  }

  const finalStream = assembleStreamingPipeline({
    providerResponse,
    transformStream,
    streamController,
    createPiiTransform,
    clientRawRequestHeaders: clientRawRequest?.headers,
    clientResponseFormat,
    echoModel,
    responseHeaders,
  });

  // ── Gamification event (fire-and-forget) ──
  await emitRequestGamificationEvent({ apiKeyId: apiKeyInfo?.id, model, provider });

  // ── Plugin onResponse hook (fire-and-forget) ──
  await runPluginOnResponseHook({ requestId: traceId, body, model, provider, apiKeyInfo });

  return {
    success: true,
    response: new Response(finalStream, {
      headers: responseHeaders,
    }),
  };
}

export function isTokenExpiringSoon(expiresAt, bufferMs = 5 * 60 * 1000) {
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  return expiresAtMs - Date.now() < bufferMs;
}
