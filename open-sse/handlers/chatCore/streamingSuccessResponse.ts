/**
 * Streaming success response materialization lifted out of handleChatCore.
 *
 * Orchestrates:
 * 1. Success notification (onRequestSuccess)
 * 2. Streaming response header assembly
 * 3. Codex turn-state provenance tracking
 * 4. Completion and failure finalizers (onStreamComplete, streamFailureFinalizers, disconnect grace handler)
 * 5. Transform stream creation (Responses translation, standard translation, or passthrough)
 * 6. Streaming pipeline assembly (disconnect pipe, PII transform, progress, heartbeat, model echo)
 * 7. Release turn execution wrapping
 * 8. Gamification & plugin onResponse hooks (fire-and-forget)
 * 9. Constructing and returning the client-facing Response
 */

import { FORMATS } from "../../translator/formats.ts";
import { needsTranslation } from "../../translator/index.ts";
import { mergeResponseToolNameMap } from "./passthroughToolNames.ts";
import { getCodexClientSessionId } from "../../config/codexIdentity.ts";
import {
  noteCodexTurnStateProvenance,
  readCodexTurnStateHeader,
} from "../../config/codexTurnState.ts";
import { STREAM_DISCONNECT_GRACE_PERIOD_MS } from "../../config/constants.ts";
import { hasActiveClaudeThinking } from "../../utils/thinkingBudget.ts";
import {
  createSSETransformStreamWithLogger,
  createPassthroughStreamWithLogger,
} from "../../utils/stream.ts";
import { resolveSuppressThinkClose } from "../../utils/thinkCloseMarker.ts";
import { emitRequestGamificationEvent } from "./gamificationEvent.ts";
import { assembleStreamingResponseHeaders } from "./streamingResponseHeaders.ts";
import { makeOnStreamComplete } from "./streamMaterialize.ts";
import { assembleStreamingPipeline } from "./streamingPipeline.ts";
import { wrapReadableStreamWithFinalize } from "./streamFinalize.ts";
import { runPluginOnResponseHook } from "./pluginOnResponse.ts";
import type { PersistAttemptLogsArgs } from "./attemptLogging.ts";
import type { EffectiveServiceTier } from "./serviceTier.ts";
import * as defaultStreamFailure from "../../utils/streamFailureFinalization.ts";

export interface StreamingSuccessResponseDeps {
  providerResponse: Response;
  onRequestSuccess?: (() => Promise<void> | void) | null;
  provider: string;
  model: string;
  connectionId?: string | null;
  credentials?: { connectionId?: string | null; providerSpecificData?: unknown } | null;
  pendingRequestId: string;
  compressionResponseMeta?: string | null;
  comboStrategy?: string | null;
  fallbackAttempts?: number;
  clientRawRequest?: { headers?: Headers | null; signal?: AbortSignal } | null;
  toolNameMap?: Map<string, string> | null;
  finalBody?: Record<string, unknown> | null;
  translatedBody?: Record<string, unknown> | null;
  body: unknown;
  persistAttemptLogs: (args: PersistAttemptLogsArgs) => void;
  getCurrentConnectionId: () => string | null;
  log?: {
    info?: (tag: string, msg: string) => void;
    debug?: (tag: string, msg: string) => void;
    warn?: (...args: unknown[]) => void;
  } | null;
  reqLogger?: Parameters<typeof createSSETransformStreamWithLogger>[3];
  clientResponseFormat: string;
  targetFormat: string;
  isResponsesEndpoint: boolean;
  isDroidCLI: boolean;
  reasoningCacheScope: string | null;
  reasoningReplayHistory?: unknown[] | null;
  contextEditingEnabled: boolean;
  skillRequestId: string;
  streamFailure?: typeof defaultStreamFailure;
  startTime: number;
  apiKeyInfo?: { id?: string | null };
  isCombo: boolean;
  endpointPath?: string;
  traceId: string;
  calculateCost: (
    provider: string,
    model: string,
    usage: Record<string, number | undefined> | null | undefined,
    options: { serviceTier?: string }
  ) => Promise<number>;
  recordCost: (apiKeyId: string, cost: number) => void;
  memoryOwnerId?: string | null;
  memorySettings?: { enabled?: boolean | null; maxTokens?: number | null } | null;
  videoBridgeObserved: boolean;
  pipelineSessionId?: string | null;
  extractFacts: (text: string, memoryOwnerId: string, sessionId: string) => void;
  semanticCacheEnabled: boolean;
  bodyForCacheWrite: unknown;
  claudePromptCacheLogMeta?: Record<string, unknown> | null;
  resolveReportedServiceTier: (payload?: unknown, maxDepth?: number) => EffectiveServiceTier | null;
  attachCompressionUsageReceiptAfterAnalytics: (
    usage: Record<string, unknown>,
    source: "provider" | "estimated" | "stream"
  ) => void;
  routingFinishReason: (body: unknown) => string | null;
  effectiveServiceTier: EffectiveServiceTier;
  persistFailureUsage: (
    statusCode: number,
    errorCode?: string | null,
    aggregate?: unknown
  ) => Promise<void> | void;
  onStreamFailure?: ((err: unknown) => Promise<void> | void) | null;
  setOnPipelineStreamError: (fn: defaultStreamFailure.PipelineStreamErrorHandler | null) => void;
  setOnClientDisconnectFinalize: (
    fn: ((event: { reason: string; duration: number }) => boolean) | null
  ) => void;
  streamUserAgent?: string;
  thinkingMarkerHeader?: string | null;
  copilotCompatibleReasoning?: boolean;
  customToolNames?: ReadonlySet<string>;
  requestToolIdentityMap?: Map<string, { namespace: string; name: string }> | null;
  streamController: Parameters<typeof assembleStreamingPipeline>[0]["streamController"];
  createPiiTransform?: unknown;
  echoModel?: string;
  streamReadinessPolicy: { timeoutMs: number };
  releaseTurnExecution: () => void;
}

export async function materializeStreamingSuccessResponse(
  deps: StreamingSuccessResponseDeps
): Promise<Response> {
  const {
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
    streamFailure = defaultStreamFailure,
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
    effectiveServiceTier: initialServiceTier,
    persistFailureUsage,
    onStreamFailure,
    setOnPipelineStreamError,
    setOnClientDisconnectFinalize,
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
  } = deps;

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
  let transformStream: Parameters<typeof assembleStreamingPipeline>[0]["transformStream"];
  const responseToolNameMap = mergeResponseToolNameMap(
    toolNameMap,
    (finalBody as Record<string, unknown> | null | undefined) ?? null
  );

  let streamCompletionRecorded = false;
  let streamFailureCompletionRecorded = false;
  let currentServiceTier = initialServiceTier;

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
    reasoningReplayHistory,
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
    clientRawRequest: clientRawRequest ?? {},
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
    getEffectiveServiceTier: () => currentServiceTier,
    setEffectiveServiceTier: (t) => {
      currentServiceTier = t;
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
  setOnPipelineStreamError(streamFailureFinalizers.onPipelineStreamError);

  // #9653: gives a genuine, race-delayed completion a chance to land (see
  // createClientDisconnectGraceHandler's doc comment) before persisting a false
  // 499/0-tokens for a request that actually delivered its full response.
  setOnClientDisconnectFinalize(
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
  const streamStateBody = (finalBody || body) as Record<string, unknown>;

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
      reqLogger ?? null,
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
      reqLogger ?? null,
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
      reqLogger ?? null,
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

  return new Response(clientFacingStream, {
    headers: responseHeaders,
  });
}
