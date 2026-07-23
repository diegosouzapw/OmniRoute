import { getUnifiedModelsResponse } from "./catalog";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * HEAD /v1/models - availability probe (RFC 9110 §9.3.2: HEAD returns headers only)
 *
 * Explicit handler prevents Next.js auto-derived HEAD from streaming the full
 * GET body (200+ providers enumerated on-demand), which caused ~6s hang for
 * clients like the OpenAI SDK that use HEAD as a health/preflight probe.
 * See: https://github.com/diegosouzapw/OmniRoute/issues/6400
 */
export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/**
 * GET /v1/models - OpenAI compatible models list
 */
export async function GET(request: Request) {
  return getUnifiedModelsResponse(request);
}
