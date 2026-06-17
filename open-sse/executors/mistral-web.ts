/**
 * MistralWebExecutor — Mistral AI Chat via chat.mistral.ai
 *
 * Routes requests through Mistral's consumer chat API.
 * Supports Mistral Large, Medium, Small, and Codestral models.
 *
 * Endpoint: POST https://chat.mistral.ai/api/completions
 * Auth: NextAuth session-token cookie
 * CSRF: GET https://chat.mistral.ai/api/auth/csrf
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";

const BASE_URL = "https://chat.mistral.ai";
const CSRF_URL = `${BASE_URL}/api/auth/csrf`;
const CHAT_URL = `${BASE_URL}/api/completions`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export class MistralWebExecutor extends BaseExecutor {
  constructor() {
    super("mistral-web", { id: "mistral-web", baseUrl: BASE_URL });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = normalizeSessionCookieHeader(
      String(credentials?.apiKey ?? "").trim(),
      "next-auth.session-token"
    );

    if (!rawCookie) {
      return makeErrorResult(401, "Mistral session cookie required", body, CHAT_URL);
    }

    const messages = (bodyObj.messages as Array<{ role: string; content: string }>) || [];
    const modelId = (bodyObj.model as string) || "mistral-large-latest";

    // Step 1: Fetch CSRF token
    let csrfToken = "";
    try {
      const csrfResp = await fetch(CSRF_URL, {
        method: "GET",
        headers: {
          "User-Agent": USER_AGENT,
          Cookie: rawCookie,
          Referer: `${BASE_URL}/`,
        },
        signal,
      });

      if (!csrfResp.ok) {
        return makeErrorResult(
          csrfResp.status,
          `Mistral CSRF fetch failed: ${csrfResp.statusText}`,
          body,
          CSRF_URL
        );
      }

      const csrfData = (await csrfResp.json()) as { csrfToken?: string };
      csrfToken = csrfData.csrfToken || "";

      if (!csrfToken) {
        return makeErrorResult(500, "Mistral CSRF token missing in response", body, CSRF_URL);
      }
    } catch (err) {
      return makeErrorResult(
        502,
        `Mistral CSRF fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        CSRF_URL
      );
    }

    // Step 2: Send chat completion request
    const reqBody = {
      model: modelId,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      stream: wantStream,
      max_tokens: (bodyObj.max_tokens as number) || 4096,
      temperature: (bodyObj.temperature as number) ?? 0.7,
    };

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Accept: wantStream ? "text/event-stream" : "application/json",
      Cookie: rawCookie,
      "X-CSRF-Token": csrfToken,
      Referer: `${BASE_URL}/`,
      Origin: BASE_URL,
    };

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
        `Mistral chat fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        CHAT_URL
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `Mistral error: ${errText}`, body, CHAT_URL);
    }

    // Non-streaming response
    if (!wantStream) {
      const data = (await upstream.json()) as Record<string, unknown>;
      const content =
        (data?.choices as Array<{ message?: { content?: string } }>)?.[0]?.message?.content ||
        (data?.content as string) ||
        "";
      return {
        response: new Response(
          JSON.stringify({
            id: `chatcmpl-mistral-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: modelId,
            choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
            usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        ),
        error: null,
        logs: [],
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
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const text = parsed.choices?.[0]?.delta?.content || "";
                if (text) {
                  const chunk = {
                    id: `chatcmpl-mistral-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model: modelId,
                    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                }
              } catch {
                // Skip malformed chunks
              }
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
        status: 200,
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
      }),
      error: null,
      logs: [],
    };
  }
}
