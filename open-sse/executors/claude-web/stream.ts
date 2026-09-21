import { createHash, randomUUID } from "crypto";

import { buildErrorBody } from "../../utils/error.ts";
import type { ExecutorLog } from "../base.ts";

export interface ClaudeWebStreamOptions {
  model: string;
  stream: boolean;
  endpointSuffix?: "completion" | "retry_completion";
  responseMetadata: Record<string, string>;
  onComplete(result: { assistantText: string; stopReason: string }): void;
  onFailure(): void;
  log?: ExecutorLog | null;
}

type StreamPhase = "awaiting_message" | "in_message" | "stopped" | "failed";
type BlockKind = "thinking" | "redacted_thinking" | "text" | "tool_use";
type ParserPhase = "sse_decode" | "event_decode" | "protocol_dispatch" | "stream_terminal";
type ProtocolErrorCategory =
  | "size_limit"
  | "malformed_event"
  | "invalid_order"
  | "unknown_event"
  | "unsupported_block"
  | "unsupported_delta"
  | "upstream_error"
  | "premature_done"
  | "premature_eof"
  | "internal_error";
const MAX_CLAUDE_WEB_SSE_PENDING_CHARS = 1024 * 1024;
type SemanticEvent =
  | { kind: "content"; text: string }
  | { kind: "reasoning"; text: string }
  | { kind: "tool_call"; index: number; id: string; name: string; input: string }
  | { kind: "metadata"; eventType: string; data: Record<string, unknown> }
  | { kind: "finish"; stopReason: string };

interface ToolBlockInfo {
  id: string;
  name: string;
  inputParts: string[];
  initialInput: string;
}

const KNOWN_METADATA_EVENTS = new Set([
  "ping",
  "completion",
  "message_limit",
  "content_block_retract",
  "model_fallback",
  "model_update",
  "compaction_status",
  "conversation_ready",
  "cache_performance",
  "tool_approval",
]);

const METADATA_EVENT_FIELDS: Record<string, readonly string[]> = {
  ping: ["latency_ms"],
  completion: [],
  message_limit: ["remaining", "limit", "reset_at"],
  content_block_retract: ["index"],
  model_fallback: ["model", "fallback_model"],
  model_update: ["model"],
  compaction_status: ["status"],
  conversation_ready: ["status"],
  cache_performance: ["hit", "read_tokens", "write_tokens"],
  tool_approval: ["status"],
};

interface StreamControl {
  reader: ReadableStreamDefaultReader<Uint8Array> | null;
  cancelled: boolean;
}

class ClaudeWebProtocolError extends Error {
  readonly diagnostic: ClaudeWebProtocolDiagnostic;

  constructor(message: string, diagnostic: ClaudeWebProtocolDiagnostic) {
    super(message);
    this.name = "ClaudeWebProtocolError";
    this.diagnostic = diagnostic;
  }
}

interface ClaudeWebProtocolDiagnostic {
  category: ProtocolErrorCategory;
  phase: ParserPhase;
  eventKind?: string;
  eventKindHash?: string;
  blockKind?: BlockKind | "unrecognized";
  blockKindHash?: string;
  deltaKind?: string;
  deltaKindHash?: string;
  index?: number;
  upstreamErrorType?: string;
  upstreamErrorCode?: string;
  upstreamErrorHash?: string;
  exceptionHash?: string;
  parserState?: {
    phase: StreamPhase;
    openBlockCount: number;
  };
}

const ALLOWED_EVENT_KINDS = new Set([
  "message_start",
  "content_block_start",
  "content_block_delta",
  "content_block_stop",
  "message_delta",
  "message_stop",
  "error",
  ...KNOWN_METADATA_EVENTS,
]);
const ALLOWED_DELTA_KINDS = new Set([
  "text_delta",
  "thinking_delta",
  "thinking_summary_delta",
  "signature_delta",
  "input_json_delta",
]);
const ALLOWED_UPSTREAM_ERROR_TYPES = new Set([
  "api_error",
  "authentication_error",
  "billing_error",
  "invalid_request_error",
  "overloaded_error",
  "permission_error",
  "rate_limit_error",
  "request_too_large",
]);
const ALLOWED_UPSTREAM_ERROR_CODES = new Set([
  "authentication_error",
  "billing_error",
  "invalid_request",
  "overloaded",
  "permission_denied",
  "rate_limit",
  "request_too_large",
]);

