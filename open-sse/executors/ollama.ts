/**
 * OllamaExecutor — native /api/chat path for the local Ollama provider.
 *
 * Why not the OpenAI-compatible /v1/chat/completions endpoint?
 *   - It IGNORES `options.num_ctx` in the request body: every model loads at the
 *     global OLLAMA_CONTEXT_LENGTH (Ollama Desktop → Settings → Context Length),
 *     capped only by the model's own GGUF context_length. On a 24GB box that lets
 *     mistral-nemo allocate a ~40GB KV cache at load time (swap/OOM), while small
 *     models that COULD run at 128k are stuck at whatever the global is.
 *   - The native /api/chat endpoint honors per-request `options.num_ctx`
 *     (verified empirically: a model requested with num_ctx=8192 loads at 8192
 *     even with OLLAMA_CONTEXT_LENGTH=262144).
 *
 * This executor sends a memory-aware `num_ctx` per model (from the ollama-local
 * registry contextLength) so:
 *   - small models (qwen2.5vl:7b, llama3.1) get a real 128k window,
 *   - KV-hogs (mistral-nemo, phi3.5, north-mini-code) are capped to fit the box,
 *   - opencode sees the true per-model limit via /v1/models and compacts correctly.
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

const OLLAMA_HOST = process.env.OMNIROUTE_OLLAMA_HOST?.trim() || "http://localhost:11434";

/** Sentinel used by the combo/router when it needs a per-model KV budget. */
export const OLLAMA_DEFAULT_NUM_CTX = 32768;

/**
 * Normalize any user-supplied base URL to the ollama ROOT host. Provider
 * connections store the OpenAI-compatible base (e.g. http://host:11434/v1 or
 * .../v1/chat/completions); the native /api/chat path hangs off the root.
 */
export function normalizeOllamaBaseUrl(base: string): string {
  let out = (base || "").trim().replace(/\/+$/, "");
  out = out.replace(/\/chat\/completions$/i, "").replace(/\/chat$/i, "");
  out = out.replace(/\/api$/i, "");
  out = out.replace(/\/v1$/i, "");
  return out.replace(/\/+$/, "");
}

/** Strip the "provider/model" prefix the combo router prepends, if present. */
export function stripOllamaProviderPrefix(model: string): string {
  if (!model) return model;
  const slash = model.indexOf("/");
  if (slash > 0) {
    const prefix = model.slice(0, slash);
    if (prefix === "ollama-local" || prefix === "ollama") {
      return model.slice(slash + 1);
    }
  }
  return model;
}

/**
 * Memory-aware num_ctx for a model. Source of truth is the ollama-local registry
 * model contextLength (per-model, tuned for 24GB unified memory); falls back to
 * the registry default. Exported for unit tests.
 */
export function resolveOllamaNumCtx(model: string): number {
  const clean = stripOllamaProviderPrefix(model);
  const entry = getRegistryEntry("ollama-local");
  const modelEntry = entry?.models?.find((m) => m.id === clean);
  const ctx = modelEntry?.contextLength ?? entry?.defaultContextLength;
  if (typeof ctx !== "number" || !Number.isFinite(ctx) || ctx <= 0) {
    return OLLAMA_DEFAULT_NUM_CTX;
  }
  return Math.floor(ctx);
}

type OllamaToolCall = {
  function?: { name?: string; arguments?: unknown };
};

type OllamaMessage = {
  role?: string;
  content?: unknown;
  tool_calls?: OllamaToolCall[];
  images?: string[];
};

