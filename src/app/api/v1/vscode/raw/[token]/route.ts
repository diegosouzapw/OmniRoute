import { CORS_HEADERS } from "@/shared/utils/cors";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";

type RawRouteParams = {
  token: string;
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RawRouteParams> | RawRouteParams }
) {
  const resolvedParams = await params;
  const modelsRoute = await import("@/app/api/v1/vscode/raw/[token]/models/route");
  return modelsRoute.GET(withPathTokenApiKey(request, resolvedParams.token), {
    params: resolvedParams,
  });
}