import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "../base.ts";
import { OMNIROUTE_VERSION } from "@/shared/constants/version.ts";
import { getProxyForAccount } from "../../utils/proxyFallback.ts";
import { HttpsProxyAgent } from "https-proxy-agent";
import crypto from "node:crypto";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usage/callLogArtifacts.ts";
import { streamWithTimeout } from "../../utils/stream.ts";
import { ANTIGRAVITY_CONFIG } from "../../config/errorConfig.ts";
import {
  storeChatGptImage,
  getChatGptImageConversationContext,
  __resetChatGptImageCacheForTesting,
  type ChatGptImageConversationContext,
} from "../../services/chatgptImageCache.ts";

import { ImagePointerRef, ImageResolver, imageMarkdown, resolveImagePointers } from "./images.ts";
import { sseChunk } from "./sse.ts";
import { cleanChatGptText } from "./utils.ts";

export function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  resolver: ImageResolver | null,
  // Optional poller for async image_gen — when ChatGPT processes the request
  // out-of-band ("Lots of people are creating images right now"), the SSE
  // stream finishes without an image_asset_pointer. The executor passes a
  // closure here that knows how to poll the conversation endpoint.
  pollAsyncImage: ((conversationId: string) => Promise<ImagePointerRef[]>) | null,
  log: { warn?: (tag: string, msg: string) => void } | null,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream(
    {
      async start(controller) {
        try {
          controller.enqueue(
            encoder.encode(
              sseChunk({
                id: cid,
                object: "chat.completion.chunk",
                created,
                model,
                system_fingerprint: null,
                choices: [
                  { index: 0, delta: { role: "assistant" }, finish_reason: null, logprobs: null },
                ],
              })
            )
          );

          let conversationId: string | null = null;
          let imagePointers: ImagePointerRef[] | undefined;
          let imageGenAsync = false;
          let parentCandidateMessageId: string | null = null;

          for await (const chunk of extractContent(eventStream, signal)) {
            if (chunk.conversationId) conversationId = chunk.conversationId;
            if (chunk.messageId) parentCandidateMessageId = chunk.messageId;
            if (chunk.error) {
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: null,
                    choices: [
                      {
                        index: 0,
                        delta: { content: `[Error: ${chunk.error}]` },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
              break;
            }

            if (chunk.done) {
              imagePointers = chunk.imagePointers;
              imageGenAsync = chunk.imageGenAsync ?? false;
              if (chunk.messageId) parentCandidateMessageId = chunk.messageId;
              break;
            }

            if (chunk.delta) {
              const cleaned = cleanChatGptText(chunk.delta);
              if (cleaned) {
                controller.enqueue(
                  encoder.encode(
                    sseChunk({
                      id: cid,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      system_fingerprint: null,
                      choices: [
                        {
                          index: 0,
                          delta: { content: cleaned },
                          finish_reason: null,
                          logprobs: null,
                        },
                      ],
                    })
                  )
                );
              }
            }
          }

          // If the assistant kicked off the async image_gen tool, the SSE
          // stream ends with a "Processing image..." placeholder. Poll the
          // conversation endpoint in the background for the final pointer.
          // We only kick polling off if the in-stream pointers are empty —
          // sometimes the synchronous path also fires and we already have one.
          // Heartbeat helper: while we wait on long-running async work
          // (WebSocket for image-gen, /files/download → 2-3 MB image fetch),
          // the SSE stream goes quiet and Open WebUI's HTTP client times out
          // at ~30s. We saw this in production: `disconnect: ResponseAborted`
          // followed by "Controller is already closed".
          //
          // Layered traps to avoid:
          //   - SSE comments (`: ...`) are silently ignored by aiohttp's
          //     read-activity tracker.
          //   - Empty `delta:{}` chunks ARE emitted by us but get filtered
          //     out upstream by `hasValuableContent` in
          //     `open-sse/utils/streamHelpers.ts` (it requires content,
          //     role, or finish_reason on OpenAI chunks).
          //
          // So heartbeats are zero-width-space content deltas (`"​"`):
          // they pass the valuable-content filter (non-empty content), reach
          // the client as data events, and render as nothing visible.
          const startHeartbeat = (intervalMs = 5_000): (() => void) => {
            const heartbeatChunk = sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [{ index: 0, delta: { content: "​" }, finish_reason: null, logprobs: null }],
            });
            const timer = setInterval(() => {
              try {
                controller.enqueue(encoder.encode(heartbeatChunk));
              } catch {
                // Controller may already be closed if the client disconnected
                // — just stop firing.
                console.warn("[chatgpt-web] heartbeat enqueue failed - controller closed");
                clearInterval(timer);
              }
            }, intervalMs);
            return () => clearInterval(timer);
          };

          if (
            imageGenAsync &&
            conversationId &&
            (!imagePointers || imagePointers.length === 0) &&
            pollAsyncImage
          ) {
            // Tell the user something is happening — long polls otherwise
            // look like a hang on the client side. The "..." plus a typing
            // cue renders nicely in Open WebUI.
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: null,
                  choices: [
                    {
                      index: 0,
                      delta: { content: "_Generating image…_\n\n" },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
            const stopHb = startHeartbeat();
            try {
              const polled = await pollAsyncImage(conversationId);
              if (polled.length > 0) imagePointers = polled;
            } catch (err) {
              log?.warn?.(
                "CGPT-WEB",
                `Async image poll failed: ${err instanceof Error ? err.message : String(err)}`
              );
            } finally {
              stopHb();
            }
          }

          // Resolve and append any image markdown after the text deltas finish
          // streaming. Downloading and caching the image bytes can take 1-3
          // seconds for big images, so keep the heartbeat running here too.
          const stopHb2 = startHeartbeat();
          let urls: string[] = [];
          try {
            urls = await resolveImagePointers(
              imagePointers,
              conversationId,
              resolver,
              log,
              parentCandidateMessageId
            );
          } finally {
            stopHb2();
          }
          // Bail out cleanly if the client disconnected during the wait —
          // any further enqueue throws "Invalid state: Controller is
          // already closed". Better to no-op than to surface that as a
          // server error.
          if (signal?.aborted) return;
          const mdBlock = imageMarkdown(urls);
          const safeEnqueue = (bytes: Uint8Array): boolean => {
            try {
              controller.enqueue(bytes);
              return true;
            } catch {
              console.warn("[chatgpt-web] controller enqueue failed");
              return false;
            }
          };
          // The image markdown is now a small URL (we cache the bytes in
          // memory and serve them at /v1/chatgpt-web/image/<id>), so a
          // single SSE chunk is fine — no aiohttp LineTooLong concerns
          // and the markdown renderer in Open WebUI sees the URL whole
          // and renders an `<img>` immediately.
          if (mdBlock) {
            if (
              !safeEnqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: null,
                    choices: [
                      {
                        index: 0,
                        delta: { content: mdBlock },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              )
            )
              return;
          }

          if (
            !safeEnqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: null,
                  choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
                })
              )
            )
          )
            return;
          safeEnqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              sseChunk({
                id: cid,
                object: "chat.completion.chunk",
                created,
                model,
                system_fingerprint: null,
                choices: [
                  {
                    index: 0,
                    delta: {
                      content: `[Stream error: ${err instanceof Error ? err.message : String(err)}]`,
                    },
                    finish_reason: "stop",
                    logprobs: null,
                  },
                ],
              })
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          try {
            controller.close();
          } catch {}
        }
      },
    },
    { highWaterMark: 16384 }
  );
}

