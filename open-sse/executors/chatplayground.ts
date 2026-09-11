/**
 * ChatPlaygroundExecutor — ChatPlayground Web Provider
 *
 * Routes chat requests through app.chatplayground.ai's API using auto-minted
 * short-lived Clerk session JWTs or direct Clerk Bearer tokens.
 *
 * Endpoints:
 *   - azure: GPT, Claude, Gemini, DeepSeek, Mistral
 *   - lmsys: Kimi, Llama, Qwen, Grok, MiniMax, GLM
 *   - perplexity: Sonar / Perplexity search models
 */

import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput, type ExecutorExecuteResult } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, sanitizeErrorMessage } from "../utils/error.ts";
import { resolveChatPlaygroundAuth } from "../services/chatplaygroundAuth.ts";
import {
  CHATPLAYGROUND_API_BASE,
  resolveChatPlaygroundModel,
  type ChatPlaygroundModel,
} from "../services/chatplaygroundModels.ts";

export const CHATPLAYGROUND_MAX_MESSAGE_CHARS = 15_000;

/**
 * Strip CHAT_ID sentinel tokens from response text.
 * By default, leaves token-level leading/trailing whitespace intact to avoid
 * corrupting streaming chunk formatting unless trim is explicitly requested.
 */
export function stripChatId(text: string, trim = false): string {
  if (!text) return "";
  const cleaned = text
    .replace(/^CHAT_ID:[a-zA-Z0-9_-]+\s*/g, "")
    .replace(/\s*CHAT_ID:[a-zA-Z0-9_-]+\s*$/g, "")
    .replace(/CHAT_ID:[a-zA-Z0-9_-]+/g, "");
  return trim ? cleaned.trim() : cleaned;
}

/**
 * Enqueue the final SSE chunk and [DONE] termination marker.
 */
export function enqueueSseCompletion(
  controller:
    | TransformStreamDefaultController<Uint8Array>
    | ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  streamId: string,
  created: number,
  model: string
): void {
  const finalChunk = {
    id: `chatcmpl-${streamId}`,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  };
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalChunk)}\n\n`));
  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
}

/**
 * Build the JSON request payload for ChatPlayground API.
 */
export function buildChatPlaygroundPayload(
  body: unknown,
  modelData: ChatPlaygroundModel
): Record<string, unknown> {
  const req = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const messages = Array.isArray(req.messages) ? req.messages : [];

  const payload: Record<string, unknown> = {
    messages,
    botId: modelData.id,
    chatId:
      typeof req.chatId === "string" && req.chatId
        ? req.chatId
        : randomUUID().replace(/-/g, "").slice(0, 24),
    stream: req.stream !== false,
    temperature: typeof req.temperature === "number" ? req.temperature : 0.7,
    isRegenerate: false,
    promptTemplate: null,
    fileUrl: null,
    submissionId: randomUUID().replace(/-/g, ""),
    noSave: true,
  };

  if (modelData.endpoint === "perplexity") {
    payload.modelName = modelData.modelName;
  } else {
    payload.model = modelData.modelName;
  }

  for (const key of ["max_tokens", "top_p", "presence_penalty", "frequency_penalty", "stop"] as const) {
    if (key in req && req[key] !== undefined && req[key] !== null) {
      payload[key] = req[key];
    }
  }

  return payload;
}

/**
 * Build standard OpenAI chat.completion JSON response envelope.
 */
export function toOpenAiCompletionEnvelope(model: string, content: string): Response {
  return new Response(
    JSON.stringify({
      id: `chatcmpl-${randomUUID().slice(0, 12)}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    }),
    { headers: { "content-type": "application/json" } }
  );
}

