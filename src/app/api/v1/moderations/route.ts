import { CORS_ORIGIN } from "@/shared/utils/cors";
import { handleModeration } from "@omniroute/open-sse/handlers/moderations.ts";
import { getProviderCredentials, extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { parseModerationModel } from "@omniroute/open-sse/config/moderationRegistry.ts";
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
 * POST /v1/moderations — content moderation
 * OpenAI Moderations API compatible.
 */
export async function POST(request) {
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

  const model = body.model || "omni-moderation-latest";

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, model);
  if (policy.rejection) return policy.rejection;

  const { provider } = parseModerationModel(model);

  // Default to openai if no provider prefix
  const resolvedProvider = provider || "openai";
  const credentials = await getProviderCredentials(resolvedProvider);
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for provider: ${resolvedProvider}`
    );
  }

  return handleModeration({ body: { ...body, model }, credentials });
}
