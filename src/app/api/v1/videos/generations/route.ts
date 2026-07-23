import { handleVideoGeneration } from "@omniroute/open-sse/handlers/videoGeneration.ts";
import { resolveVideoCredentialProvider } from "@omniroute/open-sse/handlers/videoGeneration/googleFlow.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { parseVideoModel, getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import {
  failedMediaGenerationResponse,
  mediaGenerationOptionsResponse,
  promptRequiredResponse,
  readMediaGenerationBody,
  successfulMediaGenerationResponse,
} from "@/app/api/v1/_shared/mediaGenerationRoute";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";

export const dynamic = "force-dynamic";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return mediaGenerationOptionsResponse();
}

/**
 * GET /v1/videos/generations — list available video models
 */
export async function GET(request?: Request) {
  return getSpecialtyModelsResponse(
    request,
    "/v1/videos/generations",
    (model) => model.type === "video"
  );
}

/**
 * #6928: best-effort per-connection base-URL override lookup for local no-auth
 * media providers (ComfyUI). Returns null instead of failing when no connection
 * exists — local providers must keep working with zero configuration.
 */
async function resolveLocalOverrideCredentials(provider) {
  const localCredentials = await getProviderCredentialsWithQuotaPreflight(provider);
  return localCredentials && !isAllRateLimitedCredentials(localCredentials)
    ? localCredentials
    : null;
}

/**
 * POST /v1/videos/generations — generate videos
 */
async function postHandler(request, context) {
  const parsed = await readMediaGenerationBody(request, log, "VIDEO");
  if (!parsed.ok) {
    return parsed.response;
  }
  const body = parsed.body;
  const startTime = Date.now();
  const parsedModel = parseVideoModel(body.model);

  const promptOptional =
    (parsedModel.model === "happyhorse-1.1-i2v" &&
      (parsedModel.provider === "alibaba" ||
        parsedModel.provider === "bailian-coding-plan" ||
        parsedModel.provider === "qwen-cloud-token-plan" ||
        parsedModel.provider === "qwen-cloud")) ||
    (parsedModel.provider === "qwen-cloud" && parsedModel.model === "wan2.7-i2v") ||
    (parsedModel.provider === "alibaba" &&
      (parsedModel.model === "wan2.7-i2v-2026-04-25" || parsedModel.model === "wan2.6-i2v-flash"));
  if (!promptOptional) {
    const promptError = promptRequiredResponse(body);
    if (promptError) return promptError;
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Parse model to get provider
  const { provider } = parsedModel;
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid video model: ${body.model}. Use format: provider/model`
    );
  }

  // Check provider config for auth bypass
  const providerConfig = getVideoProvider(provider);

  // Get credentials — skip for local providers (authType: "none").
  // Google Flow has no standalone connection: it reuses the Antigravity Google
  // OAuth credential (resolveVideoCredentialProvider maps googleflow → antigravity).
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    credentials = await getProviderCredentialsWithQuotaPreflight(
      resolveVideoCredentialProvider(provider)
    );
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for video provider: ${provider}`
      );
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(provider, credentials);
    }
  } else if (providerConfig?.authType === "none") {
    credentials = await resolveLocalOverrideCredentials(provider);
  }

  const result = await handleVideoGeneration({ body, credentials, log });

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    return successfulMediaGenerationResponse({
      result,
      billingMode: "video",
      provider,
      model: body.model,
      startTime,
      duration: body.duration,
    });
  }

  return failedMediaGenerationResponse(result, "Video generation provider error");
}

export const POST = withInjectionGuard(postHandler);
