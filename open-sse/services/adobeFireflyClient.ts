/**
 * Adobe Firefly (unofficial) media client.
 *
 * Talks to the same Firefly 3P async APIs that Adobe Express / Firefly web use:
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async
 *   POST https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async
 * then polls the job status URL returned in `x-override-status-link` / links.result.
 *
 * Auth is an Adobe IMS access token (Bearer). Callers may pass either:
 *   - a raw IMS access_token (JWT), or
 *   - a browser Cookie header from firefly.adobe.com / new.express.adobe.com
 *     which is exchanged via IMS check/v6/token (client_id = projectx_webapp).
 *
 * This is an unofficial, reverse-engineered integration — tokens/cookies are
 * short-lived and Adobe may change the wire contract without notice.
 */

import { resolvePublicCred } from "../utils/publicCreds.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export const ADOBE_FIREFLY_IMAGE_SUBMIT_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async";
export const ADOBE_FIREFLY_VIDEO_SUBMIT_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async";
export const ADOBE_FIREFLY_IMAGE_UPLOAD_URL =
  "https://firefly-3p.ff.adobe.io/v2/storage/image";
export const ADOBE_FIREFLY_IMS_REFRESH_URL =
  "https://adobeid-na1.services.adobe.com/ims/check/v6/token?jslVersion=v2-v0.48.0-1-g1e322cb";
export const ADOBE_FIREFLY_IMS_SCOPE = "AdobeID,firefly_api,openid";

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36";
const DEFAULT_SEC_CH_UA =
  '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"';
const DEFAULT_POLL_INTERVAL_MS = 3000;
const DEFAULT_IMAGE_TIMEOUT_MS = 180_000;
const DEFAULT_VIDEO_TIMEOUT_MS = 300_000;

export type AdobeFireflyImageModelId =
  | "nano-banana-pro"
  | "nano-banana"
  | "nano-banana-2"
  | "gpt-image";

export type AdobeFireflyVideoModelId =
  | "sora-2"
  | "sora-2-pro"
  | "veo-3.1"
  | "veo-3.1-fast"
  | "veo-3.1-ref"
  | "kling-3";

export interface AdobeFireflyImageModelSpec {
  upstreamModelId: string;
  upstreamModelVersion: string;
  family: "nano" | "gpt-image";
}

export interface AdobeFireflyVideoModelSpec {
  engine: "sora2" | "sora2-pro" | "veo31-standard" | "veo31-fast" | "kling3";
  upstreamModel: string;
  modelId?: string;
  modelVersion?: string;
  referenceMode?: "frame" | "image";
  defaultDuration: number;
  defaultResolution: string;
}

export const ADOBE_FIREFLY_IMAGE_MODELS: Record<AdobeFireflyImageModelId, AdobeFireflyImageModelSpec> =
  {
    "nano-banana-pro": {
      upstreamModelId: "gemini-flash",
      upstreamModelVersion: "nano-banana-2",
      family: "nano",
    },
    "nano-banana": {
      upstreamModelId: "gemini-flash",
      upstreamModelVersion: "nano-banana-2",
      family: "nano",
    },
    "nano-banana-2": {
      upstreamModelId: "gemini-flash",
      upstreamModelVersion: "nano-banana-3",
      family: "nano",
    },
    "gpt-image": {
      upstreamModelId: "gpt-image",
      upstreamModelVersion: "2",
      family: "gpt-image",
    },
  };

export const ADOBE_FIREFLY_VIDEO_MODELS: Record<AdobeFireflyVideoModelId, AdobeFireflyVideoModelSpec> =
  {
    "sora-2": {
      engine: "sora2",
      upstreamModel: "openai:firefly:colligo:sora2",
      defaultDuration: 8,
      defaultResolution: "720p",
    },
    "sora-2-pro": {
      engine: "sora2-pro",
      upstreamModel: "openai:firefly:colligo:sora2-pro",
      defaultDuration: 8,
      defaultResolution: "720p",
    },
    "veo-3.1": {
      engine: "veo31-standard",
      upstreamModel: "google:firefly:colligo:veo31",
      modelId: "veo",
      modelVersion: "3.1-generate",
      defaultDuration: 6,
      defaultResolution: "720p",
    },
    "veo-3.1-fast": {
      engine: "veo31-fast",
      upstreamModel: "google:firefly:colligo:veo31-fast",
      modelId: "veo",
      modelVersion: "3.1-fast-generate",
      defaultDuration: 6,
      defaultResolution: "720p",
    },
    "veo-3.1-ref": {
      engine: "veo31-standard",
      upstreamModel: "google:firefly:colligo:veo31",
      modelId: "veo",
      modelVersion: "3.1-generate",
      referenceMode: "image",
      defaultDuration: 6,
      defaultResolution: "720p",
    },
    "kling-3": {
      engine: "kling3",
      upstreamModel: "kling:firefly:colligo:kling3",
      modelId: "kling",
      modelVersion: "kling_v3_standard_i2v",
      defaultDuration: 5,
      defaultResolution: "1080p",
    },
  };

