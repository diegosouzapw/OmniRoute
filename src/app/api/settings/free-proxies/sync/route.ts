import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { freeProxySyncSchema } from "@/shared/validation/freeProxySchemas";
import { getProvider } from "@/lib/freeProxyProviders";
import { runFreeProxySyncCycle } from "@/lib/freeProxyProviders/syncCycle";
import type { FreeProxyProvider, FreeProxySourceId } from "@/lib/freeProxyProviders/types";

let _providersOverrideForTests: FreeProxyProvider[] | null = null;
export function _setProvidersForTests(providers: FreeProxyProvider[] | null): void {
  _providersOverrideForTests = providers;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown = {};
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      rawBody = await request.json();
    } catch {
      return createErrorResponse({
        status: 400,
        message: "Invalid JSON",
        type: "invalid_request",
      });
    }
  }

  const validation = validateBody(freeProxySyncSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      type: "invalid_request",
    });
  }

  try {
    const providers: FreeProxyProvider[] | undefined =
      _providersOverrideForTests ??
      (validation.data.sources && validation.data.sources.length > 0
        ? validation.data.sources
            .map((id) => getProvider(id as FreeProxySourceId))
            .filter((p): p is NonNullable<typeof p> => p != null)
        : undefined);

    const { results, lastSyncAt } = await runFreeProxySyncCycle(providers);

    return Response.json({ success: true, results, lastSyncAt });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to sync free proxies");
  }
}
