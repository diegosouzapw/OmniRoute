import { getUnifiedModelsResponse } from "./catalog";

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
 * GET /v1/models - OpenAI compatible models list
 */
export async function GET(request: Request) {
  return getUnifiedModelsResponse(request);
}