const NANO_SIZE_MAP: Record<string, Record<string, { width: number; height: number }>> = {
  "1K": {
    "1:1": { width: 1024, height: 1024 },
    "16:9": { width: 1360, height: 768 },
    "9:16": { width: 768, height: 1360 },
    "4:3": { width: 1152, height: 864 },
    "3:4": { width: 864, height: 1152 },
    "1:8": { width: 384, height: 3072 },
    "1:4": { width: 512, height: 2048 },
    "4:1": { width: 2048, height: 512 },
    "8:1": { width: 3072, height: 384 },
  },
  "2K": {
    "1:1": { width: 2048, height: 2048 },
    "16:9": { width: 2752, height: 1536 },
    "9:16": { width: 1536, height: 2752 },
    "4:3": { width: 2048, height: 1536 },
    "3:4": { width: 1536, height: 2048 },
    "1:8": { width: 768, height: 6144 },
    "1:4": { width: 1024, height: 4096 },
    "4:1": { width: 4096, height: 1024 },
    "8:1": { width: 6144, height: 768 },
  },
  "4K": {
    "1:1": { width: 4096, height: 4096 },
    "16:9": { width: 5504, height: 3072 },
    "9:16": { width: 3072, height: 5504 },
    "4:3": { width: 4096, height: 3072 },
    "3:4": { width: 3072, height: 4096 },
    "1:8": { width: 1536, height: 12288 },
    "1:4": { width: 2048, height: 8192 },
    "4:1": { width: 8192, height: 2048 },
    "8:1": { width: 12288, height: 1536 },
  },
};

const GPT_SIZE_MAP: Record<string, Record<string, { width: number; height: number }>> = {
  "1K": {
    "1:1": { width: 1024, height: 1024 },
    "5:4": { width: 1120, height: 896 },
    "9:16": { width: 720, height: 1280 },
    "21:9": { width: 1456, height: 624 },
    "16:9": { width: 1280, height: 720 },
    "4:3": { width: 1152, height: 864 },
    "3:2": { width: 1248, height: 832 },
    "4:5": { width: 896, height: 1120 },
    "3:4": { width: 864, height: 1152 },
    "2:3": { width: 832, height: 1248 },
  },
  "2K": {
    "1:1": { width: 2048, height: 2048 },
    "5:4": { width: 2240, height: 1792 },
    "9:16": { width: 1440, height: 2560 },
    "21:9": { width: 3024, height: 1296 },
    "16:9": { width: 2560, height: 1440 },
    "4:3": { width: 2304, height: 1728 },
    "3:2": { width: 2496, height: 1664 },
    "4:5": { width: 1792, height: 2240 },
    "3:4": { width: 1728, height: 2304 },
    "2:3": { width: 1664, height: 2496 },
  },
  "4K": {
    "1:1": { width: 2880, height: 2880 },
    "5:4": { width: 3200, height: 2560 },
    "9:16": { width: 2160, height: 3840 },
    "21:9": { width: 3696, height: 1584 },
    "16:9": { width: 3840, height: 2160 },
    "4:3": { width: 3264, height: 2448 },
    "3:2": { width: 3504, height: 2336 },
    "4:5": { width: 2560, height: 3200 },
    "3:4": { width: 2448, height: 3264 },
    "2:3": { width: 2336, height: 3504 },
  },
};

const PIXEL_SIZE_TO_RATIO: Record<string, string> = {
  "1024x1024": "1:1",
  "1536x1536": "1:1",
  "2048x2048": "1:1",
  "1024x1792": "9:16",
  "1536x2752": "9:16",
  "1792x1024": "16:9",
  "2752x1536": "16:9",
  "2048x1536": "4:3",
  "1536x2048": "3:4",
  "1280x720": "16:9",
  "720x1280": "9:16",
  "1920x1080": "16:9",
  "1080x1920": "9:16",
};

export class AdobeFireflyError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status = 502, code?: string) {
    super(message);
    this.name = "AdobeFireflyError";
    this.status = status;
    this.code = code;
  }
}

export function adobeFireflyApiKey(): string {
  return resolvePublicCred("adobe_firefly_api_key", "ADOBE_FIREFLY_API_KEY") || "projectx_webapp";
}

export function looksLikeAdobeJwt(value: string): boolean {
  const raw = value.trim();
  if (!raw) return false;
  // Avoid treating cookie blobs that happen to have two dots as JWT.
  if (raw.includes(";") || raw.includes(" ") || raw.includes("=")) return false;
  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  return parts.every((p) => p.length > 0);
}

export function extractAdobeCredentialToken(raw: string): string {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^bearer\s+/i.test(value)) return value.replace(/^bearer\s+/i, "").trim();
  // access_token=... (optionally among other key=value pairs)
  const accessMatch = value.match(/(?:^|[;\s])access_token=([^;\s]+)/i);
  if (accessMatch?.[1]) return accessMatch[1].trim();
  return value;
}

