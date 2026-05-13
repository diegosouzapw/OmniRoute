/**
 * WindsurfExecutor — routes requests to Windsurf (Devin CLI / Codeium) backend.
 *
 * Wire protocol: gRPC-web over HTTPS (Content-Type: application/grpc-web+proto).
 * Service:       exa.language_server_pb.LanguageServerService
 * Method:        GetChatMessage  (unary → streamed as SSE)
 *
 * Authentication:
 *   credentials.accessToken  = Codeium API key from windsurf.com/show-auth-token
 *   — placed in Metadata.api_key protobuf field of every request.
 *
 * Model IDs accepted by this executor (snake_case sent to Windsurf wire):
 *   Cognition SWE:  swe-1, swe-1-5, swe-1-6, swe-1-6-fast, swe-1-lite
 *   Claude:         claude-4-5-sonnet, claude-4-5-opus, claude-4-sonnet, claude-4-opus,
 *                   claude-3-7-sonnet, claude-3-7-sonnet-thinking
 *   Gemini:         gemini-2-5-pro, gemini-2-5-flash, gemini-3-0-pro, gemini-3-0-flash
 *   OpenAI:         gpt-4-1, gpt-4-5, o1, o1-mini
 *
 * OmniRoute → Windsurf model-ID mapping lives in MODEL_ID_MAP below.
 */

