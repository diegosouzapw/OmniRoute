// NVIDIA NIM image generation (FLUX models) — ported from upstream 9router#1195.
// Unlike the NVIDIA *chat* entry (open-sse/config/providers/registry/nvidia/index.ts,
// host integrate.api.nvidia.com, OpenAI-compatible), NVIDIA NIM *image* generation lives
// on a different host (ai.api.nvidia.com) with a native per-model NIM body — so it gets
// its own provider handler rather than reusing the OpenAI-compatible image path.
//
// Invoke shape: POST https://ai.api.nvidia.com/v1/genai/<model>
//   Authorization: Bearer <NGC API key>
// where <model> is the registered model id itself (e.g. "black-forest-labs/flux.1-dev").
//
// Response shape varies across the NIM `genai` catalog (SDXL-style `artifacts[].base64`,
// list-of-strings `images[]`, OpenAI-style `data[].b64_json`, or single-value shorthands)
// — normalizeNvidiaNimImages() accepts every variant so a NIM response-shape change
// degrades to "no images" rather than throwing.

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

const FLUX_1_DEV = "black-forest-labs/flux.1-dev";
const FLUX_1_KONTEXT_DEV = "black-forest-labs/flux.1-kontext-dev";

function numberFromInput(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseSizeString(size: unknown): { width: number; height: number } | null {
  if (typeof size !== "string" || !size || size === "auto") return null;
  const match = /^(\d+)x(\d+)$/.exec(size);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

function parseDimensions(body: Record<string, unknown>): { width: number; height: number } | null {
  const width = numberFromInput(body.width);
  const height = numberFromInput(body.height);
  if (width !== null && height !== null) return { width, height };
  return parseSizeString(body.size);
}

function copyIfPresent(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  key: string
): void {
  if (source[key] !== undefined && source[key] !== null && source[key] !== "") {
    target[key] = source[key];
  }
}

function copyNumberIfPresent(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  key: string,
  options: { greaterThan?: number } = {}
): void {
  if (source[key] === undefined || source[key] === null || source[key] === "") return;
  const value = Number(source[key]);
  if (!Number.isFinite(value)) return;
  if (options.greaterThan !== undefined && !(value > options.greaterThan)) return;
  target[key] = value;
}

function normalizeImageArray(image: unknown): unknown[] {
  if (Array.isArray(image)) return image.filter(Boolean);
  return image ? [image] : [];
}

// FLUX.1 Dev only accepts dimensions in the 768-1344px range, in 64px increments —
// out-of-range values are silently dropped rather than sent upstream (matches upstream
// 9router#1195 behavior, verified against build.nvidia.com model page constraints).
function isFlux1DevDimension(value: number): boolean {
  return Number.isInteger(value) && value >= 768 && value <= 1344 && value % 64 === 0;
}

/**
 * Build the per-model NIM request body. Each FLUX family member on NIM accepts a
 * slightly different parameter set:
 *  - flux.1-dev: mode (base/depth/canny) + cfg_scale (only forwarded if > 1) + strict
 *    768-1344/64px-increment width/height validation; input image only sent for
 *    non-"base" modes (depth/canny control image)
 *  - flux.1-kontext-dev: image-conditioned edit — requires `image`, uses `aspect_ratio`
 *    instead of width/height (the model preserves/derives its own output dimensions)
 *  - flux.1-schnell / flux.2-klein-4b: width/height/seed/steps, optional `image` sent as
 *    an array when present (edit-style input)
 */
export function buildNvidiaNimRequestBody(
  model: string,
  body: Record<string, unknown>
): Record<string, unknown> {
  const req: Record<string, unknown> = { prompt: body.prompt };
  const dimensions = parseDimensions(body);

  if (dimensions && model !== FLUX_1_KONTEXT_DEV) {
    if (model !== FLUX_1_DEV || (isFlux1DevDimension(dimensions.width) && isFlux1DevDimension(dimensions.height))) {
      req.width = dimensions.width;
      req.height = dimensions.height;
    }
  }

  if (model === FLUX_1_DEV) {
    const mode = body.mode || "base";
    req.mode = mode;
    if (mode !== "base") {
      const images = normalizeImageArray(body.image);
      if (images.length > 0) req.image = images[0];
    }
  } else if (model === FLUX_1_KONTEXT_DEV) {
    const images = normalizeImageArray(body.image);
    if (images.length > 0) req.image = images[0];
    copyIfPresent(req, body, "aspect_ratio");
  } else if (body.image) {
    req.image = normalizeImageArray(body.image);
  }

  if (model === FLUX_1_DEV) {
    copyNumberIfPresent(req, body, "cfg_scale", { greaterThan: 1 });
  } else {
    copyIfPresent(req, body, "cfg_scale");
  }
  copyIfPresent(req, body, "seed");
  copyIfPresent(req, body, "steps");
  return req;
}

function imageItemFromValue(value: unknown): { b64_json?: string; url?: string; finish_reason?: string } | null {
  if (!value) return null;
  if (typeof value === "string") return { b64_json: value };
  if (typeof value !== "object") return null;
  const obj = value as Record<string, unknown>;
  if (typeof obj.url === "string") return { url: obj.url };
  const base64 = obj.base64 || obj.b64_json || obj.image || obj.data;
  if (typeof base64 !== "string") return null;
  const item: { b64_json: string; finish_reason?: string } = { b64_json: base64 };
  const finishReason = obj.finishReason || obj.finish_reason;
  if (typeof finishReason === "string") item.finish_reason = finishReason;
  return item;
}

/**
 * Normalize the NIM response into `{ created, data: [{ b64_json | url, finish_reason? }] }`.
 * Accepts every response shape seen across the NIM `genai` catalog rather than a single
 * assumed format.
 */
export function normalizeNvidiaNimImages(responseBody: unknown): {
  created: number;
  data: Array<{ b64_json?: string; url?: string; finish_reason?: string }>;
} {
  const obj = (responseBody && typeof responseBody === "object" ? responseBody : {}) as Record<
    string,
    unknown
  >;

  // Already OpenAI-shaped — pass through.
  if (typeof obj.created === "number" && Array.isArray(obj.data)) {
    return obj as { created: number; data: Array<{ b64_json?: string; url?: string }> };
  }

  const candidates: unknown[] = [];
  if (Array.isArray(obj.artifacts)) candidates.push(...obj.artifacts);
  if (Array.isArray(obj.images)) candidates.push(...obj.images);
  if (Array.isArray(obj.data)) candidates.push(...obj.data);
  if (obj.artifact) candidates.push(obj.artifact);
  if (obj.image) candidates.push(obj.image);
  if (obj.base64) candidates.push(obj.base64);
  const result = obj.result as Record<string, unknown> | undefined;
  if (result?.image) candidates.push(result.image);
  if (result && Array.isArray(result.artifacts)) candidates.push(...result.artifacts);

  return {
    created: Math.floor(Date.now() / 1000),
    data: candidates.map(imageItemFromValue).filter((item): item is NonNullable<typeof item> => item !== null),
  };
}

export async function handleNvidiaNimImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: {
    info: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken || "";

  if (model === FLUX_1_KONTEXT_DEV && !body.image) {
    return {
      success: false,
      status: 400,
      error: "NVIDIA FLUX.1 Kontext Dev requires an input image",
    };
  }

  const requestBody = buildNvidiaNimRequestBody(model, body);

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (nvidia-nim) | prompt: "${promptPreview}..."`);
  }

  const url = `${providerConfig.baseUrl.replace(/\/$/, "")}/${model}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: response.status, error: errorText };
    }

    const payload = await response.json();
    const normalized = normalizeNvidiaNimImages(payload);

    if (normalized.data.length === 0) {
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "No images returned from NVIDIA NIM",
      }).catch(() => {});
      return { success: false, status: 502, error: "No images returned from NVIDIA NIM" };
    }

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: normalized.data.length },
    }).catch(() => {});

    return { success: true, data: normalized };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${(err as Error).message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: (err as Error).message,
    }).catch(() => {});
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}
