import { randomUUID } from "crypto";

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

import { saveCallLog } from "@/lib/usageDb";

import { sleep } from "../../utils/sleep.ts";

import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../../utils/comfyuiClient.ts";

import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";
import { normalizeProviderImagePayload, extractImageInputs, resolveImageSource, parseSizeToDimensions, inferResolutionFromSize, normalizePositiveNumber } from "./utils.ts";



export async function handleRecraftImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
  const upstreamBody: Record<string, unknown> = {
    model,
    prompt: body.prompt,
  };

  if (body.n !== undefined) upstreamBody.n = body.n;
  if (body.size !== undefined) upstreamBody.size = body.size;
  if (body.response_format !== undefined) upstreamBody.response_format = body.response_format;
  if (body.style !== undefined) upstreamBody.style = body.style;

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (recraft) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(
      `${providerConfig.baseUrl.replace(/\/$/, "")}/v1/images/generations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(upstreamBody),
      }
    );

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



export async function handleTopazImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;
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



export function normalizeRecraftStyle(style) {
  if (style === "vivid") return "digital_illustration";
  if (style === "natural") return "realistic_image";
  return style;
}



/**
 * Handle Hyperbolic image generation
 * Uses { model_name, prompt, height, width } and returns { images: [{ image: base64 }] }
 */
export async function handleHyperbolicImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;

  const [width, height] = (body.size || "1024x1024").split("x").map(Number);

  const upstreamBody = {
    model_name: model,
    prompt: body.prompt,
    height: height || 1024,
    width: width || 1024,
    backend: "auto",
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (hyperbolic) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // Transform { images: [{ image: base64 }] } → OpenAI format
    const images = (data.images || []).map((img) => ({
      b64_json: img.image,
      revised_prompt: body.prompt,
    }));

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
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



/**
 * Handle NanoBanana image generation
 * NanoBanana is async (submit task -> poll status -> return final image URL/base64)
 */
export async function handleNanoBananaImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;

  // Route to pro URL for "nanobanana-pro" model
  const isPro = model === "nanobanana-pro";
  const submitUrl = isPro && providerConfig.proUrl ? providerConfig.proUrl : providerConfig.baseUrl;
  const statusUrl = providerConfig.statusUrl;

  const aspectRatio =
    typeof body.aspectRatio === "string"
      ? body.aspectRatio
      : typeof body.aspect_ratio === "string"
        ? body.aspect_ratio
        : mapImageSize(body.size);

  let resolution =
    typeof body.resolution === "string"
      ? body.resolution
      : inferResolutionFromSize(body.size) || "1K";
  if (body.quality === "hd" && resolution === "1K") {
    resolution = "2K";
  }

  const upstreamBody = isPro
    ? {
        prompt: body.prompt,
        resolution,
        aspectRatio,
        ...(Array.isArray(body.imageUrls) ? { imageUrls: body.imageUrls } : {}),
      }
    : {
        prompt: body.prompt,
        type:
          Array.isArray(body.imageUrls) && body.imageUrls.length > 0
            ? "IMAGETOIAMGE"
            : "TEXTTOIAMGE",
        numImages: Number.isFinite(body.n) ? Math.max(1, Number(body.n)) : 1,
        image_size: aspectRatio,
        ...(Array.isArray(body.imageUrls) ? { imageUrls: body.imageUrls } : {}),
      };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "IMAGE",
      `${provider}/${model} (nanobanana ${isPro ? "pro" : "flash"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const submitResp = await fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!submitResp.ok) {
      const errorText = await submitResp.text();
      if (log) {
        log.error(
          "IMAGE",
          `${provider} submit error ${submitResp.status}: ${errorText.slice(0, 200)}`
        );
      }

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: submitResp.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: submitResp.status, error: errorText };
    }

    const submitData = await submitResp.json();

    // Backward compatibility: handle providers returning image payload synchronously
    const hasSyncPayload =
      Boolean(submitData?.image) ||
      Array.isArray(submitData?.images) ||
      Array.isArray(submitData?.data) ||
      Boolean(submitData?.data?.[0]?.url) ||
      Boolean(submitData?.data?.[0]?.b64_json);

    if (hasSyncPayload) {
      const syncResult = normalizeNanoBananaSyncPayload(submitData, body.prompt);
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 200,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        responseBody: { images_count: syncResult.data?.length || 0, mode: "sync" },
      }).catch(() => {});
      return {
        success: true,
        data: { created: Math.floor(Date.now() / 1000), data: syncResult.data },
      };
    }

    const taskId = submitData?.data?.taskId || submitData?.taskId;
    if (!taskId) {
      const errorText = `NanoBanana submit did not return taskId: ${JSON.stringify(submitData).slice(0, 400)}`;
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText,
      }).catch(() => {});
      return { success: false, status: 502, error: errorText };
    }

    if (!statusUrl) {
      const errorText = "NanoBanana statusUrl is not configured";
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 500,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText,
      }).catch(() => {});
      return { success: false, status: 500, error: errorText };
    }

    const timeoutMs = normalizePositiveNumber(
      body.timeout_ms,
      normalizePositiveNumber(process.env.NANOBANANA_POLL_TIMEOUT_MS, 120000)
    );
    const pollIntervalMs = normalizePositiveNumber(
      body.poll_interval_ms,
      normalizePositiveNumber(process.env.NANOBANANA_POLL_INTERVAL_MS, 2500)
    );

    let lastTaskData = null;
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const pollResp = await fetch(`${statusUrl}?taskId=${encodeURIComponent(taskId)}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!pollResp.ok) {
        const errorText = await pollResp.text();
        if (log) {
          log.error(
            "IMAGE",
            `${provider} poll error ${pollResp.status}: ${errorText.slice(0, 200)}`
          );
        }
        return { success: false, status: pollResp.status, error: errorText };
      }

      const pollData = await pollResp.json();
      const taskData = pollData?.data || pollData;
      lastTaskData = taskData;

      const successFlag = Number(taskData?.successFlag);
      if (successFlag === 1) {
        const normalized = await normalizeNanoBananaTaskResult(taskData, body, log);

        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          responseBody: { images_count: normalized.length, mode: "async", taskId },
        }).catch(() => {});

        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: normalized,
          },
        };
      }

      if (successFlag === 2 || successFlag === 3) {
        const errorText =
          taskData?.errorMessage || `NanoBanana task failed (successFlag=${String(successFlag)})`;

        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: errorText.slice(0, 500),
          responseBody: { taskId, successFlag, errorCode: taskData?.errorCode ?? null },
        }).catch(() => {});

        return { success: false, status: 502, error: errorText };
      }

      await sleep(pollIntervalMs);
    }

    const timeoutError = `NanoBanana task timeout after ${timeoutMs}ms (taskId=${taskId}, successFlag=${String(lastTaskData?.successFlag ?? "unknown")})`;
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: timeoutError,
      responseBody: { taskId, lastSuccessFlag: lastTaskData?.successFlag ?? null },
    }).catch(() => {});

    return { success: false, status: 504, error: timeoutError };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
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



function normalizeNanoBananaSyncPayload(data, prompt) {
  const images = [];

  if (data.image) {
    images.push({ b64_json: data.image, revised_prompt: prompt });
  } else if (Array.isArray(data.images)) {
    for (const img of data.images) {
      images.push({
        b64_json: typeof img === "string" ? img : img?.image || img?.data,
        revised_prompt: prompt,
      });
    }
  } else if (Array.isArray(data.data)) {
    for (const img of data.data) {
      if (!img) continue;
      images.push(img);
    }
  }

  return { data: images.filter(Boolean) };
}



async function normalizeNanoBananaTaskResult(taskData, body, log) {
  const response = taskData?.response || {};

  const urlCandidates = [
    response?.resultImageUrl,
    response?.originImageUrl,
    taskData?.resultImageUrl,
    taskData?.originImageUrl,
  ].filter((v) => typeof v === "string" && v.length > 0);

  if (Array.isArray(response?.resultImageUrls)) {
    for (const u of response.resultImageUrls) {
      if (typeof u === "string" && u.length > 0) urlCandidates.push(u);
    }
  }

  const b64Candidates = [
    response?.resultImageBase64,
    response?.resultImage,
    taskData?.resultImageBase64,
    taskData?.resultImage,
  ].filter((v) => typeof v === "string" && v.length > 0);

  if (Array.isArray(response?.resultImageBase64List)) {
    for (const b64 of response.resultImageBase64List) {
      if (typeof b64 === "string" && b64.length > 0) b64Candidates.push(b64);
    }
  }

  const wantsBase64 = body.response_format === "b64_json";

  if (wantsBase64) {
    if (b64Candidates.length > 0) {
      return b64Candidates.map((b64) => ({ b64_json: b64, revised_prompt: body.prompt }));
    }

    if (urlCandidates.length > 0) {
      const firstUrl = urlCandidates[0];
      const remoteImage = await fetchRemoteImage(firstUrl);
      const base64 = remoteImage.buffer.toString("base64");
      return [{ b64_json: base64, revised_prompt: body.prompt }];
    }
  }

  if (urlCandidates.length > 0) {
    return urlCandidates.map((url) => ({ url, revised_prompt: body.prompt }));
  }

  if (b64Candidates.length > 0) {
    return b64Candidates.map((b64) => ({ b64_json: b64, revised_prompt: body.prompt }));
  }

  if (log) {
    log.warn(
      "IMAGE",
      `NanoBanana task completed without image payload: ${JSON.stringify(taskData).slice(0, 240)}`
    );
  }

  return [];
}



/**
 * Handle SD WebUI image generation (local, no auth)
 * POST {baseUrl} with { prompt, negative_prompt, width, height, steps }
 * Response: { images: ["base64..."] }
 */
export async function handleSDWebUIImageGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "512x512").split("x").map(Number);

  const upstreamBody = {
    prompt: body.prompt,
    negative_prompt: body.negative_prompt || "",
    width: width || 512,
    height: height || 512,
    steps: body.steps || 20,
    cfg_scale: body.cfg_scale || 7,
    sampler_name: body.sampler || "Euler a",
    batch_size: body.n || 1,
    override_settings: {
      sd_model_checkpoint: model,
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (sdwebui) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // SD WebUI returns { images: ["base64...", ...] }
    const images = (data.images || []).map((b64) => ({
      b64_json: b64,
      revised_prompt: body.prompt,
    }));

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} sdwebui error: ${err.message}`);
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



