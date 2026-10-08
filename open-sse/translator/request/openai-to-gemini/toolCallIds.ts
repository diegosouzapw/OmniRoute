import type { GeminiContent, GeminiPart } from "./helpers.ts";

type NativeTool = Record<string, unknown> & { id: string };

function ambiguousCallError(): Error {
  return Object.assign(new Error("Cannot translate overlapping tool calls with the same ID."), {
    statusCode: 400,
    errorType: "invalid_request_error",
  });
}

function trackPendingCall(pending: Set<string>, id: unknown): void {
  if (typeof id !== "string" || !id) return;
  if (pending.has(id)) throw ambiguousCallError();
  pending.add(id);
}

export function validateChronologicalToolCallIds(
  messages: Record<string, unknown>[] | undefined
): void {
  if (!Array.isArray(messages)) return;
  const pending = new Set<string>();
  for (const message of messages) {
    if (message.role === "assistant" && Array.isArray(message.tool_calls)) {
      for (const call of message.tool_calls as Array<Record<string, unknown>>) {
        if (call.type === "function") trackPendingCall(pending, call.id);
      }
    } else if (message.role === "tool" && typeof message.tool_call_id === "string") {
      pending.delete(message.tool_call_id);
    }
  }
}

function readNativeTool(
  part: GeminiPart,
  key: "functionCall" | "functionResponse"
): NativeTool | null {
  const value = part[key];
  if (!value || typeof value !== "object") return null;
  const tool = value as Record<string, unknown>;
  return typeof tool.id === "string" && tool.id ? (tool as NativeTool) : null;
}

function reserveToolIds(contents: GeminiContent[]): Set<string> {
  const ids = new Set<string>();
  for (const content of contents) {
    for (const part of content.parts) {
      for (const key of ["functionCall", "functionResponse"] as const) {
        const tool = readNativeTool(part, key);
        if (tool) ids.add(tool.id);
      }
    }
  }
  return ids;
}

function allocateWireId(
  id: string,
  reserved: Set<string>,
  nextOccurrence: Map<string, number>
): string {
  let occurrence = nextOccurrence.get(id) ?? 1;
  if (occurrence === 1) {
    nextOccurrence.set(id, 2);
    return id;
  }
  let wireId: string;
  do {
    wireId = `${id}_occ${occurrence++}`;
  } while (reserved.has(wireId));
  reserved.add(wireId);
  nextOccurrence.set(id, occurrence);
  return wireId;
}

export function normalizeGeminiToolCallIds(contents: GeminiContent[]): GeminiContent[] {
  const reserved = reserveToolIds(contents);
  const nextOccurrence = new Map<string, number>();
  const pending = new Map<string, string>();
  return contents.map((content) => ({
    ...content,
    parts: content.parts.map((part) => {
      const call = readNativeTool(part, "functionCall");
      if (call) {
        if (pending.has(call.id)) throw ambiguousCallError();
        const wireId = allocateWireId(call.id, reserved, nextOccurrence);
        pending.set(call.id, wireId);
        return wireId === call.id ? part : { ...part, functionCall: { ...call, id: wireId } };
      }
      const response = readNativeTool(part, "functionResponse");
      if (!response) return part;
      const wireId = pending.get(response.id);
      pending.delete(response.id);
      return wireId === undefined || wireId === response.id
        ? part
        : { ...part, functionResponse: { ...response, id: wireId } };
    }),
  }));
}
