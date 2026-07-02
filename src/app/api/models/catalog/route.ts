import { AI_PROVIDERS } from "@/shared/constants/providers";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { INTERNAL_PROXY_ERROR, getCatalogDiagnosticsHeaders } from "@/lib/modelMetadataRegistry";

/**
 * GET /api/models/catalog
 * Returns all models grouped by provider, with metadata (type, custom flag)
 */
export async function GET(request: Request) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
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

    const catalog: Record<string, any> = {};
    for (const model of body.data || []) {
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
          message: (error as any).message,
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
