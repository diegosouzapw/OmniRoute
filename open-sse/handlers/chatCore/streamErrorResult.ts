/**
 * chatCore streaming error-result helpers (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from chatCore: identify semaphore capacity errors, build a sanitized SSE error result
 * (an `data: {...}\n\ndata: [DONE]\n\n` body wrapped in an event-stream Response), and pull a string
 * error code off an unknown error. The status and SSE envelope remain stable while every public
 * message/code/type crosses the canonical sanitizer; raw internal fields stay outside this body.
 */

import { buildErrorBody, sanitizeErrorMessage } from "../../utils/error.ts";

export interface SafeErrorMetadata {
  code?: string;
  errorCode?: string;
  message?: string;
  name?: string;
  status?: number;
}

function readErrorProperty(error: object, property: string): unknown {
  try {
    return Reflect.get(error, property);
  } catch {
    // Provider rejections may be hostile Proxies; public error handling fails closed per field.
    return undefined;
  }
}

export function getSafeErrorMetadata(error: unknown): SafeErrorMetadata {
  if (error === null || (typeof error !== "object" && typeof error !== "function")) {
    return {};
  }
  const code = readErrorProperty(error, "code");
  const errorCode = readErrorProperty(error, "errorCode");
  const message = readErrorProperty(error, "message");
  const name = readErrorProperty(error, "name");
  const status = readErrorProperty(error, "status");
  return {
    code: typeof code === "string" && code.length > 0 ? code : undefined,
    errorCode: typeof errorCode === "string" && errorCode.length > 0 ? errorCode : undefined,
    message: typeof message === "string" && message.length > 0 ? message : undefined,
    name: typeof name === "string" && name.length > 0 ? name : undefined,
    status: typeof status === "number" && Number.isFinite(status) ? status : undefined,
  };
}

export function createSafeAbortError(): Error {
  const error = new Error("Request aborted");
  error.name = "AbortError";
  return error;
}

export function formatStreamRecoveryRetryWarning(
  attempt: number,
  maxAttempts: number,
  error: unknown
): string {
  const safeName = sanitizeErrorMessage(getSafeErrorMetadata(error).name) || "truncation";
  return `transparent early-retry ${attempt}/${maxAttempts} after ${safeName}`;
}

export function isSemaphoreCapacityError(error: unknown): error is Error & { code: string } {
  const code = getSafeErrorMetadata(error).code;
  return code === "SEMAPHORE_TIMEOUT" || code === "SEMAPHORE_QUEUE_FULL";
}

export function createStreamingErrorResult(
  statusCode: number,
  message: string,
  code?: string,
  type?: string
) {
  const errorBody = buildErrorBody(statusCode, message, undefined, { code, type });

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
  return getSafeErrorMetadata(error).code;
}
