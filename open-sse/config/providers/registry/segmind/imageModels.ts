/**
 * Segmind image-generation provider entry (#6656).
 *
 * Segmind exposes 200+ hosted models via a single `POST /v1/{model}` REST
 * shape (https://docs.segmind.com/, confirmed live 2026-07-09): x-api-key
 * auth, JSON request body, raw image bytes response (no JSON envelope).
 * Kept as a full config object (not just the model list) so imageRegistry.ts
 * only needs a single-line reference — that file sits right at its size cap.
 *
 * Model slugs below are a curated starter subset. flux-schnell and
 * sdxl1.0-txt2img are verified against
 * https://www.segmind.com/models/<slug>/api; the remaining Flux/SD3/Kandinsky
 * slugs follow the same documented naming convention.
 */
export const SEGMIND_IMAGE_MODELS = [
  { id: "flux-schnell", name: "FLUX.1 Schnell" },
  { id: "flux-dev", name: "FLUX.1 Dev" },
  { id: "flux-1.1-pro", name: "FLUX 1.1 Pro" },
  { id: "sdxl1.0-txt2img", name: "Stable Diffusion XL 1.0" },
  { id: "sd3.5-large-txt2img", name: "Stable Diffusion 3.5 Large" },
  { id: "kandinsky2.2-txt2img", name: "Kandinsky 2.2" },
];

export const SEGMIND_IMAGE_PROVIDER = {
  id: "segmind",
  baseUrl: "https://api.segmind.com/v1",
  authType: "apikey",
  authHeader: "x-api-key",
  format: "segmind",
  models: SEGMIND_IMAGE_MODELS,
  supportedSizes: ["512x512", "1024x1024", "1024x1792", "1792x1024"],
};
