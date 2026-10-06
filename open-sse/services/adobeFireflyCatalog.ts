/**
 * Adobe Firefly — endpoint URLs, tunables, and the image/video model catalog.
 *
 * Pure data: no I/O, no side effects. Split out of adobeFireflyClient.ts.
 */

export const ADOBE_FIREFLY_IMAGE_SUBMIT_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async";
export const ADOBE_FIREFLY_VIDEO_SUBMIT_URL =
  "https://firefly-3p.ff.adobe.io/v2/3p-videos/generate-async";
export const ADOBE_FIREFLY_IMAGE_UPLOAD_URL = "https://firefly-3p.ff.adobe.io/v2/storage/image";
export const ADOBE_FIREFLY_MODELS_DISCOVERY_URL =
  "https://firefly-3p.ff.adobe.io/v2/models/discovery";
export const ADOBE_FIREFLY_CREDITS_BALANCE_URL = "https://firefly.adobe.io/v1/credits/balance";
export const ADOBE_FIREFLY_IMS_REFRESH_URL =
  "https://adobeid-na1.services.adobe.com/ims/check/v6/token?jslVersion=v2-v0.48.0-1-g1e322cb";
/** Scope set observed on live firefly.adobe.com IMS access tokens. */
export const ADOBE_FIREFLY_IMS_SCOPE =
  "AdobeID,firefly_api,openid,pps.read,pps.write,additional_info.projectedProductContext," +
  "additional_info.ownerOrg,uds_read,uds_write,ab.manage,read_organizations," +
  "additional_info.roles,account_cluster.read,creative_production,tk_platform," +
  "tk_platform_sync,profile";

export const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
export const DEFAULT_SEC_CH_UA = '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"';
export const DEFAULT_POLL_INTERVAL_MS = 3000;
export const DEFAULT_IMAGE_TIMEOUT_MS = 180_000;
export const DEFAULT_VIDEO_TIMEOUT_MS = 300_000;
export const FIREFLY_ORIGIN = "https://firefly.adobe.com";
export const FIREFLY_REFERER = "https://firefly.adobe.com/";

export type AdobeFireflyImageModelId =
  | "nano-banana-pro"
  | "nano-banana"
  | "nano-banana-2"
  | "gpt-image"
  | "gpt-image-2"
  | "gpt-image-1.5"
  | "flux-2"
  | "flux-pro"
  | "flux-ultra"
  | "seedream-4"
  | "seedream-5-lite"
  | "runway-gen4-image";

export type AdobeFireflyVideoModelId =
  "sora-2" | "sora-2-pro" | "veo-3.1" | "veo-3.1-fast" | "veo-3.1-ref" | "kling-3";

export interface AdobeFireflyImageModelSpec {
  upstreamModelId: string;
  upstreamModelVersion: string;
  /** Payload builder family — nano uses Gemini-style size maps; gpt-image uses OpenAI detail levels. */
  family: "nano" | "gpt-image" | "generic";
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

/**
 * Upstream modelId/modelVersion pairs from firefly-3p models/discovery
 * (captured 2026-07 — see adobe/get_models.txt). Friendly catalog ids map here.
 */
export const ADOBE_FIREFLY_IMAGE_MODELS: Record<
  AdobeFireflyImageModelId,
  AdobeFireflyImageModelSpec
> = {
  // Gemini 3.0 (Nano Banana Pro) — discovery: gemini-flash / nano-banana-2
  "nano-banana-pro": {
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana-2",
    family: "nano",
  },
  // Gemini 2.5 (Nano Banana) — discovery: gemini-flash / nano-banana
  "nano-banana": {
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana",
    family: "nano",
  },
  // Gemini 3.1 (Nano Banana 2) — discovery: gemini-flash / nano-banana-3
  "nano-banana-2": {
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana-3",
    family: "nano",
  },
  // GPT Image 2 — discovery modelVersion "2" (get_models: modelDisplayName "GPT Image 2")
  "gpt-image": {
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "2",
    family: "gpt-image",
  },
  // Explicit catalog alias so pickers show "gpt-image-2" distinctly
  "gpt-image-2": {
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "2",
    family: "gpt-image",
  },
  "gpt-image-1.5": {
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "1.5",
    family: "gpt-image",
  },
  "flux-2": {
    upstreamModelId: "flux",
    upstreamModelVersion: "2",
    family: "generic",
  },
  "flux-pro": {
    upstreamModelId: "flux",
    upstreamModelVersion: "fluxPro",
    family: "generic",
  },
  "flux-ultra": {
    upstreamModelId: "flux",
    upstreamModelVersion: "fluxUltra",
    family: "generic",
  },
  "seedream-4": {
    upstreamModelId: "seedream",
    upstreamModelVersion: "seedream_v4",
    family: "generic",
  },
  "seedream-5-lite": {
    upstreamModelId: "seedream",
    upstreamModelVersion: "seedream_v5_lite",
    family: "generic",
  },
  "runway-gen4-image": {
    upstreamModelId: "runway-gen4-image",
    upstreamModelVersion: "gen4_image",
    family: "generic",
  },
};

export const ADOBE_FIREFLY_VIDEO_MODELS: Record<
  AdobeFireflyVideoModelId,
  AdobeFireflyVideoModelSpec
> = {
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

export const NANO_SIZE_MAP: Record<string, Record<string, { width: number; height: number }>> = {
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

export const PIXEL_SIZE_TO_RATIO: Record<string, string> = {
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
