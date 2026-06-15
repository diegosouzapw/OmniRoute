import { convertOpenAIToResponsesToolCall } from "../handlers/responseTranslator.ts";
import { v4 as uuidv4 } from "uuid";

import { asRecord } from "./utils.ts";
import { JsonRecord, ToolCall } from "./types.ts";

export function parseTextualToolCallFromContent(
  text: unknown
): { name: string; args: unknown } | null {
  const candidate = parseTextualToolCallCandidate(text);
  return candidate?.kind === "complete" ? { name: candidate.name, args: candidate.args } : null;
}

export function containsTextualToolCallCandidate(text: unknown): boolean {
  return parseTextualToolCallCandidate(text) !== null;
}

export function containsMalformedTextualToolCall(
  text: unknown,
  allowedToolNames?: Set<string> | null
): boolean {
  if (typeof text !== "string") return false;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");

  let searchIdx = 0;
  while (true) {
    const idx = normalized.indexOf("[Tool call:", searchIdx);
    if (idx === -1) break;

    const candidate = normalized.slice(idx);
    if (isValidToolCallHeaderPrefix(candidate)) {
      const parsed = parseTextualToolCallFromContent(candidate);
      if (parsed) {
        if (allowedToolNames?.size && !allowedToolNames.has(parsed.name)) {
          return true;
        }
      } else {
        return true;
      }
    }

    searchIdx = idx + 1;
  }
  return false;
}

export function extractAllowedToolNames(body: unknown): Set<string> | null {
  const record = asRecord(body);
  const tools = record.tools;
  if (!Array.isArray(tools)) return null;
  const names = new Set<string>();
  for (const tool of tools) {
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) continue;
    const item = tool as JsonRecord;
    const directName = typeof item.name === "string" ? item.name.trim() : "";
    const fn =
      item.function && typeof item.function === "object" && !Array.isArray(item.function)
        ? (item.function as JsonRecord)
        : null;
    const functionName = typeof fn?.name === "string" ? fn.name.trim() : "";
    const name = functionName || directName;
    if (name) names.add(name);
  }
  return names.size > 0 ? names : null;
}

export function collectPassthroughTextualToolCall(
  text: string,
  toolCalls: Map<string, ToolCall>,
  allowedToolNames?: Set<string> | null
): ToolCall | null {
  const parsed = parseTextualToolCallFromContent(text);
  if (!parsed) return null;
  if (allowedToolNames?.size && !allowedToolNames.has(parsed.name)) return null;
  const key = `textual:${toolCalls.size}`;
  const toolCall: ToolCall = {
    id: `call_${Date.now()}_${toolCalls.size}`,
    index: toolCalls.size,
    type: "function",
    function: {
      name: parsed.name,
      arguments: JSON.stringify(parsed.args || {}),
    },
  };
  toolCalls.set(key, toolCall);
  return toolCall;
}
