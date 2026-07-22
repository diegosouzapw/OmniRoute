/**
 * Adobe Firefly model catalog: live discovery + static fallback from browser capture.
 *
 * Live: POST firefly-3p.ff.adobe.io/v2/models/discovery (needs valid IMS token).
 * Fallback: curated rows from adobe/get_models.txt (2026-07 Firefly SPA capture) so
 * Media/Models still list usable ids when discovery fails or credentials are missing.
 */

import {
  type AdobeFireflyDiscoveredModel,
  discoverAdobeFireflyModels,
  resolveAdobeAccessToken,
} from "./adobeFireflyClient.ts";

export interface AdobeFireflyCatalogModel {
  /** OpenAI-style id without provider prefix, e.g. nano-banana-pro or flux-fluxPro */
  id: string;
  name: string;
  modality: "image" | "video";
  /** Upstream wire modelId for generate-async */
  upstreamModelId: string;
  /** Upstream wire modelVersion for generate-async */
  upstreamModelVersion: string;
  inputModalities?: string[];
}

/**
 * Static fallback built from adobe/get_models.txt discovery response.
 * Friendly aliases first (Media page defaults), then popular upstream families.
 */
export const ADOBE_FIREFLY_FALLBACK_MODELS: AdobeFireflyCatalogModel[] = [
  // ── Friendly aliases (handler resolveAdobeImageModel / resolveAdobeVideoModel) ──
  {
    id: "nano-banana-pro",
    name: "Gemini 3.0 (Nano Banana Pro)",
    modality: "image",
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana-2",
    inputModalities: ["text", "image"],
  },
  {
    id: "nano-banana",
    name: "Gemini 2.5 (Nano Banana)",
    modality: "image",
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana",
    inputModalities: ["text", "image"],
  },
  {
    id: "nano-banana-2",
    name: "Gemini 3.1 (Nano Banana 2)",
    modality: "image",
    upstreamModelId: "gemini-flash",
    upstreamModelVersion: "nano-banana-3",
    inputModalities: ["text", "image"],
  },
  {
    id: "gpt-image-2",
    name: "GPT Image 2",
    modality: "image",
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "2",
    inputModalities: ["text", "image"],
  },
  {
    id: "gpt-image",
    name: "GPT Image 2",
    modality: "image",
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "2",
    inputModalities: ["text", "image"],
  },
  {
    id: "gpt-image-1.5",
    name: "GPT Image 1.5",
    modality: "image",
    upstreamModelId: "gpt-image",
    upstreamModelVersion: "1.5",
    inputModalities: ["text", "image"],
  },
  {
    id: "sora-2",
    name: "Sora 2",
    modality: "video",
    upstreamModelId: "sora",
    upstreamModelVersion: "sora-2",
  },
  {
    id: "sora-2-pro",
    name: "Sora 2 Pro",
    modality: "video",
    upstreamModelId: "sora",
    upstreamModelVersion: "sora-2-pro",
  },
  {
    id: "veo-3.1",
    name: "Veo 3.1",
    modality: "video",
    upstreamModelId: "veo",
    upstreamModelVersion: "3.1-generate",
  },
  {
    id: "veo-3.1-fast",
    name: "Veo 3.1 Fast",
    modality: "video",
    upstreamModelId: "veo",
    upstreamModelVersion: "3.1-fast-generate",
  },
  {
    id: "veo-3.1-ref",
    name: "Veo 3.1 Reference",
    modality: "video",
    upstreamModelId: "veo",
    upstreamModelVersion: "3.1-generate",
  },
  {
    id: "kling-3",
    name: "Kling Video v3 Standard Image to Video",
    modality: "video",
    upstreamModelId: "kling",
    upstreamModelVersion: "kling_v3_standard_i2v",
  },
  // ── Additional image families from discovery capture ──
  {
    id: "flux-2",
    name: "Flux 2",
    modality: "image",
    upstreamModelId: "flux",
    upstreamModelVersion: "2",
    inputModalities: ["text", "image"],
  },
  {
    id: "flux-pro",
    name: "Flux 1.1 Pro",
    modality: "image",
    upstreamModelId: "flux",
    upstreamModelVersion: "fluxPro",
    inputModalities: ["text", "image"],
  },
  {
    id: "flux-ultra",
    name: "Flux 1.1 Ultra",
    modality: "image",
    upstreamModelId: "flux",
    upstreamModelVersion: "fluxUltra",
    inputModalities: ["text", "image"],
  },
  {
    id: "seedream-4",
    name: "Seedream 4.0",
    modality: "image",
    upstreamModelId: "seedream",
    upstreamModelVersion: "seedream_v4",
    inputModalities: ["text", "image"],
  },
  {
    id: "seedream-5-lite",
    name: "Seedream 5.0 Lite",
    modality: "image",
    upstreamModelId: "seedream",
    upstreamModelVersion: "seedream_v5_lite",
    inputModalities: ["text", "image"],
  },
  {
    id: "runway-gen4-image",
    name: "Runway Gen-4 Image",
    modality: "image",
    upstreamModelId: "runway-gen4-image",
    upstreamModelVersion: "gen4_image",
    inputModalities: ["text", "image"],
  },
  // ── Additional video families ──
  {
    id: "kling-v3-t2v",
    name: "Kling Video v3 Standard Text to Video",
    modality: "video",
    upstreamModelId: "kling",
    upstreamModelVersion: "kling_v3_standard_t2v",
  },
  {
    id: "kling-v3-pro-i2v",
    name: "Kling Video v3 Pro Image to Video",
    modality: "video",
    upstreamModelId: "kling",
    upstreamModelVersion: "kling_v3_pro_i2v",
  },
  {
    id: "luma-ray3",
    name: "Ray3",
    modality: "video",
    upstreamModelId: "luma",
    upstreamModelVersion: "3.0-ray",
  },
  {
    id: "runway-gen4-turbo",
    name: "Runway Gen-4 Video",
    modality: "video",
    upstreamModelId: "runway",
    upstreamModelVersion: "gen4_turbo",
  },
];

