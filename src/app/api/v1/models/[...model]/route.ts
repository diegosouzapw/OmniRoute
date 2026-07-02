import { handleCorsOptions } from "@/shared/utils/cors";
import { getUnifiedModelsResponse } from "../catalog";
import { handleGetModelById } from "../modelById";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /v1/models/{model} — OpenAI-compatible single-model retrieval (#4674).
 *
 * Catch-all (`[...model]`) so provider-prefixed ids that contain a slash
 * (e.g. `cgpt-web/gpt-5.5`, `claude/claude-sonnet-4-6`) are captured intact.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ model: string[] }> }
) {
  const { model } = await params;
  const segments = Array.isArray(model) ? model : [model];
  const requestedId = decodeURIComponent(segments.join("/"));
  return handleGetModelById(request, requestedId, getUnifiedModelsResponse);
}
