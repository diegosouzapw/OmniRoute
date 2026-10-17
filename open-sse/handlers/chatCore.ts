import { finalizeTranslatedRequest } from "./chatCore/translatedRequestFinalize.ts";
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
import { buildRequestTranslationErrorResult } from "./chatCore/requestTranslationError.ts";
import {
  estimateCalibratedFinalInputTokens,
  estimateFinalInputTokenBreakdown,
} from "./chatCore/contextEstimation.ts";
import { buildClaudePassthroughBody } from "./chatCore/claudePassthroughBody.ts";
export {
  extractSystemRoleMessages,
  hoistLeadingTextSystemMessages,
  relocateDirectiveOnlyMessages,
} from "./chatCore/claudeSystemRole.ts";
import { checkIdempotencyCache } from "./chatCore/idempotency.ts";
import { acquireTurnExecution, createTurnInProgressResult } from "./chatCore/turnExecutionGuard.ts";
import { checkSemanticCache, isSemanticCacheEnabled } from "./chatCore/semanticCache.ts";
import { checkLifecycle, resolveLifecycle } from "./chatCore/modelLifecyclePolicy.ts";
import {
  shouldDefaultAllowClassifier,
  detectClassifierFormat,
  buildDefaultAllowClaudeMessage,
  applyClaudeClassifierReasoningDefault,
} from "./chatCore/claudeClassifierCompat.ts";
import { enforceFinalOutputTokenBudget } from "./chatCore/finalOutputBudget.ts";
import { withResilienceActionsContext } from "./chatCore/resilienceAttemptContext.ts";
import { notePreviousResponseResumed } from "./chatCore/resumedResilienceNotes.ts";
import { runStreamingResponse } from "./chatCore/streamingResponse.ts";
import { runStreamingTail } from "./chatCore/streamingTail.ts";
import { sanitizeChatRequestBody } from "./chatCore/sanitization.ts";
import { isReasoningContinuationIncompatible } from "./chatCore/reasoningInputGate.ts";

import {
  getHeaderValueCaseInsensitive,
  isNoMemoryRequested,
  resolveCompressionHeader,
} from "./chatCore/headers.ts";

