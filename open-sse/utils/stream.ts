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
  parseSSEDataPayload,
  createSSEDataLineNormalizer,
  createSSEEventPrefixBuffer,
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
import { STREAM_IDLE_TIMEOUT_MS, FETCH_BODY_TIMEOUT_MS, HTTP_STATUS } from "../config/constants.ts";
import {
  OMIT_STREAMING_CHUNK_MARKER,
  sanitizeStreamingChunk,
} from "../handlers/responseSanitizer.ts";
import { buildErrorBody } from "./error.ts";
import { parseTextualToolCallCandidate, isValidToolCallHeaderPrefix } from "./textualToolCall.ts";
import { recordToolLatency } from "../services/toolLatencyTracker.ts";
import {
  generateSessionId,
  markToolFinish,
  consumeToolFinishTime,
} from "../services/sessionManager.ts";
import {
  backfillResponsesCompletedOutput,
  normalizeResponsesSseIds,
  pushUniqueResponsesOutputItems,
  stringifyIdValue,
  stripResponsesLifecycleEcho,
} from "./responsesStreamHelpers.ts";
import { processBufferedPassthroughLine } from "./passthroughTailProcessor.ts";
import {
  getAnyReasoningValue,
  getReadableReasoningValue,
  getUnsupportedReasoningValue,
  hasUnsupportedReasoningSignal,
} from "./reasoningFields.ts";

/**
 * Race a response body read against a timeout.
 * Prevents indefinite hangs when the upstream sends headers but stalls on the body.
 */
export function withBodyTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = FETCH_BODY_TIMEOUT_MS
): Promise<T> {
  if (timeoutMs <= 0) return promise;
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      const err = new Error(`Response body read timeout after ${timeoutMs}ms`);
      err.name = "BodyTimeoutError";
      reject(err);
    }, timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer)) as Promise<T>;
}

export { COLORS, formatSSE };
export { backfillResponsesCompletedOutput, stripResponsesLifecycleEcho };

type JsonRecord = Record<string, unknown>;

export const PENDING_REQUEST_CLEARED_MARKER = "__omniroutePendingRequestCleared";

function markPendingRequestCleared(error: Error): Error {
  (error as Error & Record<string, unknown>)[PENDING_REQUEST_CLEARED_MARKER] = true;
  return error;
}

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
  error?: string | null;
  errorCode?: string | null;
  ttft?: number | null;
};

type StreamFailurePayload = {
  status: number;
  message: string;
  code?: string;
  type?: string;
};

type StreamOptions = {
  mode?: string;
  targetFormat?: string;
  sourceFormat?: string;
  clientResponseFormat?: string | null;
  copilotCompatibleReasoning?: boolean;
  provider?: string | null;
  reqLogger?: StreamLogger | null;
  toolNameMap?: unknown;
  model?: string | null;
  connectionId?: string | null;
  apiKeyInfo?: unknown;
  body?: unknown;
  onComplete?: ((payload: StreamCompletePayload) => void) | null;
  onFailure?: ((payload: StreamFailurePayload) => boolean | void | Promise<void>) | null;
};

