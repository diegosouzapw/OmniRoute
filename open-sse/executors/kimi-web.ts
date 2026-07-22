/**
 * KimiWebExecutor — Moonshot AI Chat via www.kimi.com (international)
 *
 * Routes requests through Kimi's consumer chat API on the international domain.
 * Originally this executor targeted `kimi.moonshot.cn` (mainland-CN consumer
 * chat). That domain now redirects every visitor outside CN to
 * `https://www.kimi.com/`, which speaks a completely different API surface:
 *
 *   - Endpoint:  POST /apiv2/kimi.gateway.chat.v1.ChatService/Chat
 *   - Protocol:  Connect-RPC (unary envelope framing — 5-byte header + JSON)
 *   - Auth:      `Authorization: Bearer <access_token>`
 *   - Body:      Connect-framed ChatRequest JSON using protobuf field names
 *   - Response:  Connect-framed stream of events carrying deltas with one of
 *                `mask: "block.text.content"` (answer) or
 *                `mask: "block.think.content"` (reasoning), emitted via
 *                `op: "set"` (initial) and `op: "append"` (incremental).
 *
 * The current SPA stores `access_token` in localStorage. A legacy `kimi-auth`
 * cookie is accepted as input for existing OmniRoute connections, but only the
 * extracted token is forwarded and browser cookies are never replayed.
 *
 * The `x-msh-*` / `x-traffic-id` / `x-msh-shield-data` headers the SPA sends
 * are NOT required — verified by stripping them one at a time against a live
 * session; the upstream returns the same response either way.
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import {
  makeExecutorErrorResult as makeErrorResult,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import { extractKimiAccessToken } from "@/lib/providers/webCookieAuth";
import {
  type KimiWebModelConfig,
  resolveKimiWebContextLength,
  resolveKimiWebModelConfig,
  resolveKimiWebReasoningEffort,
} from "../config/providers/registry/kimi/web/runtime.ts";

export { extractKimiAccessToken };

const BASE_URL = "https://www.kimi.com";
const CHAT_URL = `${BASE_URL}/apiv2/kimi.gateway.chat.v1.ChatService/Chat`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

export function resolveModelConfig(modelId: string): KimiWebModelConfig | null {
  return resolveKimiWebModelConfig(modelId);
}

/** Wrap a JSON message in the 5-byte Connect streaming envelope (flags + length). */
export function frameConnectMessage(json: string): Uint8Array {
  const payload = new TextEncoder().encode(json);
  const framed = new Uint8Array(5 + payload.length);
  framed[0] = 0; // flags: 0 = uncompressed
  const len = payload.length;
  framed[1] = (len >>> 24) & 0xff;
  framed[2] = (len >>> 16) & 0xff;
  framed[3] = (len >>> 8) & 0xff;
  framed[4] = len & 0xff;
  framed.set(payload, 5);
  return framed;
}

export interface ConnectFrame {
  flags: number;
  message: Record<string, unknown> | null;
}

/**
 * ponytail: cap a single Connect frame at 8 MiB. Kimi's largest legitimate
 * event is well under 1 KiB (a delta or stage transition); anything bigger
 * means the upstream is misbehaving or an attacker controls the response and
 * is trying to OOM the proxy by sending a header claiming a huge length.
 * The non-streaming accumulator would otherwise grow unbounded. If you ever
 * see this tripping in production, raise the ceiling and add a regression
 * test — but never remove it.
 */
const MAX_FRAME_LEN = 8 * 1024 * 1024;

/**
 * Decode one Connect frame from a stream buffer.
 * Returns:
 *   - `consumed: 0` if there isn't enough data yet (need more bytes)
 *   - `consumed: -1` if the frame header claims a length above MAX_FRAME_LEN
 *     (caller must treat this as a stream-fatal protocol error)
 *   - `consumed: N` + the parsed frame otherwise
 */
export function decodeConnectFrame(
  buf: Uint8Array,
  byteOffset: number
): { consumed: number; frame: ConnectFrame | null } {
  if (byteOffset + 5 > buf.length) return { consumed: 0, frame: null };
  const flags = buf[byteOffset];
  const len =
    (buf[byteOffset + 1] << 24) |
    (buf[byteOffset + 2] << 16) |
    (buf[byteOffset + 3] << 8) |
    buf[byteOffset + 4];
  // Sign-extend the high bit back to negative when len was read as signed.
  const msgLen = len < 0 ? len + 0x100000000 : len;
  if (msgLen > MAX_FRAME_LEN) return { consumed: -1, frame: null };
  if (byteOffset + 5 + msgLen > buf.length) return { consumed: 0, frame: null };
  if ((flags & ~0x03) !== 0) {
    throw new Error(`Kimi Connect frame used unsupported flags: ${flags}`);
  }
  if ((flags & 0x01) !== 0) {
    throw new Error("Kimi Connect compressed frames are not supported");
  }

  const payload = buf.subarray(byteOffset + 5, byteOffset + 5 + msgLen);
  let message: Record<string, unknown> | null = null;
  if (msgLen > 0) {
    try {
      message = JSON.parse(new TextDecoder().decode(payload));
    } catch (error) {
      throw new Error(
        `Kimi Connect frame contained invalid JSON: ${error instanceof Error ? error.message : "parse failed"}`
      );
    }
  }
  return { consumed: 5 + msgLen, frame: { flags, message } };
}

