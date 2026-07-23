/**
 * Early SSE keepalive wrapper for streaming route handlers.
 *
 * Strict HTTP clients (notably Codex CLI's `reqwest`, which has a ~5s idle-read
 * timeout) drop the connection if no bytes arrive shortly after the request.
 * OmniRoute, however, holds the streaming response until `ensureStreamReadiness`
 * observes the upstream's first useful byte — which can exceed 5s for reasoning
 * models that "think" before emitting any token (#2544). `curl` has no such
 * idle timeout, so it was never affected, which is why the bug looked
 * client-specific.
 *
 * This wrapper keeps the connection warm without disturbing the handler's
 * internal logic (combo failover, stream readiness, account cooldown all still
 * run inside the handler before it resolves):
 *
 *   - Fast path: if the handler resolves within `thresholdMs`, its `Response`
 *     is returned verbatim — identical status, headers, and body. There is zero
 *     behavior change for normal latency, so metadata headers and non-200 error
 *     statuses are fully preserved for the common case.
 *
 *   - Slow path: if the handler is still pending after `thresholdMs`, a 200
 *     `text/event-stream` response is opened immediately and SSE comment
 *     heartbeats are emitted every `intervalMs` until the handler resolves; its
 *     body is then forwarded. If the handler ultimately fails, a structured
 *     `event: error` frame is emitted in-band (the response is already committed
 *     to 200, so the HTTP status can no longer change).
 */

