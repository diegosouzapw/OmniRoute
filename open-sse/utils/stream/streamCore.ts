import { translateResponse, initState } from "../../translator/index.ts";
import { FORMATS } from "../../translator/formats.ts";
import {
  generateSessionId,
  consumeToolFinishTime,
  markToolFinish,
} from "../../services/sessionManager.ts";
import { trackPendingRequest, appendRequestLog } from "@/lib/usage/usageHistory.ts";
import { calculateCost } from "@/lib/usage/costCalculator";
import { buildOmniRouteSseMetadataComment } from "@/domain/omnirouteResponseMeta";
import {
  createStructuredSSECollector,
  buildStreamSummaryFromEvents,
} from "../streamPayloadCollector.ts";
import {
  STREAM_IDLE_TIMEOUT_MS,
  HTTP_STATUS,
} from "../../config/constants.ts";
import {
  parseSSELine,
  formatSSE,
  hasValuableContent,
  fixInvalidId,
  unwrapGeminiChunk,
} from "../streamHelpers.ts";
import { recordToolLatency } from "../../services/toolLatencyTracker.ts";
import {
  sanitizeStreamingChunk,
  extractThinkingFromContent,
  OMIT_STREAMING_CHUNK_MARKER,
} from "../handlers/responseSanitizer.ts";
import {
  hasValidUsage,
  estimateUsage,
  filterUsageForFormat,
  addBufferToUsage,
  logUsage,
} from "../usageTracking.ts";
import { normalizeStreamFailurePayload } from "./errors.ts";
import { buildErrorBody } from "../error.ts";
import { SSEStreamContext } from "./types.ts";
import {
  parseTextualToolCallFromContent,
  containsTextualToolCallCandidate,
  containsMalformedTextualToolCall,
  extractAllowedToolNames,
  collectPassthroughTextualToolCall,
} from "./textualToolCalls.ts";
import { getOpenAIIntermediateChunks } from "./openaiChunks.ts";
import {
  SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT,
  createClaudeEmptyResponseLifecycle,
  getClaudeEventType,
  isClaudeEventPayload,
  updateClaudeEmptyResponseLifecycle,
  shouldInjectClaudeEmptyResponseBeforeCurrentEvent,
  shouldInjectClaudeEmptyResponseOnFlush,
  shouldInjectClaudeMissingFinalizersOnFlush,
  buildSyntheticClaudeEmptyResponseEvents,
  restoreClaudePassthroughToolUseName,
} from "./claudeLifecycle.ts";
import {
  normalizeResponsesSseIds,
  markPendingRequestCleared,
  pushUniqueResponsesOutputItems,
  backfillResponsesCompletedOutput,
  stripResponsesLifecycleEcho,
} from "./responsesLifecycle.ts";
import {
  buildResponsesFunctionCallEvents,
  formatSSEDataEvents,
  toChatCompletionChunkWithToolCall,
  toResponsesCompletedWithToolCalls,
} from "./sseFormatters.ts";
import { stringifyIdValue, asRecord, appendBoundedText, STREAM_MODE } from "./utils.ts";
import {
  JsonRecord,
  StreamLogger,
  StreamCompletePayload,
  StreamFailurePayload,
  StreamOptions,
  TranslateState,
  ToolCall,
  UsageTokenRecord,
} from "./types.ts";

// Module-level helpers extracted from createSSEStream closures to keep
// cyclomatic complexity of individual functions under the 15-node gate.

function getResponsesReasoningSummaryTextModule(item: Record<string, unknown>): string {
  return Array.isArray(item.summary)
    ? item.summary
        .map((part) => {
          if (!part || typeof part !== "object" || Array.isArray(part)) {
            return "";
          }
          return typeof (part as Record<string, unknown>).text === "string"
            ? ((part as Record<string, unknown>).text as string)
            : "";
        })
        .join("")
    : "";
}

function getResponsesReasoningKeyModule(
  payload: Record<string, unknown>,
  passthroughResponsesId: string | null
): string | null {
  const itemId = stringifyIdValue(payload.item_id);
  if (itemId) {
    return itemId;
  }
  const item =
    payload.item && typeof payload.item === "object" && !Array.isArray(payload.item)
      ? (payload.item as Record<string, unknown>)
      : null;
  const outputItemId = item ? stringifyIdValue(item.id) : null;
  if (outputItemId) {
    return outputItemId;
  }
  const responseId = stringifyIdValue(payload.response_id) || passthroughResponsesId;
  const outputIndex =
    typeof payload.output_index === "number" && Number.isInteger(payload.output_index)
      ? payload.output_index
      : null;
  return responseId !== null && outputIndex !== null ? `${responseId}:${outputIndex}` : null;
}

function ensureVisibleResponsesReasoningSummaryModule(payload: Record<string, unknown>): boolean {
  const item =
    payload.item && typeof payload.item === "object" && !Array.isArray(payload.item)
      ? (payload.item as Record<string, unknown>)
      : null;
  if (!item || item.type !== "reasoning") {
    return false;
  }
  if (getResponsesReasoningSummaryTextModule(item)) {
    return false;
  }
  const hasEncryptedReasoning =
    typeof item.encrypted_content === "string" && item.encrypted_content.length > 0;
  if (!hasEncryptedReasoning) {
    return false;
  }
  item.summary = [
    {
      type: "summary_text",
      text: "Codex is reasoning, but the upstream Responses API exposed this reasoning block only as encrypted state. OmniRoute cannot recover the private reasoning text.",
    },
  ];
  return true;
}

function computeReasoningIdsModule(
  item: Record<string, unknown>,
  payload: Record<string, unknown>,
  reasoningKey: string
): { itemId: string; outputIndex: number } {
  const itemId = typeof item.id === "string" && item.id ? item.id : reasoningKey;
  const outputIndex =
    typeof payload.output_index === "number" && Number.isInteger(payload.output_index)
      ? payload.output_index
      : 0;
  return { itemId, outputIndex };
}

function maybeExtractOpenAIThinking(
  itemSanitized: Record<string, unknown>,
  sourceFormat: string
): Record<string, unknown> | null {
  const isResponsesEvent =
    typeof itemSanitized?.event === "string" && itemSanitized.event.startsWith("response.");
  if (sourceFormat === FORMATS.OPENAI && !isResponsesEvent) {
    const sanitized = sanitizeStreamingChunk(itemSanitized) as Record<string, unknown>;
    const delta = sanitized?.choices?.[0]?.delta;
    if (delta?.content && typeof delta.content === "string") {
      const { content, thinking } = extractThinkingFromContent(delta.content);
      delta.content = content;
      if (thinking && !delta.reasoning_content) {
        delta.reasoning_content = thinking;
      }
    }
    return sanitized;
  }
  return null;
}

function maybeFillFinishChunkUsage(
  itemSanitized: Record<string, unknown>,
  state: TranslateState | null | undefined,
  isFinishChunk: boolean,
  body: Record<string, unknown> | null | undefined,
  totalContentLength: number,
  sourceFormat: string
): void {
  if (!state?.finishReason || !isFinishChunk) {
    return;
  }
  if (!hasValidUsage(itemSanitized.usage) && totalContentLength > 0) {
    const estimated = estimateUsage(body, totalContentLength, sourceFormat);
    itemSanitized.usage = filterUsageForFormat(estimated, sourceFormat);
    state.usage = estimated;
  } else if (state.usage) {
    const buffered = addBufferToUsage(state.usage);
    itemSanitized.usage = filterUsageForFormat(buffered, sourceFormat);
  }
}

function maybeEmitClaudeLifecycleEvents(
  itemSanitized: Record<string, unknown>,
  claudeEmptyResponseLifecycle: Record<string, unknown>,
  sourceFormat: string
): { shouldInjectEmptyResponse: boolean; eventType: string | null } {
  let shouldInjectEmptyResponse = false;
  let eventType: string | null = null;
  if (
    sourceFormat === FORMATS.CLAUDE &&
    shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
      claudeEmptyResponseLifecycle as Parameters<
        typeof shouldInjectClaudeEmptyResponseBeforeCurrentEvent
      >[0],
      itemSanitized
    )
  ) {
    shouldInjectEmptyResponse = true;
    eventType = getClaudeEventType(itemSanitized);
  }
  if (sourceFormat === FORMATS.CLAUDE && isClaudeEventPayload(itemSanitized)) {
    updateClaudeEmptyResponseLifecycle(
      claudeEmptyResponseLifecycle as Parameters<typeof updateClaudeEmptyResponseLifecycle>[0],
      itemSanitized
    );
  }
  return { shouldInjectEmptyResponse, eventType };
}

const CREATE_SSE_STREAM_DEFAULTS = {
  mode: STREAM_MODE.TRANSLATE,
  clientResponseFormat: null,
  copilotCompatibleReasoning: false,
  provider: null,
  reqLogger: null,
  toolNameMap: null,
  model: null,
  connectionId: null,
  apiKeyInfo: null,
  body: null,
  onComplete: null,
  onFailure: null,
};

