import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import {
  parseImageModel,
  getImageProvider,
  getImageModelEntry,
  modalitiesRequireImageInput,
} from "@omniroute/open-sse/config/imageRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

import { getComboByName } from "@/lib/db/combos";
import { getAllCustomModels } from "@/lib/db/models";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { resolveImageRouteModel } from "@/lib/images/imageRouteModel";
import {
  isMicrosoftDesignerWebProviderRetiredError,
  isMicrosoftDesignerWebRetiredProviderId,
  MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
} from "@/shared/constants/designerWebRetirement";
import {
  resolveLocalSyncedEndpointRoute,
  type LocalSyncedEndpointRoute,
} from "@/lib/providerModels/syncedEndpointRouting";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { generateRequestId } from "@/shared/utils/requestId";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import { runWithCallLogApiKeyContext } from "@/lib/usage/callLogApiKeyContext";
import { executeImageWithCredentialFallback } from "@/sse/services/imageCredentialRetry";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import {
  assertCommonChatGptWebModelAvailable,
  CHATGPT_WEB_RETIRED_ERROR_CODE,
  isCommonChatGptWebRetirementError,
} from "@/shared/constants/chatgptWebRetirement";

export const dynamic = "force-dynamic";

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
 * GET /v1/images/generations — list available image models
 */
export async function GET(request?: Request) {
  return getSpecialtyModelsResponse(
    request,
    "/v1/images/generations",
    (model) => model.type === "image"
  );
}

/**
 * POST /v1/images/generations — generate images
 */
function hasImageGenerationInput(body: Record<string, unknown>) {
  if (typeof body.image_url === "string" && body.image_url.trim()) return true;
  if (typeof body.image === "string" && body.image.trim()) return true;
  if (Array.isArray(body.imageUrls) && body.imageUrls.some((value) => typeof value === "string")) {
    return true;
  }
  if (
    Array.isArray(body.image_urls) &&
    body.image_urls.some((value) => typeof value === "string")
  ) {
    return true;
  }
  return false;
}

// Forward only the host-shaped headers the Gemini Web image handler needs
// to derive the browser-facing public base URL. Avoid copying the full
// request header set: it's wider than the handler needs (auth tokens,
// content-type, etc.) and `Headers.forEach` collapses repeated values, which
// would silently drop entries if a wider helper were reused for headers
// that can legitimately repeat (e.g., set-cookie).
const PUBLIC_BASE_URL_HEADER_KEYS = ["host", "x-forwarded-host", "x-forwarded-proto"] as const;

function publicBaseUrlHeaders(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of PUBLIC_BASE_URL_HEADER_KEYS) {
    const value = headers.get(key);
    if (value !== null) out[key] = value;
  }
  return out;
}