function stableDiagnosticHash(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function safeKnownKind(value: unknown, allowlist: ReadonlySet<string>): string | undefined {
  return typeof value === "string" && allowlist.has(value) ? value : undefined;
}

function errorWithState(
  error: unknown,
  state: ProtocolState,
  fallbackPhase: ParserPhase = "protocol_dispatch"
): ClaudeWebProtocolError {
  const parserState = { phase: state.phase, openBlockCount: state.openBlocks.size };
  if (error instanceof ClaudeWebProtocolError) {
    error.diagnostic.parserState ??= parserState;
    return error;
  }
  const name = error instanceof Error ? error.name : typeof error;
  const message = error instanceof Error ? error.message : String(error);
  return new ClaudeWebProtocolError("Unexpected Claude Web parser failure", {
    category: "internal_error",
    phase: fallbackPhase,
    parserState,
    exceptionHash: stableDiagnosticHash(`${name}:${message}`),
  });
}

async function* decodeSseData(
  source: ReadableStream<Uint8Array>,
  control: StreamControl
): AsyncGenerator<string, void, void> {
  const reader = source.getReader();
  control.reader = reader;
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines: string[] = [];
  let dataChars = 0;
  let reachedEof = false;

  const consumeLine = (rawLine: string): string | null => {
    if (rawLine.length > MAX_CLAUDE_WEB_SSE_PENDING_CHARS) {
      throw new ClaudeWebProtocolError("SSE line exceeded the size limit", {
        category: "size_limit",
        phase: "sse_decode",
      });
    }
    const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
    if (line === "") {
      if (dataLines.length === 0) return null;
      const data = dataLines.join("\n");
      dataLines = [];
      dataChars = 0;
      return data;
    }
    if (line.startsWith(":")) return null;

    const separatorIndex = line.indexOf(":");
    const field = separatorIndex < 0 ? line : line.slice(0, separatorIndex);
    let value = separatorIndex < 0 ? "" : line.slice(separatorIndex + 1);
    if (value.startsWith(" ")) value = value.slice(1);
    if (field === "data") {
      dataChars += value.length + (dataLines.length > 0 ? 1 : 0);
      if (dataChars > MAX_CLAUDE_WEB_SSE_PENDING_CHARS) {
        throw new ClaudeWebProtocolError("SSE event exceeded the size limit", {
          category: "size_limit",
          phase: "sse_decode",
        });
      }
      dataLines.push(value);
    }
    return null;
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reachedEof = true;
        break;
      }
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex = buffer.indexOf("\n");
      while (newlineIndex >= 0) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        const frame = consumeLine(line);
        if (frame !== null) yield frame;
        newlineIndex = buffer.indexOf("\n");
      }
      if (buffer.length > MAX_CLAUDE_WEB_SSE_PENDING_CHARS) {
        throw new ClaudeWebProtocolError("SSE line exceeded the size limit", {
          category: "size_limit",
          phase: "sse_decode",
        });
      }
    }

    buffer += decoder.decode();
    if (buffer) {
      const frame = consumeLine(buffer);
      if (frame !== null) yield frame;
    }
    const finalFrame = consumeLine("");
    if (finalFrame !== null) yield finalFrame;
  } finally {
    if (!reachedEof) await reader.cancel().catch(() => {});
    if (control.reader === reader) control.reader = null;
    try {
      reader.releaseLock();
    } catch {
      // The source may already have released its reader after an abort.
    }
  }
}

function safeMetadataValue(value: unknown): string | number | boolean | null | undefined {
  if (value === null) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.length <= 128 && /^[A-Za-z0-9._:+/@-]+$/.test(value)) {
    return value;
  }
  return undefined;
}

function projectMetadataEvent(
  eventType: string,
  event: Record<string, unknown>
): Record<string, unknown> {
  const projected: Record<string, unknown> = { type: eventType };
  for (const field of METADATA_EVENT_FIELDS[eventType] ?? []) {
    const value = safeMetadataValue(event[field]);
    if (value !== undefined) projected[field] = value;
  }
  return projected;
}

