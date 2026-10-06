import { handleVideoGeneration } from "@omniroute/open-sse/handlers/videoGeneration.ts";
import { resolveVideoCredentialProvider } from "@omniroute/open-sse/handlers/videoGeneration/googleFlow.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
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
  isMediaGenerationFailure,
  mediaGenerationOptionsResponse,
  promptRequiredResponse,
  readMediaGenerationBody,
  successfulMediaGenerationResponse,
} from "@/app/api/v1/_shared/mediaGenerationRoute";
import type { MediaGenerationResultLike } from "@/app/api/v1/_shared/mediaGenerationRoute";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import {
  isVideoPromptOptional,
  resolveLocalOverrideCredentials,
  resolveVideoModelTarget,
} from "@/app/api/v1/_shared/videoModelResolution";

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
 * POST /v1/videos/generations — generate videos
 */
async function postHandler(request, context) {
  const parsed = await readMediaGenerationBody(request, log, "VIDEO");
  if (parsed.state === "invalid") {
    return parsed.response;
  }
  const body = parsed.body;
  const startTime = Date.now();

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // Detect a combo name and divert to full video combo execution, mirroring
  // the images route. Checks before the provider lookup — and before the
  // prompt-required check below — so a combo name is never rejected as an
  // invalid `provider/model` id or against the wrong model's prompt rules:
  // /v1/models advertises these names, and prompt requirements depend on the
  // resolved target, which for a combo is only known after expansion.
  if (body.model && typeof body.model === "string" && !body.model.includes("/")) {
    const { getComboByName } = await import("@/lib/db/combos");
    const combo = await getComboByName(body.model);
    if (combo) {
      const { executeVideoCombo } = await import("@omniroute/open-sse/services/videoCombo");
      return executeVideoCombo(body.model, body, { request, policy }, startTime, log);
    }
  }

  // Parse model to get provider — checks the built-in registry, then custom
  // OpenAI-compatible provider nodes tagged with the "videos" endpoint.
  const resolvedTarget = await resolveVideoModelTarget(body.model);
  const { provider, model: requestedModel, isCustomModel } = resolvedTarget;
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid video model: ${body.model}. Use format: provider/model`
    );
  }

  if (!isVideoPromptOptional(resolvedTarget)) {
    const promptError = promptRequiredResponse(body);
    if (promptError) return promptError;
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
  } else if (isCustomModel) {
    credentials = await getProviderCredentialsWithQuotaPreflight(
      provider,
      null,
      null,
      requestedModel
    );
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for custom video provider: ${provider}`
      );
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(provider, credentials);
    }
  } else if (providerConfig?.authType === "none") {
    credentials = await resolveLocalOverrideCredentials(provider);
  }

  const result: MediaGenerationResultLike = await handleVideoGeneration({
    body,
    credentials,
    log,
    ...(isCustomModel && { resolvedProvider: provider }),
  });

  if (isMediaGenerationFailure(result)) {
    return failedMediaGenerationResponse(result, "Video generation provider error");
  }

  await clearRecoveredProviderState(credentials);
  return successfulMediaGenerationResponse({
    result: { data: result.data },
    billingMode: "video",
    provider,
    model: body.model,
    startTime,
    duration: body.duration,
  });
}

export const POST = withInjectionGuard(postHandler);
