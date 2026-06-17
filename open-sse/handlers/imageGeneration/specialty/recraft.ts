/**
 * Recraft image generation provider.
 */

import { getImageProvider, parseImageModel } from "../../../config/imageRegistry.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../logging.ts";
import { normalizeProviderImagePayload, extractImageInputs, resolveImageSource } from "../utils.ts";

export async function handleRecraftImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt: body.prompt,
  };

  if (body.n !== undefined) upstreamBody.n = body.n;
  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;

  const recraftStyle = normalizeRecraftStyle(body.style);
  if (recraftStyle !== undefined) upstreamBody.style = recraftStyle;

  const recraftConfig = getImageProvider("recraft");
  const baseUrl = providerConfig?.baseUrl || recraftConfig?.baseUrl || "https://api.recraft.ai";
  const url = `${baseUrl.replace(/\/+$/, "")}/v1/images/generations`;

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
    log?.error?.(`[Recraft] Image generation failed: ${sanitizedError}`, { elapsed });
    await saveImageErrorResult({
      provider: "recraft",
      model,
      error: sanitizedError,
      elapsed,
      traceId: log?.traceId,
      requestId: log?.requestId,
    });
    throw new Error(`Recraft API error ${response.status}: ${sanitizedError}`);
  }

  const data = await response.json();
  const elapsed = Date.now() - startTime;

  const imageData = data.data?.[0];
  if (!imageData) {
    throw new Error("No image data in Recraft response");
  }

  const result: Record<string, unknown> = {};
  if (imageData.b64_json) {
    result.b64_json = imageData.b64_json;
  } else if (imageData.url) {
    result.url = imageData.url;
  }

  const size = body.size || "1024x1024";
  await saveCallLog({
    model: `recraft:${model}`,
    provider: "recraft",
    elapsed,
    traceId: log?.traceId,
    requestId: log?.requestId,
    prompt: body.prompt,
    size,
  });

  await saveImageSuccessResult({
    provider: "recraft",
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

export function normalizeRecraftStyle(style) {
  if (!style) return undefined;
  if (typeof style === "string") {
    const normalized = style.toLowerCase().trim();
    const validStyles = [
      "realistic_image",
      "digital_illustration",
      "vector_illustration",
      "sketch",
      "painting",
    ];
    if (validStyles.includes(normalized)) return normalized;
    return normalized.replace(/\s+/g, "_");
  }
  return style;
}
