
/**
 * Image Generation Handler
 *
 * Handles POST /v1/images/generations requests.
 * Proxies to upstream image generation providers using OpenAI-compatible format.
 *
 * Request format (OpenAI-compatible):
 * {
 *   "model": "openai/gpt-image-2",
 *   "prompt": "a beautiful sunset over mountains",
 *   "n": 1,
 *   "size": "1024x1024",
 *   "quality": "standard",       // optional: "standard" | "hd"
 *   "response_format": "url"     // optional: "url" | "b64_json"
 * }
 */

import { getImageProvider, parseImageModel } from "../../config/imageRegistry.ts";

import { HTTP_STATUS } from "../../config/constants.ts";

import { applyAntigravityClientProfileHeaders } from "../../services/antigravityClientProfile.ts";

import { getAntigravityEnvelopeUserAgent } from "../../services/antigravityIdentity.ts";

import { kieExecutor } from "../../executors/kie.ts";

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import { getCodexClientVersion, getCodexUserAgent } from "../../config/codexClient.ts";

import { ChatGptWebExecutor } from "../../executors/chatgpt-web.ts";

import { getChatGptImage, findChatGptImageBySha256 } from "../../services/chatgptImageCache.ts";

import { createHash } from "node:crypto";

import { sleep } from "../../utils/sleep.ts";

import {
  getKieErrorMessage,
  getKieErrorStatus,
  isJsonObject,
  parseKieResultJson,
} from "../../utils/kieTask.ts";

import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../../utils/comfyuiClient.ts";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { resolveImageBaseUrl } from "./utils.ts";
import { handleOpenAIImageGeneration } from "./openai.ts";
import { handleGeminiImageGeneration } from "./gemini.ts";
import { handleImagen3ImageGeneration } from "./imagen3.ts";
import { handleHyperbolicImageGeneration, handleRecraftImageGeneration, handleTopazImageGeneration, handleNanoBananaImageGeneration, handleSDWebUIImageGeneration, handleComfyUIImageGeneration, handleHaiperImageGeneration, handleLeonardoImageGeneration, handleIdeogramImageGeneration } from "./specialty.ts";
import { handleFalAIImageGeneration } from "./fal.ts";
import { handleStabilityAIImageGeneration } from "./stability.ts";
import { handleBlackForestLabsImageGeneration } from "./blackForestLabs.ts";
import { handleChatGptWebImageGeneration } from "./chatgptWeb.ts";
import { handleKieImageGeneration } from "./kie.ts";
import { handleCodexImageGeneration } from "./codex.ts";



/**
 * Handle image generation request
 * @param {object} options
 * @param {object} options.body - Request body
 * @param {object} options.credentials - Provider credentials { apiKey, accessToken }
 * @param {object} options.log - Logger
 * @param {string} [options.resolvedProvider] - Pre-resolved provider ID (from route layer custom model resolution)
 */
export async function handleImageGeneration({
  body,
  credentials,
  log,
  resolvedProvider = null,
  signal = null,
  clientHeaders = null,
}) {
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
      baseUrl: resolveImageBaseUrl(
        credentials,
        `https://generativelanguage.googleapis.com/v1beta/openai/images/generations`
      ),
      authType: "apikey",
      authHeader: "bearer",
      format: "openai",
    };

    return handleOpenAIImageGeneration({
      model,
      provider,
      providerConfig: syntheticConfig,
      body,
      credentials,
      log,
    });
  }

  if (providerConfig.format === "gemini-image") {
    return handleGeminiImageGeneration({ model, providerConfig, body, credentials, log });
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

  if (providerConfig.format === "chatgpt-web") {
    return handleChatGptWebImageGeneration({
      model,
      provider,
      body,
      credentials,
      log,
      signal,
      clientHeaders,
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
    return handleComfyUIImageGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "codex-responses") {
    return handleCodexImageGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
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

  return handleOpenAIImageGeneration({ model, provider, providerConfig, body, credentials, log });
}