const ENCODER = new TextEncoder();
const KEEPALIVE_FRAME = ENCODER.encode(": omniroute-keepalive\n\n");
// OpenAI-compatible keepalive: a syntactically valid empty streaming chunk.
// Some OpenAI-compatible clients parse every non-empty SSE line as JSON and
// reject legal SSE comments before their first provider chunk arrives.
export const OPENAI_KEEPALIVE_FRAME = ENCODER.encode(
  'data: {"id":"omniroute-keepalive","object":"chat.completion.chunk","created":0,"model":"omniroute","choices":[{"index":0,"delta":{},"finish_reason":null}]}\n\n'
);
// #7360 follow-up: the FIRST frame of the slow path carries visible content
// instead of an empty delta, framed as a reasoning/thinking chunk (the same
// shape OmniRoute already emits for real upstream reasoning — see
// open-sse/translator/response/claude-to-openai.ts's createChunk) so
// reasoning-aware clients render it instead of silently ignoring it. This is
// what lets OmniRoute safely wait out a longer Gemini rate-limit cooldown
// (see comboCooldownWait/waitForCooldown budgetMs) without the client's own
// first-event/idle-read timeout firing — the client sees a real byte
// immediately, it just says we're still working on it.
const STARTUP_THINKING_TEXT = "OmniRoute: got request, sending to provider";
export const OPENAI_STARTUP_THINKING_FRAME = ENCODER.encode(
  `data: ${JSON.stringify({
    id: "omniroute-keepalive",
    object: "chat.completion.chunk",
    created: 0,
    model: "omniroute",
    choices: [
      { index: 0, delta: { reasoning_content: STARTUP_THINKING_TEXT }, finish_reason: null },
    ],
  })}\n\n`
);
// Anthropic Messages-format keepalive: a REAL `ping` SSE event, not a comment.
// Anthropic clients (Claude Code, the Anthropic SDK) reset their stream/first-token
// watchdog on real SSE events but ignore SSE comments (`: ...`), so on a slow first
// token the comment frame lets the client abort and retry the stream. Anthropic's own
// API emits `event: ping` for exactly this reason; the /v1/messages route mirrors it.
export const ANTHROPIC_PING_FRAME = ENCODER.encode('event: ping\ndata: {"type":"ping"}\n\n');
// Responses API keepalive: a self-contained, self-closed synthetic reasoning
// item (added -> summary_part.added -> text.delta -> summary_part.done),
// matching the abbreviated close pattern open-sse/utils/stream.ts's own
// emitSyntheticResponsesReasoningSummary already uses for real mid-stream
// reasoning. Closed within this one frame (not left dangling open) since the
// real upstream response — once it arrives — starts its own independent
// response.created lifecycle from scratch; this placeholder item never
// carries a response_id and isn't meant to be continued.
const RESPONSES_STARTUP_ITEM_ID = "rs_omniroute_keepalive";
export const RESPONSES_STARTUP_THINKING_FRAME = ENCODER.encode(
  [
    {
      event: "response.output_item.added",
      data: {
        type: "response.output_item.added",
        output_index: 0,
        item: { id: RESPONSES_STARTUP_ITEM_ID, type: "reasoning", summary: [] },
      },
    },
    {
      event: "response.reasoning_summary_part.added",
      data: {
        type: "response.reasoning_summary_part.added",
        item_id: RESPONSES_STARTUP_ITEM_ID,
        output_index: 0,
        summary_index: 0,
        part: { type: "summary_text", text: "" },
      },
    },
    {
      event: "response.reasoning_summary_text.delta",
      data: {
        type: "response.reasoning_summary_text.delta",
        item_id: RESPONSES_STARTUP_ITEM_ID,
        output_index: 0,
        summary_index: 0,
        delta: STARTUP_THINKING_TEXT,
      },
    },
    {
      event: "response.reasoning_summary_part.done",
      data: {
        type: "response.reasoning_summary_part.done",
        item_id: RESPONSES_STARTUP_ITEM_ID,
        output_index: 0,
        summary_index: 0,
        part: { type: "summary_text", text: STARTUP_THINKING_TEXT },
      },
    },
  ]
    .map((e) => `event: ${e.event}\ndata: ${JSON.stringify(e.data)}\n\n`)
    .join("")
);
// Anthropic Messages API default — Anthropic's own spec really does use a named
// `event: error` SSE frame, so this is correct there. It is WRONG for the OpenAI-
// format routes below: Chat Completions and Responses streaming never use the SSE
// `event:` field at all, only bare `data: {...}` lines — a naive line-based parser
// (the kind most OpenAI-compatible clients use, not a full EventSource) can silently
// drop an unrecognized `event:` line and/or desync on the `data:` line that follows,
// so this error would never surface to the client at all (log ids
// 1784465227489-a2cbc0 / 1784457764961-73 territory: a client that gives up with no
// visible reason). See OPENAI_CHAT_ERROR_FRAME / OPENAI_RESPONSES_ERROR_FRAME below
// for the per-format-correct alternatives.
const ERROR_FRAME = ENCODER.encode(
  `event: error\ndata: ${JSON.stringify({
    error: { message: "Upstream stream failed before completion.", type: "stream_error" },
  })}\n\n`
);
// Chat Completions convention: a plain `data:` line, no `event:` field. This
// matches what the openai-node SDK's stream iterator actually checks for — it
// inspects each parsed chunk for a top-level `error` key regardless of any SSE
// event name (there isn't one to check, since real OpenAI chat completions
// streams never send `event:` lines).
export const OPENAI_CHAT_ERROR_FRAME = ENCODER.encode(
  `data: ${JSON.stringify({
    error: { message: "Upstream stream failed before completion.", type: "stream_error" },
  })}\n\n`
);
// Responses API convention: also a plain `data:` line, but the discriminator is
// the `type` field INSIDE the JSON payload (matching every other Responses API
// event — response.output_text.delta, response.completed, etc.), not an SSE
// `event:` field.
export const OPENAI_RESPONSES_ERROR_FRAME = ENCODER.encode(
  `data: ${JSON.stringify({
    type: "error",
    code: null,
    message: "Upstream stream failed before completion.",
    param: null,
  })}\n\n`
);

