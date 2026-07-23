/**
 * GrokWebExecutor — Grok Web Session Provider
 *
 * Routes requests through Grok's internal NDJSON API using an X/Grok
 * subscription SSO cookie, translating between OpenAI chat completions
 * format and Grok's internal protocol.
 *
 * Derived from:
 *   - grok2api-merged (model mappings, payload structure, statsig, processor)
 *   - GrokProxy / GrokBridge (cookie auth, streaming token extraction)
 *   - grok-web-api (response types, chat options)
 *   - Grok API Research Report (headers, Cloudflare bypass techniques)
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ExecuteInput,
  type ExecutorLog,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { buildGrokCookieHeader } from "@/lib/providers/webCookieAuth";
import {
  tlsFetchGrok,
  TlsClientUnavailableError,
  isCloudflareChallenge,
  type TlsFetchResult,
} from "../services/grokTlsClient.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  shouldUseGrokBrowserBacked,
  acquireFreshGrokClearance,
} from "../services/grokClearance.ts";
import type { GrokStreamEvent } from "./grok-web/types.ts";
import {
  type OpenAIToolCall,
  type GrokToolRegistry,
  buildGrokToolRegistry,
  buildGrokMessage,
  parseClientToolCallMarkup,
  hasOpenToolCallMarkup,
} from "./grok-web/tool-bridge.ts";
import { mapGrokNativeToolToOpenAI } from "./grok-web/native-tools.ts";
import {
  GrokMarkupFilter,
  cleanGrokContentText,
  cleanGrokThinkingText,
  extractStructuredReasoning,
} from "./grok-web/text-cleanup.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const GROK_CHAT_API = "https://grok.com/rest/app-chat/conversations/new";
const GROK_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

// ─── Model mappings ─────────────────────────────────────────────────────────
// Grok Web exposes UI modes, not stable public model IDs. Keep OmniRoute model
// IDs mapped directly to Grok's modeId field.

interface GrokModelInfo {
  modeId: string;
  isThinking: boolean;
}

const MODEL_MAP: Record<string, GrokModelInfo> = {
  fast: { modeId: "fast", isThinking: false },
  expert: { modeId: "expert", isThinking: true },
  heavy: { modeId: "heavy", isThinking: true },
  "grok-420-computer-use-sa": { modeId: "grok-420-computer-use-sa", isThinking: true },

  // Legacy aliases retained for manually-entered model IDs.
  "grok-4": { modeId: "fast", isThinking: false },
  "grok-4.1-fast": { modeId: "fast", isThinking: false },
  "grok-4.1-expert": { modeId: "expert", isThinking: true },
  "grok-4-heavy": { modeId: "heavy", isThinking: true },
  "grok-4.20": { modeId: "expert", isThinking: true },
  "grok-4.20-heavy": { modeId: "heavy", isThinking: true },
  "grok-4.3": { modeId: "grok-420-computer-use-sa", isThinking: true },
  "grok-4-3-thinking-1129": { modeId: "grok-420-computer-use-sa", isThinking: true },
};

// ─── Statsig ID generation ──────────────────────────────────────────────────

function randomString(length: number, alphanumeric = false): string {
  const chars = alphanumeric
    ? "abcdefghijklmnopqrstuvwxyz0123456789"
    : "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateStatsigId(): string {
  const msg =
    Math.random() < 0.5
      ? `e:TypeError: Cannot read properties of null (reading 'children["${randomString(5, true)}"]')`
      : `e:TypeError: Cannot read properties of undefined (reading '${randomString(10)}')`;
  return btoa(msg);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── NDJSON parsing ─────────────────────────────────────────────────────────

async function* readGrokNdjsonEvents(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<GrokStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const idx = buffer.indexOf("\n");
        if (idx < 0) break;
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);

        if (!line) continue;
        try {
          yield JSON.parse(line) as GrokStreamEvent;
        } catch {
          // Skip non-JSON lines
        }
      }
    }

    // Flush remaining buffer
    buffer += decoder.decode();
    const remaining = buffer.trim();
    if (remaining) {
      try {
        yield JSON.parse(remaining) as GrokStreamEvent;
      } catch {
        // ignore
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// ─── Content extraction ─────────────────────────────────────────────────────

interface ContentChunk {
  delta?: string;
  thinking?: string;
  toolCalls?: OpenAIToolCall[];
  fingerprint?: string;
  responseId?: string;
  fullMessage?: string;
  error?: string;
  done?: boolean;
}

async function* extractContent(
  eventStream: ReadableStream<Uint8Array>,
  isThinkingModel: boolean,
  toolRegistry: GrokToolRegistry,
  signal?: AbortSignal | null,
  suppressThinkingAfterVisibleContent = false
): AsyncGenerator<ContentChunk> {
  let fingerprint = "";
  let responseId = "";
  const contentFilter = new GrokMarkupFilter();
  const thinkingFilter = new GrokMarkupFilter();
  let emittedThinking = "";
  let emittedVisibleContent = false;

  for await (const event of readGrokNdjsonEvents(eventStream, signal)) {
    // Error handling
    if (event.error) {
      yield { error: event.error.message || `Grok error: ${event.error.code}`, done: true };
      return;
    }

    const resp = event.result?.response;
    if (!resp) continue;

    // Extract metadata
    if (resp.llmInfo?.modelHash && !fingerprint) {
      fingerprint = resp.llmInfo.modelHash;
    }
    if (resp.responseId) {
      responseId = resp.responseId;
    }

    const nativeToolCall = mapGrokNativeToolToOpenAI(resp, toolRegistry);
    if (nativeToolCall) {
      yield { toolCalls: [nativeToolCall], fingerprint, responseId };
      return;
    }

    if (resp.messageTag === "raw_function_result" || resp.messageTag === "tool_usage_card") {
      continue;
    }

    // modelResponse = final/complete response
    if (resp.modelResponse) {
      const mr = resp.modelResponse;

      const finalThinking = isThinkingModel ? extractStructuredReasoning(mr) : "";
      if ((!suppressThinkingAfterVisibleContent || !emittedVisibleContent) && finalThinking) {
        const cleanedThinking = thinkingFilter.feed(finalThinking);
        const thinkingDelta = cleanedThinking.startsWith(emittedThinking)
          ? cleanedThinking.slice(emittedThinking.length)
          : cleanedThinking;
        if (thinkingDelta) {
          emittedThinking += thinkingDelta;
          yield { thinking: thinkingDelta };
        }
      }

      // Extract final message
      if (mr.message) {
        const fullMessage = cleanGrokContentText(mr.message);
        if (fullMessage) emittedVisibleContent = true;
        yield { fullMessage, fingerprint, responseId };
      }

      // Extract fingerprint from metadata
      if (mr.metadata?.llm_info?.modelHash) {
        fingerprint = mr.metadata.llm_info.modelHash;
      }
      continue;
    }

    // Streaming token
    const thinking = isThinkingModel ? extractStructuredReasoning(resp) : "";
    if ((!suppressThinkingAfterVisibleContent || !emittedVisibleContent) && thinking) {
      const cleanedThinking = thinkingFilter.feed(thinking);
      const thinkingDelta = cleanedThinking.startsWith(emittedThinking)
        ? cleanedThinking.slice(emittedThinking.length)
        : cleanedThinking;
      if (thinkingDelta) {
        emittedThinking += thinkingDelta;
        yield { thinking: thinkingDelta, fingerprint, responseId };
      }
    }
    if (resp.token != null) {
      if (resp.isThinking) {
        const thinkingDelta =
          suppressThinkingAfterVisibleContent && emittedVisibleContent
            ? ""
            : cleanGrokThinkingText(resp);
        if (thinkingDelta) yield { thinking: thinkingDelta, fingerprint, responseId };
        continue;
      }
      const cleanedDelta = contentFilter.feed(resp.token);
      if (cleanedDelta) {
        emittedVisibleContent = true;
        yield { delta: cleanedDelta, fingerprint, responseId };
      }
    }
  }

  const trailingThinking =
    suppressThinkingAfterVisibleContent && emittedVisibleContent ? "" : thinkingFilter.flush();
  if (trailingThinking) {
    const thinkingDelta = trailingThinking.startsWith(emittedThinking)
      ? trailingThinking.slice(emittedThinking.length)
      : trailingThinking;
    if (thinkingDelta) yield { thinking: thinkingDelta, fingerprint, responseId };
  }
  const trailingContent = contentFilter.flush();
  const trailingContentWithTrace = trailingContent;
  if (trailingContentWithTrace) yield { delta: trailingContentWithTrace, fingerprint, responseId };

  yield { done: true, fingerprint, responseId };
}

// ─── OpenAI SSE format builders ─────────────────────────────────────────────

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function enqueueStreamingToolCalls(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  params: {
    id: string;
    created: number;
    model: string;
    fingerprint: string;
    toolCalls: OpenAIToolCall[];
  }
): void {
  for (let i = 0; i < params.toolCalls.length; i++) {
    controller.enqueue(
      encoder.encode(
        sseChunk({
          id: params.id,
          object: "chat.completion.chunk",
          created: params.created,
          model: params.model,
          system_fingerprint: params.fingerprint || null,
          choices: [
            {
              index: 0,
              delta: { tool_calls: [{ index: i, ...params.toolCalls[i] }] },
              finish_reason: null,
              logprobs: null,
            },
          ],
        })
      )
    );
  }
  controller.enqueue(
    encoder.encode(
      sseChunk({
        id: params.id,
        object: "chat.completion.chunk",
        created: params.created,
        model: params.model,
        system_fingerprint: params.fingerprint || null,
        choices: [{ index: 0, delta: {}, finish_reason: "tool_calls", logprobs: null }],
      })
    )
  );
  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
}

function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  isThinkingModel: boolean,
  toolRegistry: GrokToolRegistry,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream(
    {
      async start(controller) {
        try {
          // Initial role chunk
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

          let fp = "";
          let buffered = "";

          for await (const chunk of extractContent(
            eventStream,
            isThinkingModel,
            toolRegistry,
            signal,
            true
          )) {
            if (chunk.fingerprint) fp = chunk.fingerprint;

            if (chunk.error) {
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: fp || null,
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

            if (chunk.thinking) {
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: fp || null,
                    choices: [
                      {
                        index: 0,
                        delta: { reasoning_content: chunk.thinking },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
              continue;
            }

            if (chunk.toolCalls) {
              enqueueStreamingToolCalls(controller, encoder, {
                id: cid,
                created,
                model,
                fingerprint: fp,
                toolCalls: chunk.toolCalls,
              });
              return;
            }

            if (chunk.done) break;

            if (chunk.fullMessage) {
              const toolCalls = parseClientToolCallMarkup(chunk.fullMessage, toolRegistry);
              if (toolCalls) {
                enqueueStreamingToolCalls(controller, encoder, {
                  id: cid,
                  created,
                  model,
                  fingerprint: fp,
                  toolCalls,
                });
                return;
              }
            }

            if (chunk.delta) {
              buffered += chunk.delta;
              const toolCalls = parseClientToolCallMarkup(buffered, toolRegistry);
              if (toolCalls) {
                enqueueStreamingToolCalls(controller, encoder, {
                  id: cid,
                  created,
                  model,
                  fingerprint: fp,
                  toolCalls,
                });
                return;
              }
              if (hasOpenToolCallMarkup(buffered)) continue;
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: fp || null,
                    choices: [
                      {
                        index: 0,
                        delta: { content: chunk.delta },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
            }
          }

          // Stop chunk
          controller.enqueue(
            encoder.encode(
              sseChunk({
                id: cid,
                object: "chat.completion.chunk",
                created,
                model,
                system_fingerprint: fp || null,
                choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
              })
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
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
                      content: sanitizeErrorMessage(
                        `[Stream error: ${err instanceof Error ? err.message : String(err)}]`
                      ),
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
  isThinkingModel: boolean,
  toolRegistry: GrokToolRegistry,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullContent = "";
  let fingerprint = "";
  const thinkingParts: string[] = [];

  for await (const chunk of extractContent(eventStream, isThinkingModel, toolRegistry, signal)) {
    if (chunk.fingerprint) fingerprint = chunk.fingerprint;

    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "GROK_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.thinking) {
      thinkingParts.push(chunk.thinking);
      continue;
    }
    if (chunk.toolCalls) {
      return new Response(
        JSON.stringify({
          id: cid,
          object: "chat.completion",
          created,
          model,
          system_fingerprint: fingerprint || null,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: null, tool_calls: chunk.toolCalls },
              finish_reason: "tool_calls",
              logprobs: null,
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.done) break;
    if (chunk.fullMessage) {
      fullContent = chunk.fullMessage;
    } else if (chunk.delta) {
      fullContent += chunk.delta;
    }
  }

  const manifestToolCalls = parseClientToolCallMarkup(fullContent, toolRegistry);
  if (manifestToolCalls) {
    return new Response(
      JSON.stringify({
        id: cid,
        object: "chat.completion",
        created,
        model,
        system_fingerprint: fingerprint || null,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: null, tool_calls: manifestToolCalls },
            finish_reason: "tool_calls",
            logprobs: null,
          },
        ],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const msg: Record<string, unknown> = { role: "assistant", content: fullContent };
  if (thinkingParts.length > 0) {
    msg.reasoning_content = thinkingParts.join("\n");
  }

  const promptTokens = Math.ceil(fullContent.length / 4);
  const completionTokens = Math.ceil(fullContent.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: fingerprint || null,
      choices: [
        {
          index: 0,
          message: msg,
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

// ─── Cloudflare anti-bot classification + browser-backed recovery (#8019) ──
//
// Grok's own TLS-impersonating client (grokTlsClient.ts) still gets a
// Cloudflare Enterprise anti-bot rejection from datacenter/sandbox egresses
// even with a valid sso+sso-rw cookie. Before this, a Cloudflare block and a
// genuinely expired SSO cookie both surfaced as the SAME generic auth error
// (#8019). classifyGrokNullBodyError() distinguishes them so the caller gets
// an actionable message, and (opt-in only) resolveGrokNullBodyTlsResult()
// tries one browser-backed cf_clearance refresh + retry before giving up.

export interface GrokNullBodyError {
  type: "cloudflare_challenge" | "authentication_error" | "rate_limit_error" | "upstream_error";
  code: string;
  message: string;
}

/**
 * Classify a `tlsResult.body === null` response (no streamable body — either
 * a non-2xx status or a Cloudflare interstitial peeked at 200). Exported so
 * both the executor and its unit tests share one decision.
 */