type OllamaChunk = {
  model?: string;
  message?: OllamaMessage;
  done?: boolean;
  done_reason?: string;
  error?: string;
  prompt_eval_count?: number;
  eval_count?: number;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function cleanModel(model: string): string {
  return stripOllamaProviderPrefix(model);
}

function mapFinishReason(doneReason: string | undefined, hasToolCalls: boolean): string {
  if (hasToolCalls) return "tool_calls";
  if (doneReason === "length" || doneReason === "context_length") return "length";
  if (doneReason === "stop" || doneReason === "tool_calls") return "stop";
  return doneReason || "stop";
}

/** Convert OpenAI-style content parts into ollama message {content, images}. */
function mapContentToOllama(content: unknown): { content: string; images?: string[] } {
  const images: string[] = [];
  if (typeof content === "string") return { content };
  if (Array.isArray(content)) {
    let text = "";
    for (const part of content) {
      if (!isRecord(part)) continue;
      if (part.type === "text" && typeof part.text === "string") {
        text += part.text;
      } else if (part.type === "image_url" && isRecord(part.image_url)) {
        const url = typeof part.image_url.url === "string" ? part.image_url.url : "";
        const m = /^data:image\/[a-z0-9.+-]+;base64,([A-Za-z0-9+/=]+)$/.exec(url);
        if (m) images.push(m[1]);
      } else if (part.type === "image" && typeof part.image === "string") {
        images.push(part.image);
      }
    }
    return { content: text, images: images.length > 0 ? images : undefined };
  }
  return { content: "" };
}

/**
 * Convert OpenAI-format assistant tool_calls into the shape ollama's /api/chat
 * parser accepts. OpenAI carries `arguments` as a JSON string; ollama REQUIRES
 * a parsed object and 400s ("Value looks like object, but can't find closing
 * '}' symbol") when given a string. `id`/`type` keys are tolerated by ollama
 * and left intact.
 */
export function mapToolCallsToOllama(toolCalls: unknown): unknown {
  if (!Array.isArray(toolCalls)) return toolCalls;
  return toolCalls.map((tc) => {
    if (!isRecord(tc)) return tc;
    const fn = isRecord(tc.function) ? { ...tc.function } : tc.function;
    if (isRecord(fn) && typeof fn.arguments === "string") {
      const raw = fn.arguments.trim();
      if (raw) {
        try {
          fn.arguments = JSON.parse(raw);
        } catch {
          fn.arguments = {};
        }
      } else {
        fn.arguments = {};
      }
    }
    return { ...tc, function: fn };
  });
}

/**
 * Convert an OpenAI-shaped chat body into ollama native /api/chat shape,
 * injecting the memory-aware per-model num_ctx.
 */
export function transformOpenAIToOllama(
  model: string,
  body: Record<string, unknown>
): Record<string, unknown> {
  const options: Record<string, unknown> = { num_ctx: resolveOllamaNumCtx(model) };
  if (typeof body.max_tokens === "number") options.num_predict = body.max_tokens;
  if (typeof body.temperature === "number") options.temperature = body.temperature;
  if (typeof body.top_p === "number") options.top_p = body.top_p;
  if (body.seed !== undefined) options.seed = body.seed;
  if (body.stop !== undefined) options.stop = body.stop;

  const ollamaBody: Record<string, unknown> = {
    model: cleanModel(model),
    messages: Array.isArray(body.messages)
      ? body.messages.map((m) => {
          const msg = isRecord(m) ? m : {};
          const { content, images } = mapContentToOllama(msg.content);
          const out: Record<string, unknown> = { role: msg.role ?? "user", content };
          if (msg.tool_calls !== undefined) out.tool_calls = mapToolCallsToOllama(msg.tool_calls);
          if (images) out.images = images;
          return out;
        })
      : [],
    stream: true,
    options,
  };

  if (Array.isArray(body.tools) && body.tools.length > 0) {
    ollamaBody.tools = body.tools;
  }

  if (isRecord(body.response_format)) {
    const type = body.response_format.type;
    if (type === "json_object") ollamaBody.format = "json";
    else if (type === "json_schema" && isRecord(body.response_format.json_schema)) {
      ollamaBody.format = body.response_format.json_schema;
    }
  }

  // Keep the model resident briefly so back-to-back turns in the same combo don't
  // pay a reload; the ollamaRamManager unloads the PREVIOUS model pre-dispatch.
  ollamaBody.keep_alive = "5m";

  return ollamaBody;
}

function baseChunk(model: string) {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
  };
}

function enqueueSse(
  controller: ReadableStreamDefaultController<Uint8Array>,
  chunk: Record<string, unknown>
) {
  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
}