type TranslateState = ReturnType<typeof initState> & {
  provider?: string | null;
  toolNameMap?: unknown;
  signatureNamespace?: string | null;
  usage?: unknown;
  finishReason?: unknown;
  copilotCompatibleReasoning?: boolean;
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

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

const STREAM_SUMMARY_TEXT_LIMIT = 64 * 1024;

function appendBoundedText(current: string, next: string): string {
  if (!next) return current;
  const combined = current + next;
  if (combined.length <= STREAM_SUMMARY_TEXT_LIMIT) return combined;
  return combined.slice(-STREAM_SUMMARY_TEXT_LIMIT);
}

function parseTextualToolCallFromContent(text: unknown): { name: string; args: unknown } | null {
  const candidate = parseTextualToolCallCandidate(text);
  return candidate?.kind === "complete" ? { name: candidate.name, args: candidate.args } : null;
}

function containsTextualToolCallCandidate(text: unknown): boolean {
  return parseTextualToolCallCandidate(text) !== null;
}

function containsMalformedTextualToolCall(
  text: unknown,
  allowedToolNames?: Set<string> | null
): boolean {
  if (typeof text !== "string") return false;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");

  let searchIdx = 0;
  while (true) {
    const idx = normalized.indexOf("[Tool call:", searchIdx);
    if (idx === -1) break;

    const candidate = normalized.slice(idx);
    if (isValidToolCallHeaderPrefix(candidate)) {
      const parsed = parseTextualToolCallFromContent(candidate);
      if (parsed) {
        if (allowedToolNames?.size && !allowedToolNames.has(parsed.name)) {
          return true;
        }
      } else {
        return true;
      }
    }

    searchIdx = idx + 1;
  }
  return false;
}

function extractAllowedToolNames(body: unknown): Set<string> | null {
  const record = asRecord(body);
  const tools = record.tools;
  if (!Array.isArray(tools)) return null;
  const names = new Set<string>();
  for (const tool of tools) {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) continue;
    const item = tool as JsonRecord;
    const directName = typeof item.name === "string" ? item.name.trim() : "";
    const fn =
      item.function && typeof item.function === "object" && !Array.isArray(item.function)
        ? (item.function as JsonRecord)
        : null;
    const functionName = typeof fn?.name === "string" ? fn.name.trim() : "";
    const name = functionName || directName;
    if (name) names.add(name);
  }
  return names.size > 0 ? names : null;
}

function collectPassthroughTextualToolCall(
  text: string,
  toolCalls: Map<string, ToolCall>,
  allowedToolNames?: Set<string> | null
): ToolCall | null {
  const parsed = parseTextualToolCallFromContent(text);
  if (!parsed) return null;
  if (allowedToolNames?.size && !allowedToolNames.has(parsed.name)) return null;
  const key = `textual:${toolCalls.size}`;
  const toolCall: ToolCall = {
    id: `call_${Date.now()}_${toolCalls.size}`,
    index: toolCalls.size,
    type: "function",
    function: {
      name: parsed.name,
      arguments: JSON.stringify(parsed.args || {}),
    },
  };
  toolCalls.set(key, toolCall);
  return toolCall;
}

/* @testonly */ export function toStreamingToolCallDelta(toolCall: ToolCall) {
  return {
    index: toolCall.index,
    id: toolCall.id != null ? String(toolCall.id) : null,
    type: toolCall.type,
    function: {
      name: toolCall.function.name,
      arguments: toolCall.function.arguments,
    },
  };
}

/* @testonly */ export function toResponsesFunctionCallItem(toolCall: ToolCall) {
  return {
    type: "function_call",
    id: (toolCall.id != null ? String(toolCall.id) : null) || `fc_${toolCall.index}`,
    call_id: (toolCall.id != null ? String(toolCall.id) : null) || `call_${toolCall.index}`,
    name: toolCall.function.name,
    arguments: toolCall.function.arguments,
    status: "completed",
  };
}

function buildResponsesFunctionCallEvents(toolCall: ToolCall) {
  const item = toResponsesFunctionCallItem(toolCall);
  return [
    {
      type: "response.output_item.added",
      output_index: toolCall.index,
      item,
    },
    {
      type: "response.function_call_arguments.done",
      item_id: item.id,
      output_index: toolCall.index,
      arguments: toolCall.function.arguments,
    },
    {
      type: "response.output_item.done",
      output_index: toolCall.index,
      item,
    },
  ];
}

function formatSSEDataEvents(events: unknown[]) {
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

function toChatCompletionChunkWithToolCall(base: JsonRecord, toolCall: ToolCall) {
  const choice = asRecord(Array.isArray(base.choices) ? base.choices[0] : null);
  const delta = { ...asRecord(choice.delta) };
  delete delta.content;
  delete delta.reasoning_content;
  return {
    ...base,
    choices: [
      {
        ...choice,
        index: typeof choice.index === "number" ? choice.index : 0,
        delta: {
          ...delta,
          tool_calls: [toStreamingToolCallDelta(toolCall)],
        },
        finish_reason: null,
      },
    ],
  };
}

function toResponsesCompletedWithToolCalls(parsed: JsonRecord, toolCalls: ToolCall[]) {
  const response = asRecord(parsed.response);
  const existingOutput = Array.isArray(response.output) ? response.output : [];
  return {
    ...parsed,
    response: {
      ...response,
      output: [
        ...existingOutput,
        ...toolCalls.map((toolCall) => toResponsesFunctionCallItem(toolCall)),
      ],
    },
  };
}

function toStreamFailureStatus(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value >= 400 && value <= 599) {
    return value;
  }
  if (typeof value === "string" && /^\d{3}$/.test(value.trim())) {
    const parsed = Number(value.trim());
    return parsed >= 400 && parsed <= 599 ? parsed : null;
  }
  return null;
}

