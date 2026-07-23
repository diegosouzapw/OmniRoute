/**
 * Stream helper utilities for SSE processing.
 *
 * Thinking Content representations (preserved through translation, not normalized):
 * - Claude: `content_block_delta` with `delta.thinking` (string)
 * - OpenAI: `choices[0].delta.reasoning_content` (string)
 * - Gemini: `candidates[0].content.parts[].thought` (boolean flag + text)
 *
 * Each format's thinking field is mapped to the target format's equivalent
 * during translation. No normalization is applied because each consumer
 * expects its native format and normalization would lose format-specific metadata.
 */

import { FORMATS } from "../translator/formats.ts";
import { hasAnyReasoningSignal } from "./reasoningFields.ts";

type SSEPayloadOptions = {
  eventType?: string;
  logWarning?: boolean;
};

type SSEChoicePayload = {
  delta?: Record<string, unknown> & { tool_calls?: unknown };
  finish_reason?: unknown;
  [key: string]: unknown;
};

type SSEJsonPayload = Record<string, unknown> & {
  done?: boolean;
  choices?: SSEChoicePayload[];
};

type GeminiStreamPart = Record<string, unknown> & {
  executableCode?: unknown;
  functionCall?: unknown;
  text?: unknown;
};

type SSEDataLineNormalizer = {
  hasPending: () => boolean;
  normalize: (lines: string[]) => string[];
};

