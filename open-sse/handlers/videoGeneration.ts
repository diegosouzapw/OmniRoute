/**
 * Video Generation Handler
 *
 * Handles POST /v1/videos/generations requests.
 * Proxies to upstream video generation providers.
 *
 * Supported provider formats:
 * - ComfyUI: submit AnimateDiff/SVD workflow → poll → fetch video
 * - SD WebUI: POST to AnimateDiff extension endpoint
 * - RunwayML: submit async task → poll → fetch output video
 *
 * Response format (OpenAI-like):
 * {
 *   "created": 1234567890,
 *   "data": [{ "b64_json": "...", "format": "mp4" }]
 * }
 */

import { getVideoProvider, parseVideoModel } from "../config/videoRegistry.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { saveCallLog } from "@/lib/usageDb";

const RUNWAYML_API_VERSION = "2024-11-06";
const RUNWAYML_POLL_INTERVAL_MS = 2000;
const RUNWAYML_POLL_TIMEOUT_MS = 180000;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeRunwayRatio(size) {
  if (typeof size !== "string" || !size.includes("x")) return null;
  const [width, height] = size.split("x").map((part) => part.trim());
  if (!width || !height) return null;
  return `${width}:${height}`;
}

function normalizeRunwayDuration(seconds) {
  if (seconds === undefined || seconds === null) return null;
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value);
}

function extractRunwayOutputUrl(task) {
  const output = task?.output;
  if (Array.isArray(output)) {
    return typeof output[0] === "string" ? output[0] : null;
  }
  return typeof output === "string" ? output : null;
}

function getRunwayHeaders(credentials) {
  const key = credentials?.apiKey || credentials?.accessToken;
  if (!key) return null;
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "X-Runway-Version": RUNWAYML_API_VERSION,
  };
}

/**
 * Handle video generation request
 */
export async function handleVideoGeneration({ body, credentials, log }) {
  const { provider, model } = parseVideoModel(body.model);

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid video model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getVideoProvider(provider);
  if (!providerConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown video provider: ${provider}`,
    };
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIVideoGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "sdwebui-video") {
    return handleSDWebUIVideoGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "runwayml") {
    return handleRunwayMLVideoGeneration({
      model,
      provider,
      providerConfig,
      body,
      credentials,
      log,
    });
  }

  return {
    success: false,
    status: 400,
    error: `Unsupported video format: ${providerConfig.format}`,
  };
}

/**
 * Handle ComfyUI video generation
 * Submits an AnimateDiff or SVD workflow, polls for completion, fetches output video
 */
async function handleComfyUIVideoGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "512x512").split("x").map(Number);
  const frames = body.frames || 16;

  // AnimateDiff workflow template
  const workflow = {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: model },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.prompt, clip: ["1", 1] },
    },
    "3": {
      class_type: "CLIPTextEncode",
      inputs: { text: body.negative_prompt || "", clip: ["1", 1] },
    },
    "4": {
      class_type: "EmptyLatentImage",
      inputs: { width: width || 512, height: height || 512, batch_size: frames },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed: Math.floor(Math.random() * 2 ** 32),
        steps: body.steps || 20,
        cfg: body.cfg_scale || 7,
        sampler_name: "euler",
        scheduler: "normal",
        denoise: 1,
        model: ["1", 0],
        positive: ["2", 0],
        negative: ["3", 0],
        latent_image: ["4", 0],
      },
    },
    "6": {
      class_type: "VAEDecode",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveAnimatedWEBP",
      inputs: {
        filename_prefix: "omniroute_video",
        fps: body.fps || 8,
        lossless: false,
        quality: 80,
        method: "default",
        images: ["6", 0],
      },
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "VIDEO",
      `${provider}/${model} (comfyui) | prompt: "${promptPreview}..." | frames: ${frames}`
    );
  }

  try {
    const promptId = await submitComfyWorkflow(providerConfig.baseUrl, workflow);
    const historyEntry = await pollComfyResult(providerConfig.baseUrl, promptId, 300_000);
    const outputFiles = extractComfyOutputFiles(historyEntry);

    const videos = [];
    for (const file of outputFiles) {
      const buffer = await fetchComfyOutput(
        providerConfig.baseUrl,
        file.filename,
        file.subfolder,
        file.type
      );
      const base64 = Buffer.from(buffer).toString("base64");
      videos.push({ b64_json: base64, format: "webp" });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { videos_count: videos.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: videos },
    };
  } catch (err) {
    if (log) log.error("VIDEO", `${provider} comfyui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Video provider error: ${err.message}` };
  }
}

/**
 * Handle SD WebUI video generation via AnimateDiff extension
 * POST to the AnimateDiff API endpoint
 */
async function handleSDWebUIVideoGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const [width, height] = (body.size || "512x512").split("x").map(Number);
  const url = `${providerConfig.baseUrl}/animatediff/v1/generate`;

  const upstreamBody = {
    prompt: body.prompt,
    negative_prompt: body.negative_prompt || "",
    width: width || 512,
    height: height || 512,
    steps: body.steps || 20,
    cfg_scale: body.cfg_scale || 7,
    frames: body.frames || 16,
    fps: body.fps || 8,
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("VIDEO", `${provider}/${model} (sdwebui) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("VIDEO", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // SD WebUI AnimateDiff returns { video: "base64..." } or { images: [...] }
    const videos = [];
    if (data.video) {
      videos.push({ b64_json: data.video, format: "mp4" });
    } else if (data.images) {
      for (const img of data.images) {
        videos.push({ b64_json: typeof img === "string" ? img : img.image, format: "mp4" });
      }
    }

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { videos_count: videos.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: videos },
    };
  } catch (err) {
    if (log) log.error("VIDEO", `${provider} sdwebui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Video provider error: ${err.message}` };
  }
}

