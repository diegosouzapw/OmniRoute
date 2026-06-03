import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";

export const DUCKDUCKGO_BASE = "https://duckduckgo.com";
const STATUS_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/status`;
const CHAT_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/chat`;

const FAKE_HEADERS: Record<string, string> = {
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: DUCKDUCKGO_BASE,
  Referer: `${DUCKDUCKGO_BASE}/`,
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
};

/**
 * DuckDuckGoWebExecutor handles anonymous, free access to DuckDuckGo AI Chat.
 *
 * Authentication flow:
 * 1. GET /duckchat/v1/status → get x-vqd-hash-1 header (VQD token)
 * 2. POST /duckchat/v1/chat with VQD header + model + messages
 * 3. Parse NDJSON SSE stream and transform to OpenAI format
 *
 * VQD tokens are per-request; no caching or cleanup needed.
 */
export class DuckDuckGoWebExecutor extends BaseExecutor {
  protected poolConfig = {
    minSessions: 2,
    maxSessions: 5,
    cooldownBase: 1000,
    cooldownMax: 10000,
    cooldownJitter: 500,
    requestTimeout: 30000,
    requestJitter: 50,
  };

  constructor() {
    super("duckduckgo-web", { baseUrl: DUCKDUCKGO_BASE });
  }

  async testConnection(credentials: Record<string, unknown>, signal?: AbortSignal): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      const resp = await fetch(STATUS_URL, {
        method: "GET",
        headers: { ...FAKE_HEADERS, Accept: "text/event-stream" },
        signal: mergedSignal,
      });

      clearTimeout(timeout);

      return resp.ok && resp.headers.get("x-vqd-hash-1") !== null;
    } catch {
      return false;
    }
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, body, stream, signal, upstreamExtraHeaders } = input;
    const messages = Array.isArray((body as { messages?: unknown[] } | null)?.messages)
      ? ((body as { messages: unknown[] }).messages as Array<Record<string, unknown>>)
      : [];
    const isStreaming = stream !== false;
    const upstreamHeaders = upstreamExtraHeaders || {};

    const errorResponse = (status: number, message: string): Response =>
      new Response(JSON.stringify({ error: { message } }), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    const wrap = (response: Response): {
      response: Response;
      url: string;
      headers: Record<string, string>;
      transformedBody: unknown;
    } => ({
      response,
      url: CHAT_URL,
      headers: {},
      transformedBody: { model, messages },
    });

    if (messages.length === 0) {
      return wrap(errorResponse(400, "No messages provided"));
    }

    // Acquire session from pool for fingerprint rotation
    const pool = this.getPool();
    let session;
    try {
      session = pool ? await pool.acquireBlocking(10_000) : null;
    } catch {
      session = null;
    }
    const sessionHeaders = session ? session.buildHeaders() : {};

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      if (mergedSignal.aborted) {
        clearTimeout(timeout);
        return wrap(errorResponse(499, "Request cancelled"));
      }

      const vqdToken = await this.acquireVqdHash(mergedSignal);
      if (!vqdToken) {
        clearTimeout(timeout);
        return wrap(errorResponse(503, "Failed to acquire VQD token"));
      }

      const chatResponse = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          ...FAKE_HEADERS,
          ...sessionHeaders,
          ...upstreamHeaders,
          "Content-Type": "application/json",
          "x-vqd-hash-1": vqdToken,
        },
        body: JSON.stringify({
          model,
          messages,
          stream: isStreaming,
        }),
        signal: mergedSignal,
      });

      clearTimeout(timeout);

      if (chatResponse.status === 429) {
        if (pool && session) pool.reportCooldown(session);
        return wrap(errorResponse(429, "DuckDuckGo rate limited"));
      }

      if (chatResponse.status === 401 || chatResponse.status === 403) {
        const newVqd = await this.acquireVqdHash(mergedSignal);
        if (newVqd) {
          const retryResponse = await fetch(CHAT_URL, {
            method: "POST",
            headers: {
              ...FAKE_HEADERS,
              ...upstreamHeaders,
              "Content-Type": "application/json",
              "x-vqd-hash-1": newVqd,
            },
            body: JSON.stringify({
              model,
              messages,
              stream: isStreaming,
            }),
            signal: mergedSignal,
          });

          return wrap(await this.processResponse(retryResponse, isStreaming));
        }
        return wrap(errorResponse(503, "Service unavailable"));
      }

      if (chatResponse.status >= 500) {
        if (pool && session) pool.reportDead(session);
        return wrap(errorResponse(502, "Upstream error"));
      }

      const result = await this.processResponse(chatResponse, isStreaming);

      // Report pool status based on response
      if (pool && session) {
        if (chatResponse.status === 429) {
          pool.reportCooldown(session);
        } else if (chatResponse.status >= 500) {
          pool.reportDead(session);
        } else {
          pool.reportSuccess(session);
        }
      }

      return wrap(result);
    } catch (error) {
      if (pool && session) {
        pool.reportCooldown(session);
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        return wrap(errorResponse(499, "Request cancelled"));
      }

      return wrap(
        errorResponse(
          500,
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    } finally {
      session?.release();
    }
  }

  private async acquireVqdHash(signal: AbortSignal): Promise<string | null> {
    try {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      
      const resp = await fetch(STATUS_URL, {
        method: "GET",
        headers: { ...FAKE_HEADERS, Accept: "text/event-stream" },
        signal,
      });

      if (!resp.ok) return null;
      return resp.headers.get("x-vqd-hash-1");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      return null;
    }
  }

  private async processResponse(response: Response, streaming: boolean): Promise<Response> {
    if (!response.ok) {
      const body = await response.text();
      return new Response(body, {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (streaming) {
      const reader = response.body?.getReader();
      if (!reader) {
        return new Response(
          JSON.stringify({ error: { message: "No response body" } }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          const text = new TextDecoder().decode(chunk);
          const lines = text.split("\n");

          for (const line of lines) {
            if (!line.trim()) continue;
            if (line === "[DONE]") {
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              continue;
            }

            try {
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6);
                const data = JSON.parse(jsonStr);

                if (data.content) {
                  const openaiFormat = {
                    choices: [
                      {
                        delta: { content: data.content },
                        index: 0,
                      },
                    ],
                  };
                  const encoded = new TextEncoder().encode(
                    `data: ${JSON.stringify(openaiFormat)}\n\n`
                  );
                  controller.enqueue(encoded);
                }
              }
            } catch {
              continue;
            }
          }
        },
      });

      const transformedBody = reader.pipeThrough(transformStream);
      return new Response(transformedBody, {
        headers: { "Content-Type": "text/event-stream" },
      });
    } else {
      const text = await response.text();
      let fullContent = "";

      const lines = text.split("\n");
      for (const line of lines) {
        if (!line.trim() || line === "[DONE]") continue;

        try {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6);
            const data = JSON.parse(jsonStr);
            if (data.content) {
              fullContent += data.content;
            }
          }
        } catch {
          continue;
        }
      }

      const openaiResponse = {
        choices: [
          {
            message: { content: fullContent, role: "assistant" },
            index: 0,
            finish_reason: "stop",
          },
        ],
      };

      return new Response(JSON.stringify(openaiResponse), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

export const duckduckgoWebExecutor = new DuckDuckGoWebExecutor();