import { BaseExecutor, mergeUpstreamExtraHeaders, type ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { randomUUID } from "node:crypto";

// ─── Windsurf API constants ──────────────────────────────────────────────────

const WS_BASE_URL = "https://server.self-serve.windsurf.com";
const WS_SERVICE = "exa.language_server_pb.LanguageServerService";
const WS_METHOD_CHAT = "GetChatMessage";
const WS_CHAT_URL = `${WS_BASE_URL}/${WS_SERVICE}/${WS_METHOD_CHAT}`;

const WS_IDE_NAME = "windsurf";
const WS_IDE_VERSION = "3.14.0";
const WS_EXT_VERSION = "3.14.0";
const WS_LOCALE = "en-US";

// ─── Model alias normalizer ──────────────────────────────────────────────────
//
// Model names are passed directly to the Windsurf API as ModelOrAlias strings.
// The API accepts the catalog names as-is (e.g. "claude-4.5-sonnet", "swe-1.6-fast").
//
// This table handles only OmniRoute-style backwards-compat aliases where users
// might type dashes instead of dots (e.g. "swe-1-6-fast" → "swe-1.6-fast").

// Model IDs — source: model_configs_v2.bin extracted from Devin CLI binary.
// OmniRoute uses dot-notation user IDs (e.g. "gpt-5.5-high").
// Windsurf API accepts dash-notation modelUids (e.g. "gpt-5-5-high").
// This map normalises dot→dash for newer models and handles legacy aliases.
const MODEL_ALIAS_MAP: Record<string, string> = {
  // ── SWE ─────────────────────────────────────────────────────────────────
  "swe-1.6-fast": "swe-1-6-fast",
  "swe-1.6": "swe-1-6",
  "swe-1.5-fast": "swe-1p5", // fast variant
  "swe-1.5": "swe-1p5",
  "swe-check": "swe-check",
  // ── Claude Opus 4.7 ──────────────────────────────────────────────────────
  "claude-opus-4.7-max": "claude-opus-4-7-max",
  "claude-opus-4.7-xhigh": "claude-opus-4-7-xhigh",
  "claude-opus-4.7-high": "claude-opus-4-7-high",
  "claude-opus-4.7-medium": "claude-opus-4-7-medium",
  "claude-opus-4.7-low": "claude-opus-4-7-low",
  "claude-opus-4.7-review": "opus-4-7-review",
  // ── Claude Opus/Sonnet 4.6 ───────────────────────────────────────────────
  "claude-sonnet-4.6-thinking-1m": "claude-sonnet-4-6-thinking-1m",
  "claude-sonnet-4.6-1m": "claude-sonnet-4-6-1m",
  "claude-sonnet-4.6-thinking": "claude-sonnet-4-6-thinking",
  "claude-sonnet-4.6": "claude-sonnet-4-6",
  "claude-opus-4.6-thinking": "claude-opus-4-6-thinking",
  "claude-opus-4.6": "claude-opus-4-6",
  // ── Claude 4.5 ───────────────────────────────────────────────────────────
  "claude-opus-4.5-thinking": "MODEL_CLAUDE_4_5_OPUS_THINKING",
  "claude-opus-4.5": "MODEL_CLAUDE_4_5_OPUS",
  "claude-sonnet-4.5-thinking": "MODEL_PRIVATE_3",
  "claude-sonnet-4.5": "MODEL_PRIVATE_2",
  "claude-haiku-4.5": "MODEL_PRIVATE_11",
  // backward-compat flat names
  "claude-4.5-opus-thinking": "MODEL_CLAUDE_4_5_OPUS_THINKING",
  "claude-4.5-opus": "MODEL_CLAUDE_4_5_OPUS",
  "claude-4.5-sonnet-thinking": "MODEL_PRIVATE_3",
  "claude-4.5-sonnet": "MODEL_PRIVATE_2",
  "claude-4.5-haiku": "MODEL_PRIVATE_11",
  // ── Claude 4 ─────────────────────────────────────────────────────────────
  "claude-4-opus-thinking": "MODEL_CLAUDE_4_OPUS_THINKING",
  "claude-4-opus": "MODEL_CLAUDE_4_OPUS",
  "claude-4-sonnet-thinking": "MODEL_CLAUDE_4_SONNET_THINKING",
  "claude-4-sonnet": "MODEL_CLAUDE_4_SONNET",
  "claude-4.1-opus-thinking": "MODEL_CLAUDE_4_1_OPUS_THINKING",
  "claude-4.1-opus": "MODEL_CLAUDE_4_1_OPUS",
  // ── Claude 3.x ───────────────────────────────────────────────────────────
  "claude-3.7-sonnet-thinking": "CLAUDE_3_7_SONNET_20250219_THINKING",
  "claude-3.7-sonnet": "CLAUDE_3_7_SONNET_20250219",
  "claude-3.5-sonnet": "CLAUDE_3_5_SONNET_20241022",
  // ── GPT-5.5 ──────────────────────────────────────────────────────────────
  "gpt-5.5-xhigh-fast": "gpt-5-5-xhigh-priority",
  "gpt-5.5-high-fast": "gpt-5-5-high-priority",
  "gpt-5.5-medium-fast": "gpt-5-5-medium-priority",
  "gpt-5.5-low-fast": "gpt-5-5-low-priority",
  "gpt-5.5-none-fast": "gpt-5-5-none-priority",
  "gpt-5.5-xhigh": "gpt-5-5-xhigh",
  "gpt-5.5-high": "gpt-5-5-high",
  "gpt-5.5-medium": "gpt-5-5-medium",
  "gpt-5.5-low": "gpt-5-5-low",
  "gpt-5.5-none": "gpt-5-5-none",
  "gpt-5.5-review": "gpt-5-5-review",
  "gpt-5.5": "gpt-5-5-medium", // default effort level
  // ── GPT-5.4 ──────────────────────────────────────────────────────────────
  "gpt-5.4-xhigh-fast": "gpt-5-4-xhigh-priority",
  "gpt-5.4-high-fast": "gpt-5-4-high-priority",
  "gpt-5.4-medium-fast": "gpt-5-4-medium-priority",
  "gpt-5.4-low-fast": "gpt-5-4-low-priority",
  "gpt-5.4-none-fast": "gpt-5-4-none-priority",
  "gpt-5.4-xhigh": "gpt-5-4-xhigh",
  "gpt-5.4-high": "gpt-5-4-high",
  "gpt-5.4-medium": "gpt-5-4-medium",
  "gpt-5.4-low": "gpt-5-4-low",
  "gpt-5.4-none": "gpt-5-4-none",
  "gpt-5.4-mini-xhigh": "gpt-5-4-mini-xhigh",
  "gpt-5.4-mini-high": "gpt-5-4-mini-high",
  "gpt-5.4-mini-medium": "gpt-5-4-mini-medium",
  "gpt-5.4-mini-low": "gpt-5-4-mini-low",
  "gpt-5.4": "gpt-5-4-medium", // default effort level
  // ── GPT-5.3-Codex ────────────────────────────────────────────────────────
  "gpt-5.3-codex-xhigh-fast": "gpt-5-3-codex-xhigh-priority",
  "gpt-5.3-codex-high-fast": "gpt-5-3-codex-high-priority",
  "gpt-5.3-codex-medium-fast": "gpt-5-3-codex-medium-priority",
  "gpt-5.3-codex-low-fast": "gpt-5-3-codex-low-priority",
  "gpt-5.3-codex-xhigh": "gpt-5-3-codex-xhigh",
  "gpt-5.3-codex-high": "gpt-5-3-codex-high",
  "gpt-5.3-codex-medium": "gpt-5-3-codex-medium",
  "gpt-5.3-codex-low": "gpt-5-3-codex-low",
  "gpt-5.3-codex": "gpt-5-3-codex-medium",
  // ── GPT-5.2 ──────────────────────────────────────────────────────────────
  "gpt-5.2-xhigh": "MODEL_GPT_5_2_XHIGH",
  "gpt-5.2-high": "MODEL_GPT_5_2_HIGH",
  "gpt-5.2-medium": "MODEL_GPT_5_2_MEDIUM",
  "gpt-5.2-low": "MODEL_GPT_5_2_LOW",
  "gpt-5.2-none": "MODEL_GPT_5_2_NONE",
  "gpt-5.2": "MODEL_GPT_5_2_MEDIUM",
  // ── GPT-5 ────────────────────────────────────────────────────────────────
  "gpt-5-codex": "gpt-5-codex",
  "gpt-5": "gpt-5",
  // ── GPT-4.1 / 4o ─────────────────────────────────────────────────────────
  "gpt-4.1": "MODEL_CHAT_GPT_4_1_2025_04_14",
  "gpt-4.1-mini": "gpt-4.1-mini",
  "gpt-4.1-nano": "gpt-4.1-nano",
  "gpt-4o": "MODEL_CHAT_GPT_4O_2024_08_06",
  "gpt-4o-mini": "gpt-4o-mini",
  // ── Gemini ────────────────────────────────────────────────────────────────
  "gemini-3.1-pro-high": "gemini-3-1-pro-high",
  "gemini-3.1-pro-low": "gemini-3-1-pro-low",
  "gemini-3.1-pro": "gemini-3-1-pro-high",
  "gemini-3.0-pro": "gemini-3-pro",
  "gemini-3.0-flash-high": "MODEL_GOOGLE_GEMINI_3_0_FLASH_HIGH",
  "gemini-3.0-flash-medium": "MODEL_GOOGLE_GEMINI_3_0_FLASH_MEDIUM",
  "gemini-3.0-flash-low": "MODEL_GOOGLE_GEMINI_3_0_FLASH_LOW",
  "gemini-3.0-flash-minimal": "MODEL_GOOGLE_GEMINI_3_0_FLASH_MINIMAL",
  "gemini-3.0-flash": "MODEL_GOOGLE_GEMINI_3_0_FLASH_HIGH",
  "gemini-2.5-pro": "MODEL_GOOGLE_GEMINI_2_5_PRO",
  "gemini-2.5-flash": "gemini-2.5-flash",
  // ── Others ───────────────────────────────────────────────────────────────
  "deepseek-v4": "deepseek-v4",
  "deepseek-r1": "deepseek-r1",
  "deepseek-v3-2": "deepseek-v3-2",
  "deepseek-v3": "deepseek-v3",
  "grok-3-mini-thinking": "MODEL_XAI_GROK_3_MINI_REASONING",
  "grok-3-mini": "grok-3-mini",
  "grok-3": "MODEL_XAI_GROK_3",
  "grok-code-fast-1": "grok-code-fast-1",
  "kimi-k2.6": "kimi-k2-6",
  "kimi-k2.5": "kimi-k2-5",
  "kimi-k2": "MODEL_KIMI_K2",
  "glm-5.1": "glm-5-1",
  "glm-5": "glm-5",
  "glm-4.7": "MODEL_GLM_4_7",
};

function resolveWsModelId(model: string): string {
  return MODEL_ALIAS_MAP[model] ?? model;
}

// ─── Minimal protobuf encoder ────────────────────────────────────────────────
//
// Implements only what is needed for GetChatMessageRequest.
// Wire types: 0 = varint, 2 = length-delimited.

function encodeVarint(value: number): Uint8Array {
  const bytes: number[] = [];
  let v = value >>> 0;
  while (v > 0x7f) {
    bytes.push((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  bytes.push(v & 0x7f);
  return new Uint8Array(bytes);
}

function concatBytes(arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrays) {
    out.set(a, off);
    off += a.length;
  }
  return out;
}

const TEXT_ENC = new TextEncoder();
const TEXT_DEC = new TextDecoder();

/** Encode a length-delimited field (strings and nested messages share wire type 2). */
function encodeField(fieldNum: number, payload: Uint8Array): Uint8Array {
  const tag = encodeVarint((fieldNum << 3) | 2);
  const len = encodeVarint(payload.length);
  return concatBytes([tag, len, payload]);
}

/** Encode a UTF-8 string field. */
function encodeString(fieldNum: number, value: string): Uint8Array {
  return encodeField(fieldNum, TEXT_ENC.encode(value));
}

/** Encode a nested message field. */
function encodeMessage(fieldNum: number, msg: Uint8Array): Uint8Array {
  return encodeField(fieldNum, msg);
}

// ─── Protobuf message builders ───────────────────────────────────────────────

function buildMetadata(apiKey: string, sessionId: string): Uint8Array {
  return concatBytes([
    encodeString(1, apiKey),
    encodeString(2, WS_IDE_NAME),
    encodeString(3, WS_IDE_VERSION),
    encodeString(4, WS_EXT_VERSION),
    encodeString(5, sessionId),
    encodeString(6, WS_LOCALE),
  ]);
}

function buildModelOrAlias(model: string): Uint8Array {
  // ModelOrAlias wraps the model identifier in field 1
  return encodeString(1, model);
}

type WsChatMessage = { role: string; content: string; toolCallId?: string };

function buildChatMessage(msg: WsChatMessage): Uint8Array {
  const parts: Uint8Array[] = [encodeString(1, msg.role), encodeString(2, msg.content)];
  if (msg.toolCallId) parts.push(encodeString(3, msg.toolCallId));
  return concatBytes(parts);
}

function buildGetChatMessageRequest(
  apiKey: string,
  model: string,
  messages: WsChatMessage[]
): Uint8Array {
  const sessionId = randomUUID();
  const cascadeId = randomUUID();

  const parts: Uint8Array[] = [
    encodeMessage(1, buildMetadata(apiKey, sessionId)), // metadata
    encodeString(2, cascadeId), // cascade_id
    encodeMessage(3, buildModelOrAlias(model)), // model_or_alias
  ];

  for (const msg of messages) {
    parts.push(encodeMessage(4, buildChatMessage(msg))); // repeated messages
  }

  return concatBytes(parts);
}

// ─── gRPC-web framing ────────────────────────────────────────────────────────

/** Wrap a protobuf message in a 5-byte gRPC-web data frame. */
function grpcWebFrame(payload: Uint8Array): Uint8Array {
  const frame = new Uint8Array(5 + payload.length);
  frame[0] = 0x00; // compression flag: no compression
  const view = new DataView(frame.buffer);
  view.setUint32(1, payload.length, false); // big-endian length
  frame.set(payload, 5);
  return frame;
}

// ─── Protobuf response decoder ───────────────────────────────────────────────
//
// CompletionChunk (oneof):
//   field 1 (length-delimited) → ContentChunk  { field 1: string text }
//   field 2 (length-delimited) → ToolCallChunk (skipped for now)
//   field 3 (length-delimited) → DoneChunk     { field 1: UsageStats }
//   field 4 (length-delimited) → ErrorChunk    { field 1: string message }
//
// GetChatMessageResponse (unary fallback):
//   field 1 (length-delimited) → content string   (heuristic)
//   field 2 (length-delimited) → nested message   (heuristic)

type DecodedChunk =
  | { kind: "content"; text: string }
  | { kind: "done"; promptTokens: number; completionTokens: number }
  | { kind: "error"; message: string }
  | { kind: "unknown" };

/** Read a varint from buf starting at offset; returns [value, newOffset]. */
function readVarint(buf: Uint8Array, offset: number): [number, number] {
  let result = 0;
  let shift = 0;
  while (offset < buf.length) {
    const b = buf[offset++];
    result |= (b & 0x7f) << shift;
    if ((b & 0x80) === 0) break;
    shift += 7;
  }
  return [result >>> 0, offset];
}

/** Decode a single protobuf message payload as a CompletionChunk. */
function decodeCompletionChunk(buf: Uint8Array): DecodedChunk {
  let offset = 0;
  while (offset < buf.length) {
    let tag: number;
    [tag, offset] = readVarint(buf, offset);
    const fieldNum = tag >>> 3;
    const wireType = tag & 0x07;

    if (wireType === 2) {
      // length-delimited
      let len: number;
      [len, offset] = readVarint(buf, offset);
      const payload = buf.slice(offset, offset + len);
      offset += len;

      if (fieldNum === 1) {
        // ContentChunk — field 1 inside = text string
        const text = decodeContentChunk(payload);
        if (text !== null) return { kind: "content", text };
      } else if (fieldNum === 3) {
        // DoneChunk — field 1 inside = UsageStats
        const usage = decodeDoneChunk(payload);
        return { kind: "done", promptTokens: usage[0], completionTokens: usage[1] };
      } else if (fieldNum === 4) {
        // ErrorChunk — field 1 inside = error message string
        const msg = decodeStringField(payload, 1);
        return { kind: "error", message: msg ?? "unknown windsurf error" };
      }
      // field 2 = ToolCallChunk — not yet handled; skip
    } else if (wireType === 0) {
      let _v: number;
      [_v, offset] = readVarint(buf, offset);
    } else if (wireType === 1) {
      offset += 8;
    } else if (wireType === 5) {
      offset += 4;
    } else {
      break; // unknown wire type — stop parsing
    }
  }
  return { kind: "unknown" };
}

/** Extract text string from ContentChunk (field 1 = string). */
function decodeContentChunk(buf: Uint8Array): string | null {
  return decodeStringField(buf, 1);
}

/** Extract prompt_tokens + completion_tokens from DoneChunk.UsageStats. */
function decodeDoneChunk(buf: Uint8Array): [number, number] {
  // DoneChunk: field 1 = UsageStats (nested)
  // UsageStats: field 1 = prompt_tokens (varint), field 2 = completion_tokens (varint)
  let offset = 0;
  let usageBytes: Uint8Array | null = null;
  while (offset < buf.length) {
    let tag: number;
    [tag, offset] = readVarint(buf, offset);
    const fieldNum = tag >>> 3;
    const wireType = tag & 0x07;
    if (wireType === 2) {
      let len: number;
      [len, offset] = readVarint(buf, offset);
      if (fieldNum === 1) usageBytes = buf.slice(offset, offset + len);
      offset += len;
    } else if (wireType === 0) {
      let _v: number;
      [_v, offset] = readVarint(buf, offset);
    } else {
      break;
    }
  }
  if (!usageBytes) return [0, 0];
  let promptTokens = 0;
  let completionTokens = 0;
  offset = 0;
  while (offset < usageBytes.length) {
    let tag: number;
    [tag, offset] = readVarint(usageBytes, offset);
    const fieldNum = tag >>> 3;
    const wireType = tag & 0x07;
    if (wireType === 0) {
      let v: number;
      [v, offset] = readVarint(usageBytes, offset);
      if (fieldNum === 1) promptTokens = v;
      else if (fieldNum === 2) completionTokens = v;
    } else if (wireType === 2) {
      let len: number;
      [len, offset] = readVarint(usageBytes, offset);
      offset += len;
    } else {
      break;
    }
  }
  return [promptTokens, completionTokens];
}

/** Read a length-delimited string at a given field number from buf. */
function decodeStringField(buf: Uint8Array, targetField: number): string | null {
  let offset = 0;
  while (offset < buf.length) {
    let tag: number;
    [tag, offset] = readVarint(buf, offset);
    const fieldNum = tag >>> 3;
    const wireType = tag & 0x07;
    if (wireType === 2) {
      let len: number;
      [len, offset] = readVarint(buf, offset);
      const payload = buf.slice(offset, offset + len);
      offset += len;
      if (fieldNum === targetField) return TEXT_DEC.decode(payload);
    } else if (wireType === 0) {
      let _v: number;
      [_v, offset] = readVarint(buf, offset);
    } else if (wireType === 1) {
      offset += 8;
    } else if (wireType === 5) {
      offset += 4;
    } else {
      break;
    }
  }
  return null;
}

// ─── Convert OpenAI messages → Windsurf WsChatMessage[] ──────────────────────

type OpenAIMessage = {
  role?: string;
  content?: unknown;
  tool_call_id?: string;
};

function openAIMessagesToWs(messages: OpenAIMessage[]): WsChatMessage[] {
  const out: WsChatMessage[] = [];
  for (const m of messages) {
    const role = String(m.role || "user");
    let content = "";
    if (typeof m.content === "string") {
      content = m.content;
    } else if (Array.isArray(m.content)) {
      // Multi-part: concatenate text parts
      for (const part of m.content) {
        if (part && typeof part === "object" && (part as Record<string, unknown>).type === "text") {
          content += String((part as Record<string, unknown>).text || "");
        }
      }
    }
    out.push({ role, content, toolCallId: m.tool_call_id });
  }
  return out;
}

// ─── gRPC-web response stream parser ─────────────────────────────────────────
//
// gRPC-web frame layout:
//   byte 0:    flag (0x00 = data, 0x80 = trailers)
//   bytes 1-4: message length (big-endian uint32)
//   bytes 5…:  protobuf payload
//
// The response body is a concatenated sequence of these frames.

function* parseGrpcWebFrames(buf: Uint8Array): Generator<{ flag: number; payload: Uint8Array }> {
  let offset = 0;
  while (offset + 5 <= buf.length) {
    const flag = buf[offset];
    const len =
      (buf[offset + 1] << 24) | (buf[offset + 2] << 16) | (buf[offset + 3] << 8) | buf[offset + 4];
    offset += 5;
    if (len < 0 || offset + len > buf.length) break;
    yield { flag, payload: buf.slice(offset, offset + len) };
    offset += len;
  }
}

// ─── WindsurfExecutor ─────────────────────────────────────────────────────────

export class WindsurfExecutor extends BaseExecutor {
  constructor() {
    super("windsurf", PROVIDERS["windsurf"] || { id: "windsurf", baseUrl: WS_CHAT_URL });
  }

  buildUrl(): string {
    return WS_CHAT_URL;
  }

  buildHeaders(credentials: { accessToken?: string; apiKey?: string }): Record<string, string> {
    const token = credentials.accessToken || credentials.apiKey || "";
    return {
      "Content-Type": "application/grpc-web+proto",
      Accept: "application/grpc-web+proto",
      // Codeium API key also goes in Metadata.api_key (protobuf field) — see request body.
      // Some endpoints also accept it as a Bearer token header.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "User-Agent": `windsurf/${WS_IDE_VERSION}`,
      "X-Grpc-Web": "1",
    };
  }

  transformRequest(): unknown {
    // Request body is built manually in execute() because it requires the model + messages
    return null;
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const apiKey = credentials.accessToken || credentials.apiKey || "";
    const wsModel = resolveWsModelId(model);

    // Parse OpenAI messages from request body
    const b = (body ?? {}) as Record<string, unknown>;
    const rawMessages = Array.isArray(b.messages) ? (b.messages as OpenAIMessage[]) : [];
    const wsMessages = openAIMessagesToWs(rawMessages);

    if (wsMessages.length === 0) {
      wsMessages.push({ role: "user", content: "" });
    }

    // Build and frame the protobuf request
    const protoPayload = buildGetChatMessageRequest(apiKey, wsModel, wsMessages);
    const framedPayload = grpcWebFrame(protoPayload);

    const url = this.buildUrl();
    const headers = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    log?.info?.("WS", `Windsurf → ${wsModel} (${wsMessages.length} messages)`);

    const upstream = await fetch(url, {
      method: "POST",
      headers,
      body: framedPayload,
      signal: signal ?? undefined,
    });

    if (!upstream.ok && upstream.status !== 200) {
      return { response: upstream, url, headers, transformedBody: protoPayload };
    }

    // Transform gRPC-web binary response → SSE stream
    const sseResponse = this.transformToSSE(upstream, model, stream);
    return { response: sseResponse, url, headers, transformedBody: protoPayload };
  }

  /** Convert a gRPC-web response body into an OpenAI-compatible SSE stream. */
  private transformToSSE(upstream: Response, model: string, _stream: boolean): Response {
    const responseId = `chatcmpl-ws-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

    const transformStream = new TransformStream<Uint8Array, Uint8Array>({
      async transform(chunk, controller) {
        // Accumulate — gRPC-web frames may arrive split across fetch chunks.
        // For simplicity we buffer the entire message set in flush().
        controller.enqueue(chunk);
      },
    });

    // We need to buffer the full response to parse gRPC frames.
    // Use a ReadableStream that:
    //   1. reads the entire upstream body
    //   2. parses gRPC-web frames
    //   3. emits SSE events
    const sseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const enc = new TextEncoder();
        let roleEmitted = false;
        let totalText = "";
        let promptTokens = 0;
        let completionTokens = 0;
        let hadError: string | null = null;

        function emit(data: string) {
          controller.enqueue(enc.encode(data));
        }

        try {
          const bodyBytes = upstream.body ? await readStream(upstream.body) : new Uint8Array(0);

          for (const { flag, payload } of parseGrpcWebFrames(bodyBytes)) {
            if (flag === 0x80) {
              // Trailer frame — contains grpc-status, grpc-message
              const trailer = TEXT_DEC.decode(payload);
              const statusMatch = /grpc-status:\s*(\d+)/i.exec(trailer);
              if (statusMatch && statusMatch[1] !== "0") {
                const msgMatch = /grpc-message:\s*(.+)/i.exec(trailer);
                hadError = msgMatch
                  ? decodeURIComponent(msgMatch[1].trim())
                  : `gRPC status ${statusMatch[1]}`;
              }
              continue;
            }

            if (flag !== 0x00) continue; // skip unknown flags

            const chunk = decodeCompletionChunk(payload);

            if (chunk.kind === "content" && chunk.text) {
              totalText += chunk.text;
              if (!roleEmitted) {
                emit(
                  `data: ${JSON.stringify({
                    id: responseId,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    choices: [
                      { index: 0, delta: { role: "assistant", content: "" }, finish_reason: null },
                    ],
                  })}\n\n`
                );
                roleEmitted = true;
              }
              emit(
                `data: ${JSON.stringify({
                  id: responseId,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  choices: [{ index: 0, delta: { content: chunk.text }, finish_reason: null }],
                })}\n\n`
              );
            } else if (chunk.kind === "done") {
              promptTokens = chunk.promptTokens;
              completionTokens = chunk.completionTokens;
            } else if (chunk.kind === "error") {
              hadError = chunk.message;
            }
          }

          if (hadError) {
            emit(
              `data: ${JSON.stringify({
                error: { message: hadError, type: "windsurf_error", code: "upstream_error" },
              })}\n\n`
            );
            emit("data: [DONE]\n\n");
            controller.close();
            return;
          }

          // If nothing was streamed but we got a response, treat the decoded
          // text as the full reply (unary response path).
          if (!roleEmitted && totalText) {
            emit(
              `data: ${JSON.stringify({
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [
                  { index: 0, delta: { role: "assistant", content: "" }, finish_reason: null },
                ],
              })}\n\n`
            );
            emit(
              `data: ${JSON.stringify({
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [{ index: 0, delta: { content: totalText }, finish_reason: null }],
              })}\n\n`
            );
          }

          // Finish chunk
          const finishPayload: Record<string, unknown> = {
            id: responseId,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          };
          if (promptTokens > 0 || completionTokens > 0) {
            finishPayload.usage = {
              prompt_tokens: promptTokens,
              completion_tokens: completionTokens,
              total_tokens: promptTokens + completionTokens,
            };
          }
          emit(`data: ${JSON.stringify(finishPayload)}\n\n`);
          emit("data: [DONE]\n\n");
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          emit(
            `data: ${JSON.stringify({
              error: { message: `Windsurf stream error: ${msg}`, type: "windsurf_error" },
            })}\n\n`
          );
          emit("data: [DONE]\n\n");
        }

        controller.close();
      },
    });

    void transformStream; // unused — kept for reference

    return new Response(sseStream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }
}

/** Read an entire ReadableStream<Uint8Array> into a single Uint8Array. */
async function readStream(readable: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  const reader = readable.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return concatBytes(chunks);
}
