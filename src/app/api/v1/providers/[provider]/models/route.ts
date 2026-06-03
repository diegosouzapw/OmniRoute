import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1/providers/{provider}/models
 * Returns models for one provider with unprefixed ids.
 */
export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider: rawProvider } = await params;
  const providerEntry = getRegistryEntry(rawProvider);

  if (!providerEntry) {
    return Response.json(
      {
        error: {
          message: `Unknown provider: ${rawProvider}`,
          type: "invalid_request_error",
          code: "invalid_provider",
        },
      },
      { status: 400 }
    );
  }

  const response = await getUnifiedModelsResponse(request);
  const payload = (await response
    .clone()
    .json()
    .catch(() => null)) as { object?: string; data?: Array<Record<string, any>> } | null;

  if (!response.ok || !payload || !Array.isArray(payload.data)) {
    return response;
  }

  const providerId = providerEntry.id;
  const providerAlias = providerEntry.alias || providerId;

  const toUnprefixedModelId = (model: Record<string, any>) => {
    const root = typeof model.root === "string" && model.root.trim().length > 0 ? model.root : null;
    if (root) return root;

    const id = typeof model.id === "string" ? model.id : "";
    if (!id) return id;
    if (id.startsWith(`${providerAlias}/`)) return id.slice(providerAlias.length + 1);
    if (id.startsWith(`${providerId}/`)) return id.slice(providerId.length + 1);
    return id;
  };

  const filtered = payload.data.filter((model) => model?.owned_by === providerId);
  const deduped = new Map<string, Record<string, any>>();

  for (const model of filtered) {
    const unprefixedId = toUnprefixedModelId(model);
    if (!unprefixedId) continue;
    if (deduped.has(unprefixedId)) continue;
    deduped.set(unprefixedId, {
      ...model,
      id: unprefixedId,
      parent: null,
    });
  }

  return Response.json(
    {
      object: payload.object || "list",
      data: [...deduped.values()],
    },
    {
      status: response.status,
      headers: response.headers,
    }
  );
}
