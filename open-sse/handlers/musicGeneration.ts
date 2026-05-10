/**
 * Music Generation Handler
 *
 * Handles POST /v1/music/generations requests.
 * Proxies to upstream music generation providers.
 *
 * Supported provider formats:
 * - ComfyUI: submit audio workflow → poll → fetch output
 *
 * Response format (OpenAI-like):
 * {
 *   "created": 1234567890,
 *   "data": [{ "b64_json": "...", "format": "wav" }]
 * }
 */

import { getMusicProvider, parseMusicModel } from "../config/musicRegistry.ts";
import { kieExecutor } from "../executors/kie.ts";
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";
import { saveCallLog } from "@/lib/usageDb";
import { getKieCallbackUrl, isJsonObject, parseKieResultJson } from "../utils/kieTask.ts";

function normalizeKieSunoModel(model: string): string {
  const map: Record<string, string> = {
    "suno-v3.5": "V3_5",
    "suno-v4.0": "V4",
  };
  return map[model] || model;
}

function normalizeKieMusicTracks(recordData: unknown): Array<Record<string, unknown>> {
  const record = isJsonObject(recordData) ? recordData : {};
  const data = isJsonObject(record.data) ? record.data : {};
  const response = isJsonObject(data.response) ? data.response : {};
  const resultJson = parseKieResultJson(recordData);
  const candidates = [
    response.sunoData,
    response.data,
    data.data,
    data.sunoData,
    resultJson.sunoData,
    resultJson.data,
    resultJson.result,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate
        .map((track) =>
          isJsonObject(track) ? track : typeof track === "string" ? { audioUrl: track } : null
        )
        .filter((track): track is Record<string, unknown> => track !== null);
    }
  }

  const singleUrl =
    response.audioUrl ||
    response.audio_url ||
    data.resultUrl ||
    data.audio_url ||
    resultJson.audioUrl ||
    resultJson.audio_url ||
    resultJson.url;

  return typeof singleUrl === "string" && singleUrl.length > 0 ? [{ audioUrl: singleUrl }] : [];
}

/**
 * Handle music generation request
 */
export async function handleMusicGeneration({ body, credentials, log }) {
  const { provider, model } = parseMusicModel(body.model);

  if (!provider) {
    return {
      success: false,
      status: 400,
      error: `Invalid music model: ${body.model}. Use format: provider/model`,
    };
  }

  const providerConfig = getMusicProvider(provider);
  if (!providerConfig) {
    return {
      success: false,
      status: 400,
      error: `Unknown music provider: ${provider}`,
    };
  }

  if (providerConfig.format === "comfyui") {
    return handleComfyUIMusicGeneration({ model, provider, providerConfig, body, log });
  }

  if (providerConfig.format === "kie-music") {
    return handleKieMusicGeneration({ model, provider, providerConfig, body, credentials, log });
  }

  return {
    success: false,
    status: 400,
    error: `Unsupported music format: ${providerConfig.format}`,
  };
}

/**
 * Handle ComfyUI music generation
 * Submits an audio generation workflow (Stable Audio / MusicGen), polls, fetches output
 */
