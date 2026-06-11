import { convertOpenAIToResponsesToolCall } from "../handlers/responseTranslator.ts";
import { v4 as uuidv4 } from "uuid";

import { parseTextualToolCallFromContent, containsTextualToolCallCandidate, containsMalformedTextualToolCall, extractAllowedToolNames, collectPassthroughTextualToolCall } from "./textualToolCalls.ts";
import { getOpenAIIntermediateChunks } from "./openaiChunks.ts";
import { SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT, createClaudeEmptyResponseLifecycle, getClaudeEventType, isClaudeEventPayload, updateClaudeEmptyResponseLifecycle, shouldInjectClaudeEmptyResponseBeforeCurrentEvent, shouldInjectClaudeEmptyResponseOnFlush, shouldInjectClaudeMissingFinalizersOnFlush, buildSyntheticClaudeEmptyResponseEvents, restoreClaudePassthroughToolUseName } from "./claudeLifecycle.ts";
import { normalizeResponsesSseIds, markPendingRequestCleared, pushUniqueResponsesOutputItems, backfillResponsesCompletedOutput, stripResponsesLifecycleEcho } from "./responsesLifecycle.ts";
import { buildResponsesFunctionCallEvents, formatSSEDataEvents, toChatCompletionChunkWithToolCall, toResponsesCompletedWithToolCalls } from "./sseFormatters.ts";
import { stringifyIdValue, asRecord, appendBoundedText, STREAM_MODE } from "./utils.ts";
import { JsonRecord, StreamLogger, StreamCompletePayload, StreamFailurePayload, StreamOptions, TranslateState, ToolCall, UsageTokenRecord } from "./types.ts";
import { normalizeStreamFailurePayload } from "./errors.ts";

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
  const {
    mode = STREAM_MODE.TRANSLATE,
    targetFormat,
    sourceFormat,
    clientResponseFormat = null,
    copilotCompatibleReasoning = false,
    provider = null,
    reqLogger = null,
    toolNameMap = null,
    model = null,
    connectionId = null,
    apiKeyInfo = null,
    body = null,
    onComplete = null,
    onFailure = null,
  } = options;
  const signatureNamespace = connectionId;

  const clientExpectsResponsesStream =
    (mode === STREAM_MODE.PASSTHROUGH
      ? clientResponseFormat === FORMATS.OPENAI_RESPONSES
      : sourceFormat === FORMATS.OPENAI_RESPONSES) === true;

  // Clients whose SSE protocol terminates naturally on the last
  // provider-shape event (not on a `data: [DONE]` line). Emitting
  // `[DONE]` to these clients produces a parser error in the SDK and
  // breaks follow-up turns (Capy/Anthropic SDK: text gets stuck in the
  // "Thought" area; subsequent /v1/messages calls retry into a corrupt
  // state). Skip the `[DONE]` for these formats.
  const clientExpectsClaudeStream =
    (mode === STREAM_MODE.PASSTHROUGH
      ? clientResponseFormat === FORMATS.CLAUDE
      : sourceFormat === FORMATS.CLAUDE) === true;

  // Single source of truth for the [DONE] decision, used at both emission
  // sites below. Only OpenAI Chat Completions clients expect [DONE];
  // Responses API and Anthropic SSE terminate on their own protocol events
  // (response.completed / message_stop respectively).
  const shouldEmitDoneTerminator = !clientExpectsResponsesStream && !clientExpectsClaudeStream;

  let buffer = "";
  let usage: UsageTokenRecord | null = null;
  /** Passthrough (OpenAI CC shape): saw tool_calls in stream before finish_reason */
  let passthroughHasToolCalls = false;
  /** Passthrough: accumulate tool_calls deltas for call log responseBody */
  const passthroughToolCalls = new Map<string, ToolCall>();
  let passthroughToolCallSeq = 0;
  const allowedToolNames = extractAllowedToolNames(body);
  let skipPassthroughEvent = false;

  // State for translate mode (accumulatedContent for call log response body)
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

  // Track content length for usage estimation (both modes)
  let totalContentLength = 0;
  // Passthrough: accumulate content and reasoning separately for call log response body
  let passthroughAccumulatedContent = "";
  let passthroughAccumulatedReasoning = "";
  let passthroughBufferedTextualToolCallContent = "";
  // Passthrough Responses SSE: snapshots of items seen via `response.output_item.done`,
  // used to backfill `response.completed.response.output` when upstream returns it
  // empty (which happens when `store: false` — see backfillResponsesCompletedOutput).
  const passthroughResponsesOutputItems: unknown[] = [];
  const passthroughResponsesPendingFunctionCalls = new Map<string, JsonRecord>();
  let passthroughResponsesId: string | null = null;
  let passthroughResponsesCurrentFunctionCallKey: string | null = null;
  const passthroughResponsesReasoningSummarySeen = new Set<string>();
  const streamStartedAt = Date.now();

  let lastToolCallChunkTime: number | null = null;
  let toolFinishTime: number | null = null;
  let contentAfterToolSeen = false;

  // Cross-request tool latency: fingerprint the session from the request body
  // so Request 2 can pick up the tool-finish timestamp left by Request 1.
  const sessionId = generateSessionId(body as Parameters<typeof generateSessionId>[0], {
    provider: provider ?? undefined,
    connectionId: connectionId ?? undefined,
  });
  let pendingToolFinishTime: number | null = null;
  try {
    pendingToolFinishTime = consumeToolFinishTime(sessionId);
  } catch {}

  // Guard against duplicate [DONE] events — ensures exactly one per stream
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

  // Per-stream instances to avoid shared state with concurrent streams
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  // Idle timeout state — closes stream if provider stops sending data
  let lastChunkTime = Date.now();
  let idleTimer: ReturnType<typeof setInterval> | null = null;
  let streamTimedOut = false;
  const claudeEmptyResponseLifecycle = createClaudeEmptyResponseLifecycle();
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
    const isResponsesEvent = typeof item?.event === "string" && item.event.startsWith("response.");
    if (sourceFormat === FORMATS.OPENAI && !isResponsesEvent) {
      itemSanitized = sanitizeStreamingChunk(itemSanitized) as Record<string, unknown>;

      const delta = itemSanitized?.choices?.[0]?.delta;
      if (delta?.content && typeof delta.content === "string") {
        const { content, thinking } = extractThinkingFromContent(delta.content);
        delta.content = content;
        if (thinking && !delta.reasoning_content) {
          delta.reasoning_content = thinking;
        }
      }
    }

    if (!hasValuableContent(itemSanitized, sourceFormat)) {
      return;
    }

    const isFinishChunk =
      itemSanitized.type === "message_delta" || itemSanitized.choices?.[0]?.finish_reason;
    if (
      state?.finishReason &&
      isFinishChunk &&
      !hasValidUsage(itemSanitized.usage) &&
      totalContentLength > 0
    ) {
      const estimated = estimateUsage(body, totalContentLength, sourceFormat);
      itemSanitized.usage = filterUsageForFormat(estimated, sourceFormat);
      state.usage = estimated;
    } else if (state?.finishReason && isFinishChunk && state.usage) {
      const buffered = addBufferToUsage(state.usage);
      itemSanitized.usage = filterUsageForFormat(buffered, sourceFormat);
    }

    if (
      sourceFormat === FORMATS.CLAUDE &&
      shouldInjectClaudeEmptyResponseBeforeCurrentEvent(claudeEmptyResponseLifecycle, itemSanitized)
    ) {
      const eventType = getClaudeEventType(itemSanitized);
      emitSyntheticClaudeEmptyResponse(controller, {
        includeContentBlock: true,
        includeMessageDelta:
          eventType === "message_stop" && !claudeEmptyResponseLifecycle.hasMessageDelta,
        includeMessageStop: false,
      });
    }

    if (sourceFormat === FORMATS.CLAUDE && isClaudeEventPayload(itemSanitized)) {
      updateClaudeEmptyResponseLifecycle(claudeEmptyResponseLifecycle, itemSanitized);
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

  const getResponsesReasoningKey = (payload: Record<string, unknown>): string | null => {
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
  };

  const getResponsesReasoningSummaryText = (item: Record<string, unknown>): string => {
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
  };

  const ensureVisibleResponsesReasoningSummary = (payload: Record<string, unknown>): boolean => {
    const item =
      payload.item && typeof payload.item === "object" && !Array.isArray(payload.item)
        ? (payload.item as Record<string, unknown>)
        : null;
    if (!item || item.type !== "reasoning") {
      return false;
    }

    if (getResponsesReasoningSummaryText(item)) {
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
  };

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

    const itemId = typeof item.id === "string" && item.id ? item.id : reasoningKey;
    const outputIndex =
      typeof payload.output_index === "number" && Number.isInteger(payload.output_index)
        ? payload.output_index
        : 0;

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

  return new TransformStream(
    {
      start(controller) {
        // Start idle watchdog — checks every 10s if provider has stopped sending
        if (STREAM_IDLE_TIMEOUT_MS > 0) {
          idleTimer = setInterval(() => {
            if (!streamTimedOut && Date.now() - lastChunkTime > STREAM_IDLE_TIMEOUT_MS) {
              streamTimedOut = true;
              clearIdleTimer();
              const timeoutMsg = `[STREAM] Idle timeout: no data from ${provider || "provider"} for ${STREAM_IDLE_TIMEOUT_MS}ms (model: ${model || "unknown"})`;
              console.warn(timeoutMsg);
              trackPendingRequest(model, provider, connectionId, false);
              appendRequestLog({
                model,
                provider,
                connectionId,
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
        if (streamTimedOut) return;
        lastChunkTime = Date.now();
        const text = decoder.decode(chunk, { stream: true });
        buffer += text;
        reqLogger?.appendProviderChunk?.(text);

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          // Passthrough mode: normalize and forward
          if (mode === STREAM_MODE.PASSTHROUGH) {
            let output: string;
            let injectedUsage = false;
            let clientPayload: unknown = null;
            let failurePayload: StreamFailurePayload | null = null;

            if (skipPassthroughEvent) {
              if (!trimmed) {
                skipPassthroughEvent = false;
                clearPendingPassthroughEvent();
              }
              continue;
            }

            // Drop whole keepalive event blocks — strict OpenAI-compatible SDKs
            // try to JSON.parse empty keepalive payloads and crash.
            if (/^event:\s*keepalive\b/i.test(trimmed)) {
              skipPassthroughEvent = true;
              clearPendingPassthroughEvent();
              continue;
            }

            if (/^event:/i.test(trimmed)) {
              if (pendingPassthroughEventLine && !pendingPassthroughEventEmitted) {
                const pendingOutput = `${pendingPassthroughEventLine}\n`;
                reqLogger?.appendConvertedChunk?.(pendingOutput);
                controller.enqueue(encoder.encode(pendingOutput));
              }

              const eventType = trimmed.replace(/^event:\s*/i, "");
              if (
                shouldInjectClaudeEmptyResponseBeforeCurrentEvent(claudeEmptyResponseLifecycle, {
                  type: eventType,
                })
              ) {
                emitSyntheticClaudeEmptyResponse(controller, {
                  includeContentBlock: true,
                  includeMessageDelta:
                    eventType === "message_stop" && !claudeEmptyResponseLifecycle.hasMessageDelta,
                  includeMessageStop: false,
                });
              }

              pendingPassthroughEventLine = line;
              pendingPassthroughEventEmitted = false;
              continue;
            }

            if (trimmed.startsWith("data:")) {
              const providerPayload = parseSSELine(trimmed);
              if (providerPayload) {
                providerPayloadCollector.push(providerPayload);
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
                  if (Array.isArray(value)) return value.some((entry) => hasActiveDeltaValue(entry));
                  if (value && typeof value === "object") {
                    return Object.values(value).some((entry) => hasActiveDeltaValue(entry));
                  }
                  return value !== null && value !== undefined;
                };

                const isEmptyAssistantBootstrapChunkForResponsesClient =
                  clientExpectsResponsesStream &&
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
                    passthroughResponsesId = responseId;
                  }
                  // Responses SSE: only extract usage, forward payload as-is
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    usage = extracted;
                  }
                  // Keep generic Responses deltas for fallback usage estimates,
                  // but only visible text deltas may become assistant content in
                  // logs/replay payloads.
                  if (typeof parsed.delta === "string") {
                    totalContentLength += parsed.delta.length;
                  }
                  if (
                    parsed.type === "response.output_text.delta" &&
                    typeof parsed.delta === "string"
                  ) {
                    const incomingDelta = parsed.delta;
                    const bufferedCandidate =
                      passthroughBufferedTextualToolCallContent + incomingDelta;
                    if (
                      passthroughBufferedTextualToolCallContent ||
                      containsTextualToolCallCandidate(incomingDelta)
                    ) {
                      const parsedCandidate = parseTextualToolCallCandidate(bufferedCandidate);
                      if (parsedCandidate?.kind === "complete") {
                        const collectedToolCall = collectPassthroughTextualToolCall(
                          bufferedCandidate,
                          passthroughToolCalls,
                          allowedToolNames
                        );
                        if (collectedToolCall) {
                          passthroughHasToolCalls = true;
                          const responseToolCallEvents =
                            buildResponsesFunctionCallEvents(collectedToolCall);
                          output = formatSSEDataEvents(responseToolCallEvents);
                          clientPayloadCollector.push(...responseToolCallEvents);
                          reqLogger?.appendConvertedChunk?.(output);
                          controller.enqueue(encoder.encode(output));
                          injectedUsage = true;
                        } else {
                          output = `data: ${JSON.stringify(parsed)}
`;
                          injectedUsage = true;
                        }
                        passthroughBufferedTextualToolCallContent = "";
                        parsed.delta = "";
                      } else if (parsedCandidate?.kind === "partial") {
                        passthroughBufferedTextualToolCallContent = appendBoundedText(
                          passthroughBufferedTextualToolCallContent,
                          incomingDelta
                        );
                        parsed.delta = "";
                        output = `data: ${JSON.stringify(parsed)}\n`;
                        injectedUsage = true;
                      } else {
                        if (passthroughBufferedTextualToolCallContent) {
                          parsed.delta = passthroughBufferedTextualToolCallContent + incomingDelta;
                          output = `data: ${JSON.stringify(parsed)}\n`;
                          injectedUsage = true;
                        }
                        passthroughAccumulatedContent = appendBoundedText(
                          passthroughAccumulatedContent,
                          passthroughBufferedTextualToolCallContent + incomingDelta
                        );
                        passthroughBufferedTextualToolCallContent = "";
                      }
                    } else {
                      passthroughAccumulatedContent = appendBoundedText(
                        passthroughAccumulatedContent,
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
                    const reasoningKey = getResponsesReasoningKey(parsed);
                    if (reasoningKey) {
                      passthroughResponsesReasoningSummarySeen.add(reasoningKey);
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
                      passthroughResponsesPendingFunctionCalls.set(pendingKey, item);
                      passthroughResponsesCurrentFunctionCallKey = pendingKey;
                    }
                  }
                  if (parsed.type === "response.function_call_arguments.delta") {
                    const pendingKey =
                      typeof parsed.item_id === "string"
                        ? parsed.item_id
                        : passthroughResponsesCurrentFunctionCallKey;
                    const pending = pendingKey
                      ? passthroughResponsesPendingFunctionCalls.get(pendingKey)
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
                        : passthroughResponsesCurrentFunctionCallKey;
                    const pending = pendingKey
                      ? passthroughResponsesPendingFunctionCalls.get(pendingKey)
                      : undefined;
                    if (pending) {
                      if (typeof parsed.arguments === "string") {
                        pending.arguments = parsed.arguments;
                      }
                      pushUniqueResponsesOutputItems(passthroughResponsesOutputItems, [pending]);
                    }
                  }
                  // Capture each completed output item so the final
                  // response.completed snapshot can be backfilled when upstream
                  // returns an empty `output` (happens with store: false).
                  if (parsed.type === "response.output_item.done" && parsed.item) {
                    const reasoningSummaryInjected = ensureVisibleResponsesReasoningSummary(parsed);
                    emitSyntheticResponsesReasoningSummary(controller, parsed);
                    pushUniqueResponsesOutputItems(passthroughResponsesOutputItems, [parsed.item]);
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
                        passthroughResponsesPendingFunctionCalls.delete(pendingKey);
                        if (passthroughResponsesCurrentFunctionCallKey === pendingKey) {
                          passthroughResponsesCurrentFunctionCallKey = null;
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
                      passthroughResponsesOutputItems,
                      parsed.response.output
                    );
                  }
                  if (
                    parsed.type === "response.completed" &&
                    passthroughResponsesPendingFunctionCalls.size > 0
                  ) {
                    pushUniqueResponsesOutputItems(passthroughResponsesOutputItems, [
                      ...passthroughResponsesPendingFunctionCalls.values(),
                    ]);
                    passthroughResponsesPendingFunctionCalls.clear();
                    passthroughResponsesCurrentFunctionCallKey = null;
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
                    parsed.type === "response.completed" && passthroughToolCalls.size > 0;
                  if (textualToolCallBackfilled) {
                    parsed = toResponsesCompletedWithToolCalls(parsed as JsonRecord, [
                      ...passthroughToolCalls.values(),
                    ]) as typeof parsed;
                  }
                  const stripped = stripResponsesLifecycleEcho(parsed);
                  const backfilled = backfillResponsesCompletedOutput(
                    parsed,
                    passthroughResponsesOutputItems
                  );
                  if (stripped || backfilled || textualToolCallBackfilled || responsesIdsNormalized) {
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  }
                } else if (isClaudeSSE) {
                  // Claude SSE: extract usage, track content, forward as-is
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    // Non-destructive merge: never overwrite a positive value with 0
                    // message_start carries input_tokens, message_delta carries output_tokens;
                    if (!usage) usage = {};
                    const u = usage;
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
                      claudeEmptyResponseLifecycle,
                      parsed
                    )
                  ) {
                    emitSyntheticClaudeEmptyResponse(controller, {
                      includeContentBlock: true,
                      includeMessageDelta:
                        parsed.type === "message_stop" &&
                        !claudeEmptyResponseLifecycle.hasMessageDelta,
                      includeMessageStop: false,
                    });
                  }
                  updateClaudeEmptyResponseLifecycle(claudeEmptyResponseLifecycle, parsed);
                  const restoredToolName = restoreClaudePassthroughToolUseName(parsed, toolNameMap);
                  // Track content length and accumulate from Claude format
                  if (parsed.delta?.text) {
                    totalContentLength += parsed.delta.text.length;
                    passthroughAccumulatedContent = appendBoundedText(
                      passthroughAccumulatedContent,
                      parsed.delta.text
                    );
                  }
                  if (parsed.delta?.thinking) {
                    totalContentLength += parsed.delta.thinking.length;
                    passthroughAccumulatedContent = appendBoundedText(
                      passthroughAccumulatedContent,
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
                  // ends with a usage-only chunk where `choices` is deliberately `[]`.
                  // Forward that standards-compliant chunk instead of turning it into an
                  // empty-response error.
                  //
                  // For a malformed empty `choices: []` chunk WITHOUT valid usage we DROP
                  // it (log server-side only). We must NOT inject an assistant-content
                  // chunk like "[OmniRoute] Upstream returned an empty response. Please
                  // retry." with finish_reason: "stop" — clients (Goose/opencode) feed that
                  // text back as a turn and spin in a retry loop. This restores the #3400
                  // behavior that #3422 inadvertently reverted (regression #3388/#3502).
                  if (Array.isArray(parsed.choices) && parsed.choices.length === 0) {
                    const emptyChoicesUsage = extractUsage(parsed) ?? parsed.usage;
                    if (hasValidUsage(emptyChoicesUsage)) {
                      usage = emptyChoicesUsage;
                      output = `data: ${JSON.stringify(parsed)}\n`;
                      injectedUsage = true;
                      clientPayload = parsed;
                      clientPayloadCollector.push(clientPayload);
                      reqLogger?.appendConvertedChunk?.(output);
                      controller.enqueue(encoder.encode(output));
                      continue;
                    }

                    console.warn(
                      `[STREAM] Upstream returned empty choices array (${provider || "provider"}:${model || "unknown"}) — dropping chunk`
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
                    ? parsed.choices.some((choice) =>
                        Array.isArray(choice?.delta?.tool_calls) &&
                        choice.delta.tool_calls.some(
                          (tc) => tc?.id != null && typeof tc.id !== "string"
                        )
                      )
                    : false;
                  const hadNonStringTopLevelId = parsed?.id != null && typeof parsed.id !== "string";

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
                    passthroughAccumulatedReasoning = appendBoundedText(
                      passthroughAccumulatedReasoning,
                      delta.reasoning_content
                    );
                    totalContentLength += delta.reasoning_content.length;
                    clientPayloadCollector.push(reasoningChunk);
                    reqLogger?.appendConvertedChunk?.(rOutput);
                    controller.enqueue(encoder.encode(rOutput));
                    controller.enqueue(encoder.encode("\n"));
                    delete delta.reasoning_content;
                  }

                  // Track whether we need to re-serialize (separate from injectedUsage
                  // to avoid blocking subsequent finish_reason / usage mutations)
                  const needsReserialization =
                    hadReasoningAlias || (delta?.content === "" && delta?.reasoning_content);

                  // T18: Track if we saw tool calls & accumulate for call log
                  if (delta?.tool_calls && delta.tool_calls.length > 0) {
                    passthroughHasToolCalls = true;
                    lastToolCallChunkTime = Date.now();
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
                        key = `seq:${++passthroughToolCallSeq}`;
                      }
                      const existing = passthroughToolCalls.get(key);
                      const deltaArgs =
                        typeof tc?.function?.arguments === "string" ? tc.function.arguments : "";
                      if (!existing) {
                        passthroughToolCalls.set(key, {
                          id: tc?.id != null ? String(tc.id) : null,
                          index: Number.isInteger(tc?.index) ? tc.index : passthroughToolCalls.size,
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
                    totalContentLength += content.length;

                    if (!contentAfterToolSeen) {
                      const toolTs = toolFinishTime || pendingToolFinishTime;
                      const lastChunkTs = lastToolCallChunkTime;
                      if (toolTs || lastChunkTs) {
                        contentAfterToolSeen = true;
                        const now = Date.now();
                        try {
                          recordToolLatency(
                            provider || "unknown",
                            toolTs ? now - toolTs : null,
                            lastChunkTs ? now - lastChunkTs : null
                          );
                        } catch {}
                        pendingToolFinishTime = null;
                      }
                    }
                  }
                  {
                    const guarded = applyTextualToolCallStreamingGuard(
                      parsed as Record<string, unknown>
                    );
                    parsed = guarded.parsed as typeof parsed;
                    textualToolCallConverted = guarded.textualToolCallConverted;
                  }
                  if (typeof delta?.reasoning_content === "string")
                    passthroughAccumulatedReasoning = appendBoundedText(
                      passthroughAccumulatedReasoning,
                      delta.reasoning_content
                    );

                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    usage = extracted;
                  }

                  const isFinishChunk = parsed.choices?.[0]?.finish_reason;

                  if (isFinishChunk && passthroughHasToolCalls) {
                    toolFinishTime = Date.now();
                    try {
                      markToolFinish(sessionId);
                    } catch {}
                  }

                  // T18: Normalize finish_reason to 'tool_calls' if tool calls were used
                  if (
                    isFinishChunk &&
                    passthroughHasToolCalls &&
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
                    !expectsOpenAIUsageOnlyChunk
                  ) {
                    const estimated = estimateUsage(body, totalContentLength, FORMATS.OPENAI);
                    parsed.usage = filterUsageForFormat(estimated, FORMATS.OPENAI);
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    usage = estimated;
                    injectedUsage = true;
                  } else if (isFinishChunk && usage) {
                    const buffered = addBufferToUsage(usage);
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

            if (!trimmed && pendingPassthroughEventLine && !pendingPassthroughEventEmitted) {
              output = `${pendingPassthroughEventLine}\n${output}`;
              pendingPassthroughEventEmitted = true;
            }

            output = maybePrefixPendingPassthroughEvent(output, line);

            if (clientPayload) {
              clientPayloadCollector.push(clientPayload);
            }

            reqLogger?.appendConvertedChunk?.(output);
            controller.enqueue(encoder.encode(output));
            if (failurePayload) {
              if (onFailure) {
                try {
                  void onFailure(failurePayload);
                } catch {}
              }
              clearIdleTimer();
              trackPendingRequest(model, provider, connectionId, false);
              controller.error(
                markPendingRequestCleared(new Error(failurePayload.message || "Upstream failure"))
              );
              return;
            }
            if (!trimmed) {
              clearPendingPassthroughEvent();
            }
            continue;
          }

          // Translate mode
          if (!trimmed) continue;

          if (state?.upstreamError) {
            continue;
          }

          const parsed = parseSSELine(trimmed);
          if (!parsed) continue;
          providerPayloadCollector.push(parsed);

          if (parsed && parsed.done) {
            continue;
          }

          if (parsed.choices?.[0]?.delta?.tool_calls) {
            lastToolCallChunkTime = Date.now();
          }
          if (parsed.choices?.[0]?.finish_reason === "tool_calls") {
            toolFinishTime = Date.now();
            try {
              markToolFinish(sessionId);
            } catch {}
          }

          // Track content length and accumulate for call log (from raw provider chunk, so content is never missed)
          // Do this before translation so we capture content regardless of translator output shape

          // Claude format
          if (parsed.delta?.text) {
            const t = parsed.delta.text;
            totalContentLength += t.length;
            if (state?.accumulatedContent !== undefined && typeof t === "string")
              state.accumulatedContent = appendBoundedText(state.accumulatedContent, t);
          }
          if (parsed.delta?.thinking) {
            const t = parsed.delta.thinking;
            totalContentLength += t.length;
            if (state?.accumulatedContent !== undefined && typeof t === "string")
              state.accumulatedContent = appendBoundedText(state.accumulatedContent, t);
          }

          // OpenAI format
          if (parsed.choices?.[0]?.delta?.content) {
            const c = parsed.choices[0].delta.content;
            if (typeof c === "string") {
              totalContentLength += c.length;
              if (state?.accumulatedContent !== undefined)
                state.accumulatedContent = appendBoundedText(state.accumulatedContent, c);
            } else if (Array.isArray(c)) {
              for (const part of c) {
                if (part?.text && typeof part.text === "string") {
                  totalContentLength += part.text.length;
                  if (state?.accumulatedContent !== undefined)
                    state.accumulatedContent = appendBoundedText(
                      state.accumulatedContent,
                      part.text
                    );
                }
              }
            }
          }
          if (parsed.choices?.[0]?.delta?.reasoning_content) {
            const r = parsed.choices[0].delta.reasoning_content;
            if (typeof r === "string") {
              totalContentLength += r.length;
              if (state?.accumulatedContent !== undefined)
                state.accumulatedContent = appendBoundedText(state.accumulatedContent, r);
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
              totalContentLength += r.length;
              if (state?.accumulatedContent !== undefined)
                state.accumulatedContent = appendBoundedText(state.accumulatedContent, r);
            }
          }

          // Gemini / Cloud Code format - may have multiple parts
          // Cloud Code API wraps in { response: { candidates: [...] } }, so unwrap.
          // Only applies to Gemini-family formats — skip for OpenAI, Claude, etc.
          const isGeminiFormat =
            targetFormat === FORMATS.GEMINI ||
            targetFormat === FORMATS.GEMINI_CLI ||
            targetFormat === FORMATS.ANTIGRAVITY;
          const geminiChunk = isGeminiFormat ? unwrapGeminiChunk(parsed) : parsed;
          if (geminiChunk.candidates?.[0]?.content?.parts) {
            for (const part of geminiChunk.candidates[0].content.parts) {
              if (part.text && typeof part.text === "string") {
                totalContentLength += part.text.length;
                if (state?.accumulatedContent !== undefined)
                  state.accumulatedContent = appendBoundedText(state.accumulatedContent, part.text);
              }
            }
          }

          // Generic fallback: delta string, top-level content/text (e.g. some SSE payloads)
          if (state?.accumulatedContent !== undefined) {
            if (typeof (parsed as JsonRecord).delta === "string") {
              const d = (parsed as JsonRecord).delta as string;
              state.accumulatedContent = appendBoundedText(state.accumulatedContent, d);
              totalContentLength += d.length;
            }
            if (typeof (parsed as JsonRecord).content === "string") {
              const c = (parsed as JsonRecord).content as string;
              state.accumulatedContent = appendBoundedText(state.accumulatedContent, c);
              totalContentLength += c.length;
            }
            if (typeof (parsed as JsonRecord).text === "string") {
              const t = (parsed as JsonRecord).text as string;
              state.accumulatedContent = appendBoundedText(state.accumulatedContent, t);
              totalContentLength += t.length;
            }
          }

          const translateHasContent =
            typeof parsed.delta?.text === "string" ||
            typeof parsed.choices?.[0]?.delta?.content === "string" ||
            typeof parsed.choices?.[0]?.delta?.reasoning_content === "string";
          if (translateHasContent && !contentAfterToolSeen) {
            const toolTs = toolFinishTime || pendingToolFinishTime;
            const lastChunkTs = lastToolCallChunkTime;
            if (toolTs || lastChunkTs) {
              contentAfterToolSeen = true;
              const now = Date.now();
              try {
                recordToolLatency(
                  provider || "unknown",
                  toolTs ? now - toolTs : null,
                  lastChunkTs ? now - lastChunkTs : null
                );
              } catch {}
              pendingToolFinishTime = null;
            }
          }

          // Extract usage
          const extracted = extractUsage(parsed);
          if (extracted) state.usage = extracted; // Keep original usage for logging

          // Translate: targetFormat -> openai -> sourceFormat
          const translated = translateResponse(targetFormat, sourceFormat, parsed, state);

          // Log OpenAI intermediate chunks (if available)
          for (const item of getOpenAIIntermediateChunks(translated)) {
            const openaiOutput = formatSSE(item, FORMATS.OPENAI);
            reqLogger?.appendOpenAIChunk?.(openaiOutput);
          }

          if (translated?.length > 0) {
            for (const item of translated) {
              emitTranslatedClientItem(controller, item);
            }
          }
        }
      },

      async flush(controller) {
        // Clean up idle watchdog timer
        if (idleTimer) {
          clearIdleTimer();
        }
        if (streamTimedOut) {
          return;
        }
        trackPendingRequest(model, provider, connectionId, false);
        try {
          const remaining = decoder.decode();
          if (remaining) buffer += remaining;

          if (mode === STREAM_MODE.PASSTHROUGH) {
            const bufferedLine = buffer.trim();
            if (skipPassthroughEvent || /^event:\s*keepalive\b/i.test(bufferedLine)) {
              skipPassthroughEvent = false;
              clearPendingPassthroughEvent();
            } else if (buffer) {
              let output = buffer;
              if (buffer.startsWith("data:") && !buffer.startsWith("data: ")) {
                output = "data: " + buffer.slice(5);
              }
              const bufferedPayload = parseSSELine(bufferedLine);
              if (bufferedPayload) {
                providerPayloadCollector.push(bufferedPayload);
                if (
                  shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
                    claudeEmptyResponseLifecycle,
                    bufferedPayload
                  )
                ) {
                  const eventType = getClaudeEventType(bufferedPayload);
                  emitSyntheticClaudeEmptyResponse(controller, {
                    includeContentBlock: true,
                    includeMessageDelta:
                      eventType === "message_stop" && !claudeEmptyResponseLifecycle.hasMessageDelta,
                    includeMessageStop: false,
                  });
                }
                if (isClaudeEventPayload(bufferedPayload)) {
                  updateClaudeEmptyResponseLifecycle(claudeEmptyResponseLifecycle, bufferedPayload);
                }
                clientPayloadCollector.push(bufferedPayload);

                // Normalize numeric IDs for final buffered data: chunk (same as transform path)
                if (typeof bufferedPayload === "object" && !Array.isArray(bufferedPayload)) {
                  const flushedParsed = bufferedPayload as JsonRecord;
                  const flushedType = typeof flushedParsed.type === "string" ? flushedParsed.type : "";
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
                        const tcs = (choice as JsonRecord | undefined)?.delta as JsonRecord | undefined;
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
              if (!bufferedLine && pendingPassthroughEventLine && !pendingPassthroughEventEmitted) {
                output = `${pendingPassthroughEventLine}\n${output}`;
                pendingPassthroughEventEmitted = true;
              }
              output = maybePrefixPendingPassthroughEvent(output, buffer);
              reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(encoder.encode(output));
            }

            if (shouldInjectClaudeEmptyResponseOnFlush(claudeEmptyResponseLifecycle)) {
              emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: true,
                includeMessageDelta: !claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !claudeEmptyResponseLifecycle.hasMessageStop,
              });
            } else if (shouldInjectClaudeMissingFinalizersOnFlush(claudeEmptyResponseLifecycle)) {
              emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: false,
                includeMessageDelta: !claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !claudeEmptyResponseLifecycle.hasMessageStop,
              });
            }
            clearPendingPassthroughEvent();

            if (passthroughBufferedTextualToolCallContent) {
              // Flush any remaining buffered content as plain text.
              // Previously gated on !includes("Arguments:"), which silently dropped
              // incomplete tool-call headers (buffer held "Arguments:" but JSON was
              // never finished before stream ended) — fix #3355 bug 2.
              let flushOutput = "";
              if (clientExpectsResponsesStream) {
                const syntheticChunk = {
                  type: "response.output_text.delta",
                  delta: passthroughBufferedTextualToolCallContent,
                };
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              } else if (clientExpectsClaudeStream) {
                const syntheticChunk = {
                  type: "content_block_delta",
                  index: 0,
                  delta: {
                    type: "text_delta",
                    text: passthroughBufferedTextualToolCallContent,
                  },
                };
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              } else {
                const syntheticChunk = {
                  id: passthroughResponsesId || `chatcmpl-${uuidv4()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model: model || "unknown",
                  choices: [
                    {
                      index: 0,
                      delta: {
                        content: passthroughBufferedTextualToolCallContent,
                      },
                      finish_reason: null,
                    },
                  ],
                };
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              }
              reqLogger?.appendConvertedChunk?.(flushOutput);
              controller.enqueue(encoder.encode(flushOutput));
              passthroughAccumulatedContent = appendBoundedText(
                passthroughAccumulatedContent,
                passthroughBufferedTextualToolCallContent
              );
              passthroughBufferedTextualToolCallContent = "";
            }

            // Estimate usage if provider didn't return valid usage
            if (!hasValidUsage(usage) && totalContentLength > 0) {
              usage = estimateUsage(body, totalContentLength, sourceFormat || FORMATS.OPENAI);
            }

            if (hasValidUsage(usage)) {
              logUsage(provider, usage, model, connectionId, apiKeyInfo);
            } else {
              appendRequestLog({
                model,
                provider,
                connectionId,
                tokens: null,
                status: "200 OK",
              }).catch(() => {});
            }
            if (!doneSent) {
              await emitFinalSseMetadata(controller, usage);
              doneSent = true;
              if (shouldEmitDoneTerminator) {
                clientPayloadCollector.push({ done: true });
                const doneOutput = "data: [DONE]\n\n";
                reqLogger?.appendConvertedChunk?.(doneOutput);
                controller.enqueue(encoder.encode(doneOutput));
              }
            }
            // Notify caller for call log persistence (include full response body with accumulated content)
            if (onComplete) {
              try {
                const u = usage as Record<string, unknown> | null;
                const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
                const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
                let content = passthroughAccumulatedContent.trim() || "";
                const finalBufferedTextualToolCall =
                  passthroughBufferedTextualToolCallContent.trim();
                if (finalBufferedTextualToolCall) {
                  if (
                    collectPassthroughTextualToolCall(
                      finalBufferedTextualToolCall,
                      passthroughToolCalls,
                      allowedToolNames
                    )
                  ) {
                    passthroughHasToolCalls = true;
                  }
                  passthroughBufferedTextualToolCallContent = "";
                }
                if (
                  content &&
                  collectPassthroughTextualToolCall(content, passthroughToolCalls, allowedToolNames)
                ) {
                  passthroughHasToolCalls = true;
                  content = "";
                } else if (containsMalformedTextualToolCall(content, allowedToolNames)) {
                  content = "";
                }
                const message: Record<string, unknown> = {
                  role: "assistant",
                  content: content || null,
                };
                const reasoning = passthroughAccumulatedReasoning.trim();
                if (reasoning) {
                  message.reasoning_content = reasoning;
                }
                if (passthroughToolCalls.size > 0) {
                  message.tool_calls = [...passthroughToolCalls.values()].sort(
                    (a, b) => a.index - b.index
                  );
                }
                // Hardening: log empty assistant response after tool completion
                // for observability — helps diagnose Copilot "Sorry, no response was returned"
                if (passthroughHasToolCalls && !content.trim() && !reasoning.trim()) {
                  console.warn(
                    `[STREAM] Empty assistant response after tool_calls completion (${provider || "provider"}:${model || "unknown"}) — sessionId=${sessionId}`
                  );
                }

                const responseBody = {
                  choices: [
                    {
                      message,
                      finish_reason: passthroughHasToolCalls ? "tool_calls" : "stop",
                    },
                  ],
                  usage: {
                    prompt_tokens: prompt,
                    completion_tokens: completion,
                    total_tokens: prompt + completion,
                  },
                  _streamed: true,
                };
                onComplete({
                  status: 200,
                  usage,
                  responseBody,
                  providerPayload: providerPayloadCollector.build(
                    buildStreamSummaryFromEvents(
                      providerPayloadCollector.getEvents(),
                      sourceFormat,
                      model
                    ),
                    { includeEvents: false }
                  ),
                  clientPayload: clientPayloadCollector.build(responseBody, {
                    includeEvents: false,
                  }),
                });
              } catch {}
            }
            return;
          }

          // Translate mode: process remaining buffer
          if (buffer.trim()) {
            const parsed = parseSSELine(buffer.trim());
            if (parsed && !parsed.done) {
              providerPayloadCollector.push(parsed);
              // Extract usage from remaining buffer — if the usage-bearing event
              // (e.g. response.completed) is the last SSE line, it ends up here
              // in the flush handler where extractUsage was not called.
              // Non-destructive merge: some providers send usage across multiple
              // events (e.g. prompt_tokens in message_start, completion_tokens
              // in message_delta). Direct assignment would lose earlier data.
              const extracted = extractUsage(parsed);
              if (extracted) {
                if (!state.usage) {
                  state.usage = extracted;
                } else {
                  const su = state.usage as Record<string, number>;
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

              const translated = translateResponse(targetFormat, sourceFormat, parsed, state);

              // Log OpenAI intermediate chunks
              for (const item of getOpenAIIntermediateChunks(translated)) {
                const openaiOutput = formatSSE(item, FORMATS.OPENAI);
                reqLogger?.appendOpenAIChunk?.(openaiOutput);
              }

              if (translated?.length > 0) {
                for (const item of translated) {
                  emitTranslatedClientItem(controller, item);
                }
              }
            }
          }

          if (state?.upstreamError) {
            const err = state.upstreamError;
            trackPendingRequest(model, provider, connectionId, false);
            if (onFailure) {
              try {
                void onFailure({
                  status: err.status,
                  message: err.message,
                  code: err.code,
                  type: err.type,
                });
              } catch {}
            }

            const errorBody = buildErrorBody(err.status, err.message);
            if (onComplete) {
              try {
                onComplete({
                  status: err.status,
                  usage: state?.usage,
                  responseBody: errorBody,
                  providerPayload: providerPayloadCollector.build(
                    buildStreamSummaryFromEvents(
                      providerPayloadCollector.getEvents(),
                      targetFormat,
                      model
                    ),
                    { includeEvents: false }
                  ),
                  clientPayload: clientPayloadCollector.build(errorBody, {
                    includeEvents: false,
                  }),
                });
              } catch {}
            }

            clearIdleTimer();
            controller.error(
              markPendingRequestCleared(new Error(err.message || "Upstream failure"))
            );
            return;
          }

          // Flush remaining events (only once at stream end)
          const flushed = translateResponse(targetFormat, sourceFormat, null, state);

          // Log OpenAI intermediate chunks for flushed events
          for (const item of getOpenAIIntermediateChunks(flushed)) {
            const openaiOutput = formatSSE(item, FORMATS.OPENAI);
            reqLogger?.appendOpenAIChunk?.(openaiOutput);
          }

          if (flushed?.length > 0) {
            for (const item of flushed) {
              emitTranslatedClientItem(controller, item);
            }
          }

          if (sourceFormat === FORMATS.CLAUDE) {
            if (shouldInjectClaudeEmptyResponseOnFlush(claudeEmptyResponseLifecycle)) {
              emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: true,
                includeMessageDelta: !claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !claudeEmptyResponseLifecycle.hasMessageStop,
              });
            } else if (shouldInjectClaudeMissingFinalizersOnFlush(claudeEmptyResponseLifecycle)) {
              emitSyntheticClaudeEmptyResponse(controller, {
                includeContentBlock: false,
                includeMessageDelta: !claudeEmptyResponseLifecycle.hasMessageDelta,
                includeMessageStop: !claudeEmptyResponseLifecycle.hasMessageStop,
              });
            }
          }

          /**
           * Usage injection strategy:
           * Usage data (input/output tokens) is injected into the last content chunk
           * or the finish_reason chunk rather than sent as a separate SSE event.
           * This ensures all major clients (Claude CLI, Continue, Cursor) receive
           * usage data even if they stop reading after the finish signal.
           * The usage buffer (state.usage) accumulates across chunks and is only
           * emitted once at stream end when merged into the final translated chunk.
           */

          // Send [DONE] (only if not already sent during transform)
          if (!doneSent) {
            await emitFinalSseMetadata(controller, state?.usage as Record<string, unknown> | null);
            doneSent = true;
            if (shouldEmitDoneTerminator) {
              clientPayloadCollector.push({ done: true });
              const doneOutput = "data: [DONE]\n\n";
              reqLogger?.appendConvertedChunk?.(doneOutput);
              controller.enqueue(encoder.encode(doneOutput));
            }
          }

          // Estimate usage if provider didn't return valid usage (for translate mode)
          if (!hasValidUsage(state?.usage) && totalContentLength > 0) {
            state.usage = estimateUsage(body, totalContentLength, sourceFormat);
          }

          if (hasValidUsage(state?.usage)) {
            logUsage(state.provider || targetFormat, state.usage, model, connectionId, apiKeyInfo);
          } else {
            appendRequestLog({
              model,
              provider,
              connectionId,
              tokens: null,
              status: "200 OK",
            }).catch(() => {});
          }
          // Notify caller for call log persistence (include full response body with accumulated content)
          if (onComplete) {
            try {
              const u = state?.usage as Record<string, unknown> | null | undefined;
              const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
              const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
              let content = (state?.accumulatedContent ?? "").trim() || "";
              const normalizedToolCalls: ToolCall[] = state?.toolCalls?.size
                ? [...state.toolCalls.values()]
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
                  id: `call_${uuidv4()}_${normalizedToolCalls.length}`,
                  index: normalizedToolCalls.length,
                  type: "function",
                  function: {
                    name: textualToolCall.name,
                    arguments: JSON.stringify(textualToolCall.args || {}),
                  },
                });
                content = "";
              } else if (containsMalformedTextualToolCall(content, allowedToolNames)) {
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
              onComplete({
                status: 200,
                usage: state?.usage,
                responseBody,
                providerPayload: providerPayloadCollector.build(
                  buildStreamSummaryFromEvents(
                    providerPayloadCollector.getEvents(),
                    targetFormat,
                    model
                  ),
                  { includeEvents: false }
                ),
                clientPayload: clientPayloadCollector.build(responseBody, {
                  includeEvents: false,
                }),
              });
            } catch {}
          }
        } catch (error) {
          console.log(`[STREAM] Error in flush (${model || "unknown"}):`, error.message || error);
        }
      },
      cancel(reason) {
        clearIdleTimer();
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