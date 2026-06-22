import { ToolCall } from "./types.ts";

// Local helpers for textual tool call parsing (extracted from monolithic stream.ts)
function parseTextualToolCallCandidate(text: unknown): { kind: string; name: string; args: unknown } | null {
  if (typeof text !== "string") return null;
  const trimmed = text.trim();
  const funcMatch = trimmed.match(/^(\w+)\s*:\s*(\{[^]*?\}|\[[^]*?\]|`[^`]*`|"[^"]*"|\S+)\s*$/);
  if (funcMatch) {
    try {
      return { kind: "complete", name: funcMatch[1], args: JSON.parse(funcMatch[2]) };
    } catch {
      return { kind: "incomplete", name: funcMatch[1], args: funcMatch[2] };
    }
  }
  return null;
}

function isValidToolCallHeaderPrefix(token: string): boolean {
  if (!token) return false;
  return /^[a-zA-Z_]\w*$/.test(token) || /^[a-zA-Z_]\w*\s*[:=]\s*$/.test(token);
}

export function parseTextualToolCallFromContent(text: unknown): { name: string; args: unknown } | null {
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
  if (!body || typeof body !== "object") return null;
  const tools = (body as Record<string, unknown>).tools;
  if (!Array.isArray(tools) || tools.length === 0) return null;
  const names = new Set<string>();
  for (const tool of tools) {
    if (tool && typeof tool === "object") {
      const name = ((tool as Record<string, unknown>).function as Record<string, unknown>)?.name;
      if (typeof name === "string") names.add(name);
    }
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
