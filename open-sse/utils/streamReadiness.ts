import { HTTP_STATUS } from "../config/constants.ts";
import { buildErrorBody, sanitizeErrorMessage } from "./error.ts";

type StreamReadinessLogger = {
  debug?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
};

/**
 * Internal parked-stream marker header. Set by the parked-stream emitter on
 * its synthetic response so this guard can honor the parked state; stripped
 * from every client-facing rebuild below, so it never leaks downstream.
 * The value is always the generic `transient` qualifier.
 */
export const PARKED_STREAM_HEADER = "x-omniroute-parked-stream";
export const PARKED_STREAM_VALUE = "transient";

/** True when the response carries the parked-stream marker (fail-closed: false). */
export function isParkedResponse(response: Response): boolean {
  try {
    return response.headers.get(PARKED_STREAM_HEADER) === PARKED_STREAM_VALUE;
  } catch {
    return false;
  }
}

export type StreamReadinessResult =
  | { ok: true; response: Response }
  | {
      ok: false;
      response: Response;
      /** Sanitized operator-facing context for logs and persisted diagnostics. */
      reason: string;
      /** Stable internal text for retry, quota, and account-health classification. */
      classificationReason: string;
      /** First non-empty sanitized message from an error-only SSE payload. */
      upstreamDiagnostic?: string;
      code: string;
      type: string;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function hasNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}

// A Claude thinking or signature delta is proof the model is working, even
// when its payload carries no readable text (encrypted reasoning, empty
// signature envelope). Presence of a non-empty `thinking` or `signature`
// string on a typed delta object counts as liveness — never as user-visible
// output. Plain `signature: ""` bootstraps stay excluded: only a non-empty
// value passes.
function hasThinkingLiveness(value: Record<string, unknown>): boolean {
  const deltaType = value.type;
  if (deltaType !== "thinking_delta" && deltaType !== "signature_delta") return false;
  return hasNonEmptyString(value.thinking) || hasNonEmptyString(value.signature);
}

function hasUsefulValue(value: unknown): boolean {
  if (hasNonEmptyString(value)) return true;
  if (Array.isArray(value)) return value.some(hasUsefulValue);
  if (!isRecord(value)) return false;

  // A Responses compaction item IS the turn's output: remote compaction
  // completes with output = [{type:"compaction", encrypted_content}] and no
  // assistant text. Deliberately NOT a blanket encrypted_content key — an
  // encrypted reasoning item alone is not user-visible output and must keep
  // tripping the #8649 empty-content guard.
  // This shape is specific to Responses streams; chat-completion frames do not produce it.
  if (value.type === "compaction" && hasNonEmptyString(value.encrypted_content)) return true;

  if (hasThinkingLiveness(value)) return true;

  for (const key of [
    "content",
    "text",
    "delta",
    "reasoning_content",
    "reasoning",
    // Mistral/Magistral thinking arrays and StepFun/OpenRouter reasoning_details are
    // valid model output — without these a reasoning-only stream was misclassified as
    // "no useful content" and turned into a spurious 502 (#2520).
    "thinking",
    "reasoning_details",
    "partial_json",
    "arguments",
    "name",
    "thought",
    "error",
    "executableCode",
    "codeExecutionResult",
  ]) {
    const candidate = value[key];
    if (hasNonEmptyString(candidate)) return true;
    if ((Array.isArray(candidate) || isRecord(candidate)) && hasUsefulValue(candidate)) return true;
  }

  for (const key of [
    "tool_calls",
    "tool_use",
    "function",
    "functionCall",
    "function_call",
    "function_call_output",
    "output",
    "content_block",
    "response",
    "choices",
    "candidates",
    "parts",
  ]) {
    if (hasUsefulValue(value[key])) return true;
  }

  return false;
}

function hasUsefulJsonPayload(payload: unknown): boolean {
  if (!isRecord(payload)) return false;
  return hasUsefulValue(payload);
}

