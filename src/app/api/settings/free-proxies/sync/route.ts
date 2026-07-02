import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { freeProxySyncSchema } from "@/shared/validation/freeProxySchemas";
import { getEnabledProviders, getProvider } from "@/lib/freeProxyProviders";
import { recordFreeProxySync } from "@/lib/localDb";
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
    const providers =
      _providersOverrideForTests ??
      (validation.data.sources && validation.data.sources.length > 0
        ? validation.data.sources
            .map((id) => getProvider(id as FreeProxySourceId))
            .filter((p): p is NonNullable<typeof p> => p != null)
        : getEnabledProviders());

    const results: Record<string, unknown> = {};
    for (const provider of providers) {
      try {
        results[provider.id] = await provider.sync();
      } catch (error) {
        // #5595: isolate per-source failures so one provider throwing doesn't
        // abort the whole sync — the other sources still populate the pool and
        // the failure is surfaced in `results` instead of a blanket 500.
        results[provider.id] = {
          fetched: 0,
          added: 0,
          updated: 0,
          errors: [error instanceof Error ? error.message : String(error)],
        };
      }
    }

    // #4878: persist the sync timestamp so the UI's "last sync" advances even
    // when a sync returns zero new/updated proxies (otherwise it stayed frozen
    // at MAX(last_validated)).
    const lastSyncAt = await recordFreeProxySync();

    return Response.json({ success: true, results, lastSyncAt });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to sync free proxies");
  }
}
