import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import { runWithCallLogApiKeyContext } from "@/lib/usage/callLogApiKeyContext";
import { executeImageWithCredentialFallback } from "@/sse/services/imageCredentialRetry";
import { rejectRetiredCommonChatGptWebProvider } from "@/lib/providers/chatgptWebRetirementResponse";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/providers/{provider}/images/generations
 */
export async function POST(request, { params }) {
  const { provider: rawProvider } = await params;
  const retirementResponse = rejectRetiredCommonChatGptWebProvider(rawProvider);
  if (retirementResponse) return retirementResponse;

  // Verify this is a valid image provider
  const imageProvider = getImageProvider(rawProvider);
  if (!imageProvider) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown image provider: ${rawProvider}`);
  }

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }
  const validation = validateBody(v1ImageGenerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  // Ensure model has provider prefix
  if (!body.model.includes("/")) {
    body.model = `${rawProvider}/${body.model}`;
  }

  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Validate provider match
  const modelProvider = body.model.split("/")[0];
  if (modelProvider !== rawProvider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Model "${body.model}" does not belong to image provider "${rawProvider}"`
    );
  }

  const requestedModel = body.model.slice(rawProvider.length + 1);
  let credentials = await getProviderCredentialsWithQuotaPreflight(
    rawProvider,
    null,
    null,
    requestedModel
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for image provider: ${rawProvider}`
    );
  }
  if (credentials.allRateLimited) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${rawProvider}] All accounts rate limited`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }

  const execution = await executeImageWithCredentialFallback({
    provider: rawProvider,
    requestedModel,
    credentials,
    execute: (attemptCredentials) =>
      runWithCallLogApiKeyContext(
        {
          apiKeyId: policy.apiKeyInfo?.id ?? null,
          apiKeyName: policy.apiKeyInfo?.name ?? null,
        },
        () => handleImageGeneration({ body, credentials: attemptCredentials, log })
      ),
  });
  credentials = execution.credentials;
  const result = execution.result;

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    return new Response(JSON.stringify((result as any).data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload((result as any).error, "Image generation provider error");
  const message =
    typeof errorPayload?.error?.message === "string"
      ? errorPayload.error.message
      : "Image generation provider error";
  return errorResponse((result as any).status, message);
}
