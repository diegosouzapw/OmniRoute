/**
 * CharacterWebExecutor — Character.AI Chat API
 *
 * Routes requests through Character.AI's neo chat API.
 * Supports custom characters and NSFW content.
 *
 * Endpoint: POST https://neo.character.ai/chat/
 * Auth: char_token from localStorage or session cookie
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";

const CAI_API_BASE = "https://neo.character.ai/chat/";
const CAI_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

interface CharacterAuthor {
  name: string;
  [key: string]: unknown;
}

interface CharacterContent {
  text: string;
  [key: string]: unknown;
}

interface CharacterMessage {
  author: CharacterAuthor;
  content: CharacterContent;
}

interface CharacterRequestBody {
  character_id?: string;
  model: string;
  messages: CharacterMessage[];
  stream: boolean;
}

export class CharacterWebExecutor extends BaseExecutor {
  constructor() {
    super("character-web", { id: "character-web", baseUrl: "https://character.ai" });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = normalizeSessionCookieHeader(
      String(credentials?.apiKey ?? "").trim(),
      "char_token"
    );

    const messages = (bodyObj.messages as Array<{ role: string; content: string }>) || [];
    const modelId = (bodyObj.model as string) || "character-default";
    const characterId = bodyObj.character_id as string | undefined;

    const reqBody: CharacterRequestBody = {
      model: modelId,
      messages: messages.map((m) => ({
        author: { name: m.role === "assistant" ? "AI" : "You" },
        content: { text: m.content },
      })),
      stream: wantStream,
    };
    if (characterId) reqBody.character_id = characterId;

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": CAI_USER_AGENT,
      Accept: wantStream ? "application/x-ndjson" : "application/json",
      Referer: "https://character.ai/",
      Origin: "https://character.ai",
    };
    if (rawCookie) reqHeaders.Cookie = rawCookie;

    let upstream: Response;
    try {
      upstream = await fetch(CAI_API_BASE, {
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
      return makeErrorResult("UPSTREAM_ERROR", text || `HTTP ${upstream.status}`);
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

    // Streaming (NDJSON format)
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
              if (!line.trim()) continue;
              try {
                const parsed = JSON.parse(line);
                if (parsed.replies && Array.isArray(parsed.replies)) {
                  for (const reply of parsed.replies) {
                    if (reply.text) {
                      const chunk = {
                        id: `chatcmpl-character-${Date.now()}`,
                        object: "chat.completion.chunk",
                        created: Math.floor(Date.now() / 1000),
                        model: modelId,
                        choices: [
                          { index: 0, delta: { content: reply.text }, finish_reason: null },
                        ],
                      };
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    }
                  }
                } else if (parsed.text) {
                  const chunk = {
                    id: `chatcmpl-character-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model: modelId,
                    choices: [{ index: 0, delta: { content: parsed.text }, finish_reason: null }],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                }
              } catch {
                // Skip non-JSON lines
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
