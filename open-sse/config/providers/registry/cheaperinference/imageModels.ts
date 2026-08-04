/**
 * Cheaper Inference image provider registry entry.
 * Extracted into its own module to keep open-sse/config/imageRegistry.ts
 * under the file-size cap (god-file decomposition; semantic split) — same
 * pattern as FREEPIK_IMAGE_PROVIDER / SEGMIND_IMAGE_PROVIDER.
 *
 * 3 image models measured from GET /v1/models?type=image on 2026-07-31.
 *
 * COLLISION NOTE: nano-banana-pro and nano-banana-2 are ALSO adobe-firefly model
 * ids. parseImageModel() resolves a bare id by first-match over IMAGE_PROVIDERS
 * iteration order, so this entry is spread into that object AFTER adobe-firefly:
 * bare `nano-banana-2` keeps routing to Firefly (pre-existing behaviour) and these
 * models are reachable only as `cheaperinference/<id>` / `cinf/<id>`. Do NOT add
 * IMAGE_MODEL_ALIASES entries for them — that would silently re-route Firefly
 * users. Guarded by tests/unit/cheaperinference-image-models.test.ts.
 *
 * The endpoint ignores `response_format:"url"` and always returns `b64_json`
 * (measured twice). The OpenAI image path already handles b64_json; this is not a
 * bug to "fix". /v1/images/edits returns 404 upstream, so no edit support.
 */
export const CHEAPERINFERENCE_IMAGE_PROVIDER = {
  id: "cheaperinference",
  alias: "cinf",
  baseUrl: "https://api.cheaperinference.com/v1/images/generations",
  authType: "apikey",
  authHeader: "bearer",
  format: "openai",
  models: [
    { id: "grok-imagine", name: "Grok Imagine (Cheaper Inference)" },
    { id: "nano-banana-pro", name: "Nano Banana Pro (Cheaper Inference)" },
    { id: "nano-banana-2", name: "Nano Banana 2 (Cheaper Inference)" },
  ],
  supportedSizes: ["1024x1024", "2048x2048", "4096x4096"],
};
