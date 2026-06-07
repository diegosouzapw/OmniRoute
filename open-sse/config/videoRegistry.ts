/**
 * Video Generation Provider Registry
 *
 * Defines providers that support the /v1/videos/generations endpoint.
 * Supports local providers plus hosted task-based APIs such as Runway.
 */

import { parseModelFromRegistry, getAllModelsFromRegistry } from "./registryUtils.ts";
import { RUNWAYML_SUPPORTED_VIDEO_MODELS } from "./runway.ts";

interface VideoModel {
  id: string;
  name: string;
  isMarket?: boolean;
}

interface VideoProvider {
  id: string;
  alias?: string;
  baseUrl: string;
  statusUrl?: string;
  authType: string;
  authHeader: string;
  format: string;
  models: VideoModel[];
}

export const VIDEO_PROVIDERS: Record<string, VideoProvider> = {
  kie: {
    id: "kie",
    baseUrl: "https://api.kie.ai",
    statusUrl: "https://api.kie.ai/api/v1/jobs/recordInfo",
    authType: "apikey",
    authHeader: "bearer",
    format: "kie-video",
    models: [
      { id: "veo/veo-3-1", name: "Veo 3.1", isMarket: true },
      { id: "veo/veo-3-1-fast", name: "Veo 3.1 Fast", isMarket: true },
      { id: "kling-3.0/video", name: "Kling 3.0", isMarket: true },
      { id: "bytedance/seedance-2", name: "Seedance v2.0", isMarket: true },
      { id: "wan/2-7-text-to-video", name: "Wan 2.7 T2V", isMarket: true },
      { id: "wan/2-7-image-to-video", name: "Wan 2.7 I2V", isMarket: true },
      { id: "hailuo/02-text-to-video-pro", name: "Hailuo Pro T2V", isMarket: true },
      { id: "hailuo/2-3-image-to-video-pro", name: "Hailuo 2.3 Pro I2V", isMarket: true },
      { id: "grok-imagine/text-to-video", name: "Grok Imagine T2V", isMarket: true },
      { id: "grok-imagine/image-to-video", name: "Grok Imagine I2V", isMarket: true },
      { id: "happyhorse/text-to-video", name: "HappyHorse T2V", isMarket: true },
      { id: "happyhorse/image-to-video", name: "HappyHorse I2V", isMarket: true },
      { id: "sora-2-text-to-video", name: "Sora 2 T2V", isMarket: true },
      { id: "sora-2-image-to-video", name: "Sora 2 I2V", isMarket: true },
      { id: "sora-2-pro-text-to-video", name: "Sora 2 Pro T2V", isMarket: true },
      { id: "sora-2-pro-image-to-video", name: "Sora 2 Pro I2V", isMarket: true },
    ],
  },

  haiper: {
    id: "haiper",
    baseUrl: "https://api.haiper.ai/v1/jobs/gen2/text2video",
    statusUrl: "https://api.haiper.ai/v1/jobs",
    authType: "apikey",
    authHeader: "HAIPER_KEY",
    format: "haiper-video",
    models: [{ id: "gen2", name: "Gen 2" }],
  },
  leonardo: {
    id: "leonardo",
    baseUrl: "https://cloud.leonardo.ai/api/rest/v1/generations",
    statusUrl: "https://cloud.leonardo.ai/api/rest/v1/generations",
    authType: "apikey",
    authHeader: "bearer",
    format: "leonardo-video",
    models: [{ id: "phoenix", name: "Phoenix Video" }],
  },
  pollinations: {
    id: "pollinations",
    baseUrl: "https://gen.pollinations.ai/video",
    authType: "apikey",
    authHeader: "bearer",
    format: "pollinations-video",
    models: [{ id: "default", name: "Pollinations Video (Free)" }],
  },

  minimax: {
    id: "minimax",
    baseUrl: "https://api.minimax.io/v1/video_generation",
    statusUrl: "https://api.minimax.io/v1/query/video_generation",
    authType: "apikey",
    authHeader: "bearer",
    format: "minimax-video",
    models: [
      { id: "MiniMax-Hailuo-2.3", name: "Hailuo 2.3" },
      { id: "MiniMax-Hailuo-02", name: "Hailuo 02" },
      { id: "T2V-01-Director", name: "T2V 01 Director" },
    ],
  },

  together: {
    id: "together",
    baseUrl: "https://api.together.xyz/videos",
    statusUrl: "https://api.together.xyz/videos",
    authType: "apikey",
    authHeader: "bearer",
    format: "together-video",
    models: [
      { id: "wan-ai/wan2.1-t2v-480p", name: "Wan 2.1 T2V 480p" },
      { id: "wan-ai/wan2.7-t2v", name: "Wan 2.7 T2V" },
    ],
  },

  replicate: {
    id: "replicate",
    baseUrl: "https://api.replicate.com/v1/predictions",
    statusUrl: "https://api.replicate.com/v1/predictions",
    authType: "apikey",
    authHeader: "bearer",
    format: "replicate-video",
    models: [
      { id: "minimax/video-01", name: "MiniMax Video 01" },
      { id: "wan-ai/wan2.1-t2v-480p", name: "Wan 2.1 T2V" },
      { id: "tencent/hunyuan-video", name: "Hunyuan Video" },
    ],
  },
  comfyui: {
    id: "comfyui",
    baseUrl: "http://localhost:8188",
    authType: "none",
    authHeader: "none",
    format: "comfyui",
    models: [
      { id: "animatediff", name: "AnimateDiff" },
      { id: "svd-xt", name: "Stable Video Diffusion XT" },
    ],
  },

  sdwebui: {
    id: "sdwebui",
    baseUrl: "http://localhost:7860",
    authType: "none",
    authHeader: "none",
    format: "sdwebui-video",
    models: [{ id: "animatediff-webui", name: "AnimateDiff (WebUI)" }],
  },

  "veoaifree-web": {
    id: "veoaifree-web",
    alias: "veo-free",
    baseUrl: "https://veoaifree.com/wp-admin/admin-ajax.php",
    authType: "none",
    authHeader: "none",
    format: "veoaifree-web",
    models: [
      { id: "veo", name: "VEO 3.1" },
      { id: "seedance", name: "Seedance" },
    ],
  },

  runwayml: {
    id: "runwayml",
    baseUrl: "https://api.dev.runwayml.com/v1",
    authType: "bearer",
    authHeader: "Authorization",
    format: "runwayml",
    models: RUNWAYML_SUPPORTED_VIDEO_MODELS,
  },
};

/**
 * Get video provider config by ID
 */
export function getVideoProvider(providerId: string): VideoProvider | null {
  return VIDEO_PROVIDERS[providerId] || null;
}

/**
 * Parse video model string (format: "provider/model" or just "model")
 */
export function parseVideoModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, VIDEO_PROVIDERS);
}

/**
 * Get all video models as a flat list
 */
export function getAllVideoModels() {
  return getAllModelsFromRegistry(VIDEO_PROVIDERS);
}
