/**
 * NotrackWebExecutor — notrack.ai cookie-auth Web Provider
 *
 * Routes chat requests through notrack.ai's `/api/dispatch` endpoint using the
 * user's logged-in browser session cookies (uid, si_usr_id, si_ses_id).
 *
 * API flow (verified against the upstream Python reference at /var/folders/.../notrack_main.py):
 *   1. POST /api/dispatch with formatted user_input → SSE stream
 *
 * Streaming format (SSE, `data: {json}` lines):
 *   - { type: "chat_meta",   chat_id }                    -- session id
 *   - { type: "user",        message_id }                -- user-message id
 *   - { type: "thinking" }                                -- reasoning tick
 *   - { type: "delta",       chunk: "..." }              -- content delta
 *   - { type: "message",      content: "...", turn: N }  -- full-snapshot fallback
 *
 * References (endpoint/payload shape lifted from the Python proxy):
 *   - /var/folders/.../notrack_main.py                    — endpoint, body shape, SSE event taxonomy
 */
import { BaseExecutor, mergeAbortSignals, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { estimateTokens } from "./notrack-web/cjk.ts";
import { NOTRACK_DISPATCH_URL } from "./notrack-web/constants.ts";
import {
  buildNotrackCookie,
  isEncryptedCredentialBlob,
  resolveNotrackCookieSource,
} from "./notrack-web/cookie.ts";
import {
  buildDispatchPayload,
  buildNotrackUserInput,
  buildUpstreamHeaders,
  mapUpstreamHttpError,
  notrackErrorResponse,
  resolvedModel,
} from "./notrack-web/request.ts";
import { collectNotrackResponse, transformNotrackStream } from "./notrack-web/stream.ts";
import { extractJsonObject, parseToolCallBlocks } from "./notrack-web/tools.ts";
import type { DispatchPayload, NotrackExecuteResult, OpenAIMessage } from "./notrack-web/types.ts";

interface PreparedNotrackRequest {
  cookie: string;
  userInput: string;
  useTools: boolean;
  dispatchPayload: DispatchPayload;
  headers: Record<string, string>;
}

export class NotrackWebExecutor extends BaseExecutor {
  constructor() {
    super("notrack-web", { id: "notrack-web", baseUrl: NOTRACK_DISPATCH_URL });
  }

  async execute(input: ExecuteInput): Promise<NotrackExecuteResult> {
    const prepared = this.prepare(input);
    if ("error" in prepared) return prepared.error;
    const fetched = await this.dispatch(input, prepared);
    if ("error" in fetched) return fetched.error;
    return this.complete(input, prepared, fetched.response);
  }

  private prepare(input: ExecuteInput): PreparedNotrackRequest | { error: NotrackExecuteResult } {
    const bodyObj = (input.body || {}) as Record<string, unknown>;
    const messages = bodyObj.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { error: notrackErrorResponse(400, "Missing or empty messages array") };
    }
    const cookie = this.resolveCookie(input.credentials);
    if ("error" in cookie) return cookie;
    const { userInput, useTools } = buildNotrackUserInput(messages as OpenAIMessage[], bodyObj);
    if (!userInput.trim()) {
      return { error: notrackErrorResponse(400, "Empty prompt after processing messages") };
    }
    const dispatchPayload = buildDispatchPayload(userInput, bodyObj);
    return {
      cookie: cookie.cookie,
      userInput,
      useTools,
      dispatchPayload,
      headers: buildUpstreamHeaders(cookie.cookie, input.upstreamExtraHeaders),
    };
  }

  private resolveCookie(
    credentials: ExecuteInput["credentials"]
  ): { cookie: string } | { error: NotrackExecuteResult } {
    const rawCookieSource = resolveNotrackCookieSource(credentials);
    if (isEncryptedCredentialBlob(rawCookieSource)) {
      return {
        error: notrackErrorResponse(
          401,
          "Notrack credentials are encrypted but STORAGE_ENCRYPTION_KEY is not loaded. " +
            "Restore the encryption key or re-save the Notrack cookie."
        ),
      };
    }
    const { cookie, hasSession } = buildNotrackCookie(rawCookieSource);
    if (!hasSession) {
      return {
        error: notrackErrorResponse(
          401,
          "Notrack requires a session cookie. Log in to notrack.ai, open " +
            "DevTools → Network → any /api request → Request Headers → Cookie, " +
            "and paste the full Cookie header (it must contain uid, si_usr_id, and si_ses_id)."
        ),
      };
    }
    return { cookie };
  }

  private async dispatch(
    input: ExecuteInput,
    prepared: PreparedNotrackRequest
  ): Promise<{ response: Response } | { error: NotrackExecuteResult }> {
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;
    try {
      const upstreamResponse = await fetch(NOTRACK_DISPATCH_URL, {
        method: "POST",
        headers: prepared.headers,
        body: JSON.stringify(prepared.dispatchPayload),
        signal: combinedSignal,
      });
      if (!upstreamResponse.ok) {
        const text = await upstreamResponse.text().catch(() => "");
        return { error: mapUpstreamHttpError(upstreamResponse.status, text) };
      }
      if (!upstreamResponse.body) {
        return { error: notrackErrorResponse(502, "Notrack returned empty response body") };
      }
      return { response: upstreamResponse };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      input.log?.error?.("NOTRACK-WEB", `Fetch failed: ${message}`);
      const status = err instanceof Error && err.name === "TimeoutError" ? 504 : 502;
      return {
        error: notrackErrorResponse(
          status,
          `Notrack connection failed: ${sanitizeErrorMessage(message)}`
        ),
      };
    }
  }

  private complete(
    input: ExecuteInput,
    prepared: PreparedNotrackRequest,
    upstreamResponse: Response
  ): NotrackExecuteResult | Promise<NotrackExecuteResult> {
    const bodyObj = (input.body || {}) as Record<string, unknown>;
    const id = `chatcmpl-notrack-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);
    const modelOut = resolvedModel(input.model);
    if (input.stream) {
      return this.streamResult(input, prepared, upstreamResponse, id, created, modelOut, bodyObj);
    }
    return this.collectResult(input, prepared, upstreamResponse, id, created, modelOut, bodyObj);
  }

  private streamResult(
    input: ExecuteInput,
    prepared: PreparedNotrackRequest,
    upstreamResponse: Response,
    id: string,
    created: number,
    modelOut: string,
    bodyObj: Record<string, unknown>
  ): NotrackExecuteResult {
    const streamOptions =
      bodyObj.stream_options && typeof bodyObj.stream_options === "object"
        ? (bodyObj.stream_options as Record<string, unknown>)
        : null;
    return {
      response: new Response(
        transformNotrackStream(
          upstreamResponse.body as ReadableStream<Uint8Array>,
          modelOut,
          id,
          created,
          prepared.userInput,
          streamOptions?.include_usage === true,
          input.signal,
          input.log
        ),
        {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
          },
        }
      ),
      url: NOTRACK_DISPATCH_URL,
      headers: prepared.headers,
      transformedBody: prepared.dispatchPayload,
    };
  }

  private async collectResult(
    input: ExecuteInput,
    prepared: PreparedNotrackRequest,
    upstreamResponse: Response,
    id: string,
    created: number,
    modelOut: string,
    bodyObj: Record<string, unknown>
  ): Promise<NotrackExecuteResult> {
    const collected = await collectNotrackResponse(
      upstreamResponse.body as ReadableStream<Uint8Array>,
      input.signal,
      input.log
    );
    const shaped = shapeNonStreamContent(collected.content, prepared.useTools, id, bodyObj);
    return {
      response: new Response(
        JSON.stringify(
          buildNonStreamBody(id, created, modelOut, shaped, prepared.userInput, collected)
        ),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
      url: NOTRACK_DISPATCH_URL,
      headers: prepared.headers,
      transformedBody: prepared.dispatchPayload,
    };
  }
}

function shapeNonStreamContent(
  content: string,
  useTools: boolean,
  id: string,
  bodyObj: Record<string, unknown>
): {
  finalContent: string;
  parsedToolCalls: Array<Record<string, unknown>> | null;
  finishReason: "stop" | "tool_calls";
} {
  let finalContent = content;
  let parsedToolCalls: Array<Record<string, unknown>> | null = null;
  let finishReason: "stop" | "tool_calls" = "stop";
  if (useTools) {
    const parsed = parseToolCallBlocks(finalContent, `call-${id.slice(-8)}`);
    finalContent = parsed.content;
    parsedToolCalls = parsed.toolCalls;
    if (parsedToolCalls && parsedToolCalls.length > 0) finishReason = "tool_calls";
  }
  finalContent = applyResponseFormat(finalContent, bodyObj.response_format);
  return { finalContent, parsedToolCalls, finishReason };
}

function applyResponseFormat(content: string, responseFormat: unknown): string {
  if (!responseFormat || typeof responseFormat !== "object") return content;
  const type = (responseFormat as Record<string, unknown>).type;
  if (type !== "json_object" && type !== "json_schema") return content;
  const extracted = extractJsonObject(content);
  if (extracted === null) return content;
  try {
    return JSON.stringify(extracted);
  } catch {
    return content;
  }
}

function buildNonStreamBody(
  id: string,
  created: number,
  modelOut: string,
  shaped: {
    finalContent: string;
    parsedToolCalls: Array<Record<string, unknown>> | null;
    finishReason: "stop" | "tool_calls";
  },
  userInput: string,
  collected: { chatMeta: string | null; userMsgId: string | null; assistantTurn: number | null }
): Record<string, unknown> {
  const completionTokens = estimateTokens(shaped.finalContent);
  const promptTokens = estimateTokens(userInput);
  const messagePayload: Record<string, unknown> = { role: "assistant", refusal: null };
  if (shaped.parsedToolCalls && shaped.parsedToolCalls.length > 0) {
    messagePayload.content = shaped.finalContent || null;
    messagePayload.tool_calls = shaped.parsedToolCalls;
  } else {
    messagePayload.content = shaped.finalContent;
  }
  return {
    id,
    object: "chat.completion",
    created,
    model: modelOut,
    system_fingerprint: "fp_notrack",
    choices: [
      { index: 0, message: messagePayload, logprobs: null, finish_reason: shaped.finishReason },
    ],
    usage: {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: promptTokens + completionTokens,
    },
    notrack: {
      chat_id: collected.chatMeta,
      user_message_id: collected.userMsgId,
      assistant_turn: collected.assistantTurn,
    },
  };
}
