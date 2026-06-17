/**
 * Topaz image generation provider.
 */

import { getImageProvider, parseImageModel } from "../../../config/imageRegistry.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../logging.ts";
import { extractImageInputs, resolveImageSource, parseSizeToDimensions } from "../utils.ts";

export async function handleTopazImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  const { imageUrl } = extractImageInputs(body);

  if (!imageUrl) {
    return {
      success: false,
      status: 400,
      error: `Topaz model ${model} requires an input image`,
    };
  }

  try {
    const imageSource = await resolveImageSource(imageUrl);
    const formData = new FormData();
    const blob = new Blob([imageSource.buffer], { type: imageSource.contentType || "image/png" });
    formData.append("image", blob, "image.png");

    if (typeof body.size === "string" && body.size.includes("x")) {
      const { width, height } = parseSizeToDimensions(body.size, 1024);
      formData.append("output_width", String(width));
      formData.append("output_height", String(height));
    }

    if (log) {
      const promptPreview = String(body.prompt ?? "enhance image").slice(0, 60);
      log.info("IMAGE", `${provider}/${model} (topaz) | prompt: "${promptPreview}..."`);
    }

    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/image/v1/enhance`, {
      method: "POST",
      headers: {
        Accept: "image/jpeg",
        "X-API-Key": token,
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
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());
    const base64 = buffer.toString("base64");
    const wantsBase64 = body.response_format === "b64_json";
    const images = [
      wantsBase64
        ? { b64_json: base64, revised_prompt: body.prompt }
        : { url: `data:${contentType};base64,${base64}`, revised_prompt: body.prompt },
    ];

    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      responseBody: { images_count: images.length },
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
