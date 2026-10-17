import { AI_PROVIDERS } from "@/shared/constants/providers";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { INTERNAL_PROXY_ERROR, getCatalogDiagnosticsHeaders } from "@/lib/modelMetadataRegistry";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/models/catalog
 * Returns all models grouped by provider, with metadata (type, custom flag)
 */
export async function GET(request: Request) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
  try {
    const response = await getUnifiedModelsResponse(request, {});
    const body = await response.json();
    // The body is regrouped below, so forward only retry/status metadata, not
    // representation headers such as Content-Length or ETag from the core body.
    const headers = new Headers(diagnosticHeaders);
    for (const name of ["Retry-After", "x-omniroute-catalog"]) {
      const value = response.headers.get(name);
      if (value !== null) headers.set(name, value);
    }

    if (!response.ok) {
      return Response.json(body, {
        status: response.status,
        headers,
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
      });

      catalog[providerId] = bucket;
    }

    return Response.json(
      { catalog, catalogVersion: response.headers.get("X-Model-Catalog-Version") },
      { headers }
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
