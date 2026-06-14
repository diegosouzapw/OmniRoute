/**
 * DoubaoWebExecutor — ByteDance AI Chat via doubao.com
 *
 * Routes requests through Doubao's consumer chat API.
 * Chinese market provider with large model catalog.
 *
 * Endpoint: POST https://www.doubao.com/api/chat
 * Auth: Session cookie from doubao.com
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, normalizeCookie } from "../utils/error.ts";

const BASE_URL = "https://www.doubao.com";
const CHAT_URL = `${BASE_URL}/api/chat`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export class DoubaoWebExecutor extends BaseExecutor {
  constructor() {
    super("doubao-web", { id: "doubao-web", baseUrl: "https://www.doubao.com" });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = normalizeCookie(String(credentials?.apiKey ?? "").trim());

    const messages = (bodyObj.messages as Array<{ role: string; content: string }>) || [];
    const modelId = (bodyObj.model as string) || "doubao-default";

    const reqBody = {
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      model: modelId,
      stream: wantStream,
      max_tokens: (bodyObj.max_tokens as number) || 4096,
    };

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Accept: wantStream ? "text/event-stream" : "application/json",
      Referer: `${BASE_URL}/`,
      Origin: BASE_URL,
    };
    if (rawCookie) reqHeaders.Cookie = rawCookie;

    let upstream: Response;
    try {
      upstream = await fetch(CHAT_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal,
      });
    } catch (err) {
      return makeErrorResult(
        502,
        `Doubao fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        CHAT_URL
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `Doubao error: ${errText}`, body, CHAT_URL);
    }

    if (!wantStream) {
      const data = (await upstream.json()) as Record<string, unknown>;
      const content =
        (data?.choices as Array<{ message?: { content?: string } }>)?.[0]?.message?.content ||
        (data?.content as string) ||
        "";
      return {
        response: new Response(
          JSON.stringify({
            id: `chatcmpl-doubao-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: modelId,
            choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
          }),
          { headers: { "Content-Type": "application/json" } }
        ),
        url: CHAT_URL,
        headers: reqHeaders,
        transformedBody: reqBody,
      };
    }

    // Streaming
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader();
        if (!reader) { controller.close(); return; }
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (data === "[DONE]") { controller.enqueue(encoder.encode("data: [DONE]\n\n")); continue; }
              try {
                const parsed = JSON.parse(data);
                const text = parsed.choices?.[0]?.delta?.content || "";
                if (text) {
                  const chunk = {
                    id: `chatcmpl-doubao-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model: modelId,
                    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                }
              } catch {}
            }
          }
        } catch (err) {
          if (!signal?.aborted) controller.error(err);
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return {
      response: new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
      }),
      url: CHAT_URL,
      headers: reqHeaders,
      transformedBody: reqBody,
    };
  }
}
