import { sanitizeErrorMessage } from "../../../utils/error.ts";

import {
  extractImageInputs,
  normalizeRequestedImageFormat,
  normalizeProviderImagePayload,
  saveImageSuccessResult,
  saveImageErrorResult,
  mapFalImageSize,
  mapFalAspectRatio,
  normalizeRecraftStyle,
} from "../shared.ts";
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
  const falModel = model.startsWith("fal-ai/") ? model : `fal-ai/${model}`;
  const upstreamBody = prepareFalImageRequest(model, body);

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (fal-ai) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/${falModel}`, {
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
    const images = await normalizeProviderImagePayload(payload, body, log, "b64_json");
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

function prepareFalImageRequest(model, body) {
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

  applyFalImageOptions(model, body, upstreamBody);
  return upstreamBody;
}

function applyFalImageOptions(model, body, upstreamBody) {
  const { imageUrl, imageUrls } = extractImageInputs(body);
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
}
