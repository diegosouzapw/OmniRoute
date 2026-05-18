/**
 * GeminiWebExecutor — Gemini Web Session Provider
 *
 * Routes requests through Google Gemini's web interface using browser
 * cookies, translating between OpenAI chat completions format and
 * Gemini's internal web protocol.
 *
 * Derived from:
 *   - HanaokaYuzu/Gemini-API (reverse-engineered Python API, 3k stars)
 *   - Nativu5/Gemini-FastAPI (OpenAI-compatible wrapper, 646 stars)
 *   - XxxXTeam/geminiweb2api (Go proxy, 54 stars)
 *   - ntthanh2603/gemini-web-to-api (Go proxy, 193 stars)
 *
 * Auth: Cookie-based (__Secure-1PSID + __Secure-1PSIDTS from gemini.google.com)
 */

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const GEMINI_API_URL = "https://gemini.google.com/app";
const GEMINI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

// ─── Model mappings ─────────────────────────────────────────────────────────
// Gemini web exposes models based on account tier. Map OmniRoute model IDs
// to Gemini's internal model identifiers.

interface GeminiModelInfo {
  modelId: string;
  displayName: string;
}

const MODEL_MAP: Record<string, GeminiModelInfo> = {
  "gemini-2.5-pro": { modelId: "gemini-2.5-pro", displayName: "Gemini 2.5 Pro" },
  "gemini-2.5-flash": { modelId: "gemini-2.5-flash", displayName: "Gemini 2.5 Flash" },
  "gemini-2.0-pro": { modelId: "gemini-2.0-pro", displayName: "Gemini 2.0 Pro" },
  "gemini-2.0-flash": { modelId: "gemini-2.0-flash", displayName: "Gemini 2.0 Flash" },
  "gemini-1.5-pro": { modelId: "gemini-1.5-pro", displayName: "Gemini 1.5 Pro" },
  "gemini-1.5-flash": { modelId: "gemini-1.5-flash", displayName: "Gemini 1.5 Flash" },
};

// ─── Types ──────────────────────────────────────────────────────────────────

interface GeminiMessage {
  role: string;
  content: string;
}

interface GeminiRequestBody {
  messages: GeminiMessage[];
  model?: string;
  stream?: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Build cookie string from credentials.
 * apiKey contains the raw cookie value(s) from gemini.google.com.
 * Format: "__Secure-1PSID=value" or "__Secure-1PSID=value; __Secure-1PSIDTS=value"
 */
function buildCookieString(credentials: { apiKey?: string }): string {
  return credentials.apiKey || "";
}

/**
 * Map OpenAI messages to Gemini format.
 */
function mapMessages(messages: GeminiMessage[]): GeminiMessage[] {
  return messages.map((msg) => ({
    role: msg.role === "system" ? "user" : msg.role,
    content: msg.content,
  }));
}

/**
 * Format response as OpenAI chat completion.
 */
function formatChatCompletion(content: string, model: string, finishReason: string = "stop") {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content,
        },
        finish_reason: finishReason,
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  };
}

/**
 * Format streaming chunk as OpenAI SSE.
 */
function formatStreamChunk(content: string, model: string, finishReason: string | null = null) {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        delta: content ? { content } : {},
        finish_reason: finishReason,
      },
    ],
  };
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class GeminiWebExecutor extends BaseExecutor {
  constructor() {
    super("gemini-web", { id: "gemini-web", baseUrl: GEMINI_API_URL });
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal } = input;
    const requestBody = body as GeminiRequestBody;

    // Build cookie string
    const cookie = buildCookieString(credentials);
    if (!cookie) {
      return {
        response: new Response(JSON.stringify({ error: "Missing Gemini cookies" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
        url: GEMINI_API_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Get model info
    const modelInfo = MODEL_MAP[model] || MODEL_MAP["gemini-2.5-pro"];

    // Map messages
    const messages = mapMessages(requestBody.messages || []);

    try {
      // Build request to Gemini web backend
      const geminiPayload = {
        messages: messages.map((m) => [m.content]),
        model: modelInfo.modelId,
      };

      const requestHeaders: Record<string, string> = {
        Cookie: cookie,
        "User-Agent": GEMINI_USER_AGENT,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(geminiPayload),
        signal: signal || AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (!response.ok) {
        return {
          response: new Response(JSON.stringify({ error: `Gemini returned ${response.status}` }), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
          }),
          url: GEMINI_API_URL,
          headers: requestHeaders,
          transformedBody: geminiPayload,
        };
      }

      if (stream) {
        // Return streaming response
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
          async start(controller) {
            try {
              const reader = response.body?.getReader();
              if (!reader) {
                controller.close();
                return;
              }

              const decoder = new TextDecoder();
              let buffer = "";

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  if (line.trim()) {
                    try {
                      const data = JSON.parse(line);
                      const content = data.result?.response?.text || "";
                      if (content) {
                        const chunk = formatStreamChunk(content, model);
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                      }
                    } catch {
                      // Skip invalid JSON lines
                    }
                  }
                }

                // Send done signal
                const doneChunk = formatStreamChunk("", model, "stop");
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(doneChunk)}\n\n`));
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              }

              controller.close();
            } catch (error) {
              controller.error(error);
            }
          },
        });

        return {
          response: new Response(readable, {
            status: 200,
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          }),
          url: GEMINI_API_URL,
          headers: requestHeaders,
          transformedBody: geminiPayload,
        };
      } else {
        // Return non-streaming response
        const data = await response.json();
        const content = data.result?.response?.text || "";
        const completion = formatChatCompletion(content, model);

        return {
          response: new Response(JSON.stringify(completion), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
          url: GEMINI_API_URL,
          headers: requestHeaders,
          transformedBody: geminiPayload,
        };
      }
    } catch (error) {
      return {
        response: new Response(
          JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown error",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        ),
        url: GEMINI_API_URL,
        headers: {},
        transformedBody: body,
      };
    }
  }
}
