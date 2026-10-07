/**
 * Does an SSE chunk carry output the user can see?
 *
 * TTFT is measured to the first forwarded chunk that carries text, reasoning or a tool call,
 * in the format the client receives: OpenAI Chat Completions, Claude Messages, OpenAI
 * Responses or Gemini. Lifecycle frames (message_start, response.created, role-only deltas,
 * keepalive chunks, pings, comments) do not count.
 *
 * The stream only calls this until the first match, so parsing a few early frames is cheap.
 */

const RESPONSES_TOOL_ITEM_TYPES = new Set([
  "function_call",
  "custom_tool_call",
  "local_shell_call",
  "mcp_call",
  "computer_call",
]);

const CLAUDE_TOOL_BLOCK_TYPES = new Set(["tool_use", "server_tool_use", "mcp_tool_use"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function hasText(value: unknown): boolean {
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

function chatChoiceCarriesOutput(choice: unknown): boolean {
  if (!isRecord(choice)) return false;
  const delta = isRecord(choice.delta)
    ? choice.delta
    : isRecord(choice.message)
      ? choice.message
      : null;
  if (!delta) return false;
  return (
    hasText(delta.content) ||
    hasText(delta.reasoning_content) ||
    hasText(delta.reasoning) ||
    hasText(delta.refusal) ||
    (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) ||
    isRecord(delta.function_call)
  );
}

/** Claude Messages and OpenAI Responses events; null when the type belongs to neither. */
function typedEventCarriesOutput(type: string, event: Record<string, unknown>): boolean | null {
  if (type === "content_block_delta" && isRecord(event.delta)) {
    const delta = event.delta;
    return hasText(delta.text) || hasText(delta.thinking) || hasText(delta.partial_json);
  }
  if (type === "content_block_start" && isRecord(event.content_block)) {
    return CLAUDE_TOOL_BLOCK_TYPES.has(String(event.content_block.type));
  }
  if (type.startsWith("response.") && type.endsWith(".delta")) return hasText(event.delta);
  if (type === "response.output_item.added" && isRecord(event.item)) {
    return RESPONSES_TOOL_ITEM_TYPES.has(String(event.item.type));
  }
  return null;
}

function geminiCandidatesCarryOutput(candidates: unknown[]): boolean {
  return candidates.some((candidate) => {
    const parts =
      isRecord(candidate) && isRecord(candidate.content) ? candidate.content.parts : null;
    return (
      Array.isArray(parts) &&
      parts.some((part) => isRecord(part) && (hasText(part.text) || isRecord(part.functionCall)))
    );
  });
}

function eventCarriesOutput(event: Record<string, unknown>): boolean {
  if (Array.isArray(event.choices)) return event.choices.some(chatChoiceCarriesOutput);

  const typed = typedEventCarriesOutput(typeof event.type === "string" ? event.type : "", event);
  if (typed !== null) return typed;

  // Antigravity clients get Gemini candidates wrapped in `response` (openai-to-antigravity).
  if (isRecord(event.response) && Array.isArray(event.response.candidates)) {
    return geminiCandidatesCarryOutput(event.response.candidates);
  }
  if (Array.isArray(event.candidates)) return geminiCandidatesCarryOutput(event.candidates);
  return false;
}

/** True when any `data:` event in this SSE chunk carries text, reasoning or a tool call. */
export function sseChunkCarriesOutput(chunk: string): boolean {
  if (!chunk.includes("data:")) return false;
  for (const line of chunk.split("\n")) {
    const trimmed = line.trimStart();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (payload.length === 0 || payload[0] !== "{") continue;
    let event: unknown;
    try {
      event = JSON.parse(payload);
    } catch {
      continue;
    }
    if (isRecord(event) && eventCarriesOutput(event)) return true;
  }
  return false;
}
