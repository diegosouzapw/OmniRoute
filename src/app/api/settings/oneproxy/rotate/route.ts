import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { rotateOneproxyProxy } from "@/lib/oneproxyRotator";
import { oneproxyRotateSchema } from "@/shared/validation/oneproxySchemas";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    rawBody = {};
  }

  try {
    const validation = validateBody(oneproxyRotateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        type: "invalid_request",
      });
    }

    const proxy = await rotateOneproxyProxy({
      strategy: validation.data.strategy,
    });

    if (!proxy) {
      return createErrorResponse({
        status: 404,
        message: "No active 1proxy proxies available",
        type: "not_found",
      });
    }

    return Response.json(proxy);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to rotate 1proxy proxy");
  }
}
