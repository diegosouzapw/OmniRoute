import {
  createProxy,
  deleteProxyById,
  getProxyById,
  getProxyWhereUsed,
  listProxies,
  updateProxy,
} from "@/lib/localDb";
import { createProxyRegistrySchema, updateProxyRegistrySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody, getValidationError } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

function toPagination(searchParams: URLSearchParams) {
  const limit = Math.max(1, Math.min(200, Number(searchParams.get("limit") || 50)));
  const offset = Math.max(0, Number(searchParams.get("offset") || 0));
  return { limit, offset };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const whereUsed = searchParams.get("where_used") === "1";

    if (id && whereUsed) {
      const usage = await getProxyWhereUsed(id);
      return Response.json(usage);
    }

    if (id) {
      const proxy = await getProxyById(id, { includeSecrets: false });
      if (!proxy) {
        return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
      }
      return Response.json(proxy);
    }

    const { limit, offset } = toPagination(searchParams);
    const items = await listProxies({ includeSecrets: false });
    const paged = items.slice(offset, offset + limit);
    return Response.json({
      items: paged,
      page: { limit, offset, total: items.length },
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxies");
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
    const validation = validateBody(createProxyRegistrySchema, rawBody);
    if (isValidationFailure(validation)) {
      const err = getValidationError(validation) as any;
      return createErrorResponse({
        status: 400,
        message: err?.message || "Invalid request",
        details: err?.details,
        type: "invalid_request",
      });
    }

    const created = await createProxy(validation.data);
    return Response.json(created, { status: 201 });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to create proxy");
  }
}

export async function PATCH(request: Request) {
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
    const validation = validateBody(updateProxyRegistrySchema, rawBody);
    if (isValidationFailure(validation)) {
      const err = getValidationError(validation) as any;
      return createErrorResponse({
        status: 400,
        message: err?.message || "Invalid request",
        details: err?.details,
        type: "invalid_request",
      });
    }

    const { id, ...changes } = validation.data;
    const updated = await updateProxy(id, changes);
    if (!updated) {
      return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
    }

    return Response.json(updated);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to update proxy");
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const force = searchParams.get("force") === "1";

    if (!id) {
      return createErrorResponse({
        status: 400,
        message: "id is required",
        type: "invalid_request",
      });
    }

    const deleted = await deleteProxyById(id, { force });
    if (!deleted) {
      return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
    }

    return Response.json({ success: true });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete proxy");
  }
}