function isPingEventType(type: string): boolean {
  return /^(?:ping|keepalive|heartbeat)$/i.test(type);
}

// ─── #15260: content-stall liveness, distinct from the #8649 content check ───
//
// The content-stall watchdog must only kill streams that send exclusively
// lifecycle or ping frames. `hasUsefulValue` above is the wrong predicate for
// that: it demands a non-empty readable string, so long reasoning phases whose
// frames carry only signatures, empty/redacted thinking deltas or encrypted
// reasoning items read as "no model output" — and healthy Claude/Responses/
// Gemini thinking streams were aborted mid-think at the stall budget.
//
// A model signal is ANY model-generated frame: any `*_delta` event (even with
// an empty, encrypted or signature-only string), a content block starting, an
// open reasoning item, a non-empty Gemini part, or a chat delta carrying any
// key other than a bare role announcement. Only pings, lifecycle-only events
// and error-only frames stay silent.

const LIFECYCLE_ONLY_STREAM_TYPES = new Set([
  "message_start",
  "message_stop",
  "content_block_stop",
  "response.created",
  "response.in_progress",
  "response.queued",
]);

function deltaCarriesModelSignal(delta: unknown): boolean {
  if (Array.isArray(delta)) return delta.some(deltaCarriesModelSignal);
  if (!isRecord(delta)) return false;
  // A role-only start chunk ({delta:{role:"assistant"}}) is lifecycle; any
  // other key — including empty-string reasoning_content — is model output.
  return Object.keys(delta).some((key) => key !== "role");
}

function hasModelSignal(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(hasModelSignal);
  if (!isRecord(value)) return false;

  const type = typeof value.type === "string" ? value.type : "";
  if (type) {
    if (isPingEventType(type) || LIFECYCLE_ONLY_STREAM_TYPES.has(type)) return false;
    if (type === "error" || type === "response.failed") return false;
    if (/(?:\.|_)delta$/.test(type)) return true;
    if (type === "content_block_start") return true;
    // Responses events carry the `response.` prefix (response.output_item.added);
    // a raw `output_item.*` type is accepted too for translated streams.
    // A materialized output_item.done of any item type (message, function_call,
    // reasoning, ...) is model activity; added opens a reasoning item only.
    if (type.endsWith("output_item.done")) return true;
    if (type.endsWith("output_item.added")) {
      const item = isRecord(value.item) ? value.item : {};
      return item.type === "reasoning" || item.item_type === "reasoning";
    }
  }

  if ("delta" in value && deltaCarriesModelSignal(value.delta)) return true;

  // Gemini-style parts: any non-empty part (text, thought or thoughtSignature)
  // is model output — hasUsefulValue demands a non-empty text string.
  const candidates = Array.isArray(value.candidates) ? value.candidates : null;
  if (candidates) {
    for (const candidate of candidates) {
      if (!isRecord(candidate)) continue;
      const content = isRecord(candidate.content) ? candidate.content : null;
      const parts = content && Array.isArray(content.parts) ? content.parts : [];
      if (parts.some((part) => isRecord(part) && Object.keys(part).length > 0)) return true;
    }
  }

  // OpenRouter-style encrypted reasoning entries.
  if (Array.isArray(value.reasoning_details) && value.reasoning_details.length > 0) return true;

  for (const nested of Object.values(value)) {
    if (Array.isArray(nested) || isRecord(nested)) {
      if (hasModelSignal(nested)) return true;
    }
  }
  return false;
}

function hasModelSignalPayload(payload: unknown, eventType = ""): boolean {
  const type = getPayloadType(payload, eventType);
  if (isPingEventType(eventType) || isPingEventType(type)) return false;
  if (isRecord(payload) && isErrorOnlyStructuredPayload(payload)) return false;
  if (isRecord(payload) && type && payload.type !== type) {
    return hasModelSignal({ ...payload, type });
  }
  return hasModelSignal(payload);
}

