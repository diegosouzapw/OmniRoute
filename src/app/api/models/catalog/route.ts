import { AI_PROVIDERS } from "@/shared/constants/providers";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { INTERNAL_PROXY_ERROR, getCatalogDiagnosticsHeaders } from "@/lib/modelMetadataRegistry";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getHiddenModelsByProvider } from "@/lib/db/models";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import { createCatalogVisibilityAnnotator } from "@/lib/modelCatalogVisibility";

type CatalogRow = Record<string, unknown>;
type VisibilityAnnotator = ReturnType<typeof createCatalogVisibilityAnnotator>;

/**
 * `?includeHidden=1`: rebuild the catalog with operator-hidden models kept, and tag each
 * row with its visibility (`hidden`, plus the provider-models keys a toggle writes).
 * Returns null when the hidden-inclusive build fails, so the regular catalog is served.
 */
async function loadHiddenInclusiveRows(
  request: Request,
  visibleRows: CatalogRow[]
): Promise<{ rows: CatalogRow[]; annotate: VisibilityAnnotator } | null> {
  const revealed = await getUnifiedModelsResponse(request, {}, { revealHidden: true });
  if (!revealed.ok) return null;
  const revealedBody = await revealed.json();
  let nodes: Awaited<ReturnType<typeof getCachedProviderNodes>> = [];
  try {
    nodes = await getCachedProviderNodes();
  } catch {
    // No compatible nodes known: prefix rows keep their public owner id.
  }
  const annotate = createCatalogVisibilityAnnotator(visibleRows, {
    nodes,
    getHiddenModels: getHiddenModelsByProvider,
  });
  return { rows: revealedBody.data || [], annotate };
}

/**
 * GET /api/models/catalog
 * Returns all models grouped by provider, with metadata (type, custom flag).
 * `?includeHidden=1` (management auth) also lists hidden models, tagged `hidden: true`.
 */
export async function GET(request: Request) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
  const includeHidden = ["1", "true"].includes(
    new URL(request.url).searchParams.get("includeHidden") || ""
  );
  if (includeHidden) {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;
  }
  try {
    const response = await getUnifiedModelsResponse(request, {});
    const body = await response.json();

    if (!response.ok) {
      return Response.json(body, {
        status: response.status,
        headers: {
          ...diagnosticHeaders,
        },
      });
    }

    let rows: CatalogRow[] = body.data || [];
    let annotate: VisibilityAnnotator | null = null;
    if (includeHidden) {
      const revealed = await loadHiddenInclusiveRows(request, rows);
      if (revealed) ({ rows, annotate } = revealed);
    }

    const catalog: Record<string, any> = {};
    for (const model of rows) {
      const providerId =
        typeof model.owned_by === "string" && model.owned_by.length > 0
          ? model.owned_by
          : "unknown";
      const bucket = catalog[providerId] || {
        provider: AI_PROVIDERS[providerId]?.name || providerId,
        active: providerId !== "unknown",
        models: [],
      };

      bucket.models.push({
        id: model.id,
        name: model.name || model.root || model.id,
        type: model.type || "chat",
        ...(typeof model.subtype === "string" ? { subtype: model.subtype } : {}),
        custom: model.custom === true,
        ...(model.free === true ? { free: true } : {}),
        ...(model.capabilities ? { capabilities: model.capabilities } : {}),
        ...(typeof model.context_length === "number"
          ? { context_length: model.context_length }
          : {}),
        ...(typeof model.max_output_tokens === "number"
          ? { max_output_tokens: model.max_output_tokens }
          : {}),
        ...(Array.isArray(model.input_modalities)
          ? { input_modalities: model.input_modalities }
          : {}),
        ...(Array.isArray(model.output_modalities)
          ? { output_modalities: model.output_modalities }
          : {}),
        ...(Array.isArray(model.supported_endpoints)
          ? { supported_endpoints: model.supported_endpoints }
          : {}),
        ...(annotate ? annotate(model) : {}),
      });

      catalog[providerId] = bucket;
    }

    return Response.json(
      { catalog, catalogVersion: response.headers.get("X-Model-Catalog-Version") },
      {
        headers: {
          ...diagnosticHeaders,
        },
      }
    );
  } catch (error) {
    return Response.json(
      {
        error: {
          message: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
          type: "server_error",
          code: INTERNAL_PROXY_ERROR,
        },
      },
      {
        status: 500,
        headers: {
          ...diagnosticHeaders,
        },
      }
    );
  }
}
