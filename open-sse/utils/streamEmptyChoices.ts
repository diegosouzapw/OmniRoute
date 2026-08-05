/**
 * Empty-stream rejection for the SSE transform (#9268).
 *
 * A streaming provider can complete a turn having forwarded nothing usable —
 * every chunk carried an empty `choices: []` (no content, no tool_calls, no
 * finish_reason, e.g. a Gemini turn where the model emitted nothing). The SSE
 * transform drops those chunks silently, so without a guard the stream would
 * terminate with a clean empty 200, which clients treat as a valid empty turn
 * and retry to their cap with no error to stop on.
 *
 * The transform is the only place that knows a chunk was actually forwarded, so
 * `createSSEStream` threads a `forwardedValuableChunk` boolean and the
 * flush-time callbacks. All rejection logic lives here so the frozen
 * `open-sse/utils/stream.ts` only carries the minimal call-site wiring.
 *
 * Mirrors the non-streaming `isEmptyContentResponse` behavior in
 * `open-sse/handlers/chatCore.ts` (empty content → retryable 502), and the
 * #8649 disconnect-aware wrapper's "Provider returned empty content" outcome.
 */
import { buildErrorBody } from "./error.ts";
import { buildStreamSummaryFromEvents } from "./streamPayloadCollector.ts";

type StructuredSSECollectorLike = {
  getEvents: () => unknown[];
  build: (summary?: unknown, opts?: { includeEvents?: boolean }) => unknown;
};

type EmptyChoicesRejectContext = {
  /** True when any chunk with content/tool_calls/finish_reason was forwarded. */
  forwardedValuableChunk: boolean;
  /** Valid usage accumulated on the stream state (usage-only streams are fine). */
  hasValidUsage: boolean;
  /** Provider-side event collector (for the onComplete providerPayload summary). */
  providerPayloadCollector: StructuredSSECollectorLike;
  /** Client-side payload collector (for the onComplete clientPayload). */
  clientPayloadCollector: StructuredSSECollectorLike;
  targetFormat?: string;
  model?: string | null;
  usage?: unknown;
  onFailure?: ((payload: {
    status: number;
    message: string;
    code?: string;
    type?: string;
  }) => boolean | void | Promise<void>) | null;
  onComplete?: ((payload: {
    status: number;
    usage: unknown;
    responseBody?: unknown;
    providerPayload?: unknown;
    clientPayload?: unknown;
    error?: string | null;
    errorCode?: string | null;
  }) => void) | null;
  clearPendingRequestFromStream?: () => void;
};

/**
 * Returns `true` when the empty-stream condition was detected and the caller
 * must abort the stream (controller.error + early return); `false` when the
 * stream legitimately forwarded content/usage and should complete normally.
 */
export function rejectEmptyChoicesStream(ctx: EmptyChoicesRejectContext): boolean {
  if (ctx.forwardedValuableChunk || ctx.hasValidUsage) return false;

  const error = new Error(
    "Provider returned empty content — stream forwarded no valuable chunks"
  ) as Error & { statusCode: number; code: string };
  error.statusCode = 502;
  error.code = "empty_content";

  if (ctx.onFailure) {
    try {
      ctx.onFailure({ status: 502, message: error.message, code: "empty_content" });
    } catch {
      // best-effort — must never break the stream error path
    }
  }

  const errorBody = buildErrorBody(502, error.message);
  if (ctx.onComplete) {
    try {
      ctx.onComplete({
        status: 502,
        usage: ctx.usage,
        responseBody: errorBody,
        error: error.message,
        errorCode: "empty_content",
        providerPayload: ctx.providerPayloadCollector.build(
          buildStreamSummaryFromEvents(
            ctx.providerPayloadCollector.getEvents(),
            ctx.targetFormat,
            ctx.model
          ),
          { includeEvents: false }
        ),
        clientPayload: ctx.clientPayloadCollector.build(errorBody, { includeEvents: false }),
      });
    } catch {
      // best-effort
    }
  }

  ctx.clearPendingRequestFromStream?.();
  return true;
}

/** The retryable error the caller should surface via controller.error. */
export function buildEmptyChoicesStreamError(): Error & { statusCode: number; code: string } {
  const error = new Error(
    "Provider returned empty content — stream forwarded no valuable chunks"
  ) as Error & { statusCode: number; code: string };
  error.statusCode = 502;
  error.code = "empty_content";
  return error;
}
