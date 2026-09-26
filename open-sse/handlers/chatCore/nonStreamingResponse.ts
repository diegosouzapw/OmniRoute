/**
 * Non-streaming response path, lifted out of handleChatCore.
 * The body matches the barrel. Closed-over request state arrives through
 * deps, and the values the barrel reads afterwards leave through carry.
 */

import { meteredBudgetCost } from "@/lib/usage/meteredBudgetPolicy";
import { readCpaAuthIndex } from "../chatCore/failureUsage.ts";

import { createRoutingEvent, emitRoutingEvent } from "../../services/routing/index.ts";

import { buildClaudePromptCacheLogMeta } from "../chatCore/executorHelpers.ts";

import {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "../chatCore/passthroughHelpers.ts";

import {
  applyServerOwnedToolLoopIfNeeded,
  derivePostInjectionRequestIdentity,
  followUpLegInput,
} from "../chatCore/serverOwnedToolLoopWire.ts";

import {
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
} from "../chatCore/responseHeaders.ts";

import { maybeSyncClaudeExtraUsageState } from "../chatCore/telemetryHelpers.ts";

export {
  shouldUseNativeCodexPassthrough,
  shouldUseNativeXaiResponsesPassthrough,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
  buildStreamingResponseHeaders,
  stripStaleForwardingHeaders,
};

import { HTTP_STATUS } from "../../config/constants.ts";

import { lockModel } from "../../services/accountFallback.ts";

import { buildPostCallGuardrailContext } from "../chatCore/postCallGuardrailContext.ts";
import { buildNonStreamingResponseHeaders } from "../chatCore/nonStreamingResponseHeaders.ts";
import { maybeWrapForcedNonStreamingResponsesJson } from "../chatCore/responsesJsonToSse.ts";
import { runProviderExecutionPipeline } from "../chatCore/providerExecutionPipeline.ts";
import { runNonStreamingProviderLeg } from "../chatCore/nonStreamingProviderLeg.ts";
import type { NonStreamingProviderLegResult } from "@/lib/skills/toolLoopTypes.ts";
import { finalizeToolLoopError } from "../chatCore/nonStreamingFinalization.ts";
import { markCodexScopeRateLimited } from "../chatCore/codexFailover.ts";
import { deleteSessionAccountAffinity } from "@/lib/db/sessionAccountAffinity";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";
import { MEMORY_BUILTIN_TOOL_NAMES } from "@/lib/skills/memoryBuiltins";

import { storeSemanticCacheResponse } from "../chatCore/semanticCacheStore.ts";
import { routingFinishReason } from "../chatCore/routingFinishReason.ts";
import { getProviderCredentials } from "@/sse/services/auth";
import { extractFacts } from "@/lib/memory/extraction";
// The leaf body is unchanged from the barrel, so its closed-over values keep
// the barrel's types. This alias only exists so the deps bag type-checks.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loose = any;
export type NonStreamingDeps = Record<string, Loose> & { [k: string]: Loose };

export async function runNonStreamingResponse(deps: NonStreamingDeps) {
  const {
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
    claudePromptCacheLogMeta: _claudePromptCacheLogMeta,
    clientRawRequest,
    comboStrategy,
    connectionId,
    copilotCompatibleReasoning,
    createErrorResult,
    credentials,
    currentModel: _currentModel,
    describeMalformedNonStream,
    detectMalformedNonStream,
    echoModel,
    echoModelInObject,
    effectiveModel,
    effectiveServiceTier: _effectiveServiceTier,
    emitRequestGamificationEvent,
    endpointPath,
    executeProviderRequest,
    executeRefreshCredentials,
    extractSessionAffinityKey,
    extractUsageFromResponse,
    finalBody: _finalBody,
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
    isCombo,
    isJsonRecord,
    isLocalStreamLifecycleError,
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
    pipelineSessionId,
    provider,
    providerHeaders: _providerHeaders,
    providerRequestCapture,
    providerResponse: _providerResponse,
    reasoningReplayHistory: _reasoningReplayHistory,
    recordChatCallCost,
    recordContextEditingTelemetryHook,
    recordCoreOwnedAntigravityQuotaState,
    recordNonStreamingUsageStats,
    reportMalformed200,
    reqLogger,
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
    targetFormat,
    traceId,
    syncExecuteTranslatedBody,
    trackPendingRequest,
    translateRequest,
    translatedBody: _translatedBody,
    triedModels,
    updateFromHeaders,
    updateFromResponseBody,
    updatePendingScope,
    updateProviderConnection,
    webFetchFallbackPlan,
    webSearchFallbackPlan,
    clientRequestedResponsesStream,
    clientResponseFormat,
    compressionResponseMeta,
    contextEditingEnabled,
    customToolNames,
    fallbackAttempts,
    isClaudeCodeCompatible,
    isResponsesEndpoint,
    preserveCacheControl,
    reasoningCacheScope,
    requestToolIdentityMap,
    stream,
    toolNameMap,
    traceEnabled,
    videoBridgeObserved,
  } = deps;

  let claudePromptCacheLogMeta,
    currentModel,
    effectiveServiceTier,
    finalBody,
    pipelineRecovered,
    providerHeaders,
    providerResponse,
    reasoningReplayHistory,
    translatedBody;
  claudePromptCacheLogMeta = _claudePromptCacheLogMeta;
  currentModel = _currentModel;
  effectiveServiceTier = _effectiveServiceTier;
  finalBody = _finalBody;
  providerHeaders = _providerHeaders;
  providerResponse = _providerResponse;
  reasoningReplayHistory = _reasoningReplayHistory;
  translatedBody = _translatedBody;
  pipelineRecovered = false;

  try {
    const runNonStreamingPipeline = async ({
      policy,
      model: pipelineModel,
      translatedBody: wireBody,
    }) => {
      translatedBody = wireBody as typeof translatedBody;
      syncExecuteTranslatedBody(translatedBody);
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
          onCredentialsRefreshed: handleCredentialsRefreshed,
          refreshCredentials: executeRefreshCredentials,
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
            syncExecuteTranslatedBody(translatedBody);
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
        syncExecuteTranslatedBody(translatedBody);
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
      customToolNames,
      requestToolIdentityMap,
      reasoningCacheScope,
      reasoningReplayHistory,
      videoTranscriptSensitive: videoBridgeObserved,
      clientHeaders: clientRawRequest?.headers ?? null,
      isClaudeCodeCompatible,
      log,
    });

    if (legResult.kind === "error") {
      const err = legResult.result;
      const errMessage =
        err?.rawMessage ||
        (err?.originalError instanceof Error ? err.originalError.message : err?.error) ||
        "";
      const errHeaders = err?.upstreamHeaders || err?.response?.headers;
      const errUpstreamBody = err?.upstreamErrorBody;
      if (err) {
        await applyProviderFailureClassification({
          statusCode: err.status,
          message: errMessage,
          headers: errHeaders,
          upstreamErrorBody: errUpstreamBody,
          retryAfterMs: err.retryAfterMs ?? null,
          targetModel: currentModel,
        });
      }

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
      trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
      return {
        response: err,
        carry: {
          translatedBody,
          currentModel,
          finalBody,
          providerResponse,
          providerHeaders,
          effectiveServiceTier,
          claudePromptCacheLogMeta,
          reasoningReplayHistory,
          pipelineRecovered,
        },
      };
    }

    pipelineRecovered = true;
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
            onReasoningReplayHistory: (messages) => {
              reasoningReplayHistory = messages;
            },
          }
        );
        syncExecuteTranslatedBody(translatedBody);
        return runNonStreamingProviderLeg(
          followUpLegInput(
            {
              executeProviderRequest: (modelToCall, allowDedup) =>
                executeProviderRequest(modelToCall, allowDedup),
              runProviderExecution: runNonStreamingPipeline,
              setRequestWireState: ({ translatedBody: nextBody, effectiveModel: nextModel }) => {
                translatedBody = nextBody as typeof translatedBody;
                syncExecuteTranslatedBody(translatedBody);
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
              customToolNames,
              requestToolIdentityMap,
              reasoningCacheScope,
              reasoningReplayHistory,
              videoTranscriptSensitive: videoBridgeObserved,
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
      return {
        response: await finalizeToolLoopError({
          loop: loopApply.loop,
          model,
          provider,
          connectionId: pendingConnId,
          providerRequest: loopApply.loop.finalProviderRequest || finalBody || translatedBody,
          persistFailureUsage,
          persistAttemptLogs,
          trackPendingRequest,
          pendingRequestId,
        }),
        carry: {
          translatedBody,
          currentModel,
          finalBody,
          providerResponse,
          providerHeaders,
          effectiveServiceTier,
          claudePromptCacheLogMeta,
          reasoningReplayHistory,
          pipelineRecovered,
        },
      };
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
      looksLikeSSE ? { _streamed: true, _format: "sse-json", summary: responseBody } : responseBody
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
      cpaAuthIndex: readCpaAuthIndex(providerResponse),
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
    const chatCostCtx = buildCostCtx(provider, model, usage, effectiveServiceTier, traceId);

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
      recordChatCallCost(apiKeyInfo, meteredBudgetCost(provider, estimatedCost), chatCostCtx, false);
      log?.warn?.(
        "GUARDRAIL",
        `Response blocked by ${postCallGuardrails.guardrail || "guardrail"}: ${guardrailMessage}`
      );
      finalizePendingScope(pendingScope, {
        providerResponse: responseBody,
        clientResponse: translatedResponse,
      });
      return {
        response: createErrorResult(HTTP_STATUS.BAD_REQUEST, guardrailMessage),
        carry: {
          translatedBody,
          currentModel,
          finalBody,
          providerResponse,
          providerHeaders,
          effectiveServiceTier,
          claudePromptCacheLogMeta,
          reasoningReplayHistory,
          pipelineRecovered,
        },
      };
    }

    // Validate the *translated* response actually carries client-usable output.
    // isEmptyContentResponse (above) runs on the raw responseBody before translation;
    // this check runs after translation + sanitization + tool-call execution to catch
    // cases where a provider returns a structurally valid raw body that translates into
    // choices:[] or output:[] with no usable content (Responses API shape included).
    const malformedTranslatedReason = detectMalformedNonStream(translatedResponse, provider);
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
      const sanitizedMalformedResponse = sanitizeUpstreamDetails(responseBody);
      const sanitizedMalformedProviderResponse = looksLikeSSE
        ? { _streamed: true, _format: "sse-json", summary: sanitizedMalformedResponse }
        : sanitizedMalformedResponse;
      persistAttemptLogs({
        status: HTTP_STATUS.BAD_GATEWAY,
        tokens: usage,
        responseBody: sanitizedMalformedResponse,
        providerRequest: finalBody || translatedBody,
        providerResponse: sanitizedMalformedProviderResponse,
        clientResponse: malformedClientBody,
        claudeCacheMeta: claudePromptCacheLogMeta,
        claudeCacheUsageMeta: cacheUsageLogMeta,
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "malformed_translated_response");
      trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
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
      return {
        response: createErrorResult(
          HTTP_STATUS.BAD_GATEWAY,
          malformedMessage,
          null,
          malformed.code,
          malformed.type
        ),
        carry: {
          translatedBody,
          currentModel,
          finalBody,
          providerResponse,
          providerHeaders,
          effectiveServiceTier,
          claudePromptCacheLogMeta,
          reasoningReplayHistory,
          pipelineRecovered,
        },
      };
    }

    // ── Phase 9.1: Cache store (non-streaming, temp=0) ──
    storeSemanticCacheResponse({
      enabled: semanticCacheEnabled,
      body: bodyForCacheWrite,
      headers: clientRawRequest?.headers,
      translatedResponse,
      model,
      // The dual-layer manager scopes entries per provider (cacheByProvider);
      // lookup passes the resolved provider, so the write must too (#14159).
      provider,
      apiKeyId: apiKeyInfo?.id ?? undefined,
      usage,
      log,
      videoTranscriptSensitive: videoBridgeObserved,
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
    recordChatCallCost(apiKeyInfo, meteredBudgetCost(provider, estimatedCost), chatCostCtx, true);

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
      fallbackAttempts,
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
      response: {
        success: true,
        response: maybeWrapForcedNonStreamingResponsesJson({
          clientRequestedResponsesStream,
          body: translatedResponse,
          headers: responseHeaders,
        }),
      },
      carry: {
        translatedBody,
        currentModel,
        finalBody,
        providerResponse,
        providerHeaders,
        effectiveServiceTier,
        claudePromptCacheLogMeta,
        reasoningReplayHistory,
        pipelineRecovered,
      },
    };
  } catch (error) {
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
    const errorMetadata = getSafeErrorMetadata(error);
    const managedLeaseFenceCode = getManagedLeaseFenceErrorCode(errorMetadata.code);
    if (managedLeaseFenceCode)
      return {
        response: managedLeaseFenceErrorResult(managedLeaseFenceCode),
        carry: {
          translatedBody,
          currentModel,
          finalBody,
          providerResponse,
          providerHeaders,
          effectiveServiceTier,
          claudePromptCacheLogMeta,
          reasoningReplayHistory,
          pipelineRecovered,
        },
      };
    // isSemaphoreCapacityError already reads the code through getSafeErrorMetadata,
    // so a hostile rejection cannot escape this classification.
    if (isSemaphoreCapacityError(error)) {
      const semaphoreCode = errorMetadata.code as string;
      appendRequestLog({
        model,
        provider,
        connectionId,
        status: `FAILED ${semaphoreCode}`,
      }).catch(() => {});
      const failureMessage = sanitizeErrorMessage(errorMetadata.message) || "Semaphore timeout";
      persistAttemptLogs({
        status: HTTP_STATUS.RATE_LIMITED,
        error: failureMessage,
        providerRequest: finalBody || translatedBody,
        clientResponse: buildErrorBody(HTTP_STATUS.RATE_LIMITED, failureMessage),
        claudeCacheMeta: claudePromptCacheLogMeta,
        cacheSource: "upstream",
      });
      persistFailureUsage(HTTP_STATUS.RATE_LIMITED, semaphoreCode);
      const result = createErrorResult(HTTP_STATUS.RATE_LIMITED, failureMessage);
      return {
        response: {
          ...result,
          errorType: "account_semaphore_capacity",
          errorCode: semaphoreCode,
        },
        carry: {
          translatedBody,
          currentModel,
          finalBody,
          providerResponse,
          providerHeaders,
          effectiveServiceTier,
          claudePromptCacheLogMeta,
          reasoningReplayHistory,
          pipelineRecovered,
        },
      };
    }
    throw error;
  }
}