export type StreamLivenessWatcher = {
  /** Feed a decoded slice of the upstream stream. Safe to call with partial frames. */
  note: (text: string) => void;
  /** Flush any buffered trailing frame; call once the stream is done. */
  finish: () => void;
  /** True once any frame carried a model-generated signal (see module comment). */
  sawModelSignal: () => boolean;
  /** Monotonic count of model-signal data lines seen; drives the sliding window. */
  activityCount: () => number;
};

/**
 * Watch the raw upstream stream for whether the MODEL is alive — separate from
 * {@link createStreamContentWatcher}, whose `sawContent` stays the strict
 * user-visible-output check the #8649 empty-turn guard relies on. The
 * content-stall watchdog re-arms on each new model signal (sliding window) and
 * disarms for good on strict content, so a healthy extended-thinking stream is
 * never aborted mid-think (#15260).
 */
export function createStreamLivenessWatcher(): StreamLivenessWatcher {
  const MAX_BUFFERED = 64 * 1024;
  let pending = "";
  let count = 0;

  const inspect = (frame: string, eventType = ""): void => {
    if (!frame) return;
    let currentEvent = eventType;
    for (const line of frame.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(":")) continue;
      if (trimmed.startsWith("event:")) {
        currentEvent = trimmed.slice(6).trim();
        continue;
      }
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        if (hasModelSignalPayload(JSON.parse(data), currentEvent)) {
          count += 1;
        }
      } catch {
        // Non-JSON data line: not a signal (structured checks all parse JSON;
        // unparseable frames are not provably model output, and the strict
        // content watcher below still handles the user-visible case).
      }
    }
  };

  return {
    note(text: string): void {
      if (!text) return;
      pending += text;
      for (;;) {
        const boundary = pending.search(/\r?\n\r?\n/);
        if (boundary === -1) break;
        inspect(pending.slice(0, boundary));
        pending = pending.slice(boundary).replace(/^\r?\n\r?\n/, "");
      }
      if (pending.length > MAX_BUFFERED) {
        inspect(pending);
        pending = "";
      }
    },
    finish(): void {
      inspect(pending);
      pending = "";
    },
    sawModelSignal: () => count > 0,
    activityCount: () => count,
  };
}

function getPayloadType(payload: unknown, eventType = ""): string {
  if (!isRecord(payload)) return eventType;
  const type = payload.type ?? payload.event ?? payload.object;
  return typeof type === "string" ? type : eventType;
}

// Keys that indicate a frame carries (or is starting to carry) actual model
// output — as opposed to a bare `{error:{...}}` frame with no output signal
// at all. A stream that only ever emits error-only frames (e.g. a CLI
// passthrough executor's mid-stream spawn failure, #7503) must NOT be
// classified as "ready" — treating it as ready lets the malformed frame
// reach the client as a fake 200 success and blocks combo fallback to the
// next candidate.
const CONTENT_BEARING_KEYS = [
  "choices",
  "candidates",
  "content_block",
  "delta",
  "output",
  "response",
  "parts",
  "tool_calls",
  "tool_use",
  "function_call",
  "function_call_output",
];

function isErrorOnlyStructuredPayload(payload: Record<string, unknown>): boolean {
  if (!("error" in payload)) return false;
  return !CONTENT_BEARING_KEYS.some((key) => key in payload);
}

function hasNonPingStructuredPayload(payload: unknown, eventType = ""): boolean {
  const type = getPayloadType(payload, eventType);
  if (isPingEventType(eventType) || isPingEventType(type)) return false;
  if (Array.isArray(payload)) return payload.length > 0;
  if (isRecord(payload)) {
    if (Object.keys(payload).length === 0) return false;
    return !isErrorOnlyStructuredPayload(payload);
  }
  return payload !== null && payload !== undefined;
}

