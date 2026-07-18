import { FORMATS } from "../../translator/formats.ts";
import {
  parseSSEToResponsesOutput,
  parseSSEToClaudeResponse,
  parseSSEToOpenAIResponse,
} from "../sseParser.ts";
import { parseSSEToGeminiResponse } from "../sseParser/geminiResponse.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

export function parseNonStreamingSSEPayload(
  rawBody: string,
  preferredFormat: string,
  fallbackModel: string
): { body: Record<string, unknown>; format: string } | null {
  const formatsToTry: string[] = [];
  const seen = new Set<string>();
  const queueFormat = (format: string) => {
    if (!format || seen.has(format)) return;
    seen.add(format);
    formatsToTry.push(format);
  };

  queueFormat(preferredFormat);
  queueFormat(FORMATS.GEMINI);
  queueFormat(FORMATS.OPENAI_RESPONSES);
  queueFormat(FORMATS.CLAUDE);
  queueFormat(FORMATS.OPENAI);

  for (const format of formatsToTry) {
    const parsed =
      format === FORMATS.OPENAI_RESPONSES
        ? parseSSEToResponsesOutput(rawBody, fallbackModel)
        : format === FORMATS.CLAUDE
          ? parseSSEToClaudeResponse(rawBody, fallbackModel)
          : format === FORMATS.GEMINI || format === FORMATS.ANTIGRAVITY
            ? parseSSEToGeminiResponse(rawBody, fallbackModel)
            : parseSSEToOpenAIResponse(rawBody, fallbackModel);
    if (parsed && typeof parsed === "object") {
      return {
        body: parsed as Record<string, unknown>,
        format,
      };
    }
  }

  return null;
}

export function convertNDJSONToSSE(rawBody: string): string {
  const chunks = String(rawBody || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (chunks.length === 0) return rawBody;

  return `${chunks.map((chunk) => `data: ${chunk}\n`).join("\n")}\n`;
}

export function normalizeNonStreamingEventPayload(rawBody: string, contentType: string): string {
  if (contentType.includes("application/x-ndjson")) {
    return convertNDJSONToSSE(rawBody);
  }
  return rawBody;
}

export function isTruthyStreamBody(body: unknown): boolean {
  return !!body && typeof body === "object" && (body as { stream?: unknown }).stream === true;
}

export function isEventStreamAccepted(
  headers: Record<string, unknown> | Headers | null | undefined
) {
  return (getHeaderValueCaseInsensitive(headers, "accept") || "")
    .toLowerCase()
    .includes("text/event-stream");
}

export function shouldTreatBufferedEventResponseAsExpected(
  upstreamStream: boolean,
  providerHeaders: Record<string, unknown> | Headers | null | undefined,
  finalBody: unknown
): boolean {
  return upstreamStream || isEventStreamAccepted(providerHeaders) || isTruthyStreamBody(finalBody);
}

const NON_STREAMING_SSE_TERMINAL_TYPES = new Set([
  "message_stop",
  "response.completed",
  "response.done",
  "response.cancelled",
  "response.canceled",
  "response.failed",
  "response.incomplete",
]);

function isNonStreamingSseTerminalType(eventType: string): boolean {
  return NON_STREAMING_SSE_TERMINAL_TYPES.has(eventType);
}

export type NonStreamingSseTerminalState = {
  currentEvent: string;
  pendingLine: string;
};

function hasClaudeTerminalMessageDelta(parsed: unknown, eventType: string): boolean {
  if (eventType !== "message_delta" || !parsed || typeof parsed !== "object") return false;
  const delta = (parsed as { delta?: unknown }).delta;
  if (!delta || typeof delta !== "object") return false;
  const stopReason = (delta as { stop_reason?: unknown }).stop_reason;
  return typeof stopReason === "string" ? stopReason.length > 0 : stopReason != null;
}

// Non-empty finishReason is terminal.  Gemini SSE payloads from
// streamGenerateContent have candidates at the top level (no
// "response" wrapper).  Any non-empty string signals stream end.
function hasGeminiTerminalFinishReason(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== "object") return false;
  // Top-level candidates (streamGenerateContent?alt=sse)
  const obj = parsed as Record<string, unknown>;
  const candidates = obj.candidates as unknown[] | undefined;
  if (!Array.isArray(candidates) || candidates.length === 0) return false;
  const candidate = candidates[0] as Record<string, unknown> | undefined;
  if (!candidate || typeof candidate !== "object") return false;
  const finishReason = candidate.finishReason;
  return typeof finishReason === "string" && finishReason.length > 0;
}

function processNonStreamingSseTerminalLine(
  state: NonStreamingSseTerminalState,
  rawLine: string
): boolean {
  const trimmed = rawLine.trim();
  if (!trimmed || trimmed.startsWith(":")) {
    const terminalEventOnly = !trimmed && isNonStreamingSseTerminalType(state.currentEvent);
    if (!trimmed) state.currentEvent = "";
    return terminalEventOnly;
  }

  if (trimmed.startsWith("event:")) {
    state.currentEvent = trimmed.slice(6).trim();
    return false;
  }

  if (!trimmed.startsWith("data:")) return false;
  const data = trimmed.slice(5).trim();
  if (data === "[DONE]") return true;
  if (!data) return false;

  // Hot-path optimization: the terminal SSE events we look for (message_stop,
  // response.completed, …) all carry a top-level "type" field, OR are signalled by a
  // preceding `event:` line (Claude). Gemini signals completion via
  // "finishReason" inside response.candidates[0]. OpenAI chat.completion chunks
  // carry none of these and terminate with `[DONE]` (handled above), so parsing
  // every one of them here is pure waste that compounds into the CPU-runaway on
  // large buffered responses. Skip the JSON.parse unless the line could actually
  // be a typed terminal.
  if (
    !data.includes('"type"') &&
    // NOTE: "finishReason" is a superset match -- it triggers JSON.parse on
    // every Gemini chunk that happens to contain the string (e.g. partial
    // candidate payloads), not just the terminal one.  This is intentional:
    // the extra parses are cheap compared to the CPU-runaway we'd get from
    // parsing ALL chunks unconditionally on large buffered responses, and
    // the superset is safe (false positives just parse a non-terminal chunk
    // and fall through to `return false`).
    !data.includes('"finishReason"') &&
    !(state.currentEvent === "message_delta" && data.includes("stop_reason"))
  ) {
    return isNonStreamingSseTerminalType(state.currentEvent);
  }

  try {
    const parsed = JSON.parse(data);
    const eventType =
      parsed && typeof parsed === "object" && typeof parsed.type === "string"
        ? parsed.type
        : state.currentEvent;
    return (
      isNonStreamingSseTerminalType(eventType) ||
      hasClaudeTerminalMessageDelta(parsed, eventType) ||
      hasGeminiTerminalFinishReason(parsed)
    );
  } catch {
    // Keep reading malformed data so the parser can report a useful upstream error.
    return false;
  }
}

export function appendNonStreamingSseTerminalSignal(
  state: NonStreamingSseTerminalState,
  chunk: string
): boolean {
  const lines = `${state.pendingLine}${chunk}`.split(/\r?\n/);
  state.pendingLine = lines.pop() ?? "";

  for (const rawLine of lines) {
    if (processNonStreamingSseTerminalLine(state, rawLine)) return true;
  }

  return false;
}
