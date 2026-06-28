/**
 * HuggingChatExecutor — HuggingChat (huggingface.co/chat) Web Provider
 *
 * Routes chat requests through HuggingChat's SvelteKit-based API.
 * Requires a valid session cookie from huggingface.co/chat.
 *
 * API flow:
 *   1. POST /chat/conversation  { model } -> { conversationId }
 *   2. POST /chat/conversation/{id}  (multipart: data = JSON{inputs}, optional files)
 *      -> JSONL stream of MessageUpdate objects
 *
 * Streaming format (JSONL, not SSE):
 *   - { type: "stream", token: "..." }        -- text tokens (padded to 16 chars with \0)
 *   - { type: "status", status: "started" }   -- generation started
 *   - { type: "status", status: "keepAlive" } -- heartbeat
 *   - { type: "finalAnswer", text: "..." }    -- complete response
 *   - { type: "reasoning", subtype: "stream", token: "..." } -- thinking tokens
 *   - { type: "status", status: "error", message: "..." }    -- error
 */
import {
  BaseExecutor,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";

const HUGGINGFACE_BASE = "https://huggingface.co";
const CONVERSATION_URL = `${HUGGINGFACE_BASE}/chat/conversation`;
const DEFAULT_COOKIE_NAME = "hf-chat";

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

const DEFAULT_MODEL = "meta-llama/Llama-3.3-70B-Instruct";

// -- Helpers -----------------------------------------------------------------

function normalizeHuggingChatCookieHeader(apiKey: string): string {
  return normalizeSessionCookieHeader(apiKey, DEFAULT_COOKIE_NAME);
}

function extractTextFromContent(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (!Array.isArray(content)) return "";

  return content
    .map((part: unknown) => {
      if (!part || typeof part !== "object") return "";
      const item = part as Record<string, unknown>;
      if (item.type === "text" && typeof item.text === "string") return item.text;
      if (item.type === "input_text" && typeof item.text === "string") return item.text;
      return "";
    })
    .filter((p: string) => p.trim().length > 0)
    .join("\n")
    .trim();
}

function buildConversationPrompt(messages: Array<Record<string, unknown>>): {
  inputs: string;
  systemPrompt: string | null;
} {
  const systemParts: string[] = [];
  const conversationParts: Array<{ role: string; content: string }> = [];

  for (const msg of messages) {
    const role = String(msg.role || "user");
    const text = extractTextFromContent(msg.content);
    if (!text) continue;

    if (role === "system" || role === "developer") {
      systemParts.push(text);
    } else if (role === "user" || role === "assistant") {
      conversationParts.push({ role, content: text });
    }
  }

  if (conversationParts.length === 0) {
    return { inputs: systemParts.join("\n\n"), systemPrompt: null };
  }

  if (conversationParts.length === 1 && conversationParts[0].role === "user") {
    return {
      inputs: conversationParts[0].content,
      systemPrompt: systemParts.length > 0 ? systemParts.join("\n\n") : null,
    };
  }

  const lines: string[] = [];
  for (const part of conversationParts) {
    const label = part.role === "user" ? "User" : "Assistant";
    lines.push(`${label}: ${part.content}`);
  }
  lines.push("Assistant:");

  return {
    inputs: lines.join("\n\n"),
    systemPrompt: systemParts.length > 0 ? systemParts.join("\n\n") : null,
  };
}

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil((text || "").length / 4));
}

function parseJsonlLine(line: string): {
  token?: string;
  done?: boolean;
  error?: string;
  text?: string;
} {
  try {
    const event = JSON.parse(line);

    if (event.type === "stream" && typeof event.token === "string") {
      const token = event.token.replace(/\0/g, "");
      if (token) return { token };
    }

    if (event.type === "finalAnswer" && typeof event.text === "string") {
      return { text: event.text, done: true };
    }

    if (event.type === "status") {
      if (event.status === "error") {
        return { error: event.message || "HuggingChat generation error" };
      }
      if (event.status === "finished") {
        return { done: true };
      }
    }
  } catch {
    // Skip non-JSON lines
  }

  return {};
}

