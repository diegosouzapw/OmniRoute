/**
 * PiWebExecutor — Inflection Pi AI Chat
 *
 * Routes requests through Pi.AI's chat API.
 * Uses 2-step process: create conversation, then send messages.
 *
 * Endpoint 1: POST https://pi.ai/api/chat/conversations
 * Endpoint 2: POST https://pi.ai/api/chat/messages
 * Auth: Session cookie from pi.ai
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";

const PI_API_BASE = "https://pi.ai/api/chat";
const PI_CONVERSATIONS_URL = `${PI_API_BASE}/conversations`;
const PI_MESSAGES_URL = `${PI_API_BASE}/messages`;
const PI_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

interface PiMessage {
  role: string;
  content: string;
}

interface PiConversationResponse {
  id: string;
  [key: string]: unknown;
}

export class PiWebExecutor extends BaseExecutor {
  constructor() {
    super("pi-web", { id: "pi-web", baseUrl: "https://pi.ai" });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = normalizeSessionCookieHeader(
      String(credentials?.apiKey ?? "").trim(),
      "__Secure-next-auth.session-token"
    );

    const messages = (bodyObj.messages as PiMessage[]) || [];
    const modelId = (bodyObj.model as string) || "pi-default";

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": PI_USER_AGENT,
      Accept: wantStream ? "text/event-stream" : "application/json",
      Referer: "https://pi.ai/",
      Origin: "https://pi.ai",
    };
    if (rawCookie) reqHeaders.Cookie = rawCookie;

    // Step 1: Create conversation
    let conversationId: string;
    try {
      const convResp = await fetch(PI_CONVERSATIONS_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify({}),
        signal,
      });
      if (!convResp.ok) {
        const errText = await convResp.text().catch(() => "Unknown error");
        return makeErrorResult(
          "CONVERSATION_CREATE_FAILED",
          `Failed to create conversation: ${convResp.status} ${errText}`
        );
      }
      const convData = (await convResp.json()) as PiConversationResponse;
      conversationId = convData.id;
    } catch (err) {
      return makeErrorResult("FETCH_ERROR", String(err));
    }

    // Step 2: Send messages
    const userMessage = messages[messages.length - 1];
    const reqBody = {
      conversationId,
      model: modelId,
      messages: [{ role: userMessage?.role || "user", content: userMessage?.content || "" }],
      stream: wantStream,
    };

    let upstream: Response;
    try {
      upstream = await fetch(PI_MESSAGES_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal,
      });
    } catch (err) {
      return makeErrorResult("FETCH_ERROR", String(err));
    }

    if (!upstream.ok) {
      if (upstream.status === 401 || upstream.status === 403) {
        return {
          response: new Response(
            JSON.stringify({
              error: { message: "Session expired", type: "auth_error", code: "session_expired" },
            }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          ),
          requestId: crypto.randomUUID(),
        };
      }
      const errText = await upstream.text().catch(() => "Unknown error");
      return makeErrorResult("UPSTREAM_ERROR", errText || `HTTP ${upstream.status}`);
    }

    // Non-streaming
    if (!wantStream) {
      const json = (await upstream.json()) as Record<string, unknown>;
      return {
        response: new Response(JSON.stringify(json), {
          headers: { "Content-Type": "application/json" },
        }),
        requestId: crypto.randomUUID(),
      };
    }

    // Streaming
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
                const text = parsed.choices?.[0]?.delta?.content || parsed.text || "";
                if (text) {
                  const chunk = {
                    id: `chatcmpl-pi-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model: modelId,
                    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                }
              } catch {
                // skip parse errors
              }
            }
          }
          if (buffer.trim()) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return {
      response: new Response(stream, {
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
