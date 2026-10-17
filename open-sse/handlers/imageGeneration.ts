/** Image generation handler for POST /v1/images/generations (OpenAI-compatible). */

import {
  CHATGPT_WEB_RETIRED_ERROR_CODE,
  CHATGPT_WEB_RETIRED_MESSAGE,
  isCommonChatGptWebRetiredProviderId,
} from "@/shared/constants/chatgptWebRetirement";
import {
  isMicrosoftDesignerWebRetiredProviderId,
  MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
} from "@/shared/constants/designerWebRetirement";

import { getImageProvider, parseImageModel } from "../config/imageRegistry.ts";
import { HTTP_STATUS } from "../config/constants.ts";
import { handleSDWebUIImageGeneration } from "./imageGeneration/providers/sdWebUI.ts";
import {
  fanOutSingleImageCalls,
  IMAGE_FANOUT_MAX_N,
  resolveRequestedImageCount,
  SINGLE_IMAGE_FANOUT_FORMATS,
} from "./imageGeneration/fanOut.ts";
import { handleHyperbolicImageGeneration } from "./imageGeneration/providers/hyperbolic.ts";
import { handleHuggingFaceImageGeneration } from "./imageGeneration/providers/huggingface.ts";
import { handleComfyUIImageGeneration } from "./imageGeneration/providers/comfyUI.ts";
import { handleImagen3ImageGeneration } from "./imageGeneration/providers/imagen3.ts";
import { handleIdeogramImageGeneration } from "./imageGeneration/providers/ideogram.ts";
import { handleHaiperImageGeneration } from "./imageGeneration/providers/haiper.ts";
import { handleLeonardoImageGeneration } from "./imageGeneration/providers/leonardo.ts";
import { handleMagnificImageGeneration } from "./imageGeneration/providers/magnific.ts";
import { handleNvidiaNimImageGeneration } from "./imageGeneration/providers/nvidiaNim.ts";
import { handleSegmindImageGeneration } from "./imageGeneration/providers/segmind.ts";
import { handleUcImageGeneration } from "./imageGeneration/providers/ucImage.ts";
import { handleCursorAgentImageGeneration } from "./imageGeneration/providers/cursorAgentImage.ts";
import { handleMinimaxImageGeneration } from "./imageGeneration/providers/minimax.ts";
import { handleCloudflareAiImageGeneration } from "./imageGeneration/providers/cloudflareAi.ts";
import { handleMaxaiImageGeneration } from "./imageGeneration/providers/maxaiImage.ts";
import { handleAdobeFireflyImageGeneration } from "./imageGeneration/providers/adobeFirefly.ts";
import { handleSyntxImageGeneration } from "./imageGeneration/providers/syntx.ts";
import { handleZenmuxImageGeneration } from "./imageGeneration/providers/zenmux.ts";
import { handleAlibabaImageGeneration } from "./imageGeneration/providers/alibabaImage.ts";
import { handleAiHordeImageGeneration } from "./imageGeneration/providers/aihorde.ts";
import { handleMuseImageGeneration } from "./imageGeneration/providers/museImage.ts";
// Re-export so /v1/images/edits can dispatch Firefly reference-image edits.
export { handleAdobeFireflyImageGeneration, handleSyntxImageGeneration };
import { handleGeminiImageGeneration } from "./geminiImage.ts";
import {
  resolveImageBaseUrl,
  saveCallLog,
  fetchUntrustedRemoteImage,
  fetchWithTimeout,
  FetchTimeoutError,
} from "./imageGeneration/shared.ts";
import { resolveComfyUiBaseUrl } from "../utils/comfyuiClient.ts";
import { handleKieImageGeneration } from "./imageGeneration/providers/kie.ts";
import { handleOpenAIImageGeneration } from "./imageGeneration/providers/openAI.ts";
import { handleCodexImageGeneration } from "./imageGeneration/providers/codex.ts";
import { handleCodexImages, isCodexImagesModel } from "./codexImages.ts";
import { handleFalAIImageGeneration } from "./imageGeneration/providers/falGeneration.ts";
import { handleStabilityAIImageGeneration } from "./imageGeneration/providers/stability.ts";
import { handleBlackForestLabsImageGeneration } from "./imageGeneration/providers/blackForestLabs.ts";
import { handleRecraftImageGeneration } from "./imageGeneration/providers/recraft.ts";
import { handleTopazImageGeneration } from "./imageGeneration/providers/topaz.ts";
import { handleNanoBananaImageGeneration } from "./imageGeneration/providers/nanoBanana.ts";
export {
  KIE_MARKET_UPSTREAM_MODEL_IDS,
  resolveKieMarketUpstreamModelId,
} from "./imageGeneration/providers/kie.ts";
export {
  handleOpenAIImageEdit,
  handleOpenRouterImageEdit,
} from "./imageGeneration/providers/openAI.ts";
export {
  handleCodexImageEdit,
  extractImageGenerationCalls,
  isCodexChatGptModelAccessError,
  mapLegacyImageQualityToImageTool,
  shrinkCodexReferenceImage,
} from "./imageGeneration/providers/codex.ts";
export { normalizeNanoBananaTaskResult } from "./imageGeneration/providers/nanoBanana.ts";
export {
  resolveImageBaseUrl,
  extractImageInputs,
  isHttpUrl,
  normalizePositiveNumber,
  parseSizeToDimensions,
  resolveImageSource,
  normalizeRequestedImageFormat,
  mapFalImageSize,
  normalizeProviderImagePayload,
  sanitizeImageProviderError,
  saveImageSuccessResult,
  saveImageErrorResult,
} from "./imageGeneration/shared.ts";
/**
 * Handle image generation request
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.credentials - Provider credentials { apiKey, accessToken }
 * @param {object} options.log - Logger
 * @param {string} [options.resolvedProvider] - Pre-resolved provider ID (from route layer custom model resolution)
 * @param {string|null} [options.peerLocality] - Trusted "loopback"|"lan"|"remote" verdict
 *   forwarded from `AUTHZ_HEADER_PEER_LOCALITY` (src/server/authz/headers.ts). Only consumed by
 *   spawn-capable providers (e.g. cursor-agent-image) to enforce Hard Rules #15/#17 without
 *   loopback-gating the whole route for every non-spawning image provider.
 */
