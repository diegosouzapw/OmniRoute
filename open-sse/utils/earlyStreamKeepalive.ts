/**
 * @file earlyStreamKeepalive.ts
 * @description Early SSE keepalive wrapper so short idle-read clients stay connected
 * while the handler waits on upstream first-byte (reasoning models, combo failover).
 *
 * @changes
 * - [2026-07-28] [Cursor Grok 4.5] - Scrub omniroute from client-facing keepalive id/model/comment frames
 * - [2026-07-28] [Cursor Grok 4.5] - Neutralize Responses startup thinking text (no OmniRoute brand leak)
 *
 * Strict HTTP clients (notably Codex CLI's `reqwest`, which has a ~5s idle-read
 * timeout) drop the connection if no bytes arrive shortly after the request.
 * The proxy holds the streaming response until `ensureStreamReadiness` observes
 * the upstream's first useful byte — which can exceed 5s for reasoning models
 * that "think" before emitting any token (#2544). `curl` has no such idle
 * timeout, so it was never affected, which is why the bug looked client-specific.
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

import { recordEarlyKeepaliveBytes } from "./earlyKeepaliveByteBuffer.ts";

const ENCODER = new TextEncoder();
const KEEPALIVE_FRAME = ENCODER.encode(": keepalive\n\n");
// OpenAI-compatible keepalive: a syntactically valid empty streaming chunk.
// Some OpenAI-compatible clients parse every non-empty SSE line as JSON and
// reject legal SSE comments before their first provider chunk arrives.
// id/model stay brand-neutral — these frames go to the client, not upstream.
export const OPENAI_KEEPALIVE_FRAME = ENCODER.encode(
  'data: {"id":"chatcmpl-keepalive","object":"chat.completion.chunk","created":0,"model":"keepalive","choices":[{"index":0,"delta":{},"finish_reason":null}]}\n\n'
);
// The first slow-path frame must be a valid OpenAI chunk without creating
// visible reasoning that clients persist into the conversation.
export const OPENAI_STARTUP_FRAME = OPENAI_KEEPALIVE_FRAME;
// Anthropic Messages-format keepalive: a REAL `ping` SSE event, not a comment.
// Anthropic clients (Claude Code, the Anthropic SDK) reset their stream/first-token
// watchdog on real SSE events but ignore SSE comments (`: ...`), so on a slow first
// token the comment frame lets the client abort and retry the stream. Anthropic's own
// API emits `event: ping` for exactly this reason; the /v1/messages route mirrors it.
export const ANTHROPIC_PING_FRAME = ENCODER.encode('event: ping\ndata: {"type":"ping"}\n\n');
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
    sequence_number: 0,
  })}\n\n`
);

/**
 * Reshapes an already-sanitized upstream error body into the Responses API
 * convention (`{"type":"error",...}`) for the dynamic real-upstream-body branch
 * of the slow path (#13431). The body reaching here is Chat-Completions-shaped
 * (`{"error":{message,type,code}}`, the combo/handler failure convention) most of
 * the time, but may also be a bare `{message}` or unparseable text — every shape
 * must still produce a non-empty `message` so the client never sees an opaque
 * frame (never crash the stream on a malformed body).
 */
function buildResponsesErrorDataLine(text: string): string {
  const trimmed = text.trim();
  let parsed: Record<string, unknown> | null = null;
  if (trimmed) {
    try {
      const candidate = JSON.parse(trimmed);
      if (candidate && typeof candidate === "object") parsed = candidate as Record<string, unknown>;
    } catch {
      parsed = null;
    }
  }
  const errorObj =
    parsed && typeof parsed.error === "object" && parsed.error !== null
      ? (parsed.error as Record<string, unknown>)
      : null;
  const message =
    (typeof errorObj?.message === "string" && errorObj.message) ||
    (typeof parsed?.message === "string" && parsed.message) ||
    trimmed ||
    "Upstream stream failed before completion.";
  const code = (typeof errorObj?.code === "string" && errorObj.code) || null;
  const param = (typeof errorObj?.param === "string" && errorObj.param) || null;
  const extras =
    parsed && typeof parsed.diagnostics === "object" && parsed.diagnostics !== null
      ? { diagnostics: parsed.diagnostics }
      : {};
  return JSON.stringify({ type: "error", code, message, param, sequence_number: 0, ...extras });
}

