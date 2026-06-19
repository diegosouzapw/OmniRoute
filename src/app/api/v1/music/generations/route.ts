import { handleMusicGeneration } from "@omniroute/open-sse/handlers/musicGeneration.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentials,
  clearRecoveredProviderState,
  extractApiKey,
  isValidApiKey,
} from "@/sse/services/auth";
import {
  parseMusicModel,
  getAllMusicModels,
  getMusicProvider,
} from "@omniroute/open-sse/config/musicRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { generateRequestId } from "@/shared/utils/requestId";

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
 * GET /v1/music/generations — list available music models
 */
export async function GET() {
  const models = getAllMusicModels();
  return new Response(
    JSON.stringify({
      object: "list",
      data: models.map((m) => ({
        id: m.id,
        object: "model",
        created: Math.floor(Date.now() / 1000),
        owned_by: m.provider,
        type: "music",
      })),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * POST /v1/music/generations — generate music
 */
async function postHandler(request, context) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    log.warn("MUSIC", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1ImageGenerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;
  const startTime = Date.now();

  if (typeof body.prompt !== "string" || body.prompt.trim().length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Prompt is required");
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Parse model to get provider
  const { provider } = parseMusicModel(body.model);
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid music model: ${body.model}. Use format: provider/model`
    );
  }

  // Check provider config for auth bypass
  const providerConfig = getMusicProvider(provider);

  // Get credentials — skip for local providers (authType: "none")
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    credentials = await getProviderCredentials(provider);
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for music provider: ${provider}`
      );
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(provider, credentials);
    }
  }

  const result = await handleMusicGeneration({ body, credentials, log });

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    // Music is billed per-second like audio.
    const seconds = Number(body.duration) || 0;
    const costUsd = await calculateModalCost("audio", provider, body.model, { seconds });
    const headers = new Headers({ "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider,
      model: body.model,
      costUsd,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    return new Response(JSON.stringify((result as { data: unknown }).data), {
      status: 200,
      headers,
    });
  }

  const errorPayload = toJsonErrorPayload((result as any).error, "Music generation provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: (result as any).status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST = withInjectionGuard(postHandler);
