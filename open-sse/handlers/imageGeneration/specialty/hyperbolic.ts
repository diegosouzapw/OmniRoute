/**
 * Hyperbolic image generation provider.
 */

import { getImageProvider, parseImageModel } from "../../../config/imageRegistry.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../logging.ts";
import { normalizeProviderImagePayload, extractImageInputs, resolveImageSource } from "../utils.ts";

export async function handleHyperbolicImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;

  const { width, height } = extractImageInputs(body);
  const upstreamBody = {
    model_name: model,
    prompt: body.prompt,
    height,
    width,
    num_images: body.n || 1,
  };

  const hyperbolicConfig = getImageProvider("hyperbolic");
  const baseUrl = providerConfig?.baseUrl || hyperbolicConfig?.baseUrl || "https://api.hyperbolic.xyz";
  const url = `${baseUrl.replace(/\/+$/, "")}/v1/image/generation`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(upstreamBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    const elapsed = Date.now() - startTime;
    const sanitizedError = sanitizeErrorMessage(errorText);
    log?.error?.(`[Hyperbolic] Image generation failed: ${sanitizedError}`, { elapsed });
    await saveImageErrorResult({
      provider: "hyperbolic",
      model,
      error: sanitizedError,
      elapsed,
      traceId: log?.traceId,
      requestId: log?.requestId,
    });
    throw new Error(`Hyperbolic API error ${response.status}: ${sanitizedError}`);
  }

  const data = await response.json();
  const elapsed = Date.now() - startTime;

  const imageData = data.images?.[0] || data.data?.[0];
  if (!imageData) {
    throw new Error("No image data in Hyperbolic response");
  }

  const result: Record<string, unknown> = {};
  if (imageData.image) {
    result.b64_json = imageData.image;
  } else if (imageData.b64_json) {
    result.b64_json = imageData.b64_json;
  } else if (imageData.url) {
    result.url = imageData.url;
  }

  const size = body.size || "1024x1024";
  await saveCallLog({
    model: `hyperbolic:${model}`,
    provider: "hyperbolic",
    elapsed,
    traceId: log?.traceId,
    requestId: log?.requestId,
    prompt: body.prompt,
    size,
  });

  await saveImageSuccessResult({
    provider: "hyperbolic",
    model,
    elapsed,
    traceId: log?.traceId,
    requestId: log?.requestId,
    size,
  });

  return {
    created: Math.floor(Date.now() / 1000),
    data: [result],
  };
}
