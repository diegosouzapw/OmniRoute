import {
  canonicalSystemOneModel,
  handleSystemOneProxy,
  SYSTEMONE_PROVIDER_ID,
  type SystemOneCredentials,
} from "@omniroute/open-sse/handlers/systemOne.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1SystemOneSchema } from "@/shared/validation/schemas";
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
 * POST /v1/systemone — System One models (TypeSafe Jev).
 *
 * TypeSafe-compatible body `{ model, state, questions }`, proxied to
 * OpenRouter's System One API with the dashboard `openrouter` credentials.
 * The TypeSafe SDKs work against OmniRoute by pointing their base URL here.
 */
async function postHandler(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1SystemOneSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  const canonicalModel = canonicalSystemOneModel(body.model);
  const policy = await enforceApiKeyPolicy(request, `${SYSTEMONE_PROVIDER_ID}/${canonicalModel}`);
  if (policy.rejection) return policy.rejection;

  const allowedConnections = policy.apiKeyInfo?.allowedConnections?.length
    ? policy.apiKeyInfo.allowedConnections
    : null;
  const credentials = await getProviderCredentialsWithQuotaPreflight(
    SYSTEMONE_PROVIDER_ID,
    null,
    allowedConnections,
    canonicalModel
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for provider: ${SYSTEMONE_PROVIDER_ID}`
    );
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(SYSTEMONE_PROVIDER_ID, credentials);
  }

  // The selector's union also carries all-expired / lease markers; those carry no key,
  // so the handler rejects them with 401 — same narrowing as the rerank route.
  const response = await handleSystemOneProxy({
    body,
    credentials: credentials as SystemOneCredentials,
    canonicalModel,
    apiKeyInfo: policy.apiKeyInfo,
  });
  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
  }
  return response;
}

export const POST = withInjectionGuard(postHandler);
