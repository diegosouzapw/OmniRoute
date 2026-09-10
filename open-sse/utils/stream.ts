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
  normalizeUsage as normalizeTokenUsage,
  sanitizeUsagePayloadForRequest,
  type UsageLike,
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
  appendBoundedText,
  buildSyntheticChatChunk,
  hasActiveDeltaValue,
  injectThinkingSignature,
} from "./streamHelpers.ts";
import { rejectEmptyChoicesStream, buildEmptyChoicesStreamError } from "./streamEmptyChoices.ts";
import { calculateCost } from "@/lib/usage/costCalculator";
import { buildOmniRouteSseMetadataComment } from "@/domain/omnirouteResponseMeta";
import { sseCommentsEnabled } from "./sseHeartbeat.ts";
import {
  createStructuredSSECollector,
  buildStreamSummaryFromEvents,
} from "./streamPayloadCollector.ts";
import { STREAM_IDLE_TIMEOUT_MS, FETCH_BODY_TIMEOUT_MS, HTTP_STATUS } from "../config/constants.ts";
import {
  OMIT_STREAMING_CHUNK_MARKER,
  isResponsesCommentaryMessageItem,
  sanitizeStreamingChunk,
} from "../handlers/responseSanitizer.ts";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  shouldDropResponsesCommentaryEvent,
  createTranslateCommentaryFilter,
} from "./responsesCommentaryDrop.ts";
import { buildErrorBody } from "./error.ts";
import { parseTextualToolCallCandidate, isValidToolCallHeaderPrefix } from "./textualToolCall.ts";
import { stripObfuscationZeroWidth } from "./zeroWidth.ts";
import {
  formatTranslatedStreamError,
  prepareTranslatedStreamFailure,
  projectStreamFailureEvent,
  type StreamFailurePayload,
} from "./streamErrorFormat.ts";
import { createStreamFailureAborter } from "./streamFailureBoundary.ts";
import { recordToolLatency } from "../services/toolLatencyTracker.ts";
import { extractToolSchemaMap } from "../translator/response/openai-responses/toolSchemas.ts";
import {
  generateSessionId,
  markToolFinish,
  consumeToolFinishTime,
} from "../services/sessionManager.ts";
import {
  backfillResponsesCompletedOutput,
  filterResponsesCommentaryFromItems,
  normalizeResponsesCompletedUsage as normalizeUsage,
  normalizeResponsesSseIds,
  pushUniqueResponsesOutputItems,
  stringifyIdValue,
  stripResponsesLifecycleEcho,
} from "./responsesStreamHelpers.ts";
import { processBufferedPassthroughLine } from "./passthroughTailProcessor.ts";
import { getVisibleResponsesReasoningSummaryText } from "../translator/response/openai-responses/pureHelpers.ts";
import {
  getAnyReasoningValue,
  getReadableReasoningValue,
  getUnsupportedReasoningValue,
  hasUnsupportedReasoningSignal,
} from "./reasoningFields.ts";
import { applyThinkTag, flushThink, initThinkState } from "./thinkTagParser.ts";
import {
  caseInsensitiveToolNameLookup,
  restoreOpenAIToolNames,
} from "../translator/helpers/toolCallHelper.ts";
import { restoreClaudeToolName } from "../services/claudeCodeToolRemapper.ts";
import { normalizeFinalOpenAIStreamChunk } from "./openAIStreamChunk.ts";
import { collectClaudeDelta } from "./streamClaudeDelta.ts";
import { createStreamTiming, type StreamTiming } from "./streamTiming.ts";

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
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export { formatSSE };
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
  /**
   * Time-to-first-forwarded-SSE-chunk in ms, or null when nothing was forwarded.
   * NOT token-level TTFT — see open-sse/utils/streamTiming.ts for what is measured.
   */
  ttft?: number | null;
  /** Mean inter-chunk gap in ms (chunk-latency proxy for ITL), or null. */
  itlMs?: number | null;
  /** True when the stream was interrupted (timeout/abort/error) before a clean finish. */
  interrupted?: boolean;
};

type StreamOptions = {
  mode?: string;
  targetFormat?: string;
  sourceFormat?: string;
  clientResponseFormat?: string | null;
  copilotCompatibleReasoning?: boolean;
  /** Suppress the `</think>` close marker for clients that render it verbatim (#5245). */
  suppressThinkClose?: boolean;
  /**
   * Drop internal commentary-phase output items from Responses API passthrough
   * streams before forwarding (#6199). When omitted, falls back to the
   * `RESPONSES_PASSTHROUGH_DROP_COMMENTARY` feature flag (default on).
   */
  dropResponsesCommentary?: boolean;
  customToolNames?: ReadonlySet<string>;
  provider?: string | null;
  reqLogger?: StreamLogger | null;
  toolNameMap?: unknown;
  model?: string | null;
  connectionId?: string | null;
  apiKeyInfo?: unknown;
  body?: unknown;
  onComplete?: ((payload: StreamCompletePayload) => void) | null;
  onFailure?: ((payload: StreamFailurePayload) => boolean | void | Promise<void>) | null;
  /**
   * Request-scoped `{namespace, name}` ledger for Responses namespace child
   * tools that were flattened to a bare leaf on the Chat wire (#7936
   * round-trip closure). The Responses response translator keys on the leaf
   * name emitted in `response.function_call_arguments.*` /
   * `response.output_item.added` / `response.output_item.done` and emits
   * codex-compatible `namespace` + `name` fields.
   */
  requestToolIdentityMap?: Map<string, { namespace: string; name: string }> | null;
};

