/**
 * SD WebUI local image generation provider (no auth).
 */

import { getImageProvider, parseImageModel } from "../../../config/imageRegistry.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../logging.ts";
import { extractImageInputs, resolveImageSource } from "../utils.ts";

export async function handleSDWebUIImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();

  const { width, height } = extractImageInputs(body);
  const upstreamBody = {
    prompt: body.prompt,
    negative_prompt: body.negative_prompt || "",
    width,
    height,
    steps: body.steps || 30,
    sampler_name: body.sampler_name || "Euler a",
    cfg_scale: body.cfg_scale || 7,
    batch_size: body.n || 1,
  };

  const sdConfig = getImageProvider("sdwebui");
  const baseUrl = providerConfig?.baseUrl || sdConfig?.baseUrl || "http://localhost:7860";
  const url = `${baseUrl.replace(/\/+$/, "")}/sdapi/v1/txt2img`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(upstreamBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    const elapsed = Date.now() - startTime;
    const sanitizedError = sanitizeErrorMessage(errorText);
    log?.error?.(`[SDWebUI] Image generation failed: ${sanitizedError}`, { elapsed });
    await saveImageErrorResult({
      provider: "sdwebui",
      model,
      error: sanitizedError,
      elapsed,
      traceId: log?.traceId,
      requestId: log?.requestId,
    });
    throw new Error(`SDWebUI API error ${response.status}: ${sanitizedError}`);
  }

  const data = await response.json();
  const elapsed = Date.now() - startTime;

  const images = data.images || [];
  if (!images.length) {
    throw new Error("No images in SDWebUI response");
  }

  const responseData = images.map((img: string) => ({ b64_json: img }));
  const size = body.size || `${width}x${height}`;

  await saveCallLog({
    model: `sdwebui:${model}`,
    provider: "sdwebui",
    elapsed,
    traceId: log?.traceId,
    requestId: log?.requestId,
    prompt: body.prompt,
    size,
  });

  await saveImageSuccessResult({
    provider: "sdwebui",
    model,
    elapsed,
    traceId: log?.traceId,
    requestId: log?.requestId,
    size,
  });

  return {
    created: Math.floor(Date.now() / 1000),
    data: responseData,
  };
}
