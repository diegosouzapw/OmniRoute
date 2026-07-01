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
 *   - Auth:      `Authorization: Bearer <JWT>` + `Cookie: kimi-auth=<JWT>`
 *   - Body:      Connect-framed `{scenario, message:{role,blocks:[{text:{content}}]},
 *                options:{thinking,enable_plugin}}`
 *   - Response:  Connect-framed stream of events carrying deltas with one of
 *                `mask: "block.text.content"` (answer) or
 *                `mask: "block.think.content"` (reasoning), emitted via
 *                `op: "set"` (initial) and `op: "append"` (incremental).
 *
 * Cookie handling: the user pastes their full Cookie header from www.kimi.com.
 * We extract the `kimi-auth` JWT from it (it is the only cookie the upstream
 * actually consults) and use it both as the Bearer token and as the Cookie we
 * send back, so we don't leak the user's analytics cookies (Ga, CF, HM, ...).
 *
 * The `x-msh-*` / `x-traffic-id` / `x-msh-shield-data` headers the SPA sends
 * are NOT required — verified by stripping them one at a time against a live
 * session; the upstream returns the same response either way.
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, sanitizeErrorMessage } from "../utils/error.ts";

const BASE_URL = "https://www.kimi.com";
const CHAT_URL = `${BASE_URL}/apiv2/kimi.gateway.chat.v1.ChatService/Chat`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

const DEFAULT_SCENARIO = "SCENARIO_K2D5";

/**
 * Pull the `kimi-auth` JWT value out of whatever the user pasted.
 *
 * Accepts:
 *   - Bare JWT (header.payload.sig)            → returned as-is
 *   - `kimi-auth=<jwt>; other=...` cookie blob → extracts kimi-auth value
 *   - `Authorization: Bearer <jwt>`            → extracts bearer value
 */
export function extractKimiJwt(rawValue: string): string {
  const trimmed = String(rawValue ?? "").trim();
  if (!trimmed) return "";

  // Strip a leading "Cookie:" / "Authorization:" label if the user pasted the
  // full header line.
  const noLabel = trimmed
    .replace(/^cookie\s*:\s*/i, "")
    .replace(/^authorization\s*:\s*bearer\s+/i, "");

  // Bare JWT — three base64url segments separated by dots.
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(noLabel)) {
    return noLabel;
  }

  // Cookie-style pair: pull `kimi-auth=<value>` out of the blob.
  const match = noLabel.match(/(?:^|[\s;])kimi-auth=([^;\s]+)/);
  if (match) return match[1];

  // Last resort: a `Bearer <jwt>` pasted without the header label.
  const bearer = noLabel.match(/bearer\s+(eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/i);
  if (bearer) return bearer[1];

  return "";
}

