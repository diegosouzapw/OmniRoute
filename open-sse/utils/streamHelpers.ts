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

  // Trim leading whitespace before checking field name.
  const trimmed = line.trimStart();
  if (!trimmed.startsWith("data:")) return null;

  return parseSSEDataPayload(trimmed.slice(5));
}

function extractSseDataLine(line: string): string | null {
  const trimmed = line.trimStart().replace(/\r$/, "");
  if (!trimmed.startsWith("data:")) return null;
  return trimmed.slice(5).trimStart();
}

export function createSSEDataLineNormalizer(): SSEDataLineNormalizer {
  let pendingEventLines: string[] = [];

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
        const trimmed = line.trim();

        pendingEventLines.push(line.replace(/\r$/, ""));
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
export function hasValuableContent(chunk, format) {
  // OpenAI format
  if (format === FORMATS.OPENAI) {
    if (!chunk.choices?.[0]?.delta) return false;
    const delta = chunk.choices[0].delta;
    if (typeof delta.content === "string" && delta.content.length > 0) return true;
    if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0)
      return true;
    if (typeof delta.reasoning_text === "string" && delta.reasoning_text.length > 0) return true;
    if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) return true;
    if (chunk.choices[0].finish_reason) return true;
    if (typeof delta.role === "string" && delta.role.length > 0) return true;
    return false;
  }

  // Claude format
  if (format === FORMATS.CLAUDE) {
    const isContentBlockDelta = chunk.type === "content_block_delta";
    if (isContentBlockDelta) {
      const hasText = typeof chunk.delta?.text === "string" && chunk.delta.text.length > 0;
      const hasThinking =
        typeof chunk.delta?.thinking === "string" && chunk.delta.thinking.length > 0;
      const hasInputJson =
        typeof chunk.delta?.partial_json === "string" && chunk.delta.partial_json.length > 0;
      if (!hasText && !hasThinking && !hasInputJson) return false;
    }
    return true;
  }

  // Gemini / Antigravity format: filter chunks with no actual content parts
  if ((format === FORMATS.GEMINI || format === FORMATS.ANTIGRAVITY) && chunk.candidates?.[0]) {
    const candidate = chunk.candidates[0];
    // Keep chunks with finish reason or safety ratings (they signal completion)
    if (candidate.finishReason) return true;
    // Filter out chunks where parts array is empty or missing
    const parts = candidate.content?.parts;
    if (!parts || parts.length === 0) return false;
    // Filter out chunks where all parts have empty text
    const hasContent = parts.some(
      (p) => (typeof p.text === "string" && p.text.length > 0) || p.functionCall || p.executableCode
    );
    return hasContent;
  }

  return true; // Other formats: keep all chunks
}

/**
 * Unwrap Cloud Code API envelope from a Gemini response chunk.
 * The Cloud Code API wraps responses in { response: { candidates: [...] } }
 * while standard Gemini returns { candidates: [...] } directly.
 */
export function unwrapGeminiChunk(parsed) {
  if (!parsed.candidates && parsed.response) {
    return parsed.response;
  }
  return parsed;
}

// Fix invalid id (generic or too short)
export function fixInvalidId(parsed) {
  if (parsed.id && (parsed.id === "chat" || parsed.id === "completion" || parsed.id.length < 8)) {
    const fallbackId =
      parsed.extend_fields?.requestId || parsed.extend_fields?.traceId || Date.now().toString(36);
    parsed.id = `chatcmpl-${fallbackId}`;
    return true;
  }
  return false;
}

// Remove null perf_metrics from usage (common across formats)
function cleanPerfMetrics(data) {
  if (data?.usage && typeof data.usage === "object" && data.usage.perf_metrics === null) {
    const { perf_metrics, ...usageWithoutPerf } = data.usage;
    return { ...data, usage: usageWithoutPerf };
  }
  return data;
}

// Format output as SSE
export function formatSSE(data, sourceFormat) {
  if (data === null || data === undefined) return ""; // Skip null/undefined — never send `data: null` (#483)
  if (data && data.done) return "data: [DONE]\n\n";

  // OpenAI Responses API format
  if (data && data.event && data.data) {
    return `event: ${data.event}\ndata: ${JSON.stringify(data.data)}\n\n`;
  }

  // Clean null perf_metrics before serialization
  data = cleanPerfMetrics(data);

  // Claude format
  if (sourceFormat === FORMATS.CLAUDE && data && data.type) {
    return `event: ${data.type}\ndata: ${JSON.stringify(data)}\n\n`;
  }

  return `data: ${JSON.stringify(data)}\n\n`;
}
