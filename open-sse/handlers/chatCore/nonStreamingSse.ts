import { FORMATS } from "../../translator/formats.ts";
import {
  parseSSEToResponsesOutput,
  parseSSEToClaudeResponse,
  parseSSEToOpenAIResponse,
} from "../sseParser.ts";
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
  queueFormat(FORMATS.OPENAI_RESPONSES);
  queueFormat(FORMATS.CLAUDE);
  queueFormat(FORMATS.OPENAI);

  for (const format of formatsToTry) {
    const parsed =
      format === FORMATS.OPENAI_RESPONSES
        ? parseSSEToResponsesOutput(rawBody, fallbackModel)
        : format === FORMATS.CLAUDE
          ? parseSSEToClaudeResponse(rawBody, fallbackModel)
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

export function isEventStreamAccepted(headers: Record<string, unknown> | Headers | null | undefined) {
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

export type NonStreamingSseTerminalState = {
  currentEvent: string;
  pendingLine: string;
};

function processNonStreamingSseTerminalLine(
  state: NonStreamingSseTerminalState,
  rawLine: string
): boolean {
  const trimmed = rawLine.trim();
  if (!trimmed || trimmed.startsWith(":")) {
    if (!trimmed) state.currentEvent = "";
    return false;
  }

  if (trimmed.startsWith("event:")) {
    state.currentEvent = trimmed.slice(6).trim();
    return false;
  }

  if (!trimmed.startsWith("data:")) return false;
  const data = trimmed.slice(5).trim();
  if (data === "[DONE]") return true;
  if (!data) return false;

  try {
    const parsed = JSON.parse(data);
    const eventType =
      parsed && typeof parsed === "object" && typeof parsed.type === "string"
        ? parsed.type
        : state.currentEvent;
    return NON_STREAMING_SSE_TERMINAL_TYPES.has(eventType);
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