function requireRecord(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ClaudeWebProtocolError(`${context} must be an object`, {
      category: "malformed_event",
      phase: "protocol_dispatch",
    });
  }
  return value as Record<string, unknown>;
}

function requireBlockIndex(event: Record<string, unknown>): number {
  if (!Number.isInteger(event.index) || (event.index as number) < 0) {
    throw new ClaudeWebProtocolError("Content block index is invalid", {
      category: "malformed_event",
      phase: "protocol_dispatch",
    });
  }
  return event.index as number;
}

function deltaText(delta: Record<string, unknown>, fields: string[]): string {
  for (const field of fields) {
    const value = delta[field];
    if (typeof value === "string") return value;
  }
  throw new ClaudeWebProtocolError("Content delta text is invalid", {
    category: "malformed_event",
    phase: "protocol_dispatch",
  });
}

function thinkingSummaryText(delta: Record<string, unknown>): string {
  if (typeof delta.summary === "string") return delta.summary;
  if (delta.summary && typeof delta.summary === "object" && !Array.isArray(delta.summary)) {
    return deltaText(delta.summary as Record<string, unknown>, ["summary", "text", "thinking"]);
  }
  return deltaText(delta, ["text", "thinking"]);
}

interface ProtocolState {
  phase: StreamPhase;
  openBlocks: Map<number, BlockKind>;
  toolBlocks: Map<number, ToolBlockInfo>;
  stopReason: string;
}

function protocolFailure(
  state: ProtocolState,
  message: string,
  diagnostic: Omit<ClaudeWebProtocolDiagnostic, "parserState">
): never {
  const parserState = { phase: state.phase, openBlockCount: state.openBlocks.size };
  state.phase = "failed";
  throw new ClaudeWebProtocolError(message, {
    ...diagnostic,
    parserState,
  });
}

function assertInMessage(
  state: ProtocolState,
  eventType: string,
  blocksMustBeClosed = false
): void {
  if (state.phase !== "in_message" || (blocksMustBeClosed && state.openBlocks.size > 0)) {
    protocolFailure(state, `${eventType} is out of order`, {
      category: "invalid_order",
      phase: "protocol_dispatch",
      eventKind: safeKnownKind(eventType, ALLOWED_EVENT_KINDS),
    });
  }
}

function parseProtocolEvent(
  data: string,
  state: ProtocolState
): { event: Record<string, unknown>; eventType: string } {
  let event: Record<string, unknown>;
  try {
    event = requireRecord(JSON.parse(data), "SSE event");
  } catch (error) {
    if (error instanceof ClaudeWebProtocolError) throw error;
    protocolFailure(state, "SSE event contains malformed JSON", {
      category: "malformed_event",
      phase: "event_decode",
    });
  }

  const eventType = event.type;
  if (typeof eventType !== "string" || !eventType) {
    protocolFailure(state, "SSE event type is missing", {
      category: "malformed_event",
      phase: "event_decode",
    });
  }
  return { event, eventType };
}

function handleMessageStart(state: ProtocolState): null {
  if (state.phase !== "awaiting_message") {
    protocolFailure(state, "message_start is out of order", {
      category: "invalid_order",
      phase: "protocol_dispatch",
      eventKind: "message_start",
    });
  }
  state.phase = "in_message";
  return null;
}

function blockKind(block: Record<string, unknown>): BlockKind | null {
  if (block.type === "thinking") return "thinking";
  if (block.type === "redacted_thinking") return "redacted_thinking";
  if (block.type === "text") return "text";
  if (block.type === "tool_use") return "tool_use";
  return null;
}

