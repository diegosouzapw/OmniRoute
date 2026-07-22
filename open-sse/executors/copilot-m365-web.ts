import WebSocket from "ws";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { BaseExecutor, type ExecuteInput, type ExecutorLog } from "./base.ts";
import {
  buildPrompt,
  buildWsUrl,
  redactWsUrl,
  resolveConnectionParams,
} from "./copilot-m365-connection.ts";
import {
  accumulateBotContent,
  buildChatInvocation,
  encodeFrame,
  extractFinalResultMessage,
  handshakeError,
  handshakeFrame,
  isCompletionFrame,
  isUpdateFrame,
  keepaliveFrame,
  parseFrame,
  resolveChatInvocationOverrides,
  resolveToneForModel,
  splitFrames,
} from "./copilot-m365-frames.ts";

type JsonRecord = Record<string, unknown>;
let WebSocketCtor: typeof WebSocket = WebSocket;

export function __setCopilotM365WebSocketForTesting(ctor: typeof WebSocket): () => void {
  const previous = WebSocketCtor;
  WebSocketCtor = ctor;
  return () => {
    WebSocketCtor = previous;
  };
}

function sseChunk(model: string, delta: JsonRecord, finishReason: string | null = null): string {
  return `data: ${JSON.stringify({
    id: `chatcmpl-copilot-m365-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

/**
 * Describe an unrecognized `type:1 target:update` frame by its top-level argument keys
 * only (#7858 AC: log shape, never content/tokens/cookies) so the next unrecognized-shape
 * report arrives with the data needed to add a handler.
 */
function describeUpdateFrameShape(frame: Record<string, unknown> | null): string | null {
  if (!isUpdateFrame(frame) || !frame) return null;
  const args = frame.arguments;
  const first = Array.isArray(args) ? (args[0] as Record<string, unknown> | undefined) : undefined;
  if (!first) return null;
  return Object.keys(first).join(",");
}

function errorResponse(message: string, status = 502): Response {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export class CopilotM365WebExecutor extends BaseExecutor {
  constructor() {
    super("copilot-m365-web", { id: "copilot-m365-web", baseUrl: "wss://substrate.office.com" });
  }

  private async wsChat(input: {
    wsUrl: string;
    prompt: string;
    model: string;
    tier?: string;
    signal?: AbortSignal;
    log?: ExecutorLog | null;
  }): Promise<ReadableStream<Uint8Array>> {
    // #6210 — observability for the empty-response class. The access_token rides
    // in the WS query string, so every URL logged here goes through redactWsUrl().
    const log = input.log ?? null;
    return new ReadableStream<Uint8Array>(
      {
        start: async (controller) => {
          const encoder = new TextEncoder();
          let ws: WebSocket | null = null;
          let settled = false;
          let buffer = "";
          let previousText = "";
          let finalResultMessage = "";
          let handshakeComplete = false;

          const cleanup = () => {
            if (ws) {
              try {
                ws.close();
              } catch {
                /* ignore */
              }
              ws = null;
            }
          };

          const finish = () => {
            if (settled) return;
            settled = true;
            cleanup();
            // Last-resort fallback (#6210): some EDU turns surface the answer only in the
            // type:2 invocation result. Emit it if nothing was streamed.
            if (!previousText && finalResultMessage) {
              controller.enqueue(
                encoder.encode(sseChunk(input.model, { content: finalResultMessage }))
              );
            } else if (!previousText && !finalResultMessage) {
              // #7858 — a turn that completed with no content in ANY known shape is
              // indistinguishable, from the outside, from a genuine successful-but-empty
              // reply. Fail loudly instead of a silent `stop`, per Hard Rule #12.
              const tierNote = input.tier ? `resolved tier: ${input.tier}` : "resolved tier: individual (default)";
              const message = sanitizeErrorMessage(
                `Microsoft 365 Copilot turn completed with no content in any known frame ` +
                  `shape (${tierNote}). Possible causes: an unrecognized frame shape for ` +
                  `this tenant, or a misconfigured tier.`
              );
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ error: { message } })}\n\n`)
              );
              controller.close();
              return;
            }
            controller.enqueue(encoder.encode(sseChunk(input.model, {}, "stop")));
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          };

          const abort = (reason: string) => {
            if (settled) return;
            settled = true;
            cleanup();
            const message = sanitizeErrorMessage(reason);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: { message } })}\n\n`));
            controller.close();
          };

          input.signal?.addEventListener("abort", () => abort("Request aborted"), { once: true });

          const timeout = setTimeout(
            () => abort("Microsoft 365 Copilot WebSocket timeout"),
            FETCH_TIMEOUT_MS
          );

          try {
            const wsUrlParts = new URL(input.wsUrl);
            const traceId = wsUrlParts.searchParams.get("clientrequestid") ?? crypto.randomUUID().replace(/-/g, "");
            const sessionId = wsUrlParts.searchParams.get("X-SessionId") ?? crypto.randomUUID();

            log?.debug?.("M365_WS", `connecting → ${redactWsUrl(input.wsUrl)}`);

            ws = new WebSocketCtor(input.wsUrl, {
              headers: {
                Origin: "https://m365.cloud.microsoft",
                "User-Agent":
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
              },
            });

            const sendChat = () => {
              ws?.send(keepaliveFrame());
              const overrides = resolveChatInvocationOverrides(input.tier);
              // Model-driven tone (#7872) wins over the tier default; a bare/unknown id
              // keeps the tier tone resolved above.
              const tone = resolveToneForModel(input.model) ?? overrides.tone;
              ws?.send(
                encodeFrame(
                  buildChatInvocation({
                    text: input.prompt,
                    traceId,
                    sessionId,
                    isStartOfSession: true,
                    ...overrides,
                    tone,
                  })
                )
              );
            };

            ws.on("open", () => {
              log?.debug?.("M365_WS", "socket open — sending handshake");
              ws?.send(handshakeFrame());
            });

            ws.on("message", (data) => {
              if (settled) return;
              buffer += data.toString();
              const split = splitFrames(buffer);
              buffer = split.rest;

              for (const rawFrame of split.frames) {
                const frame = parseFrame(rawFrame);
                log?.debug?.(
                  "M365_WS",
                  `frame type=${String(frame?.type)} target=${String(frame?.target)}`
                );
                if (!handshakeComplete) {
                  const err = handshakeError(frame);
                  if (err) {
                    clearTimeout(timeout);
                    log?.debug?.("M365_WS", `handshake failed: ${err}`);
                    abort(`Microsoft 365 Copilot handshake failed: ${err}`);
                    return;
                  }
                  handshakeComplete = true;
                  log?.debug?.("M365_WS", "handshake complete — sending chat invocation");
                  sendChat();
                  continue;
                }

                const { delta, next } = accumulateBotContent(previousText, frame);
                if (!delta && next === previousText) {
                  // #7858 AC2/AC3 — log unrecognized-shape update frames by KEY only, so
                  // the next report ships the data needed to add a handler without a
                  // manual capture round-trip. Never log message content, tokens, cookies.
                  const shape = describeUpdateFrameShape(frame);
                  if (shape) log?.debug?.("M365_WS", `unrecognized update frame keys: ${shape}`);
                }
                previousText = next;
                if (delta) {
                  controller.enqueue(encoder.encode(sseChunk(input.model, { content: delta })));
                }

                const finalMsg = extractFinalResultMessage(frame);
                if (finalMsg) {
                  finalResultMessage = finalMsg;
                }

                if (isCompletionFrame(frame)) {
                  clearTimeout(timeout);
                  finish();
                  return;
                }
              }
            });

            ws.on("error", (err) => {
              clearTimeout(timeout);
              log?.debug?.(
                "M365_WS",
                `socket error: ${err instanceof Error ? err.message : String(err)}`
              );
              abort(
                sanitizeErrorMessage(
                  err instanceof Error ? err.message : "Microsoft 365 Copilot WebSocket error"
                )
              );
            });

            ws.on("close", () => {
              clearTimeout(timeout);
              finish();
            });
          } catch (err) {
            clearTimeout(timeout);
            abort(
              sanitizeErrorMessage(
                err instanceof Error ? err.message : "Failed to connect to Microsoft 365 Copilot"
              )
            );
          }
        },
      },
      { highWaterMark: 16384 }
    );
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const body = input.body as JsonRecord | undefined;
    const model = input.model || (body?.model as string) || "copilot-m365";
    const stream = input.stream !== false;
    const prompt = buildPrompt(body).trim();

    if (!prompt) {
      return {
        response: errorResponse("No user message provided", 400),
        url: "wss://substrate.office.com/m365Copilot/Chathub",
        headers: {},
        transformedBody: null,
      };
    }

    const connectionParams = resolveConnectionParams(input.credentials);
    if ("error" in connectionParams) {
      return {
        response: errorResponse(connectionParams.error, 400),
        url: "wss://substrate.office.com/m365Copilot/Chathub",
        headers: {},
        transformedBody: { model, prompt: prompt.slice(0, 100) },
      };
    }

    const wsUrl = buildWsUrl(connectionParams);

    try {
      const wsStream = await this.wsChat({
        wsUrl,
        prompt,
        model,
        tier: connectionParams.tier,
        signal: input.signal ?? undefined,
        log: input.log,
      });

      if (stream) {
        return {
          response: new Response(wsStream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          }),
          url: redactWsUrl(wsUrl),
          headers: {},
          transformedBody: { model, prompt: prompt.slice(0, 100) },
        };
      }

      const reader = wsStream.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (typeof content === "string") fullText += content;
          } catch {
            /* skip malformed SSE lines */
          }
        }
      }

      return {
        response: new Response(
          JSON.stringify({
            id: `chatcmpl-copilot-m365-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model,
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: fullText || "(empty response)" },
                finish_reason: "stop",
              },
            ],
            usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
          }),
          { headers: { "Content-Type": "application/json" } }
        ),
        url: redactWsUrl(wsUrl),
        headers: {},
        transformedBody: { model, prompt: prompt.slice(0, 100) },
      };
    } catch (err) {
      const message = sanitizeErrorMessage(
        err instanceof Error ? err.message : "Microsoft 365 Copilot executor error"
      );
      return {
        response: errorResponse(message),
        url: redactWsUrl(wsUrl),
        headers: {},
        transformedBody: { model, prompt: prompt.slice(0, 100) },
      };
    }
  }
}
