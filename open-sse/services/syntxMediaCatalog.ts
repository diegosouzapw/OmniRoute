/**
 * SYNTX.ai media catalog — seed lists plus live GET /api/v1/ai + /api/v1/ai/models.
 *
 * Chat/LLM models stay in syntxModels.ts. This file is image / video / audio /
 * music / upscale / transcribe only so chat generation is untouched.
 *
 * Model ids are `{ai_name}/{model_type}` so OmniRoute `syntx/{id}` parses as
 * provider=syntx, model=`sora-images/gpt-image-2`.
 *
 * Each seed row carries the selectable params the SPA/MCP actually send
 * (aspect ratio vs pixel size vs 1K/2K, quality, duration). Registries
 * expose those as mediaCapabilities so the Media page does not stamp one
 * generic size list on every SYNTX model.
 */
import { SYNTX_API_BASE, syntxAuthHeaders } from "./syntxAuth.ts";

export type SyntxMediaKind = "image" | "video" | "speech" | "music" | "upscale" | "transcription";

export type SyntxMediaCaps = {
  supportedSizes?: string[];
  supportedAspectRatios?: string[];
  supportedResolutions?: string[];
  supportedDurations?: number[];
  durationDefault?: number;
  maxReferenceItems?: number;
  imageRequired?: boolean;
};

export type SyntxMediaModel = {
  id: string;
  name: string;
  aiName: string;
  modelType: string;
  kind: SyntxMediaKind;
  inputModalities?: string[];
  supportedSizes?: string[];
  caps?: SyntxMediaCaps;
};

export const SYNTX_MEDIA_MODELS_URL = `${SYNTX_API_BASE}/api/v1/ai/models`;
export const SYNTX_AI_SERVICES_URL = `${SYNTX_API_BASE}/api/v1/ai`;

const ASPECT = ["1:1", "16:9", "9:16", "4:3", "3:4"] as const;
const GPT_IMAGE_SIZES = ["1024x1024", "1024x1536", "1536x1024"] as const;
const TIER_RES = ["1K", "2K", "4K"] as const;
const VIDEO_ASPECT = ["16:9", "9:16", "1:1"] as const;

/** Exact ai_name → kind. Do not infer kling-kolors as video or topaz_astra as upscale. */
const SCOPE_BY_AI_NAME: Readonly<Record<string, SyntxMediaKind>> = Object.freeze({
  midjourney: "image",
  flux: "image",
  "sora-images": "image",
  banana: "image",
  ideogram: "image",
  "stable-diffusion": "image",
  recraft: "image",
  "runway-frames": "image",
  seedream: "image",
  "higgsfield-soul": "image",
  higgsfield: "image",
  "kling-kolors": "image",
  grok_image: "image",
  luma_image: "image",
  wan_image: "image",
  kling: "video",
  wan_video: "video",
  runway: "video",
  grok_video: "video",
  seedance: "video",
  beeble: "video",
  topaz_astra: "video",
  sora: "video",
  elevenlabs: "speech",
  suno: "music",
  "suno-music": "music",
  udio: "music",
  magnific: "upscale",
  topaz_ai: "upscale",
});

const TEXT_AI_NAMES = new Set([
  "chatgpt",
  "claude",
  "deepseek",
  "gemini",
  "qwen",
  "grok",
  "perplexity",
  "zai",
]);

