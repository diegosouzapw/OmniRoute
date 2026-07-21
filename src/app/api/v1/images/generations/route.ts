import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
  extractApiKey,
  isValidApiKey,
} from "@/sse/services/auth";
import {
  parseImageModel,
  getImageProvider,
  getImageModelEntry,
} from "@omniroute/open-sse/config/imageRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

import { getAllCustomModels, resolveProxyForConnection } from "@/lib/localDb";
import { resolveImageRouteModel } from "@/lib/images/imageRouteModel";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { generateRequestId } from "@/shared/utils/requestId";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import { classify429 as classifyAntigravity429 } from "@omniroute/open-sse/services/antigravity429Engine.ts";

export const dynamic = "force-dynamic";

// A route retry is a new, non-idempotent upstream submission. Keep its total
// work bounded even if an executor grows its own retry policy later.
const MAX_ANTIGRAVITY_IMAGE_ATTEMPTS = 2;
const ANTIGRAVITY_IMAGE_RETRY_DEADLINE_MS = 30_000;

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

// Forward only the host-shaped headers the chatgpt-web image handler needs
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

export function isRetryableImageAccountFailure(result: {
  success: boolean;
  status?: number;
  error?: unknown;
}): boolean {
  // HTTP 429 commonly means a provider-wide or short burst limit. Rotate only
  // after an explicit Antigravity account/model quota signal; ambiguous 429s
  // retain their final normalized upstream error without resubmitting.
  if (result.success || result.status !== HTTP_STATUS.RATE_LIMITED) return false;
  let errorText = "";
  try {
    errorText =
      typeof result.error === "string" ? result.error : JSON.stringify(result.error ?? "");
  } catch {
    return false;
  }
  return (
    classifyAntigravity429(errorText) === "quota_exhausted" || /resource exhausted/i.test(errorText)
  );
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

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

  // #3205/#3215: resolve a combo/alias name (`image`) or a user-prefixed custom image
  // model (`myImg/gpt-image-2`) to its internal `<nodeId>/<model>` form so the
  // custom-model lookup and handler's resolvedProvider extraction resolve correctly.
  // Built-in and already-internal ids pass through unchanged. Shared with /images/edits.
  body.model = await resolveImageRouteModel(body.model);

  // Parse model to get provider
  let { provider } = parseImageModel(body.model);
  let isCustomModel = false;

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
  const requiresImageInput = inputModalities.includes("image");
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
    credentials = await getProviderCredentialsWithQuotaPreflight(provider);
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
    credentials = await getProviderCredentialsWithQuotaPreflight(provider);
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
  }

  const retryDeadlineAt = Date.now() + ANTIGRAVITY_IMAGE_RETRY_DEADLINE_MS;
  const budgetController = new AbortController();
  const abortForClient = () => budgetController.abort();
  if (request.signal.aborted) abortForClient();
  else request.signal.addEventListener("abort", abortForClient, { once: true });
  const retryDeadlineTimer = setTimeout(
    () => budgetController.abort(),
    ANTIGRAVITY_IMAGE_RETRY_DEADLINE_MS
  );

  const generateImage = () =>
    handleImageGeneration({
      body,
      credentials,
      log,
      ...(isCustomModel && { resolvedProvider: provider }),
      signal: budgetController.signal,
      clientHeaders: publicBaseUrlHeaders(request.headers),
    });

  const executeImageAttempt = async () => {
    // This intentionally resolves the proxy for every attempt. A retry can
    // select a different account with a different assigned proxy.
    let proxyInfo = null;
    if (credentials?.connectionId) {
      try {
        proxyInfo = await resolveProxyForConnection(credentials.connectionId);
      } catch {
        log.debug("PROXY", `Failed to resolve proxy for image provider: ${provider}`);
      }
    }
    return credentials?.connectionId
      ? runWithProxyContext(proxyInfo?.proxy || null, generateImage).catch((err: any) => ({
          success: false,
          status: err.statusCode || 500,
          error: err.message,
        }))
      : generateImage();
  };

  let attemptCount = 1;
  let result;
  try {
    result = await executeImageAttempt();

    // Antigravity image requests do not pass through chatCore's account retry
    // loop. Do not call the durable account-unavailable marker because an image
    // quota response may be model-scoped.
    if (provider === "antigravity") {
      const excludedConnectionIds: string[] = [];
      while (
        !budgetController.signal.aborted &&
        Date.now() < retryDeadlineAt &&
        attemptCount < MAX_ANTIGRAVITY_IMAGE_ATTEMPTS &&
        isRetryableImageAccountFailure(result) &&
        typeof credentials?.connectionId === "string"
      ) {
        const failedConnectionId = credentials.connectionId;
        if (!excludedConnectionIds.includes(failedConnectionId)) {
          excludedConnectionIds.push(failedConnectionId);
        }

        const requestedModel = body.model.startsWith(`${provider}/`)
          ? body.model.slice(provider.length + 1)
          : body.model;
        const nextCredentials = await getProviderCredentialsWithQuotaPreflight(
          provider,
          null,
          null,
          requestedModel,
          { excludeConnectionIds: excludedConnectionIds }
        ).catch(() => null);

        if (!nextCredentials || nextCredentials.allRateLimited || budgetController.signal.aborted)
          break;
        credentials = nextCredentials;
        result = await executeImageAttempt();
        attemptCount++;
      }
    }

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
    );
    return new Response(JSON.stringify(errorPayload), {
      status: (result as any).status,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    clearTimeout(retryDeadlineTimer);
    request.signal.removeEventListener("abort", abortForClient);
  }
}

export const POST = withInjectionGuard(postHandler);
