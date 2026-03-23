import { randomUUID } from "crypto";

export type ApiErrorType = "invalid_request" | "not_found" | "conflict" | "server_error";

interface ApiErrorPayload {
  status: number;
  message: string;
  type?: ApiErrorType;
  details?: unknown;
}

export function createErrorResponse(payload: ApiErrorPayload): Response {
  const requestId = randomUUID();
  const resolvedType =
    payload.type ||
    (payload.status >= 500
      ? "server_error"
      : payload.status === 404
        ? "not_found"
        : payload.status === 409
          ? "conflict"
          : "invalid_request");

  return Response.json(
    {
      error: {
        message: payload.message,
        type: resolvedType,
        details: payload.details,
      },
      requestId,
    },
    { status: payload.status }
  );
}

export function createErrorResponseFromUnknown(
  error: unknown,
  fallbackMessage = "Unexpected server error"
): Response {
  const anyError = error as {
    message?: string;
    status?: number;
    type?: ApiErrorType;
    details?: unknown;
  };
  const status = Number(anyError?.status) || 500;
  return createErrorResponse({
    status,
    message: typeof anyError?.message === "string" ? anyError.message : fallbackMessage,
    type: anyError?.type,
    details: anyError?.details,
  });
}