export const SYNTX_FALLBACK_MEDIA_MODELS: readonly SyntxMediaModel[] = [
  media("sora-images", "gpt-image-2", "GPT Image 2", "image", ["text", "image"], {
    supportedSizes: [...GPT_IMAGE_SIZES],
    maxReferenceItems: 4,
  }),
  media("sora-images", "gpt-image-1", "GPT Image 1", "image", ["text", "image"], {
    supportedSizes: [...GPT_IMAGE_SIZES],
    maxReferenceItems: 4,
  }),
  media("flux", "flux-pro", "FLUX Pro", "image", ["text"], { supportedAspectRatios: [...ASPECT] }),
  media("flux", "flux-dev", "FLUX Dev", "image", ["text"], { supportedAspectRatios: [...ASPECT] }),
  media("midjourney", "midjourney", "Midjourney", "image", ["text"], {
    supportedAspectRatios: [...ASPECT, "2:3", "3:2"],
  }),
  media("banana", "nano-banana", "Nano Banana", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT, "2:3", "3:2"],
    maxReferenceItems: 8,
  }),
  media("ideogram", "ideogram", "Ideogram", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    maxReferenceItems: 4,
  }),
  media("seedream", "seedream-4.5", "Seedream 4.5", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    supportedResolutions: ["2K", "4K"],
    maxReferenceItems: 4,
  }),
  media("seedream", "seedream-5", "Seedream 5", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    supportedResolutions: ["2K", "4K"],
    maxReferenceItems: 4,
  }),
  media("grok_image", "grok_i2i", "Grok Image", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    maxReferenceItems: 4,
  }),
  media("grok_image", "grok_i2i_pro", "Grok Image Pro", "image", ["text", "image"], {
    maxReferenceItems: 4,
  }),
  media("wan_image", "wan-2.7", "Wan 2.7 Image", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    supportedResolutions: [...TIER_RES],
    maxReferenceItems: 4,
  }),
  media("wan_image", "wan-2.7-pro", "Wan 2.7 Image Pro", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    supportedResolutions: ["1K", "2K"],
    maxReferenceItems: 4,
  }),
  media("recraft", "recraft", "Recraft", "image", ["text"], {
    supportedSizes: ["1024x1024", "1365x1024", "1024x1365"],
  }),
  media("runway-frames", "runway-frames", "Runway Frames", "image", ["text"], {
    supportedSizes: ["1920x1080", "1080x1920", "1024x1024"],
  }),
  media("luma_image", "luma", "Luma Image", "image", ["text", "image"], {
    supportedAspectRatios: [...ASPECT],
    maxReferenceItems: 4,
  }),
  media("stable-diffusion", "sdxl", "Stable Diffusion XL", "image", ["text"], {
    supportedSizes: ["1024x1024", "768x1344", "1344x768"],
  }),
  media("higgsfield", "higgsfield", "Higgsfield", "image", ["text"], {
    supportedAspectRatios: [...ASPECT],
  }),
  media("kling-kolors", "kling-kolors", "Kling Kolors", "image", ["text"], {
    supportedAspectRatios: [...ASPECT],
  }),

  media("wan_video", "wan-2.6", "Wan 2.6 Video", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT, "4:3", "3:4"],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 2,
  }),
  media("wan_video", "wan-2.7", "Wan 2.7 Video", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT, "4:3", "3:4"],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 2,
  }),
  media("kling", "kling-1.6", "Kling 1.6", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 2,
  }),
  media("kling", "kling-2.1", "Kling 2.1", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 2,
  }),
  media("runway", "gen3", "Runway Gen-3", "video", ["text", "image"], {
    supportedAspectRatios: ["1280:768", "768:1280"],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 1,
  }),
  media("grok_video", "grok_t2v", "Grok Video T2V", "video", ["text"], {
    supportedAspectRatios: [...VIDEO_ASPECT],
    supportedResolutions: ["720p", "480p"],
    supportedDurations: [5, 10],
    durationDefault: 5,
  }),
  media("grok_video", "grok_i2v", "Grok Video I2V", "video", ["text", "image"], {
    supportedResolutions: ["720p", "480p"],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 1,
    imageRequired: true,
  }),
  media("seedance", "seedance", "Seedance", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT, "4:3", "3:4"],
    supportedDurations: [5, 10],
    durationDefault: 5,
    maxReferenceItems: 1,
  }),
  media("sora", "sora-2", "Sora 2", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT],
    supportedDurations: [4, 8, 12],
    durationDefault: 8,
    maxReferenceItems: 1,
  }),
  media("topaz_astra", "topaz_astra", "Topaz Astra", "video", ["text", "image"], {
    supportedAspectRatios: [...VIDEO_ASPECT],
    supportedDurations: [5, 10],
    durationDefault: 5,
    imageRequired: true,
    maxReferenceItems: 1,
  }),
  media("beeble", "beeble", "Beeble", "video", ["text"], {
    supportedAspectRatios: [...VIDEO_ASPECT],
    supportedDurations: [5, 10],
    durationDefault: 5,
  }),

  media("elevenlabs", "eleven_multilingual_v2", "ElevenLabs Multilingual v2", "speech"),
  media("elevenlabs", "eleven_turbo_v2", "ElevenLabs Turbo v2", "speech"),
  media("elevenlabs", "eleven_flash_v2", "ElevenLabs Flash v2", "speech"),

  media("suno", "chirp-v4", "Suno V4", "music", ["text"], {
    supportedDurations: [30, 60, 120],
    durationDefault: 30,
  }),
  media("suno", "chirp-v3-5", "Suno V3.5", "music", ["text"], {
    supportedDurations: [30, 60, 120],
    durationDefault: 30,
  }),
  media("suno-music", "suno", "Suno Music", "music", ["text"], {
    supportedDurations: [30, 60, 120],
    durationDefault: 30,
  }),

  media("magnific", "magnific", "Magnific Upscale", "upscale", ["image"], {
    imageRequired: true,
    maxReferenceItems: 1,
  }),
  media("topaz_ai", "topaz", "Topaz AI Upscale", "upscale", ["image"], {
    imageRequired: true,
    maxReferenceItems: 1,
  }),
  media("ideogram", "upscale", "Ideogram Upscale", "upscale", ["image"], {
    imageRequired: true,
    maxReferenceItems: 1,
  }),

  {
    id: "transcribe",
    name: "SYNTX Transcribe",
    aiName: "transcribe",
    modelType: "transcribe",
    kind: "transcription",
    inputModalities: ["audio"],
  },
];

