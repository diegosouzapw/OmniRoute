import { translateResponse, initState } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import { trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import {
  extractUsage,
  hasValidUsage,
  estimateUsage,
  logUsage,
  addBufferToUsage,
  filterUsageForFormat,
  COLORS,
} from "./usageTracking.ts";
import {
  parseSSELine,
  hasValuableContent,
  fixInvalidId,
  formatSSE,
  unwrapGeminiChunk,
} from "./streamHelpers.ts";
import { calculateCost } from "@/lib/usage/costCalculator";
import { buildOmniRouteSseMetadataComment } from "@/domain/omnirouteResponseMeta";
import {
  createStructuredSSECollector,
  buildStreamSummaryFromEvents,
} from "./streamPayloadCollector.ts";
import { STREAM_IDLE_TIMEOUT_MS, HTTP_STATUS } from "../config/constants.ts";
import {
  sanitizeStreamingChunk,
  extractThinkingFromContent,
} from "../handlers/responseSanitizer.ts";
import { buildErrorBody } from "./error.ts";

export { COLORS, formatSSE };

type JsonRecord = Record<string, unknown>;

type StreamLogger = {
  appendProviderChunk?: (value: string) => void;
  appendConvertedChunk?: (value: string) => void;
  appendOpenAIChunk?: (value: string) => void;
};

type StreamCompletePayload = {
  status: number;
  usage: unknown;
  /** Minimal response body for call log (streaming: usage + note; non-streaming not used) */
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
};

type StreamOptions = {
  mode?: string;
  targetFormat?: string;
  sourceFormat?: string;
  provider?: string | null;
  reqLogger?: StreamLogger | null;
  toolNameMap?: unknown;
  model?: string | null;
  connectionId?: string | null;
  apiKeyInfo?: unknown;
  body?: unknown;
  onComplete?: ((payload: StreamCompletePayload) => void) | null;
};

type TranslateState = ReturnType<typeof initState> & {
  provider?: string | null;
  toolNameMap?: unknown;
  usage?: unknown;
  finishReason?: unknown;
  /** Accumulated message content for call log response body */
  accumulatedContent?: string;
  upstreamError?: {
    status: number;
    type: string;
    code: string;
    message: string;
  } | null;
};

type ToolCall = {
  id: string | null;
  index: number;
  type: string;
  function: { name: string; arguments: string };
};

type UsageTokenRecord = Record<string, number>;

type ClaudeEmptyResponseLifecycle = {
  hasMessageStart: boolean;
  hasContentBlock: boolean;
  hasMessageDelta: boolean;
  hasMessageStop: boolean;
  hasError: boolean;
  syntheticContentInjected: boolean;
  warningLogged: boolean;
};

const SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT =
  "[Proxy Error] The upstream API returned an empty response. Please retry the request.";

function createClaudeEmptyResponseLifecycle(): ClaudeEmptyResponseLifecycle {
  return {
    hasMessageStart: false,
    hasContentBlock: false,
    hasMessageDelta: false,
    hasMessageStop: false,
    hasError: false,
    syntheticContentInjected: false,
    warningLogged: false,
  };
}

function getClaudeEventType(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const type = (payload as JsonRecord).type;
  return typeof type === "string" ? type : null;
}

function isClaudeEventPayload(payload: unknown): payload is JsonRecord {
  return getClaudeEventType(payload) !== null;
}

function updateClaudeEmptyResponseLifecycle(
  lifecycle: ClaudeEmptyResponseLifecycle,
  payload: unknown
) {
  const type = getClaudeEventType(payload);
  if (!type) return;

  switch (type) {
    case "message_start":
      lifecycle.hasMessageStart = true;
      break;
    case "content_block_start":
    case "content_block_delta":
    case "content_block_stop":
      lifecycle.hasContentBlock = true;
      break;
    case "message_delta":
      lifecycle.hasMessageDelta = true;
      break;
    case "message_stop":
      lifecycle.hasMessageStop = true;
      break;
    case "error":
      lifecycle.hasError = true;
      break;
    default:
      break;
  }
}

function hasClaudeAssistantLifecycle(lifecycle: ClaudeEmptyResponseLifecycle): boolean {
  return lifecycle.hasMessageStart || lifecycle.hasMessageDelta || lifecycle.hasMessageStop;
}

function shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
  lifecycle: ClaudeEmptyResponseLifecycle,
  payload: unknown
): boolean {
  const type = getClaudeEventType(payload);
  if (!type || lifecycle.hasError || lifecycle.hasContentBlock) return false;
  if (!hasClaudeAssistantLifecycle(lifecycle)) return false;
  return type === "message_delta" || type === "message_stop";
}