function looksLikeStreamRateLimit(code: string, type: string, message: string): boolean {
  const haystack = `${code} ${type} ${message}`.toLowerCase();
  return (
    haystack.includes("usage_limit_reached") ||
    haystack.includes("rate_limit") ||
    haystack.includes("rate limit") ||
    haystack.includes("quota") ||
    haystack.includes("too many requests") ||
    haystack.includes("limit reached") ||
    haystack.includes("limit has been reached")
  );
}

function normalizeStreamFailurePayload(payload: unknown): StreamFailurePayload | null {
  const record = payload && typeof payload === "object" ? (payload as JsonRecord) : {};
  const response = asRecord(record.response);
  const error = Object.keys(asRecord(response.error)).length
    ? asRecord(response.error)
    : Object.keys(asRecord(record.error)).length
      ? asRecord(record.error)
      : record;
  const code = typeof error.code === "string" ? error.code : "upstream_error";
  const type = typeof error.type === "string" ? error.type : undefined;
  const message =
    typeof error.message === "string" && error.message.trim()
      ? error.message
      : typeof record.message === "string" && record.message.trim()
        ? record.message
        : "Upstream failure";
  const status =
    toStreamFailureStatus(error.status_code) ??
    toStreamFailureStatus(error.status) ??
    toStreamFailureStatus(response.status_code) ??
    toStreamFailureStatus(response.status) ??
    toStreamFailureStatus(record.status_code) ??
    toStreamFailureStatus(record.status) ??
    (looksLikeStreamRateLimit(code, type || "", message) ? 429 : 502);

  return {
    status,
    message,
    code,
    ...(type ? { type } : {}),
  };
}

type ClaudeEmptyResponseLifecycle = {
  hasMessageStart: boolean;
  hasContentBlock: boolean;
  hasMessageDelta: boolean;
  hasMessageStop: boolean;
  hasError: boolean;
  syntheticContentInjected: boolean;
  warningLogged: boolean;
};

