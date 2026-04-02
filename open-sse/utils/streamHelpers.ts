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

// Parse SSE data line
export function parseSSELine(line) {
  if (!line) return null;

  // Trim leading whitespace before checking prefix character
  const trimmed = line.trimStart();
  if (!trimmed || trimmed.charCodeAt(0) !== 100) return null; // 'd' = 100

  const data = trimmed.slice(5).trim();
  if (data === "[DONE]") return { done: true };

  try {
    return JSON.parse(data);
  } catch (error) {
    if (data.length > 0) {
      console.log(
        `[WARN] Failed to parse SSE line (${data.length} chars): ${data.substring(0, 200)}...`
      );
    }
    return null;
  }
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
