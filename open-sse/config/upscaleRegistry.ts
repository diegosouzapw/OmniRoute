/**
 * Image Upscale Provider Registry
 *
 * Providers that serve `POST /v1/images/upscale` — image→image super-resolution.
 * Upscaling is a distinct capability from generation: there is no text-to-image
 * path, an input image is always mandatory, and the meaningful controls are the
 * scale factor and (for generative upscalers) a creativity level.
 *
 * Only providers whose upscale API is already implemented here are listed:
 *   - adobe-firefly  → Topaz models on firefly-3p `/v2/3p-images/upsample`
 *   - stability-ai   → `/v2beta/stable-image/upscale/{fast,conservative,creative}`
 *   - topaz          → Topaz Labs `/image/v1/enhance` (native API key)
 *
 * Credentials/proxy resolution reuses each provider's existing connection, so a
 * configured Adobe Firefly / Stability AI / Topaz Labs account works with no
 * extra setup.
 */

import { parseModelFromRegistry, getAllModelsFromRegistry } from "./registryUtils.ts";

/** Scale factors offered by default when a model does not restrict them. */
export const DEFAULT_UPSCALE_FACTORS: readonly number[] = Object.freeze([2, 4]);

export interface UpscaleModelEntry {
  id: string;
  name: string;
  /** Discrete scale factors the upstream accepts (in x). */
  factors: number[];
  /** Model exposes a creativity / re-imagine control (0-100 % on the wire-agnostic API). */
  supportsCreativity?: boolean;
  /** Model accepts an optional guidance prompt. */
  supportsPrompt?: boolean;
  /** Upstream rejects the request without a prompt. */
  promptRequired?: boolean;
  description?: string;
}

export interface UpscaleProviderConfig {
  id: string;
  alias?: string;
  baseUrl: string;
  authType: "apikey" | "none";
  authHeader: string;
  format: "adobe-firefly-upscale" | "stability-upscale" | "topaz-upscale";
  models: UpscaleModelEntry[];
}

export const UPSCALE_PROVIDERS: Record<string, UpscaleProviderConfig> = {
  // Adobe Firefly (unofficial) — Topaz Labs models exposed through the Firefly 3P
  // async upsample job API. Live capture: web_providers/upsample.txt.
  // Discovery (web_providers/upscale.txt) lists modelId "topaz" with the image
  // modelVersions default/standard/reimagine carrying inputMediaUseCase ["upscaling"];
  // starlight-*/astra-2 are video upscalers and intentionally excluded here.
  "adobe-firefly": {
    id: "adobe-firefly",
    alias: "firefly",
    baseUrl: "https://firefly-3p.ff.adobe.io/v2/3p-images/upsample",
    authType: "apikey",
    authHeader: "bearer",
    format: "adobe-firefly-upscale",
    models: [
      {
        id: "topaz",
        name: "Firefly Topaz Upscale",
        factors: [2, 4],
        description: "Topaz Labs detail-preserving upscale (standard).",
      },
      {
        id: "topaz-standard",
        name: "Firefly Topaz Upscale (Standard)",
        factors: [2, 4],
        description: "Topaz Labs detail-preserving upscale — no invented detail.",
      },
      {
        id: "topaz-bloom",
        name: "Firefly Topaz Bloom (Creative)",
        factors: [2, 4],
        supportsCreativity: true,
        description: "Topaz Bloom generative upscale — creativity adds synthesized detail.",
      },
    ],
  },

  // Stability AI stable-image upscale family. `fast` is a 4x deterministic pass;
  // `conservative` and `creative` are prompt-guided (creative is an async job).
  "stability-ai": {
    id: "stability-ai",
    baseUrl: "https://api.stability.ai",
    authType: "apikey",
    authHeader: "bearer",
    format: "stability-upscale",
    models: [
      {
        id: "fast",
        name: "Stability Fast Upscale (4x)",
        factors: [4],
        description: "Lightweight 4x upscale, no prompt.",
      },
      {
        id: "conservative",
        name: "Stability Conservative Upscale",
        factors: [4],
        supportsPrompt: true,
        promptRequired: true,
        description: "Up to ~4 MP while preserving every detail. Prompt required upstream.",
      },
      {
        id: "creative",
        name: "Stability Creative Upscale",
        factors: [4],
        supportsCreativity: true,
        supportsPrompt: true,
        promptRequired: true,
        description: "Heavily reimagines low-quality inputs (async job). Prompt required upstream.",
      },
    ],
  },

  // Topaz Labs native Image API (own api key, synchronous).
  topaz: {
    id: "topaz",
    baseUrl: "https://api.topazlabs.com",
    authType: "apikey",
    authHeader: "x-api-key",
    format: "topaz-upscale",
    models: [
      {
        id: "topaz-enhance",
        name: "Topaz Labs Enhance",
        factors: [2, 4],
        description: "Topaz Labs Image Enhance (auto model selection).",
      },
    ],
  },
};