/**
 * Handle ComfyUI image generation (local, no auth)
 * Submits a txt2img workflow, polls for completion, fetches output
 */
export async function handleComfyUIImageGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "1024x1024").split("x").map(Number);

  // Default txt2img workflow template for ComfyUI
  const workflow = {
    "3": {
      class_type: "KSampler",
      inputs: {
        seed: parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % 2 ** 32,
        steps: body.steps || 20,
        cfg: body.cfg_scale || 7,
        sampler_name: "euler",
        scheduler: "normal",
        denoise: 1,
        model: ["4", 0],
        positive: ["6", 0],
        negative: ["7", 0],
        latent_image: ["5", 0],
      },
    },
    "4": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: model },
    },
    "5": {
      class_type: "EmptyLatentImage",
      inputs: { width: width || 1024, height: height || 1024, batch_size: body.n || 1 },
    },
    "6": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.prompt, clip: ["4", 1] },
    },
    "7": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.negative_prompt || "", clip: ["4", 1] },
    },
    "8": {
      class_type: "VAEDecode",
      inputs: { samples: ["3", 0], vae: ["4", 2] },
    },
    "9": {
      class_type: "SaveImage",
      inputs: { filename_prefix: "omniroute", images: ["8", 0] },
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (comfyui) | prompt: "${promptPreview}..."`);
  }

  try {
    const promptId = await submitComfyWorkflow(providerConfig.baseUrl, workflow);
    const historyEntry = await pollComfyResult(providerConfig.baseUrl, promptId);
    const outputFiles = extractComfyOutputFiles(historyEntry);

    const images = [];
    for (const file of outputFiles) {
      const buffer = await fetchComfyOutput(
        providerConfig.baseUrl,
        file.filename,
        file.subfolder,
        file.type
      );
      const base64 = Buffer.from(buffer).toString("base64");
      images.push({ b64_json: base64, revised_prompt: body.prompt });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} comfyui error: ${err.message}`);
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



