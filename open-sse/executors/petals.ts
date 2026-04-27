import { randomUUID } from "node:crypto";

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import {
  PETALS_DEFAULT_BASE_URL,
  PETALS_DEFAULT_MODEL,
  normalizePetalsBaseUrl,
} from "../config/petals.ts";
import { PROVIDERS } from "../config/constants.ts";

type JsonRecord = Record<string, unknown>;
type OpenAIMessage = {
  role?: string;
  content?: unknown;
};

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

function resolvePrompt(body: unknown): string {
  const payload = asRecord(body);

  const directPrompt = extractTextContent(payload.prompt);
  if (directPrompt) {
    return directPrompt;
  }

  const directInput = extractTextContent(payload.input);
  if (directInput) {
    return directInput;
  }

  const messages = Array.isArray(payload.messages) ? (payload.messages as OpenAIMessage[]) : [];
  if (messages.length === 0) return "";

  const systemParts: string[] = [];
  const transcript: string[] = [];
  let lastRole = "";

  for (const message of messages) {
    const role = String(message?.role || "user").toLowerCase();
    const text = extractTextContent(message?.content);
    if (!text) continue;

    if (role === "system" || role === "developer") {
      systemParts.push(text);
      continue;
    }

    if (role === "assistant") {
      transcript.push(`Assistant: ${text}`);
      lastRole = "assistant";
      continue;
    }

    transcript.push(`User: ${text}`);
    lastRole = "user";
  }

  if (transcript.length === 0) {
    return systemParts.join("\n\n").trim();
  }

  const parts: string[] = [];
  if (systemParts.length > 0) {
    parts.push(`System:\n${systemParts.join("\n\n")}`);
  }
  parts.push(transcript.join("\n\n"));
  if (lastRole !== "assistant") {
    parts.push("Assistant:");
  }

  return parts.join("\n\n").trim();
}

function resolveMaxNewTokens(body: unknown): number {
  const payload = asRecord(body);
  const candidates = [
    payload.max_new_tokens,
    payload.max_completion_tokens,
    payload.max_output_tokens,
    payload.max_tokens,
  ];

  for (const value of candidates) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      return Math.max(1, Math.min(4096, Math.floor(value)));
    }
  }

  return 256;
}

function buildRequestPayload(model: string, body: unknown): URLSearchParams | null {
  const payload = asRecord(body);
  const prompt = resolvePrompt(payload);
  if (!prompt) return null;

  const form = new URLSearchParams();
  form.set("model", model || PETALS_DEFAULT_MODEL);
  form.set("inputs", prompt);
  form.set("max_new_tokens", String(resolveMaxNewTokens(payload)));

  const hasSampling =
    typeof payload.temperature === "number" ||
    typeof payload.top_k === "number" ||
    typeof payload.top_p === "number";

  if (hasSampling) {
    form.set("do_sample", "1");
  }

  if (typeof payload.temperature === "number") {
    form.set("temperature", String(payload.temperature));
  }
  if (typeof payload.top_k === "number") {
    form.set("top_k", String(Math.max(1, Math.floor(payload.top_k))));
  }
  if (typeof payload.top_p === "number") {
    form.set("top_p", String(payload.top_p));
  }
  if (typeof payload.repetition_penalty === "number") {
    form.set("repetition_penalty", String(payload.repetition_penalty));
  }

  return form;
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

export class PetalsExecutor extends BaseExecutor {
  constructor() {
    super("petals", PROVIDERS.petals || { format: "openai", baseUrl: PETALS_DEFAULT_BASE_URL });
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    const rawBaseUrl =
      typeof credentials?.providerSpecificData?.baseUrl === "string"
        ? credentials.providerSpecificData.baseUrl
        : this.config.baseUrl;
    return normalizePetalsBaseUrl(rawBaseUrl);
  }

  buildHeaders(credentials: ProviderCredentials | null): Record<string, string> {
    const token = credentials?.apiKey || credentials?.accessToken;
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const resolvedModel = model || PETALS_DEFAULT_MODEL;
    const payload = buildRequestPayload(resolvedModel, body);
    const url = this.buildUrl(resolvedModel, stream, 0, credentials);
    const headers = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    if (!payload) {
      return {
        response: toOpenAiError(400, "Petals requests require at least one user prompt."),
        url,
        headers,
        transformedBody: body,
      };
    }

    const transformedBody = Object.fromEntries(payload.entries());

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: payload.toString(),
        signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          response: toOpenAiError(
            response.status,
            `Petals API failed with status ${response.status}: ${errorText || "Unknown error"}`
          ),
          url,
          headers,
          transformedBody,
        };
      }

      const json = asRecord(await response.json());
      if (json.ok === false) {
        const traceback =
          typeof json.traceback === "string" && json.traceback.trim()
            ? json.traceback.trim()
            : "Unknown Petals upstream error";
        return {
          response: toOpenAiError(502, `Petals API error: ${traceback}`),
          url,
          headers,
          transformedBody,
        };
      }

      const content = typeof json.outputs === "string" ? json.outputs : "";
      const id = `chatcmpl-petals-${randomUUID()}`;
      const created = Math.floor(Date.now() / 1000);

      return {
        response: stream
          ? buildSynthesizedStream(content, resolvedModel, id, created)
          : buildOpenAiJsonCompletion(content, resolvedModel, id, created),
        url,
        headers,
        transformedBody,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error || "Unknown error");
      return {
        response: toOpenAiError(502, `Petals fetch error: ${message}`),
        url,
        headers,
        transformedBody,
      };
    }
  }
}

export default PetalsExecutor;
