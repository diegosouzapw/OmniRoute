
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

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { extractImageInputs, normalizeRequestedImageFormat, normalizeProviderImagePayload, parseSizeToDimensions } from "./utils.ts";
import { normalizeRecraftStyle } from "./specialty.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";



const FAL_PRESET_SIZES = {
  "1024x1024": "square_hd",
  "512x512": "square",
  "1792x1024": "landscape_16_9",
  "1024x1792": "portrait_16_9",
  "1024x768": "landscape_4_3",
  "768x1024": "portrait_4_3",
  "1536x1024": "landscape_3_2",
  "1024x1536": "portrait_3_2",
  "576x1024": "portrait_16_9",
  "1024x576": "landscape_16_9",
};



export async function handleFalAIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const { imageUrl, imageUrls } = extractImageInputs(body);
  const upstreamBody: Record<string, unknown> = {
    prompt: body.prompt,
    sync_mode: body.sync_mode ?? true,
  };

  if (body.n !== undefined) upstreamBody.num_images = Number(body.n) || 1;
  if (body.negative_prompt) upstreamBody.negative_prompt = body.negative_prompt;
  if (body.seed !== undefined) upstreamBody.seed = body.seed;
  if (body.style) upstreamBody.style = normalizeRecraftStyle(body.style);

  const outputFormat = normalizeRequestedImageFormat(body, "png");
  if (outputFormat) upstreamBody.output_format = outputFormat;

  if (model.includes("flux-pro/v1.1") && !model.includes("ultra")) {
    upstreamBody.image_size = mapFalImageSize(body.size, "landscape_4_3");
  } else if (
    model.includes("bytedance/") ||
    model.includes("stable-diffusion") ||
    model.includes("ideogram") ||
    model.includes("recraft/v3")
  ) {
    upstreamBody.image_size = mapFalImageSize(body.size, "square_hd");
  } else {
    upstreamBody.aspect_ratio = body.aspect_ratio || mapFalAspectRatio(body.size, "1:1");
  }

  if (body.quality === "hd" && model.includes("ultra")) {
    upstreamBody.raw = true;
  }

  if (imageUrl && model.includes("flux-pro/v1.1-ultra")) {
    upstreamBody.image_url = imageUrl;
  }

  if (imageUrls.length > 0 && model.includes("ideogram")) {
    upstreamBody.image_urls = imageUrls;
  }

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (fal-ai) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
      });
    }

    const payload = await response.json();
    const images = await normalizeProviderImagePayload(payload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: payload.created,
      images,
    });
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
    return saveImageErrorResult({
      provider,
      model,
      status: 502,
      startTime,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    });
  }
}



function mapFalImageSize(size, fallback = "square_hd") {
  if (typeof size !== "string") return fallback;
  if (FAL_PRESET_SIZES[size]) return FAL_PRESET_SIZES[size];
  if (size.includes("x")) {
    const { width, height } = parseSizeToDimensions(size, 1024);
    return { width, height };
  }
  return fallback;
}



function mapFalAspectRatio(size, fallback = "1:1") {
  if (!size) return fallback;
  return mapImageSize(size);
}

