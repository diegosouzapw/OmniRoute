import { HTTP_STATUS } from "../config/constants.ts";
import { buildErrorBody, sanitizeErrorMessage } from "./error.ts";

type StreamReadinessLogger = {
  debug?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
};

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

function hasUsefulValue(value: unknown): boolean {
  if (hasNonEmptyString(value)) return true;
  if (Array.isArray(value)) return value.some(hasUsefulValue);
  if (!isRecord(value)) return false;

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
 */
export function createStreamContentWatcher(): StreamContentWatcher {
  const MAX_BUFFERED = 64 * 1024;
  let pending = "";
  let content = false;
  let legitEmpty = false;
  let sse = false;

  const inspect = (frame: string): void => {
    if (!frame) return;
    if (!sse && SSE_FIELD_LINE.test(frame)) sse = true;
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
    if (
      !state.upstreamDiagnostic &&
      isRecord(payload) &&
      isErrorOnlyStructuredPayload(payload)
    ) {
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

function prependBufferedChunks(
  chunks: Uint8Array[],
  reader: ReadableStreamDefaultReader<Uint8Array>
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (const chunk of chunks) {
          controller.enqueue(chunk);
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) controller.enqueue(value);
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
    async cancel(reason) {
      await reader.cancel(reason).catch(() => {});
      reader.releaseLock();
    },
  });
}

function readWithTimeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  timeoutMs: number
): Promise<ReadableStreamReadResult<Uint8Array>> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("STREAM_READINESS_TIMEOUT")), timeoutMs);
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
  const deadline = startedAt + effectiveTimeoutMs;
  let handedOffReader = false;

  const buildReadyResponse = () =>
    new Response(prependBufferedChunks(chunks, reader), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

  const timeoutReason = () =>
    `Stream produced no non-ping SSE event within ${effectiveTimeoutMs}ms`;

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
      try {
        readResult = await readWithTimeout(reader, remainingMs);
      } catch {
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