export function normalizeAdobeAspectRatio(sizeOrRatio: unknown, fallback = "1:1"): string {
  if (typeof sizeOrRatio !== "string" || !sizeOrRatio.trim()) return fallback;
  let raw = sizeOrRatio.trim().replace(/_/g, ":");
  if (raw.toLowerCase() === "auto") return fallback;

  if (/^\d+:\d+$/.test(raw)) return raw;

  // Short ratio forms like 16x9 / 9x16
  const short = raw.match(/^(\d+)x(\d+)$/i);
  if (short) {
    const a = Number(short[1]);
    const b = Number(short[2]);
    if (a > 0 && b > 0 && a < 100 && b < 100) return `${a}:${b}`;
  }

  const lower = raw.toLowerCase();
  if (PIXEL_SIZE_TO_RATIO[lower]) return PIXEL_SIZE_TO_RATIO[lower];

  // Generic WxH pixel sizes → closest common ratio
  const pixel = lower.match(/^(\d+)x(\d+)$/);
  if (pixel) {
    const w = Number(pixel[1]);
    const h = Number(pixel[2]);
    if (w > 0 && h > 0) {
      if (Math.abs(w - h) / Math.max(w, h) < 0.08) return "1:1";
      if (w > h * 1.5) return "16:9";
      if (h > w * 1.5) return "9:16";
      if (w > h) return "4:3";
      return "3:4";
    }
  }

  return fallback;
}

export function normalizeAdobeOutputResolution(quality: unknown, size: unknown): "1K" | "2K" | "4K" {
  const q = String(quality ?? "").trim().toLowerCase();
  if (q === "4k" || q === "ultra" || q === "high") return "4K";
  if (q === "2k" || q === "hd" || q === "standard" || q === "medium") return "2K";
  if (q === "1k" || q === "low") return "1K";

  const s = String(size ?? "").toLowerCase();
  if (s.includes("4k") || /4096|5504|3840/.test(s)) return "4K";
  if (s.includes("1k") || /1024x1024|768x1360|1360x768/.test(s)) return "1K";
  return "2K";
}

