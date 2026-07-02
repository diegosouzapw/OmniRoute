// Allow large audio/video file uploads — 5min for processing large files (up to 2GB)
export const maxDuration = 300;
import { handleAudioTranslation } from "@omniroute/open-sse/handlers/audioTranslation.ts";
import { getProviderCredentials, clearRecoveredProviderState } from "@/sse/services/auth";
import {
  parseTranslationModel,
  getTranslationProvider,
  buildDynamicAudioProvider,
  type ProviderNodeRow,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { getProviderNodes } from "@/lib/localDb";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { attachOmniRouteMetaToResponse } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";

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
 * POST /v1/audio/translations — translate audio to English text
 * OpenAI Whisper API compatible (multipart/form-data). Unlike
 * /v1/audio/transcriptions, output is always English regardless of the
 * source audio language.
 */
export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid multipart form data");
  }

  const startTime = Date.now();

  const model = formData.get("model");
  if (!model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, model as string);
  if (policy.rejection) return policy.rejection;

  // Load local provider_nodes for audio routing (only localhost — prevents auth bypass/SSRF)
  let dynamicProviders: ReturnType<typeof buildDynamicAudioProvider>[] = [];
  try {
    const nodes = await getProviderNodes();
    dynamicProviders = (Array.isArray(nodes) ? (nodes as unknown as ProviderNodeRow[]) : [])
      .filter((n: ProviderNodeRow) => {
        if (n.apiType !== "chat" && n.apiType !== "responses") return false;
        try {
          const hostname = new URL(n.baseUrl).hostname;
          // Strictly matching 172.16.0.0/12 (Docker/local) and explicitly blocking ::1 per SSRF hardening
          return (
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)
          );
        } catch {
          return false;
        }
      })
      .map((n) => buildDynamicAudioProvider(n, "/audio/translations"));
  } catch {
    // DB error — fall back to hardcoded providers only
  }

  const { provider, model: resolvedModel } = parseTranslationModel(
    model as string,
    dynamicProviders
  );
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid translation model: ${model}. Use format: provider/model`
    );
  }

  // Check provider config — hardcoded first, then dynamic
  const providerConfig =
    getTranslationProvider(provider) || dynamicProviders.find((dp) => dp.id === provider) || null;

  // Get credentials — skip for local providers (authType: "none")
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    credentials = await getProviderCredentials(provider);
    if (!credentials) {
      return errorResponse(HTTP_STATUS.BAD_REQUEST, `No credentials for provider: ${provider}`);
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(provider, credentials);
    }
  }

  let response = await handleAudioTranslation({
    formData,
    credentials,
    resolvedProvider: providerConfig,
    resolvedModel,
  });
  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
    // No text body / playback duration available from the multipart upload, so
    // per-second pricing cannot be applied → cost 0 (ADD-only headers, body intact).
    response = attachOmniRouteMetaToResponse(response, {
      provider,
      model: resolvedModel,
      costUsd: 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
  }
  return response;
}