type TranslateState = ReturnType<typeof initState> & {
  provider?: string | null;
  toolNameMap?: unknown;
  signatureNamespace?: string | null;
  usage?: unknown;
  finishReason?: unknown;
  copilotCompatibleReasoning?: boolean;
  /** Suppress the `</think>` close marker for clients that render it verbatim (#5245). */
  suppressThinkClose?: boolean;
  /** Accumulated message content for call log response body */
  accumulatedContent?: string;
  /** Accumulated reasoning content (separate from content) */
  accumulatedReasoning?: string;
  /** #6951 — per-tool JSON Schema (from request `tools[]`), keyed by tool name. */
  toolSchemas?: Map<string, Record<string, unknown>> | null;
  customToolNames?: ReadonlySet<string>;
  requestToolIdentityMap?: Map<string, { namespace: string; name: string }> | null;
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

// #7936 — restore `{namespace, name}` on Responses passthrough `function_call`
// items when the request-side Responses→Chat flatten stamped the bare leaf on the
// Chat wire. Codex's ResponseItem::FunctionCall schema declares an independent
// `namespace: Option<String>` field (see codex-rs/protocol/src/models.rs and the
// `function_call_deserializes_optional_namespace` round-trip test); emit it back.
function restoreResponsesPassthroughFunctionCallIdentity(
  parsed: JsonRecord,
  requestToolIdentityMap: Map<string, { namespace: string; name: string }> | null | undefined
): boolean {
  if (!(requestToolIdentityMap instanceof Map)) return false;

  const restoreItem = (item: unknown): boolean => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const functionCall = item as JsonRecord;
    if (functionCall.type !== "function_call" || typeof functionCall.name !== "string")
      return false;

    const identity = requestToolIdentityMap.get(functionCall.name);
    if (!identity) return false;

    const changed =
      functionCall.namespace !== identity.namespace || functionCall.name !== identity.name;
    functionCall.namespace = identity.namespace;
    functionCall.name = identity.name;
    return changed;
  };

  if (parsed.type === "response.output_item.added" || parsed.type === "response.output_item.done") {
    return restoreItem(parsed.item);
  }

  if (parsed.type === "response.completed" && Array.isArray(asRecord(parsed.response).output)) {
    return (asRecord(parsed.response).output as unknown[]).reduce<boolean>(
      (changed: boolean, item: unknown) => restoreItem(item) || changed,
      false
    );
  }

  return false;
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
  const normalized = stripObfuscationZeroWidth(text);

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

function isClaudeEventPayload(payload: unknown): boolean {
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

export function restoreClaudePassthroughToolUseName(
  parsed: JsonRecord,
  toolNameMap: unknown
): boolean {
  const block =
    parsed.content_block && typeof parsed.content_block === "object"
      ? (parsed.content_block as JsonRecord)
      : null;
  if (!block || block.type !== "tool_use" || typeof block.name !== "string") return false;

  const map = toolNameMap instanceof Map ? toolNameMap : null;
  const restoredName = restoreClaudeToolName(block.name, map);

  if (restoredName === block.name) return false;
  block.name = restoredName;
  return true;
}

// Note: TextDecoder/TextEncoder are created per-stream inside createSSEStream()
// to avoid shared state issues with concurrent streams (TextDecoder with {stream:true}
// maintains internal buffering state between decode() calls).

// Stream modes
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
    suppressThinkClose = false,
    provider = null,
    reqLogger = null,
    toolNameMap = null,
    model = null,
    connectionId = null,
    apiKeyInfo = null,
    body = null,
    onComplete = null,
    onFailure = null,
    dropResponsesCommentary,
    customToolNames = new Set<string>(),
    requestToolIdentityMap = null,
  } = options;
  const signatureNamespace = connectionId;
  // Request-body-size metric (for monitoring payload size distribution & correlation with TTFT).
  // The size is JSON-serialised byte count; stored as a performance mark detail so monitoring
  // tools can query performance.getEntriesByType("mark") filtered by name.
  let bodySize = 0;
  try {
    bodySize = body ? Buffer.byteLength(JSON.stringify(body), "utf8") : 0;
  } catch {
    /* body may not be JSON-serialisable (e.g. FormData, Blob) — metric stays 0 */
  }
  if (bodySize > 0) {
    // Cleared immediately: this is a fixed-name mark created on every stream, so
    // leaving it in the global performance timeline would accumulate without bound
    // over a long-running server's lifetime. A wired PerformanceObserver still
    // receives the entry (delivery is queued independently of the buffer) even though
    // clearMarks() removes it from getEntriesByName()/getEntriesByType() right after.
    performance.mark("omni-request-body-size", { detail: bodySize });
    performance.clearMarks("omni-request-body-size");
  }

  // Canonical streaming timing (TTFT / ITL / interruption). One instance per
  // stream, marked from the transform below. ttft() = first-forwarded-SSE-chunk
  // latency (NOT token-level) — see streamTiming.ts.
  const timing: StreamTiming = createStreamTiming();
  /** Forward a pre-encoded SSE chunk, marking TTFT/ITL on the way. */
  const forward = (controller: TransformStreamDefaultController<Uint8Array>, bytes: Uint8Array) => {
    timing.markForward();
    controller.enqueue(bytes);
  };

  // Drop internal commentary-phase Responses output before forwarding (#6199).
  // Explicit option wins; otherwise read the feature flag (default on) — resolved once per stream.
  const shouldDropResponsesCommentary =
    dropResponsesCommentary ?? isFeatureFlagEnabled("RESPONSES_PASSTHROUGH_DROP_COMMENTARY");
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

  // Antigravity/cloudcode streams terminate naturally on their last
  // `data: {"response":{...}}` event, not on a `[DONE]` marker. Emitting
  // `[DONE]` to the Antigravity IDE causes a protobuf parse failure
  // (proto: syntax error (line 1:1): unexpected token [) because the
  // Go binary's protobuf deserializer receives `[DONE]` as input.
  const clientExpectsAntigravityStream =
    (mode === STREAM_MODE.PASSTHROUGH
      ? clientResponseFormat === FORMATS.ANTIGRAVITY
      : sourceFormat === FORMATS.ANTIGRAVITY) === true;

  // Single source of truth for the [DONE] decision, used at both emission
  // sites below. Only OpenAI Chat Completions clients expect [DONE];
  // Responses API, Anthropic SSE, and Antigravity/cloudcode terminate on
  // their own protocol events (response.completed / message_stop / last
  // response candidate respectively).
  const shouldEmitDoneTerminator =
    !clientExpectsResponsesStream && !clientExpectsClaudeStream && !clientExpectsAntigravityStream;

  let buffer = "";
  let usage: UsageLike | null = null;
  /** Passthrough (OpenAI CC shape): saw tool_calls in stream before finish_reason */
  let passthroughHasToolCalls = false;
  /** Passthrough: whether a chunk with non-null finish_reason was seen (#7800) */
  let passthroughSawFinishReason = false;
  /** Passthrough: accumulate tool_calls deltas for call log responseBody */
  const passthroughToolCalls = new Map<string, ToolCall>();
  let passthroughToolCallSeq = 0;
  const allowedToolNames = extractAllowedToolNames(body);
  let skipPassthroughEvent = false;
  const thinkState = initThinkState(mode === STREAM_MODE.PASSTHROUGH, provider, model);

  // State for translate mode (accumulatedContent for call log response body)
  const state: TranslateState | null =
    mode === STREAM_MODE.TRANSLATE
      ? {
          ...(initState(sourceFormat) as TranslateState),
          provider,
          toolNameMap,
          signatureNamespace,
          copilotCompatibleReasoning,
          suppressThinkClose,
          accumulatedContent: "",
          accumulatedReasoning: "",
          toolSchemas: extractToolSchemaMap(body),
          customToolNames,
          requestToolIdentityMap,
        }
      : null;

  // Tracks whether any valuable chunk was forwarded; empty at flush => retryable 502 (#9268)
  let forwardedValuableChunk = false;

  // Track content length for usage estimation (both modes)
  let totalContentLength = 0;
  // Passthrough: accumulate content and reasoning separately for call log response body
  let passthroughAccumulatedContent = "";
  let passthroughAccumulatedReasoning = "";
  let passthroughBufferedTextualToolCallContent = "";
  /** Passthrough: whether a usage block was already forwarded to the client (prevents double). */
  let passthroughForwardedUsage = false;
  // Passthrough Responses SSE: snapshots of items seen via `response.output_item.done`,
  // used to backfill `response.completed.response.output` when upstream returns it
  // empty (which happens when `store: false` — see backfillResponsesCompletedOutput).
  const passthroughResponsesOutputItems: unknown[] = [];
  const passthroughResponsesPendingFunctionCalls = new Map<string, JsonRecord>();
  let passthroughResponsesId: string | null = null;
  let passthroughLastChatId: string | null = null;
  let passthroughResponsesCurrentFunctionCallKey: string | null = null;
  const passthroughResponsesReasoningSummarySeen = new Set<string>();
  // #6199 — commentary-phase items announced via `response.output_item.added` are
  // internal. Their `response.output_text.delta`/`response.output_text.done`/
  // `response.output_item.done` events do not carry the `phase`, so we remember the
  // item id + output_index here and drop every matching follow-up event.
  const passthroughResponsesCommentaryItemIds = new Set<string>();
  const passthroughResponsesCommentaryIndexes = new Set<number>();
  const dropCommentary = createTranslateCommentaryFilter(targetFormat);
  // #5786 — highest Responses-API `sequence_number` already forwarded on this stream.
  // The Responses API guarantees a strictly increasing sequence_number, so any event at
  // or below this watermark is an upstream reconnect/retry replay and must be dropped —
  // otherwise the replayed deltas glue duplicated text into the client stream. Applies to
  // both translate mode (openai-responses → claude/openai) and Responses passthrough.
  let lastSeenResponsesSequenceNumber = -1;
  const isDuplicateResponsesSequence = (value: unknown): boolean => {
    if (typeof value !== "number" || !Number.isFinite(value)) return false;
    if (value <= lastSeenResponsesSequenceNumber) return true;
    lastSeenResponsesSequenceNumber = value;
    return false;
  };
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
  } catch {} // best-effort read of optional timing state — absence is normal

  // Guard against duplicate [DONE] events — ensures exactly one per stream
  let doneSent = false;
  let upstreamErrorForwarded = false;
  const providerPayloadCollector = createStructuredSSECollector({
    stage: "provider_response",
    // #9315: compute the summary live from every pushed chunk (not just the
    // ones that survive the storage cap below) so a long stream never shows a
    // stale/incomplete "provider response" in the dashboard.
    //
    // Real bug: this was unconditionally `sourceFormat` (the CLIENT's wire
    // format — see this function's own @param doc above). In TRANSLATE mode
    // the chunks pushed here are the RAW PROVIDER response, whose format is
    // `targetFormat` (@param "Provider format (for translate mode)"), not
    // sourceFormat. Whenever a client's format differs from the provider's
    // (e.g. a Responses-API client routed to a plain-OpenAI-chat-completions
    // upstream — the OpenClaw/opencode-zen case that surfaced this live), the
    // reducer picked for `sourceFormat` could never recognize the provider's
    // actual event shape, so it never left its empty initial state — the
    // dashboard's "Provider Response" panel permanently showed
    // `output: []`/empty while "Client Response" (built from
    // separately-accumulated state, unaffected by this) correctly showed full
    // content, reading as if the two panels simply disagreed. PASSTHROUGH
    // mode has no separate provider/client format split — nothing gets
    // translated, so the provider's raw chunks genuinely ARE in sourceFormat
    // (and real passthrough callers, e.g. createPassthroughStreamWithLogger,
    // don't even pass targetFormat) — keep using sourceFormat there.
    format: mode === STREAM_MODE.TRANSLATE ? targetFormat : sourceFormat,
    fallbackModel: model,
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
  // `event:` framing is only part of the SSE protocol for OpenAI Responses API
  // and Claude Messages API passthrough; a plain OpenAI Chat-Completions-format
  // client has no `event:` field at all, so it is dropped to stop upstream
  // control lines (`id:`/`event:`/`retry:`/`:` comments) leaking to the client
  // (#10017).
  const passthroughEventPrefix = createSSEEventPrefixBuffer({
    forwardEvent:
      clientResponseFormat === FORMATS.OPENAI_RESPONSES || clientResponseFormat === FORMATS.CLAUDE,
  });
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
      forward(controller, encoder.encode(output));
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
    forward(controller, encoder.encode(errOutput));
    timing.markInterrupted();
    let failureHandled = false;
    if (onFailure) {
      try {
        failureHandled = onFailure({ status: 502, message: msg, code: "empty_response" }) === true;
      } catch (e) {
        console.debug(`[STREAM] onFailure callback error (empty_response):`, e);
      }
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
      !hasValidUsage(itemSanitized.usage as UsageLike) &&
      totalContentLength > 0
    ) {
      const estimated = estimateUsage(body, totalContentLength, sourceFormat);
      itemSanitized.usage = timing.withTps(filterUsageForFormat(estimated, sourceFormat));
      state.usage = estimated;
    } else if (state?.finishReason && isFinishChunk && state.usage) {
      const buffered = addBufferToUsage(state.usage);
      itemSanitized.usage = timing.withTps(filterUsageForFormat(buffered, sourceFormat));
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
    forwardedValuableChunk = true;
    forward(controller, encoder.encode(output));
  };

  const emitFinalSseMetadata = async (
    controller: TransformStreamDefaultController,
    finalUsage: UsageTokenRecord | Record<string, unknown> | null | undefined
  ) => {
    // Skip SSE metadata comment lines when OMNIROUTE_SSE_COMMENTS is disabled
    // (e.g., "off", "false", "0", "no"). Strict OpenAI-compatible clients that
    // JSON.parse every SSE line will crash on `: x-omniroute-*` comment lines.
    if (!sseCommentsEnabled()) return;

    const costUsd = finalUsage
      ? await calculateCost(provider, model, normalizeTokenUsage(finalUsage))
      : 0;
    const comment = buildOmniRouteSseMetadataComment({
      provider,
      model,
      cacheHit: false,
      latencyMs: Date.now() - streamStartedAt,
      usage: timing.withTps(finalUsage),
      costUsd, ttftMs: timing.ttftMs(),
    });
    if (!comment) return;
    reqLogger?.appendConvertedChunk?.(comment);
    forward(controller, encoder.encode(comment));
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

    // #7176/#7243: only synthesize summary events from real upstream plaintext —
    // never mutate `item` and never fabricate alarming placeholder text for
    // encrypted-only reasoning (`encrypted_content` still forwards intact).
    const visibleSummary = getVisibleResponsesReasoningSummaryText(item);

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
      forward(controller, encoder.encode(output));
    }
  };

  const abortStreamFailure = createStreamFailureAborter({
    onFailure,
    onComplete,
    getUsage: () => state?.usage,
    timing,
    buildProviderPayload: () =>
      providerPayloadCollector.build(providerPayloadCollector.getSummary(), {
        includeEvents: false,
      }),
    buildClientPayload: (body) => clientPayloadCollector.build(body, { includeEvents: false }),
    clearIdleTimer,
    clearPendingRequest: clearPendingRequestFromStream,
    markPendingRequestCleared,
    model,
  });

  const emitTranslatedFailureAndAbort = (
    controller: TransformStreamDefaultController<Uint8Array>,
    payload: unknown
  ): boolean => {
    const failure = prepareTranslatedStreamFailure(payload);
    if (!failure) return false;
    providerPayloadCollector.push(failure.providerPayload);
    const output = formatTranslatedStreamError(failure.record, sourceFormat);
    reqLogger?.appendConvertedChunk?.(output);
    forward(controller, encoder.encode(output));
    upstreamErrorForwarded = true;
    doneSent = true;
    abortStreamFailure(controller, failure.internalFailure, failure.publicMessage, {
      notifyComplete: true,
    });
    return true;
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
                  timing.markInterrupted();
                  failureHandled =
                    onFailure({
                      status: HTTP_STATUS.GATEWAY_TIMEOUT,
                      message: timeoutMsg,
                      code: "stream_idle_timeout",
                      type: "timeout_error",
                    }) === true;
                } catch (e) {
                  console.debug(`[STREAM] onFailure callback error (idle_timeout):`, e);
                }
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
        const now = Date.now();
        timing.markByte();
        lastChunkTime = now;
        const text = decoder.decode(chunk, { stream: true });
        buffer += text;
        reqLogger?.appendProviderChunk?.(text);
        const nlIdx = buffer.lastIndexOf("\n");
        const lines = nlIdx >= 0 ? buffer.slice(0, nlIdx).split("\n") : [];
        if (nlIdx >= 0) buffer = buffer.slice(nlIdx + 1);

        for (const line of multilineSseDataLineNormalizer.normalize(lines)) {
          const trimmed = line.trim();

          // Passthrough mode: normalize and forward
          if (mode === STREAM_MODE.PASSTHROUGH) {
            let output: string;
            let injectedUsage = false;
            let clientPayload: unknown = null;
            let failurePayload: StreamFailurePayload | null = null;
            let publicFailureMessage: string | null = null;

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
                forward(controller, encoder.encode(pendingOutput));
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

            // #5786 — drop replayed Responses-API events (a re-sent event carrying an
            // already-seen sequence_number) so their deltas are not forwarded twice.
            if (
              parsedPassthroughData &&
              typeof parsedPassthroughData.type === "string" &&
              parsedPassthroughData.type.startsWith("response.") &&
              isDuplicateResponsesSequence(parsedPassthroughData.sequence_number)
            ) {
              clearPendingPassthroughEvent();
              continue;
            }

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
                const projectedFailure = projectStreamFailureEvent(parsed);
                if (projectedFailure) {
                  parsed = projectedFailure.publicPayload;
                  failurePayload = projectedFailure.internalFailure;
                  publicFailureMessage = projectedFailure.publicMessage;
                  output = `data: ${JSON.stringify(parsed)}\n\n`;
                  injectedUsage = true;
                }

                // Some upstream Responses-compatible providers leak an initial Chat Completions
                // bootstrap chunk (assistant role + empty content) before emitting proper
                // `response.*` events. That chunk is invalid on /v1/responses and breaks strict
                // clients like OpenCode, so drop it only for Responses-native consumers.

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
                if (sanitizeUsagePayloadForRequest(parsed, body, clientResponseFormat)) {
                  output = `data: ${JSON.stringify(parsed)}\n\n`;
                  injectedUsage = true;
                }
                if (isResponsesSSE) {
                  // #6199/#6561 — statefully drop internal commentary-phase output (see
                  // ./responsesCommentaryDrop.ts) and clear the buffered `event:` line
                  // for the same frame, or it flushes alone as an event-only SSE frame.
                  if (
                    shouldDropResponsesCommentary &&
                    shouldDropResponsesCommentaryEvent(
                      parsed as JsonRecord,
                      passthroughResponsesCommentaryItemIds,
                      passthroughResponsesCommentaryIndexes
                    )
                  ) {
                    clearPendingPassthroughEvent();
                    continue;
                  }

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
                          for (const event of responseToolCallEvents) {
                            clientPayloadCollector.push(event);
                          }
                          reqLogger?.appendConvertedChunk?.(output);
                          forward(controller, encoder.encode(output));
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
                    emitSyntheticResponsesReasoningSummary(controller, parsed);
                    pushUniqueResponsesOutputItems(passthroughResponsesOutputItems, [parsed.item]);
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
                  let responsesCommentaryStrippedFromCompleted = false;
                  if (
                    parsed.type === "response.completed" &&
                    Array.isArray(parsed.response?.output) &&
                    parsed.response.output.length > 0
                  ) {
                    // #10156 — an upstream may echo a `phase:"commentary"` item back
                    // inside a non-empty terminal `output` array even though its live
                    // SSE frames were already dropped above. Keep both representations
                    // consistent by applying the same drop here.
                    if (shouldDropResponsesCommentary) {
                      const { items, changed } = filterResponsesCommentaryFromItems(
                        parsed.response.output,
                        isResponsesCommentaryMessageItem
                      );
                      if (changed) {
                        parsed.response.output = items;
                        responsesCommentaryStrippedFromCompleted = true;
                      }
                    }
                    pushUniqueResponsesOutputItems(
                      passthroughResponsesOutputItems,
                      parsed.response.output
                    );
                  }
                  // #7936 — restore `namespace` + `name` fields on passthrough
                  // Responses function_call items for downstream Codex clients.
                  if (
                    parsed.type === "response.output_item.added" ||
                    parsed.type === "response.output_item.done" ||
                    parsed.type === "response.completed"
                  ) {
                    restoreResponsesPassthroughFunctionCallIdentity(
                      parsed as JsonRecord,
                      requestToolIdentityMap
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
                  // Belt-and-suspenders for #10156: filter the backfill buffer itself
                  // before it can seed an empty `response.completed.response.output`,
                  // in case a future code path pushes a commentary item into it
                  // without going through the response.completed branch above.
                  const backfillCandidates = shouldDropResponsesCommentary
                    ? filterResponsesCommentaryFromItems(
                        passthroughResponsesOutputItems,
                        isResponsesCommentaryMessageItem
                      ).items
                    : passthroughResponsesOutputItems;
                  const backfilled = backfillResponsesCompletedOutput(parsed, backfillCandidates);
                  const usageNormalized = normalizeUsage(parsed);
                  if (
                    stripped ||
                    backfilled ||
                    textualToolCallBackfilled ||
                    responsesIdsNormalized ||
                    usageNormalized ||
                    responsesCommentaryStrippedFromCompleted
                  ) {
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    injectedUsage = true;
                  }
                  // Passthrough mode never pushes a Responses SSE event into
                  // clientPayloadCollector on the common (non-tool-call, non-
                  // commentary) path -- only the textual-tool-call conversion
                  // branch above pushes its own synthesized events. Push just
                  // the fully-processed terminal `response.completed` (after
                  // the backfill/strip/tool-call-merge above, so it matches
                  // exactly what the client receives): that alone is enough
                  // for buildStreamSummaryFromEvents' reducer to recover a
                  // real Responses `id` + `output` for previous_response_id
                  // continuation storage (src/lib/db/responsesContinuationStore.ts).
                  // Pushing every delta here would double-count events the
                  // tool-call branch already pushes its own synthesized copy of.
                  if (parsed.type === "response.completed") {
                    clientPayloadCollector.push(parsed);
                  }
                } else if (isClaudeSSE) {
                  // Claude SSE: extract usage, track content, forward as-is
                  const thinkingSignatureInjected = injectThinkingSignature(parsed, provider);
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
                    passthroughAccumulatedReasoning = appendBoundedText(
                      passthroughAccumulatedReasoning,
                      parsed.delta.thinking
                    );
                  }
                  if (restoredToolName || thinkingSignatureInjected) {
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
                  if (
                    Array.isArray(parsed.choices) &&
                    (parsed.choices.length === 0 ||
                      (parsed.choices.length === 1 &&
                        parsed.choices[0]?.delta &&
                        typeof parsed.choices[0].delta === "object" &&
                        Object.keys(parsed.choices[0].delta).length === 0 &&
                        !parsed.choices[0]?.finish_reason))
                  ) {
                    const emptyChoicesUsage = extractUsage(parsed) ?? parsed.usage;
                    if (hasValidUsage(emptyChoicesUsage) && !passthroughForwardedUsage) {
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
                          const estimated = estimateUsage(
                            body,
                            totalContentLength,
                            sourceFormat || FORMATS.OPENAI
                          );
                          if (estimated?.prompt_tokens > 0) {
                            emptyChoicesUsage.prompt_tokens = estimated.prompt_tokens;
                            emptyChoicesUsage.total_tokens =
                              (emptyChoicesUsage.total_tokens ?? 0) + estimated.prompt_tokens;
                          }
                        }
                      }
                      usage = emptyChoicesUsage;
                      passthroughForwardedUsage = true;
                      output = `data: ${JSON.stringify(parsed)}\n\n`;
                      injectedUsage = true;
                      clientPayload = parsed;
                      clientPayloadCollector.push(clientPayload);
                      reqLogger?.appendConvertedChunk?.(output);
                      forward(controller, encoder.encode(output));
                      continue;
                    }

                    // If we already forwarded usage, drop any trailing empty-choices valid usage
                    if (passthroughForwardedUsage && hasValidUsage(emptyChoicesUsage)) {
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

                  if (!projectedFailure) {
                    parsed = sanitizeStreamingChunk(parsed);
                    if (
                      parsed &&
                      typeof parsed === "object" &&
                      !Array.isArray(parsed) &&
                      (parsed as Record<string, unknown>)[OMIT_STREAMING_CHUNK_MARKER] === true
                    ) {
                      continue;
                    }
                  }

                  const restoredOpenAIToolName = restoreOpenAIToolNames(parsed, toolNameMap);
                  const idFixed = hadNonStringTopLevelId ? false : fixInvalidId(parsed);

                  if (!projectedFailure && !hasValuableContent(parsed, FORMATS.OPENAI)) {
                    continue;
                  }

                  const delta = parsed.choices?.[0]?.delta;
                  let textualToolCallConverted = false;
                  let toolCallIdCoerced = false;
                  let splitMixedReasoningContent = false;
                  const thinkParsed = applyThinkTag(thinkState, delta);

                  // Split combined reasoning+content deltas into separate SSE events.
                  // Standard OpenAI streaming never mixes both fields in one delta;
                  // clients (e.g. LobeChat) may skip content when reasoning_content
                  // is present, causing the first content token to be lost.
                  if (delta?.reasoning_content && delta?.content) {
                    // Shallow-clone only the mutated fields instead of a full
                    // structuredClone — the original `parsed` is a JSON-derived
                    // object so spreading preserves every field while skipping
                    // the deep-clone overhead (GC pressure, polyfill fallback).
                    const reasoningChunk = {
                      ...parsed,
                      usage: undefined,
                      choices: [
                        {
                          ...parsed.choices[0],
                          delta: { ...parsed.choices[0].delta, content: undefined },
                          finish_reason: null,
                        },
                        ...parsed.choices.slice(1),
                      ],
                    };
                    const rOutput = `data: ${JSON.stringify(reasoningChunk)}\n\n`;
                    passthroughAccumulatedReasoning = appendBoundedText(
                      passthroughAccumulatedReasoning,
                      delta.reasoning_content
                    );
                    totalContentLength += delta.reasoning_content.length;
                    clientPayloadCollector.push(reasoningChunk);
                    reqLogger?.appendConvertedChunk?.(rOutput);
                    forward(controller, encoder.encode(rOutput));
                    delete delta.reasoning_content;
                    splitMixedReasoningContent = true;
                  }

                  // Track whether we need to re-serialize (separate from injectedUsage
                  // to avoid blocking subsequent finish_reason / usage mutations)
                  const needsReserialization =
                    splitMixedReasoningContent ||
                    thinkParsed ||
                    hadReasoningAlias ||
                    (delta?.content === "" && delta?.reasoning_content);

                  // T18: Track if we saw tool calls & accumulate for call log
                  if (delta?.tool_calls && delta.tool_calls.length > 0) {
                    passthroughHasToolCalls = true;
                    lastToolCallChunkTime = now;
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
                        try {
                          recordToolLatency(
                            provider || "unknown",
                            toolTs ? now - toolTs : null,
                            lastChunkTs ? now - lastChunkTs : null
                          );
                        } catch {} // best-effort telemetry — must never break the stream
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

                  // Remember the upstream's chat-completion id so synthetic chunks
                  // emitted at flush (e.g. the estimated usage-only chunk) carry the
                  // stream's real string id instead of null on the chat path
                  // (passthroughResponsesId is only ever set on the Responses path).
                  if (typeof parsed.id === "string" && parsed.id) {
                    passthroughLastChatId = parsed.id;
                  } else if (typeof parsed.id === "number") {
                    passthroughLastChatId = String(parsed.id);
                  }

                  if (isFinishChunk) {
                    passthroughSawFinishReason = true;
                  }

                  if (isFinishChunk && passthroughHasToolCalls) {
                    toolFinishTime = now;
                    try {
                      markToolFinish(sessionId);
                    } catch {} // best-effort bookkeeping write — a miss just skips latency correlation
                  }

                  // T18: Normalize finish_reason to 'tool_calls' if tool calls were used
                  if (
                    isFinishChunk &&
                    passthroughHasToolCalls &&
                    parsed.choices[0].finish_reason !== "tool_calls"
                  ) {
                    parsed.choices[0].finish_reason = "tool_calls";
                    // If we modify it, we must output the modified object. This used to
                    // piggyback on the estimated-usage rewrite below; with the estimate
                    // moved to flush() (#12151 follow-up) the rewrite must happen here.
                    // injectedUsage doubles as the "output already rewritten" latch —
                    // without it the raw line overwrites this rewrite further down.
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    injectedUsage = true;
                  }
                  // #12151 follow-up: do NOT inject estimated usage into the finish chunk.
                  // A genuine OpenAI upstream sends its usage in a trailing empty-choices
                  // chunk AFTER the finish; estimating here marked passthroughForwardedUsage
                  // and made the real trailing block get dropped in favor of the estimate
                  // (billing regression pinned by tests/unit/stream-utils.test.ts). The
                  // estimate is now emitted in flush(), only when the upstream stayed silent.
                  if (isFinishChunk && hasValidUsage(usage) && !passthroughForwardedUsage) {
                    const buffered = addBufferToUsage(usage);
                    parsed.usage = timing.withTps(filterUsageForFormat(buffered, sourceFormat || FORMATS.OPENAI));
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    passthroughForwardedUsage = true;
                    injectedUsage = true;
                  } else if (textualToolCallConverted) {
                    output = `data: ${JSON.stringify(parsed)}\n\n`;
                    injectedUsage = true;
                  } else if (
                    idFixed ||
                    needsReserialization ||
                    toolCallIdCoerced ||
                    hadNonStringToolCallId ||
                    hadNonStringTopLevelId ||
                    restoredOpenAIToolName
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
            forward(controller, encoder.encode(output));
            if (failurePayload) {
              abortStreamFailure(
                controller,
                failurePayload,
                publicFailureMessage || "Upstream failure"
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

          if (upstreamErrorForwarded) continue;

          if (emitTranslatedFailureAndAbort(controller, parsed)) return;

          // #5786 — drop replayed Responses-API events (identical/lower sequence_number
          // re-sent on an upstream reconnect) so their deltas are not glued twice into
          // the translated client stream.
          if (
            targetFormat === FORMATS.OPENAI_RESPONSES &&
            isDuplicateResponsesSequence((parsed as JsonRecord).sequence_number)
          ) {
            continue;
          }

          if (shouldDropResponsesCommentary && dropCommentary(parsed as JsonRecord)) continue;
          providerPayloadCollector.push(parsed);
          if (parsed && parsed.done) {
            continue;
          }
          sanitizeUsagePayloadForRequest(parsed, body, targetFormat);
          if (parsed.choices?.[0]?.delta?.tool_calls) {
            lastToolCallChunkTime = now;
          }
          if (parsed.choices?.[0]?.finish_reason === "tool_calls") {
            toolFinishTime = now;
            try {
              markToolFinish(sessionId);
            } catch {} // best-effort bookkeeping write — a miss just skips latency correlation
          }

          // Track content length and accumulate for call log (from raw provider chunk, so content is never missed)
          // Do this before translation so we capture content regardless of translator output shape

          // Claude format
          const claudeDelta = collectClaudeDelta(parsed.delta, state);
          totalContentLength += claudeDelta.contentLength;

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
            if (state?.accumulatedReasoning !== undefined)
              state.accumulatedReasoning = appendBoundedText(
                state.accumulatedReasoning,
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
              if (state?.accumulatedReasoning !== undefined)
                state.accumulatedReasoning = appendBoundedText(state.accumulatedReasoning, r);
            }
          }

          // Gemini / Cloud Code format - may have multiple parts
          // Cloud Code API wraps in { response: { candidates: [...] } }, so unwrap.
          // Only applies to Gemini-family formats — skip for OpenAI, Claude, etc.
          const isGeminiFormat =
            targetFormat === FORMATS.GEMINI || targetFormat === FORMATS.ANTIGRAVITY;
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
            claudeDelta.hasText ||
            typeof parsed.choices?.[0]?.delta?.content === "string" ||
            Boolean(getAnyReasoningValue(parsed.choices?.[0]?.delta));
          if (translateHasContent && !contentAfterToolSeen) {
            const toolTs = toolFinishTime || pendingToolFinishTime;
            const lastChunkTs = lastToolCallChunkTime;
            if (toolTs || lastChunkTs) {
              contentAfterToolSeen = true;
              try {
                recordToolLatency(
                  provider || "unknown",
                  toolTs ? now - toolTs : null,
                  lastChunkTs ? now - lastChunkTs : null
                );
              } catch {} // best-effort telemetry — must never break the stream
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
        if (upstreamErrorForwarded) {
          clearPendingRequestFromStream();
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
                forward(controller, encoder.encode(output));
              },
              pushProviderPayload: (payload: unknown) => providerPayloadCollector.push(payload),
              pushClientPayload: (payload: unknown) => clientPayloadCollector.push(payload),
              sanitizeUsagePayload: (payload: unknown) =>
                sanitizeUsagePayloadForRequest(payload as UsageLike, body, clientResponseFormat),
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
              restoreOpenAIToolNames: (parsed: JsonRecord) =>
                restoreOpenAIToolNames(parsed, toolNameMap),
              abortFailure: (failure: StreamFailurePayload, publicMessage: string) =>
                abortStreamFailure(controller, failure, publicMessage),
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
              let bufferedProjectedFailure: ReturnType<typeof projectStreamFailureEvent> = null;
              if (buffer.startsWith("data:") && !buffer.startsWith("data: ")) {
                output = "data: " + buffer.slice(5);
              }
              let bufferedPayload = parseSSELine(bufferedLine);
              if (bufferedPayload) {
                providerPayloadCollector.push(bufferedPayload);
                bufferedProjectedFailure = projectStreamFailureEvent(bufferedPayload);
                if (bufferedProjectedFailure) {
                  bufferedPayload = bufferedProjectedFailure.publicPayload;
                  output = `data: ${JSON.stringify(bufferedPayload)}\n\n`;
                }
                if (sanitizeUsagePayloadForRequest(bufferedPayload, body, clientResponseFormat))
                  output = `data: ${JSON.stringify(bufferedPayload)}\n\n`;
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
                    const idsNormalized = normalizeResponsesSseIds(flushedParsed);
                    const usageNormalized = normalizeUsage(flushedParsed);
                    if (idsNormalized || usageNormalized) {
                      output = `data: ${JSON.stringify(flushedParsed)}\n\n`;
                    }
                  } else if (!isClaude) {
                    const { changed: flushChanged, hasFinishReason } =
                      normalizeFinalOpenAIStreamChunk(flushedParsed, toolNameMap);
                    // #7800: track finish_reason in the flush path too, so a
                    // final chunk without trailing newline still suppresses the
                    // synthetic finish_reason synthesis.
                    if (hasFinishReason) passthroughSawFinishReason = true;
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
              forward(controller, encoder.encode(output));
              if (bufferedProjectedFailure) {
                abortStreamFailure(
                  controller,
                  bufferedProjectedFailure.internalFailure,
                  bufferedProjectedFailure.publicMessage
                );
                return;
              }
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
                const syntheticChunk = buildSyntheticChatChunk(passthroughResponsesId, model, {
                  content: passthroughBufferedTextualToolCallContent,
                });
                flushOutput = `data: ${JSON.stringify(syntheticChunk)}\n\n`;
              }
              reqLogger?.appendConvertedChunk?.(flushOutput);
              forward(controller, encoder.encode(flushOutput));
              passthroughAccumulatedContent = appendBoundedText(
                passthroughAccumulatedContent,
                passthroughBufferedTextualToolCallContent
              );
              passthroughBufferedTextualToolCallContent = "";
            }

            const accR = passthroughAccumulatedReasoning;
            const accC = passthroughAccumulatedContent;
            const thinkFlush = flushThink(thinkState, passthroughResponsesId, accR, accC);
            if (thinkFlush) {
              passthroughAccumulatedReasoning = thinkFlush.reasoning;
              passthroughAccumulatedContent = thinkFlush.content;
              totalContentLength += thinkFlush.addedLength;
              clientPayloadCollector.push(thinkFlush.syntheticChunk);
              reqLogger?.appendConvertedChunk?.(thinkFlush.flushOutput);
              forward(controller, encoder.encode(thinkFlush.flushOutput));
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
              // #7800: Some providers close the SSE stream without emitting a final
              // chunk carrying a non-null finish_reason. OpenAI spec requires the
              // terminal chunk to include finish_reason (e.g. "stop"); strict clients
              // (pi CLI) reject the stream with "Stream ended without finish_reason".
              // Synthesize a terminal chunk when the upstream omitted one.
              if (shouldEmitDoneTerminator && !passthroughSawFinishReason) {
                const syntheticFinishChunk = buildSyntheticChatChunk(
                  passthroughResponsesId,
                  model,
                  {},
                  passthroughHasToolCalls ? "tool_calls" : "stop"
                );
                const finishOutput = `data: ${JSON.stringify(syntheticFinishChunk)}\n\n`;
                reqLogger?.appendConvertedChunk?.(finishOutput);
                forward(controller, encoder.encode(finishOutput));
                clientPayloadCollector.push(syntheticFinishChunk);
              }
              // #12151: upstream never reported usage — emit the estimate as a
              // canonical OpenAI trailing usage-only chunk (empty choices) before
              // [DONE], so metered clients still see token counts. When the
              // upstream DID send usage (trailing or in-band), it was forwarded
              // already and passthroughForwardedUsage guards this off.
              if (shouldEmitDoneTerminator && !passthroughForwardedUsage && hasValidUsage(usage)) {
                const usageOnlyChunk = {
                  id: passthroughLastChatId ?? passthroughResponsesId ?? `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model,
                  choices: [],
                  usage: timing.withTps(filterUsageForFormat(usage, sourceFormat || FORMATS.OPENAI)),
                };
                const usageOutput = `data: ${JSON.stringify(usageOnlyChunk)}\n\n`;
                reqLogger?.appendConvertedChunk?.(usageOutput);
                forward(controller, encoder.encode(usageOutput));
                clientPayloadCollector.push(usageOnlyChunk);
                passthroughForwardedUsage = true;
              }
              await emitFinalSseMetadata(controller, usage);
              doneSent = true;
              if (shouldEmitDoneTerminator) {
                clientPayloadCollector.push({ done: true });
                const doneOutput = "data: [DONE]\n\n";
                reqLogger?.appendConvertedChunk?.(doneOutput);
                forward(controller, encoder.encode(doneOutput));
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
                } else if (passthroughHasToolCalls && !content.trim() && reasoning.trim()) {
                  message.content = "";
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
                  ttft: timing.ttftMs(),
                  itlMs: timing.avgItlMs(),
                  interrupted: timing.interrupted,
                  // #9315 switched the summary to the accumulated responseBody to avoid
                  // stale/truncated event data — but responseBody here is synthesized in
                  // chat-completion shape, which loses the Responses API `response` object.
                  // Keep the events-derived summary for OPENAI_RESPONSES only. responseBody
                  // itself never carries an `object` marker (it's built purely for the
                  // client, which doesn't need one) — the dashboard's Provider Response
                  // panel does, so stamp `object: "chat.completion"` on a shallow copy
                  // used only for this summary, leaving responseBody itself untouched.
                  providerPayload: providerPayloadCollector.build(
                    sourceFormat === FORMATS.OPENAI_RESPONSES
                      ? buildStreamSummaryFromEvents(
                          providerPayloadCollector.getEvents(),
                          sourceFormat,
                          model
                        )
                      : { object: "chat.completion", ...responseBody },
                    { includeEvents: false }
                  ),
                  // Same OPENAI_RESPONSES carve-out as providerPayload above, but keyed on
                  // clientResponseFormat (what the client actually receives) rather than
                  // sourceFormat (what the upstream sent) -- they're equal in passthrough
                  // mode but conceptually distinct. Without this, `entry.responseId` in
                  // src/lib/usage/callLogs.ts is always null for a Responses-API client
                  // (extractResponsesId reads `clientResponse.id`, which the chat-shaped
                  // responseBody never has), so previous_response_id continuation lookups
                  // in src/lib/db/responsesContinuationStore.ts always miss.
                  clientPayload: clientPayloadCollector.build(
                    clientResponseFormat === FORMATS.OPENAI_RESPONSES
                      ? buildStreamSummaryFromEvents(
                          clientPayloadCollector.getEvents(),
                          clientResponseFormat,
                          model
                        )
                      : responseBody,
                    { includeEvents: false }
                  ),
                });
              } catch (e) {
                console.debug(`[STREAM] onComplete callback error (${model || "unknown"}):`, e);
              }
            } else {
              clearPendingRequestFromStream();
            }
            return;
          }

          // Translate mode: process remaining buffer
          if (buffer.trim()) {
            const parsed = parseSSELine(buffer.trim());
            if (parsed && !parsed.done) {
              if (emitTranslatedFailureAndAbort(controller, parsed)) return;
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

            // Flush pending translation events BEFORE erroring the stream.
            // This lets the openai-responses translator emit a proper
            // `response.completed` with `status: "failed"` and close any
            // open items (reasoning, tool calls, etc.), instead of silently
            // aborting the stream and leaving partial items dangling.
            try {
              const flushed = translateResponse(targetFormat, sourceFormat, null, state);
              if (flushed?.length > 0) {
                for (const item of flushed) {
                  emitTranslatedClientItem(controller, item);
                }
              }
            } catch {
              // Swallow flush errors — the controller.error below is the
              // terminal signal for the client.
            }

            const errorBody = buildErrorBody(err.status, err.message);
            const publicErrorMessage = errorBody.error.message;
            abortStreamFailure(controller, err, publicErrorMessage, { notifyComplete: true });
            return;
          }

          // #9268: reject a translate-mode stream that forwarded no valuable chunk
          // (all-empty `choices: []`) instead of completing with an empty 200.
          if (
            mode === STREAM_MODE.TRANSLATE &&
            rejectEmptyChoicesStream({
              forwardedValuableChunk,
              hasValidUsage: hasValidUsage(state?.usage),
              providerPayloadCollector,
              clientPayloadCollector,
              targetFormat,
              model,
              usage: state?.usage,
              onFailure,
              onComplete,
              clearPendingRequestFromStream,
            })
          ) {
            controller.error(markPendingRequestCleared(buildEmptyChoicesStreamError()));
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
              forward(controller, encoder.encode(doneOutput));
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
                    .map((tc: Record<string, unknown>): ToolCall => ({
                      id: tc.id != null ? String(tc.id) : null,
                      index: (tc.index as number) ?? (tc.blockIndex as number) ?? 0,
                      type: (tc.type as string) ?? "function",
                      function: (tc.function as ToolCall["function"]) ?? {
                        name: (tc.name as string) ?? "",
                        arguments: "",
                      },
                    }))
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
              const reasoning = (state?.accumulatedReasoning ?? "").trim();
              const message: Record<string, unknown> = {
                role: "assistant",
                content: content || null,
              };
              if (reasoning) {
                message.reasoning_content = reasoning;
              }
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
                // Same OPENAI_RESPONSES carve-out as the passthrough branch above —
                // the synthesized chat-shaped responseBody drops the `response` object,
                // and (like the passthrough branch) never carries an `object` marker at
                // all — stamp `object: "chat.completion"` on a shallow copy used only
                // for this summary; responseBody itself (sent to the client / below)
                // stays untouched.
                providerPayload: providerPayloadCollector.build(
                  targetFormat === FORMATS.OPENAI_RESPONSES
                    ? buildStreamSummaryFromEvents(
                        providerPayloadCollector.getEvents(),
                        targetFormat,
                        model
                      )
                    : { object: "chat.completion", ...responseBody },
                  { includeEvents: false }
                ),
                // Same OPENAI_RESPONSES carve-out as providerPayload above and the
                // passthrough branch's onComplete, but keyed on sourceFormat (what the
                // client requested/receives in translate mode) rather than targetFormat
                // (what the upstream provider speaks) -- translateResponse(targetFormat,
                // sourceFormat, ...) above confirms that direction. emitTranslatedClientItem
                // already pushes every client-visible translated item into
                // clientPayloadCollector unconditionally, so the events are already there;
                // this only fixes what gets built from them.
                clientPayload: clientPayloadCollector.build(
                  sourceFormat === FORMATS.OPENAI_RESPONSES
                    ? buildStreamSummaryFromEvents(
                        clientPayloadCollector.getEvents(),
                        sourceFormat,
                        model
                      )
                    : responseBody,
                  { includeEvents: false }
                ),
              });
            } catch (e) {
              console.debug(
                `[STREAM] onComplete callback error in flush (${model || "unknown"}):`,
                e
              );
            }
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
  onFailure: ((payload: StreamFailurePayload) => boolean | void | Promise<void>) | null = null,
  copilotCompatibleReasoning = false,
  suppressThinkClose = false,
  customToolNames: ReadonlySet<string> = new Set(),
  requestToolIdentityMap: Map<string, { namespace: string; name: string }> | null = null
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
    suppressThinkClose,
    customToolNames,
    requestToolIdentityMap,
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
  onFailure: ((payload: StreamFailurePayload) => boolean | void | Promise<void>) | null = null,
  clientResponseFormat: string | null = null,
  requestToolIdentityMap: Map<string, { namespace: string; name: string }> | null = null
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
    requestToolIdentityMap,
  });
}

export { COLORS } from "./usageTracking.ts";
