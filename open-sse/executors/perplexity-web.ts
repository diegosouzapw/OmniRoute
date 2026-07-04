/**
 * PerplexityWebExecutor — Perplexity Web Session Provider
 *
 * Routes requests through Perplexity's internal SSE API using a Pro/Max
 * subscription session cookie or JWT, translating between OpenAI chat
 * completions format and Perplexity's internal protocol.
 */

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import {
  tlsFetchPerplexity,
  isCloudflareChallenge,
  TlsClientUnavailableError,
  type TlsFetchResult,
} from "../services/perplexityTlsClient.ts";
import { prepareToolMessages } from "../translator/webTools.ts";
import { buildToolModeResponse } from "./chatgptWebTools.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  PPLX_SSE_ENDPOINT,
  PPLX_USER_AGENT,
  MODEL_MAP,
  THINKING_MAP,
  cleanResponse,
  parseOpenAIMessages,
  buildPplxRequestBody,
  buildQuery,
  extractContent,
  sseChunk,
} from "./perplexity-web/protocol.ts";

// ─── Session continuity ─────────────────────────────────────────────────────

const SESSION_MAX_AGE_MS = 3600_000;
const SESSION_MAX_ENTRIES = 200;

interface SessionEntry {
  backendUuid: string;
  ts: number;
}

const sessionCache = new Map<string, SessionEntry>();