const SYNTHETIC_CLAUDE_EMPTY_RESPONSE_TEXT = "";

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
  const passthroughEventPrefix = createSSEEventPrefixBuffer();
  const multilineSseDataLineNormalizer = createSSEDataLineNormalizer();

  const clearIdleTimer = () => {
    if (idleTimer) {
      clearInterval(idleTimer);
      idleTimer = null;
    }
  };

  const clearPendingPassthroughEvent = () => {
    passthroughEventPrefix.clear();
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

  let pendingRequestClearedByStream = false;
  const clearPendingRequestFromStream = () => {
    if (pendingRequestClearedByStream) return;
    pendingRequestClearedByStream = true;
    trackPendingRequest(model, provider, connectionId, false);
  };

  const emitClaudeEmptyStreamErrorAndAbort = (
    controller: TransformStreamDefaultController,
    decrementPendingRequest = true
  ) => {
    clearIdleTimer();
    const msg = "Claude returned an empty response (no content block)";
    console.warn(
      `[STREAM] Empty Claude stream at flush - emitting error (${provider || "provider"}:${model || "unknown"})`
    );
    const errorBody = buildErrorBody(502, msg);
    const errorEvent: Record<string, unknown> = { type: "error", error: errorBody.error };
    const errOutput = formatSSE(errorEvent, FORMATS.CLAUDE);
    reqLogger?.appendConvertedChunk?.(errOutput);
    clientPayloadCollector.push(errorEvent);
    controller.enqueue(encoder.encode(errOutput));
    let failureHandled = false;
    if (onFailure) {
      try {
        failureHandled = onFailure({ status: 502, message: msg, code: "empty_response" }) === true;
      } catch {}
    }
    if (decrementPendingRequest && !failureHandled) {
      clearPendingRequestFromStream();
    }
    controller.error(markPendingRequestCleared(new Error(msg)));
  };

  const emitTranslatedClientItem = (
    controller: TransformStreamDefaultController,
    item: Record<string, unknown>
  ) => {
    let itemSanitized: Record<string, unknown> = item;
    const isResponsesEvent = typeof item?.event === "string" && item.event.startsWith("response.");
    if (sourceFormat === FORMATS.OPENAI && !isResponsesEvent) {
      itemSanitized = sanitizeStreamingChunk(itemSanitized) as Record<string, unknown>;
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
      emitClaudeEmptyStreamErrorAndAbort(controller);
      return;
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
              let failureHandled = false;
              if (onFailure) {
                try {
                  failureHandled =
                    onFailure({
                      status: HTTP_STATUS.GATEWAY_TIMEOUT,
                      message: timeoutMsg,
                      code: "stream_idle_timeout",
                      type: "timeout_error",
                    }) === true;
                } catch {}
              }
              if (!failureHandled) {
                clearPendingRequestFromStream();
              }
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

        for (const line of multilineSseDataLineNormalizer.normalize(lines)) {
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
              const eventType = trimmed.replace(/^event:\s*/i, "");
              if (
                shouldInjectClaudeEmptyResponseBeforeCurrentEvent(claudeEmptyResponseLifecycle, {
                  type: eventType,
                })
              ) {
                emitClaudeEmptyStreamErrorAndAbort(controller);
                return;
              }

              passthroughEventPrefix.remember(line);
              continue;
            }

            if (/^(?::|id:|retry:)/i.test(trimmed)) {
              passthroughEventPrefix.remember(line);
              continue;
            }

            if (!trimmed) {
              const pendingOutput = passthroughEventPrefix.flush();
              if (pendingOutput) {
                reqLogger?.appendConvertedChunk?.(pendingOutput);
                controller.enqueue(encoder.encode(pendingOutput));
              }
              clearPendingPassthroughEvent();
              continue;
            }

            if (!trimmed.startsWith("data:")) {
              passthroughEventPrefix.remember(line);
              continue;
            }

            const parsedPassthroughData = trimmed.startsWith("data:")
              ? parseSSEDataPayload(trimmed.slice(5), {
                  eventType: passthroughEventPrefix.eventType(),
                })
              : null;

            if (trimmed.startsWith("data:")) {
              const providerPayload = parsedPassthroughData ?? parseSSELine(trimmed);
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
                let parsed = parsedPassthroughData ?? JSON.parse(trimmed.slice(5).trim());

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
                          output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                        output = `data: ${JSON.stringify(parsed)}\n\n`;
                        injectedUsage = true;
                      } else {
                        if (passthroughBufferedTextualToolCallContent) {
                          parsed.delta = passthroughBufferedTextualToolCallContent + incomingDelta;
                          output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                      output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                  if (
                    stripped ||
                    backfilled ||
                    textualToolCallBackfilled ||
                    responsesIdsNormalized
                  ) {
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                    emitClaudeEmptyStreamErrorAndAbort(controller);
                    return;
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
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                      // Some upstreams (e.g. Ollama Cloud) emit prompt_tokens: 0
                      // even when input was sent — they simply don't count input
                      // tokens.  When we have a non-zero output but zero input,
                      // estimate the real input token count from the request body.
                      if (
                        emptyChoicesUsage &&
                        typeof emptyChoicesUsage === "object" &&
                        !Array.isArray(emptyChoicesUsage) &&
                        emptyChoicesUsage.completion_tokens > 0
                      ) {
                        const pt = emptyChoicesUsage.prompt_tokens ?? 0;
                        if (pt === 0) {
                          const estimated = estimateUsage(body, totalContentLength, FORMATS.OPENAI);
                          if (estimated?.prompt_tokens > 0) {
                            emptyChoicesUsage.prompt_tokens = estimated.prompt_tokens;
                            emptyChoicesUsage.total_tokens =
                              (emptyChoicesUsage.total_tokens ?? 0) + estimated.prompt_tokens;
                          }
                        }
                      }
                      usage = emptyChoicesUsage;
                      output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                  const rawDelta = parsed.choices?.[0]?.delta;
                  const hadReasoningAlias = hasUnsupportedReasoningSignal(rawDelta);

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
                  let splitMixedReasoningContent = false;

                  // Split combined reasoning+content deltas into separate SSE events.
                  // Standard OpenAI streaming never mixes both fields in one delta;
                  // clients (e.g. LobeChat) may skip content when reasoning_content
                  // is present, causing the first content token to be lost.
                  if (delta?.reasoning_content && delta?.content) {
                    // Per-chunk clone on the streaming hot path: a JSON.parse(JSON.stringify())
                    // round-trip re-serializes and re-parses the entire chunk just to drop two
                    // fields. structuredClone is a native, much faster deep clone with identical
                    // semantics for this JSON-derived object (falls back on older runtimes).
                    const reasoningChunk =
                      typeof structuredClone === "function"
                        ? structuredClone(parsed)
                        : JSON.parse(JSON.stringify(parsed));
                    const rDelta = reasoningChunk.choices[0].delta;
                    delete rDelta.content;
                    reasoningChunk.choices[0].finish_reason = null;
                    delete reasoningChunk.usage;
                    const rOutput = `data: ${JSON.stringify(reasoningChunk)}\n\n`;
                    passthroughAccumulatedReasoning = appendBoundedText(
                      passthroughAccumulatedReasoning,
                      delta.reasoning_content
                    );
                    totalContentLength += delta.reasoning_content.length;
                    clientPayloadCollector.push(reasoningChunk);
                    reqLogger?.appendConvertedChunk?.(rOutput);
                    controller.enqueue(encoder.encode(rOutput));
                    delete delta.reasoning_content;
                    splitMixedReasoningContent = true;
                  }

                  // Track whether we need to re-serialize (separate from injectedUsage
                  // to avoid blocking subsequent finish_reason / usage mutations)
                  const needsReserialization =
                    splitMixedReasoningContent ||
                    hadReasoningAlias ||
                    (delta?.content === "" && delta?.reasoning_content);

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

                  const content = delta?.content;
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
                  const reasoningDelta = getReadableReasoningValue(delta);
                  if (reasoningDelta) {
                    totalContentLength += reasoningDelta.length;
                  }
                  {
                    const guarded = applyTextualToolCallStreamingGuard(
                      parsed as Record<string, unknown>
                    );
                    parsed = guarded.parsed as typeof parsed;
                    textualToolCallConverted = guarded.textualToolCallConverted;
                  }
                  if (reasoningDelta)
                    passthroughAccumulatedReasoning = appendBoundedText(
                      passthroughAccumulatedReasoning,
                      reasoningDelta
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
                      output = `data: ${JSON.stringify(parsed)}\n\n`;
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
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    usage = estimated;
                    injectedUsage = true;
                  } else if (isFinishChunk && usage) {
                    const buffered = addBufferToUsage(usage);
                    parsed.usage = filterUsageForFormat(buffered, FORMATS.OPENAI);
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    injectedUsage = true;
                  } else if (textualToolCallConverted) {
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    injectedUsage = true;
                  } else if (
                    idFixed ||
                    needsReserialization ||
                    toolCallIdCoerced ||
                    hadNonStringToolCallId ||
                    hadNonStringTopLevelId
                  ) {
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    injectedUsage = true;
                  }
                }

                clientPayload = parsed;
              } catch {
                // Skip non-JSON data lines silently — don't forward garbage to clients.
                // Upstream providers sometimes return plain-text errors (HTML, rate-limit
                // messages) in the SSE stream that would break downstream JSON decoders.
                continue;
              }
            }

            if (!injectedUsage) {
              if (line.startsWith("data:") && !line.startsWith("data: ")) {
                output = "data: " + line.slice(5) + "\n\n";
              } else {
                output = line + "\n\n";
              }
            }

            output = passthroughEventPrefix.prefixData(output, line);

            if (clientPayload) {
              clientPayloadCollector.push(clientPayload);
            }

            reqLogger?.appendConvertedChunk?.(output);
            controller.enqueue(encoder.encode(output));
            if (failurePayload) {
              let failureHandled = false;
              if (onFailure) {
                try {
                  failureHandled = onFailure(failurePayload) === true;
                } catch {}
              }
              clearIdleTimer();
              if (!failureHandled) {
                clearPendingRequestFromStream();
              }
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
          const openAiDelta = parsed.choices?.[0]?.delta;
          const openAiReasoning = getReadableReasoningValue(openAiDelta);
          if (openAiReasoning) {
            totalContentLength += openAiReasoning.length;
            if (state?.accumulatedContent !== undefined)
              state.accumulatedContent = appendBoundedText(
                state.accumulatedContent,
                openAiReasoning
              );
          }
          // Mirror only client-unsupported reasoning aliases into `reasoning_content`.
          if (!openAiReasoning) {
            const delta = openAiDelta;
            const r = getUnsupportedReasoningValue(delta);
            if (typeof r === "string" && r.length > 0) {
              parsed.choices[0].delta.reasoning_content = r;
              delete parsed.choices[0].delta.thinking;
              delete parsed.choices[0].delta.thought;
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
            Boolean(getAnyReasoningValue(parsed.choices?.[0]?.delta));
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
          if (extracted) {
            if (!state.usage) {
              state.usage = extracted;
            } else {
              const su = state.usage as Record<string, number>;
              const eu = extracted as Record<string, number>;
              if (eu.prompt_tokens > 0) su.prompt_tokens = eu.prompt_tokens;
              if (eu.completion_tokens > 0) su.completion_tokens = eu.completion_tokens;
              if (eu.total_tokens > 0) su.total_tokens = eu.total_tokens;
              if (eu.input_tokens > 0) su.input_tokens = eu.input_tokens;
              if (eu.output_tokens > 0) su.output_tokens = eu.output_tokens;
              if (eu.cache_read_input_tokens > 0)
                su.cache_read_input_tokens = eu.cache_read_input_tokens;
              if (eu.cache_creation_input_tokens > 0)
                su.cache_creation_input_tokens = eu.cache_creation_input_tokens;
              if (eu.cached_tokens > 0) su.cached_tokens = eu.cached_tokens;
              if (eu.reasoning_tokens > 0) su.reasoning_tokens = eu.reasoning_tokens;
            }
          }

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
        try {
          const remaining = decoder.decode();
          if (remaining) buffer += remaining;
          let normalizedTailLines: string[] = [];
          if (multilineSseDataLineNormalizer.hasPending()) {
            const tailLines = buffer ? [buffer, ""] : [""];
            normalizedTailLines = multilineSseDataLineNormalizer.normalize(tailLines);
            buffer = "";
          }

          if (mode === STREAM_MODE.PASSTHROUGH) {
            const tailProcessorContext = {
              getSkipPassthroughEvent: () => skipPassthroughEvent,
              setSkipPassthroughEvent: (value: boolean) => {
                skipPassthroughEvent = value;
              },
              clearPendingPassthroughEvent,
              shouldAbortOnClaudeLifecycle: (payload: unknown) =>
                shouldInjectClaudeEmptyResponseBeforeCurrentEvent(
                  claudeEmptyResponseLifecycle,
                  payload
                ),
              emitClaudeEmptyStreamErrorAndAbort: () =>
                emitClaudeEmptyStreamErrorAndAbort(controller),
              isClaudeEventPayload,
              updateClaudeEmptyResponseLifecycle: (payload: unknown) =>
                updateClaudeEmptyResponseLifecycle(claudeEmptyResponseLifecycle, payload),
              passthroughEventPrefix,
              emitConvertedOutput: (output: string) => {
                reqLogger?.appendConvertedChunk?.(output);
                controller.enqueue(encoder.encode(output));
              },
              pushProviderPayload: (payload: unknown) => providerPayloadCollector.push(payload),
              pushClientPayload: (payload: unknown) => clientPayloadCollector.push(payload),
              setPassthroughResponsesId: (value: string) => {
                passthroughResponsesId = value;
              },
              setUsage: (value: unknown) => {
                usage = value as UsageTokenRecord;
              },
              addTotalContentLength: (value: number) => {
                totalContentLength += value;
              },
              appendPassthroughContent: (value: string) => {
                passthroughAccumulatedContent = appendBoundedText(
                  passthroughAccumulatedContent,
                  value
                );
              },
              appendPassthroughReasoning: (value: string) => {
                passthroughAccumulatedReasoning = appendBoundedText(
                  passthroughAccumulatedReasoning,
                  value
                );
              },
              getResponsesReasoningKey,
              markResponsesReasoningSummarySeen: (key: string) => {
                passthroughResponsesReasoningSummarySeen.add(key);
              },
              ensureVisibleResponsesReasoningSummary,
              emitSyntheticResponsesReasoningSummary: (payload: Record<string, unknown>) =>
                emitSyntheticResponsesReasoningSummary(controller, payload),
              passthroughResponsesOutputItems,
              passthroughResponsesPendingFunctionCalls,
              getPassthroughResponsesCurrentFunctionCallKey: () =>
                passthroughResponsesCurrentFunctionCallKey,
              setPassthroughResponsesCurrentFunctionCallKey: (value: string | null) => {
                passthroughResponsesCurrentFunctionCallKey = value;
              },
              hasPassthroughToolCalls: () => passthroughToolCalls.size > 0,
              toResponsesCompletedWithToolCalls: (parsed: JsonRecord) =>
                toResponsesCompletedWithToolCalls(parsed, [
                  ...passthroughToolCalls.values(),
                ]) as JsonRecord,
            };

            for (const line of normalizedTailLines) {
              if (processBufferedPassthroughLine(line, tailProcessorContext)) {
                return;
              }
            }

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
                  emitClaudeEmptyStreamErrorAndAbort(controller);
                  return;
                }
                if (isClaudeEventPayload(bufferedPayload)) {
                  updateClaudeEmptyResponseLifecycle(claudeEmptyResponseLifecycle, bufferedPayload);
                }
                clientPayloadCollector.push(bufferedPayload);

                // Normalize numeric IDs for final buffered data: chunk (same as transform path)
                if (typeof bufferedPayload === "object" && !Array.isArray(bufferedPayload)) {
                  const flushedParsed = bufferedPayload as JsonRecord;
                  const flushedType =
                    typeof flushedParsed.type === "string" ? flushedParsed.type : "";
                  const isResponses = flushedType.startsWith("response.");
                  const isClaude = isClaudeEventPayload(flushedParsed);
                  if (isResponses) {
                    if (normalizeResponsesSseIds(flushedParsed)) {
                      output = `data: ${JSON.stringify(flushedParsed)}\n\n`;
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
                      output = `data: ${JSON.stringify(flushedParsed)}\n\n`;
                    }
                  }
                }
              }
              if (!bufferedLine) output = passthroughEventPrefix.flush() || output;
              output = passthroughEventPrefix.prefixData(output, buffer);
              if (output && !output.endsWith("\n\n")) {
                output = output.endsWith("\n") ? `${output}\n` : `${output}\n\n`;
              }
              reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(encoder.encode(output));
            }

            if (shouldInjectClaudeEmptyResponseOnFlush(claudeEmptyResponseLifecycle)) {
              emitClaudeEmptyStreamErrorAndAbort(controller);
              return;
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
                  id: passthroughResponsesId || `chatcmpl-${Date.now()}`,
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
            } else {
              clearPendingRequestFromStream();
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
                  if (eu.input_tokens > 0) su.input_tokens = eu.input_tokens;
                  if (eu.output_tokens > 0) su.output_tokens = eu.output_tokens;
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
            let failureHandled = false;
            if (onFailure) {
              try {
                failureHandled =
                  onFailure({
                    status: err.status,
                    message: err.message,
                    code: err.code,
                    type: err.type,
                  }) === true;
              } catch {}
            }

            const errorBody = buildErrorBody(err.status, err.message);
            if (onComplete) {
              try {
                onComplete({
                  status: err.status,
                  usage: state?.usage,
                  responseBody: errorBody,
                  error: err.message,
                  errorCode: err.code,
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
                failureHandled = true;
              } catch {}
            }

            clearIdleTimer();
            if (!failureHandled) {
              clearPendingRequestFromStream();
            }
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
              emitClaudeEmptyStreamErrorAndAbort(controller);
              return;
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
                  id: `call_${Date.now()}_${normalizedToolCalls.length}`,
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
          } else {
            clearPendingRequestFromStream();
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

export default createSSEStream;

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
