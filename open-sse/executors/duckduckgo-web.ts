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

  async execute(input: ExecuteInput) {
    const { model, messages, stream, signal, upstreamHeaders } = input;

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: { message: "No messages provided" } }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      if (mergedSignal.aborted) {
        clearTimeout(timeout);
        return new Response(
          JSON.stringify({ error: { message: "Request cancelled" } }),
          { status: 499, headers: { "Content-Type": "application/json" } }
        );
      }

      const vqdToken = await this.acquireVqdHash(mergedSignal);
      if (!vqdToken) {
        clearTimeout(timeout);
        return new Response(
          JSON.stringify({ error: { message: "Failed to acquire VQD token" } }),
          { status: 503, headers: { "Content-Type": "application/json" } }
        );
      }

      const chatResponse = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          ...FAKE_HEADERS,
          "Content-Type": "application/json",
          "x-vqd-hash-1": vqdToken,
        },
        body: JSON.stringify({
          model,
          messages,
          stream: stream !== false,
        }),
        signal: mergedSignal,
      });

      clearTimeout(timeout);

      if (chatResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: { message: "DuckDuckGo rate limited" } }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }

      if (chatResponse.status === 401 || chatResponse.status === 403) {
        const newVqd = await this.acquireVqdHash(mergedSignal);
        if (newVqd) {
          const retryResponse = await fetch(CHAT_URL, {
            method: "POST",
            headers: {
              ...FAKE_HEADERS,
              "Content-Type": "application/json",
              "x-vqd-hash-1": newVqd,
            },
            body: JSON.stringify({
              model,
              messages,
              stream: stream !== false,
            }),
            signal: mergedSignal,
          });

          return this.processResponse(retryResponse, stream !== false);
        }
        return new Response(
          JSON.stringify({ error: { message: "Service unavailable" } }),
          { status: 503, headers: { "Content-Type": "application/json" } }
        );
      }

      if (chatResponse.status >= 500) {
        return new Response(
          JSON.stringify({ error: { message: "Upstream error" } }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      return this.processResponse(chatResponse, stream !== false);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return new Response(
          JSON.stringify({ error: { message: "Request cancelled" } }),
          { status: 499, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: { message: error instanceof Error ? error.message : "Unknown error" } }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
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
