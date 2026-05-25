import {
  createProxy,
  createProxyAndAssign,
  deleteProxyById,
  getProxyById,
  getProxyWhereUsed,
  listProxies,
  updateProxy,
  updateProxyAndAssign,
} from "@/lib/localDb";
import { createProxyRegistrySchema, updateProxyRegistrySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const whereUsed = searchParams.get("whereUsed") === "1";

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

    const proxies = await listProxies({ includeSecrets: false });
    return Response.json({ items: proxies, total: proxies.length });
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
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { assignment, ...proxyFields } = validation.data;
    if (assignment) {
      const result = await createProxyAndAssign(proxyFields, assignment);
      clearDispatcherCache();
      return Response.json({ ...result.proxy, assignment: result.assignment }, { status: 201 });
    }

    const created = await createProxy(proxyFields);
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
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { id, assignment, ...changes } = validation.data;
    if (assignment) {
      const result = await updateProxyAndAssign(id, changes, assignment);
      if (!result?.proxy) {
        return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
      }

      clearDispatcherCache();
      return Response.json({ ...result.proxy, assignment: result.assignment });
    }

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
