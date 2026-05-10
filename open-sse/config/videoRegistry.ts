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
      {
        id: "kling/kling-v2-1-master-text-to-video",
        name: "Kling v2.1 Master T2V",
        isMarket: true,
      },
      {
        id: "kling/kling-v2-1-master-image-to-video",
        name: "Kling v2.1 Master I2V",
        isMarket: true,
      },
      { id: "kling/v2-5-turbo-text-to-video", name: "Kling v2.5 Turbo T2V", isMarket: true },
      { id: "kling/v2-5-turbo-image-to-video", name: "Kling v2.5 Turbo I2V", isMarket: true },
      { id: "kling/v3-0", name: "Kling v3.0", isMarket: true },
      { id: "wan/2-6-text-to-video", name: "Wan 2.6 T2V", isMarket: true },
      { id: "wan/2-6-image-to-video", name: "Wan 2.6 I2V", isMarket: true },
      { id: "wan/2-7-text-to-video", name: "Wan 2.7 T2V", isMarket: true },
      { id: "wan/2-7-image-to-video", name: "Wan 2.7 I2V", isMarket: true },
      { id: "sora2/sora-2-text-to-video", name: "Sora 2 T2V", isMarket: true },
      { id: "sora2/sora-2-image-to-video", name: "Sora 2 I2V", isMarket: true },
      { id: "hailuo/02-text-to-video-pro", name: "Hailuo 02 T2V Pro", isMarket: true },
      { id: "hailuo/02-image-to-video-pro", name: "Hailuo 02 I2V Pro", isMarket: true },
      { id: "grok-imagine/text-to-video", name: "Grok Imagine T2V", isMarket: true },
      { id: "grok-imagine/image-to-video", name: "Grok Imagine I2V", isMarket: true },
      { id: "bytedance/v2-0-text-to-video", name: "Seedance v2.0 T2V", isMarket: true },
      { id: "bytedance/v2-0-fast-text-to-video", name: "Seedance v2.0 Fast T2V", isMarket: true },
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