export function resolveAdobeImageModel(model: string): {
  id: AdobeFireflyImageModelId;
  spec: AdobeFireflyImageModelSpec;
} {
  const raw = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/^adobe-firefly\//, "")
    .replace(/^firefly\//, "");

  // Accept long catalog ids like firefly-nano-banana-pro-2k-16x9
  if (raw.includes("nano-banana2") || raw.includes("nano-banana-2") || raw.includes("nano-banana-3")) {
    return { id: "nano-banana-2", spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-2"] };
  }
  if (raw.includes("nano-banana-pro")) {
    return { id: "nano-banana-pro", spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"] };
  }
  if (raw.includes("nano-banana")) {
    return { id: "nano-banana", spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana"] };
  }
  if (raw.includes("gpt-image") || raw === "gpt-image") {
    return { id: "gpt-image", spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image"] };
  }

  if (raw in ADOBE_FIREFLY_IMAGE_MODELS) {
    const id = raw as AdobeFireflyImageModelId;
    return { id, spec: ADOBE_FIREFLY_IMAGE_MODELS[id] };
  }

  // Default to Nano Banana Pro (most common Firefly image path).
  return { id: "nano-banana-pro", spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"] };
}

export function resolveAdobeVideoModel(model: string): {
  id: AdobeFireflyVideoModelId;
  spec: AdobeFireflyVideoModelSpec;
} {
  const raw = String(model || "")
    .trim()
    .toLowerCase()
    .replace(/^adobe-firefly\//, "")
    .replace(/^firefly\//, "");

  if (raw.includes("sora2-pro") || raw.includes("sora-2-pro") || raw.includes("sora2_pro")) {
    return { id: "sora-2-pro", spec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2-pro"] };
  }
  if (raw.includes("sora2") || raw.includes("sora-2") || raw.includes("sora")) {
    return { id: "sora-2", spec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2"] };
  }
  if (raw.includes("veo31-ref") || raw.includes("veo-3.1-ref") || raw.includes("veo31_ref")) {
    return { id: "veo-3.1-ref", spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1-ref"] };
  }
  if (raw.includes("veo31-fast") || raw.includes("veo-3.1-fast") || raw.includes("veo31_fast")) {
    return { id: "veo-3.1-fast", spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1-fast"] };
  }
  if (raw.includes("veo31") || raw.includes("veo-3.1") || raw.includes("veo")) {
    return { id: "veo-3.1", spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1"] };
  }
  if (raw.includes("kling")) {
    return { id: "kling-3", spec: ADOBE_FIREFLY_VIDEO_MODELS["kling-3"] };
  }

  if (raw in ADOBE_FIREFLY_VIDEO_MODELS) {
    const id = raw as AdobeFireflyVideoModelId;
    return { id, spec: ADOBE_FIREFLY_VIDEO_MODELS[id] };
  }

  return { id: "sora-2", spec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2"] };
}

function gptDetailLevel(quality: unknown): number {
  const q = String(quality ?? "low").trim().toLowerCase();
  if (q === "high" || q === "4k" || q === "ultra") return 5;
  if (q === "medium" || q === "2k" || q === "standard" || q === "hd") return 3;
  return 1;
}

export function buildAdobeImagePayload(opts: {
  prompt: string;
  aspectRatio: string;
  outputResolution: "1K" | "2K" | "4K";
  modelSpec: AdobeFireflyImageModelSpec;
  quality?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
}): Record<string, unknown> {
  const ratio = opts.aspectRatio === "auto" ? "1:1" : opts.aspectRatio || "1:1";
  const seeds = [typeof opts.seed === "number" ? opts.seed : Math.floor(Date.now() % 999999)];
  const negative = String(opts.negativePrompt || "").trim();
  const genSettings: Record<string, unknown> = {};
  if (negative) {
    genSettings.avoidKeywords = negative
      .replace(/;/g, ",")
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
  }

  if (opts.modelSpec.family === "gpt-image") {
    const sizeMap = GPT_SIZE_MAP[opts.outputResolution] || GPT_SIZE_MAP["2K"];
    const pixel = sizeMap[ratio] || sizeMap["1:1"];
    const payload: Record<string, unknown> = {
      modelId: opts.modelSpec.upstreamModelId,
      modelVersion: opts.modelSpec.upstreamModelVersion,
      n: 1,
      prompt: opts.prompt,
      seeds,
      output: { storeInputs: true },
      referenceBlobs: [],
      generationMetadata: { module: "text2image", submodule: "ff-image-generate" },
      modelSpecificPayload: { size: `${pixel.width}x${pixel.height}` },
      outputResolution: opts.outputResolution,
      generationSettings: {
        detailLevel: gptDetailLevel(opts.quality),
        ...genSettings,
      },
      size: pixel,
    };
    if (opts.sourceImageIds?.length) {
      payload.generationMetadata = { module: "image2image", submodule: "ff-image-generate" };
      payload.referenceBlobs = opts.sourceImageIds.map((id) => ({ id, usage: "subject" }));
      payload.modelSpecificPayload = {};
    }
    return payload;
  }

  const sizeMap = NANO_SIZE_MAP[opts.outputResolution] || NANO_SIZE_MAP["2K"];
  const pixel = sizeMap[ratio] || sizeMap["1:1"];
  const payload: Record<string, unknown> = {
    modelId: opts.modelSpec.upstreamModelId,
    modelVersion: opts.modelSpec.upstreamModelVersion,
    n: 1,
    prompt: opts.prompt,
    size: pixel,
    seeds,
    groundSearch: false,
    skipCai: false,
    output: { storeInputs: true },
    generationMetadata: { module: "text2image", submodule: "ff-image-generate" },
    modelSpecificPayload: {
      parameters: { addWatermark: false },
      aspectRatio: ratio,
    },
    referenceBlobs: [],
  };
  if (Object.keys(genSettings).length) payload.generationSettings = genSettings;

  if (opts.sourceImageIds?.length) {
    payload.generationMetadata = { module: "image2image", submodule: "ff-image-generate" };
    payload.referenceBlobs = opts.sourceImageIds.map((id) => ({ id, usage: "general" }));
  }
  return payload;
}

function videoSize(aspectRatio: string, resolution: string): { width: number; height: number } {
  const res = String(resolution || "720p").toLowerCase();
  const short = res.includes("1080") ? 1080 : res.includes("480") ? 480 : 720;
  const ratio = aspectRatio === "9:16" ? "9:16" : aspectRatio === "1:1" ? "1:1" : "16:9";
  if (ratio === "1:1") return { width: short, height: short };
  if (ratio === "9:16") return { width: Math.round((short * 9) / 16), height: short };
  return { width: Math.round((short * 16) / 9), height: short };
}

export function buildAdobeVideoPayload(opts: {
  prompt: string;
  aspectRatio: string;
  duration: number;
  modelSpec: AdobeFireflyVideoModelSpec;
  resolution?: string;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  generateAudio?: boolean;
}): Record<string, unknown> {
  const seedVal = typeof opts.seed === "number" ? opts.seed : Math.floor(Date.now() % 999999);
  const aspect = opts.aspectRatio === "auto" ? "16:9" : opts.aspectRatio || "16:9";
  const duration = Math.max(1, Math.min(30, Math.floor(opts.duration || opts.modelSpec.defaultDuration)));
  const resolution = opts.resolution || opts.modelSpec.defaultResolution;
  const vidSize = videoSize(aspect, resolution);
  const engine = opts.modelSpec.engine;
  const sourceImageIds = opts.sourceImageIds || [];
  const negative = String(opts.negativePrompt || "");

  if (engine === "veo31-standard" || engine === "veo31-fast") {
    const payload: Record<string, unknown> = {
      n: 1,
      seeds: [seedVal],
      modelId: "veo",
      modelVersion:
        opts.modelSpec.modelVersion ||
        (engine === "veo31-fast" ? "3.1-fast-generate" : "3.1-generate"),
      output: { storeInputs: true },
      prompt: opts.prompt,
      size: vidSize,
      generateAudio: opts.generateAudio !== false,
      referenceBlobs: [] as Array<Record<string, unknown>>,
      generationMetadata: { module: "text2video" },
      modelSpecificPayload: {
        parameters: {
          durationSeconds: duration,
          aspectRatio: aspect,
          addWaterMark: false,
        },
      },
    };
    if (sourceImageIds.length) {
      const refs = payload.referenceBlobs as Array<Record<string, unknown>>;
      if (opts.modelSpec.referenceMode === "image") {
        for (const imageId of sourceImageIds.slice(0, 3)) {
          refs.push({ id: String(imageId), usage: "asset" });
        }
      } else {
        sourceImageIds.slice(0, 2).forEach((imageId, idx) => {
          refs.push({ id: String(imageId), usage: "general", order: idx + 1 });
        });
      }
      payload.generationMetadata = { module: "image2video" };
    }
    if (negative) payload.negativePrompt = negative;
    return payload;
  }

  if (engine === "kling3") {
    const payload: Record<string, unknown> = {
      n: 1,
      seeds: [seedVal],
      modelId: "kling",
      modelVersion: "kling_v3_standard_i2v",
      output: { storeInputs: true },
      prompt: opts.prompt,
      size: vidSize,
      generationMetadata: {
        module: sourceImageIds.length ? "image2video" : "text2video",
      },
      duration,
      generationSettings: { aspectRatio: aspect },
      referenceBlobs: [] as Array<Record<string, unknown>>,
    };
    if (sourceImageIds.length) {
      const refs = payload.referenceBlobs as Array<Record<string, unknown>>;
      sourceImageIds.slice(0, 2).forEach((imageId, idx) => {
        refs.push({ id: String(imageId), usage: "frame", order: idx + 1 });
      });
    }
    if (negative) payload.negativePrompt = negative;
    return payload;
  }

  // Sora 2 / Sora 2 Pro
  const promptJson = JSON.stringify({
    prompt: opts.prompt,
    duration,
    ...(negative ? { negative_prompt: negative } : {}),
  });
  const payload: Record<string, unknown> = {
    n: 1,
    seeds: [seedVal],
    modelId: "sora",
    modelVersion: engine === "sora2-pro" ? "sora-2-pro" : "sora-2",
    size: vidSize,
    duration,
    fps: 24,
    prompt: promptJson,
    generationMetadata: { module: sourceImageIds.length ? "image2video" : "text2video" },
    model: opts.modelSpec.upstreamModel,
    generateLoop: false,
    transparentBackground: false,
    seed: String(seedVal),
    locale: "en-US",
    camera: { angle: "none", shotSize: "none", motion: null, promptStyle: null },
    negativePrompt: negative,
    jobMode: "standard",
    debugGenerationEndpoint: "",
    referenceBlobs: [] as Array<Record<string, unknown>>,
    referenceFrames: [] as Array<Record<string, unknown> | null>,
    referenceVideo: null,
    cameraMotionReferenceVideo: null,
    characterReference: null,
    editReferenceVideo: null,
    output: { storeInputs: true },
  };
  if (sourceImageIds.length) {
    const firstId = String(sourceImageIds[0]);
    payload.referenceBlobs = [{ id: firstId, usage: "general", promptReference: 1 }];
    const frames: Array<Record<string, unknown> | null> = [{ localBlobRef: firstId }, null];
    if (sourceImageIds.length > 1) {
      const lastId = String(sourceImageIds[1]);
      (payload.referenceBlobs as Array<Record<string, unknown>>).push({
        id: lastId,
        usage: "general",
        promptReference: 2,
      });
      frames[1] = { localBlobRef: lastId };
    }
    payload.referenceFrames = frames;
  }
  return payload;
}

function browserHeaders(): Record<string, string> {
  return {
    "user-agent": DEFAULT_USER_AGENT,
    origin: "https://new.express.adobe.com",
    referer: "https://new.express.adobe.com/",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": DEFAULT_SEC_CH_UA,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
  };
}

export function buildAdobeSubmitHeaders(accessToken: string): Record<string, string> {
  return {
    ...browserHeaders(),
    Authorization: `Bearer ${accessToken}`,
    "x-api-key": adobeFireflyApiKey(),
    "content-type": "application/json",
    accept: "*/*",
  };
}

export function buildAdobePollHeaders(accessToken: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    accept: "*/*",
    referer: "https://new.express.adobe.com/",
    origin: "https://new.express.adobe.com",
    "user-agent": DEFAULT_USER_AGENT,
    "x-api-key": adobeFireflyApiKey(),
    "content-type": "application/json",
  };
}

export function extractAdobeResultLink(
  headers: Headers | Record<string, string | null | undefined>,
  body: unknown
): string {
  const get = (name: string): string => {
    if (typeof (headers as Headers).get === "function") {
      return String((headers as Headers).get(name) || "").trim();
    }
    const rec = headers as Record<string, string | null | undefined>;
    const key = Object.keys(rec).find((k) => k.toLowerCase() === name.toLowerCase());
    return String((key ? rec[key] : "") || "").trim();
  };

  const override = get("x-override-status-link");
  if (override) return override;

  const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const links = data.links && typeof data.links === "object" ? (data.links as Record<string, unknown>) : {};
  const result = links.result;
  if (typeof result === "string" && result) return result;
  if (result && typeof result === "object") {
    const href = (result as Record<string, unknown>).href;
    if (typeof href === "string" && href) return href;
  }
  if (typeof data.statusUrl === "string" && data.statusUrl) return data.statusUrl;
  if (typeof data.resultUrl === "string" && data.resultUrl) return data.resultUrl;
  return "";
}

export function normalizeAdobePollUrl(rawUrl: string): string {
  const url = String(rawUrl || "").trim();
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    // Some Firefly EPO hosts need a BKS job result rewrite; only rewrite known pattern.
    if (host.startsWith("firefly-epo") && parsed.pathname.includes("/v2/status")) {
      const jobId = parsed.pathname.split("/").filter(Boolean).pop() || "";
      if (jobId) {
        const hostSuffix = host.slice("firefly-epo".length).split(".")[0] || "";
        return `https://bks-epo${hostSuffix}.adobe.io/v2/jobs/result/${jobId}?host=${host}/`;
      }
    }
  } catch {
    // keep original
  }
  return url;
}

export function extractAdobeMediaUrl(
  latest: unknown,
  kind: "image" | "video"
): string | null {
  const body = latest && typeof latest === "object" ? (latest as Record<string, unknown>) : {};
  const outputs = Array.isArray(body.outputs) ? body.outputs : [];
  if (outputs.length > 0) {
    const first = outputs[0] && typeof outputs[0] === "object" ? (outputs[0] as Record<string, unknown>) : {};
    const media =
      kind === "image"
        ? first.image && typeof first.image === "object"
          ? (first.image as Record<string, unknown>)
          : null
        : first.video && typeof first.video === "object"
          ? (first.video as Record<string, unknown>)
          : null;
    const url = media && typeof media.presignedUrl === "string" ? media.presignedUrl : null;
    if (url) return url;
  }

  // Fallback recursive search for a presigned URL.
  const found = findPresignedUrl(latest, kind === "image" ? [".png", ".jpg", ".jpeg", ".webp"] : [".mp4", ".webm"]);
  return found;
}

function findPresignedUrl(obj: unknown, exts: string[]): string | null {
  if (!obj) return null;
  if (typeof obj === "string") {
    const s = obj.trim();
    if (/^https?:\/\//i.test(s) && (exts.some((e) => s.toLowerCase().includes(e)) || s.includes("presigned") || s.includes("X-Amz"))) {
      return s;
    }
    return null;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findPresignedUrl(item, exts);
      if (found) return found;
    }
    return null;
  }
  if (typeof obj === "object") {
    const rec = obj as Record<string, unknown>;
    if (typeof rec.presignedUrl === "string" && rec.presignedUrl) return rec.presignedUrl;
    for (const value of Object.values(rec)) {
      const found = findPresignedUrl(value, exts);
      if (found) return found;
    }
  }
  return null;
}

export function isAdobeJobInProgress(status: string): boolean {
  const s = String(status || "").toUpperCase();
  return (
    !s ||
    s === "IN_PROGRESS" ||
    s === "PENDING" ||
    s === "RUNNING" ||
    s === "QUEUED" ||
    s === "PROCESSING" ||
    s === "SUBMITTED"
  );
}

export function isAdobeJobFailed(status: string): boolean {
  const s = String(status || "").toUpperCase();
  return s === "FAILED" || s === "CANCELLED" || s === "ERROR" || s === "CANCELED";
}

/**
 * Exchange a browser Cookie header for an Adobe IMS access_token.
 * Uses the public Express client_id (projectx_webapp) + firefly_api scope.
 */
export async function exchangeAdobeCookieForAccessToken(
  cookieHeader: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const cookie = String(cookieHeader || "").trim();
  if (!cookie) {
    throw new AdobeFireflyError("Adobe Firefly cookie is empty", 401, "missing_cookie");
  }

  const form = new URLSearchParams({
    client_id: adobeFireflyApiKey(),
    guest_allowed: "true",
    scope: ADOBE_FIREFLY_IMS_SCOPE,
  });

  const resp = await fetchImpl(ADOBE_FIREFLY_IMS_REFRESH_URL, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Cookie: cookie,
      Origin: "https://new.express.adobe.com",
      Referer: "https://new.express.adobe.com/",
      "User-Agent": DEFAULT_USER_AGENT,
    },
    body: form.toString(),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe IMS token exchange failed (${resp.status}): ${sanitizeErrorMessage(text.slice(0, 200))}`,
      resp.status === 401 || resp.status === 403 ? 401 : 502,
      "ims_refresh_failed"
    );
  }

  const data = (await resp.json().catch(() => null)) as { access_token?: string } | null;
  const token = String(data?.access_token || "").trim();
  if (!token) {
    throw new AdobeFireflyError("Adobe IMS response missing access_token", 401, "ims_no_token");
  }
  return token;
}

/**
 * Resolve credentials.apiKey / accessToken / providerSpecificData.cookie into
 * a usable IMS access token. Accepts JWT access tokens or browser Cookie headers.
 */
export async function resolveAdobeAccessToken(
  credentials:
    | {
        apiKey?: string;
        accessToken?: string;
        providerSpecificData?: { cookie?: unknown; access_token?: unknown; accessToken?: unknown } | null;
      }
    | null
    | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const psd = credentials?.providerSpecificData;
  const fromPsd =
    (psd && typeof psd.cookie === "string" && psd.cookie.trim()) ||
    (psd && typeof psd.access_token === "string" && psd.access_token.trim()) ||
    (psd && typeof psd.accessToken === "string" && psd.accessToken.trim()) ||
    "";
  const raw = extractAdobeCredentialToken(
    String(credentials?.apiKey || credentials?.accessToken || fromPsd || "").trim()
  );
  if (!raw) {
    throw new AdobeFireflyError(
      "Adobe Firefly credentials missing. Paste an IMS access_token or the full Cookie header from firefly.adobe.com / new.express.adobe.com.",
      401,
      "missing_credentials"
    );
  }

  if (looksLikeAdobeJwt(raw)) return raw;

  // Cookie header (or other non-JWT secret) → IMS exchange
  return exchangeAdobeCookieForAccessToken(raw, fetchImpl);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollAdobeJob(opts: {
  pollUrl: string;
  accessToken: string;
  kind: "image" | "video";
  timeoutMs: number;
  pollIntervalMs?: number;
  fetchImpl?: typeof fetch;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
}): Promise<{ mediaUrl: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const deadline = Date.now() + opts.timeoutMs;
  const interval = opts.pollIntervalMs && opts.pollIntervalMs > 0 ? opts.pollIntervalMs : DEFAULT_POLL_INTERVAL_MS;
  let attempt = 0;
  let latest: unknown = {};

  while (Date.now() < deadline) {
    attempt += 1;
    const pollResp = await fetchImpl(opts.pollUrl, {
      method: "GET",
      headers: buildAdobePollHeaders(opts.accessToken),
    });

    if (pollResp.status === 401 || pollResp.status === 403) {
      const accessError = pollResp.headers.get("x-access-error") || "";
      if (accessError === "taste_exhausted") {
        throw new AdobeFireflyError("Adobe Firefly quota exhausted for this account", 429, "quota_exhausted");
      }
      throw new AdobeFireflyError("Adobe Firefly token invalid or expired", 401, "auth");
    }

    if (!pollResp.ok) {
      const text = await pollResp.text().catch(() => "");
      if (pollResp.status === 429 || pollResp.status === 451 || pollResp.status >= 500) {
        opts.log?.info?.("ADOBE-FIREFLY", `poll temporary ${pollResp.status}, attempt #${attempt}`);
        await sleep(interval);
        continue;
      }
      throw new AdobeFireflyError(
        `Adobe Firefly poll failed (${pollResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
        502
      );
    }

    latest = await pollResp.json().catch(() => ({}));
    const statusHeader = String(pollResp.headers.get("x-task-status") || "").toUpperCase();
    const statusVal = String(
      (latest && typeof latest === "object" ? (latest as Record<string, unknown>).status : "") ||
        statusHeader ||
        ""
    ).toUpperCase();

    const mediaUrl = extractAdobeMediaUrl(latest, opts.kind);
    if (mediaUrl) {
      return { mediaUrl, latest };
    }

    if (isAdobeJobFailed(statusVal)) {
      throw new AdobeFireflyError(
        `Adobe Firefly ${opts.kind} job failed: ${sanitizeErrorMessage(JSON.stringify(latest).slice(0, 300))}`,
        502,
        "job_failed"
      );
    }

    opts.log?.info?.("ADOBE-FIREFLY", `${opts.kind} pending #${attempt} status=${statusVal || "unknown"}`);
    await sleep(interval);
  }

  throw new AdobeFireflyError(`Adobe Firefly ${opts.kind} generation timed out`, 504, "timeout");
}

export async function adobeFireflyGenerateImage(opts: {
  accessToken: string;
  prompt: string;
  model: string;
  size?: unknown;
  aspectRatio?: unknown;
  quality?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
}): Promise<{ url: string; b64_json?: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const { spec } = resolveAdobeImageModel(opts.model);
  const aspectRatio = normalizeAdobeAspectRatio(opts.aspectRatio ?? opts.size, "1:1");
  const outputResolution = normalizeAdobeOutputResolution(opts.quality, opts.size);
  const payload = buildAdobeImagePayload({
    prompt: opts.prompt,
    aspectRatio,
    outputResolution,
    modelSpec: spec,
    quality: opts.quality,
    seed: opts.seed,
    sourceImageIds: opts.sourceImageIds,
    negativePrompt: opts.negativePrompt,
  });

  const submitResp = await fetchImpl(ADOBE_FIREFLY_IMAGE_SUBMIT_URL, {
    method: "POST",
    headers: buildAdobeSubmitHeaders(opts.accessToken),
    body: JSON.stringify(payload),
  });

  if (submitResp.status === 401 || submitResp.status === 403) {
    const accessError = submitResp.headers.get("x-access-error") || "";
    if (accessError === "taste_exhausted") {
      throw new AdobeFireflyError("Adobe Firefly quota exhausted for this account", 429, "quota_exhausted");
    }
    throw new AdobeFireflyError("Adobe Firefly token invalid or expired", 401, "auth");
  }

  if (!submitResp.ok) {
    const text = await submitResp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe Firefly image submit failed (${submitResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
      submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
    );
  }

  const submitData = await submitResp.json().catch(() => ({}));
  let pollUrl = extractAdobeResultLink(submitResp.headers, submitData);
  if (!pollUrl) {
    throw new AdobeFireflyError("Adobe Firefly image submit succeeded but no poll URL was returned", 502);
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken: opts.accessToken,
    kind: "image",
    timeoutMs: opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_IMAGE_TIMEOUT_MS,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, latest };
}

export async function adobeFireflyGenerateVideo(opts: {
  accessToken: string;
  prompt: string;
  model: string;
  size?: unknown;
  aspectRatio?: unknown;
  duration?: unknown;
  quality?: unknown;
  resolution?: unknown;
  seed?: number;
  sourceImageIds?: string[];
  negativePrompt?: string;
  generateAudio?: boolean;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
}): Promise<{ url: string; b64_json?: string; format: string; latest: unknown }> {
  const fetchImpl = opts.fetchImpl || fetch;
  const { spec } = resolveAdobeVideoModel(opts.model);
  const aspectRatio = normalizeAdobeAspectRatio(opts.aspectRatio ?? opts.size, "16:9");
  const duration =
    typeof opts.duration === "number"
      ? opts.duration
      : typeof opts.duration === "string" && opts.duration.trim()
        ? Number(opts.duration)
        : spec.defaultDuration;
  const resolution =
    typeof opts.resolution === "string" && opts.resolution.trim()
      ? opts.resolution
      : typeof opts.quality === "string" && /p$/i.test(opts.quality)
        ? opts.quality
        : spec.defaultResolution;

  const payload = buildAdobeVideoPayload({
    prompt: opts.prompt,
    aspectRatio,
    duration: Number.isFinite(duration) ? Number(duration) : spec.defaultDuration,
    modelSpec: spec,
    resolution,
    seed: opts.seed,
    sourceImageIds: opts.sourceImageIds,
    negativePrompt: opts.negativePrompt,
    generateAudio: opts.generateAudio,
  });

  const submitResp = await fetchImpl(ADOBE_FIREFLY_VIDEO_SUBMIT_URL, {
    method: "POST",
    headers: buildAdobeSubmitHeaders(opts.accessToken),
    body: JSON.stringify(payload),
  });

  if (submitResp.status === 401 || submitResp.status === 403) {
    const accessError = submitResp.headers.get("x-access-error") || "";
    if (accessError === "taste_exhausted") {
      throw new AdobeFireflyError("Adobe Firefly quota exhausted for this account", 429, "quota_exhausted");
    }
    throw new AdobeFireflyError("Adobe Firefly token invalid or expired", 401, "auth");
  }

  if (!submitResp.ok) {
    const text = await submitResp.text().catch(() => "");
    throw new AdobeFireflyError(
      `Adobe Firefly video submit failed (${submitResp.status}): ${sanitizeErrorMessage(text.slice(0, 300))}`,
      submitResp.status >= 400 && submitResp.status < 500 ? submitResp.status : 502
    );
  }

  const submitData = await submitResp.json().catch(() => ({}));
  let pollUrl = extractAdobeResultLink(submitResp.headers, submitData);
  if (!pollUrl) {
    throw new AdobeFireflyError("Adobe Firefly video submit succeeded but no poll URL was returned", 502);
  }
  pollUrl = normalizeAdobePollUrl(pollUrl);

  const { mediaUrl, latest } = await pollAdobeJob({
    pollUrl,
    accessToken: opts.accessToken,
    kind: "video",
    timeoutMs: opts.timeoutMs && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_VIDEO_TIMEOUT_MS,
    fetchImpl,
    log: opts.log,
  });

  return { url: mediaUrl, format: "mp4", latest };
}
