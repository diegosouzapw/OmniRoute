/**
 * YouWebExecutor — You.com AI Chat
 *
 * Routes requests through You.com's chat API with web search synthesis.
 * Combines web search with AI reasoning for enhanced responses.
 *
 * Endpoint: POST https://you.com/api/streamingSearch
 * Auth: Session cookie from you.com
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";

const YOU_API_URL = "https://you.com/api/streamingSearch";
const YOU_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export class YouWebExecutor extends BaseExecutor {
  constructor() {
    super("you-web", { id: "you-web", baseUrl: "https://you.com" });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = normalizeSessionCookieHeader(
      String(credentials?.apiKey ?? "").trim(),
      "stytch_session"
    );

    const messages = (bodyObj.messages as Array<{ role: string; content: string }>) || [];
    const modelId = (bodyObj.model as string) || "you-gpt4o";

    // You.com expects a search query string, not chat messages
    // We'll concatenate the messages into a query
    const query = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => m.content)
      .join("\n");

    const reqBody = {
      q: query,
      page: 1,
      count: 10,
      safeSearch: "Off",
      mkt: "en-US",
      domain: "chat",
      source: "chat",
      queryTraceId: crypto.randomUUID(),
      chat: [
        {
          question: query,
          answer: "",
        },
      ],
    };

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": YOU_USER_AGENT,
      Accept: "text/event-stream",
      Referer: "https://you.com/",
      Origin: "https://you.com",
    };
    if (rawCookie) reqHeaders.Cookie = rawCookie;

    let upstream: Response;
    try {
      upstream = await fetch(YOU_API_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal,
      });
    } catch (err) {
      return makeErrorResult("FETCH_ERROR", String(err));
    }

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      return makeErrorResult("UPSTREAM_ERROR", text || `HTTP ${upstream.status}`);
    }

    // Non-streaming response (accumulate all chunks)
    if (!wantStream) {
      const reader = upstream.body?.getReader();
      if (!reader) {
        return makeErrorResult("NO_BODY", "No response body");
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim() || line.startsWith("event:")) continue;
            if (line.startsWith("data:")) {
              const data = line.slice(5).trim();
              try {
                const parsed = JSON.parse(data);
                if (parsed.youChatToken) {
                  fullText += parsed.youChatToken;
                }
              } catch {
                // Skip non-JSON lines
              }
            }
          }
        }
      } catch (err) {
        return makeErrorResult("STREAM_READ_ERROR", String(err));
      }

      return {
        response: new Response(
          JSON.stringify({
            id: `chatcmpl-you-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: modelId,
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: fullText },
                finish_reason: "stop",
              },
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        ),
        requestId: crypto.randomUUID(),
      };
    }

    // Streaming response
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim() || line.startsWith("event:")) continue;
              if (line.startsWith("data:")) {
                const data = line.slice(5).trim();
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.youChatToken) {
                    const chunk = {
                      id: `chatcmpl-you-${Date.now()}`,
                      object: "chat.completion.chunk",
                      created: Math.floor(Date.now() / 1000),
                      model: modelId,
                      choices: [
                        {
                          index: 0,
                          delta: { content: parsed.youChatToken },
                          finish_reason: null,
                        },
                      ],
                    };
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                  }
                } catch {
                  // Skip non-JSON lines
                }
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return {
      response: new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }),
      requestId: crypto.randomUUID(),
    };
  }
}