function sessionKey(history: Array<{ role: string; content: string }>): string {
  const parts = history.map((h) => `${h.role}:${h.content}`).join("\n");
  let hash = 0x811c9dc5;
  for (let i = 0; i < parts.length; i++) {
    hash ^= parts.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function sessionLookup(history: Array<{ role: string; content: string }>): string | null {
  if (history.length === 0) return null;
  const key = sessionKey(history);
  const entry = sessionCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > SESSION_MAX_AGE_MS) {
    sessionCache.delete(key);
    return null;
  }
  return entry.backendUuid;
}

function sessionStore(
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  responseText: string,
  backendUuid: string | null
): void {
  if (!backendUuid) return;
  const full = [
    ...history,
    { role: "user", content: currentMsg },
    { role: "assistant", content: responseText },
  ];
  const key = sessionKey(full);
  sessionCache.set(key, { backendUuid, ts: Date.now() });
  if (sessionCache.size > SESSION_MAX_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestTs = Infinity;
    for (const [k, v] of sessionCache) {
      if (v.ts < oldestTs) {
        oldestTs = v.ts;
        oldestKey = k;
      }
    }
    if (oldestKey) sessionCache.delete(oldestKey);
  }
}

function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
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

          let fullAnswer = "";
          let respBackendUuid: string | null = null;

          for await (const chunk of extractContent(eventStream, signal)) {
            if (chunk.backendUuid) respBackendUuid = chunk.backendUuid;

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

            if (chunk.thinking) {
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
                        delta: { reasoning_content: chunk.thinking + "\n" },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
              continue;
            }

            if (chunk.done) {
              fullAnswer = chunk.answer || fullAnswer;
              break;
            }

            let dt = chunk.delta || "";
            if (dt) {
              dt = cleanResponse(dt, false);
              if (dt) {
                controller.enqueue(
                  encoder.encode(
                    sseChunk({
                      id: cid,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      system_fingerprint: null,
                      choices: [
                        { index: 0, delta: { content: dt }, finish_reason: null, logprobs: null },
                      ],
                    })
                  )
                );
              }
            }
            if (chunk.answer) fullAnswer = chunk.answer;
          }

          // Stop chunk
          controller.enqueue(
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
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          sessionStore(history, currentMsg, cleanResponse(fullAnswer), respBackendUuid);
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
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullAnswer = "";
  let respBackendUuid: string | null = null;
  const thinkingParts: string[] = [];

  for await (const chunk of extractContent(eventStream, signal)) {
    if (chunk.backendUuid) respBackendUuid = chunk.backendUuid;
    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "PPLX_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.thinking) {
      thinkingParts.push(chunk.thinking);
      continue;
    }
    if (chunk.done) {
      fullAnswer = chunk.answer || fullAnswer;
      break;
    }
    if (chunk.answer) fullAnswer = chunk.answer;
  }

  fullAnswer = cleanResponse(fullAnswer);
  sessionStore(history, currentMsg, fullAnswer, respBackendUuid);

  const reasoningContent = thinkingParts.length > 0 ? thinkingParts.join("\n") : undefined;
  const msg: Record<string, unknown> = { role: "assistant", content: fullAnswer };
  if (reasoningContent) msg.reasoning_content = reasoningContent;

  const promptTokens = Math.ceil(currentMsg.length / 4);
  const completionTokens = Math.ceil(fullAnswer.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: null,
      choices: [{ index: 0, message: msg, finish_reason: "stop", logprobs: null }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class PerplexityWebExecutor extends BaseExecutor {
  constructor() {
    super("perplexity-web", { id: "perplexity-web", baseUrl: PPLX_SSE_ENDPOINT });
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawMessages = bodyObj.messages as Array<Record<string, unknown>> | undefined;
    if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Missing or empty messages array", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers: {}, transformedBody: body };
    }

    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(
      bodyObj,
      rawMessages as Array<{ role: string; content: unknown }>
    );

    // Resolve thinking mode
    const thinking =
      bodyObj.thinking === true ||
      (bodyObj.reasoning_effort != null && bodyObj.reasoning_effort !== "none");

    let pplxMode: string;
    let modelPref: string;
    if (thinking && THINKING_MAP[model]) {
      pplxMode = "search";
      modelPref = THINKING_MAP[model];
      log?.info?.("PPLX-WEB", `Thinking mode → ${model} using ${modelPref}`);
    } else if (MODEL_MAP[model]) {
      [pplxMode, modelPref] = MODEL_MAP[model];
    } else {
      pplxMode = "copilot";
      modelPref = model;
      log?.info?.("PPLX-WEB", `Unmapped model ${model}, using as raw preference`);
    }

    // Parse messages and check session continuity
    const parsed = parseOpenAIMessages(effectiveMessages);
    const followUpUuid = sessionLookup(parsed.history);
    if (followUpUuid) {
      log?.info?.("PPLX-WEB", `Session continue: ${followUpUuid.slice(0, 12)}...`);
    }

    const query = buildQuery(parsed, followUpUuid);
    if (!query.trim()) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Empty query after processing", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers: {}, transformedBody: body };
    }

    // Build Perplexity request
    const requestId = crypto.randomUUID();
    const pplxBody = buildPplxRequestBody(
      query,
      parsed.currentMsg,
      pplxMode,
      modelPref,
      followUpUuid,
      requestId
    );

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Origin: "https://www.perplexity.ai",
      Referer: "https://www.perplexity.ai/",
      "User-Agent": PPLX_USER_AGENT,
      // Current app request headers (replaced the stale X-App-ApiVersion/X-App-ApiClient pair,
      // which the new endpoint no longer expects and which contributed to HTTP 400).
      "x-perplexity-request-endpoint": PPLX_SSE_ENDPOINT,
      "x-perplexity-request-reason": "ask-query-state-provider",
      "x-perplexity-request-try-number": "1",
      "x-request-id": requestId,
    };

    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    } else if (credentials.apiKey) {
      headers["Cookie"] = `__Secure-next-auth.session-token=${credentials.apiKey}`;
    }

    log?.info?.(
      "PPLX-WEB",
      `Query to ${model} (pref=${modelPref}, mode=${pplxMode}), len=${query.length}`
    );

    // Fetch from Perplexity through the Firefox-fingerprinted TLS client.
    // Perplexity sits behind Cloudflare Enterprise which pins JA3/JA4 to a real
    // browser handshake; Node's fetch() is challenged with a 403 page from
    // VPS/datacenter IPs even with a valid cookie (issue #2459).
    let response: TlsFetchResult;
    try {
      response = await tlsFetchPerplexity(PPLX_SSE_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify(pplxBody),
        signal: signal ?? null,
        stream: true,
        streamEofSymbol: "[DONE]",
      });
    } catch (err) {
      const isTlsUnavail = err instanceof TlsClientUnavailableError;
      log?.error?.("PPLX-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const errResp = new Response(
        JSON.stringify({
          error: {
            message: isTlsUnavail
              ? `Perplexity TLS client unavailable: ${sanitizeErrorMessage((err as Error).message)}`
              : `Perplexity connection failed: ${sanitizeErrorMessage(err instanceof Error ? err.message : String(err))}`,
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
    }

    if (response.status !== 200 || (!response.body && !response.text)) {
      const status = response.status;
      let errMsg = `Perplexity returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        if (isCloudflareChallenge(response.text)) {
          errMsg =
            "Cloudflare blocked the request — Perplexity's edge rejected this server's TLS fingerprint " +
            "(common on VPS/datacenter IPs). Ensure tls-client-node is installed with its native binary, " +
            "or route perplexity-web through a residential proxy.";
          log?.error?.("PPLX-WEB", "Cloudflare challenge detected — TLS bypass failed");
        } else {
          errMsg =
            "Perplexity auth failed — session cookie may be expired. Re-paste your __Secure-next-auth.session-token.";
        }
      } else if (status === 429) {
        errMsg = "Perplexity rate limited. Wait a moment and retry.";
      }
      log?.warn?.("PPLX-WEB", errMsg);
      const errResp = new Response(
        JSON.stringify({
          error: { message: errMsg, type: "upstream_error", code: `HTTP_${status}` },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
    }

    if (!response.body) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Perplexity returned empty response body", type: "upstream_error" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
    }

    // Build OpenAI-compatible response
    const cid = `chatcmpl-pplx-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    // Tool mode buffers the full completion (no live token streaming) and
    // converts <tool> text into real tool_calls — even when the caller asked
    // for a streaming response — mirroring chatgpt-web's toolMode (#5240,
    // #5927). Without this, streaming requests (the default for agentic
    // coding clients) never emitted a tool_calls SSE delta.
    let finalResponse: Response;
    if (hasTools) {
      const bufferedJson = await buildNonStreamingResponse(
        response.body,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
        signal
      );
      finalResponse = await buildToolModeResponse(bufferedJson, requestedTools, stream, {
        cid,
        created,
        model,
        idSeed: "pplx",
      });
    } else if (stream) {
      const sseStream = buildStreamingResponse(
        response.body,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
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
        response.body,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
        signal
      );
    }

    return {
      response: finalResponse,
      url: PPLX_SSE_ENDPOINT,
      headers,
      transformedBody: pplxBody,
    };
  }
}
