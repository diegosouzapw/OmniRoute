/**
 * Diagnostics for malformed HTTP-200 upstream responses.
 *
 * Surfaces HTTP-200-but-empty upstream responses (empty SSE stream, empty
 * translated body) as structured, sanitized errors rather than silent
 * `output:[]` / `choices:[]` successes.
 *
 * Hard Rule #12: every string that reaches an HTTP/SSE response body MUST
 * route through sanitizeErrorMessage(). All helpers below enforce this.
 */

import { sanitizeErrorMessage } from "./error.ts";

// ── Types ────────────────────────────────────────────────────────────────────

export type MalformedReason =
  | "empty"
  | "stall"
  | "abort"
  | "client_closed"
  | "no_terminal"
  | "parse_fail"
  | "empty_choices"
  | "empty_stream"
  | string;

export interface ReportMalformed200Opts {
  mode: string;
  provider?: string | null;
  model?: string | null;
  connectionId?: string | null;
  reason?: MalformedReason;
  recvBytes?: number;
  recvLines?: number;
  emitted?: number;
  events?: Record<string, number>;
  ttftMs?: number;
  elapsedMs?: number;
}

// ── Internal helpers ─────────────────────────────────────────────────────────

// Human-readable reason text surfaced to the client and logs.
// These strings end up in error.message — they are passed through
// sanitizeErrorMessage before being embedded in any response body.
const REASON_MESSAGES: Record<string, string> = {
  empty: "no content produced",
  stall: "stream stalled (no data within the stall window)",
  abort: "stream aborted",
  client_closed: "client closed the connection",
  no_terminal: "stream closed without a terminal event",
  parse_fail: "failed to parse upstream stream",
  empty_choices: "response had no usable choices/output",
  empty_stream: "upstream stream carried no content",
};

function describeReason(reason?: MalformedReason): string {
  if (!reason) return "empty response";
  return REASON_MESSAGES[reason] ?? reason;
}

// ── Exports ──────────────────────────────────────────────────────────────────

/**
 * Log one structured [MALFORMED-200] line to stdout.
 * Noop-safe (any field is optional). Used by streaming + non-streaming
 * handlers to emit a single, grep-correlatable diagnostic entry.
 */
export function reportMalformed200(opts: ReportMalformed200Opts): void {
  const {
    mode,
    provider,
    model,
    connectionId,
    reason,
    recvBytes,
    recvLines,
    emitted,
    events,
    ttftMs,
    elapsedMs,
  } = opts;
  const evtStr =
    events && typeof events === "object"
      ? `[${Object.entries(events)
          .map(([k, v]) => `${k}=${v}`)
          .join(",")}]`
      : "[]";
  console.log(
    `[MALFORMED-200] mode=${mode || "?"} provider=${provider || "?"} model=${model || "?"} ` +
      `conn=${connectionId || "-"} reason=${reason || "empty"} recvBytes=${recvBytes ?? -1} ` +
      `recvLines=${recvLines ?? -1} emitted=${emitted ?? -1} events=${evtStr} ` +
      `ttft=${ttftMs ?? -1}ms dur=${elapsedMs ?? -1}ms`
  );
}

/**
 * Synthesize an OpenAI chat.completion.chunk SSE line for an empty stream.
 * Caller enqueues this before the terminal `data: [DONE]`.
 *
 * All user-visible strings are sanitized through sanitizeErrorMessage
 * (Hard Rule #12) to prevent stack-trace exposure.
 */