import {
  isCodexOriginatedHeaders,
  isClaudeCodeOriginatedHeaders,
} from "../config/codexIdentity.ts";
import { trackRequestDevice } from "./chatCore/deviceTracking.ts";
import { getCombosCached } from "./chatCore/comboContextCache.ts";
import { resolveConnectionUpstreamOverrides } from "./chatCore/connectionUpstreamOverrides.ts";
import {
  buildRegisteredProviderRequest,
  countTranslatedMessages,
} from "./chatCore/providerRequestRegistration.ts";
import { collectPreConversionClientToolNames } from "./chatCore/clientToolNames.ts";
export { clearCombosCache, clearUpstreamProxyConfigCache } from "./chatCore/comboContextCache.ts";
import { resolveAccountSemaphoreKey } from "./chatCore/executorHelpers.ts";
import {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  shouldUseNativeOpenAICompatibleResponsesPassthrough,
  stampNativeResponsesPassthroughBody,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "./chatCore/passthroughHelpers.ts";

import {
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
} from "./chatCore/responseHeaders.ts";
import {
  emitCompressionCompletedEvent,
  emitCompressionStepEvent,
} from "./chatCore/compressionLiveEvents.ts";
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
import { usesClaudeBridge } from "./chatCore/agentRouterProtocol.ts";
import { normalizeUpstreamRequestParams } from "./chatCore/upstreamRequestParams.ts";
import { injectSystemPromptPreTranslation } from "../services/systemPrompt.ts";
import { applyCustomSystemPrompt } from "./chatCore/customSystemPrompt.ts";
import { applyProviderSystemTransforms } from "../services/systemTransforms.ts";
import { translateRequest } from "../translator/index.ts";
import { applyReasoningRuleDirective } from "@/lib/reasoningRouting/policy";
import { withReasoningRuleContext } from "../utils/reasoningRuleContext.ts";
import { FORMATS } from "../translator/formats.ts";
import { collectCustomToolNamesForSourceFormat } from "../translator/request/openai-responses/additionalTools.ts";
import { THINKING_MARKER_HEADER } from "../utils/thinkCloseMarker.ts";
import { resolveAgentGoalPolicy } from "../utils/agentGoalPolicy.ts";
import { createChatStreamController } from "./chatCore/chatStreamController.ts";
import * as streamFailure from "../utils/streamFailureFinalization.ts";
import { normalizeUsage } from "../utils/usageTracking.ts";
import { refreshWithRetry, runWithOnPersist, runWithCasGuard } from "../services/tokenRefresh.ts";
import { createRequestLogger } from "../utils/requestLogger.ts";
import { createPreparedRequestLogger } from "../utils/providerRequestLogging.ts";
import { summarizeToolSources } from "../utils/toolSources.ts";
import { applyClaudeEffortVariant } from "./chatCore/claudeEffortVariant.ts";
import {
  getStripTypesForProviderModel,
  stripIncompatibleMessageContent,
} from "../services/modelStrip.ts";
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
import { COOLDOWN_MS, HTTP_STATUS } from "../config/constants.ts";

import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { classifyProviderError, PROVIDER_ERROR_TYPES } from "../services/errorClassifier.ts";
import { updateProviderConnection, getProviderConnectionById } from "@/lib/db/providers";

import { connectionHasExtraKeys } from "../services/apiKeyRotator.ts";
import { shouldKeepConnectionActiveOnRateLimit } from "./chatCore/rateLimitConnectionGuard.ts";
import { recordKeyHealthStatus as recordKeyHealthStatusFor } from "./chatCore/keyHealth.ts";
import { getSkillsModelIdForFormat } from "./chatCore/skillsFormat.ts";
import { isSemaphoreCapacityError, getSafeErrorMetadata } from "./chatCore/streamErrorResult.ts";
import { buildCacheUsageLogMeta } from "./chatCore/cacheUsageMeta.ts";

import { resolveExecutionCredentials as resolveExecutionCredentialsFor } from "./chatCore/executionCredentials.ts";
import { createExecutorResolver } from "./chatCore/executorProxy.ts";
import { normalizeClaudeUpstreamMessages as normalizeClaudeUpstreamMessagesFor } from "./chatCore/claudeUpstreamMessages.ts";
import {
  persistAttemptLogs as persistAttemptLogsFor,
  type PersistAttemptLogsArgs,
} from "./chatCore/attemptLogging.ts";
import { stageTrace } from "./chatCore/stageTrace.ts";
import { attachCompressionUsageReceiptAfterAnalytics as attachCompressionUsageReceiptAfterAnalyticsFor } from "./chatCore/compressionUsageReceipt.ts";

import { getQuotaScopeLabelForProvider } from "../services/antigravityQuotaFamily.ts";
import { excludeConnectionForCooldown } from "./chatCore/connectionCooldown.ts";
import { handleProjectRouteFailure } from "./chatCore/projectRouteFailure.ts";
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
import { handleBypassRequest } from "../utils/bypassHandler.ts";
import { saveRequestUsage, trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import {
  finalizePendingScope,
  initialPendingBody,
  updatePendingScope,
} from "@/lib/usage/pendingRequestScope";
import { recordChatCallCost, buildCostCtx } from "@/domain/costRules";
import { attachOmniRouteMetaToResponse as attachRouteMeta } from "@/domain/omnirouteResponseMeta";
import { calculateCost } from "@/lib/usage/costCalculator";
import {
  createDisabledCompressionConfig,
  resolveCompressionSettings,
} from "./chatCore/compressionSettings.ts";
import { isCompressionExcluded } from "../services/compression/exclusions.ts";
import {
  defaultComboForRequest,
  isBuiltinStackedPipeline,
  type RuntimeCompressionCombo,
} from "./chatCore/compressionComboPredicates.ts";
import { mergeCompressionComboIntoConfig } from "./chatCore/compressionComboConfig.ts";
import { emitOutputStyleTelemetry } from "./chatCore/outputStyleTelemetry.ts";
import {
  writeCompressionAnalytics,
  writeCompressionSkip,
} from "./chatCore/compressionAnalyticsWrite.ts";
import { runPluginRequestGate } from "./chatCore/pluginRequestGate.ts";
import { recordContextEditingTelemetryHook } from "./chatCore/contextEditingTelemetry.ts";
import { recordCompressionCacheStats } from "./chatCore/compressionCacheStats.ts";
import { writeCavemanOutputAnalytics } from "./chatCore/cavemanOutputAnalytics.ts";
import { scheduleQuotaShareConsumption } from "./chatCore/quotaShareConsumption.ts";
import { runQuotaSharePreHook } from "./chatCore/quotaSharePreHook.ts";
import { emitRequestGamificationEvent } from "./chatCore/gamificationEvent.ts";
import { runPluginOnResponseHook } from "./chatCore/pluginOnResponse.ts";
import { applyPostTranslationCompression } from "./chatCore/postTranslationCompression.ts";
import { isJsonRecord } from "./chatCore/nonStreamingResponseParse.ts";
import { recordNonStreamingUsageStats } from "./chatCore/nonStreamingUsageStats.ts";
import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/db/models";
import { extractSessionAffinityKey } from "@/sse/services/auth";
import { createManagedLeaseFence } from "./chatCore/managedLeaseFence.ts";

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
import { resolveToolDisclosureConfig } from "../utils/toolDisclosure.ts";
import {
  applyApiKeyCodexServiceMode,
  withApiKeyCodexServiceMode,
} from "@/lib/providers/codexApiKeyServiceMode";
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
import { saveIdempotencyWithConfiguredWindow } from "@/lib/idempotencyLayer";

import { computeRequestHash, shouldDeduplicate } from "../services/requestDedup.ts";
import {
  compressContext,
  estimateTokens,
  getTokenLimit,
  getComboTargetTokenLimit,
  resolveComboContextLimit,
} from "../services/contextManager.ts";
import { resolveBackgroundTaskRedirect } from "./chatCore/backgroundRedirect.ts";
import { resolveCopilotAuto } from "./chatCore/copilotAutoModel.ts";
import { emitThinkingSignatureDiagnostics } from "./chatCore/thinkingSignatureDiagnostics.ts";
import type {
  CompressionConfig,
  CompressionPipelineStep,
  CompressionResult,
} from "../services/compression/types.ts";
import { runLiveZoneCompression } from "./chatCore/liveZoneCompression.ts";
import { prepareWebSearchFallbackBody } from "../services/webSearchFallback.ts";
import { prepareWebFetchFallbackBody } from "../services/webFetchInterception.ts";
import { resolveInterceptSearch, resolveInterceptFetch } from "@/lib/db/interceptionRules";
import { resolveExplicitStreamAlias, resolveStreamFlag } from "../utils/aiSdkCompat.ts";
import { generateRequestId } from "@/shared/utils/requestId";
import { isLocalStreamLifecycleError } from "@/shared/utils/circuitBreaker";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";
import { handleToolCallExecution } from "@/lib/skills/interception";
import { buildClaudeCodeBridgeBody } from "./chatCore/claudeCodeBridgeBody.ts";
import { setGeminiThoughtSignatureMode } from "../services/geminiThoughtSignatureStore.ts";
import { classifyModelScope429, isModelScopeProvider } from "../services/modelscopePolicy.ts";
import { incrementTokenUsage, isTpmExhausted } from "../services/geminiRateLimitTracker.ts";

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
  // Trusted management validation only; never populated from request body/headers.
  validationExecutorFence = null,
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
  // Managed-lease request fence extracted to chatCore/managedLeaseFence.ts (chatCore slice 2).
  const { assertManagedLeaseFence, getManagedLeaseFenceErrorCode, managedLeaseFenceErrorResult } =
    createManagedLeaseFence(managedLease);
  let tokensCompressed: number | null = null;
  // ── Per-endpoint custom system prompt (port of upstream #2063) ──
  // Extracted to chatCore/customSystemPrompt.ts (chatCore slice 2); reads cachedSettings when the
  // combo/chat layer passed it in, so the hot path does no extra DB read.
  body = applyCustomSystemPrompt(body, cachedSettings ?? (await getCachedSettings()), log);
  // ── Plugin onRequest hook ── extracted to chatCore/pluginRequestGate.ts (chatCore slice 2):
  // a block becomes the labelled 403 `plugin_block` result; a rewrite replaces the body.
  const pluginGate = await runPluginRequestGate({
    requestId: traceId,
    body,
    model,
    provider,
    apiKeyInfo,
    headers: clientRawRequest?.headers,
    log,
  });
  if (pluginGate.blocked === true) return pluginGate.result;
  body = pluginGate.body;
  // Per-API-key device/connection tracking (port of upstream 9router#931,
  // thanks @mugnimaestra). In-memory only, never blocks the request path.
  trackRequestDevice({
    apiKeyId: apiKeyInfo?.id,
    headers: clientRawRequest?.headers ?? null,
    userAgent,
  });
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
    failureDetail?: string,
    retryAfterMs?: number | null
  ): void => recordKeyHealthStatusFor(status, creds, log, transport, failureDetail, retryAfterMs);
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
    // NEXA fusion-idempotency fix: body.messages feeds the key digest so combo-internal sub-requests
    // (fusion panel + judge share the client's headers) never collide on the raw header key.
    body,
    apiKeyId: apiKeyInfo?.id ?? null,
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

  // Synthetic classifier ALLOW stays opt-in; ordinary classifier calls still go upstream
  // with the native-thinking default applied below. See claudeClassifierCompat.ts.
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
  body = applyClaudeClassifierReasoningDefault(
    sourceFormat,
    body as Record<string, unknown>,
    { headers: clientRawRequest?.headers, resolvedThinkingEffort }
  );

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

  const ca = await resolveCopilotAuto(provider, model, body, credentials, sessionAffinityKey, log);
  if (ca.errorResult) return ca.errorResult;
  ({ model, credentials } = ca);
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
  // Extracted to chatCore/clientToolNames.ts (chatCore slice 2).
  const preConversionClientToolNames = collectPreConversionClientToolNames(body);

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
    // Responses clients and Claude clients on Cursor must execute the internal
    // search loop non-streaming, then replay the final response as client-native
    // SSE. Otherwise the client receives an undeclared omniroute_web_search call
    // instead of the search result and final answer.
    if (
      (sourceFormat === FORMATS.OPENAI_RESPONSES ||
        (provider === "cursor" && sourceFormat === FORMATS.CLAUDE)) &&
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
  // Custom User-Agent + #8369 custom headers: extracted to chatCore/connectionUpstreamOverrides.ts
  // (chatCore slice 2).
  const { connectionCustomUserAgent, connectionCustomHeaders } =
    resolveConnectionUpstreamOverrides(credentials?.providerSpecificData);

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
  const apiKeyCodexServiceMode = (apiKeyInfo as { codexServiceMode?: unknown } | null)
    ?.codexServiceMode;
  body = applyApiKeyCodexServiceMode(provider, body, apiKeyCodexServiceMode);
  effectiveServiceTier = resolveEffectiveServiceTier(body);
  setGeminiThoughtSignatureMode(settings.antigravitySignatureCacheMode);
  const semanticCacheEnabled = isSemanticCacheEnabled(settings, apiKeyInfo);

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

  // Reasoning-continuation input policy extracted to chatCore/reasoningInputGate.ts (chatCore
  // slice 2); it may rewrite carried reasoning in place, and reports an incompatible target.
  if (
    isReasoningContinuationIncompatible({
      body,
      sourceFormat,
      provider,
      credentials,
      reasoningTransportFallback,
      isCombo,
      comboStepId,
      comboExecutionKey,
      headers: clientRawRequest?.headers ?? null,
    })
  ) {
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    return createErrorResult(
      HTTP_STATUS.BAD_REQUEST,
      "Reasoning continuation is not compatible with the selected target"
    );
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
  const contextWindowChecksDisabled = areContextWindowChecksDisabled();
  const effectiveInputCap = contextWindowChecksDisabled
    ? null
    : toPositiveInteger(
        resolveInputTokenCapForGate({ provider, model: effectiveModel }, { isCombo })
      );
  const getEffectiveCompactionCeiling = (limit: number) =>
    effectiveInputCap != null ? Math.min(limit, effectiveInputCap) : limit;
  // Strict model proofs cannot invoke auxiliary compression providers or prewarmers.
  // This trusted in-process fence is never accepted from a client header/body.
  if (!validationExecutorFence && body && Array.isArray(allMessages) && allMessages.length > 0) {
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
      // Combo → config merge extracted to chatCore/compressionComboConfig.ts (chatCore slice 2).
      const applyCompressionComboConfig = (
        compressionCombo: RuntimeCompressionCombo | null,
        routingOverrideIds: string[] = []
      ): boolean => {
        const mergedConfig = mergeCompressionComboIntoConfig(
          config,
          compressionCombo,
          routingOverrideIds
        );
        if (!mergedConfig) return false;
        config = mergedConfig;
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
          const defaultCompressionCombo = defaultComboForRequest(
            getDefaultCompressionCombo() as RuntimeCompressionCombo | null,
            { config, header: compressionHeader, combos: namedCombos }
          );
          if (applyCompressionComboConfig(defaultCompressionCombo)) {
            log?.debug?.(
              "COMPRESSION",
              `Default compression combo applied: ${defaultCompressionCombo?.id}`
            );
          } else if (compressionHeader) {
            log?.debug?.(
              "COMPRESSION",
              `Default compression combo not applied (header: ${compressionHeader})`
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
          // Event emission extracted to chatCore/compressionLiveEvents.ts (chatCore slice 2).
          onEngineStep: (s) => emitCompressionStepEvent(emit, traceId, mode, s),
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
          // Live-zone lane extracted to chatCore/liveZoneCompression.ts (chatCore slice 2).
          result = await runLiveZoneCompression({
            compressionInputBody,
            clientHeaders: clientRawRequest?.headers,
            provider,
            getCurrentConnectionId,
            compressionPrincipalId,
            mode,
            effectiveModel,
            compressionConfig,
            runCompression,
          });
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
            emitCompressionCompletedEvent({
              emit,
              traceId,
              mode,
              stats: result.stats,
              adaptiveTelemetry,
              log,
            });
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

    const effectiveCompactionCeiling = getEffectiveCompactionCeiling(contextLimit);
    const COMPRESSION_THRESHOLD = (
      await import("@/lib/db/compression")
    ).getProactiveCompressionRatio();
    let reservedTokens = 0;
    if (Array.isArray(body.tools)) {
      reservedTokens = estimateTokens(body.tools);
    }
    const threshold = Math.max(
      1,
      Math.floor((Math.max(1, effectiveCompactionCeiling) - reservedTokens) * COMPRESSION_THRESHOLD)
    );

    log?.debug?.(
      "CONTEXT",
      `Checking compression: ${estimatedTokens} tokens vs ${threshold} threshold (${effectiveCompactionCeiling} limit, ${reservedTokens} reserved)`
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
        // #14931: X is the MESSAGES-only estimate (tools are accounted
        // separately as the threshold's reserve), unlike the full-breakdown
        // number the final guard rejects with — state the basis so the two
        // lines can be read side by side without a decoder ring.
        `Proactive compression triggered: ${estimatedTokens} message tokens > ${threshold} threshold (${effectiveCompactionCeiling} limit, tools reserve ${reservedTokens})`
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
          `Context compressed: ${stats.original} → ${stats.final} message tokens${layersInfo}`
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
  // #14931: scaled by the learned actual/estimated ratio (factor 1.0 cold).
  let finalEstimatedInputTokens = estimateCalibratedFinalInputTokens(body, provider, effectiveModel);
  // Reuse the already-resolved `contextLimit` (may have been narrowed to the
  // per-target combo window above, resolveComboContextLimit) instead of a bare
  // getTokenLimit(provider, effectiveModel) re-fetch, which would silently
  // discard that combo-aware override and re-widen the last-resort budget.
  const finalContextLimit = contextLimit;
  const toolsReserve = Array.isArray(body?.tools) ? estimateTokens(body.tools) : 0;

  const effectiveCompactionCeiling = getEffectiveCompactionCeiling(finalContextLimit);

  // Last-resort compaction against the concrete input budget (not the 70% threshold).
  // Covers cases where the proactive pass was skipped or still left the request oversized (#8560).
  if (
    reactiveContextCompactionEnabled &&
    !nativeCodexPassthrough &&
    finalEstimatedInputTokens >= effectiveCompactionCeiling &&
    body
  ) {
    const lastResortTarget = Math.max(1, effectiveCompactionCeiling - toolsReserve - 1);
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
      finalEstimatedInputTokens = estimateCalibratedFinalInputTokens(body, provider, effectiveModel);
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

  const calibrationEstimatedInputTokens = finalEstimatedInputTokens; // #14931 pairing
  const modelOutputCap = toPositiveInteger(
    getExplicitModelOutputCap({ provider, model: effectiveModel })
  );
  // enforceOutputTokenBudget against the concrete target + the reject / adjusted-fields logs:
  // extracted to chatCore/finalOutputBudget.ts (chatCore slice 2).
  const outputBudget = enforceFinalOutputTokenBudget({
    body: body as Record<string, unknown>,
    finalEstimatedInputTokens,
    finalContextLimit,
    contextWindowChecksDisabled,
    modelOutputCap,
    effectiveInputCap,
    provider,
    effectiveModel,
    sourceFormat,
    targetFormat,
    log,
  });
  if (outputBudget.ok === false) {
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    return createErrorResult(
      HTTP_STATUS.BAD_REQUEST,
      outputBudget.message,
      null,
      "context_length_exceeded",
      "invalid_request_error"
    );
  }
  body = outputBudget.body;

  let translatedBody = body;

  // Per-provider system transforms for providers whose executor does not run the
  // pipeline itself (issue #2260 v2 documents the DSL as covering "any other
  // provider key", but only the Claude-native and CC-bridge wire paths ever
  // called it). Applied on the client-shaped body before translation, so the
  // configured ops see the messages[]/system shape the Settings UI documents.
  // `applyProviderSystemTransforms` is a no-op for the claude / CC-bridge keys,
  // which already apply the same config downstream inside their executors.
  {
    const systemTransformResult = applyProviderSystemTransforms(
      provider,
      translatedBody as Record<string, unknown>
    );
    if (systemTransformResult.appliedOpKinds.length > 0) {
      translatedBody = systemTransformResult.body as typeof translatedBody;
      log?.debug?.(
        "SYSTRANSFORMS",
        `${provider}: ${systemTransformResult.appliedOpKinds.join(", ")}`
      );
    }
  }

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
      // Claude Code-compatible bridge body extracted to chatCore/claudeCodeBridgeBody.ts
      // (chatCore slice 2); returns the dispatch body + the resolved bridge session id.
      ({ translatedBody, ccSessionId } = buildClaudeCodeBridgeBody({
        body,
        sourceFormat,
        targetFormat,
        provider,
        model,
        stream,
        upstreamStream,
        credentials,
        reqLogger,
        clientHeaders: clientRawRequest?.headers,
        isClaudeCodeSemanticPassthrough,
        preserveCacheControl,
        copilotCompatibleReasoning,
        reasoningCacheScope,
        videoBridgeObserved,
        normalizeClaudeUpstreamMessages,
        applyReasoningRuleDirective,
        getModelNormalizeToolCallId,
        getModelPreserveOpenAIDeveloperRole,
        log,
      }));
    } else if (isClaudePassthrough) {
      // Pure passthrough: forward the body as-is without OpenAI round-trip (#1359). Extracted to
      // chatCore/claudePassthroughBody.ts (chatCore slice 2).
      translatedBody = buildClaudePassthroughBody({
        body,
        provider,
        clientHeaders: clientRawRequest?.headers,
        isClaudeCodeSemanticPassthrough,
        effectiveModel,
        targetFormat,
        preserveCacheControl,
        normalizeClaudeUpstreamMessages,
        applyReasoningRuleDirective,
        log,
      });
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
    // Plugin onError hook + defensive status/message/type derivation extracted to
    // chatCore/requestTranslationError.ts (chatCore slice 2).
    const result = await buildRequestTranslationErrorResult({
      error,
      traceId,
      body,
      model,
      provider,
      apiKeyInfo,
      log,
    });
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    return result;
  }

  // The latest OmniGlyph release has protocol-native OpenAI transforms. Run
  // the deferred stage only after translation so Chat/Responses receives the
  // exact provider wire shape (and so a source→target conversion never embeds
  // Anthropic image blocks into an OpenAI request, or vice versa).
  if (runPostTranslationCompression && translatedBody && typeof translatedBody === "object") {
    // Stage extracted to chatCore/postTranslationCompression.ts (chatCore slice 2). It updates the
    // four request-scope bindings in this state object in place; they are copied back below.
    const postTranslationState = {
      translatedBody,
      tokensCompressed,
      compressionResponseMeta,
      compressionAnalyticsWritePromise,
    };
    await applyPostTranslationCompression(postTranslationState, {
      runPostTranslationCompression,
      provider,
      effectiveModel,
      effectiveServiceTier,
      comboName,
      skillRequestId,
      sourceFormat,
      targetFormat,
      log,
    });
    ({
      translatedBody,
      tokensCompressed,
      compressionResponseMeta,
      compressionAnalyticsWritePromise,
    } = postTranslationState);
  }

  trace("post_translation");

  // Request tool metadata, Kiro/Claude tool dispatch fixes, the response tool-name map, the
  // upstream model id, the previous_response_id policy and the Codex effort guard: extracted to
  // chatCore/translatedRequestFinalize.ts (chatCore slice 2).
  const finalizedRequest = finalizeTranslatedRequest({
    translatedBody,
    body,
    provider,
    alias,
    effectiveModel,
    sourceFormat,
    targetFormat,
    isClaudePassthrough,
    credentials,
    previousResponseIdMode: settings.responsesPreviousResponseIdMode,
    log,
  });
  translatedBody = finalizedRequest.translatedBody;
  const { requestToolIdentityMap, toolNameMap } = finalizedRequest;

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

  // max_tokens / max_completion_tokens reconciliation, store + stream_options strip and the
  // provider output caps: extracted to chatCore/upstreamRequestParams.ts (chatCore slice 2).
  // Mutates translatedBody in place.
  normalizeUpstreamRequestParams({
    translatedBody,
    modelSupportsMaxTokens: supportsMaxTokens({ provider, model }),
    provider,
    model,
    targetFormat,
    providerSpecificData: credentials?.providerSpecificData as
      | Record<string, unknown>
      | null
      | undefined,
    log,
  });

  // Resolve executor with optional upstream proxy (CLIProxyAPI) routing.
  // mode="native" (default): returns the native executor unchanged.
  // mode="cliproxyapi": returns the CLIProxyAPI executor instead.
  // mode="fallback": returns a wrapper that tries native first, falls back to CLIProxyAPI on 5xx/network errors.

  // #6339: pass the resolved connection's providerSpecificData so a per-connection
  // cliproxyapiMode="claude-native" override can deep-route this single connection
  // through CLIProxyAPI regardless of the provider-level upstream_proxy_config mode.
  const resolveExecutorWithProxy = createExecutorResolver(log, credentials, validationExecutorFence);

  // === Quota Share enforcement PRE-hook (B/F7) + G2 combo soft penalty ===
  // Extracted to chatCore/quotaSharePreHook.ts (chatCore slice 2). Fail-open per B16; a block
  // returns the 429 response after finalizing the pending-request slot.
  const quotaShareBlockedResponse = await runQuotaSharePreHook({
    apiKeyInfo,
    credentials,
    provider,
    model,
    isCombo,
    comboStepId,
    comboExecutionKey,
    finalizePendingRequest: () =>
      trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId),
    log,
  });
  if (quotaShareBlockedResponse) return quotaShareBlockedResponse;
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
    withApiKeyCodexServiceMode(
      provider,
      withReasoningRuleContext(
        resolveExecutionCredentialsFor({
          credentials,
          nativeCodexPassthrough: nativeResponsesPassthrough,
          endpointPath,
          targetFormat,
          provider,
          ccSessionId,
          modelInfo,
          requestBody: body,
        }),
        reasoningRuleDirective
      ),
      apiKeyCodexServiceMode
    );

  let onPipelineStreamError: streamFailure.PipelineStreamErrorHandler | null = null;
  let onClientDisconnectFinalize:
    ((event: { reason: string; duration: number }) => boolean) | null = null;

  // Create stream controller for disconnect detection — wiring extracted to
  // chatCore/chatStreamController.ts (chatCore slice 2); the two late-bound handlers above are
  // read through getters at event time.
  const streamController = createChatStreamController({
    getClientDisconnectFinalize: () => onClientDisconnectFinalize,
    getPipelineStreamError: () => onPipelineStreamError,
    pendingScope,
    finalizePendingScope,
    onDisconnect,
    provider,
    model,
    connectionId,
    pendingRequestId,
    clientResponseFormat,
    clientAbortSignal: clientRawRequest?.signal,
    allowCompletedToolHandoffGrace: isCodexResponsesEcho,
  });

  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}`, stream };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  // Namespaced by the calling API key: dedup hands the SAME response object to
  // every joiner, so a shared hash across keys is a cross-principal response
  // leak (GHSA-6c7w-56xp-wpc6).
  const dedupHash = dedupEnabled
    ? computeRequestHash(dedupRequestBody, apiKeyInfo?.id, trustedEffortContext)
    : null;

  const toolDisclosure = resolveToolDisclosureConfig(settings);
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
    toolDisclosure,
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

  // Snapshot + message count helpers extracted to chatCore/providerRequestRegistration.ts
  // (chatCore slice 2).
  const registeredProviderRequest = buildRegisteredProviderRequest(
    translatedBody,
    body,
    effectiveModel
  );

  updatePendingScope(pendingScope, {
    providerRequest: registeredProviderRequest,
  });
  // T5: track which models we've tried for intra-family fallback
  const triedModels = new Set<string>([effectiveModel]);
  let currentModel = effectiveModel;

  // Log start
  appendRequestLog({ model, provider, connectionId, status: "PENDING" }).catch(() => {});

  const msgCount = countTranslatedMessages(translatedBody);
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
        const rejected = createErrorResult(
          HTTP_STATUS.RATE_LIMITED,
          `Token limit exceeded for ${scopeLabel}: ${tokenBreach.tokensUsed}/${tokenBreach.limitValue} tokens used in the current window. Please try again later.`,
          null,
          "TOKEN_LIMIT_EXCEEDED"
        );
        return { ...rejected, response: attachRouteMeta(rejected.response, { provider, model }) };
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
        const rejected = createErrorResult(
          HTTP_STATUS.RATE_LIMITED,
          `Gemini TPM rate limit reached for ${effectiveModel}. Please try again later.`,
          null,
          "GEMINI_TPM_EXHAUSTED"
        );
        return { ...rejected, response: attachRouteMeta(rejected.response, { provider, model }) };
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
      provider,
      {
        ...(casConnectionId ? { connectionId: casConnectionId } : {}),
        scope: resilienceSettings.tokenRefreshBreaker.scope,
        failureThreshold: resilienceSettings.tokenRefreshBreaker.failureThreshold,
        cooldownMs: resilienceSettings.tokenRefreshBreaker.cooldownMs,
      }
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
            } else if (shouldKeepConnectionActiveOnRateLimit(credentials, errorConnectionId)) {
              // A 429 on one key must not disable a connection whose extra keys
              // are still eligible. The hot key is already cooling via the
              // per-key cooldown recorded at the execution sites.
              await updateProviderConnection(errorConnectionId, {
                lastErrorType: errorType,
                lastError: persistentMessage,
                errorCode: statusCode,
              });
              console.warn(
                `[provider] Node ${errorConnectionId} rate limited on one key (${statusCode}) -- extra keys eligible, keeping connection active`
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
          await handleProjectRouteFailure({
            provider,
            connectionId: errorConnectionId,
            statusCode,
            persistentMessage,
            message,
            upstreamErrorBody,
            targetModel,
          });
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
            const { learnCopilotModelRejection } = await import(
              "../services/copilotModelRejections.ts"
            );
            if (!learnCopilotModelRejection(statusCode, provider, errorConnectionId, modelToLock, upstreamErrorBody)) {
              lockModel(provider, errorConnectionId, modelToLock, "model_not_found", notFoundCooldownMs);
              console.warn(
                `[provider] Node ${errorConnectionId} model not found (${statusCode}) for ${modelToLock} - locking model for ${Math.ceil(notFoundCooldownMs / 1000)}s (connection stays active)`
              );
            }
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

  const reportSignatureFailure = (failure: {
    status: number;
    message: string;
    outboundBody: unknown;
    outboundBodyCaptured: boolean;
    model: string;
    recoveryAttempted: boolean;
    recoverySucceeded: boolean;
  }) => {
    emitThinkingSignatureDiagnostics(
      {
        correlationId,
        provider,
        model: failure.model,
        status: failure.status,
        message: failure.message,
        ingressBody: body,
        outboundBody: failure.outboundBody,
        outboundBodyCaptured: failure.outboundBodyCaptured,
        recoveryAttempted: failure.recoveryAttempted,
        recoverySucceeded: failure.recoverySucceeded,
      },
      noLogEnabled,
      log
    );
  };

  let pipelineRecovered = false;
  if (stream) {
    const streamingOutcome = await runStreamingResponse({
      reportSignatureFailure,
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
      getExecutorClientHeaders,
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
      resilienceSettings,
      sessionAffinityKey,
      skillRequestId,
      sourceFormat,
      stream,
      streamController,
      syncExecuteTranslatedBody,
      targetFormat,
      triedModels,
      trustedEffortContext,
      toolDisclosure,
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
      reportSignatureFailure,
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
      calibrationEstimatedInputTokens,
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
      saveIdempotency: saveIdempotencyWithConfiguredWindow,
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
    modelInfo,
    forcedConnectionId,
    apiKeyInfo,
    attachCompressionUsageReceiptAfterAnalytics,
    body,
    bodyForCacheWrite,
    calibrationEstimatedInputTokens,
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
    effectiveModel,
    effectiveServiceTier,
    endpointPath,
    executeProviderRequest,
    executor,
    fallbackAttempts,
    finalBody,
    getCurrentConnectionId,
    isCombo,
    isDroidCLI,
    isResponsesEndpoint,
    log,
    managedLease,
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
export { isTokenExpiringSoon } from "./chatCore/tokenExpiry.ts";
