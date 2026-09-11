import { runRequestPrelude } from "./chatCore/requestPrelude.ts";
import { runCacheAndCompress } from "./chatCore/cacheAndCompress.ts";
import { runTranslateAndDedup } from "./chatCore/translateAndDedup.ts";
import {
  persistAttemptLogs as persistAttemptLogsFor,
  type PersistAttemptLogsArgs,
} from "./chatCore/attemptLogging.ts";
import {
  projectFailureUsageErrorCode,
  buildFailureUsageRecord,
  type FailureUsageAggregate,
} from "./chatCore/failureUsage.ts";
export {
  extractSystemRoleMessages,
  relocateDirectiveOnlyMessages,
} from "./chatCore/claudeSystemRole.ts";

import { buildPostCallGuardrailContext } from "./chatCore/postCallGuardrailContext.ts";
import { storeSemanticCacheResponse } from "./chatCore/semanticCacheStore.ts";
import { buildNonStreamingResponseHeaders } from "./chatCore/nonStreamingResponseHeaders.ts";
import { buildNonStreamingJsonResponse } from "./chatCore/nonStreamingJsonResponse.ts";
import { maybeConvertJsonBodyToSse } from "./chatCore/jsonBodyToSse.ts";
import { assembleStreamingResponseHeaders } from "./chatCore/streamingResponseHeaders.ts";
import { makeOnStreamComplete } from "./chatCore/streamMaterialize.ts";
import { assembleStreamingPipeline } from "./chatCore/streamingPipeline.ts";
import { createRoutingEvent, emitRoutingEvent } from "../services/routing/index.ts";

import { routingFinishReason } from "./chatCore/routingFinishReason.ts";
import {
  getHeaderValueCaseInsensitive,
  isNoMemoryRequested,
  resolveCompressionHeader,
} from "./chatCore/headers.ts";