export function classifyGrokNullBodyError(
  status: number,
  text: string | null | undefined
): GrokNullBodyError {
  if (isCloudflareChallenge(text)) {
    return {
      type: "cloudflare_challenge",
      code: "cf_mitigated_challenge",
      message:
        "Grok returned a Cloudflare bot-management challenge instead of a real response. " +
        "cf_clearance is pinned to the IP+TLS+UA that earned it and can't be replayed from " +
        "a datacenter/sandbox egress. Probe from a residential IP, or use the official xAI API " +
        "(provider: 'grok') instead.",
    };
  }
  if (status === 401 || status === 403) {
    return {
      type: "authentication_error",
      code: `HTTP_${status}`,
      message:
        "Grok auth failed — SSO cookie may be expired. Re-paste your sso cookie value from grok.com.",
    };
  }
  if (status === 429) {
    return {
      type: "rate_limit_error",
      code: "HTTP_429",
      message: "Grok rate limited. Wait a moment and retry, or rotate cookies.",
    };
  }
  return {
    type: "upstream_error",
    code: `HTTP_${status}`,
    message: `Grok returned HTTP ${status}`,
  };
}

function buildGrokNullBodyErrorResponse(
  status: number,
  classification: GrokNullBodyError
): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: classification.message,
        type: classification.type,
        code: classification.code,
      },
    }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

