import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import {
  getProviderCredentials,
  clearRecoveredProviderState,
  extractApiKey,
  isValidApiKey,
} from "@/sse/services/auth";
import {
  parseImageModel,
  getAllImageModels,
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

import { getAllCustomModels } from "@/lib/localDb";

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
export async function GET() {
  const builtInModels = getAllImageModels();
  const timestamp = Math.floor(Date.now() / 1000);

  const data = builtInModels.map((m) => ({
    id: m.id,
    object: "model",
    created: timestamp,
    owned_by: m.provider,
    type: "image",
    supported_sizes: m.supportedSizes,
    input_modalities: m.inputModalities || ["text"],
    output_modalities: ["image"],
    ...(m.description ? { description: m.description } : {}),
  }));

  // Include custom models tagged for images
  try {
    const customModelsMap = (await getAllCustomModels()) as Record<string, any>;
    for (const [providerId, models] of Object.entries(customModelsMap)) {
      if (!Array.isArray(models)) continue;
      for (const model of models) {
        if (!model?.id || !Array.isArray(model.supportedEndpoints)) continue;
        if (!model.supportedEndpoints.includes("images")) continue;
        const fullId = `${providerId}/${model.id}`;
        if (data.some((d) => d.id === fullId)) continue;
        data.push({
          id: fullId,
          object: "model",
          created: timestamp,
          owned_by: providerId,
          type: "image",
          supported_sizes: null,
          input_modalities: ["text"],
          output_modalities: ["image"],
        });
      }
    }
  } catch {}

  return new Response(JSON.stringify({ object: "list", data }), {
    headers: { "Content-Type": "application/json" },
  });
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

export async function POST(request) {
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

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, body.model);
  if (policy.rejection) return policy.rejection;

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
    credentials = await getProviderCredentials(provider);
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
    credentials = await getProviderCredentials(provider);
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

  const result = await handleImageGeneration({
    body,
    credentials,
    log,
    ...(isCustomModel && { resolvedProvider: provider }),
    signal: request.signal,
    clientHeaders: publicBaseUrlHeaders(request.headers),
  });

  if (result.success) {
    await clearRecoveredProviderState(credentials);
    return new Response(JSON.stringify((result as any).data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload((result as any).error, "Image generation provider error");
  return new Response(JSON.stringify(errorPayload), {
    status: (result as any).status,
    headers: { "Content-Type": "application/json" },
  });
}
