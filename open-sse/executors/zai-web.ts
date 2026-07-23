/**
 * ZaiWebExecutor — Z.ai Web Chat (chat.z.ai, free web-session/cookie auth)
 *
 * Distinct from the existing API-key `zai`/`glm`/`glm-cn`/`glmt` providers
 * (Anthropic/OpenAI-compatible `api.z.ai`, see `providers/apikey/regional.ts`).
 * This executor targets the *consumer chat* frontend at chat.z.ai — the same
 * product family as `chatglm.cn` (Zhipu AI), but the international domain —
 * so users without an API key can drive it for free via their browser session,
 * modeled on the `chatglm-web` credential entry (#4056) and the `doubao-web` /
 * `venice-web` cookie executors.
 *
 * Endpoint: POST https://chat.z.ai/api/chat/completions
 * Auth:     full Cookie header from chat.z.ai (must contain the `token` JWT).
 *           Sent both as `Cookie` and as `Authorization: Bearer <token>` —
 *           the SPA's own fetch client sets both, and stripping either one
 *           has been reported (upstream repos) to 401 the request.
 * Response: SSE. Frames are z.ai's internal envelope
 *           `{"type":"chat:completion","data":{"delta_content":"...","phase":"answer","done":false}}`
 *           — mirrored from the shared Zhipu chatglm.cn/chat.z.ai frontend
 *           protocol. Some deployments/models pass through an already
 *           OpenAI-shaped `{"choices":[{"delta":{"content":"..."}}]}` frame
 *           instead, so the parser accepts both shapes defensively.
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import {
  makeExecutorErrorResult as makeErrorResult,
  normalizeCookie,
  sanitizeErrorMessage,
} from "../utils/error.ts";

const BASE_URL = "https://chat.z.ai";
const CHAT_URL = `${BASE_URL}/api/chat/completions`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

/** Extract the `token` cookie value (JWT) from a full Cookie header string. */
export function extractZaiToken(rawCookie: string): string {
  const cookie = normalizeCookie(rawCookie.trim());
  if (!cookie) return "";
  const match = cookie.match(/(?:^|;\s*)token=([^;]+)/);
  if (match) return match[1].trim();
  // Users may paste the bare JWT with no `token=` prefix.
  return cookie.includes(";") || cookie.includes("=") ? "" : cookie;
}

/**
 * One parsed delta out of a z.ai SSE frame: either a content/reasoning chunk
 * or a signal that the stream has finished.
 */
export interface ZaiDelta {
  content: string;
  reasoning: string;
  done: boolean;
}

/** Parse an already OpenAI-shaped `{choices:[{delta}]}` pass-through frame. */
function parseOpenAiShapedFrame(choices: Array<Record<string, unknown>>): ZaiDelta {
  const delta = (choices[0]?.delta ?? {}) as Record<string, unknown>;
  const finishReason = choices[0]?.finish_reason;
  return {
    content: typeof delta.content === "string" ? delta.content : "",
    reasoning: typeof delta.reasoning_content === "string" ? delta.reasoning_content : "",
    done: finishReason != null,
  };
}

/** Parse the z.ai / chatglm internal `{data:{delta_content,phase,done}}` envelope. */
function parseInternalEnvelopeFrame(
  frame: Record<string, unknown>,
  data: Record<string, unknown>
): ZaiDelta | null {
  const phase = String(data.phase ?? "");
  const deltaContent = data.delta_content ?? data.edit_content ?? data.content;
  const done =
    data.done === true ||
    phase === "done" ||
    phase === "finish" ||
    String(frame.type ?? "") === "chat:completion:finish";

  if (typeof deltaContent === "string" && deltaContent) {
    const isThinking = phase === "thinking";
    return {
      content: isThinking ? "" : deltaContent,
      reasoning: isThinking ? deltaContent : "",
      done,
    };
  }
  if (done) return { content: "", reasoning: "", done: true };
  return null;
}

