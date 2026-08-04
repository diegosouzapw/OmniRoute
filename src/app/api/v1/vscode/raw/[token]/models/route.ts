import {
  enrichModelForVscode,
  expandVscodeRawModels,
  getVscodeModelsCatalogResponse,
} from "@/app/api/v1/vscode/[token]/models/route";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(
  request: Request,
  { params }: { params?: Promise<{ token: string }> | { token: string } } = {}
) {
  const resolvedParams = params ? await params : undefined;
  const authorizedRequest = withPathTokenApiKey(request, resolvedParams?.token);
  const catalog = await getVscodeModelsCatalogResponse(authorizedRequest);
  if (catalog.status < 200 || catalog.status >= 300 || !Array.isArray(catalog.body.data)) {
    return Response.json(catalog.body, {
      status: catalog.status,
      headers: catalog.headers,
    });
  }

  return Response.json(
    {
      ...catalog.body,
      data: expandVscodeRawModels(catalog.body.data).map((model) =>
        enrichModelForVscode(model, authorizedRequest, { preserveNativeId: true })
      ),
    },
    {
      status: catalog.status,
      headers: catalog.headers,
    }
  );
}