export function hasUsefulStreamContent(text: string): boolean {
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(":")) continue;
    if (/^event:\s*(?:ping|keepalive)$/i.test(trimmed)) continue;
    if (!trimmed.startsWith("data:")) continue;

    const data = trimmed.slice(5).trim();
    if (!data || data === "[DONE]") continue;

    try {
      if (hasUsefulJsonPayload(JSON.parse(data))) return true;
    } catch {
      if (data.length > 0) return true;
    }
  }

  return false;
}

// Terminal states where a completion legitimately carries no content, kept in
// step with errorClassifier.ts's LEGIT_EMPTY_OPENAI_FINISH / LEGIT_EMPTY_CLAUDE_STOP
// so the streaming and non-streaming empty-content checks agree.
const LEGIT_EMPTY_TERMINAL_REASONS = new Set([
  "length",
  "tool_calls",
  "content_filter",
  "max_tokens",
  "tool_use",
]);

const TERMINAL_REASON_PATTERN = /"(?:finish_reason|stop_reason)"\s*:\s*"([^"]+)"/g;

const SSE_FIELD_LINE = /(?:^|\r?\n)\s*(?:data|event):/;

/** Same spirit as combo `isSubstantiveError` — non-empty string or non-empty object. */
function isSubstantiveErrorValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    if (hasNonEmptyString(record.message)) return true;
    return Object.keys(record).length > 0;
  }
  return value === true;
}

/**
 * True when an SSE frame already carries a structured upstream/client error
 * (OpenAI `error`, Claude `event:error` / `type:error`, Responses `response.failed`).
 * Used by #8649 so we do not invent "Provider returned empty content" after an
 * executor already emitted an actionable error (Claude #3685 / readiness #8972 parity).
 */
export function frameHasStructuredStreamError(frame: string): boolean {
  const lines = frame.split(/\r?\n/);
  let eventType = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(":")) continue;
    if (trimmed.startsWith("event:")) {
      eventType = trimmed.slice(6).trim();
      if (/^error$/i.test(eventType)) return true;
      continue;
    }
    if (!trimmed.startsWith("data:")) continue;

    const data = trimmed.slice(5).trim();
    if (!data || data === "[DONE]") continue;

    try {
      const parsed: unknown = JSON.parse(data);
      if (!isRecord(parsed)) continue;
      const type = getPayloadType(parsed, eventType);
      if (type === "error" || type === "response.failed" || eventType === "response.failed") {
        return true;
      }
      if (isSubstantiveErrorValue(parsed.error)) return true;
      const nestedResponse = isRecord(parsed.response) ? parsed.response : null;
      if (nestedResponse?.status === "failed" && nestedResponse.error != null) return true;
    } catch {
      // non-JSON data lines are not structured errors
    }
  }

  return false;
}

export type StreamContentWatcher = {
  /** Feed a decoded slice of the client-facing stream. Safe to call with partial frames. */
  note: (text: string) => void;
  /** Flush any buffered trailing frame; call once the stream is done. */
  finish: () => void;
  /** True once any frame carried real model output (text, reasoning, or a tool call). */
  sawContent: () => boolean;
  /** True once a terminal state was seen where emitting no content is valid. */
  sawLegitEmptyTerminal: () => boolean;
  /**
   * True once the stream looked like SSE at all. Not every body reaching the
   * client wrapper is event-stream — a plain JSON completion is forwarded
   * through the same path — and a non-SSE body has no `data:` frames to judge,
   * so callers must not read emptiness into it.
   */
  sawSseFrame: () => boolean;
  /**
   * True once a substantive SSE error frame was seen. Separate from sawContent
   * so #8649 can stand down without treating errors as model output.
   */
  sawError: () => boolean;
};

