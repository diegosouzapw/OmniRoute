import { randomUUID } from "node:crypto";

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody } from "../utils/error.ts";

type JsonRecord = Record<string, unknown>;
type OpenAIMessage = {
  role?: string;
  content?: unknown;
};

const CHAT_URL = "https://api.1min.ai/api/chat-with-ai";
const MAX_STREAM_ERROR_DATA_CHARS = 64 * 1024;
const STREAM_ERROR_FALLBACK = "1min.ai upstream stream failed";
const ROLE_LABELS: Record<string, string> = {
  system: "System",
  developer: "System",
  user: "User",
  assistant: "Assistant",
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const item = part as Record<string, unknown>;
      return item.type === "text" && typeof item.text === "string" ? item.text : "";
    })
    .filter((text) => text.length > 0)
    .join("\n");
}

/**
 * 1min.ai's Chat with AI API takes one `promptObject.prompt` string, not an
 * OpenAI `messages` array — multi-turn context is normally carried server-side
 * via `promptObject.conversationId` (see docs.1min.ai/docs/api/chat-with-ai-api),
 * which requires a prior POST /api/conversations call and a stable conversation
 * identity that stateless OpenAI-compatible clients don't provide. Rather than
 * half-implement that, a single user message passes through unchanged and
 * multi-turn history is flattened into a labeled transcript.
 */
export function buildPrompt(messages: OpenAIMessage[] | undefined): string {
  const list = Array.isArray(messages) ? messages : [];
  if (list.length === 1 && list[0]?.role === "user") {
    return extractTextContent(list[0].content);
  }
  return list
    .map((message) => {
      const role = String(message?.role || "user").toLowerCase();
      const text = extractTextContent(message?.content);
      const label = ROLE_LABELS[role] || role;
      return `${label}: ${text}`;
    })
    .filter((line) => line.length > 0)
    .join("\n\n");
}

function buildSseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function parseStreamErrorMessage(data: string): string {
  if (!data || data.length > MAX_STREAM_ERROR_DATA_CHARS) return STREAM_ERROR_FALLBACK;

  try {
    const parsed = asRecord(JSON.parse(data));
    const directMessage = typeof parsed.message === "string" ? parsed.message.trim() : "";
    if (directMessage) return directMessage;

    if (typeof parsed.error === "string") {
      const errorMessage = parsed.error.trim();
      if (errorMessage) return errorMessage;
    }

    const nestedError = asRecord(parsed.error);
    const nestedMessage = typeof nestedError.message === "string" ? nestedError.message.trim() : "";
    if (nestedMessage) return nestedMessage;
  } catch {
    // Malformed and over-complex payloads use the fixed public fallback below.
  }

  return STREAM_ERROR_FALLBACK;
}