export type EarlyStreamKeepaliveOptions = {
  /** Wait this long for the handler before committing to a keepalive stream. */
  thresholdMs?: number;
  /** Keepalive cadence once committed (must stay under the client idle timeout). */
  intervalMs?: number;
  /** Client request signal — propagated so a client disconnect cancels the upstream read. */
  signal?: AbortSignal | null;
  /**
   * Frame emitted on each keepalive tick. Defaults to an SSE comment
   * (`: omniroute-keepalive`). Anthropic-format routes (/v1/messages) must pass
   * `ANTHROPIC_PING_FRAME` instead, because Anthropic clients ignore SSE comments
   * for their stream watchdog and only a real `event: ping` keeps them from aborting.
   */
  keepaliveFrame?: Uint8Array;
  /**
   * Frame emitted ONCE, immediately, as the very first byte of the slow path —
   * before the recurring `keepaliveFrame` ticks start. Defaults to
   * `keepaliveFrame` when omitted (today's behavior, unchanged). Pass a
   * content-bearing frame (e.g. `OPENAI_STARTUP_THINKING_FRAME`) so the client
   * sees visible progress instead of an empty/no-op keepalive on the first byte.
   */
  startupFrame?: Uint8Array;
  /** Extra headers to include in the keepalive response (e.g. X-Correlation-Id). */
  extraHeaders?: Record<string, string>;
  /**
   * Frame emitted if the handler ultimately fails (or the upstream stream dies
   * mid-flight with zero bytes forwarded) after the slow path has already
   * committed to HTTP 200. Defaults to the Anthropic-style `event: error` frame
   * (correct for /v1/messages). OpenAI-format routes (/v1/chat/completions,
   * /v1/responses) MUST pass OPENAI_CHAT_ERROR_FRAME / OPENAI_RESPONSES_ERROR_FRAME
   * instead — see the doc comment on the default ERROR_FRAME above for why.
   */
  errorFrame?: Uint8Array;
};

type SettledHandler = { ok: true; response: Response } | { ok: false; error: unknown };