function media(
  aiName: string,
  modelType: string,
  name: string,
  kind: SyntxMediaKind,
  inputModalities?: string[],
  caps?: SyntxMediaCaps
): SyntxMediaModel {
  return {
    id: `${aiName}/${modelType}`,
    name,
    aiName,
    modelType,
    kind,
    ...(inputModalities ? { inputModalities } : {}),
    ...(caps?.supportedSizes ? { supportedSizes: caps.supportedSizes } : {}),
    ...(caps ? { caps } : {}),
  };
}

export function inferSyntxMediaKind(aiName: string): SyntxMediaKind | null {
  const key = (aiName || "").trim();
  if (!key) return null;
  if (TEXT_AI_NAMES.has(key)) return null;
  if (SCOPE_BY_AI_NAME[key]) return SCOPE_BY_AI_NAME[key];
  const lower = key.toLowerCase();
  if (lower === "magnific" || lower === "topaz_ai" || lower.includes("upscale")) return "upscale";
  if (
    lower.includes("suno") ||
    lower.includes("udio") ||
    lower.endsWith("-music") ||
    lower.includes("music")
  ) {
    return "music";
  }
  if (lower.includes("eleven") || lower.includes("tts") || lower.endsWith("-voice"))
    return "speech";
  if (
    lower.endsWith("_video") ||
    lower === "kling" ||
    lower === "runway" ||
    lower === "sora" ||
    lower === "seedance" ||
    lower === "beeble" ||
    lower === "topaz_astra"
  ) {
    return "video";
  }
  if (
    lower.endsWith("_image") ||
    lower.endsWith("-images") ||
    lower.endsWith("-frames") ||
    lower.includes("flux") ||
    lower.includes("midjourney") ||
    lower.includes("ideogram") ||
    lower.includes("banana") ||
    lower.includes("seedream") ||
    lower === "kling-kolors"
  ) {
    return "image";
  }
  return null;
}

export function parseSyntxMediaModelId(raw: string): { aiName: string; modelType: string } {
  const text = (raw || "").trim();
  if (!text) return { aiName: "", modelType: "" };
  const slash = text.indexOf("/");
  if (slash > 0 && slash < text.length - 1) {
    return { aiName: text.slice(0, slash), modelType: text.slice(slash + 1) };
  }
  const seed = SYNTX_FALLBACK_MEDIA_MODELS.find(
    (row) => row.modelType === text || row.id === text || row.aiName === text
  );
  if (seed) return { aiName: seed.aiName, modelType: seed.modelType };
  return { aiName: text, modelType: text };
}