/** Wrap a JSON message in the 5-byte Connect streaming envelope (flags + length). */
function frameConnectMessage(json: string): Uint8Array {
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

interface ConnectFrame {
  flags: number;
  message: Record<string, unknown> | null;
}

/**
 * Decode one Connect frame from a stream buffer.
 * Returns the consumed byte count and the parsed frame, or `null` if there
 * isn't enough data yet.
 */
function decodeConnectFrame(buf: Uint8Array, byteOffset: number): { consumed: number; frame: ConnectFrame | null } {
  if (byteOffset + 5 > buf.length) return { consumed: 0, frame: null };
  const flags = buf[byteOffset];
  const len =
    (buf[byteOffset + 1] << 24) |
    (buf[byteOffset + 2] << 16) |
    (buf[byteOffset + 3] << 8) |
    buf[byteOffset + 4];
  // Sign-extend the high bit back to negative when len was read as signed.
  const msgLen = len < 0 ? len + 0x100000000 : len;
  if (byteOffset + 5 + msgLen > buf.length) return { consumed: 0, frame: null };

  const payload = buf.subarray(byteOffset + 5, byteOffset + 5 + msgLen);
  let message: Record<string, unknown> | null = null;
  if (msgLen > 0) {
    try {
      message = JSON.parse(new TextDecoder().decode(payload));
    } catch {
      message = null;
    }
  }
  return { consumed: 5 + msgLen, frame: { flags, message } };
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
function extractDelta(msg: Record<string, unknown> | null): { kind: DeltaKind; text: string } | null {
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

function isEndOfStream(msg: Record<string, unknown> | null): boolean {
  if (!msg) return false;
  // Assistant message flipped to COMPLETED.
  const message = (msg.message ?? null) as Record<string, unknown> | null;
  if (message && String(message.status ?? "") === "MESSAGE_STATUS_COMPLETED" && String(message.role ?? "") === "assistant") {
    return true;
  }
  return false;
}

/** Fold a multi-turn OpenAI `messages` array into a single Kimi user turn. */
function foldMessages(messages: Array<{ role: string; content: unknown }>): string {
  let system = "";
  let user = "";
  for (const m of messages) {
    const text = typeof m.content === "string" ? m.content : JSON.stringify(m.content ?? "");
    if (m.role === "system") {
      system += (system ? "\n\n" : "") + text;
    } else if (m.role === "user") {
      // Kimi's web chat is single-turn; keep only the latest user content but
      // preserve prior assistant text for continuity when present.
      user = user ? `${user}\n\n${text}` : text;
    } else if (m.role === "assistant") {
      user = user ? `${user}\n\nAssistant: ${text}` : `Assistant: ${text}`;
    }
  }
  return system ? `${system}\n\n${user}` : user;
}

export class KimiWebExecutor extends BaseExecutor {
  constructor() {
    super("kimi-web", { id: "kimi-web", baseUrl: BASE_URL });
  }

  private buildKimiHeaders(jwt: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/connect+json",
      Accept: "*/*",
      "User-Agent": USER_AGENT,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
      "connect-protocol-version": "1",
    };
    if (jwt) {
      headers["Authorization"] = `Bearer ${jwt}`;
      headers["Cookie"] = `kimi-auth=${jwt}`;
    }
    return headers;
  }

  private buildRequestBody(prompt: string, wantThinking: boolean): string {
    return JSON.stringify({
      scenario: DEFAULT_SCENARIO,
      tools: [{ type: "TOOL_TYPE_SEARCH", search: {} }, { type: "TOOL_TYPE_CRON_JOB" }],
      message: {
        role: "user",
        blocks: [{ message_id: "", text: { content: prompt } }],
        scenario: DEFAULT_SCENARIO,
      },
      options: { thinking: wantThinking, enable_plugin: true },
    });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const rawCredential = String(credentials?.apiKey ?? "").trim();
    const jwt = extractKimiJwt(rawCredential);
    if (!jwt) {
      return makeErrorResult(
        400,
        "Missing Kimi session — paste the full Cookie header from www.kimi.com (must contain kimi-auth=<JWT>) or just the JWT itself.",
        body,
        CHAT_URL
      );
    }

    const messages = (bodyObj.messages as Array<{ role: string; content: unknown }>) || [];
    const modelId = (bodyObj.model as string) || "kimi-default";
    // Theorize "thinking" intent from model id — matches how Kimi's own UI
    // toggles between thinking and non-thinking variants.
    const wantThinking = /think|reason|k2\.6|k2-6/i.test(modelId) ? true : bodyObj.reasoning_effort !== "none";

    const prompt = foldMessages(messages);
    const reqBody = this.buildRequestBody(prompt, wantThinking);
    const reqHeaders = this.buildKimiHeaders(jwt);

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
      return makeErrorResult(upstream.status, `Kimi error: ${sanitizeErrorMessage(errText)}`, body, CHAT_URL);
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
                  if (consumed === 0) break; // need more bytes
                  offset += consumed;
                  if (!frame?.message) continue;

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
                  if (isEndOfStream(frame.message)) {
                    emitChunk(controller, {}, "stop");
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();
                    return;
                  }
                }
                // Compact the buffer.
                buffer = buffer.subarray(offset);
              }
            }
            // Stream ended without an explicit COMPLETED marker — flush a stop.
            if (!emittedRole) {
              emitChunk(controller, { role: "assistant", content: "" });
            }
            emitChunk(controller, {}, "stop");
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (err) {
            if (!signal?.aborted) {
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
    try {
      while (true) {
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
          if (consumed === 0) break;
          offset += consumed;
          if (!frame?.message) continue;
          const delta = extractDelta(frame.message);
          if (delta) {
            if (delta.kind === "think") reasoning += delta.text;
            else answer += delta.text;
          }
          if (isEndOfStream(frame.message)) {
            offset = buffer.length; // drain
            break;
          }
        }
        buffer = buffer.subarray(offset);
      }
    } catch {
      /* best-effort — return what we have */
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
