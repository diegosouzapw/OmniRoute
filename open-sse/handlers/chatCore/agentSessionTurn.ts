/**
 * Pure helper for extracting simplified turns (user prompt, assistant reply, tool names)
 * from coding-agent requests and responses for session message logging.
 *
 * Request shapes: Anthropic Messages / OpenAI Chat `messages`, OpenAI Responses `input`.
 * Response shapes: Anthropic `content[]`, OpenAI Chat `choices[0].message` (also what the
 * stream assembler reports for every client format), OpenAI Responses `output[]`.
 */

import { TOOL_USE_NAMES_FIELD } from "../../utils/sessionTurnToolNames.ts";

type JsonRecord = Record<string, unknown>;

export const MAX_TURN_TEXT_CHARS = 4_000;
const MAX_TURN_TOOL_NAMES = 20;
/** Placeholder cloneBoundedForLog puts where the log copy of a request exceeds its depth cap. */
const LOG_MAX_DEPTH_MARKER = "[MaxDepth]";

const USER_TEXT_PARTS: ReadonlySet<string> = new Set(["text", "input_text"]);
const ASSISTANT_TEXT_PARTS: ReadonlySet<string> = new Set(["text", "output_text"]);
const RESPONSES_TOOL_OUTPUT_TYPES: ReadonlySet<string> = new Set([
  "function_call_output",
  "custom_tool_call_output",
]);
const RESPONSES_TOOL_CALL_TYPES: ReadonlySet<string> = new Set([
  "function_call",
  "custom_tool_call",
]);

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function cleanTurnText(text: string): string {
  // Strip control characters except newline and tab
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

/**
 * Remove `<system-reminder>...</system-reminder>` blocks injected into prompts.
 */
function stripSystemReminders(text: string): string {
  return text.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, "").trim();
}

function capTurnText(text: string): { text: string | null; truncated: boolean } {
  if (!text) return { text: null, truncated: false };
  if (text.length > MAX_TURN_TEXT_CHARS) {
    return { text: text.slice(0, MAX_TURN_TEXT_CHARS), truncated: true };
  }
  return { text, truncated: false };
}

/** Text of a string or of the `text` parts listed in `partTypes` (untyped parts included). */
function contentText(content: unknown, partTypes: ReadonlySet<string>): string {
  if (typeof content === "string") return content === LOG_MAX_DEPTH_MARKER ? "" : content;
  if (!Array.isArray(content)) return "";
  const parts: string[] = [];
  for (const part of content) {
    const record = asRecord(part);
    if (!record || typeof record.text !== "string") continue;
    if (!record.type || partTypes.has(String(record.type))) parts.push(record.text);
  }
  return parts.join("\n\n");
}

/** A tool result closes the tool loop; the request then carries no new user prompt. */
function isToolResultEntry(entry: JsonRecord): boolean {
  if (entry.role === "tool") return true;
  if (RESPONSES_TOOL_OUTPUT_TYPES.has(String(entry.type))) return true;
  return (
    entry.role === "user" &&
    Array.isArray(entry.content) &&
    entry.content.length > 0 &&
    entry.content.every((part) => asRecord(part)?.type === "tool_result")
  );
}

/**
 * Latest user prompt of the request: walks back past system, developer, assistant and tool-call
 * entries to the last user entry. A tool result met first (Anthropic `tool_result`, Chat
 * `role: "tool"`, Responses `function_call_output`) means the request only continues the tool
 * loop and carries no new prompt.
 */
function lastUserContent(body: JsonRecord): unknown {
  if (typeof body.input === "string") return body.input;
  const entries = Array.isArray(body.messages)
    ? body.messages
    : Array.isArray(body.input)
      ? body.input
      : [];
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = asRecord(entries[i]);
    if (!entry) continue;
    if (isToolResultEntry(entry)) return null;
    if (entry.role === "user") return entry.content;
  }
  return null;
}

/**
 * Extract the user prompt text from an Anthropic Messages, OpenAI Chat or OpenAI Responses
 * request body.
 */