/**
 * Watch a client-facing SSE stream for whether it ever produced actual model
 * output, so a stream that terminates cleanly while carrying nothing can be
 * reported instead of closing as a silent empty turn (#8649).
 *
 * Frames are buffered until a blank-line boundary so a delta split across two
 * network chunks is still scanned as one payload. The buffer is bounded — a
 * single frame larger than the cap is scanned in pieces, which can only ever
 * lose content-detection precision in the direction of "saw content", never
 * toward a false empty.
 *
 * Also tracks `sawError` so an already-emitted structured error is not rewritten
 * as empty content (parity with Claude #3685 `lifecycle.hasError` and readiness #8972).
 */
export function createStreamContentWatcher(): StreamContentWatcher {
  const MAX_BUFFERED = 64 * 1024;
  let pending = "";
  let content = false;
  let legitEmpty = false;
  let sse = false;
  let error = false;

  const inspect = (frame: string): void => {
    if (!frame) return;
    if (!sse && SSE_FIELD_LINE.test(frame)) sse = true;
    if (!error && frameHasStructuredStreamError(frame)) error = true;
    if (!content && hasUsefulStreamContent(frame)) content = true;
    if (legitEmpty) return;
    for (const match of frame.matchAll(TERMINAL_REASON_PATTERN)) {
      if (LEGIT_EMPTY_TERMINAL_REASONS.has(match[1])) {
        legitEmpty = true;
        return;
      }
    }
  };

  return {
    note(text: string): void {
      if (!text) return;
      pending += text;
      for (;;) {
        const boundary = pending.search(/\r?\n\r?\n/);
        if (boundary === -1) break;
        inspect(pending.slice(0, boundary));
        pending = pending.slice(boundary).replace(/^\r?\n\r?\n/, "");
      }
      if (pending.length > MAX_BUFFERED) {
        inspect(pending);
        pending = "";
      }
    },
    finish(): void {
      inspect(pending);
      pending = "";
    },
    sawContent: () => content,
    sawLegitEmptyTerminal: () => legitEmpty,
    sawSseFrame: () => sse,
    sawError: () => error,
  };
}

type StreamReadinessSignalState = {
  currentEvent: string;
  dataLines: string[];
  pendingLine: string;
  upstreamDiagnostic: string | null;
};

function resetCurrentEvent(state: StreamReadinessSignalState): void {
  state.currentEvent = "";
  state.dataLines = [];
}

function processStreamReadinessEvent(state: StreamReadinessSignalState): boolean {
  const eventType = state.currentEvent;
  const data = state.dataLines.join("\n").trim();
  resetCurrentEvent(state);

  if (isPingEventType(eventType) || !data || data === "[DONE]") return false;

  try {
    const payload: unknown = JSON.parse(data);
    if (!state.upstreamDiagnostic && isRecord(payload) && isErrorOnlyStructuredPayload(payload)) {
      const error = payload.error;
      const rawMessage =
        typeof error === "string"
          ? error
          : isRecord(error) && typeof error.message === "string"
            ? error.message
            : "";
      const diagnostic = sanitizeErrorMessage(rawMessage).trim();
      if (diagnostic) state.upstreamDiagnostic = diagnostic;
    }
    return hasNonPingStructuredPayload(payload, eventType);
  } catch {
    return data.length > 0;
  }
}

function processStreamReadinessLine(state: StreamReadinessSignalState, line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith(":")) {
    if (!trimmed) return processStreamReadinessEvent(state);
    return false;
  }

  if (trimmed.startsWith("event:")) {
    state.currentEvent = trimmed.slice(6).trim();
    return false;
  }

  if (trimmed.startsWith("data:")) {
    state.dataLines.push(trimmed.slice(5).trimStart());
  }
  return false;
}

function appendStreamReadinessSignal(state: StreamReadinessSignalState, chunk: string): boolean {
  const lines = `${state.pendingLine}${chunk}`.split(/\r?\n/);
  state.pendingLine = lines.pop() ?? "";

  for (const line of lines) {
    if (processStreamReadinessLine(state, line)) return true;
  }

  return false;
}

