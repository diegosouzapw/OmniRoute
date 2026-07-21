import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { v1EmbeddingsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

import { createEmbeddingResponse, type EmbeddingHandlerOptions } from "@/lib/embeddings/service";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request?: Request) {
  return getSpecialtyModelsResponse(
    request,
    "/v1/embeddings",
    (model) => model.type === "embedding"
  );
}

type ValidatedEmbeddingBody = Record<string, unknown> & { model: string };

export async function handleValidatedEmbeddingRequestBody(
  body: ValidatedEmbeddingBody,
  options: EmbeddingHandlerOptions = {}
) {
  return createEmbeddingResponse(body, options);
}

async function postHandler(request, context) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    log.warn("EMBED", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1EmbeddingsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  // Auth check — when REQUIRE_API_KEY=false, ignore presented invalid keys
  // so anonymous access works the same as all other client APIs (#7785).
  const apiKeyRaw = extractApiKey(request);
  if (isRequireApiKeyEnabled() && !apiKeyRaw) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (isRequireApiKeyEnabled() && apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Extract API key info for logging
  const apiKeyMeta = policy.apiKeyInfo;

  // Build client raw request for logging
  const clientRawRequest = {
    endpoint: "/v1/embeddings",
    body: rawBody,
    headers: Object.fromEntries(request.headers.entries()),
  };

  return handleValidatedEmbeddingRequestBody(body as ValidatedEmbeddingBody, {
    clientRawRequest,
    apiKeyId: apiKeyMeta?.id || null,
    apiKeyName: apiKeyMeta?.name || null,
    connectionId: null,
  });
}

export const POST = withInjectionGuard(postHandler);