export type EarlyStreamKeepaliveOptions = {
  /** Wait this long for the handler before committing to a keepalive stream. */
  thresholdMs?: number;
  /** Keepalive cadence once committed (must stay under the client idle timeout). */
  intervalMs?: number;
  /** Client request signal — propagated so a client disconnect cancels the upstream read. */
  signal?: AbortSignal | null;
  /**
   * Frame emitted on each keepalive tick. Defaults to an SSE comment
   * (`: keepalive`). Anthropic-format routes (/v1/messages) must pass
   * `ANTHROPIC_PING_FRAME` instead, because Anthropic clients ignore SSE comments
   * for their stream watchdog and only a real `event: ping` keeps them from aborting.
   */
  keepaliveFrame?: Uint8Array;
  /**
   * Frame emitted ONCE, immediately, as the very first byte of the slow path —
   * before the recurring `keepaliveFrame` ticks start. Defaults to
   * `keepaliveFrame` when omitted (today's behavior, unchanged).
   */
  startupFrame?: Uint8Array;
  /**
   * Optional parser-visible frame emitted at a slower cadence than the transport
   * heartbeat. A due application frame replaces that interval's keepalive frame,
   * so both cadences share one timer and never burst after an event-loop stall.
   */
  applicationKeepalive?: { frame: Uint8Array; intervalMs: number };
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
  /**
   * Request correlation id, threaded from the route's own handleChat(...,
   * correlationId) call. When set, every byte this wrapper writes to the
   * client directly (startup frame, periodic keepalive ticks, and any
   * in-band error frame) — everything except the verbatim-forwarded real
   * response body, which the handler's own reqLogger already captures — is
   * recorded via earlyKeepaliveByteBuffer and merged into this same
   * request's call-log streamChunks.client by
   * chatCore/attemptLogging.ts, so the persisted artifact reflects what
   * actually went out on the wire instead of only what the inner handler
   * produced. Omit to leave today's behavior unchanged (no recording).
   */
  correlationId?: string;
};

/**
 * Tagged with a string rather than an `ok: true | false` boolean: this workspace compiles
 * with `strictNullChecks: false`, where a boolean-literal discriminant narrows the positive
 * branch but not the negative one — so reading `.error` off the rejected arm did not
 * type-check. A string discriminant narrows both branches under the same settings.
 */
type SettledHandler =
  { status: "fulfilled"; response: Response } | { status: "rejected"; error: unknown };

