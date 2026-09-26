import {
  extractRequestToolIdentityMap,
  resolveResponseToolNameMap,
} from "./chatCore/requestToolIdentity.ts";
import {
  injectMemoryAndSkills,
  mergeInjectedFallbackOwnerNames,
} from "./chatCore/memorySkillsInjection.ts";
import { resolveChatCoreRequestSetup } from "./chatCore/requestSetup.ts";
import {
  normalizeOpenAICompatibleTools,
  shouldNormalizeFunctionToolsOnly,
} from "./chatCore/openAICompatibleTools.ts";
import {
  buildFailureUsageRecord,
  readCpaAuthIndex,
  type FailureUsageAggregate,
} from "./chatCore/failureUsage.ts";
import { createTranslationFailureResult } from "./chatCore/translationFailure.ts";
import {
  estimateFinalInputTokenBreakdown,
  estimateFinalInputTokens,
} from "./chatCore/contextEstimation.ts";
import {
  extractSystemRoleMessages,
  relocateDirectiveOnlyMessages,
} from "./chatCore/claudeSystemRole.ts";
export {
  extractSystemRoleMessages,
  relocateDirectiveOnlyMessages,
} from "./chatCore/claudeSystemRole.ts";
import { checkIdempotencyCache } from "./chatCore/idempotency.ts";
import { acquireTurnExecution, createTurnInProgressResult } from "./chatCore/turnExecutionGuard.ts";
import { checkSemanticCache } from "./chatCore/semanticCache.ts";
import { checkLifecycle, resolveLifecycle } from "./chatCore/modelLifecyclePolicy.ts";
import {
  shouldDefaultAllowClassifier,
  detectClassifierFormat,
  buildDefaultAllowClaudeMessage,
} from "./chatCore/claudeClassifierCompat.ts";
import { enforceOutputTokenBudget } from "./chatCore/outputTokenBudget.ts";
import { maybeConvertJsonBodyToSse } from "./chatCore/jsonBodyToSse.ts";
import {
  formatBufferedVerdictLog,
  judgeBufferedTurn,
  readBoundedResponseOutcome,
  FLUSH_EMPTY_RETRY_MAX_BYTES,
} from "../utils/emptyTurnRetry.ts";
import { withResilienceActionsContext } from "./chatCore/resilienceAttemptContext.ts";
import { noteBufferedVerdictOutcome } from "./chatCore/emptyTurnResilienceNotes.ts";
import { notePreviousResponseResumed } from "./chatCore/resumedResilienceNotes.ts";
import { assembleStreamingResponseHeaders } from "./chatCore/streamingResponseHeaders.ts";
import { storeStreamingSemanticCacheResponse } from "./chatCore/streamingSemanticCacheStore.ts";
import { captureStreamReasoningForReplay } from "./chatCore/streamReasoningCapture.ts";
import { assembleStreamingPipeline } from "./chatCore/streamingPipeline.ts";
import { runStreamingResponse } from "./chatCore/streamingResponse.ts";
import { runStreamingTail } from "./chatCore/streamingTail.ts";
import { sanitizeChatRequestBody } from "./chatCore/sanitization.ts";
import {
  applyReasoningInputPolicy,
  resolveIncompatibleReasoningAction,
} from "../services/reasoningInputPolicy.ts";

import {
  getHeaderValueCaseInsensitive,
  isNoMemoryRequested,
  resolveCompressionHeader,
} from "./chatCore/headers.ts";

import {
  isCodexOriginatedHeaders,
  isClaudeCodeOriginatedHeaders,
} from "../config/codexIdentity.ts";
import { trackDevice, extractIpFromHeaders } from "../services/deviceTracker.ts";
import { getCombosCached } from "./chatCore/comboContextCache.ts";
export { clearCombosCache, clearUpstreamProxyConfigCache } from "./chatCore/comboContextCache.ts";
import { resolveAccountSemaphoreKey } from "./chatCore/executorHelpers.ts";
import {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  shouldUseNativeOpenAICompatibleResponsesPassthrough,
  stampNativeResponsesPassthroughBody,
  redactPassthroughThinkingSignatures,
  stripClaudeRejectedTopLevelFields,
  isClaudeCodeSemanticPassthroughRequest,
} from "./chatCore/passthroughHelpers.ts";

import {
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
} from "./chatCore/responseHeaders.ts";
import { forwardDashboardEventToLiveWs } from "./chatCore/telemetryHelpers.ts";
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
import { resolveMemoryOwnerId, runMemoryExtractionGate } from "./chatCore/memoryExtraction.ts";
import { checkResourcePressureGuard } from "../utils/resourcePressure.ts";
import { normalizeHeaders } from "../utils/headers.ts";
import { resolveChatCoreRequestFormat } from "./chatCore/requestFormat.ts";
import { resolveChatCoreTargetFormat } from "./chatCore/targetFormat.ts";
import { resolveOmniGlyphTransport } from "../services/compression/imageTransportPolicy.ts";
import { stripStore, usesClaudeBridge } from "./chatCore/agentRouterProtocol.ts";
import { normalizeClaudeToolsForDispatch } from "./chatCore/claudeToolDefaults.ts";
import {
  injectCustomSystemPrompt,
  injectSystemPromptPreTranslation,
} from "../services/systemPrompt.ts";
import { translateRequest } from "../translator/index.ts";
import { applyReasoningRuleDirective } from "@/lib/reasoningRouting/policy";
import { withReasoningRuleContext } from "../utils/reasoningRuleContext.ts";
import { FORMATS } from "../translator/formats.ts";
import { collectCustomToolNamesForSourceFormat } from "../translator/request/openai-responses/additionalTools.ts";
import { sanitizeKiroTools } from "../utils/kiroSanitizer.ts";
import { splitMisplacedToolResults } from "../translator/helpers/claudeHelper.ts";
import { ensureCacheControlOnLastUserMessage } from "../services/claudeCodeConstraints.ts";
import { THINKING_MARKER_HEADER } from "../utils/thinkCloseMarker.ts";
import { resolveAgentGoalPolicy } from "../utils/agentGoalPolicy.ts";
import { createStreamController } from "../utils/streamHandler.ts";
import * as streamFailure from "../utils/streamFailureFinalization.ts";
import { normalizeUsage } from "../utils/usageTracking.ts";
import { refreshWithRetry, runWithOnPersist, runWithCasGuard } from "../services/tokenRefresh.ts";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { createPreparedRequestLogger } from "../utils/providerRequestLogging.ts";
import { summarizeToolSources } from "../utils/toolSources.ts";
import { applyResponsesPreviousResponseIdPolicy } from "../utils/responsesStatePolicy.ts";
import { applyClaudeEffortVariant } from "./chatCore/claudeEffortVariant.ts";
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../config/defaultThinkingSignature.ts";
import {
  getStripTypesForProviderModel,
  stripIncompatibleMessageContent,
} from "../services/modelStrip.ts";
import { shouldUseMidConversationSystem } from "../executors/claudeIdentity.ts";
import { echoModelInObject } from "../services/responseModelEcho.ts";
import { getUnsupportedParams, REGISTRY } from "../config/providerRegistry.ts";

import { checkToolCallingRequiredButUnsupported } from "./chatCore/toolCallingRequiredCheck.ts";
import { buildExecutorClientHeaders } from "./chatCore/executorClientHeaders.ts";
import { executeProviderRequest as executeProviderRequestLeaf } from "./chatCore/executeProviderRequest.ts";
import { runNonStreamingResponse } from "./chatCore/nonStreamingResponse.ts";
import {
  supportsMaxTokens,
  getResolvedModelCapabilities,
  getExplicitModelOutputCap,
  resolveInputTokenCapForGate,
} from "@/lib/modelCapabilities.ts";
import {
  checkRequestCapabilityFit,
  deriveRequestCapabilityRequirements,
  buildCapabilityMismatchMessage,
} from "@/shared/constants/capabilities/capabilityFilter.ts";
import {
  areContextWindowChecksDisabled,
  isFeatureFlagEnabled,
  isServerOwnedToolLoopEnabled,
} from "@/shared/utils/featureFlags.ts";
import { resolveNoAuthEchoModel } from "./chatCore/noAuthEchoModel.ts";
import { toPositiveInteger } from "../services/reasoningTokenBuffer.ts";
import {
  buildErrorBody,
  createErrorResult,
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
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
  PROVIDER_MAX_TOKENS,
  DEFAULT_MAX_TOKENS,
  STREAM_DISCONNECT_GRACE_PERIOD_MS,
} from "../config/constants.ts";

import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { classifyProviderError, PROVIDER_ERROR_TYPES } from "../services/errorClassifier.ts";
import { isOpencodeFreeTierRefusalForProvider } from "../executors/opencodeGeoBlock.ts";
import { noteOpencodeFreeTierSkip } from "../services/opencodeFreeTierSkip.ts";
import { updateProviderConnection, getProviderConnectionById } from "@/lib/db/providers";

import { connectionHasExtraKeys } from "../services/apiKeyRotator.ts";
import { recordKeyHealthStatus as recordKeyHealthStatusFor } from "./chatCore/keyHealth.ts";
import { getSkillsModelIdForFormat } from "./chatCore/skillsFormat.ts";
import { isSemaphoreCapacityError, getSafeErrorMetadata } from "./chatCore/streamErrorResult.ts";
import { buildCacheUsageLogMeta } from "./chatCore/cacheUsageMeta.ts";

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

import { getQuotaScopeLabelForProvider } from "../services/antigravityQuotaFamily.ts";
import { excludeConnectionForCooldown } from "./chatCore/connectionCooldown.ts";
import { handleRequestRejectedFailure } from "./chatCore/requestRejectedFailure.ts";
import { projectRetainedProviderFailureMessage } from "./chatCore/providerFailureRetention.ts";
import { getKimiTemporaryRateLimitResetAt } from "./chatCore/kimiQuotaRecovery.ts";
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
import { finalizePendingScope, initialPendingBody, updatePendingScope } from "@/lib/usage/pendingRequestScope";
import { recordChatCallCost, buildCostCtx } from "@/domain/costRules";
import { calculateCost } from "@/lib/usage/costCalculator";
import { buildClaudePassthroughToolNameMap } from "./chatCore/passthroughToolNames.ts";
import {
  createDisabledCompressionConfig,
  resolveCompressionSettings,
} from "./chatCore/compressionSettings.ts";
import type { EnforceDecision } from "@/lib/quota/types";
import { isCompressionExcluded } from "../services/compression/exclusions.ts";
import {
  isBuiltinStackedPipeline,
  isStackedCompressionCombo,
  type RuntimeCompressionCombo,
} from "./chatCore/compressionComboPredicates.ts";
import { emitOutputStyleTelemetry } from "./chatCore/outputStyleTelemetry.ts";
import {
  writeCompressionAnalytics,
  writeCompressionSkip,
} from "./chatCore/compressionAnalyticsWrite.ts";
import { runPluginOnRequestHook } from "./chatCore/pluginOnRequest.ts";
import { recordContextEditingTelemetryHook } from "./chatCore/contextEditingTelemetry.ts";
import { recordCompressionCacheStats } from "./chatCore/compressionCacheStats.ts";
import { writeCavemanOutputAnalytics } from "./chatCore/cavemanOutputAnalytics.ts";
import { scheduleQuotaShareConsumption } from "./chatCore/quotaShareConsumption.ts";
import { emitRequestGamificationEvent } from "./chatCore/gamificationEvent.ts";
import { runPluginOnResponseHook } from "./chatCore/pluginOnResponse.ts";
import { isJsonRecord } from "./chatCore/nonStreamingResponseParse.ts";
import { recordNonStreamingUsageStats } from "./chatCore/nonStreamingUsageStats.ts";

import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/db/models";
import { extractSessionAffinityKey } from "@/sse/services/auth";
import { assertExclusiveConnectionLeaseFence } from "@/lib/db/exclusiveConnectionLeases";