export function getConnectEndStreamError(frame: ConnectFrame): string | null {
  if ((frame.flags & 0x02) === 0) return null;
  const error = frame.message?.error;
  if (!error || typeof error !== "object" || Array.isArray(error)) return null;
  const record = error as Record<string, unknown>;
  const code = typeof record.code === "string" ? record.code : "unknown";
  const message = typeof record.message === "string" ? record.message : "upstream error";
  return `${code}: ${message}`;
}

type DeltaKind = "text" | "think" | null;

/**
 * Extract a content delta + kind from a Connect frame message.
 *
 * The chat stream uses two ops against two masks:
 *   - `op: "set"`     on `block.text`     / `block.think`     → first chunk
 *   - `op: "append"`  on `block.text.content` / `block.think.content` → subsequent chunks
 *
 * Anything else (heartbeats, chat/message metadata, stage transitions) is
 * suppressed; we only surface text to the client.
 */
export function extractDelta(
  msg: Record<string, unknown> | null
): { kind: DeltaKind; text: string } | null {
  if (!msg) return null;
  const op = String(msg.op ?? "");
  const mask = String(msg.mask ?? "");
  const block = (msg.block ?? {}) as Record<string, unknown>;

  // `op: append` carries a delta string under `block.<text|think>.content`.
  if (op === "append") {
    if (mask === "block.text.content") {
      const text = String(((block.text ?? {}) as Record<string, unknown>).content ?? "");
      return text ? { kind: "text", text } : null;
    }
    if (mask === "block.think.content") {
      const text = String(((block.think ?? {}) as Record<string, unknown>).content ?? "");
      return text ? { kind: "think", text } : null;
    }
    return null;
  }

  // `op: set` on `block.text` / `block.think` carries the initial content.
  if (op === "set") {
    if (mask === "block.text") {
      const text = String(((block.text ?? {}) as Record<string, unknown>).content ?? "");
      return text ? { kind: "text", text } : null;
    }
    if (mask === "block.think") {
      const text = String(((block.think ?? {}) as Record<string, unknown>).content ?? "");
      return text ? { kind: "think", text } : null;
    }
  }
  return null;
}

type KimiWebInputMessage = {
  role: string;
  content: unknown;
  tool_calls?: unknown;
};

export interface FoldedKimiWebMessages {
  prompt: string;
  systemPrompt: string;
}

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) {
    throw new Error("Kimi Web only supports text message content");
  }

  return content
    .map((part) => {
      if (!part || typeof part !== "object" || Array.isArray(part)) {
        throw new Error("Kimi Web only supports text message content");
      }
      const record = part as Record<string, unknown>;
      if (
        (record.type === "text" || record.type === "input_text") &&
        typeof record.text === "string"
      ) {
        return record.text;
      }
      throw new Error("Kimi Web does not support image, audio, file, or tool content");
    })
    .join("");
}

/** Fold text-only OpenAI history into the single user turn accepted by Kimi Web. */
export function foldMessages(messages: KimiWebInputMessage[]): FoldedKimiWebMessages {
  const systemParts: string[] = [];
  const conversationParts: string[] = [];

  for (const message of messages) {
    if (message.role === "tool" || message.role === "function") {
      throw new Error("Kimi Web does not support tool result messages");
    }
    if (message.tool_calls !== undefined) {
      throw new Error("Kimi Web does not support assistant tool calls");
    }

    const text = textFromContent(message.content);
    if (message.role === "system" || message.role === "developer") {
      if (text) systemParts.push(text);
    } else if (message.role === "user") {
      if (text) conversationParts.push(conversationParts.length > 0 ? `User: ${text}` : text);
    } else if (message.role === "assistant") {
      if (text) conversationParts.push(`Assistant: ${text}`);
    } else {
      throw new Error(`Kimi Web does not support message role ${message.role}`);
    }
  }

  return {
    prompt: conversationParts.join("\n\n").trim(),
    systemPrompt: systemParts.join("\n\n").trim(),
  };
}