export async function withEarlyStreamKeepalive(
  handlerPromise: Promise<Response>,
  options: EarlyStreamKeepaliveOptions = {}
): Promise<Response> {
  const thresholdMs = Math.max(0, options.thresholdMs ?? 2_000);
  const intervalMs = Math.max(250, options.intervalMs ?? 2_500);
  const signal = options.signal ?? null;
  const keepaliveFrame = options.keepaliveFrame ?? KEEPALIVE_FRAME;
  const startupFrame = options.startupFrame ?? keepaliveFrame;
  const extraHeaders = options.extraHeaders ?? {};
  const errorFrame = options.errorFrame ?? ERROR_FRAME;
  // Single source of truth for whether THIS route's error framing uses a named SSE
  // `event: error` line (Anthropic) or a plain `data:` line (OpenAI Chat Completions /
  // Responses) — derived from errorFrame itself so the dynamic real-upstream-body case
  // below stays consistent with the static default-message case without a second option.
  const errorFrameUsesNamedEvent = new TextDecoder().decode(errorFrame).startsWith("event:");

  // Settle into a tagged result so neither race branch leaves an unhandled
  // rejection when the threshold timer wins.
  const settled: Promise<SettledHandler> = handlerPromise.then(
    (response) => ({ ok: true as const, response }),
    (error) => ({ ok: false as const, error })
  );

  let timer: ReturnType<typeof setTimeout> | undefined;
  const raced = await Promise.race([
    settled.then((result) => ({ kind: "settled" as const, result })),
    new Promise<{ kind: "timeout" }>((resolve) => {
      timer = setTimeout(() => resolve({ kind: "timeout" }), thresholdMs);
    }),
  ]);
  if (timer) clearTimeout(timer);

  if (raced.kind === "settled") {
    // Fast path — return verbatim, or rethrow so the route's normal error handling runs.
    if (raced.result.ok) return raced.result.response;
    throw raced.result.error;
  }

  // Slow path — open the SSE stream now and keep it warm until the handler resolves.
  // Cleanup state is hoisted so both start() and cancel() (client disconnect) can stop
  // the keepalive loop and cancel the upstream read.
  let stopKeepalive = () => {};
  let upstreamReader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let aborted = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let stopped = false;
      const interval = setInterval(() => {
        if (stopped) return;
        try {
          controller.enqueue(keepaliveFrame);
        } catch {
          stopped = true;
          clearInterval(interval);
        }
      }, intervalMs);
      if (interval && typeof interval === "object" && "unref" in interval) {
        interval.unref?.();
      }
      // First frame immediately on commit so the client sees a byte right away.
      // Use `startupFrame` (e.g. OPENAI_STARTUP_THINKING_FRAME / ANTHROPIC_PING_FRAME)
      // — an SSE comment here would be ignored by Anthropic clients' watchdog on a
      // sub-interval gap, defeating the keepalive for exactly the case it targets.
      try {
        controller.enqueue(startupFrame);
      } catch {
        /* consumer already gone */
      }

      stopKeepalive = () => {
        stopped = true;
        clearInterval(interval);
      };

      const onAbort = () => {
        if (aborted) return;
        aborted = true;
        stopKeepalive();
        upstreamReader?.cancel().catch(() => {});
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };
      signal?.addEventListener("abort", onAbort, { once: true });
      // addEventListener does not replay an abort that happened before registration.
      // Checking after registration closes that gap without missing a concurrent abort.
      if (signal?.aborted) onAbort();

      try {
        const result = await settled;
        stopKeepalive();
        if (aborted) {
          // The synthetic keepalive response can be cancelled before the handler resolves.
          // Cancel the eventual real response so its upstream work and lifecycle hooks finish.
          if (result.ok && result.response.body) {
            await result.response.body.cancel().catch(() => undefined);
          }
          return;
        }

        if (!result.ok) {
          // Handler rejected — emit a generic error frame (never the raw error/stack).
          controller.enqueue(errorFrame);
        } else {
          const response = result.response;
          const contentType = (response.headers.get("content-type") || "").toLowerCase();
          const isSse = contentType.includes("text/event-stream");

          if (response.body && isSse) {
            // Real SSE stream — forward it verbatim.
            upstreamReader = response.body.getReader();
            let bytesForwarded = 0;
            try {
              while (true) {
                const { done, value } = await upstreamReader.read();
                if (done) break;
                if (value) {
                  controller.enqueue(value);
                  bytesForwarded += value.byteLength;
                }
              }
            } catch (readErr) {
              // Upstream stream failed mid-flight. Only emit an error frame if
              // NO content was forwarded yet — otherwise the client already
              // received partial content and a late error frame would corrupt
              // the SSE stream. Silently close instead; the client will see
              // the stream end naturally.
              if (bytesForwarded === 0) {
                controller.enqueue(errorFrame);
              }
            }
          } else {
            // Non-SSE response (e.g. a JSON error) reached us after we already
            // committed to a 200 event-stream, so the HTTP status can no longer
            // change. Frame the (already-sanitized) body as an in-band error event
            // instead of forwarding raw JSON, which would be malformed SSE.
            const text = response.body ? await response.text().catch(() => "") : "";
            const dataLine =
              text.trim() ||
              JSON.stringify({ error: { message: "stream_error", type: "stream_error" } });
            const framed = errorFrameUsesNamedEvent
              ? `event: error\ndata: ${dataLine}\n\n`
              : `data: ${dataLine}\n\n`;
            controller.enqueue(ENCODER.encode(framed));
          }
        }
      } catch {
        // Defensive: never surface a raw error/stack to the client.
        if (!aborted) {
          try {
            controller.enqueue(errorFrame);
          } catch {
            /* consumer gone */
          }
        }
      } finally {
        stopKeepalive();
        signal?.removeEventListener("abort", onAbort);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      // Consumer (Next.js → client) went away — stop keepalives and release the upstream.
      aborted = true;
      stopKeepalive();
      upstreamReader?.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      ...extraHeaders,
    },
  });
}
