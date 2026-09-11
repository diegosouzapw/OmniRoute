/**
 * PerplexityWebExecutor — Perplexity Web Session Provider
 *
 * Routes requests through Perplexity's internal SSE API using a Pro/Max
 * subscription session cookie or JWT, translating between OpenAI chat
 * completions format and Perplexity's internal protocol.
 */

import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import {
  tlsFetchPerplexity,
  isCloudflareChallenge,
  TlsClientUnavailableError,
  type TlsFetchResult,
} from "../services/perplexityTlsClient.ts";
import { prepareToolMessages } from "../translator/webTools.ts";
import { buildToolModeResponse } from "./chatgptWebTools.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { buildSessionCookieHeader, mergeRefreshedCookie } from "../utils/nextAuthCookie.ts";
import { formatTranslatedStreamError } from "../utils/streamErrorFormat.ts";
import {
  PPLX_SSE_ENDPOINT,
  PPLX_USER_AGENT,
  PPLX_STREAM_EOF_SYMBOL,
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
const PPLX_STREAM_ERROR_MESSAGE = "Perplexity upstream stream failed";
const PPLX_STREAM_ERROR_CODE = "PPLX_STREAM_ERROR";

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
  const streamAbortController = new AbortController();
  const forwardInputAbort = () =>
    streamAbortController.abort(signal?.reason ?? "perplexity_request_aborted");
  if (signal?.aborted) forwardInputAbort();
  else signal?.addEventListener("abort", forwardInputAbort, { once: true });
  let inputAbortListenerAttached = Boolean(signal && !signal.aborted);
  const removeInputAbortListener = () => {
    if (!inputAbortListenerAttached) return;
    inputAbortListenerAttached = false;
    signal?.removeEventListener("abort", forwardInputAbort);
  };
  const abortEventStream = (reason: unknown) => {
    removeInputAbortListener();
    if (!streamAbortController.signal.aborted) streamAbortController.abort(reason);
  };
  const contentIterator = extractContent(eventStream, streamAbortController.signal)[
    Symbol.asyncIterator
  ]();
  let fullAnswer = "";
  let respBackendUuid: string | null = null;
  let roleEmitted = false;
  let finished = false;
  let pendingFailure: (Error & { statusCode: number }) | null = null;

  const enqueuePreContentFailure = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    controller.enqueue(
      encoder.encode(
        formatTranslatedStreamError({
          status: 502,
          message: PPLX_STREAM_ERROR_MESSAGE,
          type: "upstream_error",
          code: PPLX_STREAM_ERROR_CODE,
        })
      )
    );
  };

  const takeAssistantRoleChunk = (): string => {
    if (roleEmitted) return "";
    roleEmitted = true;
    return sseChunk({
      id: cid,
      object: "chat.completion.chunk",
      created,
      model,
      system_fingerprint: null,
      choices: [
        {
          index: 0,
          delta: { role: "assistant" },
          finish_reason: null,
          logprobs: null,
        },
      ],
    });
  };

  const completeStream = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (finished) return;
    finished = true;
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
    removeInputAbortListener();
    controller.close();
  };

  const failStream = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (roleEmitted) {
      pendingFailure = Object.assign(new Error(PPLX_STREAM_ERROR_MESSAGE), {
        statusCode: 502,
      });
      finished = true;
      controller.close();
      return;
    }
    finished = true;
    enqueuePreContentFailure(controller);
    controller.close();
  };

  const providerStream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (finished) return;

      try {
        const next = await contentIterator.next();
        if (streamAbortController.signal.aborted) {
          finished = true;
          controller.close();
          return;
        }
        if (next.done === true) {
          completeStream(controller);
          return;
        }

        const chunk = next.value;
        if (chunk.backendUuid) respBackendUuid = chunk.backendUuid;

        if (chunk.error) {
          failStream(controller);
          removeInputAbortListener();
          void contentIterator.return?.(undefined).catch(() => undefined);
          return;
        }

        if (chunk.thinking) {
          controller.enqueue(
            encoder.encode(
              takeAssistantRoleChunk() +
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
          return;
        }

        if (chunk.done) {
          fullAnswer = chunk.answer || fullAnswer;
          completeStream(controller);
          await contentIterator.return?.(undefined);
          return;
        }

        let dt = chunk.delta || "";
        if (dt) {
          dt = cleanResponse(dt, false);
          if (dt) {
            controller.enqueue(
              encoder.encode(
                takeAssistantRoleChunk() +
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
      } catch {
        failStream(controller);
        removeInputAbortListener();
        void contentIterator.return?.(undefined).catch(() => undefined);
      }
    },

    cancel(reason) {
      finished = true;
      abortEventStream(reason);
      void contentIterator.return?.(undefined).catch(() => undefined);
    },
  });

  // Erroring the provider stream immediately would discard output buffered by the readiness
  // handoff. Drain each provider chunk through a backpressure-aware reader, then reject only the
  // read after the last legitimate chunk. The outer pipeline converts that fixed public error to
  // the client's canonical terminal frame and records the stream failure.
  const providerReader = providerStream.getReader();
  let cancelled = false;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const next = await providerReader.read();
        if (cancelled) return;
        if (next.done === false) {
          controller.enqueue(next.value);
          return;
        }
        if (pendingFailure) {
          controller.error(pendingFailure);
          return;
        }
        controller.close();
      } catch (error) {
        if (!cancelled) controller.error(error);
      }
    },

    cancel(reason) {
      if (cancelled) return;
      cancelled = true;
      abortEventStream(reason);
      void providerReader.cancel(reason).catch(() => undefined);
    },
  });
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
      // Quota exhaustion → 429 + reset_seconds so OmniRoute marks rate_limited_until
      // and VibeProxy limit badges / rotation skip parse the same shape as model_cooldown.
      const isQuota =
        chunk.errorCode === "quota_exhausted" ||
        /quota exhausted/i.test(chunk.error) ||
        (typeof chunk.resetSeconds === "number" && chunk.resetSeconds > 0);
      const status = isQuota ? 429 : 502;
      const code = chunk.errorCode || (isQuota ? "quota_exhausted" : "PPLX_ERROR");
      const type = isQuota ? "quota_exhausted" : "upstream_error";
      const errBody: Record<string, unknown> = {
        message: chunk.error,
        type,
        code,
      };
      if (typeof chunk.resetSeconds === "number" && chunk.resetSeconds > 0) {
        errBody.reset_seconds = chunk.resetSeconds;
      }
      const respHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (typeof chunk.resetSeconds === "number" && chunk.resetSeconds > 0) {
        respHeaders["Retry-After"] = String(chunk.resetSeconds);
      }
      return new Response(JSON.stringify({ error: errBody }), { status, headers: respHeaders });
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

