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
