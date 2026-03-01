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
import {
  submitComfyWorkflow,
  pollComfyResult,
  fetchComfyOutput,
  extractComfyOutputFiles,
} from "../utils/comfyuiClient.ts";

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

  return { success: false, status: 400, error: `Unsupported music format: ${providerConfig.format}` };
}

/**
 * Handle ComfyUI music generation
 * Submits an audio generation workflow (Stable Audio / MusicGen), polls, fetches output
 */
async function handleComfyUIMusicGeneration({ model, provider, providerConfig, body, log }) {
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
    log.info("MUSIC", `${provider}/${model} (comfyui) | prompt: "${promptPreview}..." | duration: ${duration}s`);
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

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: audioFiles },
    };
  } catch (err) {
    if (log) log.error("MUSIC", `${provider} comfyui error: ${err.message}`);
    return { success: false, status: 502, error: `Music provider error: ${err.message}` };
  }
}