function handleContentBlockStart(
  event: Record<string, unknown>,
  state: ProtocolState
): SemanticEvent | null {
  assertInMessage(state, "content_block_start");
  const index = requireBlockIndex(event);
  if (state.openBlocks.has(index)) {
    protocolFailure(state, "Content block was opened twice", {
      category: "invalid_order",
      phase: "protocol_dispatch",
      eventKind: "content_block_start",
      index,
    });
  }

  const contentBlock = requireRecord(event.content_block, "content_block");
  const kind = blockKind(contentBlock);
  if (!kind) {
    const rawKind = typeof contentBlock.type === "string" ? contentBlock.type : "";
    protocolFailure(state, "Unsupported Claude Web content block", {
      category: "unsupported_block",
      phase: "protocol_dispatch",
      eventKind: "content_block_start",
      blockKind: "unrecognized",
      index,
      ...(rawKind ? { blockKindHash: stableDiagnosticHash(rawKind) } : {}),
    });
  }
  state.openBlocks.set(index, kind);

  if (kind === "tool_use") {
    const id = typeof contentBlock.id === "string" ? contentBlock.id : "";
    const name = typeof contentBlock.name === "string" ? contentBlock.name : "";
    let initialInput = "";
    if (contentBlock.input !== undefined) {
      try {
        initialInput = JSON.stringify(contentBlock.input);
      } catch {
        initialInput = "";
      }
    }
    state.toolBlocks.set(index, { id, name, inputParts: [], initialInput });
    return null;
  }

  return kind === "thinking" ? { kind: "reasoning", text: "" } : null;
}

function handleContentBlockDelta(
  event: Record<string, unknown>,
  state: ProtocolState
): SemanticEvent | null {
  assertInMessage(state, "content_block_delta");
  const index = requireBlockIndex(event);
  const block = state.openBlocks.get(index);
  if (!block) {
    protocolFailure(state, "Content delta has no open block", {
      category: "invalid_order",
      phase: "protocol_dispatch",
      eventKind: "content_block_delta",
      index,
    });
  }

  const delta = requireRecord(event.delta, "delta");
  if (delta.type === "text_delta" && block === "text") {
    return { kind: "content", text: deltaText(delta, ["text"]) };
  }
  if (delta.type === "thinking_delta" && block === "thinking") {
    return { kind: "reasoning", text: deltaText(delta, ["thinking", "text"]) };
  }
  if (delta.type === "thinking_summary_delta" && block === "thinking") {
    return { kind: "reasoning", text: thinkingSummaryText(delta) };
  }
  if (delta.type === "signature_delta" && block === "thinking") {
    // Signatures are opaque replay metadata. Validate their shape, but never emit or log them.
    deltaText(delta, ["signature"]);
    return null;
  }
  if (delta.type === "input_json_delta" && block === "tool_use") {
    const toolBlock = state.toolBlocks.get(index);
    if (!toolBlock) {
      protocolFailure(state, "input_json_delta has no tool block state", {
        category: "invalid_order",
        phase: "protocol_dispatch",
        eventKind: "content_block_delta",
        blockKind: block,
        deltaKind: "input_json_delta",
        index,
      });
    }
    if (typeof delta.partial_json === "string") {
      toolBlock.inputParts.push(delta.partial_json);
    }
    return null;
  }
  const rawDeltaKind = typeof delta.type === "string" ? delta.type : "";
  return protocolFailure(state, "Content delta type does not match its block", {
    category: "unsupported_delta",
    phase: "protocol_dispatch",
    eventKind: "content_block_delta",
    blockKind: block,
    deltaKind: safeKnownKind(rawDeltaKind, ALLOWED_DELTA_KINDS) ?? "unrecognized",
    ...(rawDeltaKind && !ALLOWED_DELTA_KINDS.has(rawDeltaKind)
      ? { deltaKindHash: stableDiagnosticHash(rawDeltaKind) }
      : {}),
    index,
  });
}

function handleContentBlockStop(
  event: Record<string, unknown>,
  state: ProtocolState
): SemanticEvent | null {
  assertInMessage(state, "content_block_stop");
  const index = requireBlockIndex(event);
  const kind = state.openBlocks.get(index);
  if (!kind) {
    protocolFailure(state, "Content block stop has no open block", {
      category: "invalid_order",
      phase: "protocol_dispatch",
      eventKind: "content_block_stop",
      index,
    });
  }
  state.openBlocks.delete(index);

  if (kind === "tool_use") {
    const toolBlock = state.toolBlocks.get(index);
    state.toolBlocks.delete(index);
    if (!toolBlock) {
      protocolFailure(state, "Tool block stop has no tool state", {
        category: "invalid_order",
        phase: "protocol_dispatch",
        eventKind: "content_block_stop",
        blockKind: kind,
        index,
      });
    }

    let inputStr = "";
    if (toolBlock.inputParts.length > 0) {
      inputStr = toolBlock.inputParts.join("");
    } else if (toolBlock.initialInput) {
      inputStr = toolBlock.initialInput;
    }

    return { kind: "tool_call", index, id: toolBlock.id, name: toolBlock.name, input: inputStr };
  }

  return null;
}

