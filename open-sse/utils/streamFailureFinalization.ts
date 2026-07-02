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

    if (!isFailureCompletionRecorded()) {
      const errorBody = buildErrorBody(status, message);
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
