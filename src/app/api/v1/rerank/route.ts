import { CORS_ORIGIN } from "@/shared/utils/cors";
import { handleRerank } from "@omniroute/open-sse/handlers/rerank.ts";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { parseRerankModel } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": CORS_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/rerank - Cohere-compatible rerank endpoint
 *
 * Reranks a list of documents against a query using the specified model.
 * Supports providers: Cohere, Together AI, NVIDIA, Fireworks AI.
 */
export async function POST(request) {
  // Optional API key validation
  if (process.env.REQUIRE_API_KEY === "true") {
    const apiKey = extractApiKey(request);
    if (!apiKey) return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    const valid = await isValidApiKey(apiKey);
    if (!valid) return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  if (!body.model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  const { provider } = parseRerankModel(body.model);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid rerank model: ${body.model}. Use format: provider/model`
    );
  }

  const credentials = await getProviderCredentials(provider);
  if (!credentials) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
  }

  return handleRerank({
    model: body.model,
    query: body.query,
    documents: body.documents,
    top_n: body.top_n,
    return_documents: body.return_documents,
    credentials,
  });
}
