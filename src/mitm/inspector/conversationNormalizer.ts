/**
 * Provider-neutral conversation projection for Traffic Inspector views.
 *
 * This is an independent implementation of the public OpenAI, Anthropic, and
 * Gemini payload shapes. It intentionally emits only the normalized block
 * types consumed by the inspector UI.
 */

import { mergeStream, parseSseStream } from "./sseMerger.ts";
import type {
  InterceptedRequest,
  NormalizedBlock,
  NormalizedConversation,
  NormalizedTurn,
} from "./types.ts";

type JsonRecord = Record<string, unknown>;
type NormalizedRole = NormalizedTurn["role"];

const WRAPPER_KEYS = ["body", "payload", "data", "request", "requestBody", "response"];

function asRecord(value: unknown): JsonRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function tryParseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return null;
  }
}

function hasConversationShape(record: JsonRecord): boolean {
  return (
    "messages" in record ||
    "input" in record ||
    "contents" in record ||
    "system" in record ||
    "systemInstruction" in record ||
    "choices" in record ||
    "candidates" in record ||
    "content" in record ||
    "output" in record
  );
}

function unwrapPayload(value: unknown): unknown {
  let current = tryParseJson(value);
  for (let depth = 0; depth < 5; depth += 1) {
    const record = asRecord(current);
    if (!record || hasConversationShape(record)) return current;
    let next: unknown = undefined;
    for (const key of WRAPPER_KEYS) {
      if (record[key] !== undefined) {
        next = record[key];
        break;
      }
    }
    if (next === undefined) return current;
    current = tryParseJson(next);
  }
  return current;
}

function normalizedRole(value: unknown): NormalizedRole | null {
  if (value === "system" || value === "user" || value === "assistant" || value === "tool") {
    return value;
  }
  if (value === "model") return "assistant";
  if (value === "function") return "tool";
  return null;
}

function textBlock(value: unknown): NormalizedBlock | null {
  return typeof value === "string" && value.length > 0 ? { type: "text", text: value } : null;
}