function emitStopAndDone(controller: ReadableStreamDefaultController<Uint8Array>, model: string) {
  enqueueSse(controller, {
    ...baseChunk(model),
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  });
  controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
  controller.close();
}

/** Convert ollama native tool_calls into OpenAI stream delta.tool_calls. */
function mapToolCallsForDelta(
  toolCalls: OllamaToolCall[] | undefined
): Array<Record<string, unknown>> | undefined {
  if (!Array.isArray(toolCalls) || toolCalls.length === 0) return undefined;
  return toolCalls.map((tc, index) => ({
    index,
    id: `call_${Date.now()}_${index}`,
    type: "function",
    function: {
      name: tc.function?.name ?? "",
      arguments:
        tc.function?.arguments !== undefined
          ? typeof tc.function.arguments === "string"
            ? tc.function.arguments
            : JSON.stringify(tc.function.arguments)
          : "{}",
    },
  }));
}

/** Map ollama native tool_calls to OpenAI message.tool_calls (non-streaming). */
function mapToolCallsForMessage(
  toolCalls: OllamaToolCall[] | undefined
): Array<Record<string, unknown>> | undefined {
  if (!Array.isArray(toolCalls) || toolCalls.length === 0) return undefined;
  return toolCalls.map((tc, index) => ({
    id: `call_${Date.now()}_${index}`,
    type: "function",
    function: {
      name: tc.function?.name ?? "",
      arguments:
        tc.function?.arguments !== undefined
          ? typeof tc.function.arguments === "string"
            ? tc.function.arguments
            : JSON.stringify(tc.function.arguments)
          : "{}",
    },
  }));
}

function mapUsage(chunk: OllamaChunk): Record<string, unknown> | undefined {
  if (chunk.prompt_eval_count === undefined && chunk.eval_count === undefined) return undefined;
  return {
    prompt_tokens: chunk.prompt_eval_count ?? 0,
    completion_tokens: chunk.eval_count ?? 0,
    total_tokens: (chunk.prompt_eval_count ?? 0) + (chunk.eval_count ?? 0),
  };
}

/** Wrap an ollama NDJSON body stream as OpenAI chat.completion.chunk SSE. */
export function createOllamaStream(opts: {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  model: string;
  signal?: AbortSignal | null;
  log?: ExecutorLogLike;
}): ReadableStream<Uint8Array> {
  const { reader, model, signal, log } = opts;
  const decoder = new TextDecoder();
  let buffer = "";
  let pendingToolCalls = false;

  const onAbort = () => {
    void reader.cancel().catch(() => undefined);
  };
  if (signal) {
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
  }

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          if (signal?.aborted) {
            await reader.cancel().catch(() => undefined);
            controller.close();
            return;
          }
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            let chunk: OllamaChunk;
            try {
              chunk = JSON.parse(trimmed);
            } catch {
              continue;
            }
            if (chunk.error) {
              enqueueSse(controller, {
                ...baseChunk(model),
                choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
                error: { message: sanitizeErrorMessage(chunk.error) },
              });
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }
            const message = chunk.message;
            if (message?.content) {
              enqueueSse(controller, {
                ...baseChunk(model),
                choices: [{ index: 0, delta: { content: message.content }, finish_reason: null }],
              });
            }
            const toolDeltas = message ? mapToolCallsForDelta(message.tool_calls) : undefined;
            if (toolDeltas) {
              pendingToolCalls = true;
              enqueueSse(controller, {
                ...baseChunk(model),
                choices: [{ index: 0, delta: { tool_calls: toolDeltas }, finish_reason: null }],
              });
            }
            if (chunk.done) {
              enqueueSse(controller, {
                ...baseChunk(model),
                choices: [
                  {
                    index: 0,
                    delta: {},
                    finish_reason: mapFinishReason(chunk.done_reason, pendingToolCalls),
                  },
                ],
                ...(mapUsage(chunk) ? { usage: mapUsage(chunk) } : {}),
              });
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }
          }
        }
        emitStopAndDone(controller, model);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        log?.error?.("OLLAMA", `Streaming error: ${message}`);
        try {
          controller.error(error);
        } catch {
          controller.close();
        }
      } finally {
        if (signal) signal.removeEventListener("abort", onAbort);
      }
    },
    cancel() {
      void reader.cancel().catch(() => undefined);
      if (signal) signal.removeEventListener("abort", onAbort);
    },
  });
}