export async function handleHaiperImageGeneration({
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
    log.info("IMAGE", `${provider}/${model} (haiper) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", HAIPER_KEY: token },
      body: JSON.stringify({ prompt, aspect_ratio: body.aspect_ratio || "16:9" }),
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
    const { job_id } = await res.json();
    const deadline = Date.now() + 300000;
    while (Date.now() < deadline) {
      await sleep(5000);
      const statusRes = await fetch(`${providerConfig.statusUrl}/${job_id}`, {
        headers: { HAIPER_KEY: token },
      });
      const status = await statusRes.json();
      if (status.status === "completed" || status.status === "succeeded") {
        const imgUrl = status.creation_url || status.output?.image_url;
        if (imgUrl) {
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
      }
      if (status.status === "failed") {
        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: "Haiper image generation failed",
        }).catch(() => {});
        return { success: false, status: 502, error: "Haiper image generation failed" };
      }
    }
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "Haiper image generation timed out",
    }).catch(() => {});
    return { success: false, status: 504, error: "Haiper image generation timed out" };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} haiper error: ${err.message}`);
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



export async function handleLeonardoImageGeneration({
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
    log.info("IMAGE", `${provider}/${model} (leonardo) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        modelId: model || "phoenix",
        prompt,
        width: body.width || 1024,
        height: body.height || 1024,
        num_images: 1,
      }),
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
    const { sdGenerationJob } = await res.json();
    const genId = sdGenerationJob?.generationId;
    if (!genId) {
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "No generation ID returned",
      }).catch(() => {});
      return { success: false, status: 502, error: "No generation ID returned" };
    }
    const deadline = Date.now() + 300000;
    while (Date.now() < deadline) {
      await sleep(5000);
      const statusRes = await fetch(`${providerConfig.baseUrl}/${genId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const status = await statusRes.json();
      const gen = status.generations_by_pk || status;
      if (gen.status === "COMPLETE") {
        const imgUrl = gen.generated_images?.[0]?.url;
        if (imgUrl) {
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
      }
      if (gen.status === "FAILED") {
        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: "Leonardo image generation failed",
        }).catch(() => {});
        return { success: false, status: 502, error: "Leonardo image generation failed" };
      }
    }
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "Leonardo image generation timed out",
    }).catch(() => {});
    return { success: false, status: 504, error: "Leonardo image generation timed out" };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} leonardo error: ${err.message}`);
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

