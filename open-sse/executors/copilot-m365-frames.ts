/**
 * Microsoft 365 Copilot (BizChat / Substrate) SignalR-over-WebSocket framing.
 *
 * Pure, transport-free helpers that translate between the OpenAI chat shape and
 * the Substrate BizChat SignalR JSON protocol observed on the individual M365
 * path (`m365.cloud.microsoft/chat` → `wss://substrate.office.com/m365Copilot/
 * Chathub/...`). Keeping these pure lets us unit-test the wire format against the
 * real frame captures contributed in #4042 without opening a live socket — the
 * live round-trip is the separate Rule #18 validation gate for the executor.
 *
 * Protocol (from @skyzea1's #4042 capture):
 *   - JSON messages terminated with the SignalR record separator `\x1e`.
 *   - Handshake: → {"protocol":"json","version":1}  ← {}  → {"type":6}
 *   - Send: type:4 invocation to target "chat" with arguments[0] = { message, ... }
 *   - Stream: type:1 target:"update" deltas (bot text at arguments[0].messages[].text,
 *     accumulated — NOT incremental) → isLastUpdate:true → type:2 final → type:3 completion.
 */

/** SignalR record separator (0x1e) terminating every JSON frame. */
export const RECORD_SEPARATOR = String.fromCharCode(0x1e);

/** SignalR handshake request — the first frame the client must send. */
export const HANDSHAKE_REQUEST = { protocol: "json", version: 1 } as const;

/** SignalR keepalive ping frame. */
export const KEEPALIVE_PING = { type: 6 } as const;

/** Allowed message types observed in the individual M365 send frame. */
export const ALLOWED_MESSAGE_TYPES = [
  "Chat",
  "Suggestion",
  "InternalSearchQuery",
  "Disengaged",
  "InternalLoaderMessage",
  "Progress",
  "GeneratedCode",
  "RenderCardRequest",
  "AdsQuery",
  "SemanticSerp",
  "GenerateContentQuery",
] as const;

/** Append the record separator to a JSON-serializable frame. */
export function encodeFrame(obj: unknown): string {
  return JSON.stringify(obj) + RECORD_SEPARATOR;
}

/** Serialized handshake request frame. */
export function handshakeFrame(): string {
  return encodeFrame(HANDSHAKE_REQUEST);
}

/** Serialized keepalive ping frame. */
export function keepaliveFrame(): string {
  return encodeFrame(KEEPALIVE_PING);
}

/**
 * Split a raw socket buffer into complete `\x1e`-terminated frames, returning any
 * trailing partial frame as `rest` so it can be prepended to the next chunk.
 */
export function splitFrames(buffer: string): { frames: string[]; rest: string } {
  const parts = buffer.split(RECORD_SEPARATOR);
  // The last element is either "" (buffer ended on a separator) or a partial frame.
  const rest = parts.pop() ?? "";
  const frames = parts.filter((p) => p.length > 0);
  return { frames, rest };
}

/** Safely JSON.parse a single frame body; returns null on malformed input. */
export function parseFrame(frame: string): Record<string, unknown> | null {
  const trimmed = frame.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * A SignalR handshake response is `{}` on success, or `{ error: "..." }` on
 * failure. Returns the error string, or null when the handshake succeeded.
 */
export function handshakeError(frame: Record<string, unknown> | null): string | null {
  if (!frame) return null;
  const err = frame.error;
  return typeof err === "string" && err.length > 0 ? err : null;
}

export interface ChatInvocationOptions {
  text: string;
  /** Per-connection trace id (hex), reused as clientCorrelationId/traceId. */
  traceId: string;
  /** Per-session id (GUID). */
  sessionId: string;
  /** Whether this is the first turn of the conversation. */
  isStartOfSession?: boolean;
  /** Tier-specific option flags; left empty by default (tuned during live validation). */
  optionsSets?: string[];
  tone?: string;
}

/**
 * Build the `type:4` chat invocation frame body (not yet `\x1e`-terminated).
 * Mirrors the argument shape captured on the individual M365 path in #4042.
 */
export function buildChatInvocation(opts: ChatInvocationOptions): Record<string, unknown> {
  return {
    type: 4,
    target: "chat",
    invocationId: "0",
    arguments: [
      {
        source: "officeweb",
        clientCorrelationId: opts.traceId,
        sessionId: opts.sessionId,
        optionsSets: opts.optionsSets ?? [],
        streamingMode: "ConciseWithPadding",
        spokenTextMode: "None",
        options: {},
        extraExtensionParameters: {},
        allowedMessageTypes: [...ALLOWED_MESSAGE_TYPES],
        sliceIds: [],
        threadLevelGptId: {},
        traceId: opts.traceId,
        isStartOfSession: opts.isStartOfSession ?? true,
        clientInfo: {},
        message: {
          author: "user",
          inputMethod: "Keyboard",
          text: opts.text,
          messageType: "Chat",
        },
        plugins: [],
        isSbsSupported: false,
        tone: opts.tone ?? "",
        renderReferencesBehindEOS: true,
        disconnectBehavior: "",
      },
    ],
  };
}

/** True when the frame is a SignalR invocation/streamItem (`type:1`) update. */
export function isUpdateFrame(frame: Record<string, unknown> | null): boolean {
  return !!frame && frame.type === 1 && frame.target === "update";
}

/** True when the frame is the SignalR completion (`type:3`) for the chat invocation. */
export function isCompletionFrame(frame: Record<string, unknown> | null): boolean {
  return !!frame && frame.type === 3;
}

/** True when an update frame is flagged as the last update of the turn. */
export function isLastUpdate(frame: Record<string, unknown> | null): boolean {
  if (!isUpdateFrame(frame)) return false;
  const args = (frame as Record<string, unknown>).arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  return first?.isLastUpdate === true;
}

/**
 * Extract the accumulated bot text from a `type:1` update frame, reading the last
 * bot-authored message's `.text`. Returns null when the frame carries no bot text
 * (Progress/Suggestion/ReferencesListComplete updates, throttling-only frames, etc.).
 */
export function extractBotText(frame: Record<string, unknown> | null): string | null {
  if (!isUpdateFrame(frame)) return null;
  const args = (frame as Record<string, unknown>).arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  const messages = first?.messages;
  if (!Array.isArray(messages)) return null;
  // Prefer the last bot-authored message with non-empty text.
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as Record<string, unknown> | undefined;
    if (!m) continue;
    const author = m.author;
    const text = m.text;
    if ((author === "bot" || author === undefined) && typeof text === "string" && text.length > 0) {
      return text;
    }
  }
  return null;
}

/**
 * BizChat update frames carry the FULL accumulated answer each time, not an
 * incremental delta. Given the previously-emitted text and the new accumulated
 * text, return the new suffix to stream. When the new text does not extend the
 * previous (a replace/rewrite), the whole new text is returned so nothing is lost.
 */
export function incrementalDelta(previous: string, next: string): string {
  if (!next) return "";
  if (next === previous) return "";
  if (next.startsWith(previous)) return next.slice(previous.length);
  return next;
}