function appendCfClearanceCookie(cookieHeader: string | undefined, cfClearance: string): string {
  const cfCookie = `cf_clearance=${cfClearance}`;
  if (!cookieHeader) return cfCookie;
  if (/(?:^|;\s*)cf_clearance=/.test(cookieHeader)) {
    return cookieHeader.replace(/cf_clearance=[^;]*/, cfCookie);
  }
  return `${cookieHeader}; ${cfCookie}`;
}

/**
 * Attempt ONE browser-backed cf_clearance refresh + retry of tlsFetchGrok.
 * Returns the retried TlsFetchResult on success, or null on any failure
 * (acquisition failure, retry still challenged, retry threw) so the caller
 * falls through to the original Cloudflare-challenge error — never throws.
 */
async function retryGrokWithFreshClearance(params: {
  headers: Record<string, string>;
  grokPayload: Record<string, unknown>;
  signal?: AbortSignal;
}): Promise<TlsFetchResult | null> {
  let cfClearance: string | null;
  try {
    cfClearance = await acquireFreshGrokClearance(params.signal);
  } catch {
    cfClearance = null;
  }
  if (!cfClearance) return null;

  const retryHeaders = {
    ...params.headers,
    Cookie: appendCfClearanceCookie(params.headers.Cookie, cfClearance),
  };
  try {
    const retried = await tlsFetchGrok(GROK_CHAT_API, {
      method: "POST",
      headers: retryHeaders,
      body: JSON.stringify(params.grokPayload),
      timeoutMs: FETCH_TIMEOUT_MS,
      signal: params.signal,
      stream: true,
      streamEofSymbol: "[DONE]",
    });
    return retried.body ? retried : null;
  } catch {
    return null;
  }
}