import { getCodexClientSessionId } from "../config/codexIdentity.ts";
import {
  noteCodexTurnStateProvenance,
  readCodexTurnStateHeader,
} from "../config/codexTurnState.ts";
export { clearCombosCache, clearUpstreamProxyConfigCache } from "./chatCore/comboContextCache.ts";
import {
  resolveAccountSemaphoreKey,
  buildClaudePromptCacheLogMeta,
} from "./chatCore/executorHelpers.ts";
import {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "./chatCore/passthroughHelpers.ts";
import { runProviderExecutionPipeline } from "./chatCore/providerExecutionPipeline.ts";
import { onStreamThrow } from "./chatCore/recoveryPolicy.ts";
import { runNonStreamingProviderLeg } from "./chatCore/nonStreamingProviderLeg.ts";
import type { NonStreamingProviderLegResult } from "@/lib/skills/toolLoopTypes.ts";
import {
  applyServerOwnedToolLoopIfNeeded,
  derivePostInjectionRequestIdentity,
  followUpLegInput,
} from "./chatCore/serverOwnedToolLoopWire.ts";
import { finalizeToolLoopError } from "./chatCore/nonStreamingFinalization.ts";
import { markCodexScopeRateLimited } from "./chatCore/codexFailover.ts";
import { deleteSessionAccountAffinity } from "@/lib/db/sessionAccountAffinity";
import {
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
} from "./chatCore/responseHeaders.ts";
import { maybeSyncClaudeExtraUsageState } from "./chatCore/telemetryHelpers.ts";
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
import { runMemoryExtractionGate } from "./chatCore/memoryExtraction.ts";
import { normalizeHeaders } from "../utils/headers.ts";
import { translateRequest, needsTranslation } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
  COLORS,
} from "../utils/stream.ts";
import { ensureStreamReadiness } from "../utils/streamReadiness.ts";
import { resolveSuppressThinkClose } from "../utils/thinkCloseMarker.ts";
import { resolveStreamReadinessTimeout } from "../utils/streamReadinessPolicy.ts";
import * as streamFailure from "../utils/streamFailureFinalization.ts";
import { normalizeUsage } from "../utils/usageTracking.ts";
import {
  refreshWithRetry,
  isUnrecoverableRefreshError,
  runWithOnPersist,
  runWithCasGuard,
} from "../services/tokenRefresh.ts";
import { runWithCapture } from "../utils/providerRequestLogging.ts";
import { echoModelInObject } from "../services/responseModelEcho.ts";
import { isServerOwnedToolLoopEnabled } from "@/shared/utils/featureFlags.ts";
import {
  REASONING_BUFFER_MIN_TRIGGER,
  buildReasoningProbeTruncatedResponse,
  isEmptyContentUpstreamFailure,
  isTinyBudgetReasoningProbe,
  toPositiveInteger,
} from "../services/reasoningTokenBuffer.ts";
import {
  buildErrorBody,
  createErrorResult,
  parseUpstreamError,
  formatProviderError,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import {
  reportMalformed200,
  detectMalformedNonStream,
  describeMalformedNonStream,
} from "../utils/diagnostics.ts";
import { checkTokenLimits } from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import {
  COOLDOWN_MS,
  HTTP_STATUS,
  STREAM_READINESS_MAX_TIMEOUT_MS,
  STREAM_READINESS_TIMEOUT_MS,
  ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
  STREAM_DISCONNECT_GRACE_PERIOD_MS,
} from "../config/constants.ts";
import { applyStatusRestatement } from "../config/upstreamStatusRestatement.ts";
import { classifyProviderError, PROVIDER_ERROR_TYPES } from "../services/errorClassifier.ts";
import { updateProviderConnection, getProviderConnectionById } from "@/lib/db/providers";
import { wasRefreshTokenRotated } from "@omniroute/open-sse/services/refreshSerializer.ts";
import { connectionHasExtraKeys } from "../services/apiKeyRotator.ts";
import { getSkillsModelIdForFormat } from "./chatCore/skillsFormat.ts";
import {
  isSemaphoreCapacityError,
  createStreamingErrorResult,
  getUpstreamErrorIdentifier,
} from "./chatCore/streamErrorResult.ts";
import { buildCacheUsageLogMeta } from "./chatCore/cacheUsageMeta.ts";
import { buildExecutorClientHeaders } from "./chatCore/executorClientHeaders.ts";
import { getExecutionConnectionId } from "./chatCore/executionCredentials.ts";
import { executeProviderRequest as executeProviderRequestFromLeaf } from "./chatCore/executeProviderRequest.ts";
import { getQuotaScopeLabelForProvider } from "../services/antigravityQuotaFamily.ts";
import { getKimiTemporaryRateLimitResetAt } from "./chatCore/kimiQuotaRecovery.ts";
import { logAuditEvent } from "@/lib/compliance";
import { trackPendingRequest, appendRequestLog, saveRequestUsage } from "@/lib/usageDb";
import { finalizePendingScope, updatePendingScope } from "@/lib/usage/pendingRequestScope";
import { recordCost } from "@/domain/costRules";
import { calculateCost } from "@/lib/usage/costCalculator";
import { mergeResponseToolNameMap } from "./chatCore/passthroughToolNames.ts";
import { recordContextEditingTelemetryHook } from "./chatCore/contextEditingTelemetry.ts";
import { attachCompressionUsageReceiptAfterAnalytics as attachCompressionUsageReceiptAfterAnalyticsFor } from "./chatCore/compressionUsageReceipt.ts";
import { scheduleQuotaShareConsumption } from "./chatCore/quotaShareConsumption.ts";
import { emitRequestGamificationEvent } from "./chatCore/gamificationEvent.ts";
import { runPluginOnResponseHook } from "./chatCore/pluginOnResponse.ts";
import { isJsonRecord } from "./chatCore/nonStreamingResponseParse.ts";
import { recordNonStreamingUsageStats } from "./chatCore/nonStreamingUsageStats.ts";
import { normalizeExecutorResult } from "./chatCore/upstreamTimeouts.ts";
import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/db/models";
import { getProviderCredentials, extractSessionAffinityKey } from "@/sse/services/auth";

import { guardrailRegistry } from "@/lib/guardrails";

import { extractUsageFromResponse } from "./usageExtractor.ts";
import { updateFromHeaders, updateFromResponseBody } from "../services/rateLimitManager.ts";
import * as localLimiterErrors from "../services/rateLimitManager/errors.ts";
import { markBlocked as markAccountSemaphoreBlocked } from "../services/accountSemaphore.ts";
import {
  lockModel,
  lockModelIfPerModelQuota,
  hasPerModelQuota,
  recordCoreOwnedAntigravityQuotaState,
  shouldDeferAntigravityQuotaStateToCaller,
} from "../services/accountFallback.ts";
import { saveIdempotency } from "@/lib/idempotencyLayer";
import {
  getNextFamilyFallback,
  isContextOverflowError,
  findLargerContextModel,
  getModelFamily,
} from "../services/modelFamilyFallback.ts";
import { isLocalStreamLifecycleError } from "@/shared/utils/circuitBreaker";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";
import { extractFacts } from "@/lib/memory/extraction";
import { handleToolCallExecution } from "@/lib/skills/interception";
import { MEMORY_BUILTIN_TOOL_NAMES } from "@/lib/skills/memoryBuiltins";
import { classifyModelScope429 } from "../services/modelscopePolicy.ts";
import { incrementTokenUsage, isTpmExhausted } from "../services/geminiRateLimitTracker.ts";
import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";

/**
 * #12150 P1b: shape of handleChatCore's optional `videoBridgeLog` param — see
 * its destructure default below. `handleChatCore`'s own params object has no
 * type annotation (pre-existing convention for this god-function), so this
 * alias is applied via a local cast at each read site instead of widening
 * the whole destructure to a typed object.
 */
type VideoBridgeLogParam = { observed: boolean; redaction: VideoBridgeLogRedactionEntry[] } | null;

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
    isManagedLeaseFenceError,
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
    webFetchFallbackPlan,
    settings,
    isCodexResponsesEcho,
    echoModel,
    skillRequestId,
    pipelineSessionId,
    reasoningCacheScope,
    persistAttemptLogs: persistAttemptLogsPrelude,
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
  } = c1;
  // Closures created in the prelude capture that slice's locals. Rebind the two
  // that later lines assign through (`effectiveServiceTier`, compression
  // analytics write) so call sites after this point still see the live values.
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
  const cacheCompress = await runCacheAndCompress({
    body,
    credentials,
    log,
    clientRawRequest,
    connectionId,
    apiKeyInfo,
    comboName,
    isCombo,
    routingComboId,
    comboStepId,
    comboExecutionKey,
    reasoningTransportFallback,
    provider,
    model,
    startTime,
    traceId,
    getCurrentConnectionId,
    tokensCompressed,
    effectiveServiceTier,
    sourceFormat,
    nativeCodexPassthrough,
    backgroundReason,
    effectiveModel,
    targetFormat,
    preConversionClientToolNames,
    webSearchFallbackPlan,
    webFetchFallbackPlan,
    skillRequestId,
    compressionAnalyticsWritePromise,
    persistAttemptLogs: persistAttemptLogsPrelude,
    stream,
    semanticCacheEnabled,
    reqLogger,
  });
  if (cacheCompress.kind === "return") return cacheCompress.value;
  const c2 = cacheCompress.continue;
  body = c2.body;
  let compressionResponseMeta;
  ({ tokensCompressed, compressionAnalyticsWritePromise, compressionResponseMeta } = c2);
  const {
    injectionResult,
    memoryOwnerId,
    memorySettings,
    contextEditingEnabled,
    preCompressionBody,
    runPostTranslationCompression,
  } = c2;

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
  });
  if (translated.kind === "return") return translated.value;
  const c3 = translated.continue;
  ({ tokensCompressed, compressionAnalyticsWritePromise, compressionResponseMeta } = c3);
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
      detailedLoggingEnabled:
        apiKeyInfo?.noLog !== true &&
        (settings.call_log_pipeline_enabled === true ||
          settings.call_log_pipeline_enabled === "1" ||
          settings.call_log_pipeline_enabled === "true"),
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
      noLogEnabled: apiKeyInfo?.noLog === true,
      correlationId,
      modelPinned,
      sessionTag:
        conversationId ||
        (typeof clientRawRequest?.headers?.get === "function"
          ? clientRawRequest.headers.get("x-omniroute-session-id")
          : getHeaderValueCaseInsensitive(
              clientRawRequest?.headers ?? null,
              "x-omniroute-session-id"
            )),
      videoBridgeLogRedaction: (
        videoBridgeLog as
          | { redaction?: import("@/lib/guardrails/videoBridge").VideoBridgeLogRedactionEntry[] }
          | undefined
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
      isModelScope,
      isOpencodeClient,
      log,
      model,
      onCredentialsRefreshed,
      pendingScope,
      provider,
      providerRequestCapture,
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
  let providerUrl;
  let providerHeaders;
  let finalBody;
  let claudePromptCacheLogMeta = null;

  if (stream) {
    try {
      const pipelineOutcome = await runProviderExecutionPipeline({
        policy: {
          allowAccountRotation: !managedLease && comboStrategy !== "context-relay",
          allowModelFallback: true,
          expectedConnectionId: managedLease
            ? String(getCurrentConnectionId() || connectionId || "") || undefined
            : undefined,
        },
        target: {
          provider,
          requestedModel: effectiveModel,
          sourceFormat,
          targetFormat,
          stream,
        },
        connection: {
          initialConnectionId: String(getCurrentConnectionId() || connectionId || ""),
          getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
          getCredentials: () => (credentials || {}) as Record<string, unknown>,
          replaceCredentials: (next) => {
            Object.assign(credentials, next);
          },
          onCredentialsRefreshed: async () => {},
          assertManagedLeaseFence: (id) => {
            assertManagedLeaseFence(id);
          },
          getProviderCredentials,
        },
        wire: {
          body: translatedBody as Record<string, unknown>,
          currentModel,
          triedModels,
          setBodyAndModel: (body, model) => {
            translatedBody = body as typeof translatedBody;
            currentModel = model;
            triedModels.add(model);
          },
        },
        state: {
          updatePendingStage: (stage, data) => {
            updatePendingScope(pendingScope, { stage, ...(data || {}) });
          },
          recordRateLimitHeaders: updateFromHeaders,
          recordRateLimitBody: updateFromResponseBody,
          writeTerminalStatus,
          persistConnectionPatch: updateProviderConnection,
          setConnectionRateLimitedUntil: async (id, untilMs) => {
            const { setConnectionRateLimitUntil } = await import("@/lib/db/providers");
            setConnectionRateLimitUntil(id, untilMs);
          },
          lockModel,
          recordAntigravityQuotaState: recordCoreOwnedAntigravityQuotaState,
          markAccountSemaphoreBlocked: (key) => {
            markAccountSemaphoreBlocked(key, Date.now() + 60_000);
          },
          isolateProbeFailures: () => shouldIsolateProbeFailures(),
          onCodexScopeRateLimited: async (params) => {
            await markCodexScopeRateLimited({
              failedConnectionId: params.failedConnectionId,
              model: params.model,
              rateLimitedUntil: params.rateLimitedUntil,
              credentials: (params.credentials || credentials) as {
                connectionId?: string | null;
                providerSpecificData?: unknown;
              },
            });
          },
          onClearSessionAffinity: () => {
            const key =
              sessionAffinityKey ||
              extractSessionAffinityKey(body, clientRawRequest?.headers) ||
              null;
            if (!key) return;
            try {
              deleteSessionAccountAffinity(key, "codex");
            } catch {
              // best-effort
            }
          },
          onAuditAccountRotation: (params) => {
            logAuditEvent({
              action: params.action,
              actor: apiKeyInfo?.name || "system",
              target: params.newConnectionId,
              details: {
                failed_connection_id: params.failedConnectionId,
                new_connection_id: params.newConnectionId,
                attempt: params.attempt,
                retry_after_ms: params.retryAfterMs,
              },
            });
          },
        },
        sendProviderAttempt: (modelToCall, allowDedup) =>
          executeProviderRequest(modelToCall, allowDedup),
      });

      currentModel = pipelineOutcome.model;
      if (pipelineOutcome.kind === "error") {
        providerResponse = pipelineOutcome.result.response;
        providerUrl = "";
        providerHeaders = normalizeHeaders(pipelineOutcome.result.response.headers);
        finalBody = translatedBody;
      } else {
        const result = {
          response: pipelineOutcome.response,
          url: pipelineOutcome.url,
          headers: pipelineOutcome.headers,
          transformedBody: pipelineOutcome.transformedBody,
        };
        providerResponse = result.response;
        providerUrl = result.url;
        providerHeaders = result.headers;
        finalBody = providerRequestCapture.body(result.transformedBody);
      }
      const responseConnectionId = getCurrentConnectionId();
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
        responseConnectionId,
        providerResponse.headers,
        providerResponse.status,
        model
      );

      // Store rate-limit headers for quota saturation signals
      try {
        const { storeRateLimitHeaders } = await import("@/lib/quota/saturationSignals");
        storeRateLimitHeaders(
          responseConnectionId,
          provider,
          providerResponse.headers as Record<string, string>
        );
      } catch {
        // fail-open: saturation signal is best-effort
      }
    } catch (error) {
      onStreamThrow();
      trackPendingRequest(model, provider, connectionId, false);
      if (isManagedLeaseFenceError(error)) return managedLeaseFenceErrorResult(error);
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
      // abort(reason) can reject with a raw string lacking `name`/`status`; classify
      // it through isLocalStreamLifecycleError so it maps to 499 rather than the
      // 502 provider-failure default.
      const isRequestAborted = isLocalStreamLifecycleError(error);
      // #8376: proxyFetch tags unreachable transport failures so they remain
      // distinguishable from ordinary provider 5xx responses.
      const isProxyUnreachableFailure =
        !isRequestAborted && (error as { errorCode?: unknown })?.errorCode === "proxy_unreachable";
      const errorCode = getUpstreamErrorIdentifier(error);
      const localRateLimitFailure = localLimiterErrors.getClientSafeLocalRateLimitError(error);
      const failureStatus = isRequestAborted
        ? 499
        : isProxyUnreachableFailure
          ? HTTP_STATUS.BAD_GATEWAY
          : localRateLimitFailure
            ? localRateLimitFailure.status
            : error.name === "TimeoutError" || error.name === "BodyTimeoutError"
              ? HTTP_STATUS.GATEWAY_TIMEOUT
              : error.status && typeof error.status === "number"
                ? error.status
                : HTTP_STATUS.BAD_GATEWAY;
      const failureMessage = isRequestAborted
        ? "Request aborted"
        : formatProviderError(localRateLimitFailure ?? error, provider, model, failureStatus);
      const upstreamErrorCode =
        localRateLimitFailure?.code ??
        (isProxyUnreachableFailure ? "proxy_unreachable" : errorCode);
      // Tag our own deadline timeouts (fetch-start TimeoutError / body BodyTimeoutError,
      // both surfaced as a 504) as "upstream_timeout" so the cooldown layer can tell a
      // slow-but-not-failed request apart from a real provider 5xx. (Antigravity already
      // tags its pre-response timeout via the code below.)
      const isOwnDeadlineTimeout =
        failureStatus === HTTP_STATUS.GATEWAY_TIMEOUT &&
        (error.name === "TimeoutError" || error.name === "BodyTimeoutError");
      const upstreamErrorType =
        upstreamErrorCode === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE || isOwnDeadlineTimeout
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
        // On a client-abort (AbortError), the client already disconnected before
        // we ever got here — this body is what we WOULD have sent, not what was
        // actually delivered. Logging it as `clientResponse` is misleading (the
        // dashboard reads that field as "what the client received"), so omit it
        // for this case; `error` above already records the failure reason.
        clientResponse:
          error.name === "AbortError" ? undefined : buildErrorBody(failureStatus, failureMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        cacheSource: "upstream",
      });
      if (isRequestAborted) {
        streamController.handleError(error);
        return createErrorResult(499, "Request aborted");
      }
      const persistentErrorCode = projectFailureUsageErrorCode({
        statusCode: failureStatus,
        message: failureMessage,
        errorCode:
          upstreamErrorCode ||
          (error instanceof Error && error.name ? error.name : "upstream_error"),
        errorType: upstreamErrorType,
      });
      persistFailureUsage(failureStatus, persistentErrorCode);
      console.log(`${COLORS.red}[ERROR] ${failureMessage}${COLORS.reset}`);
      if (stream && upstreamErrorCode) {
        const result = createStreamingErrorResult(
          failureStatus,
          failureMessage,
          upstreamErrorCode,
          upstreamErrorType
        );
        localLimiterErrors.markTrustedLocalRateLimitResponse(result.response, error);
        return {
          ...result,
          errorType: upstreamErrorType,
          errorCode: upstreamErrorCode,
        };
      }
      const result = createErrorResult(
        failureStatus,
        failureMessage,
        null,
        upstreamErrorCode,
        upstreamErrorType
      );
      localLimiterErrors.markTrustedLocalRateLimitResponse(result.response, error);
      return result;
    }
    let upstreamErrorParsed = false;
    let parsedStatusCode = providerResponse.status;
    let parsedMessage = "";
    let parsedRetryAfterMs: number | null = null;
    let upstreamErrorBody: unknown = null;

    // Track whether stream_options was present and stripped — if so, 401/403 after
    // that may be from the modification rather than a genuine auth failure, so we
    // skip the credential refresh attempt in that case.
    const hadStreamOptions =
      targetFormat === FORMATS.OPENAI_RESPONSES && "stream_options" in translatedBody;
    if (hadStreamOptions) {
      delete translatedBody.stream_options;
    }

    // Handle 401/403 - try token refresh using executor
    // T-PROBE: probe-origin failures never attempt the refresh — a probe must
    // not consume a rotating refresh token nor persist an "expired"
    // deactivation on refresh failure (#9817). The 401/403 then flows into
    // the normal providerFailure classification (record-only in probe mode).
    if (
      (providerResponse.status === HTTP_STATUS.UNAUTHORIZED ||
        providerResponse.status === HTTP_STATUS.FORBIDDEN) &&
      !hadStreamOptions && // Skip refresh if failure may be from stream_options removal, not auth
      !(await shouldIsolateProbeFailures())
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

      // #4038: build a compare-and-swap reread so getAccessToken can skip the persist if a
      // concurrent writer (sibling request / HealthCheck / replica) already rotated this
      // connection's refresh_token past the one we presented — overwriting would revert it
      // and revoke the token family. No connectionId ⇒ no guard (behavior unchanged).
      const casConnectionId =
        typeof credentials?.connectionId === "string" ? credentials.connectionId.trim() : "";
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
            () => runWithOnPersist(persistFn, () => executor.refreshCredentials(credentials, log))
          ),
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
          assertManagedLeaseFence(getExecutionConnectionId(getExecutionCredentials()));
          const retryResult = normalizeExecutorResult(
            await runWithCapture(providerRequestCapture, () =>
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
                clientResponseFormat,
                onCredentialsRefreshed,
                skipUpstreamRetry: isCombo,
                contextEditing: { enabled: contextEditingEnabled },
              })
            )
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
          if (isManagedLeaseFenceError(retryErr)) return managedLeaseFenceErrorResult(retryErr);
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

    // Check provider response - return error info for fallback handling
    providerFailure: if (!providerResponse.ok) {
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

      // Gateways like agentrouter misstate temporary quota exhaustion as 403/400,
      // which downstream classification treats as AUTH_ERROR and clients like
      // Claude Code treat as permanent. Restate to 429 (+ synthetic Retry-After)
      // BEFORE any classification so both the fallback engine and the surfaced
      // client status see a retryable error. Registry-scoped per provider.
      const restatement = applyStatusRestatement({
        provider,
        status: statusCode,
        message,
        body: upstreamErrorBody,
        retryAfterMs,
      });
      if (restatement.ruleId) {
        statusCode = restatement.status;
        retryAfterMs = restatement.retryAfterMs;
        log?.info?.(
          "STATUS_RESTATE",
          `${provider} ${restatement.fromStatus}→${statusCode} (${restatement.ruleId})`
        );
      }

      // #10281 — tiny-budget reasoning probes (e.g. Claude Code's `/model` check
      // sends `max_tokens: 1`): the model burns the whole budget on thinking, and
      // some upstreams (e.g. api.cline.bot for deepseek-v4-flash) answer the empty
      // outcome with a 5xx ("empty response content") instead of a truncated 200.
      // Answer such probes with a valid truncated response rather than relaying the
      // upstream failure — which would also mark the connection unavailable and
      // poison fallback/cooldown bookkeeping for a request that is only a probe.
      if (
        !stream &&
        isTinyBudgetReasoningProbe({ model: currentModel, body: finalBody || translatedBody }) &&
        isEmptyContentUpstreamFailure(statusCode, message)
      ) {
        providerResponse = buildReasoningProbeTruncatedResponse({
          model: currentModel,
          maxTokens: toPositiveInteger(
            (finalBody || translatedBody)?.max_tokens ??
              (finalBody || translatedBody)?.max_completion_tokens
          ),
          requestId: skillRequestId,
        });
        log?.warn?.(
          "PROBE",
          `Reasoning probe (max_tokens < ${REASONING_BUFFER_MIN_TRIGGER}) answered with truncated 200 — upstream reported "${message}"`
        );
        break providerFailure;
      }

      // T06/T10/T36: classify provider errors and persist terminal account states.
      let errorType = classifyProviderError(statusCode, message, provider);
      if (statusCode === 429 && isModelScope) {
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
      // Classifiers and recovery paths above consume the raw provider wording.
      // Project a separate value only at persistent connection-state boundaries.
      const persistentMessage = sanitizeErrorMessage(message) || "Provider request failed";
      const errorConnectionId = getCurrentConnectionId();
      if (errorConnectionId && errorType) {
        try {
          if (errorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
            {
              const probeIsolated = await shouldIsolateProbeFailures();
              await writeTerminalStatus(
                errorConnectionId,
                {
                  testStatus: "banned",
                  isActive: false,
                  lastError: persistentMessage,
                  lastErrorType: errorType,
                  errorCode: String(statusCode),
                },
                probeIsolated ? "probe" : "production"
              );
              if (probeIsolated) {
                console.warn(
                  `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) — connection stays active`
                );
              } else if (hasPerModelQuota(provider, model)) {
                // Compatible / passthrough gateways: a 402 without a model id
                // still must not terminalize the whole connection. Record the
                // error for operators; sibling models stay selectable.
                await updateProviderConnection(errorConnectionId, {
                  lastErrorType: errorType,
                  lastError: persistentMessage,
                  errorCode: statusCode,
                });
                console.warn(
                  `[provider] Node ${errorConnectionId} per-model quota exhausted (${statusCode}) — connection stays active`
                );
              } else {
                console.warn(
                  `[provider] Node ${errorConnectionId} banned (${statusCode}) — disabling permanently`
                );
              }
            }
          } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
            // T-PROBE: probe-origin failures (test-all) never deactivate —
            // record but stay active; Plan A (extra keys) stays first so the
            // real path keeps its existing priority (#9817).
            // Plan A: if connection has extra API keys, don't disable — only the failing key is affected.
            // Single-key connections still get disabled as before.
            if (
              connectionHasExtraKeys(
                errorConnectionId,
                (credentials?.providerSpecificData as Record<string, unknown> | undefined)
                  ?.extraApiKeys as string[] | undefined
              )
            ) {
              await updateProviderConnection(errorConnectionId, {
                lastErrorType: errorType,
                lastError: persistentMessage,
                errorCode: statusCode,
              });
              console.warn(
                `[provider] Node ${errorConnectionId} account deactivated (${statusCode}) — has extra keys, keeping connection active`
              );
            } else {
              const probeIsolated2 = await shouldIsolateProbeFailures();
              await writeTerminalStatus(
                errorConnectionId,
                {
                  testStatus: "deactivated",
                  isActive: false,
                  lastError: persistentMessage,
                  lastErrorType: errorType,
                  errorCode: String(statusCode),
                },
                probeIsolated2 ? "probe" : "production"
              );
              if (probeIsolated2) {
                console.warn(
                  `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) — connection stays active`
                );
              } else {
                console.warn(
                  `[provider] Node ${errorConnectionId} account deactivated (${statusCode}) — disabling permanently`
                );
              }
            }
          } else if (errorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED) {
            {
              const probeIsolated3 = await shouldIsolateProbeFailures();
              if (probeIsolated3) {
                await writeTerminalStatus(
                  errorConnectionId,
                  {
                    testStatus: "credits_exhausted",
                    lastError: persistentMessage,
                    lastErrorType: errorType,
                    errorCode: String(statusCode),
                  },
                  "probe"
                );
                console.warn(
                  `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) — connection stays active`
                );
              } else {
                // Kimi's 403 says "billing cycle" for both an exhausted subscription and a
                // temporary request window. Read its official usage endpoint before making
                // the connection terminal: a non-zero Weekly quota plus an empty Ratelimit
                // window must recover automatically at the reported reset time.
                let kimiRateLimitResetAt: string | null = null;
                if (provider === "kimi-coding") {
                  try {
                    const { fetchAndPersistProviderLimits } =
                      await import("@/lib/usage/providerLimits");
                    const { usage } = await fetchAndPersistProviderLimits(
                      errorConnectionId,
                      "manual"
                    );
                    kimiRateLimitResetAt = getKimiTemporaryRateLimitResetAt(usage);
                  } catch {
                    // Preserve the existing quota handling when Kimi's usage endpoint is unavailable.
                  }
                }

                // Providers with per-model quotas — lock the model only, not the connection
                let quotaCooldownMs = kimiRateLimitResetAt
                  ? Math.max(new Date(kimiRateLimitResetAt).getTime() - Date.now(), 0)
                  : retryAfterMs || COOLDOWN_MS.rateLimit;
                const deferAntigravityQuotaStateToCaller = shouldDeferAntigravityQuotaStateToCaller(
                  provider,
                  typeof onStreamFailure === "function"
                );
                const isAntigravityQuotaFamily = shouldDeferAntigravityQuotaStateToCaller(
                  provider,
                  true
                );
                let coreOwnedAntigravityLockout: {
                  cooldownMs: number;
                  failureCount: number;
                } | null = null;
                if (isAntigravityQuotaFamily && !deferAntigravityQuotaStateToCaller) {
                  const quotaErrorText =
                    typeof upstreamErrorBody === "string"
                      ? upstreamErrorBody
                      : upstreamErrorBody == null
                        ? message
                        : JSON.stringify(upstreamErrorBody);
                  coreOwnedAntigravityLockout = await recordCoreOwnedAntigravityQuotaState({
                    provider,
                    connectionId: errorConnectionId,
                    model,
                    status: statusCode,
                    errorText: quotaErrorText,
                    headers: providerResponse.headers,
                  });
                  quotaCooldownMs = coreOwnedAntigravityLockout.cooldownMs;
                }
                const accountSemaphoreKey = resolveAccountSemaphoreKey({
                  provider,
                  model: currentModel,
                  connectionId: errorConnectionId,
                  credentials,
                });
                if (accountSemaphoreKey && !deferAntigravityQuotaStateToCaller) {
                  markAccountSemaphoreBlocked(accountSemaphoreKey, quotaCooldownMs);
                }
                if (deferAntigravityQuotaStateToCaller) {
                  // Defer both model and account-semaphore cooldowns to
                  // markAccountUnavailable, where header/body provenance and the
                  // configured maxCooldownMs are available. Direct consumers such
                  // as Responses pass no owner callback and retain core ownership.
                } else if (coreOwnedAntigravityLockout) {
                  console.warn(
                    `[provider] Node ${errorConnectionId} Antigravity model quota exhausted (${statusCode}) for ${model} - ${Math.ceil(coreOwnedAntigravityLockout.cooldownMs / 1000)}s (failureCount=${coreOwnedAntigravityLockout.failureCount}, owner=core)`
                  );
                } else if (kimiRateLimitResetAt) {
                  await updateProviderConnection(errorConnectionId, {
                    testStatus: "unavailable",
                    rateLimitedUntil: kimiRateLimitResetAt,
                    backoffLevel: 0,
                    lastErrorType: PROVIDER_ERROR_TYPES.RATE_LIMITED,
                    lastError: persistentMessage,
                    errorCode: statusCode,
                  });
                  console.warn(
                    `[provider] Node ${errorConnectionId} Kimi request window exhausted (${statusCode}) — retrying after ${kimiRateLimitResetAt}`
                  );
                } else if (isModelScope && errorConnectionId) {
                  lockModel(provider, errorConnectionId, model, "quota_exhausted", quotaCooldownMs);
                  console.warn(
                    `[provider] Node ${errorConnectionId} ModelScope model quota exhausted (${statusCode}) for ${model} - ${Math.ceil(quotaCooldownMs / 1000)}s (connection stays active)`
                  );
                } else if (
                  lockModelIfPerModelQuota(
                    provider,
                    errorConnectionId,
                    model,
                    "quota_exhausted",
                    quotaCooldownMs
                  )
                ) {
                  const quotaScope = getQuotaScopeLabelForProvider(provider, model);
                  console.warn(
                    `[provider] Node ${errorConnectionId} ${quotaScope}-only quota exhausted (${statusCode}) for ${model} - ${Math.ceil(quotaCooldownMs / 1000)}s (cooldown_scope=${quotaScope}, ttl_source=${retryAfterMs ? "upstream" : "inferred"}, connection stays active)`
                  );
                } else {
                  await writeTerminalStatus(
                    errorConnectionId,
                    {
                      testStatus: "credits_exhausted",
                      lastError: persistentMessage,
                      lastErrorType: errorType,
                      errorCode: String(statusCode),
                    },
                    "production"
                  );
                  console.warn(
                    `[provider] Node ${errorConnectionId} exhausted quota (${statusCode})`
                  );
                }
              } // close probeIsolated3 else
            }
          } else if (errorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED) {
            // Normal 401 (token/session auth issue): keep account active for refresh/re-auth.
            await updateProviderConnection(errorConnectionId, {
              lastErrorType: errorType,
              lastError: persistentMessage,
              errorCode: statusCode,
            });
          } else if (errorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN) {
            // OAuth 401 with invalid credentials - token refresh can recover
            await updateProviderConnection(errorConnectionId, {
              lastErrorType: errorType,
              lastError: persistentMessage,
              errorCode: statusCode,
            });
            console.warn(
              `[provider] Node ${errorConnectionId} OAuth token invalid (${statusCode}) — token refresh available`
            );
          } else if (errorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR) {
            // Cloud Code 403 with stale project: not a ban, keep account active.
            await updateProviderConnection(errorConnectionId, {
              lastErrorType: errorType,
              lastError: persistentMessage,
              errorCode: statusCode,
            });
            console.warn(
              `[provider] Node ${errorConnectionId} project routing error (${statusCode}) — not banning`
            );
          } else if (errorType === PROVIDER_ERROR_TYPES.GEO_BLOCKED) {
            // Google regional-availability refusal (e.g. "User location is not
            // supported for the API use."). Account-independent and non-terminal:
            // exclude the connection for the cooldown window so routing moves to
            // other accounts instead of re-selecting this one on every request,
            // and never mark it banned/expired. It becomes usable again once
            // egress is routed through a supported-region proxy.
            const geoCooldownMs = COOLDOWN_MS.geoBlocked ?? 24 * 60 * 60 * 1000;
            await updateProviderConnection(errorConnectionId, {
              lastErrorType: errorType,
              lastError: persistentMessage,
              errorCode: statusCode,
            });
            // T-PROBE: the 24h exclusion is a routing mutation — a probe must
            // not push a connection into a day-long cooldown (#9817).
            if (!(await shouldIsolateProbeFailures())) {
              try {
                const { setConnectionRateLimitUntil } = await import("@/lib/db/providers");
                setConnectionRateLimitUntil(errorConnectionId, Date.now() + geoCooldownMs);
              } catch {
                // DB write failure must never break the fallback loop
              }
            }
            console.warn(
              `[provider] Node ${errorConnectionId} geo-blocked (${statusCode}) — excluded for ${Math.ceil(geoCooldownMs / 1000)}s, trying other accounts`
            );
          } else if (errorType === PROVIDER_ERROR_TYPES.GCP_PROJECT_REQUIRED) {
            // Antigravity BYOP: the account must Bring Its Own GCP Project.
            // Account-specific and fixable by entering a Project ID — never a
            // model lockout, never a ban. Exclude the connection for the
            // cooldown window so selection prefers sibling accounts; the 422
            // body carries the actionable message when no sibling is available.
            const byopCooldownMs = COOLDOWN_MS.gcpProjectRequired ?? 24 * 60 * 60 * 1000;
            await updateProviderConnection(errorConnectionId, {
              lastErrorType: errorType,
              lastError: persistentMessage,
              errorCode: statusCode,
            });
            console.warn(
              `[provider] Node ${errorConnectionId} GCP project required (${statusCode}) — excluded for ${Math.ceil(byopCooldownMs / 1000)}s, routing to other accounts (enter a Project ID to restore)`
            );
          } else if (errorType === PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND) {
            // 404 — model/endpoint does not exist upstream. Lock the model so the
            // retry/backoff loop stops hammering the dead endpoint (which would
            // otherwise degenerate into a 429 rate-limit storm). Connection stays
            // active since only the specific model is unavailable. (#6827)
            const notFoundCooldownMs = COOLDOWN_MS.notFound;
            // T-PROBE: the model lockout is a routing mutation — a probe must
            // not lock a model for the cooldown window (#9817).
            if (!(await shouldIsolateProbeFailures())) {
              lockModel(
                provider,
                errorConnectionId,
                currentModel,
                "model_not_found",
                notFoundCooldownMs
              );
              console.warn(
                `[provider] Node ${errorConnectionId} model not found (${statusCode}) for ${currentModel} - locking model for ${Math.ceil(notFoundCooldownMs / 1000)}s (connection stays active)`
              );
            }
          }
        } catch {
          // Best-effort state update; request flow should continue with fallback handling.
        }
      }

      appendRequestLog({
        model,
        provider,
        connectionId: errorConnectionId,
        status: `FAILED ${statusCode}`,
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
      reqLogger.logProviderResponse(
        providerResponse.status,
        providerResponse.statusText,
        providerResponse.headers,
        upstreamErrorBody
      );

      // Update rate limiter from error response headers
      updateFromHeaders(provider, errorConnectionId, providerResponse.headers, statusCode, model);
      if (errorConnectionId && upstreamErrorBody !== null && upstreamErrorBody !== undefined) {
        updateFromResponseBody(provider, errorConnectionId, upstreamErrorBody, statusCode, model);
      }

      if (isContextOverflowError(statusCode, message)) {
        const familyCandidates = getModelFamily(currentModel, provider).filter(
          (m) => m !== currentModel && !triedModels.has(m)
        );
        const nextModel =
          findLargerContextModel(currentModel, familyCandidates, provider) ??
          getNextFamilyFallback(currentModel, triedModels, provider);
        if (nextModel) {
          triedModels.add(nextModel);
          currentModel = nextModel;
          translatedBody.model = nextModel;
          log?.info?.(
            "CONTEXT_OVERFLOW_FALLBACK",
            `${model} context overflow → trying ${nextModel}`
          );
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
                upstreamErrorBody,
                { passthrough: sourceFormat === FORMATS.CLAUDE }
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
              upstreamErrorBody,
              { passthrough: sourceFormat === FORMATS.CLAUDE }
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
            upstreamErrorBody,
            { passthrough: sourceFormat === FORMATS.CLAUDE }
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
          upstreamErrorBody,
          { passthrough: sourceFormat === FORMATS.CLAUDE }
        );
      }
    }
  }

  // Non-streaming response
  if (!stream) {
    try {
      const runNonStreamingPipeline = async ({
        policy,
        model: pipelineModel,
        translatedBody: wireBody,
      }) => {
        translatedBody = wireBody as typeof translatedBody;
        currentModel = pipelineModel;
        triedModels.add(pipelineModel);
        return runProviderExecutionPipeline({
          policy,
          target: {
            provider,
            requestedModel: pipelineModel,
            sourceFormat,
            targetFormat,
            stream: false,
          },
          connection: {
            initialConnectionId: String(getCurrentConnectionId() || connectionId || ""),
            getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
            getCredentials: () => (credentials || {}) as Record<string, unknown>,
            replaceCredentials: (next) => {
              Object.assign(credentials, next);
            },
            onCredentialsRefreshed: async () => {},
            assertManagedLeaseFence: (id) => {
              assertManagedLeaseFence(id);
            },
            getProviderCredentials,
          },
          wire: {
            body: translatedBody as Record<string, unknown>,
            currentModel,
            triedModels,
            setBodyAndModel: (nextBody, nextModel) => {
              translatedBody = nextBody as typeof translatedBody;
              currentModel = nextModel;
              triedModels.add(nextModel);
            },
          },
          state: {
            updatePendingStage: (stage, data) => {
              updatePendingScope(pendingScope, { stage, ...(data || {}) });
            },
            recordRateLimitHeaders: updateFromHeaders,
            recordRateLimitBody: updateFromResponseBody,
            writeTerminalStatus,
            persistConnectionPatch: updateProviderConnection,
            setConnectionRateLimitedUntil: async (id, untilMs) => {
              const { setConnectionRateLimitUntil } = await import("@/lib/db/providers");
              setConnectionRateLimitUntil(id, untilMs);
            },
            lockModel,
            recordAntigravityQuotaState: recordCoreOwnedAntigravityQuotaState,
            markAccountSemaphoreBlocked: (key) => {
              markAccountSemaphoreBlocked(key, Date.now() + 60_000);
            },
            isolateProbeFailures: () => shouldIsolateProbeFailures(),
            onCodexScopeRateLimited: async (params) => {
              await markCodexScopeRateLimited({
                failedConnectionId: params.failedConnectionId,
                model: params.model,
                rateLimitedUntil: params.rateLimitedUntil,
                credentials: (params.credentials || credentials) as {
                  connectionId?: string | null;
                  providerSpecificData?: unknown;
                },
              });
            },
            onClearSessionAffinity: () => {
              const key =
                sessionAffinityKey ||
                extractSessionAffinityKey(body, clientRawRequest?.headers) ||
                null;
              if (!key) return;
              try {
                deleteSessionAccountAffinity(key, "codex");
              } catch {
                // best-effort
              }
            },
            onAuditAccountRotation: (params) => {
              logAuditEvent({
                action: params.action,
                actor: apiKeyInfo?.name || "system",
                target: params.newConnectionId,
                details: {
                  failed_connection_id: params.failedConnectionId,
                  new_connection_id: params.newConnectionId,
                  attempt: params.attempt,
                  retry_after_ms: params.retryAfterMs,
                },
              });
            },
          },
          sendProviderAttempt: (modelToCall, allowDedup) =>
            executeProviderRequest(modelToCall, allowDedup),
        });
      };

      let toolLoopRan = false;
      let toolLoopUsage = null;
      let legResult = await runNonStreamingProviderLeg({
        phase: "initial",
        sourceBody: (body || {}) as Record<string, unknown>,
        expectedConnectionId: managedLease
          ? String(getCurrentConnectionId() || connectionId || "") || undefined
          : undefined,
        allowAccountRotation: !managedLease && comboStrategy !== "context-relay",
        allowModelFallback: true,
        executeProviderRequest: (modelToCall, allowDedup) =>
          executeProviderRequest(modelToCall, allowDedup),
        runProviderExecution: runNonStreamingPipeline,
        setRequestWireState: ({ translatedBody: nextBody, effectiveModel: nextModel }) => {
          translatedBody = nextBody as typeof translatedBody;
          currentModel = nextModel;
          triedModels.add(nextModel);
        },
        sourceFormat,
        targetFormat,
        clientResponseFormat,
        provider,
        model: effectiveModel,
        connectionId: String(getCurrentConnectionId() || connectionId || ""),
        getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
        effectiveModel: currentModel,
        translatedBody: translatedBody as Record<string, unknown>,
        toolNameMap,
        requestToolIdentityMap,
        reasoningCacheScope,
        clientHeaders: clientRawRequest?.headers ?? null,
        isClaudeCodeCompatible,
        log,
      });

      if (legResult.kind === "error") {
        const err = legResult.result;
        const captured = providerRequestCapture.latest?.() ?? null;
        finalBody = captured?.body ?? finalBody ?? translatedBody;
        if (captured) {
          reqLogger.logTargetRequest(captured.url, captured.headers, captured.body);
        }
        reqLogger.logError(new Error(err.error || "Provider request failed"), finalBody);
        const isNetworkThrow = Boolean(err.originalError);
        if (err.response && !isNetworkThrow) {
          reqLogger.logProviderResponse(
            err.status,
            err.response.statusText || "Error",
            err.response.headers,
            err.response
          );
        }
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${err.status}`,
        }).catch(() => {});
        persistAttemptLogs({
          status: err.status,
          error: err.error || "Provider request failed",
          providerRequest: finalBody || translatedBody,
          providerResponse: isNetworkThrow ? undefined : err.response,
          // On a client abort the client already disconnected before we got here, so this
          // body is what we WOULD have sent, not what was delivered. The dashboard reads
          // `clientResponse` as "what the client received", so logging it misleads —
          // `error` above already records the reason. The pre-#12867 path omitted it here;
          // the leg-based path must keep doing so.
          clientResponse: isLocalStreamLifecycleError(err.originalError)
            ? undefined
            : buildErrorBody(err.status, err.error || "Provider request failed"),
          cacheSource: "upstream",
        });
        persistFailureUsage(err.status, err.errorCode || `upstream_${err.status}`);
        trackPendingRequest(model, provider, connectionId, false);
        return err;
      }

      const expectedConn = managedLease
        ? String(getCurrentConnectionId() || connectionId || "") || undefined
        : undefined;
      // The identity is the tool loop's execution fence key, and deriveToolRequestIdentity
      // canonicalizes the body — which by design rejects Dates, Maps and class instances.
      // It was computed eagerly, so a body carrying any of those threw on EVERY
      // non-streaming request even with SERVER_OWNED_TOOL_LOOP_ENABLED off (the default).
      // Derive it only when the loop can run, and fail closed rather than crash: no
      // identity means no fence, and without a fence the loop must not run.
      let toolLoopEnabled = isServerOwnedToolLoopEnabled();
      let postInjectionRequestIdentity = "";
      if (toolLoopEnabled) {
        try {
          postInjectionRequestIdentity = derivePostInjectionRequestIdentity({
            apiKeyId: memoryOwnerId || "local",
            headers: clientRawRequest?.headers ?? null,
            skillRequestId,
            postInjectionBody: (body || {}) as Record<string, unknown>,
          });
        } catch (identityError) {
          log?.warn?.(
            "SERVER_OWNED_TOOL_LOOP",
            `request body is not canonicalizable, skipping the loop: ${
              identityError instanceof Error ? identityError.message : "unknown"
            }`
          );
          toolLoopEnabled = false;
        }
      }
      const loopApply = await applyServerOwnedToolLoopIfNeeded({
        enabled: toolLoopEnabled,
        stream,
        isResponsesEndpoint,
        sourceFormat,
        initialLeg: legResult,
        sourceBody: (body || {}) as Record<string, unknown>,
        skillsModelId: getSkillsModelIdForFormat(sourceFormat),
        executionContext: {
          apiKeyId: memoryOwnerId || "local",
          sessionId: pipelineSessionId,
          requestId: skillRequestId,
          requestIdentity: postInjectionRequestIdentity,
          builtinToolNames: injectionResult.builtinToolNames,
          injectedCustomSkillNames: injectionResult.injectedCustomSkillNames,
          customSkillExecutionEnabled:
            Boolean(memoryOwnerId) && memorySettings?.skillsEnabled === true,
          executionFenceEnabled: true,
          provider,
          model: effectiveModel,
        },
        abortSignal: clientRawRequest?.signal,
        expectedConnectionId: expectedConn,
        followUpLeg: async (nextSourceBody) => {
          translatedBody = translateRequest(
            sourceFormat,
            targetFormat,
            model,
            { ...nextSourceBody },
            false,
            credentials,
            provider,
            reqLogger,
            {
              normalizeToolCallId: getModelNormalizeToolCallId(
                provider || "",
                model || "",
                sourceFormat
              ),
              preserveDeveloperRole: getModelPreserveOpenAIDeveloperRole(
                provider || "",
                model || "",
                sourceFormat
              ),
              preserveCacheControl,
              signatureNamespace: connectionId,
              copilotClient: copilotCompatibleReasoning,
              reasoningCacheScope,
            }
          );
          return runNonStreamingProviderLeg(
            followUpLegInput(
              {
                executeProviderRequest: (modelToCall, allowDedup) =>
                  executeProviderRequest(modelToCall, allowDedup),
                runProviderExecution: runNonStreamingPipeline,
                setRequestWireState: ({ translatedBody: nextBody, effectiveModel: nextModel }) => {
                  translatedBody = nextBody as typeof translatedBody;
                  currentModel = nextModel;
                  triedModels.add(nextModel);
                },
                sourceFormat,
                targetFormat,
                clientResponseFormat,
                provider,
                model: effectiveModel,
                connectionId: String(getCurrentConnectionId() || connectionId || ""),
                getCurrentConnectionId: () => getCurrentConnectionId() || undefined,
                effectiveModel: currentModel,
                translatedBody: translatedBody as Record<string, unknown>,
                toolNameMap,
                requestToolIdentityMap,
                reasoningCacheScope,
                clientHeaders: clientRawRequest?.headers ?? null,
                isClaudeCodeCompatible,
                log,
              },
              nextSourceBody,
              expectedConn
            )
          );
        },
        logReceipt: (receipt) => reqLogger.logToolLoopReceipt(receipt),
      });
      if (loopApply.kind === "error") {
        return await finalizeToolLoopError({
          loop: loopApply.loop,
          model,
          provider,
          connectionId,
          providerRequest: loopApply.loop.finalProviderRequest || finalBody || translatedBody,
          persistFailureUsage,
          persistAttemptLogs,
          trackPendingRequest,
        });
      }
      // `legResult` is declared as the full NonStreamingProviderLegResult union. The
      // `kind === "error"` guard above narrows it to the ok variant, but the conditional
      // reassignment below widens it back to the declared type, so every field read past
      // this point lost the narrowing — 13 TS2339 diagnostics under
      // tsconfig.typecheck-api.json, which pulls chatCore.ts in through the route while
      // tsconfig.typecheck-core.json does not. Pin the ok variant in its own binding:
      // `loopApply.leg` is already `NonStreamingProviderLegResult & { kind: "ok" }`,
      // so no cast is involved.
      let okLeg: NonStreamingProviderLegResult & { kind: "ok" } = legResult;
      if (loopApply.kind === "ok") {
        toolLoopRan = true;
        toolLoopUsage = loopApply.usage;
        okLeg = loopApply.leg;
      }

      if (okLeg.upstreamResponse) {
        providerResponse = okLeg.upstreamResponse;
        providerHeaders = normalizeHeaders(okLeg.upstreamResponse.headers);
      } else {
        providerResponse = new Response(null, {
          status: 200,
          headers: okLeg.headers,
        });
        providerHeaders = normalizeHeaders(okLeg.headers);
      }
      finalBody = providerRequestCapture.body(okLeg.providerRequest || translatedBody);
      // Built inside executeProviderRequest on the pre-#12867 path. The leg now owns the
      // first non-streaming send, so that assignment never runs here and the meta stayed
      // null — `_omniroute.claudePromptCache` silently vanished from every call log on
      // this path. Same inputs, same helper, at the point where they are available.
      claudePromptCacheLogMeta = buildClaudePromptCacheLogMeta(
        targetFormat,
        finalBody,
        providerHeaders,
        clientRawRequest?.headers
      );
      const capturedOk = providerRequestCapture.latest?.();
      reqLogger.logTargetRequest(
        okLeg.requestUrl || capturedOk?.url || "",
        okLeg.requestHeaders || capturedOk?.headers || {},
        capturedOk?.body ?? finalBody
      );
      const responseBody = okLeg.providerBody;
      const responsePayloadFormat = okLeg.responsePayloadFormat;
      const looksLikeSSE = okLeg.looksLikeSSE;
      let translatedResponse = okLeg.response;
      const memoryExtractionResponse = okLeg.responseForMemoryExtraction;
      reqLogger.logProviderResponse(
        200,
        "OK",
        providerResponse.headers,
        looksLikeSSE
          ? { _streamed: true, _format: "sse-json", summary: responseBody }
          : responseBody
      );
      effectiveServiceTier = resolveReportedServiceTier(responseBody) ?? effectiveServiceTier;
      if (onRequestSuccess) {
        await onRequestSuccess();
      }
      const successConnectionId = getCurrentConnectionId();
      await maybeSyncClaudeExtraUsageState({
        provider,
        connectionId: successConnectionId,
        providerSpecificData: credentials?.providerSpecificData,
        log,
      });
      const usage = toolLoopUsage ?? extractUsageFromResponse(responseBody, provider);
      const cacheUsageLogMeta = buildCacheUsageLogMeta(usage);
      if (usage && typeof usage === "object") {
        attachCompressionUsageReceiptAfterAnalytics(usage as Record<string, unknown>, "provider");
        if (provider === "gemini") {
          const promptTokens =
            typeof (usage as Record<string, unknown>).prompt_tokens === "number"
              ? ((usage as Record<string, unknown>).prompt_tokens as number)
              : 0;
          if (promptTokens > 0) incrementTokenUsage(model, promptTokens);
        }
      }
      recordContextEditingTelemetryHook({
        contextEditingEnabled,
        provider,
        responseBody,
        skillRequestId,
        log,
      });
      appendRequestLog({
        model,
        provider,
        connectionId: successConnectionId,
        tokens: usage,
        status: "200 OK",
      }).catch(() => {});
      recordNonStreamingUsageStats(usage, {
        traceEnabled,
        provider,
        connectionId: successConnectionId,
        model,
        startTime,
        apiKeyInfo,
        effectiveServiceTier,
        isCombo,
        comboStrategy,
        endpoint: endpointPath,
      });

      // #12150 P1b surface 3 (fix round 1): a video-bridge-observed request's
      // request- AND response-derived text both carry the full transcript (the
      // flattened description on the request side, the model's own reply on
      // the response side) — neither may populate durable Memory. See
      // runMemoryExtractionGate for the shared gate + extraction wiring, unit
      // tested directly in tests/unit/video-bridge-memory-suppression.test.ts.
      runMemoryExtractionGate({
        memoryOwnerId,
        memorySettings,
        videoBridgeObserved,
        pipelineSessionId,
        requestBody: body as Record<string, unknown>,
        responseBody: memoryExtractionResponse as Record<string, unknown> | null,
        extractFacts,
        log,
      });

      const customSkillExecutionEnabled =
        Boolean(memoryOwnerId) && memorySettings?.skillsEnabled === true;
      const builtinToolNames = [
        webSearchFallbackPlan.toolName,
        webFetchFallbackPlan.toolName,
        ...(memoryOwnerId && memorySettings?.enabled ? MEMORY_BUILTIN_TOOL_NAMES : []),
      ].filter((name): name is string => Boolean(name));
      if (!toolLoopRan && (customSkillExecutionEnabled || builtinToolNames.length > 0)) {
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
            provider,
            model: effectiveModel,
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

      const responseUsage = isJsonRecord(usage)
        ? usage
        : isJsonRecord(translatedResponse.usage)
          ? translatedResponse.usage
          : null;
      const costUsage = normalizeUsage(responseUsage);
      const estimatedCost = costUsage
        ? await calculateCost(provider, model, costUsage, { serviceTier: effectiveServiceTier })
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

      // Validate the *translated* response actually carries client-usable output.
      // isEmptyContentResponse (above) runs on the raw responseBody before translation;
      // this check runs after translation + sanitization + tool-call execution to catch
      // cases where a provider returns a structurally valid raw body that translates into
      // choices:[] or output:[] with no usable content (Responses API shape included).
      const malformedTranslatedReason = detectMalformedNonStream(translatedResponse);
      if (malformedTranslatedReason) {
        const totalLatency = Date.now() - startTime;
        const rawBytes = (() => {
          try {
            return JSON.stringify(responseBody || {}).length;
          } catch {
            return -1;
          }
        })();
        reportMalformed200({
          mode: "nonstream",
          provider,
          model,
          connectionId,
          reason: malformedTranslatedReason,
          recvBytes: rawBytes,
          recvLines: -1,
          emitted: -1,
          events: {},
          ttftMs: totalLatency,
          elapsedMs: totalLatency,
        });
        appendRequestLog({
          model,
          provider,
          connectionId,
          status: `FAILED ${HTTP_STATUS.BAD_GATEWAY}`,
        }).catch(() => {});
        const malformed = describeMalformedNonStream(translatedResponse, malformedTranslatedReason);
        const malformedMessage = `[${provider}/${model}] ${malformed.message}`;
        const malformedClientBody = buildErrorBody(
          HTTP_STATUS.BAD_GATEWAY,
          malformedMessage,
          undefined,
          { code: malformed.code, type: malformed.type }
        );
        persistAttemptLogs({
          status: HTTP_STATUS.BAD_GATEWAY,
          tokens: usage,
          responseBody,
          providerRequest: finalBody || translatedBody,
          providerResponse: looksLikeSSE
            ? { _streamed: true, _format: "sse-json", summary: responseBody }
            : responseBody,
          clientResponse: malformedClientBody,
          claudeCacheMeta: claudePromptCacheLogMeta,
          claudeCacheUsageMeta: cacheUsageLogMeta,
          cacheSource: "upstream",
        });
        persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "malformed_translated_response");
        trackPendingRequest(model, provider, pendingConnId, false);
        // Routing event (feedback foundation) — record the malformed outcome so
        // the quality tracker de-prioritizes this model over time.
        void emitRoutingEvent(
          createRoutingEvent({
            requestId: traceId || pendingRequestId || "unknown",
            provider: provider || "unknown",
            model: model || "unknown",
            strategy: isCombo ? (comboStrategy ?? "combo") : "direct",
            latencyMs: Date.now() - startTime,
            ttftMs: null,
            inputTokens: null,
            outputTokens: null,
            cost: null,
            retries: 0,
            fallbackUsed: false, // combo-level fallback tracked by decisionTrace
            outcome: "malformed",
            status: HTTP_STATUS.BAD_GATEWAY,
            finishReason: routingFinishReason(translatedResponse),
            connectionId: credentials?.connectionId ?? null,
          })
        );
        return createErrorResult(
          HTTP_STATUS.BAD_GATEWAY,
          malformedMessage,
          null,
          malformed.code,
          malformed.type
        );
      }

      // ── Phase 9.1: Cache store (non-streaming, temp=0) ──
      storeSemanticCacheResponse({
        enabled: semanticCacheEnabled,
        body: bodyForCacheWrite,
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
        comboStrategy,
      });
      // #6426: align response body `model` with the `X-OmniRoute-Model` header
      // (both must be the resolved backend model). Some upstreams (notably legacy
      // /v1/completions text-completion path) return a body `model` field that
      // differs from the resolved backend id we advertised in the header, leaving
      // strict clients unable to reconcile the two. Rewrite body.model to `model`
      // FIRST, then let #1311 echo override it when the opt-in setting is on.
      if (typeof model === "string" && model) echoModelInObject(translatedResponse, model);
      // #1311: echo the requested alias/combo name in the non-streaming response model.
      if (echoModel) echoModelInObject(translatedResponse, echoModel);

      // ── Plugin onResponse hook (fire-and-forget) ──
      // #8395: the streaming branch below already calls this; the non-streaming
      // (stream:false) branch returned without it, so onResponse never fired for
      // non-streaming requests at all.
      await runPluginOnResponseHook({
        requestId: traceId,
        body,
        model,
        provider,
        apiKeyInfo,
        headers: clientRawRequest?.headers,
        response: { status: 200, data: translatedResponse },
      });

      // Routing event (feedback foundation) — fire-and-forget, cheap.
      void emitRoutingEvent(
        createRoutingEvent({
          requestId: traceId || pendingRequestId || "unknown",
          provider: provider || "unknown",
          model: model || "unknown",
          strategy: isCombo ? (comboStrategy ?? "combo") : "direct",
          latencyMs: Date.now() - startTime,
          ttftMs: null,
          inputTokens:
            usage && typeof usage === "object"
              ? (() => {
                  const promptTokens = (usage as Record<string, unknown>).prompt_tokens;
                  return typeof promptTokens === "number" && Number.isFinite(promptTokens)
                    ? promptTokens
                    : null;
                })()
              : null,
          outputTokens:
            usage && typeof usage === "object"
              ? (() => {
                  const completionTokens = (usage as Record<string, unknown>).completion_tokens;
                  return typeof completionTokens === "number" && Number.isFinite(completionTokens)
                    ? completionTokens
                    : null;
                })()
              : null,
          cost: Number.isFinite(estimatedCost) ? estimatedCost : null,
          retries: 0,
          fallbackUsed: false, // combo-level fallback tracked by decisionTrace
          outcome: "success",
          status: 200,
          finishReason: routingFinishReason(translatedResponse),
          connectionId: credentials?.connectionId ?? null,
        })
      );

      return {
        success: true,
        response: buildNonStreamingJsonResponse(translatedResponse, responseHeaders),
      };
    } catch (error) {
      trackPendingRequest(model, provider, connectionId, false);
      if (isManagedLeaseFenceError(error)) return managedLeaseFenceErrorResult(error);
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
        const result = createErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage);
        return {
          ...result,
          errorType: "account_semaphore_capacity",
          errorCode: error.code,
        };
      }
      throw error;
    }
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
    comboStrategy,
  });

  // The streaming headers (turn-state included, when present) are committed to
  // the client from here on — record which connection minted the blob so a
  // later cross-account echo can be stripped (Codex failover guard). The
  // in-place failover update means `credentials` is the winning account.
  if (provider === "codex" && readCodexTurnStateHeader(providerResponse.headers)) {
    noteCodexTurnStateProvenance(
      getCodexClientSessionId(clientRawRequest?.headers),
      credentials?.connectionId
    );
  }

  // Create transform stream with logger for streaming response
  let transformStream;
  const responseToolNameMap = mergeResponseToolNameMap(
    toolNameMap,
    (finalBody as Record<string, unknown> | null | undefined) ?? null
  );

  let streamCompletionRecorded = false;
  let streamFailureCompletionRecorded = false;

  // Callback to save call log when stream completes (include responseBody when provided by stream)
  const onStreamComplete = makeOnStreamComplete({
    persistAttemptLogs,
    getCurrentConnectionId,
    provider,
    model,
    credentials,
    log,
    clientResponseFormat,
    responseToolNameMap,
    finalBody,
    translatedBody,
    body,
    reasoningCacheScope,
    contextEditingEnabled,
    skillRequestId,
    streamFailure,
    pendingRequestId,
    startTime,
    apiKeyInfo,
    isCombo,
    comboStrategy,
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
    clientRawRequest,
    claudePromptCacheLogMeta,
    resolveReportedServiceTier,
    attachCompressionUsageReceiptAfterAnalytics,
    routingFinishReason,
    getStreamCompletionRecorded: () => streamCompletionRecorded,
    setStreamCompletionRecorded: (v) => {
      streamCompletionRecorded = v;
    },
    getStreamFailureCompletionRecorded: () => streamFailureCompletionRecorded,
    setStreamFailureCompletionRecorded: (v) => {
      streamFailureCompletionRecorded = v;
    },
    getEffectiveServiceTier: () => effectiveServiceTier,
    setEffectiveServiceTier: (t) => {
      effectiveServiceTier = t;
    },
  });

  const streamFailureFinalizers = streamFailure.createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => streamFailureCompletionRecorded,
    isStreamCompletionRecorded: () => streamCompletionRecorded,
    onStreamComplete,
    persistFailureUsage,
    onStreamFailure,
  });
  const handleStreamFailure = streamFailureFinalizers.handleStreamFailure;
  bindPipelineStreamError(streamFailureFinalizers.onPipelineStreamError);
  // #9653: gives a genuine, race-delayed completion a chance to land (see
  // createClientDisconnectGraceHandler's doc comment) before persisting a false
  // 499/0-tokens for a request that actually delivered its full response.
  bindClientDisconnectFinalize(
    streamFailure.createClientDisconnectGraceHandler({
      isStreamCompletionRecorded: () => streamCompletionRecorded,
      gracePeriodMs: STREAM_DISCONNECT_GRACE_PERIOD_MS,
      finalize: (event) =>
        handleStreamFailure({
          status: 499,
          message: `Client disconnected: ${event.reason}`,
          code: "client_disconnected",
          type: "client_disconnected",
        }),
    })
  );

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
      copilotCompatibleReasoning,
      false,
      customToolNames,
      // openai-responses → openai translation still wants the namespace identity
      // map for #7936-style round-trip closure when the client also speaks
      // Responses (Codex CLI).
      requestToolIdentityMap
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
      copilotCompatibleReasoning,
      // Suppress the `</think>` close marker for clients that render it verbatim
      // (e.g. OpenCode by UA; any client via `x-omniroute-thinking-marker: off`);
      // preserved for Claude Code / Cursor and unknown clients by default (#5245 /
      // #5312). Responses API clients always suppress it (structured reasoning
      // items make the marker meaningless); otherwise the header wins over the
      // UA allowlist.
      resolveSuppressThinkClose({
        userAgent: streamUserAgent,
        thinkingMarkerHeader,
        clientResponseFormat,
      }),
      customToolNames,
      requestToolIdentityMap
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
      clientResponseFormat,
      requestToolIdentityMap
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
    // Same adaptive budget the pre-handoff readiness gate above just used —
    // reasoning models that legitimately take a while to say anything keep
    // that same patience for their first REAL content, not just their first
    // lifecycle frame. See pipeWithDisconnect's own doc comment.
    contentStallTimeoutMs: streamReadinessPolicy.timeoutMs,
  });

  // ── Gamification event (fire-and-forget) ──
  await emitRequestGamificationEvent({ apiKeyId: apiKeyInfo?.id, model, provider });

  // ── Plugin onResponse hook (fire-and-forget) ──
  await runPluginOnResponseHook({
    requestId: traceId,
    body,
    model,
    provider,
    apiKeyInfo,
    headers: clientRawRequest?.headers,
    response: { status: 200, streamed: true },
  });

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