async function* streamJsonlToOpenAi(
  body: ReadableStream<Uint8Array>,
  model: string,
  id: string,
  created: number,
  signal?: AbortSignal | null
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let emittedRole = false;
  let fullText = "";
  let finished = false;

  try {
    while (true) {
      if (signal?.aborted) break;

      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const parsed = parseJsonlLine(trimmed);

        if (parsed.error) {
          yield sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          });
          yield "data: [DONE]\n\n";
          finished = true;
          return;
        }

        if (parsed.token) {
          if (!emittedRole) {
            emittedRole = true;
            yield sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
            });
          }

          fullText += parsed.token;
          yield sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: { content: parsed.token }, finish_reason: null }],
          });
        }

        if (parsed.text) {
          const remaining = parsed.text.slice(fullText.length);
          if (remaining) {
            if (!emittedRole) {
              emittedRole = true;
              yield sseChunk({
                id,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
              });
            }
            yield sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content: remaining }, finish_reason: null }],
            });
          }
          finished = true;
          break;
        }

        if (parsed.done) {
          finished = true;
          break;
        }
      }

      if (finished) break;
    }

    if (!finished && buffer.trim()) {
      const parsed = parseJsonlLine(buffer.trim());
      if (parsed.token && !signal?.aborted) {
        if (!emittedRole) {
          emittedRole = true;
          yield sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
          });
        }
        yield sseChunk({
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta: { content: parsed.token }, finish_reason: null }],
        });
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!signal?.aborted) {
    yield sseChunk({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    });
    yield "data: [DONE]\n\n";
  }
}

async function readJsonlResponse(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  try {
    while (true) {
      if (signal?.aborted) break;

      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const parsed = parseJsonlLine(trimmed);
        if (parsed.token) fullText += parsed.token;
        if (parsed.text) return parsed.text;
        if (parsed.error) throw new Error(parsed.error);
      }
    }

    if (buffer.trim()) {
      const parsed = parseJsonlLine(buffer.trim());
      if (parsed.text) return parsed.text;
      if (parsed.token) fullText += parsed.token;
    }
  } finally {
    reader.releaseLock();
  }

  return fullText;
}

// -- Executor ----------------------------------------------------------------