function shouldInjectClaudeEmptyResponseOnFlush(lifecycle: ClaudeEmptyResponseLifecycle): boolean {
  if (lifecycle.hasError || lifecycle.hasContentBlock) return false;
  return hasClaudeAssistantLifecycle(lifecycle);
}

function shouldInjectClaudeMissingFinalizersOnFlush(
  lifecycle: ClaudeEmptyResponseLifecycle
): boolean {
  if (lifecycle.hasError || !lifecycle.syntheticContentInjected) return false;
  return !lifecycle.hasMessageDelta || !lifecycle.hasMessageStop;
}

function buildSyntheticClaudeEmptyResponseEvents(
  lifecycle: ClaudeEmptyResponseLifecycle,
  model: string | null,
  options: {
    includeContentBlock?: boolean;
    includeMessageDelta?: boolean;
    includeMessageStop?: boolean;
  } = {}
): JsonRecord[] {
  const {
    includeContentBlock = true,
    includeMessageDelta = false,
    includeMessageStop = false,
  } = options;
  const events: JsonRecord[] = [];
  const resolvedModel = typeof model === "string" && model ? model : "unknown";

  if (includeContentBlock) {
    if (!lifecycle.hasMessageStart) {
      events.push({
        type: "message_start",
        message: {
          id: `msg_synthetic_${Date.now()}`,
          type: "message",
          role: "assistant",
          model: resolvedModel,
          content: [],
          stop_reason: null,
          stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      });
    }

    events.push(
      {
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: {
          type: "text_delta",
          text: SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT,
        },
      },
      {
        type: "content_block_stop",
        index: 0,
      }
    );
  }

  if (includeMessageDelta) {
    events.push({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { input_tokens: 0, output_tokens: 0 },
    });
  }

  if (includeMessageStop) {
    events.push({ type: "message_stop" });
  }

  return events;
}

function getOpenAIIntermediateChunks(value: unknown): unknown[] {
  if (!value || typeof value !== "object") return [];
  const candidate = (value as JsonRecord)._openaiIntermediate;
  return Array.isArray(candidate) ? candidate : [];
}

function restoreClaudePassthroughToolUseName(parsed: JsonRecord, toolNameMap: unknown): boolean {
  if (!(toolNameMap instanceof Map)) return false;
  if (!parsed || typeof parsed !== "object") return false;

  const block =
    parsed.content_block && typeof parsed.content_block === "object"
      ? (parsed.content_block as JsonRecord)
      : null;
  if (!block || block.type !== "tool_use" || typeof block.name !== "string") return false;

  const restoredName = toolNameMap.get(block.name) ?? block.name;
  if (restoredName === block.name) return false;
  block.name = restoredName;
  return true;
}

// Note: TextDecoder/TextEncoder are created per-stream inside createSSEStream()
// to avoid shared state issues with concurrent streams (TextDecoder with {stream:true}
// maintains internal buffering state between decode() calls).

/**
 * Stream modes
 */
const STREAM_MODE = {
  TRANSLATE: "translate", // Full translation between formats
  PASSTHROUGH: "passthrough", // No translation, normalize output, extract usage
};

/**
 * Lifecycle event types in OpenAI Responses API streams whose `response`
 * payload is a snapshot of the request (echoes back `instructions` + `tools`).
 */
const RESPONSES_LIFECYCLE_EVENT_TYPES = new Set([
  "response.created",
  "response.in_progress",
  "response.completed",
]);

/**
 * Backfill `parsed.response.output` on a `response.completed` event from the
 * snapshots accumulated as the stream progressed (`response.output_item.done`).
 *
 * Why: when the upstream request runs with `store: false`, OpenAI's Responses
 * API leaves `response.output` empty in the final `response.completed`
 * snapshot — clients that rebuild assistant messages from that snapshot
 * (notably the GitHub Copilot CLI 1.0.36) end up with `choices: []` and never
 * trigger tool execution. Codex CLI and others that consume per-item events
 * are unaffected; backfilling the array makes both styles work.
 *
 * Returns true when `parsed.response.output` was empty and got replaced, so
 * the caller can re-serialize.
 */
export function backfillResponsesCompletedOutput(
  parsed: unknown,
  collectedItems: readonly unknown[]
): boolean {
  if (!collectedItems.length) return false;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  const obj = parsed as Record<string, unknown>;
  if (obj.type !== "response.completed") return false;
  const resp = obj.response;
  if (!resp || typeof resp !== "object" || Array.isArray(resp)) return false;
  const r = resp as Record<string, unknown>;
  const existing = r.output;
  if (Array.isArray(existing) && existing.length > 0) return false;
  r.output = collectedItems.slice();
  return true;
}

/**
 * Strip the request echo (`instructions`, `tools`) from `parsed.response`
 * on Responses API lifecycle events.
 *
 * Why: those fields can balloon the SSE message past 100 KB when the request
 * carries large tool definitions / instructions. Some clients (notably the
 * GitHub Copilot CLI) cannot process oversized SSE events and stop rendering
 * mid-stream. The fields are pure echo of the original request — clients
 * already hold the original locally — so removing them is observably safe.
 *
 * Returns true when the payload was modified and must be re-serialized.
 */
export function stripResponsesLifecycleEcho(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  const obj = parsed as Record<string, unknown>;
  if (typeof obj.type !== "string" || !RESPONSES_LIFECYCLE_EVENT_TYPES.has(obj.type)) {
    return false;
  }
  const resp = obj.response;
  if (!resp || typeof resp !== "object" || Array.isArray(resp)) return false;
  const r = resp as Record<string, unknown>;
  let changed = false;
  if ("instructions" in r) {
    delete r.instructions;
    changed = true;
  }
  if ("tools" in r) {
    delete r.tools;
    changed = true;
  }
  return changed;
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
  const {
    mode = STREAM_MODE.TRANSLATE,
    targetFormat,
    sourceFormat,
    provider = null,
    reqLogger = null,
    toolNameMap = null,
    model = null,
    connectionId = null,
    apiKeyInfo = null,
    body = null,
    onComplete = null,
  } = options;

  let buffer = "";
  let usage: UsageTokenRecord | null = null;
  /** Passthrough (OpenAI CC shape): saw tool_calls in stream before finish_reason */
  let passthroughHasToolCalls = false;
  /** Passthrough: accumulate tool_calls deltas for call log responseBody */
  const passthroughToolCalls = new Map<string, ToolCall>();
  let passthroughToolCallSeq = 0;
  let skipPassthroughEvent = false;

  // State for translate mode (accumulatedContent for call log response body)
  const state: TranslateState | null =
    mode === STREAM_MODE.TRANSLATE
      ? {
          ...(initState(sourceFormat) as TranslateState),
          provider,
          toolNameMap,
          accumulatedContent: "",
        }
      : null;

  // Track content length for usage estimation (both modes)
  let totalContentLength = 0;
  // Passthrough: accumulate content and reasoning separately for call log response body
  let passthroughAccumulatedContent = "";
  let passthroughAccumulatedReasoning = "";
  // Passthrough Responses SSE: snapshots of items seen via `response.output_item.done`,
  // used to backfill `response.completed.response.output` when upstream returns it
  // empty (which happens when `store: false` — see backfillResponsesCompletedOutput).
  const passthroughResponsesOutputItems: unknown[] = [];
  const streamStartedAt = Date.now();

  // Guard against duplicate [DONE] events — ensures exactly one per stream
  let doneSent = false;
  const providerPayloadCollector = createStructuredSSECollector({
    stage: "provider_response",
  });
  const clientPayloadCollector = createStructuredSSECollector({
    stage: "client_response",
  });

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

  return new TransformStream(
    {
      start(controller) {
        // Start idle watchdog — checks every 10s if provider has stopped sending
        if (STREAM_IDLE_TIMEOUT_MS > 0) {
          idleTimer = setInterval(() => {
            if (!streamTimedOut && Date.now() - lastChunkTime > STREAM_IDLE_TIMEOUT_MS) {
              streamTimedOut = true;
              clearInterval(idleTimer);
              idleTimer = null;
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
              controller.error(timeoutError);
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
            let output;
            let injectedUsage = false;
            let clientPayload: unknown = null;

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
                  // Responses SSE: only extract usage, forward payload as-is
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    usage = extracted;
                  }
                  // Track content length and accumulate for call log
                  if (parsed.delta && typeof parsed.delta === "string") {
                    totalContentLength += parsed.delta.length;
                    passthroughAccumulatedContent += parsed.delta;
                  }
                  // Capture each completed output item so the final
                  // response.completed snapshot can be backfilled when upstream
                  // returns an empty `output` (happens with store: false).
                  if (parsed.type === "response.output_item.done" && parsed.item) {
                    passthroughResponsesOutputItems.push(parsed.item);
                  }
                  // Two transport-level fixes for Responses passthrough:
                  //   1) Strip echoed `instructions` + `tools` from lifecycle
                  //      events — they can balloon a single SSE event past
                  //      100 KB and break parsers (e.g. GitHub Copilot CLI).
                  //   2) Backfill `response.completed.response.output` when
                  //      upstream sent it empty (store: false) — some clients
                  //      build their tool-call list from that snapshot rather
                  //      than from per-item events.
                  const stripped = stripResponsesLifecycleEcho(parsed);
                  const backfilled = backfillResponsesCompletedOutput(
                    parsed,
                    passthroughResponsesOutputItems
                  );
                  if (stripped || backfilled) {
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
                    passthroughAccumulatedContent += parsed.delta.text;
                  }
                  if (parsed.delta?.thinking) {
                    totalContentLength += parsed.delta.thinking.length;
                    passthroughAccumulatedContent += parsed.delta.thinking;
                  }
                  if (restoredToolName) {
                    output = `data: ${JSON.stringify(parsed)}
`;
                    injectedUsage = true;
                  }
                } else {
                  // Chat Completions: full sanitization pipeline

                  // Detect reasoning alias before sanitization strips it
                  const hadReasoningAlias = !!(
                    parsed.choices?.[0]?.delta?.reasoning &&
                    typeof parsed.choices[0].delta.reasoning === "string" &&
                    !parsed.choices[0].delta.reasoning_content
                  );

                  parsed = sanitizeStreamingChunk(parsed);

                  const idFixed = fixInvalidId(parsed);

                  if (!hasValuableContent(parsed, FORMATS.OPENAI)) {
                    continue;
                  }

                  const delta = parsed.choices?.[0]?.delta;

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
                    passthroughAccumulatedReasoning += delta.reasoning_content;
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
                    for (const tc of delta.tool_calls) {
                      // Key by index first — id only appears on the first delta in OpenAI streaming
                      let key: string;
                      if (Number.isInteger(tc?.index)) {
                        key = `idx:${tc.index}`;
                      } else if (tc?.id) {
                        key = `id:${tc.id}`;
                      } else {
                        key = `seq:${++passthroughToolCallSeq}`;
                      }
                      const existing = passthroughToolCalls.get(key);
                      const deltaArgs =
                        typeof tc?.function?.arguments === "string" ? tc.function.arguments : "";
                      if (!existing) {
                        passthroughToolCalls.set(key, {
                          id: tc?.id ?? null,
                          index: Number.isInteger(tc?.index) ? tc.index : passthroughToolCalls.size,
                          type: tc?.type || "function",
                          function: {
                            name: tc?.function?.name || "",
                            arguments: deltaArgs,
                          },
                        });
                      } else {
                        if (tc?.id) existing.id = existing.id || tc.id;
                        if (tc?.function?.name && !existing.function.name)
                          existing.function.name = tc.function.name;
                        existing.function.arguments += deltaArgs;
                      }
                    }
                  }

                  const content = delta?.content || delta?.reasoning_content;
                  if (content && typeof content === "string") {
                    totalContentLength += content.length;
                  }
                  if (typeof delta?.content === "string")
                    passthroughAccumulatedContent += delta.content;
                  if (typeof delta?.reasoning_content === "string")
                    passthroughAccumulatedReasoning += delta.reasoning_content;

                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    usage = extracted;
                  }

                  const isFinishChunk = parsed.choices?.[0]?.finish_reason;

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
                  if (isFinishChunk && !hasValidUsage(parsed.usage)) {
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
                  } else if (idFixed || needsReserialization) {
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

          // Track content length and accumulate for call log (from raw provider chunk, so content is never missed)
          // Do this before translation so we capture content regardless of translator output shape

          // Claude format
          if (parsed.delta?.text) {
            const t = parsed.delta.text;
            totalContentLength += t.length;
            if (state?.accumulatedContent !== undefined && typeof t === "string")
              state.accumulatedContent += t;
          }
          if (parsed.delta?.thinking) {
            const t = parsed.delta.thinking;
            totalContentLength += t.length;
            if (state?.accumulatedContent !== undefined && typeof t === "string")
              state.accumulatedContent += t;
          }

          // OpenAI format
          if (parsed.choices?.[0]?.delta?.content) {
            const c = parsed.choices[0].delta.content;
            if (typeof c === "string") {
              totalContentLength += c.length;
              if (state?.accumulatedContent !== undefined) state.accumulatedContent += c;
            } else if (Array.isArray(c)) {
              for (const part of c) {
                if (part?.text && typeof part.text === "string") {
                  totalContentLength += part.text.length;
                  if (state?.accumulatedContent !== undefined)
                    state.accumulatedContent += part.text;
                }
              }
            }
          }
          if (parsed.choices?.[0]?.delta?.reasoning_content) {
            const r = parsed.choices[0].delta.reasoning_content;
            if (typeof r === "string") {
              totalContentLength += r.length;
              if (state?.accumulatedContent !== undefined) state.accumulatedContent += r;
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
              if (state?.accumulatedContent !== undefined) state.accumulatedContent += r;
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
                if (state?.accumulatedContent !== undefined) state.accumulatedContent += part.text;
              }
            }
          }

          // Generic fallback: delta string, top-level content/text (e.g. some SSE payloads)
          if (state?.accumulatedContent !== undefined) {
            if (typeof (parsed as JsonRecord).delta === "string") {
              const d = (parsed as JsonRecord).delta as string;
              state.accumulatedContent += d;
              totalContentLength += d.length;
            }
            if (typeof (parsed as JsonRecord).content === "string") {
              const c = (parsed as JsonRecord).content as string;
              state.accumulatedContent += c;
              totalContentLength += c.length;
            }
            if (typeof (parsed as JsonRecord).text === "string") {
              const t = (parsed as JsonRecord).text as string;
              state.accumulatedContent += t;
              totalContentLength += t.length;
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
          clearInterval(idleTimer);
          idleTimer = null;
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
              clientPayloadCollector.push({ done: true });
              const doneOutput = "data: [DONE]\n\n";
              reqLogger?.appendConvertedChunk?.(doneOutput);
              controller.enqueue(encoder.encode(doneOutput));
            }
            // Notify caller for call log persistence (include full response body with accumulated content)
            if (onComplete) {
              try {
                const u = usage as Record<string, unknown> | null;
                const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
                const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
                const content = passthroughAccumulatedContent.trim() || "";
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

            controller.error(new Error(err.message || "Upstream failure"));
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
            clientPayloadCollector.push({ done: true });
            const doneOutput = "data: [DONE]\n\n";
            reqLogger?.appendConvertedChunk?.(doneOutput);
            controller.enqueue(encoder.encode(doneOutput));
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
              const content = (state?.accumulatedContent ?? "").trim() || "";
              const message: Record<string, unknown> = {
                role: "assistant",
                content: content || null,
              };
              const hasToolCalls = state?.toolCalls?.size > 0;
              if (hasToolCalls) {
                // Normalize shape — translators may store different structures
                message.tool_calls = [...state.toolCalls.values()]
                  .map(
                    (tc: Record<string, unknown>): ToolCall => ({
                      id: (tc.id as string) ?? null,
                      index: (tc.index as number) ?? (tc.blockIndex as number) ?? 0,
                      type: (tc.type as string) ?? "function",
                      function: (tc.function as ToolCall["function"]) ?? {
                        name: (tc.name as string) ?? "",
                        arguments: "",
                      },
                    })
                  )
                  .sort((a, b) => a.index - b.index);
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
    },
    // Writable side backpressure — limit buffered chunks to avoid unbounded memory
    { highWaterMark: 16 },
    // Readable side backpressure — limit queued output chunks
    { highWaterMark: 16 }
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
  apiKeyInfo: unknown = null
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
  apiKeyInfo: unknown = null
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
  });
}