function handleMessageDelta(event: Record<string, unknown>, state: ProtocolState): null {
  assertInMessage(state, "message_delta", true);
  const delta = requireRecord(event.delta, "message_delta.delta");
  const stopReason = delta.stop_reason;
  if (stopReason === null || stopReason === undefined) return null;
  if (typeof stopReason !== "string" || !stopReason) {
    protocolFailure(state, "Stop reason is invalid", {
      category: "malformed_event",
      phase: "protocol_dispatch",
      eventKind: "message_delta",
    });
  }
  state.stopReason = stopReason;
  return null;
}

function handleMessageStop(state: ProtocolState): SemanticEvent {
  assertInMessage(state, "message_stop", true);
  state.phase = "stopped";
  return { kind: "finish", stopReason: state.stopReason };
}

function dispatchProtocolEvent(
  eventType: string,
  event: Record<string, unknown>,
  state: ProtocolState
): SemanticEvent | null {
  switch (eventType) {
    case "message_start":
      return handleMessageStart(state);
    case "content_block_start":
      return handleContentBlockStart(event, state);
    case "content_block_delta":
      return handleContentBlockDelta(event, state);
    case "content_block_stop":
      return handleContentBlockStop(event, state);
    case "message_delta":
      return handleMessageDelta(event, state);
    case "message_stop":
      return handleMessageStop(state);
    case "error":
      return upstreamProtocolFailure(state, event);
    default:
      return protocolFailure(state, "Unknown Claude Web stream event", {
        category: "unknown_event",
        phase: "protocol_dispatch",
        eventKind: "unrecognized",
        eventKindHash: stableDiagnosticHash(eventType),
      });
  }
}

function upstreamProtocolFailure(state: ProtocolState, event: Record<string, unknown>): never {
  const upstream =
    event.error && typeof event.error === "object" && !Array.isArray(event.error)
      ? (event.error as Record<string, unknown>)
      : {};
  const rawType = typeof upstream.type === "string" ? upstream.type : "";
  const rawCode = typeof upstream.code === "string" ? upstream.code : "";
  const upstreamErrorType = safeKnownKind(rawType, ALLOWED_UPSTREAM_ERROR_TYPES);
  const upstreamErrorCode = safeKnownKind(rawCode, ALLOWED_UPSTREAM_ERROR_CODES);
  const unknownIdentity = [upstreamErrorType ? "" : rawType, upstreamErrorCode ? "" : rawCode].join(
    ":"
  );
  return protocolFailure(state, "Upstream reported a stream error", {
    category: "upstream_error",
    phase: "protocol_dispatch",
    eventKind: "error",
    ...(upstreamErrorType ? { upstreamErrorType } : {}),
    ...(upstreamErrorCode ? { upstreamErrorCode } : {}),
    ...(unknownIdentity !== ":"
      ? { upstreamErrorHash: stableDiagnosticHash(unknownIdentity) }
      : {}),
  });
}

async function* parseClaudeWebEvents(
  source: ReadableStream<Uint8Array>,
  control: StreamControl
): AsyncGenerator<SemanticEvent, void, void> {
  const state: ProtocolState = {
    phase: "awaiting_message",
    openBlocks: new Map(),
    toolBlocks: new Map(),
    stopReason: "end_turn",
  };

  try {
    for await (const data of decodeSseData(source, control)) {
      if (data === "[DONE]") {
        protocolFailure(state, "DONE arrived before message_stop", {
          category: "premature_done",
          phase: "stream_terminal",
        });
      }

      const { event, eventType } = parseProtocolEvent(data, state);
      if (KNOWN_METADATA_EVENTS.has(eventType)) {
        yield { kind: "metadata", eventType, data: projectMetadataEvent(eventType, event) };
        continue;
      }

      const semanticEvent = dispatchProtocolEvent(eventType, event, state);
      if (!semanticEvent) continue;
      yield semanticEvent;
      if (semanticEvent.kind === "finish") return;
    }

    if (control.cancelled) return;
    protocolFailure(state, "Claude Web stream ended before message_stop", {
      category: "premature_eof",
      phase: "stream_terminal",
    });
  } catch (error) {
    throw errorWithState(error, state);
  }
}