export class KimiWebExecutor extends BaseExecutor {
  constructor() {
    super("kimi-web", { id: "kimi-web", baseUrl: BASE_URL });
  }

  private buildKimiHeaders(accessToken: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/connect+json",
      Accept: "*/*",
      "User-Agent": USER_AGENT,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
      "connect-protocol-version": "1",
    };
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
    return headers;
  }

  private buildRequestBody(
    messages: FoldedKimiWebMessages,
    config: KimiWebModelConfig,
    reasoningEffort?: string,
    contextLength?: string
  ): string {
    const options: Record<string, unknown> = {
      // The current web client always enables the thinking-capable request path.
      // K2.6's NONE/LOW enum controls whether extra reasoning is actually used.
      thinking: true,
      // OmniRoute exposes text chat only. Kimi's built-in audio/ask-user tools
      // produce event types this executor cannot faithfully map to OpenAI chat.
      enable_plugin: false,
      ...(messages.systemPrompt ? { system_prompt: messages.systemPrompt } : {}),
      ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
      ...(contextLength ? { context_length: contextLength } : {}),
    };

    return JSON.stringify({
      chat_id: "",
      ...(config.kimiPlusId ? { kimiplus_id: config.kimiPlusId } : {}),
      scenario: config.scenario,
      tools: [],
      message: {
        id: "",
        parent_id: "",
        children_message_ids: [],
        role: "user",
        blocks: [{ id: "", message_id: "", text: { content: messages.prompt } }],
        scenario: config.scenario,
        labels: [],
        references: [],
        is_goal: false,
      },
      options,
      project_id: "",
    });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const rawCredential = String(credentials?.accessToken || credentials?.apiKey || "").trim();
    const accessToken = extractKimiAccessToken(rawCredential);
    if (!accessToken) {
      return makeErrorResult(
        400,
        "Missing Kimi access_token — log in at www.kimi.com and capture access_token from localStorage.",
        body,
        CHAT_URL
      );
    }

    const modelId = String(input.model || bodyObj.model || "");
    const modelConfig = resolveModelConfig(modelId);
    if (!modelConfig) {
      return makeErrorResult(400, `Unsupported Kimi Web model: ${modelId}`, body, CHAT_URL);
    }

    const tools = bodyObj.tools;
    const functions = bodyObj.functions;
    if (tools != null && (!Array.isArray(tools) || tools.length > 0)) {
      return makeErrorResult(
        400,
        "Kimi Web does not support OpenAI function tools",
        body,
        CHAT_URL
      );
    }
    if (functions != null && (!Array.isArray(functions) || functions.length > 0)) {
      return makeErrorResult(
        400,
        "Kimi Web does not support legacy function tools",
        body,
        CHAT_URL
      );
    }

    let foldedMessages: FoldedKimiWebMessages;
    let reasoningEffort: string | undefined;
    let contextLength: string | undefined;
    try {
      const messages = Array.isArray(bodyObj.messages)
        ? (bodyObj.messages as KimiWebInputMessage[])
        : [];
      foldedMessages = foldMessages(messages);
      if (!foldedMessages.prompt) throw new Error("Kimi Web requires a non-empty user message");
      reasoningEffort = resolveKimiWebReasoningEffort(bodyObj.reasoning_effort, modelConfig);
      contextLength = resolveKimiWebContextLength(bodyObj.context_length, modelConfig);
    } catch (error) {
      return makeErrorResult(
        400,
        error instanceof Error ? error.message : "Invalid Kimi Web request",
        body,
        CHAT_URL
      );
    }

    const reqBody = this.buildRequestBody(
      foldedMessages,
      modelConfig,
      reasoningEffort,
      contextLength
    );
    const reqHeaders = this.buildKimiHeaders(accessToken);

    // Connect framing wraps the JSON body in a 5-byte envelope. Without it the
    // upstream returns `invalid_argument` for every request.
    const framedBody = frameConnectMessage(reqBody);

    let upstream: Response;
    try {
      upstream = await fetch(CHAT_URL, {
        method: "POST",
        headers: reqHeaders,
        body: new Uint8Array(framedBody),
        signal,
      });
    } catch (err) {
      return makeErrorResult(
        502,
        `Kimi fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        CHAT_URL
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(
        upstream.status,
        `Kimi error: ${sanitizeErrorMessage(errText)}`,
        body,
        CHAT_URL
      );
    }

    const encoder = new TextEncoder();
    const id = `chatcmpl-kimi-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

    const emitChunk = (
      controller: ReadableStreamDefaultController,
      delta: Record<string, unknown>,
      finish: string | null = null
    ) => {
      const chunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model: modelId,
        choices: [{ index: 0, delta, finish_reason: finish }],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
    };

    // The upstream is a Connect-framed stream regardless of whether the
    // client asked for SSE — Kimi always streams. For non-streaming clients
    // we buffer the full response below.
    const sourceStream = upstream.body ?? new ReadableStream({ start: (c) => c.close() });

    if (wantStream) {
      const outStream = new ReadableStream({
        async start(controller) {
          const reader = sourceStream.getReader();
          let buffer = new Uint8Array(0);
          let emittedRole = false;
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              if (value) {
                const merged = new Uint8Array(buffer.length + value.length);
                merged.set(buffer, 0);
                merged.set(value, buffer.length);
                buffer = merged;

                let offset = 0;
                while (offset < buffer.length) {
                  const { consumed, frame } = decodeConnectFrame(buffer, offset);
                  if (consumed === -1) {
                    throw new Error("Kimi Connect frame exceeded MAX_FRAME_LEN");
                  }
                  if (consumed === 0) break; // need more bytes
                  offset += consumed;
                  if (!frame) continue;
                  if ((frame.flags & 0x02) !== 0) {
                    const endStreamError = getConnectEndStreamError(frame);
                    if (endStreamError) {
                      throw new Error(`Kimi Connect EndStream error: ${endStreamError}`);
                    }
                    if (!emittedRole) {
                      emitChunk(controller, { role: "assistant", content: "" });
                    }
                    emitChunk(controller, {}, "stop");
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();
                    return;
                  }
                  if (!frame.message) continue;

                  const delta = extractDelta(frame.message);
                  if (delta) {
                    if (!emittedRole) {
                      emittedRole = true;
                      emitChunk(controller, { role: "assistant", content: "" });
                    }
                    if (delta.kind === "think") {
                      emitChunk(controller, { reasoning_content: delta.text });
                    } else {
                      emitChunk(controller, { content: delta.text });
                    }
                  }
                }
                // Compact the buffer.
                buffer = buffer.subarray(offset);
              }
            }
            throw new Error("Kimi Connect stream ended without a successful EndStream frame");
          } catch (err) {
            if (signal?.aborted) {
              try {
                controller.close();
              } catch {
                /* controller already closed */
              }
            } else {
              try {
                controller.error(err);
              } catch {
                /* controller already closed */
              }
            }
          }
        },
      });

      return {
        response: new Response(outStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: CHAT_URL,
        headers: reqHeaders,
        transformedBody: JSON.parse(reqBody),
      };
    }

    // Non-streaming: collect all deltas into a single chat.completion JSON.
    let answer = "";
    let reasoning = "";
    const reader = sourceStream.getReader();
    let buffer = new Uint8Array(0);
    let sawSuccessfulEndStream = false;
    try {
      readLoop: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;
        const merged = new Uint8Array(buffer.length + value.length);
        merged.set(buffer, 0);
        merged.set(value, buffer.length);
        buffer = merged;

        let offset = 0;
        while (offset < buffer.length) {
          const { consumed, frame } = decodeConnectFrame(buffer, offset);
          if (consumed === -1) throw new Error("Kimi Connect frame exceeded MAX_FRAME_LEN");
          if (consumed === 0) break;
          offset += consumed;
          if (!frame) continue;
          if ((frame.flags & 0x02) !== 0) {
            const endStreamError = getConnectEndStreamError(frame);
            if (endStreamError) {
              throw new Error(`Kimi Connect EndStream error: ${endStreamError}`);
            }
            sawSuccessfulEndStream = true;
            break readLoop;
          }
          if (!frame.message) continue;
          const delta = extractDelta(frame.message);
          if (delta) {
            if (delta.kind === "think") reasoning += delta.text;
            else answer += delta.text;
          }
        }
        buffer = buffer.subarray(offset);
      }
      if (!sawSuccessfulEndStream) {
        throw new Error("Kimi Connect stream ended without a successful EndStream frame");
      }
    } catch (error) {
      return makeErrorResult(
        502,
        `Kimi Connect protocol error: ${error instanceof Error ? error.message : "unknown"}`,
        body,
        CHAT_URL
      );
    }

    const message: Record<string, unknown> = { role: "assistant", content: answer };
    if (reasoning) message.reasoning_content = reasoning;
    const completion = {
      id,
      object: "chat.completion",
      created,
      model: modelId,
      choices: [{ index: 0, message, finish_reason: "stop" }],
    };
    return {
      response: new Response(JSON.stringify(completion), {
        headers: { "Content-Type": "application/json" },
      }),
      url: CHAT_URL,
      headers: reqHeaders,
      transformedBody: JSON.parse(reqBody),
    };
  }
}