/**
 * Parse a single decoded z.ai SSE `data:` JSON payload into a normalized
 * delta. Handles both the internal `{data:{delta_content,phase,done}}`
 * envelope and a pass-through OpenAI-shaped `{choices:[{delta}]}` frame.
 */
export function parseZaiFrame(raw: unknown): ZaiDelta | null {
  if (!raw || typeof raw !== "object") return null;
  const frame = raw as Record<string, unknown>;

  const choices = frame.choices as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(choices) && choices.length > 0) {
    return parseOpenAiShapedFrame(choices);
  }

  const data = (frame.data ?? frame) as Record<string, unknown>;
  return parseInternalEnvelopeFrame(frame, data);
}

export function foldMessages(
  messages: Array<{ role: string; content: unknown }>
): Array<{ role: string; content: string }> {
  return messages.map((m) => ({
    role: m.role,
    content: typeof m.content === "string" ? m.content : JSON.stringify(m.content ?? ""),
  }));
}

/** Split a chunk of decoded SSE text into complete `data:` payload strings. */
function extractSseDataPayloads(buffer: { text: string }, incoming: string): string[] {
  buffer.text += incoming;
  const lines = buffer.text.split("\n");
  buffer.text = lines.pop() || "";
  const payloads: string[] = [];
  for (const line of lines) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    payloads.push(data);
  }
  return payloads;
}

/** Parse a raw SSE payload string into a normalized delta, or null if unusable. */
function parseSsePayload(data: string): ZaiDelta | null {
  try {
    return parseZaiFrame(JSON.parse(data));
  } catch {
    return null;
  }
}

/**
 * Read the upstream SSE body to completion, invoking `onDelta` for every
 * parsed delta. Returns true when `onDelta` signalled the stream ended
 * (returned true), false when the body was exhausted without a done delta.
 */
async function drainSseDeltas(
  sourceBody: ReadableStream<Uint8Array>,
  onDelta: (delta: ZaiDelta) => boolean
): Promise<boolean> {
  const decoder = new TextDecoder();
  const reader = sourceBody.getReader();
  const buffer = { text: "" };
  while (true) {
    const { done, value } = await reader.read();
    if (done) return false;
    const payloads = extractSseDataPayloads(buffer, decoder.decode(value, { stream: true }));
    for (const raw of payloads) {
      const delta = parseSsePayload(raw);
      if (delta && onDelta(delta)) return true;
    }
  }
}

type ChunkEmitter = (
  controller: ReadableStreamDefaultController,
  delta: Record<string, unknown>,
  finish?: string | null
) => void;

/** Emit role/reasoning/content/stop chunks for one delta. Returns true when the stream ended. */
function emitDeltaChunks(
  controller: ReadableStreamDefaultController,
  delta: ZaiDelta,
  emitChunk: ChunkEmitter,
  roleState: { emitted: boolean }
): boolean {
  if (!roleState.emitted && (delta.content || delta.reasoning)) {
    roleState.emitted = true;
    emitChunk(controller, { role: "assistant", content: "" });
  }
  if (delta.reasoning) emitChunk(controller, { reasoning_content: delta.reasoning });
  if (delta.content) emitChunk(controller, { content: delta.content });
  if (delta.done) {
    emitChunk(controller, {}, "stop");
    controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
    controller.close();
    return true;
  }
  return false;
}

export class ZaiWebExecutor extends BaseExecutor {
  constructor() {
    super("zai-web", { id: "zai-web", baseUrl: BASE_URL });
  }

  private buildZaiHeaders(rawCookie: string, token: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "User-Agent": USER_AGENT,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
    };
    if (rawCookie) headers.Cookie = rawCookie;
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  private buildRequestBody(
    messages: Array<{ role: string; content: unknown }>,
    modelId: string
  ): Record<string, unknown> {
    return {
      stream: true,
      model: modelId,
      messages: foldMessages(messages),
      params: {},
      features: {
        image_generation: false,
        web_search: false,
        auto_web_search: false,
      },
    };
  }

