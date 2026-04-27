/**
 * Video Generation Handler
 *
 * Handles POST /v1/videos/generations requests.
 * Proxies to upstream video generation providers.
 *
 * Supported provider formats:
 * - ComfyUI: submit AnimateDiff/SVD workflow → poll → fetch video
 * - SD WebUI: POST to AnimateDiff extension endpoint
 *
 * Response format (OpenAI-like):
 * {
 *   "created": 1234567890,
 *   "data": [{ "b64_json": "...", "format": "mp4" }]
 * }
 */

import { getVideoProvider, parseVideoModel } from "../config/videoRegistry.ts";
import {
  buildRunwayApiUrl,
  buildRunwayHeaders,
  RUNWAYML_IMAGE_REQUIRED_MODELS,
} from "../config/runway.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { saveCallLog } from "@/lib/usageDb";

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
    return handleRunwayVideoGeneration({ model, provider, providerConfig, body, credentials, log });
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

async function handleRunwayVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return { success: false, status: 400, error: "No credentials for Runway provider" };
  }

  const promptImage = resolveRunwayPromptImage(body);
  const useImageToVideo = Boolean(promptImage);
  if (!useImageToVideo && RUNWAYML_IMAGE_REQUIRED_MODELS.has(model)) {
    return {
      success: false,
      status: 400,
      error: `Runway model ${model} requires promptImage for image-to-video generation`,
    };
  }

  const ratio = resolveRunwayRatio(body);
  const duration = resolveRunwayDuration(body);
  const timeoutMs = resolvePositiveInteger(body.timeout_ms, 300000);
  const pollIntervalMs = resolvePositiveInteger(body.poll_interval_ms, 5000);
  const submitUrl = buildRunwayApiUrl(
    useImageToVideo ? "/image_to_video" : "/text_to_video",
    providerConfig.baseUrl
  );
  const headers = buildRunwayHeaders(token);

  const upstreamBody = {
    model,
    promptText: body.prompt,
    ratio,
    duration,
  };

  if (useImageToVideo) upstreamBody.promptImage = promptImage;
  if (typeof body.seed === "number" && Number.isFinite(body.seed)) {
    upstreamBody.seed = Math.max(0, Math.floor(body.seed));
  }

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "VIDEO",
      `${provider}/${model} (runway ${useImageToVideo ? "image_to_video" : "text_to_video"}) | prompt: "${promptPreview}..."`
    );
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
          `${provider} submit error ${submitResponse.status}: ${errorText.slice(0, 200)}`
        );
      }
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: submitResponse.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: submitResponse.status, error: errorText };
    }

    const submitData = await submitResponse.json();
    const taskId = typeof submitData?.id === "string" ? submitData.id : "";
    if (!taskId) {
      const errorText = `Runway submit did not return task id: ${JSON.stringify(submitData).slice(0, 400)}`;
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText,
      }).catch(() => {});
      return { success: false, status: 502, error: errorText };
    }

    const deadline = Date.now() + timeoutMs;
    let lastTask = null;

    while (Date.now() < deadline) {
      const taskResponse = await fetch(
        buildRunwayApiUrl(`/tasks/${encodeURIComponent(taskId)}`, providerConfig.baseUrl),
        {
          method: "GET",
          headers,
        }
      );

      if (!taskResponse.ok) {
        const errorText = await taskResponse.text();
        if (log) {
          log.error(
            "VIDEO",
            `${provider} poll error ${taskResponse.status}: ${errorText.slice(0, 200)}`
          );
        }
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: taskResponse.status,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: errorText.slice(0, 500),
          responseBody: { taskId, stage: "poll" },
        }).catch(() => {});
        return { success: false, status: taskResponse.status, error: errorText };
      }

      const task = await taskResponse.json();
      lastTask = task;
      const status = String(task?.status || "").toUpperCase();

      if (status === "SUCCEEDED") {
        const videos = await normalizeRunwayVideoResult(task, body);
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          responseBody: { videos_count: videos.length, taskId, mode: "async" },
        }).catch(() => {});
        return {
          success: true,
          data: { created: Math.floor(Date.now() / 1000), data: videos },
        };
      }

      if (RUNWAY_TERMINAL_FAILURE_STATUSES.has(status)) {
        const errorText =
          extractRunwayFailureMessage(task) || `Runway task failed with status ${status}`;
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: errorText.slice(0, 500),
          responseBody: { taskId, status },
        }).catch(() => {});
        return { success: false, status: 502, error: errorText };
      }

      await sleep(pollIntervalMs);
    }

    const timeoutError = `Runway task timeout after ${timeoutMs}ms (taskId=${taskId}, status=${String(
      lastTask?.status || "unknown"
    )})`;
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: timeoutError,
      responseBody: { taskId, status: lastTask?.status ?? null },
    }).catch(() => {});
    return { success: false, status: 504, error: timeoutError };
  } catch (err) {
    if (log) log.error("VIDEO", `${provider} runway error: ${err.message}`);
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

const RUNWAY_TERMINAL_FAILURE_STATUSES = new Set([
  "FAILED",
  "CANCELED",
  "CANCELLED",
  "ABORTED",
  "DELETED",
]);

function resolveRunwayPromptImage(body) {
  const directCandidates = [
    body.promptImage,
    body.prompt_image,
    body.image,
    body.image_url,
    body.imageUrl,
    body.provider_options?.promptImage,
    body.provider_options?.prompt_image,
  ];

  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    if (candidate && typeof candidate === "object") return candidate;
    if (Array.isArray(candidate) && candidate.length > 0) return candidate;
  }

  const arrayCandidates = [
    body.imageUrls,
    body.image_urls,
    body.provider_options?.imageUrls,
    body.provider_options?.image_urls,
  ];
  for (const candidate of arrayCandidates) {
    if (Array.isArray(candidate) && candidate.length > 0) return candidate;
  }

  return null;
}