async function postHandler(request, context) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    log.warn("IMAGE", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(v1ImageGenerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message);
  }
  const body = validation.data;
  const startTime = Date.now();

  // Authenticate before policy enforcement. Policy checks intentionally allow
  // keyless local mode and assume the route has already rejected invalid keys.
  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  // Fail closed on the raw wire id before combo/alias/custom-node remapping can erase it.
  try {
    assertCommonChatGptWebModelAvailable(body.model);
  } catch (error) {
    if (isCommonChatGptWebRetirementError(error)) {
      return errorResponse(error.status, error.message, {
        type: "provider_error",
        code: CHATGPT_WEB_RETIRED_ERROR_CODE,
      });
    }
    throw error;
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  const modelPrefix = body.model.includes("/")
    ? body.model.slice(0, body.model.indexOf("/"))
    : body.model;
  if (isMicrosoftDesignerWebRetiredProviderId(modelPrefix)) {
    return errorResponse(HTTP_STATUS.GONE, MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE);
  }

  // #9239: Detect combo name and divert to full image combo execution.
  // Checks before resolveImageRouteModel so we skip single-target flattening.
  if (body.model && typeof body.model === "string" && !body.model.includes("/")) {
    const combo = await getComboByName(body.model as string);
    if (combo) {
      const { executeImageCombo } = await import("@omniroute/open-sse/services/imageCombo");
      return executeImageCombo(body.model as string, body, { request, policy }, startTime, log);
    }
  }

  // #3205/#3215: resolve a combo/alias name (`image`) or a user-prefixed custom image
  // model (`myImg/gpt-image-2`) to its internal `<nodeId>/<model>` form so the
  // custom-model lookup and handler's resolvedProvider extraction resolve correctly.
  // Built-in and already-internal ids pass through unchanged. Shared with /images/edits.
  try {
    body.model = await resolveImageRouteModel(body.model);
  } catch (error) {
    if (isMicrosoftDesignerWebProviderRetiredError(error)) {
      return errorResponse(HTTP_STATUS.GONE, error.message);
    }
    if (isCommonChatGptWebRetirementError(error)) {
      return errorResponse(error.status, error.message, {
        type: "provider_error",
        code: CHATGPT_WEB_RETIRED_ERROR_CODE,
      });
    }
    throw error;
  }

  // Parse model to get provider
  let { provider, model: requestedModel } = parseImageModel(body.model);
  let isCustomModel = false;
  let syncedEndpointRoute: LocalSyncedEndpointRoute | null = null;

  if (!provider) {
    syncedEndpointRoute = await resolveLocalSyncedEndpointRoute(body.model, "images");
    if (syncedEndpointRoute) {
      provider = syncedEndpointRoute.provider;
      body.model = `${syncedEndpointRoute.provider}/${syncedEndpointRoute.model}`;
      isCustomModel = true;
    }
  }

  // If not in built-in registry, check custom models tagged for images
  if (!provider) {
    try {
      const customModelsMap = (await getAllCustomModels()) as Record<string, any>;
      for (const [providerId, models] of Object.entries(customModelsMap)) {
        if (!Array.isArray(models)) continue;
        for (const model of models) {
          if (!model?.id || !Array.isArray(model.supportedEndpoints)) continue;
          if (!model.supportedEndpoints.includes("images")) continue;
          const fullId = `${providerId}/${model.id}`;
          if (fullId === body.model) {
            provider = providerId;
            requestedModel = model.id;
            isCustomModel = true;
            break;
          }
        }
        if (provider) break;
      }
    } catch {}
  }

  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid image model: ${body.model}. Use format: provider/model`
    );
  }

  // Check provider config for auth bypass
  const providerConfig = getImageProvider(provider);
  const imageModelEntry = getImageModelEntry(body.model);
  const inputModalities = imageModelEntry?.inputModalities || ["text"];
  const requiresPrompt = inputModalities.includes("text");
  // imageRequired is an explicit registry override for models that list "text" among
  // their modalities (they accept a prompt) but mechanically require an input image
  // regardless — e.g. Stability AI's dedicated edit/control/upscale endpoints. Without
  // it, modalitiesRequireImageInput() would infer "image optional" for any model that
  // also lists "text", which is wrong for those.
  const requiresImageInput =
    Boolean(imageModelEntry?.imageRequired) || modalitiesRequireImageInput(inputModalities);
  const hasPrompt = typeof body.prompt === "string" && body.prompt.trim().length > 0;
  const hasImageInput = hasImageGenerationInput(body);

  if (requiresPrompt && !hasPrompt) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Prompt is required for image model: ${body.model}`
    );
  }

  if (requiresImageInput && !hasImageInput) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Image input is required for image model: ${body.model}`
    );
  }

  // Get credentials — skip for local providers (authType: "none")
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    credentials = await getProviderCredentialsWithQuotaPreflight(
      provider,
      null,
      null,
      requestedModel
    );
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for image provider: ${provider}`
      );
    }
    if (credentials.allRateLimited) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }
  } else if (isCustomModel) {
    credentials = await getProviderCredentialsWithQuotaPreflight(
      provider,
      null,
      syncedEndpointRoute?.connectionIds ?? null,
      requestedModel
    );
    if (!credentials) {
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        `No credentials for custom image provider: ${provider}`
      );
    }
    if (credentials.allRateLimited) {
      return unavailableResponse(
        HTTP_STATUS.RATE_LIMITED,
        `[${provider}] All accounts rate limited`,
        credentials.retryAfter,
        credentials.retryAfterHuman
      );
    }
  } else if (providerConfig && providerConfig.authType === "none") {
    // #6928: best-effort per-connection base-URL override lookup for local
    // no-auth media providers (ComfyUI). A connection is optional here — unlike
    // the authType !== "none" branch above, we never 400 when none exists.
    const localCredentials = await getProviderCredentialsWithQuotaPreflight(
      provider,
      null,
      null,
      requestedModel
    );
    if (localCredentials && !isAllRateLimitedCredentials(localCredentials)) {
      credentials = localCredentials;
    }
  }

  const execution = await executeImageWithCredentialFallback({
    provider,
    requestedModel,
    credentials,
    execute: async (attemptCredentials) => {
      let proxyInfo = null;
      if (attemptCredentials?.connectionId) {
        try {
          proxyInfo = await resolveProxyForConnection(attemptCredentials.connectionId);
        } catch {
          log.debug("PROXY", `Failed to resolve proxy for image provider: ${provider}`);
        }
      }

      const generateImage = () =>
        runWithCallLogApiKeyContext(
          {
            apiKeyId: policy.apiKeyInfo?.id ?? null,
            apiKeyName: policy.apiKeyInfo?.name ?? null,
          },
          () =>
            handleImageGeneration({
              body,
              credentials: attemptCredentials,
              log,
              ...(isCustomModel && { resolvedProvider: provider }),
              signal: request.signal,
              clientHeaders: publicBaseUrlHeaders(request.headers),
              // Trusted "loopback"|"lan"|"remote" verdict stamped by the authz
              // pipeline from the real TCP peer (never the spoofable Host
              // header). Only the spawn-capable cursor-agent-image provider
              // consumes this (Hard Rules #15 + #17) — every other image
              // provider ignores it.
              peerLocality: request.headers.get(AUTHZ_HEADER_PEER_LOCALITY),
            })
        );

      return attemptCredentials?.connectionId
        ? runWithProxyContext(proxyInfo?.proxy || null, generateImage).catch((err: any) => ({
            success: false,
            status: err.statusCode || 500,
            error: err.message,
          }))
        : generateImage();
    },
  });
  credentials = execution.credentials;
  const result = execution.result;

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    const n = Math.max(
      Number(body.n) || 1,
      (result as { data?: { data?: unknown[] } }).data?.data?.length || 0
    );
    const costUsd = await calculateModalCost("image", provider, body.model, { n });
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

  const errorPayload = toJsonErrorPayload(
    (result as any).error,
    "Image generation provider error"
  ) as {
    error?: { message?: string };
  };
  const message =
    typeof errorPayload?.error?.message === "string"
      ? errorPayload.error.message
      : "Image generation provider error";
  return errorResponse((result as any).status, message);
}

export const POST = withInjectionGuard(postHandler);