export async function handleImageGeneration({
  body,
  credentials,
  log,
  resolvedProvider = null,
  signal = null,
  clientHeaders = null,
  peerLocality = null,
}) {
  // Retirement guards: the retired-provider sets hold bare provider ids only, so testing
  // the `<provider>/` prefix (or the whole model when it carries no slash) covers both the
  // `provider/model` and bare-id request shapes.
  const requestedModel = typeof body?.model === "string" ? body.model : "";
  const slash = requestedModel.indexOf("/");
  const requestedPrefix = slash > 0 ? requestedModel.slice(0, slash) : requestedModel;
  if (
    isMicrosoftDesignerWebRetiredProviderId(resolvedProvider) ||
    isMicrosoftDesignerWebRetiredProviderId(requestedPrefix)
  ) {
    return {
      success: false,
      status: HTTP_STATUS.GONE,
      error: MICROSOFT_DESIGNER_WEB_RETIRED_MESSAGE,
    };
  }

  if (
    isCommonChatGptWebRetiredProviderId(resolvedProvider) ||
    isCommonChatGptWebRetiredProviderId(requestedPrefix)
  ) {
    return {
      success: false,
      status: HTTP_STATUS.GONE,
      error: CHATGPT_WEB_RETIRED_MESSAGE,
      code: CHATGPT_WEB_RETIRED_ERROR_CODE,
    };
  }

  let provider, model;

  if (resolvedProvider) {
    // Provider was already resolved by the route layer (custom model from DB)
    // Extract model name from the full "provider/model" string
    provider = resolvedProvider;
    const modelStr = body.model || "";
    model = modelStr.startsWith(provider + "/") ? modelStr.slice(provider.length + 1) : modelStr;
  } else {
    // Standard path: resolve from built-in image registry
    const parsed = parseImageModel(body.model);
    provider = parsed.provider;
    model = parsed.model;
  }

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid image model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getImageProvider(provider);

  // For custom models without a built-in provider config, use OpenAI-compatible handler
  // with a synthetic config based on the provider's credentials
  if (!providerConfig) {
    if (!resolvedProvider) {
      return {
        success: false,
        status: 400,
        error: `Unknown image provider: ${provider}`,
      };
    }

    // Custom model: use OpenAI-compatible format with provider's base URL
    // The credentials were already resolved by the route layer
    if (log) {
      log.info("IMAGE", `Custom model ${provider}/${model} — using OpenAI-compatible handler`);
    }

    const syntheticConfig = {
      id: provider,
      // #3205: custom OpenAI-compatible nodes store their base URL in
      // credentials.providerSpecificData.baseUrl (same as the chat path —
      // see executors/default.ts:buildUrl / services/provider.ts:buildProviderUrl).
      // Previously only the (always-absent) top-level credentials.baseUrl was
      // read, so every custom image node fell back to the Gemini endpoint and
      // returned "Please pass a valid API key".
      baseUrl: resolveImageBaseUrl(credentials, "", "generations", true),
      authType: "apikey",
      authHeader: "bearer",
      format: "openai",
    };

    if (!syntheticConfig.baseUrl) {
      return {
        success: false,
        status: 501,
        error: `Image generation is not configured for custom provider: ${provider}`,
      };
    }

    return handleOpenAIImageGeneration({
      model,
      provider,
      providerConfig: syntheticConfig,
      body,
      credentials,
      log,
    });
  }

  const requestedCount = resolveRequestedImageCount(body.n);
  if (requestedCount > 1 && SINGLE_IMAGE_FANOUT_FORMATS.has(providerConfig.format)) {
    const count = Math.min(requestedCount, IMAGE_FANOUT_MAX_N);
    if (count < requestedCount && typeof log?.warn === "function")
      log.warn("IMAGE", `n=${requestedCount} clamped to ${IMAGE_FANOUT_MAX_N}`);
    return fanOutSingleImageCalls({
      body,
      count,
      label: `${provider}/${model}`,
      log,
      signal,
      generateOne: (taskBody) =>
        handleImageGeneration({
          body: taskBody,
          credentials,
          log,
          resolvedProvider,
          signal,
          clientHeaders,
          peerLocality,
        }),
    });
  }

  if (providerConfig.format === "zenmux-image") {
    return handleZenmuxImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "syntx-image") {
    return handleSyntxImageGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  if (providerConfig.format === "muse-image") {
    return handleMuseImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
      deps: {
        saveCallLog,
        fetchRemoteImage: fetchUntrustedRemoteImage,
        fetchWithTimeout,
        isTimeoutError: (err) => err instanceof FetchTimeoutError,
      },
    });
  }

  if (providerConfig.format === "aihorde") {
    return handleAiHordeImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "gemini-image") {
    return handleGeminiImageGeneration({ model, providerConfig, body, credentials, log, signal });
  }

  if (providerConfig.format === "imagen3") {
    return handleImagen3ImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "hyperbolic") {
    return handleHyperbolicImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "huggingface-image") {
    return handleHuggingFaceImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "fal-ai") {
    return handleFalAIImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "stability-ai") {
    return handleStabilityAIImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "black-forest-labs") {
    return handleBlackForestLabsImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "recraft") {
    return handleRecraftImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "topaz") {
    return handleTopazImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "segmind") {
    return handleSegmindImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "cursor-agent-image") {
    return handleCursorAgentImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
      peerLocality,
    });
  }

  if (providerConfig.format === "maxai-image") {
    return handleMaxaiImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "uc-image") {
    return handleUcImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "adobe-firefly-image") {
    return handleAdobeFireflyImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "nanobanana") {
    return handleNanoBananaImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "kie-image") {
    return handleKieImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "sdwebui") {
    return handleSDWebUIImageGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIImageGeneration({
      model,
      provider,
      providerConfig: {
        ...providerConfig,
        baseUrl: resolveComfyUiBaseUrl(credentials, providerConfig.baseUrl),
      },
      body,
      log,
    });
  }

  if (providerConfig.format === "codex-responses") {
    if (isCodexImagesModel(model))
      return handleCodexImages({ model, provider, providerConfig, body, credentials, log, signal });
    return handleCodexImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
      signal,
    });
  }

  if (providerConfig.format === "haiper-image") {
    return handleHaiperImageGeneration({ model, provider, providerConfig, body, credentials, log });
  }
  if (providerConfig.format === "leonardo-image") {
    return handleLeonardoImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }
  if (providerConfig.format === "ideogram-image") {
    return handleIdeogramImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }
  if (providerConfig.format === "magnific-image" || providerConfig.format === "freepik-image") {
    return handleMagnificImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "nvidia-nim") {
    return handleNvidiaNimImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "cloudflare-ai-image") {
    return handleCloudflareAiImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "minimax-image") {
    return handleMinimaxImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  if (
    providerConfig.format === "agnes-image" &&
    (typeof body.size !== "string" || body.size.trim().length === 0)
  ) {
    return {
      success: false,
      status: 400,
      error: "Size is required for Agnes Image 2.1 Flash",
    };
  }

  if (
    providerConfig.format === "alibaba-image" ||
    providerConfig.format === "qwen-cloud-image" ||
    providerConfig.format === "qwen-token-plan-image" ||
    providerConfig.format === "bailian-coding-plan-image"
  ) {
    return handleAlibabaImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  return handleOpenAIImageGeneration({ model, provider, providerConfig, body, credentials, log });
}