export function defaultAiNameForKind(kind: SyntxMediaKind): string {
  switch (kind) {
    case "image":
      return "sora-images";
    case "video":
      return "wan_video";
    case "speech":
      return "elevenlabs";
    case "music":
      return "suno";
    case "upscale":
      return "magnific";
    case "transcription":
      return "transcribe";
    default:
      return "sora-images";
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function parseSyntxAiServices(json: unknown): Map<string, string> {
  const rows = Array.isArray(json)
    ? json
    : Array.isArray(asRecord(json).data)
      ? (asRecord(json).data as unknown[])
      : [];
  const map = new Map<string, string>();
  for (const row of rows) {
    const rec = asRecord(row);
    const name = typeof rec.value === "string" ? rec.value.trim() : "";
    const scope = typeof rec.scope === "string" ? rec.scope.trim().toLowerCase() : "";
    if (name && scope) map.set(name, scope);
  }
  return map;
}

export function parseSyntxMediaModelsCatalog(
  modelsJson: unknown,
  services?: Map<string, string>
): SyntxMediaModel[] {
  const root = asRecord(modelsJson);
  const rows = Array.isArray(root.models)
    ? root.models
    : Array.isArray(modelsJson)
      ? modelsJson
      : Array.isArray(root.data)
        ? root.data
        : [];
  const seen = new Set<string>();
  const models: SyntxMediaModel[] = [];
  for (const row of rows) {
    const rec = asRecord(row);
    const modelType =
      (typeof rec.value === "string" && rec.value.trim()) ||
      (typeof rec.id === "string" && rec.id.trim()) ||
      "";
    const aiName = typeof rec.ai_name === "string" ? rec.ai_name.trim() : "";
    if (!modelType || !aiName || TEXT_AI_NAMES.has(aiName)) continue;
    const id = `${aiName}/${modelType}`;
    if (seen.has(id)) continue;
    const seed = SYNTX_FALLBACK_MEDIA_MODELS.find((item) => item.id === id);
    // Seed kind wins so ideogram/upscale stays upscale even when ai_name maps to image.
    const kind = seed?.kind || resolveLiveKind(aiName, services?.get(aiName) || "", modelType);
    if (!kind) continue;
    seen.add(id);
    const label = typeof rec.label === "string" && rec.label.trim() ? rec.label.trim() : modelType;
    const settings = asRecord(rec.settings);
    const accepted = Array.isArray(settings.allowed_media_types)
      ? settings.allowed_media_types.filter((item): item is string => typeof item === "string")
      : [];
    const inputModalities = seed?.inputModalities || inputModalitiesFor(kind, accepted, modelType);
    models.push({
      id,
      name: label,
      aiName,
      modelType,
      kind,
      inputModalities,
      caps: seed?.caps || defaultCapsFor(kind, aiName, modelType, inputModalities),
    });
  }
  return models;
}

function resolveLiveKind(
  aiName: string,
  serviceScope: string,
  modelType = ""
): SyntxMediaKind | null {
  const type = (modelType || "").trim().toLowerCase();
  if (type === "upscale" || type.includes("upscale")) return "upscale";
  const fromName = inferSyntxMediaKind(aiName);
  if (fromName) return fromName;
  if (serviceScope === "image") return "image";
  if (serviceScope === "video") return "video";
  if (serviceScope === "upscale") return "upscale";
  if (serviceScope === "audio") return "speech";
  return null;
}

function inputModalitiesFor(kind: SyntxMediaKind, accepted: string[], modelType: string): string[] {
  if (kind === "upscale") return ["image"];
  if (kind === "transcription") return ["audio"];
  const hasImage = accepted.some((item) => item.toLowerCase().includes("image"));
  const i2v = /i2v|image-to-video|image_to_video/i.test(modelType);
  if (kind === "image") return hasImage ? ["text", "image"] : ["text"];
  if (kind === "video") return hasImage || i2v ? ["text", "image"] : ["text"];
  return ["text"];
}

function defaultCapsFor(
  kind: SyntxMediaKind,
  _aiName: string,
  modelType: string,
  inputModalities: string[]
): SyntxMediaCaps {
  const wantsImage = inputModalities.includes("image") || /i2v/i.test(modelType);
  if (kind === "image") {
    return {
      supportedAspectRatios: [...ASPECT],
      maxReferenceItems: wantsImage ? 4 : undefined,
    };
  }
  if (kind === "video") {
    return {
      supportedAspectRatios: /i2v/i.test(modelType) ? undefined : [...VIDEO_ASPECT],
      supportedDurations: [5, 10],
      durationDefault: 5,
      maxReferenceItems: wantsImage ? 2 : undefined,
      imageRequired: /i2v/i.test(modelType),
    };
  }
  if (kind === "music") return { supportedDurations: [30, 60, 120], durationDefault: 30 };
  if (kind === "upscale") return { imageRequired: true, maxReferenceItems: 1 };
  return {};
}

const catalogCache = new Map<string, { models: SyntxMediaModel[]; ts: number }>();
const CATALOG_TTL_MS = 10 * 60_000;

export async function discoverSyntxMediaModels(options: {
  token: string;
  fetchImpl?: typeof fetch;
}): Promise<SyntxMediaModel[]> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const headers = syntxAuthHeaders(options.token);
  const [servicesRes, modelsRes] = await Promise.all([
    fetchImpl(SYNTX_AI_SERVICES_URL, { method: "GET", headers }),
    fetchImpl(SYNTX_MEDIA_MODELS_URL, { method: "GET", headers }),
  ]);
  const services = servicesRes.ok
    ? parseSyntxAiServices(await servicesRes.json())
    : new Map<string, string>();
  if (!modelsRes.ok) throw new Error(`SYNTX media models HTTP ${modelsRes.status}`);
  const models = parseSyntxMediaModelsCatalog(await modelsRes.json(), services);
  if (models.length === 0) throw new Error("SYNTX media catalog was empty");
  catalogCache.set(options.token.slice(-16), { models, ts: Date.now() });
  return models;
}

export async function getSyntxMediaCatalog(options: {
  token: string;
  fetchImpl?: typeof fetch;
}): Promise<SyntxMediaModel[]> {
  const cacheKey = options.token.slice(-16);
  const cached = catalogCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CATALOG_TTL_MS) return cached.models;
  try {
    return await discoverSyntxMediaModels(options);
  } catch {
    return SYNTX_FALLBACK_MEDIA_MODELS.map((row) => ({ ...row }));
  }
}

