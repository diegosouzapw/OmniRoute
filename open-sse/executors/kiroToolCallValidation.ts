import { TEXT_ENCODER } from "./kiro/eventstream.ts";

/**
 * Validation + buffering helpers for Kiro's nested `tool_call` wrapper payloads.
 *
 * Extracted from kiro.ts (file-size gate, #9314) — pure functions, no dependency on
 * KiroExecutor instance state.
 */

export type JsonRecord = Record<string, unknown>;

export const KIRO_TOOL_CALL_WRAPPER = "tool_call";

export type PendingKiroWrapperToolCall = {
  toolCallId: string;
  toolName: string;
  inputKind?: "string" | "object";
  inputText?: string;
  inputObject?: Record<string, unknown>;
};

export function parseKiroToolInput(toolInput: unknown): unknown {
  if (typeof toolInput !== "string") return toolInput;
  try {
    return JSON.parse(toolInput);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid Kiro tool_call payload: input must be valid JSON (${message})`);
  }
}

export function validateKiroToolName(toolUse: JsonRecord): string {
  const toolName = typeof toolUse.name === "string" ? toolUse.name.trim() : "";
  if (!toolName) throw new Error("Invalid Kiro toolUseEvent: missing tool name");
  return toolName;
}

export function validateKiroToolCallWrapperInput(toolInput: unknown): void {
  if (toolInput === undefined) {
    throw new Error("Invalid Kiro tool_call payload: missing input");
  }
  const input = parseKiroToolInput(toolInput);
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(
      "Invalid Kiro tool_call payload: input must be an object with name and arguments"
    );
  }
  const record = input as JsonRecord;
  if (typeof record.name !== "string" || !record.name.trim()) {
    throw new Error("Invalid Kiro tool_call payload: missing nested MCP tool name at input.name");
  }
  if (!Object.prototype.hasOwnProperty.call(record, "arguments")) {
    throw new Error(
      "Invalid Kiro tool_call payload: missing nested MCP tool arguments at input.arguments"
    );
  }
}

export function validateKiroToolUse(toolUse: JsonRecord): void {
  const toolName = validateKiroToolName(toolUse);
  if (toolName === KIRO_TOOL_CALL_WRAPPER) {
    validateKiroToolCallWrapperInput(toolUse.input);
  }
}

export function appendBufferedKiroToolInput(
  toolCall: PendingKiroWrapperToolCall,
  toolInput: unknown
): void {
  if (toolInput === undefined) return;
  if (typeof toolInput === "string") {
    if (toolCall.inputKind && toolCall.inputKind !== "string") {
      throw new Error("Invalid Kiro tool_call payload: mixed input fragment types");
    }
    toolCall.inputKind = "string";
    toolCall.inputText = `${toolCall.inputText || ""}${toolInput}`;
    return;
  }
  if (toolInput && typeof toolInput === "object" && !Array.isArray(toolInput)) {
    if (toolCall.inputKind && toolCall.inputKind !== "object") {
      throw new Error("Invalid Kiro tool_call payload: mixed input fragment types");
    }
    toolCall.inputKind = "object";
    toolCall.inputObject = toolInput as Record<string, unknown>;
  }
}

export function getBufferedKiroToolInput(toolCall: PendingKiroWrapperToolCall): unknown {
  return toolCall.inputKind === "string" ? toolCall.inputText || "" : toolCall.inputObject;
}

export function encodeSse(value: string): Uint8Array {
  return TEXT_ENCODER.encode(value);
}