  /** Drain the streaming response body into an OpenAI-shaped SSE ReadableStream. */
  private buildStreamingBody(
    sourceBody: ReadableStream<Uint8Array>,
    modelId: string,
    emitChunk: ChunkEmitter,
    signal: AbortSignal | null | undefined
  ): ReadableStream {
    return new ReadableStream({
      async start(controller) {
        const roleState = { emitted: false };
        try {
          const ended = await drainSseDeltas(sourceBody, (delta) =>
            emitDeltaChunks(controller, delta, emitChunk, roleState)
          );
          if (ended) return; // emitDeltaChunks already sent [DONE] and closed
          if (!roleState.emitted) emitChunk(controller, { role: "assistant", content: "" });
          emitChunk(controller, {}, "stop");
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
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
  }

  /** Drain the response body and aggregate all deltas into a single answer/reasoning pair. */
  private async collectNonStreaming(
    sourceBody: ReadableStream<Uint8Array>
  ): Promise<{ answer: string; reasoning: string }> {
    let answer = "";
    let reasoning = "";
    try {
      await drainSseDeltas(sourceBody, (delta) => {
        if (delta.reasoning) reasoning += delta.reasoning;
        if (delta.content) answer += delta.content;
        return delta.done;
      });
    } catch {
      /* best-effort — return what we have */
    }
    return { answer, reasoning };
  }

  /** POST the chat request upstream. Returns either the upstream Response or an error result. */
  private async fetchUpstream(
    reqHeaders: Record<string, string>,
    reqBody: Record<string, unknown>,
    body: unknown,
    signal: AbortSignal | null | undefined
  ): Promise<{ upstream: Response } | { errorResult: ReturnType<typeof makeErrorResult> }> {
    let upstream: Response;
    try {
      upstream = await fetch(CHAT_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal,
      });
    } catch (err) {
      return {
        errorResult: makeErrorResult(
          502,
          `Z.ai fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
          body,
          CHAT_URL
        ),
      };
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return {
        errorResult: makeErrorResult(
          upstream.status,
          `Z.ai error: ${sanitizeErrorMessage(errText)}`,
          body,
          CHAT_URL
        ),
      };
    }
    return { upstream };
  }

  private makeChunkEmitter(id: string, created: number, modelId: string): ChunkEmitter {
    return (controller, delta, finish = null) => {
      const chunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model: modelId,
        choices: [{ index: 0, delta, finish_reason: finish }],
      };
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
    };
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const rawCookie = normalizeCookie(String(credentials?.apiKey ?? "").trim());
    const token = extractZaiToken(rawCookie);
    if (!rawCookie && !token) {
      return makeErrorResult(
        400,
        "Missing Z.ai session — paste the full Cookie header from chat.z.ai (must contain token=<JWT>).",
        body,
        CHAT_URL
      );
    }

    const messages = (bodyObj.messages as Array<{ role: string; content: unknown }>) || [];
    const modelId = (bodyObj.model as string) || "glm-4.6";
    const reqBody = this.buildRequestBody(messages, modelId);
    const reqHeaders = this.buildZaiHeaders(rawCookie, token);

    const fetched = await this.fetchUpstream(reqHeaders, reqBody, body, signal);
    if ("errorResult" in fetched) return fetched.errorResult;
    const { upstream } = fetched;

    const id = `chatcmpl-zai-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);
    const sourceBody = upstream.body ?? new ReadableStream({ start: (c) => c.close() });
    const emitChunk = this.makeChunkEmitter(id, created, modelId);

    if (wantStream) {
      const outStream = this.buildStreamingBody(sourceBody, modelId, emitChunk, signal);
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
        transformedBody: reqBody,
      };
    }

    const { answer, reasoning } = await this.collectNonStreaming(sourceBody);
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
      transformedBody: reqBody,
    };
  }
}