function buildOpenAiJsonCompletion(
  content: string,
  model: string,
  id: string,
  created: number
): Response {
  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created,
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      // 1min.ai's response shape carries no token-usage fields.
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function toOpenAiErrorResponse(
  status: number,
  message: string,
  upstreamDetails?: unknown
): Response {
  return new Response(JSON.stringify(buildErrorBody(status, message, upstreamDetails)), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Parse 1min.ai's real Server-Sent Events (event: content|result|done|error,
 * data: {...}) from the upstream Response body and re-emit them as standard
 * OpenAI chat.completion.chunk SSE.
 */
function translateSseStream(
  upstreamBody: ReadableStream<Uint8Array>,
  model: string,
  id: string,
  created: number
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstreamBody.getReader();
  const pendingChunks: Uint8Array[] = [];
  let buffer = "";
  let finished = false;
  let roleEmitted = false;
  let terminalError: Error | null = null;
  let upstreamCancelRequested = false;
  let downstreamCancelled = false;
  let readInFlight = false;
  let readerReleased = false;

  const releaseReader = () => {
    if (readerReleased) return;
    readerReleased = true;
    reader.releaseLock();
  };

  const cancelUpstream = (reason: unknown) => {
    if (upstreamCancelRequested) return;
    upstreamCancelRequested = true;
    try {
      // Upstream cleanup is provider-controlled and may never settle. The
      // translated stream owns the reader lock and releases it independently.
      void reader.cancel(reason).catch(() => {});
    } catch {
      // Cancellation is cleanup-only; the terminal state is already fixed.
    }
  };

  const queueChunk = (text: string) => {
    pendingChunks.push(encoder.encode(text));
  };

  const emitRole = () => {
    if (roleEmitted) return;
    roleEmitted = true;
    queueChunk(
      buildSseChunk({
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
      })
    );
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    queueChunk(
      buildSseChunk({
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })
    );
    queueChunk("data: [DONE]\n\n");
  };

  const emitContent = (text: string) => {
    if (!text) return;
    emitRole();
    queueChunk(
      buildSseChunk({
        id,
        object: "chat.completion.chunk",
        created,
        model,
        choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
      })
    );
  };

  const emitError = (data: string) => {
    if (finished) return;
    finished = true;
    cancelUpstream("1min.ai upstream stream error");

    if (!roleEmitted) {
      const message = parseStreamErrorMessage(data);
      queueChunk(buildSseChunk(buildErrorBody(502, message)));
      queueChunk("data: [DONE]\n\n");
      return;
    }

    // A bare `{ error }` frame is dropped by the OpenAI passthrough sanitizer.
    // Preserve every content delta already queued, then error the source with
    // a fixed public message. pipeWithDisconnect() converts it into a native
    // terminal error frame and drives usage, call-log, and fallback finalizers.
    terminalError = Object.assign(new Error(STREAM_ERROR_FALLBACK), {
      statusCode: 502,
    });
  };

  // SSE event framing: "event:"/"data:" lines, blank-line separated records.
  const processEvent = (eventText: string) => {
    let eventType = "message";
    const dataLines: string[] = [];
    for (const rawLine of eventText.split("\n")) {
      if (rawLine.startsWith("event:")) {
        eventType = rawLine.slice(6).trim();
      } else if (rawLine.startsWith("data:")) {
        dataLines.push(rawLine.slice(5).trim());
      }
    }
    const data = dataLines.join("\n");
    if (eventType === "content") {
      try {
        const parsed = asRecord(JSON.parse(data));
        if (typeof parsed.content === "string") emitContent(parsed.content);
      } catch {
        // Ignore malformed content events rather than surfacing partial JSON.
      }
    } else if (eventType === "error") {
      emitError(data);
    } else if (eventType === "done") {
      finish();
    }
    // "result" carries the final full aiRecord, redundant with the content
    // events already streamed — intentionally ignored.
  };

  const processBufferedEvents = () => {
    let separatorIndex = buffer.indexOf("\n\n");
    while (separatorIndex !== -1 && !finished) {
      processEvent(buffer.slice(0, separatorIndex));
      buffer = buffer.slice(separatorIndex + 2);
      separatorIndex = buffer.indexOf("\n\n");
    }
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (downstreamCancelled) return;

      if (pendingChunks.length > 0) {
        controller.enqueue(pendingChunks.shift()!);
        return;
      }

      if (terminalError) {
        releaseReader();
        controller.error(terminalError);
        return;
      }

      if (finished) {
        releaseReader();
        controller.close();
        return;
      }

      readInFlight = true;
      try {
        while (pendingChunks.length === 0 && !finished && !downstreamCancelled) {
          const { done, value } = await reader.read();
          if (downstreamCancelled) return;
          if (done) {
            buffer += decoder.decode();
            if (buffer.trim()) processEvent(buffer);
            finish();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          // Process the complete upstream chunk, even after it queues output.
          // One network read may contain multiple content events followed by
          // an error; the internal queue preserves all of them in order.
          processBufferedEvents();
        }

        if (downstreamCancelled) return;
        if (pendingChunks.length > 0) {
          controller.enqueue(pendingChunks.shift()!);
        } else if (terminalError) {
          releaseReader();
          controller.error(terminalError);
        } else if (finished) {
          releaseReader();
          controller.close();
        }
      } catch (error) {
        releaseReader();
        if (!downstreamCancelled) controller.error(error);
      } finally {
        readInFlight = false;
        if (downstreamCancelled) releaseReader();
      }
    },
    cancel(reason) {
      downstreamCancelled = true;
      pendingChunks.length = 0;
      // A client disconnect must release the upstream reader even when its
      // next pull never settles. Do not await provider cleanup here: the
      // downstream cancellation contract must remain bounded.
      cancelUpstream(reason ?? "1min.ai downstream cancelled");
      if (!readInFlight) releaseReader();
    },
  });
}

export class OneMinAiExecutor extends BaseExecutor {
  constructor() {
    super("oneminai", PROVIDERS["oneminai"] || { format: "openai", baseUrl: CHAT_URL });
  }

  buildUrl(_model: string, stream: boolean): string {
    return stream ? `${CHAT_URL}?isStreaming=true` : CHAT_URL;
  }

  buildHeaders(credentials: ProviderCredentials | null): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken || "";
    return {
      "Content-Type": "application/json",
      "API-KEY": key,
    };
  }

  transformRequest(model: string, body: unknown): JsonRecord {
    const payload = asRecord(body);
    const messages = Array.isArray(payload.messages) ? (payload.messages as OpenAIMessage[]) : [];
    return {
      type: "UNIFY_CHAT_WITH_AI",
      model,
      promptObject: { prompt: buildPrompt(messages) },
    };
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const url = this.buildUrl(model, stream);
    const headers = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
    const payload = this.transformRequest(model, body);

    const id = `chatcmpl-oneminai-${randomUUID()}`;
    const created = Math.floor(Date.now() / 1000);

    try {
      this.assertOutboundUrlAllowed(url);
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let message = `1min.ai API failed with status ${response.status}`;
        try {
          const parsed = asRecord(JSON.parse(errorText));
          const err = asRecord(parsed.error);
          if (typeof err.message === "string") message = err.message;
        } catch {
          if (errorText) message = errorText;
        }
        return {
          response: toOpenAiErrorResponse(response.status, message),
          url,
          headers,
          transformedBody: payload,
        };
      }

      if (stream) {
        if (!response.body) {
          return {
            response: toOpenAiErrorResponse(502, "1min.ai returned an empty stream"),
            url,
            headers,
            transformedBody: payload,
          };
        }
        return {
          response: new Response(translateSseStream(response.body, model, id, created), {
            status: 200,
            headers: { "Content-Type": "text/event-stream" },
          }),
          url,
          headers,
          transformedBody: payload,
        };
      }

      const json = asRecord(await response.json());
      const aiRecord = asRecord(json.aiRecord);
      const detail = asRecord(aiRecord.aiRecordDetail);
      const resultObject = Array.isArray(detail.resultObject) ? detail.resultObject : [];
      const content = resultObject
        .filter((part): part is string => typeof part === "string")
        .join("");

      return {
        response: buildOpenAiJsonCompletion(content, model, id, created),
        url,
        headers,
        transformedBody: payload,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error || "Unknown error");
      return {
        response: toOpenAiErrorResponse(502, `1min.ai fetch error: ${message}`),
        url,
        headers,
        transformedBody: payload,
      };
    }
  }
}

export default OneMinAiExecutor;
