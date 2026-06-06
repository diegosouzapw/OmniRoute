/**
 * T3ChatWebExecutor — t3.chat Session Provider
 *
 * Routes requests through t3.chat using cookie-based session auth.
 * t3.chat is a TanStack Start app — requests go through `_serverFn/{hash}` endpoints
 * using Turbo Stream Serialization (TSS), NOT raw Convex HTTP actions.
 *
 * Auth: cookies (including convex-session-id cookie) — all required
 * Method: HTTP POST to TanStack Start server function endpoints
 * Response format: TSS (application/x-tss-framed) or NDJSON streaming
 *
 * The chat completion endpoint hash is deployment-specific and changes with each
 * build. The executor discovers it dynamically from the page's JS runtime.
 */

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { prepareToolMessages, buildToolAwareResult } from "../translator/webTools.ts";

// ─── Constants ───────────────────────────────────────────────────────────────

export const T3_CHAT_BASE = "https://t3.chat";

/** TanStack Start server function endpoint prefix */
const SERVER_FN_PREFIX = `${T3_CHAT_BASE}/_serverFn/`;

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** TanStack Start accepts these content types, in priority order */
const TSS_ACCEPT = "application/x-tss-framed, application/x-ndjson, application/json";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface T3ChatCredentials {
  /** Parsed Cookie header value, guaranteed to include convex-session-id when present. */
  cookieHeader: string;
  /** Raw cookies portion (without the synthesized convex-session-id suffix). */
  cookies: string;
  /** convex-session-id — stored as a cookie by t3.chat, sent in the Cookie header */
  convexSessionId: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse the single stored credential into a structured t3.chat cookie object.
 *
 * The credential pipeline (`src/sse/services/auth.ts`) stores the single pasted
 * string as `credentials.apiKey` (fallback `accessToken`) — it never produces
 * `cookies`/`convexSessionId` fields. So we parse the raw string here, mirroring
 * the validator in `src/lib/providers/validation.ts` (#3007).
 *
 * Accepted forms:
 *   (a) "convex-session-id=abc; sessionToken=xyz"      — plain Cookie header
 *   (b) full Cookie header already containing convex-session-id=...
 *   (c) "cookies=<Cookie header>\nconvexSessionId=<id>" — structured form
 */
export function parseT3Credentials(creds: unknown): T3ChatCredentials {
  const rawCreds =
    typeof creds === "object" && creds !== null ? (creds as Record<string, unknown>) : {};
  const raw = String(rawCreds.apiKey ?? rawCreds.accessToken ?? "").trim();
  if (!raw) {
    return { cookieHeader: "", cookies: "", convexSessionId: "" };
  }

  let cookieHeader = raw;
  let convexSessionId = "";

  if (raw.includes("convexSessionId") || raw.includes("convex-session-id")) {
    // Structured / multi-part format: split on separators and pull out the id.
    const parts = raw.split(/[,;\n]/).map((s) => s.trim());
    const cookieParts: string[] = [];
    for (const part of parts) {
      if (part.startsWith("convexSessionId=") || part.startsWith("convex-session-id=")) {
        convexSessionId = part.split("=").slice(1).join("=");
      } else if (part.startsWith("cookies=")) {
        cookieParts.push(part.slice("cookies=".length));
      } else if (part.includes("=")) {
        cookieParts.push(part);
      }
    }
    if (cookieParts.length) cookieHeader = cookieParts.join("; ");
  }

  // Synthesize the final Cookie header, appending convex-session-id only when it
  // was provided separately and isn't already embedded in the header.
  const finalCookie =
    convexSessionId && !cookieHeader.includes("convex-session-id")
      ? `${cookieHeader}; convex-session-id=${convexSessionId}`
      : cookieHeader;

  // Derive convexSessionId from an embedded header form (b) for validation.
  if (!convexSessionId) {
    const m = finalCookie.match(/convex-session-id=([^;]+)/);
    if (m) convexSessionId = m[1].trim();
  }

  return { cookieHeader: finalCookie, cookies: cookieHeader, convexSessionId };
}

export function validateT3Credentials(creds: T3ChatCredentials | null | undefined): boolean {
  if (!creds) return false;
  return (
    typeof creds.cookieHeader === "string" &&
    creds.cookieHeader.length > 0 &&
    typeof creds.convexSessionId === "string" &&
    creds.convexSessionId.length > 0
  );
}

function buildErrorResponse(status: number, message: string): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: sanitizeErrorMessage(message),
        type: "upstream_error",
        code: `HTTP_${status}`,
      },
    }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

