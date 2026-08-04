/**
 * Video Generation Provider Registry
 *
 * Defines providers that support the /v1/videos/generations endpoint.
 * Supports local providers plus hosted task-based APIs such as Runway.
 */

import { parseModelFromRegistry, getAllModelsFromRegistry } from "./registryUtils.ts";
import { RUNWAYML_SUPPORTED_VIDEO_MODELS } from "./runway.ts";
import { SEGMIND_VIDEO_MODELS } from "./providers/registry/segmind/videoModels.ts";

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
  "qwen-cloud-token-plan": {
    id: "qwen-cloud-token-plan",
    alias: "qct",
    baseUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/api/v1",
    statusUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/api/v1/tasks",
    authType: "apikey",
    authHeader: "bearer",
    format: "dashscope-video",
    models: [
      { id: "happyhorse-1.1-i2v", name: "HappyHorse 1.1 I2V" },
      { id: "happyhorse-1.1-t2v", name: "HappyHorse 1.1 T2V" },
      { id: "happyhorse-1.1-r2v", name: "HappyHorse 1.1 R2V" },
    ],
  },

  "bailian-coding-plan": {
    id: "bailian-coding-plan",
    alias: "bcp",
    baseUrl: "https://coding-intl.dashscope.aliyuncs.com/api/v1",
    statusUrl: "https://coding-intl.dashscope.aliyuncs.com/api/v1/tasks",
    authType: "apikey",
    authHeader: "bearer",
    format: "dashscope-video",
    models: [
      { id: "happyhorse-1.1-i2v", name: "HappyHorse 1.1 I2V" },
      { id: "happyhorse-1.1-t2v", name: "HappyHorse 1.1 T2V" },
      { id: "happyhorse-1.1-r2v", name: "HappyHorse 1.1 R2V" },
    ],
  },

  vertex: {
    id: "vertex",
    baseUrl: "https://us-central1-aiplatform.googleapis.com/v1",
    authType: "apikey",
    authHeader: "bearer",
    format: "vertex-veo",
    models: [
      { id: "veo-3.0-generate-001", name: "Veo 3.0 (Vertex)" },
      { id: "veo-3.0-fast-generate-001", name: "Veo 3.0 Fast (Vertex)" },
      { id: "veo-2.0-generate-001", name: "Veo 2.0 (Vertex)" },
    ],
  },

  googleflow: {
    id: "googleflow",
    alias: "flow",
    // ⚠️ Wire host isolated for live HAR validation (Rule #18). The handler reuses
    // the Google account OAuth credential (accessToken + Cloud Code projectId) that
    // the Antigravity provider already establishes; no separate OAuth flow is added.
    baseUrl: "https://aisandbox-pa.googleapis.com",
    authType: "oauth",
    authHeader: "bearer",
    format: "google-flow",
    models: [
      { id: "veo-3.1-generate", name: "Veo 3.1 (Google Flow)" },
      { id: "veo-3.1-fast-generate", name: "Veo 3.1 Fast (Google Flow)" },
      { id: "veo-3.0-generate", name: "Veo 3.0 (Google Flow)" },
    ],
  },

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

  deepinfra: {
    id: "deepinfra",
    // Native DeepInfra inference endpoint — same host/auth already proven for reranking
    // (open-sse/config/rerankRegistry.ts). Reuses the stored deepinfra provider Bearer
    // apiKey (already registered for chat) — no separate credential flow.
    baseUrl: "https://api.deepinfra.com/v1/inference",
    authType: "apikey",
    authHeader: "bearer",
    format: "deepinfra-video",
    models: [
      { id: "Wan-AI/Wan2.2-T2V-A14B", name: "Wan 2.2 T2V A14B" },
      { id: "Wan-AI/Wan2.2-TI2V-5B", name: "Wan 2.2 TI2V 5B" },
      { id: "Wan-AI/Wan2.7-T2V", name: "Wan 2.7 T2V" },
      { id: "Lightricks/LTX-2.3-Distilled", name: "LTX 2.3 Distilled" },
    ],
  },

  alibaba: {
    id: "alibaba",
    alias: "ali",
    // DashScope (Alibaba Cloud Model Studio) async video-synthesis API. Reuses
    // the stored alibaba provider Bearer apiKey — no separate credential flow.
    baseUrl: "https://dashscope-intl.aliyuncs.com/api/v1",
    statusUrl: "https://dashscope-intl.aliyuncs.com/api/v1/tasks",
    authType: "apikey",
    authHeader: "bearer",
    format: "dashscope-video",
    models: [
      { id: "happyhorse-1.1-i2v", name: "HappyHorse 1.1 I2V" },
      { id: "happyhorse-1.1-t2v", name: "HappyHorse 1.1 T2V" },
      { id: "happyhorse-1.1-r2v", name: "HappyHorse 1.1 R2V" },
      { id: "happyhorse-1.0-video-edit", name: "HappyHorse 1.0 Video Edit" },
      { id: "wan2.7-i2v-2026-04-25", name: "Wan 2.7 I2V (2026-04-25)" },
      { id: "wan2.6-i2v-flash", name: "Wan 2.6 I2V Flash" },
      { id: "wan2.7-t2v-2026-06-12", name: "Wan 2.7 T2V (2026-06-12)" },
      { id: "wan2.7-r2v-2026-06-12", name: "Wan 2.7 R2V (2026-06-12)" },
      { id: "wan2.7-videoedit", name: "Wan 2.7 Video Edit" },
    ],
  },

  "qwen-cloud": {
    id: "qwen-cloud",
    alias: "qwc",
    baseUrl: "https://dashscope-intl.aliyuncs.com/api/v1",
    statusUrl: "https://dashscope-intl.aliyuncs.com/api/v1/tasks",
    authType: "apikey",
    authHeader: "bearer",
    format: "dashscope-video",
    models: [
      { id: "happyhorse-1.1-i2v", name: "HappyHorse 1.1 I2V" },
      { id: "happyhorse-1.1-t2v", name: "HappyHorse 1.1 T2V" },
      { id: "happyhorse-1.1-r2v", name: "HappyHorse 1.1 R2V" },
      { id: "happyhorse-1.0-video-edit", name: "HappyHorse 1.0 Video Edit" },
      { id: "wan2.7-t2v", name: "Wan 2.7 T2V" },
      { id: "wan2.7-i2v", name: "Wan 2.7 I2V" },
      { id: "wan2.7-r2v-2026-06-12", name: "Wan 2.7 R2V (2026-06-12)" },
      { id: "wan2.7-videoedit", name: "Wan 2.7 Video Edit" },
    ],
  },

  // Segmind video generation (#6656). Same `POST /v1/{model}` REST shape as
  // the image registry entry (imageRegistry.ts) — x-api-key auth, raw video
  // bytes response — routed through the dedicated "segmind" format handler.
  segmind: {
    id: "segmind",
    baseUrl: "https://api.segmind.com/v1",
    authType: "apikey",
    authHeader: "x-api-key",
    format: "segmind",
    models: SEGMIND_VIDEO_MODELS,
  },

  novita: {
    id: "novita",
    // Novita's async video APIs are per-model: the model id IS the submit path
    // segment (`/v3/async/<model>`), all sharing one task-result poll endpoint.
    // Reuses the stored novita provider Bearer apiKey — no separate credential flow.
    baseUrl: "https://api.novita.ai/v3/async",
    statusUrl: "https://api.novita.ai/v3/async/task-result",
    authType: "apikey",
    authHeader: "bearer",
    format: "novita-video",
    models: [
      { id: "wan-t2v", name: "Wan 2.1 Text-to-Video" },
      { id: "kling-v1.6-t2v", name: "Kling V1.6 Text-to-Video" },
    ],
  },

  xai: {
    id: "xai",
    // xAI Grok Imagine async video-generation API. Reuses the stored xai
    // provider Bearer apiKey (same credential the image-generation "xai"
    // entry in imageRegistry.ts already uses) — no separate credential flow.
    baseUrl: "https://api.x.ai/v1/videos",
    statusUrl: "https://api.x.ai/v1/videos",
    authType: "apikey",
    authHeader: "bearer",
    format: "xai-video",
    models: [{ id: "grok-imagine-video", name: "Grok Imagine Video" }],
  },

  // Adobe Firefly (unofficial) — same IMS/cookie credential as the image entry.
  // Async 3P video generate + poll (Sora 2, Veo 3.1, Kling …). Fallback list
  // from models/discovery capture (adobe/get_models.txt).
  "adobe-firefly": {
    id: "adobe-firefly",
    alias: "firefly",
    baseUrl: "https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async",
    authType: "apikey",
    authHeader: "bearer",
    format: "adobe-firefly-video",
    models: [
      { id: "sora-2", name: "Firefly Sora 2" },
      { id: "sora-2-pro", name: "Firefly Sora 2 Pro" },
      { id: "veo-3.1", name: "Firefly Veo 3.1" },
      { id: "veo-3.1-fast", name: "Firefly Veo 3.1 Fast" },
      { id: "veo-3.1-ref", name: "Firefly Veo 3.1 Reference" },
      { id: "kling-3", name: "Firefly Kling v3 Standard I2V" },
      { id: "kling-v3-t2v", name: "Firefly Kling v3 Standard T2V" },
      { id: "kling-v3-pro-i2v", name: "Firefly Kling v3 Pro I2V" },
      { id: "luma-ray3", name: "Firefly Ray3" },
      { id: "runway-gen4-turbo", name: "Firefly Runway Gen-4 Video" },
    ],
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
