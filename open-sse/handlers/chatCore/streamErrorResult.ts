/**
 * chatCore streaming error-result helpers (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from chatCore: identify semaphore capacity errors, build a sanitized SSE error result
 * (an `data: {...}\n\ndata: [DONE]\n\n` body wrapped in an event-stream Response), and pull a string
 * error code off an unknown error. Side-effect-free; behaviour is byte-identical to the previous
 * module-level functions.
 */

import { buildErrorBody } from "../../utils/error.ts";

export function isSemaphoreCapacityError(error: unknown): error is Error & { code: string } {
  return (
    !!error &&
    typeof error === "object" &&
    ((error as { code?: unknown }).code === "SEMAPHORE_TIMEOUT" ||
      (error as { code?: unknown }).code === "SEMAPHORE_QUEUE_FULL")
  );
}

export function createStreamingErrorResult(
  statusCode: number,
  message: string,
  code?: string,
  type?: string
) {
  const errorBody = buildErrorBody(statusCode, message);
  if (code) {
    errorBody.error.code = code;
  }
  if (type) {
    errorBody.error.type = type;
  }

  const body = `data: ${JSON.stringify(errorBody)}\n\ndata: [DONE]\n\n`;

  return {
    success: false as const,
    status: statusCode,
    error: message,
    response: new Response(body, {
      status: statusCode,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    }),
  };
}

export function getUpstreamErrorIdentifier(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;
  const value = (error as { code?: unknown }).code;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