export function synthOpenAIErrorChunk(opts: {
  provider?: string | null;
  model?: string | null;
  reason?: MalformedReason;
}): string {
  const { provider, model, reason } = opts;
  const reasonText = sanitizeErrorMessage(describeReason(reason));
  const providerPart = sanitizeErrorMessage(provider ?? "?");
  const safeMessage = sanitizeErrorMessage(
    `[${providerPart}] returned an empty response (${reasonText}). ` +
      "Likely quota exhaustion, an overloaded upstream, or a proxy/gateway intercepting the stream."
  );
  const body = {
    id: `chatcmpl-empty-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: sanitizeErrorMessage(model ?? "unknown"),
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    error: {
      message: safeMessage,
      type: "upstream_empty_response",
    },
  };
  return `data: ${JSON.stringify(body)}\n\n`;
}

/**
 * Synthesize a response.failed SSE event for an empty/aborted Responses API
 * passthrough stream.
 *
 * Message is sanitized through sanitizeErrorMessage (Hard Rule #12).
 */
export function synthResponsesFailure(reason?: MalformedReason): string {
  const safeMessage = sanitizeErrorMessage(
    `stream closed before response.completed (${describeReason(reason)})`
  );
  const event = {
    type: "response.failed",
    response: {
      id: null,
      status: "failed",
      error: {
        type: "stream_error",
        code: "stream_disconnected",
        message: safeMessage,
      },
    },
  };
  return `event: response.failed\ndata: ${JSON.stringify(event)}\n\n`;
}

/**
 * Decide whether a *translated* non-streaming body is malformed for the client.
 *
 * Returns a reason string ("empty_choices" | "no_terminal") when the body is
 * malformed, or null when it carries usable output.
 *
 * This runs *after* response translation so it catches cases the raw-body
 * checks above miss (e.g. a provider returning a valid non-empty raw body that
 * translates into an OpenAI `choices:[]` with no content).
 *
 * Design notes:
 * - Reasoning-only responses (content="" + reasoning_content) are intentionally
 *   allowed — they are valid completions, not errors.
 * - Tool-call responses (content=null + tool_calls=[…]) are also valid.
 * - Responses API function_call / other structural items count as output even
 *   when they carry no user-visible text.
 */
export function detectMalformedNonStream(resp: unknown): MalformedReason | null {
  if (!resp || typeof resp !== "object") return "empty_choices";

  const body = resp as Record<string, unknown>;

  // ── Responses API shape ──
  if (body.object === "response") {
    const output = body.output;
    const hasOutput =
      Array.isArray(output) &&
      output.some((item) => {
        if (!item || typeof item !== "object") return false;
        const it = item as Record<string, unknown>;
        if (it.type === "message") {
          return (
            Array.isArray(it.content) &&
            (it.content as unknown[]).some((c) => {
              const part = c as Record<string, unknown>;
              return typeof part?.text === "string" && (part.text as string).length > 0;
            })
          );
        }
        // function_call / other structural items count
        return Boolean(it.type);
      });
    if (!hasOutput) return "empty_choices";
    const status = typeof body.status === "string" ? body.status : "";
    if (status && !["completed", "done"].includes(status)) return "no_terminal";
    return null;
  }

  // ── Claude API shape (native passthrough: type:"message" + content:[]) ──
  if (body.type === "message") {
    const content = body.content;
    if (!Array.isArray(content) || content.length === 0) return "empty_choices";

    const hasOutput = content.some((block: Record<string, unknown>) => {
      if (block === null || typeof block !== "object") return false;
      if (block.type === "text" && typeof block.text === "string" && block.text.length > 0)
        return true;
      if (block.type === "tool_use") return true;
      if (block.type === "tool_result") return true;
      return false;
    });

    if (!hasOutput) return "empty_choices";
    const stopReason = body.stop_reason;
    if (stopReason === null) return "no_terminal";
    return null;
  }

  // ── Chat Completions shape ──
  const choices = body.choices;
  if (!Array.isArray(choices) || choices.length === 0) return "empty_choices";

  const anyHasOutput = choices.some((choice) => {
    const c = choice as Record<string, unknown>;
    const msg = c?.message as Record<string, unknown> | undefined;
    if (typeof msg?.content === "string" && (msg.content as string).length > 0) return true;
    if (Array.isArray(msg?.tool_calls) && (msg.tool_calls as unknown[]).length > 0) return true;
    if (typeof msg?.reasoning_content === "string" && (msg.reasoning_content as string).length > 0)
      return true;
    return false;
  });

  if (!anyHasOutput) return "empty_choices";
  return null;
}

// ── Test-only export ─────────────────────────────────────────────────────────
export const __test = { describeReason };