export function modelsForKind(
  kind: SyntxMediaKind,
  live?: readonly SyntxMediaModel[]
): SyntxMediaModel[] {
  const source = live && live.length > 0 ? live : SYNTX_FALLBACK_MEDIA_MODELS;
  const rows = source.filter((row) => row.kind === kind);
  return rows.length > 0
    ? rows.map((row) => ({ ...row }))
    : SYNTX_FALLBACK_MEDIA_MODELS.filter((row) => row.kind === kind).map((row) => ({ ...row }));
}

function toWireCaps(row: SyntxMediaModel): Record<string, unknown> | undefined {
  const caps = row.caps;
  if (!caps) return undefined;
  const referenceInputs =
    (caps.maxReferenceItems && caps.maxReferenceItems > 0) || caps.imageRequired
      ? [
          {
            media_type: "image",
            usage_type: "source",
            min_items: caps.imageRequired ? 1 : 0,
            max_items: caps.maxReferenceItems ?? 1,
          },
        ]
      : undefined;
  return {
    ...(caps.supportedSizes ? { supported_sizes: caps.supportedSizes } : {}),
    ...(caps.supportedAspectRatios ? { supported_aspect_ratios: caps.supportedAspectRatios } : {}),
    ...(caps.supportedResolutions ? { supported_resolutions: caps.supportedResolutions } : {}),
    ...(caps.supportedDurations ? { supported_durations: caps.supportedDurations } : {}),
    ...(caps.durationDefault != null ? { duration_default: caps.durationDefault } : {}),
    ...(caps.maxReferenceItems != null ? { max_reference_items: caps.maxReferenceItems } : {}),
    ...(referenceInputs ? { reference_inputs: referenceInputs } : {}),
  };
}

export function toRegistryImageModels(live?: readonly SyntxMediaModel[]) {
  return modelsForKind("image", live).map((row) => ({
    id: row.id,
    name: row.name,
    inputModalities: row.inputModalities || ["text"],
    imageRequired: row.caps?.imageRequired,
    supportedSizes: row.caps?.supportedSizes || row.supportedSizes,
    mediaCapabilities: toWireCaps(row),
  }));
}

export function toRegistryVideoModels(live?: readonly SyntxMediaModel[]) {
  return modelsForKind("video", live).map((row) => ({
    id: row.id,
    name: row.name,
    inputModalities: row.inputModalities || ["text"],
    supportedSizes: row.caps?.supportedAspectRatios || row.caps?.supportedSizes,
    mediaCapabilities: toWireCaps(row),
  }));
}

export function toRegistrySpeechModels(live?: readonly SyntxMediaModel[]) {
  return modelsForKind("speech", live).map((row) => ({ id: row.id, name: row.name }));
}

export function toRegistryMusicModels(live?: readonly SyntxMediaModel[]) {
  return modelsForKind("music", live).map((row) => ({
    id: row.id,
    name: row.name,
    mediaCapabilities: toWireCaps(row),
  }));
}

export function toRegistryTranscriptionModels(live?: readonly SyntxMediaModel[]) {
  return modelsForKind("transcription", live).map((row) => ({ id: row.id, name: row.name }));
}

export function toRegistryUpscaleModels(live?: readonly SyntxMediaModel[]) {
  return modelsForKind("upscale", live).map((row) => ({
    id: row.id,
    name: row.name,
    factors: [2, 4],
    supportsPrompt: row.aiName === "magnific" || row.aiName === "ideogram",
    description: row.name,
  }));
}

export function __resetSyntxMediaCatalogForTests(): void {
  catalogCache.clear();
}
