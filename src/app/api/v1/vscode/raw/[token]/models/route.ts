import { enrichModelForVscode, getVscodeModelsCatalogResponse } from "@/app/api/v1/vscode/[token]/models/route";
import { expandVscodeServiceTierModels } from "@/app/api/v1/vscode/[token]/serviceTierVariants";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request) {
  const catalog = await getVscodeModelsCatalogResponse(request);
  if (catalog.status < 200 || catalog.status >= 300 || !Array.isArray(catalog.body.data)) {
    return Response.json(catalog.body, {
      status: catalog.status,
      headers: catalog.headers,
    });
  }

  return Response.json(
    {
      ...catalog.body,
      data: expandVscodeServiceTierModels(catalog.body.data).map((model) =>
        enrichModelForVscode(model, request, { preserveNativeId: true })
      ),
    },
    {
      status: catalog.status,
      headers: catalog.headers,
    }
  );
}