function buildSSEStreamContext(options: StreamOptions): SSEStreamContext {
  const {
    mode,
    targetFormat,
    sourceFormat,
    clientResponseFormat,
    copilotCompatibleReasoning,
    provider,
    reqLogger,
    toolNameMap,
    model,
    connectionId,
    apiKeyInfo,
    body,
    onComplete,
    onFailure,
  } = { ...CREATE_SSE_STREAM_DEFAULTS, ...options };
  const signatureNamespace = connectionId;

  const clientExpectsResponsesStream =
    (mode === STREAM_MODE.PASSTHROUGH
      ? clientResponseFormat === FORMATS.OPENAI_RESPONSES
      : sourceFormat === FORMATS.OPENAI_RESPONSES) === true;

  const clientExpectsClaudeStream =
    (mode === STREAM_MODE.PASSTHROUGH
      ? clientResponseFormat === FORMATS.CLAUDE
      : sourceFormat === FORMATS.CLAUDE) === true;

  const shouldEmitDoneTerminator = !clientExpectsResponsesStream && !clientExpectsClaudeStream;

  let buffer = "";
  let usage: UsageTokenRecord | null = null;
  let passthroughHasToolCalls = false;
  const passthroughToolCalls = new Map<string, ToolCall>();
  let passthroughToolCallSeq = 0;
  const allowedToolNames = extractAllowedToolNames(body);
  let skipPassthroughEvent = false;

  const state: TranslateState | null =
    mode === STREAM_MODE.TRANSLATE
      ? {
          ...(initState(sourceFormat) as TranslateState),
          provider,
          toolNameMap,
          signatureNamespace,
          copilotCompatibleReasoning,
          accumulatedContent: "",
        }
      : null;

  let totalContentLength = 0;
  let passthroughAccumulatedContent = "";
  let passthroughAccumulatedReasoning = "";
  let passthroughBufferedTextualToolCallContent = "";
  const passthroughResponsesOutputItems: unknown[] = [];
  const passthroughResponsesPendingFunctionCalls = new Map<string, JsonRecord>();
  let passthroughResponsesId: string | null = null;
  let passthroughResponsesCurrentFunctionCallKey: string | null = null;
  const passthroughResponsesReasoningSummarySeen = new Set<string>();
  const streamStartedAt = Date.now();

  let lastToolCallChunkTime: number | null = null;
  let toolFinishTime: number | null = null;
  let contentAfterToolSeen = false;

  const sessionId = generateSessionId(body as Parameters<typeof generateSessionId>[0], {
    provider: provider ?? undefined,
    connectionId: connectionId ?? undefined,
  });
  let pendingToolFinishTime: number | null = null;
  try {
    pendingToolFinishTime = consumeToolFinishTime(sessionId);
  } catch {}

  let doneSent = false;
  const providerPayloadCollector = createStructuredSSECollector({
    stage: "provider_response",
  });
  const clientPayloadCollector = createStructuredSSECollector({
    stage: "client_response",
  });
  const requestRecord = asRecord(body);
  const requestStreamOptions = asRecord(
    requestRecord.stream_options ?? requestRecord.streamOptions
  );
  const expectsOpenAIUsageOnlyChunk =
    requestStreamOptions.include_usage === true || requestStreamOptions.includeUsage === true;

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  let lastChunkTime = Date.now();
  let idleTimer: ReturnType<typeof setInterval> | null = null;
  let streamTimedOut = false;
  const claudeEmptyResponseLifecycle = createClaudeEmptyResponseLifecycle() as Record<
    string,
    unknown
  >;
  let pendingPassthroughEventLine: string | null = null;
  let pendingPassthroughEventEmitted = false;

  const clearIdleTimer = () => {
    if (idleTimer) {
      clearInterval(idleTimer);
      idleTimer = null;
    }
  };

  const clearPendingPassthroughEvent = () => {
    pendingPassthroughEventLine = null;
    pendingPassthroughEventEmitted = false;
  };

  const maybePrefixPendingPassthroughEvent = (output: string, line: string) => {
    if (!pendingPassthroughEventLine || !line.startsWith("data:")) {
      return output;
    }
    if (!pendingPassthroughEventEmitted) {
      pendingPassthroughEventEmitted = true;
      return `${pendingPassthroughEventLine}\n${output}`;
    }
    return output;
  };

  const applyTextualToolCallStreamingGuard = (parsed: Record<string, unknown>) => {
    const choice = Array.isArray((parsed as JsonRecord).choices)
      ? (((parsed as JsonRecord).choices as unknown[])[0] as JsonRecord | undefined)
      : undefined;
    const delta = asRecord(choice?.delta);
    let textualToolCallConverted = false;

    if (typeof delta?.content === "string") {
      const incomingContent = delta.content;
      const bufferedCandidate = passthroughBufferedTextualToolCallContent + incomingContent;
      if (
        passthroughBufferedTextualToolCallContent ||
        containsTextualToolCallCandidate(incomingContent)
      ) {
        const parsedCandidate = parseTextualToolCallCandidate(bufferedCandidate);
        if (parsedCandidate?.kind === "complete") {
          const collectedToolCall = collectPassthroughTextualToolCall(
            bufferedCandidate,
            passthroughToolCalls,
            allowedToolNames
          );
          if (collectedToolCall) {
            parsed = toChatCompletionChunkWithToolCall(parsed, collectedToolCall);
            passthroughHasToolCalls = true;
          } else {
            delete delta.content;
            delete delta.reasoning_content;
          }
          textualToolCallConverted = true;
          passthroughBufferedTextualToolCallContent = "";
        } else if (parsedCandidate?.kind === "partial") {
          passthroughBufferedTextualToolCallContent = appendBoundedText(
            passthroughBufferedTextualToolCallContent,
            incomingContent
          );
          textualToolCallConverted = true;
          delta.content = "";
        } else {
          if (passthroughBufferedTextualToolCallContent) {
            delta.content = passthroughBufferedTextualToolCallContent + incomingContent;
            textualToolCallConverted = true;
          }
          passthroughAccumulatedContent = appendBoundedText(
            passthroughAccumulatedContent,
            passthroughBufferedTextualToolCallContent + incomingContent
          );
          passthroughBufferedTextualToolCallContent = "";
        }
      } else {
        passthroughAccumulatedContent = appendBoundedText(
          passthroughAccumulatedContent,
          incomingContent
        );
      }
    }

    return { parsed, textualToolCallConverted };
  };

  const emitSyntheticClaudeEmptyResponse = (
    controller: TransformStreamDefaultController,
    options: {
      includeContentBlock?: boolean;
      includeMessageDelta?: boolean;
      includeMessageStop?: boolean;
    } = {}
  ) => {
    const events = buildSyntheticClaudeEmptyResponseEvents(
      claudeEmptyResponseLifecycle,
      model,
      options
    );
    if (events.length === 0) return;

    if (!claudeEmptyResponseLifecycle.warningLogged) {
      claudeEmptyResponseLifecycle.warningLogged = true;
      console.warn(
        `[STREAM] Injecting synthetic Claude SSE response for empty upstream output (${provider || "provider"}:${model || "unknown"})`
      );
    }

    if (options.includeContentBlock !== false) {
      claudeEmptyResponseLifecycle.syntheticContentInjected = true;
      if (!passthroughAccumulatedContent.trim()) {
        passthroughAccumulatedContent = SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT;
      }
      if (state?.accumulatedContent !== undefined && !state.accumulatedContent.trim()) {
        state.accumulatedContent = SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT;
      }
    }

    for (const event of events) {
      updateClaudeEmptyResponseLifecycle(claudeEmptyResponseLifecycle, event);
      clientPayloadCollector.push(event);
      const output = formatSSE(event, FORMATS.CLAUDE);
      reqLogger?.appendConvertedChunk?.(output);
      controller.enqueue(encoder.encode(output));
    }
  };

  const emitTranslatedClientItem = (
    controller: TransformStreamDefaultController,
    item: Record<string, unknown>
  ) => {
    let itemSanitized: Record<string, unknown> = item;

    const sanitized = maybeExtractOpenAIThinking(itemSanitized, sourceFormat);
    if (sanitized) {
      itemSanitized = sanitized;
    }

    if (!hasValuableContent(itemSanitized, sourceFormat)) {
      return;
    }

    const isFinishChunk =
      itemSanitized.type === "message_delta" || itemSanitized.choices?.[0]?.finish_reason;
    maybeFillFinishChunkUsage(
      itemSanitized,
      state,
      isFinishChunk,
      body,
      totalContentLength,
      sourceFormat
    );

    const { shouldInjectEmptyResponse, eventType } = maybeEmitClaudeLifecycleEvents(
      itemSanitized,
      claudeEmptyResponseLifecycle,
      sourceFormat
    );
    if (shouldInjectEmptyResponse) {
      emitSyntheticClaudeEmptyResponse(controller, {
        includeContentBlock: true,
        includeMessageDelta:
          eventType === "message_stop" &&
          !(claudeEmptyResponseLifecycle as Record<string, unknown>).hasMessageDelta,
        includeMessageStop: false,
      });
    }

    const output = formatSSE(itemSanitized, sourceFormat);
    clientPayloadCollector.push(itemSanitized);
    reqLogger?.appendConvertedChunk?.(output);
    controller.enqueue(encoder.encode(output));
  };

  const emitFinalSseMetadata = async (
    controller: TransformStreamDefaultController,
    finalUsage: UsageTokenRecord | Record<string, unknown> | null | undefined
  ) => {
    const costUsd = finalUsage ? await calculateCost(provider, model, finalUsage) : 0;
    const comment = buildOmniRouteSseMetadataComment({
      provider,
      model,
      cacheHit: false,
      latencyMs: Date.now() - streamStartedAt,
      usage: finalUsage,
      costUsd,
    });
    if (!comment) return;
    reqLogger?.appendConvertedChunk?.(comment);
    controller.enqueue(encoder.encode(comment));
  };

  const getResponsesReasoningKey = (payload: Record<string, unknown>): string | null =>
    getResponsesReasoningKeyModule(payload, passthroughResponsesId);

  const getResponsesReasoningSummaryText = getResponsesReasoningSummaryTextModule;

  const ensureVisibleResponsesReasoningSummary = ensureVisibleResponsesReasoningSummaryModule;

  const emitSyntheticResponsesReasoningSummary = (
    controller: TransformStreamDefaultController,
    payload: Record<string, unknown>
  ) => {
    const item =
      payload.item && typeof payload.item === "object" && !Array.isArray(payload.item)
        ? (payload.item as Record<string, unknown>)
        : null;
    if (!item || item.type !== "reasoning") {
      return;
    }

    ensureVisibleResponsesReasoningSummary(payload);
    const visibleSummary = getResponsesReasoningSummaryText(item);

    if (!visibleSummary) {
      return;
    }

    const reasoningKey = getResponsesReasoningKey(payload);
    if (!reasoningKey || passthroughResponsesReasoningSummarySeen.has(reasoningKey)) {
      return;
    }
    passthroughResponsesReasoningSummarySeen.add(reasoningKey);

    const { itemId, outputIndex } = computeReasoningIdsModule(item, payload, reasoningKey);

    const syntheticEvents = [
      {
        event: "response.reasoning_summary_text.delta",
        body: {
          type: "response.reasoning_summary_text.delta",
          item_id: itemId,
          output_index: outputIndex,
          summary_index: 0,
          delta: visibleSummary,
        },
      },
      {
        event: "response.reasoning_summary_part.done",
        body: {
          type: "response.reasoning_summary_part.done",
          item_id: itemId,
          output_index: outputIndex,
          summary_index: 0,
          part: { type: "summary_text", text: visibleSummary },
        },
      },
    ];

    for (const syntheticEvent of syntheticEvents) {
      clientPayloadCollector.push(syntheticEvent.body);
      const output = `event: ${syntheticEvent.event}\ndata: ${JSON.stringify(syntheticEvent.body)}\n\n`;
      reqLogger?.appendConvertedChunk?.(output);
      controller.enqueue(encoder.encode(output));
    }
  };

  return {
    mode: mode as string,
    targetFormat: targetFormat as string | undefined,
    sourceFormat: sourceFormat as string | undefined,
    clientResponseFormat: clientResponseFormat as string | null,
    copilotCompatibleReasoning: copilotCompatibleReasoning as boolean,
    provider: provider as string | null,
    reqLogger: reqLogger as StreamLogger | null,
    toolNameMap,
    model: model as string | null,
    connectionId: connectionId as string | null,
    apiKeyInfo,
    body,
    onComplete: onComplete as ((payload: StreamCompletePayload) => void) | null,
    onFailure: onFailure as ((payload: StreamFailurePayload) => void | Promise<void>) | null,
    clientExpectsResponsesStream,
    clientExpectsClaudeStream,
    shouldEmitDoneTerminator,
    expectsOpenAIUsageOnlyChunk,
    signatureNamespace: signatureNamespace as string | null,
    buffer,
    usage,
    passthroughHasToolCalls,
    passthroughToolCalls,
    passthroughToolCallSeq,
    allowedToolNames,
    skipPassthroughEvent,
    state,
    totalContentLength,
    passthroughAccumulatedContent,
    passthroughAccumulatedReasoning,
    passthroughBufferedTextualToolCallContent,
    passthroughResponsesOutputItems,
    passthroughResponsesPendingFunctionCalls,
    passthroughResponsesId,
    passthroughResponsesCurrentFunctionCallKey,
    passthroughResponsesReasoningSummarySeen,
    streamStartedAt,
    lastToolCallChunkTime,
    toolFinishTime,
    contentAfterToolSeen,
    sessionId,
    pendingToolFinishTime,
    doneSent,
    pendingPassthroughEventLine,
    pendingPassthroughEventEmitted,
    lastChunkTime,
    streamTimedOut,
    decoder,
    encoder,
    idleTimer,
    claudeEmptyResponseLifecycle,
    providerPayloadCollector,
    clientPayloadCollector,
    requestRecord,
    requestStreamOptions,
    clearIdleTimer,
    clearPendingPassthroughEvent,
    maybePrefixPendingPassthroughEvent,
    applyTextualToolCallStreamingGuard,
    emitSyntheticClaudeEmptyResponse,
    emitTranslatedClientItem,
    emitFinalSseMetadata,
    getResponsesReasoningKey,
    getResponsesReasoningSummaryText,
    ensureVisibleResponsesReasoningSummary,
    emitSyntheticResponsesReasoningSummary,
  };
}

