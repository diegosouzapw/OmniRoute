import { migrateLegacyProxyConfigToRegistry } from "@/lib/localDb";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const migrateLegacyProxySchema = z.object({
  force: z.boolean().optional(),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }

  try {
    const validation = validateBody(migrateLegacyProxySchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const force = validation.data.force === true;
    const result = await migrateLegacyProxyConfigToRegistry({ force });
    return Response.json(result);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to migrate legacy proxy config");
  }
}