export class HuggingChatExecutor extends BaseExecutor {
  constructor() {
    super("huggingchat", { id: "huggingchat", baseUrl: HUGGINGFACE_BASE });
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, body, stream, credentials, signal, log, upstreamExtraHeaders } = input;
    const messages = (body as Record<string, unknown>).messages as
      | Array<Record<string, unknown>>
      | undefined;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        response: new Response(
          JSON.stringify({
            error: { message: "Missing or empty messages array", type: "invalid_request" },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        ),
        url: CONVERSATION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const cookieHeader = normalizeHuggingChatCookieHeader(credentials.apiKey || "");
    if (!cookieHeader) {
      return {
        response: new Response(
          JSON.stringify({
            error: {
              message:
                "HuggingChat requires a session cookie. Log in to huggingface.co/chat, " +
                "open DevTools > Application > Cookies, and copy the hf-chat cookie value.",
              type: "auth_error",
            },
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
        url: CONVERSATION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const resolvedModel = model || DEFAULT_MODEL;
    const { inputs, systemPrompt } = buildConversationPrompt(messages);

    if (!inputs.trim()) {
      return {
        response: new Response(
          JSON.stringify({
            error: { message: "Empty prompt after processing messages", type: "invalid_request" },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        ),
        url: CONVERSATION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const baseHeaders: Record<string, string> = {
      Cookie: cookieHeader,
      "User-Agent": USER_AGENT,
      Origin: HUGGINGFACE_BASE,
      Referer: `${HUGGINGFACE_BASE}/chat/`,
    };

    // -- Step 1: Create conversation ----------------------------------------
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    let conversationId: string;
    try {
      const createBody: Record<string, unknown> = { model: resolvedModel };
      if (systemPrompt) createBody.preprompt = systemPrompt;

      const createRes = await fetch(CONVERSATION_URL, {
        method: "POST",
        headers: { ...baseHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(createBody),
        signal: combinedSignal,
      });

      if (!createRes.ok) {
        const status = createRes.status;
        let message = `HuggingChat conversation creation failed (HTTP ${status})`;
        if (status === 401 || status === 403) {
          message =
            "HuggingChat auth failed -- your hf-chat session cookie may be missing or expired. " +
            "Log in to huggingface.co/chat and re-paste your cookie.";
        } else if (status === 429) {
          message = "HuggingChat rate limited. Wait a moment and retry.";
        }
        return {
          response: new Response(
            JSON.stringify({ error: { message, type: "upstream_error", code: `HTTP_${status}` } }),
            { status, headers: { "Content-Type": "application/json" } }
          ),
          url: CONVERSATION_URL,
          headers: baseHeaders,
          transformedBody: body,
        };
      }

      const createData = (await createRes.json()) as Record<string, unknown>;
      conversationId = createData.conversationId as string;

      if (!conversationId) {
        return {
          response: new Response(
            JSON.stringify({
              error: {
                message: "HuggingChat did not return a conversationId",
                type: "upstream_error",
              },
            }),
            { status: 502, headers: { "Content-Type": "application/json" } }
          ),
          url: CONVERSATION_URL,
          headers: baseHeaders,
          transformedBody: body,
        };
      }

      log?.debug?.("HUGGINGCHAT", `Created conversation: ${conversationId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      log?.error?.("HUGGINGCHAT", `Conversation creation failed: ${message}`);
      return {
        response: new Response(
          JSON.stringify({
            error: { message: `HuggingChat connection failed: ${message}`, type: "upstream_error" },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
        url: CONVERSATION_URL,
        headers: baseHeaders,
        transformedBody: body,
      };
    }

    // -- Step 2: Send message -----------------------------------------------
    const messageUrl = `${CONVERSATION_URL}/${conversationId}`;
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        inputs,
        id: crypto.randomUUID(),
      })
    );

    mergeUpstreamExtraHeaders(baseHeaders, upstreamExtraHeaders);

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(messageUrl, {
        method: "POST",
        headers: baseHeaders,
        body: formData,
        signal: combinedSignal,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      log?.error?.("HUGGINGCHAT", `Message send failed: ${message}`);
      return {
        response: new Response(
          JSON.stringify({
            error: { message: `HuggingChat connection failed: ${message}`, type: "upstream_error" },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
        url: messageUrl,
        headers: baseHeaders,
        transformedBody: body,
      };
    }

    if (!upstreamResponse.ok) {
      const status = upstreamResponse.status;
      let message = `HuggingChat returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        message = "HuggingChat auth failed -- session cookie may be expired.";
      } else if (status === 429) {
        message = "HuggingChat rate limited. Wait a moment and retry.";
      } else if (status === 404) {
        message = `HuggingChat model not found: ${resolvedModel}. Check the model ID.`;
      }
      return {
        response: new Response(
          JSON.stringify({ error: { message, type: "upstream_error", code: `HTTP_${status}` } }),
          { status, headers: { "Content-Type": "application/json" } }
        ),
        url: messageUrl,
        headers: baseHeaders,
        transformedBody: body,
      };
    }

    if (!upstreamResponse.body) {
      return {
        response: new Response(
          JSON.stringify({
            error: { message: "HuggingChat returned empty response body", type: "upstream_error" },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
        url: messageUrl,
        headers: baseHeaders,
        transformedBody: body,
      };
    }

    // -- Step 3: Build response ---------------------------------------------
    const id = `chatcmpl-huggingchat-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    if (stream) {
      const encoder = new TextEncoder();
      const jsonlStream = streamJsonlToOpenAi(
        upstreamResponse.body,
        resolvedModel,
        id,
        created,
        signal
      );

      const sseStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of jsonlStream) {
              controller.enqueue(encoder.encode(chunk));
            }
          } catch (err) {
            log?.error?.("HUGGINGCHAT", `Stream error: ${err}`);
          } finally {
            controller.close();
          }
        },
      });

      return {
        response: new Response(sseStream, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
          },
        }),
        url: messageUrl,
        headers: baseHeaders,
        transformedBody: body,
      };
    }

    const fullText = await readJsonlResponse(upstreamResponse.body, signal);
    const completionTokens = estimateTokens(fullText);

    return {
      response: new Response(
        JSON.stringify({
          id,
          object: "chat.completion",
          created,
          model: resolvedModel,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: fullText },
              finish_reason: "stop",
            },
          ],
          usage: {
            prompt_tokens: estimateTokens(inputs),
            completion_tokens: completionTokens,
            total_tokens: estimateTokens(inputs) + completionTokens,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
      url: messageUrl,
      headers: baseHeaders,
      transformedBody: body,
    };
  }
}