function parseArguments(value: unknown): unknown {
  if (typeof value !== "string") return value ?? {};
  if (!value.trim()) return {};
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

function toolUseBlock(value: JsonRecord): NormalizedBlock | null {
  const directFunction = asRecord(value.function);
  const geminiFunction = asRecord(value.functionCall);
  const source = directFunction ?? geminiFunction ?? value;
  const name = typeof source.name === "string" ? source.name : null;
  if (!name) return null;

  const idValue = value.id ?? value.call_id ?? geminiFunction?.id ?? name;
  const input =
    source.arguments !== undefined
      ? parseArguments(source.arguments)
      : source.args !== undefined
        ? source.args
        : source.input !== undefined
          ? source.input
          : {};
  return {
    type: "tool_use",
    id: typeof idValue === "string" ? idValue : name,
    name,
    input,
  };
}

function toolResultBlock(value: JsonRecord): NormalizedBlock | null {
  const geminiResponse = asRecord(value.functionResponse);
  const idValue =
    value.tool_use_id ??
    value.tool_call_id ??
    value.call_id ??
    geminiResponse?.id ??
    geminiResponse?.name;
  if (typeof idValue !== "string") return null;
  const content =
    value.output !== undefined
      ? value.output
      : value.content !== undefined
        ? value.content
        : geminiResponse?.response;
  return { type: "tool_result", tool_use_id: idValue, content };
}

function reasoningBlocks(value: JsonRecord): NormalizedBlock[] {
  const blocks: NormalizedBlock[] = [];
  const summary = Array.isArray(value.summary) ? value.summary : [];
  for (const entry of summary) {
    const record = asRecord(entry);
    const block = textBlock(record?.text);
    if (block) blocks.push(block);
  }
  return blocks;
}

function blocksFromPart(value: unknown): NormalizedBlock[] {
  if (typeof value === "string") {
    const block = textBlock(value);
    return block ? [block] : [];
  }
  const part = asRecord(value);
  if (!part) return [];

  const type = typeof part.type === "string" ? part.type : "";
  if (type === "tool_use" || type === "function_call" || part.functionCall) {
    const block = toolUseBlock(part);
    return block ? [block] : [];
  }
  if (type === "tool_result" || type === "function_call_output" || part.functionResponse) {
    const block = toolResultBlock(part);
    return block ? [block] : [];
  }
  if (type === "reasoning") return reasoningBlocks(part);
  if (
    type === "text" ||
    type === "input_text" ||
    type === "output_text" ||
    type === "summary_text" ||
    type === ""
  ) {
    const block = textBlock(part.text);
    return block ? [block] : [];
  }
  return [];
}

function blocksFromContent(value: unknown): NormalizedBlock[] {
  if (Array.isArray(value)) return value.flatMap(blocksFromPart);
  return blocksFromPart(value);
}

function turnFromMessage(value: unknown): NormalizedTurn | null {
  const message = asRecord(value);
  if (!message) return null;
  const type = typeof message.type === "string" ? message.type : "";

  if (type === "function_call") {
    const block = toolUseBlock(message);
    return block ? { role: "assistant", blocks: [block] } : null;
  }
  if (type === "function_call_output") {
    const block = toolResultBlock(message);
    return block ? { role: "tool", blocks: [block] } : null;
  }
  if (type === "reasoning") {
    const blocks = reasoningBlocks(message);
    return blocks.length > 0 ? { role: "assistant", blocks } : null;
  }

  const role = normalizedRole(message.role);
  if (!role) return null;
  if (role === "tool") {
    const block = toolResultBlock(message);
    return block ? { role, blocks: [block] } : null;
  }

  const blocks = blocksFromContent(message.content ?? message.parts);
  for (const rawCall of Array.isArray(message.tool_calls) ? message.tool_calls : []) {
    const call = asRecord(rawCall);
    const block = call ? toolUseBlock(call) : null;
    if (block) blocks.push(block);
  }
  const legacyCall = asRecord(message.function_call);
  if (legacyCall) {
    const block = toolUseBlock({
      id: message.tool_call_id ?? legacyCall.name,
      function: legacyCall,
    });
    if (block) blocks.push(block);
  }
  if (blocks.length === 0) return null;
  const projectedRole =
    role === "user" && blocks.every((block) => block.type === "tool_result") ? "tool" : role;
  return { role: projectedRole, blocks };
}

function turnsFromItems(items: unknown[]): NormalizedTurn[] {
  const turns: NormalizedTurn[] = [];
  for (const item of items) {
    const turn = turnFromMessage(item);
    if (turn) turns.push(turn);
  }
  return turns;
}

function systemTurn(value: unknown): NormalizedTurn | null {
  const record = asRecord(value);
  const content = record?.parts ?? value;
  const blocks = blocksFromContent(content);
  return blocks.length > 0 ? { role: "system", blocks } : null;
}

/** Normalize a decoded request payload, or a JSON string/wrapper containing one. */
export function buildRequestTurns(body: unknown): NormalizedTurn[] | null {
  const payload = asRecord(unwrapPayload(body));
  if (!payload) {
    const block = textBlock(typeof body === "string" ? body : null);
    return block ? [{ role: "user", blocks: [block] }] : null;
  }

  const turns: NormalizedTurn[] = [];
  const topLevelSystem = payload.systemInstruction ?? payload.system ?? payload.instructions;
  if (topLevelSystem !== undefined) {
    const turn = systemTurn(topLevelSystem);
    if (turn) turns.push(turn);
  }

  if (Array.isArray(payload.messages)) turns.push(...turnsFromItems(payload.messages));
  if (Array.isArray(payload.contents)) turns.push(...turnsFromItems(payload.contents));
  if (Array.isArray(payload.input)) turns.push(...turnsFromItems(payload.input));
  if (typeof payload.input === "string") {
    const block = textBlock(payload.input);
    if (block) turns.push({ role: "user", blocks: [block] });
  }

  return turns.length > 0 ? turns : null;
}

function turnFromAnthropicResponse(payload: JsonRecord): NormalizedTurn | null {
  if (!Array.isArray(payload.content)) return null;
  const blocks = blocksFromContent(payload.content);
  return blocks.length > 0 ? { role: "assistant", blocks } : null;
}

function turnsFromOpenAiResponse(payload: JsonRecord): NormalizedTurn[] {
  const turns: NormalizedTurn[] = [];
  for (const rawChoice of Array.isArray(payload.choices) ? payload.choices : []) {
    const choice = asRecord(rawChoice);
    const turn = choice ? turnFromMessage(choice.message ?? choice.delta) : null;
    if (turn) turns.push(turn);
  }
  return turns;
}

function turnsFromGeminiResponse(payload: JsonRecord): NormalizedTurn[] {
  const turns: NormalizedTurn[] = [];
  for (const rawCandidate of Array.isArray(payload.candidates) ? payload.candidates : []) {
    const candidate = asRecord(rawCandidate);
    const content = asRecord(candidate?.content);
    const blocks = blocksFromContent(content?.parts);
    if (blocks.length > 0) turns.push({ role: "assistant", blocks });
  }
  return turns;
}

function turnsFromResponsesApi(payload: JsonRecord): NormalizedTurn[] {
  return turnsFromItems(Array.isArray(payload.output) ? payload.output : []);
}

function isSseResponse(req: InterceptedRequest): boolean {
  const contentType =
    req.responseHeaders["content-type"] ?? req.responseHeaders["Content-Type"] ?? "";
  const body = req.responseBody ?? "";
  return (
    contentType.toLowerCase().includes("text/event-stream") ||
    body.startsWith("data:") ||
    body.startsWith("event:") ||
    body.includes("\ndata:") ||
    body.includes("\nevent:")
  );
}

/** Normalize the response side of an intercepted request. */
export function buildResponseTurns(req: InterceptedRequest): NormalizedTurn[] {
  if (!req.responseBody) return [];
  let decoded: unknown;
  if (isSseResponse(req)) {
    decoded = mergeStream(parseSseStream(req.responseBody)).message;
  } else {
    decoded = unwrapPayload(req.responseBody);
  }
  const payload = asRecord(unwrapPayload(decoded));
  if (!payload) return [];

  const turns = turnsFromOpenAiResponse(payload);
  turns.push(...turnsFromGeminiResponse(payload));
  turns.push(...turnsFromResponsesApi(payload));
  const anthropic = turnFromAnthropicResponse(payload);
  if (anthropic) turns.push(anthropic);
  if (turns.length > 0) return turns;

  const nestedMessage = turnFromMessage(payload.message);
  return nestedMessage ? [nestedMessage] : [];
}

export function normalizeConversation(req: InterceptedRequest): NormalizedConversation | null {
  if (req.detectedKind !== undefined && req.detectedKind !== "llm") return null;
  const request = buildRequestTurns(req.requestBody);
  if (!request || request.length === 0) return null;
  return {
    request,
    response: buildResponseTurns(req),
    contextKey: req.contextKey ?? null,
  };
}
