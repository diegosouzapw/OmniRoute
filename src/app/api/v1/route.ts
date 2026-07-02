import { CORS_HEADERS } from "@/shared/utils/cors";
import { getUnifiedModelsResponse } from "./models/catalog";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * GET /v1 - Return models list (OpenAI compatible)
 * Delegates to the same catalog builder as `/api/v1/models` (T09).
 */
export async function GET(request: Request) {
  return getUnifiedModelsResponse(request, {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  });
}
