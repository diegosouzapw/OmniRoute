
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

import { sleep } from "../../utils/sleep.ts";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { extractImageInputs, normalizeRequestedImageFormat, resolveImageSource, isHttpUrl, parseSizeToDimensions, normalizeProviderImagePayload, normalizePositiveNumber } from "./utils.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";



const BFL_MODEL_ENDPOINTS = {
  "flux-2-max": "/v1/flux-2-max",
  "flux-2-pro": "/v1/flux-2-pro",
  "flux-2-flex": "/v1/flux-2-flex",
  "flux-2-klein-9b": "/v1/flux-2-klein-9b",
  "flux-2-klein-4b": "/v1/flux-2-klein-4b",
  "flux-kontext-pro": "/v1/flux-kontext-pro",
  "flux-kontext-max": "/v1/flux-kontext-max",
  "flux-pro-1.1": "/v1/flux-pro-1.1",
  "flux-pro-1.1-ultra": "/v1/flux-pro-1.1-ultra",
  "flux-dev": "/v1/flux-dev",
  "flux-pro": "/v1/flux-pro",
};



const BFL_EDIT_MODELS = new Set([
  "flux-2-max",
  "flux-2-pro",
  "flux-2-flex",
  "flux-kontext-pro",
  "flux-kontext-max",
]);



const BFL_FAILURE_STATUSES = new Set(["Error", "Failed", "Content Moderated", "Request Moderated"]);



export async function handleBlackForestLabsImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const endpoint = BFL_MODEL_ENDPOINTS[model];

  if (!endpoint) {
    return {
      success: false,
      status: 400,
      error: `Unsupported Black Forest Labs image model: ${model}`,
    };
  }

  const { imageUrl, maskUrl } = extractImageInputs(body);
  const upstreamBody: Record<string, unknown> = {
    prompt: body.prompt,
    output_format: normalizeRequestedImageFormat(body, "png"),
  };

  try {
    if (BFL_EDIT_MODELS.has(model) && imageUrl) {
      upstreamBody.input_image = (await resolveImageSource(imageUrl)).base64;
    } else if (imageUrl && isHttpUrl(imageUrl)) {
      upstreamBody.image_url = imageUrl;
    }

    if (maskUrl && (model === "flux-pro-1.0-fill" || model === "flux-kontext-pro")) {
      upstreamBody.mask = (await resolveImageSource(maskUrl)).base64;
    }

    if (model === "flux-kontext-pro" || model === "flux-kontext-max") {
      upstreamBody.aspect_ratio = body.aspect_ratio || mapImageSize(body.size);
    } else if (typeof body.size === "string" && body.size.includes("x")) {
      const { width, height } = parseSizeToDimensions(body.size, 1024);
      upstreamBody.width = width;
      upstreamBody.height = height;
    }

    if (body.seed !== undefined) upstreamBody.seed = body.seed;
    if (body.n !== undefined && model.includes("ultra"))
      upstreamBody.num_images = Number(body.n) || 1;
    if (body.quality === "hd" && model.includes("ultra")) upstreamBody.raw = true;
    if (body.left !== undefined) upstreamBody.left = body.left;
    if (body.right !== undefined) upstreamBody.right = body.right;
    if (body.top !== undefined) upstreamBody.top = body.top;
    if (body.bottom !== undefined) upstreamBody.bottom = body.bottom;
    if (body.steps !== undefined) upstreamBody.steps = body.steps;
    if (body.guidance !== undefined) upstreamBody.guidance = body.guidance;
    if (body.grow_mask !== undefined) upstreamBody.grow_mask = body.grow_mask;
    if (body.safety_tolerance !== undefined) upstreamBody.safety_tolerance = body.safety_tolerance;

    if (log) {
      const promptPreview = String(body.prompt ?? "").slice(0, 60);
      log.info("IMAGE", `${provider}/${model} (black-forest-labs) | prompt: "${promptPreview}..."`);
    }

    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-key": token,
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

    const initialPayload = await response.json();
    const finalPayload = initialPayload.polling_url
      ? await pollBlackForestLabsResult({
          pollingUrl: initialPayload.polling_url,
          token,
          body,
          log,
        })
      : initialPayload;

    const images = await normalizeProviderImagePayload(finalPayload, body, log);
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: images.length },
      created: finalPayload.created,
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



async function pollBlackForestLabsResult({ pollingUrl, token, body, log }) {
  const timeoutMs = normalizePositiveNumber(body.timeout_ms, 300000);
  const pollIntervalMs = normalizePositiveNumber(body.poll_interval_ms, 1500);
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const response = await fetch(pollingUrl, {
      method: "GET",
      headers: {
        "x-key": token,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`BFL polling failed (${response.status}): ${errorText}`);
    }

    const payload = await response.json();
    const status = payload?.status;

    if (status === "Ready") {
      return payload;
    }

    if (BFL_FAILURE_STATUSES.has(status)) {
      throw new Error(`BFL image generation failed: ${status}`);
    }

    if (log) {
      log.info("IMAGE", `black-forest-labs polling status: ${String(status || "Pending")}`);
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(`BFL polling timed out after ${timeoutMs}ms`);
}

