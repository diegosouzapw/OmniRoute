/**
 * Streaming completion callback lifted out of handleChatCore.
 * Logs, cache, cost, and plugin hooks after the upstream stream ends.
 * Does not send or decide recovery.
 */

import { FORMATS } from "../../translator/formats.ts";
import { needsTranslation } from "../../translator/index.ts";
import { extractToolSchemaMap } from "../../translator/response/openai-responses/toolSchemas.ts";
import {
  cacheReasoningFromAssistantMessage,
  requiresReasoningReplay,
} from "../../services/reasoningCache.ts";
import { incrementTokenUsage } from "../../services/geminiRateLimitTracker.ts";
import {
  createRoutingEvent,
  emitRoutingEvent,
  outcomeFromStatus,
} from "../../services/routing/index.ts";
import { translateNonStreamingResponse } from "../responseTranslator.ts";
import { buildCacheUsageLogMeta } from "./cacheUsageMeta.ts";
import { maybeSyncClaudeExtraUsageState } from "./telemetryHelpers.ts";
import { recordContextEditingTelemetryHook } from "./contextEditingTelemetry.ts";
import { recordStreamingUsageStats } from "./streamingUsageStats.ts";
import { recordStreamingCost } from "./streamingCost.ts";
import { scheduleStreamingQuotaShareConsumption } from "./streamingQuotaShare.ts";
import { runMemoryExtractionGate } from "./memoryExtraction.ts";
import { storeStreamingSemanticCacheResponse } from "./streamingSemanticCacheStore.ts";
import { runPluginOnStreamCompleteHook } from "./pluginOnResponse.ts";
import type { PersistAttemptLogsArgs } from "./attemptLogging.ts";
import type { EffectiveServiceTier } from "./serviceTier.ts";

export type StreamCompletePayload = {
  status?: number;
  usage?: unknown;
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
  error?: unknown;
  errorCode?: string;
  ttft?: number;
  itlMs?: number;
  interrupted?: unknown;
};

export type StreamMaterializeDeps = {
  persistAttemptLogs: (args: PersistAttemptLogsArgs) => void;
  getCurrentConnectionId: () => string | null;
  provider: string | null | undefined;
  model: string | null | undefined;
  credentials:
    | {
        connectionId?: string | null;
        providerSpecificData?: unknown;
      }
    | null
    | undefined;
  log:
    | {
        info?: (tag: string, msg: string) => void;
        debug?: (tag: string, msg: string) => void;
        warn?: (...args: unknown[]) => void;
      }
    | null
    | undefined;
  clientResponseFormat: string;
  responseToolNameMap: Map<string, string> | null | undefined;
  finalBody: Record<string, unknown> | null | undefined;
  translatedBody: Record<string, unknown> | null | undefined;
  body: unknown;
  reasoningCacheScope: string | null;
  contextEditingEnabled: boolean;
  skillRequestId: string;
  streamFailure: {
    finalizeStreamRequestLog: (args: Record<string, unknown>) => void;
  };
  pendingRequestId: string;
  startTime: number;
  apiKeyInfo: { id?: string | null } | undefined;
  isCombo: boolean;
  comboStrategy: string | null | undefined;
  endpointPath: string | undefined;
  traceId: string;
  calculateCost: (
    provider: string,
    model: string,
    usage: Record<string, number | undefined> | null | undefined,
    options: { serviceTier?: string }
  ) => Promise<number>;
  recordCost: (apiKeyId: string, cost: number) => void;
  memoryOwnerId: string | null | undefined;
  memorySettings: { enabled?: boolean | null; maxTokens?: number | null } | null | undefined;
  videoBridgeObserved: boolean;
  pipelineSessionId: string | null | undefined;
  extractFacts: (text: string, memoryOwnerId: string, sessionId: string) => void;
  semanticCacheEnabled: boolean;
  bodyForCacheWrite: unknown;
  clientRawRequest: { headers?: Headers | null | undefined };
  claudePromptCacheLogMeta: Record<string, unknown> | null | undefined;
  resolveReportedServiceTier: (payload?: unknown, maxDepth?: number) => EffectiveServiceTier | null;
  attachCompressionUsageReceiptAfterAnalytics: (
    usage: Record<string, unknown>,
    source: "provider" | "estimated" | "stream"
  ) => void;
  routingFinishReason: (body: unknown) => string | null;
  getStreamCompletionRecorded: () => boolean;
  setStreamCompletionRecorded: (v: boolean) => void;
  getStreamFailureCompletionRecorded: () => boolean;
  setStreamFailureCompletionRecorded: (v: boolean) => void;
  getEffectiveServiceTier: () => EffectiveServiceTier;
  setEffectiveServiceTier: (t: EffectiveServiceTier) => void;
};

