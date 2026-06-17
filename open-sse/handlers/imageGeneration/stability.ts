
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

import { extractImageInputs, normalizeRequestedImageFormat, appendOptionalFormValue, resolveImageSource, appendImageFormValue, normalizeProviderImagePayload } from "./utils.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";



const STABILITY_GENERATION_ENDPOINTS = {
  "sd3.5-large": "/v2beta/stable-image/generate/sd3",
  "sd3.5-large-turbo": "/v2beta/stable-image/generate/sd3",
  "sd3.5-medium": "/v2beta/stable-image/generate/sd3",
  "sd3.5-flash": "/v2beta/stable-image/generate/sd3",
  "stable-image-ultra": "/v2beta/stable-image/generate/ultra",
  "stable-image-core": "/v2beta/stable-image/generate/core",
};



const STABILITY_EDIT_ENDPOINTS = {
  inpaint: "/v2beta/stable-image/edit/inpaint",
  outpaint: "/v2beta/stable-image/edit/outpaint",
  erase: "/v2beta/stable-image/edit/erase",
  "search-and-replace": "/v2beta/stable-image/edit/search-and-replace",
  "search-and-recolor": "/v2beta/stable-image/edit/search-and-recolor",
  "remove-background": "/v2beta/stable-image/edit/remove-background",
  "replace-background-and-relight": "/v2beta/stable-image/edit/replace-background-and-relight",
  fast: "/v2beta/stable-image/upscale/fast",
  conservative: "/v2beta/stable-image/upscale/conservative",
  creative: "/v2beta/stable-image/upscale/creative",
  sketch: "/v2beta/stable-image/control/sketch",
  structure: "/v2beta/stable-image/control/structure",
  style: "/v2beta/stable-image/control/style",
  "style-transfer": "/v2beta/stable-image/control/style-transfer",
};



const STABILITY_CONTROL_MODELS = new Set(["sketch", "structure", "style", "style-transfer"]);



export async function handleStabilityAIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  const endpoint = STABILITY_GENERATION_ENDPOINTS[model] || STABILITY_EDIT_ENDPOINTS[model];

  if (!endpoint) {
    return {
      success: false,
      status: 400,
      error: `Unsupported Stability AI image model: ${model}`,
    };
  }

  const { imageUrl, maskUrl } = extractImageInputs(body);
  const upstreamBody: Record<string, unknown> = {
    output_format:
      model === "remove-background"
        ? normalizeRequestedImageFormat(body, "png", ["png", "webp"])
        : normalizeRequestedImageFormat(body, "png"),
  };
  const formData = new FormData();

  appendOptionalFormValue(formData, "output_format", upstreamBody.output_format);
  if (body.prompt) {
    upstreamBody.prompt = body.prompt;
    appendOptionalFormValue(formData, "prompt", body.prompt);
  }
  if (body.negative_prompt) {
    upstreamBody.negative_prompt = body.negative_prompt;
    appendOptionalFormValue(formData, "negative_prompt", body.negative_prompt);
  }
  if (body.seed !== undefined) {
    upstreamBody.seed = body.seed;
    appendOptionalFormValue(formData, "seed", body.seed);
  }

  try {
    if (STABILITY_GENERATION_ENDPOINTS[model]) {
      if (model.startsWith("sd3.5")) {
        upstreamBody.model = model;
        appendOptionalFormValue(formData, "model", model);
      }

      if (imageUrl) {
        const imageSource = await resolveImageSource(imageUrl);
        upstreamBody.mode = "image-to-image";
        appendOptionalFormValue(formData, "mode", "image-to-image");
        upstreamBody.image = imageSource.base64;
        appendImageFormValue(formData, "image", imageSource, "image");
        if (body.strength !== undefined) {
          upstreamBody.strength = body.strength;
          appendOptionalFormValue(formData, "strength", body.strength);
        }
      } else {
        upstreamBody.mode = "text-to-image";
        appendOptionalFormValue(formData, "mode", "text-to-image");
      }

      if (!model.startsWith("sd3.5") || !imageUrl) {
        const aspectRatio = body.aspect_ratio || mapImageSize(body.size);
        upstreamBody.aspect_ratio = aspectRatio;
        appendOptionalFormValue(formData, "aspect_ratio", aspectRatio);
      }

      if (body.style_preset) {
        upstreamBody.style_preset = body.style_preset;
        appendOptionalFormValue(formData, "style_preset", body.style_preset);
      }
    } else {
      if (imageUrl) {
        const imageSource = await resolveImageSource(imageUrl);
        upstreamBody.image = imageSource.base64;
        appendImageFormValue(formData, "image", imageSource, "image");
      }

      if (maskUrl && shouldIncludeStabilityMask(model)) {
        const maskSource = await resolveImageSource(maskUrl);
        upstreamBody.mask = maskSource.base64;
        appendImageFormValue(formData, "mask", maskSource, "mask");
      }

      if (body.search_prompt) {
        upstreamBody.search_prompt = body.search_prompt;
        appendOptionalFormValue(formData, "search_prompt", body.search_prompt);
      }
      if (body.grow_mask !== undefined) {
        upstreamBody.grow_mask = body.grow_mask;
        appendOptionalFormValue(formData, "grow_mask", body.grow_mask);
      }
      if (body.control_strength !== undefined) {
        upstreamBody.control_strength = body.control_strength;
        appendOptionalFormValue(formData, "control_strength", body.control_strength);
      }
      if (body.creativity !== undefined) {
        upstreamBody.creativity = body.creativity;
        appendOptionalFormValue(formData, "creativity", body.creativity);
      }
      if (body.left !== undefined) {
        upstreamBody.left = body.left;
        appendOptionalFormValue(formData, "left", body.left);
      }
      if (body.right !== undefined) {
        upstreamBody.right = body.right;
        appendOptionalFormValue(formData, "right", body.right);
      }
      if (body.up !== undefined) {
        upstreamBody.up = body.up;
        appendOptionalFormValue(formData, "up", body.up);
      }
      if (body.down !== undefined) {
        upstreamBody.down = body.down;
        appendOptionalFormValue(formData, "down", body.down);
      }
      if (body.style_preset) {
        upstreamBody.style_preset = body.style_preset;
        appendOptionalFormValue(formData, "style_preset", body.style_preset);
      }

      if (STABILITY_CONTROL_MODELS.has(model) && !upstreamBody.prompt) {
        upstreamBody.prompt = body.prompt || "";
        appendOptionalFormValue(formData, "prompt", body.prompt || "");
      }
    }

    if (log) {
      const promptPreview = String(body.prompt ?? "").slice(0, 60);
      log.info("IMAGE", `${provider}/${model} (stability-ai) | prompt: "${promptPreview}..."`);
    }

    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

    const contentType = response.headers.get("content-type") || "";
    let payload;
    if (contentType.includes("application/json")) {
      payload = await response.json();
    } else {
      const buffer = Buffer.from(await response.arrayBuffer());
      payload = { image: buffer.toString("base64") };
    }

    const images = await normalizeProviderImagePayload(payload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: payload?.created,
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



function shouldIncludeStabilityMask(model) {
  return new Set([
    "inpaint",
    "erase",
    "search-and-replace",
    "search-and-recolor",
    "replace-background-and-relight",
  ]).has(model);
}

