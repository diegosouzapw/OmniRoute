import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  listOneproxyProxies,
  getOneproxyStats,
  deleteOneproxyProxy,
  clearAllOneproxyProxies,
} from "@/lib/localDb";
import {
  syncOneproxyProxies,
  getOneproxySyncStatus,
  resetOneproxyCircuitBreaker,
} from "@/lib/oneproxySync";
import { oneproxyFilterSchema, oneproxySyncSchema } from "@/shared/validation/oneproxySchemas";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "stats") {
      const stats = await getOneproxyStats();
      const status = getOneproxySyncStatus();
      return Response.json({ stats, status });
    }

    if (action === "status") {
      return Response.json(getOneproxySyncStatus());
    }

    const filterValidation = validateBody(oneproxyFilterSchema, {
      protocol: searchParams.get("protocol") || undefined,
      countryCode: searchParams.get("countryCode") || undefined,
      minQuality: searchParams.get("minQuality") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    if (isValidationFailure(filterValidation)) {
      return createErrorResponse({
        status: 400,
        message: filterValidation.error.message,
        type: "invalid_request",
      });
    }

    const proxies = await listOneproxyProxies({
      protocol: filterValidation.data.protocol,
      countryCode: filterValidation.data.countryCode,
      minQuality: filterValidation.data.minQuality,
      limit: filterValidation.data.limit,
    });

    return Response.json({ items: proxies, total: proxies.length });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load 1proxy proxies");
  }
}

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
    const validation = validateBody(oneproxySyncSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        type: "invalid_request",
      });
    }

    const result = await syncOneproxyProxies();
    return Response.json(result);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to sync 1proxy proxies");
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "1";

    if (clearAll) {
      const count = await clearAllOneproxyProxies();
      return Response.json({ success: true, deleted: count });
    }

    if (!id) {
      return createErrorResponse({
        status: 400,
        message: "id or clearAll is required",
        type: "invalid_request",
      });
    }

    const deleted = await deleteOneproxyProxy(id);
    if (!deleted) {
      return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
    }

    return Response.json({ success: true });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete 1proxy proxy");
  }
}