export async function withEarlyStreamKeepalive(
  handlerPromise: Promise<Response>,
  options: EarlyStreamKeepaliveOptions = {}
): Promise<Response> {
  const thresholdMs = Math.max(0, options.thresholdMs ?? 2_000);
  // Cadence must stay under the client idle timeout, per the option docs below.
  // The old 2 500 ms default exceeded the ~2 s watchdog observed in practice, so
  // a client that survived the first keepalive byte aborted on the gap before the
  // next one. 1 500 ms keeps every inter-byte gap inside the same budget the
  // threshold uses (see keepaliveThreshold.ts).
  const intervalMs = Math.max(250, options.intervalMs ?? 1_500);
  const signal = options.signal ?? null;
  const keepaliveFrame = options.keepaliveFrame ?? KEEPALIVE_FRAME;
  const startupFrame = options.startupFrame ?? keepaliveFrame;
  const applicationKeepalive =
    options.applicationKeepalive && options.applicationKeepalive.intervalMs > 0
      ? {
          frame: options.applicationKeepalive.frame,
          intervalMs: Math.max(intervalMs, options.applicationKeepalive.intervalMs),
        }
      : null;
  const extraHeaders = options.extraHeaders ?? {};
  const errorFrame = options.errorFrame ?? ERROR_FRAME;
  // Single source of truth for THIS route's error-framing convention, derived from
  // errorFrame itself so the dynamic real-upstream-body case below stays consistent
  // with the static default-message case without a second option. Three shapes exist:
  //   - "anthropic": named SSE `event: error` line (Anthropic /v1/messages).
  //   - "responses": plain `data:` line, discriminated by a top-level `type` field
  //     inside the JSON payload (OpenAI Responses API convention).
  //   - "chat": plain `data:` line, discriminated by a top-level `error` key
  //     (OpenAI Chat Completions convention) — the default/fallback.
  const decodedErrorFrame = new TextDecoder().decode(errorFrame);
  const errorFrameFormat: "anthropic" | "responses" | "chat" = decodedErrorFrame.startsWith(
    "event:"
  )
    ? "anthropic"
    : (() => {
        const dataLine = decodedErrorFrame.match(/^data: (.+)\n\n$/);
        if (!dataLine) return "chat";
        try {
          const parsed = JSON.parse(dataLine[1]);
          return parsed && typeof parsed === "object" && "type" in parsed ? "responses" : "chat";
        } catch {
          return "chat";
        }
      })();
  const correlationId = options.correlationId;
  const frameDecoder = correlationId ? new TextDecoder() : null;
  // Records every direct-to-client write EXCEPT the forwarded real response
  // body — that one is already captured by the handler's own reqLogger, so
  // recording it again here would duplicate it in the persisted artifact.
  const recordClientBytes = (chunk: Uint8Array): void => {
    if (!correlationId || !frameDecoder) return;
    recordEarlyKeepaliveBytes(correlationId, frameDecoder.decode(chunk));
  };

  // Settle into a tagged result so neither race branch leaves an unhandled
  // rejection when the threshold timer wins.
  const settled: Promise<SettledHandler> = handlerPromise.then(
    (response) => ({ status: "fulfilled" as const, response }),
    (error) => ({ status: "rejected" as const, error })
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
    const result = raced.result;
    if (result.status === "fulfilled") return result.response;
    throw result.error;
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
      let nextApplicationKeepaliveAt = applicationKeepalive
        ? performance.now() + applicationKeepalive.intervalMs
        : Number.POSITIVE_INFINITY;
      const interval = setInterval(() => {
        if (stopped) return;
        try {
          const now = performance.now();
          let frame = keepaliveFrame;
          if (applicationKeepalive && now >= nextApplicationKeepaliveAt) {
            frame = applicationKeepalive.frame;
            nextApplicationKeepaliveAt = now + applicationKeepalive.intervalMs;
          }
          controller.enqueue(frame);
          recordClientBytes(frame);
        } catch {
          stopped = true;
          clearInterval(interval);
        }
      }, intervalMs);
      if (typeof interval === "object" && interval !== null && "unref" in interval) {
        interval.unref?.();
      }
      // First frame immediately on commit so the client sees a byte right away.
      // An SSE comment here would be ignored by Anthropic clients' watchdog on a
      // sub-interval gap, defeating the keepalive for exactly the case it targets.
      try {
        controller.enqueue(startupFrame);
        recordClientBytes(startupFrame);
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
          if (result.status === "fulfilled" && result.response.body) {
            await result.response.body.cancel().catch(() => undefined);
          }
          return;
        }

        if (result.status === "rejected") {
          // Handler rejected — emit a generic error frame (never the raw error/stack).
          controller.enqueue(errorFrame);
          recordClientBytes(errorFrame);
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
                recordClientBytes(errorFrame);
              }
            }
          } else {
            // Non-SSE response (e.g. a JSON error) reached us after we already
            // committed to a 200 event-stream, so the HTTP status can no longer
            // change. Frame the (already-sanitized) body as an in-band error event
            // instead of forwarding raw JSON, which would be malformed SSE.
            const text = response.body ? await response.text().catch(() => "") : "";
            const dataLine =
              errorFrameFormat === "responses"
                ? buildResponsesErrorDataLine(text)
                : text.trim() ||
                  JSON.stringify({ error: { message: "stream_error", type: "stream_error" } });
            const framed =
              errorFrameFormat === "anthropic"
                ? `event: error\ndata: ${dataLine}\n\n`
                : `data: ${dataLine}\n\n`;
            const framedBytes = ENCODER.encode(framed);
            controller.enqueue(framedBytes);
            recordClientBytes(framedBytes);
          }
        }
      } catch {
        // Defensive: never surface a raw error/stack to the client.
        if (!aborted) {
          try {
            controller.enqueue(errorFrame);
            recordClientBytes(errorFrame);
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
