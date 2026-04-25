import { randomUUID } from "node:crypto";

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

type JsonRecord = Record<string, unknown>;
type OpenAIMessage = {
  role?: string;
  content?: unknown;
};

type NlpCloudHistoryEntry = {
  input: string;
  response: string;
};

const DEFAULT_MODEL = "chatdolphin";
const DEFAULT_BASE_URL = "https://api.nlpcloud.io/v1/gpu";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const item = part as Record<string, unknown>;
      if (item.type === "text" && typeof item.text === "string") {
        return item.text;
      }
      if (item.type === "input_text" && typeof item.text === "string") {
        return item.text;
      }
      return "";
    })
    .filter((text) => text.trim().length > 0)
    .join("\n")
    .trim();
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  const normalized = String(baseUrl || DEFAULT_BASE_URL)
    .trim()
    .replace(/\/+$/, "");

  if (normalized.endsWith("/chatbot")) {
    return normalized.replace(/\/[^/]+\/chatbot$/, "");
  }
  if (normalized.endsWith("/v1/gpu")) {
    return normalized;
  }
  if (normalized.endsWith("/v1")) {
    return `${normalized}/gpu`;
  }
  return normalized;
}

function resolvePrompt(messages: OpenAIMessage[] | undefined): {
  input: string;
  context: string | null;
  history: NlpCloudHistoryEntry[];
} {
  if (!Array.isArray(messages)) {
    return { input: "", context: null, history: [] };
  }

  const systemParts: string[] = [];
  const chatParts: Array<{ role: string; text: string }> = [];

  for (const message of messages) {
    const role = String(message?.role || "user").toLowerCase();
    const text = extractTextContent(message?.content);
    if (!text) continue;

    if (role === "system" || role === "developer") {
      systemParts.push(text);
      continue;
    }

    if (role === "user" || role === "assistant") {
      chatParts.push({ role, text });
    }
  }

  const lastUserIndex = [...chatParts].map((part) => part.role).lastIndexOf("user");
  if (lastUserIndex === -1) {
    return {
      input: "",
      context: systemParts.length > 0 ? systemParts.join("\n\n") : null,
      history: [],
    };
  }

  const history: NlpCloudHistoryEntry[] = [];
  let pendingUser: string | null = null;

  for (let index = 0; index < lastUserIndex; index += 1) {
    const part = chatParts[index];
    if (part.role === "user") {
      pendingUser = part.text;
      continue;
    }

    if (part.role === "assistant" && pendingUser) {
      history.push({ input: pendingUser, response: part.text });
      pendingUser = null;
    }
  }

  return {
    input: chatParts[lastUserIndex]?.text || "",
    context: systemParts.length > 0 ? systemParts.join("\n\n") : null,
    history,
  };
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function buildSseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function buildOpenAiJsonCompletion(
  content: string,
  model: string,
  id: string,
  created: number
): Response {
  const completionTokens = estimateTokens(content);

  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created,
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: completionTokens,
        completion_tokens: completionTokens,
        total_tokens: completionTokens * 2,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildSynthesizedStream(
  content: string,
  model: string,
  id: string,
  created: number
): Response {
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          buildSseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
          })
        )
      );

      if (content) {
        controller.enqueue(
          encoder.encode(
            buildSseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content }, finish_reason: null }],
            })
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          buildSseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          })
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function extractStreamDelta(data: string): string {
  const trimmed = data.trim();
  if (!trimmed || trimmed === "[DONE]") return "";

  if (trimmed.startsWith("{")) {
    try {
      const payload = asRecord(JSON.parse(trimmed));
      const response =
        typeof payload.response === "string"
          ? payload.response
          : typeof payload.content === "string"
            ? payload.content
            : typeof payload.token === "string"
              ? payload.token
              : "";
      return response.trim();
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

function toOpenAiError(status: number, message: string): Response {
  return new Response(
    JSON.stringify({
      error: {
        message,
        type:
          status === 401 || status === 403
            ? "authentication_error"
            : status === 429
              ? "rate_limit_error"
              : "api_error",
      },
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export class NlpCloudExecutor extends BaseExecutor {
  constructor() {
    super("nlpcloud", PROVIDERS.nlpcloud || { format: "openai" });
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    const baseUrl = normalizeBaseUrl(
      typeof credentials?.providerSpecificData?.baseUrl === "string"
        ? credentials.providerSpecificData.baseUrl
        : this.config.baseUrl
    );
    return `${baseUrl}/${encodeURIComponent(model || DEFAULT_MODEL)}/chatbot`;
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (key) {
      headers.Authorization = `Token ${key}`;
    }

    headers.Accept = stream ? "text/event-stream" : "application/json";
    return headers;
  }

  private buildRequestPayload(model: string, body: unknown, stream: boolean): JsonRecord | null {
    const payload = asRecord(body);
    const messages = Array.isArray(payload.messages) ? (payload.messages as OpenAIMessage[]) : [];
    const prompt = resolvePrompt(messages);

    if (!prompt.input) {
      return null;
    }

    return {
      input: prompt.input,
      ...(prompt.context ? { context: prompt.context } : {}),
      ...(prompt.history.length > 0 ? { history: prompt.history } : {}),
      ...(stream ? { stream: true } : {}),
      ...(typeof payload.temperature === "number" ? { temperature: payload.temperature } : {}),
      ...(typeof payload.top_p === "number" ? { top_p: payload.top_p } : {}),
      model,
    };
  }

  private async transformEventStreamToSse(response: Response, model: string): Promise<Response> {
    const upstream = response.body;
    if (!upstream) {
      return buildSynthesizedStream(
        "",
        model,
        `chatcmpl-nlpcloud-${randomUUID()}`,
        Math.floor(Date.now() / 1000)
      );
    }

    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const id = `chatcmpl-nlpcloud-${randomUUID()}`;
    const created = Math.floor(Date.now() / 1000);

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        controller.enqueue(
          encoder.encode(
            buildSseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
            })
          )
        );

        const reader = upstream.getReader();
        let buffer = "";
        let finished = false;

        const emitDelta = (content: string) => {
          if (!content) return;
          controller.enqueue(
            encoder.encode(
              buildSseChunk({
                id,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [{ index: 0, delta: { content }, finish_reason: null }],
              })
            )
          );
        };

        const finish = () => {
          if (finished) return;
          finished = true;
          controller.enqueue(
            encoder.encode(
              buildSseChunk({
                id,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
              })
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        };

        const processEvent = (eventText: string) => {
          const normalized = eventText.replace(/\r/g, "");
          const lines = normalized.split("\n");
          const dataParts: string[] = [];

          for (const line of lines) {
            if (!line) continue;
            if (line.startsWith("data:")) {
              dataParts.push(line.slice(5).trimStart());
              continue;
            }
            if (line.startsWith("event:") || line.startsWith("id:") || line.startsWith(":")) {
              continue;
            }
            dataParts.push(line.trim());
          }

          const raw = dataParts.join("\n").trim();
          if (!raw) return;
          if (raw === "[DONE]") {
            finish();
            return;
          }
          emitDelta(extractStreamDelta(raw));
        };

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            buffer = buffer.replace(/\r\n/g, "\n");

            let separatorIndex = buffer.indexOf("\n\n");
            while (separatorIndex !== -1) {
              const eventText = buffer.slice(0, separatorIndex);
              buffer = buffer.slice(separatorIndex + 2);
              processEvent(eventText);
              separatorIndex = buffer.indexOf("\n\n");
            }
          }

          const tail = buffer.trim();
          if (tail) {
            processEvent(tail);
          }
          finish();
        } catch (error) {
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      },
    });

    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const resolvedModel = model || DEFAULT_MODEL;
    const payload = this.buildRequestPayload(resolvedModel, body, stream);
    const url = this.buildUrl(resolvedModel, stream, 0, credentials);
    const headers = this.buildHeaders(credentials, stream);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    if (!payload) {
      return {
        response: toOpenAiError(400, "NLP Cloud requests require at least one user message."),
        url,
        headers,
        transformedBody: body,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          response: toOpenAiError(
            response.status,
            `NLP Cloud API failed with status ${response.status}: ${errorText || "Unknown error"}`
          ),
          url,
          headers,
          transformedBody: payload,
        };
      }

      if (stream) {
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.includes("application/json")) {
          const json = asRecord(await response.json());
          const content = typeof json.response === "string" ? json.response : "";
          return {
            response: buildSynthesizedStream(
              content,
              resolvedModel,
              `chatcmpl-nlpcloud-${randomUUID()}`,
              Math.floor(Date.now() / 1000)
            ),
            url,
            headers,
            transformedBody: payload,
          };
        }

        return {
          response: await this.transformEventStreamToSse(response, resolvedModel),
          url,
          headers,
          transformedBody: payload,
        };
      }

      const json = asRecord(await response.json());
      const content = typeof json.response === "string" ? json.response : "";

      return {
        response: buildOpenAiJsonCompletion(
          content,
          resolvedModel,
          `chatcmpl-nlpcloud-${randomUUID()}`,
          Math.floor(Date.now() / 1000)
        ),
        url,
        headers,
        transformedBody: payload,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error || "Unknown error");
      return {
        response: toOpenAiError(502, `NLP Cloud fetch error: ${message}`),
        url,
        headers,
        transformedBody: payload,
      };
    }
  }
}

export default NlpCloudExecutor;
