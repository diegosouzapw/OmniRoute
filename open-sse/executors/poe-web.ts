/**
 * PoeWebExecutor — Multi-Model Chat via poe.com subscription
 *
 * Routes requests through Poe's GraphQL API.
 * Requires Poe subscription ($20/month) for full model access.
 *
 * Endpoint: POST https://www.poe.com/api/gql_POST
 * Auth: p-b cookie from poe.com
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, normalizeCookie } from "../utils/error.ts";

const BASE_URL = "https://www.poe.com";
const GQL_URL = `${BASE_URL}/api/gql_POST`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

// Model name mapping: OmniRoute ID -> Poe bot name
const MODEL_MAP: Record<string, string> = {
  "gpt-4o": "GPT-4o",
  "gpt-4-turbo": "GPT-4-Turbo",
  "claude-3.5-sonnet": "Claude-3.5-Sonnet",
  "claude-3-opus": "Claude-3-Opus",
  "gemini-2.0-flash": "Gemini-2.0-Flash",
  "llama-3-70b": "Llama-3-70B",
  "mixtral-8x22b": "Mixtral-8x22B",
  "poe-default": "Assistant",
};

function extractPbCookie(raw: string): string {
  const match = raw.match(/p-b=([^;]+)/);
  return match ? match[1] : raw;
}

export class PoeWebExecutor extends BaseExecutor {
  constructor() {
    super("poe-web", { id: "poe-web", baseUrl: "https://www.poe.com" });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawCookie = normalizeCookie(String(credentials?.apiKey ?? "").trim());
    const pbCookie = extractPbCookie(rawCookie);

    const messages = (bodyObj.messages as Array<{ role: string; content: string }>) || [];
    const requestedModel = (bodyObj.model as string) || "poe-default";
    const botName = MODEL_MAP[requestedModel] || requestedModel;

    // Build Poe GraphQL query for chat
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    const prompt = lastUserMsg?.content || "";

    const gqlBody = {
      operationName: "ChatViewQuery",
      query: `query ChatViewQuery($bot: String!, $query: String!) {
        chatWithBot(bot: $bot, query: $query) {
          messageId
          text
          state
        }
      }`,
      variables: { bot: botName, query: prompt },
    };

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Accept: "application/json",
      Referer: `${BASE_URL}/`,
      Origin: BASE_URL,
      Cookie: `p-b=${pbCookie}`,
    };

    let upstream: Response;
    try {
      upstream = await fetch(GQL_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(gqlBody),
        signal,
      });
    } catch (err) {
      return makeErrorResult(
        502,
        `Poe fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        GQL_URL
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `Poe error: ${errText}`, body, GQL_URL);
    }

    // Poe returns JSON (not SSE) — parse and return
    const data = (await upstream.json()) as Record<string, unknown>;
    const inner = (data.data ?? {}) as Record<string, unknown>;
    const chatData = (inner.chatWithBot ?? {}) as Record<string, unknown>;
    const text = (chatData.text as string) || "";

    if (!wantStream) {
      return {
        response: new Response(
          JSON.stringify({
            id: `chatcmpl-poe-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: requestedModel,
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: text },
                finish_reason: "stop",
              },
            ],
          }),
          { headers: { "Content-Type": "application/json" } }
        ),
        url: GQL_URL,
        headers: reqHeaders,
        transformedBody: gqlBody,
      };
    }

    // Streaming: emit single chunk with full response
    const encoder = new TextEncoder();
    const chunk = {
      id: `chatcmpl-poe-${Date.now()}`,
      object: "chat.completion.chunk",
      created: Math.floor(Date.now() / 1000),
      model: requestedModel,
      choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
    };

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
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
      url: GQL_URL,
      headers: reqHeaders,
      transformedBody: gqlBody,
    };
  }
}
