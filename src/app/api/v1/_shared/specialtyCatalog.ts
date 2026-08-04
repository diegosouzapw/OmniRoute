import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";

type UnifiedModelEntry = Record<string, unknown>;

function fallbackCatalogRequest(request: Request | undefined, pathname: string) {
  return request || new Request(`http://localhost${pathname}`);
}

export async function getSpecialtyModelsResponse(
  request: Request | undefined,
  pathname: string,
  predicate: (model: UnifiedModelEntry) => boolean
) {
  const catalogResponse = await getUnifiedModelsResponse(fallbackCatalogRequest(request, pathname));
  if (!catalogResponse.ok) return catalogResponse;

  const payload = (await catalogResponse.json()) as { data?: UnifiedModelEntry[] };
  const data = Array.isArray(payload.data) ? payload.data.filter(predicate) : [];

  const headers = new Headers(catalogResponse.headers);
  headers.set("Content-Type", "application/json");
  headers.delete("content-length");

  return new Response(JSON.stringify({ object: "list", data }), {
    status: catalogResponse.status,
    headers,
  });
}