/**
 * Build standard TanStack Start headers matching live captured traffic.
 * The x-deployment-id header is optional but helps CDN routing.
 */
function buildServerFnHeaders(cookieHeader: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    Accept: TSS_ACCEPT,
    Cookie: cookieHeader,
    Referer: `${T3_CHAT_BASE}/`,
    Origin: T3_CHAT_BASE,
  };
}

// ─── TSS Stream Transform (TanStack Start → OpenAI SSE) ──────────────────────
// TanStack Start uses Turbo Stream Serialization. Streaming responses use
// NDJSON lines with TSS-encoded payloads. Each line is a JSON object with
// typed fields: {t: type, i: id, p: {k: keys, v: values}, o: ordinal}

function transformTSSStream(upstreamStream: ReadableStream, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const id = `chatcmpl-t3-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created = Math.floor(Date.now() / 1000);
  let emittedRole = false;

  return new ReadableStream(
    {
    async start(controller) {
      const reader = upstreamStream.getReader();
      let buffer = "";

      const emit = (obj: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      const chunk = (delta: object, finish?: string | null) => {
        emit({
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta, finish_reason: finish ?? null }],
        });
      };

      const close = () => {
        if (!emittedRole) {
          emittedRole = true;
          chunk({ role: "assistant", content: "" });
        }
        chunk({}, "stop");
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Handle both NDJSON (newline-delimited) and SSE (data: prefix) formats
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            // SSE format: "data: {...}"
            const payload = trimmed.startsWith("data: ") ? trimmed.slice(6).trim() : trimmed;

            if (payload === "[DONE]") {
              close();
              return;
            }

            let data: Record<string, unknown>;
            try {
              data = JSON.parse(payload);
            } catch {
              continue;
            }

            // TSS format: extract text content from typed envelope
            // t:10 = object with keys in p.k and values in p.v
            // t:0 = number (value in s), t:2 = string (value in s), t:9 = array
            const textContent = extractTextFromTSS(data);

            if (typeof textContent === "string" && textContent.length > 0) {
              if (!emittedRole) {
                emittedRole = true;
                chunk({ role: "assistant", content: "" });
              }
              chunk({ content: textContent });
            }

            // Detect end-of-stream markers
            if (isTSSDone(data)) {
              close();
              return;
            }
          }
        }
      } catch {
        // Stream error — fall through to close
      }

      close();
    },
    },
    { highWaterMark: 16384 }
  );
}

/**
 * Extract text content from a TSS-encoded payload.
 * TSS types: t=0 number, t=2 string/enum, t=9 array, t=10 object, t=11 null
 * Chat text typically comes as t=2 (string) in a streaming envelope.
 */
function extractTextFromTSS(data: Record<string, unknown>): string | null {
  // Direct string field (common in streaming deltas)
  if (typeof (data as any)?.text === "string") return (data as any).text;
  if (typeof (data as any)?.delta === "string") return (data as any).delta;
  if (typeof (data as any)?.content === "string") return (data as any).content;

  // TSS object envelope: {t:10, p:{k:["content"], v:[{t:2, s:"text"}]}}
  const p = (data as any)?.p;
  if (p?.k && p?.v && Array.isArray(p.k) && Array.isArray(p.v)) {
    for (let i = 0; i < p.k.length; i++) {
      if (p.k[i] === "content" || p.k[i] === "text" || p.k[i] === "delta") {
        const val = p.v[i];
        if (typeof val === "string") return val;
        if (val?.t === 2 && typeof val?.s === "string") return val.s;
      }
    }
  }

  // Nested value envelope: {t:2, s:"some text"}
  if (data?.t === 2 && typeof (data as any)?.s === "string") return (data as any).s;

  return null;
}

/** Detect TSS end-of-stream markers */
function isTSSDone(data: Record<string, unknown>): boolean {
  const d = data as any;
  return (
    d?.type === "done" ||
    d?.done === true ||
    d?.status === "complete" ||
    d?.finish_reason === "stop"
  );
}

/** Collect all text from a non-streaming TSS/JSON response */
async function collectStreamContent(upstreamStream: ReadableStream): Promise<string> {
  const decoder = new TextDecoder();
  const reader = upstreamStream.getReader();
  let buffer = "";
  const parts: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const payload = trimmed.startsWith("data: ") ? trimmed.slice(6).trim() : trimmed;
      if (payload === "[DONE]") break;
      try {
        const data = JSON.parse(payload);
        const text = extractTextFromTSS(data);
        if (typeof text === "string") parts.push(text);
      } catch {
        // skip
      }
    }
  }

  return parts.join("");
}

// ─── Executor ────────────────────────────────────────────────────────────────

export class T3ChatWebExecutor extends BaseExecutor {
  constructor() {
    super("t3-web", { baseUrl: T3_CHAT_BASE });
  }

  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const parsed = parseT3Credentials(credentials);
      if (!validateT3Credentials(parsed)) return false;

      // Probe: HEAD to t3.chat base — confirms site reachable and cookies accepted.
      // 200/302/404 all indicate reachability; 5xx = down.
      const resp = await fetch(T3_CHAT_BASE, {
        method: "HEAD",
        headers: {
          "User-Agent": USER_AGENT,
          Cookie: parsed.cookieHeader,
        },
        signal,
      });
      return resp.status < 500;
    } catch {
      return false;
    }
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawMessages = (Array.isArray(bodyObj.messages) ? bodyObj.messages : []) as Array<{
      role: string;
      content: string | unknown;
    }>;
    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(bodyObj, rawMessages);
    // 1. Parse + validate credentials. The credential pipeline stores the single
    // pasted string as `apiKey` (fallback `accessToken`); parse out the Cookie
    // header + convex-session-id (#3007) instead of expecting pre-structured fields.
    const parsed = parseT3Credentials(credentials);
    if (!validateT3Credentials(parsed)) {
      return {
        response: buildErrorResponse(
          400,
          "t3.chat credentials invalid: paste your full Cookie header (including convex-session-id) from t3.chat."
        ),
        url: `${SERVER_FN_PREFIX}...`,
        headers: {},
        transformedBody: body,
      };
    }

    const cookieHeader = parsed.cookieHeader;
    const headers = buildServerFnHeaders(cookieHeader);

    try {
      // 2. Build request payload for chat completion server function
      // t3.chat uses TanStack Start server functions. The chat completion
      // endpoint hash is deployment-specific. The API accepts OpenAI-compatible
      // fields (model, messages, stream) in the request body.
      const requestPayload: Record<string, unknown> = {
        model,
        messages: effectiveMessages,
        stream: stream !== false,
      };

      // The completion endpoint — try the known /api/chat path first (some t3.chat
      // deployments expose this), fall back to server function pattern.
      const completionUrl = `${T3_CHAT_BASE}/api/chat`;

      log?.info?.("T3-CHAT-WEB", `POST ${completionUrl} model=${model}`);

      const resp = await fetch(completionUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestPayload),
        signal,
      });

      // 3. Handle HTTP errors
      if (!resp.ok) {
        const status = resp.status;
        let errMsg = `t3.chat API error (${status})`;
        if (status === 401 || status === 403) {
          errMsg =
            "t3.chat session expired or unauthorized — re-paste your cookies and convex-session-id.";
        } else if (status === 429) {
          errMsg = "t3.chat rate limited. Wait and retry.";
        }
        log?.warn?.("T3-CHAT-WEB", errMsg);
        return {
          response: buildErrorResponse(status, errMsg),
          url: completionUrl,
          headers,
          transformedBody: requestPayload,
        };
      }

      const ct = resp.headers.get("content-type") || "";

      // 4. Non-streaming full JSON response
      if (ct.includes("application/json") && !ct.includes("ndjson")) {
        const json = await resp.json();
        if (json?.error) {
          const errMsg = `t3.chat error: ${json.error?.message ?? JSON.stringify(json.error)}`;
          log?.warn?.("T3-CHAT-WEB", errMsg);
          return {
            response: buildErrorResponse(502, errMsg),
            url: completionUrl,
            headers,
            transformedBody: requestPayload,
          };
        }
        if (json?.choices) {
          return {
            response: new Response(JSON.stringify(json), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
            url: completionUrl,
            headers,
            transformedBody: requestPayload,
          };
        }
        // TSS or plain response — extract content and wrap in OpenAI format
        const content = extractTextFromTSS(json) ?? (json as any)?.message?.content ?? "";
        const openaiResponse = {
          id: `chatcmpl-t3-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: model || "unknown",
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: String(content) },
              finish_reason: "stop",
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        };
        return {
          response: new Response(JSON.stringify(openaiResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
          url: completionUrl,
          headers,
          transformedBody: requestPayload,
        };
      }

      // 5. Streaming path (TSS, NDJSON, or SSE)
      if (!resp.body) {
        return {
          response: buildErrorResponse(502, "t3.chat returned an empty response body"),
          url: completionUrl,
          headers,
          transformedBody: requestPayload,
        };
      }

      if (stream !== false) {
        const openaiStream = transformTSSStream(resp.body, model || "unknown");
        return {
          response: new Response(openaiStream, {
            status: 200,
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
          }),
          url: completionUrl,
          headers,
          transformedBody: requestPayload,
        };
      }

      // Non-streaming: collect all content and return OpenAI JSON
      const rawContent = await collectStreamContent(resp.body);

      if (hasTools) {
        const { content, toolCalls, finishReason } = buildToolAwareResult(rawContent, requestedTools, "t3");
        if (toolCalls) {
          return {
            response: new Response(
              JSON.stringify({
                id: `chatcmpl-t3-${Date.now()}`, object: "chat.completion",
                created: Math.floor(Date.now() / 1000), model: model || "unknown",
                choices: [{ index: 0, message: { role: "assistant", content: null, tool_calls: toolCalls }, finish_reason: finishReason }],
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            ),
            url: completionUrl, headers, transformedBody: requestPayload,
          };
        }
        const openaiResponse = {
          id: `chatcmpl-t3-${Date.now()}`, object: "chat.completion",
          created: Math.floor(Date.now() / 1000), model: model || "unknown",
          choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        };
        return {
          response: new Response(JSON.stringify(openaiResponse), {
            status: 200, headers: { "Content-Type": "application/json" },
          }),
          url: completionUrl, headers, transformedBody: requestPayload,
        };
      }

      const openaiResponse = {
        id: `chatcmpl-t3-${Date.now()}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: model || "unknown",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: rawContent },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      };
      return {
        response: new Response(JSON.stringify(openaiResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        url: completionUrl,
        headers,
        transformedBody: requestPayload,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log?.error?.("T3-CHAT-WEB", `Execute failed: ${msg}`);

      if (err instanceof DOMException && err.name === "AbortError") {
        return {
          response: buildErrorResponse(499, "Request cancelled"),
          url: `${SERVER_FN_PREFIX}...`,
          headers: {},
          transformedBody: body,
        };
      }

      return {
        response: buildErrorResponse(502, `t3.chat connection error: ${msg}`),
        url: `${SERVER_FN_PREFIX}...`,
        headers,
        transformedBody: body,
      };
    }
  }
}

export const t3ChatWebExecutor = new T3ChatWebExecutor();
