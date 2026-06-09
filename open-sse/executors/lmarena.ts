/**
 * LMArenaExecutor — LMArena Web Session Provider
 *
 * Routes requests through LMArena's web API using session credentials.
 * LMArena is a model comparison platform with 100+ models (GPT, Claude, Gemini, Llama).
 *
 * API Structure:
 *   Endpoint: https://arena.ai/nextjs-api/stream
 *   Method: POST
 *   Content-Type: application/json
 *   Accept: text/event-stream
 *
 * Auth pipeline (per request):
 *   1. Extract session cookie from credentials
 *   2. Build request with model and messages
 *   3. Make authenticated POST request to LMArena API
 *   4. Handle SSE response stream with custom prefixes (a0:, ag:, a3:, ae:, ad:)
 *
 * SSE Format:
 *   a0: - Text content (concatenate)
 *   ag: - Thinking/reasoning content
 *   a2: - Heartbeat (ignore)
 *   a3: - Model error
 *   ae: - Platform error
 *   ad: - Done marker
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

const LMARENA_API_BASE = "https://arena.ai";
const LMARENA_STREAM_URL = `${LMARENA_API_BASE}/nextjs-api/stream`;

const LMARENA_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function readLMArenaCookie(credentials: unknown): string {
  if (!credentials || typeof credentials !== "object") return "";
  const c = credentials as Record<string, unknown>;
  const direct = typeof c.cookie === "string" ? c.cookie : "";
  if (direct.trim()) return direct;
  const apiKey = typeof c.apiKey === "string" ? c.apiKey : "";
  if (apiKey.trim()) return apiKey;
  const psd = c.providerSpecificData;
  if (psd && typeof psd === "object") {
    const nested = (psd as Record<string, unknown>).cookie;
    if (typeof nested === "string" && nested.trim()) return nested;
  }
  return "";
}

interface ArenaSSEEvent {
  type: "text" | "thinking" | "error" | "done" | "heartbeat";
  content?: string;
}

export function parseArenaSSE(line: string): ArenaSSEEvent | null {
  if (line.startsWith("a0:")) {
    try {
      const content = JSON.parse(line.substring(3));
      return { type: "text", content: typeof content === "string" ? content : content.text || "" };
    } catch {
      return null;
    }
  } else if (line.startsWith("ag:")) {
    try {
      const content = JSON.parse(line.substring(3));
      return { type: "thinking", content: typeof content === "string" ? content : content.thinking || "" };
    } catch {
      return null;
    }
  } else if (line.startsWith("a3:") || line.startsWith("ae:")) {
    try {
      const content = JSON.parse(line.substring(3));
      return { type: "error", content: typeof content === "string" ? content : content.error || JSON.stringify(content) };
    } catch {
      return { type: "error", content: line.substring(3) };
    }
  } else if (line.startsWith("ad:")) {
    return { type: "done" };
  } else if (line.startsWith("a2:")) {
    return { type: "heartbeat" };
  }
  return null;
}

export class LMArenaExecutor extends BaseExecutor {
  constructor(providerConfig = {}) {
    super("lmarena", { format: "openai", ...providerConfig });
  }

  protected buildUrl(_model: string, _credentials: unknown): string {
    return LMARENA_STREAM_URL;
  }

  protected buildHeaders(
    _model: string,
    credentials: unknown,
    _body: unknown
  ): Record<string, string> {
    const cookie = readLMArenaCookie(credentials);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "User-Agent": LMARENA_USER_AGENT,
      Origin: LMARENA_API_BASE,
      Referer: `${LMARENA_API_BASE}/`,
    };

    if (cookie) {
      headers.Cookie = cookie;
    }

    return headers;
  }

  protected transformRequest(body: unknown, model: string): unknown {
    const openaiBody = body as Record<string, unknown>;
    const messages = openaiBody.messages as Array<{ role: string; content: string }>;
    
    return {
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      model,
      stream: openaiBody.stream || false,
    };
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal, log } = input;

    const url = this.buildUrl(model, credentials);
    const headers = this.buildHeaders(model, credentials, body);
    const transformedBody = this.transformRequest(body, model);

    const cookie = readLMArenaCookie(credentials);
    if (!cookie) {
      return {
        response: new Response(
          JSON.stringify({
            error: {
              message: "LMArena requires a session cookie. Please provide cookie in credentials.",
              type: "authentication_error",
              code: "missing_cookie",
            },
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
        url,
        headers,
        transformedBody,
      };
    }

    log?.info?.("LMArenaExecutor", `Executing request for model: ${model}`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(transformedBody),
        signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `LMArena API error: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        return {
          response: new Response(
            JSON.stringify({
              error: {
                message: sanitizeErrorMessage(errorMessage),
                type: "api_error",
                code: String(response.status),
              },
            }),
            { status: response.status, headers: { "Content-Type": "application/json" } }
          ),
          url,
          headers,
          transformedBody,
        };
      }

      const upstreamResponse = stream
        ? await this.handleStreamingResponse(response, model, log)
        : await this.handleNonStreamingResponse(response, model, log);

      return { response: upstreamResponse, url, headers, transformedBody };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log?.error?.("LMArenaExecutor", `Request failed: ${message}`);

      return {
        response: new Response(
          JSON.stringify({
            error: {
              message: sanitizeErrorMessage(message),
              type: "network_error",
              code: "request_failed",
            },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
        url,
        headers,
        transformedBody,
      };
    }
  }

  private async handleStreamingResponse(
    response: Response,
    model: string,
    log?: ExecuteInput["log"]
  ): Promise<Response> {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body for streaming");
    }

    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";
    let fullThinking = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim()) continue;

              const sseLine = line.startsWith("data: ") ? line.substring(6) : line;
              const event = parseArenaSSE(sseLine);

              if (!event) continue;

              if (event.type === "text" && event.content) {
                fullText += event.content;
                const chunk = {
                  id: `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model,
                  choices: [
                    {
                      index: 0,
                      delta: { content: event.content },
                      finish_reason: null,
                    },
                  ],
                };
                controller.enqueue(`data: ${JSON.stringify(chunk)}\n\n`);
              } else if (event.type === "thinking" && event.content) {
                fullThinking += event.content;
              } else if (event.type === "error") {
                const errorChunk = {
                  id: `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model,
                  choices: [
                    {
                      index: 0,
                      delta: {},
                      finish_reason: "stop",
                    },
                  ],
                  error: { message: event.content },
                };
                controller.enqueue(`data: ${JSON.stringify(errorChunk)}\n\n`);
                controller.close();
                return;
              } else if (event.type === "done") {
                const finalChunk = {
                  id: `chatcmpl-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model,
                  choices: [
                    {
                      index: 0,
                      delta: {},
                      finish_reason: "stop",
                    },
                  ],
                };
                controller.enqueue(`data: ${JSON.stringify(finalChunk)}\n\n`);
                controller.enqueue("data: [DONE]\n\n");
                controller.close();
                return;
              }
            }
          }

          const finalChunk = {
            id: `chatcmpl-${Date.now()}`,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model,
            choices: [
              {
                index: 0,
                delta: {},
                finish_reason: "stop",
              },
            ],
          };
          controller.enqueue(`data: ${JSON.stringify(finalChunk)}\n\n`);
          controller.enqueue("data: [DONE]\n\n");
          controller.close();
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          log?.error?.("LMArenaExecutor", `Streaming error: ${message}`);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  private async handleNonStreamingResponse(
    response: Response,
    model: string,
    log?: ExecuteInput["log"]
  ): Promise<Response> {
    const text = await response.text();
    const lines = text.split("\n");
    let fullText = "";
    let fullThinking = "";
    let error: string | null = null;

    for (const line of lines) {
      if (!line.trim()) continue;

      const sseLine = line.startsWith("data: ") ? line.substring(6) : line;
      const event = parseArenaSSE(sseLine);

      if (!event) continue;

      if (event.type === "text" && event.content) {
        fullText += event.content;
      } else if (event.type === "thinking" && event.content) {
        fullThinking += event.content;
      } else if (event.type === "error") {
        error = event.content || "Unknown error";
        break;
      } else if (event.type === "done") {
        break;
      }
    }

    if (error) {
      return new Response(
        JSON.stringify({
          error: {
            message: sanitizeErrorMessage(error),
            type: "api_error",
            code: "lmarena_error",
          },
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = {
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: fullText,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