/** True when a decoded chunk holds only SSE comment lines (heartbeats). */
function isCommentOnlyChunk(chunk: string): boolean {
  let seenLine = false;
  for (const line of chunk.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    seenLine = true;
    if (!trimmed.startsWith(":")) return false;
  }
  return seenLine;
}

function finishStreamReadinessSignal(state: StreamReadinessSignalState): boolean {
  if (state.pendingLine && processStreamReadinessLine(state, state.pendingLine)) return true;
  state.pendingLine = "";
  return processStreamReadinessEvent(state);
}

export function hasStreamReadinessSignal(text: string): boolean {
  const state: StreamReadinessSignalState = {
    currentEvent: "",
    dataLines: [],
    pendingLine: "",
    upstreamDiagnostic: null,
  };
  if (appendStreamReadinessSignal(state, text)) return true;
  return finishStreamReadinessSignal(state);
}

function createErrorResponse(
  status: number,
  message: string,
  code: string,
  type: string,
  upstreamDiagnostic?: string
): Response {
  return new Response(
    JSON.stringify(
      buildErrorBody(
        status,
        message,
        upstreamDiagnostic ? { error: { message: upstreamDiagnostic } } : undefined,
        { code, type }
      )
    ),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

export function prependBufferedChunks(
  chunks: Uint8Array[],
  reader: ReadableStreamDefaultReader<Uint8Array>
): ReadableStream<Uint8Array> {
  let bufferedIndex = 0;
  let readInFlight = false;
  let cancelRequested = false;
  let readerReleased = false;

  const releaseReader = () => {
    if (readerReleased) return;
    readerReleased = true;
    reader.releaseLock();
  };

  const cancelReader = (reason: unknown) => {
    if (cancelRequested) return;
    cancelRequested = true;

    try {
      // The provider controls this promise and may never settle. Cancellation
      // of the replay stream must remain bounded, so cleanup is deliberately
      // fire-and-forget while the in-flight read releases the lock in `pull`.
      void reader.cancel(reason).catch(() => {});
    } catch {
      // A synchronous cancellation failure is cleanup-only; the downstream
      // stream has already been cancelled by its consumer.
    }

    if (!readInFlight) releaseReader();
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (cancelRequested) return;

      // Replay exactly one readiness chunk per demand. Reading the source
      // eagerly here would let a subsequent source error clear this queue
      // before the consumer has observed the buffered prefix.
      if (bufferedIndex < chunks.length) {
        controller.enqueue(chunks[bufferedIndex]);
        bufferedIndex += 1;
        return;
      }

      readInFlight = true;
      try {
        const { done, value } = await reader.read();
        if (cancelRequested) return;
        if (done) {
          releaseReader();
          controller.close();
        } else if (value) {
          controller.enqueue(value);
        }
      } catch (error) {
        releaseReader();
        if (!cancelRequested) controller.error(error);
      } finally {
        readInFlight = false;
        if (cancelRequested) releaseReader();
      }
    },
    cancel(reason) {
      cancelReader(reason);
    },
  });
}

class StreamReadinessReadTimeout extends Error {
  constructor() {
    super("STREAM_READINESS_TIMEOUT");
  }
}

function readWithTimeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  timeoutMs: number
): Promise<ReadableStreamReadResult<Uint8Array>> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new StreamReadinessReadTimeout()), timeoutMs);
    reader.read().then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
}

