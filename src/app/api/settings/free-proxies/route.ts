import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { freeProxyListSchema, freeProxySourceSchema } from "@/shared/validation/freeProxySchemas";
import {
  listFreeProxies,
  countFreeProxies,
  deleteFreeProxy,
  clearFreeProxiesBySource,
  getFreeProxyStats,
  getFreeProxySyncErrors,
} from "@/lib/localDb";
import type { FreeProxySourceId } from "@/lib/freeProxyProviders/types";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const raw = {
      sources: searchParams.get("sources") || undefined,
      protocol: searchParams.get("protocol") || undefined,
      country: searchParams.get("country") || undefined,
      minQuality: searchParams.get("minQuality") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      limit: searchParams.get("limit") || undefined,
      offset: searchParams.get("offset") || undefined,
      onlyNotInPool: searchParams.get("onlyNotInPool") || undefined,
    };

    const validation = validateBody(freeProxyListSchema, raw);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        type: "invalid_request",
      });
    }

    const items = await listFreeProxies({
      sources: validation.data.sources as FreeProxySourceId[] | undefined,
      protocol: validation.data.protocol,
      country: validation.data.country,
      minQuality: validation.data.minQuality,
      search: validation.data.search,
      sortBy: validation.data.sortBy,
      limit: validation.data.limit,
      offset: validation.data.offset,
      onlyNotInPool: validation.data.onlyNotInPool || undefined,
    });

    const total = await countFreeProxies({
      sources: validation.data.sources as FreeProxySourceId[] | undefined,
      protocol: validation.data.protocol,
      country: validation.data.country,
      minQuality: validation.data.minQuality,
      search: validation.data.search,
      onlyNotInPool: validation.data.onlyNotInPool || undefined,
    });

    const limit = validation.data.limit ?? 50;
    const stats = await getFreeProxyStats();
    const syncErrors = await getFreeProxySyncErrors();

    return Response.json({
      success: true,
      data: {
        proxies: items,
        total,
        hasMore: items.length >= limit && total > items.length + (validation.data.offset ?? 0),
        stats,
        syncErrors,
      },
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to list free proxies");
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const source = searchParams.get("source");

    if (source) {
      const parsed = freeProxySourceSchema.safeParse(source);
      if (!parsed.success) {
        return createErrorResponse({
          status: 400,
          message: "Invalid source",
          type: "invalid_request",
        });
      }
      const count = await clearFreeProxiesBySource(parsed.data);
      return Response.json({ success: true, deleted: count });
    }

    if (!id) {
      return createErrorResponse({
        status: 400,
        message: "id or source required",
        type: "invalid_request",
      });
    }

    const deleted = await deleteFreeProxy(id);
    if (!deleted) {
      return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
    }
    return Response.json({ success: true });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete free proxy");
  }
}