async function handleRunwayMLVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const headers = getRunwayHeaders(credentials);

  if (!headers) {
    return {
      success: false,
      status: 400,
      error: "RunwayML requires an API key or access token",
    };
  }

  const submitUrl = `${providerConfig.baseUrl}/${body.input_reference ? "image_to_video" : "text_to_video"}`;
  const ratio = normalizeRunwayRatio(body.size);
  const duration = normalizeRunwayDuration(body.seconds);
  const upstreamBody = {
    model,
    promptText: body.prompt,
    ...(body.input_reference ? { promptImage: body.input_reference } : {}),
    ...(ratio ? { ratio } : {}),
    ...(duration ? { duration } : {}),
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("VIDEO", `${provider}/${model} (runwayml) | prompt: "${promptPreview}..."`);
  }

  try {
    const submitResponse = await fetch(submitUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(upstreamBody),
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      if (log) {
        log.error(
          "VIDEO",
          `${provider} error ${submitResponse.status}: ${errorText.slice(0, 200)}`
        );
      }
      return { success: false, status: submitResponse.status, error: errorText };
    }

    let task = await submitResponse.json();
    const taskId = typeof task?.id === "string" ? task.id : null;
    if (!taskId) {
      return {
        success: false,
        status: 502,
        error: "RunwayML returned a task response without an id",
      };
    }

    while (true) {
      const status = String(task?.status || "").toUpperCase();
      if (status === "SUCCEEDED") break;
      if (status === "FAILED" || status === "CANCELLED") {
        const failure = task?.failure || task?.failureCode || "Video generation failed";
        return {
          success: false,
          status: 502,
          error: `RunwayML task failed: ${failure}`,
        };
      }

      if (Date.now() - startTime > RUNWAYML_POLL_TIMEOUT_MS) {
        return {
          success: false,
          status: 504,
          error: `RunwayML task timed out after ${RUNWAYML_POLL_TIMEOUT_MS}ms`,
        };
      }

      await wait(RUNWAYML_POLL_INTERVAL_MS);

      const pollResponse = await fetch(`${providerConfig.baseUrl}/tasks/${taskId}`, {
        method: "GET",
        headers,
      });

      if (!pollResponse.ok) {
        const errorText = await pollResponse.text();
        return {
          success: false,
          status: pollResponse.status,
          error: `RunwayML task poll failed: ${errorText}`,
        };
      }

      task = await pollResponse.json();
    }

    const outputUrl = extractRunwayOutputUrl(task);
    if (!outputUrl) {
      return {
        success: false,
        status: 502,
        error: "RunwayML task completed without an output URL",
      };
    }

    const outputResponse = await fetch(outputUrl);
    if (!outputResponse.ok) {
      return {
        success: false,
        status: 502,
        error: `RunwayML fetch output failed (${outputResponse.status})`,
      };
    }

    const outputBuffer = Buffer.from(await outputResponse.arrayBuffer());
    const videos = [{ b64_json: outputBuffer.toString("base64"), format: "mp4" }];

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { videos_count: videos.length, taskId },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: videos },
    };
  } catch (err) {
    if (log) log.error("VIDEO", `${provider} runwayml error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Video provider error: ${err.message}` };
  }
}
