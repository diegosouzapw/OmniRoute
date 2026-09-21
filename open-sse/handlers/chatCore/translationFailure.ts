import { buildErrorBody, createErrorResult } from "../../utils/error.ts";

export function createTranslationFailureResult(
  status: number,
  message: string,
  errorType: string | null
) {
  if (!errorType) return createErrorResult(status, message);
  const body = buildErrorBody(
    status,
    message,
    undefined,
    { type: errorType, code: errorType }
  );
  return {
    success: false as const,
    status,
    error: body.error.message,
    response: new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  };
}
