import { upsertProxy } from "@/lib/localDb";
import { bulkImportProxiesSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

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
    const validation = validateBody(bulkImportProxiesSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { items } = validation.data;
    let created = 0;
    let updated = 0;
    let failed = 0;
    const results: Array<{
      name: string;
      success: boolean;
      action?: "created" | "updated";
      id?: string;
      error?: string;
    }> = [];

    for (const item of items) {
      try {
        const result = await upsertProxy(item);
        if (result.proxy) {
          if (result.action === "created") created++;
          else updated++;
          results.push({
            name: item.name,
            success: true,
            action: result.action,
            id: result.proxy.id,
          });
        } else {
          failed++;
          results.push({ name: item.name, success: false, error: "Unknown error" });
        }
      } catch (error) {
        failed++;
        results.push({
          name: item.name,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return Response.json({ created, updated, failed, results });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to bulk import proxies");
  }
}