function openAiFinishReason(stopReason: string): string {
  if (stopReason === "max_tokens") return "length";
  if (stopReason === "tool_use") return "tool_calls";
  return "stop";
}

function makeChunk(
  id: string,
  created: number,
  options: ClaudeWebStreamOptions,
  delta: Record<string, unknown>,
  finishReason: string | null,
  event?: { type: string; data: Record<string, unknown> }
): Record<string, unknown> {
  return {
    id,
    object: "chat.completion.chunk",
    created,
    model: options.model,
    choices: [
      {
        index: 0,
        delta,
        finish_reason: finishReason,
        logprobs: null,
      },
    ],
    claude_web: {
      ...options.responseMetadata,
      ...(event ? { event } : {}),
    },
  };
}

function protocolErrorBody(): Record<string, unknown> {
  const body = buildErrorBody(502, "Claude Web stream protocol error", undefined, {
    type: "upstream_protocol_error",
    code: "claude_web_protocol_error",
  });
  return body as unknown as Record<string, unknown>;
}

function protocolDiagnosticForLog(
  error: unknown,
  options: ClaudeWebStreamOptions
): Record<string, unknown> {
  const endpointSuffix =
    options.endpointSuffix === "completion" || options.endpointSuffix === "retry_completion"
      ? options.endpointSuffix
      : "unknown";
  if (error instanceof ClaudeWebProtocolError) {
    return { endpointSuffix, ...error.diagnostic };
  }
  const name = error instanceof Error ? error.name : typeof error;
  const message = error instanceof Error ? error.message : String(error);
  return {
    endpointSuffix,
    category: "internal_error",
    phase: "protocol_dispatch",
    exceptionHash: stableDiagnosticHash(`${name}:${message}`),
  };
}

function logProtocolFailure(error: unknown, options: ClaudeWebStreamOptions): void {
  options.log?.error?.(
    "CLAUDE-WEB-STREAM",
    `Claude Web stream protocol validation failed ${JSON.stringify(
      protocolDiagnosticForLog(error, options)
    )}`
  );
}

function responseHeaders(contentType: string, metadata: Record<string, string>): Headers {
  const charsetAware = contentType.includes("charset")
    ? contentType
    : `${contentType}; charset=utf-8`;
  const headers = new Headers({
    "Content-Type": charsetAware,
    "Cache-Control": "no-cache",
  });
  const headerNames: Record<string, string> = {
    operation: "X-OmniRoute-Claude-Web-Operation",
    conversation_id: "X-OmniRoute-Claude-Web-Conversation-Id",
    parent_message_uuid: "X-OmniRoute-Claude-Web-Parent-Message-Uuid",
    assistant_message_uuid: "X-OmniRoute-Claude-Web-Assistant-Message-Uuid",
  };
  for (const [key, headerName] of Object.entries(headerNames)) {
    const value = metadata[key];
    if (value) headers.set(headerName, value.replace(/[\r\n]/g, ""));
  }
  return headers;
}

function notifyFailure(options: ClaudeWebStreamOptions): void {
  try {
    options.onFailure();
  } catch {
    options.log?.error?.("CLAUDE-WEB-STREAM", "Failure callback threw an error");
  }
}

function notifyComplete(
  options: ClaudeWebStreamOptions,
  result: { assistantText: string; stopReason: string }
): void {
  try {
    options.onComplete(result);
  } catch {
    options.log?.error?.("CLAUDE-WEB-STREAM", "Completion callback threw an error");
  }
}

