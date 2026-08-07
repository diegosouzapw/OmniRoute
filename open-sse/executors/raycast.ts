/**
 * @file raycast.ts
 * @description Executor for Raycast Pro AI (reverse-engineered backend.raycast.com API).
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast Pro local-dev executor
 */

import { BaseExecutor, mergeUpstreamExtraHeaders, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  RAYCAST_CHAT_URL,
  buildRaycastChatBody,
  buildRaycastHeaders,
  parseRaycastSseText,
} from "../services/raycast.ts";

type JsonRecord = Record<string, unknown>;
type ChatMessage = { role?: string; content?: unknown };

export class RaycastExecutor extends BaseExecutor {
  constructor() {
    super("raycast", PROVIDERS.raycast);
  }

  buildUrl(): string {
    return RAYCAST_CHAT_URL;
  }

  buildHeaders(credentials: ProviderCredentials, payload?: string): Record<string, string> {
    const body = payload || "{}";
    return buildRaycastHeaders(body, credentials as JsonRecord);
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }) {
    const reqBody = body as { messages?: ChatMessage[]; temperature?: number };
    let payload: string;

    try {
      payload = buildRaycastChatBody(model as string, reqBody.messages || [], reqBody.temperature);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        response: new Response(
          JSON.stringify({
            error: { message: sanitizeErrorMessage(message), type: "invalid_request_error", code: "" },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        ),
        url: RAYCAST_CHAT_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const headers = this.buildHeaders(credentials as ProviderCredentials, payload);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders as Record<string, string> | null);

    let raycastResponse: Response;
    try {
      raycastResponse = await fetch(RAYCAST_CHAT_URL, {
        method: "POST",
        headers,
        body: payload,
        signal: signal || undefined,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        response: new Response(
          JSON.stringify({
            error: { message: sanitizeErrorMessage(message), type: "api_error", code: "" },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
        url: RAYCAST_CHAT_URL,
        headers,
        transformedBody: payload,
      };
    }

    if (!raycastResponse.ok) {
      const errorText = await raycastResponse.text();
      return {
        response: new Response(
          JSON.stringify({
            error: {
              message: sanitizeErrorMessage(`Raycast API error (${raycastResponse.status})`),
              type: "api_error",
              code: String(raycastResponse.status),
            },
          }),
          { status: raycastResponse.status, headers: { "Content-Type": "application/json" } }
        ),
        url: RAYCAST_CHAT_URL,
        headers,
        transformedBody: payload,
      };
    }

    const responseId = `chatcmpl-raycast-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);
    const modelId = model as string;

    if (stream !== false) {
      const raycastBody = raycastResponse.body;
      if (!raycastBody) {
        return {
          response: new Response(
            JSON.stringify({
              error: { message: "Raycast returned empty stream body", type: "api_error", code: "" },
            }),
            { status: 502, headers: { "Content-Type": "application/json" } }
          ),
          url: RAYCAST_CHAT_URL,
          headers,
          transformedBody: payload,
        };
      }

      const sseStream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const reader = raycastBody.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              let newlineIndex: number;
              while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
                const line = buffer.slice(0, newlineIndex).trim();
                buffer = buffer.slice(newlineIndex + 1);
                if (!line.startsWith("data:")) continue;

                try {
                  const data = JSON.parse(line.slice(5).trim()) as {
                    text?: string;
                    finish_reason?: string | null;
                    complete?: boolean;
                  };
                  const hasContent = typeof data.text === "string" && data.text.length > 0;
                  const hasFinishReason =
                    data.finish_reason !== undefined && data.finish_reason !== null;
                  if (data.complete || (!hasContent && !hasFinishReason)) continue;

                  const chunk = {
                    id: responseId,
                    object: "chat.completion.chunk",
                    created,
                    model: modelId,
                    choices: [
                      {
                        index: 0,
                        delta: { content: data.text || "" },
                        finish_reason: hasFinishReason ? data.finish_reason : null,
                      },
                    ],
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                } catch {
                  // Ignore malformed SSE data.
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
        response: new Response(sseStream, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: RAYCAST_CHAT_URL,
        headers,
        transformedBody: payload,
      };
    }

    const responseText = await raycastResponse.text();
    const content = parseRaycastSseText(responseText);

    return {
      response: new Response(
        JSON.stringify({
          id: responseId,
          object: "chat.completion",
          created,
          model: modelId,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content, refusal: null },
              finish_reason: "stop",
            },
          ],
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
      url: RAYCAST_CHAT_URL,
      headers,
      transformedBody: payload,
    };
  }
}
