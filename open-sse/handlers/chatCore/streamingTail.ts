import { getCodexClientSessionId } from "../../config/codexIdentity.ts";
import {
  noteCodexTurnStateProvenance,
  readCodexTurnStateHeader,
} from "../../config/codexTurnState.ts";
import {
  STREAM_DISCONNECT_GRACE_PERIOD_MS,
  STREAM_READINESS_MAX_TIMEOUT_MS,
  STREAM_READINESS_TIMEOUT_MS,
  STREAM_RECOVERY,
} from "../../config/constants.ts";
import { incrementTokenUsage } from "../../services/geminiRateLimitTracker.ts";
import {
  createRoutingEvent,
  emitRoutingEvent,
  outcomeFromStatus,
} from "../../services/routing/index.ts";
import { FORMATS } from "../../translator/formats.ts";
import { needsTranslation } from "../../translator/index.ts";
import {
  FLUSH_EMPTY_RETRY_MAX_BYTES,
  formatBufferedVerdictLog,
  judgeBufferedTurn,
  readBoundedResponseOutcome,
} from "../../utils/emptyTurnRetry.ts";
import { noteBufferedVerdictOutcome } from "./emptyTurnResilienceNotes.ts";
import { buildErrorBody } from "../../utils/error.ts";
import {
  createPassthroughStreamWithLogger,
  createSSETransformStreamWithLogger,
} from "../../utils/stream.ts";
import * as streamFailure from "../../utils/streamFailureFinalization.ts";
import { ensureStreamReadiness } from "../../utils/streamReadiness.ts";
import { resolveStreamReadinessTimeout } from "../../utils/streamReadinessPolicy.ts";
import { maybeFallbackAfterReadiness } from "./streamReadinessFallback.ts";
import { captureStreamReasoningForReplay } from "./streamReasoningCapture.ts";
import { meteredBudgetCost } from "@/lib/usage/meteredBudgetPolicy";
import { resolveSuppressThinkClose } from "../../utils/thinkCloseMarker.ts";
import { hasActiveClaudeThinking } from "../../utils/thinkingBudget.ts";
import { translateNonStreamingResponse } from "../responseTranslator.ts";
import { buildCacheUsageLogMeta } from "./cacheUsageMeta.ts";
import { recordContextEditingTelemetryHook } from "./contextEditingTelemetry.ts";
import { readCpaAuthIndex } from "./failureUsage.ts";
import { emitRequestGamificationEvent } from "./gamificationEvent.ts";
import { maybeConvertJsonBodyToSse } from "./jsonBodyToSse.ts";
import { runMemoryExtractionGate } from "./memoryExtraction.ts";
import { mergeResponseToolNameMap } from "./passthroughToolNames.ts";
import { runPluginOnResponseHook, runPluginOnStreamCompleteHook } from "./pluginOnResponse.ts";
import { routingFinishReason } from "./routingFinishReason.ts";
import { wrapReadableStreamWithFinalize } from "./streamFinalize.ts";
import { buildStreamLedgerDetails, recordStreamingCost } from "./streamingCost.ts";
import { assembleStreamingPipeline } from "./streamingPipeline.ts";
import { scheduleStreamingQuotaShareConsumption } from "./streamingQuotaShare.ts";
import { assembleStreamingResponseHeaders } from "./streamingResponseHeaders.ts";
import { storeStreamingSemanticCacheResponse } from "./streamingSemanticCacheStore.ts";
import { recordStreamingUsageStats } from "./streamingUsageStats.ts";
import { maybeSyncClaudeExtraUsageState } from "./telemetryHelpers.ts";
import { recordCost } from "@/domain/costRules";
import { extractFacts } from "@/lib/memory/extraction";
import { calculateCost } from "@/lib/usage/costCalculator";
import { appendRequestLog, trackPendingRequest } from "@/lib/usageDb";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags.ts";
import { getProviderCredentials } from "@/sse/services/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- deps bag mirrors the barrel closure
type Loose = any;

export type StreamingTailDeps = Record<string, Loose>;