async function persistRotatedSessionCookie(
  cookie: string,
  setCookieHeader: string | null,
  credentials: ProviderCredentials,
  onCredentialsRefreshed: ExecuteInput["onCredentialsRefreshed"],
  log: ExecuteInput["log"]
): Promise<void> {
  if (!onCredentialsRefreshed) return;
  try {
    const refreshed = mergeRefreshedCookie(cookie, setCookieHeader);
    if (refreshed && refreshed !== cookie) {
      await onCredentialsRefreshed({ ...credentials, apiKey: refreshed });
    }
  } catch (err) {
    log?.warn?.(
      "PPLX-WEB",
      `Failed to persist refreshed cookie: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class PerplexityWebExecutor extends BaseExecutor {
  constructor() {
    super("perplexity-web", { id: "perplexity-web", baseUrl: PPLX_SSE_ENDPOINT });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    onCredentialsRefreshed,
  }: ExecuteInput) {
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
      // "copilot", not "search": the backend downgrades "search" to CONCISE and drops
      // model_preference, so the thinking variant would fail the same way the catalog
      // models do (see the note above MODEL_MAP).
      pplxMode = "copilot";
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

    const cookieBlob = credentials.apiKey ?? "";
    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    } else if (cookieBlob) {
      headers["Cookie"] = buildSessionCookieHeader(cookieBlob);
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
        // Live wire terminator is `event: end_of_stream` (not OpenAI `[DONE]`).
        streamEofSymbol: PPLX_STREAM_EOF_SYMBOL,
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
            "(common on VPS/datacenter IPs). Verify the wreq-js 3.2 native binding, " +
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

    // If the TLS client buffered the body (looksLikeSse false-negative, or a
    // non-streaming error page), promote a text body that still looks like SSE
    // into a ReadableStream so extractContent can recover the answer.
    if (!response.body && response.text) {
      const buffered = response.text;
      if (/^(?:\s*)(?:data|event|id|retry):/im.test(buffered) || buffered.includes("\ndata:")) {
        const encoder = new TextEncoder();
        response = {
          ...response,
          body: new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(encoder.encode(buffered));
              controller.close();
            },
          }),
          text: null,
        };
      } else {
        const errResp = new Response(
          JSON.stringify({
            error: {
              message: `Perplexity returned non-SSE body: ${sanitizeErrorMessage(buffered.slice(0, 240))}`,
              type: "upstream_error",
            },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
        return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
      }
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

    // Surface any rotated session-token back to the caller so the DB credential
    // is refreshed — mirrors the shared web-session refresh contract.
    if (cookieBlob) {
      await persistRotatedSessionCookie(
        cookieBlob,
        response.headers.get("set-cookie"),
        credentials,
        onCredentialsRefreshed,
        log
      );
    }

    // Build OpenAI-compatible response
    const cid = `chatcmpl-pplx-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    // Tool mode buffers the full completion (no live token streaming) and
    // converts <tool> text into real tool_calls — even when the caller asked
    // for a streaming response — mirroring the shared tool-mode contract (#5240,
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