type ExecutorLogLike = {
  debug?: (tag: string, message: string) => void;
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
};

/** Build a non-streaming OpenAI chat.completion Response from the full ollama JSON. */
function buildNonStreamingResponse(text: string, model: string): Response {
  let chunk: OllamaChunk = {};
  try {
    chunk = JSON.parse(text);
  } catch {
    /* fall through to empty */
  }
  if (chunk.error) {
    return new Response(JSON.stringify({ error: { message: chunk.error, type: "api_error" } }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
  const message = chunk.message ?? {};
  const toolCalls = mapToolCallsForMessage(message.tool_calls);
  const content = typeof message.content === "string" ? message.content : "";
  return new Response(
    JSON.stringify({
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: {
            role: message.role ?? "assistant",
            content: content || null,
            ...(toolCalls ? { tool_calls: toolCalls } : {}),
          },
          finish_reason: mapFinishReason(chunk.done_reason, !!toolCalls),
        },
      ],
      ...(mapUsage(chunk) ? { usage: mapUsage(chunk) } : {}),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export class OllamaExecutor extends BaseExecutor {
  constructor() {
    super("ollama-local", { format: "openai", baseUrl: `${OLLAMA_HOST}/api/chat` });
  }

  buildUrl(_model: string, _stream: boolean, _urlIndex = 0, credentials = null): string {
    const psd = credentials?.providerSpecificData as Record<string, unknown> | undefined;
    const base = typeof psd?.baseUrl === "string" && psd.baseUrl.trim() ? psd.baseUrl : OLLAMA_HOST;
    return `${normalizeOllamaBaseUrl(base)}/api/chat`;
  }

  buildHeaders(_credentials: unknown, _stream = true): Record<string, string> {
    return { "Content-Type": "application/json" };
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: unknown
  ): Record<string, unknown> {
    const cleaned = super.transformRequest(model, body, stream, credentials);
    const record = isRecord(cleaned) ? cleaned : {};
    const transformed = transformOpenAIToOllama(model, record);
    transformed.stream = !!stream;
    return transformed;
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal, log, upstreamExtraHeaders } = input;
    const url = this.buildUrl(model, stream, 0, credentials);
    const headers = this.buildHeaders(credentials, stream);
    if (upstreamExtraHeaders) {
      for (const [k, v] of Object.entries(upstreamExtraHeaders)) {
        if (typeof v === "string") headers[k] = v;
      }
    }
    const transformedBody = this.transformRequest(model, body, stream, credentials);
    const bodyString = JSON.stringify(transformedBody);

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers,
        body: bodyString,
        signal: signal ?? undefined,
      });
    } catch (error) {
      log?.warn?.("OLLAMA", `Request to ${url} failed: ${sanitizeErrorMessage(error)}`);
      throw error;
    }

    if (!response.ok) {
      const errText = await response
        .clone()
        .text()
        .catch(() => "");
      log?.warn?.(
        "OLLAMA",
        `${url} returned ${response.status}: ${errText.slice(0, 300)} (num_ctx=${String((transformedBody as { options?: { num_ctx?: number } }).options?.num_ctx ?? "")})`
      );
      return { response, url, headers, transformedBody };
    }

    const outModel = cleanModel(model);
    if (stream && response.body) {
      const reader = response.body.getReader();
      const out = createOllamaStream({ reader, model: outModel, signal, log });
      return {
        response: new Response(out, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url,
        headers,
        transformedBody,
      };
    }

    const text = await response.text();
    return {
      response: buildNonStreamingResponse(text, outModel),
      url,
      headers,
      transformedBody,
    };
  }
}

export default OllamaExecutor;
