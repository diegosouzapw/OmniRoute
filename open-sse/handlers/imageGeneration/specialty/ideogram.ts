/**
 * Ideogram image generation provider.
 */

import { getImageProvider, parseImageModel } from "../../../config/imageRegistry.ts";
import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../logging.ts";
import { normalizeProviderImagePayload, extractImageInputs, resolveImageSource } from "../utils.ts";

export async function handleIdeogramImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  if (log) {
    log.info("IMAGE", `${provider}/${model} (ideogram) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Api-Key": token },
      body: JSON.stringify({ prompt, aspect_ratio: "ASPECT_16_9", model: model || "V_3" }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: res.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: res.status, error: errorText };
    }
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      const imgUrl = data.data[0].url;
      const imgRes = await fetch(imgUrl);
      if (!imgRes.ok) {
        return {
          success: false,
          status: imgRes.status,
          error: `Failed to download image: ${imgRes.status}`,
        };
      }
      const buf = await imgRes.arrayBuffer();
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 200,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
      }).catch(() => {});
      return {
        success: true,
        data: {
          created: Math.floor(Date.now() / 1000),
          data: [{ b64_json: Buffer.from(buf).toString("base64") }],
        },
      };
    }
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "No images returned from Ideogram",
    }).catch(() => {});
    return { success: false, status: 502, error: "No images returned from Ideogram" };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} ideogram error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}