export function getUpscaleProvider(providerId: string | null | undefined): UpscaleProviderConfig | null {
  if (!providerId) return null;
  return UPSCALE_PROVIDERS[providerId] || null;
}

/** Parse `provider/model` (or a bare, unambiguous model id) against the upscale registry. */
export function parseUpscaleModel(modelStr: string | null) {
  return parseModelFromRegistry(modelStr, UPSCALE_PROVIDERS);
}

/** Flat catalog for `GET /v1/images/upscale`. */
export function getAllUpscaleModels() {
  return getAllModelsFromRegistry(UPSCALE_PROVIDERS, (_providerId, config) => ({
    format: config.format,
  }));
}

/** Registry row for a `provider/model` string, or null when unknown. */
export function getUpscaleModelEntry(
  modelStr: string | null
): { provider: string; providerConfig: UpscaleProviderConfig; entry: UpscaleModelEntry } | null {
  const { provider, model } = parseUpscaleModel(modelStr);
  if (!provider || !model) return null;
  const providerConfig = UPSCALE_PROVIDERS[provider];
  if (!providerConfig) return null;
  const entry = providerConfig.models.find((m) => m.id === model);
  if (!entry) return null;
  return { provider, providerConfig, entry };
}

/** True when `provider/model` (or bare id) names a registered upscale model. */
export function isRegisteredUpscaleModel(modelStr: string | null): boolean {
  return getUpscaleModelEntry(modelStr) !== null;
}

/**
 * Normalize a requested scale factor to one the model actually supports.
 *
 * Accepts numbers and the loose strings clients send (`"2"`, `"2x"`, `"x4"`, `"4X"`).
 * Unparseable/out-of-range values snap to the nearest allowed factor rather than
 * failing the request — a 3x ask on a {2,4} model is better served at 4x than 400ed.
 */
export function normalizeUpscaleFactor(
  value: unknown,
  allowed: readonly number[] = DEFAULT_UPSCALE_FACTORS
): number {
  const factors = allowed.length > 0 ? [...allowed] : [...DEFAULT_UPSCALE_FACTORS];
  const fallback = factors.includes(2) ? 2 : factors[0]!;

  let n: number = NaN;
  if (typeof value === "number") {
    n = value;
  } else if (typeof value === "string") {
    const match = /(\d+(?:\.\d+)?)/.exec(value.trim());
    if (match) n = Number(match[1]);
  }
  if (!Number.isFinite(n) || n <= 0) return fallback;

  let best = factors[0]!;
  let bestDelta = Math.abs(factors[0]! - n);
  for (const f of factors) {
    const delta = Math.abs(f - n);
    if (delta < bestDelta) {
      best = f;
      bestDelta = delta;
    }
  }
  return best;
}

/**
 * Normalize a creativity input to a 0-100 percentage.
 *
 * The public API is percentage-based so every provider gets the same control
 * regardless of its native scale (Firefly uses an integer level, Stability a
 * 0.1-0.5 float). A fractional value strictly between 0 and 1 is read as a
 * fraction (0.35 → 35 %); everything else is read as a percentage, so an
 * integer `1` stays 1 % instead of silently becoming 100 %.
 */
export function normalizeCreativityPercent(value: unknown, fallback = 0): number {
  let n: number = NaN;
  if (typeof value === "number") n = value;
  else if (typeof value === "string" && value.trim()) n = Number(value.trim().replace("%", ""));
  if (!Number.isFinite(n)) return clampPercent(fallback);
  if (n > 0 && n < 1) return clampPercent(n * 100);
  return clampPercent(n);
}

function clampPercent(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}
