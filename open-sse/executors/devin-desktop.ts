/**
 * DevinDesktopExecutor — routes OpenAI-style chat requests through the
 * Devin Desktop language-server gRPC-web endpoint.
 *
 * The upstream still requires the legacy "windsurf" IDE identity. Keep that
 * compatibility string isolated here; it is not a public OmniRoute provider id.
 */

import { randomUUID } from "node:crypto";

import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { BaseExecutor, mergeUpstreamExtraHeaders, type ExecuteInput } from "./base.ts";

// ─── Devin Desktop upstream constants ───────────────────────────────────────

const DEVIN_DESKTOP_BASE_URL = "https://server.codeium.com";
const DEVIN_DESKTOP_SERVICE = "exa.language_server_pb.LanguageServerService";
const DEVIN_DESKTOP_CHAT_METHOD = "GetChatMessage";
const DEVIN_DESKTOP_CHAT_URL = `${DEVIN_DESKTOP_BASE_URL}/${DEVIN_DESKTOP_SERVICE}/${DEVIN_DESKTOP_CHAT_METHOD}`;

const DEVIN_UPSTREAM_IDE_NAME = "windsurf";
const VERIFIED_DEVIN_DESKTOP_VERSION = "3.4.27";
const DEVIN_DESKTOP_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;
const DEVIN_LOCALE = "en-US";

export function resolveDevinDesktopVersion(): string {
  const override = process.env.DEVIN_DESKTOP_VERSION?.trim() ?? "";
  return DEVIN_DESKTOP_VERSION_PATTERN.test(override) ? override : VERIFIED_DEVIN_DESKTOP_VERSION;
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
  const version = resolveDevinDesktopVersion();
  return concatBytes([
    encodeString(1, apiKey),
    encodeString(2, DEVIN_UPSTREAM_IDE_NAME),
    encodeString(3, version),
    encodeString(4, version),
    encodeString(5, sessionId),
    encodeString(6, DEVIN_LOCALE),
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
        return { kind: "error", message: msg ?? "unknown Devin Desktop upstream error" };
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

// ─── Convert OpenAI messages → Devin Desktop messages ────────────────────────

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

// ─── DevinDesktopExecutor ─────────────────────────────────────────────────────────

export class DevinDesktopExecutor extends BaseExecutor {
  constructor() {
    super(
      "devin-desktop",
      PROVIDERS["devin-desktop"] || {
        id: "devin-desktop",
        baseUrl: DEVIN_DESKTOP_CHAT_URL,
      }
    );
  }

  buildUrl(): string {
    return DEVIN_DESKTOP_CHAT_URL;
  }

  buildHeaders(credentials: { accessToken?: string; apiKey?: string }): Record<string, string> {
    const token = credentials.accessToken || credentials.apiKey || "";
    return {
      "Content-Type": "application/grpc-web+proto",
      Accept: "application/grpc-web+proto",
      // Codeium API key also goes in Metadata.api_key (protobuf field) — see request body.
      // Some endpoints also accept it as a Bearer token header.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "User-Agent": `windsurf/${resolveDevinDesktopVersion()}`,
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
    if (!apiKey) {
      const url = this.buildUrl();
      const headers = this.buildHeaders(credentials);
      return {
        response: new Response(
          JSON.stringify(buildErrorBody(401, "Devin Desktop API key is required")),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        ),
        url,
        headers,
        transformedBody: null,
      };
    }
    const upstreamModel = model;

    // Parse OpenAI messages from request body
    const b = (body ?? {}) as Record<string, unknown>;
    const rawMessages = Array.isArray(b.messages) ? (b.messages as OpenAIMessage[]) : [];
    const wsMessages = openAIMessagesToWs(rawMessages);

    if (wsMessages.length === 0) {
      wsMessages.push({ role: "user", content: "" });
    }

    // Build and frame the protobuf request
    const protoPayload = buildGetChatMessageRequest(apiKey, upstreamModel, wsMessages);
    const framedPayload = grpcWebFrame(protoPayload);

    const url = this.buildUrl();
    const headers = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    log?.info?.("DEVIN", `Devin Desktop → ${upstreamModel} (${wsMessages.length} messages)`);

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
    const responseId = `chatcmpl-devin-desktop-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

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
          let pending = new Uint8Array(0);
          const reader = upstream.body?.getReader();

          const handleFrame = (flag: number, payload: Uint8Array) => {
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
              return;
            }

            if (flag !== 0x00) return; // skip unknown flags

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
          };

          const drainFrames = () => {
            let offset = 0;
            while (offset + 5 <= pending.length) {
              const flag = pending[offset];
              const len =
                (pending[offset + 1] << 24) |
                (pending[offset + 2] << 16) |
                (pending[offset + 3] << 8) |
                pending[offset + 4];
              if (len < 0 || offset + 5 + len > pending.length) break;
              handleFrame(flag, pending.slice(offset + 5, offset + 5 + len));
              offset += 5 + len;
            }
            if (offset > 0) pending = pending.slice(offset);
          };

          if (reader) {
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (!value) continue;
                pending = pending.length === 0 ? value : concatBytes([pending, value]);
                drainFrames();
              }
            } finally {
              reader.releaseLock();
            }
          }
          drainFrames();

          if (hadError) {
            const safeMessage = sanitizeErrorMessage(hadError);
            emit(
              `data: ${JSON.stringify({
                error: {
                  message: safeMessage,
                  type: "devin_desktop_error",
                  code: "upstream_error",
                },
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
          const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
          emit(
            `data: ${JSON.stringify({
              error: {
                message: `Devin Desktop stream error: ${msg}`,
                type: "devin_desktop_error",
              },
            })}\n\n`
          );
          emit("data: [DONE]\n\n");
        }

        controller.close();
      },
    });

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
