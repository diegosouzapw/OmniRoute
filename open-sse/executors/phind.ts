/**
 * PhindExecutor — Free Dev-Focused AI Chat via phind.com
 *
 * Routes requests through Phind's chat API.
 * Free tier available. Uses session cookie for auth.
 *
 * Endpoint: POST https://www.phind.com/api/agent
 * Auth: Session cookie from phind.com
 * SSE response with data: prefixed JSON chunks (OpenAI-compatible delta format)
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, normalizeCookie } from "../utils/error.ts";

const BASE_URL = "https://www.phind.com";
const CHAT_URL = `${BASE_URL}/api/agent`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export class PhindExecutor extends BaseExecutor {
  constructor() {
    super("phind", { id: "phind", baseUrl: "https://www.phind.com" });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = String(credentials?.apiKey ?? "").trim();
    const cookie = normalizeCookie(rawCookie);

    // Build Phind-format messages
    const messages = (bodyObj.messages as Array<{ role: string; content: string }>) || [];
    const phindMessages = messages.map((m) => ({ role: m.role, content: m.content }));
    const modelId = (bodyObj.model as string) || "phind-model";
    // Last user message as userInput (Phind expects this field)
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    const userInput = lastUserMsg?.content || "";

    const reqBody = {
      userInput,
      messages: phindMessages,
      requestedModel: modelId,
      webSearchMode: "auto",
      isChromeExtension: false,
      language: "en-US",
      date: new Date().toISOString(),
    };

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json;charset=UTF-8",
      "User-Agent": USER_AGENT,
      Accept: "text/event-stream",
      Referer: `${BASE_URL}/`,
      Origin: BASE_URL,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    };
    if (cookie) reqHeaders.Cookie = cookie;

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
        `Phind fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        CHAT_URL
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `Phind error: ${errText}`, body, CHAT_URL);
    }

    // Phind always returns SSE — parse it for both streaming and non-streaming
    if (!upstream.body) {
      return makeErrorResult(502, "Phind returned empty response body", body, CHAT_URL);
    }

    if (!wantStream) {
      // Collect all SSE chunks into a single response
      const reader = upstream.body.getReader();
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
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const text = parsed.choices?.[0]?.delta?.content || parsed.content || "";
              if (text) fullText += text;
            } catch {
              // Skip unparseable chunks
            }
          }
        }
      } catch (err) {
        if (!signal?.aborted) {
          return makeErrorResult(
            502,
            `Phind stream read failed: ${err instanceof Error ? err.message : "unknown"}`,
            body,
            CHAT_URL
          );
        }
      }

      return {
        response: new Response(
          JSON.stringify({
            id: `chatcmpl-ph-${Date.now()}`,
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
            usage: {
              prompt_tokens: Math.ceil((userInput || "").length / 4),
              completion_tokens: Math.ceil(fullText.length / 4),
              total_tokens: Math.ceil(((userInput || "").length + fullText.length) / 4),
            },
          }),
          { headers: { "Content-Type": "application/json" } }
        ),
        url: CHAT_URL,
        headers: reqHeaders,
        transformedBody: reqBody,
      };
    }

    // Streaming: transform Phind SSE to OpenAI format
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const sseStream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        let buffer = "";
        try {
          // Initial role chunk
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                id: `chatcmpl-ph-${Date.now()}`,
                object: "chat.completion.chunk",
                created: Math.floor(Date.now() / 1000),
                model: modelId,
                choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
              })}\n\n`
            )
          );

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const text =
                  parsed.choices?.[0]?.delta?.content || parsed.content || "";
                if (text) {
                  const chunk = {
                    id: `chatcmpl-ph-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model: modelId,
                    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                }
              } catch {
                // Skip unparseable chunks
              }
            }
          }
        } catch (err) {
          if (!signal?.aborted) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  id: `chatcmpl-ph-${Date.now()}`,
                  object: "chat.completion.chunk",
                  created: Math.floor(Date.now() / 1000),
                  model: modelId,
                  choices: [
                    {
                      index: 0,
                      delta: {
                        content: `[Stream error: ${err instanceof Error ? err.message : String(err)}]`,
                      },
                      finish_reason: "stop",
                    },
                  ],
                })}\n\n`
              )
            );
          }
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
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
      url: CHAT_URL,
      headers: reqHeaders,
      transformedBody: reqBody,
    };
  }
}
