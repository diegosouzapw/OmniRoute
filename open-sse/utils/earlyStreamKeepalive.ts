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
  })}\n\n`
);

/**
 * Wrap an upstream error body in the Responses API error shape so that
 * Responses clients (Codex CLI, openai-responses SDK) can dispatch on the
 * top-level `type` field and surface the failure reason instead of reporting
 * a disconnected stream.
 *
 * If the body is already in Responses format (has `type:"error"`), it is
 * returned unchanged.  If parsing fails, a minimal Responses error is returned.
 *
 * @see https://github.com/diegosouzapw/OmniRoute/issues/13431
 */
function responsesErrorFromUpstream(body: string): string {
  try {
    const parsed = JSON.parse(body);
    // Already in Responses format — pass through.
    if (parsed && typeof parsed === "object" && parsed.type === "error") {
      return body;
    }
    // Chat Completions format: {"error":{"message":"...","type":"...","code":"..."},...}
    const errObj = parsed?.error;
    if (errObj && typeof errObj === "object") {
      return JSON.stringify({
        type: "error",
        code: errObj.code ?? null,
        message: errObj.message ?? "Upstream stream failed before completion.",
        param: errObj.param ?? null,
      });
    }
    // Unknown object shape — use raw body wrapped in Responses envelope.
    return JSON.stringify({
      type: "error",
      code: null,
      message: typeof parsed?.message === "string"
        ? parsed.message
        : "Upstream stream failed before completion.",
      param: null,
    });
  } catch {
    return JSON.stringify({
      type: "error",
      code: null,
      message: "Upstream stream failed before completion.",
      param: null,
    });
  }
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
  const intervalMs = Math.max(250, options.intervalMs ?? 2_500);
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
  // Single source of truth for whether THIS route's error framing uses a named SSE
  // `event: error` line (Anthropic) or a plain `data:` line (OpenAI Chat Completions /
  // Responses) — derived from errorFrame itself so the dynamic real-upstream-body case
  // below stays consistent with the static default-message case without a second option.
  const errorFrameUsesNamedEvent = new TextDecoder().decode(errorFrame).startsWith("event:");
  // True when the caller is the Responses API route — upstream error bodies
  // must be re-framed as Responses events ({"type":"error",...}) instead of
  // forwarded as Chat Completions error objects ({"error":{...}}).  (#13431)
  const isResponsesApi =
    !errorFrameUsesNamedEvent &&
    errorFrame.length === OPENAI_RESPONSES_ERROR_FRAME.length &&
    errorFrame.every((b, i) => b === OPENAI_RESPONSES_ERROR_FRAME[i]);
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
            let dataLine =
              text.trim() ||
              JSON.stringify({ error: { message: "stream_error", type: "stream_error" } });
            // Responses API clients dispatch on the "type" field inside each data
            // payload (not an SSE event: field). When the upstream returns a Chat
            // Completions-shaped error ({"error":{...}}), re-frame it as a proper
            // Responses error event so clients can surface the failure reason instead
            // of reporting a disconnected stream.  (#13431)
            if (isResponsesApi) {
              dataLine = responsesErrorFromUpstream(dataLine);
            }
            const framed = errorFrameUsesNamedEvent
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
