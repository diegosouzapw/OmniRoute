import { handleSystemOneProxy } from "@omniroute/open-sse/handlers/systemone.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1SystemoneSchema } from "@/shared/validation/schemas";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import {
  TYPESAFE_PROVIDER_ID,
  isTypesafeJevModelId,
  stripTypesafeModelPrefix,
} from "@/lib/providers/typesafe";

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
 * POST /v1/systemone — TypeSafe System One (Jev) passthrough.
 *
 * Proxies the request body as-is to https://api.typesafe.ai/v1/systemone using
 * stored `typesafe` credentials. Upstream status, JSON body, and `usage` are
 * returned unchanged. Versioned `jev-*` ids are accepted even when they are
 * not listed by GET /v1/models.
 */
async function postHandler(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1SystemoneSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, formatValidationMessage(validation.error));
  }
  const body = validation.data as Record<string, unknown>;
  const model = typeof body.model === "string" ? body.model : undefined;

  if (model && !isTypesafeJevModelId(model)) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Unknown TypeSafe model: ${stripTypesafeModelPrefix(model)}`
    );
  }

  const policy = await enforceApiKeyPolicy(request, model || "typesafe/jev-latest");
  if (policy.rejection) return policy.rejection;

  const credentials = await getProviderCredentialsWithQuotaPreflight(TYPESAFE_PROVIDER_ID);
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for provider: ${TYPESAFE_PROVIDER_ID}`
    );
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(TYPESAFE_PROVIDER_ID, credentials);
  }

  const response = await handleSystemOneProxy({
    body,
    credentials,
    provider: TYPESAFE_PROVIDER_ID,
    requestedModel: model || null,
  });
  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
  }
  return response;
}

export const POST = withInjectionGuard(postHandler);