type SSEEventPrefixBuffer = {
  clear: () => void;
  eventType: () => string;
  flush: () => string;
  prefixData: (output: string, line: string) => string;
  remember: (line: string) => void;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Matches ANSI/VT100 terminal control sequences plus non-whitespace C0 control
 * codes, while preserving `\t` (0x09), `\n` (0x0a), and `\r` (0x0d).
 *
 * Some upstream CLIs (notably gemini-cli via the `gc/` bridge) prefix SSE frames
 * with cursor-movement escapes such as `\x1b[2K\x1b[1A` to redraw the terminal.
 * Those bytes are not whitespace, so `line.trimStart().startsWith("data:")` fails
 * and the frame is silently dropped, stalling the client SSE parser (issue #2273).
 *
 * The pattern is strictly bounded (no unbounded quantifiers over overlapping
 * alternatives) so it runs in linear time on untrusted input — ReDoS-safe.
 */

const ANSI_ESCAPE_RE =
  /\x1b(?:\[[0-9;?]*[A-Za-z]|\][^\x07\x1b]*(?:\x07|\x1b\\)|[A-Z\[\]\\^_`])|[\x00-\x08\x0b\x0c\x0e-\x1f]/g;

/**
 * Strip ANSI/VT100 escape sequences (and stray C0 controls) from a string.
 * Non-string inputs (null/undefined) are returned unchanged. Preserves \t \n \r.
 */
export function stripAnsiCodes<T>(str: T): T {
  if (typeof str !== "string") return str;
  return str.replace(ANSI_ESCAPE_RE, "") as T;
}

export function parseSSEDataPayload(
  data: unknown,
  options: SSEPayloadOptions = {}
): SSEJsonPayload | null {
  const payload = String(data ?? "").trim();
  if (!payload) return null;
  if (payload === "[DONE]") return { done: true };
  try {
    const parsed = JSON.parse(payload) as unknown;
    const eventType = options.eventType;
    if (eventType && isRecord(parsed) && typeof parsed.type !== "string") {
      return { ...parsed, type: eventType } as SSEJsonPayload;
    }
    return parsed as SSEJsonPayload;
  } catch (error) {
    if (options.logWarning !== false && payload.length > 0) {
      console.log(
        `[WARN] Failed to parse SSE payload (${payload.length} chars): ${payload.substring(0, 200)}...`
      );
    }
    return null;
  }
}

export function parseSSEDataLines(
  dataLines: string[],
  options: SSEPayloadOptions = {}
): SSEJsonPayload | null {
  return parseSSEDataPayload(dataLines.join("\n"), options);
}

// Parse SSE data line
export function parseSSELine(line: string): SSEJsonPayload | null {
  if (!line) return null;

  // Trim leading whitespace before checking field name. Also strip ANSI/VT100
  // escape codes so terminal-redraw-prefixed frames (e.g. gemini-cli `\x1b[2K\x1b[1A`)
  // still resolve to a `data:` line instead of being silently dropped (#2273).
  const trimmed = line.trimStart();
  const clean = stripAnsiCodes(trimmed);
  if (!clean.startsWith("data:")) return null;

  return parseSSEDataPayload(clean.slice(5));
}

function extractSseDataLine(line: string): string | null {
  const trimmed = stripAnsiCodes(line.trimStart().replace(/\r$/, ""));
  if (!trimmed.startsWith("data:")) return null;
  return trimmed.slice(5).trimStart();
}

export function createSSEDataLineNormalizer(): SSEDataLineNormalizer {
  let pendingEventLines: string[] = [];

  const getPendingDataLines = () =>
    pendingEventLines
      .map((line) => extractSseDataLine(line))
      .filter((line): line is string => line !== null);

  const hasSelfDescribingPendingDataPayload = () => {
    const dataLines = getPendingDataLines();
    const parsed =
      dataLines.length > 0 ? parseSSEDataLines(dataLines, { logWarning: false }) : null;
    if (!parsed) return false;
    return (
      parsed.done === true ||
      typeof parsed.type === "string" ||
      typeof parsed.object === "string" ||
      Array.isArray(parsed.choices) ||
      Array.isArray(parsed.candidates) ||
      isRecord(parsed.response)
    );
  };

  const flush = (output: string[]) => {
    if (pendingEventLines.length === 0) return;

    const eventLines = pendingEventLines.filter((line) => line.trim().length > 0);
    const dataLines: string[] = [];
    const passthroughLines: string[] = [];

    for (const line of eventLines) {
      const dataLine = extractSseDataLine(line);
      if (dataLine !== null) {
        dataLines.push(dataLine);
      } else {
        passthroughLines.push(line);
      }
    }

    output.push(...passthroughLines);
    if (dataLines.length > 0) {
      const parsed = parseSSEDataLines(dataLines, { logWarning: false });
      if (parsed) {
        output.push(parsed.done === true ? "data: [DONE]" : `data: ${JSON.stringify(parsed)}`);
      } else {
        output.push(...eventLines.filter((line) => extractSseDataLine(line) !== null));
      }
    } else {
      output.push(...eventLines.filter((line) => extractSseDataLine(line) !== null));
    }

    output.push("");
    pendingEventLines = [];
  };

  return {
    hasPending() {
      return pendingEventLines.length > 0;
    },
    normalize(lines: string[]) {
      const output: string[] = [];
      for (const line of lines) {
        const normalizedLine = line.replace(/\r$/, "");
        const trimmed = normalizedLine.trim();

        if (
          trimmed &&
          /^(?:event:|id:|retry:|:)/i.test(trimmed) &&
          hasSelfDescribingPendingDataPayload()
        ) {
          flush(output);
        }

        pendingEventLines.push(normalizedLine);
        if (!trimmed) {
          flush(output);
        }
      }
      return output;
    },
  };
}

export function createSSEEventPrefixBuffer(): SSEEventPrefixBuffer {
  let lines: string[] = [];
  let emitted = false;
  const hasUnemitted = () => lines.length > 0 && !emitted;
  const prefix = (output: string) => {
    if (!hasUnemitted()) return output;
    emitted = true;
    return `${lines.join("\n")}\n${output}`;
  };
  return {
    clear() {
      lines = [];
      emitted = false;
    },
    eventType() {
      for (let i = lines.length - 1; i >= 0; i--) {
        const match = lines[i].trim().match(/^event:\s*(.+)$/i);
        if (match) return match[1].trim();
      }
      return "";
    },
    flush() {
      return hasUnemitted() ? prefix("\n") : "";
    },
    prefixData(output, line) {
      return line.startsWith("data:") ? prefix(output) : output;
    },
    remember(line) {
      lines.push(line);
      emitted = false;
    },
  };
}

function hasOpenAICompatibleStreamValue(parsed: Record<string, unknown>): boolean {
  if (!Array.isArray(parsed.choices)) return false;

  return parsed.choices.some((choice) => {
    if (!isRecord(choice)) return false;

    const delta = isRecord(choice.delta) ? choice.delta : null;
    if (!delta) return false;
    if (typeof delta.content === "string" && delta.content.length > 0) return true;
    if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
      return true;
    }
    if (typeof delta.reasoning_text === "string" && delta.reasoning_text.length > 0) {
      return true;
    }
    return Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0;
  });
}

function hasResponsesStreamValue(parsed: Record<string, unknown>, eventType = ""): boolean {
  const type = typeof parsed.type === "string" ? parsed.type : eventType;
  if (!type.startsWith("response.")) return false;

  if (
    type === "response.output_text.delta" ||
    type === "response.reasoning_text.delta" ||
    type === "response.reasoning_summary_text.delta" ||
    type === "response.function_call_arguments.delta"
  ) {
    return (
      (typeof parsed.delta === "string" && parsed.delta.length > 0) ||
      (typeof parsed.text === "string" && parsed.text.length > 0) ||
      (typeof parsed.arguments === "string" && parsed.arguments.length > 0)
    );
  }

  if (type === "response.output_item.added" || type === "response.output_item.done") {
    return isRecord(parsed.item);
  }

  if (type === "response.content_part.added") {
    return isRecord(parsed.part);
  }

  if (type === "response.completed" && isRecord(parsed.response)) {
    const output = parsed.response.output;
    return Array.isArray(output) && output.length > 0;
  }

  return false;
}

function hasGeminiCandidateStreamValue(parsed: Record<string, unknown>): boolean {
  const candidates = Array.isArray(parsed.candidates)
    ? parsed.candidates
    : isRecord(parsed.response) && Array.isArray(parsed.response.candidates)
      ? parsed.response.candidates
      : [];

  return candidates.some((candidate) => {
    if (!isRecord(candidate)) return false;
    const content = isRecord(candidate.content) ? candidate.content : null;
    const parts = Array.isArray(content?.parts) ? content.parts : [];
    return parts.some((part) => {
      if (!isRecord(part)) return false;
      if (typeof part.text === "string" && part.text.length > 0) return true;
      return isRecord(part.functionCall) || isRecord(part.executableCode);
    });
  });
}

// Issue #7285: an OpenAI-shape SSE stream that closes without ever emitting a
// chunk carrying `finish_reason` (and without a `data: [DONE]` sentinel) is a
// truncated response — combo failover needs to detect that shape independently
// of `hasOpenAICompatibleStreamValue()` (which only looks for *content*, not
// the terminal marker). Kept alongside the other shape-detection helpers so
// callers can distinguish "OpenAI-shape chunk seen" from "OpenAI-shape stream
// reached its terminal marker".
export function isOpenAIChoicesPayload(parsed: Record<string, unknown>): boolean {
  return Array.isArray(parsed.choices);
}

export function hasOpenAIFinishReason(parsed: Record<string, unknown>): boolean {
  if (!Array.isArray(parsed.choices)) return false;
  return parsed.choices.some((choice) => isRecord(choice) && choice.finish_reason != null);
}

export function isKnownNonClaudeStreamPayload(
  parsed: Record<string, unknown>,
  eventType = ""
): boolean {
  if (Array.isArray(parsed.choices)) {
    return hasOpenAICompatibleStreamValue(parsed);
  }

  const objectType = typeof parsed.object === "string" ? parsed.object : "";
  if (
    objectType === "chat.completion.chunk" ||
    objectType === "text_completion" ||
    objectType.endsWith(".completion.chunk")
  ) {
    return hasOpenAICompatibleStreamValue(parsed);
  }

  const type = typeof parsed.type === "string" ? parsed.type : eventType;
  if (type.startsWith("response.")) return hasResponsesStreamValue(parsed, eventType);
  if (Array.isArray(parsed.candidates)) return hasGeminiCandidateStreamValue(parsed);

  const response = parsed.response;
  return isRecord(response) && Array.isArray(response.candidates)
    ? hasGeminiCandidateStreamValue(parsed)
    : false;
}

// Check if chunk has valuable content (not empty)
export function hasValuableContent(chunk: Record<string, unknown>, format: string): boolean {
  // OpenAI format
  if (format === FORMATS.OPENAI) {
    const choices = Array.isArray(chunk.choices) ? chunk.choices : [];
    const firstChoice = isRecord(choices[0]) ? choices[0] : null;
    const delta = isRecord(firstChoice?.delta) ? firstChoice.delta : null;
    if (!firstChoice || !delta) return false;
    if (typeof delta.content === "string" && delta.content.length > 0) return true;
    if (hasAnyReasoningSignal(delta)) return true;
    if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) return true;
    if (firstChoice.finish_reason) return true;
    if (typeof delta.role === "string" && delta.role.length > 0) return true;
    return false;
  }

  // Claude format
  if (format === FORMATS.CLAUDE) {
    const isContentBlockDelta = chunk.type === "content_block_delta";
    if (isContentBlockDelta) {
      const delta = isRecord(chunk.delta) ? chunk.delta : {};
      const hasText = typeof delta.text === "string" && delta.text.length > 0;
      const hasThinking = typeof delta.thinking === "string" && delta.thinking.length > 0;
      const hasInputJson = typeof delta.partial_json === "string" && delta.partial_json.length > 0;
      if (!hasText && !hasThinking && !hasInputJson) return false;
    }
    return true;
  }

  // Gemini / Antigravity format: filter chunks with no actual content parts
  if (
    (format === FORMATS.GEMINI || format === FORMATS.ANTIGRAVITY) &&
    Array.isArray(chunk.candidates) &&
    chunk.candidates[0]
  ) {
    const candidate = isRecord(chunk.candidates[0]) ? chunk.candidates[0] : {};
    // Keep chunks with finish reason or safety ratings (they signal completion)
    if (candidate.finishReason) return true;
    // Filter out chunks where parts array is empty or missing
    const content = isRecord(candidate.content) ? candidate.content : null;
    const parts = Array.isArray(content?.parts) ? content.parts : null;
    if (!parts || parts.length === 0) return false;
    // Filter out chunks where all parts have empty text
    const hasContent = parts.some((p: unknown) => {
      const part: GeminiStreamPart = isRecord(p) ? p : {};
      return (
        (typeof part.text === "string" && part.text.length > 0) ||
        part.functionCall ||
        part.executableCode
      );
    });
    return hasContent;
  }

  return true; // Other formats: keep all chunks
}

/**
 * Unwrap Cloud Code API envelope from a Gemini response chunk.
 * The Cloud Code API wraps responses in { response: { candidates: [...] } }
 * while standard Gemini returns { candidates: [...] } directly.
 */
export function unwrapGeminiChunk<T extends Record<string, unknown>>(
  parsed: T
): T | Record<string, unknown> {
  if (!parsed.candidates && isRecord(parsed.response)) {
    return parsed.response;
  }
  return parsed;
}

// Fix invalid id (generic or too short)
export function fixInvalidId(parsed: Record<string, unknown>): boolean {
  if (
    typeof parsed.id === "string" &&
    (parsed.id === "chat" || parsed.id === "completion" || parsed.id.length < 8)
  ) {
    const extendFields = isRecord(parsed.extend_fields) ? parsed.extend_fields : {};
    const fallbackId = extendFields.requestId || extendFields.traceId || Date.now().toString(36);
    parsed.id = `chatcmpl-${fallbackId}`;
    return true;
  }
  return false;
}

// Remove null perf_metrics from usage (common across formats)
function cleanPerfMetrics(data: unknown): unknown {
  if (isRecord(data) && isRecord(data.usage) && data.usage.perf_metrics === null) {
    // Mutate in-place to avoid spread copy per chunk — data is ephemeral, used only for serialization.
    delete data.usage.perf_metrics;
  }
  return data;
}

// Format output as SSE
export function formatSSE(data: unknown, sourceFormat: string): string {
  if (data === null || data === undefined) return ""; // Skip null/undefined — never send `data: null` (#483)
  if (isRecord(data) && data.done) return "data: [DONE]\n\n";

  // OpenAI Responses API format
  if (isRecord(data) && data.event && data.data) {
    return `event: ${data.event}\ndata: ${JSON.stringify(data.data)}\n\n`;
  }

  // Clean null perf_metrics before serialization
  data = cleanPerfMetrics(data);

  // Claude format
  if (sourceFormat === FORMATS.CLAUDE && isRecord(data) && data.type) {
    return `event: ${data.type}\ndata: ${JSON.stringify(data)}\n\n`;
  }

  return `data: ${JSON.stringify(data)}\n\n`;
}

const STREAM_SUMMARY_TEXT_LIMIT = 64 * 1024;

// Bounded accumulator for streamed content/reasoning text — caps memory on long streams
// by keeping only the tail once the limit is reached, instead of growing unbounded.
export function appendBoundedText(current: string, next: string): string {
  if (!next) return current;
  // Avoid allocating `current + next` when already at/above limit — slide the window instead.
  if (current.length >= STREAM_SUMMARY_TEXT_LIMIT) {
    const keep = STREAM_SUMMARY_TEXT_LIMIT - next.length;
    if (keep <= 0) return next.slice(-STREAM_SUMMARY_TEXT_LIMIT);
    return current.slice(-keep) + next;
  }
  const combined = current + next;
  if (combined.length <= STREAM_SUMMARY_TEXT_LIMIT) return combined;
  return combined.slice(-STREAM_SUMMARY_TEXT_LIMIT);
}

/** Per-chunk recursive check for meaningful delta content. Hoisted to avoid closure re-allocation in hot-path. */
export function hasActiveDeltaValue(value: unknown): boolean {
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.some((entry) => hasActiveDeltaValue(entry));
  if (value && typeof value === "object") {
    return Object.values(value).some((entry) => hasActiveDeltaValue(entry));
  }
  return value !== null && value !== undefined;
}
