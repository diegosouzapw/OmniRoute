import type {
  BoundedToolResult,
  BuildFollowUpTranscriptInput,
  ExecutedToolResult,
  ToolCall,
} from "./toolLoopTypes";

/**
 * Pure transcript builder for the server-owned tool loop (spec §5.2).
 *
 * `serializeBoundedToolResult` serializes one executed tool result to JSON text
 * and, when it exceeds a UTF-8 byte budget, truncates it at code-point
 * boundaries with a `[TRUNCATED N BYTES BY OMNIROUTE]` marker whose own bytes
 * count against the budget.
 *
 * `buildFollowUpSourceBody` appends the assistant tool-call turn and the
 * bounded tool results to the source-format `messages` array. It never mutates
 * its inputs, rejects orphan/mixed calls before building anything, and consumes
 * the total output budget per-tool in result order.
 */

export const MAX_RESULT_BYTES_PER_TOOL = 32_768;
export const MAX_RESULT_BYTES_TOTAL = 65_536;

const NON_SERIALIZABLE_ERROR = "Tool result is not JSON-serializable";

function assertValidBudget(name: string, value: number): void {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative finite integer, got ${value}`);
  }
}

function markerFor(droppedBytes: number): string {
  return `[TRUNCATED ${droppedBytes} BYTES BY OMNIROUTE]`;
}

/**
 * Returns the longest code-point-aligned prefix of `text` whose UTF-8 byte
 * length does not exceed `maxBytes`. Iterating `for...of` over a string yields
 * full code points, so surrogate pairs (astral CJK, emoji) are never split and
 * the result is always valid UTF-8.
 */
function truncateToCodePointBoundary(text: string, maxBytes: number): string {
  let out = "";
  let bytes = 0;
  for (const codePoint of text) {
    const codePointBytes = Buffer.byteLength(codePoint, "utf8");
    if (bytes + codePointBytes > maxBytes) break;
    out += codePoint;
    bytes += codePointBytes;
  }
  return out;
}

function projectSerializable(value: unknown): unknown {
  if (value === undefined) return null;
  if (value instanceof Error) return { error: value.message };
  if (typeof value === "bigint") return value.toString();
  return value;
}

export function serializeBoundedToolResult(value: unknown, maxBytes: number): BoundedToolResult {
  assertValidBudget("maxBytes", maxBytes);

  const projected = projectSerializable(value);

  let serialized: string | undefined;
  try {
    const raw = JSON.stringify(projected);
    serialized = typeof raw === "string" ? raw : undefined;
  } catch {
    serialized = undefined;
  }

  // Top-level function/symbol (JSON.stringify returns undefined, not a string)
  // and serialization exceptions (cycles, nested BigInt, exotic objects) all
  // resolve to the fixed non-serializable error shape.
  if (serialized === undefined) {
    serialized = JSON.stringify({ error: NON_SERIALIZABLE_ERROR });
  }

  const originalBytes = Buffer.byteLength(serialized, "utf8");
  if (originalBytes <= maxBytes) {
    return { text: serialized, truncated: false, originalBytes };
  }

  const fullMarker = markerFor(originalBytes);
  const fullMarkerBytes = Buffer.byteLength(fullMarker, "utf8");

  // The full marker alone does not fit: return its code-point-safe UTF-8 prefix
  // (maxBytes 0 yields the empty string).
  if (maxBytes <= fullMarkerBytes) {
    return {
      text: truncateToCodePointBoundary(fullMarker, maxBytes),
      truncated: true,
      originalBytes,
    };
  }

  // Reserve marker space first, then take the longest valid prefix of the text.
  // `dropped <= originalBytes` so markerFor(dropped) is never longer than the
  // reserved marker; the total therefore stays within maxBytes.
  const prefixBudget = maxBytes - fullMarkerBytes;
  const prefix = truncateToCodePointBoundary(serialized, prefixBudget);
  const droppedBytes = originalBytes - Buffer.byteLength(prefix, "utf8");

  return {
    text: prefix + markerFor(droppedBytes),
    truncated: true,
    originalBytes,
  };
}

function safeStringifyArguments(value: Record<string, unknown>): string {
  try {
    const raw = JSON.stringify(value);
    return typeof raw === "string" ? raw : "{}";
  } catch {
    return "{}";
  }
}

function validateCallsAndResults(toolCalls: ToolCall[], results: ExecutedToolResult[]): void {
  if (toolCalls.length !== results.length) {
    throw new Error(
      `buildFollowUpSourceBody requires toolCalls (${toolCalls.length}) and results (${results.length}) to have the same length`
    );
  }

  const callIds = toolCalls.map((call) => call.id);
  const resultIds = results.map((result) => result.id);

  if (new Set(callIds).size !== callIds.length) {
    throw new Error("buildFollowUpSourceBody requires unique tool call ids");
  }
  if (new Set(resultIds).size !== resultIds.length) {
    throw new Error("buildFollowUpSourceBody requires unique tool result ids");
  }

  const resultIdSet = new Set(resultIds);
  for (const id of callIds) {
    if (!resultIdSet.has(id)) {
      throw new Error(
        `buildFollowUpSourceBody requires every tool call to have a matching result (missing: ${id})`
      );
    }
  }

  for (const result of results) {
    const call = toolCalls.find((c) => c.id === result.id);
    if (call && call.name !== result.name) {
      throw new Error(
        `buildFollowUpSourceBody: result name "${result.name}" for id "${result.id}" does not match tool call name "${call.name}"`
      );
    }
  }
}

function extractOpenAIMessage(response: Record<string, unknown>): Record<string, unknown> | null {
  const choice = Array.isArray(response.choices) ? (response.choices[0] as unknown) : null;
  if (choice && typeof choice === "object") {
    const message = (choice as Record<string, unknown>).message;
    if (message && typeof message === "object" && !Array.isArray(message)) {
      return message as Record<string, unknown>;
    }
  }
  if (
    response.message &&
    typeof response.message === "object" &&
    !Array.isArray(response.message)
  ) {
    return response.message as Record<string, unknown>;
  }
  return null;
}

/**
 * Returns the assistant tool_calls exactly as the previous response carried
 * them (provenance preserved), restricted to calls with a matching result.
 * Falls back to reconstructing the OpenAI wire shape from the parsed
 * `toolCalls` when the response has no tool_calls of its own.
 *
 * When the previous response does carry tool_calls, validates that each
 * call ID appears exactly once with the correct name (fails closed on
 * partial, duplicate, or mismatched entries).
 */
function resolveOpenAIAssistantToolCalls(
  previousResponse: Record<string, unknown>,
  toolCalls: ToolCall[],
  matchedIds: Set<string>
): unknown[] {
  let originalToolCalls: unknown[] = [];
  const prevMessage = extractOpenAIMessage(previousResponse);
  if (prevMessage && Array.isArray(prevMessage.tool_calls)) {
    originalToolCalls = prevMessage.tool_calls as unknown[];
  }
  if (originalToolCalls.length === 0 && toolCalls.length > 0) {
    originalToolCalls = toolCalls.map((call) => ({
      id: call.id,
      type: "function",
      function: { name: call.name, arguments: safeStringifyArguments(call.arguments) },
    }));
  }

  // Validate when previous response carries its own tool_calls.
  const hasOwnToolCalls =
    prevMessage && Array.isArray(prevMessage.tool_calls) && prevMessage.tool_calls.length > 0;
  if (hasOwnToolCalls) {
    const idCounts = new Map<string, number>();
    const idNames = new Map<string, string>();
    for (const raw of originalToolCalls) {
      if (!raw || typeof raw !== "object") continue;
      const rec = raw as Record<string, unknown>;
      const id = typeof rec.id === "string" ? rec.id : undefined;
      if (id === undefined) continue;
      idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
      if (idNames.has(id)) continue;
      const fn = rec.function;
      if (
        fn &&
        typeof fn === "object" &&
        typeof (fn as Record<string, unknown>).name === "string"
      ) {
        idNames.set(id, (fn as Record<string, unknown>).name as string);
      }
    }
    for (const call of toolCalls) {
      if (!matchedIds.has(call.id)) continue;
      const count = idCounts.get(call.id) ?? 0;
      if (count !== 1) {
        throw new Error(
          `buildFollowUpSourceBody: previous response tool_calls must contain exactly one match per call ID (id "${call.id}" has ${count})`
        );
      }
      const prevName = idNames.get(call.id);
      if (prevName !== undefined && prevName !== call.name) {
        throw new Error(
          `buildFollowUpSourceBody: previous response tool_call "${call.id}" name "${prevName}" does not match tool call name "${call.name}"`
        );
      }
    }
  }

  return originalToolCalls.filter((call) => {
    if (!call || typeof call !== "object") return false;
    const record = call as Record<string, unknown>;
    const id = typeof record.id === "string" ? record.id : record.call_id;
    return typeof id === "string" && matchedIds.has(id);
  });
}

/**
 * Resolves tool_use blocks from the Claude previous response. When content
 * blocks are present, validates that each call ID appears exactly once with
 * the correct name (fails closed on partial, duplicate, or mismatched).
 * Non-tool content blocks (text, thinking, reasoning) are preserved in their
 * original order; only tool_use blocks are filtered to matched IDs.
 */
function resolveClaudeToolUseBlocks(
  previousResponse: Record<string, unknown>,
  toolCalls: ToolCall[],
  matchedIds: Set<string>
): unknown[] {
  if (Array.isArray(previousResponse.content)) {
    const blocks = previousResponse.content as unknown[];

    // Validate when content has tool_use blocks for matched IDs.
    const idCounts = new Map<string, number>();
    const idNames = new Map<string, string>();
    for (const block of blocks) {
      if (!block || typeof block !== "object") continue;
      const rec = block as Record<string, unknown>;
      if (rec.type !== "tool_use" || typeof rec.id !== "string") continue;
      if (!matchedIds.has(rec.id)) continue;
      idCounts.set(rec.id, (idCounts.get(rec.id) ?? 0) + 1);
      if (idNames.has(rec.id)) continue;
      if (typeof rec.name === "string") {
        idNames.set(rec.id, rec.name);
      }
    }
    for (const call of toolCalls) {
      if (!matchedIds.has(call.id)) continue;
      const count = idCounts.get(call.id) ?? 0;
      if (count !== 1) {
        throw new Error(
          `buildFollowUpSourceBody: previous response content must contain exactly one tool_use match per call ID (id "${call.id}" has ${count})`
        );
      }
      const prevName = idNames.get(call.id);
      if (prevName !== undefined && prevName !== call.name) {
        throw new Error(
          `buildFollowUpSourceBody: previous response tool_use "${call.id}" name "${prevName}" does not match tool call name "${call.name}"`
        );
      }
    }

    // Match prepareClaudeRequest: keep all thinking/signature blocks, keep
    // ordinary content only before the first tool_use, and retain only the
    // tool_use blocks whose results are being replayed.
    let foundToolUse = false;
    const replayBlocks: unknown[] = [];
    for (const block of blocks) {
      if (!block || typeof block !== "object") continue;
      const rec = block as Record<string, unknown>;
      if (rec.type === "tool_use") {
        foundToolUse = true;
        if (typeof rec.id === "string" && matchedIds.has(rec.id)) replayBlocks.push(block);
        continue;
      }
      if (rec.type === "thinking" || rec.type === "redacted_thinking" || !foundToolUse) {
        replayBlocks.push(block);
      }
    }
    return replayBlocks;
  }

  return toolCalls.map((call) => ({
    type: "tool_use",
    id: call.id,
    name: call.name,
    input: call.arguments,
  }));
}

export function buildFollowUpSourceBody(
  input: BuildFollowUpTranscriptInput
): Record<string, unknown> {
  const { sourceBody, previousResponse, toolCalls, results, sourceFormat } = input;
  const maxResultBytes = input.maxResultBytes ?? MAX_RESULT_BYTES_PER_TOOL;
  const maxTotalResultBytes = input.maxTotalResultBytes ?? MAX_RESULT_BYTES_TOTAL;

  if (sourceFormat !== "openai" && sourceFormat !== "claude") {
    throw new Error('sourceFormat must be "openai" or "claude"');
  }

  assertValidBudget("maxResultBytes", maxResultBytes);
  assertValidBudget("maxTotalResultBytes", maxTotalResultBytes);

  if (!Array.isArray(sourceBody.messages)) {
    throw new Error("buildFollowUpSourceBody requires sourceBody.messages array");
  }

  validateCallsAndResults(toolCalls, results);

  // When a pre-serialized map is provided (from the loop's own budget pass),
  // use its text verbatim instead of re-serializing. Otherwise serialize with
  // the standard budget logic.
  const serializedResultTextById = input.serializedResultTextById;
  let boundedResults: BoundedToolResult[];
  if (serializedResultTextById) {
    boundedResults = results.map((result) => {
      const text = serializedResultTextById.get(result.id) ?? "";
      return { text, truncated: false, originalBytes: Buffer.byteLength(text, "utf8") };
    });
  } else {
    let remainingBytes = maxTotalResultBytes;
    boundedResults = results.map((result) => {
      const itemMaxBytes = Math.min(maxResultBytes, remainingBytes);
      const bounded = serializeBoundedToolResult(result.result, itemMaxBytes);
      remainingBytes -= Buffer.byteLength(bounded.text, "utf8");
      return bounded;
    });
  }

  const matchedIds = new Set(results.map((result) => result.id));
  const messages = [...(sourceBody.messages as unknown[])];

  if (sourceFormat === "openai") {
    const prevMessage = extractOpenAIMessage(previousResponse);
    const previousContent = prevMessage && "content" in prevMessage ? prevMessage.content : null;

    const assistantMessage: Record<string, unknown> = {
      role: "assistant",
      content: previousContent ?? null,
    };
    const assistantToolCalls = resolveOpenAIAssistantToolCalls(
      previousResponse,
      toolCalls,
      matchedIds
    );
    if (assistantToolCalls.length > 0) {
      assistantMessage.tool_calls = assistantToolCalls;
    }
    messages.push(assistantMessage);

    boundedResults.forEach((bounded, index) => {
      messages.push({
        role: "tool",
        tool_call_id: results[index].id,
        content: bounded.text,
      });
    });

    return { ...sourceBody, messages, stream: false };
  }

  // Claude Messages: the original assistant tool_use turn, then a separate
  // user tool_result message. A tool_result must never share the assistant
  // content — Anthropic rejects it (openai-to-claude.ts:323).
  const toolUseBlocks = resolveClaudeToolUseBlocks(previousResponse, toolCalls, matchedIds);
  messages.push({ role: "assistant", content: toolUseBlocks });
  messages.push({
    role: "user",
    content: boundedResults.map((bounded, index) => ({
      type: "tool_result",
      tool_use_id: results[index].id,
      content: bounded.text,
    })),
  });

  return { ...sourceBody, messages };
}