import { getCacheControlSettings } from "@/lib/cacheControlSettings";
import { guardrailRegistry } from "@/lib/guardrails";
import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";
import {
  logClientRawRequestRedacted,
  redactPendingBody,
} from "@/lib/guardrails/videoBridgeSnapshotRedaction";
import {
  shouldPreserveCacheControl,
  resolveConnectionCacheOverride,
} from "../utils/cacheControlPolicy.ts";
import { getCachedSettings } from "@/lib/db/readCache";
import { applyCodexGlobalFastServiceTier } from "@/lib/providers/codexFastTier";
import { buildUpstreamHeadersForExecute as buildUpstreamHeadersForExecuteFor } from "./chatCore/upstreamExecuteHeaders.ts";
import {
  resolveEffectiveServiceTier as resolveEffectiveServiceTierFor,
  resolveReportedServiceTier as resolveReportedServiceTierFor,
  type EffectiveServiceTier,
} from "./chatCore/serviceTier.ts";
import { isCompactResponsesEndpoint } from "../executors/codex.ts";
import { extractUsageFromResponse } from "./usageExtractor.ts";
import {
  updateFromHeaders,
  updateFromResponseBody,
  initializeRateLimits,
} from "../services/rateLimitManager.ts";
import { markBlocked as markAccountSemaphoreBlocked } from "../services/accountSemaphore.ts";
import {
  lockModel,
  lockModelIfPerModelQuota,
  recordCoreOwnedAntigravityQuotaState,
  shouldDeferAntigravityQuotaStateToCaller,
} from "../services/accountFallback.ts";
import { saveIdempotency } from "@/lib/idempotencyLayer";

import { computeRequestHash, shouldDeduplicate } from "../services/requestDedup.ts";
import {
  compressContext,
  estimateTokens,
  getTokenLimit,
  getComboTargetTokenLimit,
  resolveComboContextLimit,
} from "../services/contextManager.ts";
import { resolveBackgroundTaskRedirect } from "./chatCore/backgroundRedirect.ts";
import type {
  CompressionConfig,
  CompressionPipelineStep,
  CompressionResult,
} from "../services/compression/types.ts";
import { generateSessionId } from "../services/sessionManager.ts";
import { prepareWebSearchFallbackBody } from "../services/webSearchFallback.ts";
import { prepareWebFetchFallbackBody } from "../services/webFetchInterception.ts";
import { resolveInterceptSearch, resolveInterceptFetch } from "@/lib/db/interceptionRules";
import { resolveExplicitStreamAlias, resolveStreamFlag } from "../utils/aiSdkCompat.ts";
import { generateRequestId } from "@/shared/utils/requestId";
import { isLocalStreamLifecycleError } from "@/shared/utils/circuitBreaker";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";
import { handleToolCallExecution } from "@/lib/skills/interception";
import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";
import {
  buildClaudeCodeCompatibleRequest,
  resolveClaudeCodeCompatibleSessionId,
} from "../services/claudeCodeCompatible.ts";
import { setGeminiThoughtSignatureMode } from "../services/geminiThoughtSignatureStore.ts";
import { classifyModelScope429, isModelScopeProvider } from "../services/modelscopePolicy.ts";
import { incrementTokenUsage, isTpmExhausted } from "../services/geminiRateLimitTracker.ts";
import { getProactiveCompressionRatio } from "@/lib/db/compression";

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
export async function handleChatCore(args: Parameters<typeof handleChatCoreInner>[0]) {
  // one implicit resilience store per attempt (combo legs each run
  // handleChatCore, so each leg gets its own isolated store).
  return withResilienceActionsContext([args], (forwarded) => handleChatCoreInner(forwarded));
}