export async function ensureStreamReadiness(
  response: Response,
  options: {
    timeoutMs: number;
    /** Hard ceiling for liveness-extended deadlines. When omitted, no hard ceiling
     *  is applied beyond `timeoutMs`. */
    maxTimeoutMs?: number;
    provider?: string | null;
    model?: string | null;
    log?: StreamReadinessLogger | null;
  }
): Promise<StreamReadinessResult> {
  if (!response.body || options.timeoutMs <= 0) return { ok: true, response };

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  const decoder = new TextDecoder();
  const readinessState: StreamReadinessSignalState = {
    currentEvent: "",
    dataLines: [],
    pendingLine: "",
    upstreamDiagnostic: null,
  };
  const startedAt = Date.now();
  const effectiveTimeoutMs = Math.max(0, Math.floor(options.timeoutMs));
  // Hard ceiling: the deadline may extend on liveness signals (bytes arriving),
  // but never past this absolute maximum.  When maxTimeoutMs is omitted the
  // initial timeoutMs itself acts as the ceiling (no extension).
  const maxDeadline =
    options.maxTimeoutMs != null
      ? startedAt + Math.max(effectiveTimeoutMs, Math.floor(options.maxTimeoutMs))
      : startedAt + effectiveTimeoutMs;
  let deadline = startedAt + effectiveTimeoutMs;
  let handedOffReader = false;
  // Parked streams honor the parked state: the stall deadline is suspended
  // (frozen) on heartbeat comment frames instead of merely extended, so a
  // long park does not trip the stall timeout. The absolute ceiling
  // (maxDeadline) is never raised here — it stays the ultimate bound.
  const parked = isParkedResponse(response);
  if (parked) {
    options.log?.debug?.(
      "STREAM",
      `transient parked stream: stall deadline suspended during park (${options.provider || "provider"}/${options.model || "unknown"})`
    );
  }

  const buildReadyResponse = () => {
    const headers = new Headers(response.headers);
    // The parked marker is internal: honor it, never forward it.
    headers.delete(PARKED_STREAM_HEADER);
    return new Response(prependBufferedChunks(chunks, reader), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };

  const timeoutReason = () =>
    `Stream produced no non-ping SSE event within ${deadline - startedAt}ms (max=${maxDeadline - startedAt}ms)`;

  try {
    while (true) {
      const remainingMs = deadline - Date.now();
      if (remainingMs <= 0) {
        const reason = timeoutReason();
        options.log?.warn?.(
          "STREAM",
          `${reason} (${options.provider || "provider"}/${options.model || "unknown"})`
        );
        await reader.cancel(reason).catch(() => {});
        return {
          ok: false,
          reason,
          classificationReason: reason,
          code: "STREAM_READINESS_TIMEOUT",
          type: "stream_timeout",
          response: createErrorResponse(
            HTTP_STATUS.GATEWAY_TIMEOUT,
            reason,
            "STREAM_READINESS_TIMEOUT",
            "stream_timeout"
          ),
        };
      }

      let readResult: ReadableStreamReadResult<Uint8Array>;
      const deadlineBeforeRead = deadline;
      const readStart = Date.now();
      try {
        readResult = await readWithTimeout(reader, remainingMs);
      } catch (error) {
        // A source stream that errors before its first non-ping event (e.g. an
        // executor watchdog giving up on a stalled upstream) must say so instead of
        // claiming a readiness timeout. The code/type/status stay on the timeout class on
        // purpose: STREAM_EARLY_EOF buys a same-connection retry (#3758), which would
        // double the wait on a stream the executor already gave up on before the combo
        // can fall back.
        if (!(error instanceof StreamReadinessReadTimeout)) {
          const classificationReason = "Stream failed before producing a non-ping SSE event";
          const rawMessage = error instanceof Error ? error.message : String(error);
          const upstreamDiagnostic = sanitizeErrorMessage(rawMessage).trim() || undefined;
          const reason = upstreamDiagnostic
            ? `${classificationReason}: ${upstreamDiagnostic}`
            : classificationReason;
          options.log?.warn?.(
            "STREAM",
            `${reason} (${options.provider || "provider"}/${options.model || "unknown"})`
          );
          return {
            ok: false,
            reason,
            classificationReason,
            ...(upstreamDiagnostic ? { upstreamDiagnostic } : {}),
            code: "STREAM_READINESS_TIMEOUT",
            type: "stream_timeout",
            response: createErrorResponse(
              HTTP_STATUS.GATEWAY_TIMEOUT,
              classificationReason,
              "STREAM_READINESS_TIMEOUT",
              "stream_timeout",
              upstreamDiagnostic
            ),
          };
        }
        const reason = timeoutReason();
        options.log?.warn?.(
          "STREAM",
          `${reason} (${options.provider || "provider"}/${options.model || "unknown"})`
        );
        await reader.cancel(reason).catch(() => {});
        return {
          ok: false,
          reason,
          classificationReason: reason,
          code: "STREAM_READINESS_TIMEOUT",
          type: "stream_timeout",
          response: createErrorResponse(
            HTTP_STATUS.GATEWAY_TIMEOUT,
            reason,
            "STREAM_READINESS_TIMEOUT",
            "stream_timeout"
          ),
        };
      }

      if (readResult.done) {
        const tail = decoder.decode(undefined, { stream: false });
        if (tail && appendStreamReadinessSignal(readinessState, tail)) {
          handedOffReader = true;
          return { ok: true, response: buildReadyResponse() };
        }
        if (finishStreamReadinessSignal(readinessState)) {
          handedOffReader = true;
          return { ok: true, response: buildReadyResponse() };
        }

        const classificationReason = "Stream ended before producing a non-ping SSE event";
        const upstreamDiagnostic = readinessState.upstreamDiagnostic || undefined;
        const reason = upstreamDiagnostic
          ? `${classificationReason}: ${upstreamDiagnostic}`
          : classificationReason;
        options.log?.warn?.(
          "STREAM",
          `${reason} (${options.provider || "provider"}/${options.model || "unknown"})`
        );
        return {
          ok: false,
          reason,
          classificationReason,
          ...(upstreamDiagnostic ? { upstreamDiagnostic } : {}),
          code: "STREAM_EARLY_EOF",
          type: "stream_early_eof",
          response: createErrorResponse(
            HTTP_STATUS.BAD_GATEWAY,
            classificationReason,
            "STREAM_EARLY_EOF",
            "stream_early_eof",
            upstreamDiagnostic
          ),
        };
      }

      if (!readResult.value) continue;
      chunks.push(readResult.value);
      const decodedChunk = decoder.decode(readResult.value, { stream: true });

      // Liveness extension: bytes arrived → connection is alive, not dead.
      // Reset the deadline so slow-but-alive upstreams (reasoning warm-ups,
      // keepalive-only phases) are not aborted.  The hard ceiling (maxDeadline)
      // prevents unbounded waits and preserves the operator's fast-fail intent
      // for truly dead connections.
      // Parked streams: heartbeat comment frames suspend (freeze) the stall
      // deadline instead of extending it — the stall clock does not run
      // during the park. Data frames use the normal liveness path.
      // The absolute ceiling (maxDeadline) is never raised here.
      const now = Date.now();
      if (parked && isCommentOnlyChunk(decodedChunk)) {
        // Suspend: push the deadline forward by exactly the time spent
        // waiting, so the stall clock does not run during the park.
        deadline = Math.min(deadlineBeforeRead + (now - readStart), maxDeadline);
      } else if (deadline < maxDeadline) {
        deadline = Math.min(now + effectiveTimeoutMs, maxDeadline);
        if (now - startedAt > effectiveTimeoutMs) {
          options.log?.debug?.(
            "STREAM",
            `readiness deadline extended to ${deadline - startedAt}ms (liveness signal) (${options.provider || "provider"}/${options.model || "unknown"})`
          );
        }
      }

      if (appendStreamReadinessSignal(readinessState, decodedChunk)) {
        options.log?.debug?.(
          "STREAM",
          `Stream readiness confirmed in ${Date.now() - startedAt}ms (${options.provider || "provider"}/${options.model || "unknown"})`
        );
        handedOffReader = true;
        return {
          ok: true,
          response: buildReadyResponse(),
        };
      }
    }
  } finally {
    if (!handedOffReader) {
      reader.releaseLock();
    }
  }
}
