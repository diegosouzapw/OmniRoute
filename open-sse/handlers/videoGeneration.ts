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
import { kieExecutor } from "../executors/kie.ts";
import { vertexGenerateVideo } from "../executors/vertexMedia.ts";
import { getExecutor } from "../executors/index.ts";
import { isJsonObject, parseKieResultJson } from "../utils/kieTask.ts";
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
import { sanitizeErrorMessage } from "../utils/error.ts";

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

  if (providerConfig.format === "vertex-veo") {
    return handleVertexVeoGeneration({ model, body, credentials, log });
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIVideoGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "sdwebui-video") {
    return handleSDWebUIVideoGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "kie-video") {
    return handleKieVideoGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  if (providerConfig.format === "runwayml") {
    return handleRunwayVideoGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  if (providerConfig.format === "haiper-video") {
    return handleHaiperVideoGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  if (providerConfig.format === "veoaifree-web") {
    return handleVeoAiFreeVideoGeneration({ model, provider, body, credentials, log });
  }

  if (providerConfig.format === "leonardo-video") {
    return handleLeonardoVideoGeneration({
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
 * Veo video generation via Vertex AI (predictLongRunning → poll → MP4).
 * Uses the Vertex chat credentials (Service Account JSON or Express key).
 */
async function handleVertexVeoGeneration({ model, body, credentials, log }) {
  try {
    const aspectRatio =
      typeof body.aspect_ratio === "string"
        ? body.aspect_ratio
        : typeof body.aspectRatio === "string"
          ? body.aspectRatio
          : typeof body.size === "string"
            ? body.size
            : undefined;
    const durationSeconds =
      typeof body.duration === "number"
        ? body.duration
        : typeof body.durationSeconds === "number"
          ? body.durationSeconds
          : undefined;

    const result = await vertexGenerateVideo(credentials, {
      model,
      prompt: String(body.prompt ?? ""),
      aspectRatio,
      durationSeconds,
      negativePrompt: typeof body.negative_prompt === "string" ? body.negative_prompt : undefined,
    });

    const item = result.base64
      ? { b64_json: result.base64, format: result.format }
      : { url: result.url, format: result.format };

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: [item] },
    };
  } catch (err: any) {
    log?.error?.("VIDEO", `Vertex Veo generation failed: ${err?.message}`);
    return {
      success: false,
      status: typeof err?.status === "number" ? err.status : 502,
      error: sanitizeErrorMessage(err?.message || "Vertex Veo generation failed"),
    };
  }
}

/**
 * Handle ComfyUI video generation
 * Submits an AnimateDiff or SVD workflow, polls for completion, fetches output video
 */
async function handleVeoAiFreeVideoGeneration({ model, provider, body, credentials, log }) {
  const executor = getExecutor(provider);
  if (!executor) {
    return { success: false, status: 400, error: `Unknown video provider: ${provider}` };
  }

  const prompt = String(body.prompt ?? "");
  const systemParts = [];
  if (body.size) systemParts.push(`aspect_ratio: ${body.size}`);
  if (body.aspect_ratio) systemParts.push(`aspect_ratio: ${body.aspect_ratio}`);

  const response = await executor.execute({
    model,
    body: {
      ...body,
      model: `${provider}/${model}`,
      messages: [
        ...(systemParts.length > 0 ? [{ role: "system", content: systemParts.join("\n") }] : []),
        { role: "user", content: prompt },
      ],
    },
    stream: false,
    credentials: credentials || { connectionId: "noauth" },
    signal: null,
    log,
  });

  const upstreamResponse = response instanceof Response ? response : response.response;
  if (!upstreamResponse.ok) {
    return {
      success: false,
      status: upstreamResponse.status || 502,
      error: await upstreamResponse.text().catch(() => "Video provider error"),
    };
  }

  return {
    success: true,
    data: await upstreamResponse.json(),
  };
}

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
    return {
      success: false,
      status: 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
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
    return {
      success: false,
      status: 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
  }
}

function normalizeKieVideoResult(recordData: unknown): string[] {
  const record = isJsonObject(recordData) ? recordData : {};
  const data = isJsonObject(record.data) ? record.data : {};
  const response = isJsonObject(data.response) ? data.response : {};
  const resultJson = parseKieResultJson(recordData);

  const urls = Array.isArray(resultJson?.resultUrls)
    ? (resultJson.resultUrls as string[])
    : Array.isArray(resultJson?.videoUrls)
      ? (resultJson.videoUrls as string[])
      : Array.isArray(response.resultUrls)
        ? (response.resultUrls as string[])
        : [];

  return urls.filter((url: unknown) => typeof url === "string" && url.length > 0);
}

async function handleKieVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: {
  model: string;
  provider: string;
  providerConfig: {
    baseUrl: string;
    statusUrl?: string;
  };
  body: Record<string, unknown> & {
    prompt?: unknown;
    duration?: unknown;
    aspect_ratio?: unknown;
    sound?: unknown;
    timeout_ms?: unknown;
    poll_interval_ms?: unknown;
  };
  credentials?: {
    apiKey?: string;
    accessToken?: string;
  } | null;
  log?: {
    info: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
}) {
  const startTime = Date.now();
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : 300000;
  const pollIntervalMs = Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : 2500;
  const token = credentials?.apiKey || credentials?.accessToken;
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");

  if (!token) {
    return { success: false, status: 401, error: "KIE API key is required" };
  }

  const payload = {
    model,
    input: {
      prompt,
      duration: body.duration ? String(body.duration) : "5",
      aspect_ratio: typeof body.aspect_ratio === "string" ? body.aspect_ratio : "16:9",
      sound: body.sound === true,
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("VIDEO", `${provider}/${model} (kie-video) | prompt: "${promptPreview}..."`);
  }

  try {
    const createData = await kieExecutor.createTask({ baseUrl, token, payload });
    const taskId = createData?.data?.taskId || createData?.taskId;
    if (!taskId) {
      const errorMessage =
        createData?.msg ||
        createData?.message ||
        createData?.error ||
        "KIE video generation did not return taskId";
      if (log) {
        log.error("VIDEO", `KIE createTask failed: ${JSON.stringify(createData)}`);
      }
      return { success: false, status: 502, error: errorMessage };
    }

    const statusUrl = providerConfig.statusUrl || `${baseUrl}/api/v1/jobs/recordInfo`;

    const { data: recordData, state } = await kieExecutor.pollTask({
      statusUrl,
      taskId: String(taskId),
      token,
      timeoutMs,
      pollIntervalMs,
    });

    if (state === "success") {
      const videoUrls = normalizeKieVideoResult(recordData);
      const videos = videoUrls.map((url) => ({ url, format: "mp4" }));

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
    }

    const record = isJsonObject(recordData) ? recordData : {};
    const data = isJsonObject(record.data) ? record.data : {};
    const errorMessage = data.failMsg || data.errorMessage || record.msg || "KIE video task failed";
    return { success: false, status: 502, error: String(errorMessage) };
  } catch (err: unknown) {
    return {
      success: false,
      status: isJsonObject(err) && Number.isFinite(Number(err.status)) ? Number(err.status) : 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
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
    return {
      success: false,
      status: 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
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

async function handleHaiperVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", HAIPER_KEY: token },
    body: JSON.stringify({ prompt: body.prompt, duration: 4, aspect_ratio: "16:9" }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
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
      const videoUrl = status.creation_url || status.output?.video_url;
      if (videoUrl) {
        const videoRes = await fetch(videoUrl);
        const buf = await videoRes.arrayBuffer();
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
        }).catch(() => {});
        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: [{ b64_json: Buffer.from(buf).toString("base64"), format: "mp4" }],
          },
        };
      }
    }
    if (status.status === "failed") {
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "Haiper video generation failed",
      }).catch(() => {});
      return { success: false, status: 502, error: "Haiper video generation failed" };
    }
  }
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status: 504,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: "Haiper video generation timed out",
  }).catch(() => {});
  return { success: false, status: 504, error: "Haiper video generation timed out" };
}

async function handleLeonardoVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      modelId: "phoenix",
      prompt: body.prompt,
      width: 1024,
      height: 576,
      num_frames: 24,
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
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
      path: "/v1/videos/generations",
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
        const videoRes = await fetch(imgUrl);
        const buf = await videoRes.arrayBuffer();
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
        }).catch(() => {});
        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: [{ b64_json: Buffer.from(buf).toString("base64"), format: "mp4" }],
          },
        };
      }
    }
    if (gen.status === "FAILED") {
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "Leonardo video generation failed",
      }).catch(() => {});
      return { success: false, status: 502, error: "Leonardo video generation failed" };
    }
  }
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status: 504,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: "Leonardo video generation timed out",
  }).catch(() => {});
  return { success: false, status: 504, error: "Leonardo video generation timed out" };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
