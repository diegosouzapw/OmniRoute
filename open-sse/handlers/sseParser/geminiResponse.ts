// Gemini/Antigravity buffered-SSE -> chat.completion conversion (#7408).
// Extracted verbatim from sseParser.ts (file-size cap): pure parsing, no host
// state, following the handlers submodule pattern (chatCore/, responseSanitizer/).
import { normalizeOpenAICompatibleFinishReasonString } from "../../utils/finishReason.ts";

type AccumulatedToolCall = {
  id: string;
  index: number;
  type: "function";
  function: { name: string; arguments: string };
};

/** Mutable accumulator threaded through one SSE payload's worth of parsing. */
type GeminiSSEAccumulator = {
  textContent: string;
  finishReason: string;
  usage: Record<string, unknown> | null;
  sawContent: boolean;
  toolCalls: AccumulatedToolCall[];
};

function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
  return value;
}

/**
 * Detect the `[Tool call: name]\nArguments: {...}` textual convention some
 * Gemini/Antigravity models emit instead of a native functionCall part.
 */
function tryParseTextualToolCall(text: string): { name: string; args: unknown } | null {
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");
  const match = normalized.match(
    /^[\s\S]*?\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*([\s\S]+?)\s*$/
  );
  if (!match) return null;
  const name = match[1]?.trim();
  const rawArgs = match[2]?.trim();
  if (!name || !rawArgs) return null;
  try {
    return { name, args: stripZeroWidth(JSON.parse(rawArgs)) };
  } catch {
    return null;
  }
}

/** Extract the markdown shortcut some Gemini variants send (top-level or nested). */
function extractGeminiMarkdownShortcut(parsed: Record<string, unknown>): string | null {
  if (typeof parsed.markdown === "string") return parsed.markdown;
  const response = parsed.response as Record<string, unknown> | undefined;
  return typeof response?.markdown === "string" ? response.markdown : null;
}

/** Append one candidate content part (text or textual tool call) onto the accumulator. */
function applyCandidatePart(part: Record<string, unknown>, acc: GeminiSSEAccumulator): void {
  if (typeof part.text !== "string" || part.thought || part.thoughtSignature) return;

  const textualToolCall = tryParseTextualToolCall(part.text);
  if (textualToolCall) {
    acc.toolCalls.push({
      id: `${textualToolCall.name}-${Date.now()}-${acc.toolCalls.length}`,
      index: acc.toolCalls.length,
      type: "function",
      function: {
        name: textualToolCall.name,
        arguments: JSON.stringify(textualToolCall.args || {}),
      },
    });
  } else {
    acc.textContent += part.text;
  }
  acc.sawContent = true;
}

/** Walk the first candidate's content parts, if present, mutating the accumulator. */
function applyCandidateContentParts(
  candidate: Record<string, unknown> | undefined,
  acc: GeminiSSEAccumulator
): void {
  const content = candidate?.content as Record<string, unknown> | undefined;
  const parts = content?.parts;
  if (!Array.isArray(parts)) return;
  for (const part of parts) {
    applyCandidatePart(part as Record<string, unknown>, acc);
  }
}

/** Normalize and apply the candidate's finishReason, if present. */
function applyFinishReason(
  candidate: Record<string, unknown> | undefined,
  acc: GeminiSSEAccumulator
): void {
  if (!candidate?.finishReason) return;
  acc.finishReason = normalizeOpenAICompatibleFinishReasonString(
    String(candidate.finishReason).toLowerCase()
  );
}

/** Extract usageMetadata into the OpenAI-shaped usage object, if present. */
function applyUsageMetadata(parsed: Record<string, unknown>, acc: GeminiSSEAccumulator): void {
  const response = parsed.response as Record<string, unknown> | undefined;
  const um = response?.usageMetadata as Record<string, unknown> | undefined;
  if (!um) return;
  acc.usage = {
    prompt_tokens: um.promptTokenCount || 0,
    completion_tokens: um.candidatesTokenCount || 0,
    total_tokens: um.totalTokenCount || 0,
  };
}

/** Parse one `data:` line's JSON payload and fold it into the accumulator (best-effort). */
function applyGeminiSSEDataLine(payload: string, acc: GeminiSSEAccumulator): void {
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;

    const markdown = extractGeminiMarkdownShortcut(parsed);
    if (markdown) {
      acc.textContent += markdown;
      acc.sawContent = true;
    }

    const response = parsed.response as Record<string, unknown> | undefined;
    const candidates = response?.candidates;
    const candidate = Array.isArray(candidates)
      ? (candidates[0] as Record<string, unknown> | undefined)
      : undefined;

    applyCandidateContentParts(candidate, acc);
    applyFinishReason(candidate, acc);
    applyUsageMetadata(parsed, acc);
  } catch {
    // Ignore malformed lines
  }
}

/** Assemble the final non-streaming chat.completion payload from the accumulator. */
function buildChatCompletionFromAccumulator(
  acc: GeminiSSEAccumulator,
  fallbackModel: string
): Record<string, unknown> {
  const message: Record<string, unknown> = {
    role: "assistant",
    content: acc.textContent || null,
  };

  let finishReason = acc.finishReason;
  if (acc.toolCalls.length > 0) {
    message.tool_calls = acc.toolCalls;
    finishReason = "tool_calls";
  }

  const result: Record<string, unknown> = {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: fallbackModel || "unknown",
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason,
      },
    ],
  };

  if (acc.usage) {
    result.usage = acc.usage;
  }

  return result;
}

/**
 * Convert Gemini/Antigravity SSE chunks into a single non-streaming OpenAI
 * chat.completion JSON response.  Gemini SSE carries payloads like:
 *
 *   data: {"markdown":"...chunk..."}
 *   data: {"response":{"candidates":[{"content":{"parts":[{"text":"..."}]},"finishReason":"STOP"}],"usageMetadata":{...}}}
 *   data: {"remainingCredits":[...]}
 *
 * Reuses the same parsing logic as processAntigravitySSEPayload() in sseCollect.ts
 * so that format conversion is functionally equivalent to the previous
 * collectStreamToResponse() approach.  Intentional differences:
 *   - remainingCredits is NOT embedded into the result (handled separately
 *     by the credits-extraction TransformStream in antigravity.ts).
 *   - The synthetic `id` uses `chatcmpl-${Date.now()}` (no UUID suffix)
 *     because this path runs once per response, not per chunk.
 */
export function parseSSEToGeminiResponse(
  rawSSE: string,
  fallbackModel: string
): Record<string, unknown> | null {
  const lines = String(rawSSE || "").split("\n");
  const acc: GeminiSSEAccumulator = {
    textContent: "",
    finishReason: "stop",
    usage: null,
    sawContent: false,
    toolCalls: [],
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    applyGeminiSSEDataLine(payload, acc);
  }

  if (!acc.sawContent && acc.toolCalls.length === 0) return null;

  return buildChatCompletionFromAccumulator(acc, fallbackModel);
}