async function createBufferedResponse(
  source: ReadableStream<Uint8Array>,
  options: ClaudeWebStreamOptions
): Promise<Response> {
  const id = `chatcmpl-${randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  let assistantText = "";
  let reasoningText = "";
  let stopReason = "end_turn";
  const toolCalls: Array<{ id: string; name: string; input: string }> = [];
  const metadataEvents: Array<{ type: string; data: Record<string, unknown> }> = [];
  const control: StreamControl = { reader: null, cancelled: false };

  try {
    for await (const event of parseClaudeWebEvents(source, control)) {
      if (event.kind === "content") assistantText += event.text;
      if (event.kind === "reasoning") reasoningText += event.text;
      if (event.kind === "tool_call") {
        toolCalls.push({ id: event.id, name: event.name, input: event.input });
      }
      if (event.kind === "metadata") {
        metadataEvents.push({ type: event.eventType, data: event.data });
      }
      if (event.kind === "finish") stopReason = event.stopReason;
    }
    notifyComplete(options, { assistantText, stopReason });

    const message: Record<string, unknown> = {
      role: "assistant",
      content: assistantText || null,
      ...(reasoningText ? { reasoning_content: reasoningText } : {}),
    };

    if (toolCalls.length > 0) {
      message.tool_calls = toolCalls.map((tc) => ({
        id: tc.id,
        type: "function",
        function: { name: tc.name, arguments: tc.input },
      }));
    }

    return new Response(
      JSON.stringify({
        id,
        object: "chat.completion",
        created,
        model: options.model,
        choices: [
          {
            index: 0,
            message,
            finish_reason: openAiFinishReason(stopReason),
            logprobs: null,
          },
        ],
        claude_web: {
          ...options.responseMetadata,
          events: metadataEvents,
        },
      }),
      {
        status: 200,
        headers: responseHeaders("application/json", options.responseMetadata),
      }
    );
  } catch (error) {
    logProtocolFailure(error, options);
    notifyFailure(options);
    return new Response(JSON.stringify(protocolErrorBody()), {
      status: 502,
      headers: responseHeaders("application/json", options.responseMetadata),
    });
  }
}

interface StreamingState {
  encoder: TextEncoder;
  id: string;
  created: number;
  control: StreamControl;
  iterator: AsyncIterator<SemanticEvent, void, void>;
  pendingChunks: Uint8Array[];
  assistantText: string;
  outcome: "pending" | "completed" | "failed";
  terminal: boolean;
  closed: boolean;
}

function encodeStreamEvent(state: StreamingState, value: Record<string, unknown>): Uint8Array {
  return state.encoder.encode(`data: ${JSON.stringify(value)}\n\n`);
}

function failStreamOnce(state: StreamingState, options: ClaudeWebStreamOptions): void {
  if (state.outcome !== "pending") return;
  state.outcome = "failed";
  notifyFailure(options);
}

function closeStreamIfDrained(
  state: StreamingState,
  controller: ReadableStreamDefaultController<Uint8Array>
): void {
  if (!state.closed && state.terminal && state.pendingChunks.length === 0) {
    state.closed = true;
    controller.close();
  }
}

function flushStreamChunk(
  state: StreamingState,
  controller: ReadableStreamDefaultController<Uint8Array>
): boolean {
  const chunk = state.pendingChunks.shift();
  if (!chunk) {
    closeStreamIfDrained(state, controller);
    return false;
  }
  controller.enqueue(chunk);
  closeStreamIfDrained(state, controller);
  return true;
}

async function queueSemanticEvent(
  state: StreamingState,
  event: SemanticEvent,
  options: ClaudeWebStreamOptions
): Promise<void> {
  if (event.kind === "content") {
    state.assistantText += event.text;
    state.pendingChunks.push(
      encodeStreamEvent(
        state,
        makeChunk(state.id, state.created, options, { content: event.text }, null)
      )
    );
    return;
  }
  if (event.kind === "reasoning") {
    state.pendingChunks.push(
      encodeStreamEvent(
        state,
        makeChunk(state.id, state.created, options, { reasoning_content: event.text }, null)
      )
    );
    return;
  }
  if (event.kind === "tool_call") {
    state.pendingChunks.push(
      encodeStreamEvent(
        state,
        makeChunk(
          state.id,
          state.created,
          options,
          {
            tool_calls: [
              {
                index: event.index,
                id: event.id,
                type: "function",
                function: { name: event.name, arguments: event.input },
              },
            ],
          },
          null
        )
      )
    );
    return;
  }

  if (event.kind === "metadata") {
    state.pendingChunks.push(
      encodeStreamEvent(
        state,
        makeChunk(state.id, state.created, options, {}, null, {
          type: event.eventType,
          data: event.data,
        })
      )
    );
    return;
  }

  await state.iterator.return?.();
  state.outcome = "completed";
  notifyComplete(options, { assistantText: state.assistantText, stopReason: event.stopReason });
  state.pendingChunks.push(
    encodeStreamEvent(
      state,
      makeChunk(state.id, state.created, options, {}, openAiFinishReason(event.stopReason))
    )
  );
  state.pendingChunks.push(state.encoder.encode("data: [DONE]\n\n"));
  state.terminal = true;
}

function queueStreamFailure(
  state: StreamingState,
  options: ClaudeWebStreamOptions,
  error: unknown
): void {
  logProtocolFailure(error, options);
  failStreamOnce(state, options);
  state.pendingChunks.push(encodeStreamEvent(state, protocolErrorBody()));
  state.pendingChunks.push(state.encoder.encode("data: [DONE]\n\n"));
  state.terminal = true;
}

async function pullStreamingChunk(
  state: StreamingState,
  options: ClaudeWebStreamOptions,
  controller: ReadableStreamDefaultController<Uint8Array>
): Promise<void> {
  if (state.closed || flushStreamChunk(state, controller)) return;
  if (state.terminal) {
    closeStreamIfDrained(state, controller);
    return;
  }

  try {
    while (!state.terminal) {
      const next = await state.iterator.next();
      if (state.control.cancelled) return;
      if (next.done === true) {
        throw new ClaudeWebProtocolError("Claude Web stream ended without a terminal event", {
          category: "premature_eof",
          phase: "stream_terminal",
        });
      }
      await queueSemanticEvent(state, next.value, options);
      if (state.pendingChunks.length > 0) {
        flushStreamChunk(state, controller);
        return;
      }
    }
  } catch (error) {
    if (state.control.cancelled) return;
    queueStreamFailure(state, options, error);
    flushStreamChunk(state, controller);
  }
}

async function cancelStreaming(
  state: StreamingState,
  options: ClaudeWebStreamOptions,
  reason: unknown
): Promise<void> {
  if (state.closed) return;
  state.terminal = true;
  state.control.cancelled = true;
  failStreamOnce(state, options);
  if (state.control.reader) await state.control.reader.cancel(reason).catch(() => {});
  try {
    await state.iterator.return?.();
  } catch {
    // Cancellation is best-effort; the source reader was already cancelled.
  }
  state.closed = true;
}

function createStreamingResponse(
  source: ReadableStream<Uint8Array>,
  options: ClaudeWebStreamOptions
): Response {
  const control: StreamControl = { reader: null, cancelled: false };
  const state: StreamingState = {
    encoder: new TextEncoder(),
    id: `chatcmpl-${randomUUID()}`,
    created: Math.floor(Date.now() / 1000),
    control,
    iterator: parseClaudeWebEvents(source, control)[Symbol.asyncIterator](),
    pendingChunks: [],
    assistantText: "",
    outcome: "pending",
    terminal: false,
    closed: false,
  };

  const output = new ReadableStream<Uint8Array>({
    pull(controller) {
      return pullStreamingChunk(state, options, controller);
    },
    cancel(reason) {
      return cancelStreaming(state, options, reason);
    },
  });

  const headers = responseHeaders("text/event-stream", options.responseMetadata);
  headers.set("Connection", "keep-alive");
  return new Response(output, { status: 200, headers });
}

export async function createClaudeWebResponse(
  source: ReadableStream<Uint8Array>,
  options: ClaudeWebStreamOptions
): Promise<Response> {
  return options.stream
    ? createStreamingResponse(source, options)
    : createBufferedResponse(source, options);
}