export class ChatPlaygroundExecutor extends BaseExecutor {
  constructor(providerName = "chatplayground") {
    super(providerName, {
      baseUrl: `${CHATPLAYGROUND_API_BASE}/chat`,
      timeoutMs: 300_000,
    });
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const { model, body, stream, credentials, signal } = input;

    // resolveChatPlaygroundModel returns null for empty or invalid model strings
    const modelData = resolveChatPlaygroundModel(model);
    if (!modelData) {
      return makeErrorResult(
        400,
        `ChatPlayground model not found or invalid: "${model || ""}"`,
        body,
        `${CHATPLAYGROUND_API_BASE}/chat`
      );
    }

    let authHeaders: Record<string, string>;
    try {
      const auth = await resolveChatPlaygroundAuth(credentials);
      authHeaders = auth.headers;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return makeErrorResult(
        401,
        sanitizeErrorMessage(msg),
        body,
        `${CHATPLAYGROUND_API_BASE}/chat`
      );
    }

    const endpointUrl = `${CHATPLAYGROUND_API_BASE}/chat/${modelData.endpoint}`;
    const payload = buildChatPlaygroundPayload(body, modelData);

    // Validate 15,000 character limit per message content
    const messages = Array.isArray(payload.messages)
      ? (payload.messages as Array<Record<string, unknown>>)
      : [];
    for (let i = 0; i < messages.length; i++) {
      const content = messages[i]?.content;
      let charCount = 0;
      if (typeof content === "string") {
        charCount = content.length;
      } else if (Array.isArray(content)) {
        for (const part of content) {
          if (typeof part === "string") {
            charCount += part.length;
          } else if (
            part &&
            typeof part === "object" &&
            typeof (part as { text?: unknown }).text === "string"
          ) {
            charCount += ((part as { text: string }).text).length;
          }
        }
      }
      if (charCount > CHATPLAYGROUND_MAX_MESSAGE_CHARS) {
        return makeErrorResult(
          400,
          `Message at index ${i} exceeds ChatPlayground's ${CHATPLAYGROUND_MAX_MESSAGE_CHARS}-character limit (got ${charCount} characters). Enable prompt compression or reduce message length.`,
          payload,
          endpointUrl
        );
      }
    }

    let response: Response;
    try {
      response = await fetch(endpointUrl, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(payload),
        signal,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return makeErrorResult(
        502,
        `ChatPlayground connection failed: ${sanitizeErrorMessage(msg)}`,
        payload,
        endpointUrl
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      return makeErrorResult(
        response.status,
        `ChatPlayground API error (${response.status}): ${sanitizeErrorMessage(errorText)}`,
        payload,
        endpointUrl
      );
    }

    const isStreaming = stream !== false;

    // Perplexity endpoint returns complete response; synthesize stream if requested
    if (modelData.endpoint === "perplexity") {
      const rawText = await response.text();
      const content = stripChatId(rawText, true);

      if (!isStreaming) {
        return toOpenAiCompletionEnvelope(model, content);
      }

      const streamId = randomUUID().slice(0, 12);
      const created = Math.floor(Date.now() / 1000);
      const encoder = new TextEncoder();

      const singleChunkStream = new ReadableStream({
        start(controller) {
          if (content) {
            const chunk = {
              id: `chatcmpl-${streamId}`,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content }, finish_reason: null }],
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
          }
          enqueueSseCompletion(controller, encoder, streamId, created, model);
          controller.close();
        },
      });

      return new Response(singleChunkStream, {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }

    // Streaming for Azure / LMSYS endpoints
    if (isStreaming && response.body) {
      const streamId = randomUUID().slice(0, 12);
      const created = Math.floor(Date.now() / 1000);
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let pendingBuffer = "";

      const transformStream = new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
          const text = decoder.decode(chunk, { stream: true });
          const combined = pendingBuffer + text;
          pendingBuffer = "";

          // Check if there is a partial sentinel at the end of combined
          const partialMatch = combined.match(/(?:CHAT_ID:[a-zA-Z0-9_-]*|CHAT_?I?D?:?|CHA?T?_?)$/);
          let toProcess = combined;
          if (partialMatch && partialMatch[0].length < 64) {
            toProcess = combined.slice(0, combined.length - partialMatch[0].length);
            pendingBuffer = partialMatch[0];
          }

          const cleaned = stripChatId(toProcess, false);
          if (cleaned.length > 0) {
            const chunkObj = {
              id: `chatcmpl-${streamId}`,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: { content: cleaned },
                  finish_reason: null,
                },
              ],
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunkObj)}\n\n`));
          }
        },
        flush(controller) {
          if (pendingBuffer.length > 0) {
            const cleaned = stripChatId(pendingBuffer, false);
            if (cleaned.length > 0) {
              const chunkObj = {
                id: `chatcmpl-${streamId}`,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [
                  {
                    index: 0,
                    delta: { content: cleaned },
                    finish_reason: null,
                  },
                ],
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunkObj)}\n\n`));
            }
          }
          enqueueSseCompletion(controller, encoder, streamId, created, model);
        },
      });

      return new Response(response.body.pipeThrough(transformStream), {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }

    // Non-streaming response
    const rawText = await response.text();
    const content = stripChatId(rawText, true);
    return toOpenAiCompletionEnvelope(model, content);
  }
}

export const chatplaygroundExecutor = new ChatPlaygroundExecutor();
