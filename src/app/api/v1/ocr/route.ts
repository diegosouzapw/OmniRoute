import {
  handleOcr,
  resolveVertexOcrAccessToken,
  resolveVertexOcrBaseUrl,
  VERTEX_DEEPSEEK_OCR_PROVIDER_ID,
} from "@omniroute/open-sse/handlers/ocr.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { parseOcrModel } from "@omniroute/open-sse/config/ocrRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1OcrSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";

export { resolveVertexOcrAccessToken };

/**
 * Custom-endpoint providers (e.g. azure-document-intelligence, vertex-deepseek-ocr) store the
 * connection's resource endpoint under providerSpecificData, not as a top-level credentials
 * field — mirror the convention used across src/lib/providers/validation/* (see e.g.
 * urlHelpers.ts). handleOcr reads credentials.baseUrl, so surface it here. An existing
 * top-level baseUrl always wins (kept for tests/callers that pass it directly). The
 * vertex-deepseek-ocr project/location resolution itself lives in the open-sse handler
 * (resolveVertexOcrBaseUrl) — routes may not import executor implementations directly (see
 * EXECUTOR_IMPORT_RESTRICTION in eslint.config.mjs).
 */
export function resolveOcrCredentials<
  T extends {
    baseUrl?: string;
    apiKey?: string;
    providerSpecificData?: Record<string, unknown>;
  },
>(credentials: T, providerId?: string): T {
  if (credentials?.baseUrl) return credentials;
  const providerSpecificBaseUrl = credentials?.providerSpecificData?.baseUrl;
  if (typeof providerSpecificBaseUrl === "string" && providerSpecificBaseUrl.trim()) {
    return { ...credentials, baseUrl: providerSpecificBaseUrl };
  }
  if (providerId === VERTEX_DEEPSEEK_OCR_PROVIDER_ID) {
    const vertexBaseUrl = resolveVertexOcrBaseUrl(credentials);
    if (vertexBaseUrl) return { ...credentials, baseUrl: vertexBaseUrl };
  }
  return credentials;
}

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
 * POST /v1/ocr — document OCR
 * Mistral OCR API compatible.
 */
async function postHandler(request, context) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1OcrSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;

  const model = body.model || "mistral-ocr-latest";

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, model);
  if (policy.rejection) return policy.rejection;

  const { provider } = parseOcrModel(model);

  // Default to mistral if no provider prefix
  const resolvedProvider = provider || "mistral";
  const credentials = await getProviderCredentialsWithQuotaPreflight(resolvedProvider);
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No credentials for provider: ${resolvedProvider}`
    );
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse(resolvedProvider, credentials);
  }

  const tokenReadyCredentials = await resolveVertexOcrAccessToken(resolvedProvider, credentials);
  const ocrCredentials = resolveOcrCredentials(tokenReadyCredentials, resolvedProvider);

  const response = await handleOcr({ body: { ...body, model }, credentials: ocrCredentials });
  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
  }
  return response;
}

export const POST = withInjectionGuard(postHandler);
