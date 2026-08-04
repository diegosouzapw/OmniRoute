/**
 * ZenmuxFreeExecutor — ZenMux Free (web-cookie) provider
 *
 * Accesses ZenMux's free-tier LLM gateway via session cookies exported from
 * the browser. Uses ZenMux's Anthropic-compatible SSE endpoint, translating
 * the response to OpenAI-format chunks for OmniRoute consumers.
 *
 * Endpoint: POST https://zenmux.ai/api/anthropic/v1/messages
 * Auth: Full cookie header string from zenmux.ai (must include ctoken)
 */
import { randomUUID } from "crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, normalizeCookie } from "../utils/error.ts";

const CHAT_URL = "https://zenmux.ai/api/anthropic/v1/messages";
const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

function extractCtoken(cookieStr: string): string {
  const m = cookieStr.match(/ctoken=([^;]+)/);
  return m ? m[1] : "";
}

export class ZenmuxFreeExecutor extends BaseExecutor {
  constructor() {
    super("zenmux-free", { id: "zenmux-free", baseUrl: CHAT_URL });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const rawCookie = normalizeCookie(String(credentials?.apiKey ?? "").trim());
    const ctoken = extractCtoken(rawCookie);
    if (!ctoken) {
      return makeErrorResult(
        401,
        "ZenMux Free: ctoken not found in cookies. Export all cookies from zenmux.ai and paste as the credential.",
        body,
        CHAT_URL
      );
    }

    const messages = (
      bodyObj.messages as Array<{ role: string; content: unknown }>
    ) || [];
    const modelId = (bodyObj.model as string) || "deepseek/deepseek-chat";
    const maxTokens = (bodyObj.max_tokens as number) || 4096;

    // Flatten messages into a single user text to accommodate ZenMux's
    // Anthropic-compatible endpoint (which is the upstream's pattern).
    const userMessages = messages.filter((m) => m.role === "user");
    const sysMessages = messages.filter((m) => m.role === "system");
    const lastUser = userMessages[userMessages.length - 1];
    const userText =
      typeof lastUser?.content === "string"
        ? lastUser.content
        : JSON.stringify(lastUser?.content ?? "Hello");
    const sysText =
      sysMessages.length > 0
        ? typeof sysMessages[0].content === "string"
          ? sysMessages[0].content
          : JSON.stringify(sysMessages[0].content)
        : null;
    const fullText = sysText ? `${sysText}\n\n${userText}` : userText;

    const reqId = randomUUID().replace(/-/g, "");

    const anthropicBody: Record<string, unknown> = {
      model: modelId,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: [{ type: "text", text: fullText }] }],
      stream: true,
    };
    if (bodyObj.temperature !== undefined) anthropicBody.temperature = bodyObj.temperature;

    const url = new URL(CHAT_URL);
    url.searchParams.set("ctoken", ctoken);

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Accept: "text/event-stream",
      Origin: "https://zenmux.ai",
      Referer: "https://zenmux.ai/platform/chat",
      "anthropic-version": "2023-06-01",
      "chat-request-id": reqId,
      "x-zenmux-accept-processing": "true, true",
      "x-zenmux-apikey-source": "subscription",
    };
    if (rawCookie) reqHeaders.Cookie = rawCookie;

    let upstream: Response;
    try {
      upstream = await fetch(url.toString(), {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(anthropicBody),
        signal,
      });
    } catch (err) {
      return makeErrorResult(
        502,
        `ZenMux Free fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
        body,
        CHAT_URL
      );
    }

    if (!upstream.ok) {
      if (upstream.status === 401 || upstream.status === 403) {
        return makeErrorResult(401, "ZenMux Free: cookies expired or invalid", body, CHAT_URL);
      }
      if (upstream.status === 402) {
        return makeErrorResult(402, "ZenMux Free: free-tier quota exhausted", body, CHAT_URL);
      }
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `ZenMux Free error: ${errText}`, body, CHAT_URL);
    }

    const cid = `chatcmpl-zmf-${randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    if (!wantStream) {
      // Collect SSE text from the Anthropic-format stream
      const txt = await collectText(upstream.body);
      return {
        response: new Response(
          JSON.stringify({
            id: cid,
            object: "chat.completion",
            created,
            model: modelId,
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: txt },
                finish_reason: "stop",
              },
            ],
            usage: { prompt_tokens: 0, completion_tokens: Math.ceil(txt.length / 4), total_tokens: 0 },
          }),
          { headers: { "Content-Type": "application/json" } }
        ),
        url: CHAT_URL,
        headers: reqHeaders,
        transformedBody: anthropicBody,
      };
    }

    // Streaming: translate Anthropic SSE → OpenAI SSE
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const responseStream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        // Send role delta first
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model: modelId,
              choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
            })}\n\n`
          )
        );
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              const t = line.trim();
              if (!t.startsWith("data: ")) continue;
              const raw = t.slice(6);
              if (raw === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const d = JSON.parse(raw) as Record<string, unknown>;
                const delta = d.delta as Record<string, unknown> | undefined;
                if (d.type === "content_block_delta" && delta) {
                  const text = (delta.text as string) || (delta.thinking as string) || "";
                  if (text) {
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({
                          id: cid,
                          object: "chat.completion.chunk",
                          created,
                          model: modelId,
                          choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
                        })}\n\n`
                      )
                    );
                  }
                } else if (d.type === "message_delta" && delta) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        id: cid,
                        object: "chat.completion.chunk",
                        created,
                        model: modelId,
                        choices: [
                          {
                            index: 0,
                            delta: {},
                            finish_reason: (delta.stop_reason as string) || "stop",
                          },
                        ],
                      })}\n\n`
                    )
                  );
                }
              } catch {
                // malformed SSE chunk — skip silently
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
      response: new Response(responseStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }),
      url: CHAT_URL,
      headers: reqHeaders,
      transformedBody: anthropicBody,
    };
  }
}

/** Collect text from an Anthropic-format SSE stream body. */
async function collectText(body: ReadableStream<Uint8Array> | null): Promise<string> {
  if (!body) return "";
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let txt = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() || "";
    for (const ln of lines) {
      const t = ln.trim();
      if (!t.startsWith("data: ")) continue;
      try {
        const d = JSON.parse(t.slice(6)) as Record<string, unknown>;
        const delta = d.delta as Record<string, unknown> | undefined;
        if (d.type === "content_block_delta" && delta) {
          txt += (delta.text as string) || (delta.thinking as string) || "";
        }
      } catch {
        // skip
      }
    }
  }
  return txt;
}
