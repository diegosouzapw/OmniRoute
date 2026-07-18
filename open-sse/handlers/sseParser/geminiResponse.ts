// Gemini/Antigravity buffered-SSE -> chat.completion conversion (#7408).
// Extracted verbatim from sseParser.ts (file-size cap): pure parsing, no host
// state, following the handlers submodule pattern (chatCore/, responseSanitizer/).
import { normalizeOpenAICompatibleFinishReasonString } from "../../utils/finishReason.ts";

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
  let textContent = "";
  let finishReason = "stop";
  let usage: Record<string, unknown> | null = null;
  let sawContent = false;

  type AccumulatedToolCall = {
    id: string;
    index: number;
    type: "function";
    function: { name: string; arguments: string };
  };
  const toolCalls: AccumulatedToolCall[] = [];

  const stripZeroWidth = (value: unknown): unknown => {
    if (typeof value === "string") return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
    return value;
  };

  const tryParseTextualToolCall = (text: string): { name: string; args: unknown } | null => {
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
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    try {
      const parsed = JSON.parse(payload);

      // Markdown shortcut (some Gemini variants)
      const markdown =
        typeof parsed?.markdown === "string"
          ? parsed.markdown
          : typeof parsed?.response?.markdown === "string"
            ? parsed.response.markdown
            : null;
      if (markdown) {
        textContent += markdown;
        sawContent = true;
      }

      // Candidate content parts
      const candidate = parsed?.response?.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (typeof part.text === "string" && !part.thought && !part.thoughtSignature) {
            const textualToolCall = tryParseTextualToolCall(part.text);
            if (textualToolCall) {
              toolCalls.push({
                id: `${textualToolCall.name}-${Date.now()}-${toolCalls.length}`,
                index: toolCalls.length,
                type: "function",
                function: {
                  name: textualToolCall.name,
                  arguments: JSON.stringify(textualToolCall.args || {}),
                },
              });
            } else {
              textContent += part.text;
            }
            sawContent = true;
          }
        }
      }

      if (candidate?.finishReason) {
        finishReason = normalizeOpenAICompatibleFinishReasonString(
          String(candidate.finishReason).toLowerCase()
        );
      }

      if (parsed?.response?.usageMetadata) {
        const um = parsed.response.usageMetadata;
        usage = {
          prompt_tokens: um.promptTokenCount || 0,
          completion_tokens: um.candidatesTokenCount || 0,
          total_tokens: um.totalTokenCount || 0,
        };
      }
    } catch {
      // Ignore malformed lines
    }
  }

  if (!sawContent && toolCalls.length === 0) return null;

  const message: Record<string, unknown> = {
    role: "assistant",
    content: textContent || null,
  };

  if (toolCalls.length > 0) {
    message.tool_calls = toolCalls;
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

  if (usage) {
    result.usage = usage;
  }

  return result;
}