async function handleComfyUIMusicGeneration({ model, provider, providerConfig, body, log }) {
  const startTime = Date.now();
  const duration = body.duration || 10; // seconds

  // Audio generation workflow template for ComfyUI
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
      class_type: "EmptyLatentAudio",
      inputs: { seconds: duration },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        seed: Math.floor(Math.random() * 2 ** 32),
        steps: body.steps || 100,
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
      class_type: "VAEDecodeAudio",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveAudio",
      inputs: {
        filename_prefix: "omniroute_music",
        audio: ["6", 0],
      },
    },
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "MUSIC",
      `${provider}/${model} (comfyui) | prompt: "${promptPreview}..." | duration: ${duration}s`
    );
  }

  try {
    const promptId = await submitComfyWorkflow(providerConfig.baseUrl, workflow);
    const historyEntry = await pollComfyResult(providerConfig.baseUrl, promptId, 300_000);
    const outputFiles = extractComfyOutputFiles(historyEntry);

    const audioFiles = [];
    for (const file of outputFiles) {
      const buffer = await fetchComfyOutput(
        providerConfig.baseUrl,
        file.filename,
        file.subfolder,
        file.type
      );
      const base64 = Buffer.from(buffer).toString("base64");
      audioFiles.push({ b64_json: base64, format: "wav" });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/music/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { audio_count: audioFiles.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: audioFiles },
    };
  } catch (err) {
    if (log) log.error("MUSIC", `${provider} comfyui error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/music/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return { success: false, status: 502, error: `Music provider error: ${err.message}` };
  }
}

async function handleKieMusicGeneration({
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

  // Check if model is a Market model
  const fullRegistry = getMusicProvider(provider);
  const modelEntry = fullRegistry?.models?.find((m) => m.id === model);
  const isMarket = modelEntry?.isMarket || model.includes("/");

  let url = "";
  let payload: Record<string, unknown> = {};

  if (isMarket) {
    url = `${baseUrl}/api/v1/jobs/createTask`;
    payload = {
      model,
      callBackUrl: getKieCallbackUrl(body),
      input: {
        prompt,
        instrumental: true,
      },
    };
  } else {
    url = `${baseUrl}/api/v1/generate`;
    payload = {
      prompt,
      customMode: false,
      instrumental: true,
      model: normalizeKieSunoModel(model),
      callBackUrl: getKieCallbackUrl(body),
    };
  }

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info(
      "MUSIC",
      `${provider}/${model} (${isMarket ? "market" : "direct"}) | prompt: "${promptPreview}..."`
    );
  }

  try {
    const endpoint = new URL(url).pathname;
    const createData = await kieExecutor.createTask({ baseUrl, token, payload, endpoint });
    const taskId = createData?.data?.taskId || createData?.taskId;
    if (!taskId) {
      const errorMessage =
        createData?.msg ||
        createData?.message ||
        createData?.error ||
        "KIE music generation did not return taskId";
      if (log) {
        log.error("MUSIC", `KIE createTask failed: ${JSON.stringify(createData)}`);
      }
      return { success: false, status: 502, error: errorMessage };
    }

    const statusUrl = isMarket
      ? `${baseUrl}/api/v1/jobs/recordInfo`
      : providerConfig.statusUrl && !providerConfig.statusUrl.includes("jobs/recordInfo")
        ? providerConfig.statusUrl
        : `${baseUrl}/api/v1/generate/record-info`;

    const { data: recordData, state } = await kieExecutor.pollTask({
      statusUrl,
      taskId: String(taskId),
      token,
      timeoutMs,
      pollIntervalMs,
    });

    if (state === "success") {
      const tracks = normalizeKieMusicTracks(recordData);

      const audioFiles = tracks
        .map((track) =>
          typeof track.audioUrl === "string"
            ? track.audioUrl
            : typeof track.audio_url === "string"
              ? track.audio_url
              : typeof track.url === "string"
                ? track.url
                : null
        )
        .filter((url): url is string => typeof url === "string" && url.length > 0)
        .map((url: string) => ({ url, format: "mp3" }));

      saveCallLog({
        method: "POST",
        path: "/v1/music/generations",
        status: 200,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        responseBody: { audio_count: audioFiles.length },
      }).catch(() => {});

      return {
        success: true,
        data: { created: Math.floor(Date.now() / 1000), data: audioFiles },
      };
    }

    const record = isJsonObject(recordData) ? recordData : {};
    const data = isJsonObject(record.data) ? record.data : {};
    const errorMessage = data.errorMessage || data.failMsg || record.msg || "KIE music task failed";
    return { success: false, status: 502, error: String(errorMessage) };
  } catch (err: unknown) {
    return {
      success: false,
      status: isJsonObject(err) && Number.isFinite(Number(err.status)) ? Number(err.status) : 502,
      error: `Music provider error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