export async function runStreamingTail(deps: StreamingTailDeps) {
  const {
    agentGoalPolicy,
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
    endpointPath,
    executeProviderRequest,
    fallbackAttempts,
    getCurrentConnectionId,
    forcedConnectionId,
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
  } = deps;
  let providerResponse, finalBody, effectiveServiceTier;
  providerResponse = deps.providerResponse;
  finalBody = deps.finalBody;
  effectiveServiceTier = deps.effectiveServiceTier;
  let onPipelineStreamError = null;
  let onClientDisconnectFinalize = null;
  let turnExecutionHandedOffToStream = false;

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

  let streamReadiness = await ensureStreamReadiness(providerResponse, {
    timeoutMs: streamReadinessPolicy.timeoutMs,
    maxTimeoutMs: streamReadinessPolicy.maxTimeoutMs,
    provider,
    model,
    log,
  });
  // A stall is an upstream issue, not an account fault — the executor loop
  // already ended at headers, so this bounded retry is the only recovery left.
  const fallback = await maybeFallbackAfterReadiness({
    streamReadiness,
    clientAborted: streamController.signal.aborted,
    failedConnectionId: getCurrentConnectionId(),
    failedBody: providerResponse,
    currentModel,
    streamReadinessPolicy,
    provider,
    model,
    log,
    reqLogger,
    providerUrl,
    providerHeaders,
    finalBody,
    translatedBody,
    executeProviderRequest,
    providerRequestCapture,
  });
  streamReadiness = fallback.readiness;
  providerResponse = fallback.providerResponse;
  finalBody = fallback.finalBody;
  if (streamReadiness.ok === false) {
    const { response: failureResponse, reason } = streamReadiness;
    const { classificationReason, upstreamDiagnostic } = streamReadiness;
    trackPendingRequest(model, provider, pendingConnId, false, undefined, pendingRequestId);
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
      result: {
        success: false,
        status: failureResponse.status,
        error: reason,
        classificationError: classificationReason,
        errorType: streamReadiness.type,
        errorCode: streamReadiness.code,
        response: failureResponse,
      },
      carry: { onPipelineStreamError, onClientDisconnectFinalize, turnExecutionHandedOffToStream },
    };
  }
  providerResponse = streamReadiness.response;

  // Flush-empty retry (opt-in `FLUSH_EMPTY_RETRY_ENABLED`, default off): when the
  // upstream turn carries no usable content (reasoning-only 200, or a
  // zero-valuable-chunk turn that the empty-stream guard would turn into a 502),
  // issue bounded retries through the normal credential path BEFORE anything is
  // exposed to the client — in particular before `onRequestSuccess` below.
  // Empty turns are stochastic upstream misses, not account faults, so no
  // cooldown and no forced exclusion: the round-robin picker may rotate
  // fingerprint slots opportunistically, a single slot simply replays the same
  // account. Budget: `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX` retries, then fall
  // back to the current behavior. Translate-path streams only (mirror of the
  // empty-stream guard); flag off = byte-for-byte unchanged. Bounded reader
  // (abandon past the cap, never a full `text()` read); the original
  // reconstructed response is piped, only the bounded copy is classified.
  // Known TTFT cost when armed: a small valid turn under the cap is fully
  // buffered before the first client byte (flag off by default, so the
  // streaming path is untouched unless opted in).
  if (stream && providerResponse.ok && providerResponse.body) {
    let flushEmptyRetryArmed = false;
    try {
      flushEmptyRetryArmed = isFeatureFlagEnabled("FLUSH_EMPTY_RETRY_ENABLED");
    } catch {
      flushEmptyRetryArmed = false;
    }
    const isTranslatePath =
      targetFormat === FORMATS.OPENAI_RESPONSES ||
      needsTranslation(targetFormat, clientResponseFormat);
    if (flushEmptyRetryArmed && isTranslatePath) {
      for (
        let emptyTurnRetries = 0;
        emptyTurnRetries <= STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX;
        emptyTurnRetries++
      ) {
        const verdict = judgeBufferedTurn(
          await readBoundedResponseOutcome(
            providerResponse,
            FLUSH_EMPTY_RETRY_MAX_BYTES,
            streamReadinessPolicy.timeoutMs
          ),
          targetFormat,
          clientResponseFormat,
          clientRawRequest?.signal?.aborted === true
        );
        if (verdict.kind === "pass") {
          const v = formatBufferedVerdictLog(verdict, correlationId, traceId);
          log?.[v.level]?.("FLUSH_EMPTY_RETRY", v.line);
          noteBufferedVerdictOutcome(verdict, null, false);
          break;
        }
        if (emptyTurnRetries >= STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX) {
          log?.warn?.(
            "FLUSH_EMPTY_RETRY",
            "retry budget exhausted, falling back to current behavior"
          );
          noteBufferedVerdictOutcome(verdict, null, true);
          break;
        }
        log?.warn?.(
          "FLUSH_EMPTY_RETRY",
          `${verdict.reason}, bounded retry through the normal credential path`
        );
        noteBufferedVerdictOutcome(verdict, { level: "warn", line: verdict.reason }, false);
        const nextCreds = await getProviderCredentials(provider, null, null, currentModel).catch(
          () => null
        );
        if (!nextCreds?.connectionId) break;
        const retryConnectionId = String(nextCreds.connectionId);
        Object.assign(credentials, nextCreds);
        log?.info?.("FLUSH_EMPTY_RETRY", `retrying on ${retryConnectionId}`);
        await providerResponse.body?.cancel().catch(() => {});
        let retryResult: unknown = null;
        try {
          retryResult = await executeProviderRequest(currentModel, false);
        } catch {
          break;
        }
        const retryResponse = (retryResult as { response?: Response })?.response;
        if (!retryResponse?.ok || !retryResponse.body) {
          if (retryResponse) await retryResponse.body?.cancel().catch(() => {});
          break;
        }
        const prepared = await maybeConvertJsonBodyToSse(retryResponse, {
          log,
          provider,
          model,
        });
        const ready = prepared.ok
          ? await ensureStreamReadiness(prepared, {
              timeoutMs: streamReadinessPolicy.timeoutMs,
              maxTimeoutMs: streamReadinessPolicy.maxTimeoutMs,
              provider,
              model,
              log,
            })
          : null;
        const preparedStream = ready && ready.ok ? ready.response : null;
        if (!preparedStream) {
          await retryResponse.body?.cancel().catch(() => {});
          break;
        }
        // Swap BEFORE re-classifying so the next loop iteration reads the retry.
        providerResponse = preparedStream;
        finalBody = providerRequestCapture.body(
          (retryResult as { transformedBody?: unknown })?.transformedBody ?? translatedBody
        );
        reqLogger.logTargetRequest(providerUrl, providerHeaders, finalBody);
      }
    }
  }

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
    fallbackAttempts,
    isCombo, // #14116: foreign-account quota-header strip (only meaningful when true)
    requestedConnectionId: forcedConnectionId || null,
    selectedConnectionId: credentials?.connectionId ?? null,
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
  const onStreamComplete = ({
    status: streamStatus,
    usage: streamUsage,
    responseBody: streamResponseBody,
    providerPayload,
    clientPayload,
    reasoningMeta: streamReasoningMeta,
    error: streamError,
    errorCode: streamErrorCode,
    ttft,
    itlMs: streamItlMs,
    interrupted: _streamInterrupted,
  }) => {
    const normalizedStreamStatus = streamStatus || 200;
    if (streamCompletionRecorded) return;
    streamCompletionRecorded = true;
    if (normalizedStreamStatus !== 200) {
      if (streamFailureCompletionRecorded) return;
      streamFailureCompletionRecorded = true;
    }
    const cacheUsageLogMeta = buildCacheUsageLogMeta(streamUsage);
    const streamConnectionId = getCurrentConnectionId();

    if (normalizedStreamStatus === 200) {
      void maybeSyncClaudeExtraUsageState({
        provider,
        connectionId: streamConnectionId,
        providerSpecificData: credentials?.providerSpecificData,
        log,
      });
    }

    if (normalizedStreamStatus === 200 && streamResponseBody) {
      captureStreamReasoningForReplay({
        streamResponseBody,
        clientResponseFormat,
        responseToolNameMap,
        providerRequestBody: finalBody || translatedBody || body,
        translatedBody,
        reasoningReplayHistory,
        provider,
        model,
        reasoningCacheScope,
        videoTranscriptSensitive: videoBridgeObserved,
      });
    }
    effectiveServiceTier = resolveReportedServiceTier(streamResponseBody) ?? effectiveServiceTier;

    // Context Editing telemetry (streaming): the reconstructed stream body now carries
    // context_management.applied_edits from the final message_delta snapshot. Mirror the
    // non-streaming hook so streaming context-clear savings also surface under engine
    // "context-editing" in compression analytics. Best-effort, Claude-only.
    if (normalizedStreamStatus === 200) {
      recordContextEditingTelemetryHook({
        contextEditingEnabled,
        provider,
        responseBody: streamResponseBody,
        skillRequestId,
        log,
      });
    }

    streamFailure.finalizeStreamRequestLog({
      pendingRequestId,
      model,
      provider,
      connectionId: streamConnectionId,
      providerResponse: providerPayload ?? streamResponseBody ?? undefined,
      clientResponse: clientPayload ?? streamResponseBody ?? undefined,
      status: normalizedStreamStatus,
      error: streamError,
      errorCode: streamErrorCode,
    });

    // Track cache token metrics for streaming responses
    if (streamUsage && typeof streamUsage === "object") {
      attachCompressionUsageReceiptAfterAnalytics(streamUsage as Record<string, unknown>, "stream");
      // Track Gemini token consumption for TPM rate-limit pre-check
      if (provider === "gemini") {
        const promptTokens =
          typeof (streamUsage as Record<string, unknown>).prompt_tokens === "number"
            ? ((streamUsage as Record<string, unknown>).prompt_tokens as number)
            : 0;
        if (promptTokens > 0) incrementTokenUsage(model, promptTokens);
      }
    }
    recordStreamingUsageStats(streamUsage, {
      provider,
      model,
      streamStatus: normalizedStreamStatus,
      startTime,
      ttft,
      streamErrorCode,
      connectionId: streamConnectionId,
      apiKeyInfo,
      effectiveServiceTier,
      isCombo,
      comboStrategy,
      endpoint: endpointPath,
      cpaAuthIndex: readCpaAuthIndex(providerResponse),
    });

    // Routing event (feedback foundation) — fire-and-forget, cheap, never blocks
    // the stream. Feeds the quality tracker + optional OTel exporter.
    void emitRoutingEvent(
      createRoutingEvent({
        requestId: traceId || pendingRequestId || "unknown",
        provider: provider || "unknown",
        model: model || "unknown",
        strategy: isCombo ? (comboStrategy ?? "combo") : "direct",
        latencyMs: Date.now() - startTime,
        ttftMs: typeof ttft === "number" && Number.isFinite(ttft) && ttft >= 0 ? ttft : null,
        itlMs:
          typeof streamItlMs === "number" && Number.isFinite(streamItlMs) && streamItlMs >= 0
            ? streamItlMs
            : null,
        inputTokens:
          streamUsage && typeof streamUsage === "object"
            ? (() => {
                const promptTokens = (streamUsage as Record<string, unknown>).prompt_tokens;
                return typeof promptTokens === "number" && Number.isFinite(promptTokens)
                  ? promptTokens
                  : null;
              })()
            : null,
        outputTokens:
          streamUsage && typeof streamUsage === "object"
            ? (() => {
                const completionTokens = (streamUsage as Record<string, unknown>).completion_tokens;
                return typeof completionTokens === "number" && Number.isFinite(completionTokens)
                  ? completionTokens
                  : null;
              })()
            : null,
        cost: null,
        retries: 0,
        fallbackUsed: false, // combo-level fallback tracked by decisionTrace
        outcome:
          normalizedStreamStatus === 200
            ? "success"
            : streamErrorCode === "stream_interrupted" || streamErrorCode === "aborted"
              ? "stream_interrupted"
              : outcomeFromStatus(normalizedStreamStatus),
        status: normalizedStreamStatus,
        finishReason: routingFinishReason(streamResponseBody),
        connectionId: streamConnectionId ?? credentials?.connectionId ?? null,
      })
    );

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
      reasoningMeta: streamReasoningMeta ?? null,
    });

    recordStreamingCost({
      apiKeyId: apiKeyInfo?.id,
      provider,
      model,
      streamUsage,
      serviceTier: effectiveServiceTier,
      calculateCost,
      // Only the budget-consumable share may draw down the allowance.
      recordCost: (apiKeyId, cost, details) => {
        const budgetCost = meteredBudgetCost(provider, cost);
        if (budgetCost > 0) recordCost(apiKeyId, budgetCost, details);
      },
      ledger: buildStreamLedgerDetails(effectiveServiceTier, normalizedStreamStatus < 400, traceId),
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

    if (streamStatus === 200) {
      // #12150 P1b surface 3 (fix round 1): see the matching non-streaming
      // gate above — an observed request populates NO durable memory from
      // either the request-derived text or this streamed response.
      runMemoryExtractionGate({
        memoryOwnerId,
        memorySettings,
        videoBridgeObserved,
        pipelineSessionId,
        requestBody: body as Record<string, unknown>,
        responseBody: (streamResponseBody ?? null) as Record<string, unknown> | null,
        extractFacts,
        log,
      });
    }

    // Semantic cache: store assembled streaming response for future cache hits
    storeStreamingSemanticCacheResponse({
      enabled: semanticCacheEnabled,
      streamStatus,
      streamResponseBody,
      body: bodyForCacheWrite,
      headers: clientRawRequest?.headers,
      model,
      provider,
      apiKeyId: apiKeyInfo?.id ?? undefined,
      streamUsage,
      log,
      videoTranscriptSensitive: videoBridgeObserved,
    });

    // Plugin onStreamComplete hook — fire-and-forget, fail-open (#9571)
    // Pass traceId as requestId so plugins can correlate the stream-completion event
    // with the originating request (the same id used for onRequest/onResponse). (#11825)
    runPluginOnStreamCompleteHook({
      status: normalizedStreamStatus,
      usage: streamUsage as Record<string, unknown> | undefined,
      ttft,
      model,
      provider,
      errorCode: streamErrorCode,
      startTime,
      requestId: traceId,
    });
  };

  const streamFailureFinalizers = streamFailure.createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => streamFailureCompletionRecorded,
    isStreamCompletionRecorded: () => streamCompletionRecorded,
    onStreamComplete,
    persistFailureUsage,
    onStreamFailure,
  });
  const handleStreamFailure = streamFailureFinalizers.handleStreamFailure;
  onPipelineStreamError = streamFailureFinalizers.onPipelineStreamError;
  // #9653: gives a genuine, race-delayed completion a chance to land (see
  // createClientDisconnectGraceHandler's doc comment) before persisting a false
  // 499/0-tokens for a request that actually delivered its full response.
  onClientDisconnectFinalize = streamFailure.createClientDisconnectGraceHandler({
    isStreamCompletionRecorded: () => streamCompletionRecorded,
    gracePeriodMs: STREAM_DISCONNECT_GRACE_PERIOD_MS,
    finalize: (event) =>
      handleStreamFailure({
        status: 499,
        message: `Client disconnected: ${event.reason}`,
        code: "client_disconnected",
        type: "client_disconnected",
      }),
  });

  // For providers using Responses API format, translate stream back to openai (Chat Completions) format
  // UNLESS client is Droid CLI which expects openai-responses format back
  const needsResponsesTranslation =
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    clientResponseFormat === FORMATS.OPENAI &&
    !isResponsesEndpoint &&
    !isDroidCLI;
  const streamStateBody = finalBody || body;

  // Client's explicit thinking intent (Anthropic Messages shape). Claude Code
  // sends `{type:"enabled"}` or `{type:"adaptive"}` to opt into relaying
  // upstream reasoning_content as Claude thinking blocks; `{type:"disabled"}`
  // or an omitted `thinking` field opts out. Kept false for every other
  // client schema (OpenAI / Responses), which never express intent through
  // `body.thinking`. Mirrors hasActiveClaudeThinking() so the request and
  // response sides agree on what counts as "thinking requested" — a prior
  // inline `=== "enabled"` check silently suppressed `adaptive` (the intent
  // Claude Code actually sends), leaking the mismatch as a broken tool-call
  // turn (call log 1787566395384-bab9ab: reasoning dropped → model emitted
  // DSML tool-call markers as plain text → incomplete `stop` finish).
  const requestedThinking = hasActiveClaudeThinking((body ?? {}) as Record<string, unknown>);

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
      requestedThinking,
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
      requestedThinking,
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
  const clientFacingStream = wrapReadableStreamWithFinalize(finalStream, releaseTurnExecution);

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

  const response = new Response(clientFacingStream, {
    headers: responseHeaders,
  });
  turnExecutionHandedOffToStream = true;
  return {
    result: {
      success: true,
      response,
    },
    carry: { onPipelineStreamError, onClientDisconnectFinalize, turnExecutionHandedOffToStream },
  };
}
