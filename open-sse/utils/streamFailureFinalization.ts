import {
  finalizeMostRecentPendingRequest,
  finalizePendingRequestById,
} from "@/lib/usage/usageHistory.ts";

import { HTTP_STATUS } from "../config/constants.ts";
import { buildErrorBody } from "./error.ts";

export type StreamCompletionPayload = {
  status: number;
  usage: unknown;
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
  error?: string | null;
  errorCode?: string | null;
  ttft?: number | null;
};

export type StreamFailurePayload = {
  status: number;
  message: string;
  code?: string;
  type?: string;
};

export type PipelineStreamErrorHandler = (event: {
  message: string;
  statusCode: number;
}) => boolean;

export type ClientDisconnectEvent = { reason: string; duration: number };

/**
 * #9653: a client that closes its connection right after reading a fully-completed
 * SSE stream can race the stream's own completion bookkeeping — the bytes already
 * reached the client, but the transform stream's completion callback (which flips
 * `isStreamCompletionRecorded()` to true) hasn't finished bubbling up yet when the
 * disconnect handler fires. Persisting immediately in that case records a false
 * 499 with zero token usage for a request that actually delivered its full response.
 *
 * This wraps a disconnect finalizer with a grace period: instead of finalizing
 * immediately, poll `isStreamCompletionRecorded()` until it flips true (a real
 * completion landed — nothing more to do) or the deadline passes (genuinely gone —
 * finalize as a 499 same as before). Pass `gracePeriodMs <= 0` to disable and
 * finalize immediately, matching the pre-#9653 behavior.
 */
export function createClientDisconnectGraceHandler({
  isStreamCompletionRecorded,
  gracePeriodMs,
  finalize,
  pollIntervalMs = 250,
  setTimeoutFn = setTimeout,
}: {
  isStreamCompletionRecorded: () => boolean;
  gracePeriodMs: number;
  finalize: (event: ClientDisconnectEvent) => unknown;
  pollIntervalMs?: number;
  setTimeoutFn?: (callback: () => void, ms: number) => unknown;
}): (event: ClientDisconnectEvent) => boolean {
  return (event) => {
    if (isStreamCompletionRecorded()) return true;
    if (gracePeriodMs <= 0) {
      finalize(event);
      return true;
    }

    const deadline = Date.now() + gracePeriodMs;
    const poll = () => {
      if (isStreamCompletionRecorded()) return;
      if (Date.now() >= deadline) {
        finalize(event);
        return;
      }
      setTimeoutFn(poll, pollIntervalMs);
    };
    setTimeoutFn(poll, pollIntervalMs);

    // Claim "handled" immediately so the caller's own immediate-finalize fallback
    // doesn't fire while the grace-period poll is still pending.
    return true;
  };
}

export function finalizeStreamRequestLog({
  pendingRequestId,
  model,
  provider,
  connectionId,
  providerResponse,
  clientResponse,
  status,
  error,
  errorCode,
  onWarn,
}: {
  pendingRequestId: string;
  model: string;
  provider: string;
  connectionId: string | null;
  providerResponse?: unknown;
  clientResponse?: unknown;
  status: number;
  error?: string | null;
  errorCode?: string | null;
  onWarn?: (error: unknown) => void;
}) {
  try {
    const completedById = finalizePendingRequestById(pendingRequestId, {
      providerResponse,
      clientResponse,
      status,
      error: error || null,
      errorCode: errorCode || null,
    });
    if (!completedById) {
      finalizeMostRecentPendingRequest(model, provider, connectionId, {
        providerResponse,
        clientResponse,
        status,
        error: error || null,
        errorCode: errorCode || null,
      });
    }
  } catch (error) {
    try {
      if (onWarn) {
        onWarn(error);
      } else {
        console.warn(
          "finalizeMostRecentPendingRequest failed:",
          error && typeof error === "object" && "message" in error
            ? (error as { message?: unknown }).message
            : error
        );
      }
    } catch {}
  }
}

export function createStreamFailureFinalizers({
  isFailureCompletionRecorded,
  isStreamCompletionRecorded = () => false,
  onStreamComplete,
  persistFailureUsage,
  onStreamFailure,
}: {
  isFailureCompletionRecorded: () => boolean;
  isStreamCompletionRecorded?: () => boolean;
  onStreamComplete: (payload: StreamCompletionPayload) => void;
  persistFailureUsage: (status: number, errorCode?: string) => void;
  onStreamFailure?: ((failure: StreamFailurePayload) => void) | null;
}) {
  const handleStreamFailure = (failure: StreamFailurePayload) => {
    if (isStreamCompletionRecorded()) {
      return true;
    }

    const status = failure.status || HTTP_STATUS.BAD_GATEWAY;
    const message = failure.message || "Upstream stream error";
    const code = failure.code || failure.type || String(status);
    const classification =
      failure.code || failure.type ? { code: failure.code, type: failure.type } : undefined;

    if (!isFailureCompletionRecorded()) {
      const errorBody = buildErrorBody(status, message, undefined, classification);
      onStreamComplete({
        status,
        usage: null,
        responseBody: errorBody,
        providerPayload: errorBody,
        clientPayload: errorBody,
        error: message,
        errorCode: code,
        ttft: 0,
      });
    }

    persistFailureUsage(status, code);
    try {
      onStreamFailure?.(failure);
    } catch {
      // Best-effort fallback state update only.
    }
    return true;
  };

  const isClientClosedPipelineError = (message: string, statusCode: number) => {
    const normalized = message.toLowerCase();
    return (
      statusCode === 499 ||
      normalized.includes("responseaborted") ||
      normalized.includes("controller is already closed") ||
      normalized.includes("readablestream is closed") ||
      normalized.includes("writablestream is closed") ||
      normalized.includes("aborterror")
    );
  };

  let pipelineStreamFailureFinalized = false;
  const onPipelineStreamError: PipelineStreamErrorHandler = ({ message, statusCode }) => {
    if (pipelineStreamFailureFinalized) return true;
    pipelineStreamFailureFinalized = true;

    const normalizedMessage = message || "Upstream stream error";
    const clientClosed = isClientClosedPipelineError(normalizedMessage, statusCode);
    const status = clientClosed
      ? 499
      : Number.isFinite(statusCode) && statusCode >= 400 && statusCode <= 599
        ? statusCode
        : HTTP_STATUS.BAD_GATEWAY;
    const code = clientClosed
      ? "client_disconnected"
      : normalizedMessage.toLowerCase().includes("terminated")
        ? "stream_terminated"
        : "stream_pipeline_error";
    const type = clientClosed ? "client_disconnected" : "stream_error";

    handleStreamFailure({
      status,
      message: normalizedMessage,
      code,
      type,
    });
    return true;
  };

  return { handleStreamFailure, onPipelineStreamError };
}
