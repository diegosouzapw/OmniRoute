import { runTranslateAndDedup } from "./chatCore/translateAndDedup.ts";
import { runCacheAndCompress } from "./chatCore/cacheAndCompress.ts";
import { materializeStreamingSuccessResponse } from "./chatCore/streamingSuccessResponse.ts";
import { runRequestPrelude } from "./chatCore/requestPrelude.ts";
import { executeProviderRequest as executeProviderRequestFromLeaf } from "./chatCore/executeProviderRequest.ts";
import { buildFailureUsageRecord, type FailureUsageAggregate } from "./chatCore/failureUsage.ts";
import {
  extractSystemRoleMessages,
  relocateDirectiveOnlyMessages,
} from "./chatCore/claudeSystemRole.ts";
export { extractSystemRoleMessages, relocateDirectiveOnlyMessages };
import { acquireTurnExecution, createTurnInProgressResult } from "./chatCore/turnExecutionGuard.ts";
import { maybeConvertJsonBodyToSse } from "./chatCore/jsonBodyToSse.ts";

import { routingFinishReason } from "./chatCore/routingFinishReason.ts";

export { clearCombosCache, clearUpstreamProxyConfigCache } from "./chatCore/comboContextCache.ts";
import {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "./chatCore/passthroughHelpers.ts";
import { runNonStreamingLeg } from "./chatCore/nonStreamingLeg.ts";
import { runStreamingLeg } from "./chatCore/streamingLeg.ts";
import { createProviderFailureClassifier } from "./chatCore/providerFailureClassification.ts";
import {
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
} from "./chatCore/responseHeaders.ts";
// Re-export the previously inline-defined helpers so existing importers of these
// symbols from chatCore.ts (tests, sibling modules) keep resolving after the split.
export {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
};
import { FORMATS } from "../translator/formats.ts";
import { ensureStreamReadiness } from "../utils/streamReadiness.ts";
import { resolveStreamReadinessTimeout } from "../utils/streamReadinessPolicy.ts";
import * as streamFailure from "../utils/streamFailureFinalization.ts";
import { refreshWithRetry, runWithOnPersist, runWithCasGuard } from "../services/tokenRefresh.ts";
import { buildErrorBody, createErrorResult } from "../utils/error.ts";
import { checkTokenLimits } from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import {
  HTTP_STATUS,
  STREAM_READINESS_MAX_TIMEOUT_MS,
  STREAM_READINESS_TIMEOUT_MS,
} from "../config/constants.ts";
import { updateProviderConnection, getProviderConnectionById } from "@/lib/db/providers";
import {
  persistAttemptLogs as persistAttemptLogsFor,
  type PersistAttemptLogsArgs,
} from "./chatCore/attemptLogging.ts";
import { attachCompressionUsageReceiptAfterAnalytics as attachCompressionUsageReceiptAfterAnalyticsFor } from "./chatCore/compressionUsageReceipt.ts";
import { trackPendingRequest, appendRequestLog, saveRequestUsage } from "@/lib/usageDb";
import { updatePendingScope } from "@/lib/usage/pendingRequestScope";
import { recordCost } from "@/domain/costRules";
import { calculateCost } from "@/lib/usage/costCalculator";

import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { extractFacts } from "@/lib/memory/extraction";
import { isTpmExhausted } from "../services/geminiRateLimitTracker.ts";

/**
 * #12150 P1b: shape of handleChatCore's optional `videoBridgeLog` param — see
 * its destructure default below. `handleChatCore`'s own params object has no
 * type annotation (pre-existing convention for this god-function), so this
 * alias is applied via a local cast at each read site instead of widening
 * the whole destructure to a typed object.
 */
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
  routingComboId = null,
  sessionAffinityKey = null,
  comboStepId = null,
  comboExecutionKey = null,
  cachedSettings = null,
  skipUpstreamRetry = false,
  createPiiTransform = null,
  correlationId = null,
  conversationId = null,
  modelPinned = false,
  skipResourcePressureGuard = false,
  reasoningTransportFallback = "drop",
  managedLease = null,
  // #12150 P1b: additive, optional video-bridge log/Memory shadow — shape is
  // VideoBridgeLogParam (defined near the top of this file). Built once in chat.ts from
  // preCallGuardrails.results (video-bridge guardrail meta) and threaded here
  // through executeChatWithBreaker. `undefined` for every non-video request,
  // so this parameter changes nothing on the byte-identical default path.
  // `observed` gates durable Memory extraction (surface 3); `redaction` is
  // applied to a CLONE of `body` at the persistAttemptLogs sink (surface 1) —
  // the model-bound `body` itself is never touched.
  videoBridgeLog = undefined,
  fallbackAttempts = undefined,
}) {
  const prelude = await runRequestPrelude({
    body,
    modelInfo,
    credentials,
    log,
    clientRawRequest,
    connectionId,
    apiKeyInfo,
    userAgent,
    comboName,
    comboStrategy,
    isCombo,
    sessionAffinityKey,
    comboStepId,
    comboExecutionKey,
    cachedSettings,
    correlationId,
    conversationId,
    modelPinned,
    skipResourcePressureGuard,
    managedLease,
    videoBridgeLog,
  });
  if (prelude.kind === "return") return prelude.value;
  const c1 = prelude.continue;
  body = c1.body;
  credentials = c1.credentials;
  let { tokensCompressed, effectiveServiceTier, compressionAnalyticsWritePromise } = c1;
  const {
    provider,
    model,
    extendedContext,
    videoBridgeObserved,
    resilienceSettings,
    requestedModel,
    isModelScope,
    startTime,
    traceId,
    traceEnabled,
    trace,
    getCurrentConnectionId,
    assertManagedLeaseFence,
    getManagedLeaseFenceErrorCode,
    managedLeaseFenceErrorResult,
    agentGoalPolicy,
    resolveEffectiveServiceTier,
    resolveReportedServiceTier,
    recordKeyHealthStatus,
    idempotencyKey,
    endpointPath,
    sourceFormat,
    isResponsesEndpoint,
    nativeCodexPassthrough,
    nativeXaiResponsesPassthrough,
    isDroidCLI,
    isOpencodeClient,
    copilotCompatibleReasoning,
    clientResponseFormat,
    nativeOpenAICompatibleResponsesPassthrough,
    customToolNames,
    backgroundReason,
    effectiveModel,
    alias,
    targetFormat,
    nativeResponsesPassthrough,
    pendingConnId,
    pendingRequestId,
    preConversionClientToolNames,
    webSearchFallbackPlan,
    clientRequestedResponsesStream,
    webFetchFallbackPlan,
    settings,
    isCodexResponsesEcho,
    echoModel,
    skillRequestId,
    pipelineSessionId,
    reasoningCacheScope,
    persistAttemptLogs: persistAttemptLogsPrelude,
    detailedLoggingEnabled,
    noLogEnabled,
    explicitSessionIdHeader,
    buildUpstreamHeadersForExecute,
    streamUserAgent,
    thinkingMarkerHeader,
    providerRequiresStreaming,
    stream,
    semanticCacheEnabled,
    reqLogger,
    pendingScope,
    providerRequestCapture,
    bodyForCacheWrite,
    trustedEffortContext,
    reasoningRuleDirective,
  } = c1;
  // Normalized OpenAI transcript the reasoning replay pass digested for a
  // Responses-API target (reported by translateRequest). A Responses body has
  // `input`, not `messages`, so the replay-cache write side would otherwise digest
  // an empty history and never match the read side for plain assistant turns.
  let reasoningReplayHistory: unknown[] | null = null;
  const persistFailureUsage = (
    statusCode: number,
    errorCode?: string | null,
    aggregate?: FailureUsageAggregate | null
  ) => {
    saveRequestUsage(
      buildFailureUsageRecord({
        provider,
        model,
        connectionId: getCurrentConnectionId(),
        apiKeyInfo,
        effectiveServiceTier,
        isCombo,
        comboStrategy,
        statusCode,
        errorCode,
        latencyMs: Date.now() - startTime,
        endpoint: endpointPath,
        aggregate: aggregate ?? undefined,
      })
    ).catch(() => {});
  };
  const attachCompressionUsageReceiptAfterAnalytics = (
    usage: Record<string, unknown>,
    source: "provider" | "estimated" | "stream"
  ) =>
    attachCompressionUsageReceiptAfterAnalyticsFor(usage, source, {
      pendingWrite: compressionAnalyticsWritePromise,
      skillRequestId,
    });

  const turnExecution = acquireTurnExecution(idempotencyKey);
  if (turnExecution.acquired === false) {
    const duplicate = createTurnInProgressResult(turnExecution.retryCount);
    log?.warn?.(
      "TURN_GUARD",
      `duplicate blocked cid=${traceId} retry=${turnExecution.retryCount} ageMs=${turnExecution.ageMs}`
    );
    return duplicate.result;
  }
  const releaseTurnExecution = turnExecution.release;
  let turnExecutionHandedOffToStream = false;

  // Preserve chatCore's canonical formatting while the guarded body remains byte-stable.
  // prettier-ignore
  try {
  const cacheAndCompressResult = await runCacheAndCompress({
    body,
    semanticCacheEnabled,
    stream: !!stream,
    clientRawRequest,
    model,
    effectiveModel,
    provider,
    effectiveServiceTier,
    pendingScope,
    reqLogger,
    startTime,
    log,
    persistAttemptLogsPrelude,
    apiKeyInfo,
    sourceFormat,
    targetFormat,
    credentials,
    reasoningTransportFallback,
    isCombo,
    comboStepId,
    comboExecutionKey,
    connectionId,
    backgroundReason,
    webSearchFallbackPlan,
    webFetchFallbackPlan,
    preConversionClientToolNames,
    comboName,
    getCurrentConnectionId,
    routingComboId,
    skillRequestId,
    traceId,
    nativeCodexPassthrough,
    tokensCompressed,
    compressionAnalyticsWritePromise,
  });
  if (cacheAndCompressResult.kind === "return") {
    return cacheAndCompressResult.response as Response | Record<string, unknown>;
  }
  body = cacheAndCompressResult.body;
  const memoryOwnerId = cacheAndCompressResult.memoryOwnerId;
  const memorySettings = cacheAndCompressResult.memorySettings;
  const injectionResult = cacheAndCompressResult.injectionResult;
  compressionAnalyticsWritePromise = cacheAndCompressResult.compressionAnalyticsWritePromise;
  let compressionResponseMeta = cacheAndCompressResult.compressionResponseMeta;
  let contextEditingEnabled = cacheAndCompressResult.contextEditingEnabled;
  let preCompressionBody = cacheAndCompressResult.preCompressionBody;
  // Re-seat post-translation compression callback onto the caller's local variable.
  // This is invoked downstream (around line 780) on the post-translation body.
  let runPostTranslationCompression = cacheAndCompressResult.runPostTranslationCompression;
  tokensCompressed = cacheAndCompressResult.tokensCompressed;

  const translated = await runTranslateAndDedup({
    body,
    tokensCompressed,
    compressionAnalyticsWritePromise,
    compressionResponseMeta,
    runPostTranslationCompression,
    preCompressionBody,
    credentials,
    log,
    clientRawRequest,
    connectionId,
    apiKeyInfo,
    userAgent,
    comboName,
    comboStrategy,
    isCombo,
    comboStepId,
    comboExecutionKey,
    provider,
    model,
    modelInfo,
    effectiveModel,
    alias,
    sourceFormat,
    targetFormat,
    stream,
    clientResponseFormat,
    providerRequiresStreaming,
    nativeCodexPassthrough,
    nativeXaiResponsesPassthrough,
    nativeResponsesPassthrough,
    nativeOpenAICompatibleResponsesPassthrough,
    isCodexResponsesEcho,
    copilotCompatibleReasoning,
    reasoningCacheScope,
    reqLogger,
    trace,
    traceId,
    skillRequestId,
    pendingScope,
    endpointPath,
    effectiveServiceTier,
    onDisconnect,
    settings,
    reasoningRuleDirective,
    trustedEffortContext,
  });
  if (translated.kind === "return") return translated.value;
  const c3 = translated.continue;
  ({
    tokensCompressed,
    compressionAnalyticsWritePromise,
    compressionResponseMeta,
    reasoningReplayHistory,
  } = c3);
  let { translatedBody } = c3;
  const {
    dedupEnabled,
    dedupHash,
    toolNameMap,
    requestToolIdentityMap,
    streamController,
    executor,
    getExecutionCredentials,
    upstreamStream,
    isClaudeCodeCompatible,
    isClaudePassthrough,
    preserveCacheControl,
    bindPipelineStreamError,
    bindClientDisconnectFinalize,
  } = c3;

  const persistAttemptLogs = (args: PersistAttemptLogsArgs) =>
    persistAttemptLogsFor(args, {
      traceId,
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
      body: translatedBody,
      sourceFormat,
      targetFormat,
      comboName,
      comboStepId,
      comboExecutionKey,
      tokensCompressed,
      apiKeyInfo,
      noLogEnabled,
      correlationId,
      modelPinned,
      sessionTag: conversationId || explicitSessionIdHeader,
      videoBridgeLogRedaction: (
        videoBridgeLog as { redaction?: VideoBridgeLogRedactionEntry[] } | undefined
      )?.redaction,
      videoContentRemoved: videoBridgeObserved,
    });

  const executeProviderRequest = (modelToCall = effectiveModel, allowDedup = false) => {
    const sendDeps = {
      agentGoalPolicy,
      assertManagedLeaseFence,
      buildUpstreamHeadersForExecute,
      clientRawRequest,
      clientResponseFormat,
      connectionId,
      correlationId,
      contextEditingEnabled,
      credentials,
      dedupEnabled,
      dedupHash,
      effectiveModel,
      executor,
      extendedContext,
      getExecutionCredentials,
      isClaudePassthrough,
      isModelScope,
      isOpencodeClient,
      log,
      model,
      onCredentialsRefreshed,
      pendingScope,
      provider,
      providerRequestCapture,
      rawBody: body,
      recordKeyHealthStatus,
      requestedModel,
      resilienceSettings,
      settings,
      skipUpstreamRetry,
      stream,
      streamController,
      targetFormat,
      trace,
      traceId,
      translatedBody,
      trustedEffortContext,
      upstreamStream,
      userAgent,
    };
    return executeProviderRequestFromLeaf(
      sendDeps as unknown as import("./chatCore/executeProviderRequest.ts").ExecuteProviderRequestDeps,
      modelToCall,
      allowDedup
    );
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

  // ── Gemini pre-dispatch TPM / RPM guard ──────────────────────────────────
  // Avoids guaranteed upstream 429 by checking local sliding-window counters
  // before dispatch. Fail-open: counter errors → allow through.
  if (provider === "gemini") {
    try {
      if (isTpmExhausted(effectiveModel)) {
        trackPendingRequest(model, provider, connectionId, false);
        return createErrorResult(
          HTTP_STATUS.RATE_LIMITED,
          `Gemini TPM rate limit reached for ${effectiveModel}. Please try again later.`,
          null,
          "GEMINI_TPM_EXHAUSTED"
        );
      }
    } catch (err) {
      log?.warn?.("GEMINI_RATE_LIMIT", "Pre-dispatch TPM check failed; allowing request", { err });
    }
  }

  // Execute request using executor (handles URL building, headers, fallback, transform)
  let providerResponse;
  let providerHeaders;
  let finalBody;
  let claudePromptCacheLogMeta = null;

  let credentialRefreshPersistRan = false;
  const hadStreamOptions =
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    translatedBody &&
    typeof translatedBody === "object" &&
    "stream_options" in translatedBody;
  if (hadStreamOptions) {
    delete (translatedBody as Record<string, unknown>).stream_options;
  }

  const executeRefreshCredentials = async (
    currentCreds: Record<string, unknown>
  ): Promise<Record<string, unknown> | null> => {
    if (typeof executor.refreshCredentials !== "function") {
      return null;
    }
    if (hadStreamOptions) {
      return null;
    }
    if (await shouldIsolateProbeFailures()) {
      return null;
    }

    const targetCredentials = (currentCreds || credentials || {}) as Record<string, unknown>;
    const attemptedRefreshToken =
      typeof targetCredentials?.refreshToken === "string" ? targetCredentials.refreshToken : null;
    credentialRefreshPersistRan = false;
    const persistFn = onCredentialsRefreshed
      ? async (refreshResult: Record<string, unknown>) => {
          credentialRefreshPersistRan = true;
          Object.assign(targetCredentials, refreshResult);
          Object.assign(credentials, refreshResult);
          await onCredentialsRefreshed(refreshResult);
        }
      : undefined;

    const casConnectionId =
      typeof targetCredentials?.connectionId === "string"
        ? targetCredentials.connectionId.trim()
        : "";
    const casReread = casConnectionId
      ? async () => {
          const latest = await getProviderConnectionById(casConnectionId);
          return typeof latest?.refreshToken === "string" ? latest.refreshToken : null;
        }
      : null;

    const newCredentials = (await refreshWithRetry(
      () =>
        runWithCasGuard(
          casReread ? { expectedRefreshToken: attemptedRefreshToken, reread: casReread } : null,
          () =>
            runWithOnPersist(persistFn, () => executor.refreshCredentials(targetCredentials, log))
        ),
      3,
      log,
      provider
    )) as null | Record<string, unknown>;

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider?.toUpperCase()} | refreshed`);
      if (!credentialRefreshPersistRan) {
        Object.assign(targetCredentials, newCredentials);
        Object.assign(credentials, newCredentials);
      }
      const errorConnectionId = String(getCurrentConnectionId() || connectionId || "");
      if (errorConnectionId) {
        updateProviderConnection(errorConnectionId, newCredentials).catch(() => {});
      }
      return newCredentials;
    }
    return null;
  };

  const handleCredentialsRefreshed = async (refreshed: Record<string, unknown>) => {
    Object.assign(credentials, refreshed);
    if (!credentialRefreshPersistRan && onCredentialsRefreshed) {
      credentialRefreshPersistRan = true;
      const targetConnectionId =
        (credentials as { connectionId?: string })?.connectionId ||
        (credentials as { id?: string })?.id ||
        getCurrentConnectionId() ||
        connectionId;
      try {
        await onCredentialsRefreshed({
          ...refreshed,
          provider,
          connectionId: targetConnectionId,
        });
      } catch (refreshErr) {
        log?.warn?.(
          "REFRESH",
          `onCredentialsRefreshed persistence callback failed for connection ${targetConnectionId}: ${refreshErr}`
        );
      }
    }
  };

  const applyProviderFailureClassification = createProviderFailureClassifier({
    provider,
    model,
    connectionId,
    credentials,
    onStreamFailure,
    isModelScope,
    getCurrentConnectionId,
    log,
  });

  let pipelineRecovered = false;
  if (stream) {
    const streamingOutcome = await runStreamingLeg({
      apiKeyInfo,
      applyProviderFailureClassification,
      assertManagedLeaseFence,
      body,
      buildErrorBody,
      buildUpstreamHeadersForExecute,
      claudePromptCacheLogMeta,
      clientRawRequest,
      clientResponseFormat,
      comboStrategy,
      connectionId,
      contextEditingEnabled,
      correlationId,
      credentials,
      currentModel,
      effectiveModel,
      effectiveServiceTier,
      executeProviderRequest,
      executeRefreshCredentials,
      executor,
      extendedContext,
      finalBody,
      getCurrentConnectionId,
      getExecutionCredentials,
      getManagedLeaseFenceErrorCode,
      handleCredentialsRefreshed,
      isCombo,
      isOpencodeClient,
      log,
      managedLease,
      managedLeaseFenceErrorResult,
      model,
      onCredentialsRefreshed,
      pendingScope,
      persistAttemptLogs,
      persistFailureUsage,
      pipelineRecovered,
      provider,
      providerHeaders,
      providerRequestCapture,
      providerResponse,
      reqLogger,
      resolveEffectiveServiceTier,
      sessionAffinityKey,
      skillRequestId,
      sourceFormat,
      stream,
      streamController,
      targetFormat,
      translatedBody,
      triedModels,
      trustedEffortContext,
      upstreamStream,
      userAgent,
    });
      claudePromptCacheLogMeta = streamingOutcome.carry.claudePromptCacheLogMeta;
      currentModel = streamingOutcome.carry.currentModel;
      effectiveServiceTier = streamingOutcome.carry.effectiveServiceTier;
      finalBody = streamingOutcome.carry.finalBody;
      pipelineRecovered = streamingOutcome.carry.pipelineRecovered;
      providerHeaders = streamingOutcome.carry.providerHeaders;
      providerResponse = streamingOutcome.carry.providerResponse;
      translatedBody = streamingOutcome.carry.translatedBody;
    if (streamingOutcome.kind === "returned") {
      return streamingOutcome.value;
    }
  }

  // Non-streaming response
  if (!stream) {
    return await runNonStreamingLeg({
      apiKeyInfo,
      applyProviderFailureClassification,
      assertManagedLeaseFence,
      attachCompressionUsageReceiptAfterAnalytics,
      body,
      bodyForCacheWrite,
      claudePromptCacheLogMeta,
      clientRawRequest,
      clientRequestedResponsesStream,
      clientResponseFormat,
      comboStrategy,
      compressionResponseMeta,
      connectionId,
      contextEditingEnabled,
      copilotCompatibleReasoning,
      credentials,
      currentModel,
      customToolNames,
      echoModel,
      effectiveModel,
      effectiveServiceTier,
      endpointPath,
      executeProviderRequest,
      executeRefreshCredentials,
      fallbackAttempts,
      finalBody,
      getCurrentConnectionId,
      getManagedLeaseFenceErrorCode,
      handleCredentialsRefreshed,
      idempotencyKey,
      injectionResult,
      isClaudeCodeCompatible,
      isCombo,
      isResponsesEndpoint,
      log,
      managedLease,
      managedLeaseFenceErrorResult,
      memoryOwnerId,
      memorySettings,
      model,
      onRequestSuccess,
      pendingConnId,
      pendingRequestId,
      pendingScope,
      persistAttemptLogs,
      persistFailureUsage,
      pipelineRecovered,
      pipelineSessionId,
      preserveCacheControl,
      provider,
      providerHeaders,
      providerRequestCapture,
      providerResponse,
      reasoningCacheScope,
      reasoningReplayHistory,
      reqLogger,
      requestToolIdentityMap,
      resolveReportedServiceTier,
      semanticCacheEnabled,
      sessionAffinityKey,
      skillRequestId,
      sourceFormat,
      startTime,
      stream,
      targetFormat,
      toolNameMap,
      traceEnabled,
      traceId,
      translatedBody,
      triedModels,
      videoBridgeObserved,
      webFetchFallbackPlan,
      webSearchFallbackPlan,
    });

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
    maxTimeoutMs: agentGoalPolicy.detected
      ? Math.max(STREAM_READINESS_MAX_TIMEOUT_MS, agentGoalPolicy.readinessMaxTimeoutMs)
      : STREAM_READINESS_MAX_TIMEOUT_MS,
  });
  if (streamReadinessPolicy.timeoutMs !== streamReadinessPolicy.baseTimeoutMs) {
    log?.debug?.(
      "STREAM",
      `adaptive readiness timeout=${streamReadinessPolicy.timeoutMs}ms base=${streamReadinessPolicy.baseTimeoutMs}ms reason=${streamReadinessPolicy.reasons.join(",")}`
    );
  }

  const streamReadiness = await ensureStreamReadiness(providerResponse, {
    timeoutMs: streamReadinessPolicy.timeoutMs,
    maxTimeoutMs: streamReadinessPolicy.maxTimeoutMs,
    provider,
    model,
    log,
  });
  if (streamReadiness.ok === false) {
    const { response: failureResponse, reason } = streamReadiness;
    const { classificationReason, upstreamDiagnostic } = streamReadiness;
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
      clientResponse: buildErrorBody(
        failureResponse.status,
        classificationReason,
        upstreamDiagnostic ? { error: { message: upstreamDiagnostic } } : undefined
      ),
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
      classificationError: classificationReason,
      errorType: streamReadiness.type,
      errorCode: streamReadiness.code,
      response: failureResponse,
    };
  }
  providerResponse = streamReadiness.response;

  const response = await materializeStreamingSuccessResponse({
    providerResponse,
    onRequestSuccess,
    provider,
    model,
    connectionId,
    credentials,
    pendingRequestId,
    compressionResponseMeta,
    comboStrategy,
    fallbackAttempts,
    clientRawRequest,
    toolNameMap,
    finalBody,
    translatedBody,
    body,
    persistAttemptLogs,
    getCurrentConnectionId,
    log,
    reqLogger,
    clientResponseFormat,
    targetFormat,
    isResponsesEndpoint,
    isDroidCLI,
    reasoningCacheScope,
    reasoningReplayHistory,
    contextEditingEnabled,
    skillRequestId,
    streamFailure,
    startTime,
    apiKeyInfo,
    isCombo,
    endpointPath,
    traceId,
    calculateCost,
    recordCost,
    memoryOwnerId,
    memorySettings,
    videoBridgeObserved,
    pipelineSessionId,
    extractFacts,
    semanticCacheEnabled,
    bodyForCacheWrite,
    claudePromptCacheLogMeta,
    resolveReportedServiceTier,
    attachCompressionUsageReceiptAfterAnalytics,
    routingFinishReason,
    effectiveServiceTier,
    persistFailureUsage,
    onStreamFailure,
    setOnPipelineStreamError: (fn) => {
      bindPipelineStreamError(fn);
    },
    setOnClientDisconnectFinalize: (fn) => {
      bindClientDisconnectFinalize(fn);
    },
    streamUserAgent,
    thinkingMarkerHeader,
    copilotCompatibleReasoning,
    customToolNames,
    requestToolIdentityMap,
    streamController,
    createPiiTransform,
    echoModel,
    streamReadinessPolicy,
    releaseTurnExecution,
  });

  turnExecutionHandedOffToStream = true;
  return {
    success: true,
    response,
  };
  } finally {
    if (!turnExecutionHandedOffToStream) {
      releaseTurnExecution();
    }
  }
}
export function isTokenExpiringSoon(expiresAt, bufferMs = 5 * 60 * 1000) {
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  return expiresAtMs - Date.now() < bufferMs;
}