function resolveRunwayRatio(body) {
  const aspectRatio = typeof body.aspect_ratio === "string" ? body.aspect_ratio : body.aspectRatio;
  if (aspectRatio === "1280:720" || aspectRatio === "720:1280") return aspectRatio;
  if (aspectRatio === "16:9") return "1280:720";
  if (aspectRatio === "9:16") return "720:1280";

  const size = typeof body.size === "string" ? body.size : "";
  const [widthRaw, heightRaw] = size.split("x");
  const width = Number(widthRaw);
  const height = Number(heightRaw);
  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return width >= height ? "1280:720" : "720:1280";
  }

  return "1280:720";
}

function resolveRunwayDuration(body) {
  if (Number.isFinite(body.duration)) {
    return clampRunwayDuration(body.duration);
  }

  if (Number.isFinite(body.frames) && Number.isFinite(body.fps) && Number(body.fps) > 0) {
    return clampRunwayDuration(Number(body.frames) / Number(body.fps));
  }

  return 5;
}

function clampRunwayDuration(value) {
  const duration = Math.round(Number(value));
  if (!Number.isFinite(duration)) return 5;
  return Math.min(10, Math.max(2, duration));
}

function resolvePositiveInteger(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return fallback;
  return Math.floor(numeric);
}

function extractRunwayOutputUrls(task) {
  const rawOutput = Array.isArray(task?.output)
    ? task.output
    : Array.isArray(task?.result)
      ? task.result
      : [];

  return rawOutput
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (!entry || typeof entry !== "object") return null;
      return entry.url || entry.uri || entry.videoUrl || entry.video_url || null;
    })
    .filter((value) => typeof value === "string" && value.length > 0);
}

function extractRunwayFailureMessage(task) {
  const directCandidates = [
    task?.failure,
    task?.failureReason,
    task?.error,
    task?.errorMessage,
    task?.message,
  ];
  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }

  if (task?.failure && typeof task.failure === "object") {
    const nestedCandidates = [
      task.failure.message,
      task.failure.reason,
      task.failure.error,
      task.failure.code,
    ];
    for (const candidate of nestedCandidates) {
      if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    }
  }

  return null;
}

async function normalizeRunwayVideoResult(task, body) {
  const urls = extractRunwayOutputUrls(task);
  if (urls.length === 0) {
    throw new Error(
      `Runway task completed without output URLs: ${JSON.stringify(task).slice(0, 400)}`
    );
  }

  if (body.response_format === "url") {
    return urls.map((url) => ({ url, format: "mp4" }));
  }

  const videos = [];
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Runway output fetch failed (${response.status})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    videos.push({
      b64_json: Buffer.from(arrayBuffer).toString("base64"),
      format: "mp4",
    });
  }

  return videos;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
