import { handleModeration } from "@omniroute/open-sse/handlers/moderations.ts";
import { getProviderCredentials, clearRecoveredProviderState } from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { parseModerationModel } from "@omniroute/open-sse/config/moderationRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1ModerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/moderations — content moderation
 * OpenAI Moderations API compatible.
 */
async function postHandler(request, context) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1ModerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

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
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(resolvedProvider, credentials);
  }

  const response = await handleModeration({ body: { ...body, model }, credentials });
  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
  }
  return response;
}

export const POST = withInjectionGuard(postHandler);
