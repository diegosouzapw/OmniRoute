import { listProxies } from "@/lib/localDb";
import {
  handleProxyCreate,
  handleProxyDelete,
  handleProxyUpdate,
  resolveProxyLookupResponse,
} from "@/lib/api/proxyRegistryRouteHandlers";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
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
    const lookupResponse = await resolveProxyLookupResponse(searchParams, "where_used");
    if (lookupResponse) return lookupResponse;

    const { limit, offset } = toPagination(searchParams);
    const result = await listProxies({ includeSecrets: false, limit, offset });
    return Response.json({
      items: result.items,
      page: { limit, offset, total: result.total },
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxies");
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyCreate(request);
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyUpdate(request);
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyDelete(request);
}
