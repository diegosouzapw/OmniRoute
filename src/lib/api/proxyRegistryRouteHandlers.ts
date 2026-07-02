import {
  createProxy,
  createProxyAndAssign,
  deleteProxyById,
  getProxyById,
  getProxyWhereUsed,
  updateProxy,
  updateProxyAndAssign,
} from "@/lib/localDb";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { createProxyRegistrySchema, updateProxyRegistrySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";

async function readJsonBody(request: Request) {
  try {
    return { ok: true as const, body: await request.json() };
  } catch {
    return {
      ok: false as const,
      response: createErrorResponse({
        status: 400,
        message: "Invalid JSON body",
        type: "invalid_request",
      }),
    };
  }
}

export async function resolveProxyLookupResponse(
  searchParams: URLSearchParams,
  whereUsedParam: string
): Promise<Response | null> {
  const id = searchParams.get("id");
  const whereUsed = searchParams.get(whereUsedParam) === "1";

  if (id && whereUsed) {
    const usage = await getProxyWhereUsed(id);
    return Response.json(usage);
  }

  if (!id) {
    return null;
  }

  const proxy = await getProxyById(id, { includeSecrets: false });
  if (!proxy) {
    return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
  }
  return Response.json(proxy);
}

export async function handleProxyCreate(request: Request) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return parsed.response;

  try {
    const validation = validateBody(createProxyRegistrySchema, parsed.body);
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

export async function handleProxyUpdate(request: Request) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return parsed.response;

  try {
    const validation = validateBody(updateProxyRegistrySchema, parsed.body);
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

export async function handleProxyDelete(request: Request) {
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