async function buildNonStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  currentMsg: string,
  resolver: ImageResolver | null,
  pollAsyncImage: ((conversationId: string) => Promise<ImagePointerRef[]>) | null,
  log: { warn?: (tag: string, msg: string) => void } | null,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullAnswer = "";
  let conversationId: string | null = null;
  let imagePointers: ImagePointerRef[] | undefined;
  let imageGenAsync = false;
  let parentCandidateMessageId: string | null = null;

  for await (const chunk of extractContent(eventStream, signal)) {
    if (chunk.conversationId) conversationId = chunk.conversationId;
    if (chunk.messageId) parentCandidateMessageId = chunk.messageId;
    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "CHATGPT_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.done) {
      fullAnswer = chunk.answer || fullAnswer;
      imagePointers = chunk.imagePointers;
      imageGenAsync = chunk.imageGenAsync ?? false;
      if (chunk.messageId) parentCandidateMessageId = chunk.messageId;
      break;
    }
    if (chunk.answer) fullAnswer = chunk.answer;
  }

  fullAnswer = cleanChatGptText(fullAnswer);

  // Async image gen: SSE ended with "Processing image..." — poll for the
  // final pointer the same way the streaming path does.
  if (
    imageGenAsync &&
    conversationId &&
    (!imagePointers || imagePointers.length === 0) &&
    pollAsyncImage
  ) {
    try {
      const polled = await pollAsyncImage(conversationId);
      if (polled.length > 0) imagePointers = polled;
    } catch (err) {
      log?.warn?.(
        "CGPT-WEB",
        `Async image poll failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  const urls = await resolveImagePointers(
    imagePointers,
    conversationId,
    resolver,
    log,
    parentCandidateMessageId
  );
  fullAnswer += imageMarkdown(urls);
  const promptTokens = Math.ceil(currentMsg.length / 4);
  const completionTokens = Math.ceil(fullAnswer.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: null,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: fullAnswer },
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Error response helpers ─────────────────────────────────────────────────

export function errorResponse(status: number, message: string, code?: string): Response {
  return new Response(
    JSON.stringify({ error: { message, type: "upstream_error", ...(code ? { code } : {}) } }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}