/** Stable slug for upstream modelId + modelVersion (catalog id when not a friendly alias). */
export function slugifyAdobeModel(modelId: string, modelVersion: string): string {
  const mid = String(modelId || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const ver = String(modelVersion || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!ver || ver === "default" || ver === mid) return mid || "model";
  return `${mid}-${ver}`;
}

/** Map discovery rows → catalog entries (image/video only). */
export function mapDiscoveredToCatalog(
  rows: AdobeFireflyDiscoveredModel[]
): AdobeFireflyCatalogModel[] {
  const out: AdobeFireflyCatalogModel[] = [];
  const seen = new Set<string>();

  // Prefer friendly aliases when upstream matches known fallback rows.
  for (const fb of ADOBE_FIREFLY_FALLBACK_MODELS) {
    const hit = rows.find(
      (r) =>
        r.modelId === fb.upstreamModelId &&
        r.modelVersion === fb.upstreamModelVersion &&
        (r.modality === fb.modality || r.modality === "unknown")
    );
    if (hit && !seen.has(fb.id)) {
      seen.add(fb.id);
      out.push({
        ...fb,
        name: hit.displayName || fb.name,
      });
    }
  }

  for (const r of rows) {
    if (r.modality !== "image" && r.modality !== "video") continue;
    const id = slugifyAdobeModel(r.modelId, r.modelVersion);
    if (seen.has(id)) continue;
    // Skip if already covered by a friendly alias with same upstream
    if (
      out.some(
        (o) =>
          o.upstreamModelId === r.modelId && o.upstreamModelVersion === r.modelVersion
      )
    ) {
      continue;
    }
    seen.add(id);
    out.push({
      id,
      name: r.displayName || id,
      modality: r.modality,
      upstreamModelId: r.modelId,
      upstreamModelVersion: r.modelVersion,
      inputModalities: r.modality === "image" ? ["text", "image"] : ["text"],
    });
  }

  return out;
}

export function getAdobeFireflyFallbackCatalog(modality?: "image" | "video"): AdobeFireflyCatalogModel[] {
  if (!modality) return [...ADOBE_FIREFLY_FALLBACK_MODELS];
  return ADOBE_FIREFLY_FALLBACK_MODELS.filter((m) => m.modality === modality);
}

/**
 * Live discovery when credentials resolve; otherwise static fallback from get_models capture.
 */
export async function resolveAdobeFireflyCatalog(opts: {
  credentials?: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: Record<string, unknown> | null;
  } | null;
  modality?: "image" | "video";
  fetchImpl?: typeof fetch;
}): Promise<{ models: AdobeFireflyCatalogModel[]; source: "api" | "fallback" }> {
  const fetchImpl = opts.fetchImpl || fetch;
  try {
    if (opts.credentials) {
      const token = await resolveAdobeAccessToken(opts.credentials, fetchImpl);
      const discovered = await discoverAdobeFireflyModels(token, fetchImpl);
      let catalog = mapDiscoveredToCatalog(discovered);
      if (opts.modality) catalog = catalog.filter((m) => m.modality === opts.modality);
      if (catalog.length > 0) return { models: catalog, source: "api" };
    }
  } catch {
    // fall through to static catalog
  }

  return {
    models: getAdobeFireflyFallbackCatalog(opts.modality),
    source: "fallback",
  };
}

/** Registry-shaped models for imageRegistry / videoRegistry. */
export function toRegistryImageModels(
  models: AdobeFireflyCatalogModel[] = getAdobeFireflyFallbackCatalog("image")
): Array<{ id: string; name: string; inputModalities?: string[] }> {
  return models
    .filter((m) => m.modality === "image")
    .map((m) => ({
      id: m.id,
      name: m.name.startsWith("Firefly ") ? m.name : `Firefly ${m.name}`,
      inputModalities: m.inputModalities || ["text", "image"],
    }));
}

export function toRegistryVideoModels(
  models: AdobeFireflyCatalogModel[] = getAdobeFireflyFallbackCatalog("video")
): Array<{ id: string; name: string }> {
  return models
    .filter((m) => m.modality === "video")
    .map((m) => ({
      id: m.id,
      name: m.name.startsWith("Firefly ") ? m.name : `Firefly ${m.name}`,
    }));
}