async function handleChatCoreInner({
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
  forcedConnectionId = null, // #14116: caller's pinned/requested connection, vs credentials.connectionId below
  previousResponseResumed = undefined, // rehydrated-continuation flag from chat.ts; noted below, no semantics.
}) {
  delete (body as Record<string, unknown>)._omniroutePreviousResponseResumed;
  const {
    model: originModel,
    resolvedThinkingEffort,
    defaultThinkingEffort,
  } = modelInfo as typeof modelInfo & {
    resolvedThinkingEffort?: string | null;
    defaultThinkingEffort?: string | null;
  };
  const trustedEffortContext = Object.freeze({
    originModel,
    resolvedThinkingEffort,
    defaultThinkingEffort,
  });
  let { provider, model, extendedContext } = modelInfo;
  const getExecutorClientHeaders = () =>
    buildExecutorClientHeaders(clientRawRequest?.headers, userAgent, { provider, body });
  // Keep the selected rule across format conversion, retries and refreshed credentials.
  // Each combo leg gets its own execution context; nothing is written to shared accounts.
  const reasoningRuleDirective = body?._omnirouteReasoningRule;
  // #12150 P1b: true iff the video-bridge guardrail rendered >=1 transcript
  // cue into a replaced part of this request. Gates both request- and
  // response-derived Memory extraction
  // (chatCore/memoryExtraction.ts::runMemoryExtractionGate).
  const videoBridgeObserved: boolean =
    (videoBridgeLog as VideoBridgeLogParam | undefined)?.observed === true;
  // resume flag from chat.ts, noted under the attempt store opened above.
  notePreviousResponseResumed(previousResponseResumed);
  const resilienceSettings = resolveResilienceSettings(cachedSettings);
  if (!skipResourcePressureGuard) {
    try {
      const pressureGuard = checkResourcePressureGuard();
      if (pressureGuard) return pressureGuard;
    } catch {
      /* fail open */
    }
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
  // is a log-correlation token, not a security secret. Keep the full UUID:
  // a 6-char prefix collides in call_logs under production volume (#14451).
  const traceId = globalThis.crypto.randomUUID();
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
  const getCurrentConnectionId = () => {
    const credentialConnectionId =
      typeof credentials?.connectionId === "string" && credentials.connectionId.trim().length > 0
        ? credentials.connectionId.trim()
        : null;
    return credentialConnectionId || connectionId || null;
  };
  const assertManagedLeaseFence = (attemptConnectionId: string | null | undefined) => {
    if (!managedLease) return;
    if (!attemptConnectionId) {
      throw Object.assign(new Error("Managed lease connection is unavailable"), {
        code: "LEASE_CONNECTION_MISMATCH",
        status: 409,
      });
    }
    const fence = assertExclusiveConnectionLeaseFence({
      leaseOwnerId: managedLease.context.leaseOwnerId,
      generation: managedLease.context.generation,
      apiKeyId: managedLease.apiKeyId,
      connectionId: attemptConnectionId,
    });
    if (fence.kind === "VALID") return;
    const code =
      fence.kind === "REQUIRED"
        ? "LEASE_REQUIRED"
        : fence.kind === "STALE"
          ? "LEASE_FENCE_STALE"
          : fence.kind === "AUTHORIZATION_MISMATCH"
            ? "LEASE_AUTHORIZATION_MISMATCH"
            : "LEASE_CONNECTION_MISMATCH";
    throw Object.assign(new Error("Managed lease request fence rejected the dispatch"), {
      code,
      status: 409,
    });
  };
  const getManagedLeaseFenceErrorCode = (code: string | undefined): string | undefined => {
    if (managedLease === null) return undefined;
    return code?.startsWith("LEASE_") ? code : undefined;
  };
  const managedLeaseFenceErrorResult = (code: string) => {
    return {
      ...createErrorResult(409, "Managed lease request fence rejected the dispatch", null, code),
      errorType: "lease_error",
      errorCode: code,
    };
  };
  let tokensCompressed: number | null = null;
  // ── Per-endpoint custom system prompt (port of upstream #2063) ──
  // Reads from cachedSettings if available (passed in from combo/chat layer)
  // to avoid an extra DB read on the hot path. Falls through to getCachedSettings()
  // only when this function is called outside the normal chat dispatch.
  {
    const _s = cachedSettings ?? (await getCachedSettings());
    if (
      _s.customSystemPromptEnabled === true &&
      typeof _s.customSystemPrompt === "string" &&
      _s.customSystemPrompt
    ) {
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
    headers: clientRawRequest?.headers,
    log,
  });
  if (pluginGate.blocked === true) {
    return {
      success: false,
      status: 403,
      // Label the source: this 403 is our own policy decision, not the provider
      // rejecting us. Unlabelled, it is indistinguishable from a real upstream 403
      // and gets the connection banned. Matches the type already sent to the client
      // in pluginOnRequest.ts.
      errorType: "plugin_block",
      errorCode: "plugin_block",
      error: "Request blocked by plugin",
      response: pluginGate.response,
    };
  }
  if (pluginGate.body) {
    body = pluginGate.body;
  }
  // Per-API-key device/connection tracking (port of upstream 9router#931,
  // thanks @mugnimaestra). In-memory only, never blocks the request path.
  if (apiKeyInfo?.id) {
    trackDevice(
      apiKeyInfo.id,
      extractIpFromHeaders(clientRawRequest?.headers ?? null),
      userAgent ?? null
    );
  }
  const agentGoalPolicy = resolveAgentGoalPolicy(body, clientRawRequest?.headers ?? null);
  if (agentGoalPolicy.detected) {
    log?.debug?.(
      "AGENT_GOAL",
      `long-running goal mode enabled: readinessMax=${agentGoalPolicy.readinessMaxTimeoutMs}ms streamRecovery=${agentGoalPolicy.streamRecoveryEnabled}`
    );
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
  let providerResponse;
  // Failure usage record building extracted to chatCore/failureUsage.ts (#3501); the handler keeps
  // the fire-and-forget save + computes latencyMs, so the call sites stay byte-identical.
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
        cpaAuthIndex: readCpaAuthIndex(providerResponse),
        aggregate: aggregate ?? undefined,
      })
    ).catch(() => {});
  };
  // Key-health updater extracted to chatCore/keyHealth.ts (#3501); bind the per-request log once
  // and delegate so the existing call sites stay byte-identical.
  const recordKeyHealthStatus = (
    status: number,
    creds: Record<string, unknown> | null | undefined,
    transport?: string,
    failureDetail?: string
  ): void => recordKeyHealthStatusFor(status, creds, log, transport, failureDetail);
  // Endpoint/format resolution extracted to chatCore/requestFormat.ts (#3501); pure derivation
  // from the request. OUTSIDE the try below — persistFailureUsage closes over endpointPath.
  const {
    endpointPath,
    sourceFormat,
    isResponsesEndpoint,
    nativeCodexPassthrough,
    nativeXaiResponsesPassthrough,
    isDroidCLI,
    isOpencodeClient,
    copilotCompatibleReasoning,
    clientResponseFormat,
  } = resolveChatCoreRequestFormat({ clientRawRequest, body, provider, userAgent });
  // ── Phase 9.2: Idempotency check ──
  // Resolve the idempotency key once here and reuse it at the Phase 9.2 save site below,
  // rather than re-deriving it. (#3821-review LEDGER-6)
  const { hit: idempotencyHit, idempotencyKey } = await checkIdempotencyCache({
    clientRawRequest,
    provider,
    model,
    // NEXA fusion-idempotency fix: body.messages feeds the key digest so combo-internal
    // sub-requests (fusion panel + judge re-enter chatCore sharing the client's headers)
    // can never collide on the raw Idempotency-Key/x-request-id header key.
    body,
    effectiveServiceTier,
    startTime,
    log,
    videoTranscriptSensitive: videoBridgeObserved,
  });
  if (idempotencyHit) {
    return idempotencyHit;
  }

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
    // T07: Inject connectionId into credentials so executors can rotate API keys
  // using providerSpecificData.extraApiKeys (API Key Round-Robin feature)
  if (connectionId && credentials && !credentials.connectionId) {
    credentials.connectionId = connectionId;
  }
  let clientRequestedResponsesStream = false;
  const nativeOpenAICompatibleResponsesPassthrough =
    shouldUseNativeOpenAICompatibleResponsesPassthrough({
      provider,
      sourceFormat,
      endpointPath,
      providerSpecificData: credentials?.providerSpecificData,
      body,
    });
  const responsesInputItems = Array.isArray(body?.input) ? body.input : [];
  const customToolNames = collectCustomToolNamesForSourceFormat(
    sourceFormat,
    FORMATS.OPENAI_RESPONSES,
    body?.tools,
    responsesInputItems
  );

  const requestedLifecycleError = checkLifecycle(provider, model, log);
  if (requestedLifecycleError) return requestedLifecycleError;

  // Check for bypass patterns (warmup, skip) - return fake response
  const bypassResponse = handleBypassRequest(body, model, userAgent);
  if (bypassResponse) {
    return bypassResponse;
  }

  // ── Claude Code auto-mode classifier compat (opt-in, default "off") ──
  // Claude Code's `--permission-mode auto` sends an internal classifier request that
  // requires the response to START with `<block>no</block>`/`<block>yes</block>`.
  // When a combo/fallback route sends that call to a cheap model returning 200 with
  // empty content, Claude Code fails closed on every gated action. Detect the
  // classifier request and short-circuit with a synthetic ALLOW response, WITHOUT
  // calling the upstream provider. See chatCore/claudeClassifierCompat.ts.
  {
    const classifierSettings = cachedSettings ?? (await getCachedSettings());
    if (
      shouldDefaultAllowClassifier(
        sourceFormat,
        body as Record<string, unknown>,
        classifierSettings.claudeClassifierCompat as string | undefined
      )
    ) {
      const classifierFormat = detectClassifierFormat(body as Record<string, unknown>);
      log?.warn?.(
        "CHAT",
        `classifier compat=${classifierSettings.claudeClassifierCompat} format=${classifierFormat} | short-circuit default-allow`
      );
      return buildDefaultAllowClaudeMessage(requestedModel, classifierFormat);
    }
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

  // Custom aliases remain explicit; lifecycle replacements are advisory and never silently routed.
  let [resolvedModel, effectiveModel, routedLifecycleError] = resolveLifecycle(
    provider,
    model,
    log
  );
  if (routedLifecycleError) return routedLifecycleError;

  // Effort-variant model ids: the Claude / Claude-Code model picker (e.g. VS Code's
  // "Effort" slider) advertises claude-...-{low,medium,high,xhigh,max}. Anthropic has
  // no such model, so the suffixed id 404s upstream. Strip it back to the real base id
  // (forwarded as the upstream model via finalModelToUpstream below) and surface the
  // level as reasoning_effort so the OpenAI→Claude translator / Claude-Code bridge turn
  // it into Claude thinking/effort config. An explicit client-supplied effort always
  // wins; native Claude passthrough is left untouched (it carries its own `thinking`),
  // and non-thinking base models are cleaned up later by normalizeThinkingForModel().
  // Extracted to chatCore/claudeEffortVariant.ts (#3501); mutates body in place and returns the
  // stripped model + an optional log line. The strip is unconditional (byte-identical to the
  // original behavior) for the claude/Claude-Code-compatible lane; for any other provider it
  // additionally requires isKnownClaudeEffortBaseModel(baseModel) to verify the base id is a
  // real, effort-capable Claude model before stripping (vertex-claude-catalog-dispatch fix).
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
    sourceFormat,
    customModelTargetFormat,
    providerSpecificData: credentials?.providerSpecificData,
    nativeXaiResponsesPassthrough,
    nativeOpenAICompatibleResponsesPassthrough,
  });
  const nativeResponsesPassthrough =
    nativeCodexPassthrough ||
    nativeXaiResponsesPassthrough ||
    nativeOpenAICompatibleResponsesPassthrough;

  // Track pending requests before slower optional enrichment (settings, logging,
  // compression) so internal usage/runtime counters stay accurate even when
  // upstream never returns response headers.
  // Use credentials.connectionId as a fallback so that requests without an
  // explicit session-level connectionId still register in the pendingRequests map.
  const pendingConnId = connectionId || credentials?.connectionId || null;
  const pendingRequestId =
    trackPendingRequest(model, provider, pendingConnId, true, {
      clientEndpoint: clientRawRequest?.endpoint || "/v1/chat/completions",
      clientRequest: redactPendingBody(clientRawRequest?.body ?? body, videoBridgeObserved),
      providerRequest: initialPendingBody(body, effectiveModel, videoBridgeObserved),
      stage: "registered",
      correlationId,
      sessionTag: conversationId || null,
    }) || generateRequestId();

  // Initialize rate limit settings from persisted DB (once, lazy)
  await initializeRateLimits();

  // #3384: per-model interception rule (src/lib/db/interceptionRules.ts) overrides the
  // native-bypass defaults below when the operator explicitly configured it for this
  // provider/model pair; undefined falls through to the existing bypass logic.
  const interceptSearchOverride = resolveInterceptSearch(provider, effectiveModel);

  // Capture client tool names BEFORE fallback injection so the owner-provenance
  // merge can distinguish tools the client already declared from synthetic tools
  // added by the fallback preparer. Without this, a client function named
  // `omniroute_web_search` (colliding with the fallback tool name) would be
  // marked server-owned even though the client owns it.
  const preConversionClientToolNames: string[] = (
    Array.isArray((body as Record<string, unknown>).tools)
      ? ((body as Record<string, unknown>).tools as unknown[])
      : []
  )
    .map((tool) => {
      if (!tool || typeof tool !== "object") return "";
      const record = tool as Record<string, unknown>;
      if (typeof record.name === "string") return record.name;
      const fn = record.function;
      if (
        fn &&
        typeof fn === "object" &&
        typeof (fn as Record<string, unknown>).name === "string"
      ) {
        return (fn as Record<string, unknown>).name as string;
      }
      return "";
    })
    .filter(Boolean);

  const { body: bodyWithWebSearchFallback, fallback: webSearchFallbackPlan } =
    prepareWebSearchFallbackBody(body as Record<string, unknown>, {
      provider,
      sourceFormat,
      targetFormat,
      nativeCodexPassthrough: nativeResponsesPassthrough,
      interceptSearchOverride,
    });
  if (webSearchFallbackPlan.enabled) {
    body = bodyWithWebSearchFallback as typeof body;
    // Server-side web-search execution cannot be injected into an arbitrary
    // client SSE stream (streaming interception is not implemented — #9725), so
    // a stream:true OpenAI Responses request whose web_search tool was converted
    // to the fallback is executed non-streaming: the assembled response then
    // carries the executed results (function_call_output + web_search_call) and
    // JSON-tolerating Responses clients (pi-web-access) consume it directly.
    if (
      sourceFormat === FORMATS.OPENAI_RESPONSES &&
      (body as Record<string, unknown>).stream === true
    ) {
      clientRequestedResponsesStream = true;
      (body as Record<string, unknown>).stream = false;
      log?.info?.("TOOLS", `web_search fallback forced non-streaming response for ${provider}`);
    }
    log?.info?.(
      "TOOLS",
      `Converted ${webSearchFallbackPlan.convertedToolCount} web_search tool(s) to OmniRoute fallback for ${provider}`
    );
  }
  // #7339: interceptFetch (Phase 3-4 of #3384) — same per-model rule + native-bypass
  // pattern as interceptSearch directly above.
  const interceptFetchOverride = resolveInterceptFetch(provider, effectiveModel);
  const { body: bodyWithWebFetchFallback, fallback: webFetchFallbackPlan } =
    prepareWebFetchFallbackBody(body as Record<string, unknown>, {
      provider,
      sourceFormat,
      targetFormat,
      nativeCodexPassthrough: nativeResponsesPassthrough,
      interceptFetchOverride,
    });
  if (webFetchFallbackPlan.enabled) {
    body = bodyWithWebFetchFallback as typeof body;
    log?.info?.(
      "TOOLS",
      `Converted ${webFetchFallbackPlan.convertedToolCount} web_fetch tool(s) to OmniRoute fallback for ${provider}`
    );
  }
  const noLogEnabled = apiKeyInfo?.noLog === true;
  // Consolidate settings reads — fetch once, reuse throughout the request
  const settings = cachedSettings ?? (await getCachedSettings());
  // Opt-in tool-source diagnostics (#1825): summarize the request's tool definitions
  // (count + MCP/hosted/client source breakdown + first names) as a single debug line.
  if (settings.logToolSources === true) {
    const toolSummary = summarizeToolSources((body as { tools?: unknown }).tools);
    if (toolSummary) log?.debug?.("TOOLS", toolSummary);
  }
  // #1311 (opt-in): echo the client-requested alias/combo name in the response `model`
  // field instead of the upstream model, so strict clients (Claude Desktop) that validate
  // response.model === request.model stop rejecting alias/combo requests with a 401.
  // #3697: always echo it for Codex CLI clients on the Responses API — regardless of the
  // opt-in setting — since the Codex CLI status line/model button reads `response.model`
  // to display the active model + reasoning effort (e.g. `gpt-5.5-xhigh`). Detection is by
  // request headers (originator/User-Agent), not by the routed provider, so it still fires
  // when `codex/gpt-5.5-xhigh` is routed through a combo to a non-codex upstream.
  const isCodexResponsesEcho =
    (isResponsesEndpoint || sourceFormat === FORMATS.OPENAI_RESPONSES) &&
    isCodexOriginatedHeaders(clientRawRequest?.headers);

  // Detect Claude Code CLI so we can auto-enable model echo — this prevents
  // session restore failures when the resolved upstream model (e.g.
  // `oc/nemotron-3-ultra-free`) is not recognized by the client on `--resume`.
  const isClaudeCodeClient = isClaudeCodeOriginatedHeaders(clientRawRequest?.headers);

  let echoModel =
    (settings.echoRequestedModelName === true || isCodexResponsesEcho || isClaudeCodeClient) &&
    typeof requestedModel === "string" &&
    requestedModel
      ? requestedModel
      : null;
  // Auto-echo the listing-valid form for bare requests to noAuth catalog
  // providers so clients validating response.model against /v1/models don't warn.
  echoModel = resolveNoAuthEchoModel(requestedModel, provider) ?? echoModel;
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
  // #8249: raw header value, kept separate from `pipelineSessionId`'s skillRequestId fallback
  // below so call_logs.session_tag is only ever set when the caller explicitly supplied the
  // header — never synthesized from the internal per-request skillRequestId.
  const explicitSessionIdHeader =
    (clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("x-omniroute-session-id")
      : getHeaderValueCaseInsensitive(
          clientRawRequest?.headers ?? null,
          "x-omniroute-session-id"
        )) || null;
  const pipelineSessionId = explicitSessionIdHeader || skillRequestId;
  const reasoningReplaySessionKey = sessionAffinityKey || explicitSessionIdHeader;
  const reasoningCacheScope = reasoningReplaySessionKey
    ? `api-key:${String(apiKeyInfo?.id ?? "local")}\x1f${String(reasoningReplaySessionKey)}`
    : null;
  // Normalized OpenAI transcript the reasoning replay pass digested for a
  // Responses-API target (reported by translateRequest). A Responses body has
  // `input`, not `messages`, so the replay-cache write side would otherwise digest
  // an empty history and never match the read side for plain assistant turns.
  let reasoningReplayHistory: unknown[] | null = null;
  // persistAttemptLogs extracted to chatCore/attemptLogging.ts (#3501); bind the per-request context
  // once so the 16 call sites keep passing only the per-attempt args (byte-identical).
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
      body,
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
      // Resolved conversationId (open-sse/services/conversationTracker.ts) wins when
      // present — it's populated for every request now, not just ones where the
      // client explicitly sent x-omniroute-session-id. The raw header remains a
      // fallback for any caller that somehow bypassed conversationId resolution.
      sessionTag: conversationId || explicitSessionIdHeader,
      // #12150 P1b surface 1: undefined for every non-video request (byte-identical
      // to before this param existed) — see applyVideoBridgeLogRedaction.
      videoBridgeLogRedaction: (videoBridgeLog as VideoBridgeLogParam | undefined)?.redaction,
      // #12150 P2 surface 2: mark the persisted call_logs row so
      // resolvePreviousResponseState refuses to rehydrate a snapshot whose video
      // transcript was redacted. false for every non-video request.
      videoContentRemoved: videoBridgeObserved,
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

  // #8369: connection-level custom upstream headers from provider_specific_data.
  const connectionCustomHeaders =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    typeof credentials.providerSpecificData.customHeaders === "object" &&
    !Array.isArray(credentials.providerSpecificData.customHeaders)
      ? (credentials.providerSpecificData.customHeaders as Record<string, string>)
      : undefined;

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
      connectionCustomHeaders,
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

  // Explicit per-request opt-in/out for the `</think>` close marker
  // (#5312 / #5245): `x-omniroute-thinking-marker: off` suppresses it for
  // reasoning_content-native clients (e.g. Cursor's OpenAI path) that the UA
  // allowlist does not cover; absent the header, the UA policy applies.
  const thinkingMarkerHeader = getHeaderValueCaseInsensitive(
    clientRawRequest?.headers ?? null,
    THINKING_MARKER_HEADER
  );

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
  // providerRequiresStreaming: providers with forceStream:true (cline/clinepass)
  // only implement upstream streaming — a non-streaming request returns
  // "generateText is not implemented" / an empty body. This flag forces the
  // UPSTREAM request to stream (see `upstreamStream` below), but it MUST NOT
  // force the client-facing `stream` flag: a stream:false client (e.g. the
  // model-test button, plain JSON API callers) still expects a JSON response.
  // The client-side `if (!stream)` branch drains the forced upstream SSE and
  // converts it back to JSON via readNonStreamingResponseBody. Passing this
  // flag into resolveStreamFlag would force `stream=true` and skip that
  // conversion, yielding STREAM_EARLY_EOF for JSON callers. (#2081, #6126)
  const providerRequiresStreaming = REGISTRY[provider]?.forceStream === true;
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
    enabled: detailedLoggingEnabled && !videoBridgeObserved,
    captureStreamChunks: capturePipelineStreamChunks && !videoBridgeObserved,
    maxStreamChunkBytes: getCallLogPipelineMaxSizeBytes(),
    requestId: pendingRequestId,
    model,
    provider: provider || undefined,
    connectionId: connectionId || credentials?.connectionId || undefined,
  });
  const pendingScope = {
    id: pendingRequestId,
    model,
    provider,
    connectionId: pendingConnId,
    videoTranscriptSensitive: videoBridgeObserved,
  };
  const providerRequestCapture = createPreparedRequestLogger(reqLogger, pendingScope);
  // 0. Log client raw request (before format conversion) — redacts video transcript
  // cues in the logged copy only; see videoBridgeSnapshotRedaction.ts.
  logClientRawRequestRedacted(reqLogger, clientRawRequest, videoBridgeObserved);
  const reasoningRouteDecision =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)._omnirouteReasoningRouteTrace
      : null;
  if (reasoningRouteDecision) {
    reqLogger.logRouteDecision(reasoningRouteDecision);
    body = { ...(body as Record<string, unknown>) };
    delete (body as Record<string, unknown>)._omnirouteReasoningRouteTrace;
  }

  log?.debug?.("FORMAT", `${sourceFormat} → ${targetFormat} | stream=${stream}`);

  if (reasoningRuleDirective) {
    // Cache identity must use the effective effort, not the overridden client value.
    // Retain the directive for the translation step, where general thinking defaults run.
    body = {
      ...(applyReasoningRuleDirective(
        body,
        sourceFormat === FORMATS.OPENAI_RESPONSES
          ? "openai-responses"
          : sourceFormat === FORMATS.CLAUDE
            ? "claude"
            : undefined
      ) as Record<string, unknown>),
      _omnirouteReasoningRule: reasoningRuleDirective,
    };
  }

  // Preserve original body for cache signature — the body variable is mutated
  // multiple times below (sanitization, memory/skills injection) before the
  // cache store path runs at Phase 9.1 (non-streaming) / Phase 9.2 (streaming).
  // Without this snapshot, the write-time signature differs from the read-time
  // one, producing 0% hit rate. (#cache-signature-asymmetry)
  const bodyForCacheWrite = body;

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
    pendingScope,
    startTime,
    log,
    persistAttemptLogs,
    apiKeyId: apiKeyInfo?.id ?? undefined,
    cacheDefaultMode: (apiKeyInfo as { cacheDefaultMode?: "legacy" | "bypass" } | null)
      ?.cacheDefaultMode,
    videoTranscriptSensitive: videoBridgeObserved,
  });
  if (cacheHit) {
    return cacheHit;
  }

  const reasoningInputFormat =
    sourceFormat === FORMATS.OPENAI_RESPONSES
      ? "responses"
      : sourceFormat === FORMATS.OPENAI
        ? "chat"
        : null;
  if (reasoningInputFormat && body && typeof body === "object") {
    const policy = applyReasoningInputPolicy(
      body as Record<string, unknown>,
      reasoningInputFormat,
      {
        provider,
        preserveEncryptedReasoning:
          credentials?.providerSpecificData?.preserveEncryptedReasoning === true,
        onIncompatibleReasoning: resolveIncompatibleReasoningAction({
          reasoningTransportFallback,
          // #11178 regressed combo steps whose combo record carries no explicit
          // stepId/executionKey (plain model-list combos): their explicit
          // `reasoningTransportFallback: "skip"` config was silently degraded to
          // "drop". `isCombo` is the combo marker; step ids are optional
          // finer-grained metadata that plain combos never set.
          isComboStep: Boolean(isCombo) || Boolean(comboStepId || comboExecutionKey),
          headers: clientRawRequest?.headers ?? null,
        }),
      }
    );
    if (policy.incompatibleReasoning) {
      trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
      return createErrorResult(
        HTTP_STATUS.BAD_REQUEST,
        "Reasoning continuation is not compatible with the selected target"
      );
    }
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

  // Merge web-search/web-fetch fallback tool names into the builtin owner set.
  // injectMemoryAndSkills only tracks memory tools; the fallback names were
  // injected into body.tools by prepareWebSearchFallbackBody/prepareWebFetchFallbackBody
  // above, so they must be carried into the owner provenance chain here.
  const mergedOwnerNames = mergeInjectedFallbackOwnerNames(
    injectionResult,
    [webSearchFallbackPlan, webFetchFallbackPlan],
    preConversionClientToolNames
  );
  injectionResult.builtinToolNames = mergedOwnerNames.builtinToolNames;

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
  // OmniGlyph 1.3.x has native OpenAI Chat/Responses transformers. When the
  // inbound protocol differs from the provider wire, defer only that engine to
  // the post-translation body; the text engines still run in their legacy lane.
  let runPostTranslationCompression:
    ((input: Record<string, unknown>) => Promise<CompressionResult>) | null = null;
  // Delegated Context Editing (Claude only): captured at the canonical compression
  // settings read below, then threaded to executor.execute() further down. Lives at
  // function scope because the read happens inside the per-message compression block.
  let contextEditingEnabled = false;
  // The dashboard's global compression switch must also control the built-in
  // reactive and last-resort compaction passes. Otherwise an operator selecting
  // "off" still has large histories rewritten by trim_tools/purify_history.
  let reactiveContextCompactionEnabled = false;
  // Hoisted to function scope (not just the compression-block scope below) so the
  // combo-resolved override survives to the final enforceOutputTokenBudget() call
  // further down — see #8378 (context limit resolved by the combo was silently
  // discarded because it only existed inside this `if` block).
  let contextLimit = getTokenLimit(provider, effectiveModel);
  if (body && Array.isArray(allMessages) && allMessages.length > 0) {
    let estimatedTokens = estimateTokens(allMessages);
    const compressionSettingsResult = await resolveCompressionSettings(log);
    const compressionSettings: CompressionConfig | null = compressionSettingsResult.settings;
    // #8034 — operator-named model/endpoint exclusions bypass the whole pipeline, exactly
    // like compression being globally disabled, so the body is provably byte-identical.
    // Native Codex passthrough is deliberately NOT part of this exclusion: prompt
    // compression runs through adaptBodyForCompression() (Responses input[] → messages
    // → restore) with codex tool-output eligibility guards, so native contexts still
    // compress (regression: #8933 introduced the passthrough bypass, landed on release
    // via #11088, silencing codex analytics to skip_reason='excluded'). Reactive
    // compaction + combo overflow fail-fast below still bypass native passthrough —
    // intentionally left for follow-up. Operators who want byte-identical passthrough
    // can add `codex/*` to the exclusions list.
    const compressionExcluded = isCompressionExcluded(
      { provider, model: effectiveModel },
      compressionSettings?.exclusions
    );
    // A per-key opt-out is a request-scoped hard kill for prompt compression. It
    // deliberately does not disable the independent reactive context-fit safety
    // passes, matching the existing x-omniroute-compression: off contract.
    const apiKeyCompressionEnabled = apiKeyInfo?.compressionEnabled !== false;
    let promptCompressionEnabled =
      compressionSettingsResult.enabled && !compressionExcluded && apiKeyCompressionEnabled;
    reactiveContextCompactionEnabled = compressionSettingsResult.enabled && !compressionExcluded;
    contextEditingEnabled = compressionSettingsResult.contextEditingEnabled;
    if (!apiKeyCompressionEnabled) {
      log?.debug?.("COMPRESSION", "Prompt compression disabled for this API key");
    }
    if (compressionExcluded) {
      void writeCompressionSkip(
        {
          stats: {
            originalTokens: estimatedTokens,
            compressedTokens: estimatedTokens,
            savingsPercent: 0,
            techniquesUsed: [],
            mode: "off",
            timestamp: Date.now(),
          },
          provider,
          effectiveModel,
          effectiveServiceTier,
          comboName,
          mode: "off",
          compressionComboId: null,
          skillRequestId,
          cavemanOutputModeApplied: false,
          cavemanOutputModeIntensity: null,
          log,
        },
        "excluded"
      );
    }

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
        formatCompressionAnnotation,
      } = await import("../services/compression/strategySelector.ts");
      const { trackCompressionStats } = await import("../services/compression/stats.ts");
      let config: CompressionConfig = compressionSettings ?? createDisabledCompressionConfig();
      if (compressionExcluded || !apiKeyCompressionEnabled) {
        config = { ...config, enabled: false };
      }
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
      if ((isCombo && comboName) || routingComboId) {
        try {
          const { getComboByName } = await import("@/lib/db/combos");
          let comboConfig = await getComboByName(comboName);
          if (!comboConfig && comboName?.startsWith("combo/")) {
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
            routingComboId,
            comboName?.startsWith("combo/") ? comboName.substring(6) : null,
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
      const connectionCacheOverride = resolveConnectionCacheOverride(
        credentials?.providerSpecificData
      );
      const modeBeforeOutputTransform = selectCompressionStrategy(
        config,
        compressionComboKey,
        estimatedTokens,
        body as Record<string, unknown>,
        { provider, targetFormat, model: effectiveModel, connectionCacheOverride },
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
      // The Auto-Clarity toggle is read from cavemanOutputMode.autoClarity.
      let outputStyleResult:
        import("../services/compression/outputStyles/apply.ts").OutputStylesResult | null = null;
      if (config.enabled && compressionHeader?.trim().toLowerCase() !== "off") {
        try {
          const { resolveOutputStyleSelection } =
            await import("../services/compression/outputStyles/backCompat.ts");
          const selection = resolveOutputStyleSelection(config);
          if (selection.length > 0) {
            const { applyOutputStyles, resolveOutputStyleLanguage } =
              await import("../services/compression/outputStyles/apply.ts");
            const outputStyleLanguage = resolveOutputStyleLanguage(
              config.languageConfig,
              body as Parameters<typeof resolveOutputStyleLanguage>[1]
            );
            outputStyleResult = applyOutputStyles(
              body as Parameters<typeof applyOutputStyles>[0],
              selection,
              outputStyleLanguage,
              { autoClarity: config.cavemanOutputMode?.autoClarity }
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
        import("../services/compression/adaptiveCompression/types.ts").AdaptiveTelemetry | null =
        null;
      const compressionPlan = selectCompressionPlan(
        config,
        compressionComboKey,
        estimatedTokens,
        compressionInputBody,
        { provider, targetFormat, model: effectiveModel, connectionCacheOverride },
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
        const cacheCtx = { provider, targetFormat, model: effectiveModel, connectionCacheOverride };
        const compressionConfig = resolveCacheAwareConfig(config, compressionInputBody, cacheCtx);
        const compressionPrincipalId = apiKeyInfo?.id ? String(apiKeyInfo.id) : undefined;
        const compressionOptions = {
          model: effectiveModel,
          // #7237: feed the AUTHORITATIVE capability (model spec / models.dev sync / DB
          // override, with the conservative model-id fragment heuristic only as its
          // last-resort fallback) instead of calling the heuristic directly here. The
          // heuristic alone wrongly returned false for e.g. gpt-5.5 (registered
          // supportsVision:true in modelSpecs but absent from the deliberately-conservative
          // fragment list), and lite.ts's gate (`supportsVision !== false`) treated that
          // false as "strip every image_url block". Resolves to `null` for genuinely unknown
          // models, which is intentionally NOT `false` so the gate still preserves images.
          supportsVision: getResolvedModelCapabilities({ provider, model: effectiveModel })
            .supportsVision,
          // OmniGlyph uses a measured provider/image-fidelity allowlist. Direct HTTP
          // alone is not proof that a route preserves PNG bytes and dimensions.
          ...resolveOmniGlyphTransport(provider),
          // Sem o provider, a contabilidade do OmniGlyph cai para `unknown` e
          // recusa deduzir a semântica de cache (Anthropic usa buckets disjuntos,
          // OpenAI reporta cached como subconjunto do input).
          provider,
          sourceFormat,
          targetFormat,
          compressionStage: "pre-translation" as const,
          config: compressionConfig,
          cachingContext: cacheCtx,
          principalId: compressionPrincipalId,
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
        };
        const runCompression = (input: Record<string, unknown>) =>
          applyCompressionAsync(input, mode, compressionOptions);
        const omniglyphSelected =
          mode === "omniglyph" ||
          (mode === "stacked" &&
            Array.isArray(compressionConfig.stackedPipeline) &&
            compressionConfig.stackedPipeline.some((step) =>
              typeof step === "string" ? step === "omniglyph" : step.engine === "omniglyph"
            ));
        if (
          omniglyphSelected &&
          (targetFormat === FORMATS.CLAUDE ||
            targetFormat === FORMATS.OPENAI ||
            targetFormat === FORMATS.OPENAI_RESPONSES) &&
          !(sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE)
        ) {
          runPostTranslationCompression = (input) =>
            applyCompressionAsync(input, mode, {
              ...compressionOptions,
              compressionStage: "post-translation" as const,
            });
        }
        let result: CompressionResult;
        if (compressionConfig.liveZone?.enabled === true) {
          const { applyLiveZoneCompression } = await import("../services/compression/liveZone.ts");
          const explicitSessionId =
            clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
              ? clientRawRequest.headers.get("x-omniroute-session-id")
              : getHeaderValueCaseInsensitive(
                  clientRawRequest?.headers ?? null,
                  "x-omniroute-session-id"
                );
          const liveZoneSessionId =
            explicitSessionId ||
            generateSessionId(compressionInputBody, {
              provider,
              connectionId: getCurrentConnectionId() ?? undefined,
            }) ||
            undefined;
          result = await applyLiveZoneCompression(
            compressionInputBody,
            {
              principalId: compressionPrincipalId,
              sessionId: liveZoneSessionId,
              variant: {
                mode,
                provider,
                model: effectiveModel,
                config: compressionConfig,
                cachePrefix: {
                  system: compressionInputBody.system,
                  systemInstruction: compressionInputBody.systemInstruction,
                  system_instruction: compressionInputBody.system_instruction,
                  instructions: compressionInputBody.instructions,
                  tools: compressionInputBody.tools,
                  toolChoice: compressionInputBody.tool_choice,
                },
              },
              ttlMinutes: compressionConfig.cacheMinutes,
            },
            runCompression
          );
        } else {
          result = await runCompression(compressionInputBody);
        }
        if (result.stats) {
          const annotation = formatCompressionAnnotation(result.stats);
          if (annotation) {
            compressionResponseMeta = `${compressionResponseMeta}; ${annotation}`;
          }
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
            await compressionAnalyticsWritePromise;
          } else {
            // Compression was attempted (mode active, engines ran) but produced no
            // recordable saving — e.g. a Stacked RTK→Caveman pipeline on already-compact
            // context. Record a skip row so analytics can distinguish "ran but saved
            // nothing" from "never ran" instead of dropping it silently (#4268).
            compressionAnalyticsRecorded = true;
            compressionAnalyticsWritePromise = writeCompressionSkip(
              {
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
              },
              "no_savings"
            );
            await compressionAnalyticsWritePromise;
          }

          if (result.compressed) {
            recordCompressionCacheStats({
              compressionInputBody,
              provider,
              targetFormat,
              effectiveModel,
              mode,
              stats: result.stats,
              connectionCacheOverride,
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
        await compressionAnalyticsWritePromise;
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
        reactiveContextCompactionEnabled
          ? "Prompt Compression engines disabled; reactive context compaction still applies when over threshold"
          : "Prompt Compression engines disabled; reactive context compaction is ALSO disabled — large histories will NOT be trimmed before reaching the upstream provider"
      );
    }
    if (isCombo && comboName) {
      log?.info?.("CONTEXT", `Attempting to resolve combo limits for comboName=${comboName}`);
      try {
        const { getComboByName } = await import("@/lib/db/combos");
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
          // Fall back to ResolvedComboTarget.provider when modelStr lacks a
          // provider/ prefix — parseModel alone returns provider:null (#8716).
          comboTargetLimits = targets
            .map((t: { modelStr?: string; provider?: string }) =>
              getComboTargetTokenLimit({ modelStr: t.modelStr, provider: t.provider })
            )
            .filter(
              (limit): limit is number =>
                typeof limit === "number" && Number.isFinite(limit) && limit > 0
            );
        }
        // chatCore executes per concrete target (handleSingleModel resolves
        // provider/effectiveModel before delegating). Compress against THIS
        // target's window; min(...allTargets) is only a defensive fallback —
        // the old unconditional min compressed a 1M-target request at the
        // smallest sibling's window ("agent keeps forgetting things").
        // An explicit `context_length` on the combo record (Agent Features →
        // Context length) is an operator declaration and outranks the inferred
        // per-target window — see resolveComboContextLimit().
        const rawComboContextLength = (comboConfig as { context_length?: unknown } | null)
          ?.context_length;
        const comboContextLength =
          typeof rawComboContextLength === "number" &&
          Number.isFinite(rawComboContextLength) &&
          rawComboContextLength > 0
            ? rawComboContextLength
            : null;
        const resolved = resolveComboContextLimit({
          provider,
          model: effectiveModel,
          comboTargetLimits,
          comboContextLength,
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

    const COMPRESSION_THRESHOLD = getProactiveCompressionRatio();
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

    // Reactive context compaction is independent of optional prompt-compression
    // engines (Caveman/RTK). Codex Desktop / Responses clients need this path even
    // when those engines are off, otherwise multi-turn image sessions hard-reject
    // at the budget check below (#8560).
    if (
      reactiveContextCompactionEnabled &&
      !nativeCodexPassthrough &&
      estimatedTokens > threshold
    ) {
      log?.info?.(
        "CONTEXT",
        `Proactive compression triggered: ${estimatedTokens} tokens > ${threshold} threshold (${contextLimit} limit)`
      );

      // Adapt Responses `input[]` → messages so compressContext can run, then restore.
      const ctxAdapter = adaptBodyForCompression(body as Record<string, unknown>);
      const compressionResult = compressContext(ctxAdapter.body, {
        provider,
        model: effectiveModel,
        maxTokens: threshold,
        reserveTokens: 0,
      });

      if (compressionResult.compressed && compressionResult.body) {
        body = ctxAdapter.adapted
          ? ctxAdapter.restore(compressionResult.body as Record<string, unknown>, {
              dropMissingMappedItems: true,
            })
          : compressionResult.body;
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

  // Re-check the concrete target after all compression passes. Combo compatibility
  // filtering is advisory and may preserve an all-incompatible pool; this is the
  // hard boundary that prevents a too-large prompt (or a negative token budget)
  // from reaching an OpenAI-compatible upstream such as NVIDIA NIM.
  let finalEstimatedInputTokens = estimateFinalInputTokens(body as Record<string, unknown>);
  // Reuse the already-resolved `contextLimit` (may have been narrowed to the
  // per-target combo window above, resolveComboContextLimit) instead of a bare
  // getTokenLimit(provider, effectiveModel) re-fetch, which would silently
  // discard that combo-aware override and re-widen the last-resort budget.
  const finalContextLimit = contextLimit;
  const toolsReserve = Array.isArray(body?.tools) ? estimateTokens(body.tools) : 0;

  // Last-resort compaction against the concrete input budget (not the 70% threshold).
  // Covers cases where the proactive pass was skipped or still left the request oversized (#8560).
  if (
    reactiveContextCompactionEnabled &&
    !nativeCodexPassthrough &&
    finalEstimatedInputTokens >= finalContextLimit &&
    body
  ) {
    const lastResortTarget = Math.max(1, finalContextLimit - toolsReserve - 1);
    const lastResortAdapter = adaptBodyForCompression(body as Record<string, unknown>);
    const lastResortResult = compressContext(lastResortAdapter.body, {
      provider,
      model: effectiveModel,
      maxTokens: lastResortTarget,
      reserveTokens: 0,
    });
    if (lastResortResult.compressed && lastResortResult.body) {
      body = lastResortAdapter.adapted
        ? lastResortAdapter.restore(lastResortResult.body as Record<string, unknown>, {
            dropMissingMappedItems: true,
          })
        : lastResortResult.body;
      finalEstimatedInputTokens = estimateFinalInputTokens(body as Record<string, unknown>);
      const finalInputBreakdown = estimateFinalInputTokenBreakdown(
        body as Record<string, unknown>
      );
      log?.info?.(
        "CONTEXT",
        `Last-resort context compaction: ${lastResortResult.stats?.original} → ${lastResortResult.stats?.final} message tokens ` +
          `(final input ${finalInputBreakdown.total}: messages=${finalInputBreakdown.messages}, ` +
          `tools=${finalInputBreakdown.tools}, system=${finalInputBreakdown.system}, ` +
          `instructions=${finalInputBreakdown.instructions}; limit ${finalContextLimit})`
      );
    }
  }

  const modelOutputCap = toPositiveInteger(
    getExplicitModelOutputCap({ provider, model: effectiveModel })
  );
  const contextWindowChecksDisabled = areContextWindowChecksDisabled();
  const outputBudget = enforceOutputTokenBudget(
    body as Record<string, unknown>,
    finalEstimatedInputTokens,
    contextWindowChecksDisabled ? Number.MAX_SAFE_INTEGER : finalContextLimit,
    targetFormat === FORMATS.CLAUDE && sourceFormat !== FORMATS.CLAUDE ? DEFAULT_MAX_TOKENS : 0,
    modelOutputCap,
    contextWindowChecksDisabled
      ? null
      : toPositiveInteger(
          resolveInputTokenCapForGate({ provider, model: effectiveModel }, { isCombo })
        )
  );
  if (outputBudget.ok === false) {
    const exceededInputCap = outputBudget.maxInputTokens !== undefined;
    const message =
      `Input exceeds ${exceededInputCap ? "maximum input tokens" : "context window"} for ${provider}/${effectiveModel}: ` +
      `estimated ${outputBudget.estimatedInputTokens} input tokens, ${exceededInputCap ? `max input ${outputBudget.maxInputTokens}` : `limit ${outputBudget.contextLimit}`}. ` +
      `Reduce the prompt or route to a model with a larger ${exceededInputCap ? "input limit" : "context window"}.`;
    log?.warn?.("CONTEXT", message);
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    return createErrorResult(
      HTTP_STATUS.BAD_REQUEST,
      message,
      null,
      "context_length_exceeded",
      "invalid_request_error"
    );
  }
  if (outputBudget.adjustedFields.length > 0) {
    // A field can also be adjusted by *removal* (invalid/non-positive value), which
    // the cap did not cause — so state the ceiling in effect rather than claiming
    // the cap drove this particular adjustment.
    const modelCapIsBinding =
      modelOutputCap != null && modelOutputCap < outputBudget.availableOutputTokens;
    log?.info?.(
      "CONTEXT",
      `Adjusted invalid or oversized output token fields (${outputBudget.adjustedFields.join(", ")}); ` +
        `${outputBudget.availableOutputTokens} tokens remain for output` +
        (modelCapIsBinding
          ? ` (output ceiling in effect: ${modelOutputCap}, ${provider}/${effectiveModel}'s own cap)`
          : "")
    );
  }
  body = outputBudget.body;

  let translatedBody = body;
  const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE;
  const isClaudeCodeCompatible = usesClaudeBridge(provider, targetFormat, credentials);
  const isClaudeCodeSemanticPassthrough = isClaudeCodeSemanticPassthroughRequest({
    provider,
    sourceFormat,
    targetFormat,
    headers: clientRawRequest?.headers,
    userAgent,
  });
  // `forceStream` providers (e.g. Cline / ClinePass) only implement upstream
  // streaming — a non-streaming request returns "generateText is not implemented"
  // / an empty body. Force the upstream request to stream even when the client
  // wants JSON; the non-streaming branch below accumulates the SSE and converts
  // it back to JSON (same mechanism already used for Claude-Code-compatible
  // providers via isClaudeCodeCompatible).
  const upstreamStream = stream || isClaudeCodeCompatible || providerRequiresStreaming;
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
  const connectionCacheOverride = resolveConnectionCacheOverride(credentials?.providerSpecificData);
  const preserveCacheControl = shouldPreserveCacheControl({
    userAgent,
    isCombo,
    comboStrategy,
    targetProvider: provider,
    targetFormat,
    settings: { alwaysPreserveClientCache: cacheControlMode },
    connectionCacheOverride,
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
    if (nativeResponsesPassthrough) {
      translatedBody = stampNativeResponsesPassthroughBody(
        applyReasoningRuleDirective(body, "openai-responses") as Record<string, unknown>,
        nativeCodexPassthrough
          ? "codex"
          : nativeXaiResponsesPassthrough
            ? "xai"
            : "openai-compatible"
      );
      log?.debug?.(
        "FORMAT",
        nativeCodexPassthrough
          ? "native codex passthrough enabled"
          : nativeXaiResponsesPassthrough
            ? "native xAI Responses Agent Tools passthrough enabled"
            : "native openai-compatible Responses passthrough enabled"
      );
    } else if (isClaudeCodeCompatible) {
      let normalizedForCc = { ...body };

      // Claude Code-compatible providers expect Anthropic Messages-shaped payloads,
      // but we extract only role/text/max_tokens/effort from an OpenAI-like view first.
      if (sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough) {
        normalizedForCc = applyReasoningRuleDirective(
          normalizedForCc,
          "claude"
        ) as typeof normalizedForCc;
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
            reasoningCacheScope,
            videoTranscriptSensitive: videoBridgeObserved,
          }
        );
      }

      ccSessionId = resolveClaudeCodeCompatibleSessionId(clientRawRequest?.headers);
      const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
        credentials?.providerSpecificData
      );
      // OpenAI-shaped bridge requests skip translateRequest too.
      if (sourceFormat === FORMATS.OPENAI) {
        normalizedForCc = applyReasoningRuleDirective(normalizedForCc) as typeof normalizedForCc;
      }
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
        summarizeThinking: ccRequestDefaults.summarizeThinking === true,
      });
      log?.debug?.("FORMAT", "claude-code-compatible bridge enabled");

      if (isClaudeCodeSemanticPassthrough) {
        // Semantic passthrough: only lift system/developer role messages
        // without converting file/document blocks, tool history, etc.
        extractSystemRoleMessages(translatedBody);
      } else {
        // Non-CC path: full normalization including content type conversion.
        // Preserve tool_result blocks only when the upstream target speaks the
        // Anthropic Messages format — OpenAI-compatible gateways reject them
        // and return 503. See issue #13971.
        normalizeClaudeUpstreamMessages(translatedBody, {
          preserveToolResultBlocks: targetFormat === FORMATS.CLAUDE,
        });
      }
    } else if (isClaudePassthrough) {
      // Pure passthrough: forward the body as-is without OpenAI round-trip.
      // The Claude→OpenAI→Claude double translation was lossy and corrupted
      // payloads at high context (150+ msgs, 100+ tools). Fix: #1359.
      // Claude Code sends well-formed Messages API payloads — trust them
      // regardless of combo strategy or cache_control settings.
      translatedBody = applyReasoningRuleDirective({ ...body }, "claude");
      translatedBody._disableToolPrefix = true;

      // Sanitize historical thinking-block signatures for Anthropic-native Claude OAuth.
      // Only Anthropic's first-party API validates these signatures (token-bound); third-party
      // Claude-shape providers do not. See redactPassthroughThinkingSignatures + issue #2454.
      if (provider === "claude") {
        translatedBody.messages = redactPassthroughThinkingSignatures(
          translatedBody.messages,
          DEFAULT_THINKING_CLAUDE_SIGNATURE
        ) as typeof translatedBody.messages;

        stripClaudeRejectedTopLevelFields(translatedBody, clientRawRequest?.headers);
      }

      // Legacy models reject role:"system" messages. Supported models accept
      // them behind a beta, and hoisting them breaks the prompt cache prefix.
      if (isClaudeCodeSemanticPassthrough) {
        if (
          provider !== "claude" ||
          !shouldUseMidConversationSystem(translatedBody, effectiveModel)
        ) {
          extractSystemRoleMessages(translatedBody);
        } else {
          // The mid-conversation-system path keeps system-role messages inside
          // messages[], but a directive-only message (content: [] +
          // output_config) at messages[0] is rejected by Anthropic. Move it past
          // the first real turn; Anthropic accepts the form at any other position.
          relocateDirectiveOnlyMessages(translatedBody);
        }
        if (Array.isArray(translatedBody.messages)) {
          translatedBody.messages = splitMisplacedToolResults(
            translatedBody.messages as ClaudeMessage[]
          ) as typeof translatedBody.messages;
        }
        if (provider === "claude") {
          ensureCacheControlOnLastUserMessage(translatedBody);
        }
      } else {
        // Same guard as the CC-bridge path: only preserve tool_result blocks
        // for Anthropic-native targets. See issue #13971. This branch only runs
        // under isClaudePassthrough (sourceFormat === targetFormat === CLAUDE,
        // defined above), so targetFormat === FORMATS.CLAUDE always holds here —
        // the guard is a no-op on this call site, kept for symmetry with the
        // CC-bridge one above rather than a change to code the issue said not
        // to touch.
        normalizeClaudeUpstreamMessages(translatedBody, {
          preserveToolResultBlocks: targetFormat === FORMATS.CLAUDE,
        });
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
      //
      // #618's actual traffic was real Claude Code talking to first-party Anthropic
      // (provider "claude") reaching this fallback branch instead of the dedicated
      // Claude Code bridge/passthrough branches above. Scoping the disable to
      // `provider === "claude"` keeps that fix intact while no longer blanket-applying
      // it to every other provider that merely targets Claude's wire format — a
      // third-party provider's own ordinary (non-Claude-native) tool names, e.g.
      // GitHub Copilot's own client-executed "web_fetch" tool, were passing through
      // unprefixed here and colliding with Claude's reserved tool namespace, since
      // they were never "already in Claude format" the way this comment assumes.
      // See #13835.
      if (targetFormat === FORMATS.CLAUDE) {
        if (provider === "claude") {
          translatedBody._disableToolPrefix = true;
        }
        normalizeClaudeUpstreamMessages(translatedBody);
      }

      // OpenAI-compatible providers only support function tools.
      // Non-function tool types (computer, mcp, web_search, custom, etc.) are handled:
      //   - tools with a name → converted to function format in-place before translation
      //   - tools without a name AND without .function → dropped (unconvertible)
      // This must happen before translateRequest, which validates and throws on unknown types.
      // Skip normalization when we are in native openai-compatible Responses passthrough mode
      // to preserve native tool definitions (exec with lark grammar, collaboration namespace, etc.).
      // #13789: built-in providers observed to reject non-function tool types (agentrouter GLM:
      // `400 tools[0].type:type is illegal`) are normalized too, via a conservative allowlist
      // in shouldNormalizeFunctionToolsOnly that keeps openai's own `custom` tools untouched.
      if (
        !nativeOpenAICompatibleResponsesPassthrough &&
        shouldNormalizeFunctionToolsOnly(provider, targetFormat) &&
        Array.isArray(translatedBody.tools)
      ) {
        const normalized = normalizeOpenAICompatibleTools(
          translatedBody.tools as Record<string, unknown>[],
          sourceFormat
        );
        translatedBody.tools = normalized.tools;
        const { dropped } = normalized;
        if (dropped > 0) {
          log?.debug?.(
            "TOOLS",
            `Dropped ${dropped} unconvertible tool(s) for ${provider} (function-tools-only)`
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
      // Carrier-less targets (kiro / antigravity) have no post-translation
      // system carrier for the single pass at ~3068 to write into — inject
      // into the client body BEFORE translation so their user-merge /
      // relocation paths carry the global prompt (baseline coverage of the
      // removed pre-translation pass). The gate writes ONE carrier only.
      translatedBody = injectSystemPromptPreTranslation(translatedBody, { targetFormat });
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
          reasoningCacheScope,
          videoTranscriptSensitive: videoBridgeObserved,
          onReasoningReplayHistory: (messages) => {
            reasoningReplayHistory = messages;
          },
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
      const pluginErrorMessage = sanitizeErrorMessage(pluginErr) || "Plugin onError hook failed";
      log?.debug?.("PLUGIN", `onError hook error (non-fatal): ${pluginErrorMessage}`);
    }

    let parsedStatus = Number.NaN;
    try {
      parsedStatus = Number(error?.statusCode);
    } catch {
      // Hostile thrown values may expose Symbols or throwing status accessors.
    }
    const statusCode =
      Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
        ? parsedStatus
        : HTTP_STATUS.SERVER_ERROR;
    let message = "Invalid request";
    try {
      const candidate = error?.message;
      message =
        (typeof candidate === "string" ? candidate : sanitizeErrorMessage(candidate)) || message;
    } catch {
      // Hostile thrown values may expose throwing property accessors.
    }
    let errorType: string | null = null;
    try {
      const candidate = error?.errorType;
      errorType = typeof candidate === "string" ? candidate : null;
    } catch {
      // Hostile thrown values may expose throwing classification accessors.
    }
    const result = createTranslationFailureResult(statusCode, message, errorType);
    log?.warn?.("TRANSLATE", `Request translation failed: ${result.error}`);

    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    return result;
  }

  // The latest OmniGlyph release has protocol-native OpenAI transforms. Run
  // the deferred stage only after translation so Chat/Responses receives the
  // exact provider wire shape (and so a source→target conversion never embeds
  // Anthropic image blocks into an OpenAI request, or vice versa).
  if (runPostTranslationCompression && translatedBody && typeof translatedBody === "object") {
    const transientFields = new Map<string, unknown>();
    const postInput = { ...(translatedBody as Record<string, unknown>) };
    for (const [key, value] of Object.entries(postInput)) {
      // Translators keep response-side aliases in Maps under private keys. They
      // are not JSON request fields and would otherwise be stringified to `{}`
      // by the OmniGlyph library wrapper; restore them after the wire transform.
      if (key.startsWith("_") && value instanceof Map) {
        transientFields.set(key, value);
        delete postInput[key];
      }
    }
    try {
      const [{ formatCompressionAnnotation }, { trackCompressionStats }] = await Promise.all([
        import("../services/compression/strategySelector.ts"),
        import("../services/compression/stats.ts"),
      ]);
      const postResult = await runPostTranslationCompression(postInput);
      if (postResult.compressed) {
        translatedBody = {
          ...(postResult.body as typeof translatedBody),
          ...Object.fromEntries(transientFields),
        };
        tokensCompressed += Math.max(
          0,
          (postResult.stats?.originalTokens ?? 0) - (postResult.stats?.compressedTokens ?? 0)
        );
        if (postResult.stats) {
          const annotation = formatCompressionAnnotation(postResult.stats);
          if (annotation) {
            compressionResponseMeta = compressionResponseMeta
              ? `${compressionResponseMeta}; ${annotation}`
              : annotation;
          }
          trackCompressionStats(postResult.stats);
          compressionAnalyticsWritePromise = writeCompressionAnalytics({
            stats: postResult.stats,
            provider,
            effectiveModel,
            effectiveServiceTier,
            comboName,
            mode: postResult.stats.mode,
            compressionComboId: postResult.stats.compressionComboId ?? null,
            skillRequestId,
            cavemanOutputModeApplied: false,
            cavemanOutputModeIntensity: null,
            log,
          });
          await compressionAnalyticsWritePromise;
        }
        log?.info?.(
          "COMPRESSION",
          `Post-translation OmniGlyph applied (${sourceFormat} → ${targetFormat})`
        );
      }
    } catch (error) {
      // Compression is deliberately fail-open. A provider-shaped transform
      // must never turn an otherwise valid translated request into a 500.
      log?.warn?.(
        "COMPRESSION",
        "Post-translation OmniGlyph skipped: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  trace("post_translation");

  // Keep the request translator's namespace identities separate from toolNameMap:
  // the latter is a Kiro/Claude passthrough alias channel with string values,
  // while namespace identities carry `{namespace, name}` for the #7936 response
  // seam. Extract first because Kiro merge may reuse `_toolNameMap` below.
  const requestToolIdentityMap = extractRequestToolIdentityMap(translatedBody);

  // Kiro: sanitize tool schemas before dispatch. Kiro returns 400 "Improperly
  // formed request" for unsupported JSON-Schema keywords (anyOf/$ref/if-then,
  // etc.) and tool names >64 chars. Strip those keys and hash-truncate long
  // names; merge the truncated→original nameMap into the existing
  // `_toolNameMap` so kiro-to-openai maps streamed tool-call names back (#1375).
  if (targetFormat === FORMATS.KIRO) {
    const kiroTools =
      translatedBody?.conversationState?.currentMessage?.userInputMessage?.userInputMessageContext
        ?.tools;
    if (kiroTools) {
      const { tools: sanitizedKiroTools, nameMap: kiroNameMap } = sanitizeKiroTools(kiroTools);
      translatedBody.conversationState.currentMessage.userInputMessage.userInputMessageContext.tools =
        sanitizedKiroTools;
      if (kiroNameMap.size > 0) {
        const existing =
          translatedBody._toolNameMap instanceof Map
            ? translatedBody._toolNameMap
            : new Map<string, string>();
        kiroNameMap.forEach((original, truncated) => existing.set(truncated, original));
        translatedBody._toolNameMap = existing;
      }
    }
  }

  // Claude: strict Anthropic-compatible gateways (e.g. MiniMax) reject tool
  // definitions that omit the required `type` discriminator with HTTP 400. Default
  // a missing `type` to "custom" before dispatch, mirroring Anthropic's own
  // inference, so legacy Claude-format tool payloads survive strict gateways (#2195).
  // AgentRouter is the opposite quirk: its Rust deserializer only accepts versioned
  // tool types and 400s on `type: "custom"` — there the discriminator is stripped
  // instead (see claudeToolDefaults.ts).
  if (targetFormat === FORMATS.CLAUDE && Array.isArray(translatedBody.tools)) {
    translatedBody.tools = normalizeClaudeToolsForDispatch(
      translatedBody.tools,
      provider
    ) as typeof translatedBody.tools;
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  // Resolution order matters: `_toolNameMap` was already deleted by
  // `extractRequestToolIdentityMap`, so Gemini/Antigravity depend on the
  // `requestToolIdentityMap` fallback inside this helper (#9568 / #7936).
  const toolNameMap = resolveResponseToolNameMap(
    translatedToolNameMap,
    nativeClaudeToolNameMap,
    requestToolIdentityMap
  );
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

  const previousResponseIdPolicy = applyResponsesPreviousResponseIdPolicy(translatedBody, {
    mode: settings.responsesPreviousResponseIdMode,
    provider,
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

  // Strip unsupported parameters for reasoning models (o1, o3, etc.) and any
  // provider that can't accept them at all (e.g. AI Horde's raw completion
  // backends). When "tools" is among them, also flattens leftover
  // tool_calls/tool-result messages in history (from a combo failover away
  // from a tool-capable model) — those message shapes break non-tool-calling
  // backends just as much as a live `tools` param does.
  const unsupported = getUnsupportedParams(provider, model);

  // Direct/pinned requests (isCombo: false) have no other target to fail
  // over to. Combo requests are already kept off a tool-incapable target by
  // filterTargetsByRequestCompatibility before ever reaching this point, so
  // this only fires for the case that filter can't protect: a client
  // explicitly asking for this exact model. A clear error beats a 200 that
  // silently can't do what was asked (the model narrates a fake tool call
  // instead — live incident: AI Horde/Behemoth-X-123B).
  const toolCallingCheck = checkToolCallingRequiredButUnsupported(
    translatedBody,
    unsupported,
    isCombo,
    model
  );
  if (toolCallingCheck.blocked) {
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    return createErrorResult(400, toolCallingCheck.message!, null, "tool_calling_not_supported");
  }

  // Rename max_tokens to max_completion_tokens if not supported (#1961)
  if (!supportsMaxTokens({ provider, model })) {
    if (translatedBody.max_tokens !== undefined) {
      if (translatedBody.max_completion_tokens === undefined) {
        translatedBody.max_completion_tokens = translatedBody.max_tokens;
      }
      delete translatedBody.max_tokens;
      log?.debug?.("PARAMS", `Renamed max_tokens to max_completion_tokens for ${model}`);
    }
  } else if (translatedBody.max_completion_tokens !== undefined) {
    // Symmetric case (#6912): some providers/models (e.g. Volcengine Ark /
    // DeepSeek) only document the legacy `max_tokens` field and silently
    // ignore an unrecognized `max_completion_tokens`, so a client sending the
    // newer field alone would have it dropped upstream with no cap applied.
    if (translatedBody.max_tokens === undefined) {
      translatedBody.max_tokens = translatedBody.max_completion_tokens;
    }
    delete translatedBody.max_completion_tokens;
    log?.debug?.("PARAMS", `Renamed max_completion_tokens to max_tokens for ${model}`);
  }

  stripStore(
    translatedBody,
    provider,
    targetFormat,
    credentials?.providerSpecificData as Record<string, unknown> | null | undefined
  );

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

  // #6339: pass the resolved connection's providerSpecificData so a per-connection
  // cliproxyapiMode="claude-native" override can deep-route this single connection
  // through CLIProxyAPI regardless of the provider-level upstream_proxy_config mode.
  const resolveExecutorWithProxy = (prov: string) =>
    resolveExecutorWithProxyFor(
      prov,
      log,
      (credentials?.providerSpecificData as Record<string, unknown> | null | undefined) ?? null
    );

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
      }).catch((err: unknown): EnforceDecision => {
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
        // Finalize the pending-request slot registered at handler entry — this
        // return path never reaches the upstream, and without the decrement the
        // pending detail lingers as an orphaned status-0 call-log row until the
        // reaper sweeps it (mirrors the other pre-upstream error returns).
        trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
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
  if (isFeatureFlagEnabled("CAPABILITY_FILTER_ENABLED")) {
    const fit = checkRequestCapabilityFit(
      getResolvedModelCapabilities({ provider, model: effectiveModel }),
      deriveRequestCapabilityRequirements(body as Record<string, unknown>),
      provider
    );
    if (!fit.compatible) {
      const msg = buildCapabilityMismatchMessage(fit.terminalReason!, provider, effectiveModel);
      log?.warn?.("CAPABILITY", msg);
      trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
      return createErrorResult(400, msg, null, fit.terminalReason, "invalid_request_error");
    }
  }
  // Get executor for this provider (with optional upstream proxy routing)
  const executor = await resolveExecutorWithProxy(provider);
  const getExecutionCredentials = () =>
    withReasoningRuleContext(
      resolveExecutionCredentialsFor({
        credentials,
        nativeCodexPassthrough: nativeResponsesPassthrough,
        endpointPath,
        targetFormat,
        provider,
        ccSessionId,
        modelInfo,
      }),
      reasoningRuleDirective
    );

  let onPipelineStreamError: streamFailure.PipelineStreamErrorHandler | null = null;
  let onClientDisconnectFinalize:
    ((event: { reason: string; duration: number }) => boolean) | null = null;

  // Create stream controller for disconnect detection
  const streamController = createStreamController({
    onDisconnect: (event) => {
      let finalized = false;
      try {
        finalized = onClientDisconnectFinalize?.(event) === true;
      } catch {}
      if (!finalized) {
        try {
          finalizePendingScope(pendingScope, {
            status: 499,
            error: `Client disconnected: ${event.reason}`,
            errorCode: "client_disconnected",
          });
          finalized = true;
        } catch {}
      }
      try {
        onDisconnect?.(event);
      } catch {}
      return finalized;
    },
    onError: (event) => onPipelineStreamError?.(event),
    provider,
    model,
    connectionId,
    pendingRequestId,
    clientResponseFormat,
    clientAbortSignal: clientRawRequest?.signal,
    allowCompletedToolHandoffGrace: isCodexResponsesEcho,
    clientDisconnectGracePeriodMs: STREAM_DISCONNECT_GRACE_PERIOD_MS,
  });

  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}`, stream };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  // Namespaced by the calling API key: dedup hands the SAME response object to
  // every joiner, so a shared hash across keys is a cross-principal response
  // leak (GHSA-6c7w-56xp-wpc6).
  const dedupHash = dedupEnabled
    ? computeRequestHash(dedupRequestBody, apiKeyInfo?.id, trustedEffortContext)
    : null;

  const executeProviderRequestDeps = {
    agentGoalPolicy,
    assertManagedLeaseFence,
    buildUpstreamHeadersForExecute,
    clientRawRequest,
    clientResponseFormat,
    connectionId,
    contextEditingEnabled,
    correlationId,
    credentials,
    dedupEnabled,
    dedupHash,
    effectiveModel,
    executor,
    extendedContext,
    getExecutionCredentials,
    getExecutorClientHeaders,
    isModelScope,
    isOpencodeClient,
    log,
    model,
    onCredentialsRefreshed,
    pendingScope,
    pendingConnId,
    pendingRequestId,
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
  // The pre-decomposition inline executeProviderRequest closed over the LIVE
  // `translatedBody` binding: every mid-flight rebinding (pipeline wire update,
  // tool-loop follow-up, thinking-signature recovery) was visible to the next
  // dispatch. The deps object above only holds a snapshot, so the leg leaves
  // must push each rebinding back through this setter to keep the wire send
  // reading the current body.
  const syncExecuteTranslatedBody = (next: unknown) => {
    translatedBody = next as typeof translatedBody;
    executeProviderRequestDeps.translatedBody = next as Record<string, unknown>;
  };
  const executeProviderRequest = (
    modelToCall: string = effectiveModel,
    allowDedup: boolean = false
  ) => executeProviderRequestLeaf(executeProviderRequestDeps, modelToCall, allowDedup);

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
        trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
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
        trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
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
  let providerUrl;
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

  const applyProviderFailureClassification = async ({
    statusCode,
    message,
    headers,
    upstreamErrorBody,
    retryAfterMs,
    targetModel,
  }: {
    statusCode: number;
    message: string;
    headers?: Headers | null;
    upstreamErrorBody?: unknown;
    retryAfterMs?: number | null;
    targetModel: string;
  }) => {
    let errorType = classifyProviderError(statusCode, message, provider);
    if (statusCode === 429 && isModelScope()) {
      const decision = classifyModelScope429(message, normalizeHeaders(headers));
      errorType =
        decision.kind === "quota_exhausted"
          ? PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
          : PROVIDER_ERROR_TYPES.RATE_LIMITED;
      log?.warn?.(
        "MODELSCOPE_429",
        `${decision.kind} (model remaining: ${decision.snapshot.modelRemaining ?? "unknown"}, total remaining: ${decision.snapshot.totalRemaining ?? "unknown"})`
      );
    }
    const persistentMessage = projectRetainedProviderFailureMessage(message, videoBridgeObserved);
    const errorConnectionId = getCurrentConnectionId() || connectionId;
    if (errorConnectionId && errorType) {
      try {
        if (errorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
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
              `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) -- connection stays active`
            );
          } else {
            console.warn(
              `[provider] Node ${errorConnectionId} banned (${statusCode}) -- disabling permanently`
            );
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
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
              `[provider] Node ${errorConnectionId} account deactivated (${statusCode}) -- has extra keys, keeping connection active`
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
                `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) -- connection stays active`
              );
            } else {
              console.warn(
                `[provider] Node ${errorConnectionId} account deactivated (${statusCode}) -- disabling permanently`
              );
            }
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED) {
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
              `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) -- connection stays active`
            );
          } else {
            let kimiRateLimitResetAt: string | null = null;
            if (provider === "kimi-coding") {
              try {
                const { fetchAndPersistProviderLimits } =
                  await import("@/lib/usage/providerLimits");
                const { usage } = await fetchAndPersistProviderLimits(errorConnectionId, "manual");
                kimiRateLimitResetAt = getKimiTemporaryRateLimitResetAt(usage);
              } catch {}
            }

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
                headers: headers ?? undefined,
              });
              quotaCooldownMs = coreOwnedAntigravityLockout.cooldownMs;
            }
            const accountSemaphoreKey = resolveAccountSemaphoreKey({
              provider,
              model: targetModel,
              connectionId: errorConnectionId,
              credentials,
            });
            if (accountSemaphoreKey && !deferAntigravityQuotaStateToCaller) {
              markAccountSemaphoreBlocked(accountSemaphoreKey, quotaCooldownMs);
            }
            if (deferAntigravityQuotaStateToCaller) {
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
                `[provider] Node ${errorConnectionId} Kimi request window exhausted (${statusCode}) -- retrying after ${kimiRateLimitResetAt}`
              );
            } else if (isModelScope() && errorConnectionId) {
              lockModel(provider, errorConnectionId, model, "quota_exhausted", quotaCooldownMs);
              if (targetModel && targetModel !== model) {
                lockModel(
                  provider,
                  errorConnectionId,
                  targetModel,
                  "quota_exhausted",
                  quotaCooldownMs
                );
              }
              console.warn(
                `[provider] Node ${errorConnectionId} ModelScope model quota exhausted (${statusCode}) for ${targetModel} - ${Math.ceil(quotaCooldownMs / 1000)}s (connection stays active)`
              );
            } else if (
              lockModelIfPerModelQuota(
                provider,
                errorConnectionId,
                model,
                "quota_exhausted",
                quotaCooldownMs
              ) ||
              (targetModel &&
                targetModel !== model &&
                lockModelIfPerModelQuota(
                  provider,
                  errorConnectionId,
                  targetModel,
                  "quota_exhausted",
                  quotaCooldownMs
                ))
            ) {
              const quotaScope = getQuotaScopeLabelForProvider(provider, targetModel);
              console.warn(
                `[provider] Node ${errorConnectionId} ${quotaScope}-only quota exhausted (${statusCode}) for ${targetModel} - ${Math.ceil(quotaCooldownMs / 1000)}s (cooldown_scope=${quotaScope}, ttl_source=${retryAfterMs ? "upstream" : "inferred"}, connection stays active)`
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
              console.warn(`[provider] Node ${errorConnectionId} exhausted quota (${statusCode})`);
            }
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED) {
          await updateProviderConnection(errorConnectionId, {
            lastErrorType: errorType,
            lastError: persistentMessage,
            errorCode: statusCode,
          });
        } else if (errorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN) {
          await updateProviderConnection(errorConnectionId, {
            lastErrorType: errorType,
            lastError: persistentMessage,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${errorConnectionId} OAuth token invalid (${statusCode}) -- token refresh available`
          );
        } else if (errorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR) {
          await updateProviderConnection(errorConnectionId, {
            lastErrorType: errorType,
            lastError: persistentMessage,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${errorConnectionId} project routing error (${statusCode}) -- not banning`
          );
          // #14313: free-tier refusal on the keyless path — record a short TTL
          // skip so auto-combo / noauth fallback stop re-picking it immediately.
          if (
            errorConnectionId === "noauth" &&
            isOpencodeFreeTierRefusalForProvider(provider, statusCode, message)
          ) {
            noteOpencodeFreeTierSkip(provider);
          }
        } else if (errorType === PROVIDER_ERROR_TYPES.GEO_BLOCKED) {
          // Google regional refusal: account-independent, non-terminal; park the connection
          // until egress uses a supported region; probes skip the day-long cooldown (#9817).
          await excludeConnectionForCooldown({
            connectionId: errorConnectionId,
            errorType,
            message: persistentMessage,
            statusCode,
            cooldownMs: COOLDOWN_MS.geoBlocked ?? 24 * 60 * 60 * 1000,
            skipCooldownForProbe: true,
            label: "geo-blocked",
            suffix: "trying other accounts",
          });
        } else if (errorType === PROVIDER_ERROR_TYPES.REQUEST_REJECTED) {
          // Per-request refusal (#12859): growing cooldown, streak → banned.
          await handleRequestRejectedFailure({
            connectionId: errorConnectionId,
            statusCode,
            message: persistentMessage,
          });
        } else if (errorType === PROVIDER_ERROR_TYPES.GCP_PROJECT_REQUIRED) {
          // Antigravity BYOP: fixable via a Project ID; never a lockout/ban. Park the connection.
          await excludeConnectionForCooldown({
            connectionId: errorConnectionId,
            errorType,
            message: persistentMessage,
            statusCode,
            cooldownMs: COOLDOWN_MS.gcpProjectRequired ?? 24 * 60 * 60 * 1000,
            skipCooldownForProbe: false,
            label: "GCP project required",
            suffix: "routing to other accounts (enter a Project ID to restore)",
          });
        } else if (errorType === PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND) {
          const notFoundCooldownMs = COOLDOWN_MS.notFound;
          if (!(await shouldIsolateProbeFailures())) {
            const modelToLock = targetModel || model;
            lockModel(
              provider,
              errorConnectionId,
              modelToLock,
              "model_not_found",
              notFoundCooldownMs
            );
            console.warn(
              `[provider] Node ${errorConnectionId} model not found (${statusCode}) for ${modelToLock} - locking model for ${Math.ceil(notFoundCooldownMs / 1000)}s (connection stays active)`
            );
          }
        }
      } catch {}
    }

    if (headers) {
      updateFromHeaders(provider, errorConnectionId, headers, statusCode, targetModel);
    }
    if (errorConnectionId && upstreamErrorBody !== null && upstreamErrorBody !== undefined) {
      updateFromResponseBody(
        provider,
        errorConnectionId,
        upstreamErrorBody,
        statusCode,
        targetModel
      );
    }
  };

  let pipelineRecovered = false;
  if (stream) {
    const streamingOutcome = await runStreamingResponse({
      apiKeyInfo,
      persistAttemptLogs,
      buildUpstreamHeadersForExecute,
      resolveEffectiveServiceTier,
      clientResponseFormat,
      correlationId,
      extendedContext,
      executeProviderRequest,
      applyProviderFailureClassification,
      assertManagedLeaseFence,
      body,
      clientRawRequest,
      comboStrategy,
      connectionId,
      contextEditingEnabled,
      credentials,
      effectiveModel,
      executeRefreshCredentials,
      executor,
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
      pendingConnId,
      pendingRequestId,
      persistFailureUsage,
      provider,
      providerRequestCapture,
      reqLogger,
      sessionAffinityKey,
      skillRequestId,
      sourceFormat,
      stream,
      streamController,
      syncExecuteTranslatedBody,
      targetFormat,
      triedModels,
      trustedEffortContext,
      upstreamStream,
      userAgent,
      claudePromptCacheLogMeta,
      currentModel,
      effectiveServiceTier,
      finalBody,
      pipelineRecovered,
      providerHeaders,
      providerResponse,
      providerUrl,
      translatedBody,
    });
    if (streamingOutcome) {
      translatedBody = streamingOutcome.carry.translatedBody;
      currentModel = streamingOutcome.carry.currentModel;
      effectiveServiceTier = streamingOutcome.carry.effectiveServiceTier;
      finalBody = streamingOutcome.carry.finalBody;
      pipelineRecovered = streamingOutcome.carry.pipelineRecovered;
      providerHeaders = streamingOutcome.carry.providerHeaders;
      providerResponse = streamingOutcome.carry.providerResponse;
      providerUrl = streamingOutcome.carry.providerUrl;
    }
    if (streamingOutcome && streamingOutcome.response) return streamingOutcome.response;
  }

  // Non-streaming response
  if (!stream) {
    const nonStreamingOutcome = await runNonStreamingResponse({
      apiKeyInfo,
      appendRequestLog,
      applyProviderFailureClassification,
      assertManagedLeaseFence,
      attachCompressionUsageReceiptAfterAnalytics,
      body,
      bodyForCacheWrite,
      buildCacheUsageLogMeta,
      buildCostCtx,
      buildErrorBody,
      calculateCost,
      claudePromptCacheLogMeta,
      clientRawRequest,
      clientRequestedResponsesStream,
      clientResponseFormat,
      comboStrategy,
      compressionResponseMeta,
      connectionId,
      contextEditingEnabled,
      copilotCompatibleReasoning,
      createErrorResult,
      credentials,
      currentModel,
      customToolNames,
      describeMalformedNonStream,
      detectMalformedNonStream,
      echoModel,
      echoModelInObject,
      effectiveModel,
      effectiveServiceTier,
      emitRequestGamificationEvent,
      endpointPath,
      executeProviderRequest,
      executeRefreshCredentials,
      extractSessionAffinityKey,
      extractUsageFromResponse,
      fallbackAttempts,
      finalBody,
      finalizePendingScope,
      getCurrentConnectionId,
      getManagedLeaseFenceErrorCode,
      getModelNormalizeToolCallId,
      getModelPreserveOpenAIDeveloperRole,
      getSafeErrorMetadata,
      getSkillsModelIdForFormat,
      guardrailRegistry,
      handleCredentialsRefreshed,
      handleToolCallExecution,
      idempotencyKey,
      incrementTokenUsage,
      injectionResult,
      isClaudeCodeCompatible,
      isCombo,
      isJsonRecord,
      isLocalStreamLifecycleError,
      isResponsesEndpoint,
      isSemaphoreCapacityError,
      isServerOwnedToolLoopEnabled,
      log,
      logAuditEvent,
      managedLease,
      managedLeaseFenceErrorResult,
      markAccountSemaphoreBlocked,
      memoryOwnerId,
      memorySettings,
      model,
      normalizeHeaders,
      normalizeUsage,
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
      recordChatCallCost,
      recordContextEditingTelemetryHook,
      recordCoreOwnedAntigravityQuotaState,
      recordNonStreamingUsageStats,
      reportMalformed200,
      reqLogger,
      requestToolIdentityMap,
      resolveReportedServiceTier,
      runMemoryExtractionGate,
      runPluginOnResponseHook,
      sanitizeErrorMessage,
      sanitizeUpstreamDetails,
      saveIdempotency,
      scheduleQuotaShareConsumption,
      semanticCacheEnabled,
      sessionAffinityKey,
      shouldIsolateProbeFailures,
      skillRequestId,
      sourceFormat,
      startTime,
      stream,
      targetFormat,
      toolNameMap,
      traceEnabled,
      traceId,
      trackPendingRequest,
      translateRequest,
      translatedBody,
      triedModels,
      updateFromHeaders,
      updateFromResponseBody,
      updatePendingScope,
      updateProviderConnection,
      videoBridgeObserved,
      webFetchFallbackPlan,
      webSearchFallbackPlan,
      syncExecuteTranslatedBody,
    });
    if (nonStreamingOutcome) {
      translatedBody = nonStreamingOutcome.carry.translatedBody;
      currentModel = nonStreamingOutcome.carry.currentModel;
      finalBody = nonStreamingOutcome.carry.finalBody;
      providerResponse = nonStreamingOutcome.carry.providerResponse;
      providerHeaders = nonStreamingOutcome.carry.providerHeaders;
      effectiveServiceTier = nonStreamingOutcome.carry.effectiveServiceTier;
      claudePromptCacheLogMeta = nonStreamingOutcome.carry.claudePromptCacheLogMeta;
      reasoningReplayHistory = nonStreamingOutcome.carry.reasoningReplayHistory;
      pipelineRecovered = nonStreamingOutcome.carry.pipelineRecovered;
      return nonStreamingOutcome.response;
    }
  }

  const streamingTailOutcome = await runStreamingTail({
    agentGoalPolicy,
    forcedConnectionId,
    apiKeyInfo,
    attachCompressionUsageReceiptAfterAnalytics,
    body,
    bodyForCacheWrite,
    claudePromptCacheLogMeta,
    clientRawRequest,
    clientResponseFormat,
    comboStrategy,
    compressionResponseMeta,
    connectionId,
    contextEditingEnabled,
    copilotCompatibleReasoning,
    correlationId,
    createPiiTransform,
    credentials,
    currentModel,
    customToolNames,
    echoModel,
    effectiveServiceTier,
    endpointPath,
    executeProviderRequest,
    fallbackAttempts,
    finalBody,
    getCurrentConnectionId,
    isCombo,
    isDroidCLI,
    isResponsesEndpoint,
    log,
    memoryOwnerId,
    memorySettings,
    model,
    onRequestSuccess,
    onStreamFailure,
    pendingConnId,
    pendingRequestId,
    persistAttemptLogs,
    persistFailureUsage,
    pipelineSessionId,
    provider,
    providerHeaders,
    providerRequestCapture,
    providerResponse,
    providerUrl,
    reasoningCacheScope,
    reasoningReplayHistory,
    releaseTurnExecution,
    reqLogger,
    requestToolIdentityMap,
    resolveReportedServiceTier,
    semanticCacheEnabled,
    skillRequestId,
    startTime,
    stream,
    streamController,
    streamUserAgent,
    targetFormat,
    thinkingMarkerHeader,
    toolNameMap,
    traceId,
    translatedBody,
    videoBridgeObserved,
  });
  onPipelineStreamError = streamingTailOutcome.carry.onPipelineStreamError;
  onClientDisconnectFinalize = streamingTailOutcome.carry.onClientDisconnectFinalize;
  turnExecutionHandedOffToStream = streamingTailOutcome.carry.turnExecutionHandedOffToStream;
  return streamingTailOutcome.result;
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