export function makeOnStreamComplete(
  deps: StreamMaterializeDeps
): (payload: StreamCompletePayload) => void {
  const {
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
    getStreamCompletionRecorded,
    setStreamCompletionRecorded,
    getStreamFailureCompletionRecorded,
    setStreamFailureCompletionRecorded,
    getEffectiveServiceTier,
    setEffectiveServiceTier,
  } = deps;

  return ({
    status: streamStatus,
    usage: streamUsage,
    responseBody: streamResponseBody,
    providerPayload,
    clientPayload,
    error: streamError,
    errorCode: streamErrorCode,
    ttft,
    itlMs: streamItlMs,
    interrupted: _streamInterrupted,
  }: StreamCompletePayload) => {
    const normalizedStreamStatus = streamStatus || 200;
    if (getStreamCompletionRecorded()) return;
    setStreamCompletionRecorded(true);
    if (normalizedStreamStatus !== 200) {
      if (getStreamFailureCompletionRecorded()) return;
      setStreamFailureCompletionRecorded(true);
    }
    const cacheUsageLogMeta = buildCacheUsageLogMeta(
      streamUsage && typeof streamUsage === "object"
        ? (streamUsage as Record<string, unknown>)
        : null
    );
    const streamConnectionId = getCurrentConnectionId();

    if (normalizedStreamStatus === 200) {
      void maybeSyncClaudeExtraUsageState({
        provider,
        connectionId: streamConnectionId,
        providerSpecificData: credentials?.providerSpecificData,
        log,
      });
    }

    // Reasoning Replay Cache (#1628): Capture reasoning_content from streaming responses
    // with tool_calls so it can be replayed on subsequent turns (DeepSeek V4, Kimi K2, etc.)
    if (normalizedStreamStatus === 200 && streamResponseBody) {
      try {
        const streamBody = streamResponseBody as Record<string, unknown>;
        const cacheStreamBody = Array.isArray(streamBody.choices)
          ? streamBody
          : needsTranslation(clientResponseFormat, FORMATS.OPENAI)
            ? (translateNonStreamingResponse(
                streamBody,
                clientResponseFormat,
                FORMATS.OPENAI,
                responseToolNameMap,
                extractToolSchemaMap(finalBody || translatedBody || body)
              ) as Record<string, unknown>)
            : streamBody;
        const choices = cacheStreamBody.choices as
          { message?: Record<string, unknown> }[] | undefined;
        const msg = choices?.[0]?.message;
        const historyMessages = (translatedBody as { messages?: unknown[] } | null | undefined)
          ?.messages;
        if (requiresReasoningReplay({ provider, model })) {
          cacheReasoningFromAssistantMessage(msg, provider, model, {
            scope: reasoningCacheScope,
            historyMessages: Array.isArray(historyMessages) ? historyMessages : [],
          });
        }
      } catch {
        // Cache capture is non-critical — never block the stream
      }
    }
    const effectiveServiceTier =
      resolveReportedServiceTier(streamResponseBody) ?? getEffectiveServiceTier();
    setEffectiveServiceTier(effectiveServiceTier);

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
      error: typeof streamError === "string" ? streamError : undefined,
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
      streamUsage:
        streamUsage && typeof streamUsage === "object"
          ? (streamUsage as Record<string, number | undefined>)
          : null,
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
      streamResponseBody:
        streamResponseBody && typeof streamResponseBody === "object"
          ? (streamResponseBody as Record<string, unknown>)
          : null,
      body: (bodyForCacheWrite && typeof bodyForCacheWrite === "object"
        ? bodyForCacheWrite
        : {}) as { messages?: unknown; input?: unknown; temperature?: number; top_p?: number },
      headers: clientRawRequest?.headers,
      model,
      apiKeyId: apiKeyInfo?.id ?? undefined,
      streamUsage:
        streamUsage && typeof streamUsage === "object"
          ? (streamUsage as Record<string, unknown>)
          : null,
      log,
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
}