/**
 * Create unified SSE transform stream with idle timeout protection.
 * If the upstream provider stops sending data for STREAM_IDLE_TIMEOUT_MS,
 * the stream emits an error event and closes to prevent indefinite hanging.
 *
 * @param {object} options
 * @param {string} options.mode - Stream mode: translate, passthrough
 * @param {string} options.targetFormat - Provider format (for translate mode)
 * @param {string} options.sourceFormat - Client format (for translate mode)
 * @param {string} options.provider - Provider name
 * @param {object} options.reqLogger - Request logger instance
 * @param {string} options.model - Model name
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {object|null} options.apiKeyInfo - API key metadata for usage attribution
 * @param {object} options.body - Request body (for input token estimation)
 * @param {function} options.onComplete - Callback when stream finishes: ({ status, usage }) => void
 */
export function createSSEStream(options: StreamOptions = {}) {
  const ctx = buildSSEStreamContext(options);
  return new TransformStream(
    {
      start(controller) {
        // Start idle watchdog — checks every 10s if ctx.provider has stopped sending
        if (STREAM_IDLE_TIMEOUT_MS > 0) {
          ctx.idleTimer = setInterval(() => {
            if (!ctx.streamTimedOut && Date.now() - ctx.lastChunkTime > STREAM_IDLE_TIMEOUT_MS) {
              ctx.streamTimedOut = true;
              ctx.clearIdleTimer();
              const timeoutMsg = `[STREAM] Idle timeout: no data from ${ctx.provider || "provider"} for ${STREAM_IDLE_TIMEOUT_MS}ms (ctx.model: ${ctx.model || "unknown"})`;
              console.warn(timeoutMsg);
              trackPendingRequest(ctx.model, ctx.provider, ctx.connectionId, false);
              appendRequestLog({
                model: ctx.model,
                provider: ctx.provider,
                connectionId: ctx.connectionId,
                status: `FAILED ${HTTP_STATUS.GATEWAY_TIMEOUT}`,
              }).catch(() => {});
              const timeoutError = new Error(timeoutMsg);
              timeoutError.name = "StreamIdleTimeoutError";
              controller.error(markPendingRequestCleared(timeoutError));
            }
          }, 10_000);
        }
      },

      transform(chunk, controller) {
        if (ctx.streamTimedOut) return;
        ctx.lastChunkTime = Date.now();
        const text = ctx.decoder.decode(chunk, { stream: true });
        ctx.buffer += text;
        ctx.reqLogger?.appendProviderChunk?.(text);

        const lines = ctx.buffer.split("\n");
        ctx.buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          // Passthrough ctx.mode: normalize and forward
          if (ctx.mode === STREAM_MODE.PASSTHROUGH) {
            let output: string;
            let injectedUsage = false;
            let clientPayload: unknown = null;
            let failurePayload: StreamFailurePayload | null = null;

            if (ctx.skipPassthroughEvent) {
              if (!trimmed) {
                ctx.skipPassthroughEvent = false;
                ctx.clearPendingPassthroughEvent();
              }
              continue;
            }

            // Drop whole keepalive event blocks — strict OpenAI-compatible SDKs
            // try to JSON.parse empty keepalive payloads and crash.
            if (/^event:\s*keepalive\b/i.test(trimmed)) {
              ctx.skipPassthroughEvent = true;
              ctx.clearPendingPassthroughEvent();
              continue;
            }

            if (/^event:/i.test(trimmed)) {
              if (ctx.pendingPassthroughEventLine && !ctx.pendingPassthroughEventEmitted) {
                const pendingOutput = `${ctx.pendingPassthroughEventLine}\n`;
                ctx.reqLogger?.appendConvertedChunk?.(pendingOutput);
                controller.enqueue(ctx.encoder.encode(pendingOutput));
              }

              const eventType = trimmed.replace(/^event:\s*/i, "");
              if (
                shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
                  ctx.claudeEmptyResponseLifecycle,
                  {
                    type: eventType,
                  }
                )
              ) {
                ctx.emitSyntheticClaudeEmptyResponse(controller, {
                  includeContentBlock: true,
                  includeMessageDelta:
                    eventType === "message_stop" &&
                    !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                  includeMessageStop: false,
                });
              }

              ctx.pendingPassthroughEventLine = line;
              ctx.pendingPassthroughEventEmitted = false;
              continue;
            }

            if (trimmed.startsWith("data:")) {
              const providerPayload = parseSSELine(trimmed);
              if (providerPayload) {
                ctx.providerPayloadCollector.push(providerPayload);
                if ((providerPayload as { done?: unknown }).done === true) {
                  continue;
                }
              }
            }

            if (trimmed.startsWith("data:") && trimmed.slice(5).trim() === "[DONE]") {
              continue;
            }

            if (trimmed.startsWith("data:") && trimmed.slice(5).trim() !== "[DONE]") {
              try {
                let parsed = JSON.parse(trimmed.slice(5).trim());

                // Some upstream Responses-compatible providers leak an initial Chat Completions
                // bootstrap chunk (assistant role + empty content) before emitting proper
                // `response.*` events. That chunk is invalid on /v1/responses and breaks strict
                // clients like OpenCode, so drop it only for Responses-native consumers.
                const hasActiveDeltaValue = (value: unknown): boolean => {
                  if (typeof value === "string") return value.length > 0;
                  if (Array.isArray(value))
                    return value.some((entry) => hasActiveDeltaValue(entry));
                  if (value && typeof value === "object") {
                    return Object.values(value).some((entry) => hasActiveDeltaValue(entry));
                  }
                  return value !== null && value !== undefined;
                };

                const isEmptyAssistantBootstrapChunkForResponsesClient =
                  ctx.clientExpectsResponsesStream &&
                  parsed?.object === "chat.completion.chunk" &&
                  Array.isArray(parsed?.choices) &&
                  parsed.choices.length > 0 &&
                  parsed.choices.every((choice) => {
                    const candidate = choice && typeof choice === "object" ? choice : {};
                    const delta =
                      candidate.delta && typeof candidate.delta === "object"
                        ? candidate.delta
                        : null;

                    if (!delta || delta.role !== "assistant") return false;
                    if (hasActiveDeltaValue(delta.content)) return false;
                    if (candidate.finish_reason !== null && candidate.finish_reason !== undefined) {
                      return false;
                    }

                    const { role: _role, content: _content, ...restDelta } = delta;
                    return !hasActiveDeltaValue(restDelta);
                  });

                if (isEmptyAssistantBootstrapChunkForResponsesClient) {
                  continue;
                }

                // Detect Responses SSE payloads (have a `type` field like "response.created",
                // "response.output_item.added", etc.) and skip Chat Completions-specific
                // sanitization to avoid corrupting the stream for Responses-native clients.
                const isResponsesSSE =
                  parsed.type &&
                  typeof parsed.type === "string" &&
                  parsed.type.startsWith("response.");

                // Detect Claude SSE payloads. Includes "ping" and "error" to ensure
                // they bypass the Chat Completions sanitization path which would
                // incorrectly process or drop them.
                const isClaudeSSE =
                  parsed.type &&
                  typeof parsed.type === "string" &&
                  (parsed.type.startsWith("message") ||
                    parsed.type.startsWith("content_block") ||
                    parsed.type === "ping" ||
                    parsed.type === "error");

                if (isResponsesSSE) {
                  const responsesIdsNormalized = normalizeResponsesSseIds(parsed as JsonRecord);
                  const parsedResponse =
                    parsed.response &&
                    typeof parsed.response === "object" &&
                    !Array.isArray(parsed.response)
                      ? (parsed.response as JsonRecord)
                      : null;
                  const responseId =
                    (parsedResponse ? stringifyIdValue(parsedResponse.id) : null) ||
                    stringifyIdValue(parsed.response_id);
                  if (responseId) {
                    ctx.passthroughResponsesId = responseId;
                  }
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    ctx.usage = extracted;
                  }
                  if (typeof parsed.delta === "string") {
                    ctx.totalContentLength += parsed.delta.length;
                  }
                  if (
                    parsed.type === "response.output_text.delta" &&
                    typeof parsed.delta === "string"
                  ) {
                    const incomingDelta = parsed.delta;
                    const bufferedCandidate =
                      ctx.passthroughBufferedTextualToolCallContent + incomingDelta;
                    if (
                      ctx.passthroughBufferedTextualToolCallContent ||
                      containsTextualToolCallCandidate(incomingDelta)
                    ) {
                      const parsedCandidate = parseTextualToolCallCandidate(bufferedCandidate);
                      if (parsedCandidate?.kind === "complete") {
                        const collectedToolCall = collectPassthroughTextualToolCall(
                          bufferedCandidate,
                          ctx.passthroughToolCalls,
                          ctx.allowedToolNames
                        );
                        if (collectedToolCall) {
                          ctx.passthroughHasToolCalls = true;
                          const responseToolCallEvents =
                            buildResponsesFunctionCallEvents(collectedToolCall);
                          output = formatSSEDataEvents(responseToolCallEvents);
                          ctx.clientPayloadCollector.push(...responseToolCallEvents);
                          ctx.reqLogger?.appendConvertedChunk?.(output);
                          controller.enqueue(ctx.encoder.encode(output));
                          injectedUsage = true;
                        } else {
                          output = `data: ${JSON.stringify(parsed)}\n`;
                          injectedUsage = true;
                        }
                        ctx.passthroughBufferedTextualToolCallContent = "";
                        parsed.delta = "";
                      } else if (parsedCandidate?.kind === "partial") {
                        ctx.passthroughBufferedTextualToolCallContent = appendBoundedText(
                          ctx.passthroughBufferedTextualToolCallContent,
                          incomingDelta
                        );
                        parsed.delta = "";
                        output = `data: ${JSON.stringify(parsed)}\n`;
                        injectedUsage = true;
                      } else {
                        if (ctx.passthroughBufferedTextualToolCallContent) {
                          parsed.delta =
                            ctx.passthroughBufferedTextualToolCallContent + incomingDelta;
                          output = `data: ${JSON.stringify(parsed)}\n`;
                          injectedUsage = true;
                        }
                        ctx.passthroughAccumulatedContent = appendBoundedText(
                          ctx.passthroughAccumulatedContent,
                          ctx.passthroughBufferedTextualToolCallContent + incomingDelta
                        );
                        ctx.passthroughBufferedTextualToolCallContent = "";
                      }
                    } else {
                      ctx.passthroughAccumulatedContent = appendBoundedText(
                        ctx.passthroughAccumulatedContent,
                        incomingDelta
                      );
                    }
                  }
                  if (parsed.type === "response.failed") {
                    failurePayload = normalizeStreamFailurePayload(parsed);
                  }
                  if (
                    parsed.type === "response.reasoning_summary_text.delta" ||
                    parsed.type === "response.reasoning_summary_text.done" ||
                    parsed.type === "response.reasoning_summary_part.done"
                  ) {
                    const reasoningKey = ctx.getResponsesReasoningKey(parsed);
                    if (reasoningKey) {
                      ctx.passthroughResponsesReasoningSummarySeen.add(reasoningKey);
                    }
                  }
                  if (
                    parsed.type === "response.output_item.added" &&
                    parsed.item?.type === "function_call"
                  ) {
                    const item =
                      parsed.item && typeof parsed.item === "object" && !Array.isArray(parsed.item)
                        ? { ...(parsed.item as JsonRecord) }
                        : null;
                    const pendingKey =
                      item && typeof item.id === "string"
                        ? item.id
                        : item && typeof item.call_id === "string"
                          ? item.call_id
                          : null;
                    if (item && pendingKey) {
                      if (typeof item.arguments !== "string") {
                        item.arguments = "";
                      }
                      ctx.passthroughResponsesPendingFunctionCalls.set(pendingKey, item);
                      ctx.passthroughResponsesCurrentFunctionCallKey = pendingKey;
                    }
                  }
                  if (parsed.type === "response.function_call_arguments.delta") {
                    const pendingKey =
                      typeof parsed.item_id === "string"
                        ? parsed.item_id
                        : ctx.passthroughResponsesCurrentFunctionCallKey;
                    const pending = pendingKey
                      ? ctx.passthroughResponsesPendingFunctionCalls.get(pendingKey)
                      : undefined;
                    if (pending && typeof parsed.delta === "string") {
                      const previousArgs =
                        typeof pending.arguments === "string" ? pending.arguments : "";
                      pending.arguments = previousArgs + parsed.delta;
                    }
                  }
                  if (parsed.type === "response.function_call_arguments.done") {
                    const pendingKey =
                      typeof parsed.item_id === "string"
                        ? parsed.item_id
                        : ctx.passthroughResponsesCurrentFunctionCallKey;
                    const pending = pendingKey
                      ? ctx.passthroughResponsesPendingFunctionCalls.get(pendingKey)
                      : undefined;
                    if (pending) {
                      if (typeof parsed.arguments === "string") {
                        pending.arguments = parsed.arguments;
                      }
                      pushUniqueResponsesOutputItems(ctx.passthroughResponsesOutputItems, [
                        pending,
                      ]);
                    }
                  }
                  // Capture each completed output item so the final
                  // response.completed snapshot can be backfilled when upstream
                  // returns an empty `output` (happens with store: false).
                  if (parsed.type === "response.output_item.done" && parsed.item) {
                    const reasoningSummaryInjected =
                      ctx.ensureVisibleResponsesReasoningSummary(parsed);
                    ctx.emitSyntheticResponsesReasoningSummary(controller, parsed);
                    pushUniqueResponsesOutputItems(ctx.passthroughResponsesOutputItems, [
                      parsed.item,
                    ]);
                    if (reasoningSummaryInjected) {
                      output = `data: ${JSON.stringify(parsed)}\n`;
                      injectedUsage = true;
                    }
                    if (parsed.item?.type === "function_call") {
                      const pendingKey =
                        typeof parsed.item.id === "string"
                          ? parsed.item.id
                          : typeof parsed.item.call_id === "string"
                            ? parsed.item.call_id
                            : null;
                      if (pendingKey) {
                        ctx.passthroughResponsesPendingFunctionCalls.delete(pendingKey);
                        if (ctx.passthroughResponsesCurrentFunctionCallKey === pendingKey) {
                          ctx.passthroughResponsesCurrentFunctionCallKey = null;
                        }
                      }
                    }
                  }
                  if (
                    parsed.type === "response.completed" &&
                    Array.isArray(parsed.response?.output) &&
                    parsed.response.output.length > 0
                  ) {
                    pushUniqueResponsesOutputItems(
                      ctx.passthroughResponsesOutputItems,
                      parsed.response.output
                    );
                  }
                  if (
                    parsed.type === "response.completed" &&
                    ctx.passthroughResponsesPendingFunctionCalls.size > 0
                  ) {
                    pushUniqueResponsesOutputItems(ctx.passthroughResponsesOutputItems, [
                      ...ctx.passthroughResponsesPendingFunctionCalls.values(),
                    ]);
                    ctx.passthroughResponsesPendingFunctionCalls.clear();
                    ctx.passthroughResponsesCurrentFunctionCallKey = null;
                  }
                  // Two transport-level fixes for Responses passthrough:
                  //   1) Strip echoed `instructions` + `tools` from lifecycle
                  //      events — they can balloon a single SSE event past
                  //      100 KB and break parsers (e.g. GitHub Copilot CLI).
                  //   2) Backfill `response.completed.response.output` when
                  //      upstream sent it empty (store: false) — some clients
                  //      build their tool-call list from that snapshot rather
                  //      than from per-item events.
                  const textualToolCallBackfilled =
                    parsed.type === "response.completed" && ctx.passthroughToolCalls.size > 0;
                  if (textualToolCallBackfilled) {
                    parsed = toResponsesCompletedWithToolCalls(parsed as JsonRecord, [
                      ...ctx.passthroughToolCalls.values(),
                    ]) as typeof parsed;
                  }
                  const stripped = stripResponsesLifecycleEcho(parsed);
                  const backfilled = backfillResponsesCompletedOutput(
                    parsed,
                    ctx.passthroughResponsesOutputItems
                  );
                  if (
                    stripped ||
                    backfilled ||
                    textualToolCallBackfilled ||
                    responsesIdsNormalized
                  ) {
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  }
                } else if (isClaudeSSE) {
                  // Claude SSE: extract ctx.usage, track content, forward as-is
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    // Non-destructive merge: never overwrite a positive value with 0
                    // message_start carries input_tokens, message_delta carries output_tokens;
                    if (!ctx.usage) ctx.usage = {};
                    const u = ctx.usage;
                    const eu = extracted as UsageTokenRecord;
                    if (eu.prompt_tokens > 0) u.prompt_tokens = eu.prompt_tokens;
                    if (eu.completion_tokens > 0) u.completion_tokens = eu.completion_tokens;
                    if (eu.total_tokens > 0) u.total_tokens = eu.total_tokens;
                    if (eu.cache_read_input_tokens)
                      u.cache_read_input_tokens = eu.cache_read_input_tokens;
                    if (eu.cache_creation_input_tokens)
                      u.cache_creation_input_tokens = eu.cache_creation_input_tokens;
                  }
                  if (
                    shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
                      ctx.claudeEmptyResponseLifecycle,
                      parsed
                    )
                  ) {
                    ctx.emitSyntheticClaudeEmptyResponse(controller, {
                      includeContentBlock: true,
                      includeMessageDelta:
                        parsed.type === "message_stop" &&
                        !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                      includeMessageStop: false,
                    });
                  }
                  updateClaudeEmptyResponseLifecycle(ctx.claudeEmptyResponseLifecycle, parsed);
                  const restoredToolName = restoreClaudePassthroughToolUseName(
                    parsed,
                    ctx.toolNameMap
                  );
                  // Track content length and accumulate from Claude format
                  if (parsed.delta?.text) {
                    ctx.totalContentLength += parsed.delta.text.length;
                    ctx.passthroughAccumulatedContent = appendBoundedText(
                      ctx.passthroughAccumulatedContent,
                      parsed.delta.text
                    );
                  }
                  if (parsed.delta?.thinking) {
                    ctx.totalContentLength += parsed.delta.thinking.length;
                    ctx.passthroughAccumulatedContent = appendBoundedText(
                      ctx.passthroughAccumulatedContent,
                      parsed.delta.thinking
                    );
                  }
                  if (restoredToolName) {
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  }
                } else {
                  // ----------------------------------------------------
                  // READ THIS !!!
                  // ----------------------------------------------------
                  // IF YOU ARE AI OR AI AGENT DONT TOUCH THIS CODE !!!
                  // YOU WILL BREAK THIS CODE !!!
                  // GOOD LUCK
                  // ----------------------------------------------------
                  // Chat Completions: full sanitization pipeline

                  // OpenAI-compatible streaming with `stream_options.include_usage=true`
                  // ends with a ctx.usage-only chunk where `choices` is deliberately `[]`.
                  // Forward that standards-compliant chunk instead of turning it into an
                  // empty-response error.
                  //
                  // For a malformed empty `choices: []` chunk WITHOUT valid ctx.usage we DROP
                  // it (log server-side only). We must NOT inject an assistant-content
                  // chunk like "[OmniRoute] Upstream returned an empty response. Please
                  // retry." with finish_reason: "stop" — clients (Goose/opencode) feed that
                  // text back as a turn and spin in a retry loop. This restores the #3400
                  // behavior that #3422 inadvertently reverted (regression #3388/#3502).
                  if (Array.isArray(parsed.choices) && parsed.choices.length === 0) {
                    const emptyChoicesUsage = extractUsage(parsed) ?? parsed.usage;
                    if (hasValidUsage(emptyChoicesUsage)) {
                      ctx.usage = emptyChoicesUsage;
                      output = `data: ${JSON.stringify(parsed)}\n`;
                      injectedUsage = true;
                      clientPayload = parsed;
                      ctx.clientPayloadCollector.push(clientPayload);
                      ctx.reqLogger?.appendConvertedChunk?.(output);
                      controller.enqueue(ctx.encoder.encode(output));
                      continue;
                    }

                    console.warn(
                      `[STREAM] Upstream returned empty choices array (${ctx.provider || "provider"}:${ctx.model || "unknown"}) — dropping chunk`
                    );
                    continue;
                  }

                  // Detect reasoning alias before sanitization strips it
                  const hadReasoningAlias = !!(
                    parsed.choices?.[0]?.delta?.reasoning &&
                    typeof parsed.choices[0].delta.reasoning === "string" &&
                    !parsed.choices[0].delta.reasoning_content
                  );
                  const hadNonStringToolCallId = Array.isArray(parsed.choices)
                    ? parsed.choices.some(
                        (choice) =>
                          Array.isArray(choice?.delta?.tool_calls) &&
                          choice.delta.tool_calls.some(
                            (tc) => tc?.id != null && typeof tc.id !== "string"
                          )
                      )
                    : false;
                  const hadNonStringTopLevelId =
                    parsed?.id != null && typeof parsed.id !== "string";

                  parsed = sanitizeStreamingChunk(parsed);
                  if (
                    parsed &&
                    typeof parsed === "object" &&
                    !Array.isArray(parsed) &&
                    (parsed as Record<string, unknown>)[OMIT_STREAMING_CHUNK_MARKER] === true
                  ) {
                    continue;
                  }

                  const idFixed = hadNonStringTopLevelId ? false : fixInvalidId(parsed);

                  if (!hasValuableContent(parsed, FORMATS.OPENAI)) {
                    continue;
                  }

                  const delta = parsed.choices?.[0]?.delta;
                  let textualToolCallConverted = false;
                  let toolCallIdCoerced = false;

                  // Extract <think> tags from streaming content
                  if (delta?.content && typeof delta.content === "string") {
                    const { content, thinking } = extractThinkingFromContent(delta.content);
                    delta.content = content;
                    if (thinking && !delta.reasoning_content) {
                      delta.reasoning_content = thinking;
                    }
                  }

                  // Split combined reasoning+content deltas into separate SSE events.
                  // Standard OpenAI streaming never mixes both fields in one delta;
                  // clients (e.g. LobeChat) may skip content when reasoning_content
                  // is present, causing the first content token to be lost.
                  if (delta?.reasoning_content && delta?.content) {
                    const reasoningChunk = JSON.parse(JSON.stringify(parsed));
                    const rDelta = reasoningChunk.choices[0].delta;
                    delete rDelta.content;
                    reasoningChunk.choices[0].finish_reason = null;
                    delete reasoningChunk.usage;
                    const rOutput = `data: ${JSON.stringify(reasoningChunk)}\n`;
                    ctx.passthroughAccumulatedReasoning = appendBoundedText(
                      ctx.passthroughAccumulatedReasoning,
                      delta.reasoning_content
                    );
                    ctx.totalContentLength += delta.reasoning_content.length;
                    ctx.clientPayloadCollector.push(reasoningChunk);
                    ctx.reqLogger?.appendConvertedChunk?.(rOutput);
                    controller.enqueue(ctx.encoder.encode(rOutput));
                    controller.enqueue(ctx.encoder.encode("\n"));
                    delete delta.reasoning_content;
                  }

                  // Track whether we need to re-serialize (separate from injectedUsage
                  // to avoid blocking subsequent finish_reason / ctx.usage mutations)
                  const needsReserialization =
                    hadReasoningAlias || (delta?.content === "" && delta?.reasoning_content);

                  // T18: Track if we saw tool calls & accumulate for call log
                  if (delta?.tool_calls && delta.tool_calls.length > 0) {
                    ctx.passthroughHasToolCalls = true;
                    ctx.lastToolCallChunkTime = Date.now();
                    for (const tc of delta.tool_calls) {
                      // Note: sanitizeStreamingChunk above already coerces non-string
                      // tool_call IDs, but this defensive check catches edge cases
                      // where sanitize didn't run (e.g. flush path shortcuts).
                      if (tc?.id != null && typeof tc.id !== "string") {
                        tc.id = String(tc.id);
                        toolCallIdCoerced = true;
                      }
                      // Key by index first — id only appears on the first delta in OpenAI streaming
                      let key: string;
                      if (Number.isInteger(tc?.index)) {
                        key = `idx:${tc.index}`;
                      } else if (tc?.id != null) {
                        key = `id:${tc.id}`;
                      } else {
                        key = `seq:${++ctx.passthroughToolCallSeq}`;
                      }
                      const existing = ctx.passthroughToolCalls.get(key);
                      const deltaArgs =
                        typeof tc?.function?.arguments === "string" ? tc.function.arguments : "";
                      if (!existing) {
                        ctx.passthroughToolCalls.set(key, {
                          id: tc?.id != null ? String(tc.id) : null,
                          index: Number.isInteger(tc?.index)
                            ? tc.index
                            : ctx.passthroughToolCalls.size,
                          type: tc?.type || "function",
                          function: {
                            name: tc?.function?.name || "",
                            arguments: deltaArgs,
                          },
                        });
                      } else {
                        if (tc?.id) existing.id = existing.id || String(tc.id);
                        if (tc?.function?.name && !existing.function.name)
                          existing.function.name = tc.function.name;
                        existing.function.arguments += deltaArgs;
                      }
                    }
                  }

                  const content = delta?.content || delta?.reasoning_content;
                  if (typeof content === "string") {
                    ctx.totalContentLength += content.length;

                    if (!ctx.contentAfterToolSeen) {
                      const toolTs = ctx.toolFinishTime || ctx.pendingToolFinishTime;
                      const lastChunkTs = ctx.lastToolCallChunkTime;
                      if (toolTs || lastChunkTs) {
                        ctx.contentAfterToolSeen = true;
                        const now = Date.now();
                        try {
                          recordToolLatency(
                            ctx.provider || "unknown",
                            toolTs ? now - toolTs : null,
                            lastChunkTs ? now - lastChunkTs : null
                          );
                        } catch {}
                        ctx.pendingToolFinishTime = null;
                      }
                    }
                  }
                  {
                    const guarded = ctx.applyTextualToolCallStreamingGuard(
                      parsed as Record<string, unknown>
                    );
                    parsed = guarded.parsed as typeof parsed;
                    textualToolCallConverted = guarded.textualToolCallConverted;
                  }
                  if (typeof delta?.reasoning_content === "string")
                    ctx.passthroughAccumulatedReasoning = appendBoundedText(
                      ctx.passthroughAccumulatedReasoning,
                      delta.reasoning_content
                    );

                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    ctx.usage = extracted;
                  }

                  const isFinishChunk = parsed.choices?.[0]?.finish_reason;

                  if (isFinishChunk && ctx.passthroughHasToolCalls) {
                    ctx.toolFinishTime = Date.now();
                    try {
                      markToolFinish(ctx.sessionId);
                    } catch {}
                  }

                  // T18: Normalize finish_reason to 'tool_calls' if tool calls were used
                  if (
                    isFinishChunk &&
                    ctx.passthroughHasToolCalls &&
                    parsed.choices[0].finish_reason !== "tool_calls"
                  ) {
                    parsed.choices[0].finish_reason = "tool_calls";
                    // If we modify it, we must output the modified object
                    if (!injectedUsage && hasValidUsage(parsed.usage)) {
                      output = `data: ${JSON.stringify(parsed)}\n`;
                      injectedUsage = true;
                    }
                  }
                  if (
                    isFinishChunk &&
                    !hasValidUsage(parsed.usage) &&
                    !ctx.expectsOpenAIUsageOnlyChunk
                  ) {
                    const estimated = estimateUsage(
                      ctx.body,
                      ctx.totalContentLength,
                      FORMATS.OPENAI
                    );
                    parsed.usage = filterUsageForFormat(estimated, FORMATS.OPENAI);
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    ctx.usage = estimated;
                    injectedUsage = true;
                  } else if (isFinishChunk && ctx.usage) {
                    const buffered = addBufferToUsage(ctx.usage);
                    parsed.usage = filterUsageForFormat(buffered, FORMATS.OPENAI);
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  } else if (textualToolCallConverted) {
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  } else if (
                    idFixed ||
                    needsReserialization ||
                    toolCallIdCoerced ||
                    hadNonStringToolCallId ||
                    hadNonStringTopLevelId
                  ) {
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  }
                }

                clientPayload = parsed;
              } catch {}
            }

            if (!injectedUsage) {
              if (line.startsWith("data:") && !line.startsWith("data: ")) {
                output = "data: " + line.slice(5) + "\n";
              } else {
                output = line + "\n";
              }
            }

            if (
              !trimmed &&
              ctx.pendingPassthroughEventLine &&
              !ctx.pendingPassthroughEventEmitted
            ) {
              output = `${ctx.pendingPassthroughEventLine}\n${output}`;
              ctx.pendingPassthroughEventEmitted = true;
            }

            output = ctx.maybePrefixPendingPassthroughEvent(output, line);

            if (clientPayload) {
              ctx.clientPayloadCollector.push(clientPayload);
            }

            ctx.reqLogger?.appendConvertedChunk?.(output);
            controller.enqueue(ctx.encoder.encode(output));
            if (failurePayload) {
              if (ctx.onFailure) {
                Promise.resolve(ctx.onFailure(failurePayload)).catch((err) => {
                  console.error("[STREAM] Error in onFailure callback:", err);
                });
              }
              ctx.clearIdleTimer();
              trackPendingRequest(ctx.model, ctx.provider, ctx.connectionId, false);
              controller.error(
                markPendingRequestCleared(new Error(failurePayload.message || "Upstream failure"))
              );
              return;
            }
            if (!trimmed) {
              ctx.clearPendingPassthroughEvent();
            }
            continue;
          }

          // Translate ctx.mode
          if (!trimmed) continue;

          if (ctx.state?.upstreamError) {
            continue;
          }

          const parsed = parseSSELine(trimmed);
          if (!parsed) continue;
          ctx.providerPayloadCollector.push(parsed);

          if (parsed && parsed.done) {
            continue;
          }

          if (parsed.choices?.[0]?.delta?.tool_calls) {
            ctx.lastToolCallChunkTime = Date.now();
          }
          if (parsed.choices?.[0]?.finish_reason === "tool_calls") {
            ctx.toolFinishTime = Date.now();
            try {
              markToolFinish(ctx.sessionId);
            } catch {}
          }

          // Track content length and accumulate for call log (from raw ctx.provider chunk, so content is never missed)
          // Do this before translation so we capture content regardless of translator output shape

          // Claude format
          if (parsed.delta?.text) {
            const t = parsed.delta.text;
            ctx.totalContentLength += t.length;
            if (ctx.state?.accumulatedContent !== undefined && typeof t === "string")
              ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, t);
          }
          if (parsed.delta?.thinking) {
            const t = parsed.delta.thinking;
            ctx.totalContentLength += t.length;
            if (ctx.state?.accumulatedContent !== undefined && typeof t === "string")
              ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, t);
          }

          // OpenAI format
          if (parsed.choices?.[0]?.delta?.content) {
            const c = parsed.choices[0].delta.content;
            if (typeof c === "string") {
              ctx.totalContentLength += c.length;
              if (ctx.state?.accumulatedContent !== undefined)
                ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, c);
            } else if (Array.isArray(c)) {
              for (const part of c) {
                if (part?.text && typeof part.text === "string") {
                  ctx.totalContentLength += part.text.length;
                  if (ctx.state?.accumulatedContent !== undefined)
                    ctx.state.accumulatedContent = appendBoundedText(
                      ctx.state.accumulatedContent,
                      part.text
                    );
                }
              }
            }
          }
          if (parsed.choices?.[0]?.delta?.reasoning_content) {
            const r = parsed.choices[0].delta.reasoning_content;
            if (typeof r === "string") {
              ctx.totalContentLength += r.length;
              if (ctx.state?.accumulatedContent !== undefined)
                ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, r);
            }
          }
          // Normalize `reasoning` alias → `reasoning_content` (NVIDIA kimi-k2.5 etc.)
          if (
            parsed.choices?.[0]?.delta?.reasoning &&
            !parsed.choices?.[0]?.delta?.reasoning_content
          ) {
            const r = parsed.choices[0].delta.reasoning;
            if (typeof r === "string") {
              parsed.choices[0].delta.reasoning_content = r;
              delete parsed.choices[0].delta.reasoning;
              ctx.totalContentLength += r.length;
              if (ctx.state?.accumulatedContent !== undefined)
                ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, r);
            }
          }

          // Gemini / Cloud Code format - may have multiple parts
          // Cloud Code API wraps in { response: { candidates: [...] } }, so unwrap.
          // Only applies to Gemini-family formats — skip for OpenAI, Claude, etc.
          const isGeminiFormat =
            ctx.targetFormat === FORMATS.GEMINI ||
            ctx.targetFormat === FORMATS.GEMINI_CLI ||
            ctx.targetFormat === FORMATS.ANTIGRAVITY;
          const geminiChunk = isGeminiFormat ? unwrapGeminiChunk(parsed) : parsed;
          if (geminiChunk.candidates?.[0]?.content?.parts) {
            for (const part of geminiChunk.candidates[0].content.parts) {
              if (part.text && typeof part.text === "string") {
                ctx.totalContentLength += part.text.length;
                if (ctx.state?.accumulatedContent !== undefined)
                  ctx.state.accumulatedContent = appendBoundedText(
                    ctx.state.accumulatedContent,
                    part.text
                  );
              }
            }
          }

          // Generic fallback: delta string, top-level content/text (e.g. some SSE payloads)
          if (ctx.state?.accumulatedContent !== undefined) {
            if (typeof (parsed as JsonRecord).delta === "string") {
              const d = (parsed as JsonRecord).delta as string;
              ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, d);
              ctx.totalContentLength += d.length;
            }
            if (typeof (parsed as JsonRecord).content === "string") {
              const c = (parsed as JsonRecord).content as string;
              ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, c);
              ctx.totalContentLength += c.length;
            }
            if (typeof (parsed as JsonRecord).text === "string") {
              const t = (parsed as JsonRecord).text as string;
              ctx.state.accumulatedContent = appendBoundedText(ctx.state.accumulatedContent, t);
              ctx.totalContentLength += t.length;
            }
          }

          const translateHasContent =
            typeof parsed.delta?.text === "string" ||
            typeof parsed.choices?.[0]?.delta?.content === "string" ||
            typeof parsed.choices?.[0]?.delta?.reasoning_content === "string";
          if (translateHasContent && !ctx.contentAfterToolSeen) {
            const toolTs = ctx.toolFinishTime || ctx.pendingToolFinishTime;
            const lastChunkTs = ctx.lastToolCallChunkTime;
            if (toolTs || lastChunkTs) {
              ctx.contentAfterToolSeen = true;
              const now = Date.now();
              try {
                recordToolLatency(
                  ctx.provider || "unknown",
                  toolTs ? now - toolTs : null,
                  lastChunkTs ? now - lastChunkTs : null
                );
              } catch {}
              ctx.pendingToolFinishTime = null;
            }
          }

          // Extract ctx.usage
          const extracted = extractUsage(parsed);
          if (extracted) ctx.state.usage = extracted; // Keep original ctx.usage for logging

          // Translate: ctx.targetFormat -> openai -> ctx.sourceFormat
          const translated = translateResponse(
            ctx.targetFormat,
            ctx.sourceFormat,
            parsed,
            ctx.state
          );

          // Log OpenAI intermediate chunks (if available)
          for (const item of getOpenAIIntermediateChunks(translated)) {
            const openaiOutput = formatSSE(item, FORMATS.OPENAI);
            ctx.reqLogger?.appendOpenAIChunk?.(openaiOutput);
          }

          if (translated?.length > 0) {
            for (const item of translated) {
              ctx.emitTranslatedClientItem(controller, item);
            }
          }
        }
      },

      async flush(controller) {
        // Clean up idle watchdog timer
        if (ctx.idleTimer) {
          ctx.clearIdleTimer();
        }
        if (ctx.streamTimedOut) {
          return;
        }
        trackPendingRequest(ctx.model, ctx.provider, ctx.connectionId, false);
        try {
          const remaining = ctx.decoder.decode();
          if (remaining) ctx.buffer += remaining;

          if (ctx.mode === STREAM_MODE.PASSTHROUGH) {
            const bufferedLine = ctx.buffer.trim();
            if (ctx.skipPassthroughEvent || /^event:\s*keepalive\b/i.test(bufferedLine)) {
              ctx.skipPassthroughEvent = false;
              ctx.clearPendingPassthroughEvent();
            } else if (ctx.buffer) {
              let output = ctx.buffer;
              if (ctx.buffer.startsWith("data:") && !ctx.buffer.startsWith("data: ")) {
                output = "data: " + ctx.buffer.slice(5);
              }
              const bufferedPayload = parseSSELine(bufferedLine);
              if (bufferedPayload) {
                ctx.providerPayloadCollector.push(bufferedPayload);
                if (
                  shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
                    ctx.claudeEmptyResponseLifecycle,
                    bufferedPayload
                  )
                ) {
                  const eventType = getClaudeEventType(bufferedPayload);
                  ctx.emitSyntheticClaudeEmptyResponse(controller, {
                    includeContentBlock: true,
                    includeMessageDelta:
                      eventType === "message_stop" &&
                      !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                    includeMessageStop: false,
                  });
                }
                if (isClaudeEventPayload(bufferedPayload)) {
                  updateClaudeEmptyResponseLifecycle(
                    ctx.claudeEmptyResponseLifecycle,
                    bufferedPayload
                  );
                }
                ctx.clientPayloadCollector.push(bufferedPayload);

                // Normalize numeric IDs for final buffered data: chunk (same as transform path)
                if (typeof bufferedPayload === "object" && !Array.isArray(bufferedPayload)) {
                  const flushedParsed = bufferedPayload as JsonRecord;
                  const flushedType =
                    typeof flushedParsed.type === "string" ? flushedParsed.type : "";
                  const isResponses = flushedType.startsWith("response.");
                  const isClaude = isClaudeEventPayload(flushedParsed);
                  if (isResponses) {
                    if (normalizeResponsesSseIds(flushedParsed)) {
                      output = `data: ${JSON.stringify(flushedParsed)}\n`;
                    }
                  } else if (!isClaude) {
                    let flushChanged = false;
                    const flushedHadNonStringTopLevelId =
                      flushedParsed?.id != null && typeof flushedParsed.id !== "string";
                    if (flushedHadNonStringTopLevelId) {
                      flushedParsed.id = String(flushedParsed.id);
                      flushChanged = true;
                    }
                    if (Array.isArray(flushedParsed.choices)) {
                      for (const choice of flushedParsed.choices as JsonRecord[]) {
                        const tcs = (choice as JsonRecord | undefined)?.delta as
                          | JsonRecord
                          | undefined;
                        if (Array.isArray(tcs?.tool_calls)) {
                          for (const tc of tcs.tool_calls as JsonRecord[]) {
                            if (tc?.id != null && typeof tc.id !== "string") {
                              tc.id = String(tc.id);
                              flushChanged = true;
                            }
                          }
                        }
                      }
                    }
                    if (flushChanged) {
                      output = `data: ${JSON.stringify(flushedParsed)}\n`;
                    }
                  }
                }
              }
              if (
                !bufferedLine &&
                ctx.pendingPassthroughEventLine &&
                !ctx.pendingPassthroughEventEmitted
              ) {
                output = `${ctx.pendingPassthroughEventLine}\n${output}`;
                ctx.pendingPassthroughEventEmitted = true;
              }
              output = ctx.maybePrefixPendingPassthroughEvent(output, ctx.buffer);
              ctx.reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(ctx.encoder.encode(output));
            }

            if (shouldInjectClaudeEmptyResponseOnFlush(ctx.claudeEmptyResponseLifecycle)) {
              ctx.emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: true,
                includeMessageDelta: !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !ctx.claudeEmptyResponseLifecycle.hasMessageStop,
              });
            } else if (
              shouldInjectClaudeMissingFinalizersOnFlush(ctx.claudeEmptyResponseLifecycle)
            ) {
              ctx.emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: false,
                includeMessageDelta: !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !ctx.claudeEmptyResponseLifecycle.hasMessageStop,
              });
            }
            ctx.clearPendingPassthroughEvent();

            if (ctx.passthroughBufferedTextualToolCallContent) {
              // Flush any remaining buffered content as plain text.
              // Previously gated on !includes("Arguments:"), which silently dropped
              // incomplete tool-call headers (ctx.buffer held "Arguments:" but JSON was
              // never finished before stream ended) — fix #3355 bug 2.
              let flushOutput = "";
              if (ctx.clientExpectsResponsesStream) {
                const syntheticChunk = {
                  type: "response.output_text.delta",
                  delta: ctx.passthroughBufferedTextualToolCallContent,
                };
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              } else if (ctx.clientExpectsClaudeStream) {
                const syntheticChunk = {
                  type: "content_block_delta",
                  index: 0,
                  delta: {
                    type: "text_delta",
                    text: ctx.passthroughBufferedTextualToolCallContent,
                  },
                };
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              } else {
                const syntheticChunk = {
                  id: ctx.passthroughResponsesId || `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model: ctx.model || "unknown",
                  choices: [
                    {
                      index: 0,
                      delta: {
                        content: ctx.passthroughBufferedTextualToolCallContent,
                      },
                      finish_reason: null,
                    },
                  ],
                };
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              }
              ctx.reqLogger?.appendConvertedChunk?.(flushOutput);
              controller.enqueue(ctx.encoder.encode(flushOutput));
              ctx.passthroughAccumulatedContent = appendBoundedText(
                ctx.passthroughAccumulatedContent,
                ctx.passthroughBufferedTextualToolCallContent
              );
              ctx.passthroughBufferedTextualToolCallContent = "";
            }

            // Estimate ctx.usage if ctx.provider didn't return valid ctx.usage
            if (!hasValidUsage(ctx.usage) && ctx.totalContentLength > 0) {
              ctx.usage = estimateUsage(
                ctx.body,
                ctx.totalContentLength,
                ctx.sourceFormat || FORMATS.OPENAI
              );
            }

            if (hasValidUsage(ctx.usage)) {
              logUsage(ctx.provider, ctx.usage, ctx.model, ctx.connectionId, ctx.apiKeyInfo);
            } else {
              appendRequestLog({
                model: ctx.model,
                provider: ctx.provider,
                connectionId: ctx.connectionId,
                tokens: null,
                status: "200 OK",
              }).catch(() => {});
            }
            if (!ctx.doneSent) {
              await ctx.emitFinalSseMetadata(controller, ctx.usage);
              ctx.doneSent = true;
              if (ctx.shouldEmitDoneTerminator) {
                ctx.clientPayloadCollector.push({ done: true });
                const doneOutput = "data: [DONE]\n\n";
                ctx.reqLogger?.appendConvertedChunk?.(doneOutput);
                controller.enqueue(ctx.encoder.encode(doneOutput));
              }
            }
            // Notify caller for call log persistence (include full response ctx.body with accumulated content)
            if (ctx.onComplete) {
              try {
                const u = ctx.usage as Record<string, unknown> | null;
                const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
                const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
                let content = ctx.passthroughAccumulatedContent.trim() || "";
                const finalBufferedTextualToolCall =
                  ctx.passthroughBufferedTextualToolCallContent.trim();
                if (finalBufferedTextualToolCall) {
                  if (
                    collectPassthroughTextualToolCall(
                      finalBufferedTextualToolCall,
                      ctx.passthroughToolCalls,
                      ctx.allowedToolNames
                    )
                  ) {
                    ctx.passthroughHasToolCalls = true;
                  }
                  ctx.passthroughBufferedTextualToolCallContent = "";
                }
                if (
                  content &&
                  collectPassthroughTextualToolCall(
                    content,
                    ctx.passthroughToolCalls,
                    ctx.allowedToolNames
                  )
                ) {
                  ctx.passthroughHasToolCalls = true;
                  content = "";
                } else if (containsMalformedTextualToolCall(content, ctx.allowedToolNames)) {
                  content = "";
                }
                const message: Record<string, unknown> = {
                  role: "assistant",
                  content: content || null,
                };
                const reasoning = ctx.passthroughAccumulatedReasoning.trim();
                if (reasoning) {
                  message.reasoning_content = reasoning;
                }
                if (ctx.passthroughToolCalls.size > 0) {
                  message.tool_calls = [...ctx.passthroughToolCalls.values()].sort(
                    (a, b) => a.index - b.index
                  );
                }
                // Hardening: log empty assistant response after tool completion
                // for observability — helps diagnose Copilot "Sorry, no response was returned"
                if (ctx.passthroughHasToolCalls && !content.trim() && !reasoning.trim()) {
                  console.warn(
                    `[STREAM] Empty assistant response after tool_calls completion (${ctx.provider || "provider"}:${ctx.model || "unknown"}) — ctx.sessionId=${ctx.sessionId}`
                  );
                }

                const responseBody = {
                  choices: [
                    {
                      message,
                      finish_reason: ctx.passthroughHasToolCalls ? "tool_calls" : "stop",
                    },
                  ],
                  usage: {
                    prompt_tokens: prompt,
                    completion_tokens: completion,
                    total_tokens: prompt + completion,
                  },
                  _streamed: true,
                };
                ctx.onComplete({
                  status: 200,
                  usage: ctx.usage,
                  responseBody,
                  providerPayload: ctx.providerPayloadCollector.build(
                    buildStreamSummaryFromEvents(
                      ctx.providerPayloadCollector.getEvents(),
                      ctx.sourceFormat,
                      ctx.model
                    ),
                    { includeEvents: false }
                  ),
                  clientPayload: ctx.clientPayloadCollector.build(responseBody, {
                    includeEvents: false,
                  }),
                });
              } catch (err) {
                console.error("[STREAM] Error in onComplete callback:", err);
              }
            }
            return;
          }

          // Translate ctx.mode: process remaining ctx.buffer
          if (ctx.buffer.trim()) {
            const parsed = parseSSELine(ctx.buffer.trim());
            if (parsed && !parsed.done) {
              ctx.providerPayloadCollector.push(parsed);
              // Extract ctx.usage from remaining ctx.buffer — if the ctx.usage-bearing event
              // (e.g. response.completed) is the last SSE line, it ends up here
              // in the flush handler where extractUsage was not called.
              // Non-destructive merge: some providers send ctx.usage across multiple
              // events (e.g. prompt_tokens in message_start, completion_tokens
              // in message_delta). Direct assignment would lose earlier data.
              const extracted = extractUsage(parsed);
              if (extracted) {
                if (!ctx.state.usage) {
                  ctx.state.usage = extracted;
                } else {
                  const su = ctx.state.usage as Record<string, number>;
                  const eu = extracted as Record<string, number>;
                  if (eu.prompt_tokens > 0) su.prompt_tokens = eu.prompt_tokens;
                  if (eu.completion_tokens > 0) su.completion_tokens = eu.completion_tokens;
                  if (eu.total_tokens > 0) su.total_tokens = eu.total_tokens;
                  if (eu.cache_read_input_tokens > 0)
                    su.cache_read_input_tokens = eu.cache_read_input_tokens;
                  if (eu.cache_creation_input_tokens > 0)
                    su.cache_creation_input_tokens = eu.cache_creation_input_tokens;
                  if (eu.cached_tokens > 0) su.cached_tokens = eu.cached_tokens;
                  if (eu.reasoning_tokens > 0) su.reasoning_tokens = eu.reasoning_tokens;
                }
              }

              const translated = translateResponse(
                ctx.targetFormat,
                ctx.sourceFormat,
                parsed,
                ctx.state
              );

              // Log OpenAI intermediate chunks
              for (const item of getOpenAIIntermediateChunks(translated)) {
                const openaiOutput = formatSSE(item, FORMATS.OPENAI);
                ctx.reqLogger?.appendOpenAIChunk?.(openaiOutput);
              }

              if (translated?.length > 0) {
                for (const item of translated) {
                  ctx.emitTranslatedClientItem(controller, item);
                }
              }
            }
          }

          if (ctx.state?.upstreamError) {
            const err = ctx.state.upstreamError;
            trackPendingRequest(ctx.model, ctx.provider, ctx.connectionId, false);
            if (ctx.onFailure) {
              Promise.resolve(
                ctx.onFailure({
                  status: err.status,
                  message: err.message,
                  code: err.code,
                  type: err.type,
                })
              ).catch((err) => {
                console.error("[STREAM] Error in onFailure callback:", err);
              });
            }

            const errorBody = buildErrorBody(err.status, err.message);
            if (ctx.onComplete) {
              try {
                ctx.onComplete({
                  status: err.status,
                  usage: ctx.state?.usage,
                  responseBody: errorBody,
                  providerPayload: ctx.providerPayloadCollector.build(
                    buildStreamSummaryFromEvents(
                      ctx.providerPayloadCollector.getEvents(),
                      ctx.targetFormat,
                      ctx.model
                    ),
                    { includeEvents: false }
                  ),
                  clientPayload: ctx.clientPayloadCollector.build(errorBody, {
                    includeEvents: false,
                  }),
                });
              } catch {}
            }

            ctx.clearIdleTimer();
            controller.error(
              markPendingRequestCleared(new Error(err.message || "Upstream failure"))
            );
            return;
          }

          // Flush remaining events (only once at stream end)
          const flushed = translateResponse(ctx.targetFormat, ctx.sourceFormat, null, ctx.state);

          // Log OpenAI intermediate chunks for flushed events
          for (const item of getOpenAIIntermediateChunks(flushed)) {
            const openaiOutput = formatSSE(item, FORMATS.OPENAI);
            ctx.reqLogger?.appendOpenAIChunk?.(openaiOutput);
          }

          if (flushed?.length > 0) {
            for (const item of flushed) {
              ctx.emitTranslatedClientItem(controller, item);
            }
          }

          if (ctx.sourceFormat === FORMATS.CLAUDE) {
            if (shouldInjectClaudeEmptyResponseOnFlush(ctx.claudeEmptyResponseLifecycle)) {
              ctx.emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: true,
                includeMessageDelta: !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !ctx.claudeEmptyResponseLifecycle.hasMessageStop,
              });
            } else if (
              shouldInjectClaudeMissingFinalizersOnFlush(ctx.claudeEmptyResponseLifecycle)
            ) {
              ctx.emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: false,
                includeMessageDelta: !ctx.claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !ctx.claudeEmptyResponseLifecycle.hasMessageStop,
              });
            }
          }

          /**
           * Usage injection strategy:
           * Usage data (input/output tokens) is injected into the last content chunk
           * or the finish_reason chunk rather than sent as a separate SSE event.
           * This ensures all major clients (Claude CLI, Continue, Cursor) receive
           * ctx.usage data even if they stop reading after the finish signal.
           * The ctx.usage ctx.buffer (state.usage) accumulates across chunks and is only
           * emitted once at stream end when merged into the final translated chunk.
           */

          // Send [DONE] (only if not already sent during transform)
          if (!ctx.doneSent) {
            await ctx.emitFinalSseMetadata(
              controller,
              ctx.state?.usage as Record<string, unknown> | null
            );
            ctx.doneSent = true;
            if (ctx.shouldEmitDoneTerminator) {
              ctx.clientPayloadCollector.push({ done: true });
              const doneOutput = "data: [DONE]\n\n";
              ctx.reqLogger?.appendConvertedChunk?.(doneOutput);
              controller.enqueue(ctx.encoder.encode(doneOutput));
            }
          }

          // Estimate ctx.usage if ctx.provider didn't return valid ctx.usage (for translate ctx.mode)
          if (!hasValidUsage(ctx.state?.usage) && ctx.totalContentLength > 0) {
            ctx.state.usage = estimateUsage(ctx.body, ctx.totalContentLength, ctx.sourceFormat);
          }

          if (hasValidUsage(ctx.state?.usage)) {
            logUsage(
              ctx.state?.provider || ctx.targetFormat,
              ctx.state.usage,
              ctx.model,
              ctx.connectionId,
              ctx.apiKeyInfo
            );
          } else {
            appendRequestLog({
              model: ctx.model,
              provider: ctx.provider,
              connectionId: ctx.connectionId,
              tokens: null,
              status: "200 OK",
            }).catch(() => {});
          }
          // Notify caller for call log persistence (include full response ctx.body with accumulated content)
          if (ctx.onComplete) {
            try {
              const u = ctx.state?.usage as Record<string, unknown> | null | undefined;
              const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
              const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
              let content = (ctx.state?.accumulatedContent ?? "").trim() || "";
              const normalizedToolCalls: ToolCall[] = ctx.state?.toolCalls?.size
                ? [...ctx.state.toolCalls.values()]
                    .map(
                      (tc: Record<string, unknown>): ToolCall => ({
                        id: tc.id != null ? String(tc.id) : null,
                        index: (tc.index as number) ?? (tc.blockIndex as number) ?? 0,
                        type: (tc.type as string) ?? "function",
                        function: (tc.function as ToolCall["function"]) ?? {
                          name: (tc.name as string) ?? "",
                          arguments: "",
                        },
                      })
                    )
                    .sort((a, b) => a.index - b.index)
                : [];
              const textualToolCall = parseTextualToolCallFromContent(content);
              if (textualToolCall) {
                normalizedToolCalls.push({
                  id: `call_${Date.now()}_${normalizedToolCalls.length}`,
                  index: normalizedToolCalls.length,
                  type: "function",
                  function: {
                    name: textualToolCall.name,
                    arguments: JSON.stringify(textualToolCall.args || {}),
                  },
                });
                content = "";
              } else if (containsMalformedTextualToolCall(content, ctx.allowedToolNames)) {
                content = "";
              }
              const message: Record<string, unknown> = {
                role: "assistant",
                content: content || null,
              };
              const hasToolCalls = normalizedToolCalls.length > 0;
              if (hasToolCalls) {
                message.tool_calls = normalizedToolCalls;
              }
              const responseBody = {
                choices: [
                  {
                    message,
                    finish_reason: hasToolCalls ? "tool_calls" : "stop",
                  },
                ],
                usage: {
                  prompt_tokens: prompt,
                  completion_tokens: completion,
                  total_tokens: prompt + completion,
                },
                _streamed: true,
              };
              ctx.onComplete({
                status: 200,
                usage: ctx.state?.usage,
                responseBody,
                providerPayload: ctx.providerPayloadCollector.build(
                  buildStreamSummaryFromEvents(
                    ctx.providerPayloadCollector.getEvents(),
                    ctx.targetFormat,
                    ctx.model
                  ),
                  { includeEvents: false }
                ),
                clientPayload: ctx.clientPayloadCollector.build(responseBody, {
                  includeEvents: false,
                }),
              });
            } catch (err) {
              console.error("[STREAM] Error in onComplete callback:", err);
            }
          }
        } catch (error) {
          console.log(
            `[STREAM] Error in flush (${ctx.model || "unknown"}):`,
            error.message || error
          );
        }
      },
      cancel(reason) {
        ctx.clearIdleTimer();
      },
    },
    { highWaterMark: 16384 },
    { highWaterMark: 16384 }
  );
}

// Convenience functions for backward compatibility
export function createSSETransformStreamWithLogger(
  targetFormat: string,
  sourceFormat: string,
  provider: string | null = null,
  reqLogger: StreamLogger | null = null,
  toolNameMap: unknown = null,
  model: string | null = null,
  connectionId: string | null = null,
  body: unknown = null,
  onComplete: ((payload: StreamCompletePayload) => void) | null = null,
  apiKeyInfo: unknown = null,
  onFailure: ((payload: StreamFailurePayload) => void | Promise<void>) | null = null,
  copilotCompatibleReasoning = false
) {
  return createSSEStream({
    mode: STREAM_MODE.TRANSLATE,
    targetFormat,
    sourceFormat,
    provider,
    reqLogger,
    toolNameMap,
    model,
    connectionId,
    apiKeyInfo,
    body,
    onComplete,
    onFailure,
    copilotCompatibleReasoning,
  });
}

export function createPassthroughStreamWithLogger(
  provider: string | null = null,
  reqLogger: StreamLogger | null = null,
  toolNameMap: unknown = null,
  model: string | null = null,
  connectionId: string | null = null,
  body: unknown = null,
  onComplete: ((payload: StreamCompletePayload) => void) | null = null,
  apiKeyInfo: unknown = null,
  onFailure: ((payload: StreamFailurePayload) => void | Promise<void>) | null = null,
  clientResponseFormat: string | null = null
) {
  return createSSEStream({
    mode: STREAM_MODE.PASSTHROUGH,
    provider,
    reqLogger,
    toolNameMap,
    model,
    connectionId,
    apiKeyInfo,
    body,
    onComplete,
    onFailure,
    clientResponseFormat,
  });
}
