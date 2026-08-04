/**
 * Arena/AI-SDK SSE line parsing and OpenAI message → Arena prompt formatting.
 */

export interface ArenaSSEEvent {
  type: "text" | "thinking" | "error" | "done" | "heartbeat";
  content?: string;
}

function parseJsonValue(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function pickString(value: unknown, keys: string[]): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const data = value as Record<string, unknown>;
  for (const key of keys) {
    const candidate = data[key];
    if (typeof candidate === "string") return candidate;
  }
  return JSON.stringify(value);
}

function normalizeArenaSSELine(payload: string): string {
  const participantPrefixed = payload.match(/^[ab]([023dfg]):(.*)$/);
  if (!participantPrefixed) return payload;
  return `${participantPrefixed[1]}:${participantPrefixed[2]}`;
}

export function parseArenaSSE(line: string): ArenaSSEEvent | null {
  const trimmed = line.trim();
  const payload = trimmed.startsWith("data: ") ? trimmed.substring(6).trim() : trimmed;
  if (!payload) return null;

  // Historical Arena platform errors used `ae:`. Current AI SDK `e:` is
  // finish_step and not terminal, so only treat it as an error when it carries
  // an obvious error payload.
  const legacyError = payload.match(/^[ab]e:(.*)$/);
  if (legacyError) {
    const value = parseJsonValue(legacyError[1] ?? "");
    const content = pickString(value, ["error", "message"]);
    return content ? { type: "error", content } : null;
  }

  const normalized = normalizeArenaSSELine(payload);
  const separator = normalized.indexOf(":");
  if (separator < 0) return null;

  const code = normalized.slice(0, separator);
  const rawValue = normalized.slice(separator + 1);
  const value = parseJsonValue(rawValue);

  switch (code) {
    case "0":
      return { type: "text", content: pickString(value, ["text", "textDelta"]) };
    case "g":
      return { type: "thinking", content: pickString(value, ["thinking", "text", "textDelta"]) };
    case "2":
      return { type: "heartbeat" };
    case "3":
      return { type: "error", content: pickString(value, ["error", "message"]) };
    case "d": {
      if (
        value &&
        typeof value === "object" &&
        (value as Record<string, unknown>).finishReason === "error"
      ) {
        return { type: "error", content: "Arena stream finished with an error" };
      }
      return { type: "done" };
    }
    default:
      return null;
  }
}

interface OpenAIMessage {
  role?: string;
  content?: unknown;
}

function contentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (!part || typeof part !== "object") return "";
        const data = part as Record<string, unknown>;
        if (typeof data.text === "string") return data.text;
        if (data.type === "image_url") return "[image]";
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  if (content && typeof content === "object") {
    const data = content as Record<string, unknown>;
    if (typeof data.text === "string") return data.text;
  }
  return content == null ? "" : String(content);
}

export function formatArenaPrompt(messages: OpenAIMessage[]): string {
  const rendered = messages
    .map((message) => {
      const text = contentToText(message.content).trim();
      if (!text) return "";
      const role = typeof message.role === "string" ? message.role : "user";
      const label =
        role === "system"
          ? "System"
          : role === "assistant"
            ? "Assistant"
            : role === "developer"
              ? "Developer"
              : "User";
      return `${label}: ${text}`;
    })
    .filter(Boolean);

  if (rendered.length === 1 && messages[0]?.role === "user") {
    return contentToText(messages[0].content).trim();
  }

  return rendered.join("\n\n");
}
