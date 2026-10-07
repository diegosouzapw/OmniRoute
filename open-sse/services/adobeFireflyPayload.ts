/**
 * Adobe Firefly — model resolution and generate-request payload construction.
 *
 * Split out of adobeFireflyClient.ts.
 */

import {
  ADOBE_FIREFLY_IMAGE_MODELS,
  ADOBE_FIREFLY_VIDEO_MODELS,
  type AdobeFireflyImageModelId,
  type AdobeFireflyImageModelSpec,
  type AdobeFireflyVideoModelId,
  type AdobeFireflyVideoModelSpec,
  NANO_SIZE_MAP,
  PIXEL_SIZE_TO_RATIO,
} from "./adobeFireflyCatalog.ts";

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

export function normalizeAdobeOutputResolution(
  quality: unknown,
  size: unknown
): "1K" | "2K" | "4K" {
  const q = String(quality ?? "")
    .trim()
    .toLowerCase();
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
  if (
    raw.includes("nano-banana2") ||
    raw.includes("nano-banana-2") ||
    raw.includes("nano-banana-3")
  ) {
    return {
      id: "nano-banana-2",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-2"],
    };
  }
  if (raw.includes("nano-banana-pro")) {
    return {
      id: "nano-banana-pro",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"],
    };
  }
  if (raw.includes("nano-banana")) {
    return {
      id: "nano-banana",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana"],
    };
  }
  if (raw.includes("gpt-image-1.5") || raw.includes("gpt-image1.5")) {
    return {
      id: "gpt-image-1.5",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image-1.5"],
    };
  }
  // Prefer explicit "2" / "gpt-image-2" before generic gpt-image
  if (
    raw === "gpt-image-2" ||
    raw.includes("gpt-image-2") ||
    raw.includes("gptimage2") ||
    raw === "gpt-image" ||
    raw.includes("gpt-image")
  ) {
    // Bare gpt-image and gpt-image-2 both map to upstream version "2" (GPT Image 2).
    if (raw.includes("1.5")) {
      return {
        id: "gpt-image-1.5",
        spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image-1.5"],
      };
    }
    const id =
      raw.includes("gpt-image-2") || raw.includes("gptimage2") ? "gpt-image-2" : "gpt-image";
    return {
      id: id as AdobeFireflyImageModelId,
      spec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image"],
    };
  }
  if (raw.includes("flux-ultra") || raw.includes("fluxultra")) {
    return { id: "flux-ultra", spec: ADOBE_FIREFLY_IMAGE_MODELS["flux-ultra"] };
  }
  if (raw.includes("flux-pro") || raw.includes("fluxpro")) {
    return { id: "flux-pro", spec: ADOBE_FIREFLY_IMAGE_MODELS["flux-pro"] };
  }
  if (raw.includes("flux")) {
    return { id: "flux-2", spec: ADOBE_FIREFLY_IMAGE_MODELS["flux-2"] };
  }
  if (raw.includes("seedream-5") || raw.includes("seedream_v5")) {
    return {
      id: "seedream-5-lite",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["seedream-5-lite"],
    };
  }
  if (raw.includes("seedream")) {
    return { id: "seedream-4", spec: ADOBE_FIREFLY_IMAGE_MODELS["seedream-4"] };
  }
  if (raw.includes("runway") && raw.includes("image")) {
    return {
      id: "runway-gen4-image",
      spec: ADOBE_FIREFLY_IMAGE_MODELS["runway-gen4-image"],
    };
  }

  if (raw in ADOBE_FIREFLY_IMAGE_MODELS) {
    const id = raw as AdobeFireflyImageModelId;
    return { id, spec: ADOBE_FIREFLY_IMAGE_MODELS[id] };
  }

  // Default to Nano Banana Pro (most common Firefly image path).
  return {
    id: "nano-banana-pro",
    spec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"],
  };
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
    return {
      id: "veo-3.1-ref",
      spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1-ref"],
    };
  }
  if (raw.includes("veo31-fast") || raw.includes("veo-3.1-fast") || raw.includes("veo31_fast")) {
    return {
      id: "veo-3.1-fast",
      spec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1-fast"],
    };
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

/**
 * Map OpenAI/VibeProxy quality tiers onto Firefly gpt-image `generationSettings.detailLevel`.
 * Wire range is integer 1–5 (discovery schema). Default is **maximal (5)** —
 * the SPA often defaults to 3, but detail is critical for GPT Image 2 output quality.
 * Explicit low/medium still honor the caller's choice.
 */
function gptDetailLevel(quality: unknown): number {
  // Live firefly.adobe.com default for gpt-image is detailLevel 3 (medium).
  const q = String(quality ?? "medium")
    .trim()
    .toLowerCase();
  if (q === "high" || q === "4k" || q === "ultra") return 5;
  if (q === "low" || q === "1k") return 1;
  if (q === "medium" || q === "2k" || q === "standard" || q === "hd" || q === "auto") return 3;
  return 3;
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
    // Live firefly.adobe.com body (adobe/image_generate.txt) — no top-level size /
    // outputResolution; modelSpecificPayload.size is "auto".
    const payload: Record<string, unknown> = {
      n: 1,
      seeds,
      output: { storeInputs: true },
      prompt: opts.prompt,
      referenceBlobs: [] as Array<Record<string, unknown>>,
      modelSpecificPayload: { size: "auto" },
      modelId: opts.modelSpec.upstreamModelId,
      modelVersion: opts.modelSpec.upstreamModelVersion,
      generationMetadata: {
        module: "text2image",
        submodule: "ff-image-generate",
      },
      generationSettings: {
        detailLevel: gptDetailLevel(opts.quality),
        ...genSettings,
      },
    };
    if (opts.sourceImageIds?.length) {
      // gpt-image subject references (mask path uses separate mask blob when present).
      payload.generationMetadata = { module: "image2image", submodule: "ff-image-generate" };
      payload.referenceBlobs = opts.sourceImageIds.map((id) => ({
        id: String(id),
        usage: "subject",
      }));
      payload.modelSpecificPayload = {};
    }
    return payload;
  }

  // nano (Gemini Flash) + generic (Flux / Seedream / Runway image): same 3P image shape.
  // Live capture (web_providers/adobe_atach_images.txt): referenceBlobs with usage "general"
  // keep module "text2image" (not image2image) for nano multi-ref composition.
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
    generationMetadata: {
      module: "text2image",
      submodule: "ff-image-generate",
    },
    modelSpecificPayload: {
      parameters: { addWatermark: false },
      aspectRatio: ratio,
    },
    referenceBlobs: [] as Array<Record<string, unknown>>,
  };
  if (Object.keys(genSettings).length) payload.generationSettings = genSettings;

  if (opts.sourceImageIds?.length) {
    payload.referenceBlobs = opts.sourceImageIds.map((id) => ({
      id: String(id),
      usage: "general",
    }));
    // Flux / Seedream / Runway image historically used image2image; nano keeps text2image.
    if (opts.modelSpec.family === "generic") {
      payload.generationMetadata = {
        module: "image2image",
        submodule: "ff-image-generate",
      };
    }
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
  const duration = Math.max(
    1,
    Math.min(30, Math.floor(opts.duration || opts.modelSpec.defaultDuration))
  );
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
    generationMetadata: {
      module: sourceImageIds.length ? "image2video" : "text2video",
    },
    model: opts.modelSpec.upstreamModel,
    generateLoop: false,
    transparentBackground: false,
    seed: String(seedVal),
    locale: "en-US",
    camera: {
      angle: "none",
      shotSize: "none",
      motion: null,
      promptStyle: null,
    },
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