/**
 * Resolves a `tlsResult.body === null` response: if it classifies as a
 * Cloudflare challenge AND the browser-backed opt-in gate is on, tries one
 * recovery retry; otherwise returns the original result unchanged. Callers
 * re-classify the (possibly retried) result themselves.
 */
export async function resolveGrokNullBodyTlsResult(params: {
  tlsResult: TlsFetchResult;
  headers: Record<string, string>;
  grokPayload: Record<string, unknown>;
  signal?: AbortSignal;
  log?: ExecutorLog | null;
}): Promise<TlsFetchResult> {
  const { tlsResult, headers, grokPayload, signal, log } = params;
  if (tlsResult.body) return tlsResult;

  const classification = classifyGrokNullBodyError(tlsResult.status, tlsResult.text);
  if (classification.type !== "cloudflare_challenge" || !shouldUseGrokBrowserBacked()) {
    return tlsResult;
  }

  log?.info?.(
    "GROK-WEB",
    "Cloudflare challenge detected on grok.com; attempting browser-backed cf_clearance refresh"
  );
  const retried = await retryGrokWithFreshClearance({ headers, grokPayload, signal });
  if (retried) {
    log?.info?.("GROK-WEB", "Browser-backed cf_clearance refresh succeeded; retry passed through");
  }
  return retried ?? tlsResult;
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class GrokWebExecutor extends BaseExecutor {
  constructor() {
    super("grok-web", { id: "grok-web", baseUrl: GROK_CHAT_API });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput) {
    const messages = (body as Record<string, unknown>).messages as
      Array<Record<string, unknown>> | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Missing or empty messages array", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers: {}, transformedBody: body };
    }

    // Resolve model → Grok Web mode
    const modelInfo = MODEL_MAP[model];
    if (!modelInfo) {
      log?.info?.("GROK-WEB", `Unmapped model ${model}, defaulting to fast mode`);
    }
    const toolRegistry = buildGrokToolRegistry(body as Record<string, unknown>);
    const { modeId, isThinking } = modelInfo || MODEL_MAP.fast;

    // Parse OpenAI messages → single Grok message string
    const message = buildGrokMessage(
      messages,
      toolRegistry,
      (body as Record<string, unknown>).tool_choice
    );
    if (!message.trim()) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Empty query after processing", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers: {}, transformedBody: body };
    }

    // Build Grok request payload
    const grokPayload: Record<string, unknown> = {
      temporary: true,
      modeId,
      message: message,
      fileAttachments: [],
      imageAttachments: [],
      disableSearch: false,
      enableImageGeneration: false,
      returnImageBytes: false,
      returnRawGrokInXaiRequest: false,
      enableImageStreaming: false,
      imageGenerationCount: 0,
      forceConcise: false,
      toolOverrides: {},
      enableSideBySide: true,
      sendFinalMetadata: true,
      isReasoning: false,
      disableTextFollowUps: false,
      disableMemory: true,
      forceSideBySide: false,
      isAsyncChat: false,
      disableSelfHarmShortCircuit: false,
      deviceEnvInfo: {
        darkModeEnabled: false,
        devicePixelRatio: 2,
        screenWidth: 2056,
        screenHeight: 1329,
        viewportWidth: 2056,
        viewportHeight: 1083,
      },
    };

    // Build headers
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    const headers: Record<string, string> = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      Baggage:
        "sentry-environment=production,sentry-release=d6add6fb0460641fd482d767a335ef72b9b6abb8,sentry-public_key=b311e0f2690c81f25e2c4cf6d4f7ce1c",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Origin: "https://grok.com",
      Pragma: "no-cache",
      Referer: "https://grok.com/",
      "Sec-Ch-Ua": '"Google Chrome";v="149", "Chromium";v="149", "Not(A:Brand";v="24"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"macOS"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": GROK_USER_AGENT,
      "x-statsig-id": generateStatsigId(),
      "x-xai-request-id": crypto.randomUUID(),
      traceparent: `00-${traceId}-${spanId}-00`,
    };

    // Cookie auth — accepts a bare value, "sso=<value>", or a full DevTools
    // cookie blob. Forwards both `sso` and (when present) the paired `sso-rw`
    // write cookie, which Grok's anti-bot now requires (#3063).
    if (credentials.apiKey) {
      const cookieHeader = buildGrokCookieHeader(credentials.apiKey);
      if (cookieHeader) headers["Cookie"] = cookieHeader;
    }

    // Apply upstream extra headers
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    log?.info?.("GROK-WEB", `Query to ${model} (modeId=${modeId}), len=${message.length}`);

    // Apply fetch timeout
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    // Fetch from Grok via TLS-impersonating client (#3180).
    // Grok sits behind Cloudflare Enterprise which rejects Node's native TLS
    // fingerprint even with valid sso+sso-rw cookies. We use tls-client-node
    // to send a Chrome-like handshake instead.
    let tlsResult: TlsFetchResult;
    try {
      tlsResult = await tlsFetchGrok(GROK_CHAT_API, {
        method: "POST",
        headers,
        body: JSON.stringify(grokPayload),
        timeoutMs: FETCH_TIMEOUT_MS,
        signal: combinedSignal,
        stream: true,
        streamEofSymbol: "[DONE]",
      });
    } catch (err) {
      if (err instanceof TlsClientUnavailableError) {
        log?.error?.("GROK-WEB", `TLS client unavailable: ${err.message}`);
        const errResp = new Response(
          JSON.stringify({
            error: {
              message: sanitizeErrorMessage(`Grok TLS client unavailable: ${err.message}`),
              type: "upstream_error",
              code: "TLS_CLIENT_UNAVAILABLE",
            },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
        return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
      }
      log?.error?.("GROK-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const errResp = new Response(
        JSON.stringify({
          error: {
            message: sanitizeErrorMessage(
              `Grok connection failed: ${err instanceof Error ? err.message : String(err)}`
            ),
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    if (!tlsResult.body) {
      // Non-streaming fallback (shouldn't happen for chat, but handle gracefully).
      // Distinguish a Cloudflare anti-bot block from a genuine auth/rate-limit
      // failure (#8019); optionally recover via one browser-backed retry.
      tlsResult = await resolveGrokNullBodyTlsResult({
        tlsResult,
        headers,
        grokPayload,
        signal: combinedSignal,
        log,
      });
    }

    if (!tlsResult.body) {
      const status = tlsResult.status;
      const classification = classifyGrokNullBodyError(status, tlsResult.text);
      log?.warn?.("GROK-WEB", classification.message);
      const errResp = buildGrokNullBodyErrorResponse(status, classification);
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    // Build OpenAI-compatible response
    const cid = `chatcmpl-grok-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    let finalResponse: Response;
    if (stream) {
      const sseStream = buildStreamingResponse(
        tlsResult.body,
        model,
        cid,
        created,
        isThinking,
        toolRegistry,
        signal
      );
      finalResponse = new Response(sseStream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    } else {
      finalResponse = await buildNonStreamingResponse(
        tlsResult.body,
        model,
        cid,
        created,
        isThinking,
        toolRegistry,
        signal
      );
    }

    return { response: finalResponse, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
  }
}