export function extractUserTurnText(body: unknown): { text: string | null; truncated: boolean } {
  const record = asRecord(body);
  if (!record) return { text: null, truncated: false };
  const rawText = contentText(lastUserContent(record), USER_TEXT_PARTS);
  return capTurnText(cleanTurnText(stripSystemReminders(rawText)));
}

function collectToolName(toolNames: string[], name: unknown): void {
  if (typeof name === "string" && name.trim()) toolNames.push(name.trim());
}

/**
 * Extract assistant response text and tool call names from response body.
 */
export function extractAssistantTurnText(responseBody: unknown): {
  text: string | null;
  toolNames: string[];
  truncated: boolean;
} {
  const r = asRecord(responseBody);
  if (!r) return { text: null, toolNames: [], truncated: false };
  const toolNames: string[] = [];
  const textParts: string[] = [];

  // Anthropic Messages: content: [{ type: "text" }, { type: "tool_use", name }]
  if (Array.isArray(r.content)) {
    for (const block of r.content) {
      const blk = asRecord(block);
      if (blk?.type === "text" && typeof blk.text === "string") textParts.push(blk.text);
      else if (blk?.type === "tool_use") collectToolName(toolNames, blk.name);
    }
  }

  // OpenAI Chat Completions: choices: [{ message: { content, tool_calls } }]
  const message = Array.isArray(r.choices) ? asRecord(asRecord(r.choices[0])?.message) : null;
  if (message) {
    textParts.push(contentText(message.content, ASSISTANT_TEXT_PARTS));
    if (Array.isArray(message.tool_calls)) {
      for (const tc of message.tool_calls)
        collectToolName(toolNames, asRecord(asRecord(tc)?.function)?.name);
    }
    // Claude passthrough streams hand their tool_use names over off the serialized body.
    const sideChannelNames = message[TOOL_USE_NAMES_FIELD];
    if (Array.isArray(sideChannelNames)) {
      for (const name of sideChannelNames) collectToolName(toolNames, name);
    }
  }

  // OpenAI Responses: output: [{ type: "message", content: [output_text] }, { type: "function_call" }]
  if (Array.isArray(r.output)) {
    for (const item of r.output) {
      const it = asRecord(item);
      if (it?.type === "message") textParts.push(contentText(it.content, ASSISTANT_TEXT_PARTS));
      else if (RESPONSES_TOOL_CALL_TYPES.has(String(it?.type)))
        collectToolName(toolNames, it?.name);
    }
  }

  const { text, truncated } = capTurnText(cleanTurnText(textParts.filter(Boolean).join("\n\n")));
  return { text, toolNames: [...new Set(toolNames)].slice(0, MAX_TURN_TOOL_NAMES), truncated };
}

export interface ExtractedAgentSessionTurn {
  userText: string | null;
  assistantText: string | null;
  toolNames: string[];
  truncated: boolean;
}

/**
 * A turn ready to store. `requestKey` is shared by every attempt of one client request and
 * `attemptSeq` orders those attempts; the latest attempt's turn is the one kept.
 */
export interface AgentSessionTurn extends ExtractedAgentSessionTurn {
  requestKey?: string | null;
  attemptSeq?: number | null;
}

/**
 * Build the turn from the request and alternative representations of the same reply (the
 * streamed client payload summary keeps Responses `function_call` items; the assembled body
 * keeps Claude passthrough tool names). Text comes from the first representation that has
 * any; tool names are merged across all of them, de-duplicated and capped.
 */
export function extractAgentSessionTurn(
  requestBody: unknown,
  ...responseBodies: unknown[]
): ExtractedAgentSessionTurn | null {
  const user = extractUserTurnText(requestBody);
  const assistants = responseBodies.map(extractAssistantTurnText);
  const withText = assistants.find((candidate) => candidate.text);
  const toolNames = [...new Set(assistants.flatMap((candidate) => candidate.toolNames))].slice(
    0,
    MAX_TURN_TOOL_NAMES
  );

  const assistantText = withText?.text ?? null;
  if (!user.text && !assistantText && toolNames.length === 0) return null;

  return {
    userText: user.text,
    assistantText,
    toolNames,
    truncated: user.truncated || Boolean(withText?.truncated),
  };
}
