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
 * HEAD /v1/models/{model} — availability probe (RFC 9110 §9.3.2).
 * Prevents Next.js auto-derived HEAD from streaming the full GET body,
 * which caused ~6s hangs for SDK/gateway health probes (#6400).
 */
export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
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
